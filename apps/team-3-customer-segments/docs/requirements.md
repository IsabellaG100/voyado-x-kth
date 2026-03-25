# Customer Segments — Business Requirements

## Overview

The Customer Segments module is a marketer-facing tool for creating and previewing audience segments based on customer data. Segments are groups of customers defined by rules (e.g., "Tier equals Gold AND Total Spend greater than 5000"). Marketers use segments to target campaigns, personalize experiences, and analyze customer groups. This module allows viewing existing segments, creating new ones with a visual rule builder, and previewing which customers match the defined rules — all powered by static JSON data.

## User Persona

**Lisa — CRM Marketer**
Lisa creates targeted campaigns for different customer groups. She needs to build segments like "High-value Gold members in Stockholm" or "Inactive members with low points balance." She's not technical — she needs a visual, intuitive way to define rules without writing queries. She wants to immediately see how many customers match her criteria before using the segment in a campaign.

## Features

### Feature 1: Segment List

**Priority:** Must Have

**Description:** A list view showing all existing customer segments. Each segment entry displays the segment name, a brief description, the number of matching customers (as a badge), and the creation date. Clicking a segment navigates to the Segment Detail View (Feature 5). The list is the default view when the module loads.

**Acceptance Criteria:**
- [ ] All segments from `data/segments.json` are displayed in a vertical list
- [ ] Each segment shows: name (as a heading), description (truncated to 1–2 lines), customer count in a `Badge`, and created date formatted as "DD MMM YYYY"
- [ ] Segments are sorted by creation date (newest first)
- [ ] Clicking a segment transitions to the Segment Detail View for that segment
- [ ] A "Create Segment" button is prominently displayed above or beside the list
- [ ] The list displays an empty state message if no segments exist (e.g., "No segments yet. Create your first one!")

**Component Mapping:**
- Use `Card` with `hoverable` from `@voyado-kth/ui` for each segment entry
- Use `Badge` for customer count display
- Use `Button` for "Create Segment" action

---

### Feature 2: Create Segment

**Priority:** Must Have

**Description:** A form to create a new segment. The form collects a segment name and description. After filling in the basics, the user proceeds to the Rule Builder (Feature 3) to define targeting criteria. The created segment is added to the segment list in React state (not persisted to any backend).

**Acceptance Criteria:**
- [ ] Clicking "Create Segment" opens a form (can be a modal, a panel, or inline above the list)
- [ ] The form has two fields: "Segment Name" (required, text input) and "Description" (optional, text input)
- [ ] A "Next: Add Rules" button is enabled only when the name field is not empty
- [ ] Submitting the form transitions to the Rule Builder view with the new segment context
- [ ] The form can be cancelled, returning to the segment list without changes
- [ ] Form inputs are validated: name must be at least 3 characters, showing an error message if invalid

**Component Mapping:**
- Use `Input` from `@voyado-kth/ui` for name and description fields
- Use `Button` for "Next: Add Rules" and "Cancel" actions
- Use `Alert` for validation errors (optional — can use `Input` `error` prop instead)

---

### Feature 3: Rule Builder

**Priority:** Must Have

**Description:** A visual interface for building segment rules. Each rule consists of three parts: a Field (dropdown), an Operator (dropdown), and a Value (input). Users can add multiple rules (AND logic — all rules must match). Rules are displayed as a visual stack, and each rule can be removed. This is the core interaction of the module.

Available fields and their compatible operators:

| Field | Operators | Value Input |
|-------|-----------|-------------|
| Tier | equals, not_equals | Dropdown: Bronze, Silver, Gold, Platinum |
| City | equals, contains | Text input |
| Total Spend | greater_than, less_than, equals | Number input |
| Last Purchase Date | greater_than, less_than | Date string input (YYYY-MM-DD) |
| Points Balance | greater_than, less_than, equals | Number input |

**Acceptance Criteria:**
- [ ] An "Add Rule" button adds a new empty rule row to the builder
- [ ] Each rule row has 3 controls: Field dropdown, Operator dropdown, and Value input
- [ ] The Operator dropdown options update based on the selected Field (e.g., "Tier" only shows "equals" and "not_equals")
- [ ] The Value input type changes based on the Field: text for City, number for spend/points, dropdown for Tier
- [ ] Each rule row has a remove button (✕) to delete that rule
- [ ] Rules are displayed as a visual stack with connecting "AND" labels between them
- [ ] At least one rule must be defined before the user can preview results

**Component Mapping:**
- Use `Input` from `@voyado-kth/ui` for value inputs
- Use native `<select>` elements styled with Essence tokens for Field and Operator dropdowns
- Use `Chip` with `onRemove` for displaying rules in a compact format (alternative view)
- Use `Button` for "Add Rule" and "Preview" actions
- Use `Card` to wrap the rule builder section

---

### Feature 4: Segment Preview

**Priority:** Must Have

**Description:** After defining rules, the user can preview which customers from the data match the criteria. The preview shows the total count of matching customers and a table of the first 5 matches. This gives Lisa immediate feedback on whether her rules are too broad or too narrow. The preview evaluates rules against `data/customers.json` in real-time.

**Acceptance Criteria:**
- [ ] A "Preview" button evaluates the current rules against `data/customers.json`
- [ ] The preview displays the total count of matching customers prominently (e.g., "127 customers match")
- [ ] A mini-table shows the first 5 matching customers: Name, Email, Tier, City
- [ ] If no customers match, a message is displayed (e.g., "No customers match these rules. Try broadening your criteria.")
- [ ] The preview updates each time "Preview" is clicked (not automatically on rule change)
- [ ] Rule evaluation logic: all rules must match (AND logic). For example, "Tier equals Gold" AND "City contains Stockholm" means only Gold members in Stockholm match.

**Component Mapping:**
- Use `Button` from `@voyado-kth/ui` for the "Preview" action
- Use `Badge` for the match count display
- Use `Card` to wrap the preview results
- Build a custom `<table>` with Essence styling tokens

---

### Feature 5: Segment Detail View

**Priority:** Should Have

**Description:** A detail view shown when clicking an existing segment from the list. It displays the segment's name, description, all rules rendered visually, the total number of matching customers, and a full table of all matching customers. This view provides a read-only look at the segment configuration and its audience.

**Acceptance Criteria:**
- [ ] The view shows the segment name as a heading and the description below it
- [ ] All segment rules are displayed visually as a stack of rule "chips" or cards (e.g., "Tier equals Gold")
- [ ] The total matching customer count is displayed in a `Badge`
- [ ] A table shows all matching customers: Name, Email, Tier (with colored badge), City, Total Spend (formatted with currency)
- [ ] A "Back to Segments" button returns to the segment list
- [ ] Rules are evaluated against `data/customers.json` to generate the customer list dynamically

**Component Mapping:**
- Use `Card` from `@voyado-kth/ui` for the detail container and rule display
- Use `Badge` for tier labels and customer count
- Use `Chip` for rule display (e.g., label: "Tier = Gold")
- Use `Button` for back navigation

---

## Data Sources

All data is loaded from static JSON files in the `data/` directory.

| File | Description | Shape |
|------|-------------|-------|
| `data/segments.json` | Array of pre-defined segments with their rules | `Segment[]` |
| `data/customers.json` | Array of customer records to evaluate rules against | `Customer[]` |

### Sample Segment Shape

```json
{
  "id": "seg-001",
  "name": "High-Value Gold Members",
  "description": "Gold tier members with total spend exceeding 5000 SEK",
  "customerCount": 42,
  "rules": [
    { "id": "rule-1", "field": "tier", "operator": "equals", "value": "Gold" },
    { "id": "rule-2", "field": "totalSpend", "operator": "greater_than", "value": 5000 }
  ],
  "createdDate": "2024-11-15",
  "lastUpdated": "2024-12-01"
}
```

### Rule Evaluation Logic

```
For each customer:
  Match = ALL rules pass (AND logic)

  For each rule:
    - "equals": customer[field] === rule.value
    - "not_equals": customer[field] !== rule.value
    - "greater_than": customer[field] > rule.value
    - "less_than": customer[field] < rule.value
    - "contains": customer[field].toLowerCase().includes(rule.value.toLowerCase())
```

## Component Library

Use these components from `@voyado-kth/ui`:

| Component | Used For |
|-----------|----------|
| `Card` | Segment list items (hoverable), rule builder container, detail view, preview results |
| `Badge` | Customer count badges, tier badges in tables |
| `Button` | Create Segment, Add Rule, Preview, Back navigation |
| `Input` | Segment name/description form fields, rule value inputs |
| `Chip` | Rule display (compact format with remove capability) |
| `Alert` | Empty states, validation messages, no-match warnings |

**Import pattern:**
```tsx
import { Card, Badge, Button, Input, Chip, Alert } from '@voyado-kth/ui';
```

## Shared Types

Import these types from `@voyado-kth/shared`:

```tsx
import type { Segment, SegmentRule, SegmentOperator, Customer } from '@voyado-kth/shared';
```

| Type | Used For |
|------|----------|
| `Segment` | Segment data: id, name, description, customerCount, rules, createdDate, lastUpdated |
| `SegmentRule` | Individual rule: id, field, operator, value |
| `SegmentOperator` | Operator union: `'equals' \| 'not_equals' \| 'greater_than' \| 'less_than' \| 'contains' \| 'in' \| 'between'` |
| `Customer` | Customer data for rule evaluation: id, firstName, lastName, email, tier, pointsBalance, totalSpend, lastPurchaseDate, city, country, isActive |

## Design Guidelines

- Use Essence design tokens for all colors, spacing, and typography
- Rule builder should feel intuitive: each rule is a row with clear visual structure
- Use connecting "AND" labels between rules to show the relationship
- Use color-coded tier badges: Bronze → neutral, Silver → info, Gold → warning, Platinum → success
- Form fields should use the `Input` component's built-in label and error props
- Use CSS Modules for component-specific styles
- Desktop-first layout; the rule builder works best at wider viewports
- Segment list items should have `cursor: pointer` and a hover effect

## Prioritization

If time is limited, build features in this order:

1. **Segment List** (~7 min) — Entry point, shows existing data
2. **Segment Detail View** (~8 min) — Read-only view of rules + matching customers
3. **Rule Builder** (~12 min) — Core interactive feature, most complex
4. **Segment Preview** (~7 min) — Evaluation logic + results display
5. **Create Segment** (~6 min) — Form to complete the creation flow

**Minimum Viable Segments:** Features 1 + 2 give a useful read-only segment explorer in ~15 minutes. Add Feature 3 for the full interactive experience.

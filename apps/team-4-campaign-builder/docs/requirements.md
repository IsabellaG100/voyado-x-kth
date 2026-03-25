# Campaign Builder — Business Requirements

## Overview

The Campaign Builder is a marketer-facing tool for creating, previewing, and managing marketing campaigns across multiple channels (email, SMS, push notifications). It provides a campaign list view, a multi-step creation wizard, content editing with merge tag preview, and campaign status management. This module represents a core workflow in the Voyado Engage platform — building and scheduling targeted marketing communications. All data comes from static JSON files; campaigns created during the session are stored in React state only.

## User Persona

**Marcus — Marketing Manager**
Marcus runs weekly email campaigns and monthly SMS promotions for a retail brand. He needs to quickly create campaigns by choosing a channel, picking a template, customizing the content with merge tags (like `{{first_name}}`), and scheduling the send. He also monitors existing campaigns and adjusts their status (pausing, resuming, or moving them back to draft). He expects a wizard-style flow that guides him step by step.

## Features

### Feature 1: Campaign List

**Priority:** Must Have

**Description:** The default view showing all existing campaigns. Each campaign is displayed as a card or table row with: campaign name, channel icon/label (email/SMS/push), status badge (draft/scheduled/sent/paused), scheduled send date, and audience size. The list gives Marcus a quick overview of all campaign activity.

**Acceptance Criteria:**
- [ ] All campaigns from `data/campaigns.json` are displayed as cards or table rows
- [ ] Each campaign shows: name, channel with an icon or label (📧 Email, 💬 SMS, 🔔 Push), status as a colored `Badge`, scheduled date formatted as "DD MMM YYYY HH:mm", and audience size with thousands separator
- [ ] Status badges use appropriate variants: draft → `neutral`, scheduled → `info`, sent → `success`, paused → `warning`
- [ ] Campaigns are sorted by scheduled date (nearest future date first)
- [ ] Clicking a campaign transitions to the Campaign Detail View (Feature 3)
- [ ] A "Create Campaign" button is prominently displayed at the top

**Component Mapping:**
- Use `Card` with `hoverable` from `@voyado-kth/ui` for campaign cards
- Use `Badge` for status indicators
- Use `Button` for "Create Campaign"
- Use `Chip` for channel labels (optional)

---

### Feature 2: Create Campaign Wizard

**Priority:** Must Have

**Description:** A multi-step wizard for creating new campaigns. The wizard has 4 steps, each presented as a distinct view with "Back" and "Next" navigation. A step indicator shows the current position in the flow. The wizard collects all information needed to define a campaign.

#### Step 1: Choose Channel

Select the campaign channel from 3 options presented as large, clickable cards: Email, SMS, and Push. Each card shows an icon, channel name, and a brief description. Only one can be selected.

#### Step 2: Select Template

A gallery of templates filtered by the chosen channel. Templates are displayed as thumbnail cards with the template name. The user selects one template.

#### Step 3: Edit Content

A content editing form with:
- **Campaign name** — text input
- **Subject line** — text input (for email; label changes to "Message header" for SMS/push)
- **Body text** — textarea for the message content

The body text supports merge tags: `{{first_name}}`, `{{last_name}}`, `{{tier}}`, `{{points_balance}}`. A **preview pane** on the right renders the content with sample data (e.g., `{{first_name}}` → "Anna").

#### Step 4: Review & Schedule

A summary view showing all choices: channel, template name, campaign name, subject, body preview, and a date input for scheduling. A "Create Campaign" button finalizes the wizard.

**Acceptance Criteria:**
- [ ] A step indicator (numbered steps or breadcrumb) shows the current step and completed steps (e.g., "Step 2 of 4" or visual dots/bar)
- [ ] Step 1 presents 3 channel cards; selecting one highlights it and enables the "Next" button
- [ ] Step 2 shows only templates matching the selected channel from `data/templates.json`; selecting a template highlights it
- [ ] Step 3 shows content inputs with a live preview pane that replaces merge tags with sample data (e.g., `{{first_name}}` → "Anna", `{{tier}}` → "Gold", `{{points_balance}}` → "2,450")
- [ ] Step 4 shows a read-only summary of all selections with a date/time input for scheduling
- [ ] "Back" and "Next" buttons navigate between steps; "Back" preserves entered data
- [ ] "Create Campaign" on Step 4 adds the campaign to the list (React state) and returns to the Campaign List

**Component Mapping:**
- Use `Card` from `@voyado-kth/ui` for channel selection cards and template gallery cards
- Use `Button` for navigation (Back/Next/Create)
- Use `Input` for campaign name, subject line, and date inputs
- Use `Badge` for the step indicator
- Use `Tabs` for step navigation (optional alternative to buttons)

---

### Feature 3: Campaign Detail

**Priority:** Should Have

**Description:** A detail view shown when clicking a campaign from the list. It displays all campaign properties in a clear, structured layout: channel, template used, content preview (with merge tags rendered using sample data), status, scheduled date, and audience size. This is a read-only informational view.

**Acceptance Criteria:**
- [ ] The view shows the campaign name as a heading
- [ ] Channel is displayed with its icon and label
- [ ] The template name is shown
- [ ] Content (subject and body) is displayed with merge tags rendered using sample data
- [ ] Status is shown as a colored `Badge` with status management controls (Feature 4)
- [ ] A "Back to Campaigns" button returns to the campaign list

**Component Mapping:**
- Use `Card` from `@voyado-kth/ui` for the detail container and content preview section
- Use `Badge` for status and channel display
- Use `Button` for back navigation and status controls

---

### Feature 4: Status Management

**Priority:** Should Have

**Description:** On the Campaign Detail view, the user can change a campaign's status. Valid transitions are:
- `draft` → `scheduled` (when a date is set)
- `scheduled` → `paused`
- `paused` → `scheduled`
- `scheduled` → `draft`
- `sent` campaigns cannot be modified

This is implemented as buttons or a dropdown on the detail view. Status changes update the React state.

**Acceptance Criteria:**
- [ ] The current status is displayed as a `Badge` on the detail view
- [ ] Action buttons are shown based on valid transitions (e.g., a "draft" campaign shows "Schedule" button; a "scheduled" campaign shows "Pause" and "Move to Draft" buttons)
- [ ] Clicking a status action immediately updates the campaign's status in React state
- [ ] Campaigns with status "sent" show no action buttons (status is final)
- [ ] The Campaign List view reflects status changes after navigating back
- [ ] A brief confirmation message or visual feedback appears after a status change (use `Alert` component)

**Component Mapping:**
- Use `Button` from `@voyado-kth/ui` for status action buttons (variant: `primary` for promote, `neutral` for demote, `danger` for pause)
- Use `Badge` for current status display
- Use `Alert` with `variant="success"` for confirmation feedback

---

## Data Sources

All data is loaded from static JSON files in the `data/` directory.

| File | Description | Shape |
|------|-------------|-------|
| `data/campaigns.json` | Array of existing campaigns | `Campaign[]` |
| `data/templates.json` | Array of message templates, organized by channel | `CampaignTemplate[]` |

### Sample Campaign Shape

```json
{
  "id": "camp-001",
  "name": "Summer Sale Kickoff",
  "channel": "email",
  "status": "scheduled",
  "scheduledDate": "2025-06-15T10:00:00",
  "audienceSize": 12500,
  "templateId": "tpl-email-01",
  "subject": "Hey {{first_name}}, Summer Sale starts now! ☀️",
  "content": "Hi {{first_name}},\n\nAs a valued {{tier}} member with {{points_balance}} points, you get early access to our Summer Sale!\n\nDon't miss out on exclusive deals just for you.\n\nSee you soon!"
}
```

### Sample Template Shape

```json
{
  "id": "tpl-email-01",
  "name": "Promotional Banner",
  "channel": "email",
  "thumbnailUrl": "",
  "layout": "hero-image-top"
}
```

### Merge Tag Sample Data

Use these sample values for rendering merge tags in the preview pane:

| Merge Tag | Sample Value |
|-----------|-------------|
| `{{first_name}}` | Anna |
| `{{last_name}}` | Lindström |
| `{{tier}}` | Gold |
| `{{points_balance}}` | 2,450 |

## Component Library

Use these components from `@voyado-kth/ui`:

| Component | Used For |
|-----------|----------|
| `Card` | Campaign list items, channel selection cards, template gallery, detail container |
| `Badge` | Campaign status, step indicator, channel labels |
| `Button` | Create Campaign, wizard navigation (Back/Next), status actions |
| `Input` | Campaign name, subject line, schedule date |
| `Chip` | Channel labels (optional), merge tag display |
| `Alert` | Status change confirmation, validation feedback |
| `Tabs` | Optional: wizard step navigation |

**Import pattern:**
```tsx
import { Card, Badge, Button, Input, Alert } from '@voyado-kth/ui';
```

## Shared Types

Import these types from `@voyado-kth/shared`:

```tsx
import type { Campaign, CampaignChannel, CampaignStatus, CampaignTemplate } from '@voyado-kth/shared';
```

| Type | Used For |
|------|----------|
| `Campaign` | Campaign data: id, name, channel, status, scheduledDate, audienceSize, templateId, subject, content |
| `CampaignChannel` | Channel union: `'email' \| 'sms' \| 'push'` |
| `CampaignStatus` | Status union: `'draft' \| 'scheduled' \| 'sent' \| 'paused'` |
| `CampaignTemplate` | Template data: id, name, channel, thumbnailUrl, layout |

## Design Guidelines

- Use Essence design tokens for all colors, spacing, and typography
- Channel icons: use emoji (📧 💬 🔔) or simple SVG icons for Email, SMS, Push
- Template thumbnails: since `thumbnailUrl` is empty, render colored placeholder cards with the template name and a layout icon
- Merge tag preview: replace `{{tag}}` in content with sample data; highlight replaced values with a subtle background color (`--ess-color-info-bg`)
- Status badge colors: draft → `neutral`, scheduled → `info`, sent → `success`, paused → `warning`
- Wizard step indicator: show numbered circles or a progress bar, highlighting the current step
- Use CSS Modules for component-specific styles
- Desktop-first layout; the wizard works best at wider viewports
- The content editor and preview should be side-by-side (2 columns) on desktop

## Prioritization

If time is limited, build features in this order:

1. **Campaign List** (~8 min) — Entry point, shows existing campaigns with status badges
2. **Create Campaign Wizard — Steps 1 & 2** (~10 min) — Channel selection + template gallery
3. **Create Campaign Wizard — Step 3** (~8 min) — Content editor with merge tag preview
4. **Create Campaign Wizard — Step 4** (~6 min) — Review summary + schedule
5. **Campaign Detail** (~5 min) — Read-only detail view
6. **Status Management** (~5 min) — Status transition buttons

**Minimum Viable Campaign Builder:** Features 1 + partial Feature 2 (steps 1–2) give a meaningful campaign overview with channel/template selection in ~18 minutes. Adding Step 3 makes it compelling with the live merge tag preview.

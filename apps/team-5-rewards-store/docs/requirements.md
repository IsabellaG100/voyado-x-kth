# Rewards Store — Business Requirements

## Overview

The Rewards Store is a member-facing storefront where loyalty program members can browse available rewards and redeem them using their accumulated loyalty points. It provides a points balance overview, a browsable and filterable reward catalog, detailed reward views, a redemption confirmation flow, and a redemption history. This module represents the "spend" side of the loyalty loop in Voyado Engage — motivating members to engage with the program by offering tangible value for their points.

## User Persona

**Sofia — Loyalty Program Member**
Sofia is a Silver-tier loyalty member with 3,200 points. She visits the rewards store regularly to see what she can redeem. She likes to browse by category, check whether she has enough points for a particular reward, and occasionally redeem discounts or experiential rewards. She wants the process to be simple — see what's available, confirm her choice, and know it went through.

## Features

### Feature 1: Points Balance Header

**Priority:** Must Have

**Description:** A prominent header section at the top of the page displaying the current member's loyalty information: points balance (large, bold number), tier name with a colored badge, and member name. This gives Sofia an immediate understanding of her spending power before browsing rewards.

**Acceptance Criteria:**
- [ ] The member's points balance is displayed prominently in large font (e.g., "3,200 points") with thousands separator formatting
- [ ] The member's current tier is shown as a colored `Badge` (e.g., "Silver" with `info` variant)
- [ ] The member's name is displayed (e.g., "Welcome back, Sofia!")
- [ ] The points balance updates in real-time when a reward is redeemed (points are deducted)
- [ ] The header uses a visually distinct background (e.g., `--ess-color-primary-bg` or a subtle gradient) to separate it from the catalog below
- [ ] Data is loaded from `data/member.json`

**Component Mapping:**
- Use `Badge` from `@voyado-kth/ui` for the tier indicator
- Use `Card` as the header container with custom background styling

---

### Feature 2: Reward Catalog

**Priority:** Must Have

**Description:** A grid of reward cards displaying all available rewards. Each card shows an image placeholder (colored rectangle based on category), reward name, points cost, category tag, and a "Redeem" button. The "Redeem" button is disabled if the member doesn't have enough points for that reward. Unavailable rewards (out of stock) are visually muted.

**Acceptance Criteria:**
- [ ] All rewards from `data/rewards.json` are displayed in a responsive CSS Grid (3 columns on desktop)
- [ ] Each reward card shows: image placeholder (colored by category), reward name, points cost (e.g., "500 pts"), and category as a `Chip`
- [ ] Each card has a "Redeem" button; the button is disabled (grayed out) when the member's points balance is less than the reward's `pointsCost`
- [ ] Rewards with `available: false` or `stock: 0` show a "Sold Out" badge overlay and the redeem button is disabled
- [ ] Cards have a hover effect for interactive feel
- [ ] Clicking "Redeem" opens the Redemption Confirmation dialog (Feature 5)

**Component Mapping:**
- Use `Card` with `hoverable` from `@voyado-kth/ui` for reward cards
- Use `Chip` for category tags
- Use `Badge` for "Sold Out" indicator
- Use `Button` for "Redeem" (disabled state when insufficient points)

---

### Feature 3: Category Filter

**Priority:** Must Have

**Description:** A filter bar with category tabs or chips that filters the reward catalog by category. The three categories are: Discounts, Products, and Experiences. An "All" option shows all rewards. The filter shows the count of rewards per category.

**Acceptance Criteria:**
- [ ] Three category filters are displayed plus an "All" option: All, Discounts, Products, Experiences
- [ ] Each filter shows the category name and the number of rewards in that category (e.g., "Discounts (5)")
- [ ] Clicking a filter updates the reward catalog grid to show only matching rewards
- [ ] The active filter is visually highlighted
- [ ] Filtering is instant (React state driven, no loading)
- [ ] The filter also respects availability — only available rewards are counted (stretch goal)

**Component Mapping:**
- Use `Tabs` from `@voyado-kth/ui` for the category filter (tab per category), or use `Chip` components

---

### Feature 4: Reward Detail

**Priority:** Should Have

**Description:** Clicking a reward card (on the name or image area, not the "Redeem" button) shows a detailed view of the reward. The detail view displays: larger image placeholder, full name, full description, points cost, category chip, availability status, remaining stock count, and a "Redeem" button. This can be implemented as a view toggle (replace grid with detail) or a modal/panel.

**Acceptance Criteria:**
- [ ] Clicking a reward card transitions to a detail view for that reward
- [ ] The detail view shows: larger image placeholder, reward name as heading, full description text, points cost prominently displayed, category chip, stock remaining (e.g., "12 left"), and availability status
- [ ] A "Redeem" button is displayed, disabled if insufficient points or if reward is unavailable/out of stock
- [ ] A "Back to Rewards" button returns to the catalog view
- [ ] The back navigation preserves the previously selected category filter
- [ ] If the reward is sold out, an `Alert` with a "Sold Out" message is displayed

**Component Mapping:**
- Use `Card` from `@voyado-kth/ui` for the detail container
- Use `Chip` for category
- Use `Badge` for stock count and availability
- Use `Button` for "Redeem" and "Back" navigation
- Use `Alert` for sold-out or insufficient-points messages

---

### Feature 5: Redemption Confirmation

**Priority:** Must Have

**Description:** When the user clicks "Redeem" on a reward, a confirmation dialog appears asking them to confirm the redemption. The dialog shows the reward name, the points cost, and the member's current balance. On confirmation, the points are deducted from the member's balance (React state), the reward's stock is decremented, and a new entry is added to the redemption history. On cancel, nothing happens.

**Acceptance Criteria:**
- [ ] Clicking "Redeem" opens a modal/dialog overlay with a semi-transparent backdrop
- [ ] The dialog shows: "Redeem [Reward Name]?", the points cost, the member's current points balance, and the balance after redemption (e.g., "Your balance: 3,200 pts → 2,700 pts after redemption")
- [ ] Two buttons are displayed: "Confirm Redemption" (primary) and "Cancel" (neutral)
- [ ] Clicking "Confirm" deducts the points from the member's balance in React state, decrements the reward's stock by 1, and adds an entry to the redemption history
- [ ] Clicking "Cancel" closes the dialog without any changes
- [ ] After confirmation, a brief success message is shown (e.g., `Alert` with "Successfully redeemed [Reward Name]!")

**Component Mapping:**
- Build a simple modal/dialog component using a `div` overlay with `Card` inside, or use CSS for modal pattern
- Use `Button` for "Confirm" (`variant="primary"`) and "Cancel" (`variant="neutral"`)
- Use `Alert` with `variant="success"` for the success confirmation

---

### Feature 6: Redemption History

**Priority:** Should Have

**Description:** A section or tab showing the member's past redemptions. Each entry shows: reward name, points spent, and the date of redemption. The history includes both pre-loaded data from `data/redemptions.json` and any new redemptions made during the session. This section can be accessed via a tab (e.g., "Store" / "My Redemptions") or shown as a section below the catalog.

**Acceptance Criteria:**
- [ ] A tab or section labeled "My Redemptions" or "Redemption History" shows past redemptions
- [ ] Each redemption entry shows: reward name, points spent (e.g., "−500 pts"), and date formatted as "DD MMM YYYY"
- [ ] Entries are sorted by date (most recent first)
- [ ] Pre-loaded redemptions from `data/redemptions.json` are displayed
- [ ] New redemptions made during the session appear at the top of the list
- [ ] If no redemptions exist, an empty state message is shown (e.g., "No redemptions yet. Browse rewards to get started!")

**Component Mapping:**
- Use `Tabs` from `@voyado-kth/ui` to switch between "Store" and "My Redemptions" views
- Use `Card` for each redemption entry or a styled list
- Use `Badge` for points-spent display

---

## Data Sources

All data is loaded from static JSON files in the `data/` directory.

| File | Description | Shape |
|------|-------------|-------|
| `data/rewards.json` | Array of available rewards in the store | `Reward[]` |
| `data/member.json` | Current member's profile and points balance | `Customer` (single object) |
| `data/redemptions.json` | Array of the member's past redemptions | `Redemption[]` |

### Sample Reward Shape

```json
{
  "id": "rwd-001",
  "name": "20% Off Next Purchase",
  "description": "Get 20% discount on your next online or in-store purchase. Valid for 30 days after redemption.",
  "pointsCost": 500,
  "category": "discount",
  "imageUrl": "",
  "available": true,
  "stock": 50
}
```

### Sample Member Shape

```json
{
  "id": "cust-042",
  "firstName": "Sofia",
  "lastName": "Andersson",
  "email": "sofia.andersson@example.com",
  "tier": "Silver",
  "pointsBalance": 3200,
  "totalSpend": 8750,
  "lastPurchaseDate": "2025-01-10",
  "enrollmentDate": "2023-06-15",
  "city": "Gothenburg",
  "country": "Sweden",
  "isActive": true
}
```

### Sample Redemption Shape

```json
{
  "id": "red-001",
  "rewardId": "rwd-001",
  "rewardName": "20% Off Next Purchase",
  "pointsSpent": 500,
  "redeemedDate": "2025-01-05",
  "customerId": "cust-042"
}
```

## Component Library

Use these components from `@voyado-kth/ui`:

| Component | Used For |
|-----------|----------|
| `Card` | Points balance header, reward cards, reward detail, redemption dialog, redemption history items |
| `Badge` | Tier indicator, points display, "Sold Out" overlay, stock count |
| `Button` | Redeem actions, confirmation/cancel, back navigation |
| `Chip` | Category tags on reward cards, category filter (alternative to Tabs) |
| `Tabs` | Category filter, Store/History view switcher |
| `Alert` | Success message after redemption, sold-out warnings, empty states |

**Import pattern:**
```tsx
import { Card, Badge, Button, Chip, Tabs, Alert } from '@voyado-kth/ui';
```

## Shared Types

Import these types from `@voyado-kth/shared`:

```tsx
import type { Reward, RewardCategory, Redemption, Customer } from '@voyado-kth/shared';
```

| Type | Used For |
|------|----------|
| `Reward` | Reward data: id, name, description, pointsCost, category, imageUrl, available, stock |
| `RewardCategory` | Category union: `'discount' \| 'product' \| 'experience'` |
| `Redemption` | Redemption record: id, rewardId, rewardName, pointsSpent, redeemedDate, customerId |
| `Customer` | Member data: used for `data/member.json` (single member profile) |

## Design Guidelines

- Use Essence design tokens for all colors, spacing, and typography
- Points balance header: use a prominent styling — consider `--ess-color-primary-bg` background with `--ess-color-primary-text` (white) text for contrast
- Category colors for image placeholders: Discounts → `--ess-color-green`, Products → `--ess-color-blue`, Experiences → `--ess-color-purple`
- Disabled "Redeem" buttons should be clearly grayed out (the `Button` component handles this natively via `disabled` prop)
- Points formatting: always show "pts" suffix (e.g., "500 pts")
- Redemption confirmation modal: use a centered card with a semi-transparent overlay (`background: rgba(0,0,0,0.4)` with `position: fixed`)
- Use CSS Modules for component-specific styles
- Desktop-first layout; mobile-responsive is a stretch goal

## Prioritization

If time is limited, build features in this order:

1. **Points Balance Header** (~5 min) — Sets the context, simple to build
2. **Reward Catalog** (~10 min) — Core visual, shows all rewards with disabled state logic
3. **Category Filter** (~5 min) — Quick filter using `Tabs`
4. **Redemption Confirmation** (~8 min) — Core interaction: modal + state update
5. **Reward Detail** (~7 min) — Expanded view of single reward
6. **Redemption History** (~7 min) — History list with tab switching

**Minimum Viable Rewards Store:** Features 1–4 give a fully functional browse-and-redeem experience in ~28 minutes.

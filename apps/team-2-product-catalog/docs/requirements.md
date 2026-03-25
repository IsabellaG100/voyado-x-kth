# Product Catalog — Business Requirements

## Overview

The Product Catalog is a customer-facing e-commerce browsing experience where loyalty members can explore products, filter by category, search by name, sort by various criteria, and manage a personal wishlist. This module demonstrates a typical product browsing flow within the Voyado Engage ecosystem — the kind of storefront experience that Voyado's platform powers for retail brands. All data comes from static JSON files; no backend or API calls are needed.

## User Persona

**Erik — Loyalty Member & Online Shopper**
Erik is a Gold-tier loyalty member who regularly browses the brand's online catalog. He likes to filter by category (he's mainly interested in shoes and accessories), search for specific items, and save products to his wishlist for later. He expects a responsive, polished shopping experience where he can quickly find what he's looking for.

## Features

### Feature 1: Product Grid

**Priority:** Must Have

**Description:** A responsive grid of product cards showing the full catalog. Each card displays a visual product placeholder (a colored rectangle with the product's initials), the product name, price, category tag, star rating, and a heart icon to toggle wishlist status. The grid should be visually clean and scannable.

**Acceptance Criteria:**
- [ ] All products from `data/products.json` are displayed in a responsive CSS Grid (3–4 columns on desktop, adjusting down on smaller viewports)
- [ ] Each product card shows: image placeholder (colored `div` with product name initials), product name, formatted price with currency (e.g., "349 SEK"), category as a `Chip`, and a star rating display (e.g., ★★★★☆ for 4.0)
- [ ] Each card has a heart icon (♡ outline / ♥ filled) that toggles wishlist status on click
- [ ] Cards have a subtle hover effect (use `Card` with `hoverable` prop)
- [ ] Products that are out of stock show a visual indicator (e.g., grayed out or "Out of Stock" overlay badge)
- [ ] Clicking a product card navigates to the Product Detail View (Feature 6)

**Component Mapping:**
- Use `Card` with `hoverable` prop from `@voyado-kth/ui`
- Use `Chip` for category tags
- Use `Badge` for "Out of Stock" indicator

---

### Feature 2: Category Filter

**Priority:** Must Have

**Description:** A filter bar (sidebar or horizontal top bar) showing all product categories. Each category displays its name and the number of products it contains. Clicking a category filters the product grid to show only matching products. An "All" option shows all products. Multiple categories cannot be selected simultaneously — it's single-select.

**Acceptance Criteria:**
- [ ] All categories from `data/categories.json` are displayed as clickable `Chip` components
- [ ] Each chip shows the category name and product count (e.g., "Shoes (12)")
- [ ] An "All" chip is included as the first option, showing the total product count
- [ ] Clicking a category chip filters the product grid to show only products in that category
- [ ] The active category chip is visually highlighted (use `variant="colored"`)
- [ ] Filtering updates instantly without page reload (React state driven)

**Component Mapping:**
- Use `Chip` from `@voyado-kth/ui` for each category filter
- Active chip uses `variant="colored"`, inactive uses `variant="neutral"`

---

### Feature 3: Search

**Priority:** Must Have

**Description:** A search input field that filters products by name in real-time as the user types. The search is case-insensitive and matches partial strings (i.e., typing "sneak" matches "Sneakers" and "Classic Sneaker"). The search works in combination with the active category filter — both filters apply simultaneously.

**Acceptance Criteria:**
- [ ] A search input is displayed prominently above the product grid
- [ ] Typing in the search field filters products in real-time (on each keystroke)
- [ ] Search is case-insensitive and matches partial product names
- [ ] Search works in combination with the category filter (both filters apply)
- [ ] When no products match, a friendly empty state message is displayed (e.g., "No products found for '[query]'")
- [ ] Clearing the search field (or pressing a clear button) shows all products for the current category

**Component Mapping:**
- Use `Input` with `type="search"` and `placeholder="Search products..."` from `@voyado-kth/ui`

---

### Feature 4: Sort Options

**Priority:** Should Have

**Description:** A sort control that lets users reorder the product grid. Sort options include: Price (low to high), Price (high to low), Name (A–Z), and Rating (highest first). The default sort is by Name (A–Z). Sorting applies on top of any active filters.

**Acceptance Criteria:**
- [ ] A sort dropdown/select or button group is displayed near the search bar
- [ ] Sort options are: "Price: Low to High", "Price: High to Low", "Name: A–Z", "Rating: Highest"
- [ ] Selecting a sort option immediately reorders the product grid
- [ ] Sorting works in combination with active category filter and search query
- [ ] The currently active sort option is visually indicated
- [ ] Default sort order is "Name: A–Z"

**Component Mapping:**
- Use a native `<select>` element styled with Essence tokens, or build with `Button` group from `@voyado-kth/ui`

---

### Feature 5: Wishlist

**Priority:** Should Have

**Description:** Users can toggle individual products as "wishlisted" by clicking the heart icon on product cards or the detail view. A wishlist count is displayed in a badge somewhere visible (e.g., next to the page title). Wishlist state is managed in React state and is not persisted across page reloads.

**Acceptance Criteria:**
- [ ] Clicking the heart icon on a product card toggles its wishlist status (filled ♥ = wishlisted, outline ♡ = not wishlisted)
- [ ] A badge near the page header shows the total number of wishlisted products (e.g., "Wishlist (3)")
- [ ] Wishlisted products remain visually marked across category/search filter changes
- [ ] The wishlist toggle also works from the Product Detail View
- [ ] Wishlist state is stored in React component state (using `useState` or `useReducer`)
- [ ] The badge is hidden or shows "0" when no products are wishlisted

**Component Mapping:**
- Use `Badge` from `@voyado-kth/ui` for the wishlist count
- Heart icon: use Unicode characters (♡/♥) or a simple SVG toggle

---

### Feature 6: Product Detail View

**Priority:** Should Have

**Description:** Clicking a product card reveals a detailed view of that product. This can be implemented as a modal, a side panel, or a separate section that replaces the grid (using React state to toggle views — no router needed). The detail view shows: larger image placeholder, full description, price, category, tags as chips, rating, stock status, and an "Add to Wishlist" button.

**Acceptance Criteria:**
- [ ] Clicking a product card transitions to a detail view for that product
- [ ] The detail view shows: larger image placeholder, product name as heading, full description text, formatted price, category chip, all tags as individual chips, star rating, and stock availability status
- [ ] An "Add to Wishlist" / "Remove from Wishlist" button is displayed, synced with the wishlist state
- [ ] A "Back to Catalog" button or link returns to the product grid view
- [ ] The back navigation preserves the previous filter and search state
- [ ] Out-of-stock products show a prominent "Out of Stock" alert or badge

**Component Mapping:**
- Use `Card` from `@voyado-kth/ui` as the detail container
- Use `Chip` for category and tags
- Use `Badge` for stock status
- Use `Button` for wishlist toggle and back navigation
- Use `Alert` for out-of-stock notice (optional)

---

## Data Sources

All data is loaded from static JSON files in the `data/` directory. Import them directly.

| File | Description | Shape |
|------|-------------|-------|
| `data/products.json` | Array of products with name, price, category, tags, rating, stock status | `Product[]` |
| `data/categories.json` | Array of product categories with product counts | `ProductCategory[]` |

### Sample Product Shape

```json
{
  "id": "prod-001",
  "name": "Classic Leather Sneakers",
  "description": "Premium leather sneakers with cushioned sole. Perfect for everyday wear.",
  "price": 1299,
  "currency": "SEK",
  "category": "Shoes",
  "tags": ["leather", "casual", "bestseller"],
  "imageUrl": "",
  "inStock": true,
  "rating": 4.5
}
```

## Component Library

Use these components from `@voyado-kth/ui`:

| Component | Used For |
|-----------|----------|
| `Card` | Product cards (with `hoverable`), detail view container |
| `Chip` | Category filter chips, product tags |
| `Badge` | Wishlist count, out-of-stock indicator, rating badge |
| `Button` | Wishlist toggle, back navigation, sort controls |
| `Input` | Search bar |
| `Alert` | Empty state messages, out-of-stock warnings (optional) |

**Import pattern:**
```tsx
import { Card, Chip, Badge, Button, Input } from '@voyado-kth/ui';
```

## Shared Types

Import these types from `@voyado-kth/shared`:

```tsx
import type { Product, ProductCategory } from '@voyado-kth/shared';
```

| Type | Used For |
|------|----------|
| `Product` | Product data: id, name, description, price, currency, category, tags, imageUrl, inStock, rating |
| `ProductCategory` | Category filter data: id, name, productCount |

## Design Guidelines

- Use Essence design tokens for all colors, spacing, and typography
- Product card image placeholders: generate a background color from the product category or name, display the product's initials in large text (e.g., "CLS" for "Classic Leather Sneakers")
- Star ratings: use filled (★) and empty (☆) Unicode stars, colored with `--ess-color-warning-bg` (gold)
- Heart icons: `--ess-color-danger-bg` (red) when filled, `--ess-color-neutral-fg-weak` (gray) when empty
- Use CSS Grid for the product grid: `grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))`
- Use CSS Modules for component-specific styles
- Price formatting: display as whole number with currency code (e.g., "1 299 SEK")
- Desktop-first layout; mobile-responsive is a stretch goal

## Prioritization

If time is limited, build features in this order:

1. **Product Grid** (~10 min) — Core visual, highest impact
2. **Category Filter** (~7 min) — Essential for usability
3. **Search** (~5 min) — Quick to implement with `Input` + filter
4. **Sort Options** (~5 min) — Simple sort logic
5. **Wishlist** (~7 min) — State management practice
6. **Product Detail View** (~8 min) — View toggling adds complexity

**Minimum Viable Catalog:** Features 1–3 give a functional, filterable product browsing experience in ~22 minutes.

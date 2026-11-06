# A2 Design System Foundation

**Status:** skeleton specification; shared styles are introduced, component adoption is incremental.

## Design goals
- Professional, calm, high-clarity interface for retail, wholesale, and mixed businesses.
- Desktop workspaces prioritize dense operational tables; mobile prioritizes focused tasks and quick actions.
- Consistent components across every module; no one-off styling where a shared pattern fits.
- English is the default product locale. Persian is a supported locale with RTL direction.
- Accessible keyboard focus, readable contrast, reduced-motion support, and clear status text.

## Visual foundations
The shared `design-system.css` defines brand, neutral, semantic, spacing, radius, shadow, sizing, and motion tokens. Existing styles remain compatible while future screens migrate to these tokens.

## Component inventory
1. **Navigation:** desktop sidebar, compact mobile navigation, breadcrumbs, workspace selector, profile menu.
2. **Actions:** primary, secondary, tertiary/text, destructive, icon-only, split action.
3. **Data display:** metric card, table, list row, filter chip, status badge, timeline, summary panel.
4. **Forms:** text, number, money, date, select, searchable select, checkbox, radio, segmented choice, validation and helper text.
5. **Feedback:** empty, loading/skeleton, success, warning, error, offline, pending-sync and permission states.
6. **Overlays:** dialog, confirmation, drawer, command/search palette, toast.
7. **Operational patterns:** filter toolbar, bulk selection, document summary, line-item editor, totals panel, activity history.

## Page template
Every module uses: title + purpose; contextual actions; filters; summary only when useful; primary work area; pagination or totals where relevant; explicit empty/error/loading states; contextual help.

## Responsive behavior
- Wide desktop: full navigation and multi-column operational workspace.
- Tablet: collapsible navigation and reduced card columns.
- Phone: one-column forms, horizontally scrollable data tables, compact bottom/slide navigation, sticky task actions only when they do not obscure content.
- Avoid fixed-width content and avoid relying on hover for essential actions.

## Financial UI rules
- Always show currency code/symbol with amounts where ambiguity is possible.
- Separate quantity, unit price, discount, tax, paid, due, and total.
- Never imply that tax, exchange rates, or accounting calculations are active unless configured and implemented.
- Use confirmation and a clear audit context for destructive or financially significant actions in future functional phases.

## Skeleton boundary
The CSS utilities and tokens are presentation foundations only. They do not implement business transactions, authentication, persistence, database access, synchronization, billing, or integrations.

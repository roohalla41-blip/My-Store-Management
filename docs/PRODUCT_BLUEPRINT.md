# A2 — Global Store Management Product Blueprint

## Product vision

A dependable, multilingual, multi-device store-management platform for independent shops, growing retailers, and multi-branch businesses. It should be understandable for a first-time shop owner while offering a path to professional point-of-sale, inventory, cash management, and accounting workflows.

## Product principles

1. **Financial correctness before visual complexity.** Every financial total must have a defined meaning and traceable source.
2. **One coherent workspace.** Sales, stock, purchasing, cash, and reports must agree with one another.
3. **Offline-aware, not offline-only.** The user should understand whether work is local, synchronized, pending, or failed.
4. **No false promises.** Planned online sign-in, cloud backup, payments, integrations, and tax calculations must be visibly marked unavailable until implemented and tested.
5. **International by design.** Locale, language, currency, number format, tax rules, and time zone are separate settings.
6. **Accessible and responsive.** Core tasks must work with keyboard, touch, screen readers, and narrow screens.
7. **Secure by default.** Least privilege, auditability, privacy, and data export are product requirements, not later decorations.
8. **Extensible modules.** Features should be separable so the product can grow without turning one large script into an unmaintainable system.

## Target audiences

- Solo shop owner / proprietor
- Cashier / point-of-sale operator
- Store manager
- Inventory clerk / warehouse operator
- Purchasing officer
- Accountant / finance reviewer
- Multi-branch owner / administrator

## Product editions (conceptual)

- **Local / Starter:** one device, local data, clear backup and restore warnings.
- **Cloud / Business:** planned multi-device synchronization, user accounts, permissions, and managed backups.
- **Multi-branch / Advanced:** planned branch and warehouse operations, consolidated reporting, and advanced controls.

These are product concepts only. No subscription, billing, authentication, or cloud behavior is implemented by this blueprint.

## Functional module catalogue

### Daily operations
- Overview dashboard and task center
- Point of sale (POS) / checkout
- Sales invoices, quotes, orders, receipts
- Returns, refunds, exchanges, voids, and credit notes
- Cash register sessions, opening float, cash in/out, closing count, and variance

### Products and inventory
- Product and service catalogue
- Categories, brands, units, variants, bundles, and barcodes
- Stock on hand, reserved, available, and reorder levels
- Stock receipts, issues, adjustments, transfers, and stock counts
- Multiple warehouses / locations
- Batch, serial number, and expiry tracking where relevant
- Stock movement history and valuation reports

### Purchasing and relationships
- Suppliers and purchase orders
- Goods received notes and supplier bills
- Purchase returns
- Customers, customer groups, statements, and credit limits
- Supplier statements and payable balances

### Finance and accounting
- Cash and bank accounts
- Receipts, payments, transfers, and reconciliations
- Expenses and expense categories
- Accounts receivable and payable
- Conceptual double-entry general ledger
- Trial balance, profit and loss, balance sheet, and cash-flow reports
- Period closing and controlled corrections

### People and governance
- Employees and teams
- Roles and permissions
- Activity/audit history
- Branches and warehouses
- Approval workflows and operational settings

### Reporting and communication
- Sales, margin, stock, purchasing, customer, supplier, cash, and finance reports
- Date range, branch, cashier, category, and product filters
- Export/print layouts
- Notifications and low-stock task queue
- Help center, onboarding, and support

### Internationalization and platform
- Persian (RTL) and English (LTR) foundation
- Additional language packs
- Locale-specific dates, numbers, and currencies
- Tax configuration by jurisdiction (never assume one global rate)
- Responsive web/PWA foundation
- Android, iOS, Windows, and macOS delivery strategy

## Non-goals for the skeleton phase

- No database schema or migrations
- No Supabase project changes or credentials
- No real authentication or user accounts
- No payment processing or subscription billing
- No live tax, exchange-rate, shipping, or messaging integrations
- No claim of production-grade accounting
- No importing, deleting, or rewriting existing user records

## Definition of a complete product skeleton

- Every planned module has a place in the information architecture.
- Each page has a defined purpose, primary action, key states, and access considerations.
- Shared navigation, layout, typography, spacing, forms, tables, dialogs, and status patterns are consistent.
- Empty, loading, error, offline, and permission-denied states are specified.
- Mobile, tablet, desktop, RTL, and LTR behavior is defined.
- Modules are separated from persistence and external services.
- Existing prototype behavior remains identifiable and is not silently replaced.

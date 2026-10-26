# A2 — My Store Management

A professional, Persian-first (RTL) store-management web application foundation for product catalogues, inventory, sales, purchases, customers, suppliers, and business summaries.

## Current foundation

- Responsive RTL dashboard designed for desktop and mobile.
- Product catalogue: name, SKU, category, unit, purchase cost, sale price, stock, and minimum-stock threshold.
- Inventory overview with low-stock and out-of-stock indicators.
- Sales entry that checks available stock, records a basic invoice, and deducts stock.
- Purchase entry that records incoming goods and increases stock.
- Customer and supplier contact lists.
- Store profile and currency settings.
- Basic summaries and export of a local JSON backup.
- No demo products or fabricated business transactions are preloaded.

## Run locally

This is a static web application. Open `index.html` in a modern browser, or serve the repository with any static HTTP server. No package installation is required for the current foundation.

## Current storage and security limitations

**This is an initial prototype, not yet a production accounting system.**

- Data is saved in the current browser's `localStorage`; it is not synced to a server or shared between devices.
- Clearing browser/site data can remove the local records. Use the JSON backup feature regularly.
- There is no real login, role-based access control, database, multi-user synchronization, tax engine, returns workflow, or audited accounting ledger yet.
- Do not store sensitive customer information or rely on this prototype as the sole record system for a live business.
- The interface uses Google Fonts when available and falls back to local system fonts if unavailable.

## Project structure

```text
My-Store-Management/
├── index.html   # Accessible page structure and application shell
├── styles.css   # Responsive visual system and RTL layout
├── app.js       # Initial UI state, local persistence, and business interactions
└── README.md    # Setup, scope, limitations, and roadmap
```

## Recommended implementation roadmap

1. **Foundation and validation:** review all forms, mobile behavior, calculations, and edge cases.
2. **Reliable data layer:** introduce a database and migrations, stable identifiers, transaction-safe stock movements, and backup/restore.
3. **Authentication and permissions:** secure sign-in, owner/manager/cashier roles, and server-side authorization.
4. **Inventory operations:** stock adjustments, multiple locations, batches/expiry dates where relevant, stock movement history, and reorder reports.
5. **Sales and purchasing:** line-item invoices, discounts, payment methods, partial payments, returns, supplier balances, and printable receipts.
6. **Accounting-quality reports:** revenue, cost of goods sold, gross margin, expenses, cash movements, and date-range reports.
7. **Quality and deployment:** automated tests, accessibility review, error handling, monitoring, and production deployment.

## Currency and calculations

The selected currency is currently a display preference. Historical transactions are not converted when the setting changes. Sales and purchase workflows are intentionally basic and need further validation before production use.

## License

No license has been added yet. Add an appropriate license before redistributing the project.


## Access modes (current prototype)

- The entry screen separates **استفاده رایگان** (local/offline mode) from **استفاده پولی** (planned online mode).
- Free mode continues using the existing local browser storage key `a2_store_management_v1`; existing records are not deleted or renamed by the entry-screen change.
- The online option is deliberately not presented as a working registration/login yet. Supabase is not configured, so it shows a clear notice rather than falsely claiming that accounts or data were saved to a server.
- A service worker caches the static app after its first successful online visit so the interface can reopen offline. The browser must visit the site once while online first. Local browser/site data can still be removed by the device/browser, so use JSON backup regularly.
- Connecting Supabase later requires a real authentication/data layer, access rules, and a tested import/merge path for any local JSON backups. Merely adding the Supabase URL is not enough to migrate local data safely.


## Store registration and currency (updated)

- The first screen asks for store name, owner's first and last name, mobile number, and preferred currency.
- In free mode, these details are saved into the existing local state while preserving the current storage key `a2_store_management_v1` and existing products, customers, suppliers, sales, and purchases.
- Currency choices include Afghan afghani (AFN), toman, Iranian rial (IRR), US dollar (USD), and euro (EUR). The choice changes displayed currency labels only; it does not convert existing or future amounts between currencies.
- Paid/online registration remains unavailable until real Supabase authentication and database access are configured. The form does not claim to create an online account.


## Operating expenses and profit/loss

- Added an operating-expense register with date, category, amount and note.
- Reports now separate sales, recorded cost of goods sold, gross profit, registered operating expenses, and profit after those recorded expenses.
- This remains a local prototype; no server sync, authentication, audited ledger, customer/supplier debt ledger, returns/tax handling, or cash/bank reconciliation is implemented yet. Data remains in this browser and can be lost if browser storage is cleared; export backups regularly.


## Customer and supplier balances

- Sales and purchase forms now support partial payment; leaving the payment field blank means fully paid.
- The accounts page summarizes receivables from customers and payables to suppliers and allows recording additional receipts/payments against existing balances.
- Newly recorded sales/purchases are linked to the selected customer/supplier. Old records without an ID are preserved but are not automatically attributed to a party. Payments are currently account-level summaries, not invoice-by-invoice allocation.

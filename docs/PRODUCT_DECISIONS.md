# A2 Product Decisions: Business Types and Professional Scope

## Confirmed defaults
- Business coverage: **all** — retail, wholesale, and mixed retail/wholesale.
- Product depth: **professional**.
- Default interface locale: **English (en)**.
- Persian (fa) remains a planned supported locale with RTL layout.

## Product principles
- A single store may sell products, services, or both.
- Wholesale capabilities must not be forced into a retail-only workflow: customer-specific price lists, quantity breaks, quote/order flow, credit terms, and bulk documents belong in the product map.
- Retail workflows must remain fast: barcode-ready product lookup, cart, checkout, receipt, returns, and cash session.
- Mixed businesses can enable both sets of workflows without duplicating products or customers.
- Inventory must be designed for multiple warehouses and branches even if a small store starts with one.
- Cash register, bank, receivables/payables, expenses, and accounting are first-class modules, not decorative dashboard widgets.
- Advanced features should be progressively disclosed; a simple daily workflow must remain easy to find.

## Professional module groups
1. Workspace and overview
2. Catalog and pricing
3. Sales and point of sale
4. Purchasing and suppliers
5. Inventory and locations
6. Customers and credit
7. Cash, banks, and payments
8. Expenses and accounting
9. Employees, roles, and audit
10. Reports and analytics
11. Communication, support, and settings

## Future business configuration (UI specification only)
A setup flow may ask whether the business is retail, wholesale, or mixed; which product/service types it sells; whether it uses multiple branches/warehouses; and which optional modules it wants visible. These choices must be reversible and must not delete business data.

## Not in this phase
No database schema, SQL, Supabase resources, real sign-in, billing, external services, or production accounting engine.

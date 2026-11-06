# A2 Screen Map and Navigation Skeleton

This is the target page inventory. A page marked **planned** is a structural destination, not an implemented business workflow.

## Global application shell

- Entry / choose local or online mode (current local prototype only; online mode remains unavailable)
- Workspace switcher (planned)
- Global search / command menu (planned)
- Notifications and task center (planned)
- Help and keyboard shortcuts (planned)
- User profile and session controls (planned; no real session in skeleton)
- Connectivity and synchronization status (local / offline / pending / synced / error states defined for future use)

## 1. Home
- Overview dashboard
- Today’s activity
- Tasks and alerts
- Quick actions
- Recent documents

## 2. Point of sale
- Checkout terminal
- Product search / barcode entry
- Cart and line-item editor
- Customer selection
- Discounts and tax summary (configuration-dependent; not calculated in skeleton)
- Payment selection (cash, card, bank transfer, split payment — UI only)
- Receipt preview
- Held / parked carts
- Cash register opening and closing

## 3. Sales
- Sales list
- Invoice detail
- Quotes and orders
- Returns and exchanges
- Refunds and credit notes
- Sales by cashier / branch

## 4. Products
- Product and service list
- Product detail
- Create / edit product
- Categories and brands
- Units and product variants
- Barcode labels
- Price lists
- Bundles and kits

## 5. Inventory
- Stock overview
- Stock movement ledger
- Receive / issue stock
- Stock adjustment with reason
- Stock count
- Warehouse transfer
- Reorder suggestions
- Batch / serial / expiry tracking
- Inventory valuation

## 6. Purchasing
- Purchase orders
- Goods received
- Supplier bills
- Purchase returns
- Purchase history

## 7. Contacts
- Customer directory and profile
- Customer statement
- Supplier directory and profile
- Supplier statement
- Contact groups

## 8. Cash and banking
- Cash registers
- Cash sessions
- Cash in / cash out
- Cash transfers
- Bank accounts
- Bank transactions
- Reconciliation workspace

## 9. Expenses
- Expense list
- Expense categories
- Recurring expense setup (planned)
- Expense detail and attachments (planned)

## 10. Accounting
- Chart of accounts
- Journal entries
- General ledger
- Trial balance
- Profit and loss
- Balance sheet
- Cash-flow statement
- Accounting periods and closing

## 11. People and access
- Employee directory
- Employee profile
- Roles and permission matrix
- Invitations and access requests (future online phase)
- Activity and audit log

## 12. Locations
- Branch directory
- Branch detail
- Warehouse directory
- Stock by location
- Consolidated branch overview

## 13. Reports
- Sales and margin
- Product performance
- Inventory and valuation
- Purchasing
- Customer and supplier balances
- Cash and bank
- Expenses
- Financial statements
- Saved report views

## 14. Communication and support
- Notifications
- Low-stock alerts
- Help center
- Getting-started checklist
- Support requests
- Release notes

## 15. Settings
- Store profile
- Language and direction (RTL/LTR)
- Currency and number formats
- Date, time, and time zone
- Tax settings
- Invoice and receipt templates
- Barcode and printer preferences
- Backup and restore
- Import / export
- Privacy and security
- Integrations (future)
- Subscription and plan (future; no billing in skeleton)

## Standard page anatomy

Each module page should use the same layout:
1. Breadcrumb and page title
2. One-sentence purpose and current status
3. Primary action and secondary actions
4. Search, filters, and date range when relevant
5. Summary cards only when they add decision value
6. Main table/list/workspace
7. Empty state with a clear next step
8. Loading, error, offline, and permission states
9. Help text and contextual validation

## Navigation rules

- Group modules by the user's daily workflow, not by internal technology.
- Keep the most frequent actions within one or two taps on mobile.
- Do not show unavailable actions as if they work.
- Mark planned screens with a clear “در حال طراحی / Coming soon” status.
- Do not use demo financial figures that could be mistaken for real store records.
- Preserve a compact mobile navigation and a full desktop sidebar.

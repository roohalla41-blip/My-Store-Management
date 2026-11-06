# A2 Domain Glossary (Conceptual — Not a Database Schema)

This glossary establishes shared language before any persistence design. It does not prescribe tables, columns, SQL, or migrations.

## Business scope

- **Store:** a business workspace and its commercial identity.
- **Branch:** a physical or operational location belonging to a store.
- **Warehouse:** a place where stock is held; it may be associated with a branch.
- **User:** an authenticated person in a future online edition.
- **Employee:** a person working for the business; an employee record is not automatically a login.
- **Role:** a named set of allowed actions.
- **Permission:** a specific action or resource access decision.

## Products and inventory

- **Product:** an item that can be bought, stocked, or sold.
- **Service:** a sellable offering that may not have physical stock.
- **SKU:** the store's internal product code.
- **Barcode:** a machine-readable identifier; it may differ from the internal SKU.
- **Variant:** a sellable variation such as size, color, or pack.
- **Stock on hand:** physical quantity recorded at a location.
- **Reserved stock:** quantity committed to an order but not yet issued.
- **Available stock:** stock on hand less reserved quantity, subject to the chosen policy.
- **Stock movement:** a traceable increase, decrease, transfer, or correction.
- **Stock count:** a physical count compared with recorded quantity.
- **Reorder point:** a threshold that prompts replenishment review.

## Commercial documents

- **Quote:** proposed prices not yet treated as a completed sale.
- **Sales order:** customer commitment before fulfillment or final invoicing.
- **Sales invoice:** document recording goods/services sold and amounts due.
- **Receipt:** evidence of money received.
- **Purchase order:** request/authorization to buy from a supplier.
- **Goods received note:** evidence of items physically received.
- **Supplier bill:** amount owed to a supplier.
- **Return:** reversal/return workflow linked to an original document where possible.
- **Credit note:** document reducing an amount previously invoiced.
- **Refund:** money returned to a customer.

## Money and accounting

- **Money amount:** numeric value plus currency and precision/rounding policy.
- **Cash register:** physical till or cashier cash point.
- **Cash session:** an opening-to-closing operating period for a register.
- **Cash movement:** a recorded receipt, payout, transfer, or adjustment.
- **Receivable:** amount a customer owes the business.
- **Payable:** amount the business owes a supplier or other party.
- **Expense:** a cost recognized by the business under its accounting policy.
- **Revenue:** income recognized from sales under the chosen policy.
- **Cost of goods sold (COGS):** cost assigned to goods sold.
- **Gross profit:** revenue less COGS, before other operating expenses.
- **Journal entry:** accounting event expressed as balanced debits and credits.
- **General ledger:** organized account-level history of posted accounting entries.
- **Reconciliation:** comparison of internal records with cash/bank statements or counts.

## Status and synchronization

- **Local:** data exists only on the current device/browser.
- **Pending:** a future synchronization operation is waiting.
- **Synced:** a server has acknowledged the change.
- **Conflict:** two changes require a defined resolution policy.
- **Backup:** a recoverable copy of data, distinct from synchronization.
- **Audit event:** traceable record of an important action or change.

## Critical distinction

A screen label, summary card, or conceptual term is not proof that the underlying business workflow exists. Production financial reports must be derived from validated source documents and accounting rules, not from presentation-only totals.

# A2 Quality Gates and Acceptance Criteria

No module should be called complete merely because its screen exists.

## Skeleton phase acceptance

- [ ] Every planned module has a named destination and purpose.
- [ ] Current features are distinguished from planned placeholders.
- [ ] Sidebar and mobile navigation are consistent.
- [ ] Every page defines primary action, secondary actions, and empty state.
- [ ] Loading, error, offline, and access-denied patterns are documented.
- [ ] Persian RTL and English LTR layout rules are documented.
- [ ] Keyboard focus, labels, dialog behavior, and screen-reader status are considered.
- [ ] No database, authentication provider, payment gateway, or live external service is connected.
- [ ] Existing local data key and export path are preserved.

## Functional test gates (before production workflows)

### Products and stock
- Duplicate SKU / barcode handling
- Fractional quantities and unit precision
- Zero and negative stock policies
- Stock movement traceability
- Multi-location transfers and count adjustments

### Sales and POS
- Multi-line cart totals
- Discounts, tax configuration, and rounding
- Split and partial payments
- Held carts and interrupted checkout
- Returns, exchanges, refunds, and void permissions
- Receipt numbering and duplicate submission protection

### Purchasing
- Partial goods receipt
- Supplier bill matching
- Purchase returns
- Cost changes and stock valuation policy

### Cash and accounting
- Opening float and closing count
- Cash-in / cash-out reason and authorization
- Cash/bank transfer and reconciliation
- Balanced journal posting
- Receivables and payables
- Profit and loss, balance sheet, and cash-flow consistency

### Data safety
- Backup and restore round-trip
- Interrupted write behavior
- Duplicate retry protection
- Offline queue and conflict resolution
- Export privacy and access controls
- Audit trail for sensitive changes

## Cross-platform checks

- [ ] Small Android phone
- [ ] Large Android phone
- [ ] iPhone Safari
- [ ] Tablet portrait and landscape
- [ ] Windows laptop browser
- [ ] macOS browser
- [ ] Touch and keyboard operation
- [ ] RTL and LTR
- [ ] Slow network and offline launch
- [ ] Print / PDF / barcode hardware where supported

## Release gates

- No known critical data-loss or financial-calculation defect.
- Security and privacy review completed.
- Accessibility and localization review completed.
- Backup and restore tested on a clean device.
- User-facing claims match implemented behavior.
- Privacy policy, terms, support contact, and store listing are ready.
- Android/iOS platform requirements and store review policies are checked for the actual release date.
- Versioning, signing, crash reporting, and rollback/recovery plan are documented.

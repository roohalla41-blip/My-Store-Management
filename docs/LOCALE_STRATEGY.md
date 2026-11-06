# A2 Locale and Direction Strategy

## Confirmed default
- Initial/default locale: `en` (English).
- Supported next locale: `fa` (Persian), with RTL direction.
- Locale and text direction are related but separate settings.

## Implementation contract
- Store UI copy in locale dictionaries keyed by stable identifiers; do not use translated sentences as program logic.
- Use `lang` and `dir` on the document root based on the selected locale.
- Use CSS logical properties (`margin-inline`, `padding-inline`, `inset-inline`, `text-align: start/end`) rather than left/right assumptions.
- Format dates, numbers, and currencies with `Intl.DateTimeFormat` and `Intl.NumberFormat` using explicit locale and currency context.
- Keep stored numeric values independent from localized display strings.
- Do not translate user-entered product names, customer names, addresses, notes, or document identifiers.
- Language switching must not mutate or erase store records.

## Key namespaces
- `common.*`: save, cancel, close, search, filters, status, loading, retry.
- `navigation.*`: workspace and module labels.
- `dashboard.*`: overview, metrics, recent activity.
- `catalog.*`: products, services, categories, variants, units, price lists.
- `sales.*`: POS, invoices, quotes, returns, refunds.
- `purchasing.*`: orders, receiving, supplier bills.
- `inventory.*`: stock, movements, counts, transfers, reorder.
- `cash.*`: registers, sessions, cash movements, bank accounts.
- `accounting.*`: accounts, journals, ledger, statements.
- `people.*`: employees, roles, permissions.
- `settings.*`: store profile, locale, currency, tax, backup.

## Current limitation
This phase records the English-first decision and adds styling foundations. It does not yet claim that every existing Persian string has been translated or that a working language switcher exists. Full locale dictionaries and UI migration are a later skeleton task, still before database work.

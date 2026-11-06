# A2 Locale and Direction Strategy

## Current preview review mode
- The preview is temporarily forced to Persian (`fa`) with RTL direction, regardless of the device language, so the owner can inspect the current structure in Persian.
- This is a review-only presentation setting. Device-language auto-detection is deferred until after the Persian review.
- No language setting is stored and no database is used.
- User-entered names, sample customer identities, addresses, SKU values, invoice references, and other business data must not be translated.

## Implementation contract
- Set the document root `lang` and `dir` from the detected locale.
- Keep text direction independent from the business currency and numeric values.
- Prefer stable translation keys and locale dictionaries for production modules; the current preview still contains legacy text and uses a text-copy dictionary as a transitional bridge.
- Use CSS logical properties (`margin-inline`, `padding-inline`, `inset-inline`, `text-align: start/end`) rather than left/right assumptions when expanding layouts.
- Format dates, numbers, and currencies with `Intl.DateTimeFormat` and `Intl.NumberFormat` using explicit locale and currency context.
- Keep stored numeric values independent from localized display strings.
- Language detection and translation must never mutate or erase store records.

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

## Remaining work
- The current preview includes Persian translations for the main navigation, dashboard, many module descriptions, common forms, modal messages, and dynamic notifications.
- Some detailed table headings, sample status strings, longer descriptions, and less-used module content may still appear in English.
- The preview needs a full pass using stable translation keys before it can be described as completely translated.
- A persistent language selector is intentionally not included: device-language detection is the requested behavior for this phase.
- No database, SQL, Supabase, authentication, payment, or external integration is used by this locale work.

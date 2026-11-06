# A2 Technical Architecture — Pre-database Skeleton

## Current implementation

The repository currently contains a static HTML/CSS/JavaScript prototype:
- `index.html`: entry form, app shell, sidebar, modal, and page root
- `styles.css`: RTL-first responsive visual styling
- `app.js`: current views, local state, localStorage persistence, and basic operations
- `manifest.webmanifest`: install metadata
- `sw.js`: static app-shell caching
- `.github/workflows/pages.yml`: syntax check and GitHub Pages deployment

The current application is a prototype. Its localStorage model is not a production multi-user data layer.

## Target frontend boundaries

When implementation is modularized, keep these responsibilities separate:

- **Application shell:** bootstrapping, navigation, workspace context, global notifications.
- **Design system:** tokens, typography, buttons, fields, cards, tables, dialogs, badges, empty states.
- **Feature modules:** dashboard, POS, sales, products, inventory, purchasing, contacts, cash, accounting, people, locations, reports, settings.
- **Domain layer:** pure business rules and calculations; no browser storage or network calls.
- **Application services:** coordinate use cases and validation.
- **Data adapters:** future local and remote implementations behind stable interfaces.
- **Platform adapters:** print, barcode scanner, camera, file access, notifications, and install behavior.

## Suggested future source layout (not created as executable code yet)

```text
src/
  app/
    bootstrap/
    navigation/
    workspace/
  design-system/
    tokens/
    components/
    patterns/
  modules/
    dashboard/
    point-of-sale/
    sales/
    products/
    inventory/
    purchasing/
    contacts/
    cash-banking/
    expenses/
    accounting/
    people-access/
    locations/
    reports/
    support/
    settings/
  domain/
    money/
    documents/
    inventory/
    accounting/
    permissions/
  application/
    use-cases/
    validation/
  infrastructure/
    storage/
    sync/
    integrations/
  platform/
    print/
    barcode/
    camera/
    notifications/
  locales/
    fa/
    en/
  tests/
    unit/
    integration/
    e2e/
```

This is an intended organization guide, not a claim that these modules exist as working code.

## Dependency direction

- UI may call application use cases.
- Application use cases may depend on domain rules and declared ports/interfaces.
- Domain rules must not import UI, browser storage, Supabase, or external services.
- Infrastructure adapters implement ports; feature screens do not directly call a vendor SDK.
- No secrets or service-role credentials may be placed in browser code.

## Data and service contracts to define later

Before a database phase, the product team should agree on:
- Stable identifiers and ownership boundaries
- Store / branch / warehouse scope
- Document lifecycle and immutable financial history
- Stock movement semantics
- Money precision and rounding policy
- Currency identity per transaction (not just a mutable display preference)
- Permissions and server-side enforcement
- Offline queue and conflict resolution
- Backup, restore, export, and retention
- Audit events and correction strategy

These are design questions only. This document creates no tables, SQL, migrations, credentials, or backend functions.

## Platform strategy

- **Web/PWA:** primary shared UI foundation; responsive and installable where supported.
- **Android:** package the shared app only after offline, file, printing, and navigation behavior are tested on real devices.
- **iOS:** validate PWA capabilities and App Store requirements separately; use a native wrapper only if it provides a real user benefit and meets platform rules.
- **Desktop:** responsive browser/PWA first; evaluate a desktop wrapper only when printer, scanner, or local device integration justifies it.

## Internationalization

- Use translation keys rather than embedding user-facing strings in feature logic.
- Direction is a locale property; support both RTL and LTR.
- Store amounts as values with explicit currency context in the future domain model.
- Keep tax jurisdiction, time zone, and locale separate.
- Avoid hard-coded date parsing and locale-dependent financial calculations.

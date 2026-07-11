# Migrations

Future ontology-lingo upgrades use in-place, versioned migrations whenever possible. A migration must preserve all Workbook identities, revision histories, evidence links, decisions, hashes, and receipts.

When a migration requires preflight and verification, use:

- `migrations/<from>-to-<to>/preflight/`
- `migrations/<from>-to-<to>/`
- `migrations/<from>-to-<to>/verify/`

Destructive graph rebuild is not a schema-migration strategy.

# ontology-lingo

`ontology-lingo` is the governed TypeDB package for Lingo Studio's modeling-process knowledge. It stores durable Workbooks, Modeling Inputs, evidence, Modeling Brief and Grounding Plan revisions, structured Ontology Change Sets, executable competency questions, Verification Runs, staging provenance, and Apply Receipts in the same `knowledge` graph as gist and domain ontologies.

The package depends only on `gist`. Studio-specific concepts live here rather than in gist or ontology-vibemachine, while mappings reference the shared `SchemaResource`, `OntologyModuleVersion`, and `Thing` identities.

## Commands

```bash
npm run refresh:package-contract
npm run validate:bootstrap
npm run test:typedb-bootstrap
npm test
npm run release:check
```

The full test loads gist, this schema, self-documentation, provenance, and both fixtures into a temporary real TypeDB 3 server.

## Layout

- `schema/lingo.tql` — hand-authored canonical schema.
- `fixtures/` — Minimal Sprint and Basketball graph fixtures.
- `queries/` — direct lineage traversals over those fixtures.
- `data/lingo-schema-docs.tql` — generated queryable `SchemaResource` documentation.
- `data/lingo-provenance.tql` — generated package provenance.
- `migrations/` — future in-place schema/data migrations.
- `manifests/` — deterministic package manifest and checksums.

## Domain invariants

- One Workbook represents one coherent modeling effort.
- Brief revisions own problem meaning; Grounding Plans reference exact Brief element revisions.
- Evidence is stored once in the Workbook ledger and referenced by claims and decisions.
- Revisions, decisions, Change Sets, Verification Runs, and Apply Receipts are immutable.
- Human decision, grounding readiness, and verification are separate axes.
- Raw TypeQL and large payloads are content-addressed derivatives, not opaque canonical rows.
- Full-graph staging copies remain the operational strategy for now.

The application-facing contract is mirrored in OneWorkspace at `Docs/lingo-studio-knowledge-model.md`.

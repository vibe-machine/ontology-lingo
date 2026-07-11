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
- Workbook intent and `lingoUpdatedAt` are small canonical graph attributes used
  to build the Studio index; opening a workbook does not rewrite them, and the
  update timestamp never moves backward.
- Brief revisions own problem meaning. Each Grounding Plan item carries the
  stable Brief element identity and links to the exact element revision it
  interpreted; it never copies Brief or evidence text into its solution payload.
- `lingoModelingAct` records the modeling operation (`specialize`, `compose`,
  `categorize`, or `instantiate`). `lingoSchemaLifecycleIntent` independently
  records the intended schema effect (`add`, `reuse`, `noChange`, or `defer`).
  For example, composing a relation does not imply that a new relation type
  will be added.
- Evidence is stored once in the Workbook ledger and referenced by claims and decisions.
- Revisions, decisions, Change Sets, Verification Runs, and Apply Receipts are immutable.
- Human decision, grounding readiness, and verification are separate axes.
- Raw TypeQL and large payloads are content-addressed derivatives, not opaque canonical rows.
- Full-graph staging copies remain the operational strategy for now.

`LingoWorkbook`, `LingoWorkbookRow`, and `workbookContainsRow` are explicitly
legacy migration sources carried by the package so the current Studio can stop
defining schema at startup before its data migration lands. They are not part
of the canonical object model and will be retired only after `one-2xg.54.6`
verifies the graph-native replacement.

OneWorkspace implements this contract in `GroundingPlan`,
`GroundingPlanStore`, and the temporary `LegacyPlacementDecisionAdapter`.

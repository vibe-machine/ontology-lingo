# ontology-lingo agent guidance

## Purpose

This repository is the canonical TypeDB package for Lingo Studio modeling-process knowledge. The schema is hand-authored TypeQL 3 and layers on `gist >=5.0.0`.

## Rules

- Keep Studio-specific types in this package; do not add them to gist or ontology-vibemachine.
- Reuse `Thing`, `SchemaResource`, `OntologyModuleVersion`, and other shared concepts where their semantics fit.
- Keep canonical identities, structure, state axes, and lineage graph-native. Large immutable payloads may be content-addressed.
- Never collapse human decision, grounding readiness, and verification into one status.
- Revisions and events are immutable. Current pointers are repository-enforced guarded relations.
- Preserve the player–team–season relation frame as one n-ary Brief element referenced downstream.
- Use `npm run refresh:package-contract` after changing schema, fixtures, package metadata, or documentation generation.
- Run `npm test` before publishing.
- Do not hand-edit generated provenance, manifest, shared schema, or the generated structural section in schema docs.

## Source files

- `schema/lingo.tql`
- `fixtures/*.tql`
- `queries/*.tql`
- `tools/generate_lingo_schema_docs.mjs`
- `README.md`
- `migrations/`

## Generated files

- `schema/self-describing-schema.tql`
- `schema/package-provenance.tql`
- `schema/administrative-operations.tql`
- `data/lingo-schema-docs.tql`
- `data/lingo-provenance.tql`
- `manifests/*`
- `docs/translation/README.md`
- `tools/package_contract/validate_bootstrap.mjs`

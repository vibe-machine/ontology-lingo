# ontology-lingo agent guidance

## Purpose

This repository is the TypeDB package for the Lingo ontology: the record of how a model is made (what was read, what each source says, what we intend to model). The schema is hand-written TypeQL 3 and rests on `gist >=5.1.0`. Read `README.md` for the three layers and the design rules.

## Rules

- Start a change from `docs/competency-questions.md`: add or change the question, then the schema, then a query in `queries/` that answers it against `fixtures/transformed-sample.tql`.
- Build every type on a gist type, and a relation on a gist relation where one fits. Roles that specialise a gist relation's roles need names no other relation in that family uses.
- Fixed lists are category types with seed values in `data/lingo-categories.tql`, never `@values` strings.
- Never store a source's words. A passage holds a locator; a claim holds our wording.
- Do not add a type whose name another package uses; the `knowledge` database holds them all.
- Use `npm run refresh:package-contract` after changing schema, data or package metadata.
- Run `npm test`, then the app's install check (`mise run check-package-release` in OneWorkspace), before publishing.
- Do not hand-edit generated files.

## Source files

- `schema/lingo.tql`
- `data/lingo-categories.tql`
- `docs/competency-questions.md`
- `queries/*.tql`
- `fixtures/*.tql`
- `tools/generate_lingo_schema_docs.mjs`
- `README.md`

## Generated files

- `schema/self-describing-schema.tql`
- `schema/package-provenance.tql`
- `schema/administrative-operations.tql`
- `data/lingo-schema-docs.tql`
- `data/lingo-provenance.tql`
- `manifests/*`
- `tools/package_contract/validate_bootstrap.mjs`

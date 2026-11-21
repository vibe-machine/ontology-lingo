# ontology-lingo agent guidance

Before changing or releasing this package, follow the `ontology-extend` skill (installed through `apm.yml`; refresh with `apm install`, never edit `.claude/skills/` by hand).

## Purpose

This repository is the TypeDB package for the Lingo ontology: the record of how a model is made (what was read, what each source says, what we intend to model). The schema is hand-written TypeQL 3 and rests on `gist >=5.1.0`. Read `README.md` for the three layers and the design rules.

## Rules

- Start a change from `competency/questions.json`: add or change the question (with its `title` and `explanation`), then the schema, then the one query in `queries/` that answers it against the sample data in `sandbox/sample-data.tql`. A question the model cannot answer changes the model, never the question.
- Build every type on a gist type, and a relation on a gist relation where one fits. Roles that specialise a gist relation's roles need names no other relation in that family uses.
- Fixed lists are category types with seed values in `data/lingo-categories.tql`, never `@values` strings.
- Never store a source's words. A passage holds a locator; a claim holds our wording.
- Do not add a type whose name another package uses; the `knowledge` database holds them all.
- Keep `displayName` unchanged; installed databases record it.
- After changing questions or queries: `../ontology-tooling/bin/ont check-questions --repo . --write-generated`, then `../ontology-tooling/bin/ont check-questions --repo .`.
- After changing schema, data or package metadata: `npm run refresh:package-contract`, then `npm test`.
- Release only with `npm run release -- --bump <level> --no-push`; every change to shipped content gets its own bump. Before pushing, pass the app's fresh install (`mise run check-package-release` in OneWorkspace) and an upgrade from the previous tag, as the `ontology-extend` skill describes. Push only with the owner's word.
- Do not hand-edit generated files, or any file after `ont release` has made it.

## Source files

- `schema/lingo.tql`
- `data/lingo-categories.tql`, `data/lingo-formats.tql`
- `competency/questions.json`
- `queries/*.tql`
- `sandbox/sample-data.tql` (sample data for the questions, loaded by the app and by `ont check-questions`; never installed). `sandbox/sample-data/NNNN.tql` is generated from it.
- `tools/generate_lingo_schema_docs.mjs` (every new type needs its description here)
- `README.md`

## Generated files

- `docs/competency-questions.md`, `schema/stored-queries.tql`, `data/lingo-questions.tql` (from `competency/questions.json`)
- `competency/last-run.json` (written by `ont check-questions` and `ont release`)
- `schema/self-describing-schema.tql`
- `schema/package-provenance.tql`
- `schema/administrative-operations.tql`
- `data/lingo-schema-docs.tql`
- `data/lingo-provenance.tql`
- `generated/apply-units/`
- `manifests/*`
- `migrations/` (upgrade files written by `ont release`)
- `tools/package_contract/validate_bootstrap.mjs`

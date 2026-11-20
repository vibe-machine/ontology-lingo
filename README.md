# ontology-lingo

The Lingo ontology is the record of how a model is made. Every other ontology models a subject;
this one models the making of a model, so that any concept can be followed back to the passages
that prompted it, and any source to everything taken from it. It lives in the same `knowledge`
database as gist and the subject ontologies, and depends only on `gist`.

## The three layers

1. **What was read.** An `EvidenceSource` (a book, an essay, a schema) in a file format, kept at
   one or more `SourceLocation`s; a `Passage` is a place in it; a `Reading` is one pass over it by
   one reader under one version of the reading instructions. A `SessionRecord` is the record of a
   working session, joined to the readings done in it.
2. **What the source says, in its own terms.** A `SourceTerm` is a word as one source uses it. A
   `SourceClaim` is one thing the source says, in our wording, and is one of nine kinds. Every
   claim rests on at least one passage and comes from exactly one reading.
3. **What we intend to model, in ours.** A `ModelingBrief` has `BriefRevision`s; each lists the
   `BriefElement`s in force (purpose, scope, concepts, relations, constraints, questions).

A `Reconciliation` is the recorded decision that a source's term is, or is not, one of our concepts.

The later steps of Lingo Studio (grounding plan, change set, verification, apply) are not modelled
in this version.

## Design rules

- Designed from competency questions: `docs/competency-questions.md`. A change starts there.
- Every type is built on a gist type, and a relation on a gist relation where one fits.
- Fixed lists are categories with seed values (`data/lingo-categories.tql`), not strings.
- The source's words are never stored: a passage holds where, a claim holds our wording.
- A brief is never edited in place; a changed statement replaces the old one.
- Type names carry no `lingo` prefix. A name must not collide with another package's
  (`reference` belongs to beads, so the relation here is `questionReference`).
- gist's upper types are not abstract, so `SourceClaim` and `BriefElement` cannot be; only their
  subtypes are ever written.

## Commands

```bash
npm run refresh:package-contract   # after changing schema, data or package.json
npm test                           # loads gist and this package into a temporary TypeDB
npm run release:check
```

Before a release, also run the candidate through the app's install:
`mise run check-package-release <this checkout> <gist checkout>` in OneWorkspace.

## Layout

- `schema/lingo.tql`: the hand-written schema.
- `data/lingo-categories.tql`, `data/lingo-formats.tql`: the fixed lists and the file formats.
- `docs/competency-questions.md`: the questions the model must answer.
- `queries/`: queries that answer nine of them.
- `fixtures/transformed-sample.tql`: a small sample for those queries. Never installed.
- `data/lingo-schema-docs.tql`, `data/lingo-provenance.tql`, `manifests/`, the other files in
  `schema/`: generated.

## History

Versions 0.1.0 to 0.1.9 held an earlier model (workbooks, grounding plans, change sets, receipts)
that was not designed from questions. Version 1.0.0 replaces it and carries no migration from it.
The old model is in the git history and under the `v0.1.x` tags.

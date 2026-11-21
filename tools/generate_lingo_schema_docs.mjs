import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseTypeQLSchemaStructure } from "../../ontology-gist/tools/shared/schema_structure.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoUrl = "https://github.com/vibe-machine/ontology-lingo";
const schema = await fs.readFile(path.join(root, "schema/lingo.tql"), "utf8");
const structure = parseTypeQLSchemaStructure([schema]);

const curated = new Map(Object.entries({
  "EvidenceSource": "A book, an essay, a schema or anything else read for a subject.",
  "SessionRecord": "The record of a working session; a source only for what was said in it that no other source says.",
  "SourceLocation": "Where one copy of a source is kept: a web address or a file on a machine.",
  "Passage": "A place in a source. It holds where, never the source's words.",
  "Reading": "One pass over a source by one reader, under one version of the reading instructions.",
  "SourceTerm": "A word as one source uses it.",
  "SourceClaim": "One thing a source says about its terms, written in our words.",
  "readingPurpose": "The subject a reading was done for: the brief it serves.",
  "ClaimCheck": "A second reader's verdict on a claim.",
  "ModelingBrief": "The statement of intent for one subject.",
  "BriefRevision": "The brief as it stood at one moment: the statements in force.",
  "BriefElement": "One statement of a brief.",
  "Reconciliation": "The recorded decision that a source's term is, or is not, one of our concepts."
}));

function escape(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function words(label) {
  return label
    .replace(/^Lingo/, "")
    .replace(/^lingo/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .trim();
}

const entries = [...structure.typeKinds.entries()]
  .filter(([label]) => !label.includes(":"))
  .sort(([left], [right]) => left.localeCompare(right));

const lines = [
  "put $module isa SchemaModule,",
  "  has moduleKey \"lingo\",",
  "  has moduleName \"Lingo Studio Knowledge\",",
  "  has moduleKind \"hand-authored-package\";",
  ""
];

for (const [index, [label, kind]] of entries.entries()) {
  const variable = `$resource_${index + 1}`;
  const docKey = `${repoUrl}#${label}`;
  const generic = kind === "attribute"
    ? `A ${words(label)} value used by the Lingo ontology.`
    : kind === "relation"
      ? `Relates ${words(label)} participants in the Lingo ontology.`
      : `A ${words(label)} concept in the Lingo ontology.`;
  const definition = curated.get(label) ?? generic;
  lines.push(`put ${variable} isa SchemaResource,`);
  lines.push(`  has docKey \"${escape(docKey)}\",`);
  lines.push(`  has iri \"${escape(docKey)}\",`);
  lines.push(`  has typeLabel \"${escape(label)}\",`);
  lines.push(`  has kind \"${kind}\",`);
  lines.push(`  has prefLabel \"${escape(words(label))}\",`);
  lines.push(`  has definition \"${escape(definition)}\";`);
  lines.push(`put (resource: ${variable}, module: $module) isa inModule;`);
  lines.push("");
}

await fs.writeFile(path.join(root, "data/lingo-schema-docs.tql"), `${lines.join("\n").trimEnd()}\n`, "utf8");
console.log(`generated documentation for ${entries.length} ontology-lingo schema resources`);

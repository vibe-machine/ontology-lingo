import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseTypeQLSchemaStructure } from "../../ontology-gist/tools/shared/schema_structure.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoUrl = "https://github.com/vibe-machine/ontology-lingo";
const schema = await fs.readFile(path.join(root, "schema/lingo.tql"), "utf8");
const structure = parseTypeQLSchemaStructure([schema]);

const curated = new Map(Object.entries({
  LingoStudioWorkbook: "One coherent Studio modeling effort and its complete durable history.",
  LingoModelingInput: "One immutable conversation, import, manual entry, policy input, or migration input supplied to a Workbook.",
  LingoEvidenceSource: "One immutable observed source version in a Workbook evidence ledger.",
  LingoEvidenceExcerpt: "A precisely located excerpt from one Evidence Source.",
  LingoModelingBriefRevision: "An immutable revision of the sole authority for the user's domain meaning.",
  LingoBriefRelationFrameRevision: "An immutable arbitrary-arity relation frame with explicit roles and participant semantics.",
  LingoOntologyTargetContextRevision: "An immutable package, dependency-closure, corpus, and retrieval context used for grounding.",
  LingoGroundingPlanRevision: "An immutable mapping from exact Brief elements into one ontology target context.",
  LingoOntologyChangeSet: "A deterministic structured compilation from one exact Grounding Plan revision.",
  LingoExecutableCompetencyQuestion: "An immutable executable oracle compiled from one Brief competency question for one Change Set.",
  LingoVerificationRun: "An immutable observation of exact executable artifacts against one staging graph snapshot.",
  LingoStagingBinding: "Durable provenance for a disposable full-graph staging copy.",
  LingoApplyReceipt: "An immutable audit record of what was applied, where, and from which verified inputs.",
  lingoHumanDecisionDecides: "Links an immutable human decision event to the exact artifact revision it decides.",
  lingoPlanItemInterpretsBriefElement: "Links a Grounding Plan item revision to the exact Brief element revision it interprets.",
  lingoChangeSetCompiledFromPlan: "Links an Ontology Change Set to the exact Grounding Plan revision compiled into it.",
  lingoVerificationVerifiesChangeSet: "Links a Verification Run to the exact Ontology Change Set it evaluated.",
  lingoApplyReceiptAuthorizedByVerification: "Links an Apply Receipt to the exact Verification Runs that authorized it."
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
    ? `A ${words(label)} value used by the Lingo Studio knowledge model.`
    : kind === "relation"
      ? `Relates ${words(label)} participants in the Lingo Studio knowledge model.`
      : `A ${words(label)} concept in the Lingo Studio knowledge model.`;
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

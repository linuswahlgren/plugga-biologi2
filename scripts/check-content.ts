/**
 * npm run check: content check at build time. Exits 1 on errors.
 * Runs directly with Node (type stripping), so every import has an explicit .ts extension.
 */
import { course } from "../content/index.ts";
import { checkCourse, uiStringsOf } from "../src/check.ts";
import { sv } from "../src/i18n/sv.ts";
import { DIAGRAM_IDS, DIAGRAM_MARKERS } from "../src/diagrams/index.ts";

const verbose = process.argv.includes("--alla") || process.argv.includes("--all");
const result = checkCourse(course, { diagrams: DIAGRAM_IDS, diagramMarkers: DIAGRAM_MARKERS, uiStrings: uiStringsOf(sv) });

const parts = course.weeks.length;
const lessons = course.weeks.reduce((n, w) => n + w.lessons.length, 0);
const cards = course.weeks.reduce((n, w) => n + w.cards.length, 0);
const quiz = course.weeks.reduce((n, w) => n + w.quiz.length, 0);
const practice = course.weeks.reduce((n, w) => n + w.practice.length, 0);

console.log(`Kontroll av ${course.title} (${course.id})`);
console.log(`  ${parts} delar · ${lessons} lektioner · ${cards} kort · ${quiz} quizfrågor · ${practice} övningar · ${course.glossary?.length ?? 0} begrepp`);

if (result.errors.length) {
  console.log(`\nFel (${result.errors.length}):`);
  for (const e of result.errors) console.log(`  ✗ ${e.where}: ${e.text}`);
}
console.log(`\nVarningar: ${result.warnings.length}`);
const shown = verbose ? result.warnings : result.warnings.slice(0, 25);
for (const w of shown) console.log(`  ! ${w.where}: ${w.text}`);
if (!verbose && result.warnings.length > shown.length) console.log(`  … och ${result.warnings.length - shown.length} till (npm run check -- --alla)`);

console.log(result.errors.length ? `\n${result.errors.length} fel. Rätta dem innan du bygger.` : "\nInga fel.");
process.exit(result.errors.length ? 1 : 0);

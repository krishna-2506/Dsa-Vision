import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';

const db = new DatabaseSync('./data/algovision.sqlite');

function getMissingForStep(stepNo) {
  const qs = db.prepare("SELECT id, slug, title, component_key, substep_name FROM questions WHERE step_no = ?").all(stepNo);
  const missing = [];
  for (const q of qs) {
    if (!fs.existsSync(`./src/visualizers/${q.component_key}.jsx`)) {
      missing.push(q);
    }
  }
  return missing;
}

console.log("Step 3 missing (1 expected):", JSON.stringify(getMissingForStep(3), null, 2));
console.log("Step 2 missing (2 expected):", JSON.stringify(getMissingForStep(2), null, 2));
console.log("Step 14 missing (5 expected):", JSON.stringify(getMissingForStep(14), null, 2));
console.log("Step 17 missing (5 expected):", JSON.stringify(getMissingForStep(17), null, 2));

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

console.log("Step 17 missing (5 questions):", JSON.stringify(getMissingForStep(17), null, 2));
console.log("Step 18 missing (5 questions):", JSON.stringify(getMissingForStep(18), null, 2));
console.log("Step 5 missing (4 questions):", JSON.stringify(getMissingForStep(5), null, 2));

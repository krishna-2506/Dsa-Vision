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

console.log("Step 12 missing (Greedy - 5 expected):", JSON.stringify(getMissingForStep(12), null, 2));
console.log("Step 11 missing (Heaps - 7 expected):", JSON.stringify(getMissingForStep(11), null, 2));

import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';

const db = new DatabaseSync('./data/algovision.sqlite');
const qs = db.prepare("SELECT id, slug, title, component_key, substep_name FROM questions WHERE step_no = 4").all();
const missing = [];
for (const q of qs) {
  if (!fs.existsSync(`./src/visualizers/${q.component_key}.jsx`)) {
    missing.push(q);
  }
}
console.log(`Step 4 Missing Count: ${missing.length}`);
console.log(JSON.stringify(missing, null, 2));

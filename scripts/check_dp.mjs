import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('./data/algovision.sqlite');
const rows = db.prepare("SELECT slug, title, component_key, substep_name FROM questions WHERE step_no = 16").all();
console.log(`Total Step 16 questions: ${rows.length}`);

// Check which visualizer files exist
import fs from 'node:fs';
const missing = [];
for (const r of rows) {
  const filePath = `./src/visualizers/${r.component_key}.jsx`;
  if (!fs.existsSync(filePath)) {
    missing.push(r);
  }
}
console.log(`Missing count: ${missing.length}`);
console.log(JSON.stringify(missing, null, 2));

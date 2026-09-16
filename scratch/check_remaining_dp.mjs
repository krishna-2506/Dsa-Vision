import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';

const db = new DatabaseSync('./data/algovision.sqlite');
const rows = db.prepare(`
  SELECT id, slug, title, substep_name, component_key
  FROM questions 
  WHERE step_no = 16
  ORDER BY substep_name ASC, id ASC
`).all();

const visFiles = new Set(fs.readdirSync('./src/visualizers'));
const missing = [];

for (const r of rows) {
  const exists = visFiles.has(`${r.component_key}.jsx`);
  if (!exists) {
    missing.push(r);
  }
}

console.log(`Step 16 Remaining Missing Questions: ${missing.length}`);
for (const m of missing) {
  console.log(`- [${m.substep_name}] ${m.component_key}.jsx | slug: ${m.slug} | title: ${m.title}`);
}

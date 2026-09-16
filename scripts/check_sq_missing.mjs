import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';

const db = new DatabaseSync('./data/algovision.sqlite');
const rows = db.prepare(`
  SELECT id, slug, title, component_key, substep_name 
  FROM questions 
  WHERE step_no = 9
  ORDER BY substep_no, id
`).all();

const visualizersDir = './src/visualizers';
const existingFiles = new Set(fs.readdirSync(visualizersDir));

const missing = [];
for (const r of rows) {
  const fileName = `${r.component_key}.jsx`;
  if (!existingFiles.has(fileName)) {
    missing.push({
      id: r.id,
      slug: r.slug,
      title: r.title,
      component_key: r.component_key,
      substep_name: r.substep_name
    });
  }
}

console.log(`Step 9 Missing Count: ${missing.length}`);
console.log(JSON.stringify(missing, null, 2));

import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';

const db = new DatabaseSync('./data/algovision.sqlite');
const rows = db.prepare(`
  SELECT id, step_name, substep_name, title, slug, component_key 
  FROM questions 
  WHERE step_name LIKE '%Graph%' 
  ORDER BY id ASC
`).all();

console.log(`Total Step 15 (Graphs) questions: ${rows.length}`);

const visualizersOnDisk = new Set(
  fs.readdirSync('./src/visualizers')
    .filter(f => f.endsWith('.jsx') || f.endsWith('.js'))
    .map(f => f.replace(/\.(jsx|js)$/, ''))
);

const bySubstep = {};
let missing = 0;
let present = 0;

for (const r of rows) {
  if (!bySubstep[r.substep_name]) bySubstep[r.substep_name] = [];
  const hasVisualizer = r.component_key && visualizersOnDisk.has(r.component_key);
  if (hasVisualizer) present++;
  else missing++;
  bySubstep[r.substep_name].push({
    id: r.id,
    title: r.title,
    slug: r.slug,
    key: r.component_key,
    exists: hasVisualizer
  });
}

console.log(`Present: ${present}, Missing: ${missing}\n`);

for (const [substep, questions] of Object.entries(bySubstep)) {
  console.log(`=== ${substep} (${questions.length} questions) ===`);
  for (const q of questions) {
    console.log(`  [${q.id}] ${q.title} | slug: ${q.slug} | key: ${q.key || 'NONE'} | exists: ${q.exists}`);
  }
}

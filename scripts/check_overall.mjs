import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';

const db = new DatabaseSync('./data/algovision.sqlite');
const steps = db.prepare("SELECT DISTINCT step_no, step_name FROM questions ORDER BY step_no").all();

let totalQuestions = 0;
let totalImplemented = 0;

console.log('=== OVERALL STRIVER A2Z PROGRESS ===\n');

for (const s of steps) {
  const qs = db.prepare("SELECT id, slug, title, component_key FROM questions WHERE step_no = ?").all(s.step_no);
  let implemented = 0;
  const missing = [];
  for (const q of qs) {
    if (fs.existsSync(`./src/visualizers/${q.component_key}.jsx`)) {
      implemented++;
    } else {
      missing.push(q);
    }
  }
  totalQuestions += qs.length;
  totalImplemented += implemented;
  const pct = ((implemented / qs.length) * 100).toFixed(1);
  const status = implemented === qs.length ? '✅ 100% COMPLETE' : `${implemented}/${qs.length} (${pct}%)`;
  console.log(`Step ${s.step_no.toString().padStart(2, ' ')}: ${s.step_name.padEnd(35, ' ')} -> ${status}`);
}

console.log(`\nTOTAL: ${totalImplemented} / ${totalQuestions} (${((totalImplemented / totalQuestions) * 100).toFixed(1)}%)`);

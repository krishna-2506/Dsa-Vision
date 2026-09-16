import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

const dbPath = path.resolve(process.cwd(), 'data', 'algovision.sqlite');
const sqlite = new DatabaseSync(dbPath);

const vizDir = path.resolve(process.cwd(), 'src', 'visualizers');
const files = fs.readdirSync(vizDir);
const registeredKeys = new Set(
  files
    .filter(f => f.endsWith('.jsx') || f.endsWith('.js'))
    .filter(f => !f.includes('index.'))
    .map(f => f.replace(/\.(jsx|js)$/, ''))
);

console.log('Total registered visualizer files on disk:', registeredKeys.size);
console.log('Files on disk:', Array.from(registeredKeys));

const allQuestions = sqlite.prepare("SELECT id, title, component_key, step_no, substep_name, category, difficulty FROM questions ORDER BY step_no ASC, id ASC").all();

const matched = [];
const missing = [];

for (const q of allQuestions) {
  if (registeredKeys.has(q.component_key)) {
    matched.push(q);
  } else {
    missing.push(q);
  }
}

console.log(`\nMatched questions with working visualizers: ${matched.length}`);
matched.forEach(m => console.log(`  ✓ [${m.id}] ${m.title} (${m.component_key})`));

console.log(`\nMissing visualizers: ${missing.length}`);
console.log('\nTop 30 missing visualizers from early steps (Step 1, 2, 3, 4):');
missing.slice(0, 30).forEach(m => console.log(`  ✗ [Step ${m.step_no}] [${m.id}] ${m.title} -> needs: ${m.component_key}.jsx`));

import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';

const dbPath = path.resolve(process.cwd(), 'data', 'algovision.sqlite');
const sqlite = new DatabaseSync(dbPath);

const titles = [
  'Largest Element',
  'Second Largest',
  'Missing Number',
  'Linked List',
  'Binary Search',
  'Bubble',
  'Selection',
  'Insertion',
  'Quick',
  'Rotate',
  'Kadane',
  'Stock',
  'Subarray',
  'Set Matrix',
  'Pascal',
  'Spiral',
  '3 Sum',
  '4 Sum',
  'Majority'
];

for (const t of titles) {
  const qs = sqlite.prepare(`SELECT id, title, component_key, step_no, difficulty FROM questions WHERE title LIKE ? OR id LIKE ?`).all(`%${t}%`, `%${t}%`);
  console.log(`\n=== Matches for "${t}" (${qs.length}) ===`);
  qs.forEach(q => console.log(`  [Step ${q.step_no}] [${q.id}] ${q.title} -> component_key: "${q.component_key}"`));
}

import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';

const dbPath = path.resolve(process.cwd(), 'data', 'algovision.sqlite');
const sqlite = new DatabaseSync(dbPath);

const qs = sqlite.prepare("SELECT id, title, component_key, step_no, substep_name, difficulty FROM questions WHERE step_no IN (1, 2, 3) ORDER BY step_no ASC, id ASC").all();

console.log(`Total questions in Steps 1, 2, 3: ${qs.length}`);
qs.forEach(q => console.log(`Step ${q.step_no} | ${q.substep_name || ''} | [${q.id}] ${q.title} (${q.difficulty}) -> ${q.component_key}`));

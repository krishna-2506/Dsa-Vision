const { getDb } = require('../server/db.js');
const db = getDb();

const total = db.prepare('SELECT COUNT(*) as count FROM questions').get();
const withComp = db.prepare('SELECT COUNT(*) as count FROM questions WHERE component_key IS NOT NULL AND component_key != ""').get();
console.log('Total questions:', total.count, 'With component_key:', withComp.count);

const comps = db.prepare('SELECT id, title, component_key, step_no, category FROM questions WHERE component_key IS NOT NULL AND component_key != ""').all();
console.log('\nExisting linked questions (' + comps.length + '):');
comps.forEach(c => console.log(` - [${c.id}] ${c.title} -> ${c.component_key}`));

const unlinked = db.prepare('SELECT id, title, step_no, substep_name, category, difficulty FROM questions WHERE component_key IS NULL OR component_key = "" ORDER BY step_no ASC, id ASC LIMIT 50').all();
console.log('\nTop 50 unlinked questions:');
unlinked.forEach(u => console.log(` - [Step ${u.step_no}] [${u.id}] ${u.title} (${u.difficulty})`));

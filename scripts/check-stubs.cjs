const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('data/algovision.sqlite');

const rows = db.prepare(`
  SELECT question_id, language, code
  FROM code_solutions
  WHERE length(code) < 70
`).all();

console.log('Short / stub solutions count:', rows.length);
for (const r of rows) {
  console.log(`- ${r.question_id} (${r.language}): ${r.code}`);
}

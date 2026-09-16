import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('./data/algovision.sqlite');
db.prepare("UPDATE questions SET component_key = 'PowxNVisualizer' WHERE id = 'pow-x-n-877'").run();
console.log('Updated pow-x-n-877 to PowxNVisualizer');

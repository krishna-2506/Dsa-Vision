import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve(process.cwd(), 'src', 'visualizers');
const files = fs.readdirSync(dir).filter(f => f.startsWith('gemini-code-'));

for (const f of files) {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
  const nameMatch = content.match(/export\s+default\s+function\s+([A-Za-z0-9_]+)/);
  console.log(f, '->', titleMatch ? titleMatch[1] : 'No title', 'component:', nameMatch ? nameMatch[1] : 'anon');
}

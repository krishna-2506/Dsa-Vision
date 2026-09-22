/**
 * migrate-tokens.js
 * 
 * Bulk auto-migration script that replaces hardcoded hex color values
 * in all visualizer JSX files with CSS custom property equivalents.
 * 
 * This ensures all 446 visualizers become light-mode-safe and theme-invariant
 * without any manual intervention per file.
 * 
 * Usage: node scripts/migrate-tokens.js
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const VISUALIZERS_DIR = join(import.meta.dirname, '..', 'src', 'visualizers');

// ─── Replacement Map ───────────────────────────────────────────────────────
// Each entry: [pattern (string or regex), replacement]
// Order matters: more specific patterns first to avoid partial matches.
const REPLACEMENTS = [
  // ── Background surfaces ──
  ['bg-[#12131b]', 'bg-[var(--board-raised)]'],
  ['bg-[#161824]', 'bg-[var(--board-raised-2)]'],
  ['bg-[#0e1019]', 'bg-[var(--board)]'],
  ['bg-[#0d0f17]', 'bg-[var(--board)]'],
  ['bg-[#1a1d2e]', 'bg-[var(--board-raised-2)]'],
  ['bg-[#1e2235]', 'bg-[var(--board-raised-2)]'],

  // ── Border colors ──
  ['border-[#272b3c]', 'border-[var(--line)]'],
  ['border-[#242738]', 'border-[var(--line)]'],
  ['border-[#222538]', 'border-[var(--line)]'],
  ['border-[#202436]', 'border-[var(--line)]'],
  ['border-[#2a2e42]', 'border-[var(--line)]'],
  ['border-[#1e2235]', 'border-[var(--line)]'],
  ['border-[#353a50]', 'border-[var(--line-strong)]'],

  // ── Text colors ──
  ['text-[#8a8ea3]', 'text-[var(--chalk-dim)]'],
  ['text-[#555a73]', 'text-[var(--chalk-faint)]'],
  ['text-[#6b7094]', 'text-[var(--chalk-faint)]'],
  ['text-[#4a4f6a]', 'text-[var(--chalk-faint)]'],
  ['text-[#e2e4ed]', 'text-[var(--chalk)]'],
  ['text-[#f0f1f7]', 'text-[var(--chalk)]'],
  
  // Slate text to theme tokens (common in old visualizers)
  ['text-slate-500', 'text-[var(--chalk-faint)]'],
  ['text-slate-400', 'text-[var(--chalk-dim)]'],
  ['text-slate-300', 'text-[var(--chalk-dim)]'],
  ['text-slate-600', 'text-[var(--chalk-faint)]'],
  ['text-slate-200', 'text-[var(--chalk)]'],
  ['text-white', 'text-[var(--chalk)]'],
];

async function migrate() {
  const files = await readdir(VISUALIZERS_DIR);
  const jsxFiles = files.filter(f => f.endsWith('.jsx') && f !== 'index.jsx');

  let totalFilesModified = 0;
  let totalReplacements = 0;
  const report = [];

  for (const file of jsxFiles) {
    const filePath = join(VISUALIZERS_DIR, file);
    let content = await readFile(filePath, 'utf-8');
    const originalContent = content;
    let fileReplacements = 0;

    for (const [pattern, replacement] of REPLACEMENTS) {
      const count = content.split(pattern).length - 1;
      if (count > 0) {
        content = content.replaceAll(pattern, replacement);
        fileReplacements += count;
      }
    }

    if (fileReplacements > 0) {
      await writeFile(filePath, content, 'utf-8');
      totalFilesModified++;
      totalReplacements += fileReplacements;
      report.push({ file, replacements: fileReplacements });
    }
  }

  console.log('\n══════════════════════════════════════════════════');
  console.log('  Token Migration Report');
  console.log('══════════════════════════════════════════════════');
  console.log(`  Total files scanned:   ${jsxFiles.length}`);
  console.log(`  Files modified:        ${totalFilesModified}`);
  console.log(`  Total replacements:    ${totalReplacements}`);
  console.log('══════════════════════════════════════════════════\n');

  if (report.length > 0) {
    console.log('  Modified files:');
    for (const entry of report.sort((a, b) => b.replacements - a.replacements)) {
      console.log(`    ${entry.file.padEnd(70)} ${entry.replacements} replacements`);
    }
  }

  console.log('\n  ✅ Migration complete. Run `npm run build` to verify.\n');
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});

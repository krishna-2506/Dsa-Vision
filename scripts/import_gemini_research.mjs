import fs from 'node:fs';
import path from 'node:path';
import { dbService } from '../server/db.js';

function cleanAndParseJson(rawContent) {
  let content = rawContent.trim();
  // Remove markdown code fences if present
  if (content.startsWith('```json')) {
    content = content.slice(7);
  } else if (content.startsWith('```')) {
    content = content.slice(3);
  }
  if (content.endsWith('```')) {
    content = content.slice(0, -3);
  }
  content = content.trim();

  // If there is commentary before or after JSON array, extract between [ and ]
  const firstBracket = content.indexOf('[');
  const lastBracket = content.lastIndexOf(']');
  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    content = content.substring(firstBracket, lastBracket + 1);
  }

  return JSON.parse(content);
}

async function run() {
  const argPath = process.argv[2];
  let filesToProcess = [];

  if (argPath) {
    const resolved = path.resolve(process.cwd(), argPath);
    if (!fs.existsSync(resolved)) {
      console.error(`❌ Error: Specified file or directory does not exist: ${resolved}`);
      process.exit(1);
    }
    const stat = fs.statSync(resolved);
    if (stat.isDirectory()) {
      filesToProcess = fs.readdirSync(resolved)
        .filter(f => f.endsWith('.json'))
        .map(f => path.join(resolved, f));
    } else {
      filesToProcess = [resolved];
    }
  } else {
    // Check default locations
    const defaultInput = path.resolve(process.cwd(), 'data', 'gemini_research_input.json');
    const resultsDir = path.resolve(process.cwd(), 'data', 'gemini_research', 'results');

    if (fs.existsSync(defaultInput)) {
      filesToProcess.push(defaultInput);
    }
    if (fs.existsSync(resultsDir)) {
      const resultFiles = fs.readdirSync(resultsDir)
        .filter(f => f.endsWith('.json'))
        .map(f => path.join(resultsDir, f));
      filesToProcess.push(...resultFiles);
    }
  }

  if (filesToProcess.length === 0) {
    console.log(`
ℹ️  No research JSON files found to import.

Usage:
  node scripts/import_gemini_research.mjs <path-to-gemini-output.json>
  OR
  Place your Gemini output in: data/gemini_research_input.json
  OR
  Save batch outputs into: data/gemini_research/results/*.json

Example:
  node scripts/import_gemini_research.mjs data/gemini_research/results/batch_01_results.json
`);
    return;
  }

  console.log(`[Import] Found ${filesToProcess.length} file(s) to process.`);
  let totalProcessed = 0;
  let totalUpdated = 0;
  const updateSummary = [];

  for (const filePath of filesToProcess) {
    console.log(`\n📂 Reading ${path.basename(filePath)}...`);
    try {
      const raw = fs.readFileSync(filePath, 'utf8');
      const items = cleanAndParseJson(raw);

      if (!Array.isArray(items)) {
        console.warn(`⚠️ Warning: ${path.basename(filePath)} does not contain a JSON array. Skipping.`);
        continue;
      }

      console.log(`   Found ${items.length} items. Merging into SQLite database...`);
      const result = dbService.bulkUpdateResearch(items);
      totalProcessed += items.length;
      totalUpdated += result.updatedCount;
      updateSummary.push(...result.results);

      console.log(`   ✓ Successfully merged updates for ${result.updatedCount} problem(s).`);
    } catch (err) {
      console.error(`❌ Failed to parse or import ${path.basename(filePath)}:`, err.message);
    }
  }

  console.log('\n========================================');
  console.log(`🎉 Import Complete!`);
  console.log(`Total Problems Processed: ${totalProcessed}`);
  console.log(`Total Problems Updated:   ${totalUpdated}`);
  console.log('========================================');

  if (updateSummary.length > 0) {
    console.log('\nUpdated Problems:');
    updateSummary.forEach((s, idx) => {
      console.log(`  ${idx + 1}. [${s.id}] ${s.title} -> fields: [${s.updatedFields.join(', ')}]`);
    });
  }
}

run().catch(err => {
  console.error('Fatal import error:', err);
  process.exit(1);
});

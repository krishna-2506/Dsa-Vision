import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { generateTags } from './import-strivers.js';

const DATA_JSON = path.resolve(process.cwd(), 'data', 'strivers_all_questions_detailed.json');
const DB_PATH = path.resolve(process.cwd(), 'data', 'algovision.sqlite');
const VIS_DIR = path.resolve(process.cwd(), 'src', 'visualizers');

function toCamelCase(str) {
  return str
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');
}

function cleanComplexity(text, fallback = 'O(N)') {
  if (!text) return fallback;
  const s = String(text).trim();
  const match = s.match(/O\([^)]{1,20}\)/i);
  if (match) return match[0];
  let cleaned = s
    .replace(/^[-:=*#\s]+/, '')
    .replace(/^(?:the\s+)?(?:time|space)\s+complexity\s+(?:of[^:]*?)?(?:is|:|-|=)\s*/i, '')
    .trim();
  return cleaned.length <= 20 ? cleaned : cleaned.slice(0, 19) + '…';
}

export function runMigration() {
  console.log('='.repeat(68));
  console.log('  MIGRATING STRIVER A2Z DETAILED DATASET TO SQLITE');
  console.log('='.repeat(68));

  if (!fs.existsSync(DATA_JSON)) {
    console.error(`[-] Master dataset not found at ${DATA_JSON}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(DATA_JSON, 'utf8');
  const dataset = JSON.parse(raw);
  const questionsList = dataset.questions || [];
  console.log(`[+] Loaded ${questionsList.length} questions from ${DATA_JSON}`);

  const sqlite = new DatabaseSync(DB_PATH);

  // Discover existing visualizers
  const availableVisualizers = [];
  if (fs.existsSync(VIS_DIR)) {
    const files = fs.readdirSync(VIS_DIR).filter(f => (f.endsWith('.jsx') || f.endsWith('.js')) && f !== 'index.js');
    for (const f of files) {
      availableVisualizers.push(f.replace(/\.(jsx|js)$/, ''));
    }
  }
  console.log(`[+] Discovered ${availableVisualizers.length} custom visualizer components on disk`);

  // Load existing questions to preserve user status, stars, and notes
  const existingQuestionsMap = new Map();
  try {
    const existing = sqlite.prepare('SELECT * FROM questions').all();
    for (const q of existing) {
      existingQuestionsMap.set(q.id, q);
      if (q.slug) existingQuestionsMap.set(q.slug, q);
    }
    console.log(`[+] Found ${existing.length} existing records in SQLite (preserving user progress)`);
  } catch (e) {
    console.log('[-] Could not read existing questions table:', e.message);
  }

  // Prepared statements
  const insertQuestion = sqlite.prepare(`
    INSERT OR REPLACE INTO questions (
      id, display_id, leetcode_id, title, slug, category,
      step_no, step_name, substep_no, substep_name,
      difficulty, time_complexity, space_complexity,
      leetcode_url, youtube_url, article_url, plus_url,
      description, approach, examples, approaches_data,
      tags, status, is_favorite, component_key,
      created_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, datetime('now')
    )
  `);

  const deleteSolutions = sqlite.prepare('DELETE FROM code_solutions WHERE question_id = ?');
  const insertSolution = sqlite.prepare(`
    INSERT INTO code_solutions (question_id, language, code, approach_tier)
    VALUES (?, ?, ?, ?)
  `);

  // Clean up legacy placeholder records without step_no
  sqlite.exec("DELETE FROM questions WHERE step_no IS NULL;");

  let insertedCount = 0;
  let solutionsCount = 0;
  let linkedVisualizersCount = 0;
  const usedSlugs = new Set();

  sqlite.exec('BEGIN TRANSACTION');

  try {
    for (let i = 0; i < questionsList.length; i++) {
      const item = questionsList[i];
      const title = (item.problem_name || `Problem ${i + 1}`).trim();
      
      // Determine canonical ID and slug
      let baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      if (!baseSlug) baseSlug = `q-${item.problem_id || i + 1}`;
      let slug = baseSlug;
      if (usedSlugs.has(slug)) {
        slug = `${baseSlug}-${item.problem_id}`;
      }
      usedSlugs.add(slug);
      
      const qId = slug;
      const displayId = `Q-${item.problem_id || String(i + 1).padStart(3, '0')}`;

      // Check if user has existing progress for this question
      const existing = existingQuestionsMap.get(qId) || existingQuestionsMap.get(item.problem_id);
      const status = existing?.status || 'to_learn';
      const isFavorite = existing?.is_favorite || 0;
      const createdAt = existing?.created_at || new Date().toISOString();

      // Step and category
      const stepNo = item.step_no || 1;
      const stepName = item.step_name || 'Learn the basics';
      const substepNo = item.substep_no || 1;
      const substepName = item.substep_name || 'Overview';
      const category = `Step ${stepNo}: ${stepName}`;

      const difficulty = item.difficulty || 'Medium';

      // Match custom visualizer
      let matchedVisualizer = toCamelCase(title) + 'Visualizer';
      const cleanSlug = slug.replace(/[^a-z0-9]/g, '');
      
      for (const visKey of availableVisualizers) {
        const cleanKey = visKey.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (cleanKey === cleanSlug || cleanKey.includes(cleanSlug) || cleanSlug.includes(cleanKey.replace('visualizer', ''))) {
          matchedVisualizer = visKey;
          break;
        }
      }

      // Explicit visualizer overrides for well-known problems
      if (slug.includes('two-sum') || slug.includes('2-sum')) matchedVisualizer = 'TwoSumVisualizer';
      if (slug.includes('binary-search') && !slug.includes('tree')) matchedVisualizer = 'BinarySearchVisualizer';
      if (slug.includes('merge-sort')) matchedVisualizer = 'MergeSortVisualizer';
      if (slug.includes('reverse-linked-list')) matchedVisualizer = 'ReverseLlVisualizer';
      if (slug.includes('reverse-a-doubly-linked-list') || slug.includes('reverse-dll')) matchedVisualizer = 'ReverseDllVisualizer';
      if (slug.includes('insert-at-the-end-of-dll') || slug.includes('insert-a-node-in-dll')) matchedVisualizer = 'InsertNodeInDllVisualizer';
      if (slug.includes('introduction-to-doubly-linked-list')) matchedVisualizer = 'IntroductionToDoubleLlVisualizer';
      if (slug.includes('linear-search')) matchedVisualizer = 'LinearSearchVisualizer';
      if (slug.includes('check-if-the-array-is-sorted')) matchedVisualizer = 'CheckIfArrayIsSortedAndRotatedVisualizer';
      if (slug.includes('find-the-number-that-appears-once') || slug.includes('single-number')) matchedVisualizer = 'FindElementPresentOnlyOnceVisualizer';
      if (slug.includes('implement-stack-using-linked-list')) matchedVisualizer = 'ImplementStackUsingLinkedListVisualizer';
      if (slug.includes('longest-subarray-with-given-sum')) matchedVisualizer = 'LongestSubarrayWithGivenSumVisualizer';
      if (slug.includes('remove-duplicates-from-sorted-array')) matchedVisualizer = 'RemoveDuplicatesFromSortedArrayVisualizer';
      if (slug.includes('left-rotate-the-array-by-one')) matchedVisualizer = 'RotateArrayLeftBy1placeVisualizer';
      if (slug.includes('search-an-element-in-a-linked-list')) matchedVisualizer = 'SearchElementInLinkedListVisualizer';

      if (availableVisualizers.includes(matchedVisualizer)) {
        linkedVisualizersCount++;
      }

      // Approaches breakdown
      const approaches = item.approaches || [];
      let timeComp = 'O(N)';
      let spaceComp = 'O(1)';
      let optimalApproachText = '';

      if (approaches.length > 0) {
        const lastApp = approaches[approaches.length - 1];
        timeComp = cleanComplexity(lastApp.time_complexity, 'O(N)');
        spaceComp = cleanComplexity(lastApp.space_complexity, 'O(1)');
        optimalApproachText = lastApp.algorithm || lastApp.approach_name || '';
      }

      // Generate tags
      const generatedTags = generateTags(
        title,
        category,
        substepName,
        item.problem_statement || '',
        optimalApproachText,
        approaches[0]?.codes?.cpp || ''
      );

      // LeetCode ID extraction
      let leetcodeId = existing?.leetcode_id || null;
      if (!leetcodeId && item.leetcode_url) {
        const lcMatch = item.leetcode_url.match(/\/problems\/([^/]+)/);
        if (lcMatch) {
          // Keep slug reference if numeric ID not parsed
        }
      }

      // Insert question row
      insertQuestion.run(
        qId,
        displayId,
        leetcodeId,
        title,
        slug,
        category,
        stepNo,
        stepName,
        substepNo,
        substepName,
        difficulty,
        timeComp,
        spaceComp,
        item.leetcode_url || '',
        item.youtube_url || '',
        item.article_url || '',
        item.plus_url || '',
        item.problem_statement || `Detailed editorial and breakdown for ${title} from Striver's A2Z Sheet.`,
        optimalApproachText || 'Optimal algorithm approach with full invariants and complexities.',
        JSON.stringify(item.examples || []),
        JSON.stringify(approaches),
        JSON.stringify(generatedTags),
        status,
        isFavorite,
        matchedVisualizer,
        createdAt
      );
      insertedCount++;

      // Delete old solutions and insert multi-tier solutions
      deleteSolutions.run(qId);

      // Distribute approaches across tiers: intuitive, better, optimal
      const tierSols = {
        intuitive: {},
        better: {},
        optimal: {}
      };

      if (approaches.length === 1) {
        tierSols.optimal = approaches[0].codes || {};
        tierSols.better = approaches[0].codes || {};
        tierSols.intuitive = approaches[0].codes || {};
      } else if (approaches.length === 2) {
        tierSols.intuitive = approaches[0].codes || {};
        tierSols.better = approaches[0].codes || {};
        tierSols.optimal = approaches[1].codes || {};
      } else if (approaches.length >= 3) {
        tierSols.intuitive = approaches[0].codes || {};
        tierSols.better = approaches[1].codes || {};
        tierSols.optimal = approaches[approaches.length - 1].codes || {};
      }

      // Fallback: If any tier is empty, borrow from optimal
      for (const tier of ['intuitive', 'better', 'optimal']) {
        if (Object.keys(tierSols[tier]).length === 0 && Object.keys(tierSols.optimal).length > 0) {
          tierSols[tier] = { ...tierSols.optimal };
        }
      }

      for (const [tier, langCodes] of Object.entries(tierSols)) {
        for (const [lang, code] of Object.entries(langCodes)) {
          if (code && typeof code === 'string' && code.trim().length > 10) {
            insertSolution.run(qId, lang, code.trim(), tier);
            solutionsCount++;
          }
        }
      }
    }

    sqlite.exec('COMMIT');
    console.log(`[+] Successfully imported ${insertedCount} questions!`);
    console.log(`[+] Stored ${solutionsCount} code solutions across C++, Java, Python, and JavaScript!`);
    console.log(`[+] Auto-linked ${linkedVisualizersCount} questions to interactive visualizers!`);
    console.log('='.repeat(68));
  } catch (err) {
    sqlite.exec('ROLLBACK');
    console.error('[-] Transaction failed and rolled back:', err);
    process.exit(1);
  }
}

if (process.argv[1]?.includes('import-strivers-scraped')) {
  runMigration();
}

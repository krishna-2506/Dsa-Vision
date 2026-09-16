import fs from 'node:fs';
import path from 'node:path';
import { dbService } from '../server/db.js';

const baseOutDir = path.resolve(process.cwd(), 'data', 'gemini_research');
const batchesDir = path.join(baseOutDir, 'batches');
const promptsDir = path.join(baseOutDir, 'prompts');

fs.mkdirSync(baseOutDir, { recursive: true });
fs.mkdirSync(batchesDir, { recursive: true });
fs.mkdirSync(promptsDir, { recursive: true });

console.log('[Export] Fetching all questions from SQLite database...');
const allQuestions = dbService.getAllQuestions();
console.log(`[Export] Found ${allQuestions.length} total questions.`);

// Map each question into a clean research format
const cleanQuestions = allQuestions.map((q) => {
  const currentVideos = Array.isArray(q.youtube_videos) ? q.youtube_videos : [];
  return {
    id: q.id,
    display_id: q.display_id || '',
    title: q.title,
    step_no: q.step_no || 0,
    step_name: q.step_name || 'General',
    substep_no: q.substep_no || 0,
    substep_name: q.substep_name || 'General',
    difficulty: q.difficulty || 'Medium',
    category: q.category || '',
    leetcode_url: q.leetcode_url || '',
    tuf_article_url: q.article_url || '',
    tuf_youtube_url: q.youtube_url || '',
    existing_gfg_url: q.gfg_url || '',
    existing_videos_count: currentVideos.length
  };
});

// 1. Export master JSON
const masterJsonPath = path.join(baseOutDir, 'all_problems_master.json');
fs.writeFileSync(masterJsonPath, JSON.stringify(cleanQuestions, null, 2), 'utf8');
console.log(`[Export] Wrote master JSON to ${masterJsonPath}`);

// 2. Export compact JSON (minimal token footprint)
const compactQuestions = cleanQuestions.map(q => ({
  id: q.id,
  title: q.title,
  step: `Step ${q.step_no}: ${q.step_name}`,
  substep: q.substep_name,
  difficulty: q.difficulty,
  leetcode_url: q.leetcode_url || undefined,
  tuf_article: q.tuf_article_url || undefined
}));
const compactJsonPath = path.join(baseOutDir, 'all_problems_compact.json');
fs.writeFileSync(compactJsonPath, JSON.stringify(compactQuestions, null, 2), 'utf8');
console.log(`[Export] Wrote compact JSON to ${compactJsonPath}`);

// 3. Export CSV format
const csvHeader = 'id,display_id,title,step_no,step_name,substep_name,difficulty,leetcode_url,tuf_article_url\n';
const csvRows = cleanQuestions.map(q => {
  const escapeCsv = (str) => `"${String(str || '').replace(/"/g, '""')}"`;
  return [
    escapeCsv(q.id),
    escapeCsv(q.display_id),
    escapeCsv(q.title),
    q.step_no,
    escapeCsv(q.step_name),
    escapeCsv(q.substep_name),
    escapeCsv(q.difficulty),
    escapeCsv(q.leetcode_url),
    escapeCsv(q.tuf_article_url)
  ].join(',');
}).join('\n');
const csvPath = path.join(baseOutDir, 'all_problems.csv');
fs.writeFileSync(csvPath, csvHeader + csvRows, 'utf8');
console.log(`[Export] Wrote CSV to ${csvPath}`);

// 4. Create batches of 20-25 questions each (grouped cleanly by Step & Substep)
const BATCH_SIZE = 25;
const batches = [];
let currentBatch = [];
let currentStep = null;

for (const q of cleanQuestions) {
  // If we change step and current batch is reasonably sized (>= 15), cut the batch
  const stepChanged = currentStep !== null && currentStep !== q.step_no;
  if ((currentBatch.length >= BATCH_SIZE) || (stepChanged && currentBatch.length >= 15)) {
    batches.push(currentBatch);
    currentBatch = [];
  }
  currentBatch.push(q);
  currentStep = q.step_no;
}
if (currentBatch.length > 0) {
  batches.push(currentBatch);
}

console.log(`[Export] Partitioned ${cleanQuestions.length} questions into ${batches.length} research batches.`);

// Master system prompt template
function generateBatchPrompt(batchNum, totalBatches, batchQuestions) {
  const sampleBatchSlice = batchQuestions.map(q => ({
    id: q.id,
    title: q.title,
    difficulty: q.difficulty,
    topic: `${q.step_name} > ${q.substep_name}`,
    leetcode_url: q.leetcode_url || 'Search by title',
    tuf_article_url: q.tuf_article_url || 'Search by title'
  }));

  return `# Gemini Spark Research Prompt — Batch ${batchNum} of ${totalBatches}
## Topic Focus: ${batchQuestions[0].step_name}

You are an expert Data Structures & Algorithms (DSA) research assistant. Your task is to use **Google Search** and **YouTube Search grounding** to find high-quality alternate learning resources for the following DSA problems.

---

### Instructions for Gemini:
1. **Search YouTube for Verified Video Solutions**:
   - Find popular, top-rated video explanations by trusted channels such as:
     - **NeetCode / NeetCodeIO** (Clean English Python/C++ walkthroughs)
     - **Abdul Bari** (Fundamental algorithmic intuition & diagrams)
     - **Aditya Verma** (Specialized patterns for DP, Recursion, Stack, Sliding Window, Heap)
     - **Take U forward / Striver** (Complete step-by-step Hindi/English guides)
     - **CodeWithHarry / Love Babbar / Kunal Kushwaha / TechDose / Pepcoding / Kevin Naughton Jr.**
   - **CRITICAL**: ONLY include REAL, VERIFIED YouTube URLs (e.g. \`https://www.youtube.com/watch?v=...\`). DO NOT fabricate or guess video IDs.
   - For each video, record:
     - \`id\`: kebab-case identifier (e.g. \`"neetcode-two-sum"\`, \`"abdul-bari-bubble-sort"\`)
     - \`title\`: Actual video title or descriptive title (e.g. \`"NeetCode - Two Sum Solution"\`)
     - \`url\`: Direct YouTube video link
     - \`channel\`: YouTube channel name (e.g. \`"NeetCode"\`, \`"Abdul Bari"\`, \`"CodeWithHarry"\`)
     - \`notes\`: Short 1-sentence explanation of why it's recommended (e.g. \`"Great visual hashmap explanation"\`)

2. **Search Google for GeeksforGeeks Solutions & Articles**:
   - Search for the official GeeksforGeeks article for this exact problem or its classic algorithmic equivalent (e.g. query: \`"site:geeksforgeeks.org <Problem Title>"\`).
   - Find the exact URL (e.g. \`https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/\`).
   - If available, also find the GeeksforGeeks practice problem link.

3. **Search for Other High-Quality Editorials**:
   - Check LeetCode official editorial, InterviewBit, or authoritative blogs.

4. **Return Strict JSON Output**:
   - Return ONLY a single valid JSON array (enclosed in \`\`\`json ... \`\`\`).
   - Each object in the array must match this exact schema:

\`\`\`json
[
  {
    "id": "problem-slug-here",
    "title": "Exact Problem Title",
    "gfg_url": "https://www.geeksforgeeks.org/...",
    "alternate_articles": [
      {
        "title": "GeeksforGeeks - Problem Name",
        "url": "https://www.geeksforgeeks.org/...",
        "source": "GeeksforGeeks"
      },
      {
        "title": "LeetCode Editorial / Discussion",
        "url": "https://leetcode.com/problems/.../editorial/",
        "source": "LeetCode"
      }
    ],
    "alternate_videos": [
      {
        "id": "neetcode-problem-slug",
        "title": "NeetCode - Problem Title Walkthrough",
        "url": "https://www.youtube.com/watch?v=...",
        "channel": "NeetCode",
        "notes": "Optimal hash map approach in Python & C++"
      },
      {
        "id": "aditya-verma-problem-slug",
        "title": "Aditya Verma - Pattern Explanation",
        "url": "https://www.youtube.com/watch?v=...",
        "channel": "Aditya Verma",
        "notes": "Step-by-step recursive tree and tabulation table"
      }
    ]
  }
]
\`\`\`

---

### Input Data for Batch ${batchNum} (${batchQuestions.length} Problems):

\`\`\`json
${JSON.stringify(sampleBatchSlice, null, 2)}
\`\`\`

---

### Gemini Output Requirement:
Please search Google and YouTube for each of the ${batchQuestions.length} problems above and output the strict JSON array now.`;
}

// Generate files for each batch
batches.forEach((batch, idx) => {
  const batchNum = idx + 1;
  const padNum = String(batchNum).padStart(2, '0');
  const safeName = batch[0].step_name.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 20);
  
  // Save batch JSON
  const batchJsonPath = path.join(batchesDir, `batch_${padNum}_${safeName}.json`);
  fs.writeFileSync(batchJsonPath, JSON.stringify(batch, null, 2), 'utf8');

  // Save ready-to-run prompt Markdown
  const promptMd = generateBatchPrompt(batchNum, batches.length, batch);
  const promptPath = path.join(promptsDir, `batch_${padNum}_prompt.md`);
  fs.writeFileSync(promptPath, promptMd, 'utf8');
});

// Write Master Instructions Guide
const masterGuidePath = path.join(baseOutDir, 'GEMINI_SPARK_MASTER_PROMPT.md');
const masterGuideContent = `# Gemini Spark DSA Research System: Master Guide & Database

Welcome to the **AlgoVision & Gemini Spark Research System**!

This system allows you to use **Gemini Spark (Gemini 2.0 Flash / Pro with Search & YouTube Grounding)** to automatically discover and link:
1. **Alternate YouTube Video Tutorials** (NeetCode, Abdul Bari, Aditya Verma, CodeWithHarry, Take U Forward, Love Babbar, TechDose, etc.)
2. **GeeksforGeeks Editorial Articles & Practice Links**
3. **Other top-tier editorial articles** (LeetCode official, InterviewBit)

---

## 📁 Generated Research Files

All 450 problems from the Striver A2Z DSA Sheet have been exported and organized into:

| File / Folder | Purpose |
| :--- | :--- |
| **\`all_problems_master.json\`** | Full database export of all 450 problems with complete metadata. |
| **\`all_problems_compact.json\`** | Token-optimized JSON list for uploading or bulk queries. |
| **\`all_problems.csv\`** | Spreadsheet-ready CSV of all problems, categories, and links. |
| **\`batches/\`** | All 450 problems split into **${batches.length} manageable batches** (15-25 problems each). |
| **\`prompts/\`** | **Ready-to-run prompts** for each batch (\`batch_01_prompt.md\` to \`batch_${String(batches.length).padStart(2, '0')}_prompt.md\`). |

---

## 🚀 How to Run the Research Workflow

### Step 1: Pick a Batch Prompt
Open any prompt file from \`data/gemini_research/prompts/\`, for example:
- \`batch_01_prompt.md\` (Step 1: Basics - Part 1)
- \`batch_04_prompt.md\` (Step 3: Arrays Easy)
- \`batch_05_prompt.md\` (Step 3: Arrays Medium)
- \`batch_07_prompt.md\` (Step 4: Binary Search)
- \`batch_15_prompt.md\` (Step 15: Graphs)
- \`batch_17_prompt.md\` (Step 16: Dynamic Programming)

### Step 2: Paste into Gemini Spark
1. Open Gemini (ensure **Google Search & YouTube grounding** is enabled).
2. Copy the entire contents of the batch prompt and paste it into Gemini.
3. Gemini will use its real-time search tools to find verified YouTube videos, GFG articles, and editorials.

### Step 3: Import Results into AlgoVision
You have **TWO** super easy ways to import Gemini's JSON response:

#### Option A: Paste directly in Admin Panel (Instant UI)
1. Go to your local AlgoVision site: [http://localhost:5173/#admin](http://localhost:5173/#admin).
2. Open the **"⚡ Gemini Research Importer"** tab.
3. Paste Gemini's JSON output directly into the text area.
4. Click **"Import & Merge Research Data"**. It will update the database live!

#### Option B: Using the Command Line Importer
1. Save Gemini's JSON output into a file, e.g. \`data/gemini_research/results/batch_01_results.json\`.
2. Run:
   \`\`\`bash
   node scripts/import_gemini_research.mjs data/gemini_research/results/batch_01_results.json
   \`\`\`
3. The script automatically merges new videos (preserving Striver's primary video) and updates GFG links in SQLite!

---

## 📋 Standard Gemini Output JSON Schema

When researching individual problems or custom subsets, Gemini returns this format:

\`\`\`json
[
  {
    "id": "two-sum",
    "title": "Two Sum",
    "gfg_url": "https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/",
    "alternate_articles": [
      {
        "title": "GeeksforGeeks - Key Pair / Two Sum",
        "url": "https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/",
        "source": "GeeksforGeeks"
      },
      {
        "title": "LeetCode Editorial",
        "url": "https://leetcode.com/problems/two-sum/editorial/",
        "source": "LeetCode"
      }
    ],
    "alternate_videos": [
      {
        "id": "neetcode-two-sum",
        "title": "NeetCode - Two Sum - Leetcode 1",
        "url": "https://www.youtube.com/watch?v=KLlXCFG5TnA",
        "channel": "NeetCode",
        "notes": "One-pass hashmap explanation with code in Python"
      },
      {
        "id": "abdul-bari-two-sum",
        "title": "Abdul Bari - Two Sum Problem",
        "url": "https://www.youtube.com/watch?v=...",
        "channel": "Abdul Bari",
        "notes": "Clear visual diagram and time complexity analysis"
      }
    ]
  }
]
\`\`\`

---
*Created for AlgoVision Pro by Antigravity Studio*
`;
fs.writeFileSync(masterGuidePath, masterGuideContent, 'utf8');
console.log(`[Export] Wrote Master Guide to ${masterGuidePath}`);

console.log('\n✅ [Export Complete] Successfully generated:');
console.log(`- Master DB: data/gemini_research/all_problems_master.json (${cleanQuestions.length} problems)`);
console.log(`- Compact DB: data/gemini_research/all_problems_compact.json`);
console.log(`- CSV DB: data/gemini_research/all_problems.csv`);
console.log(`- Batches: ${batches.length} files in data/gemini_research/batches/`);
console.log(`- Ready-to-run Prompts: ${batches.length} files in data/gemini_research/prompts/`);
console.log(`- Master Documentation: data/gemini_research/GEMINI_SPARK_MASTER_PROMPT.md`);

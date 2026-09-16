# Gemini Spark DSA Research System: Master Guide & Database

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
| **`all_problems_master.json`** | Full database export of all 450 problems with complete metadata. |
| **`all_problems_compact.json`** | Token-optimized JSON list for uploading or bulk queries. |
| **`all_problems.csv`** | Spreadsheet-ready CSV of all problems, categories, and links. |
| **`batches/`** | All 450 problems split into **20 manageable batches** (15-25 problems each). |
| **`prompts/`** | **Ready-to-run prompts** for each batch (`batch_01_prompt.md` to `batch_20_prompt.md`). |

---

## 🚀 How to Run the Research Workflow

### Step 1: Pick a Batch Prompt
Open any prompt file from `data/gemini_research/prompts/`, for example:
- `batch_01_prompt.md` (Step 1: Basics - Part 1)
- `batch_04_prompt.md` (Step 3: Arrays Easy)
- `batch_05_prompt.md` (Step 3: Arrays Medium)
- `batch_07_prompt.md` (Step 4: Binary Search)
- `batch_15_prompt.md` (Step 15: Graphs)
- `batch_17_prompt.md` (Step 16: Dynamic Programming)

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
1. Save Gemini's JSON output into a file, e.g. `data/gemini_research/results/batch_01_results.json`.
2. Run:
   ```bash
   node scripts/import_gemini_research.mjs data/gemini_research/results/batch_01_results.json
   ```
3. The script automatically merges new videos (preserving Striver's primary video) and updates GFG links in SQLite!

---

## 📋 Standard Gemini Output JSON Schema

When researching individual problems or custom subsets, Gemini returns this format:

```json
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
```

---
*Created for AlgoVision Pro by Antigravity Studio*

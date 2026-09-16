# Gemini Spark Research Prompt — Batch 13 of 20
## Topic Focus: Greedy Algorithms [Easy, Medium/Hard]

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
   - **CRITICAL**: ONLY include REAL, VERIFIED YouTube URLs (e.g. `https://www.youtube.com/watch?v=...`). DO NOT fabricate or guess video IDs.
   - For each video, record:
     - `id`: kebab-case identifier (e.g. `"neetcode-two-sum"`, `"abdul-bari-bubble-sort"`)
     - `title`: Actual video title or descriptive title (e.g. `"NeetCode - Two Sum Solution"`)
     - `url`: Direct YouTube video link
     - `channel`: YouTube channel name (e.g. `"NeetCode"`, `"Abdul Bari"`, `"CodeWithHarry"`)
     - `notes`: Short 1-sentence explanation of why it's recommended (e.g. `"Great visual hashmap explanation"`)

2. **Search Google for GeeksforGeeks Solutions & Articles**:
   - Search for the official GeeksforGeeks article for this exact problem or its classic algorithmic equivalent (e.g. query: `"site:geeksforgeeks.org <Problem Title>"`).
   - Find the exact URL (e.g. `https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/`).
   - If available, also find the GeeksforGeeks practice problem link.

3. **Search for Other High-Quality Editorials**:
   - Check LeetCode official editorial, InterviewBit, or authoritative blogs.

4. **Return Strict JSON Output**:
   - Return ONLY a single valid JSON array (enclosed in ```json ... ```).
   - Each object in the array must match this exact schema:

```json
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
```

---

### Input Data for Batch 13 (15 Problems):

```json
[
  {
    "id": "assign-cookies",
    "title": "Assign Cookies",
    "difficulty": "Easy",
    "topic": "Greedy Algorithms [Easy, Medium/Hard] > Easy Problems",
    "leetcode_url": "https://leetcode.com/problems/assign-cookies/",
    "tuf_article_url": "https://takeuforward.org/data-structure/assign-cookies"
  },
  {
    "id": "fractional-knapsack",
    "title": "Fractional Knapsack",
    "difficulty": "Medium",
    "topic": "Greedy Algorithms [Easy, Medium/Hard] > Easy Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/fractional-knapsack-problem-greedy-approach/"
  },
  {
    "id": "lemonade-change",
    "title": "Lemonade Change",
    "difficulty": "Easy",
    "topic": "Greedy Algorithms [Easy, Medium/Hard] > Easy Problems",
    "leetcode_url": "https://leetcode.com/problems/lemonade-change/",
    "tuf_article_url": "https://takeuforward.org/Greedy/lemonade-change"
  },
  {
    "id": "valid-paranthesis-checker",
    "title": "Valid Paranthesis Checker",
    "difficulty": "Hard",
    "topic": "Greedy Algorithms [Easy, Medium/Hard] > Easy Problems",
    "leetcode_url": "https://leetcode.com/problems/valid-parenthesis-string/",
    "tuf_article_url": "https://takeuforward.org/data-structure/valid-paranthesis-checker"
  },
  {
    "id": "candy",
    "title": "Candy",
    "difficulty": "Hard",
    "topic": "Greedy Algorithms [Easy, Medium/Hard] > Medium/Hard",
    "leetcode_url": "https://leetcode.com/problems/candy/",
    "tuf_article_url": "https://takeuforward.org/data-structure/candy"
  },
  {
    "id": "insert-interval",
    "title": "Insert Interval",
    "difficulty": "Medium",
    "topic": "Greedy Algorithms [Easy, Medium/Hard] > Medium/Hard",
    "leetcode_url": "https://leetcode.com/problems/insert-interval/",
    "tuf_article_url": "https://takeuforward.org/data-structure/insert-new-interval"
  },
  {
    "id": "job-sequencing-problem",
    "title": "Job sequencing Problem",
    "difficulty": "Medium",
    "topic": "Greedy Algorithms [Easy, Medium/Hard] > Medium/Hard",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/job-sequencing-problem/"
  },
  {
    "id": "jump-game-i",
    "title": "Jump Game - I",
    "difficulty": "Easy",
    "topic": "Greedy Algorithms [Easy, Medium/Hard] > Medium/Hard",
    "leetcode_url": "https://leetcode.com/problems/jump-game/",
    "tuf_article_url": "https://takeuforward.org/Greedy/jump-game-i"
  },
  {
    "id": "jump-game-ii",
    "title": "Jump Game II",
    "difficulty": "Medium",
    "topic": "Greedy Algorithms [Easy, Medium/Hard] > Medium/Hard",
    "leetcode_url": "https://leetcode.com/problems/jump-game-ii/",
    "tuf_article_url": "https://takeuforward.org/data-structure/jump-game-2"
  },
  {
    "id": "merge-intervals",
    "title": "Merge Intervals",
    "difficulty": "Medium",
    "topic": "Greedy Algorithms [Easy, Medium/Hard] > Medium/Hard",
    "leetcode_url": "https://leetcode.com/problems/merge-intervals/",
    "tuf_article_url": "https://takeuforward.org/data-structure/merge-overlapping-sub-intervals/"
  },
  {
    "id": "minimum-number-of-platforms-required-for-a-railway",
    "title": "Minimum number of platforms required for a railway",
    "difficulty": "Medium",
    "topic": "Greedy Algorithms [Easy, Medium/Hard] > Medium/Hard",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/minimum-number-of-platforms-required-for-a-railway/"
  },
  {
    "id": "n-meetings-in-one-room",
    "title": "N meetings in one room",
    "difficulty": "Medium",
    "topic": "Greedy Algorithms [Easy, Medium/Hard] > Medium/Hard",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/n-meetings-in-one-room/"
  },
  {
    "id": "non-overlapping-intervals",
    "title": "Non-overlapping Intervals",
    "difficulty": "Medium",
    "topic": "Greedy Algorithms [Easy, Medium/Hard] > Medium/Hard",
    "leetcode_url": "https://leetcode.com/problems/non-overlapping-intervals/",
    "tuf_article_url": "https://takeuforward.org/data-structure/non-overlapping-intervals"
  },
  {
    "id": "program-for-least-recently-used-lru-page-replacement-algorithm",
    "title": "Program for Least Recently Used (LRU) Page Replacement Algorithm",
    "difficulty": "Medium",
    "topic": "Greedy Algorithms [Easy, Medium/Hard] > Medium/Hard",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/program-for-least-recently-used-lru-page-replacement-algorithm"
  },
  {
    "id": "shortest-job-first",
    "title": "Shortest Job First",
    "difficulty": "Medium",
    "topic": "Greedy Algorithms [Easy, Medium/Hard] > Medium/Hard",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/Greedy/shortest-job-first-or-sjf-cpu-scheduling"
  }
]
```

---

### Gemini Output Requirement:
Please search Google and YouTube for each of the 15 problems above and output the strict JSON array now.
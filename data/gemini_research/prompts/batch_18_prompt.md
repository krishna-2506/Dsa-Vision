# Gemini Spark Research Prompt — Batch 18 of 20
## Topic Focus: Graphs [Concepts & Problems]

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

### Input Data for Batch 18 (25 Problems):

```json
[
  {
    "id": "bridges-in-graph",
    "title": "Bridges in graph",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Other Algorithms",
    "leetcode_url": "https://leetcode.com/problems/critical-connections-in-a-network/discuss/382385/find-bridges-in-a-graph",
    "tuf_article_url": "https://takeuforward.org/graph/bridges-in-graph-using-tarjans-algorithm-of-time-in-and-low-time-g-55/"
  },
  {
    "id": "kosaraju-s-algorithm",
    "title": "Kosaraju's algorithm",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Other Algorithms",
    "leetcode_url": "https://leetcode.com/problems/maximum-number-of-non-overlapping-substrings/discuss/766485/kosaraju-algorithm-on",
    "tuf_article_url": "https://takeuforward.org/graph/strongly-connected-components-kosarajus-algorithm-g-54/"
  },
  {
    "id": "introduction-to-dp",
    "title": "Introduction to DP",
    "difficulty": "Easy",
    "topic": "Dynamic Programming [Patterns and Problems] > Introduction to DP",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/dynamic-programming-introduction/"
  },
  {
    "id": "climbing-stairs",
    "title": "Climbing stairs",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > 1D DP",
    "leetcode_url": "https://leetcode.com/problems/climbing-stairs/",
    "tuf_article_url": "https://takeuforward.org/data-structure/dynamic-programming-climbing-stairs/"
  },
  {
    "id": "frog-jump",
    "title": "Frog Jump",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > 1D DP",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/dynamic-programming-frog-jump-dp-3/"
  },
  {
    "id": "frog-jump-with-k-distances",
    "title": "Frog jump with K distances",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > 1D DP",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/dynamic-programming-frog-jump-with-k-distances-dp-4/"
  },
  {
    "id": "house-robber",
    "title": "House robber",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > 1D DP",
    "leetcode_url": "https://leetcode.com/problems/house-robber-ii/",
    "tuf_article_url": "https://takeuforward.org/data-structure/dynamic-programming-house-robber-dp-6/"
  },
  {
    "id": "maximum-sum-of-non-adjacent-elements",
    "title": "Maximum sum of non adjacent elements",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > 1D DP",
    "leetcode_url": "https://leetcode.com/problems/house-robber/",
    "tuf_article_url": "https://takeuforward.org/data-structure/maximum-sum-of-non-adjacent-elements-dp-5/"
  },
  {
    "id": "grid-unique-paths-dp-on-grids-dp8",
    "title": "Grid Unique Paths : DP on Grids (DP8)",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > 2D/3D DP and DP on Grids",
    "leetcode_url": "https://leetcode.com/problems/unique-paths/",
    "tuf_article_url": "https://takeuforward.org/data-structure/grid-unique-paths-dp-on-grids-dp8/"
  },
  {
    "id": "minimum-falling-path-sum",
    "title": "Minimum Falling Path Sum",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > 2D/3D DP and DP on Grids",
    "leetcode_url": "https://leetcode.com/problems/minimum-path-sum/",
    "tuf_article_url": "https://takeuforward.org/data-structure/minimum-path-sum-in-a-grid-dp-10/"
  },
  {
    "id": "ninja-and-his-friends",
    "title": "Ninja and his Friends",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > 2D/3D DP and DP on Grids",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/3-d-dp-ninja-and-his-friends-dp-13/"
  },
  {
    "id": "ninja-s-training",
    "title": "Ninja's training",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > 2D/3D DP and DP on Grids",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/dynamic-programming-ninjas-training-dp-7/"
  },
  {
    "id": "triangle",
    "title": "Triangle",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > 2D/3D DP and DP on Grids",
    "leetcode_url": "https://leetcode.com/problems/triangle/",
    "tuf_article_url": "https://takeuforward.org/data-structure/minimum-path-sum-in-triangular-grid-dp-11/"
  },
  {
    "id": "unique-paths-ii",
    "title": "Unique paths II",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > 2D/3D DP and DP on Grids",
    "leetcode_url": "https://leetcode.com/problems/unique-paths-ii/",
    "tuf_article_url": "https://takeuforward.org/data-structure/grid-unique-paths-2-dp-9/"
  },
  {
    "id": "assign-cookies-541",
    "title": "Assign Cookies",
    "difficulty": "Easy",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Subsequences",
    "leetcode_url": "https://leetcode.com/problems/assign-cookies/",
    "tuf_article_url": "https://takeuforward.org/data-structure/assign-cookies"
  },
  {
    "id": "coin-change-2-dp-22",
    "title": "Coin Change 2 (DP - 22)",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Subsequences",
    "leetcode_url": "https://leetcode.com/problems/coin-change-2/",
    "tuf_article_url": "https://takeuforward.org/data-structure/coin-change-2-dp-22/"
  },
  {
    "id": "count-partitions-with-given-difference",
    "title": "Count partitions with given difference",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Subsequences",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/count-partitions-with-given-difference-dp-18/"
  },
  {
    "id": "count-subsets-with-sum-k",
    "title": "Count subsets with sum K",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Subsequences",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/count-subsets-with-sum-k-dp-17/"
  },
  {
    "id": "minimum-coins-dp-20",
    "title": "Minimum Coins (DP - 20)",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Subsequences",
    "leetcode_url": "https://leetcode.com/problems/coin-change/",
    "tuf_article_url": "https://takeuforward.org/data-structure/minimum-coins-dp-20/"
  },
  {
    "id": "partition-a-set-into-two-subsets-with-minimum-absolute-sum-difference",
    "title": "Partition a set into two subsets with minimum absolute sum difference",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Subsequences",
    "leetcode_url": "https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference/",
    "tuf_article_url": "https://takeuforward.org/data-structure/partition-set-into-2-subsets-with-min-absolute-sum-diff-dp-16/"
  },
  {
    "id": "partition-equal-subset-sum",
    "title": "Partition equal subset sum",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Subsequences",
    "leetcode_url": "https://leetcode.com/problems/partition-equal-subset-sum/",
    "tuf_article_url": "https://takeuforward.org/data-structure/partition-equal-subset-sum-dp-15/"
  },
  {
    "id": "rod-cutting-problem-dp-24",
    "title": "Rod Cutting Problem | (DP - 24)",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Subsequences",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/rod-cutting-problem-dp-24/"
  },
  {
    "id": "subset-sum-equal-to-target-dp-14",
    "title": "Subset sum equal to target (DP- 14)",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Subsequences",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/subset-sum-equal-to-target-dp-14/"
  },
  {
    "id": "target-sum",
    "title": "Target sum",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Subsequences",
    "leetcode_url": "https://leetcode.com/problems/target-sum/",
    "tuf_article_url": "https://takeuforward.org/data-structure/target-sum-dp-21/"
  },
  {
    "id": "unbounded-knapsack",
    "title": "Unbounded knapsack",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Subsequences",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/unbounded-knapsack-dp-23/"
  }
]
```

---

### Gemini Output Requirement:
Please search Google and YouTube for each of the 25 problems above and output the strict JSON array now.
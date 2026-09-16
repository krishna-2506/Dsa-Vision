# Gemini Spark Research Prompt — Batch 19 of 20
## Topic Focus: Dynamic Programming [Patterns and Problems]

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

### Input Data for Batch 19 (25 Problems):

```json
[
  {
    "id": "distinct-subsequences",
    "title": "Distinct subsequences",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Strings",
    "leetcode_url": "https://leetcode.com/problems/distinct-subsequences/",
    "tuf_article_url": "https://takeuforward.org/data-structure/distinct-subsequences-dp-32/"
  },
  {
    "id": "edit-distance",
    "title": "Edit distance",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Strings",
    "leetcode_url": "https://leetcode.com/problems/edit-distance/",
    "tuf_article_url": "https://takeuforward.org/data-structure/edit-distance-dp-33/"
  },
  {
    "id": "longest-common-subsequence",
    "title": "Longest common subsequence",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Strings",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/print-longest-common-subsequence-dp-26/"
  },
  {
    "id": "longest-common-substring",
    "title": "Longest common substring",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Strings",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/longest-common-substring-dp-27/"
  },
  {
    "id": "longest-palindromic-subsequence",
    "title": "Longest palindromic subsequence",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Strings",
    "leetcode_url": "https://leetcode.com/problems/longest-palindromic-subsequence/",
    "tuf_article_url": "https://takeuforward.org/data-structure/longest-palindromic-subsequence-dp-28/"
  },
  {
    "id": "minimum-insertions-or-deletions-to-convert-string-a-to-b",
    "title": "Minimum insertions or deletions to convert string A to B",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Strings",
    "leetcode_url": "https://leetcode.com/problems/delete-operation-for-two-strings/",
    "tuf_article_url": "https://takeuforward.org/data-structure/minimum-insertions-deletions-to-convert-string-dp-30/"
  },
  {
    "id": "minimum-insertions-to-make-string-palindrome-dp-29",
    "title": "Minimum insertions to make string palindrome | DP-29",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Strings",
    "leetcode_url": "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/",
    "tuf_article_url": "https://takeuforward.org/data-structure/minimum-insertions-to-make-string-palindrome-dp-29/"
  },
  {
    "id": "print-longest-common-subsequence-dp-26",
    "title": "Print Longest Common Subsequence | (DP - 26)",
    "difficulty": "hard",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Strings",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/print-longest-common-subsequence-dp-26/"
  },
  {
    "id": "shortest-common-supersequence",
    "title": "Shortest common supersequence",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Strings",
    "leetcode_url": "https://leetcode.com/problems/shortest-common-supersequence/",
    "tuf_article_url": "https://takeuforward.org/data-structure/shortest-common-supersequence-dp-31/"
  },
  {
    "id": "wildcard-matching",
    "title": "Wildcard matching",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Strings",
    "leetcode_url": "https://leetcode.com/problems/wildcard-matching/",
    "tuf_article_url": "https://takeuforward.org/data-structure/wildcard-matching-dp-34/"
  },
  {
    "id": "best-time-to-buy-and-sell-stock",
    "title": "Best time to buy and sell stock",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Stocks",
    "leetcode_url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    "tuf_article_url": "https://takeuforward.org/data-structure/stock-buy-and-sell/"
  },
  {
    "id": "best-time-to-buy-and-sell-stock-ii",
    "title": "Best time to buy and sell stock II",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Stocks",
    "leetcode_url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
    "tuf_article_url": "https://takeuforward.org/data-structure/buy-and-sell-stock-ii-dp-36/"
  },
  {
    "id": "best-time-to-buy-and-sell-stock-iii",
    "title": "Best time to buy and sell stock III",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Stocks",
    "leetcode_url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/",
    "tuf_article_url": "https://takeuforward.org/data-structure/buy-and-sell-stock-iii-dp-37/"
  },
  {
    "id": "best-time-to-buy-and-sell-stock-iv",
    "title": "Best time to buy and sell stock IV",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Stocks",
    "leetcode_url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/",
    "tuf_article_url": "https://takeuforward.org/data-structure/buy-and-sell-stock-iv-dp-38/"
  },
  {
    "id": "best-time-to-buy-and-sell-stock-with-cooldown",
    "title": "Best Time to Buy and Sell Stock with Cooldown",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Stocks",
    "leetcode_url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
    "tuf_article_url": "https://takeuforward.org/data-structure/buy-and-sell-stocks-with-cooldown-dp-39/"
  },
  {
    "id": "best-time-to-buy-and-sell-stock-with-transaction-fees",
    "title": "Best time to buy and sell stock with transaction fees",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Stocks",
    "leetcode_url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/",
    "tuf_article_url": "https://takeuforward.org/data-structure/buy-and-sell-stocks-with-transaction-fees-dp-40/"
  },
  {
    "id": "largest-divisible-subset",
    "title": "Largest Divisible Subset",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on LIS",
    "leetcode_url": "https://leetcode.com/problems/largest-divisible-subset/",
    "tuf_article_url": "https://takeuforward.org/data-structure/longest-divisible-subset-dp-44/"
  },
  {
    "id": "longest-bitonic-subsequence",
    "title": "Longest Bitonic Subsequence",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on LIS",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/longest-bitonic-subsequence-dp-46/"
  },
  {
    "id": "longest-increasing-subsequence",
    "title": "Longest Increasing Subsequence",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on LIS",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/longest-increasing-subsequence-binary-search-dp-43/"
  },
  {
    "id": "longest-increasing-subsequence-dp-43",
    "title": "Longest Increasing Subsequence |(DP-43)",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on LIS",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/longest-increasing-subsequence-binary-search-dp-43/"
  },
  {
    "id": "longest-string-chain",
    "title": "Longest String Chain",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on LIS",
    "leetcode_url": "https://leetcode.com/problems/longest-string-chain/",
    "tuf_article_url": "https://takeuforward.org/data-structure/longest-string-chain-dp-45/"
  },
  {
    "id": "number-of-longest-increasing-subsequences",
    "title": "Number of Longest Increasing Subsequences",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on LIS",
    "leetcode_url": "https://leetcode.com/problems/number-of-longest-increasing-subsequence/",
    "tuf_article_url": "https://takeuforward.org/data-structure/number-of-longest-increasing-subsequences-dp-47/"
  },
  {
    "id": "print-longest-increasing-subsequence",
    "title": "Print Longest Increasing Subsequence",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on LIS",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/printing-longest-increasing-subsequence-dp-42/"
  },
  {
    "id": "burst-balloons",
    "title": "Burst balloons",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > MCM DP | Partition DP",
    "leetcode_url": "https://leetcode.com/problems/burst-balloons/",
    "tuf_article_url": "https://takeuforward.org/data-structure/burst-balloons-partition-dp-dp-51/"
  },
  {
    "id": "different-ways-to-evaluate-a-boolean-expression",
    "title": "Different Ways to Evaluate a Boolean Expression",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > MCM DP | Partition DP",
    "leetcode_url": "https://leetcode.com/problems/parsing-a-boolean-expression/",
    "tuf_article_url": "https://takeuforward.org/data-structure/evaluate-boolean-expression-to-true-partition-dp-dp-52/"
  }
]
```

---

### Gemini Output Requirement:
Please search Google and YouTube for each of the 25 problems above and output the strict JSON array now.
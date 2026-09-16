# Gemini Spark Research Prompt — Batch 20 of 20
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

### Input Data for Batch 20 (17 Problems):

```json
[
  {
    "id": "matrix-chain-multiplication",
    "title": "Matrix chain multiplication",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > MCM DP | Partition DP",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/dynamic-programming/matrix-chain-multiplication-dp-48/"
  },
  {
    "id": "matrix-chain-multiplication-bottom-up-dp-49",
    "title": "Matrix Chain Multiplication | Bottom-Up|(DP-49)",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > MCM DP | Partition DP",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/matrix-chain-multiplication-tabulation-method-dp-49/"
  },
  {
    "id": "minimum-cost-to-cut-the-stick",
    "title": "Minimum cost to cut the stick",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > MCM DP | Partition DP",
    "leetcode_url": "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/",
    "tuf_article_url": "https://takeuforward.org/data-structure/minimum-cost-to-cut-the-stick-dp-50/"
  },
  {
    "id": "palindrome-partitioning-ii",
    "title": "Palindrome partitioning II",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > MCM DP | Partition DP",
    "leetcode_url": "https://leetcode.com/problems/palindrome-partitioning-ii/",
    "tuf_article_url": "https://takeuforward.org/data-structure/palindrome-partitioning-ii-front-partition-dp-53/"
  },
  {
    "id": "partition-array-for-maximum-sum",
    "title": "Partition Array for Maximum Sum",
    "difficulty": "Medium",
    "topic": "Dynamic Programming [Patterns and Problems] > MCM DP | Partition DP",
    "leetcode_url": "https://leetcode.com/problems/partition-array-for-maximum-sum/",
    "tuf_article_url": "https://takeuforward.org/data-structure/partition-array-for-maximum-sum-front-partition-dp-54/"
  },
  {
    "id": "count-square-submatrices-with-all-ones-dp-56",
    "title": "Count Square Submatrices with All Ones|(DP-56)",
    "difficulty": "Easy",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Squares",
    "leetcode_url": "https://leetcode.com/problems/count-square-submatrices-with-all-ones/",
    "tuf_article_url": "https://takeuforward.org/data-structure/count-square-submatrices-with-all-1s-dp-on-rectangles-dp-56/"
  },
  {
    "id": "maximum-rectangle-area-with-all-1-s-dp-55",
    "title": "Maximum Rectangle Area with all 1's|(DP-55)",
    "difficulty": "Hard",
    "topic": "Dynamic Programming [Patterns and Problems] > DP on Squares",
    "leetcode_url": "https://leetcode.com/problems/maximal-rectangle/",
    "tuf_article_url": "https://takeuforward.org/data-structure/maximum-rectangle-area-with-all-1s-dp-on-rectangles-dp-55/"
  },
  {
    "id": "trie-implementation-and-operations",
    "title": "Trie Implementation and Operations",
    "difficulty": "Hard",
    "topic": "Tries > Theory",
    "leetcode_url": "https://leetcode.com/problems/implement-trie-prefix-tree/",
    "tuf_article_url": "https://takeuforward.org/data-structure/implement-trie-1/"
  },
  {
    "id": "maximum-xor-of-two-numbers-in-an-array",
    "title": "Maximum XOR of two numbers in an array",
    "difficulty": "Hard",
    "topic": "Tries > Problems",
    "leetcode_url": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
    "tuf_article_url": "https://takeuforward.org/data-structure/maximum-xor-of-two-numbers-in-an-array/"
  },
  {
    "id": "maximum-xor-with-an-element-from-an-array",
    "title": "Maximum Xor with an element from an array",
    "difficulty": "Hard",
    "topic": "Tries > Problems",
    "leetcode_url": "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/",
    "tuf_article_url": "https://takeuforward.org/trie/maximum-xor-queries-trie/"
  },
  {
    "id": "number-of-distinct-substrings-in-a-string",
    "title": "Number of distinct substrings in a string",
    "difficulty": "Medium",
    "topic": "Tries > Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/number-of-distinct-substrings-in-a-string-using-trie/"
  },
  {
    "id": "trie-implementation-and-advanced-operations",
    "title": "Trie Implementation and Advanced Operations",
    "difficulty": "Hard",
    "topic": "Tries > Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/implement-trie-ii/"
  },
  {
    "id": "count-and-say",
    "title": "Count and say",
    "difficulty": "Hard",
    "topic": "Strings > Hard Problems",
    "leetcode_url": "https://leetcode.com/problems/count-and-say/",
    "tuf_article_url": "https://takeuforward.org/data-structure/count-and-say"
  },
  {
    "id": "hashing-in-strings-theory",
    "title": "Hashing In Strings | Theory",
    "difficulty": "Easy",
    "topic": "Strings > Hard Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/hashing-in-strings"
  },
  {
    "id": "kmp-algorithm-or-lps-array",
    "title": "KMP Algorithm or LPS array",
    "difficulty": "Hard",
    "topic": "Strings > Hard Problems",
    "leetcode_url": "https://leetcode.com/problems/implement-strstr/",
    "tuf_article_url": "https://takeuforward.org/data-structure/kmp-algorithm-or-lps-array"
  },
  {
    "id": "longest-happy-prefix",
    "title": "Longest happy prefix",
    "difficulty": "Hard",
    "topic": "Strings > Hard Problems",
    "leetcode_url": "https://leetcode.com/problems/longest-happy-prefix/",
    "tuf_article_url": "https://takeuforward.org/data-structure/longest-happy-prefix"
  },
  {
    "id": "minimum-number-of-bracket-reversals-to-make-an-expression-balanced",
    "title": "Minimum number of bracket reversals to make an expression balanced",
    "difficulty": "Hard",
    "topic": "Strings > Hard Problems",
    "leetcode_url": "https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/",
    "tuf_article_url": "https://takeuforward.org/data-structure/minimum-number-of-bracket-reversals-needed-to-make-an-expression-balanced"
  }
]
```

---

### Gemini Output Requirement:
Please search Google and YouTube for each of the 17 problems above and output the strict JSON array now.
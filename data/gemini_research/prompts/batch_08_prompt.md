# Gemini Spark Research Prompt — Batch 8 of 20
## Topic Focus: Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]

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

### Input Data for Batch 8 (25 Problems):

```json
[
  {
    "id": "find-pairs-with-given-sum-in-doubly-linked-list",
    "title": "Find Pairs with Given Sum in Doubly Linked List",
    "difficulty": "Medium",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Medium Problems of DLL",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/find-pairs-with-given-sum-in-doubly-linked-list"
  },
  {
    "id": "remove-duplicates-from-sorted-dll",
    "title": "Remove duplicates from sorted DLL",
    "difficulty": "hard",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Medium Problems of DLL",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/remove-duplicates-from-sorted-dll"
  },
  {
    "id": "clone-a-ll-with-random-and-next-pointer",
    "title": "Clone a LL with random and next pointer",
    "difficulty": "Hard",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Hard Problems of LL",
    "leetcode_url": "https://leetcode.com/problems/copy-list-with-random-pointer/",
    "tuf_article_url": "https://takeuforward.org/data-structure/clone-linked-list-with-random-and-next-pointer/"
  },
  {
    "id": "flattening-of-ll",
    "title": "Flattening of LL",
    "difficulty": "Hard",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Hard Problems of LL",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/flattening-a-linked-list/"
  },
  {
    "id": "reverse-ll-in-group-of-given-size-k",
    "title": "Reverse LL in group of given size K",
    "difficulty": "Hard",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Hard Problems of LL",
    "leetcode_url": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
    "tuf_article_url": "https://takeuforward.org/data-structure/reverse-linked-list-in-groups-of-size-k/"
  },
  {
    "id": "rotate-a-ll",
    "title": "Rotate a LL",
    "difficulty": "Hard",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Hard Problems of LL",
    "leetcode_url": "https://leetcode.com/problems/rotate-list/description/",
    "tuf_article_url": "https://takeuforward.org/data-structure/rotate-a-linked-list/"
  },
  {
    "id": "count-good-numbers",
    "title": "Count Good Numbers",
    "difficulty": "Medium",
    "topic": "Recursion [PatternWise] > Get a Strong Hold",
    "leetcode_url": "https://leetcode.com/problems/count-good-numbers/",
    "tuf_article_url": "https://takeuforward.org/data-structure/count-good-numbers"
  },
  {
    "id": "pow-x-n",
    "title": "Pow(x, n)",
    "difficulty": "Easy",
    "topic": "Recursion [PatternWise] > Get a Strong Hold",
    "leetcode_url": "https://leetcode.com/problems/powx-n/",
    "tuf_article_url": "https://takeuforward.org/data-structure/implement-powxn-x-raised-to-the-power-n/"
  },
  {
    "id": "recursive-implementation-of-atoi",
    "title": "Recursive Implementation of atoi()",
    "difficulty": "Medium",
    "topic": "Recursion [PatternWise] > Get a Strong Hold",
    "leetcode_url": "https://leetcode.com/problems/string-to-integer-atoi/",
    "tuf_article_url": "https://takeuforward.org/data-structure/recursive-implementation-of-atoi"
  },
  {
    "id": "reverse-a-stack",
    "title": "Reverse a Stack",
    "difficulty": "Medium",
    "topic": "Recursion [PatternWise] > Get a Strong Hold",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/reverse-a-stack-using-recursion"
  },
  {
    "id": "sort-a-stack-using-recursion",
    "title": "Sort a stack using recursion",
    "difficulty": "Medium",
    "topic": "Recursion [PatternWise] > Get a Strong Hold",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/sort-a-stack"
  },
  {
    "id": "check-if-there-exists-a-subsequence-with-sum-k",
    "title": "Check if there exists a subsequence with sum K",
    "difficulty": "Easy",
    "topic": "Recursion [PatternWise] > Subsequences Pattern",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/check-if-there-exists-a-subsequence-with-sum-k"
  },
  {
    "id": "combination-sum",
    "title": "Combination Sum",
    "difficulty": "Medium",
    "topic": "Recursion [PatternWise] > Subsequences Pattern",
    "leetcode_url": "https://leetcode.com/problems/combination-sum/",
    "tuf_article_url": "https://takeuforward.org/data-structure/combination-sum-1/"
  },
  {
    "id": "combination-sum-ii",
    "title": "Combination Sum II",
    "difficulty": "Medium",
    "topic": "Recursion [PatternWise] > Subsequences Pattern",
    "leetcode_url": "https://leetcode.com/problems/combination-sum-ii/",
    "tuf_article_url": "https://takeuforward.org/data-structure/combination-sum-ii-find-all-unique-combinations/"
  },
  {
    "id": "combination-sum-iii",
    "title": "Combination Sum III",
    "difficulty": "Medium",
    "topic": "Recursion [PatternWise] > Subsequences Pattern",
    "leetcode_url": "https://leetcode.com/problems/combination-sum-iii/",
    "tuf_article_url": "https://takeuforward.org/data-structure/combination-sum-iii"
  },
  {
    "id": "count-all-subsequences-with-sum-k",
    "title": "Count all subsequences with sum K",
    "difficulty": "Easy",
    "topic": "Recursion [PatternWise] > Subsequences Pattern",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/count-all-subsequences-with-sum-k"
  },
  {
    "id": "generate-binary-strings-without-consecutive-1s",
    "title": "Generate Binary Strings Without Consecutive 1s",
    "difficulty": "Medium",
    "topic": "Recursion [PatternWise] > Subsequences Pattern",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/generate-all-binary-strings"
  },
  {
    "id": "generate-parentheses",
    "title": "Generate Parentheses",
    "difficulty": "Medium",
    "topic": "Recursion [PatternWise] > Subsequences Pattern",
    "leetcode_url": "https://leetcode.com/problems/generate-parentheses/",
    "tuf_article_url": "https://takeuforward.org/data-structure/generate-parenthesis"
  },
  {
    "id": "learn-all-patterns-of-subsequences-theory",
    "title": "Learn All Patterns of Subsequences (Theory)",
    "difficulty": "Easy",
    "topic": "Recursion [PatternWise] > Subsequences Pattern",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/learn-all-patterns-of-subsequences-theory"
  },
  {
    "id": "letter-combinations-of-a-phone-number",
    "title": "Letter Combinations of a Phone Number",
    "difficulty": "Hard",
    "topic": "Recursion [PatternWise] > Subsequences Pattern",
    "leetcode_url": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
    "tuf_article_url": "https://takeuforward.org/data-structure/letter-combinations-of-a-phone-number"
  },
  {
    "id": "power-set",
    "title": "Power Set",
    "difficulty": "Medium",
    "topic": "Recursion [PatternWise] > Subsequences Pattern",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/power-set-print-all-the-possible-subsequences-of-the-string/"
  },
  {
    "id": "subsets-i",
    "title": "Subsets I",
    "difficulty": "Medium",
    "topic": "Recursion [PatternWise] > Subsequences Pattern",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/subset-sum-sum-of-all-subsets/"
  },
  {
    "id": "subsets-ii",
    "title": "Subsets II",
    "difficulty": "Medium",
    "topic": "Recursion [PatternWise] > Subsequences Pattern",
    "leetcode_url": "https://leetcode.com/problems/subsets-ii/",
    "tuf_article_url": "https://takeuforward.org/data-structure/subset-ii-print-all-the-unique-subsets/"
  },
  {
    "id": "expression-add-operators",
    "title": "Expression Add Operators",
    "difficulty": "Hard",
    "topic": "Recursion [PatternWise] > Trying out all Combos / Hard",
    "leetcode_url": "https://leetcode.com/problems/expression-add-operators/",
    "tuf_article_url": "https://takeuforward.org/data-structure/expression-add-operators"
  },
  {
    "id": "m-coloring-problem",
    "title": "M Coloring Problem",
    "difficulty": "Hard",
    "topic": "Recursion [PatternWise] > Trying out all Combos / Hard",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/m-coloring-problem/"
  }
]
```

---

### Gemini Output Requirement:
Please search Google and YouTube for each of the 25 problems above and output the strict JSON array now.
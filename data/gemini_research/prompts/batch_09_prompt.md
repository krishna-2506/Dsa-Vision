# Gemini Spark Research Prompt — Batch 9 of 20
## Topic Focus: Recursion [PatternWise]

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

### Input Data for Batch 9 (22 Problems):

```json
[
  {
    "id": "n-queen",
    "title": "N Queen",
    "difficulty": "Hard",
    "topic": "Recursion [PatternWise] > Trying out all Combos / Hard",
    "leetcode_url": "https://leetcode.com/problems/n-queens/",
    "tuf_article_url": "https://takeuforward.org/data-structure/n-queen-problem-return-all-distinct-solutions-to-the-n-queens-puzzle/"
  },
  {
    "id": "rat-in-a-maze",
    "title": "Rat in a Maze",
    "difficulty": "Hard",
    "topic": "Recursion [PatternWise] > Trying out all Combos / Hard",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/rat-in-a-maze/"
  },
  {
    "id": "sudoku-solver",
    "title": "Sudoku Solver",
    "difficulty": "Hard",
    "topic": "Recursion [PatternWise] > Trying out all Combos / Hard",
    "leetcode_url": "https://leetcode.com/problems/sudoku-solver/",
    "tuf_article_url": "https://takeuforward.org/data-structure/sudoku-solver/"
  },
  {
    "id": "word-search",
    "title": "Word Search",
    "difficulty": "Hard",
    "topic": "Recursion [PatternWise] > Trying out all Combos / Hard",
    "leetcode_url": "https://leetcode.com/problems/word-search/",
    "tuf_article_url": "https://takeuforward.org/data-structure/word-search-leetcode/"
  },
  {
    "id": "check-if-a-number-is-odd-or-not",
    "title": "Check if a Number is Odd or Not",
    "difficulty": "Easy",
    "topic": "Bit Manipulation [Concepts & Problems] > Learn Bit Manipulation",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/check-if-a-number-is-odd-or-not"
  },
  {
    "id": "check-if-a-number-is-power-of-2-or-not",
    "title": "Check if a Number is Power of 2 or Not",
    "difficulty": "Easy",
    "topic": "Bit Manipulation [Concepts & Problems] > Learn Bit Manipulation",
    "leetcode_url": "https://leetcode.com/problems/power-of-two/",
    "tuf_article_url": "https://takeuforward.org/data-structure/check-if-a-number-is-power-of-2-or-not"
  },
  {
    "id": "check-if-the-i-th-bit-is-set-or-not",
    "title": "Check if the i-th bit is Set or Not",
    "difficulty": "Easy",
    "topic": "Bit Manipulation [Concepts & Problems] > Learn Bit Manipulation",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/check-if-the-i-th-bit-is-set-or-not"
  },
  {
    "id": "count-the-number-of-set-bits",
    "title": "Count the Number of Set Bits",
    "difficulty": "Easy",
    "topic": "Bit Manipulation [Concepts & Problems] > Learn Bit Manipulation",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/count-the-number-of-set-bits"
  },
  {
    "id": "divide-two-numbers-without-multiplication-and-division",
    "title": "Divide two numbers without multiplication and division",
    "difficulty": "Medium",
    "topic": "Bit Manipulation [Concepts & Problems] > Learn Bit Manipulation",
    "leetcode_url": "https://leetcode.com/problems/divide-two-integers/",
    "tuf_article_url": "https://takeuforward.org/data-structure/divide-two-integers-without-using-multiplication-division-and-mod-operator"
  },
  {
    "id": "introduction-to-bits-and-tricks",
    "title": "Introduction to Bits and Tricks",
    "difficulty": "Easy",
    "topic": "Bit Manipulation [Concepts & Problems] > Learn Bit Manipulation",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/introduction-to-bit-manipulation-theory"
  },
  {
    "id": "set-unset-the-rightmost-unset-bit",
    "title": "Set/Unset the rightmost unset bit",
    "difficulty": "Easy",
    "topic": "Bit Manipulation [Concepts & Problems] > Learn Bit Manipulation",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/set-the-rightmost-bit"
  },
  {
    "id": "swap-two-numbers",
    "title": "Swap Two Numbers",
    "difficulty": "Easy",
    "topic": "Bit Manipulation [Concepts & Problems] > Learn Bit Manipulation",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/swap-two-numbers"
  },
  {
    "id": "minimum-bit-flips-to-convert-number",
    "title": "Minimum Bit Flips to Convert Number",
    "difficulty": "Medium",
    "topic": "Bit Manipulation [Concepts & Problems] > Interview Problems",
    "leetcode_url": "https://leetcode.com/problems/minimum-bit-flips-to-convert-number/",
    "tuf_article_url": "https://takeuforward.org/data-structure/count-number-of-bits-to-be-flipped-to-convert-a-to-b"
  },
  {
    "id": "power-set-bit-manipulation",
    "title": "Power Set Bit Manipulation",
    "difficulty": "Medium",
    "topic": "Bit Manipulation [Concepts & Problems] > Interview Problems",
    "leetcode_url": "https://leetcode.com/problems/subsets/",
    "tuf_article_url": "https://takeuforward.org/bit-manipulation/power-set-bit-manipulation"
  },
  {
    "id": "single-number-i",
    "title": "Single Number - I",
    "difficulty": "Medium",
    "topic": "Bit Manipulation [Concepts & Problems] > Interview Problems",
    "leetcode_url": "https://leetcode.com/problems/single-number/",
    "tuf_article_url": "https://takeuforward.org/arrays/find-the-number-that-appears-once-and-the-other-numbers-twice/"
  },
  {
    "id": "single-number-iii",
    "title": "Single Number - III",
    "difficulty": "Medium",
    "topic": "Bit Manipulation [Concepts & Problems] > Interview Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/find-the-two-numbers-appearing-odd-number-of-times"
  },
  {
    "id": "xor-of-numbers-in-a-given-range",
    "title": "XOR of numbers in a given range",
    "difficulty": "Medium",
    "topic": "Bit Manipulation [Concepts & Problems] > Interview Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/find-xor-of-numbers-from-l-to-r"
  },
  {
    "id": "count-primes-in-range-l-to-r",
    "title": "Count primes in range L to R",
    "difficulty": "Hard",
    "topic": "Bit Manipulation [Concepts & Problems] > Advanced Maths",
    "leetcode_url": "https://leetcode.com/problems/count-primes/",
    "tuf_article_url": "https://takeuforward.org/data-structure/sieve-of-eratosthenes"
  },
  {
    "id": "divisors-of-a-number",
    "title": "Divisors of a Number",
    "difficulty": "Easy",
    "topic": "Bit Manipulation [Concepts & Problems] > Advanced Maths",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/print-all-divisors-of-a-given-number/"
  },
  {
    "id": "pow-x-n-877",
    "title": "Pow(x,n)",
    "difficulty": "Medium",
    "topic": "Bit Manipulation [Concepts & Problems] > Advanced Maths",
    "leetcode_url": "https://leetcode.com/problems/powx-n/",
    "tuf_article_url": "https://takeuforward.org/data-structure/implement-powxn-x-raised-to-the-power-n/"
  },
  {
    "id": "prime-factorisation-of-a-number",
    "title": "Prime factorisation of a Number",
    "difficulty": "Hard",
    "topic": "Bit Manipulation [Concepts & Problems] > Advanced Maths",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/find-the-two-numbers-appearing-odd-number-of-times"
  },
  {
    "id": "print-prime-factors-of-a-number",
    "title": "Print Prime Factors of a Number",
    "difficulty": "Hard",
    "topic": "Bit Manipulation [Concepts & Problems] > Advanced Maths",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/find-the-two-numbers-appearing-odd-number-of-times"
  }
]
```

---

### Gemini Output Requirement:
Please search Google and YouTube for each of the 22 problems above and output the strict JSON array now.
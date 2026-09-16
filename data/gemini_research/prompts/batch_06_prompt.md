# Gemini Spark Research Prompt — Batch 6 of 20
## Topic Focus: Binary Search [1D, 2D Arrays, Search Space]

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

### Input Data for Batch 6 (21 Problems):

```json
[
  {
    "id": "painter-s-partition",
    "title": "Painter's Partition",
    "difficulty": "Medium",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on Answers",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/arrays/painters-partition-problem/"
  },
  {
    "id": "split-array-largest-sum",
    "title": "Split array - largest sum",
    "difficulty": "Hard",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on Answers",
    "leetcode_url": "https://leetcode.com/problems/split-array-largest-sum/",
    "tuf_article_url": "https://takeuforward.org/arrays/split-array-largest-sum/"
  },
  {
    "id": "find-peak-element-ii",
    "title": "Find Peak Element - II",
    "difficulty": "Medium",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on 2D Arrays",
    "leetcode_url": "https://leetcode.com/problems/find-a-peak-element-ii/",
    "tuf_article_url": "https://takeuforward.org/data-structure/find-peak-element-2d-matrix"
  },
  {
    "id": "find-row-with-maximum-1-s",
    "title": "Find row with maximum 1's",
    "difficulty": "Easy",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on 2D Arrays",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/arrays/find-the-row-with-maximum-number-of-1s/"
  },
  {
    "id": "matrix-median",
    "title": "Matrix Median",
    "difficulty": "Hard",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on 2D Arrays",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/median-of-row-wise-sorted-matrix/"
  },
  {
    "id": "search-in-2d-matrix-ii",
    "title": "Search in 2D matrix - II",
    "difficulty": "Hard",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on 2D Arrays",
    "leetcode_url": "https://leetcode.com/problems/search-a-2d-matrix-ii/",
    "tuf_article_url": "https://takeuforward.org/arrays/search-in-a-row-and-column-wise-sorted-matrix/"
  },
  {
    "id": "search-in-a-2d-matrix",
    "title": "Search in a 2D matrix",
    "difficulty": "Hard",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on 2D Arrays",
    "leetcode_url": "https://leetcode.com/problems/search-a-2d-matrix/",
    "tuf_article_url": "https://takeuforward.org/data-structure/search-in-a-sorted-2d-matrix/"
  },
  {
    "id": "check-if-two-strings-are-anagram-of-each-other",
    "title": "Check if two strings are anagram of each other",
    "difficulty": "Easy",
    "topic": "Strings [Basic and Medium] > Basic and Easy String Problems",
    "leetcode_url": "https://leetcode.com/problems/valid-anagram/#:~:text=Given%20two%20strings%20s%20and,the%20original%20letters%20exactly%20once.&text=Constraints%3A,.length%20%3C%3D%205%20*%2010",
    "tuf_article_url": "https://takeuforward.org/data-structure/check-if-two-strings-are-anagrams-of-each-other/"
  },
  {
    "id": "isomorphic-string",
    "title": "Isomorphic String",
    "difficulty": "Easy",
    "topic": "Strings [Basic and Medium] > Basic and Easy String Problems",
    "leetcode_url": "https://leetcode.com/problems/isomorphic-strings/",
    "tuf_article_url": "https://takeuforward.org/data-structure/isomorphic-string"
  },
  {
    "id": "largest-odd-number-in-a-string",
    "title": "Largest Odd Number in a String",
    "difficulty": "Easy",
    "topic": "Strings [Basic and Medium] > Basic and Easy String Problems",
    "leetcode_url": "https://leetcode.com/problems/largest-odd-number-in-string/",
    "tuf_article_url": "https://takeuforward.org/data-structure/largest-odd-number-in-a-string"
  },
  {
    "id": "longest-common-prefix",
    "title": "Longest Common Prefix",
    "difficulty": "Easy",
    "topic": "Strings [Basic and Medium] > Basic and Easy String Problems",
    "leetcode_url": "https://leetcode.com/problems/longest-common-prefix/",
    "tuf_article_url": "https://takeuforward.org/data-structure/longest-common-prefix"
  },
  {
    "id": "remove-outermost-parentheses",
    "title": "Remove Outermost Parentheses",
    "difficulty": "Medium",
    "topic": "Strings [Basic and Medium] > Basic and Easy String Problems",
    "leetcode_url": "https://leetcode.com/problems/remove-outermost-parentheses/",
    "tuf_article_url": "https://takeuforward.org/data-structure/remove-outermost-parentheses"
  },
  {
    "id": "reverse-words-in-a-given-string-palindrome-check",
    "title": "Reverse words in a given string / Palindrome Check",
    "difficulty": "Medium",
    "topic": "Strings [Basic and Medium] > Basic and Easy String Problems",
    "leetcode_url": "https://leetcode.com/problems/reverse-words-in-a-string/",
    "tuf_article_url": "https://takeuforward.org/data-structure/reverse-words-in-a-string/"
  },
  {
    "id": "rotate-string",
    "title": "Rotate String",
    "difficulty": "Easy",
    "topic": "Strings [Basic and Medium] > Basic and Easy String Problems",
    "leetcode_url": "https://leetcode.com/problems/rotate-string/",
    "tuf_article_url": "https://takeuforward.org/data-structure/check-if-one-string-is-rotation-of-another"
  },
  {
    "id": "count-number-of-substrings",
    "title": "Count Number of Substrings",
    "difficulty": "Easy",
    "topic": "Strings [Basic and Medium] > Medium String Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/count-number-of-substrings"
  },
  {
    "id": "maximum-nesting-depth-of-the-parentheses",
    "title": "Maximum Nesting Depth of the Parentheses",
    "difficulty": "Medium",
    "topic": "Strings [Basic and Medium] > Medium String Problems",
    "leetcode_url": "https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/",
    "tuf_article_url": "https://takeuforward.org/data-structure/maximum-nesting-depth-of-parenthesis"
  },
  {
    "id": "reverse-every-word-in-a-string",
    "title": "Reverse every word in a string",
    "difficulty": "Medium",
    "topic": "Strings [Basic and Medium] > Medium String Problems",
    "leetcode_url": "https://leetcode.com/problems/reverse-words-in-a-string/",
    "tuf_article_url": "https://takeuforward.org/data-structure/reverse-words-in-a-string/"
  },
  {
    "id": "roman-to-integer",
    "title": "Roman to Integer",
    "difficulty": "Medium",
    "topic": "Strings [Basic and Medium] > Medium String Problems",
    "leetcode_url": "https://leetcode.com/problems/roman-to-integer/",
    "tuf_article_url": "https://takeuforward.org/data-structure/roman-numerals-to-integer"
  },
  {
    "id": "sort-characters-by-frequency",
    "title": "Sort Characters by Frequency",
    "difficulty": "Easy",
    "topic": "Strings [Basic and Medium] > Medium String Problems",
    "leetcode_url": "https://leetcode.com/problems/sort-characters-by-frequency/",
    "tuf_article_url": "https://takeuforward.org/data-structure/sort-characters-by-frequency"
  },
  {
    "id": "string-to-integer-atoi",
    "title": "String to Integer (atoi)",
    "difficulty": "Medium",
    "topic": "Strings [Basic and Medium] > Medium String Problems",
    "leetcode_url": "https://leetcode.com/problems/string-to-integer-atoi/",
    "tuf_article_url": "https://takeuforward.org/data-structure/recursive-implementation-of-atoi"
  },
  {
    "id": "sum-of-beauty-of-all-substrings",
    "title": "Sum of Beauty of All Substrings",
    "difficulty": "Medium",
    "topic": "Strings [Basic and Medium] > Medium String Problems",
    "leetcode_url": "https://leetcode.com/problems/sum-of-beauty-of-all-substrings/",
    "tuf_article_url": "https://takeuforward.org/data-structure/sum-of-beauty-of-all-substring"
  }
]
```

---

### Gemini Output Requirement:
Please search Google and YouTube for each of the 21 problems above and output the strict JSON array now.
# Gemini Spark Research Prompt — Batch 1 of 20
## Topic Focus: Learn the basics

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

### Input Data for Batch 1 (25 Problems):

```json
[
  {
    "id": "cpp-basics",
    "title": "Cpp Basics",
    "difficulty": "Easy",
    "topic": "Learn the basics > Things to Know in C++/Java/Python or any language",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/what-are-arrays-strings"
  },
  {
    "id": "for-loops",
    "title": "For loops",
    "difficulty": "Easy",
    "topic": "Learn the basics > Things to Know in C++/Java/Python or any language",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/for-loop/understanding-for-loop/"
  },
  {
    "id": "functions-pass-by-reference-and-value",
    "title": "Functions (Pass by Reference and Value)",
    "difficulty": "Easy",
    "topic": "Learn the basics > Things to Know in C++/Java/Python or any language",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/functions-pass-by-reference-and-value"
  },
  {
    "id": "if-elseif",
    "title": "If ElseIf",
    "difficulty": "Easy",
    "topic": "Learn the basics > Things to Know in C++/Java/Python or any language",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/if-else/if-else-statements/"
  },
  {
    "id": "input-output",
    "title": "Input Output",
    "difficulty": "Easy",
    "topic": "Learn the basics > Things to Know in C++/Java/Python or any language",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/c/c-basic-input-output/"
  },
  {
    "id": "switch-case",
    "title": "Switch Case",
    "difficulty": "Easy",
    "topic": "Learn the basics > Things to Know in C++/Java/Python or any language",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/switch-case/switch-case-statements/"
  },
  {
    "id": "theory-with-examples",
    "title": "Theory with examples",
    "difficulty": "Easy",
    "topic": "Learn the basics > Things to Know in C++/Java/Python or any language",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/time-complexity/time-and-space-complexity-strivers-a2z-dsa-course/"
  },
  {
    "id": "two-sum",
    "title": "Two Sum",
    "difficulty": "Medium",
    "topic": "Learn the basics > Overview",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/two-sum-check-if-a-pair-with-given-sum-exists-in-array/"
  },
  {
    "id": "what-are-arrays-strings",
    "title": "What are arrays, strings?",
    "difficulty": "Easy",
    "topic": "Learn the basics > Things to Know in C++/Java/Python or any language",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/what-are-arrays-strings"
  },
  {
    "id": "while-loops",
    "title": "While loops",
    "difficulty": "Easy",
    "topic": "Learn the basics > Things to Know in C++/Java/Python or any language",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/while-loop/while-loops-in-programming/"
  },
  {
    "id": "easy-and-medium",
    "title": "Easy and Medium",
    "difficulty": "Easy",
    "topic": "Learn the basics > Build-up Logical Thinking",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "hard",
    "title": "Hard",
    "difficulty": "Easy",
    "topic": "Learn the basics > Build-up Logical Thinking",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "pattern-1",
    "title": "Pattern 1",
    "difficulty": "Easy",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "pattern-10",
    "title": "Pattern 10",
    "difficulty": "Easy",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "pattern-11",
    "title": "Pattern 11",
    "difficulty": "Easy",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "pattern-12",
    "title": "Pattern 12",
    "difficulty": "Easy",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "pattern-13",
    "title": "Pattern 13",
    "difficulty": "Easy",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "pattern-14",
    "title": "Pattern 14",
    "difficulty": "Easy",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "pattern-15",
    "title": "Pattern 15",
    "difficulty": "Easy",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "pattern-16",
    "title": "Pattern 16",
    "difficulty": "Easy",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "pattern-17",
    "title": "Pattern 17",
    "difficulty": "Easy",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "pattern-18",
    "title": "Pattern 18",
    "difficulty": "Easy",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "pattern-19",
    "title": "Pattern 19",
    "difficulty": "Easy",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "pattern-2",
    "title": "Pattern 2",
    "difficulty": "Easy",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "pattern-20",
    "title": "Pattern 20",
    "difficulty": "Medium",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  }
]
```

---

### Gemini Output Requirement:
Please search Google and YouTube for each of the 25 problems above and output the strict JSON array now.
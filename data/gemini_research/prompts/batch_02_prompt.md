# Gemini Spark Research Prompt — Batch 2 of 20
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

### Input Data for Batch 2 (25 Problems):

```json
[
  {
    "id": "pattern-21",
    "title": "Pattern 21",
    "difficulty": "Medium",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "pattern-22",
    "title": "Pattern 22",
    "difficulty": "Medium",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "pattern-3",
    "title": "Pattern 3",
    "difficulty": "Easy",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "pattern-4",
    "title": "Pattern 4",
    "difficulty": "Easy",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "pattern-5",
    "title": "Pattern 5",
    "difficulty": "Easy",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "pattern-6",
    "title": "Pattern 6",
    "difficulty": "Easy",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "pattern-7",
    "title": "Pattern 7",
    "difficulty": "Easy",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "pattern-8",
    "title": "Pattern 8",
    "difficulty": "Easy",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "pattern-9",
    "title": "Pattern 9",
    "difficulty": "Easy",
    "topic": "Learn the basics > Patterns",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/strivers-a2z-dsa-course/must-do-pattern-problems-before-starting-dsa/"
  },
  {
    "id": "java-collections",
    "title": "Java Collections",
    "difficulty": "Easy",
    "topic": "Learn the basics > Learn STL/Java-Collections or similar thing in your language",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/java-collections"
  },
  {
    "id": "stl",
    "title": "STL",
    "difficulty": "Easy",
    "topic": "Learn the basics > Learn STL/Java-Collections or similar thing in your language",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/c/c-stl-tutorial-most-frequent-used-stl-containers/"
  },
  {
    "id": "check-for-prime-number",
    "title": "Check for Prime Number",
    "difficulty": "Easy",
    "topic": "Learn the basics > Know Basic Maths",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/check-if-a-number-is-prime-or-not/"
  },
  {
    "id": "check-if-the-number-is-armstrong",
    "title": "Check if the Number is Armstrong",
    "difficulty": "Easy",
    "topic": "Learn the basics > Know Basic Maths",
    "leetcode_url": "https://leetcode.com/problems/armstrong-number/",
    "tuf_article_url": "https://takeuforward.org/maths/check-if-a-number-is-armstrong-number-or-not/"
  },
  {
    "id": "count-all-digits-of-a-number",
    "title": "Count all Digits of a Number",
    "difficulty": "Easy",
    "topic": "Learn the basics > Know Basic Maths",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/count-digits-in-a-number/"
  },
  {
    "id": "gcd-of-two-numbers",
    "title": "GCD of Two Numbers",
    "difficulty": "Easy",
    "topic": "Learn the basics > Know Basic Maths",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/find-gcd-of-two-numbers/"
  },
  {
    "id": "palindrome-number",
    "title": "Palindrome Number",
    "difficulty": "Easy",
    "topic": "Learn the basics > Know Basic Maths",
    "leetcode_url": "https://leetcode.com/problems/palindrome-number/",
    "tuf_article_url": "https://takeuforward.org/data-structure/check-if-a-number-is-palindrome-or-not/"
  },
  {
    "id": "print-all-divisors",
    "title": "Print all Divisors",
    "difficulty": "easy",
    "topic": "Learn the basics > Know Basic Maths",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/print-all-divisors-of-a-given-number/"
  },
  {
    "id": "reverse-a-number",
    "title": "Reverse a number",
    "difficulty": "Easy",
    "topic": "Learn the basics > Know Basic Maths",
    "leetcode_url": "https://leetcode.com/problems/reverse-integer/",
    "tuf_article_url": "https://takeuforward.org/maths/reverse-digits-of-a-number"
  },
  {
    "id": "check-if-string-is-palindrome-or-not",
    "title": "Check if String is Palindrome or Not",
    "difficulty": "Easy",
    "topic": "Learn the basics > Learn Basic Recursion",
    "leetcode_url": "https://leetcode.com/problems/valid-palindrome/",
    "tuf_article_url": "https://takeuforward.org/data-structure/check-if-the-given-string-is-palindrome-or-not/"
  },
  {
    "id": "factorial-of-a-given-number",
    "title": "Factorial of a given number",
    "difficulty": "Easy",
    "topic": "Learn the basics > Learn Basic Recursion",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/factorial-of-a-number-iterative-and-recursive"
  },
  {
    "id": "fibonacci-number",
    "title": "Fibonacci Number",
    "difficulty": "Easy",
    "topic": "Learn the basics > Learn Basic Recursion",
    "leetcode_url": "https://leetcode.com/problems/fibonacci-number/",
    "tuf_article_url": "https://takeuforward.org/arrays/print-fibonacci-series-up-to-nth-term/"
  },
  {
    "id": "print-1-to-n-using-recursion",
    "title": "Print 1 to N using Recursion",
    "difficulty": "Easy",
    "topic": "Learn the basics > Learn Basic Recursion",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/recursion/print-1-to-n-using-recursion/"
  },
  {
    "id": "print-n-to-1-using-recursion",
    "title": "Print N to 1 using Recursion",
    "difficulty": "Easy",
    "topic": "Learn the basics > Learn Basic Recursion",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/recursion/print-n-to-1-using-recursion/"
  },
  {
    "id": "print-name-n-times-using-recursion",
    "title": "Print name N times using recursion",
    "difficulty": "Easy",
    "topic": "Learn the basics > Learn Basic Recursion",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/recursion/print-name-n-times-using-recursion/"
  },
  {
    "id": "reverse-an-array",
    "title": "Reverse an array",
    "difficulty": "Easy",
    "topic": "Learn the basics > Learn Basic Recursion",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/reverse-a-given-array/"
  }
]
```

---

### Gemini Output Requirement:
Please search Google and YouTube for each of the 25 problems above and output the strict JSON array now.
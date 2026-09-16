# Gemini Spark Research Prompt — Batch 10 of 20
## Topic Focus: Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation]

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

### Input Data for Batch 10 (25 Problems):

```json
[
  {
    "id": "balanced-paranthesis",
    "title": "Balanced Paranthesis",
    "difficulty": "Easy",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Learning",
    "leetcode_url": "https://leetcode.com/problems/valid-parentheses/",
    "tuf_article_url": "https://takeuforward.org/data-structure/check-for-balanced-parentheses/"
  },
  {
    "id": "implement-min-stack",
    "title": "Implement Min Stack",
    "difficulty": "Hard",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Learning",
    "leetcode_url": "https://leetcode.com/problems/min-stack/",
    "tuf_article_url": "https://takeuforward.org/data-structure/implement-min-stack-o2n-and-on-space-complexity/"
  },
  {
    "id": "implement-queue-using-arrays",
    "title": "Implement Queue using Arrays",
    "difficulty": "Easy",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Learning",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/implement-queue-using-array/"
  },
  {
    "id": "implement-queue-using-linkedlist",
    "title": "Implement queue using Linkedlist",
    "difficulty": "Easy",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Learning",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/implement-queue-using-linked-list/"
  },
  {
    "id": "implement-queue-using-stack",
    "title": "Implement Queue using Stack",
    "difficulty": "Easy",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Learning",
    "leetcode_url": "https://leetcode.com/problems/implement-queue-using-stacks/",
    "tuf_article_url": "https://takeuforward.org/data-structure/implement-queue-using-stack/"
  },
  {
    "id": "implement-stack-using-arrays",
    "title": "Implement Stack using Arrays",
    "difficulty": "Easy",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Learning",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/implement-stack-using-array/"
  },
  {
    "id": "implement-stack-using-linkedlist",
    "title": "Implement stack using Linkedlist",
    "difficulty": "Easy",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Learning",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/implement-stack-using-linked-list/"
  },
  {
    "id": "implement-stack-using-queue",
    "title": "Implement Stack using Queue",
    "difficulty": "Easy",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Learning",
    "leetcode_url": "https://leetcode.com/problems/implement-stack-using-queues/",
    "tuf_article_url": "https://takeuforward.org/data-structure/implement-stack-using-single-queue"
  },
  {
    "id": "infix-to-postfix-conversion",
    "title": "Infix to Postfix Conversion",
    "difficulty": "Medium",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Prefix, Infix, PostFix Conversion Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/infix-to-postfix/"
  },
  {
    "id": "infix-to-prefix-conversion",
    "title": "Infix to Prefix Conversion",
    "difficulty": "Medium",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Prefix, Infix, PostFix Conversion Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/infix-to-prefix/"
  },
  {
    "id": "postfix-to-infix-conversion",
    "title": "Postfix to Infix Conversion",
    "difficulty": "Easy",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Prefix, Infix, PostFix Conversion Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/postfix-to-infix"
  },
  {
    "id": "postfix-to-prefix-conversion",
    "title": "Postfix to Prefix Conversion",
    "difficulty": "Medium",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Prefix, Infix, PostFix Conversion Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/postfix-to-prefix-conversion"
  },
  {
    "id": "prefix-to-infix-conversion",
    "title": "Prefix to Infix Conversion",
    "difficulty": "Medium",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Prefix, Infix, PostFix Conversion Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/prefix-to-infix-conversion"
  },
  {
    "id": "prefix-to-postfix-conversion",
    "title": "Prefix to Postfix Conversion",
    "difficulty": "Medium",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Prefix, Infix, PostFix Conversion Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/prefix-to-postfix-conversion"
  },
  {
    "id": "asteroid-collision",
    "title": "Asteroid Collision",
    "difficulty": "Medium",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Monotonic Stack/Queue Problems [VVV. Imp]",
    "leetcode_url": "https://leetcode.com/problems/asteroid-collision/",
    "tuf_article_url": "https://takeuforward.org/data-structure/asteroid-collision"
  },
  {
    "id": "largest-rectangle-in-a-histogram",
    "title": "Largest rectangle in a histogram",
    "difficulty": "Hard",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Monotonic Stack/Queue Problems [VVV. Imp]",
    "leetcode_url": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    "tuf_article_url": "https://takeuforward.org/data-structure/area-of-largest-rectangle-in-histogram/"
  },
  {
    "id": "maximum-rectangles",
    "title": "Maximum Rectangles",
    "difficulty": "Hard",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Monotonic Stack/Queue Problems [VVV. Imp]",
    "leetcode_url": "https://leetcode.com/problems/maximal-rectangle/",
    "tuf_article_url": "https://takeuforward.org/data-structure/maximum-rectangle-area-with-all-1s-dp-on-rectangles-dp-55/"
  },
  {
    "id": "next-greater-element",
    "title": "Next Greater Element",
    "difficulty": "Medium",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Monotonic Stack/Queue Problems [VVV. Imp]",
    "leetcode_url": "https://leetcode.com/problems/next-greater-element-i/",
    "tuf_article_url": "https://takeuforward.org/data-structure/next-greater-element-using-stack/"
  },
  {
    "id": "next-greater-element-2",
    "title": "Next Greater Element - 2",
    "difficulty": "Medium",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Monotonic Stack/Queue Problems [VVV. Imp]",
    "leetcode_url": "https://leetcode.com/problems/next-greater-element-ii/",
    "tuf_article_url": "https://takeuforward.org/data-structure/next-greater-element-2"
  },
  {
    "id": "next-smaller-element",
    "title": "Next Smaller Element",
    "difficulty": "Medium",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Monotonic Stack/Queue Problems [VVV. Imp]",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/next-smaller-element"
  },
  {
    "id": "number-of-greater-elements-to-the-right",
    "title": "Number of Greater Elements to the Right",
    "difficulty": "Easy",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Monotonic Stack/Queue Problems [VVV. Imp]",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/number-of-nges-to-the-right"
  },
  {
    "id": "remove-k-digits",
    "title": "Remove K Digits",
    "difficulty": "Medium",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Monotonic Stack/Queue Problems [VVV. Imp]",
    "leetcode_url": "https://leetcode.com/problems/remove-k-digits/",
    "tuf_article_url": "https://takeuforward.org/data-structure/remove-k-digits"
  },
  {
    "id": "sum-of-subarray-minimums",
    "title": "Sum of Subarray Minimums",
    "difficulty": "Medium",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Monotonic Stack/Queue Problems [VVV. Imp]",
    "leetcode_url": "https://leetcode.com/problems/sum-of-subarray-minimums/",
    "tuf_article_url": "https://takeuforward.org/data-structure/sum-of-subarray-minimums"
  },
  {
    "id": "sum-of-subarray-ranges",
    "title": "Sum of Subarray Ranges",
    "difficulty": "Medium",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Monotonic Stack/Queue Problems [VVV. Imp]",
    "leetcode_url": "https://leetcode.com/problems/sum-of-subarray-ranges/",
    "tuf_article_url": "https://takeuforward.org/data-structure/sum-of-subarray-ranges"
  },
  {
    "id": "trapping-rainwater",
    "title": "Trapping Rainwater",
    "difficulty": "Hard",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Monotonic Stack/Queue Problems [VVV. Imp]",
    "leetcode_url": "https://leetcode.com/problems/trapping-rain-water/",
    "tuf_article_url": "https://takeuforward.org/data-structure/trapping-rainwater/"
  }
]
```

---

### Gemini Output Requirement:
Please search Google and YouTube for each of the 25 problems above and output the strict JSON array now.
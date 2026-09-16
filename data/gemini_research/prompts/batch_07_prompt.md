# Gemini Spark Research Prompt — Batch 7 of 20
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

### Input Data for Batch 7 (25 Problems):

```json
[
  {
    "id": "deletion-of-the-head-of-ll",
    "title": "Deletion of the head of LL",
    "difficulty": "Easy",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Learn 1D LinkedList",
    "leetcode_url": "https://leetcode.com/problems/delete-node-in-a-linked-list/",
    "tuf_article_url": "https://takeuforward.org/data-structure/delete-last-node-of-linked-list/"
  },
  {
    "id": "find-the-length-of-the-linked-list",
    "title": "Find the length of the Linked List",
    "difficulty": "Easy",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Learn 1D LinkedList",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/linked-list/find-the-length-of-a-linked-list"
  },
  {
    "id": "insertion-at-the-head-of-linked-list",
    "title": "Insertion at the head of Linked List",
    "difficulty": "Easy",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Learn 1D LinkedList",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/linked-list/insert-at-the-head-of-a-linked-list"
  },
  {
    "id": "introduction-to-singly-linkedlist",
    "title": "Introduction to Singly LinkedList",
    "difficulty": "Easy",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Learn 1D LinkedList",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/linked-list/linked-list-introduction"
  },
  {
    "id": "search-in-linked-list",
    "title": "Search in Linked List",
    "difficulty": "Medium",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Learn 1D LinkedList",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/linked-list/search-an-element-in-a-linked-list"
  },
  {
    "id": "delete-head-of-doubly-linked-list",
    "title": "Delete head of Doubly Linked List",
    "difficulty": "Easy",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Learn Doubly LinkedList",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/delete-last-node-of-a-doubly-linked-list/"
  },
  {
    "id": "insert-node-before-head-in-doubly-linked-list",
    "title": "Insert node before head in Doubly Linked List",
    "difficulty": "Easy",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Learn Doubly LinkedList",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/insert-at-end-of-doubly-linked-list/"
  },
  {
    "id": "introduction-to-doubly-ll",
    "title": "Introduction to Doubly LL",
    "difficulty": "Easy",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Learn Doubly LinkedList",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/linked-list/introduction-to-doubly-linked-list"
  },
  {
    "id": "reverse-a-doubly-linked-list",
    "title": "Reverse a Doubly Linked List",
    "difficulty": "Medium",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Learn Doubly LinkedList",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/reverse-a-doubly-linked-list/"
  },
  {
    "id": "add-one-to-a-number-represented-by-ll",
    "title": "Add one to a number represented by LL",
    "difficulty": "Medium",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Medium Problems of LL",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/add-1-to-a-number-represented-by-ll"
  },
  {
    "id": "add-two-numbers-in-linked-list",
    "title": "Add two numbers in Linked List",
    "difficulty": "Medium",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Medium Problems of LL",
    "leetcode_url": "https://leetcode.com/problems/add-two-numbers/",
    "tuf_article_url": "https://takeuforward.org/data-structure/add-two-numbers-represented-as-linked-lists/"
  },
  {
    "id": "check-if-ll-is-palindrome-or-not",
    "title": "Check if LL is palindrome or not",
    "difficulty": "Medium",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Medium Problems of LL",
    "leetcode_url": "https://leetcode.com/problems/palindrome-linked-list/",
    "tuf_article_url": "https://takeuforward.org/data-structure/check-if-given-linked-list-is-plaindrome/"
  },
  {
    "id": "delete-the-middle-node-in-ll",
    "title": "Delete the middle node in LL",
    "difficulty": "Medium",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Medium Problems of LL",
    "leetcode_url": "https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/#:~:text=You%20are%20given%20the%20head,than%20or%20equal%20to%20x%20.",
    "tuf_article_url": "https://takeuforward.org/linked-list/delete-the-middle-node-of-the-linked-list"
  },
  {
    "id": "detect-a-loop-in-ll",
    "title": "Detect a loop in LL",
    "difficulty": "Medium",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Medium Problems of LL",
    "leetcode_url": "https://leetcode.com/problems/linked-list-cycle/",
    "tuf_article_url": "https://takeuforward.org/data-structure/detect-a-cycle-in-a-linked-list/"
  },
  {
    "id": "find-the-intersection-point-of-y-ll",
    "title": "Find the intersection point of Y LL",
    "difficulty": "Medium",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Medium Problems of LL",
    "leetcode_url": "https://leetcode.com/problems/intersection-of-two-linked-lists/",
    "tuf_article_url": "https://takeuforward.org/data-structure/find-intersection-of-two-linked-lists/"
  },
  {
    "id": "find-the-starting-point-in-ll",
    "title": "Find the starting point in LL",
    "difficulty": "Medium",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Medium Problems of LL",
    "leetcode_url": "https://leetcode.com/problems/linked-list-cycle-ii/",
    "tuf_article_url": "https://takeuforward.org/data-structure/starting-point-of-loop-in-a-linked-list/"
  },
  {
    "id": "length-of-loop-in-ll",
    "title": "Length of loop in LL",
    "difficulty": "Medium",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Medium Problems of LL",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/linked-list/length-of-loop-in-linked-list"
  },
  {
    "id": "middle-of-a-linkedlist-tortoisehare-method",
    "title": "Middle of a LinkedList [TortoiseHare Method]",
    "difficulty": "easy",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Medium Problems of LL",
    "leetcode_url": "https://leetcode.com/problems/middle-of-the-linked-list/",
    "tuf_article_url": "https://takeuforward.org/data-structure/find-middle-element-in-a-linked-list/"
  },
  {
    "id": "remove-nth-node-from-the-back-of-the-ll",
    "title": "Remove Nth node from the back of the LL",
    "difficulty": "Medium",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Medium Problems of LL",
    "leetcode_url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    "tuf_article_url": "https://takeuforward.org/data-structure/remove-n-th-node-from-the-end-of-a-linked-list/"
  },
  {
    "id": "reverse-a-linkedlist-iterative",
    "title": "Reverse a LinkedList [Iterative]",
    "difficulty": "Medium",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Medium Problems of LL",
    "leetcode_url": "https://leetcode.com/problems/reverse-linked-list/",
    "tuf_article_url": "https://takeuforward.org/data-structure/reverse-a-linked-list/"
  },
  {
    "id": "reverse-a-ll",
    "title": "Reverse a LL",
    "difficulty": "Medium",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Medium Problems of LL",
    "leetcode_url": "https://leetcode.com/problems/reverse-linked-list/",
    "tuf_article_url": "https://takeuforward.org/data-structure/reverse-a-linked-list/"
  },
  {
    "id": "segregate-odd-and-even-nodes-in-linked-list",
    "title": "Segregate odd and even nodes in Linked List",
    "difficulty": "Medium",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Medium Problems of LL",
    "leetcode_url": "https://leetcode.com/problems/odd-even-linked-list/",
    "tuf_article_url": "https://takeuforward.org/data-structure/segregate-even-and-odd-nodes-in-linkedlist"
  },
  {
    "id": "sort-a-linked-list-of-0-s-1-s-and-2-s",
    "title": "Sort a Linked List of 0's 1's and 2's",
    "difficulty": "Medium",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Medium Problems of LL",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/sort-a-linked-list-of-0s-1s-and-2s-by-changing-links"
  },
  {
    "id": "sort-ll",
    "title": "Sort LL",
    "difficulty": "Hard",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Medium Problems of LL",
    "leetcode_url": "https://leetcode.com/problems/sort-list/",
    "tuf_article_url": "https://takeuforward.org/linked-list/sort-a-linked-list"
  },
  {
    "id": "delete-all-occurrences-of-a-key-in-dll",
    "title": "Delete all occurrences of a key in DLL",
    "difficulty": "Hard",
    "topic": "Learn LinkedList [Single LL, Double LL, Medium, Hard Problems] > Medium Problems of DLL",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/delete-all-occurrences-of-a-key-in-dll"
  }
]
```

---

### Gemini Output Requirement:
Please search Google and YouTube for each of the 25 problems above and output the strict JSON array now.
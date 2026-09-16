# Gemini Spark Research Prompt — Batch 15 of 20
## Topic Focus: Binary Trees [Traversals, Medium and Hard Problems]

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

### Input Data for Batch 15 (20 Problems):

```json
[
  {
    "id": "construct-a-bt-from-preorder-and-inorder",
    "title": "Construct a BT from Preorder and Inorder",
    "difficulty": "Hard",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Hard Problems",
    "leetcode_url": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
    "tuf_article_url": "https://takeuforward.org/data-structure/construct-a-binary-tree-from-inorder-and-preorder-traversal/"
  },
  {
    "id": "construct-the-binary-tree-from-postorder-and-inorder-traversal",
    "title": "Construct the Binary Tree from Postorder and Inorder Traversal",
    "difficulty": "Hard",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Hard Problems",
    "leetcode_url": "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/",
    "tuf_article_url": "https://takeuforward.org/data-structure/construct-binary-tree-from-inorder-and-postorder-traversal/"
  },
  {
    "id": "count-total-nodes-in-a-complete-bt",
    "title": "Count total nodes in a complete BT",
    "difficulty": "Easy",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Hard Problems",
    "leetcode_url": "https://leetcode.com/problems/count-complete-tree-nodes/",
    "tuf_article_url": "https://takeuforward.org/binary-tree/count-number-of-nodes-in-a-binary-tree/"
  },
  {
    "id": "flatten-binary-tree-to-linked-list",
    "title": "Flatten Binary Tree to Linked List",
    "difficulty": "Medium",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Hard Problems",
    "leetcode_url": "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/",
    "tuf_article_url": "https://takeuforward.org/data-structure/flatten-binary-tree-to-linked-list/"
  },
  {
    "id": "lca-in-bt",
    "title": "LCA in BT",
    "difficulty": "Hard",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Hard Problems",
    "leetcode_url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    "tuf_article_url": "https://takeuforward.org/data-structure/lowest-common-ancestor-for-two-given-nodes/"
  },
  {
    "id": "maximum-width-of-bt",
    "title": "Maximum Width of BT",
    "difficulty": "Medium",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Hard Problems",
    "leetcode_url": "https://leetcode.com/problems/maximum-width-of-binary-tree/",
    "tuf_article_url": "https://takeuforward.org/data-structure/maximum-width-of-a-binary-tree/"
  },
  {
    "id": "minimum-time-taken-to-burn-the-bt-from-a-given-node",
    "title": "Minimum time taken to burn the BT from a given Node",
    "difficulty": "Hard",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Hard Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/minimum-time-taken-to-burn-the-binary-tree-from-a-node"
  },
  {
    "id": "morris-inorder-traversal-of-a-binary-tree",
    "title": "Morris Inorder Traversal of a Binary Tree",
    "difficulty": "Hard",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Hard Problems",
    "leetcode_url": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
    "tuf_article_url": "https://takeuforward.org/data-structure/morris-inorder-traversal-of-a-binary-tree/"
  },
  {
    "id": "morris-preorder-traversal-of-a-binary-tree",
    "title": "Morris Preorder Traversal of a Binary Tree",
    "difficulty": "Hard",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Hard Problems",
    "leetcode_url": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
    "tuf_article_url": "https://takeuforward.org/data-structure/morris-preorder-traversal-of-a-binary-tree/"
  },
  {
    "id": "print-all-nodes-at-a-distance-of-k-in-bt",
    "title": "Print all nodes at a distance of K in BT",
    "difficulty": "Hard",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Hard Problems",
    "leetcode_url": "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/",
    "tuf_article_url": "https://takeuforward.org/data-structure/print-all-the-nodes-at-a-distance-of-k-in-a-binary-tree"
  },
  {
    "id": "print-root-to-leaf-path-in-bt",
    "title": "Print root to leaf path in BT",
    "difficulty": "Medium",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Hard Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/print-root-to-node-path-in-a-binary-tree/"
  },
  {
    "id": "serialize-and-de-serialize-bt",
    "title": "Serialize and De-serialize BT",
    "difficulty": "Hard",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Hard Problems",
    "leetcode_url": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
    "tuf_article_url": "https://takeuforward.org/data-structure/serialize-and-deserialize-a-binary-tree/"
  },
  {
    "id": "find-min-max-in-bst",
    "title": "Find Min/Max in BST",
    "difficulty": "Easy",
    "topic": "Binary Search Trees [Concept and Problems] > Concepts",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/find-minmax-in-a-bst"
  },
  {
    "id": "introduction-to-bst",
    "title": "Introduction to BST",
    "difficulty": "Easy",
    "topic": "Binary Search Trees [Concept and Problems] > Concepts",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/binary-search-tree/introduction-to-binary-search-trees/"
  },
  {
    "id": "search-in-a-binary-search-tree",
    "title": "Search in a Binary Search Tree",
    "difficulty": "Easy",
    "topic": "Binary Search Trees [Concept and Problems] > Concepts",
    "leetcode_url": "https://leetcode.com/problems/search-in-a-binary-search-tree/",
    "tuf_article_url": "https://takeuforward.org/data-structure/search-in-a-binary-search-tree-2/"
  },
  {
    "id": "floor-in-a-binary-search-tree",
    "title": "Floor in a Binary Search Tree",
    "difficulty": "Easy",
    "topic": "Binary Search Trees [Concept and Problems] > Practice Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/binary-search-tree/floor-in-a-binary-search-tree/"
  },
  {
    "id": "inorder-successor-predecessor-in-bst",
    "title": "Inorder Successor/Predecessor in BST",
    "difficulty": "Medium",
    "topic": "Binary Search Trees [Concept and Problems] > Practice Problems",
    "leetcode_url": "https://leetcode.com/problems/inorder-successor-in-bst/",
    "tuf_article_url": "https://takeuforward.org/data-structure/inorder-successorpredecessor-in-bst"
  },
  {
    "id": "kth-smallest-and-largest-element-in-bst",
    "title": "Kth Smallest and Largest element in BST",
    "difficulty": "Medium",
    "topic": "Binary Search Trees [Concept and Problems] > Practice Problems",
    "leetcode_url": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
    "tuf_article_url": "https://takeuforward.org/data-structure/kth-largest-smallest-element-in-binary-search-tree/"
  },
  {
    "id": "merge-2-bst-s",
    "title": "Merge 2 BST's",
    "difficulty": "Hard",
    "topic": "Binary Search Trees [Concept and Problems] > Practice Problems",
    "leetcode_url": "https://leetcode.com/problems/binary-search-tree-iterator/",
    "tuf_article_url": "https://takeuforward.org/data-structure/bst-iterator"
  },
  {
    "id": "two-sum-in-bst-check-if-there-exists-a-pair-with-sum-k",
    "title": "Two Sum In BST | Check if there exists a pair with Sum K",
    "difficulty": "Hard",
    "topic": "Binary Search Trees [Concept and Problems] > Practice Problems",
    "leetcode_url": "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/",
    "tuf_article_url": "https://takeuforward.org/data-structure/two-sum-in-bst-check-if-there-exists-a-pair-with-sum-k"
  }
]
```

---

### Gemini Output Requirement:
Please search Google and YouTube for each of the 20 problems above and output the strict JSON array now.
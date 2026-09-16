# Gemini Spark Research Prompt — Batch 14 of 20
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

### Input Data for Batch 14 (25 Problems):

```json
[
  {
    "id": "binary-tree-representation-in-java",
    "title": "Binary Tree Representation in Java",
    "difficulty": "Easy",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Traversals",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/binary-tree/binary-tree-representation-in-java/"
  },
  {
    "id": "inorder-traversal-of-binary-tree",
    "title": "Inorder Traversal of Binary Tree",
    "difficulty": "Easy",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Traversals",
    "leetcode_url": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
    "tuf_article_url": "https://takeuforward.org/data-structure/inorder-traversal-of-binary-tree/"
  },
  {
    "id": "introduction-to-trees",
    "title": "Introduction to Trees",
    "difficulty": "Easy",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Traversals",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/binary-tree/introduction-to-trees/"
  },
  {
    "id": "iterative-inorder-traversal-of-binary-tree",
    "title": "Iterative Inorder Traversal of Binary Tree",
    "difficulty": "Easy",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Traversals",
    "leetcode_url": "https://leetcode.com/problems/binary-tree-inorder-traversal/",
    "tuf_article_url": "https://takeuforward.org/data-structure/inorder-traversal-of-binary-tree/"
  },
  {
    "id": "iterative-preorder-traversal-of-binary-tree",
    "title": "Iterative Preorder Traversal of Binary Tree",
    "difficulty": "Easy",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Traversals",
    "leetcode_url": "https://leetcode.com/problems/binary-tree-preorder-traversal/",
    "tuf_article_url": "https://takeuforward.org/data-structure/iterative-preorder-traversal-of-binary-tree"
  },
  {
    "id": "level-order-traversal",
    "title": "Level Order Traversal",
    "difficulty": "Easy",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Traversals",
    "leetcode_url": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    "tuf_article_url": "https://takeuforward.org/data-structure/level-order-traversal-of-a-binary-tree/"
  },
  {
    "id": "post-order-traversal-of-binary-tree-using-1-stack",
    "title": "Post-order Traversal of Binary Tree using 1 stack",
    "difficulty": "Easy",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Traversals",
    "leetcode_url": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
    "tuf_article_url": "https://takeuforward.org/data-structure/post-order-traversal-of-binary-tree/"
  },
  {
    "id": "post-order-traversal-of-binary-tree-using-2-stack",
    "title": "Post-order Traversal of Binary Tree using 2 stack",
    "difficulty": "Easy",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Traversals",
    "leetcode_url": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
    "tuf_article_url": "https://takeuforward.org/data-structure/iterative-postorder-traversal-of-binary-tree-using-2-stack"
  },
  {
    "id": "postorder-traversal",
    "title": "Postorder Traversal",
    "difficulty": "Easy",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Traversals",
    "leetcode_url": "https://leetcode.com/problems/binary-tree-postorder-traversal/",
    "tuf_article_url": "https://takeuforward.org/data-structure/iterative-postorder-traversal-of-binary-tree-using-2-stack"
  },
  {
    "id": "pre-post-inorder-in-one-traversal",
    "title": "Pre, Post, Inorder in one traversal",
    "difficulty": "Easy",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Traversals",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/preorder-inorder-postorder-traversals-in-one-traversal/"
  },
  {
    "id": "preorder-inorder-and-postorder-traversal-in-one-traversal",
    "title": "Preorder, Inorder, and Postorder Traversal in one Traversal",
    "difficulty": "Easy",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Traversals",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/preorder-inorder-postorder-traversals-in-one-traversal/"
  },
  {
    "id": "preorder-traversal",
    "title": "Preorder Traversal",
    "difficulty": "Easy",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Traversals",
    "leetcode_url": "https://leetcode.com/problems/binary-tree-preorder-traversal/",
    "tuf_article_url": "https://takeuforward.org/data-structure/preorder-traversal-of-binary-tree/"
  },
  {
    "id": "bottom-view-of-bt",
    "title": "Bottom view of BT",
    "difficulty": "Medium",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Medium Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/bottom-view-of-a-binary-tree/"
  },
  {
    "id": "boundary-traversal",
    "title": "Boundary Traversal",
    "difficulty": "Medium",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Medium Problems",
    "leetcode_url": "https://leetcode.com/problems/boundary-of-binary-tree/",
    "tuf_article_url": "https://takeuforward.org/data-structure/boundary-traversal-of-a-binary-tree/"
  },
  {
    "id": "check-for-balanced-binary-tree",
    "title": "Check for balanced binary tree",
    "difficulty": "Medium",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Medium Problems",
    "leetcode_url": "https://leetcode.com/problems/balanced-binary-tree/",
    "tuf_article_url": "https://takeuforward.org/data-structure/check-if-the-binary-tree-is-balanced-binary-tree/"
  },
  {
    "id": "check-if-two-trees-are-identical-or-not",
    "title": "Check if two trees are identical or not",
    "difficulty": "Medium",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Medium Problems",
    "leetcode_url": "https://leetcode.com/problems/same-tree/",
    "tuf_article_url": "https://takeuforward.org/data-structure/check-if-two-trees-are-identical/"
  },
  {
    "id": "diameter-of-binary-tree",
    "title": "Diameter of Binary Tree",
    "difficulty": "Easy",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Medium Problems",
    "leetcode_url": "https://leetcode.com/problems/diameter-of-binary-tree/",
    "tuf_article_url": "https://takeuforward.org/data-structure/calculate-the-diameter-of-a-binary-tree/"
  },
  {
    "id": "maximum-depth-in-bt",
    "title": "Maximum Depth in BT",
    "difficulty": "Medium",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Medium Problems",
    "leetcode_url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    "tuf_article_url": "https://takeuforward.org/data-structure/maximum-depth-of-a-binary-tree/"
  },
  {
    "id": "maximum-path-sum",
    "title": "Maximum path sum",
    "difficulty": "Medium",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Medium Problems",
    "leetcode_url": "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
    "tuf_article_url": "https://takeuforward.org/data-structure/maximum-sum-path-in-binary-tree/"
  },
  {
    "id": "right-left-view-of-binary-tree",
    "title": "Right/Left View of Binary Tree",
    "difficulty": "Medium",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Medium Problems",
    "leetcode_url": "https://leetcode.com/problems/binary-tree-right-side-view/",
    "tuf_article_url": "https://takeuforward.org/data-structure/right-left-view-of-binary-tree/"
  },
  {
    "id": "symmetric-binary-tree",
    "title": "Symmetric Binary Tree",
    "difficulty": "Medium",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Medium Problems",
    "leetcode_url": "https://leetcode.com/problems/symmetric-tree/",
    "tuf_article_url": "https://takeuforward.org/data-structure/check-for-symmetrical-binary-tree/"
  },
  {
    "id": "top-view-of-bt",
    "title": "Top View of BT",
    "difficulty": "Medium",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Medium Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/top-view-of-a-binary-tree/"
  },
  {
    "id": "vertical-order-traversal",
    "title": "Vertical Order Traversal",
    "difficulty": "Medium",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Medium Problems",
    "leetcode_url": "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
    "tuf_article_url": "https://takeuforward.org/data-structure/vertical-order-traversal-of-binary-tree/"
  },
  {
    "id": "zig-zag-or-spiral-traversal",
    "title": "Zig Zag or Spiral Traversal",
    "difficulty": "Medium",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Medium Problems",
    "leetcode_url": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
    "tuf_article_url": "https://takeuforward.org/data-structure/zig-zag-traversal-of-binary-tree/"
  },
  {
    "id": "children-sum-property-in-binary-tree",
    "title": "Children Sum Property in Binary Tree",
    "difficulty": "Medium",
    "topic": "Binary Trees [Traversals, Medium and Hard Problems] > Hard Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/check-for-children-sum-property-in-a-binary-tree/"
  }
]
```

---

### Gemini Output Requirement:
Please search Google and YouTube for each of the 25 problems above and output the strict JSON array now.
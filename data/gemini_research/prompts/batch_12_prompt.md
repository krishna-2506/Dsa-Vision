# Gemini Spark Research Prompt — Batch 12 of 20
## Topic Focus: Heaps [Learning, Medium, Hard Problems]

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

### Input Data for Batch 12 (15 Problems):

```json
[
  {
    "id": "check-if-an-array-represents-a-min-heap",
    "title": "Check if an array represents a min heap",
    "difficulty": "Medium",
    "topic": "Heaps [Learning, Medium, Hard Problems] > Learning",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/check-if-an-array-represents-a-min-heap"
  },
  {
    "id": "heaps-theory-video",
    "title": "Heaps (Theory Video)",
    "difficulty": "Easy",
    "topic": "Heaps [Learning, Medium, Hard Problems] > Learning",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/introduction-to-priority-queues-using-binary-heaps"
  },
  {
    "id": "hand-of-straights",
    "title": "Hand of Straights",
    "difficulty": "Medium",
    "topic": "Heaps [Learning, Medium, Hard Problems] > Medium Problems",
    "leetcode_url": "https://leetcode.com/problems/hand-of-straights/",
    "tuf_article_url": "https://takeuforward.org/data-structure/hands-of-straights"
  },
  {
    "id": "k-th-largest-element-in-an-array",
    "title": "K-th Largest element in an array",
    "difficulty": "Medium",
    "topic": "Heaps [Learning, Medium, Hard Problems] > Medium Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/kth-largest-smallest-element-in-an-array/"
  },
  {
    "id": "kth-smallest-element-in-an-array-use-priority-queue",
    "title": "Kth smallest element in an array [use priority queue]",
    "difficulty": "Medium",
    "topic": "Heaps [Learning, Medium, Hard Problems] > Medium Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/kth-largest-smallest-element-in-an-array/"
  },
  {
    "id": "merge-k-sorted-lists",
    "title": "Merge K sorted Lists",
    "difficulty": "Hard",
    "topic": "Heaps [Learning, Medium, Hard Problems] > Medium Problems",
    "leetcode_url": "https://leetcode.com/problems/merge-k-sorted-lists/",
    "tuf_article_url": "https://takeuforward.org/data-structure/merge-m-sorted-lists"
  },
  {
    "id": "replace-elements-by-their-rank",
    "title": "Replace Elements by Their Rank",
    "difficulty": "Easy",
    "topic": "Heaps [Learning, Medium, Hard Problems] > Medium Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/replace-elements-by-its-rank-in-the-array/"
  },
  {
    "id": "sort-k-sorted-array",
    "title": "Sort K sorted array",
    "difficulty": "Easy",
    "topic": "Heaps [Learning, Medium, Hard Problems] > Medium Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/sort-k-sorted-array"
  },
  {
    "id": "task-scheduler",
    "title": "Task Scheduler",
    "difficulty": "Medium",
    "topic": "Heaps [Learning, Medium, Hard Problems] > Medium Problems",
    "leetcode_url": "https://leetcode.com/problems/task-scheduler/",
    "tuf_article_url": "https://takeuforward.org/data-structure/task-scheduler"
  },
  {
    "id": "design-twitter",
    "title": "Design Twitter",
    "difficulty": "Medium",
    "topic": "Heaps [Learning, Medium, Hard Problems] > Hard Problems",
    "leetcode_url": "https://leetcode.com/problems/design-twitter/",
    "tuf_article_url": "https://takeuforward.org/data-structure/design-twitter"
  },
  {
    "id": "find-median-from-data-stream",
    "title": "Find Median from Data Stream",
    "difficulty": "Hard",
    "topic": "Heaps [Learning, Medium, Hard Problems] > Hard Problems",
    "leetcode_url": "https://leetcode.com/problems/find-median-from-data-stream/",
    "tuf_article_url": "https://takeuforward.org/data-structure/find-median-from-data-stream"
  },
  {
    "id": "kth-largest-element-in-a-stream-of-running-integers",
    "title": "Kth largest element in a stream of running integers",
    "difficulty": "Hard",
    "topic": "Heaps [Learning, Medium, Hard Problems] > Hard Problems",
    "leetcode_url": "https://leetcode.com/problems/kth-largest-element-in-a-stream/#:~:text=Implement%20KthLargest%20class%3A,largest%20element%20in%20the%20stream.",
    "tuf_article_url": "https://takeuforward.org/data-structure/kth-largest-element-in-a-stream-of-running-integers"
  },
  {
    "id": "maximum-sum-combination",
    "title": "Maximum Sum Combination",
    "difficulty": "Hard",
    "topic": "Heaps [Learning, Medium, Hard Problems] > Hard Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/maximum-sum-combination"
  },
  {
    "id": "minimum-cost-to-connect-sticks",
    "title": "Minimum Cost to Connect Sticks",
    "difficulty": "Medium",
    "topic": "Heaps [Learning, Medium, Hard Problems] > Hard Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/minimum-cost-to-connect-sticks"
  },
  {
    "id": "top-k-frequent-elements",
    "title": "Top K Frequent Elements",
    "difficulty": "Medium",
    "topic": "Heaps [Learning, Medium, Hard Problems] > Hard Problems",
    "leetcode_url": "https://leetcode.com/problems/top-k-frequent-elements/",
    "tuf_article_url": "https://takeuforward.org/data-structure/top-k-frequent-elements"
  }
]
```

---

### Gemini Output Requirement:
Please search Google and YouTube for each of the 15 problems above and output the strict JSON array now.
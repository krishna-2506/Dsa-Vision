# Gemini Spark Research Prompt — Batch 16 of 20
## Topic Focus: Graphs [Concepts & Problems]

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

### Input Data for Batch 16 (25 Problems):

```json
[
  {
    "id": "connected-components",
    "title": "Connected Components",
    "difficulty": "Medium",
    "topic": "Graphs [Concepts & Problems] > Learning",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/connected-components"
  },
  {
    "id": "dfs",
    "title": "DFS",
    "difficulty": "Medium",
    "topic": "Graphs [Concepts & Problems] > Learning",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/depth-first-search-dfs/"
  },
  {
    "id": "graph-representation-c",
    "title": "Graph Representation | C++",
    "difficulty": "Easy",
    "topic": "Graphs [Concepts & Problems] > Learning",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/graph/graph-representation-in-c/"
  },
  {
    "id": "graph-representation-java",
    "title": "Graph Representation | Java",
    "difficulty": "Easy",
    "topic": "Graphs [Concepts & Problems] > Learning",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/graph-representation-in-java"
  },
  {
    "id": "introduction-to-graph",
    "title": "Introduction to Graph",
    "difficulty": "Easy",
    "topic": "Graphs [Concepts & Problems] > Learning",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/graph-representation-in-java"
  },
  {
    "id": "traversal-techniques",
    "title": "Traversal Techniques",
    "difficulty": "Medium",
    "topic": "Graphs [Concepts & Problems] > Learning",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/depth-first-search-dfs/"
  },
  {
    "id": "bipartite-graph-dfs",
    "title": "Bipartite Graph (DFS)",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Problems on BFS/DFS",
    "leetcode_url": "https://leetcode.com/problems/is-graph-bipartite/",
    "tuf_article_url": "https://takeuforward.org/graph/bipartite-graph-dfs-implementation/"
  },
  {
    "id": "connected-components-problem-in-matrix",
    "title": "Connected Components Problem in Matrix",
    "difficulty": "Medium",
    "topic": "Graphs [Concepts & Problems] > Problems on BFS/DFS",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/connected-components"
  },
  {
    "id": "cycle-detection-in-directed-graph-dfs",
    "title": "Cycle Detection in Directed Graph (DFS)",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Problems on BFS/DFS",
    "leetcode_url": "https://leetcode.com/problems/course-schedule-ii/discuss/293048/detecting-cycle-in-directed-graph-problem",
    "tuf_article_url": "https://takeuforward.org/data-structure/detect-cycle-in-a-directed-graph-using-dfs-g-19/"
  },
  {
    "id": "cycle-detection-in-undirected-graph-bfs",
    "title": "Cycle Detection in Undirected Graph (bfs)",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Problems on BFS/DFS",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/detect-cycle-in-an-undirected-graph-using-bfs/"
  },
  {
    "id": "detect-a-cycle-in-an-undirected-graph",
    "title": "Detect a cycle in an undirected graph",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Problems on BFS/DFS",
    "leetcode_url": "https://leetcode.com/problems/course-schedule/",
    "tuf_article_url": "https://takeuforward.org/data-structure/detect-cycle-in-an-undirected-graph-using-dfs/"
  },
  {
    "id": "distance-of-nearest-cell-having-one",
    "title": "Distance of nearest cell having one",
    "difficulty": "Medium",
    "topic": "Graphs [Concepts & Problems] > Problems on BFS/DFS",
    "leetcode_url": "https://leetcode.com/problems/01-matrix/",
    "tuf_article_url": "https://takeuforward.org/graph/distance-of-nearest-cell-having-1/"
  },
  {
    "id": "number-of-enclaves",
    "title": "Number of enclaves",
    "difficulty": "Medium",
    "topic": "Graphs [Concepts & Problems] > Problems on BFS/DFS",
    "leetcode_url": "https://leetcode.com/problems/number-of-enclaves/",
    "tuf_article_url": "https://takeuforward.org/graph/number-of-enclaves/"
  },
  {
    "id": "number-of-islands",
    "title": "Number of islands",
    "difficulty": "Medium",
    "topic": "Graphs [Concepts & Problems] > Problems on BFS/DFS",
    "leetcode_url": "https://leetcode.com/problems/number-of-islands/",
    "tuf_article_url": "https://takeuforward.org/data-structure/number-of-distinct-islands/"
  },
  {
    "id": "number-of-provinces",
    "title": "Number of provinces",
    "difficulty": "Medium",
    "topic": "Graphs [Concepts & Problems] > Problems on BFS/DFS",
    "leetcode_url": "https://leetcode.com/problems/number-of-provinces/#:~:text=A%20province%20is%20a%20group,the%20total%20number%20of%20provinces.",
    "tuf_article_url": "https://takeuforward.org/data-structure/number-of-provinces/"
  },
  {
    "id": "rotten-oranges",
    "title": "Rotten Oranges",
    "difficulty": "Medium",
    "topic": "Graphs [Concepts & Problems] > Problems on BFS/DFS",
    "leetcode_url": "https://leetcode.com/problems/rotting-oranges/",
    "tuf_article_url": "https://takeuforward.org/data-structure/rotten-oranges-min-time-to-rot-all-oranges-bfs/"
  },
  {
    "id": "surrounded-regions",
    "title": "Surrounded Regions",
    "difficulty": "Medium",
    "topic": "Graphs [Concepts & Problems] > Problems on BFS/DFS",
    "leetcode_url": "https://leetcode.com/problems/surrounded-regions/",
    "tuf_article_url": "https://takeuforward.org/graph/surrounded-regions-replace-os-with-xs/"
  },
  {
    "id": "word-ladder-i",
    "title": "Word ladder I",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Problems on BFS/DFS",
    "leetcode_url": "https://leetcode.com/problems/word-ladder/",
    "tuf_article_url": "https://takeuforward.org/graph/word-ladder-i-g-29/"
  },
  {
    "id": "word-ladder-ii",
    "title": "Word ladder II",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Problems on BFS/DFS",
    "leetcode_url": "https://leetcode.com/problems/word-ladder-ii/",
    "tuf_article_url": "https://takeuforward.org/graph/g-30-word-ladder-ii/"
  },
  {
    "id": "alien-dictionary",
    "title": "Alien Dictionary",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Topo Sort and Problems",
    "leetcode_url": "https://leetcode.com/problems/alien-dictionary/solution/",
    "tuf_article_url": "https://takeuforward.org/data-structure/alien-dictionary-topological-sort-g-26/"
  },
  {
    "id": "course-schedule-i",
    "title": "Course Schedule I",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Topo Sort and Problems",
    "leetcode_url": "https://leetcode.com/problems/course-schedule/",
    "tuf_article_url": "https://takeuforward.org/data-structure/course-schedule-i-and-ii-pre-requisite-tasks-topological-sort-g-24/"
  },
  {
    "id": "course-schedule-ii",
    "title": "Course Schedule II",
    "difficulty": "Medium",
    "topic": "Graphs [Concepts & Problems] > Topo Sort and Problems",
    "leetcode_url": "https://leetcode.com/problems/course-schedule-ii/",
    "tuf_article_url": "https://takeuforward.org/data-structure/course-schedule-i-and-ii-pre-requisite-tasks-topological-sort-g-24/"
  },
  {
    "id": "detect-a-cycle-in-a-directed-graph",
    "title": "Detect a cycle in a directed graph",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Topo Sort and Problems",
    "leetcode_url": "https://leetcode.com/problems/course-schedule/",
    "tuf_article_url": "https://takeuforward.org/data-structure/detect-a-cycle-in-directed-graph-topological-sort-kahns-algorithm-g-23/"
  },
  {
    "id": "find-eventual-safe-states",
    "title": "Find eventual safe states",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Topo Sort and Problems",
    "leetcode_url": "https://leetcode.com/problems/find-eventual-safe-states/",
    "tuf_article_url": "https://takeuforward.org/data-structure/find-eventual-safe-states-bfs-topological-sort-g-25/"
  },
  {
    "id": "topo-sort",
    "title": "Topo Sort",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Topo Sort and Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/topological-sort-algorithm-dfs-g-21/"
  }
]
```

---

### Gemini Output Requirement:
Please search Google and YouTube for each of the 25 problems above and output the strict JSON array now.
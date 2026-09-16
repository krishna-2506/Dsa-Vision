# Gemini Spark Research Prompt — Batch 17 of 20
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

### Input Data for Batch 17 (25 Problems):

```json
[
  {
    "id": "topological-sort-or-kahn-s-algorithm",
    "title": "Topological sort or Kahn's algorithm",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Topo Sort and Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/topological-sort-algorithm-dfs-g-21/"
  },
  {
    "id": "bellman-ford-algorithm",
    "title": "Bellman Ford Algorithm",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Shortest Path Algorithms and Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/bellman-ford-algorithm-g-41/"
  },
  {
    "id": "cheapest-flight-within-k-stops",
    "title": "Cheapest flight within K stops",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Shortest Path Algorithms and Problems",
    "leetcode_url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
    "tuf_article_url": "https://takeuforward.org/data-structure/g-38-cheapest-flights-within-k-stops/"
  },
  {
    "id": "djisktra-s-algorithm",
    "title": "Djisktra's Algorithm",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Shortest Path Algorithms and Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/dijkstras-algorithm-using-set-g-33/"
  },
  {
    "id": "find-the-city-with-the-smallest-number-of-neighbors",
    "title": "Find the city with the smallest number of neighbors",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Shortest Path Algorithms and Problems",
    "leetcode_url": "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/",
    "tuf_article_url": "https://takeuforward.org/data-structure/find-the-city-with-the-smallest-number-of-neighbours-at-a-threshold-distance-g-43/"
  },
  {
    "id": "floyd-warshall-algorithm",
    "title": "Floyd warshall algorithm",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Shortest Path Algorithms and Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/floyd-warshall-algorithm-g-42/"
  },
  {
    "id": "minimum-multiplications-to-reach-end",
    "title": "Minimum multiplications to reach end",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Shortest Path Algorithms and Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/graph/g-39-minimum-multiplications-to-reach-end/"
  },
  {
    "id": "network-delay-time",
    "title": "Network Delay Time",
    "difficulty": "Medium",
    "topic": "Graphs [Concepts & Problems] > Shortest Path Algorithms and Problems",
    "leetcode_url": "https://leetcode.com/problems/network-delay-time/",
    "tuf_article_url": "https://takeuforward.org/data-structure/network-delay-time"
  },
  {
    "id": "number-of-ways-to-arrive-at-destination",
    "title": "Number of ways to arrive at destination",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Shortest Path Algorithms and Problems",
    "leetcode_url": "https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/",
    "tuf_article_url": "https://takeuforward.org/data-structure/g-40-number-of-ways-to-arrive-at-destination/"
  },
  {
    "id": "path-with-minimum-effort",
    "title": "Path with minimum effort",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Shortest Path Algorithms and Problems",
    "leetcode_url": "https://leetcode.com/problems/path-with-minimum-effort/",
    "tuf_article_url": "https://takeuforward.org/data-structure/g-37-path-with-minimum-effort/"
  },
  {
    "id": "shortest-distance-in-a-binary-maze",
    "title": "Shortest Distance in a Binary Maze",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Shortest Path Algorithms and Problems",
    "leetcode_url": "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
    "tuf_article_url": "https://takeuforward.org/data-structure/g-36-shortest-distance-in-a-binary-maze/"
  },
  {
    "id": "shortest-path-in-dag",
    "title": "Shortest path in DAG",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Shortest Path Algorithms and Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/shortest-path-in-directed-acyclic-graph-topological-sort-g-27/"
  },
  {
    "id": "shortest-path-in-undirected-graph-with-unit-weights",
    "title": "Shortest path in undirected graph with unit weights",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Shortest Path Algorithms and Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/shortest-path-in-undirected-graph-with-unit-distance-g-28/"
  },
  {
    "id": "why-priority-queue-is-used-in-djisktra-s-algorithm",
    "title": "Why priority Queue is used in Djisktra's Algorithm",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Shortest Path Algorithms and Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/dijkstras-algorithm-using-priority-queue-g-32/"
  },
  {
    "id": "accounts-merge",
    "title": "Accounts merge",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > MinimumSpanningTree/Disjoint Set and Problems",
    "leetcode_url": "https://leetcode.com/problems/accounts-merge/",
    "tuf_article_url": "https://takeuforward.org/data-structure/accounts-merge-dsu-g-50/"
  },
  {
    "id": "disjoint-set",
    "title": "Disjoint Set",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > MinimumSpanningTree/Disjoint Set and Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/disjoint-set-union-by-rank-union-by-size-path-compression-g-46/"
  },
  {
    "id": "find-the-mst-weight",
    "title": "Find the MST weight",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > MinimumSpanningTree/Disjoint Set and Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/prims-algorithm-minimum-spanning-tree-c-and-java-g-45/"
  },
  {
    "id": "making-a-large-island",
    "title": "Making a large island",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > MinimumSpanningTree/Disjoint Set and Problems",
    "leetcode_url": "https://leetcode.com/problems/making-a-large-island/",
    "tuf_article_url": "https://takeuforward.org/data-structure/making-a-large-island-dsu-g-52/"
  },
  {
    "id": "most-stones-removed-with-same-row-or-column",
    "title": "Most stones removed with same row or column",
    "difficulty": "Medium",
    "topic": "Graphs [Concepts & Problems] > MinimumSpanningTree/Disjoint Set and Problems",
    "leetcode_url": "https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/",
    "tuf_article_url": "https://takeuforward.org/data-structure/most-stones-removed-with-same-row-or-column-dsu-g-53/"
  },
  {
    "id": "mst-theory",
    "title": "MST theory",
    "difficulty": "Easy",
    "topic": "Graphs [Concepts & Problems] > MinimumSpanningTree/Disjoint Set and Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/minimum-spanning-tree-theory-g-44/"
  },
  {
    "id": "number-of-islands-ii",
    "title": "Number of islands II",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > MinimumSpanningTree/Disjoint Set and Problems",
    "leetcode_url": "https://leetcode.com/problems/number-of-islands-ii/",
    "tuf_article_url": "https://takeuforward.org/graph/number-of-islands-ii-online-queries-dsu-g-51/"
  },
  {
    "id": "number-of-operations-to-make-network-connected",
    "title": "Number of operations to make network connected",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > MinimumSpanningTree/Disjoint Set and Problems",
    "leetcode_url": "https://leetcode.com/problems/number-of-operations-to-make-network-connected/",
    "tuf_article_url": "https://takeuforward.org/data-structure/number-of-operations-to-make-network-connected-dsu-g-49/"
  },
  {
    "id": "prim-s-algorithm",
    "title": "Prim's Algorithm",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > MinimumSpanningTree/Disjoint Set and Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/prims-algorithm-minimum-spanning-tree-c-and-java-g-45/"
  },
  {
    "id": "swim-in-rising-water",
    "title": "Swim in Rising Water",
    "difficulty": "Medium",
    "topic": "Graphs [Concepts & Problems] > MinimumSpanningTree/Disjoint Set and Problems",
    "leetcode_url": "https://leetcode.com/problems/swim-in-rising-water/",
    "tuf_article_url": "https://takeuforward.org/data-structure/swim-in-rising-water"
  },
  {
    "id": "articulation-point-in-graph",
    "title": "Articulation point in graph",
    "difficulty": "Hard",
    "topic": "Graphs [Concepts & Problems] > Other Algorithms",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/articulation-point-in-graph-g-56/"
  }
]
```

---

### Gemini Output Requirement:
Please search Google and YouTube for each of the 25 problems above and output the strict JSON array now.
# Gemini Spark Research Prompt — Batch 5 of 20
## Topic Focus: Solve Problems on Arrays [Easy -> Medium -> Hard]

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

### Input Data for Batch 5 (25 Problems):

```json
[
  {
    "id": "reverse-pairs",
    "title": "Reverse Pairs",
    "difficulty": "Hard",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Hard",
    "leetcode_url": "https://leetcode.com/problems/reverse-pairs/",
    "tuf_article_url": "https://takeuforward.org/data-structure/count-reverse-pairs/"
  },
  {
    "id": "count-occurrences-in-a-sorted-array",
    "title": "Count Occurrences in a Sorted Array",
    "difficulty": "Easy",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on 1D Arrays",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/count-occurrences-in-sorted-array/"
  },
  {
    "id": "find-minimum-in-rotated-sorted-array",
    "title": "Find minimum in Rotated Sorted Array",
    "difficulty": "Easy",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on 1D Arrays",
    "leetcode_url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    "tuf_article_url": "https://takeuforward.org/data-structure/minimum-in-rotated-sorted-array/"
  },
  {
    "id": "find-out-how-many-times-the-array-is-rotated",
    "title": "Find out how many times the array is rotated",
    "difficulty": "Easy",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on 1D Arrays",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/arrays/find-out-how-many-times-the-array-has-been-rotated/"
  },
  {
    "id": "find-peak-element",
    "title": "Find peak element",
    "difficulty": "Medium",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on 1D Arrays",
    "leetcode_url": "https://leetcode.com/problems/find-peak-element/#:~:text=Find%20Peak%20Element%20%2D%20LeetCode&text=A%20peak%20element%20is%20an,to%20any%20of%20the%20peaks.",
    "tuf_article_url": "https://takeuforward.org/data-structure/peak-element-in-array/"
  },
  {
    "id": "first-and-last-occurrence",
    "title": "First and last occurrence",
    "difficulty": "Easy",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on 1D Arrays",
    "leetcode_url": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
    "tuf_article_url": "https://takeuforward.org/data-structure/last-occurrence-in-a-sorted-array/"
  },
  {
    "id": "floor-and-ceil-in-sorted-array",
    "title": "Floor and Ceil in Sorted Array",
    "difficulty": "Easy",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on 1D Arrays",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/arrays/floor-and-ceil-in-sorted-array/"
  },
  {
    "id": "lower-bound",
    "title": "Lower Bound",
    "difficulty": "Easy",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on 1D Arrays",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/arrays/implement-lower-bound-bs-2/"
  },
  {
    "id": "search-in-rotated-sorted-array-i",
    "title": "Search in rotated sorted array-I",
    "difficulty": "Medium",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on 1D Arrays",
    "leetcode_url": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    "tuf_article_url": "https://takeuforward.org/data-structure/search-element-in-a-rotated-sorted-array/"
  },
  {
    "id": "search-in-rotated-sorted-array-ii",
    "title": "Search in rotated sorted array-II",
    "difficulty": "Medium",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on 1D Arrays",
    "leetcode_url": "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/",
    "tuf_article_url": "https://takeuforward.org/arrays/search-element-in-rotated-sorted-array-ii"
  },
  {
    "id": "search-insert-position",
    "title": "Search insert position",
    "difficulty": "Easy",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on 1D Arrays",
    "leetcode_url": "https://leetcode.com/problems/search-insert-position/#:~:text=Search%20Insert%20Position%20%2D%20LeetCode&text=Given%20a%20sorted%20array%20of,(log%20n)%20runtime%20complexity.",
    "tuf_article_url": "https://takeuforward.org/arrays/search-insert-position/"
  },
  {
    "id": "search-x-in-sorted-array",
    "title": "Search X in sorted array",
    "difficulty": "Easy",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on 1D Arrays",
    "leetcode_url": "https://leetcode.com/problems/binary-search/",
    "tuf_article_url": "https://takeuforward.org/data-structure/binary-search-explained/"
  },
  {
    "id": "single-element-in-a-sorted-array",
    "title": "Single element in a Sorted Array",
    "difficulty": "Medium",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on 1D Arrays",
    "leetcode_url": "https://leetcode.com/problems/single-element-in-a-sorted-array/",
    "tuf_article_url": "https://takeuforward.org/data-structure/search-single-element-in-a-sorted-array/"
  },
  {
    "id": "upper-bound",
    "title": "Upper Bound",
    "difficulty": "Easy",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on 1D Arrays",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/arrays/implement-upper-bound/"
  },
  {
    "id": "aggressive-cows",
    "title": "Aggressive Cows",
    "difficulty": "Hard",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on Answers",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/aggressive-cows-detailed-solution/"
  },
  {
    "id": "book-allocation-problem",
    "title": "Book Allocation Problem",
    "difficulty": "Hard",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on Answers",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/allocate-minimum-number-of-pages/"
  },
  {
    "id": "capacity-to-ship-packages-within-d-days",
    "title": "Capacity to Ship Packages Within D Days",
    "difficulty": "Medium",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on Answers",
    "leetcode_url": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
    "tuf_article_url": "https://takeuforward.org/arrays/capacity-to-ship-packages-within-d-days/"
  },
  {
    "id": "find-nth-root-of-a-number",
    "title": "Find Nth root of a number",
    "difficulty": "Medium",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on Answers",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/nth-root-of-a-number-using-binary-search/"
  },
  {
    "id": "find-square-root-of-a-number",
    "title": "Find square root of a number",
    "difficulty": "Medium",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on Answers",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/binary-search/finding-sqrt-of-a-number-using-binary-search/"
  },
  {
    "id": "find-the-smallest-divisor",
    "title": "Find the smallest divisor",
    "difficulty": "Medium",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on Answers",
    "leetcode_url": "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/",
    "tuf_article_url": "https://takeuforward.org/arrays/find-the-smallest-divisor-given-a-threshold/"
  },
  {
    "id": "koko-eating-bananas",
    "title": "Koko eating bananas",
    "difficulty": "Medium",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on Answers",
    "leetcode_url": "https://leetcode.com/problems/koko-eating-bananas/",
    "tuf_article_url": "https://takeuforward.org/binary-search/koko-eating-bananas/"
  },
  {
    "id": "kth-element-of-2-sorted-arrays",
    "title": "Kth element of 2 sorted arrays",
    "difficulty": "Medium",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on Answers",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/k-th-element-of-two-sorted-arrays/"
  },
  {
    "id": "kth-missing-positive-number",
    "title": "Kth Missing Positive Number",
    "difficulty": "Medium",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on Answers",
    "leetcode_url": "https://leetcode.com/problems/kth-missing-positive-number/#:~:text=Given%20an%20array%20arr%20of,13%2C...%5D.",
    "tuf_article_url": "https://takeuforward.org/arrays/kth-missing-positive-number/"
  },
  {
    "id": "minimize-max-distance-to-gas-station",
    "title": "Minimize Max Distance to Gas Station",
    "difficulty": "Hard",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on Answers",
    "leetcode_url": "https://leetcode.com/problems/minimize-max-distance-to-gas-station/",
    "tuf_article_url": "https://takeuforward.org/arrays/minimise-maximum-distance-between-gas-stations/"
  },
  {
    "id": "minimum-days-to-make-m-bouquets",
    "title": "Minimum days to make M bouquets",
    "difficulty": "Medium",
    "topic": "Binary Search [1D, 2D Arrays, Search Space] > BS on Answers",
    "leetcode_url": "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
    "tuf_article_url": "https://takeuforward.org/arrays/minimum-days-to-make-m-bouquets/"
  }
]
```

---

### Gemini Output Requirement:
Please search Google and YouTube for each of the 25 problems above and output the strict JSON array now.
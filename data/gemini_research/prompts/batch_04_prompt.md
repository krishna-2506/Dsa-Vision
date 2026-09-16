# Gemini Spark Research Prompt — Batch 4 of 20
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

### Input Data for Batch 4 (25 Problems):

```json
[
  {
    "id": "union-of-two-sorted-arrays",
    "title": "Union of two sorted arrays",
    "difficulty": "Easy",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Easy",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/union-of-two-sorted-arrays/"
  },
  {
    "id": "count-subarrays-with-given-sum",
    "title": "Count subarrays with given sum",
    "difficulty": "Medium",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Medium",
    "leetcode_url": "https://leetcode.com/problems/subarray-sum-equals-k/",
    "tuf_article_url": "https://takeuforward.org/arrays/count-subarray-sum-equals-k/"
  },
  {
    "id": "kadane-s-algorithm",
    "title": "Kadane's Algorithm",
    "difficulty": "Medium",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Medium",
    "leetcode_url": "https://leetcode.com/problems/maximum-subarray/",
    "tuf_article_url": "https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array/"
  },
  {
    "id": "leaders-in-an-array",
    "title": "Leaders in an Array",
    "difficulty": "Medium",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Medium",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/leaders-in-an-array/"
  },
  {
    "id": "longest-consecutive-sequence-in-an-array",
    "title": "Longest Consecutive Sequence in an Array",
    "difficulty": "Medium",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Medium",
    "leetcode_url": "https://leetcode.com/problems/longest-consecutive-sequence/solution/",
    "tuf_article_url": "https://takeuforward.org/data-structure/longest-consecutive-sequence-in-an-array/"
  },
  {
    "id": "majority-element-i",
    "title": "Majority Element-I",
    "difficulty": "Easy",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Medium",
    "leetcode_url": "https://leetcode.com/problems/majority-element/",
    "tuf_article_url": "https://takeuforward.org/data-structure/find-the-majority-element-that-occurs-more-than-n-2-times/"
  },
  {
    "id": "next-permutation",
    "title": "Next Permutation",
    "difficulty": "Medium",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Medium",
    "leetcode_url": "https://leetcode.com/problems/next-permutation/",
    "tuf_article_url": "https://takeuforward.org/data-structure/next_permutation-find-next-lexicographically-greater-permutation/"
  },
  {
    "id": "print-subarray-with-maximum-subarray-sum-extended-version-of-above-problem",
    "title": "Print subarray with maximum subarray sum (extended version of above problem)",
    "difficulty": "Medium",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Medium",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array/"
  },
  {
    "id": "print-the-matrix-in-spiral-manner",
    "title": "Print the matrix in spiral manner",
    "difficulty": "Medium",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Medium",
    "leetcode_url": "https://leetcode.com/problems/spiral-matrix/",
    "tuf_article_url": "https://takeuforward.org/data-structure/spiral-traversal-of-matrix/"
  },
  {
    "id": "rearrange-array-elements-by-sign",
    "title": "Rearrange array elements by sign",
    "difficulty": "Medium",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Medium",
    "leetcode_url": "https://leetcode.com/problems/rearrange-array-elements-by-sign/",
    "tuf_article_url": "https://takeuforward.org/arrays/rearrange-array-elements-by-sign/"
  },
  {
    "id": "rotate-matrix-by-90-degrees",
    "title": "Rotate matrix by 90 degrees",
    "difficulty": "Medium",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Medium",
    "leetcode_url": "https://leetcode.com/problems/rotate-image/",
    "tuf_article_url": "https://takeuforward.org/data-structure/rotate-image-by-90-degree/"
  },
  {
    "id": "set-matrix-zeroes",
    "title": "Set Matrix Zeroes",
    "difficulty": "Medium",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Medium",
    "leetcode_url": "https://leetcode.com/problems/set-matrix-zeroes/",
    "tuf_article_url": "https://takeuforward.org/data-structure/set-matrix-zero/"
  },
  {
    "id": "sort-an-array-of-0-s-1-s-and-2-s",
    "title": "Sort an array of 0's 1's and 2's",
    "difficulty": "Medium",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Medium",
    "leetcode_url": "https://leetcode.com/problems/sort-colors/",
    "tuf_article_url": "https://takeuforward.org/data-structure/sort-an-array-of-0s-1s-and-2s/"
  },
  {
    "id": "stock-buy-and-sell",
    "title": "Stock Buy and Sell",
    "difficulty": "Medium",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Medium",
    "leetcode_url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    "tuf_article_url": "https://takeuforward.org/data-structure/stock-buy-and-sell/"
  },
  {
    "id": "3-sum",
    "title": "3 Sum",
    "difficulty": "Medium",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Hard",
    "leetcode_url": "https://leetcode.com/problems/3sum/",
    "tuf_article_url": "https://takeuforward.org/data-structure/3-sum-find-triplets-that-add-up-to-a-zero/"
  },
  {
    "id": "4-sum",
    "title": "4 Sum",
    "difficulty": "Medium",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Hard",
    "leetcode_url": "https://leetcode.com/problems/4sum/",
    "tuf_article_url": "https://takeuforward.org/data-structure/4-sum-find-quads-that-add-up-to-a-target-value/"
  },
  {
    "id": "count-inversions",
    "title": "Count Inversions",
    "difficulty": "Hard",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Hard",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/count-inversions-in-an-array"
  },
  {
    "id": "count-subarrays-with-given-xor-k",
    "title": "Count subarrays with given xor K",
    "difficulty": "Hard",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Hard",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/count-the-number-of-subarrays-with-given-xor-k/"
  },
  {
    "id": "find-the-repeating-and-missing-number",
    "title": "Find the repeating and missing number",
    "difficulty": "Hard",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Hard",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/find-the-repeating-and-missing-numbers/"
  },
  {
    "id": "largest-subarray-with-sum-0",
    "title": "Largest Subarray with Sum 0",
    "difficulty": "Medium",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Hard",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/length-of-the-longest-subarray-with-zero-sum/"
  },
  {
    "id": "majority-element-ii",
    "title": "Majority Element-II",
    "difficulty": "Hard",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Hard",
    "leetcode_url": "https://leetcode.com/problems/majority-element-ii/",
    "tuf_article_url": "https://takeuforward.org/data-structure/majority-elementsn-3-times-find-the-elements-that-appears-more-than-n-3-times-in-the-array/"
  },
  {
    "id": "maximum-product-subarray-in-an-array",
    "title": "Maximum Product Subarray in an Array",
    "difficulty": "Hard",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Hard",
    "leetcode_url": "https://leetcode.com/problems/maximum-product-subarray/",
    "tuf_article_url": "https://takeuforward.org/data-structure/maximum-product-subarray-in-an-array/"
  },
  {
    "id": "merge-overlapping-subintervals",
    "title": "Merge Overlapping Subintervals",
    "difficulty": "Medium",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Hard",
    "leetcode_url": "https://leetcode.com/problems/merge-intervals/",
    "tuf_article_url": "https://takeuforward.org/data-structure/merge-overlapping-sub-intervals/"
  },
  {
    "id": "merge-two-sorted-arrays-without-extra-space",
    "title": "Merge two sorted arrays without extra space",
    "difficulty": "Medium",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Hard",
    "leetcode_url": "https://leetcode.com/problems/merge-sorted-array/",
    "tuf_article_url": "https://takeuforward.org/data-structure/merge-two-sorted-arrays-without-extra-space/"
  },
  {
    "id": "pascal-s-triangle-i",
    "title": "Pascal's Triangle I",
    "difficulty": "Easy",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Hard",
    "leetcode_url": "https://leetcode.com/problems/pascals-triangle/",
    "tuf_article_url": "https://takeuforward.org/data-structure/program-to-generate-pascals-triangle"
  }
]
```

---

### Gemini Output Requirement:
Please search Google and YouTube for each of the 25 problems above and output the strict JSON array now.
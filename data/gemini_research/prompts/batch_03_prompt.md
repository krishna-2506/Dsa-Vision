# Gemini Spark Research Prompt — Batch 3 of 20
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

### Input Data for Batch 3 (25 Problems):

```json
[
  {
    "id": "sum-of-first-n-numbers",
    "title": "Sum of First N Numbers",
    "difficulty": "Easy",
    "topic": "Learn the basics > Learn Basic Recursion",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/sum-of-first-n-natural-numbers/"
  },
  {
    "id": "understand-recursion-by-print-something-n-times",
    "title": "Understand recursion by print something N times",
    "difficulty": "Easy",
    "topic": "Learn the basics > Learn Basic Recursion",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/recursion/introduction-to-recursion-understand-recursion-by-printing-something-n-times/"
  },
  {
    "id": "basic-hashing",
    "title": "Basic Hashing",
    "difficulty": "Easy",
    "topic": "Learn the basics > Learn Basic Hashing",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/hashing/hashing-maps-time-complexity-collisions-division-rule-of-hashing-strivers-a2z-dsa-course/"
  },
  {
    "id": "counting-frequencies-of-array-elements",
    "title": "Counting Frequencies of Array Elements",
    "difficulty": "Easy",
    "topic": "Learn the basics > Learn Basic Hashing",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/count-frequency-of-each-element-in-the-array/"
  },
  {
    "id": "highest-occurring-element-in-an-array",
    "title": "Highest Occurring Element in an Array",
    "difficulty": "Easy",
    "topic": "Learn the basics > Learn Basic Hashing",
    "leetcode_url": "https://leetcode.com/problems/frequency-of-the-most-frequent-element/",
    "tuf_article_url": "https://takeuforward.org/arrays/find-the-highest-lowest-frequency-element/"
  },
  {
    "id": "bubble-sort",
    "title": "Bubble Sort",
    "difficulty": "Easy",
    "topic": "Learn Important Sorting Techniques > Sorting-I",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/bubble-sort-algorithm/"
  },
  {
    "id": "insertion-sorting",
    "title": "Insertion Sorting",
    "difficulty": "Easy",
    "topic": "Learn Important Sorting Techniques > Sorting-I",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/insertion-sort-algorithm/"
  },
  {
    "id": "selection-sort",
    "title": "Selection Sort",
    "difficulty": "Easy",
    "topic": "Learn Important Sorting Techniques > Sorting-I",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/sorting/selection-sort-algorithm/"
  },
  {
    "id": "merge-sorting",
    "title": "Merge Sorting",
    "difficulty": "Medium",
    "topic": "Learn Important Sorting Techniques > Sorting-II",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/merge-sort-algorithm/"
  },
  {
    "id": "quick-sorting",
    "title": "Quick Sorting",
    "difficulty": "Easy",
    "topic": "Learn Important Sorting Techniques > Sorting-II",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/quick-sort-algorithm/"
  },
  {
    "id": "recursive-bubble-sort",
    "title": "Recursive Bubble Sort",
    "difficulty": "Easy",
    "topic": "Learn Important Sorting Techniques > Sorting-II",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/arrays/recursive-bubble-sort-algorithm/"
  },
  {
    "id": "recursive-insertion-sort",
    "title": "Recursive Insertion Sort",
    "difficulty": "Easy",
    "topic": "Learn Important Sorting Techniques > Sorting-II",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/arrays/recursive-insertion-sort-algorithm/"
  },
  {
    "id": "check-if-the-array-is-sorted-ii",
    "title": "Check if the Array is Sorted II",
    "difficulty": "Easy",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Easy",
    "leetcode_url": "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/#:~:text=Input%3A%20nums%20%3D%20%5B2%2C,no%20rotation)%20to%20make%20nums.",
    "tuf_article_url": "https://takeuforward.org/data-structure/check-if-an-array-is-sorted/"
  },
  {
    "id": "find-missing-number",
    "title": "Find missing number",
    "difficulty": "Easy",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Easy",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://www.geeksforgeeks.org/find-the-missing-number/"
  },
  {
    "id": "find-the-number-that-appears-once-and-other-numbers-twice",
    "title": "Find the number that appears once, and other numbers twice.",
    "difficulty": "Medium",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Easy",
    "leetcode_url": "https://leetcode.com/problems/single-number/",
    "tuf_article_url": "https://takeuforward.org/arrays/find-the-number-that-appears-once-and-the-other-numbers-twice/"
  },
  {
    "id": "largest-element",
    "title": "Largest Element",
    "difficulty": "Easy",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Easy",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/find-the-largest-element-in-an-array/"
  },
  {
    "id": "left-rotate-array-by-k-places",
    "title": "Left Rotate Array by K Places",
    "difficulty": "Easy",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Easy",
    "leetcode_url": "https://leetcode.com/problems/rotate-array/",
    "tuf_article_url": "https://takeuforward.org/data-structure/rotate-array-by-k-elements/"
  },
  {
    "id": "left-rotate-array-by-one",
    "title": "Left Rotate Array by One",
    "difficulty": "Easy",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Easy",
    "leetcode_url": "https://leetcode.com/problems/rotate-array/",
    "tuf_article_url": "https://takeuforward.org/data-structure/left-rotate-the-array-by-one/"
  },
  {
    "id": "linear-search",
    "title": "Linear Search",
    "difficulty": "Easy",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Easy",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/linear-search-in-c/"
  },
  {
    "id": "longest-subarray-with-given-sum-k-positives",
    "title": "Longest subarray with given sum K(positives)",
    "difficulty": "Medium",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Easy",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/longest-subarray-with-given-sum-k/"
  },
  {
    "id": "longest-subarray-with-sum-k",
    "title": "Longest subarray with sum K",
    "difficulty": "Medium",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Easy",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/arrays/longest-subarray-with-sum-k-postives-and-negatives"
  },
  {
    "id": "maximum-consecutive-ones",
    "title": "Maximum Consecutive Ones",
    "difficulty": "Easy",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Easy",
    "leetcode_url": "https://leetcode.com/problems/max-consecutive-ones/",
    "tuf_article_url": "https://takeuforward.org/data-structure/count-maximum-consecutive-ones-in-the-array/"
  },
  {
    "id": "move-zeros-to-end",
    "title": "Move Zeros to End",
    "difficulty": "Easy",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Easy",
    "leetcode_url": "https://leetcode.com/problems/move-zeroes/",
    "tuf_article_url": "https://takeuforward.org/data-structure/move-all-zeros-to-the-end-of-the-array/"
  },
  {
    "id": "remove-duplicates-from-sorted-array",
    "title": "Remove duplicates from Sorted array",
    "difficulty": "Easy",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Easy",
    "leetcode_url": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/#:~:text=Input%3A%20nums%20%3D%20%5B0%2C,%2C%203%2C%20and%204%20respectively.",
    "tuf_article_url": "https://takeuforward.org/data-structure/remove-duplicates-in-place-from-sorted-array/"
  },
  {
    "id": "second-largest-element",
    "title": "Second Largest Element",
    "difficulty": "Easy",
    "topic": "Solve Problems on Arrays [Easy -> Medium -> Hard] > Easy",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/find-second-smallest-and-second-largest-element-in-an-array/"
  }
]
```

---

### Gemini Output Requirement:
Please search Google and YouTube for each of the 25 problems above and output the strict JSON array now.
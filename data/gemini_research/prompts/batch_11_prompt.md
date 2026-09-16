# Gemini Spark Research Prompt — Batch 11 of 20
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

### Input Data for Batch 11 (15 Problems):

```json
[
  {
    "id": "celebrity-problem",
    "title": "Celebrity Problem",
    "difficulty": "Hard",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Implementation Problems",
    "leetcode_url": "https://leetcode.com/accounts/login/?next=/problems/find-the-celebrity/",
    "tuf_article_url": "https://takeuforward.org/data-structure/celebrity-problem"
  },
  {
    "id": "lfu-cache",
    "title": "LFU Cache",
    "difficulty": "Hard",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Implementation Problems",
    "leetcode_url": "https://leetcode.com/problems/lfu-cache/",
    "tuf_article_url": "https://takeuforward.org/data-structure/lfu-cache"
  },
  {
    "id": "lru-cache",
    "title": "LRU Cache",
    "difficulty": "Medium",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Implementation Problems",
    "leetcode_url": "Search by title",
    "tuf_article_url": "https://takeuforward.org/data-structure/program-for-least-recently-used-lru-page-replacement-algorithm"
  },
  {
    "id": "sliding-window-maximum",
    "title": "Sliding Window Maximum",
    "difficulty": "Hard",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Implementation Problems",
    "leetcode_url": "https://leetcode.com/problems/sliding-window-maximum/",
    "tuf_article_url": "https://takeuforward.org/data-structure/sliding-window-maximum/"
  },
  {
    "id": "stock-span-problem",
    "title": "Stock span problem",
    "difficulty": "Hard",
    "topic": "Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation] > Implementation Problems",
    "leetcode_url": "https://leetcode.com/problems/online-stock-span/",
    "tuf_article_url": "https://takeuforward.org/data-structure/stock-span-problem"
  },
  {
    "id": "binary-subarrays-with-sum",
    "title": "Binary Subarrays With Sum",
    "difficulty": "Hard",
    "topic": "Sliding Window & Two Pointer Combined Problems > Medium Problems",
    "leetcode_url": "https://leetcode.com/problems/binary-subarrays-with-sum/",
    "tuf_article_url": "https://takeuforward.org/data-structure/binary-subarray-with-sum"
  },
  {
    "id": "count-number-of-nice-subarrays",
    "title": "Count number of Nice subarrays",
    "difficulty": "Hard",
    "topic": "Sliding Window & Two Pointer Combined Problems > Medium Problems",
    "leetcode_url": "https://leetcode.com/problems/count-number-of-nice-subarrays/",
    "tuf_article_url": "https://takeuforward.org/data-structure/count-number-of-nice-subarrays"
  },
  {
    "id": "fruit-into-baskets",
    "title": "Fruit Into Baskets",
    "difficulty": "Medium",
    "topic": "Sliding Window & Two Pointer Combined Problems > Medium Problems",
    "leetcode_url": "https://leetcode.com/problems/fruit-into-baskets/description/",
    "tuf_article_url": "https://takeuforward.org/data-structure/fruit-into-baskets"
  },
  {
    "id": "longest-repeating-character-replacement",
    "title": "Longest Repeating Character Replacement",
    "difficulty": "Hard",
    "topic": "Sliding Window & Two Pointer Combined Problems > Medium Problems",
    "leetcode_url": "https://leetcode.com/problems/longest-repeating-character-replacement/",
    "tuf_article_url": "https://takeuforward.org/data-structure/longest-repeating-character-replacement"
  },
  {
    "id": "longest-substring-without-repeating-characters",
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "Medium",
    "topic": "Sliding Window & Two Pointer Combined Problems > Medium Problems",
    "leetcode_url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    "tuf_article_url": "https://takeuforward.org/data-structure/length-of-longest-substring-without-any-repeating-character/"
  },
  {
    "id": "max-consecutive-ones-iii",
    "title": "Max Consecutive Ones III",
    "difficulty": "Medium",
    "topic": "Sliding Window & Two Pointer Combined Problems > Medium Problems",
    "leetcode_url": "https://leetcode.com/problems/max-consecutive-ones-iii/",
    "tuf_article_url": "https://takeuforward.org/data-structure/max-consecutive-ones-iii"
  },
  {
    "id": "maximum-points-you-can-obtain-from-cards",
    "title": "Maximum Points You Can Obtain from Cards",
    "difficulty": "Medium",
    "topic": "Sliding Window & Two Pointer Combined Problems > Medium Problems",
    "leetcode_url": "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/",
    "tuf_article_url": "https://takeuforward.org/data-structure/maximum-point-you-can-obtain-from-cards"
  },
  {
    "id": "number-of-substrings-containing-all-three-characters",
    "title": "Number of Substrings Containing All Three Characters",
    "difficulty": "Hard",
    "topic": "Sliding Window & Two Pointer Combined Problems > Medium Problems",
    "leetcode_url": "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/",
    "tuf_article_url": "https://takeuforward.org/data-structure/number-of-substring-containing-all-three-characters"
  },
  {
    "id": "longest-substring-with-at-most-k-distinct-characters",
    "title": "Longest Substring With At Most K Distinct Characters",
    "difficulty": "Hard",
    "topic": "Sliding Window & Two Pointer Combined Problems > Hard Problems",
    "leetcode_url": "https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/",
    "tuf_article_url": "https://takeuforward.org/data-structure/longest-substring-with-at-most-k-distinct-characters"
  },
  {
    "id": "subarrays-with-k-different-integers",
    "title": "Subarrays with K Different Integers",
    "difficulty": "Medium",
    "topic": "Sliding Window & Two Pointer Combined Problems > Hard Problems",
    "leetcode_url": "https://leetcode.com/problems/subarrays-with-k-different-integers/",
    "tuf_article_url": "https://takeuforward.org/data-structure/subarray-with-k-different-integers"
  }
]
```

---

### Gemini Output Requirement:
Please search Google and YouTube for each of the 15 problems above and output the strict JSON array now.
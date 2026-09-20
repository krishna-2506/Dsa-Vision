/**
 * stepTheories.js
 * Comprehensive Theory, YouTube Video Lectures, Articles, and Invariant Cheatsheets
 * for each of the 18 Striver's A2Z DSA Sheet Steps.
 */

export const STEP_THEORIES = {
  1: {
    step_no: 1,
    title: 'Learn the Basics',
    subtitle: 'Programming Foundations, Basic Maths, Recursion & C++ STL',
    overview:
      'Master the essential foundations of competitive programming and algorithm design: time and space complexity, fundamental math algorithms (GCD, primes, divisors), basic recursion trees, and standard library collections (Vectors, Sets, Maps, Deques).',
    keyPatterns: [
      'Euclidean Algorithm for GCD',
      'Sieve of Eratosthenes & Prime Factorization',
      'Recursion Call Stack & Base Cases',
      'STL Containers & Iterator Mechanics'
    ],
    complexityCheatsheet: [
      { operation: 'Euclidean GCD(a, b)', time: 'O(log(min(a, b)))', space: 'O(log(min(a, b))) recursive / O(1) iter' },
      { operation: 'Check Prime (Trial Div)', time: 'O(√N)', space: 'O(1)' },
      { operation: 'Extract Digits of N', time: 'O(log₁₀N)', space: 'O(1)' },
      { operation: 'vector push_back (amortized)', time: 'O(1)', space: 'O(1)' },
      { operation: 'std::map (Red-Black Tree)', time: 'O(log N)', space: 'O(N)' },
      { operation: 'std::unordered_map (Hash)', time: 'O(1) avg, O(N) worst', space: 'O(N)' }
    ],
    videos: [
      {
        id: 'EAR7De6Gud4',
        title: 'Complete C++ STL in 1 Video (Containers, Iterators, Algorithms)',
        channel: 'take U forward',
        duration: '1h 24m',
        tag: 'STL'
      },
      {
        id: '1xNbjMdbjug',
        title: 'Basic Maths for DSA (Count Digits, Reverse, GCD, Prime Numbers)',
        channel: 'take U forward',
        duration: '42m',
        tag: 'Math'
      },
      {
        id: 'yVdKa8dnKiE',
        title: 'Introduction to Recursion (Base Cases, Call Stack, Tree Diagrams)',
        channel: 'take U forward',
        duration: '38m',
        tag: 'Recursion'
      },
      {
        id: 'FPu9Uld7W-E',
        title: 'Time & Space Complexity Complete Analysis (Big-O, Omega, Theta)',
        channel: 'take U forward',
        duration: '50m',
        tag: 'Complexity'
      }
    ],
    articles: [
      {
        title: 'Must-Know C++ STL Containers & Methods',
        url: 'https://takeuforward.org/c/c-stl-tutorial-most-frequent-used-stl-containers/',
        source: 'TakeUForward'
      },
      {
        title: 'Euclidean Algorithm for Greatest Common Divisor (GCD)',
        url: 'https://takeuforward.org/data-structure/find-gcd-of-two-numbers/',
        source: 'TakeUForward'
      },
      {
        title: 'Understanding Time and Space Complexity with Big-O',
        url: 'https://takeuforward.org/data-structure/time-and-space-complexity-tutorial/',
        source: 'TakeUForward'
      }
    ],
    visualizerKey: 'two-sum',
    defaultNotes: `# Step 01: Core Foundations & Math Notes

## 1. Time & Space Complexity Invariants
- **Big-O ($O$)**: Represents the asymptotic upper bound (worst-case scenario).
- **Big-Omega ($\Omega$)**: Represents the asymptotic lower bound (best-case scenario).
- **Big-Theta ($\Theta$)**: Represents the tight bound where upper and lower bounds coincide.

## 2. Euclidean GCD Theorem
For two integers $a$ and $b$ where $a > b$:
$$\\gcd(a, b) = \\gcd(b, a \\pmod b)$$
Terminates when the remainder reaches $0$. The time complexity is bounded by $O(\\log(\\min(a, b)))$.

## 3. Recursion Anatomy
1. **Base Case**: The termination condition preventing stack overflow (\`if (n == 0) return;\`).
2. **Inductive Hypothesis**: Trusting the function works for sub-problems of size $(n - 1)$ or $(n / 2)$.
3. **Inductive Step**: Combining sub-problem results with current computation.
`
  },

  2: {
    step_no: 2,
    title: 'Learn Important Sorting Techniques',
    subtitle: 'Selection, Bubble, Insertion, Merge Sort, Quick Sort & Invariants',
    overview:
      'Understand how comparison-based and divide-and-conquer sorting algorithms organize elements, their stability properties, worst-case vs average-case behavior, and how recursion stacks drive divide-and-conquer.',
    keyPatterns: [
      'Quadratic Comparison Invariants: Selection & Insertion Sort',
      'Divide and Conquer: Merge Sort (Merge step invariant)',
      'Partitioning: Quick Sort (Lomuto vs Hoare Partitioning)',
      'Stability & In-Place Memory Properties'
    ],
    complexityCheatsheet: [
      { operation: 'Selection Sort', time: 'O(N²) all cases', space: 'O(1) in-place' },
      { operation: 'Bubble Sort', time: 'O(N) best, O(N²) worst', space: 'O(1) in-place' },
      { operation: 'Insertion Sort', time: 'O(N) best, O(N²) worst', space: 'O(1) in-place' },
      { operation: 'Merge Sort', time: 'O(N log N) all cases', space: 'O(N) auxiliary' },
      { operation: 'Quick Sort', time: 'O(N log N) avg, O(N²) worst', space: 'O(log N) stack' }
    ],
    videos: [
      {
        id: 'HGk_ypEuS24',
        title: 'Selection Sort, Bubble Sort & Insertion Sort Deep Dive',
        channel: 'take U forward',
        duration: '45m',
        tag: 'Sorting I'
      },
      {
        id: 'ogjf7ORKfd8',
        title: 'Merge Sort Algorithm & Recursive Tree Walkthrough',
        channel: 'take U forward',
        duration: '48m',
        tag: 'Merge Sort'
      },
      {
        id: 'WIrA4YexLRQ',
        title: 'Quick Sort Algorithm & Partitioning Masterclass',
        channel: 'take U forward',
        duration: '41m',
        tag: 'Quick Sort'
      }
    ],
    articles: [
      {
        title: 'Merge Sort: Detailed Algorithm, Proof & Complexity',
        url: 'https://takeuforward.org/data-structure/merge-sort-algorithm/',
        source: 'TakeUForward'
      },
      {
        title: 'Quick Sort: Partitioning Invariant & Code Walkthrough',
        url: 'https://takeuforward.org/data-structure/quick-sort-algorithm/',
        source: 'TakeUForward'
      }
    ],
    visualizerKey: 'quick-sort',
    defaultNotes: `# Step 02: Sorting Techniques & Invariants

## 1. Merge Sort Invariant
- **Divide**: Split array at midpoint $mid = left + (right - left) / 2$.
- **Conquer**: Recursively sort $A[left..mid]$ and $A[mid+1..right]$.
- **Combine**: Merge two already sorted halves using two pointers in $O(N)$ time.
- **Guarantee**: Guaranteed $O(N \\log N)$ performance regardless of initial array ordering.

## 2. Quick Sort Partitioning (Hoare / Lomuto)
- Pick a pivot $p$.
- Rearrange array such that:
  $$\\forall x \\in A[left..i], x \\le p \\quad \\text{and} \\quad \\forall y \\in A[i+1..right], y \\ge p$$
- Quick Sort is cache-friendly and in-place, making it faster in practice than Merge Sort for random arrays.
`
  },

  3: {
    step_no: 3,
    title: 'Solve Problems on Arrays',
    subtitle: 'Easy -> Medium -> Hard: Kadane, Dutch Flag, Moore, 2-Pointer',
    overview:
      'Arrays form the backbone of DSA interviews. This step covers sliding windows, prefix sums, sub-array kadane heuristics, Dutch National Flag 3-way partitioning, and Moore’s Voting algorithm for optimal $O(N)$ linear scans.',
    keyPatterns: [
      'Two-Pointers: In-place array deduplication & target sums',
      "Kadane's Algorithm: Maximum contiguous sub-array sum",
      "Dutch National Flag: 3-way partitioning (0s, 1s, 2s)",
      "Moore's Voting Algorithm: O(1) space majority element",
      'Prefix Sums & Hash Maps: Subarray sum equals K'
    ],
    complexityCheatsheet: [
      { operation: "Kadane's Subarray Sum", time: 'O(N)', space: 'O(1)' },
      { operation: 'Dutch National Flag Sort (0,1,2)', time: 'O(N)', space: 'O(1)' },
      { operation: "Moore's Majority Element", time: 'O(N)', space: 'O(1)' },
      { operation: 'Subarray Sum = K (Prefix Hash)', time: 'O(N)', space: 'O(N)' },
      { operation: 'Next Permutation', time: 'O(N)', space: 'O(1)' },
      { operation: 'Merge Overlapping Intervals', time: 'O(N log N)', space: 'O(N)' }
    ],
    videos: [
      {
        id: 'wvcQg43_V8U',
        title: "Kadane's Algorithm: Maximum Subarray Sum in Array",
        channel: 'take U forward',
        duration: '22m',
        tag: "Kadane's"
      },
      {
        id: 'tp8JIuCXBaU',
        title: 'Sort an array of 0s, 1s and 2s (Dutch National Flag Algorithm)',
        channel: 'take U forward',
        duration: '18m',
        tag: 'DNF'
      },
      {
        id: 'nP_ns3uVOAc',
        title: "Moore's Voting Algorithm for Majority Element (> N/2 times)",
        channel: 'take U forward',
        duration: '26m',
        tag: 'Moore Voting'
      },
      {
        id: 'frf7q7g_Rj0',
        title: 'Next Permutation: Intuition, Algorithm & Edge Cases',
        channel: 'take U forward',
        duration: '34m',
        tag: 'Permutations'
      }
    ],
    articles: [
      {
        title: "Kadane's Algorithm: Maximum Contiguous Subarray Sum",
        url: 'https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array/',
        source: 'TakeUForward'
      },
      {
        title: 'Sort an Array of 0s, 1s, and 2s using DNF Algorithm',
        url: 'https://takeuforward.org/data-structure/sort-an-array-of-0s-1s-and-2s/',
        source: 'TakeUForward'
      },
      {
        title: "Moore's Voting Algorithm for Majority Element",
        url: 'https://takeuforward.org/data-structure/find-the-majority-element-that-occurs-more-than-n-2-times/',
        source: 'TakeUForward'
      }
    ],
    visualizerKey: 'two-sum',
    defaultNotes: `# Step 03: Arrays Master Notes

## 1. Kadane's Algorithm Loop Invariant
At each index $i$, decide whether to extend the current running sum or start fresh from $nums[i]$:
$$current\\_sum = \\max(nums[i], current\\_sum + nums[i])$$
$$max\\_so\\_far = \\max(max\\_so\\_far, current\\_sum)$$

## 2. Dutch National Flag (3-Way Partitioning)
Maintain 3 pointers: \`low\`, \`mid\`, and \`high\`:
- \`[0 .. low-1]\`: Strictly 0s
- \`[low .. mid-1]\`: Strictly 1s
- \`[mid .. high]\`: Unexamined elements
- \`[high+1 .. n-1]\`: Strictly 2s
Terminates when \`mid > high\`.

## 3. Moore's Voting Algorithm
Maintains \`candidate\` and \`count\`. If count drops to 0, current element becomes candidate. Because the majority element occurs $> \\lfloor N/2 \\rfloor$ times, it survives cancellation against all other elements.
`
  },

  4: {
    step_no: 4,
    title: 'Binary Search',
    subtitle: '1D Arrays, Rotated Arrays, Search Space & Answer Monotonicity',
    overview:
      'Binary Search extends far beyond simple sorted array lookups. Learn the lower bound / upper bound definitions, handling rotated sorted arrays, and applying Binary Search on Answer Space (Book Allocation, Aggressive Cows, Ship Capacity).',
    keyPatterns: [
      'Index Halving & Midpoint Overflow Protection: mid = low + (high - low) / 2',
      'Lower Bound (>= X) vs Upper Bound (> X)',
      'Rotated Sorted Array: Identifying which half is guaranteed sorted',
      'Binary Search on Answer: Monotonic feasibility predicate f(mid)'
    ],
    complexityCheatsheet: [
      { operation: 'Standard Binary Search', time: 'O(log N)', space: 'O(1)' },
      { operation: 'Lower / Upper Bound', time: 'O(log N)', space: 'O(1)' },
      { operation: 'Search in Rotated Sorted Array', time: 'O(log N)', space: 'O(1)' },
      { operation: 'Koko Eating Bananas', time: 'O(N log(max_pile))', space: 'O(1)' },
      { operation: 'Book Allocation / Painter Partition', time: 'O(N log(sum - max))', space: 'O(1)' },
      { operation: 'Median of Two Sorted Arrays', time: 'O(log(min(N, M)))', space: 'O(1)' }
    ],
    videos: [
      {
        id: 'j7NodO9HIbk',
        title: 'Binary Search Complete Theory & Lower/Upper Bound Concepts',
        channel: 'take U forward',
        duration: '40m',
        tag: 'Foundations'
      },
      {
        id: 'r3pMQ8-Ad5s',
        title: 'Search in Rotated Sorted Array (1 & 2 with Duplicates)',
        channel: 'take U forward',
        duration: '32m',
        tag: 'Rotated Arrays'
      },
      {
        id: 'thUd_S6E6SE',
        title: 'Binary Search on Answers: Book Allocation / Aggressive Cows Pattern',
        channel: 'take U forward',
        duration: '44m',
        tag: 'BS on Answers'
      }
    ],
    articles: [
      {
        title: 'Binary Search Algorithm: Invariant & Bound Calculation',
        url: 'https://takeuforward.org/data-structure/binary-search-explained/',
        source: 'TakeUForward'
      },
      {
        title: 'Book Allocation Problem: Binary Search on Answer Space',
        url: 'https://takeuforward.org/data-structure/allocate-minimum-number-of-pages/',
        source: 'TakeUForward'
      }
    ],
    visualizerKey: 'binary-search',
    defaultNotes: `# Step 04: Binary Search & Answer Space

## 1. The Monotonicity Condition
Binary search works whenever a decision predicate $P(x)$ transitions monotonically:
$$\\text{False}, \\text{False}, \\dots, \\text{False}, \\mathbf{True}, \\text{True}, \\dots, \\text{True}$$
The goal is finding the exact boundary where $P(x)$ flips.

## 2. Invariant Template
\`\`\`cpp
int low = min_possible, high = max_possible, ans = -1;
while (low <= high) {
    int mid = low + (high - low) / 2;
    if (isValid(mid)) {
        ans = mid;         // Record candidate
        high = mid - 1;    // Try smaller (if minimizing)
    } else {
        low = mid + 1;     // Try larger
    }
}
return ans;
\`\`\`
`
  },

  5: {
    step_no: 5,
    title: 'Strings [Basic and Medium]',
    subtitle: 'Character Frequency Maps, Anagrams, Isomorphic Strings & Palindromes',
    overview:
      'Strings require mastering string immutability, frequency arrays (26/256 size), sliding window substring counts, palindrome checks, and string arithmetic.',
    keyPatterns: [
      'Fixed-size ASCII Array [26 or 128] vs Hash Maps',
      'Anagram Checks: Frequency counting balance',
      'Longest Common Prefix & String Matching',
      'Roman Numeral & Integer Transformations'
    ],
    complexityCheatsheet: [
      { operation: 'Valid Anagram Check', time: 'O(N)', space: 'O(1) (26-char array)' },
      { operation: 'Isomorphic Strings', time: 'O(N)', space: 'O(1) (char maps)' },
      { operation: 'Longest Palindromic Substring', time: 'O(N²) center expansion', space: 'O(1)' },
      { operation: 'Reverse Words in String', time: 'O(N)', space: 'O(1) in-place' }
    ],
    videos: [
      {
        id: 'eERWJbSgLkc',
        title: 'String Matching & Anagram Algorithms Masterclass',
        channel: 'take U forward',
        duration: '35m',
        tag: 'Anagrams'
      },
      {
        id: 'XYQecbcd6uc',
        title: 'Longest Common Prefix & String Manipulation Patterns',
        channel: 'take U forward',
        duration: '28m',
        tag: 'Prefix'
      }
    ],
    articles: [
      {
        title: 'Check if Two Strings are Anagrams of Each Other',
        url: 'https://takeuforward.org/data-structure/check-if-two-strings-are-anagrams-of-each-other/',
        source: 'TakeUForward'
      }
    ],
    visualizerKey: 'two-sum',
    defaultNotes: `# Step 05: Strings & Frequency Patterns
- Always check if characters are strictly lowercase English (\`'a' .. 'z'\`) or full ASCII.
- If lowercase English, a \`int freq[26] = {0};\` array provides $O(1)$ lookup and is cache optimal.
`
  },

  6: {
    step_no: 6,
    title: 'Learn LinkedList',
    subtitle: 'Single LL, Doubly LL, Fast & Slow Pointers, Reversal & Cycles',
    overview:
      'LinkedLists test pointer manipulation, memory references, dummy head techniques, and Floyd’s Cycle-Finding Algorithm (Tortoise and Hare).',
    keyPatterns: [
      'Dummy Head Node (Sentinel) to avoid edge cases at head',
      'In-Place Reversal: prev, curr, next pointer mechanics',
      "Floyd's Tortoise & Hare: Cycle detection and cycle entry point",
      'Middle of LL & Merge Two Sorted Lists'
    ],
    complexityCheatsheet: [
      { operation: 'Reverse Singly LinkedList', time: 'O(N)', space: 'O(1)' },
      { operation: 'Detect Cycle (Floyd)', time: 'O(N)', space: 'O(1)' },
      { operation: 'Find Cycle Start Node', time: 'O(N)', space: 'O(1)' },
      { operation: 'Middle of LinkedList', time: 'O(N)', space: 'O(1)' },
      { operation: 'Remove Nth Node from End', time: 'O(N)', space: 'O(1)' }
    ],
    videos: [
      {
        id: 'Nq7ok-OyEpg',
        title: 'LinkedList Complete Tutorial: Insertion, Deletion & Traversal',
        channel: 'take U forward',
        duration: '52m',
        tag: 'Foundations'
      },
      {
        id: 'D2vI2DNJGd8',
        title: 'Reverse a LinkedList (Iterative & Recursive Proof)',
        channel: 'take U forward',
        duration: '25m',
        tag: 'Reversal'
      },
      {
        id: '2Kd0KKmmHFc',
        title: "Detect a Loop in LinkedList (Floyd's Cycle Algorithm)",
        channel: 'take U forward',
        duration: '28m',
        tag: 'Floyd Cycle'
      }
    ],
    articles: [
      {
        title: 'Reverse a Linked List: Step-by-Step Pointer Mutation',
        url: 'https://takeuforward.org/data-structure/reverse-a-linked-list/',
        source: 'TakeUForward'
      },
      {
        title: "Detect a Loop in Linked List using Tortoise & Hare",
        url: 'https://takeuforward.org/data-structure/detect-a-cycle-in-a-linked-list/',
        source: 'TakeUForward'
      }
    ],
    visualizerKey: 'reverse-linked-list',
    defaultNotes: `# Step 06: LinkedList Pointer Invariants

## 1. 3-Pointer In-Place Reversal
\`\`\`cpp
ListNode* prev = nullptr;
ListNode* curr = head;
while (curr != nullptr) {
    ListNode* nextNode = curr->next; // 1. Save future
    curr->next = prev;               // 2. Reverse link
    prev = curr;                     // 3. Advance prev
    curr = nextNode;                 // 4. Advance curr
}
return prev; // New head
\`\`\`

## 2. Floyd's Cycle Entry Proof
When slow and fast meet inside the cycle:
- Distance from head to cycle start = $L_1$
- Distance from meeting point to cycle start = $L_1$
- By moving one pointer back to \`head\` and stepping both at speed 1, they collide at the exact cycle start!
`
  },

  7: {
    step_no: 7,
    title: 'Recursion [PatternWise]',
    subtitle: 'Subsequences, Subsets, Combination Sum, Permutations & Backtracking',
    overview:
      'Master the decision tree framework for generating combinations, permutations, and backtracking decisions (N-Queens, Sudoku Solver, Palindrome Partitioning).',
    keyPatterns: [
      'Take or Not Take (Pick / Don’t Pick) Paradigm',
      'Combination Sum with Infinite Multi-use vs Single-use',
      'Backtracking State Invariant: mutate -> recurse -> backtrack (undo)',
      'Pruning Dead Branches to avoid exponential explosion'
    ],
    complexityCheatsheet: [
      { operation: 'Generate All Subsets (Power Set)', time: 'O(2^N * N)', space: 'O(N) stack' },
      { operation: 'Combination Sum I & II', time: 'O(2^T * K)', space: 'O(K) stack' },
      { operation: 'All Permutations (N!)', time: 'O(N! * N)', space: 'O(N)' },
      { operation: 'N-Queens Backtracking', time: 'O(N!)', space: 'O(N) board + sets' }
    ],
    videos: [
      {
        id: 'b7AYbpM5YrE',
        title: 'Print All Subsequences using Power Set / Recursion',
        channel: 'take U forward',
        duration: '31m',
        tag: 'Subsequences'
      },
      {
        id: 'OyZWWVljJYo',
        title: 'Combination Sum 1 & 2 with Backtracking & Branch Pruning',
        channel: 'take U forward',
        duration: '42m',
        tag: 'Combination Sum'
      },
      {
        id: 'i05Ju7AftcM',
        title: 'N-Queens Problem Complete Visual Backtracking',
        channel: 'take U forward',
        duration: '48m',
        tag: 'N-Queens'
      }
    ],
    articles: [
      {
        title: 'Subset Sum: Sum of all Subsets using Recursion',
        url: 'https://takeuforward.org/data-structure/subset-sum-sum-of-all-subsets/',
        source: 'TakeUForward'
      },
      {
        title: 'N-Queen Problem: Backtracking Implementation',
        url: 'https://takeuforward.org/data-structure/n-queen-problem-return-all-distinct-solutions-to-the-n-queens-puzzle/',
        source: 'TakeUForward'
      }
    ],
    visualizerKey: 'two-sum',
    defaultNotes: `# Step 07: Recursion & Backtracking Core Mental Model
1. **Choose**: Choose an option (e.g. pick current element into running subset).
2. **Explore**: Recurse down to solve sub-problems.
3. **Un-choose (Backtrack)**: Restore state (\`subset.pop_back()\`) so parallel branches are unaffected.
`
  },

  8: {
    step_no: 8,
    title: 'Bit Manipulation',
    subtitle: 'Bitwise Operators, Masks, XOR Properties, Subsets & Power of 2',
    overview:
      'Bitwise arithmetic operates at the silicon level in single CPU cycles. Master bitmasking, checking set bits, XOR cancellation ($A \\oplus A = 0$), and Brian Kernighan’s algorithm ($N \\& (N - 1)$).',
    keyPatterns: [
      'Check if ith bit is set: (n & (1 << i)) != 0',
      'Clear lowest set bit: n & (n - 1)',
      'XOR Cancellation: x ^ x = 0, x ^ 0 = x',
      'Power of 2 Check: (n > 0) && ((n & (n - 1)) == 0)'
    ],
    complexityCheatsheet: [
      { operation: 'Count Set Bits (Kernighan)', time: 'O(number of set bits)', space: 'O(1)' },
      { operation: 'Single Number (XOR All)', time: 'O(N)', space: 'O(1)' },
      { operation: 'Subsets via Bitmask [0..2^N-1]', time: 'O(2^N * N)', space: 'O(1)' }
    ],
    videos: [
      {
        id: 'nttpF8KWfv4',
        title: 'Bit Manipulation Complete Course for Coding Interviews',
        channel: 'take U forward',
        duration: '1h 10m',
        tag: 'Bit Manipulation'
      }
    ],
    articles: [
      {
        title: 'Find the Number that Appears Once and Others Twice',
        url: 'https://takeuforward.org/arrays/find-the-number-that-appears-once-and-the-other-numbers-twice/',
        source: 'TakeUForward'
      }
    ],
    visualizerKey: 'two-sum',
    defaultNotes: `# Step 08: Bitwise Tricks Cheat Sheet
- Set ith bit: \`n | (1 << i)\`
- Clear ith bit: \`n & ~(1 << i)\`
- Toggle ith bit: \`n ^ (1 << i)\`
- Isolate rightmost set bit: \`n & (-n)\`
- Clear rightmost set bit: \`n & (n - 1)\`
`
  },

  9: {
    step_no: 9,
    title: 'Stack and Queues',
    subtitle: 'LIFO & FIFO Foundations, Monotonic Stacks, Sliding Windows & Infix-Postfix',
    overview:
      'Stacks and Queues introduce constrained data structures. Monotonic stacks solve Nearest Greater/Smaller Element queries in amortized $O(N)$ time, while Monotonic Deques power the classic Sliding Window Maximum.',
    keyPatterns: [
      'Monotonic Decreasing/Increasing Stack Pattern',
      'Next Greater Element (NGE) & Next Smaller Element (NSE)',
      'Sliding Window Maximum using Deque',
      'Infix to Postfix Conversion & Operator Precedence'
    ],
    complexityCheatsheet: [
      { operation: 'Stack Push / Pop / Top', time: 'O(1)', space: 'O(N)' },
      { operation: 'Next Greater Element (Monotonic)', time: 'O(N) amortized', space: 'O(N)' },
      { operation: 'Largest Rectangle in Histogram', time: 'O(N)', space: 'O(N)' },
      { operation: 'Sliding Window Maximum (Deque)', time: 'O(N)', space: 'O(K)' }
    ],
    videos: [
      {
        id: 'Du8U3K08V54',
        title: 'Next Greater Element using Monotonic Stack',
        channel: 'take U forward',
        duration: '26m',
        tag: 'Monotonic Stack'
      },
      {
        id: 'X0345ZJ2aE8',
        title: 'Largest Rectangle in Histogram Optimal 1-Pass Solution',
        channel: 'take U forward',
        duration: '38m',
        tag: 'Histogram'
      }
    ],
    articles: [
      {
        title: 'Next Greater Element using Monotonic Stack Explained',
        url: 'https://takeuforward.org/data-structure/next-greater-element-using-stack/',
        source: 'TakeUForward'
      }
    ],
    visualizerKey: 'two-sum',
    defaultNotes: `# Step 09: Monotonic Stack Invariant
A monotonic stack maintains elements in strictly increasing or decreasing order.
When an incoming element violates monotonicity, we repeatedly pop from the stack.
Because every element is pushed at most once and popped at most once, total work across $N$ elements is strictly $O(N)$!
`
  },

  10: {
    step_no: 10,
    title: 'Sliding Window & Two Pointers',
    subtitle: 'Fixed vs Dynamic Window, Frequency Window Shrinking & Max Length',
    overview:
      'Sliding window optimizes nested $O(N^2)$ brute forces into $O(N)$ linear scans by maintaining a valid contiguous range `[left..right]` and expanding/shrinking dynamically.',
    keyPatterns: [
      'Fixed Size Window: Add incoming right, remove outgoing left',
      'Dynamic Size Window: Expand right, while condition invalid shrink left',
      'At Most K Pattern: count(exact K) = count(atMost K) - count(atMost K-1)',
      'Character Frequency Constraints'
    ],
    complexityCheatsheet: [
      { operation: 'Longest Substring Without Repeating Characters', time: 'O(N)', space: 'O(min(N, 256))' },
      { operation: 'Max Consecutive Ones III', time: 'O(N)', space: 'O(1)' },
      { operation: 'Subarrays with K Different Integers', time: 'O(N)', space: 'O(K)' }
    ],
    videos: [
      {
        id: 'wiGpQwVHdE0',
        title: 'Sliding Window & Two Pointer Masterclass: Patterns & Templates',
        channel: 'take U forward',
        duration: '45m',
        tag: 'Sliding Window'
      }
    ],
    articles: [
      {
        title: 'Length of Longest Substring without any Repeating Character',
        url: 'https://takeuforward.org/data-structure/length-of-longest-substring-without-any-repeating-character/',
        source: 'TakeUForward'
      }
    ],
    visualizerKey: 'two-sum',
    defaultNotes: `# Step 10: Sliding Window Template
\`\`\`cpp
int left = 0, maxLen = 0;
for (int right = 0; right < n; right++) {
    // 1. Expand: Include nums[right] into window state
    updateState(nums[right]);

    // 2. Shrink: While window is invalid, eject nums[left]
    while (isInvalid()) {
        removeFromState(nums[left]);
        left++;
    }

    // 3. Record: Valid window [left..right]
    maxLen = max(maxLen, right - left + 1);
}
return maxLen;
\`\`\`
`
  },

  13: {
    step_no: 13,
    title: 'Binary Trees',
    subtitle: 'Traversals (In, Pre, Post, Level), Depth, Diameter, Views & LCA',
    overview:
      'Binary Trees teach non-linear hierarchical thinking. Master BFS Level-order traversals with queues, DFS recursive traversals, computing Diameter in a single bottom-up pass, and Lowest Common Ancestor (LCA).',
    keyPatterns: [
      'DFS Traversals: Preorder (Root-L-R), Inorder (L-Root-R), Postorder (L-R-Root)',
      'BFS Level Order Traversal using std::queue',
      'Bottom-Up Height & Diameter Calculation in O(N)',
      'Lowest Common Ancestor (LCA) in Binary Tree'
    ],
    complexityCheatsheet: [
      { operation: 'All Tree Traversals (DFS / BFS)', time: 'O(N)', space: 'O(H) recursion / O(W) queue' },
      { operation: 'Maximum Depth / Height', time: 'O(N)', space: 'O(H)' },
      { operation: 'Diameter of Binary Tree', time: 'O(N)', space: 'O(H)' },
      { operation: 'LCA of Two Nodes', time: 'O(N)', space: 'O(H)' }
    ],
    videos: [
      {
        id: 'jmy0LaGET1I',
        title: 'Binary Tree Complete Course: Traversals, Height, Views & LCA',
        channel: 'take U forward',
        duration: '1h 35m',
        tag: 'Trees'
      }
    ],
    articles: [
      {
        title: 'Lowest Common Ancestor for Two Given Nodes in Binary Tree',
        url: 'https://takeuforward.org/data-structure/lowest-common-ancestor-for-two-given-nodes/',
        source: 'TakeUForward'
      }
    ],
    visualizerKey: 'two-sum',
    defaultNotes: `# Step 13: Tree Invariants & Traversal Order
- **Inorder of BST** is always strictly ascending sorted.
- **Diameter**: The longest path between any two nodes. Compute diameter during bottom-up height calculation:
  $$diameter = \\max(diameter, left\\_height + right\\_height)$$
`
  },

  15: {
    step_no: 15,
    title: 'Graphs [Concepts & Problems]',
    subtitle: 'BFS, DFS, Cycle Detection, Topological Sort, Dijkstra & Disjoint Set',
    overview:
      'Graphs model real-world networks. Master Adjacency Lists, BFS/DFS traversal, Cycle Detection in Directed/Undirected graphs, Kahn’s Algorithm for Topological Sort, Dijkstra’s Shortest Path, and Disjoint Set Union (DSU) with Path Compression.',
    keyPatterns: [
      'Adjacency List Representation & Visited Array',
      'BFS for Shortest Path in Unweighted Graphs',
      "Dijkstra's Algorithm using Min-Heap for Non-negative Weights",
      'Topological Sort (Kahn’s In-degree BFS & DFS Postorder)',
      'Disjoint Set Union (DSU): Union by Rank & Path Compression'
    ],
    complexityCheatsheet: [
      { operation: 'BFS / DFS Traversal', time: 'O(V + E)', space: 'O(V)' },
      { operation: 'Topological Sort (Kahn)', time: 'O(V + E)', space: 'O(V)' },
      { operation: "Dijkstra's Shortest Path", time: 'O(E log V)', space: 'O(V)' },
      { operation: 'DSU Find & Union (Amortized)', time: 'O(α(V)) ≈ O(1)', space: 'O(V)' },
      { operation: "Kruskal's Minimum Spanning Tree", time: 'O(E log E)', space: 'O(V)' }
    ],
    videos: [
      {
        id: 'V6H1qAePr-U',
        title: 'Graph Representation in C++ & Java (Adjacency Matrix vs List)',
        channel: 'take U forward',
        duration: '25m',
        tag: 'Foundations'
      },
      {
        id: '-tgVpUgsQ5A',
        title: 'BFS Traversal of Graph with Queue and Visited Array',
        channel: 'take U forward',
        duration: '32m',
        tag: 'BFS'
      },
      {
        id: 'V4Pq4W62j5g',
        title: "Dijkstra's Algorithm: Shortest Path in Weighted Graph",
        channel: 'take U forward',
        duration: '40m',
        tag: 'Dijkstra'
      },
      {
        id: 'aBxjDBC461U',
        title: 'Disjoint Set (Union by Rank & Path Compression) Masterclass',
        channel: 'take U forward',
        duration: '45m',
        tag: 'DSU'
      }
    ],
    articles: [
      {
        title: "Dijkstra's Algorithm: Shortest Path in Weighted Graph",
        url: 'https://takeuforward.org/data-structure/dijkstras-algorithm-using-priority-queue-g-32/',
        source: 'TakeUForward'
      },
      {
        title: 'Disjoint Set Union: Union by Rank and Path Compression',
        url: 'https://takeuforward.org/data-structure/disjoint-set-union-by-rank-union-by-size-path-compression-g-46/',
        source: 'TakeUForward'
      }
    ],
    visualizerKey: 'two-sum',
    defaultNotes: `# Step 15: Graphs Core Invariants

## 1. Dijkstra's Invariant
Uses a min-priority queue storing \`(dist, node)\`. When a node $u$ is popped from the priority queue with distance $d$, $d$ is guaranteed to be the shortest path from source to $u$.

## 2. Disjoint Set Union (DSU)
Path compression flattens the tree so find operations run in nearly $O(1)$ inverse Ackermann time $\\alpha(V)$:
\`\`\`cpp
int find(int node) {
    if (node == parent[node]) return node;
    return parent[node] = find(parent[node]); // Path compression
}
\`\`\`
`
  },

  16: {
    step_no: 16,
    title: 'Dynamic Programming',
    subtitle: 'Memoization, Tabulation, Space Optimization, 1D, 2D, Grids & Subsequences',
    overview:
      'Dynamic Programming solves complex problems by breaking them into overlapping sub-problems with optimal substructure. Master moving from Recursion -> Memoization -> Tabulation -> Space Optimization across 1D DP, Grid DP, Subsequences (Knapsack, Subset Sum), and Longest Common Subsequence (LCS).',
    keyPatterns: [
      'Optimal Substructure & Overlapping Subproblems',
      'Step 1: Express index and state in recursion',
      'Step 2: Take and Don’t Take sub-problem transitions',
      'Step 3: Memoize with 1D/2D table',
      'Step 4: Convert to Tabulation & Space Optimize to O(1) or O(N) prev rows'
    ],
    complexityCheatsheet: [
      { operation: 'Climbing Stairs / Fibonacci', time: 'O(N)', space: 'O(1) space optimized' },
      { operation: '0/1 Knapsack Problem', time: 'O(N * W)', space: 'O(W) space optimized' },
      { operation: 'Longest Common Subsequence (LCS)', time: 'O(N * M)', space: 'O(M) space optimized' },
      { operation: 'Longest Increasing Subsequence (LIS)', time: 'O(N log N) with Binary Search', space: 'O(N)' },
      { operation: 'Matrix Chain Multiplication (MCM)', time: 'O(N³)', space: 'O(N²)' }
    ],
    videos: [
      {
        id: 'tyB0ztf0DNY',
        title: 'Dynamic Programming Introduction: Memoization vs Tabulation',
        channel: 'take U forward',
        duration: '40m',
        tag: 'Foundations'
      },
      {
        id: 'GqOmJwNTZDE',
        title: '0/1 Knapsack Problem: Recursion to 1D Array Space Optimization',
        channel: 'take U forward',
        duration: '38m',
        tag: 'Knapsack'
      },
      {
        id: 'NPZn9jBrX8U',
        title: 'Longest Common Subsequence (LCS) Complete Tabulation Walkthrough',
        channel: 'take U forward',
        duration: '42m',
        tag: 'LCS'
      },
      {
        id: 'on2hvxBXJH4',
        title: 'Longest Increasing Subsequence (LIS) in O(N log N) via Binary Search',
        channel: 'take U forward',
        duration: '35m',
        tag: 'LIS'
      }
    ],
    articles: [
      {
        title: '0/1 Knapsack Problem: Space Optimization to 1D Array',
        url: 'https://takeuforward.org/data-structure/0-1-knapsack-dp-19/',
        source: 'TakeUForward'
      },
      {
        title: 'Longest Common Subsequence: Tabulation & Space Optimization',
        url: 'https://takeuforward.org/data-structure/longest-common-subsequence-dp-25/',
        source: 'TakeUForward'
      }
    ],
    visualizerKey: 'two-sum',
    defaultNotes: `# Step 16: Dynamic Programming Framework

## The 4-Step DP Progression
1. **Define State**: What parameters uniquely identify a subproblem? (e.g., \`dp(i, weight)\`)
2. **Base Case**: The simplest subproblem that can be answered immediately.
3. **Transition**: Express \`dp[i]\` mathematically in terms of smaller subproblems:
   $$dp[i] = \\max(dp[i-1], dp[i-2] + nums[i])$$
4. **Space Optimization**: If \`dp[i]\` only depends on \`dp[i-1]\` and \`dp[i-2]\`, eliminate the array and keep two scalar variables \`prev\` and \`prev2\` for $O(1)$ space!
`
  }
};

/**
 * Helper to get theory object for a step number, with a robust fallback
 * for steps that haven't been individually configured yet.
 */
export function getStepTheory(stepNo, stepTitle = '') {
  if (STEP_THEORIES[stepNo]) {
    return STEP_THEORIES[stepNo];
  }

  // Fallback for steps 11, 12, 14, 17, 18
  return {
    step_no: stepNo,
    title: stepTitle || `Step ${stepNo}`,
    subtitle: `Foundational concepts, properties & algorithmic patterns for Step ${stepNo}`,
    overview: `Detailed theory, visual invariants, and patterns for mastering ${stepTitle || `Step ${stepNo}`}.`,
    keyPatterns: [
      'Problem Decomposition & Invariant Maintenance',
      'Optimal Time & Space Trade-offs',
      'Edge Cases & Boundary Validation'
    ],
    complexityCheatsheet: [
      { operation: 'Standard Query / Traversal', time: 'O(N)', space: 'O(1) to O(N)' },
      { operation: 'Optimal Sub-routine', time: 'O(log N)', space: 'O(1)' }
    ],
    videos: [
      {
        id: 'EAR7De6Gud4',
        title: `${stepTitle || `Step ${stepNo}`} Lecture & Problem Walkthrough`,
        channel: 'take U forward',
        duration: '40m',
        tag: 'Lecture'
      }
    ],
    articles: [
      {
        title: `TakeUForward ${stepTitle || `Step ${stepNo}`} In-Depth Guide`,
        url: 'https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/',
        source: 'TakeUForward'
      }
    ],
    visualizerKey: 'two-sum',
    defaultNotes: `# Step ${stepNo}: ${stepTitle || 'Core Theory Notes'}\n\nAdd your custom notes, takeaways, and interview pointers here.`
  };
}

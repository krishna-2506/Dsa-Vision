// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Find Square Root of a Number (Integer Sqrt)',
  category: 'Binary Search on Answers',
  difficulty: 'Easy',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Calculates the floor of the square root of an integer N in logarithmic O(log N) time using binary search over the monotonic search domain [1 ... N].'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Integer Square Root BS Invariant',
  nodes: [
    { id: 'root', label: 'Square Root BS Strategy', children: ['monotonic-property', 'feasible-candidate', 'overshoot-prune', 'overflow-safety'] },
    { id: 'monotonic-property', label: '1. Monotonic Predicate', detail: 'The function f(x) = x * x is strictly increasing for x >= 1. Hence f(x) <= N transitions from true to false exactly once' },
    { id: 'feasible-candidate', label: '2. Feasible Candidate Tracking', detail: 'If mid * mid <= N, mid is a valid floor sqrt candidate; record ans = mid and search right (low = mid + 1) for a tighter floor' },
    { id: 'overshoot-prune', label: '3. Overshoot Pruning', detail: 'If mid * mid > N, mid and all integers > mid are strictly too large; discard right half (high = mid - 1)' },
    { id: 'overflow-safety', label: '4. 64-Bit Integer Math', detail: 'Using 64-bit integers (long long in C++/Java) prevents mid * mid overflow when N is up to 2^31 - 1' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Binary Search for Integer Square Root
// Time Complexity: O(log N) | Space Complexity: O(1)
class Solution {
public:
    long long floorSqrt(long long n) {
        if (n == 0 || n == 1) return n;

        long long low = 1, high = n;
        long long ans = 1;

        while (low <= high) {
            long long mid = low + (high - low) / 2;
            long long square = mid * mid;

            if (square <= n) {
                ans = mid;      // Valid candidate, try larger
                low = mid + 1;
            } else {
                high = mid - 1; // Overshot, try smaller
            }
        }

        return ans;
    }
};`,
  python: `# Python 3 Optimal Binary Search for Sqrt
# Time Complexity: O(log N) | Space Complexity: O(1)
class Solution:
    def floorSqrt(self, n: int) -> int:
        if n == 0 or n == 1:
            return n

        low, high = 1, n
        ans = 1

        while low <= high:
            mid = (low + high) // 2
            val = mid * mid

            if val <= n:
                ans = mid
                low = mid + 1
            else:
                high = mid - 1

        return ans`,
  java: `// Java Optimal Binary Search for Sqrt
// Time Complexity: O(log N) | Space Complexity: O(1)
class Solution {
    public long floorSqrt(long n) {
        if (n == 0 || n == 1) return n;

        long low = 1, high = n;
        long ans = 1;

        while (low <= high) {
            long mid = low + (high - low) / 2;
            long val = mid * mid;

            if (val <= n) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return ans;
    }
}`,
  javascript: `// JavaScript Optimal Binary Search for Sqrt
// Time Complexity: O(log N) | Space Complexity: O(1)
var floorSqrt = function(n) {
    if (n === 0 || n === 1) return n;

    let low = 1, high = n;
    let ans = 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const val = mid * mid;

        if (val <= n) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return ans;
};`
};

export const steps = [
  {
    title: '1. Setup & Search Range Initialization: Target N = 28, Domain [1 ... 28]',
    phase: 'SETUP',
    track: {
      label: 'Candidate Integers Domain',
      items: [
        1, 2, 3, 4, 5, 6, 7, 8, 10, 14, 20, 28
      ],
      pointers: [
        { index: 0, label: 'low (1)' },
        { index: 11, label: 'high (28)' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 11,
    metrics: [
      { label: 'Target N', value: '28' },
      { label: 'Search low', value: '1' },
      { label: 'Search high', value: '28' },
      { label: 'Floor Sqrt (ans)', value: 'None yet' }
    ],
    variables: { n: 28, low: 1, high: 28, ans: 0 },
    formula: 'Find largest integer k in [1 .. N] such that k * k <= N',
    action: 'Initialize binary search domain [1 .. 28] with ans = 0',
    explain: 'We want to find the floor of sqrt(28). Since f(k) = k^2 is strictly monotonically increasing for positive k, we can binary search directly over candidate answer values [1..28].',
    intuition: 'Monotonicity of the squaring operation transforms an algebraic root problem into binary search on answer.'
  },
  {
    title: '2. Pass 1: mid = 14 -> 14² = 196 > 28 (Overshot!) -> Discard [14 ... 28]',
    phase: 'OVERSHOT',
    track: {
      label: 'Candidate Integers Domain',
      items: [
        1, 2, 3, 4, 5, 6, 7, 8, 10,
        { value: 14, status: 'discarded' },
        { value: 20, status: 'discarded' },
        { value: 28, status: 'discarded' }
      ],
      pointers: [
        { index: 0, label: 'low (1)' },
        { index: 9, label: 'mid (14)' },
        { index: 11, label: 'high (28)' }
      ]
    },
    activeI: 9,
    activeJ: null,
    windowStart: 0,
    windowEnd: 8,
    metrics: [
      { label: 'mid Guess', value: '14' },
      { label: 'mid²', value: '196', highlight: true },
      { label: 'Comparison', value: '196 > 28 (Too Large)' },
      { label: 'New high', value: 'mid - 1 = 13' }
    ],
    variables: { mid: 14, 'square = 14 * 14': 196, target: 28, action: 'high = mid - 1 = 13' },
    formula: 'mid = 1 + (28 - 1) / 2 = 14 | 14^2 = 196 > 28 ==> high = 13',
    action: '14 squared is 196 > 28; eliminate 14 and all candidates >= 14',
    explain: 'At mid = 14, 14 * 14 = 196. Because 196 is vastly greater than 28, no number >= 14 can possibly be the square root. We discard the entire upper range [14..28] by setting high = 13.',
    intuition: 'Cutting the upper half immediately eliminates large impossible squares.'
  },
  {
    title: '3. Pass 2: mid = 7 -> 7² = 49 > 28 (Overshot!) -> Discard [7 ... 13]',
    phase: 'OVERSHOT',
    track: {
      label: 'Candidate Integers Domain',
      items: [
        1, 2, 3, 4, 5, 6,
        { value: 7, status: 'discarded' },
        { value: 8, status: 'discarded' },
        { value: 10, status: 'discarded' },
        { value: 14, status: 'discarded' },
        { value: 20, status: 'discarded' },
        { value: 28, status: 'discarded' }
      ],
      pointers: [
        { index: 0, label: 'low (1)' },
        { index: 6, label: 'mid (7)' }
      ]
    },
    activeI: 6,
    activeJ: null,
    windowStart: 0,
    windowEnd: 5,
    metrics: [
      { label: 'mid Guess', value: '7' },
      { label: 'mid²', value: '49', highlight: true },
      { label: 'Comparison', value: '49 > 28 (Too Large)' },
      { label: 'New high', value: 'mid - 1 = 6' }
    ],
    variables: { low: 1, mid: 7, high: 13, '7 * 7': 49, action: 'high = mid - 1 = 6' },
    formula: 'mid = 1 + (13 - 1) / 2 = 7 | 7^2 = 49 > 28 ==> high = 6',
    action: '7 squared is 49 > 28; discard candidates >= 7; high becomes 6',
    explain: 'With low = 1 and high = 13, mid = 7. 7^2 = 49 > 28. Discard [7..13] and decrement high to 6. Search range is now [1..6].',
    intuition: 'Search space reduced from 28 to just 6 integers in two steps.'
  },
  {
    title: '4. Pass 3: mid = 3 -> 3² = 9 <= 28 (Valid Candidate!) -> ans = 3, Try Larger',
    phase: 'VALID_CANDIDATE',
    track: {
      label: 'Candidate Integers Domain',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 3, status: 'match' },
        4, 5, 6,
        { value: 7, status: 'discarded' },
        { value: 8, status: 'discarded' },
        { value: 10, status: 'discarded' },
        { value: 14, status: 'discarded' },
        { value: 20, status: 'discarded' },
        { value: 28, status: 'discarded' }
      ],
      pointers: [
        { index: 0, label: 'low (1)' },
        { index: 2, label: 'mid (3)' },
        { index: 5, label: 'high (6)' }
      ]
    },
    activeI: 2,
    activeJ: null,
    windowStart: 3,
    windowEnd: 5,
    metrics: [
      { label: 'mid Guess', value: '3' },
      { label: 'mid²', value: '9', highlight: true },
      { label: 'Comparison', value: '9 <= 28 (FEASIBLE)' },
      { label: 'Recorded ans', value: '3', highlight: true }
    ],
    variables: { low: 1, mid: 3, high: 6, ans: 3, 'action': 'low = mid + 1 = 4' },
    formula: 'mid = 1 + (6 - 1) / 2 = 3 | 3^2 = 9 <= 28 ==> ans = 3, low = 4',
    action: '3 is a valid integer square root! Save ans = 3; search higher candidates [4..6]',
    explain: 'At mid = 3, 3^2 = 9 <= 28. This proves that at least 3 is a valid integer floor square root. To check if an even larger integer also satisfies k^2 <= 28, we record ans = 3 and advance low = 4.',
    intuition: 'Greedily test if a tighter upper bound on the floor exists to the right.'
  },
  {
    title: '5. Pass 4: mid = 5 -> 5² = 25 <= 28 (Valid Candidate!) -> ans = 5, Try Larger',
    phase: 'VALID_CANDIDATE',
    track: {
      label: 'Candidate Integers Domain',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 4, status: 'current' },
        { value: 5, status: 'match' },
        6,
        { value: 7, status: 'discarded' },
        { value: 8, status: 'discarded' },
        { value: 10, status: 'discarded' },
        { value: 14, status: 'discarded' },
        { value: 20, status: 'discarded' },
        { value: 28, status: 'discarded' }
      ],
      pointers: [
        { index: 3, label: 'low (4)' },
        { index: 4, label: 'mid (5)' },
        { index: 5, label: 'high (6)' }
      ]
    },
    activeI: 4,
    activeJ: null,
    windowStart: 5,
    windowEnd: 5,
    metrics: [
      { label: 'mid Guess', value: '5' },
      { label: 'mid²', value: '25', highlight: true },
      { label: 'Comparison', value: '25 <= 28 (FEASIBLE)' },
      { label: 'Updated ans', value: '5', highlight: true }
    ],
    variables: { low: 4, mid: 5, high: 6, ans: 5, 'action': 'low = mid + 1 = 6' },
    formula: 'mid = 4 + (6 - 4) / 2 = 5 | 5^2 = 25 <= 28 ==> ans = 5, low = 6',
    action: '5 squared is 25 <= 28; update best ans = 5; advance low to 6',
    explain: 'mid = 5 gives 5^2 = 25 <= 28. 25 is remarkably close to 28! We update our best candidate ans to 5 and advance low to 6 to test the final remaining candidate 6.',
    intuition: 'We have tightened the candidate answer to 5.'
  },
  {
    title: '6. Pass 5: mid = 6 -> 6² = 36 > 28 (Overshot!) -> Discard 6',
    phase: 'OVERSHOT',
    track: {
      label: 'Candidate Integers Domain',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 5, status: 'match' },
        { value: 6, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 8, status: 'discarded' },
        { value: 10, status: 'discarded' },
        { value: 14, status: 'discarded' },
        { value: 20, status: 'discarded' },
        { value: 28, status: 'discarded' }
      ],
      pointers: [
        { index: 5, label: 'low/mid/high (6)' }
      ]
    },
    activeI: 5,
    activeJ: null,
    windowStart: 5,
    windowEnd: 4,
    metrics: [
      { label: 'mid Guess', value: '6' },
      { label: 'mid²', value: '36', highlight: true },
      { label: 'Comparison', value: '36 > 28 (Too Large)' },
      { label: 'New high', value: 'mid - 1 = 5' }
    ],
    variables: { low: 6, mid: 6, high: 6, ans: 5, '6 * 6': 36, action: 'high = mid - 1 = 5' },
    formula: 'mid = 6 + (6 - 6) / 2 = 6 | 6^2 = 36 > 28 ==> high = 5',
    action: '6 squared is 36 > 28; discard candidate 6; high decrements to 5',
    explain: 'At mid = 6, 6 * 6 = 36 > 28. 6 is too large! We decrement high to 5. Notice that now low = 6 and high = 5, which violates low <= high.',
    intuition: 'Candidate 6 exceeds the target, confirming that 5 is the maximum possible integer root.'
  },
  {
    title: '7. Search Interval Inversion: low (6) > high (5) -> Loop Terminates',
    phase: 'TERMINATION',
    track: {
      label: 'Candidate Integers Domain',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 5, status: 'match' },
        { value: 6, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 8, status: 'discarded' },
        { value: 10, status: 'discarded' },
        { value: 14, status: 'discarded' },
        { value: 20, status: 'discarded' },
        { value: 28, status: 'discarded' }
      ],
      pointers: [
        { index: 4, label: 'high (5)' },
        { index: 5, label: 'low (6)' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 4,
    windowEnd: 4,
    metrics: [
      { label: 'low Pointer', value: '6' },
      { label: 'high Pointer', value: '5' },
      { label: 'Condition low <= high', value: '6 <= 5 (FALSE)', highlight: true },
      { label: 'Final ans', value: '5', highlight: true }
    ],
    variables: { low: 6, high: 5, loopCondition: 'low <= high is False', ans: 5 },
    formula: 'low (6) > high (5) ==> Binary search loop terminates with ans = 5',
    action: 'Domain exhausted: low crossed high; return stored candidate ans = 5',
    explain: 'The pointers have crossed (low = 6, high = 5). The binary search has examined all possible candidate ranges. The maximum integer whose square does not exceed 28 is precisely ans = 5.',
    intuition: 'Whenever binary search terminates, high points to the floor boundary and ans holds the maximum valid value.'
  },
  {
    title: '8. Mathematical Verification & Complexity: Floor(sqrt(28)) = 5',
    phase: 'COMPLETED',
    track: {
      label: 'Candidate Integers Domain',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 5, status: 'match' },
        { value: 6, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 8, status: 'discarded' },
        { value: 10, status: 'discarded' },
        { value: 14, status: 'discarded' },
        { value: 20, status: 'discarded' },
        { value: 28, status: 'discarded' }
      ],
      pointers: [
        { index: 4, label: 'Floor Sqrt = 5' }
      ]
    },
    activeI: 4,
    activeJ: null,
    windowStart: 4,
    windowEnd: 4,
    metrics: [
      { label: 'Floor Sqrt Result', value: '5', highlight: true },
      { label: 'Mathematical Check', value: '5² = 25 <= 28 < 36 = 6²' },
      { label: 'Time Complexity', value: 'O(log N)' },
      { label: 'Space Complexity', value: 'O(1) Auxiliary' }
    ],
    variables: { result: 5, '5^2': 25, '6^2': 36, n: 28, timeComplexity: 'O(log N)' },
    formula: '25 <= 28 < 36 ==> floor(sqrt(28)) = 5 in O(log N) iterations',
    action: 'Algorithm successfully finishes in 5 iterations for N = 28',
    explain: 'Binary search on answers solved floor(sqrt(N)) in ceil(log2(28)) = 5 iterations compared to 28 sequential checks. Works universally up to N = 10^18 using 64-bit integer types.',
    intuition: 'Binary Search on Answer converts any monotonic decision problem into a fast logarithmic solver.'
  }
];

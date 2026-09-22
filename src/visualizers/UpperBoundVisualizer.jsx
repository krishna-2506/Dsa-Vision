// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Upper Bound in Sorted Array',
  category: 'Binary Search',
  difficulty: 'Easy',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the smallest index i such that arr[i] > target (strictly greater than target) using logarithmic Binary Search. If no element is greater, returns array length N.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Upper Bound Binary Search Invariant',
  nodes: [
    { id: 'root', label: 'Upper Bound Invariant', children: ['strict-inequality', 'duplicate-bypass', 'candidate-recording', 'range-relationship'] },
    { id: 'strict-inequality', label: '1. Strict Predicate arr[i] > target', detail: 'Unlike lower bound (>=), upper bound strictly demands arr[i] > target' },
    { id: 'duplicate-bypass', label: '2. Duplicate Bypassing', detail: 'When arr[mid] <= target (including equality), the element is discarded by low = mid + 1' },
    { id: 'candidate-recording', label: '3. Candidate Recording', detail: 'When arr[mid] > target, mid is valid; record ans = mid and search left (high = mid - 1)' },
    { id: 'range-relationship', label: '4. Count & Range Lemma', detail: 'All occurrences of target lie in [lower_bound, upper_bound - 1]; count = upper_bound - lower_bound' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Upper Bound Implementation
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int upperBound(vector<int>& arr, int target) {
        int n = arr.size();
        int low = 0, high = n - 1;
        int ans = n; // Default to n if not found

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] > target) {
                ans = mid;      // Valid upper bound candidate
                high = mid - 1; // Look for smaller index on the left
            } else {
                low = mid + 1;  // arr[mid] <= target, must search right
            }
        }

        return ans;
    }
};`,
  python: `# Python 3 Optimal Upper Bound Implementation
# Time Complexity: O(log N) | Space Complexity: O(1)
class Solution:
    def upperBound(self, arr: list[int], target: int) -> int:
        low, high = 0, len(arr) - 1
        ans = len(arr)

        while low <= high:
            mid = (low + high) // 2

            if arr[mid] > target:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans`,
  java: `// Java Optimal Upper Bound Implementation
// Time Complexity: O(log N) | Space Complexity: O(1)
class Solution {
    public int upperBound(int[] arr, int target) {
        int n = arr.length;
        int low = 0, high = n - 1;
        int ans = n;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] > target) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }
}`,
  javascript: `// JavaScript Optimal Upper Bound Implementation
// Time Complexity: O(log N) | Space Complexity: O(1)
var upperBound = function(arr, target) {
    let low = 0, high = arr.length - 1;
    let ans = arr.length;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (arr[mid] > target) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return ans;
};`
};

export const steps = [
  {
    title: '1. Initialize Range: arr = [1, 2, 4, 4, 6, 8, 10], Target = 4',
    phase: 'SETUP',
    track: {
      label: 'Sorted Array arr',
      items: [1, 2, 4, 4, 6, 8, 10],
      pointers: [
        { index: 0, label: 'low' },
        { index: 6, label: 'high' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 6,
    metrics: [
      { label: 'Target Value', value: '4' },
      { label: 'Search Range', value: '[0 ... 6]' },
      { label: 'Initial ans', value: 'N = 7' },
      { label: 'Predicate', value: 'arr[i] > target (Strictly Greater)' }
    ],
    variables: { low: 0, high: 6, target: 4, ans: 7, n: 7 },
    formula: 'Upper Bound = smallest index i such that arr[i] > target',
    action: 'Initialize binary search pointers low = 0, high = 6 with default ans = N = 7',
    explain: 'Upper bound finds the earliest element strictly greater than target (> 4). Notice that duplicate 4s appear at indices 2 and 3; the upper bound must skip over both of them.',
    intuition: 'Upper bound points directly to the first element following the block of targets.'
  },
  {
    title: '2. Pass 1: Compute mid = 3 -> arr[3] = 4 > 4 (Predicate FALSE)',
    phase: 'EVALUATE_MID',
    track: {
      label: 'Sorted Array arr',
      items: [
        1, 2, 4,
        { value: 4, status: 'current' },
        6, 8, 10
      ],
      pointers: [
        { index: 0, label: 'low' },
        { index: 3, label: 'mid' },
        { index: 6, label: 'high' }
      ]
    },
    activeI: 3,
    activeJ: null,
    windowStart: 0,
    windowEnd: 6,
    metrics: [
      { label: 'mid Index', value: '3' },
      { label: 'arr[mid]', value: '4', highlight: true },
      { label: 'Predicate Check', value: '4 > 4 (FALSE: Equal is not Greater)', highlight: true },
      { label: 'Target', value: '4' }
    ],
    variables: { low: 0, mid: 3, high: 6, 'arr[mid]': 4, target: 4, condition: 'arr[mid] > target' },
    formula: 'mid = 0 + (6 - 0) / 2 = 3 | arr[3] = 4 is NOT > 4',
    action: 'Evaluate mid index 3: arr[3] = 4 is equal to target, not strictly greater',
    explain: 'At mid = 3, arr[3] = 4. Since 4 is not strictly greater than 4, the upper bound condition fails. Elements equal to target are not upper bounds.',
    intuition: 'Equal values are rejected; upper bound requires strictly greater.'
  },
  {
    title: '3. Pass 1 Update: Discard Left Half [0 ... 3] -> Advance low = 4',
    phase: 'ELIMINATE_LEFT',
    track: {
      label: 'Sorted Array arr',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 4, status: 'discarded' },
        6, 8, 10
      ],
      pointers: [
        { index: 4, label: 'low' },
        { index: 6, label: 'high' }
      ]
    },
    activeI: 3,
    activeJ: null,
    windowStart: 4,
    windowEnd: 6,
    metrics: [
      { label: 'Comparison', value: '4 <= 4 (Bypass Duplicates)', highlight: true },
      { label: 'Discarded Range', value: '[0 ... 3]' },
      { label: 'New Search Window', value: '[4 ... 6]' },
      { label: 'low updated to', value: 'mid + 1 = 4' }
    ],
    variables: { low: 4, high: 6, ans: 7, action: 'low = mid + 1 = 4' },
    formula: 'arr[mid] <= target ==> low = mid + 1 = 4',
    action: 'Discard indices 0 through 3; advance low to 4 to search for strictly greater elements',
    explain: 'Because arr[3] <= 4, all indices from 0 to 3 contain values <= 4 and cannot be strictly greater than 4. We advance low to 4.',
    intuition: 'Bypassing the entire left half including all occurrences of target.'
  },
  {
    title: '4. Pass 2: Compute mid = 5 -> arr[5] = 8 > 4 (Predicate TRUE)',
    phase: 'EVALUATE_MID',
    track: {
      label: 'Sorted Array arr',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 4, status: 'discarded' },
        6,
        { value: 8, status: 'match' },
        10
      ],
      pointers: [
        { index: 4, label: 'low' },
        { index: 5, label: 'mid' },
        { index: 6, label: 'high' }
      ]
    },
    activeI: 5,
    activeJ: null,
    windowStart: 4,
    windowEnd: 6,
    metrics: [
      { label: 'mid Index', value: '5' },
      { label: 'arr[mid]', value: '8', highlight: true },
      { label: 'Predicate Check', value: '8 > 4 (TRUE)', highlight: true },
      { label: 'Target', value: '4' }
    ],
    variables: { low: 4, mid: 5, high: 6, 'arr[mid]': 8, target: 4 },
    formula: 'mid = 4 + (6 - 4) / 2 = 5 | arr[5] = 8 > 4',
    action: 'Evaluate mid index 5: arr[5] = 8 is strictly greater than target 4',
    explain: 'At mid = 5, arr[5] = 8 > 4. Index 5 is a valid upper bound candidate. We record ans = 5.',
    intuition: 'Valid candidate found; check if an earlier index between [4..4] is also > 4.'
  },
  {
    title: '5. Pass 2 Update: Record ans = 5 -> Explore Left Half [4 ... 4] via high = 4',
    phase: 'CANDIDATE_RECORDED',
    track: {
      label: 'Sorted Array arr',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 4, status: 'discarded' },
        6,
        { value: 8, status: 'match' },
        { value: 10, status: 'discarded' }
      ],
      pointers: [
        { index: 4, label: 'low/high' }
      ]
    },
    activeI: 5,
    activeJ: null,
    windowStart: 4,
    windowEnd: 4,
    metrics: [
      { label: 'Recorded ans', value: 'Index 5', highlight: true },
      { label: 'Discarded Range', value: '[5 ... 6]' },
      { label: 'New Search Window', value: '[4 ... 4]' },
      { label: 'high updated to', value: 'mid - 1 = 4' }
    ],
    variables: { low: 4, high: 4, ans: 5, action: 'high = mid - 1 = 4' },
    formula: 'arr[mid] > target ==> ans = mid = 5, high = mid - 1 = 4',
    action: 'Save ans = 5 and narrow search leftward to index 4',
    explain: 'Index 5 is valid, so any index to its right cannot be the smallest index > 4. We set high = 4 to check index 4.',
    intuition: 'Greedily probing the leftmost candidate.'
  },
  {
    title: '6. Pass 3: Compute mid = 4 -> arr[4] = 6 > 4 (Predicate TRUE)',
    phase: 'EVALUATE_MID',
    track: {
      label: 'Sorted Array arr',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 6, status: 'match' },
        { value: 8, status: 'discarded' },
        { value: 10, status: 'discarded' }
      ],
      pointers: [
        { index: 4, label: 'low/mid/high' }
      ]
    },
    activeI: 4,
    activeJ: null,
    windowStart: 4,
    windowEnd: 4,
    metrics: [
      { label: 'mid Index', value: '4' },
      { label: 'arr[mid]', value: '6', highlight: true },
      { label: 'Predicate Check', value: '6 > 4 (TRUE)', highlight: true },
      { label: 'Updated ans', value: 'Index 4', highlight: true }
    ],
    variables: { low: 4, mid: 4, high: 4, 'arr[mid]': 6, target: 4, ans: 4 },
    formula: 'mid = 4 + (4 - 4) / 2 = 4 | arr[4] = 6 > 4 ==> ans = 4, high = 3',
    action: 'arr[4] = 6 is strictly greater than 4; update ans = 4 and decrement high to 3',
    explain: 'At mid = 4, arr[4] = 6 > 4. We update ans = 4 and set high = mid - 1 = 3. Now low (4) > high (3).',
    intuition: 'Tighter upper bound found at index 4.'
  },
  {
    title: '7. Search Interval Inversion: low (4) > high (3) -> Loop Terminates',
    phase: 'TERMINATION',
    track: {
      label: 'Sorted Array arr',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 6, status: 'match' },
        { value: 8, status: 'discarded' },
        { value: 10, status: 'discarded' }
      ],
      pointers: [
        { index: 3, label: 'high (3)' },
        { index: 4, label: 'low (4) / ans' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 4,
    windowEnd: 3,
    metrics: [
      { label: 'low Pointer', value: '4' },
      { label: 'high Pointer', value: '3' },
      { label: 'Condition low <= high', value: '4 <= 3 (FALSE)', highlight: true },
      { label: 'Final ans', value: 'Index 4 (val 6)', highlight: true }
    ],
    variables: { low: 4, high: 3, ans: 4, loopTerminated: true },
    formula: 'low (4) > high (3) ==> Loop terminates with ans = 4',
    action: 'Domain exhausted: low crossed high; return stored candidate ans = 4',
    explain: 'Binary search terminates. Index 4 is definitively the first element strictly greater than target 4.',
    intuition: 'High and low pointers have fully partitioned the search domain.'
  },
  {
    title: '8. Complexity & Invariant Analysis: Upper Bound = Index 4',
    phase: 'COMPLETED',
    track: {
      label: 'Sorted Array arr',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 4, status: 'current' },
        { value: 4, status: 'current' },
        { value: 6, status: 'match' },
        { value: 8, status: 'current' },
        { value: 10, status: 'current' }
      ],
      pointers: [
        { index: 4, label: 'Upper Bound (Index 4)' }
      ]
    },
    activeI: 4,
    activeJ: null,
    windowStart: 4,
    windowEnd: 6,
    metrics: [
      { label: 'Upper Bound Index', value: '4', highlight: true },
      { label: 'Element Value', value: 'arr[4] = 6', highlight: true },
      { label: 'Target Duplicates Range', value: '[2 ... 3]' },
      { label: 'Count of Target 4', value: 'UB - LB = 4 - 2 = 2' }
    ],
    variables: { resultIndex: 4, resultValue: 6, lowerBound: 2, upperBound: 4, frequency: 2, timeComplexity: 'O(log N)' },
    formula: 'Frequency of Target = UpperBound(4) - LowerBound(4) = 4 - 2 = 2',
    action: 'Upper bound search complete in 3 steps with zero additional space',
    explain: 'The upper bound is index 4. Combined with lower bound (index 2), we see that target 4 occupies the contiguous interval [2..3]. The number of occurrences is exactly upperBound - lowerBound = 4 - 2 = 2.',
    intuition: 'Upper bound completes the exact interval description of any element in sorted data.'
  }
];

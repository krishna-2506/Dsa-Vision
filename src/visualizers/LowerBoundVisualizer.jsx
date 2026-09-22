// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Lower Bound in Sorted Array',
  category: 'Binary Search',
  difficulty: 'Easy',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the smallest index i such that arr[i] >= target using standard logarithmic Binary Search. If no element satisfies the condition, returns the length of the array N.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Lower Bound Binary Search Invariant',
  nodes: [
    { id: 'root', label: 'Lower Bound Invariant', children: ['predicate-definition', 'candidate-recording', 'left-exploration', 'exhaustion-proof'] },
    { id: 'predicate-definition', label: '1. Monotonic Predicate arr[i] >= target', detail: 'Because the array is sorted, arr[i] >= target forms a monotonic sequence of Falses followed by Trues' },
    { id: 'candidate-recording', label: '2. Candidate Recording', detail: 'When arr[mid] >= target, mid is a valid lower bound candidate; record ans = mid' },
    { id: 'left-exploration', label: '3. Greedy Left Exploration', detail: 'An even smaller index with arr[i] >= target might exist to the left; narrow search via high = mid - 1' },
    { id: 'exhaustion-proof', label: '4. Termination Invariant', detail: 'When low > high, ans holds the exact smallest index satisfying the predicate, or N if target > all elements' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Lower Bound Implementation
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int lowerBound(vector<int>& arr, int target) {
        int n = arr.size();
        int low = 0, high = n - 1;
        int ans = n; // Default to n if not found

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] >= target) {
                ans = mid;      // Valid lower bound candidate
                high = mid - 1; // Look for smaller index on the left
            } else {
                low = mid + 1;  // Element too small, must look right
            }
        }

        return ans;
    }
};`,
  python: `# Python 3 Optimal Lower Bound Implementation
# Time Complexity: O(log N) | Space Complexity: O(1)
class Solution:
    def lowerBound(self, arr: list[int], target: int) -> int:
        low, high = 0, len(arr) - 1
        ans = len(arr)

        while low <= high:
            mid = (low + high) // 2

            if arr[mid] >= target:
                ans = mid
                high = mid - 1  # Look for earlier valid index
            else:
                low = mid + 1

        return ans`,
  java: `// Java Optimal Lower Bound Implementation
// Time Complexity: O(log N) | Space Complexity: O(1)
class Solution {
    public int lowerBound(int[] arr, int target) {
        int n = arr.length;
        int low = 0, high = n - 1;
        int ans = n;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (arr[mid] >= target) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }
}`,
  javascript: `// JavaScript Optimal Lower Bound Implementation
// Time Complexity: O(log N) | Space Complexity: O(1)
var lowerBound = function(arr, target) {
    let low = 0, high = arr.length - 1;
    let ans = arr.length;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (arr[mid] >= target) {
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
    title: '1. Initialize Range: arr = [1, 2, 4, 6, 8, 10, 12], Target = 6',
    phase: 'SETUP',
    track: {
      label: 'Sorted Array arr',
      items: [1, 2, 4, 6, 8, 10, 12],
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
      { label: 'Target Value', value: '6' },
      { label: 'Search Range', value: '[0 ... 6]' },
      { label: 'Initial ans', value: 'N = 7' },
      { label: 'Predicate', value: 'arr[i] >= target' }
    ],
    variables: { low: 0, high: 6, target: 6, ans: 7, n: 7 },
    formula: 'Lower Bound = smallest index i such that arr[i] >= target',
    action: 'Initialize binary search pointers low = 0, high = 6 with default ans = N = 7',
    explain: 'Lower bound seeks the earliest position in the array where the value is at least target (>= 6). If every element in the array is smaller than target, the result is the array length N.',
    intuition: 'Sorting guarantees that once arr[i] >= target becomes true, it remains true for all subsequent indices.'
  },
  {
    title: '2. Pass 1: Compute mid = 3 -> arr[3] = 6 >= 6 (Predicate TRUE)',
    phase: 'EVALUATE_MID',
    track: {
      label: 'Sorted Array arr',
      items: [
        1, 2, 4,
        { value: 6, status: 'match' },
        8, 10, 12
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
      { label: 'arr[mid]', value: '6', highlight: true },
      { label: 'Predicate Check', value: '6 >= 6 (TRUE)', highlight: true },
      { label: 'Target', value: '6' }
    ],
    variables: { low: 0, mid: 3, high: 6, 'arr[mid]': 6, target: 6, condition: 'arr[mid] >= target' },
    formula: 'mid = 0 + (6 - 0) / 2 = 3 | arr[3] = 6 >= 6',
    action: 'Evaluate mid index 3: arr[3] = 6 satisfies arr[mid] >= 6',
    explain: 'At mid = 3, arr[3] = 6 >= 6 is satisfied. Index 3 is a valid candidate for the lower bound. We save ans = 3.',
    intuition: 'We have found an element >= target, but need to check if an earlier one exists.'
  },
  {
    title: '3. Pass 1 Update: Record ans = 3 -> Explore Left Half [0 ... 2] via high = 2',
    phase: 'CANDIDATE_RECORDED',
    track: {
      label: 'Sorted Array arr',
      items: [
        1, 2, 4,
        { value: 6, status: 'match' },
        { value: 8, status: 'discarded' },
        { value: 10, status: 'discarded' },
        { value: 12, status: 'discarded' }
      ],
      pointers: [
        { index: 0, label: 'low' },
        { index: 2, label: 'high' }
      ]
    },
    activeI: 3,
    activeJ: null,
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'Recorded ans', value: 'Index 3', highlight: true },
      { label: 'Discarded Range', value: '[3 ... 6]' },
      { label: 'New Search Window', value: '[0 ... 2]' },
      { label: 'high updated to', value: 'mid - 1 = 2' }
    ],
    variables: { low: 0, high: 2, ans: 3, action: 'high = mid - 1 = 2' },
    formula: 'arr[mid] >= target ==> ans = mid = 3, high = mid - 1 = 2',
    action: 'Save ans = 3 and eliminate right subarray [3..6] by setting high = 2',
    explain: 'Because index 3 satisfies the condition, any index to the right (4, 5, 6) cannot be the smallest index. We discard [3..6] and search the left interval [0..2] to see if an even smaller index qualifies.',
    intuition: 'Greedily tighten toward the earliest boundary on the left.'
  },
  {
    title: '4. Pass 2: Compute mid = 1 -> arr[1] = 2 < 6 (Predicate FALSE)',
    phase: 'EVALUATE_MID',
    track: {
      label: 'Sorted Array arr',
      items: [
        1,
        { value: 2, status: 'current' },
        4,
        { value: 6, status: 'match' },
        { value: 8, status: 'discarded' },
        { value: 10, status: 'discarded' },
        { value: 12, status: 'discarded' }
      ],
      pointers: [
        { index: 0, label: 'low' },
        { index: 1, label: 'mid' },
        { index: 2, label: 'high' }
      ]
    },
    activeI: 1,
    activeJ: null,
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'mid Index', value: '1' },
      { label: 'arr[mid]', value: '2', highlight: true },
      { label: 'Predicate Check', value: '2 >= 6 (FALSE)', highlight: true },
      { label: 'Target', value: '6' }
    ],
    variables: { low: 0, mid: 1, high: 2, 'arr[mid]': 2, target: 6 },
    formula: 'mid = 0 + (2 - 0) / 2 = 1 | arr[1] = 2 < 6',
    action: 'Evaluate mid index 1: arr[1] = 2 is strictly less than target 6',
    explain: 'At mid = 1, arr[1] = 2. Since 2 < 6, the predicate arr[i] >= 6 fails. Index 1 and all elements to its left cannot satisfy the lower bound.',
    intuition: 'Value is too small; the lower bound must lie strictly to the right.'
  },
  {
    title: '5. Pass 2 Update: Discard Left Half [0 ... 1] -> Advance low = 2',
    phase: 'ELIMINATE_LEFT',
    track: {
      label: 'Sorted Array arr',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        4,
        { value: 6, status: 'match' },
        { value: 8, status: 'discarded' },
        { value: 10, status: 'discarded' },
        { value: 12, status: 'discarded' }
      ],
      pointers: [
        { index: 2, label: 'low/high' }
      ]
    },
    activeI: 1,
    activeJ: null,
    windowStart: 2,
    windowEnd: 2,
    metrics: [
      { label: 'Comparison', value: '2 < 6 (Too Small)', highlight: true },
      { label: 'Discarded Indices', value: '[0 ... 1]' },
      { label: 'New Search Window', value: '[2 ... 2]' },
      { label: 'low updated to', value: 'mid + 1 = 2' }
    ],
    variables: { low: 2, high: 2, ans: 3, action: 'low = mid + 1 = 2' },
    formula: 'arr[mid] < target ==> low = mid + 1 = 2',
    action: 'Discard elements <= 1; advance low to index 2',
    explain: 'Because arr[1]=2 is too small, elements at index 0 and 1 are ruled out. Search interval shrinks to the single element at index 2.',
    intuition: 'Search space reduced to index 2.'
  },
  {
    title: '6. Pass 3: Compute mid = 2 -> arr[2] = 4 < 6 (Predicate FALSE)',
    phase: 'EVALUATE_MID',
    track: {
      label: 'Sorted Array arr',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 4, status: 'current' },
        { value: 6, status: 'match' },
        { value: 8, status: 'discarded' },
        { value: 10, status: 'discarded' },
        { value: 12, status: 'discarded' }
      ],
      pointers: [
        { index: 2, label: 'low/mid/high' }
      ]
    },
    activeI: 2,
    activeJ: null,
    windowStart: 2,
    windowEnd: 2,
    metrics: [
      { label: 'mid Index', value: '2' },
      { label: 'arr[mid]', value: '4', highlight: true },
      { label: 'Predicate Check', value: '4 >= 6 (FALSE)', highlight: true },
      { label: 'Current Best ans', value: 'Index 3' }
    ],
    variables: { low: 2, mid: 2, high: 2, 'arr[mid]': 4, target: 6, ans: 3 },
    formula: 'mid = 2 + (2 - 2) / 2 = 2 | arr[2] = 4 < 6',
    action: 'Evaluate index 2: arr[2] = 4 is less than 6; advance low to 3',
    explain: 'At mid = 2, arr[2] = 4 < 6. Index 2 does not satisfy the lower bound. We advance low = mid + 1 = 3.',
    intuition: 'Index 2 ruled out; now low crosses high.'
  },
  {
    title: '7. Search Interval Inversion: low (3) > high (2) -> Loop Terminates',
    phase: 'TERMINATION',
    track: {
      label: 'Sorted Array arr',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 6, status: 'match' },
        { value: 8, status: 'discarded' },
        { value: 10, status: 'discarded' },
        { value: 12, status: 'discarded' }
      ],
      pointers: [
        { index: 2, label: 'high (2)' },
        { index: 3, label: 'low (3) / ans' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 3,
    windowEnd: 2,
    metrics: [
      { label: 'low Pointer', value: '3' },
      { label: 'high Pointer', value: '2' },
      { label: 'Condition low <= high', value: '3 <= 2 (FALSE)', highlight: true },
      { label: 'Final ans', value: 'Index 3 (val 6)', highlight: true }
    ],
    variables: { low: 3, high: 2, ans: 3, loopTerminated: true },
    formula: 'low (3) > high (2) ==> Binary search loop terminates with ans = 3',
    action: 'Pointers crossed; search interval exhausted; return stored candidate ans = 3',
    explain: 'low (3) has exceeded high (2). All candidate partitions have been definitively classified. The recorded answer ans = 3 is the exact lower bound.',
    intuition: 'Binary search terminates precisely when the boundary between < target and >= target is established.'
  },
  {
    title: '8. Complexity & Invariant Analysis: Lower Bound = Index 3',
    phase: 'COMPLETED',
    track: {
      label: 'Sorted Array arr',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 6, status: 'match' },
        { value: 8, status: 'current' },
        { value: 10, status: 'current' },
        { value: 12, status: 'current' }
      ],
      pointers: [
        { index: 3, label: 'Lower Bound (Index 3)' }
      ]
    },
    activeI: 3,
    activeJ: null,
    windowStart: 3,
    windowEnd: 6,
    metrics: [
      { label: 'Lower Bound Index', value: '3', highlight: true },
      { label: 'Element Value', value: 'arr[3] = 6', highlight: true },
      { label: 'Time Complexity', value: 'O(log N)' },
      { label: 'Space Complexity', value: 'O(1) Auxiliary' }
    ],
    variables: { resultIndex: 3, resultValue: 6, target: 6, comparisons: 3, timeComplexity: 'O(log N)' },
    formula: 'arr[2] = 4 < 6 <= arr[3] = 6 ==> Index 3 is strictly the Lower Bound',
    action: 'Lower bound algorithm finishes in 3 steps for N = 7',
    explain: 'The lower bound index is 3 with value 6. It cleanly demarcates elements strictly less than 6 (indices 0..2) from elements greater than or equal to 6 (indices 3..6).',
    intuition: 'Lower bound forms the backbone of frequency counts, range queries, and coordinate compression.'
  }
];

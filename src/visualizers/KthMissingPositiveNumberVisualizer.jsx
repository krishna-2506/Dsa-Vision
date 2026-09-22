// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Kth Missing Positive Number',
  category: 'Binary Search on Sorted Arrays',
  difficulty: 'Medium',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the Kth missing positive integer from a strictly increasing array using logarithmic binary search on missing element counts: missing(i) = arr[i] - (i + 1).'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Kth Missing Positive Binary Search Invariant',
  nodes: [
    { id: 'root', label: 'Missing Count Strategy', children: ['missing-formula', 'monotonic-missing', 'binary-halving', 'algebraic-offset'] },
    { id: 'missing-formula', label: '1. Exact Missing Count Formula', detail: 'At index i, the number of missing positive integers before arr[i] is exactly missing(i) = arr[i] - (i + 1)' },
    { id: 'monotonic-missing', label: '2. Monotonicity of Missing Counts', detail: 'Because arr is strictly increasing, missing(i) is monotonically non-decreasing' },
    { id: 'binary-halving', label: '3. Binary Search on Missing Count', detail: 'If missing(mid) < k, the k-th missing number is strictly to the right (low = mid + 1); else search left (high = mid - 1)' },
    { id: 'algebraic-offset', label: '4. Algebraic Offset Resolution', detail: 'At termination, high and low sandwich the answer. ans = arr[high] + (k - missing(high)) = high + 1 + k = low + k' }
  ]
};

export const solutions = {
  cpp: `// C++ Kth Missing Positive Number
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int findKthPositive(vector<int>& arr, int k) {
        int low = 0, high = (int)arr.size() - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int missing = arr[mid] - (mid + 1);

            if (missing < k) {
                low = mid + 1; // kth missing is to the right
            } else {
                high = mid - 1; // kth missing is to the left
            }
        }

        // Formula: arr[high] + (k - missing(high)) = low + k
        return low + k;
    }
};`,
  python: `# Python 3 Kth Missing Positive Number
# Time Complexity: O(log N) | Space Complexity: O(1)
class Solution:
    def findKthPositive(self, arr: list[int], k: int) -> int:
        low, high = 0, len(arr) - 1

        while low <= high:
            mid = (low + high) // 2
            missing = arr[mid] - (mid + 1)

            if missing < k:
                low = mid + 1
            else:
                high = mid - 1

        return low + k`,
  java: `// Java Kth Missing Positive Number
// Time Complexity: O(log N) | Space Complexity: O(1)
class Solution {
    public int findKthPositive(int[] arr, int k) {
        int low = 0, high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int missing = arr[mid] - (mid + 1);

            if (missing < k) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return low + k;
    }
}`,
  javascript: `// JavaScript Kth Missing Positive Number
// Time Complexity: O(log N) | Space Complexity: O(1)
var findKthPositive = function(arr, k) {
    let low = 0, high = arr.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const missing = arr[mid] - (mid + 1);

        if (missing < k) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return low + k;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: arr = [2, 3, 4, 7, 11], K = 5',
    phase: 'SETUP',
    track: {
      label: 'Sorted Array arr[i]',
      items: [2, 3, 4, 7, 11],
      pointers: [
        { index: 0, label: 'low' },
        { index: 4, label: 'high' }
      ]
    },
    auxiliaryTrack: {
      label: 'Missing Count Function: missing(i) = arr[i] - (i + 1)',
      items: ['missing(0)=1', 'missing(1)=1', 'missing(2)=1', 'missing(3)=3', 'missing(4)=6']
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Array Size N', value: '5' },
      { label: 'Target K', value: '5th missing' },
      { label: 'Search Range', value: '[0 ... 4]' },
      { label: 'Formula', value: 'missing(i) = arr[i] - (i + 1)' }
    ],
    variables: { k: 5, low: 0, high: 4, array: '[2, 3, 4, 7, 11]' },
    formula: 'If no numbers were missing, arr[i] would equal i + 1. Hence missing(i) = arr[i] - (i + 1)',
    action: 'Initialize binary search pointers low = 0, high = 4 on missing count function',
    explain: 'Missing numbers before 11 are [1, 5, 6, 8, 9, 10]. We want the 5th missing number. Instead of checking linearly, we compute the count of missing numbers before each index in O(1) and binary search.',
    intuition: 'Monotonicity of missing(i) converts this into boundary binary search.'
  },
  {
    title: '2. Pass 1: Compute mid = 2 -> arr[2] = 4 -> missing(2) = 4 - 3 = 1',
    phase: 'EVALUATE_MID',
    track: {
      label: 'Sorted Array arr[i]',
      items: [
        2, 3,
        { value: 4, status: 'current' },
        7, 11
      ],
      pointers: [
        { index: 0, label: 'low' },
        { index: 2, label: 'mid' },
        { index: 4, label: 'high' }
      ]
    },
    auxiliaryTrack: {
      label: 'Missing Counts at Current Step',
      items: [
        { value: '1', status: 'current' },
        { value: '1', status: 'current' },
        { value: 'missing = 1', status: 'match' },
        3, 6
      ]
    },
    activeI: 2,
    activeJ: null,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'mid Index', value: '2' },
      { label: 'arr[mid]', value: '4' },
      { label: 'Missing Before mid', value: '4 - (2 + 1) = 1', highlight: true },
      { label: 'Target K', value: '5' }
    ],
    variables: { low: 0, mid: 2, high: 4, 'arr[mid]': 4, missing: 1, k: 5 },
    formula: 'missing(2) = arr[2] - (2 + 1) = 4 - 3 = 1 < 5',
    action: 'Evaluate mid = 2: only 1 number is missing before arr[2] = 4 (number 1)',
    explain: 'Before index 2, only 1 positive integer is missing (namely 1). Since 1 < k (5), the 5th missing number must appear to the right of index 2.',
    intuition: 'Missing count 1 is far below target 5; search right.'
  },
  {
    title: '3. Pass 1 Decision: missing(2) = 1 < 5 -> Advance low = 3',
    phase: 'ELIMINATE_LEFT',
    track: {
      label: 'Sorted Array arr[i]',
      items: [
        { value: 2, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 4, status: 'discarded' },
        7, 11
      ],
      pointers: [
        { index: 3, label: 'low' },
        { index: 4, label: 'high' }
      ]
    },
    auxiliaryTrack: {
      label: 'Remaining Search Domain: [Index 3 ... 4]',
      items: [
        { value: 'x', status: 'discarded' },
        { value: 'x', status: 'discarded' },
        { value: 'x', status: 'discarded' },
        { value: 'missing = 3', status: 'current' },
        { value: 'missing = 6', status: 'current' }
      ]
    },
    activeI: 2,
    activeJ: null,
    windowStart: 3,
    windowEnd: 4,
    metrics: [
      { label: 'Comparison', value: 'missing (1) < K (5)', highlight: true },
      { label: 'Discarded Indices', value: '[0 ... 2]' },
      { label: 'New Search Range', value: '[3 ... 4]' },
      { label: 'low updated to', value: 'mid + 1 = 3' }
    ],
    variables: { low: 3, high: 4, k: 5, action: 'low = mid + 1 = 3' },
    formula: 'missing(mid) < k ==> low = mid + 1 = 3',
    action: 'Eliminate left half [0..2]; advance low to index 3',
    explain: 'Because only 1 number is missing before index 2, the 5th missing number cannot be <= 4. We advance low to 3.',
    intuition: 'Narrowing down to the interval containing the 5th missing integer.'
  },
  {
    title: '4. Pass 2: Compute mid = 3 -> arr[3] = 7 -> missing(3) = 7 - 4 = 3',
    phase: 'EVALUATE_MID',
    track: {
      label: 'Sorted Array arr[i]',
      items: [
        { value: 2, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 7, status: 'current' },
        11
      ],
      pointers: [
        { index: 3, label: 'low/mid' },
        { index: 4, label: 'high' }
      ]
    },
    activeI: 3,
    activeJ: null,
    windowStart: 3,
    windowEnd: 4,
    metrics: [
      { label: 'mid Index', value: '3' },
      { label: 'arr[mid]', value: '7' },
      { label: 'Missing Before mid', value: '7 - (3 + 1) = 3', highlight: true },
      { label: 'Target K', value: '5' }
    ],
    variables: { low: 3, mid: 3, high: 4, 'arr[mid]': 7, missing: 3, k: 5 },
    formula: 'missing(3) = arr[3] - (3 + 1) = 7 - 4 = 3 < 5',
    action: 'Evaluate mid = 3: 3 numbers are missing before arr[3] = 7 (numbers 1, 5, 6)',
    explain: 'Before index 3, exactly 3 numbers are missing: {1, 5, 6}. Since 3 < 5, the 5th missing number must still be to the right of index 3.',
    intuition: 'Still need 2 more missing numbers beyond index 3.'
  },
  {
    title: '5. Pass 2 Decision: missing(3) = 3 < 5 -> Advance low = 4',
    phase: 'ELIMINATE_LEFT',
    track: {
      label: 'Sorted Array arr[i]',
      items: [
        { value: 2, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 7, status: 'discarded' },
        11
      ],
      pointers: [
        { index: 4, label: 'low/high' }
      ]
    },
    auxiliaryTrack: {
      label: 'Remaining Search Domain: [Index 4]',
      items: [
        { value: 'x', status: 'discarded' },
        { value: 'x', status: 'discarded' },
        { value: 'x', status: 'discarded' },
        { value: 'x', status: 'discarded' },
        { value: 'missing = 6', status: 'current' }
      ]
    },
    activeI: 3,
    activeJ: null,
    windowStart: 4,
    windowEnd: 4,
    metrics: [
      { label: 'Comparison', value: 'missing (3) < K (5)', highlight: true },
      { label: 'Discarded Indices', value: '[0 ... 3]' },
      { label: 'New Search Range', value: '[4 ... 4]' },
      { label: 'low updated to', value: 'mid + 1 = 4' }
    ],
    variables: { low: 4, high: 4, k: 5, action: 'low = mid + 1 = 4' },
    formula: 'missing(mid) < k ==> low = mid + 1 = 4',
    action: 'Discard index 3; advance low to 4',
    explain: 'Since 3 < 5, the 5th missing number must appear after arr[3] = 7. We advance low to 4.',
    intuition: 'Only index 4 remains to evaluate.'
  },
  {
    title: '6. Pass 3: Compute mid = 4 -> arr[4] = 11 -> missing(4) = 11 - 5 = 6',
    phase: 'EVALUATE_MID',
    track: {
      label: 'Sorted Array arr[i]',
      items: [
        { value: 2, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 11, status: 'current' }
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
      { label: 'arr[mid]', value: '11' },
      { label: 'Missing Before mid', value: '11 - (4 + 1) = 6', highlight: true },
      { label: 'Condition', value: '6 >= 5 (OVERSHOT)' }
    ],
    variables: { low: 4, mid: 4, high: 4, 'arr[mid]': 11, missing: 6, k: 5 },
    formula: 'missing(4) = arr[4] - (4 + 1) = 11 - 5 = 6 >= 5 ==> high = 3',
    action: '6 numbers are missing before 11; the 5th missing lies before 11; decrement high to 3',
    explain: 'Before index 4, 6 numbers are missing: {1, 5, 6, 8, 9, 10}. Because 6 >= 5, the 5th missing number must be smaller than 11! We decrement high to mid - 1 = 3.',
    intuition: 'The 5th missing number lies strictly between arr[3] = 7 and arr[4] = 11.'
  },
  {
    title: '7. Search Interval Inversion: low (4) > high (3) -> Loop Terminates',
    phase: 'TERMINATION',
    track: {
      label: 'Sorted Array arr[i]',
      items: [
        { value: 2, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 7, status: 'match' },
        { value: 11, status: 'match' }
      ],
      pointers: [
        { index: 3, label: 'high (3)' },
        { index: 4, label: 'low (4)' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 4,
    windowEnd: 3,
    metrics: [
      { label: 'high Pointer', value: 'Index 3 (arr[3] = 7)' },
      { label: 'low Pointer', value: 'Index 4 (arr[4] = 11)' },
      { label: 'Missing at high', value: 'missing(3) = 3' },
      { label: 'More Missing Needed', value: 'k - 3 = 5 - 3 = 2' }
    ],
    variables: { low: 4, high: 3, k: 5, loopTerminated: true },
    formula: 'ans = arr[high] + (k - missing(high)) = 7 + (5 - 3) = 7 + 2 = 9',
    action: 'Domain exhausted: low crossed high; apply algebraic offset formula',
    explain: 'The 5th missing number lies between arr[high]=7 and arr[low]=11. Before 7, there are 3 missing numbers. We need 5 - 3 = 2 more numbers past 7: 7 + 2 = 9. Notice algebraically: arr[high] + (k - (arr[high] - (high + 1))) = high + 1 + k = low + k = 4 + 5 = 9!',
    intuition: 'The elegant identity ans = low + k directly computes the answer.'
  },
  {
    title: '8. Mathematical Verification & Result: 5th Missing Number = 9',
    phase: 'COMPLETED',
    track: {
      label: 'Full Sequence Visualization: Integers 1 through 11',
      items: [
        { value: '1 (M1)', status: 'match' },
        { value: '2 (arr[0])', status: 'current' },
        { value: '3 (arr[1])', status: 'current' },
        { value: '4 (arr[2])', status: 'current' },
        { value: '5 (M2)', status: 'match' },
        { value: '6 (M3)', status: 'match' },
        { value: '7 (arr[3])', status: 'current' },
        { value: '8 (M4)', status: 'match' },
        { value: '9 (M5: ANSWER)', status: 'match' },
        { value: '10 (M6)', status: 'discarded' },
        { value: '11 (arr[4])', status: 'current' }
      ]
    },
    auxiliaryTrack: {
      label: 'First 5 Missing Integers: [1, 5, 6, 8, 9]',
      items: [
        { value: 'M1: 1', status: 'current' },
        { value: 'M2: 5', status: 'current' },
        { value: 'M3: 6', status: 'current' },
        { value: 'M4: 8', status: 'current' },
        { value: 'M5: 9 (TARGET)', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: '5th Missing Positive', value: '9', highlight: true },
      { label: 'Missing Sequence', value: '[1, 5, 6, 8, 9]' },
      { label: 'Time Complexity', value: 'O(log N)', highlight: true },
      { label: 'Space Complexity', value: 'O(1) Auxiliary', highlight: true }
    ],
    variables: { result: 9, k: 5, 'low + k': '4 + 5 = 9', timeComplexity: 'O(log N)' },
    formula: 'Result = low + k = 4 + 5 = 9 in O(log N) comparisons',
    action: 'Algorithm concludes; return 9 in pure logarithmic time with zero auxiliary memory',
    explain: 'Enumerating the positive integers demonstrates that the 5th missing number is 9 (missing numbers are 1, 5, 6, 8, 9). Binary search determined this in 3 comparisons without allocating any arrays.',
    intuition: 'Direct index arithmetic combined with binary search yields a remarkable O(1) space solution.'
  }
];

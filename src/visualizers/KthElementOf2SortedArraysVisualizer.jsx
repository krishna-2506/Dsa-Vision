// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'K-th Element of Two Sorted Arrays',
  category: 'Binary Search on Two Arrays',
  difficulty: 'Hard',
  timeComplexity: 'O(log(min(N, M)))',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the K-th smallest element in the union of two independently sorted arrays in logarithmic time by binary searching the partition cut on the smaller array.'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'Binary Search Partition Invariant',
  nodes: [
    { id: 'root', label: 'Cross-Array Partitioning', children: ['smaller-array', 'cut-bounds', 'cross-checks', 'answer-extraction'] },
    { id: 'smaller-array', label: '1. Search Smaller Array', detail: 'Always binary search the smaller array (arr1 of size N <= M) to minimize binary search iterations to O(log N).' },
    { id: 'cut-bounds', label: '2. Clamped Cut Boundaries', detail: 'Valid cut1 range is strictly [max(0, K - M) .. min(K, N)] to prevent out-of-bounds cut2 = K - cut1 in arr2.' },
    { id: 'cross-checks', label: '3. Cross-Boundary Conditions', detail: 'A partition is valid if and only if l1 <= r2 and l2 <= r1, ensuring all left elements are <= all right elements.' },
    { id: 'answer-extraction', label: '4. Extracting K-th Element', detail: 'When valid, exactly K elements lie in the combined left partition. The K-th element is max(l1, l2).' }
  ]
};

export const solutions = {
  cpp: `// C++ Binary Search Partition for K-th Element
// Time Complexity: O(log(min(N, M))) | Space Complexity: O(1)
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

class Solution {
public:
    int kthElement(vector<int>& arr1, vector<int>& arr2, int k) {
        int n = arr1.size(), m = arr2.size();
        if (n > m) return kthElement(arr2, arr1, k); // Ensure arr1 is the smaller array

        int low = max(0, k - m);
        int high = min(k, n);

        while (low <= high) {
            int cut1 = low + (high - low) / 2;
            int cut2 = k - cut1;

            int l1 = (cut1 == 0) ? INT_MIN : arr1[cut1 - 1];
            int l2 = (cut2 == 0) ? INT_MIN : arr2[cut2 - 1];
            int r1 = (cut1 == n) ? INT_MAX : arr1[cut1];
            int r2 = (cut2 == m) ? INT_MAX : arr2[cut2];

            if (l1 <= r2 && l2 <= r1) {
                return max(l1, l2); // Valid partition found
            } else if (l1 > r2) {
                high = cut1 - 1;    // Too many elements from arr1
            } else {
                low = cut1 + 1;     // Too few elements from arr1
            }
        }
        return -1;
    }
};`,
  python: `# Python 3 Binary Search Partition for K-th Element
# Time Complexity: O(log(min(N, M))) | Space Complexity: O(1)
class Solution:
    def kthElement(self, arr1: list[int], arr2: list[int], k: int) -> int:
        n, m = len(arr1), len(arr2)
        if n > m:
            return self.kthElement(arr2, arr1, k)

        low = max(0, k - m)
        high = min(k, n)

        while low <= high:
            cut1 = (low + high) // 2
            cut2 = k - cut1

            l1 = float('-inf') if cut1 == 0 else arr1[cut1 - 1]
            l2 = float('-inf') if cut2 == 0 else arr2[cut2 - 1]
            r1 = float('inf') if cut1 == n else arr1[cut1]
            r2 = float('inf') if cut2 == m else arr2[cut2]

            if l1 <= r2 and l2 <= r1:
                return max(l1, l2)
            elif l1 > r2:
                high = cut1 - 1
            else:
                low = cut1 + 1

        return -1`,
  java: `// Java Binary Search Partition for K-th Element
// Time Complexity: O(log(min(N, M))) | Space Complexity: O(1)
class Solution {
    public int kthElement(int[] arr1, int[] arr2, int k) {
        int n = arr1.length, m = arr2.length;
        if (n > m) return kthElement(arr2, arr1, k);

        int low = Math.max(0, k - m);
        int high = Math.min(k, n);

        while (low <= high) {
            int cut1 = low + (high - low) / 2;
            int cut2 = k - cut1;

            int l1 = (cut1 == 0) ? Integer.MIN_VALUE : arr1[cut1 - 1];
            int l2 = (cut2 == 0) ? Integer.MIN_VALUE : arr2[cut2 - 1];
            int r1 = (cut1 == n) ? Integer.MAX_VALUE : arr1[cut1];
            int r2 = (cut2 == m) ? Integer.MAX_VALUE : arr2[cut2];

            if (l1 <= r2 && l2 <= r1) {
                return Math.max(l1, l2);
            } else if (l1 > r2) {
                high = cut1 - 1;
            } else {
                low = cut1 + 1;
            }
        }
        return -1;
    }
}`,
  javascript: `// JavaScript Binary Search Partition for K-th Element
// Time Complexity: O(log(min(N, M))) | Space Complexity: O(1)
var kthElement = function(arr1, arr2, k) {
    const n = arr1.length, m = arr2.length;
    if (n > m) return kthElement(arr2, arr1, k);

    let low = Math.max(0, k - m);
    let high = Math.min(k, n);

    while (low <= high) {
        const cut1 = Math.floor((low + high) / 2);
        const cut2 = k - cut1;

        const l1 = cut1 === 0 ? -Infinity : arr1[cut1 - 1];
        const l2 = cut2 === 0 ? -Infinity : arr2[cut2 - 1];
        const r1 = cut1 === n ? Infinity : arr1[cut1];
        const r2 = cut2 === m ? Infinity : arr2[cut2];

        if (l1 <= r2 && l2 <= r1) {
            return Math.max(l1, l2);
        } else if (l1 > r2) {
            high = cut1 - 1;
        } else {
            low = cut1 + 1;
        }
    }
    return -1;
};`
};

export const steps = [
  {
    title: '1. Problem Setup & Clamped Search Space Invariant',
    phase: 'INITIAL',
    tracks: [
      {
        label: 'arr1 (Smaller, N = 4)',
        items: [
          { val: 7 },
          { val: 12 },
          { val: 14 },
          { val: 15 }
        ]
      },
      {
        label: 'arr2 (Larger, M = 6)',
        items: [
          { val: 1 },
          { val: 2 },
          { val: 3 },
          { val: 4 },
          { val: 9 },
          { val: 11 }
        ]
      }
    ],
    activeI: null,
    activePrev: null,
    metrics: [
      { label: 'Target K', value: '5th Element' },
      { label: 'low', value: 'max(0, 5-6) = 0' },
      { label: 'high', value: 'min(5, 4) = 4' },
      { label: 'Complexity', value: 'O(log(min(N, M)))', highlight: true }
    ],
    formula: 'low = max(0, k - m); high = min(k, n);',
    action: 'Initialize binary search on the partition cut of the smaller array arr1.',
    explain: 'Combined array has 10 elements: [1, 2, 3, 4, 7, 9, 11, 12, 14, 15]. We need the 5th smallest element without merging.',
    intuition: 'We only need to guess how many elements from arr1 belong to the combined left partition of size K=5. The rest (K - cut1) must come from arr2.',
    customCard: {
      title: 'Search Domain Boundaries',
      rows: [
        { label: 'low = max(0, K - M)', value: '0 (arr2 alone can hold at most 6 elements, so cut1 can be 0)' },
        { label: 'high = min(K, N)', value: '4 (arr1 has only 4 elements, cannot take more than 4)' }
      ]
    }
  },
  {
    title: '2. Cut Rule & Cross-Boundary Validity Invariant',
    phase: 'INVARIANT',
    tracks: [
      {
        label: 'arr1 (N = 4)',
        items: [
          { val: 7, badge: 'candidate' },
          { val: 12, badge: 'candidate' },
          { val: 14 },
          { val: 15 }
        ]
      },
      {
        label: 'arr2 (M = 6)',
        items: [
          { val: 1, badge: 'candidate' },
          { val: 2, badge: 'candidate' },
          { val: 3, badge: 'candidate' },
          { val: 4 },
          { val: 9 },
          { val: 11 }
        ]
      }
    ],
    activeI: null,
    activePrev: null,
    metrics: [
      { label: 'Cut 1 Range', value: '[0 .. 4]' },
      { label: 'Cut 2 Dependency', value: 'cut2 = 5 - cut1' },
      { label: 'Valid Condition', value: 'l1 <= r2 && l2 <= r1', highlight: true }
    ],
    formula: 'int cut1 = low + (high - low) / 2; int cut2 = k - cut1;',
    action: 'Define boundary elements l1, r1 for arr1, and l2, r2 for arr2 across the partition cut.',
    explain: 'Left partition consists of cut1 elements from arr1 and cut2 elements from arr2. Total elements on left = K.',
    intuition: 'If l1 <= r2 and l2 <= r1, every element on the left is <= every element on the right. The K-th element is max(l1, l2).',
    customCard: {
      title: 'Cross-Check Conditions',
      rows: [
        { label: 'l1 <= r2', value: 'arr1 left max must be <= arr2 right min' },
        { label: 'l2 <= r1', value: 'arr2 left max must be <= arr1 right min' }
      ]
    }
  },
  {
    title: '3. Iteration 1: Attempt cut1 = 2, cut2 = 3',
    phase: 'EVALUATE_CUT',
    tracks: [
      {
        label: 'arr1 (cut1 = 2: left {7, 12} | right {14, 15})',
        items: [
          { val: 7, status: 'active' },
          { val: 12, status: 'active', badge: 'l1 = 12' },
          { val: 14, badge: 'r1 = 14' },
          { val: 15 }
        ]
      },
      {
        label: 'arr2 (cut2 = 3: left {1, 2, 3} | right {4, 9, 11})',
        items: [
          { val: 1, status: 'active' },
          { val: 2, status: 'active' },
          { val: 3, status: 'active', badge: 'l2 = 3' },
          { val: 4, badge: 'r2 = 4' },
          { val: 9 },
          { val: 11 }
        ]
      }
    ],
    activeI: 1,
    activePrev: 2,
    metrics: [
      { label: 'cut1', value: 2 },
      { label: 'cut2', value: 3 },
      { label: 'l1 / r1', value: '12 / 14' },
      { label: 'l2 / r2', value: '3 / 4' }
    ],
    formula: 'l1 = arr1[1] (12); r1 = arr1[2] (14); l2 = arr2[2] (3); r2 = arr2[3] (4);',
    action: 'Evaluate cross-boundary comparison between left and right partitions.',
    explain: 'Left partition has {7, 12} and {1, 2, 3} (5 elements). Compare cross boundaries: l1 (12) vs r2 (4) and l2 (3) vs r1 (14).',
    intuition: 'l1 (12) > r2 (4) fails! 12 is greater than elements on the right side of arr2. We took too many elements from arr1.',
    customCard: {
      title: 'Boundary Evaluation: Iteration 1',
      rows: [
        { label: 'l1 <= r2 ?', value: '12 <= 4 is FALSE (Violation!)', accent: false },
        { label: 'l2 <= r1 ?', value: '3 <= 14 is TRUE', accent: true }
      ]
    }
  },
  {
    title: '4. Update Range: high = cut1 - 1 = 1',
    phase: 'SHRINK_RIGHT',
    tracks: [
      {
        label: 'arr1 (Remaining Search: cut1 in [0 .. 1])',
        items: [
          { val: 7, status: 'match', badge: 'Search [0..1]' },
          { val: 12, status: 'mismatch', badge: 'Too Large' },
          { val: 14, status: 'mismatch' },
          { val: 15, status: 'mismatch' }
        ]
      },
      {
        label: 'arr2 (M = 6)',
        items: [
          { val: 1 },
          { val: 2 },
          { val: 3 },
          { val: 4 },
          { val: 9 },
          { val: 11 }
        ]
      }
    ],
    activeI: 0,
    activePrev: null,
    metrics: [
      { label: 'Violation', value: 'l1 (12) > r2 (4)', highlight: true },
      { label: 'Action', value: 'high = cut1 - 1' },
      { label: 'New low', value: 0 },
      { label: 'New high', value: 1 }
    ],
    formula: 'high = cut1 - 1 = 2 - 1 = 1;',
    action: 'Discard right half of arr1 search space because taking 2 or more elements causes overflow into the right partition.',
    explain: 'Since 12 from arr1 exceeds 4 from arr2, 12 cannot belong to the first K=5 elements. We must pick fewer elements from arr1.',
    intuition: 'Standard binary search rule: when l1 > r2, move high leftwards: high = cut1 - 1.',
    customCard: {
      title: 'Search Space Reduction',
      rows: [
        { label: 'Discarded Subspace', value: 'cut1 in [2 .. 4] eliminated entirely' },
        { label: 'Remaining Range', value: 'cut1 in [0 .. 1]', accent: true }
      ]
    }
  },
  {
    title: '5. Iteration 2: Attempt cut1 = 0, cut2 = 5 (Boundary Handling)',
    phase: 'EVALUATE_CUT',
    tracks: [
      {
        label: 'arr1 (cut1 = 0: left {} | right {7, 12, 14, 15})',
        items: [
          { val: 7, badge: 'r1 = 7' },
          { val: 12 },
          { val: 14 },
          { val: 15 }
        ]
      },
      {
        label: 'arr2 (cut2 = 5: left {1, 2, 3, 4, 9} | right {11})',
        items: [
          { val: 1, status: 'active' },
          { val: 2, status: 'active' },
          { val: 3, status: 'active' },
          { val: 4, status: 'active' },
          { val: 9, status: 'active', badge: 'l2 = 9' },
          { val: 11, badge: 'r2 = 11' }
        ]
      }
    ],
    activeI: 0,
    activePrev: 4,
    metrics: [
      { label: 'cut1', value: 0 },
      { label: 'cut2', value: 5 },
      { label: 'l1 / r1', value: '-INF / 7' },
      { label: 'l2 / r2', value: '9 / 11' }
    ],
    formula: 'cut1 = (0 + 1) / 2 = 0; cut2 = 5 - 0 = 5; l1 = -INF;',
    action: 'Evaluate edge case where 0 elements are taken from arr1 (l1 = -infinity).',
    explain: 'Left partition takes 0 elements from arr1 and 5 elements from arr2: {1, 2, 3, 4, 9}. Check l2 (9) vs r1 (7).',
    intuition: 'l2 (9) > r1 (7) fails! 9 in the left partition is greater than 7 in the right partition. We took too few elements from arr1.',
    customCard: {
      title: 'Boundary Evaluation: Iteration 2',
      rows: [
        { label: 'l1 <= r2 ?', value: '-INF <= 11 is TRUE', accent: true },
        { label: 'l2 <= r1 ?', value: '9 <= 7 is FALSE (Violation!)', accent: false }
      ]
    }
  },
  {
    title: '6. Update Range: low = cut1 + 1 = 1',
    phase: 'SHRINK_LEFT',
    tracks: [
      {
        label: 'arr1 (Target Cut Isolated: cut1 = 1)',
        items: [
          { val: 7, status: 'match', badge: 'Optimal cut1 = 1' },
          { val: 12, status: 'sorted' },
          { val: 14, status: 'sorted' },
          { val: 15, status: 'sorted' }
        ]
      },
      {
        label: 'arr2 (M = 6)',
        items: [
          { val: 1 },
          { val: 2 },
          { val: 3 },
          { val: 4 },
          { val: 9 },
          { val: 11 }
        ]
      }
    ],
    activeI: 0,
    activePrev: null,
    metrics: [
      { label: 'Violation', value: 'l2 (9) > r1 (7)', highlight: true },
      { label: 'Action', value: 'low = cut1 + 1' },
      { label: 'New low', value: 1 },
      { label: 'New high', value: 1 }
    ],
    formula: 'low = cut1 + 1 = 0 + 1 = 1;',
    action: 'Discard cut1 = 0. We must take at least 1 element from arr1.',
    explain: 'Because 9 from arr2 is larger than 7 from arr1, 7 must be placed into the left partition instead of 9.',
    intuition: 'When l2 > r1, advance low rightwards: low = cut1 + 1. The search space has converged to [1 .. 1]!',
    customCard: {
      title: 'Search Domain Convergence',
      rows: [
        { label: 'low = 1, high = 1', value: 'Exactly 1 candidate cut remaining' },
        { label: 'Required cut1', value: 'cut1 = 1', accent: true }
      ]
    }
  },
  {
    title: '7. Iteration 3: Optimal Cut cut1 = 1, cut2 = 4 (Valid Partition!)',
    phase: 'VALID_PARTITION',
    tracks: [
      {
        label: 'arr1 (cut1 = 1: left {7} | right {12, 14, 15})',
        items: [
          { val: 7, status: 'match', badge: 'l1 = 7' },
          { val: 12, status: 'sorted', badge: 'r1 = 12' },
          { val: 14, status: 'sorted' },
          { val: 15, status: 'sorted' }
        ]
      },
      {
        label: 'arr2 (cut2 = 4: left {1, 2, 3, 4} | right {9, 11})',
        items: [
          { val: 1, status: 'match' },
          { val: 2, status: 'match' },
          { val: 3, status: 'match' },
          { val: 4, status: 'match', badge: 'l2 = 4' },
          { val: 9, status: 'sorted', badge: 'r2 = 9' },
          { val: 11, status: 'sorted' }
        ]
      }
    ],
    activeI: 0,
    activePrev: 3,
    metrics: [
      { label: 'cut1', value: 1 },
      { label: 'cut2', value: 4 },
      { label: 'l1 <= r2', value: '7 <= 9 (Valid)', highlight: true },
      { label: 'l2 <= r1', value: '4 <= 12 (Valid)', highlight: true }
    ],
    formula: 'l1 <= r2 (7 <= 9) && l2 <= r1 (4 <= 12) -> VALID PARTITION!',
    action: 'Verify that all cross-boundary inequalities hold simultaneously.',
    explain: 'Left partition contains {7} from arr1 and {1, 2, 3, 4} from arr2 (exactly K=5 elements). All elements on the left are <= all elements on the right!',
    intuition: 'Both cross conditions hold! The 5 elements on the left are strictly the 5 smallest elements in the combined sorted sequence.',
    customCard: {
      title: 'Valid Partition Verification',
      rows: [
        { label: 'l1 <= r2 ?', value: '7 <= 9 is TRUE (Passed!)', accent: true },
        { label: 'l2 <= r1 ?', value: '4 <= 12 is TRUE (Passed!)', accent: true }
      ]
    }
  },
  {
    title: '8. Result: K-th Element = max(l1, l2) = max(7, 4) = 7',
    phase: 'COMPLETED',
    tracks: [
      {
        label: 'arr1 (Left Partition Contribution: [7])',
        items: [
          { val: 7, status: 'match', badge: '👑 5th Element = 7' },
          { val: 12, status: 'sorted' },
          { val: 14, status: 'sorted' },
          { val: 15, status: 'sorted' }
        ]
      },
      {
        label: 'arr2 (Left Partition Contribution: [1, 2, 3, 4])',
        items: [
          { val: 1, status: 'match' },
          { val: 2, status: 'match' },
          { val: 3, status: 'match' },
          { val: 4, status: 'match', badge: 'l2 = 4' },
          { val: 9, status: 'sorted' },
          { val: 11, status: 'sorted' }
        ]
      }
    ],
    activeI: 0,
    activePrev: 3,
    metrics: [
      { label: 'Combined Left', value: '{1, 2, 3, 4, 7}' },
      { label: '5th Smallest', value: '7', highlight: true },
      { label: 'Time', value: 'O(log(min(N, M)))' },
      { label: 'Space', value: 'O(1) Auxiliary' }
    ],
    formula: 'return max(l1, l2) = max(7, 4) = 7;',
    action: 'Extract the maximum element from the left partition as the K-th smallest element.',
    explain: 'Combined sorted array: [1, 2, 3, 4, 7, 9, 11, 12, 14, 15]. The 5th element is 7. Determined in just 3 binary cuts without merging!',
    intuition: 'Partitioning binary search achieves optimal logarithmic performance with zero memory allocation.',
    customCard: {
      title: 'Final Summary',
      rows: [
        { label: 'K-th Element', value: '7 (Found in 3 binary cuts)', accent: true },
        { label: 'Efficiency Bound', value: 'O(log(min(N, M))) time, O(1) space', accent: true }
      ]
    }
  }
];

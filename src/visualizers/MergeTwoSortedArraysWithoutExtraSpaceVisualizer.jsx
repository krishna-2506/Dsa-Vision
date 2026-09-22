// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'Merge Two Sorted Arrays Without Extra Space',
  category: 'Arrays & In-Place Merging',
  difficulty: 'Hard',
  timeComplexity: 'O(min(N, M)) + O(N log N) + O(M log M)',
  spaceComplexity: 'O(1) In-Place',
  description: 'Merges two sorted arrays in-place without allocating a third array by swapping out-of-order elements between the tail of arr1 and head of arr2, followed by in-place sorting.'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'In-Place Array Merge Strategy',
  nodes: [
    { id: 'root', label: 'Boundary Swap & Sort Invariant', children: ['two-pointer-setup', 'out-of-order-swap', 'early-break-rule', 'individual-sort', 'complexity'] },
    { id: 'two-pointer-setup', label: '1. Opposing Pointers', detail: 'left starts at tail of arr1 (largest candidate); right starts at head of arr2 (smallest candidate).' },
    { id: 'out-of-order-swap', label: '2. Cross-Array Swaps', detail: 'If arr1[left] > arr2[right], swap them and advance left-- and right++ to segregate small and large values.' },
    { id: 'early-break-rule', label: '3. Early Break Invariant', detail: 'The moment arr1[left] <= arr2[right], all remaining elements are naturally partitioned; break immediately.' },
    { id: 'individual-sort', label: '4. Independent In-Place Sorts', detail: 'Sort arr1 and arr2 separately in-place to restore monotonic order in both partitions.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'O(min(N, M)) swaps followed by O(N log N + M log M) sorting, strictly achieving O(1) extra space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal In-Place Swap and Sort Merging
// Time Complexity: O(min(N, M)) + O(N log N) + O(M log M) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void merge(vector<int>& arr1, vector<int>& arr2, int n, int m) {
        int left = n - 1;
        int right = 0;

        // 1. Swap elements between arr1 tail and arr2 head
        while (left >= 0 && right < m) {
            if (arr1[left] > arr2[right]) {
                swap(arr1[left], arr2[right]);
                left--;
                right++;
            } else {
                break; // Partitions already correctly segregated
            }
        }

        // 2. Sort both arrays in-place
        sort(arr1.begin(), arr1.end());
        sort(arr2.begin(), arr2.end());
    }
};`,
  python: `# Python 3 Optimal In-Place Swap and Sort
# Time Complexity: O(min(N, M)) + O(N log N) + O(M log M) | Space Complexity: O(1)
class Solution:
    def merge(self, arr1: list[int], arr2: list[int]) -> None:
        n, m = len(arr1), len(arr2)
        left = n - 1
        right = 0

        # Swap out-of-order elements
        while left >= 0 and right < m:
            if arr1[left] > arr2[right]:
                arr1[left], arr2[right] = arr2[right], arr1[left]
                left -= 1
                right += 1
            else:
                break

        # In-place sorts
        arr1.sort()
        arr2.sort()`,
  java: `// Java Optimal In-Place Swap and Sort
// Time Complexity: O(min(N, M)) + O(N log N) + O(M log M) | Space Complexity: O(1)
import java.util.Arrays;

class Solution {
    public void merge(int[] arr1, int[] arr2, int n, int m) {
        int left = n - 1;
        int right = 0;

        while (left >= 0 && right < m) {
            if (arr1[left] > arr2[right]) {
                int temp = arr1[left];
                arr1[left] = arr2[right];
                arr2[right] = temp;
                left--;
                right++;
            } else {
                break;
            }
        }

        Arrays.sort(arr1);
        Arrays.sort(arr2);
    }
}`,
  javascript: `// JavaScript Optimal In-Place Swap and Sort
// Time Complexity: O(min(N, M)) + O(N log N) + O(M log M) | Space Complexity: O(1)
var merge = function(arr1, arr2) {
    const n = arr1.length, m = arr2.length;
    let left = n - 1, right = 0;

    while (left >= 0 && right < m) {
        if (arr1[left] > arr2[right]) {
            [arr1[left], arr2[right]] = [arr2[right], arr1[left]];
            left--;
            right++;
        } else {
            break;
        }
    }

    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);
};`
};

export const steps = [
  {
    title: '1. Setup: arr1 = [1, 4, 8, 10], arr2 = [2, 3, 9]',
    phase: 'SETUP',
    tracks: [
      {
        label: 'arr1 (Size = 4)',
        items: [
          { val: 1 },
          { val: 4 },
          { val: 8 },
          { val: 10, status: 'match', badge: 'left = 3' }
        ]
      },
      {
        label: 'arr2 (Size = 3)',
        items: [
          { val: 2, status: 'match', badge: 'right = 0' },
          { val: 3 },
          { val: 9 }
        ]
      }
    ],
    activeI: 3,
    activePrev: 0,
    metrics: [
      { label: 'left pointer', value: 'arr1[3] = 10' },
      { label: 'right pointer', value: 'arr2[0] = 2' },
      { label: 'Auxiliary Space', value: 'O(1) In-Place', highlight: true }
    ],
    formula: 'int left = n - 1; int right = 0;',
    action: 'Initialize left pointer at the largest element of arr1 and right pointer at the smallest element of arr2.',
    explain: 'Goal: Reorganize elements so arr1 holds the smallest N numbers and arr2 holds the largest M numbers, both sorted, without allocating any extra array.',
    intuition: 'If the largest value in arr1 exceeds the smallest value in arr2, they are in the wrong arrays and must be swapped.',
    customCard: {
      title: 'Swap-and-Sort Strategy',
      rows: [
        { label: 'left position', value: 'Index n - 1 of arr1', accent: true },
        { label: 'right position', value: 'Index 0 of arr2', accent: true }
      ]
    }
  },
  {
    title: '2. Swap 1: arr1[3] (10) > arr2[0] (2) -> Swap!',
    phase: 'SWAPPING',
    tracks: [
      {
        label: 'arr1 (Swapped)',
        items: [
          { val: 1 },
          { val: 4 },
          { val: 8, status: 'active', badge: 'Next left' },
          { val: 2, status: 'match', badge: 'Swapped 2' }
        ]
      },
      {
        label: 'arr2 (Swapped)',
        items: [
          { val: 10, status: 'match', badge: 'Swapped 10' },
          { val: 3, status: 'active', badge: 'Next right' },
          { val: 9 }
        ]
      }
    ],
    activeI: 2,
    activePrev: 1,
    metrics: [
      { label: 'Comparison', value: '10 > 2 (Swap!)', highlight: true },
      { label: 'New left', value: 2 },
      { label: 'New right', value: 1 }
    ],
    formula: 'swap(arr1[left], arr2[right]); left--; right++;',
    action: '10 > 2: Swap 10 and 2. Advance left to 2 and right to 1.',
    explain: '2 moves into arr1 where it belongs, and 10 moves into arr2. Both pointers step inward to inspect the next candidates.',
    intuition: 'Large numbers migrate to arr2; small numbers migrate to arr1.',
    customCard: {
      title: 'Swap 1 Executed',
      rows: [
        { label: 'arr1[3]', value: '2 (was 10)', accent: true },
        { label: 'arr2[0]', value: '10 (was 2)', accent: true }
      ]
    }
  },
  {
    title: '3. Swap 2: arr1[2] (8) > arr2[1] (3) -> Swap!',
    phase: 'SWAPPING',
    tracks: [
      {
        label: 'arr1 (Swapped)',
        items: [
          { val: 1 },
          { val: 4, status: 'active', badge: 'Next left' },
          { val: 3, status: 'match', badge: 'Swapped 3' },
          { val: 2, status: 'match' }
        ]
      },
      {
        label: 'arr2 (Swapped)',
        items: [
          { val: 10, status: 'match' },
          { val: 8, status: 'match', badge: 'Swapped 8' },
          { val: 9, status: 'active', badge: 'Next right' }
        ]
      }
    ],
    activeI: 1,
    activePrev: 2,
    metrics: [
      { label: 'Comparison', value: '8 > 3 (Swap!)', highlight: true },
      { label: 'New left', value: 1 },
      { label: 'New right', value: 2 }
    ],
    formula: 'swap(arr1[left], arr2[right]); left--; right++;',
    action: '8 > 3: Swap 8 and 3. Advance left to 1 and right to 2.',
    explain: '3 moves into arr1, and 8 moves into arr2. Pointers advance to left = 1 and right = 2.',
    intuition: 'Another pair correctly assigned to its appropriate array.',
    customCard: {
      title: 'Swap 2 Executed',
      rows: [
        { label: 'arr1[2]', value: '3 (was 8)', accent: true },
        { label: 'arr2[1]', value: '8 (was 3)', accent: true }
      ]
    }
  },
  {
    title: '4. Inspect: arr1[1] (4) <= arr2[2] (9) -> Correctly Partitioned! Break',
    phase: 'BREAK_CONDITION',
    tracks: [
      {
        label: 'arr1 Partitioned',
        items: [
          { val: 1 },
          { val: 4, status: 'match', badge: '4 <= 9' },
          { val: 3 },
          { val: 2 }
        ]
      },
      {
        label: 'arr2 Partitioned',
        items: [
          { val: 10 },
          { val: 8 },
          { val: 9, status: 'match', badge: '9 >= 4' }
        ]
      }
    ],
    activeI: 1,
    activePrev: 2,
    metrics: [
      { label: 'Comparison', value: '4 <= 9 (Break)', highlight: true },
      { label: 'Partitions', value: 'Completely Segregated' },
      { label: 'Swaps Finished', value: '2 total swaps' }
    ],
    formula: 'if (arr1[left] <= arr2[right]) break;',
    action: '4 <= 9: arr1[left] is no longer greater than arr2[right]. Break loop immediately.',
    explain: 'Because both initial arrays were sorted, all elements to the left in arr1 are <= 4, and all elements to the right in arr2 are >= 9. No more swaps are needed.',
    intuition: 'Early break guarantees we swap at most min(N, M) times.',
    customCard: {
      title: 'Early Termination Invariant',
      rows: [
        { label: 'arr1 elements', value: '{1, 4, 3, 2} (all <= 4)', accent: true },
        { label: 'arr2 elements', value: '{10, 8, 9} (all >= 8)', accent: true }
      ]
    }
  },
  {
    title: '5. In-Place Sort arr1: [1, 4, 3, 2] -> [1, 2, 3, 4]',
    phase: 'INTERNAL_SORT',
    tracks: [
      {
        label: 'arr1 (Sorted In-Place)',
        items: [
          { val: 1, status: 'match' },
          { val: 2, status: 'match' },
          { val: 3, status: 'match' },
          { val: 4, status: 'match' }
        ]
      },
      {
        label: 'arr2 (Unsorted yet)',
        items: [
          { val: 10 },
          { val: 8 },
          { val: 9 }
        ]
      }
    ],
    activeI: null,
    activePrev: null,
    metrics: [
      { label: 'arr1 Status', value: 'Sorted [1, 2, 3, 4]', highlight: true },
      { label: 'Sort Cost', value: 'O(N log N)' }
    ],
    formula: 'sort(arr1.begin(), arr1.end());',
    action: 'Sort arr1 in-place using standard library sort.',
    explain: 'arr1 now contains the 4 smallest elements from both arrays in perfect monotonic order.',
    intuition: 'Smallest N elements locked in place.',
    customCard: {
      title: 'arr1 Sorted',
      rows: [
        { label: 'Result arr1', value: '[1, 2, 3, 4]', accent: true }
      ]
    }
  },
  {
    title: '6. In-Place Sort arr2: [10, 8, 9] -> [8, 9, 10]',
    phase: 'INTERNAL_SORT',
    tracks: [
      {
        label: 'arr1 (Sorted)',
        items: [
          { val: 1, status: 'match' },
          { val: 2, status: 'match' },
          { val: 3, status: 'match' },
          { val: 4, status: 'match' }
        ]
      },
      {
        label: 'arr2 (Sorted In-Place)',
        items: [
          { val: 8, status: 'match' },
          { val: 9, status: 'match' },
          { val: 10, status: 'match' }
        ]
      }
    ],
    activeI: null,
    activePrev: null,
    metrics: [
      { label: 'arr2 Status', value: 'Sorted [8, 9, 10]', highlight: true },
      { label: 'Sort Cost', value: 'O(M log M)' }
    ],
    formula: 'sort(arr2.begin(), arr2.end());',
    action: 'Sort arr2 in-place using standard library sort.',
    explain: 'arr2 now contains the 3 largest elements from both arrays in perfect monotonic order.',
    intuition: 'Largest M elements locked in place.',
    customCard: {
      title: 'arr2 Sorted',
      rows: [
        { label: 'Result arr2', value: '[8, 9, 10]', accent: true }
      ]
    }
  },
  {
    title: '7. Complete: arr1 = [1, 2, 3, 4], arr2 = [8, 9, 10]',
    phase: 'COMPLETED',
    tracks: [
      {
        label: 'arr1 (Final)',
        items: [
          { val: 1, status: 'match' },
          { val: 2, status: 'match' },
          { val: 3, status: 'match' },
          { val: 4, status: 'match' }
        ]
      },
      {
        label: 'arr2 (Final)',
        items: [
          { val: 8, status: 'match' },
          { val: 9, status: 'match' },
          { val: 10, status: 'match' }
        ]
      }
    ],
    activeI: null,
    activePrev: null,
    metrics: [
      { label: 'arr1', value: '[1, 2, 3, 4]', highlight: true },
      { label: 'arr2', value: '[8, 9, 10]', highlight: true },
      { label: 'Combined', value: '[1, 2, 3, 4, 8, 9, 10]' },
      { label: 'Space', value: 'O(1) Strict In-Place' }
    ],
    formula: 'Complete: arr1 and arr2 merged seamlessly without extra memory.',
    action: 'Algorithm concludes: Both arrays are merged in-place.',
    explain: 'The swap-and-sort method merged both arrays in O(min(N, M)) + O(N log N) + O(M log M) time and O(1) space.',
    intuition: 'Zero extra array allocations needed.',
    customCard: {
      title: 'Final In-Place State',
      rows: [
        { label: 'arr1', value: '[1, 2, 3, 4]', accent: true },
        { label: 'arr2', value: '[8, 9, 10]', accent: true }
      ]
    }
  }
];

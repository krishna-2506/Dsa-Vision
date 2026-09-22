// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Search in Rotated Sorted Array I',
  category: 'Binary Search',
  difficulty: 'Medium',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Searches for a target in an array of unique integers rotated at an unknown pivot. Identifies which half is sorted on each iteration to discard the impossible half in O(log N) time.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Rotated Sorted Array Search Invariant',
  nodes: [
    { id: 'root', label: 'Rotated BS Strategy', children: ['sorted-half-lemma', 'left-sorted', 'right-sorted', 'range-check'] },
    { id: 'sorted-half-lemma', label: '1. Sorted Half Invariant', detail: 'At least one half (left [low..mid] or right [mid..high]) is guaranteed to be strictly sorted' },
    { id: 'left-sorted', label: '2. Left Half Sorted (nums[low] <= nums[mid])', detail: 'Check if nums[low] <= target < nums[mid]. If yes, search left (high = mid - 1); else search right (low = mid + 1)' },
    { id: 'right-sorted', label: '3. Right Half Sorted (nums[mid] < nums[low])', detail: 'Check if nums[mid] < target <= nums[high]. If yes, search right (low = mid + 1); else search left (high = mid - 1)' },
    { id: 'range-check', label: '4. Decisive Halving', detail: 'Because target containment in a sorted slice is trivially checkable in O(1), we can always discard half' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Binary Search in Rotated Sorted Array
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) return mid;

            // Check if left half is sorted
            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) {
                    high = mid - 1; // Target in left half
                } else {
                    low = mid + 1;  // Target in right half
                }
            } 
            // Otherwise right half is guaranteed to be sorted
            else {
                if (nums[mid] < target && target <= nums[high]) {
                    low = mid + 1;  // Target in right half
                } else {
                    high = mid - 1; // Target in left half
                }
            }
        }
        return -1;
    }
};`,
  python: `# Python 3 Optimal Binary Search in Rotated Sorted Array
# Time Complexity: O(log N) | Space Complexity: O(1)
class Solution:
    def search(self, nums: list[int], target: int) -> int:
        low, high = 0, len(nums) - 1

        while low <= high:
            mid = low + (high - low) // 2

            if nums[mid] == target:
                return mid

            # Check if left half is sorted
            if nums[low] <= nums[mid]:
                if nums[low] <= target < nums[mid]:
                    high = mid - 1
                else:
                    low = mid + 1
            # Right half must be sorted
            else:
                if nums[mid] < target <= nums[high]:
                    low = mid + 1
                else:
                    high = mid - 1

        return -1`,
  java: `// Java Optimal Binary Search in Rotated Sorted Array
// Time Complexity: O(log N) | Space Complexity: O(1)
class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) return mid;

            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }
}`,
  javascript: `// JavaScript Optimal Binary Search in Rotated Sorted Array
// Time Complexity: O(log N) | Space Complexity: O(1)
var search = function(nums, target) {
    let low = 0, high = nums.length - 1;

    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);

        if (nums[mid] === target) return mid;

        if (nums[low] <= nums[mid]) {
            if (nums[low] <= target && target < nums[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }
    return -1;
};`
};

export const steps = [
  {
    title: '1. Initial State: Rotated Array nums = [4, 5, 6, 7, 0, 1, 2], Target = 0',
    phase: 'SETUP',
    track: {
      label: 'Rotated Array nums',
      items: [4, 5, 6, 7, 0, 1, 2],
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
      { label: 'Target X', value: '0' },
      { label: 'low', value: '0' },
      { label: 'high', value: '6' },
      { label: 'Pivot Property', value: 'Rotated at unknown idx' }
    ],
    variables: { low: 0, high: 6, target: 0, array: '[4, 5, 6, 7, 0, 1, 2]' },
    formula: 'Fundamental Theorem: In any rotated sorted array, at least one half is sorted.',
    action: 'Initialize binary search pointers: low = 0, high = 6',
    explain: 'Array [4, 5, 6, 7, 0, 1, 2] was originally sorted [0, 1, 2, 4, 5, 6, 7] and rotated by 4 positions. We cannot use standard binary search directly, but we can detect which half is sorted.',
    intuition: 'If an interval contains the inflection point (rotation pivot), the other half must be completely sorted.'
  },
  {
    title: '2. Pass 1: mid = 3 (val 7), Check Sorted Half',
    phase: 'IDENTIFY_HALF',
    track: {
      label: 'Rotated Array nums',
      items: [
        { value: 4, status: 'current' },
        { value: 5, status: 'current' },
        { value: 6, status: 'current' },
        { value: 7, status: 'match' },
        0, 1, 2
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
      { label: 'nums[mid]', value: '7' },
      { label: 'nums[low] <= nums[mid]', value: '4 <= 7 (TRUE)', highlight: true },
      { label: 'Sorted Region', value: 'Left [0..3]' }
    ],
    variables: { low: 0, mid: 3, high: 6, 'nums[low]': 4, 'nums[mid]': 7 },
    formula: 'nums[0] <= nums[3] (4 <= 7) ==> Left half [0..3] is sorted!',
    action: 'nums[low] <= nums[mid] is true: The left half [4, 5, 6, 7] is sorted',
    explain: 'At mid = 3, nums[mid] = 7 != target 0. Because nums[0]=4 <= nums[3]=7, the left half [4, 5, 6, 7] is monotonically ascending.',
    intuition: 'Knowing a half is sorted lets us do an exact range check to see if target is inside.'
  },
  {
    title: '3. Range Check Left Half: 4 <= target 0 < 7 is False => Discard Left',
    phase: 'ELIMINATE_HALF',
    track: {
      label: 'Rotated Array nums',
      items: [
        { value: 4, status: 'discarded' },
        { value: 5, status: 'discarded' },
        { value: 6, status: 'discarded' },
        { value: 7, status: 'discarded' },
        0, 1, 2
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
      { label: 'Left Range', value: '[4 .. 7]' },
      { label: 'Target 0 in Range?', value: '4 <= 0 < 7 (FALSE)' },
      { label: 'Action', value: 'low = mid + 1 (4)' }
    ],
    variables: { target: 0, leftInterval: '[4, 7]', contained: false, nextLow: 4 },
    formula: 'target not in [nums[low] .. nums[mid]) ==> low = mid + 1 = 4',
    action: 'Target 0 is not in sorted left half. Discard indices 0..3 and search right half',
    explain: 'Since the left half spans values from 4 to 7, target 0 cannot possibly reside there. We eliminate indices 0..3 and set low = mid + 1 = 4.',
    intuition: 'Target is not in the sorted segment, so it must be in the remaining segment.'
  },
  {
    title: '4. Pass 2 Window: low = 4, high = 6 (Active Window [0, 1, 2])',
    phase: 'UPDATE_WINDOW',
    track: {
      label: 'Rotated Array nums',
      items: [
        { value: 4, status: 'discarded' },
        { value: 5, status: 'discarded' },
        { value: 6, status: 'discarded' },
        { value: 7, status: 'discarded' },
        0, 1, 2
      ],
      pointers: [
        { index: 4, label: 'low' },
        { index: 6, label: 'high' }
      ]
    },
    activeI: 4,
    activeJ: 6,
    windowStart: 4,
    windowEnd: 6,
    metrics: [
      { label: 'low', value: '4' },
      { label: 'high', value: '6' },
      { label: 'Active Elements', value: '[0, 1, 2]' },
      { label: 'Window Size', value: '3' }
    ],
    variables: { low: 4, high: 6, activeSlice: '[0, 1, 2]' },
    formula: 'Active Range: nums[4 .. 6] containing [0, 1, 2]',
    action: 'Contract search space to [4..6]',
    explain: 'Search space is now narrowed down to indices 4 through 6 containing [0, 1, 2]. We recompute mid for this window.',
    intuition: 'Remaining slice is a normal sorted subsegment.'
  },
  {
    title: '5. Pass 2: mid = 5 (val 1), Check Sorted Half',
    phase: 'IDENTIFY_HALF',
    track: {
      label: 'Rotated Array nums',
      items: [
        { value: 4, status: 'discarded' },
        { value: 5, status: 'discarded' },
        { value: 6, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 0, status: 'current' },
        { value: 1, status: 'current' },
        2
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
      { label: 'nums[mid]', value: '1' },
      { label: 'nums[low] <= nums[mid]', value: '0 <= 1 (TRUE)', highlight: true },
      { label: 'Sorted Region', value: 'Left [4..5]' }
    ],
    variables: { low: 4, mid: 5, high: 6, 'nums[4]': 0, 'nums[5]': 1 },
    formula: 'nums[4] <= nums[5] (0 <= 1) ==> Left half [4..5] is sorted!',
    action: 'mid = 4 + (6 - 4)/2 = 5 (val 1 != 0). Left half [0, 1] is sorted',
    explain: 'nums[5] = 1 != 0. Since nums[4] = 0 <= nums[5] = 1, the left sub-half [4..5] is sorted.',
    intuition: 'Subproblem analysis repeats identically: identify sorted portion and check target boundaries.'
  },
  {
    title: '6. Range Check: 0 <= target 0 < 1 is True => Search Left Sub-half',
    phase: 'ELIMINATE_HALF',
    track: {
      label: 'Rotated Array nums',
      items: [
        { value: 4, status: 'discarded' },
        { value: 5, status: 'discarded' },
        { value: 6, status: 'discarded' },
        { value: 7, status: 'discarded' },
        0,
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' }
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
      { label: 'Left Range', value: '[0 .. 1)' },
      { label: 'Target 0 in Range?', value: '0 <= 0 < 1 (TRUE)', highlight: true },
      { label: 'Action', value: 'high = mid - 1 (4)' }
    ],
    variables: { target: 0, leftInterval: '[0, 1)', contained: true, nextHigh: 4 },
    formula: 'nums[4] <= target < nums[5] (0 <= 0 < 1) ==> high = 5 - 1 = 4',
    action: 'Target 0 is inside [nums[4]..nums[5]). Discard right half by setting high = mid - 1 = 4',
    explain: '0 is in the range [0, 1). Target must lie to the left of mid. We discard indices 5 and 6 by updating high = 4.',
    intuition: 'Target is trapped at single index 4.'
  },
  {
    title: '7. Pass 3: low = 4, high = 4 => mid = 4 (val 0) == Target 0 => Match!',
    phase: 'MATCH_FOUND',
    track: {
      label: 'Rotated Array nums',
      items: [
        { value: 4, status: 'discarded' },
        { value: 5, status: 'discarded' },
        { value: 6, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 0, status: 'match' },
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' }
      ],
      pointers: [
        { index: 4, label: 'L, M, H' }
      ]
    },
    activeI: 4,
    activeJ: null,
    windowStart: 4,
    windowEnd: 4,
    metrics: [
      { label: 'mid Index', value: '4' },
      { label: 'nums[mid]', value: '0' },
      { label: 'Target Match', value: 'nums[4] == 0 (MATCH!)', highlight: true },
      { label: 'Return Value', value: '4' }
    ],
    variables: { low: 4, mid: 4, high: 4, 'nums[4]': 0, target: 0, matched: true },
    formula: 'mid = 4 + (4 - 4) / 2 = 4; nums[4] == target (0 == 0)',
    action: 'Target 0 matched at index 4! Return 4',
    explain: 'At mid = 4, nums[4] is exactly equal to target 0. The search terminates successfully and returns index 4.',
    intuition: 'Target was pinpointed in only 3 binary steps despite the arbitrary array rotation.'
  },
  {
    title: '8. Search Result: Target 0 Located at Rotated Index 4',
    phase: 'RESULT',
    track: {
      label: 'Rotated Array nums',
      items: [
        4, 5, 6, 7,
        { value: 0, status: 'match' },
        1, 2
      ],
      pointers: [
        { index: 4, label: 'Target (idx 4)' }
      ]
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'Target Index', value: '4', highlight: true },
      { label: 'Target Value', value: '0' },
      { label: 'Comparisons Made', value: '3' }
    ],
    variables: { resultIndex: 4, target: 0, searchStatus: 'Found in O(log N)' },
    formula: 'return 4;',
    action: 'Algorithm returns index 4.',
    explain: 'Binary search over rotated arrays handles any pivot position in optimal logarithmic time.',
    intuition: 'Sorting invariance within sub-halves preserves the power of binary search.'
  },
  {
    title: '9. Completed: O(log N) Time Complexity in Rotated Arrays Verified',
    phase: 'COMPLETED',
    track: {
      label: 'Rotated Array nums',
      items: [
        4, 5, 6, 7,
        { value: 0, status: 'match' },
        1, 2
      ],
      pointers: []
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Found Index', value: '4', highlight: true },
      { label: 'Time Complexity', value: 'O(log N)' },
      { label: 'Space Complexity', value: 'O(1) In-Place' }
    ],
    variables: {
      timeComplexity: 'O(log N)',
      spaceComplexity: 'O(1)',
      uniqueness: 'Elements are distinct (no duplicate ambiguity)'
    },
    formula: 'T(N) = T(N/2) + O(1) ==> O(log N)',
    action: 'Search complete. Constant space O(1), logarithmic time O(log N).',
    explain: 'Because all elements are distinct, one half is strictly monotonic on every step, guaranteeing halving in O(log N) worst-case time.',
    intuition: 'A masterpiece of binary search adaptation.'
  }
];

// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Search Insert Position',
  category: 'Binary Search',
  difficulty: 'Easy',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the index where a target element exists or where it should be inserted to maintain monotonic sorted order. Directly maps to the Lower Bound binary search invariant in logarithmic O(log N) time.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Search Insert Position Invariant',
  nodes: [
    { id: 'root', label: 'Search Insert Strategy', children: ['lower-bound-equivalence', 'candidate-tracking', 'insertion-slot', 'logarithmic-guarantee'] },
    { id: 'lower-bound-equivalence', label: '1. Equivalence to Lower Bound', detail: 'The proper insertion point for target x is precisely the first index i where arr[i] >= x' },
    { id: 'candidate-tracking', label: '2. Candidate Position Tracking', detail: 'If arr[mid] >= target, mid can serve as the insertion slot; record ans = mid and check left (high = mid - 1)' },
    { id: 'insertion-slot', label: '3. Overshoot Rejection', detail: 'If arr[mid] < target, target must be placed strictly after mid; advance low = mid + 1' },
    { id: 'logarithmic-guarantee', label: '4. Zero Overhead O(log N)', detail: 'Solves both exact presence and missing insertions in at most ceil(log2 N) + 1 steps with O(1) space' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Search Insert Position (Lower Bound)
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int n = nums.size();
        int low = 0, high = n - 1;
        int ans = n; // Default: append at end

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] >= target) {
                ans = mid;      // Valid insertion position
                high = mid - 1; // Check for earlier insertion point
            } else {
                low = mid + 1;  // Must insert after mid
            }
        }

        return ans;
    }
};`,
  python: `# Python 3 Optimal Search Insert Position
# Time Complexity: O(log N) | Space Complexity: O(1)
class Solution:
    def searchInsert(self, nums: list[int], target: int) -> int:
        low, high = 0, len(nums) - 1
        ans = len(nums)

        while low <= high:
            mid = (low + high) // 2

            if nums[mid] >= target:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans`,
  java: `// Java Optimal Search Insert Position
// Time Complexity: O(log N) | Space Complexity: O(1)
class Solution {
    public int searchInsert(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        int ans = nums.length;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] >= target) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }
}`,
  javascript: `// JavaScript Optimal Search Insert Position
// Time Complexity: O(log N) | Space Complexity: O(1)
var searchInsert = function(nums, target) {
    let low = 0, high = nums.length - 1;
    let ans = nums.length;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (nums[mid] >= target) {
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
    title: '1. Initialize Range: nums = [1, 3, 5, 6], Target = 2',
    phase: 'SETUP',
    track: {
      label: 'Sorted Array nums',
      items: [1, 3, 5, 6],
      pointers: [
        { index: 0, label: 'low' },
        { index: 3, label: 'high' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Target Value', value: '2 (Absent from array)' },
      { label: 'Search Range', value: '[0 ... 3]' },
      { label: 'Default ans', value: 'N = 4 (Append)' },
      { label: 'Core Reduction', value: 'Lower Bound (nums[i] >= target)' }
    ],
    variables: { low: 0, high: 3, target: 2, ans: 4, n: 4 },
    formula: 'Insert Position = smallest index i such that nums[i] >= target',
    action: 'Initialize low = 0, high = 3 with fallback ans = 4',
    explain: 'Target 2 is not present in [1, 3, 5, 6]. To maintain sorted order upon insertion, target must be inserted right before the first element that is greater than or equal to 2. This is identical to Lower Bound.',
    intuition: 'If all elements are smaller than target, the insertion index is N (appended to the end).'
  },
  {
    title: '2. Pass 1: Compute mid = 1 -> nums[1] = 3 >= 2 (Predicate TRUE)',
    phase: 'EVALUATE_MID',
    track: {
      label: 'Sorted Array nums',
      items: [
        1,
        { value: 3, status: 'match' },
        5, 6
      ],
      pointers: [
        { index: 0, label: 'low' },
        { index: 1, label: 'mid' },
        { index: 3, label: 'high' }
      ]
    },
    activeI: 1,
    activeJ: null,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'mid Index', value: '1' },
      { label: 'nums[mid]', value: '3', highlight: true },
      { label: 'Predicate Check', value: '3 >= 2 (TRUE)', highlight: true },
      { label: 'Target', value: '2' }
    ],
    variables: { low: 0, mid: 1, high: 3, 'nums[mid]': 3, target: 2 },
    formula: 'mid = 0 + (3 - 0) / 2 = 1 | nums[1] = 3 >= 2',
    action: 'Evaluate mid index 1: nums[1] = 3 satisfies nums[mid] >= 2',
    explain: 'At mid = 1, nums[1] = 3 >= 2. 2 could be inserted before 3 at index 1! We record ans = 1 as our current best insertion candidate.',
    intuition: 'Inserting at index 1 would place 2 right before 3.'
  },
  {
    title: '3. Pass 1 Update: Record ans = 1 -> Explore Left Subarray [0 ... 0] via high = 0',
    phase: 'CANDIDATE_RECORDED',
    track: {
      label: 'Sorted Array nums',
      items: [
        1,
        { value: 3, status: 'match' },
        { value: 5, status: 'discarded' },
        { value: 6, status: 'discarded' }
      ],
      pointers: [
        { index: 0, label: 'low/high' }
      ]
    },
    activeI: 1,
    activeJ: null,
    windowStart: 0,
    windowEnd: 0,
    metrics: [
      { label: 'Recorded ans', value: 'Index 1', highlight: true },
      { label: 'Discarded Range', value: '[1 ... 3]' },
      { label: 'New Search Window', value: '[0 ... 0]' },
      { label: 'high updated to', value: 'mid - 1 = 0' }
    ],
    variables: { low: 0, high: 0, ans: 1, action: 'high = mid - 1 = 0' },
    formula: 'nums[mid] >= target ==> ans = mid = 1, high = mid - 1 = 0',
    action: 'Save ans = 1 and narrow search to index 0 by setting high = 0',
    explain: 'Could an even earlier element be >= 2? We test the prefix [0..0] by setting high = mid - 1 = 0.',
    intuition: 'Check if index 0 is also >= 2.'
  },
  {
    title: '4. Pass 2: Compute mid = 0 -> nums[0] = 1 < 2 (Predicate FALSE)',
    phase: 'EVALUATE_MID',
    track: {
      label: 'Sorted Array nums',
      items: [
        { value: 1, status: 'current' },
        { value: 3, status: 'match' },
        { value: 5, status: 'discarded' },
        { value: 6, status: 'discarded' }
      ],
      pointers: [
        { index: 0, label: 'low/mid/high' }
      ]
    },
    activeI: 0,
    activeJ: null,
    windowStart: 0,
    windowEnd: 0,
    metrics: [
      { label: 'mid Index', value: '0' },
      { label: 'nums[mid]', value: '1', highlight: true },
      { label: 'Predicate Check', value: '1 >= 2 (FALSE: Too Small)', highlight: true },
      { label: 'Target', value: '2' }
    ],
    variables: { low: 0, mid: 0, high: 0, 'nums[mid]': 1, target: 2, ans: 1 },
    formula: 'mid = 0 + (0 - 0) / 2 = 0 | nums[0] = 1 < 2',
    action: 'Evaluate index 0: nums[0] = 1 is strictly less than target 2',
    explain: 'At mid = 0, nums[0] = 1 < 2. Target 2 cannot be placed before index 0 because 1 is smaller than 2. Target must be placed after index 0.',
    intuition: 'Index 0 is too small; target must be placed at index 1 or later.'
  },
  {
    title: '5. Pass 2 Update: Advance low = 1 -> Search Space Exhausted',
    phase: 'ELIMINATE_LEFT',
    track: {
      label: 'Sorted Array nums',
      items: [
        { value: 1, status: 'discarded' },
        { value: 3, status: 'match' },
        { value: 5, status: 'discarded' },
        { value: 6, status: 'discarded' }
      ],
      pointers: [
        { index: 0, label: 'high (0)' },
        { index: 1, label: 'low (1)' }
      ]
    },
    activeI: 0,
    activeJ: null,
    windowStart: 1,
    windowEnd: 0,
    metrics: [
      { label: 'Comparison', value: '1 < 2 (Rule Out Index 0)', highlight: true },
      { label: 'low updated to', value: 'mid + 1 = 1' },
      { label: 'high Pointer', value: '0' },
      { label: 'Status', value: 'low > high' }
    ],
    variables: { low: 1, high: 0, ans: 1, action: 'low = mid + 1 = 1' },
    formula: 'nums[mid] < target ==> low = mid + 1 = 1',
    action: 'Discard index 0; advance low to 1',
    explain: 'low increments to 1. Because low (1) > high (0), the search domain is exhausted and the loop halts.',
    intuition: 'Both left and right branches have been completely evaluated.'
  },
  {
    title: '6. Loop Termination: low (1) > high (0) -> Final Answer Locked',
    phase: 'TERMINATION',
    track: {
      label: 'Sorted Array nums',
      items: [
        { value: 1, status: 'discarded' },
        { value: 3, status: 'match' },
        { value: 5, status: 'discarded' },
        { value: 6, status: 'discarded' }
      ],
      pointers: [
        { index: 1, label: 'Insert Spot (idx 1)' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 1,
    windowEnd: 1,
    metrics: [
      { label: 'Final ans', value: 'Index 1', highlight: true },
      { label: 'Placed Between', value: 'nums[0]=1 and nums[1]=3' },
      { label: 'Termination Check', value: 'low (1) > high (0)' },
      { label: 'Search Status', value: 'COMPLETED' }
    ],
    variables: { low: 1, high: 0, ans: 1, insertIndex: 1 },
    formula: 'low > high ==> return ans = 1',
    action: 'Search terminates; return stored insertion position index 1',
    explain: 'The algorithm terminates with ans = 1. If 2 is inserted at index 1, nums becomes [1, 2, 3, 5, 6], perfectly preserving sorted order.',
    intuition: 'Target 2 fits cleanly between 1 and 3.'
  },
  {
    title: '7. Insertion Simulation: Resulting Array [1, 2, 3, 5, 6]',
    phase: 'INSERTION_VERIFIED',
    track: {
      label: 'Post-Insertion Array [1, 2, 3, 5, 6]',
      items: [
        1,
        { value: 2, status: 'match' },
        3, 5, 6
      ],
      pointers: [
        { index: 1, label: 'New Target 2' }
      ]
    },
    activeI: 1,
    activeJ: null,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Inserted Value', value: '2', highlight: true },
      { label: 'Insertion Slot', value: 'Index 1', highlight: true },
      { label: 'Left Predecessor', value: 'nums[0] = 1 <= 2' },
      { label: 'Right Successor', value: 'nums[2] = 3 >= 2' }
    ],
    variables: { target: 2, leftVal: 1, rightVal: 3, orderPreserved: true },
    formula: 'nums[0] = 1 <= 2 <= nums[2] = 3 ==> Monotonicity Preserved!',
    action: 'Verify that inserting target 2 at index 1 maintains non-decreasing order',
    explain: 'With target 2 at index 1: nums[0]=1 <= 2 <= nums[2]=3. The entire array remains strictly non-decreasing without breaking order.',
    intuition: 'The lower bound property guarantees monotonic correctness.'
  },
  {
    title: '8. Complexity & Invariant Analysis: O(log N) Time, O(1) Space',
    phase: 'COMPLETED',
    track: {
      label: 'Original Array nums',
      items: [
        1,
        { value: 3, status: 'match' },
        5, 6
      ],
      pointers: [
        { index: 1, label: 'Insert Index 1' }
      ]
    },
    activeI: 1,
    activeJ: null,
    windowStart: 1,
    windowEnd: 1,
    metrics: [
      { label: 'Time Complexity', value: 'O(log N)', highlight: true },
      { label: 'Space Complexity', value: 'O(1) Auxiliary', highlight: true },
      { label: 'Total Comparisons', value: '2 iterations for N = 4' },
      { label: 'Works for Target Exists', value: 'Returns existing index' }
    ],
    variables: { resultIndex: 1, timeComplexity: 'O(log N)', spaceComplexity: 'O(1)' },
    formula: 'Time Complexity = ceil(log2(4)) + 1 = 3 comparisons maximum',
    action: 'Algorithm terminates in logarithmic time with zero extra space',
    explain: 'Whether the target is already present in the array or entirely absent, Search Insert Position seamlessly returns the correct index in O(log N) time using O(1) auxiliary memory.',
    intuition: 'Unifying element search and insert position into a single elegant invariant.'
  }
];

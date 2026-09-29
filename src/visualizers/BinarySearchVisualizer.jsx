// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  leetcode_id: 704,
  title: 'Binary Search (Iterative & Optimal)',
  category: 'Binary Search',
  difficulty: 'Easy',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1) Auxiliary Space',
  leetcodeUrl: 'https://leetcode.com/problems/binary-search/',
  description: 'Searches for a target value within a monotonically sorted array by iteratively halving the search space until the element is located or the interval collapses.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Binary Search Strategy',
  nodes: [
    { id: 'root', label: 'Search Space Halving Invariant', children: ['interval-bounds', 'midpoint-calculation', 'trichotomy-comparison', 'interval-update', 'complexity'] },
    { id: 'interval-bounds', label: '1. Boundary Pointers', detail: 'Initialize low = 0 and high = N - 1 spanning the complete candidate search window.' },
    { id: 'midpoint-calculation', label: '2. Safe Midpoint', detail: 'Compute mid = low + (high - low) / 2 to avoid integer 32-bit overflow.' },
    { id: 'trichotomy-comparison', label: '3. Three-Way Branching', detail: 'Test: nums[mid] == target (found), nums[mid] < target (search right), or nums[mid] > target (search left).' },
    { id: 'interval-update', label: '4. Decisive Pruning', detail: 'Discard half the elements on every check: set low = mid + 1 or high = mid - 1.' },
    { id: 'complexity', label: '5. Logarithmic Guarantee', detail: 'Search space N -> N/2 -> N/4 -> ... -> 1 resolves in at most ceil(log2(N)) comparisons.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Iterative Binary Search
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int low = 0;
        int high = (int)nums.size() - 1;

        while (low <= high) {
            // Prevent integer overflow
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid; // Target found
            } else if (nums[mid] < target) {
                low = mid + 1; // Discard left half
            } else {
                high = mid - 1; // Discard right half
            }
        }

        return -1; // Target not found
    }
};`,
  python: `# Python 3 Optimal Binary Search
# Time Complexity: O(log N) | Space Complexity: O(1)
class Solution:
    def search(self, nums: list[int], target: int) -> int:
        low = 0
        high = len(nums) - 1

        while low <= high:
            mid = low + (high - low) // 2

            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                low = mid + 1
            else:
                high = mid - 1

        return -1`,
  java: `// Java Optimal Binary Search
// Time Complexity: O(log N) | Space Complexity: O(1)
class Solution {
    public int search(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return -1;
    }
}`,
  javascript: `// JavaScript Optimal Binary Search
// Time Complexity: O(log N) | Space Complexity: O(1)
var search = function(nums, target) {
    let low = 0;
    let high = nums.length - 1;

    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;
};`
};

export const steps = [
  {
    title: '1. Initialize Range [0..9] & Check Midpoint (val=24)',
    phase: 'INITIALIZATION',
    codeLine: 11,
    track: {
      label: 'nums (sorted)',
      items: [
        { val: 3, status: 'default' },
        { val: 8, status: 'default' },
        { val: 12, status: 'default' },
        { val: 17, status: 'default' },
        { val: 24, status: 'current' },
        { val: 31, status: 'default' },
        { val: 45, status: 'default' },
        { val: 59, status: 'default' },
        { val: 72, status: 'default' },
        { val: 88, status: 'default' }
      ]
    },
    pointers: [
      { index: 0, label: 'low', color: 'accent' },
      { index: 4, label: 'mid', color: 'amber' },
      { index: 9, label: 'high', color: 'indigo' }
    ],
    windowStart: 0,
    windowEnd: 9,
    metrics: [
      { label: 'Target', value: '45' },
      { label: 'low', value: '0' },
      { label: 'high', value: '9' },
      { label: 'mid', value: '4 (val: 24)' }
    ],
    customCard: {
      title: 'Midpoint Evaluation',
      rows: [
        { label: 'Formula', value: 'mid = 0 + (9 - 0)/2 = 4' },
        { label: 'Comparison', value: 'nums[4] = 24 < target 45' },
        { label: 'Decision', value: 'Target is strictly rightward; low = mid + 1' }
      ]
    },
    formula: 'low = 0, high = 9; mid = 4; nums[4] = 24 < 45',
    action: 'Compute midpoint index 4. Compare nums[4] = 24 against target 45.',
    explain: 'Array is sorted. Since 24 < 45, all values from index 0 to 4 are guaranteed strictly smaller than 45.',
    intuition: 'We safely eliminate the entire left half [0..4] in a single step.'
  },
  {
    title: '2. Discard Left Half: New Range [5..9], Midpoint at Index 7 (val=59)',
    phase: 'RANGE_PRUNING',
    codeLine: 18,
    track: {
      label: 'nums (sorted)',
      items: [
        { val: 3, status: 'dimmed' },
        { val: 8, status: 'dimmed' },
        { val: 12, status: 'dimmed' },
        { val: 17, status: 'dimmed' },
        { val: 24, status: 'dimmed' },
        { val: 31, status: 'default' },
        { val: 45, status: 'default' },
        { val: 59, status: 'current' },
        { val: 72, status: 'default' },
        { val: 88, status: 'default' }
      ]
    },
    pointers: [
      { index: 5, label: 'low', color: 'accent' },
      { index: 7, label: 'mid', color: 'amber' },
      { index: 9, label: 'high', color: 'indigo' }
    ],
    windowStart: 5,
    windowEnd: 9,
    metrics: [
      { label: 'Target', value: '45' },
      { label: 'low', value: '5' },
      { label: 'high', value: '9' },
      { label: 'mid', value: '7 (val: 59)' }
    ],
    customCard: {
      title: 'Midpoint Evaluation',
      rows: [
        { label: 'Formula', value: 'mid = 5 + (9 - 5)/2 = 7' },
        { label: 'Comparison', value: 'nums[7] = 59 > target 45' },
        { label: 'Decision', value: 'Target is strictly leftward; high = mid - 1' }
      ]
    },
    formula: 'low = mid + 1 = 5; mid = 5 + (9-5)/2 = 7; nums[7] = 59 > 45',
    action: 'Set low = 5. Recalculate mid = 7 (val 59). Compare with target 45.',
    explain: '59 is larger than target 45. All elements at indices >= 7 are too large and can be pruned.',
    intuition: 'Search space reduced from 10 elements to 5, and now will reduce to 2.'
  },
  {
    title: '3. Discard Right Half: New Range [5..6], Midpoint at Index 5 (val=31)',
    phase: 'RANGE_PRUNING',
    codeLine: 20,
    track: {
      label: 'nums (sorted)',
      items: [
        { val: 3, status: 'dimmed' },
        { val: 8, status: 'dimmed' },
        { val: 12, status: 'dimmed' },
        { val: 17, status: 'dimmed' },
        { val: 24, status: 'dimmed' },
        { val: 31, status: 'current' },
        { val: 45, status: 'default' },
        { val: 59, status: 'dimmed' },
        { val: 72, status: 'dimmed' },
        { val: 88, status: 'dimmed' }
      ]
    },
    pointers: [
      { index: 5, label: 'low/mid', color: 'amber' },
      { index: 6, label: 'high', color: 'indigo' }
    ],
    windowStart: 5,
    windowEnd: 6,
    metrics: [
      { label: 'Target', value: '45' },
      { label: 'low', value: '5' },
      { label: 'high', value: '6' },
      { label: 'mid', value: '5 (val: 31)' }
    ],
    customCard: {
      title: 'Midpoint Evaluation',
      rows: [
        { label: 'Formula', value: 'mid = 5 + (6 - 5)/2 = 5' },
        { label: 'Comparison', value: 'nums[5] = 31 < target 45' },
        { label: 'Decision', value: 'Target is rightward; low = mid + 1 = 6' }
      ]
    },
    formula: 'high = mid - 1 = 6; mid = 5; nums[5] = 31 < 45',
    action: 'Set high = 6. Mid = 5 (val 31). Compare 31 < 45.',
    explain: '31 < 45. The element at index 5 is eliminated. Search space narrows to index 6.',
    intuition: 'Only 1 candidate remains in the active interval.'
  },
  {
    title: '4. Target Match Found: nums[6] = 45!',
    phase: 'TARGET_FOUND',
    codeLine: 15,
    track: {
      label: 'nums (sorted)',
      items: [
        { val: 3, status: 'dimmed' },
        { val: 8, status: 'dimmed' },
        { val: 12, status: 'dimmed' },
        { val: 17, status: 'dimmed' },
        { val: 24, status: 'dimmed' },
        { val: 31, status: 'dimmed' },
        { val: 45, status: 'match' },
        { val: 59, status: 'dimmed' },
        { val: 72, status: 'dimmed' },
        { val: 88, status: 'dimmed' }
      ]
    },
    pointers: [
      { index: 6, label: 'low/mid/high', color: 'accent' }
    ],
    windowStart: 6,
    windowEnd: 6,
    metrics: [
      { label: 'Target', value: '45' },
      { label: 'Found Index', value: '6' },
      { label: 'Comparisons', value: '4' },
      { label: 'Status', value: 'MATCH SUCCESS' }
    ],
    customCard: {
      title: 'Exact Match Confirmation',
      rows: [
        { label: 'Active Pointer', value: 'low = high = mid = 6' },
        { label: 'Equality Check', value: 'nums[6] == 45 (True)' },
        { label: 'Return Value', value: 'return mid (index 6)' }
      ]
    },
    formula: 'low = 6, high = 6; mid = 6; nums[6] == 45 (FOUND!)',
    action: 'low = 6, high = 6. mid = 6. nums[6] = 45 matches target exactly! Return 6.',
    explain: 'Target 45 is located at index 6 in exactly 4 comparisons on a 10-element array.',
    intuition: 'Logarithmic search halving located the value in O(log N) steps instead of O(N).'
  },
  {
    title: '5. Search Complete: Return Index 6',
    phase: 'COMPLETED',
    codeLine: 16,
    track: {
      label: 'nums (final)',
      items: [
        { val: 3, status: 'dimmed' },
        { val: 8, status: 'dimmed' },
        { val: 12, status: 'dimmed' },
        { val: 17, status: 'dimmed' },
        { val: 24, status: 'dimmed' },
        { val: 31, status: 'dimmed' },
        { val: 45, status: 'match' },
        { val: 59, status: 'dimmed' },
        { val: 72, status: 'dimmed' },
        { val: 88, status: 'dimmed' }
      ]
    },
    pointers: [
      { index: 6, label: 'result = 6', color: 'accent' }
    ],
    windowStart: 6,
    windowEnd: 6,
    metrics: [
      { label: 'Return Value', value: '6' },
      { label: 'Time Complexity', value: 'O(log N)' },
      { label: 'Space Complexity', value: 'O(1)' },
      { label: 'Max Comparisons for N=10', value: '4' }
    ],
    customCard: {
      title: 'Complexity Guarantee',
      rows: [
        { label: 'Time Complexity', value: 'O(log2 N) = ceil(log2 10) = 4 iterations' },
        { label: 'Space Complexity', value: 'O(1) auxiliary (3 scalar variables)' },
        { label: 'Overflow Guard', value: 'mid = low + (high - low)/2 prevents (low + high) overflow' }
      ]
    },
    formula: 'return 6; // Target 45 resides at index 6',
    action: 'Binary search terminates with success.',
    explain: 'Successfully identified index 6 in O(log N) runtime.',
    intuition: 'Even for 1 billion elements (N = 10^9), binary search takes at most 30 comparisons!'
  }
];

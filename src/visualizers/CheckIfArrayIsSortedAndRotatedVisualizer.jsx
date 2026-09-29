// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  leetcode_id: 1752,
  title: 'Check if Array is Sorted and Rotated',
  category: 'Arrays & Two Pointers',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  leetcodeUrl: 'https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/',
  description: 'Determines whether an array was originally sorted in non-decreasing order and then rotated some number of positions by verifying that at most one descending drop exists cyclically.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Cyclic Drop Count Strategy',
  nodes: [
    { id: 'root', label: 'Rotated Monotonic Invariant', children: ['cyclic-inspection', 'drop-definition', 'single-pivot-rule', 'wrap-around-check', 'complexity'] },
    { id: 'cyclic-inspection', label: '1. Cyclic Pairwise Scan', detail: 'Inspect all pairs nums[i] and nums[(i + 1) % N] across the full circle.' },
    { id: 'drop-definition', label: '2. Drop Detection (nums[i] > nums[i+1])', detail: 'A "drop" occurs wherever an element strictly exceeds the immediately subsequent element.' },
    { id: 'single-pivot-rule', label: '3. At Most One Pivot', detail: 'A sorted array rotated by K positions contains at most 1 drop (the wrap boundary from max back to min).' },
    { id: 'wrap-around-check', label: '4. Wrap-Around Guard', detail: 'Comparing the last element with the first element (nums[N-1] > nums[0]) accounts for the rotation seam.' },
    { id: 'complexity', label: '5. Linear Single Pass', detail: 'O(N) runtime visiting each adjacent pair exactly once with strictly O(1) registers.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Single-Pass Cyclic Check
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    bool check(vector<int>& nums) {
        int count = 0;
        int n = nums.size();

        for (int i = 0; i < n; i++) {
            // Check adjacent pair including cyclic wrap-around
            if (nums[i] > nums[(i + 1) % n]) {
                count++;
            }
        }

        // Valid if at most 1 drop occurs
        return count <= 1;
    }
};`,
  python: `# Python 3 Optimal Cyclic Drop Count
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def check(self, nums: list[int]) -> bool:
        count = 0
        n = len(nums)

        for i in range(n):
            if nums[i] > nums[(i + 1) % n]:
                count += 1

        return count <= 1`,
  java: `// Java Optimal Cyclic Drop Count
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public boolean check(int[] nums) {
        int count = 0;
        int n = nums.length;

        for (int i = 0; i < n; i++) {
            if (nums[i] > nums[(i + 1) % n]) {
                count++;
            }
        }

        return count <= 1;
    }
}`,
  javascript: `// JavaScript Optimal Cyclic Drop Count
// Time Complexity: O(N) | Space Complexity: O(1)
var check = function(nums) {
    let count = 0;
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        if (nums[i] > nums[(i + 1) % n]) {
            count++;
        }
    }

    return count <= 1;
};`
};

export const steps = [
  {
    title: '1. Setup Cyclic Traversal on [3, 4, 5, 1, 2]',
    phase: 'INITIALIZATION',
    codeLine: 11,
    track: {
      label: 'nums',
      items: [
        { val: 3, status: 'default' },
        { val: 4, status: 'default' },
        { val: 5, status: 'default' },
        { val: 1, status: 'default' },
        { val: 2, status: 'default' }
      ]
    },
    pointers: [
      { index: 0, label: 'i=0', color: 'accent' }
    ],
    metrics: [
      { label: 'Array Length', value: '5' },
      { label: 'Drop Count', value: '0' },
      { label: 'Threshold', value: 'count <= 1' },
      { label: 'Active Pair', value: 'nums[0] vs nums[1]' }
    ],
    customCard: {
      title: 'Cyclic Scan Strategy',
      rows: [
        { label: 'Concept', value: 'A sorted & rotated array can drop at most once (at the rotation pivot)' },
        { label: 'Formula', value: 'Check nums[i] > nums[(i + 1) % N] for all i in [0..N-1]' },
        { label: 'Initial Drops', value: 'count = 0' }
      ]
    },
    formula: 'count = 0; N = 5;',
    action: 'Initialize drop counter count = 0. Begin pairwise comparison across the array.',
    explain: 'If the array was originally sorted, rotating it cuts it into at most two sorted segments with one drop.',
    intuition: 'If count is 0, the array was never rotated (already sorted). If count is 1, it is rotated. If count > 1, it is invalid.'
  },
  {
    title: '2. Compare nums[0]=3 vs nums[1]=4: 3 <= 4 (Valid)',
    phase: 'SCANNING',
    codeLine: 15,
    track: {
      label: 'nums',
      items: [
        { val: 3, status: 'current' },
        { val: 4, status: 'current' },
        { val: 5, status: 'default' },
        { val: 1, status: 'default' },
        { val: 2, status: 'default' }
      ]
    },
    pointers: [
      { index: 0, label: 'i', color: 'accent' },
      { index: 1, label: 'i+1', color: 'amber' }
    ],
    activeIndices: [0, 1],
    metrics: [
      { label: 'Pair Inspected', value: '3 vs 4' },
      { label: 'Comparison', value: '3 <= 4' },
      { label: 'Drop Detected?', value: 'No' },
      { label: 'Drop Count', value: '0' }
    ],
    customCard: {
      title: 'Adjacent Evaluation',
      rows: [
        { label: 'Condition', value: 'nums[0] > nums[1] is False (3 <= 4)' },
        { label: 'Action', value: 'Order is non-decreasing; continue scan' },
        { label: 'Drop Count', value: 'count remains 0' }
      ]
    },
    formula: 'nums[0] <= nums[1]; count = 0',
    action: 'Compare nums[0] (3) with nums[1] (4). No order violation.',
    explain: 'Elements at indices 0 and 1 follow sorted order.',
    intuition: 'Monotonic progression holds so far.'
  },
  {
    title: '3. Compare nums[1]=4 vs nums[2]=5: 4 <= 5 (Valid)',
    phase: 'SCANNING',
    codeLine: 15,
    track: {
      label: 'nums',
      items: [
        { val: 3, status: 'default' },
        { val: 4, status: 'current' },
        { val: 5, status: 'current' },
        { val: 1, status: 'default' },
        { val: 2, status: 'default' }
      ]
    },
    pointers: [
      { index: 1, label: 'i', color: 'accent' },
      { index: 2, label: 'i+1', color: 'amber' }
    ],
    activeIndices: [1, 2],
    metrics: [
      { label: 'Pair Inspected', value: '4 vs 5' },
      { label: 'Comparison', value: '4 <= 5' },
      { label: 'Drop Detected?', value: 'No' },
      { label: 'Drop Count', value: '0' }
    ],
    customCard: {
      title: 'Adjacent Evaluation',
      rows: [
        { label: 'Condition', value: 'nums[1] > nums[2] is False (4 <= 5)' },
        { label: 'Action', value: 'Order is non-decreasing; continue scan' },
        { label: 'Drop Count', value: 'count remains 0' }
      ]
    },
    formula: 'nums[1] <= nums[2]; count = 0',
    action: 'Compare nums[1] (4) with nums[2] (5). No order violation.',
    explain: 'Subarray [3, 4, 5] is monotonically non-decreasing.',
    intuition: 'Prefix remains purely sorted.'
  },
  {
    title: '4. Compare nums[2]=5 vs nums[3]=1: 5 > 1 (ROTATION PIVOT!)',
    phase: 'DROP_DETECTED',
    codeLine: 16,
    track: {
      label: 'nums',
      items: [
        { val: 3, status: 'default' },
        { val: 4, status: 'default' },
        { val: 5, status: 'match' },
        { val: 1, status: 'current' },
        { val: 2, status: 'default' }
      ]
    },
    pointers: [
      { index: 2, label: 'pivot peak', color: 'amber' },
      { index: 3, label: 'pivot trough', color: 'accent' }
    ],
    activeIndices: [2, 3],
    metrics: [
      { label: 'Pair Inspected', value: '5 vs 1' },
      { label: 'Comparison', value: '5 > 1 (VIOLATION)' },
      { label: 'Drop Detected?', value: 'YES' },
      { label: 'Drop Count', value: '1 (count++)' }
    ],
    customCard: {
      title: 'Pivot Point Identified',
      rows: [
        { label: 'Condition', value: 'nums[2] > nums[3] is True (5 > 1)' },
        { label: 'Significance', value: 'This is the rotation boundary between max (5) and min (1)' },
        { label: 'Drop Count', value: 'count incremented to 1 (allowed: <= 1)' }
      ]
    },
    formula: 'nums[2] > nums[3]; count++; // count becomes 1',
    action: '5 > 1. A drop is detected! Increment count from 0 to 1.',
    explain: 'This drop corresponds to the original array cut where the maximum element wraps to the minimum.',
    intuition: 'Exactly 1 drop is expected and permitted in a rotated sorted array.'
  },
  {
    title: '5. Compare nums[3]=1 vs nums[4]=2: 1 <= 2 (Valid)',
    phase: 'SCANNING',
    codeLine: 15,
    track: {
      label: 'nums',
      items: [
        { val: 3, status: 'default' },
        { val: 4, status: 'default' },
        { val: 5, status: 'dimmed' },
        { val: 1, status: 'current' },
        { val: 2, status: 'current' }
      ]
    },
    pointers: [
      { index: 3, label: 'i', color: 'accent' },
      { index: 4, label: 'i+1', color: 'amber' }
    ],
    activeIndices: [3, 4],
    metrics: [
      { label: 'Pair Inspected', value: '1 vs 2' },
      { label: 'Comparison', value: '1 <= 2' },
      { label: 'Drop Count', value: '1' }
    ],
    customCard: {
      title: 'Adjacent Evaluation',
      rows: [
        { label: 'Condition', value: 'nums[3] > nums[4] is False (1 <= 2)' },
        { label: 'Action', value: 'Second sorted segment continues' },
        { label: 'Drop Count', value: 'count remains 1' }
      ]
    },
    formula: 'nums[3] <= nums[4]; count remains 1',
    action: 'Compare nums[3] (1) with nums[4] (2). 1 <= 2. Valid.',
    explain: 'Second half [1, 2] is internally sorted.',
    intuition: 'Only the cyclic wrap-around comparison remains.'
  },
  {
    title: '6. Cyclic Wrap-Around: nums[4]=2 vs nums[0]=3: 2 <= 3 (Valid)',
    phase: 'WRAP_AROUND',
    codeLine: 15,
    track: {
      label: 'nums (cyclic check)',
      items: [
        { val: 3, status: 'current' },
        { val: 4, status: 'default' },
        { val: 5, status: 'default' },
        { val: 1, status: 'default' },
        { val: 2, status: 'current' }
      ]
    },
    pointers: [
      { index: 4, label: 'nums[N-1]', color: 'amber' },
      { index: 0, label: 'nums[0]', color: 'accent' }
    ],
    activeIndices: [0, 4],
    metrics: [
      { label: 'Wrap Pair', value: 'nums[4] vs nums[0]' },
      { label: 'Comparison', value: '2 <= 3' },
      { label: 'Total Drops', value: '1' },
      { label: 'Threshold', value: 'count <= 1 -> TRUE' }
    ],
    customCard: {
      title: 'Cyclic Boundary Check',
      rows: [
        { label: 'Cyclic Index', value: '(4 + 1) % 5 = 0' },
        { label: 'Condition', value: 'nums[4] > nums[0] is False (2 <= 3)' },
        { label: 'Verification', value: 'Last element seamlessly wraps to first without extra drop' }
      ]
    },
    formula: 'nums[4] <= nums[(4 + 1) % 5]; count = 1 <= 1',
    action: 'Compare last element nums[4] (2) with first element nums[0] (3). 2 <= 3. Valid!',
    explain: 'Because 2 <= 3, the wrap-around does not create a second drop. Total drops remain exactly 1.',
    intuition: 'If nums[4] had been greater than nums[0], a second drop would have invalidated the rotation.'
  },
  {
    title: '7. Final Decision: Return True (Valid Rotated Sorted Array)',
    phase: 'COMPLETED',
    codeLine: 20,
    track: {
      label: 'nums (valid)',
      items: [
        { val: 3, status: 'match' },
        { val: 4, status: 'match' },
        { val: 5, status: 'match' },
        { val: 1, status: 'match' },
        { val: 2, status: 'match' }
      ]
    },
    pointers: [
      { index: 2, label: 'rotation point', color: 'amber' }
    ],
    activeIndices: [0, 1, 2, 3, 4],
    metrics: [
      { label: 'Result', value: 'true' },
      { label: 'Total Drops', value: '1' },
      { label: 'Original Array', value: '[1, 2, 3, 4, 5]' },
      { label: 'Rotation Steps', value: 'Rotated by 2 positions' }
    ],
    customCard: {
      title: 'Verification Summary',
      rows: [
        { label: 'Condition Met', value: 'count <= 1 (1 <= 1 is True)' },
        { label: 'Time Complexity', value: 'O(N) single-pass cyclic traversal' },
        { label: 'Space Complexity', value: 'O(1) auxiliary registers' }
      ]
    },
    formula: 'return count <= 1; // true',
    action: 'Array is guaranteed to be a valid rotated sorted array. Return true.',
    explain: 'Array [3, 4, 5, 1, 2] is a cyclic shift of sorted array [1, 2, 3, 4, 5] by 2 positions.',
    intuition: 'Checking (i + 1) % N turns a multi-case conditional into a single elegant 4-line loop.'
  }
];
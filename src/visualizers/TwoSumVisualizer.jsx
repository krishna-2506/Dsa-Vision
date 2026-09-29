// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  leetcode_id: 167,
  title: 'Two Sum II - Input Array Is Sorted',
  category: 'Arrays & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
  description: 'Find two numbers such that they add up to a target sum in a sorted array using opposing Two Pointers in O(N) time and O(1) extra space.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Two Pointers Search Strategy',
  nodes: [
    { id: 'root', label: 'Sorted Array Two-Pointer Invariant', children: ['bound-pointers', 'sum-check', 'branch-decision', 'match-termination', 'complexity'] },
    { id: 'bound-pointers', label: '1. Boundary Pointers', detail: 'Place left = 0 (smallest available element) and right = N - 1 (largest available element).' },
    { id: 'sum-check', label: '2. Evaluate Pair Sum', detail: 'Compute currentSum = nums[left] + nums[right] and compare with target.' },
    { id: 'branch-decision', label: '3. Monotonic Adjustment', detail: 'If sum < target: increment left to enlarge sum. If sum > target: decrement right to diminish sum.' },
    { id: 'match-termination', label: '4. Exact Target Match', detail: 'When currentSum == target, the unique pair is discovered; return 1-based indices [left + 1, right + 1].' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Linear O(N) runtime visiting each element at most once with strictly O(1) auxiliary memory.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Two Pointers on Sorted Array
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int left = 0;
        int right = (int)numbers.size() - 1;

        while (left < right) {
            int currentSum = numbers[left] + numbers[right];

            if (currentSum == target) {
                // Return 1-based indices as required by LeetCode 167
                return {left + 1, right + 1};
            } else if (currentSum < target) {
                left++; // Sum too small -> advance left pointer
            } else {
                right--; // Sum too large -> advance right pointer
            }
        }

        return {};
    }
};`,
  python: `# Python 3 Optimal Two Pointers on Sorted Array
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        left = 0
        right = len(numbers) - 1

        while left < right:
            current_sum = numbers[left] + numbers[right]

            if current_sum == target:
                return [left + 1, right + 1]
            elif current_sum < target:
                left += 1
            else:
                right -= 1

        return []`,
  java: `// Java Optimal Two Pointers on Sorted Array
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0;
        int right = numbers.length - 1;

        while (left < right) {
            int currentSum = numbers[left] + numbers[right];

            if (currentSum == target) {
                return new int[]{left + 1, right + 1};
            } else if (currentSum < target) {
                left++;
            } else {
                right--;
            }
        }

        return new int[]{};
    }
}`,
  javascript: `// JavaScript Optimal Two Pointers on Sorted Array
// Time Complexity: O(N) | Space Complexity: O(1)
var twoSum = function(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        const currentSum = numbers[left] + numbers[right];

        if (currentSum === target) {
            return [left + 1, right + 1];
        } else if (currentSum < target) {
            left++;
        } else {
            right--;
        }
    }

    return [];
};`
};

const ARRAY = [2, 7, 11, 15, 19, 23];
const TARGET = 26;

export const steps = [
  {
    title: '1. Setup Opposing Pointers',
    phase: 'INITIALIZATION',
    codeLine: 8,
    track: {
      label: 'nums (sorted)',
      items: [
        { val: 2, status: 'current' },
        { val: 7, status: 'default' },
        { val: 11, status: 'default' },
        { val: 15, status: 'default' },
        { val: 19, status: 'default' },
        { val: 23, status: 'current' }
      ]
    },
    pointers: [
      { index: 0, label: 'left', color: 'accent' },
      { index: 5, label: 'right', color: 'amber' }
    ],
    activeIndices: [0, 5],
    metrics: [
      { label: 'Target', value: '26' },
      { label: 'left (idx 0)', value: '2' },
      { label: 'right (idx 5)', value: '23' },
      { label: 'Current Sum', value: '25' }
    ],
    customCard: {
      title: 'Boundary Evaluation',
      rows: [
        { label: 'nums[left] + nums[right]', value: '2 + 23 = 25' },
        { label: 'Target Comparison', value: '25 < 26 (Deficit of 1)' },
        { label: 'Action Decision', value: 'left++ (advance leftward bound)' }
      ]
    },
    formula: 'left = 0, right = N - 1; sum = nums[0] + nums[5] = 25',
    action: 'Initialize left at index 0 (val 2) and right at index 5 (val 23). Compute initial pair sum.',
    explain: 'Array is monotonically sorted. The smallest possible sum with right=5 is 2 + 23 = 25. Since 25 < 26, any pair with left=0 and a smaller right will be even smaller than 25.',
    intuition: 'Sorting gives us directionality. Because 2 + 23 is already too small, no other element paired with 2 can ever reach 26, so left=0 can be permanently eliminated.'
  },
  {
    title: '2. Increment Left Pointer (left: 0 -> 1)',
    phase: 'POINTER_SHIFT',
    codeLine: 18,
    track: {
      label: 'nums (sorted)',
      items: [
        { val: 2, status: 'dimmed' },
        { val: 7, status: 'current' },
        { val: 11, status: 'default' },
        { val: 15, status: 'default' },
        { val: 19, status: 'default' },
        { val: 23, status: 'current' }
      ]
    },
    pointers: [
      { index: 1, label: 'left', color: 'accent' },
      { index: 5, label: 'right', color: 'amber' }
    ],
    activeIndices: [1, 5],
    metrics: [
      { label: 'Target', value: '26' },
      { label: 'left (idx 1)', value: '7' },
      { label: 'right (idx 5)', value: '23' },
      { label: 'Current Sum', value: '30' }
    ],
    customCard: {
      title: 'Boundary Evaluation',
      rows: [
        { label: 'nums[left] + nums[right]', value: '7 + 23 = 30' },
        { label: 'Target Comparison', value: '30 > 26 (Surplus of 4)' },
        { label: 'Action Decision', value: 'right-- (contract rightward bound)' }
      ]
    },
    formula: 'left++; sum = nums[1] + nums[5] = 7 + 23 = 30',
    action: 'Increment left to index 1 (value 7). Calculate new sum 7 + 23 = 30.',
    explain: 'Sum 30 exceeds target 26. Since elements to the right of left are only larger, pairing right=5 (val 23) with any remaining index >= 1 will always produce a sum >= 30.',
    intuition: 'Because 7 + 23 is strictly greater than 26, right=5 cannot pair with any valid element in [1..5]. Thus, right=5 is safely eliminated.'
  },
  {
    title: '3. Decrement Right Pointer (right: 5 -> 4)',
    phase: 'POINTER_SHIFT',
    codeLine: 20,
    track: {
      label: 'nums (sorted)',
      items: [
        { val: 2, status: 'dimmed' },
        { val: 7, status: 'match' },
        { val: 11, status: 'default' },
        { val: 15, status: 'default' },
        { val: 19, status: 'match' },
        { val: 23, status: 'dimmed' }
      ]
    },
    pointers: [
      { index: 1, label: 'left', color: 'accent' },
      { index: 4, label: 'right', color: 'amber' }
    ],
    activeIndices: [1, 4],
    metrics: [
      { label: 'Target', value: '26' },
      { label: 'left (idx 1)', value: '7' },
      { label: 'right (idx 4)', value: '19' },
      { label: 'Current Sum', value: '26' }
    ],
    customCard: {
      title: 'Target Match Found!',
      rows: [
        { label: 'nums[left] + nums[right]', value: '7 + 19 = 26' },
        { label: 'Target Comparison', value: '26 == 26 (EXACT MATCH!)' },
        { label: '1-Based Indices', value: '[left + 1, right + 1] = [2, 5]' }
      ]
    },
    formula: 'right--; sum = nums[1] + nums[4] = 7 + 19 = 26 == target',
    action: 'Decrement right to index 4 (value 19). Evaluate sum: 7 + 19 = 26.',
    explain: 'The current sum 26 exactly matches our target 26. The search terminates immediately.',
    intuition: 'Each iteration permanently rules out either the left candidate or the right candidate, yielding a strictly monotonic window reduction in O(N) steps.'
  },
  {
    title: '4. Return 1-Based Indices: [2, 5]',
    phase: 'COMPLETED',
    codeLine: 13,
    track: {
      label: 'nums (sorted)',
      items: [
        { val: 2, status: 'dimmed' },
        { val: 7, status: 'match' },
        { val: 11, status: 'dimmed' },
        { val: 15, status: 'dimmed' },
        { val: 19, status: 'match' },
        { val: 23, status: 'dimmed' }
      ]
    },
    pointers: [
      { index: 1, label: 'ans[0]', color: 'accent' },
      { index: 4, label: 'ans[1]', color: 'amber' }
    ],
    activeIndices: [1, 4],
    metrics: [
      { label: 'Result', value: '[2, 5]' },
      { label: 'Values', value: '7 + 19 = 26' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    customCard: {
      title: 'Final Summary',
      rows: [
        { label: 'Matching Values', value: 'nums[1] = 7, nums[4] = 19' },
        { label: 'Output Format', value: '1-based indices: [2, 5]' },
        { label: 'Comparison Steps', value: 'Found in only 3 pointer steps' }
      ]
    },
    formula: 'return {left + 1, right + 1}; // {2, 5}',
    action: 'Return vector/array [2, 5]. Execution successfully completed.',
    explain: 'The algorithm identified the exact solution in 3 steps without allocating any auxiliary memory arrays or hash structures.',
    intuition: 'Opposing two pointers on a sorted array transforms an otherwise O(N²) quadratic search space into an elegant O(N) linear sweep with zero heap allocations.'
  }
];

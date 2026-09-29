export const rendererType = 'array-scan';

export const meta = {
  title: 'Count All Subsequences with Sum K',
  category: 'Recursion / Backtracking',
  difficulty: 'Medium',
  timeComplexity: 'O(2^N)',
  spaceComplexity: 'O(N) recursion stack',
  description: 'Counts the total number of subsequences in an array whose elements sum up to target K by recursively branching into pick and not-pick and summing the results of both subtrees.'
};

export const ideaMap = [
  {
    title: 'The Counting Pattern in Recursion',
    description: 'Instead of passing a global counter or recording full paths, each recursive frame returns the count of valid subsequences found in its subtree: return pick + notPick.'
  },
  {
    title: 'Base Case Evaluation',
    description: 'When idx reaches the array length (base case), return 1 if currentSum == k, otherwise return 0.'
  },
  {
    title: 'Exhaustive Pick / Not-Pick Tree',
    description: 'Every element has two binary decisions: either include nums[idx] in the sum, or exclude it. The total number of leaves is 2^N.'
  }
];

export const solutions = {
  cpp: `// C++ Count All Subsequences with Sum K
// Time: O(2^N) | Space: O(N) recursion stack
#include <vector>
using namespace std;

class Solution {
private:
    int countSubsequences(int idx, int currentSum, int k, const vector<int>& nums) {
        // Base case: end of array reached
        if (idx == nums.size()) {
            return (currentSum == k) ? 1 : 0;
        }

        // Branch 1: Pick nums[idx]
        int pick = countSubsequences(idx + 1, currentSum + nums[idx], k, nums);

        // Branch 2: Don't pick nums[idx]
        int notPick = countSubsequences(idx + 1, currentSum, k, nums);

        // Aggregate counts from both branches
        return pick + notPick;
    }

public:
    int countSubsequenceWithTargetSum(vector<int>& nums, int k) {
        return countSubsequences(0, 0, k, nums);
    }
};`,
  python: `# Python 3 Count All Subsequences with Sum K
class Solution:
    def countSubsequenceWithTargetSum(self, nums: list[int], k: int) -> int:
        def solve(idx: int, current_sum: int) -> int:
            if idx == len(nums):
                return 1 if current_sum == k else 0

            # Branch 1: Pick nums[idx]
            pick = solve(idx + 1, current_sum + nums[idx])

            # Branch 2: Don't pick nums[idx]
            not_pick = solve(idx + 1, current_sum)

            return pick + not_pick

        return solve(0, 0)`,
  java: `// Java Count All Subsequences with Sum K
class Solution {
    private int countSubsequences(int idx, int currentSum, int k, int[] nums) {
        if (idx == nums.length) {
            return (currentSum == k) ? 1 : 0;
        }

        // Branch 1: Pick
        int pick = countSubsequences(idx + 1, currentSum + nums[idx], k, nums);

        // Branch 2: Not Pick
        int notPick = countSubsequences(idx + 1, currentSum, k, nums);

        return pick + notPick;
    }

    public int countSubsequenceWithTargetSum(int[] nums, int k) {
        return countSubsequences(0, 0, k, nums);
    }
}`,
  javascript: `// JavaScript Count All Subsequences with Sum K
var countSubsequenceWithTargetSum = function(nums, k) {
    function solve(idx, currentSum) {
        if (idx === nums.length) {
            return currentSum === k ? 1 : 0;
        }

        // Branch 1: Pick nums[idx]
        const pick = solve(idx + 1, currentSum + nums[idx]);

        // Branch 2: Don't pick nums[idx]
        const notPick = solve(idx + 1, currentSum);

        return pick + notPick;
    }

    return solve(0, 0);
};`
};

export const steps = [
  {
    title: '1. Initialization: Array [1, 2, 1], Target Sum K = 2',
    phase: 'INITIAL',
    codeLine: 35,
    arr: [
      { val: 1, state: 'pointer', label: 'idx=0' },
      { val: 2, state: 'inactive' },
      { val: 1, state: 'inactive' }
    ],
    pointers: [{ name: 'idx', index: 0 }],
    auxiliaryTrack: [
      { label: 'Current Chosen Subsequence', items: [] },
      { label: 'Subsequences with Sum 2', items: [] }
    ],
    customCard: {
      title: 'Recursion Frame: Root',
      rows: [
        { label: 'Current Index', value: 'idx = 0' },
        { label: 'Current Sum', value: '0' },
        { label: 'Target K', value: '2' },
        { label: 'Strategy', value: 'return pick + notPick' }
      ]
    },
    variables: { idx: 0, currentSum: 0, k: 2, validCount: 0 },
    explain: 'Start recursive traversal at index 0 with currentSum = 0. We will compute the sum of valid subsequences in the pick and not-pick branches.',
    intuition: 'The return pick + notPick pattern allows a function to tally total successful branches without maintaining shared mutable state.'
  },
  {
    title: '2. Branch Pick nums[0] = 1: Sum becomes 0 + 1 = 1',
    phase: 'PICK',
    codeLine: 26,
    arr: [
      { val: 1, state: 'active', label: 'picked' },
      { val: 2, state: 'pointer', label: 'idx=1' },
      { val: 1, state: 'inactive' }
    ],
    pointers: [{ name: 'idx', index: 1 }],
    auxiliaryTrack: [
      { label: 'Current Chosen Subsequence', items: [1] },
      { label: 'Subsequences with Sum 2', items: [] }
    ],
    customCard: {
      title: 'Branch: Pick nums[0]',
      rows: [
        { label: 'Element Picked', value: 'nums[0] = 1' },
        { label: 'New Sum', value: '1' },
        { label: 'Next Index', value: 'idx = 1' },
        { label: 'Action', value: 'Explore subtree with sum 1' }
      ]
    },
    variables: { idx: 1, currentSum: 1, k: 2, validCount: 0 },
    explain: 'Pick nums[0]. Recurse with idx = 1 and currentSum = 1.',
    intuition: 'Advance to next element with updated running sum.'
  },
  {
    title: '3. Branch Pick nums[1] = 2: Sum becomes 1 + 2 = 3',
    phase: 'PICK',
    codeLine: 26,
    arr: [
      { val: 1, state: 'active' },
      { val: 2, state: 'active', label: 'picked' },
      { val: 1, state: 'pointer', label: 'idx=2' }
    ],
    pointers: [{ name: 'idx', index: 2 }],
    auxiliaryTrack: [
      { label: 'Current Chosen Subsequence', items: [1, 2] },
      { label: 'Subsequences with Sum 2', items: [] }
    ],
    customCard: {
      title: 'Branch: Pick nums[1]',
      rows: [
        { label: 'Element Picked', value: 'nums[1] = 2' },
        { label: 'New Sum', value: '3' },
        { label: 'Target K', value: '2' },
        { label: 'Status', value: 'Sum 3 exceeds target K' }
      ]
    },
    variables: { idx: 2, currentSum: 3, k: 2, validCount: 0 },
    explain: 'Picking nums[1] increases sum to 3.',
    intuition: 'Subsequent base cases for this branch will yield sum != 2 and return 0.'
  },
  {
    title: '4. Backtrack nums[1], Explore Not-Pick nums[1]: Sum remains 1',
    phase: 'NOT_PICK',
    codeLine: 29,
    arr: [
      { val: 1, state: 'active' },
      { val: 2, state: 'inactive', label: 'skipped' },
      { val: 1, state: 'pointer', label: 'idx=2' }
    ],
    pointers: [{ name: 'idx', index: 2 }],
    auxiliaryTrack: [
      { label: 'Current Chosen Subsequence', items: [1] },
      { label: 'Subsequences with Sum 2', items: [] }
    ],
    customCard: {
      title: 'Branch: Not-Pick nums[1]',
      rows: [
        { label: 'Element Skipped', value: 'nums[1] = 2' },
        { label: 'Current Sum', value: '1' },
        { label: 'Next Index', value: 'idx = 2' },
        { label: 'Action', value: 'Explore candidate nums[2] = 1' }
      ]
    },
    variables: { idx: 2, currentSum: 1, k: 2, validCount: 0 },
    explain: 'Branch 2 for nums[1]: do not pick 2. Sum remains 1. Next evaluate nums[2].',
    intuition: 'Exploring both pick and not-pick ensures exhaustive tree coverage.'
  },
  {
    title: '5. Pick nums[2] = 1: Sum = 1 + 1 = 2 -> Base Case Returns 1! (Match 1)',
    phase: 'MATCH_FOUND',
    codeLine: 22,
    arr: [
      { val: 1, state: 'match', label: 'in sub' },
      { val: 2, state: 'inactive' },
      { val: 1, state: 'match', label: 'in sub' }
    ],
    pointers: [{ name: 'idx', index: 3 }],
    auxiliaryTrack: [
      { label: 'Current Chosen Subsequence', items: [1, 1] },
      { label: 'Subsequences with Sum 2', items: ['[1, 1]'] }
    ],
    customCard: {
      title: 'Base Case Reached (idx == 3)',
      rows: [
        { label: 'Subsequence', value: '[1, 1]' },
        { label: 'Sum', value: '2 == K' },
        { label: 'Return Value', value: '1 (Valid subsequence)' },
        { label: 'Valid Count', value: '1' }
      ]
    },
    variables: { idx: 3, currentSum: 2, k: 2, validCount: 1, returnVal: 1 },
    explain: 'Base case reached at idx = 3. currentSum (2) == k (2), so this leaf returns 1. Subsequence [1, 1] matches!',
    intuition: 'Leaves where currentSum == k contribute 1 to the ancestor sum.'
  },
  {
    title: '6. Root Branch 2: Not-Pick nums[0] = 1, Pick nums[1] = 2 -> Sum = 2 (Match 2)',
    phase: 'MATCH_FOUND',
    codeLine: 22,
    arr: [
      { val: 1, state: 'inactive', label: 'skipped' },
      { val: 2, state: 'match', label: 'picked' },
      { val: 1, state: 'inactive', label: 'skipped' }
    ],
    pointers: [{ name: 'idx', index: 3 }],
    auxiliaryTrack: [
      { label: 'Current Chosen Subsequence', items: [2] },
      { label: 'Subsequences with Sum 2', items: ['[1, 1]', '[2]'] }
    ],
    customCard: {
      title: 'Second Valid Branch',
      rows: [
        { label: 'Subsequence', value: '[2]' },
        { label: 'Sum', value: '2 == K' },
        { label: 'Return Value', value: '1' },
        { label: 'Cumulative Count', value: '2' }
      ]
    },
    variables: { idx: 3, currentSum: 2, k: 2, validCount: 2, returnVal: 1 },
    explain: 'Skipping nums[0], picking nums[1] = 2, and skipping nums[2] achieves sum 2. Base case returns 1. Subsequence [2] matches!',
    intuition: 'Every distinct selection path is evaluated independently.'
  },
  {
    title: '7. Unwinding Recursion: pick (1) + notPick (1) = 2',
    phase: 'COMPLETED',
    codeLine: 31,
    arr: [
      { val: 1, state: 'match' },
      { val: 2, state: 'match' },
      { val: 1, state: 'match' }
    ],
    pointers: [],
    auxiliaryTrack: [
      { label: 'Discovered Subsequences', items: ['[1, 1]', '[2]'] }
    ],
    customCard: {
      title: 'Final Count Summary',
      rows: [
        { label: 'Total Subsequences', value: '2' },
        { label: 'Matching Subsets', value: '[1, 1] and [2]' },
        { label: 'Aggregation Pattern', value: 'pick + notPick = 1 + 1 = 2' },
        { label: 'Complexity', value: 'O(2^N) Time | O(N) Space' }
      ]
    },
    variables: { finalCount: 2, k: 2, subsequences: '[[1, 1], [2]]' },
    explain: 'All 2^3 = 8 binary recursion paths evaluated. The pick branch returned 1, and the not-pick branch returned 1. Root returns 1 + 1 = 2.',
    intuition: 'Returning integer counts at each node cleanly bubbles up the global total.'
  }
];

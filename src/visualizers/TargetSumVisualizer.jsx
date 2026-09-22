// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Target Sum (DP-21)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N × S₁) Time',
  spaceComplexity: 'O(S₁) Space-Optimized',
  description: 'Assigns + or - signs to elements of an array so that the entire expression evaluates to the target. Mathematically reduces to finding the number of subsets with sum S₁ = (TotalSum + Target) / 2.'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Target Sum (DP-21)',
  nodes: [
    { id: 'root', label: 'Target Sum Solver', children: ['math-reduction', 'validity-checks', 'subset-dp'] },
    { id: 'math-reduction', label: '1. Mathematical Transformation', detail: 'Let P be positives, N be negatives. P - N = target and P + N = totalSum => 2P = totalSum + target => P = (totalSum + target) / 2' },
    { id: 'validity-checks', label: '2. Feasibility Pre-Checks', detail: 'If (totalSum + target) is odd or totalSum < |target|, 0 ways are possible.' },
    { id: 'subset-dp', label: '3. 0/1 Subset Sum Tabulation', children: ['exclude-num', 'include-num'] },
    { id: 'exclude-num', label: 'Exclude num', detail: 'dp[i-1][s] (Don\'t assign + to num)' },
    { id: 'include-num', label: 'Include num', detail: 'dp[i-1][s - num] (Assign + to num)' }
  ]
};

export const solutions = {
  cpp: `// C++ Target Sum
// Time: O(N * S1) | Space: O(S1)
#include <vector>
#include <numeric>
#include <cmath>
using namespace std;

class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int totalSum = accumulate(nums.begin(), nums.end(), 0);
        if (totalSum - target < 0 || (totalSum + target) % 2 != 0) return 0;

        int s1 = (totalSum + target) / 2;
        vector<int> dp(s1 + 1, 0);
        dp[0] = 1;

        for (int num : nums) {
            for (int s = s1; s >= num; s--) {
                dp[s] += dp[s - num];
            }
        }

        return dp[s1];
    }
};`,
  python: `# Python 3 Target Sum
# Time: O(N * S1) | Space: O(S1)
class Solution:
    def findTargetSumWays(self, nums: list[int], target: int) -> int:
        total_sum = sum(nums)
        if total_sum - target < 0 or (total_sum + target) % 2 != 0:
            return 0

        s1 = (total_sum + target) // 2
        dp = [0] * (s1 + 1)
        dp[0] = 1

        for num in nums:
            for s in range(s1, num - 1, -1):
                dp[s] += dp[s - num]

        return dp[s1]`,
  java: `// Java Target Sum
// Time: O(N * S1) | Space: O(S1)
class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        int totalSum = 0;
        for (int x : nums) totalSum += x;
        if (totalSum - target < 0 || (totalSum + target) % 2 != 0) return 0;

        int s1 = (totalSum + target) / 2;
        int[] dp = new int[s1 + 1];
        dp[0] = 1;

        for (int num : nums) {
            for (int s = s1; s >= num; s--) {
                dp[s] += dp[s - num];
            }
        }

        return dp[s1];
    }
}`,
  javascript: `// JavaScript Target Sum
// Time: O(N * S1) | Space: O(S1)
var findTargetSumWays = function(nums, target) {
    const totalSum = nums.reduce((a, b) => a + b, 0);
    if (totalSum - target < 0 || (totalSum + target) % 2 !== 0) return 0;

    const s1 = (totalSum + target) / 2;
    const dp = new Array(s1 + 1).fill(0);
    dp[0] = 1;

    for (const num of nums) {
        for (let s = s1; s >= num; s--) {
            dp[s] += dp[s - num];
        }
    }

    return dp[s1];
};`
};

export const steps = [
  {
    phase: 'SETUP',
    grid: [
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 1', 'Num 2', 'Num 3'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4'],
    activeCell: { r: 0, c: 0 },
    formula: 'P - N = Target (1), P + N = TotalSum (7) => P = (7 + 1) / 2 = 4',
    action: 'Reduce Target Sum to: Count Subsets with Sum = 4 from nums = [1, 1, 2, 3].',
    explain: 'Assigning signs partitions the array into positive set P and negative set N. Solving the system yields P = (TotalSum + Target) / 2 = 4. We now count subsets summing to 4.',
    intuition: 'Converting algebraic sign assignment into standard subset counting.',
    metrics: [
      { label: 'Nums', value: '[1, 1, 2, 3]' },
      { label: 'Target', value: 1 },
      { label: 'Target Subset S₁', value: 4, highlight: true }
    ]
  },
  {
    phase: 'ROW_1_FIRST_1',
    grid: [
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 1', 'Num 2', 'Num 3'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4'],
    activeCell: { r: 1, c: 1 },
    dependencyCells: [{ r: 0, c: 1, label: 'excl=0' }, { r: 0, c: 0, label: 'incl=1' }],
    formula: 's = 1: dp[0][1] + dp[0][0] = 0 + 1 = 1 way',
    action: 'Process first num = 1: forms sum 0 in 1 way, sum 1 in 1 way.',
    explain: 'With only the first 1, subset sum 0 has 1 way (empty set) and sum 1 has 1 way ({1}). All larger sums remain 0.',
    intuition: 'Single item gives two outcome sums: 0 and 1.',
    metrics: [
      { label: 'Active Num', value: 1 },
      { label: 'dp[1][1]', value: 1 }
    ]
  },
  {
    phase: 'ROW_2_SECOND_1',
    grid: [
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 2, 1, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 1', 'Num 2', 'Num 3'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4'],
    activeCell: { r: 2, c: 1 },
    dependencyCells: [{ r: 1, c: 1, label: 'excl=1' }, { r: 1, c: 0, label: 'incl=1' }],
    formula: 's = 1: dp[1][1] + dp[1][0] = 1 + 1 = 2 ways ({1a}, {1b})',
    action: 'Process second num = 1: sum 1 now has 2 ways, sum 2 has 1 way.',
    explain: 'At sum 1, we can either choose the first 1 or the second 1, yielding 2 distinct subsets. At sum 2, choosing both 1s ({1, 1}) gives 1 way.',
    intuition: 'Duplicate items create multiple distinct index subsets.',
    metrics: [
      { label: 'Active Num', value: 'second 1' },
      { label: 'Ways for sum 1', value: 2, highlight: true },
      { label: 'Ways for sum 2', value: 1 }
    ]
  },
  {
    phase: 'ROW_3_NUM_2',
    grid: [
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 2, 1, 0, 0],
      [1, 2, 2, 2, 1],
      [1, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 1', 'Num 2', 'Num 3'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4'],
    activeCell: { r: 3, c: 4 },
    dependencyCells: [{ r: 2, c: 4, label: 'excl=0' }, { r: 2, c: 2, label: 'incl=1' }],
    formula: 's = 4: dp[2][4] + dp[2][2] = 0 + 1 = 1 way ({1, 1, 2})',
    action: 'Process num = 2: reaches target sum 4 for the first time!',
    explain: 'Sum 4 is formed by combining num 2 with previous sum 2 ({1, 1}), giving subset {1, 1, 2} (val 4). dp[3][4] = 1.',
    intuition: 'First candidate subset {1, 1, 2} identified.',
    metrics: [
      { label: 'Active Num', value: 2 },
      { label: 'Ways for sum 4', value: 1, highlight: true }
    ]
  },
  {
    phase: 'ROW_4_NUM_3_SUM_3',
    grid: [
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 2, 1, 0, 0],
      [1, 2, 2, 2, 1],
      [1, 2, 2, 3, 1]
    ],
    rowLabels: ['None', 'Num 1', 'Num 1', 'Num 2', 'Num 3'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4'],
    activeCell: { r: 4, c: 3 },
    dependencyCells: [{ r: 3, c: 3, label: 'excl=2' }, { r: 3, c: 0, label: 'incl=1' }],
    formula: 's = 3: dp[3][3] + dp[3][0] = 2 + 1 = 3 ways',
    action: 'Process num = 3 at sum 3: exclude 3 (2 ways) + include 3 (1 way) = 3 ways.',
    explain: 'Subsets reaching sum 3: 1) {1a, 2}, 2) {1b, 2}, 3) {3}. Total ways = 3.',
    intuition: 'Intermediate sum 3 accumulates 3 combinations.',
    metrics: [
      { label: 'Active Num', value: 3 },
      { label: 'Ways for sum 3', value: 3 }
    ]
  },
  {
    phase: 'ROW_4_NUM_3_SUM_4_TERMINAL',
    grid: [
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 2, 1, 0, 0],
      [1, 2, 2, 2, 1],
      [1, 2, 2, 3, 3]
    ],
    rowLabels: ['None', 'Num 1', 'Num 1', 'Num 2', 'Num 3'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4'],
    activeCell: { r: 4, c: 4 },
    dependencyCells: [{ r: 3, c: 4, label: 'excl=1' }, { r: 3, c: 1, label: 'incl=2' }],
    formula: 's = 4: dp[3][4] + dp[3][1] = 1 + 2 = 3 ways',
    action: 'Evaluate terminal cell [4, 4]: 3 distinct subsets sum to S₁ = 4!',
    explain: 'To form sum 4:\n- Exclude 3: dp[3][4] = 1 way ({1, 1, 2})\n- Include 3: dp[3][1] = 2 ways ({1a, 3} and {1b, 3})\nTotal ways = 1 + 2 = 3 ways!',
    intuition: 'Terminal cell holds 3 distinct subsets.',
    metrics: [
      { label: 'Terminal Cell', value: '[4, 4]' },
      { label: 'Total Ways', value: 3, highlight: true }
    ]
  },
  {
    phase: 'EXPRESSION_EXPANSION',
    grid: [
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 2, 1, 0, 0],
      [1, 2, 2, 2, 1],
      [1, 2, 2, 3, 3]
    ],
    rowLabels: ['None', 'Num 1', 'Num 1', 'Num 2', 'Num 3'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4'],
    activeCell: { r: 4, c: 4 },
    formula: 'Sign Assignments: (+1 -1 -2 +3 = 1), (-1 +1 -2 +3 = 1), (+1 +1 +2 -3 = 1)',
    action: 'Translate the 3 subsets back into signed expressions.',
    explain: '1. Positive {1a, 3}, Negative {1b, 2} ➔ +1 - 1 - 2 + 3 = 1\n2. Positive {1b, 3}, Negative {1a, 2} ➔ -1 + 1 - 2 + 3 = 1\n3. Positive {1a, 1b, 2}, Negative {3} ➔ +1 + 1 + 2 - 3 = 1\nAll 3 expressions evaluate exactly to Target = 1!',
    intuition: 'Each subset of sum S₁ corresponds 1-to-1 with an expression evaluating to target.',
    metrics: [
      { label: 'Expr 1', value: '+1 -1 -2 +3 = 1' },
      { label: 'Expr 2', value: '-1 +1 -2 +3 = 1' },
      { label: 'Expr 3', value: '+1 +1 +2 -3 = 1' }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 2, 1, 0, 0],
      [1, 2, 2, 2, 1],
      [1, 2, 2, 3, 3]
    ],
    rowLabels: ['None', 'Num 1', 'Num 1', 'Num 2', 'Num 3'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4'],
    activeCell: { r: 4, c: 4 },
    formula: 'Output: 3 | O(N × S₁) Time, O(S₁) Space',
    action: 'Algorithm complete! 3 valid expressions.',
    explain: 'Using reverse 1D traversal: dp[s] += dp[s - num], the problem completes in O(N × S₁) time with only O(S₁) space. Any case where totalSum < target or (totalSum + target) % 2 != 0 returns 0 in O(1).',
    intuition: 'Algebraic reduction simplifies exponential 2^N brute force to pseudo-polynomial DP.',
    metrics: [
      { label: 'Nums', value: '[1, 1, 2, 3]' },
      { label: 'Target', value: 1 },
      { label: 'Total Ways', value: 3, highlight: true }
    ]
  }
];

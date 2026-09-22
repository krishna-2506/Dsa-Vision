// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Partition Equal Subset Sum (DP-15)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N × (TotalSum / 2)) Time',
  spaceComplexity: 'O(TotalSum / 2) Space-Optimized',
  description: 'Determines whether an array can be partitioned into two disjoint subsets with equal sums. If the total array sum is odd, partitioning is impossible. If even, the problem reduces to finding whether any subset sums to TotalSum / 2.'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Partition Equal Subset Sum (DP-15)',
  nodes: [
    { id: 'root', label: 'Equal Subset Partition', children: ['parity-check', 'reduction', 'dp-subproblem'] },
    { id: 'parity-check', label: '1. Parity Check', detail: 'If TotalSum % 2 != 0, equal integer split is impossible => return False immediately in O(1).' },
    { id: 'reduction', label: '2. Reduction to Subset Sum', detail: 'If TotalSum is even, find if any subset sums to Target = TotalSum / 2.' },
    { id: 'dp-subproblem', label: '3. 0/1 Knapsack Boolean Table', children: ['exclude-elem', 'include-elem'] },
    { id: 'exclude-elem', label: 'Exclude Element', detail: 'dp[i-1][t] (Target achievable without current item)' },
    { id: 'include-elem', label: 'Include Element', detail: 'dp[i-1][t - nums[i-1]] (Target achievable with current item)' }
  ]
};

export const solutions = {
  cpp: `// C++ Partition Equal Subset Sum
// Time: O(N * Target) | Space: O(Target)
#include <vector>
#include <numeric>
using namespace std;

class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int totalSum = accumulate(nums.begin(), nums.end(), 0);
        if (totalSum % 2 != 0) return false;

        int target = totalSum / 2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;

        for (int num : nums) {
            for (int j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }

        return dp[target];
    }
};`,
  python: `# Python 3 Partition Equal Subset Sum
# Time: O(N * Target) | Space: O(Target)
class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        total_sum = sum(nums)
        if total_sum % 2 != 0:
            return False

        target = total_sum // 2
        dp = [False] * (target + 1)
        dp[0] = True

        for num in nums:
            for j in range(target, num - 1, -1):
                dp[j] = dp[j] or dp[j - num]

        return dp[target]`,
  java: `// Java Partition Equal Subset Sum
// Time: O(N * Target) | Space: O(Target)
class Solution {
    public boolean canPartition(int[] nums) {
        int totalSum = 0;
        for (int num : nums) totalSum += num;
        if (totalSum % 2 != 0) return false;

        int target = totalSum / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;

        for (int num : nums) {
            for (int j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }

        return dp[target];
    }
}`,
  javascript: `// JavaScript Partition Equal Subset Sum
// Time: O(N * Target) | Space: O(Target)
var canPartition = function(nums) {
    const totalSum = nums.reduce((a, b) => a + b, 0);
    if (totalSum % 2 !== 0) return false;

    const target = totalSum / 2;
    const dp = new Array(target + 1).fill(false);
    dp[0] = true;

    for (const num of nums) {
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }

    return dp[target];
};`
};

export const steps = [
  {
    phase: 'SETUP',
    grid: [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 5a', 'Num 11', 'Num 5b'],
    colLabels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    activeCell: { r: 0, c: 0 },
    formula: 'TotalSum = 1 + 5 + 11 + 5 = 22 (Even) => Target = 22 / 2 = 11',
    action: 'Check parity: TotalSum = 22 is even. Problem reduces to finding subset sum = 11.',
    explain: 'Because both subsets must have equal sum, their sum must each equal TotalSum / 2 = 11. We set up a boolean subset sum DP matrix targeting 11.',
    intuition: 'Finding one subset summing to 11 automatically leaves the rest summing to 11.',
    metrics: [
      { label: 'Array', value: '[1, 5, 11, 5]' },
      { label: 'TotalSum', value: 22 },
      { label: 'Target', value: 11, highlight: true }
    ]
  },
  {
    phase: 'ROW_1_NUM_1',
    grid: [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 5a', 'Num 11', 'Num 5b'],
    colLabels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    activeCell: { r: 1, c: 1 },
    dependencyCells: [{ r: 0, c: 0, label: 'incl=T' }],
    formula: 'num = 1: dp[1][1] = dp[0][0] = True',
    action: 'Process num = 1: achievable sums are 0 ({}) and 1 ({1}).',
    explain: 'With only element 1, sums 0 and 1 are achievable. Remaining columns stay False (0).',
    intuition: 'Base element sets initial reachability.',
    metrics: [
      { label: 'Active Num', value: 1 },
      { label: 'Reachable', value: '{0, 1}' }
    ]
  },
  {
    phase: 'ROW_2_NUM_5A',
    grid: [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 5a', 'Num 11', 'Num 5b'],
    colLabels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    activeCell: { r: 2, c: 6 },
    dependencyCells: [{ r: 1, c: 1, label: 'incl=T' }],
    formula: 'num = 5: sums 5 ({5a}) and 6 ({1, 5a}) become True',
    action: 'Process first num = 5: achievable sums expand to {0, 1, 5, 6}.',
    explain: 'Adding 5 to previous reachable sums {0, 1} enables sums 5 (0 + 5) and 6 (1 + 5). Cells [2, 5] and [2, 6] turn True.',
    intuition: 'Subset sums expand with the addition of element 5.',
    metrics: [
      { label: 'Active Num', value: '5a' },
      { label: 'Reachable', value: '{0, 1, 5, 6}', highlight: true }
    ]
  },
  {
    phase: 'ROW_3_NUM_11',
    grid: [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 5a', 'Num 11', 'Num 5b'],
    colLabels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    activeCell: { r: 3, c: 11 },
    dependencyCells: [{ r: 2, c: 0, label: 'incl: 11+0=11' }],
    formula: 'num = 11: dp[2][11 - 11] = dp[2][0] = True => dp[3][11] = True!',
    action: 'Process num = 11: standalone element 11 reaches Target 11 directly!',
    explain: 'At sum 11, including element 11 with the empty set (dp[2][0] = True) immediately yields 11. Target sum 11 is already reachable!',
    intuition: 'Single element 11 matches half the total sum.',
    metrics: [
      { label: 'Active Num', value: 11 },
      { label: 'Target 11', value: 'TRUE', highlight: true }
    ]
  },
  {
    phase: 'ROW_4_NUM_5B',
    grid: [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1]
    ],
    rowLabels: ['None', 'Num 1', 'Num 5a', 'Num 11', 'Num 5b'],
    colLabels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    activeCell: { r: 4, c: 11 },
    dependencyCells: [{ r: 3, c: 11, label: 'excl=T' }, { r: 3, c: 6, label: 'incl: 5+6=11' }],
    formula: 'dp[4][11] = dp[3][11] || dp[3][6] = True || True = True',
    action: 'Process second num = 5: reveals complementary subset {1, 5a, 5b} summing to 11!',
    explain: 'Second 5 adds to sum 6 ({1, 5a}) giving 5 + 6 = 11. So sum 11 can be formed both as {11} and as {1, 5a, 5b}. Terminal cell [4, 11] confirms True!',
    intuition: 'Both complementary subsets sum to 11 simultaneously.',
    metrics: [
      { label: 'Terminal Cell', value: '[4, 11]' },
      { label: 'canPartition', value: 'TRUE', highlight: true }
    ]
  },
  {
    phase: 'PARTITION_VALIDATION',
    grid: [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1]
    ],
    rowLabels: ['None', 'Num 1', 'Num 5a', 'Num 11', 'Num 5b'],
    colLabels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    activeCell: { r: 4, c: 11 },
    formula: 'Subset 1: {11} (sum 11) | Subset 2: {1, 5, 5} (sum 11)',
    action: 'Verify partition into two disjoint equal subsets.',
    explain: 'Array [1, 5, 11, 5] splits into:\n- Subset A: {11} ➔ Sum = 11\n- Subset B: {1, 5, 5} ➔ Sum = 1 + 5 + 5 = 11\nBoth subsets have identical sum 11 and partition the original array completely.',
    intuition: 'Perfect balanced partition achieved.',
    metrics: [
      { label: 'Subset A Sum', value: 11 },
      { label: 'Subset B Sum', value: 11 },
      { label: 'Equal Partition', value: 'YES' }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1]
    ],
    rowLabels: ['None', 'Num 1', 'Num 5a', 'Num 11', 'Num 5b'],
    colLabels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    activeCell: { r: 4, c: 11 },
    formula: 'Output: true | O(N × Target) Time, O(Target) Space',
    action: 'Algorithm complete! Output is true.',
    explain: 'By using 1D reverse boolean array dp[j] = dp[j] || dp[j - num], the algorithm runs in O(N × Target) time and O(Target) memory. Any odd sum array exits in O(1) immediately.',
    intuition: 'Equal partition successfully determined via 0/1 knapsack reduction.',
    metrics: [
      { label: 'canPartition', value: 'true', highlight: true },
      { label: 'Time Complexity', value: 'O(N × Target)' },
      { label: 'Space Complexity', value: 'O(Target)' }
    ]
  }
];

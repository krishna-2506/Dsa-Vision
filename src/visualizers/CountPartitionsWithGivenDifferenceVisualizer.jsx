// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Count Partitions with Given Difference (DP-18)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N × Target) Time',
  spaceComplexity: 'O(Target) Space-Optimized',
  description: 'Counts the number of partitions of an array into two subsets S1 and S2 such that sum(S1) - sum(S2) = D. Mathematically transforms into finding the number of subsets with sum S1 = (TotalSum + D) / 2.'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Count Partitions with Given Difference',
  nodes: [
    { id: 'root', label: 'Partition Difference Counter', children: ['algebraic-identity', 'validity-checks', 'subset-sum-matrix'] },
    { id: 'algebraic-identity', label: '1. Mathematical Identity', detail: 'S1 - S2 = D and S1 + S2 = TotalSum => 2*S1 = TotalSum + D => S1 = (TotalSum + D) / 2' },
    { id: 'validity-checks', label: '2. Parity & Feasibility Constraints', detail: 'If (TotalSum + D) is odd or TotalSum < D, 0 partitions exist.' },
    { id: 'subset-sum-matrix', label: '3. 0/1 Subset Sum DP', children: ['not-pick', 'pick'] },
    { id: 'not-pick', label: 'Not Pick', detail: 'dp[i-1][target] (Exclude current element)' },
    { id: 'pick', label: 'Pick', detail: 'dp[i-1][target - arr[i-1]] (Include current element)' }
  ]
};

export const solutions = {
  cpp: `// C++ Count Partitions with Given Difference
// Time: O(N * Target) | Space: O(Target)
#include <vector>
#include <numeric>
using namespace std;

class Solution {
    const int MOD = 1e9 + 7;
public:
    int countPartitions(int n, int d, vector<int>& arr) {
        int totalSum = accumulate(arr.begin(), arr.end(), 0);
        if (totalSum - d < 0 || (totalSum + d) % 2 != 0) return 0;

        int target = (totalSum + d) / 2;
        vector<int> dp(target + 1, 0);

        dp[0] = 1;

        for (int num : arr) {
            for (int t = target; t >= num; t--) {
                dp[t] = (dp[t] + dp[t - num]) % MOD;
            }
        }

        return dp[target];
    }
};`,
  python: `# Python 3 Count Partitions with Given Difference
# Time: O(N * Target) | Space: O(Target)
class Solution:
    def countPartitions(self, n: int, d: int, arr: list[int]) -> int:
        MOD = 10**9 + 7
        total_sum = sum(arr)
        if total_sum - d < 0 or (total_sum + d) % 2 != 0:
            return 0

        target = (total_sum + d) // 2
        dp = [0] * (target + 1)
        dp[0] = 1

        for num in arr:
            for t in range(target, num - 1, -1):
                dp[t] = (dp[t] + dp[t - num]) % MOD

        return dp[target]`,
  java: `// Java Count Partitions with Given Difference
// Time: O(N * Target) | Space: O(Target)
class Solution {
    static final int MOD = (int)1e9 + 7;

    public int countPartitions(int n, int d, int[] arr) {
        int totalSum = 0;
        for (int x : arr) totalSum += x;
        if (totalSum - d < 0 || (totalSum + d) % 2 != 0) return 0;

        int target = (totalSum + d) / 2;
        int[] dp = new int[target + 1];
        dp[0] = 1;

        for (int num : arr) {
            for (int t = target; t >= num; t--) {
                dp[t] = (dp[t] + dp[t - num]) % MOD;
            }
        }

        return dp[target];
    }
}`,
  javascript: `// JavaScript Count Partitions with Given Difference
// Time: O(N * Target) | Space: O(Target)
var countPartitions = function(n, d, arr) {
    const MOD = 1e9 + 7;
    const totalSum = arr.reduce((a, b) => a + b, 0);
    if (totalSum - d < 0 || (totalSum + d) % 2 !== 0) return 0;

    const target = (totalSum + d) / 2;
    const dp = new Array(target + 1).fill(0);
    dp[0] = 1;

    for (const num of arr) {
        for (let t = target; t >= num; t--) {
            dp[t] = (dp[t] + dp[t - num]) % MOD;
        }
    }

    return dp[target];
};`
};

export const steps = [
  {
    phase: 'SETUP',
    grid: [
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 3', 'Num 4'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4', 'S:5', 'S:6'],
    activeCell: { r: 0, c: 0 },
    formula: 'S1 - S2 = D (2), S1 + S2 = 10 => S1 = (10 + 2) / 2 = 6',
    action: 'Reduce problem to counting subsets summing to target S1 = 6 from arr = [1, 2, 3, 4].',
    explain: 'Instead of brute force partitioning into 2^N subsets, we observe that S1 = (TotalSum + D) / 2 = 6. Any subset summing to 6 leaves a complementary subset summing to 4, guaranteeing difference D = 6 - 4 = 2.',
    intuition: 'Converting a difference constraint into a single target subset sum.',
    metrics: [
      { label: 'Array', value: '[1, 2, 3, 4]' },
      { label: 'Diff D', value: 2 },
      { label: 'Target S1', value: 6, highlight: true }
    ]
  },
  {
    phase: 'ROW_1_NUM_1',
    grid: [
      [1, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 3', 'Num 4'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4', 'S:5', 'S:6'],
    activeCell: { r: 1, c: 1 },
    dependencyCells: [{ r: 0, c: 1, label: 'excl=0' }, { r: 0, c: 0, label: 'incl=1' }],
    formula: 's = 1: dp[0][1] + dp[0][0] = 0 + 1 = 1 way',
    action: 'Process num = 1: can form sum 0 (1 way) and sum 1 (1 way).',
    explain: 'Using only element 1, we can form sum 0 (empty set) and sum 1 ({1}). All other sums remain 0.',
    intuition: 'Base element creates first nonzero entries.',
    metrics: [
      { label: 'Active Num', value: 1 },
      { label: 'dp[1][1]', value: 1 }
    ]
  },
  {
    phase: 'ROW_2_NUM_2',
    grid: [
      [1, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 3', 'Num 4'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4', 'S:5', 'S:6'],
    activeCell: { r: 2, c: 3 },
    dependencyCells: [{ r: 1, c: 3, label: 'excl=0' }, { r: 1, c: 1, label: 'incl=1' }],
    formula: 's = 3: dp[1][3] + dp[1][1] = 0 + 1 = 1 way ({1, 2})',
    action: 'Process num = 2: can form sums 0, 1, 2, and 3 in 1 way each.',
    explain: 'Adding 2 enables forming sum 2 ({2}) and sum 3 ({1, 2}). Rows 0..3 now have 1 way each.',
    intuition: 'Consecutive powers of combinations expand reachable sums.',
    metrics: [
      { label: 'Active Num', value: 2 },
      { label: 'Reachable', value: '0, 1, 2, 3' }
    ]
  },
  {
    phase: 'ROW_3_NUM_3',
    grid: [
      [1, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 2, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 3', 'Num 4'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4', 'S:5', 'S:6'],
    activeCell: { r: 3, c: 6 },
    dependencyCells: [{ r: 2, c: 6, label: 'excl=0' }, { r: 2, c: 3, label: 'incl=1' }],
    formula: 's = 6: dp[2][6] + dp[2][3] = 0 + 1 = 1 way ({1, 2, 3})',
    action: 'Process num = 3: reaches target sum 6 for the first time ({1, 2, 3})!',
    explain: 'At sum 6, including 3 pairs with previous sum 3 ({1, 2}) to produce subset {1, 2, 3} with sum 6. Also, sum 3 branches to 2 ways: {3} and {1, 2}.',
    intuition: 'First partition found: S1={1, 2, 3} (sum 6), S2={4} (sum 4).',
    metrics: [
      { label: 'Active Num', value: 3 },
      { label: 'Ways for sum 6', value: 1, highlight: true }
    ]
  },
  {
    phase: 'ROW_4_NUM_4_SUM_4',
    grid: [
      [1, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 2, 1, 1, 1],
      [1, 1, 1, 2, 2, 1, 1]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 3', 'Num 4'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4', 'S:5', 'S:6'],
    activeCell: { r: 4, c: 4 },
    dependencyCells: [{ r: 3, c: 4, label: 'excl=1' }, { r: 3, c: 0, label: 'incl=1' }],
    formula: 's = 4: dp[3][4] + dp[3][0] = 1 + 1 = 2 ways ({1, 3}, {4})',
    action: 'Process num = 4 at sum 4: exclude 4 (1 way: {1, 3}) + include 4 (1 way: {4}) = 2 ways.',
    explain: 'Sum 4 can be formed in 2 ways: either by {1, 3} without 4, or {4} as a standalone element.',
    intuition: 'Two alternative subsets with sum 4.',
    metrics: [
      { label: 'Active Num', value: 4 },
      { label: 'Ways for sum 4', value: 2 }
    ]
  },
  {
    phase: 'ROW_4_NUM_4_SUM_6_TERMINAL',
    grid: [
      [1, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 2, 1, 1, 1],
      [1, 1, 1, 2, 2, 2, 2]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 3', 'Num 4'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4', 'S:5', 'S:6'],
    activeCell: { r: 4, c: 6 },
    dependencyCells: [{ r: 3, c: 6, label: 'excl=1' }, { r: 3, c: 2, label: 'incl=1' }],
    formula: 's = 6: dp[3][6] + dp[3][2] = 1 + 1 = 2 ways ({1, 2, 3}, {2, 4})',
    action: 'Evaluate terminal cell [4, 6]: Exactly 2 subsets sum to S1 = 6!',
    explain: 'To form sum 6:\n- Exclude 4: dp[3][6] = 1 way ({1, 2, 3})\n- Include 4: dp[3][2] = 1 way ({2} + 4 = {2, 4})\nTotal ways = 1 + 1 = 2 ways!',
    intuition: 'Both subsets {1, 2, 3} and {2, 4} achieve sum 6.',
    metrics: [
      { label: 'Terminal Cell', value: '[4, 6]' },
      { label: 'Total Partitions', value: 2, highlight: true }
    ]
  },
  {
    phase: 'PARTITIONS_BREAKDOWN',
    grid: [
      [1, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 2, 1, 1, 1],
      [1, 1, 1, 2, 2, 2, 2]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 3', 'Num 4'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4', 'S:5', 'S:6'],
    activeCell: { r: 4, c: 6 },
    formula: 'Partition 1: S1={1, 2, 3}, S2={4} | Partition 2: S1={2, 4}, S2={1, 3}',
    action: 'Verify both partitions yield difference D = 2.',
    explain: '1. S1 = {1, 2, 3} (sum 6), S2 = {4} (sum 4) => 6 - 4 = 2\n2. S1 = {2, 4} (sum 6), S2 = {1, 3} (sum 4) => 6 - 4 = 2\nBoth partitions strictly satisfy all problem constraints!',
    intuition: 'Explicit subset pairs verify the mathematical equivalence.',
    metrics: [
      { label: 'Partition 1 Diff', value: '6 - 4 = 2' },
      { label: 'Partition 2 Diff', value: '6 - 4 = 2' }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [1, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 2, 1, 1, 1],
      [1, 1, 1, 2, 2, 2, 2]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 3', 'Num 4'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4', 'S:5', 'S:6'],
    activeCell: { r: 4, c: 6 },
    formula: 'Output: 2 Partitions | O(N × Target) Time, O(Target) Space',
    action: 'Algorithm complete! Total valid partitions = 2.',
    explain: 'Using 1D reverse tabulation (from Target down to num), the solution executes in O(N × Target) time and O(Target) memory with modulo 1e9 + 7.',
    intuition: 'Target subset transformation provides optimal linear-space complexity.',
    metrics: [
      { label: 'Array', value: '[1, 2, 3, 4]' },
      { label: 'Difference D', value: 2 },
      { label: 'Result', value: 2, highlight: true }
    ]
  }
];

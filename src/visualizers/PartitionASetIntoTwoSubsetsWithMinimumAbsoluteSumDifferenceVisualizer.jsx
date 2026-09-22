// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Partition Set with Min Absolute Sum Difference (DP-16)',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N × TotalSum) Time',
  spaceComplexity: 'O(TotalSum) Space-Optimized',
  description: 'Partitions an array into two subsets S1 and S2 such that the absolute difference |sum(S1) - sum(S2)| is minimized. Employs 0/1 Subset Sum DP to determine all achievable sums up to TotalSum / 2.'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Min Absolute Sum Difference Partition',
  nodes: [
    { id: 'root', label: 'Min Subset Difference', children: ['reduction-identity', 'subset-sum-table', 'range-minimizer'] },
    { id: 'reduction-identity', label: '1. Mathematical Formulation', detail: 'S2 = TotalSum - S1 => |S1 - S2| = TotalSum - 2*S1 for S1 <= TotalSum / 2' },
    { id: 'subset-sum-table', label: '2. 0/1 Subset Sum Feasibility', children: ['exclude-case', 'include-case'] },
    { id: 'exclude-case', label: 'Exclude num', detail: 'dp[i-1][s] (Sum s achievable without current element)' },
    { id: 'include-case', label: 'Include num', detail: 'dp[i-1][s - num] (Sum s achievable by adding current element)' },
    { id: 'range-minimizer', label: '3. Half-Range Scan', detail: 'Scan s1 from 0 to TotalSum / 2 where dp[s1] == true; pick min(TotalSum - 2*s1).' }
  ]
};

export const solutions = {
  cpp: `// C++ Min Absolute Sum Difference Partition
// Time: O(N * TotalSum) | Space: O(TotalSum)
#include <vector>
#include <numeric>
#include <cmath>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minSubsetSumDifference(vector<int>& arr, int n) {
        int totalSum = accumulate(arr.begin(), arr.end(), 0);
        vector<bool> dp(totalSum + 1, false);
        dp[0] = true;

        for (int num : arr) {
            for (int s = totalSum; s >= num; s--) {
                dp[s] = dp[s] || dp[s - num];
            }
        }

        int minDiff = 1e9;
        for (int s1 = 0; s1 <= totalSum / 2; s1++) {
            if (dp[s1]) {
                int s2 = totalSum - s1;
                minDiff = min(minDiff, abs(s2 - s1));
            }
        }

        return minDiff;
    }
};`,
  python: `# Python 3 Min Absolute Sum Difference Partition
# Time: O(N * TotalSum) | Space: O(TotalSum)
class Solution:
    def minSubsetSumDifference(self, arr: list[int], n: int) -> int:
        total_sum = sum(arr)
        dp = [False] * (total_sum + 1)
        dp[0] = True

        for num in arr:
            for s in range(total_sum, num - 1, -1):
                dp[s] = dp[s] or dp[s - num]

        min_diff = float('inf')
        for s1 in range(total_sum // 2 + 1):
            if dp[s1]:
                s2 = total_sum - s1
                min_diff = min(min_diff, abs(s2 - s1))

        return min_diff`,
  java: `// Java Min Absolute Sum Difference Partition
// Time: O(N * TotalSum) | Space: O(TotalSum)
class Solution {
    public int minSubsetSumDifference(int[] arr, int n) {
        int totalSum = 0;
        for (int x : arr) totalSum += x;

        boolean[] dp = new boolean[totalSum + 1];
        dp[0] = true;

        for (int num : arr) {
            for (int s = totalSum; s >= num; s--) {
                dp[s] = dp[s] || dp[s - num];
            }
        }

        int minDiff = Integer.MAX_VALUE;
        for (int s1 = 0; s1 <= totalSum / 2; s1++) {
            if (dp[s1]) {
                int s2 = totalSum - s1;
                minDiff = Math.min(minDiff, Math.abs(s2 - s1));
            }
        }

        return minDiff;
    }
}`,
  javascript: `// JavaScript Min Absolute Sum Difference Partition
// Time: O(N * TotalSum) | Space: O(TotalSum)
var minSubsetSumDifference = function(arr, n) {
    const totalSum = arr.reduce((a, b) => a + b, 0);
    const dp = new Array(totalSum + 1).fill(false);
    dp[0] = true;

    for (const num of arr) {
        for (let s = totalSum; s >= num; s--) {
            dp[s] = dp[s] || dp[s - num];
        }
    }

    let minDiff = Infinity;
    for (let s1 = 0; s1 <= Math.floor(totalSum / 2); s1++) {
        if (dp[s1]) {
            const s2 = totalSum - s1;
            minDiff = Math.min(minDiff, Math.abs(s2 - s1));
        }
    }

    return minDiff;
};`
};

export const steps = [
  {
    phase: 'SETUP',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 7'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4', 'S:5'],
    activeCell: { r: 0, c: 0 },
    formula: 'TotalSum = 1 + 2 + 7 = 10 | Scan S1 from 0 to TotalSum/2 = 5',
    action: 'Initialize Subset Sum grid to find all achievable sums up to half (5).',
    explain: 'Because S2 = TotalSum - S1, the difference is (TotalSum - S1) - S1 = TotalSum - 2*S1. To minimize this difference, we find the achievable S1 closest to TotalSum / 2.',
    intuition: 'Symmetry allows searching only up to TotalSum / 2.',
    metrics: [
      { label: 'Array', value: '[1, 2, 7]' },
      { label: 'TotalSum', value: 10 },
      { label: 'Half-Bound', value: 5 }
    ]
  },
  {
    phase: 'ROW_1_NUM_1',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 7'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4', 'S:5'],
    activeCell: { r: 1, c: 1 },
    dependencyCells: [{ r: 0, c: 0, label: 'incl=T' }],
    formula: 'num = 1: dp[1][1] = dp[0][0] = True',
    action: 'Process num = 1: reachable sums are 0 ({}) and 1 ({1}).',
    explain: 'With element 1, sums 0 and 1 are achievable. Cell [1, 1] becomes 1 (True).',
    intuition: 'First item added to reachable sums set.',
    metrics: [
      { label: 'Active Num', value: 1 },
      { label: 'Sums so far', value: '{0, 1}' }
    ]
  },
  {
    phase: 'ROW_2_NUM_2',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [1, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 7'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4', 'S:5'],
    activeCell: { r: 2, c: 3 },
    dependencyCells: [{ r: 1, c: 3, label: 'excl=F' }, { r: 1, c: 1, label: 'incl=T' }],
    formula: 's = 3: dp[1][3] || dp[1][1] = False || True = True ({1, 2})',
    action: 'Process num = 2: reachable sums expand to 0, 1, 2, and 3.',
    explain: 'Including 2 enables sum 2 (0 + 2) and sum 3 (1 + 2). Cells [2, 2] and [2, 3] update to True.',
    intuition: 'Combinations of {1, 2} generate sums 0, 1, 2, 3.',
    metrics: [
      { label: 'Active Num', value: 2 },
      { label: 'Reachable', value: '{0, 1, 2, 3}', highlight: true }
    ]
  },
  {
    phase: 'ROW_3_NUM_7',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 7'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4', 'S:5'],
    activeCell: { r: 3, c: 5 },
    formula: 'num = 7 > 5 => cannot form any sum in [0..5], inherit row 2',
    action: 'Process num = 7: exceeds half-bound 5. Row 3 inherits row 2 directly.',
    explain: 'Since 7 > 5, including 7 would immediately exceed our half-bound. The final reachable sums in [0..5] are strictly {0, 1, 2, 3}.',
    intuition: 'Table complete! Now inspect the last row to calculate differences.',
    metrics: [
      { label: 'Active Num', value: 7 },
      { label: 'Final Set', value: '{0, 1, 2, 3}' }
    ]
  },
  {
    phase: 'EVAL_S1_0_1',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 7'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4', 'S:5'],
    activeCell: { r: 3, c: 1 },
    formula: 's1 = 1: s2 = 10 - 1 = 9 => Diff = |9 - 1| = 8',
    action: 'Test candidate S1 = 1: S2 = 9, Difference = 8.',
    explain: 'At S1 = 1, S2 = 9. Absolute difference is |9 - 1| = 8. (S1 = 0 yielded |10 - 0| = 10).',
    intuition: 'Increasing S1 brings us closer to the ideal half-sum of 5.',
    metrics: [
      { label: 'S1', value: 1 },
      { label: 'S2', value: 9 },
      { label: 'Diff', value: 8 }
    ]
  },
  {
    phase: 'EVAL_S1_2',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 7'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4', 'S:5'],
    activeCell: { r: 3, c: 2 },
    formula: 's1 = 2: s2 = 10 - 2 = 8 => Diff = |8 - 2| = 6',
    action: 'Test candidate S1 = 2: S2 = 8, Difference = 6.',
    explain: 'At S1 = 2, S2 = 8. Absolute difference decreases to |8 - 2| = 6.',
    intuition: 'Difference continues shrinking toward 0.',
    metrics: [
      { label: 'S1', value: 2 },
      { label: 'S2', value: 8 },
      { label: 'Diff', value: 6 }
    ]
  },
  {
    phase: 'EVAL_S1_3_OPTIMAL',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 7'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4', 'S:5'],
    activeCell: { r: 3, c: 3 },
    formula: 's1 = 3: s2 = 10 - 3 = 7 => Diff = |7 - 3| = 4 (Global Minimum!)',
    action: 'Test candidate S1 = 3: S2 = 7, Difference = 4! Optimal partition found.',
    explain: 'At S1 = 3, S2 = 7. Difference is |7 - 3| = 4. Since S1 = 4 and S1 = 5 are False (unreachable), 4 is the absolute minimum difference achievable!',
    intuition: 'S1 = 3 is the closest achievable sum to half-sum 5.',
    metrics: [
      { label: 'Optimal S1', value: 3 },
      { label: 'Optimal S2', value: 7 },
      { label: 'Min Diff', value: 4, highlight: true }
    ]
  },
  {
    phase: 'PARTITION_BREAKDOWN',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 7'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4', 'S:5'],
    activeCell: { r: 3, c: 3 },
    formula: 'S1 = {1, 2} (sum 3) | S2 = {7} (sum 7) | |3 - 7| = 4',
    action: 'Verify partition subsets and difference.',
    explain: 'Partition: Subset 1 = {1, 2} (Sum = 3), Subset 2 = {7} (Sum = 7). Absolute difference = |3 - 7| = 4. No closer partition is possible.',
    intuition: 'Optimal split verified mathematically.',
    metrics: [
      { label: 'Subset 1', value: '{1, 2}' },
      { label: 'Subset 2', value: '{7}' },
      { label: 'Difference', value: 4 }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 7'],
    colLabels: ['S:0', 'S:1', 'S:2', 'S:3', 'S:4', 'S:5'],
    activeCell: { r: 3, c: 3 },
    formula: 'Output: 4 | O(N × TotalSum) Time, O(TotalSum) Space',
    action: 'Algorithm complete! Minimum absolute sum difference is 4.',
    explain: 'Using 1D boolean array dp[s] = dp[s] || dp[s - num], the algorithm computes all achievable subset sums in O(N × TotalSum) time and O(TotalSum) space.',
    intuition: 'Bounded subset scan provides guaranteed optimal partition.',
    metrics: [
      { label: 'Array', value: '[1, 2, 7]' },
      { label: 'Min Diff', value: 4, highlight: true },
      { label: 'Time', value: 'O(N × TotalSum)' }
    ]
  }
];

// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Count Subsets with Sum K (DP-17)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N × K) Time',
  spaceComplexity: 'O(K) Space-Optimized',
  description: 'Counts the number of subsets from an array whose elements sum up to exactly K. When picking or not picking each element, if arr[i-1] <= target, ways sum: dp[i][t] = dp[i-1][t] + dp[i-1][t - arr[i-1]].'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Count Subsets with Sum K (DP-17)',
  nodes: [
    { id: 'root', label: 'Subset Sum Counter', children: ['base-conditions', 'transitions', 'zero-handling'] },
    { id: 'base-conditions', label: '1. Boundary Setup', detail: 'dp[0][0] = 1 (empty set forms sum 0) | dp[0][t] = 0 for t > 0' },
    { id: 'transitions', label: '2. Recurrence Relation', children: ['not-pick', 'pick'] },
    { id: 'not-pick', label: 'Not Pick arr[i-1]', detail: 'dp[i-1][t] (Ways using previous elements)' },
    { id: 'pick', label: 'Pick arr[i-1]', detail: 'dp[i-1][t - arr[i-1]] (Ways forming complement sum)' },
    { id: 'zero-handling', label: '3. Zero Multiplier', detail: 'If array has zeros, each zero can be included or excluded independently, multiplying ways by 2^zeros.' }
  ]
};

export const solutions = {
  cpp: `// C++ Count Subsets with Sum K
// Time: O(N * K) | Space: O(K)
#include <vector>
using namespace std;

class Solution {
    const int MOD = 1e9 + 7;
public:
    int findWays(vector<int>& arr, int k) {
        int n = arr.size();
        vector<int> prev(k + 1, 0);

        if (arr[0] == 0) prev[0] = 2; // pick or not-pick
        else {
            prev[0] = 1;
            if (arr[0] <= k) prev[arr[0]] = 1;
        }

        for (int i = 1; i < n; i++) {
            vector<int> cur(k + 1, 0);
            for (int target = 0; target <= k; target++) {
                int notTaken = prev[target];
                int taken = (arr[i] <= target) ? prev[target - arr[i]] : 0;
                cur[target] = (notTaken + taken) % MOD;
            }
            prev = cur;
        }

        return prev[k];
    }
};`,
  python: `# Python 3 Count Subsets with Sum K
# Time: O(N * K) | Space: O(K)
class Solution:
    def findWays(self, arr: list[int], k: int) -> int:
        MOD = 10**9 + 7
        n = len(arr)
        prev = [0] * (k + 1)

        if arr[0] == 0:
            prev[0] = 2
        else:
            prev[0] = 1
            if arr[0] <= k:
                prev[arr[0]] = 1

        for i in range(1, n):
            cur = [0] * (k + 1)
            for target in range(k + 1):
                not_taken = prev[target]
                taken = prev[target - arr[i]] if arr[i] <= target else 0
                cur[target] = (not_taken + taken) % MOD
            prev = cur

        return prev[k]`,
  java: `// Java Count Subsets with Sum K
// Time: O(N * K) | Space: O(K)
class Solution {
    static final int MOD = (int)1e9 + 7;

    public int findWays(int[] arr, int k) {
        int n = arr.length;
        int[] prev = new int[k + 1];

        if (arr[0] == 0) prev[0] = 2;
        else {
            prev[0] = 1;
            if (arr[0] <= k) prev[arr[0]] = 1;
        }

        for (int i = 1; i < n; i++) {
            int[] cur = new int[k + 1];
            for (int target = 0; target <= k; target++) {
                int notTaken = prev[target];
                int taken = (arr[i] <= target) ? prev[target - arr[i]] : 0;
                cur[target] = (notTaken + taken) % MOD;
            }
            prev = cur;
        }

        return prev[k];
    }
}`,
  javascript: `// JavaScript Count Subsets with Sum K
// Time: O(N * K) | Space: O(K)
var findWays = function(arr, k) {
    const MOD = 1e9 + 7;
    const n = arr.length;
    let prev = new Array(k + 1).fill(0);

    if (arr[0] === 0) prev[0] = 2;
    else {
        prev[0] = 1;
        if (arr[0] <= k) prev[arr[0]] = 1;
    }

    for (let i = 1; i < n; i++) {
        const cur = new Array(k + 1).fill(0);
        for (let target = 0; target <= k; target++) {
            const notTaken = prev[target];
            const taken = arr[i] <= target ? prev[target - arr[i]] : 0;
            cur[target] = (notTaken + taken) % MOD;
        }
        prev = cur;
    }

    return prev[k];
};`
};

export const steps = [
  {
    phase: 'SETUP',
    grid: [
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2a', 'Num 2b', 'Num 3'],
    colLabels: ['K:0', 'K:1', 'K:2', 'K:3'],
    activeCell: { r: 0, c: 0 },
    formula: 'dp[0][0] = 1 (Empty set produces sum 0)',
    action: 'Initialize grid for arr = [1, 2, 2, 3] with target sum K = 3.',
    explain: 'dp[i][t] stores the count of subsets from the prefix arr[0..i-1] that sum to t. The empty subset achieves sum 0 in 1 way.',
    intuition: 'Base row 0 anchors combinations starting from 0.',
    metrics: [
      { label: 'Array', value: '[1, 2, 2, 3]' },
      { label: 'Target K', value: 3 },
      { label: 'Base dp[0][0]', value: 1 }
    ]
  },
  {
    phase: 'ROW_1_NUM_1',
    grid: [
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2a', 'Num 2b', 'Num 3'],
    colLabels: ['K:0', 'K:1', 'K:2', 'K:3'],
    activeCell: { r: 1, c: 1 },
    dependencyCells: [{ r: 0, c: 1, label: 'excl=0' }, { r: 0, c: 0, label: 'incl=1' }],
    formula: 't = 1: dp[0][1] + dp[0][0] = 0 + 1 = 1 way ({1})',
    action: 'Process num = 1: can form sum 0 (1 way) and sum 1 (1 way).',
    explain: 'Using only the first element 1, sum 0 is formed by {} (1 way) and sum 1 is formed by {1} (1 way).',
    intuition: 'First element contributes 1 to sum 1.',
    metrics: [
      { label: 'Active Num', value: 1 },
      { label: 'dp[1][1]', value: 1 }
    ]
  },
  {
    phase: 'ROW_2_FIRST_2',
    grid: [
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 1, 1],
      [1, 0, 0, 0],
      [1, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2a', 'Num 2b', 'Num 3'],
    colLabels: ['K:0', 'K:1', 'K:2', 'K:3'],
    activeCell: { r: 2, c: 3 },
    dependencyCells: [{ r: 1, c: 3, label: 'excl=0' }, { r: 1, c: 1, label: 'incl=1' }],
    formula: 't = 3: dp[1][3] + dp[1][1] = 0 + 1 = 1 way ({1, 2a})',
    action: 'Process first num = 2: reaches target sum 3 for the first time ({1, 2a})!',
    explain: 'At sum 3: excluding 2 gives 0. Including 2 pairs with sum 1 ({1}) to form {1, 2a} (sum 3). Also, sum 2 has 1 way ({2a}).',
    intuition: 'Subset {1, 2a} forms the first valid combination for target 3.',
    metrics: [
      { label: 'Active Num', value: '2a' },
      { label: 'Subset', value: '{1, 2a}' },
      { label: 'Ways for K=3', value: 1, highlight: true }
    ]
  },
  {
    phase: 'ROW_3_SECOND_2_SUM_2',
    grid: [
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 1, 1],
      [1, 1, 2, 1],
      [1, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2a', 'Num 2b', 'Num 3'],
    colLabels: ['K:0', 'K:1', 'K:2', 'K:3'],
    activeCell: { r: 3, c: 2 },
    dependencyCells: [{ r: 2, c: 2, label: 'excl=1' }, { r: 2, c: 0, label: 'incl=1' }],
    formula: 't = 2: dp[2][2] + dp[2][0] = 1 + 1 = 2 ways ({2a}, {2b})',
    action: 'Process second num = 2 at sum 2: ways double to 2.',
    explain: 'Sum 2 can now be formed using either the first 2 ({2a}) or the second 2 ({2b}). Total ways = 1 + 1 = 2.',
    intuition: 'Duplicate elements branch into independent index subsets.',
    metrics: [
      { label: 'Active Num', value: '2b' },
      { label: 'Ways for sum 2', value: 2, highlight: true }
    ]
  },
  {
    phase: 'ROW_3_SECOND_2_SUM_3',
    grid: [
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 1, 1],
      [1, 1, 2, 2],
      [1, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2a', 'Num 2b', 'Num 3'],
    colLabels: ['K:0', 'K:1', 'K:2', 'K:3'],
    activeCell: { r: 3, c: 3 },
    dependencyCells: [{ r: 2, c: 3, label: 'excl=1' }, { r: 2, c: 1, label: 'incl=1' }],
    formula: 't = 3: dp[2][3] + dp[2][1] = 1 + 1 = 2 ways ({1, 2a}, {1, 2b})',
    action: 'At target sum 3: second 2 creates a second valid subset {1, 2b}!',
    explain: 'Target sum 3 now has 2 ways: 1) exclude 2b gives {1, 2a} (1 way), 2) include 2b with sum 1 ({1}) gives {1, 2b} (1 way). Total = 1 + 1 = 2 ways.',
    intuition: 'Both {1, 2a} and {1, 2b} reach target 3.',
    metrics: [
      { label: 'Target K=3 Ways', value: 2, highlight: true },
      { label: 'Subsets so far', value: '{1, 2a}, {1, 2b}' }
    ]
  },
  {
    phase: 'ROW_4_NUM_3_TERMINAL',
    grid: [
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 1, 1],
      [1, 1, 2, 2],
      [1, 1, 2, 3]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2a', 'Num 2b', 'Num 3'],
    colLabels: ['K:0', 'K:1', 'K:2', 'K:3'],
    activeCell: { r: 4, c: 3 },
    dependencyCells: [{ r: 3, c: 3, label: 'excl=2' }, { r: 3, c: 0, label: 'incl=1' }],
    formula: 't = 3: dp[3][3] + dp[3][0] = 2 + 1 = 3 ways',
    action: 'Process num = 3 at target K = 3: adds standalone subset {3}!',
    explain: 'To form target sum 3:\n- Exclude 3: dp[3][3] = 2 ways ({1, 2a} and {1, 2b})\n- Include 3: dp[3][0] = 1 way ({3} alone)\nTotal subsets = 2 + 1 = 3 subsets!',
    intuition: 'Terminal cell [4, 3] aggregates all 3 combinations.',
    metrics: [
      { label: 'Terminal Cell', value: '[4, 3]' },
      { label: 'Total Subsets', value: 3, highlight: true }
    ]
  },
  {
    phase: 'SUBSETS_BREAKDOWN',
    grid: [
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 1, 1],
      [1, 1, 2, 2],
      [1, 1, 2, 3]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2a', 'Num 2b', 'Num 3'],
    colLabels: ['K:0', 'K:1', 'K:2', 'K:3'],
    activeCell: { r: 4, c: 3 },
    formula: 'Valid Subsets: {1, 2a} (sum 3), {1, 2b} (sum 3), {3} (sum 3)',
    action: 'Enumerate the 3 concrete subsets achieving sum K = 3.',
    explain: '1. Subset {arr[0], arr[1]} = {1, 2a} ➔ 1 + 2 = 3\n2. Subset {arr[0], arr[2]} = {1, 2b} ➔ 1 + 2 = 3\n3. Subset {arr[3]} = {3} ➔ 3\nAll 3 subsets sum exactly to K = 3.',
    intuition: 'Clear mapping to distinct array index selections.',
    metrics: [
      { label: 'Subset 1', value: '{1, 2a}' },
      { label: 'Subset 2', value: '{1, 2b}' },
      { label: 'Subset 3', value: '{3}' }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 1, 1],
      [1, 1, 2, 2],
      [1, 1, 2, 3]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2a', 'Num 2b', 'Num 3'],
    colLabels: ['K:0', 'K:1', 'K:2', 'K:3'],
    activeCell: { r: 4, c: 3 },
    formula: 'Output: 3 | Time: O(N × K), Space: O(K)',
    action: 'Algorithm complete! Exactly 3 subsets sum to K = 3.',
    explain: 'Using 1D space optimization: dp[t] += dp[t - num] traversing right-to-left from K down to num, the problem runs in O(N × K) time and O(K) space.',
    intuition: 'Reverse traversal prevents multiple uses of the same element.',
    metrics: [
      { label: 'Array', value: '[1, 2, 2, 3]' },
      { label: 'Target K', value: 3 },
      { label: 'Result', value: 3, highlight: true }
    ]
  }
];

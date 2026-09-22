// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Rod Cutting Problem (DP-24)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N²) Time',
  spaceComplexity: 'O(N) Space-Optimized',
  description: 'Finds the maximum revenue obtainable by cutting a rod of length N into pieces and selling them according to a price chart. Formulated as an unbounded knapsack problem where piece lengths represent item weights and prices represent values.'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Rod Cutting Problem (DP-24)',
  nodes: [
    { id: 'root', label: 'Rod Cutting Profit Maximizer', children: ['knapsack-analogy', 'unbounded-recurrence', 'density-insight'] },
    { id: 'knapsack-analogy', label: '1. Unbounded Knapsack Mapping', detail: 'Rod length N = Knapsack Capacity | Piece length i = Weight | Price[i-1] = Value' },
    { id: 'unbounded-recurrence', label: '2. DP Transition (Reusable Cuts)', children: ['exclude-cut', 'include-cut'] },
    { id: 'exclude-cut', label: 'Exclude Cut i', detail: 'dp[i-1][len] (Do not use piece of length i)' },
    { id: 'include-cut', label: 'Include Cut i', detail: 'price[i-1] + dp[i][len - i] (Use piece of length i and stay on row i for reuse)' },
    { id: 'density-insight', label: '3. Price Density vs Integer Constraints', detail: 'Higher price-per-meter pieces (e.g. 2m @ $2.50/m vs 1m @ $2.00/m) dictate optimal combinations.' }
  ]
};

export const solutions = {
  cpp: `// C++ Rod Cutting Problem
// Time: O(N^2) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int cutRod(vector<int>& price, int n) {
        vector<int> dp(n + 1, 0);

        for (int i = 1; i <= n; i++) {
            for (int len = i; len <= n; len++) {
                dp[len] = max(dp[len], price[i - 1] + dp[len - i]);
            }
        }

        return dp[n];
    }
};`,
  python: `# Python 3 Rod Cutting Problem
# Time: O(N^2) | Space: O(N)
class Solution:
    def cutRod(self, price: list[int], n: int) -> int:
        dp = [0] * (n + 1)

        for i in range(1, n + 1):
            for length in range(i, n + 1):
                dp[length] = max(dp[length], price[i - 1] + dp[length - i])

        return dp[n]`,
  java: `// Java Rod Cutting Problem
// Time: O(N^2) | Space: O(N)
class Solution {
    public int cutRod(int[] price, int n) {
        int[] dp = new int[n + 1];

        for (int i = 1; i <= n; i++) {
            for (int len = i; len <= n; len++) {
                dp[len] = Math.max(dp[len], price[i - 1] + dp[len - i]);
            }
        }

        return dp[n];
    }
}`,
  javascript: `// JavaScript Rod Cutting Problem
// Time: O(N^2) | Space: O(N)
var cutRod = function(price, n) {
    const dp = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        for (let len = i; len <= n; len++) {
            dp[len] = Math.max(dp[len], price[i - 1] + dp[len - i]);
        }
    }

    return dp[n];
};`
};

export const steps = [
  {
    phase: 'SETUP',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', '1m ($2)', '2m ($5)', '3m ($7)', '4m ($8)', '5m ($10)'],
    colLabels: ['0m', '1m', '2m', '3m', '4m', '5m'],
    activeCell: { r: 0, c: 0 },
    formula: 'dp[i][len] = max(dp[i-1][len], price[i-1] + dp[i][len - i])',
    action: 'Initialize DP matrix for rod length N = 5m with piece prices [2, 5, 7, 8, 10].',
    explain: 'dp[i][len] represents the maximum profit obtainable from a rod of length len using cuts up to length i. Unbounded reuse means we look at dp[i][len - i] (same row) rather than dp[i-1][len - i].',
    intuition: 'Allowing multiple cuts of the same length creates an unbounded knapsack problem.',
    metrics: [
      { label: 'Rod Length N', value: '5m' },
      { label: 'Uncut Price', value: '$10' },
      { label: 'Max Profit', value: '$0' }
    ]
  },
  {
    phase: 'ROW_1_1M_CUTS',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 2, 4, 6, 8, 10],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', '1m ($2)', '2m ($5)', '3m ($7)', '4m ($8)', '5m ($10)'],
    colLabels: ['0m', '1m', '2m', '3m', '4m', '5m'],
    activeCell: { r: 1, c: 5 },
    dependencyCells: [{ r: 1, c: 4, label: 'same-row' }],
    formula: 'len = 5m using only 1m cuts: 5 × $2 = $10',
    action: 'Process 1m pieces: each 1m piece yields $2 (density: $2.00/m).',
    explain: 'Using only 1m cuts, any rod of length L can be sliced into L individual 1m pieces, yielding 2 × L dollars. For 5m, revenue is $10.',
    intuition: 'Baseline profit achieved by fine-grained cutting.',
    metrics: [
      { label: 'Cut Choice', value: '1m ($2/m)' },
      { label: '5m Revenue', value: '$10' }
    ]
  },
  {
    phase: 'ROW_2_INTRO_2M',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 2, 4, 6, 8, 10],
      [0, 2, 5, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', '1m ($2)', '2m ($5)', '3m ($7)', '4m ($8)', '5m ($10)'],
    colLabels: ['0m', '1m', '2m', '3m', '4m', '5m'],
    activeCell: { r: 2, c: 2 },
    dependencyCells: [{ r: 1, c: 2, label: 'excl=4' }, { r: 2, c: 0, label: 'incl=0' }],
    formula: 'len = 2m: max(excl: 4, incl: price[1] + dp[2][0]) = max(4, 5 + 0) = $5',
    action: 'Introduce 2m cut: priced at $5 ($2.50/m density > $2.00/m).',
    explain: 'For a 2m rod, two 1m cuts earn $4, but a single 2m cut earns $5. Since 5 > 4, dp[2][2] updates to 5.',
    intuition: 'Higher price density ($2.50/m) immediately beats 1m pieces.',
    metrics: [
      { label: 'Piece 2m', value: '$5' },
      { label: '2m Revenue', value: '$5', highlight: true }
    ]
  },
  {
    phase: 'ROW_2_LEN_3_4',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 2, 4, 6, 8, 10],
      [0, 2, 5, 7, 10, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', '1m ($2)', '2m ($5)', '3m ($7)', '4m ($8)', '5m ($10)'],
    colLabels: ['0m', '1m', '2m', '3m', '4m', '5m'],
    activeCell: { r: 2, c: 4 },
    dependencyCells: [{ r: 1, c: 4, label: 'excl=8' }, { r: 2, c: 2, label: 'incl=5' }],
    formula: 'len = 4m: max(8, 5 + dp[2][2]) = max(8, 5 + 5) = $10',
    action: 'Process 3m and 4m lengths using 2m pieces.',
    explain: 'At length 3m: 1 cut of 2m ($5) + 1m ($2) = $7 > $6. At length 4m: 2 cuts of 2m ($5 + $5) = $10 > $8.',
    intuition: 'Unbounded reuse allows chaining two 2m pieces together.',
    metrics: [
      { label: '3m Revenue', value: '$7' },
      { label: '4m Revenue', value: '$10', highlight: true }
    ]
  },
  {
    phase: 'ROW_2_LEN_5_PEAK',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 2, 4, 6, 8, 10],
      [0, 2, 5, 7, 10, 12],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', '1m ($2)', '2m ($5)', '3m ($7)', '4m ($8)', '5m ($10)'],
    colLabels: ['0m', '1m', '2m', '3m', '4m', '5m'],
    activeCell: { r: 2, c: 5 },
    dependencyCells: [{ r: 1, c: 5, label: 'excl=10' }, { r: 2, c: 3, label: 'incl=7' }],
    formula: 'len = 5m: max(excl: 10, incl: 5 + dp[2][3]) = max(10, 5 + 7) = $12',
    action: 'Evaluate 5m rod with 2m pieces: Revenue surges to $12!',
    explain: 'Cut combination: two 2m pieces ($5 × 2 = $10) plus one 1m piece ($2) = $12! This exceeds the $10 earned by all-1m cuts and beats the uncut 5m rod price of $10.',
    intuition: 'Optimal combination found: 2m + 2m + 1m.',
    metrics: [
      { label: '5m Revenue', value: '$12', highlight: true },
      { label: 'Surpass Uncut', value: '+$2 Profit' }
    ]
  },
  {
    phase: 'ROW_3_3M_EVAL',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 2, 4, 6, 8, 10],
      [0, 2, 5, 7, 10, 12],
      [0, 2, 5, 7, 10, 12],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', '1m ($2)', '2m ($5)', '3m ($7)', '4m ($8)', '5m ($10)'],
    colLabels: ['0m', '1m', '2m', '3m', '4m', '5m'],
    activeCell: { r: 3, c: 5 },
    dependencyCells: [{ r: 2, c: 5, label: 'excl=12' }, { r: 3, c: 2, label: 'incl=5' }],
    formula: 'len = 5m: max(excl: 12, incl: 7 + dp[3][2]) = max(12, 7 + 5) = $12',
    action: 'Evaluate 3m cut ($7, density $2.33/m): does not beat existing $12.',
    explain: 'Using a 3m piece leaves 2m. 3m ($7) + 2m ($5) = $12, which ties but does not exceed the existing $12 revenue from row 2.',
    intuition: 'Lower density pieces fail to improve total revenue.',
    metrics: [
      { label: 'Piece 3m Density', value: '$2.33/m' },
      { label: 'Row 3 Max', value: '$12' }
    ]
  },
  {
    phase: 'ROW_4_5_COMPLETE',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 2, 4, 6, 8, 10],
      [0, 2, 5, 7, 10, 12],
      [0, 2, 5, 7, 10, 12],
      [0, 2, 5, 7, 10, 12],
      [0, 2, 5, 7, 10, 12]
    ],
    rowLabels: ['None', '1m ($2)', '2m ($5)', '3m ($7)', '4m ($8)', '5m ($10)'],
    colLabels: ['0m', '1m', '2m', '3m', '4m', '5m'],
    activeCell: { r: 5, c: 5 },
    formula: 'All cuts evaluated! Terminal cell dp[5][5] = $12',
    action: 'Complete DP table: pieces 4m ($8) and 5m ($10) cannot beat $12.',
    explain: 'Selling whole 5m rod gives $10. A 4m cut ($8) + 1m ($2) gives $10. Neither matches the optimal $12 achieved by two 2m cuts and one 1m cut.',
    intuition: 'Table complete! Global maximum profit confirmed at $12.',
    metrics: [
      { label: 'Uncut Rod', value: '$10' },
      { label: 'Optimal Cuts', value: '$12', highlight: true }
    ]
  },
  {
    phase: 'TRACEBACK_CUTS',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 2, 4, 6, 8, 10],
      [0, 2, 5, 7, 10, 12],
      [0, 2, 5, 7, 10, 12],
      [0, 2, 5, 7, 10, 12],
      [0, 2, 5, 7, 10, 12]
    ],
    rowLabels: ['None', '1m ($2)', '2m ($5)', '3m ($7)', '4m ($8)', '5m ($10)'],
    colLabels: ['0m', '1m', '2m', '3m', '4m', '5m'],
    activeCell: { r: 2, c: 5 },
    dependencyCells: [{ r: 2, c: 3, label: '-2m' }, { r: 2, c: 1, label: '-2m' }, { r: 1, c: 0, label: '-1m' }],
    formula: '5m ➔ (cut 2m: $5) ➔ 3m ➔ (cut 2m: $5) ➔ 1m ➔ (cut 1m: $2) = 0m',
    action: 'Traceback cut decomposition: identify exact cut lengths.',
    explain: 'Starting at [2, 5] ($12):\n1. Take 2m piece ($5) -> remaining len = 3m\n2. At [2, 3] ($7), take 2m piece ($5) -> remaining len = 1m\n3. At [1, 1] ($2), take 1m piece ($2) -> remaining len = 0m.\nCut sequence: 2m + 2m + 1m = 5m.',
    intuition: 'Explicit cut breakdown proves why $12 is attained.',
    metrics: [
      { label: 'Piece 1', value: '2m ($5)' },
      { label: 'Piece 2', value: '2m ($5)' },
      { label: 'Piece 3', value: '1m ($2)' }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [0, 0, 0, 0, 0, 0],
      [0, 2, 4, 6, 8, 10],
      [0, 2, 5, 7, 10, 12],
      [0, 2, 5, 7, 10, 12],
      [0, 2, 5, 7, 10, 12],
      [0, 2, 5, 7, 10, 12]
    ],
    rowLabels: ['None', '1m ($2)', '2m ($5)', '3m ($7)', '4m ($8)', '5m ($10)'],
    colLabels: ['0m', '1m', '2m', '3m', '4m', '5m'],
    activeCell: { r: 5, c: 5 },
    formula: 'Max Revenue = $12 | Pieces: [2m, 2m, 1m]',
    action: 'Algorithm complete! Maximum revenue is $12.',
    explain: 'By strategically cutting the rod into pieces of length 2, 2, and 1, we obtain $12 revenue. Running time is O(N²) and memory is optimized to O(N) using a single 1D rolling array.',
    intuition: 'Unbounded knapsack dynamic programming guarantees global optimality.',
    metrics: [
      { label: 'Input Rod', value: '5m' },
      { label: 'Max Revenue', value: '$12', highlight: true },
      { label: 'Optimal Cuts', value: '2m, 2m, 1m' }
    ]
  }
];

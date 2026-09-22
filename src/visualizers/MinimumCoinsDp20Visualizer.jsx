// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Minimum Coins (Coin Change DP-20)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N × Target) Time',
  spaceComplexity: 'O(Target) Space-Optimized',
  description: 'Finds the minimum number of coins needed to make up a given target amount using an infinite supply of coin denominations. If the target cannot be formed, returns -1.'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Minimum Coins (Coin Change)',
  nodes: [
    { id: 'root', label: 'Minimum Coins Solver', children: ['base-setup', 'recurrence-min', 'space-compression'] },
    { id: 'base-setup', label: '1. Boundary Conditions', detail: 'dp[0] = 0 (0 coins to make $0) | dp[t] = ∞ for t > 0' },
    { id: 'recurrence-min', label: '2. DP Transition (Unbounded Knapsack)', children: ['exclude-coin', 'include-coin'] },
    { id: 'exclude-coin', label: 'Exclude Coin i', detail: 'dp[i-1][t] (Don\'t use coin i)' },
    { id: 'include-coin', label: 'Include Coin i', detail: '1 + dp[i][t - coins[i-1]] (1 coin + optimal subproblem on same row)' },
    { id: 'space-compression', label: '3. 1D Array Minimization', detail: 'dp[t] = min(dp[t], 1 + dp[t - coin]) updated from coin to Target in O(Target) space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Minimum Coins (Coin Change)
// Time: O(N * Target) | Space: O(Target)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minimumCoins(vector<int>& coins, int target) {
        vector<int> dp(target + 1, 1e9);
        dp[0] = 0; // 0 coins needed for amount 0

        for (int coin : coins) {
            for (int t = coin; t <= target; t++) {
                dp[t] = min(dp[t], 1 + dp[t - coin]);
            }
        }

        return (dp[target] >= 1e9) ? -1 : dp[target];
    }
};`,
  python: `# Python 3 Minimum Coins (Coin Change)
# Time: O(N * Target) | Space: O(Target)
class Solution:
    def minimumCoins(self, coins: list[int], target: int) -> int:
        dp = [float('inf')] * (target + 1)
        dp[0] = 0

        for coin in coins:
            for t in range(coin, target + 1):
                dp[t] = min(dp[t], 1 + dp[t - coin])

        return dp[target] if dp[target] != float('inf') else -1`,
  java: `// Java Minimum Coins (Coin Change)
// Time: O(N * Target) | Space: O(Target)
import java.util.Arrays;

class Solution {
    public int minimumCoins(int[] coins, int target) {
        int[] dp = new int[target + 1];
        Arrays.fill(dp, (int)1e9);
        dp[0] = 0;

        for (int coin : coins) {
            for (int t = coin; t <= target; t++) {
                dp[t] = Math.min(dp[t], 1 + dp[t - coin]);
            }
        }

        return dp[target] >= 1e9 ? -1 : dp[target];
    }
}`,
  javascript: `// JavaScript Minimum Coins (Coin Change)
// Time: O(N * Target) | Space: O(Target)
var minimumCoins = function(coins, target) {
    const dp = new Array(target + 1).fill(Infinity);
    dp[0] = 0;

    for (const coin of coins) {
        for (let t = coin; t <= target; t++) {
            dp[t] = Math.min(dp[t], 1 + dp[t - coin]);
        }
    }

    return dp[target] === Infinity ? -1 : dp[target];
};`
};

export const steps = [
  {
    phase: 'SETUP',
    grid: [
      [0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity]
    ],
    rowLabels: ['None', 'Coin 1', 'Coin 2', 'Coin 5'],
    colLabels: ['$0', '$1', '$2', '$3', '$4', '$5', '$6', '$7'],
    activeCell: { r: 0, c: 0 },
    formula: 'dp[0] = 0 (0 coins for $0) | dp[t] = ∞ for t > 0',
    action: 'Initialize grid for Target = $7 with coins [1, 2, 5].',
    explain: 'dp[i][t] represents the minimum coins needed to make amount t using coins up to type i. Amount $0 requires 0 coins. All other amounts initialize to ∞ (unreachable).',
    intuition: 'Minimization problems initialize unreachable states to infinity.',
    metrics: [
      { label: 'Target', value: '$7' },
      { label: 'Coins', value: '[1, 2, 5]' },
      { label: 'Min Coins', value: '...' }
    ]
  },
  {
    phase: 'ROW_1_ALL_1S',
    grid: [
      [0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity]
    ],
    rowLabels: ['None', 'Coin 1', 'Coin 2', 'Coin 5'],
    colLabels: ['$0', '$1', '$2', '$3', '$4', '$5', '$6', '$7'],
    activeCell: { r: 1, c: 7 },
    dependencyCells: [{ r: 1, c: 6, label: 'same-row' }],
    formula: 'dp[1][t] = 1 + dp[1][t - 1] = t coins',
    action: 'Process Coin 1: each dollar t requires exactly t one-dollar coins.',
    explain: 'With only $1 coins available, amount 1 needs 1 coin, amount 2 needs 2 coins, ..., and amount 7 needs 7 coins. Row 1 fills with [0, 1, 2, 3, 4, 5, 6, 7].',
    intuition: 'Baseline coin count established.',
    metrics: [
      { label: 'Active Coin', value: '$1' },
      { label: '7m Cost', value: '7 coins' }
    ]
  },
  {
    phase: 'ROW_2_AMT_2',
    grid: [
      [0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 1, 0, 0, 0, 0, 0],
      [0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity]
    ],
    rowLabels: ['None', 'Coin 1', 'Coin 2', 'Coin 5'],
    colLabels: ['$0', '$1', '$2', '$3', '$4', '$5', '$6', '$7'],
    activeCell: { r: 2, c: 2 },
    dependencyCells: [{ r: 1, c: 2, label: 'excl=2' }, { r: 2, c: 0, label: 'incl=0' }],
    formula: 'amt = $2: min(excl: 2, incl: 1 + dp[2][0]) = min(2, 1 + 0) = 1 coin',
    action: 'Introduce Coin 2: amount $2 drops from 2 coins to 1 coin!',
    explain: 'For amount $2, using two $1 coins took 2 coins. Using a single $2 coin takes 1 + dp[2][0] = 1 coin. Since 1 < 2, cell [2, 2] improves to 1.',
    intuition: 'Larger denominations reduce total coin count.',
    metrics: [
      { label: 'Active Coin', value: '$2' },
      { label: 'Coins for $2', value: 1, highlight: true }
    ]
  },
  {
    phase: 'ROW_2_AMT_4',
    grid: [
      [0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 1, 2, 2, 0, 0, 0],
      [0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity]
    ],
    rowLabels: ['None', 'Coin 1', 'Coin 2', 'Coin 5'],
    colLabels: ['$0', '$1', '$2', '$3', '$4', '$5', '$6', '$7'],
    activeCell: { r: 2, c: 4 },
    dependencyCells: [{ r: 1, c: 4, label: 'excl=4' }, { r: 2, c: 2, label: 'incl=1' }],
    formula: 'amt = $4: min(excl: 4, incl: 1 + dp[2][2]) = min(4, 1 + 1) = 2 coins',
    action: 'Process amount $4: two $2 coins replace four $1 coins.',
    explain: 'At amount $4: min(4, 1 + dp[2][2]) = min(4, 1 + 1) = 2 coins (two $2 coins). Coin count drops in half from 4 to 2.',
    intuition: 'Unbounded reuse chains multiple $2 coins together.',
    metrics: [
      { label: 'Coins for $4', value: 2, highlight: true },
      { label: 'Coins Used', value: '2 × $2' }
    ]
  },
  {
    phase: 'ROW_2_AMT_7',
    grid: [
      [0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 1, 2, 2, 3, 3, 4],
      [0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity]
    ],
    rowLabels: ['None', 'Coin 1', 'Coin 2', 'Coin 5'],
    colLabels: ['$0', '$1', '$2', '$3', '$4', '$5', '$6', '$7'],
    activeCell: { r: 2, c: 7 },
    dependencyCells: [{ r: 1, c: 7, label: 'excl=7' }, { r: 2, c: 5, label: 'incl=3' }],
    formula: 'amt = $7: min(7, 1 + dp[2][5]) = min(7, 1 + 3) = 4 coins',
    action: 'Complete row 2: amount $7 drops from 7 coins to 4 coins (three $2 + one $1).',
    explain: 'Using coins {1, 2}, amount $7 is formed by three $2 coins ($6) plus one $1 coin ($1), requiring 4 coins total.',
    intuition: '4 coins is best possible with only {1, 2}.',
    metrics: [
      { label: 'Row 2 at $7', value: 4 }
    ]
  },
  {
    phase: 'ROW_3_AMT_5_CRITICAL',
    grid: [
      [0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 1, 2, 2, 3, 3, 4],
      [0, 1, 1, 2, 2, 1, 0, 0]
    ],
    rowLabels: ['None', 'Coin 1', 'Coin 2', 'Coin 5'],
    colLabels: ['$0', '$1', '$2', '$3', '$4', '$5', '$6', '$7'],
    activeCell: { r: 3, c: 5 },
    dependencyCells: [{ r: 2, c: 5, label: 'excl=3' }, { r: 3, c: 0, label: 'incl=0' }],
    formula: 'amt = $5: min(excl: 3, incl: 1 + dp[3][0]) = min(3, 1 + 0) = 1 coin',
    action: 'Introduce Coin 5: amount $5 drops from 3 coins to 1 single coin!',
    explain: 'At amount $5, excluding Coin 5 took 3 coins ({2, 2, 1}). Using a single $5 coin takes 1 + dp[3][0] = 1 + 0 = 1 coin! Dramatic reduction.',
    intuition: 'Highest value coin drastically compresses coin counts.',
    metrics: [
      { label: 'Active Coin', value: '$5' },
      { label: 'Coins for $5', value: 1, highlight: true }
    ]
  },
  {
    phase: 'ROW_3_AMT_7_OPTIMAL',
    grid: [
      [0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 1, 2, 2, 3, 3, 4],
      [0, 1, 1, 2, 2, 1, 2, 2]
    ],
    rowLabels: ['None', 'Coin 1', 'Coin 2', 'Coin 5'],
    colLabels: ['$0', '$1', '$2', '$3', '$4', '$5', '$6', '$7'],
    activeCell: { r: 3, c: 7 },
    dependencyCells: [{ r: 2, c: 7, label: 'excl=4' }, { r: 3, c: 2, label: 'incl=1' }],
    formula: 'amt = $7: min(excl: 4, incl: 1 + dp[3][2]) = min(4, 1 + 1) = 2 coins',
    action: 'Evaluate terminal cell [3, 7]: Minimum coins for $7 is 2!',
    explain: 'At amount $7: excluding Coin 5 takes 4 coins. Including Coin 5 leaves $7 - $5 = $2. In row 3, dp[3][2] = 1 coin (one $2 coin). Total coins = 1 + 1 = 2 coins! Global minimum reached.',
    intuition: 'Optimal combination found: one $5 coin + one $2 coin.',
    metrics: [
      { label: 'Terminal Cell', value: '[3, 7]' },
      { label: 'Min Coins', value: 2, highlight: true }
    ]
  },
  {
    phase: 'TRACEBACK_COINS',
    grid: [
      [0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 1, 2, 2, 3, 3, 4],
      [0, 1, 1, 2, 2, 1, 2, 2]
    ],
    rowLabels: ['None', 'Coin 1', 'Coin 2', 'Coin 5'],
    colLabels: ['$0', '$1', '$2', '$3', '$4', '$5', '$6', '$7'],
    activeCell: { r: 3, c: 7 },
    dependencyCells: [{ r: 3, c: 2, label: 'took $5' }, { r: 2, c: 0, label: 'took $2' }],
    formula: '$7 ➔ (take Coin 5) ➔ $2 ➔ (take Coin 2) ➔ $0',
    action: 'Traceback optimal coins to identify minimal denomination set.',
    explain: '1. At [3, 7] (coins 2 != top 4): Coin 5 was taken. Remaining amount = 7 - 5 = 2.\n2. At [3, 2] (coins 1 == top 1): Coin 5 not taken for $2. Move to row 2.\n3. At [2, 2] (coins 1 != top 2): Coin 2 was taken. Remaining amount = 2 - 2 = 0.\nOptimal coins: {$5, $2}. Total = 2 coins.',
    intuition: 'Exact proof of why 2 is the minimal coin count.',
    metrics: [
      { label: 'Coin 1', value: '$5' },
      { label: 'Coin 2', value: '$2' },
      { label: 'Total', value: '$7' }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity],
      [0, 1, 2, 3, 4, 5, 6, 7],
      [0, 1, 1, 2, 2, 3, 3, 4],
      [0, 1, 1, 2, 2, 1, 2, 2]
    ],
    rowLabels: ['None', 'Coin 1', 'Coin 2', 'Coin 5'],
    colLabels: ['$0', '$1', '$2', '$3', '$4', '$5', '$6', '$7'],
    activeCell: { r: 3, c: 7 },
    formula: 'Output: 2 coins | Denominations: [$5, $2]',
    action: 'Algorithm complete! Minimum coins needed is 2.',
    explain: 'The minimum number of coins to make $7 from [1, 2, 5] is 2 ({5, 2}). Solved in O(N × Target) time and O(Target) space using forward 1D DP.',
    intuition: 'Dynamic programming avoids greedy pitfalls and guarantees global minimum.',
    metrics: [
      { label: 'Target', value: '$7' },
      { label: 'Min Coins', value: 2, highlight: true },
      { label: 'Space', value: 'O(Target)' }
    ]
  }
];

// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Coin Change 2 (DP-22)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N × Amount) Time',
  spaceComplexity: 'O(Amount) Space-Optimized',
  description: 'Calculates the total number of distinct combinations that make up a given amount using an unlimited supply of coins of given denominations. Outer iteration over coins guarantees combination counting rather than permutations.'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Coin Change 2 (Combinations)',
  nodes: [
    { id: 'root', label: 'Coin Change 2 Counter', children: ['combination-invariant', 'transition-rule', 'space-compression'] },
    { id: 'combination-invariant', label: '1. Combinations vs Permutations', detail: 'Iterating coins as outer loop ensures coins are placed in fixed non-decreasing order, eliminating duplicates like {1, 2} and {2, 1}.' },
    { id: 'transition-rule', label: '2. Recurrence Relation', children: ['exclude-coin', 'include-coin'] },
    { id: 'exclude-coin', label: 'Exclude Coin i', detail: 'dp[i-1][amt] (Ways without coin i)' },
    { id: 'include-coin', label: 'Include Coin i', detail: 'dp[i][amt - coins[i-1]] (Ways reusing coin i on same row)' },
    { id: 'space-compression', label: '3. Forward 1D Traversal', detail: 'dp[amt] += dp[amt - coin] running from coin up to Amount yields O(Amount) memory.' }
  ]
};

export const solutions = {
  cpp: `// C++ Coin Change 2 (Combinations)
// Time: O(N * Amount) | Space: O(Amount)
#include <vector>
using namespace std;

class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<unsigned long long> dp(amount + 1, 0);
        dp[0] = 1; // 1 way to form amount 0: empty set

        // Iterate coins first to ensure combinations, not permutations
        for (int coin : coins) {
            for (int a = coin; a <= amount; a++) {
                dp[a] += dp[a - coin];
            }
        }

        return dp[amount];
    }
};`,
  python: `# Python 3 Coin Change 2 (Combinations)
# Time: O(N * Amount) | Space: O(Amount)
class Solution:
    def change(self, amount: int, coins: list[int]) -> int:
        dp = [0] * (amount + 1)
        dp[0] = 1

        for coin in coins:
            for a in range(coin, amount + 1):
                dp[a] += dp[a - coin]

        return dp[amount]`,
  java: `// Java Coin Change 2 (Combinations)
// Time: O(N * Amount) | Space: O(Amount)
class Solution {
    public int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;

        for (int coin : coins) {
            for (int a = coin; a <= amount; a++) {
                dp[a] += dp[a - coin];
            }
        }

        return dp[amount];
    }
}`,
  javascript: `// JavaScript Coin Change 2 (Combinations)
// Time: O(N * Amount) | Space: O(Amount)
var change = function(amount, coins) {
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;

    for (const coin of coins) {
        for (let a = coin; a <= amount; a++) {
            dp[a] += dp[a - coin];
        }
    }

    return dp[amount];
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
    rowLabels: ['None', 'Coin 1', 'Coin 2', 'Coin 5'],
    colLabels: ['$0', '$1', '$2', '$3', '$4', '$5'],
    activeCell: { r: 0, c: 0 },
    formula: 'dp[i][0] = 1 (1 way to make amount 0: select no coins)',
    action: 'Initialize grid for target amount $5 with coins [1, 2, 5].',
    explain: 'dp[i][amt] stores the number of unique combinations to make amount amt using the first i coin types. Amount $0 always has 1 way: the empty set.',
    intuition: 'The empty combination is the foundation for all coin aggregations.',
    metrics: [
      { label: 'Target Amount', value: '$5' },
      { label: 'Coin Types', value: 3 },
      { label: 'Base dp[i][0]', value: 1 }
    ]
  },
  {
    phase: 'ROW_1_COIN_1',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Coin 1', 'Coin 2', 'Coin 5'],
    colLabels: ['$0', '$1', '$2', '$3', '$4', '$5'],
    activeCell: { r: 1, c: 5 },
    dependencyCells: [{ r: 1, c: 4, label: 'same-row' }],
    formula: 'dp[1][amt] = dp[1][amt - 1] = 1 way for all amounts',
    action: 'Process Coin 1: exactly 1 combination for every amount (all 1s).',
    explain: 'Using only 1-dollar coins, any amount a can be formed in exactly 1 way: taking a coins of value 1. Row 1 fills entirely with 1.',
    intuition: 'Single denomination offers no branching choices.',
    metrics: [
      { label: 'Active Coin', value: '$1' },
      { label: 'Ways for $5', value: 1 }
    ]
  },
  {
    phase: 'ROW_2_AMT_2',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 2, 0, 0, 0],
      [1, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Coin 1', 'Coin 2', 'Coin 5'],
    colLabels: ['$0', '$1', '$2', '$3', '$4', '$5'],
    activeCell: { r: 2, c: 2 },
    dependencyCells: [{ r: 1, c: 2, label: 'excl=1' }, { r: 2, c: 0, label: 'incl=1' }],
    formula: 'amt = $2: dp[1][2] + dp[2][0] = 1 + 1 = 2 ways',
    action: 'Introduce Coin 2: amount $2 branches into 2 distinct combinations.',
    explain: 'To form $2, we can either: 1) exclude Coin 2 (dp[1][2] = 1 way: {1, 1}), or 2) include Coin 2 (dp[2][0] = 1 way: {2}). Total = 1 + 1 = 2.',
    intuition: 'First combinatorial fork: {1, 1} vs {2}.',
    metrics: [
      { label: 'Active Coin', value: '$2' },
      { label: 'Ways for $2', value: 2, highlight: true }
    ]
  },
  {
    phase: 'ROW_2_AMT_4',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 2, 2, 3, 0],
      [1, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Coin 1', 'Coin 2', 'Coin 5'],
    colLabels: ['$0', '$1', '$2', '$3', '$4', '$5'],
    activeCell: { r: 2, c: 4 },
    dependencyCells: [{ r: 1, c: 4, label: 'excl=1' }, { r: 2, c: 2, label: 'incl=2' }],
    formula: 'amt = $4: dp[1][4] + dp[2][2] = 1 + 2 = 3 ways',
    action: 'Process amount $4: combinations grow to 3.',
    explain: 'Exclude Coin 2 gives 1 way ({1, 1, 1, 1}). Include Coin 2 looks at dp[2][2], which has 2 ways. Adding Coin 2 to each yields {2, 1, 1} and {2, 2}. Total = 1 + 2 = 3 ways!',
    intuition: 'Unbounded reuse enables multiple 2-dollar coins.',
    metrics: [
      { label: 'Ways for $4', value: 3, highlight: true },
      { label: 'Sets for $4', value: '{1x4}, {2+1x2}, {2+2}' }
    ]
  },
  {
    phase: 'ROW_2_AMT_5',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 2, 2, 3, 3],
      [1, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Coin 1', 'Coin 2', 'Coin 5'],
    colLabels: ['$0', '$1', '$2', '$3', '$4', '$5'],
    activeCell: { r: 2, c: 5 },
    dependencyCells: [{ r: 1, c: 5, label: 'excl=1' }, { r: 2, c: 3, label: 'incl=2' }],
    formula: 'amt = $5: dp[1][5] + dp[2][3] = 1 + 2 = 3 ways',
    action: 'Complete row 2: 3 ways to form $5 using only {1, 2}.',
    explain: 'Combinations for $5 using coins {1, 2}: 1) {1, 1, 1, 1, 1}, 2) {2, 1, 1, 1}, 3) {2, 2, 1}. Total = 3 ways.',
    intuition: 'Even and odd amounts mesh cleanly via coin 1.',
    metrics: [
      { label: 'Ways with {1, 2}', value: 3 }
    ]
  },
  {
    phase: 'ROW_3_COIN_5_INHERIT',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 2, 2, 3, 3],
      [1, 1, 2, 2, 3, 0]
    ],
    rowLabels: ['None', 'Coin 1', 'Coin 2', 'Coin 5'],
    colLabels: ['$0', '$1', '$2', '$3', '$4', '$5'],
    activeCell: { r: 3, c: 4 },
    formula: 'amt < 5 => dp[3][amt] = dp[2][amt] (Coin 5 cannot participate)',
    action: 'Introduce Coin 5: amounts 0 to 4 copy row 2 directly.',
    explain: 'Since Coin 5 exceeds amounts $1, $2, $3, and $4, it cannot be used. Values are directly inherited from the row above: dp[3][a] = dp[2][a].',
    intuition: 'Coins exceeding the current amount contribute 0 new combinations.',
    metrics: [
      { label: 'Active Coin', value: '$5' },
      { label: 'Range $0-$4', value: 'Unchanged' }
    ]
  },
  {
    phase: 'ROW_3_TERMINAL_PEAK',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 2, 2, 3, 3],
      [1, 1, 2, 2, 3, 4]
    ],
    rowLabels: ['None', 'Coin 1', 'Coin 2', 'Coin 5'],
    colLabels: ['$0', '$1', '$2', '$3', '$4', '$5'],
    activeCell: { r: 3, c: 5 },
    dependencyCells: [{ r: 2, c: 5, label: 'excl=3' }, { r: 3, c: 0, label: 'incl=1' }],
    formula: 'amt = $5: dp[2][5] + dp[3][0] = 3 + 1 = 4 combinations',
    action: 'Evaluate terminal cell [3, 5]: Coin 5 creates 4th unique combination!',
    explain: 'At amount $5, excluding Coin 5 yields 3 ways (from {1, 2}). Including Coin 5 looks at dp[3][0] (1 way: empty set), adding the single coin {5}. Total combinations = 3 + 1 = 4!',
    intuition: '4 unique combinations to make $5.',
    metrics: [
      { label: 'Terminal Cell', value: '[3, 5]' },
      { label: 'Total Combinations', value: 4, highlight: true }
    ]
  },
  {
    phase: 'COMBINATIONS_BREAKDOWN',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 2, 2, 3, 3],
      [1, 1, 2, 2, 3, 4]
    ],
    rowLabels: ['None', 'Coin 1', 'Coin 2', 'Coin 5'],
    colLabels: ['$0', '$1', '$2', '$3', '$4', '$5'],
    activeCell: { r: 3, c: 5 },
    formula: 'Combinations: {1, 1, 1, 1, 1}, {2, 1, 1, 1}, {2, 2, 1}, {5}',
    action: 'Enumerate the 4 concrete coin sets.',
    explain: '1. 1 + 1 + 1 + 1 + 1 = $5\n2. 2 + 1 + 1 + 1 = $5\n3. 2 + 2 + 1 = $5\n4. 5 = $5\nNotice order does not matter: {2, 1, 2} is NOT counted separately.',
    intuition: 'Outer coin iteration rigorously guarantees combinations without permutations.',
    metrics: [
      { label: 'Combo 1', value: '{1, 1, 1, 1, 1}' },
      { label: 'Combo 2', value: '{2, 1, 1, 1}' },
      { label: 'Combo 3', value: '{2, 2, 1}' },
      { label: 'Combo 4', value: '{5}' }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 2, 2, 3, 3],
      [1, 1, 2, 2, 3, 4]
    ],
    rowLabels: ['None', 'Coin 1', 'Coin 2', 'Coin 5'],
    colLabels: ['$0', '$1', '$2', '$3', '$4', '$5'],
    activeCell: { r: 3, c: 5 },
    formula: 'Output: 4 | Time: O(N × Amount), Space: O(Amount)',
    action: 'Algorithm complete! 4 distinct combinations.',
    explain: 'Using forward 1D rolling array: dp[a] += dp[a - coin], the algorithm completes in O(N × Amount) time and uses only O(Amount) auxiliary space.',
    intuition: 'Clean unbounded dynamic programming.',
    metrics: [
      { label: 'Amount', value: '$5' },
      { label: 'Coins', value: '[1, 2, 5]' },
      { label: 'Result', value: 4, highlight: true }
    ]
  }
];

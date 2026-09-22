// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Unbounded Knapsack',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N × W) Time',
  spaceComplexity: 'O(W) Space-Optimized',
  description: 'Finds the maximum value achievable with a knapsack capacity W where each item can be selected an unlimited number of times. The recurrence reuses the current row (dp[i][cap - wt[i]]) rather than the previous row, enabling infinite item selection.'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Unbounded Knapsack',
  nodes: [
    { id: 'root', label: 'Unbounded Knapsack', children: ['unbounded-rule', 'transition-recurrence', '1d-optimization'] },
    { id: 'unbounded-rule', label: '1. Infinite Supply Invariant', detail: 'Items can be chosen 0, 1, 2, ... times as long as remaining capacity allows.' },
    { id: 'transition-recurrence', label: '2. DP Transition (Same-Row Dependency)', children: ['exclude-item', 'include-item'] },
    { id: 'exclude-item', label: 'Exclude Item i', detail: 'dp[i-1][cap] (Do not take item i)' },
    { id: 'include-item', label: 'Include Item i', detail: 'val[i-1] + dp[i][cap - wt[i-1]] (Notice same row index i!)' },
    { id: '1d-optimization', label: '3. Forward 1D Traversal', detail: 'Unlike 0/1 Knapsack (reverse iteration), Unbounded Knapsack traverses forward from wt[i] to W.' }
  ]
};

export const solutions = {
  cpp: `// C++ Unbounded Knapsack
// Time: O(N * W) | Space: O(W)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int unboundedKnapsack(int n, int w, vector<int>& val, vector<int>& wt) {
        vector<int> dp(w + 1, 0);

        for (int i = 0; i < n; i++) {
            for (int cap = wt[i]; cap <= w; cap++) {
                dp[cap] = max(dp[cap], val[i] + dp[cap - wt[i]]);
            }
        }

        return dp[w];
    }
};`,
  python: `# Python 3 Unbounded Knapsack
# Time: O(N * W) | Space: O(W)
class Solution:
    def unboundedKnapsack(self, n: int, w: int, val: list[int], wt: list[int]) -> int:
        dp = [0] * (w + 1)

        for i in range(n):
            for cap in range(wt[i], w + 1):
                dp[cap] = max(dp[cap], val[i] + dp[cap - wt[i]])

        return dp[w]`,
  java: `// Java Unbounded Knapsack
// Time: O(N * W) | Space: O(W)
class Solution {
    public int unboundedKnapsack(int n, int w, int[] val, int[] wt) {
        int[] dp = new int[w + 1];

        for (int i = 0; i < n; i++) {
            for (int cap = wt[i]; cap <= w; cap++) {
                dp[cap] = Math.max(dp[cap], val[i] + dp[cap - wt[i]]);
            }
        }

        return dp[w];
    }
}`,
  javascript: `// JavaScript Unbounded Knapsack
// Time: O(N * W) | Space: O(W)
var unboundedKnapsack = function(n, w, val, wt) {
    const dp = new Array(w + 1).fill(0);

    for (let i = 0; i < n; i++) {
        for (let cap = wt[i]; cap <= w; cap++) {
            dp[cap] = Math.max(dp[cap], val[i] + dp[cap - wt[i]]);
        }
    }

    return dp[w];
};`
};

export const steps = [
  {
    phase: 'SETUP',
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Item 1 (w:2, v:5)', 'Item 2 (w:3, v:11)', 'Item 3 (w:5, v:18)'],
    colLabels: ['W:0', 'W:1', 'W:2', 'W:3', 'W:4', 'W:5', 'W:6', 'W:7'],
    activeCell: { r: 0, c: 0 },
    formula: 'dp[i][cap] = max(dp[i-1][cap], val[i-1] + dp[i][cap - wt[i-1]])',
    action: 'Initialize DP table for Knapsack Capacity W = 7 with 3 unbounded items.',
    explain: 'dp[i][cap] stores the maximum value using subsets of the first i items under weight limit cap. Because each item can be selected multiple times, including item i references dp[i][cap - wt[i-1]] (the current row), enabling chain reuse.',
    intuition: 'Same-row dependency represents the ability to pick the current item again.',
    metrics: [
      { label: 'Capacity W', value: 7 },
      { label: 'Items', value: 3 },
      { label: 'Max Value', value: 0 }
    ]
  },
  {
    phase: 'ROW_1_ITEM_1',
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 5, 5, 10, 10, 15, 15],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Item 1 (w:2, v:5)', 'Item 2 (w:3, v:11)', 'Item 3 (w:5, v:18)'],
    colLabels: ['W:0', 'W:1', 'W:2', 'W:3', 'W:4', 'W:5', 'W:6', 'W:7'],
    activeCell: { r: 1, c: 6 },
    dependencyCells: [{ r: 1, c: 4, label: 'same-row' }],
    formula: 'cap = 6: 3 × Item 1 (3 × wt 2 = wt 6) => 3 × 5 = 15',
    action: 'Process Item 1 (weight 2, value 5): fill row 1.',
    explain: 'With only Item 1, capacity 2 holds 1 item (val 5), capacity 4 holds 2 items (val 10), and capacity 6 holds 3 items (val 15). Odd capacities carry over values from the preceding even weight.',
    intuition: 'Repeatedly packing Item 1 yields $2.50 per unit weight.',
    metrics: [
      { label: 'Active Item', value: 'w:2, v:5' },
      { label: 'Cap 6 Value', value: 15 }
    ]
  },
  {
    phase: 'ROW_2_INTRO_ITEM_2',
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 5, 5, 10, 10, 15, 15],
      [0, 0, 5, 11, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Item 1 (w:2, v:5)', 'Item 2 (w:3, v:11)', 'Item 3 (w:5, v:18)'],
    colLabels: ['W:0', 'W:1', 'W:2', 'W:3', 'W:4', 'W:5', 'W:6', 'W:7'],
    activeCell: { r: 2, c: 3 },
    dependencyCells: [{ r: 1, c: 3, label: 'excl=5' }, { r: 2, c: 0, label: 'incl=0' }],
    formula: 'cap = 3: max(excl: 5, incl: 11 + dp[2][0]) = max(5, 11 + 0) = 11',
    action: 'Introduce Item 2 (weight 3, value 11, density 3.67 > 2.50).',
    explain: 'At capacity 3, excluding Item 2 yields 5 (from Item 1). Including Item 2 gives 11. Since 11 > 5, cell [2, 3] updates to 11.',
    intuition: 'Higher value density immediately overtakes the baseline.',
    metrics: [
      { label: 'Item 2 Density', value: '3.67 v/w' },
      { label: 'Cap 3 Value', value: 11, highlight: true }
    ]
  },
  {
    phase: 'ROW_2_COMBINE',
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 5, 5, 10, 10, 15, 15],
      [0, 0, 5, 11, 11, 16, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Item 1 (w:2, v:5)', 'Item 2 (w:3, v:11)', 'Item 3 (w:5, v:18)'],
    colLabels: ['W:0', 'W:1', 'W:2', 'W:3', 'W:4', 'W:5', 'W:6', 'W:7'],
    activeCell: { r: 2, c: 5 },
    dependencyCells: [{ r: 1, c: 5, label: 'excl=10' }, { r: 2, c: 2, label: 'incl=5' }],
    formula: 'cap = 5: max(10, 11 + dp[2][2]) = max(10, 11 + 5) = 16',
    action: 'At capacity 5: combine Item 2 (wt 3) + Item 1 (wt 2).',
    explain: 'Capacity 5 can accommodate both Item 2 (wt 3, val 11) and Item 1 (wt 2, val 5). Total weight = 5, total value = 11 + 5 = 16! Exceeds two Item 1s (val 10).',
    intuition: 'Synergistic combination of complementary weights.',
    metrics: [
      { label: 'Cap 5 Value', value: 16, highlight: true },
      { label: 'Pack', value: 'Item 2 + Item 1' }
    ]
  },
  {
    phase: 'ROW_2_DOUBLE_REUSE',
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 5, 5, 10, 10, 15, 15],
      [0, 0, 5, 11, 11, 16, 22, 22],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Item 1 (w:2, v:5)', 'Item 2 (w:3, v:11)', 'Item 3 (w:5, v:18)'],
    colLabels: ['W:0', 'W:1', 'W:2', 'W:3', 'W:4', 'W:5', 'W:6', 'W:7'],
    activeCell: { r: 2, c: 6 },
    dependencyCells: [{ r: 1, c: 6, label: 'excl=15' }, { r: 2, c: 3, label: 'incl=11' }],
    formula: 'cap = 6: max(15, 11 + dp[2][3]) = max(15, 11 + 11) = 22',
    action: 'At capacity 6: unbounded reuse! Pack TWO Item 2s.',
    explain: 'At cap 6, taking Item 2 leaves capacity 6 - 3 = 3. In the same row, dp[2][3] is 11 (which itself used Item 2). Total value = 11 + 11 = 22! Far surpasses 15.',
    intuition: 'Unbounded knapsack allows chaining the best density item multiple times.',
    metrics: [
      { label: 'Cap 6 Value', value: 22, highlight: true },
      { label: 'Pack', value: '2 × Item 2' }
    ]
  },
  {
    phase: 'ROW_3_ITEM_3_PEAK',
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 5, 5, 10, 10, 15, 15],
      [0, 0, 5, 11, 11, 16, 22, 22],
      [0, 0, 5, 11, 11, 18, 22, 23]
    ],
    rowLabels: ['None', 'Item 1 (w:2, v:5)', 'Item 2 (w:3, v:11)', 'Item 3 (w:5, v:18)'],
    colLabels: ['W:0', 'W:1', 'W:2', 'W:3', 'W:4', 'W:5', 'W:6', 'W:7'],
    activeCell: { r: 3, c: 7 },
    dependencyCells: [{ r: 2, c: 7, label: 'excl=22' }, { r: 3, c: 2, label: 'incl=5' }],
    formula: 'cap = 7: max(excl: 22, incl: 18 + dp[3][2]) = max(22, 18 + 5) = 23',
    action: 'Evaluate Item 3 (weight 5, value 18): Peak value 23 reached at cap 7!',
    explain: 'At capacity 7: taking Item 3 (wt 5, val 18) leaves capacity 7 - 5 = 2. Looking at dp[3][2] gives value 5 (Item 1). Total value = 18 + 5 = 23! This beats the previous best of 22.',
    intuition: 'Item 3 + Item 1 maximizes full capacity 7 to 23 value.',
    metrics: [
      { label: 'Cap 7 Peak', value: 23, highlight: true },
      { label: 'Weight Used', value: '5 + 2 = 7' }
    ]
  },
  {
    phase: 'TRACEBACK_ITEMS',
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 5, 5, 10, 10, 15, 15],
      [0, 0, 5, 11, 11, 16, 22, 22],
      [0, 0, 5, 11, 11, 18, 22, 23]
    ],
    rowLabels: ['None', 'Item 1 (w:2, v:5)', 'Item 2 (w:3, v:11)', 'Item 3 (w:5, v:18)'],
    colLabels: ['W:0', 'W:1', 'W:2', 'W:3', 'W:4', 'W:5', 'W:6', 'W:7'],
    activeCell: { r: 3, c: 7 },
    dependencyCells: [{ r: 3, c: 2, label: 'took Item 3' }, { r: 1, c: 0, label: 'took Item 1' }],
    formula: '7 ➔ (take Item 3: wt 5, val 18) ➔ 2 ➔ (take Item 1: wt 2, val 5) = 0',
    action: 'Traceback optimal packed item combination.',
    explain: '1. At [3, 7] (val 23 != top 22): Item 3 was selected (+18 val, -5 wt). Remaining cap = 2.\n2. At [3, 2] (val 5 == top 5): Item 3 not used. Move to [1, 2].\n3. At [1, 2] (val 5 != top 0): Item 1 was selected (+5 val, -2 wt). Remaining cap = 0.\nOptimal set: {Item 3, Item 1}.',
    intuition: 'Clear reconstruction of packed items.',
    metrics: [
      { label: 'Chosen 1', value: 'Item 3 (w:5, v:18)' },
      { label: 'Chosen 2', value: 'Item 1 (w:2, v:5)' },
      { label: 'Total Weight', value: '7 / 7' }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 5, 5, 10, 10, 15, 15],
      [0, 0, 5, 11, 11, 16, 22, 22],
      [0, 0, 5, 11, 11, 18, 22, 23]
    ],
    rowLabels: ['None', 'Item 1 (w:2, v:5)', 'Item 2 (w:3, v:11)', 'Item 3 (w:5, v:18)'],
    colLabels: ['W:0', 'W:1', 'W:2', 'W:3', 'W:4', 'W:5', 'W:6', 'W:7'],
    activeCell: { r: 3, c: 7 },
    formula: 'Max Value = 23 | Total Weight = 7 | Items: [Item 3, Item 1]',
    action: 'Algorithm complete! Maximum Knapsack Value is 23.',
    explain: 'Optimal solution achieves 23 value by combining Item 3 (wt 5, val 18) and Item 1 (wt 2, val 5). Implemented in O(N × W) time and O(W) space via forward 1D DP.',
    intuition: 'Forward iteration guarantees unlimited reuse of optimal items.',
    metrics: [
      { label: 'Knapsack Cap', value: 7 },
      { label: 'Max Value', value: 23, highlight: true },
      { label: 'Space Complexity', value: 'O(W)' }
    ]
  }
];

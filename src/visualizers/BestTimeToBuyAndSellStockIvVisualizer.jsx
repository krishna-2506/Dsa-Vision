// DATA-ONLY — rendered by StockTradingRenderer via rendererType

export const meta = {
  title: 'Best Time to Buy and Sell Stock IV (At Most K Transactions)',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N × K)',
  spaceComplexity: 'O(K) Space-Optimized',
  description: 'Finds the maximum profit from at most K completed stock transactions. Uses a 3D state machine DP space-optimized to O(K) memory where selling a stock decrements transaction capacity.'
};

export const rendererType = 'stock-trading';

export const ideaMap = {
  title: 'Stock IV (At Most K Transactions)',
  nodes: [
    { id: 'root', label: 'Stock IV (K Trades)', children: ['states', 'transitions', 'cap-edge'] },
    { id: 'states', label: '1. 3D DP State', detail: 'dp[i][buy][cap]: day index i, holding flag (0/1), and remaining transaction capacity cap in [1..k]' },
    { id: 'transitions', label: '2. Choice Recurrence', children: ['buy-choice', 'sell-choice'] },
    { id: 'buy-choice', label: 'Can Buy', detail: 'max(-price + ahead[0][cap], ahead[1][cap])' },
    { id: 'sell-choice', label: 'Can Sell (Consumes Cap)', detail: 'max(price + ahead[1][cap - 1], ahead[0][cap])' },
    { id: 'cap-edge', label: '3. Large K Optimization', detail: 'If k >= n/2, transactions are effectively infinite (reduces to greedy Stock II in O(N))' }
  ]
};

export const solutions = {
  cpp: `// C++ Best Time to Buy and Sell Stock IV
// Time: O(N * K) | Space: O(K)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        int n = prices.size();
        if (n == 0 || k == 0) return 0;

        // If k >= n/2, infinite transactions (Stock II greedy)
        if (k >= n / 2) {
            int profit = 0;
            for (int i = 1; i < n; i++) {
                if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
            }
            return profit;
        }

        vector<vector<int>> ahead(2, vector<int>(k + 1, 0));
        vector<vector<int>> cur(2, vector<int>(k + 1, 0));

        for (int i = n - 1; i >= 0; i--) {
            for (int buy = 0; buy <= 1; buy++) {
                for (int cap = 1; cap <= k; cap++) {
                    if (buy == 1) {
                        cur[buy][cap] = max(-prices[i] + ahead[0][cap], ahead[1][cap]);
                    } else {
                        cur[buy][cap] = max(prices[i] + ahead[1][cap - 1], ahead[0][cap]);
                    }
                }
            }
            ahead = cur;
        }

        return ahead[1][k];
    }
};`,
  python: `# Python 3 Best Time to Buy and Sell Stock IV
# Time: O(N * K) | Space: O(K)
class Solution:
    def maxProfit(self, k: int, prices: list[int]) -> int:
        n = len(prices)
        if n == 0 or k == 0:
            return 0

        # Optimization for unlimited transactions
        if k >= n // 2:
            return sum(max(prices[i] - prices[i - 1], 0) for i in range(1, n))

        ahead = [[0] * (k + 1) for _ in range(2)]

        for price in reversed(prices):
            cur = [[0] * (k + 1) for _ in range(2)]
            for buy in (0, 1):
                for cap in range(1, k + 1):
                    if buy == 1:
                        cur[buy][cap] = max(-price + ahead[0][cap], ahead[1][cap])
                    else:
                        cur[buy][cap] = max(price + ahead[1][cap - 1], ahead[0][cap])
            ahead = cur

        return ahead[1][k]`,
  java: `// Java Best Time to Buy and Sell Stock IV
// Time: O(N * K) | Space: O(K)
class Solution {
    public int maxProfit(int k, int[] prices) {
        int n = prices.length;
        if (n == 0 || k == 0) return 0;

        if (k >= n / 2) {
            int profit = 0;
            for (int i = 1; i < n; i++) {
                if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
            }
            return profit;
        }

        int[][] ahead = new int[2][k + 1];

        for (int i = n - 1; i >= 0; i--) {
            int[][] cur = new int[2][k + 1];
            for (int buy = 0; buy <= 1; buy++) {
                for (int cap = 1; cap <= k; cap++) {
                    if (buy == 1) {
                        cur[buy][cap] = Math.max(-prices[i] + ahead[0][cap], ahead[1][cap]);
                    } else {
                        cur[buy][cap] = Math.max(prices[i] + ahead[1][cap - 1], ahead[0][cap]);
                    }
                }
            }
            ahead = cur;
        }

        return ahead[1][k];
    }
}`,
  javascript: `// JavaScript Best Time to Buy and Sell Stock IV
// Time: O(N * K) | Space: O(K)
var maxProfit = function(k, prices) {
    const n = prices.length;
    if (n === 0 || k === 0) return 0;

    if (k >= Math.floor(n / 2)) {
        let profit = 0;
        for (let i = 1; i < n; i++) {
            if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
        }
        return profit;
    }

    let ahead = Array.from({ length: 2 }, () => new Array(k + 1).fill(0));

    for (let i = n - 1; i >= 0; i--) {
        const cur = Array.from({ length: 2 }, () => new Array(k + 1).fill(0));
        for (let buy = 0; buy <= 1; buy++) {
            for (let cap = 1; cap <= k; cap++) {
                if (buy === 1) {
                    cur[buy][cap] = Math.max(-prices[i] + ahead[0][cap], ahead[1][cap]);
                } else {
                    cur[buy][cap] = Math.max(prices[i] + ahead[1][cap - 1], ahead[0][cap]);
                }
            }
        }
        ahead = cur;
    }

    return ahead[1][k];
};`
};

export const steps = [
  {
    phase: 'SETUP',
    prices: [3, 2, 6, 5, 0, 3],
    currentDay: null,
    trades: [],
    dpState: { holdProfit: 0, notHoldProfit: 0, transactionsLeft: 2 },
    formula: 'Capacity K = 2 | prices = [3, 2, 6, 5, 0, 3] | Max Profit = 0',
    action: 'Initialize K-transaction DP state: budget K = 2 trades available.',
    explain: 'We are permitted at most K=2 completed transactions (each transaction is a buy followed by a sell). We track capacity cap in [1..K]. When a sell is executed, capacity decrements to cap - 1.',
    intuition: 'Budget K acts as an inventory constraint preventing over-trading.',
    metrics: [
      { label: 'Current Profit', value: '$0', highlight: true },
      { label: 'Capacity K', value: '2 trades' },
      { label: 'Days', value: '6 days' }
    ],
    customCard: {
      title: 'K-Transaction Budget Rule',
      rows: [
        { label: 'Buying Action', value: 'cur[1][cap] = max(-price + ahead[0][cap], ahead[1][cap])' },
        { label: 'Selling Action', value: 'cur[0][cap] = max(price + ahead[1][cap - 1], ahead[0][cap])  [cap drops by 1!]' }
      ]
    }
  },
  {
    phase: 'SCAN',
    prices: [3, 2, 6, 5, 0, 3],
    currentDay: 0,
    trades: [],
    dpState: { holdProfit: -3, notHoldProfit: 0, transactionsLeft: 2 },
    formula: 'Day 0 ($3): Buy candidate costs -$3 | Price drops tomorrow to $2 => Wait',
    action: 'Day 0 (Price $3): Evaluate buying at $3 vs waiting for lower price.',
    explain: 'Buying at $3 locks -$3 in capital. Day 1 price drops to $2, which offers a strictly better entry.',
    intuition: 'DP evaluates whether entering today beats entering later.',
    metrics: [
      { label: 'Current Day', value: 'Day 0' },
      { label: 'Price', value: '$3' },
      { label: 'Cap Left', value: 2 }
    ]
  },
  {
    phase: 'BUY',
    prices: [3, 2, 6, 5, 0, 3],
    currentDay: 1,
    trades: [],
    dpState: { holdProfit: -2, notHoldProfit: 0, transactionsLeft: 2 },
    formula: 'Day 1 ($2): Buy 1st share at $2 => hold[cap=2] = -$2',
    action: 'Day 1 (Price $2): Optimal entry for Trade 1 at local bottom of $2.',
    explain: 'Buying at $2 costs $2. We enter position 1 with full transaction capacity (cap=2).',
    intuition: 'Best entry price for the first bullish swing.',
    metrics: [
      { label: 'Current Day', value: 'Day 1' },
      { label: 'Price', value: '$2' },
      { label: 'Trade 1 Entry', value: '$2' }
    ]
  },
  {
    phase: 'TRADE',
    prices: [3, 2, 6, 5, 0, 3],
    currentDay: 2,
    trades: [{ buy: 1, sell: 2, net: 4 }],
    dpState: { holdProfit: -2, notHoldProfit: 4, transactionsLeft: 1 },
    formula: 'Day 2 ($6): Sell at $6 => Profit = $6 - $2 = $4 | Cap decrements: 2 -> 1',
    action: 'Day 2 (Price $6): Price hits $6 peak! Sell share for +$4 profit.',
    explain: 'Selling at $6 captures $6 - $2 = $4 profit. This completes Transaction 1. Capacity decrements from 2 to 1.',
    intuition: 'Transaction budget decreases to 1 remaining trade.',
    metrics: [
      { label: 'Current Profit', value: '$4', highlight: true },
      { label: 'Trade 1 Gain', value: '+$4' },
      { label: 'Remaining Cap', value: '1 trade' }
    ],
    customCard: {
      title: 'Trade 1 Complete',
      rows: [
        { label: 'Execution', value: 'Buy D1 ($2) -> Sell D2 ($6)', accent: true },
        { label: 'Budget Update', value: 'Capacity K=2 -> K=1 (1 trade remaining)' }
      ]
    }
  },
  {
    phase: 'SCAN',
    prices: [3, 2, 6, 5, 0, 3],
    currentDay: 3,
    trades: [{ buy: 1, sell: 2, net: 4 }],
    dpState: { holdProfit: -1, notHoldProfit: 4, transactionsLeft: 1 },
    formula: 'Day 3 ($5): Pullback from $6 to $5 | Wait for deeper trough',
    action: 'Day 3 (Price $5): Price drops slightly to $5; hold cash and conserve final transaction.',
    explain: 'With only 1 trade remaining, we must be selective. Buying at $5 is risky when Day 4 offers a much deeper bottom.',
    intuition: 'Finite capacity enforces patience for the highest-conviction trade.',
    metrics: [
      { label: 'Current Day', value: 'Day 3' },
      { label: 'Price', value: '$5' },
      { label: 'Banked Profit', value: '$4' }
    ]
  },
  {
    phase: 'BUY',
    prices: [3, 2, 6, 5, 0, 3],
    currentDay: 4,
    trades: [{ buy: 1, sell: 2, net: 4 }],
    dpState: { holdProfit: 4, notHoldProfit: 4, transactionsLeft: 1 },
    formula: 'Day 4 ($0): Crash to $0! Buy 2nd share: hold = $4 - $0 = $4',
    action: 'Day 4 (Price $0): Absolute bottom! Deploy final transaction budget at $0.',
    explain: 'Price plummets to $0. We deploy our remaining transaction capacity to buy at $0. Total capital holding share is $4 - $0 = $4.',
    intuition: 'Perfect entry for our second and final allowable transaction.',
    metrics: [
      { label: 'Current Day', value: 'Day 4' },
      { label: 'Price', value: '$0' },
      { label: 'Trade 2 Entry', value: '$0' }
    ],
    customCard: {
      title: 'Deploying Final Capacity (Cap = 1)',
      rows: [
        { label: 'Entry Price', value: '$0 (zero cost!)', accent: true },
        { label: 'Equity State', value: '$4 cash + 1 share owned' }
      ]
    }
  },
  {
    phase: 'TRADE',
    prices: [3, 2, 6, 5, 0, 3],
    currentDay: 5,
    trades: [
      { buy: 1, sell: 2, net: 4 },
      { buy: 4, sell: 5, net: 3 }
    ],
    dpState: { holdProfit: 4, notHoldProfit: 7, transactionsLeft: 0 },
    formula: 'Day 5 ($3): Sell at $3 => Profit = $3 - $0 = +$3 | Total: $4 + $3 = $7',
    action: 'Day 5 (Price $3): Rebound to $3! Sell share for +$3 profit. Total = $7.',
    explain: 'Selling on Day 5 locks in $3 - $0 = $3. Transaction 2 is complete. Capacity decrements from 1 to 0. Total profit: $4 + $3 = $7.',
    intuition: 'Both available transaction slots fully utilized at maximum efficiency.',
    metrics: [
      { label: 'Total Profit', value: '$7', highlight: true },
      { label: 'Trade 2 Gain', value: '+$3' },
      { label: 'Budget Used', value: '2 / 2 (100%)' }
    ],
    customCard: {
      title: 'Trade 2 Complete',
      rows: [
        { label: 'Execution', value: 'Buy D4 ($0) -> Sell D5 ($3)', accent: true },
        { label: 'Cumulative Profit', value: '$4 + $3 = $7' }
      ]
    }
  },
  {
    phase: 'EVALUATE',
    prices: [3, 2, 6, 5, 0, 3],
    currentDay: 5,
    trades: [
      { buy: 1, sell: 2, net: 4 },
      { buy: 4, sell: 5, net: 3 }
    ],
    dpState: { holdProfit: 4, notHoldProfit: 7, transactionsLeft: 0 },
    formula: 'K Sensitivity: K=1 -> Max $4 | K=2 -> Max $7 | K>=3 -> Max $7',
    action: 'Analyze sensitivity of profit to transaction capacity K.',
    explain: 'If K was limited to 1: we would choose Trade 1 ($4) over Trade 2 ($3). With K=2: we achieve $7. With K >= 3: profit remains $7 because there are only 2 upward price waves in this stream.',
    intuition: 'DP automatically caps profit when market opportunities are exhausted.',
    metrics: [
      { label: 'Profit at K=1', value: '$4' },
      { label: 'Profit at K=2', value: '$7', highlight: true },
      { label: 'Profit at K>=3', value: '$7' }
    ]
  },
  {
    phase: 'COMPLETED',
    prices: [3, 2, 6, 5, 0, 3],
    currentDay: null,
    trades: [
      { buy: 1, sell: 2, net: 4 },
      { buy: 4, sell: 5, net: 3 }
    ],
    dpState: { holdProfit: 4, notHoldProfit: 7, transactionsLeft: 0 },
    formula: 'Result: maxProfit(k=2, prices) = $7',
    action: 'Algorithm completed in O(N * K) time and O(K) space.',
    explain: 'By maintaining an ahead table of size 2 x (K + 1), space is kept to O(K) rather than O(N * K). Total profit across K=2 transactions is $7.',
    intuition: 'Space-optimized 3D state machine scales cleanly to any arbitrary K.',
    metrics: [
      { label: 'Final Profit', value: '$7', highlight: true },
      { label: 'Time Complexity', value: 'O(N × K)' },
      { label: 'Space Complexity', value: 'O(K)' }
    ],
    customCard: {
      title: 'Optimal Transaction Record',
      rows: [
        { label: 'Trade 1 (D1 -> D2)', value: 'Buy $2, Sell $6 (+$4)', accent: true },
        { label: 'Trade 2 (D4 -> D5)', value: 'Buy $0, Sell $3 (+$3)', accent: true }
      ]
    }
  }
];

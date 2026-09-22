// DATA-ONLY — rendered by StockTradingRenderer via rendererType

export const meta = {
  title: 'Best Time to Buy and Sell Stock III (At Most 2 Transactions)',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Space-Optimized',
  description: 'Calculates the maximum profit achievable with at most 2 completed buy/sell transactions. Solvable in O(N) time and O(1) space by tracking 4 sequential state variables: buy1, sell1, buy2, and sell2.'
};

export const rendererType = 'stock-trading';

export const ideaMap = {
  title: 'Stock III (At Most 2 Transactions)',
  nodes: [
    { id: 'root', label: 'Stock III (2 Trades)', children: ['four-states', 'recurrence', 'optimal'] },
    { id: 'four-states', label: '1. Four State Variables', detail: 'buy1 (1st buy), sell1 (1st sell), buy2 (2nd buy), sell2 (2nd sell)' },
    { id: 'recurrence', label: '2. Sequential Updates', children: ['t1', 't2'] },
    { id: 't1', label: 'Trade 1', detail: 'buy1 = max(buy1, -price); sell1 = max(sell1, buy1 + price)' },
    { id: 't2', label: 'Trade 2 (Reinvests)', detail: 'buy2 = max(buy2, sell1 - price); sell2 = max(sell2, buy2 + price)' },
    { id: 'optimal', label: '3. Max Result', detail: 'sell2 captures combined profit of up to 2 optimal non-overlapping trades in O(1) space' }
  ]
};

export const solutions = {
  cpp: `// C++ Best Time to Buy and Sell Stock III
// Time: O(N) | Space: O(1)
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int buy1 = INT_MIN, sell1 = 0;
        int buy2 = INT_MIN, sell2 = 0;

        for (int price : prices) {
            buy1 = max(buy1, -price);
            sell1 = max(sell1, buy1 + price);
            buy2 = max(buy2, sell1 - price);
            sell2 = max(sell2, buy2 + price);
        }

        return sell2;
    }
};`,
  python: `# Python 3 Best Time to Buy and Sell Stock III
# Time: O(N) | Space: O(1)
class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        buy1 = float('-inf')
        sell1 = 0
        buy2 = float('-inf')
        sell2 = 0

        for price in prices:
            buy1 = max(buy1, -price)
            sell1 = max(sell1, buy1 + price)
            buy2 = max(buy2, sell1 - price)
            sell2 = max(sell2, buy2 + price)

        return sell2`,
  java: `// Java Best Time to Buy and Sell Stock III
// Time: O(N) | Space: O(1)
class Solution {
    public int maxProfit(int[] prices) {
        int buy1 = Integer.MIN_VALUE, sell1 = 0;
        int buy2 = Integer.MIN_VALUE, sell2 = 0;

        for (int price : prices) {
            buy1 = Math.max(buy1, -price);
            sell1 = Math.max(sell1, buy1 + price);
            buy2 = Math.max(buy2, sell1 - price);
            sell2 = Math.max(sell2, buy2 + price);
        }

        return sell2;
    }
}`,
  javascript: `// JavaScript Best Time to Buy and Sell Stock III
// Time: O(N) | Space: O(1)
var maxProfit = function(prices) {
    let buy1 = -Infinity, sell1 = 0;
    let buy2 = -Infinity, sell2 = 0;

    for (const price of prices) {
        buy1 = Math.max(buy1, -price);
        sell1 = Math.max(sell1, buy1 + price);
        buy2 = Math.max(buy2, sell1 - price);
        sell2 = Math.max(sell2, buy2 + price);
    }

    return sell2;
};`
};

export const steps = [
  {
    phase: 'SETUP',
    prices: [3, 3, 5, 0, 0, 3, 1, 4],
    currentDay: null,
    trades: [],
    dpState: { holdProfit: 0, notHoldProfit: 0, transactionsLeft: 2 },
    formula: 'Capacity: at most 2 completed transactions | prices = [3, 3, 5, 0, 0, 3, 1, 4]',
    action: 'Initialize 4 state variables: buy1, sell1, buy2, sell2.',
    explain: 'Instead of full 3D tabulation, Stock III is cleanly solved with 4 state variables: buy1 (cost of 1st buy), sell1 (profit after 1st sell), buy2 (effective capital after 2nd buy), and sell2 (total profit after 2nd sell).',
    intuition: 'Each variable tracks the maximum equity achieved at that stage of trading.',
    metrics: [
      { label: 'Max Profit', value: '$0', highlight: true },
      { label: 'Allowed Trades', value: '2' },
      { label: 'Status', value: 'Ready' }
    ],
    customCard: {
      title: 'Four-Variable State Machine',
      rows: [
        { label: 'Trade 1 States', value: 'buy1 = max(buy1, -price); sell1 = max(sell1, buy1 + price)' },
        { label: 'Trade 2 States', value: 'buy2 = max(buy2, sell1 - price); sell2 = max(sell2, buy2 + price)' }
      ]
    }
  },
  {
    phase: 'SCAN',
    prices: [3, 3, 5, 0, 0, 3, 1, 4],
    currentDay: 0,
    trades: [],
    dpState: { holdProfit: -3, notHoldProfit: 0, transactionsLeft: 2 },
    formula: 'Day 0 ($3): buy1 = -3, sell1 = 0, buy2 = -3, sell2 = 0',
    action: 'Day 0 (Price $3): First purchase establishes initial position at $3.',
    explain: 'Purchasing 1 share costs $3. buy1 = -3. No sales made yet.',
    intuition: 'Initial entry point established.',
    metrics: [
      { label: 'Current Day', value: 'Day 0' },
      { label: 'Price', value: '$3' },
      { label: 'buy1', value: '-$3' }
    ]
  },
  {
    phase: 'SCAN',
    prices: [3, 3, 5, 0, 0, 3, 1, 4],
    currentDay: 1,
    trades: [],
    dpState: { holdProfit: -3, notHoldProfit: 0, transactionsLeft: 2 },
    formula: 'Day 1 ($3): Price flat at $3 => States unchanged',
    action: 'Day 1 (Price $3): Price unchanged; hold states maintain value.',
    explain: 'Flat price gives identical transitions. buy1 remains -3, sell1 = 0.',
    intuition: 'Holding position awaiting price movement.',
    metrics: [
      { label: 'Current Day', value: 'Day 1' },
      { label: 'Price', value: '$3' },
      { label: 'buy1', value: '-$3' }
    ]
  },
  {
    phase: 'TRADE',
    prices: [3, 3, 5, 0, 0, 3, 1, 4],
    currentDay: 2,
    trades: [{ buy: 1, sell: 2, net: 2 }],
    dpState: { holdProfit: -3, notHoldProfit: 2, transactionsLeft: 1 },
    formula: 'Day 2 ($5): sell1 = max(0, -3 + 5) = $2 | sell2 = $2',
    action: 'Day 2 (Price $5): Surge to $5! Trade 1 candidate gains +$2.',
    explain: 'Selling at $5 yields $5 - $3 = $2 profit. sell1 becomes $2. If a second buy is attempted today, buy2 = 2 - 5 = -3.',
    intuition: 'First upward crest banked: +$2.',
    metrics: [
      { label: 'Current Day', value: 'Day 2' },
      { label: 'Price', value: '$5' },
      { label: 'sell1', value: '+$2' }
    ],
    customCard: {
      title: 'First Profit Banked',
      rows: [
        { label: 'Trade 1 Execution', value: 'Buy D1 ($3) -> Sell D2 ($5)', accent: true },
        { label: 'Profit', value: '+$2' }
      ]
    }
  },
  {
    phase: 'BUY',
    prices: [3, 3, 5, 0, 0, 3, 1, 4],
    currentDay: 3,
    trades: [],
    dpState: { holdProfit: 0, notHoldProfit: 2, transactionsLeft: 2 },
    formula: 'Day 3 ($0): buy1 = max(-3, -0) = $0! | buy2 = max(-3, 2 - 0) = +$2!',
    action: 'Day 3 (Price $0): Market bottom! buy1 improves to $0, buy2 reaches +$2.',
    explain: 'Price plunges to $0. Entering Trade 1 at $0 costs $0 (buy1 = 0). Simultaneously, using the $2 from Day 2 to buy at $0 gives buy2 = sell1(2) - 0 = +$2.',
    intuition: 'The $0 price provides an exceptional entry for both Trade 1 and Trade 2.',
    metrics: [
      { label: 'Current Day', value: 'Day 3' },
      { label: 'Price', value: '$0' },
      { label: 'buy1', value: '$0 (free entry)' }
    ],
    customCard: {
      title: 'Dual Opportunity at $0',
      rows: [
        { label: 'Trade 1 Reset', value: 'buy1 = $0 (better than buying at $3)', accent: true },
        { label: 'Trade 2 Entry', value: 'buy2 = sell1($2) - $0 = +$2 net equity' }
      ]
    }
  },
  {
    phase: 'TRADE',
    prices: [3, 3, 5, 0, 0, 3, 1, 4],
    currentDay: 5,
    trades: [{ buy: 3, sell: 5, net: 3 }],
    dpState: { holdProfit: 0, notHoldProfit: 3, transactionsLeft: 1 },
    formula: 'Day 5 ($3): sell1 = max(2, 0 + 3) = $3 | sell2 = max(2, buy2(2) + 3) = $5',
    action: 'Day 5 (Price $3): Rebound to $3! sell1 reaches $3, sell2 reaches $5.',
    explain: 'Selling Trade 1 at $3 yields 3 - 0 = $3 profit. Alternatively, selling Trade 2 (carried from Day 2) yields 2 + 3 = $5. The DP maintains both tracks.',
    intuition: 'Capital expands as price bounces from $0 to $3.',
    metrics: [
      { label: 'Current Day', value: 'Day 5' },
      { label: 'Price', value: '$3' },
      { label: 'sell1', value: '+$3' }
    ]
  },
  {
    phase: 'BUY',
    prices: [3, 3, 5, 0, 0, 3, 1, 4],
    currentDay: 6,
    trades: [{ buy: 3, sell: 5, net: 3 }],
    dpState: { holdProfit: 0, notHoldProfit: 3, transactionsLeft: 1 },
    formula: 'Day 6 ($1): buy2 = max(2, sell1(3) - 1) = +$2',
    action: 'Day 6 (Price $1): Pullback to $1 provides optimal launchpad for Trade 2.',
    explain: 'Price dips to $1. Reinvesting our $3 profit from Trade 1 to buy at $1 gives buy2 = sell1(3) - 1 = $2. We hold a share with $2 net banked cash.',
    intuition: 'Re-entering on the dip before the final push.',
    metrics: [
      { label: 'Current Day', value: 'Day 6' },
      { label: 'Price', value: '$1' },
      { label: 'buy2 State', value: '+$2 equity' }
    ]
  },
  {
    phase: 'TRADE',
    prices: [3, 3, 5, 0, 0, 3, 1, 4],
    currentDay: 7,
    trades: [
      { buy: 3, sell: 5, net: 3 },
      { buy: 6, sell: 7, net: 3 }
    ],
    dpState: { holdProfit: 0, notHoldProfit: 6, transactionsLeft: 0 },
    formula: 'Day 7 ($4): sell2 = max(5, buy2(2) + 4) = $6! Global Maximum!',
    action: 'Day 7 (Price $4): Final peak! Sell Trade 2 share for +$3 profit. Total = $6.',
    explain: 'Selling at $4 yields buy2($2) + $4 = $6. Trade 1: Buy D3 ($0) -> Sell D5 ($3) [+$3]. Trade 2: Buy D6 ($1) -> Sell D7 ($4) [+$3]. Combined total profit = $6.',
    intuition: 'Two non-overlapping trades executed at peak efficiency: $3 + $3 = $6.',
    metrics: [
      { label: 'Total Profit', value: '$6', highlight: true },
      { label: 'Trade 1 Profit', value: '+$3' },
      { label: 'Trade 2 Profit', value: '+$3' }
    ],
    customCard: {
      title: 'Optimal Dual-Trade Portfolio',
      rows: [
        { label: 'Trade 1 (D3 -> D5)', value: 'Buy $0, Sell $3 (+$3 profit)', accent: true },
        { label: 'Trade 2 (D6 -> D7)', value: 'Buy $1, Sell $4 (+$3 profit)', accent: true }
      ]
    }
  },
  {
    phase: 'EVALUATE',
    prices: [3, 3, 5, 0, 0, 3, 1, 4],
    currentDay: 7,
    trades: [
      { buy: 3, sell: 5, net: 3 },
      { buy: 6, sell: 7, net: 3 }
    ],
    dpState: { holdProfit: 0, notHoldProfit: 6, transactionsLeft: 0 },
    formula: 'Single Trade vs Two Trades: Single Trade = $4 | Two Trades = $6 (+$2 extra)',
    action: 'Compare single-transaction maximum with dual-transaction maximum.',
    explain: 'If restricted to 1 trade, the best possible gain is Buy D3 ($0) -> Sell D7 ($4) = $4. By allowing at most 2 trades, the DP captures two separate troughs and crests, boosting profit by 50% to $6.',
    intuition: 'Multiple transaction capacity harvests intra-stream price oscillations.',
    metrics: [
      { label: '1 Trade Max', value: '$4' },
      { label: '2 Trades Max', value: '$6', highlight: true },
      { label: 'Advantage', value: '+50%' }
    ]
  },
  {
    phase: 'COMPLETED',
    prices: [3, 3, 5, 0, 0, 3, 1, 4],
    currentDay: null,
    trades: [
      { buy: 3, sell: 5, net: 3 },
      { buy: 6, sell: 7, net: 3 }
    ],
    dpState: { holdProfit: 0, notHoldProfit: 6, transactionsLeft: 0 },
    formula: 'Result: maxProfit(prices) = $6',
    action: 'Algorithm completed in O(N) time and O(1) auxiliary space.',
    explain: 'The final answer is stored in sell2 = $6. Four variables processed in a single pass achieve the global maximum without auxiliary arrays or recursion stack.',
    intuition: 'Constant-space state machine captures multi-stage trading decisions cleanly.',
    metrics: [
      { label: 'Final Max Profit', value: '$6', highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    customCard: {
      title: 'Final Summary',
      rows: [
        { label: 'Trade 1 (D3 -> D5)', value: 'Buy at $0, Sell at $3 (Net +$3)' },
        { label: 'Trade 2 (D6 -> D7)', value: 'Buy at $1, Sell at $4 (Net +$3)' }
      ]
    }
  }
];

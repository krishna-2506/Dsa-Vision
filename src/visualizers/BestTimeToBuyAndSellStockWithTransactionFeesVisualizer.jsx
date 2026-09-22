// DATA-ONLY — rendered by StockTradingRenderer via rendererType

export const meta = {
  title: 'Best Time to Buy and Sell Stock with Transaction Fee',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Space-Optimized',
  description: 'Finds the maximum profit from multiple stock transactions where every complete transaction incurs a fixed transaction fee. Selling an asset yields prices[i] - fee.'
};

export const rendererType = 'stock-trading';

export const ideaMap = {
  title: 'Stock with Transaction Fee',
  nodes: [
    { id: 'root', label: 'Stock with Fee', children: ['state', 'transitions', 'insight'] },
    { id: 'state', label: '1. Two State Variables', detail: 'hold: max profit currently holding a stock; notHold: max profit with 0 stock' },
    { id: 'transitions', label: '2. Daily DP Transitions', children: ['buy-rule', 'sell-rule'] },
    { id: 'buy-rule', label: 'Buy / Hold', detail: 'hold = max(hold, notHold - price)' },
    { id: 'sell-rule', label: 'Sell / Idle (Fee Deducted)', detail: 'notHold = max(notHold, hold + price - fee)' },
    { id: 'insight', label: '3. Economic Intuition', detail: 'Fee discourages micro-churn; algorithm holds through noise until price swing exceeds fee' }
  ]
};

export const solutions = {
  cpp: `// C++ Stock with Transaction Fee
// Time: O(N) | Space: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices, int fee) {
        int n = prices.size();
        if (n == 0) return 0;
        int hold = -prices[0];
        int notHold = 0;

        for (int i = 1; i < n; i++) {
            hold = max(hold, notHold - prices[i]);
            notHold = max(notHold, hold + prices[i] - fee);
        }

        return notHold;
    }
};`,
  python: `# Python 3 Stock with Transaction Fee
# Time: O(N) | Space: O(1)
class Solution:
    def maxProfit(self, prices: list[int], fee: int) -> int:
        if not prices:
            return 0
        hold = -prices[0]
        not_hold = 0

        for price in prices[1:]:
            hold = max(hold, not_hold - price)
            not_hold = max(not_hold, hold + price - fee)

        return not_hold`,
  java: `// Java Stock with Transaction Fee
// Time: O(N) | Space: O(1)
class Solution {
    public int maxProfit(int[] prices, int fee) {
        if (prices.length == 0) return 0;
        int hold = -prices[0];
        int notHold = 0;

        for (int i = 1; i < prices.length; i++) {
            hold = Math.max(hold, notHold - prices[i]);
            notHold = Math.max(notHold, hold + prices[i] - fee);
        }

        return notHold;
    }
}`,
  javascript: `// JavaScript Stock with Transaction Fee
// Time: O(N) | Space: O(1)
var maxProfit = function(prices, fee) {
    if (!prices.length) return 0;
    let hold = -prices[0];
    let notHold = 0;

    for (let i = 1; i < prices.length; i++) {
        hold = Math.max(hold, notHold - prices[i]);
        notHold = Math.max(notHold, hold + prices[i] - fee);
    }

    return notHold;
};`
};

export const steps = [
  {
    phase: 'SETUP',
    prices: [1, 3, 2, 8, 4, 9],
    currentDay: null,
    trades: [],
    dpState: { holdProfit: -1, notHoldProfit: 0 },
    formula: 'hold = -prices[0] = -1 | notHold = 0 | fee = $2',
    action: 'Initialize state: hold = -$1 (bought on Day 0) and notHold = $0.',
    explain: 'We maintain two states: hold (maximum profit when holding a share) and notHold (maximum profit when holding zero shares). On Day 0, buying costs $1 so hold = -1, while remaining idle gives notHold = 0. A fixed $2 fee is deducted on every sell.',
    intuition: 'The $2 transaction fee penalizes frequent buying and selling, rewarding patience through minor fluctuations.',
    metrics: [
      { label: 'Current Net Profit', value: '$0', highlight: true },
      { label: 'Transaction Fee', value: '$2 / trade' },
      { label: 'Hold State', value: '-$1' }
    ],
    customCard: {
      title: 'State Transition Equations',
      rows: [
        { label: 'Hold Transition', value: 'hold = max(hold, notHold - price)' },
        { label: 'NotHold Transition', value: 'notHold = max(notHold, hold + price - fee)' }
      ]
    }
  },
  {
    phase: 'SCAN',
    prices: [1, 3, 2, 8, 4, 9],
    currentDay: 0,
    trades: [],
    dpState: { holdProfit: -1, notHoldProfit: 0 },
    formula: 'Day 0: Price = $1 | Buy candidate: hold = -1',
    action: 'Day 0 (Price $1): Buying establishes the baseline position.',
    explain: 'Purchasing 1 share at $1 sets hold = -1. notHold remains 0.',
    intuition: 'Low entry price of $1 provides strong upward leverage.',
    metrics: [
      { label: 'Current Day', value: 'Day 0' },
      { label: 'Price', value: '$1' },
      { label: 'Hold', value: '-$1' }
    ]
  },
  {
    phase: 'HOLD',
    prices: [1, 3, 2, 8, 4, 9],
    currentDay: 1,
    trades: [],
    dpState: { holdProfit: -1, notHoldProfit: 0 },
    formula: 'Day 1 ($3): Sell candidate = 3 - 2 + (-1) = $0 <= notHold(0) => Do Not Sell',
    action: 'Day 1 (Price $3): Price rose by $2, exactly equal to the fee. Holding is optimal.',
    explain: 'Selling at $3 would yield $3 - $2 (fee) + (-$1 initial cost) = $0 net profit. Since notHold is already 0, selling produces zero extra gain. We choose to hold.',
    intuition: 'The fee eliminates profits from small price bumps, preventing premature exits.',
    metrics: [
      { label: 'Current Day', value: 'Day 1' },
      { label: 'Price', value: '$3' },
      { label: 'Decision', value: 'Hold (avoid fee)' }
    ],
    customCard: {
      title: 'Fee Friction In Action',
      rows: [
        { label: 'Gross Gain', value: '$3 - $1 = +$2' },
        { label: 'After Fee', value: '$2 - $2 = $0 net (no incentive to sell)' }
      ]
    }
  },
  {
    phase: 'HOLD',
    prices: [1, 3, 2, 8, 4, 9],
    currentDay: 2,
    trades: [],
    dpState: { holdProfit: -1, notHoldProfit: 0 },
    formula: 'Day 2 ($2): Dip to $2 | Sell yields 2 - 2 - 1 = -$1 < 0 => Keep Holding',
    action: 'Day 2 (Price $2): Price dips to $2. Continue holding original position.',
    explain: 'Selling at $2 would cause a loss: 2 - 2 - 1 = -$1. We stay in hold state (-$1).',
    intuition: 'Riding out temporary dips preserves capital when the broader trend is upward.',
    metrics: [
      { label: 'Current Day', value: 'Day 2' },
      { label: 'Price', value: '$2' },
      { label: 'Hold', value: '-$1' }
    ]
  },
  {
    phase: 'TRADE',
    prices: [1, 3, 2, 8, 4, 9],
    currentDay: 3,
    trades: [{ buy: 0, sell: 3, gross: 7, fee: 2, net: 5 }],
    dpState: { holdProfit: -1, notHoldProfit: 5 },
    formula: 'Day 3 ($8): notHold = max(0, -1 + 8 - 2) = $5 => Execute Sell!',
    action: 'Day 3 (Price $8): Price surges to $8! Execute Trade 1 for +$5 net profit.',
    explain: 'Selling at $8 yields: $8 - $2 (fee) + hold(-$1) = $5. Since $5 > 0, notHold updates to $5. Trade 1: Bought Day 0 ($1) and sold Day 3 ($8) for gross $7, net $5.',
    intuition: 'A significant price breakout easily overcomes the transaction fee.',
    metrics: [
      { label: 'Current Net Profit', value: '$5', highlight: true },
      { label: 'Gross Gain', value: '+$7' },
      { label: 'Fee Paid', value: '$2' }
    ],
    customCard: {
      title: 'Trade 1 Executed',
      rows: [
        { label: 'Transaction', value: 'Buy Day 0 ($1) -> Sell Day 3 ($8)', accent: true },
        { label: 'Net Profit', value: '($8 - $1) - $2 = $5' }
      ]
    }
  },
  {
    phase: 'BUY',
    prices: [1, 3, 2, 8, 4, 9],
    currentDay: 4,
    trades: [{ buy: 0, sell: 3, gross: 7, fee: 2, net: 5 }],
    dpState: { holdProfit: 1, notHoldProfit: 5 },
    formula: 'Day 4 ($4): Buy candidate: notHold(5) - 4 = $1 > hold(-1) => Re-enter position!',
    action: 'Day 4 (Price $4): Pullback to $4 provides a fresh buying opportunity.',
    explain: 'Using our accumulated $5 profit to purchase a share at $4 gives hold = max(-1, 5 - 4) = $1. We now hold 1 share with $1 liquid cash in reserve.',
    intuition: 'Reinvesting profits after a price pullback compounds capital.',
    metrics: [
      { label: 'Current Day', value: 'Day 4' },
      { label: 'Price', value: '$4' },
      { label: 'Hold State', value: '+$1 (reinvested)' }
    ],
    customCard: {
      title: 'Position Re-entry',
      rows: [
        { label: 'Prior Profit', value: '$5 banked' },
        { label: 'Effective Entry', value: '$5 - $4 = $1 net equity holding share' }
      ]
    }
  },
  {
    phase: 'TRADE',
    prices: [1, 3, 2, 8, 4, 9],
    currentDay: 5,
    trades: [
      { buy: 0, sell: 3, gross: 7, fee: 2, net: 5 },
      { buy: 4, sell: 5, gross: 5, fee: 2, net: 3 }
    ],
    dpState: { holdProfit: 1, notHoldProfit: 8 },
    formula: 'Day 5 ($9): notHold = max(5, hold(1) + 9 - 2) = $8 => Execute Sell!',
    action: 'Day 5 (Price $9): Price peaks at $9! Sell share for additional +$3 net profit.',
    explain: 'Selling at $9 yields: hold($1) + $9 - $2 (fee) = $8 net profit. Trade 2: Bought Day 4 ($4) and sold Day 5 ($9) for gross $5 - $2 fee = $3 net.',
    intuition: 'Second profitable swing captured.',
    metrics: [
      { label: 'Total Net Profit', value: '$8', highlight: true },
      { label: 'Trade 2 Net', value: '+$3' },
      { label: 'All Trades Net', value: '$5 + $3 = $8' }
    ],
    customCard: {
      title: 'Trade 2 Executed',
      rows: [
        { label: 'Transaction', value: 'Buy Day 4 ($4) -> Sell Day 5 ($9)', accent: true },
        { label: 'Trade 2 Net', value: '($9 - $4) - $2 = $3' }
      ]
    }
  },
  {
    phase: 'EVALUATE',
    prices: [1, 3, 2, 8, 4, 9],
    currentDay: 5,
    trades: [
      { buy: 0, sell: 3, gross: 7, fee: 2, net: 5 },
      { buy: 4, sell: 5, gross: 5, fee: 2, net: 3 }
    ],
    dpState: { holdProfit: 1, notHoldProfit: 8 },
    formula: 'Gross Profits: $7 + $5 = $12 | Fees Paid: $2 * 2 = $4 | Net: $8',
    action: 'Evaluate trade portfolio and transaction friction impact.',
    explain: 'Total gross profit across both trades was $12. We paid 2 x $2 = $4 in transaction fees, ending with a clean $8 net profit. Without fee-aware DP, naive day-trading would have produced 4 transactions with $8 in fees.',
    intuition: 'Fewer, high-conviction trades maximize after-fee returns.',
    metrics: [
      { label: 'Gross Profit', value: '$12' },
      { label: 'Total Fees', value: '-$4' },
      { label: 'Net Profit', value: '$8', highlight: true }
    ]
  },
  {
    phase: 'COMPLETED',
    prices: [1, 3, 2, 8, 4, 9],
    currentDay: null,
    trades: [
      { buy: 0, sell: 3, gross: 7, fee: 2, net: 5 },
      { buy: 4, sell: 5, gross: 5, fee: 2, net: 3 }
    ],
    dpState: { holdProfit: 1, notHoldProfit: 8 },
    formula: 'Result: maxProfit(prices, 2) = $8',
    action: 'Algorithm completed in O(N) time and O(1) auxiliary space.',
    explain: 'By maintaining two running variables (hold and notHold), we solve the problem in a single forward pass without needing an O(N) DP table. Final net profit is $8.',
    intuition: 'Optimal state machine captures major swings while naturally suppressing noise under the transaction fee threshold.',
    metrics: [
      { label: 'Final Net Profit', value: '$8', highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    customCard: {
      title: 'Optimal Trade Summary',
      rows: [
        { label: 'Trade 1 (D0 -> D3)', value: 'Buy $1, Sell $8 (Net +$5)', accent: true },
        { label: 'Trade 2 (D4 -> D5)', value: 'Buy $4, Sell $9 (Net +$3)', accent: true }
      ]
    }
  }
];

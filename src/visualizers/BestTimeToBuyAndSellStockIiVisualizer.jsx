// DATA-ONLY — rendered by StockTradingRenderer via rendererType

export const meta = {
  title: 'Best Time to Buy and Sell Stock II (Infinite Transactions)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Space-Optimized',
  description: 'Calculates maximum profit when any number of buy/sell transactions are allowed (holding at most 1 stock at a time). Captures every upward price slope via 2-state DP or greedy price differences.'
};

export const rendererType = 'stock-trading';

export const ideaMap = {
  title: 'Stock II (Infinite Transactions)',
  nodes: [
    { id: 'root', label: 'Stock II (Unlimited)', children: ['greedy-view', 'dp-view', 'optimal-harvest'] },
    { id: 'greedy-view', label: '1. Greedy Slope Insight', detail: 'Sum all positive daily gains: if prices[i] > prices[i-1], add (prices[i] - prices[i-1])' },
    { id: 'dp-view', label: '2. Dynamic Programming Form', children: ['dp-hold', 'dp-not-hold'] },
    { id: 'dp-hold', label: 'Hold State', detail: 'hold = max(hold, notHold - price) — holds stock or buys today' },
    { id: 'dp-not-hold', label: 'Not-Hold State', detail: 'notHold = max(notHold, hold + price) — keeps cash or sells today' },
    { id: 'optimal-harvest', label: '3. Market Capture', detail: 'Captures every single bullish leg while skipping every bearish dip in O(N) time' }
  ]
};

export const solutions = {
  cpp: `// C++ Best Time to Buy and Sell Stock II
// Time: O(N) | Space: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int profit = 0;
        for (int i = 1; i < prices.size(); i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }
};`,
  python: `# Python 3 Best Time to Buy and Sell Stock II
# Time: O(N) | Space: O(1)
class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        return sum(max(prices[i] - prices[i - 1], 0) for i in range(1, len(prices)))`,
  java: `// Java Best Time to Buy and Sell Stock II
// Time: O(N) | Space: O(1)
class Solution {
    public int maxProfit(int[] prices) {
        int profit = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }
}`,
  javascript: `// JavaScript Best Time to Buy and Sell Stock II
// Time: O(N) | Space: O(1)
var maxProfit = function(prices) {
    let profit = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1];
        }
    }
    return profit;
};`
};

export const steps = [
  {
    phase: 'SETUP',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: null,
    trades: [],
    dpState: { holdProfit: -7, notHoldProfit: 0 },
    formula: 'Rule: Unlimited transactions allowed | prices = [7, 1, 5, 3, 6, 4]',
    action: 'Initialize two state tracking variables: hold = -$7 (cost on D0), notHold = $0.',
    explain: 'Because we can buy and sell as many times as we want (as long as we hold at most 1 stock at any time), we can either solve this with 2 DP states (hold and notHold) or greedily collect every positive consecutive difference (prices[i] - prices[i-1]).',
    intuition: 'Whenever the price rises tomorrow, we want to participate in that climb.',
    metrics: [
      { label: 'Total Profit', value: '$0', highlight: true },
      { label: 'Transactions', value: 'Unlimited' },
      { label: 'Status', value: 'Ready' }
    ],
    customCard: {
      title: 'Equivalence Principle',
      rows: [
        { label: 'Local Valley to Peak', value: 'Buying at $1 and selling at $5 is equivalent to (5 - 1) = +$4' },
        { label: 'Daily Aggregation', value: 'sum(max(prices[i] - prices[i-1], 0)) guarantees mathematical equivalence' }
      ]
    }
  },
  {
    phase: 'SCAN',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 0,
    trades: [],
    dpState: { holdProfit: -7, notHoldProfit: 0 },
    formula: 'Day 0 ($7): hold = -7, notHold = 0',
    action: 'Day 0 (Price $7): High opening price; buying costs -$7.',
    explain: 'Buying at $7 requires 7 capital. Day 1 price plunges to $1, so holding from $7 is sub-optimal.',
    intuition: 'Do not hold stock when price is falling.',
    metrics: [
      { label: 'Current Day', value: 'Day 0' },
      { label: 'Price', value: '$7' },
      { label: 'Hold State', value: '-$7' }
    ]
  },
  {
    phase: 'BUY',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 1,
    trades: [],
    dpState: { holdProfit: -1, notHoldProfit: 0 },
    formula: 'Day 1 ($1): hold = max(-7, 0 - 1) = -$1 (Buy entry improved by $6!)',
    action: 'Day 1 (Price $1): Price plunges to $1! Upgrade buy position to $1.',
    explain: 'Price crashed from $7 to $1. hold updates to max(-7, notHold(0) - 1) = -$1. We establish our long position at the local bottom of $1.',
    intuition: 'Perfect valley entry at $1.',
    metrics: [
      { label: 'Current Day', value: 'Day 1' },
      { label: 'Price', value: '$1' },
      { label: 'Hold State', value: '-$1 (Optimal Buy)' }
    ],
    customCard: {
      title: 'Valley Buy Triggered',
      rows: [
        { label: 'Entry Price', value: '$1 (cost drops from $7 to $1)', accent: true },
        { label: 'Position', value: 'Holding 1 share at $1 cost' }
      ]
    }
  },
  {
    phase: 'TRADE',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 2,
    trades: [{ buy: 1, sell: 2, net: 4 }],
    dpState: { holdProfit: -1, notHoldProfit: 4 },
    formula: 'Day 2 ($5): notHold = max(0, -1 + 5) = $4 => Bank +$4 profit!',
    action: 'Day 2 (Price $5): Price leaps to $5 peak! Sell share for +$4 profit.',
    explain: 'Selling at $5 yields: hold(-1) + 5 = $4 profit. Trade 1: Bought Day 1 ($1) and sold Day 2 ($5) for +$4 net gain.',
    intuition: 'First upward curve harvested: +$4.',
    metrics: [
      { label: 'Current Profit', value: '$4', highlight: true },
      { label: 'Trade 1 Gain', value: '+$4' },
      { label: 'Completed Trades', value: '1' }
    ],
    customCard: {
      title: 'Trade 1 Complete',
      rows: [
        { label: 'Transaction', value: 'Buy Day 1 ($1) -> Sell Day 2 ($5)', accent: true },
        { label: 'Profit', value: '$5 - $1 = +$4' }
      ]
    }
  },
  {
    phase: 'BUY',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 3,
    trades: [{ buy: 1, sell: 2, net: 4 }],
    dpState: { holdProfit: 1, notHoldProfit: 4 },
    formula: 'Day 3 ($3): hold = max(-1, notHold(4) - 3) = +$1 (Re-enter position!)',
    action: 'Day 3 (Price $3): Pullback to $3! Re-enter long position for Trade 2.',
    explain: 'Price pulled back from $5 to $3. By selling at $5 on Day 2, we preserved our $4 cash. Now buying at $3 costs $3, leaving hold = 4 - 3 = +$1 equity while holding a share.',
    intuition: 'Selling at the crest avoided the $2 dip, enabling a cheaper re-entry.',
    metrics: [
      { label: 'Current Day', value: 'Day 3' },
      { label: 'Price', value: '$3' },
      { label: 'Hold Equity', value: '+$1 (1 share + $1 cash)' }
    ],
    customCard: {
      title: 'Pullback Re-entry',
      rows: [
        { label: 'Avoided Drawdown', value: 'Did not hold through $5 -> $3 decline', accent: true },
        { label: 'Re-entry Cost', value: '$3 paid from $4 banked profit' }
      ]
    }
  },
  {
    phase: 'TRADE',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 4,
    trades: [
      { buy: 1, sell: 2, net: 4 },
      { buy: 3, sell: 4, net: 3 }
    ],
    dpState: { holdProfit: 1, notHoldProfit: 7 },
    formula: 'Day 4 ($6): notHold = max(4, hold(1) + 6) = $7 => Bank +$3 profit!',
    action: 'Day 4 (Price $6): Price hits $6! Sell share for +$3 additional profit.',
    explain: 'Selling on Day 4 yields: hold(1) + 6 = $7 total profit. Trade 2: Bought Day 3 ($3) and sold Day 4 ($6) for +$3 gain. Total cumulative profit = $4 + $3 = $7.',
    intuition: 'Second upward curve harvested: +$3.',
    metrics: [
      { label: 'Total Profit', value: '$7', highlight: true },
      { label: 'Trade 2 Gain', value: '+$3' },
      { label: 'Completed Trades', value: '2' }
    ],
    customCard: {
      title: 'Trade 2 Complete',
      rows: [
        { label: 'Transaction', value: 'Buy Day 3 ($3) -> Sell Day 4 ($6)', accent: true },
        { label: 'Cumulative Profit', value: '$4 + $3 = $7' }
      ]
    }
  },
  {
    phase: 'SCAN',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 5,
    trades: [
      { buy: 1, sell: 2, net: 4 },
      { buy: 3, sell: 4, net: 3 }
    ],
    dpState: { holdProfit: 3, notHoldProfit: 7 },
    formula: 'Day 5 ($4): Dip to $4 | Final day, no subsequent selling days',
    action: 'Day 5 (Price $4): Price drops to $4 on final day; stay in all-cash notHold state.',
    explain: 'Buying on the final day without a future day to sell would needlessly reduce cash. notHold remains $7.',
    intuition: 'Always end in liquid cash state on the final trading day.',
    metrics: [
      { label: 'Current Day', value: 'Day 5' },
      { label: 'Price', value: '$4' },
      { label: 'Final Cash', value: '$7' }
    ]
  },
  {
    phase: 'EVALUATE',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 5,
    trades: [
      { buy: 1, sell: 2, net: 4 },
      { buy: 3, sell: 4, net: 3 }
    ],
    dpState: { holdProfit: 3, notHoldProfit: 7 },
    formula: 'Daily Slopes: (5 - 1) + (6 - 3) = 4 + 3 = $7',
    action: 'Verify result against greedy slope summation.',
    explain: 'Slope 1 (Day 1 -> Day 2): 5 - 1 = +4. Slope 2 (Day 3 -> Day 4): 6 - 3 = +3. All other day-over-day price movements were negative (7->1 is -6, 5->3 is -2, 6->4 is -2). Summing all positive slopes: 4 + 3 = 7.',
    intuition: 'Greedy local slopes sum exactly to the multi-transaction global optimum.',
    metrics: [
      { label: 'Positive Slopes Sum', value: '$7', highlight: true },
      { label: 'Negative Slopes Skipped', value: '3 dips avoided' },
      { label: 'Efficiency', value: '100%' }
    ]
  },
  {
    phase: 'COMPLETED',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: null,
    trades: [
      { buy: 1, sell: 2, net: 4 },
      { buy: 3, sell: 4, net: 3 }
    ],
    dpState: { holdProfit: 3, notHoldProfit: 7 },
    formula: 'Result: maxProfit(prices) = $7',
    action: 'Algorithm completed in O(N) time and O(1) space.',
    explain: 'Maximum profit with unlimited transactions is $7. Executed across 2 non-overlapping trades: [1 -> 5] and [3 -> 6].',
    intuition: 'Whenever future price exceeds current price, capture the upward momentum.',
    metrics: [
      { label: 'Final Profit', value: '$7', highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    customCard: {
      title: 'Optimal Transaction Record',
      rows: [
        { label: 'Trade 1 (D1 -> D2)', value: 'Buy $1, Sell $5 (+$4)', accent: true },
        { label: 'Trade 2 (D3 -> D4)', value: 'Buy $3, Sell $6 (+$3)', accent: true }
      ]
    }
  }
];

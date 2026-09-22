// DATA-ONLY — rendered by StockTradingRenderer via rendererType

export const meta = {
  title: 'Best Time to Buy and Sell Stock with Cooldown',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Space-Optimized',
  description: 'Finds the maximum profit from multiple stock transactions with a mandatory 1-day cooldown period immediately after selling. If sold on day i, the next buy can only occur on day i + 2.'
};

export const rendererType = 'stock-trading';

export const ideaMap = {
  title: 'Stock with Cooldown',
  nodes: [
    { id: 'root', label: 'Stock with Cooldown', children: ['states', 'transitions', 'advantage'] },
    { id: 'states', label: '1. Three States', detail: 'Hold (owns share), Sold (just sold today), Rest (idle / cooldown)' },
    { id: 'transitions', label: '2. Allowed Transitions', children: ['t-hold', 't-sold', 't-rest'] },
    { id: 't-hold', label: 'Hold State', detail: 'hold = max(hold, rest - price) — can ONLY buy from Rest state!' },
    { id: 't-sold', label: 'Sold State', detail: 'sold = hold + price — entering mandatory cooldown tomorrow' },
    { id: 't-rest', label: 'Rest State', detail: 'rest = max(rest, sold) — absorbs cooldown day and unlocks next buy' },
    { id: 'advantage', label: '3. Optimal Strategy', detail: 'Early sell at $2 frees capital to buy the huge $0 dip on Day 3' }
  ]
};

export const solutions = {
  cpp: `// C++ Stock with Cooldown
// Time: O(N) | Space: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        if (prices.empty()) return 0;
        int hold = -prices[0];
        int sold = 0;
        int rest = 0;

        for (int i = 1; i < prices.size(); i++) {
            int prevHold = hold;
            int prevSold = sold;
            hold = max(hold, rest - prices[i]);
            sold = prevHold + prices[i];
            rest = max(rest, prevSold);
        }

        return max(sold, rest);
    }
};`,
  python: `# Python 3 Stock with Cooldown
# Time: O(N) | Space: O(1)
class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        if not prices:
            return 0
        hold = -prices[0]
        sold = 0
        rest = 0

        for price in prices[1:]:
            prev_hold = hold
            prev_sold = sold
            hold = max(hold, rest - price)
            sold = prev_hold + price
            rest = max(rest, prev_sold)

        return max(sold, rest)`,
  java: `// Java Stock with Cooldown
// Time: O(N) | Space: O(1)
class Solution {
    public int maxProfit(int[] prices) {
        if (prices.length == 0) return 0;
        int hold = -prices[0];
        int sold = 0;
        int rest = 0;

        for (int i = 1; i < prices.length; i++) {
            int prevHold = hold;
            int prevSold = sold;
            hold = Math.max(hold, rest - prices[i]);
            sold = prevHold + prices[i];
            rest = Math.max(rest, prevSold);
        }

        return Math.max(sold, rest);
    }
}`,
  javascript: `// JavaScript Stock with Cooldown
// Time: O(N) | Space: O(1)
var maxProfit = function(prices) {
    if (!prices.length) return 0;
    let hold = -prices[0];
    let sold = 0;
    let rest = 0;

    for (let i = 1; i < prices.length; i++) {
        const prevHold = hold;
        const prevSold = sold;
        hold = Math.max(hold, rest - prices[i]);
        sold = prevHold + prices[i];
        rest = Math.max(rest, prevSold);
    }

    return Math.max(sold, rest);
};`
};

export const steps = [
  {
    phase: 'SETUP',
    prices: [1, 2, 3, 0, 2],
    currentDay: null,
    trades: [],
    dpState: { holdProfit: -1, notHoldProfit: 0, cooldownProfit: 0 },
    formula: 'Three States: Hold (bought), Sold (just sold), Rest (idle/cooldown)',
    action: 'Initialize state machine: hold = -1, sold = 0, rest = 0.',
    explain: 'Cooldown rule: Selling today freezes buying tomorrow. To model this, we split into 3 states: Hold (owns share), Sold (sold today, forced to rest next day), and Rest (cooldown completed or already idle, eligible to buy).',
    intuition: 'The cooldown forces a mandatory rest step between selling and the next purchase.',
    metrics: [
      { label: 'Max Profit', value: '$0', highlight: true },
      { label: 'Cooldown Period', value: '1 day' },
      { label: 'Hold State', value: '-$1' }
    ],
    customCard: {
      title: 'State Machine Transitions',
      rows: [
        { label: 'Buy Transition', value: 'hold = max(hold, rest - price)  [Only from Rest!]' },
        { label: 'Sell Transition', value: 'sold = hold + price  [Unlocks Rest tomorrow]' },
        { label: 'Rest Transition', value: 'rest = max(rest, sold_prev)  [Absorbs cooldown]' }
      ]
    }
  },
  {
    phase: 'BUY',
    prices: [1, 2, 3, 0, 2],
    currentDay: 0,
    trades: [],
    dpState: { holdProfit: -1, notHoldProfit: 0, cooldownProfit: 0 },
    formula: 'Day 0 ($1): hold = -1, sold = 0, rest = 0',
    action: 'Day 0 (Price $1): Buy share at $1.',
    explain: 'Starting position: buying 1 share costs $1, leaving hold = -1. sold = 0, rest = 0.',
    intuition: 'Enter position at lowest available starting price.',
    metrics: [
      { label: 'Current Day', value: 'Day 0' },
      { label: 'Price', value: '$1' },
      { label: 'Hold', value: '-$1' }
    ]
  },
  {
    phase: 'SCAN',
    prices: [1, 2, 3, 0, 2],
    currentDay: 1,
    trades: [{ buy: 0, sell: 1, net: 1 }],
    dpState: { holdProfit: -1, notHoldProfit: 1, cooldownProfit: 0 },
    formula: 'Day 1 ($2): sold = hold(-1) + 2 = $1 | hold = max(-1, rest(0) - 2) = -1',
    action: 'Day 1 (Price $2): Selling yields +$1, while continuing to hold preserves the position.',
    explain: 'If we sell today: sold = -1 + 2 = $1. This enters Trade 1 candidate (Buy D0 -> Sell D1 for +$1). Notice: selling today forces Day 2 to be cooldown.',
    intuition: 'Selling locks Day 2, but locks in $1 profit immediately.',
    metrics: [
      { label: 'Current Day', value: 'Day 1' },
      { label: 'Price', value: '$2' },
      { label: 'Sold State', value: '+$1' }
    ]
  },
  {
    phase: 'COOLDOWN',
    prices: [1, 2, 3, 0, 2],
    currentDay: 2,
    trades: [{ buy: 0, sell: 1, net: 1 }],
    dpState: { holdProfit: -1, notHoldProfit: 2, cooldownProfit: 1 },
    formula: 'Day 2 ($3): rest = max(0, sold(1)) = 1 (Cooldown active) | sold = hold(-1) + 3 = 2',
    action: 'Day 2 (Price $3): Day 2 absorbs cooldown from Day 1 sale (rest = $1).',
    explain: 'If we sold on Day 1, Day 2 is mandatory cooldown: rest = max(0, sold_prev=1) = $1. Alternatively, if we held from Day 0, selling at Day 2 yields 3 - 1 = $2.',
    intuition: 'The DP evaluates both paths: Sell Day 1 vs Sell Day 2.',
    metrics: [
      { label: 'Current Day', value: 'Day 2' },
      { label: 'Price', value: '$3' },
      { label: 'Rest / Cooldown', value: '+$1 (Cooldown)' }
    ],
    customCard: {
      title: 'Cooldown Divergence',
      rows: [
        { label: 'Path A (Sell D1)', value: 'Day 2 in Cooldown (rest = $1), ready to buy on Day 3!', accent: true },
        { label: 'Path B (Hold to D2)', value: 'Sell D2 for $2, but Day 3 will be frozen in cooldown!' }
      ]
    }
  },
  {
    phase: 'BUY',
    prices: [1, 2, 3, 0, 2],
    currentDay: 3,
    trades: [{ buy: 0, sell: 1, net: 1 }],
    dpState: { holdProfit: 1, notHoldProfit: -1, cooldownProfit: 2 },
    formula: 'Day 3 ($0): hold = max(-1, rest(1) - 0) = +$1! (Buy at bottom!)',
    action: 'Day 3 (Price $0): Path A buys the bottom at $0 using accumulated $1 profit!',
    explain: 'Because Path A rested on Day 2, it is fully unlocked to buy on Day 3! hold = rest(1) - 0 = +$1. Path B sold on Day 2 and is stuck in cooldown on Day 3 (cannot buy at $0)!',
    intuition: 'Selling early at Day 1 was genius: it freed us from cooldown just in time to buy the $0 bottom.',
    metrics: [
      { label: 'Current Day', value: 'Day 3' },
      { label: 'Price', value: '$0' },
      { label: 'Hold State', value: '+$1 (holding share free)' }
    ],
    customCard: {
      title: 'Crucial Tactic Unlocked',
      rows: [
        { label: 'Path A Advantage', value: 'Cooldown on Day 2 allowed buying Day 3 at $0!', accent: true },
        { label: 'Path B Penalty', value: 'Selling at $3 locked Day 3 into cooldown, missing the $0 bargain' }
      ]
    }
  },
  {
    phase: 'TRADE',
    prices: [1, 2, 3, 0, 2],
    currentDay: 4,
    trades: [
      { buy: 0, sell: 1, net: 1 },
      { buy: 3, sell: 4, net: 2 }
    ],
    dpState: { holdProfit: 1, notHoldProfit: 3, cooldownProfit: 2 },
    formula: 'Day 4 ($2): sold = hold(1) + 2 = $3 => Execute Final Sell!',
    action: 'Day 4 (Price $2): Sell share bought at $0 for additional +$2 profit! Total = $3.',
    explain: 'Selling at Day 4 yields: hold(1) + 2 = $3. Trade 2: Bought Day 3 ($0) and sold Day 4 ($2) for +$2. Total combined profit = $1 + $2 = $3.',
    intuition: 'Harvesting maximum profit of $3 across the two decoupled cycles.',
    metrics: [
      { label: 'Current Profit', value: '$3', highlight: true },
      { label: 'Trade 2 Profit', value: '+$2' },
      { label: 'Total Net Profit', value: '$3' }
    ],
    customCard: {
      title: 'Trade 2 Executed',
      rows: [
        { label: 'Trade 2', value: 'Buy Day 3 ($0) -> Sell Day 4 ($2) = +$2', accent: true },
        { label: 'Grand Total', value: 'Trade 1 ($1) + Trade 2 ($2) = $3' }
      ]
    }
  },
  {
    phase: 'EVALUATE',
    prices: [1, 2, 3, 0, 2],
    currentDay: 4,
    trades: [
      { buy: 0, sell: 1, net: 1 },
      { buy: 3, sell: 4, net: 2 }
    ],
    dpState: { holdProfit: 1, notHoldProfit: 3, cooldownProfit: 2 },
    formula: 'Comparison: Strategy A (3 trades with cooldown) vs Single Trade ($2)',
    action: 'Compare strategy with and without cooldown foresight.',
    explain: 'Greedy single-trade holding from Day 0 ($1) to Day 2 ($3) makes only $2 profit. The 3-state DP realizes that selling on Day 1 enables purchasing the deep $0 dip on Day 3, securing 50% more profit ($3 total).',
    intuition: 'Dynamic programming balances immediate gain with future opportunity costs.',
    metrics: [
      { label: 'Greedy Profit', value: '$2' },
      { label: 'DP Optimal Profit', value: '$3', highlight: true },
      { label: 'Gain', value: '+50%' }
    ]
  },
  {
    phase: 'COMPLETED',
    prices: [1, 2, 3, 0, 2],
    currentDay: null,
    trades: [
      { buy: 0, sell: 1, net: 1 },
      { buy: 3, sell: 4, net: 2 }
    ],
    dpState: { holdProfit: 1, notHoldProfit: 3, cooldownProfit: 2 },
    formula: 'Result: max(sold, rest) = max(3, 2) = $3',
    action: 'Algorithm completed in O(N) time and O(1) auxiliary space.',
    explain: 'Optimal trade schedule: Buy D0 ($1) -> Sell D1 ($2) [+1] -> Cooldown D2 -> Buy D3 ($0) -> Sell D4 ($2) [+2]. Total profit is $3.',
    intuition: 'Three-variable state machine provides optimal O(N) solution with zero array allocations.',
    metrics: [
      { label: 'Final Max Profit', value: '$3', highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    customCard: {
      title: 'Full Schedule Breakdown',
      rows: [
        { label: 'Day 0: BUY ($1)', value: 'Capital invested: -$1' },
        { label: 'Day 1: SELL ($2)', value: 'Bank +$1 profit' },
        { label: 'Day 2: COOLDOWN', value: 'Mandatory rest day (rest = $1)' },
        { label: 'Day 3: BUY ($0)', value: 'Enter at bottom (net equity = +$1)' },
        { label: 'Day 4: SELL ($2)', value: 'Bank +$2 profit -> Total = $3' }
      ]
    }
  }
];

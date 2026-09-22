// DATA-ONLY — rendered by StockTradingRenderer via rendererType

export const meta = {
  title: 'Best Time to Buy and Sell Stock (1 Transaction)',
  category: 'Dynamic Programming',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the maximum profit from buying and selling a stock once. Maintains the minimum buy price seen so far in a single pass to maximize profit = prices[i] - minPrice.'
};

export const rendererType = 'stock-trading';

export const ideaMap = {
  title: 'Best Time to Buy and Sell Stock (1 Transaction)',
  nodes: [
    { id: 'root', label: 'Stock I (1 Trade)', children: ['min-tracking', 'profit-formula', 'complexity'] },
    { id: 'min-tracking', label: '1. Prefix Minimum', detail: 'minPrice = min(minPrice, prices[i]) tracks cheapest buy day seen so far' },
    { id: 'profit-formula', label: '2. Profit Optimization', detail: 'maxProfit = max(maxProfit, prices[i] - minPrice) checks selling today vs previous best' },
    { id: 'complexity', label: '3. Optimal Complexity', detail: 'Single forward pass solves the problem in O(N) time and O(1) auxiliary space' }
  ]
};

export const solutions = {
  cpp: `// C++ Best Time to Buy and Sell Stock
// Time: O(N) | Space: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = 1e9;
        int maxProfit = 0;

        for (int price : prices) {
            minPrice = min(minPrice, price);
            maxProfit = max(maxProfit, price - minPrice);
        }

        return maxProfit;
    }
};`,
  python: `# Python 3 Best Time to Buy and Sell Stock
# Time: O(N) | Space: O(1)
class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        min_price = float('inf')
        max_profit = 0

        for price in prices:
            min_price = min(min_price, price)
            max_profit = max(max_profit, price - min_price)

        return max_profit`,
  java: `// Java Best Time to Buy and Sell Stock
// Time: O(N) | Space: O(1)
class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;

        for (int price : prices) {
            minPrice = Math.min(minPrice, price);
            maxProfit = Math.max(maxProfit, price - minPrice);
        }

        return maxProfit;
    }
}`,
  javascript: `// JavaScript Best Time to Buy and Sell Stock
// Time: O(N) | Space: O(1)
var maxProfit = function(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;

    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }

    return maxProfit;
};`
};

export const steps = [
  {
    phase: 'SETUP',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: null,
    trades: [],
    dpState: { holdProfit: -7, notHoldProfit: 0 },
    formula: 'Constraint: At most 1 transaction | minPrice = infinity, maxProfit = 0',
    action: 'Initialize prefix minimum price tracker and maxProfit accumulator.',
    explain: 'To maximize prices[sell] - prices[buy] where buy < sell, we only need to track the lowest price observed before the current day: minPrice = min(minPrice, prices[i]).',
    intuition: 'At any day i, the best possible day to have bought in the past was when price hit its absolute minimum.',
    metrics: [
      { label: 'Max Profit', value: '$0', highlight: true },
      { label: 'Allowed Trades', value: '1' },
      { label: 'Status', value: 'Ready' }
    ],
    customCard: {
      title: 'Greedy Prefix Invariant',
      rows: [
        { label: 'Running Minimum', value: 'minPrice = min(minPrice, price)' },
        { label: 'Profit Evaluation', value: 'profit = price - minPrice' }
      ]
    }
  },
  {
    phase: 'SCAN',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 0,
    trades: [],
    dpState: { holdProfit: -7, notHoldProfit: 0 },
    formula: 'Day 0 ($7): minPrice = 7 | profit = 7 - 7 = $0',
    action: 'Day 0 (Price $7): Set initial minPrice = $7.',
    explain: 'On Day 0, price is $7. minPrice is updated to $7. Selling on the same day gives $0 profit.',
    intuition: 'Initial price establishes the benchmark.',
    metrics: [
      { label: 'Current Day', value: 'Day 0' },
      { label: 'Price', value: '$7' },
      { label: 'minPrice', value: '$7' }
    ]
  },
  {
    phase: 'BUY',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 1,
    trades: [],
    dpState: { holdProfit: -1, notHoldProfit: 0 },
    formula: 'Day 1 ($1): 1 < 7 => New minPrice = $1! Best buy day updated to Day 1.',
    action: 'Day 1 (Price $1): Price plunges! Update minPrice = $1.',
    explain: 'Price dropped from $7 to $1. Since $1 < $7, minPrice updates to $1. Any future sell will be compared against this new rock-bottom buy price.',
    intuition: 'Buying at $1 maximizes all future selling margins.',
    metrics: [
      { label: 'Current Day', value: 'Day 1' },
      { label: 'Price', value: '$1' },
      { label: 'minPrice', value: '$1 (New Minimum)', highlight: true }
    ],
    customCard: {
      title: 'Optimal Buy Anchor Found',
      rows: [
        { label: 'New Buy Anchor', value: 'Day 1 at $1 (replaces Day 0 at $7)', accent: true },
        { label: 'Future Upside', value: 'Every subsequent dollar gained will count as pure profit' }
      ]
    }
  },
  {
    phase: 'TRADE',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 2,
    trades: [{ buy: 1, sell: 2, net: 4 }],
    dpState: { holdProfit: -1, notHoldProfit: 4 },
    formula: 'Day 2 ($5): profit = 5 - 1 = $4 => maxProfit = max(0, 4) = $4',
    action: 'Day 2 (Price $5): Surge to $5! Potential profit = $5 - $1 = $4.',
    explain: 'Selling at $5 yields $5 - $1 = $4 profit. Since $4 > $0, maxProfit updates to $4. Best candidate trade: Buy Day 1 ($1) -> Sell Day 2 ($5).',
    intuition: 'First profitable exit window.',
    metrics: [
      { label: 'Current Profit', value: '$4', highlight: true },
      { label: 'Sell Price', value: '$5' },
      { label: 'Buy Price', value: '$1' }
    ],
    customCard: {
      title: 'First Profitable Candidate',
      rows: [
        { label: 'Candidate Trade', value: 'Buy D1 ($1) -> Sell D2 ($5)', accent: true },
        { label: 'Net Gain', value: '+$4' }
      ]
    }
  },
  {
    phase: 'SCAN',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 3,
    trades: [{ buy: 1, sell: 2, net: 4 }],
    dpState: { holdProfit: -1, notHoldProfit: 4 },
    formula: 'Day 3 ($3): profit = 3 - 1 = $2 < 4 => maxProfit remains $4',
    action: 'Day 3 (Price $3): Pullback to $3; selling today gives only $2 profit.',
    explain: 'Selling at $3 produces $3 - $1 = $2, which is less than our existing $4 benchmark. maxProfit stays at $4. minPrice remains $1.',
    intuition: 'Do not settle for smaller gains when a larger profit is already recorded.',
    metrics: [
      { label: 'Current Day', value: 'Day 3' },
      { label: 'Price', value: '$3' },
      { label: 'maxProfit', value: '$4' }
    ]
  },
  {
    phase: 'TRADE',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 4,
    trades: [{ buy: 1, sell: 4, net: 5 }],
    dpState: { holdProfit: -1, notHoldProfit: 5 },
    formula: 'Day 4 ($6): profit = 6 - 1 = $5 > 4 => Global Max Profit = $5!',
    action: 'Day 4 (Price $6): Peak price reached! Update maxProfit = $5.',
    explain: 'Price peaks at $6. Selling today yields $6 - $1 = $5. Since $5 > $4, maxProfit updates to $5! Optimal trade: Buy Day 1 ($1) and sell Day 4 ($6).',
    intuition: 'Global peak across the entire timeline.',
    metrics: [
      { label: 'Max Profit', value: '$5', highlight: true },
      { label: 'Best Buy Day', value: 'Day 1 ($1)' },
      { label: 'Best Sell Day', value: 'Day 4 ($6)' }
    ],
    customCard: {
      title: 'Global Optimum Found',
      rows: [
        { label: 'Optimal Transaction', value: 'Buy Day 1 ($1) -> Sell Day 4 ($6)', accent: true },
        { label: 'Maximum Spread', value: '$6 - $1 = $5' }
      ]
    }
  },
  {
    phase: 'SCAN',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 5,
    trades: [{ buy: 1, sell: 4, net: 5 }],
    dpState: { holdProfit: -1, notHoldProfit: 5 },
    formula: 'Day 5 ($4): profit = 4 - 1 = $3 < 5 => maxProfit remains $5',
    action: 'Day 5 (Price $4): Price drops on final day; maxProfit remains $5.',
    explain: 'Final day price of $4 yields $4 - $1 = $3 < $5. Scanning ends.',
    intuition: 'The peak on Day 4 remains unchallenged.',
    metrics: [
      { label: 'Current Day', value: 'Day 5' },
      { label: 'Price', value: '$4' },
      { label: 'Final Profit', value: '$5' }
    ]
  },
  {
    phase: 'COMPLETED',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: null,
    trades: [{ buy: 1, sell: 4, net: 5 }],
    dpState: { holdProfit: -1, notHoldProfit: 5 },
    formula: 'Result: maxProfit = $6 - $1 = $5',
    action: 'Algorithm completed in O(N) time and O(1) space.',
    explain: 'By tracking the prefix minimum price in a single pass, we compute the maximum possible single-transaction profit ($5) in linear time without nested loops.',
    intuition: 'Prefix minimum tracking solves the maximum single spread in optimal O(N) time.',
    metrics: [
      { label: 'Maximum Profit', value: '$5', highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    customCard: {
      title: 'Trade Confirmation',
      rows: [
        { label: 'Buy Execution', value: 'Day 1 at $1', accent: true },
        { label: 'Sell Execution', value: 'Day 4 at $6', accent: true }
      ]
    }
  }
];

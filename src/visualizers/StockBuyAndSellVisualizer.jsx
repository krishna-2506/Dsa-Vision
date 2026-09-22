// DATA-ONLY — rendered by StockTradingRenderer via rendererType

export const meta = {
  title: 'Stock Buy and Sell (Best Time to Buy and Sell Stock)',
  category: 'Arrays & Greedy',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the maximum profit from buying and selling a stock once. Keeps track of the minimum purchase price seen so far and computes potential profit at each subsequent day in a single linear pass.'
};

export const rendererType = 'stock-trading';

export const ideaMap = {
  title: 'Single-Pass Greedy Strategy',
  nodes: [
    { id: 'root', label: 'Greedy Stock Invariant', children: ['temporal-constraint', 'min-price-tracker', 'profit-maximization', 'single-pass'] },
    { id: 'temporal-constraint', label: '1. Causality Invariant', detail: 'You cannot sell a stock before you buy it; buyDay <= sellDay must strictly hold' },
    { id: 'min-price-tracker', label: '2. Running Minimum Price', detail: 'Track minPrice = min(minPrice, prices[i]) as the best historical buying opportunity' },
    { id: 'profit-maximization', label: '3. Daily Potential Profit', detail: 'At day i, potential profit is prices[i] - minPrice; update maxProfit = max(maxProfit, profit)' },
    { id: 'single-pass', label: '4. Optimal O(N) Time', detail: 'Evaluates all valid buying/selling pairs in one pass with O(1) space' }
  ]
};

export const solutions = {
  cpp: `// C++ Best Time to Buy and Sell Stock (Single Pass)
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX;
        int maxProfit = 0;

        for (int i = 0; i < prices.size(); i++) {
            minPrice = min(minPrice, prices[i]);
            int profit = prices[i] - minPrice;
            maxProfit = max(maxProfit, profit);
        }

        return maxProfit;
    }
};`,
  python: `# Python 3 Stock Buy and Sell
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        min_price = float('inf')
        max_profit = 0
        
        for price in prices:
            min_price = min(min_price, price)
            profit = price - min_price
            max_profit = max(max_profit, profit)
            
        return max_profit`,
  java: `// Java Stock Buy and Sell
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;

        for (int i = 0; i < prices.length; i++) {
            if (prices[i] < minPrice) {
                minPrice = prices[i];
            } else if (prices[i] - minPrice > maxProfit) {
                maxProfit = prices[i] - minPrice;
            }
        }
        return maxProfit;
    }
}`,
  javascript: `// JavaScript Stock Buy and Sell
// Time Complexity: O(N) | Space Complexity: O(1)
var maxProfit = function(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;

    for (let i = 0; i < prices.length; i++) {
        minPrice = Math.min(minPrice, prices[i]);
        maxProfit = Math.max(maxProfit, prices[i] - minPrice);
    }
    return maxProfit;
};`
};

export const steps = [
  {
    title: '1. Day 0: Price = 7 (Initial Buy Candidate)',
    phase: 'INITIALIZATION',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 0,
    buyDay: 0,
    sellDay: null,
    minPrice: 7,
    maxProfit: 0,
    currentProfit: 0,
    metrics: [
      { label: 'Day', value: '0' },
      { label: 'Price', value: '$7' },
      { label: 'Lowest Seen', value: '$7' },
      { label: 'Max Profit', value: '$0' }
    ],
    formula: 'minPrice = min(∞, 7) = 7; profit = 7 - 7 = 0',
    action: 'Initialize with Day 0 price = 7. Lowest purchase price seen so far is $7',
    explain: 'At Day 0, the only price available is $7. We record minPrice = 7. Selling today yields $0 profit.',
    intuition: 'We must start somewhere; the earliest price is our default buying baseline.'
  },
  {
    title: '2. Day 1: Price Plunges to 1 (New Minimum Buy Price)',
    phase: 'PRICE_DROP',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 1,
    buyDay: 1,
    sellDay: null,
    minPrice: 1,
    maxProfit: 0,
    currentProfit: 0,
    metrics: [
      { label: 'Day', value: '1' },
      { label: 'Price', value: '$1 (Plunge)', highlight: true },
      { label: 'Lowest Seen', value: '$1 (New Anchor)' },
      { label: 'Max Profit', value: '$0' }
    ],
    formula: 'minPrice = min(7, 1) = 1; profit = 1 - 1 = 0',
    action: 'Price drops to $1 < $7. Update lowest buy anchor to Day 1 at price $1',
    explain: 'Day 1 offers a much cheaper entry point ($1). Buying here guarantees higher future profits on any subsequent upswing.',
    intuition: 'Resetting the purchase anchor to 1 is strictly superior to buying at 7 for all future days.'
  },
  {
    title: '3. Day 2: Price Rebounds to 5 (Potential Profit = $4)',
    phase: 'PROFIT_EVAL',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 2,
    buyDay: 1,
    sellDay: 2,
    minPrice: 1,
    maxProfit: 4,
    currentProfit: 4,
    metrics: [
      { label: 'Day', value: '2' },
      { label: 'Price', value: '$5' },
      { label: 'Buy Price', value: '$1 (Day 1)' },
      { label: 'Max Profit', value: '$4', highlight: true }
    ],
    formula: 'profit = 5 - 1 = 4; maxProfit = max(0, 4) = 4',
    action: 'Selling at $5 yields profit $5 - $1 = $4. Update maxProfit to $4',
    explain: 'If we bought on Day 1 at $1 and sold today at $5, we secure a profit of $4. This beats our previous maximum of $0.',
    intuition: 'Profit is locked in as a benchmark to beat.'
  },
  {
    title: '4. Day 3: Price Dips to 3 (Profit = $2 < $4)',
    phase: 'PROFIT_EVAL',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 3,
    buyDay: 1,
    sellDay: 2,
    minPrice: 1,
    maxProfit: 4,
    currentProfit: 2,
    metrics: [
      { label: 'Day', value: '3' },
      { label: 'Price', value: '$3' },
      { label: 'Today\'s Profit', value: '$3 - $1 = $2' },
      { label: 'Max Profit', value: '$4 (Retained)' }
    ],
    formula: 'profit = 3 - 1 = 2 < 4 ==> maxProfit remains 4',
    action: 'Selling at $3 yields $2 profit, which is worse than $4. Keep maxProfit at $4',
    explain: 'Price pulled back to $3. Profit today ($2) is lower than our peak ($4), but $3 is not lower than our lowest anchor ($1), so minPrice stays $1.',
    intuition: 'Neither a new buying opportunity nor a new high profit.'
  },
  {
    title: '5. Day 4: Price Surges to 6 (New Peak Profit = $5!)',
    phase: 'PEAK_PROFIT',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 4,
    buyDay: 1,
    sellDay: 4,
    minPrice: 1,
    maxProfit: 5,
    currentProfit: 5,
    metrics: [
      { label: 'Day', value: '4' },
      { label: 'Price', value: '$6 (Surge)', highlight: true },
      { label: 'Today\'s Profit', value: '$6 - $1 = $5' },
      { label: 'New Max Profit', value: '$5', highlight: true }
    ],
    formula: 'profit = 6 - 1 = 5; maxProfit = max(4, 5) = 5',
    action: 'Price hits $6! Selling today yields $6 - $1 = $5. Update maxProfit to $5',
    explain: 'Buying at the minimum ($1 on Day 1) and selling at today\'s peak ($6 on Day 4) generates our highest profit yet: $5.',
    intuition: 'Maximum price spread achieved between Day 1 and Day 4.'
  },
  {
    title: '6. Day 5: Price Pulls Back to 4 (Profit = $3 < $5)',
    phase: 'PROFIT_EVAL',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 5,
    buyDay: 1,
    sellDay: 4,
    minPrice: 1,
    maxProfit: 5,
    currentProfit: 3,
    metrics: [
      { label: 'Day', value: '5 (Final)' },
      { label: 'Price', value: '$4' },
      { label: 'Today\'s Profit', value: '$4 - $1 = $3' },
      { label: 'Max Profit', value: '$5 (Retained)' }
    ],
    formula: 'profit = 4 - 1 = 3 < 5 ==> maxProfit remains 5',
    action: 'Day 5 price is $4. Profit is $3 < $5. Retain maximum profit of $5',
    explain: 'The final trading day yields a profit of $3, which does not exceed our best profit of $5.',
    intuition: 'Final inspection step complete.'
  },
  {
    title: '7. Strategy Summary: Buy on Day 1 ($1) and Sell on Day 4 ($6)',
    phase: 'SUMMARY',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 4,
    buyDay: 1,
    sellDay: 4,
    minPrice: 1,
    maxProfit: 5,
    currentProfit: 5,
    metrics: [
      { label: 'Optimal Buy', value: 'Day 1 ($1)' },
      { label: 'Optimal Sell', value: 'Day 4 ($6)' },
      { label: 'Net Gain', value: '+$5', highlight: true }
    ],
    formula: 'Max Profit = prices[4] - prices[1] = 6 - 1 = 5',
    action: 'Confirmed optimal transaction pair: Buy at Day 1, Sell at Day 4',
    explain: 'Buying on Day 1 at price 1 and selling on Day 4 at price 6 satisfies the temporal ordering constraint (buyDay 1 < sellDay 4) and yields the global maximum profit 5.',
    intuition: 'Greedy single-pass evaluation is guaranteed to discover the maximum spread.'
  },
  {
    title: '8. Completed: O(N) Time & O(1) Space Invariant Verified',
    phase: 'COMPLETED',
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 4,
    buyDay: 1,
    sellDay: 4,
    minPrice: 1,
    maxProfit: 5,
    currentProfit: 5,
    metrics: [
      { label: 'Maximum Profit', value: '$5', highlight: true },
      { label: 'Time Complexity', value: 'O(N) Single Pass' },
      { label: 'Space Complexity', value: 'O(1) In-Place' }
    ],
    formula: 'Return maxProfit = 5; Time = O(N), Space = O(1)',
    action: 'Algorithm complete. Optimal profit of $5 returned.',
    explain: 'By tracking the lowest price seen so far, the algorithm finds the maximum profit in a single pass of N elements without examining all O(N^2) pairs.',
    intuition: 'Linear greedy tracking replaces quadratic brute-force pair comparisons.'
  }
];

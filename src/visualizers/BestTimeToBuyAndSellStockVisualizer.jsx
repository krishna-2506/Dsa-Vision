import React from 'react';

export const meta = {
  title: 'Best Time to Buy and Sell Stock (1 Transaction)',
  category: 'Dynamic Programming',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the maximum profit from buying and selling a stock once. Dynamic programming state maintains the minimum buy price seen so far to maximize profit = prices[i] - minPrice.'
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
    title: '1. Prices: [7, 1, 5, 3, 6, 4], Day 0 (Price = 7)',
    phase: 'INITIAL',
    codeLine: 12,
    prices: [7, 1, 5, 3, 6, 4],
    activeDay: 0,
    minPrice: 7,
    maxProfit: 0,
    buyDay: 0,
    sellDay: 0,
    variables: { day: 0, price: 7, minPrice: 7, profit: 0, maxProfit: 0 },
    explain: 'Starting on Day 0: Price is 7. minPrice initialized to 7. Profit = 7 - 7 = 0.',
    intuition: 'At any point in time, buying at the lowest historical price yields the optimal potential profit.'
  },
  {
    title: '2. Day 1 (Price = 1): New Minimum Buy Price Found!',
    phase: 'NEW_MIN',
    codeLine: 16,
    prices: [7, 1, 5, 3, 6, 4],
    activeDay: 1,
    minPrice: 1,
    maxProfit: 0,
    buyDay: 1,
    sellDay: 1,
    variables: { day: 1, price: 1, minPrice: 1, profit: 0, maxProfit: 0 },
    explain: 'Price drops to 1! Update minPrice = min(7, 1) = 1. Best day to buy updated to Day 1.',
    intuition: 'Buying at 1 maximizes all downstream selling margins.'
  },
  {
    title: '3. Day 2 (Price = 5): Selling Yields Profit = 5 - 1 = 4',
    phase: 'PROFIT',
    codeLine: 17,
    prices: [7, 1, 5, 3, 6, 4],
    activeDay: 2,
    minPrice: 1,
    maxProfit: 4,
    buyDay: 1,
    sellDay: 2,
    variables: { day: 2, price: 5, minPrice: 1, profit: 4, maxProfit: 4 },
    explain: 'Price rises to 5: Selling here gives profit 5 - 1 = 4. Update maxProfit = 4.',
    intuition: 'Locked in positive gain.'
  },
  {
    title: '4. Day 4 (Price = 6): Peak Sell Day! Profit = 6 - 1 = 5 (Max Profit)',
    phase: 'COMPLETED',
    codeLine: 17,
    prices: [7, 1, 5, 3, 6, 4],
    activeDay: 4,
    minPrice: 1,
    maxProfit: 5,
    buyDay: 1,
    sellDay: 4,
    variables: { buyDay: 'Day 1 ($1)', sellDay: 'Day 4 ($6)', maxProfit: 5 },
    explain: 'Price peaks at 6 on Day 4: Profit = 6 - 1 = 5. Day 5 price drops to 4. Global max profit is 5!',
    intuition: 'Single pass linear scan solves the optimal transaction in O(N) time and O(1) space.'
  }
];

export default function BestTimeToBuyAndSellStockVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Min Buy Price: ${step.minPrice} (Day {step.buyDay})
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Profit: ${step.maxProfit}
        </span>
      </div>

      {/* Stock Timeline Card */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Stock Price Chart & Transaction Interval
        </span>

        <div className="w-full flex items-end justify-around gap-2 h-44 pt-4 px-2">
          {step.prices.map((p, idx) => {
            const isCurrent = idx === step.activeDay;
            const isBuy = idx === step.buyDay;
            const isSell = idx === step.sellDay && step.maxProfit > 0;
            const heightPx = p * 18;

            return (
              <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="text-[10px] font-mono mb-1 font-bold text-amber-300">
                  ${p}
                </div>

                <div
                  style={{ height: `${heightPx}px` }}
                  className={`w-full max-w-[48px] rounded-t-xl border-t border-x flex flex-col items-center justify-between p-1 font-mono transition-all duration-300 ${
                    isBuy
                      ? 'border-emerald-500 bg-emerald-500/30 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg'
                      : isSell
                      ? 'border-amber-500 bg-amber-500/30 text-amber-300 ring-2 ring-amber-500/40 shadow-lg'
                      : isCurrent
                      ? 'border-blue-500/50 bg-blue-500/20 text-blue-300'
                      : 'border-[#272b3c] bg-[#161824] text-slate-500'
                  }`}
                >
                  <span className="text-[8px] font-bold">
                    {isBuy ? 'BUY' : isSell ? 'SELL' : ''}
                  </span>
                </div>

                <span className="text-[9px] font-mono text-[#8a8ea3] mt-1.5">
                  D{idx}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

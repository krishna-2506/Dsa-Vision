import React from 'react';

export const meta = {
  title: 'Stock Buy and Sell',
  category: 'Arrays & Greedy',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the maximum profit from buying and selling a stock once. Keeps track of the minimum purchase price so far and computes potential profit at each subsequent day.'
};

export const solutions = {
  cpp: `// C++ Best Time to Buy and Sell Stock (Single Pass)
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
#include <climits>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX;
        int maxProfit = 0;

        for (int i = 0; i < prices.size(); i++) {
            // Keep record of lowest purchase price seen to date
            minPrice = min(minPrice, prices[i]);

            // Calculate profit if sold today
            int profit = prices[i] - minPrice;

            // Update maximum profit achieved
            maxProfit = max(maxProfit, profit);
        }

        return maxProfit;
    }
};`,
  python: `# Python 3 Stock Buy and Sell
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
    title: '1. Day 0: Price = 7 (Initial Min Price)',
    phase: 'INITIALIZATION',
    codeLine: 12,
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 0,
    buyDay: 0,
    sellDay: null,
    minPrice: 7,
    maxProfit: 0,
    currentProfit: 0,
    variables: { day: 0, price: 7, minPrice: 7, maxProfit: 0 },
    explain: 'Initialize with Day 0 price = 7. Minimum price so far = 7. Profit = 7 - 7 = 0.',
    intuition: 'Cannot sell before buying, so we track lowest entry price as we iterate forward in time.'
  },
  {
    title: '2. Day 1: Price Plunges to 1 (New Minimum)',
    phase: 'MINIMUM_UPDATE',
    codeLine: 13,
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 1,
    buyDay: 1,
    sellDay: null,
    minPrice: 1,
    maxProfit: 0,
    currentProfit: 0,
    variables: { day: 1, price: 1, minPrice: 1, maxProfit: 0, updated: 'New Buy Target = 1' },
    explain: 'Price drops to 1! Since 1 < 7, update minPrice = 1. Day 1 is our new prospective buy day.',
    intuition: 'Buying at 1 guarantees strictly higher potential profits on any future day than buying at 7.'
  },
  {
    title: '3. Day 2: Price Rises to 5 (Profit = 4)',
    phase: 'PROFIT_RECORDED',
    codeLine: 16,
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 2,
    buyDay: 1,
    sellDay: 2,
    minPrice: 1,
    maxProfit: 4,
    currentProfit: 4,
    variables: { day: 2, price: 5, minPrice: 1, profit: 4, maxProfit: 4 },
    explain: 'Price reaches 5. If bought on Day 1 (1) and sold today (5), profit = 5 - 1 = 4. maxProfit updates to 4.',
    intuition: 'Compare current price against the lowest historical purchase price.'
  },
  {
    title: '4. Day 3: Price Dips to 3 (Profit = 2)',
    phase: 'HOLDING',
    codeLine: 16,
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 3,
    buyDay: 1,
    sellDay: 2,
    minPrice: 1,
    maxProfit: 4,
    currentProfit: 2,
    variables: { day: 3, price: 3, minPrice: 1, profit: 2, maxProfit: 4 },
    explain: 'Price is 3. Profit = 3 - 1 = 2, which is less than our record profit of 4. maxProfit stays 4.',
    intuition: 'We keep our historical high-water mark.'
  },
  {
    title: '5. Day 4: Price Surges to 6 (Peak Profit = 5)',
    phase: 'PEAK_PROFIT',
    codeLine: 19,
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 4,
    buyDay: 1,
    sellDay: 4,
    minPrice: 1,
    maxProfit: 5,
    currentProfit: 5,
    variables: { day: 4, price: 6, minPrice: 1, profit: 5, maxProfit: 5, trade: 'Buy Day 1 (1) -> Sell Day 4 (6)' },
    explain: 'Price hits 6! Profit = 6 - 1 = 5. New highest profit recorded: maxProfit = 5.',
    intuition: 'Optimal trade window discovered: buy at lowest trough (1) and sell at highest subsequent peak (6).'
  },
  {
    title: '6. Day 5: Price is 4. Algorithm Finished',
    phase: 'COMPLETED',
    codeLine: 22,
    prices: [7, 1, 5, 3, 6, 4],
    currentDay: 5,
    buyDay: 1,
    sellDay: 4,
    minPrice: 1,
    maxProfit: 5,
    currentProfit: 3,
    variables: { finalMaxProfit: 5, optimalBuy: 1, optimalSell: 6 },
    explain: 'All days evaluated in single pass. Maximum profit achievable is 5 (Buy at 1, Sell at 6).',
    intuition: 'Achieves O(N) linear time and O(1) space, dramatically outperforming brute force O(N²).'
  }
];

export default function StockBuyAndSellVisualizer({ currentStep = 0, onStepChange }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];
  const maxPrice = Math.max(...step.prices);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* HUD Telemetry */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-center min-w-[120px]">
          <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold block">Min Buy Price</span>
          <span className="text-xl font-mono font-bold text-emerald-300">₹{step.minPrice}</span>
        </div>

        <div className="px-5 py-2 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-center min-w-[130px]">
          <span className="text-[10px] font-mono text-indigo-400 uppercase font-semibold block">Max Profit</span>
          <span className="text-xl font-mono font-bold text-white">+₹{step.maxProfit}</span>
        </div>

        <div className="px-4 py-2 rounded-xl bg-[#14151b] border border-[#232530] text-center min-w-[120px]">
          <span className="text-[10px] font-mono text-[#8e92a4] uppercase block">Today's Profit</span>
          <span className="text-xl font-mono font-bold text-[#c5c8d6]">₹{step.currentProfit}</span>
        </div>
      </div>

      {/* Stock Candlestick / Bar Chart */}
      <div className="w-full flex items-end justify-center gap-3 h-52 bg-[#0c0d12] p-4 rounded-2xl border border-[#20222a]">
        {step.prices.map((price, idx) => {
          const isCurrent = step.currentDay === idx;
          const isBuy = step.buyDay === idx;
          const isSell = step.sellDay === idx;
          const heightPct = Math.round((price / maxPrice) * 80) + 20;

          let barColor = 'bg-[#1c1e28] border-[#2c2f3d] text-[#8e92a4]';
          if (isBuy) barColor = 'bg-emerald-500/25 border-emerald-500 text-emerald-300 scale-105 shadow-lg shadow-emerald-500/25';
          else if (isSell) barColor = 'bg-indigo-500/30 border-indigo-500 text-indigo-300 scale-105 shadow-lg shadow-indigo-500/25';
          else if (isCurrent) barColor = 'bg-amber-500/25 border-amber-500 text-amber-300';

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 flex-1 max-w-[64px]">
              <span className="text-[11px] font-mono font-bold text-white">₹{price}</span>
              <div
                style={{ height: `${heightPct}%` }}
                className={`w-full rounded-xl border transition-all duration-300 flex items-center justify-center font-mono text-xs font-semibold ${barColor}`}
              >
                {isBuy && <span className="text-[9px] font-bold">BUY</span>}
                {isSell && !isBuy && <span className="text-[9px] font-bold">SELL</span>}
              </div>
              <span className="text-[10px] font-mono text-[#5b5e6e]">Day {idx}</span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-[#8e92a4]">Best Buy Point</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
          <span className="text-[#8e92a4]">Best Sell Point</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="text-[#8e92a4]">Today's Inspection</span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Best Time to Buy and Sell Stock II (Infinite Transactions)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Space-Optimized',
  description: 'Calculates maximum profit when any number of buy/sell transactions are allowed (holding at most 1 stock at a time). Solved with 2-state DP: Buy state and Sell state.'
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
        int n = prices.size();
        int aheadNotBuy = 0, aheadBuy = 0;
        int curNotBuy, curBuy;

        for (int i = n - 1; i >= 0; i--) {
            curBuy = max(-prices[i] + aheadNotBuy, 0 + aheadBuy);
            curNotBuy = max(prices[i] + aheadBuy, 0 + aheadNotBuy);

            aheadBuy = curBuy;
            aheadNotBuy = curNotBuy;
        }

        return aheadBuy;
    }
};`,
  python: `# Python 3 Best Time to Buy and Sell Stock II
# Time: O(N) | Space: O(1)
class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        ahead_not_buy = 0
        ahead_buy = 0

        for price in reversed(prices):
            cur_buy = max(-price + ahead_not_buy, ahead_buy)
            cur_not_buy = max(price + ahead_buy, ahead_not_buy)

            ahead_buy = cur_buy
            ahead_not_buy = cur_not_buy

        return ahead_buy`,
  java: `// Java Best Time to Buy and Sell Stock II
// Time: O(N) | Space: O(1)
class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        int aheadNotBuy = 0, aheadBuy = 0;

        for (int i = n - 1; i >= 0; i--) {
            int curBuy = Math.max(-prices[i] + aheadNotBuy, aheadBuy);
            int curNotBuy = Math.max(prices[i] + aheadBuy, aheadNotBuy);

            aheadBuy = curBuy;
            aheadNotBuy = curNotBuy;
        }

        return aheadBuy;
    }
}`,
  javascript: `// JavaScript Best Time to Buy and Sell Stock II
// Time: O(N) | Space: O(1)
var maxProfit = function(prices) {
    let aheadNotBuy = 0, aheadBuy = 0;

    for (let i = prices.length - 1; i >= 0; i--) {
        const curBuy = Math.max(-prices[i] + aheadNotBuy, aheadBuy);
        const curNotBuy = Math.max(prices[i] + aheadBuy, aheadNotBuy);

        aheadBuy = curBuy;
        aheadNotBuy = curNotBuy;
    }

    return aheadBuy;
};`
};

export const steps = [
  {
    title: '1. Prices: [7, 1, 5, 3, 6, 4], Infinite Trades Allowed',
    phase: 'INITIAL',
    codeLine: 12,
    prices: [7, 1, 5, 3, 6, 4],
    tradePoints: [],
    accumulatedProfit: 0,
    variables: { prices: '[7, 1, 5, 3, 6, 4]', rules: 'Can buy and sell multiple times' },
    explain: 'Whenever prices increase day-over-day (prices[i] > prices[i-1]), we can capture the positive slope gain.',
    intuition: 'Every upward price curve contributes to the maximum cumulative profit.'
  },
  {
    title: '2. Trade 1: Buy Day 1 ($1) and Sell Day 2 ($5) -> +$4 Profit',
    phase: 'TRADE_1',
    codeLine: 16,
    prices: [7, 1, 5, 3, 6, 4],
    tradePoints: [{ buy: 1, sell: 2, profit: 4 }],
    accumulatedProfit: 4,
    variables: { buy: 'Day 1 ($1)', sell: 'Day 2 ($5)', profit: 4 },
    explain: 'Buying at 1 and selling at 5 locks in 4 profit.',
    intuition: 'First upward curve captured.'
  },
  {
    title: '3. Price Dip: Day 3 drops to $3 (Wait / Reset Buy Position)',
    phase: 'DIP',
    codeLine: 16,
    prices: [7, 1, 5, 3, 6, 4],
    tradePoints: [{ buy: 1, sell: 2, profit: 4 }],
    accumulatedProfit: 4,
    variables: { dipDay: 'Day 3 ($3)', status: 'Re-entry opportunity' },
    explain: 'Price dips to 3 on Day 3. Because we sold on Day 2, we avoid the decline and can buy again at 3.',
    intuition: 'Avoid holding through price downturns.'
  },
  {
    title: '4. Trade 2: Buy Day 3 ($3) and Sell Day 4 ($6) -> Total Profit = $7',
    phase: 'COMPLETED',
    codeLine: 21,
    prices: [7, 1, 5, 3, 6, 4],
    tradePoints: [
      { buy: 1, sell: 2, profit: 4 },
      { buy: 3, sell: 4, profit: 3 }
    ],
    accumulatedProfit: 7,
    variables: { trade1: '+$4', trade2: '+$3', totalProfit: 7 },
    explain: 'Buying at 3 and selling at 6 earns an additional 3. Total profit = 4 + 3 = 7!',
    intuition: 'Infinite transaction DP aggregates every ascending segment in O(N) time and O(1) space.'
  }
];

export default function BestTimeToBuyAndSellStockIiVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Completed Trades: {step.tradePoints.length}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Total Profit: ${step.accumulatedProfit}
        </span>
      </div>

      {/* Stock Graph Visualizer */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Multi-Transaction Capture
        </span>

        <div className="w-full flex items-end justify-around gap-2 h-44 pt-4 px-2">
          {step.prices.map((p, idx) => {
            const heightPx = p * 18;
            const isBuy = step.tradePoints.some(t => t.buy === idx);
            const isSell = step.tradePoints.some(t => t.sell === idx);

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

        {/* Executed Trades Card */}
        {step.tradePoints.length > 0 && (
          <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 flex flex-wrap items-center justify-around gap-3 text-xs font-mono">
            {step.tradePoints.map((t, tidx) => (
              <span key={tidx} className="px-2.5 py-1 rounded bg-[#12131b] border border-emerald-500/30 text-emerald-300">
                Trade {tidx + 1}: Day {t.buy} ($) ➔ Day {t.sell} ($) = <strong className="text-amber-300">+${t.profit}</strong>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

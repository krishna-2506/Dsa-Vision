import React from 'react';

export const meta = {
  title: 'Best Time to Buy and Sell Stock with Transaction Fee',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Space-Optimized',
  description: 'Finds the maximum profit from multiple stock transactions where every complete transaction incurs a fixed transaction fee. Selling an asset costs prices[i] - fee.'
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
        int aheadNotBuy = 0, aheadBuy = 0;

        for (int i = n - 1; i >= 0; i--) {
            int curBuy = max(-prices[i] + aheadNotBuy, aheadBuy);
            int curNotBuy = max(prices[i] - fee + aheadBuy, aheadNotBuy);

            aheadBuy = curBuy;
            aheadNotBuy = curNotBuy;
        }

        return aheadBuy;
    }
};`,
  python: `# Python 3 Stock with Transaction Fee
# Time: O(N) | Space: O(1)
class Solution:
    def maxProfit(self, prices: list[int], fee: int) -> int:
        ahead_not_buy = 0
        ahead_buy = 0

        for price in reversed(prices):
            cur_buy = max(-price + ahead_not_buy, ahead_buy)
            cur_not_buy = max(price - fee + ahead_buy, ahead_not_buy)

            ahead_buy = cur_buy
            ahead_not_buy = cur_not_buy

        return ahead_buy`,
  java: `// Java Stock with Transaction Fee
// Time: O(N) | Space: O(1)
class Solution {
    public int maxProfit(int[] prices, int fee) {
        int n = prices.length;
        int aheadNotBuy = 0, aheadBuy = 0;

        for (int i = n - 1; i >= 0; i--) {
            int curBuy = Math.max(-prices[i] + aheadNotBuy, aheadBuy);
            int curNotBuy = Math.max(prices[i] - fee + aheadBuy, aheadNotBuy);

            aheadBuy = curBuy;
            aheadNotBuy = curNotBuy;
        }

        return aheadBuy;
    }
}`,
  javascript: `// JavaScript Stock with Transaction Fee
// Time: O(N) | Space: O(1)
var maxProfit = function(prices, fee) {
    let aheadNotBuy = 0, aheadBuy = 0;

    for (let i = prices.length - 1; i >= 0; i--) {
        const curBuy = Math.max(-prices[i] + aheadNotBuy, aheadBuy);
        const curNotBuy = Math.max(prices[i] - fee + aheadBuy, aheadNotBuy);

        aheadBuy = curBuy;
        aheadNotBuy = curNotBuy;
    }

    return aheadBuy;
};`
};

export const steps = [
  {
    title: '1. Prices: [1, 3, 2, 8, 4, 9], Fee = $2 per Transaction',
    phase: 'INITIAL',
    codeLine: 12,
    prices: [1, 3, 2, 8, 4, 9],
    fee: 2,
    trades: [],
    netProfit: 0,
    variables: { prices: '[1, 3, 2, 8, 4, 9]', fee: 2, rule: 'Deduct $2 on each sell' },
    explain: 'Whenever a stock is sold, a fixed $2 transaction fee is deducted from the profit: net = (sellPrice - buyPrice) - fee.',
    intuition: 'Small price fluctuations of <= $2 should be held rather than traded to avoid churning fees.'
  },
  {
    title: '2. Trade 1: Buy Day 0 ($1), Sell Day 3 ($8) -> Net Profit = (8 - 1) - 2 = $5',
    phase: 'TRADE_1',
    codeLine: 16,
    prices: [1, 3, 2, 8, 4, 9],
    fee: 2,
    trades: [{ buy: 0, sell: 3, gross: 7, fee: 2, net: 5 }],
    netProfit: 5,
    variables: { buy: 'Day 0 ($1)', sell: 'Day 3 ($8)', gross: 7, fee: 2, net: 5 },
    explain: 'Holding through minor noise on Day 1 ($3) and Day 2 ($2) to sell at $8 yields gross $7 - fee $2 = $5 net profit.',
    intuition: 'Fee-aware DP ignores minor fluctuations.'
  },
  {
    title: '3. Trade 2: Buy Day 4 ($4), Sell Day 5 ($9) -> Net Profit = (9 - 4) - 2 = $3',
    phase: 'TRADE_2',
    codeLine: 16,
    prices: [1, 3, 2, 8, 4, 9],
    fee: 2,
    trades: [
      { buy: 0, sell: 3, gross: 7, fee: 2, net: 5 },
      { buy: 4, sell: 5, gross: 5, fee: 2, net: 3 }
    ],
    netProfit: 8,
    variables: { buy: 'Day 4 ($4)', sell: 'Day 5 ($9)', gross: 5, fee: 2, net: 3 },
    explain: 'Next trade buys at $4 and sells at $9, earning gross $5 - fee $2 = $3 net profit.',
    intuition: 'Two strong trending swings captured.'
  },
  {
    title: '4. Final Result: Net Profit = $5 + $3 = $8 (After Deducting $4 in Fees)',
    phase: 'COMPLETED',
    codeLine: 21,
    prices: [1, 3, 2, 8, 4, 9],
    fee: 2,
    trades: [
      { buy: 0, sell: 3, gross: 7, fee: 2, net: 5 },
      { buy: 4, sell: 5, gross: 5, fee: 2, net: 3 }
    ],
    netProfit: 8,
    variables: { totalNetProfit: 8, totalFeesPaid: 4 },
    explain: 'Total net profit after deducting $2 fee per trade is $8! Completed in O(N) time and O(1) space.',
    intuition: 'Optimal balance of trade frequency and fee preservation.'
  }
];

export default function BestTimeToBuyAndSellStockWithTransactionFeesVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Transaction Fee: ${step.fee} / trade
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Net Profit: ${step.netProfit}
        </span>
      </div>

      {/* Stock Timeline Card */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Stock Trend & Fee-Adjusted Profits
        </span>

        <div className="w-full flex items-end justify-around gap-2 h-44 pt-4 px-2">
          {step.prices.map((p, idx) => {
            const heightPx = p * 16;
            const isBuy = step.trades.some(t => t.buy === idx);
            const isSell = step.trades.some(t => t.sell === idx);

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
                  Day {idx}
                </span>
              </div>
            );
          })}
        </div>

        {/* Executed Trades Info */}
        {step.trades.length > 0 && (
          <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 flex flex-wrap items-center justify-around gap-3 text-xs font-mono">
            {step.trades.map((t, tidx) => (
              <span key={tidx} className="px-2.5 py-1 rounded bg-[#12131b] border border-emerald-500/30 text-emerald-300">
                Trade {tidx + 1}: (${step.prices[t.sell]} - ${step.prices[t.buy]}) - ${t.fee} fee = <strong className="text-amber-300">+${t.net}</strong>
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

import React from 'react';

export const meta = {
  title: 'Best Time to Buy and Sell Stock with Cooldown',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Space-Optimized',
  description: 'Finds the maximum profit from multiple stock transactions with a mandatory 1-day cooldown period immediately after selling. If sold on day i, the next buy can only occur on day i + 2.'
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
        int n = prices.size();
        vector<int> front2(2, 0);
        vector<int> front1(2, 0);
        vector<int> cur(2, 0);

        for (int i = n - 1; i >= 0; i--) {
            cur[1] = max(-prices[i] + front1[0], front1[1]);
            cur[0] = max(prices[i] + front2[1], front1[0]);

            front2 = front1;
            front1 = cur;
        }

        return cur[1];
    }
};`,
  python: `# Python 3 Stock with Cooldown
# Time: O(N) | Space: O(1)
class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        n = len(prices)
        front2 = [0, 0]
        front1 = [0, 0]
        cur = [0, 0]

        for i in range(n - 1, -1, -1):
            cur[1] = max(-prices[i] + front1[0], front1[1])
            cur[0] = max(prices[i] + front2[1], front1[0])

            front2 = list(front1)
            front1 = list(cur)

        return cur[1]`,
  java: `// Java Stock with Cooldown
// Time: O(N) | Space: O(1)
class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        int[] front2 = new int[2];
        int[] front1 = new int[2];
        int[] cur = new int[2];

        for (int i = n - 1; i >= 0; i--) {
            cur[1] = Math.max(-prices[i] + front1[0], front1[1]);
            cur[0] = Math.max(prices[i] + front2[1], front1[0]);

            front2[0] = front1[0]; front2[1] = front1[1];
            front1[0] = cur[0]; front1[1] = cur[1];
        }

        return cur[1];
    }
}`,
  javascript: `// JavaScript Stock with Cooldown
// Time: O(N) | Space: O(1)
var maxProfit = function(prices) {
    const n = prices.length;
    let front2 = [0, 0];
    let front1 = [0, 0];
    let cur = [0, 0];

    for (let i = n - 1; i >= 0; i--) {
        cur[1] = Math.max(-prices[i] + front1[0], front1[1]);
        cur[0] = Math.max(prices[i] + front2[1], front1[0]);

        front2 = [...front1];
        front1 = [...cur];
    }

    return cur[1];
};`
};

export const steps = [
  {
    title: '1. Prices: [1, 2, 3, 0, 2], Cooldown Rule (1 Day Gap After Selling)',
    phase: 'INITIAL',
    codeLine: 12,
    prices: [1, 2, 3, 0, 2],
    activeDay: 0,
    trades: [],
    cooldownDays: [],
    profit: 0,
    variables: { prices: '[1, 2, 3, 0, 2]', rule: 'Sell at day i -> cannot buy at day i+1 (cooldown)' },
    explain: 'Whenever we sell a stock, the immediately following day is locked into a mandatory rest/cooldown state.',
    intuition: 'DP transitions jump to i + 2 upon selling: cur[0] = max(prices[i] + front2[1], front1[0]).'
  },
  {
    title: '2. Trade 1: Buy Day 0 ($1) and Sell Day 1 ($2) -> Profit $1',
    phase: 'TRADE_1',
    codeLine: 18,
    prices: [1, 2, 3, 0, 2],
    activeDay: 1,
    trades: [{ buy: 0, sell: 1, profit: 1 }],
    cooldownDays: [2],
    profit: 1,
    variables: { trade: 'Buy Day 0 ($1), Sell Day 1 ($2)', cooldown: 'Day 2 is FROZEN' },
    explain: 'If we sell on Day 1, Day 2 enters cooldown and cannot be used to buy stock.',
    intuition: 'Selling triggers immediate cooldown lock on day i + 1.'
  },
  {
    title: '3. Alternative: Buy Day 0 ($1), Sell Day 2 ($3) -> Cooldown on Day 3',
    phase: 'BETTER_TRADE',
    codeLine: 18,
    prices: [1, 2, 3, 0, 2],
    activeDay: 2,
    trades: [{ buy: 0, sell: 2, profit: 2 }],
    cooldownDays: [3],
    profit: 2,
    variables: { trade: 'Buy Day 0 ($1), Sell Day 2 ($3)', cooldown: 'Day 3 Cooldown' },
    explain: 'Holding through Day 1 to sell at Day 2 yields 3 - 1 = 2 profit. Day 3 becomes cooldown.',
    intuition: 'Avoid early sell to ride higher price momentum.'
  },
  {
    title: '4. Re-Buy Day 3 ($0) after Cooldown and Sell Day 4 ($2) -> Max Profit = $3',
    phase: 'COMPLETED',
    codeLine: 23,
    prices: [1, 2, 3, 0, 2],
    activeDay: 4,
    trades: [
      { buy: 0, sell: 1, profit: 1 },
      { buy: 3, sell: 4, profit: 2 }
    ],
    cooldownDays: [2],
    profit: 3,
    variables: { optimalSequence: 'Buy D0($1) -> Sell D1($2) -> Rest D2 -> Buy D3($0) -> Sell D4($2)', totalProfit: 3 },
    explain: 'Optimal plan: Buy Day 0 ($1) -> Sell Day 1 ($2) [+1] -> Rest Day 2 (cooldown) -> Buy Day 3 ($0) -> Sell Day 4 ($2) [+2]. Total profit = 1 + 2 = 3!',
    intuition: 'Cooldown DP allows tactical dips to be exploited after required rest days.'
  }
];

export default function BestTimeToBuyAndSellStockWithCooldownVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-semibold">
          Cooldown Lock: 1 Day Rest
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Total Profit: ${step.profit}
        </span>
      </div>

      {/* Stock Timeline with Cooldown Indicator */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Stock Timeline & Mandatory Cooldown Lock
        </span>

        <div className="w-full flex items-end justify-around gap-2 h-44 pt-4 px-2">
          {step.prices.map((p, idx) => {
            const heightPx = Math.max(16, p * 34);
            const isBuy = step.trades.some(t => t.buy === idx);
            const isSell = step.trades.some(t => t.sell === idx);
            const isCooldown = step.cooldownDays.includes(idx);

            return (
              <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="text-[10px] font-mono mb-1 font-bold text-amber-300">
                  ${p}
                </div>

                <div
                  style={{ height: `${heightPx}px` }}
                  className={`w-full max-w-[44px] rounded-t-xl border-t border-x flex flex-col items-center justify-between p-1 font-mono transition-all duration-300 ${
                    isBuy
                      ? 'border-emerald-500 bg-emerald-500/30 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg'
                      : isSell
                      ? 'border-amber-500 bg-amber-500/30 text-amber-300 ring-2 ring-amber-500/40 shadow-lg'
                      : isCooldown
                      ? 'border-cyan-500/60 bg-cyan-500/20 text-cyan-300 ring-2 ring-cyan-500/30'
                      : 'border-[#272b3c] bg-[#161824] text-slate-500'
                  }`}
                >
                  <span className="text-[8px] font-bold">
                    {isBuy ? 'BUY' : isSell ? 'SELL' : isCooldown ? 'REST' : ''}
                  </span>
                </div>

                <span className="text-[9px] font-mono text-[#8a8ea3] mt-1.5">
                  Day {idx}
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

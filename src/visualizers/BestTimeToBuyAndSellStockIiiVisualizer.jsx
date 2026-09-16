import React from 'react';

export const meta = {
  title: 'Best Time to Buy and Sell Stock III (At Most 2 Transactions)',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N * 2 * 3) = O(N)',
  spaceComplexity: 'O(1) Space-Optimized',
  description: 'Calculates the maximum profit achievable with at most 2 completed buy/sell transactions. State machine DP tracks 3 dimensions: Day index, Buy eligibility (1 or 0), and Remaining Transaction Capacity (2, 1, or 0).'
};

export const solutions = {
  cpp: `// C++ Best Time to Buy and Sell Stock III
// Time: O(N) | Space: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        vector<vector<int>> ahead(2, vector<int>(3, 0));
        vector<vector<int>> cur(2, vector<int>(3, 0));

        for (int i = n - 1; i >= 0; i--) {
            for (int buy = 0; buy <= 1; buy++) {
                for (int cap = 1; cap <= 2; cap++) {
                    if (buy == 1) {
                        cur[buy][cap] = max(-prices[i] + ahead[0][cap], ahead[1][cap]);
                    } else {
                        cur[buy][cap] = max(prices[i] + ahead[1][cap - 1], ahead[0][cap]);
                    }
                }
            }
            ahead = cur;
        }

        return ahead[1][2];
    }
};`,
  python: `# Python 3 Best Time to Buy and Sell Stock III
# Time: O(N) | Space: O(1)
class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        n = len(prices)
        ahead = [[0] * 3 for _ in range(2)]

        for price in reversed(prices):
            cur = [[0] * 3 for _ in range(2)]
            for buy in (0, 1):
                for cap in (1, 2):
                    if buy == 1:
                        cur[buy][cap] = max(-price + ahead[0][cap], ahead[1][cap])
                    else:
                        cur[buy][cap] = max(price + ahead[1][cap - 1], ahead[0][cap])
            ahead = cur

        return ahead[1][2]`,
  java: `// Java Best Time to Buy and Sell Stock III
// Time: O(N) | Space: O(1)
class Solution {
    public int maxProfit(int[] prices) {
        int n = prices.length;
        int[][] ahead = new int[2][3];

        for (int i = n - 1; i >= 0; i--) {
            int[][] cur = new int[2][3];
            for (int buy = 0; buy <= 1; buy++) {
                for (int cap = 1; cap <= 2; cap++) {
                    if (buy == 1) {
                        cur[buy][cap] = Math.max(-prices[i] + ahead[0][cap], ahead[1][cap]);
                    } else {
                        cur[buy][cap] = Math.max(prices[i] + ahead[1][cap - 1], ahead[0][cap]);
                    }
                }
            }
            ahead = cur;
        }

        return ahead[1][2];
    }
}`,
  javascript: `// JavaScript Best Time to Buy and Sell Stock III
// Time: O(N) | Space: O(1)
var maxProfit = function(prices) {
    let ahead = Array.from({ length: 2 }, () => new Array(3).fill(0));

    for (let i = prices.length - 1; i >= 0; i--) {
        const cur = Array.from({ length: 2 }, () => new Array(3).fill(0));
        for (let buy = 0; buy <= 1; buy++) {
            for (let cap = 1; cap <= 2; cap++) {
                if (buy === 1) {
                    cur[buy][cap] = Math.max(-prices[i] + ahead[0][cap], ahead[1][cap]);
                } else {
                    cur[buy][cap] = Math.max(prices[i] + ahead[1][cap - 1], ahead[0][cap]);
                }
            }
        }
        ahead = cur;
    }

    return ahead[1][2];
};`
};

export const steps = [
  {
    title: '1. Prices: [3, 3, 5, 0, 0, 3, 1, 4], Capacity = 2 Transactions',
    phase: 'INITIAL',
    codeLine: 12,
    prices: [3, 3, 5, 0, 0, 3, 1, 4],
    cap: 2,
    trades: [],
    totalProfit: 0,
    variables: { pricesCount: 8, maxTransactions: 2 },
    explain: 'Constraint: At most 2 non-overlapping completed transactions. Must sell before buying again.',
    intuition: 'DP state dp[i][buy][cap] determines whether to hold, buy, or sell with remaining quota cap.'
  },
  {
    title: '2. Transaction 1: Buy Day 3 ($0) and Sell Day 5 ($3) -> Profit $3',
    phase: 'TX_1',
    codeLine: 19,
    prices: [3, 3, 5, 0, 0, 3, 1, 4],
    cap: 1,
    trades: [{ buy: 3, sell: 5, profit: 3 }],
    totalProfit: 3,
    variables: { tx1: 'Day 3 ($0) -> Day 5 ($3) = +$3', remainingCap: 1 },
    explain: 'Completing first trade: remaining capacity decrements from 2 to 1.',
    intuition: 'First transaction locks in 3 profit.'
  },
  {
    title: '3. Transaction 2: Buy Day 6 ($1) and Sell Day 7 ($4) -> Profit $3',
    phase: 'TX_2',
    codeLine: 19,
    prices: [3, 3, 5, 0, 0, 3, 1, 4],
    cap: 0,
    trades: [
      { buy: 3, sell: 5, profit: 3 },
      { buy: 6, sell: 7, profit: 3 }
    ],
    totalProfit: 6,
    variables: { tx2: 'Day 6 ($1) -> Day 7 ($4) = +$3', remainingCap: 0 },
    explain: 'Completing second trade: remaining capacity reaches 0. Total profit = 3 + 3 = 6.',
    intuition: 'Two transactions fully utilized.'
  },
  {
    title: '4. Final Optimal Result: Max Profit = $6 (Two Trades of +$3 Each)',
    phase: 'COMPLETED',
    codeLine: 24,
    prices: [3, 3, 5, 0, 0, 3, 1, 4],
    cap: 0,
    trades: [
      { buy: 3, sell: 5, profit: 3 },
      { buy: 6, sell: 7, profit: 3 }
    ],
    totalProfit: 6,
    variables: { totalMaxProfit: 6, transactionsUsed: '2 / 2' },
    explain: 'Total profit is 6. Alternative trade [3, 5] gives only 2, which is sub-optimal compared to (0->3) + (1->4) = 6.',
    intuition: 'State DP naturally filters out inferior single trade alternatives.'
  }
];

export default function BestTimeToBuyAndSellStockIiiVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Remaining Cap: {step.cap} / 2
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Profit: ${step.totalProfit}
        </span>
      </div>

      {/* Stock Timeline Card */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Dual-Transaction Stock Trajectory
        </span>

        <div className="w-full flex items-end justify-around gap-1 h-44 pt-4 px-2">
          {step.prices.map((p, idx) => {
            const heightPx = Math.max(16, p * 24);
            const isBuy = step.trades.some(t => t.buy === idx);
            const isSell = step.trades.some(t => t.sell === idx);

            return (
              <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="text-[10px] font-mono mb-1 font-bold text-amber-300">
                  ${p}
                </div>

                <div
                  style={{ height: `${heightPx}px` }}
                  className={`w-full max-w-[36px] rounded-t-xl border-t border-x flex flex-col items-center justify-between p-1 font-mono transition-all duration-300 ${
                    isBuy
                      ? 'border-emerald-500 bg-emerald-500/30 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg'
                      : isSell
                      ? 'border-amber-500 bg-amber-500/30 text-amber-300 ring-2 ring-amber-500/40 shadow-lg'
                      : 'border-[#272b3c] bg-[#161824] text-slate-500'
                  }`}
                >
                  <span className="text-[7px] font-bold">
                    {isBuy ? 'B' : isSell ? 'S' : ''}
                  </span>
                </div>

                <span className="text-[9px] font-mono text-[#8a8ea3] mt-1">
                  D{idx}
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
                Tx {tidx + 1}: Day {t.buy} (${step.prices[t.buy]}) ➔ Day {t.sell} (${step.prices[t.sell]}) = <strong className="text-amber-300">+${t.profit}</strong>
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

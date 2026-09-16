import React from 'react';

export const meta = {
  title: 'Best Time to Buy and Sell Stock IV (At Most K Transactions)',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N * K)',
  spaceComplexity: 'O(K) Space-Optimized',
  description: 'Generalizes stock profit maximization to at most K completed transactions. Uses a 3D state machine DP space-optimized to O(K) memory.'
};

export const solutions = {
  cpp: `// C++ Best Time to Buy and Sell Stock IV
// Time: O(N * K) | Space: O(K)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        int n = prices.size();
        if (n == 0 || k == 0) return 0;

        vector<vector<int>> ahead(2, vector<int>(k + 1, 0));
        vector<vector<int>> cur(2, vector<int>(k + 1, 0));

        for (int i = n - 1; i >= 0; i--) {
            for (int buy = 0; buy <= 1; buy++) {
                for (int cap = 1; cap <= k; cap++) {
                    if (buy == 1) {
                        cur[buy][cap] = max(-prices[i] + ahead[0][cap], ahead[1][cap]);
                    } else {
                        cur[buy][cap] = max(prices[i] + ahead[1][cap - 1], ahead[0][cap]);
                    }
                }
            }
            ahead = cur;
        }

        return ahead[1][k];
    }
};`,
  python: `# Python 3 Best Time to Buy and Sell Stock IV
# Time: O(N * K) | Space: O(K)
class Solution:
    def maxProfit(self, k: int, prices: list[int]) -> int:
        n = len(prices)
        if n == 0 or k == 0:
            return 0

        ahead = [[0] * (k + 1) for _ in range(2)]

        for price in reversed(prices):
            cur = [[0] * (k + 1) for _ in range(2)]
            for buy in (0, 1):
                for cap in range(1, k + 1):
                    if buy == 1:
                        cur[buy][cap] = max(-price + ahead[0][cap], ahead[1][cap])
                    else:
                        cur[buy][cap] = max(price + ahead[1][cap - 1], ahead[0][cap])
            ahead = cur

        return ahead[1][k]`,
  java: `// Java Best Time to Buy and Sell Stock IV
// Time: O(N * K) | Space: O(K)
class Solution {
    public int maxProfit(int k, int[] prices) {
        int n = prices.length;
        if (n == 0 || k == 0) return 0;

        int[][] ahead = new int[2][k + 1];

        for (int i = n - 1; i >= 0; i--) {
            int[][] cur = new int[2][k + 1];
            for (int buy = 0; buy <= 1; buy++) {
                for (int cap = 1; cap <= k; cap++) {
                    if (buy == 1) {
                        cur[buy][cap] = Math.max(-prices[i] + ahead[0][cap], ahead[1][cap]);
                    } else {
                        cur[buy][cap] = Math.max(prices[i] + ahead[1][cap - 1], ahead[0][cap]);
                    }
                }
            }
            ahead = cur;
        }

        return ahead[1][k];
    }
}`,
  javascript: `// JavaScript Best Time to Buy and Sell Stock IV
// Time: O(N * K) | Space: O(K)
var maxProfit = function(k, prices) {
    const n = prices.length;
    if (n === 0 || k === 0) return 0;

    let ahead = Array.from({ length: 2 }, () => new Array(k + 1).fill(0));

    for (let i = n - 1; i >= 0; i--) {
        const cur = Array.from({ length: 2 }, () => new Array(k + 1).fill(0));
        for (let buy = 0; buy <= 1; buy++) {
            for (let cap = 1; cap <= k; cap++) {
                if (buy === 1) {
                    cur[buy][cap] = Math.max(-prices[i] + ahead[0][cap], ahead[1][cap]);
                } else {
                    cur[buy][cap] = Math.max(prices[i] + ahead[1][cap - 1], ahead[0][cap]);
                }
            }
        }
        ahead = cur;
    }

    return ahead[1][k];
};`
};

export const steps = [
  {
    title: '1. Prices: [2, 4, 1], K = 2 Transactions Capacity',
    phase: 'INITIAL',
    codeLine: 12,
    k: 2,
    prices: [2, 4, 1],
    trades: [],
    profit: 0,
    variables: { k: 2, prices: '[2, 4, 1]', rule: 'Up to K transactions allowed' },
    explain: 'Starting with capacity K = 2. Buying at 2 and selling at 4 yields profit 2.',
    intuition: 'Each completed transaction consumes 1 unit of transaction budget.'
  },
  {
    title: '2. Execute Trade: Buy Day 0 ($2) and Sell Day 1 ($4) -> +$2 Profit',
    phase: 'TRADE',
    codeLine: 20,
    k: 2,
    prices: [2, 4, 1],
    trades: [{ buy: 0, sell: 1, profit: 2 }],
    profit: 2,
    variables: { buy: 'Day 0 ($2)', sell: 'Day 1 ($4)', profit: 2, remainingCap: 1 },
    explain: 'First trade consumes 1 capacity budget: remaining capacity = 1.',
    intuition: 'Captures first profitable spread.'
  },
  {
    title: '3. Day 2 (Price = 1): Downward move, no profitable second transaction',
    phase: 'EVALUATE',
    codeLine: 20,
    k: 2,
    prices: [2, 4, 1],
    trades: [{ buy: 0, sell: 1, profit: 2 }],
    profit: 2,
    variables: { price: 1, availableFollowUp: 'None (last day reached)' },
    explain: 'Day 2 is the final day. No subsequent days exist to sell stock bought on Day 2.',
    intuition: 'Remaining transaction capacity does not need to be forced.'
  },
  {
    title: '4. Final Result: Max Profit = $2 (Using 1 of K=2 Transactions)',
    phase: 'COMPLETED',
    codeLine: 27,
    k: 2,
    prices: [2, 4, 1],
    trades: [{ buy: 0, sell: 1, profit: 2 }],
    profit: 2,
    variables: { maxProfit: 2, budgetUsed: '1 / 2' },
    explain: 'Maximum profit is 2. The algorithm returns ahead[1][k] in O(N * K) time and O(K) space.',
    intuition: 'Dynamic programming seamlessly adapts to any budget K.'
  }
];

export default function BestTimeToBuyAndSellStockIvVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Transaction Budget K = {step.k}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Profit: ${step.profit}
        </span>
      </div>

      {/* Stock Timeline Card */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          K-Transaction Budget Allocation
        </span>

        <div className="w-full flex items-end justify-around gap-2 h-44 pt-4 px-2">
          {step.prices.map((p, idx) => {
            const heightPx = p * 32;
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
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

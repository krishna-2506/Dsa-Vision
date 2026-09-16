import React from 'react';

export const meta = {
  title: 'Rod Cutting Problem (DP 24)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(N) Space-Optimized',
  description: 'Finds the maximum revenue obtainable by cutting a rod of length N into pieces and selling each piece according to a price chart. An unbounded knapsack variant where piece lengths are weights and prices are values.'
};

export const solutions = {
  cpp: `// C++ Rod Cutting Problem
// Time: O(N^2) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int cutRod(vector<int>& price, int n) {
        vector<int> dp(n + 1, 0);

        for (int i = 1; i <= n; i++) {
            for (int len = i; len <= n; len++) {
                dp[len] = max(dp[len], price[i - 1] + dp[len - i]);
            }
        }

        return dp[n];
    }
};`,
  python: `# Python 3 Rod Cutting Problem
# Time: O(N^2) | Space: O(N)
class Solution:
    def cutRod(self, price: list[int], n: int) -> int:
        dp = [0] * (n + 1)

        for i in range(1, n + 1):
            for length in range(i, n + 1):
                dp[length] = max(dp[length], price[i - 1] + dp[length - i])

        return dp[n]`,
  java: `// Java Rod Cutting Problem
// Time: O(N^2) | Space: O(N)
class Solution {
    public int cutRod(int[] price, int n) {
        int[] dp = new int[n + 1];

        for (int i = 1; i <= n; i++) {
            for (int len = i; len <= n; len++) {
                dp[len] = Math.max(dp[len], price[i - 1] + dp[len - i]);
            }
        }

        return dp[n];
    }
}`,
  javascript: `// JavaScript Rod Cutting Problem
// Time: O(N^2) | Space: O(N)
var cutRod = function(price, n) {
    const dp = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        for (let len = i; len <= n; len++) {
            dp[len] = Math.max(dp[len], price[i - 1] + dp[len - i]);
        }
    }

    return dp[n];
};`
};

export const steps = [
  {
    title: '1. Rod Length N = 5, Price Chart: [2, 5, 7, 8, 10]',
    phase: 'INITIAL',
    codeLine: 12,
    n: 5,
    prices: [2, 5, 7, 8, 10],
    activeCut: null,
    dp: [0, 0, 0, 0, 0, 0],
    variables: { n: 5, priceChart: 'len 1: $2, len 2: $5, len 3: $7, len 4: $8, len 5: $10' },
    explain: 'Starting with rod of length 5. dp[0] = 0 (0 length yields 0 revenue).',
    intuition: 'Each cut of length i (1-indexed) earns price[i-1] revenue.'
  },
  {
    title: '2. Cut Length 1 (Price $2): 5 pieces of length 1 = $10 revenue',
    phase: 'CUT_1',
    codeLine: 16,
    n: 5,
    prices: [2, 5, 7, 8, 10],
    activeCut: 1,
    dp: [0, 2, 4, 6, 8, 10],
    variables: { cut: 1, 'dp[5]': '5 * $2 = $10' },
    explain: 'Cutting into five 1m segments yields $10 total.',
    intuition: 'Baseline price.'
  },
  {
    title: '3. Cut Length 2 (Price $5): Superior density ($2.5/m > $2/m)',
    phase: 'CUT_2',
    codeLine: 16,
    n: 5,
    prices: [2, 5, 7, 8, 10],
    activeCut: 2,
    dp: [0, 2, 5, 7, 10, 12],
    variables: { cut: 2, 'dp[5]': '2x len 2 ($10) + 1x len 1 ($2) = $12' },
    explain: 'Cutting into two 2m pieces ($5 each) and one 1m piece ($2) yields $12! Surpasses $10.',
    intuition: 'Unbounded reuse of length 2.'
  },
  {
    title: '4. Evaluate Cuts 3, 4, 5: Max Revenue Remains $12 (Cuts: 2m + 2m + 1m)',
    phase: 'COMPLETED',
    codeLine: 20,
    n: 5,
    prices: [2, 5, 7, 8, 10],
    activeCut: 5,
    dp: [0, 2, 5, 7, 10, 12],
    variables: { maxRevenue: 12, optimalCuts: '2m ($5) + 2m ($5) + 1m ($2) = $12' },
    explain: 'Selling whole 5m rod earns only $10. Cutting into 2m + 2m + 1m maximizes profit at $12!',
    intuition: 'Rod cutting optimal substructure solved in O(N^2) time and O(N) space.'
  }
];

export default function RodCuttingProblemDp24Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Rod Length: {step.n}m
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Revenue: ${step.dp[step.n]}
        </span>
      </div>

      {/* Price Table Card */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Cut Length vs Price Chart
        </span>

        <div className="flex items-center justify-center gap-3 py-2">
          {step.prices.map((p, idx) => {
            const cutLen = idx + 1;
            const isCut = cutLen === step.activeCut;

            return (
              <div
                key={idx}
                className={`w-20 h-22 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all ${
                  isCut
                    ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg scale-105'
                    : 'border-[#272b3c] bg-[#161824] text-slate-300'
                }`}
              >
                <span className="text-[10px] text-[#8a8ea3]">{cutLen}m piece</span>
                <span className="text-sm font-bold text-amber-400 mt-0.5">${p}</span>
                <span className="text-[9px] text-slate-400 mt-1">${(p / cutLen).toFixed(1)}/m</span>
              </div>
            );
          })}
        </div>

        {/* Rod Visual Representation */}
        <div className="w-full max-w-md bg-[#161824] border border-[#272b3c] rounded-xl p-3 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 font-semibold">Optimal Rod Breakdown:</span>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold">
              2m ($5)
            </span>
            <span className="text-slate-500">+</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold">
              2m ($5)
            </span>
            <span className="text-slate-500">+</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold">
              1m ($2)
            </span>
          </div>
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

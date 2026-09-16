import React from 'react';

export const meta = {
  title: 'Minimum Coins (Coin Change)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N * Target)',
  spaceComplexity: 'O(Target) Space-Optimized',
  description: 'Finds the minimum number of coins needed to make up a given target amount. Coins have infinite supply (Unbounded Knapsack pattern). Returns -1 if the amount cannot be made up by any combination.'
};

export const solutions = {
  cpp: `// C++ Minimum Coins (Coin Change)
// Time: O(N * Target) | Space: O(Target)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minimumCoins(vector<int>& coins, int target) {
        vector<int> dp(target + 1, 1e9);
        dp[0] = 0; // 0 coins needed for amount 0

        for (int coin : coins) {
            for (int t = coin; t <= target; t++) {
                dp[t] = min(dp[t], 1 + dp[t - coin]);
            }
        }

        return (dp[target] >= 1e9) ? -1 : dp[target];
    }
};`,
  python: `# Python 3 Minimum Coins (Coin Change)
# Time: O(N * Target) | Space: O(Target)
class Solution:
    def minimumCoins(self, coins: list[int], target: int) -> int:
        dp = [float('inf')] * (target + 1)
        dp[0] = 0

        for coin in coins:
            for t in range(coin, target + 1):
                dp[t] = min(dp[t], 1 + dp[t - coin])

        return dp[target] if dp[target] != float('inf') else -1`,
  java: `// Java Minimum Coins (Coin Change)
// Time: O(N * Target) | Space: O(Target)
import java.util.Arrays;

class Solution {
    public int minimumCoins(int[] coins, int target) {
        int[] dp = new int[target + 1];
        Arrays.fill(dp, (int)1e9);
        dp[0] = 0;

        for (int coin : coins) {
            for (int t = coin; t <= target; t++) {
                dp[t] = Math.min(dp[t], 1 + dp[t - coin]);
            }
        }

        return (dp[target] >= (int)1e9) ? -1 : dp[target];
    }
}`,
  javascript: `// JavaScript Minimum Coins (Coin Change)
// Time: O(N * Target) | Space: O(Target)
var minimumCoins = function(coins, target) {
    const dp = new Array(target + 1).fill(Infinity);
    dp[0] = 0;

    for (const coin of coins) {
        for (let t = coin; t <= target; t++) {
            dp[t] = Math.min(dp[t], 1 + dp[t - coin]);
        }
    }

    return dp[target] === Infinity ? -1 : dp[target];
};`
};

export const steps = [
  {
    title: '1. Coins: [1, 2, 5], Target = 11, Initialize dp[0] = 0',
    phase: 'INITIAL',
    codeLine: 12,
    coins: [1, 2, 5],
    target: 11,
    activeCoin: null,
    dp: [0, 1e9, 1e9, 1e9, 1e9, 1e9, 1e9, 1e9, 1e9, 1e9, 1e9, 1e9],
    variables: { coins: '[1, 2, 5]', target: 11, 'dp[0]': '0 coins' },
    explain: 'Base case: 0 coins needed to make amount 0. All other amounts initialized to infinity (1e9).',
    intuition: 'DP array dp[t] stores the minimum coin count to form amount t.'
  },
  {
    title: '2. Process Coin 1: dp[t] = t for all amounts (1 to 11)',
    phase: 'COIN_1',
    codeLine: 16,
    coins: [1, 2, 5],
    target: 11,
    activeCoin: 1,
    dp: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    variables: { coin: 1, 'dp[11]': '11 coins (using all 1s)' },
    explain: 'Using denomination 1: any amount t requires t coins.',
    intuition: 'Establishes initial upper bound for all amounts.'
  },
  {
    title: '3. Process Coin 2: dp[11] drops to 6 coins (5x 2s + 1x 1)',
    phase: 'COIN_2',
    codeLine: 16,
    coins: [1, 2, 5],
    target: 11,
    activeCoin: 2,
    dp: [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6],
    variables: { coin: 2, 'dp[11]': 'min(11, 1 + dp[9]) = 1 + 5 = 6 coins' },
    explain: 'Denomination 2 reduces coin counts across even and odd amounts. dp[11] = 6 coins.',
    intuition: 'Greedy larger coins provide fewer total coins.'
  },
  {
    title: '4. Process Coin 5: dp[11] = 1 + dp[6] = 1 + 2 = 3 coins (5 + 5 + 1 = 11)',
    phase: 'COMPLETED',
    codeLine: 20,
    coins: [1, 2, 5],
    target: 11,
    activeCoin: 5,
    dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3],
    variables: { minCoins: 3, optimalCombination: '5 + 5 + 1 = 11' },
    explain: 'Coin 5: dp[11] = min(6, 1 + dp[11 - 5]) = 1 + dp[6] = 1 + 2 = 3 coins! Optimal coins: two 5s and one 1.',
    intuition: 'Unbounded knapsack allows reusing coin 5 twice.'
  }
];

export default function MinimumCoinsDp20Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Active Coin: {step.activeCoin ? `🪙 ${step.activeCoin}` : 'Init'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Min Coins for Target 11: {step.dp[11] >= 1e9 ? '—' : `${step.dp[11]} coins`}
        </span>
      </div>

      {/* Target Amount Buffer */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Coin Change DP Array (Amounts 0 to 11)
        </span>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {step.dp.map((count, amt) => {
            const isTarget = amt === step.target;

            return (
              <div
                key={amt}
                className={`w-13 h-18 px-2 rounded-xl border flex flex-col items-center justify-center font-mono transition-all ${
                  isTarget
                    ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg scale-105'
                    : count < 1e9
                    ? 'border-blue-500/40 bg-blue-500/15 text-blue-300'
                    : 'border-[#272b3c] bg-[#161824] text-slate-600'
                }`}
              >
                <span className="text-[9px] text-[#8a8ea3]">${amt}</span>
                <span className="text-xs font-bold mt-1">
                  {count >= 1e9 ? '∞' : `${count}c`}
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

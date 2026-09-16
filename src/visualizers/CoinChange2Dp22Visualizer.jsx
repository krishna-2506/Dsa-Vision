import React from 'react';

export const meta = {
  title: 'Coin Change 2 (Combinations)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N * Amount)',
  spaceComplexity: 'O(Amount) Space-Optimized',
  description: 'Calculates the total number of distinct combinations that make up a given amount using infinite coins of given denominations. Outer loop on coins prevents counting order permutations.'
};

export const solutions = {
  cpp: `// C++ Coin Change 2 (Combinations)
// Time: O(N * Amount) | Space: O(Amount)
#include <vector>
using namespace std;

class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<unsigned long long> dp(amount + 1, 0);
        dp[0] = 1; // 1 way to form amount 0: empty set

        // Iterate coins first to ensure combinations, not permutations
        for (int coin : coins) {
            for (int a = coin; a <= amount; a++) {
                dp[a] += dp[a - coin];
            }
        }

        return dp[amount];
    }
};`,
  python: `# Python 3 Coin Change 2 (Combinations)
# Time: O(N * Amount) | Space: O(Amount)
class Solution:
    def change(self, amount: int, coins: list[int]) -> int:
        dp = [0] * (amount + 1)
        dp[0] = 1

        for coin in coins:
            for a in range(coin, amount + 1):
                dp[a] += dp[a - coin]

        return dp[amount]`,
  java: `// Java Coin Change 2 (Combinations)
// Time: O(N * Amount) | Space: O(Amount)
class Solution {
    public int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;

        for (int coin : coins) {
            for (int a = coin; a <= amount; a++) {
                dp[a] += dp[a - coin];
            }
        }

        return dp[amount];
    }
}`,
  javascript: `// JavaScript Coin Change 2 (Combinations)
// Time: O(N * Amount) | Space: O(Amount)
var change = function(amount, coins) {
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1;

    for (const coin of coins) {
        for (let a = coin; a <= amount; a++) {
            dp[a] += dp[a - coin];
        }
    }

    return dp[amount];
};`
};

export const steps = [
  {
    title: '1. Coins: [1, 2, 5], Amount = 5, Base dp[0] = 1',
    phase: 'INITIAL',
    codeLine: 12,
    coins: [1, 2, 5],
    amount: 5,
    activeCoin: null,
    dp: [1, 0, 0, 0, 0, 0],
    variables: { coins: '[1, 2, 5]', amount: 5, 'dp[0]': '1 way (empty combination)' },
    explain: 'Base case: 1 way to form amount 0 (using no coins).',
    intuition: 'Iterating coins on the outer loop guarantees combination order.'
  },
  {
    title: '2. Process Coin 1: 1 way to form all amounts (1 to 5)',
    phase: 'COIN_1',
    codeLine: 16,
    coins: [1, 2, 5],
    amount: 5,
    activeCoin: 1,
    dp: [1, 1, 1, 1, 1, 1],
    variables: { coin: 1, 'dp[5]': '1 way: {1, 1, 1, 1, 1}' },
    explain: 'Using denomination 1: each amount from 1 to 5 has exactly 1 combination of all 1s.',
    intuition: 'dp[a] += dp[a - 1].'
  },
  {
    title: '3. Process Coin 2: dp[5] increases to 3 combinations',
    phase: 'COIN_2',
    codeLine: 16,
    coins: [1, 2, 5],
    amount: 5,
    activeCoin: 2,
    dp: [1, 1, 2, 2, 3, 3],
    variables: { coin: 2, 'dp[5]': '1 + dp[3] = 1 + 2 = 3 ways' },
    explain: 'Adding 2: dp[5] becomes 1 + dp[3] = 3 ways: {1,1,1,1,1}, {2,1,1,1}, {2,2,1}.',
    intuition: 'Unbounded combinations with 1s and 2s accumulated.'
  },
  {
    title: '4. Process Coin 5: dp[5] += dp[0] = 3 + 1 = 4 Combinations (Final)',
    phase: 'COMPLETED',
    codeLine: 20,
    coins: [1, 2, 5],
    amount: 5,
    activeCoin: 5,
    dp: [1, 1, 2, 2, 3, 4],
    variables: { totalCombinations: 4, allCombinations: '{5}, {2,2,1}, {2,1,1,1}, {1,1,1,1,1}' },
    explain: 'Coin 5 adds 1 more combination: {5}. Total combinations = 3 + 1 = 4!',
    intuition: 'Clean O(N * Amount) time and O(Amount) space.'
  }
];

export default function CoinChange2Dp22Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Coin Processed: {step.activeCoin ? `🪙 ${step.activeCoin}` : 'Init'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Combinations for $5: {step.dp[5]}
        </span>
      </div>

      {/* Amounts Combinations Array */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Combination Counts DP Table (Amounts 0 to 5)
        </span>

        <div className="flex items-center justify-center gap-3 pt-2">
          {step.dp.map((count, amt) => {
            const isTarget = amt === step.amount;

            return (
              <div key={amt} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-16 h-20 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                    isTarget
                      ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg scale-105'
                      : 'border-blue-500/40 bg-blue-500/15 text-blue-300'
                  }`}
                >
                  <span className="text-[10px] text-[#8a8ea3]">${amt}</span>
                  <span className="text-sm font-bold mt-1">{count} {count === 1 ? 'way' : 'ways'}</span>
                </div>
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

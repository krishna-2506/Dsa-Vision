import React from 'react';

export const meta = {
  title: 'Unbounded Knapsack',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N * W)',
  spaceComplexity: 'O(W) Space-Optimized',
  description: 'Finds the maximum value achievable with knapsack capacity W where each item can be chosen unlimited times. Forward inner loop DP allows infinite reuse of items.'
};

export const solutions = {
  cpp: `// C++ Unbounded Knapsack
// Time: O(N * W) | Space: O(W)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int unboundedKnapsack(int n, int w, vector<int>& val, vector<int>& wt) {
        vector<int> dp(w + 1, 0);

        for (int i = 0; i < n; i++) {
            for (int cap = wt[i]; cap <= w; cap++) {
                dp[cap] = max(dp[cap], val[i] + dp[cap - wt[i]]);
            }
        }

        return dp[w];
    }
};`,
  python: `# Python 3 Unbounded Knapsack
# Time: O(N * W) | Space: O(W)
class Solution:
    def unboundedKnapsack(self, n: int, w: int, val: list[int], wt: list[int]) -> int:
        dp = [0] * (w + 1)

        for i in range(n):
            for cap in range(wt[i], w + 1):
                dp[cap] = max(dp[cap], val[i] + dp[cap - wt[i]])

        return dp[w]`,
  java: `// Java Unbounded Knapsack
// Time: O(N * W) | Space: O(W)
class Solution {
    public int unboundedKnapsack(int n, int w, int[] val, int[] wt) {
        int[] dp = new int[w + 1];

        for (int i = 0; i < n; i++) {
            for (int cap = wt[i]; cap <= w; cap++) {
                dp[cap] = Math.max(dp[cap], val[i] + dp[cap - wt[i]]);
            }
        }

        return dp[w];
    }
}`,
  javascript: `// JavaScript Unbounded Knapsack
// Time: O(N * W) | Space: O(W)
var unboundedKnapsack = function(n, w, val, wt) {
    const dp = new Array(w + 1).fill(0);

    for (let i = 0; i < n; i++) {
        for (let cap = wt[i]; cap <= w; cap++) {
            dp[cap] = Math.max(dp[cap], val[i] + dp[cap - wt[i]]);
        }
    }

    return dp[w];
};`
};

export const steps = [
  {
    title: '1. Items: (wt: 2, val: 5), (wt: 4, val: 11), (wt: 6, val: 13), Capacity W = 10',
    phase: 'INITIAL',
    codeLine: 12,
    items: [
      { wt: 2, val: 5 },
      { wt: 4, val: 11 },
      { wt: 6, val: 13 }
    ],
    w: 10,
    activeItem: null,
    dp: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    variables: { capacity: 10, itemsCount: 3, rule: 'Infinite items of each type' },
    explain: 'Starting with empty knapsack: capacity 0 to 10 has 0 value.',
    intuition: 'Forward loop on capacity allows repeated selection of the same item.'
  },
  {
    title: '2. Process Item 0 (wt: 2, val: 5): Max value at W=10 is 5 * 5 = 25',
    phase: 'ITEM_0',
    codeLine: 16,
    items: [
      { wt: 2, val: 5 },
      { wt: 4, val: 11 },
      { wt: 6, val: 13 }
    ],
    w: 10,
    activeItem: 0,
    dp: [0, 0, 5, 5, 10, 10, 15, 15, 20, 20, 25],
    variables: { item: 'wt 2, val 5', 'dp[10]': '5 copies of Item 0 = 25 value' },
    explain: 'Using wt 2: fit up to 5 copies into capacity 10. Value = 5 * 5 = 25.',
    intuition: 'Each increment of 2 weight adds 5 value.'
  },
  {
    title: '3. Process Item 1 (wt: 4, val: 11): Better density (11/4 = 2.75 > 2.5)',
    phase: 'ITEM_1',
    codeLine: 16,
    items: [
      { wt: 2, val: 5 },
      { wt: 4, val: 11 },
      { wt: 6, val: 13 }
    ],
    w: 10,
    activeItem: 1,
    dp: [0, 0, 5, 5, 11, 11, 16, 16, 22, 22, 27],
    variables: { item: 'wt 4, val 11', 'dp[10]': '2x (wt 4, val 11) + 1x (wt 2, val 5) = 27 value' },
    explain: 'At cap 10: 2 copies of item 1 (wt 8, val 22) + 1 copy of item 0 (wt 2, val 5) = 27! Surpasses 25.',
    intuition: 'Mixing high-density items produces higher total haul.'
  },
  {
    title: '4. Process Item 2 (wt: 6, val: 13) -> Final Max Value = 27',
    phase: 'COMPLETED',
    codeLine: 20,
    items: [
      { wt: 2, val: 5 },
      { wt: 4, val: 11 },
      { wt: 6, val: 13 }
    ],
    w: 10,
    activeItem: 2,
    dp: [0, 0, 5, 5, 11, 11, 16, 16, 22, 22, 27],
    variables: { maxValue: 27, optimalKnapsack: '2x (wt 4, val 11) + 1x (wt 2, val 5)' },
    explain: 'Item 2 (density 13/6 = 2.16) does not improve upon 27. Maximum unbounded knapsack value is 27.',
    intuition: 'Global maximum verified in O(N * W) time and O(W) space.'
  }
];

export default function UnboundedKnapsackVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Knapsack Capacity: {step.w} kg
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Value: ${step.dp[step.w]}
        </span>
      </div>

      {/* Available Items */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Available Items (Infinite Supply)
        </span>

        <div className="flex items-center justify-center gap-4 py-2">
          {step.items.map((it, idx) => {
            const isProcessing = idx === step.activeItem;

            return (
              <div
                key={idx}
                className={`w-28 h-24 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                  isProcessing
                    ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg scale-105'
                    : 'border-[#272b3c] bg-[#161824] text-slate-300'
                }`}
              >
                <span className="text-[10px] text-[#8a8ea3]">Item {idx}</span>
                <span className="text-xs font-bold text-amber-400 mt-0.5">${it.val} value</span>
                <span className="text-[11px] text-blue-400 mt-1">Weight: {it.wt}kg</span>
              </div>
            );
          })}
        </div>

        {/* Capacity Buffer Snapshot */}
        <div className="w-full max-w-md bg-[#161824] border border-[#272b3c] rounded-xl p-3 flex items-center justify-around text-xs font-mono">
          <span className="text-slate-400 font-semibold">Cap W=10 Max:</span>
          <span className="text-emerald-300 font-bold text-base">${step.dp[10]}</span>
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

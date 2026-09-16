import React from 'react';

export const meta = {
  title: 'Count Subsets with Sum K',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N * K)',
  spaceComplexity: 'O(K) Space-Optimized',
  description: 'Counts the number of subsets from an array whose elements sum up to exactly K. Correctly accounts for elements with value 0 using pick/not-pick combinations.'
};

export const solutions = {
  cpp: `// C++ Count Subsets with Sum K
// Time: O(N * K) | Space: O(K)
#include <vector>
using namespace std;

class Solution {
    const int MOD = 1e9 + 7;
public:
    int findWays(vector<int>& arr, int k) {
        int n = arr.size();
        vector<int> prev(k + 1, 0);

        // Base case handling for 0s
        if (arr[0] == 0) prev[0] = 2; // pick or not-pick gives 0
        else {
            prev[0] = 1;
            if (arr[0] <= k) prev[arr[0]] = 1;
        }

        for (int i = 1; i < n; i++) {
            vector<int> cur(k + 1, 0);
            for (int target = 0; target <= k; target++) {
                int notTaken = prev[target];
                int taken = 0;
                if (arr[i] <= target) taken = prev[target - arr[i]];
                cur[target] = (notTaken + taken) % MOD;
            }
            prev = cur;
        }

        return prev[k];
    }
};`,
  python: `# Python 3 Count Subsets with Sum K
# Time: O(N * K) | Space: O(K)
class Solution:
    def findWays(self, arr: list[int], k: int) -> int:
        MOD = 10**9 + 7
        n = len(arr)
        prev = [0] * (k + 1)

        if arr[0] == 0:
            prev[0] = 2
        else:
            prev[0] = 1
            if arr[0] <= k:
                prev[arr[0]] = 1

        for i in range(1, n):
            cur = [0] * (k + 1)
            for target in range(k + 1):
                not_taken = prev[target]
                taken = prev[target - arr[i]] if arr[i] <= target else 0
                cur[target] = (not_taken + taken) % MOD
            prev = cur

        return prev[k]`,
  java: `// Java Count Subsets with Sum K
// Time: O(N * K) | Space: O(K)
class Solution {
    private static final int MOD = 1_000_000_007;

    public int findWays(int[] arr, int k) {
        int n = arr.length;
        int[] prev = new int[k + 1];

        if (arr[0] == 0) prev[0] = 2;
        else {
            prev[0] = 1;
            if (arr[0] <= k) prev[arr[0]] = 1;
        }

        for (int i = 1; i < n; i++) {
            int[] cur = new int[k + 1];
            for (int target = 0; target <= k; target++) {
                int notTaken = prev[target];
                int taken = (arr[i] <= target) ? prev[target - arr[i]] : 0;
                cur[target] = (notTaken + taken) % MOD;
            }
            prev = cur;
        }

        return prev[k];
    }
}`,
  javascript: `// JavaScript Count Subsets with Sum K
// Time: O(N * K) | Space: O(K)
var findWays = function(arr, k) {
    const MOD = 1e9 + 7;
    const n = arr.length;
    let prev = new Array(k + 1).fill(0);

    if (arr[0] === 0) prev[0] = 2;
    else {
        prev[0] = 1;
        if (arr[0] <= k) prev[arr[0]] = 1;
    }

    for (let i = 1; i < n; i++) {
        const cur = new Array(k + 1).fill(0);
        for (let target = 0; target <= k; target++) {
            const notTaken = prev[target];
            const taken = arr[i] <= target ? prev[target - arr[i]] : 0;
            cur[target] = (notTaken + taken) % MOD;
        }
        prev = cur;
    }

    return prev[k];
};`
};

export const steps = [
  {
    title: '1. Array: [1, 2, 2, 3], Target K = 3',
    phase: 'INITIAL',
    codeLine: 16,
    arr: [1, 2, 2, 3],
    k: 3,
    activeI: 0,
    dp: [1, 1, 0, 0],
    variables: { arr: '[1, 2, 2, 3]', k: 3, 'base dp': '[1, 1, 0, 0]' },
    explain: 'Base case with arr[0] = 1: 1 way to get sum 0 (empty subset), 1 way to get sum 1 ([1]).',
    intuition: 'Each table cell stores the count of distinct combinations yielding sum s.'
  },
  {
    title: '2. Process arr[1] = 2: dp = [1, 1, 1, 1]',
    phase: 'PROCESS',
    codeLine: 24,
    arr: [1, 2, 2, 3],
    k: 3,
    activeI: 1,
    dp: [1, 1, 1, 1],
    variables: { num: 2, 'ways for sum 3': 'prev[3] (0) + prev[3-2] (1) = 1 [1, 2]' },
    explain: 'For target 3: notTaken = 0, taken = prev[1] = 1 ([1, 2]). Count for sum 3 becomes 1.',
    intuition: 'Pick 2 with existing subset [1] to form [1, 2] summing to 3.'
  },
  {
    title: '3. Process arr[2] = 2: Second duplicate 2 adds another subset [1, 2_b]!',
    phase: 'PROCESS',
    codeLine: 24,
    arr: [1, 2, 2, 3],
    k: 3,
    activeI: 2,
    dp: [1, 1, 2, 2],
    variables: { num: 2, 'ways for sum 3': 'notTaken(1) + taken(1) = 2' },
    explain: 'Using the second 2: notTaken = 1 ([1, 2_a]), taken = prev[1] = 1 ([1, 2_b]). Count for sum 3 is now 2!',
    intuition: 'Duplicate elements create independent distinct subsets.'
  },
  {
    title: '4. Process arr[3] = 3: Single element [3] adds 1 more way -> Total = 3',
    phase: 'COMPLETED',
    codeLine: 31,
    arr: [1, 2, 2, 3],
    k: 3,
    activeI: 3,
    dp: [1, 1, 2, 3],
    variables: { totalWays: 3, subsets: '[1, 2_a], [1, 2_b], [3]' },
    explain: 'Taking 3 alone adds 1 more way to sum 3. Total distinct subsets summing to 3 is 3: [1, 2_a], [1, 2_b], and [3].',
    intuition: 'Accumulates all combinations in O(N * K) time and O(K) space.'
  }
];

export default function CountSubsetsWithSumKVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Target Sum K = {step.k}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Total Subsets: {step.dp[step.k]}
        </span>
      </div>

      {/* DP Counts Array */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Subset Count DP Table (Sums 0 to {step.k})
        </span>

        <div className="flex items-center justify-center gap-3 pt-2">
          {step.dp.map((count, s) => {
            const isTarget = s === step.k;

            return (
              <div key={s} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-18 h-20 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                    isTarget
                      ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg scale-105'
                      : count > 0
                      ? 'border-blue-500/40 bg-blue-500/15 text-blue-300'
                      : 'border-[#272b3c] bg-[#161824] text-slate-500'
                  }`}
                >
                  <span className="text-[10px] text-[#8a8ea3]">Sum {s}</span>
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

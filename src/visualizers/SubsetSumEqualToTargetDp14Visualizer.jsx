import React from 'react';

export const meta = {
  title: 'Subset Sum Equal to Target (DP 14)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N * Target)',
  spaceComplexity: 'O(Target) Space-Optimized',
  description: 'Determines whether a subset of numbers exists whose sum equals the given target. At each element, we evaluate whether to pick or not pick it to form sub-targets.'
};

export const solutions = {
  cpp: `// C++ Subset Sum Equal to Target
// Time: O(N * Target) | Space: O(Target)
#include <vector>
using namespace std;

class Solution {
public:
    bool subsetSumToK(int n, int k, vector<int>& arr) {
        vector<bool> prev(k + 1, false);
        prev[0] = true;

        if (arr[0] <= k) prev[arr[0]] = true;

        for (int i = 1; i < n; i++) {
            vector<bool> cur(k + 1, false);
            cur[0] = true;
            for (int target = 1; target <= k; target++) {
                bool notTaken = prev[target];
                bool taken = false;
                if (arr[i] <= target) {
                    taken = prev[target - arr[i]];
                }
                cur[target] = notTaken || taken;
            }
            prev = cur;
        }

        return prev[k];
    }
};`,
  python: `# Python 3 Subset Sum Equal to Target
# Time: O(N * Target) | Space: O(Target)
class Solution:
    def subsetSumToK(self, n: int, k: int, arr: list[int]) -> bool:
        prev = [False] * (k + 1)
        prev[0] = True

        if arr[0] <= k:
            prev[arr[0]] = True

        for i in range(1, n):
            cur = [False] * (k + 1)
            cur[0] = True
            for target in range(1, k + 1):
                not_taken = prev[target]
                taken = prev[target - arr[i]] if arr[i] <= target else False
                cur[target] = not_taken or taken
            prev = cur

        return prev[k]`,
  java: `// Java Subset Sum Equal to Target
// Time: O(N * Target) | Space: O(Target)
class Solution {
    public boolean subsetSumToK(int n, int k, int[] arr) {
        boolean[] prev = new boolean[k + 1];
        prev[0] = true;

        if (arr[0] <= k) prev[arr[0]] = true;

        for (int i = 1; i < n; i++) {
            boolean[] cur = new boolean[k + 1];
            cur[0] = true;
            for (int target = 1; target <= k; target++) {
                boolean notTaken = prev[target];
                boolean taken = false;
                if (arr[i] <= target) {
                    taken = prev[target - arr[i]];
                }
                cur[target] = notTaken || taken;
            }
            prev = cur;
        }

        return prev[k];
    }
}`,
  javascript: `// JavaScript Subset Sum Equal to Target
// Time: O(N * Target) | Space: O(Target)
var subsetSumToK = function(n, k, arr) {
    let prev = new Array(k + 1).fill(false);
    prev[0] = true;

    if (arr[0] <= k) prev[arr[0]] = true;

    for (let i = 1; i < n; i++) {
        const cur = new Array(k + 1).fill(false);
        cur[0] = true;
        for (let target = 1; target <= k; target++) {
            const notTaken = prev[target];
            const taken = arr[i] <= target ? prev[target - arr[i]] : false;
            cur[target] = notTaken || taken;
        }
        prev = cur;
    }

    return prev[k];
};`
};

export const steps = [
  {
    title: '1. Array: [1, 2, 3, 4], Target = 4',
    phase: 'INITIAL',
    codeLine: 11,
    arr: [1, 2, 3, 4],
    k: 4,
    activeIdx: 0,
    dp: [true, true, false, false, false],
    variables: { arr: '[1, 2, 3, 4]', target: 4, base: 'target 0 is always true, arr[0]=1 is true' },
    explain: 'Base case: sum = 0 is always achievable with the empty set. arr[0] = 1 achieves sum 1.',
    intuition: 'DP array dp[s] tracks boolean reachability for each sum s up to target.'
  },
  {
    title: '2. Process arr[1] = 2: Target 2 and Target 3 become True',
    phase: 'PROCESS',
    codeLine: 17,
    arr: [1, 2, 3, 4],
    k: 4,
    activeIdx: 1,
    dp: [true, true, true, true, false],
    variables: { num: 2, reachableTargets: '0, 1, 2, 3' },
    explain: 'Using 2: target 2 = true (pick 2 alone). Target 3 = true (pick 1 + 2). Target 4 remains false.',
    intuition: 'New reachable sums = previous reachable sums + current element value.'
  },
  {
    title: '3. Process arr[2] = 3: Target 4 Achieved (1 + 3 = 4)!',
    phase: 'PROCESS',
    codeLine: 21,
    arr: [1, 2, 3, 4],
    k: 4,
    activeIdx: 2,
    dp: [true, true, true, true, true],
    variables: { num: 3, 'target 4': 'prev[4 - 3] = prev[1] is TRUE!' },
    explain: 'Testing target 4: taken = prev[4 - 3] = prev[1] which is true (subset [1, 3]). Target 4 is now reachable!',
    intuition: 'Target condition met early.'
  },
  {
    title: '4. Final Result: Subset Sum Equal to 4 Exists (TRUE)',
    phase: 'COMPLETED',
    codeLine: 27,
    arr: [1, 2, 3, 4],
    k: 4,
    activeIdx: 3,
    dp: [true, true, true, true, true],
    variables: { target: 4, isPossible: 'TRUE', validSubsets: '[1, 3] and [4]' },
    explain: 'Both subsets [1, 3] and [4] sum to target 4. Returning true.',
    intuition: 'O(N * Target) time complexity with O(Target) auxiliary boolean space.'
  }
];

export default function SubsetSumEqualToTargetDp14Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Target K = {step.k}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Target 4 Reachable: {step.dp[step.k] ? '✅ YES' : '⏳ No yet'}
        </span>
      </div>

      {/* Target Reachability Array */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Subset Sum DP Reachability Table
        </span>

        <div className="flex items-center justify-center gap-3 pt-2">
          {step.dp.map((isReachable, s) => {
            const isTarget = s === step.k;

            return (
              <div key={s} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-16 h-20 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                    isTarget && isReachable
                      ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg scale-105'
                      : isReachable
                      ? 'border-blue-500/40 bg-blue-500/15 text-blue-300'
                      : 'border-[#272b3c] bg-[#161824] text-slate-600'
                  }`}
                >
                  <span className="text-[10px] text-[#8a8ea3]">Sum {s}</span>
                  <span className="text-sm font-bold mt-1">
                    {isReachable ? 'TRUE' : 'FALSE'}
                  </span>
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

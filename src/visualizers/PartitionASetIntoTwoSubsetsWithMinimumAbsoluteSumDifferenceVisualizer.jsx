import React from 'react';

export const meta = {
  title: 'Partition Set with Min Absolute Sum Difference',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N * TotalSum)',
  spaceComplexity: 'O(TotalSum)',
  description: 'Partitions an array into two subsets S1 and S2 such that the absolute difference |sum(S1) - sum(S2)| is minimized. Uses Subset Sum DP to identify all achievable subset sums up to TotalSum / 2.'
};

export const solutions = {
  cpp: `// C++ Min Absolute Sum Difference Partition
// Time: O(N * TotalSum) | Space: O(TotalSum)
#include <vector>
#include <numeric>
#include <cmath>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minSubsetSumDifference(vector<int>& arr, int n) {
        int totalSum = accumulate(arr.begin(), arr.end(), 0);
        vector<bool> dp(totalSum + 1, false);
        dp[0] = true;

        for (int num : arr) {
            for (int s = totalSum; s >= num; s--) {
                dp[s] = dp[s] || dp[s - num];
            }
        }

        int minDiff = 1e9;
        for (int s1 = 0; s1 <= totalSum / 2; s1++) {
            if (dp[s1]) {
                int s2 = totalSum - s1;
                minDiff = min(minDiff, abs(s2 - s1));
            }
        }

        return minDiff;
    }
};`,
  python: `# Python 3 Min Absolute Sum Difference Partition
# Time: O(N * TotalSum) | Space: O(TotalSum)
class Solution:
    def minSubsetSumDifference(self, arr: list[int], n: int) -> int:
        total_sum = sum(arr)
        dp = [False] * (total_sum + 1)
        dp[0] = True

        for num in arr:
            for s in range(total_sum, num - 1, -1):
                dp[s] = dp[s] or dp[s - num]

        min_diff = float('inf')
        for s1 in range(total_sum // 2 + 1):
            if dp[s1]:
                s2 = total_sum - s1
                min_diff = min(min_diff, abs(s2 - s1))

        return min_diff`,
  java: `// Java Min Absolute Sum Difference Partition
// Time: O(N * TotalSum) | Space: O(TotalSum)
class Solution {
    public int minSubsetSumDifference(int[] arr, int n) {
        int totalSum = 0;
        for (int num : arr) totalSum += num;

        boolean[] dp = new boolean[totalSum + 1];
        dp[0] = true;

        for (int num : arr) {
            for (int s = totalSum; s >= num; s--) {
                dp[s] = dp[s] || dp[s - num];
            }
        }

        int minDiff = Integer.MAX_VALUE;
        for (int s1 = 0; s1 <= totalSum / 2; s1++) {
            if (dp[s1]) {
                int s2 = totalSum - s1;
                minDiff = Math.min(minDiff, Math.abs(s2 - s1));
            }
        }

        return minDiff;
    }
}`,
  javascript: `// JavaScript Min Absolute Sum Difference Partition
// Time: O(N * TotalSum) | Space: O(TotalSum)
var minSubsetSumDifference = function(arr, n) {
    const totalSum = arr.reduce((a, b) => a + b, 0);
    const dp = new Array(totalSum + 1).fill(false);
    dp[0] = true;

    for (const num of arr) {
        for (let s = totalSum; s >= num; s--) {
            dp[s] = dp[s] || dp[s - num];
        }
    }

    let minDiff = Infinity;
    for (let s1 = 0; s1 <= Math.floor(totalSum / 2); s1++) {
        if (dp[s1]) {
            const s2 = totalSum - s1;
            minDiff = Math.min(minDiff, Math.abs(s2 - s1));
        }
    }

    return minDiff;
};`
};

export const steps = [
  {
    title: '1. Array: [1, 2, 3, 4], Total Sum = 10',
    phase: 'INITIAL',
    codeLine: 13,
    arr: [1, 2, 3, 4],
    totalSum: 10,
    halfSum: 5,
    achievableSums: [0],
    minDiff: 10,
    variables: { totalSum: 10, maxSearchBound: 'half = 5', initialMinDiff: 10 },
    explain: 'Total sum is 10. To minimize |S2 - S1|, we only need to test achievable subset sums S1 between 0 and 10 / 2 = 5.',
    intuition: 'S2 = TotalSum - S1, so Difference = TotalSum - 2*S1.'
  },
  {
    title: '2. Subset Sum DP: Achievable sums <= 5 are [0, 1, 2, 3, 4, 5]',
    phase: 'DP_BUILD',
    codeLine: 18,
    arr: [1, 2, 3, 4],
    totalSum: 10,
    halfSum: 5,
    achievableSums: [0, 1, 2, 3, 4, 5],
    minDiff: 10,
    variables: { reachableSums: '0, 1, 2, 3, 4, 5 (all true!)' },
    explain: 'Through combinations: 1 alone (1), 2 alone (2), 3 alone (3), 1+3 (4), 1+4 or 2+3 (5). All sums up to 5 are achievable!',
    intuition: 'DP array populated in O(N * TotalSum).'
  },
  {
    title: '3. Scan S1 = 5: Difference = |(10 - 5) - 5| = 0!',
    phase: 'MINIMIZE',
    codeLine: 26,
    arr: [1, 2, 3, 4],
    totalSum: 10,
    halfSum: 5,
    achievableSums: [0, 1, 2, 3, 4, 5],
    bestS1: 5,
    bestS2: 5,
    minDiff: 0,
    variables: { S1: 5, S2: '10 - 5 = 5', diff: '|5 - 5| = 0' },
    explain: 'Since sum 5 is achievable (e.g. [1, 4] or [2, 3]), S2 is also 5. The absolute difference is |5 - 5| = 0.',
    intuition: 'A difference of 0 is the theoretical lower bound.'
  },
  {
    title: '4. Final Result: Minimum Absolute Difference = 0',
    phase: 'COMPLETED',
    codeLine: 31,
    arr: [1, 2, 3, 4],
    totalSum: 10,
    halfSum: 5,
    bestS1: 5,
    bestS2: 5,
    minDiff: 0,
    variables: { minAbsoluteDifference: 0, subset1: '[1, 4] (sum 5)', subset2: '[2, 3] (sum 5)' },
    explain: 'Subsets [1, 4] and [2, 3] both sum to 5. Perfect balance with 0 difference.',
    intuition: 'Identifies optimal subset partition in pseudo-polynomial time.'
  }
];

export default function PartitionASetIntoTwoSubsetsWithMinimumAbsoluteSumDifferenceVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Total Sum = {step.totalSum}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Min Absolute Difference = {step.minDiff}
        </span>
      </div>

      {/* Achievable Sums Bar */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Achievable Subset Sums S1 (Bound: 0 to {step.halfSum})
        </span>

        <div className="flex items-center justify-center gap-2 pt-2">
          {[0, 1, 2, 3, 4, 5].map((s) => {
            const isAchieved = step.achievableSums.includes(s);
            const isBest = s === step.bestS1;

            return (
              <div
                key={s}
                className={`w-14 h-18 rounded-xl border flex flex-col items-center justify-center font-mono transition-all ${
                  isBest
                    ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg scale-105'
                    : isAchieved
                    ? 'border-blue-500/40 bg-blue-500/15 text-blue-300'
                    : 'border-[#272b3c] bg-[#161824] text-slate-600'
                }`}
              >
                <span className="text-[10px] text-[#8a8ea3]">S1={s}</span>
                <span className="text-xs font-bold mt-1">
                  {isAchieved ? `Δ ${Math.abs(step.totalSum - 2 * s)}` : '—'}
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

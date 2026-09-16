import React from 'react';

export const meta = {
  title: 'Partition Equal Subset Sum',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N * (TotalSum / 2))',
  spaceComplexity: 'O(TotalSum / 2)',
  description: 'Determines if an array can be partitioned into two disjoint subsets with equal sums. If the total array sum is odd, partitioning is impossible. If even, the problem reduces to finding a subset with sum equal to TotalSum / 2.'
};

export const solutions = {
  cpp: `// C++ Partition Equal Subset Sum
// Time: O(N * Target) | Space: O(Target)
#include <vector>
#include <numeric>
using namespace std;

class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int totalSum = accumulate(nums.begin(), nums.end(), 0);
        if (totalSum % 2 != 0) return false;

        int target = totalSum / 2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;

        for (int num : nums) {
            for (int j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }

        return dp[target];
    }
};`,
  python: `# Python 3 Partition Equal Subset Sum
# Time: O(N * Target) | Space: O(Target)
class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        total_sum = sum(nums)
        if total_sum % 2 != 0:
            return False

        target = total_sum // 2
        dp = [False] * (target + 1)
        dp[0] = True

        for num in nums:
            for j in range(target, num - 1, -1):
                dp[j] = dp[j] or dp[j - num]

        return dp[target]`,
  java: `// Java Partition Equal Subset Sum
// Time: O(N * Target) | Space: O(Target)
class Solution {
    public boolean canPartition(int[] nums) {
        int totalSum = 0;
        for (int num : nums) totalSum += num;
        if (totalSum % 2 != 0) return false;

        int target = totalSum / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;

        for (int num : nums) {
            for (int j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }

        return dp[target];
    }
}`,
  javascript: `// JavaScript Partition Equal Subset Sum
// Time: O(N * Target) | Space: O(Target)
var canPartition = function(nums) {
    const totalSum = nums.reduce((a, b) => a + b, 0);
    if (totalSum % 2 !== 0) return false;

    const target = totalSum / 2;
    const dp = new Array(target + 1).fill(false);
    dp[0] = true;

    for (const num of nums) {
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }

    return dp[target];
};`
};

export const steps = [
  {
    title: '1. Array: [1, 5, 11, 5], Total Sum = 22, Target = 11',
    phase: 'INITIAL',
    codeLine: 12,
    nums: [1, 5, 11, 5],
    totalSum: 22,
    target: 11,
    dpTargetReached: false,
    variables: { totalSum: 22, isEven: '22 % 2 == 0 (Valid)', target: 11 },
    explain: 'Sum of all elements is 22 (even). To partition into two equal halves, each half must sum to exactly 22 / 2 = 11.',
    intuition: 'Reduces to finding any subset summing to 11.'
  },
  {
    title: '2. Process Elements 1 and 5: Reachable Sums {0, 1, 5, 6}',
    phase: 'PROCESS',
    codeLine: 18,
    nums: [1, 5, 11, 5],
    totalSum: 22,
    target: 11,
    dpTargetReached: false,
    reachable: [0, 1, 5, 6],
    variables: { numsProcessed: '[1, 5]', reachable: '0, 1, 5, 6' },
    explain: 'Adding 1 gives sum 1. Adding 5 gives sums 5 and (1+5)=6. Target 11 is not yet reached.',
    intuition: 'Track 1D boolean array backwards to avoid using the same item multiple times.'
  },
  {
    title: '3. Process Element 11: Direct Hit dp[11] = true!',
    phase: 'HIT',
    codeLine: 19,
    nums: [1, 5, 11, 5],
    totalSum: 22,
    target: 11,
    dpTargetReached: true,
    reachable: [0, 1, 5, 6, 11],
    variables: { num: 11, 'dp[11]': 'dp[11 - 11] = dp[0] (TRUE)' },
    explain: 'Element 11 alone satisfies dp[11] = dp[11 - 11] = dp[0] = true! Target 11 is achieved.',
    intuition: 'One subset is [11], and the other subset is [1, 5, 5] (sum = 11).'
  },
  {
    title: '4. Final Result: Can Partition Into Two Equal Subsets [11] & [1, 5, 5]',
    phase: 'COMPLETED',
    codeLine: 23,
    nums: [1, 5, 11, 5],
    totalSum: 22,
    target: 11,
    dpTargetReached: true,
    variables: { canPartition: 'TRUE', subsetA: '[11] (sum 11)', subsetB: '[1, 5, 5] (sum 11)' },
    explain: 'Both subsets have sum 11. Equal partition is guaranteed and verified!',
    intuition: 'Completed in O(N * (Sum/2)) time and O(Sum/2) space.'
  }
];

export default function PartitionEqualSubsetSumVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Total Sum = {step.totalSum} | Target = {step.target}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Equal Partition: {step.dpTargetReached ? '✅ TRUE' : '⏳ Searching'}
        </span>
      </div>

      {/* Subsets Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-5 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Two Disjoint Balanced Subsets
        </span>

        <div className="w-full flex items-center justify-around gap-4 pt-2">
          {/* Subset A */}
          <div className="flex-1 bg-[#161824] border border-emerald-500/40 rounded-2xl p-4 flex flex-col items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400">Subset A (Sum = 11)</span>
            <div className="flex items-center gap-2">
              <span className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold flex items-center justify-center text-sm font-mono">
                11
              </span>
            </div>
          </div>

          <span className="text-slate-500 font-mono text-xl font-bold">==</span>

          {/* Subset B */}
          <div className="flex-1 bg-[#161824] border border-blue-500/40 rounded-2xl p-4 flex flex-col items-center gap-2">
            <span className="text-xs font-mono font-bold text-blue-400">Subset B (Sum = 11)</span>
            <div className="flex items-center gap-2">
              {[1, 5, 5].map((val, idx) => (
                <span key={idx} className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 font-bold flex items-center justify-center text-xs font-mono">
                  {val}
                </span>
              ))}
            </div>
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

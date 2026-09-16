import React from 'react';

export const meta = {
  title: 'Longest Increasing Subsequence (LIS)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2) Tabulation / O(N log N) Binary Search',
  spaceComplexity: 'O(N)',
  description: 'Finds the length of the longest strictly increasing subsequence in an integer array. At each index i, dp[i] = 1 + max(dp[prev]) for all prev < i where nums[prev] < nums[i].'
};

export const solutions = {
  cpp: `// C++ Longest Increasing Subsequence
// Time: O(N^2) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return 0;
        vector<int> dp(n, 1);
        int maxLIS = 1;

        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (nums[prev] < nums[i]) {
                    dp[i] = max(dp[i], 1 + dp[prev]);
                }
            }
            maxLIS = max(maxLIS, dp[i]);
        }

        return maxLIS;
    }
};`,
  python: `# Python 3 Longest Increasing Subsequence
# Time: O(N^2) | Space: O(N)
class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        if not nums:
            return 0
        n = len(nums)
        dp = [1] * n

        for i in range(n):
            for prev in range(i):
                if nums[prev] < nums[i]:
                    dp[i] = max(dp[i], 1 + dp[prev])

        return max(dp)`,
  java: `// Java Longest Increasing Subsequence
// Time: O(N^2) | Space: O(N)
import java.util.Arrays;

class Solution {
    public int lengthOfLIS(int[] nums) {
        if (nums.length == 0) return 0;
        int n = nums.length;
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        int maxLIS = 1;

        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (nums[prev] < nums[i]) {
                    dp[i] = Math.max(dp[i], 1 + dp[prev]);
                }
            }
            maxLIS = Math.max(maxLIS, dp[i]);
        }

        return maxLIS;
    }
}`,
  javascript: `// JavaScript Longest Increasing Subsequence
// Time: O(N^2) | Space: O(N)
var lengthOfLIS = function(nums) {
    if (!nums.length) return 0;
    const n = nums.length;
    const dp = new Array(n).fill(1);
    let maxLIS = 1;

    for (let i = 0; i < n; i++) {
        for (let prev = 0; prev < i; prev++) {
            if (nums[prev] < nums[i]) {
                dp[i] = Math.max(dp[i], 1 + dp[prev]);
            }
        }
        maxLIS = Math.max(maxLIS, dp[i]);
    }

    return maxLIS;
};`
};

export const steps = [
  {
    title: '1. Array: [10, 9, 2, 5, 3, 7, 101, 18], Initialize DP to 1',
    phase: 'INITIAL',
    codeLine: 13,
    nums: [10, 9, 2, 5, 3, 7, 101, 18],
    activeI: 0,
    dp: [1, 1, 1, 1, 1, 1, 1, 1],
    maxLIS: 1,
    variables: { n: 8, baseRule: 'Every element is an increasing subsequence of length 1' },
    explain: 'Initialize dp array of length 8 with all 1s. Each element is by default a valid sequence of length 1.',
    intuition: 'dp[i] represents the length of the LIS ending at index i.'
  },
  {
    title: '2. Process Index 3 (Val = 5): nums[2]=2 < 5 -> dp[3] = 1 + dp[2] = 2',
    phase: 'EXTEND',
    codeLine: 18,
    nums: [10, 9, 2, 5, 3, 7, 101, 18],
    activeI: 3,
    dp: [1, 1, 1, 2, 1, 1, 1, 1],
    maxLIS: 2,
    variables: { i: 3, val: 5, prev: 2, prevVal: 2, 'dp[3]': '1 + 1 = 2 ([2, 5])' },
    explain: 'Element 5 can follow element 2 because 2 < 5. dp[3] extends to 1 + dp[2] = 2.',
    intuition: 'Subsequence grows to [2, 5].'
  },
  {
    title: '3. Process Index 5 (Val = 7): Follows 5 or 3 -> dp[5] = 1 + 2 = 3',
    phase: 'EXTEND',
    codeLine: 18,
    nums: [10, 9, 2, 5, 3, 7, 101, 18],
    activeI: 5,
    dp: [1, 1, 1, 2, 2, 3, 1, 1],
    maxLIS: 3,
    variables: { i: 5, val: 7, subseq: '[2, 5, 7] or [2, 3, 7]', 'dp[5]': 3 },
    explain: 'Element 7 can follow either 5 (dp[3]=2) or 3 (dp[4]=2). dp[5] becomes 1 + 2 = 3.',
    intuition: 'Branching paths converge to maximum depth.'
  },
  {
    title: '4. Process Index 6 (Val = 101): Follows 7 -> dp[6] = 4 (Max LIS = 4)',
    phase: 'COMPLETED',
    codeLine: 24,
    nums: [10, 9, 2, 5, 3, 7, 101, 18],
    activeI: 6,
    dp: [1, 1, 1, 2, 2, 3, 4, 4],
    maxLIS: 4,
    variables: { maxLIS: 4, sampleLIS: '[2, 3, 7, 101] or [2, 5, 7, 18]' },
    explain: 'Both 101 and 18 can follow 7 to reach length 4! Maximum LIS length is 4.',
    intuition: 'O(N^2) DP identifies global maximum length strictly increasing subsequence.'
  }
];

export default function LongestIncreasingSubsequenceVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Active Element: {step.nums[step.activeI]} (Idx {step.activeI})
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max LIS Length: {step.maxLIS}
        </span>
      </div>

      {/* Array Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Array Values & LIS DP Lengths
        </span>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {step.nums.map((num, idx) => {
            const isActive = idx === step.activeI;
            const dpLen = step.dp[idx];

            return (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-14 h-20 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg scale-105'
                      : dpLen > 1
                      ? 'border-blue-500/40 bg-blue-500/15 text-blue-300'
                      : 'border-[#272b3c] bg-[#161824] text-slate-400'
                  }`}
                >
                  <span className="text-[9px] text-[#8a8ea3]">#{idx}</span>
                  <span className="text-sm font-bold text-amber-300 mt-0.5">{num}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold mt-1">
                    L:{dpLen}
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

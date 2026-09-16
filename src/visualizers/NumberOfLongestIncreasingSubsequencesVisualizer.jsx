import React from 'react';

export const meta = {
  title: 'Number of Longest Increasing Subsequences',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(N)',
  description: 'Finds the number of distinct longest increasing subsequences by maintaining two DP arrays: dp[i] (length of LIS ending at index i) and cnt[i] (count of such subsequences).'
};

export const solutions = {
  cpp: `// C++ Number of Longest Increasing Subsequences
// Time: O(N^2) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int findNumberOfLIS(vector<int>& nums) {
        int n = nums.size();
        if (n <= 1) return n;

        vector<int> dp(n, 1);
        vector<int> cnt(n, 1);
        int maxLen = 1;

        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (nums[i] > nums[prev]) {
                    if (dp[prev] + 1 > dp[i]) {
                        dp[i] = dp[prev] + 1;
                        cnt[i] = cnt[prev];
                    } else if (dp[prev] + 1 == dp[i]) {
                        cnt[i] += cnt[prev];
                    }
                }
            }
            maxLen = max(maxLen, dp[i]);
        }

        int totalCount = 0;
        for (int i = 0; i < n; i++) {
            if (dp[i] == maxLen) {
                totalCount += cnt[i];
            }
        }
        return totalCount;
    }
};`,
  python: `# Python 3 Number of Longest Increasing Subsequences
# Time: O(N^2) | Space: O(N)
class Solution:
    def findNumberOfLIS(self, nums: list[int]) -> int:
        n = len(nums)
        if n <= 1:
            return n

        dp = [1] * n
        cnt = [1] * n
        max_len = 1

        for i in range(n):
            for prev in range(i):
                if nums[i] > nums[prev]:
                    if dp[prev] + 1 > dp[i]:
                        dp[i] = dp[prev] + 1
                        cnt[i] = cnt[prev]
                    elif dp[prev] + 1 == dp[i]:
                        cnt[i] += cnt[prev]
            max_len = max(max_len, dp[i])

        return sum(c for length, c in zip(dp, cnt) if length == max_len)`,
  java: `// Java Number of Longest Increasing Subsequences
// Time: O(N^2) | Space: O(N)
import java.util.Arrays;

class Solution {
    public int findNumberOfLIS(int[] nums) {
        int n = nums.length;
        if (n <= 1) return n;

        int[] dp = new int[n];
        int[] cnt = new int[n];
        Arrays.fill(dp, 1);
        Arrays.fill(cnt, 1);
        int maxLen = 1;

        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (nums[i] > nums[prev]) {
                    if (dp[prev] + 1 > dp[i]) {
                        dp[i] = dp[prev] + 1;
                        cnt[i] = cnt[prev];
                    } else if (dp[prev] + 1 == dp[i]) {
                        cnt[i] += cnt[prev];
                    }
                }
            }
            maxLen = Math.max(maxLen, dp[i]);
        }

        int totalCount = 0;
        for (int i = 0; i < n; i++) {
            if (dp[i] == maxLen) {
                totalCount += cnt[i];
            }
        }
        return totalCount;
    }
}`,
  javascript: `// JavaScript Number of Longest Increasing Subsequences
// Time: O(N^2) | Space: O(N)
var findNumberOfLIS = function(nums) {
    const n = nums.length;
    if (n <= 1) return n;

    const dp = new Array(n).fill(1);
    const cnt = new Array(n).fill(1);
    let maxLen = 1;

    for (let i = 0; i < n; i++) {
        for (let prev = 0; prev < i; prev++) {
            if (nums[i] > nums[prev]) {
                if (dp[prev] + 1 > dp[i]) {
                    dp[i] = dp[prev] + 1;
                    cnt[i] = cnt[prev];
                } else if (dp[prev] + 1 === dp[i]) {
                    cnt[i] += cnt[prev];
                }
            }
        }
        maxLen = Math.max(maxLen, dp[i]);
    }

    let totalCount = 0;
    for (let i = 0; i < n; i++) {
        if (dp[i] === maxLen) totalCount += cnt[i];
    }
    return totalCount;
};`
};

export const steps = [
  {
    title: '1. Initialize dp and cnt arrays for nums = [1, 3, 5, 4, 7]',
    phase: 'INIT',
    codeLine: 12,
    nums: [1, 3, 5, 4, 7],
    dp: [1, 1, 1, 1, 1],
    cnt: [1, 1, 1, 1, 1],
    currentI: -1,
    maxLen: 1,
    variables: { dp: '[1, 1, 1, 1, 1]', cnt: '[1, 1, 1, 1, 1]' },
    explain: 'Every single number is an increasing subsequence of length 1, so dp and cnt are initialized to 1.',
    intuition: 'We track both maximum length and the multiplicity of ways to achieve it.'
  },
  {
    title: '2. Process [1, 3, 5]: Linear increments',
    phase: 'EXTEND',
    codeLine: 20,
    nums: [1, 3, 5, 4, 7],
    dp: [1, 2, 3, 1, 1],
    cnt: [1, 1, 1, 1, 1],
    currentI: 2,
    maxLen: 3,
    variables: { 'Subsequence': '1 -> 3 -> 5', length: 3, count: 1 },
    explain: 'At index 2 (val 5): 5 > 3 > 1. dp[2] becomes 1 + dp[1] = 3, inheriting cnt[1] = 1.',
    intuition: 'Only 1 subsequence achieves length 3 so far: [1, 3, 5].'
  },
  {
    title: '3. Process 4: Parallel subsequence of length 3',
    phase: 'PARALLEL',
    codeLine: 20,
    nums: [1, 3, 5, 4, 7],
    dp: [1, 2, 3, 3, 1],
    cnt: [1, 1, 1, 1, 1],
    currentI: 3,
    maxLen: 3,
    variables: { 'Subsequence': '1 -> 3 -> 4', length: 3, count: 1 },
    explain: 'At index 3 (val 4): 4 > 3. dp[3] becomes 1 + dp[1] = 3 with cnt[3] = 1.',
    intuition: 'We now have TWO different paths reaching length 3: [1, 3, 5] and [1, 3, 4].'
  },
  {
    title: '4. Process 7: Combines both paths (cnt = 1 + 1 = 2)',
    phase: 'COMBINE',
    codeLine: 24,
    nums: [1, 3, 5, 4, 7],
    dp: [1, 2, 3, 3, 4],
    cnt: [1, 1, 1, 1, 2],
    currentI: 4,
    maxLen: 4,
    variables: { '7 extends [1,3,5]': 'len=4, cnt=1', '7 extends [1,3,4]': 'len=4, cnt=1', 'Total cnt[4]': 2 },
    explain: '7 can extend both [1, 3, 5] and [1, 3, 4]. Both give length 4. Since dp[prev] + 1 == dp[4], cnt[4] += cnt[3] => cnt[4] = 2.',
    intuition: 'When equal lengths meet, their count of occurrences adds up.'
  },
  {
    title: '5. Result: 2 Distinct Longest Subsequences of Length 4',
    phase: 'COMPLETED',
    codeLine: 35,
    nums: [1, 3, 5, 4, 7],
    dp: [1, 2, 3, 3, 4],
    cnt: [1, 1, 1, 1, 2],
    currentI: 4,
    maxLen: 4,
    totalLIS: 2,
    variables: { maxLen: 4, subsequences: '[[1, 3, 5, 7], [1, 3, 4, 7]]', result: 2 },
    explain: 'Only element 7 has length equal to maxLen = 4. Total count is cnt[4] = 2.',
    intuition: 'The 2 LISs are [1, 3, 5, 7] and [1, 3, 4, 7].'
  }
];

export default function NumberOfLongestIncreasingSubsequencesVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Max LIS Length: {step.maxLen}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Total Number of LIS: {step.totalLIS || (step.cnt[4] === 2 ? 2 : 1)}
        </span>
      </div>

      {/* Grid of Elements */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Elements with (dp = length, cnt = ways)
        </span>

        <div className="flex items-center justify-center gap-3 py-2">
          {step.nums.map((num, idx) => {
            const isCurrent = idx === step.currentI;
            const isMaxLen = step.dp[idx] === step.maxLen && step.maxLen > 1;

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div
                  className={`w-16 h-24 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                    isCurrent
                      ? 'border-cyan-500 bg-cyan-500/25 text-cyan-300 ring-2 ring-cyan-500/40 shadow-lg scale-105'
                      : isMaxLen
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/30'
                      : 'border-[#272b3c] bg-[#161824] text-slate-400'
                  }`}
                >
                  <span className="text-[9px] text-[#8a8ea3]">Idx {idx}</span>
                  <span className="text-base font-bold text-amber-300">{num}</span>
                  <div className="mt-1 flex flex-col items-center text-[10px]">
                    <span className="text-emerald-400 font-medium">len: {step.dp[idx]}</span>
                    <span className="text-purple-400 font-medium">cnt: {step.cnt[idx]}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

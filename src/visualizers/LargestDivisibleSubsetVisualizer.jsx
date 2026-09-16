import React from 'react';

export const meta = {
  title: 'Largest Divisible Subset',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(N)',
  description: 'Finds the largest subset of numbers where every pair (a, b) satisfies a % b == 0 or b % a == 0. By sorting the array first, the problem maps directly to LIS where nums[i] % nums[prev] == 0.'
};

export const solutions = {
  cpp: `// C++ Largest Divisible Subset
// Time: O(N^2) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return {};

        sort(nums.begin(), nums.end());
        vector<int> dp(n, 1);
        vector<int> parent(n);
        int maxLen = 1, lastIndex = 0;

        for (int i = 0; i < n; i++) {
            parent[i] = i;
            for (int prev = 0; prev < i; prev++) {
                if (nums[i] % nums[prev] == 0 && 1 + dp[prev] > dp[i]) {
                    dp[i] = 1 + dp[prev];
                    parent[i] = prev;
                }
            }
            if (dp[i] > maxLen) {
                maxLen = dp[i];
                lastIndex = i;
            }
        }

        vector<int> result;
        result.push_back(nums[lastIndex]);
        while (parent[lastIndex] != lastIndex) {
            lastIndex = parent[lastIndex];
            result.push_back(nums[lastIndex]);
        }

        reverse(result.begin(), result.end());
        return result;
    }
};`,
  python: `# Python 3 Largest Divisible Subset
# Time: O(N^2) | Space: O(N)
class Solution:
    def largestDivisibleSubset(self, nums: list[int]) -> list[int]:
        if not nums:
            return []

        nums.sort()
        n = len(nums)
        dp = [1] * n
        parent = list(range(n))
        max_len, last_index = 1, 0

        for i in range(n):
            for prev in range(i):
                if nums[i] % nums[prev] == 0 and 1 + dp[prev] > dp[i]:
                    dp[i] = 1 + dp[prev]
                    parent[i] = prev
            if dp[i] > max_len:
                max_len = dp[i]
                last_index = i

        result = [nums[last_index]]
        while parent[last_index] != last_index:
            last_index = parent[last_index]
            result.append(nums[last_index])

        return result[::-1]`,
  java: `// Java Largest Divisible Subset
// Time: O(N^2) | Space: O(N)
import java.util.Arrays;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {
    public List<Integer> largestDivisibleSubset(int[] nums) {
        if (nums.length == 0) return new ArrayList<>();

        Arrays.sort(nums);
        int n = nums.length;
        int[] dp = new int[n];
        int[] parent = new int[n];
        Arrays.fill(dp, 1);
        int maxLen = 1, lastIndex = 0;

        for (int i = 0; i < n; i++) {
            parent[i] = i;
            for (int prev = 0; prev < i; prev++) {
                if (nums[i] % nums[prev] == 0 && 1 + dp[prev] > dp[i]) {
                    dp[i] = 1 + dp[prev];
                    parent[i] = prev;
                }
            }
            if (dp[i] > maxLen) {
                maxLen = dp[i];
                lastIndex = i;
            }
        }

        List<Integer> result = new ArrayList<>();
        result.add(nums[lastIndex]);
        while (parent[lastIndex] != lastIndex) {
            lastIndex = parent[lastIndex];
            result.add(nums[lastIndex]);
        }

        Collections.reverse(result);
        return result;
    }
}`,
  javascript: `// JavaScript Largest Divisible Subset
// Time: O(N^2) | Space: O(N)
var largestDivisibleSubset = function(nums) {
    if (!nums.length) return [];

    nums.sort((a, b) => a - b);
    const n = nums.length;
    const dp = new Array(n).fill(1);
    const parent = Array.from({ length: n }, (_, i) => i);
    let maxLen = 1, lastIndex = 0;

    for (let i = 0; i < n; i++) {
        for (let prev = 0; prev < i; prev++) {
            if (nums[i] % nums[prev] === 0 && 1 + dp[prev] > dp[i]) {
                dp[i] = 1 + dp[prev];
                parent[i] = prev;
            }
        }
        if (dp[i] > maxLen) {
            maxLen = dp[i];
            lastIndex = i;
        }
    }

    const result = [nums[lastIndex]];
    while (parent[lastIndex] !== lastIndex) {
        lastIndex = parent[lastIndex];
        result.push(nums[lastIndex]);
    }

    return result.reverse();
};`
};

export const steps = [
  {
    title: '1. Input: [1, 16, 7, 8, 4], Sort -> [1, 4, 7, 8, 16]',
    phase: 'SORT',
    codeLine: 13,
    sortedNums: [1, 4, 7, 8, 16],
    dp: [1, 1, 1, 1, 1],
    parent: [0, 1, 2, 3, 4],
    maxLen: 1,
    variables: { original: '[1, 16, 7, 8, 4]', sorted: '[1, 4, 7, 8, 16]' },
    explain: 'Sorting ensures transitivity: if a % b == 0 and b % c == 0, then a % c == 0. We only need to check nums[i] % nums[prev] == 0.',
    intuition: 'Sorted order transforms pairwise divisibility into a linear subsequence problem.'
  },
  {
    title: '2. Process Divisibility: 4 % 1 == 0 -> dp[1] = 2, Parent = 0',
    phase: 'EXTEND',
    codeLine: 20,
    sortedNums: [1, 4, 7, 8, 16],
    dp: [1, 2, 1, 1, 1],
    parent: [0, 0, 2, 3, 4],
    maxLen: 2,
    variables: { i: 1, num: 4, prev: 0, prevNum: 1, divCheck: '4 % 1 == 0 (Valid)' },
    explain: 'Element 4 is divisible by 1. dp[1] extends to 2, parent pointer points to 0.',
    intuition: 'Chain: 1 -> 4.'
  },
  {
    title: '3. Chain Extensions: 8 % 4 == 0 (dp=3), 16 % 8 == 0 (dp=4)',
    phase: 'CHAIN',
    codeLine: 20,
    sortedNums: [1, 4, 7, 8, 16],
    dp: [1, 2, 1, 3, 4],
    parent: [0, 0, 2, 1, 3],
    maxLen: 4,
    variables: { '8 parent': '4 (idx 1)', '16 parent': '8 (idx 3)', maxChainLen: 4 },
    explain: '16 divides 8, which divides 4, which divides 1. Chain length reaches 4! Element 7 only divides 1 (dp=2).',
    intuition: 'Longest chain accumulates: 1 -> 4 -> 8 -> 16.'
  },
  {
    title: '4. Backtrack & Result: Largest Divisible Subset = [1, 4, 8, 16]',
    phase: 'COMPLETED',
    codeLine: 35,
    sortedNums: [1, 4, 7, 8, 16],
    dp: [1, 2, 1, 3, 4],
    parent: [0, 0, 2, 1, 3],
    maxLen: 4,
    subset: [1, 4, 8, 16],
    variables: { largestSubset: '[1, 4, 8, 16]', size: 4 },
    explain: 'Tracing parent pointers backwards from index 4: 16 -> 8 -> 4 -> 1. Reversing yields [1, 4, 8, 16]!',
    intuition: 'Every pair in [1, 4, 8, 16] divides each other cleanly.'
  }
];

export default function LargestDivisibleSubsetVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Sorted Elements: [{step.sortedNums.join(', ')}]
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Subset Size: {step.maxLen}
        </span>
      </div>

      {/* Divisible Subset Chain Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Divisible Subset Chain & DP States
        </span>

        <div className="flex items-center justify-center gap-3 py-2">
          {step.sortedNums.map((num, idx) => {
            const isTarget = step.subset && step.subset.includes(num);

            return (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-16 h-22 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                    isTarget
                      ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg scale-105'
                      : 'border-[#272b3c] bg-[#161824] text-slate-400'
                  }`}
                >
                  <span className="text-[9px] text-[#8a8ea3]">Idx {idx}</span>
                  <span className="text-sm font-bold text-amber-300 mt-0.5">{num}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold mt-1">
                    DP: {step.dp[idx]}
                  </span>
                  <span className="text-[8px] text-purple-400">
                    P: {step.parent[idx]}
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

import React from 'react';

export const meta = {
  title: 'Partition Array for Maximum Sum',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N * K)',
  spaceComplexity: 'O(N)',
  description: 'Partitions an array into contiguous subarrays of length at most K such that every element in a subarray is changed to the maximum value in that subarray, maximizing the total sum.'
};

export const solutions = {
  cpp: `// C++ Partition Array for Maximum Sum
// Time: O(N * K) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
    int solve(int i, int k, vector<int>& arr, vector<int>& dp) {
        int n = arr.size();
        if (i == n) return 0;
        if (dp[i] != -1) return dp[i];

        int maxVal = 0, maxSum = 0;
        for (int len = 1; len <= k && i + len <= n; len++) {
            maxVal = max(maxVal, arr[i + len - 1]);
            int sum = len * maxVal + solve(i + len, k, arr, dp);
            maxSum = max(maxSum, sum);
        }
        return dp[i] = maxSum;
    }
public:
    int maxSumAfterPartitioning(vector<int>& arr, int k) {
        int n = arr.size();
        vector<int> dp(n, -1);
        return solve(0, k, arr, dp);
    }
};`,
  python: `# Python 3 Partition Array for Maximum Sum
# Time: O(N * K) | Space: O(N)
class Solution:
    def maxSumAfterPartitioning(self, arr: list[int], k: int) -> int:
        n = len(arr)
        dp = [-1] * n

        def solve(i: int) -> int:
            if i == n:
                return 0
            if dp[i] != -1:
                return dp[i]

            max_val = 0
            max_sum = 0
            for length in range(1, min(k, n - i) + 1):
                max_val = max(max_val, arr[i + length - 1])
                curr_sum = length * max_val + solve(i + length)
                max_sum = max(max_sum, curr_sum)

            dp[i] = max_sum
            return max_sum

        return solve(0)`,
  java: `// Java Partition Array for Maximum Sum
// Time: O(N * K) | Space: O(N)
import java.util.Arrays;

class Solution {
    private int solve(int i, int k, int[] arr, int[] dp) {
        int n = arr.length;
        if (i == n) return 0;
        if (dp[i] != -1) return dp[i];

        int maxVal = 0, maxSum = 0;
        for (int len = 1; len <= k && i + len <= n; len++) {
            maxVal = Math.max(maxVal, arr[i + len - 1]);
            int sum = len * maxVal + solve(i + len, k, arr, dp);
            maxSum = Math.max(maxSum, sum);
        }
        return dp[i] = maxSum;
    }

    public int maxSumAfterPartitioning(int[] arr, int k) {
        int n = arr.length;
        int[] dp = new int[n];
        Arrays.fill(dp, -1);
        return solve(0, k, arr, dp);
    }
}`,
  javascript: `// JavaScript Partition Array for Maximum Sum
// Time: O(N * K) | Space: O(N)
var maxSumAfterPartitioning = function(arr, k) {
    const n = arr.length;
    const dp = new Array(n).fill(-1);

    function solve(i) {
        if (i === n) return 0;
        if (dp[i] !== -1) return dp[i];

        let maxVal = 0, maxSum = 0;
        for (let len = 1; len <= k && i + len <= n; len++) {
            maxVal = Math.max(maxVal, arr[i + len - 1]);
            const sum = len * maxVal + solve(i + len);
            maxSum = Math.max(maxSum, sum);
        }
        return dp[i] = maxSum;
    }

    return solve(0);
};`
};

export const steps = [
  {
    title: '1. Problem Setup: arr = [1, 15, 7, 9, 2, 5, 10], k = 3',
    phase: 'INIT',
    codeLine: 24,
    arr: [1, 15, 7, 9, 2, 5, 10],
    k: 3,
    partitions: [],
    transformedArr: [1, 15, 7, 9, 2, 5, 10],
    totalSum: 0,
    variables: { arr: '[1, 15, 7, 9, 2, 5, 10]', k: 3, strategy: 'Front Partition DP of length 1..k' },
    explain: 'At index i, we can choose a subarray of length 1, 2, or 3. Elements within that partition are all boosted to the subarray maximum.',
    intuition: 'Grouping small values next to large values transforms them into high-value contributors.'
  },
  {
    title: '2. Partitioning [1, 15, 7]: Max value is 15',
    phase: 'PARTITION_1',
    codeLine: 16,
    arr: [1, 15, 7, 9, 2, 5, 10],
    k: 3,
    partitions: [[1, 15, 7]],
    transformedArr: [15, 15, 15, 9, 2, 5, 10],
    totalSum: 45,
    variables: { 'Subarray 1': '[1, 15, 7]', 'Max': 15, 'Contributed sum': '3 * 15 = 45' },
    explain: 'Choosing length 3 for the first partition captures 15. The subarray becomes [15, 15, 15], contributing 45 to the sum.',
    intuition: 'The value 1 elevates both 1 and 7 into 15.'
  },
  {
    title: '3. Partitioning [9, 2, 5]: Max value is 9',
    phase: 'PARTITION_2',
    codeLine: 16,
    arr: [1, 15, 7, 9, 2, 5, 10],
    k: 3,
    partitions: [[1, 15, 7], [9, 2, 5]],
    transformedArr: [15, 15, 15, 9, 9, 9, 10],
    totalSum: 72,
    variables: { 'Subarray 2': '[9, 2, 5]', 'Max': 9, 'Contributed sum': '3 * 9 = 27', 'Cumulative': '45 + 27 = 72' },
    explain: 'Taking [9, 2, 5] of length 3 boosts 2 and 5 to 9: contributing 3 * 9 = 27.',
    intuition: 'Each element 2 and 5 is replaced with 9.'
  },
  {
    title: '4. Final Partition [10]: Maximum Sum = 84',
    phase: 'COMPLETED',
    codeLine: 26,
    arr: [1, 15, 7, 9, 2, 5, 10],
    k: 3,
    partitions: [[1, 15, 7], [9, 2, 5], [10]],
    transformedArr: [15, 15, 15, 9, 9, 9, 10],
    totalSum: 84,
    variables: { 'Subarray 3': '[10]', 'Max': 10, 'Contributed sum': '1 * 10 = 10', 'Final Max Sum': 84 },
    explain: 'The final single element [10] contributes 10. Total maximum sum after optimal partitioning is 45 + 27 + 10 = 84!',
    intuition: 'Optimal grouping maximizes the multiplier on larger array elements.'
  }
];

export default function PartitionArrayForMaximumSumVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Max Subarray Size (k): {step.k}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Partition Sum: {step.totalSum || 84}
        </span>
      </div>

      {/* Transformed Array Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-5 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Array Partition Blocks & Replacements
        </span>

        {/* Array Elements with Partition Colors */}
        <div className="flex flex-wrap items-center justify-center gap-2 py-2">
          {step.transformedArr.map((val, idx) => {
            const originalVal = step.arr[idx];
            const isBoosted = val > originalVal;

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div
                  className={`w-14 h-20 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                    isBoosted
                      ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg scale-105'
                      : 'border-[#3b4261] bg-[#161824] text-amber-300'
                  }`}
                >
                  <span className="text-[9px] text-[#8a8ea3]">arr[{idx}]</span>
                  <span className="text-base font-bold mt-0.5">{val}</span>
                  {isBoosted && (
                    <span className="text-[8px] text-emerald-400 mt-1">
                      was {originalVal}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Partition Segments */}
        {step.partitions.length > 0 && (
          <div className="w-full border-t border-[#272b3c] pt-4 flex flex-col items-center gap-2">
            <span className="text-[11px] font-mono text-purple-300">
              Formed Partitions:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-cyan-300">
              {step.partitions.map((part, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-[#161824] border border-[#272b3c]"
                >
                  [{part.join(', ')}] &rarr; max {Math.max(...part)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

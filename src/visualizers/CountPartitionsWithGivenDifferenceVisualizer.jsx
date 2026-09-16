import React from 'react';

export const meta = {
  title: 'Count Partitions with Given Difference',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N * Target)',
  spaceComplexity: 'O(Target)',
  description: 'Counts the number of partitions of an array into two subsets S1 and S2 such that sum(S1) - sum(S2) = D. Mathematically transforms into finding the number of subsets with sum equal to (TotalSum + D) / 2.'
};

export const solutions = {
  cpp: `// C++ Count Partitions with Given Difference
// Time: O(N * Target) | Space: O(Target)
#include <vector>
#include <numeric>
using namespace std;

class Solution {
    const int MOD = 1e9 + 7;
public:
    int countPartitions(int n, int d, vector<int>& arr) {
        int totalSum = accumulate(arr.begin(), arr.end(), 0);
        if (totalSum - d < 0 || (totalSum + d) % 2 != 0) return 0;

        int target = (totalSum + d) / 2;
        vector<int> dp(target + 1, 0);

        if (arr[0] == 0) dp[0] = 2;
        else {
            dp[0] = 1;
            if (arr[0] <= target) dp[arr[0]] = 1;
        }

        for (int i = 1; i < n; i++) {
            vector<int> cur(target + 1, 0);
            for (int t = 0; t <= target; t++) {
                int notTaken = dp[t];
                int taken = (arr[i] <= t) ? dp[t - arr[i]] : 0;
                cur[t] = (notTaken + taken) % MOD;
            }
            dp = cur;
        }

        return dp[target];
    }
};`,
  python: `# Python 3 Count Partitions with Given Difference
# Time: O(N * Target) | Space: O(Target)
class Solution:
    def countPartitions(self, n: int, d: int, arr: list[int]) -> int:
        MOD = 10**9 + 7
        total_sum = sum(arr)
        if total_sum - d < 0 or (total_sum + d) % 2 != 0:
            return 0

        target = (total_sum + d) // 2
        dp = [0] * (target + 1)
        dp[0] = 2 if arr[0] == 0 else 1
        if arr[0] != 0 and arr[0] <= target:
            dp[arr[0]] = 1

        for i in range(1, n):
            cur = [0] * (target + 1)
            for t in range(target + 1):
                not_taken = dp[t]
                taken = dp[t - arr[i]] if arr[i] <= t else 0
                cur[t] = (not_taken + taken) % MOD
            dp = cur

        return dp[target]`,
  java: `// Java Count Partitions with Given Difference
// Time: O(N * Target) | Space: O(Target)
class Solution {
    private static final int MOD = 1_000_000_007;

    public int countPartitions(int n, int d, int[] arr) {
        int totalSum = 0;
        for (int x : arr) totalSum += x;
        if (totalSum - d < 0 || (totalSum + d) % 2 != 0) return 0;

        int target = (totalSum + d) / 2;
        int[] dp = new int[target + 1];

        if (arr[0] == 0) dp[0] = 2;
        else {
            dp[0] = 1;
            if (arr[0] <= target) dp[arr[0]] = 1;
        }

        for (int i = 1; i < n; i++) {
            int[] cur = new int[target + 1];
            for (int t = 0; t <= target; t++) {
                int notTaken = dp[t];
                int taken = (arr[i] <= t) ? dp[t - arr[i]] : 0;
                cur[t] = (notTaken + taken) % MOD;
            }
            dp = cur;
        }

        return dp[target];
    }
}`,
  javascript: `// JavaScript Count Partitions with Given Difference
// Time: O(N * Target) | Space: O(Target)
var countPartitions = function(n, d, arr) {
    const MOD = 1e9 + 7;
    const totalSum = arr.reduce((a, b) => a + b, 0);
    if (totalSum - d < 0 || (totalSum + d) % 2 !== 0) return 0;

    const target = Math.floor((totalSum + d) / 2);
    let dp = new Array(target + 1).fill(0);

    if (arr[0] === 0) dp[0] = 2;
    else {
        dp[0] = 1;
        if (arr[0] <= target) dp[arr[0]] = 1;
    }

    for (let i = 1; i < n; i++) {
        const cur = new Array(target + 1).fill(0);
        for (let t = 0; t <= target; t++) {
            const notTaken = dp[t];
            const taken = arr[i] <= t ? dp[t - arr[i]] : 0;
            cur[t] = (notTaken + taken) % MOD;
        }
        dp = cur;
    }

    return dp[target];
};`
};

export const steps = [
  {
    title: '1. Array: [5, 2, 6, 4], D = 3, Total Sum = 17',
    phase: 'INITIAL',
    codeLine: 13,
    arr: [5, 2, 6, 4],
    d: 3,
    totalSum: 17,
    target: 10,
    dpCount: 0,
    variables: { totalSum: 17, d: 3, formula: '(17 + 3) / 2 = 10', target: 10 },
    explain: 'Equations: S1 + S2 = 17 and S1 - S2 = 3. Adding gives 2 * S1 = 20 -> S1 = 10. We must find subsets summing to 10.',
    intuition: 'Target sum derived algebraically.'
  },
  {
    title: '2. Check Validity: (17 - 3) >= 0 and (17 + 3) is Even -> VALID',
    phase: 'VALIDATE',
    codeLine: 14,
    arr: [5, 2, 6, 4],
    d: 3,
    totalSum: 17,
    target: 10,
    dpCount: 0,
    variables: { isValid: 'TotalSum - D >= 0 (14 >= 0) and Even (20 % 2 == 0)' },
    explain: 'Both conditions pass. If totalSum - d < 0 or (totalSum + d) is odd, partition is impossible (returns 0).',
    intuition: 'Guarantees whole integer subset partitions.'
  },
  {
    title: '3. Subset Sum DP: Subsets summing to 10 found: [6, 4] and [5, 2, ?]',
    phase: 'PROCESS',
    codeLine: 29,
    arr: [5, 2, 6, 4],
    d: 3,
    totalSum: 17,
    target: 10,
    dpCount: 1,
    variables: { match1: '[6, 4] -> sum 10, remaining [5, 2] -> sum 7. Difference 10 - 7 = 3' },
    explain: 'Partition 1: S1 = [6, 4] (sum 10), S2 = [5, 2] (sum 7). Difference is 10 - 7 = 3.',
    intuition: 'Direct match for difference requirement.'
  },
  {
    title: '4. Final Result: 1 Valid Partition with Difference 3',
    phase: 'COMPLETED',
    codeLine: 35,
    arr: [5, 2, 6, 4],
    d: 3,
    totalSum: 17,
    target: 10,
    dpCount: 1,
    variables: { totalPartitions: 1, partition: '{6, 4} and {5, 2}' },
    explain: 'Exactly 1 valid partition exists satisfying S1 - S2 = 3. Returning 1.',
    intuition: 'Solved in O(N * Target) time.'
  }
];

export default function CountPartitionsWithGivenDifferenceVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Target Diff D = {step.d} | S1 Target = {step.target}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Valid Partitions: {step.dpCount}
        </span>
      </div>

      {/* Partition Display Card */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-5 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Subset Partition with Difference {step.d}
        </span>

        <div className="w-full flex items-center justify-around gap-4 pt-2">
          {/* S1 */}
          <div className="flex-1 bg-[#161824] border border-emerald-500/40 rounded-2xl p-4 flex flex-col items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400">Subset S1 (Sum = 10)</span>
            <div className="flex items-center gap-2">
              {[6, 4].map((num, idx) => (
                <span key={idx} className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold flex items-center justify-center text-xs font-mono">
                  {num}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-slate-500 font-mono text-lg font-bold">−</span>
            <span className="text-[10px] text-amber-400 font-mono font-bold mt-1">Diff = 3</span>
          </div>

          {/* S2 */}
          <div className="flex-1 bg-[#161824] border border-blue-500/40 rounded-2xl p-4 flex flex-col items-center gap-2">
            <span className="text-xs font-mono font-bold text-blue-400">Subset S2 (Sum = 7)</span>
            <div className="flex items-center gap-2">
              {[5, 2].map((num, idx) => (
                <span key={idx} className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 font-bold flex items-center justify-center text-xs font-mono">
                  {num}
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

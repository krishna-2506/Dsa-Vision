import React from 'react';

export const meta = {
  title: 'Burst Balloons',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N^3)',
  spaceComplexity: 'O(N^2)',
  description: 'Finds the maximum coins obtained by bursting balloons. By thinking in reverse (which balloon is burst LAST in a subsegment), subproblems become completely independent.'
};

export const solutions = {
  cpp: `// C++ Burst Balloons
// Time: O(N^3) | Space: O(N^2)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
    int solve(int i, int j, vector<int>& nums, vector<vector<int>>& dp) {
        if (i > j) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        int maxi = 0;
        for (int k = i; k <= j; k++) {
            int coins = nums[i - 1] * nums[k] * nums[j + 1]
                      + solve(i, k - 1, nums, dp)
                      + solve(k + 1, j, nums, dp);
            maxi = max(maxi, coins);
        }
        return dp[i][j] = maxi;
    }
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        nums.insert(nums.begin(), 1);
        nums.push_back(1);
        vector<vector<int>> dp(n + 2, vector<int>(n + 2, -1));
        return solve(1, n, nums, dp);
    }
};`,
  python: `# Python 3 Burst Balloons
# Time: O(N^3) | Space: O(N^2)
class Solution:
    def maxCoins(self, nums: list[int]) -> int:
        A = [1] + nums + [1]
        n = len(nums)
        dp = [[-1] * (n + 2) for _ in range(n + 2)]

        def solve(i: int, j: int) -> int:
            if i > j:
                return 0
            if dp[i][j] != -1:
                return dp[i][j]

            maxi = 0
            for k in range(i, j + 1):
                coins = A[i - 1] * A[k] * A[j + 1] + solve(i, k - 1) + solve(k + 1, j)
                maxi = max(maxi, coins)

            dp[i][j] = maxi
            return maxi

        return solve(1, n)`,
  java: `// Java Burst Balloons
// Time: O(N^3) | Space: O(N^2)
import java.util.Arrays;

class Solution {
    private int solve(int i, int j, int[] arr, int[][] dp) {
        if (i > j) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        int maxi = 0;
        for (int k = i; k <= j; k++) {
            int coins = arr[i - 1] * arr[k] * arr[j + 1]
                      + solve(i, k - 1, arr, dp)
                      + solve(k + 1, j, arr, dp);
            maxi = Math.max(maxi, coins);
        }
        return dp[i][j] = maxi;
    }

    public int maxCoins(int[] nums) {
        int n = nums.length;
        int[] arr = new int[n + 2];
        arr[0] = 1;
        arr[n + 1] = 1;
        for (int idx = 0; idx < n; idx++) arr[idx + 1] = nums[idx];

        int[][] dp = new int[n + 2][n + 2];
        for (int[] row : dp) Arrays.fill(row, -1);
        return solve(1, n, arr, dp);
    }
}`,
  javascript: `// JavaScript Burst Balloons
// Time: O(N^3) | Space: O(N^2)
var maxCoins = function(nums) {
    const n = nums.length;
    const arr = [1, ...nums, 1];
    const dp = Array.from({ length: n + 2 }, () => new Array(n + 2).fill(-1));

    function solve(i, j) {
        if (i > j) return 0;
        if (dp[i][j] !== -1) return dp[i][j];

        let maxi = 0;
        for (let k = i; k <= j; k++) {
            const coins = arr[i - 1] * arr[k] * arr[j + 1]
                        + solve(i, k - 1)
                        + solve(k + 1, j);
            maxi = Math.max(maxi, coins);
        }
        return dp[i][j] = maxi;
    }

    return solve(1, n);
};`
};

export const steps = [
  {
    title: '1. Problem Setup: nums = [3, 1, 5, 8], Padded with 1s',
    phase: 'INIT',
    codeLine: 24,
    balloons: [1, 3, 1, 5, 8, 1],
    i: 1,
    j: 4,
    lastBurstK: null,
    totalCoins: 0,
    variables: { original: '[3, 1, 5, 8]', padded: '[1, 3, 1, 5, 8, 1]', strategy: 'Reverse thinking (last balloon to burst)' },
    explain: 'Bursting from front-to-back causes balloon neighbors to dynamically shift, creating dependencies. Reversing the perspective (deciding which balloon is burst LAST) keeps boundaries fixed!',
    intuition: 'If balloon k is burst last in [i, j], its neighbors are guaranteed to be nums[i - 1] and nums[j + 1].'
  },
  {
    title: '2. Subsegment Length 1: Single Balloons',
    phase: 'BASE_CASES',
    codeLine: 13,
    balloons: [1, 3, 1, 5, 8, 1],
    i: 2,
    j: 2,
    lastBurstK: 2,
    totalCoins: 15,
    variables: { 'Single balloon 1 (idx 2)': '1 * 1 * 5 = 5 (if adjacent to 1 and 5) or 3*1*5 = 15' },
    explain: 'For single balloons, there is only one choice: burst it last. Cost is nums[i-1] * nums[i] * nums[i+1].',
    intuition: 'Individual balloons form the base foundation for longer ranges.'
  },
  {
    title: '3. Partition Evaluation: Choosing Last Balloon in [1, 4]',
    phase: 'PARTITION',
    codeLine: 16,
    balloons: [1, 3, 1, 5, 8, 1],
    i: 1,
    j: 4,
    lastBurstK: 4,
    totalCoins: 159,
    variables: { 'k=4 (val 8)': 'coins from left subproblems + 1 * 8 * 1', maxSoFar: 159 },
    explain: 'Testing each balloon k in {1, 2, 3, 4} to be the LAST one burst in the range. If k=4 (val 8) is last, coins = dp(1, 3) + 1 * 8 * 1 = 159.',
    intuition: 'Compare all choices k to maximize total coin accumulation.'
  },
  {
    title: '4. Global Maximum Result: 167 Coins',
    phase: 'COMPLETED',
    codeLine: 27,
    balloons: [1, 3, 1, 5, 8, 1],
    i: 1,
    j: 4,
    lastBurstK: 3,
    totalCoins: 167,
    burstOrder: [2, 1, 4, 3],
    variables: { 'Optimal order': 'Burst 1 (idx 2) -> Burst 5 (idx 3) -> Burst 3 (idx 1) -> Burst 8 (idx 4)', maxCoins: 167 },
    explain: 'Bursting sequence: 1 (val 1) -> 3*1*5=15; then 5 (val 5) -> 3*5*8=120; then 3 (val 3) -> 1*3*8=24; then 8 (val 8) -> 1*8*1=8. Total = 15 + 120 + 24 + 8 = 167 coins!',
    intuition: 'Leaving large numbers (like 8 and 3) alive longer yields massive multiplicative returns.'
  }
];

export default function BurstBalloonsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Strategy: Reverse Bursting DP
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Coins: {step.totalCoins}
        </span>
      </div>

      {/* Balloons Row */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Padded Balloon Lineup
        </span>

        <div className="flex items-center justify-center gap-3 py-2">
          {step.balloons.map((val, idx) => {
            const isBoundary = idx === 0 || idx === step.balloons.length - 1;
            const isLastBurst = idx === step.lastBurstK;

            return (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-14 h-20 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                    isLastBurst
                      ? 'border-amber-400 bg-amber-400/25 text-amber-300 ring-2 ring-amber-400/50 shadow-lg scale-110'
                      : isBoundary
                      ? 'border-purple-500/40 bg-purple-500/10 text-purple-400'
                      : 'border-[#3b4261] bg-[#161824] text-cyan-300'
                  }`}
                >
                  <span className="text-[9px] text-[#8a8ea3]">
                    {isBoundary ? 'Pad' : `B[${idx}]`}
                  </span>
                  <span className="text-lg font-bold mt-1">{val}</span>
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

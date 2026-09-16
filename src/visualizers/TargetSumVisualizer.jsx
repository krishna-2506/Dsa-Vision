import React from 'react';

export const meta = {
  title: 'Target Sum',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N * S1)',
  spaceComplexity: 'O(S1)',
  description: 'Assigns + or - signs to elements of an array such that the expression evaluates to the target sum. Reduces to counting partitions with difference equal to Target: S1 = (TotalSum + Target) / 2.'
};

export const solutions = {
  cpp: `// C++ Target Sum
// Time: O(N * S1) | Space: O(S1)
#include <vector>
#include <numeric>
#include <cmath>
using namespace std;

class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int totalSum = accumulate(nums.begin(), nums.end(), 0);
        if (totalSum - target < 0 || (totalSum + target) % 2 != 0) return 0;

        int s1 = (totalSum + target) / 2;
        vector<int> dp(s1 + 1, 0);
        dp[0] = 1;

        for (int num : nums) {
            for (int s = s1; s >= num; s--) {
                dp[s] += dp[s - num];
            }
        }

        return dp[s1];
    }
};`,
  python: `# Python 3 Target Sum
# Time: O(N * S1) | Space: O(S1)
class Solution:
    def findTargetSumWays(self, nums: list[int], target: int) -> int:
        total_sum = sum(nums)
        if total_sum - target < 0 or (total_sum + target) % 2 != 0:
            return 0

        s1 = (total_sum + target) // 2
        dp = [0] * (s1 + 1)
        dp[0] = 1

        for num in nums:
            for s in range(s1, num - 1, -1):
                dp[s] += dp[s - num]

        return dp[s1]`,
  java: `// Java Target Sum
// Time: O(N * S1) | Space: O(S1)
class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        int totalSum = 0;
        for (int num : nums) totalSum += num;
        if (totalSum - target < 0 || (totalSum + target) % 2 != 0) return 0;

        int s1 = (totalSum + target) / 2;
        int[] dp = new int[s1 + 1];
        dp[0] = 1;

        for (int num : nums) {
            for (int s = s1; s >= num; s--) {
                dp[s] += dp[s - num];
            }
        }

        return dp[s1];
    }
}`,
  javascript: `// JavaScript Target Sum
// Time: O(N * S1) | Space: O(S1)
var findTargetSumWays = function(nums, target) {
    const totalSum = nums.reduce((a, b) => a + b, 0);
    if (totalSum - target < 0 || (totalSum + target) % 2 !== 0) return 0;

    const s1 = Math.floor((totalSum + target) / 2);
    const dp = new Array(s1 + 1).fill(0);
    dp[0] = 1;

    for (const num of nums) {
        for (let s = s1; s >= num; s--) {
            dp[s] += dp[s - num];
        }
    }

    return dp[s1];
};`
};

export const steps = [
  {
    title: '1. Array: [1, 1, 1, 1, 1], Target = 3',
    phase: 'INITIAL',
    codeLine: 13,
    nums: [1, 1, 1, 1, 1],
    target: 3,
    totalSum: 5,
    s1: 4,
    dp: [1, 0, 0, 0, 0],
    variables: { totalSum: 5, target: 3, 'Derived S1': '(5 + 3) / 2 = 4' },
    explain: 'Assigning signs divides elements into positive subset S1 and negative subset S2. S1 - S2 = 3 and S1 + S2 = 5 -> S1 = 4.',
    intuition: 'Target Sum is mathematically identical to Count Partitions with Difference D.'
  },
  {
    title: '2. Check Pre-conditions: TotalSum >= Target and (TotalSum + Target) % 2 == 0',
    phase: 'VALIDATE',
    codeLine: 14,
    nums: [1, 1, 1, 1, 1],
    target: 3,
    totalSum: 5,
    s1: 4,
    dp: [1, 0, 0, 0, 0],
    variables: { condition1: '5 >= 3 (True)', condition2: '(5 + 3) % 2 == 0 (True)' },
    explain: 'Both mathematical parity and range checks hold true. S1 = 4 is an integer.',
    intuition: 'If parity fails, 0 ways exist.'
  },
  {
    title: '3. Process 1s: DP counts combinations of choosing four 1s from five',
    phase: 'COMBINATIONS',
    codeLine: 22,
    nums: [1, 1, 1, 1, 1],
    target: 3,
    totalSum: 5,
    s1: 4,
    dp: [1, 5, 10, 10, 5],
    variables: { 'dp[4]': 'C(5, 4) = 5 ways' },
    explain: 'We need exactly four + signs and one - sign. Number of ways to pick four + signs out of 5 positions is 5.',
    intuition: 'Every choice of four + signs gives sum: (+1+1+1+1 -1) = 3.'
  },
  {
    title: '4. Final Result: 5 Distinct Expressions Equal to Target 3',
    phase: 'COMPLETED',
    codeLine: 26,
    nums: [1, 1, 1, 1, 1],
    target: 3,
    totalSum: 5,
    s1: 4,
    dp: [1, 5, 10, 10, 5],
    variables: { waysToTarget: 5, sampleExpression: '+1 + 1 + 1 + 1 - 1 = 3' },
    explain: 'There are 5 different ways to assign signs to reach target 3: each corresponds to placing the minus sign at a different index.',
    intuition: 'Complete solution runs in O(N * S1) time and O(S1) space.'
  }
];

export default function TargetSumVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Target = {step.target} | Target S1 = {step.s1}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Ways: {step.dp[step.s1]}
        </span>
      </div>

      {/* Signs Expression Preview */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Expression Sign Assignment (+ / -)
        </span>

        <div className="flex items-center justify-center gap-2 py-2">
          {step.nums.map((num, idx) => {
            const isMinus = idx === 4 && step.phase === 'COMPLETED';

            return (
              <div key={idx} className="flex items-center gap-2">
                <div
                  className={`w-14 h-18 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                    isMinus
                      ? 'border-rose-500/60 bg-rose-500/20 text-rose-300'
                      : 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300'
                  }`}
                >
                  <span className="text-sm font-bold">{isMinus ? '−' : '+'}</span>
                  <span className="text-sm font-bold text-amber-300">{num}</span>
                </div>
              </div>
            );
          })}
          <span className="text-slate-500 font-mono text-xl font-bold ml-2">=</span>
          <div className="w-14 h-18 rounded-2xl border border-emerald-500 bg-emerald-500/25 text-emerald-300 font-bold flex items-center justify-center text-lg font-mono">
            {step.target}
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

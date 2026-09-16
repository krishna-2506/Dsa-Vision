import React from 'react';

export const meta = {
  title: 'Maximum Sum of Non-Adjacent Elements',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the maximum sum of a subsequence such that no two elements are adjacent. Uses the classic Pick vs. Not-Pick Dynamic Programming paradigm.'
};

export const solutions = {
  cpp: `// C++ Maximum Sum of Non-Adjacent Elements
// Time: O(N) | Space: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maximumNonAdjacentSum(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return 0;
        int prev = nums[0];
        int prev2 = 0;

        for (int i = 1; i < n; i++) {
            int pick = nums[i] + (i > 1 ? prev2 : 0);
            int notPick = prev;
            int cur = max(pick, notPick);
            prev2 = prev;
            prev = cur;
        }

        return prev;
    }
};`,
  python: `# Python 3 Maximum Sum of Non-Adjacent Elements
# Time: O(N) | Space: O(1)
class Solution:
    def maximumNonAdjacentSum(self, nums: list[int]) -> int:
        n = len(nums)
        if n == 0:
            return 0
        prev = nums[0]
        prev2 = 0

        for i in range(1, n):
            pick = nums[i] + (prev2 if i > 1 else 0)
            not_pick = prev
            cur = max(pick, not_pick)
            prev2 = prev
            prev = cur

        return prev`,
  java: `// Java Maximum Sum of Non-Adjacent Elements
// Time: O(N) | Space: O(1)
class Solution {
    public int maximumNonAdjacentSum(int[] nums) {
        int n = nums.length;
        if (n == 0) return 0;
        int prev = nums[0];
        int prev2 = 0;

        for (int i = 1; i < n; i++) {
            int pick = nums[i] + (i > 1 ? prev2 : 0);
            int notPick = prev;
            int cur = Math.max(pick, notPick);
            prev2 = prev;
            prev = cur;
        }

        return prev;
    }
}`,
  javascript: `// JavaScript Maximum Sum of Non-Adjacent Elements
// Time: O(N) | Space: O(1)
var maximumNonAdjacentSum = function(nums) {
    const n = nums.length;
    if (n === 0) return 0;
    let prev = nums[0];
    let prev2 = 0;

    for (let i = 1; i < n; i++) {
        const pick = nums[i] + (i > 1 ? prev2 : 0);
        const notPick = prev;
        const cur = Math.max(pick, notPick);
        prev2 = prev;
        prev = cur;
    }

    return prev;
};`
};

export const steps = [
  {
    title: '1. Array: [2, 1, 4, 9], Base Step: nums[0] = 2',
    phase: 'INITIAL',
    codeLine: 12,
    nums: [2, 1, 4, 9],
    activeI: 0,
    dp: [2, null, null, null],
    pick: 2,
    notPick: 0,
    decision: 'Pick nums[0]',
    variables: { i: 0, 'nums[0]': 2, prev: 2, prev2: 0 },
    explain: 'Starting at index 0, only 1 element is available. We pick nums[0] = 2. dp[0] = 2.',
    intuition: 'Base cases: prev = nums[0], prev2 = 0.'
  },
  {
    title: '2. Index 1 (val=1): Pick (1+0=1) vs Not Pick (prev=2) -> Max = 2',
    phase: 'COMPUTE',
    codeLine: 17,
    nums: [2, 1, 4, 9],
    activeI: 1,
    dp: [2, 2, null, null],
    pick: 1,
    notPick: 2,
    decision: 'Skip nums[1] (Keep 2)',
    variables: { i: 1, pick: '1 + 0 = 1', notPick: 2, 'dp[1]': 2 },
    explain: 'Picking nums[1] gives 1. Skipping gives prev = 2. max(1, 2) = 2.',
    intuition: 'Cannot pick both index 0 and 1 since they are adjacent.'
  },
  {
    title: '3. Index 2 (val=4): Pick (4 + prev2=2 -> 6) vs Not Pick (prev=2) -> Max = 6',
    phase: 'COMPUTE',
    codeLine: 17,
    nums: [2, 1, 4, 9],
    activeI: 2,
    dp: [2, 2, 6, null],
    pick: 6,
    notPick: 2,
    decision: 'Pick nums[2] (Subsequence: [2, 4])',
    variables: { i: 2, pick: '4 + 2 = 6', notPick: 2, 'dp[2]': 6 },
    explain: 'Picking nums[2] adds to prev2 (nums[0] = 2): 4 + 2 = 6. Not picking retains prev = 2. max(6, 2) = 6.',
    intuition: 'Non-adjacent indices 0 and 2 combine to give sum 6.'
  },
  {
    title: '4. Index 3 (val=9): Pick (9 + prev2=2 -> 11) vs Not Pick (prev=6) -> Max = 11',
    phase: 'COMPLETED',
    codeLine: 22,
    nums: [2, 1, 4, 9],
    activeI: 3,
    dp: [2, 2, 6, 11],
    pick: 11,
    notPick: 6,
    decision: 'Pick nums[3] (Subsequence: [1, 9] or [2, 9])',
    variables: { i: 3, pick: '9 + 2 = 11', notPick: 6, maxSum: 11 },
    explain: 'Picking nums[3] pairs with dp[1]=2 yielding 11. Skipping gives 6. Maximum non-adjacent sum = 11 (from picking indices 0 and 3 or 1 and 3: 2 + 9 = 11).',
    intuition: 'Final answer = 11 achieved in O(N) time and O(1) auxiliary space.'
  }
];

export default function MaximumSumOfNonAdjacentElementsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Active Index: {step.activeI}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Decision: {step.decision}
        </span>
      </div>

      {/* Elements Array */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-5 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Array Elements & Non-Adjacent Subsequence DP
        </span>

        <div className="w-full flex items-center justify-around gap-3 pt-2">
          {step.nums.map((num, idx) => {
            const isTarget = idx === step.activeI;
            const dpVal = step.dp[idx];

            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div
                  className={`w-20 h-24 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                    isTarget
                      ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg'
                      : dpVal !== null
                      ? 'border-blue-500/40 bg-blue-500/15 text-blue-300'
                      : 'border-[#272b3c] bg-[#161824] text-slate-500'
                  }`}
                >
                  <span className="text-[10px] text-[#8a8ea3]">Index {idx}</span>
                  <span className="text-base font-bold text-amber-400 mt-0.5">{num}</span>
                  <span className="text-[11px] font-semibold text-emerald-400 mt-2">
                    {dpVal !== null ? `Max: ${dpVal}` : '—'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pick vs Not-Pick Card */}
        {step.pick !== null && (
          <div className="w-full max-w-md bg-[#161824] border border-[#272b3c] rounded-xl p-3 flex items-center justify-around text-xs font-mono">
            <div className="flex flex-col items-center">
              <span className="text-emerald-400 font-semibold">Pick Choice</span>
              <span className="text-slate-300 text-sm font-bold">{step.pick}</span>
            </div>
            <div className="h-8 w-px bg-[#272b3c]" />
            <div className="flex flex-col items-center">
              <span className="text-purple-400 font-semibold">Not Pick (Skip)</span>
              <span className="text-slate-300 text-sm font-bold">{step.notPick}</span>
            </div>
          </div>
        )}
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

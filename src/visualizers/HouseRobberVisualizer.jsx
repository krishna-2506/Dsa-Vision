import React from 'react';

export const meta = {
  title: 'House Robber II (Circular Street)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Houses are arranged in a circular street where the first and last houses are neighbors. We decompose the circular constraint into two linear House Robber subproblems: one excluding the first house and one excluding the last house.'
};

export const solutions = {
  cpp: `// C++ House Robber II (Circular Houses)
// Time: O(N) | Space: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
private:
    int robLinear(vector<int>& nums, int start, int end) {
        int prev = 0, prev2 = 0;
        for (int i = start; i <= end; i++) {
            int pick = nums[i] + prev2;
            int notPick = prev;
            int cur = max(pick, notPick);
            prev2 = prev;
            prev = cur;
        }
        return prev;
    }

public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];

        // Case 1: Exclude first house [1..n-1]
        int case1 = robLinear(nums, 1, n - 1);
        // Case 2: Exclude last house [0..n-2]
        int case2 = robLinear(nums, 0, n - 2);

        return max(case1, case2);
    }
};`,
  python: `# Python 3 House Robber II (Circular Houses)
# Time: O(N) | Space: O(1)
class Solution:
    def rob(self, nums: list[int]) -> int:
        n = len(nums)
        if n == 1:
            return nums[0]

        def rob_linear(arr):
            prev, prev2 = 0, 0
            for val in arr:
                cur = max(val + prev2, prev)
                prev2 = prev
                prev = cur
            return prev

        return max(rob_linear(nums[1:]), rob_linear(nums[:-1]))`,
  java: `// Java House Robber II (Circular Houses)
// Time: O(N) | Space: O(1)
class Solution {
    private int robLinear(int[] nums, int start, int end) {
        int prev = 0, prev2 = 0;
        for (int i = start; i <= end; i++) {
            int cur = Math.max(nums[i] + prev2, prev);
            prev2 = prev;
            prev = cur;
        }
        return prev;
    }

    public int rob(int[] nums) {
        int n = nums.length;
        if (n == 1) return nums[0];

        int case1 = robLinear(nums, 1, n - 1);
        int case2 = robLinear(nums, 0, n - 2);

        return Math.max(case1, case2);
    }
}`,
  javascript: `// JavaScript House Robber II (Circular Houses)
// Time: O(N) | Space: O(1)
var rob = function(nums) {
    const n = nums.length;
    if (n === 1) return nums[0];

    const robLinear = (start, end) => {
        let prev = 0, prev2 = 0;
        for (let i = start; i <= end; i++) {
            const cur = Math.max(nums[i] + prev2, prev);
            prev2 = prev;
            prev = cur;
        }
        return prev;
    };

    return Math.max(robLinear(1, n - 1), robLinear(0, n - 2));
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Circular Houses [2, 3, 2]',
    phase: 'INITIAL',
    codeLine: 24,
    nums: [2, 3, 2],
    activeCase: 'Overview',
    case1Val: null,
    case2Val: null,
    variables: { houses: '[2, 3, 2]', constraint: 'House 0 & House 2 are adjacent!' },
    explain: 'Because house 0 and house 2 are neighbors in a circle, we cannot rob both. We split into two independent linear subproblems.',
    intuition: 'Circular constraint = max(rob([1..n-1]), rob([0..n-2])).'
  },
  {
    title: '2. Case 1: Exclude House 0 -> Consider [3, 2]',
    phase: 'CASE_1',
    codeLine: 27,
    nums: [2, 3, 2],
    activeCase: 'Case 1: Range [1..2] (Values: [3, 2])',
    activeIndices: [1, 2],
    case1Val: 3,
    case2Val: null,
    variables: { excluded: 'House 0 (val 2)', range: '[3, 2]', case1Max: 3 },
    explain: 'Running linear DP on [3, 2]: max(3 + 0, 0) = 3; next max(2 + 0, 3) = 3. Case 1 gives max loot 3.',
    intuition: 'Guarantees house 0 is never robbed.'
  },
  {
    title: '3. Case 2: Exclude House 2 -> Consider [2, 3]',
    phase: 'CASE_2',
    codeLine: 29,
    nums: [2, 3, 2],
    activeCase: 'Case 2: Range [0..1] (Values: [2, 3])',
    activeIndices: [0, 1],
    case1Val: 3,
    case2Val: 3,
    variables: { excluded: 'House 2 (val 2)', range: '[2, 3]', case2Max: 3 },
    explain: 'Running linear DP on [2, 3]: max(2 + 0, 0) = 2; next max(3 + 0, 2) = 3. Case 2 gives max loot 3.',
    intuition: 'Guarantees house 2 is never robbed.'
  },
  {
    title: '4. Final Comparison: max(Case 1 = 3, Case 2 = 3) -> Ans = 3',
    phase: 'COMPLETED',
    codeLine: 31,
    nums: [2, 3, 2],
    activeCase: 'Completed',
    activeIndices: [1],
    case1Val: 3,
    case2Val: 3,
    variables: { maxLoot: 3, optimalHouse: 'House 1 ($3)' },
    explain: 'Comparing both subproblems: max(3, 3) = 3. Robbing house 1 alone yields the maximum possible haul without triggering any alarm.',
    intuition: 'Both boundary edge cases covered in O(N) linear time and O(1) space.'
  }
];

export default function HouseRobberVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          {step.activeCase}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Loot: {step.case1Val !== null && step.case2Val !== null ? Math.max(step.case1Val, step.case2Val) : 'Computing...'}
        </span>
      </div>

      {/* Circular Houses Layout */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-5 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Circular Neighborhood Layout
        </span>

        <div className="flex items-center justify-center gap-6 py-2">
          {step.nums.map((loot, idx) => {
            const isIncluded = step.activeIndices ? step.activeIndices.includes(idx) : true;

            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div
                  className={`w-24 h-28 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                    isIncluded
                      ? 'border-emerald-500/60 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/30 shadow-lg'
                      : 'border-rose-500/40 bg-rose-500/10 text-rose-300 opacity-60'
                  }`}
                >
                  <span className="text-xl mb-1">🏠</span>
                  <span className="text-[10px] text-[#8a8ea3]">House {idx}</span>
                  <span className="text-sm font-bold text-amber-400 mt-0.5">${loot}k</span>
                  <span className="text-[9px] mt-1 font-semibold">
                    {isIncluded ? 'Eligible' : 'Excluded'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Linear Subproblems Comparison */}
        <div className="w-full max-w-md bg-[#161824] border border-[#272b3c] rounded-xl p-3 flex items-center justify-around text-xs font-mono">
          <div className="flex flex-col items-center">
            <span className="text-blue-400 font-semibold">Exclude House 0</span>
            <span className="text-slate-300 text-sm font-bold">
              {step.case1Val !== null ? `$${step.case1Val}k` : '—'}
            </span>
          </div>
          <div className="h-8 w-px bg-[#272b3c]" />
          <div className="flex flex-col items-center">
            <span className="text-purple-400 font-semibold">Exclude Last House</span>
            <span className="text-slate-300 text-sm font-bold">
              {step.case2Val !== null ? `$${step.case2Val}k` : '—'}
            </span>
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

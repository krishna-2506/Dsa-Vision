import React from 'react';

export const meta = {
  title: 'Check Subsequence with Sum K',
  category: 'Recursion',
  difficulty: 'Medium',
  timeComplexity: 'O(2^N)',
  spaceComplexity: 'O(N) recursion stack',
  description: 'Determines whether any subsequence of an array sums to a target value K using backtracking recursion with short-circuit early termination upon the first valid match.'
};

export const solutions = {
  cpp: `// C++ Subsequence Sum Check with Early Termination
#include <vector>
using namespace std;

class Solution {
    bool checkSubsequenceSum(int idx, int currentSum, int k, const vector<int>& nums) {
        // Base case: target sum achieved
        if (currentSum == k) return true;
        
        // Base case: out of bounds or exceeded target
        if (currentSum > k || idx >= nums.size()) return false;

        // Choice 1: Include nums[idx]
        if (checkSubsequenceSum(idx + 1, currentSum + nums[idx], k, nums)) {
            return true; // Short-circuit early exit
        }

        // Choice 2: Exclude nums[idx]
        if (checkSubsequenceSum(idx + 1, currentSum, k, nums)) {
            return true;
        }

        return false;
    }

public:
    bool checkSubsequenceSum(vector<int>& nums, int k) {
        return checkSubsequenceSum(0, 0, k, nums);
    }
};`,
  python: `# Python 3 Subsequence Sum Check with Early Termination
class Solution:
    def checkSubsequenceSum(self, nums: list[int], k: int) -> bool:
        def solve(idx, current_sum):
            if current_sum == k:
                return True
            if current_sum > k or idx >= len(nums):
                return False

            # Pick
            if solve(idx + 1, current_sum + nums[idx]):
                return True

            # Don't pick
            if solve(idx + 1, current_sum):
                return True

            return False

        return solve(0, 0)`,
  java: `// Java Subsequence Sum Check with Early Termination
class Solution {
    private boolean solve(int idx, int currentSum, int k, int[] nums) {
        if (currentSum == k) return true;
        if (currentSum > k || idx >= nums.length) return false;

        // Pick
        if (solve(idx + 1, currentSum + nums[idx], k, nums)) return true;

        // Don't pick
        if (solve(idx + 1, currentSum, k, nums)) return true;

        return false;
    }

    public boolean checkSubsequenceSum(int[] nums, int k) {
        return solve(0, 0, k, nums);
    }
}`,
  javascript: `// JavaScript Subsequence Sum Check with Early Termination
var checkSubsequenceSum = function(nums, k) {
    const solve = (idx, currentSum) => {
        if (currentSum === k) return true;
        if (currentSum > k || idx >= nums.length) return false;

        // Pick
        if (solve(idx + 1, currentSum + nums[idx])) return true;

        // Don't pick
        if (solve(idx + 1, currentSum)) return true;

        return false;
    };

    return solve(0, 0);
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Array [1, 2, 3, 4], Target K = 5',
    phase: 'INITIAL',
    codeLine: 26,
    array: [1, 2, 3, 4],
    k: 5,
    selected: [],
    currentSum: 0,
    matched: false,
    variables: { array: '[1, 2, 3, 4]', targetK: 5, strategy: 'Pick / Don\'t Pick Recursion' },
    explain: 'We want to know if AT LEAST ONE subsequence equals K = 5. As soon as any branch sums to 5, we return true immediately without exploring remaining branches.',
    intuition: 'Short-circuit evaluation stops search early.'
  },
  {
    title: '2. Pick 1: Current Sum = 1 (Active Subsequence: [1])',
    phase: 'DECISION',
    codeLine: 14,
    array: [1, 2, 3, 4],
    k: 5,
    selected: [0],
    currentSum: 1,
    matched: false,
    variables: { pickedIndex: 0, 'picked value': 1, currentSum: 1, remainingTarget: 4 },
    explain: 'Include nums[0] (1). Current sum = 1. Recurse to index 1.',
    intuition: 'Explore left branch.'
  },
  {
    title: '3. Pick 2: Current Sum = 3 (Active Subsequence: [1, 2])',
    phase: 'DECISION',
    codeLine: 14,
    array: [1, 2, 3, 4],
    k: 5,
    selected: [0, 1],
    currentSum: 3,
    matched: false,
    variables: { pickedIndex: 1, 'picked value': 2, currentSum: 3, remainingTarget: 2 },
    explain: 'Include nums[1] (2). Current sum = 1 + 2 = 3. Recurse to index 2.',
    intuition: 'Left branch continued.'
  },
  {
    title: '4. Attempt Pick 3: 3 + 3 = 6 > 5 (Overshot! Backtrack)',
    phase: 'BACKTRACK',
    codeLine: 10,
    array: [1, 2, 3, 4],
    k: 5,
    selected: [0, 1],
    currentSum: 3,
    matched: false,
    variables: { attempted: '3', 'potential sum': '3 + 3 = 6 > 5', action: 'Discard 3 and don\'t pick' },
    explain: 'Adding 3 makes sum 6, exceeding target 5. Prune branch and try next choice (do not pick 3).',
    intuition: 'Prune impossible subtrees.'
  },
  {
    title: '5. Do not pick 2; Pick 4: Subsequence [1, 4] => SUM = 5!',
    phase: 'MATCH_FOUND',
    codeLine: 8,
    array: [1, 2, 3, 4],
    k: 5,
    selected: [0, 3],
    currentSum: 5,
    matched: true,
    variables: { subsequence: '[1, 4]', currentSum: 5, target: 5, result: 'true (Immediate Exit)' },
    explain: 'Subsequence {nums[0]=1, nums[3]=4} sums to 1 + 4 = 5. Target met! Short-circuit return true all the way up the call stack.',
    intuition: 'First match found, abort all pending branches.'
  },
  {
    title: '6. Completed: Subsequence with Sum 5 Exists (Return true)',
    phase: 'RESULT',
    codeLine: 26,
    array: [1, 2, 3, 4],
    k: 5,
    selected: [0, 3],
    currentSum: 5,
    matched: true,
    variables: { validSubsequence: '[1, 4]', sum: 5, output: 'true' },
    explain: 'Verified in fewer calls due to early short-circuit return.',
    intuition: 'Boolean recursion avoids exhaustive traversal.'
  }
];

export default function CheckIfThereExistsASubsequenceWithSumKVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Target K = {step.k}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
          Active Sum = {step.currentSum} / {step.k}
        </span>
        {step.matched && (
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-semibold">
            ✓ Target Sum 5 Found!
          </span>
        )}
      </div>

      {/* Array Element Blocks */}
      <div className="w-full p-6 rounded-2xl bg-[#161824] border border-[#272b3c] flex items-center justify-center gap-3 font-mono">
        {step.array.map((val, idx) => {
          const isSelected = step.selected.includes(idx);

          let style = 'border-[#272b3c] bg-[#12131b] text-[#555a73]';
          if (step.matched && isSelected) {
            style = 'border-emerald-400 bg-emerald-500/25 text-emerald-200 scale-110 shadow-lg shadow-emerald-500/25';
          } else if (isSelected) {
            style = 'border-amber-400 bg-amber-500/20 text-amber-200 scale-105 shadow-md shadow-amber-500/20';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1">
              <span className={`text-[10px] font-bold ${isSelected ? 'text-amber-400' : 'text-[#5b6076]'}`}>
                {isSelected ? 'PICKED' : 'UNPICKED'}
              </span>
              <div className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center font-bold text-lg transition-all ${style}`}>
                {val}
              </div>
              <span className="text-[10px] text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Result Card */}
      {step.phase === 'RESULT' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 Subsequence [1, 4] sums to 5 &rarr; Returns true</span>
        </div>
      )}
    </div>
  );
}

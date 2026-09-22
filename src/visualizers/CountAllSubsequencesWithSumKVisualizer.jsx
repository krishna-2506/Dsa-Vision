import React from 'react';

export const meta = {
  title: 'Count All Subsequences with Sum K',
  category: 'Recursion',
  difficulty: 'Medium',
  timeComplexity: 'O(2^N)',
  spaceComplexity: 'O(N) recursion stack',
  description: 'Counts the total number of subsequences in an array whose elements sum up to target K by summing the results of both recursive branches (pick + not-pick).'
};

export const solutions = {
  cpp: `// C++ Count Subsequences with Sum K
// Time: O(2^N) | Space: O(N) recursion stack
#include <vector>
using namespace std;

class Solution {
    int countSubsequences(int idx, int currentSum, int k, const vector<int>& nums) {
        // Base case: end of array reached
        if (idx == nums.size()) {
            return (currentSum == k) ? 1 : 0;
        }

        // Branch 1: Pick nums[idx]
        int pick = countSubsequences(idx + 1, currentSum + nums[idx], k, nums);

        // Branch 2: Don't pick nums[idx]
        int notPick = countSubsequences(idx + 1, currentSum, k, nums);

        return pick + notPick; // Total count is sum of both subtrees
    }

public:
    int countSubsequenceWithTargetSum(vector<int>& nums, int k) {
        return countSubsequences(0, 0, k, nums);
    }
};`,
  python: `# Python 3 Count Subsequences with Sum K
class Solution:
    def countSubsequenceWithTargetSum(self, nums: list[int], k: int) -> int:
        def solve(idx, current_sum):
            if idx == len(nums):
                return 1 if current_sum == k else 0

            # Pick
            pick = solve(idx + 1, current_sum + nums[idx])

            # Don't pick
            not_pick = solve(idx + 1, current_sum)

            return pick + not_pick

        return solve(0, 0)`,
  java: `// Java Count Subsequences with Sum K
class Solution {
    private int countSubsequences(int idx, int currentSum, int k, int[] nums) {
        if (idx == nums.length) {
            return (currentSum == k) ? 1 : 0;
        }

        int pick = countSubsequences(idx + 1, currentSum + nums[idx], k, nums);
        int notPick = countSubsequences(idx + 1, currentSum, k, nums);

        return pick + notPick;
    }

    public int countSubsequenceWithTargetSum(int[] nums, int k) {
        return countSubsequences(0, 0, k, nums);
    }
}`,
  javascript: `// JavaScript Count Subsequences with Sum K
var countSubsequenceWithTargetSum = function(nums, k) {
    const solve = (idx, currentSum) => {
        if (idx === nums.length) {
            return currentSum === k ? 1 : 0;
        }

        const pick = solve(idx + 1, currentSum + nums[idx]);
        const notPick = solve(idx + 1, currentSum);

        return pick + notPick;
    };

    return solve(0, 0);
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Array [1, 2, 1], Target K = 2',
    phase: 'INITIAL',
    codeLine: 23,
    array: [1, 2, 1],
    k: 2,
    validSubsequences: [],
    totalCount: null,
    variables: { array: '[1, 2, 1]', targetK: 2, strategy: 'return pick + notPick' },
    explain: 'Unlike finding a single subsequence, counting all valid subsequences requires exploring both pick and not-pick branches and summing their return values: return pick + notPick.',
    intuition: 'Each recursive leaf yields 1 if its accumulated sum equals K, or 0 otherwise.'
  },
  {
    title: '2. Subsequence Branch 1: Pick 1 (idx 0), Pick 1 (idx 2) => Sum = 2 (Count +1)',
    phase: 'FIND_MATCH',
    codeLine: 10,
    array: [1, 2, 1],
    k: 2,
    validSubsequences: ['[1, 1] (indices 0, 2)'],
    totalCount: 1,
    variables: { elements: 'nums[0]=1, nums[2]=1', sum: '1 + 1 = 2', count: 1 },
    explain: 'Picking indices 0 and 2 skips index 1. Sum is 1 + 1 = 2 = K. Leaf returns 1.',
    intuition: 'First valid subsequence found.'
  },
  {
    title: '3. Subsequence Branch 2: Don\'t Pick 1, Pick 2 (idx 1) => Sum = 2 (Count +1)',
    phase: 'FIND_MATCH',
    codeLine: 10,
    array: [1, 2, 1],
    k: 2,
    validSubsequences: ['[1, 1] (indices 0, 2)', '[2] (index 1)'],
    totalCount: 2,
    variables: { elements: 'nums[1]=2', sum: '2 = 2', count: 2 },
    explain: 'Picking only index 1 gives sum = 2 = K. Leaf returns 1.',
    intuition: 'Second valid subsequence found.'
  },
  {
    title: '4. Other Branches: [1, 2] sum=3 (0), [1, 2, 1] sum=4 (0), [] sum=0 (0)',
    phase: 'EVALUATE_REST',
    codeLine: 10,
    array: [1, 2, 1],
    k: 2,
    validSubsequences: ['[1, 1] (indices 0, 2)', '[2] (index 1)'],
    totalCount: 2,
    variables: { invalidBranches: 'Sum != 2 return 0' },
    explain: 'Remaining 6 branches evaluate to sums 0, 1, 3, or 4 and return 0.',
    intuition: 'All other leaves return 0.'
  },
  {
    title: '5. Unwind & Sum Branches: Total Count = 2 Subsequences',
    phase: 'RESULT',
    codeLine: 18,
    array: [1, 2, 1],
    k: 2,
    validSubsequences: ['[1, 1]', '[2]'],
    totalCount: 2,
    variables: { finalCount: 2, subsequences: '2 valid subsequences found' },
    explain: 'pick + notPick unrolls back to the root, returning 2.',
    intuition: 'Counting pattern cleanly aggregates totals from subtrees.'
  }
];

export default function CountAllSubsequencesWithSumKVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Target Sum K = {step.k}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
          Count = {step.totalCount ?? 0}
        </span>
      </div>

      {/* Array Elements */}
      <div className="w-full p-6 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] flex items-center justify-center gap-4 font-mono">
        {step.array.map((val, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 rounded-xl border border-cyan-500/30 bg-cyan-500/15 text-cyan-200 flex items-center justify-center text-xl font-bold">
              {val}
            </div>
            <span className="text-[10px] text-[#5b6076]">[{idx}]</span>
          </div>
        ))}
      </div>

      {/* Valid Subsequences Found List */}
      <div className="w-full p-4 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] flex flex-col gap-2 font-mono text-xs">
        <span className="text-[var(--chalk-dim)]">Matching Subsequences Found:</span>
        <div className="flex flex-wrap items-center gap-2">
          {step.validSubsequences.map((sub, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm shadow-md shadow-emerald-500/15"
            >
              {sub}
            </span>
          ))}
        </div>
      </div>

      {/* Result Card */}
      {step.phase === 'RESULT' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 Total Subsequences with Sum {step.k} = {step.totalCount}</span>
        </div>
      )}
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Subsets II (Unique Subsets with Duplicates)',
  category: 'Recursion / Backtracking',
  difficulty: 'Medium',
  timeComplexity: 'O(2^N * N)',
  spaceComplexity: 'O(N) recursion stack',
  description: 'Generates all unique subsets of an array that may contain duplicate numbers, sorting first and skipping duplicates at each recursion level.'
};

export const solutions = {
  cpp: `// C++ Subsets II (Backtracking with Duplicate Skipping)
// Time: O(2^N) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
private:
    void backtrack(int ind, vector<int>& nums, vector<int>& current, vector<vector<int>>& result) {
        result.push_back(current);

        for (int i = ind; i < nums.size(); i++) {
            // Skip duplicates at the same level of the recursion tree
            if (i > ind && nums[i] == nums[i - 1]) continue;

            current.push_back(nums[i]);
            backtrack(i + 1, nums, current, result);
            current.pop_back(); // backtrack
        }
    }
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> result;
        vector<int> current;
        backtrack(0, nums, current, result);
        return result;
    }
};`,
  python: `# Python 3 Subsets II (Backtracking)
class Solution:
    def subsetsWithDup(self, nums: list[int]) -> list[list[int]]:
        nums.sort()
        result = []

        def backtrack(ind: int, current: list[int]):
            result.append(list(current))

            for i in range(ind, len(nums)):
                if i > ind and nums[i] == nums[i - 1]:
                    continue
                current.append(nums[i])
                backtrack(i + 1, current)
                current.pop()

        backtrack(0, [])
        return result`,
  java: `// Java Subsets II (Backtracking)
import java.util.*;

class Solution {
    private void backtrack(int ind, int[] nums, List<Integer> curr, List<List<Integer>> result) {
        result.add(new ArrayList<>(curr));

        for (int i = ind; i < nums.length; i++) {
            if (i > ind && nums[i] == nums[i - 1]) continue;

            curr.add(nums[i]);
            backtrack(i + 1, nums, curr, result);
            curr.remove(curr.size() - 1);
        }
    }

    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> result = new ArrayList<>();
        backtrack(0, nums, new ArrayList<>(), result);
        return result;
    }
}`,
  javascript: `// JavaScript Subsets II (Backtracking)
var subsetsWithDup = function(nums) {
    nums.sort((a, b) => a - b);
    const result = [];

    function backtrack(ind, current) {
        result.push([...current]);

        for (let i = ind; i < nums.length; i++) {
            if (i > ind && nums[i] === nums[i - 1]) continue;

            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }

    backtrack(0, []);
    return result;
};`
};

export const steps = [
  {
    title: '1. Array with Duplicates: [1, 2, 2], Sorted',
    phase: 'INITIAL',
    codeLine: 26,
    nums: [1, 2, 2],
    current: [],
    index: 0,
    results: [[]],
    skipped: false,
    variables: { nums: '[1, 2, 2]', initialSubset: '[]' },
    explain: 'Start with empty set []. In each recursion step, we loop through available indices and skip any index where nums[i] == nums[i - 1] to avoid duplicate subsets.',
    intuition: 'Sorting puts duplicates next to each other so we can skip them at the same tree depth.'
  },
  {
    title: '2. Pick 1 -> [1]; Pick 2 -> [1, 2]; Pick 2 -> [1, 2, 2]',
    phase: 'PICK_CHAIN',
    codeLine: 18,
    nums: [1, 2, 2],
    current: [1, 2, 2],
    index: 2,
    results: [[], [1], [1, 2], [1, 2, 2]],
    skipped: false,
    variables: { subsetsCount: 4, latest: '[1, 2, 2]' },
    explain: 'Generated prefixes: [1], [1, 2], [1, 2, 2]. Both 2s are allowed because they are picked at different levels of depth.',
    intuition: 'Depth-wise repetition is allowed.'
  },
  {
    title: '3. Backtrack to [1]. Next candidate is second "2" at level 1: SKIPPED!',
    phase: 'SKIP_DUPLICATE',
    codeLine: 15,
    nums: [1, 2, 2],
    current: [1],
    index: 2,
    results: [[], [1], [1, 2], [1, 2, 2]],
    skipped: true,
    variables: { skippedIndex: 2, duplicateValue: 2, reason: 'i > ind and nums[i] == nums[i-1]' },
    explain: 'At level 1, index 2 has value 2 which is identical to index 1. Skipping it prevents creating a duplicate [1, 2].',
    intuition: 'Breadth-wise repetition is pruned.'
  },
  {
    title: '4. Backtrack to root. Pick 2 -> [2]; Pick 2 -> [2, 2]',
    phase: 'PICK_BRANCH',
    codeLine: 18,
    nums: [1, 2, 2],
    current: [2, 2],
    index: 2,
    results: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]],
    skipped: false,
    variables: { subsetsCount: 6, latest: '[2, 2]' },
    explain: 'Subsets without 1: [2] and [2, 2] are added.',
    intuition: 'Generating subsets starting with 2.'
  },
  {
    title: '5. Completed: All 6 Unique Subsets Found (No Duplicates)',
    phase: 'COMPLETED',
    codeLine: 28,
    nums: [1, 2, 2],
    current: [],
    index: 3,
    results: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]],
    skipped: false,
    variables: { totalUniqueSubsets: 6, powerSetSize: 6 },
    explain: 'Out of 2^3 = 8 theoretical subsets, exactly 6 unique subsets exist for [1, 2, 2].',
    intuition: 'Level-order pruning strictly avoids duplicate subsets.'
  }
];

export default function SubsetsIiVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Active Index: {step.index} (val: {step.nums[step.index] || 'End'})
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Unique Subsets: {step.results.length} / 6
        </span>
      </div>

      {/* Array Elements with duplicate color */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-5 flex flex-col items-center gap-3">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">Sorted Elements (Duplicate Highlights)</span>

        <div className="flex items-center justify-center gap-4">
          {step.nums.map((val, idx) => {
            const isCurrent = idx === step.index;
            const isDuplicate = idx > 0 && val === step.nums[idx - 1];

            let borderClass = 'border-[#272b3c] bg-[#161824] text-slate-400';
            if (isCurrent && step.skipped) {
              borderClass = 'border-rose-500 bg-rose-500/20 text-rose-300 ring-2 ring-rose-500/40 line-through';
            } else if (isCurrent) {
              borderClass = 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/40 shadow-lg';
            } else if (isDuplicate) {
              borderClass = 'border-purple-500/40 bg-purple-500/10 text-purple-300';
            }

            return (
              <div key={idx} className={`w-16 h-20 rounded-2xl border flex flex-col items-center justify-center font-mono font-bold transition-all ${borderClass}`}>
                <span className="text-xl">{val}</span>
                <span className="text-[10px] text-slate-500">{isDuplicate ? 'DUPLICATE' : `idx ${idx}`}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Generated Subsets Container */}
      <div className="w-full bg-[#12131b] border border-emerald-500/30 rounded-2xl p-5 flex flex-col gap-2">
        <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">Discovered Unique Subsets</span>
        <div className="flex items-center gap-2 flex-wrap">
          {step.results.map((sub, idx) => (
            <span key={idx} className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs">
              [{sub.join(', ')}]
            </span>
          ))}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

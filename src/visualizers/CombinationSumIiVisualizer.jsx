import React from 'react';

export const meta = {
  title: 'Combination Sum II (Unique with Duplicates)',
  category: 'Recursion / Backtracking',
  difficulty: 'Medium',
  timeComplexity: 'O(2^N * K)',
  spaceComplexity: 'O(K * X) combinations',
  description: 'Finds all unique combinations that sum up to target where each number in the array can only be used once, skipping duplicates at the same recursion level.'
};

export const solutions = {
  cpp: `// C++ Combination Sum II (Backtracking with Duplicate Pruning)
// Time: O(2^N) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
private:
    void backtrack(int ind, int target, vector<int>& arr, vector<int>& current, vector<vector<int>>& result) {
        if (target == 0) {
            result.push_back(current);
            return;
        }

        for (int i = ind; i < arr.size(); i++) {
            // Skip duplicate elements at the same tree level
            if (i > ind && arr[i] == arr[i - 1]) continue;

            // Elements are sorted, if current element exceeds remaining target, stop
            if (arr[i] > target) break;

            current.push_back(arr[i]);
            backtrack(i + 1, target - arr[i], arr, current, result); // i + 1 because each used once
            current.pop_back(); // backtrack
        }
    }
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        vector<vector<int>> result;
        vector<int> current;
        backtrack(0, target, candidates, current, result);
        return result;
    }
};`,
  python: `# Python 3 Combination Sum II (Backtracking)
class Solution:
    def combinationSum2(self, candidates: list[int], target: int) -> list[list[int]]:
        candidates.sort()
        result = []

        def backtrack(ind: int, remain: int, current: list[int]):
            if remain == 0:
                result.append(list(current))
                return

            for i in range(ind, len(candidates)):
                # Skip duplicates at the same level
                if i > ind and candidates[i] == candidates[i - 1]:
                    continue
                if candidates[i] > remain:
                    break

                current.append(candidates[i])
                backtrack(i + 1, remain - candidates[i], current)
                current.pop()

        backtrack(0, target, [])
        return result`,
  java: `// Java Combination Sum II (Backtracking)
import java.util.*;

class Solution {
    private void backtrack(int ind, int target, int[] arr, List<Integer> curr, List<List<Integer>> result) {
        if (target == 0) {
            result.add(new ArrayList<>(curr));
            return;
        }

        for (int i = ind; i < arr.length; i++) {
            if (i > ind && arr[i] == arr[i - 1]) continue;
            if (arr[i] > target) break;

            curr.add(arr[i]);
            backtrack(i + 1, target - arr[i], arr, curr, result);
            curr.remove(curr.size() - 1);
        }
    }

    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        List<List<Integer>> result = new ArrayList<>();
        backtrack(0, target, candidates, new ArrayList<>(), result);
        return result;
    }
}`,
  javascript: `// JavaScript Combination Sum II (Backtracking)
var combinationSum2 = function(candidates, target) {
    candidates.sort((a, b) => a - b);
    const result = [];

    function backtrack(ind, remain, current) {
        if (remain === 0) {
            result.push([...current]);
            return;
        }

        for (let i = ind; i < candidates.length; i++) {
            if (i > ind && candidates[i] === candidates[i - 1]) continue;
            if (candidates[i] > remain) break;

            current.push(candidates[i]);
            backtrack(i + 1, remain - candidates[i], current);
            current.pop();
        }
    }

    backtrack(0, target, []);
    return result;
};`
};

export const steps = [
  {
    title: '1. Sorted Candidates: [1, 1, 2, 5, 6, 7, 10], Target = 8',
    phase: 'INITIAL',
    codeLine: 31,
    candidates: [1, 1, 2, 5, 6, 7, 10],
    currentIndex: 0,
    remain: 8,
    currentCombo: [],
    results: [],
    skippedDuplicate: false,
    variables: { candidates: '[1, 1, 2, 5, 6, 7, 10]', target: 8 },
    explain: 'Sorting allows pruning: 1) if candidates[i] > target, stop loop immediately. 2) if i > ind && candidates[i] == candidates[i-1], skip duplicate branch.',
    intuition: 'Sorting puts identical numbers adjacent, enabling level-order duplicate pruning.'
  },
  {
    title: '2. Pick 1 (idx 0), then 1 (idx 1), then 6 (idx 4): 1 + 1 + 6 = 8 -> Match 1 Found!',
    phase: 'MATCH_FOUND',
    codeLine: 12,
    candidates: [1, 1, 2, 5, 6, 7, 10],
    currentIndex: 4,
    remain: 0,
    currentCombo: [1, 1, 6],
    results: [[1, 1, 6]],
    skippedDuplicate: false,
    variables: { matched: '[1, 1, 6]', remain: 0 },
    explain: 'Picking both 1s and 6 produces sum 8. First valid combination recorded.',
    intuition: 'Identical numbers can be used together across different recursion depths.'
  },
  {
    title: '3. Backtrack to [1], explore 2 and 5: 1 + 2 + 5 = 8 -> Match 2 Found!',
    phase: 'MATCH_FOUND',
    codeLine: 12,
    candidates: [1, 1, 2, 5, 6, 7, 10],
    currentIndex: 3,
    remain: 0,
    currentCombo: [1, 2, 5],
    results: [[1, 1, 6], [1, 2, 5]],
    skippedDuplicate: false,
    variables: { matched: '[1, 2, 5]', remain: 0 },
    explain: 'Branch with 1, 2, 5 hits target 8. Second valid combination recorded.',
    intuition: 'Valid combination found.'
  },
  {
    title: '4. At root level, candidate at idx 1 is "1" (duplicate of idx 0): SKIPPED!',
    phase: 'SKIP_DUPLICATE',
    codeLine: 18,
    candidates: [1, 1, 2, 5, 6, 7, 10],
    currentIndex: 1,
    remain: 8,
    currentCombo: [],
    results: [[1, 1, 6], [1, 2, 5], [1, 7]],
    skippedDuplicate: true,
    variables: { skippedIndex: 1, val: 1, reason: 'i > ind and arr[i] == arr[i-1]' },
    explain: 'Starting a new combination with the second "1" would create identical duplicates of all combinations that started with the first "1". We skip it!',
    intuition: 'Skip duplicate branches at the same tree level to guarantee uniqueness.'
  },
  {
    title: '5. Completed: 4 Unique Combinations Found: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]',
    phase: 'COMPLETED',
    codeLine: 35,
    candidates: [1, 1, 2, 5, 6, 7, 10],
    currentIndex: 6,
    remain: 0,
    currentCombo: [],
    results: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]],
    skippedDuplicate: false,
    variables: { uniqueCombos: 4, finalSet: '[[1,1,6], [1,2,5], [1,7], [2,6]]' },
    explain: 'Backtracking terminated. All 4 unique combinations that sum to 8 have been found without any duplicates.',
    intuition: 'Duplicate pruning ensures strictly unique combinations without using a hash set.'
  }
];

export default function CombinationSumIiVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Active Index: {step.currentIndex} (val: {step.candidates[step.currentIndex]})
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Remaining Target: {step.remain}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Unique Combos: {step.results.length}
        </span>
      </div>

      {/* Sorted Candidates with Duplicate Highlight */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-5 flex flex-col items-center gap-3">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">Sorted Candidate Pool</span>

        <div className="flex items-center justify-center gap-2.5 overflow-x-auto w-full py-1">
          {step.candidates.map((val, idx) => {
            const isCurrent = idx === step.currentIndex;
            const isDuplicate = idx > 0 && val === step.candidates[idx - 1];

            let borderClass = 'border-[#272b3c] bg-[#161824] text-slate-400';
            if (isCurrent && step.skippedDuplicate) {
              borderClass = 'border-rose-500 bg-rose-500/20 text-rose-300 ring-2 ring-rose-500/40 line-through';
            } else if (isCurrent) {
              borderClass = 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/40 shadow-lg';
            } else if (isDuplicate) {
              borderClass = 'border-purple-500/40 bg-purple-500/10 text-purple-300';
            }

            return (
              <div key={idx} className={`w-12 h-16 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all ${borderClass}`}>
                <span className="text-base">{val}</span>
                <span className="text-[8px] text-slate-500">[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Solutions Container */}
      <div className="w-full bg-[#12131b] border border-emerald-500/30 rounded-2xl p-4 flex flex-col gap-2">
        <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">Discovered Unique Combinations</span>
        <div className="flex items-center gap-2 flex-wrap">
          {step.results.map((combo, idx) => (
            <span key={idx} className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs">
              [{combo.join(', ')}]
            </span>
          ))}
          {step.results.length === 0 && <span className="text-xs text-slate-500 italic">Exploring paths...</span>}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

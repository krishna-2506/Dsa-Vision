import React from 'react';

export const meta = {
  title: 'Combination Sum',
  category: 'Recursion / Backtracking',
  difficulty: 'Medium',
  timeComplexity: 'O(2^T * K) where T is target / min(candidates)',
  spaceComplexity: 'O(K * X) combinations',
  description: 'Finds all unique combinations of candidates that sum up to target using pick / not-pick backtracking with unlimited element reuse.'
};

export const solutions = {
  cpp: `// C++ Combination Sum (Backtracking - Pick / Not Pick)
// Time: O(2^T) | Space: O(T)
#include <vector>
using namespace std;

class Solution {
private:
    void findCombinations(int ind, int target, vector<int>& arr, vector<int>& current, vector<vector<int>>& result) {
        // Base case: target is satisfied
        if (target == 0) {
            result.push_back(current);
            return;
        }

        // Base case: end of array reached
        if (ind == arr.size()) {
            return;
        }

        // Pick choice: pick current element if it does not exceed target
        if (arr[ind] <= target) {
            current.push_back(arr[ind]);
            findCombinations(ind, target - arr[ind], arr, current, result); // stay at ind for reuse
            current.pop_back(); // backtrack
        }

        // Not-pick choice: advance to next candidate without picking
        findCombinations(ind + 1, target, arr, current, result);
    }
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> result;
        vector<int> current;
        findCombinations(0, target, candidates, current, result);
        return result;
    }
};`,
  python: `# Python 3 Combination Sum (Backtracking)
class Solution:
    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:
        result = []

        def backtrack(ind: int, remain: int, current: list[int]):
            if remain == 0:
                result.append(list(current))
                return
            if ind == len(candidates):
                return

            # Pick choice (stay at ind for multiple picks)
            if candidates[ind] <= remain:
                current.append(candidates[ind])
                backtrack(ind, remain - candidates[ind], current)
                current.pop()

            # Not pick choice
            backtrack(ind + 1, remain, current)

        backtrack(0, target, [])
        return result`,
  java: `// Java Combination Sum (Backtracking)
import java.util.*;

class Solution {
    private void backtrack(int ind, int target, int[] arr, List<Integer> curr, List<List<Integer>> result) {
        if (target == 0) {
            result.add(new ArrayList<>(curr));
            return;
        }
        if (ind == arr.length) return;

        if (arr[ind] <= target) {
            curr.add(arr[ind]);
            backtrack(ind, target - arr[ind], arr, curr, result);
            curr.remove(curr.size() - 1);
        }

        backtrack(ind + 1, target, arr, curr, result);
    }

    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(0, target, candidates, new ArrayList<>(), result);
        return result;
    }
}`,
  javascript: `// JavaScript Combination Sum (Backtracking)
var combinationSum = function(candidates, target) {
    const result = [];

    function backtrack(ind, remain, current) {
        if (remain === 0) {
            result.push([...current]);
            return;
        }
        if (ind === candidates.length) return;

        if (candidates[ind] <= remain) {
            current.push(candidates[ind]);
            backtrack(ind, remain - candidates[ind], current);
            current.pop();
        }

        backtrack(ind + 1, remain, current);
    }

    backtrack(0, target, []);
    return result;
};`
};

export const steps = [
  {
    title: '1. Candidates: [2, 3, 6, 7], Target = 7. Start at index 0',
    phase: 'INITIAL',
    codeLine: 35,
    candidates: [2, 3, 6, 7],
    currentIndex: 0,
    remainingTarget: 7,
    currentCombo: [],
    results: [],
    variables: { ind: 0, candidate: 2, remain: 7, current: '[]' },
    explain: 'At each candidate, decide whether to PICK it (can be reused) or NOT PICK it (move to next candidate).',
    intuition: 'The pick decision can repeat as long as candidates[i] <= target.'
  },
  {
    title: '2. Pick 2 repeatedly: [2, 2, 2], Target remaining = 7 - 6 = 1',
    phase: 'PICK_REPEATED',
    codeLine: 24,
    candidates: [2, 3, 6, 7],
    currentIndex: 0,
    remainingTarget: 1,
    currentCombo: [2, 2, 2],
    results: [],
    variables: { ind: 0, picked: 2, count: 3, remain: 1 },
    explain: 'Picked 2 three times. Target is now 1. Candidate 2 exceeds 1 (2 > 1), so we must explore next candidates.',
    intuition: 'Cannot pick 2 again since 2 > 1.'
  },
  {
    title: '3. Backtrack one 2 to [2, 2], explore candidate 3: 2 + 2 + 3 = 7 -> Match Found!',
    phase: 'MATCH_FOUND',
    codeLine: 12,
    candidates: [2, 3, 6, 7],
    currentIndex: 1,
    remainingTarget: 0,
    currentCombo: [2, 2, 3],
    results: [[2, 2, 3]],
    variables: { matchedCombo: '[2, 2, 3]', sum: 7, remain: 0 },
    explain: 'Backtrack 2, then try candidate 3: 4 + 3 = 7. Remaining target is 0. Valid combination [2, 2, 3] recorded!',
    intuition: 'Sum equals target. Base case triggered.'
  },
  {
    title: '4. Backtrack completely, move to candidate 7: Pick 7 -> Match Found!',
    phase: 'MATCH_FOUND',
    codeLine: 12,
    candidates: [2, 3, 6, 7],
    currentIndex: 3,
    remainingTarget: 0,
    currentCombo: [7],
    results: [[2, 2, 3], [7]],
    variables: { matchedCombo: '[7]', sum: 7, remain: 0 },
    explain: 'Candidate 7 matches target 7 directly. Valid combination [7] recorded!',
    intuition: 'Single-element combination.'
  },
  {
    title: '5. Completed: All Branches Explored -> Combinations: [[2, 2, 3], [7]]',
    phase: 'COMPLETED',
    codeLine: 36,
    candidates: [2, 3, 6, 7],
    currentIndex: 3,
    remainingTarget: 0,
    currentCombo: [],
    results: [[2, 2, 3], [7]],
    variables: { allCombinations: '[[2, 2, 3], [7]]', totalValid: 2 },
    explain: 'Exhaustive exploration completed. The two unique combinations summing to 7 are [2, 2, 3] and [7].',
    intuition: 'Pick / not-pick tree guarantees all unique valid combinations are discovered.'
  }
];

export default function CombinationSumVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Active Candidate: Index {step.currentIndex} (val: {step.candidates[step.currentIndex]})
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Remaining Target: {step.remainingTarget}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Found Combos: {step.results.length}
        </span>
      </div>

      {/* Candidates array selection */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-5 flex flex-col items-center gap-3">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">Candidate Numbers Pool</span>

        <div className="flex items-center justify-center gap-3">
          {step.candidates.map((val, idx) => {
            const isCurrent = idx === step.currentIndex;
            const isPicked = step.currentCombo.includes(val);

            let borderClass = 'border-[#272b3c] bg-[#161824] text-slate-400';
            if (isCurrent) {
              borderClass = 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg';
            } else if (isPicked) {
              borderClass = 'border-blue-500/50 bg-blue-500/20 text-blue-300';
            }

            return (
              <div key={idx} className={`w-14 h-16 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all ${borderClass}`}>
                <span className="text-base">{val}</span>
                <span className="text-[9px] text-slate-500">[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Backtracking Stack & Output */}
      <div className="w-full grid grid-cols-2 gap-4">
        <div className="bg-[#12131b] border border-[#272b3c] rounded-2xl p-4 flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-[#8a8ea3]">Current Combination</span>
          <div className="flex items-center gap-1.5 min-h-[40px] flex-wrap justify-center">
            {step.currentCombo.map((val, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono font-bold text-sm">
                {val}
              </span>
            ))}
            {step.currentCombo.length === 0 && <span className="text-xs text-slate-500 italic">Empty</span>}
          </div>
        </div>

        <div className="bg-[#12131b] border border-emerald-500/30 rounded-2xl p-4 flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-emerald-400">Target Matches Found</span>
          <div className="flex flex-col items-center gap-1 min-h-[40px]">
            {step.results.map((res, idx) => (
              <span key={idx} className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs">
                [{res.join(', ')}]
              </span>
            ))}
            {step.results.length === 0 && <span className="text-xs text-slate-500 italic">Searching...</span>}
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

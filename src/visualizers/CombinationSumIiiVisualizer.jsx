import React from 'react';

export const meta = {
  title: 'Combination Sum III',
  category: 'Recursion',
  difficulty: 'Medium',
  timeComplexity: 'O(C(9, K))',
  spaceComplexity: 'O(K) recursion stack',
  description: 'Finds all valid combinations of K distinct numbers chosen from {1..9} that sum up to target N using backtracking with ordered loop search and sum pruning.'
};

export const solutions = {
  cpp: `// C++ Combination Sum III Backtracking
#include <vector>
using namespace std;

class Solution {
    void backtrack(int start, int k, int target, vector<int>& current, vector<vector<int>>& result) {
        // Base case: exactly K numbers and target achieved
        if (current.size() == k && target == 0) {
            result.push_back(current);
            return;
        }

        if (current.size() >= k || target < 0) return;

        for (int i = start; i <= 9; i++) {
            if (i > target) break; // Prune branch: remaining numbers only get larger

            current.push_back(i);
            backtrack(i + 1, k, target - i, current, result);
            current.pop_back(); // Backtrack
        }
    }

public:
    vector<vector<int>> combinationSum3(int k, int n) {
        vector<vector<int>> result;
        vector<int> current;
        backtrack(1, k, n, current, result);
        return result;
    }
};`,
  python: `# Python 3 Combination Sum III Backtracking
class Solution:
    def combinationSum3(self, k: int, n: int) -> list[list[int]]:
        result = []
        current = []

        def backtrack(start, target):
            if len(current) == k and target == 0:
                result.append(list(current))
                return
            if len(current) >= k or target < 0:
                return

            for i in range(start, 10):
                if i > target:
                    break
                current.append(i)
                backtrack(i + 1, target - i)
                current.pop()

        backtrack(1, n)
        return result`,
  java: `// Java Combination Sum III Backtracking
import java.util.ArrayList;
import java.util.List;

class Solution {
    private void backtrack(int start, int k, int target, List<Integer> current, List<List<Integer>> result) {
        if (current.size() == k && target == 0) {
            result.add(new ArrayList<>(current));
            return;
        }
        if (current.size() >= k || target < 0) return;

        for (int i = start; i <= 9; i++) {
            if (i > target) break;

            current.add(i);
            backtrack(i + 1, k, target - i, current, result);
            current.remove(current.size() - 1);
        }
    }

    public List<List<Integer>> combinationSum3(int k, int n) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(1, k, n, new ArrayList<>(), result);
        return result;
    }
}`,
  javascript: `// JavaScript Combination Sum III Backtracking
var combinationSum3 = function(k, n) {
    const result = [];
    const current = [];

    const backtrack = (start, target) => {
        if (current.length === k && target === 0) {
            result.push([...current]);
            return;
        }
        if (current.length >= k || target < 0) return;

        for (let i = start; i <= 9; i++) {
            if (i > target) break;

            current.push(i);
            backtrack(i + 1, target - i);
            current.pop();
        }
    };

    backtrack(1, n);
    return result;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: K = 3 Numbers from {1..9} Summing to N = 7',
    phase: 'INITIAL',
    codeLine: 24,
    k: 3,
    n: 7,
    currentPath: [],
    remainingTarget: 7,
    results: [],
    variables: { k: 3, n: 7, domain: '{1, 2, 3, 4, 5, 6, 7, 8, 9}', rule: 'Each number used at most once' },
    explain: 'We must choose exactly 3 distinct digits from 1 to 9 whose sum equals 7.',
    intuition: 'Backtracking with start parameter prevents duplicate permutations.'
  },
  {
    title: '2. Pick 1: current = [1], remaining target = 7 - 1 = 6',
    phase: 'CHOOSE',
    codeLine: 18,
    k: 3,
    n: 7,
    currentPath: [1],
    remainingTarget: 6,
    results: [],
    variables: { picked: 1, currentPath: '[1]', remainingTarget: 6, numbersNeeded: 2 },
    explain: 'Choose 1. We still need 2 numbers from range [2..9] summing to 6.',
    intuition: 'Next candidate search starts at 2.'
  },
  {
    title: '3. Pick 2: current = [1, 2], remaining target = 6 - 2 = 4',
    phase: 'CHOOSE',
    codeLine: 18,
    k: 3,
    n: 7,
    currentPath: [1, 2],
    remainingTarget: 4,
    results: [],
    variables: { picked: 2, currentPath: '[1, 2]', remainingTarget: 4, numbersNeeded: 1 },
    explain: 'Choose 2. We now need exactly 1 more number from [3..9] summing to 4.',
    intuition: 'Only candidate 4 satisfies this.'
  },
  {
    title: '4. Pick 4: current = [1, 2, 4], remaining target = 0 => VALID COMBINATION!',
    phase: 'MATCH_FOUND',
    codeLine: 8,
    k: 3,
    n: 7,
    currentPath: [1, 2, 4],
    remainingTarget: 0,
    results: ['[1, 2, 4]'],
    variables: { combination: '[1, 2, 4]', sum: '1 + 2 + 4 = 7', count: 3, status: 'Recorded' },
    explain: 'current.size() == 3 and remaining target is 0. Valid combination [1, 2, 4] saved!',
    intuition: 'First valid solution recorded.'
  },
  {
    title: '5. Backtrack & Pruning: Try larger options (e.g. 5 > 4 is pruned)',
    phase: 'PRUNE_BACKTRACK',
    codeLine: 16,
    k: 3,
    n: 7,
    currentPath: [],
    remainingTarget: 7,
    results: ['[1, 2, 4]'],
    variables: { pruned: 'Values > target skipped', state: 'Search space exhausted' },
    explain: 'If we try picking 2 first: 2 + 3 + 4 = 9 > 7, so all subsequent branches exceed target 7 immediately.',
    intuition: 'Pruning i > target terminates unpromising branches instantly.'
  },
  {
    title: '6. Completed: Exactly 1 Unique Combination [[1, 2, 4]]',
    phase: 'RESULT',
    codeLine: 26,
    k: 3,
    n: 7,
    currentPath: [],
    remainingTarget: 0,
    results: ['[1, 2, 4]'],
    variables: { finalResult: '[[1, 2, 4]]', totalCombinations: 1 },
    explain: 'The only 3 distinct digits from 1 to 9 summing to 7 are [1, 2, 4].',
    intuition: 'Efficient bounded backtracking completed.'
  }
];

export default function CombinationSumIiiVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          K = {step.k} Digits &Sigma; = {step.n}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
          Remaining Target = {step.remainingTarget}
        </span>
      </div>

      {/* Visual Path Display */}
      <div className="w-full p-6 rounded-2xl bg-[#161824] border border-[#272b3c] flex flex-col items-center gap-4 font-mono">
        <span className="text-xs text-[#8a8ea3]">Current Backtracking Path (max {step.k} numbers):</span>
        <div className="flex items-center gap-3 py-2">
          {step.currentPath.length === 0 ? (
            <span className="text-xs text-[#5b6076]">Empty Path (Backtracked)</span>
          ) : (
            step.currentPath.map((val, idx) => (
              <React.Fragment key={idx}>
                <div className="w-14 h-14 rounded-2xl border-2 border-amber-400 bg-amber-500/20 text-amber-200 flex items-center justify-center text-xl font-bold shadow-md shadow-amber-500/20">
                  {val}
                </div>
                {idx < step.currentPath.length - 1 && (
                  <span className="text-amber-400 font-bold text-lg">+</span>
                )}
              </React.Fragment>
            ))
          )}
        </div>
      </div>

      {/* Discovered Combinations */}
      <div className="w-full p-4 rounded-xl bg-[#12131b] border border-[#202436] flex flex-col gap-2 font-mono text-xs">
        <span className="text-[#8a8ea3]">Valid Combinations Found:</span>
        <div className="flex flex-wrap items-center gap-2">
          {step.results.map((res, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm"
            >
              {res}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

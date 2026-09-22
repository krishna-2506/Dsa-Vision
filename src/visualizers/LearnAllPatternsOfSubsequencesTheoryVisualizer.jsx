import React from 'react';

export const meta = {
  title: 'All Patterns of Subsequences (Theory)',
  category: 'Recursion',
  difficulty: 'Medium',
  timeComplexity: 'O(2^N)',
  spaceComplexity: 'O(N) recursion stack',
  description: 'Comprehensive comparative theory guide on the three canonical recursive subsequence patterns: (1) Print All Subsequences (void), (2) Find Any Subsequence (boolean early exit), and (3) Count Subsequences (summing integer returns).'
};

export const solutions = {
  cpp: `// C++ The 3 Fundamental Subsequence Patterns
#include <vector>
#include <iostream>
using namespace std;

class SubsequencePatterns {
public:
    // Pattern 1: Print / Collect All Subsequences (void return)
    void printAll(int idx, vector<int>& ds, const vector<int>& arr) {
        if (idx == arr.size()) {
            // Process subset 'ds'
            return;
        }
        ds.push_back(arr[idx]);
        printAll(idx + 1, ds, arr); // Pick
        ds.pop_back();
        printAll(idx + 1, ds, arr); // Don't pick
    }

    // Pattern 2: Print Any ONE Subsequence (boolean early return)
    bool printAnyOne(int idx, int sum, int k, const vector<int>& arr) {
        if (sum == k) return true;
        if (idx == arr.size() || sum > k) return false;

        if (printAnyOne(idx + 1, sum + arr[idx], k, arr)) return true;
        if (printAnyOne(idx + 1, sum, k, arr)) return true;

        return false;
    }

    // Pattern 3: Count ALL Subsequences (integer sum of branches)
    int countAll(int idx, int sum, int k, const vector<int>& arr) {
        if (idx == arr.size()) return (sum == k) ? 1 : 0;

        int left = countAll(idx + 1, sum + arr[idx], k, arr);
        int right = countAll(idx + 1, sum, k, arr);

        return left + right;
    }
};`,
  python: `# Python 3 The 3 Fundamental Subsequence Patterns
class SubsequencePatterns:
    # Pattern 1: Collect All (Void)
    def print_all(self, idx, ds, arr, res):
        if idx == len(arr):
            res.append(list(ds))
            return
        ds.append(arr[idx])
        self.print_all(idx + 1, ds, arr, res)
        ds.pop()
        self.print_all(idx + 1, ds, arr, res)

    # Pattern 2: Find Any One (Boolean Early Exit)
    def print_any_one(self, idx, curr_sum, k, arr):
        if curr_sum == k:
            return True
        if idx == len(arr) or curr_sum > k:
            return False
        if self.print_any_one(idx + 1, curr_sum + arr[idx], k, arr):
            return True
        if self.print_any_one(idx + 1, curr_sum, k, arr):
            return True
        return False

    # Pattern 3: Count All (Integer Sum)
    def count_all(self, idx, curr_sum, k, arr):
        if idx == len(arr):
            return 1 if curr_sum == k else 0
        l = self.count_all(idx + 1, curr_sum + arr[idx], k, arr)
        r = self.count_all(idx + 1, curr_sum, k, arr)
        return l + r`,
  java: `// Java The 3 Fundamental Subsequence Patterns
import java.util.ArrayList;
import java.util.List;

class SubsequencePatterns {
    // Pattern 1: Print All
    void printAll(int idx, List<Integer> ds, int[] arr, List<List<Integer>> res) {
        if (idx == arr.length) {
            res.add(new ArrayList<>(ds));
            return;
        }
        ds.add(arr[idx]);
        printAll(idx + 1, ds, arr, res);
        ds.remove(ds.size() - 1);
        printAll(idx + 1, ds, arr, res);
    }

    // Pattern 2: Any One
    boolean printAnyOne(int idx, int sum, int k, int[] arr) {
        if (sum == k) return true;
        if (idx == arr.length || sum > k) return false;
        if (printAnyOne(idx + 1, sum + arr[idx], k, arr)) return true;
        if (printAnyOne(idx + 1, sum, k, arr)) return true;
        return false;
    }

    // Pattern 3: Count All
    int countAll(int idx, int sum, int k, int[] arr) {
        if (idx == arr.length) return (sum == k) ? 1 : 0;
        int l = countAll(idx + 1, sum + arr[idx], k, arr);
        int r = countAll(idx + 1, sum, k, arr);
        return l + r;
    }
}`,
  javascript: `// JavaScript The 3 Fundamental Subsequence Patterns
const subsequencePatterns = {
    // Pattern 1: Collect All
    printAll: (idx, ds, arr, res) => {
        if (idx === arr.length) {
            res.push([...ds]);
            return;
        }
        ds.push(arr[idx]);
        subsequencePatterns.printAll(idx + 1, ds, arr, res);
        ds.pop();
        subsequencePatterns.printAll(idx + 1, ds, arr, res);
    },

    // Pattern 2: Find Any One
    printAnyOne: (idx, sum, k, arr) => {
        if (sum === k) return true;
        if (idx === arr.length || sum > k) return false;
        if (subsequencePatterns.printAnyOne(idx + 1, sum + arr[idx], k, arr)) return true;
        if (subsequencePatterns.printAnyOne(idx + 1, sum, k, arr)) return true;
        return false;
    },

    // Pattern 3: Count All
    countAll: (idx, sum, k, arr) => {
        if (idx === arr.length) return sum === k ? 1 : 0;
        const l = subsequencePatterns.countAll(idx + 1, sum + arr[idx], k, arr);
        const r = subsequencePatterns.countAll(idx + 1, sum, k, arr);
        return l + r;
    }
};`
};

export const steps = [
  {
    title: '1. Master Template: Pick and Don\'t Pick Paradigm',
    phase: 'INITIAL',
    codeLine: 11,
    pattern: 'OVERVIEW',
    variables: { totalPatterns: 3, corePrinciple: 'At index i, either pick arr[i] or do not pick arr[i]' },
    explain: 'Every recursive subsequence problem branches into 2 choices at each index: include element or exclude element. The return type dictates the behavior of the search tree.',
    intuition: 'Branching tree has 2^N leaves.'
  },
  {
    title: '2. Pattern 1: Print / Collect All Subsequences (void)',
    phase: 'PATTERN_1',
    codeLine: 12,
    pattern: 'COLLECT_ALL',
    variables: { returnType: 'void', baseCase: 'idx == n -> save ds', unroll: 'ds.pop_back() (backtrack)' },
    explain: 'Uses a tracking data structure (ds). In-place push -> recurse -> in-place pop -> recurse. Saves all 2^N leaves.',
    intuition: 'Exhaustive exploration of all combinations.'
  },
  {
    title: '3. Pattern 2: Find ANY ONE Subsequence (boolean early exit)',
    phase: 'PATTERN_2',
    codeLine: 23,
    pattern: 'FIND_ANY',
    variables: { returnType: 'bool', check: 'if (left == true) return true;', benefit: 'Stops immediately on 1st match' },
    explain: 'If the left branch returns true, we avoid searching the right branch entirely. Avoids wasting CPU cycles.',
    intuition: 'Short-circuit return prune.'
  },
  {
    title: '4. Pattern 3: Count ALL Subsequences (integer sum)',
    phase: 'PATTERN_3',
    codeLine: 34,
    pattern: 'COUNT_ALL',
    variables: { returnType: 'int', combination: 'return left + right', leaf: 'return 1 if matched else 0' },
    explain: 'Base cases return 1 (valid) or 0 (invalid). Each parent node aggregates counts from both children: return left + right.',
    intuition: 'Hierarchical count reduction up the call tree.'
  },
  {
    title: '5. Summary: Pattern Cheat Sheet',
    phase: 'RESULT',
    codeLine: 41,
    pattern: 'SUMMARY',
    variables: { 'Collect All': 'void + backtrack', 'Find Any': 'bool + early return', 'Count All': 'int + sum branches' },
    explain: 'Mastering these three signature patterns unlocks 90% of recursion and dynamic programming problems.',
    intuition: 'Select return signature based on problem requirement.'
  }
];

export default function LearnAllPatternsOfSubsequencesTheoryVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Active: {step.pattern}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
          3 Master Subsequence Patterns
        </span>
      </div>

      {/* 3 Pattern Comparison Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {/* Pattern 1 */}
        <div className={`p-4 rounded-xl border flex flex-col gap-2 transition-all ${
          step.pattern === 'COLLECT_ALL' || step.pattern === 'SUMMARY'
            ? 'border-amber-400 bg-amber-500/15 text-amber-200 shadow-md shadow-amber-500/20'
            : 'border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk-dim)]'
        }`}>
          <span className="font-bold text-sm text-[var(--chalk)]">Pattern 1: Collect All</span>
          <span className="text-amber-400 font-bold">Return: void</span>
          <p className="text-[11px] text-[var(--chalk-dim)]">
            Explores entire tree. Adds to result list at leaf: ds.push() &rarr; f() &rarr; ds.pop() &rarr; f().
          </p>
        </div>

        {/* Pattern 2 */}
        <div className={`p-4 rounded-xl border flex flex-col gap-2 transition-all ${
          step.pattern === 'FIND_ANY' || step.pattern === 'SUMMARY'
            ? 'border-cyan-400 bg-cyan-500/15 text-cyan-200 shadow-md shadow-cyan-500/20'
            : 'border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk-dim)]'
        }`}>
          <span className="font-bold text-sm text-[var(--chalk)]">Pattern 2: Find Any</span>
          <span className="text-cyan-400 font-bold">Return: bool</span>
          <p className="text-[11px] text-[var(--chalk-dim)]">
            Short-circuit evaluation: if (f()) return true; Stops search immediately on first valid path.
          </p>
        </div>

        {/* Pattern 3 */}
        <div className={`p-4 rounded-xl border flex flex-col gap-2 transition-all ${
          step.pattern === 'COUNT_ALL' || step.pattern === 'SUMMARY'
            ? 'border-emerald-400 bg-emerald-500/15 text-emerald-200 shadow-md shadow-emerald-500/20'
            : 'border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk-dim)]'
        }`}>
          <span className="font-bold text-sm text-[var(--chalk)]">Pattern 3: Count All</span>
          <span className="text-emerald-400 font-bold">Return: int</span>
          <p className="text-[11px] text-[var(--chalk-dim)]">
            Aggregates branch results: return f(pick) + f(notPick). Leaves return 1 on match, 0 on failure.
          </p>
        </div>
      </div>

      {/* Summary Card */}
      <div className="w-full p-4 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col gap-1 font-mono text-xs text-[var(--chalk-dim)]">
        <span className="text-[var(--chalk)] font-bold">Recursive Rule of Thumb:</span>
        <span>&bull; Need all subsets? Use <strong>void</strong> + backtracking list.</span>
        <span>&bull; Need just one solution? Use <strong>boolean</strong> with if (f()) return true.</span>
        <span>&bull; Need total number of ways? Use <strong>int</strong> with return left + right.</span>
      </div>
    </div>
  );
}

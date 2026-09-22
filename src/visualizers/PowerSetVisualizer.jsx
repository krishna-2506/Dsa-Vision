import React from 'react';

export const meta = {
  title: 'Power Set (Recursive Subsequences)',
  category: 'Recursion',
  difficulty: 'Medium',
  timeComplexity: 'O(2^N)',
  spaceComplexity: 'O(N) recursion stack',
  description: 'Generates all 2^N subsequences of a string or array using the recursive pick-or-dont-pick decision tree, systematically building subsets from the root to leaves.'
};

export const solutions = {
  cpp: `// C++ Recursive Power Set Generation
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class Solution {
    void solve(int i, string s, string current, vector<string>& result) {
        // Base case: processed all characters
        if (i == s.length()) {
            result.push_back(current);
            return;
        }

        // Choice 1: Pick s[i]
        solve(i + 1, s, current + s[i], result);

        // Choice 2: Don't pick s[i]
        solve(i + 1, s, current, result);
    }

public:
    vector<string> AllPossibleStrings(string s) {
        vector<string> result;
        solve(0, s, "", result);
        sort(result.begin(), result.end());
        return result;
    }
};`,
  python: `# Python 3 Recursive Power Set Generation
class Solution:
    def AllPossibleStrings(self, s: str) -> list[str]:
        result = []

        def solve(i, current):
            if i == len(s):
                result.append(current)
                return

            # Pick
            solve(i + 1, current + s[i])

            # Don't pick
            solve(i + 1, current)

        solve(0, "")
        result.sort()
        return result`,
  java: `// Java Recursive Power Set Generation
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {
    private void solve(int i, String s, String current, List<String> result) {
        if (i == s.length()) {
            result.add(current);
            return;
        }

        // Pick
        solve(i + 1, s, current + s.charAt(i), result);

        // Don't pick
        solve(i + 1, s, current, result);
    }

    public List<String> AllPossibleStrings(String s) {
        List<String> result = new ArrayList<>();
        solve(0, s, "", result);
        Collections.sort(result);
        return result;
    }
}`,
  javascript: `// JavaScript Recursive Power Set Generation
var AllPossibleStrings = function(s) {
    const result = [];

    const solve = (i, current) => {
        if (i === s.length) {
            result.push(current);
            return;
        }

        // Pick
        solve(i + 1, current + s[i]);

        // Don't pick
        solve(i + 1, current);
    };

    solve(0, "");
    result.sort();
    return result;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Input String "abc" (Binary Decision Tree)',
    phase: 'INITIAL',
    codeLine: 24,
    s: 'abc',
    i: 0,
    currentStr: '""',
    subsets: [],
    variables: { string: '"abc"', length: 3, totalSubsets: '2^3 = 8' },
    explain: 'At each character s[i], the recursive function makes 2 recursive calls: include s[i] or exclude s[i].',
    intuition: 'Forms a complete binary tree of height N.'
  },
  {
    title: '2. Branch 1: Pick "a" -> current = "a"',
    phase: 'PICK',
    codeLine: 16,
    s: 'abc',
    i: 1,
    currentStr: '"a"',
    subsets: [],
    variables: { decision: 'Pick "a"', current: '"a"', nextIndex: 1 },
    explain: 'Appended "a" to current string. Recurse to index 1.',
    intuition: 'Exploring left subtree.'
  },
  {
    title: '3. Branch 2: Pick "b" -> current = "ab"',
    phase: 'PICK',
    codeLine: 16,
    s: 'abc',
    i: 2,
    currentStr: '"ab"',
    subsets: [],
    variables: { decision: 'Pick "b"', current: '"ab"', nextIndex: 2 },
    explain: 'Appended "b". Recurse to index 2.',
    intuition: 'Continuing left.'
  },
  {
    title: '4. Leaf Reached: Pick "c" -> Subsequence "abc" Saved!',
    phase: 'LEAF',
    codeLine: 11,
    s: 'abc',
    i: 3,
    currentStr: '"abc"',
    subsets: ['"abc"'],
    variables: { baseCase: 'i == 3 (length)', saved: '"abc"' },
    explain: 'Base case reached at leaf. Subset "abc" recorded in output list.',
    intuition: 'First full subset produced.'
  },
  {
    title: '5. Backtrack & Right Branch: Exclude "c" -> Subsequence "ab" Saved!',
    phase: 'DONT_PICK',
    codeLine: 19,
    s: 'abc',
    i: 3,
    currentStr: '"ab"',
    subsets: ['"abc"', '"ab"'],
    variables: { decision: 'Don\'t pick "c"', saved: '"ab"' },
    explain: 'Right branch from parent excluded "c". Leaf saves "ab".',
    intuition: 'Sister leaf visited.'
  },
  {
    title: '6. Completed: All 8 Subsets Generated via Tree Traversal',
    phase: 'RESULT',
    codeLine: 26,
    s: 'abc',
    i: null,
    currentStr: null,
    subsets: ['""', '"a"', '"ab"', '"abc"', '"ac"', '"b"', '"bc"', '"c"'],
    variables: { totalSubsets: 8, timeComplexity: 'O(2^N)', spaceComplexity: 'O(N) recursion stack' },
    explain: 'Binary tree traversal completes. All 2^N subsets gathered in optimal recursive time.',
    intuition: 'Pick and not-pick decisions yield the full power set.'
  }
];

export default function PowerSetVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Recursive Tree for "{step.s}"
        </span>
        {step.currentStr !== null && (
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
            Current Path = {step.currentStr}
          </span>
        )}
      </div>

      {/* Decision String Display */}
      <div className="w-full p-6 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col items-center gap-3 font-mono">
        <span className="text-xs text-[var(--chalk-dim)]">Characters In String:</span>
        <div className="flex items-center gap-4">
          {step.s.split('').map((ch, idx) => {
            const isProcessing = step.i === idx;
            const isPast = step.i !== null && idx < step.i;

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-xl font-bold transition-all ${
                  isProcessing ? 'border-amber-400 bg-amber-500/25 text-amber-200 scale-105 shadow-md shadow-amber-500/20' :
                  isPast ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-200' : 'border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk-faint)]'
                }`}>
                  {ch}
                </div>
                <span className="text-[10px] text-[#5b6076]">[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subsets Collection */}
      <div className="w-full p-4 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] flex flex-col gap-2 font-mono text-xs">
        <span className="text-[var(--chalk-dim)]">Subsets Produced ({step.subsets.length} / 8):</span>
        <div className="flex flex-wrap items-center gap-2">
          {step.subsets.map((sub, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm"
            >
              {sub}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

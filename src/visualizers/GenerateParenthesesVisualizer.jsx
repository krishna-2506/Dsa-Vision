import React from 'react';

export const meta = {
  title: 'Generate Parentheses',
  category: 'Recursion / Backtracking',
  difficulty: 'Medium',
  timeComplexity: 'O(4^N / sqrt(N)) - Catalan number',
  spaceComplexity: 'O(2N) recursion stack',
  description: 'Generates all combinations of well-formed parentheses using recursive backtracking, respecting the rules: open brackets < n, and close brackets < open brackets.'
};

export const solutions = {
  cpp: `// C++ Generate Parentheses (Backtracking)
// Time: O(4^N / sqrt(N)) | Space: O(N)
#include <vector>
#include <string>
using namespace std;

class Solution {
private:
    void backtrack(int open, int close, int n, string& current, vector<string>& result) {
        // Base case: valid string of length 2*n constructed
        if (current.length() == 2 * n) {
            result.push_back(current);
            return;
        }

        // We can add '(' if we haven't used all n opening brackets
        if (open < n) {
            current.push_back('(');
            backtrack(open + 1, close, n, current, result);
            current.pop_back(); // backtrack
        }

        // We can add ')' only if close count is strictly less than open count
        if (close < open) {
            current.push_back(')');
            backtrack(open, close + 1, n, current, result);
            current.pop_back(); // backtrack
        }
    }
public:
    vector<string> generateParenthesis(int n) {
        vector<string> result;
        string current = "";
        backtrack(0, 0, n, current, result);
        return result;
    }
};`,
  python: `# Python 3 Generate Parentheses (Backtracking)
class Solution:
    def generateParenthesis(self, n: int) -> list[str]:
        result = []

        def backtrack(open_count: int, close_count: int, current: str):
            if len(current) == 2 * n:
                result.append(current)
                return

            if open_count < n:
                backtrack(open_count + 1, close_count, current + '(')

            if close_count < open_count:
                backtrack(open_count, close_count + 1, current + ')')

        backtrack(0, 0, "")
        return result`,
  java: `// Java Generate Parentheses (Backtracking)
import java.util.*;

class Solution {
    private void backtrack(int open, int close, int n, StringBuilder sb, List<String> result) {
        if (sb.length() == 2 * n) {
            result.add(sb.toString());
            return;
        }

        if (open < n) {
            sb.append('(');
            backtrack(open + 1, close, n, sb, result);
            sb.deleteCharAt(sb.length() - 1);
        }

        if (close < open) {
            sb.append(')');
            backtrack(open, close + 1, n, sb, result);
            sb.deleteCharAt(sb.length() - 1);
        }
    }

    public List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<>();
        backtrack(0, 0, n, new StringBuilder(), result);
        return result;
    }
}`,
  javascript: `// JavaScript Generate Parentheses (Backtracking)
var generateParenthesis = function(n) {
    const result = [];

    function backtrack(open, close, current) {
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }

        if (open < n) {
            backtrack(open + 1, close, current + '(');
        }

        if (close < open) {
            backtrack(open, close + 1, current + ')');
        }
    }

    backtrack(0, 0, '');
    return result;
};`
};

export const steps = [
  {
    title: '1. Start with n = 2 pairs: Total length will be 2 * n = 4',
    phase: 'INITIAL',
    codeLine: 35,
    open: 0,
    close: 0,
    n: 2,
    current: '',
    results: [],
    variables: { open: 0, close: 0, n: 2, current: '""' },
    explain: 'At each position, we can place "(" if open < n, and ")" if close < open. Both conditions ensure balanced structure.',
    intuition: 'A closing bracket cannot precede its matching opening bracket.'
  },
  {
    title: '2. Place "(": open = 1, current = "("',
    phase: 'ADD_OPEN',
    codeLine: 18,
    open: 1,
    close: 0,
    n: 2,
    current: '(',
    results: [],
    variables: { open: 1, close: 0, current: '"("' },
    explain: 'open count 0 < 2, so we append "(". Branch explores all continuations starting with "(".',
    intuition: 'First bracket must always be open.'
  },
  {
    title: '3. Place second "(": open = 2, current = "(("',
    phase: 'ADD_OPEN',
    codeLine: 18,
    open: 2,
    close: 0,
    n: 2,
    current: '((',
    results: [],
    variables: { open: 2, close: 0, current: '"(("' },
    explain: 'open count 1 < 2, append second "(". Now all 2 opening brackets are placed (open == n). Next must be closing.',
    intuition: 'Open brackets exhausted for this branch.'
  },
  {
    title: '4. Place ")" and ")": current = "(())" -> Valid Combination 1 Found!',
    phase: 'VALID_FOUND',
    codeLine: 12,
    open: 2,
    close: 2,
    n: 2,
    current: '(())',
    results: ['(())'],
    variables: { completedCombination: '"(())"', resultsCount: 1 },
    explain: 'Since open == 2 and close < open, we must append two closing brackets. Length reaches 4. Add "(())" to results.',
    intuition: 'Base case reached. First valid combination.'
  },
  {
    title: '5. Backtrack to "(" then place ")": current = "()" -> open=1, close=1',
    phase: 'BACKTRACK_BRANCH',
    codeLine: 25,
    open: 1,
    close: 1,
    n: 2,
    current: '()',
    results: ['(())'],
    variables: { current: '"()"', open: 1, close: 1 },
    explain: 'Backtrack to length 1 and explore alternative branch: placing ")" right after initial "(".',
    intuition: 'Alternative valid structure.'
  },
  {
    title: '6. Place remaining "(" and ")": current = "()()" -> Valid Combination 2 Found!',
    phase: 'COMPLETED',
    codeLine: 12,
    open: 2,
    close: 2,
    n: 2,
    current: '()()',
    results: ['(())', '()()'],
    variables: { allCombinations: '["(())", "()()"]', totalCount: 2 },
    explain: 'Appended remaining "(" then ")". All combinations for n = 2 generated: ["(())", "()()"].',
    intuition: 'Catalan number C_2 = 2 combinations.'
  }
];

export default function GenerateParenthesesVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Open Used: {step.open} / {step.n}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Close Used: {step.close} / {step.n}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Valid Combinations = {step.results.length}
        </span>
      </div>

      {/* Active Backtracking String Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-3">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">Current Backtracking String</span>
        
        <div className="flex items-center justify-center gap-2 py-2">
          {Array.from({ length: step.n * 2 }).map((_, idx) => {
            const char = step.current[idx];
            return (
              <div key={idx} className={`w-12 h-14 rounded-xl border flex flex-col items-center justify-center font-mono font-bold text-lg transition-all ${
                char 
                  ? 'border-amber-500 bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/40 shadow-sm'
                  : 'border-[#272b3c] bg-[#161824] text-slate-600'
              }`}>
                <span>{char || '·'}</span>
                <span className="text-[8px] text-slate-500">pos {idx}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Generated Solutions Pool */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-4 flex flex-col gap-2">
        <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">Generated Balanced Solutions</span>
        <div className="flex items-center gap-3 flex-wrap">
          {step.results.map((combo, idx) => (
            <span key={idx} className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-sm">
              {combo}
            </span>
          ))}
          {step.results.length === 0 && <span className="text-xs text-slate-500 font-mono italic">Backtracking tree in progress...</span>}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

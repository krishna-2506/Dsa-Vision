import React from 'react';

export const meta = {
  title: 'Minimum Bracket Reversals to Balance Expression',
  category: 'Strings',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Calculates the minimum number of bracket reversals needed to make a string of curly braces balanced. If length is odd, balancing is impossible (-1).'
};

export const solutions = {
  cpp: `// C++ Minimum Bracket Reversals
// Time: O(N) | Space: O(1)
#include <string>
using namespace std;

class Solution {
public:
    int countRev(string s) {
        int n = s.length();
        if (n % 2 != 0) return -1; // Odd length impossible

        int open = 0, close = 0;
        for (char ch : s) {
            if (ch == '{') {
                open++;
            } else {
                if (open > 0) {
                    open--; // Matched pair {}
                } else {
                    close++; // Unmatched '}'
                }
            }
        }

        // Formula: ceil(open / 2) + ceil(close / 2)
        return (open + 1) / 2 + (close + 1) / 2;
    }
};`,
  python: `# Python 3 Minimum Bracket Reversals
# Time: O(N) | Space: O(1)
class Solution:
    def countRev(self, s: str) -> int:
        if len(s) % 2 != 0:
            return -1

        open_cnt = 0
        close_cnt = 0

        for ch in s:
            if ch == '{':
                open_cnt += 1
            else:
                if open_cnt > 0:
                    open_cnt -= 1
                else:
                    close_cnt += 1

        return (open_cnt + 1) // 2 + (close_cnt + 1) // 2`,
  java: `// Java Minimum Bracket Reversals
// Time: O(N) | Space: O(1)
class Solution {
    public int countRev(String s) {
        if (s.length() % 2 != 0) return -1;

        int open = 0, close = 0;
        for (char ch : s.toCharArray()) {
            if (ch == '{') {
                open++;
            } else {
                if (open > 0) open--;
                else close++;
            }
        }

        return (open + 1) / 2 + (close + 1) / 2;
    }
}`,
  javascript: `// JavaScript Minimum Bracket Reversals
// Time: O(N) | Space: O(1)
var countRev = function(s) {
    if (s.length % 2 !== 0) return -1;

    let open = 0, close = 0;
    for (const ch of s) {
        if (ch === '{') {
            open++;
        } else {
            if (open > 0) open--;
            else close++;
        }
    }

    return Math.floor((open + 1) / 2) + Math.floor((close + 1) / 2);
};`
};

export const steps = [
  {
    title: '1. Parity Check & Initialization: s = "}{{}}{{"',
    phase: 'INIT',
    codeLine: 11,
    s: '}{{}}{{',
    openCount: 0,
    closeCount: 0,
    unmatched: 'None',
    variables: { s: '"}{{}}{{"', length: 6, parity: 'Even (Feasible)' },
    explain: 'String length is 6 (even). If length were odd, it would be impossible to pair up brackets and we would return -1.',
    intuition: 'Each balanced pair consumes 2 brackets; total brackets must be even.'
  },
  {
    title: '2. Cancel Out Valid Matching Pairs: "{}"',
    phase: 'CANCEL_PAIRS',
    codeLine: 18,
    s: '}{{}}{{',
    openCount: 2,
    closeCount: 1,
    unmatched: '} {{',
    variables: { 'Valid pair': '"{}" inside cancelled out', 'Remaining unmatched': '1 "}" and 2 "{"' },
    explain: 'The internal "{}" pair is matched and eliminated. We are left with 1 unmatched closing bracket and 2 unmatched opening brackets: "} {{".',
    intuition: 'After cancellation, unmatched brackets always look like }}}...{{{.'
  },
  {
    title: '3. Calculate Reversals: ceil(open/2) + ceil(close/2)',
    phase: 'FORMULA',
    codeLine: 26,
    s: '}{{}}{{',
    openCount: 2,
    closeCount: 1,
    unmatched: '} {{',
    variables: { 'close=1': 'ceil(1/2) = 1 reversal', 'open=2': 'ceil(2/2) = 1 reversal', total: '1 + 1 = 2 reversals' },
    explain: 'Reversing 1 "}" produces "{". Reversing 1 "{" produces "}". Resulting string "{}{}{}" is balanced!',
    intuition: 'Two opposite unmatched brackets ("}{") require 2 reversals to become "{}".'
  },
  {
    title: '4. Optimal Result: Minimum Reversals = 2',
    phase: 'COMPLETED',
    codeLine: 27,
    s: '}{{}}{{',
    openCount: 2,
    closeCount: 1,
    unmatched: '} {{',
    minReversals: 2,
    variables: { result: 2, balancedForm: '"{}{}{}"' },
    explain: 'Exactly 2 reversals needed to transform "}{{}}{{" into balanced expression "{}{}{}". Time complexity O(N), space O(1).',
    intuition: 'Formula (open+1)/2 + (close+1)/2 solves any bracket configuration in constant space.'
  }
];

export default function MinimumNumberOfBracketReversalsToMakeAnExpressionBalancedVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Unmatched: open={step.openCount}, close={step.closeCount}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Min Reversals: {step.minReversals || 2}
        </span>
      </div>

      {/* Bracket Stream */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Bracket Stream with Match Reduction
        </span>

        <div className="flex items-center justify-center gap-2 py-2 font-mono">
          {step.s.split('').map((ch, idx) => {
            const isMatchedPair = idx === 2 || idx === 3;

            return (
              <div
                key={idx}
                className={`w-12 h-16 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 ${
                  isMatchedPair
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-slate-500 line-through'
                    : 'border-amber-500/40 bg-amber-500/15 text-amber-300'
                }`}
              >
                <span className="text-[9px] text-[#8a8ea3]">[{idx}]</span>
                <span className="text-xl font-bold mt-0.5">{ch}</span>
              </div>
            );
          })}
        </div>

        {/* Remaining Unmatched Form */}
        <div className="w-full border-t border-[#272b3c] pt-3 flex flex-col items-center gap-1 font-mono text-xs">
          <span className="text-slate-400">
            Unmatched Pattern:{' '}
            <span className="text-amber-300 font-bold">"{step.unmatched}"</span>
          </span>
        </div>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Valid Parenthesis String with Wildcards (*)',
  category: 'Greedy Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Determines if a string containing parentheses and wildcards (*) is valid. Uses a greedy range [cmin, cmax] tracking the minimum and maximum possible count of open parentheses in O(N) time and O(1) space.'
};

export const solutions = {
  cpp: `// C++ Valid Parenthesis String (* Wildcards)
// Time: O(N) | Space: O(1)
#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    bool checkValidString(string s) {
        int cmin = 0, cmax = 0;

        for (char ch : s) {
            if (ch == '(') {
                cmin++;
                cmax++;
            } else if (ch == ')') {
                cmin = max(0, cmin - 1);
                cmax--;
            } else { // '*' wildcard
                cmin = max(0, cmin - 1); // '*' as ')'
                cmax++;                 // '*' as '('
            }

            if (cmax < 0) return false; // Unmatched ')'
        }

        return cmin == 0;
    }
};`,
  python: `# Python 3 Valid Parenthesis String
# Time: O(N) | Space: O(1)
class Solution:
    def checkValidString(self, s: str) -> bool:
        cmin = 0
        cmax = 0

        for ch in s:
            if ch == '(':
                cmin += 1
                cmax += 1
            elif ch == ')':
                cmin = max(0, cmin - 1)
                cmax -= 1
            else: # '*'
                cmin = max(0, cmin - 1)
                cmax += 1

            if cmax < 0:
                return False

        return cmin == 0`,
  java: `// Java Valid Parenthesis String
// Time: O(N) | Space: O(1)
class Solution {
    public boolean checkValidString(String s) {
        int cmin = 0, cmax = 0;

        for (char ch : s.toCharArray()) {
            if (ch == '(') {
                cmin++;
                cmax++;
            } else if (ch == ')') {
                cmin = Math.max(0, cmin - 1);
                cmax--;
            } else {
                cmin = Math.max(0, cmin - 1);
                cmax++;
            }

            if (cmax < 0) return false;
        }

        return cmin == 0;
    }
}`,
  javascript: `// JavaScript Valid Parenthesis String
// Time: O(N) | Space: O(1)
var checkValidString = function(s) {
    let cmin = 0, cmax = 0;

    for (const ch of s) {
        if (ch === '(') {
            cmin++;
            cmax++;
        } else if (ch === ')') {
            cmin = Math.max(0, cmin - 1);
            cmax--;
        } else {
            cmin = Math.max(0, cmin - 1);
            cmax++;
        }

        if (cmax < 0) return false;
    }

    return cmin === 0;
};`
};

export const steps = [
  {
    title: '1. Input: s = "(*))", Goal: Validate with [cmin, cmax]',
    phase: 'INIT',
    codeLine: 11,
    s: '(*))',
    idx: -1,
    cmin: 0,
    cmax: 0,
    variables: { s: '"(*))"', range: '[0, 0]', meaning: 'cmin: min open brackets, cmax: max open brackets' },
    explain: 'Instead of exploring branching possibilities recursively (O(3^N)), maintain the interval [cmin, cmax] of valid active open bracket counts.',
    intuition: 'If 0 is within [cmin, cmax] at the end, a valid assignment exists.'
  },
  {
    title: '2. Process "(" & "*": cmin = 0, cmax = 2',
    phase: 'OPEN_AND_STAR',
    codeLine: 20,
    s: '(*))',
    idx: 1,
    cmin: 0,
    cmax: 2,
    variables: { 'Char 0 "(":': '[1, 1]', 'Char 1 "*":': 'cmin=max(0, 1-1)=0, cmax=1+1=2', currentRange: '[0, 2]' },
    explain: 'After "(", open count is 1. When encountering "*", it could be ")", "", or "(". Thus open brackets range is [0, 2].',
    intuition: 'Wildcard expands the possible count window in both directions.'
  },
  {
    title: '3. Process First ")": cmin = 0, cmax = 1',
    phase: 'FIRST_CLOSE',
    codeLine: 17,
    s: '(*))',
    idx: 2,
    cmin: 0,
    cmax: 1,
    variables: { 'Char 2 ")":': 'cmin=max(0, 0-1)=0, cmax=2-1=1', currentRange: '[0, 1]' },
    explain: 'Closing bracket reduces maximum needed opens: cmax becomes 1. cmin stays at 0 because "*" could have acted as "(".',
    intuition: 'Valid window narrows toward balance.'
  },
  {
    title: '4. Process Second ")": cmin = 0, cmax = 0 -> Valid (True)',
    phase: 'COMPLETED',
    codeLine: 26,
    s: '(*))',
    idx: 3,
    cmin: 0,
    cmax: 0,
    isValid: true,
    assignment: 'Treat "*" as "(" -> "(())"',
    variables: { finalRange: '[0, 0]', cmin: 0, result: 'True (Valid)' },
    explain: 'Second ")" brings cmax to 0. Since cmin == 0, the string is fully balanced! Equivalent valid string is "(())".',
    intuition: 'O(1) auxiliary space replaces exponential recursion.'
  }
];

export default function ValidParanthesisCheckerVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Range [cmin, cmax]: [{step.cmin}, {step.cmax}]
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Status: {step.isValid ? 'Valid Balanced String' : 'Evaluating Stream'}
        </span>
      </div>

      {/* String Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Character Stream &amp; Range Propagation
        </span>

        <div className="flex items-center justify-center gap-3 py-2 font-mono">
          {step.s.split('').map((ch, idx) => {
            const isCurrent = idx === step.idx;
            const isProcessed = idx <= step.idx;

            return (
              <div
                key={idx}
                className={`w-14 h-20 rounded-2xl border flex flex-col items-center justify-center transition-all duration-300 ${
                  isCurrent
                    ? 'border-cyan-400 bg-cyan-500/25 text-cyan-300 ring-2 ring-cyan-500/50 scale-105 shadow-lg'
                    : isProcessed
                    ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                    : 'border-[#272b3c] bg-[#161824] text-slate-500'
                }`}
              >
                <span className="text-[9px] text-[#8a8ea3]">[{idx}]</span>
                <span className="text-xl font-bold mt-1 text-amber-300">{ch}</span>
              </div>
            );
          })}
        </div>

        {step.assignment && (
          <div className="w-full border-t border-[#272b3c] pt-3 flex flex-col items-center gap-1 font-mono text-xs">
            <span className="text-slate-400">
              Optimal Wildcard Assignment:{' '}
              <span className="text-emerald-300 font-bold">{step.assignment}</span>
            </span>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

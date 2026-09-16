import React from 'react';

export const meta = {
  title: 'Remove Outermost Parentheses',
  category: 'Strings & Stack Counting',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Decomposes a valid parentheses string into primitive components and strips the outermost enclosing parentheses of each primitive block.'
};

export const solutions = {
  cpp: `// C++ Remove Outermost Parentheses
// Time Complexity: O(N) | Space Complexity: O(1) auxiliary
#include <string>
using namespace std;

class Solution {
public:
    string removeOuterParentheses(string s) {
        string result = "";
        int opened = 0;

        for (char c : s) {
            if (c == '(') {
                if (opened > 0) result += c;
                opened++;
            } else {
                opened--;
                if (opened > 0) result += c;
            }
        }

        return result;
    }
};`,
  python: `# Python 3 Remove Outermost Parentheses
class Solution:
    def removeOuterParentheses(self, s: str) -> str:
        result = []
        opened = 0

        for c in s:
            if c == '(':
                if opened > 0:
                    result.append(c)
                opened += 1
            else:
                opened -= 1
                if opened > 0:
                    result.append(c)

        return "".join(result)`,
  java: `// Java Remove Outermost Parentheses
class Solution {
    public String removeOuterParentheses(String s) {
        StringBuilder result = new StringBuilder();
        int opened = 0;

        for (char c : s.toCharArray()) {
            if (c == '(') {
                if (opened > 0) result.append(c);
                opened++;
            } else {
                opened--;
                if (opened > 0) result.append(c);
            }
        }

        return result.toString();
    }
}`,
  javascript: `// JavaScript Remove Outermost Parentheses
var removeOuterParentheses = function(s) {
    let result = '';
    let opened = 0;

    for (const c of s) {
        if (c === '(') {
            if (opened > 0) result += c;
            opened++;
        } else {
            opened--;
            if (opened > 0) result += c;
        }
    }

    return result;
};`
};

export const steps = [
  {
    title: '1. Input: "(()())(())", opened = 0, result = ""',
    phase: 'INITIAL',
    codeLine: 11,
    chars: ['(', '(', ')', '(', ')', ')', '(', '(', ')', ')'],
    currIdx: -1,
    opened: 0,
    result: '',
    action: 'Scan parentheses from left to right',
    variables: { opened: 0, result: '""', primitives: 'P1: "(()())", P2: "(())"' },
    explain: 'String decomposes into two primitive valid components: "(()())" and "(())". We strip the outer layer of each.',
    intuition: 'If opened > 0 when seeing "(", it is internal. If opened > 0 after decrementing on ")", it is internal.'
  },
  {
    title: '2. idx 0 "(": opened is 0 -> Outermost "(" skipped! opened becomes 1',
    phase: 'OUTER_OPEN',
    codeLine: 15,
    chars: ['(', '(', ')', '(', ')', ')', '(', '(', ')', ')'],
    currIdx: 0,
    opened: 1,
    result: '',
    action: 'Skipped outer "("',
    variables: { char: '(', opened: 1, action: 'Outermost paren of P1 detected, do not append' },
    explain: 'Since opened was 0, this "(" starts primitive block P1. Increment opened to 1 without adding to result.',
    intuition: 'Outer boundary stripped.'
  },
  {
    title: '3. idx 1-4 "()()": Internal tokens -> Appended! result = "()()"',
    phase: 'INTERNAL',
    codeLine: 14,
    chars: ['(', '(', ')', '(', ')', ')', '(', '(', ')', ')'],
    currIdx: 4,
    opened: 1,
    result: '()()',
    action: 'Appended inner parentheses: "()()"',
    variables: { indices: '1..4', opened: 1, result: '"()()"' },
    explain: 'For indices 1, 2, 3, 4, the depth remains > 0. All 4 characters are preserved inside result.',
    intuition: 'Internal structure kept intact.'
  },
  {
    title: '4. idx 5 ")": opened decrements 1 -> 0 -> Outermost ")" skipped! P1 ended',
    phase: 'OUTER_CLOSE',
    codeLine: 17,
    chars: ['(', '(', ')', '(', ')', ')', '(', '(', ')', ')'],
    currIdx: 5,
    opened: 0,
    result: '()()',
    action: 'Skipped outer ")", completed P1',
    variables: { char: ')', opened: 0, action: 'Outermost closing of P1, do not append' },
    explain: 'Decrement opened to 0. Since opened is now 0, this ")" was the outermost closing paren of P1. Skipped!',
    intuition: 'P1 outer wrap discarded.'
  },
  {
    title: '5. idx 6-9 "(())": Primitive P2 processed -> Outer stripped, append inner "()"',
    phase: 'PROCESS_P2',
    codeLine: 14,
    chars: ['(', '(', ')', '(', ')', ')', '(', '(', ')', ')'],
    currIdx: 8,
    opened: 1,
    result: '()()()',
    action: 'Appended inner paren of P2: "()"',
    variables: { primitive: 'P2 "(())" -> "()"', result: '"()()()"' },
    explain: 'idx 6 "(" skipped (outer). idx 7 "(" and idx 8 ")" appended. idx 9 ")" skipped (outer).',
    intuition: 'P2 processed identically.'
  },
  {
    title: '6. End of String: Final Result = "()()()"',
    phase: 'COMPLETED',
    codeLine: 22,
    chars: ['(', '(', ')', '(', ')', ')', '(', '(', ')', ')'],
    currIdx: 9,
    opened: 0,
    result: '()()()',
    action: 'Finished processing all primitive components',
    variables: { finalResult: '"()()()"', timeComplexity: 'O(N)', spaceComplexity: 'O(1) aux' },
    explain: 'Both outer shells were stripped cleanly, leaving only the inner parentheses: "()()()".',
    intuition: 'Completed in single linear pass.'
  }
];

export default function RemoveOutermostParenthesesVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Opened Depth = {step.opened}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
          Action: {step.action}
        </span>
      </div>

      {/* Input Parentheses stream */}
      <div className="w-full flex items-center justify-center gap-2 py-3 overflow-x-auto">
        {step.chars.map((char, idx) => {
          const isCurrent = idx === step.currIdx;
          const isOuter = (idx === 0 || idx === 5 || idx === 6 || idx === 9);

          let borderClass = 'border-[#272b3c] bg-[#12131b] text-slate-300';
          if (isCurrent) {
            borderClass = 'border-amber-500 bg-amber-500/30 text-amber-300 ring-2 ring-amber-500/30 shadow-lg';
          } else if (isOuter && idx <= step.currIdx) {
            borderClass = 'border-rose-500/40 bg-rose-500/10 text-rose-300 line-through opacity-60';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[36px]">
              <div className={`w-9 h-11 rounded-xl border flex items-center justify-center font-mono font-bold text-base transition-all duration-300 ${borderClass}`}>
                {char}
              </div>
              <span className="text-[9px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Result Accumulator */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-4 flex flex-col items-center gap-2 text-xs font-mono">
        <span className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
          Stripped Output String:
        </span>
        <div className="px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 font-mono font-bold text-lg tracking-widest min-h-[46px] flex items-center">
          {step.result || <span className="text-emerald-500/40 italic text-sm">Empty</span>}
        </div>
      </div>
    </div>
  );
}

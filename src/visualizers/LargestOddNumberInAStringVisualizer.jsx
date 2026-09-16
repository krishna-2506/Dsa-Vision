import React from 'react';

export const meta = {
  title: 'Largest Odd Number in a String',
  category: 'Strings & Greedy',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the largest-valued odd integer substring by scanning from the end of the string to find the rightmost odd digit.'
};

export const solutions = {
  cpp: `// C++ Largest Odd Number in String
// Time Complexity: O(N) | Space Complexity: O(1)
#include <string>
using namespace std;

class Solution {
public:
    string largestOddNumber(string num) {
        for (int i = (int)num.size() - 1; i >= 0; i--) {
            if ((num[i] - '0') % 2 != 0) {
                return num.substr(0, i + 1);
            }
        }
        return "";
    }
};`,
  python: `# Python 3 Largest Odd Number in String
class Solution:
    def largestOddNumber(self, num: str) -> str:
        for i in range(len(num) - 1, -1, -1):
            if int(num[i]) % 2 != 0:
                return num[:i + 1]
        return ""`,
  java: `// Java Largest Odd Number in String
class Solution {
    public String largestOddNumber(String num) {
        for (int i = num.length() - 1; i >= 0; i--) {
            if ((num.charAt(i) - '0') % 2 != 0) {
                return num.substring(0, i + 1);
            }
        }
        return "";
    }
}`,
  javascript: `// JavaScript Largest Odd Number in String
var largestOddNumber = function(num) {
    for (let i = num.length - 1; i >= 0; i--) {
        if (parseInt(num[i]) % 2 !== 0) {
            return num.substring(0, i + 1);
        }
    }
    return "";
};`
};

export const steps = [
  {
    title: '1. Input Number: "35427", Scan from Right to Left',
    phase: 'INITIAL',
    codeLine: 10,
    numStr: '35427',
    currIdx: -1,
    result: '',
    variables: { num: '"35427"', length: 5 },
    explain: 'A number is odd if and only if its last digit is odd. To get the maximum value, take the substring from index 0 to the rightmost odd digit.',
    intuition: 'Backward scan finds the rightmost odd digit in O(N).'
  },
  {
    title: '2. Check index 4: digit = \'7\' -> 7 % 2 != 0 (ODD DIGIT FOUND!)',
    phase: 'FOUND_ODD',
    codeLine: 12,
    numStr: '35427',
    currIdx: 4,
    result: '35427',
    variables: { i: 4, digit: '7', isOdd: true, prefix: 'num[0..4]' },
    explain: "Rightmost digit '7' is odd! Substring num[0..4] ('35427') is an odd number and spans the entire length.",
    intuition: 'Since last character is odd, the whole string is the largest odd number.'
  },
  {
    title: '3. Completed: Return "35427"',
    phase: 'COMPLETED',
    codeLine: 13,
    numStr: '35427',
    currIdx: 4,
    result: '35427',
    variables: { result: '"35427"', timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    explain: 'Found immediately in O(1) step. The largest odd number substring is "35427".',
    intuition: 'Immediate return.'
  }
];

export default function LargestOddNumberInAStringVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Scanning Right-to-Left: idx = {step.currIdx !== -1 ? step.currIdx : 'Start'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Largest Odd Substring = {step.result ? `"${step.result}"` : 'None'}
        </span>
      </div>

      {/* Digits Display */}
      <div className="w-full flex items-center justify-center gap-2 py-3 overflow-x-auto">
        {step.numStr.split('').map((ch, idx) => {
          const isOdd = Number(ch) % 2 !== 0;
          const isCurrent = idx === step.currIdx;

          let borderClass = 'border-[#272b3c] bg-[#12131b] text-slate-200';
          if (isCurrent) {
            borderClass = 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/30 shadow-lg';
          } else if (isOdd) {
            borderClass = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[44px]">
              <div className={`w-12 h-14 rounded-xl border flex flex-col items-center justify-center font-mono font-bold text-base transition-all ${borderClass}`}>
                <span>{ch}</span>
                <span className={`text-[9px] font-normal ${isOdd ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {isOdd ? 'odd' : 'even'}
                </span>
              </div>
              <span className="text-[9px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Result Card */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-4 flex flex-col items-center gap-2 text-xs font-mono">
        <span className="text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
          Extracted Substring Result:
        </span>
        <div className="px-6 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 font-mono font-bold text-lg">
          {step.result ? `"${step.result}"` : '""'}
        </div>
      </div>
    </div>
  );
}

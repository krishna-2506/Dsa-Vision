import React from 'react';

export const meta = {
  title: 'Roman to Integer',
  category: 'Strings & Math Mapping',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Converts a Roman numeral string to its corresponding integer value by handling additive and subtractive roman numeral rules.'
};

export const solutions = {
  cpp: `// C++ Roman to Integer
// Time Complexity: O(N) | Space Complexity: O(1)
#include <string>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int romanToInt(string s) {
        unordered_map<char, int> roman = {
            {'I', 1}, {'V', 5}, {'X', 10},
            {'L', 50}, {'C', 100}, {'D', 500}, {'M', 1000}
        };

        int total = 0;
        int n = s.length();

        for (int i = 0; i < n; i++) {
            // Subtractive rule if current value is strictly smaller than next
            if (i + 1 < n && roman[s[i]] < roman[s[i + 1]]) {
                total -= roman[s[i]];
            } else {
                total += roman[s[i]];
            }
        }

        return total;
    }
};`,
  python: `# Python 3 Roman to Integer
class Solution:
    def romanToInt(self, s: str) -> int:
        roman = {
            'I': 1, 'V': 5, 'X': 10,
            'L': 50, 'C': 100, 'D': 500, 'M': 1000
        }
        total = 0
        n = len(s)

        for i in range(n):
            if i + 1 < n and roman[s[i]] < roman[s[i + 1]]:
                total -= roman[s[i]]
            else:
                total += roman[s[i]]

        return total`,
  java: `// Java Roman to Integer
import java.util.HashMap;

class Solution {
    public int romanToInt(String s) {
        HashMap<Character, Integer> roman = new HashMap<>();
        roman.put('I', 1); roman.put('V', 5); roman.put('X', 10);
        roman.put('L', 50); roman.put('C', 100); roman.put('D', 500); roman.put('M', 1000);

        int total = 0;
        int n = s.length();

        for (int i = 0; i < n; i++) {
            if (i + 1 < n && roman.get(s.charAt(i)) < roman.get(s.charAt(i + 1))) {
                total -= roman.get(s.charAt(i));
            } else {
                total += roman.get(s.charAt(i));
            }
        }

        return total;
    }
}`,
  javascript: `// JavaScript Roman to Integer
var romanToInt = function(s) {
    const roman = {
        'I': 1, 'V': 5, 'X': 10,
        'L': 50, 'C': 100, 'D': 500, 'M': 1000
    };

    let total = 0;
    const n = s.length;

    for (let i = 0; i < n; i++) {
        if (i + 1 < n && roman[s[i]] < roman[s[i + 1]]) {
            total -= roman[s[i]];
        } else {
            total += roman[s[i]];
        }
    }

    return total;
};`
};

export const steps = [
  {
    title: '1. Roman Numeral: "MCMXCIV", Total = 0',
    phase: 'INITIAL',
    codeLine: 18,
    s: 'MCMXCIV',
    currIdx: -1,
    action: 'Scan each symbol',
    runningTotal: 0,
    variables: { roman: '"MCMXCIV"', total: 0 },
    explain: 'Roman symbols: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. If current < next, subtract; else add.',
    intuition: 'Subtractive rule applies for IV(4), IX(9), XL(40), XC(90), CD(400), CM(900).'
  },
  {
    title: '2. idx 0: \'M\' (1000) ≥ \'C\' (100) -> Add +1000 -> Total = 1000',
    phase: 'ADD',
    codeLine: 23,
    s: 'MCMXCIV',
    currIdx: 0,
    action: '+1000',
    runningTotal: 1000,
    variables: { char: 'M', val: 1000, nextVal: 100, total: 1000 },
    explain: "M (1000) >= C (100). Add 1000 to total.",
    intuition: 'Standard addition.'
  },
  {
    title: '3. idx 1: \'C\' (100) < \'M\' (1000) -> Subtractive Rule! -100 -> Total = 900',
    phase: 'SUBTRACT',
    codeLine: 21,
    s: 'MCMXCIV',
    currIdx: 1,
    action: '-100 (CM = 900 part 1)',
    runningTotal: 900,
    variables: { char: 'C', val: 100, nextVal: 1000, total: 900 },
    explain: "C (100) is smaller than next symbol M (1000). Subtract 100.",
    intuition: 'CM forms 900.'
  },
  {
    title: '4. idx 2: \'M\' (1000) ≥ \'X\' (10) -> Add +1000 -> Total = 1900',
    phase: 'ADD',
    codeLine: 23,
    s: 'MCMXCIV',
    currIdx: 2,
    action: '+1000',
    runningTotal: 1900,
    variables: { char: 'M', val: 1000, nextVal: 10, total: 1900 },
    explain: "Add 1000. Running total reaches 1900.",
    intuition: 'Completes 900 offset.'
  },
  {
    title: '5. idx 3: \'X\' (10) < \'C\' (100) -> Subtractive Rule! -10 -> Total = 1890',
    phase: 'SUBTRACT',
    codeLine: 21,
    s: 'MCMXCIV',
    currIdx: 3,
    action: '-10 (XC = 90 part 1)',
    runningTotal: 1890,
    variables: { char: 'X', val: 10, nextVal: 100, total: 1890 },
    explain: "X (10) < C (100). Subtract 10. (XC represents 90).",
    intuition: 'Subtractive pair.'
  },
  {
    title: '6. idx 4: \'C\' (100) ≥ \'I\' (1) -> Add +100 -> Total = 1990',
    phase: 'ADD',
    codeLine: 23,
    s: 'MCMXCIV',
    currIdx: 4,
    action: '+100',
    runningTotal: 1990,
    variables: { char: 'C', val: 100, nextVal: 1, total: 1990 },
    explain: "Add 100. Total becomes 1990.",
    intuition: 'Additive.'
  },
  {
    title: '7. idx 5: \'I\' (1) < \'V\' (5) -> Subtractive Rule! -1 -> Total = 1989',
    phase: 'SUBTRACT',
    codeLine: 21,
    s: 'MCMXCIV',
    currIdx: 5,
    action: '-1 (IV = 4 part 1)',
    runningTotal: 1989,
    variables: { char: 'I', val: 1, nextVal: 5, total: 1989 },
    explain: "I (1) < V (5). Subtract 1. (IV represents 4).",
    intuition: 'Subtractive pair.'
  },
  {
    title: '8. idx 6: \'V\' (5) (last symbol) -> Add +5 -> Total = 1994!',
    phase: 'COMPLETED',
    codeLine: 27,
    s: 'MCMXCIV',
    currIdx: 6,
    action: '+5',
    runningTotal: 1994,
    variables: { finalInteger: 1994, timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    explain: "Add 5. Final Integer = 1994. Completed in single linear pass.",
    intuition: 'Total calculation finished.'
  }
];

export default function RomanToIntegerVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Current Action: {step.action}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Running Total = {step.runningTotal}
        </span>
      </div>

      {/* Roman Numeral Symbols */}
      <div className="w-full flex items-center justify-center gap-2 py-3 overflow-x-auto">
        {step.s.split('').map((ch, idx) => {
          const isCurrent = idx === step.currIdx;

          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[48px]">
              <div
                className={`w-12 h-14 rounded-xl border flex flex-col items-center justify-center font-serif font-bold text-lg transition-all ${
                  isCurrent
                    ? 'border-amber-500 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/30 shadow-lg'
                    : 'border-[#272b3c] bg-[#12131b] text-slate-200'
                }`}
              >
                <span>{ch}</span>
              </div>
              <span className="text-[9px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Conversion total badge */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-4 flex flex-col items-center gap-1 text-xs font-mono">
        <span className="text-[11px] text-indigo-400 font-semibold uppercase tracking-wider">
          Converted Value:
        </span>
        <span className="text-2xl font-mono font-bold text-emerald-300">
          {step.runningTotal}
        </span>
      </div>
    </div>
  );
}

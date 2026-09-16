import React from 'react';

export const meta = {
  title: 'Count All Digits of a Number',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(log10 N)',
  spaceComplexity: 'O(1)',
  description: 'Counts the total number of digits in a given integer N using repeated division by 10 (or in O(1) time using floor(log10(N)) + 1).'
};

export const solutions = {
  cpp: `// C++: Count Digits
#include <iostream>
#include <cmath>
using namespace std;

// Method 1: Iterative division - O(log10 N)
int countDigitsIterative(int n) {
    int cnt = 0;
    while (n > 0) {
        cnt++;
        n = n / 10;
    }
    return cnt;
}

// Method 2: Logarithmic formula - O(1)
int countDigitsFormula(int n) {
    if (n == 0) return 1;
    return (int)(log10(n) + 1);
}`,
  java: `// Java: Count Digits
class Solution {
    static int countDigits(int n) {
        int cnt = 0;
        while (n > 0) {
            cnt++;
            n /= 10;
        }
        return cnt;
    }
}`,
  python: `# Python: Count Digits
import math

def countDigits(n: int) -> int:
    if n == 0: return 1
    return int(math.log10(n) + 1)
`,
  javascript: `// JavaScript: Count Digits
function countDigits(n) {
  if (n === 0) return 1;
  return Math.floor(Math.log10(n)) + 1;
}`
};

export const steps = [
  {
    title: '1. Initial State: N = 7894, Count = 0',
    phase: 'INIT',
    codeLine: 9,
    currentN: 7894,
    digitCount: 0,
    extracted: null,
    explanation: 'Start with n = 7894 and count = 0.'
  },
  {
    title: '2. Strip 4: N = 789, Count = 1',
    phase: 'STEP_1',
    codeLine: 12,
    currentN: 789,
    digitCount: 1,
    extracted: 4,
    explanation: '7894 / 10 = 789. Increment count to 1.'
  },
  {
    title: '3. Strip 9: N = 78, Count = 2',
    phase: 'STEP_2',
    codeLine: 12,
    currentN: 78,
    digitCount: 2,
    extracted: 9,
    explanation: '789 / 10 = 78. Increment count to 2.'
  },
  {
    title: '4. Strip 8: N = 7, Count = 3',
    phase: 'STEP_3',
    codeLine: 12,
    currentN: 7,
    digitCount: 3,
    extracted: 8,
    explanation: '78 / 10 = 7. Increment count to 3.'
  },
  {
    title: '5. Strip 7: N = 0, Count = 4 (Done)',
    phase: 'COMPLETE',
    codeLine: 14,
    currentN: 0,
    digitCount: 4,
    extracted: 7,
    explanation: '7 / 10 = 0. Loop terminates. Total digits in 7894 = 4. log10(7894) + 1 = 3.897 + 1 = 4!'
  }
];

export default function CountAllDigitsOfANumberVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Remaining N: <strong className="text-cyan-200">{step.currentN}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Digits Count: <strong className="text-purple-200">{step.digitCount}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col items-center gap-4 w-full">
        <div className="flex justify-between items-center w-full px-2 text-xs font-mono text-[#8a8ea3]">
          <span>Digit Demolition Stream</span>
          <span className="text-cyan-400 font-bold">N &divide; 10 Division</span>
        </div>

        <div className="flex items-center gap-3 font-mono text-base font-bold py-2">
          <span className="px-4 py-2 rounded-xl bg-[#161824] border border-[#272b3c] text-cyan-300">
            N = {step.currentN}
          </span>
          <span className="text-purple-400">&rarr;</span>
          <span className="px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-200 shadow">
            Count = {step.digitCount}
          </span>
        </div>

        <div className="w-full p-2.5 rounded-xl bg-[#0f1017] border border-[#1f2233] text-[11px] font-mono text-[#8a8ea3] text-center">
          Direct Math: &lfloor;log<sub>10</sub>(7894)&rfloor; + 1 = 3 + 1 = 4 digits
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.explanation}
      </div>
    </div>
  );
}

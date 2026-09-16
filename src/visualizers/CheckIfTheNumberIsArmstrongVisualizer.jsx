import React from 'react';

export const meta = {
  title: 'Check if the Number is Armstrong',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(log10 N)',
  spaceComplexity: 'O(1)',
  description: 'An Armstrong number (or narcissistic number) is a number that is equal to the sum of its digits each raised to the power of the number of digits (e.g., 153 = 1^3 + 5^3 + 3^3 = 153).'
};

export const solutions = {
  cpp: `// C++: Check Armstrong Number
#include <iostream>
#include <cmath>
using namespace std;

bool checkArmstrong(int n) {
    int original = n;
    int k = to_string(n).length(); // number of digits
    int sum = 0;
    
    while (n > 0) {
        int ld = n % 10;
        sum += round(pow(ld, k));
        n = n / 10;
    }
    return sum == original;
}`,
  java: `// Java: Check Armstrong Number
class Solution {
    static boolean checkArmstrong(int n) {
        int original = n;
        int k = String.valueOf(n).length();
        int sum = 0;
        while (n > 0) {
            int ld = n % 10;
            sum += Math.pow(ld, k);
            n /= 10;
        }
        return sum == original;
    }
}`,
  python: `# Python: Check Armstrong Number
def checkArmstrong(n: int) -> bool:
    digits = [int(d) for d in str(n)]
    k = len(digits)
    return sum(d ** k for d in digits) == n
`,
  javascript: `// JavaScript: Check Armstrong Number
function checkArmstrong(n) {
  const digits = String(n).split('').map(Number);
  const k = digits.length;
  const sum = digits.reduce((acc, d) => acc + Math.pow(d, k), 0);
  return sum === n;
}`
};

export const steps = [
  {
    title: '1. Number Analysis: N = 153, Digits (k) = 3',
    phase: 'INIT',
    codeLine: 8,
    original: 153,
    remaining: 153,
    lastDigit: null,
    sum: 0,
    powers: [],
    info: 'Number of digits k = 3. We will sum (digit)^3 for each digit.'
  },
  {
    title: '2. Extract Digit 3: 3^3 = 27',
    phase: 'DIGIT_3',
    codeLine: 13,
    original: 153,
    remaining: 15,
    lastDigit: 3,
    sum: 27,
    powers: ['3^3 = 27'],
    info: '153 % 10 = 3. Add 3^3 = 27. sum = 27. Remaining n = 15.'
  },
  {
    title: '3. Extract Digit 5: 5^3 = 125',
    phase: 'DIGIT_5',
    codeLine: 13,
    original: 153,
    remaining: 1,
    lastDigit: 5,
    sum: 152,
    powers: ['3^3 = 27', '5^3 = 125'],
    info: '15 % 10 = 5. Add 5^3 = 125. sum = 27 + 125 = 152. Remaining n = 1.'
  },
  {
    title: '4. Extract Digit 1: 1^3 = 1 -> Sum = 153 == 153! (Armstrong Verified)',
    phase: 'COMPLETE',
    codeLine: 16,
    original: 153,
    remaining: 0,
    lastDigit: 1,
    sum: 153,
    powers: ['3^3 = 27', '5^3 = 125', '1^3 = 1'],
    info: '1 % 10 = 1. Add 1^3 = 1. sum = 152 + 1 = 153. sum == original (153 == 153). 153 is an Armstrong Number!'
  }
];

export default function CheckIfTheNumberIsArmstrongVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Original N: <strong className="text-cyan-200">153</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Accumulated Sum: <strong className="text-purple-200">{step.sum}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Is Armstrong: <strong className="text-emerald-200">{step.sum === 153 ? 'TRUE' : 'Testing...'}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col items-center gap-4 w-full">
        <div className="flex justify-between items-center w-full px-2 text-xs font-mono text-[#8a8ea3]">
          <span>Digit Power Breakdown &bull; &Sigma; (d)^3</span>
          <span className="text-cyan-400 font-bold">Base 10 Extraction</span>
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-center py-2">
          {step.powers.map((p, i) => (
            <span key={i} className="px-3.5 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 font-mono font-bold text-sm shadow">
              {p}
            </span>
          ))}
        </div>

        <div className="w-full p-3 rounded-xl bg-[#0f1017] border border-[#1f2233] text-xs font-mono flex items-center justify-between">
          <span className="text-[#64748b]">Remaining n:</span>
          <span className="text-amber-300 font-bold">{step.remaining}</span>
          <span className="text-[#64748b]">Formula:</span>
          <span className="text-emerald-300 font-bold">1^3 + 5^3 + 3^3 = 153</span>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

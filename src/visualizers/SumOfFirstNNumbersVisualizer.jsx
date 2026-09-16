import React from 'react';

export const meta = {
  title: 'Sum of First N Numbers',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N) Recursive / O(1) Math (N*(N+1)/2)',
  spaceComplexity: 'O(N) recursion stack',
  description: 'Calculates the sum of first N natural numbers using parameterized recursion f(i, sum) and functional recursion f(n) = n + f(n - 1).'
};

export const solutions = {
  cpp: `// C++: Sum of First N Numbers
#include <iostream>
using namespace std;

// Method 1: Functional Recursion - O(N)
int sumFunctional(int n) {
    if (n == 0) return 0;
    return n + sumFunctional(n - 1);
}

// Method 2: Mathematical Formula - O(1)
int sumFormula(int n) {
    return n * (n + 1) / 2;
}`,
  java: `// Java: Sum of First N Numbers
class Solution {
    static int sum(int n) {
        if (n == 0) return 0;
        return n + sum(n - 1);
    }
}`,
  python: `# Python: Sum of First N Numbers
def sumN(n: int) -> int:
    if n == 0: return 0
    return n + sumN(n - 1)
`,
  javascript: `// JavaScript: Sum of First N Numbers
function sumN(n) {
  if (n === 0) return 0;
  return n + sumN(n - 1);
}`
};

export const steps = [
  {
    title: '1. Call sum(4): 4 + sum(3)',
    phase: 'STEP_4',
    codeLine: 8,
    stack: [4],
    currentSum: 'Pending',
    info: '4 + sum(3).'
  },
  {
    title: '2. Stack Expands: sum(3), sum(2), sum(1)',
    phase: 'WIND',
    codeLine: 8,
    stack: [4, 3, 2, 1],
    currentSum: 'Pending',
    info: 'Recursive calls chain down to 1.'
  },
  {
    title: '3. Base Case: sum(0) = 0',
    phase: 'BASE',
    codeLine: 7,
    stack: [4, 3, 2, 1, 0],
    currentSum: 0,
    info: 'Base condition reached at n = 0. Returns 0.'
  },
  {
    title: '4. Unwinding: 0 + 1 = 1, 1 + 2 = 3, 3 + 3 = 6, 6 + 4 = 10',
    phase: 'COMPLETE',
    codeLine: 8,
    stack: [],
    currentSum: 10,
    info: 'Returns 10! Formula verification: 4 * (4 + 1) / 2 = 20 / 2 = 10.'
  }
];

export default function SumOfFirstNNumbersVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Target: <strong className="text-cyan-200">Sum(1..4)</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Result: <strong className="text-emerald-200">{step.currentSum}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col items-center gap-4 w-full">
        <span className="text-xs font-mono text-[#8a8ea3] self-start">Call Stack Accumulation</span>
        <div className="p-4 rounded-xl bg-[#161824] border border-[#272b3c] font-mono text-center text-sm font-bold text-cyan-200">
          1 + 2 + 3 + 4 = 10
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

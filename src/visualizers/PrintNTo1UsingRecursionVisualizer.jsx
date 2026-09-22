import React from 'react';

export const meta = {
  title: 'Print N to 1 using Recursion',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) recursion stack',
  description: 'Prints numbers from N down to 1 using head-recursion where each number is printed immediately before invoking the recursive call on N - 1.'
};

export const solutions = {
  cpp: `// C++: Print N to 1
#include <iostream>
using namespace std;

void printNTo1(int n) {
    if (n == 0) return;
    cout << n << " "; // print before recursive call
    printNTo1(n - 1);
}`,
  java: `// Java: Print N to 1
class Solution {
    static void printNTo1(int n) {
        if (n == 0) return;
        System.out.print(n + " ");
        printNTo1(n - 1);
    }
}`,
  python: `# Python: Print N to 1
def printNTo1(n: int):
    if n == 0: return
    print(n, end=" ")
    printNTo1(n - 1)
`,
  javascript: `// JavaScript: Print N to 1
function printNTo1(n, res = []) {
  if (n === 0) return res;
  res.push(n);
  return printNTo1(n - 1, res);
}`
};

export const steps = [
  {
    title: '1. Call printNTo1(4): Print 4',
    phase: 'STEP_4',
    codeLine: 7,
    printed: [4],
    currentN: 4,
    info: 'Print 4 immediately, then recurse with n - 1 = 3.'
  },
  {
    title: '2. Call printNTo1(3): Print 3',
    phase: 'STEP_3',
    codeLine: 7,
    printed: [4, 3],
    currentN: 3,
    info: 'Print 3 immediately, then recurse with n - 1 = 2.'
  },
  {
    title: '3. Call printNTo1(2): Print 2',
    phase: 'STEP_2',
    codeLine: 7,
    printed: [4, 3, 2],
    currentN: 2,
    info: 'Print 2 immediately, then recurse with n - 1 = 1.'
  },
  {
    title: '4. Call printNTo1(1): Print 1 & Reach Base Case',
    phase: 'COMPLETE',
    codeLine: 6,
    printed: [4, 3, 2, 1],
    currentN: 1,
    info: 'Print 1. Recurse with n = 0 (base case hit, returns). Sequence: [4, 3, 2, 1].'
  }
];

export default function PrintNTo1UsingRecursionVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Current N: <strong className="text-purple-200">{step.currentN}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Sequence: <strong className="text-emerald-200">[{step.printed.join(', ')}]</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col items-center gap-4 w-full">
        <span className="text-xs font-mono text-[var(--chalk-dim)] self-start">Output Stream (N down to 1)</span>
        <div className="flex items-center gap-2 py-3">
          {step.printed.map((num, i) => (
            <span key={i} className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-200 font-mono font-bold text-lg flex items-center justify-center shadow">
              {num}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Print 1 to N using Recursion',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) recursion stack',
  description: 'Prints numbers from 1 to N using recursion, either through parameterized recursion f(i, n) or via backtracking f(n) where the print happens after recursive call unwinds.'
};

export const solutions = {
  cpp: `// C++: Print 1 to N using Backtracking
#include <iostream>
using namespace std;

void print1ToN(int n) {
    if (n == 0) return;
    print1ToN(n - 1); // call before print
    cout << n << " ";
}`,
  java: `// Java: Print 1 to N
class Solution {
    static void print1ToN(int n) {
        if (n == 0) return;
        print1ToN(n - 1);
        System.out.print(n + " ");
    }
}`,
  python: `# Python: Print 1 to N
def print1ToN(n: int):
    if n == 0: return
    print1ToN(n - 1)
    print(n, end=" ")
`,
  javascript: `// JavaScript: Print 1 to N
function print1ToN(n, res = []) {
  if (n === 0) return res;
  print1ToN(n - 1, res);
  res.push(n);
  return res;
}`
};

export const steps = [
  {
    title: '1. Call print1ToN(4): Dives down to base case',
    phase: 'WIND',
    codeLine: 7,
    printed: [],
    call: 'print1ToN(4) -> print1ToN(3) -> print1ToN(2) -> print1ToN(1) -> print1ToN(0)',
    info: 'Recursion stacks up until n == 0.'
  },
  {
    title: '2. Unwind print1ToN(1): Print 1',
    phase: 'UNWIND_1',
    codeLine: 8,
    printed: [1],
    call: 'Print 1 after print1ToN(0) finishes',
    info: 'Base case returns. Print 1.'
  },
  {
    title: '3. Unwind print1ToN(2): Print 2',
    phase: 'UNWIND_2',
    codeLine: 8,
    printed: [1, 2],
    call: 'Print 2 after print1ToN(1) finishes',
    info: 'Print 2.'
  },
  {
    title: '4. Unwind print1ToN(3) and print1ToN(4): Complete [1, 2, 3, 4]',
    phase: 'COMPLETE',
    codeLine: 8,
    printed: [1, 2, 3, 4],
    call: 'Completed all returns',
    info: 'Prints 3, then 4. Backtracking prints in ascending order 1 to N!'
  }
];

export default function Print1ToNUsingRecursionVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Target: <strong className="text-cyan-200">1 to 4</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Technique: <strong className="text-emerald-200">Backtracking Order</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col items-center gap-4 w-full">
        <span className="text-xs font-mono text-[var(--chalk-dim)] self-start">Printed Output Stream</span>
        <div className="flex items-center gap-2 py-3">
          {step.printed.length === 0 ? (
            <span className="text-[#475569] font-mono text-xs italic">Winding to base case...</span>
          ) : (
            step.printed.map((num, i) => (
              <span key={i} className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 font-mono font-bold text-lg flex items-center justify-center shadow">
                {num}
              </span>
            ))
          )}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

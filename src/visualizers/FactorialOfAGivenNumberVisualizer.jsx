import React from 'react';

export const meta = {
  title: 'Factorial of a Given Number',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) recursion stack',
  description: 'Calculates N! using recursion: fact(n) = n * fact(n - 1) with base case fact(0) = 1. Demonstrates call stack winding and unwinding phases.'
};

export const solutions = {
  cpp: `// C++: Recursive Factorial
#include <iostream>
using namespace std;

long long fact(int n) {
    if (n == 0) return 1;
    return n * fact(n - 1);
}`,
  java: `// Java: Recursive Factorial
class Solution {
    static long fact(int n) {
        if (n == 0) return 1;
        return n * fact(n - 1);
    }
}`,
  python: `# Python: Recursive Factorial
def fact(n: int) -> int:
    if n == 0: return 1
    return n * fact(n - 1)
`,
  javascript: `// JavaScript: Recursive Factorial
function fact(n) {
  if (n === 0) return 1;
  return n * fact(n - 1);
}`
};

export const steps = [
  {
    title: '1. Initial Call: fact(4)',
    phase: 'WINDING',
    codeLine: 7,
    stack: [4],
    currentVal: 'Waiting',
    note: 'fact(4) paused waiting for 4 * fact(3).'
  },
  {
    title: '2. Deepen Stack: fact(3) & fact(2)',
    phase: 'WINDING',
    codeLine: 7,
    stack: [4, 3, 2],
    currentVal: 'Waiting',
    note: 'Recursion stack deepens down to n = 2.'
  },
  {
    title: '3. Reach Base Case: fact(0) = 1',
    phase: 'BASE_CASE',
    codeLine: 6,
    stack: [4, 3, 2, 1, 0],
    currentVal: 1,
    note: 'Base case hit at n = 0. Returns 1. Unwinding begins!'
  },
  {
    title: '4. Unwind fact(1) = 1, fact(2) = 2, fact(3) = 6',
    phase: 'UNWINDING',
    codeLine: 7,
    stack: [4],
    currentVal: 6,
    note: 'fact(3) returns 3 * 2 = 6.'
  },
  {
    title: '5. Return to fact(4): 4 * 6 = 24! Complete',
    phase: 'COMPLETE',
    codeLine: 7,
    stack: [],
    currentVal: 24,
    note: '4! = 4 * 6 = 24. Recursion stack completely cleared!'
  }
];

export default function FactorialOfAGivenNumberVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Target: <strong className="text-cyan-200">4!</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Current Value: <strong className="text-emerald-200">{step.currentVal}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[var(--chalk-dim)]">
          <span>Recursion Call Stack</span>
          <span className="text-purple-400 font-bold">Winding &rarr; Unwinding</span>
        </div>

        <div className="flex flex-col-reverse gap-1.5 min-h-[120px] p-3 rounded-xl bg-[#0f1017] border border-[#1f2233]">
          {step.stack.length === 0 ? (
            <span className="text-emerald-400 font-mono text-xs font-bold text-center py-4">
              Stack Cleared &bull; Final Result = 24
            </span>
          ) : (
            step.stack.map((n, idx) => (
              <div
                key={idx}
                className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-200 font-mono text-xs font-bold text-center"
              >
                fact({n})
              </div>
            ))
          )}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.note}
      </div>
    </div>
  );
}

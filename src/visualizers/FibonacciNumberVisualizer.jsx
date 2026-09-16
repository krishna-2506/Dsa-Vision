import React from 'react';

export const meta = {
  title: 'Fibonacci Number (Multiple Recursion Calls)',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(2^N) Naive / O(N) Memoized',
  spaceComplexity: 'O(N) recursion tree depth',
  description: 'Calculates the Nth Fibonacci number: fib(n) = fib(n - 1) + fib(n - 2) with base cases fib(0) = 0, fib(1) = 1. Demonstrates binary recursion tree branching.'
};

export const solutions = {
  cpp: `// C++: Fibonacci Number (LeetCode 509)
#include <iostream>
using namespace std;

int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}`,
  java: `// Java: Fibonacci Number
class Solution {
    public int fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }
}`,
  python: `# Python: Fibonacci Number
def fib(n: int) -> int:
    if n <= 1: return n
    return fib(n - 1) + fib(n - 2)
`,
  javascript: `// JavaScript: Fibonacci Number
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}`
};

export const steps = [
  {
    title: '1. Root Call: fib(4)',
    phase: 'ROOT',
    codeLine: 7,
    tree: 'fib(4)',
    ans: '?',
    explanation: 'fib(4) branches into fib(3) + fib(2).'
  },
  {
    title: '2. Left Subtree: fib(3) branches to fib(2) + fib(1)',
    phase: 'LEFT_BRANCH',
    codeLine: 7,
    tree: 'fib(3) -> fib(2) + fib(1)',
    ans: '?',
    explanation: 'Left branch continues downward.'
  },
  {
    title: '3. Base Cases: fib(1) = 1, fib(0) = 0',
    phase: 'BASE_CASES',
    codeLine: 6,
    tree: 'Leaves: fib(1)=1, fib(0)=0',
    ans: '1',
    explanation: 'Leaves resolve to 1 and 0.'
  },
  {
    title: '4. Combine Subtrees: fib(4) = fib(3) + fib(2) = 2 + 1 = 3',
    phase: 'COMPLETE',
    codeLine: 7,
    tree: 'fib(4) = 3',
    ans: '3',
    explanation: 'fib(3) returns 2, fib(2) returns 1. Result = 3!'
  }
];

export default function FibonacciNumberVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Target: <strong className="text-cyan-200">fib(4)</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Result: <strong className="text-emerald-200">{step.ans}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col items-center gap-4 w-full">
        <div className="flex justify-between items-center w-full px-2 text-xs font-mono text-[#8a8ea3]">
          <span>Binary Recursion Tree Hierarchy</span>
          <span className="text-cyan-400 font-bold">2-Way Branching</span>
        </div>

        <div className="p-4 rounded-xl bg-[#161824] border border-[#272b3c] font-mono text-center text-sm font-bold text-cyan-200">
          {step.tree}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.explanation}
      </div>
    </div>
  );
}

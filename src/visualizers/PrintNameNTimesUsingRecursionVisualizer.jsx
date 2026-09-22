import React from 'react';

export const meta = {
  title: 'Print Name N Times using Recursion',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) recursion stack',
  description: 'Demonstrates basic parameterized recursion by printing a string N times using an incrementing counter index i from 1 to N.'
};

export const solutions = {
  cpp: `// C++: Print Name N Times
#include <iostream>
using namespace std;

void printName(int i, int n) {
    if (i > n) return; // Base Case
    cout << "GFG" << endl;
    printName(i + 1, n);
}`,
  java: `// Java: Print Name N Times
class Solution {
    static void printName(int i, int n) {
        if (i > n) return;
        System.out.println("GFG");
        printName(i + 1, n);
    }
}`,
  python: `# Python: Print Name N Times
def printName(i: int, n: int):
    if i > n: return
    print("GFG")
    printName(i + 1, n)
`,
  javascript: `// JavaScript: Print Name N Times
function printName(i, n, res = []) {
  if (i > n) return res;
  res.push("GFG");
  return printName(i + 1, n, res);
}`
};

export const steps = [
  {
    title: '1. Call printName(1, 3): Print #1',
    phase: 'CALL_1',
    codeLine: 7,
    i: 1,
    n: 3,
    output: ['GFG'],
    info: 'i = 1 <= 3. Print "GFG". Call printName(2, 3).'
  },
  {
    title: '2. Call printName(2, 3): Print #2',
    phase: 'CALL_2',
    codeLine: 7,
    i: 2,
    n: 3,
    output: ['GFG', 'GFG'],
    info: 'i = 2 <= 3. Print "GFG". Call printName(3, 3).'
  },
  {
    title: '3. Call printName(3, 3): Print #3',
    phase: 'CALL_3',
    codeLine: 7,
    i: 3,
    n: 3,
    output: ['GFG', 'GFG', 'GFG'],
    info: 'i = 3 <= 3. Print "GFG". Call printName(4, 3).'
  },
  {
    title: '4. Call printName(4, 3): Base Case Reached (i > n)',
    phase: 'BASE_CASE',
    codeLine: 6,
    i: 4,
    n: 3,
    output: ['GFG', 'GFG', 'GFG'],
    info: 'i = 4 > 3. Base condition met! Returns and completes execution.'
  }
];

export default function PrintNameNTimesUsingRecursionVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Index: <strong className="text-cyan-200">i = {step.i}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Target: <strong className="text-purple-200">N = {step.n}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Printed: <strong className="text-emerald-200">{step.output.length} times</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col items-center gap-4 w-full">
        <span className="text-xs font-mono text-[var(--chalk-dim)] self-start">Terminal Output Buffer</span>
        <div className="flex flex-col gap-2 w-full">
          {step.output.map((line, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] font-mono text-xs text-cyan-200 flex justify-between items-center">
              <span>&gt; {line}</span>
              <span className="text-[#64748b]">line #{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

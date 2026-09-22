import React from 'react';

export const meta = {
  title: 'Pattern 1: Rectangular Star Pattern',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1)',
  description: 'Prints an N x N rectangular grid of asterisks using two nested loops: an outer loop for N rows and an inner loop for N columns.'
};

export const solutions = {
  cpp: `// C++: Pattern 1 - Rectangular Star Pattern
#include <iostream>
using namespace std;

void pattern1(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cout << "* ";
        }
        cout << "\\n";
    }
}

int main() {
    int n = 4;
    pattern1(n);
    return 0;
}`,
  java: `// Java: Pattern 1
public class Solution {
    public static void pattern1(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
  python: `# Python: Pattern 1
def pattern1(n: int):
    for i in range(n):
        print("* " * n)`,
  javascript: `// JavaScript: Pattern 1
function pattern1(n) {
    for (let i = 0; i < n; i++) {
        console.log("* ".repeat(n));
    }
}`
};

export const steps = [
  {
    title: '1. Row 0: Print N stars',
    phase: 'ROW_0',
    codeLine: 7,
    currentRow: 0,
    grid: [
      ['*', '*', '*', '*'],
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ']
    ],
    explanation: 'Outer loop at i = 0. Inner loop prints 4 stars for row 0, then outputs newline.'
  },
  {
    title: '2. Row 1: Print N stars',
    phase: 'ROW_1',
    codeLine: 7,
    currentRow: 1,
    grid: [
      ['*', '*', '*', '*'],
      ['*', '*', '*', '*'],
      [' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ']
    ],
    explanation: 'Outer loop at i = 1. Inner loop prints 4 stars for row 1.'
  },
  {
    title: '3. Row 2: Print N stars',
    phase: 'ROW_2',
    codeLine: 7,
    currentRow: 2,
    grid: [
      ['*', '*', '*', '*'],
      ['*', '*', '*', '*'],
      ['*', '*', '*', '*'],
      [' ', ' ', ' ', ' ']
    ],
    explanation: 'Outer loop at i = 2. Row 2 populated with 4 stars.'
  },
  {
    title: '4. Row 3: Complete N x N Grid',
    phase: 'COMPLETE',
    codeLine: 7,
    currentRow: 3,
    grid: [
      ['*', '*', '*', '*'],
      ['*', '*', '*', '*'],
      ['*', '*', '*', '*'],
      ['*', '*', '*', '*']
    ],
    explanation: 'Outer loop finishes after row 3. Total N * N = 16 asterisks printed.'
  }
];

export default function Pattern1Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Dimensions: <strong className="text-cyan-200">4 &times; 4 Grid</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Outer Loop: <strong className="text-purple-200">i = {step.currentRow}</strong>
        </div>
      </div>

      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
          <span className="text-xs font-semibold text-[var(--chalk-dim)] uppercase tracking-wider">Pattern Canvas</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="flex flex-col items-center p-6 bg-[var(--board-raised)] border border-[var(--line)] rounded-xl space-y-2">
          {step.grid.map((row, rIdx) => (
            <div key={rIdx} className="flex space-x-2.5">
              {row.map((cell, cIdx) => (
                <span
                  key={cIdx}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono text-base font-bold transition-all ${
                    cell === '*'
                      ? rIdx === step.currentRow
                        ? 'bg-cyan-500/30 border border-cyan-500/80 text-cyan-200 scale-105 shadow-md shadow-cyan-500/20'
                        : 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-300'
                      : 'bg-black/20 border border-white/5 text-transparent'
                  }`}
                >
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] text-xs text-[var(--chalk-dim)] leading-relaxed">
          {step.explanation}
        </div>
      </div>
    </div>
  );
}

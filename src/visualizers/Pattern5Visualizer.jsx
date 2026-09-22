import React from 'react';

export const meta = {
  title: 'Pattern 5: Inverted Right-Angled Star Triangle',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1)',
  description: 'Generates an inverted right-angled triangle where the number of asterisks decreases from N down to 1 (n - i stars per row).'
};

export const solutions = {
  cpp: `// C++: Pattern 5 - Inverted Star Triangle
#include <iostream>
using namespace std;

void pattern5(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i; j++) {
            cout << "* ";
        }
        cout << "\\n";
    }
}

int main() {
    int n = 4;
    pattern5(n);
    return 0;
}`,
  java: `// Java: Pattern 5
public class Solution {
    public static void pattern5(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
  python: `# Python: Pattern 5
def pattern5(n: int):
    for i in range(n):
        print("* " * (n - i))`,
  javascript: `// JavaScript: Pattern 5
function pattern5(n) {
    for (let i = 0; i < n; i++) {
        console.log("* ".repeat(n - i));
    }
}`
};

export const steps = [
  {
    title: '1. Row 0: N = 4 Stars',
    phase: 'ROW_0',
    codeLine: 7,
    currentRow: 0,
    grid: [
      ['*', '*', '*', '*'],
      [],
      [],
      []
    ],
    explanation: 'i = 0: prints (4 - 0) = 4 stars.'
  },
  {
    title: '2. Row 1: 3 Stars',
    phase: 'ROW_1',
    codeLine: 7,
    currentRow: 1,
    grid: [
      ['*', '*', '*', '*'],
      ['*', '*', '*'],
      [],
      []
    ],
    explanation: 'i = 1: prints (4 - 1) = 3 stars.'
  },
  {
    title: '3. Row 2: 2 Stars',
    phase: 'ROW_2',
    codeLine: 7,
    currentRow: 2,
    grid: [
      ['*', '*', '*', '*'],
      ['*', '*', '*'],
      ['*', '*'],
      []
    ],
    explanation: 'i = 2: prints (4 - 2) = 2 stars.'
  },
  {
    title: '4. Row 3: 1 Star (Complete Inversion)',
    phase: 'COMPLETE',
    codeLine: 7,
    currentRow: 3,
    grid: [
      ['*', '*', '*', '*'],
      ['*', '*', '*'],
      ['*', '*'],
      ['*']
    ],
    explanation: 'i = 3: prints (4 - 3) = 1 star. Inverted triangle finished.'
  }
];

export default function Pattern5Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Formula: <strong className="text-cyan-200">N - i stars</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Row: <strong className="text-purple-200">i = {step.currentRow}</strong>
        </div>
      </div>

      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
          <span className="text-xs font-semibold text-[var(--chalk-dim)] uppercase tracking-wider">Inverted Triangle Renderer</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="flex flex-col items-start p-6 bg-[var(--board-raised)] border border-[var(--line)] rounded-xl space-y-2 min-h-[180px]">
          {step.grid.map((row, rIdx) => (
            <div key={rIdx} className="flex space-x-2.5">
              {row.map((cell, cIdx) => (
                <span
                  key={cIdx}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono text-base font-bold transition-all ${
                    rIdx === step.currentRow
                      ? 'bg-cyan-500/30 border border-cyan-500/80 text-cyan-200 scale-105 shadow-md shadow-cyan-500/20'
                      : 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-300'
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

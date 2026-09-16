import React from 'react';

export const meta = {
  title: 'Pattern 2: Right-Angled Triangle Pattern',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1)',
  description: 'Generates a right-angled triangle where row i contains (i + 1) asterisks, demonstrating column growth proportional to row depth.'
};

export const solutions = {
  cpp: `// C++: Pattern 2 - Right-Angled Triangle
#include <iostream>
using namespace std;

void pattern2(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) {
            cout << "* ";
        }
        cout << "\\n";
    }
}

int main() {
    int n = 4;
    pattern2(n);
    return 0;
}`,
  java: `// Java: Pattern 2
public class Solution {
    public static void pattern2(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
  python: `# Python: Pattern 2
def pattern2(n: int):
    for i in range(n):
        print("* " * (i + 1))`,
  javascript: `// JavaScript: Pattern 2
function pattern2(n) {
    for (let i = 0; i < n; i++) {
        console.log("* ".repeat(i + 1));
    }
}`
};

export const steps = [
  {
    title: '1. Row 0: 1 Star',
    phase: 'ROW_0',
    codeLine: 7,
    currentRow: 0,
    grid: [
      ['*'],
      [],
      [],
      []
    ],
    explanation: 'i = 0: inner loop runs for j = 0..0 (1 star printed).'
  },
  {
    title: '2. Row 1: 2 Stars',
    phase: 'ROW_1',
    codeLine: 7,
    currentRow: 1,
    grid: [
      ['*'],
      ['*', '*'],
      [],
      []
    ],
    explanation: 'i = 1: inner loop runs for j = 0..1 (2 stars printed).'
  },
  {
    title: '3. Row 2: 3 Stars',
    phase: 'ROW_2',
    codeLine: 7,
    currentRow: 2,
    grid: [
      ['*'],
      ['*', '*'],
      ['*', '*', '*'],
      []
    ],
    explanation: 'i = 2: inner loop runs for j = 0..2 (3 stars printed).'
  },
  {
    title: '4. Row 3: 4 Stars (Complete Triangle)',
    phase: 'COMPLETE',
    codeLine: 7,
    currentRow: 3,
    grid: [
      ['*'],
      ['*', '*'],
      ['*', '*', '*'],
      ['*', '*', '*', '*']
    ],
    explanation: 'i = 3: inner loop runs for j = 0..3 (4 stars printed). Triangle complete!'
  }
];

export default function Pattern2Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Shape: <strong className="text-cyan-200">Right-Angled Triangle</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Stars on Row i: <strong className="text-purple-200">i + 1</strong>
        </div>
      </div>

      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#272b3c] pb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Triangle Renderer</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="flex flex-col items-start p-6 bg-[#12131b] border border-[#272b3c] rounded-xl space-y-2 min-h-[180px]">
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

        <div className="p-3.5 rounded-xl bg-[#12131b] border border-[#272b3c] text-xs text-slate-300 leading-relaxed">
          {step.explanation}
        </div>
      </div>
    </div>
  );
}

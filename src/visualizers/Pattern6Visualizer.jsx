import React from 'react';

export const meta = {
  title: 'Pattern 6: Inverted Numbered Right Pyramid',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1)',
  description: 'Generates an inverted numbered pyramid where each row i prints numbers starting from 1 up to (N - i).'
};

export const solutions = {
  cpp: `// C++: Pattern 6 - Inverted Number Pyramid
#include <iostream>
using namespace std;

void pattern6(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 1; j <= n - i; j++) {
            cout << j << " ";
        }
        cout << "\\n";
    }
}

int main() {
    int n = 4;
    pattern6(n);
    return 0;
}`,
  java: `// Java: Pattern 6
public class Solution {
    public static void pattern6(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 1; j <= n - i; j++) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }
}`,
  python: `# Python: Pattern 6
def pattern6(n: int):
    for i in range(n):
        print(" ".join(str(j) for j in range(1, n - i + 1)))`,
  javascript: `// JavaScript: Pattern 6
function pattern6(n) {
    for (let i = 0; i < n; i++) {
        let line = "";
        for (let j = 1; j <= n - i; j++) line += j + " ";
        console.log(line);
    }
}`
};

export const steps = [
  {
    title: '1. Row 0: Numbers 1 to 4',
    phase: 'ROW_0',
    codeLine: 7,
    currentRow: 0,
    grid: [
      ['1', '2', '3', '4'],
      [],
      [],
      []
    ],
    explanation: 'i = 0: prints sequence 1 to (4 - 0) = 4.'
  },
  {
    title: '2. Row 1: Numbers 1 to 3',
    phase: 'ROW_1',
    codeLine: 7,
    currentRow: 1,
    grid: [
      ['1', '2', '3', '4'],
      ['1', '2', '3'],
      [],
      []
    ],
    explanation: 'i = 1: prints sequence 1 to (4 - 1) = 3.'
  },
  {
    title: '3. Row 2: Numbers 1 to 2',
    phase: 'ROW_2',
    codeLine: 7,
    currentRow: 2,
    grid: [
      ['1', '2', '3', '4'],
      ['1', '2', '3'],
      ['1', '2'],
      []
    ],
    explanation: 'i = 2: prints sequence 1 to (4 - 2) = 2.'
  },
  {
    title: '4. Row 3: Number 1 (Complete)',
    phase: 'COMPLETE',
    codeLine: 7,
    currentRow: 3,
    grid: [
      ['1', '2', '3', '4'],
      ['1', '2', '3'],
      ['1', '2'],
      ['1']
    ],
    explanation: 'i = 3: prints single number 1. Inverted numbered pyramid finished.'
  }
];

export default function Pattern6Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Sequence: <strong className="text-emerald-200">1 to (N - i)</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Current Row: <strong className="text-cyan-200">i = {step.currentRow}</strong>
        </div>
      </div>

      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#272b3c] pb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Inverted Number Pyramid</span>
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
                      ? 'bg-emerald-500/30 border border-emerald-500/80 text-emerald-200 scale-105 shadow-md shadow-emerald-500/20'
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

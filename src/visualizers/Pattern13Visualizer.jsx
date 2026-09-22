import React from 'react';

export const meta = {
  title: 'Pattern 13: Increasing Continuous Number Triangle (Floyd Triangle)',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1)',
  description: 'Generates a right triangle filled with consecutive counting integers (1, 2, 3, 4, ...), incrementing an accumulator without resetting per row.'
};

export const solutions = {
  cpp: `// C++: Pattern 13 - Increasing Number Triangle
#include <iostream>
using namespace std;

void pattern13(int n) {
    int num = 1;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            cout << num << " ";
            num++;
        }
        cout << "\\n";
    }
}

int main() {
    int n = 4;
    pattern13(n);
    return 0;
}`,
  java: `// Java: Pattern 13
public class Solution {
    public static void pattern13(int n) {
        int num = 1;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(num + " ");
                num++;
            }
            System.out.println();
        }
    }
}`,
  python: `# Python: Pattern 13
def pattern13(n: int):
    num = 1
    for i in range(1, n + 1):
        row = []
        for _ in range(i):
            row.append(str(num))
            num += 1
        print(" ".join(row))`,
  javascript: `// JavaScript: Pattern 13
function pattern13(n) {
    let num = 1;
    for (let i = 1; i <= n; i++) {
        let line = "";
        for (let j = 1; j <= i; j++) {
            line += num + " ";
            num++;
        }
        console.log(line);
    }
}`
};

export const steps = [
  {
    title: '1. Row 1: num = 1',
    phase: 'ROW_1',
    codeLine: 8,
    currentRow: 1,
    currentNum: 2,
    grid: [
      ['1'],
      [],
      [],
      []
    ],
    explanation: 'num starts at 1. First row prints 1, num becomes 2.'
  },
  {
    title: '2. Row 2: num = 2, 3',
    phase: 'ROW_2',
    codeLine: 8,
    currentRow: 2,
    currentNum: 4,
    grid: [
      ['1'],
      ['2', '3'],
      [],
      []
    ],
    explanation: 'Row 2 prints 2 and 3 without resetting. num advances to 4.'
  },
  {
    title: '3. Row 3: num = 4, 5, 6',
    phase: 'ROW_3',
    codeLine: 8,
    currentRow: 3,
    currentNum: 7,
    grid: [
      ['1'],
      ['2', '3'],
      ['4', '5', '6'],
      []
    ],
    explanation: 'Row 3 prints 4, 5, 6. num advances to 7.'
  },
  {
    title: '4. Row 4: num = 7, 8, 9, 10 (Complete)',
    phase: 'COMPLETE',
    codeLine: 8,
    currentRow: 4,
    currentNum: 11,
    grid: [
      ['1'],
      ['2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9', '10']
    ],
    explanation: 'Row 4 prints 7 through 10. Consecutive accumulator pattern complete!'
  }
];

export default function Pattern13Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Continuous Counter: <strong className="text-emerald-200">num++</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Row: <strong className="text-cyan-200">i = {step.currentRow}</strong>
        </div>
      </div>

      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
          <span className="text-xs font-semibold text-[var(--chalk-dim)] uppercase tracking-wider">Floyd Triangle Grid</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="flex flex-col items-start p-6 bg-[var(--board-raised)] border border-[var(--line)] rounded-xl space-y-2 min-h-[190px]">
          {step.grid.map((row, rIdx) => (
            <div key={rIdx} className="flex space-x-2">
              {row.map((cell, cIdx) => (
                <span
                  key={cIdx}
                  className={`w-8 h-8 rounded flex items-center justify-center font-mono text-sm font-bold transition-all ${
                    rIdx + 1 === step.currentRow
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

        <div className="p-3.5 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] text-xs text-[var(--chalk-dim)] leading-relaxed">
          {step.explanation}
        </div>
      </div>
    </div>
  );
}

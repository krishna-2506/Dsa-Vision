import React from 'react';

export const meta = {
  title: 'Pattern 11: Binary Number Triangle Pattern',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1)',
  description: 'Generates an alternating binary number triangle where cells toggle between 1 and 0 based on row-column index parity: val = (i + j) % 2 == 0 ? 1 : 0.'
};

export const solutions = {
  cpp: `// C++: Pattern 11 - Binary Number Triangle
#include <iostream>
using namespace std;

void pattern11(int n) {
    for (int i = 0; i < n; i++) {
        int start = (i % 2 == 0) ? 1 : 0;
        for (int j = 0; j <= i; j++) {
            cout << start << " ";
            start = 1 - start; // Toggle
        }
        cout << "\\n";
    }
}

int main() {
    int n = 5;
    pattern11(n);
    return 0;
}`,
  java: `// Java: Pattern 11
public class Solution {
    public static void pattern11(int n) {
        for (int i = 0; i < n; i++) {
            int start = (i % 2 == 0) ? 1 : 0;
            for (int j = 0; j <= i; j++) {
                System.out.print(start + " ");
                start = 1 - start;
            }
            System.out.println();
        }
    }
}`,
  python: `# Python: Pattern 11
def pattern11(n: int):
    for i in range(n):
        start = 1 if i % 2 == 0 else 0
        row = []
        for _ in range(i + 1):
            row.append(str(start))
            start = 1 - start
        print(" ".join(row))`,
  javascript: `// JavaScript: Pattern 11
function pattern11(n) {
    for (let i = 0; i < n; i++) {
        let start = i % 2 === 0 ? 1 : 0;
        let line = "";
        for (let j = 0; j <= i; j++) {
            line += start + " ";
            start = 1 - start;
        }
        console.log(line);
    }
}`
};

export const steps = [
  {
    title: '1. Row 0: Even row starts with 1',
    phase: 'ROW_0',
    codeLine: 8,
    currentRow: 0,
    startBit: 1,
    grid: [
      ['1'],
      [],
      [],
      [],
      []
    ],
    explanation: 'i = 0 is even -> start = 1.'
  },
  {
    title: '2. Row 1: Odd row starts with 0 (0 1)',
    phase: 'ROW_1',
    codeLine: 8,
    currentRow: 1,
    startBit: 0,
    grid: [
      ['1'],
      ['0', '1'],
      [],
      [],
      []
    ],
    explanation: 'i = 1 is odd -> start = 0. Toggles to 1.'
  },
  {
    title: '3. Row 2: Even row starts with 1 (1 0 1)',
    phase: 'ROW_2',
    codeLine: 8,
    currentRow: 2,
    startBit: 1,
    grid: [
      ['1'],
      ['0', '1'],
      ['1', '0', '1'],
      [],
      []
    ],
    explanation: 'i = 2 is even -> start = 1. Toggles: 1 -> 0 -> 1.'
  },
  {
    title: '4. Row 4: Complete Binary Triangle',
    phase: 'COMPLETE',
    codeLine: 8,
    currentRow: 4,
    startBit: 1,
    grid: [
      ['1'],
      ['0', '1'],
      ['1', '0', '1'],
      ['0', '1', '0', '1'],
      ['1', '0', '1', '0', '1']
    ],
    explanation: 'All 5 rows generated with perfect alternating parity.'
  }
];

export default function Pattern11Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Toggle Logic: <strong className="text-cyan-200">start = 1 - start</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Initial Bit: <strong className="text-emerald-200">i % 2 == 0 ? 1 : 0</strong>
        </div>
      </div>

      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
          <span className="text-xs font-semibold text-[var(--chalk-dim)] uppercase tracking-wider">Alternating Binary Triangle</span>
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
                    cell === '1'
                      ? 'bg-emerald-500/25 border border-emerald-500/60 text-emerald-300'
                      : 'bg-rose-500/25 border border-rose-500/60 text-rose-300'
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

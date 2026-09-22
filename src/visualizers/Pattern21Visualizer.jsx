import React from 'react';

export const meta = {
  title: 'Pattern 21: Hollow Rectangle Star Pattern',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1)',
  description: 'Constructs an N x N hollow rectangle by verifying if a coordinate (i, j) lies on any of the four borders: i == 0, j == 0, i == N-1, or j == N-1.'
};

export const solutions = {
  cpp: `// C++: Pattern 21 - Hollow Rectangle
#include <iostream>
using namespace std;

void pattern21(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (i == 0 || j == 0 || i == n - 1 || j == n - 1) {
                cout << "*";
            } else {
                cout << " ";
            }
        }
        cout << "\\n";
    }
}

int main() {
    int n = 4;
    pattern21(n);
    return 0;
}`,
  java: `// Java: Pattern 21
public class Solution {
    public static void pattern21(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 || j == 0 || i == n - 1 || j == n - 1) {
                    System.out.print("*");
                } else {
                    System.out.print(" ");
                }
            }
            System.out.println();
        }
    }
}`,
  python: `# Python: Pattern 21
def pattern21(n: int):
    for i in range(n):
        row = []
        for j in range(n):
            if i in (0, n - 1) or j in (0, n - 1):
                row.append("*")
            else:
                row.append(" ")
        print("".join(row))`,
  javascript: `// JavaScript: Pattern 21
function pattern21(n) {
    for (let i = 0; i < n; i++) {
        let line = "";
        for (let j = 0; j < n; j++) {
            if (i === 0 || j === 0 || i === n - 1 || j === n - 1) line += "*";
            else line += " ";
        }
        console.log(line);
    }
}`
};

export const steps = [
  {
    title: '1. Top Border: i = 0 (All Stars)',
    phase: 'TOP_BORDER',
    codeLine: 9,
    currentRow: 0,
    grid: [
      ['*', '*', '*', '*'],
      [],
      [],
      []
    ],
    explanation: 'i == 0 is true for all columns j: 4 boundary stars printed.'
  },
  {
    title: '2. Middle Row 1: Hollow interior',
    phase: 'MIDDLE_1',
    codeLine: 12,
    currentRow: 1,
    grid: [
      ['*', '*', '*', '*'],
      ['*', ' ', ' ', '*'],
      [],
      []
    ],
    explanation: 'Only j == 0 and j == 3 are borders. (1, 1) and (1, 2) evaluate to empty interior spaces.'
  },
  {
    title: '3. Middle Row 2: Hollow interior',
    phase: 'MIDDLE_2',
    codeLine: 12,
    currentRow: 2,
    grid: [
      ['*', '*', '*', '*'],
      ['*', ' ', ' ', '*'],
      ['*', ' ', ' ', '*'],
      []
    ],
    explanation: 'Same hollow border check for row 2.'
  },
  {
    title: '4. Bottom Border: i = 3 (Complete Hollow Square)',
    phase: 'COMPLETE',
    codeLine: 9,
    currentRow: 3,
    grid: [
      ['*', '*', '*', '*'],
      ['*', ' ', ' ', '*'],
      ['*', ' ', ' ', '*'],
      ['*', '*', '*', '*']
    ],
    explanation: 'i == 3 is bottom border: 4 stars complete the enclosed hollow rectangle.'
  }
];

export default function Pattern21Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Condition: <strong className="text-cyan-200">i==0 || j==0 || i==N-1 || j==N-1</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Border Test: <strong className="text-purple-200">i = {step.currentRow}</strong>
        </div>
      </div>

      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
          <span className="text-xs font-semibold text-[var(--chalk-dim)] uppercase tracking-wider">Hollow Rectangle Frame</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="flex flex-col items-center p-6 bg-[var(--board-raised)] border border-[var(--line)] rounded-xl space-y-2 min-h-[190px]">
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
                      : 'bg-black/30 border border-dashed border-slate-700 text-transparent'
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

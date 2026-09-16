import React from 'react';

export const meta = {
  title: 'Pattern 7: Star Pyramid',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1)',
  description: 'Constructs an upright symmetric star pyramid using three inner loops per row: (N - i - 1) leading spaces, (2*i + 1) asterisks, and trailing spaces.'
};

export const solutions = {
  cpp: `// C++: Pattern 7 - Star Pyramid
#include <iostream>
using namespace std;

void pattern7(int n) {
    for (int i = 0; i < n; i++) {
        // Leading spaces
        for (int j = 0; j < n - i - 1; j++) cout << " ";
        // Stars
        for (int j = 0; j < 2 * i + 1; j++) cout << "*";
        // Trailing spaces
        for (int j = 0; j < n - i - 1; j++) cout << " ";
        cout << "\\n";
    }
}

int main() {
    int n = 4;
    pattern7(n);
    return 0;
}`,
  java: `// Java: Pattern 7
public class Solution {
    public static void pattern7(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i - 1; j++) System.out.print(" ");
            for (int j = 0; j < 2 * i + 1; j++) System.out.print("*");
            System.out.println();
        }
    }
}`,
  python: `# Python: Pattern 7
def pattern7(n: int):
    for i in range(n):
        spaces = " " * (n - i - 1)
        stars = "*" * (2 * i + 1)
        print(spaces + stars + spaces)`,
  javascript: `// JavaScript: Pattern 7
function pattern7(n) {
    for (let i = 0; i < n; i++) {
        let spaces = " ".repeat(n - i - 1);
        let stars = "*".repeat(2 * i + 1);
        console.log(spaces + stars + spaces);
    }
}`
};

export const steps = [
  {
    title: '1. Row 0: 3 Spaces, 1 Star (2*0+1), 3 Spaces',
    phase: 'ROW_0',
    codeLine: 7,
    currentRow: 0,
    grid: [
      [' ', ' ', ' ', '*', ' ', ' ', ' '],
      [],
      [],
      []
    ],
    explanation: 'i = 0: spaces = 4 - 0 - 1 = 3, stars = 2(0) + 1 = 1.'
  },
  {
    title: '2. Row 1: 2 Spaces, 3 Stars, 2 Spaces',
    phase: 'ROW_1',
    codeLine: 7,
    currentRow: 1,
    grid: [
      [' ', ' ', ' ', '*', ' ', ' ', ' '],
      [' ', ' ', '*', '*', '*', ' ', ' '],
      [],
      []
    ],
    explanation: 'i = 1: spaces = 2, stars = 2(1) + 1 = 3.'
  },
  {
    title: '3. Row 2: 1 Space, 5 Stars, 1 Space',
    phase: 'ROW_2',
    codeLine: 7,
    currentRow: 2,
    grid: [
      [' ', ' ', ' ', '*', ' ', ' ', ' '],
      [' ', ' ', '*', '*', '*', ' ', ' '],
      [' ', '*', '*', '*', '*', '*', ' '],
      []
    ],
    explanation: 'i = 2: spaces = 1, stars = 2(2) + 1 = 5.'
  },
  {
    title: '4. Row 3: 0 Spaces, 7 Stars (Complete Pyramid)',
    phase: 'COMPLETE',
    codeLine: 7,
    currentRow: 3,
    grid: [
      [' ', ' ', ' ', '*', ' ', ' ', ' '],
      [' ', ' ', '*', '*', '*', ' ', ' '],
      [' ', '*', '*', '*', '*', '*', ' '],
      ['*', '*', '*', '*', '*', '*', '*']
    ],
    explanation: 'i = 3: spaces = 0, stars = 2(3) + 1 = 7. Upright pyramid complete!'
  }
];

export default function Pattern7Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Stars formula: <strong className="text-cyan-200">2 &times; i + 1</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Spaces formula: <strong className="text-purple-200">N - i - 1</strong>
        </div>
      </div>

      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#272b3c] pb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Pyramid Symmetry Engine</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="flex flex-col items-center p-6 bg-[#12131b] border border-[#272b3c] rounded-xl space-y-2 min-h-[190px]">
          {step.grid.map((row, rIdx) => (
            <div key={rIdx} className="flex space-x-1.5">
              {row.map((cell, cIdx) => (
                <span
                  key={cIdx}
                  className={`w-7 h-7 rounded flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    cell === '*'
                      ? rIdx === step.currentRow
                        ? 'bg-cyan-500/30 border border-cyan-500/80 text-cyan-200 scale-105 shadow-md shadow-cyan-500/20'
                        : 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-300'
                      : 'bg-transparent text-transparent border border-transparent'
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

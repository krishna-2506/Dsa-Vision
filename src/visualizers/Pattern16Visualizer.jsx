import React from 'react';

export const meta = {
  title: 'Pattern 16: Alpha-Ramp Pattern',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1)',
  description: 'Generates an alpha-ramp triangle where row i repeats the character ("A" + i) exactly (i + 1) times.'
};

export const solutions = {
  cpp: `// C++: Pattern 16 - Alpha Ramp
#include <iostream>
using namespace std;

void pattern16(int n) {
    for (int i = 0; i < n; i++) {
        char ch = 'A' + i;
        for (int j = 0; j <= i; j++) {
            cout << ch << " ";
        }
        cout << "\\n";
    }
}

int main() {
    int n = 4;
    pattern16(n);
    return 0;
}`,
  java: `// Java: Pattern 16
public class Solution {
    public static void pattern16(int n) {
        for (int i = 0; i < n; i++) {
            char ch = (char)('A' + i);
            for (int j = 0; j <= i; j++) {
                System.out.print(ch + " ");
            }
            System.out.println();
        }
    }
}`,
  python: `# Python: Pattern 16
def pattern16(n: int):
    for i in range(n):
        ch = chr(ord('A') + i)
        print((ch + " ") * (i + 1))`,
  javascript: `// JavaScript: Pattern 16
function pattern16(n) {
    for (let i = 0; i < n; i++) {
        let ch = String.fromCharCode(65 + i);
        console.log((ch + " ").repeat(i + 1));
    }
}`
};

export const steps = [
  {
    title: '1. Row 0: "A"',
    phase: 'ROW_0',
    codeLine: 7,
    currentRow: 0,
    currentChar: 'A',
    grid: [
      ['A'],
      [],
      [],
      []
    ],
    explanation: 'i = 0: prints "A" 1 time.'
  },
  {
    title: '2. Row 1: "B B"',
    phase: 'ROW_1',
    codeLine: 7,
    currentRow: 1,
    currentChar: 'B',
    grid: [
      ['A'],
      ['B', 'B'],
      [],
      []
    ],
    explanation: 'i = 1: prints "B" 2 times.'
  },
  {
    title: '3. Row 2: "C C C"',
    phase: 'ROW_2',
    codeLine: 7,
    currentRow: 2,
    currentChar: 'C',
    grid: [
      ['A'],
      ['B', 'B'],
      ['C', 'C', 'C'],
      []
    ],
    explanation: 'i = 2: prints "C" 3 times.'
  },
  {
    title: '4. Row 3: "D D D D" (Complete Ramp)',
    phase: 'COMPLETE',
    codeLine: 7,
    currentRow: 3,
    currentChar: 'D',
    grid: [
      ['A'],
      ['B', 'B'],
      ['C', 'C', 'C'],
      ['D', 'D', 'D', 'D']
    ],
    explanation: 'i = 3: prints "D" 4 times. Alpha-ramp finished!'
  }
];

export default function Pattern16Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Character: <strong className="text-cyan-200">'{step.currentChar}'</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Frequency: <strong className="text-purple-200">{step.currentRow + 1} times</strong>
        </div>
      </div>

      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
          <span className="text-xs font-semibold text-[var(--chalk-dim)] uppercase tracking-wider">Alpha-Ramp Visualizer</span>
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

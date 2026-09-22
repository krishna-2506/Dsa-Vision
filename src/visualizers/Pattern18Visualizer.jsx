import React from 'react';

export const meta = {
  title: 'Pattern 18: Alpha-Triangle Pattern',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1)',
  description: 'Generates an alpha-triangle where row i starts backwards from character ("A" + N - 1 - i) and advances forward to ("A" + N - 1).'
};

export const solutions = {
  cpp: `// C++: Pattern 18 - Alpha Triangle
#include <iostream>
using namespace std;

void pattern18(int n) {
    for (int i = 0; i < n; i++) {
        for (char ch = 'A' + n - 1 - i; ch <= 'A' + n - 1; ch++) {
            cout << ch << " ";
        }
        cout << "\\n";
    }
}

int main() {
    int n = 5;
    pattern18(n);
    return 0;
}`,
  java: `// Java: Pattern 18
public class Solution {
    public static void pattern18(int n) {
        for (int i = 0; i < n; i++) {
            for (char ch = (char)('A' + n - 1 - i); ch <= 'A' + n - 1; ch++) {
                System.out.print(ch + " ");
            }
            System.out.println();
        }
    }
}`,
  python: `# Python: Pattern 18
def pattern18(n: int):
    for i in range(n):
        start_char = ord('A') + n - 1 - i
        end_char = ord('A') + n - 1
        row = [chr(c) for c in range(start_char, end_char + 1)]
        print(" ".join(row))`,
  javascript: `// JavaScript: Pattern 18
function pattern18(n) {
    for (let i = 0; i < n; i++) {
        let line = "";
        for (let j = n - 1 - i; j <= n - 1; j++) {
            line += String.fromCharCode(65 + j) + " ";
        }
        console.log(line);
    }
}`
};

export const steps = [
  {
    title: '1. Row 0: "E"',
    phase: 'ROW_0',
    codeLine: 7,
    currentRow: 0,
    grid: [
      ['E'],
      [],
      [],
      [],
      []
    ],
    explanation: 'i = 0: starts and ends at character "E".'
  },
  {
    title: '2. Row 1: "D E"',
    phase: 'ROW_1',
    codeLine: 7,
    currentRow: 1,
    grid: [
      ['E'],
      ['D', 'E'],
      [],
      [],
      []
    ],
    explanation: 'i = 1: starts at "D" and advances to "E".'
  },
  {
    title: '3. Row 2: "C D E"',
    phase: 'ROW_2',
    codeLine: 7,
    currentRow: 2,
    grid: [
      ['E'],
      ['D', 'E'],
      ['C', 'D', 'E'],
      [],
      []
    ],
    explanation: 'i = 2: starts at "C" and advances to "E".'
  },
  {
    title: '4. Row 4: "A B C D E" (Complete)',
    phase: 'COMPLETE',
    codeLine: 7,
    currentRow: 4,
    grid: [
      ['E'],
      ['D', 'E'],
      ['C', 'D', 'E'],
      ['B', 'C', 'D', 'E'],
      ['A', 'B', 'C', 'D', 'E']
    ],
    explanation: 'i = 4: spans entire alphabet range from "A" to "E".'
  }
];

export default function Pattern18Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Start char: <strong className="text-purple-200">chr('A' + N - 1 - i)</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          End char: <strong className="text-cyan-200">chr('A' + N - 1)</strong>
        </div>
      </div>

      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
          <span className="text-xs font-semibold text-[var(--chalk-dim)] uppercase tracking-wider">Alpha-Triangle Canvas</span>
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
                      ? 'bg-purple-500/30 border border-purple-500/80 text-purple-200 scale-105 shadow-md shadow-purple-500/20'
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

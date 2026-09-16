import React from 'react';

export const meta = {
  title: 'Pattern 14: Increasing Letter Triangle Pattern',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1)',
  description: 'Generates an increasing alphabet triangle where each row i prints characters starting from "A" up to "A" + i.'
};

export const solutions = {
  cpp: `// C++: Pattern 14 - Letter Triangle
#include <iostream>
using namespace std;

void pattern14(int n) {
    for (int i = 0; i < n; i++) {
        for (char ch = 'A'; ch <= 'A' + i; ch++) {
            cout << ch << " ";
        }
        cout << "\\n";
    }
}

int main() {
    int n = 4;
    pattern14(n);
    return 0;
}`,
  java: `// Java: Pattern 14
public class Solution {
    public static void pattern14(int n) {
        for (int i = 0; i < n; i++) {
            for (char ch = 'A'; ch <= 'A' + i; ch++) {
                System.out.print(ch + " ");
            }
            System.out.println();
        }
    }
}`,
  python: `# Python: Pattern 14
def pattern14(n: int):
    for i in range(n):
        row = [chr(ord('A') + j) for j in range(i + 1)]
        print(" ".join(row))`,
  javascript: `// JavaScript: Pattern 14
function pattern14(n) {
    for (let i = 0; i < n; i++) {
        let line = "";
        for (let j = 0; j <= i; j++) {
            line += String.fromCharCode(65 + j) + " ";
        }
        console.log(line);
    }
}`
};

export const steps = [
  {
    title: '1. Row 0: "A"',
    phase: 'ROW_0',
    codeLine: 7,
    currentRow: 0,
    grid: [
      ['A'],
      [],
      [],
      []
    ],
    explanation: 'i = 0: prints character "A".'
  },
  {
    title: '2. Row 1: "A B"',
    phase: 'ROW_1',
    codeLine: 7,
    currentRow: 1,
    grid: [
      ['A'],
      ['A', 'B'],
      [],
      []
    ],
    explanation: 'i = 1: prints "A" up to "A" + 1 = "B".'
  },
  {
    title: '3. Row 2: "A B C"',
    phase: 'ROW_2',
    codeLine: 7,
    currentRow: 2,
    grid: [
      ['A'],
      ['A', 'B'],
      ['A', 'B', 'C'],
      []
    ],
    explanation: 'i = 2: prints "A", "B", "C".'
  },
  {
    title: '4. Row 3: "A B C D" (Complete)',
    phase: 'COMPLETE',
    codeLine: 7,
    currentRow: 3,
    grid: [
      ['A'],
      ['A', 'B'],
      ['A', 'B', 'C'],
      ['A', 'B', 'C', 'D']
    ],
    explanation: 'i = 3: completes the 4-row alphabet triangle.'
  }
];

export default function Pattern14Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Character range: <strong className="text-cyan-200">'A' to ('A' + i)</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Row: <strong className="text-purple-200">i = {step.currentRow}</strong>
        </div>
      </div>

      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#272b3c] pb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Alphabet Triangle</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="flex flex-col items-start p-6 bg-[#12131b] border border-[#272b3c] rounded-xl space-y-2 min-h-[190px]">
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

        <div className="p-3.5 rounded-xl bg-[#12131b] border border-[#272b3c] text-xs text-slate-300 leading-relaxed">
          {step.explanation}
        </div>
      </div>
    </div>
  );
}

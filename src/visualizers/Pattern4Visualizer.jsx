import React from 'react';

export const meta = {
  title: 'Pattern 4: Right-Angled Number Triangle - II',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1)',
  description: 'Generates a triangle where each row i repeats the integer i exactly i times.'
};

export const solutions = {
  cpp: `// C++: Pattern 4 - Repeated Number Triangle
#include <iostream>
using namespace std;

void pattern4(int n) {
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            cout << i << " ";
        }
        cout << "\\n";
    }
}

int main() {
    int n = 4;
    pattern4(n);
    return 0;
}`,
  java: `// Java: Pattern 4
public class Solution {
    public static void pattern4(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(i + " ");
            }
            System.out.println();
        }
    }
}`,
  python: `# Python: Pattern 4
def pattern4(n: int):
    for i in range(1, n + 1):
        print(f"{i} " * i)`,
  javascript: `// JavaScript: Pattern 4
function pattern4(n) {
    for (let i = 1; i <= n; i++) {
        console.log((i + " ").repeat(i));
    }
}`
};

export const steps = [
  {
    title: '1. Row 1: Repeat 1 one time',
    phase: 'ROW_1',
    codeLine: 7,
    currentRow: 1,
    grid: [
      ['1'],
      [],
      [],
      []
    ],
    explanation: 'Row 1 repeats the value 1.'
  },
  {
    title: '2. Row 2: Repeat 2 two times',
    phase: 'ROW_2',
    codeLine: 7,
    currentRow: 2,
    grid: [
      ['1'],
      ['2', '2'],
      [],
      []
    ],
    explanation: 'Row 2 repeats the value 2 twice.'
  },
  {
    title: '3. Row 3: Repeat 3 three times',
    phase: 'ROW_3',
    codeLine: 7,
    currentRow: 3,
    grid: [
      ['1'],
      ['2', '2'],
      ['3', '3', '3'],
      []
    ],
    explanation: 'Row 3 repeats the value 3 three times.'
  },
  {
    title: '4. Row 4: Repeat 4 four times',
    phase: 'COMPLETE',
    codeLine: 7,
    currentRow: 4,
    grid: [
      ['1'],
      ['2', '2'],
      ['3', '3', '3'],
      ['4', '4', '4', '4']
    ],
    explanation: 'Row 4 completes the pattern with four 4s.'
  }
];

export default function Pattern4Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Value Printed: <strong className="text-purple-200">row index i</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Repeat Count: <strong className="text-cyan-200">i times</strong>
        </div>
      </div>

      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#272b3c] pb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Repeated Number Triangle</span>
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
                    rIdx + 1 === step.currentRow
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

        <div className="p-3.5 rounded-xl bg-[#12131b] border border-[#272b3c] text-xs text-slate-300 leading-relaxed">
          {step.explanation}
        </div>
      </div>
    </div>
  );
}

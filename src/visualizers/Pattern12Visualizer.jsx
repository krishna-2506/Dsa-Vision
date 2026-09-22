import React from 'react';

export const meta = {
  title: 'Pattern 12: Number Crown Pattern',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1)',
  description: 'Generates a symmetric number crown where each row i prints increasing numbers 1 to i, a decreasing middle gap of 2*(N - i) spaces, and mirrored decreasing numbers i down to 1.'
};

export const solutions = {
  cpp: `// C++: Pattern 12 - Number Crown
#include <iostream>
using namespace std;

void pattern12(int n) {
    int spaces = 2 * (n - 1);
    for (int i = 1; i <= n; i++) {
        // Numbers increasing
        for (int j = 1; j <= i; j++) cout << j;
        // Middle spaces
        for (int j = 1; j <= spaces; j++) cout << " ";
        // Numbers decreasing
        for (int j = i; j >= 1; j--) cout << j;
        
        cout << "\\n";
        spaces -= 2;
    }
}

int main() {
    int n = 4;
    pattern12(n);
    return 0;
}`,
  java: `// Java: Pattern 12
public class Solution {
    public static void pattern12(int n) {
        int spaces = 2 * (n - 1);
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) System.out.print(j);
            for (int j = 1; j <= spaces; j++) System.out.print(" ");
            for (int j = i; j >= 1; j--) System.out.print(j);
            System.out.println();
            spaces -= 2;
        }
    }
}`,
  python: `# Python: Pattern 12
def pattern12(n: int):
    spaces = 2 * (n - 1)
    for i in range(1, n + 1):
        left = "".join(str(j) for j in range(1, i + 1))
        mid = " " * spaces
        right = "".join(str(j) for j in range(i, 0, -1))
        print(left + mid + right)
        spaces -= 2`,
  javascript: `// JavaScript: Pattern 12
function pattern12(n) {
    let spaces = 2 * (n - 1);
    for (let i = 1; i <= n; i++) {
        let left = Array.from({length: i}, (_, k) => k + 1).join('');
        let mid = ' '.repeat(spaces);
        let right = Array.from({length: i}, (_, k) => i - k).join('');
        console.log(left + mid + right);
        spaces -= 2;
    }
}`
};

export const steps = [
  {
    title: '1. Row 1: Left 1, 6 Spaces, Right 1',
    phase: 'ROW_1',
    codeLine: 7,
    currentRow: 1,
    spaces: 6,
    grid: [
      ['1', ' ', ' ', ' ', ' ', ' ', ' ', '1'],
      [],
      [],
      []
    ],
    explanation: 'i = 1: prints 1, followed by 2*(4-1) = 6 spaces, followed by 1.'
  },
  {
    title: '2. Row 2: Left 12, 4 Spaces, Right 21',
    phase: 'ROW_2',
    codeLine: 7,
    currentRow: 2,
    spaces: 4,
    grid: [
      ['1', ' ', ' ', ' ', ' ', ' ', ' ', '1'],
      ['1', '2', ' ', ' ', ' ', ' ', '2', '1'],
      [],
      []
    ],
    explanation: 'i = 2: left sequence is 1 2, middle space narrows to 4, right sequence is 2 1.'
  },
  {
    title: '3. Row 3: Left 123, 2 Spaces, Right 321',
    phase: 'ROW_3',
    codeLine: 7,
    currentRow: 3,
    spaces: 2,
    grid: [
      ['1', ' ', ' ', ' ', ' ', ' ', ' ', '1'],
      ['1', '2', ' ', ' ', ' ', ' ', '2', '1'],
      ['1', '2', '3', ' ', ' ', '3', '2', '1'],
      []
    ],
    explanation: 'i = 3: spaces shrink to 2.'
  },
  {
    title: '4. Row 4: 0 Spaces (Apex Meets: 12344321)',
    phase: 'COMPLETE',
    codeLine: 7,
    currentRow: 4,
    spaces: 0,
    grid: [
      ['1', ' ', ' ', ' ', ' ', ' ', ' ', '1'],
      ['1', '2', ' ', ' ', ' ', ' ', '2', '1'],
      ['1', '2', '3', ' ', ' ', '3', '2', '1'],
      ['1', '2', '3', '4', '4', '3', '2', '1']
    ],
    explanation: 'i = 4: gap vanishes completely. Beautiful symmetric crown assembled!'
  }
];

export default function Pattern12Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Symmetry: <strong className="text-cyan-200">Left [1..i] + Gap + Right [i..1]</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Middle Gap: <strong className="text-purple-200">{step.spaces} Spaces</strong>
        </div>
      </div>

      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
          <span className="text-xs font-semibold text-[var(--chalk-dim)] uppercase tracking-wider">Crown Symmetry Grid</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="flex flex-col items-center p-6 bg-[var(--board-raised)] border border-[var(--line)] rounded-xl space-y-2 min-h-[190px]">
          {step.grid.map((row, rIdx) => (
            <div key={rIdx} className="flex space-x-1.5">
              {row.map((cell, cIdx) => (
                <span
                  key={cIdx}
                  className={`w-7 h-7 rounded flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    cell !== ' '
                      ? rIdx + 1 === step.currentRow
                        ? 'bg-cyan-500/30 border border-cyan-500/80 text-cyan-200 scale-105 shadow-md shadow-cyan-500/20'
                        : 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-300'
                      : 'bg-transparent text-transparent'
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

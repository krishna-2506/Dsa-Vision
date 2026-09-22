import React from 'react';

export const meta = {
  title: 'Pattern 8: Inverted Star Pyramid',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1)',
  description: 'Constructs an inverted symmetric star pyramid where row i has i leading spaces and [2*(N - i) - 1] asterisks.'
};

export const solutions = {
  cpp: `// C++: Pattern 8 - Inverted Star Pyramid
#include <iostream>
using namespace std;

void pattern8(int n) {
    for (int i = 0; i < n; i++) {
        // Leading spaces
        for (int j = 0; j < i; j++) cout << " ";
        // Stars
        for (int j = 0; j < 2 * n - (2 * i + 1); j++) cout << "*";
        // Trailing spaces
        for (int j = 0; j < i; j++) cout << " ";
        cout << "\\n";
    }
}

int main() {
    int n = 4;
    pattern8(n);
    return 0;
}`,
  java: `// Java: Pattern 8
public class Solution {
    public static void pattern8(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) System.out.print(" ");
            for (int j = 0; j < 2 * n - (2 * i + 1); j++) System.out.print("*");
            System.out.println();
        }
    }
}`,
  python: `# Python: Pattern 8
def pattern8(n: int):
    for i in range(n):
        spaces = " " * i
        stars = "*" * (2 * n - (2 * i + 1))
        print(spaces + stars + spaces)`,
  javascript: `// JavaScript: Pattern 8
function pattern8(n) {
    for (let i = 0; i < n; i++) {
        let spaces = " ".repeat(i);
        let stars = "*".repeat(2 * n - (2 * i + 1));
        console.log(spaces + stars + spaces);
    }
}`
};

export const steps = [
  {
    title: '1. Row 0: 0 Spaces, 7 Stars',
    phase: 'ROW_0',
    codeLine: 7,
    currentRow: 0,
    grid: [
      ['*', '*', '*', '*', '*', '*', '*'],
      [],
      [],
      []
    ],
    explanation: 'i = 0: spaces = 0, stars = 2(4) - (0 + 1) = 7.'
  },
  {
    title: '2. Row 1: 1 Space, 5 Stars',
    phase: 'ROW_1',
    codeLine: 7,
    currentRow: 1,
    grid: [
      ['*', '*', '*', '*', '*', '*', '*'],
      [' ', '*', '*', '*', '*', '*', ' '],
      [],
      []
    ],
    explanation: 'i = 1: spaces = 1, stars = 8 - 3 = 5.'
  },
  {
    title: '3. Row 2: 2 Spaces, 3 Stars',
    phase: 'ROW_2',
    codeLine: 7,
    currentRow: 2,
    grid: [
      ['*', '*', '*', '*', '*', '*', '*'],
      [' ', '*', '*', '*', '*', '*', ' '],
      [' ', ' ', '*', '*', '*', ' ', ' '],
      []
    ],
    explanation: 'i = 2: spaces = 2, stars = 8 - 5 = 3.'
  },
  {
    title: '4. Row 3: 3 Spaces, 1 Star (Complete)',
    phase: 'COMPLETE',
    codeLine: 7,
    currentRow: 3,
    grid: [
      ['*', '*', '*', '*', '*', '*', '*'],
      [' ', '*', '*', '*', '*', '*', ' '],
      [' ', ' ', '*', '*', '*', ' ', ' '],
      [' ', ' ', ' ', '*', ' ', ' ', ' ']
    ],
    explanation: 'i = 3: spaces = 3, stars = 8 - 7 = 1. Inverted pyramid complete!'
  }
];

export default function Pattern8Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Stars formula: <strong className="text-purple-200">2 &times; (N - i) - 1</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Spaces formula: <strong className="text-cyan-200">i spaces</strong>
        </div>
      </div>

      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
          <span className="text-xs font-semibold text-[var(--chalk-dim)] uppercase tracking-wider">Inverted Pyramid Renderer</span>
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
                    cell === '*'
                      ? rIdx === step.currentRow
                        ? 'bg-purple-500/30 border border-purple-500/80 text-purple-200 scale-105 shadow-md shadow-purple-500/20'
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

        <div className="p-3.5 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] text-xs text-[var(--chalk-dim)] leading-relaxed">
          {step.explanation}
        </div>
      </div>
    </div>
  );
}

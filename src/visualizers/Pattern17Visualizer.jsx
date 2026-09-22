import React from 'react';

export const meta = {
  title: 'Pattern 17: Alpha-Hill Pattern',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1)',
  description: 'Constructs an upright symmetric alphabetic pyramid where characters rise from "A" up to the row peak, then mirror backwards down to "A".'
};

export const solutions = {
  cpp: `// C++: Pattern 17 - Alpha-Hill
#include <iostream>
using namespace std;

void pattern17(int n) {
    for (int i = 0; i < n; i++) {
        // Leading spaces
        for (int j = 0; j < n - i - 1; j++) cout << " ";

        // Palindromic characters
        char ch = 'A';
        int breakpoint = (2 * i + 1) / 2;
        for (int j = 1; j <= 2 * i + 1; j++) {
            cout << ch;
            if (j <= breakpoint) ch++;
            else ch--;
        }

        // Trailing spaces
        for (int j = 0; j < n - i - 1; j++) cout << " ";
        cout << "\\n";
    }
}

int main() {
    int n = 4;
    pattern17(n);
    return 0;
}`,
  java: `// Java: Pattern 17
public class Solution {
    public static void pattern17(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i - 1; j++) System.out.print(" ");
            char ch = 'A';
            int breakpoint = (2 * i + 1) / 2;
            for (int j = 1; j <= 2 * i + 1; j++) {
                System.out.print(ch);
                if (j <= breakpoint) ch++;
                else ch--;
            }
            System.out.println();
        }
    }
}`,
  python: `# Python: Pattern 17
def pattern17(n: int):
    for i in range(n):
        spaces = " " * (n - i - 1)
        # ascending
        left = "".join(chr(ord('A') + j) for j in range(i + 1))
        # descending
        right = "".join(chr(ord('A') + j) for j in range(i - 1, -1, -1))
        print(spaces + left + right + spaces)`,
  javascript: `// JavaScript: Pattern 17
function pattern17(n) {
    for (let i = 0; i < n; i++) {
        let spaces = " ".repeat(n - i - 1);
        let left = Array.from({length: i + 1}, (_, k) => String.fromCharCode(65 + k)).join('');
        let right = Array.from({length: i}, (_, k) => String.fromCharCode(65 + i - 1 - k)).join('');
        console.log(spaces + left + right + spaces);
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
      [' ', ' ', ' ', 'A', ' ', ' ', ' '],
      [],
      [],
      []
    ],
    explanation: 'i = 0: spaces = 3, single letter "A".'
  },
  {
    title: '2. Row 1: "A B A"',
    phase: 'ROW_1',
    codeLine: 7,
    currentRow: 1,
    grid: [
      [' ', ' ', ' ', 'A', ' ', ' ', ' '],
      [' ', ' ', 'A', 'B', 'A', ' ', ' '],
      [],
      []
    ],
    explanation: 'i = 1: increments A -> B, then decrements back to A.'
  },
  {
    title: '3. Row 2: "A B C B A"',
    phase: 'ROW_2',
    codeLine: 7,
    currentRow: 2,
    grid: [
      [' ', ' ', ' ', 'A', ' ', ' ', ' '],
      [' ', ' ', 'A', 'B', 'A', ' ', ' '],
      [' ', 'A', 'B', 'C', 'B', 'A', ' '],
      []
    ],
    explanation: 'i = 2: peak character is C. Reverses to B, A.'
  },
  {
    title: '4. Row 3: "A B C D C B A" (Complete Hill)',
    phase: 'COMPLETE',
    codeLine: 7,
    currentRow: 3,
    grid: [
      [' ', ' ', ' ', 'A', ' ', ' ', ' '],
      [' ', ' ', 'A', 'B', 'A', ' ', ' '],
      [' ', 'A', 'B', 'C', 'B', 'A', ' '],
      ['A', 'B', 'C', 'D', 'C', 'B', 'A']
    ],
    explanation: 'i = 3: peak character is D. Full alphabetic hill assembled.'
  }
];

export default function Pattern17Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Peak Char: <strong className="text-cyan-200">chr('A' + i)</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Palindromic: <strong className="text-purple-200">A &rarr; Peak &rarr; A</strong>
        </div>
      </div>

      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
          <span className="text-xs font-semibold text-[var(--chalk-dim)] uppercase tracking-wider">Alpha-Hill Canvas</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="flex flex-col items-center p-6 bg-[var(--board-raised)] border border-[var(--line)] rounded-xl space-y-1.5 min-h-[190px]">
          {step.grid.map((row, rIdx) => (
            <div key={rIdx} className="flex space-x-1.5">
              {row.map((cell, cIdx) => (
                <span
                  key={cIdx}
                  className={`w-7 h-7 rounded flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    cell !== ' '
                      ? rIdx === step.currentRow
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

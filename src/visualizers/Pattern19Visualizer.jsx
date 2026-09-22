import React from 'react';

export const meta = {
  title: 'Pattern 19: Symmetric Void Star Pattern',
  category: 'Step 1: Learn the basics',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1)',
  description: 'Constructs a symmetric void pattern containing a central diamond opening bordered by outer star wings in upper and lower mirrored halves.'
};

export const solutions = {
  cpp: `// C++: Pattern 19 - Symmetric Void Pattern
#include <iostream>
using namespace std;

void pattern19(int n) {
    // Upper Half
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i; j++) cout << "*";
        for (int j = 0; j < 2 * i; j++) cout << " ";
        for (int j = 0; j < n - i; j++) cout << "*";
        cout << "\\n";
    }
    // Lower Half
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) cout << "*";
        for (int j = 0; j < 2 * (n - i - 1); j++) cout << " ";
        for (int j = 0; j <= i; j++) cout << "*";
        cout << "\\n";
    }
}

int main() {
    int n = 4;
    pattern19(n);
    return 0;
}`,
  java: `// Java: Pattern 19
public class Solution {
    public static void pattern19(int n) {
        // Upper Half
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i; j++) System.out.print("*");
            for (int j = 0; j < 2 * i; j++) System.out.print(" ");
            for (int j = 0; j < n - i; j++) System.out.print("*");
            System.out.println();
        }
        // Lower Half
        for (int i = 0; i < n; i++) {
            for (int j = 0; j <= i; j++) System.out.print("*");
            for (int j = 0; j < 2 * (n - i - 1); j++) System.out.print(" ");
            for (int j = 0; j <= i; j++) System.out.print("*");
            System.out.println();
        }
    }
}`,
  python: `# Python: Pattern 19
def pattern19(n: int):
    # Upper
    for i in range(n):
        print("*" * (n - i) + " " * (2 * i) + "*" * (n - i))
    # Lower
    for i in range(n):
        print("*" * (i + 1) + " " * (2 * (n - i - 1)) + "*" * (i + 1))`,
  javascript: `// JavaScript: Pattern 19
function pattern19(n) {
    for (let i = 0; i < n; i++) {
        console.log("*".repeat(n - i) + " ".repeat(2 * i) + "*".repeat(n - i));
    }
    for (let i = 0; i < n; i++) {
        console.log("*".repeat(i + 1) + " ".repeat(2 * (n - i - 1)) + "*".repeat(i + 1));
    }
}`
};

export const steps = [
  {
    title: '1. Upper Half Opens: 4 stars, 0 space, 4 stars',
    phase: 'UPPER_START',
    codeLine: 8,
    half: 'Upper Opening',
    grid: [
      ['*', '*', '*', '*', '*', '*', '*', '*'],
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ],
    explanation: 'Row 0 has full solid wings with 0 center spaces.'
  },
  {
    title: '2. Upper Half Deepens: Center gap widens',
    phase: 'UPPER_DONE',
    codeLine: 12,
    half: 'Upper Complete',
    grid: [
      ['*', '*', '*', '*', '*', '*', '*', '*'],
      ['*', '*', '*', ' ', ' ', '*', '*', '*'],
      ['*', '*', ' ', ' ', ' ', ' ', '*', '*'],
      ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
      [],
      [],
      [],
      []
    ],
    explanation: 'Inner void expands outwards by 2 spaces per row.'
  },
  {
    title: '3. Lower Half Begins: Center gap starts wide',
    phase: 'LOWER_START',
    codeLine: 16,
    half: 'Lower Closing',
    grid: [
      ['*', '*', '*', '*', '*', '*', '*', '*'],
      ['*', '*', '*', ' ', ' ', '*', '*', '*'],
      ['*', '*', ' ', ' ', ' ', ' ', '*', '*'],
      ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
      ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
      [],
      [],
      []
    ],
    explanation: 'Lower half mirrors the maximum gap, then contracts.'
  },
  {
    title: '4. Complete Symmetric Void',
    phase: 'COMPLETE',
    codeLine: 20,
    half: 'Symmetric Void Completed',
    grid: [
      ['*', '*', '*', '*', '*', '*', '*', '*'],
      ['*', '*', '*', ' ', ' ', '*', '*', '*'],
      ['*', '*', ' ', ' ', ' ', ' ', '*', '*'],
      ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
      ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
      ['*', '*', ' ', ' ', ' ', ' ', '*', '*'],
      ['*', '*', '*', ' ', ' ', '*', '*', '*'],
      ['*', '*', '*', '*', '*', '*', '*', '*']
    ],
    explanation: 'Both halves meet seamlessly to create a diamond void surrounded by stars.'
  }
];

export default function Pattern19Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Pattern: <strong className="text-cyan-200">Upper Void + Lower Void</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Phase: <strong className="text-purple-200">{step.half}</strong>
        </div>
      </div>

      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
          <span className="text-xs font-semibold text-[var(--chalk-dim)] uppercase tracking-wider">Symmetric Void Grid</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="flex flex-col items-center p-6 bg-[var(--board-raised)] border border-[var(--line)] rounded-xl space-y-1 min-h-[220px]">
          {step.grid.map((row, rIdx) => (
            <div key={rIdx} className="flex space-x-1.5">
              {row.map((cell, cIdx) => (
                <span
                  key={cIdx}
                  className={`w-6 h-6 rounded flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    cell === '*'
                      ? rIdx < 4
                        ? 'bg-cyan-500/30 border border-cyan-500/80 text-cyan-200'
                        : 'bg-purple-500/30 border border-purple-500/80 text-purple-200'
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

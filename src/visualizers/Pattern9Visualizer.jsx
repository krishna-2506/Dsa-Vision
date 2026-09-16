import React from 'react';

export const meta = {
  title: 'Pattern 9: Diamond Star Pattern',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1)',
  description: 'Combines Pattern 7 (Upright Star Pyramid) and Pattern 8 (Inverted Star Pyramid) to render a complete 2N-row symmetric diamond star pattern.'
};

export const solutions = {
  cpp: `// C++: Pattern 9 - Diamond Star Pattern
#include <iostream>
using namespace std;

void pattern7(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) cout << " ";
        for (int j = 0; j < 2 * i + 1; j++) cout << "*";
        cout << "\\n";
    }
}

void pattern8(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++) cout << " ";
        for (int j = 0; j < 2 * n - (2 * i + 1); j++) cout << "*";
        cout << "\\n";
    }
}

void pattern9(int n) {
    pattern7(n);
    pattern8(n);
}

int main() {
    int n = 3;
    pattern9(n);
    return 0;
}`,
  java: `// Java: Pattern 9
public class Solution {
    public static void pattern9(int n) {
        // Upper Half
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i - 1; j++) System.out.print(" ");
            for (int j = 0; j < 2 * i + 1; j++) System.out.print("*");
            System.out.println();
        }
        // Lower Half
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) System.out.print(" ");
            for (int j = 0; j < 2 * n - (2 * i + 1); j++) System.out.print("*");
            System.out.println();
        }
    }
}`,
  python: `# Python: Pattern 9
def pattern9(n: int):
    # Upper
    for i in range(n):
        print(" " * (n - i - 1) + "*" * (2 * i + 1))
    # Lower
    for i in range(n):
        print(" " * i + "*" * (2 * n - (2 * i + 1)))`,
  javascript: `// JavaScript: Pattern 9
function pattern9(n) {
    for (let i = 0; i < n; i++) {
        console.log(" ".repeat(n - i - 1) + "*".repeat(2 * i + 1));
    }
    for (let i = 0; i < n; i++) {
        console.log(" ".repeat(i) + "*".repeat(2 * n - (2 * i + 1)));
    }
}`
};

export const steps = [
  {
    title: '1. Upper Pyramid: Start at apex',
    phase: 'UPPER_START',
    codeLine: 7,
    half: 'Upper Half (Pattern 7)',
    grid: [
      [' ', ' ', '*', ' ', ' '],
      [],
      [],
      [],
      [],
      []
    ],
    explanation: 'Apex row: 2 leading spaces, 1 star.'
  },
  {
    title: '2. Upper Half Complete',
    phase: 'UPPER_DONE',
    codeLine: 11,
    half: 'Upper Half Complete',
    grid: [
      [' ', ' ', '*', ' ', ' '],
      [' ', '*', '*', '*', ' '],
      ['*', '*', '*', '*', '*'],
      [],
      [],
      []
    ],
    explanation: 'Upper pyramid reaches widest horizontal width (5 stars).'
  },
  {
    title: '3. Lower Inverted Pyramid: Start upper base',
    phase: 'LOWER_START',
    codeLine: 17,
    half: 'Lower Half (Pattern 8)',
    grid: [
      [' ', ' ', '*', ' ', ' '],
      [' ', '*', '*', '*', ' '],
      ['*', '*', '*', '*', '*'],
      ['*', '*', '*', '*', '*'],
      [],
      []
    ],
    explanation: 'Lower half begins at 0 spaces, 5 stars.'
  },
  {
    title: '4. Full Diamond Assembled',
    phase: 'COMPLETE',
    codeLine: 24,
    half: 'Full Diamond Complete',
    grid: [
      [' ', ' ', '*', ' ', ' '],
      [' ', '*', '*', '*', ' '],
      ['*', '*', '*', '*', '*'],
      ['*', '*', '*', '*', '*'],
      [' ', '*', '*', '*', ' '],
      [' ', ' ', '*', ' ', ' ']
    ],
    explanation: 'Inverted pyramid tapers back down to 1 star. Total 2N rows rendered.'
  }
];

export default function Pattern9Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Structure: <strong className="text-cyan-200">Pattern 7 + Pattern 8</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Active Phase: <strong className="text-purple-200">{step.half}</strong>
        </div>
      </div>

      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#272b3c] pb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Diamond Canvas</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="flex flex-col items-center p-6 bg-[#12131b] border border-[#272b3c] rounded-xl space-y-1.5 min-h-[220px]">
          {step.grid.map((row, rIdx) => (
            <div key={rIdx} className="flex space-x-1.5">
              {row.map((cell, cIdx) => (
                <span
                  key={cIdx}
                  className={`w-7 h-7 rounded flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    cell === '*'
                      ? rIdx < 3
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

        <div className="p-3.5 rounded-xl bg-[#12131b] border border-[#272b3c] text-xs text-slate-300 leading-relaxed">
          {step.explanation}
        </div>
      </div>
    </div>
  );
}

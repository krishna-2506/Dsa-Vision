import React from 'react';

export const meta = {
  title: 'Pattern 20: Symmetric Butterfly Pattern',
  category: 'Step 1: Learn the basics',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1)',
  description: 'Renders a symmetric butterfly pattern with 2N - 1 rows: wing stars expand outward while the middle gap contracts to 0, then symmetrically reverses.'
};

export const solutions = {
  cpp: `// C++: Pattern 20 - Symmetric Butterfly
#include <iostream>
using namespace std;

void pattern20(int n) {
    int spaces = 2 * n - 2;
    for (int i = 1; i <= 2 * n - 1; i++) {
        int stars = i;
        if (i > n) stars = 2 * n - i;

        // Left wing
        for (int j = 1; j <= stars; j++) cout << "*";
        // Space gap
        for (int j = 1; j <= spaces; j++) cout << " ";
        // Right wing
        for (int j = 1; j <= stars; j++) cout << "*";

        cout << "\\n";
        if (i < n) spaces -= 2;
        else spaces += 2;
    }
}

int main() {
    int n = 4;
    pattern20(n);
    return 0;
}`,
  java: `// Java: Pattern 20
public class Solution {
    public static void pattern20(int n) {
        int spaces = 2 * n - 2;
        for (int i = 1; i <= 2 * n - 1; i++) {
            int stars = i <= n ? i : 2 * n - i;
            for (int j = 1; j <= stars; j++) System.out.print("*");
            for (int j = 1; j <= spaces; j++) System.out.print(" ");
            for (int j = 1; j <= stars; j++) System.out.print("*");
            System.out.println();
            if (i < n) spaces -= 2;
            else spaces += 2;
        }
    }
}`,
  python: `# Python: Pattern 20
def pattern20(n: int):
    spaces = 2 * n - 2
    for i in range(1, 2 * n):
        stars = i if i <= n else 2 * n - i
        print("*" * stars + " " * spaces + "*" * stars)
        spaces = spaces - 2 if i < n else spaces + 2`,
  javascript: `// JavaScript: Pattern 20
function pattern20(n) {
    let spaces = 2 * n - 2;
    for (let i = 1; i <= 2 * n - 1; i++) {
        let stars = i <= n ? i : 2 * n - i;
        console.log("*".repeat(stars) + " ".repeat(spaces) + "*".repeat(stars));
        if (i < n) spaces -= 2;
        else spaces += 2;
    }
}`
};

export const steps = [
  {
    title: '1. Row 1: 1 star, 6 spaces, 1 star',
    phase: 'WING_EXPAND_1',
    codeLine: 9,
    currentRow: 1,
    wingSize: 1,
    grid: [
      ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
      [],
      [],
      [],
      [],
      [],
      []
    ],
    explanation: 'Wing tips start at outer edges with 2*(4-1) = 6 spaces.'
  },
  {
    title: '2. Row 2 & 3: Wings grow, gap closes',
    phase: 'WING_EXPAND_2',
    codeLine: 13,
    currentRow: 3,
    wingSize: 3,
    grid: [
      ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
      ['*', '*', ' ', ' ', ' ', ' ', '*', '*'],
      ['*', '*', '*', ' ', ' ', '*', '*', '*'],
      [],
      [],
      [],
      []
    ],
    explanation: 'Stars expand inwards, gap shrinks to 2 spaces.'
  },
  {
    title: '3. Row 4: Solid Center Line (0 spaces)',
    phase: 'PEAK_BODY',
    codeLine: 18,
    currentRow: 4,
    wingSize: 4,
    grid: [
      ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
      ['*', '*', ' ', ' ', ' ', ' ', '*', '*'],
      ['*', '*', '*', ' ', ' ', '*', '*', '*'],
      ['*', '*', '*', '*', '*', '*', '*', '*'],
      [],
      [],
      []
    ],
    explanation: 'Both wings merge at the central thorax line.'
  },
  {
    title: '4. Full Symmetric Butterfly',
    phase: 'COMPLETE',
    codeLine: 20,
    currentRow: 7,
    wingSize: 1,
    grid: [
      ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
      ['*', '*', ' ', ' ', ' ', ' ', '*', '*'],
      ['*', '*', '*', ' ', ' ', '*', '*', '*'],
      ['*', '*', '*', '*', '*', '*', '*', '*'],
      ['*', '*', '*', ' ', ' ', '*', '*', '*'],
      ['*', '*', ' ', ' ', ' ', ' ', '*', '*'],
      ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*']
    ],
    explanation: 'Wings symmetrically narrow back down to complete the 2N - 1 butterfly shape.'
  }
];

export default function Pattern20Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Wing Stars: <strong className="text-cyan-200">{step.wingSize} on each side</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Symmetry: <strong className="text-purple-200">2N - 1 Rows</strong>
        </div>
      </div>

      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
          <span className="text-xs font-semibold text-[var(--chalk-dim)] uppercase tracking-wider">Butterfly Shape</span>
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

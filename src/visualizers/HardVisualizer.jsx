import React from 'react';

export const meta = {
  title: 'Build-up Logical Thinking: Hard Patterns Strategy',
  category: 'Step 1: Learn the basics',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1) auxiliary',
  description: 'Master advanced pattern strategies including multi-phase spaces-stars-spaces pyramids, symmetric reflections, boundary checks (i==0 || j==0), and distance matrices min(top, bottom, left, right).'
};

export const solutions = {
  cpp: `// C++: Advanced Pattern Strategies (Hollow & Distance Matrix)
#include <iostream>
#include <algorithm>
using namespace std;

// Strategy A: Hollow Boundary Check
void printHollowSquare(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (i == 0 || j == 0 || i == n - 1 || j == n - 1)
                cout << "* ";
            else
                cout << "  ";
        }
        cout << "\\n";
    }
}

// Strategy B: Distance to 4 Edges for Concentric Numbers
void printConcentricRings(int n) {
    for (int i = 0; i < 2 * n - 1; i++) {
        for (int j = 0; j < 2 * n - 1; j++) {
            int top = i;
            int left = j;
            int bottom = 2 * n - 2 - i;
            int right = 2 * n - 2 - j;
            int dist = min({top, left, bottom, right});
            cout << (n - dist) << " ";
        }
        cout << "\\n";
    }
}`,
  java: `// Java: Hard Pattern Strategies
public class Solution {
    public static void printHollowSquare(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 || j == 0 || i == n - 1 || j == n - 1) {
                    System.out.print("* ");
                } else {
                    System.out.print("  ");
                }
            }
            System.out.println();
        }
    }
}`,
  python: `# Python: Hard Patterns Techniques
def print_hollow_square(n: int):
    for i in range(n):
        row = []
        for j in range(n):
            if i in (0, n - 1) or j in (0, n - 1):
                row.append("*")
            else:
                row.append(" ")
        print(" ".join(row))`,
  javascript: `// JavaScript: Hard Patterns Strategies
function printHollowSquare(n) {
    for (let i = 0; i < n; i++) {
        let line = "";
        for (let j = 0; j < n; j++) {
            if (i === 0 || j === 0 || i === n - 1 || j === n - 1) line += "* ";
            else line += "  ";
        }
        console.log(line);
    }
}`
};

export const steps = [
  {
    title: 'Strategy 1: Boundary Coordinates (i == 0 || j == 0 || ...)',
    phase: 'BOUNDARY',
    codeLine: 10,
    strategy: 'Coordinate Filtering',
    sampleGrid: [
      ['*', '*', '*', '*'],
      ['*', ' ', ' ', '*'],
      ['*', ' ', ' ', '*'],
      ['*', '*', '*', '*']
    ],
    explanation: 'Instead of complex loops, treat the grid as coordinates (i, j). Print "*" if you are on any of the 4 borders.'
  },
  {
    title: 'Strategy 2: Distance Matrix to 4 Edges',
    phase: 'DISTANCE_MATRIX',
    codeLine: 26,
    strategy: 'Distance from Borders: min(top, bottom, left, right)',
    sampleGrid: [
      ['4', '4', '4', '4'],
      ['4', '3', '3', '4'],
      ['4', '3', '3', '4'],
      ['4', '4', '4', '4']
    ],
    explanation: 'For concentric layers, any cell (i, j) has distance min(i, j, 2n-2-i, 2n-2-j) to the nearest edge. Value is n - dist!'
  },
  {
    title: 'Strategy 3: Split Symmetric Inverted Wings',
    phase: 'SYMMETRIC_WINGS',
    codeLine: 8,
    strategy: 'Left Stars + Inner Spaces + Right Stars',
    sampleGrid: [
      ['*', '*', ' ', '*', '*'],
      ['*', ' ', ' ', ' ', '*'],
      ['*', '*', ' ', '*', '*']
    ],
    explanation: 'Break each line into 3 modular sub-loops: 1. Left shape, 2. Middle empty gap, 3. Right symmetric mirror.'
  }
];

export default function HardVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Technique 1: <strong className="text-purple-200">Edge Distance Formula</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300">
          Technique 2: <strong className="text-rose-200">Symmetric Modular Loops</strong>
        </div>
      </div>

      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
          <span className="text-xs font-semibold text-[var(--chalk-dim)] uppercase tracking-wider">Advanced Mathematical Modeling</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] text-xs font-mono text-purple-300">
          Concept: <span className="text-[var(--chalk)]">{step.strategy}</span>
        </div>

        <div className="flex flex-col items-center p-4 bg-[var(--board-raised)] border border-[var(--line)] rounded-xl space-y-1.5">
          {step.sampleGrid.map((row, rIdx) => (
            <div key={rIdx} className="flex space-x-2">
              {row.map((cell, cIdx) => (
                <span
                  key={cIdx}
                  className={`w-8 h-8 rounded flex items-center justify-center font-mono text-sm font-bold ${
                    cell !== ' '
                      ? 'bg-purple-500/20 border border-purple-500/40 text-purple-300'
                      : 'bg-transparent text-slate-700'
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

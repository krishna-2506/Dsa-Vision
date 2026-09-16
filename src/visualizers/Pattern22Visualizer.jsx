import React from 'react';

export const meta = {
  title: 'Pattern 22: The Number Pattern (Concentric Rings)',
  category: 'Step 1: Learn the basics',
  difficulty: 'Hard',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1)',
  description: 'Constructs concentric numerical square rings of size (2N - 1) x (2N - 1) by calculating the minimum distance of cell (i, j) to all four outer borders: val = N - min(top, bottom, left, right).'
};

export const solutions = {
  cpp: `// C++: Pattern 22 - Concentric Number Rings
#include <iostream>
#include <algorithm>
using namespace std;

void pattern22(int n) {
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
}

int main() {
    int n = 4;
    pattern22(n);
    return 0;
}`,
  java: `// Java: Pattern 22
public class Solution {
    public static void pattern22(int n) {
        for (int i = 0; i < 2 * n - 1; i++) {
            for (int j = 0; j < 2 * n - 1; j++) {
                int top = i;
                int left = j;
                int bottom = 2 * n - 2 - i;
                int right = 2 * n - 2 - j;
                int dist = Math.min(Math.min(top, bottom), Math.min(left, right));
                System.out.print((n - dist) + " ");
            }
            System.out.println();
        }
    }
}`,
  python: `# Python: Pattern 22
def pattern22(n: int):
    for i in range(2 * n - 1):
        row = []
        for j in range(2 * n - 1):
            top = i
            left = j
            bottom = 2 * n - 2 - i
            right = 2 * n - 2 - j
            dist = min(top, left, bottom, right)
            row.append(str(n - dist))
        print(" ".join(row))`,
  javascript: `// JavaScript: Pattern 22
function pattern22(n) {
    for (let i = 0; i < 2 * n - 1; i++) {
        let line = "";
        for (let j = 0; j < 2 * n - 1; j++) {
            let top = i;
            let left = j;
            let bottom = 2 * n - 2 - i;
            let right = 2 * n - 2 - j;
            let dist = Math.min(top, left, bottom, right);
            line += (n - dist) + " ";
        }
        console.log(line);
    }
}`
};

export const steps = [
  {
    title: '1. Outer Ring: dist = 0 -> Value = 4',
    phase: 'OUTER_RING',
    codeLine: 14,
    minDist: 0,
    activeLayer: 'Ring 4 (Perimeter)',
    grid: [
      ['4', '4', '4', '4', '4', '4', '4'],
      ['4', ' ', ' ', ' ', ' ', ' ', '4'],
      ['4', ' ', ' ', ' ', ' ', ' ', '4'],
      ['4', ' ', ' ', ' ', ' ', ' ', '4'],
      ['4', ' ', ' ', ' ', ' ', ' ', '4'],
      ['4', ' ', ' ', ' ', ' ', ' ', '4'],
      ['4', '4', '4', '4', '4', '4', '4']
    ],
    explanation: 'Any cell on the perimeter has min(top, left, bottom, right) = 0. Its value is 4 - 0 = 4.'
  },
  {
    title: '2. Ring 3: dist = 1 -> Value = 3',
    phase: 'RING_3',
    codeLine: 14,
    minDist: 1,
    activeLayer: 'Ring 3',
    grid: [
      ['4', '4', '4', '4', '4', '4', '4'],
      ['4', '3', '3', '3', '3', '3', '4'],
      ['4', '3', ' ', ' ', ' ', '3', '4'],
      ['4', '3', ' ', ' ', ' ', '3', '4'],
      ['4', '3', ' ', ' ', ' ', '3', '4'],
      ['4', '3', '3', '3', '3', '3', '4'],
      ['4', '4', '4', '4', '4', '4', '4']
    ],
    explanation: 'Cells 1 step away from the border have min distance 1. Value is 4 - 1 = 3.'
  },
  {
    title: '3. Ring 2: dist = 2 -> Value = 2',
    phase: 'RING_2',
    codeLine: 14,
    minDist: 2,
    activeLayer: 'Ring 2',
    grid: [
      ['4', '4', '4', '4', '4', '4', '4'],
      ['4', '3', '3', '3', '3', '3', '4'],
      ['4', '3', '2', '2', '2', '3', '4'],
      ['4', '3', '2', ' ', '2', '3', '4'],
      ['4', '3', '2', '2', '2', '3', '4'],
      ['4', '3', '3', '3', '3', '3', '4'],
      ['4', '4', '4', '4', '4', '4', '4']
    ],
    explanation: 'Next inner layer has distance 2. Value is 4 - 2 = 2.'
  },
  {
    title: '4. Center Bullseye: dist = 3 -> Value = 1',
    phase: 'CENTER_1',
    codeLine: 14,
    minDist: 3,
    activeLayer: 'Center Core',
    grid: [
      ['4', '4', '4', '4', '4', '4', '4'],
      ['4', '3', '3', '3', '3', '3', '4'],
      ['4', '3', '2', '2', '2', '3', '4'],
      ['4', '3', '2', '1', '2', '3', '4'],
      ['4', '3', '2', '2', '2', '3', '4'],
      ['4', '3', '3', '3', '3', '3', '4'],
      ['4', '4', '4', '4', '4', '4', '4']
    ],
    explanation: 'At center coordinate (3, 3), min distance to all 4 edges is 3. Value is 4 - 3 = 1. Concentric square matrix complete!'
  }
];

export default function Pattern22Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  const getColor = (val) => {
    switch (val) {
      case '4': return 'bg-purple-500/25 border-purple-500/50 text-purple-300';
      case '3': return 'bg-cyan-500/25 border-cyan-500/50 text-cyan-300';
      case '2': return 'bg-emerald-500/25 border-emerald-500/50 text-emerald-300';
      case '1': return 'bg-amber-500/30 border-amber-500/70 text-amber-200 font-extrabold scale-105';
      default: return 'bg-black/20 border-white/5 text-transparent';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Formula: <strong className="text-cyan-200">N - min(top, bottom, left, right)</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Active: <strong className="text-purple-200">{step.activeLayer}</strong>
        </div>
      </div>

      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#272b3c] pb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Concentric Ring Matrix</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="flex flex-col items-center p-6 bg-[#12131b] border border-[#272b3c] rounded-xl space-y-1.5 min-h-[240px]">
          {step.grid.map((row, rIdx) => (
            <div key={rIdx} className="flex space-x-1.5">
              {row.map((cell, cIdx) => (
                <span
                  key={cIdx}
                  className={`w-7 h-7 rounded border flex items-center justify-center font-mono text-xs font-bold transition-all ${getColor(cell)}`}
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

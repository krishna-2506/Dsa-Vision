import React from 'react';

export const meta = {
  title: 'Pattern 10: Half Diamond Star Pattern',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1)',
  description: 'Generates a half diamond star pattern with 2N - 1 rows: expanding from 1 to N stars, then tapering from N - 1 back down to 1.'
};

export const solutions = {
  cpp: `// C++: Pattern 10 - Half Diamond
#include <iostream>
using namespace std;

void pattern10(int n) {
    for (int i = 1; i <= 2 * n - 1; i++) {
        int stars = i;
        if (i > n) stars = 2 * n - i;
        for (int j = 1; j <= stars; j++) {
            cout << "* ";
        }
        cout << "\\n";
    }
}

int main() {
    int n = 4;
    pattern10(n);
    return 0;
}`,
  java: `// Java: Pattern 10
public class Solution {
    public static void pattern10(int n) {
        for (int i = 1; i <= 2 * n - 1; i++) {
            int stars = i <= n ? i : 2 * n - i;
            for (int j = 1; j <= stars; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
  python: `# Python: Pattern 10
def pattern10(n: int):
    for i in range(1, 2 * n):
        stars = i if i <= n else 2 * n - i
        print("* " * stars)`,
  javascript: `// JavaScript: Pattern 10
function pattern10(n) {
    for (let i = 1; i <= 2 * n - 1; i++) {
        let stars = i <= n ? i : 2 * n - i;
        console.log("* ".repeat(stars));
    }
}`
};

export const steps = [
  {
    title: '1. Growing Phase: Row 1 to 2',
    phase: 'GROWING',
    codeLine: 8,
    currentRow: 2,
    starsCount: 2,
    grid: [
      ['*'],
      ['*', '*'],
      [],
      [],
      [],
      [],
      []
    ],
    explanation: 'i <= N: stars = i. Triangle expands outwards.'
  },
  {
    title: '2. Peak Apex: Row 4 with N = 4 Stars',
    phase: 'PEAK',
    codeLine: 9,
    currentRow: 4,
    starsCount: 4,
    grid: [
      ['*'],
      ['*', '*'],
      ['*', '*', '*'],
      ['*', '*', '*', '*'],
      [],
      [],
      []
    ],
    explanation: 'At i = 4, stars reach maximum width of 4.'
  },
  {
    title: '3. Shrinking Phase: Row 5 (stars = 2*4 - 5 = 3)',
    phase: 'SHRINKING',
    codeLine: 9,
    currentRow: 5,
    starsCount: 3,
    grid: [
      ['*'],
      ['*', '*'],
      ['*', '*', '*'],
      ['*', '*', '*', '*'],
      ['*', '*', '*'],
      [],
      []
    ],
    explanation: 'When i > N, stars switch to 2N - i. Row 5 prints 3 stars.'
  },
  {
    title: '4. Half Diamond Complete: 2N - 1 Rows',
    phase: 'COMPLETE',
    codeLine: 9,
    currentRow: 7,
    starsCount: 1,
    grid: [
      ['*'],
      ['*', '*'],
      ['*', '*', '*'],
      ['*', '*', '*', '*'],
      ['*', '*', '*'],
      ['*', '*'],
      ['*']
    ],
    explanation: 'Row 7 completes the half diamond with 1 star.'
  }
];

export default function Pattern10Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Condition: <strong className="text-cyan-200">i &gt; n ? 2n - i : i</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Stars on Row {step.currentRow}: <strong className="text-purple-200">{step.starsCount}</strong>
        </div>
      </div>

      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
          <span className="text-xs font-semibold text-[var(--chalk-dim)] uppercase tracking-wider">Half Diamond Shape</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="flex flex-col items-start p-6 bg-[var(--board-raised)] border border-[var(--line)] rounded-xl space-y-1.5 min-h-[220px]">
          {step.grid.map((row, rIdx) => (
            <div key={rIdx} className="flex space-x-2">
              {row.map((cell, cIdx) => (
                <span
                  key={cIdx}
                  className={`w-7 h-7 rounded flex items-center justify-center font-mono text-sm font-bold transition-all ${
                    rIdx + 1 === step.currentRow
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

        <div className="p-3.5 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] text-xs text-[var(--chalk-dim)] leading-relaxed">
          {step.explanation}
        </div>
      </div>
    </div>
  );
}

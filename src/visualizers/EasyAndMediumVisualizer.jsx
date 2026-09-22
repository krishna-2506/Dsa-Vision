import React from 'react';

export const meta = {
  title: 'Build-up Logical Thinking: Easy and Medium Patterns Strategy',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N^2) for nested loops',
  spaceComplexity: 'O(1) auxiliary',
  description: 'Breaks down the core 4-step framework to solve any easy-to-medium pattern problem: 1. Count rows for outer loop, 2. Identify column relations, 3. Handle spaces vs symbols, 4. Apply symmetry.'
};

export const solutions = {
  cpp: `// C++: Easy & Medium Patterns General Framework
#include <iostream>
using namespace std;

// Rule 1: Outer loop always counts the rows (0 to n-1 or 1 to n)
// Rule 2: Inner loop prints elements per row (stars / numbers / spaces)
// Rule 3: Formulate column count as a function of row index 'i'

void printTriangle(int n) {
    for (int i = 1; i <= n; i++) {
        // Inner loop: print 'i' stars for row 'i'
        for (int j = 1; j <= i; j++) {
            cout << "* ";
        }
        cout << "\\n";
    }
}

int main() {
    printTriangle(4);
    return 0;
}`,
  java: `// Java: Pattern Thinking Framework
public class Solution {
    public static void printTriangle(int n) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
  python: `# Python: Pattern Thinking Framework
def print_triangle(n: int):
    for i in range(1, n + 1):
        print("* " * i)`,
  javascript: `// JavaScript: Pattern Thinking Framework
function printTriangle(n) {
    for (let i = 1; i <= n; i++) {
        console.log("* ".repeat(i));
    }
}`
};

export const steps = [
  {
    title: 'Rule 1: Outer Loop Governs Rows',
    phase: 'RULE_1',
    codeLine: 10,
    activeRule: 'Count total rows -> outer loop runs N times',
    gridRows: [
      ['Row 1 (i=1)', '*'],
      ['Row 2 (i=2)', '* *'],
      ['Row 3 (i=3)', '* * *'],
      ['Row 4 (i=4)', '* * * *']
    ],
    explanation: 'Step 1 of pattern solving: Count the number of horizontal lines. If there are N rows, write `for (int i = 0; i < n; i++)`.'
  },
  {
    title: 'Rule 2: Formulate Inner Loop Columns as f(i)',
    phase: 'RULE_2',
    codeLine: 12,
    activeRule: 'Determine column count as a function of row i',
    gridRows: [
      ['Row 1', 'j runs 1..1 times (col = 1)'],
      ['Row 2', 'j runs 1..2 times (col = 2)'],
      ['Row 3', 'j runs 1..3 times (col = 3)'],
      ['Row 4', 'j runs 1..4 times (col = 4)']
    ],
    explanation: 'Step 2: Connect columns to rows. Here, row i has exactly i columns. So inner loop runs `for (int j = 1; j <= i; j++)`.'
  },
  {
    title: 'Rule 3: Print What is Inside & Endline',
    phase: 'RULE_3',
    codeLine: 15,
    activeRule: 'Output symbol and print newline after inner loop finishes',
    gridRows: [
      ['Output', '*'],
      ['Output', '* *'],
      ['Output', '* * *'],
      ['Output', '* * * *']
    ],
    explanation: 'Step 3: Print the contents (numbers, stars, letters). After inner loop ends, print `\\n` to advance to next row.'
  }
];

export default function EasyAndMediumVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Core Rule 1: <strong className="text-cyan-200">Outer loop = Rows</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Core Rule 2: <strong className="text-emerald-200">Inner loop = Columns f(i)</strong>
        </div>
      </div>

      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
          <span className="text-xs font-semibold text-[var(--chalk-dim)] uppercase tracking-wider">Pattern Derivation Engine</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] text-xs font-mono text-indigo-300">
          Strategy: <span className="text-[var(--chalk)]">{step.activeRule}</span>
        </div>

        <div className="space-y-2">
          {step.gridRows.map(([label, content], idx) => (
            <div key={idx} className="flex justify-between items-center p-2.5 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] text-xs font-mono">
              <span className="text-[var(--chalk-dim)]">{label}</span>
              <span className="text-emerald-400 font-bold tracking-widest">{content}</span>
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

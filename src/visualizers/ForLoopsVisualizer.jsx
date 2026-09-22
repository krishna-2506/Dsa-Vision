import React from 'react';

export const meta = {
  title: 'For Loops (Iteration Mechanics)',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Visualizes the three-part for loop lifecycle: initialization (i = 0), condition evaluation (i < n), loop body execution, and step increment (i++).'
};

export const solutions = {
  cpp: `// C++: For Loop Iteration
#include <iostream>
using namespace std;

int main() {
    int n = 4;
    int sum = 0;
    
    for (int i = 1; i <= n; i++) {
        sum += i;
        cout << "i=" << i << ", sum=" << sum << endl;
    }
    return 0;
}`,
  java: `// Java: For Loop
public class Solution {
    public static void main(String[] args) {
        int n = 4;
        int sum = 0;
        for (int i = 1; i <= n; i++) {
            sum += i;
        }
    }
}`,
  python: `# Python: For Loop via range()
def main():
    n = 4
    total = 0
    for i in range(1, n + 1):
        total += i

if __name__ == "__main__":
    main()`,
  javascript: `// JavaScript: For Loop
let n = 4;
let sum = 0;
for (let i = 1; i <= n; i++) {
    sum += i;
}`
};

export const steps = [
  {
    title: '1. Initialization: i = 1, sum = 0',
    phase: 'INIT',
    codeLine: 9,
    iVal: 1,
    sumVal: 0,
    conditionResult: '1 <= 4 (True)',
    action: 'Initialize loop counter',
    explanation: 'Loop counter i is created and initialized to 1. Condition (1 <= 4) is evaluated: True.'
  },
  {
    title: '2. Iteration 1: sum = sum + 1 = 1',
    phase: 'BODY_1',
    codeLine: 10,
    iVal: 1,
    sumVal: 1,
    conditionResult: '1 <= 4 (True)',
    action: 'sum += 1, then i increments to 2',
    explanation: 'Body executes: sum accumulates 1. End of iteration increments i to 2.'
  },
  {
    title: '3. Iteration 2: sum = sum + 2 = 3',
    phase: 'BODY_2',
    codeLine: 10,
    iVal: 2,
    sumVal: 3,
    conditionResult: '2 <= 4 (True)',
    action: 'sum += 2, then i increments to 3',
    explanation: 'Check 2 <= 4: True. sum becomes 3. Counter increments to 3.'
  },
  {
    title: '4. Iteration 3 & 4: Accumulate up to sum = 10',
    phase: 'BODY_3_4',
    codeLine: 10,
    iVal: 4,
    sumVal: 10,
    conditionResult: '4 <= 4 (True)',
    action: 'sum += 4, then i increments to 5',
    explanation: 'At i = 4, sum becomes 10. Next increment sets i = 5.'
  },
  {
    title: '5. Loop Termination: i = 5 fails (5 <= 4 -> False)',
    phase: 'TERMINATE',
    codeLine: 9,
    iVal: 5,
    sumVal: 10,
    conditionResult: '5 <= 4 (False -> EXIT)',
    action: 'Break out of loop',
    explanation: 'Condition 5 <= 4 fails! Control exits the for loop. Final sum = 10.'
  }
];

export default function ForLoopsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  const loopStages = [
    { label: 'Init (i = 1)', active: step.phase === 'INIT' },
    { label: 'Condition Check', active: true },
    { label: 'Body (sum += i)', active: step.phase.startsWith('BODY') },
    { label: 'Increment (i++)', active: step.phase.startsWith('BODY') },
    { label: 'Exit', active: step.phase === 'TERMINATE' }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Counter i: <strong className="text-cyan-200">{step.iVal}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Accumulator sum: <strong className="text-emerald-200">{step.sumVal}</strong>
        </div>
      </div>

      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
          <span className="text-xs font-semibold text-[var(--chalk-dim)] uppercase tracking-wider">Loop Control Cycle</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] space-y-1">
            <span className="text-[var(--chalk-dim)] text-[10px] uppercase">Condition Check:</span>
            <div className={`font-bold ${step.phase === 'TERMINATE' ? 'text-rose-400' : 'text-emerald-400'}`}>
              {step.conditionResult}
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] space-y-1">
            <span className="text-[var(--chalk-dim)] text-[10px] uppercase">Active Operation:</span>
            <div className="text-indigo-300 font-semibold truncate">
              {step.action}
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] text-xs text-[var(--chalk-dim)] leading-relaxed">
          {step.explanation}
        </div>
      </div>
    </div>
  );
}

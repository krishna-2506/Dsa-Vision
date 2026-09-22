import React from 'react';

export const meta = {
  title: 'While and Do-While Loops',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Compares entry-controlled while loops against exit-controlled do-while loops, highlighting the guarantee that do-while loops execute at least once.'
};

export const solutions = {
  cpp: `// C++: While vs Do-While
#include <iostream>
using namespace std;

int main() {
    int count = 3;
    // Entry-controlled while loop
    while (count > 0) {
        cout << "while: " << count << endl;
        count--;
    }

    // Exit-controlled do-while loop (runs >= 1 time)
    int i = 0;
    do {
        cout << "do-while runs at least once: " << i << endl;
        i++;
    } while (i < 0); // Condition is false, but body executed!

    return 0;
}`,
  java: `// Java: While and Do-While
public class Solution {
    public static void main(String[] args) {
        int count = 3;
        while (count > 0) {
            count--;
        }

        int i = 0;
        do {
            i++;
        } while (i < 0);
    }
}`,
  python: `# Python: while loop (Python has no native do-while)
def main():
    count = 3
    while count > 0:
        count -= 1

    # Emulating do-while in Python
    i = 0
    while True:
        i += 1
        if not (i < 0):
            break

if __name__ == "__main__":
    main()`,
  javascript: `// JavaScript: while and do-while
let count = 3;
while (count > 0) {
    count--;
}

let i = 0;
do {
    i++;
} while (i < 0);`
};

export const steps = [
  {
    title: '1. While Loop: Test count > 0 (3 > 0 -> True)',
    phase: 'WHILE_ENTRY',
    codeLine: 9,
    countVal: 3,
    doWhileVal: 0,
    checkType: 'Entry-Check (Pre-test)',
    explanation: 'In a while loop, the condition (count > 0) is tested before entering the body.'
  },
  {
    title: '2. While Loop Decrement: count = 2 & 1',
    phase: 'WHILE_RUN',
    codeLine: 11,
    countVal: 1,
    doWhileVal: 0,
    checkType: 'Body Execution',
    explanation: 'The loop decrements count across iterations until count becomes 0.'
  },
  {
    title: '3. While Loop Exits: count = 0 (0 > 0 -> False)',
    phase: 'WHILE_EXIT',
    codeLine: 9,
    countVal: 0,
    doWhileVal: 0,
    checkType: 'Exit While',
    explanation: '0 > 0 evaluates to false. Loop terminates cleanly.'
  },
  {
    title: '4. Do-While: Body executes BEFORE testing condition',
    phase: 'DO_WHILE_RUN',
    codeLine: 17,
    countVal: 0,
    doWhileVal: 1,
    checkType: 'Exit-Check (Post-test)',
    explanation: 'do-while executes the body first (i increments to 1). Then condition (1 < 0) is tested: False! Still ran once.'
  }
];

export default function WhileLoopsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          while: <strong className="text-cyan-200">Entry-Controlled (0..N times)</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          do-while: <strong className="text-purple-200">Exit-Controlled (At least 1 time)</strong>
        </div>
      </div>

      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
          <span className="text-xs font-semibold text-[var(--chalk-dim)] uppercase tracking-wider">Loop State Comparison</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] space-y-2">
            <div className="text-[10px] text-cyan-400 uppercase tracking-wider font-bold">while (count {'>'} 0)</div>
            <div className="text-[var(--chalk-dim)]">Current count: <span className="text-emerald-400 font-bold">{step.countVal}</span></div>
            <div className="text-[10px] text-[var(--chalk-dim)]">Pre-test condition before body</div>
          </div>

          <div className="p-3.5 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] space-y-2">
            <div className="text-[10px] text-purple-400 uppercase tracking-wider font-bold">do {'{ ... }'} while (i {'<'} 0)</div>
            <div className="text-[var(--chalk-dim)]">Current i: <span className="text-purple-300 font-bold">{step.doWhileVal}</span></div>
            <div className="text-[10px] text-[var(--chalk-dim)]">Post-test condition after body</div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] text-xs text-[var(--chalk-dim)] leading-relaxed">
          {step.explanation}
        </div>
      </div>
    </div>
  );
}

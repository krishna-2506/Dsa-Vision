import React from 'react';

export const meta = {
  title: 'If-Else & If-Elseif Ladder',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(1)',
  spaceComplexity: 'O(1)',
  description: 'Visualizes conditional branching through an if-else if-else ladder, illustrating condition evaluation order and early branch termination.'
};

export const solutions = {
  cpp: `// C++: If ElseIf Ladder
#include <iostream>
using namespace std;

string calculateGrade(int marks) {
    if (marks < 25) {
        return "F";
    } else if (marks <= 44) {
        return "E";
    } else if (marks <= 49) {
        return "D";
    } else if (marks <= 59) {
        return "C";
    } else if (marks <= 79) {
        return "B";
    } else {
        return "A";
    }
}

int main() {
    int score = 54;
    cout << "Grade: " << calculateGrade(score) << endl;
    return 0;
}`,
  java: `// Java: If ElseIf Ladder
public class Solution {
    public static String calculateGrade(int marks) {
        if (marks < 25) {
            return "F";
        } else if (marks <= 44) {
            return "E";
        } else if (marks <= 49) {
            return "D";
        } else if (marks <= 59) {
            return "C";
        } else if (marks <= 79) {
            return "B";
        } else {
            return "A";
        }
    }
}`,
  python: `# Python: if-elif-else Ladder
def calculate_grade(marks: int) -> str:
    if marks < 25:
        return "F"
    elif marks <= 44:
        return "E"
    elif marks <= 49:
        return "D"
    elif marks <= 59:
        return "C"
    elif marks <= 79:
        return "B"
    else:
        return "A"`,
  javascript: `// JavaScript: if-else if ladder
function calculateGrade(marks) {
    if (marks < 25) return "F";
    else if (marks <= 44) return "E";
    else if (marks <= 49) return "D";
    else if (marks <= 59) return "C";
    else if (marks <= 79) return "B";
    else return "A";
}`
};

export const steps = [
  {
    title: '1. Input Evaluation: marks = 54',
    phase: 'CHECK_1',
    codeLine: 6,
    marks: 54,
    evaluatedBranch: 'marks < 25',
    result: false,
    selectedGrade: null,
    explanation: 'Evaluating condition 1: 54 < 25 -> False. Execution skips into the first else-if.'
  },
  {
    title: '2. Check: marks <= 44',
    phase: 'CHECK_2',
    codeLine: 8,
    marks: 54,
    evaluatedBranch: 'marks <= 44',
    result: false,
    selectedGrade: null,
    explanation: 'Evaluating condition 2: 54 <= 44 -> False. Proceeds down the ladder.'
  },
  {
    title: '3. Check: marks <= 49',
    phase: 'CHECK_3',
    codeLine: 10,
    marks: 54,
    evaluatedBranch: 'marks <= 49',
    result: false,
    selectedGrade: null,
    explanation: 'Evaluating condition 3: 54 <= 49 -> False. Continues to the next branch.'
  },
  {
    title: '4. Check: marks <= 59 -> True Match!',
    phase: 'MATCH',
    codeLine: 12,
    marks: 54,
    evaluatedBranch: 'marks <= 59',
    result: true,
    selectedGrade: 'Grade C',
    explanation: 'Evaluating condition 4: 54 <= 59 -> True! The body executes: returns "C". Subsequent branches are completely bypassed.'
  }
];

export default function IfElseifVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  const branches = [
    { label: 'marks < 25', grade: 'F', key: 'CHECK_1' },
    { label: 'marks <= 44', grade: 'E', key: 'CHECK_2' },
    { label: 'marks <= 49', grade: 'D', key: 'CHECK_3' },
    { label: 'marks <= 59', grade: 'C', key: 'MATCH' },
    { label: 'marks <= 79', grade: 'B', key: 'LATER' },
    { label: 'else', grade: 'A', key: 'ELSE' }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Target Value: <strong className="text-cyan-200">marks = {step.marks}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
          Selected: <strong className="text-indigo-200">{step.selectedGrade || 'In Progress'}</strong>
        </div>
      </div>

      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#272b3c] pb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Condition Ladder Flow</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="space-y-2">
          {branches.map((b, idx) => {
            const isCurrent = step.phase === b.key;
            const isMatched = step.phase === 'MATCH' && b.key === 'MATCH';
            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono transition-all ${
                  isMatched
                    ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 scale-[1.02]'
                    : isCurrent
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                    : 'bg-[#12131b] border-[#272b3c] text-slate-400 opacity-70'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-slate-500">[{idx + 1}]</span>
                  <span>{b.label}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="px-2 py-0.5 rounded bg-black/40 border border-white/5 text-[11px]">
                    &rarr; {b.grade}
                  </span>
                  {isMatched && <span className="text-emerald-400 font-bold">MATCHED!</span>}
                  {isCurrent && !isMatched && <span className="text-amber-400">CHECKING...</span>}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3.5 rounded-xl bg-[#12131b] border border-[#272b3c] text-xs text-slate-300 leading-relaxed">
          {step.explanation}
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Switch Case Statement',
  category: 'Step 1: Learn the basics',
  difficulty: 'Easy',
  timeComplexity: 'O(1) via jump table',
  spaceComplexity: 'O(1)',
  description: 'Visualizes multi-way branching with switch-case statements, demonstrating constant-time jump table routing, the role of break, and default fallback.'
};

export const solutions = {
  cpp: `// C++: Switch Case
#include <iostream>
using namespace std;

string getDayName(int day) {
    switch (day) {
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
        case 7: return "Sunday";
        default: return "Invalid Day";
    }
}

int main() {
    int day = 4;
    cout << "Day " << day << " is " << getDayName(day) << endl;
    return 0;
}`,
  java: `// Java: Switch Case
public class Solution {
    public static String getDayName(int day) {
        switch (day) {
            case 1: return "Monday";
            case 2: return "Tuesday";
            case 3: return "Wednesday";
            case 4: return "Thursday";
            case 5: return "Friday";
            case 6: return "Saturday";
            case 7: return "Sunday";
            default: return "Invalid Day";
        }
    }
}`,
  python: `# Python: match-case (Python 3.10+) or dict lookup
def get_day_name(day: int) -> str:
    match day:
        case 1: return "Monday"
        case 2: return "Tuesday"
        case 3: return "Wednesday"
        case 4: return "Thursday"
        case 5: return "Friday"
        case 6: return "Saturday"
        case 7: return "Sunday"
        case _: return "Invalid Day"`,
  javascript: `// JavaScript: switch-case
function getDayName(day) {
    switch (day) {
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
        case 7: return "Sunday";
        default: return "Invalid Day";
    }
}`
};

export const steps = [
  {
    title: '1. Expression Evaluation: day = 4',
    phase: 'EVAL',
    codeLine: 7,
    dayVal: 4,
    activeCase: null,
    status: 'JUMP_TABLE_LOOKUP',
    explanation: 'The switch expression evaluates day = 4. The compiler computes a direct jump table index.'
  },
  {
    title: '2. Jump to case 4',
    phase: 'JUMP',
    codeLine: 11,
    dayVal: 4,
    activeCase: 4,
    status: 'ROUTED',
    explanation: 'Execution jumps directly to case 4 without iteratively checking cases 1, 2, or 3!'
  },
  {
    title: '3. Execute Case 4 & Return',
    phase: 'EXECUTE',
    codeLine: 11,
    dayVal: 4,
    activeCase: 4,
    status: 'RETURN_VALUE',
    explanation: 'Case 4 returns "Thursday". The break / return prevents fallthrough into case 5.'
  }
];

export default function SwitchCaseVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  const days = [
    { num: 1, name: 'Monday' },
    { num: 2, name: 'Tuesday' },
    { num: 3, name: 'Wednesday' },
    { num: 4, name: 'Thursday' },
    { num: 5, name: 'Friday' },
    { num: 6, name: 'Saturday' },
    { num: 7, name: 'Sunday' }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Switch Arg: <strong className="text-purple-200">day = {step.dayVal}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Dispatch: <strong className="text-cyan-200">O(1) Direct Branch</strong>
        </div>
      </div>

      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-[#272b3c] pb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Case Dispatcher</span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {step.phase}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {days.map(d => {
            const isMatch = step.activeCase === d.num;
            return (
              <div
                key={d.num}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                  isMatch
                    ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 scale-105 shadow-lg shadow-emerald-500/10'
                    : 'bg-[#12131b] border-[#272b3c] text-slate-400 opacity-60'
                }`}
              >
                <span className="text-[10px] font-mono text-slate-400">case {d.num}:</span>
                <span className="text-xs font-bold font-mono mt-1 text-slate-200">{d.name}</span>
                {isMatch && (
                  <span className="text-[9px] font-mono mt-1 text-emerald-400 font-semibold px-1.5 py-0.5 rounded bg-emerald-500/20">
                    MATCHED
                  </span>
                )}
              </div>
            );
          })}
          <div className="p-3 rounded-xl border bg-[#12131b] border-[#272b3c] text-slate-500 flex flex-col items-center justify-center text-center opacity-40">
            <span className="text-[10px] font-mono">default:</span>
            <span className="text-xs font-mono mt-1">Invalid</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#12131b] border border-[#272b3c] text-xs text-slate-300 leading-relaxed">
          {step.explanation}
        </div>
      </div>
    </div>
  );
}

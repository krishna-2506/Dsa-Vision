import React from 'react';

export const meta = {
  title: 'Rotate String',
  category: 'Strings & Pattern Search',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Determines if string S can become string GOAL after some number of cyclic character shifts using the doubled string concatenation property (S + S).'
};

export const solutions = {
  cpp: `// C++ Rotate String
// Time Complexity: O(N) | Space Complexity: O(N)
#include <string>
using namespace std;

class Solution {
public:
    bool rotateString(string s, string goal) {
        if (s.length() != goal.length()) {
            return false;
        }
        string doubled = s + s;
        return doubled.find(goal) != string::npos;
    }
};`,
  python: `# Python 3 Rotate String
class Solution:
    def rotateString(self, s: str, goal: str) -> bool:
        if len(s) != len(goal):
            return False
        return goal in (s + s)`,
  java: `// Java Rotate String
class Solution {
    public boolean rotateString(String s, String goal) {
        if (s.length() != goal.length()) {
            return false;
        }
        return (s + s).contains(goal);
    }
}`,
  javascript: `// JavaScript Rotate String
var rotateString = function(s, goal) {
    if (s.length !== goal.length) {
        return false;
    }
    return (s + s).includes(goal);
};`
};

export const steps = [
  {
    title: '1. Input Strings: s = "abcde", goal = "cdeab"',
    phase: 'INITIAL',
    codeLine: 10,
    s: 'abcde',
    goal: 'cdeab',
    doubled: 'abcdeabcde',
    matchIdx: -1,
    isMatch: false,
    variables: { s: '"abcde"', goal: '"cdeab"', lenS: 5, lenGoal: 5 },
    explain: 'Check if cyclic rotations of S can produce GOAL. All possible rotations of S exist contiguously inside S + S.',
    intuition: 'Doubling the string captures all 360-degree cyclic shifts.'
  },
  {
    title: '2. Check lengths: len(s) == len(goal) == 5 -> Valid lengths',
    phase: 'LENGTH_CHECK',
    codeLine: 11,
    s: 'abcde',
    goal: 'cdeab',
    doubled: 'abcdeabcde',
    matchIdx: -1,
    isMatch: false,
    variables: { 'len(s)': 5, 'len(goal)': 5, lengthsMatch: true },
    explain: 'Rotations preserve string length. Since both have length 5, proceed to check doubled string.',
    intuition: 'Basic necessary condition.'
  },
  {
    title: '3. Form Doubled String: doubled = s + s = "abcdeabcde"',
    phase: 'DOUBLE_STRING',
    codeLine: 14,
    s: 'abcde',
    goal: 'cdeab',
    doubled: 'abcdeabcde',
    matchIdx: -1,
    isMatch: false,
    variables: { doubled: '"abcdeabcde"' },
    explain: 'Every cyclic rotation of "abcde" of length 5 (such as "bcdea", "cdeab", "deabc", "eabcd") appears in "abcdeabcde".',
    intuition: 'Substrings of length N in S+S equal all possible shifts.'
  },
  {
    title: '4. Search GOAL in doubled: "cdeab" found starting at index 2!',
    phase: 'FOUND_MATCH',
    codeLine: 15,
    s: 'abcde',
    goal: 'cdeab',
    doubled: 'abcdeabcde',
    matchIdx: 2,
    isMatch: true,
    variables: { matchIndex: 2, substring: 'doubled[2..6] = "cdeab"', isMatch: true },
    explain: 'At index 2 of "abcdeabcde", the substring is "cdeab", which matches GOAL exactly! S shifted by 2 positions yields GOAL.',
    intuition: 'Match confirmed.'
  },
  {
    title: '5. Completed: Return True',
    phase: 'COMPLETED',
    codeLine: 15,
    s: 'abcde',
    goal: 'cdeab',
    doubled: 'abcdeabcde',
    matchIdx: 2,
    isMatch: true,
    variables: { result: 'true', timeComplexity: 'O(N)', spaceComplexity: 'O(N)' },
    explain: 'String S can indeed be rotated into GOAL. Result is true.',
    intuition: 'Completed via concatenation trick.'
  }
];

export default function RotateStringVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Goal = "{step.goal}"
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Can Rotate = {step.isMatch ? 'TRUE' : 'FALSE'}
        </span>
      </div>

      {/* S + S Visualization */}
      <div className="w-full flex flex-col items-center gap-2">
        <span className="text-[11px] font-mono text-[#8a8ea3]">Doubled String (S + S):</span>
        <div className="flex items-center gap-1 py-2 overflow-x-auto">
          {step.doubled.split('').map((ch, idx) => {
            const isMatchChar = step.matchIdx !== -1 && idx >= step.matchIdx && idx < step.matchIdx + step.goal.length;

            let borderClass = 'border-[#272b3c] bg-[#12131b] text-slate-300';
            if (isMatchChar) {
              borderClass = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold ring-2 ring-emerald-500/30';
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1 min-w-[34px]">
                <div className={`w-8 h-10 rounded-xl border flex items-center justify-center font-mono text-sm transition-all ${borderClass}`}>
                  {ch}
                </div>
                <span className="text-[8px] font-mono text-[#5b6076]">{idx}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Match banner */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-3 flex items-center justify-between text-xs font-mono">
        <span className="text-[#8a8ea3]">Substring Check: <strong className="text-indigo-300">(S + S).contains(goal)</strong></span>
        <span className={step.isMatch ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
          {step.isMatch ? `✓ Matched at index ${step.matchIdx}` : 'Scanning...'}
        </span>
      </div>
    </div>
  );
}

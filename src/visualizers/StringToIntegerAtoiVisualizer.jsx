import React from 'react';

export const meta = {
  title: 'String to Integer (atoi)',
  category: 'Strings',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Converts a string to a 32-bit signed integer following the atoi specification: ignores leading whitespace, parses optional sign, converts digits, and clamps within [INT_MIN, INT_MAX].'
};

export const solutions = {
  cpp: `// C++ String to Integer (atoi)
// Time: O(N) | Space: O(1)
#include <string>
#include <climits>
using namespace std;

class Solution {
public:
    int myAtoi(string s) {
        int i = 0, n = s.size();
        while (i < n && s[i] == ' ') i++; // 1. Skip whitespace

        int sign = 1;
        if (i < n && (s[i] == '+' || s[i] == '-')) {
            sign = (s[i] == '-') ? -1 : 1; // 2. Sign
            i++;
        }

        long long ans = 0;
        while (i < n && isdigit(s[i])) { // 3. Digits
            ans = ans * 10 + (s[i] - '0');
            if (sign * ans <= INT_MIN) return INT_MIN; // 4. Overflow
            if (sign * ans >= INT_MAX) return INT_MAX;
            i++;
        }

        return sign * ans;
    }
};`,
  python: `# Python 3 String to Integer (atoi)
# Time: O(N) | Space: O(1)
class Solution:
    def myAtoi(self, s: str) -> int:
        s = s.lstrip()
        if not s:
            return 0

        sign = 1
        i = 0
        if s[0] in ['+', '-']:
            sign = -1 if s[0] == '-' else 1
            i += 1

        ans = 0
        INT_MIN, INT_MAX = -2**31, 2**31 - 1

        while i < len(s) and s[i].isdigit():
            ans = ans * 10 + int(s[i])
            if sign * ans <= INT_MIN:
                return INT_MIN
            if sign * ans >= INT_MAX:
                return INT_MAX
            i += 1

        return sign * ans`,
  java: `// Java String to Integer (atoi)
// Time: O(N) | Space: O(1)
class Solution {
    public int myAtoi(String s) {
        int i = 0, n = s.length();
        while (i < n && s.charAt(i) == ' ') i++;

        int sign = 1;
        if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
            sign = (s.charAt(i) == '-') ? -1 : 1;
            i++;
        }

        long ans = 0;
        while (i < n && Character.isDigit(s.charAt(i))) {
            ans = ans * 10 + (s.charAt(i) - '0');
            if (sign * ans <= Integer.MIN_VALUE) return Integer.MIN_VALUE;
            if (sign * ans >= Integer.MAX_VALUE) return Integer.MAX_VALUE;
            i++;
        }

        return (int)(sign * ans);
    }
}`,
  javascript: `// JavaScript String to Integer (atoi)
// Time: O(N) | Space: O(1)
var myAtoi = function(s) {
    let i = 0, n = s.length;
    while (i < n && s[i] === ' ') i++;

    let sign = 1;
    if (i < n && (s[i] === '+' || s[i] === '-')) {
        sign = s[i] === '-' ? -1 : 1;
        i++;
    }

    let ans = 0;
    const INT_MIN = -2147483648;
    const INT_MAX = 2147483647;

    while (i < n && s[i] >= '0' && s[i] <= '9') {
        ans = ans * 10 + (s.charCodeAt(i) - 48);
        if (sign * ans <= INT_MIN) return INT_MIN;
        if (sign * ans >= INT_MAX) return INT_MAX;
        i++;
    }

    return sign * ans;
};`
};

export const steps = [
  {
    title: '1. Input: "   -042 with words"',
    phase: 'INIT',
    codeLine: 11,
    s: '   -042 with words',
    pointerI: 0,
    sign: 1,
    currentVal: 0,
    variables: { s: '"   -042 with words"', step: 'Start at index 0' },
    explain: 'The string contains leading spaces, an optional negative sign, numbers, and trailing non-digit characters.',
    intuition: 'atoi parses cleanly from left to right, stopping at the first invalid character.'
  },
  {
    title: '2. Skip Leading Whitespaces -> Pointer moves to 3',
    phase: 'SKIP_WHITESPACE',
    codeLine: 12,
    s: '   -042 with words',
    pointerI: 3,
    sign: 1,
    currentVal: 0,
    variables: { 'Skipped spaces': 3, currentPosition: 'Char is "-"' },
    explain: 'Leading spaces are skipped. Next character is "-".',
    intuition: 'Only leading spaces are ignored; spaces inside or after digits terminate conversion.'
  },
  {
    title: '3. Read Sign: "-" -> sign = -1, advance to index 4',
    phase: 'SIGN',
    codeLine: 16,
    s: '   -042 with words',
    pointerI: 4,
    sign: -1,
    currentVal: 0,
    variables: { sign: -1, 'Next char': '"0"' },
    explain: 'Sign "-" detected, recording multiplier sign = -1. Pointer advances to first digit "0".',
    intuition: 'Only one sign character (+ or -) is accepted.'
  },
  {
    title: '4. Accumulate Digits: "042" -> Stop at space, Return -42',
    phase: 'COMPLETED',
    codeLine: 25,
    s: '   -042 with words',
    pointerI: 7,
    sign: -1,
    currentVal: -42,
    variables: { digitsParsed: '"042"', stoppedAt: '" " (space)', finalNumber: -42 },
    explain: 'Digiting parsing: 0 -> 4 -> 42. Space at index 7 halts parsing. Returning sign * 42 = -42.',
    intuition: 'Clamping checks ensure results stay within [-2147483648, 2147483647].'
  }
];

export default function StringToIntegerAtoiVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Sign: {step.sign === -1 ? 'Negative (-)' : 'Positive (+)'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Parsed Value: {step.currentVal}
        </span>
      </div>

      {/* String Stream */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider">
          Character Stream &amp; Parser Head
        </span>

        <div className="flex flex-wrap items-center justify-center gap-1.5 py-2 font-mono">
          {step.s.split('').map((ch, idx) => {
            const isPointer = idx === step.pointerI;
            const isParsed = idx < step.pointerI && idx >= 3;

            return (
              <div
                key={idx}
                className={`w-9 h-14 rounded-lg border flex flex-col items-center justify-center transition-all duration-300 ${
                  isPointer
                    ? 'border-cyan-400 bg-cyan-500/25 text-cyan-300 ring-2 ring-cyan-500/50 scale-105'
                    : isParsed
                    ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300'
                    : 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-faint)]'
                }`}
              >
                <span className="text-[8px] text-[var(--chalk-dim)]">[{idx}]</span>
                <span className="text-sm font-bold text-amber-300 mt-0.5">
                  {ch === ' ' ? '␣' : ch}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 text-xs font-mono text-center text-[var(--chalk-dim)]">
        {step.explain}
      </div>
    </div>
  );
}

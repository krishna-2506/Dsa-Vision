import React from 'react';

export const meta = {
  title: 'Recursive Implementation of atoi()',
  category: 'Recursion',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) recursion stack',
  description: 'Converts a string representation of an integer to a 32-bit signed integer using tail recursion, handling whitespace trimming, optional signs, non-digit boundaries, and numeric overflow clamping.'
};

export const solutions = {
  cpp: `// C++ Recursive atoi() Implementation
// Time Complexity: O(N) | Space Complexity: O(N) stack
#include <string>
#include <climits>
using namespace std;

class Solution {
    long long helper(const string& s, int i, long long val, int sign) {
        if (i >= s.length() || !isdigit(s[i])) {
            return sign * val;
        }

        int digit = s[i] - '0';
        val = val * 10 + digit;

        // 32-bit integer clamping
        if (sign == 1 && val >= INT_MAX) return INT_MAX;
        if (sign == -1 && -val <= INT_MIN) return INT_MIN;

        return helper(s, i + 1, val, sign);
    }

public:
    int myAtoi(string s) {
        int i = 0, n = s.length();
        while (i < n && s[i] == ' ') i++; // 1. Skip spaces

        if (i >= n) return 0;

        int sign = 1;
        if (s[i] == '-' || s[i] == '+') { // 2. Parse sign
            if (s[i] == '-') sign = -1;
            i++;
        }

        return helper(s, i, 0, sign);
    }
};`,
  python: `# Python 3 Recursive atoi() Implementation
class Solution:
    def myAtoi(self, s: str) -> int:
        INT_MAX = 2**31 - 1
        INT_MIN = -2**31

        i = 0
        n = len(s)
        while i < n and s[i] == ' ':
            i += 1

        if i >= n:
            return 0

        sign = 1
        if s[i] in ['-', '+']:
            if s[i] == '-':
                sign = -1
            i += 1

        def helper(idx, val):
            if idx >= n or not s[idx].isdigit():
                return sign * val

            digit = int(s[idx])
            new_val = val * 10 + digit

            if sign == 1 and new_val >= INT_MAX:
                return INT_MAX
            if sign == -1 and -new_val <= INT_MIN:
                return INT_MIN

            return helper(idx + 1, new_val)

        return helper(i, 0)`,
  java: `// Java Recursive atoi() Implementation
class Solution {
    private long helper(String s, int i, long val, int sign) {
        if (i >= s.length() || !Character.isDigit(s.charAt(i))) {
            return sign * val;
        }

        int digit = s.charAt(i) - '0';
        val = val * 10 + digit;

        if (sign == 1 && val >= Integer.MAX_VALUE) return Integer.MAX_VALUE;
        if (sign == -1 && -val <= Integer.MIN_VALUE) return Integer.MIN_VALUE;

        return helper(s, i + 1, val, sign);
    }

    public int myAtoi(String s) {
        int i = 0, n = s.length();
        while (i < n && s.charAt(i) == ' ') i++;

        if (i >= n) return 0;

        int sign = 1;
        if (s.charAt(i) == '-' || s.charAt(i) == '+') {
            if (s.charAt(i) == '-') sign = -1;
            i++;
        }

        return (int) helper(s, i, 0, sign);
    }
}`,
  javascript: `// JavaScript Recursive atoi() Implementation
var myAtoi = function(s) {
    const INT_MAX = 2147483647;
    const INT_MIN = -2147483648;

    let i = 0, n = s.length;
    while (i < n && s[i] === ' ') i++;

    if (i >= n) return 0;

    let sign = 1;
    if (s[i] === '-' || s[i] === '+') {
        if (s[i] === '-') sign = -1;
        i++;
    }

    const helper = (idx, val) => {
        if (idx >= n || s[idx] < '0' || s[idx] > '9') {
            return sign * val;
        }

        const digit = s.charCodeAt(idx) - 48;
        val = val * 10 + digit;

        if (sign === 1 && val >= INT_MAX) return INT_MAX;
        if (sign === -1 && -val <= INT_MIN) return INT_MIN;

        return helper(idx + 1, val);
    };

    return helper(i, 0);
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Input String "  -42words"',
    phase: 'INITIAL',
    codeLine: 28,
    s: '  -42words',
    idx: 0,
    val: 0,
    sign: 1,
    char: ' ',
    variables: { input: '"  -42words"', action: 'Trim leading whitespaces' },
    explain: 'atoi() sequentially skips whitespaces, consumes an optional sign, and recurses through contiguous digits.',
    intuition: 'Non-digit characters terminate conversion.'
  },
  {
    title: '2. Consume Whitespace & Sign: sign = -1, start at index 3 (\'4\')',
    phase: 'SIGN_PARSED',
    codeLine: 34,
    s: '  -42words',
    idx: 3,
    val: 0,
    sign: -1,
    char: '4',
    variables: { leadingSpacesSkipped: 2, sign: -1, firstDigitIndex: 3 },
    explain: 'Indices 0 and 1 were spaces. Index 2 was \'-\' (sign set to -1). We launch the recursive helper at index 3.',
    intuition: 'State initialized: sign is -1, current accumulator val = 0.'
  },
  {
    title: '3. Recurse at Index 3 (\'4\'): val = 0 * 10 + 4 = 4',
    phase: 'RECURSE_DIGIT',
    codeLine: 16,
    s: '  -42words',
    idx: 4,
    val: 4,
    sign: -1,
    char: '2',
    variables: { digit: 4, 'new val': '0 * 10 + 4 = 4', nextIndex: 4 },
    explain: 's[3] is \'4\'. Accumulate digit: val = 4. Tail recursive call helper(s, 4, 4, -1).',
    intuition: 'Multiply previous accumulator by 10 and add new digit.'
  },
  {
    title: '4. Recurse at Index 4 (\'2\'): val = 4 * 10 + 2 = 42',
    phase: 'RECURSE_DIGIT',
    codeLine: 16,
    s: '  -42words',
    idx: 5,
    val: 42,
    sign: -1,
    char: 'w',
    variables: { digit: 2, 'new val': '4 * 10 + 2 = 42', nextIndex: 5 },
    explain: 's[4] is \'2\'. Accumulate: val = 42. Tail recursive call helper(s, 5, 42, -1).',
    intuition: 'Accumulator reaches 42.'
  },
  {
    title: '5. Non-digit Encountered (\'w\'): Base Case Reached',
    phase: 'TERMINATE',
    codeLine: 10,
    s: '  -42words',
    idx: 5,
    val: 42,
    sign: -1,
    char: 'w',
    variables: { 's[5]': "'w' (non-digit)", returnExpression: 'sign * val = -1 * 42' },
    explain: 'Character \'w\' is not a digit (0-9). The base case fires, terminating recursion and returning sign * val = -42.',
    intuition: 'Digits sequence ended.'
  },
  {
    title: '6. Result: -42 Returned',
    phase: 'RESULT',
    codeLine: 38,
    s: '  -42words',
    idx: 5,
    val: 42,
    sign: -1,
    char: null,
    variables: { finalResult: -42, time: 'O(N)', space: 'O(N) stack' },
    explain: 'Successfully converted prefix "-42" into integer -42 using recursive parsing.',
    intuition: 'Clean functional recursion with guard clauses.'
  }
];

export default function RecursiveImplementationOfAtoiVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Input: "{step.s}"
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
          Sign = {step.sign === -1 ? '- (Negative)' : '+ (Positive)'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
          Accumulated Val = {step.val}
        </span>
      </div>

      {/* Visual String Character Strip */}
      <div className="w-full p-6 rounded-2xl bg-[#161824] border border-[#272b3c] flex items-center justify-center overflow-x-auto gap-2 py-8">
        {step.s.split('').map((ch, idx) => {
          const isCurrent = step.idx === idx;
          const isConsumed = idx < step.idx;
          const isDigit = ch >= '0' && ch <= '9';

          let style = 'border-[#272b3c] bg-[#12131b] text-white';
          if (isCurrent) {
            style = 'border-amber-400 bg-amber-500/25 text-amber-200 scale-105 shadow-md shadow-amber-500/20';
          } else if (isConsumed && isDigit) {
            style = 'border-emerald-500/40 bg-emerald-500/15 text-emerald-200';
          } else if (isConsumed) {
            style = 'border-[#1e2233] bg-[#0e1017] text-[#4a5068] opacity-50';
          }

          return (
            <div key={idx} className="relative flex flex-col items-center">
              {isCurrent && (
                <span className="absolute -top-7 text-[10px] font-mono text-amber-400 font-bold bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30">
                  idx={idx}
                </span>
              )}
              <div className={`w-12 h-14 rounded-xl border flex items-center justify-center font-mono font-bold text-base transition-all ${style}`}>
                {ch === ' ' ? '␣' : ch}
              </div>
              <span className="text-[10px] font-mono text-[#5b6076] mt-1">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Result Card */}
      {step.phase === 'RESULT' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 Output = {step.sign * step.val}</span>
        </div>
      )}
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Divide Two Integers without * or /',
  category: 'Bit Manipulation',
  difficulty: 'Medium',
  timeComplexity: 'O(log^2 N) = O(32)',
  spaceComplexity: 'O(1)',
  description: 'Computes integer division of dividend by divisor without using multiplication, division, or modulo operators by repeatedly subtracting shifted multiples of divisor (powers of 2).'
};

export const solutions = {
  cpp: `// C++ Bitwise Division using Powers of 2
// Time Complexity: O(log^2 N) | Space Complexity: O(1)
#include <climits>
#include <cmath>
using namespace std;

class Solution {
public:
    int divide(int dividend, int divisor) {
        if (dividend == divisor) return 1;
        if (dividend == INT_MIN && divisor == -1) return INT_MAX; // Overflow edge case

        bool sign = (dividend >= 0) == (divisor >= 0);

        long long n = abs((long long)dividend);
        long long d = abs((long long)divisor);
        long long ans = 0;

        while (n >= d) {
            int cnt = 0;
            while (n >= (d << (cnt + 1))) {
                cnt++;
            }
            ans += (1LL << cnt);
            n -= (d << cnt);
        }

        return sign ? ans : -ans;
    }
};`,
  python: `# Python 3 Bitwise Division using Powers of 2
class Solution:
    def divide(self, dividend: int, divisor: int) -> int:
        if dividend == divisor:
            return 1

        sign = (dividend >= 0) == (divisor >= 0)
        n, d = abs(dividend), abs(divisor)
        ans = 0

        while n >= d:
            cnt = 0
            while n >= (d << (cnt + 1)):
                cnt += 1
            ans += (1 << cnt)
            n -= (d << cnt)

        res = ans if sign else -ans
        return min(2147483647, max(-2147483648, res))`,
  java: `// Java Bitwise Division using Powers of 2
class Solution {
    public int divide(int dividend, int divisor) {
        if (dividend == divisor) return 1;
        if (dividend == Integer.MIN_VALUE && divisor == -1) return Integer.MAX_VALUE;

        boolean sign = (dividend >= 0) == (divisor >= 0);

        long n = Math.abs((long) dividend);
        long d = Math.abs((long) divisor);
        long ans = 0;

        while (n >= d) {
            int cnt = 0;
            while (n >= (d << (cnt + 1))) {
                cnt++;
            }
            ans += (1L << cnt);
            n -= (d << cnt);
        }

        return sign ? (int) ans : (int) -ans;
    }
}`,
  javascript: `// JavaScript Bitwise Division using Powers of 2
var divide = function(dividend, divisor) {
    if (dividend === divisor) return 1;
    if (dividend === -2147483648 && divisor === -1) return 2147483647;

    const sign = (dividend >= 0) === (divisor >= 0);

    let n = Math.abs(dividend);
    const d = Math.abs(divisor);
    let ans = 0;

    while (n >= d) {
        let cnt = 0;
        while (n >= (d * Math.pow(2, cnt + 1))) {
            cnt++;
        }
        ans += Math.pow(2, cnt);
        n -= d * Math.pow(2, cnt);
    }

    const res = sign ? ans : -ans;
    return Math.min(2147483647, Math.max(-2147483648, res));
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Dividend = 22, Divisor = 3 (Expected 22 / 3 = 7)',
    phase: 'INITIAL',
    codeLine: 16,
    dividend: 22,
    divisor: 3,
    remainingN: 22,
    quotient: 0,
    currentShift: null,
    subtractedChunk: null,
    variables: { dividend: 22, divisor: 3, 'expected floor': 7, method: 'Power-of-2 Bit Subtractions' },
    explain: 'Instead of repeated subtraction (-3) which is O(N), we subtract multiples of 3 * 2^cnt in logarithmic steps.',
    intuition: 'Every quotient can be expressed as a sum of powers of 2 (e.g. 7 = 4 + 2 + 1).'
  },
  {
    title: '2. Chunk 1: cnt = 2 => (3 << 2) = 12 <= 22. Subtract 12, Quotient += 4',
    phase: 'SUBTRACT_CHUNK',
    codeLine: 24,
    dividend: 22,
    divisor: 3,
    remainingN: 10,
    quotient: 4,
    currentShift: 2,
    subtractedChunk: 12,
    variables: { 'cnt': 2, 'chunk = 3 << 2': 12, 'quotient += 4': 4, 'remaining N': '22 - 12 = 10' },
    explain: '3 * 2^2 = 12 is the largest power-of-2 multiple <= 22 (next is 24 > 22). Add 2^2 = 4 to quotient. Remaining N = 10.',
    intuition: 'Subtracted largest power of 2 chunk.'
  },
  {
    title: '3. Chunk 2: cnt = 1 => (3 << 1) = 6 <= 10. Subtract 6, Quotient += 2',
    phase: 'SUBTRACT_CHUNK',
    codeLine: 24,
    dividend: 22,
    divisor: 3,
    remainingN: 4,
    quotient: 6,
    currentShift: 1,
    subtractedChunk: 6,
    variables: { 'cnt': 1, 'chunk = 3 << 1': 6, 'quotient += 2': 6, 'remaining N': '10 - 6 = 4' },
    explain: '3 * 2^1 = 6 <= 10. Add 2^1 = 2 to quotient (total 6). Remaining N = 4.',
    intuition: 'Subtracted next power of 2 chunk.'
  },
  {
    title: '4. Chunk 3: cnt = 0 => (3 << 0) = 3 <= 4. Subtract 3, Quotient += 1',
    phase: 'SUBTRACT_CHUNK',
    codeLine: 24,
    dividend: 22,
    divisor: 3,
    remainingN: 1,
    quotient: 7,
    currentShift: 0,
    subtractedChunk: 3,
    variables: { 'cnt': 0, 'chunk = 3 << 0': 3, 'quotient += 1': 7, 'remaining N': '4 - 3 = 1' },
    explain: '3 * 2^0 = 3 <= 4. Add 2^0 = 1 to quotient (total 7). Remaining N = 1.',
    intuition: 'Remaining 1 is less than divisor 3.'
  },
  {
    title: '5. Loop Terminates: Remaining N (1) < Divisor (3) => Result = 7',
    phase: 'RESULT',
    codeLine: 29,
    dividend: 22,
    divisor: 3,
    remainingN: 1,
    quotient: 7,
    currentShift: null,
    subtractedChunk: null,
    variables: { finalQuotient: 7, remainder: 1, operations: '3 bitwise iterations' },
    explain: '22 divided by 3 equals 7 with remainder 1. Executed in O(log^2 N) time without multiplication or division operators.',
    intuition: 'Decomposing into binary powers achieves logarithmic division.'
  }
];

export default function DivideTwoNumbersWithoutMultiplicationAndDivisionVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          {step.dividend} / {step.divisor} (No * or /)
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
          Accumulated Quotient = {step.quotient}
        </span>
      </div>

      {/* Visual State Canvas */}
      <div className="w-full p-6 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col gap-4 font-mono">
        <div className="grid grid-cols-2 gap-4">
          {/* Remaining N */}
          <div className="p-3 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] flex flex-col items-center gap-1">
            <span className="text-xs text-[var(--chalk-dim)]">Remaining N:</span>
            <span className="text-2xl font-bold text-amber-300">{step.remainingN}</span>
          </div>

          {/* Current Quotient */}
          <div className="p-3 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] flex flex-col items-center gap-1">
            <span className="text-xs text-[var(--chalk-dim)]">Current Quotient:</span>
            <span className="text-2xl font-bold text-emerald-400">{step.quotient}</span>
          </div>
        </div>

        {/* Active Chunk Subtracted */}
        {step.subtractedChunk && (
          <div className="w-full p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between text-xs px-4">
            <span className="text-cyan-300">Chunk Subtracted:</span>
            <span className="text-[var(--chalk)] font-bold">
              divisor &times; 2^{step.currentShift} = {step.subtractedChunk}
            </span>
          </div>
        )}
      </div>

      {/* Result Card */}
      {step.phase === 'RESULT' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 Quotient = {step.quotient} (Remainder: {step.remainingN})</span>
        </div>
      )}
    </div>
  );
}

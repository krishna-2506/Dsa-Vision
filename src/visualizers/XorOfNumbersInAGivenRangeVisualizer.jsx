import React from 'react';

export const meta = {
  title: 'XOR of Numbers in a Given Range',
  category: 'Bit Manipulation',
  difficulty: 'Medium',
  timeComplexity: 'O(1)',
  spaceComplexity: 'O(1)',
  description: 'Computes the bitwise XOR sum of all integers in the range [L..R] in O(1) time using the 4-period cyclic prefix XOR pattern: findXOR(R) ^ findXOR(L - 1).'
};

export const solutions = {
  cpp: `// C++ O(1) Range XOR using Prefix XOR Properties
// Time Complexity: O(1) | Space Complexity: O(1)
#include <iostream>
using namespace std;

class Solution {
    // Prefix XOR from 1 to N
    int findXOR(int n) {
        if (n % 4 == 0) return n;
        if (n % 4 == 1) return 1;
        if (n % 4 == 2) return n + 1;
        return 0; // n % 4 == 3
    }

public:
    int findRangeXOR(int l, int r) {
        // [L..R] = (1..R) ^ (1..L-1)
        return findXOR(r) ^ findXOR(l - 1);
    }
};`,
  python: `# Python 3 O(1) Range XOR
class Solution:
    def findRangeXOR(self, l: int, r: int) -> int:
        def find_xor(n):
            rem = n % 4
            if rem == 0: return n
            if rem == 1: return 1
            if rem == 2: return n + 1
            return 0

        return find_xor(r) ^ find_xor(l - 1)`,
  java: `// Java O(1) Range XOR
class Solution {
    private int findXOR(int n) {
        int rem = n % 4;
        if (rem == 0) return n;
        if (rem == 1) return 1;
        if (rem == 2) return n + 1;
        return 0;
    }

    public int findRangeXOR(int l, int r) {
        return findXOR(r) ^ findXOR(l - 1);
    }
}`,
  javascript: `// JavaScript O(1) Range XOR
var findRangeXOR = function(l, r) {
    const findXOR = (n) => {
        const rem = n % 4;
        if (rem === 0) return n;
        if (rem === 1) return 1;
        if (rem === 2) return n + 1;
        return 0;
    };

    return findXOR(r) ^ findXOR(l - 1);
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Compute XOR from L = 4 to R = 8 (4 ^ 5 ^ 6 ^ 7 ^ 8)',
    phase: 'INITIAL',
    codeLine: 19,
    l: 4,
    r: 8,
    xorR: null,
    xorLminus1: null,
    finalAns: null,
    variables: { L: 4, R: 8, formula: 'findXOR(R) ^ findXOR(L - 1)', pattern: 'Period of 4' },
    explain: 'Instead of linear O(R - L) iteration, we utilize the prefix XOR identity: Range [L..R] = PrefixXOR(R) ^ PrefixXOR(L - 1).',
    intuition: 'Prefix XOR from 1 to N repeats every 4 numbers, allowing O(1) modulo 4 lookup.'
  },
  {
    title: '2. Cyclic Pattern of Prefix XOR (1 to N)',
    phase: 'PATTERN_EXPLAIN',
    codeLine: 9,
    l: 4,
    r: 8,
    xorR: null,
    xorLminus1: null,
    finalAns: null,
    variables: { 'N % 4 == 0': 'N', 'N % 4 == 1': '1', 'N % 4 == 2': 'N + 1', 'N % 4 == 3': '0' },
    explain: 'Notice: 1=1, 1^2=3, 1^2^3=0, 1^2^3^4=4, 1^2^3^4^5=1, 1..6=7, 1..7=0, 1..8=8. The pattern is completely predictable.',
    intuition: '4 consecutive integers always XOR to 0 when starting at a multiple of 4.'
  },
  {
    title: '3. Calculate PrefixXOR(R = 8): 8 % 4 == 0 => Result = 8',
    phase: 'COMPUTE_R',
    codeLine: 10,
    l: 4,
    r: 8,
    xorR: 8,
    xorLminus1: null,
    finalAns: null,
    variables: { 'R': 8, '8 % 4': 0, 'findXOR(8)': 8 },
    explain: 'Since 8 % 4 == 0, the XOR sum from 1 to 8 evaluates directly to 8.',
    intuition: 'First prefix term computed in 1 operation.'
  },
  {
    title: '4. Calculate PrefixXOR(L - 1 = 3): 3 % 4 == 3 => Result = 0',
    phase: 'COMPUTE_L',
    codeLine: 13,
    l: 4,
    r: 8,
    xorR: 8,
    xorLminus1: 0,
    finalAns: null,
    variables: { 'L - 1': 3, '3 % 4': 3, 'findXOR(3)': 0 },
    explain: 'Since 3 % 4 == 3, the XOR sum from 1 to 3 evaluates to 0 (1 ^ 2 ^ 3 = 0).',
    intuition: 'Second prefix term computed in 1 operation.'
  },
  {
    title: '5. Combine Terms: findXOR(8) ^ findXOR(3) = 8 ^ 0 = 8',
    phase: 'RESULT',
    codeLine: 20,
    l: 4,
    r: 8,
    xorR: 8,
    xorLminus1: 0,
    finalAns: 8,
    variables: { '8 ^ 0': 8, verified: '4 ^ 5 ^ 6 ^ 7 ^ 8 = 8', complexity: 'O(1) time and space' },
    explain: 'Result is 8. Verification: (4^5=1) ^ (6^7=1) = 0; 0 ^ 8 = 8. Exact match obtained in O(1) time!',
    intuition: 'Prefix cancellation eliminates all intermediate computation.'
  }
];

export default function XorOfNumbersInAGivenRangeVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Range [{step.l} .. {step.r}]
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
          Formula: findXOR(R) ^ findXOR(L - 1)
        </span>
      </div>

      {/* Prefix Computation Cards */}
      <div className="w-full p-6 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] flex items-center justify-around gap-4 font-mono">
        {/* findXOR(R) */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-[var(--chalk-dim)]">PrefixXOR(R={step.r}):</span>
          <div className="w-20 h-20 rounded-xl border border-blue-400 bg-blue-500/15 text-blue-200 flex items-center justify-center text-2xl font-bold shadow-md shadow-blue-500/20">
            {step.xorR !== null ? step.xorR : '?'}
          </div>
        </div>

        <div className="text-2xl font-bold text-amber-400">^</div>

        {/* findXOR(L-1) */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-[var(--chalk-dim)]">PrefixXOR(L-1={step.l - 1}):</span>
          <div className="w-20 h-20 rounded-xl border border-purple-400 bg-purple-500/15 text-purple-200 flex items-center justify-center text-2xl font-bold shadow-md shadow-purple-500/20">
            {step.xorLminus1 !== null ? step.xorLminus1 : '?'}
          </div>
        </div>

        <div className="text-2xl font-bold text-emerald-400">=</div>

        {/* Final Result */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-[var(--chalk-dim)]">Range XOR:</span>
          <div className="w-20 h-20 rounded-xl border border-emerald-400 bg-emerald-500/20 text-emerald-200 flex items-center justify-center text-2xl font-bold shadow-md shadow-emerald-500/20">
            {step.finalAns !== null ? step.finalAns : '?'}
          </div>
        </div>
      </div>

      {/* Cyclic Pattern Table */}
      <div className="w-full p-4 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] flex flex-col gap-2 font-mono text-xs">
        <span className="text-[var(--chalk-dim)] font-bold">Prefix XOR Cyclic Modulo Table:</span>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="p-2 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-blue-300">rem 0 &rarr; N</div>
          <div className="p-2 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-cyan-300">rem 1 &rarr; 1</div>
          <div className="p-2 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-purple-300">rem 2 &rarr; N+1</div>
          <div className="p-2 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-emerald-300">rem 3 &rarr; 0</div>
        </div>
      </div>
    </div>
  );
}

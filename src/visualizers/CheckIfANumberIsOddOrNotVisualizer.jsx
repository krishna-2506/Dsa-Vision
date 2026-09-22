import React from 'react';

export const meta = {
  title: 'Check if a Number is Odd or Not',
  category: 'Bit Manipulation',
  difficulty: 'Easy',
  timeComplexity: 'O(1)',
  spaceComplexity: 'O(1)',
  description: 'Determines whether a number is odd or even in O(1) time by checking the least significant bit (LSB) using bitwise AND: (n & 1) != 0.'
};

export const solutions = {
  cpp: `// C++ Bitwise Check for Odd / Even
// Time Complexity: O(1) | Space Complexity: O(1)
#include <iostream>
using namespace std;

class Solution {
public:
    bool isOdd(int n) {
        // If the 0th bit (LSB) is 1, the number is odd.
        return (n & 1) != 0;
    }
};`,
  python: `# Python 3 Bitwise Check for Odd / Even
class Solution:
    def isOdd(self, n: int) -> bool:
        # LSB is 1 for odd numbers, 0 for even numbers
        return (n & 1) != 0`,
  java: `// Java Bitwise Check for Odd / Even
class Solution {
    public boolean isOdd(int n) {
        return (n & 1) != 0;
    }
}`,
  javascript: `// JavaScript Bitwise Check for Odd / Even
var isOdd = function(n) {
    return (n & 1) !== 0;
};`
};

export const steps = [
  {
    title: '1. Input Number: N = 13 in Binary',
    phase: 'INITIAL',
    codeLine: 10,
    n: 13,
    binaryN: '00001101',
    mask: '00000001',
    resultBit: null,
    isOdd: null,
    variables: { n: 13, 'binary 13': '00001101_2', operation: 'n & 1' },
    explain: 'Every integer in binary is the sum of powers of 2 (2^0, 2^1, 2^2, ...). All powers of 2 except 2^0 (1) are even. Therefore, parity depends entirely on the 0th bit (LSB).',
    intuition: 'If LSB is 1, the number is odd; if 0, even.'
  },
  {
    title: '2. Apply Bitwise Mask: 13 & 1 (Bitwise AND)',
    phase: 'AND_OPERATION',
    codeLine: 12,
    n: 13,
    binaryN: '00001101',
    mask: '00000001',
    resultBit: '00000001',
    isOdd: true,
    variables: { '13 in binary': '00001101', '1 in binary': '00000001', 'result (13 & 1)': '00000001 (1)' },
    explain: 'Bitwise AND with 1 masks out all higher order bits, evaluating only the least significant bit (1 & 1 = 1).',
    intuition: 'Zero CPU arithmetic division needed; single clock cycle operation.'
  },
  {
    title: '3. Parity Decision: (13 & 1) = 1 => 13 is ODD',
    phase: 'RESULT',
    codeLine: 12,
    n: 13,
    binaryN: '00001101',
    mask: '00000001',
    resultBit: '00000001',
    isOdd: true,
    variables: { outcome: 'ODD', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
    explain: 'Because the result is non-zero, N=13 is confirmed ODD.',
    intuition: 'Bitwise AND is significantly faster than modulo arithmetic (n % 2).'
  }
];

export default function CheckIfANumberIsOddOrNotVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          N = {step.n}
        </span>
        {step.isOdd !== null && (
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-semibold">
            Result: {step.isOdd ? 'ODD NUMBER' : 'EVEN NUMBER'}
          </span>
        )}
      </div>

      {/* Bit Register Table */}
      <div className="w-full p-6 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col gap-4 font-mono">
        {/* Row 1: N */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--chalk-dim)] w-24">N ({step.n}):</span>
          <div className="flex items-center gap-1.5">
            {step.binaryN.split('').map((bit, idx) => (
              <div
                key={idx}
                className={`w-9 h-10 rounded-lg border flex items-center justify-center font-bold text-sm ${
                  idx === 7 ? 'border-amber-400 bg-amber-500/20 text-amber-200 scale-105' : 'border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk)]'
                }`}
              >
                {bit}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Mask 1 */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--chalk-dim)] w-24">&amp; Mask (1):</span>
          <div className="flex items-center gap-1.5">
            {step.mask.split('').map((bit, idx) => (
              <div
                key={idx}
                className={`w-9 h-10 rounded-lg border flex items-center justify-center font-bold text-sm ${
                  idx === 7 ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 scale-105' : 'border-[var(--line)] bg-[var(--board-raised)] text-[#5b6076]'
                }`}
              >
                {bit}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-[#272b3c] my-1" />

        {/* Row 3: Result */}
        {step.resultBit && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-400 w-24 font-bold">Result:</span>
            <div className="flex items-center gap-1.5">
              {step.resultBit.split('').map((bit, idx) => (
                <div
                  key={idx}
                  className={`w-9 h-10 rounded-lg border flex items-center justify-center font-bold text-sm ${
                    idx === 7 ? 'border-emerald-400 bg-emerald-500/30 text-emerald-200 scale-110 shadow-lg shadow-emerald-500/30' : 'border-[var(--line)] bg-[var(--board-raised)] text-[#5b6076]'
                  }`}
                >
                  {bit}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Decision Summary */}
      <div className="w-full p-4 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] flex items-center justify-around font-mono text-xs text-[var(--chalk-dim)]">
        <div>LSB Bit 0 = <strong className="text-amber-300">1</strong> (Odd)</div>
        <div>CPU Cost: <strong className="text-emerald-400">1 Clock Cycle (O(1))</strong></div>
      </div>
    </div>
  );
}

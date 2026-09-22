import React from 'react';

export const meta = {
  title: 'Check if the i-th Bit is Set or Not',
  category: 'Bit Manipulation',
  difficulty: 'Easy',
  timeComplexity: 'O(1)',
  spaceComplexity: 'O(1)',
  description: 'Tests whether the i-th bit (0-indexed) of an integer N is set (1) or unset (0) using bitwise masks.'
};

export const solutions = {
  cpp: `// C++ Check if the i-th bit is set or not
// Time Complexity: O(1) | Space Complexity: O(1)
class Solution {
public:
    bool checkKthBit(int n, int k) {
        // Method 1: Left Shift Mask
        return (n & (1 << k)) != 0;

        // Method 2: Right Shift
        // return ((n >> k) & 1) == 1;
    }
};`,
  python: `# Python 3 Check if the i-th bit is set or not
class Solution:
    def checkKthBit(self, n: int, k: int) -> bool:
        # Method 1: Left Shift Mask
        return (n & (1 << k)) != 0`,
  java: `// Java Check if the i-th bit is set or not
class Solution {
    static boolean checkKthBit(int n, int k) {
        return (n & (1 << k)) != 0;
    }
}`,
  javascript: `// JavaScript Check if the i-th bit is set or not
function checkKthBit(n, k) {
    return (n & (1 << k)) !== 0;
}`
};

export const steps = [
  {
    title: '1. Number: N = 13 (Binary: 00001101), Test Index: i = 2',
    phase: 'INITIAL',
    codeLine: 7,
    n: 13,
    i: 2,
    binN: '00001101',
    mask: '00000100',
    andRes: '00000100',
    isSet: true,
    variables: { N: 13, 'target bit': 'i = 2 (weight 2^2 = 4)' },
    explain: 'We want to inspect the bit at index 2 (0-indexed from the right).',
    intuition: 'Bitwise AND with a mask having only bit i set.'
  },
  {
    title: '2. Create Mask: 1 << 2 = 4 (Binary: 00000100)',
    phase: 'CREATE_MASK',
    codeLine: 7,
    n: 13,
    i: 2,
    binN: '00001101',
    mask: '00000100',
    andRes: '00000100',
    isSet: true,
    variables: { '1 << 2': 4, maskBinary: '00000100' },
    explain: 'Shift 1 to the left by 2 positions. All bits in the mask are 0 except at position 2.',
    intuition: 'Isolates bit position 2.'
  },
  {
    title: '3. Bitwise AND: 13 & 4 -> (00001101 & 00000100) = 00000100 (Non-Zero!)',
    phase: 'BITWISE_AND',
    codeLine: 7,
    n: 13,
    i: 2,
    binN: '00001101',
    mask: '00000100',
    andRes: '00000100',
    isSet: true,
    variables: { '13 & 4': 4, isNonZero: true, isSet: true },
    explain: 'The result is 4 (non-zero). This proves that the 2nd bit of 13 is SET (1)!',
    intuition: 'Non-zero result confirms bit is set.'
  },
  {
    title: '4. Completed: 2nd Bit of 13 is SET (True)!',
    phase: 'COMPLETED',
    codeLine: 7,
    n: 13,
    i: 2,
    binN: '00001101',
    mask: '00000100',
    andRes: '00000100',
    isSet: true,
    variables: { result: 'true', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
    explain: 'Evaluation finished in a single O(1) bitwise operation. The i-th bit is set.',
    intuition: 'O(1) operation.'
  }
];

export default function CheckIfTheIthBitIsSetOrNotVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          N = {step.n}, Target bit i = {step.i}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Is Set: {step.isSet ? 'TRUE (1)' : 'FALSE (0)'}
        </span>
      </div>

      {/* Bit Register Comparison */}
      <div className="w-full flex flex-col items-center gap-3 py-2">
        {/* N */}
        <div className="flex items-center gap-2">
          <span className="w-20 font-mono text-xs text-amber-400 font-bold">N (13):</span>
          <div className="flex items-center gap-1.5">
            {step.binN.split('').map((bit, idx) => {
              const bitPos = 7 - idx;
              const isTarget = bitPos === step.i;

              return (
                <div
                  key={idx}
                  className={`w-9 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-sm ${
                    isTarget
                      ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg'
                      : bit === '1'
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                      : 'border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk-faint)]'
                  }`}
                >
                  {bit}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mask */}
        <div className="flex items-center gap-2">
          <span className="w-20 font-mono text-xs text-indigo-400 font-bold">1 &lt;&lt; {step.i}:</span>
          <div className="flex items-center gap-1.5">
            {step.mask.split('').map((bit, idx) => (
              <div
                key={idx}
                className={`w-9 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-sm ${
                  bit === '1'
                    ? 'border-indigo-500 bg-indigo-500/25 text-indigo-300'
                    : 'border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk-faint)]'
                }`}
              >
                {bit}
              </div>
            ))}
          </div>
        </div>

        {/* AND Result */}
        <div className="flex items-center gap-2">
          <span className="w-20 font-mono text-xs text-emerald-400 font-bold">AND (&):</span>
          <div className="flex items-center gap-1.5">
            {step.andRes.split('').map((bit, idx) => (
              <div
                key={idx}
                className="w-9 h-10 rounded-xl border border-emerald-500/30 bg-[var(--board-raised)] flex items-center justify-center font-mono font-bold text-sm text-emerald-400"
              >
                {bit}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bit Trick formula banner */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-3 flex items-center justify-between text-xs font-mono">
        <span className="text-[var(--chalk-dim)]">Formula: <strong className="text-amber-400">(N & (1 &lt;&lt; i)) != 0</strong></span>
        <span className="text-emerald-400 font-semibold">O(1) Time</span>
      </div>
    </div>
  );
}

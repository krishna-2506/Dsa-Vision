import React from 'react';

export const meta = {
  title: 'Check if a Number is Power of 2',
  category: 'Bit Manipulation',
  difficulty: 'Easy',
  timeComplexity: 'O(1)',
  spaceComplexity: 'O(1)',
  description: 'Determines if an integer N is a power of 2 in O(1) time using the single-bit property n & (n - 1) == 0.'
};

export const solutions = {
  cpp: `// C++ Check if Number is Power of 2
// Time Complexity: O(1) | Space Complexity: O(1)
class Solution {
public:
    bool isPowerOfTwo(int n) {
        // A power of 2 has exactly one set bit in binary
        return (n > 0) && ((n & (n - 1)) == 0);
    }
};`,
  python: `# Python 3 Check if Number is Power of 2
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0`,
  java: `// Java Check if Number is Power of 2
class Solution {
    public boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}`,
  javascript: `// JavaScript Check if Number is Power of 2
var isPowerOfTwo = function(n) {
    return n > 0 && (n & (n - 1)) === 0;
};`
};

export const steps = [
  {
    title: '1. Test N = 16 (Binary: 00010000), Check: N > 0',
    phase: 'INITIAL',
    codeLine: 7,
    n: 16,
    nMinusOne: 15,
    binN: '00010000',
    binNMinusOne: '00001111',
    andResult: '00000000',
    isPowerOfTwo: true,
    variables: { N: 16, 'N > 0': true },
    explain: 'Powers of 2 have only 1 set bit in binary. 16 is greater than 0, so proceed to bitwise AND test.',
    intuition: 'Only powers of 2 have a single 1-bit.'
  },
  {
    title: '2. Compute N - 1: 16 - 1 = 15 (Binary: 00001111)',
    phase: 'MINUS_ONE',
    codeLine: 7,
    n: 16,
    nMinusOne: 15,
    binN: '00010000',
    binNMinusOne: '00001111',
    andResult: '00000000',
    isPowerOfTwo: true,
    variables: { 'N - 1': 15, binNMinusOne: '00001111' },
    explain: 'Subtracting 1 flips the lone set bit to 0 and turns all lower bits to 1.',
    intuition: 'Bitwise complement pattern below the single bit.'
  },
  {
    title: '3. Bitwise AND: 16 & 15 -> (00010000 & 00001111) = 00000000 (Zero!)',
    phase: 'BITWISE_AND',
    codeLine: 7,
    n: 16,
    nMinusOne: 15,
    binN: '00010000',
    binNMinusOne: '00001111',
    andResult: '00000000',
    isPowerOfTwo: true,
    variables: { '16 & 15': 0, isZero: true },
    explain: 'No bits overlap! The bitwise AND result is exactly 0.',
    intuition: 'Zero overlap proves single set bit.'
  },
  {
    title: '4. Completed: N = 16 is a Power of 2 (True)!',
    phase: 'COMPLETED',
    codeLine: 7,
    n: 16,
    nMinusOne: 15,
    binN: '00010000',
    binNMinusOne: '00001111',
    andResult: '00000000',
    isPowerOfTwo: true,
    variables: { result: 'true', timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
    explain: '(n > 0) && (n & (n - 1) == 0) holds. 16 is 2^4.',
    intuition: 'O(1) bitwise verification complete.'
  }
];

export default function CheckIfANumberIsPowerOf2OrNotVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          N = {step.n} (2^{Math.log2(step.n)})
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Is Power of 2: {step.isPowerOfTwo ? 'TRUE' : 'FALSE'}
        </span>
      </div>

      {/* Bit Register Comparison */}
      <div className="w-full flex flex-col items-center gap-3 py-2">
        {/* N */}
        <div className="flex items-center gap-2">
          <span className="w-16 font-mono text-xs text-amber-400 font-bold">N (16):</span>
          <div className="flex items-center gap-1.5">
            {step.binN.split('').map((bit, idx) => (
              <div
                key={idx}
                className={`w-9 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-sm ${
                  bit === '1'
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-md ring-1 ring-emerald-500/40'
                    : 'border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk-faint)]'
                }`}
              >
                {bit}
              </div>
            ))}
          </div>
        </div>

        {/* N - 1 */}
        <div className="flex items-center gap-2">
          <span className="w-16 font-mono text-xs text-indigo-400 font-bold">N-1 (15):</span>
          <div className="flex items-center gap-1.5">
            {step.binNMinusOne.split('').map((bit, idx) => (
              <div
                key={idx}
                className={`w-9 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-sm ${
                  bit === '1'
                    ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
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
          <span className="w-16 font-mono text-xs text-emerald-400 font-bold">AND (&):</span>
          <div className="flex items-center gap-1.5">
            {step.andResult.split('').map((bit, idx) => (
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
        <span className="text-[var(--chalk-dim)]">Formula: <strong className="text-amber-400">(N &gt; 0) && ((N & (N - 1)) == 0)</strong></span>
        <span className="text-emerald-400 font-semibold">O(1) Time</span>
      </div>
    </div>
  );
}

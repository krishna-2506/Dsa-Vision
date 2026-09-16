import React from 'react';

export const meta = {
  title: 'Count Number of Set Bits (Brian Kernighan)',
  category: 'Bit Manipulation',
  difficulty: 'Easy',
  timeComplexity: 'O(number of set bits)',
  spaceComplexity: 'O(1)',
  description: "Counts total 1-bits in a number's binary representation in O(k) operations using Brian Kernighan's bit-clearing trick n & (n - 1)."
};

export const solutions = {
  cpp: `// C++ Count Set Bits using Brian Kernighan's Algorithm
// Time Complexity: O(k) where k = number of set bits | Space Complexity: O(1)
class Solution {
public:
    int setBits(int n) {
        int count = 0;
        while (n > 0) {
            n = n & (n - 1); // Clears rightmost set bit
            count++;
        }
        return count;
    }
};`,
  python: `# Python 3 Count Set Bits using Brian Kernighan's Algorithm
class Solution:
    def setBits(self, n: int) -> int:
        count = 0
        while n > 0:
            n &= (n - 1)
            count += 1
        return count`,
  java: `// Java Count Set Bits using Brian Kernighan's Algorithm
class Solution {
    static int setBits(int n) {
        int count = 0;
        while (n > 0) {
            n = n & (n - 1);
            count++;
        }
        return count;
    }
}`,
  javascript: `// JavaScript Count Set Bits using Brian Kernighan's Algorithm
function setBits(n) {
    let count = 0;
    while (n > 0) {
        n = n & (n - 1);
        count++;
    }
    return count;
}`
};

export const steps = [
  {
    title: '1. Number: N = 13 (Binary: 00001101), count = 0',
    phase: 'INITIAL',
    codeLine: 7,
    n: 13,
    nMinusOne: 12,
    binaryN: '00001101',
    count: 0,
    variables: { N: 13, binary: '00001101', count: 0 },
    explain: 'Binary representation has 3 set bits (positions 0, 2, 3). Brian Kernighan algorithm clears 1 set bit per iteration.',
    intuition: 'n & (n - 1) flips the least significant set bit to 0.'
  },
  {
    title: '2. Iteration 1: 13 & 12 -> N becomes 12 (00001100), count = 1',
    phase: 'BIT_CLEAR',
    codeLine: 9,
    n: 12,
    nMinusOne: 11,
    binaryN: '00001100',
    count: 1,
    variables: { operation: '13 & 12', binary: '00001100', bitCleared: 'Bit 0', count: 1 },
    explain: '13 (1101) & 12 (1100) = 12 (1100). Bit 0 is cleared. Count becomes 1.',
    intuition: 'Rightmost 1 removed.'
  },
  {
    title: '3. Iteration 2: 12 & 11 -> N becomes 8 (00001000), count = 2',
    phase: 'BIT_CLEAR',
    codeLine: 9,
    n: 8,
    nMinusOne: 7,
    binaryN: '00001000',
    count: 2,
    variables: { operation: '12 & 11', binary: '00001000', bitCleared: 'Bit 2', count: 2 },
    explain: '12 (1100) & 11 (1011) = 8 (1000). Bit 2 is cleared. Count becomes 2.',
    intuition: 'Next rightmost 1 removed.'
  },
  {
    title: '4. Iteration 3: 8 & 7 -> N becomes 0 (00000000), count = 3',
    phase: 'BIT_CLEAR',
    codeLine: 9,
    n: 0,
    nMinusOne: -1,
    binaryN: '00000000',
    count: 3,
    variables: { operation: '8 & 7', binary: '00000000', bitCleared: 'Bit 3', count: 3 },
    explain: '8 (1000) & 7 (0111) = 0. Bit 3 cleared. All bits are now 0. Loop terminates.',
    intuition: 'All set bits cleared.'
  },
  {
    title: '5. Completed: Total Set Bits = 3',
    phase: 'COMPLETED',
    codeLine: 12,
    n: 0,
    nMinusOne: -1,
    binaryN: '00000000',
    count: 3,
    variables: { totalSetBits: 3, iterations: 3, timeComplexity: 'O(set bits)' },
    explain: 'Only 3 operations were executed (equal to the number of set bits, instead of 32 full bit-scans).',
    intuition: 'Optimal bit count achieved.'
  }
];

export default function CountTheNumberOfSetBitsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          N = {step.n}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Set Bits Count = {step.count}
        </span>
      </div>

      {/* 8-bit Binary Register */}
      <div className="w-full flex flex-col items-center gap-2">
        <span className="text-[11px] font-mono text-[#8a8ea3]">8-Bit Binary Register:</span>
        <div className="flex items-center gap-1.5 py-2 overflow-x-auto">
          {step.binaryN.split('').map((bit, idx) => {
            const isSet = bit === '1';

            let ringClass = isSet
              ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-500/10'
              : 'border-[#272b3c] bg-[#12131b] text-slate-500';

            return (
              <div key={idx} className="flex flex-col items-center gap-1 min-w-[36px]">
                <div className={`w-9 h-11 rounded-xl border flex items-center justify-center font-mono font-bold text-base transition-all ${ringClass}`}>
                  {bit}
                </div>
                <span className="text-[8px] font-mono text-[#5b6076]">b{7 - idx}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bit Trick Card */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-3 flex items-center justify-between text-xs font-mono">
        <span className="text-[#8a8ea3]">Bit Trick: <strong className="text-amber-400">N & (N - 1)</strong></span>
        <span className="text-emerald-400 font-semibold">Runs in O(SetBits)</span>
      </div>
    </div>
  );
}

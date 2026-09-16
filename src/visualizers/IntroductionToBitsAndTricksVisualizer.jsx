import React from 'react';

export const meta = {
  title: 'Introduction to Bits and Tricks',
  category: 'Bit Manipulation',
  difficulty: 'Easy',
  timeComplexity: 'O(1) per trick',
  spaceComplexity: 'O(1)',
  description: 'Interactive reference visualizer of the 5 canonical bit manipulation tricks: check i-th bit, set i-th bit, clear i-th bit, toggle i-th bit, and clear rightmost set bit.'
};

export const solutions = {
  cpp: `// C++ Essential Bit Manipulation Operations
#include <iostream>
using namespace std;

class BitTricks {
public:
    // 1. Check if i-th bit is set
    bool checkIthBit(int n, int i) {
        return (n & (1 << i)) != 0;
    }

    // 2. Set the i-th bit
    int setIthBit(int n, int i) {
        return n | (1 << i);
    }

    // 3. Clear (unset) the i-th bit
    int clearIthBit(int n, int i) {
        return n & ~(1 << i);
    }

    // 4. Toggle the i-th bit
    int toggleIthBit(int n, int i) {
        return n ^ (1 << i);
    }

    // 5. Remove the rightmost set bit
    int removeRightmostSetBit(int n) {
        return n & (n - 1);
    }
};`,
  python: `# Python 3 Essential Bit Manipulation Operations
class BitTricks:
    def check_ith_bit(self, n: int, i: int) -> bool:
        return (n & (1 << i)) != 0

    def set_ith_bit(self, n: int, i: int) -> int:
        return n | (1 << i)

    def clear_ith_bit(self, n: int, i: int) -> int:
        return n & ~(1 << i)

    def toggle_ith_bit(self, n: int, i: int) -> int:
        return n ^ (1 << i)

    def remove_rightmost_set_bit(self, n: int) -> int:
        return n & (n - 1)`,
  java: `// Java Essential Bit Manipulation Operations
class BitTricks {
    public boolean checkIthBit(int n, int i) {
        return (n & (1 << i)) != 0;
    }

    public int setIthBit(int n, int i) {
        return n | (1 << i);
    }

    public int clearIthBit(int n, int i) {
        return n & ~(1 << i);
    }

    public int toggleIthBit(int n, int i) {
        return n ^ (1 << i);
    }

    public int removeRightmostSetBit(int n) {
        return n & (n - 1);
    }
}`,
  javascript: `// JavaScript Essential Bit Manipulation Operations
const bitTricks = {
    checkIthBit: (n, i) => (n & (1 << i)) !== 0,
    setIthBit: (n, i) => n | (1 << i),
    clearIthBit: (n, i) => n & ~(1 << i),
    toggleIthBit: (n, i) => n ^ (1 << i),
    removeRightmostSetBit: (n) => n & (n - 1)
};`
};

export const steps = [
  {
    title: '1. Overview: Number N = 13 (Binary: 00001101_2)',
    phase: 'INITIAL',
    codeLine: 10,
    trickName: 'BASE',
    n: 13,
    binary: '00001101',
    i: 2,
    variables: { n: 13, binary: '00001101', i: 2 },
    explain: 'Bit positions are 0-indexed from right to left. N=13 has bits at positions 0, 2, and 3 set to 1.',
    intuition: 'Bitwise bit shifts (1 << i) generate masks with a single 1 at index i.'
  },
  {
    title: '2. Trick 1: Check i-th Bit (i=2) using n & (1 << i)',
    phase: 'CHECK_BIT',
    codeLine: 11,
    trickName: 'CHECK',
    n: 13,
    binary: '00001101',
    i: 2,
    mask: '00000100',
    result: '4 != 0 (BIT IS SET)',
    variables: { formula: 'n & (1 << 2)', mask: '00000100', outcome: 'TRUE (1)' },
    explain: '13 & 4 isolates bit 2. Since the result is 4 (non-zero), bit 2 is 1.',
    intuition: 'Non-zero result means bit is set.'
  },
  {
    title: '3. Trick 2: Clear i-th Bit (i=2) using n & ~(1 << i)',
    phase: 'CLEAR_BIT',
    codeLine: 21,
    trickName: 'CLEAR',
    n: 9,
    binary: '00001001',
    i: 2,
    mask: '11111011',
    result: '9 (00001001_2)',
    variables: { formula: '13 & ~(4)', newN: 9, clearedBit: 2 },
    explain: 'Inverting the mask produces 1s everywhere except position 2. ANDing clears bit 2 to 0 without disturbing any other bit.',
    intuition: 'Preserves all bits except index i.'
  },
  {
    title: '4. Trick 3: Set i-th Bit (i=1) using n | (1 << i)',
    phase: 'SET_BIT',
    codeLine: 16,
    trickName: 'SET',
    n: 11,
    binary: '00001011',
    i: 1,
    mask: '00000010',
    result: '11 (00001011_2)',
    variables: { formula: '9 | (1 << 1)', newN: 11, setBit: 1 },
    explain: 'Bitwise OR with mask (2) turns bit 1 from 0 to 1 without altering other bits.',
    intuition: 'Guarantees bit i becomes 1.'
  },
  {
    title: '5. Trick 4: Remove Rightmost Set Bit using n & (n - 1)',
    phase: 'REMOVE_RIGHTMOST',
    codeLine: 31,
    trickName: 'KERNIGHAN',
    n: 10,
    binary: '00001010',
    i: null,
    mask: '00001010',
    result: '10 (00001010_2)',
    variables: { formula: '11 & 10', '11 in binary': '00001011', '10 in binary': '00001010', outcome: '00001010 (10)' },
    explain: 'Subtracting 1 flips all bits from the right up to and including the lowest set bit. ANDing with original n clears that single bit!',
    intuition: 'Brian Kernighan trick: Clears lowest set bit in exactly one operation.'
  }
];

export default function IntroductionToBitsAndTricksVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Operation: {step.trickName}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
          Current N = {step.n}
        </span>
      </div>

      {/* Bit Register Table */}
      <div className="w-full p-6 rounded-2xl bg-[#161824] border border-[#272b3c] flex flex-col items-center gap-4 font-mono">
        <div className="text-xs text-[#8a8ea3]">8-Bit Register Display (Bit 7 &rarr; Bit 0)</div>

        {/* Binary Register */}
        <div className="flex items-center gap-2">
          {step.binary.split('').map((bit, idx) => {
            const bitIndex = 7 - idx;
            const isTarget = step.i !== null && step.i === bitIndex;

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-[#5b6076]">b{bitIndex}</span>
                <div className={`w-10 h-12 rounded-xl border flex items-center justify-center font-bold text-base transition-all ${
                  isTarget ? 'border-amber-400 bg-amber-500/25 text-amber-200 scale-105 shadow-md shadow-amber-500/20' :
                  bit === '1' ? 'border-cyan-500/40 bg-cyan-500/15 text-cyan-200' : 'border-[#272b3c] bg-[#12131b] text-[#555a73]'
                }`}>
                  {bit}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mask Info */}
        {step.mask && (
          <div className="w-full p-2.5 rounded-xl bg-[#12131b] border border-[#202436] flex items-center justify-between text-xs px-4">
            <span className="text-[#8a8ea3]">Mask Used:</span>
            <span className="text-purple-300 font-bold">{step.mask}_2</span>
          </div>
        )}
      </div>

      {/* Result Card */}
      {step.result && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-sm font-bold">
          <span>Formula Output: {step.result}</span>
        </div>
      )}
    </div>
  );
}

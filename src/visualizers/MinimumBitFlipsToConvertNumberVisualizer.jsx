import React from 'react';

export const meta = {
  title: 'Minimum Bit Flips to Convert Number',
  category: 'Bit Manipulation',
  difficulty: 'Easy',
  timeComplexity: 'O(number of set bits)',
  spaceComplexity: 'O(1)',
  description: 'Finds the minimum number of bit flips required to convert integer start into goal by computing start ^ goal and counting set bits using Brian Kernighan algorithm.'
};

export const solutions = {
  cpp: `// C++ Minimum Bit Flips via XOR & Brian Kernighan
// Time: O(set bits) | Space: O(1)
#include <iostream>
using namespace std;

class Solution {
public:
    int minBitFlips(int start, int goal) {
        int xorVal = start ^ goal;
        int count = 0;

        // Brian Kernighan's algorithm to count set bits
        while (xorVal > 0) {
            xorVal = xorVal & (xorVal - 1);
            count++;
        }

        return count;
    }
};`,
  python: `# Python 3 Minimum Bit Flips via XOR
class Solution:
    def minBitFlips(self, start: int, goal: int) -> int:
        xor_val = start ^ goal
        count = 0
        while xor_val > 0:
            xor_val &= (xor_val - 1)
            count += 1
        return count`,
  java: `// Java Minimum Bit Flips via XOR
class Solution {
    public int minBitFlips(int start, int goal) {
        int xorVal = start ^ goal;
        int count = 0;
        while (xorVal > 0) {
            xorVal = xorVal & (xorVal - 1);
            count++;
        }
        return count;
    }
}`,
  javascript: `// JavaScript Minimum Bit Flips via XOR
var minBitFlips = function(start, goal) {
    let xorVal = start ^ goal;
    let count = 0;
    while (xorVal > 0) {
        xorVal = xorVal & (xorVal - 1);
        count++;
    }
    return count;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: start = 10 (1010_2), goal = 7 (0111_2)',
    phase: 'INITIAL',
    codeLine: 10,
    start: 10,
    goal: 7,
    xorVal: null,
    binaryStart: '1010',
    binaryGoal: '0111',
    binaryXor: null,
    count: 0,
    variables: { start: 10, goal: 7, startBin: '1010', goalBin: '0111' },
    explain: 'Each position where start has a different bit from goal requires a flip. Bitwise XOR outputs 1 exactly where bits differ.',
    intuition: 'minBitFlips(start, goal) is identical to counting the number of 1s in (start ^ goal).'
  },
  {
    title: '2. Compute XOR: start ^ goal = 10 ^ 7 = 13 (1101_2)',
    phase: 'XOR_COMPUTATION',
    codeLine: 11,
    start: 10,
    goal: 7,
    xorVal: 13,
    binaryStart: '1010',
    binaryGoal: '0111',
    binaryXor: '1101',
    count: 0,
    variables: { 'start ^ goal': '1010 ^ 0111 = 1101 (13)', differingBits: 3 },
    explain: 'Bits at positions 0, 2, and 3 differ between start and goal. There are 3 set bits to count.',
    intuition: 'Each 1 in xorVal corresponds to one required bit flip.'
  },
  {
    title: '3. Kernighan Iteration 1: xorVal = 13 & 12 = 12 (1100_2)',
    phase: 'KERNIGHAN_STEP',
    codeLine: 16,
    start: 10,
    goal: 7,
    xorVal: 12,
    binaryStart: '1010',
    binaryGoal: '0111',
    binaryXor: '1100',
    count: 1,
    variables: { '13 & (13 - 1)': '13 & 12 = 12', count: 1 },
    explain: 'Rightmost set bit at position 0 is cleared. Flip count increments to 1.',
    intuition: 'One bit flip accounted for.'
  },
  {
    title: '4. Kernighan Iteration 2: xorVal = 12 & 11 = 8 (1000_2)',
    phase: 'KERNIGHAN_STEP',
    codeLine: 16,
    start: 10,
    goal: 7,
    xorVal: 8,
    binaryStart: '1010',
    binaryGoal: '0111',
    binaryXor: '1000',
    count: 2,
    variables: { '12 & (12 - 1)': '12 & 11 = 8', count: 2 },
    explain: 'Rightmost set bit at position 2 is cleared. Flip count increments to 2.',
    intuition: 'Second bit flip accounted for.'
  },
  {
    title: '5. Kernighan Iteration 3: xorVal = 8 & 7 = 0 (0000_2)',
    phase: 'KERNIGHAN_STEP',
    codeLine: 16,
    start: 10,
    goal: 7,
    xorVal: 0,
    binaryStart: '1010',
    binaryGoal: '0111',
    binaryXor: '0000',
    count: 3,
    variables: { '8 & (8 - 1)': '8 & 7 = 0', count: 3, termination: 'xorVal reaches 0' },
    explain: 'Rightmost set bit at position 3 is cleared. xorVal becomes 0, terminating loop.',
    intuition: 'All differing bits cleared.'
  },
  {
    title: '6. Result: 3 Bit Flips Required',
    phase: 'RESULT',
    codeLine: 20,
    start: 10,
    goal: 7,
    xorVal: 0,
    binaryStart: '1010',
    binaryGoal: '0111',
    binaryXor: '0000',
    count: 3,
    variables: { finalFlips: 3, complexity: 'O(number of set bits)' },
    explain: 'To convert 10 into 7, exactly 3 bit flips are required.',
    intuition: 'Kernighan algorithm counted 3 set bits in only 3 loop iterations.'
  }
];

export default function MinimumBitFlipsToConvertNumberVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Start = {step.start} &rarr; Goal = {step.goal}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
          Flips Count: {step.count}
        </span>
      </div>

      {/* Bit Register Table */}
      <div className="w-full p-6 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col gap-3 font-mono">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--chalk-dim)] w-28">Start (10):</span>
          <div className="flex items-center gap-2">
            {step.binaryStart.split('').map((b, i) => (
              <div key={i} className="w-10 h-10 rounded-lg border border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk)] flex items-center justify-center font-bold">
                {b}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--chalk-dim)] w-28">Goal (7):</span>
          <div className="flex items-center gap-2">
            {step.binaryGoal.split('').map((b, i) => (
              <div key={i} className="w-10 h-10 rounded-lg border border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk)] flex items-center justify-center font-bold">
                {b}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-[#272b3c] my-1" />

        {step.binaryXor && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-400 w-28 font-bold">XOR Diff:</span>
            <div className="flex items-center gap-2">
              {step.binaryXor.split('').map((b, i) => (
                <div key={i} className={`w-10 h-10 rounded-lg border flex items-center justify-center font-bold ${
                  b === '1' ? 'border-amber-400 bg-amber-500/25 text-amber-200 shadow-md shadow-amber-500/20' : 'border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk-faint)]'
                }`}>
                  {b}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Result Card */}
      {step.phase === 'RESULT' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 Minimum Bit Flips = {step.count}</span>
        </div>
      )}
    </div>
  );
}

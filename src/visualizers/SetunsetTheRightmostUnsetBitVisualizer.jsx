import React from 'react';

export const meta = {
  title: 'Set the Rightmost Unset Bit',
  category: 'Bit Manipulation',
  difficulty: 'Easy',
  timeComplexity: 'O(1)',
  spaceComplexity: 'O(1)',
  description: 'Sets the rightmost 0-bit to 1 using the identity n | (n + 1) in O(1) time, leaving all other bits intact.'
};

export const solutions = {
  cpp: `// C++ O(1) Bit Trick: Set Rightmost Unset Bit
#include <iostream>
using namespace std;

class Solution {
public:
    int setRightmostUnsetBit(int n) {
        // If all bits are already 1, (n & (n + 1)) == 0
        if ((n & (n + 1)) == 0) return n;
        
        // n + 1 flips the lowest 0 to 1 and resets lower 1s to 0
        // OR-ing with n restores lower 1s, leaving only the lowest 0 flipped
        return n | (n + 1);
    }
};`,
  python: `# Python 3 Set Rightmost Unset Bit
class Solution:
    def setRightmostUnsetBit(self, n: int) -> int:
        if (n & (n + 1)) == 0:
            return n
        return n | (n + 1)`,
  java: `// Java Set Rightmost Unset Bit
class Solution {
    public int setRightmostUnsetBit(int n) {
        if ((n & (n + 1)) == 0) return n;
        return n | (n + 1);
    }
}`,
  javascript: `// JavaScript Set Rightmost Unset Bit
var setRightmostUnsetBit = function(n) {
    if ((n & (n + 1)) === 0) return n;
    return n | (n + 1);
};`
};

export const steps = [
  {
    title: '1. Problem Setup: N = 9 (Binary: 00001001_2)',
    phase: 'INITIAL',
    codeLine: 11,
    n: 9,
    nPlusOne: 10,
    binaryN: '00001001',
    binaryNext: '00001010',
    binaryResult: null,
    unsetBitPos: 1,
    variables: { n: 9, 'binary 9': '00001001', target: 'Set rightmost 0-bit (bit 1)' },
    explain: 'Notice bit 0 is 1, but bit 1 is 0. Bit 1 is the rightmost unset bit. We want to convert it to 1, producing 11 (00001011_2).',
    intuition: 'We can achieve this without looping by exploiting carry propagation during addition.'
  },
  {
    title: '2. Compute (N + 1) = 10 (Binary: 00001010_2)',
    phase: 'ADD_ONE',
    codeLine: 16,
    n: 9,
    nPlusOne: 10,
    binaryN: '00001001',
    binaryNext: '00001010',
    binaryResult: null,
    unsetBitPos: 1,
    variables: { 'n + 1': 10, '10 in binary': '00001010', effect: 'Flips bit 0 to 0 and bit 1 to 1' },
    explain: 'Adding 1 generates carries that flip the lowest 0-bit (bit 1) to 1, while resetting all bits to its right to 0.',
    intuition: 'N + 1 isolates the rightmost 0-bit.'
  },
  {
    title: '3. Compute n | (n + 1): Bitwise OR',
    phase: 'BITWISE_OR',
    codeLine: 16,
    n: 9,
    nPlusOne: 10,
    binaryN: '00001001',
    binaryNext: '00001010',
    binaryResult: '00001011',
    unsetBitPos: 1,
    variables: { '9 | 10': '00001001 | 00001010 = 00001011 (11)' },
    explain: 'OR-ing 00001001 and 00001010 merges the 1 at bit 1 with original bit 0. Result is 11.',
    intuition: 'Rightmost unset bit at index 1 is now turned on.'
  },
  {
    title: '4. Result: 11 (00001011_2) Returned in O(1)',
    phase: 'RESULT',
    codeLine: 16,
    n: 11,
    nPlusOne: 10,
    binaryN: '00001011',
    binaryNext: '00001010',
    binaryResult: '00001011',
    unsetBitPos: 1,
    variables: { finalResult: 11, timeComplexity: 'O(1)', spaceComplexity: 'O(1)' },
    explain: 'The lowest 0-bit was set to 1 in constant time and zero auxiliary space.',
    intuition: 'Mathematical beauty of binary carry addition.'
  }
];

export default function SetunsetTheRightmostUnsetBitVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Operation: n | (n + 1)
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
          Rightmost 0-Bit: Position {step.unsetBitPos}
        </span>
      </div>

      {/* Bit Register Table */}
      <div className="w-full p-6 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col gap-4 font-mono">
        {/* Row 1: N */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--chalk-dim)] w-28">N (9):</span>
          <div className="flex items-center gap-1.5">
            {step.binaryN.split('').map((bit, idx) => {
              const bitPos = 7 - idx;
              const isTarget = bitPos === step.unsetBitPos;

              return (
                <div
                  key={idx}
                  className={`w-9 h-10 rounded-lg border flex items-center justify-center font-bold text-sm ${
                    isTarget ? 'border-amber-400 bg-amber-500/20 text-amber-200' : 'border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk)]'
                  }`}
                >
                  {bit}
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2: N + 1 */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--chalk-dim)] w-28">| (N + 1) (10):</span>
          <div className="flex items-center gap-1.5">
            {step.binaryNext.split('').map((bit, idx) => (
              <div
                key={idx}
                className="w-9 h-10 rounded-lg border border-[var(--line)] bg-[var(--board-raised)] text-[#5b6076] flex items-center justify-center font-bold text-sm"
              >
                {bit}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-[#272b3c] my-1" />

        {/* Row 3: Result */}
        {step.binaryResult && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-400 w-28 font-bold">Result (11):</span>
            <div className="flex items-center gap-1.5">
              {step.binaryResult.split('').map((bit, idx) => {
                const bitPos = 7 - idx;
                const isTarget = bitPos === step.unsetBitPos;

                return (
                  <div
                    key={idx}
                    className={`w-9 h-10 rounded-lg border flex items-center justify-center font-bold text-sm ${
                      isTarget ? 'border-emerald-400 bg-emerald-500/30 text-emerald-200 scale-110 shadow-lg shadow-emerald-500/30' : 'border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk)]'
                    }`}
                  >
                    {bit}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Result Card */}
      {step.phase === 'RESULT' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 Result = 11 (bit 1 flipped from 0 to 1)</span>
        </div>
      )}
    </div>
  );
}

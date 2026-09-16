import React from 'react';

export const meta = {
  title: 'Swap Two Numbers using XOR',
  category: 'Bit Manipulation',
  difficulty: 'Easy',
  timeComplexity: 'O(1)',
  spaceComplexity: 'O(1)',
  description: 'Swaps the values of two integer variables in-place without utilizing any third temporary variable, leveraging the self-inverse and commutative properties of bitwise XOR.'
};

export const solutions = {
  cpp: `// C++ In-Place Swap via Bitwise XOR
// Time: O(1) | Space: O(1)
#include <iostream>
using namespace std;

class Solution {
public:
    void swapNumbers(int &a, int &b) {
        a = a ^ b; // a now holds the composite difference (a ^ b)
        b = a ^ b; // b becomes (a ^ b) ^ b = a
        a = a ^ b; // a becomes (a ^ b) ^ a = b
    }
};`,
  python: `# Python 3 In-Place Swap via Bitwise XOR
class Solution:
    def swapNumbers(self, a: int, b: int) -> tuple[int, int]:
        a = a ^ b
        b = a ^ b
        a = a ^ b
        return a, b`,
  java: `// Java In-Place Swap via Bitwise XOR
class Solution {
    public void swap(int[] arr) {
        // arr[0] = a, arr[1] = b
        arr[0] = arr[0] ^ arr[1];
        arr[1] = arr[0] ^ arr[1];
        arr[0] = arr[0] ^ arr[1];
    }
}`,
  javascript: `// JavaScript In-Place Swap via Bitwise XOR
var swapNumbers = function(a, b) {
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;
    return [a, b];
};`
};

export const steps = [
  {
    title: '1. Initial State: a = 5 (0101_2), b = 9 (1001_2)',
    phase: 'INITIAL',
    codeLine: 10,
    a: 5,
    b: 9,
    binaryA: '0101',
    binaryB: '1001',
    variables: { a: 5, b: 9, 'a in binary': '0101', 'b in binary': '1001' },
    explain: 'Bitwise XOR has two core properties: x ^ x = 0 (self-inverse) and x ^ 0 = x (identity). These allow reversible storage in-place.',
    intuition: 'No auxiliary temp variable is needed.'
  },
  {
    title: '2. Step 1: a = a ^ b => a = 5 ^ 9 = 12 (1100_2)',
    phase: 'XOR_STEP_1',
    codeLine: 11,
    a: 12,
    b: 9,
    binaryA: '1100',
    binaryB: '1001',
    variables: { 'a ^ b': '0101 ^ 1001 = 1100 (12)', a: 12, b: 9 },
    explain: 'a now stores the combined XOR mask of both original values.',
    intuition: 'Variable a now holds the difference bits.'
  },
  {
    title: '3. Step 2: b = a ^ b => b = 12 ^ 9 = 5 (0101_2)',
    phase: 'XOR_STEP_2',
    codeLine: 12,
    a: 12,
    b: 5,
    binaryA: '1100',
    binaryB: '0101',
    variables: { 'a ^ b': '1100 ^ 1001 = 0101 (5)', a: 12, b: 5, 'b status': 'Original a restored into b!' },
    explain: 'b = (a_orig ^ b_orig) ^ b_orig = a_orig ^ (b_orig ^ b_orig) = a_orig ^ 0 = 5! b now holds original a.',
    intuition: 'b successfully receives original value of a.'
  },
  {
    title: '4. Step 3: a = a ^ b => a = 12 ^ 5 = 9 (1001_2)',
    phase: 'XOR_STEP_3',
    codeLine: 13,
    a: 9,
    b: 5,
    binaryA: '1001',
    binaryB: '0101',
    variables: { 'a ^ b': '1100 ^ 0101 = 1001 (9)', a: 9, b: 5, 'a status': 'Original b restored into a!' },
    explain: 'a = (a_orig ^ b_orig) ^ a_orig = b_orig = 9! a now holds original b.',
    intuition: 'a successfully receives original value of b.'
  },
  {
    title: '5. Swap Complete: a = 9, b = 5',
    phase: 'RESULT',
    codeLine: 14,
    a: 9,
    b: 5,
    binaryA: '1001',
    binaryB: '0101',
    variables: { finalA: 9, finalB: 5, auxSpace: 'O(1) in-place' },
    explain: 'The values of a and b have swapped places entirely through register-level XOR operations without allocating memory.',
    intuition: 'Safe and optimal bitwise swap.'
  }
];

export default function SwapTwoNumbersVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Bitwise XOR In-Place Swap
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
          Aux Space: O(1)
        </span>
      </div>

      {/* Visual Value Cards */}
      <div className="w-full p-6 rounded-2xl bg-[#161824] border border-[#272b3c] flex items-center justify-around gap-4 font-mono">
        {/* Variable A Card */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-amber-400 font-bold">Variable A:</span>
          <div className="w-24 h-24 rounded-2xl border-2 border-amber-400/60 bg-amber-500/15 text-amber-200 flex flex-col items-center justify-center gap-1 shadow-lg shadow-amber-500/20">
            <span className="text-3xl font-bold">{step.a}</span>
            <span className="text-xs text-[#8a8ea3]">{step.binaryA}_2</span>
          </div>
        </div>

        <div className="text-2xl font-bold text-[#8a8ea3]">&hArr;</div>

        {/* Variable B Card */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-cyan-400 font-bold">Variable B:</span>
          <div className="w-24 h-24 rounded-2xl border-2 border-cyan-400/60 bg-cyan-500/15 text-cyan-200 flex flex-col items-center justify-center gap-1 shadow-lg shadow-cyan-500/20">
            <span className="text-3xl font-bold">{step.b}</span>
            <span className="text-xs text-[#8a8ea3]">{step.binaryB}_2</span>
          </div>
        </div>
      </div>

      {/* Result Card */}
      {step.phase === 'RESULT' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 Swapped: a is now {step.a}, b is now {step.b}</span>
        </div>
      )}
    </div>
  );
}

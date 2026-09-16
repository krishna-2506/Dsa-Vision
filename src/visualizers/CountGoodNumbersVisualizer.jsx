import React from 'react';

export const meta = {
  title: 'Count Good Numbers',
  category: 'Recursion',
  difficulty: 'Medium',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1) iterative / O(log N) recursive',
  description: 'Calculates the number of good digit strings of length N where even indices have 5 choices (even digits) and odd indices have 4 choices (prime digits) using modular exponentiation: (5^((n+1)/2) * 4^(n/2)) % (10^9 + 7).'
};

export const solutions = {
  cpp: `// C++ Count Good Numbers via Modular Exponentiation
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <iostream>
using namespace std;

class Solution {
    long long power(long long base, long long exp, long long mod) {
        long long res = 1;
        base %= mod;
        while (exp > 0) {
            if (exp % 2 == 1) res = (res * base) % mod;
            base = (base * base) % mod;
            exp /= 2;
        }
        return res;
    }

public:
    int countGoodNumbers(long long n) {
        long long mod = 1e9 + 7;
        long long evenPositions = (n + 1) / 2; // Indices 0, 2, 4... (5 choices: 0,2,4,6,8)
        long long oddPositions = n / 2;       // Indices 1, 3, 5... (4 choices: 2,3,5,7)

        long long waysEven = power(5, evenPositions, mod);
        long long waysOdd = power(4, oddPositions, mod);

        return (waysEven * waysOdd) % mod;
    }
};`,
  python: `# Python 3 Count Good Numbers via Modular Exponentiation
class Solution:
    def countGoodNumbers(self, n: int) -> int:
        MOD = 10**9 + 7
        even_positions = (n + 1) // 2
        odd_positions = n // 2

        ways_even = pow(5, even_positions, MOD)
        ways_odd = pow(4, odd_positions, MOD)

        return (ways_even * ways_odd) % MOD`,
  java: `// Java Count Good Numbers via Modular Exponentiation
class Solution {
    private final long MOD = 1_000_000_007;

    private long power(long base, long exp) {
        long res = 1;
        base %= MOD;
        while (exp > 0) {
            if (exp % 2 == 1) res = (res * base) % MOD;
            base = (base * base) % MOD;
            exp /= 2;
        }
        return res;
    }

    public int countGoodNumbers(long n) {
        long evenPositions = (n + 1) / 2;
        long oddPositions = n / 2;

        long waysEven = power(5, evenPositions);
        long waysOdd = power(4, oddPositions);

        return (int) ((waysEven * waysOdd) % MOD);
    }
}`,
  javascript: `// JavaScript Count Good Numbers via Modular Exponentiation
var countGoodNumbers = function(n) {
    const MOD = 1000000007n;
    const bigN = BigInt(n);

    const power = (base, exp) => {
        let res = 1n;
        base = base % MOD;
        while (exp > 0n) {
            if (exp % 2n === 1n) res = (res * base) % MOD;
            base = (base * base) % MOD;
            exp = exp / 2n;
        }
        return res;
    };

    const evenPositions = (bigN + 1n) / 2n;
    const oddPositions = bigN / 2n;

    const waysEven = power(5n, evenPositions);
    const waysOdd = power(4n, oddPositions);

    return Number((waysEven * waysOdd) % MOD);
};`
};

export const steps = [
  {
    title: '1. Problem Setup: String Length N = 4',
    phase: 'INITIAL',
    codeLine: 19,
    n: 4,
    evenCount: 2,
    oddCount: 2,
    waysEven: null,
    waysOdd: null,
    totalGood: null,
    variables: { n: 4, formula: '(5^even * 4^odd) % (10^9 + 7)', modulo: '10^9 + 7' },
    explain: 'For length N = 4, indices are [0, 1, 2, 3]. Even positions (0, 2) must contain even digits {0, 2, 4, 6, 8} (5 options). Odd positions (1, 3) must contain prime digits {2, 3, 5, 7} (4 options).',
    intuition: 'Combinatorics rule of product: total choices = 5^(evenCount) * 4^(oddCount).'
  },
  {
    title: '2. Compute Even Positions: (4 + 1) / 2 = 2 positions',
    phase: 'EVEN_POSITIONS',
    codeLine: 20,
    n: 4,
    evenCount: 2,
    oddCount: 2,
    waysEven: 25,
    waysOdd: null,
    totalGood: null,
    variables: { evenPositions: 2, choicesPerPosition: 5, calculation: '5^2 = 25' },
    explain: 'Indices 0 and 2 have 5 choices each: 5 * 5 = 25 ways to fill even positions.',
    intuition: 'Evaluated using modular binary exponentiation in O(log N).'
  },
  {
    title: '3. Compute Odd Positions: 4 / 2 = 2 positions',
    phase: 'ODD_POSITIONS',
    codeLine: 21,
    n: 4,
    evenCount: 2,
    oddCount: 2,
    waysEven: 25,
    waysOdd: 16,
    totalGood: null,
    variables: { oddPositions: 2, choicesPerPosition: 4, calculation: '4^2 = 16' },
    explain: 'Indices 1 and 3 have 4 choices each: 4 * 4 = 16 ways to fill odd positions.',
    intuition: 'Second modular power calculated in O(log N).'
  },
  {
    title: '4. Multiply Choices: (25 * 16) % (10^9 + 7) = 400',
    phase: 'RESULT',
    codeLine: 26,
    n: 4,
    evenCount: 2,
    oddCount: 2,
    waysEven: 25,
    waysOdd: 16,
    totalGood: 400,
    variables: { product: '25 * 16 = 400', finalAnswer: 400, complexity: 'O(log N)' },
    explain: 'Total valid good numbers of length 4 is 400. Computation completes in logarithmic time without generating combinations.',
    intuition: 'Modular exponentiation computes good numbers for N up to 10^15 effortlessly.'
  }
];

export default function CountGoodNumbersVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          N = {step.n} Digits
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
          (5^{step.evenCount} &times; 4^{step.oddCount}) % (10^9 + 7)
        </span>
      </div>

      {/* Visual Digit Slots */}
      <div className="w-full p-6 rounded-2xl bg-[#161824] border border-[#272b3c] flex items-center justify-around font-mono">
        {Array.from({ length: step.n }).map((_, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div key={idx} className="flex flex-col items-center gap-2">
              <span className="text-xs text-[#8a8ea3]">Idx {idx}</span>
              <div className={`w-14 h-16 rounded-xl border-2 flex flex-col items-center justify-center gap-0.5 ${
                isEven ? 'border-amber-400 bg-amber-500/15 text-amber-300' : 'border-cyan-400 bg-cyan-500/15 text-cyan-300'
              }`}>
                <span className="text-xl font-bold">{isEven ? '5' : '4'}</span>
                <span className="text-[9px] text-[#8a8ea3]">ways</span>
              </div>
              <span className={`text-[10px] font-bold ${isEven ? 'text-amber-400' : 'text-cyan-400'}`}>
                {isEven ? 'EVEN DIGIT' : 'PRIME DIGIT'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Multiplication Formula Banner */}
      <div className="w-full p-4 rounded-xl bg-[#12131b] border border-[#202436] flex items-center justify-around font-mono text-sm">
        <div className="flex items-center gap-2">
          <span className="text-amber-300">Even Ways (5^{step.evenCount}):</span>
          <strong className="text-white">{step.waysEven ?? '?'}</strong>
        </div>
        <span className="text-[#8a8ea3]">&times;</span>
        <div className="flex items-center gap-2">
          <span className="text-cyan-300">Odd Ways (4^{step.oddCount}):</span>
          <strong className="text-white">{step.waysOdd ?? '?'}</strong>
        </div>
        <span className="text-[#8a8ea3]">=</span>
        <div className="flex items-center gap-2">
          <strong className="text-emerald-400 text-lg">{step.totalGood ?? '?'}</strong>
        </div>
      </div>
    </div>
  );
}

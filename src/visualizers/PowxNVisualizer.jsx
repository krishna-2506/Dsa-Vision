import React from 'react';

export const meta = {
  title: 'Pow(x, n) - Binary Exponentiation',
  category: 'Recursion / Math',
  difficulty: 'Medium',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1) iterative / O(log N) recursive',
  description: 'Calculates x raised to the power n using binary exponentiation, halving the power n at each step by squaring the base x.'
};

export const solutions = {
  cpp: `// C++ Pow(x, n) (Binary Exponentiation)
// Time: O(log N) | Space: O(1)
class Solution {
public:
    double myPow(double x, int n) {
        long long N = n;
        if (N < 0) {
            x = 1.0 / x;
            N = -N;
        }

        double ans = 1.0;
        double currentProduct = x;

        while (N > 0) {
            // If N is odd, multiply ans by current base
            if (N % 2 == 1) {
                ans *= currentProduct;
                N -= 1;
            } else {
                // If N is even, square the base and halve the exponent
                currentProduct *= currentProduct;
                N /= 2;
            }
        }

        return ans;
    }
};`,
  python: `# Python 3 Pow(x, n) (Binary Exponentiation)
class Solution:
    def myPow(self, x: float, n: int) -> float:
        N = n
        if N < 0:
            x = 1.0 / x
            N = -N

        ans = 1.0
        curr = x

        while N > 0:
            if N % 2 == 1:
                ans *= curr
                N -= 1
            else:
                curr *= curr
                N //= 2

        return ans`,
  java: `// Java Pow(x, n) (Binary Exponentiation)
class Solution {
    public double myPow(double x, int n) {
        long N = n;
        if (N < 0) {
            x = 1.0 / x;
            N = -N;
        }

        double ans = 1.0;
        double curr = x;

        while (N > 0) {
            if (N % 2 == 1) {
                ans *= curr;
                N -= 1;
            } else {
                curr *= curr;
                N /= 2;
            }
        }

        return ans;
    }
}`,
  javascript: `// JavaScript Pow(x, n) (Binary Exponentiation)
var myPow = function(x, n) {
    let N = n;
    if (N < 0) {
        x = 1 / x;
        N = -N;
    }

    let ans = 1.0;
    let curr = x;

    while (N > 0) {
        if (N % 2 === 1) {
            ans *= curr;
            N -= 1;
        } else {
            curr *= curr;
            N /= 2;
        }
    }

    return ans;
};`
};

export const steps = [
  {
    title: '1. Calculate 2.0^10: Base x = 2.0, Exponent N = 10',
    phase: 'INITIAL',
    codeLine: 12,
    base: 2.0,
    exponent: 10,
    ans: 1.0,
    currentProduct: 2.0,
    isOdd: false,
    variables: { x: 2.0, n: 10, ans: 1.0 },
    explain: 'Instead of multiplying 2 ten times linearly O(N), we can square base x whenever exponent n is even, reaching logarithmic O(log N) time.',
    intuition: '2^10 = (2^2)^5 = 4^5.'
  },
  {
    title: '2. N = 10 (Even): Square base (2^2 = 4.0), Halve N (10 / 2 = 5)',
    phase: 'EVEN_SQUARE',
    codeLine: 24,
    base: 2.0,
    exponent: 5,
    ans: 1.0,
    currentProduct: 4.0,
    isOdd: false,
    variables: { N: 5, currentBase: 4.0, ans: 1.0 },
    explain: 'N=10 is even. Square current base: 2 * 2 = 4.0. Exponent N becomes 5.',
    intuition: '2^10 is equivalent to 4^5.'
  },
  {
    title: '3. N = 5 (Odd): ans *= currentBase (1.0 * 4.0 = 4.0), N -= 1 -> N = 4',
    phase: 'ODD_MULTIPLY',
    codeLine: 18,
    base: 2.0,
    exponent: 4,
    ans: 4.0,
    currentProduct: 4.0,
    isOdd: true,
    variables: { N: 4, currentBase: 4.0, ans: 4.0 },
    explain: 'N=5 is odd. Multiply ans by current base: ans = 1.0 * 4.0 = 4.0. Decrement N to 4.',
    intuition: '4^5 = 4 * 4^4.'
  },
  {
    title: '4. N = 4 (Even): Square base (4^2 = 16.0), Halve N (4 / 2 = 2)',
    phase: 'EVEN_SQUARE',
    codeLine: 24,
    base: 2.0,
    exponent: 2,
    ans: 4.0,
    currentProduct: 16.0,
    isOdd: false,
    variables: { N: 2, currentBase: 16.0, ans: 4.0 },
    explain: 'N=4 is even. Square base: 4 * 4 = 16.0. Exponent N becomes 2.',
    intuition: '4^4 = (4^2)^2 = 16^2.'
  },
  {
    title: '5. N = 2 (Even): Square base (16^2 = 256.0), Halve N (2 / 2 = 1)',
    phase: 'EVEN_SQUARE',
    codeLine: 24,
    base: 2.0,
    exponent: 1,
    ans: 4.0,
    currentProduct: 256.0,
    isOdd: false,
    variables: { N: 1, currentBase: 256.0, ans: 4.0 },
    explain: 'N=2 is even. Square base: 16 * 16 = 256.0. Exponent N becomes 1.',
    intuition: '16^2 = 256^1.'
  },
  {
    title: '6. N = 1 (Odd): ans *= 256.0 -> ans = 4.0 * 256.0 = 1024.0, N = 0',
    phase: 'COMPLETED',
    codeLine: 18,
    base: 2.0,
    exponent: 0,
    ans: 1024.0,
    currentProduct: 256.0,
    isOdd: true,
    variables: { result: 1024.0, totalMultiplications: 4 },
    explain: 'Final odd multiplication: 4.0 * 256.0 = 1024.0. Exponent reaches 0. Total steps: only 4 iterations instead of 10!',
    intuition: 'Binary exponentiation completes in O(log N) operations.'
  }
];

export default function PowxNVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Remaining Exponent N: {step.exponent} ({step.exponent % 2 === 1 ? 'ODD' : 'EVEN'})
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Current Base Product: {step.currentProduct}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Accumulated Ans = {step.ans}
        </span>
      </div>

      {/* Exponentiation Gauge Card */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-6 flex flex-col items-center gap-4">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider">Binary Exponentiation Registers</span>

        <div className="grid grid-cols-3 gap-4 w-full">
          <div className="p-3 rounded-xl border border-[var(--line)] bg-[var(--board-raised-2)] flex flex-col items-center justify-center font-mono">
            <span className="text-[10px] text-[var(--chalk-dim)]">EXPONENT (N)</span>
            <span className="text-2xl font-black text-amber-300 mt-1">{step.exponent}</span>
            <span className="text-[10px] text-[var(--chalk-faint)] mt-1">{step.exponent.toString(2)} in binary</span>
          </div>

          <div className="p-3 rounded-xl border border-blue-500/30 bg-blue-500/10 flex flex-col items-center justify-center font-mono">
            <span className="text-[10px] text-blue-300">CURRENT BASE (x)</span>
            <span className="text-xl font-black text-blue-300 mt-1">{step.currentProduct}</span>
            <span className="text-[10px] text-[var(--chalk-dim)] mt-1">x ← x²</span>
          </div>

          <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex flex-col items-center justify-center font-mono">
            <span className="text-[10px] text-emerald-300">ACCUMULATOR (ans)</span>
            <span className="text-xl font-black text-emerald-300 mt-1">{step.ans}</span>
            <span className="text-[10px] text-[var(--chalk-dim)] mt-1">ans ← ans · x</span>
          </div>
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 text-xs font-mono text-center text-[var(--chalk-dim)]">
        {step.explain}
      </div>
    </div>
  );
}

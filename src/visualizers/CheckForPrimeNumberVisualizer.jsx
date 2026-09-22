import React from 'react';

export const meta = {
  title: 'Check for Prime Number',
  category: 'Basic Maths',
  difficulty: 'Easy',
  timeComplexity: 'O(√N)',
  spaceComplexity: 'O(1)',
  description: 'Determines if a given integer N is a prime number by testing potential divisors up to √N.'
};

export const solutions = {
  cpp: `// C++ Prime Number Check (Optimal O(√N))
// Time Complexity: O(√N) | Space Complexity: O(1)
class Solution {
public:
    bool isPrime(int n) {
        if (n <= 1) return false;

        // Check divisors only up to √n
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                return false; // Found a divisor, composite
            }
        }

        return true; // No divisors found, prime
    }
};`,
  python: `# Python 3 Prime Check
import math

class Solution:
    def isPrime(self, n: int) -> bool:
        if n <= 1:
            return False
            
        for i in range(2, int(math.isqrt(n)) + 1):
            if n % i == 0:
                return False
                
        return True`,
  java: `// Java Prime Check
class Solution {
    public boolean isPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
}`,
  javascript: `// JavaScript Prime Check
var isPrime = function(n) {
    if (n <= 1) return false;
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false;
    }
    return true;
};`
};

export const steps = [
  {
    title: '1. Setup: Test N = 37 up to √37 ≈ 6.08',
    phase: 'INITIALIZATION',
    codeLine: 9,
    n: 37,
    currentI: 2,
    testedDivisors: [],
    foundDivisor: null,
    variables: { n: 37, 'limit (√n)': 6, i: 2 },
    explain: 'To test if 37 is prime, we only need to test divisors up to √37 (i.e. i * i <= 37, max i = 6). Any factor pair > 6 would have a partner < 6.',
    intuition: 'If n = a * b and both a, b > √n, then a * b > n (contradiction). Hence one factor must be <= √n.'
  },
  {
    title: '2. Test i = 2: 37 % 2 = 1 (Not Divisible)',
    phase: 'TESTING_DIVISOR',
    codeLine: 10,
    n: 37,
    currentI: 2,
    testedDivisors: [{ i: 2, rem: 1, divides: false }],
    foundDivisor: null,
    variables: { i: 2, '37 % 2': 1, divides: false },
    explain: '37 divided by 2 gives remainder 1. 2 does not divide 37. Advance i to 3.',
    intuition: 'Odd numbers are not divisible by 2.'
  },
  {
    title: '3. Test i = 3: 37 % 3 = 1 (Not Divisible)',
    phase: 'TESTING_DIVISOR',
    codeLine: 10,
    n: 37,
    currentI: 3,
    testedDivisors: [
      { i: 2, rem: 1, divides: false },
      { i: 3, rem: 1, divides: false }
    ],
    foundDivisor: null,
    variables: { i: 3, '37 % 3': 1, divides: false },
    explain: 'Sum of digits 3 + 7 = 10, not divisible by 3. 37 % 3 = 1. Advance i to 4.',
    intuition: 'Divisibility test continues.'
  },
  {
    title: '4. Test i = 4 & i = 5: Remainder != 0',
    phase: 'TESTING_DIVISOR',
    codeLine: 10,
    n: 37,
    currentI: 5,
    testedDivisors: [
      { i: 2, rem: 1, divides: false },
      { i: 3, rem: 1, divides: false },
      { i: 4, rem: 1, divides: false },
      { i: 5, rem: 2, divides: false }
    ],
    foundDivisor: null,
    variables: { i: 5, '37 % 5': 2, divides: false },
    explain: '37 % 4 = 1, 37 % 5 = 2. Neither divides 37.',
    intuition: 'No factors found in 2, 3, 4, 5.'
  },
  {
    title: '5. Test i = 6: 37 % 6 = 1 (Final Divisor Check)',
    phase: 'BOUNDARY_REACHED',
    codeLine: 10,
    n: 37,
    currentI: 6,
    testedDivisors: [
      { i: 2, rem: 1, divides: false },
      { i: 3, rem: 1, divides: false },
      { i: 4, rem: 1, divides: false },
      { i: 5, rem: 2, divides: false },
      { i: 6, rem: 1, divides: false }
    ],
    foundDivisor: null,
    variables: { i: 6, 'i*i': 36, '37 % 6': 1, nextI: '7 (7*7=49 > 37)' },
    explain: 'Final check: i = 6, 6*6 = 36 <= 37. 37 % 6 = 1. Next i = 7 has 7*7 = 49 > 37, which exceeds our √N limit!',
    intuition: 'Loop terminates because i * i > n.'
  },
  {
    title: '6. Conclusion: 37 is a PRIME Number! ✓',
    phase: 'COMPLETED',
    codeLine: 15,
    n: 37,
    currentI: null,
    testedDivisors: [
      { i: 2, rem: 1, divides: false },
      { i: 3, rem: 1, divides: false },
      { i: 4, rem: 1, divides: false },
      { i: 5, rem: 2, divides: false },
      { i: 6, rem: 1, divides: false }
    ],
    foundDivisor: null,
    variables: { isPrime: true, timeComplexity: 'O(√37) = 5 checks' },
    explain: 'No divisors found in range [2 ... √37]. Therefore, 37 is guaranteed to be a PRIME number!',
    intuition: 'O(√N) reduces checks from 37 iterations to just 5 iterations.'
  }
];

export default function CheckForPrimeNumberVisualizer({ currentStep = 0, onStepChange }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Target Number Display */}
      <div className="flex items-center gap-4">
        <div className="px-6 py-3 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-center">
          <span className="text-[10px] font-mono text-indigo-400 uppercase font-semibold block">Target Integer N</span>
          <span className="text-3xl font-mono font-bold text-[var(--chalk)]">{step.n}</span>
        </div>

        <div className="px-5 py-3 rounded-2xl bg-[#14151c] border border-[#262834] text-center">
          <span className="text-[10px] font-mono text-[#8e92a4] uppercase font-semibold block">Inspection Limit (√N)</span>
          <span className="text-xl font-mono font-bold text-amber-400">i ≤ 6 (6² = 36)</span>
        </div>
      </div>

      {/* Divisors Inspection Grid */}
      <div className="w-full p-4 rounded-2xl bg-[#0c0d12] border border-[#20222a] space-y-3">
        <h4 className="text-xs font-mono font-semibold text-[#8e92a4] uppercase tracking-wider">
          Divisor Checks (2 to 6)
        </h4>

        <div className="grid grid-cols-5 gap-2.5">
          {[2, 3, 4, 5, 6].map((divisor) => {
            const isTested = step.testedDivisors.some((d) => d.i === divisor);
            const isCurrent = step.currentI === divisor;

            let cardStyle = 'border-[#262834] bg-[#14151c] text-[#5b5e6e]';
            if (isCurrent) cardStyle = 'border-amber-500 bg-amber-500/20 text-amber-300 scale-105 shadow-md shadow-amber-500/25';
            else if (isTested) cardStyle = 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';

            return (
              <div key={divisor} className={`p-3 rounded-xl border flex flex-col items-center gap-1 font-mono transition-all ${cardStyle}`}>
                <span className="text-xs text-[#8e92a4]">i = {divisor}</span>
                <span className="text-base font-bold text-[var(--chalk)]">37 % {divisor}</span>
                <span className="text-[11px] font-semibold">
                  {isTested ? 'rem = ' + (37 % divisor) + ' ✗' : isCurrent ? 'testing...' : 'waiting'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

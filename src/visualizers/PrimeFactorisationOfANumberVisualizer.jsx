import React from 'react';

export const meta = {
  title: 'Prime Factorisation of a Number',
  category: 'Math',
  difficulty: 'Easy',
  timeComplexity: 'O(sqrt(N))',
  spaceComplexity: 'O(log N)',
  description: 'Decomposes an integer N into its constituent prime factors using trial division up to sqrt(N), peeling off repeated prime factors at each step.'
};

export const solutions = {
  cpp: `// C++ Prime Factorisation in O(sqrt(N)) Time
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> primeFactors(int n) {
        vector<int> factors;

        for (int i = 2; i * i <= n; i++) {
            while (n % i == 0) {
                factors.push_back(i);
                n /= i;
            }
        }

        // If n is still greater than 1, the remainder is a prime factor
        if (n > 1) {
            factors.push_back(n);
        }

        return factors;
    }
};`,
  python: `# Python 3 Prime Factorisation in O(sqrt(N))
class Solution:
    def primeFactors(self, n: int) -> list[int]:
        factors = []
        i = 2
        while i * i <= n:
            while n % i == 0:
                factors.append(i)
                n //= i
            i += 1

        if n > 1:
            factors.append(n)

        return factors`,
  java: `// Java Prime Factorisation in O(sqrt(N))
import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<Integer> primeFactors(int n) {
        List<Integer> factors = new ArrayList<>();

        for (int i = 2; i * i <= n; i++) {
            while (n % i == 0) {
                factors.add(i);
                n /= i;
            }
        }

        if (n > 1) {
            factors.add(n);
        }

        return factors;
    }
}`,
  javascript: `// JavaScript Prime Factorisation in O(sqrt(N))
var primeFactors = function(n) {
    const factors = [];

    for (let i = 2; i * i <= n; i++) {
        while (n % i === 0) {
            factors.push(i);
            n = Math.floor(n / i);
        }
    }

    if (n > 1) {
        factors.push(n);
    }

    return factors;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Prime Factorisation of N = 60',
    phase: 'INITIAL',
    codeLine: 10,
    n: 60,
    currentPrime: null,
    factors: [],
    variables: { n: 60, formula: 'Trial division up to sqrt(N)' },
    explain: 'Every composite number has at least one prime factor <= sqrt(N). By repeatedly dividing out smallest primes, any composite factor is decomposed.',
    intuition: 'Only prime numbers will ever divide N because all earlier multiples have already been stripped.'
  },
  {
    title: '2. Divide by 2: 60 / 2 = 30, then 30 / 2 = 15',
    phase: 'DIVIDE_PRIME',
    codeLine: 13,
    n: 15,
    currentPrime: 2,
    factors: [2, 2],
    variables: { prime: 2, '60 / 2': 30, '30 / 2': 15, factors: '[2, 2]', remainingN: 15 },
    explain: '2 divides 60 twice. Added two 2s to factors. Remaining N is 15.',
    intuition: 'All powers of 2 eliminated.'
  },
  {
    title: '3. Divide by 3: 15 / 3 = 5',
    phase: 'DIVIDE_PRIME',
    codeLine: 13,
    n: 5,
    currentPrime: 3,
    factors: [2, 2, 3],
    variables: { prime: 3, '15 / 3': 5, factors: '[2, 2, 3]', remainingN: 5 },
    explain: '3 divides 15 once. Factor 3 added. Remaining N is 5.',
    intuition: 'Next prime divisor.'
  },
  {
    title: '4. Check i = 4: 4 * 4 = 16 > 5. Loop Terminates!',
    phase: 'LOOP_EXIT',
    codeLine: 11,
    n: 5,
    currentPrime: 4,
    factors: [2, 2, 3],
    variables: { 'i * i': '4 * 4 = 16 > 5', status: 'Loop terminates' },
    explain: 'Since i * i > remaining N, no smaller composite factor exists. The remaining N must be prime!',
    intuition: 'Early termination condition met.'
  },
  {
    title: '5. Append Remaining Prime N (5): Complete Factorisation',
    phase: 'RESULT',
    codeLine: 20,
    n: 1,
    currentPrime: 5,
    factors: [2, 2, 3, 5],
    variables: { primeFactors: '[2, 2, 3, 5]', product: '2 * 2 * 3 * 5 = 60' },
    explain: 'Remaining N = 5 appended. Complete prime factors: 2, 2, 3, 5.',
    intuition: 'Prime factorization guaranteed complete.'
  }
];

export default function PrimeFactorisationOfANumberVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Target N = 60
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
          Remaining N = {step.n}
        </span>
      </div>

      {/* Factor Tree Cards */}
      <div className="w-full p-6 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col items-center gap-4 font-mono">
        <span className="text-xs text-[var(--chalk-dim)]">Extracted Prime Factors:</span>
        <div className="flex items-center gap-3 overflow-x-auto py-2">
          {step.factors.map((f, idx) => (
            <React.Fragment key={idx}>
              <div className="w-14 h-14 rounded-2xl border border-emerald-400 bg-emerald-500/20 text-emerald-200 flex items-center justify-center text-xl font-bold shadow-lg shadow-emerald-500/20">
                {f}
              </div>
              {idx < step.factors.length - 1 && (
                <span className="text-amber-400 font-bold text-lg">&times;</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Result Card */}
      {step.phase === 'RESULT' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 60 = 2&sup2; &times; 3 &times; 5 (Total {step.factors.length} Prime Factors)</span>
        </div>
      )}
    </div>
  );
}

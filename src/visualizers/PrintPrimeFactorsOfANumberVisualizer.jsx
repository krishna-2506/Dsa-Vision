import React from 'react';

export const meta = {
  title: 'Print Prime Factors of a Number',
  category: 'Math',
  difficulty: 'Medium',
  timeComplexity: 'O(sqrt(N))',
  spaceComplexity: 'O(unique prime factors)',
  description: 'Extracts all distinct (unique) prime factors of an integer N in O(sqrt(N)) time by stripping each prime completely once identified.'
};

export const solutions = {
  cpp: `// C++ Distinct Prime Factors in O(sqrt(N))
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> AllPrimeFactors(int n) {
        vector<int> distinctPrimes;

        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                distinctPrimes.push_back(i); // Add unique prime
                while (n % i == 0) {
                    n /= i; // Strip all occurrences
                }
            }
        }

        if (n > 1) {
            distinctPrimes.push_back(n);
        }

        return distinctPrimes;
    }
};`,
  python: `# Python 3 Distinct Prime Factors in O(sqrt(N))
class Solution:
    def AllPrimeFactors(self, n: int) -> list[int]:
        distinct_primes = []
        i = 2
        while i * i <= n:
            if n % i == 0:
                distinct_primes.append(i)
                while n % i == 0:
                    n //= i
            i += 1

        if n > 1:
            distinct_primes.append(n)

        return distinct_primes`,
  java: `// Java Distinct Prime Factors in O(sqrt(N))
import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<Integer> AllPrimeFactors(int n) {
        List<Integer> distinctPrimes = new ArrayList<>();

        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                distinctPrimes.add(i);
                while (n % i == 0) {
                    n /= i;
                }
            }
        }

        if (n > 1) {
            distinctPrimes.add(n);
        }

        return distinctPrimes;
    }
}`,
  javascript: `// JavaScript Distinct Prime Factors in O(sqrt(N))
var AllPrimeFactors = function(n) {
    const distinctPrimes = [];

    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) {
            distinctPrimes.push(i);
            while (n % i === 0) {
                n = Math.floor(n / i);
            }
        }
    }

    if (n > 1) {
        distinctPrimes.push(n);
    }

    return distinctPrimes;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Distinct Prime Factors of N = 84',
    phase: 'INITIAL',
    codeLine: 10,
    n: 84,
    currentPrime: null,
    distinctFactors: [],
    variables: { n: 84, target: 'Find all UNIQUE prime divisors' },
    explain: 'Unlike full prime factorisation (which includes multiplicity), we only record each prime divisor once.',
    intuition: 'Whenever N % i == 0, record i and divide N by i until N is no longer divisible by i.'
  },
  {
    title: '2. Check i = 2: 84 % 2 == 0 => Record Prime 2, Strip All 2s',
    phase: 'EXTRACT_PRIME',
    codeLine: 13,
    n: 21,
    currentPrime: 2,
    distinctFactors: [2],
    variables: { uniquePrime: 2, 'division': '84 -> 42 -> 21', remainingN: 21 },
    explain: '2 is recorded once in the list. While 21 is divisible by 2 (it is not), continue. Remaining N is 21.',
    intuition: 'All powers of 2 drained.'
  },
  {
    title: '3. Check i = 3: 21 % 3 == 0 => Record Prime 3, Strip All 3s',
    phase: 'EXTRACT_PRIME',
    codeLine: 13,
    n: 7,
    currentPrime: 3,
    distinctFactors: [2, 3],
    variables: { uniquePrime: 3, 'division': '21 / 3 = 7', remainingN: 7 },
    explain: '3 divides 21. Record 3. Remaining N becomes 7.',
    intuition: 'Factor 3 recorded.'
  },
  {
    title: '4. Check i = 4: 4 * 4 = 16 > 7. Loop Terminates!',
    phase: 'LOOP_EXIT',
    codeLine: 11,
    n: 7,
    currentPrime: 4,
    distinctFactors: [2, 3],
    variables: { 'i * i': '16 > 7', status: 'Loop terminates' },
    explain: 'i * i exceeds 7. No composite factor <= sqrt(7) exists.',
    intuition: '7 must be a prime factor.'
  },
  {
    title: '5. Append Remaining Prime N (7): Complete Distinct Prime Set',
    phase: 'RESULT',
    codeLine: 21,
    n: 1,
    currentPrime: 7,
    distinctFactors: [2, 3, 7],
    variables: { uniquePrimes: '[2, 3, 7]', timeComplexity: 'O(sqrt(N))' },
    explain: 'Distinct prime factors of 84 are [2, 3, 7].',
    intuition: 'Fast, clean distinct prime factor extraction.'
  }
];

export default function PrintPrimeFactorsOfANumberVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Target N = 84
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
          Remaining N = {step.n}
        </span>
      </div>

      {/* Unique Prime Badges */}
      <div className="w-full p-6 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col items-center gap-4 font-mono">
        <span className="text-xs text-[var(--chalk-dim)]">Distinct Prime Factors:</span>
        <div className="flex items-center gap-4 overflow-x-auto py-2">
          {step.distinctFactors.map((f, idx) => (
            <div
              key={idx}
              className="w-16 h-16 rounded-2xl border-2 border-emerald-400 bg-emerald-500/20 text-emerald-200 flex items-center justify-center text-2xl font-bold shadow-lg shadow-emerald-500/25"
            >
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Result Card */}
      {step.phase === 'RESULT' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 Unique Prime Divisors of 84: &#123; 2, 3, 7 &#125;</span>
        </div>
      )}
    </div>
  );
}

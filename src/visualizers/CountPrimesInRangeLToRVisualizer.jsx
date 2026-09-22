import React from 'react';

export const meta = {
  title: 'Count Primes in Range L to R',
  category: 'Bit Manipulation / Math',
  difficulty: 'Medium',
  timeComplexity: 'O(R log log R) precomputation, O(1) per query',
  spaceComplexity: 'O(R)',
  description: 'Counts the number of prime numbers within an arbitrary query range [L..R] using the Sieve of Eratosthenes paired with a prefix-sum counter array.'
};

export const solutions = {
  cpp: `// C++ Sieve of Eratosthenes with Prefix Sum
// Precomputation: O(R log log R) | Query: O(1)
#include <vector>
using namespace std;

class Solution {
    vector<int> buildPrefixPrimes(int maxR) {
        vector<int> prime(maxR + 1, 1);
        prime[0] = prime[1] = 0;

        for (int p = 2; p * p <= maxR; p++) {
            if (prime[p]) {
                for (int i = p * p; i <= maxR; i += p) {
                    prime[i] = 0;
                }
            }
        }

        vector<int> prefix(maxR + 1, 0);
        for (int i = 1; i <= maxR; i++) {
            prefix[i] = prefix[i - 1] + prime[i];
        }
        return prefix;
    }

public:
    int countPrimes(int L, int R) {
        vector<int> prefix = buildPrefixPrimes(R);
        return prefix[R] - prefix[L - 1];
    }
};`,
  python: `# Python 3 Sieve of Eratosthenes with Prefix Sum
class Solution:
    def countPrimes(self, L: int, R: int) -> int:
        prime = [1] * (R + 1)
        prime[0] = prime[1] = 0

        p = 2
        while p * p <= R:
            if prime[p]:
                for i in range(p * p, R + 1, p):
                    prime[i] = 0
            p += 1

        prefix = [0] * (R + 1)
        for i in range(1, R + 1):
            prefix[i] = prefix[i - 1] + prime[i]

        return prefix[R] - prefix[L - 1]`,
  java: `// Java Sieve of Eratosthenes with Prefix Sum
import java.util.Arrays;

class Solution {
    public int countPrimes(int L, int R) {
        int[] prime = new int[R + 1];
        Arrays.fill(prime, 1);
        prime[0] = prime[1] = 0;

        for (int p = 2; p * p <= R; p++) {
            if (prime[p] == 1) {
                for (int i = p * p; i <= R; i += p) {
                    prime[i] = 0;
                }
            }
        }

        int[] prefix = new int[R + 1];
        for (int i = 1; i <= R; i++) {
            prefix[i] = prefix[i - 1] + prime[i];
        }

        return prefix[R] - prefix[L - 1];
    }
}`,
  javascript: `// JavaScript Sieve of Eratosthenes with Prefix Sum
var countPrimes = function(L, R) {
    const prime = new Array(R + 1).fill(1);
    prime[0] = prime[1] = 0;

    for (let p = 2; p * p <= R; p++) {
        if (prime[p]) {
            for (let i = p * p; i <= R; i += p) {
                prime[i] = 0;
            }
        }
    }

    const prefix = new Array(R + 1).fill(0);
    for (let i = 1; i <= R; i++) {
        prefix[i] = prefix[i - 1] + prime[i];
    }

    return prefix[R] - prefix[L - 1];
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Count Primes in Range L = 5 to R = 15',
    phase: 'INITIAL',
    codeLine: 29,
    l: 5,
    r: 15,
    sievedList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    primes: [],
    prefixR: null,
    prefixLminus1: null,
    variables: { L: 5, R: 15, method: 'Sieve of Eratosthenes + Prefix Sum' },
    explain: 'Instead of testing each number for primality independently in O(N sqrt(N)), Sieve marks composites up to R in O(R log log R).',
    intuition: 'Prefix counts allow O(1) query answering for any range.'
  },
  {
    title: '2. Sieve Multiples of 2 and 3: Eliminate Composites',
    phase: 'SIEVE_PASS',
    codeLine: 13,
    l: 5,
    r: 15,
    sievedList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    primes: [2, 3, 5, 7, 11, 13],
    compositesMarked: [4, 6, 8, 9, 10, 12, 14, 15],
    prefixR: null,
    prefixLminus1: null,
    variables: { 'p=2 multiples': '[4, 6, 8, 10, 12, 14]', 'p=3 multiples': '[9, 12, 15]', primesRemaining: '[2, 3, 5, 7, 11, 13]' },
    explain: 'Multiples of 2 and 3 are struck out. Numbers 0 and 1 are non-prime. Surviving numbers up to 15 are primes.',
    intuition: 'All composites filtered.'
  },
  {
    title: '3. Build Prefix Sum Array: prefix[15] = 6, prefix[4] = 2',
    phase: 'PREFIX_SUM',
    codeLine: 22,
    l: 5,
    r: 15,
    sievedList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    primes: [2, 3, 5, 7, 11, 13],
    compositesMarked: [4, 6, 8, 9, 10, 12, 14, 15],
    prefixR: 6,
    prefixLminus1: 2,
    variables: { 'prefix[15]': 6, 'prefix[4]': 2, primesInRange: '[5, 7, 11, 13]' },
    explain: 'Prefix sum count of primes up to R (15) is 6. Prefix sum up to L - 1 (4) is 2 (primes 2 and 3).',
    intuition: 'Subtracting prefixes isolates primes strictly inside [5..15].'
  },
  {
    title: '4. Compute Range Count: 6 - 2 = 4 Primes Found',
    phase: 'RESULT',
    codeLine: 31,
    l: 5,
    r: 15,
    sievedList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    primes: [2, 3, 5, 7, 11, 13],
    compositesMarked: [4, 6, 8, 9, 10, 12, 14, 15],
    prefixR: 6,
    prefixLminus1: 2,
    variables: { 'prefix[R] - prefix[L-1]': '6 - 2 = 4', primeList: '{5, 7, 11, 13}', queryTime: 'O(1)' },
    explain: 'The 4 primes in range [5..15] are 5, 7, 11, and 13. Total count = 4.',
    intuition: 'Optimal prefix query execution.'
  }
];

export default function CountPrimesInRangeLToRVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Range [{step.l} .. {step.r}]
        </span>
        {step.prefixR !== null && (
          <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
            prefix[15] ({step.prefixR}) - prefix[4] ({step.prefixLminus1}) = {step.prefixR - step.prefixLminus1}
          </span>
        )}
      </div>

      {/* Sieve Grid */}
      <div className="w-full p-6 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col gap-3 font-mono">
        <span className="text-xs text-[var(--chalk-dim)]">Sieve of Eratosthenes Status (Numbers 2 to 15):</span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {step.sievedList.slice(2).map((num) => {
            const isPrime = step.primes.includes(num);
            const inRange = num >= step.l && num <= step.r;

            let style = 'border-[var(--line)] bg-[var(--board-raised)] text-[var(--chalk-faint)]';
            if (isPrime && inRange) {
              style = 'border-emerald-400 bg-emerald-500/25 text-emerald-200 scale-105 shadow-md shadow-emerald-500/20';
            } else if (isPrime) {
              style = 'border-blue-400 bg-blue-500/15 text-blue-300';
            } else if (step.compositesMarked?.includes(num)) {
              style = 'border-rose-500/30 bg-rose-500/10 text-rose-400/60 line-through';
            }

            return (
              <div
                key={num}
                className={`w-11 h-11 rounded-xl border flex items-center justify-center font-bold text-sm transition-all ${style}`}
              >
                {num}
              </div>
            );
          })}
        </div>
      </div>

      {/* Result Card */}
      {step.phase === 'RESULT' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 4 Primes in [{step.l} .. {step.r}]: 5, 7, 11, 13</span>
        </div>
      )}
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'All Divisors of a Number',
  category: 'Math',
  difficulty: 'Easy',
  timeComplexity: 'O(sqrt(N))',
  spaceComplexity: 'O(number of divisors)',
  description: 'Finds all integer divisors of N in O(sqrt(N)) time by iterating up to sqrt(N) and collecting symmetric factor pairs (i and N / i).'
};

export const solutions = {
  cpp: `// C++ Finding All Divisors in O(sqrt(N)) Time
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> printDivisors(int n) {
        vector<int> divisors;

        for (int i = 1; i * i <= n; i++) {
            if (n % i == 0) {
                divisors.push_back(i);
                if (i != n / i) {
                    divisors.push_back(n / i); // Symmetric divisor pair
                }
            }
        }

        sort(divisors.begin(), divisors.end());
        return divisors;
    }
};`,
  python: `# Python 3 Finding All Divisors in O(sqrt(N))
class Solution:
    def printDivisors(self, n: int) -> list[int]:
        divisors = []
        i = 1
        while i * i <= n:
            if n % i == 0:
                divisors.append(i)
                if i != n // i:
                    divisors.append(n // i)
            i += 1
        divisors.sort()
        return divisors`,
  java: `// Java Finding All Divisors in O(sqrt(N))
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {
    public List<Integer> printDivisors(int n) {
        List<Integer> divisors = new ArrayList<>();

        for (int i = 1; i * i <= n; i++) {
            if (n % i == 0) {
                divisors.add(i);
                if (i != n / i) {
                    divisors.add(n / i);
                }
            }
        }

        Collections.sort(divisors);
        return divisors;
    }
}`,
  javascript: `// JavaScript Finding All Divisors in O(sqrt(N))
var printDivisors = function(n) {
    const divisors = [];

    for (let i = 1; i * i <= n; i++) {
        if (n % i === 0) {
            divisors.push(i);
            if (i !== Math.floor(n / i)) {
                divisors.push(Math.floor(n / i));
            }
        }
    }

    divisors.sort((a, b) => a - b);
    return divisors;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Find All Divisors of N = 36 up to sqrt(36) = 6',
    phase: 'INITIAL',
    codeLine: 12,
    n: 36,
    currentI: null,
    pairsFound: [],
    divisors: [],
    variables: { n: 36, 'sqrt(36)': 6, rangeToTest: '1 to 6' },
    explain: 'Every divisor i <= sqrt(N) has a corresponding counterpart N / i >= sqrt(N). Thus, checking numbers up to 6 discovers all divisors.',
    intuition: 'Reduces time complexity from O(N) to O(sqrt(N)).'
  },
  {
    title: '2. Check i = 1: 36 % 1 == 0 => Divisor Pair (1, 36)',
    phase: 'FOUND_PAIR',
    codeLine: 15,
    n: 36,
    currentI: 1,
    pairsFound: [[1, 36]],
    divisors: [1, 36],
    variables: { i: 1, '36 / 1': 36, newPair: '(1, 36)' },
    explain: '1 divides 36. 36 / 1 = 36. Both 1 and 36 added.',
    intuition: 'Trivial pair (1, N).'
  },
  {
    title: '3. Check i = 2: 36 % 2 == 0 => Divisor Pair (2, 18)',
    phase: 'FOUND_PAIR',
    codeLine: 15,
    n: 36,
    currentI: 2,
    pairsFound: [[1, 36], [2, 18]],
    divisors: [1, 2, 18, 36],
    variables: { i: 2, '36 / 2': 18, newPair: '(2, 18)' },
    explain: '2 divides 36. 36 / 2 = 18. Both 2 and 18 added.',
    intuition: 'Discovered symmetric factors.'
  },
  {
    title: '4. Check i = 3 & 4: Divisor Pairs (3, 12) and (4, 9)',
    phase: 'FOUND_PAIR',
    codeLine: 15,
    n: 36,
    currentI: 4,
    pairsFound: [[1, 36], [2, 18], [3, 12], [4, 9]],
    divisors: [1, 2, 3, 4, 9, 12, 18, 36],
    variables: { 'pairs (3, 12) and (4, 9)': 'added' },
    explain: '36 % 3 == 0 (pair 3, 12). 36 % 4 == 0 (pair 4, 9). 36 % 5 != 0 (skipped).',
    intuition: 'Accumulating factor pairs.'
  },
  {
    title: '5. Check i = 6 (i == sqrt(N)): Single Divisor 6',
    phase: 'SQUARE_ROOT',
    codeLine: 16,
    n: 36,
    currentI: 6,
    pairsFound: [[1, 36], [2, 18], [3, 12], [4, 9], [6, 6]],
    divisors: [1, 2, 3, 4, 6, 9, 12, 18, 36],
    variables: { i: 6, '36 / 6': 6, note: 'Only added once since i == n / i' },
    explain: 'At sqrt(N), i equals 36 / i = 6. Only insert 6 once to avoid duplicate entry.',
    intuition: 'Perfect square center factor.'
  },
  {
    title: '6. All Divisors Sorted: [1, 2, 3, 4, 6, 9, 12, 18, 36]',
    phase: 'RESULT',
    codeLine: 21,
    n: 36,
    currentI: null,
    pairsFound: [[1, 36], [2, 18], [3, 12], [4, 9], [6, 6]],
    divisors: [1, 2, 3, 4, 6, 9, 12, 18, 36],
    variables: { totalDivisors: 9, timeComplexity: 'O(sqrt(N))' },
    explain: 'All 9 divisors found in 6 loop iterations. Sorted in ascending order.',
    intuition: 'Square root optimization saves orders of magnitude in execution time.'
  }
];

export default function DivisorsOfANumberVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Target N = {step.n} (Testing up to &radic;36 = 6)
        </span>
        {step.currentI !== null && (
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
            Testing i = {step.currentI}
          </span>
        )}
      </div>

      {/* Symmetric Factor Pairs */}
      <div className="w-full p-6 rounded-2xl bg-[#161824] border border-[#272b3c] flex flex-col gap-3 font-mono">
        <span className="text-xs text-[#8a8ea3]">Symmetric Factor Pairs Found (i &times; (N / i) = 36):</span>
        <div className="flex flex-wrap items-center gap-3">
          {step.pairsFound.map((pair, idx) => (
            <div
              key={idx}
              className="px-3 py-2 rounded-xl bg-[#12131b] border border-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center gap-2"
            >
              <span>{pair[0]}</span>
              <span className="text-[#8a8ea3]">&times;</span>
              <span>{pair[1]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sorted Divisor Output List */}
      <div className="w-full p-4 rounded-xl bg-[#12131b] border border-[#202436] flex flex-col gap-2 font-mono">
        <span className="text-xs text-[#8a8ea3]">Sorted Divisors Collection ({step.divisors.length}):</span>
        <div className="flex flex-wrap items-center gap-2">
          {step.divisors.map((d, idx) => (
            <span
              key={idx}
              className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold flex items-center justify-center text-sm shadow-md shadow-emerald-500/15"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

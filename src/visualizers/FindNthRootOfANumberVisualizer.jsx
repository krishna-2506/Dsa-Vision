import React from 'react';

export const meta = {
  title: 'Find Nth Root of a Number',
  category: 'Binary Search',
  difficulty: 'Easy',
  timeComplexity: 'O(log M)',
  spaceComplexity: 'O(1)',
  description: 'Calculates the integer Nth root of a number M using binary search on answer space [1..M]. Returns the exact root if it exists, or -1 otherwise.'
};

export const solutions = {
  cpp: `// C++ Binary Search on Answer Space for Nth Root
// Time Complexity: O(log M) | Space Complexity: O(1)
#include <iostream>
using namespace std;

class Solution {
    // 1: mid^n == m, 2: mid^n > m, 0: mid^n < m
    int checkPower(long long mid, int n, int m) {
        long long ans = 1;
        for (int i = 1; i <= n; i++) {
            ans *= mid;
            if (ans > m) return 2; // Prevent integer overflow
        }
        if (ans == m) return 1;
        return 0;
    }

public:
    int NthRoot(int n, int m) {
        int low = 1, high = m;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int status = checkPower(mid, n, m);

            if (status == 1) return mid; // Exact root found
            if (status == 2) {
                high = mid - 1; // mid^n > m, search left
            } else {
                low = mid + 1;  // mid^n < m, search right
            }
        }
        return -1; // No integer root
    }
};`,
  python: `# Python 3 Binary Search on Answer for Nth Root
class Solution:
    def NthRoot(self, n: int, m: int) -> int:
        def check_power(mid):
            ans = 1
            for _ in range(n):
                ans *= mid
                if ans > m:
                    return 2
            if ans == m:
                return 1
            return 0

        low, high = 1, m
        while low <= high:
            mid = (low + high) // 2
            status = check_power(mid)
            if status == 1:
                return mid
            elif status == 2:
                high = mid - 1
            else:
                low = mid + 1

        return -1`,
  java: `// Java Binary Search on Answer for Nth Root
class Solution {
    private int checkPower(long mid, int n, int m) {
        long ans = 1;
        for (int i = 1; i <= n; i++) {
            ans *= mid;
            if (ans > m) return 2;
        }
        if (ans == m) return 1;
        return 0;
    }

    public int NthRoot(int n, int m) {
        int low = 1, high = m;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int status = checkPower(mid, n, m);

            if (status == 1) return mid;
            if (status == 2) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return -1;
    }
}`,
  javascript: `// JavaScript Binary Search on Answer for Nth Root
var NthRoot = function(n, m) {
    const checkPower = (mid) => {
        let ans = 1;
        for (let i = 1; i <= n; i++) {
            ans *= mid;
            if (ans > m) return 2;
        }
        if (ans === m) return 1;
        return 0;
    };

    let low = 1, high = m;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const status = checkPower(mid);

        if (status === 1) return mid;
        if (status === 2) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return -1;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Find N=3 Root of M=27 in range [1..27]',
    phase: 'INITIAL',
    codeLine: 20,
    n: 3,
    m: 27,
    low: 1,
    high: 27,
    mid: null,
    powerVal: null,
    status: null,
    variables: { n: 3, m: 27, searchSpace: '[1..27]' },
    explain: 'We want an integer x such that x^3 = 27. The monotonic range of possible candidates is [1..27].',
    intuition: 'Since f(x) = x^n is strictly increasing, binary search on answers finds x in O(log M) time.'
  },
  {
    title: '2. Iteration 1: mid = 14, 14^3 = 2744 > 27 (Too Large)',
    phase: 'MID_EVAL',
    codeLine: 25,
    n: 3,
    m: 27,
    low: 1,
    high: 27,
    mid: 14,
    powerVal: 2744,
    status: 'GREATER',
    variables: { mid: 14, 'mid^3': 2744, comparison: '2744 > 27', action: 'high = mid - 1 = 13' },
    explain: '14^3 = 2744 is far greater than 27. Any number >= 14 will also be too large. Eliminate [14..27].',
    intuition: 'Discard the entire upper half because powers grow exponentially.'
  },
  {
    title: '3. Update Range: low = 1, high = 13',
    phase: 'UPDATE_RANGE',
    codeLine: 26,
    n: 3,
    m: 27,
    low: 1,
    high: 13,
    mid: null,
    powerVal: null,
    status: null,
    variables: { low: 1, high: 13, remainingRange: '[1..13]' },
    explain: 'Search space reduced from 27 elements to 13 elements.',
    intuition: 'Half of the candidates eliminated in one step.'
  },
  {
    title: '4. Iteration 2: mid = 7, 7^3 = 343 > 27 (Too Large)',
    phase: 'MID_EVAL',
    codeLine: 25,
    n: 3,
    m: 27,
    low: 1,
    high: 13,
    mid: 7,
    powerVal: 343,
    status: 'GREATER',
    variables: { mid: 7, 'mid^3': 343, comparison: '343 > 27', action: 'high = mid - 1 = 6' },
    explain: '7^3 = 343 > 27. Still too big! Eliminate [7..13]. Set high = mid - 1 = 6.',
    intuition: 'Continue cutting upper bound.'
  },
  {
    title: '5. Iteration 3: mid = 3, 3^3 = 27 == 27 (EXACT ROOT FOUND!)',
    phase: 'MATCH_FOUND',
    codeLine: 24,
    n: 3,
    m: 27,
    low: 1,
    high: 6,
    mid: 3,
    powerVal: 27,
    status: 'EQUAL',
    variables: { mid: 3, 'mid^3': 27, target: 27, result: 3 },
    explain: '3^3 is precisely 27! Target root found: return 3.',
    intuition: 'Exact root located in just 3 iterations on range of size 27.'
  }
];

export default function FindNthRootOfANumberVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Target and Equation Header */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          N = {step.n}, M = {step.m} (Find ∛{step.m})
        </span>
        {step.status && (
          <span className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold ${
            step.status === 'EQUAL'
              ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
              : 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
          }`}>
            {step.status === 'EQUAL' ? '✓ Exact Match: mid^n == M' : 'mid^n > M (Overshot)'}
          </span>
        )}
      </div>

      {/* Visual Search Space Range */}
      <div className="w-full p-5 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col items-center gap-4">
        <div className="text-xs font-mono text-[var(--chalk-dim)]">Active Binary Search Range</div>
        
        <div className="w-full flex items-center justify-between px-4 text-sm font-mono">
          <div className="flex flex-col items-center">
            <span className="text-blue-400 font-bold">low</span>
            <span className="text-xl text-[var(--chalk)] font-bold">{step.low}</span>
          </div>

          {step.mid !== null && (
            <div className="flex flex-col items-center animate-bounce">
              <span className="text-amber-400 font-bold">mid</span>
              <span className="text-2xl text-amber-300 font-bold px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-500/40">
                {step.mid}
              </span>
            </div>
          )}

          <div className="flex flex-col items-center">
            <span className="text-purple-400 font-bold">high</span>
            <span className="text-xl text-[var(--chalk)] font-bold">{step.high}</span>
          </div>
        </div>

        {/* Calculation Visual */}
        {step.mid !== null && (
          <div className="w-full p-3 rounded-xl bg-[var(--board-raised)] border border-[var(--line)] flex items-center justify-center gap-3 font-mono text-sm">
            <span className="text-[var(--chalk-dim)]">Computation:</span>
            <span className="text-amber-300 font-bold">{step.mid}</span>
            <span className="text-[var(--chalk)]">^</span>
            <span className="text-purple-300 font-bold">{step.n}</span>
            <span className="text-[var(--chalk)]">=</span>
            <span className="text-emerald-400 font-bold">{step.powerVal}</span>
            <span className="text-[var(--chalk-dim)] text-xs">
              ({step.powerVal > step.m ? `> ${step.m}` : step.powerVal < step.m ? `< ${step.m}` : `= ${step.m}`})
            </span>
          </div>
        )}
      </div>

      {/* Result Card */}
      {step.phase === 'MATCH_FOUND' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-3 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 Exact Nth Root = {step.mid}</span>
          <span className="text-xs text-emerald-400 font-normal">(because {step.mid}^{step.n} = {step.m})</span>
        </div>
      )}
    </div>
  );
}

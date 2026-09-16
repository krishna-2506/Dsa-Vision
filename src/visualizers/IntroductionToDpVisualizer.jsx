import React from 'react';

export const meta = {
  title: 'Introduction to DP (Fibonacci)',
  category: 'Dynamic Programming',
  difficulty: 'Easy',
  timeComplexity: 'O(N) Tabulation / O(2^N) Naive Recursion',
  spaceComplexity: 'O(1) Space-Optimized / O(N) Memoization',
  description: 'Explores Dynamic Programming fundamentals: Overlapping Subproblems and Optimal Substructure using Fibonacci sequence via Naive Recursion, Top-Down Memoization, and Bottom-Up Tabulation.'
};

export const solutions = {
  cpp: `// C++ Fibonacci - Memoization & Tabulation
#include <vector>
using namespace std;

class Solution {
public:
    // Top-Down Memoization: O(N) time, O(N) stack + O(N) array
    int memoFib(int n, vector<int>& dp) {
        if (n <= 1) return n;
        if (dp[n] != -1) return dp[n];
        return dp[n] = memoFib(n - 1, dp) + memoFib(n - 2, dp);
    }

    // Bottom-Up Space-Optimized Tabulation: O(N) time, O(1) space
    int fib(int n) {
        if (n <= 1) return n;
        int prev2 = 0, prev = 1;
        for (int i = 2; i <= n; i++) {
            int cur = prev + prev2;
            prev2 = prev;
            prev = cur;
        }
        return prev;
    }
};`,
  python: `# Python 3 Fibonacci - Memoization & Tabulation
class Solution:
    def fib_memo(self, n: int, dp: list[int]) -> int:
        if n <= 1:
            return n
        if dp[n] != -1:
            return dp[n]
        dp[n] = self.fib_memo(n - 1, dp) + self.fib_memo(n - 2, dp)
        return dp[n]

    def fib(self, n: int) -> int:
        if n <= 1:
            return n
        prev2, prev = 0, 1
        for i in range(2, n + 1):
            cur = prev + prev2
            prev2 = prev
            prev = cur
        return prev`,
  java: `// Java Fibonacci - Memoization & Tabulation
import java.util.Arrays;

class Solution {
    public int memoFib(int n, int[] dp) {
        if (n <= 1) return n;
        if (dp[n] != -1) return dp[n];
        return dp[n] = memoFib(n - 1, dp) + memoFib(n - 2, dp);
    }

    public int fib(int n) {
        if (n <= 1) return n;
        int prev2 = 0, prev = 1;
        for (int i = 2; i <= n; i++) {
            int cur = prev + prev2;
            prev2 = prev;
            prev = cur;
        }
        return prev;
    }
}`,
  javascript: `// JavaScript Fibonacci - Memoization & Tabulation
var fib = function(n) {
    if (n <= 1) return n;
    let prev2 = 0, prev = 1;
    for (let i = 2; i <= n; i++) {
        let cur = prev + prev2;
        prev2 = prev;
        prev = cur;
    }
    return prev;
};`
};

export const steps = [
  {
    title: '1. Problem Overview: Target Fibonacci F(5)',
    phase: 'INITIAL',
    codeLine: 18,
    n: 5,
    currentI: null,
    prev2: 0,
    prev: 1,
    dp: [0, 1, -1, -1, -1, -1],
    overlapCall: null,
    memoSaved: 0,
    variables: { n: 5, baseCases: 'F(0)=0, F(1)=1' },
    explain: 'Naive recursion causes exponential calls O(2^N) by recalculating F(3), F(2) repeatedly. Dynamic programming stores solved states in O(N).',
    intuition: 'Any problem with overlapping subproblems and optimal substructure can be sped up via DP.'
  },
  {
    title: '2. Compute F(2) = F(1) + F(0) = 1 + 0 = 1',
    phase: 'COMPUTE',
    codeLine: 20,
    n: 5,
    currentI: 2,
    prev2: 0,
    prev: 1,
    curVal: 1,
    dp: [0, 1, 1, -1, -1, -1],
    overlapCall: 'F(2) stored',
    memoSaved: 1,
    variables: { i: 2, 'dp[i]': '1 + 0 = 1', prev2: 0, prev: 1 },
    explain: 'For i = 2: cur = prev + prev2 = 1 + 0 = 1. Update prev2 = 1, prev = 1.',
    intuition: 'Store state 2 so downstream calls never recompute it.'
  },
  {
    title: '3. Compute F(3) = F(2) + F(1) = 1 + 1 = 2',
    phase: 'COMPUTE',
    codeLine: 21,
    n: 5,
    currentI: 3,
    prev2: 1,
    prev: 1,
    curVal: 2,
    dp: [0, 1, 1, 2, -1, -1],
    overlapCall: 'F(3) cached',
    memoSaved: 3,
    variables: { i: 3, 'dp[i]': '1 + 1 = 2', prev2: 1, prev: 2 },
    explain: 'For i = 3: cur = prev + prev2 = 1 + 1 = 2. Update prev2 = 1, prev = 2.',
    intuition: 'Only the last two states are necessary for bottom-up computation.'
  },
  {
    title: '4. Compute F(4) = F(3) + F(2) = 2 + 1 = 3',
    phase: 'COMPUTE',
    codeLine: 21,
    n: 5,
    currentI: 4,
    prev2: 1,
    prev: 2,
    curVal: 3,
    dp: [0, 1, 1, 2, 3, -1],
    overlapCall: 'F(4) cached',
    memoSaved: 5,
    variables: { i: 4, 'dp[i]': '2 + 1 = 3', prev2: 2, prev: 3 },
    explain: 'For i = 4: cur = 2 + 1 = 3. In naive recursion, F(2) would have been recomputed 3 times!',
    intuition: 'Memoization/Tabulation drops complexity from O(1.618^N) to O(N).'
  },
  {
    title: '5. Compute F(5) = F(4) + F(3) = 3 + 2 = 5 (Final Answer)',
    phase: 'COMPLETED',
    codeLine: 24,
    n: 5,
    currentI: 5,
    prev2: 2,
    prev: 3,
    curVal: 5,
    dp: [0, 1, 1, 2, 3, 5],
    overlapCall: 'Solved',
    memoSaved: 9,
    variables: { 'F(5)': 5, timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    explain: 'Final result F(5) = 5. Tabulation space-optimization reduces memory to O(1) using just two rolling pointers.',
    intuition: 'Bottom-up DP eliminates recursion stack overhead completely.'
  }
];

export default function IntroductionToDpVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold">
          Current State: {step.currentI !== null ? `F(${step.currentI})` : 'Init'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Redundant Calls Saved: {step.memoSaved}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Space: O(1) Rolling DP
        </span>
      </div>

      {/* DP Array & Rolling Pointers Container */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-5 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          DP Memo Table / State Array (N = 5)
        </span>

        {/* Table Cells */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {step.dp.map((val, idx) => {
            const isCur = idx === step.currentI;
            const isPrev = idx === (step.currentI - 1);
            const isPrev2 = idx === (step.currentI - 2);

            return (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-14 h-16 rounded-xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                    isCur
                      ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg scale-105'
                      : isPrev
                      ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                      : isPrev2
                      ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                      : val !== -1
                      ? 'border-[#383d54] bg-[#161824] text-slate-200'
                      : 'border-[#272b3c] bg-[#12131b] text-slate-600'
                  }`}
                >
                  <span className="text-[10px] text-[#8a8ea3]">F({idx})</span>
                  <span className="text-sm font-bold mt-0.5">
                    {val === -1 ? '—' : val}
                  </span>
                </div>
                <span className="text-[10px] font-mono">
                  {isCur ? (
                    <span className="text-emerald-400 font-bold">cur</span>
                  ) : isPrev ? (
                    <span className="text-indigo-400 font-bold">prev</span>
                  ) : isPrev2 ? (
                    <span className="text-amber-400 font-bold">prev2</span>
                  ) : (
                    <span className="text-slate-600">i={idx}</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* Rolling Pointer formula breakdown */}
        <div className="w-full max-w-md bg-[#161824] border border-[#272b3c] rounded-xl p-3 flex items-center justify-around text-xs font-mono">
          <div className="flex flex-col items-center">
            <span className="text-amber-400 font-semibold">prev2</span>
            <span className="text-slate-300 text-sm font-bold">{step.prev2}</span>
          </div>
          <span className="text-slate-500 text-lg font-bold">+</span>
          <div className="flex flex-col items-center">
            <span className="text-indigo-400 font-semibold">prev</span>
            <span className="text-slate-300 text-sm font-bold">{step.prev}</span>
          </div>
          <span className="text-slate-500 text-lg font-bold">=</span>
          <div className="flex flex-col items-center">
            <span className="text-emerald-400 font-semibold">cur</span>
            <span className="text-emerald-300 text-sm font-bold">{step.curVal ?? '—'}</span>
          </div>
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

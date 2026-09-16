import React from 'react';

export const meta = {
  title: 'Climbing Stairs',
  category: 'Dynamic Programming',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Calculates the number of distinct ways to reach the nth stair when taking 1 or 2 steps at a time. Equivalent to the Fibonacci recurrence relation dp[i] = dp[i-1] + dp[i-2].'
};

export const solutions = {
  cpp: `// C++ Climbing Stairs
// Time: O(N) | Space: O(1)
class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1; // ways to step 1
        int prev = 2;  // ways to step 2

        for (int i = 3; i <= n; i++) {
            int cur = prev + prev2;
            prev2 = prev;
            prev = cur;
        }

        return prev;
    }
};`,
  python: `# Python 3 Climbing Stairs
# Time: O(N) | Space: O(1)
class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        prev2, prev = 1, 2
        for i in range(3, n + 1):
            cur = prev + prev2
            prev2 = prev
            prev = cur
        return prev`,
  java: `// Java Climbing Stairs
// Time: O(N) | Space: O(1)
class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1;
        int prev = 2;

        for (int i = 3; i <= n; i++) {
            int cur = prev + prev2;
            prev2 = prev;
            prev = cur;
        }

        return prev;
    }
}`,
  javascript: `// JavaScript Climbing Stairs
// Time: O(N) | Space: O(1)
var climbStairs = function(n) {
    if (n <= 2) return n;
    let prev2 = 1;
    let prev = 2;

    for (let i = 3; i <= n; i++) {
        let cur = prev + prev2;
        prev2 = prev;
        prev = cur;
    }

    return prev;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: N = 5 stairs',
    phase: 'INITIAL',
    codeLine: 6,
    n: 5,
    activeStair: 0,
    ways: [1, 1, 2, 0, 0, 0],
    prev2: 1,
    prev: 2,
    variables: { n: 5, 'base[1]': '1 way', 'base[2]': '2 ways [1+1, 2]' },
    explain: 'To reach step 1: exactly 1 way. To reach step 2: 2 ways (1+1 or 2). Any step i can be reached from (i-1) taking 1 step or (i-2) taking 2 steps.',
    intuition: 'Optimal substructure: Total ways(i) = ways(i-1) + ways(i-2).'
  },
  {
    title: '2. Compute Step 3: ways[3] = ways[2] + ways[1] = 2 + 1 = 3',
    phase: 'COMPUTE',
    codeLine: 11,
    n: 5,
    activeStair: 3,
    ways: [1, 1, 2, 3, 0, 0],
    prev2: 1,
    prev: 2,
    curVal: 3,
    variables: { i: 3, 'ways[i-1]': 2, 'ways[i-2]': 1, 'ways[3]': 3 },
    explain: 'Ways to reach step 3: (1+1+1), (1+2), (2+1) = 3 total ways. Update prev2 = 2, prev = 3.',
    intuition: 'Sum the distinct paths ending at the two preceding steps.'
  },
  {
    title: '3. Compute Step 4: ways[4] = ways[3] + ways[2] = 3 + 2 = 5',
    phase: 'COMPUTE',
    codeLine: 12,
    n: 5,
    activeStair: 4,
    ways: [1, 1, 2, 3, 5, 0],
    prev2: 2,
    prev: 3,
    curVal: 5,
    variables: { i: 4, 'ways[i-1]': 3, 'ways[i-2]': 2, 'ways[4]': 5 },
    explain: 'Ways to reach step 4: 3 + 2 = 5 ways. Update prev2 = 3, prev = 5.',
    intuition: 'Each additional stair aggregates combinations from the previous two steps.'
  },
  {
    title: '4. Compute Step 5: ways[5] = ways[4] + ways[3] = 5 + 3 = 8 (Final)',
    phase: 'COMPLETED',
    codeLine: 16,
    n: 5,
    activeStair: 5,
    ways: [1, 1, 2, 3, 5, 8],
    prev2: 3,
    prev: 5,
    curVal: 8,
    variables: { n: 5, totalWays: 8, complexity: 'O(N) time, O(1) space' },
    explain: 'Total ways to reach stair 5 is 8. Tabulation completes in O(N) time with O(1) rolling space.',
    intuition: 'Fibonacci numbers define the partition of n into parts of size 1 and 2.'
  }
];

export default function ClimbingStairsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Target Stair: {step.n}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Ways to Step {step.activeStair || 'top'}: {step.ways[step.activeStair] || step.ways[step.n]}
        </span>
      </div>

      {/* Visual Staircase Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Staircase Elevation & Distinct Ways
        </span>

        <div className="w-full flex items-end justify-center gap-2 h-48 px-4 pt-6">
          {[0, 1, 2, 3, 4, 5].map((stairIdx) => {
            const heightPx = (stairIdx + 1) * 26;
            const isTarget = stairIdx === step.activeStair;
            const waysCount = step.ways[stairIdx];

            return (
              <div key={stairIdx} className="flex-1 flex flex-col items-center justify-end h-full">
                {isTarget && (
                  <span className="text-lg animate-bounce mb-1">🏃‍♂️</span>
                )}
                <div
                  style={{ height: `${heightPx}px` }}
                  className={`w-full rounded-t-xl border-t border-x flex flex-col items-center justify-between p-1.5 font-mono transition-all duration-300 ${
                    isTarget
                      ? 'border-emerald-500 bg-emerald-500/30 text-emerald-300 ring-2 ring-emerald-500/40'
                      : waysCount > 0
                      ? 'border-blue-500/40 bg-blue-500/15 text-blue-300'
                      : 'border-[#272b3c] bg-[#161824] text-slate-600'
                  }`}
                >
                  <span className="text-[11px] font-bold">
                    {waysCount > 0 ? `${waysCount}w` : '—'}
                  </span>
                  <span className="text-[9px] text-[#8a8ea3]">
                    {stairIdx === 0 ? 'Ground' : `Step ${stairIdx}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

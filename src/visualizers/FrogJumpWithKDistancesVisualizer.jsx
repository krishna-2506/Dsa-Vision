import React from 'react';

export const meta = {
  title: 'Frog Jump with K Distances',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N * K)',
  spaceComplexity: 'O(N)',
  description: 'Generalizes Frog Jump where the frog can jump up to K steps forward at any point. At each stone i, we evaluate all possible previous steps (i - j) for 1 <= j <= K to minimize total energy.'
};

export const solutions = {
  cpp: `// C++ Frog Jump with K Distances
// Time: O(N * K) | Space: O(N)
#include <vector>
#include <cmath>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minimizeCost(int n, int k, vector<int>& heights) {
        vector<int> dp(n, 1e9);
        dp[0] = 0;

        for (int i = 1; i < n; i++) {
            for (int j = 1; j <= k && (i - j) >= 0; j++) {
                int jumpCost = dp[i - j] + abs(heights[i] - heights[i - j]);
                dp[i] = min(dp[i], jumpCost);
            }
        }

        return dp[n - 1];
    }
};`,
  python: `# Python 3 Frog Jump with K Distances
# Time: O(N * K) | Space: O(N)
class Solution:
    def minimizeCost(self, n: int, k: int, heights: list[int]) -> int:
        dp = [float('inf')] * n
        dp[0] = 0

        for i in range(1, n):
            for j in range(1, k + 1):
                if i - j >= 0:
                    jump_cost = dp[i - j] + abs(heights[i] - heights[i - j])
                    dp[i] = min(dp[i], jump_cost)

        return dp[n - 1]`,
  java: `// Java Frog Jump with K Distances
// Time: O(N * K) | Space: O(N)
import java.util.Arrays;

class Solution {
    public int minimizeCost(int n, int k, int[] heights) {
        int[] dp = new int[n];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;

        for (int i = 1; i < n; i++) {
            for (int j = 1; j <= k && (i - j) >= 0; j++) {
                int jumpCost = dp[i - j] + Math.abs(heights[i] - heights[i - j]);
                dp[i] = Math.min(dp[i], jumpCost);
            }
        }

        return dp[n - 1];
    }
}`,
  javascript: `// JavaScript Frog Jump with K Distances
// Time: O(N * K) | Space: O(N)
var minimizeCost = function(n, k, heights) {
    const dp = new Array(n).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i < n; i++) {
        for (let j = 1; j <= k && (i - j) >= 0; j++) {
            const jumpCost = dp[i - j] + Math.abs(heights[i] - heights[i - j]);
            dp[i] = Math.min(dp[i], jumpCost);
        }
    }

    return dp[n - 1];
};`
};

export const steps = [
  {
    title: '1. Initialize: Heights [10, 30, 40, 50, 20], K = 3',
    phase: 'INITIAL',
    codeLine: 13,
    heights: [10, 30, 40, 50, 20],
    k: 3,
    activeI: 0,
    dp: [0, null, null, null, null],
    jumpsTested: [],
    variables: { n: 5, k: 3, 'dp[0]': 0 },
    explain: 'Starting at stone 0, base energy dp[0] = 0. We can jump up to 3 stones in a single leap.',
    intuition: 'At each stone i, we evaluate up to K previous states.'
  },
  {
    title: '2. Stone 1 (H=30): Jump from Stone 0 (j=1) -> Cost 0 + |30-10| = 20',
    phase: 'COMPUTE',
    codeLine: 18,
    heights: [10, 30, 40, 50, 20],
    k: 3,
    activeI: 1,
    dp: [0, 20, null, null, null],
    jumpsTested: [{ from: 0, cost: 20 }],
    variables: { i: 1, 'j=1': 'dp[0]+|30-10|=20', 'dp[1]': 20 },
    explain: 'Only 1 preceding stone exists (j=1). Jump cost = 0 + 20 = 20.',
    intuition: 'No further backward jumps possible since index cannot be negative.'
  },
  {
    title: '3. Stone 2 (H=40): Check j=1 (from 1: 20+10=30) and j=2 (from 0: 0+30=30)',
    phase: 'COMPUTE',
    codeLine: 18,
    heights: [10, 30, 40, 50, 20],
    k: 3,
    activeI: 2,
    dp: [0, 20, 30, null, null],
    jumpsTested: [{ from: 1, cost: 30 }, { from: 0, cost: 30 }],
    variables: { i: 2, 'j=1': '20+10=30', 'j=2': '0+30=30', 'dp[2]': 30 },
    explain: 'Testing jump from stone 1 (cost 30) and stone 0 (cost 30). Minimum = 30.',
    intuition: 'Both single and double jumps reach stone 2 with equal energy.'
  },
  {
    title: '4. Stone 3 (H=50): Check j=1 (30+10=40), j=2 (20+20=40), j=3 (0+40=40)',
    phase: 'COMPUTE',
    codeLine: 18,
    heights: [10, 30, 40, 50, 20],
    k: 3,
    activeI: 3,
    dp: [0, 20, 30, 40, null],
    jumpsTested: [{ from: 2, cost: 40 }, { from: 1, cost: 40 }, { from: 0, cost: 40 }],
    variables: { i: 3, 'j=1,2,3': 'all 40', 'dp[3]': 40 },
    explain: 'Testing all 3 valid backward steps (from stones 2, 1, 0). All result in 40. dp[3] = 40.',
    intuition: 'Checking full window of K preceding stones.'
  },
  {
    title: '5. Stone 4 (H=20): j=1 (from 3: 40+30=70), j=2 (from 2: 30+20=50), j=3 (from 1: 20+10=30)',
    phase: 'COMPLETED',
    codeLine: 23,
    heights: [10, 30, 40, 50, 20],
    k: 3,
    activeI: 4,
    dp: [0, 20, 30, 40, 30],
    jumpsTested: [{ from: 3, cost: 70 }, { from: 2, cost: 50 }, { from: 1, cost: 30 }],
    variables: { i: 4, minCost: 30, bestJump: 'From Stone 1 (j=3)' },
    explain: 'Evaluating jumps: from 3 gives 70, from 2 gives 50, from 1 gives 30! Minimum total energy is 30.',
    intuition: 'A long leap of 3 steps from stone 1 bypasses stones 2 and 3, saving significant energy!'
  }
];

export default function FrogJumpWithKDistancesVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Max Jump Distance K = {step.k}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Target Stone: {step.activeI} | Min Energy: {step.dp[step.activeI] ?? '—'}
        </span>
      </div>

      {/* Stones Array */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-5 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Stones Heights & Evaluated K-Jumps
        </span>

        <div className="w-full flex items-center justify-around gap-2 pt-2">
          {step.heights.map((h, idx) => {
            const isTarget = idx === step.activeI;
            const energy = step.dp[idx];
            const isTestedFrom = step.jumpsTested.some(jt => jt.from === idx);

            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                {isTarget ? (
                  <span className="text-2xl animate-bounce">🐸</span>
                ) : (
                  <div className="h-8" />
                )}

                <div
                  className={`w-18 h-24 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                    isTarget
                      ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg'
                      : isTestedFrom
                      ? 'border-amber-500 bg-amber-500/20 text-amber-300'
                      : energy !== null
                      ? 'border-purple-500/40 bg-purple-500/15 text-purple-300'
                      : 'border-[#272b3c] bg-[#161824] text-slate-500'
                  }`}
                >
                  <span className="text-[10px] text-[#8a8ea3]">Idx {idx}</span>
                  <span className="text-xs font-bold text-amber-400 mt-0.5">H: {h}</span>
                  <span className="text-[11px] font-semibold text-emerald-400 mt-2">
                    {energy !== null ? `DP: ${energy}` : '—'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tested Jumps List */}
        {step.jumpsTested.length > 0 && (
          <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            {step.jumpsTested.map((j, jidx) => (
              <span key={jidx} className="px-2.5 py-1 rounded bg-[#12131b] border border-[#272b3c] text-slate-300">
                From Stone {j.from} ➔ Total Energy: <strong className="text-amber-300">{j.cost}</strong>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

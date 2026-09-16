import React from 'react';

export const meta = {
  title: 'Frog Jump',
  category: 'Dynamic Programming',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Calculates the minimum energy required for a frog to reach stair (N - 1) from stair 0. At each step i, the frog can jump 1 step or 2 steps with energy cost equal to the absolute difference in stair heights.'
};

export const solutions = {
  cpp: `// C++ Frog Jump
// Time: O(N) | Space: O(1)
#include <vector>
#include <cmath>
#include <algorithm>
using namespace std;

class Solution {
public:
    int frogJump(int n, vector<int>& heights) {
        int prev = 0;   // min energy to reach stair 0
        int prev2 = 0;

        for (int i = 1; i < n; i++) {
            int jumpOne = prev + abs(heights[i] - heights[i - 1]);
            int jumpTwo = 1e9;
            if (i > 1) {
                jumpTwo = prev2 + abs(heights[i] - heights[i - 2]);
            }
            int cur = min(jumpOne, jumpTwo);
            prev2 = prev;
            prev = cur;
        }

        return prev;
    }
};`,
  python: `# Python 3 Frog Jump
# Time: O(N) | Space: O(1)
class Solution:
    def frogJump(self, n: int, heights: list[int]) -> int:
        prev = 0
        prev2 = 0

        for i in range(1, n):
            jump_one = prev + abs(heights[i] - heights[i - 1])
            jump_two = float('inf')
            if i > 1:
                jump_two = prev2 + abs(heights[i] - heights[i - 2])
            cur = min(jump_one, jump_two)
            prev2 = prev
            prev = cur

        return prev`,
  java: `// Java Frog Jump
// Time: O(N) | Space: O(1)
class Solution {
    public int frogJump(int n, int[] heights) {
        int prev = 0;
        int prev2 = 0;

        for (int i = 1; i < n; i++) {
            int jumpOne = prev + Math.abs(heights[i] - heights[i - 1]);
            int jumpTwo = Integer.MAX_VALUE;
            if (i > 1) {
                jumpTwo = prev2 + Math.abs(heights[i] - heights[i - 2]);
            }
            int cur = Math.min(jumpOne, jumpTwo);
            prev2 = prev;
            prev = cur;
        }

        return prev;
    }
}`,
  javascript: `// JavaScript Frog Jump
// Time: O(N) | Space: O(1)
var frogJump = function(n, heights) {
    let prev = 0;
    let prev2 = 0;

    for (let i = 1; i < n; i++) {
        let jumpOne = prev + Math.abs(heights[i] - heights[i - 1]);
        let jumpTwo = Infinity;
        if (i > 1) {
            jumpTwo = prev2 + Math.abs(heights[i] - heights[i - 2]);
        }
        let cur = Math.min(jumpOne, jumpTwo);
        prev2 = prev;
        prev = cur;
    }

    return prev;
};`
};

export const steps = [
  {
    title: '1. Heights: [10, 20, 30, 10], Start at Stone 0 (Energy = 0)',
    phase: 'INITIAL',
    codeLine: 13,
    heights: [10, 20, 30, 10],
    activeStone: 0,
    dp: [0, null, null, null],
    jumpOneCost: null,
    jumpTwoCost: null,
    choice: null,
    variables: { n: 4, heights: '[10, 20, 30, 10]', 'dp[0]': 0 },
    explain: 'The frog starts at stone 0 with 0 energy consumed. Base state dp[0] = 0.',
    intuition: 'From stone i, consider incoming jumps from i-1 and i-2.'
  },
  {
    title: '2. Stone 1 (H=20): 1-Step from Stone 0 (Cost |20-10| = 10)',
    phase: 'COMPUTE',
    codeLine: 18,
    heights: [10, 20, 30, 10],
    activeStone: 1,
    dp: [0, 10, null, null],
    jumpOneCost: 10,
    jumpTwoCost: 'N/A',
    choice: '1-Step Jump (Cost 10)',
    variables: { i: 1, jumpOne: '0 + |20-10| = 10', 'dp[1]': 10 },
    explain: 'Can only jump 1 step from stone 0. jumpOne = 0 + |20 - 10| = 10. dp[1] = 10.',
    intuition: 'Single jump possible since stone -1 does not exist.'
  },
  {
    title: '3. Stone 2 (H=30): Compare 1-Step (10 + |30-20|=20) vs 2-Step (0 + |30-10|=20)',
    phase: 'COMPUTE',
    codeLine: 23,
    heights: [10, 20, 30, 10],
    activeStone: 2,
    dp: [0, 10, 20, null],
    jumpOneCost: 20,
    jumpTwoCost: 20,
    choice: 'Tie: Min Energy = 20',
    variables: { i: 2, jumpOne: '10 + 10 = 20', jumpTwo: '0 + 20 = 20', 'dp[2]': 20 },
    explain: 'Jump 1: dp[1] + |30 - 20| = 20. Jump 2: dp[0] + |30 - 10| = 20. min(20, 20) = 20. dp[2] = 20.',
    intuition: 'Both jump paths require equal energy to reach stone 2.'
  },
  {
    title: '4. Stone 3 (H=10): Compare 1-Step (20 + |10-30|=40) vs 2-Step (10 + |10-20|=20)',
    phase: 'COMPLETED',
    codeLine: 28,
    heights: [10, 20, 30, 10],
    activeStone: 3,
    dp: [0, 10, 20, 20],
    jumpOneCost: 40,
    jumpTwoCost: 20,
    choice: '2-Step Jump Wins! (Cost 20)',
    variables: { i: 3, jumpOne: '20 + 20 = 40', jumpTwo: '10 + 10 = 20', minEnergy: 20 },
    explain: 'Jump 1 cost = 20 + 20 = 40. Jump 2 cost = 10 + 10 = 20. Minimum is 20! Total minimum energy = 20.',
    intuition: 'Jumping 2 steps from stone 1 directly to stone 3 saves 20 units of energy!'
  }
];

export default function FrogJumpVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold">
          Current Stone: {step.activeStone}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
          Decision: {step.choice || 'Start'}
        </span>
      </div>

      {/* Stones & Frog Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-5 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Stones Heights & Accumulated Energy Cost
        </span>

        <div className="w-full flex items-center justify-around gap-3 pt-4">
          {step.heights.map((h, idx) => {
            const isTarget = idx === step.activeStone;
            const energy = step.dp[idx];

            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                {isTarget ? (
                  <span className="text-2xl animate-bounce">🐸</span>
                ) : (
                  <div className="h-8" />
                )}

                <div
                  className={`w-20 h-24 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                    isTarget
                      ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg'
                      : energy !== null
                      ? 'border-blue-500/40 bg-blue-500/15 text-blue-300'
                      : 'border-[#272b3c] bg-[#161824] text-slate-500'
                  }`}
                >
                  <span className="text-[10px] text-[#8a8ea3]">Stone {idx}</span>
                  <span className="text-sm font-bold text-amber-400 mt-0.5">H: {h}</span>
                  <div className="mt-2 text-[11px] font-semibold text-emerald-400">
                    {energy !== null ? `DP: ${energy}` : '—'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Jump Comparison Card */}
        {step.jumpOneCost !== null && (
          <div className="w-full max-w-md bg-[#161824] border border-[#272b3c] rounded-xl p-3 flex items-center justify-around text-xs font-mono">
            <div className="flex flex-col items-center">
              <span className="text-blue-400 font-semibold">1-Step Jump</span>
              <span className="text-slate-300 text-sm font-bold">{step.jumpOneCost} energy</span>
            </div>
            <div className="h-8 w-px bg-[#272b3c]" />
            <div className="flex flex-col items-center">
              <span className="text-indigo-400 font-semibold">2-Step Jump</span>
              <span className="text-slate-300 text-sm font-bold">
                {step.jumpTwoCost !== null ? `${step.jumpTwoCost} energy` : '—'}
              </span>
            </div>
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

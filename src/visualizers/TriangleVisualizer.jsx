import React from 'react';

export const meta = {
  title: 'Triangle (Minimum Path Sum)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(N) Space-Optimized',
  description: 'Calculates the minimum path sum from the top apex of a triangular array to the bottom base. From step (i, j), valid downward moves are to (i + 1, j) or (i + 1, j + 1). Bottom-up DP solves this elegantly.'
};

export const solutions = {
  cpp: `// C++ Triangle (Bottom-Up DP)
// Time: O(N^2) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<int> dp = triangle[n - 1];

        // Bottom-up: collapse rows upwards to apex
        for (int i = n - 2; i >= 0; i--) {
            for (int j = 0; j <= i; j++) {
                dp[j] = triangle[i][j] + min(dp[j], dp[j + 1]);
            }
        }

        return dp[0];
    }
};`,
  python: `# Python 3 Triangle (Bottom-Up DP)
# Time: O(N^2) | Space: O(N)
class Solution:
    def minimumTotal(self, triangle: list[list[int]]) -> int:
        n = len(triangle)
        dp = list(triangle[-1])

        for i in range(n - 2, -1, -1):
            for j in range(i + 1):
                dp[j] = triangle[i][j] + min(dp[j], dp[j + 1])

        return dp[0]`,
  java: `// Java Triangle (Bottom-Up DP)
// Time: O(N^2) | Space: O(N)
import java.util.Arrays;
import java.util.List;

class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int n = triangle.size();
        int[] dp = new int[n];
        for (int j = 0; j < n; j++) {
            dp[j] = triangle.get(n - 1).get(j);
        }

        for (int i = n - 2; i >= 0; i--) {
            for (int j = 0; j <= i; j++) {
                dp[j] = triangle.get(i).get(j) + Math.min(dp[j], dp[j + 1]);
            }
        }

        return dp[0];
    }
}`,
  javascript: `// JavaScript Triangle (Bottom-Up DP)
// Time: O(N^2) | Space: O(N)
var minimumTotal = function(triangle) {
    const n = triangle.length;
    let dp = [...triangle[n - 1]];

    for (let i = n - 2; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
        }
    }

    return dp[0];
};`
};

export const steps = [
  {
    title: '1. Triangle Setup: [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]',
    phase: 'INITIAL',
    codeLine: 12,
    triangle: [
      [2],
      [3, 4],
      [6, 5, 7],
      [4, 1, 8, 3]
    ],
    dp: [4, 1, 8, 3],
    activeRow: 3,
    variables: { numRows: 4, baseRowDP: '[4, 1, 8, 3]' },
    explain: 'Starting from the bottom row 3: minimum path to reach base is simply the values themselves: [4, 1, 8, 3].',
    intuition: 'Bottom-up avoids top-down branch explosion and edge checks.'
  },
  {
    title: '2. Row 2 (Values: [6, 5, 7]): Collapse from Row 3',
    phase: 'ROW_2',
    codeLine: 16,
    triangle: [
      [2],
      [3, 4],
      [6, 5, 7],
      [4, 1, 8, 3]
    ],
    dp: [7, 6, 10, 3],
    activeRow: 2,
    variables: { 'dp[0]': '6 + min(4, 1) = 7', 'dp[1]': '5 + min(1, 8) = 6', 'dp[2]': '7 + min(8, 3) = 10' },
    explain: 'For index 0: 6 + min(4, 1) = 7. For index 1: 5 + min(1, 8) = 6. For index 2: 7 + min(8, 3) = 10.',
    intuition: 'Each cell picks the cheaper of its two immediate downward children.'
  },
  {
    title: '3. Row 1 (Values: [3, 4]): Collapse from Row 2',
    phase: 'ROW_1',
    codeLine: 16,
    triangle: [
      [2],
      [3, 4],
      [6, 5, 7],
      [4, 1, 8, 3]
    ],
    dp: [9, 10, 10, 3],
    activeRow: 1,
    variables: { 'dp[0]': '3 + min(7, 6) = 9', 'dp[1]': '4 + min(6, 10) = 10' },
    explain: 'For index 0: 3 + min(7, 6) = 9. For index 1: 4 + min(6, 10) = 10.',
    intuition: 'Moving one level higher towards the apex.'
  },
  {
    title: '4. Row 0 Apex (Value: 2): 2 + min(9, 10) = 11 (Final)',
    phase: 'COMPLETED',
    codeLine: 21,
    triangle: [
      [2],
      [3, 4],
      [6, 5, 7],
      [4, 1, 8, 3]
    ],
    dp: [11, 10, 10, 3],
    activeRow: 0,
    variables: { apex: 2, minTotal: 11, optimalPath: '2 -> 3 -> 5 -> 1 = 11' },
    explain: 'Apex value 2 + min(9, 10) = 11. Minimum total path sum from apex to bottom is 11!',
    intuition: 'Complete bottom-up reduction achieved in O(N^2) time and O(N) space.'
  }
];

export default function TriangleVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Active Row: Row {step.activeRow}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Apex Min Total: {step.dp[0]}
        </span>
      </div>

      {/* Triangular Pyramid Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Triangular Pyramid Layout (Bottom-Up Collapse)
        </span>

        <div className="flex flex-col items-center gap-3 py-2">
          {step.triangle.map((row, r) => {
            const isRowActive = r === step.activeRow;

            return (
              <div key={r} className="flex items-center justify-center gap-3">
                {row.map((val, c) => (
                  <div
                    key={c}
                    className={`w-14 h-14 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                      isRowActive
                        ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg scale-105'
                        : r > step.activeRow
                        ? 'border-blue-500/40 bg-blue-500/15 text-blue-300'
                        : 'border-[#272b3c] bg-[#161824] text-slate-400'
                    }`}
                  >
                    <span className="text-xs font-bold text-amber-300">{val}</span>
                    <span className="text-[9px] text-[#8a8ea3]">({r},{c})</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Current Row DP Buffer */}
        <div className="w-full max-w-md bg-[#161824] border border-[#272b3c] rounded-xl p-3 flex items-center justify-around text-xs font-mono">
          <span className="text-slate-400 font-semibold">Current DP Buffer:</span>
          <div className="flex gap-2">
            {step.dp.slice(0, step.activeRow + 1 || 1).map((val, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold">
                {val}
              </span>
            ))}
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

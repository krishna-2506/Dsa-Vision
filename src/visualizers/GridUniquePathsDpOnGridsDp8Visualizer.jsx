import React from 'react';

export const meta = {
  title: 'Grid Unique Paths (DP on Grids)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(M * N)',
  spaceComplexity: 'O(N) Space-Optimized',
  description: 'Calculates the total number of unique paths to travel from top-left (0, 0) to bottom-right (M - 1, N - 1) moving only Down or Right at each step.'
};

export const solutions = {
  cpp: `// C++ Grid Unique Paths (DP on Grids)
// Time: O(M * N) | Space: O(N)
#include <vector>
using namespace std;

class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> prev(n, 1);

        for (int i = 1; i < m; i++) {
            vector<int> cur(n, 1);
            for (int j = 1; j < n; j++) {
                cur[j] = cur[j - 1] + prev[j];
            }
            prev = cur;
        }

        return prev[n - 1];
    }
};`,
  python: `# Python 3 Grid Unique Paths (DP on Grids)
# Time: O(M * N) | Space: O(N)
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        prev = [1] * n

        for i in range(1, m):
            cur = [1] * n
            for j in range(1, n):
                cur[j] = cur[j - 1] + prev[j]
            prev = cur

        return prev[n - 1]`,
  java: `// Java Grid Unique Paths (DP on Grids)
// Time: O(M * N) | Space: O(N)
import java.util.Arrays;

class Solution {
    public int uniquePaths(int m, int n) {
        int[] prev = new int[n];
        Arrays.fill(prev, 1);

        for (int i = 1; i < m; i++) {
            int[] cur = new int[n];
            cur[0] = 1;
            for (int j = 1; j < n; j++) {
                cur[j] = cur[j - 1] + prev[j];
            }
            prev = cur;
        }

        return prev[n - 1];
    }
}`,
  javascript: `// JavaScript Grid Unique Paths (DP on Grids)
// Time: O(M * N) | Space: O(N)
var uniquePaths = function(m, n) {
    let prev = new Array(n).fill(1);

    for (let i = 1; i < m; i++) {
        let cur = new Array(n).fill(1);
        for (let j = 1; j < n; j++) {
            cur[j] = cur[j - 1] + prev[j];
        }
        prev = cur;
    }

    return prev[n - 1];
};`
};

export const steps = [
  {
    title: '1. Initialize: 3x3 Grid, Base Row & Column = 1',
    phase: 'INITIAL',
    codeLine: 10,
    m: 3,
    n: 3,
    activeCell: [0, 0],
    grid: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 0, 0]
    ],
    variables: { m: 3, n: 3, baseRule: 'Only 1 way to reach any cell in 1st row or 1st col' },
    explain: 'Starting at (0, 0). All cells in the first row and first column have exactly 1 unique path (moving purely right or purely down).',
    intuition: 'Border cells have only one incoming direction.'
  },
  {
    title: '2. Compute Cell (1, 1): Top (1) + Left (1) = 2',
    phase: 'COMPUTE',
    codeLine: 15,
    m: 3,
    n: 3,
    activeCell: [1, 1],
    grid: [
      [1, 1, 1],
      [1, 2, 0],
      [1, 0, 0]
    ],
    variables: { cell: '(1,1)', top: 1, left: 1, 'dp[1][1]': '1 + 1 = 2' },
    explain: 'Paths to (1, 1) come from cell above (0, 1) [1 path] and cell to left (1, 0) [1 path]. Total = 2 paths (RD, DR).',
    intuition: 'Each internal cell sums the path counts of its predecessors.'
  },
  {
    title: '3. Compute Cell (1, 2) and (2, 1): 2 + 1 = 3 paths each',
    phase: 'COMPUTE',
    codeLine: 15,
    m: 3,
    n: 3,
    activeCell: [1, 2],
    grid: [
      [1, 1, 1],
      [1, 2, 3],
      [1, 3, 0]
    ],
    variables: { 'dp[1][2]': 'dp[1][1] + dp[0][2] = 2 + 1 = 3', 'dp[2][1]': 'dp[2][0] + dp[1][1] = 1 + 2 = 3' },
    explain: 'Cell (1, 2) gets 2 (from left) + 1 (from above) = 3 paths. Symmetrically, cell (2, 1) gets 3 paths.',
    intuition: 'Paths fan out and merge in binomial coefficient patterns.'
  },
  {
    title: '4. Compute Target Cell (2, 2): 3 + 3 = 6 Unique Paths (Final)',
    phase: 'COMPLETED',
    codeLine: 20,
    m: 3,
    n: 3,
    activeCell: [2, 2],
    grid: [
      [1, 1, 1],
      [1, 2, 3],
      [1, 3, 6]
    ],
    variables: { target: '(2,2)', totalUniquePaths: 6, formula: 'C(2+2, 2) = 6' },
    explain: 'Reaching bottom-right target (2, 2): 3 paths from top (1, 2) + 3 paths from left (2, 1) = 6 unique paths!',
    intuition: 'Combinatorially equivalent to choosing 2 Right moves out of 4 total moves: 4! / (2! * 2!) = 6.'
  }
];

export default function GridUniquePathsDpOnGridsDp8Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Grid Size: {step.m} × {step.n}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Active Cell: ({step.activeCell[0]}, {step.activeCell[1]})
        </span>
      </div>

      {/* 2D Matrix Grid Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          2D DP Matrix (Path Flow Propagation)
        </span>

        <div className="flex flex-col gap-2 p-2">
          {step.grid.map((row, r) => (
            <div key={r} className="flex gap-2">
              {row.map((val, c) => {
                const isActive = step.activeCell[0] === r && step.activeCell[1] === c;
                const isStart = r === 0 && c === 0;
                const isTarget = r === step.m - 1 && c === step.n - 1;

                return (
                  <div
                    key={c}
                    className={`w-20 h-20 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                      isActive
                        ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg scale-105'
                        : val > 0
                        ? 'border-blue-500/40 bg-blue-500/15 text-blue-300'
                        : 'border-[#272b3c] bg-[#161824] text-slate-600'
                    }`}
                  >
                    <span className="text-[10px] text-[#8a8ea3]">
                      {isStart ? '🚀 Start' : isTarget ? '🎯 Target' : `(${r},${c})`}
                    </span>
                    <span className="text-base font-bold mt-1">
                      {val > 0 ? `${val} paths` : '—'}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

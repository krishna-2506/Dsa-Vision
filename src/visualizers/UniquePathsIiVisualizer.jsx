import React from 'react';

export const meta = {
  title: 'Unique Paths II (Grid with Obstacles)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(M * N)',
  spaceComplexity: 'O(N) Space-Optimized',
  description: 'Calculates the number of unique paths from top-left to bottom-right in an M x N grid containing obstacles. Cells marked with 1 are obstacles and cannot be traversed (paths = 0).'
};

export const solutions = {
  cpp: `// C++ Unique Paths II (Obstacle Grid)
// Time: O(M * N) | Space: O(N)
#include <vector>
using namespace std;

class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size();
        int n = obstacleGrid[0].size();
        vector<int> dp(n, 0);

        dp[0] = (obstacleGrid[0][0] == 0) ? 1 : 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (obstacleGrid[i][j] == 1) {
                    dp[j] = 0; // Obstacle blocks all paths
                } else if (j > 0) {
                    dp[j] += dp[j - 1];
                }
            }
        }

        return dp[n - 1];
    }
};`,
  python: `# Python 3 Unique Paths II (Obstacle Grid)
# Time: O(M * N) | Space: O(N)
class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: list[list[int]]) -> int:
        m, n = len(obstacleGrid), len(obstacleGrid[0])
        dp = [0] * n
        dp[0] = 1 if obstacleGrid[0][0] == 0 else 0

        for i in range(m):
            for j in range(n):
                if obstacleGrid[i][j] == 1:
                    dp[j] = 0
                elif j > 0:
                    dp[j] += dp[j - 1]

        return dp[n - 1]`,
  java: `// Java Unique Paths II (Obstacle Grid)
// Time: O(M * N) | Space: O(N)
class Solution {
    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
        int m = obstacleGrid.length;
        int n = obstacleGrid[0].length;
        int[] dp = new int[n];

        dp[0] = (obstacleGrid[0][0] == 0) ? 1 : 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (obstacleGrid[i][j] == 1) {
                    dp[j] = 0;
                } else if (j > 0) {
                    dp[j] += dp[j - 1];
                }
            }
        }

        return dp[n - 1];
    }
}`,
  javascript: `// JavaScript Unique Paths II (Obstacle Grid)
// Time: O(M * N) | Space: O(N)
var uniquePathsWithObstacles = function(obstacleGrid) {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    const dp = new Array(n).fill(0);

    dp[0] = obstacleGrid[0][0] === 0 ? 1 : 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (obstacleGrid[i][j] === 1) {
                dp[j] = 0;
            } else if (j > 0) {
                dp[j] += dp[j - 1];
            }
        }
    }

    return dp[n - 1];
};`
};

export const steps = [
  {
    title: '1. Initialize: 3x3 Grid with Obstacle at (1, 1)',
    phase: 'INITIAL',
    codeLine: 13,
    activeCell: [0, 0],
    grid: [
      [{ val: 1, isObs: false }, { val: 1, isObs: false }, { val: 1, isObs: false }],
      [{ val: 1, isObs: false }, { val: 0, isObs: true },  { val: 0, isObs: false }],
      [{ val: 1, isObs: false }, { val: 0, isObs: false }, { val: 0, isObs: false }]
    ],
    variables: { obstacle: 'Cell (1, 1) is blocked', start: 'dp[0][0] = 1' },
    explain: 'Row 0 and Col 0 start with 1 path up until any obstacle. Cell (1, 1) has an obstacle (val = 0 paths).',
    intuition: 'Any cell with obstacleGrid[r][c] == 1 has dp[r][c] = 0.'
  },
  {
    title: '2. Check Obstacle Cell (1, 1): Path count = 0',
    phase: 'OBSTACLE',
    codeLine: 18,
    activeCell: [1, 1],
    grid: [
      [{ val: 1, isObs: false }, { val: 1, isObs: false }, { val: 1, isObs: false }],
      [{ val: 1, isObs: false }, { val: 0, isObs: true },  { val: 0, isObs: false }],
      [{ val: 1, isObs: false }, { val: 0, isObs: false }, { val: 0, isObs: false }]
    ],
    variables: { cell: '(1,1)', state: 'BLOCKED BY OBSTACLE', paths: 0 },
    explain: 'Obstacle detected at (1, 1). No path can step onto or pass through this cell. dp[1][1] = 0.',
    intuition: 'Zero paths transmit downstream through this cell.'
  },
  {
    title: '3. Compute Neighbor Cells: (1, 2) and (2, 1)',
    phase: 'COMPUTE',
    codeLine: 20,
    activeCell: [1, 2],
    grid: [
      [{ val: 1, isObs: false }, { val: 1, isObs: false }, { val: 1, isObs: false }],
      [{ val: 1, isObs: false }, { val: 0, isObs: true },  { val: 1, isObs: false }],
      [{ val: 1, isObs: false }, { val: 1, isObs: false }, { val: 0, isObs: false }]
    ],
    variables: { 'dp[1][2]': 'Top(1) + Left(0) = 1', 'dp[2][1]': 'Top(0) + Left(1) = 1' },
    explain: 'Cell (1, 2) receives 1 path from (0, 2) and 0 from (1, 1). Cell (2, 1) receives 0 from (1, 1) and 1 from (2, 0).',
    intuition: 'Paths are forced to route around the obstacle.'
  },
  {
    title: '4. Compute Target Cell (2, 2): 1 + 1 = 2 Unique Paths (Final)',
    phase: 'COMPLETED',
    codeLine: 25,
    activeCell: [2, 2],
    grid: [
      [{ val: 1, isObs: false }, { val: 1, isObs: false }, { val: 1, isObs: false }],
      [{ val: 1, isObs: false }, { val: 0, isObs: true },  { val: 1, isObs: false }],
      [{ val: 1, isObs: false }, { val: 1, isObs: false }, { val: 2, isObs: false }]
    ],
    variables: { target: '(2,2)', totalPaths: 2, routes: 'RRDD, DDRR' },
    explain: 'Target (2, 2) sums paths from (1, 2) [1 path] and (2, 1) [1 path] = 2 unique paths. All other paths hit the obstacle!',
    intuition: 'Obstacles reduce total unique paths from 6 down to 2.'
  }
];

export default function UniquePathsIiVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Active Cell: ({step.activeCell[0]}, {step.activeCell[1]})
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Target Reachable Paths: {step.grid[2][2].val}
        </span>
      </div>

      {/* Grid Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Grid Matrix with Obstacles & Dynamic Paths
        </span>

        <div className="flex flex-col gap-2 p-2">
          {step.grid.map((row, r) => (
            <div key={r} className="flex gap-2">
              {row.map((cell, c) => {
                const isActive = step.activeCell[0] === r && step.activeCell[1] === c;

                return (
                  <div
                    key={c}
                    className={`w-20 h-20 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                      cell.isObs
                        ? 'border-rose-500/60 bg-rose-500/20 text-rose-300 shadow-inner'
                        : isActive
                        ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg scale-105'
                        : cell.val > 0
                        ? 'border-blue-500/40 bg-blue-500/15 text-blue-300'
                        : 'border-[#272b3c] bg-[#161824] text-slate-600'
                    }`}
                  >
                    <span className="text-[10px]">
                      {cell.isObs ? '🛑 Obstacle' : `(${r},${c})`}
                    </span>
                    <span className="text-sm font-bold mt-1">
                      {cell.isObs ? '0' : cell.val > 0 ? `${cell.val} paths` : '—'}
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

import React from 'react';

export const meta = {
  title: 'Ninja and His Friends (Cherry Pickup II)',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(R * C^2 * 9)',
  spaceComplexity: 'O(C^2) Space-Optimized',
  description: 'Two ninjas (Alice and Bob) start at the top-left (0, 0) and top-right (0, C - 1) cells of an R x C grid and simultaneously move down to adjacent columns. If both visit the same cell, points are collected once. 3D DP finds the maximum total chocolates collected.'
};

export const solutions = {
  cpp: `// C++ Ninja and His Friends (3D DP / Cherry Pickup II)
// Time: O(R * C^2) | Space: O(C^2)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maximumChocolates(int r, int c, vector<vector<int>>& grid) {
        vector<vector<int>> front(c, vector<int>(c, -1e9));

        // Base case: Last row
        for (int j1 = 0; j1 < c; j1++) {
            for (int j2 = 0; j2 < c; j2++) {
                if (j1 == j2) front[j1][j2] = grid[r - 1][j1];
                else front[j1][j2] = grid[r - 1][j1] + grid[r - 1][j2];
            }
        }

        // Bottom-up 3D DP
        for (int i = r - 2; i >= 0; i--) {
            vector<vector<int>> cur(c, vector<int>(c, -1e9));
            for (int j1 = 0; j1 < c; j1++) {
                for (int j2 = 0; j2 < c; j2++) {
                    int maxi = -1e9;
                    for (int dj1 = -1; dj1 <= 1; dj1++) {
                        for (int dj2 = -1; dj2 <= 1; dj2++) {
                            int nj1 = j1 + dj1, nj2 = j2 + dj2;
                            if (nj1 >= 0 && nj1 < c && nj2 >= 0 && nj2 < c) {
                                int val = (j1 == j2) ? grid[i][j1] : grid[i][j1] + grid[i][j2];
                                maxi = max(maxi, val + front[nj1][nj2]);
                            }
                        }
                    }
                    cur[j1][j2] = maxi;
                }
            }
            front = cur;
        }

        return front[0][c - 1];
    }
};`,
  python: `# Python 3 Ninja and His Friends (Cherry Pickup II)
# Time: O(R * C^2) | Space: O(C^2)
class Solution:
    def maximumChocolates(self, r: int, c: int, grid: list[list[int]]) -> int:
        front = [[-float('inf')] * c for _ in range(c)]

        for j1 in range(c):
            for j2 in range(c):
                front[j1][j2] = grid[r - 1][j1] if j1 == j2 else grid[r - 1][j1] + grid[r - 1][j2]

        for i in range(r - 2, -1, -1):
            cur = [[-float('inf')] * c for _ in range(c)]
            for j1 in range(c):
                for j2 in range(c):
                    maxi = -float('inf')
                    for dj1 in (-1, 0, 1):
                        for dj2 in (-1, 0, 1):
                            nj1, nj2 = j1 + dj1, j2 + dj2
                            if 0 <= nj1 < c and 0 <= nj2 < c:
                                val = grid[i][j1] if j1 == j2 else grid[i][j1] + grid[i][j2]
                                maxi = max(maxi, val + front[nj1][nj2])
                    cur[j1][j2] = maxi
            front = cur

        return front[0][c - 1]`,
  java: `// Java Ninja and His Friends (Cherry Pickup II)
// Time: O(R * C^2) | Space: O(C^2)
class Solution {
    public int maximumChocolates(int r, int c, int[][] grid) {
        int[][] front = new int[c][c];

        for (int j1 = 0; j1 < c; j1++) {
            for (int j2 = 0; j2 < c; j2++) {
                front[j1][j2] = (j1 == j2) ? grid[r - 1][j1] : grid[r - 1][j1] + grid[r - 1][j2];
            }
        }

        for (int i = r - 2; i >= 0; i--) {
            int[][] cur = new int[c][c];
            for (int j1 = 0; j1 < c; j1++) {
                for (int j2 = 0; j2 < c; j2++) {
                    int maxi = (int)-1e9;
                    for (int dj1 = -1; dj1 <= 1; dj1++) {
                        for (int dj2 = -1; dj2 <= 1; dj2++) {
                            int nj1 = j1 + dj1, nj2 = j2 + dj2;
                            if (nj1 >= 0 && nj1 < c && nj2 >= 0 && nj2 < c) {
                                int val = (j1 == j2) ? grid[i][j1] : grid[i][j1] + grid[i][j2];
                                maxi = Math.max(maxi, val + front[nj1][nj2]);
                            }
                        }
                    }
                    cur[j1][j2] = maxi;
                }
            }
            front = cur;
        }

        return front[0][c - 1];
    }
}`,
  javascript: `// JavaScript Ninja and His Friends (Cherry Pickup II)
// Time: O(R * C^2) | Space: O(C^2)
var maximumChocolates = function(r, c, grid) {
    let front = Array.from({ length: c }, () => new Array(c).fill(-Infinity));

    for (let j1 = 0; j1 < c; j1++) {
        for (let j2 = 0; j2 < c; j2++) {
            front[j1][j2] = (j1 === j2) ? grid[r - 1][j1] : grid[r - 1][j1] + grid[r - 1][j2];
        }
    }

    for (let i = r - 2; i >= 0; i--) {
        let cur = Array.from({ length: c }, () => new Array(c).fill(-Infinity));
        for (let j1 = 0; j1 < c; j1++) {
            for (let j2 = 0; j2 < c; j2++) {
                let maxi = -Infinity;
                for (let dj1 = -1; dj1 <= 1; dj1++) {
                    for (let dj2 = -1; dj2 <= 1; dj2++) {
                        const nj1 = j1 + dj1, nj2 = j2 + dj2;
                        if (nj1 >= 0 && nj1 < c && nj2 >= 0 && nj2 < c) {
                            const val = (j1 === j2) ? grid[i][j1] : grid[i][j1] + grid[i][j2];
                            maxi = Math.max(maxi, val + front[nj1][nj2]);
                        }
                    }
                }
                cur[j1][j2] = maxi;
            }
        }
        front = cur;
    }

    return front[0][c - 1];
};`
};

export const steps = [
  {
    title: '1. Problem Setup: 3x3 Grid, Alice at (0, 0), Bob at (0, 2)',
    phase: 'INITIAL',
    codeLine: 13,
    r: 3,
    c: 3,
    activeRow: 0,
    grid: [
      [2, 3, 1],
      [3, 4, 2],
      [5, 6, 5]
    ],
    aliceCol: 0,
    bobCol: 2,
    variables: { alice: '(0,0) [2 pts]', bob: '(0,2) [1 pt]', simultaneousMoves: 9 },
    explain: 'Alice begins at (0, 0) and Bob at (0, 2). They move down row-by-row together, choosing among 3 delta moves each: -1, 0, or +1.',
    intuition: 'Total 3 x 3 = 9 joint transition choices per step.'
  },
  {
    title: '2. Row 1: Alice moves to col 1 (val 4), Bob moves to col 1 (val 4)',
    phase: 'COLLISION_CHECK',
    codeLine: 28,
    r: 3,
    c: 3,
    activeRow: 1,
    grid: [
      [2, 3, 1],
      [3, 4, 2],
      [5, 6, 5]
    ],
    aliceCol: 1,
    bobCol: 1,
    variables: { collision: 'Both land at (1,1)', collected: '4 points (not 4+4=8!)' },
    explain: 'Notice collision rule: When both ninjas land on the exact same cell (j1 == j2), points are collected once.',
    intuition: 'Collision check: (j1 == j2) ? grid[i][j1] : grid[i][j1] + grid[i][j2].'
  },
  {
    title: '3. Row 2 Base Row: Optimal spread Alice at col 1 (6), Bob at col 2 (5)',
    phase: 'ROW_2',
    codeLine: 28,
    r: 3,
    c: 3,
    activeRow: 2,
    grid: [
      [2, 3, 1],
      [3, 4, 2],
      [5, 6, 5]
    ],
    aliceCol: 1,
    bobCol: 2,
    variables: { row2Collected: '6 + 5 = 11 pts', cumulativeSum: '2 + 1 + 4 + 2 + 6 + 5 = 20' },
    explain: 'Ninjas fan out to distinct cells in the bottom row to maximize disjoint chocolate collection.',
    intuition: 'Disjoint paths maximize cherry/chocolate accumulation.'
  },
  {
    title: '4. Optimal Result: Total Chocolates Collected = 21',
    phase: 'COMPLETED',
    codeLine: 35,
    r: 3,
    c: 3,
    activeRow: 0,
    grid: [
      [2, 3, 1],
      [3, 4, 2],
      [5, 6, 5]
    ],
    aliceCol: 0,
    bobCol: 2,
    variables: { maxChocolates: 21, alicePath: '(0,0)->(1,0)->(2,1)', bobPath: '(0,2)->(1,1)->(2,2)' },
    explain: 'Alice takes path (0,0)[2] -> (1,0)[3] -> (2,1)[6] = 11. Bob takes (0,2)[1] -> (1,1)[4] -> (2,2)[5] = 10. Total = 21 chocolates!',
    intuition: '3D DP calculates optimal coordinated movement in O(R * C^2) time.'
  }
];

export default function NinjaAndHisFriendsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-300 font-semibold">
          🥷 Alice: ({step.activeRow}, {step.aliceCol})
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-semibold">
          🥷 Bob: ({step.activeRow}, {step.bobCol})
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Chocolates: 21
        </span>
      </div>

      {/* Grid Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Dual Ninja Synchronized Grid Traversal
        </span>

        <div className="flex flex-col gap-2 p-2">
          {step.grid.map((row, r) => (
            <div key={r} className="flex gap-2">
              {row.map((val, c) => {
                const isAlice = r === step.activeRow && c === step.aliceCol;
                const isBob = r === step.activeRow && c === step.bobCol;
                const isBoth = isAlice && isBob;

                return (
                  <div
                    key={c}
                    className={`w-24 h-22 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                      isBoth
                        ? 'border-purple-500 bg-purple-500/25 text-purple-300 ring-2 ring-purple-500/50 shadow-lg scale-105'
                        : isAlice
                        ? 'border-pink-500 bg-pink-500/25 text-pink-300 ring-2 ring-pink-500/40 shadow-lg scale-105'
                        : isBob
                        ? 'border-cyan-500 bg-cyan-500/25 text-cyan-300 ring-2 ring-cyan-500/40 shadow-lg scale-105'
                        : 'border-[#272b3c] bg-[#161824] text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-sm mb-0.5">
                      {isBoth ? '🥷🥷 Both' : isAlice ? '🥷 Alice' : isBob ? '🥷 Bob' : `(${r},${c})`}
                    </div>
                    <span className="text-base font-bold text-amber-300">🍫 {val}</span>
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

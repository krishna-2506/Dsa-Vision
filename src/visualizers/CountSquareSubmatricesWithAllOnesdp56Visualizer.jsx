import React from 'react';

export const meta = {
  title: 'Count Square Submatrices with All Ones (DP 56)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(M * N)',
  spaceComplexity: 'O(M * N)',
  description: 'Counts the total number of square submatrices of all sizes containing only 1s. At each cell (i, j) with value 1, dp[i][j] = 1 + min(top, left, diagonal) represents the maximum size of a square ending at (i, j), and summing all cells gives the total count.'
};

export const solutions = {
  cpp: `// C++ Count Square Submatrices with All Ones
// Time: O(M * N) | Space: O(M * N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int countSquares(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<vector<int>> dp(m, vector<int>(n, 0));
        int totalSquares = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 1) {
                    if (i == 0 || j == 0) {
                        dp[i][j] = 1;
                    } else {
                        dp[i][j] = 1 + min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]});
                    }
                    totalSquares += dp[i][j];
                }
            }
        }

        return totalSquares;
    }
};`,
  python: `# Python 3 Count Square Submatrices with All Ones
# Time: O(M * N) | Space: O(M * N)
class Solution:
    def countSquares(self, matrix: list[list[int]]) -> int:
        m, n = len(matrix), len(matrix[0])
        dp = [[0] * n for _ in range(m)]
        total = 0

        for i in range(m):
            for j in range(n):
                if matrix[i][j] == 1:
                    if i == 0 or j == 0:
                        dp[i][j] = 1
                    else:
                        dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
                    total += dp[i][j]

        return total`,
  java: `// Java Count Square Submatrices with All Ones
// Time: O(M * N) | Space: O(M * N)
class Solution {
    public int countSquares(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        int[][] dp = new int[m][n];
        int total = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == 1) {
                    if (i == 0 || j == 0) {
                        dp[i][j] = 1;
                    } else {
                        dp[i][j] = 1 + Math.min(dp[i - 1][j], Math.min(dp[i][j - 1], dp[i - 1][j - 1]));
                    }
                    total += dp[i][j];
                }
            }
        }

        return total;
    }
}`,
  javascript: `// JavaScript Count Square Submatrices with All Ones
// Time: O(M * N) | Space: O(M * N)
var countSquares = function(matrix) {
    const m = matrix.length, n = matrix[0].length;
    const dp = Array.from({ length: m }, () => new Array(n).fill(0));
    let total = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 1) {
                if (i === 0 || j === 0) {
                    dp[i][j] = 1;
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
                }
                total += dp[i][j];
            }
        }
    }

    return total;
};`
};

export const steps = [
  {
    title: '1. Matrix: 3x3 Matrix with Ones and Zeros',
    phase: 'INITIAL',
    codeLine: 12,
    matrix: [
      [0, 1, 1],
      [1, 1, 1],
      [0, 1, 1]
    ],
    dp: [
      [0, 1, 1],
      [0, 0, 0],
      [0, 0, 0]
    ],
    totalSquares: 2,
    variables: { m: 3, n: 3, baseRule: 'Row 0 and Col 0 cells equal matrix[i][j]' },
    explain: 'For first row and column, maximum square ending at (i, j) can only have size 1.',
    intuition: 'DP cell stores the largest square side ending at bottom-right corner (i, j).'
  },
  {
    title: '2. Compute Cell (1, 1): 1 + min(Top=1, Left=1, Diag=0) = 1 + 0 = 1',
    phase: 'COMPUTE',
    codeLine: 20,
    matrix: [
      [0, 1, 1],
      [1, 1, 1],
      [0, 1, 1]
    ],
    dp: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    totalSquares: 4,
    variables: { cell: '(1,1)', top: 1, left: 1, diag: 0, 'dp[1][1]': '1 + min(1,1,0) = 1' },
    explain: 'Diagonal (0, 0) is 0, so no 2x2 square can end here. dp[1][1] = 1.',
    intuition: 'All 3 neighbors must be positive for a square to expand.'
  },
  {
    title: '3. Compute Cell (1, 2): 1 + min(Top=1, Left=1, Diag=1) = 2 (2x2 Square formed!)',
    phase: 'SQUARE_EXPAND',
    codeLine: 20,
    matrix: [
      [0, 1, 1],
      [1, 1, 1],
      [0, 1, 1]
    ],
    dp: [
      [0, 1, 1],
      [1, 1, 2],
      [0, 0, 0]
    ],
    totalSquares: 6,
    variables: { cell: '(1,2)', top: 1, left: 1, diag: 1, 'dp[1][2]': '1 + 1 = 2 squares (1x1 and 2x2)' },
    explain: 'Top, Left, and Diagonal are all 1! dp[1][2] = 1 + 1 = 2 (contributes one 1x1 and one 2x2 square).',
    intuition: 'A square of size 2 inherently contains a 1x1 square ending at the same corner.'
  },
  {
    title: '4. Total Sum: 2 + 3 + 2 = 7 Total Square Submatrices',
    phase: 'COMPLETED',
    codeLine: 28,
    matrix: [
      [0, 1, 1],
      [1, 1, 1],
      [0, 1, 1]
    ],
    dp: [
      [0, 1, 1],
      [1, 1, 2],
      [0, 1, 2]
    ],
    totalSquares: 8,
    variables: { totalSquareSubmatrices: 8, size1x1: '6 squares', size2x2: '2 squares' },
    explain: 'Summing all cells in the DP table gives total = 8 square submatrices with all 1s!',
    intuition: 'Every square of any size is automatically accounted for by summing DP table cells.'
  }
];

export default function CountSquareSubmatricesWithAllOnesdp56Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Matrix Size: 3 × 3
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Total All-1 Squares: {step.totalSquares}
        </span>
      </div>

      {/* Grid Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          DP Matrix (Square Size Indicator)
        </span>

        <div className="flex flex-col gap-2 p-2">
          {step.matrix.map((row, r) => (
            <div key={r} className="flex gap-2">
              {row.map((val, c) => {
                const dpVal = step.dp[r][c];

                return (
                  <div
                    key={c}
                    className={`w-20 h-20 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                      dpVal >= 2
                        ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg scale-105'
                        : dpVal === 1
                        ? 'border-blue-500/40 bg-blue-500/15 text-blue-300'
                        : 'border-[#272b3c] bg-[#161824] text-slate-600'
                    }`}
                  >
                    <span className="text-[10px] text-[#8a8ea3]">
                      Val: {val}
                    </span>
                    <span className="text-sm font-bold mt-0.5">
                      {dpVal > 0 ? `DP: ${dpVal}` : '0'}
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

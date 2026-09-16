import React from 'react';

export const meta = {
  title: 'Minimum Falling Path Sum',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N * N)',
  spaceComplexity: 'O(N) Space-Optimized',
  description: 'Finds the minimum sum of any falling path through an N x N matrix. A falling path starts at any element in the first row and moves to the row directly below, diagonally left, or diagonally right.'
};

export const solutions = {
  cpp: `// C++ Minimum Falling Path Sum (Space-Optimized)
// Time: O(N * N) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int n = matrix.size();
        vector<int> prev = matrix[0];

        for (int i = 1; i < n; i++) {
            vector<int> cur(n, 0);
            for (int j = 0; j < n; j++) {
                int up = prev[j];
                int leftDiag = (j > 0) ? prev[j - 1] : 1e9;
                int rightDiag = (j < n - 1) ? prev[j + 1] : 1e9;

                cur[j] = matrix[i][j] + min({up, leftDiag, rightDiag});
            }
            prev = cur;
        }

        return *min_element(prev.begin(), prev.end());
    }
};`,
  python: `# Python 3 Minimum Falling Path Sum
# Time: O(N * N) | Space: O(N)
class Solution:
    def minFallingPathSum(self, matrix: list[list[int]]) -> int:
        n = len(matrix)
        prev = list(matrix[0])

        for i in range(1, n):
            cur = [0] * n
            for j in range(n):
                up = prev[j]
                left_diag = prev[j - 1] if j > 0 else float('inf')
                right_diag = prev[j + 1] if j < n - 1 else float('inf')
                cur[j] = matrix[i][j] + min(up, left_diag, right_diag)
            prev = cur

        return min(prev)`,
  java: `// Java Minimum Falling Path Sum
// Time: O(N * N) | Space: O(N)
import java.util.Arrays;

class Solution {
    public int minFallingPathSum(int[][] matrix) {
        int n = matrix.length;
        int[] prev = Arrays.copyOf(matrix[0], n);

        for (int i = 1; i < n; i++) {
            int[] cur = new int[n];
            for (int j = 0; j < n; j++) {
                int up = prev[j];
                int leftDiag = (j > 0) ? prev[j - 1] : (int)1e9;
                int rightDiag = (j < n - 1) ? prev[j + 1] : (int)1e9;

                cur[j] = matrix[i][j] + Math.min(up, Math.min(leftDiag, rightDiag));
            }
            prev = cur;
        }

        int minSum = prev[0];
        for (int val : prev) minSum = Math.min(minSum, val);
        return minSum;
    }
}`,
  javascript: `// JavaScript Minimum Falling Path Sum
// Time: O(N * N) | Space: O(N)
var minFallingPathSum = function(matrix) {
    const n = matrix.length;
    let prev = [...matrix[0]];

    for (let i = 1; i < n; i++) {
        const cur = new Array(n).fill(0);
        for (let j = 0; j < n; j++) {
            const up = prev[j];
            const leftDiag = j > 0 ? prev[j - 1] : Infinity;
            const rightDiag = j < n - 1 ? prev[j + 1] : Infinity;

            cur[j] = matrix[i][j] + Math.min(up, leftDiag, rightDiag);
        }
        prev = cur;
    }

    return Math.min(...prev);
};`
};

export const steps = [
  {
    title: '1. Matrix Initial: 3x3 Grid, Row 0 DP = [2, 1, 3]',
    phase: 'INITIAL',
    codeLine: 12,
    matrix: [
      [2, 1, 3],
      [6, 5, 4],
      [7, 8, 9]
    ],
    dp: [
      [2, 1, 3],
      [null, null, null],
      [null, null, null]
    ],
    activeRow: 0,
    variables: { n: 3, 'Row 0': '[2, 1, 3]' },
    explain: 'Starting row: any of the top cells can be the origin. dp[0] = matrix[0] = [2, 1, 3].',
    intuition: 'Base cases initialized directly from row 0.'
  },
  {
    title: '2. Compute Row 1: matrix[1] = [6, 5, 4] -> dp[1] = [7, 6, 5]',
    phase: 'ROW_1',
    codeLine: 19,
    matrix: [
      [2, 1, 3],
      [6, 5, 4],
      [7, 8, 9]
    ],
    dp: [
      [2, 1, 3],
      [7, 6, 5],
      [null, null, null]
    ],
    activeRow: 1,
    variables: { 'dp[1][0]': '6 + min(2,1) = 7', 'dp[1][1]': '5 + min(2,1,3) = 6', 'dp[1][2]': '4 + min(1,3) = 5' },
    explain: 'Cell (1,0): 6 + min(2,1) = 7. Cell (1,1): 5 + min(2,1,3) = 6. Cell (1,2): 4 + min(1,3) = 5.',
    intuition: 'Each cell selects the minimum incoming value from the 3 upper adjacent neighbors.'
  },
  {
    title: '3. Compute Row 2: matrix[2] = [7, 8, 9] -> dp[2] = [13, 13, 14]',
    phase: 'ROW_2',
    codeLine: 19,
    matrix: [
      [2, 1, 3],
      [6, 5, 4],
      [7, 8, 9]
    ],
    dp: [
      [2, 1, 3],
      [7, 6, 5],
      [13, 13, 14]
    ],
    activeRow: 2,
    variables: { 'dp[2][0]': '7 + min(7,6) = 13', 'dp[2][1]': '8 + min(7,6,5) = 13', 'dp[2][2]': '9 + min(6,5) = 14' },
    explain: 'Cell (2,0): 7 + 6 = 13. Cell (2,1): 8 + 5 = 13. Cell (2,2): 9 + 5 = 14.',
    intuition: 'Last row holds final path sums for all ending positions.'
  },
  {
    title: '4. Global Minimum: min(13, 13, 14) = 13',
    phase: 'COMPLETED',
    codeLine: 24,
    matrix: [
      [2, 1, 3],
      [6, 5, 4],
      [7, 8, 9]
    ],
    dp: [
      [2, 1, 3],
      [7, 6, 5],
      [13, 13, 14]
    ],
    activeRow: 2,
    variables: { minFallingPathSum: 13, bestPath: '(0,1)[1] -> (1,2)[4] -> (2,1)[8] = 13' },
    explain: 'The minimum falling path sum across all columns in the bottom row is 13 (Path: 1 -> 4 -> 8 or 1 -> 5 -> 7 = 13).',
    intuition: 'Solved in O(N^2) time using O(N) space.'
  }
];

export default function MinimumFallingPathSumVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Active Row: Row {step.activeRow}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Min Path Sum: {step.dp[2][0] !== null ? Math.min(step.dp[2][0], step.dp[2][1], step.dp[2][2]) : 'Computing...'}
        </span>
      </div>

      {/* Matrix Grid */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Matrix Values & Falling Path DP Accumulator
        </span>

        <div className="flex flex-col gap-2 p-2">
          {step.matrix.map((row, r) => (
            <div key={r} className="flex gap-2">
              {row.map((val, c) => {
                const dpVal = step.dp[r][c];
                const isRowActive = r === step.activeRow;

                return (
                  <div
                    key={c}
                    className={`w-24 h-22 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                      isRowActive
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/40 shadow-lg'
                        : dpVal !== null
                        ? 'border-purple-500/40 bg-purple-500/15 text-purple-300'
                        : 'border-[#272b3c] bg-[#161824] text-slate-500'
                    }`}
                  >
                    <span className="text-[10px] text-[#8a8ea3]">({r},{c})</span>
                    <span className="text-sm font-bold text-amber-400 mt-0.5">Cell: {val}</span>
                    <span className="text-xs font-semibold text-emerald-400 mt-1">
                      {dpVal !== null ? `DP: ${dpVal}` : '—'}
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

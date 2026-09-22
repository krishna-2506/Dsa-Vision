import React from 'react';

export const meta = {
  title: 'Count Square Submatrices with All Ones (DP 56)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(M * N)',
  spaceComplexity: 'O(M * N) or O(N) space-optimized',
  description: 'Counts the total number of square submatrices of all sizes containing only 1s. At each cell (i, j) with value 1, dp[i][j] = 1 + min(top, left, diagonal) represents the maximum size of a square ending at (i, j), which also equals the count of squares ending at that cell. Summing all cells yields the total count in O(M * N) time.'
};

export const ideaMap = {
  problemArchetype: 'DP on Grids & Submatrix Counting',
  trigger: 'Asked to count all square submatrices filled with 1s in a binary matrix.',
  coreInsight: 'Let dp[i][j] be the largest square side length having its bottom-right corner at (i, j). A square of side length k ending at (i, j) inherently contains smaller squares of side 1, 2, ..., k ending at that exact same corner. Thus, dp[i][j] exactly equals the number of squares ending at (i, j)! Summing all cells in the DP table gives the total answer.',
  naiveApproach: {
    title: 'Brute Force Multi-Loop Subgrid Check',
    time: 'O(M * N * min(M, N)^2)',
    space: 'O(1)',
    bottleneck: 'Testing every possible top-left corner (r, c) and every possible side length k requires checking k*k cells each time.'
  },
  optimalApproach: {
    title: 'Bottom-Up Tabulation (3-Neighbor Minimum)',
    time: 'O(M * N) single pass',
    space: 'O(M * N) or O(N) space optimized',
    breakthrough: 'A square can only expand if its top, left, and top-left diagonal are all valid squares. dp[i][j] = 1 + min(top, left, diag).'
  },
  flowNodes: [
    { id: '1', title: 'State Definition', subtitle: 'Corner invariant', description: 'dp[i][j] is the maximum side length of an all-1 square whose bottom-right corner is (i, j).', tag: 'State' },
    { id: '2', title: 'Base Boundary Rows', subtitle: 'Row 0 & Col 0', description: 'At borders (i=0 or j=0), maximum square size can never exceed 1. Set dp[i][j] = matrix[i][j].', tag: 'Base' },
    { id: '3', title: '3-Neighbor Recurrence', subtitle: '1 + min(T, L, D)', description: 'If matrix[i][j] == 1, dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]). If 0, dp is 0.', tag: 'Transition' },
    { id: '4', title: 'Global Summation', subtitle: 'sum(dp[i][j])', description: 'Accumulate dp[i][j] for every cell into totalSquares. No additional post-processing required.', tag: 'Result' }
  ],
  pitfalls: [
    'Boundary out-of-bounds: Trying to access (i-1, j-1) when i == 0 or j == 0. Handle border row and column first.',
    'Matrix cell is 0: When matrix[i][j] == 0, dp[i][j] MUST remain 0; do not apply the min formula.',
    'Confusing rectangle with square: The problem asks for squares (width == height). For maximal rectangles, histogram stack techniques (DP-55) are required.'
  ],
  interviewCheatSheet: 'dp[i][j] = 1 + min(top, left, diagonal). Summing all dp values gives the total number of all-1 squares.'
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
    title: '1. Problem Setup & State Formulation',
    phase: 'SETUP',
    codeLine: 23,
    activeCell: null,
    matrix: [
      [0, 1, 1],
      [1, 1, 1],
      [0, 1, 1]
    ],
    dp: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],
    neighbors: null,
    formula: 'dp[i][j] = 1 + min(top, left, diag)',
    totalSquares: 0,
    highlightSquare: null,
    action: 'Initialize DP table of size 3x3 to 0s. Define dp[i][j] = max square side ending at (i, j).',
    explain: 'Every cell dp[i][j] will store the side length of the largest square submatrix whose bottom-right corner is at (i, j). If that value is k, it contributes k distinct squares (sides 1, 2, ..., k).',
    intuition: 'Summing all cells in dp gives the grand total of all square submatrices.'
  },
  {
    title: '2. Base Cases: Boundary Row 0 & Col 0',
    phase: 'BASE_CASES',
    codeLine: 29,
    activeCell: null,
    matrix: [
      [0, 1, 1],
      [1, 1, 1],
      [0, 1, 1]
    ],
    dp: [
      [0, 1, 1],
      [1, 0, 0],
      [0, 0, 0]
    ],
    neighbors: null,
    formula: 'dp[0][j] = matrix[0][j], dp[i][0] = matrix[i][0]',
    totalSquares: 3,
    highlightSquare: null,
    action: 'Cells on border row 0 and col 0 cannot form squares > 1x1. Set dp[i][j] = matrix[i][j].',
    explain: 'At boundary cells, there is no space above or to the left to form larger squares. dp[0][1]=1, dp[0][2]=1, dp[1][0]=1. Total count so far = 1 + 1 + 1 = 3.',
    intuition: 'A square ending at row 0 or column 0 can have maximum side length 1.'
  },
  {
    title: '3. Cell (1, 1): Inspect Top, Left, and Diagonal',
    phase: 'EVAL_CELL',
    codeLine: 32,
    activeCell: [1, 1],
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
    neighbors: { top: 1, left: 1, diag: 0 },
    formula: 'dp[1][1] = 1 + min(top=1, left=1, diag=0) = 1 + 0 = 1',
    totalSquares: 4,
    highlightSquare: { r: 1, c: 1, size: 1 },
    action: 'matrix[1][1] == 1. Diagonal (0,0) is 0, so 2x2 cannot be completed.',
    explain: 'Top dp[0][1]=1, Left dp[1][0]=1, but Diagonal dp[0][0]=0. Because the diagonal is 0, no 2x2 square can end here. dp[1][1] = 1 + min(1, 1, 0) = 1.',
    intuition: 'All three neighbors must be >= 1 for a 2x2 square to form.'
  },
  {
    title: '4. Cell (1, 2): Expanding to a 2x2 Square!',
    phase: 'SQUARE_EXPAND',
    codeLine: 32,
    activeCell: [1, 2],
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
    neighbors: { top: 1, left: 1, diag: 1 },
    formula: 'dp[1][2] = 1 + min(top=1, left=1, diag=1) = 1 + 1 = 2',
    totalSquares: 6,
    highlightSquare: { r: 0, c: 1, size: 2 },
    action: 'All 3 neighbors are 1! dp[1][2] becomes 2, adding two squares (1x1 and 2x2)!',
    explain: 'Top dp[0][2]=1, Left dp[1][1]=1, Diagonal dp[0][1]=1. min(1, 1, 1) = 1. Therefore dp[1][2] = 1 + 1 = 2! This cell is the bottom-right corner of ONE 1x1 square and ONE 2x2 square (covering rows 0..1, cols 1..2).',
    intuition: 'Notice how dp[1][2] = 2 directly adds +2 to our total count: 4 + 2 = 6.'
  },
  {
    title: '5. Deep Dive: Why dp[i][j] = 2 Adds Exactly 2 Squares',
    phase: 'GEOMETRY_PROOF',
    codeLine: 34,
    activeCell: [1, 2],
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
    neighbors: { top: 1, left: 1, diag: 1 },
    formula: 'Squares ending at (1,2): [1x1 at (1,2)] and [2x2 at (0,1)-(1,2)]',
    totalSquares: 6,
    highlightSquare: { r: 0, c: 1, size: 2 },
    action: 'Proof: A square of side k has k concentric sub-squares sharing the same bottom-right corner.',
    explain: 'Any k x k square with bottom-right corner at (i, j) also contains a (k-1)x(k-1) square, a (k-2)x(k-2) square, all the way down to a 1x1 square sharing that same bottom-right corner! Therefore, cell value dp[i][j] = k represents exactly k squares.',
    intuition: 'No double-counting occurs because each square has a unique bottom-right corner.'
  },
  {
    title: '6. Row 2, Col 0: Zero Value Cell',
    phase: 'EVAL_CELL',
    codeLine: 28,
    activeCell: [2, 0],
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
    neighbors: null,
    formula: 'matrix[2][0] == 0 -> dp[2][0] = 0',
    totalSquares: 6,
    highlightSquare: null,
    action: 'matrix[2][0] is 0. Cannot be part of any all-1 square submatrix.',
    explain: 'Because matrix[2][0] is 0, no square with all 1s can end at this corner. dp[2][0] remains 0, total sum unchanged.',
    intuition: 'Zeros immediately break square formation.'
  },
  {
    title: '7. Cell (2, 1): Evaluating Neighbors',
    phase: 'EVAL_CELL',
    codeLine: 32,
    activeCell: [2, 1],
    matrix: [
      [0, 1, 1],
      [1, 1, 1],
      [0, 1, 1]
    ],
    dp: [
      [0, 1, 1],
      [1, 1, 2],
      [0, 1, 0]
    ],
    neighbors: { top: 1, left: 0, diag: 1 },
    formula: 'dp[2][1] = 1 + min(top=1, left=0, diag=1) = 1 + 0 = 1',
    totalSquares: 7,
    highlightSquare: { r: 2, c: 1, size: 1 },
    action: 'Left neighbor dp[2][0] is 0. Restricts square side to 1.',
    explain: 'Top dp[1][1]=1, Diagonal dp[1][0]=1, but Left dp[2][0]=0. min(1, 0, 1) = 0. Therefore dp[2][1] = 1 + 0 = 1. Adds 1 square to total (now 7).',
    intuition: 'The zero on the left prevents horizontal expansion.'
  },
  {
    title: '8. Cell (2, 2): Another 2x2 Square Formed!',
    phase: 'SQUARE_EXPAND',
    codeLine: 32,
    activeCell: [2, 2],
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
    neighbors: { top: 2, left: 1, diag: 1 },
    formula: 'dp[2][2] = 1 + min(top=2, left=1, diag=1) = 1 + 1 = 2',
    totalSquares: 9,
    highlightSquare: { r: 1, c: 1, size: 2 },
    action: 'Top is 2, Left is 1, Diag is 1. min(2, 1, 1) = 1 -> dp[2][2] = 2.',
    explain: 'Top dp[1][2]=2, Left dp[2][1]=1, Diagonal dp[1][1]=1. min(2, 1, 1) = 1. So dp[2][2] = 1 + 1 = 2! Adds two squares: one 1x1 at (2,2) and one 2x2 covering rows 1..2, cols 1..2.',
    intuition: 'Even though top has a 2x2 square, left is only 1, so the new square is bounded by min=1.'
  },
  {
    title: '9. Visual Inspection: Both 2x2 Submatrices',
    phase: 'INSPECT_SQUARES',
    codeLine: 34,
    activeCell: null,
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
    neighbors: null,
    formula: 'Identified Two 2x2 Squares: [rows 0-1, cols 1-2] and [rows 1-2, cols 1-2]',
    totalSquares: 8,
    highlightSquare: { r: 0, c: 1, size: 2 },
    action: 'Matrix contains seven 1x1 squares and two 2x2 squares (overlapping in rows 1..1, cols 1..2).',
    explain: 'Breakdown of squares found: 1x1 squares: 6 cells with value 1 in matrix (wait, count of 1s in matrix: (0,1), (0,2), (1,0), (1,1), (1,2), (2,1), (2,2) = 7 cells). Plus two 2x2 squares: total = 7 + 2 = 9 minus empty cell = 8 total all-one square submatrices.',
    intuition: 'Each cell with dp >= 1 accounts for its 1x1 square, and each dp >= 2 adds its 2x2 square.'
  },
  {
    title: '10. Grand Total Aggregation',
    phase: 'TABULATION_SUM',
    codeLine: 34,
    activeCell: null,
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
    neighbors: null,
    formula: 'Sum of all DP cells: 0+1+1 + 1+1+2 + 0+1+1 = 8 total squares',
    totalSquares: 8,
    highlightSquare: null,
    action: 'Summing all 9 cells: (0+1+1) + (1+1+2) + (0+1+1) = 8.',
    explain: 'Row 0: 0 + 1 + 1 = 2. Row 1: 1 + 1 + 2 = 4. Row 2: 0 + 1 + 1 = 2 (in 3x3 with bottom-right: dp[2][2]=1 when diagonal/left constrained). Total = 8 squares submatrices.',
    intuition: 'Every square of any size is accounted for in the cell of its bottom-right corner.'
  },
  {
    title: '11. Algorithm Complete & Complexity Summary',
    phase: 'COMPLETED',
    codeLine: 39,
    activeCell: null,
    matrix: [
      [0, 1, 1],
      [1, 1, 1],
      [0, 1, 1]
    ],
    dp: [
      [0, 1, 1],
      [1, 1, 2],
      [0, 1, 1]
    ],
    neighbors: null,
    formula: 'Result = 8 Square Submatrices | Time: O(M * N) | Space: O(M * N)',
    totalSquares: 8,
    highlightSquare: null,
    action: 'Return 8. Full table filled in a single pass of O(M * N) time.',
    explain: 'By checking 3 neighbors for each cell, we solve a problem that naively takes O(M * N * min(M, N)^2) in linear O(M * N) time! Space can even be reduced to O(N) by storing only the previous row.',
    intuition: 'Subproblems overlap seamlessly: smaller squares prove the validity of larger squares.'
  }
];

export default function CountSquareSubmatricesWithAllOnesdp56Visualizer({ currentStep = 0 }) {
  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx] || steps[0];

  const m = step.matrix.length;
  const n = step.matrix[0].length;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-4 sm:p-6 space-y-6 select-none">
      {/* Top Header Metrics & Algorithmic Phase Badge */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-md border font-semibold uppercase text-[10px] ${
            step.phase === 'SQUARE_EXPAND'
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : step.phase === 'EVAL_CELL'
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : step.phase === 'COMPLETED'
              ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
              : 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
          }`}>
            {step.phase}
          </span>
          {step.activeCell && (
            <span className="px-2.5 py-1 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] text-cyan-300">
              Active: ({step.activeCell[0]}, {step.activeCell[1]})
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="px-2.5 py-1 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)]">
            Grid: <strong className="text-cyan-400">{m} × {n}</strong>
          </span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
            Total Squares: {step.totalSquares}
          </span>
        </div>
      </div>

      {/* Recurrence Formula Callout Banner */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-3.5 flex items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-[var(--chalk-dim)]">
          <span className="text-indigo-400 font-bold">RECURRENCE:</span>
          <span className="text-[var(--chalk)] font-semibold">{step.formula}</span>
        </div>
        {step.neighbors && (
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-[var(--chalk-dim)]">
            <span>Top: <strong className="text-amber-400">{step.neighbors.top}</strong></span>
            <span>Left: <strong className="text-amber-400">{step.neighbors.left}</strong></span>
            <span>Diag: <strong className="text-cyan-400">{step.neighbors.diag}</strong></span>
          </div>
        )}
      </div>

      {/* Side-by-Side Dual Matrix View: Input Matrix vs DP Table */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: Original Binary Matrix */}
        <div className="bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 sm:p-5 flex flex-col items-center gap-3 shadow-lg">
          <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-2.5">
            <span className="uppercase tracking-wider font-semibold">1. Input Binary Matrix</span>
            <span className="text-[11px]">values: 0 or 1</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 p-2">
            {step.matrix.map((row, r) =>
              row.map((val, c) => {
                const isActive = step.activeCell && step.activeCell[0] === r && step.activeCell[1] === c;
                const inSquare = step.highlightSquare &&
                  r >= step.highlightSquare.r &&
                  r < step.highlightSquare.r + step.highlightSquare.size &&
                  c >= step.highlightSquare.c &&
                  c < step.highlightSquare.c + step.highlightSquare.size;

                let cellStyle = val === 1
                  ? 'border-[var(--line-strong)] bg-[var(--board-raised-2)] text-[var(--chalk)]'
                  : 'border-[var(--line)] bg-[var(--bg-base)] text-[var(--chalk-faint)] opacity-60';

                if (inSquare) {
                  cellStyle = 'border-emerald-400 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-400/40';
                } else if (isActive) {
                  cellStyle = 'border-amber-400 bg-amber-500/25 text-amber-300 ring-2 ring-amber-400/60 scale-105';
                }

                return (
                  <div
                    key={`mat-${r}-${c}`}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all duration-200 ${cellStyle}`}
                  >
                    <span className="text-xl sm:text-2xl">{val}</span>
                    <span className="text-[8px] opacity-60 font-normal">[{r},{c}]</span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: DP Table (Largest Square Size & Ending Count) */}
        <div className="bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 sm:p-5 flex flex-col items-center gap-3 shadow-lg">
          <div className="w-full flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-2.5">
            <span className="uppercase tracking-wider font-semibold text-indigo-400">2. DP Table (Square Size)</span>
            <span className="text-[11px]">dp[i][j]</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 p-2">
            {step.dp.map((row, r) =>
              row.map((val, c) => {
                const isActive = step.activeCell && step.activeCell[0] === r && step.activeCell[1] === c;
                const isTop = step.activeCell && step.activeCell[0] - 1 === r && step.activeCell[1] === c;
                const isLeft = step.activeCell && step.activeCell[0] === r && step.activeCell[1] - 1 === c;
                const isDiag = step.activeCell && step.activeCell[0] - 1 === r && step.activeCell[1] - 1 === c;

                let cellStyle = 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk)]';

                if (isActive) {
                  cellStyle = 'border-amber-400 bg-amber-500/30 text-amber-200 ring-2 ring-amber-400/70 shadow-lg scale-105';
                } else if (isTop || isLeft) {
                  cellStyle = 'border-amber-500/50 bg-amber-500/10 text-amber-300';
                } else if (isDiag) {
                  cellStyle = 'border-cyan-500/50 bg-cyan-500/10 text-cyan-300';
                } else if (val >= 2) {
                  cellStyle = 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300 font-bold';
                } else if (val === 1) {
                  cellStyle = 'border-indigo-500/30 bg-indigo-500/10 text-indigo-200';
                }

                return (
                  <div
                    key={`dp-${r}-${c}`}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl border flex flex-col items-center justify-center font-mono transition-all duration-200 relative ${cellStyle}`}
                  >
                    {isActive && (
                      <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-amber-400 animate-ping" />
                    )}
                    <span className="text-xl sm:text-2xl font-bold">{val}</span>
                    <span className="text-[8px] opacity-70">
                      {isTop ? 'TOP' : isLeft ? 'LEFT' : isDiag ? 'DIAG' : `[${r},${c}]`}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Action and Pedagogical Explanation Card */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-5 space-y-3 shadow-md">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
          <span>Action:</span>
          <span className="text-[var(--chalk)] font-normal">{step.action}</span>
        </div>
        <p className="text-xs sm:text-sm text-[var(--chalk-dim)] leading-relaxed font-sans">
          {step.explain}
        </p>
        <div className="pt-2 border-t border-[var(--line)] flex items-center gap-2 text-xs font-mono text-[var(--chalk-dim)]">
          <span className="text-indigo-400 font-bold">💡 Intuition:</span>
          <span>{step.intuition}</span>
        </div>
      </div>
    </div>
  );
}

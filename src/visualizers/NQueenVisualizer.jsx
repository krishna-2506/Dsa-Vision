import React from 'react';

export const meta = {
  title: 'N-Queens (Backtracking & Bit Hash)',
  category: 'Recursion / Backtracking',
  difficulty: 'Hard',
  timeComplexity: 'O(N!)',
  spaceComplexity: 'O(N) row and diagonal hash sets',
  description: 'Places N non-attacking queens on an N x N chessboard using column-by-column backtracking with O(1) safety checking via row and diagonal lookup arrays.'
};

export const solutions = {
  cpp: `// C++ N-Queens (Backtracking with O(1) Diagonal Hash)
// Time: O(N!) | Space: O(N)
#include <vector>
#include <string>
using namespace std;

class Solution {
private:
    void solve(int col, vector<string>& board, vector<vector<string>>& ans, 
               vector<int>& leftRow, vector<int>& upperDiag, vector<int>& lowerDiag, int n) {
        // Base case: all N queens placed successfully
        if (col == n) {
            ans.push_back(board);
            return;
        }

        for (int row = 0; row < n; row++) {
            // Check if position is attacked via left row, lower diagonal, or upper diagonal
            if (leftRow[row] == 0 && lowerDiag[row + col] == 0 && upperDiag[n - 1 + col - row] == 0) {
                // Place Queen
                board[row][col] = 'Q';
                leftRow[row] = 1;
                lowerDiag[row + col] = 1;
                upperDiag[n - 1 + col - row] = 1;

                solve(col + 1, board, ans, leftRow, upperDiag, lowerDiag, n);

                // Backtrack
                board[row][col] = '.';
                leftRow[row] = 0;
                lowerDiag[row + col] = 0;
                upperDiag[n - 1 + col - row] = 0;
            }
        }
    }
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> ans;
        vector<string> board(n, string(n, '.'));
        vector<int> leftRow(n, 0), upperDiag(2 * n - 1, 0), lowerDiag(2 * n - 1, 0);

        solve(0, board, ans, leftRow, upperDiag, lowerDiag, n);
        return ans;
    }
};`,
  python: `# Python 3 N-Queens (Backtracking)
class Solution:
    def solveNQueens(self, n: int) -> list[list[str]]:
        ans = []
        board = [["."] * n for _ in range(n)]

        cols = set()
        pos_diag = set() # (r + c)
        neg_diag = set() # (r - c)

        def backtrack(r):
            if r == n:
                ans.append(["".join(row) for row in board])
                return

            for c in range(n):
                if c in cols or (r + c) in pos_diag or (r - c) in neg_diag:
                    continue

                cols.add(c)
                pos_diag.add(r + c)
                neg_diag.add(r - c)
                board[r][c] = "Q"

                backtrack(r + 1)

                cols.remove(c)
                pos_diag.remove(r + c)
                neg_diag.remove(r - c)
                board[r][c] = "."

        backtrack(0)
        return ans`,
  java: `// Java N-Queens (Backtracking)
import java.util.*;

class Solution {
    private void solve(int col, char[][] board, List<List<String>> ans, 
                       int[] leftRow, int[] upperDiag, int[] lowerDiag, int n) {
        if (col == n) {
            List<String> res = new ArrayList<>();
            for (char[] row : board) res.add(new String(row));
            ans.add(res);
            return;
        }

        for (int row = 0; row < n; row++) {
            if (leftRow[row] == 0 && lowerDiag[row + col] == 0 && upperDiag[n - 1 + col - row] == 0) {
                board[row][col] = 'Q';
                leftRow[row] = 1;
                lowerDiag[row + col] = 1;
                upperDiag[n - 1 + col - row] = 1;

                solve(col + 1, board, ans, leftRow, upperDiag, lowerDiag, n);

                board[row][col] = '.';
                leftRow[row] = 0;
                lowerDiag[row + col] = 0;
                upperDiag[n - 1 + col - row] = 0;
            }
        }
    }

    public List<List<String>> solveNQueens(int n) {
        List<List<String>> ans = new ArrayList<>();
        char[][] board = new char[n][n];
        for (char[] row : board) Arrays.fill(row, '.');

        int[] leftRow = new int[n];
        int[] upperDiag = new int[2 * n - 1];
        int[] lowerDiag = new int[2 * n - 1];

        solve(0, board, ans, leftRow, upperDiag, lowerDiag, n);
        return ans;
    }
}`,
  javascript: `// JavaScript N-Queens (Backtracking)
var solveNQueens = function(n) {
    const ans = [];
    const board = Array.from({ length: n }, () => Array(n).fill('.'));

    const leftRow = new Array(n).fill(0);
    const upperDiag = new Array(2 * n - 1).fill(0);
    const lowerDiag = new Array(2 * n - 1).fill(0);

    function solve(col) {
        if (col === n) {
            ans.push(board.map(r => r.join('')));
            return;
        }

        for (let row = 0; row < n; row++) {
            if (leftRow[row] === 0 && lowerDiag[row + col] === 0 && upperDiag[n - 1 + col - row] === 0) {
                board[row][col] = 'Q';
                leftRow[row] = 1;
                lowerDiag[row + col] = 1;
                upperDiag[n - 1 + col - row] = 1;

                solve(col + 1);

                board[row][col] = '.';
                leftRow[row] = 0;
                lowerDiag[row + col] = 0;
                upperDiag[n - 1 + col - row] = 0;
            }
        }
    }

    solve(0);
    return ans;
};`
};

export const steps = [
  {
    title: '1. Initialize 4x4 Chessboard: Place N = 4 non-attacking queens',
    phase: 'INITIAL',
    codeLine: 40,
    n: 4,
    currentCol: 0,
    queens: [],
    conflict: null,
    totalSolutions: 0,
    variables: { n: 4, board: '4x4 empty', activeCol: 0 },
    explain: 'Queens attack horizontally, vertically, and diagonally. We advance column-by-column, placing one queen per column.',
    intuition: 'Each column must contain exactly one queen.'
  },
  {
    title: '2. Col 0: Place Queen at (1, 0) [row 1, col 0]',
    phase: 'PLACE_QUEEN',
    codeLine: 20,
    n: 4,
    currentCol: 1,
    queens: [{ r: 1, c: 0 }],
    conflict: null,
    totalSolutions: 0,
    variables: { placedAt: '(1, 0)', leftRow1: true, lowerDiag1: true },
    explain: 'Placed Queen at (1, 0). Mark row 1, lower diagonal (1+0=1), and upper diagonal (4-1+0-1=2) as occupied.',
    intuition: 'O(1) hash sets track threatened attack lines.'
  },
  {
    title: '3. Col 1: Try (3, 1) -> Safe! Place Queen at (3, 1)',
    phase: 'PLACE_QUEEN',
    codeLine: 20,
    n: 4,
    currentCol: 2,
    queens: [{ r: 1, c: 0 }, { r: 3, c: 1 }],
    conflict: null,
    totalSolutions: 0,
    variables: { placedAt: '(3, 1)', safe: true, activeCol: 2 },
    explain: 'Rows 0, 1, 2 in col 1 are attacked by Queen at (1, 0). Row 3 is safe. Placed Queen at (3, 1).',
    intuition: 'Backtracking avoids checking attacked squares.'
  },
  {
    title: '4. Col 2: Place Queen at (0, 2); Col 3: Place Queen at (2, 3) -> Solution 1 Found!',
    phase: 'SOLUTION_FOUND',
    codeLine: 13,
    n: 4,
    currentCol: 4,
    queens: [{ r: 1, c: 0 }, { r: 3, c: 1 }, { r: 0, c: 2 }, { r: 2, c: 3 }],
    conflict: null,
    totalSolutions: 1,
    variables: { completedBoard: 'Col=4 reached', solutionIndex: 1 },
    explain: 'All 4 queens placed without any conflicts: [(1,0), (3,1), (0,2), (2,3)]. Base case reached! Solution 1 recorded.',
    intuition: 'Valid non-attacking placement.'
  },
  {
    title: '5. Backtrack & Complete: 2 Valid Solutions for N = 4',
    phase: 'COMPLETED',
    codeLine: 42,
    n: 4,
    currentCol: 4,
    queens: [{ r: 2, c: 0 }, { r: 0, c: 1 }, { r: 3, c: 2 }, { r: 1, c: 3 }],
    conflict: null,
    totalSolutions: 2,
    variables: { totalSolutions: 2, solutions: 'Sol 1: [1,3,0,2], Sol 2: [2,0,3,1]' },
    explain: 'Complete search tree explored. Exactly 2 distinct configurations solve the 4-Queens puzzle.',
    intuition: 'Pruned search tree completes in O(N!) factorial time.'
  }
];

export default function NQueenVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Board Size: {step.n} × {step.n}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Queens Placed: {step.queens.length} / {step.n}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Solutions Found = {step.totalSolutions}
        </span>
      </div>

      {/* Chessboard */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-6 flex flex-col items-center gap-3">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider">Interactive 4 × 4 Chessboard</span>

        <div className="grid grid-cols-4 border-2 border-[var(--line)] rounded-xl overflow-hidden shadow-2xl">
          {Array.from({ length: step.n }).map((_, r) =>
            Array.from({ length: step.n }).map((_, c) => {
              const isDark = (r + c) % 2 === 1;
              const hasQueen = step.queens.some(q => q.r === r && q.c === c);

              let bgClass = isDark ? 'bg-[#181a26]' : 'bg-[var(--board-raised)]';
              if (hasQueen) {
                bgClass = 'bg-amber-500/25 ring-2 ring-amber-500/50 shadow-inner';
              }

              return (
                <div 
                  key={`${r}-${c}`}
                  className={`w-14 h-14 border border-[var(--line)]/50 flex flex-col items-center justify-center transition-all ${bgClass}`}
                >
                  {hasQueen ? (
                    <span className="text-2xl drop-shadow-md animate-bounce">👑</span>
                  ) : (
                    <span className="text-[8px] font-mono text-[var(--chalk-faint)]">{r},{c}</span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 text-xs font-mono text-center text-[var(--chalk-dim)]">
        {step.explain}
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Sudoku Solver',
  category: 'Recursion / Backtracking',
  difficulty: 'Hard',
  timeComplexity: 'O(9^(empty cells))',
  spaceComplexity: 'O(empty cells) recursion stack',
  description: 'Solves a 9x9 Sudoku puzzle by filling empty cells with digits 1-9 using recursive backtracking and 3-way validation (row, column, and 3x3 sub-box).'
};

export const solutions = {
  cpp: `// C++ Sudoku Solver (Backtracking)
// Time: O(9^M) | Space: O(M) where M is empty cells count
#include <vector>
using namespace std;

class Solution {
private:
    bool isValid(vector<vector<char>>& board, int row, int col, char c) {
        for (int i = 0; i < 9; i++) {
            // Check row
            if (board[row][i] == c) return false;
            // Check column
            if (board[i][col] == c) return false;
            // Check 3x3 sub-box
            if (board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == c) return false;
        }
        return true;
    }

    bool solve(vector<vector<char>>& board) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') {
                    for (char c = '1'; c <= '9'; c++) {
                        if (isValid(board, i, j, c)) {
                            board[i][j] = c;

                            if (solve(board)) return true;

                            board[i][j] = '.'; // backtrack
                        }
                    }
                    return false; // No digit fits, trigger backtrack
                }
            }
        }
        return true; // All cells filled
    }
public:
    void solveSudoku(vector<vector<char>>& board) {
        solve(board);
    }
};`,
  python: `# Python 3 Sudoku Solver (Backtracking)
class Solution:
    def solveSudoku(self, board: list[list[str]]) -> None:
        def is_valid(r, c, ch):
            for i in range(9):
                if board[r][i] == ch or board[i][c] == ch:
                    return False
                if board[3 * (r // 3) + i // 3][3 * (c // 3) + i % 3] == ch:
                    return False
            return True

        def solve():
            for i in range(9):
                for j in range(9):
                    if board[i][j] == '.':
                        for ch in "123456789":
                            if is_valid(i, j, ch):
                                board[i][j] = ch
                                if solve():
                                    return True
                                board[i][j] = '.'
                        return False
            return True

        solve()`,
  java: `// Java Sudoku Solver (Backtracking)
class Solution {
    private boolean isValid(char[][] board, int row, int col, char c) {
        for (int i = 0; i < 9; i++) {
            if (board[row][i] == c) return false;
            if (board[i][col] == c) return false;
            if (board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == c) return false;
        }
        return true;
    }

    private boolean solve(char[][] board) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') {
                    for (char c = '1'; c <= '9'; c++) {
                        if (isValid(board, i, j, c)) {
                            board[i][j] = c;
                            if (solve(board)) return true;
                            board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    public void solveSudoku(char[][] board) {
        solve(board);
    }
}`,
  javascript: `// JavaScript Sudoku Solver (Backtracking)
var solveSudoku = function(board) {
    function isValid(row, col, c) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === c) return false;
            if (board[i][col] === c) return false;
            if (board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + (i % 3)] === c) return false;
        }
        return true;
    }

    function solve() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === '.') {
                    for (let d = 1; d <= 9; d++) {
                        const c = d.toString();
                        if (isValid(i, j, c)) {
                            board[i][j] = c;
                            if (solve()) return true;
                            board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    solve();
};`
};

export const steps = [
  {
    title: '1. Initial 9x9 Sudoku Board: Find first empty cell "."',
    phase: 'INITIAL',
    codeLine: 24,
    cell: { r: 0, c: 2 },
    testedDigit: null,
    valid: null,
    status: 'Searching',
    sampleGrid: [
      ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
      ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
      ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
      ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
      ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
      ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
      ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
      ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
      ['.', '.', '.', '.', '8', '.', '.', '7', '9']
    ],
    variables: { emptyCell: '(0, 2)', action: 'Test digits 1 through 9' },
    explain: 'First empty cell is at row 0, col 2. We sequentially test digits "1" through "9" for row, col, and 3x3 box validity.',
    intuition: 'Backtracking scans cells left-to-right, top-to-bottom.'
  },
  {
    title: '2. At (0, 2): Test "1" (Conflict in box/col), Test "2" (Conflict) ... Test "4" -> VALID!',
    phase: 'TEST_DIGIT',
    codeLine: 26,
    cell: { r: 0, c: 2 },
    testedDigit: '4',
    valid: true,
    status: 'Placed Digit 4',
    sampleGrid: [
      ['5', '3', '4', '.', '7', '.', '.', '.', '.'],
      ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
      ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
      ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
      ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
      ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
      ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
      ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
      ['.', '.', '.', '.', '8', '.', '.', '7', '9']
    ],
    variables: { rowValid: true, colValid: true, boxValid: true, placed: '4' },
    explain: 'Digit "4" is not present in row 0, col 2, or top-left 3x3 box. Place "4" and recursively advance to next cell.',
    intuition: 'Valid digit found, branch into next empty cell.'
  },
  {
    title: '3. At (0, 3): Test "1" (Conflict in row/col), Test "2" -> Conflict! Test "6" -> Conflict! Test "7" -> Placed',
    phase: 'TEST_DIGIT',
    codeLine: 26,
    cell: { r: 0, c: 3 },
    testedDigit: '7',
    valid: true,
    status: 'Placed Digit 7',
    sampleGrid: [
      ['5', '3', '4', '7', '7', '.', '.', '.', '.'],
      ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
      ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
      ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
      ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
      ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
      ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
      ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
      ['.', '.', '.', '.', '8', '.', '.', '7', '9']
    ],
    variables: { cell: '(0, 3)', conflictCheck: 'Row, Column & 3x3 Box' },
    explain: 'Cell (0, 3) checks candidates. If a subsequent cell runs out of valid candidates, this cell will backtrack.',
    intuition: 'Backtracking undoes invalid assignments.'
  },
  {
    title: '4. Fully Solved Sudoku Grid Generated!',
    phase: 'COMPLETED',
    codeLine: 36,
    cell: { r: -1, c: -1 },
    testedDigit: null,
    valid: true,
    status: 'Puzzle Solved',
    sampleGrid: [
      ['5', '3', '4', '6', '7', '8', '9', '1', '2'],
      ['6', '7', '2', '1', '9', '5', '3', '4', '8'],
      ['1', '9', '8', '3', '4', '2', '5', '6', '7'],
      ['8', '5', '9', '7', '6', '1', '4', '2', '3'],
      ['4', '2', '6', '8', '5', '3', '7', '9', '1'],
      ['7', '1', '3', '9', '2', '4', '8', '5', '6'],
      ['9', '6', '1', '5', '3', '7', '2', '8', '4'],
      ['2', '8', '7', '4', '1', '9', '6', '3', '5'],
      ['3', '4', '5', '2', '8', '6', '1', '7', '9']
    ],
    variables: { result: 'True', emptyCellsRemaining: 0 },
    explain: 'All 81 cells satisfied across all 9 rows, 9 columns, and 9 sub-boxes. Sudoku is completely solved!',
    intuition: 'Exhaustive constraint satisfaction via recursive backtracking.'
  }
];

export default function SudokuSolverVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Active Cell: {step.cell.r >= 0 ? `(${step.cell.r}, ${step.cell.c})` : 'Completed'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Tested Digit: {step.testedDigit || 'None'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Status: {step.status}
        </span>
      </div>

      {/* 9x9 Sudoku Grid Display */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-6 flex flex-col items-center gap-3">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider">9 × 9 Sudoku Grid</span>

        <div className="grid grid-cols-9 border-2 border-[#3b415a] rounded-xl overflow-hidden shadow-2xl">
          {step.sampleGrid.map((row, r) =>
            row.map((val, c) => {
              const isCell = step.cell.r === r && step.cell.c === c;
              const isEmpty = val === '.';
              const isThickRight = c === 2 || c === 5;
              const isThickBottom = r === 2 || r === 5;

              let bgClass = 'bg-[var(--board-raised-2)] text-[var(--chalk-dim)]';
              if (isCell) {
                bgClass = 'bg-amber-500/30 text-amber-300 ring-2 ring-amber-500/50 animate-pulse font-black';
              } else if (isEmpty) {
                bgClass = 'bg-[var(--board-raised)] text-[var(--chalk-faint)]';
              }

              return (
                <div
                  key={`${r}-${c}`}
                  className={`w-7 h-7 sm:w-9 sm:h-9 border border-[var(--line)] flex items-center justify-center font-mono text-xs sm:text-sm font-bold ${bgClass} ${
                    isThickRight ? 'border-r-2 border-r-[#4f5677]' : ''
                  } ${isThickBottom ? 'border-b-2 border-b-[#4f5677]' : ''}`}
                >
                  {val !== '.' ? val : ''}
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

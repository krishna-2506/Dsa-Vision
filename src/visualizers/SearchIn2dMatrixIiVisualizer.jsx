import React from 'react';

export const meta = {
  title: 'Search in 2D Matrix II (Staircase Search)',
  category: 'Binary Search & 2D Matrix',
  difficulty: 'Medium',
  timeComplexity: 'O(M + N)',
  spaceComplexity: 'O(1)',
  description: 'Searches for a target in an M x N matrix where both rows and columns are independently sorted in ascending order using the optimal top-right staircase traversal in O(M + N) time.'
};

export const solutions = {
  cpp: `// C++ Optimal O(M + N) Staircase Search from Top-Right Corner
// Time Complexity: O(M + N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if (matrix.empty() || matrix[0].empty()) return false;

        int m = matrix.size(), n = matrix[0].size();
        int row = 0, col = n - 1; // Start at Top-Right corner

        while (row < m && col >= 0) {
            if (matrix[row][col] == target) {
                return true; // Match located!
            } else if (matrix[row][col] > target) {
                col--; // Current cell too large, eliminate entire column
            } else {
                row++; // Current cell too small, eliminate entire row
            }
        }

        return false;
    }
};`,
  python: `# Python 3 Optimal Staircase Search in 2D Matrix II
class Solution:
    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:
        if not matrix or not matrix[0]:
            return False

        m, n = len(matrix), len(matrix[0])
        row, col = 0, n - 1

        while row < m and col >= 0:
            if matrix[row][col] == target:
                return True
            elif matrix[row][col] > target:
                col -= 1
            else:
                row += 1

        return False`,
  java: `// Java Optimal Staircase Search in 2D Matrix II
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0) return false;

        int m = matrix.length, n = matrix[0].length;
        int row = 0, col = n - 1;

        while (row < m && col >= 0) {
            if (matrix[row][col] == target) {
                return true;
            } else if (matrix[row][col] > target) {
                col--;
            } else {
                row++;
            }
        }

        return false;
    }
}`,
  javascript: `// JavaScript Optimal Staircase Search in 2D Matrix II
var searchMatrix = function(matrix, target) {
    if (!matrix || matrix.length === 0) return false;

    const m = matrix.length, n = matrix[0].length;
    let row = 0, col = n - 1;

    while (row < m && col >= 0) {
        if (matrix[row][col] === target) {
            return true;
        } else if (matrix[row][col] > target) {
            col--;
        } else {
            row++;
        }
    }

    return false;
};`
};

export const steps = [
  {
    title: '1. Start at Top-Right Corner (0, 3) = 15, Target = 14',
    phase: 'INITIAL',
    codeLine: 12,
    matrix: [
      [1, 4, 7, 11],
      [2, 5, 8, 12],
      [3, 6, 9, 16],
      [10, 13, 14, 17]
    ],
    target: 14,
    row: 0,
    col: 3,
    eliminatedRows: [],
    eliminatedCols: [],
    variables: { row: 0, col: 3, currentVal: 11, target: 14 },
    explain: 'Starting at top-right corner allows binary decision: moving LEFT decreases value, moving DOWN increases value.',
    intuition: 'Top-right functions as a natural binary search decision root.'
  },
  {
    title: '2. (0, 3) is 11 < 14 -> Value too small, move DOWN (row = 1)',
    phase: 'MOVE_DOWN',
    codeLine: 21,
    matrix: [
      [1, 4, 7, 11],
      [2, 5, 8, 12],
      [3, 6, 9, 16],
      [10, 13, 14, 17]
    ],
    target: 14,
    row: 1,
    col: 3,
    eliminatedRows: [0],
    eliminatedCols: [],
    variables: { 'matrix[0][3]': 11, 'action': '11 < 14 -> row++ -> row = 1' },
    explain: 'Since 11 is the largest element in row 0 and 11 < 14, no element in row 0 can possibly be 14. Eliminate row 0!',
    intuition: 'Eliminate entire row 0.'
  },
  {
    title: '3. (1, 3) is 12 < 14 -> Value too small, move DOWN (row = 2)',
    phase: 'MOVE_DOWN',
    codeLine: 21,
    matrix: [
      [1, 4, 7, 11],
      [2, 5, 8, 12],
      [3, 6, 9, 16],
      [10, 13, 14, 17]
    ],
    target: 14,
    row: 2,
    col: 3,
    eliminatedRows: [0, 1],
    eliminatedCols: [],
    variables: { 'matrix[1][3]': 12, 'action': '12 < 14 -> row++ -> row = 2' },
    explain: '12 < 14. Eliminate row 1! Move down to row 2.',
    intuition: 'Eliminate entire row 1.'
  },
  {
    title: '4. (2, 3) is 16 > 14 -> Value too large, move LEFT (col = 2)',
    phase: 'MOVE_LEFT',
    codeLine: 19,
    matrix: [
      [1, 4, 7, 11],
      [2, 5, 8, 12],
      [3, 6, 9, 16],
      [10, 13, 14, 17]
    ],
    target: 14,
    row: 2,
    col: 2,
    eliminatedRows: [0, 1],
    eliminatedCols: [3],
    variables: { 'matrix[2][3]': 16, 'action': '16 > 14 -> col-- -> col = 2' },
    explain: '16 > 14. All elements below 16 in col 3 are >= 16 and thus too large. Eliminate column 3! Move left.',
    intuition: 'Eliminate entire column 3.'
  },
  {
    title: '5. (2, 2) is 9 < 14 -> Value too small, move DOWN (row = 3)',
    phase: 'MOVE_DOWN',
    codeLine: 21,
    matrix: [
      [1, 4, 7, 11],
      [2, 5, 8, 12],
      [3, 6, 9, 16],
      [10, 13, 14, 17]
    ],
    target: 14,
    row: 3,
    col: 2,
    eliminatedRows: [0, 1, 2],
    eliminatedCols: [3],
    variables: { 'matrix[2][2]': 9, 'action': '9 < 14 -> row++ -> row = 3' },
    explain: '9 < 14. Eliminate row 2! Move down to row 3.',
    intuition: 'Eliminate row 2.'
  },
  {
    title: '6. (3, 2) is 14 == Target! MATCH FOUND!',
    phase: 'COMPLETED',
    codeLine: 17,
    matrix: [
      [1, 4, 7, 11],
      [2, 5, 8, 12],
      [3, 6, 9, 16],
      [10, 13, 14, 17]
    ],
    target: 14,
    row: 3,
    col: 2,
    eliminatedRows: [0, 1, 2],
    eliminatedCols: [3],
    variables: { row: 3, col: 2, 'matrix[3][2]': 14, match: true, timeComplexity: 'O(M + N)' },
    explain: 'matrix[3][2] == 14! Found target in just 5 steps! Time complexity is bounded by M + N = 4 + 4 = 8.',
    intuition: 'Staircase path strictly terminates in at most M+N steps.'
  }
];

export default function SearchIn2dMatrixIiVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Target & Coordinates Banner */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Target = {step.target}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-indigo-300 font-semibold">
          Current Pointer: [{step.row}][{step.col}]
        </span>
        <span className="text-xs font-mono text-[#8a8ea3] px-3 py-1.5 rounded-xl bg-[#141622] border border-[#272b3d]">
          Phase: {step.phase}
        </span>
      </div>

      {/* 4x4 Grid Display */}
      <div className="p-4 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col gap-2">
        {step.matrix.map((row, rIdx) => (
          <div key={rIdx} className="flex items-center gap-2">
            {row.map((val, cIdx) => {
              const isPointer = step.row === rIdx && step.col === cIdx;
              const isMatch = step.phase === 'COMPLETED' && val === step.target;
              const isEliminated = step.eliminatedRows.includes(rIdx) || step.eliminatedCols.includes(cIdx);

              let style = 'bg-[#181a24] text-white border-[#2b2e40]';
              if (isMatch) {
                style = 'bg-emerald-500/25 text-emerald-300 border-emerald-400 scale-105 shadow-lg shadow-emerald-500/20 font-bold';
              } else if (isPointer) {
                style = 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105 shadow-md shadow-amber-500/20';
              } else if (isEliminated) {
                style = 'bg-[#101117] text-[#40445a] border-[#1d202e] opacity-40';
              }

              return (
                <div
                  key={cIdx}
                  className={`w-13 h-13 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all duration-300 ${style}`}
                >
                  <span className="text-base">{val}</span>
                  <span className="text-[8px] text-[#5b6076]">[{rIdx}][{cIdx}]</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

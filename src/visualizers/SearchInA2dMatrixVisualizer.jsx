import React from 'react';

export const meta = {
  title: 'Search in a 2D Matrix (Flattened Binary Search)',
  category: 'Binary Search & 2D Matrix',
  difficulty: 'Medium',
  timeComplexity: 'O(log(M x N))',
  spaceComplexity: 'O(1)',
  description: 'Searches for a target in an M x N matrix where every row is sorted and each row starts after the previous row ends. Treats the 2D grid as a virtual 1D sorted array in O(log(M x N)) time.'
};

export const solutions = {
  cpp: `// C++ Optimal Virtual 1D Flattened Binary Search
// Time Complexity: O(log(M * N)) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if (matrix.empty() || matrix[0].empty()) return false;

        int m = matrix.size(), n = matrix[0].size();
        int low = 0, high = m * n - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // Map 1D index to 2D coordinate: (row = mid / n, col = mid % n)
            int row = mid / n;
            int col = mid % n;

            if (matrix[row][col] == target) {
                return true; // Target located!
            } else if (matrix[row][col] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return false;
    }
};`,
  python: `# Python 3 Virtual 1D Binary Search in 2D Matrix
class Solution:
    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:
        if not matrix or not matrix[0]:
            return False

        m, n = len(matrix), len(matrix[0])
        low, high = 0, m * n - 1

        while low <= high:
            mid = (low + high) // 2
            row, col = divmod(mid, n)

            if matrix[row][col] == target:
                return True
            elif matrix[row][col] < target:
                low = mid + 1
            else:
                high = mid - 1

        return False`,
  java: `// Java Virtual 1D Binary Search in 2D Matrix
class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        if (matrix == null || matrix.length == 0) return false;

        int m = matrix.length, n = matrix[0].length;
        int low = 0, high = m * n - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int row = mid / n;
            int col = mid % n;

            if (matrix[row][col] == target) {
                return true;
            } else if (matrix[row][col] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return false;
    }
}`,
  javascript: `// JavaScript Virtual 1D Binary Search in 2D Matrix
var searchMatrix = function(matrix, target) {
    if (!matrix || matrix.length === 0) return false;

    const m = matrix.length, n = matrix[0].length;
    let low = 0, high = m * n - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const row = Math.floor(mid / n);
        const col = mid % n;

        if (matrix[row][col] === target) {
            return true;
        } else if (matrix[row][col] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return false;
};`
};

export const steps = [
  {
    title: '1. Initialize: 3x4 Matrix (12 elements), Target = 34',
    phase: 'INITIAL',
    codeLine: 12,
    matrix: [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60]
    ],
    target: 34,
    low: 0,
    high: 11,
    mid: null,
    activeCoord: null,
    variables: { m: 3, n: 4, target: 34, 'Virtual 1D Range': '[0 ... 11]' },
    explain: 'Because rows are sorted and each row starts after the prior ends, the entire matrix can be indexed as a 1D array of length 12.',
    intuition: 'Coordinate conversion: row = index / cols, col = index % cols.'
  },
  {
    title: '2. mid = 5: row = 5/4 = 1, col = 5%4 = 1 -> matrix[1][1] = 11 < 34 -> Search Right',
    phase: 'SEARCH_RIGHT',
    codeLine: 23,
    matrix: [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60]
    ],
    target: 34,
    low: 6,
    high: 11,
    mid: 5,
    activeCoord: [1, 1],
    variables: { mid: 5, row: 1, col: 1, 'matrix[1][1]': 11, target: 34, action: 'low = mid + 1 = 6' },
    explain: 'mid=5 maps to matrix[1][1] (11). Since 11 < 34, target must be in the right half [6...11].',
    intuition: 'Eliminate the first 6 elements [0...5].'
  },
  {
    title: '3. mid = 8: row = 8/4 = 2, col = 8%4 = 0 -> matrix[2][0] = 23 < 34 -> Search Right',
    phase: 'SEARCH_RIGHT',
    codeLine: 23,
    matrix: [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60]
    ],
    target: 34,
    low: 9,
    high: 11,
    mid: 8,
    activeCoord: [2, 0],
    variables: { mid: 8, row: 2, col: 0, 'matrix[2][0]': 23, target: 34, action: 'low = mid + 1 = 9' },
    explain: 'mid=8 maps to row 2, col 0 (23). 23 < 34. Target must be in range [9...11].',
    intuition: 'Search space narrowed to row 2 tail: {30, 34, 60}.'
  },
  {
    title: '4. mid = 10: row = 10/4 = 2, col = 10%4 = 2 -> matrix[2][2] = 34 == Target! FOUND!',
    phase: 'COMPLETED',
    codeLine: 21,
    matrix: [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60]
    ],
    target: 34,
    low: 9,
    high: 11,
    mid: 10,
    activeCoord: [2, 2],
    variables: { mid: 10, row: 2, col: 2, 'matrix[2][2]': 34, target: 34, result: true, timeComplexity: 'O(log(M*N))' },
    explain: 'mid=10 maps to matrix[2][2] which contains 34! Target found in 3 comparisons! Return TRUE.',
    intuition: 'Binary search over 2D array in pure logarithmic time.'
  }
];

export default function SearchInA2dMatrixVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Target & 1D Index Indicator */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Target = {step.target}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-indigo-300 font-semibold">
          Virtual mid index: {step.mid !== null ? step.mid : 'Ready'}
        </span>
        {step.activeCoord && (
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
            Cell [{step.activeCoord[0]}][{step.activeCoord[1]}]
          </span>
        )}
      </div>

      {/* 2D Grid with 1D index markers */}
      <div className="p-4 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col gap-2">
        {step.matrix.map((row, rIdx) => (
          <div key={rIdx} className="flex items-center gap-2">
            {row.map((val, cIdx) => {
              const flatIdx = rIdx * 4 + cIdx;
              const isMatch = step.phase === 'COMPLETED' && val === step.target;
              const isActive = step.activeCoord && step.activeCoord[0] === rIdx && step.activeCoord[1] === cIdx;
              const isEliminated = (step.low !== null && flatIdx < step.low) || (step.high !== null && flatIdx > step.high);

              let style = 'bg-[#181a24] text-white border-[#2b2e40]';
              if (isMatch) {
                style = 'bg-emerald-500/25 text-emerald-300 border-emerald-400 scale-105 shadow-lg shadow-emerald-500/20 font-bold';
              } else if (isActive) {
                style = 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105 shadow-md';
              } else if (isEliminated) {
                style = 'bg-[#101117] text-[#40445a] border-[#1d202e] opacity-40';
              }

              return (
                <div
                  key={cIdx}
                  className={`w-14 h-14 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all duration-300 ${style}`}
                >
                  <span className="text-base">{val}</span>
                  <span className="text-[8px] text-[#5b6076]">idx {flatIdx}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

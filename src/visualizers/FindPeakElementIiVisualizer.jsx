import React from 'react';

export const meta = {
  title: 'Find Peak Element II',
  category: 'Binary Search',
  difficulty: 'Hard',
  timeComplexity: 'O(M * log N)',
  spaceComplexity: 'O(1)',
  description: 'Finds a peak element in a 2D matrix (strictly greater than up, down, left, right neighbors) using binary search across columns combined with column-maximum scanning.'
};

export const solutions = {
  cpp: `// C++ Binary Search across Columns for 2D Peak
// Time Complexity: O(M * log N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
    int findMaxRow(const vector<vector<int>>& mat, int n, int m, int col) {
        int maxVal = -1, maxRow = -1;
        for (int i = 0; i < n; i++) {
            if (mat[i][col] > maxVal) {
                maxVal = mat[i][col];
                maxRow = i;
            }
        }
        return maxRow;
    }

public:
    vector<int> findPeakGrid(vector<vector<int>>& mat) {
        int n = mat.size(), m = mat[0].size();
        int low = 0, high = m - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int maxRow = findMaxRow(mat, n, m, mid);

            int left = (mid - 1 >= 0) ? mat[maxRow][mid - 1] : -1;
            int right = (mid + 1 < m) ? mat[maxRow][mid + 1] : -1;

            if (mat[maxRow][mid] > left && mat[maxRow][mid] > right) {
                return {maxRow, mid}; // Peak found!
            } else if (left > mat[maxRow][mid]) {
                high = mid - 1; // Left neighbor is bigger, peak exists on left
            } else {
                low = mid + 1;  // Right neighbor is bigger, peak exists on right
            }
        }
        return {-1, -1};
    }
};`,
  python: `# Python 3 Binary Search on 2D Matrix Columns
class Solution:
    def findPeakGrid(self, mat: list[list[int]]) -> list[int]:
        n, m = len(mat), len(mat[0])
        low, high = 0, m - 1

        def find_max_row(col):
            max_r, max_v = 0, -1
            for r in range(n):
                if mat[r][col] > max_v:
                    max_v = mat[r][col]
                    max_r = r
            return max_r

        while low <= high:
            mid = (low + high) // 2
            max_row = find_max_row(mid)

            left = mat[max_row][mid - 1] if mid - 1 >= 0 else -1
            right = mat[max_row][mid + 1] if mid + 1 < m else -1

            if mat[max_row][mid] > left and mat[max_row][mid] > right:
                return [max_row, mid]
            elif left > mat[max_row][mid]:
                high = mid - 1
            else:
                low = mid + 1

        return [-1, -1]`,
  java: `// Java Binary Search across Columns for 2D Peak
class Solution {
    private int findMaxRow(int[][] mat, int n, int col) {
        int maxRow = 0;
        for (int i = 0; i < n; i++) {
            if (mat[i][col] > mat[maxRow][col]) {
                maxRow = i;
            }
        }
        return maxRow;
    }

    public int[] findPeakGrid(int[][] mat) {
        int n = mat.length, m = mat[0].length;
        int low = 0, high = m - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int maxRow = findMaxRow(mat, n, mid);

            int left = (mid - 1 >= 0) ? mat[maxRow][mid - 1] : -1;
            int right = (mid + 1 < m) ? mat[maxRow][mid + 1] : -1;

            if (mat[maxRow][mid] > left && mat[maxRow][mid] > right) {
                return new int[]{maxRow, mid};
            } else if (left > mat[maxRow][mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return new int[]{-1, -1};
    }
}`,
  javascript: `// JavaScript Binary Search across Columns for 2D Peak
var findPeakGrid = function(mat) {
    const n = mat.length, m = mat[0].length;
    let low = 0, high = m - 1;

    const findMaxRow = (col) => {
        let maxRow = 0;
        for (let i = 0; i < n; i++) {
            if (mat[i][col] > mat[maxRow][col]) {
                maxRow = i;
            }
        }
        return maxRow;
    };

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const maxRow = findMaxRow(mid);

        const left = mid - 1 >= 0 ? mat[maxRow][mid - 1] : -1;
        const right = mid + 1 < m ? mat[maxRow][mid + 1] : -1;

        if (mat[maxRow][mid] > left && mat[maxRow][mid] > right) {
            return [maxRow, mid];
        } else if (left > mat[maxRow][mid]) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return [-1, -1];
};`
};

export const steps = [
  {
    title: '1. Problem Overview: 4x5 2D Matrix Grid',
    phase: 'INITIAL',
    codeLine: 23,
    matrix: [
      [10, 20, 15, 21, 10],
      [14, 30, 14, 16, 12],
      [15, 35, 11, 17, 18],
      [12, 14, 13, 12, 11]
    ],
    low: 0,
    high: 4,
    midCol: null,
    maxRow: null,
    peakCoord: null,
    variables: { rows: 4, cols: 5, colRange: '[0..4]' },
    explain: 'Instead of searching all M*N cells in O(M*N), we binary search on the columns [0..4] in O(M * log N).',
    intuition: 'If we pick the global maximum element in column mid, it is already greater than its top and bottom neighbors. We only need to compare left and right!'
  },
  {
    title: '2. Iteration 1: mid = 2. Find Max in Column 2 => mat[0][2] = 15',
    phase: 'SCAN_COLUMN',
    codeLine: 26,
    matrix: [
      [10, 20, 15, 21, 10],
      [14, 30, 14, 16, 12],
      [15, 35, 11, 17, 18],
      [12, 14, 13, 12, 11]
    ],
    low: 0,
    high: 4,
    midCol: 2,
    maxRow: 0,
    peakCoord: null,
    variables: { midCol: 2, maxRow: 0, 'mat[0][2]': 15, 'left (mat[0][1])': 20, 'right (mat[0][3])': 21 },
    explain: 'In column 2 [15, 14, 11, 13], row 0 has maximum value 15. Compare neighbors: Left is 20, Right is 21. Since right (21) > 15, a peak is guaranteed to exist in the right half!',
    intuition: 'Always follow the strictly increasing neighbor direction. Set low = mid + 1 = 3.'
  },
  {
    title: '3. Update Search Space: Columns [3..4]',
    phase: 'ELIMINATE_LEFT',
    codeLine: 34,
    matrix: [
      [10, 20, 15, 21, 10],
      [14, 30, 14, 16, 12],
      [15, 35, 11, 17, 18],
      [12, 14, 13, 12, 11]
    ],
    low: 3,
    high: 4,
    midCol: null,
    maxRow: null,
    peakCoord: null,
    variables: { low: 3, high: 4, activeCols: '[3, 4]' },
    explain: 'Left columns [0..2] discarded. Active column range is now [3..4].',
    intuition: 'Search space halved across horizontal matrix dimension.'
  },
  {
    title: '4. Iteration 2: mid = 3. Max in Column 3 is mat[0][3] = 21',
    phase: 'SCAN_COLUMN',
    codeLine: 26,
    matrix: [
      [10, 20, 15, 21, 10],
      [14, 30, 14, 16, 12],
      [15, 35, 11, 17, 18],
      [12, 14, 13, 12, 11]
    ],
    low: 3,
    high: 4,
    midCol: 3,
    maxRow: 0,
    peakCoord: null,
    variables: { midCol: 3, maxRow: 0, 'mat[0][3]': 21, left: 15, right: 10, down: 16 },
    explain: 'In column 3 [21, 16, 17, 12], the maximum element is 21 at row 0. Left neighbor is 15 (21 > 15), Right neighbor is 10 (21 > 10), Bottom is 16 (21 > 16), Top is out-of-bounds (-1).',
    intuition: '21 is strictly greater than all its 4 directional neighbors!'
  },
  {
    title: '5. Peak Located! Return Coordinates [0, 3] with Value 21',
    phase: 'PEAK_FOUND',
    codeLine: 30,
    matrix: [
      [10, 20, 15, 21, 10],
      [14, 30, 14, 16, 12],
      [15, 35, 11, 17, 18],
      [12, 14, 13, 12, 11]
    ],
    low: 3,
    high: 4,
    midCol: 3,
    maxRow: 0,
    peakCoord: [0, 3],
    variables: { peakRow: 0, peakCol: 3, peakValue: 21, complexity: 'O(M log N)' },
    explain: 'mat[0][3] = 21 is a confirmed 2D peak! Solved in O(M log N) time.',
    intuition: '2D binary search reduces two dimensions to logarithmic column cuts with single column scans.'
  }
];

export default function FindPeakElementIiVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          2D Matrix Grid: {step.matrix.length} Rows &times; {step.matrix[0].length} Columns
        </span>
        {step.midCol !== null && (
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
            Active Column Mid = {step.midCol}
          </span>
        )}
        {step.peakCoord && (
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-semibold">
            Peak Found at [{step.peakCoord[0]}, {step.peakCoord[1]}]
          </span>
        )}
      </div>

      {/* 2D Matrix Grid */}
      <div className="p-4 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] flex flex-col items-center gap-2">
        {/* Column Headers */}
        <div className="flex items-center gap-2 ml-8">
          {step.matrix[0].map((_, cIdx) => {
            const isMid = step.midCol === cIdx;
            const isEliminated = (step.low !== null && cIdx < step.low) || (step.high !== null && cIdx > step.high);
            return (
              <div key={cIdx} className={`w-12 text-center text-xs font-mono font-bold ${
                isMid ? 'text-amber-400' : isEliminated ? 'text-[#3b4261]' : 'text-[var(--chalk-dim)]'
              }`}>
                Col {cIdx}
              </div>
            );
          })}
        </div>

        {/* Rows */}
        {step.matrix.map((row, rIdx) => (
          <div key={rIdx} className="flex items-center gap-2">
            <span className="w-6 text-xs font-mono text-[var(--chalk-dim)] text-right font-bold">R{rIdx}</span>
            <div className="flex items-center gap-2">
              {row.map((cellVal, cIdx) => {
                const isMidCol = step.midCol === cIdx;
                const isMaxInCol = isMidCol && step.maxRow === rIdx;
                const isPeak = step.peakCoord && step.peakCoord[0] === rIdx && step.peakCoord[1] === cIdx;
                const isEliminated = (step.low !== null && cIdx < step.low) || (step.high !== null && cIdx > step.high);

                let cellStyle = 'bg-[var(--board-raised)] border-[var(--line)] text-[var(--chalk)]';
                if (isPeak) {
                  cellStyle = 'bg-emerald-500/30 border-emerald-400 text-emerald-200 scale-110 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400';
                } else if (isMaxInCol) {
                  cellStyle = 'bg-amber-500/25 border-amber-400 text-amber-200 scale-105 shadow-md shadow-amber-500/20';
                } else if (isMidCol) {
                  cellStyle = 'bg-amber-500/10 border-amber-500/30 text-amber-300';
                } else if (isEliminated) {
                  cellStyle = 'bg-[#0e0f14] border-[#1d202e] text-[#3b4261] opacity-40';
                }

                return (
                  <div
                    key={cIdx}
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono font-bold text-sm transition-all duration-300 ${cellStyle}`}
                  >
                    {cellVal}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend & Summary */}
      <div className="w-full flex items-center justify-around p-3 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[var(--chalk-dim)]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-400"></span>
          <span>Column Max Element</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-400"></span>
          <span>Peak Element</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[#0e0f14] border border-[#1d202e]"></span>
          <span>Discarded Half</span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Set Matrix Zeroes',
  category: 'Arrays & Matrix Manipulation',
  difficulty: 'Medium',
  timeComplexity: 'O(M x N)',
  spaceComplexity: 'O(1) In-Place',
  description: 'Given an m x n integer matrix, if an element is 0, set its entire row and column to 0. Solved in-place using the first row and column as flags, plus one variable for col0.'
};

export const solutions = {
  cpp: `// C++ Optimal O(1) Space Set Matrix Zeroes
// Uses row 0 and col 0 as marker arrays, col0 flag for column 0
#include <vector>
using namespace std;

class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int rows = matrix.size(), cols = matrix[0].size();
        int col0 = 1;

        // Step 1: Mark first row & col
        for (int i = 0; i < rows; i++) {
            if (matrix[i][0] == 0) col0 = 0;
            for (int j = 1; j < cols; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }

        // Step 2: Fill inner matrix from (1,1) up to (rows-1, cols-1)
        for (int i = 1; i < rows; i++) {
            for (int j = 1; j < cols; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }

        // Step 3: Fill row 0 if marked
        if (matrix[0][0] == 0) {
            for (int j = 0; j < cols; j++) matrix[0][j] = 0;
        }

        // Step 4: Fill col 0 if col0 == 0
        if (col0 == 0) {
            for (int i = 0; i < rows; i++) matrix[i][0] = 0;
        }
    }
};`,
  python: `# Python 3 Optimal In-Place O(1) Space Set Matrix Zeroes
class Solution:
    def setZeroes(self, matrix: list[list[int]]) -> None:
        m, n = len(matrix), len(matrix[0])
        col0 = 1

        for i in range(m):
            if matrix[i][0] == 0:
                col0 = 0
            for j in range(1, n):
                if matrix[i][j] == 0:
                    matrix[i][0] = 0
                    matrix[0][j] = 0

        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][0] == 0 or matrix[0][j] == 0:
                    matrix[i][j] = 0

        if matrix[0][0] == 0:
            for j in range(n):
                matrix[0][j] = 0

        if col0 == 0:
            for i in range(m):
                matrix[i][0] = 0`,
  java: `// Java Optimal In-Place O(1) Space Set Matrix Zeroes
class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        int col0 = 1;

        for (int i = 0; i < m; i++) {
            if (matrix[i][0] == 0) col0 = 0;
            for (int j = 1; j < n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }

        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }

        if (matrix[0][0] == 0) {
            for (int j = 0; j < n; j++) matrix[0][j] = 0;
        }

        if (col0 == 0) {
            for (int i = 0; i < m; i++) matrix[i][0] = 0;
        }
    }
}`,
  javascript: `// JavaScript Optimal In-Place O(1) Space Set Matrix Zeroes
var setZeroes = function(matrix) {
    const m = matrix.length, n = matrix[0].length;
    let col0 = 1;

    for (let i = 0; i < m; i++) {
        if (matrix[i][0] === 0) col0 = 0;
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }

    if (matrix[0][0] === 0) {
        for (let j = 0; j < n; j++) matrix[0][j] = 0;
    }

    if (col0 === 0) {
        for (let i = 0; i < m; i++) matrix[i][0] = 0;
    }
};`
};

export const steps = [
  {
    title: '1. Initial State: Matrix with 0 at (1,1)',
    phase: 'SCAN',
    codeLine: 12,
    matrix: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1]
    ],
    col0: 1,
    activeCell: null,
    markedHeaders: [],
    variables: { col0: 1, action: 'Scanning matrix for zeros' },
    explain: 'Instead of allocating O(M+N) extra arrays, we use row 0 as column markers and col 0 as row markers. The single cell (0,0) is shared, so a separate variable col0 tracks column 0.',
    intuition: 'Repurposing the matrix border itself achieves true O(1) auxiliary space.'
  },
  {
    title: '2. Found 0 at (1,1): Mark row 1 & col 1 headers',
    phase: 'MARKING',
    codeLine: 18,
    matrix: [
      [1, 0, 1],
      [0, 0, 1],
      [1, 1, 1]
    ],
    col0: 1,
    activeCell: [1, 1],
    markedHeaders: [[1, 0], [0, 1]],
    variables: { 'matrix[1][1]': 0, 'matrix[1][0]': 0, 'matrix[0][1]': 0, col0: 1 },
    explain: 'Element at (1,1) is zero. We set row marker matrix[1][0] = 0 and column marker matrix[0][1] = 0.',
    intuition: 'Any element marked on the border signifies that its entire row or column will be zeroed.'
  },
  {
    title: '3. Fill Inner Matrix (1,1 to m-1, n-1) Using Markers',
    phase: 'INNER_FILL',
    codeLine: 26,
    matrix: [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1]
    ],
    col0: 1,
    activeCell: null,
    markedHeaders: [],
    variables: { action: 'Updated inner cells matching 0 headers' },
    explain: 'Iterate from (1,1) onwards. Since matrix[1][0]==0, row 1 gets zeroed. Since matrix[0][1]==0, col 1 gets zeroed.',
    intuition: 'We must fill the interior first so we do not overwrite the header flags prematurely!'
  },
  {
    title: '4. Check First Row: matrix[0][0] is 1 (Keep Row 0)',
    phase: 'ROW0_CHECK',
    codeLine: 34,
    matrix: [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1]
    ],
    col0: 1,
    activeCell: [0, 0],
    markedHeaders: [],
    variables: { 'matrix[0][0]': 1, 'row0_zeroed': false },
    explain: 'matrix[0][0] is 1, meaning original row 0 had no zeros initially. Row 0 remains unchanged.',
    intuition: 'Matrix[0][0] controls row 0.'
  },
  {
    title: '5. Check col0 Flag: col0 is 1 (Col 0 Safe)',
    phase: 'COMPLETED',
    codeLine: 39,
    matrix: [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1]
    ],
    col0: 1,
    activeCell: null,
    markedHeaders: [],
    variables: { col0: 1, status: 'Matrix zeroing complete!' },
    explain: 'col0 is 1, so column 0 had no original zeros. Final matrix correctly has entire row 1 and col 1 set to 0.',
    intuition: 'Clean O(1) space with O(M x N) time complexity.'
  }
];

export default function SetMatrixZeroesVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Top Controls & col0 Indicator */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161822] border border-[#2c3044] text-xs font-mono">
          <span className="text-[#8e92a4]">col0 flag:</span>
          <span className={`px-2 py-0.5 rounded font-bold ${step.col0 === 0 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>
            {step.col0}
          </span>
        </div>
        <span className="text-xs font-mono text-[#6c728a] px-3 py-1 rounded-lg bg-[#14151e] border border-[#222534]">
          Phase: {step.phase}
        </span>
      </div>

      {/* Grid Display with Border Markers */}
      <div className="p-4 rounded-2xl bg-[#101117] border border-[#252838] shadow-2xl flex flex-col gap-2">
        {step.matrix.map((row, rIdx) => (
          <div key={rIdx} className="flex items-center gap-2">
            {row.map((val, cIdx) => {
              const isHeaderRow = rIdx === 0;
              const isHeaderCol = cIdx === 0;
              const isMarked = step.markedHeaders.some(([r, c]) => r === rIdx && c === cIdx);
              const isActive = step.activeCell && step.activeCell[0] === rIdx && step.activeCell[1] === cIdx;
              const isZero = val === 0;

              let style = 'bg-[#181a24] text-white border-[#2b2e40]';
              if (isActive) {
                style = 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105 shadow-md shadow-amber-500/20';
              } else if (isMarked) {
                style = 'bg-rose-500/25 text-rose-300 border-rose-500 scale-105';
              } else if (isZero) {
                style = 'bg-rose-500/15 text-rose-400 border-rose-500/30 font-bold';
              } else if (isHeaderRow || isHeaderCol) {
                style = 'bg-[#1e202e] text-[#a0a5bc] border-[#363a52]';
              }

              return (
                <div
                  key={cIdx}
                  className={`w-14 h-14 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all duration-300 ${style}`}
                >
                  <span className="text-lg">{val}</span>
                  {(isHeaderRow || isHeaderCol) && (
                    <span className="text-[8px] text-[#717690]">flag</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 text-xs font-mono text-[#8a8ea3]">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-[#1e202e] border border-[#363a52]"></span>
          <span>Header Flag</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500"></span>
          <span>Active Inspection</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-rose-500/30 border border-rose-500"></span>
          <span>Zeroed Cell</span>
        </div>
      </div>
    </div>
  );
}

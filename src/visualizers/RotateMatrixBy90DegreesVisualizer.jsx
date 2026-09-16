import React from 'react';

export const meta = {
  title: 'Rotate Matrix by 90 Degrees Clockwise',
  category: 'Arrays & Matrix Manipulation',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(1) In-Place',
  description: 'Rotates an N x N 2D matrix clockwise by 90 degrees in-place without allocating a second matrix. Achieved by transposing the matrix and then reversing each row.'
};

export const solutions = {
  cpp: `// C++ Optimal In-Place Matrix 90° Clockwise Rotation
// Step 1: Transpose matrix[i][j] <=> matrix[j][i]
// Step 2: Reverse every row
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        // 1. Transpose
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                swap(matrix[i][j], matrix[j][i]);
            }
        }
        // 2. Reverse each row
        for (int i = 0; i < n; i++) {
            reverse(matrix[i].begin(), matrix[i].end());
        }
    }
};`,
  python: `# Python 3 Optimal In-Place 90° Clockwise Matrix Rotation
class Solution:
    def rotate(self, matrix: list[list[int]]) -> None:
        n = len(matrix)
        # Step 1: Transpose (swap across main diagonal)
        for i in range(n):
            for j in range(i + 1, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
        
        # Step 2: Reverse each row
        for row in matrix:
            row.reverse()`,
  java: `// Java Optimal In-Place 90° Clockwise Matrix Rotation
class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        // Step 1: Transpose
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        // Step 2: Reverse rows
        for (int i = 0; i < n; i++) {
            int left = 0, right = n - 1;
            while (left < right) {
                int temp = matrix[i][left];
                matrix[i][left] = matrix[i][right];
                matrix[i][right] = temp;
                left++;
                right--;
            }
        }
    }
}`,
  javascript: `// JavaScript Optimal In-Place 90° Clockwise Matrix Rotation
var rotate = function(matrix) {
    const n = matrix.length;
    // Step 1: Transpose matrix
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    // Step 2: Reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
};`
};

export const steps = [
  {
    title: '1. Initial State: Original 3x3 Matrix',
    phase: 'INITIAL',
    codeLine: 12,
    matrix: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ],
    highlightPair: null,
    reversedRow: null,
    variables: { n: 3, operation: 'Ready to transpose' },
    explain: 'We are given an N x N matrix. A 90° clockwise rotation transforms row i into column (n - 1 - i). We can achieve this in O(1) extra space by first Transposing, then Reversing rows.',
    intuition: 'Transpose reflects elements along the main diagonal; reversing columns turns reflection into a clockwise rotation.'
  },
  {
    title: '2. Transpose: Swap (0,1) with (1,0) [2 <=> 4]',
    phase: 'TRANSPOSE',
    codeLine: 16,
    matrix: [
      [1, 4, 3],
      [2, 5, 6],
      [7, 8, 9]
    ],
    highlightPair: [[0, 1], [1, 0]],
    reversedRow: null,
    variables: { i: 0, j: 1, 'matrix[0][1]': 2, 'matrix[1][0]': 4 },
    explain: 'Swap matrix[0][1] (2) with matrix[1][0] (4). Notice diagonal element (0,0)=1 stays invariant.',
    intuition: 'Reflecting elements across diagonal i == j transforms rows into column vectors.'
  },
  {
    title: '3. Transpose: Swap (0,2) with (2,0) [3 <=> 7]',
    phase: 'TRANSPOSE',
    codeLine: 16,
    matrix: [
      [1, 4, 7],
      [2, 5, 6],
      [3, 8, 9]
    ],
    highlightPair: [[0, 2], [2, 0]],
    reversedRow: null,
    variables: { i: 0, j: 2, 'matrix[0][2]': 3, 'matrix[2][0]': 7 },
    explain: 'Swap matrix[0][2] (3) with matrix[2][0] (7). Top right swaps with bottom left.',
    intuition: 'Outer boundary transposed.'
  },
  {
    title: '4. Transpose: Swap (1,2) with (2,1) [6 <=> 8]',
    phase: 'TRANSPOSE',
    codeLine: 16,
    matrix: [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9]
    ],
    highlightPair: [[1, 2], [2, 1]],
    reversedRow: null,
    variables: { i: 1, j: 2, 'matrix[1][2]': 6, 'matrix[2][1]': 8 },
    explain: 'Swap matrix[1][2] (6) with matrix[2][1] (8). Transpose phase is complete!',
    intuition: 'All elements above the diagonal have been swapped with their symmetric partners below.'
  },
  {
    title: '5. Reverse Row 0: [1, 4, 7] becomes [7, 4, 1]',
    phase: 'REVERSE_ROWS',
    codeLine: 21,
    matrix: [
      [7, 4, 1],
      [2, 5, 8],
      [3, 6, 9]
    ],
    highlightPair: null,
    reversedRow: 0,
    variables: { row: 0, 'original': '[1, 4, 7]', 'reversed': '[7, 4, 1]' },
    explain: 'Reverse the elements in row 0. 1 and 7 swap positions.',
    intuition: 'Horizontally flipping each row converts transposed rows into clockwise rotated columns.'
  },
  {
    title: '6. Reverse Row 1: [2, 5, 8] becomes [8, 5, 2]',
    phase: 'REVERSE_ROWS',
    codeLine: 21,
    matrix: [
      [7, 4, 1],
      [8, 5, 2],
      [3, 6, 9]
    ],
    highlightPair: null,
    reversedRow: 1,
    variables: { row: 1, 'original': '[2, 5, 8]', 'reversed': '[8, 5, 2]' },
    explain: 'Reverse the elements in row 1. 2 and 8 swap positions.',
    intuition: 'Middle row reversed.'
  },
  {
    title: '7. Reverse Row 2: [3, 6, 9] becomes [9, 6, 3]',
    phase: 'COMPLETED',
    codeLine: 21,
    matrix: [
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3]
    ],
    highlightPair: null,
    reversedRow: 2,
    variables: { status: 'Fully Rotated 90° Clockwise', inPlace: 'O(1) Memory' },
    explain: 'Reverse row 2. The entire matrix is now perfectly rotated 90 degrees clockwise in-place!',
    intuition: 'Original Row 1 [1, 2, 3] is now Col 3 [1, 2, 3]! Original Row 2 is Col 2, Row 3 is Col 1.'
  }
];

export default function RotateMatrixBy90DegreesVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Phase Badge */}
      <div className="flex items-center gap-3">
        <span className={`px-3 py-1 text-xs font-mono font-semibold rounded-full border ${
          step.phase === 'INITIAL' ? 'bg-[#1b1e2e] text-[#8e92a4] border-[#2c2f3d]' :
          step.phase === 'TRANSPOSE' ? 'bg-amber-500/10 text-amber-300 border-amber-500/30' :
          step.phase === 'REVERSE_ROWS' ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30' :
          'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
        }`}>
          Phase: {step.phase}
        </span>
      </div>

      {/* 3x3 Grid Display */}
      <div className="p-4 rounded-2xl bg-[#12131a] border border-[#252836] shadow-xl flex flex-col gap-2.5">
        {step.matrix.map((row, rIdx) => {
          const isRowReversed = step.reversedRow === rIdx;

          return (
            <div key={rIdx} className="flex items-center gap-2.5">
              {row.map((val, cIdx) => {
                const isDiagonal = rIdx === cIdx;
                const isHighlighted = step.highlightPair && step.highlightPair.some(
                  ([hr, hc]) => hr === rIdx && hc === cIdx
                );

                let cellStyle = 'bg-[#181a24] text-white border-[#2e3245]';
                if (isHighlighted) {
                  cellStyle = 'bg-amber-500/20 text-amber-300 border-amber-400 scale-105 shadow-md shadow-amber-500/20';
                } else if (isRowReversed) {
                  cellStyle = 'bg-indigo-500/20 text-indigo-200 border-indigo-500/50 scale-105';
                } else if (isDiagonal && step.phase === 'TRANSPOSE') {
                  cellStyle = 'bg-slate-800/40 text-[#6f7590] border-[#282b3a]';
                }

                return (
                  <div
                    key={cIdx}
                    className={`w-16 h-16 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all duration-300 ${cellStyle}`}
                  >
                    <span className="text-xl">{val}</span>
                    <span className="text-[9px] text-[#5e6378] font-normal">[{rIdx}][{cIdx}]</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs font-mono text-[#8a8ea3]">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500"></span>
          <span>Transpose Pair</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-indigo-500/30 border border-indigo-500"></span>
          <span>Row Reversal</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500"></span>
          <span>Final Placement</span>
        </div>
      </div>
    </div>
  );
}

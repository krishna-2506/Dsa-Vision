// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Rotate Matrix by 90 Degrees Clockwise',
  category: 'Arrays & Matrix Manipulation',
  difficulty: 'Medium',
  timeComplexity: 'O(N²)',
  spaceComplexity: 'O(1) In-Place',
  description: 'Rotates an N x N 2D matrix clockwise by 90 degrees in-place without allocating a second matrix. Achieved by transposing the matrix and then reversing each row.'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'In-Place 90° Clockwise Rotation',
  nodes: [
    { id: 'root', label: 'Matrix 90° Rotation Invariant', children: ['two-step-strategy', 'transpose-step', 'row-reversal', 'complexity'] },
    { id: 'two-step-strategy', label: '1. Two-Step Decomposition', detail: 'Clockwise 90° rotation is mathematically equivalent to Matrix Transpose followed by Row Reversals' },
    { id: 'transpose-step', label: '2. In-Place Transposition', detail: 'Swap matrix[i][j] with matrix[j][i] for all j > i across the main diagonal' },
    { id: 'row-reversal', label: '3. Horizontal Row Reversal', detail: 'Reverse each row in-place using two pointers (swap matrix[i][left] with matrix[i][right])' },
    { id: 'complexity', label: '4. Optimal O(N²) & O(1) Space', detail: 'Every cell visited a constant number of times; strictly zero additional memory allocated' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal In-Place Matrix 90° Clockwise Rotation
// Time Complexity: O(N^2) | Space Complexity: O(1) in-place
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        // Step 1: Transpose matrix across main diagonal
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                swap(matrix[i][j], matrix[j][i]);
            }
        }
        // Step 2: Reverse every row
        for (int i = 0; i < n; i++) {
            reverse(matrix[i].begin(), matrix[i].end());
        }
    }
};`,
  python: `# Python 3 Optimal In-Place 90° Clockwise Matrix Rotation
# Time Complexity: O(N^2) | Space Complexity: O(1)
class Solution:
    def rotate(self, matrix: list[list[int]]) -> None:
        n = len(matrix)
        # Step 1: Transpose
        for i in range(n):
            for j in range(i + 1, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
        
        # Step 2: Reverse each row
        for row in matrix:
            row.reverse()`,
  java: `// Java Optimal In-Place 90° Clockwise Matrix Rotation
// Time Complexity: O(N^2) | Space Complexity: O(1)
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
// Time Complexity: O(N^2) | Space Complexity: O(1)
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
    phase: 'SETUP',
    grid: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2'],
    activeCell: null,
    dependencyCells: [],
    metrics: [
      { label: 'Matrix Size', value: '3 x 3' },
      { label: 'Rotation', value: '90° Clockwise' },
      { label: 'Space Constraint', value: 'O(1) In-Place' }
    ],
    formula: 'Rotate(M) = ReverseRows(Transpose(M))',
    action: 'Initialize matrix for in-place 90° clockwise rotation',
    explain: 'Rotating an N x N matrix clockwise by 90 degrees can be broken into two clean linear-algebraic steps: 1) Transpose the matrix across the main diagonal, then 2) Reverse every row horizontally.',
    intuition: 'Transposing swaps row-indices with column-indices. Reversing rows corrects the left-to-right orientation.'
  },
  {
    title: '2. Transpose Concept: Swap Elements Across the Main Diagonal',
    phase: 'TRANSPOSE_PLAN',
    grid: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2'],
    activeCell: null,
    dependencyCells: [
      { row: 0, col: 0, color: 'accent' },
      { row: 1, col: 1, color: 'accent' },
      { row: 2, col: 2, color: 'accent' }
    ],
    metrics: [
      { label: 'Diagonal', value: '[1, 5, 9] (Stationary)' },
      { label: 'Upper Triangle', value: '[(0,1), (0,2), (1,2)]' },
      { label: 'Lower Triangle', value: '[(1,0), (2,0), (2,1)]' }
    ],
    formula: 'for i = 0..n-1: for j = i+1..n-1: swap(matrix[i][j], matrix[j][i])',
    action: 'Elements on main diagonal (1, 5, 9) remain stationary. Symmetrical pairs will swap',
    explain: 'In transposition, elements matrix[i][i] on the main diagonal do not move. For all j > i, we swap matrix[i][j] with matrix[j][i].',
    intuition: 'Only upper-triangular elements need to initiate a swap to avoid duplicate flipping.'
  },
  {
    title: '3. Transpose Swap 1: Swap (0, 1) [val 2] and (1, 0) [val 4]',
    phase: 'TRANSPOSE_SWAP',
    grid: [
      [1, 4, 3],
      [2, 5, 6],
      [7, 8, 9]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2'],
    activeCell: { row: 0, col: 1 },
    dependencyCells: [
      { row: 1, col: 0, color: 'accent' }
    ],
    metrics: [
      { label: 'Swap Pair', value: '(0,1) <-> (1,0)' },
      { label: 'Values', value: '2 <-> 4', highlight: true },
      { label: 'Diagonal Fixed', value: '1, 5' }
    ],
    formula: 'swap(matrix[0][1], matrix[1][0]): 2 <-> 4',
    action: 'Swap matrix[0][1] (2) with matrix[1][0] (4)',
    explain: 'At i=0, j=1, we swap 2 and 4. Now 4 is at (0, 1) and 2 is at (1, 0).',
    intuition: 'First off-diagonal pair transposed.'
  },
  {
    title: '4. Transpose Swap 2: Swap (0, 2) [val 3] and (2, 0) [val 7]',
    phase: 'TRANSPOSE_SWAP',
    grid: [
      [1, 4, 7],
      [2, 5, 6],
      [3, 8, 9]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2'],
    activeCell: { row: 0, col: 2 },
    dependencyCells: [
      { row: 2, col: 0, color: 'accent' }
    ],
    metrics: [
      { label: 'Swap Pair', value: '(0,2) <-> (2,0)' },
      { label: 'Values', value: '3 <-> 7', highlight: true },
      { label: 'Row 0 Progress', value: 'Fully Transposed' }
    ],
    formula: 'swap(matrix[0][2], matrix[2][0]): 3 <-> 7',
    action: 'Swap matrix[0][2] (3) with matrix[2][0] (7)',
    explain: 'At i=0, j=2, we swap 3 and 7. The entire first row and first column are now correctly transposed.',
    intuition: 'Corners 3 and 7 exchange positions.'
  },
  {
    title: '5. Transpose Swap 3: Swap (1, 2) [val 6] and (2, 1) [val 8]',
    phase: 'TRANSPOSE_SWAP',
    grid: [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2'],
    activeCell: { row: 1, col: 2 },
    dependencyCells: [
      { row: 2, col: 1, color: 'accent' }
    ],
    metrics: [
      { label: 'Swap Pair', value: '(1,2) <-> (2,1)' },
      { label: 'Values', value: '6 <-> 8', highlight: true },
      { label: 'Transpose Status', value: 'Finished!' }
    ],
    formula: 'swap(matrix[1][2], matrix[2][1]): 6 <-> 8',
    action: 'Swap matrix[1][2] (6) with matrix[2][1] (8)',
    explain: 'At i=1, j=2, we swap 6 and 8. The transposition of the entire matrix is now complete.',
    intuition: 'All off-diagonal pairs have exchanged positions across the diagonal axis.'
  },
  {
    title: '6. Transpose Complete: Notice Columns Are Transposed Rows',
    phase: 'TRANSPOSE_DONE',
    grid: [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9]
    ],
    rowLabels: ['r0: [1, 4, 7]', 'r1: [2, 5, 8]', 'r2: [3, 6, 9]'],
    colLabels: ['c0', 'c1', 'c2'],
    activeCell: null,
    dependencyCells: [],
    metrics: [
      { label: 'Step 1 Status', value: 'Transpose Complete', highlight: true },
      { label: 'Current Row 0', value: '[1, 4, 7]' },
      { label: 'Target Row 0', value: '[7, 4, 1]' },
      { label: 'Step 2 Next', value: 'Reverse Every Row' }
    ],
    formula: 'Matrix is Transposed. Next: Reverse each row horizontally',
    action: 'Transposition complete. Original columns [1, 4, 7], [2, 5, 8], [3, 6, 9] are now rows',
    explain: 'Comparing [1, 4, 7] with the desired 90° clockwise row [7, 4, 1], we observe that reversing each row horizontally will yield the exact clockwise rotation.',
    intuition: 'A horizontal reflection turns the transposed matrix into the 90° rotated matrix.'
  },
  {
    title: '7. Reverse Row 0: [1, 4, 7] ➔ [7, 4, 1]',
    phase: 'ROW_REVERSE',
    grid: [
      [7, 4, 1],
      [2, 5, 8],
      [3, 6, 9]
    ],
    rowLabels: ['r0 (Reversed)', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2'],
    activeCell: { row: 0, col: 0 },
    dependencyCells: [
      { row: 0, col: 2, color: 'accent' }
    ],
    metrics: [
      { label: 'Reversing Row', value: 'Row 0' },
      { label: 'Before', value: '[1, 4, 7]' },
      { label: 'After', value: '[7, 4, 1]', highlight: true }
    ],
    formula: 'swap(matrix[0][0], matrix[0][2]): 1 <-> 7',
    action: 'Reverse Row 0: swap elements at col 0 and col 2',
    explain: 'In row 0, swap 1 and 7. The middle element 4 stays put. Row 0 is now [7, 4, 1], which matches the first row of a 90° clockwise rotation!',
    intuition: 'First row rotated into final configuration.'
  },
  {
    title: '8. Reverse Row 1 & Row 2: Complete Horizontal Reflections',
    phase: 'ROW_REVERSE',
    grid: [
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3]
    ],
    rowLabels: ['r0: [7, 4, 1]', 'r1: [8, 5, 2]', 'r2: [9, 6, 3]'],
    colLabels: ['c0', 'c1', 'c2'],
    activeCell: null,
    dependencyCells: [
      { row: 1, col: 0, color: 'accent' },
      { row: 1, col: 2, color: 'accent' },
      { row: 2, col: 0, color: 'accent' },
      { row: 2, col: 2, color: 'accent' }
    ],
    metrics: [
      { label: 'Row 1 Reversed', value: '[2, 5, 8] -> [8, 5, 2]' },
      { label: 'Row 2 Reversed', value: '[3, 6, 9] -> [9, 6, 3]' },
      { label: 'Rotation Complete', value: 'All Rows Set', highlight: true }
    ],
    formula: 'matrix[i].reverse() for all i in 0..N-1',
    action: 'Reverse Row 1 (swap 2 and 8) and Row 2 (swap 3 and 9)',
    explain: 'Reversing row 1 gives [8, 5, 2]. Reversing row 2 gives [9, 6, 3]. Every row is now correctly reversed.',
    intuition: 'All horizontal reflections finalized.'
  },
  {
    title: '9. Completed: 90° Clockwise Rotation Verified In-Place',
    phase: 'COMPLETED',
    grid: [
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2'],
    activeCell: null,
    dependencyCells: [
      { row: 0, col: 0, color: 'accent' },
      { row: 0, col: 2, color: 'accent' },
      { row: 2, col: 0, color: 'accent' },
      { row: 2, col: 2, color: 'accent' }
    ],
    metrics: [
      { label: 'Original Top-Left', value: '1 is now at (0, 2)' },
      { label: 'Original Bottom-Left', value: '7 is now at (0, 0)', highlight: true },
      { label: 'Time Complexity', value: 'O(N²)' },
      { label: 'Space Complexity', value: 'O(1) In-Place' }
    ],
    formula: 'M_new[j][n - 1 - i] = M_old[i][j]',
    action: 'Rotation complete. Matrix successfully rotated by 90° clockwise in-place.',
    explain: 'Notice that original column 1 [1, 4, 7] has cleanly become row 1 [7, 4, 1]. The entire operation used exactly zero auxiliary arrays.',
    intuition: 'Transpose + Reverse is the standard, most elegant in-place matrix rotation algorithm.'
  }
];

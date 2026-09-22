// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Set Matrix Zeroes',
  category: 'Arrays & Matrix Manipulation',
  difficulty: 'Medium',
  timeComplexity: 'O(M x N)',
  spaceComplexity: 'O(1) In-Place',
  description: 'Given an m x n integer matrix, if an element is 0, set its entire row and column to 0. Solved in-place with O(1) extra space by utilizing the first row and first column as marker flags.'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'In-Place Matrix Zeroing Strategy',
  nodes: [
    { id: 'root', label: 'In-Place Zeroing Strategy', children: ['marker-reuse', 'col0-variable', 'inner-fill', 'boundary-fill'] },
    { id: 'marker-reuse', label: '1. First Row & Col as Flags', detail: 'matrix[0][j] stores column 0 flags; matrix[i][0] stores row 0 flags' },
    { id: 'col0-variable', label: '2. col0 Disambiguation', detail: 'matrix[0][0] overlaps both row 0 and col 0; use a separate variable col0 to track column 0' },
    { id: 'inner-fill', label: '3. Inner Matrix Zeroing', detail: 'Traverse from (1,1) to (M-1, N-1); if matrix[i][0] == 0 or matrix[0][j] == 0, set matrix[i][j] = 0' },
    { id: 'boundary-fill', label: '4. Boundary Rows Last', detail: 'Fill row 0 based on matrix[0][0], then fill col 0 based on col0 variable to prevent premature flag overwriting' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal In-Place O(1) Space Set Matrix Zeroes
// Time Complexity: O(M x N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        int col0 = 1;

        // Step 1: Record zero markers in first row and column
        for (int i = 0; i < m; i++) {
            if (matrix[i][0] == 0) col0 = 0;
            for (int j = 1; j < n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }

        // Step 2: Zero out inner cells from (1,1) up to (m-1, n-1)
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }

        // Step 3: Zero out first row if marked
        if (matrix[0][0] == 0) {
            for (int j = 0; j < n; j++) matrix[0][j] = 0;
        }

        // Step 4: Zero out first column if col0 is 0
        if (col0 == 0) {
            for (int i = 0; i < m; i++) matrix[i][0] = 0;
        }
    }
};`,
  python: `# Python 3 Optimal In-Place O(1) Space Set Matrix Zeroes
# Time Complexity: O(M x N) | Space Complexity: O(1)
class Solution:
    def setZeroes(self, matrix: list[list[int]]) -> None:
        m, n = len(matrix), len(matrix[0])
        col0 = 1

        # Step 1: Mark rows & cols
        for i in range(m):
            if matrix[i][0] == 0:
                col0 = 0
            for j in range(1, n):
                if matrix[i][j] == 0:
                    matrix[i][0] = 0
                    matrix[0][j] = 0

        # Step 2: Fill inner matrix
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][0] == 0 or matrix[0][j] == 0:
                    matrix[i][j] = 0

        # Step 3: Fill first row
        if matrix[0][0] == 0:
            for j in range(n):
                matrix[0][j] = 0

        # Step 4: Fill first column
        if col0 == 0:
            for i in range(m):
                matrix[i][0] = 0`,
  java: `// Java Optimal In-Place O(1) Space Set Matrix Zeroes
// Time Complexity: O(M x N) | Space Complexity: O(1)
class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        int col0 = 1;

        // Step 1: Mark first row & col
        for (int i = 0; i < m; i++) {
            if (matrix[i][0] == 0) col0 = 0;
            for (int j = 1; j < n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }

        // Step 2: Fill inner cells
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }

        // Step 3: Fill row 0
        if (matrix[0][0] == 0) {
            for (int j = 0; j < n; j++) matrix[0][j] = 0;
        }

        // Step 4: Fill col 0
        if (col0 == 0) {
            for (int i = 0; i < m; i++) matrix[i][0] = 0;
        }
    }
}`,
  javascript: `// JavaScript Optimal In-Place O(1) Space Set Matrix Zeroes
// Time Complexity: O(M x N) | Space Complexity: O(1)
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
    title: '1. Initial State: 3x3 Matrix with Zero at (1, 1)',
    phase: 'SETUP',
    grid: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2'],
    activeCell: { row: 1, col: 1 },
    dependencyCells: [],
    metrics: [
      { label: 'Matrix Size', value: '3 x 3' },
      { label: 'col0 Flag', value: '1' },
      { label: 'Space Constraint', value: 'O(1) In-Place' }
    ],
    formula: 'Rule: If matrix[i][j] == 0, set row i and col j to 0',
    action: 'Scan matrix and initialize marker strategy',
    explain: 'Given a 3x3 matrix where cell (1, 1) has value 0. In-place requirement forbids allocating an O(M + N) auxiliary boolean array. Instead, we use row 0 and column 0 of the matrix itself as our marker arrays.',
    intuition: 'Since matrix[0][0] would represent both row 0 and col 0, we use a separate variable col0 for column 0.'
  },
  {
    title: '2. Pass 1: Mark Row & Column Headers for Zero at (1, 1)',
    phase: 'MARKING',
    grid: [
      [1, 0, 1],
      [0, 0, 1],
      [1, 1, 1]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2'],
    activeCell: { row: 1, col: 1 },
    dependencyCells: [
      { row: 1, col: 0, color: 'accent' },
      { row: 0, col: 1, color: 'accent' }
    ],
    metrics: [
      { label: 'Zero Detected', value: 'At (1, 1)', highlight: true },
      { label: 'Row Marker', value: 'matrix[1][0] = 0' },
      { label: 'Col Marker', value: 'matrix[0][1] = 0' },
      { label: 'col0 Flag', value: '1' }
    ],
    formula: 'matrix[1][j] == 0 ==> matrix[1][0] = 0, matrix[0][1] = 0',
    action: 'Set row marker matrix[1][0] = 0 and column marker matrix[0][1] = 0',
    explain: 'Cell (1, 1) is 0. We mark its corresponding row header matrix[1][0] = 0 and column header matrix[0][1] = 0. These headers will broadcast zeroes to the entire row and column in the next pass.',
    intuition: 'Storing flags inside the boundary avoids allocating auxiliary memory.'
  },
  {
    title: '3. Pass 1 Complete: Headers Configured',
    phase: 'MARKERS_LOCKED',
    grid: [
      [1, 0, 1],
      [0, 0, 1],
      [1, 1, 1]
    ],
    rowLabels: ['r0 (flag)', 'r1 (flag)', 'r2 (flag)'],
    colLabels: ['c0', 'c1', 'c2'],
    activeCell: null,
    dependencyCells: [
      { row: 0, col: 1, color: 'accent' },
      { row: 1, col: 0, color: 'accent' }
    ],
    metrics: [
      { label: 'Marked Rows', value: 'Row 1' },
      { label: 'Marked Cols', value: 'Col 1' },
      { label: 'col0 Variable', value: '1 (Col 0 Safe)' },
      { label: 'Next Pass', value: 'Inner Matrix (1,1)..(2,2)' }
    ],
    formula: 'Markers: Row 1 = 0, Col 1 = 0',
    action: 'Completed marking pass. Ready to update inner matrix cells',
    explain: 'The first row and column now hold all information needed to zero out the matrix. We must update the inner matrix (from index 1,1) FIRST before touching the headers themselves.',
    intuition: 'If we overwrite row 0 or col 0 too early, we would lose the marker information for subsequent rows.'
  },
  {
    title: '4. Pass 2: Inner Cell (1, 1) Checked => Set to 0',
    phase: 'INNER_UPDATE',
    grid: [
      [1, 0, 1],
      [0, 0, 1],
      [1, 1, 1]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2'],
    activeCell: { row: 1, col: 1 },
    dependencyCells: [
      { row: 1, col: 0, color: 'accent' },
      { row: 0, col: 1, color: 'accent' }
    ],
    metrics: [
      { label: 'Current Cell', value: '(1, 1)' },
      { label: 'matrix[1][0]', value: '0 (Triggered)' },
      { label: 'matrix[0][1]', value: '0 (Triggered)' },
      { label: 'Result (1, 1)', value: '0' }
    ],
    formula: 'if (matrix[1][0] == 0 || matrix[0][1] == 0) matrix[1][1] = 0;',
    action: 'matrix[1][0] == 0 and matrix[0][1] == 0: Cell (1, 1) remains 0',
    explain: 'Both row 1 and column 1 have zero markers. Cell (1, 1) is set to 0.',
    intuition: 'Any cell whose row header or column header is 0 must become 0.'
  },
  {
    title: '5. Pass 2: Inner Cell (1, 2) Checked => Set to 0',
    phase: 'INNER_UPDATE',
    grid: [
      [1, 0, 1],
      [0, 0, 0],
      [1, 1, 1]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2'],
    activeCell: { row: 1, col: 2 },
    dependencyCells: [
      { row: 1, col: 0, color: 'accent' }
    ],
    metrics: [
      { label: 'Current Cell', value: '(1, 2)' },
      { label: 'matrix[1][0]', value: '0 (Row Flagged)', highlight: true },
      { label: 'matrix[0][2]', value: '1' },
      { label: 'Result (1, 2)', value: '0' }
    ],
    formula: 'matrix[1][0] == 0 ==> matrix[1][2] = 0',
    action: 'matrix[1][0] is 0: Zero out cell (1, 2)',
    explain: 'Because row 1 marker matrix[1][0] is 0, all cells in row 1 must become 0. Cell (1, 2) changes from 1 to 0.',
    intuition: 'The row flag propagates horizontally across row 1.'
  },
  {
    title: '6. Pass 2: Inner Cell (2, 1) Checked => Set to 0',
    phase: 'INNER_UPDATE',
    grid: [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2'],
    activeCell: { row: 2, col: 1 },
    dependencyCells: [
      { row: 0, col: 1, color: 'accent' }
    ],
    metrics: [
      { label: 'Current Cell', value: '(2, 1)' },
      { label: 'matrix[2][0]', value: '1' },
      { label: 'matrix[0][1]', value: '0 (Col Flagged)', highlight: true },
      { label: 'Result (2, 1)', value: '0' }
    ],
    formula: 'matrix[0][1] == 0 ==> matrix[2][1] = 0',
    action: 'matrix[0][1] is 0: Zero out cell (2, 1)',
    explain: 'Because column 1 marker matrix[0][1] is 0, all cells in column 1 must become 0. Cell (2, 1) changes from 1 to 0.',
    intuition: 'The column flag propagates vertically down column 1.'
  },
  {
    title: '7. Pass 3: Check Row 0 Marker matrix[0][0]',
    phase: 'ROW_ZERO_CHECK',
    grid: [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2'],
    activeCell: { row: 0, col: 0 },
    dependencyCells: [],
    metrics: [
      { label: 'matrix[0][0]', value: '1' },
      { label: 'Row 0 Needs Zeroing?', value: 'No (matrix[0][0] != 0)' },
      { label: 'Action', value: 'Row 0 Preserved' }
    ],
    variables: { 'matrix[0][0]': 1, zeroRow0: false },
    formula: 'if (matrix[0][0] == 0) zero out entire row 0; (Here 1 != 0)',
    action: 'matrix[0][0] is 1: Row 0 was not originally zeroed, so leave it untouched',
    explain: 'matrix[0][0] tracks whether row 0 originally contained any zeroes. Since matrix[0][0] is 1, row 0 remains unchanged (except cell (0,1) which was a column marker).',
    intuition: 'Row 0 was processed only after the inner cells finished.'
  },
  {
    title: '8. Pass 4: Check col0 Variable',
    phase: 'COL_ZERO_CHECK',
    grid: [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2'],
    activeCell: null,
    dependencyCells: [],
    metrics: [
      { label: 'col0 Variable', value: '1' },
      { label: 'Col 0 Needs Zeroing?', value: 'No (col0 == 1)' },
      { label: 'Action', value: 'Col 0 Preserved' }
    ],
    variables: { col0: 1, zeroCol0: false },
    formula: 'if (col0 == 0) zero out entire col 0; (Here col0 == 1)',
    action: 'col0 is 1: Column 0 did not originally contain zero, so leave column 0 intact',
    explain: 'Variable col0 indicates whether column 0 originally contained any zeroes. Since col0 == 1, column 0 is not zeroed out.',
    intuition: 'The independent col0 variable accurately prevented accidental column 0 erasure.'
  },
  {
    title: '9. Completed: Matrix Zeroes Set In-Place with O(1) Auxiliary Space',
    phase: 'COMPLETED',
    grid: [
      [1, 0, 1],
      [0, 0, 0],
      [1, 0, 1]
    ],
    rowLabels: ['r0', 'r1', 'r2'],
    colLabels: ['c0', 'c1', 'c2'],
    activeCell: null,
    dependencyCells: [
      { row: 0, col: 1, color: 'accent' },
      { row: 1, col: 0, color: 'accent' },
      { row: 1, col: 1, color: 'accent' },
      { row: 1, col: 2, color: 'accent' },
      { row: 2, col: 1, color: 'accent' }
    ],
    metrics: [
      { label: 'Zeroed Row', value: 'Row 1', highlight: true },
      { label: 'Zeroed Column', value: 'Column 1', highlight: true },
      { label: 'Time Complexity', value: 'O(M x N)' },
      { label: 'Space Complexity', value: 'O(1) In-Place' }
    ],
    formula: 'Final Matrix: Row 1 and Col 1 successfully zeroed out in-place',
    action: 'Matrix transformation complete. Zero extra memory allocated.',
    explain: 'Entire row 1 and column 1 have been set to 0. The in-place marker algorithm achieves optimal O(M x N) time with strictly O(1) auxiliary memory.',
    intuition: 'Clever reuse of input memory delivers optimal space complexity.'
  }
];

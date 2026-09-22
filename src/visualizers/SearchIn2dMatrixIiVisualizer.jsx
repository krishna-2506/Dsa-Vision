// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Search in 2D Matrix II (Staircase Search)',
  category: 'Binary Search & 2D Matrix',
  difficulty: 'Medium',
  timeComplexity: 'O(M + N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Searches for a target in an M x N matrix where both rows and columns are independently sorted in ascending order. Utilizes the optimal top-right corner staircase traversal in O(M + N) time.'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Staircase Search Invariant',
  nodes: [
    { id: 'root', label: 'Staircase Search Strategy', children: ['top-right-anchor', 'row-elimination', 'col-elimination', 'linear-bound'] },
    { id: 'top-right-anchor', label: '1. Top-Right Corner Anchor', detail: 'At matrix[0][N-1], moving left strictly decreases values, moving down strictly increases values, functioning as a binary search tree root' },
    { id: 'row-elimination', label: '2. Row Elimination (matrix[r][c] < target)', detail: 'matrix[r][c] is the largest element remaining in row r. If it is smaller than target, row r cannot contain target; advance row++' },
    { id: 'col-elimination', label: '3. Column Elimination (matrix[r][c] > target)', detail: 'matrix[r][c] is smaller than all cells below it in col c. If it is larger than target, column c cannot contain target; advance col--' },
    { id: 'linear-bound', label: '4. Strictly O(M + N) Bound', detail: 'Each step either increments row or decrements col, guaranteeing termination in at most M + N steps with O(1) space' }
  ]
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
# Time Complexity: O(M + N) | Space Complexity: O(1)
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
// Time Complexity: O(M + N) | Space Complexity: O(1)
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
// Time Complexity: O(M + N) | Space Complexity: O(1)
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
    title: '1. Initialize at Top-Right Corner: [0, 3] = 11, Target = 14',
    phase: 'SETUP',
    grid: [
      [1, 4, 7, 11],
      [2, 5, 8, 12],
      [3, 6, 9, 16],
      [10, 13, 14, 17]
    ],
    rowLabels: ['r0', 'r1', 'r2', 'r3'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: { row: 0, col: 3 },
    dependencyCells: [
      { row: 0, col: 3, color: 'accent' }
    ],
    metrics: [
      { label: 'Current Pointer', value: '[Row 0, Col 3]', highlight: true },
      { label: 'Current Value', value: '11', highlight: true },
      { label: 'Target Value', value: '14' },
      { label: 'Matrix Dimensions', value: '4 x 4' }
    ],
    formula: 'Start at row = 0, col = n - 1 (Top-Right Decision Anchor)',
    action: 'Place search pointer at (0, 3) with value 11; target = 14',
    explain: 'Starting at the top-right corner provides an unambiguous two-way branching: moving LEFT strictly decreases values (row sorted ascending), while moving DOWN strictly increases values (col sorted ascending).',
    intuition: 'Top-right corner transforms the 2D matrix into a Binary Search Tree where left is smaller and down is greater.'
  },
  {
    title: '2. Step 1: matrix[0][3] = 11 < 14 -> Eliminate Row 0 -> Move DOWN to [1, 3]',
    phase: 'ROW_ELIMINATION',
    grid: [
      [1, 4, 7, 11],
      [2, 5, 8, 12],
      [3, 6, 9, 16],
      [10, 13, 14, 17]
    ],
    rowLabels: ['r0', 'r1', 'r2', 'r3'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: { row: 1, col: 3 },
    dependencyCells: [
      { row: 0, col: 0, color: 'muted' },
      { row: 0, col: 1, color: 'muted' },
      { row: 0, col: 2, color: 'muted' },
      { row: 0, col: 3, color: 'muted' },
      { row: 1, col: 3, color: 'accent' }
    ],
    metrics: [
      { label: 'Comparison', value: '11 < 14 (Too Small)', highlight: true },
      { label: 'Action', value: 'Eliminate Row 0, row++' },
      { label: 'New Pointer', value: '[1, 3] (val 12)' },
      { label: 'Eliminated Rows', value: 'Row 0' }
    ],
    formula: 'matrix[0][3] < target (11 < 14) ==> row = 0 + 1 = 1',
    action: '11 is the largest element in row 0; eliminate entire row 0 and step down',
    explain: 'Since row 0 is sorted in ascending order, 11 is the largest value in row 0. Because 11 < 14, no element in row 0 can possibly equal 14. We safely discard row 0 and advance down to row 1.',
    intuition: 'Pruning an entire row in a single comparison.'
  },
  {
    title: '3. Step 2: matrix[1][3] = 12 < 14 -> Eliminate Row 1 -> Move DOWN to [2, 3]',
    phase: 'ROW_ELIMINATION',
    grid: [
      [1, 4, 7, 11],
      [2, 5, 8, 12],
      [3, 6, 9, 16],
      [10, 13, 14, 17]
    ],
    rowLabels: ['r0', 'r1', 'r2', 'r3'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: { row: 2, col: 3 },
    dependencyCells: [
      { row: 0, col: 0, color: 'muted' },
      { row: 0, col: 1, color: 'muted' },
      { row: 0, col: 2, color: 'muted' },
      { row: 0, col: 3, color: 'muted' },
      { row: 1, col: 0, color: 'muted' },
      { row: 1, col: 1, color: 'muted' },
      { row: 1, col: 2, color: 'muted' },
      { row: 1, col: 3, color: 'muted' },
      { row: 2, col: 3, color: 'accent' }
    ],
    metrics: [
      { label: 'Comparison', value: '12 < 14 (Too Small)', highlight: true },
      { label: 'Action', value: 'Eliminate Row 1, row++' },
      { label: 'New Pointer', value: '[2, 3] (val 16)' },
      { label: 'Eliminated Rows', value: 'Rows 0, 1' }
    ],
    formula: 'matrix[1][3] < target (12 < 14) ==> row = 1 + 1 = 2',
    action: '12 is largest in row 1; eliminate row 1 and step down to [2, 3]',
    explain: 'At matrix[1][3], value 12 < 14. 12 is the maximum in row 1. Entire row 1 cannot contain target 14. We discard row 1 and advance row to 2.',
    intuition: 'Another entire row eliminated in O(1).'
  },
  {
    title: '4. Step 3: matrix[2][3] = 16 > 14 -> Eliminate Column 3 -> Move LEFT to [2, 2]',
    phase: 'COL_ELIMINATION',
    grid: [
      [1, 4, 7, 11],
      [2, 5, 8, 12],
      [3, 6, 9, 16],
      [10, 13, 14, 17]
    ],
    rowLabels: ['r0', 'r1', 'r2', 'r3'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: { row: 2, col: 2 },
    dependencyCells: [
      { row: 0, col: 0, color: 'muted' },
      { row: 0, col: 1, color: 'muted' },
      { row: 0, col: 2, color: 'muted' },
      { row: 0, col: 3, color: 'muted' },
      { row: 1, col: 0, color: 'muted' },
      { row: 1, col: 1, color: 'muted' },
      { row: 1, col: 2, color: 'muted' },
      { row: 1, col: 3, color: 'muted' },
      { row: 2, col: 3, color: 'muted' },
      { row: 3, col: 3, color: 'muted' },
      { row: 2, col: 2, color: 'accent' }
    ],
    metrics: [
      { label: 'Comparison', value: '16 > 14 (Too Large)', highlight: true },
      { label: 'Action', value: 'Eliminate Column 3, col--' },
      { label: 'New Pointer', value: '[2, 2] (val 9)' },
      { label: 'Eliminated Columns', value: 'Column 3' }
    ],
    formula: 'matrix[2][3] > target (16 > 14) ==> col = 3 - 1 = 2',
    action: '16 is strictly greater than 14; all cells below 16 in col 3 are >= 16; eliminate col 3',
    explain: 'At matrix[2][3], value 16 is greater than target 14. Since columns are sorted top-to-bottom, matrix[3][3] = 17 >= 16 > 14. Column 3 cannot contain 14. We eliminate column 3 and move left to col 2.',
    intuition: 'Branching left when value overshoots target.'
  },
  {
    title: '5. Step 4: matrix[2][2] = 9 < 14 -> Eliminate Row 2 -> Move DOWN to [3, 2]',
    phase: 'ROW_ELIMINATION',
    grid: [
      [1, 4, 7, 11],
      [2, 5, 8, 12],
      [3, 6, 9, 16],
      [10, 13, 14, 17]
    ],
    rowLabels: ['r0', 'r1', 'r2', 'r3'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: { row: 3, col: 2 },
    dependencyCells: [
      { row: 0, col: 0, color: 'muted' },
      { row: 0, col: 1, color: 'muted' },
      { row: 0, col: 2, color: 'muted' },
      { row: 0, col: 3, color: 'muted' },
      { row: 1, col: 0, color: 'muted' },
      { row: 1, col: 1, color: 'muted' },
      { row: 1, col: 2, color: 'muted' },
      { row: 1, col: 3, color: 'muted' },
      { row: 2, col: 0, color: 'muted' },
      { row: 2, col: 1, color: 'muted' },
      { row: 2, col: 2, color: 'muted' },
      { row: 2, col: 3, color: 'muted' },
      { row: 3, col: 3, color: 'muted' },
      { row: 3, col: 2, color: 'accent' }
    ],
    metrics: [
      { label: 'Comparison', value: '9 < 14 (Too Small)', highlight: true },
      { label: 'Action', value: 'Eliminate Row 2, row++' },
      { label: 'New Pointer', value: '[3, 2] (val 14)' },
      { label: 'Eliminated Rows', value: 'Rows 0, 1, 2' }
    ],
    formula: 'matrix[2][2] < target (9 < 14) ==> row = 2 + 1 = 3',
    action: '9 is the largest remaining in row 2 (col 3 already pruned); discard row 2',
    explain: 'With column 3 already eliminated, matrix[2][2] = 9 is the largest remaining candidate in row 2. Because 9 < 14, the rest of row 2 is strictly < 9. Discard row 2 and move down to row 3.',
    intuition: 'Search space is squeezed into the bottom row.'
  },
  {
    title: '6. Step 5: matrix[3][2] = 14 == Target! MATCH LOCATED!',
    phase: 'MATCH_FOUND',
    grid: [
      [1, 4, 7, 11],
      [2, 5, 8, 12],
      [3, 6, 9, 16],
      [10, 13, 14, 17]
    ],
    rowLabels: ['r0', 'r1', 'r2', 'r3'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: { row: 3, col: 2 },
    dependencyCells: [
      { row: 3, col: 2, color: 'accent' }
    ],
    metrics: [
      { label: 'Current Cell', value: 'matrix[3][2]', highlight: true },
      { label: 'Cell Value', value: '14', highlight: true },
      { label: 'Target', value: '14' },
      { label: 'Match Status', value: 'EXACT MATCH!', highlight: true }
    ],
    formula: 'matrix[3][2] == 14 == target ==> return TRUE',
    action: 'matrix[3][2] matches target 14 exactly! Terminate and return true',
    explain: 'At cell (3, 2), matrix[3][2] equals 14. Target found after exactly 5 moves in a 16-element matrix!',
    intuition: 'Optimal staircase search found target in 5 cell visits.'
  },
  {
    title: '7. Traversal Path Confirmation: (0,3) -> (1,3) -> (2,3) -> (2,2) -> (3,2)',
    phase: 'PATH_TRACE',
    grid: [
      [1, 4, 7, 11],
      [2, 5, 8, 12],
      [3, 6, 9, 16],
      [10, 13, 14, 17]
    ],
    rowLabels: ['r0', 'r1', 'r2', 'r3'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: { row: 3, col: 2 },
    dependencyCells: [
      { row: 0, col: 3, color: 'accent' },
      { row: 1, col: 3, color: 'accent' },
      { row: 2, col: 3, color: 'accent' },
      { row: 2, col: 2, color: 'accent' },
      { row: 3, col: 2, color: 'accent' }
    ],
    metrics: [
      { label: 'Start Cell', value: '[0, 3] (val 11)' },
      { label: 'Steps Taken', value: '5 total moves', highlight: true },
      { label: 'Path Traversed', value: 'Down -> Down -> Left -> Down' },
      { label: 'Result', value: 'TRUE' }
    ],
    formula: 'Path: (0,3) [11] -> (1,3) [12] -> (2,3) [16] -> (2,2) [9] -> (3,2) [14]',
    action: 'Staircase path visualization illustrates the precise L-shaped elimination route',
    explain: 'Notice the descending staircase trajectory. Each move definitively ruled out either an entire remaining row or column. No backtracking was ever needed.',
    intuition: 'Each decision strictly eliminates one dimension of the remaining subgrid.'
  },
  {
    title: '8. Complexity Analysis & Invariant Guarantee: O(M + N) Time, O(1) Space',
    phase: 'COMPLETED',
    grid: [
      [1, 4, 7, 11],
      [2, 5, 8, 12],
      [3, 6, 9, 16],
      [10, 13, 14, 17]
    ],
    rowLabels: ['r0', 'r1', 'r2', 'r3'],
    colLabels: ['c0', 'c1', 'c2', 'c3'],
    activeCell: { row: 3, col: 2 },
    dependencyCells: [
      { row: 3, col: 2, color: 'accent' }
    ],
    metrics: [
      { label: 'Time Complexity', value: 'O(M + N)', highlight: true },
      { label: 'Space Complexity', value: 'O(1) Auxiliary', highlight: true },
      { label: 'Max Possible Steps', value: 'M + N = 4 + 4 = 8' },
      { label: 'Actual Steps Used', value: '5 moves' }
    ],
    formula: 'Time Complexity = O(M + N) | Space Complexity = O(1)',
    action: 'Algorithm successfully finishes in O(M + N) time with zero extra memory',
    explain: 'Because row only increases (at most M times) and col only decreases (at most N times), the loop runs at most M + N iterations. This is asymptotically optimal for independently sorted 2D matrices where values across rows are not globally contiguous.',
    intuition: 'Staircase traversal provides the gold-standard linear bound for 2D matrix search.'
  }
];

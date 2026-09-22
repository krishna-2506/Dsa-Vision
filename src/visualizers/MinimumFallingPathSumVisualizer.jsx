// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Minimum Falling Path Sum (DP-12)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N²) Time',
  spaceComplexity: 'O(N) Space-Optimized',
  description: 'Finds the minimum sum of any falling path through an N × N matrix. A path starts at any element in the first row and advances to the row directly below, diagonally left, or diagonally right: dp[i][j] = matrix[i][j] + min(up, leftDiag, rightDiag).'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Minimum Falling Path Sum',
  nodes: [
    { id: 'root', label: 'Falling Path Minimizer', children: ['boundary-start', 'three-way-min', 'base-scan'] },
    { id: 'boundary-start', label: '1. Multi-Apex Initialization', detail: 'dp[0][j] = matrix[0][j] (Every cell in row 0 can serve as a starting point)' },
    { id: 'three-way-min', label: '2. Three-Neighbor Choice', children: ['left-diag', 'up-move', 'right-diag'] },
    { id: 'left-diag', label: 'Diagonally Left', detail: 'j > 0 ? prev[j-1] : ∞' },
    { id: 'up-move', label: 'Directly Above', detail: 'prev[j]' },
    { id: 'right-diag', label: 'Diagonally Right', detail: 'j < N-1 ? prev[j+1] : ∞' },
    { id: 'base-scan', label: '3. Bottom Row Minimum', detail: 'Answer is min(dp[N-1][j]) across all columns in the terminal row.' }
  ]
};

export const solutions = {
  cpp: `// C++ Minimum Falling Path Sum (Space-Optimized)
// Time: O(N * N) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int n = matrix.size();
        vector<int> prev = matrix[0];

        for (int i = 1; i < n; i++) {
            vector<int> cur(n, 0);
            for (int j = 0; j < n; j++) {
                int up = prev[j];
                int leftDiag = (j > 0) ? prev[j - 1] : 1e9;
                int rightDiag = (j < n - 1) ? prev[j + 1] : 1e9;

                cur[j] = matrix[i][j] + min({up, leftDiag, rightDiag});
            }
            prev = cur;
        }

        return *min_element(prev.begin(), prev.end());
    }
};`,
  python: `# Python 3 Minimum Falling Path Sum
# Time: O(N * N) | Space: O(N)
class Solution:
    def minFallingPathSum(self, matrix: list[list[int]]) -> int:
        n = len(matrix)
        prev = list(matrix[0])

        for i in range(1, n):
            cur = [0] * n
            for j in range(n):
                up = prev[j]
                left_diag = prev[j - 1] if j > 0 else float('inf')
                right_diag = prev[j + 1] if j < n - 1 else float('inf')
                cur[j] = matrix[i][j] + min(up, left_diag, right_diag)
            prev = cur

        return min(prev)`,
  java: `// Java Minimum Falling Path Sum
// Time: O(N * N) | Space: O(N)
class Solution {
    public int minFallingPathSum(int[][] matrix) {
        int n = matrix.length;
        int[] prev = matrix[0].clone();

        for (int i = 1; i < n; i++) {
            int[] cur = new int[n];
            for (int j = 0; j < n; j++) {
                int up = prev[j];
                int leftDiag = (j > 0) ? prev[j - 1] : (int) 1e9;
                int rightDiag = (j < n - 1) ? prev[j + 1] : (int) 1e9;

                cur[j] = matrix[i][j] + Math.min(up, Math.min(leftDiag, rightDiag));
            }
            prev = cur;
        }

        int minSum = prev[0];
        for (int v : prev) minSum = Math.min(minSum, v);
        return minSum;
    }
}`,
  javascript: `// JavaScript Minimum Falling Path Sum
// Time: O(N * N) | Space: O(N)
var minFallingPathSum = function(matrix) {
    const n = matrix.length;
    let prev = [...matrix[0]];

    for (let i = 1; i < n; i++) {
        const cur = new Array(n).fill(0);
        for (let j = 0; j < n; j++) {
            const up = prev[j];
            const leftDiag = j > 0 ? prev[j - 1] : Infinity;
            const rightDiag = j < n - 1 ? prev[j + 1] : Infinity;
            cur[j] = matrix[i][j] + Math.min(up, leftDiag, rightDiag);
        }
        prev = cur;
    }

    return Math.min(...prev);
};`
};

export const steps = [
  {
    phase: 'SETUP',
    grid: [
      [2, 1, 3],
      [6, 5, 4],
      [7, 8, 9]
    ],
    rowLabels: ['Row 0 (Starts)', 'Row 1', 'Row 2 (Exits)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2'],
    activeCell: { r: 0, c: 1 },
    formula: 'Row 0 serves as base path origins: [2, 1, 3]',
    action: 'Initialize 3 × 3 matrix: start at any element on row 0.',
    explain: 'dp[i][j] stores the minimum path sum reaching cell (i, j). Any of the 3 elements on row 0 can initiate a falling path. From (i, j), valid moves to the next row are (i+1, j-1), (i+1, j), and (i+1, j+1).',
    intuition: 'Row 0 values define base costs.',
    metrics: [
      { label: 'Matrix Size', value: '3 × 3' },
      { label: 'Smallest Start', value: 1 },
      { label: 'Row 0 Costs', value: '[2, 1, 3]' }
    ]
  },
  {
    phase: 'ROW_1_COL_0',
    grid: [
      [2, 1, 3],
      [7, 5, 4],
      [7, 8, 9]
    ],
    rowLabels: ['Row 0 (Starts)', 'Row 1', 'Row 2 (Exits)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2'],
    activeCell: { r: 1, c: 0 },
    dependencyCells: [{ r: 0, c: 0, label: 'up=2' }, { r: 0, c: 1, label: 'right=1' }],
    formula: 'dp[1][0] = matrix[1][0] + min(up:2, right:1) = 6 + 1 = 7',
    action: 'Evaluate [1, 0]: cost 6 + min(up: 2, right: 1) = 7.',
    explain: 'Cell [1, 0] has value 6. Left diagonal is out-of-bounds. Reaching it from top [0, 0] costs 6 + 2 = 8. Reaching it from right diagonal [0, 1] costs 6 + 1 = 7. Minimum choice is 7.',
    intuition: 'Diagonally descending from the smaller adjacent origin.',
    metrics: [
      { label: 'Node Val', value: 6 },
      { label: 'Chosen Parent', value: 'col 1 (val 1)' },
      { label: 'dp[1][0]', value: 7, highlight: true }
    ]
  },
  {
    phase: 'ROW_1_COL_1',
    grid: [
      [2, 1, 3],
      [7, 6, 4],
      [7, 8, 9]
    ],
    rowLabels: ['Row 0 (Starts)', 'Row 1', 'Row 2 (Exits)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2'],
    activeCell: { r: 1, c: 1 },
    dependencyCells: [
      { r: 0, c: 0, label: 'left=2' },
      { r: 0, c: 1, label: 'up=1' },
      { r: 0, c: 2, label: 'right=3' }
    ],
    formula: 'dp[1][1] = matrix[1][1] + min(left:2, up:1, right:3) = 5 + 1 = 6',
    action: 'Evaluate center cell [1, 1]: cost 5 + min(2, 1, 3) = 6.',
    explain: 'Cell [1, 1] (val 5) has 3 valid parent cells in row 0: [0, 0] (2), [0, 1] (1), and [0, 2] (3). Minimum parent is [0, 1] with cost 1. Total path sum = 5 + 1 = 6.',
    intuition: 'Vertical drop from 1 minimizes cost.',
    metrics: [
      { label: 'Node Val', value: 5 },
      { label: 'Three Options', value: '2, 1, 3' },
      { label: 'dp[1][1]', value: 6, highlight: true }
    ]
  },
  {
    phase: 'ROW_1_COL_2',
    grid: [
      [2, 1, 3],
      [7, 6, 5],
      [7, 8, 9]
    ],
    rowLabels: ['Row 0 (Starts)', 'Row 1', 'Row 2 (Exits)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2'],
    activeCell: { r: 1, c: 2 },
    dependencyCells: [{ r: 0, c: 1, label: 'left=1' }, { r: 0, c: 2, label: 'up=3' }],
    formula: 'dp[1][2] = matrix[1][2] + min(left:1, up:3) = 4 + 1 = 5',
    action: 'Evaluate [1, 2]: cost 4 + min(left: 1, up: 3) = 5. Row 1 complete: [7, 6, 5].',
    explain: 'Cell [1, 2] (val 4) takes left diagonal parent [0, 1] (1) over direct top [0, 2] (3). Total path sum = 4 + 1 = 5.',
    intuition: 'Row 1 completely evaluated.',
    metrics: [
      { label: 'Node Val', value: 4 },
      { label: 'dp[1][2]', value: 5 },
      { label: 'Row 1 DP', value: '[7, 6, 5]' }
    ]
  },
  {
    phase: 'ROW_2_COL_0',
    grid: [
      [2, 1, 3],
      [7, 6, 5],
      [13, 8, 9]
    ],
    rowLabels: ['Row 0 (Starts)', 'Row 1', 'Row 2 (Exits)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2'],
    activeCell: { r: 2, c: 0 },
    dependencyCells: [{ r: 1, c: 0, label: 'up=7' }, { r: 1, c: 1, label: 'right=6' }],
    formula: 'dp[2][0] = matrix[2][0] + min(up:7, right:6) = 7 + 6 = 13',
    action: 'Evaluate target row cell [2, 0]: 7 + min(7, 6) = 13.',
    explain: 'Node (2, 0) has value 7. Parent options in row 1 are [1, 0] (7) and [1, 1] (6). Minimum is 6. Total = 7 + 6 = 13.',
    intuition: 'Entering exit row at column 0.',
    metrics: [
      { label: 'Node Val', value: 7 },
      { label: 'Chosen Parent', value: 'col 1 (val 6)' },
      { label: 'dp[2][0]', value: 13 }
    ]
  },
  {
    phase: 'ROW_2_COL_1',
    grid: [
      [2, 1, 3],
      [7, 6, 5],
      [13, 13, 9]
    ],
    rowLabels: ['Row 0 (Starts)', 'Row 1', 'Row 2 (Exits)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2'],
    activeCell: { r: 2, c: 1 },
    dependencyCells: [
      { r: 1, c: 0, label: 'left=7' },
      { r: 1, c: 1, label: 'up=6' },
      { r: 1, c: 2, label: 'right=5' }
    ],
    formula: 'dp[2][1] = matrix[2][1] + min(7, 6, 5) = 8 + 5 = 13',
    action: 'Evaluate center exit cell [2, 1]: 8 + min(7, 6, 5) = 13.',
    explain: 'Node (2, 1) has value 8. Parents in row 1 are 7, 6, and 5. The minimum parent is [1, 2] with cost 5. Total = 8 + 5 = 13.',
    intuition: 'Diagonally descending from [1, 2].',
    metrics: [
      { label: 'Node Val', value: 8 },
      { label: 'Min Parent', value: 5 },
      { label: 'dp[2][1]', value: 13 }
    ]
  },
  {
    phase: 'ROW_2_COL_2',
    grid: [
      [2, 1, 3],
      [7, 6, 5],
      [13, 13, 14]
    ],
    rowLabels: ['Row 0 (Starts)', 'Row 1', 'Row 2 (Exits)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2'],
    activeCell: { r: 2, c: 2 },
    dependencyCells: [{ r: 1, c: 1, label: 'left=6' }, { r: 1, c: 2, label: 'up=5' }],
    formula: 'dp[2][2] = matrix[2][2] + min(left:6, up:5) = 9 + 5 = 14',
    action: 'Complete exit row at [2, 2]: 9 + min(6, 5) = 14.',
    explain: 'Node (2, 2) has value 9. Left parent is 6 and top parent is 5. Minimum is 5. Total = 9 + 5 = 14. Terminal row is [13, 13, 14].',
    intuition: 'All exit cells calculated.',
    metrics: [
      { label: 'Node Val', value: 9 },
      { label: 'Exit Row', value: '[13, 13, 14]' }
    ]
  },
  {
    phase: 'SCAN_TERMINAL_MIN',
    grid: [
      [2, 1, 3],
      [7, 6, 5],
      [13, 13, 14]
    ],
    rowLabels: ['Row 0 (Starts)', 'Row 1', 'Row 2 (Exits)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2'],
    activeCell: { r: 2, c: 0 },
    dependencyCells: [{ r: 2, c: 1, label: 'min=13' }],
    formula: 'Min Falling Path = min(dp[2][0], dp[2][1], dp[2][2]) = min(13, 13, 14) = 13',
    action: 'Scan exit row to select global minimum falling path sum.',
    explain: 'Exit row values are 13, 13, and 14. The minimum is 13! Two optimal falling paths achieve this score:\n1. 1 (col 1) ➔ 6 (col 1) ➔ 7 (col 0) = 1 + 5 + 7 = 13\n2. 1 (col 1) ➔ 4 (col 2) ➔ 8 (col 1) = 1 + 4 + 8 = 13.',
    intuition: 'Both optimal paths originate from cell (0, 1).',
    metrics: [
      { label: 'Min Falling Sum', value: 13, highlight: true },
      { label: 'Optimal Paths', value: '2 paths' }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [2, 1, 3],
      [7, 6, 5],
      [13, 13, 14]
    ],
    rowLabels: ['Row 0 (Starts)', 'Row 1', 'Row 2 (Exits)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2'],
    activeCell: { r: 2, c: 0 },
    formula: 'Output: 13 | O(N²) Time, O(N) Space',
    action: 'Algorithm complete! Minimum falling path sum is 13.',
    explain: 'Using rolling 1D array prev[j], the solution executes in O(N²) time while requiring only O(N) auxiliary memory.',
    intuition: 'Optimal 2D grid path finding.',
    metrics: [
      { label: 'Matrix', value: '3 × 3' },
      { label: 'Min Path Sum', value: 13, highlight: true },
      { label: 'Space Complexity', value: 'O(N)' }
    ]
  }
];

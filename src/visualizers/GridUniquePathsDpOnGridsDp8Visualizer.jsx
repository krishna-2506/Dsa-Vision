// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Grid Unique Paths (DP-8)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(M × N) Time',
  spaceComplexity: 'O(N) Space-Optimized',
  description: 'Calculates the total number of unique paths to travel from the top-left cell (0, 0) to the bottom-right cell (M - 1, N - 1) moving only Down or Right at each step: dp[i][j] = dp[i-1][j] (from Top) + dp[i][j-1] (from Left).'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Grid Unique Paths (DP-8)',
  nodes: [
    { id: 'root', label: 'Grid Path Counter', children: ['base-edges', 'recurrence-sum', 'combinatorial-closed-form'] },
    { id: 'base-edges', label: '1. Boundary Invariants', detail: 'dp[0][j] = 1 (only right moves) | dp[i][0] = 1 (only down moves)' },
    { id: 'recurrence-sum', label: '2. Directional Aggregation', children: ['from-top', 'from-left'] },
    { id: 'from-top', label: 'From Top (Down Move)', detail: 'dp[i-1][j] (Paths entering cell from above)' },
    { id: 'from-left', label: 'From Left (Right Move)', detail: 'dp[i][j-1] (Paths entering cell from the left)' },
    { id: 'combinatorial-closed-form', label: '3. Closed Form Combinatorics', detail: 'Total paths equal C(M + N - 2, M - 1) = C(Down + Right, Down).' }
  ]
};

export const solutions = {
  cpp: `// C++ Grid Unique Paths (DP on Grids)
// Time: O(M * N) | Space: O(N)
#include <vector>
using namespace std;

class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> prev(n, 1);

        for (int i = 1; i < m; i++) {
            vector<int> cur(n, 1);
            for (int j = 1; j < n; j++) {
                cur[j] = cur[j - 1] + prev[j];
            }
            prev = cur;
        }

        return prev[n - 1];
    }
};`,
  python: `# Python 3 Grid Unique Paths (DP on Grids)
# Time: O(M * N) | Space: O(N)
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        prev = [1] * n

        for i in range(1, m):
            cur = [1] * n
            for j in range(1, n):
                cur[j] = cur[j - 1] + prev[j]
            prev = cur

        return prev[n - 1]`,
  java: `// Java Grid Unique Paths (DP on Grids)
// Time: O(M * N) | Space: O(N)
import java.util.Arrays;

class Solution {
    public int uniquePaths(int m, int n) {
        int[] prev = new int[n];
        Arrays.fill(prev, 1);

        for (int i = 1; i < m; i++) {
            int[] cur = new int[n];
            cur[0] = 1;
            for (int j = 1; j < n; j++) {
                cur[j] = cur[j - 1] + prev[j];
            }
            prev = cur;
        }

        return prev[n - 1];
    }
}`,
  javascript: `// JavaScript Grid Unique Paths (DP on Grids)
// Time: O(M * N) | Space: O(N)
var uniquePaths = function(m, n) {
    let prev = new Array(n).fill(1);

    for (let i = 1; i < m; i++) {
        const cur = new Array(n).fill(1);
        for (let j = 1; j < n; j++) {
            cur[j] = cur[j - 1] + prev[j];
        }
        prev = cur;
    }

    return prev[n - 1];
};`
};

export const steps = [
  {
    phase: 'SETUP',
    grid: [
      [1, 1, 1, 1],
      [1, 0, 0, 0],
      [1, 0, 0, 0]
    ],
    rowLabels: ['Row 0 (Start)', 'Row 1', 'Row 2 (Target)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCell: { r: 0, c: 0 },
    formula: 'Base Boundaries: dp[0][j] = 1 (All Right), dp[i][0] = 1 (All Down)',
    action: 'Initialize 3 × 4 grid with base boundaries for Start (0, 0) to Target (2, 3).',
    explain: 'dp[i][j] represents the number of unique paths to reach cell (i, j). Any cell on row 0 can only be reached by walking exclusively Right (1 path). Any cell on col 0 can only be reached by walking exclusively Down (1 path).',
    intuition: 'Straight-line boundaries provide the base paths.',
    metrics: [
      { label: 'Grid Size', value: '3 × 4' },
      { label: 'Start', value: '(0, 0)' },
      { label: 'Target', value: '(2, 3)' }
    ]
  },
  {
    phase: 'CELL_1_1',
    grid: [
      [1, 1, 1, 1],
      [1, 2, 0, 0],
      [1, 0, 0, 0]
    ],
    rowLabels: ['Row 0 (Start)', 'Row 1', 'Row 2 (Target)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCell: { r: 1, c: 1 },
    dependencyCells: [{ r: 0, c: 1, label: 'top=1' }, { r: 1, c: 0, label: 'left=1' }],
    formula: 'dp[1][1] = top (1) + left (1) = 2 unique paths',
    action: 'Evaluate cell [1, 1]: reachable from above [0, 1] or from left [1, 0].',
    explain: 'Paths to reach (1, 1):\n1. Down ➔ Right\n2. Right ➔ Down\nTotal paths = dp[0][1] + dp[1][0] = 1 + 1 = 2.',
    intuition: 'Summing paths entering from both allowed directions (Top + Left).',
    metrics: [
      { label: 'Top Paths', value: 1 },
      { label: 'Left Paths', value: 1 },
      { label: 'dp[1][1]', value: 2, highlight: true }
    ]
  },
  {
    phase: 'CELL_1_2',
    grid: [
      [1, 1, 1, 1],
      [1, 2, 3, 0],
      [1, 0, 0, 0]
    ],
    rowLabels: ['Row 0 (Start)', 'Row 1', 'Row 2 (Target)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCell: { r: 1, c: 2 },
    dependencyCells: [{ r: 0, c: 2, label: 'top=1' }, { r: 1, c: 1, label: 'left=2' }],
    formula: 'dp[1][2] = top (1) + left (2) = 3 unique paths',
    action: 'Evaluate cell [1, 2]: top (1) + left (2) = 3 paths.',
    explain: 'Entering from above takes the 1 straight right path. Entering from the left inherits the 2 paths to (1, 1) and steps Right. Total = 1 + 2 = 3.',
    intuition: 'Pascal-like triangle summation propagating across rows.',
    metrics: [
      { label: 'Top Paths', value: 1 },
      { label: 'Left Paths', value: 2 },
      { label: 'dp[1][2]', value: 3, highlight: true }
    ]
  },
  {
    phase: 'CELL_1_3_COMPLETE_ROW_1',
    grid: [
      [1, 1, 1, 1],
      [1, 2, 3, 4],
      [1, 0, 0, 0]
    ],
    rowLabels: ['Row 0 (Start)', 'Row 1', 'Row 2 (Target)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCell: { r: 1, c: 3 },
    dependencyCells: [{ r: 0, c: 3, label: 'top=1' }, { r: 1, c: 2, label: 'left=3' }],
    formula: 'dp[1][3] = top (1) + left (3) = 4 unique paths',
    action: 'Complete row 1 at cell [1, 3]: top (1) + left (3) = 4 paths.',
    explain: 'Total paths to reach rightmost column on row 1 is 1 + 3 = 4. Row 1 is now fully calculated: [1, 2, 3, 4].',
    intuition: 'Row 1 complete.',
    metrics: [
      { label: 'Row 1 End', value: 4 },
      { label: 'Row 1', value: '[1, 2, 3, 4]' }
    ]
  },
  {
    phase: 'CELL_2_1',
    grid: [
      [1, 1, 1, 1],
      [1, 2, 3, 4],
      [1, 3, 0, 0]
    ],
    rowLabels: ['Row 0 (Start)', 'Row 1', 'Row 2 (Target)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCell: { r: 2, c: 1 },
    dependencyCells: [{ r: 1, c: 1, label: 'top=2' }, { r: 2, c: 0, label: 'left=1' }],
    formula: 'dp[2][1] = top (2) + left (1) = 3 unique paths',
    action: 'Evaluate cell [2, 1] on target row: top (2) + left (1) = 3 paths.',
    explain: 'Symmetric to [1, 2]: paths arriving from [1, 1] (2 paths) plus straight-down path from [2, 0] (1 path) = 3 paths.',
    intuition: 'Row 2 begins accumulating paths.',
    metrics: [
      { label: 'Top Paths', value: 2 },
      { label: 'Left Paths', value: 1 },
      { label: 'dp[2][1]', value: 3 }
    ]
  },
  {
    phase: 'CELL_2_2',
    grid: [
      [1, 1, 1, 1],
      [1, 2, 3, 4],
      [1, 3, 6, 0]
    ],
    rowLabels: ['Row 0 (Start)', 'Row 1', 'Row 2 (Target)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCell: { r: 2, c: 2 },
    dependencyCells: [{ r: 1, c: 2, label: 'top=3' }, { r: 2, c: 1, label: 'left=3' }],
    formula: 'dp[2][2] = top (3) + left (3) = 6 unique paths',
    action: 'Evaluate center cell [2, 2]: 3 + 3 = 6 unique paths!',
    explain: 'At cell [2, 2], 3 paths come from the top neighbor [1, 2] and 3 paths come from the left neighbor [2, 1]. Total paths = 6.',
    intuition: 'Equal convergence from horizontal and vertical directions.',
    metrics: [
      { label: 'Top Paths', value: 3 },
      { label: 'Left Paths', value: 3 },
      { label: 'dp[2][2]', value: 6, highlight: true }
    ]
  },
  {
    phase: 'CELL_2_3_TERMINAL',
    grid: [
      [1, 1, 1, 1],
      [1, 2, 3, 4],
      [1, 3, 6, 10]
    ],
    rowLabels: ['Row 0 (Start)', 'Row 1', 'Row 2 (Target)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCell: { r: 2, c: 3 },
    dependencyCells: [{ r: 1, c: 3, label: 'top=4' }, { r: 2, c: 2, label: 'left=6' }],
    formula: 'dp[2][3] = top (4) + left (6) = 10 unique paths!',
    action: 'Evaluate bottom-right target cell [2, 3]: Total unique paths = 10!',
    explain: 'Terminal cell [2, 3] receives 4 paths from top neighbor [1, 3] and 6 paths from left neighbor [2, 2]. Total unique paths from (0, 0) to (2, 3) is 4 + 6 = 10!',
    intuition: 'Destination reached! Complete path aggregate is 10.',
    metrics: [
      { label: 'Target Cell', value: '[2, 3]' },
      { label: 'Total Paths', value: 10, highlight: true }
    ]
  },
  {
    phase: 'COMBINATORIAL_PROOF',
    grid: [
      [1, 1, 1, 1],
      [1, 2, 3, 4],
      [1, 3, 6, 10]
    ],
    rowLabels: ['Row 0 (Start)', 'Row 1', 'Row 2 (Target)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCell: { r: 2, c: 3 },
    formula: 'C(Down + Right, Down) = C(2 + 3, 2) = C(5, 2) = 10',
    action: 'Verify result via combinatorial closed form.',
    explain: 'Every valid path must execute exactly 2 Down moves and 3 Right moves (total 5 steps). The number of unique arrangements is C(5, 2) = (5 × 4) / (2 × 1) = 10. The DP table matches the mathematical truth perfectly.',
    intuition: 'DP grid exactly computes combinations.',
    metrics: [
      { label: 'Total Steps', value: '2 Down + 3 Right = 5' },
      { label: 'Combinations', value: 'C(5, 2) = 10' }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [1, 1, 1, 1],
      [1, 2, 3, 4],
      [1, 3, 6, 10]
    ],
    rowLabels: ['Row 0 (Start)', 'Row 1', 'Row 2 (Target)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCell: { r: 2, c: 3 },
    formula: 'Output: 10 | O(M × N) Time, O(N) Space',
    action: 'Algorithm complete! 10 unique paths.',
    explain: 'Using a single 1D rolling array prev[j] += cur[j-1], the space is optimized to O(N) auxiliary memory with O(M × N) runtime.',
    intuition: 'Optimal 2D grid DP.',
    metrics: [
      { label: 'Grid', value: '3 × 4' },
      { label: 'Unique Paths', value: 10, highlight: true },
      { label: 'Space Complexity', value: 'O(N)' }
    ]
  }
];

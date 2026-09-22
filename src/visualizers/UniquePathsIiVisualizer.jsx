// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Unique Paths II (Grid with Obstacles)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(M × N) Time',
  spaceComplexity: 'O(N) Space-Optimized',
  description: 'Calculates the number of unique paths from top-left to bottom-right in an M × N grid containing obstacles. Cells with obstacles cannot be traversed and immediately set dp[i][j] = 0.'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Unique Paths II (Obstacle Grid)',
  nodes: [
    { id: 'root', label: 'Obstacle Grid Paths', children: ['obstacle-rule', 'transition-rule', 'space-compression'] },
    { id: 'obstacle-rule', label: '1. Obstacle Blocking Invariant', detail: 'If grid[i][j] == 1 (Obstacle), dp[i][j] = 0. No path can enter or exit this cell.' },
    { id: 'transition-rule', label: '2. Free Cell Transition', children: ['from-top', 'from-left'] },
    { id: 'from-top', label: 'Top Neighbor', detail: 'dp[i-1][j] (0 if obstacle above)' },
    { id: 'from-left', label: 'Left Neighbor', detail: 'dp[i][j-1] (0 if obstacle to left)' },
    { id: 'space-compression', label: '3. 1D Array Accumulator', detail: 'If obstacle, set dp[j] = 0; else dp[j] += dp[j-1]. Runs in O(N) memory.' }
  ]
};

export const solutions = {
  cpp: `// C++ Unique Paths II (Obstacle Grid)
// Time: O(M * N) | Space: O(N)
#include <vector>
using namespace std;

class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size();
        int n = obstacleGrid[0].size();
        vector<int> dp(n, 0);

        dp[0] = (obstacleGrid[0][0] == 0) ? 1 : 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (obstacleGrid[i][j] == 1) {
                    dp[j] = 0; // Obstacle blocks all paths
                } else if (j > 0) {
                    dp[j] += dp[j - 1];
                }
            }
        }

        return dp[n - 1];
    }
};`,
  python: `# Python 3 Unique Paths II (Obstacle Grid)
# Time: O(M * N) | Space: O(N)
class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: list[list[int]]) -> int:
        m, n = len(obstacleGrid), len(obstacleGrid[0])
        dp = [0] * n
        dp[0] = 1 if obstacleGrid[0][0] == 0 else 0

        for i in range(m):
            for j in range(n):
                if obstacleGrid[i][j] == 1:
                    dp[j] = 0
                elif j > 0:
                    dp[j] += dp[j - 1]

        return dp[n - 1]`,
  java: `// Java Unique Paths II (Obstacle Grid)
// Time: O(M * N) | Space: O(N)
class Solution {
    public int uniquePathsWithObstacles(int[][] obstacleGrid) {
        int m = obstacleGrid.length;
        int n = obstacleGrid[0].length;
        int[] dp = new int[n];

        dp[0] = obstacleGrid[0][0] == 0 ? 1 : 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (obstacleGrid[i][j] == 1) {
                    dp[j] = 0;
                } else if (j > 0) {
                    dp[j] += dp[j - 1];
                }
            }
        }

        return dp[n - 1];
    }
}`,
  javascript: `// JavaScript Unique Paths II (Obstacle Grid)
// Time: O(M * N) | Space: O(N)
var uniquePathsWithObstacles = function(obstacleGrid) {
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    const dp = new Array(n).fill(0);

    dp[0] = obstacleGrid[0][0] === 0 ? 1 : 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (obstacleGrid[i][j] === 1) {
                dp[j] = 0;
            } else if (j > 0) {
                dp[j] += dp[j - 1];
            }
        }
    }

    return dp[n - 1];
};`
};

export const steps = [
  {
    phase: 'SETUP',
    grid: [
      [1, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],
    rowLabels: ['Row 0 (Start)', 'Row 1 (Obstacle)', 'Row 2 (Target)'],
    colLabels: ['Col 0', 'Col 1 (Obstacle)', 'Col 2'],
    activeCell: { r: 0, c: 0 },
    formula: 'Obstacle at [1, 1]: dp[1][1] = 0 | Start: dp[0][0] = 1',
    action: 'Initialize 3 × 3 grid with obstacle located at center cell [1, 1].',
    explain: 'dp[i][j] stores the number of valid paths reaching (i, j). Any cell containing an obstacle blocks all traversal and has dp value strictly 0.',
    intuition: 'Obstacles zero out incoming flow from both directions.',
    metrics: [
      { label: 'Grid Size', value: '3 × 3' },
      { label: 'Obstacle Pos', value: '[1, 1]' },
      { label: 'Start Paths', value: 1 }
    ]
  },
  {
    phase: 'ROW_0_BASE',
    grid: [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0]
    ],
    rowLabels: ['Row 0 (Start)', 'Row 1 (Obstacle)', 'Row 2 (Target)'],
    colLabels: ['Col 0', 'Col 1 (Obstacle)', 'Col 2'],
    activeCell: { r: 0, c: 2 },
    dependencyCells: [{ r: 0, c: 1, label: 'left=1' }],
    formula: 'Row 0 has no obstacles => all cells have 1 path (moving right)',
    action: 'Process row 0: cells [0, 1] and [0, 2] each receive 1 path from the left.',
    explain: 'With no obstacles on row 0, moving right from (0, 0) provides exactly 1 path to each cell along the top boundary.',
    intuition: 'Clear top edge provides unobstructed horizontal path.',
    metrics: [
      { label: 'Row 0 State', value: '[1, 1, 1]' }
    ]
  },
  {
    phase: 'ROW_1_COL_0',
    grid: [
      [1, 1, 1],
      [1, 0, 0],
      [0, 0, 0]
    ],
    rowLabels: ['Row 0 (Start)', 'Row 1 (Obstacle)', 'Row 2 (Target)'],
    colLabels: ['Col 0', 'Col 1 (Obstacle)', 'Col 2'],
    activeCell: { r: 1, c: 0 },
    dependencyCells: [{ r: 0, c: 0, label: 'top=1' }],
    formula: 'dp[1][0] = dp[0][0] = 1 (Moving straight down)',
    action: 'Evaluate [1, 0]: receives 1 path moving Down from [0, 0].',
    explain: 'Cell [1, 0] is unblocked and receives the 1 path coming from [0, 0].',
    intuition: 'Left edge path remains open.',
    metrics: [
      { label: 'dp[1][0]', value: 1 }
    ]
  },
  {
    phase: 'ROW_1_COL_1_OBSTACLE',
    grid: [
      [1, 1, 1],
      [1, 0, 0],
      [0, 0, 0]
    ],
    rowLabels: ['Row 0 (Start)', 'Row 1 (Obstacle)', 'Row 2 (Target)'],
    colLabels: ['Col 0', 'Col 1 (Obstacle)', 'Col 2'],
    activeCell: { r: 1, c: 1 },
    dependencyCells: [{ r: 0, c: 1, label: 'blocked' }, { r: 1, c: 0, label: 'blocked' }],
    formula: 'obstacleGrid[1][1] == 1 => dp[1][1] = 0 (BLOCKED)',
    action: 'Encounter obstacle at cell [1, 1]! Value is clamped to 0.',
    explain: 'Because cell [1, 1] is an obstacle, no path may enter it. dp[1][1] is explicitly set to 0. It cannot forward paths to the right or down.',
    intuition: 'Obstacles act as path sinks where path count drops to zero.',
    metrics: [
      { label: 'Obstacle Cell', value: '[1, 1]' },
      { label: 'dp[1][1]', value: 0, highlight: true }
    ]
  },
  {
    phase: 'ROW_1_COL_2',
    grid: [
      [1, 1, 1],
      [1, 0, 1],
      [0, 0, 0]
    ],
    rowLabels: ['Row 0 (Start)', 'Row 1 (Obstacle)', 'Row 2 (Target)'],
    colLabels: ['Col 0', 'Col 1 (Obstacle)', 'Col 2'],
    activeCell: { r: 1, c: 2 },
    dependencyCells: [{ r: 0, c: 2, label: 'top=1' }, { r: 1, c: 1, label: 'left=0' }],
    formula: 'dp[1][2] = top (1) + left (0) = 1 path',
    action: 'Evaluate cell [1, 2]: top (1) + left (0) = 1 path.',
    explain: 'At cell [1, 2], the left neighbor [1, 1] is an obstacle contributing 0 paths. The only way to reach [1, 2] is from above ([0, 2]), giving 1 + 0 = 1 path.',
    intuition: 'Left path severed by obstacle; only vertical path survives.',
    metrics: [
      { label: 'Top Contribution', value: 1 },
      { label: 'Left Contribution', value: 0 },
      { label: 'dp[1][2]', value: 1 }
    ]
  },
  {
    phase: 'ROW_2_COL_0_1',
    grid: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 0]
    ],
    rowLabels: ['Row 0 (Start)', 'Row 1 (Obstacle)', 'Row 2 (Target)'],
    colLabels: ['Col 0', 'Col 1 (Obstacle)', 'Col 2'],
    activeCell: { r: 2, c: 1 },
    dependencyCells: [{ r: 1, c: 1, label: 'top=0' }, { r: 2, c: 0, label: 'left=1' }],
    formula: 'dp[2][1] = top (0) + left (1) = 1 path',
    action: 'Evaluate [2, 0] = 1, then evaluate [2, 1]: top (0) + left (1) = 1 path.',
    explain: 'At cell [2, 1], the top neighbor [1, 1] is blocked (0 paths). However, 1 path arrives from the left neighbor [2, 0]. Total paths = 0 + 1 = 1.',
    intuition: 'Paths circumvent the obstacle by traveling around its lower edge.',
    metrics: [
      { label: 'dp[2][0]', value: 1 },
      { label: 'dp[2][1]', value: 1 }
    ]
  },
  {
    phase: 'ROW_2_COL_2_TERMINAL',
    grid: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 2]
    ],
    rowLabels: ['Row 0 (Start)', 'Row 1 (Obstacle)', 'Row 2 (Target)'],
    colLabels: ['Col 0', 'Col 1 (Obstacle)', 'Col 2'],
    activeCell: { r: 2, c: 2 },
    dependencyCells: [{ r: 1, c: 2, label: 'top=1' }, { r: 2, c: 1, label: 'left=1' }],
    formula: 'dp[2][2] = top (1) + left (1) = 2 unique paths',
    action: 'Evaluate target destination [2, 2]: Total unique paths = 2!',
    explain: 'Target cell [2, 2] receives 1 path from above [1, 2] and 1 path from the left [2, 1]. Total paths to exit = 1 + 1 = 2 (down from 6 in an obstacle-free grid).',
    intuition: 'Target reached! Exactly 2 surviving paths navigate around the obstacle.',
    metrics: [
      { label: 'Destination', value: '[2, 2]' },
      { label: 'Surviving Paths', value: 2, highlight: true }
    ]
  },
  {
    phase: 'PATH_DETECTION',
    grid: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 2]
    ],
    rowLabels: ['Row 0 (Start)', 'Row 1 (Obstacle)', 'Row 2 (Target)'],
    colLabels: ['Col 0', 'Col 1 (Obstacle)', 'Col 2'],
    activeCell: { r: 2, c: 2 },
    formula: 'Path 1: (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2) | Path 2: (0,0) -> (1,0) -> (2,0) -> (2,1) -> (2,2)',
    action: 'Enumerate the two surviving valid paths.',
    explain: '1. Upper perimeter: Right ➔ Right ➔ Down ➔ Down\n2. Lower perimeter: Down ➔ Down ➔ Right ➔ Right\nAll 4 other paths that would have traversed (1, 1) are eliminated.',
    intuition: 'Clear geometric detour around the central obstacle.',
    metrics: [
      { label: 'Path 1', value: 'Top Perimeter' },
      { label: 'Path 2', value: 'Bottom Perimeter' }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 2]
    ],
    rowLabels: ['Row 0 (Start)', 'Row 1 (Obstacle)', 'Row 2 (Target)'],
    colLabels: ['Col 0', 'Col 1 (Obstacle)', 'Col 2'],
    activeCell: { r: 2, c: 2 },
    formula: 'Output: 2 | O(M × N) Time, O(N) Space',
    action: 'Algorithm complete! 2 unique paths.',
    explain: 'Runs in O(M × N) time using O(N) space. If start (0, 0) or exit (M-1, N-1) is an obstacle, algorithm terminates with 0 in O(1).',
    intuition: 'Robust obstacle grid dynamic programming.',
    metrics: [
      { label: 'Obstacle Pos', value: '(1, 1)' },
      { label: 'Unique Paths', value: 2, highlight: true },
      { label: 'Space Complexity', value: 'O(N)' }
    ]
  }
];

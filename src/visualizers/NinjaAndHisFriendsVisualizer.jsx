// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Ninja and His Friends (Cherry Pickup II / DP-13)',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(R × C² × 9) Time',
  spaceComplexity: 'O(C²) Space-Optimized',
  description: 'Two ninjas (Alice and Bob) start at top-left (0, 0) and top-right (0, C-1) of an R × C grid and move down row-by-row together. Each can move down-left, down, or down-right. If both visit the same cell, chocolates are collected once. 3D DP computes maximum chocolates collected.'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Ninja and His Friends (DP-13)',
  nodes: [
    { id: 'root', label: 'Simultaneous 3D DP', children: ['state-def', 'collision-rule', 'joint-transitions', 'space-compression'] },
    { id: 'state-def', label: '1. State Definition', detail: 'dp[i][j1][j2]: Max chocolates from row i to bottom when Alice is at col j1 and Bob is at col j2.' },
    { id: 'collision-rule', label: '2. Collision Handling', detail: 'If j1 == j2: collect grid[i][j1] once. If j1 != j2: collect grid[i][j1] + grid[i][j2].' },
    { id: 'joint-transitions', label: '3. 9 Simultaneous Moves', detail: 'Each ninja has 3 choices (-1, 0, +1), producing 3 × 3 = 9 candidate pairs for row i+1.' },
    { id: 'space-compression', label: '4. Space Optimization', detail: 'Row i depends only on row i+1, reducing O(R × C²) memory to a single O(C²) table.' }
  ]
};

export const solutions = {
  cpp: `// C++ Ninja and His Friends (Cherry Pickup II)
// Time: O(R * C^2) | Space: O(C^2) Space-Optimized
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maximumChocolates(int r, int c, vector<vector<int>>& grid) {
        vector<vector<int>> front(c, vector<int>(c, -1e9));

        // Base case: Last row (r - 1)
        for (int j1 = 0; j1 < c; j1++) {
            for (int j2 = 0; j2 < c; j2++) {
                front[j1][j2] = (j1 == j2) ? grid[r - 1][j1] : grid[r - 1][j1] + grid[r - 1][j2];
            }
        }

        // Bottom-up from row r - 2 up to 0
        for (int i = r - 2; i >= 0; i--) {
            vector<vector<int>> cur(c, vector<int>(c, -1e9));
            for (int j1 = 0; j1 < c; j1++) {
                for (int j2 = 0; j2 < c; j2++) {
                    int maxi = -1e9;
                    for (int dj1 = -1; dj1 <= 1; dj1++) {
                        for (int dj2 = -1; dj2 <= 1; dj2++) {
                            int nj1 = j1 + dj1, nj2 = j2 + dj2;
                            if (nj1 >= 0 && nj1 < c && nj2 >= 0 && nj2 < c) {
                                int val = (j1 == j2) ? grid[i][j1] : grid[i][j1] + grid[i][j2];
                                maxi = max(maxi, val + front[nj1][nj2]);
                            }
                        }
                    }
                    cur[j1][j2] = maxi;
                }
            }
            front = cur;
        }

        return front[0][c - 1];
    }
};`,
  python: `# Python 3 Ninja and His Friends (Cherry Pickup II)
# Time: O(R * C^2) | Space: O(C^2)
class Solution:
    def maximumChocolates(self, r: int, c: int, grid: list[list[int]]) -> int:
        front = [[-float('inf')] * c for _ in range(c)]

        # Base case: Last row
        for j1 in range(c):
            for j2 in range(c):
                front[j1][j2] = grid[r - 1][j1] if j1 == j2 else grid[r - 1][j1] + grid[r - 1][j2]

        # Upward tabulation
        for i in range(r - 2, -1, -1):
            cur = [[-float('inf')] * c for _ in range(c)]
            for j1 in range(c):
                for j2 in range(c):
                    maxi = -float('inf')
                    for dj1 in (-1, 0, 1):
                        for dj2 in (-1, 0, 1):
                            nj1, nj2 = j1 + dj1, j2 + dj2
                            if 0 <= nj1 < c and 0 <= nj2 < c:
                                val = grid[i][j1] if j1 == j2 else grid[i][j1] + grid[i][j2]
                                maxi = max(maxi, val + front[nj1][nj2])
                    cur[j1][j2] = maxi
            front = cur

        return front[0][c - 1]`,
  java: `// Java Ninja and His Friends (Cherry Pickup II)
// Time: O(R * C^2) | Space: O(C^2)
class Solution {
    public int maximumChocolates(int r, int c, int[][] grid) {
        int[][] front = new int[c][c];

        // Base case: Last row
        for (int j1 = 0; j1 < c; j1++) {
            for (int j2 = 0; j2 < c; j2++) {
                front[j1][j2] = (j1 == j2) ? grid[r - 1][j1] : grid[r - 1][j1] + grid[r - 1][j2];
            }
        }

        for (int i = r - 2; i >= 0; i--) {
            int[][] cur = new int[c][c];
            for (int j1 = 0; j1 < c; j1++) {
                for (int j2 = 0; j2 < c; j2++) {
                    int maxi = (int)-1e9;
                    for (int dj1 = -1; dj1 <= 1; dj1++) {
                        for (int dj2 = -1; dj2 <= 1; dj2++) {
                            int nj1 = j1 + dj1, nj2 = j2 + dj2;
                            if (nj1 >= 0 && nj1 < c && nj2 >= 0 && nj2 < c) {
                                int val = (j1 == j2) ? grid[i][j1] : grid[i][j1] + grid[i][j2];
                                maxi = Math.max(maxi, val + front[nj1][nj2]);
                            }
                        }
                    }
                    cur[j1][j2] = maxi;
                }
            }
            front = cur;
        }

        return front[0][c - 1];
    }
}`,
  javascript: `// JavaScript Ninja and His Friends (Cherry Pickup II)
// Time: O(R * C^2) | Space: O(C^2)
var maximumChocolates = function(r, c, grid) {
    let front = Array.from({ length: c }, () => new Array(c).fill(-Infinity));

    // Base case: row r - 1
    for (let j1 = 0; j1 < c; j1++) {
        for (let j2 = 0; j2 < c; j2++) {
            front[j1][j2] = (j1 === j2) ? grid[r - 1][j1] : grid[r - 1][j1] + grid[r - 1][j2];
        }
    }

    for (let i = r - 2; i >= 0; i--) {
        const cur = Array.from({ length: c }, () => new Array(c).fill(-Infinity));
        for (let j1 = 0; j1 < c; j1++) {
            for (let j2 = 0; j2 < c; j2++) {
                let maxi = -Infinity;
                for (let dj1 = -1; dj1 <= 1; dj1++) {
                    for (let dj2 = -1; dj2 <= 1; dj2++) {
                        const nj1 = j1 + dj1, nj2 = j2 + dj2;
                        if (nj1 >= 0 && nj1 < c && nj2 >= 0 && nj2 < c) {
                            const val = (j1 === j2) ? grid[i][j1] : grid[i][j1] + grid[i][j2];
                            maxi = Math.max(maxi, val + front[nj1][nj2]);
                        }
                    }
                }
                cur[j1][j2] = maxi;
            }
        }
        front = cur;
    }

    return front[0][c - 1];
};`
};

const rowLabels = ['Alice Col 0', 'Alice Col 1', 'Alice Col 2'];
const colLabels = ['Bob Col 0', 'Bob Col 1', 'Bob Col 2'];

export const steps = [
  {
    title: '1. Problem Setup & State Modeling',
    phase: 'INITIAL',
    grid: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    rowLabels,
    colLabels,
    activeCell: null,
    metrics: [
      { label: 'Grid Size', value: '3 × 3' },
      { label: 'Alice Start', value: '(0, 0)' },
      { label: 'Bob Start', value: '(0, 2)' },
      { label: 'Total Transitions', value: '9 per cell' }
    ],
    formula: 'dp[i][j1][j2] = chocolates(i, j1, j2) + max(dp[i+1][j1+dj1][j2+dj2])',
    action: 'Model 3D state: table cells represent (Alice Col j1, Bob Col j2) for current row i',
    explain: 'Alice begins at (0, 0) and Bob at (0, 2). Since both descend one row per step, their row coordinate i is always synchronized. The 2D table captures all (j1, j2) column pairs at row i.',
    intuition: 'Synchronized row descent lets us model 3D state (i, j1, j2) using a 2D matrix per row.'
  },
  {
    title: '2. Base Case: Bottom Row 2 Collisions (j1 == j2)',
    phase: 'BASE_CASES',
    grid: [
      [5, null, null],
      [null, 6, null],
      [null, null, 5]
    ],
    rowLabels,
    colLabels,
    activeCell: { row: 1, col: 1 },
    dependencyCells: [{ row: 0, col: 0 }, { row: 2, col: 2 }],
    metrics: [
      { label: 'Row i', value: '2 (Bottom)' },
      { label: 'Diagonal (j1==j2)', value: 'Single Collect' },
      { label: 'dp[1][1]', value: '6' }
    ],
    formula: 'if (j1 == j2) dp[2][j1][j2] = grid[2][j1]',
    action: 'Fill main diagonal where Alice and Bob land on the identical bottom-row cell',
    explain: 'At row 2, grid values are [5, 6, 5]. When both land on col 1 (j1=1, j2=1), they collect 6 chocolates once, not 6+6=12. Similarly dp[2][0][0] = 5 and dp[2][2][2] = 5.',
    intuition: 'Collision prevention ensures candies are never double-counted when both ninjas visit the same cell.'
  },
  {
    title: '3. Base Case: Bottom Row 2 Disjoint Cells (j1 != j2)',
    phase: 'BASE_CASES',
    grid: [
      [5, 11, 10],
      [11, 6, 11],
      [10, 11, 5]
    ],
    rowLabels,
    colLabels,
    activeCell: { row: 0, col: 1 },
    dependencyCells: [{ row: 1, col: 0 }, { row: 0, col: 2 }, { row: 2, col: 0 }, { row: 1, col: 2 }, { row: 2, col: 1 }],
    metrics: [
      { label: 'Row i', value: '2 (Bottom)' },
      { label: 'dp[0][1]', value: '5 + 6 = 11' },
      { label: 'dp[0][2]', value: '5 + 5 = 10' }
    ],
    formula: 'if (j1 != j2) dp[2][j1][j2] = grid[2][j1] + grid[2][j2]',
    action: 'Fill off-diagonal cells with the sum of chocolates from both distinct columns',
    explain: 'When Alice is at col 0 (5) and Bob at col 1 (6), chocolates = 5 + 6 = 11. When Alice is at col 0 (5) and Bob at col 2 (5), chocolates = 10. The bottom row is now fully initialized.',
    intuition: 'Disjoint paths maximize collection since both ninjas harvest distinct cells.'
  },
  {
    title: '4. Row 1 Transition: Cell (0, 2) [Alice Col 0, Bob Col 2]',
    phase: 'COMPUTE',
    grid: [
      [null, null, 16],
      [null, null, null],
      [null, null, null]
    ],
    rowLabels,
    colLabels,
    activeCell: { row: 0, col: 2 },
    metrics: [
      { label: 'Row i', value: '1' },
      { label: 'grid[1]', value: '[3, 4, 2]' },
      { label: 'Local Choc', value: '3 + 2 = 5' },
      { label: 'Max Next Row', value: '11' }
    ],
    formula: 'dp[1][0][2] = (3 + 2) + max(dp[2][0..1][1..2]) = 5 + 11 = 16',
    action: 'Evaluate 4 boundary-valid next moves from Alice col 0 and Bob col 2 into row 2',
    explain: 'At row 1, grid is [3, 4, 2]. Alice at col 0 collects 3; Bob at col 2 collects 2 (total 5). Alice can move to cols {0, 1}; Bob can move to cols {1, 2}. Row 2 candidate pairs {(0,1):11, (0,2):10, (1,1):6, (1,2):11} yield max 11. Result = 5 + 11 = 16.',
    intuition: 'Only valid bounded column transitions are evaluated out of the 9 joint directions.'
  },
  {
    title: '5. Row 1 Transition: Cell (1, 1) [Collision at Col 1]',
    phase: 'COMPUTE',
    grid: [
      [null, null, 16],
      [null, 15, null],
      [null, null, null]
    ],
    rowLabels,
    colLabels,
    activeCell: { row: 1, col: 1 },
    metrics: [
      { label: 'Row i', value: '1' },
      { label: 'Collision', value: 'j1 = j2 = 1' },
      { label: 'Local Choc', value: '4 (single)' },
      { label: 'dp[1][1]', value: '4 + 11 = 15' }
    ],
    formula: 'dp[1][1][1] = 4 + max(all 9 next pairs) = 4 + 11 = 15',
    action: 'Calculate state where both ninjas intersect at column 1 in row 1',
    explain: 'Both ninjas land on grid[1][1] = 4, so they collect 4 once. From (1, 1), all 9 moves into row 2 are in bounds. The maximum chocolate reachable in row 2 is 11. Total = 4 + 11 = 15.',
    intuition: 'Even when ninjas intersect at row 1, they can diverge at row 2 to reach optimal cells.'
  },
  {
    title: '6. Row 1 Complete Tabulation',
    phase: 'COMPUTE',
    grid: [
      [14, 18, 16],
      [18, 15, 17],
      [16, 17, 13]
    ],
    rowLabels,
    colLabels,
    activeCell: { row: 0, col: 1 },
    metrics: [
      { label: 'Row i', value: '1 Complete' },
      { label: 'Peak at (0, 1)', value: '18' },
      { label: 'Peak at (1, 0)', value: '18' }
    ],
    formula: 'cur[j1][j2] = local_val + max_{dj1,dj2} front[j1+dj1][j2+dj2]',
    action: 'Complete all 9 state combinations for row 1; maximum entry is 18',
    explain: 'States (0, 1) and (1, 0) achieve 18 chocolates: local 3+4=7 plus 11 from the next row. This entire 3×3 matrix will now serve as front[][] for row 0.',
    intuition: 'Space optimization compresses the previous row table, avoiding full 3D storage.'
  },
  {
    title: '7. Row 0 Starting State: Target Cell (0, 2)',
    phase: 'COMPUTE',
    grid: [
      [null, null, 21],
      [null, null, null],
      [null, null, null]
    ],
    rowLabels,
    colLabels,
    activeCell: { row: 0, col: 2 },
    metrics: [
      { label: 'Row i', value: '0 (Top)' },
      { label: 'Alice Start', value: 'Col 0 (2)' },
      { label: 'Bob Start', value: 'Col 2 (1)' },
      { label: 'Local Choc', value: '2 + 1 = 3' }
    ],
    formula: 'dp[0][0][2] = (2 + 1) + max(dp[1][0..1][1..2]) = 3 + 18 = 21',
    action: 'Compute root starting coordinate where Alice is at (0, 0) and Bob at (0, 2)',
    explain: 'At row 0, grid is [2, 3, 1]. Alice collects grid[0][0]=2, Bob collects grid[0][2]=1 (sum 3). Alice can step to row 1 cols {0, 1}; Bob can step to cols {1, 2}. Among the 4 candidate transitions {(0,1):18, (0,2):16, (1,1):15, (1,2):17}, the optimal choice is (0, 1) with 18.',
    intuition: 'Alice moves to col 0 and Bob moves to col 1 in row 1 to capture maximum downstream chocolates.'
  },
  {
    title: '8. Backtracking the Joint Optimal Trajectory',
    phase: 'COMPUTE',
    grid: [
      [17, 20, 21],
      [20, 18, 19],
      [18, 19, 15]
    ],
    rowLabels,
    colLabels,
    activeCell: { row: 0, col: 2 },
    dependencyCells: [{ row: 0, col: 1 }, { row: 1, col: 2 }],
    metrics: [
      { label: 'Alice Trajectory', value: '(0,0) → (1,0) → (2,1)' },
      { label: 'Bob Trajectory', value: '(0,2) → (1,1) → (2,2)' },
      { label: 'Alice Total', value: '2 + 3 + 6 = 11' },
      { label: 'Bob Total', value: '1 + 4 + 5 = 10' }
    ],
    formula: 'Optimal Total = 11 (Alice) + 10 (Bob) = 21',
    action: 'Trace both ninjas through the 3x3 grid across all 3 rows',
    explain: 'Row 0: Alice at (0,0)[2], Bob at (0,2)[1] → 3 chocolates.\nRow 1: Alice at (1,0)[3], Bob at (1,1)[4] → 7 chocolates.\nRow 2: Alice at (2,1)[6], Bob at (2,2)[5] → 11 chocolates.\nSum: 3 + 7 + 11 = 21!',
    intuition: 'Both paths are completely disjoint, so no collision penalties occur.'
  },
  {
    title: '9. Final Optimal Solution: 21 Chocolates',
    phase: 'COMPLETED',
    grid: [
      [17, 20, 21],
      [20, 18, 19],
      [18, 19, 15]
    ],
    rowLabels,
    colLabels,
    activeCell: { row: 0, col: 2 },
    metrics: [
      { label: 'Max Chocolates', value: '21', highlight: true },
      { label: 'Time Complexity', value: 'O(R × C² × 9)' },
      { label: 'Space Complexity', value: 'O(C²)' },
      { label: 'Status', value: 'Optimal Found' }
    ],
    formula: 'Result = dp[0][0][C-1] = 21',
    action: 'Return answer at dp[0][0][C-1]',
    explain: '3D DP with space compression completes in O(R × C² × 9) time and O(C²) auxiliary space. The synchronized multi-agent search guarantees optimal collection without double counting.',
    intuition: '3D DP perfectly orchestrates multi-agent pathfinding when agents advance synchronously.'
  }
];

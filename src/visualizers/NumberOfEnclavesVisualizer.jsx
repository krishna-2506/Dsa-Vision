export const rendererType = 'dp-grid';

export const meta = {
  title: 'Number of Enclaves',
  category: 'Graphs',
  difficulty: 'Medium',
  timeComplexity: 'O(N * M)',
  spaceComplexity: 'O(N * M)',
  description: 'Counts the number of land cells (1) in a grid for which we cannot walk off any boundary of the grid in any number of 4-directional moves (LeetCode 1020).'
};

export const ideaMap = {
  title: 'Boundary-First Multi-Source BFS Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Boundary Inspection',
      detail: 'Identify all land cells (1s) lying directly on the 4 outer edges of the grid.'
    },
    {
      id: 'step2',
      label: 'Multi-Source Flood Fill',
      detail: 'Launch BFS/DFS from all boundary land cells to mark every cell that can reach an exit.'
    },
    {
      id: 'step3',
      label: 'Interior Enclave Scan',
      detail: 'Iterate across the grid; any remaining land cell not reached by the boundary flood is trapped.'
    },
    {
      id: 'step4',
      label: 'Aggregate Enclaves',
      detail: 'Count total trapped interior land cells and return the result.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Number of Enclaves (LeetCode 1020)
// Time Complexity: O(N * M) | Space Complexity: O(N * M)
#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int numEnclaves(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        vector<vector<int>> vis(n, vector<int>(m, 0));
        queue<pair<int, int>> q;

        // 1. Enqueue all boundary land cells
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (i == 0 || j == 0 || i == n - 1 || j == m - 1) {
                    if (grid[i][j] == 1) {
                        q.push({i, j});
                        vis[i][j] = 1;
                    }
                }
            }
        }

        // 2. BFS flood fill to mark all cells connected to boundaries
        int dRow[] = {-1, 0, 1, 0};
        int dCol[] = {0, 1, 0, -1};

        while (!q.empty()) {
            int r = q.front().first;
            int c = q.front().second;
            q.pop();

            for (int k = 0; k < 4; k++) {
                int nr = r + dRow[k], nc = c + dCol[k];
                if (nr >= 0 && nr < n && nc >= 0 && nc < m && !vis[nr][nc] && grid[nr][nc] == 1) {
                    vis[nr][nc] = 1;
                    q.push({nr, nc});
                }
            }
        }

        // 3. Count interior land cells that were never reached
        int enclaves = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 1 && !vis[i][j]) {
                    enclaves++;
                }
            }
        }
        return enclaves;
    }
};`,
  java: `// Java: Number of Enclaves (LeetCode 1020)
// Time Complexity: O(N * M) | Space Complexity: O(N * M)
import java.util.*;

class Solution {
    public int numEnclaves(int[][] grid) {
        int n = grid.length, m = grid[0].length;
        boolean[][] vis = new boolean[n][m];
        Queue<int[]> q = new LinkedList<>();

        // Add boundary land cells
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (i == 0 || j == 0 || i == n - 1 || j == m - 1) {
                    if (grid[i][j] == 1) {
                        q.offer(new int[]{i, j});
                        vis[i][j] = true;
                    }
                }
            }
        }

        int[] dRow = {-1, 0, 1, 0};
        int[] dCol = {0, 1, 0, -1};

        while (!q.isEmpty()) {
            int[] cell = q.poll();
            int r = cell[0], c = cell[1];

            for (int k = 0; k < 4; k++) {
                int nr = r + dRow[k], nc = c + dCol[k];
                if (nr >= 0 && nr < n && nc >= 0 && nc < m && !vis[nr][nc] && grid[nr][nc] == 1) {
                    vis[nr][nc] = true;
                    q.offer(new int[]{nr, nc});
                }
            }
        }

        int enclaves = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 1 && !vis[i][j]) {
                    enclaves++;
                }
            }
        }
        return enclaves;
    }
}`,
  python: `# Python: Number of Enclaves (LeetCode 1020)
# Time Complexity: O(N * M) | Space Complexity: O(N * M)
from collections import deque

class Solution:
    def numEnclaves(self, grid: list[list[int]]) -> int:
        n, m = len(grid), len(grid[0])
        vis = [[False] * m for _ in range(n)]
        q = deque()

        # Step 1: Enqueue all boundary 1s
        for i in range(n):
            for j in range(m):
                if i == 0 or j == 0 or i == n - 1 or j == m - 1:
                    if grid[i][j] == 1:
                        vis[i][j] = True
                        q.append((i, j))

        # Step 2: BFS flood fill
        d_row = [-1, 0, 1, 0]
        d_col = [0, 1, 0, -1]

        while q:
            r, c = q.popleft()
            for k in range(4):
                nr, nc = r + d_row[k], c + d_col[k]
                if 0 <= nr < n and 0 <= nc < m and not vis[nr][nc] and grid[nr][nc] == 1:
                    vis[nr][nc] = True
                    q.append((nr, nc))

        # Step 3: Count trapped interior 1s
        enclaves = 0
        for i in range(n):
            for j in range(m):
                if grid[i][j] == 1 and not vis[i][j]:
                    enclaves += 1

        return enclaves`,
  javascript: `// JavaScript: Number of Enclaves (LeetCode 1020)
// Time Complexity: O(N * M) | Space Complexity: O(N * M)
function numEnclaves(grid) {
    const n = grid.length, m = grid[0].length;
    const vis = Array.from({ length: n }, () => Array(m).fill(false));
    const queue = [];

    // Push boundary 1s
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (i === 0 || j === 0 || i === n - 1 || j === m - 1) {
                if (grid[i][j] === 1) {
                    vis[i][j] = true;
                    queue.push([i, j]);
                }
            }
        }
    }

    const dRow = [-1, 0, 1, 0];
    const dCol = [0, 1, 0, -1];

    while (queue.length > 0) {
        const [r, c] = queue.shift();
        for (let k = 0; k < 4; k++) {
            const nr = r + dRow[k], nc = c + dCol[k];
            if (nr >= 0 && nr < n && nc >= 0 && nc < m && !vis[nr][nc] && grid[nr][nc] === 1) {
                vis[nr][nc] = true;
                queue.push([nr, nc]);
            }
        }
    }

    let enclaves = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === 1 && !vis[i][j]) {
                enclaves++;
            }
        }
    }
    return enclaves;
}`
};

export const steps = [
  {
    phase: 'INITIALIZE',
    title: 'Initialize 4x4 Grid: Detect Boundary Land Cells',
    grid: [
      ['0', '0', '0', '0'],
      ['1', '0', '1', '0'],
      ['0', '1', '1', '0'],
      ['0', '0', '0', '0']
    ],
    rowLabels: ['R0', 'R1', 'R2', 'R3'],
    colLabels: ['C0', 'C1', 'C2', 'C3'],
    activeCell: { r: 1, c: 0 },
    metrics: [
      { label: 'Boundary 1s', value: '1 cell' },
      { label: 'Interior 1s', value: '3 cells' },
      { label: 'Enclaves', value: 'Pending' }
    ],
    variables: {
      boundaryLand: '[(1, 0)]',
      interiorLand: '[(1, 2), (2, 1), (2, 2)]',
      phase: 'Scan boundary rows (0, 3) and cols (0, 3)'
    },
    explain: 'Inspect all 4 boundaries of the 4x4 grid. Cell (1, 0) lies directly on the left perimeter with value 1. We seed our BFS queue with (1, 0).',
    intuition: 'Any land reachable from the boundary can escape off the board, disqualifying it from being an enclave.'
  },
  {
    phase: 'FLOOD_BOUNDARY',
    title: 'BFS Flood from Boundary Land (1, 0)',
    grid: [
      ['0', '0', '0', '0'],
      ['EXIT', '0', '1', '0'],
      ['0', '1', '1', '0'],
      ['0', '0', '0', '0']
    ],
    rowLabels: ['R0', 'R1', 'R2', 'R3'],
    colLabels: ['C0', 'C1', 'C2', 'C3'],
    activeCell: { r: 1, c: 0 },
    dependencyCells: [
      { r: 0, c: 0, label: 'water' },
      { r: 2, c: 0, label: 'water' },
      { r: 1, c: 1, label: 'water' }
    ],
    metrics: [
      { label: 'Boundary Connected', value: '1 cell' },
      { label: 'Queue Size', value: 0 },
      { label: 'Enclaves', value: 'Pending' }
    ],
    variables: {
      visitedBoundary: '[(1, 0)]',
      neighbors: '(0,0)=0, (2,0)=0, (1,1)=0',
      status: 'No adjacent land found; BFS ends'
    },
    explain: 'Pop (1, 0). Its orthogonal neighbors (0,0), (2,0), and (1,1) are all 0 (water). No further land connects to this boundary cell. Mark (1, 0) as EXIT-reachable.',
    intuition: 'Cells with value 0 act as impassable barriers, isolating the interior cluster.'
  },
  {
    phase: 'SCAN_INTERIOR',
    title: 'Scan Interior: Locate Trapped Enclave Cluster {(1,2), (2,1), (2,2)}',
    grid: [
      ['0', '0', '0', '0'],
      ['EXIT', '0', '🔒', '0'],
      ['0', '🔒', '🔒', '0'],
      ['0', '0', '0', '0']
    ],
    rowLabels: ['R0', 'R1', 'R2', 'R3'],
    colLabels: ['C0', 'C1', 'C2', 'C3'],
    activeCell: { r: 1, c: 2 },
    dependencyCells: [
      { r: 2, c: 1, label: 'enclave' },
      { r: 2, c: 2, label: 'enclave' }
    ],
    metrics: [
      { label: 'Trapped Cells', value: 3 },
      { label: 'Exit Cells', value: 1 },
      { label: 'Enclaves', value: 3 }
    ],
    variables: {
      enclavesFound: '[(1, 2), (2, 1), (2, 2)]',
      perimeterBarrier: 'Water (0) on all outer paths',
      status: 'Trapped cluster verified'
    },
    explain: 'Scan remaining cells where grid[r][c] == 1 and vis[r][c] is false. Cells (1,2), (2,1), and (2,2) were never reached by the boundary flood. All 3 are trapped enclaves!',
    intuition: 'Because boundary BFS never touched them, walking 4-directionally from any of these cells can never exit the grid.'
  },
  {
    phase: 'COMPLETE',
    title: 'Verification Complete: Total Enclaves = 3',
    grid: [
      ['0', '0', '0', '0'],
      ['EXIT', '0', '🔒', '0'],
      ['0', '🔒', '🔒', '0'],
      ['0', '0', '0', '0']
    ],
    rowLabels: ['R0', 'R1', 'R2', 'R3'],
    colLabels: ['C0', 'C1', 'C2', 'C3'],
    activeCell: null,
    metrics: [
      { label: 'Final Enclaves', value: 3 },
      { label: 'Boundary Land', value: 1 },
      { label: 'Total Land', value: 4 }
    ],
    variables: {
      totalEnclaves: 3,
      runtime: 'O(N * M)',
      space: 'O(N * M)',
      result: 3
    },
    explain: 'Out of 4 total land cells, exactly 1 connects to the grid boundary and 3 are completely landlocked enclaves. Return 3.',
    intuition: 'Boundary-first BFS inverted the problem efficiently: instead of finding if each cell can escape, we flood backwards from all possible exits in a single pass.'
  }
];

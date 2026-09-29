export const rendererType = 'dp-grid';

export const meta = {
  title: 'Number of Islands',
  category: 'Graphs',
  difficulty: 'Medium',
  timeComplexity: 'O(N * M)',
  spaceComplexity: 'O(N * M)',
  description: 'Given an m x n 2D binary grid representing a map of "1"s (land) and "0"s (water), count the number of islands formed by connecting adjacent lands horizontally or vertically (LeetCode 200).'
};

export const ideaMap = {
  title: 'Number of Islands DFS / BFS Flood Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Linear Grid Scan',
      detail: 'Iterate through every cell (r, c) in the N x M matrix.'
    },
    {
      id: 'step2',
      label: 'Land Discovery Trigger',
      detail: 'When encountering an unvisited land cell grid[r][c] == "1", increment island counter by 1.'
    },
    {
      id: 'step3',
      label: 'Flood Fill Sinking',
      detail: 'Invoke DFS or BFS to traverse all 4-directionally connected land cells, marking them visited ("X").'
    },
    {
      id: 'step4',
      label: 'Complete Scan & Return',
      detail: 'Resume outer grid scan; already sunk islands are skipped. Return final island counter.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Number of Islands (LeetCode 200)
// Time: O(N * M) | Space: O(N * M) recursion stack
#include <vector>
using namespace std;

class Solution {
private:
    void dfs(int r, int c, vector<vector<char>>& grid) {
        int n = grid.size(), m = grid[0].size();
        grid[r][c] = '0'; // sink land to avoid re-visiting
        int dRow[] = {-1, 0, 1, 0};
        int dCol[] = {0, 1, 0, -1};

        for (int i = 0; i < 4; i++) {
            int nr = r + dRow[i], nc = c + dCol[i];
            if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] == '1') {
                dfs(nr, nc, grid);
            }
        }
    }
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        int count = 0;
        int n = grid.size(), m = grid[0].size();

        for (int r = 0; r < n; r++) {
            for (int c = 0; c < m; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(r, c, grid);
                }
            }
        }
        return count;
    }
};`,
  java: `// Java: Number of Islands (LeetCode 200)
// Time: O(N * M) | Space: O(N * M)
class Solution {
    private void dfs(char[][] grid, int r, int c) {
        int n = grid.length, m = grid[0].length;
        if (r < 0 || c < 0 || r >= n || c >= m || grid[r][c] != '1') return;

        grid[r][c] = '0'; // mark visited
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }

    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        int count = 0;

        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c);
                }
            }
        }
        return count;
    }
}`,
  python: `# Python: Number of Islands (LeetCode 200)
# Time: O(N * M) | Space: O(N * M)
class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        if not grid:
            return 0
        rows, cols = len(grid), len(grid[0])
        count = 0

        def dfs(r: int, c: int) -> None:
            if 0 <= r < rows and 0 <= c < cols and grid[r][c] == '1':
                grid[r][c] = '0' # mark visited / sink island
                dfs(r + 1, c)
                dfs(r - 1, c)
                dfs(r, c + 1)
                dfs(r, c - 1)

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    count += 1
                    dfs(r, c)

        return count`,
  javascript: `// JavaScript: Number of Islands (LeetCode 200)
// Time: O(N * M) | Space: O(N * M)
function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;
    const rows = grid.length, cols = grid[0].length;
    let count = 0;

    function dfs(r, c) {
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== '1') return;
        grid[r][c] = '0';
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c);
            }
        }
    }
    return count;
}`
};

export const steps = [
  {
    phase: 'INITIALIZE',
    title: 'Initialize Matrix Scan: 4x4 Binary Grid',
    grid: [
      ['1', '1', '0', '0'],
      ['1', '1', '0', '0'],
      ['0', '0', '1', '0'],
      ['0', '0', '0', '1']
    ],
    rowLabels: ['R0', 'R1', 'R2', 'R3'],
    colLabels: ['C0', 'C1', 'C2', 'C3'],
    activeCell: { r: 0, c: 0 },
    metrics: [
      { label: 'Islands Found', value: 0 },
      { label: 'Unvisited Land', value: '6 cells' },
      { label: 'Scan Cell', value: '(0, 0)' }
    ],
    variables: {
      islandCount: 0,
      currentScan: '(0, 0)',
      status: 'Encountered land cell grid[0][0] == 1'
    },
    explain: 'Begin top-left scan of the 4x4 grid. At cell (0, 0), we find unvisited land "1". We increment our island count to 1 and launch DFS to flood-fill this connected land component.',
    intuition: 'Each fresh "1" encountered during linear raster scan seeds an unexplored connected component.'
  },
  {
    phase: 'FLOOD_ISLAND_1',
    title: 'Island #1 Discovered: DFS Flood-Fills Cluster {(0,0), (0,1), (1,0), (1,1)}',
    grid: [
      ['✓', '✓', '0', '0'],
      ['✓', '✓', '0', '0'],
      ['0', '0', '1', '0'],
      ['0', '0', '0', '1']
    ],
    rowLabels: ['R0', 'R1', 'R2', 'R3'],
    colLabels: ['C0', 'C1', 'C2', 'C3'],
    activeCell: { r: 0, c: 0 },
    dependencyCells: [
      { r: 0, c: 1, label: 'sink' },
      { r: 1, c: 0, label: 'sink' },
      { r: 1, c: 1, label: 'sink' }
    ],
    metrics: [
      { label: 'Islands Found', value: 1 },
      { label: 'Sunk In Island 1', value: '4 cells' },
      { label: 'Scan Cell', value: '(0, 0)' }
    ],
    variables: {
      islandCount: 1,
      floodedCells: '[(0,0), (0,1), (1,0), (1,1)]',
      status: 'Island 1 completely submerged'
    },
    explain: 'DFS sinks the 2x2 land block at the top-left by visiting (0,0), (0,1), (1,0), and (1,1). All 4 cells are marked visited (✓) so future scans skip them.',
    intuition: 'Flooding adjacent cells converts all nodes of the same connected component into visited markers.'
  },
  {
    phase: 'SCAN_TO_ISLAND_2',
    title: 'Linear Scan Advances: Encounter Island #2 at Cell (2, 2)',
    grid: [
      ['✓', '✓', '0', '0'],
      ['✓', '✓', '0', '0'],
      ['0', '0', '1', '0'],
      ['0', '0', '0', '1']
    ],
    rowLabels: ['R0', 'R1', 'R2', 'R3'],
    colLabels: ['C0', 'C1', 'C2', 'C3'],
    activeCell: { r: 2, c: 2 },
    dependencyCells: [],
    metrics: [
      { label: 'Islands Found', value: 1 },
      { label: 'Current Scan', value: '(2, 2)' },
      { label: 'Cell Value', value: '1 (New Island)' }
    ],
    variables: {
      islandCount: 1,
      currentScan: '(2, 2)',
      status: 'Discovered new land "1" at (2, 2)'
    },
    explain: 'The raster scan skips water cells and already-visited land until reaching (2, 2). Since grid[2][2] is "1", a second distinct island is detected.',
    intuition: 'Cells surrounded by water or grid boundaries form separate components.'
  },
  {
    phase: 'FLOOD_ISLAND_2',
    title: 'Island #2 Sunk: Isolated 1x1 Island at (2, 2)',
    grid: [
      ['✓', '✓', '0', '0'],
      ['✓', '✓', '0', '0'],
      ['0', '0', '✓', '0'],
      ['0', '0', '0', '1']
    ],
    rowLabels: ['R0', 'R1', 'R2', 'R3'],
    colLabels: ['C0', 'C1', 'C2', 'C3'],
    activeCell: { r: 2, c: 2 },
    dependencyCells: [],
    metrics: [
      { label: 'Islands Found', value: 2 },
      { label: 'Sunk In Island 2', value: '1 cell' },
      { label: 'Scan Cell', value: '(2, 2)' }
    ],
    variables: {
      islandCount: 2,
      floodedCells: '[(2, 2)]',
      status: 'Island 2 completely submerged'
    },
    explain: 'Increment island counter to 2. DFS checks neighbors: (1,2) is 0, (3,2) is 0, (2,1) is 0, (2,3) is 0. No adjacent land exists; cell (2, 2) is submerged.',
    intuition: 'A single cell with no orthogonal land neighbors is a valid island of size 1.'
  },
  {
    phase: 'SCAN_TO_ISLAND_3',
    title: 'Scan Advances: Encounter Island #3 at Cell (3, 3)',
    grid: [
      ['✓', '✓', '0', '0'],
      ['✓', '✓', '0', '0'],
      ['0', '0', '✓', '0'],
      ['0', '0', '0', '1']
    ],
    rowLabels: ['R0', 'R1', 'R2', 'R3'],
    colLabels: ['C0', 'C1', 'C2', 'C3'],
    activeCell: { r: 3, c: 3 },
    dependencyCells: [],
    metrics: [
      { label: 'Islands Found', value: 2 },
      { label: 'Current Scan', value: '(3, 3)' },
      { label: 'Cell Value', value: '1 (New Island)' }
    ],
    variables: {
      islandCount: 2,
      currentScan: '(3, 3)',
      status: 'Discovered new land "1" at bottom-right corner'
    },
    explain: 'The scan reaches the bottom-right corner (3, 3). We find unvisited land "1", indicating our 3rd distinct island component.',
    intuition: 'Diagonal adjacency does not count as connected land in 4-directional traversal.'
  },
  {
    phase: 'COMPLETE',
    title: 'Scan Complete: All Cells Processed, Total Islands = 3',
    grid: [
      ['✓', '✓', '0', '0'],
      ['✓', '✓', '0', '0'],
      ['0', '0', '✓', '0'],
      ['0', '0', '0', '✓']
    ],
    rowLabels: ['R0', 'R1', 'R2', 'R3'],
    colLabels: ['C0', 'C1', 'C2', 'C3'],
    activeCell: null,
    dependencyCells: [],
    metrics: [
      { label: 'Total Islands', value: 3 },
      { label: 'Cells Visited', value: '16 / 16' },
      { label: 'Runtime', value: 'O(N * M)' }
    ],
    variables: {
      totalIslands: 3,
      finalVerdict: '3 separate connected components found',
      status: 'COMPLETE'
    },
    explain: 'Entire 4x4 matrix scan is complete. Exactly 3 independent connected components were discovered and submerged. Return count = 3.',
    intuition: 'Every cell is visited at most a constant number of times, achieving linear O(N * M) time complexity.'
  }
];

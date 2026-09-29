export const rendererType = 'dp-grid';

export const meta = {
  title: 'Connected Components in a 2D Matrix',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(N * M)',
  spaceComplexity: 'O(N * M) queue & visited matrix',
  description: 'Explores connected component discovery on a 2D grid matrix. Demonstrates directional deltas (dRow, dCol) for 4-directional cell traversal (UP, RIGHT, DOWN, LEFT) to flood fill disconnected land clusters.'
};

export const ideaMap = {
  title: '2D Matrix Connected Components Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Double Loop Scan',
      detail: 'Iterate through every row r in 0..N-1 and col c in 0..M-1.'
    },
    {
      id: 'step2',
      label: 'Land Discovery Trigger',
      detail: 'If grid[r][c] == 1 and !vis[r][c], increment component count and trigger flood fill.'
    },
    {
      id: 'step3',
      label: '4-Way BFS Expansion',
      detail: 'Use directional offsets dRow = [-1, 0, 1, 0], dCol = [0, 1, 0, -1] to enqueue all adjacent valid land neighbors.'
    },
    {
      id: 'step4',
      label: 'Return Total Components',
      detail: 'Once every cell is scanned, the counter represents the exact number of disconnected land islands.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Connected Components in 2D Matrix (4-Way BFS)
// Time Complexity: O(N * M) | Space Complexity: O(N * M)
#include <vector>
#include <queue>
using namespace std;

void bfs(int row, int col, vector<vector<int>>& grid, vector<vector<int>>& vis) {
    int n = grid.size(), m = grid[0].size();
    vis[row][col] = 1;
    queue<pair<int, int>> q;
    q.push({row, col});
    
    int dRow[] = {-1, 0, 1, 0};
    int dCol[] = {0, 1, 0, -1};
    
    while (!q.empty()) {
        auto [r, c] = q.front();
        q.pop();
        
        for (int i = 0; i < 4; i++) {
            int nr = r + dRow[i];
            int nc = c + dCol[i];
            if (nr >= 0 && nr < n && nc >= 0 && nc < m &&
                grid[nr][nc] == 1 && !vis[nr][nc]) {
                vis[nr][nc] = 1;
                q.push({nr, nc});
            }
        }
    }
}

int countComponents(vector<vector<int>>& grid) {
    int n = grid.size(), m = grid[0].size();
    vector<vector<int>> vis(n, vector<int>(m, 0));
    int count = 0;
    
    for (int r = 0; r < n; r++) {
        for (int c = 0; c < m; c++) {
            if (grid[r][c] == 1 && !vis[r][c]) {
                count++;
                bfs(r, c, grid, vis);
            }
        }
    }
    return count;
}`,
  java: `// Java: Connected Components in 2D Matrix (BFS)
// Time Complexity: O(N * M) | Space Complexity: O(N * M)
import java.util.*;

class Solution {
    private static final int[] dRow = {-1, 0, 1, 0};
    private static final int[] dCol = {0, 1, 0, -1};
    
    public int countComponents(int[][] grid) {
        int n = grid.length, m = grid[0].length;
        boolean[][] vis = new boolean[n][m];
        int count = 0;
        
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < m; c++) {
                if (grid[r][c] == 1 && !vis[r][c]) {
                    count++;
                    bfs(r, c, grid, vis);
                }
            }
        }
        return count;
    }
    
    private void bfs(int startR, int startC, int[][] grid, boolean[][] vis) {
        vis[startR][startC] = true;
        Queue<int[]> q = new LinkedList<>();
        q.add(new int[]{startR, startC});
        int n = grid.length, m = grid[0].length;
        
        while (!q.isEmpty()) {
            int[] cell = q.poll();
            for (int i = 0; i < 4; i++) {
                int nr = cell[0] + dRow[i];
                int nc = cell[1] + dCol[i];
                if (nr >= 0 && nr < n && nc >= 0 && nc < m &&
                    grid[nr][nc] == 1 && !vis[nr][nc]) {
                    vis[nr][nc] = true;
                    q.add(new int[]{nr, nc});
                }
            }
        }
    }
}`,
  python: `# Python: Connected Components in 2D Matrix (BFS)
# Time Complexity: O(N * M) | Space Complexity: O(N * M)
from collections import deque

def count_components(grid):
    n, m = len(grid), len(grid[0])
    vis = [[False] * m for _ in range(n)]
    dRow = [-1, 0, 1, 0]
    dCol = [0, 1, 0, -1]
    count = 0
    
    def bfs(sr, sc):
        q = deque([(sr, sc)])
        vis[sr][sc] = True
        while q:
            r, c = q.popleft()
            for i in range(4):
                nr, nc = r + dRow[i], c + dCol[i]
                if 0 <= nr < n and 0 <= nc < m and grid[nr][nc] == 1 and not vis[nr][nc]:
                    vis[nr][nc] = True
                    q.append((nr, nc))
                    
    for r in range(n):
        for c in range(m):
            if grid[r][c] == 1 and not vis[r][c]:
                count += 1
                bfs(r, c)
                
    return count`,
  javascript: `// JavaScript: Connected Components in 2D Matrix (BFS)
// Time Complexity: O(N * M) | Space Complexity: O(N * M)
function countComponents(grid) {
  const n = grid.length, m = grid[0].length;
  const vis = Array.from({ length: n }, () => new Array(m).fill(false));
  const dRow = [-1, 0, 1, 0];
  const dCol = [0, 1, 0, -1];
  let count = 0;
  
  function bfs(sr, sc) {
    const q = [[sr, sc]];
    vis[sr][sc] = true;
    let head = 0;
    
    while (head < q.length) {
      const [r, c] = q[head++];
      for (let i = 0; i < 4; i++) {
        const nr = r + dRow[i];
        const nc = c + dCol[i];
        if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] === 1 && !vis[nr][nc]) {
          vis[nr][nc] = true;
          q.push([nr, nc]);
        }
      }
    }
  }
  
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (grid[r][c] === 1 && !vis[r][c]) {
        count++;
        bfs(r, c);
      }
    }
  }
  return count;
}`
};

export const steps = [
  {
    phase: 'INIT',
    title: '1. Initial Binary Grid [3 x 4]',
    grid: [
      ['1', '1', '0', '0'],
      ['1', '0', '0', '1'],
      ['0', '0', '1', '1']
    ],
    rowHeaders: ['Row 0', 'Row 1', 'Row 2'],
    colHeaders: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCells: [],
    customCard: {
      title: 'Matrix Component Discovery',
      rows: [
        { label: 'Grid Dimensions', value: '3 x 4 (12 cells)' },
        { label: 'Directions', value: 'UP (-1,0), RIGHT (0,1), DOWN (1,0), LEFT (0,-1)' },
        { label: 'Components Found', value: '0', accent: true },
        { label: 'Status', value: 'Ready to begin row-by-row scan' }
      ]
    },
    variables: {
      currentRow: 0,
      currentCol: 0,
      componentsCount: 0,
      queueSize: 0
    },
    explanation: 'Begin scan of the 3x4 binary matrix. Cells with 1 represent land; cells with 0 represent water.'
  },
  {
    phase: 'DISCOVER_COMP_1',
    title: '2. Cell (0, 0) is Land: Discover Component #1',
    grid: [
      ['C1', '1', '0', '0'],
      ['1', '0', '0', '1'],
      ['0', '0', '1', '1']
    ],
    rowHeaders: ['Row 0', 'Row 1', 'Row 2'],
    colHeaders: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCells: [[0, 0]],
    customCard: {
      title: 'Component #1 Initiated',
      rows: [
        { label: 'Discovered Seed', value: '(0, 0)', accent: true },
        { label: 'Component Count', value: '1' },
        { label: 'Action', value: 'Enqueue (0, 0) & Mark C1' },
        { label: 'Queue', value: '[(0, 0)]' }
      ]
    },
    variables: {
      currentRow: 0,
      currentCol: 0,
      componentsCount: 1,
      queueSize: 1
    },
    explanation: 'Grid[0][0] is 1 and unvisited. Increment component count to 1. Enqueue (0, 0) to start BFS expansion.'
  },
  {
    phase: 'FLOOD_COMP_1',
    title: '3. Flood Fill Component #1: Adjacent Land at (0, 1) and (1, 0)',
    grid: [
      ['C1', 'C1', '0', '0'],
      ['C1', '0', '0', '1'],
      ['0', '0', '1', '1']
    ],
    rowHeaders: ['Row 0', 'Row 1', 'Row 2'],
    colHeaders: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCells: [[0, 1], [1, 0]],
    customCard: {
      title: 'Component #1 Explored',
      rows: [
        { label: 'Cluster Cells', value: '(0,0), (0,1), (1,0)', accent: true },
        { label: 'Cluster Size', value: '3 cells' },
        { label: 'Component Count', value: '1' },
        { label: 'Status', value: 'Queue emptied for Component #1' }
      ]
    },
    variables: {
      currentRow: 0,
      currentCol: 1,
      componentsCount: 1,
      queueSize: 0
    },
    explanation: '4-directional checks from (0,0) discover right neighbor (0,1) and down neighbor (1,0). Both are marked C1.'
  },
  {
    phase: 'DISCOVER_COMP_2',
    title: '4. Scan to Cell (1, 3): Discover Component #2',
    grid: [
      ['C1', 'C1', '0', '0'],
      ['C1', '0', '0', 'C2'],
      ['0', '0', '1', '1']
    ],
    rowHeaders: ['Row 0', 'Row 1', 'Row 2'],
    colHeaders: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCells: [[1, 3]],
    customCard: {
      title: 'Component #2 Initiated',
      rows: [
        { label: 'Discovered Seed', value: '(1, 3)', accent: true },
        { label: 'Component Count', value: '2' },
        { label: 'Action', value: 'Enqueue (1, 3) & Mark C2' },
        { label: 'Queue', value: '[(1, 3)]' }
      ]
    },
    variables: {
      currentRow: 1,
      currentCol: 3,
      componentsCount: 2,
      queueSize: 1
    },
    explanation: 'Cells (0,2), (0,3), (1,1), (1,2) are 0 and skipped. At (1,3), unvisited land cell is encountered! Component count increments to 2.'
  },
  {
    phase: 'FLOOD_COMP_2',
    title: '5. Flood Fill Component #2: Adjacent Land at (2, 3) and (2, 2)',
    grid: [
      ['C1', 'C1', '0', '0'],
      ['C1', '0', '0', 'C2'],
      ['0', '0', 'C2', 'C2']
    ],
    rowHeaders: ['Row 0', 'Row 1', 'Row 2'],
    colHeaders: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCells: [[2, 2], [2, 3]],
    customCard: {
      title: 'Component #2 Explored',
      rows: [
        { label: 'Cluster Cells', value: '(1,3), (2,3), (2,2)', accent: true },
        { label: 'Cluster Size', value: '3 cells' },
        { label: 'Component Count', value: '2' },
        { label: 'Status', value: 'Queue emptied for Component #2' }
      ]
    },
    variables: {
      currentRow: 2,
      currentCol: 2,
      componentsCount: 2,
      queueSize: 0
    },
    explanation: 'From (1,3), downward neighbor (2,3) is enqueued. From (2,3), leftward neighbor (2,2) is enqueued. Component #2 covers all 3 connected land cells.'
  },
  {
    phase: 'DONE',
    title: '6. Matrix Scan Completed: Exactly 2 Connected Components',
    grid: [
      ['C1', 'C1', '0', '0'],
      ['C1', '0', '0', 'C2'],
      ['0', '0', 'C2', 'C2']
    ],
    rowHeaders: ['Row 0', 'Row 1', 'Row 2'],
    colHeaders: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCells: [],
    customCard: {
      title: 'Matrix Component Summary',
      rows: [
        { label: 'Component 1', value: '[(0,0), (0,1), (1,0)]' },
        { label: 'Component 2', value: '[(1,3), (2,2), (2,3)]' },
        { label: 'Total Components', value: '2 Distinct Regions', accent: true },
        { label: 'Runtime Complexity', value: 'O(N * M) exactly' }
      ]
    },
    variables: {
      currentRow: 2,
      currentCol: 3,
      componentsCount: 2,
      queueSize: 0
    },
    explanation: 'Scan completes across all 12 cells in the grid. The algorithm successfully identified exactly 2 separate 4-directionally connected components.'
  }
];

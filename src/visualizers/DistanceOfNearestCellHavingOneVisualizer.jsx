export const rendererType = 'dp-grid';

export const meta = {
  title: 'Distance of Nearest Cell Having 1 (0/1 Matrix)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(N * M)',
  spaceComplexity: 'O(N * M) queue & distance matrix',
  description: 'Given a binary matrix, computes the minimum Manhattan distance to the nearest cell containing a 1 for every cell. Implemented using Multi-Source BFS level-order propagation starting concurrently from all 1s (LeetCode 542).'
};

export const ideaMap = {
  title: 'Multi-Source BFS Distance Propagation Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Multi-Source Enqueue',
      detail: 'Identify all cells with value 1, set dist[r][c] = 0, mark visited, and push them simultaneously to the BFS queue.'
    },
    {
      id: 'step2',
      label: 'Level-by-Level Expansion',
      detail: 'Pop cell (r, c, d) and inspect all 4 adjacent neighbors (UP, RIGHT, DOWN, LEFT).'
    },
    {
      id: 'step3',
      label: 'Distance Relaxation',
      detail: 'If an adjacent neighbor is unvisited, mark it visited, assign dist[nr][nc] = d + 1, and enqueue (nr, nc, d + 1).'
    },
    {
      id: 'step4',
      label: 'Optimal Matrix Resolution',
      detail: 'BFS guarantees that the first time a cell is reached, it is reached via the shortest path from any source.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Distance of Nearest Cell Having 1 (Multi-Source BFS)
// Time Complexity: O(N * M) | Space Complexity: O(N * M)
#include <vector>
#include <queue>
using namespace std;

vector<vector<int>> nearest(vector<vector<int>>& grid) {
    int n = grid.size(), m = grid[0].size();
    vector<vector<int>> vis(n, vector<int>(m, 0));
    vector<vector<int>> dist(n, vector<int>(m, 0));
    queue<pair<pair<int, int>, int>> q;
    
    // Multi-source init: enqueue all cells having 1 with dist = 0
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (grid[i][j] == 1) {
                q.push({{i, j}, 0});
                vis[i][j] = 1;
            }
        }
    }
    
    int dRow[] = {-1, 0, 1, 0};
    int dCol[] = {0, 1, 0, -1};
    
    while (!q.empty()) {
        int r = q.front().first.first;
        int c = q.front().first.second;
        int d = q.front().second;
        q.pop();
        dist[r][c] = d;
        
        for (int i = 0; i < 4; i++) {
            int nr = r + dRow[i];
            int nc = c + dCol[i];
            if (nr >= 0 && nr < n && nc >= 0 && nc < m && !vis[nr][nc]) {
                vis[nr][nc] = 1;
                q.push({{nr, nc}, d + 1});
            }
        }
    }
    return dist;
}`,
  java: `// Java: 01 Matrix Nearest Distance (Multi-Source BFS)
// Time Complexity: O(N * M) | Space Complexity: O(N * M)
import java.util.*;

class Solution {
    private static final int[] dRow = {-1, 0, 1, 0};
    private static final int[] dCol = {0, 1, 0, -1};
    
    public int[][] updateMatrix(int[][] mat) {
        int n = mat.length, m = mat[0].length;
        int[][] dist = new int[n][m];
        boolean[][] vis = new boolean[n][m];
        Queue<int[]> q = new LinkedList<>();
        
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < m; c++) {
                if (mat[r][c] == 1) {
                    q.add(new int[]{r, c, 0});
                    vis[r][c] = true;
                }
            }
        }
        
        while (!q.isEmpty()) {
            int[] curr = q.poll();
            int r = curr[0], c = curr[1], d = curr[2];
            dist[r][c] = d;
            
            for (int i = 0; i < 4; i++) {
                int nr = r + dRow[i];
                int nc = c + dCol[i];
                if (nr >= 0 && nr < n && nc >= 0 && nc < m && !vis[nr][nc]) {
                    vis[nr][nc] = true;
                    q.add(new int[]{nr, nc, d + 1});
                }
            }
        }
        return dist;
    }
}`,
  python: `# Python: Distance of Nearest 1 (Multi-Source BFS)
# Time Complexity: O(N * M) | Space Complexity: O(N * M)
from collections import deque

def updateMatrix(mat):
    n, m = len(mat), len(mat[0])
    dist = [[0] * m for _ in range(n)]
    vis = [[False] * m for _ in range(n)]
    q = deque()
    
    for r in range(n):
        for c in range(m):
            if mat[r][c] == 1:
                q.append((r, c, 0))
                vis[r][c] = True
                
    while q:
        r, c, d = q.popleft()
        dist[r][c] = d
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < m and not vis[nr][nc]:
                vis[nr][nc] = True
                q.append((nr, nc, d + 1))
                
    return dist`,
  javascript: `// JavaScript: Distance of Nearest 1 (Multi-Source BFS)
// Time Complexity: O(N * M) | Space Complexity: O(N * M)
function updateMatrix(mat) {
  const n = mat.length, m = mat[0].length;
  const dist = Array.from({ length: n }, () => new Array(m).fill(0));
  const vis = Array.from({ length: n }, () => new Array(m).fill(false));
  const q = [];
  
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (mat[r][c] === 1) {
        q.push([r, c, 0]);
        vis[r][c] = true;
      }
    }
  }
  
  let head = 0;
  const dRow = [-1, 0, 1, 0];
  const dCol = [0, 1, 0, -1];
  
  while (head < q.length) {
    const [r, c, d] = q[head++];
    dist[r][c] = d;
    
    for (let i = 0; i < 4; i++) {
      const nr = r + dRow[i];
      const nc = c + dCol[i];
      if (nr >= 0 && nr < n && nc >= 0 && nc < m && !vis[nr][nc]) {
        vis[nr][nc] = true;
        q.push([nr, nc, d + 1]);
      }
    }
  }
  return dist;
}`
};

export const steps = [
  {
    phase: 'INIT',
    title: '1. Multi-Source Enqueue: Cells with 1 at Distance 0',
    grid: [
      ['0', '?', '?'],
      ['?', '?', '?'],
      ['?', '?', '0']
    ],
    rowHeaders: ['Row 0', 'Row 1', 'Row 2'],
    colHeaders: ['Col 0', 'Col 1', 'Col 2'],
    activeCells: [[0, 0], [2, 2]],
    customCard: {
      title: 'Multi-Source BFS Initialization',
      rows: [
        { label: 'Initial Sources (val=1)', value: '(0,0) and (2,2)', accent: true },
        { label: 'Assigned Distance', value: 'd = 0' },
        { label: 'Queue Status', value: '[(0,0,0), (2,2,0)]' },
        { label: 'Technique', value: 'Simultaneous Multi-Origin BFS' }
      ]
    },
    variables: {
      currentWave: 0,
      queueSize: 2,
      resolvedCells: 2
    },
    explanation: 'Identify all cells initially containing 1: (0,0) and (2,2). Their distance to the nearest 1 is 0. Both are marked visited and enqueued at distance d = 0.'
  },
  {
    phase: 'WAVE_1',
    title: '2. BFS Wave 1: Immediate Neighbors at Distance 1',
    grid: [
      ['0', '1', '?'],
      ['1', '?', '1'],
      ['?', '1', '0']
    ],
    rowHeaders: ['Row 0', 'Row 1', 'Row 2'],
    colHeaders: ['Col 0', 'Col 1', 'Col 2'],
    activeCells: [[0, 1], [1, 0], [1, 2], [2, 1]],
    customCard: {
      title: 'Wave 1 Expansion',
      rows: [
        { label: 'Current Distance', value: 'd = 1', accent: true },
        { label: 'From (0, 0)', value: 'Reached (0, 1) and (1, 0)' },
        { label: 'From (2, 2)', value: 'Reached (1, 2) and (2, 1)' },
        { label: 'Queue Status', value: '4 cells enqueued with d = 1' }
      ]
    },
    variables: {
      currentWave: 1,
      queueSize: 4,
      resolvedCells: 6
    },
    explanation: 'Processing d = 0 cells pops (0,0) and (2,2). Their 4-directional unvisited neighbors ((0,1), (1,0), (1,2), (2,1)) are assigned distance = 1 and pushed to queue.'
  },
  {
    phase: 'WAVE_2',
    title: '3. BFS Wave 2: Center & Furthest Cells at Distance 2',
    grid: [
      ['0', '1', '2'],
      ['1', '2', '1'],
      ['2', '1', '0']
    ],
    rowHeaders: ['Row 0', 'Row 1', 'Row 2'],
    colHeaders: ['Col 0', 'Col 1', 'Col 2'],
    activeCells: [[0, 2], [1, 1], [2, 0]],
    customCard: {
      title: 'Wave 2 Expansion',
      rows: [
        { label: 'Current Distance', value: 'd = 2', accent: true },
        { label: 'Remaining Cells', value: '(0,2), (1,1), (2,0)' },
        { label: 'Shortest Steps', value: '2 steps from nearest source 1' },
        { label: 'Queue Status', value: 'Emptying final wave' }
      ]
    },
    variables: {
      currentWave: 2,
      queueSize: 3,
      resolvedCells: 9
    },
    explanation: 'From the d = 1 cells, unvisited neighbors (0,2), (1,1), and (2,0) are popped and assigned distance d = 2. All 9 cells in the 3x3 matrix are now visited.'
  },
  {
    phase: 'DONE',
    title: '4. Distance Matrix Fully Resolved',
    grid: [
      ['0', '1', '2'],
      ['1', '2', '1'],
      ['2', '1', '0']
    ],
    rowHeaders: ['Row 0', 'Row 1', 'Row 2'],
    colHeaders: ['Col 0', 'Col 1', 'Col 2'],
    activeCells: [],
    customCard: {
      title: 'Multi-Source BFS Result',
      rows: [
        { label: 'Total Grid Cells', value: '9 cells resolved', accent: true },
        { label: 'Max Distance', value: '2' },
        { label: 'Time Complexity', value: 'O(N * M) = O(9)' },
        { label: 'Optimality', value: 'Guaranteed minimum Manhattan distance' }
      ]
    },
    variables: {
      currentWave: 2,
      queueSize: 0,
      resolvedCells: 9
    },
    explanation: 'Multi-source BFS terminates. Every cell in the grid contains the minimum number of steps required to reach the closest 1.'
  }
];

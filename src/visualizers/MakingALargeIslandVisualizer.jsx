export const rendererType = 'dp-grid';

export const meta = {
  title: 'Making a Large Island',
  category: 'Graphs',
  difficulty: 'Hard',
  timeComplexity: 'O(N^2 * alpha(N))',
  spaceComplexity: 'O(N^2)',
  description: 'Finds the maximum possible island size obtained by flipping at most one 0 to 1 in a binary grid. Groups initial islands with DSU, then tests all 0s by connecting adjacent unique island components (LeetCode 827).'
};

export const ideaMap = {
  title: 'DSU Component Stitching Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'DSU Component Indexing',
      detail: 'Group all adjacent 1s into connected components and record the size of each unique component.'
    },
    {
      id: 'step2',
      label: 'Candidate Zero Scanning',
      detail: 'Iterate over every cell with value 0 as a candidate bridge to flip to 1.'
    },
    {
      id: 'step3',
      label: 'Unique Neighbor Set',
      detail: 'Check 4 orthogonal neighbors and collect distinct component roots in a Set to prevent double-counting.'
    },
    {
      id: 'step4',
      label: 'Optimal Bridge Selection',
      detail: 'Calculate 1 + sum(sizes of adjacent components) and track the global maximum island size.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Making A Large Island (LeetCode 827)
// Time Complexity: O(N^2 * alpha(N)) | Space: O(N^2)
#include <vector>
#include <unordered_set>
#include <algorithm>
using namespace std;

class DisjointSet {
public:
    vector<int> parent, size;
    DisjointSet(int n) {
        parent.resize(n);
        size.resize(n, 1);
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int findUPar(int node) {
        if (node == parent[node]) return node;
        return parent[node] = findUPar(parent[node]);
    }
    void unionBySize(int u, int v) {
        int ulp_u = findUPar(u), ulp_v = findUPar(v);
        if (ulp_u == ulp_v) return;
        if (size[ulp_u] < size[ulp_v]) {
            parent[ulp_u] = ulp_v;
            size[ulp_v] += size[ulp_u];
        } else {
            parent[ulp_v] = ulp_u;
            size[ulp_u] += size[ulp_v];
        }
    }
};

class Solution {
public:
    int largestIsland(vector<vector<int>>& grid) {
        int n = grid.size();
        DisjointSet ds(n * n);
        int dRow[] = {-1, 0, 1, 0};
        int dCol[] = {0, 1, 0, -1};

        // Step 1: Connect all initial adjacent 1s
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 1) {
                    for (int i = 0; i < 4; i++) {
                        int nr = r + dRow[i], nc = c + dCol[i];
                        if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                            ds.unionBySize(r * n + c, nr * n + nc);
                        }
                    }
                }
            }
        }

        // Step 2: Evaluate flipping each 0 to 1
        int mx = 0;
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 0) {
                    unordered_set<int> components;
                    for (int i = 0; i < 4; i++) {
                        int nr = r + dRow[i], nc = c + dCol[i];
                        if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                            components.insert(ds.findUPar(nr * n + nc));
                        }
                    }
                    int total = 1;
                    for (int root : components) {
                        total += ds.size[root];
                    }
                    mx = max(mx, total);
                }
            }
        }

        // Check if entire grid is already all 1s
        for (int cell = 0; cell < n * n; cell++) {
            mx = max(mx, ds.size[ds.findUPar(cell)]);
        }
        return mx;
    }
};`,
  java: `// Java: Making A Large Island (LeetCode 827)
// Time Complexity: O(N^2 * alpha(N)) | Space: O(N^2)
import java.util.*;

class Solution {
    class DisjointSet {
        int[] parent, size;
        DisjointSet(int n) {
            parent = new int[n];
            size = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
                size[i] = 1;
            }
        }
        int find(int i) {
            if (parent[i] == i) return i;
            return parent[i] = find(parent[i]);
        }
        void union(int u, int v) {
            int rootU = find(u), rootV = find(v);
            if (rootU != rootV) {
                if (size[rootU] < size[rootV]) {
                    parent[rootU] = rootV;
                    size[rootV] += size[rootU];
                } else {
                    parent[rootV] = rootU;
                    size[rootU] += size[rootV];
                }
            }
        }
    }

    public int largestIsland(int[][] grid) {
        int n = grid.length;
        DisjointSet ds = new DisjointSet(n * n);
        int[] dRow = {-1, 0, 1, 0};
        int[] dCol = {0, 1, 0, -1};

        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 1) {
                    for (int i = 0; i < 4; i++) {
                        int nr = r + dRow[i], nc = c + dCol[i];
                        if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                            ds.union(r * n + c, nr * n + nc);
                        }
                    }
                }
            }
        }

        int maxIsland = 0;
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 0) {
                    Set<Integer> uniqueRoots = new HashSet<>();
                    for (int i = 0; i < 4; i++) {
                        int nr = r + dRow[i], nc = c + dCol[i];
                        if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                            uniqueRoots.add(ds.find(nr * n + nc));
                        }
                    }
                    int currentSize = 1;
                    for (int root : uniqueRoots) currentSize += ds.size[root];
                    maxIsland = Math.max(maxIsland, currentSize);
                }
            }
        }

        for (int i = 0; i < n * n; i++) {
            maxIsland = Math.max(maxIsland, ds.size[ds.find(i)]);
        }
        return maxIsland;
    }
}`,
  python: `# Python: Making A Large Island (LeetCode 827)
# Time Complexity: O(N^2 * alpha(N)) | Space: O(N^2)
class Solution:
    def largestIsland(self, grid: list[list[int]]) -> int:
        n = len(grid)
        parent = list(range(n * n))
        size = [1] * (n * n)

        def find(i):
            if parent[i] == i:
                return i
            parent[i] = find(parent[i])
            return parent[i]

        def union(u, v):
            root_u, root_v = find(u), find(v)
            if root_u != root_v:
                if size[root_u] < size[root_v]:
                    parent[root_u] = root_v
                    size[root_v] += size[root_u]
                else:
                    parent[root_v] = root_u
                    size[root_u] += size[root_v]

        d_row = [-1, 0, 1, 0]
        d_col = [0, 1, 0, -1]

        # Step 1: Connect adjacent 1s
        for r in range(n):
            for c in range(n):
                if grid[r][c] == 1:
                    for i in range(4):
                        nr, nc = r + d_row[i], c + d_col[i]
                        if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 1:
                            union(r * n + c, nr * n + nc)

        # Step 2: Try flipping every 0
        max_island = 0
        for r in range(n):
            for c in range(n):
                if grid[r][c] == 0:
                    unique_roots = set()
                    for i in range(4):
                        nr, nc = r + d_row[i], c + d_col[i]
                        if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 1:
                            unique_roots.add(find(nr * n + nc))
                    potential_size = 1 + sum(size[root] for root in unique_roots)
                    max_island = max(max_island, potential_size)

        for i in range(n * n):
            max_island = max(max_island, size[find(i)])

        return max_island`,
  javascript: `// JavaScript: Making A Large Island (LeetCode 827)
// Time Complexity: O(N^2 * alpha(N)) | Space: O(N^2)
function largestIsland(grid) {
    const n = grid.length;
    const parent = Array.from({ length: n * n }, (_, i) => i);
    const size = Array(n * n).fill(1);

    function find(i) {
        if (parent[i] === i) return i;
        return parent[i] = find(parent[i]);
    }

    function union(u, v) {
        const rootU = find(u), rootV = find(v);
        if (rootU !== rootV) {
            if (size[rootU] < size[rootV]) {
                parent[rootU] = rootV;
                size[rootV] += size[rootU];
            } else {
                parent[rootV] = rootU;
                size[rootU] += size[rootV];
            }
        }
    }

    const dRow = [-1, 0, 1, 0];
    const dCol = [0, 1, 0, -1];

    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === 1) {
                for (let i = 0; i < 4; i++) {
                    const nr = r + dRow[i], nc = c + dCol[i];
                    if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 1) {
                        union(r * n + c, nr * n + nc);
                    }
                }
            }
        }
    }

    let maxIsland = 0;
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === 0) {
                const uniqueRoots = new Set();
                for (let i = 0; i < 4; i++) {
                    const nr = r + dRow[i], nc = c + dCol[i];
                    if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 1) {
                        uniqueRoots.add(find(nr * n + nc));
                    }
                }
                let potentialSize = 1;
                for (const root of uniqueRoots) potentialSize += size[root];
                maxIsland = Math.max(maxIsland, potentialSize);
            }
        }
    }

    for (let i = 0; i < n * n; i++) {
        maxIsland = Math.max(maxIsland, size[find(i)]);
    }
    return maxIsland;
}`
};

export const steps = [
  {
    phase: 'INITIALIZE',
    title: 'Initialize 3x3 Grid: Two Disconnected Land Masses',
    grid: [
      ['1', '0', '1'],
      ['1', '1', '0'],
      ['0', '1', '1']
    ],
    rowLabels: ['R0', 'R1', 'R2'],
    colLabels: ['C0', 'C1', 'C2'],
    activeCell: null,
    metrics: [
      { label: 'Initial Max Island', value: '4 cells' },
      { label: 'Total 0s', value: '3 candidate bridges' },
      { label: 'Grid Size', value: '3 x 3' }
    ],
    variables: {
      islandA: '{(0,0), (1,0), (1,1), (2,1), (2,2)} [size 5]',
      islandB: '{(0,2)} [size 1]',
      phase: 'Group components with Disjoint Set Union'
    },
    explain: 'Inspect the initial 3x3 grid. Using DSU, contiguous 1s form components: Island A has 5 cells, and Island B at (0, 2) is an isolated cell of size 1.',
    intuition: 'Precomputing island sizes using DSU allows evaluating each 0-flip in O(1) time.'
  },
  {
    phase: 'TEST_FLIP_0_1',
    title: 'Candidate Bridge at (0, 1): Connects Island A (5) and Island B (1)',
    grid: [
      ['A', '★', 'B'],
      ['A', 'A', '0'],
      ['0', 'A', 'A']
    ],
    rowLabels: ['R0', 'R1', 'R2'],
    colLabels: ['C0', 'C1', 'C2'],
    activeCell: { r: 0, c: 1 },
    dependencyCells: [
      { r: 0, c: 0, label: 'A(5)' },
      { r: 0, c: 2, label: 'B(1)' },
      { r: 1, c: 1, label: 'A(5)' }
    ],
    metrics: [
      { label: 'Flipped Cell', value: '(0, 1)' },
      { label: 'Unique Neighbors', value: 'Island A + Island B' },
      { label: 'Potential Island Size', value: '1 + 5 + 1 = 7' }
    ],
    variables: {
      candidateZero: '(0, 1)',
      neighborRoots: 'Root A (size 5), Root B (size 1)',
      formula: '1 + size(A) + size(B) = 7',
      currentMax: 7
    },
    explain: 'Testing candidate cell (0, 1): Neighbors are (0,0) [Island A], (0,2) [Island B], and (1,1) [Island A]. Using a Set avoids double counting Island A. New size = 1 + 5 + 1 = 7!',
    intuition: 'Flipping (0, 1) acts as a critical bridge uniting both previously isolated land masses.'
  },
  {
    phase: 'TEST_FLIP_1_2',
    title: 'Candidate Bridge at (1, 2): Adjacent to Island A and B',
    grid: [
      ['A', '0', 'B'],
      ['A', 'A', '★'],
      ['0', 'A', 'A']
    ],
    rowLabels: ['R0', 'R1', 'R2'],
    colLabels: ['C0', 'C1', 'C2'],
    activeCell: { r: 1, c: 2 },
    dependencyCells: [
      { r: 0, c: 2, label: 'B(1)' },
      { r: 1, c: 1, label: 'A(5)' },
      { r: 2, c: 2, label: 'A(5)' }
    ],
    metrics: [
      { label: 'Flipped Cell', value: '(1, 2)' },
      { label: 'Unique Neighbors', value: 'Island A + Island B' },
      { label: 'Potential Island Size', value: '1 + 5 + 1 = 7' }
    ],
    variables: {
      candidateZero: '(1, 2)',
      neighborRoots: 'Root A (size 5), Root B (size 1)',
      formula: '1 + 5 + 1 = 7',
      currentMax: 7
    },
    explain: 'Candidate (1, 2) also borders Island B at (0, 2) and Island A at (1, 1) and (2, 2). It produces an equivalent maximal island of size 7.',
    intuition: 'Multiple candidate bridge locations can tie for the optimal connected component.'
  },
  {
    phase: 'COMPLETE',
    title: 'Evaluation Complete: Maximum Island Size = 7',
    grid: [
      ['A', '★', 'B'],
      ['A', 'A', '0'],
      ['0', 'A', 'A']
    ],
    rowLabels: ['R0', 'R1', 'R2'],
    colLabels: ['C0', 'C1', 'C2'],
    activeCell: { r: 0, c: 1 },
    metrics: [
      { label: 'Max Island Size', value: 7 },
      { label: 'Original Max', value: 5 },
      { label: 'Flipped Position', value: '(0, 1)' }
    ],
    variables: {
      maxPossibleIsland: 7,
      bridgeCell: '(0, 1) or (1, 2)',
      runtime: 'O(N^2 * alpha(N))',
      result: 7
    },
    explain: 'All candidate 0 cells have been tested. Flipping at either (0, 1) or (1, 2) connects both components to yield the maximum possible island of size 7.',
    intuition: 'DSU with Set-based unique neighbor accumulation handles any arbitrary component topologies cleanly.'
  }
];

export const rendererType = 'dp-grid';

export const meta = {
  title: 'Number of Islands II (Online Queries)',
  category: 'Graphs',
  difficulty: 'Hard',
  timeComplexity: 'O(Q * 4alpha)',
  spaceComplexity: 'O(N * M)',
  description: 'Tracks the dynamic count of connected islands as land cells are added one by one into an initially empty water grid. Uses Disjoint Set Union (DSU) to connect adjacent land cells online (LeetCode 305).'
};

export const ideaMap = {
  title: 'Dynamic Online Island DSU Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'New Land Query & Tentative Island',
      detail: 'When land is added at (r, c), mark as visited and tentatively increment island count by 1.'
    },
    {
      id: 'step2',
      label: '4-Directional Neighbor Inspection',
      detail: 'Check adjacent cells (r±1, c±1); for each that is already land, test for component merging.'
    },
    {
      id: 'step3',
      label: 'DSU Component Fusion',
      detail: 'If adjacent land belongs to a different component, unite them via DSU and decrement island count by 1.'
    },
    {
      id: 'step4',
      label: 'Record Live Query Answer',
      detail: 'Append the resulting island count to the answer stream after each operator position.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Number of Islands II (LeetCode 305)
// Time Complexity: O(Q * 4alpha) | Space Complexity: O(N * M)
#include <vector>
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
    bool unionBySize(int u, int v) {
        int ulp_u = findUPar(u), ulp_v = findUPar(v);
        if (ulp_u == ulp_v) return false;
        if (size[ulp_u] < size[ulp_v]) {
            parent[ulp_u] = ulp_v;
            size[ulp_v] += size[ulp_u];
        } else {
            parent[ulp_v] = ulp_u;
            size[ulp_u] += size[ulp_v];
        }
        return true;
    }
};

class Solution {
public:
    vector<int> numOfIslands(int n, int m, vector<vector<int>>& operators) {
        DisjointSet ds(n * m);
        vector<vector<int>> vis(n, vector<int>(m, 0));
        int count = 0;
        vector<int> ans;

        int dRow[] = {-1, 0, 1, 0};
        int dCol[] = {0, 1, 0, -1};

        for (auto& it : operators) {
            int r = it[0], c = it[1];
            if (vis[r][c] == 1) {
                ans.push_back(count);
                continue;
            }

            vis[r][c] = 1;
            count++;

            for (int i = 0; i < 4; i++) {
                int nr = r + dRow[i], nc = c + dCol[i];
                if (nr >= 0 && nr < n && nc >= 0 && nc < m && vis[nr][nc] == 1) {
                    int nodeNo = r * m + c;
                    int adjNodeNo = nr * m + nc;
                    if (ds.unionBySize(nodeNo, adjNodeNo)) {
                        count--; // Two separate islands merged!
                    }
                }
            }
            ans.push_back(count);
        }
        return ans;
    }
};`,
  java: `// Java: Number of Islands II (LeetCode 305)
// Time Complexity: O(Q * 4alpha) | Space Complexity: O(N * M)
import java.util.*;

class Solution {
    class DSU {
        int[] parent, size;
        DSU(int n) {
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
        boolean union(int u, int v) {
            int rootU = find(u), rootV = find(v);
            if (rootU == rootV) return false;
            if (size[rootU] < size[rootV]) {
                parent[rootU] = rootV;
                size[rootV] += size[rootU];
            } else {
                parent[rootV] = rootU;
                size[rootU] += size[rootV];
            }
            return true;
        }
    }

    public List<Integer> numOfIslands(int n, int m, int[][] operators) {
        DSU ds = new DSU(n * m);
        boolean[][] vis = new boolean[n][m];
        int count = 0;
        List<Integer> ans = new ArrayList<>();

        int[] dRow = {-1, 0, 1, 0};
        int[] dCol = {0, 1, 0, -1};

        for (int[] op : operators) {
            int r = op[0], c = op[1];
            if (vis[r][c]) {
                ans.add(count);
                continue;
            }

            vis[r][c] = true;
            count++;

            for (int i = 0; i < 4; i++) {
                int nr = r + dRow[i], nc = c + dCol[i];
                if (nr >= 0 && nr < n && nc >= 0 && nc < m && vis[nr][nc]) {
                    if (ds.union(r * m + c, nr * m + nc)) {
                        count--;
                    }
                }
            }
            ans.add(count);
        }
        return ans;
    }
}`,
  python: `# Python: Number of Islands II (LeetCode 305)
# Time Complexity: O(Q * 4alpha) | Space Complexity: O(N * M)
class Solution:
    def numIslands2(self, m: int, n: int, positions: list[list[int]]) -> list[int]:
        parent = list(range(m * n))
        size = [1] * (m * n)
        vis = [[False] * n for _ in range(m)]

        def find(i):
            if parent[i] == i:
                return i
            parent[i] = find(parent[i])
            return parent[i]

        def union(u, v):
            root_u, root_v = find(u), find(v)
            if root_u == root_v:
                return False
            if size[root_u] < size[root_v]:
                parent[root_u] = root_v
                size[root_v] += size[root_u]
            else:
                parent[root_v] = root_u
                size[root_u] += size[root_v]
            return True

        count = 0
        ans = []
        d_row = [-1, 0, 1, 0]
        d_col = [0, 1, 0, -1]

        for r, c in positions:
            if vis[r][c]:
                ans.append(count)
                continue

            vis[r][c] = True
            count += 1

            for i in range(4):
                nr, nc = r + d_row[i], c + d_col[i]
                if 0 <= nr < m and 0 <= nc < n and vis[nr][nc]:
                    if union(r * n + c, nr * n + nc):
                        count -= 1

            ans.append(count)

        return ans`,
  javascript: `// JavaScript: Number of Islands II (LeetCode 305)
// Time Complexity: O(Q * 4alpha) | Space Complexity: O(N * M)
function numIslands2(m, n, positions) {
    const parent = Array.from({ length: m * n }, (_, i) => i);
    const size = Array(m * n).fill(1);
    const vis = Array.from({ length: m }, () => Array(n).fill(false));

    function find(i) {
        if (parent[i] === i) return i;
        return parent[i] = find(parent[i]);
    }

    function union(u, v) {
        const rootU = find(u), rootV = find(v);
        if (rootU === rootV) return false;
        if (size[rootU] < size[rootV]) {
            parent[rootU] = rootV;
            size[rootV] += size[rootU];
        } else {
            parent[rootV] = rootU;
            size[rootU] += size[rootV];
        }
        return true;
    }

    let count = 0;
    const ans = [];
    const dRow = [-1, 0, 1, 0];
    const dCol = [0, 1, 0, -1];

    for (const [r, c] of positions) {
        if (vis[r][c]) {
            ans.push(count);
            continue;
        }

        vis[r][c] = true;
        count++;

        for (let i = 0; i < 4; i++) {
            const nr = r + dRow[i], nc = c + dCol[i];
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && vis[nr][nc]) {
                if (union(r * n + c, nr * n + nc)) {
                    count--;
                }
            }
        }
        ans.push(count);
    }
    return ans;
}`
};

export const steps = [
  {
    phase: 'INITIALIZE',
    title: 'Initialize 3x3 Ocean Grid: All Water (~)',
    grid: [
      ['~', '~', '~'],
      ['~', '~', '~'],
      ['~', '~', '~']
    ],
    rowLabels: ['R0', 'R1', 'R2'],
    colLabels: ['C0', 'C1', 'C2'],
    activeCell: null,
    metrics: [
      { label: 'Active Islands', value: 0 },
      { label: 'Queries Answered', value: '0 / 4' },
      { label: 'DSU Elements', value: 9 }
    ],
    variables: {
      islandCount: 0,
      queryStream: '[]',
      phase: 'Ready for dynamic land additions'
    },
    explain: 'Start with an empty 3x3 ocean matrix containing no land cells. Queries will convert cells to land one by one.',
    intuition: 'Online connectivity queries are efficiently handled by Disjoint Set Union without needing to rerun full DFS.'
  },
  {
    phase: 'ADD_LAND_0_0',
    title: 'Query 1: Add Land at (0, 0) -> New Island Formed (Count = 1)',
    grid: [
      ['1', '~', '~'],
      ['~', '~', '~'],
      ['~', '~', '~']
    ],
    rowLabels: ['R0', 'R1', 'R2'],
    colLabels: ['C0', 'C1', 'C2'],
    activeCell: { r: 0, c: 0 },
    metrics: [
      { label: 'Active Islands', value: 1 },
      { label: 'Queries Answered', value: '1 / 4' },
      { label: 'Result Stream', value: '[1]' }
    ],
    variables: {
      addedCell: '(0, 0)',
      neighborsLand: 'None',
      islandCount: 1,
      ans: '[1]'
    },
    explain: 'Operator adds land at (0, 0). It has no adjacent land neighbors. Island count increments from 0 to 1. Append 1 to result.',
    intuition: 'An isolated land cell creates a new independent connected component.'
  },
  {
    phase: 'ADD_LAND_0_1',
    title: 'Query 2: Add Land at (0, 1) -> Merges with (0, 0) (Count Stays 1)',
    grid: [
      ['1', '1', '~'],
      ['~', '~', '~'],
      ['~', '~', '~']
    ],
    rowLabels: ['R0', 'R1', 'R2'],
    colLabels: ['C0', 'C1', 'C2'],
    activeCell: { r: 0, c: 1 },
    dependencyCells: [
      { r: 0, c: 0, label: 'nbr' }
    ],
    metrics: [
      { label: 'Active Islands', value: 1 },
      { label: 'Queries Answered', value: '2 / 4' },
      { label: 'Result Stream', value: '[1, 1]' }
    ],
    variables: {
      addedCell: '(0, 1)',
      neighbor: '(0, 0) [is land]',
      unionAction: 'union((0,1), (0,0)) -> count: 1 + 1 - 1 = 1',
      ans: '[1, 1]'
    },
    explain: 'Add land at (0, 1). Tentative count becomes 2. But left neighbor (0, 0) is already land! DSU unites them and count decrements by 1. Total islands remain 1.',
    intuition: 'Adjacent land joins the existing component rather than creating a new island.'
  },
  {
    phase: 'ADD_LAND_2_2',
    title: 'Query 3: Add Land at (2, 2) -> Isolated Island #2 (Count = 2)',
    grid: [
      ['1', '1', '~'],
      ['~', '~', '~'],
      ['~', '~', '1']
    ],
    rowLabels: ['R0', 'R1', 'R2'],
    colLabels: ['C0', 'C1', 'C2'],
    activeCell: { r: 2, c: 2 },
    metrics: [
      { label: 'Active Islands', value: 2 },
      { label: 'Queries Answered', value: '3 / 4' },
      { label: 'Result Stream', value: '[1, 1, 2]' }
    ],
    variables: {
      addedCell: '(2, 2)',
      neighborsLand: 'None',
      islandCount: 2,
      ans: '[1, 1, 2]'
    },
    explain: 'Add land at bottom-right corner (2, 2). It has no adjacent land cells. A second island is created. Island count becomes 2.',
    intuition: 'Diagonal placement does not form a connected component in 4-directional adjacency.'
  },
  {
    phase: 'ADD_LAND_1_2',
    title: 'Query 4: Add Land at (1, 2) -> Connects to (2, 2) (Count Stays 2)',
    grid: [
      ['1', '1', '~'],
      ['~', '~', '1'],
      ['~', '~', '1']
    ],
    rowLabels: ['R0', 'R1', 'R2'],
    colLabels: ['C0', 'C1', 'C2'],
    activeCell: { r: 1, c: 2 },
    dependencyCells: [
      { r: 2, c: 2, label: 'nbr' }
    ],
    metrics: [
      { label: 'Active Islands', value: 2 },
      { label: 'Queries Answered', value: '4 / 4' },
      { label: 'Result Stream', value: '[1, 1, 2, 2]' }
    ],
    variables: {
      addedCell: '(1, 2)',
      neighbor: '(2, 2) is land -> merged via DSU',
      finalIslandCount: 2,
      ans: '[1, 1, 2, 2]'
    },
    explain: 'Add land at (1, 2). It connects with southern neighbor (2, 2). DSU merges them into the same component. Island count stays 2. Final answer array = [1, 1, 2, 2].',
    intuition: 'Each query is handled in O(alpha(N*M)) nearly constant amortized time.'
  }
];

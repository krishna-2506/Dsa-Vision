export const rendererType = 'array-scan';

export const meta = {
  title: 'Most Stones Removed with Same Row or Column',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(N * alpha(V))',
  spaceComplexity: 'O(maxRow + maxCol) DSU arrays',
  description: 'Calculates the maximum number of stones that can be removed where a stone is removable if it shares the same row or column with another non-removed stone. Modeled with Disjoint Set Union (DSU) where Max Removals = Total Stones - Number of Connected Components (LeetCode 947).'
};

export const ideaMap = {
  title: 'DSU Component Reduction Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Bipartite Row-Column Projection',
      detail: 'Treat rows and columns as graph nodes. Offset column indices by maxRow + 1 to avoid ID collisions.'
    },
    {
      id: 'step2',
      label: 'DSU Union for Each Stone',
      detail: 'For stone at (r, c), connect row node r with column node c + offset using union-by-size.'
    },
    {
      id: 'step3',
      label: 'Count Connected Components',
      detail: 'Identify all unique root parents among the active row and column nodes that contain stones.'
    },
    {
      id: 'step4',
      label: 'Optimal Removal Formula',
      detail: 'In any component of size S, S - 1 stones can be safely removed leaving 1 anchor stone: Removals = N - C.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Most Stones Removed with Same Row or Column (LeetCode 947)
// Time Complexity: O(N * alpha(V)) | Space Complexity: O(maxRow + maxCol)
#include <vector>
#include <unordered_map>
using namespace std;

class DisjointSet {
public:
    unordered_map<int, int> parent, size;
    int findUPar(int node) {
        if (!parent.count(node)) {
            parent[node] = node;
            size[node] = 1;
        }
        if (node == parent[node]) return node;
        return parent[node] = findUPar(parent[node]);
    }
    void unionBySize(int u, int v) {
        int rootU = findUPar(u), rootV = findUPar(v);
        if (rootU == rootV) return;
        if (size[rootU] < size[rootV]) {
            parent[rootU] = rootV;
            size[rootV] += size[rootU];
        } else {
            parent[rootV] = rootU;
            size[rootU] += size[rootV];
        }
    }
};

int removeStones(vector<vector<int>>& stones) {
    DisjointSet ds;
    int maxRow = 0;
    for (auto& it : stones) maxRow = max(maxRow, it[0]);
    
    // Connect row node with shifted column node
    for (auto& it : stones) {
        int nodeRow = it[0];
        int nodeCol = it[1] + maxRow + 1;
        ds.unionBySize(nodeRow, nodeCol);
    }
    
    unordered_map<int, int> uniqueRoots;
    for (auto& it : stones) {
        uniqueRoots[ds.findUPar(it[0])] = 1;
    }
    
    // Max Removals = Total Stones - Connected Components
    return stones.size() - uniqueRoots.size();
}`,
  java: `// Java: Most Stones Removed (LeetCode 947)
// Time Complexity: O(N * alpha(V)) | Space Complexity: O(maxRow + maxCol)
import java.util.*;

class Solution {
    class DisjointSet {
        Map<Integer, Integer> parent = new HashMap<>();
        Map<Integer, Integer> size = new HashMap<>();
        
        int find(int node) {
            if (!parent.containsKey(node)) {
                parent.put(node, node);
                size.put(node, 1);
            }
            if (node == parent.get(node)) return node;
            parent.put(node, find(parent.get(node)));
            return parent.get(node);
        }
        
        void union(int u, int v) {
            int rootU = find(u), rootV = find(v);
            if (rootU == rootV) return;
            if (size.get(rootU) < size.get(rootV)) {
                parent.put(rootU, rootV);
                size.put(rootV, size.get(rootV) + size.get(rootU));
            } else {
                parent.put(rootV, rootU);
                size.put(rootU, size.get(rootU) + size.get(rootV));
            }
        }
    }
    
    public int removeStones(int[][] stones) {
        DisjointSet ds = new DisjointSet();
        int maxRow = 0;
        for (int[] s : stones) maxRow = Math.max(maxRow, s[0]);
        
        for (int[] s : stones) {
            int r = s[0], c = s[1] + maxRow + 1;
            ds.union(r, c);
        }
        
        Set<Integer> uniqueRoots = new HashSet<>();
        for (int[] s : stones) {
            uniqueRoots.add(ds.find(s[0]));
        }
        
        return stones.length - uniqueRoots.size();
    }
}`,
  python: `# Python: Most Stones Removed (LeetCode 947)
# Time Complexity: O(N * alpha(V)) | Space Complexity: O(maxRow + maxCol)
class DisjointSet:
    def __init__(self):
        self.parent = {}
        self.size = {}
        
    def find(self, u):
        if u not in self.parent:
            self.parent[u] = u
            self.size[u] = 1
        if self.parent[u] == u:
            return u
        self.parent[u] = self.find(self.parent[u])
        return self.parent[u]
        
    def union(self, u, v):
        ru, rv = self.find(u), self.find(v)
        if ru == rv:
            return
        if self.size[ru] < self.size[rv]:
            self.parent[ru] = rv
            self.size[rv] += self.size[ru]
        else:
            self.parent[rv] = ru
            self.size[ru] += self.size[rv]

def removeStones(stones: list[list[int]]) -> int:
    ds = DisjointSet()
    max_row = max(s[0] for s in stones)
    
    for r, c in stones:
        ds.union(r, c + max_row + 1)
        
    unique_roots = {ds.find(s[0]) for s in stones}
    return len(stones) - len(unique_roots)`,
  javascript: `// JavaScript: Most Stones Removed (LeetCode 947)
// Time Complexity: O(N * alpha(V)) | Space Complexity: O(maxRow + maxCol)
function removeStones(stones) {
  const parent = new Map();
  const size = new Map();
  
  function find(u) {
    if (!parent.has(u)) {
      parent.set(u, u);
      size.set(u, 1);
    }
    if (parent.get(u) === u) return u;
    parent.set(u, find(parent.get(u)));
    return parent.get(u);
  }
  
  function union(u, v) {
    const rootU = find(u), rootV = find(v);
    if (rootU === rootV) return;
    if (size.get(rootU) < size.get(rootV)) {
      parent.set(rootU, rootV);
      size.set(rootV, size.get(rootV) + size.get(rootU));
    } else {
      parent.set(rootV, rootU);
      size.set(rootU, size.get(rootU) + size.get(rootV));
    }
  }
  
  let maxRow = 0;
  for (const [r] of stones) maxRow = Math.max(maxRow, r);
  
  for (const [r, c] of stones) {
    union(r, c + maxRow + 1);
  }
  
  const uniqueRoots = new Set();
  for (const [r] of stones) {
    uniqueRoots.add(find(r));
  }
  
  return stones.length - uniqueRoots.size();
}`
};

export const steps = [
  {
    phase: 'SETUP',
    title: '1. Place 6 Stones on Coordinate Plane',
    arr: ['(0,0)', '(0,1)', '(1,0)', '(1,2)', '(2,1)', '(2,2)'],
    auxiliaryTrack: ['Isolated', 'Isolated', 'Isolated', 'Isolated', 'Isolated', 'Isolated'],
    auxiliaryLabel: 'Component Status',
    activeIndices: [],
    customCard: {
      title: 'Initial Stone Configuration',
      rows: [
        { label: 'Total Stones (N)', value: '6 stones', accent: true },
        { label: 'Coordinate Range', value: 'Rows 0..2, Cols 0..2' },
        { label: 'Col Offset', value: 'maxRow + 1 = 3 (Cols shifted 3..5)' },
        { label: 'Components Initial', value: '6 disjoint nodes' }
      ]
    },
    variables: {
      totalStones: 6,
      connectedComponents: 6,
      maxRemovals: 0,
      activeStone: 'None'
    },
    explanation: 'Place 6 stones at coordinates [0,0], [0,1], [1,0], [1,2], [2,1], [2,2]. Each stone can bridge its row with its column in a Disjoint Set Union.'
  },
  {
    phase: 'UNION_ROW_0',
    title: '2. Union Stones in Row 0: Connect (0,0) and (0,1)',
    arr: ['(0,0)', '(0,1)', '(1,0)', '(1,2)', '(2,1)', '(2,2)'],
    auxiliaryTrack: ['Comp A (Root 0)', 'Comp A (Root 0)', 'Isolated', 'Isolated', 'Isolated', 'Isolated'],
    auxiliaryLabel: 'Component Status',
    activeIndices: [0, 1],
    customCard: {
      title: 'Row 0 Shared Connectivity',
      rows: [
        { label: 'Active Stones', value: '(0,0) and (0,1)', accent: true },
        { label: 'Shared Axis', value: 'Row 0 connects Col 0 and Col 1' },
        { label: 'DSU Operations', value: 'union(0, 3) & union(0, 4)' },
        { label: 'Components Left', value: '5 components' }
      ]
    },
    variables: {
      totalStones: 6,
      connectedComponents: 5,
      maxRemovals: 1,
      activeStone: '[0, 0] & [0, 1]'
    },
    explanation: 'Stones at (0,0) and (0,1) share Row 0. DSU merges their sets. Both stones are now linked in Component A.'
  },
  {
    phase: 'UNION_ROW_1',
    title: '3. Union Stones in Row 1: Connect via Col 0',
    arr: ['(0,0)', '(0,1)', '(1,0)', '(1,2)', '(2,1)', '(2,2)'],
    auxiliaryTrack: ['Comp A', 'Comp A', 'Comp A (via Col 0)', 'Comp A (via Row 1)', 'Isolated', 'Isolated'],
    auxiliaryLabel: 'Component Status',
    activeIndices: [2, 3],
    customCard: {
      title: 'Row 1 & Column 0 Bridge',
      rows: [
        { label: 'Bridge Stone', value: '(1,0) shares Col 0 with (0,0)', accent: true },
        { label: 'Branch Extension', value: '(1,2) shares Row 1 with (1,0)' },
        { label: 'DSU Operations', value: 'union(1, 3) & union(1, 5)' },
        { label: 'Components Left', value: '3 components' }
      ]
    },
    variables: {
      totalStones: 6,
      connectedComponents: 3,
      maxRemovals: 3,
      activeStone: '[1, 0] & [1, 2]'
    },
    explanation: 'Stone (1,0) shares column 0 with stone (0,0). Stone (1,2) shares row 1 with stone (1,0). Component A expands to include 4 stones.'
  },
  {
    phase: 'UNION_ROW_2',
    title: '4. Union Stones in Row 2: Complete Global Cluster',
    arr: ['(0,0)', '(0,1)', '(1,0)', '(1,2)', '(2,1)', '(2,2)'],
    auxiliaryTrack: ['Comp A', 'Comp A', 'Comp A', 'Comp A', 'Comp A (via Col 1)', 'Comp A (via Col 2)'],
    auxiliaryLabel: 'Component Status',
    activeIndices: [4, 5],
    customCard: {
      title: 'Row 2 Shared Ties',
      rows: [
        { label: 'Stones Joined', value: '(2,1) and (2,2)', accent: true },
        { label: 'Connecting Links', value: '(2,1) links to Col 1; (2,2) links to Col 2' },
        { label: 'Global Component', value: 'All 6 stones form 1 connected component!' },
        { label: 'Total Components (C)', value: '1' }
      ]
    },
    variables: {
      totalStones: 6,
      connectedComponents: 1,
      maxRemovals: 5,
      activeStone: '[2, 1] & [2, 2]'
    },
    explanation: 'Stone (2,1) shares column 1 with (0,1), and stone (2,2) shares column 2 with (1,2). All 6 stones are now mutually connected into a single connected component (C = 1).'
  },
  {
    phase: 'RESULT',
    title: '5. Max Stones Removed = Total Stones (6) - Components (1) = 5',
    arr: ['(0,0)', '(0,1)', '(1,0)', '(1,2)', '(2,1)', '(2,2)'],
    auxiliaryTrack: ['Pivot (Kept)', 'Removed #1', 'Removed #2', 'Removed #3', 'Removed #4', 'Removed #5'],
    auxiliaryLabel: 'Optimal Removal Plan',
    activeIndices: [1, 2, 3, 4, 5],
    customCard: {
      title: 'Optimal Removal Theorem',
      rows: [
        { label: 'Total Stones (N)', value: '6' },
        { label: 'Connected Components (C)', value: '1' },
        { label: 'Survivor Anchor Stones', value: '1 stone remaining', accent: true },
        { label: 'Max Stones Removed', value: '6 - 1 = 5 Stones', accent: true }
      ]
    },
    variables: {
      totalStones: 6,
      connectedComponents: 1,
      maxRemovals: 5,
      formula: 'N - C = 6 - 1 = 5'
    },
    explanation: 'In any connected component of size S, we can remove stones in reverse topological leaf order until only 1 anchor stone remains. Max removable stones = Total Stones - Components = 6 - 1 = 5 stones!'
  }
];

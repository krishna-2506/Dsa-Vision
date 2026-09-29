export const rendererType = 'array-scan';

export const meta = {
  title: 'Number of Operations to Make Network Connected',
  category: 'Graphs',
  difficulty: 'Medium',
  timeComplexity: 'O(E * alpha(V) + V)',
  spaceComplexity: 'O(V)',
  description: 'Calculates the minimum cable reconnections needed to connect all computers in a network. Uses Disjoint Set Union (DSU) to identify redundant cyclic cables and join isolated components (LeetCode 1319).'
};

export const ideaMap = {
  title: 'DSU Redundant Cable Harvesting Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Minimum Cable Guard',
      detail: 'If total cables < N - 1, spanning all N computers is mathematically impossible; return -1.'
    },
    {
      id: 'step2',
      label: 'DSU Union & Cycle Detection',
      detail: 'For each cable (u, v), if find(u) == find(v), the cable creates a redundant cycle and can be harvested.'
    },
    {
      id: 'step3',
      label: 'Count Isolated Components',
      detail: 'Tally the number of disjoint computer clusters by counting parent[i] == i roots.'
    },
    {
      id: 'step4',
      label: 'Cables Needed = Components - 1',
      detail: 'Connecting C disjoint components requires exactly C - 1 cables. Return C - 1.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Number of Operations to Make Network Connected (LeetCode 1319)
// Time Complexity: O(E * alpha(V) + V) | Space Complexity: O(V)
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
        if (ulp_u == ulp_v) return false; // Cycle detected!
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
    int makeConnected(int n, vector<vector<int>>& connections) {
        // Need at least n - 1 cables to connect n computers
        if (connections.size() < n - 1) return -1;

        DisjointSet ds(n);
        int extraEdges = 0;
        for (auto& edge : connections) {
            if (!ds.unionBySize(edge[0], edge[1])) {
                extraEdges++;
            }
        }

        int components = 0;
        for (int i = 0; i < n; i++) {
            if (ds.parent[i] == i) components++;
        }

        int needed = components - 1;
        return (extraEdges >= needed) ? needed : -1;
    }
};`,
  java: `// Java: Number of Operations to Make Network Connected (LeetCode 1319)
// Time Complexity: O(E * alpha(V) + V) | Space Complexity: O(V)
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

    public int makeConnected(int n, int[][] connections) {
        if (connections.length < n - 1) return -1;

        DSU dsu = new DSU(n);
        int extraCables = 0;
        for (int[] edge : connections) {
            if (!dsu.union(edge[0], edge[1])) {
                extraCables++;
            }
        }

        int components = 0;
        for (int i = 0; i < n; i++) {
            if (dsu.parent[i] == i) components++;
        }

        int needed = components - 1;
        return (extraCables >= needed) ? needed : -1;
    }
}`,
  python: `# Python: Number of Operations to Make Network Connected (LeetCode 1319)
# Time Complexity: O(E * alpha(V) + V) | Space Complexity: O(V)
class Solution:
    def makeConnected(self, n: int, connections: list[list[int]]) -> int:
        if len(connections) < n - 1:
            return -1

        parent = list(range(n))
        size = [1] * n

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

        extra_cables = 0
        for u, v in connections:
            if not union(u, v):
                extra_cables += 1

        components = sum(1 for i in range(n) if parent[i] == i)
        needed = components - 1
        return needed if extra_cables >= needed else -1`,
  javascript: `// JavaScript: Number of Operations to Make Network Connected (LeetCode 1319)
// Time Complexity: O(E * alpha(V) + V) | Space Complexity: O(V)
function makeConnected(n, connections) {
    if (connections.length < n - 1) return -1;

    const parent = Array.from({ length: n }, (_, i) => i);
    const size = Array(n).fill(1);

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

    let extraCables = 0;
    for (const [u, v] of connections) {
        if (!union(u, v)) {
            extraCables++;
        }
    }

    let components = 0;
    for (let i = 0; i < n; i++) {
        if (parent[i] === i) components++;
    }

    const needed = components - 1;
    return extraCables >= needed ? needed : -1;
}`
};

export const steps = [
  {
    phase: 'INITIALIZE',
    title: 'Initialize Network: 6 Computers, 5 Cables Provided',
    arr: [0, 1, 2, 3, 4, 5],
    auxiliaryTrack: [0, 1, 2, 3, 4, 5],
    auxiliaryLabel: 'DSU Parent Array',
    activeIndices: [0, 1, 2, 3, 4, 5],
    customCard: {
      title: 'Feasibility Pre-Check',
      rows: [
        { label: 'Computers (N)', value: '6' },
        { label: 'Cables Available', value: '5 connections' },
        { label: 'Minimum Required Cables', value: 'N - 1 = 5 (Feasible!)', accent: true },
        { label: 'Cables List', value: '[(0,1), (0,2), (0,3), (1,2), (1,3)]' }
      ]
    },
    variables: {
      N: 6,
      cables: 5,
      extraCables: 0,
      isolatedComponents: 6
    },
    metrics: {
      extraCables: 0,
      components: 6,
      cablesNeeded: 5
    },
    explain: 'Check whether cables.length >= N - 1. With 5 cables for 6 computers, connecting all computers is theoretically feasible. Initialize DSU where each computer is its own root.',
    intuition: 'A spanning tree of N vertices requires at least N - 1 edges.'
  },
  {
    phase: 'UNION_EDGES',
    title: 'Unite Edges (0,1), (0,2), (0,3): Component {0,1,2,3} Formed',
    arr: [0, 1, 2, 3, 4, 5],
    auxiliaryTrack: [0, 0, 0, 0, 4, 5],
    auxiliaryLabel: 'DSU Parent Array',
    activeIndices: [0, 1, 2, 3],
    customCard: {
      title: 'DSU Cluster Merging',
      rows: [
        { label: 'Edges Processed', value: '(0,1), (0,2), (0,3) merged into root 0' },
        { label: 'Active Clusters', value: '{0, 1, 2, 3}, {4}, {5}' },
        { label: 'Cluster Count', value: '3 independent components' }
      ]
    },
    variables: {
      'parent[1]': 0,
      'parent[2]': 0,
      'parent[3]': 0,
      components: 3
    },
    metrics: {
      extraCables: 0,
      components: 3,
      cablesNeeded: 2
    },
    explain: 'Connecting (0,1), (0,2), and (0,3) unifies computers 0, 1, 2, and 3 under representative 0. Computers 4 and 5 remain completely isolated.',
    intuition: 'Union-find groups connected subgraphs and updates their root representatives.'
  },
  {
    phase: 'DETECT_REDUNDANT_1',
    title: 'Process Cable (1, 2): Cycle Detected! Redundant Cable #1 Harvested',
    arr: [0, 1, 2, 3, 4, 5],
    auxiliaryTrack: [0, 0, 0, 0, 4, 5],
    auxiliaryLabel: 'DSU Parent Array',
    activeIndices: [1, 2],
    customCard: {
      title: 'Redundant Cable Detected',
      rows: [
        { label: 'Cable Checked', value: '(1, 2)' },
        { label: 'find(1) vs find(2)', value: 'find(1) == 0, find(2) == 0 (Same Root!)', accent: true },
        { label: 'Harvest Decision', value: 'Cable (1, 2) is redundant; harvest for re-routing!' }
      ]
    },
    variables: {
      cable: '(1, 2)',
      rootU: 0,
      rootV: 0,
      extraCables: 1
    },
    metrics: {
      extraCables: 1,
      components: 3,
      cablesNeeded: 2
    },
    explain: 'Computers 1 and 2 already share root 0. Cable (1, 2) forms a redundant cycle. We safely harvest this cable without disconnecting {0,1,2,3}.',
    intuition: 'Any edge between nodes in the same connected component can be removed without breaking connectivity.'
  },
  {
    phase: 'DETECT_REDUNDANT_2',
    title: 'Process Cable (1, 3): Cycle Detected! Redundant Cable #2 Harvested',
    arr: [0, 1, 2, 3, 4, 5],
    auxiliaryTrack: [0, 0, 0, 0, 4, 5],
    auxiliaryLabel: 'DSU Parent Array',
    activeIndices: [1, 3],
    customCard: {
      title: 'Second Redundant Cable',
      rows: [
        { label: 'Cable Checked', value: '(1, 3)' },
        { label: 'find(1) vs find(3)', value: 'find(1) == 0, find(3) == 0 (Same Root!)', accent: true },
        { label: 'Harvested Total', value: 'extraCables = 2' }
      ]
    },
    variables: {
      cable: '(1, 3)',
      rootU: 0,
      rootV: 0,
      extraCables: 2
    },
    metrics: {
      extraCables: 2,
      components: 3,
      cablesNeeded: 2
    },
    explain: 'Computers 1 and 3 also share root 0. Cable (1, 3) is another redundant loop. We harvest it as extra cable #2.',
    intuition: 'The network has 2 spare cables that can bridge isolated computers.'
  },
  {
    phase: 'COMPLETE',
    title: 'Reconnection Feasible: Move 2 Spare Cables to Bridge 4 and 5',
    arr: [0, 1, 2, 3, 4, 5],
    auxiliaryTrack: [0, 0, 0, 0, 0, 0],
    auxiliaryLabel: 'Connected Network',
    activeIndices: [0, 4, 5],
    customCard: {
      title: 'Final Re-routing Optimization',
      rows: [
        { label: 'Disconnected Components', value: '3 ({0,1,2,3}, {4}, {5})' },
        { label: 'Cables Needed', value: 'Components - 1 = 3 - 1 = 2', accent: true },
        { label: 'Spare Cables Available', value: '2 redundant cables harvested' },
        { label: 'Minimum Operations', value: '2 cable moves connect all 6 computers!' }
      ]
    },
    variables: {
      neededCables: 2,
      availableExtra: 2,
      finalAnswer: 2,
      status: 'OPTIMAL RECONNECTION VERIFIED'
    },
    metrics: {
      extraCables: 2,
      components: 1,
      finalOperations: 2
    },
    explain: 'To connect 3 components, we need 3 - 1 = 2 cables. We harvested 2 redundant cables. Reconnecting one to computer 4 and one to computer 5 fully connects the network. Return 2.',
    intuition: 'If total edges >= N - 1, the number of extra edges is always sufficient to span all components.'
  }
];

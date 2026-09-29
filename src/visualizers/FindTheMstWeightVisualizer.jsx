export const rendererType = 'array-scan';

export const meta = {
  title: 'Find the MST Weight (Kruskal\'s Algorithm)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(E log E + E * 4alpha)',
  spaceComplexity: 'O(V + E)',
  description: 'Calculates the total weight of the Minimum Spanning Tree using Kruskal\'s Algorithm: sorts all edges by weight, iterates through them, and uses Disjoint Set (DSU) to greedily include edges without forming cycles.'
};

export const ideaMap = {
  title: 'Kruskal Greedy Edge Incorporation Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Edge Weight Sorting',
      detail: 'Extract all undirected edges with their weights and sort them in ascending order: O(E log E).'
    },
    {
      id: 'step2',
      label: 'DSU Component Tracking',
      detail: 'Initialize Disjoint Set Union with path compression and union-by-size for all V vertices.'
    },
    {
      id: 'step3',
      label: 'Acyclic Edge Union',
      detail: 'Iterate through sorted edges. If findUPar(u) != findUPar(v), union the sets and accumulate weight.'
    },
    {
      id: 'step4',
      label: 'V - 1 Spanning Completion',
      detail: 'Stop as soon as V - 1 edges are added, guaranteeing a minimal spanning tree connecting all nodes.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Kruskal's Algorithm for MST Weight
// Time Complexity: O(E log E + E * 4alpha) | Space Complexity: O(V + E)
#include <vector>
#include <algorithm>
using namespace std;

class DisjointSet {
    vector<int> parent, size;
public:
    DisjointSet(int n) {
        parent.resize(n + 1);
        size.resize(n + 1, 1);
        for (int i = 0; i <= n; i++) parent[i] = i;
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

int spanningTree(int V, vector<vector<int>> adj[]) {
    vector<pair<int, pair<int, int>>> edges;
    for (int i = 0; i < V; i++) {
        for (auto it : adj[i]) {
            int adjNode = it[0], wt = it[1];
            if (i < adjNode) edges.push_back({wt, {i, adjNode}});
        }
    }
    sort(edges.begin(), edges.end());
    
    DisjointSet ds(V);
    int mstWeight = 0;
    int edgeCount = 0;
    
    for (auto it : edges) {
        int wt = it.first;
        int u = it.second.first;
        int v = it.second.second;
        if (ds.unionBySize(u, v)) {
            mstWeight += wt;
            edgeCount++;
            if (edgeCount == V - 1) break;
        }
    }
    return mstWeight;
}`,
  java: `// Java: Kruskal's Algorithm for MST Weight
// Time Complexity: O(E log E + E * 4alpha) | Space Complexity: O(V + E)
import java.util.*;

class Edge implements Comparable<Edge> {
    int src, dest, weight;
    Edge(int s, int d, int w) { src = s; dest = d; weight = w; }
    public int compareTo(Edge compareEdge) {
        return this.weight - compareEdge.weight;
    }
}

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
    boolean unionBySize(int u, int v) {
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

class Solution {
    static int spanningTree(int V, int E, List<List<int[]>> adj) {
        List<Edge> edges = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            for (int[] it : adj.get(i)) {
                if (i < it[0]) edges.add(new Edge(i, it[0], it[1]));
            }
        }
        Collections.sort(edges);
        DisjointSet ds = new DisjointSet(V);
        int mstWeight = 0;
        for (Edge e : edges) {
            if (ds.unionBySize(e.src, e.dest)) {
                mstWeight += e.weight;
            }
        }
        return mstWeight;
    }
}`,
  python: `# Python: Kruskal's Algorithm for MST Weight
# Time: O(E log E) | Space: O(V + E)
class DisjointSet:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n
        
    def find(self, u):
        if self.parent[u] == u:
            return u
        self.parent[u] = self.find(self.parent[u])
        return self.parent[u]
        
    def union(self, u, v):
        ru, rv = self.find(u), self.find(v)
        if ru == rv:
            return False
        if self.size[ru] < self.size[rv]:
            self.parent[ru] = rv
            self.size[rv] += self.size[ru]
        else:
            self.parent[rv] = ru
            self.size[ru] += self.size[rv]
        return True

def spanningTree(V, edges):
    edges.sort(key=lambda x: x[2])  # sort by weight
    ds = DisjointSet(V)
    mst_weight = 0
    count = 0
    
    for u, v, wt in edges:
        if ds.union(u, v):
            mst_weight += wt
            count += 1
            if count == V - 1:
                break
                
    return mst_weight`,
  javascript: `// JavaScript: Kruskal's Algorithm for MST Weight
// Time: O(E log E) | Space: O(V + E)
class DisjointSet {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = new Array(n).fill(1);
  }
  find(u) {
    if (this.parent[u] === u) return u;
    return this.parent[u] = this.find(this.parent[u]);
  }
  union(u, v) {
    const ru = this.find(u), rv = this.find(v);
    if (ru === rv) return false;
    if (this.size[ru] < this.size[rv]) {
      this.parent[ru] = rv;
      this.size[rv] += this.size[ru];
    } else {
      this.parent[rv] = ru;
      this.size[ru] += this.size[rv];
    }
    return true;
  }
}

function spanningTree(V, edges) {
  edges.sort((a, b) => a[2] - b[2]);
  const ds = new DisjointSet(V);
  let mstWeight = 0;
  let count = 0;
  
  for (const [u, v, wt] of edges) {
    if (ds.union(u, v)) {
      mstWeight += wt;
      count++;
      if (count === V - 1) break;
    }
  }
  return mstWeight;
}`
};

export const steps = [
  {
    phase: 'SORT_EDGES',
    title: '1. Sorted Graph Edges in Ascending Order',
    arr: ['0-1 (w:2)', '1-2 (w:3)', '1-4 (w:5)', '0-3 (w:6)', '2-4 (w:7)', '1-3 (w:8)'],
    auxiliaryTrack: ['Pending', 'Pending', 'Pending', 'Pending', 'Pending', 'Pending'],
    auxiliaryLabel: 'Inclusion Status',
    activeIndices: [0],
    customCard: {
      title: 'Kruskal Algorithm Setup',
      rows: [
        { label: 'Total Vertices (V)', value: '5 Nodes (Target: 4 edges)', accent: true },
        { label: 'Total Edges (E)', value: '6 Edges sorted by weight' },
        { label: 'Initial MST Weight', value: '0' },
        { label: 'DSU State', value: '{0}, {1}, {2}, {3}, {4} (5 disjoint components)' }
      ]
    },
    variables: {
      edgesAdded: '0 / 4',
      currentMstWeight: 0,
      activeEdge: 'None'
    },
    metrics: {
      mstWeight: 0,
      edgesSelected: '0 / 4',
      dsuComponents: 5
    },
    explain: 'Edges sorted: (0-1: 2), (1-2: 3), (1-4: 5), (0-3: 6), (2-4: 7), (1-3: 8). All 5 vertices start in isolated disjoint sets.',
    intuition: 'Sorting edges allows greedy inclusion of the cheapest available connections.'
  },
  {
    phase: 'PICK_0_1',
    title: '2. Pick Edge (0-1, wt: 2): Disjoint Sets Unite',
    arr: ['0-1 (w:2)', '1-2 (w:3)', '1-4 (w:5)', '0-3 (w:6)', '2-4 (w:7)', '1-3 (w:8)'],
    auxiliaryTrack: ['Included', 'Pending', 'Pending', 'Pending', 'Pending', 'Pending'],
    auxiliaryLabel: 'Inclusion Status',
    activeIndices: [0],
    customCard: {
      title: 'First Edge Incorporated',
      rows: [
        { label: 'Candidate Edge', value: '0 - 1 (wt: 2)', accent: true },
        { label: 'DSU Roots', value: 'find(0)=0 != find(1)=1 (No cycle)' },
        { label: 'Union Action', value: 'Merge sets {0} and {1} -> {0, 1}' },
        { label: 'Running MST Weight', value: '0 + 2 = 2' }
      ]
    },
    variables: {
      edgesAdded: '1 / 4',
      currentMstWeight: 2,
      activeEdge: '0-1 (wt: 2)'
    },
    metrics: {
      mstWeight: 2,
      edgesSelected: '1 / 4',
      dsuComponents: 4
    },
    explain: 'Vertices 0 and 1 belong to different components. Add edge 0-1 to MST. MST weight becomes 0 + 2 = 2.',
    intuition: 'The globally cheapest edge is always safe to include in the MST.'
  },
  {
    phase: 'PICK_1_2',
    title: '3. Pick Edge (1-2, wt: 3): Disjoint Sets Unite',
    arr: ['0-1 (w:2)', '1-2 (w:3)', '1-4 (w:5)', '0-3 (w:6)', '2-4 (w:7)', '1-3 (w:8)'],
    auxiliaryTrack: ['Included', 'Included', 'Pending', 'Pending', 'Pending', 'Pending'],
    auxiliaryLabel: 'Inclusion Status',
    activeIndices: [1],
    customCard: {
      title: 'Second Edge Incorporated',
      rows: [
        { label: 'Candidate Edge', value: '1 - 2 (wt: 3)', accent: true },
        { label: 'DSU Roots', value: 'find(1) != find(2) (Cycle-free)' },
        { label: 'Union Action', value: 'Merge {0, 1} and {2} -> {0, 1, 2}' },
        { label: 'Running MST Weight', value: '2 + 3 = 5' }
      ]
    },
    variables: {
      edgesAdded: '2 / 4',
      currentMstWeight: 5,
      activeEdge: '1-2 (wt: 3)'
    },
    metrics: {
      mstWeight: 5,
      edgesSelected: '2 / 4',
      dsuComponents: 3
    },
    explain: 'Vertices 1 and 2 belong to different components. Add edge 1-2 to MST. MST weight = 2 + 3 = 5.',
    intuition: 'Each non-cyclic edge merges two previously disjoint trees into a larger connected forest component.'
  },
  {
    phase: 'PICK_1_4',
    title: '4. Pick Edge (1-4, wt: 5): Disjoint Sets Unite',
    arr: ['0-1 (w:2)', '1-2 (w:3)', '1-4 (w:5)', '0-3 (w:6)', '2-4 (w:7)', '1-3 (w:8)'],
    auxiliaryTrack: ['Included', 'Included', 'Included', 'Pending', 'Pending', 'Pending'],
    auxiliaryLabel: 'Inclusion Status',
    activeIndices: [2],
    customCard: {
      title: 'Third Edge Incorporated',
      rows: [
        { label: 'Candidate Edge', value: '1 - 4 (wt: 5)', accent: true },
        { label: 'DSU Roots', value: 'find(1) != find(4) (Disjoint)' },
        { label: 'Union Action', value: 'Merge {0, 1, 2} and {4} -> {0, 1, 2, 4}' },
        { label: 'Running MST Weight', value: '5 + 5 = 10' }
      ]
    },
    variables: {
      edgesAdded: '3 / 4',
      currentMstWeight: 10,
      activeEdge: '1-4 (wt: 5)'
    },
    metrics: {
      mstWeight: 10,
      edgesSelected: '3 / 4',
      dsuComponents: 2
    },
    explain: 'Edge 1-4 connects component {0, 1, 2} with isolated node 4. MST weight = 5 + 5 = 10.',
    intuition: 'Only one more edge is required to fully span all 5 vertices.'
  },
  {
    phase: 'COMPLETE',
    title: '5. Pick Edge (0-3, wt: 6): V - 1 Edges Selected! MST Complete',
    arr: ['0-1 (w:2)', '1-2 (w:3)', '1-4 (w:5)', '0-3 (w:6)', '2-4 (w:7)', '1-3 (w:8)'],
    auxiliaryTrack: ['Included', 'Included', 'Included', 'Included', 'Skipped', 'Skipped'],
    auxiliaryLabel: 'Final Spanning Status',
    activeIndices: [0, 1, 2, 3],
    customCard: {
      title: 'Spanning Tree Finalized',
      rows: [
        { label: 'Final Selected Edge', value: '0 - 3 (wt: 6)', accent: true },
        { label: 'Total Edges', value: '4 edges (V - 1 = 4)' },
        { label: 'Total MST Weight', value: '2 + 3 + 5 + 6 = 16' },
        { label: 'Skipped Heavy Edges', value: '2-4 (7) and 1-3 (8) avoided (would create cycles)' }
      ]
    },
    variables: {
      edgesAdded: '4 / 4',
      currentMstWeight: 16,
      activeEdge: '0-3 (wt: 6)'
    },
    metrics: {
      mstWeight: 16,
      edgesSelected: '4 / 4',
      dsuComponents: 1
    },
    explain: 'All 5 vertices connected with exactly 4 edges. Further edges skipped. Total MST Weight = 16!',
    intuition: 'Kruskal guarantees minimal total weight while preventing any cycle formation via DSU.'
  }
];

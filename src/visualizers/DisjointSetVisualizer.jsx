export const rendererType = 'dual-array';

export const meta = {
  title: 'Disjoint Set (Union by Rank & Size with Path Compression)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(4 * alpha) ~ O(1) amortized',
  spaceComplexity: 'O(N) for parent, rank/size',
  description: 'Disjoint Set Union (DSU) data structure enabling dynamic connectivity queries and merges in near constant O(alpha) time via path compression and union by rank/size.'
};

export const ideaMap = {
  title: 'DSU Near-Constant Time Amortization Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Self-Representative Initialization',
      detail: 'Set parent[i] = i and size[i] = 1 for all N nodes so each element begins in its own isolated set.'
    },
    {
      id: 'step2',
      label: 'Recursive Path Compression',
      detail: 'findUPar(u) recurses to the root and re-links parent[u] = root, flattening tree depth to near 1.'
    },
    {
      id: 'step3',
      label: 'Union by Size / Rank',
      detail: 'Attach the smaller component under the larger component\'s root, bounding maximum tree depth.'
    },
    {
      id: 'step4',
      label: 'Inverse Ackermann Bound',
      detail: 'Path compression + union-by-size guarantees O(alpha(N)) <= 4 operations for all practical universe sizes.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Disjoint Set Data Structure
// Time Complexity: O(4 * alpha) ~ O(1) amortized | Space: O(N)
#include <vector>
using namespace std;

class DisjointSet {
public:
    vector<int> rank, parent, size;
    DisjointSet(int n) {
        rank.resize(n + 1, 0);
        parent.resize(n + 1);
        size.resize(n + 1, 1);
        for (int i = 0; i <= n; i++) parent[i] = i;
    }
    
    // Find Ultimate Parent with Path Compression
    int findUPar(int node) {
        if (node == parent[node]) return node;
        return parent[node] = findUPar(parent[node]);
    }
    
    // Union By Rank
    void unionByRank(int u, int v) {
        int ulp_u = findUPar(u), ulp_v = findUPar(v);
        if (ulp_u == ulp_v) return;
        if (rank[ulp_u] < rank[ulp_v]) {
            parent[ulp_u] = ulp_v;
        } else if (rank[ulp_v] < rank[ulp_u]) {
            parent[ulp_v] = ulp_u;
        } else {
            parent[ulp_v] = ulp_u;
            rank[ulp_u]++;
        }
    }
    
    // Union By Size
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
};`,
  java: `// Java: Disjoint Set Union
// Time Complexity: O(4 * alpha) ~ O(1) amortized | Space: O(N)
import java.util.*;

class DisjointSet {
    List<Integer> rank = new ArrayList<>();
    List<Integer> parent = new ArrayList<>();
    List<Integer> size = new ArrayList<>();

    public DisjointSet(int n) {
        for (int i = 0; i <= n; i++) {
            rank.add(0);
            parent.add(i);
            size.add(1);
        }
    }

    public int findUPar(int node) {
        if (node == parent.get(node)) return node;
        int ulp = findUPar(parent.get(node));
        parent.set(node, ulp);
        return parent.get(node);
    }

    public void unionBySize(int u, int v) {
        int ulp_u = findUPar(u), ulp_v = findUPar(v);
        if (ulp_u == ulp_v) return;
        if (size.get(ulp_u) < size.get(ulp_v)) {
            parent.set(ulp_u, ulp_v);
            size.set(ulp_v, size.get(ulp_v) + size.get(ulp_u));
        } else {
            parent.set(ulp_v, ulp_u);
            size.set(ulp_u, size.get(ulp_u) + size.get(ulp_v));
        }
    }
}`,
  python: `# Python: Disjoint Set Union
# Time Complexity: O(4 * alpha) ~ O(1) amortized | Space: O(N)
class DisjointSet:
    def __init__(self, n: int):
        self.parent = list(range(n + 1))
        self.size = [1] * (n + 1)
        self.rank = [0] * (n + 1)

    def find_upar(self, node: int) -> int:
        if node == self.parent[node]:
            return node
        self.parent[node] = self.find_upar(self.parent[node])
        return self.parent[node]

    def union_by_size(self, u: int, v: int) -> None:
        pu, pv = self.find_upar(u), self.find_upar(v)
        if pu == pv:
            return
        if self.size[pu] < self.size[pv]:
            self.parent[pu] = pv
            self.size[pv] += self.size[pu]
        else:
            self.parent[pv] = pu
            self.size[pu] += self.size[pv]`,
  javascript: `// JavaScript: Disjoint Set Union
// Time Complexity: O(4 * alpha) ~ O(1) amortized | Space: O(N)
class DisjointSet {
  constructor(n) {
    this.parent = Array.from({ length: n + 1 }, (_, i) => i);
    this.size = new Array(n + 1).fill(1);
    this.rank = new Array(n + 1).fill(0);
  }
  
  findUPar(node) {
    if (node === this.parent[node]) return node;
    return this.parent[node] = this.findUPar(this.parent[node]);
  }
  
  unionBySize(u, v) {
    const pu = this.findUPar(u), pv = this.findUPar(v);
    if (pu === pv) return;
    if (this.size[pu] < this.size[pv]) {
      this.parent[pu] = pv;
      this.size[pv] += this.size[pu];
    } else {
      this.parent[pv] = pu;
      this.size[pu] += this.size[pv];
    }
  }
}`
};

export const steps = [
  {
    phase: 'INIT',
    title: '1. Initialize DSU for Nodes 1 to 5',
    primaryArray: [0, 1, 2, 3, 4, 5],
    primaryLabel: 'Parent Pointers (parent[0..5])',
    secondaryArray: [0, 1, 1, 1, 1, 1],
    secondaryLabel: 'Component Sizes (size[0..5])',
    activeIndicesPrimary: [1, 2, 3, 4, 5],
    activeIndicesSecondary: [1, 2, 3, 4, 5],
    customCard: {
      title: 'DSU Structure Initialized',
      rows: [
        { label: 'Active Nodes', value: 'Nodes 1, 2, 3, 4, 5', accent: true },
        { label: 'Parent Mapping', value: 'parent[i] = i (Every node is own root)' },
        { label: 'Sizes', value: 'size[i] = 1 for each individual set' },
        { label: 'Components Count', value: '5 independent singletons' }
      ]
    },
    variables: {
      operation: 'Initialization',
      findUPar: 'Self-roots',
      activeComponents: 5
    },
    metrics: {
      totalRoots: 5,
      maxComponentSize: 1,
      amortizedCost: 'O(1)'
    },
    explain: 'Initialization: each node is its own representative (parent[i] = i, size[i] = 1).',
    intuition: 'Before any connections are drawn, every vertex lives in its own disjoint singleton universe.'
  },
  {
    phase: 'UNION_1_2',
    title: '2. unionBySize(1, 2): Merge Sets {1} and {2}',
    primaryArray: [0, 1, 1, 3, 4, 5],
    primaryLabel: 'Parent Pointers (parent[0..5])',
    secondaryArray: [0, 2, 1, 1, 1, 1],
    secondaryLabel: 'Component Sizes (size[0..5])',
    activeIndicesPrimary: [1, 2],
    activeIndicesSecondary: [1],
    customCard: {
      title: 'Union Operation (1, 2)',
      rows: [
        { label: 'Roots Compared', value: 'find(1) = 1, find(2) = 2', accent: true },
        { label: 'Sizes', value: 'size[1] = 1, size[2] = 1 (Equal size)' },
        { label: 'Re-Parent Action', value: 'parent[2] = 1' },
        { label: 'Updated Size', value: 'size[1] = 1 + 1 = 2' }
      ]
    },
    variables: {
      operation: 'unionBySize(1, 2)',
      findUPar: 'Root of 2 is now 1',
      activeComponents: 4
    },
    metrics: {
      totalRoots: 4,
      maxComponentSize: 2,
      amortizedCost: 'O(alpha)'
    },
    explain: 'Merge sets {1} and {2}. parent[2] is updated to 1. size[1] becomes 2. Component count decreases to 4.',
    intuition: 'Union combines two subsets into a single subtree without altering unaffected nodes.'
  },
  {
    phase: 'UNION_3_4',
    title: '3. unionBySize(3, 4): Merge Sets {3} and {4}',
    primaryArray: [0, 1, 1, 3, 3, 5],
    primaryLabel: 'Parent Pointers (parent[0..5])',
    secondaryArray: [0, 2, 1, 2, 1, 1],
    secondaryLabel: 'Component Sizes (size[0..5])',
    activeIndicesPrimary: [3, 4],
    activeIndicesSecondary: [3],
    customCard: {
      title: 'Union Operation (3, 4)',
      rows: [
        { label: 'Roots Compared', value: 'find(3) = 3, find(4) = 4', accent: true },
        { label: 'Sizes', value: 'size[3] = 1, size[4] = 1' },
        { label: 'Re-Parent Action', value: 'parent[4] = 3' },
        { label: 'Updated Size', value: 'size[3] = 1 + 1 = 2' }
      ]
    },
    variables: {
      operation: 'unionBySize(3, 4)',
      findUPar: 'Root of 4 is now 3',
      activeComponents: 3
    },
    metrics: {
      totalRoots: 3,
      maxComponentSize: 2,
      amortizedCost: 'O(alpha)'
    },
    explain: 'Merge sets {3} and {4}. parent[4] is updated to 3. size[3] becomes 2.',
    intuition: 'Subtrees maintain balanced shallow heights by always reparenting to the larger or equal root.'
  },
  {
    phase: 'UNION_2_4',
    title: '4. unionBySize(2, 4): Bridges Components {1, 2} & {3, 4}',
    primaryArray: [0, 1, 1, 1, 3, 5],
    primaryLabel: 'Parent Pointers (parent[0..5])',
    secondaryArray: [0, 4, 1, 2, 1, 1],
    secondaryLabel: 'Component Sizes (size[0..5])',
    activeIndicesPrimary: [1, 3],
    activeIndicesSecondary: [1],
    customCard: {
      title: 'Component Fusion (2, 4)',
      rows: [
        { label: 'Ultimate Roots', value: 'find(2) = 1, find(4) = 3', accent: true },
        { label: 'Sizes', value: 'size[1] = 2, size[3] = 2' },
        { label: 'Re-Parent Action', value: 'parent[3] = 1' },
        { label: 'Updated Size', value: 'size[1] = 2 + 2 = 4 ({1, 2, 3, 4})' }
      ]
    },
    variables: {
      operation: 'unionBySize(2, 4)',
      findUPar: 'Root of 3 is now 1',
      activeComponents: 2
    },
    metrics: {
      totalRoots: 2,
      maxComponentSize: 4,
      amortizedCost: 'O(alpha)'
    },
    explain: 'findUPar(2) = 1, findUPar(4) = 3. Since both components have equal size 2, set parent[3] = 1 and size[1] = 4.',
    intuition: 'Union is always performed on the ultimate parents of the elements, never directly on child pointers.'
  },
  {
    phase: 'PATH_COMPRESSION',
    title: '5. Path Compression on findUPar(4): Flattens parent[4] -> 1!',
    primaryArray: [0, 1, 1, 1, 1, 5],
    primaryLabel: 'Flattened Parent Pointers (parent[0..5])',
    secondaryArray: [0, 4, 1, 2, 1, 1],
    secondaryLabel: 'Component Sizes (size[0..5])',
    activeIndicesPrimary: [4],
    activeIndicesSecondary: [1],
    customCard: {
      title: 'Path Compression Effect',
      rows: [
        { label: 'Query', value: 'findUPar(4)', accent: true },
        { label: 'Original Traversal', value: '4 -> 3 -> 1 (Depth 2)' },
        { label: 'Flattening Update', value: 'parent[4] = 1 (Direct link!)' },
        { label: 'Subsequent Calls', value: 'findUPar(4) executes in O(1) immediately' }
      ]
    },
    variables: {
      operation: 'findUPar(4) with Path Compression',
      findUPar: 'Direct pointer: parent[4] = 1',
      activeComponents: 2
    },
    metrics: {
      totalRoots: 2,
      maxComponentSize: 4,
      amortizedCost: 'O(1) flat'
    },
    explain: 'findUPar(4) traverses up to root 1 and rewrites parent[4] = 1. The subtree depth is compressed to 1 for all future lookups!',
    intuition: 'Path compression flattens the tree dynamically during read operations, ensuring ultra-fast future queries.'
  }
];

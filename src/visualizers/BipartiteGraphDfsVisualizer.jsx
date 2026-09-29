export const rendererType = 'array-scan';

export const meta = {
  title: 'Bipartite Graph (DFS)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V + 2E)',
  spaceComplexity: 'O(V) recursion stack & color array',
  description: 'Determines if a graph is Bipartite using DFS 2-Coloring. A graph is bipartite if and only if vertices can be partitioned into two sets colored with 0 and 1 without adjacent nodes sharing a color (no odd cycles).'
};

export const ideaMap = {
  title: 'Bipartite 2-Coloring DFS Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Color Array Initialization',
      detail: 'Initialize color array with -1 for all V vertices indicating uncolored state.'
    },
    {
      id: 'step2',
      label: 'Root Node Assignment',
      detail: 'For each unvisited component root, assign color[root] = 0 and begin DFS traversal.'
    },
    {
      id: 'step3',
      label: 'Alternating Color Propagation',
      detail: 'For each neighbor v of u, if uncolored, recursively color with 1 - color[u]. If already colored with same color, return false (odd cycle).'
    },
    {
      id: 'step4',
      label: 'Bipartition Confirmation',
      detail: 'If all components complete 2-coloring without conflict, the graph can be partitioned into two independent sets.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Is Graph Bipartite? (DFS)
// Time Complexity: O(V + 2E) | Space Complexity: O(V)
#include <vector>
using namespace std;

class Solution {
private:
    bool dfs(int node, int col, vector<int>& color, vector<vector<int>>& graph) {
        color[node] = col;
        for (int neighbor : graph[node]) {
            if (color[neighbor] == -1) {
                if (!dfs(neighbor, !col, color, graph)) return false;
            }
            else if (color[neighbor] == col) {
                // Same color adjacent! Odd cycle detected.
                return false;
            }
        }
        return true;
    }
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int V = graph.size();
        vector<int> color(V, -1);
        for (int i = 0; i < V; i++) {
            if (color[i] == -1) {
                if (!dfs(i, 0, color, graph)) return false;
            }
        }
        return true;
    }
};`,
  java: `// Java: Is Graph Bipartite? (DFS)
// Time Complexity: O(V + 2E) | Space Complexity: O(V)
import java.util.Arrays;

class Solution {
    private boolean dfs(int node, int col, int[] color, int[][] graph) {
        color[node] = col;
        for (int it : graph[node]) {
            if (color[it] == -1) {
                if (!dfs(it, 1 - col, color, graph)) return false;
            } else if (color[it] == col) {
                return false;
            }
        }
        return true;
    }
    public boolean isBipartite(int[][] graph) {
        int n = graph.length;
        int[] color = new int[n];
        Arrays.fill(color, -1);
        for (int i = 0; i < n; i++) {
            if (color[i] == -1) {
                if (!dfs(i, 0, color, graph)) return false;
            }
        }
        return true;
    }
}`,
  python: `# Python: Is Graph Bipartite? (DFS)
# Time Complexity: O(V + 2E) | Space Complexity: O(V)
class Solution:
    def isBipartite(self, graph: list[list[int]]) -> bool:
        n = len(graph)
        color = [-1] * n
        
        def dfs(u: int, c: int) -> bool:
            color[u] = c
            for v in graph[u]:
                if color[v] == -1:
                    if not dfs(v, 1 - c):
                        return False
                elif color[v] == c:
                    return False
            return True
            
        for i in range(n):
            if color[i] == -1:
                if not dfs(i, 0):
                    return False
        return True`,
  javascript: `// JavaScript: Is Graph Bipartite? (DFS)
// Time Complexity: O(V + 2E) | Space Complexity: O(V)
function isBipartite(graph) {
  const n = graph.length;
  const color = new Array(n).fill(-1);
  
  function dfs(u, c) {
    color[u] = c;
    for (const v of graph[u]) {
      if (color[v] === -1) {
        if (!dfs(v, 1 - c)) return false;
      } else if (color[v] === c) {
        return false;
      }
    }
    return true;
  }
  
  for (let i = 0; i < n; i++) {
    if (color[i] === -1 && !dfs(i, 0)) return false;
  }
  return true;
}`
};

export const steps = [
  {
    phase: 'COLOR_0',
    title: '1. Seed Node 0 with Color 0 (Set A)',
    arr: [0, 1, 2, 3],
    auxiliaryTrack: ['Color 0', 'Uncolored', 'Uncolored', 'Uncolored'],
    auxiliaryLabel: 'Partition Sets (color[0..3])',
    activeIndices: [0],
    customCard: {
      title: '2-Coloring Initialization',
      rows: [
        { label: 'Start Node', value: 'Node 0', accent: true },
        { label: 'Assigned Color', value: '0 (Set A / Cyan)' },
        { label: 'Graph Topology', value: 'Cycle 0 - 1 - 2 - 3 - 0 (4 vertices)' },
        { label: 'Odd Cycle Check', value: 'Even 4-cycle should be bipartite' }
      ]
    },
    variables: {
      activeNode: 0,
      currentColor: 0,
      coloredCount: '1 / 4',
      conflict: 'None'
    },
    metrics: {
      colored: '1 / 4',
      oddCycleFound: 'No',
      bipartite: 'True so far'
    },
    explain: 'Initialize color array to -1. Paint node 0 with Color 0 (Set A). Next, visit uncolored neighbor node 1.',
    intuition: 'Any graph with no odd cycles can be cleanly partitioned into two mutually exclusive sets.'
  },
  {
    phase: 'COLOR_1',
    title: '2. DFS to Node 1: Invert Color to 1 (Set B)',
    arr: [0, 1, 2, 3],
    auxiliaryTrack: ['Color 0', 'Color 1', 'Uncolored', 'Uncolored'],
    auxiliaryLabel: 'Partition Sets (color[0..3])',
    activeIndices: [1],
    customCard: {
      title: 'Color Alternation to Neighbor 1',
      rows: [
        { label: 'Current Edge', value: 'Edge 0 - 1', accent: true },
        { label: 'Parent Node', value: 'Node 0 (Color 0)' },
        { label: 'Assigned Color', value: '1 - 0 = 1 (Set B / Purple)' },
        { label: 'Color Conflict', value: 'None (0 != 1)' }
      ]
    },
    variables: {
      activeNode: 1,
      currentColor: 1,
      coloredCount: '2 / 4',
      conflict: 'None'
    },
    metrics: {
      colored: '2 / 4',
      oddCycleFound: 'No',
      bipartite: 'True so far'
    },
    explain: 'DFS moves across edge 0 - 1 to neighbor 1. Invert color: 1 - 0 = 1 (Set B). No color conflict detected.',
    intuition: 'Adjacent vertices must always receive opposite parity colors.'
  },
  {
    phase: 'COLOR_2',
    title: '3. DFS to Node 2: Invert Color to 0 (Set A)',
    arr: [0, 1, 2, 3],
    auxiliaryTrack: ['Color 0', 'Color 1', 'Color 0', 'Uncolored'],
    auxiliaryLabel: 'Partition Sets (color[0..3])',
    activeIndices: [2],
    customCard: {
      title: 'Color Alternation to Neighbor 2',
      rows: [
        { label: 'Current Edge', value: 'Edge 1 - 2', accent: true },
        { label: 'Parent Node', value: 'Node 1 (Color 1)' },
        { label: 'Assigned Color', value: '1 - 1 = 0 (Set A / Cyan)' },
        { label: 'Color Conflict', value: 'None (1 != 0)' }
      ]
    },
    variables: {
      activeNode: 2,
      currentColor: 0,
      coloredCount: '3 / 4',
      conflict: 'None'
    },
    metrics: {
      colored: '3 / 4',
      oddCycleFound: 'No',
      bipartite: 'True so far'
    },
    explain: 'DFS traverses edge 1 - 2 to neighbor 2. Invert color: 1 - 1 = 0 (Set A). Node 2 shares Set A with node 0.',
    intuition: 'Vertices separated by an even distance naturally belong to the same bipartite partition.'
  },
  {
    phase: 'COLOR_3',
    title: '4. DFS to Node 3: Color 1 (Set B) & Cycle Closure Verified',
    arr: [0, 1, 2, 3],
    auxiliaryTrack: ['Color 0', 'Color 1', 'Color 0', 'Color 1'],
    auxiliaryLabel: 'Final Bipartite Partition Sets',
    activeIndices: [0, 1, 2, 3],
    customCard: {
      title: 'Bipartition Fully Validated',
      rows: [
        { label: 'Set A (Color 0)', value: '{ Node 0, Node 2 }', accent: true },
        { label: 'Set B (Color 1)', value: '{ Node 1, Node 3 }' },
        { label: 'Closing Edge 3 - 0', value: 'color[3]=1 != color[0]=0 (Valid!)' },
        { label: 'Result', value: 'isBipartite = true' }
      ]
    },
    variables: {
      activeNode: 3,
      currentColor: 1,
      coloredCount: '4 / 4',
      conflict: 'Zero'
    },
    metrics: {
      colored: '4 / 4',
      oddCycleFound: 'No',
      bipartite: 'True (Verified)'
    },
    explain: 'Node 3 colored 1. Edge 3 - 0 connects back to node 0 (color 0); since 1 != 0, no conflict exists! Graph is bipartite (true).',
    intuition: 'A graph is bipartite if and only if it contains no odd length cycles.'
  }
];

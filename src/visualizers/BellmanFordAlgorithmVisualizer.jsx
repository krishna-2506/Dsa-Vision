export const rendererType = 'array-scan';

export const meta = {
  title: 'Bellman-Ford Algorithm',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V * E)',
  spaceComplexity: 'O(V)',
  description: 'Finds shortest paths from a single source even with negative edge weights, and detects negative weight cycles by relaxing all edges V - 1 times.'
};

export const ideaMap = {
  title: 'Bellman-Ford Dynamic Programming Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Distance Initialization',
      detail: 'Set dist[S] = 0 and all other vertices to infinity (1e8); graph contains V vertices and E directed edges.'
    },
    {
      id: 'step2',
      label: 'V - 1 Iterative Passes',
      detail: 'Iterate over all E edges V - 1 times. If dist[u] + wt < dist[v], update dist[v] = dist[u] + wt.'
    },
    {
      id: 'step3',
      label: 'Negative Cycle Check',
      detail: 'Perform an Nth pass over all edges. If any distance strictly decreases, a negative cycle is present.'
    },
    {
      id: 'step4',
      label: 'Convergence Guarantee',
      detail: 'A simple shortest path in a graph with V vertices contains at most V - 1 edges.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Bellman-Ford Algorithm
// Time: O(V * E) | Space: O(V)
#include <vector>
using namespace std;

vector<int> bellmanFord(int V, vector<vector<int>>& edges, int S) {
    vector<int> dist(V, 1e8);
    dist[S] = 0;
    
    // Relax all edges V - 1 times
    for (int i = 0; i < V - 1; i++) {
        for (auto it : edges) {
            int u = it[0], v = it[1], wt = it[2];
            if (dist[u] != 1e8 && dist[u] + wt < dist[v]) {
                dist[v] = dist[u] + wt;
            }
        }
    }
    
    // Nth relaxation to detect negative cycle
    for (auto it : edges) {
        int u = it[0], v = it[1], wt = it[2];
        if (dist[u] != 1e8 && dist[u] + wt < dist[v]) {
            return {-1}; // Negative cycle detected!
        }
    }
    return dist;
}`,
  java: `// Java: Bellman-Ford Algorithm
// Time: O(V * E) | Space: O(V)
import java.util.*;

class Solution {
    static int[] bellmanFord(int V, int[][] edges, int src) {
        int[] dist = new int[V];
        Arrays.fill(dist, (int)1e8);
        dist[src] = 0;
        
        for (int i = 0; i < V - 1; i++) {
            for (int[] e : edges) {
                int u = e[0], v = e[1], wt = e[2];
                if (dist[u] != (int)1e8 && dist[u] + wt < dist[v]) {
                    dist[v] = dist[u] + wt;
                }
            }
        }
        
        for (int[] e : edges) {
            int u = e[0], v = e[1], wt = e[2];
            if (dist[u] != (int)1e8 && dist[u] + wt < dist[v]) {
                return new int[]{-1}; // Negative cycle
            }
        }
        return dist;
    }
}`,
  python: `# Python: Bellman-Ford Algorithm
# Time: O(V * E) | Space: O(V)
def bellmanFord(V, edges, S):
    dist = [int(1e8)] * V
    dist[S] = 0
    
    # Relax edges V - 1 times
    for _ in range(V - 1):
        for u, v, wt in edges:
            if dist[u] != int(1e8) and dist[u] + wt < dist[v]:
                dist[v] = dist[u] + wt
                
    # Check for negative cycle
    for u, v, wt in edges:
        if dist[u] != int(1e8) and dist[u] + wt < dist[v]:
            return [-1]
            
    return dist`,
  javascript: `// JavaScript: Bellman-Ford Algorithm
// Time: O(V * E) | Space: O(V)
function bellmanFord(V, edges, S) {
  const dist = new Array(V).fill(1e8);
  dist[S] = 0;
  
  for (let i = 0; i < V - 1; i++) {
    for (const [u, v, wt] of edges) {
      if (dist[u] !== 1e8 && dist[u] + wt < dist[v]) {
        dist[v] = dist[u] + wt;
      }
    }
  }
  
  for (const [u, v, wt] of edges) {
    if (dist[u] !== 1e8 && dist[u] + wt < dist[v]) {
      return [-1];
    }
  }
  return dist;
}`
};

export const steps = [
  {
    phase: 'INITIALIZE',
    title: '1. Initialize Distances: dist[0] = 0, V = 4',
    arr: [0, 1, 2, 3],
    auxiliaryTrack: ['0', '∞', '∞', '∞'],
    auxiliaryLabel: 'Distance Vector (dist[0..3])',
    activeIndices: [0],
    customCard: {
      title: 'Bellman-Ford Setup',
      rows: [
        { label: 'Source Vertex', value: 'Vertex 0', accent: true },
        { label: 'Total Vertices (V)', value: '4 nodes (V - 1 = 3 passes)' },
        { label: 'Edges', value: '0-(4)->1, 0-(5)->2, 1-(-10)->2, 2-(3)->3' },
        { label: 'Negative Weight Support', value: 'Enabled' }
      ]
    },
    variables: {
      pass: '0 / 3',
      currentSource: 0,
      negativeCycle: 'None',
      distValues: '[0, ∞, ∞, ∞]'
    },
    metrics: {
      currentPass: '0 / 3',
      edgesRelaxed: 0,
      cycleDetected: 'No'
    },
    explain: 'Starting vertex 0 with distance 0. With V = 4 vertices, a maximum of V - 1 = 3 relaxation passes are required for complete convergence.',
    intuition: 'Each pass guarantees that the shortest paths of length at most k edges are correctly computed.'
  },
  {
    phase: 'PASS_1',
    title: '2. Pass 1 / 3: Relax Outgoing Edges from Source 0',
    arr: [0, 1, 2, 3],
    auxiliaryTrack: ['0', '4', '5', '∞'],
    auxiliaryLabel: 'Distance Vector (dist[0..3])',
    activeIndices: [1, 2],
    customCard: {
      title: 'Pass 1 Relaxations',
      rows: [
        { label: 'Edge 0 -> 1 (wt 4)', value: '0 + 4 = 4 < ∞ (Updated!)', accent: true },
        { label: 'Edge 0 -> 2 (wt 5)', value: '0 + 5 = 5 < ∞ (Updated!)' },
        { label: 'Edge 1 -> 2 (wt -10)', value: 'Relaxed later in pass' },
        { label: 'Edge 2 -> 3 (wt 3)', value: 'dist[3] updated if reachable' }
      ]
    },
    variables: {
      pass: '1 / 3',
      currentSource: 0,
      negativeCycle: 'None',
      distValues: '[0, 4, 5, ∞]'
    },
    metrics: {
      currentPass: '1 / 3',
      edgesRelaxed: 2,
      cycleDetected: 'No'
    },
    explain: 'Edges 0-(4)->1 and 0-(5)->2 relaxed. dist[1] = 4, dist[2] = 5.',
    intuition: 'After Pass 1, all single-hop shortest paths from source 0 are settled.'
  },
  {
    phase: 'PASS_2',
    title: '3. Pass 2 / 3: Negative Edge 1-(-10)->2 Overrides dist[2]',
    arr: [0, 1, 2, 3],
    auxiliaryTrack: ['0', '4', '-6', '8'],
    auxiliaryLabel: 'Distance Vector (dist[0..3])',
    activeIndices: [2, 3],
    customCard: {
      title: 'Pass 2 Negative Weight Absorption',
      rows: [
        { label: 'Edge 1 -> 2 (wt -10)', value: '4 + (-10) = -6 < 5 (Overwritten!)', accent: true },
        { label: 'Edge 2 -> 3 (wt 3)', value: '5 + 3 = 8 < ∞ (Updated)' },
        { label: 'New dist[2]', value: '-6' },
        { label: 'New dist[3]', value: '8' }
      ]
    },
    variables: {
      pass: '2 / 3',
      currentSource: 1,
      negativeCycle: 'None',
      distValues: '[0, 4, -6, 8]'
    },
    metrics: {
      currentPass: '2 / 3',
      edgesRelaxed: 4,
      cycleDetected: 'No'
    },
    explain: 'Negative edge 1-(-10)->2 dramatically reduces dist[2] to 4 - 10 = -6! Edge 2-(3)->3 sets dist[3] to 5 + 3 = 8 based on previous dist[2].',
    intuition: 'Negative edge weights decrease path costs, which Dijkstra cannot handle safely without cycle penalties.'
  },
  {
    phase: 'PASS_3',
    title: '4. Pass 3 / 3: Cascade Negative Improvement to Vertex 3',
    arr: [0, 1, 2, 3],
    auxiliaryTrack: ['0', '4', '-6', '-3'],
    auxiliaryLabel: 'Distance Vector (dist[0..3])',
    activeIndices: [3],
    customCard: {
      title: 'Pass 3 Propagated Improvement',
      rows: [
        { label: 'Edge 2 -> 3 (wt 3)', value: '-6 + 3 = -3 < 8 (Overwritten!)', accent: true },
        { label: 'Final dist[3]', value: '-3' },
        { label: 'Pass Status', value: 'All 3 edge-count bounds resolved' }
      ]
    },
    variables: {
      pass: '3 / 3',
      currentSource: 2,
      negativeCycle: 'None',
      distValues: '[0, 4, -6, -3]'
    },
    metrics: {
      currentPass: '3 / 3',
      edgesRelaxed: 5,
      cycleDetected: 'No'
    },
    explain: 'Edge 2-(3)->3 relaxed with the new dist[2] = -6. dist[3] drops from 8 to -6 + 3 = -3.',
    intuition: 'The 3rd pass completes propagation for paths containing up to 3 edges.'
  },
  {
    phase: 'VERIFIED',
    title: '5. Pass 4 (N-th check): No Further Reductions (No Negative Cycle)',
    arr: [0, 1, 2, 3],
    auxiliaryTrack: ['0', '4', '-6', '-3'],
    auxiliaryLabel: 'Optimal Shortest Distances',
    activeIndices: [0, 1, 2, 3],
    customCard: {
      title: 'Negative Cycle Verification Pass',
      rows: [
        { label: '4th Pass Result', value: 'Zero distance changes', accent: true },
        { label: 'Negative Cycle Status', value: 'Absent (Graph is clean)' },
        { label: 'Final Distances', value: '[0, 4, -6, -3]' },
        { label: 'Conclusion', value: 'Valid global shortest paths confirmed' }
      ]
    },
    variables: {
      pass: '4 / 3 (Check)',
      currentSource: 'All',
      negativeCycle: 'None (Safe)',
      distValues: '[0, 4, -6, -3]'
    },
    metrics: {
      currentPass: 'Verified',
      edgesRelaxed: 0,
      cycleDetected: 'No'
    },
    explain: '4th pass confirms no further changes. Graph is free of negative weight cycles. Final distances: [0, 4, -6, -3].',
    intuition: 'If an edge could still relax after V - 1 passes, an infinite negative cycle loop would be actively draining distance.'
  }
];

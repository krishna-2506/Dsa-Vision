export const rendererType = 'dp-grid';

export const meta = {
  title: 'Floyd-Warshall Algorithm',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V^3)',
  spaceComplexity: 'O(V^2)',
  description: 'Computes all-pairs shortest paths using Dynamic Programming by considering every vertex K as an intermediate stepping stone: matrix[i][j] = min(matrix[i][j], matrix[i][k] + matrix[k][j]).'
};

export const ideaMap = {
  title: 'All-Pairs Shortest Path Tri-Loop Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Distance Matrix Initialization',
      detail: 'Set matrix[i][i] = 0 on diagonal, direct edge weights matrix[u][v] = wt, and all unreachable pairs to infinity (1e9).'
    },
    {
      id: 'step2',
      label: 'Intermediate Pivot Loop (k)',
      detail: 'Iterate intermediate vertex k from 0 to V - 1 as a candidate relay node between all pairs (i, j).'
    },
    {
      id: 'step3',
      label: 'All-Pairs Relaxation (i, j)',
      detail: 'Relax distance matrix: matrix[i][j] = min(matrix[i][j], matrix[i][k] + matrix[k][j]).'
    },
    {
      id: 'step4',
      label: 'Negative Cycle Verification',
      detail: 'If any matrix[i][i] < 0 after completion, a negative weight cycle exists in the graph.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Floyd-Warshall All-Pairs Shortest Path
// Time Complexity: O(V^3) | Space Complexity: O(V^2)
#include <vector>
#include <algorithm>
using namespace std;

void floydWarshall(vector<vector<int>>& matrix) {
    int n = matrix.size();
    
    // Replace -1 with a large value representing INF
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (matrix[i][j] == -1) matrix[i][j] = 1e9;
            if (i == j) matrix[i][j] = 0;
        }
    }
    
    // Triple loop: intermediate vertex k
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][k] != 1e9 && matrix[k][j] != 1e9) {
                    matrix[i][j] = min(matrix[i][j], matrix[i][k] + matrix[k][j]);
                }
            }
        }
    }
    
    // Negative cycle detection: if matrix[i][i] < 0
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (matrix[i][j] == 1e9) matrix[i][j] = -1;
        }
    }
}`,
  java: `// Java: Floyd-Warshall Algorithm
// Time Complexity: O(V^3) | Space Complexity: O(V^2)
class Solution {
    public void shortest_distance(int[][] matrix) {
        int n = matrix.length;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == -1) matrix[i][j] = (int)1e9;
                if (i == j) matrix[i][j] = 0;
            }
        }
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    matrix[i][j] = Math.min(matrix[i][j], matrix[i][k] + matrix[k][j]);
                }
            }
        }
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == (int)1e9) matrix[i][j] = -1;
            }
        }
    }
}`,
  python: `# Python: Floyd-Warshall Algorithm
# Time Complexity: O(V^3) | Space Complexity: O(V^2)
def floydWarshall(matrix: list[list[int]]):
    n = len(matrix)
    for i in range(n):
        for j in range(n):
            if matrix[i][j] == -1:
                matrix[i][j] = float('inf')
            if i == j:
                matrix[i][j] = 0
                
    for k in range(n):
        for i in range(n):
            for j in range(n):
                matrix[i][j] = min(matrix[i][j], matrix[i][k] + matrix[k][j])
                
    for i in range(n):
        for j in range(n):
            if matrix[i][j] == float('inf'):
                matrix[i][j] = -1`,
  javascript: `// JavaScript: Floyd-Warshall Algorithm
// Time Complexity: O(V^3) | Space Complexity: O(V^2)
function floydWarshall(matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === -1) matrix[i][j] = Infinity;
      if (i === j) matrix[i][j] = 0;
    }
  }
  
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.min(matrix[i][j], matrix[i][k] + matrix[k][j]);
      }
    }
  }
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === Infinity) matrix[i][j] = -1;
    }
  }
}`
};

export const steps = [
  {
    phase: 'INITIAL',
    title: '1. Initial Adjacency Matrix (Direct Edges Only)',
    rowLabels: ['v0', 'v1', 'v2', 'v3'],
    colLabels: ['v0', 'v1', 'v2', 'v3'],
    grid: [
      [0, 2, '∞', '∞'],
      [1, 0, 3, '∞'],
      ['∞', '∞', 0, '∞'],
      [3, 5, 4, 0]
    ],
    activeCell: null,
    formula: 'matrix[i][j] = directEdgeWeight(i, j)',
    customCard: {
      title: 'Initial State Setup',
      rows: [
        { label: 'Relay Pivot (k)', value: 'None (Direct paths only)', accent: true },
        { label: 'Diagonal [i][i]', value: '0 (Zero self-distance)' },
        { label: 'Unreachable Pairs', value: 'Set to ∞ (1e9)' },
        { label: 'Goal', value: 'Evaluate all V=4 nodes as stepping stones' }
      ]
    },
    variables: {
      k: 'None',
      activePair: 'None',
      negativeCycle: 'None'
    },
    metrics: {
      currentPivot: 'Initial',
      shortcutsFound: 0,
      complexity: 'O(V³)'
    },
    explain: 'Direct edge weights are loaded into the distance matrix. Diagonal distances are 0; disconnected vertices are initialized to ∞.',
    intuition: 'Before introducing intermediate nodes, all paths are constrained to single-hop direct edges.'
  },
  {
    phase: 'VIA_K_0',
    title: '2. Intermediate Vertex k = 0 (Evaluating Shortcuts via Node 0)',
    rowLabels: ['v0', 'v1', 'v2', 'v3'],
    colLabels: ['v0', 'v1', 'v2', 'v3'],
    grid: [
      [0, 2, '∞', '∞'],
      [1, 0, 3, '∞'],
      ['∞', '∞', 0, '∞'],
      [3, 5, 4, 0]
    ],
    activeCell: { r: 3, c: 1 },
    formula: 'matrix[3][1] = min(5, matrix[3][0] + matrix[0][1]) = min(5, 3 + 2) = 5',
    customCard: {
      title: 'Pivot Node k = 0 Relaxations',
      rows: [
        { label: 'Relay Pivot (k)', value: 'Node 0', accent: true },
        { label: 'Test Pair (3, 1)', value: 'dist(3->0) + dist(0->1) = 3 + 2 = 5' },
        { label: 'Existing dist(3->1)', value: '5 (Tie, no strictly shorter detour)' },
        { label: 'Status', value: 'No matrix entries modified' }
      ]
    },
    variables: {
      k: 0,
      activePair: '(v3, v1)',
      negativeCycle: 'None'
    },
    metrics: {
      currentPivot: 'k = 0',
      shortcutsFound: 0,
      complexity: 'O(V³)'
    },
    explain: 'Evaluating shortcuts using vertex 0 as intermediate stepping stone. Pair (3, 1) has path 3 -> 0 -> 1 of cost 3 + 2 = 5, equal to existing weight.',
    intuition: 'Allowing node 0 as a layover creates two-hop routes between pairs that can transit through node 0.'
  },
  {
    phase: 'VIA_K_1',
    title: '3. Intermediate Vertex k = 1: Discovers Shortcut matrix[0][2] = 5!',
    rowLabels: ['v0', 'v1', 'v2', 'v3'],
    colLabels: ['v0', 'v1', 'v2', 'v3'],
    grid: [
      [0, 2, 5, '∞'],
      [1, 0, 3, '∞'],
      ['∞', '∞', 0, '∞'],
      [3, 5, 4, 0]
    ],
    activeCell: { r: 0, c: 2 },
    formula: 'matrix[0][2] = min(∞, matrix[0][1] + matrix[1][2]) = min(∞, 2 + 3) = 5',
    customCard: {
      title: 'Pivot Node k = 1 Shortcut Discovery',
      rows: [
        { label: 'Relay Pivot (k)', value: 'Node 1', accent: true },
        { label: 'Detour Route', value: '0 -> 1 (wt: 2) + 1 -> 2 (wt: 3) = 5' },
        { label: 'Previous [0][2]', value: '∞ (Disconnected) -> Updated to 5!' },
        { label: 'Shortcut Benefit', value: 'Enables reachability from 0 to 2' }
      ]
    },
    variables: {
      k: 1,
      activePair: '(v0, v2)',
      negativeCycle: 'None'
    },
    metrics: {
      currentPivot: 'k = 1',
      shortcutsFound: 1,
      complexity: 'O(V³)'
    },
    explain: 'matrix[0][2] = min(∞, matrix[0][1] + matrix[1][2]) = 2 + 3 = 5! A new shortcut connecting vertex 0 to vertex 2 via node 1 is established.',
    intuition: 'Dynamic programming incrementally builds multi-hop shortest paths by compounding previously validated shorter segments.'
  },
  {
    phase: 'COMPLETE',
    title: '4. Final All-Pairs Distance Matrix Resolved (k = 0..3 Complete)',
    rowLabels: ['v0', 'v1', 'v2', 'v3'],
    colLabels: ['v0', 'v1', 'v2', 'v3'],
    grid: [
      [0, 2, 5, '∞'],
      [1, 0, 3, '∞'],
      ['∞', '∞', 0, '∞'],
      [3, 5, 4, 0]
    ],
    activeCell: null,
    formula: 'matrix[i][j] = optimal geodesic distance between all pairs (i, j)',
    customCard: {
      title: 'Floyd-Warshall Complete',
      rows: [
        { label: 'All Pivots Evaluated', value: 'k = 0, 1, 2, 3 complete', accent: true },
        { label: 'Negative Cycle Check', value: 'All diagonal entries matrix[i][i] == 0 (Clean)' },
        { label: 'Total Operations', value: 'V³ = 4³ = 64 comparisons' },
        { label: 'Result', value: 'All-Pairs Shortest Path matrix finalized' }
      ]
    },
    variables: {
      k: 'Completed',
      activePair: 'All',
      negativeCycle: 'Zero'
    },
    metrics: {
      currentPivot: 'Done',
      shortcutsFound: 1,
      complexity: 'O(V³)'
    },
    explain: 'All pairs processed across all V intermediate nodes in O(V³) operations. Negative cycles absent as diagonal values remain 0.',
    intuition: 'Once all vertices have functioned as pivots, every conceivable path combination has been compared.'
  }
];

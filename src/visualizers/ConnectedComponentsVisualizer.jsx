export const rendererType = 'array-scan';

export const meta = {
  title: 'Connected Components in Graph',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Easy',
  timeComplexity: 'O(V + 2E)',
  spaceComplexity: 'O(V) visited array',
  description: 'Discovers all isolated subgraphs (connected components) in an undirected graph by iterating through vertices 1..V and launching a new traversal (DFS or BFS) whenever an unvisited vertex is encountered.'
};

export const ideaMap = {
  title: 'Connected Components Traversal Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Outer Loop (1..V)',
      detail: 'Iterate through every vertex index from 1 to V to ensure all disconnected subgraphs are checked.'
    },
    {
      id: 'step2',
      label: 'Unvisited Node Detection',
      detail: 'If vis[i] == 0, vertex i belongs to a newly discovered component not reachable from previous vertices.'
    },
    {
      id: 'step3',
      label: 'Component Flood Fill (DFS/BFS)',
      detail: 'Increment component counter and launch DFS/BFS from vertex i, marking every mutually reachable node as visited.'
    },
    {
      id: 'step4',
      label: 'Skip Visited Nodes',
      detail: 'Subsequent iterations where vis[i] == 1 are part of an already explored component and are skipped in O(1).'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Count Connected Components
// Time Complexity: O(V + 2E) | Space Complexity: O(V)
#include <vector>
using namespace std;

void dfs(int node, vector<vector<int>>& adj, vector<int>& vis) {
    vis[node] = 1;
    for (int neighbor : adj[node]) {
        if (!vis[neighbor]) {
            dfs(neighbor, adj, vis);
        }
    }
}

int countConnectedComponents(int V, vector<vector<int>>& adj) {
    vector<int> vis(V + 1, 0);
    int components = 0;
    
    for (int i = 1; i <= V; ++i) {
        if (!vis[i]) {
            components++;
            dfs(i, adj, vis); // Explore entire connected cluster
        }
    }
    return components;
}`,
  java: `// Java: Count Connected Components (DFS)
// Time Complexity: O(V + 2E) | Space Complexity: O(V)
import java.util.*;

class Solution {
    private void dfs(int node, List<List<Integer>> adj, int[] vis) {
        vis[node] = 1;
        for (int neighbor : adj.get(node)) {
            if (vis[neighbor] == 0) {
                dfs(neighbor, adj, vis);
            }
        }
    }
    
    public int countComponents(int V, List<List<Integer>> adj) {
        int[] vis = new int[V + 1];
        int count = 0;
        
        for (int i = 1; i <= V; i++) {
            if (vis[i] == 0) {
                count++;
                dfs(i, adj, vis);
            }
        }
        return count;
    }
}`,
  python: `# Python: Count Connected Components (DFS)
# Time Complexity: O(V + 2E) | Space Complexity: O(V)
def count_components(V, adj):
    vis = [0] * (V + 1)
    components = 0
    
    def dfs(node):
        vis[node] = 1
        for neighbor in adj[node]:
            if not vis[neighbor]:
                dfs(neighbor)
                
    for i in range(1, V + 1):
        if not vis[i]:
            components += 1
            dfs(i)
            
    return components`,
  javascript: `// JavaScript: Count Connected Components (DFS)
// Time Complexity: O(V + 2E) | Space Complexity: O(V)
function countComponents(V, adj) {
  const vis = new Array(V + 1).fill(0);
  let count = 0;
  
  function dfs(node) {
    vis[node] = 1;
    for (const neighbor of adj[node]) {
      if (!vis[neighbor]) {
        dfs(neighbor);
      }
    }
  }
  
  for (let i = 1; i <= V; i++) {
    if (!vis[i]) {
      count++;
      dfs(i);
    }
  }
  return count;
}`
};

export const steps = [
  {
    phase: 'INIT',
    title: '1. Initialize Visited Array for Vertices 1..7',
    arr: [1, 2, 3, 4, 5, 6, 7],
    auxiliaryTrack: ['Unvisited', 'Unvisited', 'Unvisited', 'Unvisited', 'Unvisited', 'Unvisited', 'Unvisited'],
    auxiliaryLabel: 'Component Membership',
    activeIndices: [],
    customCard: {
      title: 'Graph Components Overview',
      rows: [
        { label: 'Total Vertices (V)', value: '7' },
        { label: 'Subgraphs', value: '{1,2,3}, {4,5}, {6,7}' },
        { label: 'Components Found', value: '0', accent: true },
        { label: 'Outer Loop Pointer', value: 'i = 1' }
      ]
    },
    variables: {
      activeI: 1,
      componentsCount: 0,
      currentTraversal: 'None'
    },
    explanation: 'Allocate vis[1..7] initialized to 0. Graph contains 7 vertices divided across disconnected clusters.'
  },
  {
    phase: 'COMPONENT_1_START',
    title: '2. Node 1 is Unvisited: Discover Component #1',
    arr: [1, 2, 3, 4, 5, 6, 7],
    auxiliaryTrack: ['Comp #1 (vis=1)', 'Unvisited', 'Unvisited', 'Unvisited', 'Unvisited', 'Unvisited', 'Unvisited'],
    auxiliaryLabel: 'Component Membership',
    activeIndices: [0],
    customCard: {
      title: 'Component #1 Traversal',
      rows: [
        { label: 'Trigger Vertex', value: 'Node 1 (vis[1] == 0)', accent: true },
        { label: 'Components Found', value: '1' },
        { label: 'DFS Path', value: '1 -> 2 -> 3' },
        { label: 'Action', value: 'Launch dfs(1)' }
      ]
    },
    variables: {
      activeI: 1,
      componentsCount: 1,
      currentTraversal: 'dfs(1)'
    },
    explanation: 'At loop i = 1, vis[1] is 0. Increment component count to 1 and launch DFS traversal.'
  },
  {
    phase: 'COMPONENT_1_FLOOD',
    title: '3. Complete DFS for Component #1: Visited {1, 2, 3}',
    arr: [1, 2, 3, 4, 5, 6, 7],
    auxiliaryTrack: ['Comp #1', 'Comp #1', 'Comp #1', 'Unvisited', 'Unvisited', 'Unvisited', 'Unvisited'],
    auxiliaryLabel: 'Component Membership',
    activeIndices: [0, 1, 2],
    customCard: {
      title: 'Component #1 Fully Explored',
      rows: [
        { label: 'Cluster Vertices', value: '{1, 2, 3}', accent: true },
        { label: 'Cluster Edges', value: '(1,2), (2,3), (1,3)' },
        { label: 'Total Components', value: '1' },
        { label: 'Next Loop Checks', value: 'i = 2 (Skip), i = 3 (Skip)' }
      ]
    },
    variables: {
      activeI: 1,
      componentsCount: 1,
      currentTraversal: 'Complete'
    },
    explanation: 'DFS traverses edges (1,2) and (2,3), marking nodes 1, 2, and 3 visited. Loop iterations i = 2 and i = 3 will skip instantly since vis[2] == 1 and vis[3] == 1.'
  },
  {
    phase: 'COMPONENT_2_START',
    title: '4. Node 4 is Unvisited: Discover Component #2',
    arr: [1, 2, 3, 4, 5, 6, 7],
    auxiliaryTrack: ['Comp #1', 'Comp #1', 'Comp #1', 'Comp #2 (vis=1)', 'Unvisited', 'Unvisited', 'Unvisited'],
    auxiliaryLabel: 'Component Membership',
    activeIndices: [3],
    customCard: {
      title: 'Component #2 Traversal',
      rows: [
        { label: 'Trigger Vertex', value: 'Node 4 (vis[4] == 0)', accent: true },
        { label: 'Components Found', value: '2' },
        { label: 'DFS Path', value: '4 -> 5' },
        { label: 'Action', value: 'Launch dfs(4)' }
      ]
    },
    variables: {
      activeI: 4,
      componentsCount: 2,
      currentTraversal: 'dfs(4)'
    },
    explanation: 'At loop i = 4, vis[4] is 0. Node 4 belongs to a new isolated component. Increment components to 2.'
  },
  {
    phase: 'COMPONENT_2_FLOOD',
    title: '5. Complete DFS for Component #2: Visited {4, 5}',
    arr: [1, 2, 3, 4, 5, 6, 7],
    auxiliaryTrack: ['Comp #1', 'Comp #1', 'Comp #1', 'Comp #2', 'Comp #2', 'Unvisited', 'Unvisited'],
    auxiliaryLabel: 'Component Membership',
    activeIndices: [3, 4],
    customCard: {
      title: 'Component #2 Fully Explored',
      rows: [
        { label: 'Cluster Vertices', value: '{4, 5}', accent: true },
        { label: 'Cluster Edges', value: '(4, 5)' },
        { label: 'Total Components', value: '2' },
        { label: 'Next Loop Check', value: 'i = 5 (Skip)' }
      ]
    },
    variables: {
      activeI: 4,
      componentsCount: 2,
      currentTraversal: 'Complete'
    },
    explanation: 'DFS traverses edge (4, 5). Nodes 4 and 5 are marked. Loop index i = 5 skips.'
  },
  {
    phase: 'COMPONENT_3_START',
    title: '6. Node 6 is Unvisited: Discover Component #3',
    arr: [1, 2, 3, 4, 5, 6, 7],
    auxiliaryTrack: ['Comp #1', 'Comp #1', 'Comp #1', 'Comp #2', 'Comp #2', 'Comp #3 (vis=1)', 'Comp #3 (vis=1)'],
    auxiliaryLabel: 'Component Membership',
    activeIndices: [5, 6],
    customCard: {
      title: 'Component #3 Fully Explored',
      rows: [
        { label: 'Cluster Vertices', value: '{6, 7}', accent: true },
        { label: 'Cluster Edges', value: '(6, 7)' },
        { label: 'Total Components', value: '3' },
        { label: 'Status', value: 'All 7 vertices visited' }
      ]
    },
    variables: {
      activeI: 6,
      componentsCount: 3,
      currentTraversal: 'dfs(6)'
    },
    explanation: 'At loop i = 6, vis[6] is 0. Increment components to 3. dfs(6) visits neighbor 7.'
  },
  {
    phase: 'DONE',
    title: '7. Scan Complete: Exactly 3 Connected Components Found',
    arr: [1, 2, 3, 4, 5, 6, 7],
    auxiliaryTrack: ['Comp #1', 'Comp #1', 'Comp #1', 'Comp #2', 'Comp #2', 'Comp #3', 'Comp #3'],
    auxiliaryLabel: 'Component Membership',
    activeIndices: [0, 1, 2, 3, 4, 5, 6],
    customCard: {
      title: 'Component Analysis Result',
      rows: [
        { label: 'Component 1', value: 'Vertices {1, 2, 3}' },
        { label: 'Component 2', value: 'Vertices {4, 5}' },
        { label: 'Component 3', value: 'Vertices {6, 7}' },
        { label: 'Total Connected Components', value: '3', accent: true }
      ]
    },
    variables: {
      activeI: 7,
      componentsCount: 3,
      currentTraversal: 'Finished'
    },
    explanation: 'All vertices 1 through 7 have been inspected. The algorithm accurately identifies 3 disconnected components in O(V + 2E) time.'
  }
];

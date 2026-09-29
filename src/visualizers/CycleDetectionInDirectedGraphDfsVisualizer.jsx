export const rendererType = 'array-scan';

export const meta = {
  title: 'Cycle Detection in Directed Graph (DFS)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(2V) visited + pathVisited recursion stack',
  description: 'Detects cycles in directed graphs by maintaining two boolean arrays: vis[] for nodes visited so far, and pathVis[] for nodes in the active recursion call stack. Re-encountering an adjacent node with pathVis[v] == 1 identifies a back-edge and proves a directed cycle.'
};

export const ideaMap = {
  title: 'Directed Graph DFS Cycle Detection Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Dual Tracking Arrays (vis & pathVis)',
      detail: 'vis[u] tracks overall exploration across components; pathVis[u] tracks nodes strictly on the current active DFS branch.'
    },
    {
      id: 'step2',
      label: 'Push onto Recursion Stack',
      detail: 'When entering dfs(u), mark vis[u] = 1 and pathVis[u] = 1.'
    },
    {
      id: 'step3',
      label: 'Back-Edge Identification',
      detail: 'If neighbor v has not been visited, recurse into dfs(v). If neighbor v is visited AND pathVis[v] == 1, a directed cycle exists!'
    },
    {
      id: 'step4',
      label: 'Backtrack on Path Return',
      detail: 'When all outgoing edges of u are exhausted without cycle, reset pathVis[u] = 0 before returning false.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Directed Graph Cycle Detection (DFS with pathVis)
// Time Complexity: O(V + E) | Space Complexity: O(2V)
#include <vector>
using namespace std;

bool dfsCheck(int node, vector<vector<int>>& adj, vector<int>& vis, vector<int>& pathVis) {
    vis[node] = 1;
    pathVis[node] = 1;
    
    for (int neighbor : adj[node]) {
        // When neighbor is unvisited
        if (!vis[neighbor]) {
            if (dfsCheck(neighbor, adj, vis, pathVis)) return true;
        }
        // If visited and currently on active recursion path => Back-edge / Cycle!
        else if (pathVis[neighbor]) {
            return true;
        }
    }
    
    // Backtrack: Remove node from active path
    pathVis[node] = 0;
    return false;
}

bool isCyclic(int V, vector<vector<int>>& adj) {
    vector<int> vis(V + 1, 0), pathVis(V + 1, 0);
    for (int i = 1; i <= V; i++) {
        if (!vis[i]) {
            if (dfsCheck(i, adj, vis, pathVis)) return true;
        }
    }
    return false;
}`,
  java: `// Java: Directed Graph Cycle Detection (DFS with pathVis)
// Time Complexity: O(V + E) | Space Complexity: O(2V)
import java.util.*;

class Solution {
    private boolean dfs(int node, List<List<Integer>> adj, int[] vis, int[] pathVis) {
        vis[node] = 1;
        pathVis[node] = 1;
        
        for (int neighbor : adj.get(node)) {
            if (vis[neighbor] == 0) {
                if (dfs(neighbor, adj, vis, pathVis)) return true;
            } else if (pathVis[neighbor] == 1) {
                // Back-edge discovered in active call stack
                return true;
            }
        }
        
        // Backtracking from active branch
        pathVis[node] = 0;
        return false;
    }
    
    public boolean isCyclic(int V, List<List<Integer>> adj) {
        int[] vis = new int[V + 1];
        int[] pathVis = new int[V + 1];
        for (int i = 1; i <= V; i++) {
            if (vis[i] == 0) {
                if (dfs(i, adj, vis, pathVis)) return true;
            }
        }
        return false;
    }
}`,
  python: `# Python: Directed Graph Cycle Detection (DFS with pathVis)
# Time Complexity: O(V + E) | Space Complexity: O(2V)
def isCyclic(V, adj):
    vis = [0] * (V + 1)
    pathVis = [0] * (V + 1)
    
    def dfs(u):
        vis[u] = 1
        pathVis[u] = 1
        
        for v in adj[u]:
            if not vis[v]:
                if dfs(v):
                    return True
            elif pathVis[v]:
                # Found back-edge to ancestor in active recursion stack
                return True
                
        pathVis[u] = 0 # Backtrack
        return False
        
    for i in range(1, V + 1):
        if not vis[i]:
            if dfs(i):
                return True
    return False`,
  javascript: `// JavaScript: Directed Graph Cycle Detection (DFS with pathVis)
// Time Complexity: O(V + E) | Space Complexity: O(2V)
function isCyclic(V, adj) {
  const vis = new Array(V + 1).fill(0);
  const pathVis = new Array(V + 1).fill(0);
  
  function dfs(u) {
    vis[u] = 1;
    pathVis[u] = 1;
    
    for (const v of adj[u]) {
      if (!vis[v]) {
        if (dfs(v)) return true;
      } else if (pathVis[v]) {
        // Back-edge detected
        return true;
      }
    }
    
    pathVis[u] = 0; // Backtrack
    return false;
  }
  
  for (let i = 1; i <= V; i++) {
    if (!vis[i]) {
      if (dfs(i)) return true;
    }
  }
  return false;
}`
};

export const steps = [
  {
    phase: 'START',
    title: '1. Initialize DFS at Node 1: Mark vis[1] = 1, pathVis[1] = 1',
    arr: [1, 2, 3, 4],
    auxiliaryTrack: ['vis: 1, path: 1', 'vis: 0, path: 0', 'vis: 0, path: 0', 'vis: 0, path: 0'],
    auxiliaryLabel: 'Visited & Path Visited Status',
    activeIndices: [0],
    customCard: {
      title: 'DFS Directed Cycle Tracking',
      rows: [
        { label: 'Active Frame', value: 'dfs(1)', accent: true },
        { label: 'Active Call Path', value: '[1]' },
        { label: 'Examining Edge', value: '1 -> 2' },
        { label: 'Cycle Status', value: 'Searching...' }
      ]
    },
    variables: {
      activeNode: 1,
      callStack: '[1]',
      examiningEdge: '1 -> 2',
      cycleDetected: false
    },
    explanation: 'Start DFS at root vertex 1. Mark vis[1] = 1 and pathVis[1] = 1. Inspect outgoing directed edge 1 -> 2.'
  },
  {
    phase: 'TRAVERSE',
    title: '2. Recurse into Node 2: Mark vis[2] = 1, pathVis[2] = 1',
    arr: [1, 2, 3, 4],
    auxiliaryTrack: ['vis: 1, path: 1', 'vis: 1, path: 1', 'vis: 0, path: 0', 'vis: 0, path: 0'],
    auxiliaryLabel: 'Visited & Path Visited Status',
    activeIndices: [1],
    customCard: {
      title: 'DFS Directed Cycle Tracking',
      rows: [
        { label: 'Active Frame', value: 'dfs(2)', accent: true },
        { label: 'Active Call Path', value: '[1 -> 2]' },
        { label: 'Examining Edge', value: '2 -> 3' },
        { label: 'Cycle Status', value: 'Searching...' }
      ]
    },
    variables: {
      activeNode: 2,
      callStack: '[1 -> 2]',
      examiningEdge: '2 -> 3',
      cycleDetected: false
    },
    explanation: 'Node 2 was unvisited. Invoke dfs(2). Mark vis[2] = 1 and pathVis[2] = 1. Active path stack expands to [1 -> 2].'
  },
  {
    phase: 'TRAVERSE',
    title: '3. Recurse into Node 3: Mark vis[3] = 1, pathVis[3] = 1',
    arr: [1, 2, 3, 4],
    auxiliaryTrack: ['vis: 1, path: 1', 'vis: 1, path: 1', 'vis: 1, path: 1', 'vis: 0, path: 0'],
    auxiliaryLabel: 'Visited & Path Visited Status',
    activeIndices: [2],
    customCard: {
      title: 'DFS Directed Cycle Tracking',
      rows: [
        { label: 'Active Frame', value: 'dfs(3)', accent: true },
        { label: 'Active Call Path', value: '[1 -> 2 -> 3]' },
        { label: 'Examining Edge', value: '3 -> 4' },
        { label: 'Cycle Status', value: 'Searching...' }
      ]
    },
    variables: {
      activeNode: 3,
      callStack: '[1 -> 2 -> 3]',
      examiningEdge: '3 -> 4',
      cycleDetected: false
    },
    explanation: 'Node 3 was unvisited. Invoke dfs(3). Mark vis[3] = 1 and pathVis[3] = 1. Active path stack is now [1 -> 2 -> 3].'
  },
  {
    phase: 'TRAVERSE',
    title: '4. Recurse into Node 4: Mark vis[4] = 1, pathVis[4] = 1',
    arr: [1, 2, 3, 4],
    auxiliaryTrack: ['vis: 1, path: 1', 'vis: 1, path: 1', 'vis: 1, path: 1', 'vis: 1, path: 1'],
    auxiliaryLabel: 'Visited & Path Visited Status',
    activeIndices: [3],
    customCard: {
      title: 'DFS Directed Cycle Tracking',
      rows: [
        { label: 'Active Frame', value: 'dfs(4)', accent: true },
        { label: 'Active Call Path', value: '[1 -> 2 -> 3 -> 4]' },
        { label: 'Examining Edge', value: '4 -> 2' },
        { label: 'Cycle Status', value: 'Checking back-edge...' }
      ]
    },
    variables: {
      activeNode: 4,
      callStack: '[1 -> 2 -> 3 -> 4]',
      examiningEdge: '4 -> 2',
      cycleDetected: false
    },
    explanation: 'From node 3, follow directed edge 3 -> 4. Node 4 is unvisited: mark vis[4] = 1, pathVis[4] = 1. Next edge out of node 4 is 4 -> 2.'
  },
  {
    phase: 'CYCLE_DETECTED',
    title: '5. Back-Edge Encountered: 4 -> 2 with pathVis[2] == 1 => CYCLE!',
    arr: [1, 2, 3, 4],
    auxiliaryTrack: ['vis: 1, path: 1', 'CYCLE ANCESTOR (path: 1)', 'vis: 1, path: 1', 'CYCLE SOURCE (path: 1)'],
    auxiliaryLabel: 'Visited & Path Visited Status',
    activeIndices: [1, 3],
    customCard: {
      title: 'Directed Cycle Confirmed!',
      rows: [
        { label: 'Active Frame', value: 'dfs(4)', accent: true },
        { label: 'Cycle Edge', value: '4 -> 2 (Back-edge)' },
        { label: 'Cycle Subgraph', value: '2 -> 3 -> 4 -> 2' },
        { label: 'Condition Met', value: 'vis[2] == 1 && pathVis[2] == 1' },
        { label: 'Result', value: 'TRUE (Cycle Present)' }
      ]
    },
    variables: {
      activeNode: 4,
      cycleDetected: true,
      cycleNodes: '[2, 3, 4]',
      ancestorNode: 2
    },
    explanation: 'Directed edge 4 -> 2 leads to Node 2. Since pathVis[2] is 1, Node 2 is already an ancestor in our active recursion stack. A directed loop (2 -> 3 -> 4 -> 2) is proved! Return true immediately.'
  }
];

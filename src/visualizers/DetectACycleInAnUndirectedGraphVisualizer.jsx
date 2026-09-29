export const rendererType = 'array-scan';

export const meta = {
  title: 'Detect Cycle in an Undirected Graph (DFS)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V + 2E)',
  spaceComplexity: 'O(V) visited & recursion stack',
  description: 'Detects if an undirected graph contains a cycle using DFS. When traversing neighbors of node u, if an adjacent vertex v is already visited and v != parent, a cycle is confirmed!'
};

export const ideaMap = {
  title: 'Undirected Graph DFS Cycle Detection Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Parent-Aware DFS Traversal',
      detail: 'Pass (node, parent) into DFS so the immediate source edge is never falsely identified as a cycle.'
    },
    {
      id: 'step2',
      label: 'Unvisited Neighbor Exploration',
      detail: 'If neighbor v is unvisited, mark vis[v] = 1 and recursively invoke dfs(v, node).'
    },
    {
      id: 'step3',
      label: 'Cross-Branch Cycle Trigger',
      detail: 'If neighbor v is already visited and v != parent, an alternate pathway exists back to an ancestor, confirming a cycle.'
    },
    {
      id: 'step4',
      label: 'Disjoint Forest Coverage',
      detail: 'Loop over all 1..V vertices to guarantee full detection across disconnected graph components.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Detect Cycle in Undirected Graph (DFS)
// Time Complexity: O(V + 2E) | Space Complexity: O(V)
#include <vector>
using namespace std;

bool dfs(int node, int parent, vector<vector<int>>& adj, vector<int>& vis) {
    vis[node] = 1;
    for (int neighbor : adj[node]) {
        if (!vis[neighbor]) {
            if (dfs(neighbor, node, adj, vis)) return true;
        } else if (neighbor != parent) {
            // Visited neighbor that is NOT parent => Cycle detected!
            return true;
        }
    }
    return false;
}

bool isCycle(int V, vector<vector<int>>& adj) {
    vector<int> vis(V + 1, 0);
    for (int i = 1; i <= V; i++) {
        if (!vis[i]) {
            if (dfs(i, -1, adj, vis)) return true;
        }
    }
    return false;
}`,
  java: `// Java: Cycle Detection in Undirected Graph (DFS)
// Time Complexity: O(V + 2E) | Space Complexity: O(V)
import java.util.*;

class Solution {
    private boolean dfs(int node, int parent, ArrayList<ArrayList<Integer>> adj, boolean[] vis) {
        vis[node] = true;
        for (int neighbor : adj.get(node)) {
            if (!vis[neighbor]) {
                if (dfs(neighbor, node, adj, vis)) return true;
            } else if (neighbor != parent) {
                return true;
            }
        }
        return false;
    }

    public boolean isCycle(int V, ArrayList<ArrayList<Integer>> adj) {
        boolean[] vis = new boolean[V + 1];
        for (int i = 1; i <= V; i++) {
            if (!vis[i]) {
                if (dfs(i, -1, adj, vis)) return true;
            }
        }
        return false;
    }
}`,
  python: `# Python: Detect Cycle in Undirected Graph (DFS)
# Time Complexity: O(V + 2E) | Space Complexity: O(V)
def isCycle(V: int, adj: list[list[int]]) -> bool:
    vis = [False] * (V + 1)
    
    def dfs(node: int, parent: int) -> bool:
        vis[node] = True
        for neighbor in adj[node]:
            if not vis[neighbor]:
                if dfs(neighbor, node):
                    return True
            elif neighbor != parent:
                return True
        return False
        
    for i in range(1, V + 1):
        if not vis[i]:
            if dfs(i, -1):
                return True
    return False`,
  javascript: `// JavaScript: Detect Cycle in Undirected Graph (DFS)
// Time Complexity: O(V + 2E) | Space Complexity: O(V)
function isCycle(V, adj) {
  const vis = new Array(V + 1).fill(false);
  
  function dfs(node, parent) {
    vis[node] = true;
    for (const neighbor of adj[node]) {
      if (!vis[neighbor]) {
        if (dfs(neighbor, node)) return true;
      } else if (neighbor !== parent) {
        return true;
      }
    }
    return false;
  }
  
  for (let i = 1; i <= V; i++) {
    if (!vis[i]) {
      if (dfs(i, -1)) return true;
    }
  }
  return false;
}`
};

export const steps = [
  {
    phase: 'START',
    title: '1. Start DFS at Node 1 (Parent = -1)',
    arr: [1, 2, 3, 4],
    auxiliaryTrack: ['Visited (p: -1)', 'Unvisited', 'Unvisited', 'Unvisited'],
    auxiliaryLabel: 'Visited Status & Parent',
    activeIndices: [0],
    customCard: {
      title: 'DFS Cycle Detection State',
      rows: [
        { label: 'Current Node', value: 'Node 1', accent: true },
        { label: 'Parent Parameter', value: '-1 (Root of DFS tree)' },
        { label: 'Outgoing Edges', value: '1 -> 2, 1 -> 4' },
        { label: 'Cycle Status', value: 'Searching...' }
      ]
    },
    variables: {
      currentNode: 1,
      parent: -1,
      cycleDetected: false,
      activeEdge: '1-2'
    },
    metrics: {
      nodesVisited: '1 / 4',
      activeParent: -1,
      hasCycle: 'Pending'
    },
    explain: 'Begin at node 1 with parent = -1. Mark vis[1] = 1. Advance to first unvisited neighbor 2.',
    intuition: 'The parent parameter prevents the search from mistaking the bidirectional edge back to caller as a cycle.'
  },
  {
    phase: 'STEP_2',
    title: '2. Advance to Node 2 (Parent = 1)',
    arr: [1, 2, 3, 4],
    auxiliaryTrack: ['Visited', 'Visited (p: 1)', 'Unvisited', 'Unvisited'],
    auxiliaryLabel: 'Visited Status & Parent',
    activeIndices: [1],
    customCard: {
      title: 'Traverse Edge 1 - 2',
      rows: [
        { label: 'Current Node', value: 'Node 2', accent: true },
        { label: 'Parent Parameter', value: 'Node 1' },
        { label: 'Neighbor 1 Check', value: 'Visited but equals parent (skipped)' },
        { label: 'Next Move', value: 'Advance to unvisited neighbor 3' }
      ]
    },
    variables: {
      currentNode: 2,
      parent: 1,
      cycleDetected: false,
      activeEdge: '2-3'
    },
    metrics: {
      nodesVisited: '2 / 4',
      activeParent: 1,
      hasCycle: 'Pending'
    },
    explain: 'At node 2, neighbor 1 is visited but is the parent (skip). Advance to unvisited neighbor 3.',
    intuition: 'Skipping the immediate parent filters out trivial back-and-forth traversal across undirected edges.'
  },
  {
    phase: 'STEP_3',
    title: '3. Advance to Node 3 (Parent = 2)',
    arr: [1, 2, 3, 4],
    auxiliaryTrack: ['Visited', 'Visited', 'Visited (p: 2)', 'Unvisited'],
    auxiliaryLabel: 'Visited Status & Parent',
    activeIndices: [2],
    customCard: {
      title: 'Traverse Edge 2 - 3',
      rows: [
        { label: 'Current Node', value: 'Node 3', accent: true },
        { label: 'Parent Parameter', value: 'Node 2' },
        { label: 'Next Move', value: 'Advance to unvisited neighbor 4' },
        { label: 'Visited Set', value: '{ 1, 2, 3 }' }
      ]
    },
    variables: {
      currentNode: 3,
      parent: 2,
      cycleDetected: false,
      activeEdge: '3-4'
    },
    metrics: {
      nodesVisited: '3 / 4',
      activeParent: 2,
      hasCycle: 'Pending'
    },
    explain: 'At node 3, advance along edge 3 - 4 to unvisited neighbor 4.',
    intuition: 'DFS continues deepening down the simple path until a loop closure or leaf is encountered.'
  },
  {
    phase: 'CYCLE_FOUND',
    title: '4. Node 4 Inspects Neighbor 1: CYCLE DETECTED!',
    arr: [1, 2, 3, 4],
    auxiliaryTrack: ['Visited', 'Visited', 'Visited', 'Visited (Cycle Back-Edge to 1!)'],
    auxiliaryLabel: 'Cycle Confirmation',
    activeIndices: [0, 3],
    customCard: {
      title: 'Cycle Detected via Back-Edge',
      rows: [
        { label: 'Active Edge', value: 'Edge 4 - 1', accent: true },
        { label: 'Condition Checked', value: 'vis[1] == 1 AND 1 != parent 3' },
        { label: 'Loop Confirmed', value: 'Cycle pathway: 1 - 2 - 3 - 4 - 1' },
        { label: 'Final Verdict', value: 'isCycle = true' }
      ]
    },
    variables: {
      currentNode: 4,
      parent: 3,
      cycleDetected: true,
      activeEdge: '4-1'
    },
    metrics: {
      nodesVisited: '4 / 4',
      activeParent: 3,
      hasCycle: 'TRUE'
    },
    explain: 'At node 4: neighbor 1 is visited (vis[1] == 1) AND neighbor 1 != parent 3! Back-edge 4--1 proves a cycle exists!',
    intuition: 'Encountering an already visited node that is not the parent guarantees an alternate path loops back to the same node.'
  }
];

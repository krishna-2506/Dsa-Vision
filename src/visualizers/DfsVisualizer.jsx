export const rendererType = 'stack';

export const meta = {
  title: 'Depth First Search (DFS)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Easy',
  timeComplexity: 'O(V + 2E)',
  spaceComplexity: 'O(V) Recursion Stack',
  description: 'Recursively traverses as deep as possible along each branch before backtracking, utilizing a visited array to avoid revisiting nodes.'
};

export const ideaMap = {
  title: 'Depth First Search Traversal Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Root Invocation',
      detail: 'Call dfs(source) and mark visited[source] = 1, appending the node to the traversal output.'
    },
    {
      id: 'step2',
      label: 'Deep Dive Descent',
      detail: 'For each unvisited adjacent neighbor v, recursively invoke dfs(v), pushing a new frame to the call stack.'
    },
    {
      id: 'step3',
      label: 'Dead-End Backtracking',
      detail: 'When all adjacent vertices of the current node are already visited, pop the recursion stack back to caller.'
    },
    {
      id: 'step4',
      label: 'Forest Completion',
      detail: 'Once the call stack drains back to root, verify if any disjoint components remain.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Depth First Search of Graph
// Time: O(V + 2E) | Space: O(V) Recursion Stack
#include <vector>
using namespace std;

void dfs(int node, vector<vector<int>>& adj, vector<int>& vis, vector<int>& res) {
    vis[node] = 1;
    res.push_back(node);
    for (int neighbor : adj[node]) {
        if (!vis[neighbor]) {
            dfs(neighbor, adj, vis, res);
        }
    }
}

vector<int> dfsOfGraph(int V, vector<vector<int>>& adj) {
    vector<int> vis(V, 0);
    vector<int> res;
    dfs(0, adj, vis, res);
    return res;
}`,
  java: `// Java: Depth First Search of Graph
// Time: O(V + 2E) | Space: O(V)
import java.util.*;

class Solution {
    public void dfs(int node, ArrayList<ArrayList<Integer>> adj, boolean[] vis, ArrayList<Integer> ans) {
        vis[node] = true;
        ans.add(node);
        for (int neighbor : adj.get(node)) {
            if (!vis[neighbor]) {
                dfs(neighbor, adj, vis, ans);
            }
        }
    }

    public ArrayList<Integer> dfsOfGraph(int V, ArrayList<ArrayList<Integer>> adj) {
        boolean[] vis = new boolean[V];
        ArrayList<Integer> ans = new ArrayList<>();
        dfs(0, adj, vis, ans);
        return ans;
    }
}`,
  python: `# Python: Depth First Search
# Time: O(V + 2E) | Space: O(V)
def dfsOfGraph(V, adj):
    vis = [False] * V
    res = []
    
    def dfs(u):
        vis[u] = True
        res.append(u)
        for v in adj[u]:
            if not vis[v]:
                dfs(v)
                
    dfs(0)
    return res`,
  javascript: `// JavaScript: Depth First Search
// Time: O(V + 2E) | Space: O(V)
function dfsOfGraph(V, adj) {
  const vis = new Array(V).fill(false);
  const res = [];
  
  function dfs(u) {
    vis[u] = true;
    res.push(u);
    for (const v of adj[u]) {
      if (!vis[v]) dfs(v);
    }
  }
  
  dfs(0);
  return res;
}`
};

export const steps = [
  {
    phase: 'START',
    title: '1. Start DFS at Source Node 0',
    stack: [0],
    inputTrack: {
      items: [1, 0, 0, 0, 0],
      label: 'Visited Status (vis[0..4])'
    },
    scanIndex: 0,
    activeIndices: [0],
    customCard: {
      title: 'DFS Execution State',
      rows: [
        { label: 'Current Call', value: 'dfs(0)', accent: true },
        { label: 'Visited Nodes', value: '{ 0 }' },
        { label: 'Output Path', value: '[0]' },
        { label: 'Neighbors of 0', value: '{ 1, 3 }' }
      ]
    },
    variables: {
      activeNode: 0,
      callStackDepth: 1,
      visitedCount: '1 / 5',
      traversal: '[0]'
    },
    metrics: {
      currentFrame: 'dfs(0)',
      stackDepth: 1,
      visited: '1 / 5'
    },
    explain: 'Mark vis[0] = 1. Push dfs(0) to recursion stack. The first unvisited neighbor of 0 is node 1.',
    intuition: 'DFS explores branches greedily downward before returning to alternative lateral neighbors.'
  },
  {
    phase: 'VISIT_1',
    title: '2. Deep Dive: Visit Node 1',
    stack: [0, 1],
    inputTrack: {
      items: [1, 1, 0, 0, 0],
      label: 'Visited Status (vis[0..4])'
    },
    scanIndex: 1,
    activeIndices: [1],
    customCard: {
      title: 'DFS Recursive Descent',
      rows: [
        { label: 'Current Call', value: 'dfs(1)', accent: true },
        { label: 'Visited Nodes', value: '{ 0, 1 }' },
        { label: 'Output Path', value: '[0, 1]' },
        { label: 'Neighbors of 1', value: '{ 0, 2 }' }
      ]
    },
    variables: {
      activeNode: 1,
      callStackDepth: 2,
      visitedCount: '2 / 5',
      traversal: '[0, 1]'
    },
    metrics: {
      currentFrame: 'dfs(1)',
      stackDepth: 2,
      visited: '2 / 5'
    },
    explain: 'dfs(1) invoked. vis[1] = 1. Neighbor 0 is already visited, so branch to unvisited neighbor 2.',
    intuition: 'Each recursive call pushes a new execution context onto the call stack.'
  },
  {
    phase: 'VISIT_2',
    title: '3. Deep Dive: Visit Node 2 & Reach Dead End',
    stack: [0, 1, 2],
    inputTrack: {
      items: [1, 1, 1, 0, 0],
      label: 'Visited Status (vis[0..4])'
    },
    scanIndex: 2,
    activeIndices: [2],
    customCard: {
      title: 'DFS Leaf / Dead End Reached',
      rows: [
        { label: 'Current Call', value: 'dfs(2)', accent: true },
        { label: 'Visited Nodes', value: '{ 0, 1, 2 }' },
        { label: 'Output Path', value: '[0, 1, 2]' },
        { label: 'Neighbors of 2', value: '{ 1 (visited) }' }
      ]
    },
    variables: {
      activeNode: 2,
      callStackDepth: 3,
      visitedCount: '3 / 5',
      traversal: '[0, 1, 2]'
    },
    metrics: {
      currentFrame: 'dfs(2)',
      stackDepth: 3,
      visited: '3 / 5'
    },
    explain: 'dfs(2) invoked. vis[2] = 1. Neighbors of 2 contain only {1}, which is already visited. Node 2 has reached a dead end; backtracks begins!',
    intuition: 'When no unvisited outgoing edges exist, control unwinds back to previous stack frames.'
  },
  {
    phase: 'VISIT_3',
    title: '4. Backtrack to 0, Deep Dive Branch Node 3',
    stack: [0, 3],
    inputTrack: {
      items: [1, 1, 1, 1, 0],
      label: 'Visited Status (vis[0..4])'
    },
    scanIndex: 3,
    activeIndices: [3],
    customCard: {
      title: 'DFS Backtrack & Branch Shift',
      rows: [
        { label: 'Current Call', value: 'dfs(3)', accent: true },
        { label: 'Visited Nodes', value: '{ 0, 1, 2, 3 }' },
        { label: 'Output Path', value: '[0, 1, 2, 3]' },
        { label: 'Neighbors of 3', value: '{ 0 (visited), 4 (unvisited) }' }
      ]
    },
    variables: {
      activeNode: 3,
      callStackDepth: 2,
      visitedCount: '4 / 5',
      traversal: '[0, 1, 2, 3]'
    },
    metrics: {
      currentFrame: 'dfs(3)',
      stackDepth: 2,
      visited: '4 / 5'
    },
    explain: 'dfs(2) and dfs(1) returned and popped. Back at dfs(0), the second neighbor 3 is unvisited, so we invoke dfs(3).',
    intuition: 'Backtracking enables exploring alternative search trees without re-processing already resolved vertices.'
  },
  {
    phase: 'COMPLETE',
    title: '5. Visit Node 4 & Complete Traversal',
    stack: [0, 3, 4],
    inputTrack: {
      items: [1, 1, 1, 1, 1],
      label: 'Visited Status (vis[0..4])'
    },
    scanIndex: 4,
    activeIndices: [4],
    customCard: {
      title: 'DFS Traversal Finalized',
      rows: [
        { label: 'Final Output', value: '[0, 1, 2, 3, 4]', accent: true },
        { label: 'All Visited', value: '5 / 5 vertices' },
        { label: 'Total Edges Inspected', value: '2 * E' },
        { label: 'Status', value: 'Success' }
      ]
    },
    variables: {
      activeNode: 4,
      callStackDepth: 3,
      visitedCount: '5 / 5',
      traversal: '[0, 1, 2, 3, 4]'
    },
    metrics: {
      currentFrame: 'dfs(4)',
      stackDepth: 3,
      visited: '5 / 5'
    },
    explain: 'dfs(4) invoked. vis[4] = 1. All 5 vertices have now been visited in order [0, 1, 2, 3, 4]. The DFS traversal is fully complete!',
    intuition: 'Depth First Search covers all reachable connected components in O(V + E) time.'
  }
];

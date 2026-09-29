export const rendererType = 'array-scan';

export const meta = {
  title: 'Bridges in Graph (Tarjan\'s Algorithm)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Hard',
  timeComplexity: 'O(V + 2E)',
  spaceComplexity: 'O(V + 2E) + O(3V)',
  description: 'Finds all bridges (critical connections) in an undirected graph using Tarjan\'s Algorithm with discovery time (tin) and lowest insertion time (low). An edge (u, v) is a bridge if low[v] > tin[u] (LeetCode 1192).'
};

export const ideaMap = {
  title: 'Tarjan Critical Bridge Discovery Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Discovery & Low Timestamps',
      detail: 'Assign tin[u] = low[u] = timer++ when visiting node u for the first time during DFS.'
    },
    {
      id: 'step2',
      label: 'Tree Edge Recursion',
      detail: 'For each unvisited neighbor v, recursively invoke DFS; upon return, propagate low[u] = min(low[u], low[v]).'
    },
    {
      id: 'step3',
      label: 'Bridge Condition (low[v] > tin[u])',
      detail: 'If child v cannot reach node u or any ancestor of u, removing edge (u, v) disconnects the graph.'
    },
    {
      id: 'step4',
      label: 'Back-Edge Relaxation',
      detail: 'If neighbor v is already visited and not the direct parent, update low[u] = min(low[u], tin[v]).'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Bridges in Graph / Tarjan's Algorithm (LeetCode 1192)
// Time Complexity: O(V + 2E) | Space Complexity: O(V + 2E) + O(3V)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
private:
    int timer = 1;
    void dfs(int node, int parent, vector<vector<int>>& adj,
             vector<int>& vis, vector<int>& tin, vector<int>& low,
             vector<vector<int>>& bridges) {
        vis[node] = 1;
        tin[node] = low[node] = timer++;
        
        for (auto it : adj[node]) {
            if (it == parent) continue;
            if (!vis[it]) {
                dfs(it, node, adj, vis, tin, low, bridges);
                low[node] = min(low[node], low[it]);
                // Bridge condition: child cannot reach node or an ancestor of node!
                if (low[it] > tin[node]) {
                    bridges.push_back({node, it});
                }
            } else {
                // Back-edge
                low[node] = min(low[node], tin[it]);
            }
        }
    }
public:
    vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {
        vector<vector<int>> adj(n);
        for (auto& it : connections) {
            adj[it[0]].push_back(it[1]);
            adj[it[1]].push_back(it[0]);
        }
        vector<int> vis(n, 0), tin(n), low(n);
        vector<vector<int>>& bridges;
        vector<vector<int>> ans;
        dfs(0, -1, adj, vis, tin, low, ans);
        return ans;
    }
};`,
  java: `// Java: Tarjan's Bridges Algorithm
// Time Complexity: O(V + 2E) | Space Complexity: O(V + 2E)
import java.util.*;

class Solution {
    int timer = 1;
    private void dfs(int u, int p, List<List<Integer>> adj, int[] vis, int[] tin, int[] low, List<List<Integer>> bridges) {
        vis[u] = 1;
        tin[u] = low[u] = timer++;
        for (int v : adj.get(u)) {
            if (v == p) continue;
            if (vis[v] == 0) {
                dfs(v, u, adj, vis, tin, low, bridges);
                low[u] = Math.min(low[u], low[v]);
                if (low[v] > tin[u]) {
                    bridges.add(Arrays.asList(u, v));
                }
            } else {
                low[u] = Math.min(low[u], tin[v]);
            }
        }
    }
    public List<List<Integer>> criticalConnections(int n, List<List<Integer>> connections) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (List<Integer> edge : connections) {
            adj.get(edge.get(0)).add(edge.get(1));
            adj.get(edge.get(1)).add(edge.get(0));
        }
        int[] vis = new int[n], tin = new int[n], low = new int[n];
        List<List<Integer>> bridges = new ArrayList<>();
        dfs(0, -1, adj, vis, tin, low, bridges);
        return bridges;
    }
}`,
  python: `# Python: Tarjan's Critical Connections
# Time Complexity: O(V + 2E) | Space Complexity: O(V + 2E)
class Solution:
    def criticalConnections(self, n: int, connections: list[list[int]]) -> list[list[int]]:
        adj = [[] for _ in range(n)]
        for u, v in connections:
            adj[u].append(v)
            adj[v].append(u)
            
        tin = [0] * n
        low = [0] * n
        vis = [0] * n
        bridges = []
        timer = 1
        
        def dfs(node, parent):
            nonlocal timer
            vis[node] = 1
            tin[node] = low[node] = timer
            timer += 1
            
            for neighbor in adj[node]:
                if neighbor == parent:
                    continue
                if not vis[neighbor]:
                    dfs(neighbor, node)
                    low[node] = min(low[node], low[neighbor])
                    if low[neighbor] > tin[node]:
                        bridges.append([node, neighbor])
                else:
                    low[node] = min(low[node], tin[neighbor])
                    
        dfs(0, -1)
        return bridges`,
  javascript: `// JavaScript: Tarjan's Critical Connections
// Time Complexity: O(V + 2E) | Space Complexity: O(V + 2E)
function criticalConnections(n, connections) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of connections) {
    adj[u].push(v);
    adj[v].push(u);
  }
  
  const vis = new Array(n).fill(0);
  const tin = new Array(n).fill(0);
  const low = new Array(n).fill(0);
  const bridges = [];
  let timer = 1;
  
  function dfs(u, p) {
    vis[u] = 1;
    tin[u] = low[u] = timer++;
    for (const v of adj[u]) {
      if (v === p) continue;
      if (!vis[v]) {
        dfs(v, u);
        low[u] = Math.min(low[u], low[v]);
        if (low[v] > tin[u]) {
          bridges.push([u, v]);
        }
      } else {
        low[u] = Math.min(low[u], tin[v]);
      }
    }
  }
  
  dfs(0, -1);
  return bridges;
}`
};

export const steps = [
  {
    phase: 'CYCLE_DISCOVERY',
    title: '1. DFS Traversal: Visit 0 -> 1 -> 2 -> 0 (Cycle Loop)',
    arr: [0, 1, 2, 3],
    auxiliaryTrack: ['tin:1, low:1', 'tin:2, low:1', 'tin:3, low:1', 'tin:?, low:?'],
    auxiliaryLabel: 'Timestamps [tin, low]',
    activeIndices: [0, 1, 2],
    customCard: {
      title: 'Tarjan Discovery Timestamps',
      rows: [
        { label: 'Back-Edge', value: '2 -> 0 (tin[0] = 1)', accent: true },
        { label: 'Low Updates', value: 'low[2] = 1, low[1] = 1' },
        { label: 'Bridge Check', value: 'low[v] <= tin[u] for all cycle edges' },
        { label: 'Status', value: 'Zero bridges in cycle {0, 1, 2}' }
      ]
    },
    variables: {
      timer: 4,
      bridges: '[]',
      activeNode: 2,
      parent: 1
    },
    metrics: {
      bridgesFound: 0,
      currentTimer: 4,
      condition: 'low[v] > tin[u]'
    },
    explain: 'Back-edge from 2 to 0 updates low[2] = 1, low[1] = 1. None of edges in {0, 1, 2} are bridges because low[it] <= tin[node].',
    intuition: 'Back-edges provide alternative loop paths, ensuring that no edge inside a simple cycle can be a bridge.'
  },
  {
    phase: 'LEAF_BRANCH',
    title: '2. Branch to Node 3 from Node 1: tin[3] = 4, low[3] = 4',
    arr: [0, 1, 2, 3],
    auxiliaryTrack: ['tin:1, low:1', 'tin:2, low:1', 'tin:3, low:1', 'tin:4, low:4'],
    auxiliaryLabel: 'Timestamps [tin, low]',
    activeIndices: [3],
    customCard: {
      title: 'DFS Leaf Branching',
      rows: [
        { label: 'Current Edge', value: '1 -> 3', accent: true },
        { label: 'Node 3 State', value: 'tin[3] = 4, low[3] = 4' },
        { label: 'Neighbors of 3', value: '{ 1 (parent) } only' },
        { label: 'Action', value: 'No back-edges found; ready to backtrack' }
      ]
    },
    variables: {
      timer: 5,
      bridges: '[]',
      activeNode: 3,
      parent: 1
    },
    metrics: {
      bridgesFound: 0,
      currentTimer: 5,
      condition: 'Testing low[3] > tin[1]'
    },
    explain: 'DFS steps from 1 into 3. tin[3] = low[3] = 4. Node 3 has no other outgoing connections.',
    intuition: 'Nodes at the periphery of the graph must depend entirely on their entry edge to stay connected.'
  },
  {
    phase: 'BRIDGE_FOUND',
    title: '3. Backtrack to Node 1: low[3] (4) > tin[1] (2) => CRITICAL BRIDGE!',
    arr: [0, 1, 2, 3],
    auxiliaryTrack: ['tin:1, low:1', 'tin:2, low:1', 'tin:3, low:1', 'tin:4, low:4 [CRITICAL]'],
    auxiliaryLabel: 'Final Timestamps & Bridges',
    activeIndices: [1, 3],
    customCard: {
      title: 'Critical Bridge Detected',
      rows: [
        { label: 'Critical Connection', value: 'Edge (1, 3)', accent: true },
        { label: 'Inequality', value: 'low[3]=4 > tin[1]=2 (Strictly Greater!)' },
        { label: 'Impact of Removal', value: 'Disconnects graph into 2 components' },
        { label: 'Result', value: 'bridges = [[1, 3]]' }
      ]
    },
    variables: {
      timer: 5,
      bridges: '[[1, 3]]',
      activeNode: 1,
      criticalEdge: '(1, 3)'
    },
    metrics: {
      bridgesFound: 1,
      currentTimer: 5,
      condition: 'Bridge Confirmed'
    },
    explain: 'low[3] is 4, which is strictly greater than tin[1] = 2. Node 3 has no alternative path back to 1 or its ancestors! Edge (1, 3) is a Critical Bridge!',
    intuition: 'If the earliest reachable ancestor from a child is strictly younger than the parent, cutting the parent-child edge breaks connectivity.'
  }
];

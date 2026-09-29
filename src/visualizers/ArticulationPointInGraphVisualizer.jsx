export const rendererType = 'array-scan';

export const meta = {
  title: 'Articulation Point in Graph (Tarjan\'s Algorithm)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Hard',
  timeComplexity: 'O(V + 2E)',
  spaceComplexity: 'O(3V)',
  description: 'Identifies all Articulation Points (cut vertices) whose removal increases the number of connected components in the graph using Tarjan\'s low/tin DFS algorithm.'
};

export const ideaMap = {
  title: 'Tarjan Cut Vertex Identification Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'DFS Discovery & Low Traversal',
      detail: 'Record arrival timestamps tin[u] and lowest reachable ancestor time low[u] using an incrementing global timer.'
    },
    {
      id: 'step2',
      label: 'Non-Root Cut Condition',
      detail: 'If child v has low[v] >= tin[u] and parent != -1, child v cannot reach above u without passing through u; u is a cut vertex.'
    },
    {
      id: 'step3',
      label: 'Root Node Condition',
      detail: 'If root (parent == -1) has more than 1 independent DFS tree child branch, removing root disconnects them.'
    },
    {
      id: 'step4',
      label: 'Deduplicated Cut Vertices Set',
      detail: 'Use a boolean marking array mark[u] = 1 to prevent recording the same articulation point multiple times.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Articulation Points (Tarjan's Algorithm)
// Time Complexity: O(V + 2E) | Space Complexity: O(3V)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
private:
    int timer = 1;
    void dfs(int node, int parent, vector<vector<int>>& adj,
             vector<int>& vis, vector<int>& tin, vector<int>& low,
             vector<int>& mark) {
        vis[node] = 1;
        tin[node] = low[node] = timer++;
        int child = 0;
        
        for (auto it : adj[node]) {
            if (it == parent) continue;
            if (!vis[it]) {
                dfs(it, node, adj, vis, tin, low, mark);
                low[node] = min(low[node], low[it]);
                
                // Articulation Condition for non-root:
                if (low[it] >= tin[node] && parent != -1) {
                    mark[node] = 1;
                }
                child++;
            } else {
                low[node] = min(low[node], tin[it]);
            }
        }
        // Root condition:
        if (child > 1 && parent == -1) {
            mark[node] = 1;
        }
    }
public:
    vector<int> articulationPoints(int V, vector<vector<int>>& adj) {
        vector<int> vis(V, 0), tin(V), low(V), mark(V, 0);
        for (int i = 0; i < V; i++) {
            if (!vis[i]) dfs(i, -1, adj, vis, tin, low, mark);
        }
        vector<int> ans;
        for (int i = 0; i < V; i++) {
            if (mark[i] == 1) ans.push_back(i);
        }
        if (ans.size() == 0) return {-1};
        return ans;
    }
};`,
  java: `// Java: Articulation Points (Tarjan's Algorithm)
// Time Complexity: O(V + 2E) | Space Complexity: O(3V)
import java.util.*;

class Solution {
    private int timer = 1;
    private void dfs(int u, int p, List<List<Integer>> adj, int[] vis, int[] tin, int[] low, int[] mark) {
        vis[u] = 1;
        tin[u] = low[u] = timer++;
        int child = 0;
        
        for (int v : adj.get(u)) {
            if (v == p) continue;
            if (vis[v] == 0) {
                dfs(v, u, adj, vis, tin, low, mark);
                low[u] = Math.min(low[u], low[v]);
                if (low[v] >= tin[u] && p != -1) {
                    mark[u] = 1;
                }
                child++;
            } else {
                low[u] = Math.min(low[u], tin[v]);
            }
        }
        if (child > 1 && p == -1) {
            mark[u] = 1;
        }
    }
    public ArrayList<Integer> articulationPoints(int V, ArrayList<ArrayList<Integer>> adj) {
        int[] vis = new int[V], tin = new int[V], low = new int[V], mark = new int[V];
        for (int i = 0; i < V; i++) {
            if (vis[i] == 0) dfs(i, -1, adj, vis, tin, low, mark);
        }
        ArrayList<Integer> ans = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            if (mark[i] == 1) ans.add(i);
        }
        if (ans.size() == 0) ans.add(-1);
        return ans;
    }
}`,
  python: `# Python: Articulation Points (Tarjan's Algorithm)
# Time Complexity: O(V + 2E) | Space Complexity: O(3V)
class Solution:
    def articulationPoints(self, V: int, adj: list[list[int]]) -> list[int]:
        vis = [0] * V
        tin = [0] * V
        low = [0] * V
        mark = [0] * V
        timer = 1
        
        def dfs(node, parent):
            nonlocal timer
            vis[node] = 1
            tin[node] = low[node] = timer
            timer += 1
            child = 0
            
            for neighbor in adj[node]:
                if neighbor == parent:
                    continue
                if not vis[neighbor]:
                    dfs(neighbor, node)
                    low[node] = min(low[node], low[neighbor])
                    if low[neighbor] >= tin[node] and parent != -1:
                        mark[node] = 1
                    child += 1
                else:
                    low[node] = min(low[node], tin[neighbor])
                    
            if child > 1 and parent == -1:
                mark[node] = 1
                
        for i in range(V):
            if not vis[i]:
                dfs(i, -1)
                
        ans = [i for i in range(V) if mark[i] == 1]
        return ans if ans else [-1]`,
  javascript: `// JavaScript: Articulation Points (Tarjan's Algorithm)
// Time Complexity: O(V + 2E) | Space Complexity: O(3V)
function articulationPoints(V, adj) {
  const vis = new Array(V).fill(0);
  const tin = new Array(V).fill(0);
  const low = new Array(V).fill(0);
  const mark = new Array(V).fill(0);
  let timer = 1;
  
  function dfs(u, p) {
    vis[u] = 1;
    tin[u] = low[u] = timer++;
    let child = 0;
    
    for (const v of adj[u]) {
      if (v === p) continue;
      if (!vis[v]) {
        dfs(v, u);
        low[u] = Math.min(low[u], low[v]);
        if (low[v] >= tin[u] && p !== -1) {
          mark[u] = 1;
        }
        child++;
      } else {
        low[u] = Math.min(low[u], tin[v]);
      }
    }
    if (child > 1 && p === -1) {
      mark[u] = 1;
    }
  }
  
  for (let i = 0; i < V; i++) {
    if (!vis[i]) dfs(i, -1);
  }
  
  const ans = [];
  for (let i = 0; i < V; i++) {
    if (mark[i] === 1) ans.push(i);
  }
  return ans.length === 0 ? [-1] : ans;
}`
};

export const steps = [
  {
    phase: 'LOOP_EVALUATION',
    title: '1. DFS Traversal: Visit Cycle Loop 0 -> 1 -> 2 -> 0',
    arr: [0, 1, 2, 3, 4],
    auxiliaryTrack: ['Normal', 'Normal', 'Normal', 'Pending', 'Pending'],
    auxiliaryLabel: 'Vertex Classification',
    activeIndices: [0, 1, 2],
    customCard: {
      title: 'Cycle Traversal & Low Values',
      rows: [
        { label: 'Visited Nodes', value: '{ 0, 1, 2 } loop', accent: true },
        { label: 'Back-Edge (2 -> 0)', value: 'low[2] = 1, low[1] = 1' },
        { label: 'Inequality Check', value: 'low[2] = 1 < tin[1] = 2 (Condition fails)' },
        { label: 'Cut Vertex Status', value: 'Nodes 0, 1, 2 are NOT cut vertices' }
      ]
    },
    variables: {
      timer: 4,
      cutVertices: '[]',
      activeNode: 1,
      parent: 0
    },
    metrics: {
      cutCount: 0,
      activeTimer: 4,
      condition: 'low[v] >= tin[u]'
    },
    explain: 'Node 1 connects loop 0-1-2-0. low[2] = 1 < tin[1] = 2. Node 1 is NOT an articulation point because its neighbor can reach node 0 via another branch.',
    intuition: 'If an alternate path bypassing node u exists, removing node u will not partition the graph.'
  },
  {
    phase: 'CUT_VERTEX_FOUND',
    title: '2. Check Node 3: low[4] (4) >= tin[3] (4) -> ARTICULATION POINT!',
    arr: [0, 1, 2, 3, 4],
    auxiliaryTrack: ['Normal', 'Normal', 'Normal', 'CUT VERTEX', 'Normal'],
    auxiliaryLabel: 'Vertex Classification',
    activeIndices: [3],
    customCard: {
      title: 'Cut Vertex Identified',
      rows: [
        { label: 'Articulation Point', value: 'Node 3', accent: true },
        { label: 'Inequality', value: 'low[4] = 4 >= tin[3] = 4 (Satisfied!)' },
        { label: 'Consequence', value: 'Removing node 3 completely isolates node 4' },
        { label: 'Component Increase', value: 'Graph splits from 1 to 2 components' }
      ]
    },
    variables: {
      timer: 5,
      cutVertices: '[3]',
      activeNode: 3,
      parent: 1
    },
    metrics: {
      cutCount: 1,
      activeTimer: 5,
      condition: 'low[4] >= tin[3]'
    },
    explain: 'Child node 4 cannot reach above node 3 without passing through 3 (low[4] = 4 >= tin[3] = 4). Removing node 3 isolates node 4! Cut vertex: Node 3.',
    intuition: 'A cut vertex is a bottleneck whose removal immediately creates disjoint disconnected subgraphs.'
  },
  {
    phase: 'COMPLETE',
    title: '3. Traversal Finalized: Articulation Points = [3]',
    arr: [0, 1, 2, 3, 4],
    auxiliaryTrack: ['Normal', 'Normal', 'Normal', 'CUT VERTEX (v3)', 'Normal'],
    auxiliaryLabel: 'Final Classification',
    activeIndices: [3],
    customCard: {
      title: 'Tarjan Cut Vertex Complete',
      rows: [
        { label: 'Identified Cut Vertices', value: '[3]', accent: true },
        { label: 'Total Vertices Tested', value: '5 vertices' },
        { label: 'Root Condition', value: 'Root 0 has 1 child branch (not cut)' },
        { label: 'Result', value: 'articulationPoints = [3]' }
      ]
    },
    variables: {
      timer: 5,
      cutVertices: '[3]',
      activeNode: 'All',
      parent: 'None'
    },
    metrics: {
      cutCount: 1,
      activeTimer: 5,
      condition: 'Verified'
    },
    explain: 'All vertices examined. Only vertex 3 satisfies the cut vertex criteria. Output articulation points: [3].',
    intuition: 'Tarjan\'s algorithm extracts all articulation points in a single O(V + E) pass.'
  }
];

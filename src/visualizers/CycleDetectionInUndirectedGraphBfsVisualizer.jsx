export const rendererType = 'queue';

export const meta = {
  title: 'Cycle Detection in Undirected Graph (BFS)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V + 2E)',
  spaceComplexity: 'O(V) Queue & Visited',
  description: 'BFS-based cycle detection in an undirected graph storing {node, parent} in queue. If a neighbor is already visited and not the parent, a cycle is detected.'
};

export const ideaMap = {
  title: 'Undirected Graph BFS Wave Collision Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Queue Seeding with (Node, Parent)',
      detail: 'Push the start node with parent = -1 into the BFS queue and mark it visited.'
    },
    {
      id: 'step2',
      label: 'Concentric Wave Expansion',
      detail: 'Dequeue (node, parent) and inspect all adjacent neighbors.'
    },
    {
      id: 'step3',
      label: 'Parent Filtering',
      detail: 'If an adjacent neighbor is visited and equals parent, skip it as it is simply the reverse of the edge just crossed.'
    },
    {
      id: 'step4',
      label: 'Wavefront Collision Detection',
      detail: 'If a neighbor is visited and NOT the parent, two independent BFS search fronts met, proving a cycle.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Cycle Detection in Undirected Graph (BFS)
// Time Complexity: O(V + 2E) | Space Complexity: O(V)
#include <vector>
#include <queue>
using namespace std;

bool checkForCycleBFS(int src, vector<vector<int>>& adj, vector<int>& vis) {
    vis[src] = 1;
    queue<pair<int, int>> q; // {node, parent}
    q.push({src, -1});
    
    while (!q.empty()) {
        int node = q.front().first;
        int parent = q.front().second;
        q.pop();
        
        for (auto adjacentNode : adj[node]) {
            if (!vis[adjacentNode]) {
                vis[adjacentNode] = 1;
                q.push({adjacentNode, node});
            } else if (parent != adjacentNode) {
                // Someone visited this adjacent node from another branch!
                return true;
            }
        }
    }
    return false;
}

bool isCycle(int V, vector<vector<int>>& adj) {
    vector<int> vis(V + 1, 0);
    for (int i = 1; i <= V; i++) {
        if (!vis[i]) {
            if (checkForCycleBFS(i, adj, vis)) return true;
        }
    }
    return false;
}`,
  java: `// Java: Undirected Graph Cycle Detection using BFS
// Time Complexity: O(V + 2E) | Space Complexity: O(V)
import java.util.*;

class NodeParent {
    int node, parent;
    NodeParent(int n, int p) { node = n; parent = p; }
}

class Solution {
    public boolean isCycle(int V, ArrayList<ArrayList<Integer>> adj) {
        boolean[] vis = new boolean[V + 1];
        for (int i = 1; i <= V; i++) {
            if (!vis[i]) {
                if (bfs(i, adj, vis)) return true;
            }
        }
        return false;
    }
    
    private boolean bfs(int src, ArrayList<ArrayList<Integer>> adj, boolean[] vis) {
        Queue<NodeParent> q = new LinkedList<>();
        vis[src] = true;
        q.offer(new NodeParent(src, -1));
        
        while (!q.isEmpty()) {
            NodeParent curr = q.poll();
            int node = curr.node, parent = curr.parent;
            
            for (int neighbor : adj.get(node)) {
                if (!vis[neighbor]) {
                    vis[neighbor] = true;
                    q.offer(new NodeParent(neighbor, node));
                } else if (parent != neighbor) {
                    return true;
                }
            }
        }
        return false;
    }
}`,
  python: `# Python: Undirected Graph BFS Cycle Detection
# Time Complexity: O(V + 2E) | Space Complexity: O(V)
from collections import deque

def isCycle(V: int, adj: list[list[int]]) -> bool:
    vis = [False] * (V + 1)
    
    def bfs(src: int) -> bool:
        vis[src] = True
        q = deque([(src, -1)])
        
        while q:
            node, parent = q.popleft()
            for neighbor in adj[node]:
                if not vis[neighbor]:
                    vis[neighbor] = True
                    q.append((neighbor, node))
                elif parent != neighbor:
                    return True
        return False
        
    for i in range(1, V + 1):
        if not vis[i]:
            if bfs(i):
                return True
    return False`,
  javascript: `// JavaScript: Undirected Graph BFS Cycle Detection
// Time Complexity: O(V + 2E) | Space Complexity: O(V)
function isCycle(V, adj) {
  const vis = new Array(V + 1).fill(false);
  
  function bfs(src) {
    vis[src] = true;
    const q = [[src, -1]];
    
    while (q.length > 0) {
      const [node, parent] = q.shift();
      for (const neighbor of adj[node]) {
        if (!vis[neighbor]) {
          vis[neighbor] = true;
          q.push([neighbor, node]);
        } else if (parent !== neighbor) {
          return true;
        }
      }
    }
    return false;
  }
  
  for (let i = 1; i <= V; i++) {
    if (!vis[i]) {
      if (bfs(i)) return true;
    }
  }
  return false;
}`
};

export const steps = [
  {
    phase: 'INIT_BFS',
    title: '1. Initialize BFS: Queue [Node 1 (p: -1)]',
    mode: 'queue',
    queue: ['Node 1 (p: -1)'],
    inputTrack: {
      items: [0, 1, 0, 0, 0],
      label: 'Visited Status (vis[0..4])'
    },
    scanIndex: 1,
    activeIndices: [1],
    customCard: {
      title: 'BFS Queue Seeding',
      rows: [
        { label: 'Source Node', value: 'Node 1', accent: true },
        { label: 'Parent Link', value: '-1 (Root of BFS frontier)' },
        { label: 'Visited State', value: 'vis[1] = 1' },
        { label: 'Queue Buffer', value: '[ (node: 1, parent: -1) ]' }
      ]
    },
    variables: {
      activeNode: 1,
      parent: -1,
      queue: '[(1, -1)]',
      cycleDetected: false
    },
    metrics: {
      queueSize: 1,
      nodesVisited: '1 / 4',
      cycleFound: 'No'
    },
    explain: 'Enqueue source node 1 with parent -1. vis[1] = 1.',
    intuition: 'Each element in the BFS queue maintains its predecessor to distinguish back-edges from parent edges.'
  },
  {
    phase: 'EXPAND_1',
    title: '2. Dequeue (1, -1): Enqueue (2, 1) and (3, 1)',
    mode: 'queue',
    queue: ['Node 2 (p: 1)', 'Node 3 (p: 1)'],
    inputTrack: {
      items: [0, 1, 1, 1, 0],
      label: 'Visited Status (vis[0..4])'
    },
    scanIndex: 2,
    activeIndices: [2, 3],
    customCard: {
      title: 'BFS First Wave Expansion',
      rows: [
        { label: 'Dequeued Node', value: 'Node 1 (p: -1)', accent: true },
        { label: 'Discovered Neighbor 2', value: 'Unvisited -> enqueued (2, 1)' },
        { label: 'Discovered Neighbor 3', value: 'Unvisited -> enqueued (3, 1)' },
        { label: 'Queue State', value: '[ (2, 1), (3, 1) ]' }
      ]
    },
    variables: {
      activeNode: 1,
      parent: -1,
      queue: '[(2, 1), (3, 1)]',
      cycleDetected: false
    },
    metrics: {
      queueSize: 2,
      nodesVisited: '3 / 4',
      cycleFound: 'No'
    },
    explain: 'Both neighbors 2 and 3 are unvisited. Both are marked visited and enqueued with parent = 1.',
    intuition: 'BFS expands outward in concentric rings of equal distance from the source.'
  },
  {
    phase: 'EXPAND_2',
    title: '3. Dequeue (2, 1): Enqueue (4, 2)',
    mode: 'queue',
    queue: ['Node 3 (p: 1)', 'Node 4 (p: 2)'],
    inputTrack: {
      items: [0, 1, 1, 1, 1],
      label: 'Visited Status (vis[0..4])'
    },
    scanIndex: 4,
    activeIndices: [4],
    customCard: {
      title: 'Frontier Extension',
      rows: [
        { label: 'Dequeued Node', value: 'Node 2 (p: 1)', accent: true },
        { label: 'Neighbor 1 Check', value: 'Visited and equals parent 1 (Skipped)' },
        { label: 'Neighbor 4 Check', value: 'Unvisited -> enqueued (4, 2)' },
        { label: 'Remaining Queue', value: '[ (3, 1), (4, 2) ]' }
      ]
    },
    variables: {
      activeNode: 2,
      parent: 1,
      queue: '[(3, 1), (4, 2)]',
      cycleDetected: false
    },
    metrics: {
      queueSize: 2,
      nodesVisited: '4 / 4',
      cycleFound: 'No'
    },
    explain: 'At node 2: neighbor 1 is parent (ignored). Neighbor 4 is unvisited, enqueued with parent = 2.',
    intuition: 'Node 4 is now marked visited through path 1 -> 2 -> 4.'
  },
  {
    phase: 'CYCLE_COLLISION',
    title: '4. Dequeue (3, 1), Inspect Neighbor 4: BFS Collision!',
    mode: 'queue',
    queue: ['Node 4 (p: 2)'],
    inputTrack: {
      items: [0, 1, 1, 1, 1],
      label: 'Visited Status (vis[0..4])'
    },
    scanIndex: 3,
    activeIndices: [3, 4],
    customCard: {
      title: 'Cycle Detected via BFS Collision',
      rows: [
        { label: 'Inspected Neighbor', value: 'Node 4', accent: true },
        { label: 'Collision Check', value: 'vis[4] == 1 AND neighbor 4 != parent 1' },
        { label: 'Interpretation', value: 'Another BFS branch (from node 2) reached 4 first!' },
        { label: 'Verdict', value: 'Cycle detected (isCycle = true)' }
      ]
    },
    variables: {
      activeNode: 3,
      parent: 1,
      queue: '[(4, 2)]',
      cycleDetected: true
    },
    metrics: {
      queueSize: 1,
      nodesVisited: '4 / 4',
      cycleFound: 'TRUE'
    },
    explain: 'At node 3: neighbor 4 is ALREADY visited (vis[4]==1) and is NOT parent 1! Two BFS waves collided at node 4, proving a cycle exists!',
    intuition: 'When two different paths from the same ancestor meet at a common vertex, a cycle is geometrically established.'
  }
];

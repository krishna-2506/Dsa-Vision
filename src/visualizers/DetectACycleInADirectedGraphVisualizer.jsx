export const rendererType = 'queue';

export const meta = {
  title: 'Detect Cycle in a Directed Graph (Kahn\'s BFS)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V) in-degree array & queue',
  description: 'Uses Kahn\'s Algorithm (BFS with In-degree count) to detect cycles in a Directed Graph. If the number of nodes in topological sort is strictly less than V, a directed cycle exists.'
};

export const ideaMap = {
  title: 'Kahn\'s Directed Cycle In-Degree Trapping Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'In-Degree Calculation',
      detail: 'Tabulate the number of incoming edges (in-degree) for all vertices in the directed graph.'
    },
    {
      id: 'step2',
      label: 'Zero-Prerequisite Seeding',
      detail: 'Nodes with in-degree 0 have no incoming barriers and are pushed into the BFS queue.'
    },
    {
      id: 'step3',
      label: 'Topological Peel-Off',
      detail: 'Dequeue a node, increment topological node count, and decrement in-degrees of all outgoing neighbors.'
    },
    {
      id: 'step4',
      label: 'Count < V Cycle Verdict',
      detail: 'Nodes participating in a directed cycle maintain mutual incoming dependencies and never hit in-degree 0.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Detect Cycle in Directed Graph using Kahn's Algorithm
// Time Complexity: O(V + E) | Space Complexity: O(V)
#include <vector>
#include <queue>
using namespace std;

bool isCyclic(int V, vector<vector<int>>& adj) {
    vector<int> indegree(V, 0);
    for (int i = 0; i < V; i++) {
        for (auto it : adj[i]) indegree[it]++;
    }
    
    queue<int> q;
    for (int i = 0; i < V; i++) {
        if (indegree[i] == 0) q.push(i);
    }
    
    int count = 0;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        count++;
        
        for (auto it : adj[node]) {
            indegree[it]--;
            if (indegree[it] == 0) q.push(it);
        }
    }
    // If topological count < V, a directed cycle exists!
    return (count < V);
}`,
  java: `// Java: Cycle Detection in Directed Graph (Kahn's)
// Time Complexity: O(V + E) | Space Complexity: O(V)
import java.util.*;

class Solution {
    public boolean isCyclic(int V, ArrayList<ArrayList<Integer>> adj) {
        int[] indegree = new int[V];
        for (int i = 0; i < V; i++) {
            for (int it : adj.get(i)) indegree[it]++;
        }
        
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < V; i++) {
            if (indegree[i] == 0) q.offer(i);
        }
        
        int count = 0;
        while (!q.isEmpty()) {
            int node = q.poll();
            count++;
            for (int it : adj.get(node)) {
                indegree[it]--;
                if (indegree[it] == 0) q.offer(it);
            }
        }
        return count < V;
    }
}`,
  python: `# Python: Cycle Detection in Directed Graph (Kahn's Algorithm)
# Time Complexity: O(V + E) | Space Complexity: O(V)
from collections import deque

def isCyclic(V: int, adj: list[list[int]]) -> bool:
    indegree = [0] * V
    for u in range(V):
        for v in adj[u]:
            indegree[v] += 1
            
    q = deque([i for i in range(V) if indegree[i] == 0])
    count = 0
    
    while q:
        node = q.popleft()
        count += 1
        for neighbor in adj[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                q.append(neighbor)
                
    return count < V`,
  javascript: `// JavaScript: Cycle Detection in Directed Graph (Kahn's Algorithm)
// Time Complexity: O(V + E) | Space Complexity: O(V)
function isCyclic(V, adj) {
  const indegree = new Array(V).fill(0);
  for (let i = 0; i < V; i++) {
    for (const v of adj[i]) indegree[v]++;
  }
  
  const q = [];
  for (let i = 0; i < V; i++) {
    if (indegree[i] === 0) q.push(i);
  }
  
  let count = 0;
  while (q.length > 0) {
    const node = q.shift();
    count++;
    for (const v of adj[node]) {
      indegree[v]--;
      if (indegree[v] === 0) q.push(v);
    }
  }
  return count < V;
}`
};

export const steps = [
  {
    phase: 'SETUP',
    title: '1. In-Degree Initialization: Queue [Node 0]',
    mode: 'queue',
    queue: ['Node 0'],
    inputTrack: {
      items: [0, 2, 1, 1],
      label: 'In-Degrees [Node 0..3]'
    },
    scanIndex: 0,
    activeIndices: [0],
    customCard: {
      title: 'Directed Graph In-Degree Status',
      rows: [
        { label: 'Directed Edges', value: '0->1, 1->2, 2->3, 3->1', accent: true },
        { label: 'Calculated In-Degrees', value: 'n0: 0, n1: 2, n2: 1, n3: 1' },
        { label: 'Zero In-Degree Queue', value: '[ Node 0 ]' },
        { label: 'Topological Count', value: '0 / 4' }
      ]
    },
    variables: {
      topologicalCount: 0,
      totalVertices: 4,
      queue: '[0]',
      cycleDetected: 'Evaluating...'
    },
    metrics: {
      processedNodes: '0 / 4',
      queueSize: 1,
      hasCycle: 'Pending'
    },
    explain: 'Node 0 has 0 incoming edges (in-degree = 0). Enqueue Node 0. All other nodes have incoming dependencies.',
    intuition: 'Only nodes with zero dependencies can be processed first in any topological ordering.'
  },
  {
    phase: 'DEQUEUE_0',
    title: '2. Dequeue Node 0: Decrement in-degree[1] from 2 to 1',
    mode: 'queue',
    queue: [],
    inputTrack: {
      items: [0, 1, 1, 1],
      label: 'In-Degrees [Node 0..3]'
    },
    scanIndex: 1,
    activeIndices: [1],
    customCard: {
      title: 'Process Zero-In-Degree Node',
      rows: [
        { label: 'Dequeued Node', value: 'Node 0', accent: true },
        { label: 'Topological Count', value: 'Increments to 1' },
        { label: 'Outgoing Edge 0 -> 1', value: 'indegree[1] drops 2 -> 1' },
        { label: 'New In-Degree of 1', value: '1 != 0 (Cannot enqueue Node 1)' }
      ]
    },
    variables: {
      topologicalCount: 1,
      totalVertices: 4,
      queue: '[] (Empty)',
      cycleDetected: 'Deadlock imminent'
    },
    metrics: {
      processedNodes: '1 / 4',
      queueSize: 0,
      hasCycle: 'Pending'
    },
    explain: 'Node 0 processed and popped. Edge 0->1 reduces in-degree[1] to 1. But node 1 still has incoming edge from 3, so in-degree is not 0!',
    intuition: 'If in-degree is still non-zero, the node is blocked by an unresolved cycle or dependency.'
  },
  {
    phase: 'DEADLOCK',
    title: '3. Queue Empty! Nodes {1, 2, 3} Trapped in Cycle',
    mode: 'queue',
    queue: [],
    inputTrack: {
      items: [0, 1, 1, 1],
      label: 'Trapped In-Degrees (Stuck at 1)'
    },
    scanIndex: 1,
    activeIndices: [1, 2, 3],
    customCard: {
      title: 'Cyclic Deadlock Reached',
      rows: [
        { label: 'Queue Status', value: 'Empty [] while nodes remain!', accent: true },
        { label: 'Trapped Cycle', value: '1 -> 2 -> 3 -> 1' },
        { label: 'Cycle In-Degrees', value: 'Each cycle node has in-degree == 1' },
        { label: 'Kahn\'s Condition', value: 'No zero in-degree node can ever emerge' }
      ]
    },
    variables: {
      topologicalCount: 1,
      totalVertices: 4,
      queue: '[]',
      cycleDetected: true
    },
    metrics: {
      processedNodes: '1 / 4',
      queueSize: 0,
      hasCycle: 'TRUE'
    },
    explain: 'The queue has emptied prematurely! Nodes 1, 2, and 3 are mutually dependent in cycle 1 -> 2 -> 3 -> 1, preventing their in-degrees from ever reaching 0.',
    intuition: 'A directed cycle creates an unbreakable deadlock where no node has zero in-degree.'
  },
  {
    phase: 'COMPLETE',
    title: '4. Final Verdict: count (1) < V (4) => DIRECTED CYCLE PRESENT!',
    mode: 'queue',
    queue: [],
    inputTrack: {
      items: [0, 1, 1, 1],
      label: 'Final In-Degree State'
    },
    scanIndex: 1,
    activeIndices: [1, 2, 3],
    customCard: {
      title: 'Directed Cycle Confirmed',
      rows: [
        { label: 'Topological Count', value: '1 node resolved', accent: true },
        { label: 'Total Vertices (V)', value: '4 nodes in graph' },
        { label: 'Inequality', value: 'count (1) < V (4) (Strictly Less!)' },
        { label: 'Verdict', value: 'isCyclic = true' }
      ]
    },
    variables: {
      topologicalCount: 1,
      totalVertices: 4,
      queue: '[]',
      cycleDetected: true
    },
    metrics: {
      processedNodes: '1 / 4',
      queueSize: 0,
      hasCycle: 'TRUE'
    },
    explain: 'Topological count is 1, which is strictly less than V = 4. A directed cycle exists in the graph! isCyclic returns true.',
    intuition: 'Kahn\'s algorithm only processes all V vertices if the graph is a Directed Acyclic Graph (DAG).'
  }
];

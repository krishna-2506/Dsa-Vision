export const rendererType = 'array-scan';

export const meta = {
  title: 'Find Eventual Safe States',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V)',
  description: 'Finds all safe nodes in a directed graph where every possible path leads to a terminal node (no outgoing edges) and never enters a cycle (LeetCode 802).'
};

export const ideaMap = {
  title: 'Reversed Graph Topological Safety Propagation',
  nodes: [
    {
      id: 'step1',
      label: 'Edge Inversion (G -> G_rev)',
      detail: 'Reverse every directed edge u -> v into v -> u so that terminal nodes (out-degree 0) become sources with in-degree 0.'
    },
    {
      id: 'step2',
      label: 'Terminal Node Seeding',
      detail: 'Identify all nodes with in-degree 0 in G_rev and enqueue them as provably safe anchor points.'
    },
    {
      id: 'step3',
      label: 'In-Degree Safety Relaxation',
      detail: 'Dequeue safe node; decrement in-degrees of predecessors. When an in-degree reaches 0, all outgoing branches are safe.'
    },
    {
      id: 'step4',
      label: 'Cycle Trapped Pruning',
      detail: 'Nodes trapped in or leading to directed cycles never reach in-degree 0 and are naturally omitted from the safe list.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Find Eventual Safe States (LeetCode 802)
// Time Complexity: O(V + E) | Space Complexity: O(V)
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

// Method: Reverse Graph + Kahn's Algorithm
vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
    int V = graph.size();
    vector<vector<int>> adjRev(V);
    vector<int> indegree(V, 0);
    
    for (int i = 0; i < V; i++) {
        // original edge: i -> it, so reversed: it -> i
        for (auto it : graph[i]) {
            adjRev[it].push_back(i);
            indegree[i]++;
        }
    }
    
    queue<int> q;
    for (int i = 0; i < V; i++) {
        if (indegree[i] == 0) q.push(i);
    }
    
    vector<int> safeNodes;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        safeNodes.push_back(node);
        
        for (auto it : adjRev[node]) {
            indegree[it]--;
            if (indegree[it] == 0) q.push(it);
        }
    }
    sort(safeNodes.begin(), safeNodes.end());
    return safeNodes;
}`,
  java: `// Java: Eventual Safe States (Reverse Graph Kahn's)
// Time Complexity: O(V + E) | Space Complexity: O(V)
import java.util.*;

class Solution {
    public List<Integer> eventualSafeNodes(int[][] graph) {
        int V = graph.length;
        List<List<Integer>> adjRev = new ArrayList<>();
        for (int i = 0; i < V; i++) adjRev.add(new ArrayList<>());
        int[] indegree = new int[V];
        
        for (int i = 0; i < V; i++) {
            for (int it : graph[i]) {
                adjRev.get(it).add(i);
                indegree[i]++;
            }
        }
        
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < V; i++) {
            if (indegree[i] == 0) q.offer(i);
        }
        
        List<Integer> safeNodes = new ArrayList<>();
        while (!q.isEmpty()) {
            int node = q.poll();
            safeNodes.add(node);
            for (int it : adjRev.get(node)) {
                indegree[it]--;
                if (indegree[it] == 0) q.offer(it);
            }
        }
        Collections.sort(safeNodes);
        return safeNodes;
    }
}`,
  python: `# Python: Find Eventual Safe States (LeetCode 802)
# Time Complexity: O(V + E) | Space Complexity: O(V)
from collections import deque

def eventualSafeNodes(graph: list[list[int]]) -> list[int]:
    V = len(graph)
    adj_rev = [[] for _ in range(V)]
    indegree = [0] * V
    
    for i in range(V):
        for it in graph[i]:
            adj_rev[it].append(i)
            indegree[i] += 1
            
    q = deque([i for i in range(V) if indegree[i] == 0])
    safe = []
    
    while q:
        node = q.popleft()
        safe.append(node)
        for it in adj_rev[node]:
            indegree[it] -= 1
            if indegree[it] == 0:
                q.append(it)
                
    return sorted(safe)`,
  javascript: `// JavaScript: Eventual Safe States (LeetCode 802)
// Time Complexity: O(V + E) | Space Complexity: O(V)
function eventualSafeNodes(graph) {
  const V = graph.length;
  const adjRev = Array.from({ length: V }, () => []);
  const indegree = new Array(V).fill(0);
  
  for (let i = 0; i < V; i++) {
    for (const it of graph[i]) {
      adjRev[it].push(i);
      indegree[i]++;
    }
  }
  
  const q = [];
  for (let i = 0; i < V; i++) {
    if (indegree[i] === 0) q.push(i);
  }
  
  const safe = [];
  while (q.length > 0) {
    const node = q.shift();
    safe.push(node);
    for (const it of adjRev[node]) {
      indegree[it]--;
      if (indegree[it] === 0) q.push(it);
    }
  }
  return safe.sort((a, b) => a - b);
}`
};

export const steps = [
  {
    phase: 'TERMINAL_IDENTIFICATION',
    title: '1. Seed Reverse Queue with Terminal Nodes (5 & 6)',
    arr: [0, 1, 2, 3, 4, 5, 6],
    auxiliaryTrack: ['Cycle', 'Cycle', 'Safe', 'Safe', 'Safe', 'Terminal', 'Terminal'],
    auxiliaryLabel: 'Node Classification',
    activeIndices: [5, 6],
    customCard: {
      title: 'Terminal Nodes Discovery',
      rows: [
        { label: 'Terminal Vertices', value: 'Nodes 5 & 6 (0 outgoing edges in G)', accent: true },
        { label: 'Reverse In-Degree', value: 'indegree[5]=0, indegree[6]=0 in G_rev' },
        { label: 'Initial Queue', value: '[ Node 5, Node 6 ]' },
        { label: 'Safe List', value: '[] (Empty)' }
      ]
    },
    variables: {
      queue: '[5, 6]',
      safeNodes: '[]',
      cycleTrapped: '[0, 1]'
    },
    metrics: {
      safeCount: '0 / 7',
      queueSize: 2,
      cycleNodes: 2
    },
    explain: 'Nodes 5 and 6 have no outgoing edges (terminal nodes). In the reversed graph, their in-degrees are 0! Enqueued as safe roots.',
    intuition: 'Every path reaching a terminal node ends immediately, guaranteeing no cycles are entered.'
  },
  {
    phase: 'PROPAGATE',
    title: '2. Dequeue 5 & 6: Propagate Safety to Predecessor Node 4',
    arr: [0, 1, 2, 3, 4, 5, 6],
    auxiliaryTrack: ['Cycle', 'Cycle', 'Safe', 'Safe', 'Safe', 'Terminal', 'Terminal'],
    auxiliaryLabel: 'Node Classification',
    activeIndices: [4],
    customCard: {
      title: 'Safety Back-Propagation',
      rows: [
        { label: 'Processed Anchors', value: 'Nodes 5 & 6 appended to safe list', accent: true },
        { label: 'Predecessor Node 4', value: 'Only points to 5 in original graph' },
        { label: 'Node 4 In-Degree (G_rev)', value: 'Drops to 0 (Enqueued!)' },
        { label: 'Safe List', value: '[5, 6]' }
      ]
    },
    variables: {
      queue: '[4]',
      safeNodes: '[5, 6]',
      cycleTrapped: '[0, 1]'
    },
    metrics: {
      safeCount: '2 / 7',
      queueSize: 1,
      cycleNodes: 2
    },
    explain: 'Popped 5 & 6. Predecessor node 4 only points to 5, so all paths from 4 are safe! Node 4 in-degree reaches 0 and is enqueued.',
    intuition: 'If all outgoing paths from a node lead exclusively to known safe nodes, that node is also safe.'
  },
  {
    phase: 'CYCLE_AVOIDANCE',
    title: '3. Process Safe Nodes (4, 2): Cycle Trapped Nodes (0, 1) Filtered Out',
    arr: [0, 1, 2, 3, 4, 5, 6],
    auxiliaryTrack: ['Cycle (0<->1)', 'Cycle (0<->1)', 'Safe', 'Safe', 'Safe', 'Terminal', 'Terminal'],
    auxiliaryLabel: 'Node Classification',
    activeIndices: [0, 1],
    customCard: {
      title: 'Directed Cycle Trapped Detection',
      rows: [
        { label: 'Cycle Components', value: 'Nodes 0 and 1 form 0 <-> 1 cycle', accent: true },
        { label: 'Reverse In-Degree', value: 'indegree[0] >= 1, indegree[1] >= 1 forever' },
        { label: 'Queue Status', value: 'Nodes 0 & 1 never entered the queue' },
        { label: 'Safe List So Far', value: '[5, 6, 4, 2]' }
      ]
    },
    variables: {
      queue: '[] (Empty)',
      safeNodes: '[5, 6, 4, 2]',
      cycleTrapped: '[0, 1]'
    },
    metrics: {
      safeCount: '4 / 7',
      queueSize: 0,
      cycleNodes: 2
    },
    explain: 'Nodes 0 & 1 are stuck in cycle 0 <-> 1. Their in-degrees in reverse graph never reach 0. They are permanently excluded from the safe set!',
    intuition: 'Nodes involved in directed cycles can loop infinitely and thus cannot guarantee terminal arrival.'
  },
  {
    phase: 'COMPLETE',
    title: '4. Final Sorted Safe Nodes: [2, 4, 5, 6]',
    arr: [0, 1, 2, 3, 4, 5, 6],
    auxiliaryTrack: ['Cycle', 'Cycle', 'Safe', 'Safe', 'Safe', 'Terminal', 'Terminal'],
    auxiliaryLabel: 'Final Safety Status',
    activeIndices: [2, 4, 5, 6],
    customCard: {
      title: 'Eventual Safe States Solved',
      rows: [
        { label: 'Final Safe Nodes', value: '[2, 4, 5, 6] (Sorted)', accent: true },
        { label: 'Total Safe Count', value: '4 out of 7 nodes' },
        { label: 'Cycle Blocked Nodes', value: '{ 0, 1, 3 } excluded' },
        { label: 'Status', value: 'Success' }
      ]
    },
    variables: {
      queue: '[] (Empty)',
      safeNodes: '[2, 4, 5, 6]',
      cycleTrapped: '[0, 1, 3]'
    },
    metrics: {
      safeCount: '4 / 7',
      queueSize: 0,
      cycleNodes: 3
    },
    explain: 'Sorted safe nodes returned: [2, 4, 5, 6]. Guaranteed that every execution path leads directly to a terminal node.',
    intuition: 'Reversed topological sort isolates all nodes whose downstream closure is strictly cycle-free.'
  }
];

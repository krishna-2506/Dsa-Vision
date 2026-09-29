export const rendererType = 'array-scan';

export const meta = {
  title: 'Dijkstra\'s Algorithm (Priority Queue)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(E log V)',
  spaceComplexity: 'O(V + E)',
  description: 'Finds single-source shortest paths in weighted graphs with non-negative edge weights using a Min-Heap / Priority Queue storing {distance, node} pairs.'
};

export const ideaMap = {
  title: 'Dijkstra Greedy Shortest Path Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Distance Array & PQ Initialization',
      detail: 'Set dist[src] = 0 and all other nodes to infinity; push (0, src) into the Min-Heap priority queue.'
    },
    {
      id: 'step2',
      label: 'Min-Distance Extraction',
      detail: 'Greedily extract the vertex u with minimum provisional distance from the priority queue.'
    },
    {
      id: 'step3',
      label: 'Edge Relaxation',
      detail: 'For each neighbor v with edge weight w, if dist[u] + w < dist[v], update dist[v] and push (dist[v], v) to PQ.'
    },
    {
      id: 'step4',
      label: 'Optimal Convergence',
      detail: 'Because edge weights are non-negative, once a node is settled it is guaranteed optimal.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Dijkstra's Algorithm using Priority Queue
// Time Complexity: O(E log V) | Space Complexity: O(V + E)
#include <vector>
#include <queue>
using namespace std;

vector<int> dijkstra(int V, vector<vector<pair<int, int>>>& adj, int S) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<int> dist(V, 1e9);
    
    dist[S] = 0;
    pq.push({0, S}); // {distance, node}
    
    while (!pq.empty()) {
        int dis = pq.top().first;
        int node = pq.top().second;
        pq.pop();
        
        if (dis > dist[node]) continue;
        
        for (auto it : adj[node]) {
            int edgeWeight = it.second;
            int adjNode = it.first;
            
            if (dis + edgeWeight < dist[adjNode]) {
                dist[adjNode] = dis + edgeWeight;
                pq.push({dist[adjNode], adjNode});
            }
        }
    }
    return dist;
}`,
  java: `// Java: Dijkstra's Algorithm
// Time Complexity: O(E log V) | Space Complexity: O(V + E)
import java.util.*;

class iPair {
    int first, second;
    iPair(int f, int s) { first = f; second = s; }
}

class Solution {
    ArrayList<Integer> dijkstra(ArrayList<ArrayList<iPair>> adj, int src) {
        int V = adj.size();
        PriorityQueue<iPair> pq = new PriorityQueue<>((a, b) -> a.first - b.first);
        int[] dist = new int[V];
        Arrays.fill(dist, (int)1e9);
        dist[src] = 0;
        pq.add(new iPair(0, src));
        
        while (!pq.isEmpty()) {
            iPair curr = pq.poll();
            int dis = curr.first;
            int node = curr.second;
            
            if (dis > dist[node]) continue;
            
            for (iPair edge : adj.get(node)) {
                int adjNode = edge.first;
                int weight = edge.second;
                
                if (dis + weight < dist[adjNode]) {
                    dist[adjNode] = dis + weight;
                    pq.add(new iPair(dist[adjNode], adjNode));
                }
            }
        }
        ArrayList<Integer> ans = new ArrayList<>();
        for (int d : dist) ans.add(d);
        return ans;
    }
}`,
  python: `# Python: Dijkstra's Algorithm
# Time Complexity: O(E log V) | Space Complexity: O(V + E)
import heapq

def dijkstra(V, adj, S):
    dist = [float('inf')] * V
    dist[S] = 0
    pq = [(0, S)]  # (distance, node)
    
    while pq:
        dis, node = heapq.heappop(pq)
        
        if dis > dist[node]:
            continue
            
        for adj_node, weight in adj[node]:
            if dis + weight < dist[adj_node]:
                dist[adj_node] = dis + weight
                heapq.heappush(pq, (dist[adj_node], adj_node))
                
    return dist`,
  javascript: `// JavaScript: Dijkstra's Algorithm
// Time Complexity: O(E log V) | Space Complexity: O(V + E)
function dijkstra(V, adj, S) {
  const dist = new Array(V).fill(Infinity);
  dist[S] = 0;
  const pq = [[0, S]]; // [distance, node]
  
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [dis, node] = pq.shift();
    
    if (dis > dist[node]) continue;
    
    for (const [adjNode, weight] of adj[node]) {
      if (dis + weight < dist[adjNode]) {
        dist[adjNode] = dis + weight;
        pq.push([dist[adjNode], adjNode]);
      }
    }
  }
  return dist;
}`
};

export const steps = [
  {
    phase: 'INITIALIZE',
    title: '1. Source Vertex 0 Initialized with Distance 0',
    arr: [0, 1, 2],
    auxiliaryTrack: ['0', '∞', '∞'],
    auxiliaryLabel: 'Tentative Shortest Distances (dist)',
    activeIndices: [0],
    customCard: {
      title: 'Min-Heap Priority Queue State',
      rows: [
        { label: 'Source Node', value: 'Vertex 0', accent: true },
        { label: 'Priority Queue', value: '[(dist: 0, node: 0)]' },
        { label: 'Initial Target', value: 'Settle single-source shortest distances' },
        { label: 'Graph Edges', value: '0-(4)->1, 0-(4)->2, 1-(2)->2' }
      ]
    },
    variables: {
      activeNode: 0,
      minHeapTop: '(0, 0)',
      pqSize: 1,
      distValues: '[0, ∞, ∞]'
    },
    metrics: {
      settledVertices: '1 / 3',
      pqSize: 1,
      currentMinDist: 0
    },
    explain: 'Source vertex 0 initialized with distance 0. All other vertices set to ∞. Insert pair (0, node 0) into Min-Heap.',
    intuition: 'Dijkstra always processes the vertex with the lowest known provisional distance first.'
  },
  {
    phase: 'RELAX_0',
    title: '2. Pop (0, 0): Relax Edges to Vertex 1 & Vertex 2',
    arr: [0, 1, 2],
    auxiliaryTrack: ['0', '4', '4'],
    auxiliaryLabel: 'Tentative Shortest Distances (dist)',
    activeIndices: [1, 2],
    customCard: {
      title: 'Edge Relaxation from Vertex 0',
      rows: [
        { label: 'Popped Pair', value: '(dist: 0, node: 0)', accent: true },
        { label: 'Relax Edge 0 -> 1', value: '0 + 4 = 4 < ∞ (Updated!)' },
        { label: 'Relax Edge 0 -> 2', value: '0 + 4 = 4 < ∞ (Updated!)' },
        { label: 'Updated PQ', value: '[(4, 1), (4, 2)]' }
      ]
    },
    variables: {
      activeNode: 0,
      minHeapTop: '(4, 1)',
      pqSize: 2,
      distValues: '[0, 4, 4]'
    },
    metrics: {
      settledVertices: '1 / 3',
      pqSize: 2,
      currentMinDist: 4
    },
    explain: 'Pop (0, 0). Edges from 0 relax dist[1] = 4 and dist[2] = 4. Both (4, 1) and (4, 2) are enqueued into the Min-Heap.',
    intuition: 'Relaxation shortens path estimates whenever a detour through the active node yields a lower total distance.'
  },
  {
    phase: 'RELAX_1',
    title: '3. Pop (4, 1): Inspect Edge 1 -> 2 (No Improvement)',
    arr: [0, 1, 2],
    auxiliaryTrack: ['0', '4', '4'],
    auxiliaryLabel: 'Tentative Shortest Distances (dist)',
    activeIndices: [1],
    customCard: {
      title: 'Relaxation Inspection from Vertex 1',
      rows: [
        { label: 'Popped Pair', value: '(dist: 4, node: 1)', accent: true },
        { label: 'Edge 1 -> 2', value: 'Weight = 2' },
        { label: 'Test Path', value: '4 + 2 = 6 vs existing dist[2] = 4' },
        { label: 'Action', value: 'No relaxation (6 > 4)' }
      ]
    },
    variables: {
      activeNode: 1,
      minHeapTop: '(4, 2)',
      pqSize: 1,
      distValues: '[0, 4, 4]'
    },
    metrics: {
      settledVertices: '2 / 3',
      pqSize: 1,
      currentMinDist: 4
    },
    explain: 'Pop (4, 1). Distance to 2 via 1 would be 4 + 2 = 6, which is worse than the existing dist[2] of 4. No update is made.',
    intuition: 'Greedy ordering prevents suboptimal paths from overwriting already found tighter upper bounds.'
  },
  {
    phase: 'COMPLETE',
    title: '4. Pop (4, 2): Queue Empty! Shortest Distances Finalized',
    arr: [0, 1, 2],
    auxiliaryTrack: ['0', '4', '4'],
    auxiliaryLabel: 'Final Shortest Distances (dist)',
    activeIndices: [0, 1, 2],
    customCard: {
      title: 'Dijkstra Search Terminated',
      rows: [
        { label: 'Popped Pair', value: '(dist: 4, node: 2)', accent: true },
        { label: 'Priority Queue', value: 'Empty []' },
        { label: 'Final Distances', value: 'dist[0]=0, dist[1]=4, dist[2]=4' },
        { label: 'Overall Complexity', value: 'O(E log V)' }
      ]
    },
    variables: {
      activeNode: 2,
      minHeapTop: 'None',
      pqSize: 0,
      distValues: '[0, 4, 4]'
    },
    metrics: {
      settledVertices: '3 / 3',
      pqSize: 0,
      currentMinDist: 4
    },
    explain: 'Pop (4, 2). All reachable vertices finalized in greedy shortest order! The shortest distances from source 0 are [0, 4, 4].',
    intuition: 'Once the priority queue is empty, all reachable vertices have achieved their provably minimal geodesic distances.'
  }
];

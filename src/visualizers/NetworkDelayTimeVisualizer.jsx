export const rendererType = 'array-scan';

export const meta = {
  title: 'Network Delay Time',
  category: 'Graphs',
  difficulty: 'Medium',
  timeComplexity: 'O(E log V)',
  spaceComplexity: 'O(V + E)',
  description: 'Calculates the minimum time required for all N nodes in a directed network to receive a signal sent from source node K. Uses Dijkstra\'s Algorithm and computes max(dist) across all nodes (LeetCode 743).'
};

export const ideaMap = {
  title: 'Dijkstra Network Signal Propagation Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Dijkstra Source Setup',
      detail: 'Set dist[K] = 0 and all other node arrival times to infinity; push (time=0, node=K) into min-heap.'
    },
    {
      id: 'step2',
      label: 'Earliest Signal Extraction',
      detail: 'Greedily pop the node u with the minimum elapsed arrival time from the priority queue.'
    },
    {
      id: 'step3',
      label: 'Edge Propagation Relaxation',
      detail: 'For each neighbor v via edge (u, v, w), if dist[u] + w < dist[v], update dist[v] and enqueue (dist[v], v).'
    },
    {
      id: 'step4',
      label: 'Max Delay Bottleneck Check',
      detail: 'If any node remains at infinity, return -1. Otherwise, the answer is max(dist[1..N]).'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Network Delay Time (LeetCode 743)
// Time Complexity: O(E log V) | Space Complexity: O(V + E)
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<vector<pair<int, int>>> adj(n + 1);
        for (const auto& t : times) {
            adj[t[0]].push_back({t[1], t[2]}); // {dest, weight}
        }

        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        vector<int> dist(n + 1, 1e9);

        dist[k] = 0;
        pq.push({0, k}); // {time, node}

        while (!pq.empty()) {
            int time = pq.top().first;
            int u = pq.top().second;
            pq.pop();

            if (time > dist[u]) continue;

            for (const auto& edge : adj[u]) {
                int v = edge.first, wt = edge.second;
                if (time + wt < dist[v]) {
                    dist[v] = time + wt;
                    pq.push({dist[v], v});
                }
            }
        }

        int maxDelay = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == 1e9) return -1; // Unreachable node
            maxDelay = max(maxDelay, dist[i]);
        }
        return maxDelay;
    }
};`,
  java: `// Java: Network Delay Time (LeetCode 743)
// Time Complexity: O(E log V) | Space Complexity: O(V + E)
import java.util.*;

class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
        for (int[] t : times) {
            adj.get(t[0]).add(new int[]{t[1], t[2]}); // {neighbor, weight}
        }

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        int[] dist = new int[n + 1];
        Arrays.fill(dist, Integer.MAX_VALUE);

        dist[k] = 0;
        pq.offer(new int[]{0, k}); // {time, node}

        while (!pq.isEmpty()) {
            int[] top = pq.poll();
            int time = top[0], u = top[1];

            if (time > dist[u]) continue;

            for (int[] edge : adj.get(u)) {
                int v = edge[0], wt = edge[1];
                if (time + wt < dist[v]) {
                    dist[v] = time + wt;
                    pq.offer(new int[]{dist[v], v});
                }
            }
        }

        int maxDelay = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == Integer.MAX_VALUE) return -1;
            maxDelay = Math.max(maxDelay, dist[i]);
        }
        return maxDelay;
    }
}`,
  python: `# Python: Network Delay Time (LeetCode 743)
# Time Complexity: O(E log V) | Space Complexity: O(V + E)
import heapq
from collections import defaultdict

class Solution:
    def networkDelayTime(self, times: list[list[int]], n: int, k: int) -> int:
        adj = defaultdict(list)
        for u, v, w in times:
            adj[u].append((v, w))

        pq = [(0, k)]  # (time, node)
        dist = {i: float('inf') for i in range(1, n + 1)}
        dist[k] = 0

        while pq:
            time, u = heapq.heappop(pq)

            if time > dist[u]:
                continue

            for v, w in adj[u]:
                if time + w < dist[v]:
                    dist[v] = time + w
                    heapq.heappush(pq, (time + w, v))

        max_delay = max(dist.values())
        return max_delay if max_delay < float('inf') else -1`,
  javascript: `// JavaScript: Network Delay Time (LeetCode 743)
// Time Complexity: O(E log V) | Space Complexity: O(V + E)
function networkDelayTime(times, n, k) {
    const adj = Array.from({ length: n + 1 }, () => []);
    for (const [u, v, w] of times) {
        adj[u].push([v, w]);
    }

    const dist = new Array(n + 1).fill(Infinity);
    dist[k] = 0;

    const pq = [[0, k]]; // [time, node]

    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        const [time, u] = pq.shift();

        if (time > dist[u]) continue;

        for (const [v, w] of adj[u]) {
            if (time + w < dist[v]) {
                dist[v] = time + w;
                pq.push([dist[v], v]);
            }
        }
    }

    let maxDelay = 0;
    for (let i = 1; i <= n; i++) {
        if (dist[i] === Infinity) return -1;
        maxDelay = Math.max(maxDelay, dist[i]);
    }
    return maxDelay;
}`
};

export const steps = [
  {
    phase: 'INITIALIZE',
    title: 'Initialize Dijkstra: Source Node K = 2 (Time = 0)',
    arr: [1, 2, 3, 4],
    auxiliaryTrack: ['∞', '0', '∞', '∞'],
    auxiliaryLabel: 'Signal Arrival Times (dist)',
    activeIndices: [1],
    customCard: {
      title: 'Network Broadcast Initialization',
      rows: [
        { label: 'Source Node (K)', value: 'Node 2', accent: true },
        { label: 'Network Edges', value: '2->1 (wt 1), 2->3 (wt 1), 3->4 (wt 1)' },
        { label: 'Priority Queue', value: '[(0, Node 2)]' },
        { label: 'Initial Target', value: 'Broadcast signal to all 4 nodes' }
      ]
    },
    variables: {
      source: 2,
      pq: '[(0, 2)]',
      dist2: 0,
      unreachedCount: 3
    },
    metrics: {
      reachedNodes: '1 / 4',
      currentMaxTime: 0,
      activeNode: 2
    },
    explain: 'Start Dijkstra at broadcast source Node 2 with elapsed time 0. All other nodes have arrival time initialized to infinity (∞).',
    intuition: 'Dijkstra expands outward in expanding concentric waves of arrival time.'
  },
  {
    phase: 'RELAX_FROM_NODE_2',
    title: 'Explore from Node 2: Signals Reach Node 1 (Time=1) and Node 3 (Time=1)',
    arr: [1, 2, 3, 4],
    auxiliaryTrack: ['1', '0', '1', '∞'],
    auxiliaryLabel: 'Signal Arrival Times (dist)',
    activeIndices: [0, 2],
    customCard: {
      title: 'Signal Wave Propagation',
      rows: [
        { label: 'Edge 2 -> 1 (w=1)', value: 'dist[1] = 0 + 1 = 1', accent: true },
        { label: 'Edge 2 -> 3 (w=1)', value: 'dist[3] = 0 + 1 = 1', accent: true },
        { label: 'Updated Heap', value: '[(1, Node 1), (1, Node 3)]' }
      ]
    },
    variables: {
      popped: 2,
      'dist[1]': 1,
      'dist[3]': 1,
      nextPqTop: '(1, Node 1)'
    },
    metrics: {
      reachedNodes: '3 / 4',
      currentMaxTime: 1,
      activeNode: 2
    },
    explain: 'Node 2 transmits along edges (2,1) and (2,3). Both signals arrive at time 1. Arrival times for nodes 1 and 3 are updated to 1.',
    intuition: 'Nodes 1 and 3 receive the transmission simultaneously.'
  },
  {
    phase: 'VISIT_NODE_1',
    title: 'Process Node 1 (Time=1): Terminal Node with No Outgoing Links',
    arr: [1, 2, 3, 4],
    auxiliaryTrack: ['1', '0', '1', '∞'],
    auxiliaryLabel: 'Signal Arrival Times (dist)',
    activeIndices: [0],
    customCard: {
      title: 'Node 1 Signal Received',
      rows: [
        { label: 'Popped State', value: '(Time: 1, Node: 1)' },
        { label: 'Outgoing Edges', value: 'None (Leaf destination)', accent: true },
        { label: 'Next in Queue', value: '(Time: 1, Node: 3)' }
      ]
    },
    variables: {
      popped: 1,
      elapsedTime: 1,
      outgoing: 0
    },
    metrics: {
      reachedNodes: '3 / 4',
      currentMaxTime: 1,
      activeNode: 1
    },
    explain: 'Pop Node 1 at time 1. It has no outgoing edges. The signal halts here and the algorithm proceeds to the next earliest arrival.',
    intuition: 'Dead-end nodes absorb the signal without forwarding.'
  },
  {
    phase: 'RELAX_FROM_NODE_3',
    title: 'Explore from Node 3 (Time=1): Signal Reaches Node 4 (Time = 1 + 1 = 2)',
    arr: [1, 2, 3, 4],
    auxiliaryTrack: ['1', '0', '1', '2'],
    auxiliaryLabel: 'Signal Arrival Times (dist)',
    activeIndices: [3],
    customCard: {
      title: 'Final Hop to Node 4',
      rows: [
        { label: 'Edge 3 -> 4 (w=1)', value: 'dist[4] = dist[3] + 1 = 1 + 1 = 2', accent: true },
        { label: 'Updated Heap', value: '[(2, Node 4)]' },
        { label: 'Unreached Nodes', value: '0 (All nodes received signal!)' }
      ]
    },
    variables: {
      popped: 3,
      'dist[4]': 2,
      maxReachedTime: 2
    },
    metrics: {
      reachedNodes: '4 / 4',
      currentMaxTime: 2,
      activeNode: 3
    },
    explain: 'Pop Node 3 at time 1. It forwards the signal across edge (3, 4) with weight 1. Node 4 receives the signal at time 1 + 1 = 2.',
    intuition: 'Cumulative delays accumulate along path 2 -> 3 -> 4.'
  },
  {
    phase: 'COMPLETE',
    title: 'Broadcast Complete: All 4 Nodes Received Signal | Total Delay = 2',
    arr: [1, 2, 3, 4],
    auxiliaryTrack: ['1', '0', '1', '2'],
    auxiliaryLabel: 'Final Arrival Times',
    activeIndices: [0, 1, 2, 3],
    customCard: {
      title: 'Global Delay Time Summary',
      rows: [
        { label: 'Arrival Times', value: 'Node 1: 1s, Node 2: 0s, Node 3: 1s, Node 4: 2s' },
        { label: 'Last Node Reached', value: 'Node 4 at time 2', accent: true },
        { label: 'Network Delay Time', value: 'max(1, 0, 1, 2) = 2' },
        { label: 'Algorithm Verdict', value: 'All nodes reachable; return 2' }
      ]
    },
    variables: {
      maxDelay: 2,
      unreachable: 'false',
      finalAnswer: 2
    },
    metrics: {
      reachedNodes: '4 / 4',
      currentMaxTime: 2,
      finalDelay: 2
    },
    explain: 'All 4 nodes received the broadcast signal. The last node to receive it was Node 4 at time 2. Therefore, the minimum network delay time is max(1, 0, 1, 2) = 2.',
    intuition: 'Network delay time equals the length of the longest shortest path from the broadcast source.'
  }
];

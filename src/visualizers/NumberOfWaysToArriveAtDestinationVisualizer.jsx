export const rendererType = 'dual-array';

export const meta = {
  title: 'Number of Ways to Arrive at Destination',
  category: 'Graphs',
  difficulty: 'Medium',
  timeComplexity: 'O(E log V)',
  spaceComplexity: 'O(V + E)',
  description: 'Calculates the number of distinct ways to arrive at destination node N-1 from source node 0 in the shortest possible time using Dijkstra with path counting (LeetCode 1976).'
};

export const ideaMap = {
  title: 'Dijkstra Multiplicity Counting Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Dual Array Initialization',
      detail: 'Set dist[0] = 0 and ways[0] = 1; for all other nodes, dist = infinity and ways = 0.'
    },
    {
      id: 'step2',
      label: 'Strict Shorter Path Relaxation',
      detail: 'If dis + wt < dist[v], a strictly shorter path is discovered: update dist[v] and reset ways[v] = ways[u].'
    },
    {
      id: 'step3',
      label: 'Equal Length Path Accumulation',
      detail: 'If dis + wt == dist[v], an alternative path of identical minimal length is found: ways[v] = (ways[v] + ways[u]) % MOD.'
    },
    {
      id: 'step4',
      label: 'Return ways[N - 1]',
      detail: 'When the min-heap empties, return ways[N - 1] as the total count of shortest routes.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Number of Ways to Arrive at Destination (LeetCode 1976)
// Time Complexity: O(E log V) | Space Complexity: O(V + E)
#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int countPaths(int n, vector<vector<int>>& roads) {
        vector<vector<pair<long long, long long>>> adj(n);
        for (const auto& r : roads) {
            adj[r[0]].push_back({r[1], r[2]});
            adj[r[1]].push_back({r[0], r[2]});
        }

        priority_queue<pair<long long, long long>,
                       vector<pair<long long, long long>>,
                       greater<pair<long long, long long>>> pq;

        vector<long long> dist(n, 1e18);
        vector<long long> ways(n, 0);
        long long mod = 1e9 + 7;

        dist[0] = 0;
        ways[0] = 1;
        pq.push({0, 0}); // {time, node}

        while (!pq.empty()) {
            long long dis = pq.top().first;
            long long u = pq.top().second;
            pq.pop();

            if (dis > dist[u]) continue;

            for (const auto& edge : adj[u]) {
                long long v = edge.first, wt = edge.second;

                // Case 1: Strictly shorter path found
                if (dis + wt < dist[v]) {
                    dist[v] = dis + wt;
                    pq.push({dist[v], v});
                    ways[v] = ways[u];
                }
                // Case 2: Additional path of equal minimal length
                else if (dis + wt == dist[v]) {
                    ways[v] = (ways[v] + ways[u]) % mod;
                }
            }
        }
        return ways[n - 1] % mod;
    }
};`,
  java: `// Java: Number of Ways to Arrive at Destination (LeetCode 1976)
// Time Complexity: O(E log V) | Space Complexity: O(V + E)
import java.util.*;

class Solution {
    public int countPaths(int n, int[][] roads) {
        List<List<long[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] r : roads) {
            adj.get(r[0]).add(new long[]{r[1], r[2]});
            adj.get(r[1]).add(new long[]{r[0], r[2]});
        }

        PriorityQueue<long[]> pq = new PriorityQueue<>((a, b) -> Long.compare(a[0], b[0]));
        long[] dist = new long[n];
        long[] ways = new long[n];
        Arrays.fill(dist, Long.MAX_VALUE / 2);

        dist[0] = 0;
        ways[0] = 1;
        pq.offer(new long[]{0, 0});
        long mod = 1_000_000_007L;

        while (!pq.isEmpty()) {
            long[] top = pq.poll();
            long dis = top[0];
            int u = (int) top[1];

            if (dis > dist[u]) continue;

            for (long[] edge : adj.get(u)) {
                int v = (int) edge[0];
                long wt = edge[1];

                if (dis + wt < dist[v]) {
                    dist[v] = dis + wt;
                    pq.offer(new long[]{dist[v], v});
                    ways[v] = ways[u];
                } else if (dis + wt == dist[v]) {
                    ways[v] = (ways[v] + ways[u]) % mod;
                }
            }
        }
        return (int) (ways[n - 1] % mod);
    }
}`,
  python: `# Python: Number of Ways to Arrive at Destination (LeetCode 1976)
# Time Complexity: O(E log V) | Space Complexity: O(V + E)
import heapq
from collections import defaultdict

class Solution:
    def countPaths(self, n: int, roads: list[list[int]]) -> int:
        adj = defaultdict(list)
        for u, v, time in roads:
            adj[u].append((v, time))
            adj[v].append((u, time))

        dist = [float('inf')] * n
        ways = [0] * n
        dist[0] = 0
        ways[0] = 1
        mod = 10**9 + 7

        pq = [(0, 0)]  # (time, node)

        while pq:
            dis, u = heapq.heappop(pq)

            if dis > dist[u]:
                continue

            for v, wt in adj[u]:
                # Strictly shorter
                if dis + wt < dist[v]:
                    dist[v] = dis + wt
                    ways[v] = ways[u]
                    heapq.heappush(pq, (dist[v], v))
                # Equal shortest
                elif dis + wt == dist[v]:
                    ways[v] = (ways[v] + ways[u]) % mod

        return ways[n - 1] % mod`,
  javascript: `// JavaScript: Number of Ways to Arrive at Destination (LeetCode 1976)
// Time Complexity: O(E log V) | Space Complexity: O(V + E)
function countPaths(n, roads) {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v, wt] of roads) {
        adj[u].push([v, wt]);
        adj[v].push([u, wt]);
    }

    const dist = new Array(n).fill(Infinity);
    const ways = new Array(n).fill(0);
    const mod = 1e9 + 7;

    dist[0] = 0;
    ways[0] = 1;
    const pq = [[0, 0]]; // [time, node]

    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);
        const [dis, u] = pq.shift();

        if (dis > dist[u]) continue;

        for (const [v, wt] of adj[u]) {
            if (dis + wt < dist[v]) {
                dist[v] = dis + wt;
                ways[v] = ways[u];
                pq.push([dist[v], v]);
            } else if (dis + wt === dist[v]) {
                ways[v] = (ways[v] + ways[u]) % mod;
            }
        }
    }
    return ways[n - 1] % mod;
}`
};

export const steps = [
  {
    phase: 'INITIALIZE',
    title: 'Initialize Dijkstra & Ways Arrays: Start at Node 0',
    arr: [0, '∞', '∞', '∞', '∞'],
    auxiliaryTrack: [1, 0, 0, 0, 0],
    auxiliaryLabel: 'Path Multiplicity (ways)',
    activeIndices: [0],
    customCard: {
      title: 'Counting Shortest Paths State',
      rows: [
        { label: 'Source Node', value: 'Node 0 with dist = 0, ways = 1', accent: true },
        { label: 'Destination Node', value: 'Node 4 (Target: ways[4])' },
        { label: 'Priority Queue', value: '[(0, Node 0)]' }
      ]
    },
    variables: {
      'dist[0]': 0,
      'ways[0]': 1,
      pq: '[(0, 0)]',
      modulo: '1,000,000,007'
    },
    metrics: {
      shortestDistToDest: '∞',
      waysToDest: 0,
      activeNode: 0
    },
    explain: 'Initialize Dijkstra with source Node 0. There is exactly 1 way to reach Node 0 with cost 0 (ways[0] = 1). All other nodes start with dist = ∞ and ways = 0.'
  },
  {
    phase: 'RELAX_NODES_1_AND_2',
    title: 'Relax Edges from Node 0: Reach Node 1 (Time=2) and Node 2 (Time=3)',
    arr: [0, 2, 3, '∞', '∞'],
    auxiliaryTrack: [1, 1, 1, 0, 0],
    auxiliaryLabel: 'Path Multiplicity (ways)',
    activeIndices: [1, 2],
    customCard: {
      title: 'First-Hop Shortest Paths',
      rows: [
        { label: 'Edge 0 -> 1 (w=2)', value: 'dist[1]=2, ways[1]=ways[0]=1', accent: true },
        { label: 'Edge 0 -> 2 (w=3)', value: 'dist[2]=3, ways[2]=ways[0]=1', accent: true },
        { label: 'Heap Contents', value: '[(2, Node 1), (3, Node 2)]' }
      ]
    },
    variables: {
      popped: 0,
      'dist[1]': 2,
      'ways[1]': 1,
      'dist[2]': 3,
      'ways[2]': 1
    },
    metrics: {
      shortestDistToDest: '∞',
      waysToDest: 0,
      activeNode: 0
    },
    explain: 'Pop Node 0. Outgoing edges relax Node 1 (time 2, 1 way) and Node 2 (time 3, 1 way). Both nodes inherit 1 way from Node 0.'
  },
  {
    phase: 'DISCOVER_DUAL_PATHS_TO_3',
    title: 'Pop Node 1 & 2: Discover Two Equal Paths to Node 3 (dist=5, ways=2)',
    arr: [0, 2, 3, 5, '∞'],
    auxiliaryTrack: [1, 1, 1, 2, 0],
    auxiliaryLabel: 'Path Multiplicity (ways)',
    activeIndices: [3],
    customCard: {
      title: 'Equal Minimal Distance Accumulation',
      rows: [
        { label: 'Path A: 0 -> 1 -> 3', value: 'Cost: 2 + 3 = 5 -> sets dist[3]=5, ways[3]=1' },
        { label: 'Path B: 0 -> 2 -> 3', value: 'Cost: 3 + 2 = 5 == dist[3] -> ways[3] += ways[2] = 2!', accent: true },
        { label: 'Consequence', value: 'Two distinct routes arrive at Node 3 in equal optimal time 5' }
      ]
    },
    variables: {
      'dist[3]': 5,
      'ways[3]': 'ways[1] + ways[2] = 1 + 1 = 2',
      event: 'dis + wt == dist[3] -> ACCUMULATE WAYS'
    },
    metrics: {
      shortestDistToDest: '∞',
      waysToDest: 0,
      activeNode: 3
    },
    explain: 'Path via Node 1 sets dist[3] = 5 with ways[3] = 1. Later, path via Node 2 also reaches Node 3 in cost 3 + 2 = 5! Since cost is equal to dist[3], we accumulate ways: ways[3] = 1 + 1 = 2.'
  },
  {
    phase: 'REACH_DESTINATION_NODE_4',
    title: 'Final Step: Both Routes Converge to Destination 4 (dist=7, ways=2)',
    arr: [0, 2, 3, 5, 7],
    auxiliaryTrack: [1, 1, 1, 2, 2],
    auxiliaryLabel: 'Path Multiplicity (ways)',
    activeIndices: [4],
    customCard: {
      title: 'Destination Reached',
      rows: [
        { label: 'Edge 3 -> 4 (w=2)', value: 'dist[4] = 5 + 2 = 7', accent: true },
        { label: 'Ways Propagation', value: 'ways[4] = ways[3] = 2' },
        { label: 'Routes Enumeration', value: 'Route 1: 0->1->3->4; Route 2: 0->2->3->4' }
      ]
    },
    variables: {
      'dist[4]': 7,
      'ways[4]': 2,
      optimalPaths: '0->1->3->4, 0->2->3->4'
    },
    metrics: {
      shortestDistToDest: 7,
      waysToDest: 2,
      activeNode: 4
    },
    explain: 'From Node 3, the road to destination 4 takes 2 seconds. Total shortest time is 5 + 2 = 7. Both paths from Node 3 propagate forward, giving ways[4] = 2.'
  },
  {
    phase: 'COMPLETE',
    title: 'Dijkstra Complete: Exactly 2 Shortest Paths to Destination (Time = 7)',
    arr: [0, 2, 3, 5, 7],
    auxiliaryTrack: [1, 1, 1, 2, 2],
    auxiliaryLabel: 'Final Path Counts (ways)',
    activeIndices: [4],
    customCard: {
      title: 'Optimal Routing Verification',
      rows: [
        { label: 'Shortest Distance', value: '7 seconds' },
        { label: 'Total Minimum-Time Ways', value: '2 distinct paths', accent: true },
        { label: 'Return Value', value: 'ways[N - 1] % (1e9 + 7) = 2' }
      ]
    },
    variables: {
      finalDistance: 7,
      finalWays: 2,
      result: 2
    },
    metrics: {
      shortestDistToDest: 7,
      waysToDest: 2,
      activeNode: 4
    },
    explain: 'Priority queue is empty. Destination Node 4 has minimum arrival time 7 and exactly 2 distinct optimal paths. Return 2.',
    intuition: 'Dijkstra with multiplicity tracking computes both the shortest distance and the exact number of optimal paths in a single pass.'
  }
];

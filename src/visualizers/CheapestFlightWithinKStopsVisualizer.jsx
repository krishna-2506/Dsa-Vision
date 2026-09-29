export const rendererType = 'array-scan';

export const meta = {
  title: 'Cheapest Flights Within K Stops',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(E * K)',
  spaceComplexity: 'O(V + E)',
  description: 'Finds the cheapest price from src to dst with at most K stops. Uses a Queue prioritized by stops count to guarantee stops increase monotonically (LeetCode 787).'
};

export const ideaMap = {
  title: 'Constrained BFS Flight Scheduling Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Stops-Bounded Queue',
      detail: 'Queue elements are ordered strictly by number of stops {stops, node, cost}, ensuring standard BFS level ordering.'
    },
    {
      id: 'step2',
      label: 'Stop-Count Pruning',
      detail: 'If a path reaches node u with stops > K, discard it immediately as it violates the flight layover budget.'
    },
    {
      id: 'step3',
      label: 'Cost Vector Relaxation',
      detail: 'When traversing flight (node, next, price), update dist[next] if cost + price < dist[next] and stops <= K.'
    },
    {
      id: 'step4',
      label: 'Destination Lookup',
      detail: 'After the queue empties within K stops, dist[dst] holds the cheapest ticket, or -1 if unreachable.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Cheapest Flights Within K Stops (LeetCode 787)
// Time: O(E * K) | Space: O(V + E)
#include <vector>
#include <queue>
using namespace std;

int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
    vector<vector<pair<int, int>>> adj(n);
    for (auto it : flights) {
        adj[it[0]].push_back({it[1], it[2]});
    }
    
    // queue: {stops, {node, cost}}
    queue<pair<int, pair<int, int>>> q;
    q.push({0, {src, 0}});
    
    vector<int> dist(n, 1e9);
    dist[src] = 0;
    
    while (!q.empty()) {
        auto it = q.front();
        q.pop();
        int stops = it.first;
        int node = it.second.first;
        int cost = it.second.second;
        
        if (stops > k) continue;
        
        for (auto iter : adj[node]) {
            int adjNode = iter.first;
            int edW = iter.second;
            
            if (cost + edW < dist[adjNode] && stops <= k) {
                dist[adjNode] = cost + edW;
                q.push({stops + 1, {adjNode, cost + edW}});
            }
        }
    }
    return (dist[dst] == 1e9) ? -1 : dist[dst];
}`,
  java: `// Java: Cheapest Flights Within K Stops (LeetCode 787)
// Time: O(E * K) | Space: O(V + E)
import java.util.*;

class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] f : flights) adj.get(f[0]).add(new int[]{f[1], f[2]});
        
        // {stops, node, cost}
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{0, src, 0});
        
        int[] dist = new int[n];
        Arrays.fill(dist, (int)1e9);
        dist[src] = 0;
        
        while (!q.isEmpty()) {
            int[] curr = q.poll();
            int stops = curr[0], node = curr[1], cost = curr[2];
            
            if (stops > k) continue;
            
            for (int[] next : adj.get(node)) {
                int adjNode = next[0], price = next[1];
                if (cost + price < dist[adjNode] && stops <= k) {
                    dist[adjNode] = cost + price;
                    q.offer(new int[]{stops + 1, adjNode, cost + price});
                }
            }
        }
        return dist[dst] == (int)1e9 ? -1 : dist[dst];
    }
}`,
  python: `# Python: Cheapest Flights Within K Stops (LeetCode 787)
# Time: O(E * K) | Space: O(V + E)
from collections import deque, defaultdict

def findCheapestPrice(n: int, flights: list[list[int]], src: int, dst: int, k: int) -> int:
    adj = defaultdict(list)
    for u, v, w in flights:
        adj[u].append((v, w))
        
    q = deque([(0, src, 0)])  # (stops, node, cost)
    dist = [float('inf')] * n
    dist[src] = 0
    
    while q:
        stops, node, cost = q.popleft()
        
        if stops > k:
            continue
            
        for adj_node, price in adj[node]:
            if cost + price < dist[adj_node] and stops <= k:
                dist[adj_node] = cost + price
                q.append((stops + 1, adj_node, cost + price))
                
    return dist[dst] if dist[dst] != float('inf') else -1`,
  javascript: `// JavaScript: Cheapest Flights Within K Stops (LeetCode 787)
// Time: O(E * K) | Space: O(V + E)
function findCheapestPrice(n, flights, src, dst, k) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v, w] of flights) {
    adj[u].push([v, w]);
  }
  
  const q = [[0, src, 0]]; // [stops, node, cost]
  const dist = new Array(n).fill(Infinity);
  dist[src] = 0;
  
  while (q.length > 0) {
    const [stops, node, cost] = q.shift();
    if (stops > k) continue;
    
    for (const [adjNode, price] of adj[node]) {
      if (cost + price < dist[adjNode] && stops <= k) {
        dist[adjNode] = cost + price;
        q.push([stops + 1, adjNode, cost + price]);
      }
    }
  }
  return dist[dst] === Infinity ? -1 : dist[dst];
}`
};

export const steps = [
  {
    phase: 'INIT',
    title: '1. Flight Setup: src = City 0, dst = City 3, Max Stops K = 1',
    arr: [0, 1, 2, 3],
    auxiliaryTrack: ['$0', '∞', '∞', '∞'],
    auxiliaryLabel: 'Cheapest Airfare Table (dist)',
    activeIndices: [0],
    customCard: {
      title: 'Itinerary Parameters',
      rows: [
        { label: 'Origin Airport', value: 'City 0', accent: true },
        { label: 'Destination', value: 'City 3' },
        { label: 'Max Stops (K)', value: '1 intermediate layover max' },
        { label: 'Available Flights', value: '0->1 ($100), 0->2 ($500), 1->2 ($100), 1->3 ($600), 2->3 ($100)' }
      ]
    },
    variables: {
      stops: 0,
      activeAirport: 'City 0',
      queue: '[(stops: 0, node: 0, cost: $0)]',
      bestPriceToDst: '∞'
    },
    metrics: {
      currentStops: '0 / 1',
      activeFlight: 'At Airport 0',
      priceToDst: 'INF'
    },
    explain: 'Starting at City 0 with cost $0 and stops = 0. Maximum allowed intermediate stops K = 1.',
    intuition: 'BFS grouped by stops guarantees we only advance by 1 layover per level.'
  },
  {
    phase: 'STOPS_0',
    title: '2. Direct Flights: 0 -> 1 ($100) & 0 -> 2 ($500)',
    arr: [0, 1, 2, 3],
    auxiliaryTrack: ['$0', '$100', '$500', '∞'],
    auxiliaryLabel: 'Cheapest Airfare Table (dist)',
    activeIndices: [1, 2],
    customCard: {
      title: 'Direct Flight Discoveries (0 Stops)',
      rows: [
        { label: 'Flight 0 -> 1', value: 'Cost: $100 (0 stops)', accent: true },
        { label: 'Flight 0 -> 2', value: 'Cost: $500 (0 stops)' },
        { label: 'Enqueued Flights', value: '[(1, City 1, $100), (1, City 2, $500)]' }
      ]
    },
    variables: {
      stops: 0,
      activeAirport: 'City 0',
      queue: '[(1, 1, $100), (1, 2, $500)]',
      bestPriceToDst: '∞'
    },
    metrics: {
      currentStops: '0 / 1',
      activeFlight: 'Departing 0',
      priceToDst: 'INF'
    },
    explain: 'Direct flights from city 0 to city 1 ($100) and city 2 ($500) recorded with 0 intermediate stops.',
    intuition: 'All direct outgoing connections from the source are processed at level 0.'
  },
  {
    phase: 'STOPS_1',
    title: '3. Stop 1: Connecting Flights from City 1',
    arr: [0, 1, 2, 3],
    auxiliaryTrack: ['$0', '$100', '$200', '$700'],
    auxiliaryLabel: 'Cheapest Airfare Table (dist)',
    activeIndices: [2, 3],
    customCard: {
      title: '1-Stop Connecting Flights via City 1',
      rows: [
        { label: 'Flight 1 -> 2', value: '$100 + $100 = $200 (Beats direct $500!)', accent: true },
        { label: 'Flight 1 -> 3', value: '$100 + $600 = $700 (First route to dst)' },
        { label: 'Enqueued Flights', value: '[(2, City 2, $200), (2, City 3, $700)]' }
      ]
    },
    variables: {
      stops: 1,
      activeAirport: 'City 1',
      queue: '[(1, 2, $500), (2, 2, $200), (2, 3, $700)]',
      bestPriceToDst: '$700'
    },
    metrics: {
      currentStops: '1 / 1',
      activeFlight: 'Connecting via City 1',
      priceToDst: '$700'
    },
    explain: 'From City 1, connecting flight to City 2 costs 100 + 100 = $200 (beating the $500 direct flight). Connecting flight to City 3 costs $700.',
    intuition: 'A connecting route can be dramatically cheaper than a direct flight.'
  },
  {
    phase: 'STOPS_1_DST',
    title: '4. Stop 1: Optimal Flight 2 -> 3 ($100) Discovered!',
    arr: [0, 1, 2, 3],
    auxiliaryTrack: ['$0', '$100', '$200', '$300'],
    auxiliaryLabel: 'Final Cheapest Airfares (dist)',
    activeIndices: [3],
    customCard: {
      title: 'Cheapest Route to Destination Finalized',
      rows: [
        { label: 'Best Route', value: '0 -> 1 -> 2 -> 3 (Total $300)', accent: true },
        { label: 'Total Stops', value: '1 intermediate layover (Cities 1 & 2)' },
        { label: 'Previous Dst Cost', value: '$700 -> Reduced to $300' },
        { label: 'Status', value: 'Search Terminated (K=1 bound achieved)' }
      ]
    },
    variables: {
      stops: 1,
      activeAirport: 'City 2',
      queue: 'Empty []',
      bestPriceToDst: '$300'
    },
    metrics: {
      currentStops: '1 / 1',
      activeFlight: '2 -> 3 Complete',
      priceToDst: '$300'
    },
    explain: 'From City 2 (reached via City 1 with 1 stop), connecting flight to Destination 3 costs 200 + 100 = $300! Cheapest path within K=1 stops is $300.',
    intuition: 'Bounded BFS terminates exploration once the stops budget is fully exhausted.'
  }
];

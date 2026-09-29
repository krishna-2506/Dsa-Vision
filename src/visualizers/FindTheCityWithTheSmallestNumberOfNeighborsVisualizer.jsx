export const rendererType = 'array-scan';

export const meta = {
  title: 'City with Smallest Number of Neighbors at a Threshold Distance',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V^3) Floyd-Warshall or O(V * E log V) Dijkstra',
  spaceComplexity: 'O(V^2)',
  description: 'Finds the city that can reach the smallest number of cities within a given distanceThreshold. If there are ties, returns the city with the largest index (LeetCode 1334).'
};

export const ideaMap = {
  title: 'All-Pairs Threshold Neighbor Minimization Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'All-Pairs Shortest Path Matrix',
      detail: 'Run Floyd-Warshall to determine minimum geodesic travel distance between all city pairs.'
    },
    {
      id: 'step2',
      label: 'Threshold Neighborhood Counting',
      detail: 'For each candidate city i, tally the number of other cities reachable with distance <= distanceThreshold.'
    },
    {
      id: 'step3',
      label: 'Minimum Neighbor Selection',
      detail: 'Identify city i with strictly minimal reachable neighbors count.'
    },
    {
      id: 'step4',
      label: 'Tie-Breaking Favoring Highest Index',
      detail: 'If multiple cities achieve the same minimum neighbor count, choose the city with the greater index.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: City with Smallest Number of Neighbors (LeetCode 1334)
// Time: O(V^3) | Space: O(V^2)
#include <vector>
#include <algorithm>
using namespace std;

int findTheCity(int n, vector<vector<int>>& edges, int distanceThreshold) {
    vector<vector<int>> dist(n, vector<int>(n, 1e9));
    for (int i = 0; i < n; i++) dist[i][i] = 0;
    for (const auto& it : edges) {
        dist[it[0]][it[1]] = it[2];
        dist[it[1]][it[0]] = it[2];
    }
    
    // Floyd-Warshall All-Pairs Shortest Path
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (dist[i][k] != 1e9 && dist[k][j] != 1e9) {
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }
    
    int minCount = n;
    int cityNo = -1;
    for (int city = 0; city < n; city++) {
        int cnt = 0;
        for (int adjCity = 0; adjCity < n; adjCity++) {
            if (dist[city][adjCity] <= distanceThreshold) cnt++;
        }
        if (cnt <= minCount) {
            minCount = cnt;
            cityNo = city; // Greater index favored on tie
        }
    }
    return cityNo;
}`,
  java: `// Java: City with Smallest Number of Neighbors (LeetCode 1334)
// Time: O(V^3) | Space: O(V^2)
import java.util.Arrays;

class Solution {
    public int findTheCity(int n, int[][] edges, int distanceThreshold) {
        int[][] dist = new int[n][n];
        for (int i = 0; i < n; i++) {
            Arrays.fill(dist[i], (int)1e9);
            dist[i][i] = 0;
        }
        for (int[] e : edges) {
            dist[e[0]][e[1]] = e[2];
            dist[e[1]][e[0]] = e[2];
        }
        
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
        
        int minCount = n, cityNo = -1;
        for (int city = 0; city < n; city++) {
            int cnt = 0;
            for (int adj = 0; adj < n; adj++) {
                if (dist[city][adj] <= distanceThreshold) cnt++;
            }
            if (cnt <= minCount) {
                minCount = cnt;
                cityNo = city;
            }
        }
        return cityNo;
    }
}`,
  python: `# Python: City with Smallest Number of Neighbors (LeetCode 1334)
# Time: O(V^3) | Space: O(V^2)
def findTheCity(n: int, edges: list[list[int]], distanceThreshold: int) -> int:
    dist = [[float('inf')] * n for _ in range(n)]
    for i in range(n):
        dist[i][i] = 0
    for u, v, w in edges:
        dist[u][v] = w
        dist[v][u] = w
        
    for k in range(n):
        for i in range(n):
            for j in range(n):
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
                
    min_count = n
    city_no = -1
    for city in range(n):
        cnt = sum(1 for adj in range(n) if dist[city][adj] <= distanceThreshold)
        if cnt <= min_count:
            min_count = cnt
            city_no = city
            
    return city_no`,
  javascript: `// JavaScript: City with Smallest Number of Neighbors (LeetCode 1334)
// Time: O(V^3) | Space: O(V^2)
function findTheCity(n, edges, distanceThreshold) {
  const dist = Array.from({ length: n }, () => new Array(n).fill(Infinity));
  for (let i = 0; i < n; i++) dist[i][i] = 0;
  for (const [u, v, w] of edges) {
    dist[u][v] = w;
    dist[v][u] = w;
  }
  
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }
  
  let minCount = n, cityNo = -1;
  for (let city = 0; city < n; city++) {
    let cnt = 0;
    for (let adj = 0; adj < n; adj++) {
      if (dist[city][adj] <= distanceThreshold) cnt++;
    }
    if (cnt <= minCount) {
      minCount = cnt;
      cityNo = city;
    }
  }
  return cityNo;
}`
};

export const steps = [
  {
    phase: 'DIST_READY',
    title: '1. All-Pairs Distances Computed (Threshold = 4 Units)',
    arr: [0, 1, 2, 3],
    auxiliaryTrack: ['?', '?', '?', '?'],
    auxiliaryLabel: 'Reachable Neighbors (dist <= 4)',
    activeIndices: [0],
    customCard: {
      title: 'Graph Distance Threshold Parameters',
      rows: [
        { label: 'Total Cities', value: '4 Cities [0, 1, 2, 3]', accent: true },
        { label: 'Distance Threshold', value: '4 units' },
        { label: 'Pairwise Geodesics', value: 'dist[0..3][0..3] computed via Floyd-Warshall' },
        { label: 'Criterion', value: 'min(reachable_neighbors), tie-breaker: max(city_id)' }
      ]
    },
    variables: {
      threshold: 4,
      examinedCity: 'None',
      minCount: '4',
      bestCity: 'None'
    },
    metrics: {
      activeCity: 'Ready',
      minNeighbors: 4,
      optimalCity: 'None'
    },
    explain: 'Distance matrix computed. We count cities reachable from each city within the travel distance budget of 4 units.',
    intuition: 'Precomputing all-pairs shortest paths allows constant-time reachability checks for each city.'
  },
  {
    phase: 'EVAL_CITY_0',
    title: '2. City 0: Reachable Cities = {0, 1, 2} (Count = 3)',
    arr: [0, 1, 2, 3],
    auxiliaryTrack: ['3 (Cities: 0,1,2)', '?', '?', '?'],
    auxiliaryLabel: 'Reachable Neighbors (dist <= 4)',
    activeIndices: [0],
    customCard: {
      title: 'City 0 Reachability Scan',
      rows: [
        { label: 'Distances from City 0', value: '0->0: 0, 0->1: 3, 0->2: 4, 0->3: 6', accent: true },
        { label: 'Within Threshold (<= 4)', value: '{0, 1, 2} (Count = 3)' },
        { label: 'Excluded', value: 'City 3 (dist 6 > 4)' },
        { label: 'Benchmark', value: 'Current best city: 0 (Count = 3)' }
      ]
    },
    variables: {
      threshold: 4,
      examinedCity: 0,
      minCount: 3,
      bestCity: 0
    },
    metrics: {
      activeCity: 'City 0',
      minNeighbors: 3,
      optimalCity: 'City 0'
    },
    explain: 'From City 0: dist to 0 is 0, to 1 is 3, to 2 is 4 (all <= 4). To 3 is 6 (> 4). Total reachable neighbors = 3.',
    intuition: 'City 0 establishes our first baseline minimum count of 3 reachable nodes.'
  },
  {
    phase: 'EVAL_CITY_1',
    title: '3. City 1: Reachable Cities = {0, 1, 2, 3} (Count = 4)',
    arr: [0, 1, 2, 3],
    auxiliaryTrack: ['3', '4 (All Cities)', '?', '?'],
    auxiliaryLabel: 'Reachable Neighbors (dist <= 4)',
    activeIndices: [1],
    customCard: {
      title: 'City 1 Reachability Scan',
      rows: [
        { label: 'Distances from City 1', value: '1->0: 3, 1->1: 0, 1->2: 1, 1->3: 4', accent: true },
        { label: 'Within Threshold (<= 4)', value: '{0, 1, 2, 3} (Count = 4)' },
        { label: 'Comparison', value: '4 > 3 (Worse than City 0)' },
        { label: 'Benchmark', value: 'Best city remains 0' }
      ]
    },
    variables: {
      threshold: 4,
      examinedCity: 1,
      minCount: 3,
      bestCity: 0
    },
    metrics: {
      activeCity: 'City 1',
      minNeighbors: 3,
      optimalCity: 'City 0'
    },
    explain: 'From City 1: all 4 cities are within distance <= 4. Count is 4, which does not beat City 0 (count 3).',
    intuition: 'Centrally located cities reach more neighbors and thus do not minimize the metric.'
  },
  {
    phase: 'EVAL_CITY_3',
    title: '4. City 3: Reachable Cities = {2, 3} (Count = 2) - Optimal Winner!',
    arr: [0, 1, 2, 3],
    auxiliaryTrack: ['3', '4', '3', '2 (Winner!)'],
    auxiliaryLabel: 'Final Reachable Neighbor Counts',
    activeIndices: [3],
    customCard: {
      title: 'City 3 Reachability & Final Verdict',
      rows: [
        { label: 'Distances from City 3', value: '3->0: 6, 3->1: 5, 3->2: 2, 3->3: 0', accent: true },
        { label: 'Within Threshold (<= 4)', value: '{2, 3} (Count = 2 only!)' },
        { label: 'Comparison', value: '2 < 3 (Strictly fewest neighbors)' },
        { label: 'Optimal Choice', value: 'City 3 wins!' }
      ]
    },
    variables: {
      threshold: 4,
      examinedCity: 3,
      minCount: 2,
      bestCity: 3
    },
    metrics: {
      activeCity: 'City 3',
      minNeighbors: 2,
      optimalCity: 'City 3'
    },
    explain: 'City 3 only reaches City 2 and City 3 (count = 2 <= 4). It has the strictly smallest number of neighbors. Return City 3!',
    intuition: 'Peripheral cities with isolated links have the fewest neighbors within the threshold.'
  }
];

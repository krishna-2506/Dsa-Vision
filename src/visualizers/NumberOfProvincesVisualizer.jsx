export const rendererType = 'dp-grid';

export const meta = {
  title: 'Number of Provinces',
  category: 'Graphs',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(N) visited array',
  description: 'Calculates the number of disconnected groups (provinces) of cities where a direct or indirect road connects cities in the same province (LeetCode 547).'
};

export const ideaMap = {
  title: 'Connected Component DFS / Disjoint Set Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Adjacency Matrix Inspection',
      detail: 'Examine the N x N symmetrical connectivity matrix isConnected where entry (i, j) == 1 denotes a road.'
    },
    {
      id: 'step2',
      label: 'Province Discovery Trigger',
      detail: 'Iterate over cities 0 to N-1; if city i has not been visited, increment province counter by 1.'
    },
    {
      id: 'step3',
      label: 'Depth-First Component Flooding',
      detail: 'Run DFS from city i to mark all transitively reachable cities as visited in vis[].'
    },
    {
      id: 'step4',
      label: 'Enumerate Disconnected Provinces',
      detail: 'Continue linear scan; already grouped cities are skipped. Return final province count.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Number of Provinces (LeetCode 547)
// Time Complexity: O(N^2) | Space Complexity: O(N)
#include <vector>
using namespace std;

class Solution {
private:
    void dfs(int node, vector<vector<int>>& isConnected, vector<int>& vis) {
        vis[node] = 1;
        for (int neighbor = 0; neighbor < isConnected.size(); neighbor++) {
            if (isConnected[node][neighbor] == 1 && !vis[neighbor]) {
                dfs(neighbor, isConnected, vis);
            }
        }
    }
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        int n = isConnected.size();
        vector<int> vis(n, 0);
        int provinces = 0;

        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                provinces++;
                dfs(i, isConnected, vis);
            }
        }
        return provinces;
    }
};`,
  java: `// Java: Number of Provinces (LeetCode 547)
// Time Complexity: O(N^2) | Space Complexity: O(N)
class Solution {
    private void dfs(int u, int[][] isConnected, boolean[] vis) {
        vis[u] = true;
        for (int v = 0; v < isConnected.length; v++) {
            if (isConnected[u][v] == 1 && !vis[v]) {
                dfs(v, isConnected, vis);
            }
        }
    }

    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        boolean[] vis = new boolean[n];
        int count = 0;

        for (int i = 0; i < n; i++) {
            if (!vis[i]) {
                count++;
                dfs(i, isConnected, vis);
            }
        }
        return count;
    }
}`,
  python: `# Python: Number of Provinces (LeetCode 547)
# Time Complexity: O(N^2) | Space Complexity: O(N)
class Solution:
    def findCircleNum(self, isConnected: list[list[int]]) -> int:
        n = len(isConnected)
        vis = [False] * n
        provinces = 0

        def dfs(u: int) -> None:
            vis[u] = True
            for v in range(n):
                if isConnected[u][v] == 1 and not vis[v]:
                    dfs(v)

        for i in range(n):
            if not vis[i]:
                provinces += 1
                dfs(i)

        return provinces`,
  javascript: `// JavaScript: Number of Provinces (LeetCode 547)
// Time Complexity: O(N^2) | Space Complexity: O(N)
function findCircleNum(isConnected) {
    const n = isConnected.length;
    const vis = new Array(n).fill(false);
    let provinces = 0;

    function dfs(u) {
        vis[u] = true;
        for (let v = 0; v < n; v++) {
            if (isConnected[u][v] === 1 && !vis[v]) {
                dfs(v);
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (!vis[i]) {
            provinces++;
            dfs(i);
        }
    }
    return provinces;
}`
};

export const steps = [
  {
    phase: 'INITIALIZE',
    title: 'Initialize City Network: 3x3 Adjacency Matrix',
    grid: [
      ['1', '1', '0'],
      ['1', '1', '0'],
      ['0', '0', '1']
    ],
    rowLabels: ['City 0', 'City 1', 'City 2'],
    colLabels: ['City 0', 'City 1', 'City 2'],
    activeCell: { r: 0, c: 0 },
    metrics: [
      { label: 'Provinces Found', value: 0 },
      { label: 'Visited Cities', value: '0 / 3' },
      { label: 'Examining', value: 'City 0' }
    ],
    variables: {
      activeCity: 0,
      vis: '[0, 0, 0]',
      provinces: 0,
      status: 'City 0 is unvisited -> launch Province 1 DFS'
    },
    explain: 'Start scanning cities at City 0. Since City 0 is unvisited (vis[0] == 0), increment province counter to 1 and launch DFS to explore its connected cluster.',
    intuition: 'Each unvisited city marks the root of an independent connected graph component.'
  },
  {
    phase: 'EXPLORE_PROVINCE_1',
    title: 'Province 1 Discovered: Road (0, 1) Connects City 0 and City 1',
    grid: [
      ['P1', 'P1', '0'],
      ['P1', 'P1', '0'],
      ['0', '0', '1']
    ],
    rowLabels: ['City 0', 'City 1', 'City 2'],
    colLabels: ['City 0', 'City 1', 'City 2'],
    activeCell: { r: 0, c: 1 },
    dependencyCells: [
      { r: 1, c: 0, label: 'road' }
    ],
    metrics: [
      { label: 'Provinces Found', value: 1 },
      { label: 'Visited Cities', value: '2 / 3 (Cities 0, 1)' },
      { label: 'Cluster Size', value: '2 cities' }
    ],
    variables: {
      activeCity: 1,
      vis: '[1, 1, 0]',
      province1Cities: '[City 0, City 1]',
      status: 'DFS traversal traversed road between City 0 and City 1'
    },
    explain: 'Row 0 shows isConnected[0][1] == 1. DFS steps to City 1 and marks vis[1] = 1. City 1 connects back to City 0 and has no other links. Province 1 group {0, 1} is fully visited.',
    intuition: 'Symmetric matrix entries (0,1) and (1,0) represent an undirected edge between two nodes.'
  },
  {
    phase: 'SCAN_CITY_1',
    title: 'Scan Advances to City 1: Already Visited (vis[1] == 1)',
    grid: [
      ['P1', 'P1', '0'],
      ['P1', 'P1', '0'],
      ['0', '0', '1']
    ],
    rowLabels: ['City 0', 'City 1', 'City 2'],
    colLabels: ['City 0', 'City 1', 'City 2'],
    activeCell: { r: 1, c: 1 },
    dependencyCells: [],
    metrics: [
      { label: 'Provinces Found', value: 1 },
      { label: 'Visited Cities', value: '2 / 3' },
      { label: 'Action', value: 'SKIP CITY 1' }
    ],
    variables: {
      activeCity: 1,
      'vis[1]': 'true',
      action: 'Already belongs to Province 1; skip DFS'
    },
    explain: 'The outer loop inspects City 1. Since vis[1] is already true from the previous DFS traversal, no new province is formed. Skip to City 2.',
    intuition: 'Visited array ensures that each city is processed exactly once, achieving O(N^2) total edge checks.'
  },
  {
    phase: 'EXPLORE_PROVINCE_2',
    title: 'Scan Advances to City 2: Isolated Province 2 Found',
    grid: [
      ['P1', 'P1', '0'],
      ['P1', 'P1', '0'],
      ['0', '0', 'P2']
    ],
    rowLabels: ['City 0', 'City 1', 'City 2'],
    colLabels: ['City 0', 'City 1', 'City 2'],
    activeCell: { r: 2, c: 2 },
    dependencyCells: [],
    metrics: [
      { label: 'Provinces Found', value: 2 },
      { label: 'Visited Cities', value: '3 / 3' },
      { label: 'Examining', value: 'City 2' }
    ],
    variables: {
      activeCity: 2,
      vis: '[1, 1, 1]',
      provinces: 2,
      status: 'City 2 has no external roads; forms isolated Province 2'
    },
    explain: 'City 2 has vis[2] == 0. Increment province counter to 2! Row 2 shows isConnected[2][0] == 0 and isConnected[2][1] == 0. City 2 is completely isolated.',
    intuition: 'Isolated nodes with no outgoing edges form single-node connected components.'
  },
  {
    phase: 'COMPLETE',
    title: 'Traversal Complete: Total Provinces = 2',
    grid: [
      ['P1', 'P1', '0'],
      ['P1', 'P1', '0'],
      ['0', '0', 'P2']
    ],
    rowLabels: ['City 0', 'City 1', 'City 2'],
    colLabels: ['City 0', 'City 1', 'City 2'],
    activeCell: null,
    dependencyCells: [],
    metrics: [
      { label: 'Total Provinces', value: 2 },
      { label: 'Province 1', value: '{City 0, City 1}' },
      { label: 'Province 2', value: '{City 2}' }
    ],
    variables: {
      finalResult: 2,
      timeComplexity: 'O(N^2)',
      spaceComplexity: 'O(N)'
    },
    explain: 'All 3 cities have been visited across the matrix. Exactly 2 independent provinces exist: Province 1 ({City 0, City 1}) and Province 2 ({City 2}). Return 2.',
    intuition: 'Counting provinces is mathematically equivalent to computing the number of connected components in an undirected graph.'
  }
];

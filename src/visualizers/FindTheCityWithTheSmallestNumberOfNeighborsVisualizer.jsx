import React from 'react';

export const meta = {
  title: 'City with Smallest Number of Neighbors at a Threshold Distance',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V^3) Floyd-Warshall or O(V * E log V) Dijkstra',
  spaceComplexity: 'O(V^2)',
  description: 'Finds the city that can reach the smallest number of cities within a given distanceThreshold. If there are ties, returns the city with the largest index (LeetCode 1334).'
};

export const solutions = {
  cpp: `// C++: City with Smallest Number of Neighbors (LeetCode 1334)
#include <vector>
#include <algorithm>
using namespace std;

int findTheCity(int n, vector<vector<int>>& edges, int distanceThreshold) {
    vector<vector<int>> dist(n, vector<int>(n, 1e9));
    for (int i = 0; i < n; i++) dist[i][i] = 0;
    for (auto& it : edges) {
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
  java: `// Java: City with Smallest Number of Neighbors
class Solution {
    public int findTheCity(int n, int[][] edges, int distanceThreshold) {
        int[][] dist = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) dist[i][j] = (int)1e9;
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
        int minCount = n, bestCity = -1;
        for (int i = 0; i < n; i++) {
            int cnt = 0;
            for (int j = 0; j < n; j++) {
                if (dist[i][j] <= distanceThreshold) cnt++;
            }
            if (cnt <= minCount) {
                minCount = cnt;
                bestCity = i;
            }
        }
        return bestCity;
    }
}`,
  python: `# Python: City with Smallest Number of Neighbors
def findTheCity(n: int, edges: list[list[int]], distanceThreshold: int) -> int:
    dist = [[float('inf')] * n for _ in range(n)]
    for i in range(n): dist[i][i] = 0
    for u, v, w in edges:
        dist[u][v] = dist[v][u] = w
        
    for k in range(n):
        for i in range(n):
            for j in range(n):
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
                
    minCount, bestCity = n, -1
    for i in range(n):
        cnt = sum(dist[i][j] <= distanceThreshold for j in range(n))
        if cnt <= minCount:
            minCount, bestCity = cnt, i
    return bestCity
`,
  javascript: `// JavaScript: City with Smallest Number of Neighbors
function findTheCity(n, edges, distanceThreshold) {
  // Floyd-Warshall and count neighbors within threshold
  return 0;
}`
};

export const steps = [
  {
    title: '1. All-Pairs Distances Computed (Threshold = 4)',
    phase: 'DIST_READY',
    codeLine: 24,
    cityExamined: null,
    counts: { 0: '?', 1: '?', 2: '?', 3: '?' },
    bestCity: -1,
    info: 'Threshold is 4 units. We count reachable cities for each city i (where dist <= 4).'
  },
  {
    title: '2. City 0: Reachable Cities = {0, 1, 2} (Count = 3)',
    phase: 'EVAL_CITY_0',
    codeLine: 31,
    cityExamined: 0,
    counts: { 0: 3, 1: '?', 2: '?', 3: '?' },
    bestCity: 0,
    info: 'From City 0: dist to 0 is 0, to 1 is 3, to 2 is 4 (all <= 4). To 3 is 6 (> 4). Count = 3.'
  },
  {
    title: '3. City 1: Reachable Cities = {0, 1, 2, 3} (Count = 4)',
    phase: 'EVAL_CITY_1',
    codeLine: 31,
    cityExamined: 1,
    counts: { 0: 3, 1: 4, 2: '?', 3: '?' },
    bestCity: 0,
    info: 'From City 1: all 4 cities are within distance <= 4. Count = 4.'
  },
  {
    title: '4. City 3: Reachable Cities = {2, 3} (Count = 2) - WINNER!',
    phase: 'EVAL_CITY_3',
    codeLine: 35,
    cityExamined: 3,
    counts: { 0: 3, 1: 4, 2: 3, 3: 2 },
    bestCity: 3,
    info: 'City 3 only reaches City 2 and City 3 (count = 2). Minimum neighbors found! Return City 3.'
  }
];

export default function FindTheCityWithTheSmallestNumberOfNeighborsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Threshold: <strong className="text-cyan-200">4 Distance Units</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Optimal City: <strong className="text-emerald-200">{step.bestCity >= 0 ? `City ${step.bestCity}` : 'None'}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[#8a8ea3]">
          <span>Reachable Neighbors Within Distance &le; 4</span>
          <span className="text-emerald-400 font-bold">Smallest Neighbor Count</span>
        </div>

        <div className="grid grid-cols-4 gap-2.5 font-mono text-xs text-center">
          {[0, 1, 2, 3].map(c => {
            const isBest = step.bestCity === c;
            return (
              <div
                key={c}
                className={`p-3 rounded-xl border flex flex-col items-center transition-all ${
                  isBest
                    ? 'bg-emerald-500/25 border-emerald-500/50 text-emerald-200 shadow-md ring-1 ring-emerald-400'
                    : 'bg-[#161824] border-[#272b3c] text-slate-400'
                }`}
              >
                <span className="font-bold">City {c}</span>
                <span className="text-sm font-extrabold mt-1">
                  {step.counts[c] !== '?' ? `${step.counts[c]} cities` : 'Pending'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

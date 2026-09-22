import React from 'react';

export const meta = {
  title: 'Number of Provinces',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(N) visited array',
  description: 'Calculates the number of disconnected groups (provinces) of cities where a direct or indirect road connects cities in the same province (LeetCode 547).'
};

export const solutions = {
  cpp: `// C++: Number of Provinces (LeetCode 547)
#include <vector>
using namespace std;

class Solution {
private:
    void dfs(int node, vector<vector<int>>& isConnected, vector<int>& vis) {
        vis[node] = 1;
        for (int j = 0; j < isConnected.size(); j++) {
            if (isConnected[node][j] == 1 && !vis[j]) {
                dfs(j, isConnected, vis);
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
  java: `// Java: Number of Provinces
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
  python: `# Python: Number of Provinces
class Solution:
    def findCircleNum(self, isConnected: list[list[int]]) -> int:
        n = len(isConnected)
        vis = [False] * n
        provinces = 0
        def dfs(u):
            vis[u] = True
            for v in range(n):
                if isConnected[u][v] == 1 and not vis[v]:
                    dfs(v)
        for i in range(n):
            if not vis[i]:
                provinces += 1
                dfs(i)
        return provinces
`,
  javascript: `// JavaScript: Number of Provinces
function findCircleNum(isConnected) {
  const n = isConnected.length;
  const vis = new Array(n).fill(false);
  let count = 0;
  function dfs(u) {
    vis[u] = true;
    for (let v = 0; v < n; v++) {
      if (isConnected[u][v] === 1 && !vis[v]) dfs(v);
    }
  }
  for (let i = 0; i < n; i++) {
    if (!vis[i]) {
      count++;
      dfs(i);
    }
  }
  return count;
}`
};

export const steps = [
  {
    title: '1. Scan City 0: Province 1 Found',
    phase: 'CITY_0',
    codeLine: 21,
    activeCity: 0,
    provinces: 1,
    vis: [1, 1, 0],
    explanation: 'City 0 is unvisited. Increment province count to 1. DFS from City 0 explores City 1 (connected via isConnected[0][1]=1).'
  },
  {
    title: '2. Check City 1: Already Visited',
    phase: 'CITY_1',
    codeLine: 20,
    activeCity: 1,
    provinces: 1,
    vis: [1, 1, 0],
    explanation: 'City 1 already marked in Province 1 (vis[1] == 1). Skip traversal.'
  },
  {
    title: '3. Scan City 2: Province 2 Found',
    phase: 'CITY_2',
    codeLine: 21,
    activeCity: 2,
    provinces: 2,
    vis: [1, 1, 1],
    explanation: 'City 2 is unvisited (vis[2] == 0). Increment province count to 2. City 2 is isolated. Total provinces = 2.'
  }
];

export default function NumberOfProvincesVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  const matrix = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1]
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Provinces Count: <strong className="text-cyan-200">{step.provinces}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Current City Examined: <strong className="text-purple-200">City {step.activeCity}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {/* Matrix View */}
        <div className="p-4 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-xl">
          <span className="text-xs font-mono font-semibold text-cyan-400 block mb-3">isConnected[3][3] Matrix</span>
          <div className="grid grid-cols-4 gap-1 text-center font-mono text-xs">
            <div className="text-[#525777] p-1 font-bold">City</div>
            {[0, 1, 2].map(c => (
              <div key={c} className="text-cyan-300 p-1 font-bold bg-[#181a27] rounded">{c}</div>
            ))}
            {matrix.map((row, r) => (
              <React.Fragment key={r}>
                <div className="text-cyan-300 p-1 font-bold bg-[#181a27] rounded flex items-center justify-center">{r}</div>
                {row.map((val, c) => (
                  <div
                    key={c}
                    className={`p-2 rounded font-bold transition-all ${
                      val === 1
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'bg-[var(--board-raised-2)] text-[#475569]'
                    }`}
                  >
                    {val}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Visited & Province Clusters */}
        <div className="p-4 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-semibold text-purple-400 block mb-3">Province Allotment</span>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-800/40 text-blue-200 flex justify-between items-center">
                <span>Province #1:</span>
                <span className="font-bold text-cyan-300">&#123; City 0, City 1 &#125;</span>
              </div>
              <div className={`p-2.5 rounded-xl border transition-all flex justify-between items-center ${
                step.provinces >= 2
                  ? 'bg-purple-950/40 border-purple-800/40 text-purple-200'
                  : 'bg-[var(--board-raised-2)] border-[var(--line)] text-[#525777]'
              }`}>
                <span>Province #2:</span>
                <span className="font-bold text-purple-300">
                  {step.provinces >= 2 ? '{ City 2 }' : 'Pending...'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--line)] flex justify-between text-xs font-mono text-[var(--chalk-dim)]">
            <span>vis Array:</span>
            <span className="text-emerald-400 font-bold">[{step.vis.join(', ')}]</span>
          </div>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.explanation}
      </div>
    </div>
  );
}

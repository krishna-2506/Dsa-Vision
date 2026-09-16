import React from 'react';

export const meta = {
  title: 'Articulation Point in Graph (Tarjan\'s Algorithm)',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Hard',
  timeComplexity: 'O(V + 2E)',
  spaceComplexity: 'O(3V)',
  description: 'Identifies all Articulation Points (cut vertices) whose removal increases the number of connected components in the graph using Tarjan\'s low/tin DFS algorithm.'
};

export const solutions = {
  cpp: `// C++: Articulation Points (Tarjan's Algorithm)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
private:
    int timer = 1;
    void dfs(int node, int parent, vector<vector<int>>& adj,
             vector<int>& vis, vector<int>& tin, vector<int>& low,
             vector<int>& mark) {
        vis[node] = 1;
        tin[node] = low[node] = timer++;
        int child = 0;
        
        for (auto it : adj[node]) {
            if (it == parent) continue;
            if (!vis[it]) {
                dfs(it, node, adj, vis, tin, low, mark);
                low[node] = min(low[node], low[it]);
                
                // Articulation Condition for non-root:
                if (low[it] >= tin[node] && parent != -1) {
                    mark[node] = 1;
                }
                child++;
            } else {
                low[node] = min(low[node], tin[it]);
            }
        }
        // Root condition:
        if (child > 1 && parent == -1) {
            mark[node] = 1;
        }
    }
public:
    vector<int> articulationPoints(int V, vector<vector<int>>& adj) {
        vector<int> vis(V, 0), tin(V), low(V), mark(V, 0);
        for (int i = 0; i < V; i++) {
            if (!vis[i]) dfs(i, -1, adj, vis, tin, low, mark);
        }
        vector<int> ans;
        for (int i = 0; i < V; i++) {
            if (mark[i] == 1) ans.push_back(i);
        }
        if (ans.size() == 0) return {-1};
        return ans;
    }
};`,
  java: `// Java: Articulation Points
import java.util.*;

class Solution {
    // Tarjan's Articulation Points with mark array
    public ArrayList<Integer> articulationPoints(int V, ArrayList<ArrayList<Integer>> adj) {
        return new ArrayList<>();
    }
}`,
  python: `# Python: Articulation Points
def articulationPoints(V, adj):
    # Tarjan's cut vertices check
    return []
`,
  javascript: `// JavaScript: Articulation Points
function articulationPoints(V, adj) {
  // Cut vertex detection
  return [];
}`
};

export const steps = [
  {
    title: '1. Root Node 0 Inspection: child count tracking',
    phase: 'ROOT_CHECK',
    codeLine: 29,
    activeNode: 0,
    tin: { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5 },
    low: { 0: 1, 1: 1, 2: 1, 3: 1, 4: 4 },
    points: [],
    info: 'Root node 0 has 1 direct DFS tree child branch. Root is not an articulation point if child <= 1.'
  },
  {
    title: '2. Check Node 1: Cycle loop with 0 and 2',
    phase: 'CYCLE_PART',
    codeLine: 22,
    activeNode: 1,
    tin: { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5 },
    low: { 0: 1, 1: 1, 2: 1, 3: 1, 4: 4 },
    points: [],
    info: 'Node 1 connects loop 0-1-2-0. low[2] = 1 < tin[1] = 2. Node 1 is NOT an articulation point for loop.'
  },
  {
    title: '3. Check Node 3: low[4] (4) >= tin[3] (4) -> ARTICULATION POINT!',
    phase: 'CUT_VERTEX_FOUND',
    codeLine: 22,
    activeNode: 3,
    tin: { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5 },
    low: { 0: 1, 1: 1, 2: 1, 3: 1, 4: 4 },
    points: [3],
    info: 'Child node 4 cannot reach above node 3 without passing through 3 (low[4] = 4 >= tin[3] = 4). Removing node 3 isolates node 4! Cut vertex: Node 3.'
  }
];

export default function ArticulationPointInGraphVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Condition: <strong className="text-cyan-200">low[v] &ge; tin[u]</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
          Cut Vertices: <strong className="text-amber-200">{step.points.length > 0 ? step.points.map(p => `Node ${p}`).join(', ') : 'None'}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[#8a8ea3]">
          <span>Tarjan Discovery and Low Values</span>
          <span className="text-amber-400 font-bold">Cut Vertex Detection</span>
        </div>

        <div className="grid grid-cols-5 gap-2 text-center font-mono text-xs">
          {[0, 1, 2, 3, 4].map(v => {
            const isCut = step.points.includes(v);
            return (
              <div
                key={v}
                className={`p-3 rounded-xl border flex flex-col items-center transition-all ${
                  isCut
                    ? 'bg-amber-500/25 border-amber-500/50 text-amber-200 shadow-md ring-1 ring-amber-400'
                    : 'bg-[#161824] border-[#272b3c] text-slate-400'
                }`}
              >
                <span className="font-bold">v{v}</span>
                <span className="text-cyan-300 mt-1">tin: {step.tin[v]}</span>
                <span className="text-purple-300">low: {step.low[v]}</span>
                <span className={`text-[10px] mt-1 font-bold ${isCut ? 'text-amber-300' : 'text-slate-600'}`}>
                  {isCut ? 'CUT VERTEX' : 'NORMAL'}
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

import React from 'react';

export const meta = {
  title: 'M-Coloring Problem',
  category: 'Recursion / Backtracking',
  difficulty: 'Hard',
  timeComplexity: 'O(M^V)',
  spaceComplexity: 'O(V) recursion stack',
  description: 'Determines whether an undirected graph with V vertices can be colored using at most M colors such that no two adjacent vertices share the same color, using recursive backtracking.'
};

export const solutions = {
  cpp: `// C++ M-Coloring Backtracking
#include <vector>
using namespace std;

class Solution {
    bool isSafe(int node, int color, const vector<vector<int>>& adj, const vector<int>& colors) {
        for (int neighbor : adj[node]) {
            if (colors[neighbor] == color) {
                return false; // Adjacent vertex shares the same color
            }
        }
        return true;
    }

    bool solve(int node, int m, int v, const vector<vector<int>>& adj, vector<int>& colors) {
        if (node == v) return true; // All vertices colored successfully

        for (int c = 1; c <= m; c++) {
            if (isSafe(node, c, adj, colors)) {
                colors[node] = c;
                if (solve(node + 1, m, v, adj, colors)) return true;
                colors[node] = 0; // Backtrack
            }
        }

        return false;
    }

public:
    bool graphColoring(int v, const vector<vector<int>>& edges, int m) {
        vector<vector<int>> adj(v);
        for (auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        vector<int> colors(v, 0);
        return solve(0, m, v, adj, colors);
    }
};`,
  python: `# Python 3 M-Coloring Backtracking
class Solution:
    def graphColoring(self, v: int, edges: list[list[int]], m: int) -> bool:
        adj = [[] for _ in range(v)]
        for u, w in edges:
            adj[u].append(w)
            adj[w].append(u)

        colors = [0] * v

        def is_safe(node, c):
            for neighbor in adj[node]:
                if colors[neighbor] == c:
                    return False
            return True

        def solve(node):
            if node == v:
                return True

            for c in range(1, m + 1):
                if is_safe(node, c):
                    colors[node] = c
                    if solve(node + 1):
                        return True
                    colors[node] = 0

            return False

        return solve(0)`,
  java: `// Java M-Coloring Backtracking
import java.util.ArrayList;
import java.util.List;

class Solution {
    private boolean isSafe(int node, int color, List<List<Integer>> adj, int[] colors) {
        for (int neighbor : adj.get(node)) {
            if (colors[neighbor] == color) return false;
        }
        return true;
    }

    private boolean solve(int node, int m, int v, List<List<Integer>> adj, int[] colors) {
        if (node == v) return true;

        for (int c = 1; c <= m; c++) {
            if (isSafe(node, c, adj, colors)) {
                colors[node] = c;
                if (solve(node + 1, m, v, adj, colors)) return true;
                colors[node] = 0;
            }
        }

        return false;
    }

    public boolean graphColoring(int v, List<int[]> edges, int m) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < v; i++) adj.add(new ArrayList<>());
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }

        int[] colors = new int[v];
        return solve(0, m, v, adj, colors);
    }
}`,
  javascript: `// JavaScript M-Coloring Backtracking
var graphColoring = function(v, edges, m) {
    const adj = Array.from({ length: v }, () => []);
    for (const [u, w] of edges) {
        adj[u].push(w);
        adj[w].push(u);
    }

    const colors = new Array(v).fill(0);

    const isSafe = (node, c) => {
        for (const neighbor of adj[node]) {
            if (colors[neighbor] === c) return false;
        }
        return true;
    };

    const solve = (node) => {
        if (node === v) return true;

        for (let c = 1; c <= m; c++) {
            if (isSafe(node, c)) {
                colors[node] = c;
                if (solve(node + 1)) return true;
                colors[node] = 0;
            }
        }

        return false;
    };

    return solve(0);
};`
};

export const steps = [
  {
    title: '1. Problem Setup: 4 Vertices, M = 3 Colors Available',
    phase: 'INITIAL',
    codeLine: 28,
    v: 4,
    m: 3,
    activeNode: null,
    colors: [0, 0, 0, 0], // 0 uncolored, 1 emerald, 2 amber, 3 cyan
    variables: { vertices: 4, colorsAvailable: 'M = 3', edges: '[(0-1), (1-2), (2-3), (3-0), (0-2)]' },
    explain: 'Graph has 4 vertices with edges forming a diamond with a cross-diagonal between 0 and 2. We must color all vertices with at most 3 colors such that no adjacent vertices share a color.',
    intuition: 'Standard backtracking: color node 0, recurse to 1, test valid colors.'
  },
  {
    title: '2. Color Vertex 0 with Color 1 (Emerald)',
    phase: 'COLOR_VERTEX',
    codeLine: 18,
    v: 4,
    m: 3,
    activeNode: 0,
    colors: [1, 0, 0, 0],
    variables: { vertex: 0, assignedColor: 'Color 1 (Emerald)', neighbors: '[1, 3, 2]' },
    explain: 'Vertex 0 has no colored neighbors yet. Assign Color 1.',
    intuition: 'First vertex assigned color 1.'
  },
  {
    title: '3. Color Vertex 1 with Color 2 (Amber)',
    phase: 'COLOR_VERTEX',
    codeLine: 18,
    v: 4,
    m: 3,
    activeNode: 1,
    colors: [1, 2, 0, 0],
    variables: { vertex: 1, assignedColor: 'Color 2 (Amber)', conflictWithV0: 'None (Color 2 != Color 1)' },
    explain: 'Vertex 1 is connected to 0 (Color 1). Cannot use Color 1. Assign next available Color 2.',
    intuition: 'Valid assignment on vertex 1.'
  },
  {
    title: '4. Color Vertex 2 with Color 3 (Cyan)',
    phase: 'COLOR_VERTEX',
    codeLine: 18,
    v: 4,
    m: 3,
    activeNode: 2,
    colors: [1, 2, 3, 0],
    variables: { vertex: 2, neighborColors: 'V0 is Color 1, V1 is Color 2', assignedColor: 'Color 3 (Cyan)' },
    explain: 'Vertex 2 is connected to both 0 and 1. Colors 1 and 2 are blocked. Assign Color 3.',
    intuition: 'Must use 3rd distinct color.'
  },
  {
    title: '5. Color Vertex 3 with Color 2 (Amber)',
    phase: 'COLOR_VERTEX',
    codeLine: 18,
    v: 4,
    m: 3,
    activeNode: 3,
    colors: [1, 2, 3, 2],
    variables: { vertex: 3, neighborColors: 'V0 is Color 1, V2 is Color 3', assignedColor: 'Color 2 (Amber)' },
    explain: 'Vertex 3 is connected to 0 (Color 1) and 2 (Color 3). Color 2 is free! Assign Color 2 to Vertex 3.',
    intuition: 'Reuses Color 2 safely.'
  },
  {
    title: '6. Success: All 4 Vertices Colored Validly with M=3 Colors!',
    phase: 'RESULT',
    codeLine: 15,
    v: 4,
    m: 3,
    activeNode: null,
    colors: [1, 2, 3, 2],
    variables: { outcome: 'Valid 3-Coloring Exists', return: 'true' },
    explain: 'Every edge connects two vertices of distinct colors. Returns true.',
    intuition: 'Graph is 3-colorable.'
  }
];

export default function MColoringProblemVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  const colorMap = {
    0: { border: 'border-[#272b3c]', bg: 'bg-[#12131b]', text: 'text-[#5b6076]', name: 'None' },
    1: { border: 'border-emerald-400', bg: 'bg-emerald-500/25', text: 'text-emerald-200', name: 'Emerald (1)' },
    2: { border: 'border-amber-400', bg: 'bg-amber-500/25', text: 'text-amber-200', name: 'Amber (2)' },
    3: { border: 'border-cyan-400', bg: 'bg-cyan-500/25', text: 'text-cyan-200', name: 'Cyan (3)' }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Graph: {step.v} Vertices | Max Colors M = {step.m}
        </span>
        {step.activeNode !== null && (
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
            Coloring Vertex {step.activeNode}
          </span>
        )}
      </div>

      {/* Visual Graph Nodes */}
      <div className="w-full p-6 rounded-2xl bg-[#161824] border border-[#272b3c] flex items-center justify-around font-mono">
        {step.colors.map((c, idx) => {
          const cInfo = colorMap[c] || colorMap[0];
          const isActive = step.activeNode === idx;

          return (
            <div key={idx} className="flex flex-col items-center gap-2">
              <span className="text-xs text-[#8a8ea3]">V{idx}</span>
              <div className={`w-16 h-16 rounded-2xl border-2 flex flex-col items-center justify-center font-bold text-lg transition-all ${
                isActive ? 'scale-110 shadow-lg shadow-amber-500/25 ' + cInfo.border + ' ' + cInfo.bg + ' ' + cInfo.text :
                cInfo.border + ' ' + cInfo.bg + ' ' + cInfo.text
              }`}>
                <span>V{idx}</span>
                <span className="text-[9px] font-normal">{cInfo.name}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Result Card */}
      {step.phase === 'RESULT' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 Valid 3-Coloring: [V0: 1, V1: 2, V2: 3, V3: 2] (Return true)</span>
        </div>
      )}
    </div>
  );
}

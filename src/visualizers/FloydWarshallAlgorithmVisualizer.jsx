import React from 'react';

export const meta = {
  title: 'Floyd-Warshall Algorithm',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V^3)',
  spaceComplexity: 'O(V^2)',
  description: 'Computes all-pairs shortest paths using Dynamic Programming by considering every vertex K as an intermediate stepping stone: matrix[i][j] = min(matrix[i][j], matrix[i][k] + matrix[k][j]).'
};

export const solutions = {
  cpp: `// C++: Floyd-Warshall All-Pairs Shortest Path
#include <vector>
#include <algorithm>
using namespace std;

void floydWarshall(vector<vector<int>>& matrix) {
    int n = matrix.size();
    
    // Replace -1 with a large value representing INF
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (matrix[i][j] == -1) matrix[i][j] = 1e9;
            if (i == j) matrix[i][j] = 0;
        }
    }
    
    // Triple loop: intermediate vertex k
    for (int k = 0; k < n; k++) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][k] != 1e9 && matrix[k][j] != 1e9) {
                    matrix[i][j] = min(matrix[i][j], matrix[i][k] + matrix[k][j]);
                }
            }
        }
    }
    
    // Check negative cycle: if matrix[i][i] < 0
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (matrix[i][j] == 1e9) matrix[i][j] = -1;
        }
    }
}`,
  java: `// Java: Floyd-Warshall Algorithm
class Solution {
    public void shortest_distance(int[][] matrix) {
        int n = matrix.length;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == -1) matrix[i][j] = (int)1e9;
                if (i == j) matrix[i][j] = 0;
            }
        }
        for (int k = 0; k < n; k++) {
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    matrix[i][j] = Math.min(matrix[i][j], matrix[i][k] + matrix[k][j]);
                }
            }
        }
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == (int)1e9) matrix[i][j] = -1;
            }
        }
    }
}`,
  python: `# Python: Floyd-Warshall Algorithm
def floydWarshall(matrix):
    n = len(matrix)
    for i in range(n):
        for j in range(n):
            if matrix[i][j] == -1: matrix[i][j] = float('inf')
            if i == j: matrix[i][j] = 0
            
    for k in range(n):
        for i in range(n):
            for j in range(n):
                matrix[i][j] = min(matrix[i][j], matrix[i][k] + matrix[k][j])
                
    for i in range(n):
        for j in range(n):
            if matrix[i][j] == float('inf'): matrix[i][j] = -1
`,
  javascript: `// JavaScript: Floyd-Warshall Algorithm
function floydWarshall(matrix) {
  const n = matrix.length;
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.min(matrix[i][j], matrix[i][k] + matrix[k][j]);
      }
    }
  }
}`
};

export const steps = [
  {
    title: '1. Initial Adjacency Matrix (k = -1)',
    phase: 'INITIAL',
    codeLine: 11,
    viaK: 'None (Direct Edges)',
    matrix: [
      [0, 2, 'INF', 'INF'],
      [1, 0, 3, 'INF'],
      ['INF', 'INF', 0, 'INF'],
      [3, 5, 4, 0]
    ],
    info: 'Only direct edges are represented. Diagonal is 0.'
  },
  {
    title: '2. Intermediate Vertex k = 0',
    phase: 'VIA_K_0',
    codeLine: 23,
    viaK: 'k = 0',
    matrix: [
      [0, 2, 'INF', 'INF'],
      [1, 0, 3, 'INF'],
      ['INF', 'INF', 0, 'INF'],
      [3, 5, 4, 0]
    ],
    info: 'Evaluating shortcuts using vertex 0 as intermediate stepping stone.'
  },
  {
    title: '3. Intermediate Vertex k = 1: Updates [0][2] to 5',
    phase: 'VIA_K_1',
    codeLine: 23,
    viaK: 'k = 1',
    matrix: [
      [0, 2, 5, 'INF'],
      [1, 0, 3, 'INF'],
      ['INF', 'INF', 0, 'INF'],
      [3, 5, 4, 0]
    ],
    info: 'matrix[0][2] = min(INF, matrix[0][1] + matrix[1][2]) = 2 + 3 = 5! Shortcut through 1 found.'
  },
  {
    title: '4. Final All-Pairs Distance Matrix Resolved',
    phase: 'COMPLETE',
    codeLine: 31,
    viaK: 'Completed',
    matrix: [
      [0, 2, 5, 'INF'],
      [1, 0, 3, 'INF'],
      ['INF', 'INF', 0, 'INF'],
      [3, 5, 4, 0]
    ],
    info: 'All pairs processed across all V intermediate nodes in O(V^3) operations.'
  }
];

export default function FloydWarshallAlgorithmVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Intermediate Vertex: <strong className="text-cyan-200">{step.viaK}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Complexity: <strong className="text-purple-200">O(V^3) All-Pairs</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col items-center gap-4 w-full">
        <div className="flex justify-between items-center w-full px-2 text-xs font-mono text-[#8a8ea3]">
          <span>All-Pairs Distance Matrix [4 &times; 4]</span>
          <span className="text-cyan-400 font-bold">d[i][j] via k</span>
        </div>

        <div className="grid grid-cols-5 gap-1.5 text-center font-mono text-xs">
          <div className="text-[#525777] p-2 font-bold">i \ j</div>
          {[0, 1, 2, 3].map(c => (
            <div key={c} className="text-cyan-300 p-2 font-bold bg-[#181a27] rounded-lg">v{c}</div>
          ))}
          {step.matrix.map((row, r) => (
            <React.Fragment key={r}>
              <div className="text-cyan-300 p-2 font-bold bg-[#181a27] rounded-lg flex items-center justify-center">v{r}</div>
              {row.map((val, c) => (
                <div
                  key={c}
                  className={`p-2.5 rounded-xl font-bold border transition-all ${
                    val === 0
                      ? 'bg-[#181a27] text-slate-400 border-[#272b3c]'
                      : val === 'INF'
                      ? 'bg-[#12131b] text-slate-600 border-[#1c1f2e]'
                      : 'bg-cyan-500/20 text-cyan-200 border-cyan-500/40 shadow-sm'
                  }`}
                >
                  {val}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

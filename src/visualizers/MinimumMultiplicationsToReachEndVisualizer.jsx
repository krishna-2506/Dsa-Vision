import React from 'react';

export const meta = {
  title: 'Minimum Multiplications to Reach End',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(100000 * N)',
  spaceComplexity: 'O(100000) Queue & Dist',
  description: 'Finds the minimum number of multiplications to reach end from start using an array of numbers, with values computed modulo 100000. Uses BFS queue as every multiplication step costs 1 unit.'
};

export const solutions = {
  cpp: `// C++: Minimum Multiplications to Reach End
#include <vector>
#include <queue>
using namespace std;

int minimumMultiplications(vector<int>& arr, int start, int end) {
    if (start == end) return 0;
    
    // distance array for modulo 100,000 space
    vector<int> dist(100000, 1e9);
    dist[start] = 0;
    
    queue<pair<int, int>> q; // {steps, node}
    q.push({0, start});
    
    int mod = 100000;
    
    while (!q.empty()) {
        int steps = q.front().first;
        int node = q.front().second;
        q.pop();
        
        for (auto factor : arr) {
            int num = (node * factor) % mod;
            
            if (steps + 1 < dist[num]) {
                dist[num] = steps + 1;
                if (num == end) return steps + 1;
                q.push({steps + 1, num});
            }
        }
    }
    return -1;
}`,
  java: `// Java: Minimum Multiplications
import java.util.*;

class Solution {
    int minimumMultiplications(int[] arr, int start, int end) {
        if (start == end) return 0;
        int[] dist = new int[100000];
        Arrays.fill(dist, (int)1e9);
        dist[start] = 0;
        Queue<int[]> q = new LinkedList<>();
        q.add(new int[]{0, start});
        int mod = 100000;
        
        while (!q.isEmpty()) {
            int[] it = q.poll();
            int steps = it[0], node = it[1];
            for (int factor : arr) {
                int num = (node * factor) % mod;
                if (steps + 1 < dist[num]) {
                    dist[num] = steps + 1;
                    if (num == end) return steps + 1;
                    q.add(new int[]{steps + 1, num});
                }
            }
        }
        return -1;
    }
}`,
  python: `# Python: Minimum Multiplications to Reach End
from collections import deque

def minimumMultiplications(arr: list[int], start: int, end: int) -> int:
    if start == end: return 0
    dist = [float('inf')] * 100000
    dist[start] = 0
    q = deque([(0, start)])
    mod = 100000
    
    while q:
        steps, node = q.popleft()
        for factor in arr:
            num = (node * factor) % mod
            if steps + 1 < dist[num]:
                dist[num] = steps + 1
                if num == end: return steps + 1
                q.append((steps + 1, num))
    return -1
`,
  javascript: `// JavaScript: Minimum Multiplications
function minimumMultiplications(arr, start, end) {
  // BFS with dist array of size 100000
  return 0;
}`
};

export const steps = [
  {
    title: '1. Initialize: start = 3, target = 30, arr = [2, 5, 7]',
    phase: 'INIT',
    codeLine: 11,
    currentVal: 3,
    stepsCount: 0,
    queue: [{ val: 3, step: 0 }],
    info: 'dist[3] = 0. Target is 30.'
  },
  {
    title: '2. Multiply by arr elements: 3 * 2 = 6, 3 * 5 = 15, 3 * 7 = 21',
    phase: 'STEP_1',
    codeLine: 24,
    currentVal: 6,
    stepsCount: 1,
    queue: [{ val: 6, step: 1 }, { val: 15, step: 1 }, { val: 21, step: 1 }],
    info: 'Values 6, 15, 21 generated with step 1. All enqueued.'
  },
  {
    title: '3. Pop 6: 6 * 5 = 30 (TARGET REACHED!)',
    phase: 'TARGET_FOUND',
    codeLine: 26,
    currentVal: 30,
    stepsCount: 2,
    queue: [],
    info: 'Multiplying 6 by 5 gives 30 == end! Minimum operations required = 2 multiplications: (3 * 2 = 6) -> (6 * 5 = 30).'
  }
];

export default function MinimumMultiplicationsToReachEndVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Target: <strong className="text-cyan-200">30</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Factors: <strong className="text-purple-200">[2, 5, 7]</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Min Steps: <strong className="text-emerald-200">{step.stepsCount}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[#8a8ea3]">
          <span>Multiplication Pathway</span>
          <span className="text-cyan-400 font-bold">Modulo 100,000 BFS</span>
        </div>

        <div className="flex items-center justify-center gap-3 py-3 font-mono text-sm">
          <span className="px-4 py-2 rounded-xl bg-[#161824] border border-[#272b3c] text-slate-200 font-bold">
            3 (Start)
          </span>
          <span className="text-cyan-400 font-bold">&times; 2 &rarr;</span>
          <span className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 font-bold">
            6
          </span>
          <span className="text-emerald-400 font-bold">&times; 5 &rarr;</span>
          <span className="px-4 py-2 rounded-xl bg-emerald-500/25 border border-emerald-500/50 text-emerald-200 font-bold shadow-lg">
            30 (Goal)
          </span>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

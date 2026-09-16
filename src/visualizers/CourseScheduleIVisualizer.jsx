import React from 'react';

export const meta = {
  title: 'Course Schedule I',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V + E)',
  description: 'Determines whether you can finish all courses given prerequisite pairs [course, prereq]. A valid schedule exists if and only if the prerequisite graph contains NO directed cycle (LeetCode 207).'
};

export const solutions = {
  cpp: `// C++: Course Schedule I (LeetCode 207)
#include <vector>
#include <queue>
using namespace std;

bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> adj(numCourses);
    vector<int> indegree(numCourses, 0);
    
    // [course, prereq] -> prereq is prerequisite of course: prereq -> course
    for (auto& edge : prerequisites) {
        adj[edge[1]].push_back(edge[0]);
        indegree[edge[0]]++;
    }
    
    queue<int> q;
    for (int i = 0; i < numCourses; i++) {
        if (indegree[i] == 0) q.push(i);
    }
    
    int completedCourses = 0;
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        completedCourses++;
        
        for (auto nextCourse : adj[node]) {
            indegree[nextCourse]--;
            if (indegree[nextCourse] == 0) {
                q.push(nextCourse);
            }
        }
    }
    return completedCourses == numCourses;
}`,
  java: `// Java: Course Schedule I
import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        int[] indegree = new int[numCourses];
        
        for (int[] p : prerequisites) {
            adj.get(p[1]).add(p[0]);
            indegree[p[0]]++;
        }
        
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) q.add(i);
        }
        
        int completed = 0;
        while (!q.isEmpty()) {
            int cur = q.poll();
            completed++;
            for (int next : adj.get(cur)) {
                indegree[next]--;
                if (indegree[next] == 0) q.add(next);
            }
        }
        return completed == numCourses;
    }
}`,
  python: `# Python: Course Schedule I
from collections import deque

def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    adj = [[] for _ in range(numCourses)]
    indegree = [0] * numCourses
    for dest, src in prerequisites:
        adj[src].append(dest)
        indegree[dest] += 1
        
    q = deque([i for i in range(numCourses) if indegree[i] == 0])
    completed = 0
    while q:
        node = q.popleft()
        completed += 1
        for neighbor in adj[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                q.append(neighbor)
    return completed == numCourses
`,
  javascript: `// JavaScript: Course Schedule I
function canFinish(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const indegree = new Array(numCourses).fill(0);
  for (const [dest, src] of prerequisites) {
    adj[src].push(dest);
    indegree[dest]++;
  }
  const q = [];
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) q.push(i);
  }
  let completed = 0;
  while (q.length) {
    const cur = q.shift();
    completed++;
    for (const next of adj[cur]) {
      indegree[next]--;
      if (indegree[next] === 0) q.push(next);
    }
  }
  return completed === numCourses;
}`
};

export const steps = [
  {
    title: '1. Prerequisite Graph: Courses [0, 1, 2, 3]',
    phase: 'GRAPH_SETUP',
    codeLine: 11,
    completed: 0,
    indegree: [0, 1, 1, 1],
    queue: [0],
    explanation: 'Edges: 0 -> 1, 0 -> 2, 1 -> 3, 2 -> 3. Course 0 has 0 prerequisites. Push 0 into queue.'
  },
  {
    title: '2. Complete Course 0: Unlock Courses 1 & 2',
    phase: 'COMPLETE_0',
    codeLine: 24,
    completed: 1,
    indegree: [0, 0, 0, 1],
    queue: [1, 2],
    explanation: 'Finish Course 0. In-degrees of 1 and 2 drop to 0! Both are enqueued.'
  },
  {
    title: '3. Complete Courses 1 & 2: Unlock Course 3',
    phase: 'COMPLETE_1_2',
    codeLine: 24,
    completed: 3,
    indegree: [0, 0, 0, 0],
    queue: [3],
    explanation: 'Finish Courses 1 & 2. In-degree of Course 3 drops to 0. Enqueued.'
  },
  {
    title: '4. Complete Course 3: All 4 Courses Finished!',
    phase: 'ALL_DONE',
    codeLine: 31,
    completed: 4,
    indegree: [0, 0, 0, 0],
    queue: [],
    explanation: 'Completed 4 / 4 courses with 0 cyclic deadlock! canFinish = true.'
  }
];

export default function CourseScheduleIVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Courses Finished: <strong className="text-cyan-200">{step.completed} / 4</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Feasibility: <strong className="text-emerald-200">TRUE (No Cycle)</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[#8a8ea3]">
          <span>Course Dependency Nodes &amp; Remaining Prerequisites</span>
          <span className="text-cyan-400 font-bold">In-degree = Remaining Prereqs</span>
        </div>

        <div className="grid grid-cols-4 gap-2.5 font-mono text-xs">
          {[0, 1, 2, 3].map(c => (
            <div
              key={c}
              className={`p-3 rounded-xl border flex flex-col items-center transition-all ${
                step.completed > c
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200'
                  : step.indegree[c] === 0
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-200'
                  : 'bg-[#161824] border-[#272b3c] text-slate-400'
              }`}
            >
              <span className="font-bold">Course {c}</span>
              <span className="text-[11px] mt-1 opacity-80">
                {step.completed > c ? 'DONE' : `req: ${step.indegree[c]}`}
              </span>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl bg-[#0f1017] border border-[#1f2233] text-xs font-mono flex items-center justify-between">
          <span className="text-[#64748b]">Ready to Take (Queue):</span>
          <span className="text-cyan-300 font-bold">
            {step.queue.length > 0 ? `[${step.queue.map(c => `Course ${c}`).join(', ')}]` : 'None / Completed'}
          </span>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.explanation}
      </div>
    </div>
  );
}

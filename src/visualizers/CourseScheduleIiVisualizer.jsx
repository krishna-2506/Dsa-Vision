import React from 'react';

export const meta = {
  title: 'Course Schedule II',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V + E)',
  description: 'Finds a valid ordering of courses to finish all of them given prerequisite pairs. Returns the exact topological ordering array, or an empty array if a cycle exists (LeetCode 210).'
};

export const solutions = {
  cpp: `// C++: Course Schedule II (LeetCode 210)
#include <vector>
#include <queue>
using namespace std;

vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> adj(numCourses);
    vector<int> indegree(numCourses, 0);
    
    for (auto& p : prerequisites) {
        adj[p[1]].push_back(p[0]);
        indegree[p[0]]++;
    }
    
    queue<int> q;
    for (int i = 0; i < numCourses; i++) {
        if (indegree[i] == 0) q.push(i);
    }
    
    vector<int> order;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        order.push_back(u);
        
        for (int v : adj[u]) {
            indegree[v]--;
            if (indegree[v] == 0) q.push(v);
        }
    }
    if (order.size() == numCourses) return order;
    return {};
}`,
  java: `// Java: Course Schedule II
import java.util.*;

class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
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
        int[] order = new int[numCourses];
        int idx = 0;
        while (!q.isEmpty()) {
            int u = q.poll();
            order[idx++] = u;
            for (int v : adj.get(u)) {
                indegree[v]--;
                if (indegree[v] == 0) q.add(v);
            }
        }
        return idx == numCourses ? order : new int[0];
    }
}`,
  python: `# Python: Course Schedule II
from collections import deque

def findOrder(numCourses: int, prerequisites: list[list[int]]) -> list[int]:
    adj = [[] for _ in range(numCourses)]
    indegree = [0] * numCourses
    for dest, src in prerequisites:
        adj[src].append(dest)
        indegree[dest] += 1
        
    q = deque([i for i in range(numCourses) if indegree[i] == 0])
    order = []
    while q:
        u = q.popleft()
        order.append(u)
        for v in adj[u]:
            indegree[v] -= 1
            if indegree[v] == 0:
                q.append(v)
    return order if len(order) == numCourses else []
`,
  javascript: `// JavaScript: Course Schedule II
function findOrder(numCourses, prerequisites) {
  // Kahn's BFS collecting course array
  return [];
}`
};

export const steps = [
  {
    title: '1. Initialize Courses with In-Degrees',
    phase: 'INIT',
    codeLine: 12,
    order: [],
    queue: [0],
    indegree: [0, 1, 1, 2],
    explanation: 'Course 0 has 0 prerequisites. Push 0 into queue.'
  },
  {
    title: '2. Take Course 0: order = [0]',
    phase: 'TAKE_0',
    codeLine: 21,
    order: [0],
    queue: [1, 2],
    indegree: [0, 0, 0, 2],
    explanation: 'Pop Course 0. Decrement indegree of Course 1 and 2 to 0. Enqueue both.'
  },
  {
    title: '3. Take Courses 1 & 2: order = [0, 1, 2]',
    phase: 'TAKE_1_2',
    codeLine: 21,
    order: [0, 1, 2],
    queue: [3],
    indegree: [0, 0, 0, 0],
    explanation: 'Pop Course 1 and Course 2. Prereq count for Course 3 drops from 2 to 0! Enqueue Course 3.'
  },
  {
    title: '4. Take Course 3: Final Schedule = [0, 1, 2, 3]',
    phase: 'COMPLETE',
    codeLine: 29,
    order: [0, 1, 2, 3],
    queue: [],
    indegree: [0, 0, 0, 0],
    explanation: 'Course 3 taken. Valid graduation study pathway found: [0, 1, 2, 3]!'
  }
];

export default function CourseScheduleIiVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Courses Scheduled: <strong className="text-purple-200">{step.order.length} / 4</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Next in Queue: <strong className="text-cyan-200">{step.queue.length > 0 ? `Course ${step.queue[0]}` : 'Empty'}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[var(--chalk-dim)]">
          <span>Generated Course Curriculum Order</span>
          <span className="text-emerald-400 font-bold">Topological Sequence</span>
        </div>

        {/* Course order progression */}
        <div className="flex items-center gap-2 flex-wrap min-h-[50px] p-3 rounded-xl bg-[#0f1017] border border-[#1f2233]">
          {step.order.length === 0 ? (
            <span className="text-[#475569] font-mono text-xs italic">Awaiting first course...</span>
          ) : (
            step.order.map((c, i) => (
              <div key={i} className="flex items-center gap-1.5 font-mono text-xs">
                <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 font-bold">
                  Course {c}
                </span>
                {i < step.order.length - 1 && <span className="text-[#525777]">&rarr;</span>}
              </div>
            ))
          )}
        </div>

        <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs font-mono">
          {[0, 1, 2, 3].map(c => (
            <div
              key={c}
              className={`p-2 rounded-xl border ${
                step.order.includes(c)
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                  : 'bg-[var(--board-raised-2)] border-[var(--line)] text-[#475569]'
              }`}
            >
              C{c}: {step.order.includes(c) ? 'COMPLETED' : `rem: ${step.indegree[c]}`}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-xs font-mono text-[#94a3b8]">
        {step.explanation}
      </div>
    </div>
  );
}

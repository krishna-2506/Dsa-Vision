export const rendererType = 'queue';

export const meta = {
  title: 'Course Schedule II',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V + E)',
  description: 'Finds a valid ordering of courses to finish all of them given prerequisite pairs. Returns the exact topological ordering array, or an empty array if a cycle exists (LeetCode 210).'
};

export const ideaMap = {
  title: 'Topological Sort Course Sequence Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Adjacency & In-Degree Setup',
      detail: 'Record incoming edges (prereq -> course) and maintain an in-degree counter array for all courses.'
    },
    {
      id: 'step2',
      label: 'Queue Independent Courses',
      detail: 'Identify all courses with zero incoming prerequisites and insert them into the initial FIFO processing queue.'
    },
    {
      id: 'step3',
      label: 'Sequential Order Collection',
      detail: 'Dequeue course u, append u to the topological result array, and relax downstream dependent courses.'
    },
    {
      id: 'step4',
      label: 'Acyclicity Validation',
      detail: 'If the collected sequence length equals numCourses, return the schedule; otherwise return empty array [].'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Course Schedule II (LeetCode 210)
// Time Complexity: O(V + E) | Space Complexity: O(V + E)
#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> indegree(numCourses, 0);
        
        for (const auto& p : prerequisites) {
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
    }
};`,
  java: `// Java: Course Schedule II (LeetCode 210)
// Time Complexity: O(V + E) | Space Complexity: O(V + E)
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
            if (indegree[i] == 0) q.offer(i);
        }
        
        int[] order = new int[numCourses];
        int idx = 0;
        
        while (!q.isEmpty()) {
            int u = q.poll();
            order[idx++] = u;
            for (int v : adj.get(u)) {
                indegree[v]--;
                if (indegree[v] == 0) q.offer(v);
            }
        }
        return idx == numCourses ? order : new int[0];
    }
}`,
  python: `# Python: Course Schedule II (LeetCode 210)
# Time Complexity: O(V + E) | Space Complexity: O(V + E)
from collections import deque

class Solution:
    def findOrder(self, numCourses: int, prerequisites: list[list[int]]) -> list[int]:
        adj = [[] for _ in range(numCourses)]
        indegree = [0] * numCourses
        
        for crs, prereq in prerequisites:
            adj[prereq].append(crs)
            indegree[crs] += 1
            
        q = deque([i for i in range(numCourses) if indegree[i] == 0])
        order = []
        
        while q:
            u = q.popleft()
            order.append(u)
            for v in adj[u]:
                indegree[v] -= 1
                if indegree[v] == 0:
                    q.append(v)
                    
        return order if len(order) == numCourses else []`,
  javascript: `// JavaScript: Course Schedule II (LeetCode 210)
// Time Complexity: O(V + E) | Space Complexity: O(V + E)
function findOrder(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const indegree = new Array(numCourses).fill(0);
  
  for (const [course, prereq] of prerequisites) {
    adj[prereq].push(course);
    indegree[course]++;
  }
  
  const q = [];
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) q.push(i);
  }
  
  const order = [];
  while (q.length > 0) {
    const u = q.shift();
    order.push(u);
    for (const v of adj[u]) {
      indegree[v]--;
      if (indegree[v] === 0) q.push(v);
    }
  }
  return order.length === numCourses ? order : [];
}`
};

export const steps = [
  {
    phase: 'INITIALIZE',
    title: '1. Build Graph & Enqueue Ready Course 0',
    mode: 'queue',
    queue: [0],
    inputTrack: {
      items: [0, 1, 1, 2],
      label: 'Course In-Degrees (Course 0..3)'
    },
    scanIndex: 0,
    activeIndices: [0],
    customCard: {
      title: 'Topological Scheduler Setup',
      rows: [
        { label: 'Courses to Order', value: '4 Courses [0, 1, 2, 3]', accent: true },
        { label: 'Prerequisites', value: '0->1, 0->2, 1->3, 2->3' },
        { label: 'Initial Queue', value: '[ Course 0 ]' },
        { label: 'Extracted Order', value: '[]' }
      ]
    },
    variables: {
      order: '[]',
      queue: '[0]',
      scheduledCount: '0 / 4'
    },
    metrics: {
      scheduled: '0 / 4',
      queueSize: 1,
      currentCourse: 0
    },
    explain: 'Course 0 has in-degree 0 (no prerequisites). Push 0 into queue. The topological order list is currently empty.',
    intuition: 'Any node with zero indegree can safely lead the sequence since nothing precedes it.'
  },
  {
    phase: 'PROCESS_0',
    title: '2. Dequeue Course 0: Append to Order & Unlock 1, 2',
    mode: 'queue',
    queue: [1, 2],
    inputTrack: {
      items: [0, 0, 0, 2],
      label: 'Course In-Degrees (Course 0..3)'
    },
    scanIndex: 0,
    activeIndices: [1, 2],
    customCard: {
      title: 'Course 0 Enrolled & Graduated',
      rows: [
        { label: 'Appended Order', value: '[0]', accent: true },
        { label: 'Unlocked Course 1', value: 'In-degree -> 0 (Enqueued)' },
        { label: 'Unlocked Course 2', value: 'In-degree -> 0 (Enqueued)' },
        { label: 'Queue', value: '[ Course 1, Course 2 ]' }
      ]
    },
    variables: {
      order: '[0]',
      queue: '[1, 2]',
      scheduledCount: '1 / 4'
    },
    metrics: {
      scheduled: '1 / 4',
      queueSize: 2,
      currentCourse: 0
    },
    explain: 'Dequeue Course 0 and append it to order: [0]. In-degrees of dependent courses 1 and 2 drop to 0; enqueue [1, 2].',
    intuition: 'Downstream courses have their dependency barriers cleared one by one.'
  },
  {
    phase: 'PROCESS_1_2',
    title: '3. Dequeue Courses 1 & 2: Unlock Course 3',
    mode: 'queue',
    queue: [3],
    inputTrack: {
      items: [0, 0, 0, 0],
      label: 'Course In-Degrees (Course 0..3)'
    },
    scanIndex: 3,
    activeIndices: [3],
    customCard: {
      title: 'Intermediate Courses Scheduled',
      rows: [
        { label: 'Appended Order', value: '[0, 1, 2]', accent: true },
        { label: 'Course 3 Dependencies', value: 'Both 1 and 2 resolved' },
        { label: 'Course 3 In-Degree', value: 'Drops to 0 (Enqueued!)' },
        { label: 'Queue', value: '[ Course 3 ]' }
      ]
    },
    variables: {
      order: '[0, 1, 2]',
      queue: '[3]',
      scheduledCount: '3 / 4'
    },
    metrics: {
      scheduled: '3 / 4',
      queueSize: 1,
      currentCourse: 2
    },
    explain: 'Courses 1 and 2 are scheduled and appended to order: [0, 1, 2]. Course 3 has both prerequisites met (in-degree drops to 0) and is enqueued.',
    intuition: 'Multiple valid orderings may exist at branching steps; Kahn\'s algorithm systematically yields one.'
  },
  {
    phase: 'COMPLETE',
    title: '4. Finalize Schedule: Valid Sequence [0, 1, 2, 3]',
    mode: 'queue',
    queue: [],
    inputTrack: {
      items: [0, 0, 0, 0],
      label: 'Topological Sort Complete'
    },
    scanIndex: 3,
    activeIndices: [0, 1, 2, 3],
    customCard: {
      title: 'Topological Order Generated',
      rows: [
        { label: 'Final Schedule', value: '[0, 1, 2, 3]', accent: true },
        { label: 'Courses Ordered', value: '4 / 4 courses' },
        { label: 'Cyclic Deadlock', value: 'None (Acyclic DAG)' },
        { label: 'Status', value: 'Success' }
      ]
    },
    variables: {
      order: '[0, 1, 2, 3]',
      queue: '[] (Empty)',
      scheduledCount: '4 / 4'
    },
    metrics: {
      scheduled: '4 / 4',
      queueSize: 0,
      currentCourse: 3
    },
    explain: 'Course 3 appended to order. Total scheduled courses = 4 equals numCourses. Valid topological sequence: [0, 1, 2, 3].',
    intuition: 'Every course in the returned sequence appears strictly after all its prerequisite dependencies.'
  }
];

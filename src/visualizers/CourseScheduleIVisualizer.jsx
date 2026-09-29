export const rendererType = 'queue';

export const meta = {
  title: 'Course Schedule I',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V + E)',
  description: 'Determines whether you can finish all courses given prerequisite pairs [course, prereq]. A valid schedule exists if and only if the prerequisite graph contains NO directed cycle (LeetCode 207).'
};

export const ideaMap = {
  title: 'Kahn\'s In-Degree Reduction Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'In-Degree Tabulation',
      detail: 'Construct adjacency list (prereq -> course) and record the incoming prerequisite count (in-degree) for every course.'
    },
    {
      id: 'step2',
      label: 'Zero-Prerequisite Seeding',
      detail: 'Find all courses with in-degree 0 (free of prerequisites) and enqueue them into the ready queue.'
    },
    {
      id: 'step3',
      label: 'Topological In-Degree Reduction',
      detail: 'Dequeue completed course u; for each dependent course v, decrement in-degree[v]. If in-degree[v] becomes 0, enqueue v.'
    },
    {
      id: 'step4',
      label: 'Cycle / Feasibility Verdict',
      detail: 'If the total number of processed courses equals numCourses, all courses can be finished without deadlock.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Course Schedule I (LeetCode 207)
// Time Complexity: O(V + E) | Space Complexity: O(V + E)
#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> indegree(numCourses, 0);
        
        // [course, prereq] -> prereq is prerequisite of course: prereq -> course
        for (const auto& edge : prerequisites) {
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
            
            for (int nextCourse : adj[node]) {
                indegree[nextCourse]--;
                if (indegree[nextCourse] == 0) {
                    q.push(nextCourse);
                }
            }
        }
        return completedCourses == numCourses;
    }
};`,
  java: `// Java: Course Schedule I (LeetCode 207)
// Time Complexity: O(V + E) | Space Complexity: O(V + E)
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
            if (indegree[i] == 0) q.offer(i);
        }
        
        int completed = 0;
        while (!q.isEmpty()) {
            int node = q.poll();
            completed++;
            for (int next : adj.get(node)) {
                indegree[next]--;
                if (indegree[next] == 0) {
                    q.offer(next);
                }
            }
        }
        return completed == numCourses;
    }
}`,
  python: `# Python: Course Schedule I (LeetCode 207)
# Time Complexity: O(V + E) | Space Complexity: O(V + E)
from collections import deque

class Solution:
    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:
        adj = [[] for _ in range(numCourses)]
        indegree = [0] * numCourses
        
        for crs, prereq in prerequisites:
            adj[prereq].append(crs)
            indegree[crs] += 1
            
        q = deque([i for i in range(numCourses) if indegree[i] == 0])
        completed = 0
        
        while q:
            node = q.popleft()
            completed += 1
            for next_crs in adj[node]:
                indegree[next_crs] -= 1
                if indegree[next_crs] == 0:
                    q.append(next_crs)
                    
        return completed == numCourses`,
  javascript: `// JavaScript: Course Schedule I (LeetCode 207)
// Time Complexity: O(V + E) | Space Complexity: O(V + E)
function canFinish(numCourses, prerequisites) {
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
  
  let completed = 0;
  while (q.length > 0) {
    const node = q.shift();
    completed++;
    for (const next of adj[node]) {
      indegree[next]--;
      if (indegree[next] === 0) q.push(next);
    }
  }
  return completed === numCourses;
}`
};

export const steps = [
  {
    phase: 'GRAPH_SETUP',
    title: '1. Setup Dependency Graph: Courses [0, 1, 2, 3]',
    mode: 'queue',
    queue: [0],
    inputTrack: {
      items: [0, 1, 1, 1],
      label: 'Remaining In-Degrees (Course 0..3)'
    },
    scanIndex: 0,
    activeIndices: [0],
    customCard: {
      title: 'Prerequisite Graph Analysis',
      rows: [
        { label: 'Prerequisites', value: '0 -> 1, 0 -> 2, 1 -> 3, 2 -> 3', accent: true },
        { label: 'In-Degrees', value: 'c0: 0, c1: 1, c2: 1, c3: 2' },
        { label: 'Zero In-Degree Queue', value: '[ Course 0 ]' },
        { label: 'Goal', value: 'Verify DAG acyclicity via Kahn\'s algorithm' }
      ]
    },
    variables: {
      completedCourses: '0 / 4',
      queue: '[0]',
      canFinish: 'Evaluating...'
    },
    metrics: {
      completed: '0 / 4',
      queueSize: 1,
      cycleRisk: 'None'
    },
    explain: 'Course 0 has 0 prerequisites. Push Course 0 into the FIFO ready queue. All other courses wait on their prerequisites.',
    intuition: 'Only courses with zero unresolved prerequisites can be taken immediately without conflict.'
  },
  {
    phase: 'COMPLETE_0',
    title: '2. Complete Course 0: Unlock Courses 1 & 2',
    mode: 'queue',
    queue: [1, 2],
    inputTrack: {
      items: [0, 0, 0, 2],
      label: 'Remaining In-Degrees (Course 0..3)'
    },
    scanIndex: 0,
    activeIndices: [1, 2],
    customCard: {
      title: 'Course 0 Graduation & Unlocks',
      rows: [
        { label: 'Course Taken', value: 'Course 0 completed', accent: true },
        { label: 'Unlock c1', value: 'In-degree 1 -> 0 (Enqueued!)' },
        { label: 'Unlock c2', value: 'In-degree 1 -> 0 (Enqueued!)' },
        { label: 'Ready Queue', value: '[ Course 1, Course 2 ]' }
      ]
    },
    variables: {
      completedCourses: '1 / 4',
      queue: '[1, 2]',
      canFinish: 'True so far'
    },
    metrics: {
      completed: '1 / 4',
      queueSize: 2,
      cycleRisk: 'None'
    },
    explain: 'Dequeue Course 0. Decrement in-degrees of dependent courses 1 and 2 to 0. Both become eligible and are pushed into the queue.',
    intuition: 'Graduating from a course satisfies its prerequisite requirements for downstream courses.'
  },
  {
    phase: 'COMPLETE_1_2',
    title: '3. Complete Courses 1 & 2: Unlock Capstone Course 3',
    mode: 'queue',
    queue: [3],
    inputTrack: {
      items: [0, 0, 0, 0],
      label: 'Remaining In-Degrees (Course 0..3)'
    },
    scanIndex: 3,
    activeIndices: [3],
    customCard: {
      title: 'Intermediary Courses Completed',
      rows: [
        { label: 'Courses Taken', value: 'Courses 1 and 2 completed', accent: true },
        { label: 'Unlock c3', value: 'In-degree drops: 2 -> 1 -> 0 (Enqueued!)' },
        { label: 'Ready Queue', value: '[ Course 3 ]' }
      ]
    },
    variables: {
      completedCourses: '3 / 4',
      queue: '[3]',
      canFinish: 'True so far'
    },
    metrics: {
      completed: '3 / 4',
      queueSize: 1,
      cycleRisk: 'None'
    },
    explain: 'Dequeue and complete Courses 1 and 2. Their graduation resolves all prerequisites for Course 3 (in-degree drops to 0). Course 3 is enqueued.',
    intuition: 'A course with multiple prerequisites becomes ready only when the last dependency is resolved.'
  },
  {
    phase: 'ALL_DONE',
    title: '4. Complete Course 3: All 4 Courses Finished!',
    mode: 'queue',
    queue: [],
    inputTrack: {
      items: [0, 0, 0, 0],
      label: 'All In-Degrees Zeroed'
    },
    scanIndex: 3,
    activeIndices: [0, 1, 2, 3],
    customCard: {
      title: 'Curriculum Feasibility Confirmed',
      rows: [
        { label: 'Total Completed', value: '4 / 4 courses', accent: true },
        { label: 'Deadlock / Cycle', value: 'None detected' },
        { label: 'Valid Linear Order', value: '[0, 1, 2, 3]' },
        { label: 'Verdict', value: 'canFinish = true' }
      ]
    },
    variables: {
      completedCourses: '4 / 4',
      queue: '[] (Empty)',
      canFinish: 'true'
    },
    metrics: {
      completed: '4 / 4',
      queueSize: 0,
      cycleRisk: 'Zero'
    },
    explain: 'Course 3 completed. All 4 out of 4 courses have been successfully taken with 0 cyclic deadlock! canFinish returns true.',
    intuition: 'If an undetected cycle existed, the queue would empty prematurely leaving completed < numCourses.'
  }
];

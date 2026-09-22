// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: "Ninja's Training (DP-7)",
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N × 3 × 3) = O(N) Time',
  spaceComplexity: 'O(1) Space-Optimized',
  description: 'A ninja plans a training schedule over N days across 3 tasks (Running, Fighting, Learning). The ninja cannot perform the same task on two consecutive days. Dynamic Programming tracks the maximum points obtainable for each task on day d: dp[d][t] = points[d][t] + max(dp[d-1][k != t]).'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: "Ninja's Training (DP-7)",
  nodes: [
    { id: 'root', label: "Ninja's Training", children: ['consecutive-constraint', 'transition-max', 'space-compression'] },
    { id: 'consecutive-constraint', label: '1. Constraint Invariant', detail: 'Task(day) != Task(day - 1). The previous day decision restricts valid choices for today.' },
    { id: 'transition-max', label: '2. DP Recurrence', detail: 'dp[d][task] = points[d][task] + max(dp[d-1][k]) for all k != task' },
    { id: 'space-compression', label: '3. Constant Space O(1)', detail: 'Only the 3 state values of day (d-1) are required to compute day d.' }
  ]
};

export const solutions = {
  cpp: `// C++ Ninja's Training (Space-Optimized)
// Time: O(N) | Space: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int ninjaTraining(int n, vector<vector<int>>& points) {
        vector<int> prev(3, 0);

        // Day 0 base
        prev[0] = points[0][0];
        prev[1] = points[0][1];
        prev[2] = points[0][2];

        for (int day = 1; day < n; day++) {
            vector<int> cur(3, 0);
            cur[0] = points[day][0] + max(prev[1], prev[2]);
            cur[1] = points[day][1] + max(prev[0], prev[2]);
            cur[2] = points[day][2] + max(prev[0], prev[1]);
            prev = cur;
        }

        return max({prev[0], prev[1], prev[2]});
    }
};`,
  python: `# Python 3 Ninja's Training
# Time: O(N) | Space: O(1)
class Solution:
    def ninjaTraining(self, n: int, points: list[list[int]]) -> int:
        prev = list(points[0])

        for day in range(1, n):
            cur = [0] * 3
            cur[0] = points[day][0] + max(prev[1], prev[2])
            cur[1] = points[day][1] + max(prev[0], prev[2])
            cur[2] = points[day][2] + max(prev[0], prev[1])
            prev = cur

        return max(prev)`,
  java: `// Java Ninja's Training
// Time: O(N) | Space: O(1)
class Solution {
    public int ninjaTraining(int n, int[][] points) {
        int[] prev = new int[3];
        prev[0] = points[0][0];
        prev[1] = points[0][1];
        prev[2] = points[0][2];

        for (int day = 1; day < n; day++) {
            int[] cur = new int[3];
            cur[0] = points[day][0] + Math.max(prev[1], prev[2]);
            cur[1] = points[day][1] + Math.max(prev[0], prev[2]);
            cur[2] = points[day][2] + Math.max(prev[0], prev[1]);
            prev = cur;
        }

        return Math.max(prev[0], Math.max(prev[1], prev[2]));
    }
}`,
  javascript: `// JavaScript Ninja's Training
// Time: O(N) | Space: O(1)
var ninjaTraining = function(n, points) {
    let prev = [...points[0]];

    for (let day = 1; day < n; day++) {
        const cur = new Array(3).fill(0);
        cur[0] = points[day][0] + Math.max(prev[1], prev[2]);
        cur[1] = points[day][1] + Math.max(prev[0], prev[2]);
        cur[2] = points[day][2] + Math.max(prev[0], prev[1]);
        prev = cur;
    }

    return Math.max(...prev);
};`
};

export const steps = [
  {
    phase: 'SETUP',
    grid: [
      [10, 50, 1],
      [0, 0, 0],
      [0, 0, 0]
    ],
    rowLabels: ['Day 0 (Start)', 'Day 1', 'Day 2 (Final)'],
    colLabels: ['Run (Task 0)', 'Fight (Task 1)', 'Learn (Task 2)'],
    activeCell: { r: 0, c: 1 },
    formula: 'Points: Day 0 [10, 50, 1] | Constraint: Task(d) != Task(d-1)',
    action: 'Initialize DP table for N = 3 days across 3 tasks: Running, Fighting, Learning.',
    explain: 'dp[day][task] represents the maximum points accumulated up to that day ending with that specific task. Day 0 has no preceding day constraints, so it initializes directly with the points table values [10, 50, 1].',
    intuition: 'Each day choice unlocks the other two tasks for the next day.',
    metrics: [
      { label: 'Total Days', value: 3 },
      { label: 'Activities', value: 3 },
      { label: 'Day 0 Best', value: 'Fight (50 pts)' }
    ]
  },
  {
    phase: 'DAY_1_TASK_0',
    grid: [
      [10, 50, 1],
      [55, 0, 0],
      [0, 0, 0]
    ],
    rowLabels: ['Day 0 (Start)', 'Day 1', 'Day 2 (Final)'],
    colLabels: ['Run (Task 0)', 'Fight (Task 1)', 'Learn (Task 2)'],
    activeCell: { r: 1, c: 0 },
    dependencyCells: [{ r: 0, c: 1, label: 'prev Fight=50' }, { r: 0, c: 2, label: 'prev Learn=1' }],
    formula: 'dp[1][0] = points[1][0] + max(dp[0][1], dp[0][2]) = 5 + max(50, 1) = 55',
    action: 'Day 1 Running (Task 0): points 5 + max(Fight: 50, Learn: 1) = 55.',
    explain: 'If the ninja runs on Day 1, they could not have run on Day 0. The valid previous choices are Day 0 Fighting (50 pts) or Learning (1 pt). Max previous is 50. Total = 5 + 50 = 55.',
    intuition: 'Branching on all non-identical preceding tasks.',
    metrics: [
      { label: 'Day 1 Task', value: 'Run (5 pts)' },
      { label: 'Best Prev', value: 'Fight (50 pts)' },
      { label: 'dp[1][0]', value: 55 }
    ]
  },
  {
    phase: 'DAY_1_TASK_1',
    grid: [
      [10, 50, 1],
      [55, 110, 0],
      [0, 0, 0]
    ],
    rowLabels: ['Day 0 (Start)', 'Day 1', 'Day 2 (Final)'],
    colLabels: ['Run (Task 0)', 'Fight (Task 1)', 'Learn (Task 2)'],
    activeCell: { r: 1, c: 1 },
    dependencyCells: [{ r: 0, c: 0, label: 'prev Run=10' }, { r: 0, c: 2, label: 'prev Learn=1' }],
    formula: 'dp[1][1] = points[1][1] + max(dp[0][0], dp[0][2]) = 100 + max(10, 1) = 110',
    action: 'Day 1 Fighting (Task 1): points 100 + max(Run: 10, Learn: 1) = 110!',
    explain: 'Fighting earns a huge 100 points on Day 1. Preceding choices are Run (10) or Learn (1). Choosing Run gives 100 + 10 = 110 points! This is the dominant state for Day 1.',
    intuition: 'Taking the high-reward task by pairing with the best valid predecessor.',
    metrics: [
      { label: 'Day 1 Task', value: 'Fight (100 pts)' },
      { label: 'dp[1][1]', value: 110, highlight: true }
    ]
  },
  {
    phase: 'DAY_1_TASK_2',
    grid: [
      [10, 50, 1],
      [55, 110, 61],
      [0, 0, 0]
    ],
    rowLabels: ['Day 0 (Start)', 'Row 1', 'Day 2 (Final)'],
    colLabels: ['Run (Task 0)', 'Fight (Task 1)', 'Learn (Task 2)'],
    activeCell: { r: 1, c: 2 },
    dependencyCells: [{ r: 0, c: 0, label: 'prev Run=10' }, { r: 0, c: 1, label: 'prev Fight=50' }],
    formula: 'dp[1][2] = points[1][2] + max(dp[0][0], dp[0][1]) = 11 + max(10, 50) = 61',
    action: 'Complete Day 1: Learning gives 11 + max(10, 50) = 61. Row 1 DP = [55, 110, 61].',
    explain: 'Learning earns 11 points and pairs with Day 0 Fighting (50 pts) for 61. Day 1 is completely evaluated.',
    intuition: 'All Day 1 outcomes calculated.',
    metrics: [
      { label: 'Day 1 DP', value: '[55, 110, 61]' },
      { label: 'Day 1 Max', value: 110 }
    ]
  },
  {
    phase: 'DAY_2_TASK_0',
    grid: [
      [10, 50, 1],
      [55, 110, 61],
      [130, 0, 0]
    ],
    rowLabels: ['Day 0 (Start)', 'Day 1', 'Day 2 (Final)'],
    colLabels: ['Run (Task 0)', 'Fight (Task 1)', 'Learn (Task 2)'],
    activeCell: { r: 2, c: 0 },
    dependencyCells: [{ r: 1, c: 1, label: 'prev Fight=110' }, { r: 1, c: 2, label: 'prev Learn=61' }],
    formula: 'dp[2][0] = points[2][0] + max(dp[1][1], dp[1][2]) = 20 + max(110, 61) = 130',
    action: 'Day 2 Running (Task 0): points 20 + max(Fight: 110, Learn: 61) = 130.',
    explain: 'Running on Day 2 earns 20 points. Valid Day 1 predecessors are Fighting (110) or Learning (61). Picking 110 yields 20 + 110 = 130 points.',
    intuition: 'Carrying forward the strong Day 1 Fighting score.',
    metrics: [
      { label: 'Day 2 Task', value: 'Run (20 pts)' },
      { label: 'dp[2][0]', value: 130 }
    ]
  },
  {
    phase: 'DAY_2_TASK_1',
    grid: [
      [10, 50, 1],
      [55, 110, 61],
      [130, 71, 0]
    ],
    rowLabels: ['Day 0 (Start)', 'Day 1', 'Day 2 (Final)'],
    colLabels: ['Run (Task 0)', 'Fight (Task 1)', 'Learn (Task 2)'],
    activeCell: { r: 2, c: 1 },
    dependencyCells: [{ r: 1, c: 0, label: 'prev Run=55' }, { r: 1, c: 2, label: 'prev Learn=61' }],
    formula: 'dp[2][1] = points[2][1] + max(dp[1][0], dp[1][2]) = 10 + max(55, 61) = 71',
    action: 'Day 2 Fighting (Task 1): points 10 + max(Run: 55, Learn: 61) = 71.',
    explain: 'Fighting earns only 10 points. Predecessors are Run (55) and Learn (61). Total = 10 + 61 = 71.',
    intuition: 'Fighting is sub-optimal on the final day.',
    metrics: [
      { label: 'dp[2][1]', value: 71 }
    ]
  },
  {
    phase: 'DAY_2_TASK_2_PEAK',
    grid: [
      [10, 50, 1],
      [55, 110, 61],
      [130, 71, 140]
    ],
    rowLabels: ['Day 0 (Start)', 'Day 1', 'Day 2 (Final)'],
    colLabels: ['Run (Task 0)', 'Fight (Task 1)', 'Learn (Task 2)'],
    activeCell: { r: 2, c: 2 },
    dependencyCells: [{ r: 1, c: 0, label: 'prev Run=55' }, { r: 1, c: 1, label: 'prev Fight=110' }],
    formula: 'dp[2][2] = points[2][2] + max(dp[1][0], dp[1][1]) = 30 + max(55, 110) = 140',
    action: 'Day 2 Learning (Task 2): points 30 + max(Run: 55, Fight: 110) = 140! Global Maximum!',
    explain: 'Learning earns 30 points on Day 2. Because it avoids consecutive fighting, it can legally follow Day 1 Fighting (110 pts). Total points = 30 + 110 = 140!',
    intuition: 'Max score peak reached at 140 points.',
    metrics: [
      { label: 'Day 2 Task', value: 'Learn (30 pts)' },
      { label: 'Peak Points', value: 140, highlight: true }
    ]
  },
  {
    phase: 'SCHEDULE_TRACEBACK',
    grid: [
      [10, 50, 1],
      [55, 110, 61],
      [130, 71, 140]
    ],
    rowLabels: ['Day 0 (Start)', 'Day 1', 'Day 2 (Final)'],
    colLabels: ['Run (Task 0)', 'Fight (Task 1)', 'Learn (Task 2)'],
    activeCell: { r: 2, c: 2 },
    dependencyCells: [{ r: 1, c: 1, label: 'Day 1 Fight' }, { r: 0, c: 0, label: 'Day 0 Run' }],
    formula: 'Optimal Schedule: Day 0 Run (10) -> Day 1 Fight (100) -> Day 2 Learn (30) = 140',
    action: 'Reconstruct the optimal 3-day training schedule.',
    explain: '1. Day 2: Learn (Task 2, 30 pts) ➔ came from Day 1 Fight (110 pts)\n2. Day 1: Fight (Task 1, 100 pts) ➔ came from Day 0 Run (10 pts)\n3. Day 0: Run (Task 0, 10 pts)\nPoints sum = 10 + 100 + 30 = 140. No consecutive duplicate tasks.',
    intuition: 'Schedule conforms to all non-consecutive rules while maximizing profit.',
    metrics: [
      { label: 'Day 0', value: 'Run (10)' },
      { label: 'Day 1', value: 'Fight (100)' },
      { label: 'Day 2', value: 'Learn (30)' }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [10, 50, 1],
      [55, 110, 61],
      [130, 71, 140]
    ],
    rowLabels: ['Day 0 (Start)', 'Day 1', 'Day 2 (Final)'],
    colLabels: ['Run (Task 0)', 'Fight (Task 1)', 'Learn (Task 2)'],
    activeCell: { r: 2, c: 2 },
    formula: 'Output: 140 | O(N) Time, O(1) Space',
    action: 'Algorithm complete! Maximum points = 140.',
    explain: 'By maintaining a 3-element rolling array prev, the algorithm runs in linear O(N) time with constant O(1) extra space.',
    intuition: 'State machine DP handles alternating constraints with minimal overhead.',
    metrics: [
      { label: 'Max Points', value: 140, highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ]
  }
];

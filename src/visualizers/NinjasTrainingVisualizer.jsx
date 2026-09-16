import React from 'react';

export const meta = {
  title: "Ninja's Training",
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N * 3 * 3) = O(N)',
  spaceComplexity: 'O(1)',
  description: 'A ninja plans a training schedule over N days across 3 tasks (Running, Fighting, Learning). The ninja cannot perform the same task on two consecutive days. Dynamic Programming tracks the maximum points attainable given the previous day task constraint.'
};

export const solutions = {
  cpp: `// C++ Ninja's Training (2D DP / Space-Optimized)
// Time: O(N) | Space: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int ninjaTraining(int n, vector<vector<int>>& points) {
        vector<int> prev(4, 0);

        // Base case: Day 0
        prev[0] = max(points[0][1], points[0][2]);
        prev[1] = max(points[0][0], points[0][2]);
        prev[2] = max(points[0][0], points[0][1]);
        prev[3] = max({points[0][0], points[0][1], points[0][2]});

        for (int day = 1; day < n; day++) {
            vector<int> temp(4, 0);
            for (int last = 0; last < 4; last++) {
                temp[last] = 0;
                for (int task = 0; task < 3; task++) {
                    if (task != last) {
                        int point = points[day][task] + prev[task];
                        temp[last] = max(temp[last], point);
                    }
                }
            }
            prev = temp;
        }

        return prev[3];
    }
};`,
  python: `# Python 3 Ninja's Training
# Time: O(N) | Space: O(1)
class Solution:
    def ninjaTraining(self, n: int, points: list[list[int]]) -> int:
        prev = [0] * 4
        prev[0] = max(points[0][1], points[0][2])
        prev[1] = max(points[0][0], points[0][2])
        prev[2] = max(points[0][0], points[0][1])
        prev[3] = max(points[0])

        for day in range(1, n):
            temp = [0] * 4
            for last in range(4):
                for task in range(3):
                    if task != last:
                        temp[last] = max(temp[last], points[day][task] + prev[task])
            prev = temp

        return prev[3]`,
  java: `// Java Ninja's Training
// Time: O(N) | Space: O(1)
class Solution {
    public int ninjaTraining(int n, int[][] points) {
        int[] prev = new int[4];
        prev[0] = Math.max(points[0][1], points[0][2]);
        prev[1] = Math.max(points[0][0], points[0][2]);
        prev[2] = Math.max(points[0][0], points[0][1]);
        prev[3] = Math.max(points[0][0], Math.max(points[0][1], points[0][2]));

        for (int day = 1; day < n; day++) {
            int[] temp = new int[4];
            for (int last = 0; last < 4; last++) {
                for (int task = 0; task < 3; task++) {
                    if (task != last) {
                        temp[last] = Math.max(temp[last], points[day][task] + prev[task]);
                    }
                }
            }
            prev = temp;
        }

        return prev[3];
    }
}`,
  javascript: `// JavaScript Ninja's Training
// Time: O(N) | Space: O(1)
var ninjaTraining = function(n, points) {
    let prev = [
        Math.max(points[0][1], points[0][2]),
        Math.max(points[0][0], points[0][2]),
        Math.max(points[0][0], points[0][1]),
        Math.max(points[0][0], points[0][1], points[0][2])
    ];

    for (let day = 1; day < n; day++) {
        let temp = [0, 0, 0, 0];
        for (let last = 0; last < 4; last++) {
            for (let task = 0; task < 3; task++) {
                if (task !== last) {
                    temp[last] = Math.max(temp[last], points[day][task] + prev[task]);
                }
            }
        }
        prev = temp;
    }

    return prev[3];
};`
};

export const steps = [
  {
    title: '1. Problem Setup: 3 Days Training Matrix',
    phase: 'INITIAL',
    codeLine: 13,
    activeDay: 0,
    points: [
      [10, 40, 70],
      [20, 50, 80],
      [30, 60, 90]
    ],
    selectedTasks: [-1, -1, -1],
    prevDp: [70, 70, 40, 70],
    variables: { tasks: '0: Running, 1: Fighting, 2: Learning', n: 3 },
    explain: 'Each day ninja can choose between 3 tasks. The only constraint: cannot repeat the same task on consecutive days.',
    intuition: 'State dp[day][last] stores max merit points earned up to that day if task "last" was done yesterday.'
  },
  {
    title: '2. Day 0 Base Cases: Best task if last = Running, Fighting, Learning',
    phase: 'DAY_0',
    codeLine: 17,
    activeDay: 0,
    points: [
      [10, 40, 70],
      [20, 50, 80],
      [30, 60, 90]
    ],
    selectedTasks: [2, -1, -1],
    prevDp: [70, 70, 40, 70],
    variables: { 'prev[0]': 70, 'prev[1]': 70, 'prev[2]': 40, 'prev[3] (no prev)': 70 },
    explain: 'Day 0: Best task is Learning (70 points). If previous was Learning, best is Fighting (40 points).',
    intuition: 'Initialize base states for Day 0.'
  },
  {
    title: '3. Day 1: Points [20, 50, 80], compute optimal pairings from Day 0',
    phase: 'DAY_1',
    codeLine: 24,
    activeDay: 1,
    points: [
      [10, 40, 70],
      [20, 50, 80],
      [30, 60, 90]
    ],
    selectedTasks: [2, 1, -1],
    prevDp: [120, 150, 120, 150],
    variables: { day: 1, bestPair: 'Day 0: Learning (70) + Day 1: Fighting (50) = 120, or Day 0: Fighting (40) + Day 1: Learning (80) = 120' },
    explain: 'For Day 1, pairing task 1 with Day 0 task 2 yields 50 + 70 = 120 points.',
    intuition: 'Each task combines with the maximum allowable state from the previous day.'
  },
  {
    title: '4. Day 2: Final Day Points [30, 60, 90] -> Max Training Points = 210',
    phase: 'COMPLETED',
    codeLine: 31,
    activeDay: 2,
    points: [
      [10, 40, 70],
      [20, 50, 80],
      [30, 60, 90]
    ],
    selectedTasks: [2, 1, 2],
    prevDp: [210, 210, 180, 210],
    variables: { maxMeritPoints: 210, optimalPlan: 'Day 0: Learn (70) -> Day 1: Fight (50) -> Day 2: Learn (90)' },
    explain: 'Optimal training schedule: Day 0: Learning (70), Day 1: Fighting (50), Day 2: Learning (90). Total = 70 + 50 + 90 = 210 points!',
    intuition: 'Alternating high-value tasks yields maximum merit while strictly satisfying the consecutive task constraint.'
  }
];

export default function NinjasTrainingVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];
  const taskNames = ['🏃 Running', '🥋 Fighting', '📚 Learning'];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold">
          Active Day: Day {step.activeDay}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Total Points: {step.prevDp[3]}
        </span>
      </div>

      {/* Days & Tasks Grid */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Daily Tasks & Merit Points Matrix
        </span>

        <div className="w-full flex flex-col gap-3">
          {step.points.map((dayPoints, dayIdx) => {
            const isCurrentDay = dayIdx === step.activeDay;
            const chosenTask = step.selectedTasks[dayIdx];

            return (
              <div
                key={dayIdx}
                className={`w-full rounded-xl border p-3 flex items-center justify-between transition-all ${
                  isCurrentDay
                    ? 'border-indigo-500/60 bg-indigo-500/10 shadow-lg'
                    : 'border-[#272b3c] bg-[#161824]'
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold text-indigo-300">
                    Day {dayIdx}
                  </span>
                  <span className="text-[10px] text-[#8a8ea3]">
                    {chosenTask !== -1 ? `Selected: ${taskNames[chosenTask]}` : 'Pending'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {dayPoints.map((pts, tIdx) => {
                    const isSelected = chosenTask === tIdx;

                    return (
                      <div
                        key={tIdx}
                        className={`w-24 py-2 rounded-xl border flex flex-col items-center font-mono transition-all ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/30'
                            : 'border-[#272b3c] bg-[#12131b] text-slate-300'
                        }`}
                      >
                        <span className="text-[10px] text-slate-400">{taskNames[tIdx]}</span>
                        <span className="text-xs font-bold text-amber-400 mt-0.5">+{pts} pts</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

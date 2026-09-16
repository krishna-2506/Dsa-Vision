import React from 'react';

export const meta = {
  title: 'Shortest Job First (SJF) Scheduling',
  category: 'Greedy Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(1)',
  description: 'Calculates the average waiting time under non-preemptive Shortest Job First (SJF) scheduling by greedily executing processes in ascending order of burst time to minimize total queue delay.'
};

export const solutions = {
  cpp: `// C++ Shortest Job First (SJF) Scheduling
// Time: O(N log N) | Space: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    long long solve(vector<int>& bt) {
        sort(bt.begin(), bt.end());
        long long totalWaitTime = 0;
        long long currentTime = 0;

        for (int b : bt) {
            totalWaitTime += currentTime;
            currentTime += b;
        }

        return totalWaitTime / bt.size();
    }
};`,
  python: `# Python 3 Shortest Job First (SJF) Scheduling
# Time: O(N log N) | Space: O(1)
class Solution:
    def solve(self, bt: list[int]) -> int:
        bt.sort()
        total_wait_time = 0
        current_time = 0

        for b in bt:
            total_wait_time += current_time
            current_time += b

        return total_wait_time // len(bt)`,
  java: `// Java Shortest Job First (SJF) Scheduling
// Time: O(N log N) | Space: O(1)
import java.util.Arrays;

class Solution {
    public long solve(int[] bt) {
        Arrays.sort(bt);
        long totalWaitTime = 0;
        long currentTime = 0;

        for (int b : bt) {
            totalWaitTime += currentTime;
            currentTime += b;
        }

        return totalWaitTime / bt.length;
    }
}`,
  javascript: `// JavaScript Shortest Job First (SJF) Scheduling
// Time: O(N log N) | Space: O(1)
var solve = function(bt) {
    bt.sort((a, b) => a - b);
    let totalWaitTime = 0;
    let currentTime = 0;

    for (const b of bt) {
        totalWaitTime += currentTime;
        currentTime += b;
    }

    return Math.floor(totalWaitTime / bt.length);
};`
};

export const steps = [
  {
    title: '1. Input Burst Times: [4, 3, 7, 1, 2]',
    phase: 'INIT',
    codeLine: 11,
    bt: [4, 3, 7, 1, 2],
    sortedBt: [1, 2, 3, 4, 7],
    isSorted: false,
    waitTimes: [],
    variables: { originalBurstTimes: '[4, 3, 7, 1, 2]', processCount: 5 },
    explain: 'Unordered burst times create unnecessary waiting overhead if long jobs run first. Greedy scheduling sorts jobs in ascending burst duration.',
    intuition: 'Executing short jobs early allows them to leave the queue rapidly, minimizing cumulative wait.'
  },
  {
    title: '2. Sort Ascending: [1, 2, 3, 4, 7]',
    phase: 'SORT',
    codeLine: 12,
    bt: [1, 2, 3, 4, 7],
    sortedBt: [1, 2, 3, 4, 7],
    isSorted: true,
    waitTimes: [0],
    variables: { sorted: '[1, 2, 3, 4, 7]', 'Job 1 (len 1)': 'Waits 0 ms' },
    explain: 'Job 1 begins immediately at t = 0. Its wait time is 0.',
    intuition: 'The shortest job (1 ms) never waits.'
  },
  {
    title: '3. Accumulate Waiting Times: 0 + 1 + 3 + 6 + 10 = 20',
    phase: 'ACCUMULATE',
    codeLine: 17,
    bt: [1, 2, 3, 4, 7],
    sortedBt: [1, 2, 3, 4, 7],
    isSorted: true,
    waitTimes: [0, 1, 3, 6, 10],
    variables: { 'Job 2': 'waits 1', 'Job 3': 'waits 1+2=3', 'Job 4': 'waits 3+3=6', 'Job 5': 'waits 6+4=10', totalWait: 20 },
    explain: 'Cumulative completion timeline: 0 -> 1 -> 3 -> 6 -> 10 -> 17. Total waiting time across all 5 jobs = 20 ms.',
    intuition: 'Each job waits for the sum of all preceding burst times.'
  },
  {
    title: '4. Average Waiting Time: 20 / 5 = 4 ms',
    phase: 'COMPLETED',
    codeLine: 21,
    bt: [1, 2, 3, 4, 7],
    sortedBt: [1, 2, 3, 4, 7],
    isSorted: true,
    waitTimes: [0, 1, 3, 6, 10],
    avgWait: 4,
    variables: { totalWait: '20 ms', count: 5, avgWaitTime: '4 ms' },
    explain: 'Average waiting time under SJF is 20 / 5 = 4 ms, which is provably the theoretical minimum for non-preemptive scheduling.',
    intuition: 'Greedy ordering strictly minimizes average turnaround and wait times.'
  }
];

export default function ShortestJobFirstVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Ordering: {step.isSorted ? 'Ascending (SJF)' : 'Initial Unsorted'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Avg Wait Time: {step.avgWait !== undefined ? `${step.avgWait} ms` : 'Computing...'}
        </span>
      </div>

      {/* Jobs Gantt Representation */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Process Queue &amp; Waiting Times
        </span>

        <div className="flex items-center justify-center gap-3 py-2 font-mono">
          {step.bt.map((burst, idx) => {
            const wait = step.waitTimes[idx];

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div
                  className={`w-14 h-22 rounded-2xl border flex flex-col items-center justify-center transition-all duration-300 ${
                    wait !== undefined
                      ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300'
                      : 'border-[#272b3c] bg-[#161824] text-slate-400'
                  }`}
                >
                  <span className="text-[9px] text-[#8a8ea3]">P{idx + 1}</span>
                  <span className="text-base font-bold text-amber-300 mt-0.5">{burst} ms</span>
                  <span className="text-[10px] text-cyan-400 mt-1">
                    {wait !== undefined ? `wait: ${wait}` : 'queued'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

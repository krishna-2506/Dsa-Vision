import React from 'react';

export const meta = {
  title: 'Job Sequencing with Deadlines',
  category: 'Greedy Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N + N * maxDeadline)',
  spaceComplexity: 'O(maxDeadline)',
  description: 'Maximizes total profit by scheduling jobs before their deadlines, greedily placing highest profit jobs in the latest possible available time slots.'
};

export const solutions = {
  cpp: `// C++ Job Sequencing Problem (Greedy)
// Time: O(N log N + N * D) | Space: O(D)
#include <vector>
#include <algorithm>
using namespace std;

struct Job {
    int id;
    int dead;
    int profit;
};

class Solution {
public:
    vector<int> JobScheduling(Job arr[], int n) {
        // Sort jobs by profit in descending order
        sort(arr, arr + n, [](const Job& a, const Job& b) {
            return a.profit > b.profit;
        });

        int maxDeadline = 0;
        for (int i = 0; i < n; i++) {
            maxDeadline = max(maxDeadline, arr[i].dead);
        }

        // Slot array initialized to -1 (1-indexed up to maxDeadline)
        vector<int> slot(maxDeadline + 1, -1);

        int countJobs = 0, totalProfit = 0;

        for (int i = 0; i < n; i++) {
            // Find the latest free slot before or on the deadline
            for (int j = arr[i].dead; j > 0; j--) {
                if (slot[j] == -1) {
                    slot[j] = arr[i].id;
                    countJobs++;
                    totalProfit += arr[i].profit;
                    break;
                }
            }
        }

        return {countJobs, totalProfit};
    }
};`,
  python: `# Python 3 Job Sequencing (Greedy)
class Job:
    def __init__(self, id, dead, profit):
        self.id = id
        self.dead = dead
        self.profit = profit

class Solution:
    def JobScheduling(self, arr: list[Job], n: int) -> tuple[int, int]:
        # Sort jobs by profit descending
        arr.sort(key=lambda x: x.profit, reverse=True)

        max_dead = max(j.dead for j in arr)
        slots = [-1] * (max_dead + 1)

        count = 0
        profit = 0

        for j in arr:
            for d in range(j.dead, 0, -1):
                if slots[d] == -1:
                    slots[d] = j.id
                    count += 1
                    profit += j.profit
                    break

        return count, profit`,
  java: `// Java Job Sequencing (Greedy)
import java.util.Arrays;

class Job {
    int id, profit, deadline;
    Job(int x, int y, int z){ this.id = x; this.deadline = y; this.profit = z; }
}

class Solution {
    int[] JobScheduling(Job arr[], int n) {
        Arrays.sort(arr, (a, b) -> b.profit - a.profit);

        int maxDead = 0;
        for (Job j : arr) maxDead = Math.max(maxDead, j.deadline);

        int[] slot = new int[maxDead + 1];
        Arrays.fill(slot, -1);

        int count = 0, profit = 0;

        for (Job j : arr) {
            for (int d = j.deadline; d > 0; d--) {
                if (slot[d] == -1) {
                    slot[d] = j.id;
                    count++;
                    profit += j.profit;
                    break;
                }
            }
        }

        return new int[]{count, profit};
    }
}`,
  javascript: `// JavaScript Job Sequencing (Greedy)
function jobScheduling(arr, n) {
    arr.sort((a, b) => b.profit - a.profit);

    let maxDead = Math.max(...arr.map(j => j.dead));
    const slots = new Array(maxDead + 1).fill(-1);

    let count = 0;
    let profit = 0;

    for (const j of arr) {
        for (let d = j.dead; d > 0; d--) {
            if (slots[d] === -1) {
                slots[d] = j.id;
                count++;
                profit += j.profit;
                break;
            }
        }
    }

    return [count, profit];
}`
};

export const steps = [
  {
    title: '1. Jobs Sorted by Profit: [J1(100,d=2), J2(50,d=1), J3(40,d=2), J4(20,d=1)]',
    phase: 'INITIAL',
    codeLine: 19,
    slots: { 1: null, 2: null },
    currentJob: 'J1',
    profit: 0,
    jobsScheduled: 0,
    variables: { maxDeadline: 2, totalJobs: 4, sortedProfits: '[100, 50, 40, 20]' },
    explain: 'Greedy heuristic: prioritize the most profitable job. Place it at the latest possible free slot before its deadline so earlier slots stay free for other jobs.',
    intuition: 'Sort by profit descending; fill slots from deadline backwards.'
  },
  {
    title: '2. Schedule J1 (Profit 100, Dead 2): Placed at Slot 2',
    phase: 'SCHEDULED',
    codeLine: 34,
    slots: { 1: null, 2: 'J1 ($100)' },
    currentJob: 'J1',
    profit: 100,
    jobsScheduled: 1,
    variables: { job: 'J1', profit: 100, assignedSlot: 2 },
    explain: 'Slot 2 is free. J1 is scheduled at Day 2. Profit = 100.',
    intuition: 'Use latest allowable day (Day 2).'
  },
  {
    title: '3. Schedule J2 (Profit 50, Dead 1): Placed at Slot 1',
    phase: 'SCHEDULED',
    codeLine: 34,
    slots: { 1: 'J2 ($50)', 2: 'J1 ($100)' },
    currentJob: 'J2',
    profit: 150,
    jobsScheduled: 2,
    variables: { job: 'J2', profit: 50, assignedSlot: 1, totalProfit: 150 },
    explain: 'Slot 1 is free. J2 is scheduled at Day 1. Total profit = 150.',
    intuition: 'Slot 1 was successfully preserved for J2!'
  },
  {
    title: '4. Examine J3 (Profit 40, Dead 2): Slots 2 and 1 already full -> Skipped',
    phase: 'SKIPPED',
    codeLine: 32,
    slots: { 1: 'J2 ($50)', 2: 'J1 ($100)' },
    currentJob: 'J3',
    profit: 150,
    jobsScheduled: 2,
    variables: { job: 'J3', deadline: 2, status: 'No free slot before deadline' },
    explain: 'J3 deadline is 2. Both Slot 2 and Slot 1 are filled by more lucrative jobs. J3 cannot be executed.',
    intuition: 'Greedy selection ensured slots were given to higher profit jobs.'
  },
  {
    title: '5. Completed: 2 Jobs Scheduled, Maximum Profit = 150',
    phase: 'COMPLETED',
    codeLine: 41,
    slots: { 1: 'J2 ($50)', 2: 'J1 ($100)' },
    currentJob: 'None',
    profit: 150,
    jobsScheduled: 2,
    variables: { optimalJobsCount: 2, maxProfit: 150 },
    explain: 'Optimal schedule: Day 1 (Job 2), Day 2 (Job 1). Total profit: 150.',
    intuition: 'Backward slot search guarantees optimal job arrangement.'
  }
];

export default function JobSequencingProblemVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Active Job: {step.currentJob}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Scheduled Jobs: {step.jobsScheduled}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Total Profit = ${step.profit}
        </span>
      </div>

      {/* Calendar Slots */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-5 flex flex-col gap-4">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider text-center">Execution Schedule Slots</span>

        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map((slotNum) => {
            const occupant = step.slots[slotNum];
            let borderClass = 'border-[#272b3c] bg-[#161824] text-slate-500';
            if (occupant) {
              borderClass = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/30 shadow-lg';
            }

            return (
              <div key={slotNum} className={`h-24 rounded-xl border flex flex-col items-center justify-center font-mono transition-all ${borderClass}`}>
                <span className="text-xs text-[#8a8ea3]">Slot / Day {slotNum}</span>
                <span className="text-sm font-bold mt-1">{occupant || 'Empty Slot'}</span>
                <span className="text-[10px] text-slate-400">{occupant ? 'Occupied' : 'Available'}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Jobs Pool */}
      <div className="w-full grid grid-cols-4 gap-2 font-mono text-xs">
        {[
          { id: 'J1', dead: 2, profit: 100 },
          { id: 'J2', dead: 1, profit: 50 },
          { id: 'J3', dead: 2, profit: 40 },
          { id: 'J4', dead: 1, profit: 20 }
        ].map((job) => (
          <div key={job.id} className="p-2 rounded-lg border border-[#272b3c] bg-[#12131b] flex flex-col items-center gap-0.5">
            <span className="font-bold text-amber-300">{job.id}</span>
            <span className="text-[10px] text-emerald-400">${job.profit}</span>
            <span className="text-[9px] text-slate-400">Dead: {job.dead}</span>
          </div>
        ))}
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

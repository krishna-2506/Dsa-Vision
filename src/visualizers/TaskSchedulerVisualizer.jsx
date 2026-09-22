import React from 'react';

export const meta = {
  title: 'Task Scheduler',
  category: 'Heaps / Greedy / Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) (at most 26 uppercase letters)',
  description: 'Calculates the minimum intervals required to execute all CPU tasks given a cooldown period n between identical tasks, using frequency chunking and idle slot calculation.'
};

export const solutions = {
  cpp: `// C++ Task Scheduler (Greedy Math / Max-Heap)
// Time: O(N) | Space: O(1)
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        vector<int> freq(26, 0);
        int maxFreq = 0;

        for (char t : tasks) {
            freq[t - 'A']++;
            maxFreq = max(maxFreq, freq[t - 'A']);
        }

        // Count how many tasks share the maximum frequency
        int maxCount = 0;
        for (int f : freq) {
            if (f == maxFreq) {
                maxCount++;
            }
        }

        // Formula: (maxFreq - 1) chunks of size (n + 1) + maxCount
        int emptySlots = (maxFreq - 1) * (n + 1) + maxCount;

        // Total time is bounded below by total number of tasks
        return max((int)tasks.size(), emptySlots);
    }
};`,
  python: `# Python 3 Task Scheduler
from collections import Counter

class Solution:
    def leastInterval(self, tasks: list[str], n: int) -> int:
        counts = Counter(tasks)
        max_freq = max(counts.values())
        max_count = sum(1 for f in counts.values() if f == max_freq)

        empty_slots = (max_freq - 1) * (n + 1) + max_count
        return max(len(tasks), empty_slots)`,
  java: `// Java Task Scheduler
import java.util.Arrays;

class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] freq = new int[26];
        int maxFreq = 0;

        for (char t : tasks) {
            freq[t - 'A']++;
            maxFreq = Math.max(maxFreq, freq[t - 'A']);
        }

        int maxCount = 0;
        for (int f : freq) {
            if (f == maxFreq) maxCount++;
        }

        int emptySlots = (maxFreq - 1) * (n + 1) + maxCount;
        return Math.max(tasks.length, emptySlots);
    }
}`,
  javascript: `// JavaScript Task Scheduler
var leastInterval = function(tasks, n) {
    const freq = {};
    let maxFreq = 0;

    for (const t of tasks) {
        freq[t] = (freq[t] || 0) + 1;
        maxFreq = Math.max(maxFreq, freq[t]);
    }

    let maxCount = 0;
    for (const k in freq) {
        if (freq[k] === maxFreq) maxCount++;
    }

    const emptySlots = (maxFreq - 1) * (n + 1) + maxCount;
    return Math.max(tasks.length, emptySlots);
};`
};

export const steps = [
  {
    title: '1. Tasks: ["A","A","A","B","B","B"], Cooldown n = 2',
    phase: 'INITIAL',
    codeLine: 12,
    tasks: ['A', 'A', 'A', 'B', 'B', 'B'],
    cooldown: 2,
    timeline: [],
    maxFreq: 3,
    maxCount: 2,
    variables: { tasks: '3x A, 3x B', n: 2, maxFreq: 3 },
    explain: 'Task A and B both have max frequency 3. Cooldown n = 2 means 2 intervals must elapse between two consecutive runs of task A.',
    intuition: 'The task with maximum frequency dictates the chunk structure of the schedule.'
  },
  {
    title: '2. Frame Chunk Structure: (maxFreq - 1) = 2 chunks of length (n + 1) = 3',
    phase: 'CHUNKING',
    codeLine: 26,
    tasks: ['A', 'A', 'A', 'B', 'B', 'B'],
    cooldown: 2,
    timeline: ['A', null, null, 'A', null, null, 'A'],
    maxFreq: 3,
    maxCount: 2,
    variables: { chunks: 2, chunkSize: 3, skeleton: 'A _ _ | A _ _ | A' },
    explain: 'Each chunk has size n + 1 = 3: [A, _, _]. There are 2 full chunks followed by the final A.',
    intuition: 'Cooldown gaps provide slots for other tasks.'
  },
  {
    title: '3. Fill Chunk Slots with Task B (Freq 3)',
    phase: 'FILL_TASKS',
    codeLine: 26,
    tasks: ['A', 'A', 'A', 'B', 'B', 'B'],
    cooldown: 2,
    timeline: ['A', 'B', null, 'A', 'B', null, 'A', 'B'],
    maxFreq: 3,
    maxCount: 2,
    variables: { filled: 'A B _ | A B _ | A B', remainingIdle: 2 },
    explain: 'Placing task B in each chunk fills slot 1 in chunk 0 and chunk 1, plus appends to the final group.',
    intuition: 'Tasks with max frequency fill the final tail position.'
  },
  {
    title: '4. Idle Slots: 2 slots remain empty between A/B runs -> IDLE intervals',
    phase: 'INSERT_IDLE',
    codeLine: 29,
    tasks: ['A', 'A', 'A', 'B', 'B', 'B'],
    cooldown: 2,
    timeline: ['A', 'B', 'IDLE', 'A', 'B', 'IDLE', 'A', 'B'],
    maxFreq: 3,
    maxCount: 2,
    variables: { idleSlots: 2, totalIntervals: 8 },
    explain: 'Since no other tasks are available to occupy the gaps, the CPU must idle for 2 time units.',
    intuition: 'Formula: (3 - 1) * (2 + 1) + 2 = 2 * 3 + 2 = 8 intervals.'
  },
  {
    title: '5. Completed: Total Minimum Intervals = 8',
    phase: 'COMPLETED',
    codeLine: 29,
    tasks: ['A', 'A', 'A', 'B', 'B', 'B'],
    cooldown: 2,
    timeline: ['A', 'B', 'IDLE', 'A', 'B', 'IDLE', 'A', 'B'],
    maxFreq: 3,
    maxCount: 2,
    variables: { totalTime: 8, schedule: 'A -> B -> IDLE -> A -> B -> IDLE -> A -> B' },
    explain: 'Least intervals required to complete all tasks is 8.',
    intuition: 'Greedy chunking formula guarantees minimal idle time.'
  }
];

export default function TaskSchedulerVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Cooldown n: {step.cooldown} slots
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Max Frequency: {step.maxFreq} (Count: {step.maxCount})
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Total Intervals = {step.timeline.length || step.tasks.length}
        </span>
      </div>

      {/* CPU Execution Timeline */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-6 flex flex-col items-center gap-4">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider">CPU Execution Schedule Slots</span>

        <div className="flex items-center justify-center gap-2 overflow-x-auto w-full py-2">
          {step.timeline.map((slot, idx) => {
            const isIdle = slot === 'IDLE';
            const isTaskA = slot === 'A';
            const isTaskB = slot === 'B';

            let borderClass = 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-faint)]';
            if (isIdle) {
              borderClass = 'border-rose-500/40 bg-rose-500/15 text-rose-400 font-semibold italic';
            } else if (isTaskA) {
              borderClass = 'border-amber-500 bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/40 shadow-sm';
            } else if (isTaskB) {
              borderClass = 'border-blue-500 bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/40 shadow-sm';
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1 min-w-[50px]">
                <div className={`w-12 h-14 rounded-xl border flex flex-col items-center justify-center font-mono font-bold text-xs transition-all ${borderClass}`}>
                  <span>{isIdle ? '💤' : '⚙️'}</span>
                  <span className="mt-0.5">{slot || '—'}</span>
                </div>
                <span className="text-[9px] font-mono text-[var(--chalk-faint)]">t={idx}</span>
              </div>
            );
          })}
          {step.timeline.length === 0 && (
            <span className="text-xs font-mono text-[var(--chalk-faint)] italic">Initializing scheduling chunks...</span>
          )}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 text-xs font-mono text-center text-[var(--chalk-dim)]">
        {step.explain}
      </div>
    </div>
  );
}

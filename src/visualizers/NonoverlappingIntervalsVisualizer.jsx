import React from 'react';

export const meta = {
  title: 'Non-overlapping Intervals (Erase Overlaps)',
  category: 'Greedy Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(1) auxiliary',
  description: 'Calculates the minimum number of intervals you need to remove to make the rest non-overlapping by greedily sorting by end points.'
};

export const solutions = {
  cpp: `// C++ Non-overlapping Intervals (Greedy)
// Time: O(N log N) | Space: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        if (intervals.empty()) return 0;

        // Sort intervals by finish time ascending
        sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });

        int removals = 0;
        int lastEnd = intervals[0][1];

        for (int i = 1; i < intervals.size(); i++) {
            // Overlap detected if current interval starts before last interval finishes
            if (intervals[i][0] < lastEnd) {
                removals++; // Greedily drop this interval
            } else {
                lastEnd = intervals[i][1]; // Accept interval, update end point
            }
        }

        return removals;
    }
};`,
  python: `# Python 3 Non-overlapping Intervals (Greedy)
class Solution:
    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:
        if not intervals:
            return 0

        # Sort by end time
        intervals.sort(key=lambda x: x[1])

        removals = 0
        last_end = intervals[0][1]

        for i in range(1, len(intervals)):
            if intervals[i][0] < last_end:
                removals += 1
            else:
                last_end = intervals[i][1]

        return removals`,
  java: `// Java Non-overlapping Intervals (Greedy)
import java.util.Arrays;
import java.util.Comparator;

class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length == 0) return 0;

        Arrays.sort(intervals, Comparator.comparingInt(a -> a[1]));

        int removals = 0;
        int lastEnd = intervals[0][1];

        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < lastEnd) {
                removals++;
            } else {
                lastEnd = intervals[i][1];
            }
        }

        return removals;
    }
}`,
  javascript: `// JavaScript Non-overlapping Intervals (Greedy)
var eraseOverlapIntervals = function(intervals) {
    if (intervals.length === 0) return 0;

    intervals.sort((a, b) => a[1] - b[1]);

    let removals = 0;
    let lastEnd = intervals[0][1];

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < lastEnd) {
            removals++;
        } else {
            lastEnd = intervals[i][1];
        }
    }

    return removals;
};`
};

export const steps = [
  {
    title: '1. Intervals: [[1, 2], [2, 3], [3, 4], [1, 3]], Sort by End Time',
    phase: 'INITIAL',
    codeLine: 16,
    intervals: [
      { id: 'A', start: 1, end: 2, status: 'kept' },
      { id: 'B', start: 2, end: 3, status: 'pending' },
      { id: 'C', start: 1, end: 3, status: 'pending' },
      { id: 'D', start: 3, end: 4, status: 'pending' }
    ],
    currentIndex: 0,
    lastEnd: 2,
    removals: 0,
    variables: { sortedIntervals: '[[1,2], [2,3], [1,3], [3,4]]', removals: 0 },
    explain: 'Sort by end time ascending so that we keep intervals that finish earliest, preserving maximal room for remaining intervals.',
    intuition: 'Minimizing removals is equivalent to maximizing non-overlapping intervals picked.'
  },
  {
    title: '2. Examine [2, 3]: start 2 >= lastEnd 2 -> Non-overlapping, Keep!',
    phase: 'KEEP',
    codeLine: 26,
    intervals: [
      { id: 'A', start: 1, end: 2, status: 'kept' },
      { id: 'B', start: 2, end: 3, status: 'kept' },
      { id: 'C', start: 1, end: 3, status: 'pending' },
      { id: 'D', start: 3, end: 4, status: 'pending' }
    ],
    currentIndex: 1,
    lastEnd: 3,
    removals: 0,
    variables: { interval: '[2, 3]', start: 2, lastEnd: 3, removals: 0 },
    explain: 'Interval [2, 3] touches the previous end at 2 without overlapping. Accept it and update lastEnd to 3.',
    intuition: 'Touch at endpoint is allowed (not overlapping).'
  },
  {
    title: '3. Examine [1, 3]: start 1 < lastEnd 3 -> Overlap! Erase it',
    phase: 'REMOVE',
    codeLine: 24,
    intervals: [
      { id: 'A', start: 1, end: 2, status: 'kept' },
      { id: 'B', start: 2, end: 3, status: 'kept' },
      { id: 'C', start: 1, end: 3, status: 'removed' },
      { id: 'D', start: 3, end: 4, status: 'pending' }
    ],
    currentIndex: 2,
    lastEnd: 3,
    removals: 1,
    variables: { interval: '[1, 3]', start: 1, lastEnd: 3, removals: 1 },
    explain: 'Interval [1, 3] starts at 1, which conflicts with earlier accepted intervals ending at 3. Discard it. removals = 1.',
    intuition: 'Erase the conflicting interval.'
  },
  {
    title: '4. Examine [3, 4]: start 3 >= lastEnd 3 -> Non-overlapping, Keep!',
    phase: 'KEEP',
    codeLine: 26,
    intervals: [
      { id: 'A', start: 1, end: 2, status: 'kept' },
      { id: 'B', start: 2, end: 3, status: 'kept' },
      { id: 'C', start: 1, end: 3, status: 'removed' },
      { id: 'D', start: 3, end: 4, status: 'kept' }
    ],
    currentIndex: 3,
    lastEnd: 4,
    removals: 1,
    variables: { interval: '[3, 4]', start: 3, lastEnd: 4, removals: 1 },
    explain: 'Interval [3, 4] starts at 3 >= 3. Accepted! lastEnd becomes 4.',
    intuition: 'Final interval fits perfectly.'
  },
  {
    title: '5. Completed: Total Removals = 1',
    phase: 'COMPLETED',
    codeLine: 30,
    intervals: [
      { id: 'A', start: 1, end: 2, status: 'kept' },
      { id: 'B', start: 2, end: 3, status: 'kept' },
      { id: 'C', start: 1, end: 3, status: 'removed' },
      { id: 'D', start: 3, end: 4, status: 'kept' }
    ],
    currentIndex: 3,
    lastEnd: 4,
    removals: 1,
    variables: { minRemovals: 1, maxNonOverlapping: 3 },
    explain: 'By removing only 1 interval ([1, 3]), the remaining 3 intervals [[1,2], [2,3], [3,4]] are mutually non-overlapping.',
    intuition: 'Greedy end-time sorting provides optimal result.'
  }
];

export default function NonoverlappingIntervalsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Active Endpoint: {step.lastEnd}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 font-bold">
          Removals Count = {step.removals}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold">
          Kept Count = {step.intervals.filter(i => i.status === 'kept').length}
        </span>
      </div>

      {/* Interval Chart */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-mono text-[#8a8ea3] border-b border-[#272b3c] pb-2">
          <span>Intervals Timeline (Range [0...5])</span>
          <div className="flex items-center gap-4 text-[10px]">
            <span className="text-emerald-400">● Kept</span>
            <span className="text-rose-400">● Removed</span>
            <span className="text-slate-500">● Pending</span>
          </div>
        </div>

        {/* Timeline Axis 0 to 5 */}
        <div className="relative w-full h-6 border-b border-[#272b3c] flex justify-between text-[10px] font-mono text-[#5b6076] px-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>{i}</span>
          ))}
        </div>

        {/* Interval Bars */}
        <div className="flex flex-col gap-2 pt-2">
          {step.intervals.map((inv) => {
            const leftPercent = (inv.start / 5) * 100;
            const widthPercent = ((inv.end - inv.start) / 5) * 100;

            let barColor = 'bg-slate-700/40 border-slate-600 text-slate-400';
            if (inv.status === 'kept') {
              barColor = 'bg-emerald-500/25 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/40 shadow-sm';
            } else if (inv.status === 'removed') {
              barColor = 'bg-rose-500/20 border-rose-500/50 text-rose-300 line-through opacity-60';
            }

            return (
              <div key={inv.id} className="relative w-full h-8 flex items-center">
                <div 
                  className={`absolute h-7 rounded-lg border flex items-center justify-between px-2 text-xs font-mono font-bold transition-all ${barColor}`}
                  style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                >
                  <span className="text-[10px]">Interval {inv.id}</span>
                  <span className="text-[9px] opacity-80">[{inv.start}, {inv.end}]</span>
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

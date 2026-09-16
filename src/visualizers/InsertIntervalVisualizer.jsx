import React from 'react';

export const meta = {
  title: 'Insert Interval',
  category: 'Greedy Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Inserts a new interval into a sorted list of non-overlapping intervals and merges overlapping ranges in a single linear O(N) pass.'
};

export const solutions = {
  cpp: `// C++ Insert Interval
// Time: O(N) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> result;
        int i = 0, n = intervals.size();

        // 1. Add all intervals ending before newInterval starts
        while (i < n && intervals[i][1] < newInterval[0]) {
            result.push_back(intervals[i]);
            i++;
        }

        // 2. Merge overlapping intervals
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.push_back(newInterval);

        // 3. Add all remaining intervals
        while (i < n) {
            result.push_back(intervals[i]);
            i++;
        }

        return result;
    }
};`,
  python: `# Python 3 Insert Interval
# Time: O(N) | Space: O(N)
class Solution:
    def insert(self, intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
        result = []
        i = 0
        n = len(intervals)

        # 1. Left non-overlapping intervals
        while i < n and intervals[i][1] < newInterval[0]:
            result.append(intervals[i])
            i += 1

        # 2. Merge overlapping intervals
        while i < n and intervals[i][0] <= newInterval[1]:
            newInterval[0] = min(newInterval[0], intervals[i][0])
            newInterval[1] = max(newInterval[1], intervals[i][1])
            i += 1
        result.append(newInterval)

        # 3. Right non-overlapping intervals
        while i < n:
            result.append(intervals[i])
            i += 1

        return result`,
  java: `// Java Insert Interval
// Time: O(N) | Space: O(N)
import java.util.ArrayList;
import java.util.List;

class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int i = 0, n = intervals.length;

        while (i < n && intervals[i][1] < newInterval[0]) {
            result.add(intervals[i]);
            i++;
        }

        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.add(newInterval);

        while (i < n) {
            result.add(intervals[i]);
            i++;
        }

        return result.toArray(new int[result.size()][]);
    }
}`,
  javascript: `// JavaScript Insert Interval
// Time: O(N) | Space: O(N)
var insert = function(intervals, newInterval) {
    const result = [];
    let i = 0, n = intervals.length;

    while (i < n && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }

    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);

    while (i < n) {
        result.push(intervals[i]);
        i++;
    }

    return result;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], new = [4, 8]',
    phase: 'INIT',
    codeLine: 12,
    intervals: [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]],
    newInterval: [4, 8],
    result: [],
    variables: { totalIntervals: 5, newInterval: '[4, 8]' },
    explain: 'Original intervals are sorted and non-overlapping. We need to insert [4, 8] and merge any overlapping segments.',
    intuition: 'A three-phase linear scan solves this without re-sorting the entire array.'
  },
  {
    title: '2. Phase 1: Collect Left Non-overlapping ([1, 2])',
    phase: 'LEFT_INTERVALS',
    codeLine: 16,
    intervals: [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]],
    newInterval: [4, 8],
    result: [[1, 2]],
    variables: { 'Interval [1, 2]': 'ends at 2 < 4 -> completely to the left' },
    explain: '[1, 2] ends before 4, so it cannot overlap with [4, 8] and is added directly.',
    intuition: 'All intervals ending before newInterval.start remain unchanged.'
  },
  {
    title: '3. Phase 2: Merge Overlapping ([3, 5], [6, 7], [8, 10] into [3, 10])',
    phase: 'MERGE_OVERLAPPING',
    codeLine: 23,
    intervals: [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]],
    newInterval: [3, 10],
    result: [[1, 2], [3, 10]],
    variables: { 'Merged overlapping': '[3, 5], [6, 7], [8, 10]', unifiedInterval: '[3, 10]' },
    explain: '[3, 5] starts before 8 -> merges to [3, 8]. [6, 7] inside -> [3, 8]. [8, 10] overlaps at 8 -> expands to [3, 10]. Merged interval added to result.',
    intuition: 'Min start (3) and max end (10) unify all intersecting intervals.'
  },
  {
    title: '4. Phase 3 & Result: Append Remaining ([12, 16]) -> [[1, 2], [3, 10], [12, 16]]',
    phase: 'COMPLETED',
    codeLine: 29,
    intervals: [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]],
    newInterval: [3, 10],
    result: [[1, 2], [3, 10], [12, 16]],
    variables: { finalResult: '[[1, 2], [3, 10], [12, 16]]', complexity: 'O(N) Time' },
    explain: 'Remaining interval [12, 16] starts after 10 and is appended. Output is cleanly sorted and non-overlapping.',
    intuition: 'Linear O(N) scan completely avoids O(N log N) sorting.'
  }
];

export default function InsertIntervalVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Inserting: [{step.newInterval[0]}, {step.newInterval[1]}]
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Merged Intervals: {step.result.length}
        </span>
      </div>

      {/* Intervals Visualizer Card */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Interval Alignment &amp; Merging
        </span>

        {/* Input Intervals */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 py-2 font-mono text-xs">
          {step.intervals.map((iv, idx) => (
            <div
              key={idx}
              className="px-3 py-2 rounded-xl bg-[#161824] border border-[#3b4261] text-amber-300 font-bold"
            >
              [{iv[0]}, {iv[1]}]
            </div>
          ))}
        </div>

        {/* Result Output */}
        {step.result.length > 0 && (
          <div className="w-full border-t border-[#272b3c] pt-4 flex flex-col items-center gap-2">
            <span className="text-[11px] font-mono text-cyan-300">
              Current Result Intervals:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-emerald-300 font-bold">
              {step.result.map((r, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40"
                >
                  [{r[0]}, {r[1]}]
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

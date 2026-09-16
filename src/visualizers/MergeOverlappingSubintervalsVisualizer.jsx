import React from 'react';

export const meta = {
  title: 'Merge Overlapping Subintervals',
  category: 'Arrays & Intervals',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(N)',
  description: 'Merges all overlapping intervals into non-overlapping spans after sorting by start times in O(N log N) time.'
};

export const solutions = {
  cpp: `// C++ Optimal Sorting + Linear Scan Interval Merging
// Time Complexity: O(N log N) | Space Complexity: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.empty()) return {};

        // Step 1: Sort by start time
        sort(intervals.begin(), intervals.end());

        vector<vector<int>> merged;

        for (const auto& interval : intervals) {
            // If merged is empty or current doesn't overlap with last
            if (merged.empty() || merged.back()[1] < interval[0]) {
                merged.push_back(interval);
            } else {
                // Overlap exists: extend end boundary of last interval
                merged.back()[1] = max(merged.back()[1], interval[1]);
            }
        }

        return merged;
    }
};`,
  python: `# Python 3 Optimal Interval Merging
class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        intervals.sort(key=lambda x: x[0])
        merged = []

        for interval in intervals:
            if not merged or merged[-1][1] < interval[0]:
                merged.append(interval)
            else:
                merged[-1][1] = max(merged[-1][1], interval[1])

        return merged`,
  java: `// Java Optimal Interval Merging
import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> merged = new ArrayList<>();

        for (int[] interval : intervals) {
            if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {
                merged.add(interval);
            } else {
                merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], interval[1]);
            }
        }

        return merged.toArray(new int[merged.size()][]);
    }
}`,
  javascript: `// JavaScript Optimal Interval Merging
var merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [];

    for (const interval of intervals) {
        if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {
            merged.push(interval);
        } else {
            merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], interval[1]);
        }
    }

    return merged;
};`
};

export const steps = [
  {
    title: '1. Sort Intervals by Start Time: [[1, 3], [2, 6], [8, 10], [15, 18]]',
    phase: 'SORTING',
    codeLine: 14,
    intervals: [[1, 3], [2, 6], [8, 10], [15, 18]],
    currentIdx: null,
    merged: [],
    variables: { totalIntervals: 4, sorted: '[[1, 3], [2, 6], [8, 10], [15, 18]]' },
    explain: 'Sort intervals primarily by their starting coordinates. This ensures overlapping intervals must be adjacent.',
    intuition: 'Sorted start times guarantee that once an interval starts strictly after the current end, no future interval can overlap with it.'
  },
  {
    title: '2. Process [1, 3]: Merged list is empty -> Add [1, 3]',
    phase: 'ADD_FIRST',
    codeLine: 20,
    intervals: [[1, 3], [2, 6], [8, 10], [15, 18]],
    currentIdx: 0,
    merged: [[1, 3]],
    variables: { current: '[1, 3]', 'merged.empty()': true, action: 'Push [1, 3]' },
    explain: 'First interval [1, 3] pushed into merged list as the initial reference interval.',
    intuition: 'Anchor established.'
  },
  {
    title: '3. Process [2, 6]: 2 <= 3 -> OVERLAP! Merge into [1, max(3, 6) = 6]',
    phase: 'MERGE_OVERLAP',
    codeLine: 23,
    intervals: [[1, 3], [2, 6], [8, 10], [15, 18]],
    currentIdx: 1,
    merged: [[1, 6]],
    variables: { current: '[2, 6]', 'lastEnd': 3, 'overlap': '2 <= 3', newSpan: '[1, 6]' },
    explain: 'Start time 2 is less than or equal to current end time 3. They overlap! Extend the upper bound to max(3, 6) = 6.',
    intuition: '[1, 3] and [2, 6] fuse seamlessly into [1, 6].'
  },
  {
    title: '4. Process [8, 10]: 8 > 6 -> Disjoint (No Overlap) -> Push [8, 10]',
    phase: 'DISJOINT',
    codeLine: 20,
    intervals: [[1, 3], [2, 6], [8, 10], [15, 18]],
    currentIdx: 2,
    merged: [[1, 6], [8, 10]],
    variables: { current: '[8, 10]', 'lastEnd': 6, 'overlap': '8 > 6 (False)', action: 'Push [8, 10]' },
    explain: 'Interval [8, 10] starts at 8, which is strictly greater than 6. [1, 6] is closed. Append [8, 10].',
    intuition: 'Gap detected between 6 and 8. New interval begins.'
  },
  {
    title: '5. Process [15, 18]: 15 > 10 -> Disjoint -> Push [15, 18]',
    phase: 'COMPLETED',
    codeLine: 20,
    intervals: [[1, 3], [2, 6], [8, 10], [15, 18]],
    currentIdx: 3,
    merged: [[1, 6], [8, 10], [15, 18]],
    variables: { result: '[[1, 6], [8, 10], [15, 18]]', count: 3, timeComplexity: 'O(N log N)' },
    explain: 'Interval [15, 18] starts at 15 > 10. Append [15, 18]. All intervals evaluated!',
    intuition: 'Result: 3 consolidated non-overlapping intervals.'
  }
];

export default function MergeOverlappingSubintervalsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Input Intervals */}
      <div className="w-full flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-[#8a8ea3]">Sorted Input Intervals:</span>
        <div className="flex items-center gap-3">
          {step.intervals.map((iv, idx) => {
            const isCurrent = step.currentIdx === idx;
            return (
              <div
                key={idx}
                className={`px-3 py-2 rounded-xl border font-mono text-sm font-bold transition-all duration-300 ${
                  isCurrent ? 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105 shadow-md shadow-amber-500/20' : 'bg-[#181a24] text-white border-[#2b2e40]'
                }`}
              >
                [{iv[0]}, {iv[1]}]
              </div>
            );
          })}
        </div>
      </div>

      {/* Downward indicator */}
      <div className="text-xs font-mono text-[#555a72]">
        ↓ Consolidating Overlapping Spans ↓
      </div>

      {/* Merged Intervals Output */}
      <div className="w-full flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-emerald-400 font-bold">Consolidated Result:</span>
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl">
          {step.merged.length === 0 ? (
            <span className="text-xs font-mono text-[#555a72]">Empty</span>
          ) : (
            step.merged.map((iv, idx) => (
              <div
                key={idx}
                className="px-3.5 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-sm font-bold shadow-sm"
              >
                [{iv[0]}, {iv[1]}]
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

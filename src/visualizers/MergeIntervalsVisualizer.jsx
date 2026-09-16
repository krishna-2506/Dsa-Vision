import React from 'react';

export const meta = {
  title: 'Merge Overlapping Intervals',
  category: 'Greedy Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(N)',
  description: 'Merges all overlapping intervals into non-overlapping contiguous ranges. Sorting by start time guarantees that any intervals that can merge will appear consecutively.'
};

export const solutions = {
  cpp: `// C++ Merge Overlapping Intervals
// Time: O(N log N) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.empty()) return {};

        sort(intervals.begin(), intervals.end());
        vector<vector<int>> merged;

        for (const auto& interval : intervals) {
            if (merged.empty() || merged.back()[1] < interval[0]) {
                merged.push_back(interval);
            } else {
                merged.back()[1] = max(merged.back()[1], interval[1]);
            }
        }

        return merged;
    }
};`,
  python: `# Python 3 Merge Overlapping Intervals
# Time: O(N log N) | Space: O(N)
class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        if not intervals:
            return []

        intervals.sort(key=lambda x: x[0])
        merged = []

        for interval in intervals:
            if not merged or merged[-1][1] < interval[0]:
                merged.append(interval)
            else:
                merged[-1][1] = max(merged[-1][1], interval[1])

        return merged`,
  java: `// Java Merge Overlapping Intervals
// Time: O(N log N) | Space: O(N)
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length == 0) return new int[0][];

        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> merged = new ArrayList<>();

        for (int[] interval : intervals) {
            if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {
                merged.add(interval);
            } else {
                int[] last = merged.get(merged.size() - 1);
                last[1] = Math.max(last[1], interval[1]);
            }
        }

        return merged.toArray(new int[merged.size()][]);
    }
}`,
  javascript: `// JavaScript Merge Overlapping Intervals
// Time: O(N log N) | Space: O(N)
var merge = function(intervals) {
    if (!intervals.length) return [];

    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const curr = intervals[i];
        const last = merged[merged.length - 1];

        if (curr[0] <= last[1]) {
            last[1] = Math.max(last[1], curr[1]);
        } else {
            merged.push(curr);
        }
    }

    return merged;
};`
};

export const steps = [
  {
    title: '1. Input: [[1, 3], [8, 10], [2, 6], [15, 18]], Sort by Start Time',
    phase: 'SORT',
    codeLine: 12,
    original: [[1, 3], [8, 10], [2, 6], [15, 18]],
    sorted: [[1, 3], [2, 6], [8, 10], [15, 18]],
    merged: [],
    variables: { sorted: '[[1, 3], [2, 6], [8, 10], [15, 18]]' },
    explain: 'Sorting intervals by their starting boundary ensures overlapping intervals become adjacent in the list.',
    intuition: 'Sorting reduces an arbitrary interval graph problem into a single linear pass.'
  },
  {
    title: '2. Process [1, 3] and [2, 6]: Overlap -> Merge to [1, 6]',
    phase: 'MERGE_1',
    codeLine: 20,
    sorted: [[1, 3], [2, 6], [8, 10], [15, 18]],
    merged: [[1, 6]],
    variables: { 'Interval [2, 6]': 'start 2 <= 3 (last end)', 'Merged span': '[1, max(3, 6)] = [1, 6]' },
    explain: 'Interval [2, 6] begins before [1, 3] ends (2 <= 3). They merge into [1, max(3, 6)] = [1, 6].',
    intuition: 'Overlapping condition is simply curr.start <= last.end.'
  },
  {
    title: '3. Process [8, 10]: Disjoint (8 > 6) -> Add [8, 10]',
    phase: 'ADD_DISJOINT',
    codeLine: 18,
    sorted: [[1, 3], [2, 6], [8, 10], [15, 18]],
    merged: [[1, 6], [8, 10]],
    variables: { 'Interval [8, 10]': 'start 8 > 6 (no overlap)', action: 'Add [8, 10] to merged' },
    explain: 'Interval [8, 10] starts strictly after 6, so no overlap occurs. It is pushed as a separate new interval.',
    intuition: 'When an interval starts beyond the current end, the previous merged interval is closed.'
  },
  {
    title: '4. Process [15, 18]: Final Merged Intervals -> [[1, 6], [8, 10], [15, 18]]',
    phase: 'COMPLETED',
    codeLine: 24,
    sorted: [[1, 3], [2, 6], [8, 10], [15, 18]],
    merged: [[1, 6], [8, 10], [15, 18]],
    variables: { result: '[[1, 6], [8, 10], [15, 18]]', count: 3 },
    explain: 'Final interval [15, 18] is also disjoint and appended. Final merged output contains 3 consolidated non-overlapping intervals.',
    intuition: 'O(N log N) sorting followed by O(N) linear merging achieves optimal efficiency.'
  }
];

export default function MergeIntervalsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Phase: {step.phase}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Merged Count: {step.merged.length}
        </span>
      </div>

      {/* Intervals Container */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Sorted Intervals &amp; Merged Blocks
        </span>

        {/* Input Sorted Intervals */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 py-2 font-mono text-xs">
          {step.sorted.map((iv, idx) => (
            <div
              key={idx}
              className="px-3 py-2 rounded-xl bg-[#161824] border border-[#3b4261] text-amber-300 font-bold"
            >
              [{iv[0]}, {iv[1]}]
            </div>
          ))}
        </div>

        {/* Merged Results */}
        {step.merged.length > 0 && (
          <div className="w-full border-t border-[#272b3c] pt-4 flex flex-col items-center gap-2">
            <span className="text-[11px] font-mono text-cyan-300">
              Active Merged Output:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-sm text-emerald-300 font-bold">
              {step.merged.map((m, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 shadow-lg"
                >
                  [{m[0]}, {m[1]}]
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

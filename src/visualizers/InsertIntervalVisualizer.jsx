// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Insert Interval',
  category: 'Intervals & Greedy',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) for Result',
  description: 'Inserts a new interval into a sorted list of non-overlapping intervals and merges all overlapping ranges in a single linear O(N) pass.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Three-Phase Interval Insertion Invariant',
  nodes: [
    { id: 'root', label: 'Single-Pass Tri-Phase Partitioning', children: ['left-disjoint', 'overlapping-fusion', 'push-merged', 'right-disjoint', 'complexity'] },
    { id: 'left-disjoint', label: '1. Left Disjoint Phase', detail: 'While intervals[i].end < newInterval.start, there is no possible overlap; append intervals[i] directly to result.' },
    { id: 'overlapping-fusion', label: '2. Greedy Overlap Fusion', detail: 'While intervals[i].start <= newInterval.end, ranges overlap; expand newInterval = [min(newInterval.start, curr.start), max(newInterval.end, curr.end)].' },
    { id: 'push-merged', label: '3. Commit Merged Interval', detail: 'Once the overlap chain terminates, push the expanded newInterval to result.' },
    { id: 'right-disjoint', label: '4. Right Disjoint Phase', detail: 'Append all remaining intervals after the merged range directly to result.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Strictly O(N) time in a single pass with O(N) memory for the output list.' }
  ]
};

export const solutions = {
  cpp: `// C++ Insert Interval (Three-Phase Linear Algorithm)
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> result;
        int i = 0, n = intervals.size();

        // Phase 1: Add all intervals ending before newInterval starts
        while (i < n && intervals[i][1] < newInterval[0]) {
            result.push_back(intervals[i]);
            i++;
        }

        // Phase 2: Merge all overlapping intervals
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.push_back(newInterval);

        // Phase 3: Add all remaining right-side intervals
        while (i < n) {
            result.push_back(intervals[i]);
            i++;
        }

        return result;
    }
};`,
  python: `# Python 3 Insert Interval (Three-Phase Linear Algorithm)
# Time Complexity: O(N) | Space Complexity: O(N)
class Solution:
    def insert(self, intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
        result = []
        i = 0
        n = len(intervals)

        # 1. Left non-overlapping intervals
        while i < n and intervals[i][1] < newInterval[0]:
            result.append(intervals[i])
            i += 1

        # 2. Overlapping intervals
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
  java: `// Java Insert Interval (Three-Phase Linear Algorithm)
// Time Complexity: O(N) | Space Complexity: O(N)
import java.util.ArrayList;
import java.util.List;

class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int i = 0, n = intervals.length;

        // Phase 1: Left disjoint
        while (i < n && intervals[i][1] < newInterval[0]) {
            result.add(intervals[i]);
            i++;
        }

        // Phase 2: Merge overlapping
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.add(newInterval);

        // Phase 3: Right disjoint
        while (i < n) {
            result.add(intervals[i]);
            i++;
        }

        return result.toArray(new int[result.size()][]);
    }
}`,
  javascript: `// JavaScript Insert Interval (Three-Phase Linear Algorithm)
// Time Complexity: O(N) | Space Complexity: O(N)
var insert = function(intervals, newInterval) {
    const result = [];
    let i = 0;
    const n = intervals.length;

    // Phase 1: Left disjoint
    while (i < n && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }

    // Phase 2: Merge overlapping
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.push(newInterval);

    // Phase 3: Right disjoint
    while (i < n) {
        result.push(intervals[i]);
        i++;
    }

    return result;
};`
};

export const steps = [
  {
    title: '1. Problem Setup & Three-Phase Invariant',
    phase: 'INITIAL',
    track: {
      label: 'Sorted Intervals (N = 5) | Insert newInterval = [4, 8]',
      items: [
        { val: '[1, 2]' },
        { val: '[3, 5]' },
        { val: '[6, 7]' },
        { val: '[8, 10]' },
        { val: '[12, 16]' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'newInterval', value: '[4, 8]', highlight: true },
      { label: 'Total Intervals', value: 5 },
      { label: 'Phase', value: '1. Left Disjoint Scan' },
      { label: 'Time Complexity', value: 'O(N) Single Pass' }
    ],
    formula: 'Phase 1: intervals[i][1] < newInterval[0];',
    action: 'Initialize interval scanner. Partition the array into: Left Disjoint, Overlapping, and Right Disjoint.',
    explain: 'Goal: Insert [4, 8] into sorted disjoint list [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]] and merge all overlaps in O(N) time.',
    intuition: 'Because intervals are already sorted by start time, overlapping ranges form a single contiguous block.',
    variables: {
      'newInterval': '[4, 8]',
      'result': '[]',
      'i': 0
    }
  },
  {
    title: '2. Phase 1: Left Disjoint Interval [1, 2] Added Directly',
    phase: 'LEFT_DISJOINT',
    track: {
      label: 'Phase 1: [1, 2] ends at 2 < 4 (newInterval start) -> Disjoint Left',
      items: [
        { val: '[1, 2]', status: 'match', badge: 'Appended Left' },
        { val: '[3, 5]' },
        { val: '[6, 7]' },
        { val: '[8, 10]' },
        { val: '[12, 16]' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'intervals[0]', value: '[1, 2]' },
      { label: 'Condition', value: '2 < 4 (True)' },
      { label: 'Result So Far', value: '[[1, 2]]', highlight: true }
    ],
    formula: 'intervals[0][1] (2) < newInterval[0] (4) -> result.push([1, 2]); i++;',
    action: 'Interval [1, 2] completely finishes before newInterval [4, 8] starts. Append [1, 2] directly to result.',
    explain: 'No overlap possible. [1, 2] is committed immediately. Advance i to 1.',
    intuition: 'Any interval ending before newInterval starts is permanently unaffected.',
    variables: {
      'i': 1,
      'result': '[[1, 2]]',
      'newInterval': '[4, 8]'
    }
  },
  {
    title: '3. Phase 2: Overlap 1 with [3, 5] -> Expand to [3, 8]',
    phase: 'MERGING',
    track: {
      label: 'Phase 2: [3, 5] starts at 3 <= 8 (Overlap!) -> newInterval becomes [3, 8]',
      items: [
        { val: '[1, 2]', status: 'match' },
        { val: '[3, 5]', status: 'active', badge: 'Overlap 1' },
        { val: '[6, 7]' },
        { val: '[8, 10]' },
        { val: '[12, 16]' }
      ]
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'intervals[1]', value: '[3, 5]' },
      { label: 'Overlap Check', value: '3 <= 8 (Overlap!)' },
      { label: 'Fused newInterval', value: '[min(4, 3), max(8, 5)] = [3, 8]', highlight: true }
    ],
    formula: 'newInterval = [min(4, 3), max(8, 5)] = [3, 8]; i++;',
    action: 'Interval [3, 5] overlaps with [4, 8] because its start (3) is <= newInterval end (8). Fuse them!',
    explain: 'newInterval expands to [min(4, 3), max(8, 5)] = [3, 8]. Advance i to 2.',
    intuition: 'Greedy fusion absorbs overlapping bounds into newInterval.',
    variables: {
      'i': 2,
      'newInterval': '[3, 8]',
      'result': '[[1, 2]]'
    }
  },
  {
    title: '4. Phase 2: Overlap 2 with [6, 7] -> Absorb Inside [3, 8]',
    phase: 'MERGING',
    track: {
      label: 'Phase 2: [6, 7] is fully contained inside [3, 8] -> newInterval stays [3, 8]',
      items: [
        { val: '[1, 2]', status: 'match' },
        { val: '[3, 5]', status: 'active' },
        { val: '[6, 7]', status: 'active', badge: 'Overlap 2 (Contained)' },
        { val: '[8, 10]' },
        { val: '[12, 16]' }
      ]
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'intervals[2]', value: '[6, 7]' },
      { label: 'Overlap Check', value: '6 <= 8 (Overlap!)' },
      { label: 'Fused newInterval', value: '[min(3, 6), max(8, 7)] = [3, 8]', highlight: true }
    ],
    formula: 'newInterval = [min(3, 6), max(8, 7)] = [3, 8]; i++;',
    action: 'Interval [6, 7] has start 6 <= 8. It falls entirely within [3, 8]. Fuse and advance i to 3.',
    explain: 'Boundaries remain [3, 8].',
    intuition: 'Sub-intervals within the expanded range are subsumed without changing boundaries.',
    variables: {
      'i': 3,
      'newInterval': '[3, 8]',
      'result': '[[1, 2]]'
    }
  },
  {
    title: '5. Phase 2: Overlap 3 with [8, 10] -> Expand to [3, 10]',
    phase: 'MERGING',
    track: {
      label: 'Phase 2: [8, 10] touches at 8 <= 8 -> newInterval expands to [3, 10]',
      items: [
        { val: '[1, 2]', status: 'match' },
        { val: '[3, 5]', status: 'active' },
        { val: '[6, 7]', status: 'active' },
        { val: '[8, 10]', status: 'active', badge: 'Overlap 3' },
        { val: '[12, 16]' }
      ]
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'intervals[3]', value: '[8, 10]' },
      { label: 'Overlap Check', value: '8 <= 8 (Overlap!)' },
      { label: 'Fused newInterval', value: '[min(3, 8), max(8, 10)] = [3, 10]', highlight: true }
    ],
    formula: 'newInterval = [min(3, 8), max(8, 10)] = [3, 10]; i++;',
    action: 'Interval [8, 10] overlaps at boundary 8 <= 8. Expand newInterval to [3, 10]. Advance i to 4.',
    explain: 'All 3 overlapping intervals [3, 5], [6, 7], and [8, 10] have now been unified into [3, 10].',
    intuition: 'Boundary contact (8 == 8) constitutes a valid contiguous overlap.',
    variables: {
      'i': 4,
      'newInterval': '[3, 10]',
      'result': '[[1, 2]]'
    }
  },
  {
    title: '6. Commit Merged Interval [3, 10] to Result',
    phase: 'COMMIT_MERGE',
    track: {
      label: 'Overlap chain ended! intervals[4] = [12, 16] starts at 12 > 10. Commit [3, 10]',
      items: [
        { val: '[1, 2]', status: 'match' },
        { val: '[3, 10]', status: 'match', badge: '👑 Merged [3, 10]' },
        { val: '[12, 16]' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'intervals[4]', value: '[12, 16]' },
      { label: 'Start 12 > End 10', value: 'Overlaps Finished!' },
      { label: 'Committed Interval', value: '[3, 10]', highlight: true },
      { label: 'Result So Far', value: '[[1, 2], [3, 10]]' }
    ],
    formula: 'result.push_back(newInterval); // Merged range committed',
    action: 'Next interval [12, 16] starts at 12 > 10 (no overlap). Commit merged interval [3, 10] to result.',
    explain: 'Result now contains: [[1, 2], [3, 10]].',
    intuition: 'The merged interval is finalized once the first strictly disjoint future interval appears.',
    variables: {
      'i': 4,
      'result': '[[1, 2], [3, 10]]'
    }
  },
  {
    title: '7. Phase 3: Right Disjoint Interval [12, 16] Appended',
    phase: 'RIGHT_DISJOINT',
    track: {
      label: 'Phase 3: Append all remaining intervals -> [12, 16] added directly',
      items: [
        { val: '[1, 2]', status: 'match' },
        { val: '[3, 10]', status: 'match' },
        { val: '[12, 16]', status: 'match', badge: 'Appended Right' }
      ]
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'intervals[4]', value: '[12, 16]' },
      { label: 'Phase', value: '3. Right Disjoint' },
      { label: 'Final Output Size', value: '3 intervals', highlight: true }
    ],
    formula: 'while (i < n) result.push_back(intervals[i++]);',
    action: 'Append all remaining right-disjoint intervals directly. [12, 16] is added.',
    explain: 'All intervals processed. Entire array traversed in a single linear pass.',
    intuition: 'All intervals after the merged region are guaranteed to be disjoint from each other and from the merged interval.',
    variables: {
      'i': 5,
      'result': '[[1, 2], [3, 10], [12, 16]]'
    }
  },
  {
    title: '8. Result: Merged Non-Overlapping Intervals',
    phase: 'COMPLETED',
    track: {
      label: 'Optimal Result: [[1, 2], [3, 10], [12, 16]]',
      items: [
        { val: '[1, 2]', status: 'match', badge: '1' },
        { val: '[3, 10]', status: 'match', badge: '2 (Merged)' },
        { val: '[12, 16]', status: 'match', badge: '3' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Input Intervals', value: 5 },
      { label: 'Merged Output', value: '[[1, 2], [3, 10], [12, 16]]', highlight: true },
      { label: 'Time Complexity', value: 'O(N) Strict' },
      { label: 'Space Complexity', value: 'O(N) Result' }
    ],
    formula: 'return result = [[1, 2], [3, 10], [12, 16]];',
    action: 'Return the final merged interval list.',
    explain: 'Original 5 intervals merged with [4, 8] to form 3 clean disjoint intervals in strictly O(N) time.',
    intuition: 'Three-phase linear scan solves interval insertion without sorting or extra comparisons.',
    variables: {
      'result': '[[1, 2], [3, 10], [12, 16]]',
      'timeComplexity': 'O(N)',
      'spaceComplexity': 'O(N)'
    }
  }
];

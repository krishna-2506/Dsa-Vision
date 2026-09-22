// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Non-overlapping Intervals (Erase Overlaps)',
  category: 'Intervals & Greedy',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Calculates the minimum number of intervals to remove to make the rest non-overlapping by greedily sorting by finish times.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Greedy Interval Scheduling Invariant',
  nodes: [
    { id: 'root', label: 'Finish-Time Greedy Elimination', children: ['sort-by-end', 'maximize-non-overlap', 'overlap-drop-rule', 'update-anchor', 'complexity'] },
    { id: 'sort-by-end', label: '1. Sort by Finish Time', detail: 'Sort intervals ascending by end time intervals[i][1]; an interval that finishes earlier leaves maximum room for future intervals.' },
    { id: 'maximize-non-overlap', label: '2. Maximize Non-Overlapping Set', detail: 'Minimizing removals is mathematically equivalent to maximizing the count of mutually disjoint compatible intervals.' },
    { id: 'overlap-drop-rule', label: '3. Overlap Detection & Removal', detail: 'If intervals[i][0] < lastEnd, current interval collides with the previously accepted interval; greedily erase current (removals++).' },
    { id: 'update-anchor', label: '4. Update Finish Anchor', detail: 'If intervals[i][0] >= lastEnd, intervals are disjoint; accept it and advance anchor: lastEnd = intervals[i][1].' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'O(N log N) sorting + O(N) linear sweep with strictly O(1) auxiliary space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Non-overlapping Intervals (Greedy Finish Time Sorting)
// Time Complexity: O(N log N) | Space Complexity: O(1)
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

        for (int i = 1; i < (int)intervals.size(); i++) {
            // Overlap detected: starts before last accepted interval finishes
            if (intervals[i][0] < lastEnd) {
                removals++; // Greedily drop this interval
            } else {
                lastEnd = intervals[i][1]; // Accept interval, update end point
            }
        }

        return removals;
    }
};`,
  python: `# Python 3 Non-overlapping Intervals (Greedy Finish Time Sorting)
# Time Complexity: O(N log N) | Space Complexity: O(1)
class Solution:
    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:
        if not intervals:
            return 0

        # Sort by finish time
        intervals.sort(key=lambda x: x[1])

        removals = 0
        last_end = intervals[0][1]

        for i in range(1, len(intervals)):
            if intervals[i][0] < last_end:
                removals += 1
            else:
                last_end = intervals[i][1]

        return removals`,
  java: `// Java Non-overlapping Intervals (Greedy Finish Time Sorting)
// Time Complexity: O(N log N) | Space Complexity: O(1)
import java.util.Arrays;

class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length == 0) return 0;

        // Sort by end time
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));

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
  javascript: `// JavaScript Non-overlapping Intervals (Greedy Finish Time Sorting)
// Time Complexity: O(N log N) | Space Complexity: O(1)
var eraseOverlapIntervals = function(intervals) {
    if (!intervals.length) return 0;

    // Sort by finish time
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
    title: '1. Problem Setup & Greedy Scheduling Invariant',
    phase: 'INITIAL',
    track: {
      label: 'Input intervals = [[1, 2], [2, 3], [3, 4], [1, 3]] (Unsorted)',
      items: [
        { val: '[1, 2]' },
        { val: '[2, 3]' },
        { val: '[3, 4]' },
        { val: '[1, 3]' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Total Intervals', value: 4 },
      { label: 'Erase Minimum', value: 'Equivalent to maximizing kept intervals' },
      { label: 'Greedy Strategy', value: 'Sort by end time ascending', highlight: true },
      { label: 'Time Complexity', value: 'O(N log N)' }
    ],
    formula: 'sort(intervals by end time ascending);',
    action: 'State the interval scheduling theorem: selecting intervals that end earliest leaves the most capacity for future non-overlapping intervals.',
    explain: 'Goal: Find the minimum number of intervals to remove to eliminate all overlaps.',
    intuition: 'Sorting by finish time ensures each accepted interval frees up the timeline as soon as possible.',
    variables: {
      'intervals': '[[1, 2], [2, 3], [3, 4], [1, 3]]',
      'removals': 0
    }
  },
  {
    title: '2. Sort by End Time: [[1, 2], [2, 3], [1, 3], [3, 4]]',
    phase: 'SORTING',
    track: {
      label: 'Sorted by End Time: [[1, 2], [2, 3], [1, 3], [3, 4]]',
      items: [
        { val: '[1, 2]', status: 'active', badge: 'End = 2' },
        { val: '[2, 3]', status: 'active', badge: 'End = 3' },
        { val: '[1, 3]', status: 'active', badge: 'End = 3' },
        { val: '[3, 4]', status: 'active', badge: 'End = 4' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Sorted Order', value: 'End times: 2, 3, 3, 4' },
      { label: 'Initial Anchor', value: 'lastEnd = intervals[0][1] = 2', highlight: true },
      { label: 'First Accepted', value: '[1, 2]' },
      { label: 'Removals', value: 0 }
    ],
    formula: 'lastEnd = intervals[0][1] = 2; // Always accept earliest finishing interval',
    action: 'Accept the first interval [1, 2]. Set finish anchor lastEnd = 2.',
    explain: 'Interval [1, 2] finishes earliest (at time 2). It is guaranteed to be in an optimal subset of mutually compatible intervals.',
    intuition: 'No interval finishes before time 2, so [1, 2] is the safest first choice.',
    variables: {
      'i': 0,
      'lastEnd': 2,
      'removals': 0,
      'accepted': '[[1, 2]]'
    }
  },
  {
    title: '3. Inspect [2, 3]: Disjoint Boundary (2 >= 2) -> Accept!',
    phase: 'ACCEPT',
    track: {
      label: 'intervals[1] = [2, 3]: start (2) >= lastEnd (2) -> Non-overlapping! Accept.',
      items: [
        { val: '[1, 2]', status: 'match', badge: 'Kept' },
        { val: '[2, 3]', status: 'match', badge: 'Kept (New End = 3)' },
        { val: '[1, 3]' },
        { val: '[3, 4]' }
      ]
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'Current Interval', value: '[2, 3]' },
      { label: 'Start vs lastEnd', value: '2 >= 2 (Disjoint boundary)' },
      { label: 'Decision', value: 'Accept [2, 3]' },
      { label: 'New lastEnd', value: 3, highlight: true }
    ],
    formula: 'if (intervals[1][0] >= lastEnd) lastEnd = intervals[1][1] = 3;',
    action: 'Interval [2, 3] starts at 2, which meets the boundary 2 of [1, 2]. They touch at a single point without overlapping. Accept!',
    explain: 'Update lastEnd to 3. Removals remains 0.',
    intuition: 'Touching boundaries [1, 2] and [2, 3] do not count as overlapping intervals.',
    variables: {
      'i': 1,
      'lastEnd': 3,
      'removals': 0,
      'accepted': '[[1, 2], [2, 3]]'
    }
  },
  {
    title: '4. Inspect [1, 3]: Collision Detected (1 < 3) -> Drop!',
    phase: 'DROP_OVERLAP',
    track: {
      label: 'intervals[2] = [1, 3]: start (1) < lastEnd (3) -> COLLISION! Erase [1, 3].',
      items: [
        { val: '[1, 2]', status: 'match', badge: 'Kept' },
        { val: '[2, 3]', status: 'match', badge: 'Kept' },
        { val: '[1, 3]', status: 'mismatch', badge: '❌ Erased (Overlap)' },
        { val: '[3, 4]' }
      ]
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Current Interval', value: '[1, 3]' },
      { label: 'Collision Check', value: '1 < 3 (Overlaps previous!)', highlight: true },
      { label: 'Action', value: 'removals++ (Drop [1, 3])' },
      { label: 'Removals Count', value: 1, highlight: true }
    ],
    formula: 'if (intervals[2][0] < lastEnd) { removals++; } // 1 < 3',
    action: 'Interval [1, 3] starts at 1, before the accepted anchor finishes at 3. Overlap detected! Increment removals to 1.',
    explain: 'Because intervals are sorted by finish time, [1, 3] ends at or after [2, 3]. Dropping [1, 3] retains the tighter finish boundary lastEnd = 3.',
    intuition: 'Greedy choice: eliminate the collision without extending the finish timeline.',
    variables: {
      'i': 2,
      'lastEnd': 3,
      'removals': 1,
      'erased': '[[1, 3]]'
    }
  },
  {
    title: '5. Inspect [3, 4]: Disjoint Boundary (3 >= 3) -> Accept!',
    phase: 'ACCEPT',
    track: {
      label: 'intervals[3] = [3, 4]: start (3) >= lastEnd (3) -> Disjoint! Accept.',
      items: [
        { val: '[1, 2]', status: 'match', badge: 'Kept' },
        { val: '[2, 3]', status: 'match', badge: 'Kept' },
        { val: '[1, 3]', status: 'mismatch', badge: 'Erased' },
        { val: '[3, 4]', status: 'match', badge: 'Kept (New End = 4)' }
      ]
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'Current Interval', value: '[3, 4]' },
      { label: 'Start vs lastEnd', value: '3 >= 3 (Disjoint)' },
      { label: 'Decision', value: 'Accept [3, 4]' },
      { label: 'Final lastEnd', value: 4, highlight: true }
    ],
    formula: 'if (intervals[3][0] >= lastEnd) lastEnd = intervals[3][1] = 4;',
    action: 'Interval [3, 4] starts at 3 >= lastEnd(3). No overlap! Accept it and update lastEnd to 4.',
    explain: 'All intervals have been scanned. Total removals needed = 1.',
    intuition: 'The maximum mutually compatible non-overlapping set has size 3: [[1, 2], [2, 3], [3, 4]].',
    variables: {
      'i': 3,
      'lastEnd': 4,
      'removals': 1,
      'accepted': '[[1, 2], [2, 3], [3, 4]]'
    }
  },
  {
    title: '6. Verification: Compatible vs Erased Set Synthesis',
    phase: 'SYNTHESIS',
    track: {
      label: '3 Kept Non-overlapping Intervals + 1 Erased Interval',
      items: [
        { val: '[1, 2]', status: 'match', badge: 'Kept #1' },
        { val: '[2, 3]', status: 'match', badge: 'Kept #2' },
        { val: '[1, 3]', status: 'mismatch', badge: '❌ Drop #1' },
        { val: '[3, 4]', status: 'match', badge: 'Kept #3' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Total Input', value: 4 },
      { label: 'Max Disjoint Set', value: '3 intervals' },
      { label: 'Minimum Removals', value: '4 - 3 = 1', highlight: true }
    ],
    formula: 'minRemovals = totalIntervals - maxNonOverlapping = 4 - 3 = 1;',
    action: 'Verify that removing 1 interval completely resolves all overlaps.',
    explain: 'Removing only [1, 3] leaves [[1, 2], [2, 3], [3, 4]], which are strictly non-overlapping.',
    intuition: 'No smaller number of removals can resolve the overlap between [1, 2] and [1, 3].',
    variables: {
      'minRemovals': 1,
      'keptCount': 3
    }
  },
  {
    title: '7. Complexity Analysis: O(N log N) Sorting Dominance',
    phase: 'COMPLEXITY',
    track: {
      label: 'O(N log N) sorting + O(N) single-pass greedy scan',
      items: [
        { val: '[1, 2]' },
        { val: '[2, 3]' },
        { val: '[1, 3]' },
        { val: '[3, 4]' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Sorting Time', value: 'O(N log N)' },
      { label: 'Linear Scan', value: 'O(N)' },
      { label: 'Overall Time', value: 'O(N log N)', highlight: true },
      { label: 'Auxiliary Space', value: 'O(1) In-Place' }
    ],
    formula: 'Time: O(N log N); Space: O(1) auxiliary;',
    action: 'Confirm optimal performance characteristics.',
    explain: 'Greedy end-time sorting is provably optimal for interval scheduling.',
    intuition: 'Guarantees global optimum with simple local greedy decisions.',
    variables: {
      'timeComplexity': 'O(N log N)',
      'spaceComplexity': 'O(1)'
    }
  },
  {
    title: '8. Result: Minimum Overlapping Intervals to Remove = 1',
    phase: 'COMPLETED',
    track: {
      label: 'Optimal Solution: Remove 1 Interval ([1, 3])',
      items: [
        { val: '[1, 2]', status: 'match', badge: 'Kept' },
        { val: '[2, 3]', status: 'match', badge: 'Kept' },
        { val: '[1, 3]', status: 'mismatch', badge: '👑 1 Removal' },
        { val: '[3, 4]', status: 'match', badge: 'Kept' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Input Intervals', value: 4 },
      { label: 'Minimum Erased', value: 1, highlight: true },
      { label: 'Remaining Intervals', value: 3 },
      { label: 'Status', value: 'Optimal' }
    ],
    formula: 'return removals = 1;',
    action: 'Return the minimum number of interval removals.',
    explain: 'Only 1 interval ([1, 3]) needs to be erased to render the remaining intervals pairwise non-overlapping.',
    intuition: 'Greedy interval selection achieves maximum non-overlapping density.',
    variables: {
      'result': 1,
      'timeComplexity': 'O(N log N)',
      'spaceComplexity': 'O(1)'
    }
  }
];

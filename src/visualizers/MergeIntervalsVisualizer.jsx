// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Merge Overlapping Intervals',
  category: 'Arrays & Intervals',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(N)',
  description: 'Merges all overlapping intervals into non-overlapping contiguous spans by sorting intervals by start times and performing a single greedy linear pass.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Interval Merging Strategy',
  nodes: [
    { id: 'root', label: 'Greedy Start-Time Sorting', children: ['sort-start', 'overlap-check', 'extend-boundary', 'disjoint-push', 'complexity'] },
    { id: 'sort-start', label: '1. Sort by Start Coordinates', detail: 'Sorting by start time guarantees that any intervals capable of overlapping must appear consecutively.' },
    { id: 'overlap-check', label: '2. Overlap Condition (curr.start <= last.end)', detail: 'If current interval starts before or at the end of the previous interval, they intersect.' },
    { id: 'extend-boundary', label: '3. Greedy Expansion (last.end = max)', detail: 'Merge overlapping intervals by extending the end boundary to max(last.end, curr.end).' },
    { id: 'disjoint-push', label: '4. Disjoint Range Commit', detail: 'If curr.start > last.end, no overlap is possible; commit the interval to the merged list.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'O(N log N) sorting dominant time with O(N) auxiliary space to store output intervals.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Sorting + Single Pass Interval Merging
// Time Complexity: O(N log N) | Space Complexity: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.empty()) return {};

        // 1. Sort intervals by start time
        sort(intervals.begin(), intervals.end());

        vector<vector<int>> merged;

        for (const auto& interval : intervals) {
            // If merged is empty or no overlap with last interval
            if (merged.empty() || merged.back()[1] < interval[0]) {
                merged.push_back(interval);
            } else {
                // Overlap: expand end boundary
                merged.back()[1] = max(merged.back()[1], interval[1]);
            }
        }

        return merged;
    }
};`,
  python: `# Python 3 Optimal Interval Merging
# Time Complexity: O(N log N) | Space Complexity: O(N)
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
  java: `// Java Optimal Interval Merging
// Time Complexity: O(N log N) | Space Complexity: O(N)
import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length == 0) return new int[0][];

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
// Time Complexity: O(N log N) | Space Complexity: O(N)
var merge = function(intervals) {
    if (!intervals.length) return [];

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
    title: '1. Setup: Unsorted Intervals [[1, 3], [8, 10], [2, 6], [15, 18]]',
    phase: 'SETUP',
    track: {
      label: 'Input Intervals (Unsorted)',
      items: [
        { val: '[1, 3]' },
        { val: '[8, 10]' },
        { val: '[2, 6]' },
        { val: '[15, 18]' }
      ],
      pointers: [
        { index: 0, label: 'Unsorted' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Total Intervals', value: 4 },
      { label: 'Sort Key', value: 'Start Coordinate' },
      { label: 'Strategy', value: 'Greedy Sweep' }
    ],
    formula: 'sort(intervals.begin(), intervals.end());',
    action: 'Begin with unsorted intervals. Sorting is mandatory to linearize potential overlaps.',
    explain: 'Without sorting, any interval could potentially overlap with any other interval, requiring an expensive O(N^2) comparison network.',
    intuition: 'Sorting by start coordinate ensures overlapping intervals are guaranteed to appear consecutively.',
    variables: { unsorted: '[[1, 3], [8, 10], [2, 6], [15, 18]]', count: 4 }
  },
  {
    title: '2. Sorting Phase: Sorted by Start Time -> [[1, 3], [2, 6], [8, 10], [15, 18]]',
    phase: 'SORTING',
    track: {
      label: 'Sorted Intervals',
      items: [
        { val: '[1, 3]', status: 'match', badge: 'Start = 1' },
        { val: '[2, 6]', badge: 'Start = 2' },
        { val: '[8, 10]', badge: 'Start = 8' },
        { val: '[15, 18]', badge: 'Start = 15' }
      ],
      pointers: [
        { index: 0, label: 'curr = [1, 3]' }
      ]
    },
    auxiliaryTrack: {
      label: 'Merged Intervals List',
      items: ['(empty)']
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Sorting Cost', value: 'O(N log N)', highlight: true },
      { label: 'Order', value: 'Monotonic Start Times' },
      { label: 'Merged Count', value: 0 }
    ],
    formula: 'intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]',
    action: 'Intervals sorted in ascending order of start values: 1 < 2 < 8 < 15.',
    explain: 'Now that the intervals are sorted, we can initialize our merged list and evaluate them sequentially in one pass.',
    intuition: 'Chronological progression established.',
    variables: { sorted: true, i: 0, merged: [] }
  },
  {
    title: '3. Process [1, 3]: Initial Range Committed to Merged List',
    phase: 'COMMIT_RANGE',
    track: {
      label: 'Sorted Intervals',
      items: [
        { val: '[1, 3]', status: 'match', badge: 'Active' },
        { val: '[2, 6]' },
        { val: '[8, 10]' },
        { val: '[15, 18]' }
      ],
      pointers: [
        { index: 0, label: 'Committed [1, 3]' }
      ]
    },
    auxiliaryTrack: {
      label: 'Merged Intervals List',
      items: [
        { val: '[1, 3]', status: 'match' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Active Range', value: '[1, 3]', highlight: true },
      { label: 'Last End', value: 3 },
      { label: 'Merged Size', value: 1 }
    ],
    formula: 'merged.push_back([1, 3]);',
    action: 'merged is empty: insert [1, 3] as our first active interval.',
    explain: '[1, 3] sets the baseline span. Future intervals will be tested against its end boundary (3).',
    intuition: 'First interval anchors the starting cluster.',
    variables: { i: 0, current: '[1, 3]', lastMerged: '[1, 3]', lastEnd: 3 }
  },
  {
    title: '4. Process [2, 6]: Start 2 <= 3 -> Overlap Detected! Expand to [1, 6]',
    phase: 'MERGE_OVERLAP',
    track: {
      label: 'Sorted Intervals',
      items: [
        { val: '[1, 3]', status: 'match' },
        { val: '[2, 6]', status: 'match', badge: 'Overlap!' },
        { val: '[8, 10]' },
        { val: '[15, 18]' }
      ],
      pointers: [
        { index: 1, label: 'curr = [2, 6]' }
      ]
    },
    auxiliaryTrack: {
      label: 'Merged Intervals List',
      items: [
        { val: '[1, 6]', status: 'match', badge: 'Expanded' }
      ]
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'Overlap Check', value: '2 <= 3 (True)', highlight: true },
      { label: 'New End', value: 'max(3, 6) = 6', highlight: true },
      { label: 'Merged Span', value: '[1, 6]' }
    ],
    formula: 'last[1] = max(last[1], curr[1]) ==> max(3, 6) = 6',
    action: '2 <= 3: [2, 6] overlaps with [1, 3]. Extend the end boundary from 3 to max(3, 6) = 6.',
    explain: 'Because interval [2, 6] begins before [1, 3] ends, the two intervals merge into a single continuous range [1, 6].',
    intuition: 'Two overlapping blocks fuse into one larger block.',
    variables: { i: 1, curr: '[2, 6]', overlap: true, oldEnd: 3, newEnd: 6, mergedResult: '[1, 6]' }
  },
  {
    title: '5. Process [8, 10]: Start 8 > 6 -> Disjoint! Append [8, 10]',
    phase: 'COMMIT_RANGE',
    track: {
      label: 'Sorted Intervals',
      items: [
        { val: '[1, 3]', status: 'match' },
        { val: '[2, 6]', status: 'match' },
        { val: '[8, 10]', status: 'match', badge: 'Disjoint' },
        { val: '[15, 18]' }
      ],
      pointers: [
        { index: 2, label: 'curr = [8, 10]' }
      ]
    },
    auxiliaryTrack: {
      label: 'Merged Intervals List',
      items: [
        { val: '[1, 6]', status: 'match' },
        { val: '[8, 10]', status: 'match', badge: 'New Block' }
      ]
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Overlap Check', value: '8 <= 6 (False)' },
      { label: 'Gap Detected', value: 'Range [6 .. 8] is empty' },
      { label: 'Merged Size', value: 2, highlight: true }
    ],
    formula: 'curr[0] > last[1] (8 > 6) ==> merged.push_back([8, 10]);',
    action: '8 > 6: Interval [8, 10] does not overlap with [1, 6]. Append it as a new interval.',
    explain: 'There is a gap between 6 and 8 where no activity occurs. Interval [1, 6] is permanently closed and [8, 10] starts the next cluster.',
    intuition: 'A gap between intervals solidifies the previous merged group.',
    variables: { i: 2, curr: '[8, 10]', overlap: false, lastEnd: 10, totalMerged: 2 }
  },
  {
    title: '6. Process [15, 18]: Start 15 > 10 -> Disjoint! Append [15, 18]',
    phase: 'COMMIT_RANGE',
    track: {
      label: 'Sorted Intervals',
      items: [
        { val: '[1, 3]', status: 'match' },
        { val: '[2, 6]', status: 'match' },
        { val: '[8, 10]', status: 'match' },
        { val: '[15, 18]', status: 'match', badge: 'Disjoint' }
      ],
      pointers: [
        { index: 3, label: 'curr = [15, 18]' }
      ]
    },
    auxiliaryTrack: {
      label: 'Merged Intervals List',
      items: [
        { val: '[1, 6]', status: 'match' },
        { val: '[8, 10]', status: 'match' },
        { val: '[15, 18]', status: 'match', badge: 'New Block' }
      ]
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'Overlap Check', value: '15 <= 10 (False)' },
      { label: 'Gap Detected', value: 'Range [10 .. 15]' },
      { label: 'Merged Size', value: 3, highlight: true }
    ],
    formula: 'curr[0] > last[1] (15 > 10) ==> merged.push_back([15, 18]);',
    action: '15 > 10: Interval [15, 18] is disjoint from [8, 10]. Append to merged list.',
    explain: 'Final interval is added. All 4 input intervals have been processed.',
    intuition: 'Linear scan complete.',
    variables: { i: 3, curr: '[15, 18]', overlap: false, lastEnd: 18, totalMerged: 3 }
  },
  {
    title: '7. Edge Case Analysis: Fully Contained & Touching Intervals',
    phase: 'ANALYSIS',
    track: {
      label: 'Boundary Handling Invariant',
      items: [
        { val: 'Contained: [1, 5] + [2, 4] -> [1, max(5, 4)=5]', status: 'match' },
        { val: 'Touching: [1, 4] + [4, 7] -> [1, 7]', status: 'match' },
        { val: 'Start-sort prevents interleaving bugs', status: 'match' }
      ],
      pointers: [
        { index: 0, label: 'Robust Rules' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Touching Rule', value: 'start <= end includes equality' },
      { label: 'Contained Rule', value: 'max(end1, end2) preserves outer' },
      { label: 'Correctness', value: '100% Proven' }
    ],
    formula: 'last[1] = max(last[1], curr[1]);',
    action: 'Verify boundary safety for subset and touching interval geometries.',
    explain: 'Using max(last[1], curr[1]) ensures that an interval fully contained inside another does not accidentally shrink the merged boundary. Testing curr.start <= last.end handles touching intervals seamlessly.',
    intuition: 'The max() operator preserves the true rightmost reach.',
    variables: { boundarySafety: 'max() handles containment', touchingAllowed: true }
  },
  {
    title: '8. Complete: Return Merged Intervals [[1, 6], [8, 10], [15, 18]]',
    phase: 'COMPLETED',
    track: {
      label: 'Final Merged Intervals',
      items: [
        { val: '[1, 6]', status: 'match', badge: 'Merged (1+2)' },
        { val: '[8, 10]', status: 'match', badge: 'Standalone' },
        { val: '[15, 18]', status: 'match', badge: 'Standalone' }
      ],
      pointers: [
        { index: 0, label: '[1, 6]' },
        { index: 1, label: '[8, 10]' },
        { index: 2, label: '[15, 18]' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Result Intervals', value: 3, highlight: true },
      { label: 'Original Count', value: 4 },
      { label: 'Time Complexity', value: 'O(N log N)' },
      { label: 'Space Complexity', value: 'O(N)' }
    ],
    formula: 'return [[1, 6], [8, 10], [15, 18]];',
    action: 'Algorithm concludes: Returns the list of 3 non-overlapping intervals.',
    explain: 'Sorted interval scanning achieved optimal O(N log N) time and merged the 4 initial intervals down to 3 disjoint spans.',
    intuition: 'Greedy chronological sweep guarantees maximal consolidation.',
    variables: { result: '[[1, 6], [8, 10], [15, 18]]', count: 3, time: 'O(N log N)', space: 'O(N)' }
  }
];

// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'N Meetings in One Room',
  category: 'Greedy Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(N) Auxiliary',
  description: 'Finds the maximum number of non-overlapping meetings that can be scheduled in a single conference room by greedily prioritizing meetings with the earliest finish times.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Earliest Finish Time Greedy Selection Invariant',
  nodes: [
    { id: 'root', label: 'Activity Selection Greedy Strategy', children: ['finish-time-sort', 'room-availability-anchor', 'disjoint-scheduling-rule', 'conflict-rejection', 'complexity'] },
    { id: 'finish-time-sort', label: '1. Ascending Finish Time Sort', detail: 'Sort all candidate meetings in ascending order of their ending times to always liberate the room as early as possible.' },
    { id: 'room-availability-anchor', label: '2. Earliest Meeting Selection', detail: 'Always pick the first meeting in the sorted list, locking room availability until its finish time.' },
    { id: 'disjoint-scheduling-rule', label: '3. Disjoint Feasibility Check', detail: 'For each subsequent meeting, if start > lastEndTime, the meeting fits with zero overlap; select it and advance lastEndTime = end.' },
    { id: 'conflict-rejection', label: '4. Temporal Conflict Discard', detail: 'If start <= lastEndTime, the meeting clashes with currently held reservations; discard it immediately.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'O(N log N) sorting dominates the O(N) single scan pass, using O(N) auxiliary space for meeting tuples.' }
  ]
};

export const solutions = {
  cpp: `// C++ N Meetings in One Room (Greedy Activity Selection)
// Time Complexity: O(N log N) | Space Complexity: O(N)
#include <vector>
#include <algorithm>
using namespace std;

struct Meeting {
    int start;
    int end;
    int id;
};

class Solution {
public:
    int maxMeetings(int start[], int end[], int n) {
        vector<Meeting> meetings(n);
        for (int i = 0; i < n; i++) {
            meetings[i] = {start[i], end[i], i + 1};
        }

        // Sort primarily by end time ascending
        sort(meetings.begin(), meetings.end(), [](const Meeting& a, const Meeting& b) {
            return a.end < b.end;
        });

        int count = 1;
        int lastEndTime = meetings[0].end;

        for (int i = 1; i < n; i++) {
            if (meetings[i].start > lastEndTime) {
                count++;
                lastEndTime = meetings[i].end;
            }
        }

        return count;
    }
};`,
  python: `# Python 3 N Meetings in One Room (Greedy)
# Time Complexity: O(N log N) | Space Complexity: O(N)
class Solution:
    def maxMeetings(self, start: list[int], end: list[int], n: int) -> int:
        meetings = sorted([(end[i], start[i], i + 1) for i in range(n)])

        count = 1
        last_end = meetings[0][0]

        for i in range(1, n):
            if meetings[i][1] > last_end:
                count += 1
                last_end = meetings[i][0]

        return count`,
  java: `// Java N Meetings in One Room (Greedy)
// Time Complexity: O(N log N) | Space Complexity: O(N)
import java.util.Arrays;
import java.util.Comparator;

class Solution {
    static class Meeting {
        int start, end, id;
        Meeting(int s, int e, int id) {
            this.start = s;
            this.end = e;
            this.id = id;
        }
    }

    public int maxMeetings(int[] start, int[] end, int n) {
        Meeting[] meetings = new Meeting[n];
        for (int i = 0; i < n; i++) {
            meetings[i] = new Meeting(start[i], end[i], i + 1);
        }

        Arrays.sort(meetings, Comparator.comparingInt(m -> m.end));

        int count = 1;
        int lastEnd = meetings[0].end;

        for (int i = 1; i < n; i++) {
            if (meetings[i].start > lastEnd) {
                count++;
                lastEnd = meetings[i].end;
            }
        }

        return count;
    }
}`,
  javascript: `// JavaScript N Meetings in One Room (Greedy)
// Time Complexity: O(N log N) | Space Complexity: O(N)
var maxMeetings = function(start, end, n) {
    const meetings = [];
    for (let i = 0; i < n; i++) {
        meetings.push({ start: start[i], end: end[i], id: i + 1 });
    }

    meetings.sort((a, b) => a.end - b.end);

    let count = 1;
    let lastEnd = meetings[0].end;

    for (let i = 1; i < n; i++) {
        if (meetings[i].start > lastEnd) {
            count++;
            lastEnd = meetings[i].end;
        }
    }

    return count;
};`
};

export const steps = [
  {
    title: '1. Sort Meetings Ascending by Finish Time',
    phase: 'INITIAL',
    codeLine: 16,
    track: {
      label: 'Sorted Meeting Queue (by Finish Time)',
      items: [
        { val: 'M1 [1..2]', status: 'current' },
        { val: 'M2 [3..4]', status: 'default' },
        { val: 'M3 [0..6]', status: 'default' },
        { val: 'M4 [5..7]', status: 'default' },
        { val: 'M5 [8..9]', status: 'default' },
        { val: 'M6 [5..9]', status: 'default' }
      ],
      pointers: { first: { idx: 0, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Conference Room Timeline',
      items: [
        { val: 'Room Empty', status: 'dim' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Total Meetings', value: '6' },
      { label: 'Room State', value: 'Free at t = 0' },
      { label: 'Scheduled', value: '0' },
      { label: 'Sort Key', value: 'Earliest End Time' }
    ],
    formula: 'sort(meetings.begin(), meetings.end(), [](a, b){ return a.end < b.end; });',
    action: 'Sort all candidate meetings by end time ascending. Prepare greedy forward sweep.',
    explain: 'Greedy choice: Scheduling the meeting that finishes earliest leaves the maximal remaining room availability for future meetings.',
    intuition: 'Earliest finish time is mathematically optimal for single-resource interval scheduling.'
  },
  {
    title: '2. Select Meeting M1 [1, 2]: Room Locked Until t = 2',
    phase: 'SCHEDULE',
    codeLine: 21,
    track: {
      label: 'Sorted Meeting Queue',
      items: [
        { val: 'M1 [1..2]', status: 'match' },
        { val: 'M2 [3..4]', status: 'default' },
        { val: 'M3 [0..6]', status: 'default' },
        { val: 'M4 [5..7]', status: 'default' },
        { val: 'M5 [8..9]', status: 'default' },
        { val: 'M6 [5..9]', status: 'default' }
      ],
      pointers: { scheduled: { idx: 0, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Conference Room Timeline',
      items: [
        { val: 'M1 [1..2] Active', status: 'match' },
        { val: 'Free after t=2', status: 'dim' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Scheduled Meeting', value: 'M1 [1, 2]', highlight: true },
      { label: 'lastEndTime', value: '2' },
      { label: 'Count', value: '1' },
      { label: 'Next Search', value: 'Meetings starting > 2' }
    ],
    formula: 'count = 1; lastEndTime = meetings[0].end = 2;',
    action: 'Select M1 [1, 2]. Room is occupied until time 2. count = 1.',
    explain: 'M1 ends at t = 2, leaving the room available for any meeting starting strictly after t = 2.',
    intuition: 'The first meeting with the earliest finish time is always chosen.'
  },
  {
    title: '3. Inspect Meeting M2 [3, 4]: Start 3 > 2 -> Select M2',
    phase: 'SCHEDULE',
    codeLine: 25,
    track: {
      label: 'Sorted Meeting Queue',
      items: [
        { val: 'M1 [1..2]', status: 'visited' },
        { val: 'M2 [3..4]', status: 'match' },
        { val: 'M3 [0..6]', status: 'default' },
        { val: 'M4 [5..7]', status: 'default' },
        { val: 'M5 [8..9]', status: 'default' },
        { val: 'M6 [5..9]', status: 'default' }
      ],
      pointers: { curr: { idx: 1, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Conference Room Timeline',
      items: [
        { val: 'M1 [1..2]', status: 'visited' },
        { val: 'M2 [3..4]', status: 'match' },
        { val: 'Free after t=4', status: 'dim' }
      ]
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'Evaluating', value: 'M2 [3, 4]' },
      { label: 'Feasibility', value: '3 > 2 (Compatible)', highlight: true },
      { label: 'lastEndTime Update', value: '4' },
      { label: 'Count', value: '2', highlight: true }
    ],
    formula: 'if (meetings[1].start > lastEndTime) { count++; lastEndTime = 4; }',
    action: 'M2 starts at 3, which is > 2. No time clash. Select M2. lastEndTime becomes 4.',
    explain: 'Conference room is occupied from 1 to 2, vacant from 2 to 3, and occupied by M2 from 3 to 4.',
    intuition: 'Non-overlapping meeting added cleanly.'
  },
  {
    title: '4. Inspect Meeting M3 [0, 6]: Start 0 < 4 -> Reject Conflict',
    phase: 'CONFLICT',
    codeLine: 24,
    track: {
      label: 'Sorted Meeting Queue',
      items: [
        { val: 'M1 [1..2]', status: 'visited' },
        { val: 'M2 [3..4]', status: 'visited' },
        { val: 'M3 [0..6]', status: 'dim' },
        { val: 'M4 [5..7]', status: 'default' },
        { val: 'M5 [8..9]', status: 'default' },
        { val: 'M6 [5..9]', status: 'default' }
      ],
      pointers: { conflict: { idx: 2, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Conference Room Timeline',
      items: [
        { val: 'M1 [1..2]', status: 'visited' },
        { val: 'M2 [3..4] (Holds Room)', status: 'match' }
      ]
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Evaluating', value: 'M3 [0, 6]' },
      { label: 'Start Time', value: '0 < 4 (Clash!)', highlight: true },
      { label: 'Decision', value: 'Reject M3' },
      { label: 'lastEndTime', value: 'Unchanged (4)' }
    ],
    formula: '0 <= 4 => Conflict! Skip M3.',
    action: 'M3 started at time 0 and ends at time 6. It clashes with M2 (occupied until 4). Reject M3.',
    explain: 'A single room cannot host simultaneous meetings. M3 must be discarded.',
    intuition: 'Reject meetings that overlap with our current schedule.',
    customCard: {
      title: 'Overlap Conflict Detected',
      rows: [
        { label: 'Room Busy Until', value: 't = 4 (M2)' },
        { label: 'M3 Start Time', value: 't = 0 (Precedes M2 end)', accent: true },
        { label: 'Resolution', value: 'Discard M3 to protect M2' }
      ]
    }
  },
  {
    title: '5. Inspect Meeting M4 [5, 7]: Start 5 > 4 -> Select M4',
    phase: 'SCHEDULE',
    codeLine: 25,
    track: {
      label: 'Sorted Meeting Queue',
      items: [
        { val: 'M1 [1..2]', status: 'visited' },
        { val: 'M2 [3..4]', status: 'visited' },
        { val: 'M3 [0..6]', status: 'dim' },
        { val: 'M4 [5..7]', status: 'match' },
        { val: 'M5 [8..9]', status: 'default' },
        { val: 'M6 [5..9]', status: 'default' }
      ],
      pointers: { curr: { idx: 3, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Conference Room Timeline',
      items: [
        { val: 'M1 [1..2]', status: 'visited' },
        { val: 'M2 [3..4]', status: 'visited' },
        { val: 'M4 [5..7]', status: 'match' },
        { val: 'Free after t=7', status: 'dim' }
      ]
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'Evaluating', value: 'M4 [5, 7]' },
      { label: 'Start Time', value: '5 > 4 (Compatible)', highlight: true },
      { label: 'lastEndTime Update', value: '7' },
      { label: 'Count', value: '3', highlight: true }
    ],
    formula: 'if (5 > 4) { count++; lastEndTime = 7; }',
    action: 'M4 starts at 5, strictly after M2 finishes at 4. Schedule M4. lastEndTime = 7.',
    explain: 'Room has a 1-hour gap between 4 and 5, then hosts M4 from 5 to 7. 3 meetings scheduled.',
    intuition: 'Greedy selection continues seamlessly.'
  },
  {
    title: '6. Inspect Meeting M5 [8, 9]: Start 8 > 7 -> Select M5',
    phase: 'SCHEDULE',
    codeLine: 25,
    track: {
      label: 'Sorted Meeting Queue',
      items: [
        { val: 'M1 [1..2]', status: 'visited' },
        { val: 'M2 [3..4]', status: 'visited' },
        { val: 'M3 [0..6]', status: 'dim' },
        { val: 'M4 [5..7]', status: 'visited' },
        { val: 'M5 [8..9]', status: 'match' },
        { val: 'M6 [5..9]', status: 'default' }
      ],
      pointers: { curr: { idx: 4, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Conference Room Timeline',
      items: [
        { val: 'M1 [1..2]', status: 'visited' },
        { val: 'M2 [3..4]', status: 'visited' },
        { val: 'M4 [5..7]', status: 'visited' },
        { val: 'M5 [8..9]', status: 'match' }
      ]
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'Evaluating', value: 'M5 [8, 9]' },
      { label: 'Start Time', value: '8 > 7 (Compatible)', highlight: true },
      { label: 'lastEndTime Update', value: '9' },
      { label: 'Count', value: '4', highlight: true }
    ],
    formula: 'if (8 > 7) { count++; lastEndTime = 9; }',
    action: 'M5 starts at 8 > 7. Select M5. lastEndTime becomes 9. count = 4.',
    explain: 'Fourth meeting successfully added to schedule. Room reserved until t = 9.',
    intuition: 'Each non-conflicting meeting maximizes the total count.'
  },
  {
    title: '7. Inspect Meeting M6 [5, 9]: Start 5 < 9 -> Reject Conflict',
    phase: 'CONFLICT',
    codeLine: 24,
    track: {
      label: 'Sorted Meeting Queue',
      items: [
        { val: 'M1 [1..2]', status: 'visited' },
        { val: 'M2 [3..4]', status: 'visited' },
        { val: 'M3 [0..6]', status: 'dim' },
        { val: 'M4 [5..7]', status: 'visited' },
        { val: 'M5 [8..9]', status: 'visited' },
        { val: 'M6 [5..9]', status: 'dim' }
      ],
      pointers: { conflict: { idx: 5, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Conference Room Timeline (Final 4 Meetings)',
      items: [
        { val: 'M1 [1..2]', status: 'match' },
        { val: 'M2 [3..4]', status: 'match' },
        { val: 'M4 [5..7]', status: 'match' },
        { val: 'M5 [8..9]', status: 'match' }
      ]
    },
    activeI: 5,
    activeJ: null,
    metrics: [
      { label: 'Evaluating', value: 'M6 [5, 9]' },
      { label: 'Start Time', value: '5 < 9 (Conflict with M4 & M5)', highlight: true },
      { label: 'Decision', value: 'Reject M6' },
      { label: 'Queue Exhausted', value: 'All 6 evaluated' }
    ],
    formula: '5 <= 9 => Conflict! Reject M6.',
    action: 'M6 starts at 5, which clashes with both M4 (5-7) and M5 (8-9). Reject M6.',
    explain: 'All candidate meetings in the input list have been processed.',
    intuition: 'Greedy pass finishes in linear time after sorting.'
  },
  {
    title: '8. Complete Schedule: Maximum 4 Non-Overlapping Meetings',
    phase: 'COMPLETED',
    codeLine: 30,
    track: {
      label: 'Optimal Meeting Schedule: 4 Meetings Scheduled',
      items: [
        { val: 'M1 [1..2]', status: 'match' },
        { val: 'M2 [3..4]', status: 'match' },
        { val: 'M3 [0..6] (X)', status: 'dim' },
        { val: 'M4 [5..7]', status: 'match' },
        { val: 'M5 [8..9]', status: 'match' },
        { val: 'M6 [5..9] (X)', status: 'dim' }
      ]
    },
    auxiliaryTrack: {
      label: 'Scheduled Timeline: {M1, M2, M4, M5}',
      items: [
        { val: 'M1', status: 'match' },
        { val: 'M2', status: 'match' },
        { val: 'M4', status: 'match' },
        { val: 'M5', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Max Meetings', value: '4', highlight: true },
      { label: 'Selected Set', value: '{M1, M2, M4, M5}' },
      { label: 'Time Complexity', value: 'O(N log N)' },
      { label: 'Space Complexity', value: 'O(N)' }
    ],
    formula: 'return count; // 4',
    action: 'Return 4. The maximum number of non-overlapping meetings is 4: {M1, M2, M4, M5}.',
    explain: 'Activity selection via earliest finish time guarantees the global maximum number of non-overlapping intervals.',
    intuition: 'No other combination of compatible meetings can exceed 4.',
    customCard: {
      title: 'Activity Selection Summary',
      rows: [
        { label: 'Max Non-Overlapping Meetings', value: '4', accent: true },
        { label: 'Scheduled IDs', value: 'M1, M2, M4, M5' },
        { label: 'Complexity', value: 'O(N log N) sorting, O(N) sweep', accent: true }
      ]
    }
  }
];

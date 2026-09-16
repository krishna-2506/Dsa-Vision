import React from 'react';

export const meta = {
  title: 'N Meetings in One Room',
  category: 'Greedy Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(N)',
  description: 'Finds the maximum number of meetings that can be accommodated in a single conference room by greedily picking meetings with earliest finishing times.'
};

export const solutions = {
  cpp: `// C++ N Meetings in One Room (Greedy Activity Selection)
// Time: O(N log N) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

struct Meeting {
    int start;
    int end;
    int pos;
};

class Solution {
public:
    int maxMeetings(int start[], int end[], int n) {
        vector<Meeting> meetings(n);
        for (int i = 0; i < n; i++) {
            meetings[i] = {start[i], end[i], i + 1};
        }

        // Sort by finish time ascending
        sort(meetings.begin(), meetings.end(), [](const Meeting& a, const Meeting& b) {
            return a.end < b.end;
        });

        int count = 1;
        int lastEndTime = meetings[0].end;

        for (int i = 1; i < n; i++) {
            // If meeting starts strictly after the previous meeting ends
            if (meetings[i].start > lastEndTime) {
                count++;
                lastEndTime = meetings[i].end;
            }
        }

        return count;
    }
};`,
  python: `# Python 3 N Meetings in One Room (Greedy)
class Solution:
    def maxMeetings(self, start: list[int], end: list[int], n: int) -> int:
        # Tuple of (end, start, original_index)
        meetings = sorted([(end[i], start[i], i + 1) for i in range(n)])

        count = 1
        last_end = meetings[0][0]

        for i in range(1, n):
            e, s, pos = meetings[i]
            if s > last_end:
                count += 1
                last_end = e

        return count`,
  java: `// Java N Meetings in One Room (Greedy)
import java.util.*;

class Meeting {
    int start, end, pos;
    Meeting(int s, int e, int p) { start = s; end = e; pos = p; }
}

class Solution {
    public int maxMeetings(int start[], int end[], int n) {
        List<Meeting> list = new ArrayList<>();
        for (int i = 0; i < n; i++) list.add(new Meeting(start[i], end[i], i + 1));

        list.sort(Comparator.comparingInt(m -> m.end));

        int count = 1;
        int lastEnd = list.get(0).end;

        for (int i = 1; i < n; i++) {
            if (list.get(i).start > lastEnd) {
                count++;
                lastEnd = list.get(i).end;
            }
        }

        return count;
    }
}`,
  javascript: `// JavaScript N Meetings in One Room (Greedy)
function maxMeetings(start, end, n) {
    const meetings = [];
    for (let i = 0; i < n; i++) {
        meetings.push({ start: start[i], end: end[i], id: i + 1 });
    }

    // Sort by end time ascending
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
}`
};

export const steps = [
  {
    title: '1. Given 6 Meetings: Sort by Finish Time Ascending',
    phase: 'INITIAL',
    codeLine: 24,
    meetings: [
      { id: 1, start: 1, end: 2 },
      { id: 2, start: 0, end: 6 },
      { id: 3, start: 3, end: 4 },
      { id: 4, start: 5, end: 7 },
      { id: 5, start: 8, end: 9 },
      { id: 6, start: 5, end: 9 }
    ],
    sorted: [
      { id: 1, start: 1, end: 2 },
      { id: 3, start: 3, end: 4 },
      { id: 2, start: 0, end: 6 },
      { id: 4, start: 5, end: 7 },
      { id: 5, start: 8, end: 9 },
      { id: 6, start: 5, end: 9 }
    ],
    selectedIds: [1],
    currentExamining: 0,
    lastEnd: 2,
    variables: { lastEnd: 2, selectedMeetings: 1 },
    explain: 'Greedy insight: picking the meeting that finishes earliest leaves the room free as early as possible for future meetings.',
    intuition: 'Sort by finish time to minimize room occupancy time per meeting.'
  },
  {
    title: '2. Examine Meeting 3 [3, 4]: Start 3 > lastEnd 2 -> ACCEPTED',
    phase: 'ACCEPT',
    codeLine: 32,
    selectedIds: [1, 3],
    currentExamining: 1,
    lastEnd: 4,
    variables: { meeting: 'M3 [3-4]', start: 3, lastEnd: 4, count: 2 },
    explain: 'Meeting 3 starts at 3, which is strictly after lastEnd 2. Accommodated! New lastEnd becomes 4.',
    intuition: 'No conflict with preceding meeting.'
  },
  {
    title: '3. Examine Meeting 2 [0, 6]: Start 0 <= lastEnd 4 -> REJECTED (Conflict)',
    phase: 'REJECT',
    codeLine: 30,
    selectedIds: [1, 3],
    currentExamining: 2,
    lastEnd: 4,
    variables: { meeting: 'M2 [0-6]', start: 0, lastEnd: 4, conflict: true },
    explain: 'Meeting 2 starts at 0, which clashes with previously held meetings. It is rejected.',
    intuition: 'Room is occupied until time 4.'
  },
  {
    title: '4. Examine Meeting 4 [5, 7]: Start 5 > lastEnd 4 -> ACCEPTED',
    phase: 'ACCEPT',
    codeLine: 32,
    selectedIds: [1, 3, 4],
    currentExamining: 3,
    lastEnd: 7,
    variables: { meeting: 'M4 [5-7]', start: 5, lastEnd: 7, count: 3 },
    explain: 'Meeting 4 starts at 5 > 4. Accommodated! New lastEnd becomes 7.',
    intuition: 'Room opened up at 4, meeting 4 takes 5-7.'
  },
  {
    title: '5. Examine Meeting 5 [8, 9]: Start 8 > lastEnd 7 -> ACCEPTED (Total = 4)',
    phase: 'COMPLETED',
    codeLine: 37,
    selectedIds: [1, 3, 4, 5],
    currentExamining: 4,
    lastEnd: 9,
    variables: { maxMeetings: 4, selectedOrder: 'M1 -> M3 -> M4 -> M5' },
    explain: 'Meeting 5 starts at 8 > 7. Accommodated! All meetings checked. Maximum meetings accommodated in room = 4.',
    intuition: 'Greedy choice yields mathematically provable maximum count.'
  }
];

export default function NMeetingsInOneRoomVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  const sortedList = [
    { id: 1, start: 1, end: 2 },
    { id: 3, start: 3, end: 4 },
    { id: 2, start: 0, end: 6 },
    { id: 4, start: 5, end: 7 },
    { id: 5, start: 8, end: 9 },
    { id: 6, start: 5, end: 9 }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Room Free At Time: {step.lastEnd}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Accepted Meetings: {step.selectedIds.length}
        </span>
      </div>

      {/* Timeline Gantt Chart */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-mono text-[#8a8ea3] border-b border-[#272b3c] pb-2">
          <span>Meetings Sorted by End Time</span>
          <div className="flex items-center gap-4 text-[10px]">
            <span className="text-emerald-400">● Accepted</span>
            <span className="text-red-400">● Conflict / Rejected</span>
          </div>
        </div>

        {/* Timeline Axis (0 to 10) */}
        <div className="relative w-full h-6 border-b border-[#272b3c] flex justify-between text-[10px] font-mono text-[#5b6076] px-1">
          {Array.from({ length: 11 }).map((_, i) => (
            <span key={i}>{i}</span>
          ))}
        </div>

        {/* Meeting Bars */}
        <div className="flex flex-col gap-2 pt-2">
          {sortedList.map((m, idx) => {
            const isAccepted = step.selectedIds.includes(m.id);
            const isExamining = idx === step.currentExamining;
            const isPastRejected = idx < step.currentExamining && !isAccepted;

            // Positioning on 0-10 scale
            const leftPercent = (m.start / 10) * 100;
            const widthPercent = ((m.end - m.start) / 10) * 100;

            let barColor = 'bg-slate-700/40 border-slate-600 text-slate-400';
            if (isAccepted) {
              barColor = 'bg-emerald-500/25 border-emerald-500 text-emerald-300 shadow-md ring-1 ring-emerald-500/40';
            } else if (isPastRejected) {
              barColor = 'bg-rose-500/15 border-rose-500/40 text-rose-400 opacity-60';
            } else if (isExamining) {
              barColor = 'bg-amber-500/30 border-amber-500 text-amber-300 ring-2 ring-amber-500/40 animate-pulse';
            }

            return (
              <div key={m.id} className="relative w-full h-8 flex items-center">
                <div 
                  className={`absolute h-7 rounded-lg border flex items-center justify-between px-2 text-xs font-mono font-bold transition-all ${barColor}`}
                  style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                >
                  <span className="text-[10px]">M{m.id}</span>
                  <span className="text-[9px] opacity-80">[{m.start}-{m.end}]</span>
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

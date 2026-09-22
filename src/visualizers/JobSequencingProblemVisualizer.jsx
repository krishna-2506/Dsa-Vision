// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Job Sequencing with Deadlines',
  category: 'Greedy Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N + N * maxDeadline)',
  spaceComplexity: 'O(maxDeadline) Auxiliary',
  description: 'Maximizes total profit by scheduling jobs before their deadlines, greedily processing jobs in descending profit order and placing each in the latest available free time slot.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Greedy Latest Slot Allocation Invariant',
  nodes: [
    { id: 'root', label: 'Greedy Job Scheduling', children: ['profit-sorting', 'deadline-slots', 'latest-possible-slot', 'infeasible-rejection', 'complexity'] },
    { id: 'profit-sorting', label: '1. Profit Descending Priority', detail: 'Sort all candidate jobs primarily by profit in descending order to prioritize high-value tasks.' },
    { id: 'deadline-slots', label: '2. Unit Time Slot Table', detail: 'Allocate a slot array of size maxDeadline (1-indexed), where each slot represents a 1-unit execution window.' },
    { id: 'latest-possible-slot', label: '3. Latest Available Slot Choice', detail: 'For job i with deadline D, search backward from D down to 1 for the first unoccupied slot, reserving earlier slots for tighter deadlines.' },
    { id: 'infeasible-rejection', label: '4. Saturated Deadline Rejection', detail: 'If all slots from D down to 1 are already occupied, the job cannot be scheduled; discard it.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'O(N log N) sorting + O(N * D) slot search with O(D) auxiliary space (or O(N log D) using Disjoint Set Union).' }
  ]
};

export const solutions = {
  cpp: `// C++ Job Sequencing Problem (Greedy)
// Time Complexity: O(N log N + N * D) | Space Complexity: O(D)
#include <vector>
#include <algorithm>
using namespace std;

struct Job {
    int id;
    int dead;
    int profit;
};

class Solution {
public:
    vector<int> JobScheduling(Job arr[], int n) {
        // Sort jobs by profit descending
        sort(arr, arr + n, [](const Job& a, const Job& b) {
            return a.profit > b.profit;
        });

        int maxDeadline = 0;
        for (int i = 0; i < n; i++) {
            maxDeadline = max(maxDeadline, arr[i].dead);
        }

        vector<int> slot(maxDeadline + 1, -1);
        int countJobs = 0, totalProfit = 0;

        for (int i = 0; i < n; i++) {
            // Greedily find the latest free slot before or on deadline
            for (int j = arr[i].dead; j > 0; j--) {
                if (slot[j] == -1) {
                    slot[j] = arr[i].id;
                    countJobs++;
                    totalProfit += arr[i].profit;
                    break;
                }
            }
        }

        return {countJobs, totalProfit};
    }
};`,
  python: `# Python 3 Job Sequencing (Greedy)
# Time Complexity: O(N log N + N * D) | Space Complexity: O(D)
class Solution:
    def JobScheduling(self, jobs):
        # jobs is list of (id, deadline, profit)
        jobs.sort(key=lambda x: x[2], reverse=True)

        max_dead = max(j[1] for j in jobs)
        slots = [-1] * (max_dead + 1)

        count = 0
        total_profit = 0

        for j_id, deadline, profit in jobs:
            for s in range(deadline, 0, -1):
                if slots[s] == -1:
                    slots[s] = j_id
                    count += 1
                    total_profit += profit
                    break

        return [count, total_profit]`,
  java: `// Java Job Sequencing (Greedy)
// Time Complexity: O(N log N + N * D) | Space Complexity: O(D)
import java.util.Arrays;

class Solution {
    static class Job {
        int id, deadline, profit;
        Job(int id, int deadline, int profit) {
            this.id = id;
            this.deadline = deadline;
            this.profit = profit;
        }
    }

    int[] JobScheduling(Job arr[], int n) {
        Arrays.sort(arr, (a, b) -> b.profit - a.profit);

        int maxDeadline = 0;
        for (Job j : arr) {
            maxDeadline = Math.max(maxDeadline, j.deadline);
        }

        int[] slot = new int[maxDeadline + 1];
        Arrays.fill(slot, -1);

        int count = 0, totalProfit = 0;

        for (int i = 0; i < n; i++) {
            for (int j = arr[i].deadline; j > 0; j--) {
                if (slot[j] == -1) {
                    slot[j] = arr[i].id;
                    count++;
                    totalProfit += arr[i].profit;
                    break;
                }
            }
        }

        return new int[]{count, totalProfit};
    }
}`,
  javascript: `// JavaScript Job Sequencing (Greedy)
// Time Complexity: O(N log N + N * D) | Space Complexity: O(D)
var jobScheduling = function(jobs) {
    jobs.sort((a, b) => b.profit - a.profit);

    let maxDeadline = 0;
    for (const j of jobs) {
        if (j.deadline > maxDeadline) maxDeadline = j.deadline;
    }

    const slots = new Array(maxDeadline + 1).fill(-1);
    let count = 0, totalProfit = 0;

    for (const job of jobs) {
        for (let s = job.deadline; s > 0; s--) {
            if (slots[s] === -1) {
                slots[s] = job.id;
                count++;
                totalProfit += job.profit;
                break;
            }
        }
    }

    return [count, totalProfit];
};`
};

export const steps = [
  {
    title: '1. Sort Jobs by Profit Descending & Initialize Slot Table',
    phase: 'INITIAL',
    codeLine: 16,
    track: {
      label: 'Execution Time Slots [Slot 1, Slot 2, Slot 3]',
      items: [
        { val: 'Slot 1: Free', status: 'dim' },
        { val: 'Slot 2: Free', status: 'dim' },
        { val: 'Slot 3: Free', status: 'dim' }
      ]
    },
    auxiliaryTrack: {
      label: 'Candidate Jobs (Sorted by Profit Descending)',
      items: [
        { val: 'J1 (P:100, D:2)', status: 'current' },
        { val: 'J3 (P:27, D:2)', status: 'default' },
        { val: 'J4 (P:25, D:1)', status: 'default' },
        { val: 'J2 (P:19, D:1)', status: 'default' },
        { val: 'J5 (P:15, D:3)', status: 'default' }
      ],
      activeI: 0
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Max Deadline', value: '3' },
      { label: 'Total Jobs', value: '0 scheduled' },
      { label: 'Total Profit', value: '$0' },
      { label: 'Strategy', value: 'Latest Available Slot' }
    ],
    formula: 'sort(arr, profit DESC); maxDeadline = 3; slot = [-1, -1, -1];',
    action: 'Sort all 5 jobs by profit descending. Allocate 3 execution slots initialized to empty.',
    explain: 'Each job takes 1 unit of time to execute. Scheduling a job at its latest feasible slot leaves earlier slots open for jobs with tighter deadlines.',
    intuition: 'Greedy choice: Place highest profit jobs as late as permissible.'
  },
  {
    title: '2. Job J1 (P:100, D:2): Assign to Latest Free Slot 2',
    phase: 'SCHEDULE',
    codeLine: 24,
    track: {
      label: 'Execution Time Slots',
      items: [
        { val: 'Slot 1: Free', status: 'dim' },
        { val: 'Slot 2: J1 ($100)', status: 'match' },
        { val: 'Slot 3: Free', status: 'dim' }
      ],
      pointers: { assigned: { idx: 1, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Candidate Jobs',
      items: [
        { val: 'J1 (Assigned)', status: 'match' },
        { val: 'J3 (P:27, D:2)', status: 'current' },
        { val: 'J4 (P:25, D:1)', status: 'default' },
        { val: 'J2 (P:19, D:1)', status: 'default' },
        { val: 'J5 (P:15, D:3)', status: 'default' }
      ],
      activeI: 1
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'Active Job', value: 'J1 (Profit 100, Deadline 2)' },
      { label: 'Slot Chosen', value: 'Slot 2', highlight: true },
      { label: 'Total Profit', value: '$100', highlight: true },
      { label: 'Jobs Count', value: '1' }
    ],
    formula: 'slot[2] == -1 => slot[2] = J1.id; totalProfit += 100;',
    action: 'J1 has deadline 2. Search starts at slot 2: slot 2 is free! Assign J1 to Slot 2.',
    explain: 'Highest-paying job J1 ($100) is locked into slot 2, leaving slot 1 free for tighter deadlines.',
    intuition: 'Always claim the latest possible slot <= deadline.'
  },
  {
    title: '3. Job J3 (P:27, D:2): Slot 2 Full -> Assign to Slot 1',
    phase: 'SCHEDULE',
    codeLine: 24,
    track: {
      label: 'Execution Time Slots',
      items: [
        { val: 'Slot 1: J3 ($27)', status: 'match' },
        { val: 'Slot 2: J1 ($100)', status: 'match' },
        { val: 'Slot 3: Free', status: 'dim' }
      ],
      pointers: { assigned: { idx: 0, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Candidate Jobs',
      items: [
        { val: 'J1 (Assigned)', status: 'visited' },
        { val: 'J3 (Assigned)', status: 'match' },
        { val: 'J4 (P:25, D:1)', status: 'current' },
        { val: 'J2 (P:19, D:1)', status: 'default' },
        { val: 'J5 (P:15, D:3)', status: 'default' }
      ],
      activeI: 2
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Active Job', value: 'J3 (Profit 27, Deadline 2)' },
      { label: 'Slot Search', value: 'Slot 2 full -> Slot 1 free' },
      { label: 'Total Profit', value: '$127 ($100 + $27)', highlight: true },
      { label: 'Jobs Count', value: '2', highlight: true }
    ],
    formula: 'slot[2] full; slot[1] free => slot[1] = J3.id; total += 27;',
    action: 'J3 has deadline 2. Slot 2 is busy with J1. Fall back to slot 1: free! Assign J3 to Slot 1.',
    explain: 'J3 takes slot 1. Now both slots 1 and 2 are fully occupied.',
    intuition: 'Backward search automatically finds the earliest available fallback slot.'
  },
  {
    title: '4. Job J4 (P:25, D:1): Slot 1 Occupied -> Rejected',
    phase: 'REJECT',
    codeLine: 26,
    track: {
      label: 'Execution Time Slots (Slots 1 & 2 Occupied)',
      items: [
        { val: 'Slot 1: J3 ($27)', status: 'selected' },
        { val: 'Slot 2: J1 ($100)', status: 'selected' },
        { val: 'Slot 3: Free', status: 'dim' }
      ]
    },
    auxiliaryTrack: {
      label: 'Candidate Jobs',
      items: [
        { val: 'J1', status: 'visited' },
        { val: 'J3', status: 'visited' },
        { val: 'J4 (Rejected)', status: 'dim' },
        { val: 'J2 (P:19, D:1)', status: 'current' },
        { val: 'J5 (P:15, D:3)', status: 'default' }
      ],
      activeI: 3
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Active Job', value: 'J4 (Profit 25, Deadline 1)' },
      { label: 'Required Slot', value: 'Slot 1 only' },
      { label: 'Status', value: 'Slot 1 occupied by J3 ($27)' },
      { label: 'Decision', value: 'Reject J4 (No free slot)' }
    ],
    formula: 'slot[1] != -1 => Cannot schedule J4 before deadline 1.',
    action: 'J4 must finish by deadline 1, but slot 1 already holds higher-priority job J3. Reject J4.',
    explain: 'Because J4 only has deadline 1, it cannot use slot 3 even though slot 3 is free.',
    intuition: 'A job cannot be placed in a slot past its deadline.',
    customCard: {
      title: 'Deadline Constraint Violation',
      rows: [
        { label: 'Job Deadline', value: 'Time <= 1' },
        { label: 'Slot 1 Status', value: 'Occupied by J3 (Profit $27 > $25)' },
        { label: 'Verdict', value: 'Reject J4; earlier slots exhausted' }
      ]
    }
  },
  {
    title: '5. Job J2 (P:19, D:1): Slot 1 Occupied -> Rejected',
    phase: 'REJECT',
    codeLine: 26,
    track: {
      label: 'Execution Time Slots',
      items: [
        { val: 'Slot 1: J3 ($27)', status: 'selected' },
        { val: 'Slot 2: J1 ($100)', status: 'selected' },
        { val: 'Slot 3: Free', status: 'dim' }
      ]
    },
    auxiliaryTrack: {
      label: 'Candidate Jobs',
      items: [
        { val: 'J1', status: 'visited' },
        { val: 'J3', status: 'visited' },
        { val: 'J4', status: 'dim' },
        { val: 'J2 (Rejected)', status: 'dim' },
        { val: 'J5 (P:15, D:3)', status: 'current' }
      ],
      activeI: 4
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Active Job', value: 'J2 (Profit 19, Deadline 1)' },
      { label: 'Required Slot', value: 'Slot 1 only' },
      { label: 'Decision', value: 'Reject J2' },
      { label: 'Total Profit', value: '$127' }
    ],
    formula: 'slot[1] full => Reject J2.',
    action: 'J2 also requires slot 1, which remains full. Discard J2.',
    explain: 'Both deadline-1 candidate slots are unavailable.',
    intuition: 'Only 1 job can ever be executed by deadline 1.'
  },
  {
    title: '6. Job J5 (P:15, D:3): Assign to Latest Free Slot 3',
    phase: 'SCHEDULE',
    codeLine: 24,
    track: {
      label: 'Execution Time Slots (All 3 Slots Occupied)',
      items: [
        { val: 'Slot 1: J3 ($27)', status: 'match' },
        { val: 'Slot 2: J1 ($100)', status: 'match' },
        { val: 'Slot 3: J5 ($15)', status: 'match' }
      ],
      pointers: { assigned: { idx: 2, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Candidate Jobs Queue (Exhausted)',
      items: [
        { val: 'J1 (100)', status: 'match' },
        { val: 'J3 (27)', status: 'match' },
        { val: 'J4 (X)', status: 'dim' },
        { val: 'J2 (X)', status: 'dim' },
        { val: 'J5 (15)', status: 'match' }
      ],
      activeI: 4
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Active Job', value: 'J5 (Profit 15, Deadline 3)' },
      { label: 'Slot Chosen', value: 'Slot 3 (Free)', highlight: true },
      { label: 'Total Profit', value: '$142 ($127 + $15)', highlight: true },
      { label: 'Jobs Count', value: '3', highlight: true }
    ],
    formula: 'slot[3] == -1 => slot[3] = J5.id; totalProfit += 15;',
    action: 'J5 has deadline 3. Slot 3 is free! Assign J5 to Slot 3. Total profit reaches $142.',
    explain: 'All 3 available time slots [1, 2, 3] are now completely occupied by optimal jobs.',
    intuition: 'Every execution window is saturated with the highest possible yield.'
  },
  {
    title: '7. Verify Full Schedule Validity',
    phase: 'VERIFY',
    codeLine: 29,
    track: {
      label: 'Confirmed Optimal Execution Schedule',
      items: [
        { val: 'Slot 1: J3 (D:2, P:27)', status: 'match' },
        { val: 'Slot 2: J1 (D:2, P:100)', status: 'match' },
        { val: 'Slot 3: J5 (D:3, P:15)', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Slot 1 Check', value: 'J3 done at t=1 <= 2 (Valid)' },
      { label: 'Slot 2 Check', value: 'J1 done at t=2 <= 2 (Valid)' },
      { label: 'Slot 3 Check', value: 'J5 done at t=3 <= 3 (Valid)' },
      { label: 'Total Yield', value: '$142 across 3 jobs' }
    ],
    formula: 'All assigned jobs finish on or before deadlines.',
    action: 'Verify that every scheduled job meets its deadline: J3 (1 <= 2), J1 (2 <= 2), J5 (3 <= 3).',
    explain: 'No deadline constraints are violated, and maximum possible profit is harvested.',
    intuition: 'Greedy ordering guarantees maximum profit.'
  },
  {
    title: '8. Complete: Return [3 jobs, $142 Profit]',
    phase: 'COMPLETED',
    codeLine: 31,
    track: {
      label: 'Optimal Solution: 3 Jobs Scheduled for $142 Total Profit',
      items: [
        { val: 'J3 (Slot 1)', status: 'match' },
        { val: 'J1 (Slot 2)', status: 'match' },
        { val: 'J5 (Slot 3)', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Jobs Done', value: '3', highlight: true },
      { label: 'Total Profit', value: '$142', highlight: true },
      { label: 'Time Complexity', value: 'O(N log N + N*D)' },
      { label: 'Space Complexity', value: 'O(D)' }
    ],
    formula: 'return {countJobs, totalProfit}; // [3, 142]',
    action: 'Algorithm successfully finishes. Return {count: 3, profit: 142}.',
    explain: 'Greedy backward slot search schedules the optimal subset of jobs without backtracking.',
    intuition: 'Sorting by profit descending + latest available slot placement achieves provable optimality.',
    customCard: {
      title: 'Job Scheduling Summary',
      rows: [
        { label: 'Jobs Scheduled', value: '3 jobs (J3, J1, J5)', accent: true },
        { label: 'Total Profit Earned', value: '$142', accent: true },
        { label: 'Complexity', value: 'O(N log N + N * D) time, O(D) space' }
      ]
    }
  }
];

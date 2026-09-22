// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Shortest Job First (SJF) Scheduling',
  category: 'Greedy Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Calculates the minimum average waiting time under non-preemptive Shortest Job First (SJF) scheduling by greedily executing processes in ascending order of burst time.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Rearrangement Inequality & Delay Minimization Invariant',
  nodes: [
    { id: 'root', label: 'SJF Scheduling Invariant', children: ['rearrangement-theorem', 'ascending-sort', 'clock-wait-accumulation', 'average-resolution', 'complexity'] },
    { id: 'rearrangement-theorem', label: '1. Delay Multiplier Theorem', detail: 'The burst time of process i is endured by all (N - 1 - i) subsequent processes in queue: Total Wait = Σ (N - 1 - i) * bt[i].' },
    { id: 'ascending-sort', label: '2. Ascending Burst Time Order', detail: 'By the Rearrangement Inequality, pairing the largest delay coefficients (N - 1, N - 2, ...) with the smallest burst times strictly minimizes total waiting time.' },
    { id: 'clock-wait-accumulation', label: '3. Clock & Wait Accumulation', detail: 'Maintain currentTime tracking total elapsed CPU clock. Each arriving process waits exactly currentTime before execution begins.' },
    { id: 'average-resolution', label: '4. Integer Average Return', detail: 'Divide total wait time by process count N using integer floor division: return totalWaitTime / N.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'O(N log N) sorting dominates the O(N) accumulation pass with strictly O(1) extra variables.' }
  ]
};

export const solutions = {
  cpp: `// C++ Shortest Job First (SJF) Scheduling
// Time Complexity: O(N log N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    long long solve(vector<int>& bt) {
        sort(bt.begin(), bt.end());
        long long totalWaitTime = 0;
        long long currentTime = 0;

        for (int b : bt) {
            totalWaitTime += currentTime;
            currentTime += b;
        }

        return totalWaitTime / bt.size();
    }
};`,
  python: `# Python 3 Shortest Job First (SJF) Scheduling
# Time Complexity: O(N log N) | Space Complexity: O(1)
class Solution:
    def solve(self, bt: list[int]) -> int:
        bt.sort()
        total_wait_time = 0
        current_time = 0

        for b in bt:
            total_wait_time += current_time
            current_time += b

        return total_wait_time // len(bt)`,
  java: `// Java Shortest Job First (SJF) Scheduling
// Time Complexity: O(N log N) | Space Complexity: O(1)
import java.util.Arrays;

class Solution {
    public long solve(int[] bt) {
        Arrays.sort(bt);
        long totalWaitTime = 0;
        long currentTime = 0;

        for (int b : bt) {
            totalWaitTime += currentTime;
            currentTime += b;
        }

        return totalWaitTime / bt.length;
    }
}`,
  javascript: `// JavaScript Shortest Job First (SJF) Scheduling
// Time Complexity: O(N log N) | Space Complexity: O(1)
var solve = function(bt) {
    bt.sort((a, b) => a - b);
    let totalWaitTime = 0;
    let currentTime = 0;

    for (const b of bt) {
        totalWaitTime += currentTime;
        currentTime += b;
    }

    return Math.floor(totalWaitTime / bt.length);
};`
};

export const steps = [
  {
    title: '1. Rearrangement Inequality: Sort Burst Times in Ascending Order',
    phase: 'INITIAL',
    codeLine: 13,
    track: {
      label: 'CPU Process Queue (Sorted Ascending by Burst Time)',
      items: [
        { val: 'P0 (1 ms)', status: 'current' },
        { val: 'P1 (2 ms)', status: 'default' },
        { val: 'P2 (3 ms)', status: 'default' },
        { val: 'P3 (4 ms)', status: 'default' },
        { val: 'P4 (7 ms)', status: 'default' }
      ],
      pointers: { nextProcess: { idx: 0, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'CPU Clock & Timeline',
      items: [
        { val: 'Clock: t = 0 ms', status: 'dim' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Process Count', value: '5 processes' },
      { label: 'CPU Clock', value: '0 ms' },
      { label: 'Total Wait Time', value: '0 ms' },
      { label: 'Shortest Burst', value: 'P0 (1 ms)' }
    ],
    formula: 'sort(bt.begin(), bt.end()); TotalWait = Σ (N - 1 - i) * bt[i];',
    action: 'Sort burst times ascending: [1, 2, 3, 4, 7]. Initialize clock = 0 and totalWaitTime = 0.',
    explain: 'Process 0\'s burst time is endured by all 4 subsequent processes. Thus, giving the shortest job the highest priority minimizes aggregate queue waiting.',
    intuition: 'Sorting by shortest job first minimizes the sum of completion times.'
  },
  {
    title: '2. Execute P0 (1 ms): Wait Time = 0 ms -> Clock: 1 ms',
    phase: 'EXECUTE',
    codeLine: 18,
    track: {
      label: 'CPU Process Queue',
      items: [
        { val: 'P0 (1 ms) Done', status: 'match' },
        { val: 'P1 (2 ms)', status: 'current' },
        { val: 'P2 (3 ms)', status: 'default' },
        { val: 'P3 (4 ms)', status: 'default' },
        { val: 'P4 (7 ms)', status: 'default' }
      ],
      pointers: { cpu: { idx: 0, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'CPU Clock & Timeline',
      items: [
        { val: 'P0 runs [0..1 ms]', status: 'match' },
        { val: 'Clock: t = 1 ms', status: 'selected' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'P0 Wait Time', value: '0 ms (Immediate)' },
      { label: 'P0 Burst Time', value: '1 ms' },
      { label: 'CPU Clock', value: '1 ms (0 + 1)', highlight: true },
      { label: 'Total Wait Time', value: '0 ms' }
    ],
    formula: 'totalWait += currentTime (0); currentTime += 1; // wait: 0, clock: 1',
    action: 'P0 executes from t = 0 to t = 1. Its wait time is 0 ms. Clock advances to 1 ms.',
    explain: 'P0 began immediately upon system startup, incurring 0 delay.',
    intuition: 'The first scheduled job always experiences zero waiting time.'
  },
  {
    title: '3. Execute P1 (2 ms): Wait Time = 1 ms -> Clock: 3 ms',
    phase: 'EXECUTE',
    codeLine: 18,
    track: {
      label: 'CPU Process Queue',
      items: [
        { val: 'P0 (1 ms)', status: 'visited' },
        { val: 'P1 (2 ms) Done', status: 'match' },
        { val: 'P2 (3 ms)', status: 'current' },
        { val: 'P3 (4 ms)', status: 'default' },
        { val: 'P4 (7 ms)', status: 'default' }
      ],
      pointers: { cpu: { idx: 1, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'CPU Clock & Timeline',
      items: [
        { val: 'P0 [0..1]', status: 'visited' },
        { val: 'P1 [1..3 ms]', status: 'match' },
        { val: 'Clock: t = 3 ms', status: 'selected' }
      ]
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'P1 Wait Time', value: '1 ms', highlight: true },
      { label: 'P1 Burst Time', value: '2 ms' },
      { label: 'CPU Clock', value: '3 ms (1 + 2)', highlight: true },
      { label: 'Total Wait Time', value: '1 ms (0 + 1)' }
    ],
    formula: 'totalWait += 1; currentTime += 2; // wait: 1, clock: 3',
    action: 'P1 had to wait 1 ms for P0 to finish. Runs from t = 1 to t = 3. Total wait = 1 ms.',
    explain: 'P1 incurs 1 ms of waiting delay. Clock reaches 3 ms.',
    intuition: 'Each job\'s wait equals the current accumulated clock.'
  },
  {
    title: '4. Execute P2 (3 ms): Wait Time = 3 ms -> Clock: 6 ms',
    phase: 'EXECUTE',
    codeLine: 18,
    track: {
      label: 'CPU Process Queue',
      items: [
        { val: 'P0 (1 ms)', status: 'visited' },
        { val: 'P1 (2 ms)', status: 'visited' },
        { val: 'P2 (3 ms) Done', status: 'match' },
        { val: 'P3 (4 ms)', status: 'current' },
        { val: 'P4 (7 ms)', status: 'default' }
      ],
      pointers: { cpu: { idx: 2, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'CPU Clock & Timeline',
      items: [
        { val: 'P0 [0..1]', status: 'visited' },
        { val: 'P1 [1..3]', status: 'visited' },
        { val: 'P2 [3..6 ms]', status: 'match' },
        { val: 'Clock: t = 6 ms', status: 'selected' }
      ]
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'P2 Wait Time', value: '3 ms (P0 + P1)', highlight: true },
      { label: 'P2 Burst Time', value: '3 ms' },
      { label: 'CPU Clock', value: '6 ms (3 + 3)', highlight: true },
      { label: 'Total Wait Time', value: '4 ms (1 + 3)' }
    ],
    formula: 'totalWait += 3; currentTime += 3; // wait: 4, clock: 6',
    action: 'P2 waited 3 ms (for P0 and P1). Runs from t = 3 to t = 6. Total wait reaches 4 ms.',
    explain: 'P2 had to wait 1 ms + 2 ms = 3 ms. Total wait is now 0 + 1 + 3 = 4 ms.',
    intuition: 'Waiting delays compound monotonically.'
  },
  {
    title: '5. Execute P3 (4 ms): Wait Time = 6 ms -> Clock: 10 ms',
    phase: 'EXECUTE',
    codeLine: 18,
    track: {
      label: 'CPU Process Queue',
      items: [
        { val: 'P0 (1 ms)', status: 'visited' },
        { val: 'P1 (2 ms)', status: 'visited' },
        { val: 'P2 (3 ms)', status: 'visited' },
        { val: 'P3 (4 ms) Done', status: 'match' },
        { val: 'P4 (7 ms)', status: 'current' }
      ],
      pointers: { cpu: { idx: 3, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'CPU Clock & Timeline',
      items: [
        { val: 'P0 [0..1]', status: 'visited' },
        { val: 'P1 [1..3]', status: 'visited' },
        { val: 'P2 [3..6]', status: 'visited' },
        { val: 'P3 [6..10 ms]', status: 'match' },
        { val: 'Clock: t = 10 ms', status: 'selected' }
      ]
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'P3 Wait Time', value: '6 ms', highlight: true },
      { label: 'P3 Burst Time', value: '4 ms' },
      { label: 'CPU Clock', value: '10 ms (6 + 4)', highlight: true },
      { label: 'Total Wait Time', value: '10 ms (4 + 6)' }
    ],
    formula: 'totalWait += 6; currentTime += 4; // wait: 10, clock: 10',
    action: 'P3 waited 6 ms. Runs from t = 6 to t = 10. Total wait reaches 4 + 6 = 10 ms.',
    explain: 'Four processes complete. Only the longest job (P4, 7 ms) remains.',
    intuition: 'Deferring the longest job until the very end minimizes delay for all other processes.'
  },
  {
    title: '6. Execute P4 (7 ms): Wait Time = 10 ms -> Clock: 17 ms',
    phase: 'EXECUTE',
    codeLine: 18,
    track: {
      label: 'CPU Process Queue (All 5 Processes Executed)',
      items: [
        { val: 'P0 (1 ms)', status: 'match' },
        { val: 'P1 (2 ms)', status: 'match' },
        { val: 'P2 (3 ms)', status: 'match' },
        { val: 'P3 (4 ms)', status: 'match' },
        { val: 'P4 (7 ms) Done', status: 'match' }
      ],
      pointers: { last: { idx: 4, color: 'var(--accent-bright)' } }
    },
    auxiliaryTrack: {
      label: 'Final CPU Timeline [0..17 ms]',
      items: [
        { val: 'P0 [0..1]', status: 'match' },
        { val: 'P1 [1..3]', status: 'match' },
        { val: 'P2 [3..6]', status: 'match' },
        { val: 'P3 [6..10]', status: 'match' },
        { val: 'P4 [10..17 ms]', status: 'match' }
      ]
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'P4 Wait Time', value: '10 ms', highlight: true },
      { label: 'Final CPU Clock', value: '17 ms' },
      { label: 'Total Wait Time', value: '20 ms (10 + 10)', highlight: true },
      { label: 'Processes Executed', value: '5 / 5' }
    ],
    formula: 'totalWait += 10; currentTime += 7; // wait: 20 ms, clock: 17 ms',
    action: 'P4 waited 10 ms. Runs from t = 10 to t = 17. Cumulative wait time = 0 + 1 + 3 + 6 + 10 = 20 ms.',
    explain: 'Because P4 was last, its large burst time (7 ms) delayed exactly 0 subsequent jobs!',
    intuition: 'Zero delay was inflicted on any other job by P4.'
  },
  {
    title: '7. Contrast Analysis: Optimal vs Inverted Schedule',
    phase: 'THEORY',
    codeLine: 21,
    track: {
      label: 'Efficiency Comparison: Ascending vs Descending Order',
      items: [
        { val: 'SJF Ascending: Total 20 ms', status: 'match' },
        { val: 'LJF Descending: Total 43 ms', status: 'dim' }
      ]
    },
    auxiliaryTrack: {
      label: 'Waiting Time Breakdowns',
      items: [
        { val: 'SJF: 0 + 1 + 3 + 6 + 10 = 20 ms', status: 'match' },
        { val: 'LJF: 0 + 7 + 11 + 14 + 16 = 48 ms', status: 'dim' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Optimal SJF Total', value: '20 ms', highlight: true },
      { label: 'Worst-Case LJF Total', value: '48 ms' },
      { label: 'Delay Reduction', value: '58% faster waiting', highlight: true }
    ],
    formula: 'Δ = 48 ms - 20 ms = 28 ms delay saved by greedy ordering',
    action: 'Contrast analysis confirms that sorting shortest jobs first saved 28 ms of aggregate waiting time.',
    explain: 'Executing the 7 ms job first would have forced all 4 other jobs to wait 7 ms each, wasting 28 ms.',
    intuition: 'Mathematical proof: SJF minimizes the weighted sum of completion times.',
    customCard: {
      title: 'Scheduling Comparison',
      rows: [
        { label: 'SJF Total Wait', value: '20 ms (Avg: 4 ms)', accent: true },
        { label: 'LJF Total Wait', value: '48 ms (Avg: 9.6 ms)' },
        { label: 'Greedy Proof', value: 'Rearrangement inequality Σ c_i * b_i minimized' }
      ]
    }
  },
  {
    title: '8. Complete: Return Average Waiting Time = 20 / 5 = 4 ms',
    phase: 'COMPLETED',
    codeLine: 22,
    track: {
      label: 'SJF Execution Complete: Average Waiting Time = 4 ms',
      items: [
        { val: 'P0 (wait 0)', status: 'match' },
        { val: 'P1 (wait 1)', status: 'match' },
        { val: 'P2 (wait 3)', status: 'match' },
        { val: 'P3 (wait 6)', status: 'match' },
        { val: 'P4 (wait 10)', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Average Wait Time', value: '4 ms', highlight: true },
      { label: 'Total Wait Time', value: '20 ms' },
      { label: 'Time Complexity', value: 'O(N log N)' },
      { label: 'Space Complexity', value: 'O(1) auxiliary' }
    ],
    formula: 'return totalWaitTime / bt.size(); // 20 / 5 = 4',
    action: 'Algorithm concludes. Return integer average waiting time = 4 ms.',
    explain: 'Average waiting time is 20 / 5 = 4 ms per process. Optimal non-preemptive schedule achieved.',
    intuition: 'Shortest Job First is provably optimal for minimizing average waiting time.',
    customCard: {
      title: 'SJF Performance Summary',
      rows: [
        { label: 'Average Waiting Time', value: '4 ms', accent: true },
        { label: 'Total Queue Delay', value: '20 ms across 5 processes' },
        { label: 'Complexity', value: 'O(N log N) sort, O(N) sweep, O(1) space', accent: true }
      ]
    }
  }
];

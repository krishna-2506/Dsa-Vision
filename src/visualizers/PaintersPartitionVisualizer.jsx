// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: "Painter's Partition Problem",
  category: 'Binary Search on Answers',
  difficulty: 'Hard',
  timeComplexity: 'O(N * log(sum - max))',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the minimum time required for K painters to paint contiguous wooden boards by binary searching over the maximum allowable workload per painter.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: "Painter's Partition Invariant",
  nodes: [
    { id: 'root', label: 'Workload Minimization Strategy', children: ['contiguous-rule', 'domain-bounds', 'greedy-painter-alloc', 'monotonic-property', 'complexity'] },
    { id: 'contiguous-rule', label: '1. Contiguous Allocation Constraint', detail: 'Each painter can only paint a contiguous sequence of boards; no interleaving or board splitting is permitted.' },
    { id: 'domain-bounds', label: '2. Search Domain [max .. sum]', detail: 'At least one painter must paint the longest single board (low = max(boards)). At most, one painter paints all boards (high = sum(boards)).' },
    { id: 'greedy-painter-alloc', label: '3. Greedy Painter Allocation', detail: 'Accumulate board lengths into the current painter until adding the next board exceeds timeLimit, then summon the next painter.' },
    { id: 'monotonic-property', label: '4. Monotonic Feasibility', detail: 'As allowed maximum workload increases, the number of required painters monotonically decreases, satisfying binary search requirements.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'O(N * log(sum - max)) time using strictly O(1) auxiliary space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Painter's Partition using Binary Search on Answers
// Time Complexity: O(N * log(sum - max)) | Space Complexity: O(1)
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

class Solution {
private:
    int countPainters(const vector<int>& boards, int timeLimit) {
        int painters = 1;
        long long currentLoad = 0;
        for (int b : boards) {
            if (currentLoad + b <= timeLimit) {
                currentLoad += b;
            } else {
                painters++;
                currentLoad = b;
            }
        }
        return painters;
    }

public:
    int findLargestMinDistance(vector<int>& boards, int k) {
        int low = *max_element(boards.begin(), boards.end());
        int high = accumulate(boards.begin(), boards.end(), 0);
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int paintersNeeded = countPainters(boards, mid);

            if (paintersNeeded <= k) {
                ans = mid;
                high = mid - 1; // Try minimizing the max time
            } else {
                low = mid + 1;  // Workload cap too low, increase
            }
        }
        return ans;
    }
};`,
  python: `# Python 3 Painter's Partition using Binary Search
# Time Complexity: O(N * log(sum - max)) | Space Complexity: O(1)
class Solution:
    def findLargestMinDistance(self, boards: list[int], k: int) -> int:
        low = max(boards)
        high = sum(boards)
        ans = high

        def count_painters(limit: int) -> int:
            painters = 1
            load = 0
            for b in boards:
                if load + b <= limit:
                    load += b
                else:
                    painters += 1
                    load = b
            return painters

        while low <= high:
            mid = (low + high) // 2
            if count_painters(mid) <= k:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans`,
  java: `// Java Painter's Partition using Binary Search
// Time Complexity: O(N * log(sum - max)) | Space Complexity: O(1)
import java.util.Arrays;

class Solution {
    private static int countPainters(int[] boards, int timeLimit) {
        int painters = 1;
        int load = 0;
        for (int b : boards) {
            if (load + b <= timeLimit) {
                load += b;
            } else {
                painters++;
                load = b;
            }
        }
        return painters;
    }

    public static int findLargestMinDistance(int[] boards, int k) {
        int low = Arrays.stream(boards).max().getAsInt();
        int high = Arrays.stream(boards).sum();
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (countPainters(boards, mid) <= k) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
}`,
  javascript: `// JavaScript Painter's Partition using Binary Search
// Time Complexity: O(N * log(sum - max)) | Space Complexity: O(1)
function findLargestMinDistance(boards, k) {
    let low = Math.max(...boards);
    let high = boards.reduce((a, b) => a + b, 0);
    let ans = high;

    function countPainters(limit) {
        let painters = 1;
        let load = 0;
        for (const b of boards) {
            if (load + b <= limit) {
                load += b;
            } else {
                painters++;
                load = b;
            }
        }
        return painters;
    }

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (countPainters(mid) <= k) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}`
};

export const steps = [
  {
    title: '1. Problem Setup & Time Domain Invariant',
    phase: 'INITIAL',
    track: {
      label: 'boards (N = 4, Painters K = 2)',
      items: [
        { val: 10 },
        { val: 20 },
        { val: 30 },
        { val: 40, badge: 'max = 40' }
      ]
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'Painters K', value: 2 },
      { label: 'low = max(boards)', value: 40 },
      { label: 'high = sum(boards)', value: 100 },
      { label: 'Search Space', value: '[40 .. 100]', highlight: true }
    ],
    formula: 'low = max(boards) = 40; high = sum(boards) = 100;',
    action: 'Establish the lower and upper bounds of time per painter.',
    explain: 'Each painter paints 1 unit of board length in 1 unit of time. Each painter must paint contiguous boards.',
    intuition: 'The painter assigned the longest board (40m) needs at least 40 units of time. One painter painting all boards needs 100 units.',
    variables: {
      'boards': '[10, 20, 30, 40]',
      'K': 2,
      'low (max)': 40,
      'high (sum)': 100,
      'ans': 100
    }
  },
  {
    title: '2. Iteration 1: Test Time Limit mid = 70 (Feasible)',
    phase: 'EVALUATE_WORKLOAD',
    track: {
      label: 'Painters: P1 [10, 20, 30] = 60m | P2 [40] = 40m (Limit <= 70)',
      items: [
        { val: 10, status: 'match', badge: 'Painter 1' },
        { val: 20, status: 'match', badge: 'Painter 1' },
        { val: 30, status: 'match', badge: 'P1 (load=60)' },
        { val: 40, status: 'active', badge: 'P2 (load=40)' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'mid (Time Limit)', value: 70 },
      { label: 'Painters Needed', value: '2 <= 2 (Feasible)', highlight: true },
      { label: 'ans updated', value: 70 },
      { label: 'New Search Range', value: '[40 .. 69]' }
    ],
    formula: 'mid = (40 + 100) / 2 = 70; countPainters(70) = 2 <= K;',
    action: 'Simulate greedy painter assignment with maximum workload limit 70.',
    explain: 'Painter 1 paints boards [10, 20, 30] = 60m <= 70m (adding 40 gives 100 > 70). Painter 2 paints board [40] = 40m <= 70m. Total 2 painters needed!',
    intuition: '70 units of time is feasible for K=2 painters. Update ans = 70, then search for a smaller time limit: high = 69.',
    variables: {
      'low': 40,
      'high': 69,
      'mid': 70,
      'painters': 2,
      'ans': 70
    }
  },
  {
    title: '3. Iteration 2: Test Time Limit mid = 54 (Infeasible — Overload)',
    phase: 'OVERLOAD',
    track: {
      label: 'Painters: P1 [10, 20]=30m | P2 [30]=30m | P3 [40]=40m (Limit <= 54)',
      items: [
        { val: 10, status: 'active', badge: 'P1' },
        { val: 20, status: 'active', badge: 'P1 (load=30)' },
        { val: 30, status: 'mismatch', badge: 'P2 (load=30)' },
        { val: 40, status: 'mismatch', badge: 'P3 (load=40)' }
      ]
    },
    activeI: 2,
    activeJ: 3,
    metrics: [
      { label: 'mid (Time Limit)', value: 54 },
      { label: 'Painters Needed', value: '3 > 2 (Infeasible)', highlight: true },
      { label: 'Action', value: 'low = mid + 1' },
      { label: 'New Search Range', value: '[55 .. 69]' }
    ],
    formula: 'mid = (40 + 69) / 2 = 54; countPainters(54) = 3 > K(2);',
    action: 'Workload limit 54 requires 3 painters, exceeding K = 2 painters available.',
    explain: 'P1 takes [10, 20]=30 (adding 30 gives 60 > 54). P2 takes [30]=30 (adding 40 gives 70 > 54). P3 takes [40]=40. 3 painters are required!',
    intuition: 'A time limit of 54 is too tight to finish with only 2 painters. Increase lower bound: low = mid + 1 = 55.',
    variables: {
      'low': 55,
      'high': 69,
      'mid': 54,
      'painters': 3,
      'ans': 70
    }
  },
  {
    title: '4. Iteration 3: Test Time Limit mid = 62 (Feasible)',
    phase: 'EVALUATE_WORKLOAD',
    track: {
      label: 'Painters: P1 [10, 20, 30] = 60m | P2 [40] = 40m (Limit <= 62)',
      items: [
        { val: 10, status: 'match', badge: 'P1' },
        { val: 20, status: 'match', badge: 'P1' },
        { val: 30, status: 'match', badge: 'P1 (load=60)' },
        { val: 40, status: 'match', badge: 'P2 (load=40)' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'mid (Time Limit)', value: 62 },
      { label: 'Painters Needed', value: '2 <= 2 (Feasible)', highlight: true },
      { label: 'ans updated', value: 62 },
      { label: 'New Search Range', value: '[55 .. 61]' }
    ],
    formula: 'mid = (55 + 69) / 2 = 62; countPainters(62) = 2 <= K;',
    action: 'Test workload cap 62: P1 paints 60m <= 62m and P2 paints 40m <= 62m.',
    explain: 'P1 [10, 20, 30] takes 60m <= 62m. P2 [40] takes 40m <= 62m. Exactly 2 painters needed <= K(2).',
    intuition: '62 is feasible. Record ans = 62 and check smaller limits: high = mid - 1 = 61.',
    variables: {
      'low': 55,
      'high': 61,
      'mid': 62,
      'painters': 2,
      'ans': 62
    }
  },
  {
    title: '5. Iteration 4: Test Time Limit mid = 58 (Infeasible)',
    phase: 'OVERLOAD',
    track: {
      label: 'Painters: P1 [10, 20]=30m | P2 [30]=30m | P3 [40]=40m (Limit <= 58)',
      items: [
        { val: 10, status: 'active', badge: 'P1' },
        { val: 20, status: 'active', badge: 'P1 (load=30)' },
        { val: 30, status: 'mismatch', badge: 'P2 (load=30)' },
        { val: 40, status: 'mismatch', badge: 'P3 (load=40)' }
      ]
    },
    activeI: 2,
    activeJ: 3,
    metrics: [
      { label: 'mid (Time Limit)', value: 58 },
      { label: 'Painters Needed', value: '3 > 2 (Infeasible)', highlight: true },
      { label: 'Action', value: 'low = mid + 1' },
      { label: 'New Search Range', value: '[59 .. 61]' }
    ],
    formula: 'mid = (55 + 61) / 2 = 58; countPainters(58) = 3 > K(2);',
    action: 'Limit 58 cannot accommodate [10, 20, 30] = 60m by one painter.',
    explain: 'Because 60 > 58, boards [10, 20] and [30] cannot be painted by the same painter without exceeding 58m. 3 painters required.',
    intuition: 'Limit 58 fails. Advance lower bound: low = mid + 1 = 59.',
    variables: {
      'low': 59,
      'high': 61,
      'mid': 58,
      'painters': 3,
      'ans': 62
    }
  },
  {
    title: '6. Iteration 5: Test Time Limit mid = 60 (Feasible & Optimal Candidate)',
    phase: 'EVALUATE_WORKLOAD',
    track: {
      label: 'Painters: P1 [10, 20, 30] = 60m | P2 [40] = 40m (Limit <= 60)',
      items: [
        { val: 10, status: 'match', badge: 'P1' },
        { val: 20, status: 'match', badge: 'P1' },
        { val: 30, status: 'match', badge: 'P1 (load=60)' },
        { val: 40, status: 'match', badge: 'P2 (load=40)' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'mid (Time Limit)', value: 60 },
      { label: 'Painters Needed', value: '2 <= 2 (Feasible)', highlight: true },
      { label: 'ans updated', value: 60 },
      { label: 'New Search Range', value: '[59 .. 59]' }
    ],
    formula: 'mid = (59 + 61) / 2 = 60; countPainters(60) = 2 <= K;',
    action: 'Workload limit 60 perfectly fits P1 [10, 20, 30] = 60m and P2 [40] = 40m.',
    explain: 'Both painters take <= 60 units of time. Exactly 2 painters used! Record ans = 60 and test high = 59.',
    intuition: '60 is valid. Search domain narrows down to the single remaining integer 59.',
    variables: {
      'low': 59,
      'high': 59,
      'mid': 60,
      'painters': 2,
      'ans': 60
    }
  },
  {
    title: '7. Convergence: Test mid = 59 (Fails) & Terminate',
    phase: 'CONVERGENCE',
    track: {
      label: 'Search Exhausted: low = 60 > high = 59',
      items: [
        { val: 10, status: 'match', badge: 'P1' },
        { val: 20, status: 'match', badge: 'P1' },
        { val: 30, status: 'match', badge: 'P1 (sum=60)' },
        { val: 40, status: 'sorted', badge: 'P2 (sum=40)' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'mid = 59', value: 'Requires 3 painters' },
      { label: 'low', value: 60 },
      { label: 'high', value: 59 },
      { label: 'Optimal Time', value: 60, highlight: true }
    ],
    formula: 'countPainters(59) = 3 > 2 -> low = 60; low > high -> STOP;',
    action: 'Confirm that 59 is insufficient (60 > 59) and terminate binary search.',
    explain: 'Testing 59 fails because [10, 20, 30]=60 > 59. Thus low increments to 60. Search space exhausts (low > high).',
    intuition: 'Mathematically guarantees that 60 is the global minimum of the maximum time allocated to any painter.',
    variables: {
      'low': 60,
      'high': 59,
      'ans': 60
    }
  },
  {
    title: '8. Result: Minimum Time Required = 60 Units',
    phase: 'COMPLETED',
    track: {
      label: 'Optimal Partition: Painter 1 (60 units) & Painter 2 (40 units)',
      items: [
        { val: 10, status: 'match' },
        { val: 20, status: 'match' },
        { val: 30, status: 'match', badge: 'P1 Load = 60m' },
        { val: 40, status: 'match', badge: 'P2 Load = 40m' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Painter 1 Time', value: '60 units' },
      { label: 'Painter 2 Time', value: '40 units' },
      { label: 'Max Workload', value: '60 units (Minimized)', highlight: true },
      { label: 'Complexity', value: 'O(N * log(sum - max))' }
    ],
    formula: 'return ans = 60;',
    action: 'Return the optimal minimized painter time.',
    explain: 'Painter 1 paints boards [10, 20, 30] in 60 time units. Painter 2 paints board [40] in 40 time units. Total project completes in max(60, 40) = 60 units.',
    intuition: 'Binary search on answer solves the NP-complete partition variant in pseudo-polynomial logarithmic time.',
    variables: {
      'result': 60,
      'timeComplexity': 'O(N * log(sum - max))',
      'spaceComplexity': 'O(1)'
    }
  }
];

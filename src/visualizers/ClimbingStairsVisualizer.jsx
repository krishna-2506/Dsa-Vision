// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'Climbing Stairs (DP-2)',
  category: 'Dynamic Programming',
  difficulty: 'Easy',
  timeComplexity: 'O(N) Time',
  spaceComplexity: 'O(1) Space-Optimized',
  description: 'Calculates the number of distinct ways to reach the nth stair when taking either 1 or 2 steps at a time. The problem maps directly to the Fibonacci recurrence: dp[i] = dp[i-1] + dp[i-2].'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'Climbing Stairs (DP-2)',
  nodes: [
    { id: 'root', label: 'Step Combinatorics', children: ['last-step-1', 'last-step-2', 'sum-rule', 'space-compression'] },
    { id: 'last-step-1', label: '1. Arriving via 1-Step', detail: 'Any valid way that ends with a 1-step leap must have arrived from stair (i - 1), contributing dp[i - 1] ways.' },
    { id: 'last-step-2', label: '2. Arriving via 2-Step', detail: 'Any valid way that ends with a 2-step leap must have arrived from stair (i - 2), contributing dp[i - 2] ways.' },
    { id: 'sum-rule', label: '3. Mutual Exclusivity', detail: 'Because the final step is either 1 or 2 (disjoint sets), the total distinct ways is dp[i] = dp[i - 1] + dp[i - 2].' },
    { id: 'space-compression', label: '4. Fibonacci O(1) Space', detail: 'Only the two preceding counts (prev and prev2) are needed to calculate the next state.' }
  ]
};

export const solutions = {
  cpp: `// C++ Climbing Stairs (Space-Optimized)
// Time: O(N) | Space: O(1)
class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1; // ways to step 1
        int prev = 2;  // ways to step 2

        for (int i = 3; i <= n; i++) {
            int cur = prev + prev2;
            prev2 = prev;
            prev = cur;
        }

        return prev;
    }
};`,
  python: `# Python 3 Climbing Stairs (Space-Optimized)
# Time: O(N) | Space: O(1)
class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        prev2, prev = 1, 2
        for i in range(3, n + 1):
            cur = prev + prev2
            prev2 = prev
            prev = cur
        return prev`,
  java: `// Java Climbing Stairs (Space-Optimized)
// Time: O(N) | Space: O(1)
class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1;
        int prev = 2;

        for (int i = 3; i <= n; i++) {
            int cur = prev + prev2;
            prev2 = prev;
            prev = cur;
        }

        return prev;
    }
}`,
  javascript: `// JavaScript Climbing Stairs (Space-Optimized)
// Time: O(N) | Space: O(1)
var climbStairs = function(n) {
    if (n <= 2) return n;
    let prev2 = 1;
    let prev = 2;

    for (let i = 3; i <= n; i++) {
        const cur = prev + prev2;
        prev2 = prev;
        prev = cur;
    }

    return prev;
};`
};

export const steps = [
  {
    title: '1. Problem Setup & Invariant Definition',
    phase: 'INITIAL',
    tracks: [
      { label: 'Stair Number (i)', items: ['Stair 0', 'Stair 1', 'Stair 2', 'Stair 3', 'Stair 4', 'Stair 5'] },
      { label: 'Ways dp[i]', items: ['1', '—', '—', '—', '—', '—'] }
    ],
    activeI: null,
    activePrev: null,
    trackTitle: 'Distinct Ways Recurrence',
    metrics: [
      { label: 'Target Stair N', value: '5' },
      { label: 'Step Sizes', value: '1 or 2' },
      { label: 'Recurrence', value: 'dp[i] = dp[i-1] + dp[i-2]' }
    ],
    customCard: {
      title: 'Disjoint Partitioning Principle',
      rows: [
        { label: 'Ends with 1-Step', value: 'Must originate from stair (i - 1)' },
        { label: 'Ends with 2-Step', value: 'Must originate from stair (i - 2)' },
        { label: 'Total Ways', value: 'dp[i] = dp[i - 1] + dp[i - 2]', accent: true }
      ]
    },
    formula: 'dp[i] = dp[i-1] + dp[i-2]',
    action: 'Initialize DP table and define mutually exclusive transition branches',
    explain: 'To reach stair i, the last movement must either be a 1-step jump from stair i-1 or a 2-step jump from stair i-2. Since these sets of paths are mutually exclusive, we simply add their counts.',
    intuition: 'Every valid path to stair i is a unique extension of a valid path to i-1 or i-2.'
  },
  {
    title: '2. Base Case: Stair 1 (1 Way)',
    phase: 'BASE_CASES',
    tracks: [
      { label: 'Stair Number (i)', items: ['Stair 0', 'Stair 1', 'Stair 2', 'Stair 3', 'Stair 4', 'Stair 5'] },
      { label: 'Ways dp[i]', items: ['1', '1', '—', '—', '—', '—'] }
    ],
    activeI: 1,
    activePrev: 0,
    trackTitle: 'Base Case: Stair 1',
    metrics: [
      { label: 'Stair i', value: '1' },
      { label: 'Distinct Ways', value: '1' },
      { label: 'Path', value: '[1]' }
    ],
    customCard: {
      title: 'Paths to Stair 1',
      rows: [
        { label: 'Path 1', value: 'Take 1 step from 0 -> [1]' },
        { label: 'Total Count', value: 'dp[1] = 1', accent: true }
      ]
    },
    formula: 'dp[1] = 1',
    action: 'Set base case dp[1] = 1',
    explain: 'There is only 1 way to climb to the 1st stair: a single 1-step leap.',
    intuition: 'Only one step sequence exists for reaching height 1.'
  },
  {
    title: '3. Base Case: Stair 2 (2 Ways)',
    phase: 'BASE_CASES',
    tracks: [
      { label: 'Stair Number (i)', items: ['Stair 0', 'Stair 1', 'Stair 2', 'Stair 3', 'Stair 4', 'Stair 5'] },
      { label: 'Ways dp[i]', items: ['1', '1', '2', '—', '—', '—'] }
    ],
    activeI: 2,
    activePrev: 1,
    trackTitle: 'Base Case: Stair 2',
    metrics: [
      { label: 'Stair i', value: '2' },
      { label: 'Distinct Ways', value: '2' },
      { label: 'Paths', value: '[1+1], [2]' }
    ],
    customCard: {
      title: 'Paths to Stair 2',
      rows: [
        { label: 'From Stair 1', value: '[1] + 1 = [1, 1]' },
        { label: 'From Stair 0', value: '[2] = [2]' },
        { label: 'Total Count', value: 'dp[2] = 1 + 1 = 2', accent: true }
      ]
    },
    formula: 'dp[2] = dp[1] + dp[0] = 1 + 1 = 2',
    action: 'Set base case dp[2] = 2; two distinct paths exist',
    explain: 'To reach stair 2, we can take two 1-steps (1+1) or one 2-step (2). Total = 2 ways. prev2 = 1, prev = 2.',
    intuition: 'We now have the two foundational base terms needed for Fibonacci recurrence.'
  },
  {
    title: '4. Stair 3: Sum dp[2] + dp[1] -> 3 Ways',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Stair Number (i)', items: ['Stair 0', 'Stair 1', 'Stair 2', 'Stair 3', 'Stair 4', 'Stair 5'] },
      { label: 'Ways dp[i]', items: ['1', '1', '2', '3', '—', '—'] }
    ],
    activeI: 3,
    activePrev: 2,
    trackTitle: 'Step i = 3 Evaluation',
    metrics: [
      { label: 'Stair i', value: '3' },
      { label: 'From Stair 2', value: 'dp[2] = 2' },
      { label: 'From Stair 1', value: 'dp[1] = 1' },
      { label: 'dp[3]', value: '3' }
    ],
    customCard: {
      title: 'Paths to Stair 3',
      rows: [
        { label: 'Via Stair 2 (+1)', value: '[1, 1, 1], [2, 1]' },
        { label: 'Via Stair 1 (+2)', value: '[1, 2]' },
        { label: 'Total Count', value: 'dp[3] = 2 + 1 = 3', accent: true }
      ]
    },
    formula: 'dp[3] = dp[2] + dp[1] = 2 + 1 = 3',
    action: 'Add paths from stair 2 and stair 1 to obtain 3 ways',
    explain: 'Paths reaching stair 2 can append a 1-step ([1,1,1] and [2,1]). Paths reaching stair 1 can append a 2-step ([1,2]). Total = 2 + 1 = 3 distinct ways.',
    intuition: 'Combinations branch and merge systematically with each additional stair.'
  },
  {
    title: '5. Stair 4: Sum dp[3] + dp[2] -> 5 Ways',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Stair Number (i)', items: ['Stair 0', 'Stair 1', 'Stair 2', 'Stair 3', 'Stair 4', 'Stair 5'] },
      { label: 'Ways dp[i]', items: ['1', '1', '2', '3', '5', '—'] }
    ],
    activeI: 4,
    activePrev: 3,
    trackTitle: 'Step i = 4 Evaluation',
    metrics: [
      { label: 'Stair i', value: '4' },
      { label: 'From Stair 3', value: 'dp[3] = 3' },
      { label: 'From Stair 2', value: 'dp[2] = 2' },
      { label: 'dp[4]', value: '5' }
    ],
    customCard: {
      title: 'Paths to Stair 4',
      rows: [
        { label: 'Via Stair 3 (+1)', value: '3 ways ending in +1' },
        { label: 'Via Stair 2 (+2)', value: '2 ways ending in +2' },
        { label: 'Total Count', value: 'dp[4] = 3 + 2 = 5', accent: true }
      ]
    },
    formula: 'dp[4] = dp[3] + dp[2] = 3 + 2 = 5',
    action: 'Add paths from stair 3 (3) and stair 2 (2) giving 5 ways',
    explain: 'Stair 4 combines all 3 routes from stair 3 with all 2 routes from stair 2. Total = 3 + 2 = 5 ways: {[1,1,1,1], [1,2,1], [2,1,1], [1,1,2], [2,2]}.',
    intuition: 'Each stair count is the exact sum of the previous two Fibonacci numbers.'
  },
  {
    title: '6. Stair 5: Sum dp[4] + dp[3] -> 8 Ways',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Stair Number (i)', items: ['Stair 0', 'Stair 1', 'Stair 2', 'Stair 3', 'Stair 4', 'Stair 5'] },
      { label: 'Ways dp[i]', items: ['1', '1', '2', '3', '5', '8'] }
    ],
    activeI: 5,
    activePrev: 4,
    trackTitle: 'Step i = 5 (Target Stair)',
    metrics: [
      { label: 'Target Stair', value: '5' },
      { label: 'From Stair 4', value: 'dp[4] = 5' },
      { label: 'From Stair 3', value: 'dp[3] = 3' },
      { label: 'dp[5]', value: '8', highlight: true }
    ],
    customCard: {
      title: 'Target Stair 5',
      rows: [
        { label: 'Via Stair 4 (+1)', value: '5 ways' },
        { label: 'Via Stair 3 (+2)', value: '3 ways' },
        { label: 'Total Distinct Ways', value: 'dp[5] = 5 + 3 = 8', accent: true }
      ]
    },
    formula: 'dp[5] = dp[4] + dp[3] = 5 + 3 = 8',
    action: 'Add dp[4] = 5 and dp[3] = 3 to find final total of 8 ways',
    explain: 'For stair 5, 5 routes arrive from stair 4 and 3 routes arrive from stair 3. Combining them yields 8 distinct ways to reach the top of the staircase.',
    intuition: 'The target stair n = 5 requires exactly 8 unique step combinations.'
  },
  {
    title: '7. Constant Space Optimization: O(1)',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Rolling Variables', items: ['prev2 = 3', 'prev = 5', 'cur = 8', '—', '—', '—'] },
      { label: 'Next State', items: ['prev2 = 5', 'prev = 8', '—', '—', '—', '—'] }
    ],
    activeI: 5,
    activePrev: null,
    trackTitle: 'Constant Memory Verification',
    metrics: [
      { label: 'prev2', value: 'dp[i-2] = 3' },
      { label: 'prev', value: 'dp[i-1] = 5' },
      { label: 'cur', value: 'prev + prev2 = 8' },
      { label: 'Memory', value: 'O(1) Auxiliary Space' }
    ],
    customCard: {
      title: 'State Pointer Update',
      rows: [
        { label: 'prev2 = prev', value: 'Shift prev into prev2' },
        { label: 'prev = cur', value: 'Shift cur into prev' },
        { label: 'Memory Savings', value: 'No array allocation needed', accent: true }
      ]
    },
    formula: 'prev2 = prev; prev = cur;',
    action: 'Demonstrate that two integers replace an entire array of size N',
    explain: 'Because we only need the immediately preceding two values, allocating an array of size N is redundant. We maintain prev and prev2, reducing space complexity to O(1).',
    intuition: 'Sliding two variables achieves optimal space efficiency.'
  },
  {
    title: '8. Final Result: 8 Distinct Ways',
    phase: 'COMPLETED',
    tracks: [
      { label: 'Stair Number (i)', items: ['Stair 0', 'Stair 1', 'Stair 2', 'Stair 3', 'Stair 4', 'Stair 5'] },
      { label: 'Final Ways', items: ['1', '1', '2', '3', '5', '8'] }
    ],
    activeI: 5,
    activePrev: 4,
    trackTitle: 'Optimal Solution Summary',
    metrics: [
      { label: 'Total Ways', value: '8', highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' },
      { label: 'Status', value: 'Complete' }
    ],
    customCard: {
      title: 'All 8 Valid Paths for N = 5',
      rows: [
        { label: 'All 1-steps', value: '1+1+1+1+1' },
        { label: 'Single 2-step', value: '2+1+1+1, 1+2+1+1, 1+1+2+1, 1+1+1+2 (4 ways)' },
        { label: 'Two 2-steps', value: '2+2+1, 2+1+2, 1+2+2 (3 ways)' }
      ]
    },
    formula: 'Result = prev = 8',
    action: 'Return 8 as the total distinct ways to climb 5 stairs',
    explain: 'The algorithm terminates in O(N) linear time and O(1) space. The 8 valid combinations consist of: 1 all-ones path, 4 single-two paths, and 3 double-two paths (1 + 4 + 3 = 8).',
    intuition: 'Fibonacci numbers arise naturally from independent binary choices of size 1 and 2.'
  }
];

// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'Maximum Sum of Non-Adjacent Elements (DP-5)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N) Time',
  spaceComplexity: 'O(1) Space-Optimized',
  description: 'Finds the maximum sum of a subsequence such that no two elements are adjacent. At each index i, we decide whether to Pick nums[i] (and add dp[i-2]) or Not-Pick nums[i] (keeping dp[i-1]).'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'Max Sum Non-Adjacent (DP-5)',
  nodes: [
    { id: 'root', label: 'Pick vs. Not-Pick', children: ['pick-branch', 'not-pick-branch', 'recurrence-max', 'space-reduction'] },
    { id: 'pick-branch', label: '1. Pick nums[i]', detail: 'Gain nums[i]. Because adjacent elements are prohibited, the next available subproblem is dp[i-2].' },
    { id: 'not-pick-branch', label: '2. Not Pick nums[i]', detail: 'Skip index i. The maximum sum achieved up to index i-1 remains valid: dp[i-1].' },
    { id: 'recurrence-max', label: '3. Optimal Substructure', detail: 'dp[i] = max(nums[i] + dp[i-2], dp[i-1])' },
    { id: 'space-reduction', label: '4. Two Variables O(1)', detail: 'Only prev = dp[i-1] and prev2 = dp[i-2] are needed during traversal.' }
  ]
};

export const solutions = {
  cpp: `// C++ Maximum Sum of Non-Adjacent Elements (Space-Optimized)
// Time: O(N) | Space: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maximumNonAdjacentSum(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return 0;
        int prev = nums[0];
        int prev2 = 0;

        for (int i = 1; i < n; i++) {
            int pick = nums[i] + (i > 1 ? prev2 : 0);
            int notPick = prev;
            int cur = max(pick, notPick);
            prev2 = prev;
            prev = cur;
        }

        return prev;
    }
};`,
  python: `# Python 3 Maximum Sum of Non-Adjacent Elements (Space-Optimized)
# Time: O(N) | Space: O(1)
class Solution:
    def maximumNonAdjacentSum(self, nums: list[int]) -> int:
        n = len(nums)
        if n == 0:
            return 0
        prev = nums[0]
        prev2 = 0

        for i in range(1, n):
            pick = nums[i] + (prev2 if i > 1 else 0)
            not_pick = prev
            cur = max(pick, not_pick)
            prev2 = prev
            prev = cur

        return prev`,
  java: `// Java Maximum Sum of Non-Adjacent Elements (Space-Optimized)
// Time: O(N) | Space: O(1)
class Solution {
    public int maximumNonAdjacentSum(int[] nums) {
        int n = nums.length;
        if (n == 0) return 0;
        int prev = nums[0];
        int prev2 = 0;

        for (int i = 1; i < n; i++) {
            int pick = nums[i] + (i > 1 ? prev2 : 0);
            int notPick = prev;
            int cur = Math.max(pick, notPick);
            prev2 = prev;
            prev = cur;
        }

        return prev;
    }
}`,
  javascript: `// JavaScript Maximum Sum of Non-Adjacent Elements (Space-Optimized)
// Time: O(N) | Space: O(1)
var maximumNonAdjacentSum = function(nums) {
    const n = nums.length;
    if (n === 0) return 0;
    let prev = nums[0];
    let prev2 = 0;

    for (let i = 1; i < n; i++) {
        const pick = nums[i] + (i > 1 ? prev2 : 0);
        const notPick = prev;
        const cur = Math.max(pick, notPick);
        prev2 = prev;
        prev = cur;
    }

    return prev;
};`
};

const nums = [2, 7, 9, 3, 1];

export const steps = [
  {
    title: '1. Problem Setup & Invariant Definition',
    phase: 'INITIAL',
    tracks: [
      { label: 'nums[]', items: [2, 7, 9, 3, 1] },
      { label: 'dp[] (max sum)', items: ['—', '—', '—', '—', '—'] }
    ],
    activeI: null,
    activePrev: null,
    trackTitle: 'Subsequence State Tracking',
    metrics: [
      { label: 'Array Length N', value: '5' },
      { label: 'Constraint', value: 'No adjacent picks' },
      { label: 'Space Mode', value: 'O(1) prev & prev2' }
    ],
    customCard: {
      title: 'State Transition Paradigm',
      rows: [
        { label: 'Pick nums[i]', value: 'nums[i] + dp[i - 2]' },
        { label: 'Not Pick nums[i]', value: 'dp[i - 1]' },
        { label: 'Combined', value: 'dp[i] = max(pick, notPick)', accent: true }
      ]
    },
    formula: 'dp[i] = max(nums[i] + dp[i-2], dp[i-1])',
    action: 'Initialize DP state array and establish pick vs not-pick recurrence',
    explain: 'We want to find a subset of indices with no adjacent pairs that maximizes total sum. At each step i, if we pick nums[i], we cannot pick nums[i-1], so we can only add dp[i-2]. If we skip nums[i], we inherit dp[i-1].',
    intuition: 'Each decision decomposes into independent subproblems based on whether index i is included.'
  },
  {
    title: '2. Base Case i = 0 (Only One House Available)',
    phase: 'BASE_CASES',
    tracks: [
      { label: 'nums[]', items: [2, 7, 9, 3, 1] },
      { label: 'dp[] (max sum)', items: [2, '—', '—', '—', '—'] }
    ],
    activeI: 0,
    activePrev: null,
    trackTitle: 'Base Case Initialization',
    metrics: [
      { label: 'Index i', value: '0' },
      { label: 'nums[0]', value: '2' },
      { label: 'dp[0]', value: '2' }
    ],
    customCard: {
      title: 'Decision at Index 0',
      rows: [
        { label: 'Pick nums[0]', value: '2' },
        { label: 'Skip nums[0]', value: '0' },
        { label: 'Chosen', value: 'dp[0] = 2', accent: true }
      ]
    },
    formula: 'dp[0] = nums[0] = 2',
    action: 'Pick nums[0] as it is the only element available',
    explain: 'With only index 0 in consideration, picking it yields 2 while skipping yields 0. Therefore, dp[0] = 2.',
    intuition: 'Base case: prev = nums[0] = 2, prev2 = 0.'
  },
  {
    title: '3. Index 1: Pick 7 vs Not Pick 2',
    phase: 'COMPUTE',
    tracks: [
      { label: 'nums[]', items: [2, 7, 9, 3, 1] },
      { label: 'dp[] (max sum)', items: [2, 7, '—', '—', '—'] }
    ],
    activeI: 1,
    activePrev: 0,
    trackTitle: 'Step i = 1 Evaluation',
    metrics: [
      { label: 'Index i', value: '1' },
      { label: 'nums[1]', value: '7' },
      { label: 'Pick', value: '7 + 0 = 7' },
      { label: 'Not Pick', value: 'dp[0] = 2' },
      { label: 'dp[1]', value: '7' }
    ],
    customCard: {
      title: 'Pick vs Not-Pick at i = 1',
      rows: [
        { label: 'Pick nums[1]', value: '7 + prev2 (0) = 7' },
        { label: 'Not Pick nums[1]', value: 'prev (2)' },
        { label: 'Chosen Max', value: 'max(7, 2) = 7', accent: true }
      ]
    },
    formula: 'dp[1] = max(nums[1] + 0, dp[0]) = max(7, 2) = 7',
    action: 'Compare picking nums[1] (7) against keeping previous best (2)',
    explain: 'Indices 0 and 1 are adjacent, so we cannot pick both. Picking 7 is greater than skipping (keeping 2). Thus dp[1] = 7.',
    intuition: 'Between two adjacent elements, pick the larger one.'
  },
  {
    title: '4. Index 2: Pick 9 + dp[0]=2 -> 11 vs Not Pick 7',
    phase: 'COMPUTE',
    tracks: [
      { label: 'nums[]', items: [2, 7, 9, 3, 1] },
      { label: 'dp[] (max sum)', items: [2, 7, 11, '—', '—'] }
    ],
    activeI: 2,
    activePrev: 0,
    trackTitle: 'Step i = 2 Evaluation',
    metrics: [
      { label: 'Index i', value: '2' },
      { label: 'nums[2]', value: '9' },
      { label: 'Pick (9 + dp[0])', value: '9 + 2 = 11' },
      { label: 'Not Pick (dp[1])', value: '7' },
      { label: 'dp[2]', value: '11' }
    ],
    customCard: {
      title: 'Pick vs Not-Pick at i = 2',
      rows: [
        { label: 'Pick nums[2]', value: '9 + dp[0](2) = 11' },
        { label: 'Not Pick nums[2]', value: 'dp[1](7)' },
        { label: 'Chosen Max', value: 'max(11, 7) = 11', accent: true }
      ]
    },
    formula: 'dp[2] = max(nums[2] + dp[0], dp[1]) = max(9 + 2, 7) = 11',
    action: 'Pick nums[2] and pair with dp[0] to obtain non-adjacent combination [2, 9]',
    explain: 'Picking nums[2] (9) allows adding dp[0] (2) because index 0 is non-adjacent. 9 + 2 = 11, which beats skipping (dp[1] = 7). Subsequence chosen so far: [2, 9].',
    intuition: 'Jumping over index 1 unlocks the sum 2 + 9 = 11.'
  },
  {
    title: '5. Index 3: Pick 3 + dp[1]=7 -> 10 vs Not Pick 11',
    phase: 'COMPUTE',
    tracks: [
      { label: 'nums[]', items: [2, 7, 9, 3, 1] },
      { label: 'dp[] (max sum)', items: [2, 7, 11, 11, '—'] }
    ],
    activeI: 3,
    activePrev: 1,
    trackTitle: 'Step i = 3 Evaluation',
    metrics: [
      { label: 'Index i', value: '3' },
      { label: 'nums[3]', value: '3' },
      { label: 'Pick (3 + dp[1])', value: '3 + 7 = 10' },
      { label: 'Not Pick (dp[2])', value: '11' },
      { label: 'dp[3]', value: '11' }
    ],
    customCard: {
      title: 'Pick vs Not-Pick at i = 3',
      rows: [
        { label: 'Pick nums[3]', value: '3 + dp[1](7) = 10' },
        { label: 'Not Pick nums[3]', value: 'dp[2](11)' },
        { label: 'Chosen Max', value: 'max(10, 11) = 11', accent: true }
      ]
    },
    formula: 'dp[3] = max(nums[3] + dp[1], dp[2]) = max(3 + 7, 11) = 11',
    action: 'Skip nums[3] because keeping dp[2] (11) gives higher return than 3 + 7 = 10',
    explain: 'If we pick nums[3] (3), we can only pair it with dp[1] (7), giving 10. Skipping nums[3] lets us retain dp[2] = 11. We choose to skip nums[3].',
    intuition: 'Skipping elements that contribute less than previous running maxima preserves the optimal path.'
  },
  {
    title: '6. Index 4: Pick 1 + dp[2]=11 -> 12 vs Not Pick 11',
    phase: 'COMPUTE',
    tracks: [
      { label: 'nums[]', items: [2, 7, 9, 3, 1] },
      { label: 'dp[] (max sum)', items: [2, 7, 11, 11, 12] }
    ],
    activeI: 4,
    activePrev: 2,
    trackTitle: 'Step i = 4 Evaluation',
    metrics: [
      { label: 'Index i', value: '4' },
      { label: 'nums[4]', value: '1' },
      { label: 'Pick (1 + dp[2])', value: '1 + 11 = 12' },
      { label: 'Not Pick (dp[3])', value: '11' },
      { label: 'dp[4]', value: '12' }
    ],
    customCard: {
      title: 'Pick vs Not-Pick at i = 4',
      rows: [
        { label: 'Pick nums[4]', value: '1 + dp[2](11) = 12' },
        { label: 'Not Pick nums[4]', value: 'dp[3](11)' },
        { label: 'Chosen Max', value: 'max(12, 11) = 12', accent: true }
      ]
    },
    formula: 'dp[4] = max(nums[4] + dp[2], dp[3]) = max(1 + 11, 11) = 12',
    action: 'Pick nums[4] (1) and add to dp[2] (11) yielding new peak 12',
    explain: 'Picking nums[4] (1) pairs with dp[2] (11), yielding 1 + 11 = 12. This beats skipping (dp[3] = 11). The optimal subsequence is [nums[0], nums[2], nums[4]] = [2, 9, 1], with total sum 12.',
    intuition: 'Even a small element like 1 increases the total when added to a compatible non-adjacent subproblem.'
  },
  {
    title: '7. Space Optimization: O(1) Rolling Pointers',
    phase: 'COMPUTE',
    tracks: [
      { label: 'nums[]', items: [2, 7, 9, 3, 1] },
      { label: 'Space O(1)', items: ['prev2=11', 'prev=12', 'cur=12', '—', '—'] }
    ],
    activeI: 4,
    activePrev: null,
    trackTitle: 'Constant Memory Verification',
    metrics: [
      { label: 'prev2', value: 'dp[i-2] = 11' },
      { label: 'prev', value: 'dp[i-1] = 12' },
      { label: 'Auxiliary Space', value: 'O(1) Constant' }
    ],
    customCard: {
      title: 'Rolling Variables Update',
      rows: [
        { label: 'prev2 = prev', value: '11 becomes old prev' },
        { label: 'prev = cur', value: '12 becomes new prev' },
        { label: 'Result', value: 'return prev = 12', accent: true }
      ]
    },
    formula: 'prev2 = prev; prev = cur;',
    action: 'Verify that only two integer variables are sufficient to solve the problem',
    explain: 'Since dp[i] depends solely on dp[i-1] and dp[i-2], we do not need to store the full array. Two variables (prev and prev2) reduce memory from O(N) to O(1).',
    intuition: 'Sliding a window of size 2 across the array saves O(N) space.'
  },
  {
    title: '8. Final Result: Maximum Non-Adjacent Sum = 12',
    phase: 'COMPLETED',
    tracks: [
      { label: 'nums[]', items: [2, 7, 9, 3, 1] },
      { label: 'dp[] (final)', items: [2, 7, 11, 11, 12] }
    ],
    activeI: 4,
    activePrev: null,
    trackTitle: 'Optimal Solution Found',
    metrics: [
      { label: 'Max Non-Adjacent Sum', value: '12', highlight: true },
      { label: 'Optimal Subsequence', value: '[2, 9, 1]' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    customCard: {
      title: 'Solution Summary',
      rows: [
        { label: 'Selected Elements', value: 'nums[0]=2, nums[2]=9, nums[4]=1' },
        { label: 'Total Sum', value: '2 + 9 + 1 = 12', accent: true },
        { label: 'Adjacency Check', value: 'Indices {0, 2, 4} are all non-adjacent' }
      ]
    },
    formula: 'Result = prev = 12',
    action: 'Return final maximum non-adjacent sum = 12',
    explain: 'The algorithm terminates in linear O(N) time and constant O(1) space. The maximal non-adjacent subsequence is [2, 9, 1] with a total sum of 12.',
    intuition: 'Dynamic programming turns an exponential 2^N subset problem into an elegant O(N) linear sweep.'
  }
];

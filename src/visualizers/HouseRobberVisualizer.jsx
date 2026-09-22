// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'House Robber II (Circular Street / DP-6)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N) Time',
  spaceComplexity: 'O(1) Space-Optimized',
  description: 'Houses are arranged in a circle where the first and last houses are adjacent. We decompose the circular dilemma into two independent linear subproblems: Case 1 excluding house 0, and Case 2 excluding the last house.'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'House Robber II (DP-6)',
  nodes: [
    { id: 'root', label: 'Circular Decomposition', children: ['circular-conflict', 'case-1-sub', 'case-2-sub', 'optimal-union'] },
    { id: 'circular-conflict', label: '1. Circular Conflict', detail: 'House 0 and House N-1 are adjacent. They can never both be robbed simultaneously.' },
    { id: 'case-1-sub', label: '2. Case 1: Exclude House 0', detail: 'Rob subarray nums[1..N-1]. House 0 is guaranteed untouched, avoiding circular conflict.' },
    { id: 'case-2-sub', label: '3. Case 2: Exclude House N-1', detail: 'Rob subarray nums[0..N-2]. House N-1 is guaranteed untouched.' },
    { id: 'optimal-union', label: '4. Overall Maximum', detail: 'max(robLinear(nums[1..N-1]), robLinear(nums[0..N-2])) solves the circular problem in 2 × O(N) = O(N) time.' }
  ]
};

export const solutions = {
  cpp: `// C++ House Robber II (Circular Houses)
// Time: O(N) | Space: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
private:
    int robLinear(vector<int>& nums, int start, int end) {
        int prev = 0, prev2 = 0;
        for (int i = start; i <= end; i++) {
            int pick = nums[i] + prev2;
            int notPick = prev;
            int cur = max(pick, notPick);
            prev2 = prev;
            prev = cur;
        }
        return prev;
    }

public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];

        // Case 1: Exclude first house [1..n-1]
        int case1 = robLinear(nums, 1, n - 1);
        // Case 2: Exclude last house [0..n-2]
        int case2 = robLinear(nums, 0, n - 2);

        return max(case1, case2);
    }
};`,
  python: `# Python 3 House Robber II (Circular Houses)
# Time: O(N) | Space: O(1)
class Solution:
    def rob(self, nums: list[int]) -> int:
        n = len(nums)
        if n == 1:
            return nums[0]

        def rob_linear(arr):
            prev, prev2 = 0, 0
            for val in arr:
                cur = max(val + prev2, prev)
                prev2 = prev
                prev = cur
            return prev

        case1 = rob_linear(nums[1:])
        case2 = rob_linear(nums[:-1])
        return max(case1, case2)`,
  java: `// Java House Robber II (Circular Houses)
// Time: O(N) | Space: O(1)
class Solution {
    private int robLinear(int[] nums, int start, int end) {
        int prev = 0, prev2 = 0;
        for (int i = start; i <= end; i++) {
            int pick = nums[i] + prev2;
            int notPick = prev;
            int cur = Math.max(pick, notPick);
            prev2 = prev;
            prev = cur;
        }
        return prev;
    }

    public int rob(int[] nums) {
        int n = nums.length;
        if (n == 1) return nums[0];

        int case1 = robLinear(nums, 1, n - 1);
        int case2 = robLinear(nums, 0, n - 2);

        return Math.max(case1, case2);
    }
}`,
  javascript: `// JavaScript House Robber II (Circular Houses)
// Time: O(N) | Space: O(1)
var rob = function(nums) {
    const n = nums.length;
    if (n === 1) return nums[0];

    const robLinear = (arr) => {
        let prev = 0, prev2 = 0;
        for (const val of arr) {
            const cur = Math.max(val + prev2, prev);
            prev2 = prev;
            prev = cur;
        }
        return prev;
    };

    const case1 = robLinear(nums.slice(1));
    const case2 = robLinear(nums.slice(0, n - 1));

    return Math.max(case1, case2);
};`
};

export const steps = [
  {
    title: '1. Circular Street Constraint & Dilemma',
    phase: 'INITIAL',
    tracks: [
      { label: 'Circular Street', items: ['H0: $2', 'H1: $3', 'H2: $2', 'H3: $4'] },
      { label: 'Adjacency Link', items: ['Linked to H3', 'Linked to H0', 'Linked to H1', 'Linked to H0'] }
    ],
    activeI: null,
    activePrev: null,
    trackTitle: 'Circular Topology Analysis',
    metrics: [
      { label: 'Houses N', value: '4' },
      { label: 'Circular Conflict', value: 'H0 is neighbor to H3' },
      { label: 'Strategy', value: 'Split into 2 linear runs' }
    ],
    customCard: {
      title: 'Dilemma Decomposition',
      rows: [
        { label: 'Conflict', value: 'Cannot rob both H0 and H3' },
        { label: 'Case 1', value: 'Exclude H0 -> consider houses [1, 2, 3]' },
        { label: 'Case 2', value: 'Exclude H3 -> consider houses [0, 1, 2]', accent: true }
      ]
    },
    formula: 'Result = max(robLinear(nums[1..N-1]), robLinear(nums[0..N-2]))',
    action: 'Decompose the circular constraint into two standard linear House Robber subproblems',
    explain: 'Because House 0 and House 3 are adjacent in a ring, any valid robbery plan either leaves out House 0 or leaves out House 3 (or both). We solve both cases independently and pick the higher yield.',
    intuition: 'Breaking the ring at any arbitrary point decomposes a circular graph into two linear paths.'
  },
  {
    title: '2. Case 1 Setup: Exclude House 0 [Subarray: 3, 2, 4]',
    phase: 'INITIAL',
    tracks: [
      { label: 'Subarray (Case 1)', items: ['H1: $3', 'H2: $2', 'H3: $4'] },
      { label: 'Case 1 DP', items: ['—', '—', '—'] }
    ],
    activeI: null,
    activePrev: null,
    trackTitle: 'Case 1: Houses [1..3]',
    metrics: [
      { label: 'Excluded', value: 'H0 ($2)' },
      { label: 'Candidate Houses', value: '[H1, H2, H3]' },
      { label: 'Linear Robber', value: 'Active' }
    ],
    customCard: {
      title: 'Case 1 Range',
      rows: [
        { label: 'Start Index', value: '1 (H1)' },
        { label: 'End Index', value: '3 (H3)' },
        { label: 'Constraint', value: 'No adjacent houses in [H1, H2, H3]' }
      ]
    },
    formula: 'robLinear(nums[1..3]) where nums = [3, 2, 4]',
    action: 'Begin standard House Robber 1 on subarray [3, 2, 4]',
    explain: 'By deliberately leaving out House 0, House 3 is completely free to be robbed without risking an alarm on House 0.',
    intuition: 'Removing house 0 eliminates the wrap-around edge entirely.'
  },
  {
    title: '3. Case 1 Step 1: House 1 (Val = 3)',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Subarray (Case 1)', items: ['H1: $3', 'H2: $2', 'H3: $4'] },
      { label: 'Case 1 DP', items: [3, '—', '—'] }
    ],
    activeI: 0,
    activePrev: null,
    trackTitle: 'Case 1: House 1 Evaluation',
    metrics: [
      { label: 'House', value: 'H1 ($3)' },
      { label: 'prev2', value: '0' },
      { label: 'prev', value: '3' },
      { label: 'dp[0]', value: '3' }
    ],
    customCard: {
      title: 'Case 1: Base Step',
      rows: [
        { label: 'Pick H1', value: '$3' },
        { label: 'Skip H1', value: '$0' },
        { label: 'Chosen', value: 'cur = $3', accent: true }
      ]
    },
    formula: 'cur = max(3 + 0, 0) = 3',
    action: 'Rob House 1 as the first available target in Case 1',
    explain: 'Starting at H1 ($3), only one house is available. We rob H1: cur = 3, prev = 3, prev2 = 0.',
    intuition: 'Base case for the first house in the subarray.'
  },
  {
    title: '4. Case 1 Step 2: House 2 (Val = 2) vs Keep 3',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Subarray (Case 1)', items: ['H1: $3', 'H2: $2', 'H3: $4'] },
      { label: 'Case 1 DP', items: [3, 3, '—'] }
    ],
    activeI: 1,
    activePrev: 0,
    trackTitle: 'Case 1: House 2 Evaluation',
    metrics: [
      { label: 'House', value: 'H2 ($2)' },
      { label: 'Pick (2 + 0)', value: '2' },
      { label: 'Not Pick (prev)', value: '3' },
      { label: 'dp[1]', value: '3' }
    ],
    customCard: {
      title: 'Case 1: Pick vs Skip at H2',
      rows: [
        { label: 'Pick H2', value: '2 + prev2(0) = 2' },
        { label: 'Skip H2', value: 'prev = 3' },
        { label: 'Chosen', value: 'max(2, 3) = 3', accent: true }
      ]
    },
    formula: 'cur = max(2 + 0, 3) = 3',
    action: 'Skip House 2 to keep higher loot from House 1',
    explain: 'Robbing H2 gives 2; skipping H2 retains prev = 3. We skip H2: prev2 becomes 3, prev becomes 3.',
    intuition: 'Adjacent houses H1 and H2 cannot both be robbed.'
  },
  {
    title: '5. Case 1 Step 3: House 3 (Val = 4) -> Total = 7',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Subarray (Case 1)', items: ['H1: $3', 'H2: $2', 'H3: $4'] },
      { label: 'Case 1 DP', items: [3, 3, 7] }
    ],
    activeI: 2,
    activePrev: 0,
    trackTitle: 'Case 1 Complete: Total = 7',
    metrics: [
      { label: 'House', value: 'H3 ($4)' },
      { label: 'Pick (4 + prev2)', value: '4 + 3 = 7' },
      { label: 'Not Pick', value: '3' },
      { label: 'Case 1 Max', value: '7', highlight: true }
    ],
    customCard: {
      title: 'Case 1: Pick H3',
      rows: [
        { label: 'Pick H3', value: '4 + prev2(3) = 7' },
        { label: 'Skip H3', value: 'prev = 3' },
        { label: 'Case 1 Result', value: 'max(7, 3) = 7 (Rob H1 and H3)', accent: true }
      ]
    },
    formula: 'cur = max(4 + 3, 3) = 7 -> Case 1 Result = 7',
    action: 'Rob House 3 combined with House 1 for a total of 7',
    explain: 'Picking H3 ($4) pairs with non-adjacent H1 ($3), yielding 4 + 3 = 7. Case 1 maximum loot = 7.',
    intuition: 'H3 and H1 are non-adjacent in the linear subproblem, yielding maximum yield.'
  },
  {
    title: '6. Case 2 Setup: Exclude House 3 [Subarray: 2, 3, 2]',
    phase: 'INITIAL',
    tracks: [
      { label: 'Subarray (Case 2)', items: ['H0: $2', 'H1: $3', 'H2: $2'] },
      { label: 'Case 2 DP', items: ['—', '—', '—'] }
    ],
    activeI: null,
    activePrev: null,
    trackTitle: 'Case 2: Houses [0..2]',
    metrics: [
      { label: 'Excluded', value: 'H3 ($4)' },
      { label: 'Candidate Houses', value: '[H0, H1, H2]' },
      { label: 'Case 1 Found', value: '7' }
    ],
    customCard: {
      title: 'Case 2 Range',
      rows: [
        { label: 'Start Index', value: '0 (H0)' },
        { label: 'End Index', value: '2 (H2)' },
        { label: 'Constraint', value: 'H3 is strictly excluded' }
      ]
    },
    formula: 'robLinear(nums[0..2]) where nums = [2, 3, 2]',
    action: 'Begin standard House Robber 1 on subarray [2, 3, 2]',
    explain: 'By excluding House 3, House 0 is completely free to be robbed without conflicting with House 3.',
    intuition: 'Evaluating Case 2 ensures we do not miss an optimal solution that includes House 0.'
  },
  {
    title: '7. Case 2 Step 1 & 2: House 0 & House 1',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Subarray (Case 2)', items: ['H0: $2', 'H1: $3', 'H2: $2'] },
      { label: 'Case 2 DP', items: [2, 3, '—'] }
    ],
    activeI: 1,
    activePrev: 0,
    trackTitle: 'Case 2: H0 and H1 Evaluation',
    metrics: [
      { label: 'H0 val', value: '2 -> dp[0] = 2' },
      { label: 'H1 val', value: '3' },
      { label: 'dp[1]', value: 'max(3+0, 2) = 3' }
    ],
    customCard: {
      title: 'Case 2: First Two Houses',
      rows: [
        { label: 'At H0', value: 'dp[0] = 2' },
        { label: 'At H1', value: 'Pick H1(3) vs Skip H0(2) -> 3' },
        { label: 'Status', value: 'prev = 3, prev2 = 2', accent: true }
      ]
    },
    formula: 'dp[1] = max(3 + 0, 2) = 3',
    action: 'Evaluate first two houses in Case 2',
    explain: 'H0 gives 2. For H1 ($3), robbing it gives 3 which beats skipping (2). So prev = 3, prev2 = 2.',
    intuition: 'At index 1, robbing H1 alone is optimal.'
  },
  {
    title: '8. Case 2 Step 3: House 2 (Val = 2) -> Total = 4',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Subarray (Case 2)', items: ['H0: $2', 'H1: $3', 'H2: $2'] },
      { label: 'Case 2 DP', items: [2, 3, 4] }
    ],
    activeI: 2,
    activePrev: 0,
    trackTitle: 'Case 2 Complete: Total = 4',
    metrics: [
      { label: 'House', value: 'H2 ($2)' },
      { label: 'Pick (2 + prev2)', value: '2 + 2 = 4' },
      { label: 'Not Pick', value: '3' },
      { label: 'Case 2 Max', value: '4', highlight: true }
    ],
    customCard: {
      title: 'Case 2: Pick H2',
      rows: [
        { label: 'Pick H2', value: '2 + prev2(2) = 4' },
        { label: 'Skip H2', value: 'prev = 3' },
        { label: 'Case 2 Result', value: 'max(4, 3) = 4 (Rob H0 and H2)', accent: true }
      ]
    },
    formula: 'cur = max(2 + 2, 3) = 4 -> Case 2 Result = 4',
    action: 'Rob House 2 combined with House 0 for a total of 4',
    explain: 'Picking H2 ($2) pairs with non-adjacent H0 ($2), giving 2 + 2 = 4. Case 2 maximum loot = 4.',
    intuition: 'Robbing H0 and H2 yields 4, which is valid because H3 was excluded.'
  },
  {
    title: '9. Final Comparison: max(Case 1, Case 2) = 7',
    phase: 'COMPLETED',
    tracks: [
      { label: 'Case Comparison', items: ['Case 1 (exclude H0): 7', 'Case 2 (exclude H3): 4', 'Winner: Case 1', '—'] },
      { label: 'Houses Robbed', items: ['H1 ($3)', 'H3 ($4)', 'Total Loot: $7', '—'] }
    ],
    activeI: 0,
    activePrev: 1,
    trackTitle: 'Global Optimum Reached',
    metrics: [
      { label: 'Case 1 Loot', value: '$7' },
      { label: 'Case 2 Loot', value: '$4' },
      { label: 'Max Loot', value: '$7', highlight: true },
      { label: 'Time Complexity', value: 'O(N)' }
    ],
    customCard: {
      title: 'Circular Problem Solved',
      rows: [
        { label: 'Optimal Choice', value: 'Rob House 1 ($3) and House 3 ($4)' },
        { label: 'Total Loot', value: '$7', accent: true },
        { label: 'Ring Invariant', value: 'H0 was skipped, so H3 is non-adjacent' }
      ]
    },
    formula: 'Overall Max = max(7, 4) = 7',
    action: 'Select maximum of both subproblems: return 7',
    explain: 'Comparing both mutually exhaustive cases: Case 1 gave 7 and Case 2 gave 4. The maximum loot obtainable without triggering circular alarms is 7.',
    intuition: 'Two linear O(N) passes completely conquer the circular boundary condition.'
  }
];

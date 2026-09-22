// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'Frog Jump (DP-3)',
  category: 'Dynamic Programming',
  difficulty: 'Easy',
  timeComplexity: 'O(N) Time',
  spaceComplexity: 'O(1) Space-Optimized',
  description: 'Calculates the minimum energy required for a frog to reach the last stair from stair 0. At each stair i, the frog can jump 1 step or 2 steps forward, consuming energy equal to |heights[i] - heights[previous]|.'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'Frog Jump (DP-3)',
  nodes: [
    { id: 'root', label: 'Stair Energy Minimization', children: ['one-step', 'two-step', 'optimal-substructure', 'space-compression'] },
    { id: 'one-step', label: '1. Jump 1 Step', detail: 'Jump from i-1: cost = dp[i-1] + |heights[i] - heights[i-1]|' },
    { id: 'two-step', label: '2. Jump 2 Steps', detail: 'Jump from i-2 (if i > 1): cost = dp[i-2] + |heights[i] - heights[i-2]|' },
    { id: 'optimal-substructure', label: '3. Min Energy Choice', detail: 'dp[i] = min(jumpOne, jumpTwo)' },
    { id: 'space-compression', label: '4. Two Variables O(1)', detail: 'Only prev = dp[i-1] and prev2 = dp[i-2] are maintained.' }
  ]
};

export const solutions = {
  cpp: `// C++ Frog Jump (Space-Optimized)
// Time: O(N) | Space: O(1)
#include <vector>
#include <cmath>
#include <algorithm>
using namespace std;

class Solution {
public:
    int frogJump(int n, vector<int>& heights) {
        int prev = 0;   // min energy to reach stair 0
        int prev2 = 0;

        for (int i = 1; i < n; i++) {
            int jumpOne = prev + abs(heights[i] - heights[i - 1]);
            int jumpTwo = 1e9;
            if (i > 1) {
                jumpTwo = prev2 + abs(heights[i] - heights[i - 2]);
            }
            int cur = min(jumpOne, jumpTwo);
            prev2 = prev;
            prev = cur;
        }

        return prev;
    }
};`,
  python: `# Python 3 Frog Jump (Space-Optimized)
# Time: O(N) | Space: O(1)
class Solution:
    def frogJump(self, n: int, heights: list[int]) -> int:
        prev = 0
        prev2 = 0

        for i in range(1, n):
            jump_one = prev + abs(heights[i] - heights[i - 1])
            jump_two = float('inf')
            if i > 1:
                jump_two = prev2 + abs(heights[i] - heights[i - 2])
            cur = min(jump_one, jump_two)
            prev2 = prev
            prev = cur

        return prev`,
  java: `// Java Frog Jump (Space-Optimized)
// Time: O(N) | Space: O(1)
class Solution {
    public int frogJump(int n, int[] heights) {
        int prev = 0;
        int prev2 = 0;

        for (int i = 1; i < n; i++) {
            int jumpOne = prev + Math.abs(heights[i] - heights[i - 1]);
            int jumpTwo = Integer.MAX_VALUE;
            if (i > 1) {
                jumpTwo = prev2 + Math.abs(heights[i] - heights[i - 2]);
            }
            int cur = Math.min(jumpOne, jumpTwo);
            prev2 = prev;
            prev = cur;
        }

        return prev;
    }
}`,
  javascript: `// JavaScript Frog Jump (Space-Optimized)
// Time: O(N) | Space: O(1)
var frogJump = function(n, heights) {
    let prev = 0;
    let prev2 = 0;

    for (let i = 1; i < n; i++) {
        const jumpOne = prev + Math.abs(heights[i] - heights[i - 1]);
        let jumpTwo = Infinity;
        if (i > 1) {
            jumpTwo = prev2 + Math.abs(heights[i] - heights[i - 2]);
        }
        const cur = Math.min(jumpOne, jumpTwo);
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
      { label: 'Heights', items: [30, 10, 60, 10, 60, 50] },
      { label: 'dp (Min Energy)', items: ['—', '—', '—', '—', '—', '—'] }
    ],
    activeI: null,
    activePrev: null,
    trackTitle: 'Stair Energy Model',
    metrics: [
      { label: 'Total Stairs N', value: '6' },
      { label: 'Allowed Steps', value: '+1 or +2' },
      { label: 'Energy Cost', value: '|height[i] - height[prev]|' }
    ],
    customCard: {
      title: 'Jump Cost Options',
      rows: [
        { label: '1-Step Jump', value: 'dp[i-1] + |heights[i] - heights[i-1]|' },
        { label: '2-Step Jump', value: 'dp[i-2] + |heights[i] - heights[i-2]|' },
        { label: 'Recurrence', value: 'dp[i] = min(jump1, jump2)', accent: true }
      ]
    },
    formula: 'dp[i] = min(dp[i-1] + |h[i]-h[i-1]|, dp[i-2] + |h[i]-h[i-2]|)',
    action: 'Initialize DP table and define single vs double step energy transitions',
    explain: 'The frog starts at stair 0 with 0 energy consumed. At each stair i, it evaluates whether hopping 1 step from i-1 or 2 steps from i-2 expends less total energy.',
    intuition: 'Optimal substructure ensures the cheapest path to stair i comes from the cheapest path to i-1 or i-2.'
  },
  {
    title: '2. Base Case: Stair 0 (Start)',
    phase: 'BASE_CASES',
    tracks: [
      { label: 'Heights', items: [30, 10, 60, 10, 60, 50] },
      { label: 'dp (Min Energy)', items: [0, '—', '—', '—', '—', '—'] }
    ],
    activeI: 0,
    activePrev: null,
    trackTitle: 'Base Case Initialization',
    metrics: [
      { label: 'Stair i', value: '0' },
      { label: 'Height', value: '30' },
      { label: 'Energy dp[0]', value: '0' }
    ],
    customCard: {
      title: 'Starting Point',
      rows: [
        { label: 'Start Stair', value: '0' },
        { label: 'Initial Energy', value: '0' },
        { label: 'State', value: 'prev = 0, prev2 = 0', accent: true }
      ]
    },
    formula: 'dp[0] = 0',
    action: 'Set base case dp[0] = 0 as no jumps have been made',
    explain: 'Starting at stair 0 requires zero energy. dp[0] = 0.',
    intuition: 'Zero movement corresponds to zero energy consumed.'
  },
  {
    title: '3. Stair 1: Single Step from Stair 0',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Heights', items: [30, 10, 60, 10, 60, 50] },
      { label: 'dp (Min Energy)', items: [0, 20, '—', '—', '—', '—'] }
    ],
    activeI: 1,
    activePrev: 0,
    trackTitle: 'Step i = 1 Evaluation',
    metrics: [
      { label: 'Stair i', value: '1' },
      { label: 'Height Diff', value: '|10 - 30| = 20' },
      { label: '1-Step Jump', value: '0 + 20 = 20' },
      { label: '2-Step Jump', value: 'N/A' }
    ],
    customCard: {
      title: 'Stair 1 Options',
      rows: [
        { label: 'From Stair 0', value: 'dp[0](0) + |10 - 30| = 20' },
        { label: 'From Stair -1', value: 'Impossible' },
        { label: 'Chosen dp[1]', value: '20', accent: true }
      ]
    },
    formula: 'dp[1] = dp[0] + |10 - 30| = 20',
    action: 'Compute single jump from stair 0 to stair 1',
    explain: 'From stair 0, the frog can only jump 1 step to stair 1. Energy cost = |10 - 30| = 20. dp[1] = 20.',
    intuition: 'Only 1-step jump is valid for reaching index 1.'
  },
  {
    title: '4. Stair 2: Compare 1-Step (70) vs 2-Step (30)',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Heights', items: [30, 10, 60, 10, 60, 50] },
      { label: 'dp (Min Energy)', items: [0, 20, 30, '—', '—', '—'] }
    ],
    activeI: 2,
    activePrev: 0,
    trackTitle: 'Step i = 2 Evaluation',
    metrics: [
      { label: 'Stair i', value: '2 (H=60)' },
      { label: '1-Step from 1', value: '20 + |60-10| = 70' },
      { label: '2-Step from 0', value: '0 + |60-30| = 30' },
      { label: 'dp[2]', value: '30' }
    ],
    customCard: {
      title: 'Stair 2 Comparison',
      rows: [
        { label: 'From Stair 1 (1-step)', value: '20 + 50 = 70' },
        { label: 'From Stair 0 (2-step)', value: '0 + 30 = 30' },
        { label: 'Winner', value: 'min(70, 30) = 30 (Jump from 0)', accent: true }
      ]
    },
    formula: 'dp[2] = min(dp[1] + 50, dp[0] + 30) = min(70, 30) = 30',
    action: 'Select 2-step jump directly from stair 0 to save 40 energy',
    explain: 'Jumping from stair 1 costs 20 + |60 - 10| = 70. Jumping directly from stair 0 costs 0 + |60 - 30| = 30. The 2-step jump saves 40 energy! dp[2] = 30.',
    intuition: 'Directly jumping 2 steps bypasses intermediate high-cost altitude differences.'
  },
  {
    title: '5. Stair 3: Compare 1-Step (80) vs 2-Step (20)',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Heights', items: [30, 10, 60, 10, 60, 50] },
      { label: 'dp (Min Energy)', items: [0, 20, 30, 20, '—', '—'] }
    ],
    activeI: 3,
    activePrev: 1,
    trackTitle: 'Step i = 3 Evaluation',
    metrics: [
      { label: 'Stair i', value: '3 (H=10)' },
      { label: '1-Step from 2', value: '30 + |10-60| = 80' },
      { label: '2-Step from 1', value: '20 + |10-10| = 20' },
      { label: 'dp[3]', value: '20' }
    ],
    customCard: {
      title: 'Stair 3 Comparison',
      rows: [
        { label: 'From Stair 2 (1-step)', value: '30 + 50 = 80' },
        { label: 'From Stair 1 (2-step)', value: '20 + 0 = 20' },
        { label: 'Winner', value: 'min(80, 20) = 20 (Jump from 1)', accent: true }
      ]
    },
    formula: 'dp[3] = min(dp[2] + 50, dp[1] + 0) = min(80, 20) = 20',
    action: 'Select 2-step jump from stair 1 with zero additional energy cost',
    explain: 'From stair 1 (height 10) to stair 3 (height 10), height difference is 0! Total energy = 20 + 0 = 20. Jumping from stair 2 costs 80. dp[3] = 20.',
    intuition: 'Jumping between stairs of identical height costs 0 incremental energy.'
  },
  {
    title: '6. Stair 4: Compare 1-Step (70) vs 2-Step (30)',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Heights', items: [30, 10, 60, 10, 60, 50] },
      { label: 'dp (Min Energy)', items: [0, 20, 30, 20, 30, '—'] }
    ],
    activeI: 4,
    activePrev: 2,
    trackTitle: 'Step i = 4 Evaluation',
    metrics: [
      { label: 'Stair i', value: '4 (H=60)' },
      { label: '1-Step from 3', value: '20 + |60-10| = 70' },
      { label: '2-Step from 2', value: '30 + |60-60| = 30' },
      { label: 'dp[4]', value: '30' }
    ],
    customCard: {
      title: 'Stair 4 Comparison',
      rows: [
        { label: 'From Stair 3 (1-step)', value: '20 + 50 = 70' },
        { label: 'From Stair 2 (2-step)', value: '30 + 0 = 30' },
        { label: 'Winner', value: 'min(70, 30) = 30 (Jump from 2)', accent: true }
      ]
    },
    formula: 'dp[4] = min(dp[3] + 50, dp[2] + 0) = min(70, 30) = 30',
    action: 'Select 2-step jump from stair 2; height difference is 0',
    explain: 'Stair 2 and stair 4 both have height 60, giving |60 - 60| = 0. Total energy = 30 + 0 = 30. Jumping from stair 3 costs 70. dp[4] = 30.',
    intuition: 'Matching heights allow massive leaps at zero additional penalty.'
  },
  {
    title: '7. Stair 5: Final Stair Reached',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Heights', items: [30, 10, 60, 10, 60, 50] },
      { label: 'dp (Min Energy)', items: [0, 20, 30, 20, 30, 40] }
    ],
    activeI: 5,
    activePrev: 4,
    trackTitle: 'Step i = 5 (Target Stair)',
    metrics: [
      { label: 'Stair i', value: '5 (H=50)' },
      { label: '1-Step from 4', value: '30 + |50-60| = 40' },
      { label: '2-Step from 3', value: '20 + |50-10| = 60' },
      { label: 'dp[5]', value: '40', highlight: true }
    ],
    customCard: {
      title: 'Target Stair 5 Comparison',
      rows: [
        { label: 'From Stair 4 (1-step)', value: '30 + 10 = 40' },
        { label: 'From Stair 3 (2-step)', value: '20 + 40 = 60' },
        { label: 'Winner', value: 'min(40, 60) = 40 (Jump from 4)', accent: true }
      ]
    },
    formula: 'dp[5] = min(dp[4] + 10, dp[3] + 40) = min(40, 60) = 40',
    action: '1-step jump from stair 4 yields the minimum total energy of 40',
    explain: 'From stair 4 (height 60) to 5 (height 50) costs 10 energy, giving 30 + 10 = 40. From stair 3 (height 10) costs 40 energy, giving 20 + 40 = 60. Final minimum energy is 40.',
    intuition: 'Taking the 1-step jump from stair 4 is strictly better by 20 units.'
  },
  {
    title: '8. Optimal Jump Path & Complexity Verification',
    phase: 'COMPLETED',
    tracks: [
      { label: 'Heights', items: [30, 10, 60, 10, 60, 50] },
      { label: 'Optimal Path', items: ['Start (0)', '—', 'Jump (2)', '—', 'Jump (4)', 'End (5)'] }
    ],
    activeI: 5,
    activePrev: 4,
    trackTitle: 'Optimal Solution Summary',
    metrics: [
      { label: 'Min Energy', value: '40', highlight: true },
      { label: 'Jump Sequence', value: '0 → 2 → 4 → 5' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    customCard: {
      title: 'Trajectory Energy Breakdown',
      rows: [
        { label: 'Stair 0 -> Stair 2', value: '|60 - 30| = 30' },
        { label: 'Stair 2 -> Stair 4', value: '|60 - 60| = 0' },
        { label: 'Stair 4 -> Stair 5', value: '|50 - 60| = 10' },
        { label: 'Total Energy', value: '30 + 0 + 10 = 40', accent: true }
      ]
    },
    formula: 'Result = prev = 40',
    action: 'Return final energy 40 achieved in O(N) time and O(1) space',
    explain: 'The optimal trajectory hops: Stair 0 (30) -> Stair 2 (60) [cost 30] -> Stair 4 (60) [cost 0] -> Stair 5 (50) [cost 10]. Total energy = 40.',
    intuition: 'Rolling prev and prev2 variables guarantee constant space O(1) execution.'
  }
];

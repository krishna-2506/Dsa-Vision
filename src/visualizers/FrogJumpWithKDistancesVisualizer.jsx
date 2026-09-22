// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'Frog Jump with K Distances (DP-4)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N × K) Time',
  spaceComplexity: 'O(N) Space',
  description: 'Generalizes Frog Jump allowing jumps of up to K stairs forward at any point. At each stair i, we inspect all previous accessible stairs (i - j) for 1 <= j <= K to minimize total energy.'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'Frog Jump with K Distances (DP-4)',
  nodes: [
    { id: 'root', label: 'K-Step Energy Minimization', children: ['k-branching', 'inner-loop-scan', 'optimal-substructure', 'time-space-tradeoff'] },
    { id: 'k-branching', label: '1. K Leaping Options', detail: 'From any stair i, the frog can originate from any stone (i - j) where 1 <= j <= K and i - j >= 0.' },
    { id: 'inner-loop-scan', label: '2. Inner Loop Min Scan', detail: 'jumpCost = dp[i - j] + |heights[i] - heights[i - j]| for all j in 1..K.' },
    { id: 'optimal-substructure', label: '3. Min Energy Choice', detail: 'dp[i] = min_{1<=j<=K}(dp[i - j] + |h[i] - h[i - j]|)' },
    { id: 'time-space-tradeoff', label: '4. Complexity O(N × K)', detail: 'N states each requiring K inner comparisons gives O(N × K) time with O(N) array storage.' }
  ]
};

export const solutions = {
  cpp: `// C++ Frog Jump with K Distances
// Time: O(N * K) | Space: O(N)
#include <vector>
#include <cmath>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minimizeCost(int n, int k, vector<int>& heights) {
        vector<int> dp(n, 1e9);
        dp[0] = 0;

        for (int i = 1; i < n; i++) {
            for (int j = 1; j <= k && (i - j) >= 0; j++) {
                int jumpCost = dp[i - j] + abs(heights[i] - heights[i - j]);
                dp[i] = min(dp[i], jumpCost);
            }
        }

        return dp[n - 1];
    }
};`,
  python: `# Python 3 Frog Jump with K Distances
# Time: O(N * K) | Space: O(N)
class Solution:
    def minimizeCost(self, n: int, k: int, heights: list[int]) -> int:
        dp = [float('inf')] * n
        dp[0] = 0

        for i in range(1, n):
            for j in range(1, k + 1):
                if i - j >= 0:
                    jump_cost = dp[i - j] + abs(heights[i] - heights[i - j])
                    dp[i] = min(dp[i], jump_cost)

        return dp[n - 1]`,
  java: `// Java Frog Jump with K Distances
// Time: O(N * K) | Space: O(N)
import java.util.Arrays;

class Solution {
    public int minimizeCost(int n, int k, int[] heights) {
        int[] dp = new int[n];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;

        for (int i = 1; i < n; i++) {
            for (int j = 1; j <= k && (i - j) >= 0; j++) {
                int jumpCost = dp[i - j] + Math.abs(heights[i] - heights[i - j]);
                dp[i] = Math.min(dp[i], jumpCost);
            }
        }

        return dp[n - 1];
    }
}`,
  javascript: `// JavaScript Frog Jump with K Distances
// Time: O(N * K) | Space: O(N)
var minimizeCost = function(n, k, heights) {
    const dp = new Array(n).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i < n; i++) {
        for (let j = 1; j <= k && (i - j) >= 0; j++) {
            const jumpCost = dp[i - j] + Math.abs(heights[i] - heights[i - j]);
            dp[i] = Math.min(dp[i], jumpCost);
        }
    }

    return dp[n - 1];
};`
};

export const steps = [
  {
    title: '1. K-Distance Generalization & Problem Setup',
    phase: 'INITIAL',
    tracks: [
      { label: 'Heights', items: [10, 30, 40, 50, 20] },
      { label: 'dp (Min Energy)', items: ['—', '—', '—', '—', '—'] }
    ],
    activeI: null,
    activePrev: null,
    trackTitle: 'K-Step Transition State',
    metrics: [
      { label: 'Stairs N', value: '5' },
      { label: 'Max Jump K', value: '3' },
      { label: 'Time Complexity', value: 'O(N × K)' }
    ],
    customCard: {
      title: 'K-Step Jump Recurrence',
      rows: [
        { label: 'Allowed Jumps', value: 'j in {1, 2, ..., K}' },
        { label: 'Jump Formula', value: 'dp[i-j] + |heights[i] - heights[i-j]|' },
        { label: 'Min Scan', value: 'dp[i] = min_{1<=j<=k}(jumpCost)', accent: true }
      ]
    },
    formula: 'dp[i] = min_{1<=j<=K, i-j>=0} (dp[i-j] + |heights[i] - heights[i-j]|)',
    action: 'Initialize DP table for N=5 stones with maximum leap distance K=3',
    explain: 'Instead of being limited to 1 or 2 steps, the frog can jump up to K=3 stairs in a single bound. At each stair i, an inner loop checks all valid ancestors (i - 1, i - 2, ..., i - K).',
    intuition: 'Larger K gives greater flexibility to bypass expensive intermediate peaks.'
  },
  {
    title: '2. Base Case: Stair 0',
    phase: 'BASE_CASES',
    tracks: [
      { label: 'Heights', items: [10, 30, 40, 50, 20] },
      { label: 'dp (Min Energy)', items: [0, '—', '—', '—', '—'] }
    ],
    activeI: 0,
    activePrev: null,
    trackTitle: 'Base Case Initialization',
    metrics: [
      { label: 'Stair i', value: '0' },
      { label: 'Height', value: '10' },
      { label: 'dp[0]', value: '0' }
    ],
    customCard: {
      title: 'Stair 0 Origin',
      rows: [
        { label: 'Starting Stone', value: 'Stair 0' },
        { label: 'Energy Spent', value: '0' },
        { label: 'dp[0]', value: '0', accent: true }
      ]
    },
    formula: 'dp[0] = 0',
    action: 'Set base case dp[0] = 0',
    explain: 'At the starting stair 0, energy consumed is 0. dp[0] = 0.',
    intuition: 'Zero movement requires zero energy.'
  },
  {
    title: '3. Stair 1: Single Jump from 0',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Heights', items: [10, 30, 40, 50, 20] },
      { label: 'dp (Min Energy)', items: [0, 20, '—', '—', '—'] }
    ],
    activeI: 1,
    activePrev: 0,
    trackTitle: 'Step i = 1 Evaluation',
    metrics: [
      { label: 'Stair i', value: '1 (H=30)' },
      { label: 'Valid j', value: 'j = 1 only' },
      { label: 'Cost', value: '0 + |30-10| = 20' },
      { label: 'dp[1]', value: '20' }
    ],
    customCard: {
      title: 'Stair 1 Ancestors',
      rows: [
        { label: 'j = 1 (from 0)', value: 'dp[0](0) + |30 - 10| = 20' },
        { label: 'j = 2, 3', value: 'Out of bounds (i - j < 0)' },
        { label: 'dp[1]', value: '20', accent: true }
      ]
    },
    formula: 'dp[1] = dp[0] + |30 - 10| = 20',
    action: 'Only j = 1 is in bounds; compute energy = 20',
    explain: 'Only stone 0 can reach stone 1. Cost is dp[0] + |30 - 10| = 20. dp[1] = 20.',
    intuition: 'Boundary conditions restrict available choices near the start of the array.'
  },
  {
    title: '4. Stair 2: Jumps from Stair 1 (j=1) and Stair 0 (j=2)',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Heights', items: [10, 30, 40, 50, 20] },
      { label: 'dp (Min Energy)', items: [0, 20, 30, '—', '—'] }
    ],
    activeI: 2,
    activePrev: 1,
    trackTitle: 'Step i = 2 Evaluation',
    metrics: [
      { label: 'Stair i', value: '2 (H=40)' },
      { label: 'From 1 (j=1)', value: '20 + |40-30| = 30' },
      { label: 'From 0 (j=2)', value: '0 + |40-10| = 30' },
      { label: 'dp[2]', value: '30' }
    ],
    customCard: {
      title: 'Stair 2 Comparison',
      rows: [
        { label: 'j = 1 (from 1)', value: '20 + 10 = 30' },
        { label: 'j = 2 (from 0)', value: '0 + 30 = 30' },
        { label: 'Chosen dp[2]', value: 'min(30, 30) = 30', accent: true }
      ]
    },
    formula: 'dp[2] = min(dp[1] + 10, dp[0] + 30) = min(30, 30) = 30',
    action: 'Evaluate j in {1, 2}; both give equal minimum cost 30',
    explain: 'Hopping 1 step from stone 1 costs 20 + 10 = 30. Hopping 2 steps from stone 0 costs 0 + 30 = 30. Both yield 30. dp[2] = 30.',
    intuition: 'Multiple distinct jump routes can tie for minimum cost.'
  },
  {
    title: '5. Stair 3: Full K = 3 Jumps Evaluated',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Heights', items: [10, 30, 40, 50, 20] },
      { label: 'dp (Min Energy)', items: [0, 20, 30, 40, '—'] }
    ],
    activeI: 3,
    activePrev: 2,
    trackTitle: 'Step i = 3 Evaluation',
    metrics: [
      { label: 'Stair i', value: '3 (H=50)' },
      { label: 'From 2 (j=1)', value: '30 + 10 = 40' },
      { label: 'From 1 (j=2)', value: '20 + 20 = 40' },
      { label: 'From 0 (j=3)', value: '0 + 40 = 40' }
    ],
    customCard: {
      title: 'Stair 3: All 3 Options',
      rows: [
        { label: 'j = 1 (from 2)', value: '30 + |50 - 40| = 40' },
        { label: 'j = 2 (from 1)', value: '20 + |50 - 30| = 40' },
        { label: 'j = 3 (from 0)', value: '0 + |50 - 10| = 40' },
        { label: 'Chosen dp[3]', value: 'min(40, 40, 40) = 40', accent: true }
      ]
    },
    formula: 'dp[3] = min(dp[2]+10, dp[1]+20, dp[0]+40) = min(40, 40, 40) = 40',
    action: 'All K=3 jump candidates yield cost 40; dp[3] = 40',
    explain: 'At stair 3, all 3 jump sizes (j=1, 2, 3) are valid, and each happens to sum to 40. dp[3] = 40.',
    intuition: 'Each additional leap option adds one comparison to the inner loop.'
  },
  {
    title: '6. Stair 4: Evaluating j = 1 (Jump from 3)',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Heights', items: [10, 30, 40, 50, 20] },
      { label: 'dp (Min Energy)', items: [0, 20, 30, 40, 70] }
    ],
    activeI: 4,
    activePrev: 3,
    trackTitle: 'Step i = 4 (Candidate j = 1)',
    metrics: [
      { label: 'Target Stair', value: '4 (H=20)' },
      { label: 'From Stair 3', value: 'dp[3]=40' },
      { label: 'Cost', value: '40 + |20-50| = 70' },
      { label: 'Current Min', value: '70' }
    ],
    customCard: {
      title: 'Candidate j = 1',
      rows: [
        { label: 'From Stair 3', value: 'dp[3] = 40' },
        { label: 'Height Jump', value: '|20 - 50| = 30' },
        { label: 'Candidate Cost', value: '40 + 30 = 70', accent: true }
      ]
    },
    formula: 'candidate(j=1) = dp[3] + |20 - 50| = 70',
    action: 'First candidate j = 1 gives cost 70',
    explain: 'Jumping 1 step from stair 3 (height 50) to 4 (height 20) incurs 30 energy: 40 + 30 = 70. We proceed to inspect j = 2.',
    intuition: 'Steep height drop from 50 to 20 makes a 1-step jump costly.'
  },
  {
    title: '7. Stair 4: Evaluating j = 2 (Jump from 2)',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Heights', items: [10, 30, 40, 50, 20] },
      { label: 'dp (Min Energy)', items: [0, 20, 30, 40, 50] }
    ],
    activeI: 4,
    activePrev: 2,
    trackTitle: 'Step i = 4 (Candidate j = 2)',
    metrics: [
      { label: 'Target Stair', value: '4 (H=20)' },
      { label: 'From Stair 2', value: 'dp[2]=30' },
      { label: 'Cost', value: '30 + |20-40| = 50' },
      { label: 'Current Min', value: '50' }
    ],
    customCard: {
      title: 'Candidate j = 2',
      rows: [
        { label: 'From Stair 2', value: 'dp[2] = 30' },
        { label: 'Height Jump', value: '|20 - 40| = 20' },
        { label: 'Candidate Cost', value: '30 + 20 = 50 (beats 70!)', accent: true }
      ]
    },
    formula: 'candidate(j=2) = dp[2] + |20 - 40| = 50 < 70 -> update to 50',
    action: 'Candidate j = 2 gives cost 50; update minimum to 50',
    explain: 'Jumping 2 steps from stair 2 (height 40) costs 30 + |20 - 40| = 50. This is 20 units cheaper than jumping from stair 3.',
    intuition: 'Bypassing stair 3 entirely avoids the extreme altitude peak of 50.'
  },
  {
    title: '8. Stair 4: Evaluating j = 3 (Jump from 1) -> WINNER!',
    phase: 'COMPUTE',
    tracks: [
      { label: 'Heights', items: [10, 30, 40, 50, 20] },
      { label: 'dp (Min Energy)', items: [0, 20, 30, 40, 30] }
    ],
    activeI: 4,
    activePrev: 1,
    trackTitle: 'Step i = 4 (Candidate j = 3)',
    metrics: [
      { label: 'Target Stair', value: '4 (H=20)' },
      { label: 'From Stair 1', value: 'dp[1]=20' },
      { label: 'Cost', value: '20 + |20-30| = 30' },
      { label: 'Final Min dp[4]', value: '30', highlight: true }
    ],
    customCard: {
      title: 'Candidate j = 3 (Leap Across 3 Stones)',
      rows: [
        { label: 'From Stair 1', value: 'dp[1] = 20' },
        { label: 'Height Jump', value: '|20 - 30| = 10' },
        { label: 'Candidate Cost', value: '20 + 10 = 30 (beats 50!)', accent: true }
      ]
    },
    formula: 'candidate(j=3) = dp[1] + |20 - 30| = 30 < 50 -> dp[4] = 30',
    action: 'A massive 3-step jump from stone 1 achieves the global minimum of 30!',
    explain: 'Stair 1 has height 30 and stair 4 has height 20. The energy cost is only |20 - 30| = 10! Adding dp[1] = 20 gives 20 + 10 = 30, crushing the other options (50 and 70).',
    intuition: 'Longer jump distances K enable powerful shortcuts directly connecting similar altitudes.'
  },
  {
    title: '9. Final Result: Minimum Cost = 30',
    phase: 'COMPLETED',
    tracks: [
      { label: 'Heights', items: [10, 30, 40, 50, 20] },
      { label: 'Optimal Path', items: ['Start (0)', 'Jump 1 (1)', '—', '—', 'Leap 3 (4)'] }
    ],
    activeI: 4,
    activePrev: 1,
    trackTitle: 'Optimal Solution Summary',
    metrics: [
      { label: 'Min Energy', value: '30', highlight: true },
      { label: 'Path', value: '0 → 1 → 4' },
      { label: 'Time Complexity', value: 'O(N × K)' },
      { label: 'Space Complexity', value: 'O(N)' }
    ],
    customCard: {
      title: 'Optimal Path Verification',
      rows: [
        { label: 'Hop 1 (0 -> 1)', value: '|30 - 10| = 20' },
        { label: 'Hop 2 (1 -> 4)', value: '|20 - 30| = 10 (jump distance 3)' },
        { label: 'Total Energy', value: '20 + 10 = 30', accent: true }
      ]
    },
    formula: 'Result = dp[N-1] = 30',
    action: 'Return final answer dp[4] = 30',
    explain: 'The algorithm terminates in O(N × K) time and O(N) auxiliary space. The frog reaches the final stair with minimum energy 30 via path 0 -> 1 -> 4.',
    intuition: 'Generalizing to K jumps converts a local neighbor search into a versatile multi-hop shortest path on a DAG.'
  }
];

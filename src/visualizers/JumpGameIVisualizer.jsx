// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Jump Game - I (Can Reach End)',
  category: 'Greedy Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Determines if you can reach the last index from the first index in an integer array using a greedy forward reach boundary.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Greedy Maximum Reach Horizon Invariant',
  nodes: [
    { id: 'root', label: 'Greedy Reach Boundary', children: ['reach-horizon', 'stuck-condition', 'forward-relaxation', 'early-termination', 'complexity'] },
    { id: 'reach-horizon', label: '1. Reachable Horizon Invariant', detail: 'Maintain maxReach tracking the furthest index reachable from any previously visited valid index.' },
    { id: 'stuck-condition', label: '2. Unreachable Trap Detection', detail: 'If current index i > maxReach, the current index is completely unreachable; return false immediately.' },
    { id: 'forward-relaxation', label: '3. Horizon Expansion', detail: 'At each reachable index i, update maxReach = max(maxReach, i + nums[i]) to encompass all possible jump landings.' },
    { id: 'early-termination', label: '4. Target Reached Short-Circuit', detail: 'If maxReach >= N - 1 at any point, the last index is guaranteed reachable; return true without scanning remaining elements.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Single pass in O(N) linear time with strictly O(1) auxiliary space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Jump Game I (Greedy Max Reach)
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    bool canJump(vector<int>& nums) {
        int maxReach = 0;
        int n = nums.size();

        for (int i = 0; i < n; i++) {
            if (i > maxReach) {
                return false; // Trapped: cannot reach index i
            }
            maxReach = max(maxReach, i + nums[i]);
            if (maxReach >= n - 1) {
                return true; // Target index reachable
            }
        }

        return true;
    }
};`,
  python: `# Python 3 Jump Game I (Greedy Max Reach)
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def canJump(self, nums: list[int]) -> bool:
        max_reach = 0
        target = len(nums) - 1

        for i, jump in enumerate(nums):
            if i > max_reach:
                return False
            max_reach = max(max_reach, i + jump)
            if max_reach >= target:
                return True

        return True`,
  java: `// Java Jump Game I (Greedy Max Reach)
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public boolean canJump(int[] nums) {
        int maxReach = 0;
        int n = nums.length;

        for (int i = 0; i < n; i++) {
            if (i > maxReach) {
                return false;
            }
            maxReach = Math.max(maxReach, i + nums[i]);
            if (maxReach >= n - 1) {
                return true;
            }
        }

        return true;
    }
}`,
  javascript: `// JavaScript Jump Game I (Greedy Max Reach)
// Time Complexity: O(N) | Space Complexity: O(1)
var canJump = function(nums) {
    let maxReach = 0;
    const target = nums.length - 1;

    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) {
            return false;
        }
        maxReach = Math.max(maxReach, i + nums[i]);
        if (maxReach >= target) {
            return true;
        }
    }

    return true;
};`
};

export const steps = [
  {
    title: '1. Problem Setup & Initial Boundary: nums = [2, 3, 1, 1, 4]',
    phase: 'INITIAL',
    codeLine: 11,
    track: {
      label: 'Jump Array (Target Index = 4)',
      items: [
        { val: 'nums[0]=2', status: 'current' },
        { val: 'nums[1]=3', status: 'default' },
        { val: 'nums[2]=1', status: 'default' },
        { val: 'nums[3]=1', status: 'default' },
        { val: 'nums[4]=4', status: 'default' }
      ],
      pointers: { start: { idx: 0, color: 'var(--accent-bright)' }, target: { idx: 4, color: 'var(--accent-bright)' } }
    },
    activeI: 0,
    activeJ: null,
    windowStart: 0,
    windowEnd: 0,
    metrics: [
      { label: 'Array Length', value: '5' },
      { label: 'Target Index', value: '4' },
      { label: 'maxReach', value: '0' },
      { label: 'Current i', value: '0' }
    ],
    formula: 'int maxReach = 0, target = n - 1;',
    action: 'Initialize maxReach = 0. Target is the last index (4). Start scanning from index 0.',
    explain: 'At index 0, we can jump anywhere up to 0 + nums[0] positions.',
    intuition: 'We only need to track the furthest forward index we can reach.'
  },
  {
    title: '2. Index 0: Jump Power = 2 -> maxReach Expands to 2',
    phase: 'REACH',
    codeLine: 17,
    track: {
      label: 'Reachable Horizon [0..2]',
      items: [
        { val: 'nums[0]=2', status: 'match' },
        { val: 'nums[1]=3', status: 'selected' },
        { val: 'nums[2]=1', status: 'selected' },
        { val: 'nums[3]=1', status: 'default' },
        { val: 'nums[4]=4', status: 'default' }
      ],
      pointers: { i: { idx: 0, color: 'var(--accent-bright)' }, horizon: { idx: 2, color: 'var(--accent-bright)' } }
    },
    activeI: 0,
    activeJ: 2,
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'Current i', value: '0' },
      { label: 'Jump Power', value: 'nums[0] = 2' },
      { label: 'New Reach', value: '0 + 2 = 2', highlight: true },
      { label: 'maxReach', value: '2' }
    ],
    formula: 'maxReach = max(0, 0 + 2) = 2;',
    action: 'At i = 0, jump reach is 0 + 2 = 2. Update maxReach to 2. Indices 1 and 2 are now unlocked.',
    explain: 'From index 0, we can land on either index 1 or index 2. Reachable window is now [0..2].',
    intuition: 'Every jump value increases the frontier of accessible indices.'
  },
  {
    title: '3. Index 1: Within Horizon (1 <= 2) -> Jump Power = 3',
    phase: 'EVALUATE',
    codeLine: 14,
    track: {
      label: 'Inspect Index 1: Jump Power 3',
      items: [
        { val: 'nums[0]=2', status: 'visited' },
        { val: 'nums[1]=3', status: 'current' },
        { val: 'nums[2]=1', status: 'selected' },
        { val: 'nums[3]=1', status: 'default' },
        { val: 'nums[4]=4', status: 'default' }
      ],
      pointers: { i: { idx: 1, color: 'var(--accent-bright)' }, currentReach: { idx: 2, color: 'var(--accent-bright)' } }
    },
    activeI: 1,
    activeJ: 2,
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'Current i', value: '1' },
      { label: 'Reachable?', value: '1 <= 2 (Yes)' },
      { label: 'Jump Power', value: 'nums[1] = 3' },
      { label: 'Potential Reach', value: '1 + 3 = 4' }
    ],
    formula: 'if (1 <= maxReach) potential = 1 + 3 = 4;',
    action: 'Verify i = 1 is <= maxReach (2). It is reachable. Jump of 3 extends potential reach to 1 + 3 = 4.',
    explain: 'Because index 1 is within the known reachable window [0..2], we can legally step here and launch.',
    intuition: 'Any index <= maxReach can be used as a launchpad.'
  },
  {
    title: '4. Expand Max Reach: 1 + 3 = 4 -> Target Index Reached!',
    phase: 'REACH',
    codeLine: 17,
    track: {
      label: 'Reachable Horizon [0..4] (Full Array Covered)',
      items: [
        { val: 'nums[0]=2', status: 'visited' },
        { val: 'nums[1]=3', status: 'match' },
        { val: 'nums[2]=1', status: 'selected' },
        { val: 'nums[3]=1', status: 'selected' },
        { val: 'nums[4]=4', status: 'match' }
      ],
      pointers: { i: { idx: 1, color: 'var(--accent-bright)' }, target: { idx: 4, color: 'var(--accent-bright)' } }
    },
    activeI: 1,
    activeJ: 4,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Current i', value: '1' },
      { label: 'maxReach Update', value: 'max(2, 4) = 4', highlight: true },
      { label: 'Target Index', value: '4' },
      { label: 'Target Covered?', value: 'true (4 >= 4)', highlight: true }
    ],
    formula: 'maxReach = max(2, 1 + 3) = 4; if (maxReach >= 4) return true;',
    action: 'Update maxReach to 4. maxReach now touches the last index (target = 4).',
    explain: 'From index 1, jumping 3 steps lands directly on index 4 (the destination). Destination is reached!',
    intuition: 'Once maxReach >= target, success is guaranteed; no further traversal is needed.'
  },
  {
    title: '5. Early Exit Trigger: Short-Circuit Return',
    phase: 'EARLY_EXIT',
    codeLine: 18,
    track: {
      label: 'Optimal Jump Path: 0 -> 1 -> 4',
      items: [
        { val: 'nums[0]=2', status: 'match' },
        { val: 'nums[1]=3', status: 'match' },
        { val: 'nums[2]=1', status: 'dim' },
        { val: 'nums[3]=1', status: 'dim' },
        { val: 'nums[4]=4', status: 'match' }
      ],
      pointers: { pathHop: { idx: 1, color: 'var(--accent-bright)' }, goal: { idx: 4, color: 'var(--accent-bright)' } }
    },
    activeI: 1,
    activeJ: 4,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Short-Circuit', value: 'Triggered' },
      { label: 'Indices Skipped', value: '2 and 3 skipped' },
      { label: 'Reachable Goal', value: 'Index 4' }
    ],
    formula: 'if (maxReach >= n - 1) return true;',
    action: 'Detect that maxReach (4) >= target (4). Exit loop immediately without inspecting indices 2, 3, or 4.',
    explain: 'Early termination avoids redundant checks. The problem only asks if the end can be reached, not for minimum jumps.',
    intuition: 'Greedy reach guarantees reachability without backtracking.'
  },
  {
    title: '6. Counter-Example Contrast: The Zero-Trap Failure Mode',
    phase: 'THEORY',
    codeLine: 14,
    track: {
      label: 'Zero-Trap Example: [3, 2, 1, 0, 4]',
      items: [
        { val: '3', status: 'visited' },
        { val: '2', status: 'visited' },
        { val: '1', status: 'visited' },
        { val: '0 (trap)', status: 'current' },
        { val: '4', status: 'dim' }
      ],
      pointers: { stuck: { idx: 3, color: 'var(--accent-bright)' } }
    },
    activeI: 3,
    activeJ: null,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Trap Scenario', value: '[3, 2, 1, 0, 4]' },
      { label: 'Max Reach', value: '3 (stuck at 0)' },
      { label: 'At index 4', value: 'i (4) > maxReach (3)' },
      { label: 'Trap Result', value: 'false' }
    ],
    formula: 'if (i > maxReach) return false;',
    action: 'Contrast analysis: If all jumps collapse at an absorbing 0 with maxReach < target, i > maxReach triggers false.',
    explain: 'In [3, 2, 1, 0, 4], indices 0, 1, 2 all reach at most index 3. At index 4, i = 4 > maxReach = 3, correctly returning false.',
    intuition: 'The condition i > maxReach detects when we fall into an inescapable zero trap.',
    customCard: {
      title: 'Greedy Invariant Guarantees',
      rows: [
        { label: 'Invariant', value: 'maxReach >= i is necessary to proceed', accent: true },
        { label: 'Early Exit', value: 'maxReach >= n - 1 is sufficient to return true', accent: true }
      ]
    }
  },
  {
    title: '7. Path Continuity Verification',
    phase: 'VERIFY',
    codeLine: 22,
    track: {
      label: 'Reachable Span Validated Across Array',
      items: [
        { val: 'nums[0]=2', status: 'match' },
        { val: 'nums[1]=3', status: 'match' },
        { val: 'nums[2]=1', status: 'match' },
        { val: 'nums[3]=1', status: 'match' },
        { val: 'nums[4]=4', status: 'match' }
      ],
      pointers: { verified: { idx: 4, color: 'var(--accent-bright)' } }
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Reachable Span', value: '[0..4]' },
      { label: 'End Reachable?', value: 'true' },
      { label: 'Jumps Needed', value: '2 hops (0->1->4)' }
    ],
    formula: 'canReach = true;',
    action: 'Path continuity verified: 0 -> 1 (+1) -> 4 (+3). Target index is reachable.',
    explain: 'Hop from index 0 to 1, then jump 3 steps from index 1 to reach destination 4.',
    intuition: 'Forward reach boundary expands strictly monotonically.'
  },
  {
    title: '8. End Reachable: Return True',
    phase: 'COMPLETED',
    codeLine: 24,
    track: {
      label: 'Target Index 4 Reachable: Success',
      items: [
        { val: 'nums[0]=2', status: 'match' },
        { val: 'nums[1]=3', status: 'match' },
        { val: 'nums[2]=1', status: 'match' },
        { val: 'nums[3]=1', status: 'match' },
        { val: 'nums[4]=4', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Result', value: 'true (Reachable)', highlight: true },
      { label: 'Target Index', value: '4' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1) auxiliary' }
    ],
    formula: 'return true; // Target reached in O(N)',
    action: 'Algorithm successfully terminates. Return true.',
    explain: 'Array [2, 3, 1, 1, 4] allows reaching the last index. Optimal greedy solution runs in O(N) time and O(1) space.',
    intuition: 'Greedy forward reach replaces expensive O(N^2) DP or exponential BFS with a single linear pass.',
    customCard: {
      title: 'Algorithm Performance Summary',
      rows: [
        { label: 'Verdict', value: 'true (Target Reachable)', accent: true },
        { label: 'Complexity', value: 'O(N) time, O(1) space', accent: true }
      ]
    }
  }
];

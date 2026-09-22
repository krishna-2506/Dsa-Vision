// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Jump Game II (Minimum Jumps)',
  category: 'Greedy Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Calculates the minimum number of jumps required to reach the last index in an integer array using greedy level-order BFS window expansion.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'BFS Window Jump Frontier Invariant',
  nodes: [
    { id: 'root', label: 'Greedy Window BFS', children: ['bfs-range', 'farthest-relaxation', 'window-shift', 'jump-increment', 'complexity'] },
    { id: 'bfs-range', label: '1. Jump Horizon [l, r]', detail: 'Maintain current jump interval [l, r] containing all indices reachable with exactly `jumps` steps.' },
    { id: 'farthest-relaxation', label: '2. Farthest Horizon Exploration', detail: 'Iterate i through [l, r], computing farthest = max(farthest, i + nums[i]) across all candidates.' },
    { id: 'window-shift', label: '3. Range Advancement', detail: 'Once the current jump interval [l, r] is exhausted, set the next interval: l = r + 1, r = farthest.' },
    { id: 'jump-increment', label: '4. Level Increment', detail: 'Increment jumps counter by 1. Terminate when the right boundary r reaches or exceeds n - 1.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Each index is inspected exactly once; runtime is strictly O(N) with O(1) auxiliary variables.' }
  ]
};

export const solutions = {
  cpp: `// C++ Jump Game II (Greedy Window / BFS)
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int jump(vector<int>& nums) {
        int jumps = 0;
        int l = 0, r = 0;
        int n = nums.size();

        while (r < n - 1) {
            int farthest = 0;
            for (int i = l; i <= r; i++) {
                farthest = max(farthest, i + nums[i]);
            }
            l = r + 1;
            r = farthest;
            jumps++;
        }

        return jumps;
    }
};`,
  python: `# Python 3 Jump Game II (Greedy Window / BFS)
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def jump(self, nums: list[int]) -> int:
        jumps = 0
        l = r = 0
        n = len(nums)

        while r < n - 1:
            farthest = 0
            for i in range(l, r + 1):
                farthest = max(farthest, i + nums[i])
            l = r + 1
            r = farthest
            jumps += 1

        return jumps`,
  java: `// Java Jump Game II (Greedy Window / BFS)
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public int jump(int[] nums) {
        int jumps = 0;
        int l = 0, r = 0;
        int n = nums.length;

        while (r < n - 1) {
            int farthest = 0;
            for (int i = l; i <= r; i++) {
                farthest = Math.max(farthest, i + nums[i]);
            }
            l = r + 1;
            r = farthest;
            jumps++;
        }

        return jumps;
    }
}`,
  javascript: `// JavaScript Jump Game II (Greedy Window / BFS)
// Time Complexity: O(N) | Space Complexity: O(1)
var jump = function(nums) {
    let jumps = 0;
    let l = 0, r = 0;
    const n = nums.length;

    while (r < n - 1) {
        let farthest = 0;
        for (let i = l; i <= r; i++) {
            farthest = Math.max(farthest, i + nums[i]);
        }
        l = r + 1;
        r = farthest;
        jumps++;
    }

    return jumps;
};`
};

export const steps = [
  {
    title: '1. Problem Setup & Initial BFS Window: [0, 0]',
    phase: 'INITIAL',
    codeLine: 13,
    track: {
      label: 'Jump Array: nums = [2, 3, 1, 1, 4]',
      items: [
        { val: 'nums[0]=2', status: 'current' },
        { val: 'nums[1]=3', status: 'default' },
        { val: 'nums[2]=1', status: 'default' },
        { val: 'nums[3]=1', status: 'default' },
        { val: 'nums[4]=4', status: 'default' }
      ],
      pointers: { L: { idx: 0, color: 'var(--accent-bright)' }, R: { idx: 0, color: 'var(--accent-bright)' } }
    },
    activeI: 0,
    activeJ: 0,
    windowStart: 0,
    windowEnd: 0,
    metrics: [
      { label: 'Jumps Made', value: '0' },
      { label: 'Current Window', value: '[0..0]' },
      { label: 'Target Index', value: '4' },
      { label: 'farthest', value: '0' }
    ],
    formula: 'l = 0, r = 0, jumps = 0; target = n - 1 = 4;',
    action: 'Initialize BFS jump frontier at index 0: [l=0, r=0]. Target destination is index 4.',
    explain: 'With 0 jumps, the only accessible index is index 0. We will find the maximum horizon reachable in 1 jump.',
    intuition: 'Treat indices reachable in K jumps as Level K in an unweighted BFS tree.'
  },
  {
    title: '2. Level 0 Scan: i = 0 -> farthest = 0 + 2 = 2',
    phase: 'SCAN_WINDOW',
    codeLine: 19,
    track: {
      label: 'Scanning Window [0..0]',
      items: [
        { val: 'nums[0]=2', status: 'match' },
        { val: 'nums[1]=3', status: 'selected' },
        { val: 'nums[2]=1', status: 'selected' },
        { val: 'nums[3]=1', status: 'default' },
        { val: 'nums[4]=4', status: 'default' }
      ],
      pointers: { i: { idx: 0, color: 'var(--accent-bright)' } }
    },
    activeI: 0,
    activeJ: 0,
    windowStart: 0,
    windowEnd: 0,
    metrics: [
      { label: 'Current i', value: '0' },
      { label: 'Jump Reach', value: '0 + 2 = 2', highlight: true },
      { label: 'farthest', value: '2' },
      { label: 'Level Status', value: 'Window [0..0] complete' }
    ],
    formula: 'farthest = max(0, 0 + nums[0]) = 2;',
    action: 'From index 0, jumping up to 2 steps reaches index 2. Update farthest = 2.',
    explain: 'All indices in current level [0..0] are evaluated. Next jump can reach any index from 1 to 2.',
    intuition: 'The next BFS level boundary will span from r + 1 to farthest.'
  },
  {
    title: '3. Advance to Jump Level 1: Window [1..2], jumps = 1',
    phase: 'NEXT_LEVEL',
    codeLine: 23,
    track: {
      label: 'Jump Level 1 Window: [1..2]',
      items: [
        { val: 'nums[0]=2', status: 'visited' },
        { val: 'nums[1]=3', status: 'current' },
        { val: 'nums[2]=1', status: 'current' },
        { val: 'nums[3]=1', status: 'default' },
        { val: 'nums[4]=4', status: 'default' }
      ],
      pointers: { L: { idx: 1, color: 'var(--accent-bright)' }, R: { idx: 2, color: 'var(--accent-bright)' } }
    },
    activeI: 1,
    activeJ: 2,
    windowStart: 1,
    windowEnd: 2,
    metrics: [
      { label: 'Jumps Made', value: '1', highlight: true },
      { label: 'New Window', value: '[1..2]' },
      { label: 'farthest', value: 'reset to 0' },
      { label: 'Target Covered?', value: 'false (2 < 4)' }
    ],
    formula: 'l = r + 1 = 1; r = farthest = 2; jumps++;',
    action: 'Commit Jump 1. Set l = 1, r = 2. Any index in [1..2] is reachable in 1 jump.',
    explain: 'Since r = 2 < target (4), we must make at least one more jump. Now scan window [1..2] to maximize next jump.',
    intuition: 'Level 1 encompasses indices {1, 2}.'
  },
  {
    title: '4. Level 1 Scan: i = 1 -> farthest = max(0, 1 + 3) = 4',
    phase: 'SCAN_WINDOW',
    codeLine: 19,
    track: {
      label: 'Evaluating i = 1 in Window [1..2]',
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
    activeJ: 2,
    windowStart: 1,
    windowEnd: 2,
    metrics: [
      { label: 'Current i', value: '1' },
      { label: 'Jump Reach', value: '1 + 3 = 4', highlight: true },
      { label: 'farthest', value: '4' },
      { label: 'Target Reached?', value: 'Yes (4 >= 4)', highlight: true }
    ],
    formula: 'farthest = max(0, 1 + nums[1]) = 4;',
    action: 'At index 1, jump power is 3. Reach is 1 + 3 = 4. farthest expands to 4.',
    explain: 'Index 1 can jump directly to index 4 (the target destination).',
    intuition: 'We continue scanning the remainder of window [1..2] to maintain BFS invariant.'
  },
  {
    title: '5. Level 1 Scan: i = 2 -> farthest = max(4, 2 + 1) = 4',
    phase: 'SCAN_WINDOW',
    codeLine: 19,
    track: {
      label: 'Evaluating i = 2 in Window [1..2]',
      items: [
        { val: 'nums[0]=2', status: 'visited' },
        { val: 'nums[1]=3', status: 'visited' },
        { val: 'nums[2]=1', status: 'current' },
        { val: 'nums[3]=1', status: 'selected' },
        { val: 'nums[4]=4', status: 'match' }
      ],
      pointers: { i: { idx: 2, color: 'var(--accent-bright)' } }
    },
    activeI: 2,
    activeJ: 2,
    windowStart: 1,
    windowEnd: 2,
    metrics: [
      { label: 'Current i', value: '2' },
      { label: 'Jump Reach', value: '2 + 1 = 3' },
      { label: 'farthest', value: 'max(4, 3) = 4' },
      { label: 'Level 1 Done', value: 'true' }
    ],
    formula: 'farthest = max(4, 2 + nums[2]) = 4;',
    action: 'At index 2, jump power is 1 (reach = 3). farthest remains 4. Window [1..2] fully inspected.',
    explain: 'Both candidates in Level 1 evaluated. Best forward horizon is index 4.',
    intuition: 'Index 1 provided the superior jump reach of 4.'
  },
  {
    title: '6. Advance to Jump Level 2: Window [3..4], jumps = 2',
    phase: 'NEXT_LEVEL',
    codeLine: 23,
    track: {
      label: 'Jump Level 2 Window: [3..4]',
      items: [
        { val: 'nums[0]=2', status: 'visited' },
        { val: 'nums[1]=3', status: 'visited' },
        { val: 'nums[2]=1', status: 'visited' },
        { val: 'nums[3]=1', status: 'match' },
        { val: 'nums[4]=4', status: 'match' }
      ],
      pointers: { L: { idx: 3, color: 'var(--accent-bright)' }, R: { idx: 4, color: 'var(--accent-bright)' } }
    },
    activeI: 3,
    activeJ: 4,
    windowStart: 3,
    windowEnd: 4,
    metrics: [
      { label: 'Jumps Made', value: '2', highlight: true },
      { label: 'New Window', value: '[3..4]' },
      { label: 'Right Boundary', value: 'r = 4' },
      { label: 'Target Reached?', value: 'true (r >= 4)', highlight: true }
    ],
    formula: 'l = 2 + 1 = 3; r = farthest = 4; jumps++; // jumps: 1 -> 2',
    action: 'Commit Jump 2. Window expands to [3..4]. Right boundary r = 4 touches target index 4.',
    explain: 'Right boundary r (4) is now >= n - 1 (4). While loop condition (r < n - 1) terminates.',
    intuition: 'Target index 4 is contained in BFS Level 2.'
  },
  {
    title: '7. Reconstruct Optimal Jump Trajectory',
    phase: 'VERIFY',
    codeLine: 27,
    track: {
      label: 'Optimal 2-Hop Path: 0 -> 1 -> 4',
      items: [
        { val: 'nums[0]=2', status: 'match' },
        { val: 'nums[1]=3', status: 'match' },
        { val: 'nums[2]=1', status: 'dim' },
        { val: 'nums[3]=1', status: 'dim' },
        { val: 'nums[4]=4', status: 'match' }
      ],
      pointers: { start: { idx: 0, color: 'var(--accent-bright)' }, mid: { idx: 1, color: 'var(--accent-bright)' }, end: { idx: 4, color: 'var(--accent-bright)' } }
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Total Jumps', value: '2', highlight: true },
      { label: 'Path Taken', value: '0 -> 1 (+1) -> 4 (+3)' },
      { label: 'Indices Visited', value: '3 / 5' },
      { label: 'Optimality', value: 'Guaranteed' }
    ],
    formula: 'jumps = 2; // Optimal BFS shortest path',
    action: 'Verify jump chain: Jump 1 moves 0 -> 1 (cost 1). Jump 2 moves 1 -> 4 (cost 1). Total jumps = 2.',
    explain: 'Any greedy step in BFS explores all reachable nodes at depth d before depth d + 1, ensuring minimum jumps.',
    intuition: 'No path can reach index 4 in fewer than 2 jumps.'
  },
  {
    title: '8. Terminal Confirmation: Return jumps = 2',
    phase: 'COMPLETED',
    codeLine: 29,
    track: {
      label: 'Destination 4 Reached in Minimum 2 Jumps',
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
      { label: 'Minimum Jumps', value: '2', highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1) auxiliary' }
    ],
    formula: 'return jumps; // 2',
    action: 'Algorithm completes. Return 2.',
    explain: 'Array [2, 3, 1, 1, 4] requires exactly 2 jumps to reach the final index. Achieved in linear O(N) time without extra memory.',
    intuition: 'Window-based BFS avoids the explicit queue allocation of standard BFS.',
    customCard: {
      title: 'BFS Window Complexity Summary',
      rows: [
        { label: 'Minimum Jumps', value: '2', accent: true },
        { label: 'Resource Profile', value: 'O(N) time, O(1) space', accent: true }
      ]
    }
  }
];

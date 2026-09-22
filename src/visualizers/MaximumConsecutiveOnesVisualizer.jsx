// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Maximum Consecutive Ones',
  category: 'Arrays & Counting',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the maximum number of consecutive 1s in a binary array in a single linear pass by maintaining a running tally and a peak register.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Maximum Consecutive Ones Invariant',
  nodes: [
    { id: 'root', label: 'Single-Pass Streak Tracking', children: ['streak-increment', 'reset-condition', 'peak-update', 'complexity'] },
    { id: 'streak-increment', label: '1. Streak Accumulation', detail: 'When nums[i] == 1, increment current streak count: cnt++.' },
    { id: 'reset-condition', label: '2. Zero Streak Reset', detail: 'When nums[i] == 0, the consecutive 1s streak is interrupted; immediately reset cnt = 0.' },
    { id: 'peak-update', label: '3. Running Peak Invariant', detail: 'After each increment, update maxi = max(maxi, cnt) so peak streak is never lost.' },
    { id: 'complexity', label: '4. Optimal Resource Bounds', detail: 'Strictly O(N) time with O(1) auxiliary registers, requiring only a single array traversal.' }
  ]
};

export const solutions = {
  cpp: `// C++ Maximum Consecutive Ones
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int findMaxConsecutiveOnes(vector<int>& nums) {
        int cnt = 0;
        int maxi = 0;

        for (int x : nums) {
            if (x == 1) {
                cnt++;
                maxi = max(maxi, cnt);
            } else {
                cnt = 0;
            }
        }

        return maxi;
    }
};`,
  python: `# Python 3 Maximum Consecutive Ones
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def findMaxConsecutiveOnes(self, nums: list[int]) -> int:
        cnt = 0
        maxi = 0
        for x in nums:
            if x == 1:
                cnt += 1
                maxi = max(maxi, cnt)
            else:
                cnt = 0
        return maxi`,
  java: `// Java Maximum Consecutive Ones
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public int findMaxConsecutiveOnes(int[] nums) {
        int cnt = 0;
        int maxi = 0;
        for (int x : nums) {
            if (x == 1) {
                cnt++;
                maxi = Math.max(maxi, cnt);
            } else {
                cnt = 0;
            }
        }
        return maxi;
    }
}`,
  javascript: `// JavaScript Maximum Consecutive Ones
// Time Complexity: O(N) | Space Complexity: O(1)
var findMaxConsecutiveOnes = function(nums) {
    let cnt = 0;
    let maxi = 0;
    for (const x of nums) {
        if (x === 1) {
            cnt++;
            maxi = Math.max(maxi, cnt);
        } else {
            cnt = 0;
        }
    }
    return maxi;
};`
};

export const steps = [
  {
    title: '1. Setup & Running Streak Invariant',
    phase: 'INITIAL',
    track: {
      label: 'nums (N = 6)',
      items: [
        { val: 1 },
        { val: 1 },
        { val: 0 },
        { val: 1 },
        { val: 1 },
        { val: 1 }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Current Streak (cnt)', value: 0 },
      { label: 'Peak Streak (maxi)', value: 0 },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1) Auxiliary', highlight: true }
    ],
    formula: 'int cnt = 0; int maxi = 0;',
    action: 'Initialize streak counter cnt and running maximum maxi to zero.',
    explain: 'Goal: Find the maximum number of consecutive 1s in a single pass through the binary array.',
    intuition: 'Each 1 extends the current streak; each 0 breaks it. Maintaining a running peak guarantees O(N) time and O(1) space.',
    variables: {
      'nums': '[1, 1, 0, 1, 1, 1]',
      'cnt': 0,
      'maxi': 0
    }
  },
  {
    title: '2. Index 0: nums[0] = 1 (Streak Starts)',
    phase: 'SCANNING',
    track: {
      label: 'nums (N = 6)',
      items: [
        { val: 1, status: 'active', badge: 'cnt = 1' },
        { val: 1 },
        { val: 0 },
        { val: 1 },
        { val: 1 },
        { val: 1 }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'nums[0]', value: 1 },
      { label: 'Current Streak', value: 1, highlight: true },
      { label: 'Peak Streak', value: 1 }
    ],
    formula: 'cnt++; maxi = max(maxi, cnt);',
    action: 'Encounter 1: increment current streak cnt to 1 and update maxi to 1.',
    explain: 'First element is 1. The streak begins with 1 consecutive one. maxi becomes max(0, 1) = 1.',
    intuition: 'Whenever a 1 appears, the local run of consecutive 1s grows by 1.',
    variables: {
      'i': 0,
      'nums[i]': 1,
      'cnt': 1,
      'maxi': 1
    }
  },
  {
    title: '3. Index 1: nums[1] = 1 (Streak Extends to 2)',
    phase: 'SCANNING',
    track: {
      label: 'nums (N = 6)',
      items: [
        { val: 1, status: 'match' },
        { val: 1, status: 'active', badge: 'cnt = 2' },
        { val: 0 },
        { val: 1 },
        { val: 1 },
        { val: 1 }
      ]
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'nums[1]', value: 1 },
      { label: 'Current Streak', value: 2, highlight: true },
      { label: 'Peak Streak', value: 2, highlight: true }
    ],
    formula: 'cnt++; maxi = max(maxi, cnt);',
    action: 'Encounter 1: increment cnt to 2. maxi updates to max(1, 2) = 2.',
    explain: 'Consecutive ones at index 0 and 1. The current streak of 1s reaches length 2.',
    intuition: 'The running maximum maxi tracks the longest contiguous block of 1s seen so far.',
    variables: {
      'i': 1,
      'nums[i]': 1,
      'cnt': 2,
      'maxi': 2
    }
  },
  {
    title: '4. Index 2: nums[2] = 0 (Streak Interrupted)',
    phase: 'RESET',
    track: {
      label: 'nums (N = 6)',
      items: [
        { val: 1, status: 'match' },
        { val: 1, status: 'match' },
        { val: 0, status: 'mismatch', badge: 'Reset: cnt = 0' },
        { val: 1 },
        { val: 1 },
        { val: 1 }
      ]
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'nums[2]', value: 0 },
      { label: 'Current Streak', value: 0, highlight: true },
      { label: 'Peak Streak', value: 2 }
    ],
    formula: 'cnt = 0; // Streak broken by zero',
    action: 'Encounter 0: reset current streak cnt to 0 while preserving maxi = 2.',
    explain: 'A 0 breaks contiguity. Any subsequent consecutive 1s must start a fresh count. maxi preserves the previous peak of 2.',
    intuition: 'Zero is the delimiter that separates contiguous blocks of 1s.',
    variables: {
      'i': 2,
      'nums[i]': 0,
      'cnt': 0,
      'maxi': 2
    }
  },
  {
    title: '5. Index 3: nums[3] = 1 (New Streak Begins)',
    phase: 'SCANNING',
    track: {
      label: 'nums (N = 6)',
      items: [
        { val: 1, status: 'match' },
        { val: 1, status: 'match' },
        { val: 0, status: 'mismatch' },
        { val: 1, status: 'active', badge: 'cnt = 1' },
        { val: 1 },
        { val: 1 }
      ]
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'nums[3]', value: 1 },
      { label: 'Current Streak', value: 1 },
      { label: 'Peak Streak', value: 2 }
    ],
    formula: 'cnt++; maxi = max(maxi, cnt);',
    action: 'Encounter 1: start a new streak with cnt = 1. maxi remains 2.',
    explain: 'New contiguous segment of 1s starts at index 3. cnt becomes 1. Since 1 <= 2, maxi remains 2.',
    intuition: 'maxi protects the best streak observed earlier.',
    variables: {
      'i': 3,
      'nums[i]': 1,
      'cnt': 1,
      'maxi': 2
    }
  },
  {
    title: '6. Index 4: nums[4] = 1 (Streak Reaches 2)',
    phase: 'SCANNING',
    track: {
      label: 'nums (N = 6)',
      items: [
        { val: 1 },
        { val: 1 },
        { val: 0, status: 'mismatch' },
        { val: 1, status: 'match' },
        { val: 1, status: 'active', badge: 'cnt = 2' },
        { val: 1 }
      ]
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'nums[4]', value: 1 },
      { label: 'Current Streak', value: 2 },
      { label: 'Peak Streak', value: 2 }
    ],
    formula: 'cnt++; maxi = max(maxi, cnt);',
    action: 'Encounter 1: increment cnt to 2. maxi remains max(2, 2) = 2.',
    explain: 'Second 1 in this segment. cnt = 2 matches the previous peak of 2.',
    intuition: 'The new streak has caught up to the record.',
    variables: {
      'i': 4,
      'nums[i]': 1,
      'cnt': 2,
      'maxi': 2
    }
  },
  {
    title: '7. Index 5: nums[5] = 1 (New Record Streak of 3!)',
    phase: 'SCANNING',
    track: {
      label: 'nums (N = 6)',
      items: [
        { val: 1 },
        { val: 1 },
        { val: 0, status: 'mismatch' },
        { val: 1, status: 'match' },
        { val: 1, status: 'match' },
        { val: 1, status: 'active', badge: '👑 cnt = 3' }
      ]
    },
    activeI: 5,
    activeJ: null,
    metrics: [
      { label: 'nums[5]', value: 1 },
      { label: 'Current Streak', value: 3, highlight: true },
      { label: 'Peak Streak', value: 3, highlight: true }
    ],
    formula: 'cnt++; maxi = max(maxi, cnt) = max(2, 3) = 3;',
    action: 'Encounter 1: increment cnt to 3. maxi updates to 3!',
    explain: 'Third consecutive 1 in the second block. cnt reaches 3, setting a new global maximum.',
    intuition: 'The block [nums[3], nums[4], nums[5]] contains 3 consecutive 1s.',
    variables: {
      'i': 5,
      'nums[i]': 1,
      'cnt': 3,
      'maxi': 3
    }
  },
  {
    title: '8. Result: Maximum Consecutive Ones = 3',
    phase: 'COMPLETED',
    track: {
      label: 'Longest Consecutive 1s Subarray: [nums[3..5]]',
      items: [
        { val: 1 },
        { val: 1 },
        { val: 0, status: 'mismatch' },
        { val: 1, status: 'match', badge: 'Start' },
        { val: 1, status: 'match' },
        { val: 1, status: 'match', badge: 'End (Len = 3)' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Longest Subarray', value: '[1, 1, 1]' },
      { label: 'Max Consecutive 1s', value: 3, highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1) Auxiliary' }
    ],
    formula: 'return maxi = 3;',
    action: 'Traverse completed. Return global peak maxi = 3.',
    explain: 'Array traversed in exactly N=6 steps. Maximum consecutive 1s found is 3.',
    intuition: 'Linear scan with a running counter guarantees optimal time and space.',
    variables: {
      'result': 3,
      'timeComplexity': 'O(N)',
      'spaceComplexity': 'O(1)'
    }
  }
];

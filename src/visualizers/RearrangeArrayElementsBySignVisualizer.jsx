// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Rearrange Array Elements by Sign',
  category: 'Arrays & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Rearranges an array containing equal numbers of positive and negative integers so that positive and negative integers alternate starting with positive, preserving the original relative order.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Sign Alternation Placement Strategy',
  nodes: [
    { id: 'root', label: 'Single-Pass Even/Odd Indexed Placement', children: ['index-registers', 'positive-placement', 'negative-placement', 'order-preservation', 'complexity'] },
    { id: 'index-registers', label: '1. Even/Odd Target Pointers', detail: 'Initialize posIndex = 0 (even slots for positives) and negIndex = 1 (odd slots for negatives).' },
    { id: 'positive-placement', label: '2. Positive Allocation (x > 0)', detail: 'Assign ans[posIndex] = x and advance posIndex += 2. Fills slots 0, 2, 4, ...' },
    { id: 'negative-placement', label: '3. Negative Allocation (x < 0)', detail: 'Assign ans[negIndex] = x and advance negIndex += 2. Fills slots 1, 3, 5, ...' },
    { id: 'order-preservation', label: '4. Relative Order Guarantee', detail: 'Processing the input from left to right naturally maintains stable FIFO order for both sign partitions.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Single pass O(N) runtime requiring exactly one O(N) result array without sorting.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Single-Pass Two-Pointer Placement
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> rearrangeArray(vector<int>& nums) {
        int n = nums.size();
        vector<int> ans(n, 0);
        int posIndex = 0; // Even positions
        int negIndex = 1; // Odd positions

        for (int i = 0; i < n; i++) {
            if (nums[i] > 0) {
                ans[posIndex] = nums[i];
                posIndex += 2;
            } else {
                ans[negIndex] = nums[i];
                negIndex += 2;
            }
        }

        return ans;
    }
};`,
  python: `# Python 3 Optimal Single-Pass Alternating Placement
# Time Complexity: O(N) | Space Complexity: O(N)
class Solution:
    def rearrangeArray(self, nums: list[int]) -> list[int]:
        n = len(nums)
        ans = [0] * n
        pos_idx = 0
        neg_idx = 1

        for x in nums:
            if x > 0:
                ans[pos_idx] = x
                pos_idx += 2
            else:
                ans[neg_idx] = x
                neg_idx += 2

        return ans`,
  java: `// Java Optimal Single-Pass Alternating Placement
// Time Complexity: O(N) | Space Complexity: O(N)
class Solution {
    public int[] rearrangeArray(int[] nums) {
        int n = nums.length;
        int[] ans = new int[n];
        int posIndex = 0;
        int negIndex = 1;

        for (int i = 0; i < n; i++) {
            if (nums[i] > 0) {
                ans[posIndex] = nums[i];
                posIndex += 2;
            } else {
                ans[negIndex] = nums[i];
                negIndex += 2;
            }
        }

        return ans;
    }
}`,
  javascript: `// JavaScript Optimal Single-Pass Alternating Placement
// Time Complexity: O(N) | Space Complexity: O(N)
var rearrangeArray = function(nums) {
    const n = nums.length;
    const ans = new Array(n);
    let posIndex = 0;
    let negIndex = 1;

    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) {
            ans[posIndex] = nums[i];
            posIndex += 2;
        } else {
            ans[negIndex] = nums[i];
            negIndex += 2;
        }
    }

    return ans;
};`
};

export const steps = [
  {
    title: '1. Setup: Array nums = [3, 1, -2, -5, 2, -4]',
    phase: 'SETUP',
    track: {
      label: 'Input Array nums',
      items: [
        { val: 3 },
        { val: 1 },
        { val: -2 },
        { val: -5 },
        { val: 2 },
        { val: -4 }
      ],
      pointers: [
        { index: 0, label: 'i = 0' }
      ]
    },
    auxiliaryTrack: {
      label: 'Alternating Result Array ans',
      items: ['?', '?', '?', '?', '?', '?']
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'posIndex (Evens)', value: 0 },
      { label: 'negIndex (Odds)', value: 1 },
      { label: 'Strategy', value: 'Even/Odd Interleave' }
    ],
    formula: 'posIndex = 0; negIndex = 1; ans = new Array(6);',
    action: 'Initialize posIndex = 0 for positive numbers and negIndex = 1 for negative numbers.',
    explain: 'The problem guarantees equal positive and negative counts. Positives must occupy even slots (0, 2, 4) and negatives occupy odd slots (1, 3, 5).',
    intuition: 'Two pointer slots advance by +2 every time a matching number is routed.',
    variables: { i: 0, posIndex: 0, negIndex: 1, 'ans': '[?, ?, ?, ?, ?, ?]' }
  },
  {
    title: '2. Index 0: nums[0] = 3 > 0 -> Place at ans[posIndex = 0]',
    phase: 'PLACE_POSITIVE',
    track: {
      label: 'Input Array nums',
      items: [
        { val: 3, status: 'match', badge: '+ve' },
        { val: 1 },
        { val: -2 },
        { val: -5 },
        { val: 2 },
        { val: -4 }
      ],
      pointers: [
        { index: 0, label: 'nums[0] = 3' }
      ]
    },
    auxiliaryTrack: {
      label: 'Alternating Result Array ans',
      items: [3, '?', '?', '?', '?', '?']
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Placed Value', value: '+3 at ans[0]', highlight: true },
      { label: 'Next posIndex', value: 2 },
      { label: 'negIndex', value: 1 }
    ],
    formula: 'ans[posIndex] = nums[0] (3); posIndex += 2; // 2',
    action: '3 is positive: write into ans[0]. Increment posIndex to 2.',
    explain: '3 takes the first even slot. posIndex moves to index 2 for the next positive.',
    intuition: 'Positives stay in relative order in even slots.',
    variables: { i: 0, 'nums[0]': 3, placedAt: 'ans[0]', nextPosIndex: 2 }
  },
  {
    title: '3. Index 1: nums[1] = 1 > 0 -> Place at ans[posIndex = 2]',
    phase: 'PLACE_POSITIVE',
    track: {
      label: 'Input Array nums',
      items: [
        { val: 3, status: 'match' },
        { val: 1, status: 'match', badge: '+ve' },
        { val: -2 },
        { val: -5 },
        { val: 2 },
        { val: -4 }
      ],
      pointers: [
        { index: 1, label: 'nums[1] = 1' }
      ]
    },
    auxiliaryTrack: {
      label: 'Alternating Result Array ans',
      items: [3, '?', 1, '?', '?', '?']
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'Placed Value', value: '+1 at ans[2]', highlight: true },
      { label: 'Next posIndex', value: 4 },
      { label: 'negIndex', value: 1 }
    ],
    formula: 'ans[posIndex] = nums[1] (1); posIndex += 2; // 4',
    action: '1 is positive: write into ans[2]. Increment posIndex to 4.',
    explain: '1 takes the second even slot. posIndex moves to index 4.',
    intuition: 'Continuous even slot filling.',
    variables: { i: 1, 'nums[1]': 1, placedAt: 'ans[2]', nextPosIndex: 4 }
  },
  {
    title: '4. Index 2: nums[2] = -2 < 0 -> Place at ans[negIndex = 1]',
    phase: 'PLACE_NEGATIVE',
    track: {
      label: 'Input Array nums',
      items: [
        { val: 3, status: 'match' },
        { val: 1, status: 'match' },
        { val: -2, status: 'discarded', badge: '-ve' },
        { val: -5 },
        { val: 2 },
        { val: -4 }
      ],
      pointers: [
        { index: 2, label: 'nums[2] = -2' }
      ]
    },
    auxiliaryTrack: {
      label: 'Alternating Result Array ans',
      items: [3, -2, 1, '?', '?', '?']
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Placed Value', value: '-2 at ans[1]', highlight: true },
      { label: 'posIndex', value: 4 },
      { label: 'Next negIndex', value: 3 }
    ],
    formula: 'ans[negIndex] = nums[2] (-2); negIndex += 2; // 3',
    action: '-2 is negative: write into ans[1]. Increment negIndex to 3.',
    explain: '-2 takes the first odd slot. negIndex moves to index 3 for the next negative.',
    intuition: 'First negative routed correctly.',
    variables: { i: 2, 'nums[2]': -2, placedAt: 'ans[1]', nextNegIndex: 3 }
  },
  {
    title: '5. Index 3: nums[3] = -5 < 0 -> Place at ans[negIndex = 3]',
    phase: 'PLACE_NEGATIVE',
    track: {
      label: 'Input Array nums',
      items: [
        { val: 3, status: 'match' },
        { val: 1, status: 'match' },
        { val: -2, status: 'discarded' },
        { val: -5, status: 'discarded', badge: '-ve' },
        { val: 2 },
        { val: -4 }
      ],
      pointers: [
        { index: 3, label: 'nums[3] = -5' }
      ]
    },
    auxiliaryTrack: {
      label: 'Alternating Result Array ans',
      items: [3, -2, 1, -5, '?', '?']
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'Placed Value', value: '-5 at ans[3]', highlight: true },
      { label: 'posIndex', value: 4 },
      { label: 'Next negIndex', value: 5 }
    ],
    formula: 'ans[negIndex] = nums[3] (-5); negIndex += 2; // 5',
    action: '-5 is negative: write into ans[3]. Increment negIndex to 5.',
    explain: '-5 takes the second odd slot. negIndex moves to index 5.',
    intuition: 'Negatives stay in relative order in odd slots.',
    variables: { i: 3, 'nums[3]': -5, placedAt: 'ans[3]', nextNegIndex: 5 }
  },
  {
    title: '6. Index 4: nums[4] = 2 > 0 -> Place at ans[posIndex = 4]',
    phase: 'PLACE_POSITIVE',
    track: {
      label: 'Input Array nums',
      items: [
        { val: 3, status: 'match' },
        { val: 1, status: 'match' },
        { val: -2, status: 'discarded' },
        { val: -5, status: 'discarded' },
        { val: 2, status: 'match', badge: '+ve' },
        { val: -4 }
      ],
      pointers: [
        { index: 4, label: 'nums[4] = 2' }
      ]
    },
    auxiliaryTrack: {
      label: 'Alternating Result Array ans',
      items: [3, -2, 1, -5, 2, '?']
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'Placed Value', value: '+2 at ans[4]', highlight: true },
      { label: 'All Positives Placed', value: '3 / 3' },
      { label: 'Next negIndex', value: 5 }
    ],
    formula: 'ans[posIndex] = nums[4] (2); posIndex += 2; // 6 (Finished)',
    action: '2 is positive: write into ans[4]. Increment posIndex to 6 (exhausted).',
    explain: 'Final positive value placed into its destination slot.',
    intuition: 'All 3 positive numbers are now positioned in even slots [0, 2, 4].',
    variables: { i: 4, 'nums[4]': 2, placedAt: 'ans[4]', posCompleted: true }
  },
  {
    title: '7. Index 5: nums[5] = -4 < 0 -> Place at ans[negIndex = 5]',
    phase: 'PLACE_NEGATIVE',
    track: {
      label: 'Input Array nums',
      items: [
        { val: 3, status: 'match' },
        { val: 1, status: 'match' },
        { val: -2, status: 'discarded' },
        { val: -5, status: 'discarded' },
        { val: 2, status: 'match' },
        { val: -4, status: 'discarded', badge: '-ve' }
      ],
      pointers: [
        { index: 5, label: 'nums[5] = -4' }
      ]
    },
    auxiliaryTrack: {
      label: 'Alternating Result Array ans',
      items: [3, -2, 1, -5, 2, -4]
    },
    activeI: 5,
    activeJ: null,
    metrics: [
      { label: 'Placed Value', value: '-4 at ans[5]', highlight: true },
      { label: 'All Negatives Placed', value: '3 / 3' },
      { label: 'Scan', value: 'Completed' }
    ],
    formula: 'ans[negIndex] = nums[5] (-4); negIndex += 2; // 7 (Finished)',
    action: '-4 is negative: write into ans[5]. Increment negIndex to 7 (exhausted).',
    explain: 'Final negative placed. Both posIndex and negIndex have completed their cycles.',
    intuition: 'Array fully rearranged in exactly N iterations.',
    variables: { i: 5, 'nums[5]': -4, placedAt: 'ans[5]', negCompleted: true }
  },
  {
    title: '8. Complete: Return ans = [3, -2, 1, -5, 2, -4]',
    phase: 'COMPLETED',
    track: {
      label: 'Final Alternating Array ans',
      items: [
        { val: 3, status: 'match', badge: '+ve' },
        { val: -2, status: 'discarded', badge: '-ve' },
        { val: 1, status: 'match', badge: '+ve' },
        { val: -5, status: 'discarded', badge: '-ve' },
        { val: 2, status: 'match', badge: '+ve' },
        { val: -4, status: 'discarded', badge: '-ve' }
      ],
      pointers: [
        { index: 0, label: '+' },
        { index: 1, label: '-' },
        { index: 2, label: '+' },
        { index: 3, label: '-' },
        { index: 4, label: '+' },
        { index: 5, label: '-' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Result', value: '[3, -2, 1, -5, 2, -4]', highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(N)' }
    ],
    formula: 'return ans;',
    action: 'Algorithm concludes: Returns the interleaved alternating array.',
    explain: 'Positives [3, 1, 2] and negatives [-2, -5, -4] maintain their relative order while strictly alternating signs starting with a positive number.',
    intuition: 'Single-pass two-index routing achieves both stability and linear performance.',
    variables: { result: [3, -2, 1, -5, 2, -4], time: 'O(N)', space: 'O(N)' }
  }
];

// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  display_id: 'Q-002',
  title: 'Second Largest Element in Array',
  category: 'Arrays & Linear Scan',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the second largest distinct element in an array in a single linear pass by maintaining running registers for both the maximum and second maximum elements.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Second Largest Element Strategy',
  nodes: [
    { id: 'root', label: 'Dual Peak Register Invariant', children: ['register-init', 'demotion-update', 'second-peak-update', 'distinctness-guard', 'complexity'] },
    { id: 'register-init', label: '1. Register Initialization', detail: 'Initialize largest = arr[0] and secondLargest = -1 to handle non-negative or absent candidates.' },
    { id: 'demotion-update', label: '2. Champion Demotion (x > largest)', detail: 'If arr[i] > largest, demote current largest to secondLargest and promote arr[i] to largest.' },
    { id: 'second-peak-update', label: '3. Second Peak Candidate', detail: 'Else if arr[i] > secondLargest AND arr[i] != largest, update secondLargest = arr[i].' },
    { id: 'distinctness-guard', label: '4. Strict Inequality Check', detail: 'The check arr[i] != largest guarantees duplicate maxima do not corrupt the second largest value.' },
    { id: 'complexity', label: '5. Single-Pass Efficiency', detail: 'Requires exactly N comparisons in O(N) time with O(1) memory, avoiding O(N log N) sorting.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Single-Pass Solution
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int print2largest(vector<int>& arr) {
        int n = arr.size();
        if (n < 2) return -1;

        int largest = arr[0];
        int secondLargest = -1;

        for (int i = 1; i < n; i++) {
            if (arr[i] > largest) {
                secondLargest = largest; // Demote previous champion
                largest = arr[i];        // Record new champion
            } else if (arr[i] > secondLargest && arr[i] != largest) {
                secondLargest = arr[i];  // Update second largest
            }
        }

        return secondLargest;
    }
};`,
  python: `# Python 3 Optimal Single-Pass Solution
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def print2largest(self, arr: list[int]) -> int:
        if len(arr) < 2:
            return -1

        largest = arr[0]
        second_largest = -1

        for x in arr[1:]:
            if x > largest:
                second_largest = largest
                largest = x
            elif x > second_largest and x != largest:
                second_largest = x

        return second_largest`,
  java: `// Java Optimal Single-Pass Solution
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public int print2largest(int[] arr) {
        if (arr.length < 2) return -1;

        int largest = arr[0];
        int secondLargest = -1;

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > largest) {
                secondLargest = largest;
                largest = arr[i];
            } else if (arr[i] > secondLargest && arr[i] != largest) {
                secondLargest = arr[i];
            }
        }

        return secondLargest;
    }
}`,
  javascript: `// JavaScript Optimal Single-Pass Solution
// Time Complexity: O(N) | Space Complexity: O(1)
var print2largest = function(arr) {
    if (arr.length < 2) return -1;

    let largest = arr[0];
    let secondLargest = -1;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > largest) {
            secondLargest = largest;
            largest = arr[i];
        } else if (arr[i] > secondLargest && arr[i] !== largest) {
            secondLargest = arr[i];
        }
    }

    return secondLargest;
};`
};

export const steps = [
  {
    title: '1. Setup: Array nums = [12, 35, 1, 10, 34, 1]',
    phase: 'SETUP',
    track: {
      label: 'Input Array nums',
      items: [
        { val: 12, status: 'match', badge: 'largest = 12' },
        { val: 35 },
        { val: 1 },
        { val: 10 },
        { val: 34 },
        { val: 1 }
      ],
      pointers: [
        { index: 0, label: 'largest (12)' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'largest', value: 12, highlight: true },
      { label: 'secondLargest', value: -1 },
      { label: 'Elements Scanned', value: '1 / 6' }
    ],
    formula: 'int largest = arr[0]; int secondLargest = -1;',
    action: 'Initialize largest = arr[0] (12) and secondLargest = -1.',
    explain: 'Using -1 as the initial secondLargest sentinel distinguishes arrays where no distinct second largest exists (e.g. all elements identical).',
    intuition: 'We only need two variables to track the two highest peaks in a single pass.',
    variables: { i: 0, 'arr[0]': 12, largest: 12, secondLargest: -1 }
  },
  {
    title: '2. Index 1: arr[1] = 35 > largest (12) -> Demote 12 to secondLargest!',
    phase: 'UPDATE_MAX',
    track: {
      label: 'New Maximum Found: Demotion Triggered',
      items: [
        { val: 12, status: 'match', badge: 'second = 12' },
        { val: 35, status: 'match', badge: 'largest = 35' },
        { val: 1 },
        { val: 10 },
        { val: 34 },
        { val: 1 }
      ],
      pointers: [
        { index: 0, label: '2nd (12)' },
        { index: 1, label: '1st (35)' }
      ]
    },
    activeI: 1,
    activeJ: 0,
    metrics: [
      { label: 'arr[1]', value: 35 },
      { label: 'New largest', value: 35, highlight: true },
      { label: 'New secondLargest', value: 12, highlight: true }
    ],
    formula: 'secondLargest = largest (12); largest = arr[1] (35);',
    action: 'Since 35 > 12, the previous largest (12) becomes the second largest, and 35 takes the top spot.',
    explain: 'When a new absolute maximum is discovered, the previous champion must be demoted to second place.',
    intuition: 'Cascading update preserves the ranking invariant.',
    variables: { i: 1, 'arr[1]': 35, largest: 35, secondLargest: 12 }
  },
  {
    title: '3. Index 2: arr[2] = 1 <= secondLargest (12) -> Discarded',
    phase: 'SCANNING',
    track: {
      label: 'Comparing arr[2] vs Registers',
      items: [
        { val: 12, status: 'match', badge: '2nd' },
        { val: 35, status: 'match', badge: '1st' },
        { val: 1, status: 'discarded', badge: '< 12' },
        { val: 10 },
        { val: 34 },
        { val: 1 }
      ],
      pointers: [
        { index: 2, label: 'i = 2' }
      ]
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'arr[2]', value: 1 },
      { label: '1 > 35 ?', value: 'False' },
      { label: '1 > 12 ?', value: 'False (Skip)' }
    ],
    formula: 'arr[2] <= secondLargest (1 <= 12)',
    action: 'Element 1 is smaller than both largest (35) and secondLargest (12). No updates.',
    explain: '1 cannot challenge either register. Bypassed in O(1).',
    intuition: 'Non-qualifying numbers are ignored immediately.',
    variables: { i: 2, 'arr[2]': 1, largest: 35, secondLargest: 12 }
  },
  {
    title: '4. Index 3: arr[3] = 10 <= secondLargest (12) -> Discarded',
    phase: 'SCANNING',
    track: {
      label: 'Comparing arr[3] vs Registers',
      items: [
        { val: 12, status: 'match', badge: '2nd' },
        { val: 35, status: 'match', badge: '1st' },
        { val: 1, status: 'discarded' },
        { val: 10, status: 'discarded', badge: '< 12' },
        { val: 34 },
        { val: 1 }
      ],
      pointers: [
        { index: 3, label: 'i = 3' }
      ]
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'arr[3]', value: 10 },
      { label: '10 > 35 ?', value: 'False' },
      { label: '10 > 12 ?', value: 'False (Skip)' }
    ],
    formula: 'arr[3] <= secondLargest (10 <= 12)',
    action: '10 is below the second largest threshold of 12. Skip.',
    explain: 'secondLargest remains 12, largest remains 35.',
    intuition: 'Registers remain unchanged.',
    variables: { i: 3, 'arr[3]': 10, largest: 35, secondLargest: 12 }
  },
  {
    title: '5. Index 4: arr[4] = 34 > secondLargest (12) && 34 != 35 -> Update secondLargest = 34!',
    phase: 'UPDATE_SECOND',
    track: {
      label: 'New Second Largest Discovered',
      items: [
        { val: 12 },
        { val: 35, status: 'match', badge: '1st (35)' },
        { val: 1, status: 'discarded' },
        { val: 10, status: 'discarded' },
        { val: 34, status: 'match', badge: 'New 2nd (34)' },
        { val: 1 }
      ],
      pointers: [
        { index: 1, label: 'largest (35)' },
        { index: 4, label: 'secondLargest (34)' }
      ]
    },
    activeI: 4,
    activeJ: 1,
    metrics: [
      { label: 'arr[4]', value: 34 },
      { label: '34 < 35 ?', value: 'True (Not 1st)' },
      { label: 'New secondLargest', value: 34, highlight: true }
    ],
    formula: 'else if (arr[i] > secondLargest && arr[i] != largest) ==> secondLargest = 34',
    action: '34 is not greater than 35, but it is strictly greater than 12 and distinct from 35! Update secondLargest = 34.',
    explain: 'We found an element between secondLargest and largest. It takes over as the new secondLargest value.',
    intuition: 'Runner-up position upgraded without changing the champion.',
    variables: { i: 4, 'arr[4]': 34, largest: 35, secondLargest: 34 }
  },
  {
    title: '6. Index 5: arr[5] = 1 <= secondLargest (34) -> Discarded',
    phase: 'SCANNING',
    track: {
      label: 'Final Element Checked',
      items: [
        { val: 12 },
        { val: 35, status: 'match', badge: '1st (35)' },
        { val: 1, status: 'discarded' },
        { val: 10, status: 'discarded' },
        { val: 34, status: 'match', badge: '2nd (34)' },
        { val: 1, status: 'discarded', badge: '< 34' }
      ],
      pointers: [
        { index: 5, label: 'i = 5' }
      ]
    },
    activeI: 5,
    activeJ: null,
    metrics: [
      { label: 'arr[5]', value: 1 },
      { label: 'Threshold', value: 'secondLargest = 34' },
      { label: 'Traversed', value: '6 / 6 (Done)' }
    ],
    formula: 'arr[5] <= secondLargest (1 <= 34)',
    action: '1 is below the current second largest bar (34). Traversal finishes.',
    explain: 'All elements in the array have been processed.',
    intuition: 'End of array reached.',
    variables: { i: 5, 'arr[5]': 1, largest: 35, secondLargest: 34 }
  },
  {
    title: '7. Complete: Return secondLargest = 34',
    phase: 'COMPLETED',
    track: {
      label: 'Final Result: Second Largest Distinct Value',
      items: [
        { val: 12 },
        { val: 35, status: 'match', badge: 'Largest (35)' },
        { val: 1 },
        { val: 10 },
        { val: 34, status: 'match', badge: '2nd Largest (34)' },
        { val: 1 }
      ],
      pointers: [
        { index: 4, label: 'Return 34' }
      ]
    },
    activeI: 4,
    activeJ: 1,
    metrics: [
      { label: 'Second Largest', value: 34, highlight: true },
      { label: 'Largest', value: 35 },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    formula: 'return secondLargest; // 34',
    action: 'Algorithm concludes: Returns 34 as the second largest distinct element.',
    explain: 'Single-pass scan successfully identified 34 in O(N) time and O(1) space, without sorting the array.',
    intuition: 'Optimal dual-register scanning avoids the O(N log N) sorting cost and O(N) hash set overhead.',
    variables: { largest: 35, secondLargest: 34, result: 34, time: 'O(N)', space: 'O(1)' }
  }
];
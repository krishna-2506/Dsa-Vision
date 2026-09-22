// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Sliding Window Maximum',
  category: 'Stack and Queues & Sliding Window',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(K) Auxiliary',
  description: 'Finds the maximum value in every contiguous sliding window of size K in linear time using a monotonic decreasing double-ended queue (deque).'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Monotonic Decreasing Deque Invariant',
  nodes: [
    { id: 'root', label: 'Monotonic Deque Strategy', children: ['front-eviction', 'back-pruning', 'push-index', 'record-max', 'complexity'] },
    { id: 'front-eviction', label: '1. Window Bounds Eviction', detail: 'If the front index dq.front() <= i - K, it has slid outside the active window of size K; pop it from the front.' },
    { id: 'back-pruning', label: '2. Monotonicity Pruning', detail: 'While !dq.empty() and nums[dq.back()] <= nums[i], pop from back; smaller, older elements can never be the maximum again.' },
    { id: 'push-index', label: '3. Store Indices in Deque', detail: 'Push the current index i to the back of the deque, maintaining strictly decreasing element values.' },
    { id: 'record-max', label: '4. Extract Window Peak', detail: 'When i >= K - 1, the maximum element in the current window is always at the front: nums[dq.front()].' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Each index enters and exits the deque at most once -> O(N) time with O(K) space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Sliding Window Maximum using Monotonic Deque
// Time Complexity: O(N) | Space Complexity: O(K)
#include <vector>
#include <deque>
using namespace std;

class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> dq; // Stores indices in decreasing order of values
        vector<int> result;

        for (int i = 0; i < (int)nums.size(); i++) {
            // 1. Remove indices out of window bounds
            if (!dq.empty() && dq.front() <= i - k) {
                dq.pop_front();
            }

            // 2. Remove smaller elements from back
            while (!dq.empty() && nums[dq.back()] <= nums[i]) {
                dq.pop_back();
            }

            // 3. Push current index
            dq.push_back(i);

            // 4. Record maximum when window is full
            if (i >= k - 1) {
                result.push_back(nums[dq.front()]);
            }
        }

        return result;
    }
};`,
  python: `# Python 3 Sliding Window Maximum using Monotonic Deque
# Time Complexity: O(N) | Space Complexity: O(K)
from collections import deque

class Solution:
    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:
        dq = deque() # indices
        result = []

        for i, x in enumerate(nums):
            # Remove indices outside window
            if dq and dq[0] <= i - k:
                dq.popleft()

            # Remove smaller elements
            while dq and nums[dq[-1]] <= x:
                dq.pop()

            dq.append(i)

            if i >= k - 1:
                result.append(nums[dq[0]])

        return result`,
  java: `// Java Sliding Window Maximum using Monotonic Deque
// Time Complexity: O(N) | Space Complexity: O(K)
import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] result = new int[n - k + 1];
        Deque<Integer> dq = new ArrayDeque<>();
        int idx = 0;

        for (int i = 0; i < n; i++) {
            if (!dq.isEmpty() && dq.peekFirst() <= i - k) {
                dq.pollFirst();
            }

            while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) {
                dq.pollLast();
            }

            dq.offerLast(i);

            if (i >= k - 1) {
                result[idx++] = nums[dq.peekFirst()];
            }
        }

        return result;
    }
}`,
  javascript: `// JavaScript Sliding Window Maximum using Monotonic Deque
// Time Complexity: O(N) | Space Complexity: O(K)
var maxSlidingWindow = function(nums, k) {
    const dq = []; // store indices
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        if (dq.length && dq[0] <= i - k) {
            dq.shift();
        }

        while (dq.length && nums[dq[dq.length - 1]] <= nums[i]) {
            dq.pop();
        }

        dq.push(i);

        if (i >= k - 1) {
            result.push(nums[dq[0]]);
        }
    }

    return result;
};`
};

export const steps = [
  {
    title: '1. Setup & Monotonic Deque Invariant',
    phase: 'INITIAL',
    track: {
      label: 'nums = [1, 3, -1, -3, 5, 3, 6, 7] (Window K = 3)',
      items: [
        { val: 1 },
        { val: 3 },
        { val: -1 },
        { val: -3 },
        { val: 5 },
        { val: 3 },
        { val: 6 },
        { val: 7 }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Window Size (K)', value: 3 },
      { label: 'Deque State', value: '[] (Empty)' },
      { label: 'Result Maxima', value: '[]' },
      { label: 'Time Complexity', value: 'O(N) Amortized', highlight: true }
    ],
    formula: 'deque<int> dq; // Maintains indices with values in strictly decreasing order',
    action: 'Initialize an empty double-ended queue to store candidate indices for window maxima.',
    explain: 'Goal: Find the maximum value in every contiguous window of size K = 3.',
    intuition: 'If nums[i] >= nums[j] and i > j, nums[j] can NEVER be the maximum in any future window. We prune it immediately from the deque.',
    variables: {
      'nums': '[1, 3, -1, -3, 5, 3, 6, 7]',
      'k': 3,
      'dq': '[]',
      'result': '[]'
    }
  },
  {
    title: '2. Window 1: Indices 0..2 ([1, 3, -1] -> Max = 3)',
    phase: 'WINDOW_MAX',
    track: {
      label: 'Window [0..2] = [1, 3, -1]: 3 dominates 1 (popped). Deque has [1 (val 3), 2 (val -1)]',
      items: [
        { val: 1, status: 'mismatch', badge: 'Popped' },
        { val: 3, status: 'match', badge: '👑 Max = 3 (idx 1)' },
        { val: -1, status: 'active', badge: 'idx 2' },
        { val: -3 },
        { val: 5 },
        { val: 3 },
        { val: 6 },
        { val: 7 }
      ]
    },
    activeI: 0,
    activeJ: 2,
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'Active Window', value: '[1, 3, -1]' },
      { label: 'Deque Indices', value: '[1, 2] (vals: 3, -1)' },
      { label: 'Window Max', value: 'nums[dq[0]] = 3', highlight: true },
      { label: 'Results', value: '[3]' }
    ],
    formula: 'dq = [1, 2]; max = nums[1] = 3; result.push_back(3);',
    action: 'Process indices 0, 1, 2. Value 3 pops 1 from back. -1 is smaller than 3, so pushed. Deque front is index 1.',
    explain: 'At index 2, first full window is reached (i >= K - 1). Deque front is index 1 with value 3. Result: [3].',
    intuition: 'Deque front always holds the index of the largest value in the current window.',
    variables: {
      'i': 2,
      'dq': '[1, 2]',
      'result': '[3]'
    }
  },
  {
    title: '3. Window 2: Index 3 ([-3] enters -> Window [3, -1, -3] -> Max = 3)',
    phase: 'WINDOW_MAX',
    track: {
      label: 'Window [1..3] = [3, -1, -3]: -3 is pushed. Deque: [1, 2, 3]',
      items: [
        { val: 1 },
        { val: 3, status: 'match', badge: '👑 Max = 3 (idx 1)' },
        { val: -1, status: 'active' },
        { val: -3, status: 'active', badge: 'idx 3' },
        { val: 5 },
        { val: 3 },
        { val: 6 },
        { val: 7 }
      ]
    },
    activeI: 1,
    activeJ: 3,
    windowStart: 1,
    windowEnd: 3,
    metrics: [
      { label: 'Active Window', value: '[3, -1, -3]' },
      { label: 'Deque Indices', value: '[1, 2, 3] (3, -1, -3)' },
      { label: 'Window Max', value: 3, highlight: true },
      { label: 'Results', value: '[3, 3]' }
    ],
    formula: 'dq.front() = 1 > 3 - 3 (in bounds); dq.push(3); max = nums[1] = 3;',
    action: 'i = 3: dq.front() = 1 is inside window [1..3]. -3 is pushed to back. Deque front remains index 1.',
    explain: 'Values in deque are decreasing: 3 > -1 > -3. Front index 1 holds maximum 3. Result updates to [3, 3].',
    intuition: 'Smaller subsequent elements are retained because they might become maximums when earlier elements expire.',
    variables: {
      'i': 3,
      'dq': '[1, 2, 3]',
      'result': '[3, 3]'
    }
  },
  {
    title: '4. Window 3: Index 4 ([5] enters -> Clears Deque! Max = 5)',
    phase: 'WINDOW_MAX',
    track: {
      label: 'Window [2..4] = [-1, -3, 5]: 5 is larger than all elements in deque -> POPS ALL!',
      items: [
        { val: 1 },
        { val: 3, status: 'mismatch', badge: 'Expired' },
        { val: -1, status: 'mismatch', badge: 'Popped by 5' },
        { val: -3, status: 'mismatch', badge: 'Popped by 5' },
        { val: 5, status: 'match', badge: '👑 Max = 5 (idx 4)' },
        { val: 3 },
        { val: 6 },
        { val: 7 }
      ]
    },
    activeI: 2,
    activeJ: 4,
    windowStart: 2,
    windowEnd: 4,
    metrics: [
      { label: 'Active Window', value: '[-1, -3, 5]' },
      { label: 'New Element', value: 'nums[4] = 5' },
      { label: 'Deque Purged', value: 'Pops -3, -1, 3 expired' },
      { label: 'New Deque', value: '[4] (val: 5)', highlight: true }
    ],
    formula: 'dq.pop_front() (idx 1 expired); while(nums[dq.back()] <= 5) pop; dq = [4];',
    action: 'Index 1 expired (1 <= 4 - 3). 5 is greater than -3 and -1, popping them both! Only index 4 remains in deque.',
    explain: 'Window [2..4] has maximum 5. Deque front is 4. Result: [3, 3, 5].',
    intuition: 'A large new element completely clears all smaller predecessors.',
    variables: {
      'i': 4,
      'dq': '[4]',
      'result': '[3, 3, 5]'
    }
  },
  {
    title: '5. Window 4: Index 5 ([3] enters -> Window [5, 3] -> Max = 5)',
    phase: 'WINDOW_MAX',
    track: {
      label: 'Window [3..5] = [-3, 5, 3]: 3 is pushed behind 5. Deque: [4 (val 5), 5 (val 3)]',
      items: [
        { val: 1 },
        { val: 3 },
        { val: -1 },
        { val: -3, status: 'mismatch', badge: 'Expired' },
        { val: 5, status: 'match', badge: '👑 Max = 5' },
        { val: 3, status: 'active', badge: 'idx 5' },
        { val: 6 },
        { val: 7 }
      ]
    },
    activeI: 3,
    activeJ: 5,
    windowStart: 3,
    windowEnd: 5,
    metrics: [
      { label: 'Active Window', value: '[-3, 5, 3]' },
      { label: 'Deque State', value: '[4, 5] (vals: 5, 3)' },
      { label: 'Window Max', value: 5, highlight: true },
      { label: 'Results', value: '[3, 3, 5, 5]' }
    ],
    formula: 'dq.push(5); max = nums[dq[0]] = nums[4] = 5;',
    action: 'i = 5: 3 is smaller than 5, pushed to back. Deque front remains index 4 (value 5).',
    explain: 'Window [-3, 5, 3] maximum is 5. Result: [3, 3, 5, 5].',
    intuition: 'Decreasing invariant preserved: 5 > 3.',
    variables: {
      'i': 5,
      'dq': '[4, 5]',
      'result': '[3, 3, 5, 5]'
    }
  },
  {
    title: '6. Window 5: Index 6 ([6] enters -> Clears Deque! Max = 6)',
    phase: 'WINDOW_MAX',
    track: {
      label: 'Window [4..6] = [5, 3, 6]: 6 is larger than 3 and 5 -> POPS ALL! Deque: [6]',
      items: [
        { val: 1 },
        { val: 3 },
        { val: -1 },
        { val: -3 },
        { val: 5, status: 'mismatch', badge: 'Popped by 6' },
        { val: 3, status: 'mismatch', badge: 'Popped by 6' },
        { val: 6, status: 'match', badge: '👑 Max = 6 (idx 6)' },
        { val: 7 }
      ]
    },
    activeI: 4,
    activeJ: 6,
    windowStart: 4,
    windowEnd: 6,
    metrics: [
      { label: 'Active Window', value: '[5, 3, 6]' },
      { label: 'Pops Occurred', value: 'nums[5]=3 and nums[4]=5 popped' },
      { label: 'New Deque', value: '[6] (val: 6)', highlight: true },
      { label: 'Results', value: '[3, 3, 5, 5, 6]' }
    ],
    formula: 'while(nums[dq.back()] <= 6) dq.pop_back(); dq = [6];',
    action: 'Value 6 pops both 3 and 5 from deque. Deque becomes [6]. Window maximum is 6.',
    explain: 'Window [4..6] = [5, 3, 6] has maximum 6. Result: [3, 3, 5, 5, 6].',
    intuition: '6 dominates the entire window.',
    variables: {
      'i': 6,
      'dq': '[6]',
      'result': '[3, 3, 5, 5, 6]'
    }
  },
  {
    title: '7. Window 6: Index 7 ([7] enters -> Clears Deque! Max = 7)',
    phase: 'WINDOW_MAX',
    track: {
      label: 'Window [5..7] = [3, 6, 7]: 7 pops 6 -> Deque: [7]. Max = 7',
      items: [
        { val: 1 },
        { val: 3 },
        { val: -1 },
        { val: -3 },
        { val: 5 },
        { val: 3, status: 'mismatch', badge: 'Expired' },
        { val: 6, status: 'mismatch', badge: 'Popped by 7' },
        { val: 7, status: 'match', badge: '👑 Max = 7 (idx 7)' }
      ]
    },
    activeI: 5,
    activeJ: 7,
    windowStart: 5,
    windowEnd: 7,
    metrics: [
      { label: 'Active Window', value: '[3, 6, 7]' },
      { label: 'Deque State', value: '[7] (val: 7)', highlight: true },
      { label: 'Window Max', value: 7, highlight: true },
      { label: 'Final Results', value: '[3, 3, 5, 5, 6, 7]' }
    ],
    formula: 'dq.pop_back() (6 popped); dq = [7]; result.push(7);',
    action: 'Final element 7 enters, popping 6 from back. Window [5..7] has maximum 7.',
    explain: 'Last window [3, 6, 7] evaluated. All 6 sliding windows processed in linear time.',
    intuition: 'Array traversal completes.',
    variables: {
      'i': 7,
      'dq': '[7]',
      'result': '[3, 3, 5, 5, 6, 7]'
    }
  },
  {
    title: '8. Result: Sliding Window Maximums = [3, 3, 5, 5, 6, 7]',
    phase: 'COMPLETED',
    track: {
      label: 'All 6 Window Maxima Computed in O(N) Time',
      items: [
        { val: 1 },
        { val: 3, status: 'match', badge: 'Max 1 & 2' },
        { val: -1 },
        { val: -3 },
        { val: 5, status: 'match', badge: 'Max 3 & 4' },
        { val: 3 },
        { val: 6, status: 'match', badge: 'Max 5' },
        { val: 7, status: 'match', badge: 'Max 6' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Total Windows', value: 'N - K + 1 = 6' },
      { label: 'Maxima Array', value: '[3, 3, 5, 5, 6, 7]', highlight: true },
      { label: 'Time Complexity', value: 'O(N) Strict' },
      { label: 'Space Complexity', value: 'O(K) Deque' }
    ],
    formula: 'return result = [3, 3, 5, 5, 6, 7];',
    action: 'Return the collected array of window maxima.',
    explain: 'Each of the 8 elements entered and left the deque at most once, strictly achieving O(N) linear time.',
    intuition: 'Monotonic deque achieves optimal O(N) time where a heap or balanced BST would take O(N log K).',
    variables: {
      'result': '[3, 3, 5, 5, 6, 7]',
      'timeComplexity': 'O(N)',
      'spaceComplexity': 'O(K)'
    }
  }
];

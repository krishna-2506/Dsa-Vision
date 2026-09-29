// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Longest Subarray with Sum K',
  category: 'Arrays & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(2N) ~ O(N) Sliding Window (Positives) / O(N) Hash Map',
  spaceComplexity: 'O(1) Two Pointers / O(N) Prefix Map',
  description: 'Finds the maximum length of a contiguous subarray whose elements sum to K using an expanding and contracting sliding window.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Sliding Window Subarray Strategy',
  nodes: [
    { id: 'root', label: 'Dynamic Sliding Window Invariant', children: ['expand-right', 'shrink-left', 'target-match', 'max-update', 'complexity'] },
    { id: 'expand-right', label: '1. Window Expansion', detail: 'Advance end pointer rightward and add nums[end] to current window sum.' },
    { id: 'shrink-left', label: '2. Excess Shrinkage (sum > k)', detail: 'While sum > k and start <= end, subtract nums[start] and advance start++.' },
    { id: 'target-match', label: '3. Exact Match Check (sum == k)', detail: 'When sum equals k, compute current window length: (end - start + 1).' },
    { id: 'max-update', label: '4. Maximize Length Invariant', detail: 'Update maxLen = max(maxLen, end - start + 1) to retain the global longest subarray.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Each element enters and exits the window at most once: strictly O(2N) time with O(1) extra space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Sliding Window for Positive Arrays
// Time Complexity: O(2N) ~ O(N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestSubarrayWithSumK(vector<int>& a, long long k) {
        int start = 0;
        int maxLen = 0;
        long long sum = 0;
        int n = a.size();

        for (int end = 0; end < n; end++) {
            sum += a[end];

            // Shrink window from left if sum exceeds target k
            while (sum > k && start <= end) {
                sum -= a[start];
                start++;
            }

            // Record maximum length if exact match
            if (sum == k) {
                maxLen = max(maxLen, end - start + 1);
            }
        }

        return maxLen;
    }
};`,
  python: `# Python 3 Optimal Sliding Window
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def longestSubarrayWithSumK(self, a: list[int], k: int) -> int:
        start = 0
        max_len = 0
        window_sum = 0

        for end in range(len(a)):
            window_sum += a[end]

            while window_sum > k and start <= end:
                window_sum -= a[start]
                start += 1

            if window_sum == k:
                max_len = max(max_len, end - start + 1)

        return max_len`,
  java: `// Java Optimal Sliding Window
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public int longestSubarrayWithSumK(int[] a, long k) {
        int start = 0;
        int maxLen = 0;
        long sum = 0;
        int n = a.length;

        for (int end = 0; end < n; end++) {
            sum += a[end];

            while (sum > k && start <= end) {
                sum -= a[start];
                start++;
            }

            if (sum == k) {
                maxLen = Math.max(maxLen, end - start + 1);
            }
        }

        return maxLen;
    }
}`,
  javascript: `// JavaScript Optimal Sliding Window
// Time Complexity: O(N) | Space Complexity: O(1)
var longestSubarrayWithSumK = function(a, k) {
    let start = 0;
    let maxLen = 0;
    let sum = 0;

    for (let end = 0; end < a.length; end++) {
        sum += a[end];

        while (sum > k && start <= end) {
            sum -= a[start];
            start++;
        }

        if (sum === k) {
            maxLen = Math.max(maxLen, end - start + 1);
        }
    }

    return maxLen;
};`
};

export const steps = [
  {
    title: '1. Initialize Sliding Window Pointers',
    phase: 'INITIALIZATION',
    codeLine: 11,
    track: {
      label: 'a (array)',
      items: [
        { val: 1, status: 'current' },
        { val: 2, status: 'default' },
        { val: 3, status: 'default' },
        { val: 1, status: 'default' },
        { val: 1, status: 'default' },
        { val: 1, status: 'default' },
        { val: 1, status: 'default' }
      ]
    },
    pointers: [
      { index: 0, label: 'start', color: 'accent' },
      { index: 0, label: 'end', color: 'amber' }
    ],
    windowStart: 0,
    windowEnd: 0,
    metrics: [
      { label: 'Target K', value: '3' },
      { label: 'Window Sum', value: '1' },
      { label: 'Window Length', value: '1' },
      { label: 'Max Length', value: '0' }
    ],
    customCard: {
      title: 'Window Bounds & Sum',
      rows: [
        { label: 'Subarray [start..end]', value: '[1] (idx 0..0)' },
        { label: 'Current Sum', value: '1 (1 < 3)' },
        { label: 'Action', value: 'Sum below target; expand end pointer' }
      ]
    },
    formula: 'start = 0, end = 0; sum = a[0] = 1 < K (3)',
    action: 'Place start and end at index 0. Add a[0]=1 to window sum.',
    explain: 'Sum 1 is strictly less than target K=3. Window must expand to encompass more elements.',
    intuition: 'A sliding window dynamically grows to meet or exceed target K, and shrinks only when exceeding it.'
  },
  {
    title: '2. Expand Window: end = 1 -> Sum = 1 + 2 = 3 (MATCH!)',
    phase: 'MATCH_FOUND',
    codeLine: 24,
    track: {
      label: 'a (array)',
      items: [
        { val: 1, status: 'match' },
        { val: 2, status: 'match' },
        { val: 3, status: 'default' },
        { val: 1, status: 'default' },
        { val: 1, status: 'default' },
        { val: 1, status: 'default' },
        { val: 1, status: 'default' }
      ]
    },
    pointers: [
      { index: 0, label: 'start', color: 'accent' },
      { index: 1, label: 'end', color: 'amber' }
    ],
    windowStart: 0,
    windowEnd: 1,
    metrics: [
      { label: 'Target K', value: '3' },
      { label: 'Window Sum', value: '3' },
      { label: 'Window Length', value: '2' },
      { label: 'Max Length', value: '2' }
    ],
    customCard: {
      title: 'Target Match Discovered!',
      rows: [
        { label: 'Subarray [start..end]', value: '[1, 2] (idx 0..1)' },
        { label: 'Current Sum', value: '1 + 2 = 3 == K' },
        { label: 'Max Length Updated', value: 'max(0, 1 - 0 + 1) = 2' }
      ]
    },
    formula: 'sum == K (3 == 3); maxLen = max(0, 1 - 0 + 1) = 2',
    action: 'Advance end to 1. sum += a[1] (2) -> sum = 3. Exact match found! maxLen = 2.',
    explain: 'Subarray [1, 2] at indices [0..1] sums exactly to 3. Record maxLen = 2.',
    intuition: 'Whenever sum equals K, we record the span length before further expansion.'
  },
  {
    title: '3. Expand Window: end = 2 -> Sum = 6 (> 3) -> Shrink',
    phase: 'SHRINK_WINDOW',
    codeLine: 18,
    track: {
      label: 'a (array)',
      items: [
        { val: 1, status: 'dimmed' },
        { val: 2, status: 'dimmed' },
        { val: 3, status: 'match' },
        { val: 1, status: 'default' },
        { val: 1, status: 'default' },
        { val: 1, status: 'default' },
        { val: 1, status: 'default' }
      ]
    },
    pointers: [
      { index: 2, label: 'start', color: 'accent' },
      { index: 2, label: 'end', color: 'amber' }
    ],
    windowStart: 2,
    windowEnd: 2,
    metrics: [
      { label: 'Target K', value: '3' },
      { label: 'Window Sum', value: '3' },
      { label: 'Window Length', value: '1' },
      { label: 'Max Length', value: '2' }
    ],
    customCard: {
      title: 'Shrink & Re-match',
      rows: [
        { label: 'Sum with a[2]=3', value: '3 + 3 = 6 (> K=3)' },
        { label: 'Shrink Actions', value: 'Remove a[0]=1, a[1]=2 -> start moves to 2' },
        { label: 'New Window', value: '[3] (sum=3 == K) -> length 1 <= maxLen 2' }
      ]
    },
    formula: 'sum -= a[0], sum -= a[1]; sum = 3 == K; maxLen remains 2',
    action: 'Adding a[2]=3 made sum=6. Shrink start until sum <= 3. Now start=2, sum=3, length=1.',
    explain: 'Single-element subarray [3] at index 2 matches sum K=3, but length 1 does not exceed current max 2.',
    intuition: 'The left pointer rapidly recovers the invariant by discarding accumulated prefix values.'
  },
  {
    title: '4. Expand Across Consecutive 1s (end: 3 -> 5)',
    phase: 'EXPANDING',
    codeLine: 24,
    track: {
      label: 'a (array)',
      items: [
        { val: 1, status: 'dimmed' },
        { val: 2, status: 'dimmed' },
        { val: 3, status: 'dimmed' },
        { val: 1, status: 'match' },
        { val: 1, status: 'match' },
        { val: 1, status: 'match' },
        { val: 1, status: 'default' }
      ]
    },
    pointers: [
      { index: 3, label: 'start', color: 'accent' },
      { index: 5, label: 'end', color: 'amber' }
    ],
    windowStart: 3,
    windowEnd: 5,
    metrics: [
      { label: 'Target K', value: '3' },
      { label: 'Window Sum', value: '3' },
      { label: 'Window Length', value: '3' },
      { label: 'Max Length', value: '3' }
    ],
    customCard: {
      title: 'New Global Maximum Discovered!',
      rows: [
        { label: 'Subarray [start..end]', value: '[1, 1, 1] (idx 3..5)' },
        { label: 'Current Sum', value: '1 + 1 + 1 = 3 == K' },
        { label: 'Max Length Updated', value: 'max(2, 5 - 3 + 1) = 3 (NEW MAX!)' }
      ]
    },
    formula: 'sum == 3 == K; maxLen = max(2, 5 - 3 + 1) = 3',
    action: 'Window shifts to span [1, 1, 1] across indices 3..5. Sum is 3. Max length updates to 3!',
    explain: 'Subarray [1, 1, 1] spanning indices 3 through 5 has length 3, strictly exceeding our previous best length of 2.',
    intuition: 'Longer subarrays with smaller values can equal the same sum K. The sliding window naturally captures the longest such span.'
  },
  {
    title: '5. Expand to Last Element (end = 6) & Finalize',
    phase: 'COMPLETED',
    codeLine: 29,
    track: {
      label: 'a (array)',
      items: [
        { val: 1, status: 'dimmed' },
        { val: 2, status: 'dimmed' },
        { val: 3, status: 'dimmed' },
        { val: 1, status: 'dimmed' },
        { val: 1, status: 'match' },
        { val: 1, status: 'match' },
        { val: 1, status: 'match' }
      ]
    },
    pointers: [
      { index: 4, label: 'start', color: 'accent' },
      { index: 6, label: 'end', color: 'amber' }
    ],
    windowStart: 4,
    windowEnd: 6,
    metrics: [
      { label: 'Max Subarray Length', value: '3' },
      { label: 'Optimal Window', value: 'indices [3..5] or [4..6]' },
      { label: 'Target K', value: '3' },
      { label: 'Space Complexity', value: 'O(1) Auxiliary' }
    ],
    customCard: {
      title: 'Final Search Result',
      rows: [
        { label: 'Max Length', value: '3 elements' },
        { label: 'Winning Subarrays', value: '[1, 1, 1] at indices [3..5] or [4..6]' },
        { label: 'Total Operations', value: 'O(N) amortized window shifts' }
      ]
    },
    formula: 'return maxLen; // 3',
    action: 'End pointer reached the end of array. Maximum valid subarray length is 3.',
    explain: 'Sliding window completed scanning in O(2N) total pointer increments with zero memory allocation.',
    intuition: 'Because each index is advanced by start and end at most once, the algorithm scales linearly regardless of array size.'
  }
];

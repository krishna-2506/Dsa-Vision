// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Longest Subarray with Sum K (Prefix Sum + Hash Map)',
  category: 'Arrays & Prefix Sum',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Finds the length of the longest contiguous subarray whose sum equals K using the Prefix Sum and Hash Map technique. Handles positive, negative, and zero values by caching the earliest occurrence of each prefix sum.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Prefix Sum & Subarray Sum K Strategy',
  nodes: [
    { id: 'root', label: 'Prefix Sum Difference Identity', children: ['prefix-identity', 'hash-map-store', 'earliest-index-rule', 'direct-match', 'complexity'] },
    { id: 'prefix-identity', label: '1. Prefix Difference Identity', detail: 'If PrefixSum[i] - PrefixSum[j] == K, then the slice from j+1 to i sums exactly to K.' },
    { id: 'hash-map-store', label: '2. Remainder Lookup (sum - K)', detail: 'At each index i, query map for rem = (sum - K). If rem exists at index j, length = i - j.' },
    { id: 'earliest-index-rule', label: '3. Store Earliest Index Only', detail: 'If sum is already in map, do NOT overwrite it. Earliest index maximizes subarray length (i - j).' },
    { id: 'direct-match', label: '4. Direct Prefix Match (sum == K)', detail: 'When running sum equals K from the very start (index 0), subarray length is directly (i + 1).' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'O(N) time with O(N) space, working seamlessly with negatives and zeros.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Prefix Sum + Hash Map for Longest Subarray with Sum K
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestSubarray(vector<int>& nums, int k) {
        unordered_map<int, int> prefixMap; // prefixSum -> earliestIndex
        int sum = 0, maxLen = 0;

        for (int i = 0; i < (int)nums.size(); i++) {
            sum += nums[i];

            // Case 1: Subarray starting from index 0
            if (sum == k) {
                maxLen = max(maxLen, i + 1);
            }

            // Case 2: Subarray starting after an earlier prefix sum
            int rem = sum - k;
            if (prefixMap.find(rem) != prefixMap.end()) {
                int len = i - prefixMap[rem];
                maxLen = max(maxLen, len);
            }

            // Only insert first occurrence to maximize length
            if (prefixMap.find(sum) == prefixMap.end()) {
                prefixMap[sum] = i;
            }
        }

        return maxLen;
    }
};`,
  python: `# Python 3 Optimal Prefix Sum + Hash Map
# Time Complexity: O(N) | Space Complexity: O(N)
class Solution:
    def longestSubarray(self, nums: list[int], k: int) -> int:
        prefix_map = {} # sum -> first occurrence index
        curr_sum = 0
        max_len = 0

        for i, val in enumerate(nums):
            curr_sum += val

            # Case 1: Subarray starting at index 0
            if curr_sum == k:
                max_len = max(max_len, i + 1)

            # Case 2: Subarray between earlier prefix and i
            rem = curr_sum - k
            if rem in prefix_map:
                length = i - prefix_map[rem]
                max_len = max(max_len, length)

            # Preserve earliest index
            if curr_sum not in prefix_map:
                prefix_map[curr_sum] = i

        return max_len`,
  java: `// Java Optimal Prefix Sum + Hash Map
// Time Complexity: O(N) | Space Complexity: O(N)
import java.util.*;

class Solution {
    public int longestSubarray(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        int sum = 0, maxLen = 0;

        for (int i = 0; i < nums.length; i++) {
            sum += nums[i];

            if (sum == k) {
                maxLen = Math.max(maxLen, i + 1);
            }

            int rem = sum - k;
            if (map.containsKey(rem)) {
                maxLen = Math.max(maxLen, i - map.get(rem));
            }

            if (!map.containsKey(sum)) {
                map.put(sum, i);
            }
        }

        return maxLen;
    }
}`,
  javascript: `// JavaScript Optimal Prefix Sum + Hash Map
// Time Complexity: O(N) | Space Complexity: O(N)
var longestSubarray = function(nums, k) {
    const map = new Map();
    let sum = 0, maxLen = 0;

    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];

        if (sum === k) {
            maxLen = Math.max(maxLen, i + 1);
        }

        const rem = sum - k;
        if (map.has(rem)) {
            maxLen = Math.max(maxLen, i - map.get(rem));
        }

        if (!map.has(sum)) {
            map.set(sum, i);
        }
    }

    return maxLen;
};`
};

export const steps = [
  {
    title: '1. Setup: Array nums = [10, 5, 2, 7, 1, 9], Target K = 15',
    phase: 'SETUP',
    track: {
      label: 'Input Array nums',
      items: [
        { val: 10 },
        { val: 5 },
        { val: 2 },
        { val: 7 },
        { val: 1 },
        { val: 9 }
      ],
      pointers: [
        { index: 0, label: 'Start (i = 0)' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Target K', value: 15 },
      { label: 'Running Sum', value: 0 },
      { label: 'maxLen', value: 0 }
    ],
    formula: 'prefixMap = {}; sum = 0; maxLen = 0;',
    action: 'Initialize prefix sum hash map and variables. Target K = 15.',
    explain: 'To find the longest slice with sum K in O(N) time, we accumulate running prefix sums and record each sum’s earliest seen index in a hash map.',
    intuition: 'If sum at index i is S, and sum at index j was S - K, then sum(nums[j+1 .. i]) = S - (S - K) = K.',
    variables: { k: 15, currentSum: 0, maxLen: 0, map: '{}' }
  },
  {
    title: '2. Index 0: nums[0] = 10 -> Sum = 10, rem = -5 (Not in map)',
    phase: 'ACCUMULATE',
    track: {
      label: 'Array nums',
      items: [
        { val: 10, status: 'active', badge: 'sum = 10' },
        { val: 5 },
        { val: 2 },
        { val: 7 },
        { val: 1 },
        { val: 9 }
      ],
      pointers: [
        { index: 0, label: 'i = 0' }
      ]
    },
    auxiliaryTrack: {
      label: 'Prefix Sums',
      items: [10, '?', '?', '?', '?', '?']
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'nums[0]', value: 10 },
      { label: 'Running Sum', value: 10 },
      { label: 'rem (10 - 15)', value: -5 }
    ],
    formula: 'sum = 10; rem = 10 - 15 = -5 (absent); map[10] = 0;',
    action: 'Add 10 to sum. rem = -5 is not in map. Store map[10] = 0.',
    explain: 'Sum 10 != 15. The remainder required to form sum 15 is -5, which is not present. Cache map[10] = index 0.',
    intuition: 'Record prefix sum 10 at index 0 for future lookups.',
    variables: { i: 0, 'nums[0]': 10, sum: 10, rem: -5, 'map[10]': 0, maxLen: 0 }
  },
  {
    title: '3. Index 1: nums[1] = 5 -> Sum = 15 == K! Match: Subarray [0..1] (len: 2)',
    phase: 'SUBARRAY_FOUND',
    track: {
      label: 'Array nums',
      items: [
        { val: 10, status: 'match', badge: 'K = 15' },
        { val: 5, status: 'match', badge: 'K = 15' },
        { val: 2 },
        { val: 7 },
        { val: 1 },
        { val: 9 }
      ],
      pointers: [
        { index: 1, label: 'i = 1 (sum == K)' }
      ]
    },
    auxiliaryTrack: {
      label: 'Prefix Sums',
      items: [10, 15, '?', '?', '?', '?']
    },
    windowStart: 0,
    windowEnd: 1,
    activeI: 1,
    activeJ: 0,
    metrics: [
      { label: 'Running Sum', value: 15, highlight: true },
      { label: 'sum == K ?', value: 'True (len = 2)', highlight: true },
      { label: 'New maxLen', value: 2 }
    ],
    formula: 'sum == k (15 == 15) ==> maxLen = max(0, 1 + 1) = 2',
    action: 'Sum equals target K (15)! Subarray [0..1] ([10, 5]) has sum 15. maxLen = 2.',
    explain: 'Since sum == K directly from index 0, the subarray is nums[0..1]. Length is (1 - 0 + 1) = 2. Update maxLen = 2. Store map[15] = 1.',
    intuition: 'First valid candidate subarray found.',
    variables: { i: 1, 'nums[1]': 5, sum: 15, 'sum == k': true, maxLen: 2, 'map[15]': 1 }
  },
  {
    title: '4. Index 2: nums[2] = 2 -> Sum = 17, rem = 2 (Not in map)',
    phase: 'ACCUMULATE',
    track: {
      label: 'Array nums',
      items: [
        { val: 10 },
        { val: 5 },
        { val: 2, status: 'active', badge: 'sum = 17' },
        { val: 7 },
        { val: 1 },
        { val: 9 }
      ],
      pointers: [
        { index: 2, label: 'i = 2' }
      ]
    },
    auxiliaryTrack: {
      label: 'Prefix Sums',
      items: [10, 15, 17, '?', '?', '?']
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Running Sum', value: 17 },
      { label: 'rem (17 - 15)', value: 2 },
      { label: 'maxLen', value: 2 }
    ],
    formula: 'sum = 17; rem = 17 - 15 = 2 (absent); map[17] = 2;',
    action: 'Add 2 to sum (17). rem = 2 is not in map. Store map[17] = 2. maxLen remains 2.',
    explain: 'Sum 17 is neither K nor does remainder 2 exist in prefixMap. Record prefix 17 at index 2.',
    intuition: 'Accumulation continues.',
    variables: { i: 2, 'nums[2]': 2, sum: 17, rem: 2, maxLen: 2, 'map[17]': 2 }
  },
  {
    title: '5. Index 3: nums[3] = 7 -> Sum = 24, rem = 9 (Not in map)',
    phase: 'ACCUMULATE',
    track: {
      label: 'Array nums',
      items: [
        { val: 10 },
        { val: 5 },
        { val: 2 },
        { val: 7, status: 'active', badge: 'sum = 24' },
        { val: 1 },
        { val: 9 }
      ],
      pointers: [
        { index: 3, label: 'i = 3' }
      ]
    },
    auxiliaryTrack: {
      label: 'Prefix Sums',
      items: [10, 15, 17, 24, '?', '?']
    },
    activeI: 3,
    activeJ: null,
    metrics: [
      { label: 'Running Sum', value: 24 },
      { label: 'rem (24 - 15)', value: 9 },
      { label: 'maxLen', value: 2 }
    ],
    formula: 'sum = 24; rem = 24 - 15 = 9 (absent); map[24] = 3;',
    action: 'Add 7 to sum (24). rem = 9 is not in map. Store map[24] = 3.',
    explain: 'No matching remainder. Record map[24] = 3.',
    intuition: 'Building prefix history.',
    variables: { i: 3, 'nums[3]': 7, sum: 24, rem: 9, maxLen: 2, 'map[24]': 3 }
  },
  {
    title: '6. Index 4: nums[4] = 1 -> Sum = 25, rem = 10 FOUND at Index 0! Subarray [1..4] (len: 4)',
    phase: 'MAX_SUBARRAY_FOUND',
    track: {
      label: 'Optimal Subarray Identified [1..4]',
      items: [
        { val: 10, status: 'discarded', badge: 'rem = 10' },
        { val: 5, status: 'match', badge: 'Subarray' },
        { val: 2, status: 'match', badge: 'Subarray' },
        { val: 7, status: 'match', badge: 'Subarray' },
        { val: 1, status: 'match', badge: 'Subarray' },
        { val: 9 }
      ],
      pointers: [
        { index: 0, label: 'Prefix rem (idx 0)' },
        { index: 4, label: 'i = 4 (sum = 25)' }
      ]
    },
    auxiliaryTrack: {
      label: 'Prefix Sums',
      items: [10, 15, 17, 24, 25, '?']
    },
    windowStart: 1,
    windowEnd: 4,
    activeI: 4,
    activeJ: 0,
    metrics: [
      { label: 'Running Sum', value: 25 },
      { label: 'rem = 25 - 15', value: '10 (Found!)', highlight: true },
      { label: 'New maxLen', value: 4, highlight: true }
    ],
    formula: 'rem = 25 - 15 = 10; map[10] = 0 ==> len = 4 - 0 = 4; maxLen = max(2, 4) = 4;',
    action: 'rem = 10 is found at index 0! Subarray [1..4] ([5, 2, 7, 1]) sums to 15! Length = 4.',
    explain: 'Because prefixSum up to index 0 is 10, and prefixSum up to index 4 is 25: sum(nums[1..4]) = 25 - 10 = 15! Length = 4 - 0 = 4 > 2. Update maxLen = 4.',
    intuition: 'Major breakthrough: Longer matching slice [5, 2, 7, 1] found!',
    variables: { i: 4, 'nums[4]': 1, sum: 25, rem: 10, remIdx: 0, len: 4, maxLen: 4 }
  },
  {
    title: '7. Index 5: nums[5] = 9 -> Sum = 34, rem = 19 (Not in map)',
    phase: 'ACCUMULATE',
    track: {
      label: 'Array nums',
      items: [
        { val: 10 },
        { val: 5, status: 'match' },
        { val: 2, status: 'match' },
        { val: 7, status: 'match' },
        { val: 1, status: 'match' },
        { val: 9, status: 'active', badge: 'sum = 34' }
      ],
      pointers: [
        { index: 5, label: 'i = 5' }
      ]
    },
    auxiliaryTrack: {
      label: 'Prefix Sums',
      items: [10, 15, 17, 24, 25, 34]
    },
    windowStart: 1,
    windowEnd: 4,
    activeI: 5,
    activeJ: null,
    metrics: [
      { label: 'Running Sum', value: 34 },
      { label: 'rem (34 - 15)', value: 19 },
      { label: 'maxLen Preserved', value: 4 }
    ],
    formula: 'sum = 34; rem = 34 - 15 = 19 (absent); map[34] = 5;',
    action: 'Add 9 to sum (34). rem = 19 not found in map. Store map[34] = 5.',
    explain: 'Final element processed. No new longer subarray found. maxLen stays at 4.',
    intuition: 'End of array reached.',
    variables: { i: 5, 'nums[5]': 9, sum: 34, rem: 19, maxLen: 4, 'map[34]': 5 }
  },
  {
    title: '8. Strategy Analysis: Handling Zeros & Negatives',
    phase: 'ANALYSIS',
    track: {
      label: 'Invariant Rule: Only Store First Occurrence',
      items: [
        { val: 'Prefix Map Cache Rule', status: 'match', badge: 'Invariant' },
        { val: 'Earliest Index Maximizes (i - j)', status: 'match' },
        { val: 'Handles Positives, Negatives, Zeros', status: 'match' }
      ],
      pointers: [
        { index: 0, label: 'Rule Verified' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Collision Rule', value: 'Do not overwrite' },
      { label: 'Handles Negatives', value: 'Yes (General)' },
      { label: 'Handles Zeros', value: 'Yes (Maximized)' }
    ],
    formula: 'if (!map.containsKey(sum)) map.put(sum, i);',
    action: 'Verify why we never overwrite existing keys in prefixMap.',
    explain: 'If the same prefix sum occurs again (e.g. after adding 0 or positive and negative numbers canceling out), keeping the earliest occurrence guarantees the greatest possible value of (i - j).',
    intuition: 'Storing only the earliest index is the cornerstone of the greedy longest length guarantee.',
    variables: { overwriteRule: 'Never overwrite', maximizesDistance: true }
  },
  {
    title: '9. Complete: Longest Subarray Length = 4 ([5, 2, 7, 1])',
    phase: 'COMPLETED',
    track: {
      label: 'Optimal Subarray nums[1..4]',
      items: [
        { val: 10 },
        { val: 5, status: 'match', badge: 'Start' },
        { val: 2, status: 'match' },
        { val: 7, status: 'match' },
        { val: 1, status: 'match', badge: 'End' },
        { val: 9 }
      ],
      pointers: [
        { index: 1, label: 'Subarray Start (idx 1)' },
        { index: 4, label: 'Subarray End (idx 4)' }
      ]
    },
    windowStart: 1,
    windowEnd: 4,
    activeI: 1,
    activeJ: 4,
    metrics: [
      { label: 'Longest Length', value: 4, highlight: true },
      { label: 'Subarray', value: '[5, 2, 7, 1]' },
      { label: 'Sum', value: '5+2+7+1 = 15' },
      { label: 'Time Complexity', value: 'O(N)' }
    ],
    formula: 'return maxLen; // 4',
    action: 'Algorithm concludes: Returns maxLen = 4.',
    explain: 'Prefix sum hash map successfully identified the longest subarray with sum K in O(N) time and O(N) space.',
    intuition: 'Optimal for general arrays with negative numbers, zeros, and positives.',
    variables: { result: 4, longestSubarray: [5, 2, 7, 1], time: 'O(N)', space: 'O(N)' }
  }
];

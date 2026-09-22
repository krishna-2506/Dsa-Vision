// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Largest Subarray with Sum 0',
  category: 'Arrays & Prefix Sum',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Finds the length of the longest contiguous subarray whose elements sum to zero using a prefix-sum hash map to detect recurring cumulative totals.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Zero-Sum Subarray Strategy',
  nodes: [
    { id: 'root', label: 'Prefix Sum Repetition Principle', children: ['cumulative-identity', 'hash-map-cache', 'direct-zero-case', 'earliest-index-rule', 'complexity'] },
    { id: 'cumulative-identity', label: '1. Prefix Repetition Identity', detail: 'If sum(nums[0..i]) == sum(nums[0..j]), the intermediate slice nums[j+1..i] must sum to zero.' },
    { id: 'hash-map-cache', label: '2. Earliest Index Mapping', detail: 'Store each prefix sum in a hash map mpp[sum] = firstIndex. Recurring sums yield subarray length (i - firstIndex).' },
    { id: 'direct-zero-case', label: '3. Direct Prefix Zero (sum == 0)', detail: 'When prefix sum itself reaches 0, the entire slice from index 0 to i has sum 0 (length = i + 1).' },
    { id: 'earliest-index-rule', label: '4. Non-Overwrite Invariant', detail: 'Never overwrite an existing sum entry in the map; keeping the earliest index maximizes (i - firstIndex).' },
    { id: 'complexity', label: '5. Linear Time Performance', detail: 'Single pass O(N) time with O(N) hash map lookups, far outperforming O(N^2) brute force.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Prefix Sum with Hash Map
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxLen(vector<int>& arr, int n) {
        unordered_map<int, int> mpp; // prefixSum -> earliestIndex
        int maxi = 0;
        int sum = 0;

        for (int i = 0; i < n; i++) {
            sum += arr[i];

            // Case 1: Subarray starting from index 0
            if (sum == 0) {
                maxi = i + 1;
            }
            // Case 2: Subarray between earlier occurrence and i
            else if (mpp.find(sum) != mpp.end()) {
                maxi = max(maxi, i - mpp[sum]);
            }
            // Case 3: Record earliest occurrence
            else {
                mpp[sum] = i;
            }
        }

        return maxi;
    }
};`,
  python: `# Python 3 Optimal Prefix Sum with Hash Map
# Time Complexity: O(N) | Space Complexity: O(N)
class Solution:
    def maxLen(self, n: int, arr: list[int]) -> int:
        mpp = {} # prefix_sum -> first_index
        maxi = 0
        curr_sum = 0

        for i in range(n):
            curr_sum += arr[i]

            if curr_sum == 0:
                maxi = i + 1
            elif curr_sum in mpp:
                maxi = max(maxi, i - mpp[curr_sum])
            else:
                mpp[curr_sum] = i

        return maxi`,
  java: `// Java Optimal Prefix Sum with Hash Map
// Time Complexity: O(N) | Space Complexity: O(N)
import java.util.HashMap;

class Solution {
    int maxLen(int arr[], int n) {
        HashMap<Integer, Integer> mpp = new HashMap<>();
        int maxi = 0;
        int sum = 0;

        for (int i = 0; i < n; i++) {
            sum += arr[i];

            if (sum == 0) {
                maxi = i + 1;
            } else if (mpp.containsKey(sum)) {
                maxi = Math.max(maxi, i - mpp.get(sum));
            } else {
                mpp.put(sum, i);
            }
        }

        return maxi;
    }
}`,
  javascript: `// JavaScript Optimal Prefix Sum with Hash Map
// Time Complexity: O(N) | Space Complexity: O(N)
function maxLen(arr, n) {
    const map = new Map();
    let maxi = 0;
    let sum = 0;

    for (let i = 0; i < n; i++) {
        sum += arr[i];

        if (sum === 0) {
            maxi = i + 1;
        } else if (map.has(sum)) {
            maxi = Math.max(maxi, i - map.get(sum));
        } else {
            map.set(sum, i);
        }
    }

    return maxi;
}`
};

export const steps = [
  {
    title: '1. Setup: Array arr = [15, -2, 2, -8, 1, 7, 10, 23]',
    phase: 'SETUP',
    track: {
      label: 'Input Array arr (Size = 8)',
      items: [
        { val: 15 },
        { val: -2 },
        { val: 2 },
        { val: -8 },
        { val: 1 },
        { val: 7 },
        { val: 10 },
        { val: 23 }
      ],
      pointers: [
        { index: 0, label: 'i = 0' }
      ]
    },
    auxiliaryTrack: {
      label: 'Prefix Sum Tracker',
      items: ['sum = 0', '?', '?', '?', '?', '?', '?', '?']
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Target Sum', value: 0 },
      { label: 'Running Sum', value: 0 },
      { label: 'maxi (Max Len)', value: 0 }
    ],
    formula: 'mpp = {}; sum = 0; maxi = 0;',
    action: 'Initialize prefix sum hash map. Target sum is 0.',
    explain: 'We want the maximum length contiguous subarray summing to zero. We maintain a running sum and record the first index at which each cumulative sum appears.',
    intuition: 'If sum at index j is S, and sum at index i is also S, then everything added in between must add up to zero: sum(arr[j+1 .. i]) = 0.',
    variables: { sum: 0, maxi: 0, mpp: '{}' }
  },
  {
    title: '2. Mathematical Principle: The Zero-Difference Identity',
    phase: 'ANALYSIS',
    track: {
      label: 'Subarray Sum Formula',
      items: [
        { val: 'Prefix[i] = S', status: 'match' },
        { val: 'Prefix[j] = S', status: 'match' },
        { val: 'Difference: Prefix[i] - Prefix[j] = 0', status: 'match', badge: 'Invariant' },
        { val: 'Subarray length = i - j', badge: 'Maximized' }
      ],
      pointers: [
        { index: 0, label: 'Anchor j' },
        { index: 1, label: 'Target i' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Condition', value: 'sum[i] == sum[j]' },
      { label: 'Zero Slice', value: 'arr[j+1 .. i]' },
      { label: 'Strategy', value: 'Cache earliest j' }
    ],
    formula: 'sum(j+1 .. i) = Prefix[i] - Prefix[j] = S - S = 0',
    action: 'Understand the mathematical proof connecting prefix repetition to zero sums.',
    explain: 'Whenever the running sum returns to an already seen value, the intervening slice has net-zero contribution. Keeping the earliest index of S guarantees the widest possible window.',
    intuition: 'A repeat in cumulative sums is the exact signature of a zero-sum subarray.',
    variables: { mathematicalProof: 'S - S = 0', lengthFormula: 'i - mpp[sum]' }
  },
  {
    title: '3. Indices 0 & 1: arr[0]=15 (sum=15), arr[1]=-2 (sum=13)',
    phase: 'ACCUMULATE',
    track: {
      label: 'Input Array arr',
      items: [
        { val: 15, status: 'active', badge: 'sum: 15' },
        { val: -2, status: 'active', badge: 'sum: 13' },
        { val: 2 },
        { val: -8 },
        { val: 1 },
        { val: 7 },
        { val: 10 },
        { val: 23 }
      ],
      pointers: [
        { index: 1, label: 'i = 1' }
      ]
    },
    auxiliaryTrack: {
      label: 'Prefix Sum Tracker',
      items: [15, 13, '?', '?', '?', '?', '?', '?']
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'Running Sum', value: 13 },
      { label: 'mpp[15]', value: 'idx 0' },
      { label: 'mpp[13]', value: 'idx 1' }
    ],
    formula: 'mpp[15] = 0; mpp[13] = 1;',
    action: 'i = 0: sum = 15. Store mpp[15] = 0. i = 1: sum = 15 - 2 = 13. Store mpp[13] = 1.',
    explain: 'Both sums are new. Cache them in the map with their respective indices.',
    intuition: 'Building prefix history.',
    variables: { i: 1, sum: 13, maxi: 0, mpp: '{15: 0, 13: 1}' }
  },
  {
    title: '4. Index 2: arr[2] = 2 -> Sum = 15 (Seen at idx 0!) -> Subarray [-2, 2] (len: 2)',
    phase: 'SUBARRAY_FOUND',
    track: {
      label: 'First Zero-Sum Subarray Detected',
      items: [
        { val: 15, status: 'discarded', badge: 'sum=15' },
        { val: -2, status: 'match', badge: 'Zero Sum' },
        { val: 2, status: 'match', badge: 'Zero Sum' },
        { val: -8 },
        { val: 1 },
        { val: 7 },
        { val: 10 },
        { val: 23 }
      ],
      pointers: [
        { index: 0, label: 'firstSeen = 0' },
        { index: 2, label: 'i = 2 (sum = 15)' }
      ]
    },
    auxiliaryTrack: {
      label: 'Prefix Sum Tracker',
      items: [15, 13, 15, '?', '?', '?', '?', '?']
    },
    windowStart: 1,
    windowEnd: 2,
    activeI: 2,
    activeJ: 0,
    metrics: [
      { label: 'Sum = 15', value: 'Already in map!', highlight: true },
      { label: 'Subarray Len', value: '2 - 0 = 2', highlight: true },
      { label: 'New maxi', value: 2 }
    ],
    formula: 'mpp.find(15) found at 0 ==> len = 2 - 0 = 2; maxi = max(0, 2) = 2;',
    action: 'Sum 15 was previously recorded at index 0. Subarray arr[1..2] ([-2, 2]) sums to 0! maxi becomes 2.',
    explain: 'Because sum was 15 at index 0 and is 15 again at index 2, the elements added between index 1 and 2 (namely -2 + 2) equal zero.',
    intuition: 'First candidate zero-sum segment confirmed.',
    variables: { i: 2, 'arr[2]': 2, sum: 15, prevIdx: 0, len: 2, maxi: 2 }
  },
  {
    title: '5. Indices 3 & 4: arr[3]=-8 (sum=7), arr[4]=1 (sum=8)',
    phase: 'ACCUMULATE',
    track: {
      label: 'Input Array arr',
      items: [
        { val: 15 },
        { val: -2 },
        { val: 2 },
        { val: -8, status: 'active', badge: 'sum: 7' },
        { val: 1, status: 'active', badge: 'sum: 8' },
        { val: 7 },
        { val: 10 },
        { val: 23 }
      ],
      pointers: [
        { index: 4, label: 'i = 4' }
      ]
    },
    auxiliaryTrack: {
      label: 'Prefix Sum Tracker',
      items: [15, 13, 15, 7, 8, '?', '?', '?']
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'Running Sum', value: 8 },
      { label: 'mpp[7]', value: 'idx 3' },
      { label: 'mpp[8]', value: 'idx 4' },
      { label: 'maxi Preserved', value: 2 }
    ],
    formula: 'mpp[7] = 3; mpp[8] = 4;',
    action: 'i = 3: sum = 7. Store mpp[7] = 3. i = 4: sum = 8. Store mpp[8] = 4.',
    explain: 'Neither 7 nor 8 were in the map. Record them with their first index.',
    intuition: 'Continuing linear scan.',
    variables: { i: 4, sum: 8, maxi: 2, mpp: '{15: 0, 13: 1, 7: 3, 8: 4}' }
  },
  {
    title: '6. Index 5: arr[5] = 7 -> Sum = 15 (Seen at idx 0!) -> Subarray [-2, 2, -8, 1, 7] (len: 5)!',
    phase: 'SUBARRAY_FOUND',
    track: {
      label: 'Longest Zero-Sum Subarray Identified [1..5]',
      items: [
        { val: 15, status: 'discarded', badge: 'Anchor' },
        { val: -2, status: 'match', badge: 'Zero Sum' },
        { val: 2, status: 'match', badge: 'Zero Sum' },
        { val: -8, status: 'match', badge: 'Zero Sum' },
        { val: 1, status: 'match', badge: 'Zero Sum' },
        { val: 7, status: 'match', badge: 'Zero Sum' },
        { val: 10 },
        { val: 23 }
      ],
      pointers: [
        { index: 0, label: 'firstSeen = 0' },
        { index: 5, label: 'i = 5 (sum = 15)' }
      ]
    },
    auxiliaryTrack: {
      label: 'Prefix Sum Tracker',
      items: [15, 13, 15, 7, 8, 15, '?', '?']
    },
    windowStart: 1,
    windowEnd: 5,
    activeI: 5,
    activeJ: 0,
    metrics: [
      { label: 'Repeated Sum', value: 15, highlight: true },
      { label: 'Subarray Slice', value: 'arr[1..5]' },
      { label: 'New Max Length', value: '5 - 0 = 5', highlight: true }
    ],
    formula: 'len = 5 - mpp[15] = 5 - 0 = 5; maxi = max(2, 5) = 5;',
    action: 'Sum 15 repeats again! Distance from earliest occurrence at index 0 is 5 - 0 = 5. Update maxi = 5!',
    explain: 'Sum of slice [-2, 2, -8, 1, 7] is (-2 + 2 - 8 + 1 + 7) = 0! Length 5 surpasses our earlier record of 2. Crucially, we do NOT overwrite mpp[15].',
    intuition: 'Major breakthrough: The longest zero-sum slice is uncovered.',
    variables: { i: 5, 'arr[5]': 7, sum: 15, firstSeen: 0, len: 5, maxi: 5 }
  },
  {
    title: '7. Indices 6 & 7: arr[6]=10 (sum=25), arr[7]=23 (sum=48) -> Scan Finishes',
    phase: 'ACCUMULATE',
    track: {
      label: 'Input Array arr',
      items: [
        { val: 15 },
        { val: -2, status: 'match' },
        { val: 2, status: 'match' },
        { val: -8, status: 'match' },
        { val: 1, status: 'match' },
        { val: 7, status: 'match' },
        { val: 10, status: 'active', badge: 'sum: 25' },
        { val: 23, status: 'active', badge: 'sum: 48' }
      ],
      pointers: [
        { index: 7, label: 'i = 7 (End)' }
      ]
    },
    auxiliaryTrack: {
      label: 'Prefix Sum Tracker',
      items: [15, 13, 15, 7, 8, 15, 25, 48]
    },
    windowStart: 1,
    windowEnd: 5,
    activeI: 7,
    activeJ: null,
    metrics: [
      { label: 'Final Sum', value: 48 },
      { label: 'All Elements Scanned', value: '8 / 8' },
      { label: 'Confirmed maxi', value: 5, highlight: true }
    ],
    formula: 'Loop reaches N = 8; finishes',
    action: 'Add 10 and 23. Neither sum matches any previous prefix. Traversal concludes.',
    explain: 'Array exhausted. The maximum zero-sum subarray remains the 5-element sequence arr[1..5].',
    intuition: 'End of array reached.',
    variables: { i: 7, sum: 48, maxi: 5 }
  },
  {
    title: '8. Complete: Return Longest Length = 5 (Subarray [-2, 2, -8, 1, 7])',
    phase: 'COMPLETED',
    track: {
      label: 'Optimal Zero-Sum Subarray arr[1..5]',
      items: [
        { val: 15 },
        { val: -2, status: 'match', badge: 'Start' },
        { val: 2, status: 'match' },
        { val: -8, status: 'match' },
        { val: 1, status: 'match' },
        { val: 7, status: 'match', badge: 'End' },
        { val: 10 },
        { val: 23 }
      ],
      pointers: [
        { index: 1, label: 'Start (idx 1)' },
        { index: 5, label: 'End (idx 5)' }
      ]
    },
    windowStart: 1,
    windowEnd: 5,
    activeI: 1,
    activeJ: 5,
    metrics: [
      { label: 'Max Length', value: 5, highlight: true },
      { label: 'Subarray', value: '[-2, 2, -8, 1, 7]' },
      { label: 'Sum', value: '0' },
      { label: 'Time Complexity', value: 'O(N)' }
    ],
    formula: 'return maxi; // 5',
    action: 'Algorithm concludes: Returns 5 as the maximum length of any zero-sum subarray.',
    explain: 'Prefix sum hash map identified the maximal zero-sum contiguous slice in O(N) single-pass time and O(N) auxiliary space.',
    intuition: 'Optimal prefix hashing turns quadratic subarray evaluations into linear lookups.',
    variables: { result: 5, subarray: '[-2, 2, -8, 1, 7]', time: 'O(N)', space: 'O(N)' }
  }
];

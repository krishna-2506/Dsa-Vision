// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'Longest Increasing Subsequence | DP-43 (Binary Search)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(N)',
  description: 'Calculates the length of the Longest Increasing Subsequence using Patience Sorting with Binary Search (std::lower_bound) in O(N log N) time, drastically outperforming the O(N²) DP approach.'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'LIS via Binary Search (DP-43)',
  nodes: [
    { id: 'root', label: 'LIS in O(N log N)', children: ['patience', 'binary-search', 'invariant'] },
    { id: 'patience', label: '1. Patience Sorting Concept', detail: 'tails[k] stores the smallest ending element of any increasing subsequence of length k+1' },
    { id: 'binary-search', label: '2. Binary Search (lower_bound)', children: ['append', 'replace'] },
    { id: 'append', label: 'Append Condition', detail: 'If x > all tails, append x (LIS length expands by 1)' },
    { id: 'replace', label: 'Replace Condition', detail: 'Find first tails[i] >= x and overwrite it with x (greedily tightens the tail)' },
    { id: 'invariant', label: '3. Invariant & Result', detail: 'tails array remains strictly increasing at all times; final length equals max LIS' }
  ]
};

export const solutions = {
  cpp: `// C++ LIS using Binary Search (O(N log N))
// Time: O(N log N) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestIncreasingSubsequence(vector<int>& nums) {
        vector<int> tails;
        for (int x : nums) {
            auto it = lower_bound(tails.begin(), tails.end(), x);
            if (it == tails.end()) {
                tails.push_back(x);
            } else {
                *it = x;
            }
        }
        return tails.size();
    }
};`,
  python: `# Python 3 LIS using Binary Search (bisect_left)
# Time: O(N log N) | Space: O(N)
from bisect import bisect_left

class Solution:
    def longestIncreasingSubsequence(self, nums: list[int]) -> int:
        tails = []
        for x in nums:
            idx = bisect_left(tails, x)
            if idx == len(tails):
                tails.append(x)
            else:
                tails[idx] = x
        return len(tails)`,
  java: `// Java LIS using Binary Search (Arrays.binarySearch)
// Time: O(N log N) | Space: O(N)
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {
    public int longestIncreasingSubsequence(int[] nums) {
        List<Integer> tails = new ArrayList<>();
        for (int x : nums) {
            int idx = Collections.binarySearch(tails, x);
            if (idx < 0) idx = -(idx + 1);
            if (idx == tails.size()) {
                tails.add(x);
            } else {
                tails.set(idx, x);
            }
        }
        return tails.size();
    }
}`,
  javascript: `// JavaScript LIS using Binary Search
// Time: O(N log N) | Space: O(N)
var lengthOfLIS = function(nums) {
    const tails = [];
    for (const x of nums) {
        let left = 0, right = tails.length;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < x) left = mid + 1;
            else right = mid;
        }
        if (left === tails.length) tails.push(x);
        else tails[left] = x;
    }
    return tails.length;
};`
};

export const steps = [
  {
    phase: 'SETUP',
    tracks: [
      { label: 'nums', items: [10, 9, 2, 5, 3, 7, 101, 18] },
      { label: 'tails', items: ['—'] }
    ],
    activeI: null,
    activePrev: null,
    formula: 'tails[k] = smallest tail of all increasing subsequences of length (k + 1)',
    action: 'Initialize empty tails array for patience sorting.',
    explain: 'Instead of comparing against all previous elements in O(N²), patience sorting maintains a sorted array tails where tails[k] is the minimum end-value of an LIS of length k+1. Because tails is always strictly sorted, we locate insertion points using binary search in O(log N).',
    intuition: 'Greedily keeping tails as small as possible maximizes future opportunities to extend the subsequence.',
    metrics: [
      { label: 'LIS Length', value: 0, highlight: true },
      { label: 'Tails Count', value: 0 },
      { label: 'Complexity', value: 'O(N log N)' }
    ],
    customCard: {
      title: 'Patience Sorting Principle',
      rows: [
        { label: 'Greedy Choice', value: 'Smaller tail values make it easier for upcoming numbers to exceed them' },
        { label: 'Binary Search', value: 'Use lower_bound(tails, x) to find first element >= x' }
      ]
    }
  },
  {
    phase: 'EXTEND',
    tracks: [
      { label: 'nums', items: [10, 9, 2, 5, 3, 7, 101, 18] },
      { label: 'tails', items: [10] }
    ],
    activeI: 0,
    activePrev: 0,
    formula: 'x = 10: tails is empty => append 10 => tails = [10]',
    action: 'Process x=10: First number forms the initial tail of length 1.',
    explain: 'tails is currently empty. 10 becomes the tail of the first subsequence of length 1.',
    intuition: 'Every sequence of length 1 begins with the elements themselves.',
    metrics: [
      { label: 'Current x', value: 10 },
      { label: 'LIS Length', value: 1, highlight: true },
      { label: 'Action', value: 'Append' }
    ]
  },
  {
    phase: 'REPLACE',
    tracks: [
      { label: 'nums', items: [10, 9, 2, 5, 3, 7, 101, 18] },
      { label: 'tails', items: [9] }
    ],
    activeI: 1,
    activePrev: 0,
    formula: 'x = 9: lower_bound finds tails[0]=10 >= 9 => replace 10 with 9',
    action: 'Process x=9: 9 <= 10, replaces 10 at tails[0].',
    explain: 'Binary search finds tails[0]=10 >= 9. We replace 10 with 9. An increasing subsequence of length 1 ending at 9 is strictly better than ending at 10, because any number > 10 is also > 9.',
    intuition: 'Tightening tails[0] from 10 to 9 increases potential future extensions.',
    metrics: [
      { label: 'Current x', value: 9 },
      { label: 'LIS Length', value: 1 },
      { label: 'Action', value: 'Replace at idx 0' }
    ],
    customCard: {
      title: 'Binary Search Check: x = 9',
      rows: [
        { label: 'Target', value: 'First element >= 9 in [10] -> index 0 (10)', accent: true },
        { label: 'Replacement', value: 'tails[0] becomes 9 (better tail)' }
      ]
    }
  },
  {
    phase: 'REPLACE',
    tracks: [
      { label: 'nums', items: [10, 9, 2, 5, 3, 7, 101, 18] },
      { label: 'tails', items: [2] }
    ],
    activeI: 2,
    activePrev: 0,
    formula: 'x = 2: lower_bound finds tails[0]=9 >= 2 => replace 9 with 2',
    action: 'Process x=2: 2 <= 9, replaces 9 at tails[0].',
    explain: '2 replaces 9 at tails[0]. Length 1 now has optimal tail 2.',
    intuition: 'A minimum tail of 2 gives maximum headroom for subsequent elements.',
    metrics: [
      { label: 'Current x', value: 2 },
      { label: 'LIS Length', value: 1 },
      { label: 'Action', value: 'Replace at idx 0' }
    ]
  },
  {
    phase: 'EXTEND',
    tracks: [
      { label: 'nums', items: [10, 9, 2, 5, 3, 7, 101, 18] },
      { label: 'tails', items: [2, 5] }
    ],
    activeI: 3,
    activePrev: 1,
    formula: 'x = 5: 5 > tails[0]=2 => append 5 => tails = [2, 5]',
    action: 'Process x=5: 5 is greater than all existing tails, append to form length 2.',
    explain: '5 > 2. Binary search finds no element >= 5, so 5 is appended. We now have an increasing subsequence of length 2: [2, 5].',
    intuition: 'When a number exceeds all current tails, the maximum LIS length increments by 1.',
    metrics: [
      { label: 'Current x', value: 5 },
      { label: 'LIS Length', value: 2, highlight: true },
      { label: 'Action', value: 'Append (New LIS Length)' }
    ],
    customCard: {
      title: 'Length Extension: x = 5',
      rows: [
        { label: 'Condition', value: '5 > tails[last]=2 => Append', accent: true },
        { label: 'New State', value: 'tails = [2, 5] (len 1 tail=2, len 2 tail=5)' }
      ]
    }
  },
  {
    phase: 'REPLACE',
    tracks: [
      { label: 'nums', items: [10, 9, 2, 5, 3, 7, 101, 18] },
      { label: 'tails', items: [2, 3] }
    ],
    activeI: 4,
    activePrev: 1,
    formula: 'x = 3: lower_bound in [2, 5] finds tails[1]=5 >= 3 => replace 5 with 3',
    action: 'Process x=3: 3 replaces 5 at tails[1].',
    explain: 'Binary search on [2, 5] locates index 1 (val 5). We replace 5 with 3. Subsequence of length 2 can now end at 3 instead of 5 ([2, 3] is better than [2, 5]).',
    intuition: 'Decreasing the tail of length 2 from 5 to 3 makes it easier to extend later.',
    metrics: [
      { label: 'Current x', value: 3 },
      { label: 'LIS Length', value: 2 },
      { label: 'Action', value: 'Replace at idx 1' }
    ]
  },
  {
    phase: 'EXTEND',
    tracks: [
      { label: 'nums', items: [10, 9, 2, 5, 3, 7, 101, 18] },
      { label: 'tails', items: [2, 3, 7] }
    ],
    activeI: 5,
    activePrev: 2,
    formula: 'x = 7: 7 > tails[1]=3 => append 7 => tails = [2, 3, 7]',
    action: 'Process x=7: 7 exceeds all tails, append to reach length 3.',
    explain: '7 > 3. Appending 7 creates a valid LIS of length 3: [2, 3, 7]. LIS length reaches 3.',
    intuition: 'Because we previously tightened tails[1] to 3, 7 easily extends the sequence.',
    metrics: [
      { label: 'Current x', value: 7 },
      { label: 'LIS Length', value: 3, highlight: true },
      { label: 'Action', value: 'Append' }
    ]
  },
  {
    phase: 'EXTEND',
    tracks: [
      { label: 'nums', items: [10, 9, 2, 5, 3, 7, 101, 18] },
      { label: 'tails', items: [2, 3, 7, 101] }
    ],
    activeI: 6,
    activePrev: 3,
    formula: 'x = 101: 101 > tails[2]=7 => append 101 => tails = [2, 3, 7, 101]',
    action: 'Process x=101: 101 exceeds all tails, append to reach length 4.',
    explain: '101 > 7. Appending 101 establishes an LIS of length 4: [2, 3, 7, 101].',
    intuition: 'The maximum LIS length reaches 4.',
    metrics: [
      { label: 'Current x', value: 101 },
      { label: 'LIS Length', value: 4, highlight: true },
      { label: 'Action', value: 'Append' }
    ]
  },
  {
    phase: 'REPLACE',
    tracks: [
      { label: 'nums', items: [10, 9, 2, 5, 3, 7, 101, 18] },
      { label: 'tails', items: [2, 3, 7, 18] }
    ],
    activeI: 7,
    activePrev: 3,
    formula: 'x = 18: lower_bound in [2, 3, 7, 101] finds tails[3]=101 >= 18 => replace with 18',
    action: 'Process x=18: 18 replaces 101 at tails[3].',
    explain: 'Binary search finds tails[3]=101 >= 18. We replace 101 with 18. An LIS of length 4 ending at 18 ([2, 3, 7, 18]) is far better than ending at 101.',
    intuition: 'Even on the last element, tightening the tail ensures the invariant is maintained.',
    metrics: [
      { label: 'Current x', value: 18 },
      { label: 'LIS Length', value: 4, highlight: true },
      { label: 'Action', value: 'Replace at idx 3' }
    ],
    customCard: {
      title: 'Final Step Inspection',
      rows: [
        { label: 'Search Result', value: 'lower_bound(18) = index 3 (value was 101)', accent: true },
        { label: 'Updated Tail', value: 'tails[3] = 18' }
      ]
    }
  },
  {
    phase: 'COMPLETED',
    tracks: [
      { label: 'nums', items: [10, 9, 2, 5, 3, 7, 101, 18] },
      { label: 'tails', items: [2, 3, 7, 18] }
    ],
    activeI: null,
    activePrev: null,
    formula: 'tails.length = 4 => Longest Increasing Subsequence Length = 4',
    action: 'Input stream complete. Return tails.length as the optimal LIS length.',
    explain: 'The final tails array is [2, 3, 7, 18] with length 4. One corresponding LIS is [2, 3, 7, 18] (or [2, 3, 7, 101]). The algorithm completed in O(N log N) time and O(N) auxiliary space.',
    intuition: 'Patience sorting computes the exact maximum length without storing all predecessor branches.',
    metrics: [
      { label: 'Final LIS Length', value: 4, highlight: true },
      { label: 'Final Tails', value: '[2, 3, 7, 18]' },
      { label: 'Time Complexity', value: 'O(N log N)' }
    ],
    customCard: {
      title: 'Algorithm Summary',
      rows: [
        { label: 'Total Elements', value: '8 elements processed' },
        { label: 'Comparisons', value: 'O(N log N) total binary searches' }
      ]
    }
  }
];

// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'Longest Bitonic Subsequence',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N²)',
  spaceComplexity: 'O(N)',
  description: 'Calculates the length of the longest bitonic subsequence (a sequence that strictly increases then strictly decreases). Combines left-to-right LIS and right-to-left LIS (LDS) around an optimal peak element: Max Bitonic = max(dp1[i] + dp2[i] - 1).'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'Longest Bitonic Subsequence',
  nodes: [
    { id: 'root', label: 'Longest Bitonic Subsequence', children: ['def', 'approach', 'result'] },
    { id: 'def', label: 'Definition', detail: 'A subsequence that first strictly increases then strictly decreases' },
    { id: 'approach', label: 'Two-Pass DP', children: ['lis', 'lds', 'combine'] },
    { id: 'lis', label: 'dp1[] (LIS ↑)', detail: 'Left-to-right scan — longest increasing subsequence ending at each index' },
    { id: 'lds', label: 'dp2[] (LDS ↓)', detail: 'Right-to-left scan — longest decreasing subsequence starting at each index' },
    { id: 'combine', label: 'Merge at Peak', detail: 'For each index i: bitonic length = dp1[i] + dp2[i] - 1' },
    { id: 'result', label: 'Result', detail: 'Maximum over all candidate peaks' }
  ]
};

export const solutions = {
  cpp: `// C++ Longest Bitonic Subsequence
// Time: O(N^2) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int LongestBitonicSequence(int n, vector<int>& nums) {
        vector<int> dp1(n, 1); // LIS from left
        vector<int> dp2(n, 1); // LIS from right (LDS)

        // Compute LIS from left to right
        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (nums[prev] < nums[i]) {
                    dp1[i] = max(dp1[i], 1 + dp1[prev]);
                }
            }
        }

        // Compute LIS from right to left
        for (int i = n - 1; i >= 0; i--) {
            for (int prev = n - 1; prev > i; prev--) {
                if (nums[prev] < nums[i]) {
                    dp2[i] = max(dp2[i], 1 + dp2[prev]);
                }
            }
        }

        int maxBitonic = 0;
        for (int i = 0; i < n; i++) {
            maxBitonic = max(maxBitonic, dp1[i] + dp2[i] - 1);
        }

        return maxBitonic;
    }
};`,
  python: `# Python 3 Longest Bitonic Subsequence
# Time: O(N^2) | Space: O(N)
class Solution:
    def LongestBitonicSequence(self, n: int, nums: list[int]) -> int:
        dp1 = [1] * n
        dp2 = [1] * n

        # Left to right LIS
        for i in range(n):
            for prev in range(i):
                if nums[prev] < nums[i]:
                    dp1[i] = max(dp1[i], 1 + dp1[prev])

        # Right to left LIS (LDS)
        for i in range(n - 1, -1, -1):
            for prev in range(n - 1, i, -1):
                if nums[prev] < nums[i]:
                    dp2[i] = max(dp2[i], 1 + dp2[prev])

        max_bitonic = 0
        for i in range(n):
            max_bitonic = max(max_bitonic, dp1[i] + dp2[i] - 1)

        return max_bitonic`,
  java: `// Java Longest Bitonic Subsequence
// Time: O(N^2) | Space: O(N)
import java.util.Arrays;

class Solution {
    public int LongestBitonicSequence(int n, int[] nums) {
        int[] dp1 = new int[n];
        int[] dp2 = new int[n];
        Arrays.fill(dp1, 1);
        Arrays.fill(dp2, 1);

        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (nums[prev] < nums[i]) {
                    dp1[i] = Math.max(dp1[i], 1 + dp1[prev]);
                }
            }
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int prev = n - 1; prev > i; prev--) {
                if (nums[prev] < nums[i]) {
                    dp2[i] = Math.max(dp2[i], 1 + dp2[prev]);
                }
            }
        }

        int maxBitonic = 0;
        for (int i = 0; i < n; i++) {
            maxBitonic = Math.max(maxBitonic, dp1[i] + dp2[i] - 1);
        }

        return maxBitonic;
    }
}`,
  javascript: `// JavaScript Longest Bitonic Subsequence
// Time: O(N^2) | Space: O(N)
var LongestBitonicSequence = function(n, nums) {
    const dp1 = new Array(n).fill(1);
    const dp2 = new Array(n).fill(1);

    for (let i = 0; i < n; i++) {
        for (let prev = 0; prev < i; prev++) {
            if (nums[prev] < nums[i]) {
                dp1[i] = Math.max(dp1[i], 1 + dp1[prev]);
            }
        }
    }

    for (let i = n - 1; i >= 0; i--) {
        for (let prev = n - 1; prev > i; prev--) {
            if (nums[prev] < nums[i]) {
                dp2[i] = Math.max(dp2[i], 1 + dp2[prev]);
            }
        }
    }

    let maxBitonic = 0;
    for (let i = 0; i < n; i++) {
        maxBitonic = Math.max(maxBitonic, dp1[i] + dp2[i] - 1);
    }

    return maxBitonic;
};`
};

// ─── 10 Micro-Steps: Data-Only (no React, no JSX) ────────────────────────
// Input: nums = [1, 11, 2, 10, 4, 5, 2, 1]
export const steps = [
  {
    phase: 'SETUP',
    tracks: [
      { label: 'nums',   items: [1, 11, 2, 10, 4, 5, 2, 1] },
      { label: 'dp1 ↑',  items: [1, 1, 1, 1, 1, 1, 1, 1] },
      { label: 'dp2 ↓',  items: [1, 1, 1, 1, 1, 1, 1, 1] },
    ],
    activeI: null,
    metrics: [{ label: 'Max Bitonic', value: '—' }],
    formula: 'Bitonic(peak) = dp1[peak] + dp2[peak] − 1',
    action: 'Initialize dp1 and dp2 arrays to all 1s.',
    explain: 'dp1[i] = length of the Longest Increasing Subsequence ending at index i. dp2[i] = length of the Longest Decreasing Subsequence starting at index i. Every element alone is a valid subsequence of length 1.',
    intuition: 'Think of a mountain range — every element is a potential peak. We separately compute how high the uphill and downhill slopes are.'
  },
  {
    phase: 'LIS_PASS',
    tracks: [
      { label: 'nums',   items: [1, 11, 2, 10, 4, 5, 2, 1] },
      { label: 'dp1 ↑',  items: [1, 2, 1, 1, 1, 1, 1, 1] },
      { label: 'dp2 ↓',  items: [1, 1, 1, 1, 1, 1, 1, 1] },
    ],
    activeI: 1,
    metrics: [{ label: 'Processing', value: 'dp1[1]' }],
    formula: 'dp1[1] = max(1, 1 + dp1[0]) = 2  ← nums[0]=1 < nums[1]=11',
    action: 'Scanning left-to-right: at i=1 (val 11), check all prev < i.',
    explain: 'nums[0]=1 < nums[1]=11, so we can extend the increasing subsequence [1] → [1, 11]. dp1[1] becomes max(1, 1+1) = 2.',
    intuition: '11 is bigger than 1, so the uphill climb to index 1 reaches length 2.'
  },
  {
    phase: 'LIS_PASS',
    tracks: [
      { label: 'nums',   items: [1, 11, 2, 10, 4, 5, 2, 1] },
      { label: 'dp1 ↑',  items: [1, 2, 2, 1, 1, 1, 1, 1] },
      { label: 'dp2 ↓',  items: [1, 1, 1, 1, 1, 1, 1, 1] },
    ],
    activeI: 2,
    activePrev: 0,
    metrics: [{ label: 'Processing', value: 'dp1[2]' }],
    formula: 'dp1[2] = max(1, 1 + dp1[0]) = 2  ← nums[0]=1 < nums[2]=2',
    action: 'At i=2 (val 2): nums[0]=1 < 2 ✓, but nums[1]=11 ≮ 2 ✗.',
    explain: 'Only index 0 can precede index 2 in an increasing chain. So dp1[2] = 1 + dp1[0] = 2, representing subsequence [1, 2].',
    intuition: '2 can only climb from 1 (not from 11), so its uphill is length 2.'
  },
  {
    phase: 'LIS_PASS',
    tracks: [
      { label: 'nums',   items: [1, 11, 2, 10, 4, 5, 2, 1] },
      { label: 'dp1 ↑',  items: [1, 2, 2, 3, 1, 1, 1, 1] },
      { label: 'dp2 ↓',  items: [1, 1, 1, 1, 1, 1, 1, 1] },
    ],
    activeI: 3,
    activePrev: 2,
    metrics: [{ label: 'Processing', value: 'dp1[3]' }],
    formula: 'dp1[3] = max(1, 1+dp1[0], 1+dp1[2]) = 3  ← best via [1,2,10]',
    action: 'At i=3 (val 10): extends from index 0 (1<10) and index 2 (2<10).',
    explain: 'dp1[3] = max(1+dp1[0], 1+dp1[2]) = max(2, 3) = 3. The best increasing chain ending at 10 is [1, 2, 10].',
    intuition: '10 can climb from either 1 or 2. The longest uphill path is through 2 (length 3).'
  },
  {
    phase: 'LIS_PASS',
    tracks: [
      { label: 'nums',   items: [1, 11, 2, 10, 4, 5, 2, 1] },
      { label: 'dp1 ↑',  items: [1, 2, 2, 3, 3, 4, 2, 1] },
      { label: 'dp2 ↓',  items: [1, 1, 1, 1, 1, 1, 1, 1] },
    ],
    activeI: 5,
    metrics: [{ label: 'dp1 Complete', value: '[1,2,2,3,3,4,2,1]' }],
    formula: 'dp1[5] = 4 via [1,2,4,5]  |  dp1[4] = 3 via [1,2,4]',
    action: 'Left-to-right LIS pass complete for all 8 elements.',
    explain: 'Key results — dp1[3]=3 via [1,2,10], dp1[4]=3 via [1,2,4], dp1[5]=4 via [1,2,4,5]. The maximum uphill reach is 4 at index 5.',
    intuition: 'We now know how long the ascending slope is from each position. Next: compute the descending slopes.'
  },
  {
    phase: 'LDS_PASS',
    tracks: [
      { label: 'nums',   items: [1, 11, 2, 10, 4, 5, 2, 1] },
      { label: 'dp1 ↑',  items: [1, 2, 2, 3, 3, 4, 2, 1] },
      { label: 'dp2 ↓',  items: [1, 1, 1, 1, 1, 1, 2, 1] },
    ],
    activeI: 6,
    metrics: [{ label: 'Processing', value: 'dp2[6]' }],
    formula: 'dp2[6] = max(1, 1 + dp2[7]) = 2  ← nums[7]=1 < nums[6]=2',
    action: 'Scanning right-to-left: at i=6 (val 2), check all prev > i.',
    explain: 'nums[7]=1 < nums[6]=2 ✓, so dp2[6] = 1 + dp2[7] = 2. The downhill from index 6 is [2, 1].',
    intuition: 'Starting the reverse scan — building downhill paths from right to left.'
  },
  {
    phase: 'LDS_PASS',
    tracks: [
      { label: 'nums',   items: [1, 11, 2, 10, 4, 5, 2, 1] },
      { label: 'dp1 ↑',  items: [1, 2, 2, 3, 3, 4, 2, 1] },
      { label: 'dp2 ↓',  items: [1, 1, 1, 4, 3, 3, 2, 1] },
    ],
    activeI: 3,
    metrics: [{ label: 'Processing', value: 'dp2[3..5]' }],
    formula: 'dp2[3] = 4 via [10,4,2,1]  |  dp2[4] = 3 via [4,2,1]  |  dp2[5] = 3 via [5,2,1]',
    action: 'Processed indices 5 → 3 in right-to-left pass.',
    explain: 'Index 3 (val 10) can descend to 4→2→1, giving dp2[3]=4. Index 4 (val 4) descends to 2→1, dp2[4]=3. Index 5 (val 5) descends to 2→1, dp2[5]=3.',
    intuition: 'The downhill from 10 is the steepest — it drops through 4 values.'
  },
  {
    phase: 'LDS_PASS',
    tracks: [
      { label: 'nums',   items: [1, 11, 2, 10, 4, 5, 2, 1] },
      { label: 'dp1 ↑',  items: [1, 2, 2, 3, 3, 4, 2, 1] },
      { label: 'dp2 ↓',  items: [1, 5, 2, 4, 3, 3, 2, 1] },
    ],
    activeI: 1,
    metrics: [{ label: 'dp2 Complete', value: '[1,5,2,4,3,3,2,1]' }],
    formula: 'dp2[1] = 5 via [11,10,4,2,1]',
    action: 'Right-to-left LDS pass complete. dp2[1]=5 is the longest descent.',
    explain: 'Index 1 (val 11) has the longest single downhill: [11,10,4,2,1] = length 5. Both uphill (dp1) and downhill (dp2) arrays are now ready.',
    intuition: 'Now we merge: for each index, the total bitonic length = its uphill + its downhill − 1 (the peak itself is counted in both).'
  },
  {
    phase: 'MERGE',
    tracks: [
      { label: 'nums',   items: [1, 11, 2, 10, 4, 5, 2, 1] },
      { label: 'dp1 ↑',  items: [1, 2, 2, 3, 3, 4, 2, 1] },
      { label: 'dp2 ↓',  items: [1, 5, 2, 4, 3, 3, 2, 1] },
    ],
    activeI: 3,
    metrics: [
      { label: 'Candidate Peak', value: 'i=1 → 2+5−1=6' },
      { label: 'Candidate Peak', value: 'i=3 → 3+4−1=6' },
    ],
    formula: 'maxBitonic = max(dp1[i] + dp2[i] − 1) for all i',
    action: 'Scan all indices for the maximum bitonic length.',
    explain: 'Evaluating dp1[i]+dp2[i]−1 for each i: [1,6,3,6,5,6,3,1]. Three peaks tie at 6: i=1 (via [1,11,10,4,2,1]), i=3 (via [1,2,10,4,2,1]), i=5 (via [1,2,4,5,2,1]).',
    intuition: 'Multiple peaks can yield the same optimal length. Any of these subsequences is a valid answer.',
    customCard: {
      title: 'Bitonic Lengths at Each Index',
      rows: [
        { label: 'i=0', value: '1+1−1 = 1' },
        { label: 'i=1', value: '2+5−1 = 6 ★', accent: true },
        { label: 'i=2', value: '2+2−1 = 3' },
        { label: 'i=3', value: '3+4−1 = 6 ★', accent: true },
        { label: 'i=4', value: '3+3−1 = 5' },
        { label: 'i=5', value: '4+3−1 = 6 ★', accent: true },
        { label: 'i=6', value: '2+2−1 = 3' },
        { label: 'i=7', value: '1+1−1 = 1' },
      ]
    }
  },
  {
    phase: 'COMPLETED',
    tracks: [
      { label: 'nums',   items: [1, 11, 2, 10, 4, 5, 2, 1] },
      { label: 'dp1 ↑',  items: [1, 2, 2, 3, 3, 4, 2, 1] },
      { label: 'dp2 ↓',  items: [1, 5, 2, 4, 3, 3, 2, 1] },
    ],
    activeI: null,
    metrics: [
      { label: 'Max Bitonic Length', value: 6, highlight: true },
      { label: 'Optimal Peaks', value: 'i=1, i=3, i=5' },
    ],
    formula: 'Answer = 6  (e.g. [1, 2, 10, 4, 2, 1])',
    action: 'Longest Bitonic Subsequence found!',
    explain: 'The longest bitonic subsequence has length 6. One example: [1, 2, 10, 4, 2, 1] — strictly increasing [1,2,10] then strictly decreasing [10,4,2,1]. The peak at 10 contributes dp1[3]=3 uphill + dp2[3]=4 downhill − 1 shared peak = 6.',
    intuition: 'The −1 correction prevents double-counting the peak element that sits at the junction of the uphill and downhill slopes.'
  }
];

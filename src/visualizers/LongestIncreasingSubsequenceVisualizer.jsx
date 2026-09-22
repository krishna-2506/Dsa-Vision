// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'Longest Increasing Subsequence (LIS)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N²)',
  spaceComplexity: 'O(N)',
  description: 'Finds the length of the longest strictly increasing subsequence in an integer array. At each index i, dp[i] = 1 + max(dp[prev]) for all prev < i where nums[prev] < nums[i].'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'Longest Increasing Subsequence',
  nodes: [
    { id: 'root', label: 'Longest Increasing Subsequence (LIS)', children: ['subproblem', 'transition', 'answer'] },
    { id: 'subproblem', label: '1. State Definition', detail: 'dp[i] = length of the longest strictly increasing subsequence ending at index i' },
    { id: 'transition', label: '2. Recurrence Relation', children: ['check', 'formula'] },
    { id: 'check', label: 'Condition', detail: 'nums[prev] < nums[i] for all prev < i' },
    { id: 'formula', label: 'State Transition', detail: 'dp[i] = max(dp[i], 1 + dp[prev])' },
    { id: 'answer', label: '3. Optimal Answer', detail: 'max(dp[0..n-1]) over the entire array' }
  ]
};

export const solutions = {
  cpp: `// C++ Longest Increasing Subsequence
// Time: O(N^2) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return 0;
        vector<int> dp(n, 1);
        int maxLIS = 1;

        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (nums[prev] < nums[i]) {
                    dp[i] = max(dp[i], 1 + dp[prev]);
                }
            }
            maxLIS = max(maxLIS, dp[i]);
        }

        return maxLIS;
    }
};`,
  python: `# Python 3 Longest Increasing Subsequence
# Time: O(N^2) | Space: O(N)
class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        if not nums:
            return 0
        n = len(nums)
        dp = [1] * n

        for i in range(n):
            for prev in range(i):
                if nums[prev] < nums[i]:
                    dp[i] = max(dp[i], 1 + dp[prev])

        return max(dp)`,
  java: `// Java Longest Increasing Subsequence
// Time: O(N^2) | Space: O(N)
import java.util.Arrays;

class Solution {
    public int lengthOfLIS(int[] nums) {
        if (nums.length == 0) return 0;
        int n = nums.length;
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        int maxLIS = 1;

        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (nums[prev] < nums[i]) {
                    dp[i] = Math.max(dp[i], 1 + dp[prev]);
                }
            }
            maxLIS = Math.max(maxLIS, dp[i]);
        }

        return maxLIS;
    }
}`,
  javascript: `// JavaScript Longest Increasing Subsequence
// Time: O(N^2) | Space: O(N)
var lengthOfLIS = function(nums) {
    if (!nums.length) return 0;
    const n = nums.length;
    const dp = new Array(n).fill(1);
    let maxLIS = 1;

    for (let i = 0; i < n; i++) {
        for (let prev = 0; prev < i; prev++) {
            if (nums[prev] < nums[i]) {
                dp[i] = Math.max(dp[i], 1 + dp[prev]);
            }
        }
        maxLIS = Math.max(maxLIS, dp[i]);
    }

    return maxLIS;
};`
};

export const steps = [
  {
    phase: 'SETUP',
    tracks: [
      { label: 'nums', items: [10, 9, 2, 5, 3, 7, 101, 18] },
      { label: 'dp[i]', items: [1, 1, 1, 1, 1, 1, 1, 1] }
    ],
    activeI: null,
    activePrev: null,
    formula: 'dp[i] = 1 for all i in [0..n-1]',
    action: 'Initialize DP table: each individual number forms an increasing subsequence of length 1.',
    explain: 'dp[i] stores the length of the longest increasing subsequence ending strictly at index i. Initially, every single element forms a valid subsequence of length 1.',
    intuition: 'Base case of 1 element subsequence is trivially length 1.',
    metrics: [
      { label: 'Max LIS', value: 1, highlight: true },
      { label: 'Array Size', value: 8 },
      { label: 'Status', value: 'Initialized' }
    ],
    customCard: {
      title: 'State Definition',
      rows: [
        { label: 'dp[i]', value: 'Length of LIS ending strictly at nums[i]' },
        { label: 'Recurrence', value: 'dp[i] = max(dp[i], 1 + dp[prev]) for all prev < i where nums[prev] < nums[i]' }
      ]
    }
  },
  {
    phase: 'REJECT',
    tracks: [
      { label: 'nums', items: [10, 9, 2, 5, 3, 7, 101, 18] },
      { label: 'dp[i]', items: [1, 1, 1, 1, 1, 1, 1, 1] }
    ],
    activeI: 1,
    activePrev: 0,
    formula: 'nums[0] = 10 >= nums[1] = 9 => Cannot extend => dp[1] remains 1',
    action: 'Scan i=1 (9) with prev=0 (10): 10 is not smaller than 9.',
    explain: '10 cannot precede 9 in an increasing subsequence because 10 >= 9. dp[1] stays at 1.',
    intuition: 'Decreasing transitions are invalid for increasing subsequences.',
    metrics: [
      { label: 'Max LIS', value: 1 },
      { label: 'Comparison', value: '10 < 9 (False)' },
      { label: 'Current Best', value: '1' }
    ]
  },
  {
    phase: 'REJECT',
    tracks: [
      { label: 'nums', items: [10, 9, 2, 5, 3, 7, 101, 18] },
      { label: 'dp[i]', items: [1, 1, 1, 1, 1, 1, 1, 1] }
    ],
    activeI: 2,
    activePrev: 1,
    formula: 'nums[0]=10, nums[1]=9 both > nums[2]=2 => dp[2] remains 1',
    action: 'Scan i=2 (2) with prev=0 and prev=1: Neither element is smaller than 2.',
    explain: 'Both 10 and 9 are larger than 2. 2 cannot extend either predecessor, so dp[2] remains 1.',
    intuition: 'A small element starts fresh as a candidate base for future extensions.',
    metrics: [
      { label: 'Max LIS', value: 1 },
      { label: 'Comparison', value: 'All prev >= 2' },
      { label: 'dp[2]', value: 1 }
    ]
  },
  {
    phase: 'EXTEND',
    tracks: [
      { label: 'nums', items: [10, 9, 2, 5, 3, 7, 101, 18] },
      { label: 'dp[i]', items: [1, 1, 1, 2, 1, 1, 1, 1] }
    ],
    activeI: 3,
    activePrev: 2,
    formula: 'nums[2] < nums[3] (2 < 5) => dp[3] = 1 + dp[2] = 2',
    action: 'Scan i=3 (5) with prev=2 (2): 2 < 5, extend LIS to 2!',
    explain: '5 is strictly greater than 2. Since 1 + dp[2] = 1 + 1 = 2 > dp[3], we update dp[3] = 2. Subsequence formed: [2, 5]. Global Max LIS becomes 2.',
    intuition: 'First successful sequence growth: [2, 5].',
    metrics: [
      { label: 'Max LIS', value: 2, highlight: true },
      { label: 'Current Chain', value: '[2, 5]' },
      { label: 'Active i', value: '3 (val 5)' }
    ],
    customCard: {
      title: 'Successful Extension',
      rows: [
        { label: 'Condition', value: 'nums[2] (2) < nums[3] (5) -> TRUE', accent: true },
        { label: 'Update', value: 'dp[3] = 1 + dp[2] = 2' }
      ]
    }
  },
  {
    phase: 'EXTEND',
    tracks: [
      { label: 'nums', items: [10, 9, 2, 5, 3, 7, 101, 18] },
      { label: 'dp[i]', items: [1, 1, 1, 2, 2, 1, 1, 1] }
    ],
    activeI: 4,
    activePrev: 2,
    formula: 'nums[2] < nums[4] (2 < 3) => dp[4] = 1 + dp[2] = 2',
    action: 'Scan i=4 (3) with prev=2 (2): 2 < 3, extend LIS to 2.',
    explain: '3 is greater than 2. We update dp[4] = 1 + dp[2] = 2. Subsequence formed: [2, 3]. Notice that [2, 3] ends with a smaller tail than [2, 5].',
    intuition: 'Alternate branch: [2, 3] provides a tighter ending bound.',
    metrics: [
      { label: 'Max LIS', value: 2 },
      { label: 'Current Chain', value: '[2, 3]' },
      { label: 'Active i', value: '4 (val 3)' }
    ]
  },
  {
    phase: 'EXTEND',
    tracks: [
      { label: 'nums', items: [10, 9, 2, 5, 3, 7, 101, 18] },
      { label: 'dp[i]', items: [1, 1, 1, 2, 2, 3, 1, 1] }
    ],
    activeI: 5,
    activePrev: 3,
    formula: 'nums[3]=5 < 7 and nums[4]=3 < 7 => dp[5] = 1 + 2 = 3',
    action: 'Scan i=5 (7): 7 can extend both 5 (dp[3]=2) and 3 (dp[4]=2) to length 3!',
    explain: '7 exceeds 2, 5, and 3. Taking the maximum over predecessors: 1 + max(dp[3], dp[4]) = 1 + 2 = 3. Global Max LIS increases to 3. Subsequences: [2, 5, 7] and [2, 3, 7].',
    intuition: 'Reaching length 3 through either path.',
    metrics: [
      { label: 'Max LIS', value: 3, highlight: true },
      { label: 'Current Chain', value: '[2, 3, 7] / [2, 5, 7]' },
      { label: 'Active i', value: '5 (val 7)' }
    ],
    customCard: {
      title: 'Convergence of Branches',
      rows: [
        { label: 'Predecessors', value: 'Both 5 and 3 precede 7 with length 2', accent: true },
        { label: 'dp[5] Update', value: '1 + 2 = 3' }
      ]
    }
  },
  {
    phase: 'SCAN',
    tracks: [
      { label: 'nums', items: [10, 9, 2, 5, 3, 7, 101, 18] },
      { label: 'dp[i]', items: [1, 1, 1, 2, 2, 3, 1, 1] }
    ],
    activeI: 6,
    activePrev: 0,
    formula: 'nums[0] < nums[6] (10 < 101) => candidate dp[6] = 2',
    action: 'Scan i=6 (101) with earlier predecessors: 10 < 101 gives length 2.',
    explain: '101 exceeds 10, giving length 2. But we must check all predecessors to find the maximum possible extension.',
    intuition: 'The inner loop tests all previous indices.',
    metrics: [
      { label: 'Max LIS', value: 3 },
      { label: 'Testing prev', value: '0 (val 10)' },
      { label: 'Candidate', value: 'dp = 2' }
    ]
  },
  {
    phase: 'EXTEND',
    tracks: [
      { label: 'nums', items: [10, 9, 2, 5, 3, 7, 101, 18] },
      { label: 'dp[i]', items: [1, 1, 1, 2, 2, 3, 4, 1] }
    ],
    activeI: 6,
    activePrev: 5,
    formula: 'nums[5] < nums[6] (7 < 101) => dp[6] = 1 + dp[5] = 1 + 3 = 4',
    action: 'Scan i=6 (101) with prev=5 (7): 7 < 101, new Global Max LIS = 4!',
    explain: '101 extends 7 (which already has length 3). 1 + dp[5] = 1 + 3 = 4 > dp[6]. dp[6] becomes 4. Sequence: [2, 3, 7, 101]. Global Max LIS reaches 4!',
    intuition: 'Extending the deepest preceding branch achieves maximum length 4.',
    metrics: [
      { label: 'Max LIS', value: 4, highlight: true },
      { label: 'Current Chain', value: '[2, 3, 7, 101]' },
      { label: 'Active i', value: '6 (val 101)' }
    ],
    customCard: {
      title: 'Global Maximum Reached',
      rows: [
        { label: 'Link', value: '7 -> 101 (nums[5] < nums[6])', accent: true },
        { label: 'New Max Length', value: 'dp[6] = 4' }
      ]
    }
  },
  {
    phase: 'EXTEND',
    tracks: [
      { label: 'nums', items: [10, 9, 2, 5, 3, 7, 101, 18] },
      { label: 'dp[i]', items: [1, 1, 1, 2, 2, 3, 4, 4] }
    ],
    activeI: 7,
    activePrev: 5,
    formula: 'nums[5] < nums[7] (7 < 18) => dp[7] = 1 + dp[5] = 1 + 3 = 4',
    action: 'Scan i=7 (18) with prev=5 (7): 7 < 18, another LIS of length 4!',
    explain: '18 also extends 7 (dp[5]=3) to reach length 4. Sequence: [2, 3, 7, 18]. Both 101 and 18 achieve length 4.',
    intuition: 'Subsequence [2, 3, 7, 18] achieves the same maximum length 4 with a smaller tail.',
    metrics: [
      { label: 'Max LIS', value: 4, highlight: true },
      { label: 'Alternate Chain', value: '[2, 3, 7, 18]' },
      { label: 'Active i', value: '7 (val 18)' }
    ]
  },
  {
    phase: 'COMPLETED',
    tracks: [
      { label: 'nums', items: [10, 9, 2, 5, 3, 7, 101, 18] },
      { label: 'dp[i]', items: [1, 1, 1, 2, 2, 3, 4, 4] }
    ],
    activeI: null,
    activePrev: null,
    formula: 'max(dp) = max(1, 1, 1, 2, 2, 3, 4, 4) = 4 => Result: 4',
    action: 'Tabulation complete. The maximum value across the dp array is 4.',
    explain: 'The maximum length of any strictly increasing subsequence in [10, 9, 2, 5, 3, 7, 101, 18] is 4. Valid example subsequences include [2, 3, 7, 101] and [2, 3, 7, 18]. Total comparisons: N(N-1)/2 = 28 checks in O(N²) time.',
    intuition: 'Every state dp[i] considers all prior endings, guaranteeing the global optimum.',
    metrics: [
      { label: 'Final LIS Length', value: 4, highlight: true },
      { label: 'Sample LIS', value: '[2, 3, 7, 18]' },
      { label: 'Time Complexity', value: 'O(N²)' }
    ],
    customCard: {
      title: 'Algorithm Verification',
      rows: [
        { label: 'Final DP Array', value: '[1, 1, 1, 2, 2, 3, 4, 4]', accent: true },
        { label: 'Overall Max', value: '4 elements' }
      ]
    }
  }
];

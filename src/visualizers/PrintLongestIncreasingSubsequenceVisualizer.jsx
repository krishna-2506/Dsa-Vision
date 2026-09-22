// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'Print Longest Increasing Subsequence',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N²)',
  spaceComplexity: 'O(N)',
  description: 'Constructs and returns the actual elements forming the Longest Increasing Subsequence. Maintains a parent pointer hash array alongside the DP array to track the exact predecessor index that maximized each state, enabling O(LIS) reconstruction.'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'Print Longest Increasing Subsequence',
  nodes: [
    { id: 'root', label: 'Print LIS', children: ['state', 'pointers', 'backtrack'] },
    { id: 'state', label: '1. Tabulate dp[i]', detail: 'dp[i] = length of LIS ending strictly at arr[i]' },
    { id: 'pointers', label: '2. Parent Hash Array', children: ['self-init', 'update-rule'] },
    { id: 'self-init', label: 'hash[i] = i', detail: 'Initialize each element pointing to itself' },
    { id: 'update-rule', label: 'hash[i] = prev', detail: 'Whenever 1 + dp[prev] > dp[i] for arr[prev] < arr[i], record predecessor index' },
    { id: 'backtrack', label: '3. Reconstruct & Reverse', detail: 'Follow parent pointers from index of max(dp) down to base, then reverse result' }
  ]
};

export const solutions = {
  cpp: `// C++ Print Longest Increasing Subsequence
// Time: O(N^2) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> printingLongestIncreasingSubsequence(vector<int>& arr, int n) {
        vector<int> dp(n, 1);
        vector<int> hash(n);
        int maxLen = 1;
        int lastIndex = 0;

        for (int i = 0; i < n; i++) {
            hash[i] = i; // Self pointer
            for (int prev = 0; prev < i; prev++) {
                if (arr[prev] < arr[i] && 1 + dp[prev] > dp[i]) {
                    dp[i] = 1 + dp[prev];
                    hash[i] = prev;
                }
            }
            if (dp[i] > maxLen) {
                maxLen = dp[i];
                lastIndex = i;
            }
        }

        // Backtrack using hash array
        vector<int> lis;
        lis.push_back(arr[lastIndex]);
        while (hash[lastIndex] != lastIndex) {
            lastIndex = hash[lastIndex];
            lis.push_back(arr[lastIndex]);
        }

        reverse(lis.begin(), lis.end());
        return lis;
    }
};`,
  python: `# Python 3 Print Longest Increasing Subsequence
# Time: O(N^2) | Space: O(N)
class Solution:
    def printingLongestIncreasingSubsequence(self, arr: list[int], n: int) -> list[int]:
        dp = [1] * n
        parent = list(range(n))
        max_len, last_index = 1, 0

        for i in range(n):
            for prev in range(i):
                if arr[prev] < arr[i] and 1 + dp[prev] > dp[i]:
                    dp[i] = 1 + dp[prev]
                    parent[i] = prev
            if dp[i] > max_len:
                max_len = dp[i]
                last_index = i

        lis = [arr[last_index]]
        while parent[last_index] != last_index:
            last_index = parent[last_index]
            lis.append(arr[last_index])

        return lis[::-1]`,
  java: `// Java Print Longest Increasing Subsequence
// Time: O(N^2) | Space: O(N)
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {
    public List<Integer> printingLongestIncreasingSubsequence(int[] arr, int n) {
        int[] dp = new int[n];
        int[] hash = new int[n];
        for (int i = 0; i < n; i++) {
            dp[i] = 1;
            hash[i] = i;
        }

        int maxLen = 1;
        int lastIndex = 0;

        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (arr[prev] < arr[i] && 1 + dp[prev] > dp[i]) {
                    dp[i] = 1 + dp[prev];
                    hash[i] = prev;
                }
            }
            if (dp[i] > maxLen) {
                maxLen = dp[i];
                lastIndex = i;
            }
        }

        List<Integer> lis = new ArrayList<>();
        lis.add(arr[lastIndex]);
        while (hash[lastIndex] != lastIndex) {
            lastIndex = hash[lastIndex];
            lis.add(arr[lastIndex]);
        }

        Collections.reverse(lis);
        return lis;
    }
}`,
  javascript: `// JavaScript Print Longest Increasing Subsequence
// Time: O(N^2) | Space: O(N)
var printingLongestIncreasingSubsequence = function(arr, n) {
    const dp = new Array(n).fill(1);
    const hash = Array.from({ length: n }, (_, i) => i);
    let maxLen = 1;
    let lastIndex = 0;

    for (let i = 0; i < n; i++) {
        for (let prev = 0; prev < i; prev++) {
            if (arr[prev] < arr[i] && 1 + dp[prev] > dp[i]) {
                dp[i] = 1 + dp[prev];
                hash[i] = prev;
            }
        }
        if (dp[i] > maxLen) {
            maxLen = dp[i];
            lastIndex = i;
        }
    }

    const lis = [arr[lastIndex]];
    while (hash[lastIndex] !== lastIndex) {
        lastIndex = hash[lastIndex];
        lis.push(arr[lastIndex]);
    }

    return lis.reverse();
};`
};

export const steps = [
  {
    phase: 'SETUP',
    tracks: [
      { label: 'arr', items: [10, 22, 9, 33, 21, 50, 41, 60] },
      { label: 'dp[i]', items: [1, 1, 1, 1, 1, 1, 1, 1] },
      { label: 'hash', items: [0, 1, 2, 3, 4, 5, 6, 7] }
    ],
    activeI: null,
    activePrev: null,
    formula: 'Initialize dp[i] = 1, hash[i] = i for all i in [0..n-1]',
    action: 'Initialize DP table and parent hash array with self-pointers.',
    explain: 'Each number starts as a subsequence of length 1 pointing to itself. As we find longer increasing sequences, hash[i] will store the predecessor index that yields the maximum dp[i].',
    intuition: 'The hash array records parent pointers for backtracking after tabulation.',
    metrics: [
      { label: 'Max LIS', value: 1, highlight: true },
      { label: 'Best End Idx', value: 0 },
      { label: 'Active State', value: 'Ready' }
    ],
    customCard: {
      title: 'State Roles',
      rows: [
        { label: 'dp[i]', value: 'Length of LIS ending strictly at index i' },
        { label: 'hash[i]', value: 'Predecessor index chosen to achieve dp[i]' }
      ]
    }
  },
  {
    phase: 'EXTEND',
    tracks: [
      { label: 'arr', items: [10, 22, 9, 33, 21, 50, 41, 60] },
      { label: 'dp[i]', items: [1, 2, 1, 1, 1, 1, 1, 1] },
      { label: 'hash', items: [0, 0, 2, 3, 4, 5, 6, 7] }
    ],
    activeI: 1,
    activePrev: 0,
    formula: 'arr[0] < arr[1] (10 < 22) => dp[1] = 1 + dp[0] = 2, hash[1] = 0',
    action: 'Check i=1 (22) with prev=0 (10): 10 < 22, extend LIS to 2.',
    explain: '22 is greater than 10. Since 1 + dp[0] = 2 > dp[1], we update dp[1] = 2 and record predecessor hash[1] = 0. Chain formed: 10 -> 22.',
    intuition: 'Whenever an increasing step improves dp[i], update hash[i] to point to prev.',
    metrics: [
      { label: 'Max LIS', value: 2, highlight: true },
      { label: 'Best End Idx', value: 1 },
      { label: 'Reconstructed', value: '[10, 22]' }
    ],
    customCard: {
      title: 'Transition at i=1',
      rows: [
        { label: 'Comparison', value: '10 < 22 -> TRUE', accent: true },
        { label: 'Parent Update', value: 'hash[1] = 0 (points to 10)' }
      ]
    }
  },
  {
    phase: 'SCAN',
    tracks: [
      { label: 'arr', items: [10, 22, 9, 33, 21, 50, 41, 60] },
      { label: 'dp[i]', items: [1, 2, 1, 1, 1, 1, 1, 1] },
      { label: 'hash', items: [0, 0, 2, 3, 4, 5, 6, 7] }
    ],
    activeI: 2,
    activePrev: 1,
    formula: 'arr[0]=10 > 9 and arr[1]=22 > 9 => dp[2] stays 1, hash[2] stays 2',
    action: 'Check i=2 (9) against prev=0 and prev=1: 9 is smaller than both.',
    explain: '9 cannot extend either 10 or 22. dp[2] remains 1 and hash[2] stays pointing to itself (index 2).',
    intuition: 'Smaller numbers begin their own candidate chains but cannot extend larger predecessors.',
    metrics: [
      { label: 'Max LIS', value: 2 },
      { label: 'Best End Idx', value: 1 },
      { label: 'At i=2', value: 'No extension' }
    ]
  },
  {
    phase: 'EXTEND',
    tracks: [
      { label: 'arr', items: [10, 22, 9, 33, 21, 50, 41, 60] },
      { label: 'dp[i]', items: [1, 2, 1, 3, 1, 1, 1, 1] },
      { label: 'hash', items: [0, 0, 2, 1, 4, 5, 6, 7] }
    ],
    activeI: 3,
    activePrev: 1,
    formula: 'arr[1] < arr[3] (22 < 33) => dp[3] = 1 + dp[1] = 3, hash[3] = 1',
    action: 'Check i=3 (33) with prev=1 (22): 22 < 33, extend LIS to 3.',
    explain: '33 is greater than 22. With dp[1] = 2, extending gives length 1 + 2 = 3. We record hash[3] = 1. Chain: 10 -> 22 -> 33.',
    intuition: 'Optimal chain extends through 22, achieving maximum length so far.',
    metrics: [
      { label: 'Max LIS', value: 3, highlight: true },
      { label: 'Best End Idx', value: 3 },
      { label: 'Reconstructed', value: '[10, 22, 33]' }
    ],
    customCard: {
      title: 'Transition at i=3',
      rows: [
        { label: 'Comparison', value: '22 < 33 -> TRUE', accent: true },
        { label: 'Parent Update', value: 'hash[3] = 1 (points to 22)' }
      ]
    }
  },
  {
    phase: 'SCAN',
    tracks: [
      { label: 'arr', items: [10, 22, 9, 33, 21, 50, 41, 60] },
      { label: 'dp[i]', items: [1, 2, 1, 3, 2, 1, 1, 1] },
      { label: 'hash', items: [0, 0, 2, 1, 0, 5, 6, 7] }
    ],
    activeI: 4,
    activePrev: 0,
    formula: 'arr[0] < arr[4] (10 < 21) => dp[4] = 2, hash[4] = 0',
    action: 'Check i=4 (21) with prev=0 (10): 10 < 21, dp[4] reaches 2.',
    explain: '21 can extend 10 (length 2) or 9 (length 2). It cannot extend 22 or 33. Best dp[4] = 2 with hash[4] = 0.',
    intuition: '21 creates an alternate branch: 10 -> 21 of length 2.',
    metrics: [
      { label: 'Max LIS', value: 3 },
      { label: 'Best End Idx', value: 3 },
      { label: 'Branch Chain', value: '[10, 21]' }
    ]
  },
  {
    phase: 'EXTEND',
    tracks: [
      { label: 'arr', items: [10, 22, 9, 33, 21, 50, 41, 60] },
      { label: 'dp[i]', items: [1, 2, 1, 3, 2, 4, 1, 1] },
      { label: 'hash', items: [0, 0, 2, 1, 0, 3, 6, 7] }
    ],
    activeI: 5,
    activePrev: 3,
    formula: 'arr[3] < arr[5] (33 < 50) => dp[5] = 1 + dp[3] = 4, hash[5] = 3',
    action: 'Check i=5 (50) with prev=3 (33): 33 < 50, extend LIS to 4!',
    explain: '50 extends the chain ending at 33 (dp[3]=3). New length = 4, hash[5] = 3. Chain: 10 -> 22 -> 33 -> 50.',
    intuition: 'Each extension step links to the highest-scoring compatible predecessor.',
    metrics: [
      { label: 'Max LIS', value: 4, highlight: true },
      { label: 'Best End Idx', value: 5 },
      { label: 'Reconstructed', value: '[10, 22, 33, 50]' }
    ]
  },
  {
    phase: 'EXTEND',
    tracks: [
      { label: 'arr', items: [10, 22, 9, 33, 21, 50, 41, 60] },
      { label: 'dp[i]', items: [1, 2, 1, 3, 2, 4, 4, 1] },
      { label: 'hash', items: [0, 0, 2, 1, 0, 3, 3, 7] }
    ],
    activeI: 6,
    activePrev: 3,
    formula: 'arr[3] < arr[6] (33 < 41) => dp[6] = 1 + dp[3] = 4, hash[6] = 3',
    action: 'Check i=6 (41) with prev=3 (33): 33 < 41, alternative LIS of 4.',
    explain: '41 also extends 33 to length 4 with hash[6] = 3. Both 50 and 41 form valid LIS chains of length 4.',
    intuition: 'Multiple optimal subsequences can co-exist; parent pointers keep them unambiguous.',
    metrics: [
      { label: 'Max LIS', value: 4 },
      { label: 'Best End Idx', value: 5 },
      { label: 'Alt Chain', value: '[10, 22, 33, 41]' }
    ]
  },
  {
    phase: 'EXTEND',
    tracks: [
      { label: 'arr', items: [10, 22, 9, 33, 21, 50, 41, 60] },
      { label: 'dp[i]', items: [1, 2, 1, 3, 2, 4, 4, 5] },
      { label: 'hash', items: [0, 0, 2, 1, 0, 3, 3, 5] }
    ],
    activeI: 7,
    activePrev: 5,
    formula: 'arr[5] < arr[7] (50 < 60) => dp[7] = 1 + dp[5] = 5, hash[7] = 5',
    action: 'Check i=7 (60) with prev=5 (50): 50 < 60, global maximum LIS = 5!',
    explain: '60 is greater than 50 (and also 41). Choosing 50 gives 1 + dp[5] = 5, updating dp[7] = 5, hash[7] = 5. lastIndex = 7.',
    intuition: 'Global peak LIS of 5 attained at the last element.',
    metrics: [
      { label: 'Max LIS', value: 5, highlight: true },
      { label: 'Best End Idx', value: 7, highlight: true },
      { label: 'Reconstructed', value: '[10, 22, 33, 50, 60]' }
    ],
    customCard: {
      title: 'Global Optimal Subsequence Found',
      rows: [
        { label: 'Optimal End', value: 'lastIndex = 7 (val = 60)', accent: true },
        { label: 'Max LIS Length', value: '5 elements' }
      ]
    }
  },
  {
    phase: 'BACKTRACK',
    tracks: [
      { label: 'arr', items: [10, 22, 9, 33, 21, 50, 41, 60] },
      { label: 'dp[i]', items: [1, 2, 1, 3, 2, 4, 4, 5] },
      { label: 'hash', items: [0, 0, 2, 1, 0, 3, 3, 5] }
    ],
    activeI: 7,
    activePrev: 5,
    formula: 'Trace: hash[7]=5 -> hash[5]=3 -> hash[3]=1 -> hash[1]=0 -> hash[0]=0 (stop)',
    action: 'Follow hash parent pointers backwards starting at index 7.',
    explain: 'From index 7 (60) -> jump to hash[7]=5 (50) -> hash[5]=3 (33) -> hash[3]=1 (22) -> hash[1]=0 (10). At index 0, hash[0]=0 (self-pointer), ending the trace.',
    intuition: 'Parent pointers guarantee exact path recovery in O(LIS) time.',
    metrics: [
      { label: 'Raw Trace', value: '60 -> 50 -> 33 -> 22 -> 10', highlight: true },
      { label: 'Trace Steps', value: '5 hops' },
      { label: 'Status', value: 'Reconstructed' }
    ],
    customCard: {
      title: 'Pointer Backtrack Sequence',
      rows: [
        { label: 'Trace Path', value: 'idx 7 (60) -> 5 (50) -> 3 (33) -> 1 (22) -> 0 (10)', accent: true },
        { label: 'Reversed Order', value: '[60, 50, 33, 22, 10]' }
      ]
    }
  },
  {
    phase: 'COMPLETED',
    tracks: [
      { label: 'arr', items: [10, 22, 9, 33, 21, 50, 41, 60] },
      { label: 'dp[i]', items: [1, 2, 1, 3, 2, 4, 4, 5] },
      { label: 'hash', items: [0, 0, 2, 1, 0, 3, 3, 5] }
    ],
    activeI: null,
    activePrev: null,
    formula: 'reverse([60, 50, 33, 22, 10]) => Final LIS: [10, 22, 33, 50, 60]',
    action: 'Reverse the backtracked array to obtain the LIS in original chronological order.',
    explain: 'Reversing [60, 50, 33, 22, 10] produces [10, 22, 33, 50, 60]. Verified: 10 < 22 < 33 < 50 < 60, strictly increasing with length 5.',
    intuition: 'Combining O(N²) DP tabulation with O(k) parent pointer backtracking outputs the actual subsequence.',
    metrics: [
      { label: 'Final LIS', value: '[10, 22, 33, 50, 60]', highlight: true },
      { label: 'Length', value: 5, highlight: true },
      { label: 'Time Complexity', value: 'O(N²) + O(LIS)' }
    ],
    customCard: {
      title: 'Final Output Verification',
      rows: [
        { label: 'Result Sequence', value: '[10, 22, 33, 50, 60]', accent: true },
        { label: 'Strict Increase', value: '10 < 22 < 33 < 50 < 60 (All checks passed)' }
      ]
    }
  }
];

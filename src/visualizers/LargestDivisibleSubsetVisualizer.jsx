// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'Largest Divisible Subset',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N²)',
  spaceComplexity: 'O(N)',
  description: 'Finds the largest subset of numbers where every pair (a, b) satisfies a % b == 0 or b % a == 0. By sorting the array first, transitivity guarantees that if nums[i] % nums[prev] == 0, nums[i] divides all preceding elements in that chain, reducing the problem to an LIS variant.'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'Largest Divisible Subset',
  nodes: [
    { id: 'root', label: 'Largest Divisible Subset', children: ['sort', 'lis-analogy', 'backtrack'] },
    { id: 'sort', label: '1. Sort Input Array', detail: 'Ensures transitivity: if b % a == 0 and c % b == 0, then c % a == 0 automatically holds' },
    { id: 'lis-analogy', label: '2. LIS-Style DP', children: ['state', 'transition'] },
    { id: 'state', label: 'dp[i] & parent[i]', detail: 'dp[i] = length of largest subset ending at nums[i]; parent[i] stores predecessor index' },
    { id: 'transition', label: 'Condition Check', detail: 'If nums[i] % nums[prev] == 0 and 1 + dp[prev] > dp[i], update dp[i] and parent[i]' },
    { id: 'backtrack', label: '3. Backtrack Solution', detail: 'Trace parent pointers from maxLen index and reverse to obtain subset' }
  ]
};

export const solutions = {
  cpp: `// C++ Largest Divisible Subset
// Time: O(N^2) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return {};

        sort(nums.begin(), nums.end());
        vector<int> dp(n, 1);
        vector<int> parent(n);
        int maxLen = 1, lastIndex = 0;

        for (int i = 0; i < n; i++) {
            parent[i] = i;
            for (int prev = 0; prev < i; prev++) {
                if (nums[i] % nums[prev] == 0 && 1 + dp[prev] > dp[i]) {
                    dp[i] = 1 + dp[prev];
                    parent[i] = prev;
                }
            }
            if (dp[i] > maxLen) {
                maxLen = dp[i];
                lastIndex = i;
            }
        }

        vector<int> result;
        result.push_back(nums[lastIndex]);
        while (parent[lastIndex] != lastIndex) {
            lastIndex = parent[lastIndex];
            result.push_back(nums[lastIndex]);
        }

        reverse(result.begin(), result.end());
        return result;
    }
};`,
  python: `# Python 3 Largest Divisible Subset
# Time: O(N^2) | Space: O(N)
class Solution:
    def largestDivisibleSubset(self, nums: list[int]) -> list[int]:
        if not nums:
            return []

        nums.sort()
        n = len(nums)
        dp = [1] * n
        parent = list(range(n))
        max_len, last_index = 1, 0

        for i in range(n):
            for prev in range(i):
                if nums[i] % nums[prev] == 0 and 1 + dp[prev] > dp[i]:
                    dp[i] = 1 + dp[prev]
                    parent[i] = prev
            if dp[i] > max_len:
                max_len = dp[i]
                last_index = i

        result = [nums[last_index]]
        while parent[last_index] != last_index:
            last_index = parent[last_index]
            result.append(nums[last_index])

        return result[::-1]`,
  java: `// Java Largest Divisible Subset
// Time: O(N^2) | Space: O(N)
import java.util.Arrays;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {
    public List<Integer> largestDivisibleSubset(int[] nums) {
        if (nums.length == 0) return new ArrayList<>();

        Arrays.sort(nums);
        int n = nums.length;
        int[] dp = new int[n];
        int[] parent = new int[n];
        Arrays.fill(dp, 1);
        int maxLen = 1, lastIndex = 0;

        for (int i = 0; i < n; i++) {
            parent[i] = i;
            for (int prev = 0; prev < i; prev++) {
                if (nums[i] % nums[prev] == 0 && 1 + dp[prev] > dp[i]) {
                    dp[i] = 1 + dp[prev];
                    parent[i] = prev;
                }
            }
            if (dp[i] > maxLen) {
                maxLen = dp[i];
                lastIndex = i;
            }
        }

        List<Integer> result = new ArrayList<>();
        result.add(nums[lastIndex]);
        while (parent[lastIndex] != lastIndex) {
            lastIndex = parent[lastIndex];
            result.add(nums[lastIndex]);
        }

        Collections.reverse(result);
        return result;
    }
}`,
  javascript: `// JavaScript Largest Divisible Subset
// Time: O(N^2) | Space: O(N)
var largestDivisibleSubset = function(nums) {
    if (!nums.length) return [];

    nums.sort((a, b) => a - b);
    const n = nums.length;
    const dp = new Array(n).fill(1);
    const parent = Array.from({ length: n }, (_, i) => i);
    let maxLen = 1, lastIndex = 0;

    for (let i = 0; i < n; i++) {
        for (let prev = 0; prev < i; prev++) {
            if (nums[i] % nums[prev] === 0 && 1 + dp[prev] > dp[i]) {
                dp[i] = 1 + dp[prev];
                parent[i] = prev;
            }
        }
        if (dp[i] > maxLen) {
            maxLen = dp[i];
            lastIndex = i;
        }
    }

    const result = [nums[lastIndex]];
    while (parent[lastIndex] !== lastIndex) {
        lastIndex = parent[lastIndex];
        result.push(nums[lastIndex]);
    }

    return result.reverse();
};`
};

export const steps = [
  {
    phase: 'SETUP',
    tracks: [
      { label: 'nums', items: [1, 4, 7, 8, 16] },
      { label: 'dp[i]', items: [1, 1, 1, 1, 1] },
      { label: 'parent', items: [0, 1, 2, 3, 4] }
    ],
    activeI: null,
    activePrev: null,
    formula: 'nums sorted: [1, 4, 7, 8, 16] | dp[i] = 1, parent[i] = i',
    action: 'Sort array ascending and initialize dp length and parent arrays.',
    explain: 'Sorting ensures transitivity: if a % b == 0 and b % c == 0, then a % c == 0 is guaranteed. Every element initially forms a subset of size 1 with itself as parent.',
    intuition: 'Sorted order transforms pairwise divisibility into a sequential longest chain search.',
    metrics: [
      { label: 'Max Subset Len', value: 1, highlight: true },
      { label: 'Best End Idx', value: 0 },
      { label: 'Status', value: 'Ready' }
    ],
    customCard: {
      title: 'Algorithm Invariant',
      rows: [
        { label: 'Transitivity Property', value: 'a < b < c and b % a == 0 and c % b == 0 => c % a == 0' },
        { label: 'Initial State', value: 'All dp[i] = 1, parent[i] = i' }
      ]
    }
  },
  {
    phase: 'EXTEND',
    tracks: [
      { label: 'nums', items: [1, 4, 7, 8, 16] },
      { label: 'dp[i]', items: [1, 2, 1, 1, 1] },
      { label: 'parent', items: [0, 0, 2, 3, 4] }
    ],
    activeI: 1,
    activePrev: 0,
    formula: '4 % 1 == 0 (Valid) => dp[1] = 1 + dp[0] = 2, parent[1] = 0',
    action: 'Check i=1 (4) with prev=0 (1): 4 % 1 == 0, extend subset.',
    explain: 'Element 4 is divisible by 1. Since 1 + dp[0] = 2 > dp[1], we update dp[1] to 2 and set parent[1] = 0. Chain formed: [1, 4].',
    intuition: 'Any multiple can extend a valid divisible chain.',
    metrics: [
      { label: 'Max Subset Len', value: 2, highlight: true },
      { label: 'Best End Idx', value: 1 },
      { label: 'Current Chain', value: '[1, 4]' }
    ],
    customCard: {
      title: 'Step Inspection: i=1, prev=0',
      rows: [
        { label: 'Divisibility Check', value: '4 % 1 == 0 -> TRUE', accent: true },
        { label: 'DP Update', value: 'dp[1] updated from 1 to 2, parent[1] = 0' }
      ]
    }
  },
  {
    phase: 'EXTEND',
    tracks: [
      { label: 'nums', items: [1, 4, 7, 8, 16] },
      { label: 'dp[i]', items: [1, 2, 2, 1, 1] },
      { label: 'parent', items: [0, 0, 0, 3, 4] }
    ],
    activeI: 2,
    activePrev: 0,
    formula: '7 % 1 == 0 (Valid) => dp[2] = 1 + dp[0] = 2, parent[2] = 0',
    action: 'Check i=2 (7) with prev=0 (1): 7 % 1 == 0, extend subset.',
    explain: '7 is divisible by 1. dp[2] becomes 2 with parent 0. Chain: [1, 7].',
    intuition: '1 divides every positive integer, so every number can at least chain to 1.',
    metrics: [
      { label: 'Max Subset Len', value: 2 },
      { label: 'Best End Idx', value: 1 },
      { label: 'Current Chain', value: '[1, 7]' }
    ]
  },
  {
    phase: 'REJECT',
    tracks: [
      { label: 'nums', items: [1, 4, 7, 8, 16] },
      { label: 'dp[i]', items: [1, 2, 2, 1, 1] },
      { label: 'parent', items: [0, 0, 0, 3, 4] }
    ],
    activeI: 2,
    activePrev: 1,
    formula: '7 % 4 = 3 != 0 (Invalid) => dp[2] remains 2',
    action: 'Check i=2 (7) with prev=1 (4): 7 is not divisible by 4, skip.',
    explain: '7 % 4 != 0, so 7 cannot extend the chain ending at 4. dp[2] stays at 2.',
    intuition: 'Non-divisible pairs cannot be part of the same subset.',
    metrics: [
      { label: 'Max Subset Len', value: 2 },
      { label: 'Best End Idx', value: 1 },
      { label: 'Check 7 % 4', value: 'Failed (rem=3)' }
    ]
  },
  {
    phase: 'SCAN',
    tracks: [
      { label: 'nums', items: [1, 4, 7, 8, 16] },
      { label: 'dp[i]', items: [1, 2, 2, 2, 1] },
      { label: 'parent', items: [0, 0, 0, 0, 4] }
    ],
    activeI: 3,
    activePrev: 0,
    formula: '8 % 1 == 0 => dp[3] = 1 + dp[0] = 2, parent[3] = 0',
    action: 'Check i=3 (8) with prev=0 (1): 8 % 1 == 0, dp[3] becomes 2.',
    explain: '8 extends 1 to length 2. Next we will check if 8 can extend larger chains.',
    intuition: 'Earlier predecessors provide initial lower bounds.',
    metrics: [
      { label: 'Max Subset Len', value: 2 },
      { label: 'Best End Idx', value: 1 },
      { label: 'Current Chain', value: '[1, 8]' }
    ]
  },
  {
    phase: 'EXTEND',
    tracks: [
      { label: 'nums', items: [1, 4, 7, 8, 16] },
      { label: 'dp[i]', items: [1, 2, 2, 3, 1] },
      { label: 'parent', items: [0, 0, 0, 1, 4] }
    ],
    activeI: 3,
    activePrev: 1,
    formula: '8 % 4 == 0 (Valid) => 1 + dp[1] = 1 + 2 = 3 > dp[3] => dp[3] = 3, parent[3] = 1',
    action: 'Check i=3 (8) with prev=1 (4): 8 % 4 == 0, new best chain of length 3!',
    explain: '8 is divisible by 4, and 4 already extends 1. Since 1 + dp[1] = 3 > dp[3], we update dp[3] = 3 and point parent[3] = 1. Chain: [1, 4, 8].',
    intuition: 'Chaining through 4 automatically inherits 1 because 4 % 1 == 0 and 8 % 4 == 0.',
    metrics: [
      { label: 'Max Subset Len', value: 3, highlight: true },
      { label: 'Best End Idx', value: 3 },
      { label: 'Current Chain', value: '[1, 4, 8]' }
    ],
    customCard: {
      title: 'Optimal Substructure: i=3 (8)',
      rows: [
        { label: 'Condition', value: '8 % 4 == 0 (nums[3] % nums[1] == 0)', accent: true },
        { label: 'Chain Link', value: '1 -> 4 -> 8 (Length 3)' }
      ]
    }
  },
  {
    phase: 'REJECT',
    tracks: [
      { label: 'nums', items: [1, 4, 7, 8, 16] },
      { label: 'dp[i]', items: [1, 2, 2, 3, 1] },
      { label: 'parent', items: [0, 0, 0, 1, 4] }
    ],
    activeI: 3,
    activePrev: 2,
    formula: '8 % 7 = 1 != 0 => dp[3] remains 3',
    action: 'Check i=3 (8) with prev=2 (7): 8 is not divisible by 7, skip.',
    explain: '8 % 7 != 0. dp[3] remains 3 with parent pointing to index 1 (num 4).',
    intuition: 'We keep the maximum valid chain found across all tested predecessors.',
    metrics: [
      { label: 'Max Subset Len', value: 3 },
      { label: 'Best End Idx', value: 3 },
      { label: 'Check 8 % 7', value: 'Failed' }
    ]
  },
  {
    phase: 'SCAN',
    tracks: [
      { label: 'nums', items: [1, 4, 7, 8, 16] },
      { label: 'dp[i]', items: [1, 2, 2, 3, 3] },
      { label: 'parent', items: [0, 0, 0, 1, 1] }
    ],
    activeI: 4,
    activePrev: 1,
    formula: '16 % 4 == 0 => dp[4] = 1 + dp[1] = 3, parent[4] = 1',
    action: 'Check i=4 (16) with prev=1 (4): 16 % 4 == 0, chain length reaches 3.',
    explain: '16 is divisible by 4, yielding chain [1, 4, 16] of length 3.',
    intuition: 'Multiple candidate branches may exist; we search for the absolute maximum.',
    metrics: [
      { label: 'Max Subset Len', value: 3 },
      { label: 'Best End Idx', value: 3 },
      { label: 'Current Candidate', value: '[1, 4, 16]' }
    ]
  },
  {
    phase: 'EXTEND',
    tracks: [
      { label: 'nums', items: [1, 4, 7, 8, 16] },
      { label: 'dp[i]', items: [1, 2, 2, 3, 4] },
      { label: 'parent', items: [0, 0, 0, 1, 3] }
    ],
    activeI: 4,
    activePrev: 3,
    formula: '16 % 8 == 0 (Valid) => 1 + dp[3] = 1 + 3 = 4 > dp[4] => dp[4] = 4, parent[4] = 3',
    action: 'Check i=4 (16) with prev=3 (8): 16 % 8 == 0, new global maximum length 4!',
    explain: '16 divides 8. Since 1 + dp[3] = 1 + 3 = 4 > 3, we update dp[4] = 4 and parent[4] = 3. The chain [1, 4, 8, 16] is formed.',
    intuition: 'By extending the longest existing divisible chain ending at 8, we reach length 4.',
    metrics: [
      { label: 'Max Subset Len', value: 4, highlight: true },
      { label: 'Best End Idx', value: 4, highlight: true },
      { label: 'Current Chain', value: '[1, 4, 8, 16]' }
    ],
    customCard: {
      title: 'Global Optimal Chain Found',
      rows: [
        { label: 'Condition', value: '16 % 8 == 0 (nums[4] % nums[3] == 0)', accent: true },
        { label: 'Parent Link', value: 'parent[4] = 3 (points to num 8)' }
      ]
    }
  },
  {
    phase: 'COMPLETED',
    tracks: [
      { label: 'nums', items: [1, 4, 7, 8, 16] },
      { label: 'dp[i]', items: [1, 2, 2, 3, 4] },
      { label: 'parent', items: [0, 0, 0, 1, 3] }
    ],
    activeI: null,
    activePrev: null,
    formula: 'Backtracking parent: 16 (idx 4) -> 8 (idx 3) -> 4 (idx 1) -> 1 (idx 0) => Result: [1, 4, 8, 16]',
    action: 'Backtrack from lastIndex=4 using parent pointers to reconstruct the subset.',
    explain: 'Starting at index 4 (16): parent[4] = 3 (8), parent[3] = 1 (4), parent[1] = 0 (1), parent[0] = 0 (stop). Reversing the path gives [1, 4, 8, 16]. Every pair satisfies divisibility.',
    intuition: 'Tracking parent pointers enables O(len) subset reconstruction without extra DP state.',
    metrics: [
      { label: 'Final Subset', value: '[1, 4, 8, 16]', highlight: true },
      { label: 'Subset Size', value: 4, highlight: true },
      { label: 'Time Complexity', value: 'O(N²)' }
    ],
    customCard: {
      title: 'Reconstruction Trace',
      rows: [
        { label: 'Pointer Path', value: 'idx 4 (16) -> idx 3 (8) -> idx 1 (4) -> idx 0 (1)', accent: true },
        { label: 'Verification', value: '1 | 4, 4 | 8, 8 | 16 — All pairs divisible!' }
      ]
    }
  }
];

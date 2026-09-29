// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  leetcode_id: 18,
  title: '4 Sum Problem (Quadruplets that Sum to Target)',
  category: 'Arrays & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N³)',
  spaceComplexity: 'O(1) Auxiliary Space',
  leetcodeUrl: 'https://leetcode.com/problems/4sum/',
  description: 'Finds all unique four-element tuples [nums[i], nums[j], nums[k], nums[l]] that sum to a given target without duplicate quadruplets using sorting with two outer nested loops and a two-pointer sweep.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: '4-Sum Two-Pointer Reduction Strategy',
  nodes: [
    { id: 'root', label: 'Dimension Reduction Invariant', children: ['sorting-prereq', 'outer-loops-ij', 'inner-sweep-kl', 'duplicate-pruning', 'complexity'] },
    { id: 'sorting-prereq', label: '1. Array Sorting O(N log N)', detail: 'Monotonically sorts the array, enabling directional two-pointer adjustments and duplicate skipping.' },
    { id: 'outer-loops-ij', label: '2. Fix Outer Pointers (i, j)', detail: 'Loop i from 0 to N-4 and j from i+1 to N-3, defining fixed two-element bases.' },
    { id: 'inner-sweep-kl', label: '3. Converging Two Pointers (k, l)', detail: 'Set k = j+1 and l = N-1. If sum < target: k++; if sum > target: l--; if sum == target: record.' },
    { id: 'duplicate-pruning', label: '4. Quadruple Duplicate Pruning', detail: 'Skip adjacent identical values on all 4 pointers (i, j, k, l) to eliminate duplicate quadruplets.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Reduces brute-force O(N^4) to O(N^3) time with strictly O(1) auxiliary extra memory.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal 4-Sum using Sorting + Two Pointers
// Time Complexity: O(N^3) | Space Complexity: O(1) auxiliary
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        int n = nums.size();
        vector<vector<int>> ans;
        sort(nums.begin(), nums.end());

        for (int i = 0; i < n; i++) {
            // Avoid duplicate quadruplets on i
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            for (int j = i + 1; j < n; j++) {
                // Avoid duplicate quadruplets on j
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;

                int k = j + 1;
                int l = n - 1;

                while (k < l) {
                    long long sum = (long long)nums[i] + nums[j] + nums[k] + nums[l];

                    if (sum == target) {
                        ans.push_back({nums[i], nums[j], nums[k], nums[l]});
                        k++;
                        l--;
                        while (k < l && nums[k] == nums[k - 1]) k++;
                        while (k < l && nums[l] == nums[l + 1]) l--;
                    } else if (sum < target) {
                        k++;
                    } else {
                        l--;
                    }
                }
            }
        }

        return ans;
    }
};`,
  python: `# Python 3 Optimal 4-Sum
# Time Complexity: O(N^3) | Space Complexity: O(1) auxiliary
class Solution:
    def fourSum(self, nums: list[int], target: int) -> list[list[int]]:
        nums.sort()
        n = len(nums)
        ans = []

        for i in range(n):
            if i > 0 and nums[i] == nums[i - 1]:
                continue

            for j in range(i + 1, n):
                if j > i + 1 and nums[j] == nums[j - 1]:
                    continue

                k = j + 1
                l = n - 1

                while k < l:
                    total = nums[i] + nums[j] + nums[k] + nums[l]

                    if total == target:
                        ans.append([nums[i], nums[j], nums[k], nums[l]])
                        k += 1
                        l -= 1
                        while k < l and nums[k] == nums[k - 1]:
                            k += 1
                        while k < l and nums[l] == nums[l + 1]:
                            l -= 1
                    elif total < target:
                        k += 1
                    else:
                        l -= 1

        return ans`,
  java: `// Java Optimal 4-Sum
// Time Complexity: O(N^3) | Space Complexity: O(1) auxiliary
import java.util.*;

class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        int n = nums.length;
        List<List<Integer>> ans = new ArrayList<>();
        Arrays.sort(nums);

        for (int i = 0; i < n; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            for (int j = i + 1; j < n; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;

                int k = j + 1;
                int l = n - 1;

                while (k < l) {
                    long sum = (long)nums[i] + nums[j] + nums[k] + nums[l];

                    if (sum == target) {
                        ans.add(Arrays.asList(nums[i], nums[j], nums[k], nums[l]));
                        k++;
                        l--;
                        while (k < l && nums[k] == nums[k - 1]) k++;
                        while (k < l && nums[l] == nums[l + 1]) l--;
                    } else if (sum < target) {
                        k++;
                    } else {
                        l--;
                    }
                }
            }
        }

        return ans;
    }
}`,
  javascript: `// JavaScript Optimal 4-Sum
// Time Complexity: O(N^3) | Space Complexity: O(1) auxiliary
var fourSum = function(nums, target) {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    const ans = [];

    for (let i = 0; i < n; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        for (let j = i + 1; j < n; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;

            let k = j + 1;
            let l = n - 1;

            while (k < l) {
                const sum = nums[i] + nums[j] + nums[k] + nums[l];

                if (sum === target) {
                    ans.push([nums[i], nums[j], nums[k], nums[l]]);
                    k++;
                    l--;
                    while (k < l && nums[k] === nums[k - 1]) k++;
                    while (k < l && nums[l] === nums[l + 1]) l--;
                } else if (sum < target) {
                    k++;
                } else {
                    l--;
                }
            }
        }
    }

    return ans;
};`
};

export const steps = [
  {
    title: '1. Sort Array & Initialize Outer Pointers: i = 0 (-2), j = 1 (-1)',
    phase: 'INITIALIZATION',
    codeLine: 11,
    track: {
      label: 'nums (sorted)',
      items: [
        { val: -2, status: 'current' },
        { val: -1, status: 'current' },
        { val: 0, status: 'default' },
        { val: 0, status: 'default' },
        { val: 1, status: 'default' },
        { val: 2, status: 'default' }
      ]
    },
    pointers: [
      { index: 0, label: 'i', color: 'accent' },
      { index: 1, label: 'j', color: 'amber' },
      { index: 2, label: 'k', color: 'indigo' },
      { index: 5, label: 'l', color: 'indigo' }
    ],
    activeIndices: [0, 1, 2, 5],
    metrics: [
      { label: 'Target', value: '0' },
      { label: 'Fixed Base (i, j)', value: '[-2, -1]' },
      { label: 'Current 4-Sum', value: '-1' },
      { label: 'Quadruplets Found', value: '0' }
    ],
    customCard: {
      title: 'Quadruplet Evaluation #1',
      rows: [
        { label: 'Active Indices', value: 'i=0, j=1, k=2, l=5' },
        { label: 'Values Sum', value: '-2 + -1 + 0 + 2 = -1' },
        { label: 'Comparison', value: '-1 < target (0) -> Need larger sum; k++' }
      ]
    },
    formula: 'sum = nums[0] + nums[1] + nums[2] + nums[5] = -1 < 0 -> k++',
    action: 'Sort array to [-2, -1, 0, 0, 1, 2]. Fix i=0 and j=1. Set k=2, l=5. Sum is -1 < 0.',
    explain: 'Sum -1 is strictly less than target 0. Because array is sorted, increment k to 3 to increase total sum.',
    intuition: 'Fixing the outer 2 indices reduces the remaining subproblem to classic two-pointer 2-Sum.'
  },
  {
    title: '2. Advance k to 3: [-2, -1, 1, 2] -> Sum = 0 (MATCH 1!)',
    phase: 'MATCH_FOUND',
    codeLine: 26,
    track: {
      label: 'nums (sorted)',
      items: [
        { val: -2, status: 'match' },
        { val: -1, status: 'match' },
        { val: 0, status: 'dimmed' },
        { val: 0, status: 'dimmed' },
        { val: 1, status: 'match' },
        { val: 2, status: 'match' }
      ]
    },
    pointers: [
      { index: 0, label: 'i', color: 'accent' },
      { index: 1, label: 'j', color: 'amber' },
      { index: 4, label: 'k', color: 'indigo' },
      { index: 5, label: 'l', color: 'indigo' }
    ],
    activeIndices: [0, 1, 4, 5],
    metrics: [
      { label: 'Target', value: '0' },
      { label: 'Sum', value: '0 (EXACT MATCH)' },
      { label: 'Quadruplet 1', value: '[-2, -1, 1, 2]' },
      { label: 'Total Quadruplets', value: '1' }
    ],
    customCard: {
      title: 'Target Matched!',
      rows: [
        { label: 'Sum Calculation', value: '-2 + -1 + 1 + 2 = 0' },
        { label: 'Quadruplet Recorded', value: '[-2, -1, 1, 2]' },
        { label: 'Pointer Advancement', value: 'k++, l-- with duplicate skipping' }
      ]
    },
    formula: 'sum == 0 == target; ans.push_back({-2, -1, 1, 2}); k++; l--;',
    action: 'Sum equals 0. Record first quadruplet [-2, -1, 1, 2]. Advance k and l.',
    explain: 'Quadruplet [-2, -1, 1, 2] successfully identified and stored.',
    intuition: 'Upon match, both inner pointers must advance to explore remaining possibilities.'
  },
  {
    title: '3. Advance j to 2: Fix i = 0 (-2), j = 2 (0) -> k = 3 (0), l = 5 (2)',
    phase: 'MATCH_FOUND',
    codeLine: 26,
    track: {
      label: 'nums (sorted)',
      items: [
        { val: -2, status: 'match' },
        { val: -1, status: 'dimmed' },
        { val: 0, status: 'match' },
        { val: 0, status: 'match' },
        { val: 1, status: 'dimmed' },
        { val: 2, status: 'match' }
      ]
    },
    pointers: [
      { index: 0, label: 'i', color: 'accent' },
      { index: 2, label: 'j', color: 'amber' },
      { index: 3, label: 'k', color: 'indigo' },
      { index: 5, label: 'l', color: 'indigo' }
    ],
    activeIndices: [0, 2, 3, 5],
    metrics: [
      { label: 'Target', value: '0' },
      { label: 'Sum', value: '0 (EXACT MATCH)' },
      { label: 'Quadruplet 2', value: '[-2, 0, 0, 2]' },
      { label: 'Total Quadruplets', value: '2' }
    ],
    customCard: {
      title: 'Target Matched!',
      rows: [
        { label: 'Values Sum', value: '-2 + 0 + 0 + 2 = 0' },
        { label: 'Quadruplet Recorded', value: '[-2, 0, 0, 2]' },
        { label: 'Pointers', value: 'k=3 and l=5 converge' }
      ]
    },
    formula: 'sum = -2 + 0 + 0 + 2 = 0; ans.push_back({-2, 0, 0, 2});',
    action: 'Advance j to index 2 (val 0). With k=3 (0) and l=5 (2), sum is 0! Second match.',
    explain: 'Second unique quadruplet [-2, 0, 0, 2] discovered.',
    intuition: 'Advancing outer pointer j opens fresh candidate pairs for k and l.'
  },
  {
    title: '4. Advance i to 1: Fix i = 1 (-1), j = 2 (0) -> k = 3 (0), l = 4 (1)',
    phase: 'MATCH_FOUND',
    codeLine: 26,
    track: {
      label: 'nums (sorted)',
      items: [
        { val: -2, status: 'dimmed' },
        { val: -1, status: 'match' },
        { val: 0, status: 'match' },
        { val: 0, status: 'match' },
        { val: 1, status: 'match' },
        { val: 2, status: 'dimmed' }
      ]
    },
    pointers: [
      { index: 1, label: 'i', color: 'accent' },
      { index: 2, label: 'j', color: 'amber' },
      { index: 3, label: 'k', color: 'indigo' },
      { index: 4, label: 'l', color: 'indigo' }
    ],
    activeIndices: [1, 2, 3, 4],
    metrics: [
      { label: 'Target', value: '0' },
      { label: 'Sum', value: '0 (EXACT MATCH)' },
      { label: 'Quadruplet 3', value: '[-1, 0, 0, 1]' },
      { label: 'Total Quadruplets', value: '3' }
    ],
    customCard: {
      title: 'Target Matched!',
      rows: [
        { label: 'Values Sum', value: '-1 + 0 + 0 + 1 = 0' },
        { label: 'Quadruplet Recorded', value: '[-1, 0, 0, 1]' },
        { label: 'Scan Status', value: 'Pointers cross; outer loop completes' }
      ]
    },
    formula: 'sum = -1 + 0 + 0 + 1 = 0; ans.push_back({-1, 0, 0, 1});',
    action: 'i advances to 1 (-1), j=2 (0), k=3 (0), l=4 (1). Sum is 0! Third match.',
    explain: 'Third unique quadruplet [-1, 0, 0, 1] added to results vector.',
    intuition: 'All combinations evaluated without any duplicate tuples generated.'
  },
  {
    title: '5. Search Complete: 3 Unique Quadruplets Found',
    phase: 'COMPLETED',
    codeLine: 38,
    track: {
      label: 'nums (evaluated)',
      items: [
        { val: -2, status: 'match' },
        { val: -1, status: 'match' },
        { val: 0, status: 'match' },
        { val: 0, status: 'match' },
        { val: 1, status: 'match' },
        { val: 2, status: 'match' }
      ]
    },
    pointers: [
      { index: 0, label: 'done', color: 'accent' },
      { index: 5, label: 'done', color: 'accent' }
    ],
    activeIndices: [0, 1, 2, 3, 4, 5],
    metrics: [
      { label: 'Total Quadruplets', value: '3' },
      { label: 'Quadruplet 1', value: '[-2, -1, 1, 2]' },
      { label: 'Quadruplet 2', value: '[-2, 0, 0, 2]' },
      { label: 'Quadruplet 3', value: '[-1, 0, 0, 1]' }
    ],
    customCard: {
      title: 'Complexity & Final Output',
      rows: [
        { label: 'All Unique Quadruplets', value: '[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]' },
        { label: 'Time Complexity', value: 'O(N^3) [2 nested loops + 1 two-pointer sweep]' },
        { label: 'Auxiliary Space', value: 'O(1) extra space excluding output list' }
      ]
    },
    formula: 'return ans; // 3 unique quadruplets',
    action: 'All pointers terminated. Return vector containing 3 unique quadruplets.',
    explain: '4-Sum reduced to O(N^3) time and O(1) auxiliary space without duplicate entries.',
    intuition: 'Sorting combined with two-pointer dimension reduction generalizes to k-Sum in O(N^(k-1)) time.'
  }
];

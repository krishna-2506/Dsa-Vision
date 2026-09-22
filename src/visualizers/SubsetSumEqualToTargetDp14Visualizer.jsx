// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Subset Sum Equal to Target (DP-14)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N × Target) Time',
  spaceComplexity: 'O(Target) Space-Optimized',
  description: 'Determines whether any subset of numbers exists whose sum equals the given target K. At each element, we evaluate whether taking or not taking it can achieve target sum: dp[i][t] = dp[i-1][t] || dp[i-1][t - arr[i-1]].'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Subset Sum Equal to Target (DP-14)',
  nodes: [
    { id: 'root', label: 'Subset Sum Feasibility', children: ['base-state', 'recurrence-boolean', 'space-compression'] },
    { id: 'base-state', label: '1. Boundary Initialization', detail: 'dp[0][0] = True (empty set produces sum 0) | dp[0][t] = False for t > 0' },
    { id: 'recurrence-boolean', label: '2. Boolean OR Transition', children: ['exclude-elem', 'include-elem'] },
    { id: 'exclude-elem', label: 'Exclude Element', detail: 'dp[i-1][t] (Target t already formed by earlier elements)' },
    { id: 'include-elem', label: 'Include Element', detail: 'dp[i-1][t - arr[i-1]] (Target t formed by adding arr[i-1])' },
    { id: 'space-compression', label: '3. 1D Reverse Traversal', detail: 'dp[t] = dp[t] || dp[t - num] traversing right-to-left preserves previous row state in O(Target) space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Subset Sum Equal to Target
// Time: O(N * Target) | Space: O(Target)
#include <vector>
using namespace std;

class Solution {
public:
    bool subsetSumToK(int n, int k, vector<int>& arr) {
        vector<bool> prev(k + 1, false);
        prev[0] = true;

        if (arr[0] <= k) prev[arr[0]] = true;

        for (int i = 1; i < n; i++) {
            vector<bool> cur(k + 1, false);
            cur[0] = true;
            for (int target = 1; target <= k; target++) {
                bool notTaken = prev[target];
                bool taken = false;
                if (arr[i] <= target) {
                    taken = prev[target - arr[i]];
                }
                cur[target] = notTaken || taken;
            }
            prev = cur;
        }

        return prev[k];
    }
};`,
  python: `# Python 3 Subset Sum Equal to Target
# Time: O(N * Target) | Space: O(Target)
class Solution:
    def subsetSumToK(self, n: int, k: int, arr: list[int]) -> bool:
        prev = [False] * (k + 1)
        prev[0] = True

        if arr[0] <= k:
            prev[arr[0]] = True

        for i in range(1, n):
            cur = [False] * (k + 1)
            cur[0] = True
            for target in range(1, k + 1):
                not_taken = prev[target]
                taken = prev[target - arr[i]] if arr[i] <= target else False
                cur[target] = not_taken or taken
            prev = cur

        return prev[k]`,
  java: `// Java Subset Sum Equal to Target
// Time: O(N * Target) | Space: O(Target)
class Solution {
    public boolean subsetSumToK(int n, int k, int[] arr) {
        boolean[] prev = new boolean[k + 1];
        prev[0] = true;

        if (arr[0] <= k) prev[arr[0]] = true;

        for (int i = 1; i < n; i++) {
            boolean[] cur = new boolean[k + 1];
            cur[0] = true;
            for (int target = 1; target <= k; target++) {
                boolean notTaken = prev[target];
                boolean taken = false;
                if (arr[i] <= target) {
                    taken = prev[target - arr[i]];
                }
                cur[target] = notTaken || taken;
            }
            prev = cur;
        }

        return prev[k];
    }
}`,
  javascript: `// JavaScript Subset Sum Equal to Target
// Time: O(N * Target) | Space: O(Target)
var subsetSumToK = function(n, k, arr) {
    let prev = new Array(k + 1).fill(false);
    prev[0] = true;

    if (arr[0] <= k) prev[arr[0]] = true;

    for (let i = 1; i < n; i++) {
        const cur = new Array(k + 1).fill(false);
        cur[0] = true;
        for (let target = 1; target <= k; target++) {
            const notTaken = prev[target];
            const taken = arr[i] <= target ? prev[target - arr[i]] : false;
            cur[target] = notTaken || taken;
        }
        prev = cur;
    }

    return prev[k];
};`
};

export const steps = [
  {
    phase: 'SETUP',
    grid: [
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 3', 'Num 4'],
    colLabels: ['0', '1', '2', '3', '4'],
    activeCell: { r: 0, c: 0 },
    formula: 'dp[i][0] = True (Empty subset achieves sum 0)',
    action: 'Initialize DP matrix for arr = [1, 2, 3, 4] with target sum K = 4.',
    explain: 'dp[i][t] is a boolean flag indicating whether a subset of the first i elements can sum up to exactly t. Sum 0 is always achievable (empty set).',
    intuition: 'Each row records newly achievable sums by introducing one more element.',
    metrics: [
      { label: 'Array', value: '[1, 2, 3, 4]' },
      { label: 'Target K', value: 4 },
      { label: 'Is Achievable', value: 'Testing...' }
    ]
  },
  {
    phase: 'ROW_1_NUM_1',
    grid: [
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 3', 'Num 4'],
    colLabels: ['0', '1', '2', '3', '4'],
    activeCell: { r: 1, c: 1 },
    dependencyCells: [{ r: 0, c: 0, label: 'incl=T' }],
    formula: 't = 1: dp[1][1] = dp[0][0] = True ({1})',
    action: 'Process num = 1: sums 0 and 1 are achievable.',
    explain: 'With element 1 alone, we can form sum 0 (empty set) and sum 1 ({1}). All other targets remain False.',
    intuition: 'Single element base row.',
    metrics: [
      { label: 'Active Num', value: 1 },
      { label: 'Reachable', value: '{0, 1}' }
    ]
  },
  {
    phase: 'ROW_2_NUM_2',
    grid: [
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 1, 1, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 3', 'Num 4'],
    colLabels: ['0', '1', '2', '3', '4'],
    activeCell: { r: 2, c: 3 },
    dependencyCells: [{ r: 1, c: 3, label: 'excl=F' }, { r: 1, c: 1, label: 'incl=T' }],
    formula: 't = 3: dp[1][3] || dp[1][1] = False || True = True ({1, 2})',
    action: 'Process num = 2: reachable sums expand to {0, 1, 2, 3}.',
    explain: 'Adding 2 enables forming sum 2 (0 + 2 = {2}) and sum 3 (1 + 2 = {1, 2}). Target 4 is not yet reachable.',
    intuition: 'New reachable sums = previous sums + current element value.',
    metrics: [
      { label: 'Active Num', value: 2 },
      { label: 'Reachable', value: '{0, 1, 2, 3}', highlight: true }
    ]
  },
  {
    phase: 'ROW_3_NUM_3_TARGET_HIT',
    grid: [
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 3', 'Num 4'],
    colLabels: ['0', '1', '2', '3', '4'],
    activeCell: { r: 3, c: 4 },
    dependencyCells: [{ r: 2, c: 4, label: 'excl=F' }, { r: 2, c: 1, label: 'incl=T (1+3=4)' }],
    formula: 't = 4: dp[2][4] || dp[2][1] = False || True = True ({1, 3})',
    action: 'Process num = 3: Target K = 4 is achieved for the first time ({1, 3})!',
    explain: 'At target 4: excluding 3 was False. Including 3 looks at dp[2][4 - 3] = dp[2][1], which is True ({1}). Adding 3 gives 1 + 3 = 4! Cell [3, 4] turns True.',
    intuition: 'Target sum 4 is confirmed possible.',
    metrics: [
      { label: 'Active Num', value: 3 },
      { label: 'Target K=4', value: 'TRUE', highlight: true },
      { label: 'Formed By', value: '{1, 3}' }
    ]
  },
  {
    phase: 'ROW_4_NUM_4_TERMINAL',
    grid: [
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 3', 'Num 4'],
    colLabels: ['0', '1', '2', '3', '4'],
    activeCell: { r: 4, c: 4 },
    dependencyCells: [{ r: 3, c: 4, label: 'excl=T' }, { r: 3, c: 0, label: 'incl=T (4)' }],
    formula: 't = 4: dp[3][4] || dp[3][0] = True || True = True ({1, 3} or {4})',
    action: 'Process num = 4: standalone {4} also forms target 4. Terminal cell = True!',
    explain: 'Target 4 can now be formed in two independent ways: {1, 3} (from row 3) or {4} (num 4 alone). Terminal cell [4, 4] confirms True.',
    intuition: 'Multiple subsets satisfy target sum 4.',
    metrics: [
      { label: 'Terminal Cell', value: '[4, 4]' },
      { label: 'Result', value: 'TRUE', highlight: true }
    ]
  },
  {
    phase: 'TRACEBACK_SUBSETS',
    grid: [
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 3', 'Num 4'],
    colLabels: ['0', '1', '2', '3', '4'],
    activeCell: { r: 4, c: 4 },
    formula: 'Subset 1: {1, 3} (1 + 3 = 4) | Subset 2: {4} (4 = 4)',
    action: 'Traceback valid subsets summing to 4.',
    explain: '1. Path 1: num 4 alone ➔ sum = 4\n2. Path 2: num 3 + num 1 ➔ 1 + 3 = 4\nBoth subsets confirm that target 4 is achievable.',
    intuition: 'Concrete proof of existence.',
    metrics: [
      { label: 'Subset 1', value: '{1, 3}' },
      { label: 'Subset 2', value: '{4}' }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1]
    ],
    rowLabels: ['None', 'Num 1', 'Num 2', 'Num 3', 'Num 4'],
    colLabels: ['0', '1', '2', '3', '4'],
    activeCell: { r: 4, c: 4 },
    formula: 'Output: true | O(N × Target) Time, O(Target) Space',
    action: 'Algorithm complete! Subset sum equal to target exists.',
    explain: 'Using 1D boolean array dp[t] = dp[t] || dp[t - num] with reverse traversal, the algorithm runs in O(N × Target) time and O(Target) space.',
    intuition: 'Classic 0/1 knapsack feasibility solution.',
    metrics: [
      { label: 'Array', value: '[1, 2, 3, 4]' },
      { label: 'Target', value: 4 },
      { label: 'Exists', value: 'true', highlight: true }
    ]
  }
];

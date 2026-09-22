// DATA-ONLY — rendered by DpGridRenderer via rendererType

export const meta = {
  title: 'Triangle (Minimum Path Sum DP-11)',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N²) Time',
  spaceComplexity: 'O(N) Space-Optimized',
  description: 'Calculates the minimum path sum from the apex of a triangular array to its base. Moving from (i, j), valid steps are to (i + 1, j) or (i + 1, j + 1). Bottom-up DP collapses rows upward to the apex: dp[j] = triangle[i][j] + min(dp[j], dp[j+1]).'
};

export const rendererType = 'dp-grid';

export const ideaMap = {
  title: 'Triangle Minimum Path Sum',
  nodes: [
    { id: 'root', label: 'Triangle Path Minimizer', children: ['direction-insight', 'bottom-up-collapse', 'space-compression'] },
    { id: 'direction-insight', label: '1. Bottom-Up Inversion', detail: 'Top-down requires scanning all base cells for minimum. Bottom-up collapses all paths to a single apex cell at dp[0].' },
    { id: 'bottom-up-collapse', label: '2. Upward Transition', detail: 'dp[j] = triangle[i][j] + min(dp[j], dp[j+1]) where dp[j] and dp[j+1] are children in the row below.' },
    { id: 'space-compression', label: '3. In-Place 1D Rolling Buffer', detail: 'A single 1D array of size N initialized to the bottom row updates in-place from row N-2 to 0.' }
  ]
};

export const solutions = {
  cpp: `// C++ Triangle (Bottom-Up DP)
// Time: O(N^2) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<int> dp = triangle[n - 1];

        // Bottom-up: collapse rows upwards to apex
        for (int i = n - 2; i >= 0; i--) {
            for (int j = 0; j <= i; j++) {
                dp[j] = triangle[i][j] + min(dp[j], dp[j + 1]);
            }
        }

        return dp[0];
    }
};`,
  python: `# Python 3 Triangle (Bottom-Up DP)
# Time: O(N^2) | Space: O(N)
class Solution:
    def minimumTotal(self, triangle: list[list[int]]) -> int:
        n = len(triangle)
        dp = list(triangle[-1])

        for i in range(n - 2, -1, -1):
            for j in range(i + 1):
                dp[j] = triangle[i][j] + min(dp[j], dp[j + 1])

        return dp[0]`,
  java: `// Java Triangle (Bottom-Up DP)
// Time: O(N^2) | Space: O(N)
import java.util.List;

class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        int n = triangle.size();
        int[] dp = new int[n];
        for (int j = 0; j < n; j++) {
            dp[j] = triangle.get(n - 1).get(j);
        }

        for (int i = n - 2; i >= 0; i--) {
            for (int j = 0; j <= i; j++) {
                dp[j] = triangle.get(i).get(j) + Math.min(dp[j], dp[j + 1]);
            }
        }

        return dp[0];
    }
}`,
  javascript: `// JavaScript Triangle (Bottom-Up DP)
// Time: O(N^2) | Space: O(N)
var minimumTotal = function(triangle) {
    const n = triangle.length;
    const dp = [...triangle[n - 1]];

    for (let i = n - 2; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
        }
    }

    return dp[0];
};`
};

export const steps = [
  {
    phase: 'SETUP',
    grid: [
      [2, null, null, null],
      [3, 4, null, null],
      [6, 5, 7, null],
      [4, 1, 8, 3]
    ],
    rowLabels: ['Row 0 (Apex)', 'Row 1', 'Row 2', 'Row 3 (Base)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCell: { r: 0, c: 0 },
    formula: 'Triangle input: [2], [3, 4], [6, 5, 7], [4, 1, 8, 3]',
    action: 'Initialize triangular matrix. Adopt bottom-up DP to collapse towards apex.',
    explain: 'Starting from the apex requires exploring all base destinations. Instead, starting from the base leaves and collapsing upwards converges cleanly to a single apex result at dp[0].',
    intuition: 'Bottom-up DP turns diverging paths into converging subproblems.',
    metrics: [
      { label: 'Triangle Depth', value: 4 },
      { label: 'Apex Value', value: 2 },
      { label: 'Approach', value: 'Bottom-Up' }
    ]
  },
  {
    phase: 'ROW_3_BASE_INIT',
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [4, 1, 8, 3]
    ],
    rowLabels: ['Row 0 (Apex)', 'Row 1', 'Row 2', 'Row 3 (Base)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCell: { r: 3, c: 1 },
    formula: 'dp = triangle[3] = [4, 1, 8, 3]',
    action: 'Initialize DP array with base row values [4, 1, 8, 3].',
    explain: 'For any node on the bottom row, the minimum path sum to the bottom is simply its own value. dp is initialized to [4, 1, 8, 3].',
    intuition: 'Base row provides the starting values for upward reduction.',
    metrics: [
      { label: 'Base Row', value: '[4, 1, 8, 3]' },
      { label: 'Smallest Base', value: 1 }
    ]
  },
  {
    phase: 'ROW_2_COL_0',
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [7, null, null, null],
      [4, 1, 8, 3]
    ],
    rowLabels: ['Row 0 (Apex)', 'Row 1', 'Row 2', 'Row 3 (Base)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCell: { r: 2, c: 0 },
    dependencyCells: [{ r: 3, c: 0, label: 'child1=4' }, { r: 3, c: 1, label: 'child2=1' }],
    formula: 'dp[0] = triangle[2][0] + min(4, 1) = 6 + 1 = 7',
    action: 'Collapse row 2, col 0: val 6 + min(4, 1) = 7.',
    explain: 'From node (2, 0) (value 6), the two children below are (3, 0) with value 4 and (3, 1) with value 1. The minimum choice is 1. Total path sum = 6 + 1 = 7.',
    intuition: 'Greedy choice between the two direct children.',
    metrics: [
      { label: 'Node (2, 0)', value: 6 },
      { label: 'Chosen Child', value: 1 },
      { label: 'dp[0]', value: 7, highlight: true }
    ]
  },
  {
    phase: 'ROW_2_COMPLETE',
    grid: [
      [null, null, null, null],
      [null, null, null, null],
      [7, 6, 10, null],
      [4, 1, 8, 3]
    ],
    rowLabels: ['Row 0 (Apex)', 'Row 1', 'Row 2', 'Row 3 (Base)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCell: { r: 2, c: 1 },
    dependencyCells: [{ r: 3, c: 1, label: 'c1=1' }, { r: 3, c: 2, label: 'c2=8' }],
    formula: 'dp[1] = 5 + min(1, 8) = 6 | dp[2] = 7 + min(8, 3) = 10',
    action: 'Complete row 2: DP array becomes [7, 6, 10].',
    explain: '- For (2, 1) (val 5): 5 + min(1, 8) = 6.\n- For (2, 2) (val 7): 7 + min(8, 3) = 10.\nRow 2 is now completely resolved with minimum paths [7, 6, 10].',
    intuition: 'Row 2 collapsed. Best subproblem is 6 at column 1.',
    metrics: [
      { label: 'Row 2 DP', value: '[7, 6, 10]' },
      { label: 'Best in Row 2', value: 6, highlight: true }
    ]
  },
  {
    phase: 'ROW_1_COL_0',
    grid: [
      [null, null, null, null],
      [9, null, null, null],
      [7, 6, 10, null],
      [4, 1, 8, 3]
    ],
    rowLabels: ['Row 0 (Apex)', 'Row 1', 'Row 2', 'Row 3 (Base)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCell: { r: 1, c: 0 },
    dependencyCells: [{ r: 2, c: 0, label: 'dp[0]=7' }, { r: 2, c: 1, label: 'dp[1]=6' }],
    formula: 'dp[0] = triangle[1][0] + min(7, 6) = 3 + 6 = 9',
    action: 'Collapse row 1, col 0: val 3 + min(7, 6) = 9.',
    explain: 'Node (1, 0) has value 3. Its two downward paths offer sums 7 and 6. Choosing 6 yields 3 + 6 = 9.',
    intuition: 'Stepping toward the minimal subpath.',
    metrics: [
      { label: 'Node (1, 0)', value: 3 },
      { label: 'dp[0]', value: 9 }
    ]
  },
  {
    phase: 'ROW_1_COMPLETE',
    grid: [
      [null, null, null, null],
      [9, 10, null, null],
      [7, 6, 10, null],
      [4, 1, 8, 3]
    ],
    rowLabels: ['Row 0 (Apex)', 'Row 1', 'Row 2', 'Row 3 (Base)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCell: { r: 1, c: 1 },
    dependencyCells: [{ r: 2, c: 1, label: 'dp[1]=6' }, { r: 2, c: 2, label: 'dp[2]=10' }],
    formula: 'dp[1] = triangle[1][1] + min(6, 10) = 4 + 6 = 10',
    action: 'Collapse row 1, col 1: val 4 + min(6, 10) = 10. Row 1 DP = [9, 10].',
    explain: 'Node (1, 1) has value 4. Its children offer path sums 6 and 10. Minimum choice is 6, giving 4 + 6 = 10.',
    intuition: 'Only 2 candidates remain for the apex.',
    metrics: [
      { label: 'Node (1, 1)', value: 4 },
      { label: 'Row 1 DP', value: '[9, 10]' }
    ]
  },
  {
    phase: 'ROW_0_APEX_PEAK',
    grid: [
      [11, null, null, null],
      [9, 10, null, null],
      [7, 6, 10, null],
      [4, 1, 8, 3]
    ],
    rowLabels: ['Row 0 (Apex)', 'Row 1', 'Row 2', 'Row 3 (Base)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCell: { r: 0, c: 0 },
    dependencyCells: [{ r: 1, c: 0, label: 'dp[0]=9' }, { r: 1, c: 1, label: 'dp[1]=10' }],
    formula: 'dp[0] = triangle[0][0] + min(9, 10) = 2 + 9 = 11',
    action: 'Collapse to apex [0, 0]: val 2 + min(9, 10) = 11! Minimum Path Sum = 11.',
    explain: 'At apex (0, 0) (value 2), left branch costs 9 and right branch costs 10. Taking the left branch gives 2 + 9 = 11!',
    intuition: 'Final apex cell holds the global minimum path sum.',
    metrics: [
      { label: 'Apex Node', value: 2 },
      { label: 'Min Total', value: 11, highlight: true }
    ]
  },
  {
    phase: 'PATH_RECONSTRUCTION',
    grid: [
      [11, null, null, null],
      [9, 10, null, null],
      [7, 6, 10, null],
      [4, 1, 8, 3]
    ],
    rowLabels: ['Row 0 (Apex)', 'Row 1', 'Row 2', 'Row 3 (Base)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCell: { r: 0, c: 0 },
    formula: 'Path: 2 -> 3 -> 5 -> 1 = 11',
    action: 'Trace optimal path from apex to base.',
    explain: 'Optimal path sequence:\n- Step 0: Apex (0, 0) = 2\n- Step 1: Left child (1, 0) = 3\n- Step 2: Right child (2, 1) = 5\n- Step 3: Left child (3, 1) = 1\nSum: 2 + 3 + 5 + 1 = 11.',
    intuition: 'Guaranteed minimal path throughout the entire triangle.',
    metrics: [
      { label: 'Path Sequence', value: '2 -> 3 -> 5 -> 1' },
      { label: 'Total Sum', value: 11 }
    ]
  },
  {
    phase: 'COMPLETED',
    grid: [
      [11, null, null, null],
      [9, 10, null, null],
      [7, 6, 10, null],
      [4, 1, 8, 3]
    ],
    rowLabels: ['Row 0 (Apex)', 'Row 1', 'Row 2', 'Row 3 (Base)'],
    colLabels: ['Col 0', 'Col 1', 'Col 2', 'Col 3'],
    activeCell: { r: 0, c: 0 },
    formula: 'Output: 11 | O(N²) Time, O(N) Space',
    action: 'Algorithm complete! Minimum path sum is 11.',
    explain: 'Bottom-up dynamic programming solves the triangle problem in O(N²) time using a single 1D array of size N (O(N) memory).',
    intuition: 'Inverting traversal direction simplifies multidirectional optimization.',
    metrics: [
      { label: 'Min Total', value: 11, highlight: true },
      { label: 'Time Complexity', value: 'O(N²)' },
      { label: 'Space Complexity', value: 'O(N)' }
    ]
  }
];

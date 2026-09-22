import React from 'react';
import { VisualizerLayout, ArrayTrack, PartitionSplitBar } from '../components/primitives';

export const meta = {
  title: 'Matrix Chain Multiplication (Memoization)',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N^3)',
  spaceComplexity: 'O(N^2)',
  description: 'Determines the most optimal parenthesization of a chain of matrices to minimize the total scalar multiplications using Partition DP with memoization.'
};

export const ideaMap = {
  problemArchetype: 'Interval / Partition DP (Top-Down Memoization)',
  trigger: 'Minimizing total operation cost across a chain of elements where grouping/associativity impacts intermediate sizes.',
  coreInsight: 'Any valid parenthesization of a chain M[i..j] has a final multiplication between two subchains: (M[i..k]) * (M[k+1..j]). By trying every partition point k from i to j-1, the subproblems [i..k] and [k+1..j] are strictly smaller intervals. Memoizing dp[i][j] collapses exponential Catalan branching into O(N^2) states, each evaluated in O(N) loop time.',
  naiveApproach: {
    title: 'Exhaustive Recursive Search',
    time: 'O(4^N / N^(3/2)) Catalan Growth',
    space: 'O(N) recursion stack',
    bottleneck: 'Identical subchains like M[2..4] are solved dozens of times across different branches of the recursion tree.'
  },
  optimalApproach: {
    title: 'Top-Down DP with 2D Memoization',
    time: 'O(N^3)',
    space: 'O(N^2) memo table + O(N) call stack',
    breakthrough: 'Cache solve(i, j) in dp[i][j]. Any repeated call returns immediately in O(1).'
  },
  flowNodes: [
    { id: '1', title: 'Define Subproblem', subtitle: 'solve(i, j)', description: 'Returns minimum scalar multiplications to multiply matrices from index i to j.', tag: 'State' },
    { id: '2', title: 'Base Case', subtitle: 'i == j -> 0', description: 'Single matrix requires 0 scalar multiplications.', tag: 'Base Case' },
    { id: '3', title: 'Memoization Check', subtitle: 'dp[i][j] != -1', description: 'If already calculated, return cached result immediately in O(1).', tag: 'Cache' },
    { id: '4', title: 'Partition Loop', subtitle: 'k from i to j-1', description: 'cost = solve(i, k) + solve(k+1, j) + arr[i-1]*arr[k]*arr[j]. Track running minimum.', tag: 'Transition' },
    { id: '5', title: 'Memoize & Return', subtitle: 'dp[i][j] = mini', description: 'Save minimal cost into dp table and return to caller.', tag: 'Result' }
  ],
  pitfalls: [
    'Split boundary: k stops at j-1 (not j), because right child interval is [k+1, j].',
    'Dimension indexing: Matrix i has dimensions arr[i-1] x arr[i]. Be careful with off-by-one errors.',
    'Memo table initialization: Fill with -1 (since 0 is a valid cost for single matrices).'
  ],
  interviewCheatSheet: 'solve(i, j) = min_{i<=k<j} (solve(i, k) + solve(k+1, j) + arr[i-1]*arr[k]*arr[j]). Base case: i == j -> 0.'
};

export const solutions = {
  cpp: `// C++ Matrix Chain Multiplication (Top-Down Memoization)
// Time: O(N^3) | Space: O(N^2)
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

class Solution {
    int solve(int i, int j, vector<int>& arr, vector<vector<int>>& dp) {
        // Base case: single matrix requires 0 operations
        if (i == j) return 0;

        // Return memoized result if already computed
        if (dp[i][j] != -1) return dp[i][j];

        int mini = INT_MAX;
        for (int k = i; k < j; k++) {
            int steps = solve(i, k, arr, dp)
                      + solve(k + 1, j, arr, dp)
                      + arr[i - 1] * arr[k] * arr[j];
            mini = min(mini, steps);
        }

        return dp[i][j] = mini;
    }
public:
    int matrixMultiplication(vector<int>& arr) {
        int n = arr.size();
        vector<vector<int>> dp(n, vector<int>(n, -1));
        return solve(1, n - 1, arr, dp);
    }
};`,
  python: `# Python 3 Matrix Chain Multiplication (Memoization)
# Time: O(N^3) | Space: O(N^2)
class Solution:
    def matrixMultiplication(self, arr: list[int]) -> int:
        n = len(arr)
        dp = [[-1] * n for _ in range(n)]

        def solve(i: int, j: int) -> int:
            if i == j:
                return 0
            if dp[i][j] != -1:
                return dp[i][j]

            mini = float('inf')
            for k in range(i, j):
                steps = solve(i, k) + solve(k + 1, j) + arr[i - 1] * arr[k] * arr[j]
                mini = min(mini, steps)

            dp[i][j] = mini
            return mini

        return solve(1, n - 1)`,
  java: `// Java Matrix Chain Multiplication (Top-Down Memoization)
// Time: O(N^3) | Space: O(N^2)
import java.util.Arrays;

class Solution {
    private int solve(int i, int j, int[] arr, int[][] dp) {
        if (i == j) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        int mini = Integer.MAX_VALUE;
        for (int k = i; k < j; k++) {
            int steps = solve(i, k, arr, dp)
                      + solve(k + 1, j, arr, dp)
                      + arr[i - 1] * arr[k] * arr[j];
            mini = Math.min(mini, steps);
        }

        return dp[i][j] = mini;
    }

    public int matrixMultiplication(int[] arr) {
        int n = arr.length;
        int[][] dp = new int[n][n];
        for (int[] row : dp) Arrays.fill(row, -1);
        return solve(1, n - 1, arr, dp);
    }
}`,
  javascript: `// JavaScript Matrix Chain Multiplication (Top-Down Memoization)
// Time: O(N^3) | Space: O(N^2)
var matrixMultiplication = function(arr) {
    const n = arr.length;
    const dp = Array.from({ length: n }, () => new Array(n).fill(-1));

    function solve(i, j) {
        if (i === j) return 0;
        if (dp[i][j] !== -1) return dp[i][j];

        let mini = Infinity;
        for (let k = i; k < j; k++) {
            const steps = solve(i, k) + solve(k + 1, j) + arr[i - 1] * arr[k] * arr[j];
            mini = Math.min(mini, steps);
        }

        return (dp[i][j] = mini);
    }

    return solve(1, n - 1);
};`
};

export const steps = [
  {
    phase: 'SETUP',
    i: 1,
    j: 4,
    k: null,
    arr: [10, 20, 30, 40, 50],
    memoState: { 'dp[1][1]': 0, 'dp[2][2]': 0, 'dp[3][3]': 0, 'dp[4][4]': 0 },
    splitData: null,
    formula: 'solve(1, 4) initiated for 4 matrices: M1(10x20), M2(20x30), M3(30x40), M4(40x50)',
    action: 'Initialize top-down recursive call solve(1, 4) and 5x5 memoization table with -1.',
    explain: 'We want to find the minimal scalar multiplications to multiply matrices 1 through 4. Dimensions are given by arr = [10, 20, 30, 40, 50].',
    intuition: 'Top-down DP works backwards from the complete problem [1..4], branching into subproblems and memoizing overlapping results.'
  },
  {
    phase: 'BASE_CASE',
    i: 1,
    j: 1,
    k: null,
    arr: [10, 20, 30, 40, 50],
    memoState: { 'dp[1][1]': 0, 'dp[2][2]': 0, 'dp[3][3]': 0, 'dp[4][4]': 0 },
    splitData: null,
    formula: 'if (i == j) return 0;',
    action: 'Base case evaluation: solve(1, 1) returns 0 operations.',
    explain: 'When i == j, the interval represents a single matrix (M1). Multiplying 0 additional matrices requires 0 scalar operations.',
    intuition: 'Base cases stop recursion from subdividing single matrices.'
  },
  {
    phase: 'PARTITION_SPLIT',
    i: 1,
    j: 4,
    k: 1,
    arr: [10, 20, 30, 40, 50],
    memoState: { 'dp[1][1]': 0, 'dp[2][4]': 'calculating...' },
    splitData: { k: 1, leftVal: 0, splitCostVal: '10x20x50 = 10000', rightVal: 'solve(2, 4)', total: 'waiting', bestSoFar: null, isOptimal: false },
    formula: 'k=1: solve(1, 1) + solve(2, 4) + arr[0]*arr[1]*arr[4]',
    action: 'First split point k=1: Isolates M1 on left; recurses into solve(2, 4) on right.',
    explain: 'Evaluating (M1) * (M2 M3 M4). Left subproblem solve(1, 1) = 0. We must now evaluate solve(2, 4).',
    intuition: 'The parent call solve(1, 4) pauses on the call stack while solve(2, 4) is computed.'
  },
  {
    phase: 'RECURSIVE_DIVE',
    i: 2,
    j: 4,
    k: 2,
    arr: [10, 20, 30, 40, 50],
    memoState: { 'dp[2][2]': 0, 'dp[3][4]': '60000' },
    splitData: { k: 2, leftVal: 0, splitCostVal: '20x30x50 = 30000', rightVal: 60000, total: 90000, bestSoFar: 90000, isOptimal: true },
    formula: 'solve(2, 4) with k=2: solve(2, 2) + solve(3, 4) + 20*30*50 = 0 + 60000 + 30000 = 90000',
    action: 'Inside solve(2, 4): Split k=2 yields 90,000 operations.',
    explain: 'Subproblem [2..4]: Testing k=2 groups M2 with (M3 M4). solve(3, 4) = 30*40*50 = 60000. Total = 0 + 60000 + 30000 = 90,000.',
    intuition: 'Subproblem solve(2, 4) will now test k=3 to see if a better grouping exists.'
  },
  {
    phase: 'MEMOIZE_SUBPROBLEM',
    i: 2,
    j: 4,
    k: 3,
    arr: [10, 20, 30, 40, 50],
    memoState: { 'dp[2][3]': 24000, 'dp[3][4]': 60000, 'dp[2][4]': 64000 },
    splitData: { k: 3, leftVal: 24000, splitCostVal: '20x40x50 = 40000', rightVal: 0, total: 64000, bestSoFar: 64000, isOptimal: true },
    formula: 'solve(2, 4) with k=3: solve(2, 3) + solve(4, 4) + 20*40*50 = 24000 + 0 + 40000 = 64000 ops',
    action: 'Split k=3 beats k=2 (64,000 < 90,000). Memoize dp[2][4] = 64000!',
    explain: 'Testing k=3 groups (M2 M3) with M4. solve(2, 3) = 20*30*40 = 24000. Total = 24000 + 0 + 40000 = 64,000 ops. We memoize dp[2][4] = 64000 and return.',
    intuition: 'Caching dp[2][4] ensures that any future branch needing (M2 M3 M4) will take O(1).'
  },
  {
    phase: 'RETURN_TO_ROOT',
    i: 1,
    j: 4,
    k: 1,
    arr: [10, 20, 30, 40, 50],
    memoState: { 'dp[2][4]': 64000 },
    splitData: { k: 1, leftVal: 0, splitCostVal: '10x20x50 = 10000', rightVal: 64000, total: 74000, bestSoFar: 74000, isOptimal: true },
    formula: 'k=1 result: solve(1, 1) + dp[2][4] + 10*20*50 = 0 + 64000 + 10000 = 74000',
    action: 'Resume solve(1, 4) at k=1: Candidate total = 74,000 operations.',
    explain: 'With solve(2, 4) solved (64000), total for split k=1 is 0 + 64000 + 10*20*50 = 74,000 ops. Best so far = 74,000.',
    intuition: 'Candidate 1: (M1) * ((M2 M3) M4) costs 74,000 ops.'
  },
  {
    phase: 'CACHE_HIT_DEMO',
    i: 1,
    j: 4,
    k: 2,
    arr: [10, 20, 30, 40, 50],
    memoState: { 'dp[1][2]': 6000, 'dp[3][4]': 60000, 'dp[2][4]': 64000 },
    splitData: { k: 2, leftVal: 6000, splitCostVal: '10x30x50 = 15000', rightVal: 60000, total: 81000, bestSoFar: 74000, isOptimal: false },
    formula: 'k=2: dp[1][2] + dp[3][4] (O(1) CACHE HIT) + 10*30*50 = 6000 + 60000 + 15000 = 81000',
    action: 'Test split k=2: Instant cache hit for solve(3, 4) = 60,000! Total = 81,000.',
    explain: 'solve(1, 2) = 10*20*30 = 6000. For solve(3, 4), dp[3][4] is already in the cache (60,000). Retrieved in O(1)! Total = 6000 + 60000 + 15000 = 81,000. 81000 > 74000, so best remains 74,000.',
    intuition: 'Notice how the memoization cache completely bypassed re-evaluating M3 * M4.'
  },
  {
    phase: 'BRANCH_EVAL',
    i: 1,
    j: 3,
    k: 2,
    arr: [10, 20, 30, 40, 50],
    memoState: { 'dp[1][3]': 18000, 'dp[2][4]': 64000 },
    splitData: { k: 2, leftVal: 6000, splitCostVal: '10x30x40 = 12000', rightVal: 0, total: 18000, bestSoFar: 18000, isOptimal: true },
    formula: 'solve(1, 3): k=2 gives (M1 M2)M3 = 6000 + 0 + 10*30*40 = 18000 ops',
    action: 'Evaluate subproblem solve(1, 3) required for k=3. Best is 18,000 ops.',
    explain: 'In solve(1, 3), testing k=1 gives 32,000 ops; testing k=2 gives 6000 + 0 + 12000 = 18,000 ops. Memoize dp[1][3] = 18000.',
    intuition: 'Subchain [1..3] is optimally multiplied as ((M1 M2) M3).'
  },
  {
    phase: 'OPTIMAL_DISCOVERY',
    i: 1,
    j: 4,
    k: 3,
    arr: [10, 20, 30, 40, 50],
    memoState: { 'dp[1][3]': 18000, 'dp[1][4]': 38000 },
    splitData: { k: 3, leftVal: 18000, splitCostVal: '10x40x50 = 20000', rightVal: 0, total: 38000, bestSoFar: 38000, isOptimal: true },
    formula: 'k=3: dp[1][3] + solve(4, 4) + 10*40*50 = 18000 + 0 + 20000 = 38000 ops',
    action: 'Test split k=3: 18000 + 0 + 20000 = 38,000 ops. HUGE IMPROVEMENT!',
    explain: 'Group as ((M1 M2 M3) * M4). Left cost is dp[1][3] = 18000. Right cost is 0. Final multiplication = 10 * 40 * 50 = 20,000. Total = 38,000 ops! Beats 74,000 and 81,000.',
    intuition: 'Split k=3 cuts multiplications by nearly half compared to split k=1 (38,000 vs 74,000).'
  },
  {
    phase: 'MEMOIZE_GLOBAL',
    i: 1,
    j: 4,
    k: 3,
    arr: [10, 20, 30, 40, 50],
    memoState: { 'dp[1][4]': 38000, 'Best Split': 'k = 3', 'Order': '((M1 M2) M3) M4' },
    splitData: { k: 3, leftVal: 18000, splitCostVal: '20000', rightVal: 0, total: 38000, bestSoFar: 38000, isOptimal: true },
    formula: 'dp[1][4] = min(74000, 81000, 38000) = 38000 operations',
    action: 'Store final optimal answer dp[1][4] = 38000 in memoization table.',
    explain: 'All 3 possible partition choices evaluated: k=1 (74000), k=2 (81000), k=3 (38000). The global minimum is 38,000 scalar multiplications.',
    intuition: 'Optimal parenthesization is ((M1 M2) M3) M4.'
  },
  {
    phase: 'COMPLETED',
    i: 1,
    j: 4,
    k: null,
    arr: [10, 20, 30, 40, 50],
    memoState: { 'Total Multiplications': 38000, 'Time Complexity': 'O(N^3)', 'Space Complexity': 'O(N^2)' },
    splitData: null,
    formula: 'Result = 38,000 Scalar Multiplications (vs 90,000+ for worst parenthesization)',
    action: 'Algorithm Complete! Top-down memoization saved exponential recursive work.',
    explain: 'The memo table prevented redundant recomputations of overlapping subchains. Total states = O(N^2), each running an O(N) partition loop, achieving strict O(N^3) time complexity.',
    intuition: 'Choosing the right multiplication order reduced computational effort from over 90,000 ops down to 38,000 ops.'
  }
];

export default function MatrixChainMultiplicationVisualizer({ currentStep = 0 }) {
  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx] || steps[0];

  const pointers = [];
  if (step.k !== null) {
    pointers.push({ index: step.k, label: 'k▼' });
  }

  return (
    <VisualizerLayout
      phase={step.phase}
      activeLabel={`Subproblem: solve(${step.i}, ${step.j})`}
      metrics={[
        { label: 'Interval', value: `[${step.i}..${step.j}]` },
        { label: 'Split k', value: step.k !== null ? `k = ${step.k}` : '—' },
        { label: 'dp[1][4]', value: step.memoState['dp[1][4]'] || '—', highlight: step.memoState['dp[1][4]'] === 38000 }
      ]}
      formula={step.formula}
      action={step.action}
      explain={step.explain}
      intuition={step.intuition}
    >
      <div className="w-full space-y-4">
        {/* Array Track for Matrix Dimensions */}
        <ArrayTrack
          items={step.arr}
          pointers={pointers}
          highlightRange={[step.i - 1, step.j]}
          title="Matrix Dimension Markers (arr)"
          badgeLabel={`Matrices M1..M${step.arr.length - 1}`}
        />

        {/* Partition Split Calculation Bar */}
        {step.splitData && (
          <PartitionSplitBar
            k={step.splitData.k}
            leftLabel="solve(i, k)"
            leftVal={step.splitData.leftVal}
            splitCostLabel="arr[i-1]*arr[k]*arr[j]"
            splitCostVal={step.splitData.splitCostVal}
            rightLabel="solve(k+1, j)"
            rightVal={step.splitData.rightVal}
            total={step.splitData.total}
            bestSoFar={step.splitData.bestSoFar}
            isOptimal={step.splitData.isOptimal}
          />
        )}

        {/* Memoization State Inspector */}
        <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-2 mb-3">
            <span className="font-semibold uppercase tracking-wider">Memoization Cache (dp[i][j])</span>
            <span className="text-[var(--accent)] font-mono text-xs">O(1) Cached Hits</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
            {Object.entries(step.memoState).map(([key, val], idx) => (
              <div
                key={idx}
                className="bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-2.5 flex flex-col"
              >
                <span className="text-[10px] text-[var(--chalk-faint)]">{key}</span>
                <span className="text-xs font-bold text-[var(--accent-bright)] truncate mt-0.5">
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
}

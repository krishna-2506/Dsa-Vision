import React from 'react';
import { VisualizerLayout, DpGrid, PartitionSplitBar } from '../components/primitives';

export const meta = {
  title: 'Matrix Chain Multiplication | Bottom-Up (DP-49)',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N^3)',
  spaceComplexity: 'O(N^2)',
  description: 'Iterative bottom-up tabulation for Matrix Chain Multiplication. Fills the DP table diagonally by chain lengths from 2 to N-1, systematically computing optimal partition splits.'
};

export const ideaMap = {
  problemArchetype: 'Interval DP / Matrix Chain Multiplication (Diagonal Tabulation)',
  trigger: 'Multiplying a sequence of matrices where associative grouping drastically alters total scalar multiplications.',
  coreInsight: 'Matrix multiplication is associative ((AB)C = A(BC)) but not commutative. For matrices of dimensions [p x q] and [q x r], scalar ops = p * q * r. A chain of matrices A[i..j] can be split at any index k (i <= k < j). Because smaller chain lengths are independent subproblems, we can compute optimal costs diagonally by increasing chain length (len = 2 to N-1), eliminating all recursion overhead.',
  naiveApproach: {
    title: 'Exhaustive Catalan Parenthesization',
    time: 'O(4^N / N^(3/2)) Catalan Number',
    space: 'O(N) recursion stack',
    bottleneck: 'Number of parenthesizations grows as Catalan(N-1), recomputing identical subchains exponential times.'
  },
  optimalApproach: {
    title: 'Diagonal Bottom-Up DP Tabulation',
    time: 'O(N^3)',
    space: 'O(N^2) table',
    breakthrough: 'Tabulate in order of chain length len from 2 to N-1. For each window [i..j], test all split points k in O(N). Prior diagonal entries are already solved.'
  },
  flowNodes: [
    { id: '1', title: 'Dimension Parsing', subtitle: 'A_i is arr[i-1] x arr[i]', description: 'N-1 matrices defined by array of length N. Matrix i has rows arr[i-1] and cols arr[i].', tag: 'Setup' },
    { id: '2', title: 'Diagonal Base Cases', subtitle: 'dp[i][i] = 0', description: 'A single matrix requires 0 scalar multiplications. Main diagonal is filled with zeros.', tag: 'Base Case' },
    { id: '3', title: 'Diagonal Length Loop', subtitle: 'len = 2 to N-1', description: 'Iterate by increasing chain length. Window [i..j] where j = i + len - 1.', tag: 'Iteration' },
    { id: '4', title: 'Split Loop & Min', subtitle: 'k from i to j-1', description: 'Cost = dp[i][k] + dp[k+1][j] + arr[i-1]*arr[k]*arr[j]. Take min over all k.', tag: 'Transition' },
    { id: '5', title: 'Result Extraction', subtitle: 'dp[1][N-1]', description: 'Top-right cell contains the minimal multiplications for the full matrix chain.', tag: 'Result' }
  ],
  pitfalls: [
    'Diagonal order: Filling row-by-row or column-by-column fails because dp[k+1][j] is in a later row. Must iterate by chain length.',
    'Index offset: Matrix i uses arr[i-1] as row dimension and arr[i] as column dimension.',
    'Split range: k runs from i to j-1 (not j), since right subchain starts at k+1.'
  ],
  interviewCheatSheet: 'Iterate diagonal chain length len from 2 to N-1: dp[i][j] = min_{i<=k<j}(dp[i][k] + dp[k+1][j] + arr[i-1]*arr[k]*arr[j]).'
};

export const solutions = {
  cpp: `// C++ Matrix Chain Multiplication (Bottom-Up Tabulation)
// Time: O(N^3) | Space: O(N^2)
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

class Solution {
public:
    int matrixMultiplication(vector<int>& arr) {
        int n = arr.size(); // N-1 matrices
        vector<vector<int>> dp(n, vector<int>(n, 0));

        // len is the chain length (number of matrices in subproblem)
        for (int len = 2; len < n; len++) {
            for (int i = 1; i <= n - len; i++) {
                int j = i + len - 1;
                dp[i][j] = INT_MAX;
                for (int k = i; k < j; k++) {
                    int steps = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j];
                    dp[i][j] = min(dp[i][j], steps);
                }
            }
        }

        return dp[1][n - 1];
    }
};`,
  python: `# Python 3 Matrix Chain Multiplication (Tabulation)
# Time: O(N^3) | Space: O(N^2)
class Solution:
    def matrixMultiplication(self, arr: list[int]) -> int:
        n = len(arr)
        dp = [[0] * n for _ in range(n)]

        for length in range(2, n):
            for i in range(1, n - length + 1):
                j = i + length - 1
                dp[i][j] = float('inf')
                for k in range(i, j):
                    steps = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j]
                    dp[i][j] = min(dp[i][j], steps)

        return dp[1][n - 1]`,
  java: `// Java Matrix Chain Multiplication (Bottom-Up Tabulation)
// Time: O(N^3) | Space: O(N^2)
class Solution {
    public int matrixMultiplication(int[] arr) {
        int n = arr.length;
        int[][] dp = new int[n][n];

        for (int len = 2; len < n; len++) {
            for (int i = 1; i <= n - len; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                for (int k = i; k < j; k++) {
                    int steps = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j];
                    dp[i][j] = Math.min(dp[i][j], steps);
                }
            }
        }

        return dp[1][n - 1];
    }
}`,
  javascript: `// JavaScript Matrix Chain Multiplication (Bottom-Up Tabulation)
// Time: O(N^3) | Space: O(N^2)
var matrixMultiplication = function(arr) {
    const n = arr.length;
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let len = 2; len < n; len++) {
        for (let i = 1; i <= n - len; i++) {
            const j = i + len - 1;
            dp[i][j] = Infinity;
            for (let k = i; k < j; k++) {
                const steps = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j];
                dp[i][j] = Math.min(dp[i][j], steps);
            }
        }
    }

    return dp[1][n - 1];
};`
};

export const steps = [
  {
    phase: 'SETUP',
    currentLen: 1,
    activeCell: null,
    depCells: [],
    splitData: null,
    dpGrid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    formula: 'arr = [4, 2, 3, 1, 3] -> A1(4x2), A2(2x3), A3(3x1), A4(1x3)',
    action: 'Parse matrix dimensions and prepare DP tabulation grid for 4 matrices.',
    explain: 'Given 5 dimension markers, there are 4 matrices: A1(4x2), A2(2x3), A3(3x1), and A4(1x3). We initialize a 4x4 matrix representing subchains dp[i][j].',
    intuition: 'Associativity allows (AB)(CD), A(B(CD)), etc. Each parenthesization has drastically different scalar costs.'
  },
  {
    phase: 'BASE_CASE',
    currentLen: 1,
    activeCell: { r: 0, c: 0 },
    depCells: [],
    splitData: null,
    dpGrid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    formula: 'dp[i][i] = 0 (Single matrix multiplication = 0 ops)',
    action: 'Initialize main diagonal: multiplying a single matrix by itself requires 0 operations.',
    explain: 'dp[1][1] = 0, dp[2][2] = 0, dp[3][3] = 0, dp[4][4] = 0. A single matrix does not perform any multiplications.',
    intuition: 'The main diagonal forms the base cases from which all diagonal bands will be computed.'
  },
  {
    phase: 'CHAIN_LEN_2',
    currentLen: 2,
    activeCell: { r: 0, c: 1 },
    depCells: [{ r: 0, c: 0, label: 'A1' }, { r: 1, c: 1, label: 'A2' }],
    splitData: { k: 1, leftVal: 0, splitCostVal: '4x2x3 = 24', rightVal: 0, total: 24, bestSoFar: 24, isOptimal: true },
    dpGrid: [
      [0, 24, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    formula: 'dp[1][2] = dp[1][1] + dp[2][2] + arr[0]*arr[1]*arr[2] = 0 + 0 + 24 = 24',
    action: 'Compute dp[1][2]: Multiplying A1(4x2) and A2(2x3).',
    explain: 'Adjacent pair (A1)(A2). Split point k=1: scalar multiplications = 4 * 2 * 3 = 24. dp[1][2] = 24.',
    intuition: 'Chain length 2 has only 1 possible split point (k = i).'
  },
  {
    phase: 'CHAIN_LEN_2',
    currentLen: 2,
    activeCell: { r: 1, c: 2 },
    depCells: [{ r: 1, c: 1, label: 'A2' }, { r: 2, c: 2, label: 'A3' }],
    splitData: { k: 2, leftVal: 0, splitCostVal: '2x3x1 = 6', rightVal: 0, total: 6, bestSoFar: 6, isOptimal: true },
    dpGrid: [
      [0, 24, 0, 0],
      [0, 0, 6, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    formula: 'dp[2][3] = dp[2][2] + dp[3][3] + arr[1]*arr[2]*arr[3] = 0 + 0 + 6 = 6',
    action: 'Compute dp[2][3]: Multiplying A2(2x3) and A3(3x1).',
    explain: 'Adjacent pair (A2)(A3). Scalar ops = 2 * 3 * 1 = 6. dp[2][3] = 6.',
    intuition: 'Notice the cost is very low (6 ops) because matrix A3 has column dimension 1.'
  },
  {
    phase: 'CHAIN_LEN_2',
    currentLen: 2,
    activeCell: { r: 2, c: 3 },
    depCells: [{ r: 2, c: 2, label: 'A3' }, { r: 3, c: 3, label: 'A4' }],
    splitData: { k: 3, leftVal: 0, splitCostVal: '3x1x3 = 9', rightVal: 0, total: 9, bestSoFar: 9, isOptimal: true },
    dpGrid: [
      [0, 24, 0, 0],
      [0, 0, 6, 0],
      [0, 0, 0, 9],
      [0, 0, 0, 0]
    ],
    formula: 'dp[3][4] = dp[3][3] + dp[4][4] + arr[2]*arr[3]*arr[4] = 0 + 0 + 9 = 9',
    action: 'Compute dp[3][4]: Multiplying A3(3x1) and A4(1x3).',
    explain: 'Adjacent pair (A3)(A4). Scalar ops = 3 * 1 * 3 = 9. dp[3][4] = 9. Diagonal length 2 is complete.',
    intuition: 'All length-2 subproblems are now tabulated and ready to be combined.'
  },
  {
    phase: 'CHAIN_LEN_3',
    currentLen: 3,
    activeCell: { r: 0, c: 2 },
    depCells: [{ r: 0, c: 0, label: 'dp[1][1]' }, { r: 1, c: 2, label: 'dp[2][3]' }],
    splitData: { k: 1, leftVal: 0, splitCostVal: '4x2x1 = 8', rightVal: 6, total: 14, bestSoFar: 14, isOptimal: true },
    dpGrid: [
      [0, 24, 14, 0],
      [0, 0, 6, 0],
      [0, 0, 0, 9],
      [0, 0, 0, 0]
    ],
    formula: 'k=1: A1(A2 A3) = dp[1][1] + dp[2][3] + 4*2*1 = 0 + 6 + 8 = 14',
    action: 'Chain length 3: Evaluate [A1..A3] with first split point k=1.',
    explain: 'Option 1 (k=1): Group as A1 * (A2 * A3). Left subproblem dp[1][1] = 0, right subproblem dp[2][3] = 6. Multiplication cost = 4 * 2 * 1 = 8. Total = 0 + 6 + 8 = 14.',
    intuition: 'Multiplying A2*A3 first yields a 2x1 matrix, significantly reducing subsequent multiplication with A1.'
  },
  {
    phase: 'CHAIN_LEN_3',
    currentLen: 3,
    activeCell: { r: 0, c: 2 },
    depCells: [{ r: 0, c: 1, label: 'dp[1][2]' }, { r: 2, c: 2, label: 'dp[3][3]' }],
    splitData: { k: 2, leftVal: 24, splitCostVal: '4x3x1 = 12', rightVal: 0, total: 36, bestSoFar: 14, isOptimal: false },
    dpGrid: [
      [0, 24, 14, 0],
      [0, 0, 6, 0],
      [0, 0, 0, 9],
      [0, 0, 0, 0]
    ],
    formula: 'k=2: (A1 A2)A3 = dp[1][2] + dp[3][3] + 4*3*1 = 24 + 0 + 12 = 36 -> min is 14',
    action: 'Test option 2 (k=2): Group as (A1 * A2) * A3. Compare with k=1.',
    explain: 'Option 2 (k=2): dp[1][2] + dp[3][3] + 4*3*1 = 24 + 0 + 12 = 36 ops. Since 14 < 36, optimal split for [A1..A3] is k=1, storing dp[1][3] = 14.',
    intuition: 'Grouping (A1 A2) first was much more expensive (36 vs 14). MCM avoids this trap.'
  },
  {
    phase: 'CHAIN_LEN_3',
    currentLen: 3,
    activeCell: { r: 1, c: 3 },
    depCells: [{ r: 1, c: 2, label: 'dp[2][3]' }, { r: 3, c: 3, label: 'dp[4][4]' }],
    splitData: { k: 3, leftVal: 6, splitCostVal: '2x1x3 = 6', rightVal: 0, total: 12, bestSoFar: 12, isOptimal: true },
    dpGrid: [
      [0, 24, 14, 0],
      [0, 0, 6, 12],
      [0, 0, 0, 9],
      [0, 0, 0, 0]
    ],
    formula: 'dp[2][4] = min(k=2: 27, k=3: 6+0+2*1*3=12) = 12',
    action: 'Compute dp[2][4] for subchain [A2..A4]. Optimal split is k=3.',
    explain: 'Testing k=2: B(CD) = 0 + 9 + 2*3*3 = 27 ops. Testing k=3: (BC)D = 6 + 0 + 2*1*3 = 12 ops. min(27, 12) = 12. dp[2][4] = 12.',
    intuition: 'Both length-3 subchains are now solved. Only the full chain of length 4 remains.'
  },
  {
    phase: 'CHAIN_LEN_4',
    currentLen: 4,
    activeCell: { r: 0, c: 3 },
    depCells: [{ r: 0, c: 0, label: 'dp[1][1]' }, { r: 1, c: 3, label: 'dp[2][4]' }],
    splitData: { k: 1, leftVal: 0, splitCostVal: '4x2x3 = 24', rightVal: 12, total: 36, bestSoFar: 36, isOptimal: true },
    dpGrid: [
      [0, 24, 14, 36],
      [0, 0, 6, 12],
      [0, 0, 0, 9],
      [0, 0, 0, 0]
    ],
    formula: 'k=1: A1(A2 A3 A4) = dp[1][1] + dp[2][4] + 4*2*3 = 0 + 12 + 24 = 36',
    action: 'Full chain [A1..A4]: Test split point k=1 (A1 separated from rest).',
    explain: 'Split at k=1 isolates A1 on left and (A2 A3 A4) on right. Total cost = dp[1][1] (0) + dp[2][4] (12) + 4 * 2 * 3 (24) = 36 multiplications.',
    intuition: 'Candidate 1 yields 36 ops.'
  },
  {
    phase: 'CHAIN_LEN_4',
    currentLen: 4,
    activeCell: { r: 0, c: 3 },
    depCells: [{ r: 0, c: 2, label: 'dp[1][3]' }, { r: 3, c: 3, label: 'dp[4][4]' }],
    splitData: { k: 3, leftVal: 14, splitCostVal: '4x1x3 = 12', rightVal: 0, total: 26, bestSoFar: 26, isOptimal: true },
    dpGrid: [
      [0, 24, 14, 26],
      [0, 0, 6, 12],
      [0, 0, 0, 9],
      [0, 0, 0, 0]
    ],
    formula: 'k=3: (A1 A2 A3)A4 = dp[1][3] + dp[4][4] + 4*1*3 = 14 + 0 + 12 = 26',
    action: 'Test split point k=3: Group as (A1 A2 A3) * A4. Beats all other splits!',
    explain: 'Testing k=2: dp[1][2] + dp[3][4] + 4*3*3 = 24 + 9 + 36 = 69. Testing k=3: dp[1][3] + dp[4][4] + 4*1*3 = 14 + 0 + 12 = 26! min(36, 69, 26) = 26.',
    intuition: 'Split k=3 is optimal because multiplying the 4x1 intermediate matrix with A4(1x3) only costs 12 scalar ops.'
  },
  {
    phase: 'COMPLETED',
    currentLen: 4,
    activeCell: { r: 0, c: 3 },
    depCells: [],
    splitData: { k: 3, leftVal: 14, splitCostVal: '12', rightVal: 0, total: 26, bestSoFar: 26, isOptimal: true },
    dpGrid: [
      [0, 24, 14, 26],
      [0, 0, 6, 12],
      [0, 0, 0, 9],
      [0, 0, 0, 0]
    ],
    formula: 'Optimal Parenthesization: ((A1 (A2 A3)) A4) = 26 Operations',
    action: 'Algorithm Complete! Minimal scalar multiplications = dp[1][4] = 26.',
    explain: 'By filling the DP table diagonally, we evaluated all subchains in O(N^3) time without any recursion overhead. The final answer is stored in top-right cell dp[1][4] = 26.',
    intuition: 'Bottom-up diagonal tabulation solves subproblems in order of length, guaranteeing optimal substructure.'
  }
];

export default function MatrixChainMultiplicationBottomupdp49Visualizer({ currentStep = 0 }) {
  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx] || steps[0];

  const rowLabels = ['A1 (1)', 'A2 (2)', 'A3 (3)', 'A4 (4)'];
  const colLabels = ['A1 (1)', 'A2 (2)', 'A3 (3)', 'A4 (4)'];

  return (
    <VisualizerLayout
      phase={step.phase}
      activeLabel={`Chain Length: ${step.currentLen}`}
      metrics={[
        { label: 'Length', value: step.currentLen },
        { label: 'Active Cell', value: step.activeCell ? `dp[${step.activeCell.r + 1}][${step.activeCell.c + 1}]` : 'None' },
        { label: 'dp[1][4]', value: step.dpGrid[0][3] > 0 ? `${step.dpGrid[0][3]} ops` : 'Calculating...', highlight: step.dpGrid[0][3] === 26 }
      ]}
      formula={step.formula}
      action={step.action}
      explain={step.explain}
      intuition={step.intuition}
    >
      <div className="w-full space-y-4">
        {/* 2D Diagonal DP Grid */}
        <DpGrid
          grid={step.dpGrid}
          rowLabels={rowLabels}
          colLabels={colLabels}
          activeCell={step.activeCell}
          dependencyCells={step.depCells}
          title="Diagonal DP Tabulation Table (dp[i][j])"
          formatValue={(v) => (v > 0 ? `${v}` : v === 0 ? '0' : '—')}
        />

        {/* Partition Split Breakdown Bar */}
        {step.splitData && (
          <PartitionSplitBar
            k={step.splitData.k}
            leftLabel="dp[i..k]"
            leftVal={step.splitData.leftVal}
            splitCostLabel="arr[i-1]*arr[k]*arr[j]"
            splitCostVal={step.splitData.splitCostVal}
            rightLabel="dp[k+1..j]"
            rightVal={step.splitData.rightVal}
            total={step.splitData.total}
            bestSoFar={step.splitData.bestSoFar}
            isOptimal={step.splitData.isOptimal}
          />
        )}
      </div>
    </VisualizerLayout>
  );
}

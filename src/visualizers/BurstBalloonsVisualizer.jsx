import React from 'react';
import { VisualizerLayout } from '../components/primitives';

export const meta = {
  title: 'Burst Balloons',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(N^3)',
  spaceComplexity: 'O(N^2)',
  description: 'Finds the maximum coins obtained by bursting balloons. Solved by thinking in reverse: deciding which balloon is burst LAST in an interval [i...j], which decouples subproblems and enables O(N^3) Interval Dynamic Programming.'
};

export const ideaMap = {
  problemArchetype: 'MCM / Interval DP (Reverse Destruction Process)',
  trigger: 'Sequential element deletion where the score obtained depends on dynamic adjacent neighbors.',
  coreInsight: 'Forward destruction creates cascading dependencies because bursting balloon k changes the neighbors of both k-1 and k+1. Reverse the process: ask "Which balloon is burst LAST in interval [i...j]?" If balloon k is burst last, its immediate neighbors are guaranteed to be the external boundaries nums[i-1] and nums[j+1]! Subproblems [i...k-1] and [k+1...j] become completely independent.',
  naiveApproach: {
    title: 'Permutation Backtracking',
    time: 'O(N!)',
    space: 'O(N) call stack',
    bottleneck: 'N! possible burst orders, each altering array neighbors dynamically.'
  },
  optimalApproach: {
    title: 'Interval DP (Last-Burst Reversal)',
    time: 'O(N^3)',
    space: 'O(N^2) memoization table',
    breakthrough: 'Pad array with 1 at indices 0 and N+1. dp[i][j] = max(nums[i-1]*nums[k]*nums[j+1] + dp[i][k-1] + dp[k+1][j]).'
  },
  flowNodes: [
    { id: '1', title: 'Boundary Padding', subtitle: 'A = [1, ...nums, 1]', description: 'Add virtual balloons with value 1 at index 0 and N+1 to simplify boundary logic.', tag: 'Setup' },
    { id: '2', title: 'Interval [i...j]', subtitle: 'Length 1 to N', description: 'Evaluate subproblems by increasing interval length, from single balloons to the full array.', tag: 'Interval' },
    { id: '3', title: 'Last-Burst Loop', subtitle: 'k from i to j', description: 'Try each balloon k as the LAST balloon to burst in [i...j]. Coins = A[i-1]*A[k]*A[j+1] + left + right.', tag: 'Transition' },
    { id: '4', title: 'Global Answer', subtitle: 'dp[1][N]', description: 'Return dp[1][N], representing the maximum coins for bursting all N original balloons.', tag: 'Result' }
  ],
  pitfalls: [
    'Thinking forward: Asking "which balloon to burst FIRST" breaks subproblem independence.',
    'Padding off-by-one: Original balloon indices are 1 to N after inserting 1 at both ends.',
    'Base cases: When i > j, return 0 coins (empty interval).'
  ],
  interviewCheatSheet: 'Think in reverse: "Which balloon is burst LAST?" Then coins = A[i-1] * A[k] * A[j+1] + dp[i][k-1] + dp[k+1][j].'
};

export const solutions = {
  cpp: `// C++ Burst Balloons (Interval DP with Reverse Thinking)
// Time: O(N^3) | Space: O(N^2)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
    int solve(int i, int j, vector<int>& nums, vector<vector<int>>& dp) {
        if (i > j) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        int maxi = 0;
        for (int k = i; k <= j; k++) {
            int coins = nums[i - 1] * nums[k] * nums[j + 1]
                      + solve(i, k - 1, nums, dp)
                      + solve(k + 1, j, nums, dp);
            maxi = max(maxi, coins);
        }
        return dp[i][j] = maxi;
    }
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        nums.insert(nums.begin(), 1);
        nums.push_back(1);
        vector<vector<int>> dp(n + 2, vector<int>(n + 2, -1));
        return solve(1, n, nums, dp);
    }
};`,
  python: `# Python 3 Burst Balloons
# Time: O(N^3) | Space: O(N^2)
class Solution:
    def maxCoins(self, nums: list[int]) -> int:
        A = [1] + nums + [1]
        n = len(nums)
        dp = [[-1] * (n + 2) for _ in range(n + 2)]

        def solve(i: int, j: int) -> int:
            if i > j:
                return 0
            if dp[i][j] != -1:
                return dp[i][j]

            maxi = 0
            for k in range(i, j + 1):
                coins = A[i - 1] * A[k] * A[j + 1] + solve(i, k - 1) + solve(k + 1, j)
                maxi = max(maxi, coins)

            dp[i][j] = maxi
            return maxi

        return solve(1, n)`,
  java: `// Java Burst Balloons
// Time: O(N^3) | Space: O(N^2)
import java.util.Arrays;

class Solution {
    private int solve(int i, int j, int[] nums, int[][] dp) {
        if (i > j) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        int maxi = 0;
        for (int k = i; k <= j; k++) {
            int coins = nums[i - 1] * nums[k] * nums[j + 1]
                      + solve(i, k - 1, nums, dp)
                      + solve(k + 1, j, nums, dp);
            maxi = Math.max(maxi, coins);
        }
        return dp[i][j] = maxi;
    }

    public int maxCoins(int[] nums) {
        int n = nums.length;
        int[] A = new int[n + 2];
        A[0] = 1;
        A[n + 1] = 1;
        for (int i = 0; i < n; i++) A[i + 1] = nums[i];

        int[][] dp = new int[n + 2][n + 2];
        for (int[] row : dp) Arrays.fill(row, -1);
        return solve(1, n, A, dp);
    }
}`,
  javascript: `// JavaScript Burst Balloons
// Time: O(N^3) | Space: O(N^2)
var maxCoins = function(nums) {
    const n = nums.length;
    const A = [1, ...nums, 1];
    const dp = Array.from({ length: n + 2 }, () => new Array(n + 2).fill(-1));

    function solve(i, j) {
        if (i > j) return 0;
        if (dp[i][j] !== -1) return dp[i][j];

        let maxi = 0;
        for (let k = i; k <= j; k++) {
            const coins = A[i - 1] * A[k] * A[j + 1] + solve(i, k - 1) + solve(k + 1, j);
            maxi = Math.max(maxi, coins);
        }
        return dp[i][j] = maxi;
    }

    return solve(1, n);
};`
};

export const steps = [
  {
    title: '1. Problem Setup: Balloons [3, 1, 5, 8]',
    phase: 'SETUP',
    codeLine: 36,
    balloons: [1, 3, 1, 5, 8, 1],
    i: 1,
    j: 4,
    activeK: null,
    formula: 'Add virtual 1s at both ends: A = [1, 3, 1, 5, 8, 1]',
    calculation: null,
    maxCoins: 0,
    action: 'Pad original array with 1 at index 0 and index 5. Range to evaluate is [1...4].',
    explain: 'Bursting balloon k yields nums[left] * nums[k] * nums[right]. Virtual balloons with value 1 at boundaries prevent out-of-bounds checks.',
    intuition: 'If we think forward (which balloon bursts first), remaining neighbors change unpredictably. We must think in reverse!'
  },
  {
    title: '2. The Reverse Breakthrough: The "Last Burst" Balloon',
    phase: 'REVERSE_LOGIC',
    codeLine: 25,
    balloons: [1, 3, 1, 5, 8, 1],
    i: 1,
    j: 4,
    activeK: null,
    formula: 'coins = A[i-1] * A[k] * A[j+1] + solve(i, k-1) + solve(k+1, j)',
    calculation: null,
    maxCoins: 0,
    action: 'Key Invariant: If balloon k is the LAST to burst in [i...j], its neighbors are strictly A[i-1] and A[j+1]!',
    explain: 'Because all other balloons in [i...j] have already burst, balloon k sits directly between boundary A[i-1] and boundary A[j+1]. This makes subproblems completely independent!',
    intuition: 'Reverse thinking transforms an O(N!) permutation nightmare into clean O(N^3) Interval DP.'
  },
  {
    title: '3. Base Case Length 1: [3] (k = 1)',
    phase: 'BASE_CASE',
    codeLine: 26,
    balloons: [1, 3, 1, 5, 8, 1],
    i: 1,
    j: 1,
    activeK: 1,
    formula: 'A[0] * A[1] * A[2] = 1 * 3 * 1 = 3',
    calculation: { mult: '1 × 3 × 1', left: 0, right: 0, total: 3 },
    maxCoins: 3,
    action: 'Interval [1, 1]: Single balloon 3. Neighbors are A[0]=1 and A[2]=1.',
    explain: 'In single-element interval [1, 1], the only balloon is k=1 (val 3). Coins earned: A[0] * A[1] * A[2] = 1 * 3 * 1 = 3. dp[1][1] = 3.',
    intuition: 'Single balloons have no inner subproblems; their coins depend solely on their external boundaries.'
  },
  {
    title: '4. Base Case Length 1: [1] (k = 2)',
    phase: 'BASE_CASE',
    codeLine: 26,
    balloons: [1, 3, 1, 5, 8, 1],
    i: 2,
    j: 2,
    activeK: 2,
    formula: 'A[1] * A[2] * A[3] = 3 * 1 * 5 = 15',
    calculation: { mult: '3 × 1 × 5', left: 0, right: 0, total: 15 },
    maxCoins: 15,
    action: 'Interval [2, 2]: Single balloon 1. Neighbors are A[1]=3 and A[3]=5.',
    explain: 'In interval [2, 2], balloon k=2 (val 1) is surrounded by A[1]=3 and A[3]=5. Coins earned: 3 * 1 * 5 = 15. dp[2][2] = 15.',
    intuition: 'Notice how adjacent boundaries 3 and 5 amplify the coins earned from 1.'
  },
  {
    title: '5. Base Case Length 1: [5] (k = 3)',
    phase: 'BASE_CASE',
    codeLine: 26,
    balloons: [1, 3, 1, 5, 8, 1],
    i: 3,
    j: 3,
    activeK: 3,
    formula: 'A[2] * A[3] * A[4] = 1 * 5 * 8 = 40',
    calculation: { mult: '1 × 5 × 8', left: 0, right: 0, total: 40 },
    maxCoins: 40,
    action: 'Interval [3, 3]: Single balloon 5. Neighbors are A[2]=1 and A[4]=8.',
    explain: 'Balloon k=3 (val 5) surrounded by 1 and 8: 1 * 5 * 8 = 40 coins. dp[3][3] = 40.',
    intuition: 'All length-1 intervals are now solved in O(N).'
  },
  {
    title: '6. Base Case Length 1: [8] (k = 4)',
    phase: 'BASE_CASE',
    codeLine: 26,
    balloons: [1, 3, 1, 5, 8, 1],
    i: 4,
    j: 4,
    activeK: 4,
    formula: 'A[3] * A[4] * A[5] = 5 * 8 * 1 = 40',
    calculation: { mult: '5 × 8 × 1', left: 0, right: 0, total: 40 },
    maxCoins: 40,
    action: 'Interval [4, 4]: Single balloon 8. Neighbors are A[3]=5 and A[5]=1.',
    explain: 'Balloon k=4 (val 8) surrounded by 5 and 1: 5 * 8 * 1 = 40 coins. dp[4][4] = 40.',
    intuition: 'Length-1 base cases complete: dp[1][1]=3, dp[2][2]=15, dp[3][3]=40, dp[4][4]=40.'
  },
  {
    title: '7. Interval Length 2: [2, 3] (Balloons 1 and 5)',
    phase: 'INTERVAL_EVAL',
    codeLine: 27,
    balloons: [1, 3, 1, 5, 8, 1],
    i: 2,
    j: 3,
    activeK: 3,
    formula: 'k=3 (balloon 5 burst last): 3*5*8 + dp[2][2] = 120 + 15 = 135',
    calculation: { mult: '3 × 5 × 8', left: 15, right: 0, total: 135 },
    maxCoins: 135,
    action: 'Test k=2 vs k=3 as last balloon in [2, 3]. Best is k=3 (balloon 5 last) -> 135 coins!',
    explain: 'Option 1 (k=2 burst last): 3*1*8 + dp[3][3] = 24 + 40 = 64. Option 2 (k=3 burst last): 3*5*8 + dp[2][2] = 120 + 15 = 135! max(64, 135) = 135. dp[2][3] = 135.',
    intuition: 'Leaving the larger balloon (5) for last multiplies both boundary numbers 3 and 8.'
  },
  {
    title: '8. Interval Length 3: [1, 3] (Balloons 3, 1, 5)',
    phase: 'INTERVAL_EVAL',
    codeLine: 27,
    balloons: [1, 3, 1, 5, 8, 1],
    i: 1,
    j: 3,
    activeK: 1,
    formula: 'k=1 (balloon 3 burst last): 1*3*8 + dp[2][3] = 24 + 135 = 159',
    calculation: { mult: '1 × 3 × 8', left: 0, right: 135, total: 159 },
    maxCoins: 159,
    action: 'Interval [1, 3]: Best choice is balloon 3 burst last -> 159 coins!',
    explain: 'Testing k=1 as last: 1*3*8 + dp[2][3] = 24 + 135 = 159 coins! Subproblem dp[2][3] (135) from earlier is reused instantly in O(1).',
    intuition: 'Optimal substructure in action: previous subproblems combine with current boundary multiplication.'
  },
  {
    title: '9. Full Interval [1, 4]: Exploring Last Burst k = 4 (Balloon 8)',
    phase: 'INTERVAL_EVAL',
    codeLine: 27,
    balloons: [1, 3, 1, 5, 8, 1],
    i: 1,
    j: 4,
    activeK: 4,
    formula: 'k=4: A[0]*A[4]*A[5] + dp[1][3] = 1*8*1 + 159 = 8 + 159 = 167',
    calculation: { mult: '1 × 8 × 1', left: 159, right: 0, total: 167 },
    maxCoins: 167,
    action: 'Test balloon 8 as the LAST balloon to burst in the entire array!',
    explain: 'If balloon 8 is burst last, all balloons in [1..3] burst first, earning dp[1][3] = 159. Finally balloon 8 bursts between A[0]=1 and A[5]=1, earning 1*8*1 = 8. Total = 159 + 8 = 167 coins!',
    intuition: 'Candidate 1 yields 167 coins.'
  },
  {
    title: '10. Peak Comparison: Max Coins = 167 Confirmed',
    phase: 'OPTIMAL_DECISION',
    codeLine: 29,
    balloons: [1, 3, 1, 5, 8, 1],
    i: 1,
    j: 4,
    activeK: 4,
    formula: 'dp[1][4] = max(choices) = 167 coins',
    calculation: { mult: '1 × 8 × 1', left: 159, right: 0, total: 167 },
    maxCoins: 167,
    action: 'Evaluating all choices for [1, 4]: k=1 (152), k=2 (150), k=3 (135), k=4 (167). Optimal is 167!',
    explain: 'Bursting sequence that achieves 167: Burst balloon 1 first (earning 15), then balloon 5 (earning 120), then balloon 3 (earning 24), and finally balloon 8 (earning 8). Total = 15 + 120 + 24 + 8 = 167!',
    intuition: 'The reverse order of choices directly tells us the forward bursting sequence.'
  },
  {
    title: '11. Algorithm Complete & Complexity Summary',
    phase: 'COMPLETED',
    codeLine: 39,
    balloons: [1, 3, 1, 5, 8, 1],
    i: 1,
    j: 4,
    activeK: null,
    formula: 'Result = 167 Coins | Time: O(N^3) | Space: O(N^2)',
    calculation: null,
    maxCoins: 167,
    action: 'Return 167. Full interval DP table populated in O(N^3) time.',
    explain: 'Total states in DP table is O(N^2), and each state evaluates at most O(N) choices of k. Total time is strictly O(N^3). Auxiliary memory is O(N^2) for the 2D DP matrix.',
    intuition: 'Decoupling subproblems by identifying the last operation is the hallmark of advanced Interval DP.'
  }
];

export default function BurstBalloonsVisualizer({ currentStep = 0 }) {
  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx] || steps[0];

  return (
    <VisualizerLayout
      phase={step.phase}
      activeLabel={`Interval [${step.i}..${step.j}]`}
      metrics={[
        { label: 'Interval', value: `[${step.i}, ${step.j}]` },
        { label: 'Last Burst k', value: step.activeK !== null ? `Balloon ${step.balloons[step.activeK]}` : '—' },
        { label: 'Max Coins', value: step.maxCoins, highlight: true }
      ]}
      formula={step.formula}
      action={step.action}
      explain={step.explain}
      intuition={step.intuition}
    >
      {/* ── Balloon Track & Interactive Multipliers ── */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 space-y-6 shadow-sm">
        
        <div className="flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-2.5">
          <span className="uppercase tracking-wider font-semibold">Balloon Track (with Virtual 1s)</span>
          <span>k = {step.activeK !== null ? step.activeK : 'evaluating'}</span>
        </div>

        {/* Balloons Stream */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 py-4 overflow-x-auto">
          {step.balloons.map((val, idx) => {
            const isBoundary = idx === 0 || idx === step.balloons.length - 1;
            const inInterval = idx >= step.i && idx <= step.j;
            const isK = step.activeK === idx;
            const isLeftBoundary = idx === step.i - 1;
            const isRightBoundary = idx === step.j + 1;

            let cardStyle = 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-dim)]';

            if (isK) {
              cardStyle = 'border-[var(--border-accent)] bg-[var(--accent-subtle)] text-[var(--accent-bright)] ring-2 ring-[var(--border-accent)] font-bold scale-110 shadow-md';
            } else if (isLeftBoundary || isRightBoundary) {
              cardStyle = 'border-amber-500/40 bg-amber-500/10 text-amber-300 font-semibold';
            } else if (inInterval) {
              cardStyle = 'border-indigo-500/30 bg-indigo-500/10 text-[var(--chalk)]';
            } else if (isBoundary) {
              cardStyle = 'border-dashed border-[var(--line)] bg-[var(--board)] text-[var(--chalk-faint)] opacity-60';
            }

            return (
              <div key={`balloon-${idx}`} className="flex flex-col items-center gap-1.5 min-w-[46px] sm:min-w-[54px]">
                {/* Pointer / Badge */}
                <div className="h-4 flex items-center justify-center text-[10px] font-mono font-bold">
                  {isK ? (
                    <span className="text-[var(--accent-bright)] animate-bounce">LAST k▼</span>
                  ) : isLeftBoundary ? (
                    <span className="text-amber-400">i-1▼</span>
                  ) : isRightBoundary ? (
                    <span className="text-amber-400">j+1▼</span>
                  ) : null}
                </div>

                {/* Circular Balloon Shape */}
                <div className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-200 ${cardStyle}`}>
                  <span className="text-lg sm:text-xl font-bold">{val}</span>
                  <span className="text-[8px] opacity-60 font-normal">
                    {isBoundary ? 'pad' : `idx ${idx}`}
                  </span>
                </div>

                {/* String tie indicator */}
                <div className="w-1 h-2 bg-[var(--line)] rounded-full" />
              </div>
            );
          })}
        </div>

        {/* Dynamic Calculation Breakdown */}
        {step.calculation && (
          <div className="pt-3 border-t border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[var(--chalk-dim)]">Coin Calculation:</span>
              <span className="px-2 py-0.5 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)]">
                {step.calculation.mult} = <strong>{step.calculation.mult.split(/[×*]/).reduce((acc, val) => acc * (parseInt(val.trim(), 10) || 1), 1)}</strong>
              </span>
              <span className="text-[var(--chalk-dim)]">+</span>
              <span className="px-2 py-0.5 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
                L: {step.calculation.left}
              </span>
              <span className="text-[var(--chalk-dim)]">+</span>
              <span className="px-2 py-0.5 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
                R: {step.calculation.right}
              </span>
            </div>

            <div className="text-[var(--accent-bright)] font-bold text-sm">
              = {step.calculation.total} coins
            </div>
          </div>
        )}

      </div>
    </VisualizerLayout>
  );
}

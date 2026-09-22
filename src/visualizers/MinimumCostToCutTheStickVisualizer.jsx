import React from 'react';
import { VisualizerLayout } from '../components/primitives';

export const meta = {
  title: 'Minimum Cost to Cut a Stick',
  category: 'Dynamic Programming',
  difficulty: 'Hard',
  timeComplexity: 'O(C^3)',
  spaceComplexity: 'O(C^2)',
  description: 'Calculates the minimum cost to cut a stick of length n at specified positions. By sorting cuts and bounding them with 0 and n, subproblems become independent segments solved with Interval Partition DP in O(C^3) time.'
};

export const ideaMap = {
  problemArchetype: 'Interval Dynamic Programming & Rod Partitioning',
  trigger: 'Cutting a stick/rod at specific positions where the cost of each cut equals the current segment length.',
  coreInsight: 'Append 0 and n to the cuts array and sort it. Now, any stick segment bounded by cuts[i] and cuts[j] has length cuts[j] - cuts[i]. When we choose cut k (between i and j) to be made first on this segment, the cost incurred is (cuts[j] - cuts[i]), and the segment splits into two independent sub-sticks [i, k] and [k, j].',
  naiveApproach: {
    title: 'Exhaustive Permutations of Cut Orders',
    time: 'O(C!)',
    space: 'O(C) call stack',
    bottleneck: 'Testing all C! possible permutations of cut orders.'
  },
  optimalApproach: {
    title: 'Interval DP on Bounded Sorted Coordinates',
    time: 'O(C^3)',
    space: 'O(C^2) memoization table',
    breakthrough: 'By bounding with [0, ...sorted(cuts), n], dp[i][j] = (cuts[j] - cuts[i]) + min(dp[i][k] + dp[k][j]).'
  },
  flowNodes: [
    { id: '1', title: 'Pad & Sort Boundaries', subtitle: 'cuts = [0, ...cuts, n]', description: 'Add 0 and n, then sort. Indices i and j now define physical stick boundaries.', tag: 'Setup' },
    { id: '2', title: 'Base Boundary', subtitle: 'i + 1 >= j -> 0', description: 'When i and j are adjacent, no cut points exist inside the stick. Cost is 0.', tag: 'Base' },
    { id: '3', title: 'Cut Split Loop', subtitle: 'k from i+1 to j-1', description: 'Test each cut k. Cost = (cuts[j] - cuts[i]) + dp[i][k] + dp[k][j].', tag: 'Transition' },
    { id: '4', title: 'Global Answer', subtitle: 'dp[0][m - 1]', description: 'The full stick is bounded from index 0 to m-1. Answer is stored at dp[0][m-1].', tag: 'Result' }
  ],
  pitfalls: [
    'Forgetting to sort: If cuts are unsorted, interval [i, j] does not represent a contiguous segment of the stick.',
    'Missing 0 or n: Length calculation cuts[j] - cuts[i] requires 0 and n to be in the array.',
    'Base condition: The recursion stops when i + 1 >= j, NOT when i == j, because adjacent cuts contain no cutting positions.'
  ],
  interviewCheatSheet: 'Pad [0, ...sorted(cuts), n]. Recurrence: dp[i][j] = (cuts[j] - cuts[i]) + min(dp[i][k] + dp[k][j]) for all i < k < j.'
};

export const solutions = {
  cpp: `// C++ Minimum Cost to Cut a Stick
// Time: O(C^3) | Space: O(C^2) where C = cuts.size()
#include <vector>
#include <climits>
#include <algorithm>
using namespace std;

class Solution {
    int solve(int i, int j, vector<int>& cuts, vector<vector<int>>& dp) {
        if (i + 1 >= j) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        int mini = INT_MAX;
        for (int k = i + 1; k < j; k++) {
            int cost = (cuts[j] - cuts[i]) + solve(i, k, cuts, dp) + solve(k, j, cuts, dp);
            mini = min(mini, cost);
        }
        return dp[i][j] = mini;
    }
public:
    int minCost(int n, vector<int>& cuts) {
        cuts.push_back(0);
        cuts.push_back(n);
        sort(cuts.begin(), cuts.end());
        int m = cuts.size();
        vector<vector<int>> dp(m, vector<int>(m, -1));
        return solve(0, m - 1, cuts, dp);
    }
};`,
  python: `# Python 3 Minimum Cost to Cut a Stick
# Time: O(C^3) | Space: O(C^2)
class Solution:
    def minCost(self, n: int, cuts: list[int]) -> int:
        cuts = [0] + sorted(cuts) + [n]
        m = len(cuts)
        dp = [[-1] * m for _ in range(m)]

        def solve(i: int, j: int) -> int:
            if i + 1 >= j:
                return 0
            if dp[i][j] != -1:
                return dp[i][j]

            mini = float('inf')
            for k in range(i + 1, j):
                cost = (cuts[j] - cuts[i]) + solve(i, k) + solve(k, j)
                mini = min(mini, cost)

            dp[i][j] = mini
            return mini

        return solve(0, m - 1)`,
  java: `// Java Minimum Cost to Cut a Stick
// Time: O(C^3) | Space: O(C^2)
import java.util.Arrays;

class Solution {
    private int solve(int i, int j, int[] cuts, int[][] dp) {
        if (i + 1 >= j) return 0;
        if (dp[i][j] != -1) return dp[i][j];

        int mini = Integer.MAX_VALUE;
        for (int k = i + 1; k < j; k++) {
            int cost = (cuts[j] - cuts[i]) + solve(i, k, cuts, dp) + solve(k, j, cuts, dp);
            mini = Math.min(mini, cost);
        }
        return dp[i][j] = mini;
    }

    public int minCost(int n, int[] cuts) {
        int[] A = new int[cuts.length + 2];
        A[0] = 0;
        A[A.length - 1] = n;
        System.arraycopy(cuts, 0, A, 1, cuts.length);
        Arrays.sort(A);

        int m = A.length;
        int[][] dp = new int[m][m];
        for (int[] row : dp) Arrays.fill(row, -1);
        return solve(0, m - 1, A, dp);
    }
}`,
  javascript: `// JavaScript Minimum Cost to Cut a Stick
// Time: O(C^3) | Space: O(C^2)
var minCost = function(n, cuts) {
    const A = [0, ...cuts.sort((a, b) => a - b), n];
    const m = A.length;
    const dp = Array.from({ length: m }, () => new Array(m).fill(-1));

    function solve(i, j) {
        if (i + 1 >= j) return 0;
        if (dp[i][j] !== -1) return dp[i][j];

        let mini = Infinity;
        for (let k = i + 1; k < j; k++) {
            const cost = (A[j] - A[i]) + solve(i, k) + solve(k, j);
            mini = Math.min(mini, cost);
        }
        return dp[i][j] = mini;
    }

    return solve(0, m - 1);
};`
};

export const steps = [
  {
    title: '1. Problem Setup: n = 7, cuts = [1, 3, 4, 5]',
    phase: 'SETUP',
    codeLine: 35,
    n: 7,
    cuts: [0, 1, 3, 4, 5, 7],
    i: 0,
    j: 5,
    activeK: null,
    segmentLength: 7,
    costCalculation: null,
    minCost: 0,
    action: 'Append 0 and n=7, then sort cuts -> [0, 1, 3, 4, 5, 7]. Total boundaries m = 6.',
    explain: 'Stick begins at 0 and ends at 7. Sorting the cuts allows any stick segment bounded by cuts[i] and cuts[j] to have physical length cuts[j] - cuts[i].',
    intuition: 'Each cut divides the stick into two independent shorter sticks.'
  },
  {
    title: '2. Base Cases: Adjacent Cuts (i + 1 >= j)',
    phase: 'BASE_CASES',
    codeLine: 22,
    n: 7,
    cuts: [0, 1, 3, 4, 5, 7],
    i: 0,
    j: 1,
    activeK: null,
    segmentLength: 1,
    costCalculation: null,
    minCost: 0,
    action: 'When j = i + 1, no cut points exist inside the segment. Return 0 cost.',
    explain: 'For intervals [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], there are no internal cuts remaining. Zero cuts cost 0. dp[i][i+1] = 0.',
    intuition: 'A piece of stick that needs no further cuts costs nothing.'
  },
  {
    title: '3. Evaluating Segments with 1 Cut: [0, 2] (cuts at 0, 1, 3)',
    phase: 'EVAL_SEGMENT',
    codeLine: 27,
    n: 7,
    cuts: [0, 1, 3, 4, 5, 7],
    i: 0,
    j: 2,
    activeK: 1,
    segmentLength: 3,
    costCalculation: { length: 3, left: 0, right: 0, total: 3 },
    minCost: 3,
    action: 'Segment [0, 2] has length cuts[2] - cuts[0] = 3 - 0 = 3. Only choice is cut k=1 (pos 1).',
    explain: 'Only one internal cut exists: at position 1. Cost is segment length (3) + dp[0][1] (0) + dp[1][2] (0) = 3. dp[0][2] = 3.',
    intuition: 'Every segment with exactly one cut incurs cost equal to its length.'
  },
  {
    title: '4. Evaluating Segments with 1 Cut: [1, 3] and [2, 4]',
    phase: 'EVAL_SEGMENT',
    codeLine: 27,
    n: 7,
    cuts: [0, 1, 3, 4, 5, 7],
    i: 1,
    j: 3,
    activeK: 2,
    segmentLength: 3,
    costCalculation: { length: 3, left: 0, right: 0, total: 3 },
    minCost: 3,
    action: 'Segment [1, 3] (pos 1 to 4): cut at k=2 (pos 3). Cost = (4 - 1) = 3. dp[1][3] = 3.',
    explain: 'Segment [2, 4] (pos 3 to 5): cut at k=3 (pos 4). Cost = (5 - 3) = 2. dp[2][4] = 2. Segment [3, 5] (pos 4 to 7): cut at k=4 (pos 5). Cost = (7 - 4) = 3. dp[3][5] = 3.',
    intuition: 'All length-2 intervals (1 cut) are now memoized.'
  },
  {
    title: '5. Segments with 2 Cuts: [0, 3] (pos 0 to 4)',
    phase: 'EVAL_CHOICES',
    codeLine: 27,
    n: 7,
    cuts: [0, 1, 3, 4, 5, 7],
    i: 0,
    j: 3,
    activeK: 2,
    segmentLength: 4,
    costCalculation: { length: 4, left: 3, right: 0, total: 7 },
    minCost: 7,
    action: 'Segment [0, 3] (length 4). Choices: k=1 (pos 1) vs k=2 (pos 3). Both yield cost 7.',
    explain: 'Choice A (k=1): 4 + dp[0][1] + dp[1][3] = 4 + 0 + 3 = 7. Choice B (k=2): 4 + dp[0][2] + dp[2][3] = 4 + 3 + 0 = 7. dp[0][3] = 7.',
    intuition: 'Either cut order on [0..4] incurs 7 total cost.'
  },
  {
    title: '6. Segments with 2 Cuts: [1, 4] (pos 1 to 5)',
    phase: 'EVAL_CHOICES',
    codeLine: 27,
    n: 7,
    cuts: [0, 1, 3, 4, 5, 7],
    i: 1,
    j: 4,
    activeK: 2,
    segmentLength: 4,
    costCalculation: { length: 4, left: 0, right: 2, total: 6 },
    minCost: 6,
    action: 'Segment [1, 4] (length 4). Choice k=2 (pos 3) gives 4 + 0 + 2 = 6!',
    explain: 'Choice A (k=2 at pos 3): 4 + dp[1][2] + dp[2][4] = 4 + 0 + 2 = 6. Choice B (k=3 at pos 4): 4 + dp[1][3] + dp[3][4] = 4 + 3 + 0 = 7. Optimal choice is k=2: dp[1][4] = 6!',
    intuition: 'Cutting at position 3 first saves 1 cost compared to cutting at 4 first.'
  },
  {
    title: '7. Segments with 2 Cuts: [2, 5] (pos 3 to 7)',
    phase: 'EVAL_CHOICES',
    codeLine: 27,
    n: 7,
    cuts: [0, 1, 3, 4, 5, 7],
    i: 2,
    j: 5,
    activeK: 4,
    segmentLength: 4,
    costCalculation: { length: 4, left: 2, right: 0, total: 6 },
    minCost: 6,
    action: 'Segment [2, 5] (length 4). Choice k=4 (pos 5) gives 4 + 2 + 0 = 6!',
    explain: 'Choice A (k=3 at pos 4): 4 + 0 + 3 = 7. Choice B (k=4 at pos 5): 4 + dp[2][4] + dp[4][5] = 4 + 2 + 0 = 6. Optimal is k=4: dp[2][5] = 6.',
    intuition: 'Segments of length 2 and 3 are all resolved.'
  },
  {
    title: '8. Full Stick [0, 5]: Testing First Cut k = 1 (pos 1)',
    phase: 'FULL_STICK_CHOICE',
    codeLine: 27,
    n: 7,
    cuts: [0, 1, 3, 4, 5, 7],
    i: 0,
    j: 5,
    activeK: 1,
    segmentLength: 7,
    costCalculation: { length: 7, left: 0, right: 10, total: 17 },
    minCost: 17,
    action: 'Test Cut at position 1 first: Cost = (7 - 0) + dp[0][1] + dp[1][5] = 7 + 0 + 10 = 17.',
    explain: 'If we make cut 1 first: full length is 7. Left stick [0..1] costs 0. Right stick [1..5] costs dp[1][5]=10. Total cost = 17.',
    intuition: 'Cutting near the edge (position 1) leaves a huge remaining stick of length 6.'
  },
  {
    title: '9. Full Stick [0, 5]: Testing First Cut k = 2 (pos 3)',
    phase: 'FULL_STICK_CHOICE',
    codeLine: 27,
    n: 7,
    cuts: [0, 1, 3, 4, 5, 7],
    i: 0,
    j: 5,
    activeK: 2,
    segmentLength: 7,
    costCalculation: { length: 7, left: 3, right: 6, total: 16 },
    minCost: 16,
    action: 'Test Cut at position 3 first: Cost = 7 + dp[0][2] + dp[2][5] = 7 + 3 + 6 = 16!',
    explain: 'If we cut at pos 3 first: segment length is 7. Left stick [0..2] has cost dp[0][2]=3. Right stick [2..5] has cost dp[2][5]=6. Total = 7 + 3 + 6 = 16! 16 < 17, so minimum drops to 16!',
    intuition: 'Cutting near the center balances both sub-sticks, drastically reducing future costs.'
  },
  {
    title: '10. Full Stick [0, 5]: Testing Remaining Cuts k = 3 and k = 4',
    phase: 'OPTIMAL_DECISION',
    codeLine: 29,
    n: 7,
    cuts: [0, 1, 3, 4, 5, 7],
    i: 0,
    j: 5,
    activeK: 2,
    segmentLength: 7,
    costCalculation: { length: 7, left: 3, right: 6, total: 16 },
    minCost: 16,
    action: 'k=3 (pos 4) gives 7 + 7 + 3 = 17. k=4 (pos 5) gives 7 + 10 + 0 = 17. Minimum is 16 at k=2!',
    explain: 'Summary of choices for full stick [0, 5]: Cut at 1 -> 17. Cut at 3 -> 16. Cut at 4 -> 17. Cut at 5 -> 17. Minimum cost is 16! The optimal first cut is position 3.',
    intuition: 'dp[0][5] = 16.'
  },
  {
    title: '11. Algorithm Complete & Complexity Summary',
    phase: 'COMPLETED',
    codeLine: 39,
    n: 7,
    cuts: [0, 1, 3, 4, 5, 7],
    i: 0,
    j: 5,
    activeK: null,
    segmentLength: 7,
    costCalculation: null,
    minCost: 16,
    action: 'Minimum cost to cut stick of length 7 is 16. Time: O(C^3) | Space: O(C^2).',
    explain: 'By padding with boundaries 0 and n and sorting cuts, the problem reduces to O(C^2) interval states. Evaluating C choices per state gives O(C^3) time. Optimal for any stick cutting problem!',
    intuition: 'Classical rod cutting partition dynamic programming.'
  }
];

export default function MinimumCostToCutTheStickVisualizer({ currentStep = 0 }) {
  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx] || steps[0];

  return (
    <VisualizerLayout
      phase={step.phase}
      activeLabel={`Segment [${step.cuts[step.i]}cm .. ${step.cuts[step.j]}cm]`}
      metrics={[
        { label: 'Stick Length', value: `${step.n} cm` },
        { label: 'Active Cut k', value: step.activeK !== null ? `pos ${step.cuts[step.activeK]}` : '—' },
        { label: 'Min Cost', value: step.minCost, highlight: true }
      ]}
      formula={`Cost = (cuts[j] - cuts[i]) + dp[i][k] + dp[k][j] = ${step.segmentLength} + L + R`}
      action={step.action}
      explain={step.explain}
      intuition={step.intuition}
    >
      {/* ── Stick Physical Ruler & Interactive Cuts ── */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 space-y-6 shadow-sm">
        
        <div className="flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-2.5">
          <span className="uppercase tracking-wider font-semibold">Physical Stick Track &amp; Cut Markers</span>
          <span>segment: {step.cuts[step.i]}cm to {step.cuts[step.j]}cm (len: {step.segmentLength}cm)</span>
        </div>

        {/* Visual Stick Bar with Ruler Ticks */}
        <div className="w-full py-4 px-2 flex flex-col items-center">
          {/* Top Cut Indicators / Scissor Pointers */}
          <div className="w-full max-w-xl flex items-center justify-between text-[10px] font-mono text-[var(--chalk-dim)] mb-1 px-1">
            {step.cuts.map((c, idx) => {
              const isK = step.activeK === idx;
              const isBound = idx === step.i || idx === step.j;
              return (
                <div key={`tick-${idx}`} className="flex flex-col items-center w-8">
                  {isK ? (
                    <span className="text-[var(--accent-bright)] font-bold text-xs animate-bounce">✂ cut</span>
                  ) : isBound ? (
                    <span className="text-amber-400 font-semibold">{idx === step.i ? 'i▼' : 'j▼'}</span>
                  ) : (
                    <span className="opacity-0">·</span>
                  )}
                  <span>{c}cm</span>
                </div>
              );
            })}
          </div>

          {/* Wooden / Metallic Stick Body */}
          <div className="w-full max-w-xl h-10 rounded-xl bg-[var(--board-raised-2)] border-2 border-[var(--line-strong)] relative overflow-hidden flex items-center">
            {/* Active Segment Highlight Overlay */}
            {step.i < step.j && (
              <div
                style={{
                  left: `${(step.cuts[step.i] / step.n) * 100}%`,
                  width: `${((step.cuts[step.j] - step.cuts[step.i]) / step.n) * 100}%`
                }}
                className="absolute top-0 bottom-0 bg-indigo-500/15 border-x-2 border-indigo-400/60"
              />
            )}

            {/* Internal Cut Markers */}
            {step.cuts.map((c, idx) => {
              if (idx === 0 || idx === step.cuts.length - 1) return null;
              const isK = step.activeK === idx;
              const leftPct = (c / step.n) * 100;

              return (
                <div
                  key={`cut-line-${idx}`}
                  style={{ left: `${leftPct}%` }}
                  className={`absolute top-0 bottom-0 w-0.5 z-10 transition-all ${
                    isK
                      ? 'bg-[var(--accent-bright)] shadow-[0_0_8px_var(--accent)] ring-1 ring-[var(--accent)]'
                      : 'bg-[var(--line-strong)] border-dashed'
                  }`}
                />
              );
            })}
          </div>

          {/* Sub-stick Partition Indicators */}
          {step.activeK !== null && (
            <div className="w-full max-w-xl flex items-center justify-between text-[11px] font-mono mt-3 px-2">
              <div className="px-2.5 py-1 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-indigo-300">
                Left Sub-stick: [{step.cuts[step.i]} .. {step.cuts[step.activeK]}cm]
              </div>
              <div className="px-2.5 py-1 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-cyan-300">
                Right Sub-stick: [{step.cuts[step.activeK]} .. {step.cuts[step.j]}cm]
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Cost Equation */}
        {step.costCalculation && (
          <div className="pt-3 border-t border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[var(--chalk-dim)]">Cost Formula:</span>
              <span className="px-2 py-0.5 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)]">
                Length: {step.costCalculation.length}
              </span>
              <span className="text-[var(--chalk-dim)]">+</span>
              <span className="px-2 py-0.5 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
                Left DP: {step.costCalculation.left}
              </span>
              <span className="text-[var(--chalk-dim)]">+</span>
              <span className="px-2 py-0.5 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
                Right DP: {step.costCalculation.right}
              </span>
            </div>

            <div className="text-[var(--accent-bright)] font-bold text-sm">
              = {step.costCalculation.total} cost
            </div>
          </div>
        )}

      </div>
    </VisualizerLayout>
  );
}

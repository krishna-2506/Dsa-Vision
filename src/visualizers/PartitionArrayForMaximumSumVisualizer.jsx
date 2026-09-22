import React from 'react';

export const meta = {
  title: 'Partition Array for Maximum Sum',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N * K)',
  spaceComplexity: 'O(N)',
  description: 'Partitions an array into contiguous subarrays of length at most K such that every element in a subarray is changed to the maximum value in that subarray, maximizing the total sum. Solved using 1D Front Partition Dynamic Programming in O(N * K) time.'
};

export const ideaMap = {
  problemArchetype: 'Front-Partition Dynamic Programming',
  trigger: 'Partitioning an array into contiguous segments of bounded size (length <= K) where each segment contribution depends on its internal max/min.',
  coreInsight: 'At each index i, we make a decision of chunk length len from 1 to K. As we expand the chunk, maintain running maxVal. The value contributed by this chunk is len * maxVal, and the remaining problem is subproblem dp[i + len]. Taking the maximum over all 1 <= len <= K gives the optimal answer.',
  naiveApproach: {
    title: 'Unmemoized Recursive Branching',
    time: 'O(K^N)',
    space: 'O(N) call stack',
    bottleneck: 'Branching up to K ways at every single index produces an exponential recursion tree with heavily overlapping subproblems.'
  },
  optimalApproach: {
    title: '1D Front Partition DP (Tabulation / Memoization)',
    time: 'O(N * K)',
    space: 'O(N) 1D DP table',
    breakthrough: 'Each state dp[i] only depends on future states dp[i + len]. We resolve each state in O(K) transitions by maintaining running maximum.'
  },
  flowNodes: [
    { id: '1', title: 'State Definition', subtitle: 'dp[i] starting at i', description: 'dp[i] represents the maximum transformed sum obtainable from suffix arr[i...N-1].', tag: 'State' },
    { id: '2', title: 'Length Loop (1 to K)', subtitle: 'Bounded window', description: 'Try every chunk length len from 1 to min(K, N - i). Maintain running maxVal = max(maxVal, arr[i + len - 1]).', tag: 'Transition' },
    { id: '3', title: 'Subproblem Combination', subtitle: 'len * maxVal + dp[i+len]', description: 'Compute sum = len * maxVal + dp[i + len]. Update dp[i] = max(dp[i], sum).', tag: 'Compute' },
    { id: '4', title: 'Base Case & Result', subtitle: 'dp[N] = 0 -> dp[0]', description: 'When i == N, remaining sum is 0. Final answer is stored at dp[0].', tag: 'Result' }
  ],
  pitfalls: [
    'Array boundary overflow: Ensure i + len <= N so you do not read past the end of the array.',
    'Recomputing maximum repeatedly: Do NOT scan the subarray with a separate loop; update running maxVal in O(1) on each step of the length loop.',
    'Greedy trap: Greedily taking the largest subarray length K does not always yield the maximum global sum (e.g. taking len=1 might preserve a higher element for the next partition).'
  ],
  interviewCheatSheet: 'Front partition pattern: at index i, loop length 1..K, track running max, and transition: dp[i] = max(len * maxVal + dp[i + len]).'
};

export const solutions = {
  cpp: `// C++ Partition Array for Maximum Sum
// Time: O(N * K) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
    int solve(int i, int k, vector<int>& arr, vector<int>& dp) {
        int n = arr.size();
        if (i == n) return 0;
        if (dp[i] != -1) return dp[i];

        int maxVal = 0, maxSum = 0;
        for (int len = 1; len <= k && i + len <= n; len++) {
            maxVal = max(maxVal, arr[i + len - 1]);
            int sum = len * maxVal + solve(i + len, k, arr, dp);
            maxSum = max(maxSum, sum);
        }
        return dp[i] = maxSum;
    }
public:
    int maxSumAfterPartitioning(vector<int>& arr, int k) {
        int n = arr.size();
        vector<int> dp(n, -1);
        return solve(0, k, arr, dp);
    }
};`,
  python: `# Python 3 Partition Array for Maximum Sum
# Time: O(N * K) | Space: O(N)
class Solution:
    def maxSumAfterPartitioning(self, arr: list[int], k: int) -> int:
        n = len(arr)
        dp = [-1] * n

        def solve(i: int) -> int:
            if i == n:
                return 0
            if dp[i] != -1:
                return dp[i]

            max_val = 0
            max_sum = 0
            for length in range(1, min(k, n - i) + 1):
                max_val = max(max_val, arr[i + length - 1])
                curr_sum = length * max_val + solve(i + length)
                max_sum = max(max_sum, curr_sum)

            dp[i] = max_sum
            return dp[i]

        return solve(0)`,
  java: `// Java Partition Array for Maximum Sum
// Time: O(N * K) | Space: O(N)
import java.util.Arrays;

class Solution {
    private int solve(int i, int k, int[] arr, int[] dp) {
        int n = arr.length;
        if (i == n) return 0;
        if (dp[i] != -1) return dp[i];

        int maxVal = 0, maxSum = 0;
        for (int len = 1; len <= k && i + len <= n; len++) {
            maxVal = Math.max(maxVal, arr[i + len - 1]);
            int sum = len * maxVal + solve(i + len, k, arr, dp);
            maxSum = Math.max(maxSum, sum);
        }
        return dp[i] = maxSum;
    }

    public int maxSumAfterPartitioning(int[] arr, int k) {
        int n = arr.length;
        int[] dp = new int[n];
        Arrays.fill(dp, -1);
        return solve(0, k, arr, dp);
    }
}`,
  javascript: `// JavaScript Partition Array for Maximum Sum
// Time: O(N * K) | Space: O(N)
var maxSumAfterPartitioning = function(arr, k) {
    const n = arr.length;
    const dp = new Array(n).fill(-1);

    function solve(i) {
        if (i === n) return 0;
        if (dp[i] !== -1) return dp[i];

        let maxVal = 0, maxSum = 0;
        for (let len = 1; len <= k && i + len <= n; len++) {
            maxVal = Math.max(maxVal, arr[i + len - 1]);
            const sum = len * maxVal + solve(i + len);
            maxSum = Math.max(maxSum, sum);
        }
        return dp[i] = maxSum;
    }

    return solve(0);
};`
};

export const steps = [
  {
    title: '1. Input Setup & Front Partition Strategy',
    phase: 'SETUP',
    codeLine: 20,
    arr: [1, 15, 7, 9, 2, 5, 10],
    k: 3,
    activeIdx: 0,
    currLen: 0,
    maxValInChunk: 0,
    activeChunk: [],
    partitions: [],
    transformedArr: [1, 15, 7, 9, 2, 5, 10],
    totalSum: 0,
    action: 'arr = [1, 15, 7, 9, 2, 5, 10], k = 3. Strategy: at each index i, evaluate partition lengths 1..k.',
    explain: 'We want to group elements into contiguous partitions of size at most k=3. In each partition, every element transforms into the maximum element of that partition. We start our decision at index i = 0.',
    intuition: 'A single large number like 15 can lift up to k elements around it!'
  },
  {
    title: '2. Index 0, Choice len = 1: [1]',
    phase: 'EVAL_CHOICE',
    codeLine: 26,
    arr: [1, 15, 7, 9, 2, 5, 10],
    k: 3,
    activeIdx: 0,
    currLen: 1,
    maxValInChunk: 1,
    activeChunk: [0],
    partitions: [],
    transformedArr: [1, 15, 7, 9, 2, 5, 10],
    totalSum: 1,
    action: 'Chunk: [1]. Length = 1, Max = 1. Contribution = 1 * 1 = 1 + solve(1).',
    explain: 'If we cut after length 1: the subarray [1] has max value 1. Contribution is 1 * 1 = 1. Remaining problem begins at index 1.',
    intuition: 'Length 1 isolates 1, which wastes the opportunity to elevate it using 15.'
  },
  {
    title: '3. Index 0, Choice len = 2: [1, 15]',
    phase: 'EVAL_CHOICE',
    codeLine: 26,
    arr: [1, 15, 7, 9, 2, 5, 10],
    k: 3,
    activeIdx: 0,
    currLen: 2,
    maxValInChunk: 15,
    activeChunk: [0, 1],
    partitions: [],
    transformedArr: [15, 15, 7, 9, 2, 5, 10],
    totalSum: 30,
    action: 'Chunk: [1, 15]. Length = 2, Max = 15. Contribution = 2 * 15 = 30 + solve(2).',
    explain: 'Expanding to length 2 encompasses 15! Running maxVal becomes 15. Both elements turn into 15. Contribution is 2 * 15 = 30. Remaining problem begins at index 2.',
    intuition: 'Transforming 1 into 15 gained 14 points immediately.'
  },
  {
    title: '4. Index 0, Choice len = 3: [1, 15, 7]',
    phase: 'EVAL_CHOICE',
    codeLine: 26,
    arr: [1, 15, 7, 9, 2, 5, 10],
    k: 3,
    activeIdx: 0,
    currLen: 3,
    maxValInChunk: 15,
    activeChunk: [0, 1, 2],
    partitions: [[0, 2]],
    transformedArr: [15, 15, 15, 9, 2, 5, 10],
    totalSum: 45,
    action: 'Chunk: [1, 15, 7]. Length = 3, Max = 15. Contribution = 3 * 15 = 45 + solve(3).',
    explain: 'Expanding to max allowed length k=3 encompasses [1, 15, 7]. Max is still 15! All three elements turn into 15: [15, 15, 15]. Contribution is 3 * 15 = 45. Remaining problem starts at index 3.',
    intuition: '45 is much larger than 1 and 30. Length 3 maximizes the influence of 15.'
  },
  {
    title: '5. Lock Partition 1: [1, 15, 7] -> 45',
    phase: 'LOCK_PARTITION',
    codeLine: 28,
    arr: [1, 15, 7, 9, 2, 5, 10],
    k: 3,
    activeIdx: 3,
    currLen: 0,
    maxValInChunk: 0,
    activeChunk: [],
    partitions: [[0, 2]],
    transformedArr: [15, 15, 15, 9, 2, 5, 10],
    totalSum: 45,
    action: 'Partition 1 locked: arr[0..2] -> [15, 15, 15]. Advance to index i = 3.',
    explain: 'First partition contributes 45. Now we transition to subproblem solve(3): finding optimal partitioning for remaining suffix [9, 2, 5, 10].',
    intuition: 'Notice how the problem state cleanly shifts from index 0 to index 3.'
  },
  {
    title: '6. Index 3: Exploring Choice len = 1: [9]',
    phase: 'EVAL_CHOICE',
    codeLine: 26,
    arr: [1, 15, 7, 9, 2, 5, 10],
    k: 3,
    activeIdx: 3,
    currLen: 1,
    maxValInChunk: 9,
    activeChunk: [3],
    partitions: [[0, 2]],
    transformedArr: [15, 15, 15, 9, 2, 5, 10],
    totalSum: 54,
    action: 'Chunk [9]: Length = 1, Max = 9. Contribution = 1 * 9 = 9 + solve(4).',
    explain: 'If we take [9] as an isolated length-1 chunk, it contributes 9. The remaining elements are [2, 5, 10], which can form their own length-3 partition.',
    intuition: 'Taking length 1 here leaves 3 elements [2, 5, 10] to be paired with 10!'
  },
  {
    title: '7. Comparing: len = 3 at Index 3 vs len = 1',
    phase: 'EVAL_CHOICE',
    codeLine: 28,
    arr: [1, 15, 7, 9, 2, 5, 10],
    k: 3,
    activeIdx: 3,
    currLen: 3,
    maxValInChunk: 9,
    activeChunk: [3, 4, 5],
    partitions: [[0, 2]],
    transformedArr: [15, 15, 15, 9, 9, 9, 10],
    totalSum: 72,
    action: 'Chunk [9, 2, 5]: 3 * 9 = 27, leaving [10] (10) -> Total = 45 + 27 + 10 = 82.',
    explain: 'Option A: Group [9, 2, 5] (3*9=27) and [10] (10) -> 45 + 27 + 10 = 82. Option B: Group [9] (9) and [2, 5, 10] (3*10=30) -> 45 + 9 + 30 = 84!',
    intuition: 'Dynamic programming evaluates all options: 84 > 82, so Option B is strictly better!'
  },
  {
    title: '8. Lock Partition 2: [9] -> 9',
    phase: 'LOCK_PARTITION',
    codeLine: 28,
    arr: [1, 15, 7, 9, 2, 5, 10],
    k: 3,
    activeIdx: 4,
    currLen: 0,
    maxValInChunk: 0,
    activeChunk: [],
    partitions: [[0, 2], [3, 3]],
    transformedArr: [15, 15, 15, 9, 2, 5, 10],
    totalSum: 54,
    action: 'Lock partition 2 as [9]. Contribution = 9. Suffix remaining: arr[4..6] = [2, 5, 10].',
    explain: 'By taking [9] as a single element, we preserve the remaining 3 elements [2, 5, 10] so that 10 can elevate both 2 and 5.',
    intuition: 'This is why greedy fails: taking 3 elements at index 3 wasted the power of 10.'
  },
  {
    title: '9. Partition 3: [2, 5, 10] Elevates to 10s',
    phase: 'EVAL_CHOICE',
    codeLine: 26,
    arr: [1, 15, 7, 9, 2, 5, 10],
    k: 3,
    activeIdx: 4,
    currLen: 3,
    maxValInChunk: 10,
    activeChunk: [4, 5, 6],
    partitions: [[0, 2], [3, 3], [4, 6]],
    transformedArr: [15, 15, 15, 9, 10, 10, 10],
    totalSum: 84,
    action: 'Chunk [2, 5, 10]: Length = 3, Max = 10. Contribution = 3 * 10 = 30.',
    explain: 'Elements 2, 5, and 10 are in the same partition! Max value is 10. All three transform into [10, 10, 10], contributing 3 * 10 = 30. Total sum reaches 45 + 9 + 30 = 84.',
    intuition: '2 and 5 are boosted by 8 and 5 points respectively.'
  },
  {
    title: '10. Base Case Reached (Index = N)',
    phase: 'BASE_CASE',
    codeLine: 22,
    arr: [1, 15, 7, 9, 2, 5, 10],
    k: 3,
    activeIdx: 7,
    currLen: 0,
    maxValInChunk: 0,
    activeChunk: [],
    partitions: [[0, 2], [3, 3], [4, 6]],
    transformedArr: [15, 15, 15, 9, 10, 10, 10],
    totalSum: 84,
    action: 'i == 7 == n. Return 0. Recursion unwinds with optimal subproblem values.',
    explain: 'All N elements partitioned. Three optimal chunks: [1, 15, 7] (sum 45) + [9] (sum 9) + [2, 5, 10] (sum 30). Total sum = 84.',
    intuition: 'Memoization table dp[i] caches these optimal suffix sums to prevent recalculation.'
  },
  {
    title: '11. Algorithm Complete & Complexity Summary',
    phase: 'COMPLETED',
    codeLine: 38,
    arr: [1, 15, 7, 9, 2, 5, 10],
    k: 3,
    activeIdx: -1,
    currLen: 0,
    maxValInChunk: 0,
    activeChunk: [],
    partitions: [[0, 2], [3, 3], [4, 6]],
    transformedArr: [15, 15, 15, 9, 10, 10, 10],
    totalSum: 84,
    action: 'Max Sum = 84. Time: O(N * K) | Space: O(N).',
    explain: 'The transformed array is [15, 15, 15, 9, 10, 10, 10], producing maximum sum 84. Total states is N, and each state loops at most K times. Complexity is strictly O(N * K).',
    intuition: 'Front partition pattern applies universally to word break, palindrome partitioning, and integer breaks.'
  }
];

export default function PartitionArrayForMaximumSumVisualizer({ currentStep = 0 }) {
  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-4 sm:p-6 space-y-6 select-none">
      {/* Top Header Metrics & Algorithmic Phase Badge */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-md border font-semibold uppercase text-[10px] ${
            step.phase === 'LOCK_PARTITION'
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : step.phase === 'EVAL_CHOICE'
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : step.phase === 'COMPLETED'
              ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
              : 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
          }`}>
            {step.phase}
          </span>
          {step.currLen > 0 && (
            <span className="px-2.5 py-1 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] text-cyan-300">
              Testing len = {step.currLen} (max={step.maxValInChunk})
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="px-2.5 py-1 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk)]">
            k = <strong className="text-cyan-400">{step.k}</strong>
          </span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
            Max Sum: {step.totalSum}
          </span>
        </div>
      </div>

      {/* Interactive Array Transformation & Partition View */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-5 sm:p-6 space-y-6 shadow-lg">
        {/* Original Input Array with Active Chunk Spotlight */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-2">
            <span className="uppercase tracking-wider font-semibold">1. Input Array &amp; Active Chunk</span>
            <span>index i = {step.activeIdx >= 0 ? step.activeIdx : 'done'}</span>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3 py-2 overflow-x-auto">
            {step.arr.map((val, idx) => {
              const inActiveChunk = step.activeChunk.includes(idx);
              const isStartIndex = step.activeIdx === idx;

              let cardStyle = 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk)]';

              if (inActiveChunk) {
                cardStyle = 'border-amber-400 bg-amber-500/25 text-amber-200 ring-2 ring-amber-400/60 scale-105 shadow-md font-bold';
              } else if (isStartIndex) {
                cardStyle = 'border-cyan-400 bg-cyan-500/20 text-cyan-200 ring-1 ring-cyan-400/50';
              }

              return (
                <div key={`orig-${idx}`} className="flex flex-col items-center gap-1.5 min-w-[42px] sm:min-w-[48px]">
                  <div className="h-4 flex items-center justify-center text-[10px] font-mono font-bold">
                    {isStartIndex ? (
                      <span className="text-cyan-400 animate-bounce">i▼</span>
                    ) : inActiveChunk ? (
                      <span className="text-amber-400">●</span>
                    ) : null}
                  </div>

                  <div className={`w-11 h-13 sm:w-13 sm:h-15 rounded-xl border flex flex-col items-center justify-center font-mono transition-all duration-200 ${cardStyle}`}>
                    <span className="text-lg sm:text-xl font-bold">{val}</span>
                  </div>

                  <span className="text-[10px] font-mono text-[var(--chalk-faint)]">[{idx}]</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transformed Boosted Array (Elements Elevated to Subarray Max) */}
        <div className="space-y-2 pt-2 border-t border-[var(--line)]">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--chalk-dim)] border-b border-[var(--line)] pb-2">
            <span className="uppercase tracking-wider font-semibold text-emerald-400">2. Transformed Array</span>
            <span className="text-emerald-300 font-bold">Running Sum = {step.totalSum}</span>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3 py-2 overflow-x-auto">
            {step.transformedArr.map((val, idx) => {
              const isElevated = val > step.arr[idx];
              const inLockedPartition = step.partitions.some(([start, end]) => idx >= start && idx <= end);

              let style = 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-dim)]';

              if (isElevated || inLockedPartition) {
                style = 'border-emerald-500/60 bg-emerald-500/20 text-emerald-300 font-bold ring-1 ring-emerald-500/40 shadow-sm';
              }

              return (
                <div key={`trans-${idx}`} className="flex flex-col items-center gap-1 min-w-[42px] sm:min-w-[48px]">
                  <div className={`w-11 h-13 sm:w-13 sm:h-15 rounded-xl border flex flex-col items-center justify-center font-mono transition-all duration-200 ${style}`}>
                    <span className="text-lg sm:text-xl">{val}</span>
                  </div>
                  {isElevated ? (
                    <span className="text-[9px] font-mono font-bold text-emerald-400">+{val - step.arr[idx]}</span>
                  ) : (
                    <span className="text-[9px] font-mono text-[var(--chalk-faint)]">same</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Partition Segment Badges */}
        {step.partitions.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap pt-2">
            <span className="text-xs font-mono text-[var(--chalk-dim)]">Formed Chunks:</span>
            {step.partitions.map(([s, e], pIdx) => {
              const chunkSlice = step.arr.slice(s, e + 1);
              const maxVal = Math.max(...chunkSlice);
              const len = e - s + 1;
              return (
                <span key={pIdx} className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                  [{chunkSlice.join(', ')}] → {len} × {maxVal} = {len * maxVal}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Action and Pedagogical Explanation Card */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-5 space-y-3 shadow-md">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
          <span>Action:</span>
          <span className="text-[var(--chalk)] font-normal">{step.action}</span>
        </div>
        <p className="text-xs sm:text-sm text-[var(--chalk-dim)] leading-relaxed font-sans">
          {step.explain}
        </p>
        <div className="pt-2 border-t border-[var(--line)] flex items-center gap-2 text-xs font-mono text-[var(--chalk-dim)]">
          <span className="text-indigo-400 font-bold">💡 Intuition:</span>
          <span>{step.intuition}</span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { VisualizerLayout, DualArrayTrack } from '../components/primitives';

export const meta = {
  title: 'Number of Longest Increasing Subsequences',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(N)',
  description: 'Finds the number of distinct longest increasing subsequences by maintaining two DP arrays: dp[i] (length of LIS ending at index i) and cnt[i] (count of such subsequences).'
};

export const ideaMap = {
  problemArchetype: 'DP on LIS / Dual State Tracking (Length & Multiplicity)',
  trigger: 'Problems asking not just for the length of an optimal structure, but the total count of distinct ways to achieve that maximum.',
  coreInsight: 'Standard LIS tracks max length dp[i]. To count ways, pair dp[i] with a count array cnt[i]. When extending an increasing subsequence from prev to i: If dp[prev] + 1 > dp[i], we found a strictly LONGER subsequence, so dp[i] updates and cnt[i] inherits cnt[prev]. If dp[prev] + 1 == dp[i], we found an ALTERNATIVE path of equal maximum length, so cnt[i] += cnt[prev].',
  naiveApproach: {
    title: 'Exhaustive Subsequence Generation',
    time: 'O(2^N)',
    space: 'O(N) recursion stack',
    bottleneck: 'Generating all 2^N subsequences, filtering for increasing ones, finding max length, and tallying count.'
  },
  optimalApproach: {
    title: 'Dual-Array DP (dp[i] and cnt[i])',
    time: 'O(N^2)',
    space: 'O(N) for dp and cnt arrays',
    breakthrough: 'Maintain length and multiplicity simultaneously in a single nested scan. Then sum cnt[i] for all i where dp[i] == maxLen.'
  },
  flowNodes: [
    { id: '1', title: 'Array Initialization', subtitle: 'dp = [1]*N, cnt = [1]*N', description: 'Every single element forms an increasing subsequence of length 1 in exactly 1 way.', tag: 'Setup' },
    { id: '2', title: 'Dual Loop Scan', subtitle: 'i from 0..N-1, prev 0..i-1', description: 'For each pair, check if nums[i] > nums[prev] to preserve strictly increasing order.', tag: 'Iteration' },
    { id: '3', title: 'Case 1: Greater Length', subtitle: 'dp[prev] + 1 > dp[i]', description: 'A new maximum length is found. dp[i] = dp[prev] + 1, and reset cnt[i] = cnt[prev].', tag: 'Overwrites' },
    { id: '4', title: 'Case 2: Equal Length', subtitle: 'dp[prev] + 1 == dp[i]', description: 'Another path reaches the same maximum length. Accumulate: cnt[i] += cnt[prev].', tag: 'Accumulates' },
    { id: '5', title: 'Global Tally', subtitle: 'sum(cnt[i]) for dp[i]==maxLen', description: 'Find the global max length, then sum all counts from indices that achieved it.', tag: 'Result' }
  ],
  pitfalls: [
    'Forgetting to reset cnt[i] when a strictly longer LIS is found: cnt[i] must be overwritten by cnt[prev], not added to.',
    'Only summing the last element: The global maximum length could be achieved at multiple different end indices.',
    'Strictly increasing condition: nums[i] must be strictly greater than nums[prev] (nums[i] > nums[prev]), not >=.'
  ],
  interviewCheatSheet: 'Maintain two arrays: if dp[prev] + 1 > dp[i] -> overwrite dp[i] and cnt[i] = cnt[prev]. If equal -> cnt[i] += cnt[prev].'
};

export const solutions = {
  cpp: `// C++ Number of Longest Increasing Subsequences
// Time: O(N^2) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int findNumberOfLIS(vector<int>& nums) {
        int n = nums.size();
        if (n <= 1) return n;

        vector<int> dp(n, 1);   // length of LIS ending at i
        vector<int> cnt(n, 1);  // count of LIS ending at i
        int maxLen = 1;

        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (nums[i] > nums[prev]) {
                    if (dp[prev] + 1 > dp[i]) {
                        // Strictly longer subsequence discovered
                        dp[i] = dp[prev] + 1;
                        cnt[i] = cnt[prev];
                    } else if (dp[prev] + 1 == dp[i]) {
                        // Alternative path with equal maximum length
                        cnt[i] += cnt[prev];
                    }
                }
            }
            maxLen = max(maxLen, dp[i]);
        }

        // Sum counts of all indices that achieved the max length
        int totalCount = 0;
        for (int i = 0; i < n; i++) {
            if (dp[i] == maxLen) {
                totalCount += cnt[i];
            }
        }
        return totalCount;
    }
};`,
  python: `# Python 3 Number of Longest Increasing Subsequences
# Time: O(N^2) | Space: O(N)
class Solution:
    def findNumberOfLIS(self, nums: list[int]) -> int:
        n = len(nums)
        if n <= 1:
            return n

        dp = [1] * n   # dp[i] = length of LIS ending at i
        cnt = [1] * n  # cnt[i] = count of LIS ending at i
        max_len = 1

        for i in range(n):
            for prev in range(i):
                if nums[i] > nums[prev]:
                    if dp[prev] + 1 > dp[i]:
                        dp[i] = dp[prev] + 1
                        cnt[i] = cnt[prev]
                    elif dp[prev] + 1 == dp[i]:
                        cnt[i] += cnt[prev]
            max_len = max(max_len, dp[i])

        return sum(c for length, c in zip(dp, cnt) if length == max_len)`,
  java: `// Java Number of Longest Increasing Subsequences
// Time: O(N^2) | Space: O(N)
import java.util.Arrays;

class Solution {
    public int findNumberOfLIS(int[] nums) {
        int n = nums.length;
        if (n <= 1) return n;

        int[] dp = new int[n];
        int[] cnt = new int[n];
        Arrays.fill(dp, 1);
        Arrays.fill(cnt, 1);
        int maxLen = 1;

        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (nums[i] > nums[prev]) {
                    if (dp[prev] + 1 > dp[i]) {
                        dp[i] = dp[prev] + 1;
                        cnt[i] = cnt[prev];
                    } else if (dp[prev] + 1 == dp[i]) {
                        cnt[i] += cnt[prev];
                    }
                }
            }
            maxLen = Math.max(maxLen, dp[i]);
        }

        int totalCount = 0;
        for (int i = 0; i < n; i++) {
            if (dp[i] == maxLen) {
                totalCount += cnt[i];
            }
        }
        return totalCount;
    }
}`,
  javascript: `// JavaScript Number of Longest Increasing Subsequences
// Time: O(N^2) | Space: O(N)
var findNumberOfLIS = function(nums) {
    const n = nums.length;
    if (n <= 1) return n;

    const dp = new Array(n).fill(1);
    const cnt = new Array(n).fill(1);
    let maxLen = 1;

    for (let i = 0; i < n; i++) {
        for (let prev = 0; prev < i; prev++) {
            if (nums[i] > nums[prev]) {
                if (dp[prev] + 1 > dp[i]) {
                    dp[i] = dp[prev] + 1;
                    cnt[i] = cnt[prev];
                } else if (dp[prev] + 1 == dp[i]) {
                    cnt[i] += cnt[prev];
                }
            }
        }
        maxLen = Math.max(maxLen, dp[i]);
    }

    let totalCount = 0;
    for (let i = 0; i < n; i++) {
        if (dp[i] === maxLen) {
            totalCount += cnt[i];
        }
    }
    return totalCount;
};`
};

export const steps = [
  {
    phase: 'SETUP',
    nums: [1, 3, 5, 4, 7],
    dp: [1, 1, 1, 1, 1],
    cnt: [1, 1, 1, 1, 1],
    activeI: null,
    activePrev: null,
    maxLen: 1,
    formula: 'dp[i] = length of LIS ending at i | cnt[i] = number of ways to achieve dp[i]',
    action: 'Initialize nums = [1, 3, 5, 4, 7], dp = [1, 1, 1, 1, 1], and cnt = [1, 1, 1, 1, 1].',
    explain: 'Every single element is an increasing subsequence of length 1 in exactly 1 way. We will systematically scan pairs (i, prev) with i > prev.',
    intuition: 'Tracking both length and frequency solves multiplicity without needing to generate subsequences.'
  },
  {
    phase: 'BASE_ELEMENT',
    nums: [1, 3, 5, 4, 7],
    dp: [1, 1, 1, 1, 1],
    cnt: [1, 1, 1, 1, 1],
    activeI: 0,
    activePrev: null,
    maxLen: 1,
    formula: 'dp[0] = 1, cnt[0] = 1 (subsequence: [1])',
    action: 'Index 0 (val = 1): No previous elements. dp[0] = 1, cnt[0] = 1.',
    explain: 'First element has no predecessors. Max length ending at index 0 is 1 with count 1.',
    intuition: 'The simplest base case.'
  },
  {
    phase: 'LENGTH_EXTENSION',
    nums: [1, 3, 5, 4, 7],
    dp: [1, 2, 1, 1, 1],
    cnt: [1, 1, 1, 1, 1],
    activeI: 1,
    activePrev: 0,
    maxLen: 2,
    formula: 'nums[1] (3) > nums[0] (1) -> dp[0] + 1 = 2 > dp[1] (1)',
    action: 'Index 1 (val = 3), prev = 0 (val = 1): 3 > 1. Length increases to 2!',
    explain: 'Since nums[1] > nums[0], we can extend the LIS ending at 0. dp[0] + 1 = 2 > dp[1]. Case 1 applies: dp[1] = 2, cnt[1] = cnt[0] = 1.',
    intuition: 'When a strictly longer length is discovered, cnt[i] inherits cnt[prev].'
  },
  {
    phase: 'SCANNING_PREV',
    nums: [1, 3, 5, 4, 7],
    dp: [1, 2, 2, 1, 1],
    cnt: [1, 1, 1, 1, 1],
    activeI: 2,
    activePrev: 0,
    maxLen: 2,
    formula: 'nums[2] (5) > nums[0] (1) -> dp[0] + 1 = 2 > dp[2] (1)',
    action: 'Index 2 (val = 5), prev = 0 (val = 1): 5 > 1. Length extends to 2.',
    explain: 'Comparing nums[2]=5 with nums[0]=1. Since 5 > 1, dp[2] becomes dp[0] + 1 = 2, cnt[2] = cnt[0] = 1. Subsequence: [1, 5].',
    intuition: 'Inner loop continues to test prev = 1.'
  },
  {
    phase: 'LENGTH_EXTENSION',
    nums: [1, 3, 5, 4, 7],
    dp: [1, 2, 3, 1, 1],
    cnt: [1, 1, 1, 1, 1],
    activeI: 2,
    activePrev: 1,
    maxLen: 3,
    formula: 'nums[2] (5) > nums[1] (3) -> dp[1] + 1 = 3 > dp[2] (2)',
    action: 'Index 2 (val = 5), prev = 1 (val = 3): 5 > 3. Length increases to 3!',
    explain: 'Comparing nums[2]=5 with nums[1]=3. 5 > 3, and dp[1] + 1 = 3 > dp[2] (2). Case 1 applies: dp[2] = 3, cnt[2] = cnt[1] = 1. Subsequence: [1, 3, 5].',
    intuition: 'Extending through 3 gave a longer subsequence than jumping directly from 1.'
  },
  {
    phase: 'LENGTH_EXTENSION',
    nums: [1, 3, 5, 4, 7],
    dp: [1, 2, 3, 3, 1],
    cnt: [1, 1, 1, 1, 1],
    activeI: 3,
    activePrev: 1,
    maxLen: 3,
    formula: 'nums[3] (4) > nums[1] (3) -> dp[1] + 1 = 3 > dp[3] (2)',
    action: 'Index 3 (val = 4), prev = 1 (val = 3): Length reaches 3!',
    explain: 'After comparing with prev=0 (dp=2), we compare nums[3]=4 with nums[1]=3. 4 > 3, and dp[1] + 1 = 3 > dp[3]. Case 1 applies: dp[3] = 3, cnt[3] = 1. Subsequence: [1, 3, 4].',
    intuition: 'Both index 2 (val 5) and index 3 (val 4) have achieved LIS length 3.'
  },
  {
    phase: 'NEW_GLOBAL_MAX',
    nums: [1, 3, 5, 4, 7],
    dp: [1, 2, 3, 3, 4],
    cnt: [1, 1, 1, 1, 1],
    activeI: 4,
    activePrev: 2,
    maxLen: 4,
    formula: 'nums[4] (7) > nums[2] (5) -> dp[2] + 1 = 4 > dp[4] (3)',
    action: 'Index 4 (val = 7), prev = 2 (val = 5): 7 > 5. New max length 4 found!',
    explain: 'Comparing nums[4]=7 with nums[2]=5. 7 > 5, and dp[2] + 1 = 4 > dp[4]. Case 1 applies: dp[4] = 4, cnt[4] = cnt[2] = 1. Subsequence: [1, 3, 5, 7].',
    intuition: 'Candidate 1 for max length 4 is found: [1, 3, 5, 7].'
  },
  {
    phase: 'EQUAL_MATCH_DISCOVERY',
    nums: [1, 3, 5, 4, 7],
    dp: [1, 2, 3, 3, 4],
    cnt: [1, 1, 1, 1, 1],
    activeI: 4,
    activePrev: 3,
    maxLen: 4,
    formula: 'nums[4] (7) > nums[3] (4) -> dp[3] + 1 = 4 == dp[4] (4) (EQUAL LENGTH MATCH!)',
    action: 'Index 4 (val = 7), prev = 3 (val = 4): 7 > 4 and dp[3] + 1 == dp[4] == 4!',
    explain: 'nums[4] (7) > nums[3] (4). Now notice: dp[3] + 1 = 3 + 1 = 4, which is EQUAL to current dp[4] (4)! We have discovered an independent alternative route to length 4: [1, 3, 4, 7]!',
    intuition: 'This is the key insight of the algorithm: Case 2 triggers when an alternative path achieves the exact same maximum length.'
  },
  {
    phase: 'COUNT_ACCUMULATION',
    nums: [1, 3, 5, 4, 7],
    dp: [1, 2, 3, 3, 4],
    cnt: [1, 1, 1, 1, 2],
    activeI: 4,
    activePrev: 3,
    maxLen: 4,
    formula: 'Case 2: cnt[4] += cnt[3] -> cnt[4] = 1 + 1 = 2 ways!',
    action: 'Case 2 applied: cnt[4] += cnt[3] -> cnt[4] becomes 2!',
    explain: 'Because both paths [1, 3, 5, 7] and [1, 3, 4, 7] terminate at index 4, we add the counts: cnt[4] = 1 + cnt[3] (1) = 2. Two distinct LIS of length 4 end at index 4.',
    intuition: 'Multiplicity is captured without building the full tree of paths.'
  },
  {
    phase: 'GLOBAL_AGGREGATION',
    nums: [1, 3, 5, 4, 7],
    dp: [1, 2, 3, 3, 4],
    cnt: [1, 1, 1, 1, 2],
    activeI: null,
    activePrev: null,
    maxLen: 4,
    formula: 'maxLen = max(dp) = 4 | sum(cnt[i] for dp[i] == 4) = cnt[4] = 2',
    action: 'Tally total count across all indices achieving maxLen = 4.',
    explain: 'The maximum LIS length is 4. Scanning the dp array for all indices where dp[i] == 4: only index 4 has dp[4] = 4, with cnt[4] = 2. Total count = 2.',
    intuition: 'If another index also had dp[i] == 4, its cnt[i] would also be added to totalCount.'
  },
  {
    phase: 'COMPLETED',
    nums: [1, 3, 5, 4, 7],
    dp: [1, 2, 3, 3, 4],
    cnt: [1, 1, 1, 1, 2],
    activeI: null,
    activePrev: null,
    maxLen: 4,
    formula: 'Result: 2 Longest Increasing Subsequences ([1,3,5,7] and [1,3,4,7])',
    action: 'Algorithm Complete! Returned total count = 2 in O(N^2) time and O(N) space.',
    explain: 'By maintaining parallel dp and cnt arrays, we tracked both the optimal length and the number of paths achieving it in a single O(N^2) pass. Space complexity is O(N).',
    intuition: 'Tracking state + multiplicity is a fundamental DP pattern appearing in counting shortest paths, DAG ways, and sequence problems.'
  }
];

export default function NumberOfLongestIncreasingSubsequencesVisualizer({ currentStep = 0 }) {
  const stepIdx = Math.min(Math.max(0, currentStep), steps.length - 1);
  const step = steps[stepIdx] || steps[0];

  const tracks = [
    { label: 'nums[i]', items: step.nums },
    { label: 'dp[i] (length)', items: step.dp },
    { label: 'cnt[i] (ways)', items: step.cnt }
  ];

  return (
    <VisualizerLayout
      phase={step.phase}
      activeLabel={step.activeI !== null ? `Scanning: i = ${step.activeI}` : 'Complete'}
      metrics={[
        { label: 'Max Length', value: step.maxLen, highlight: true },
        { label: 'Active i', value: step.activeI !== null ? step.activeI : '—' },
        { label: 'Active prev', value: step.activePrev !== null ? step.activePrev : '—' },
        { label: 'Total Ways', value: step.phase === 'COMPLETED' ? 2 : 'Tracking...' }
      ]}
      formula={step.formula}
      action={step.action}
      explain={step.explain}
      intuition={step.intuition}
    >
      <div className="w-full space-y-4">
        {/* Dual Aligned Array Tracks */}
        <DualArrayTrack
          tracks={tracks}
          activeI={step.activeI}
          activePrev={step.activePrev}
          title="Synchronized LIS Length & Frequency State"
        />

        {/* Dynamic Branching Decision Rule Card */}
        <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 shadow-sm font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-[var(--chalk-dim)] border-b border-[var(--line)] pb-1.5">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Branching Decision Rules</span>
            <span className="text-[var(--accent)] text-[10px]">When nums[i] &gt; nums[prev]</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <div className="p-2.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)]">
              <span className="text-[var(--accent-bright)] font-bold block mb-1">Case 1: dp[prev] + 1 &gt; dp[i]</span>
              <p className="text-[11px] text-[var(--chalk-dim)] font-sans">
                Found strictly longer LIS! Overwrite: <code className="text-[var(--chalk)]">dp[i] = dp[prev] + 1</code>, <code className="text-[var(--chalk)]">cnt[i] = cnt[prev]</code>.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)]">
              <span className="text-emerald-400 font-bold block mb-1">Case 2: dp[prev] + 1 == dp[i]</span>
              <p className="text-[11px] text-[var(--chalk-dim)] font-sans">
                Found alternative path of same length! Accumulate: <code className="text-[var(--chalk)]">cnt[i] += cnt[prev]</code>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </VisualizerLayout>
  );
}

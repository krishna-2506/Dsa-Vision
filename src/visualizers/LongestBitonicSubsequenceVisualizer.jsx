import React from 'react';

export const meta = {
  title: 'Longest Bitonic Subsequence',
  category: 'Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(N)',
  description: 'Calculates the length of the longest bitonic subsequence (a sequence that strictly increases then strictly decreases). Combines left-to-right LIS and right-to-left LIS (LDS) around an optimal peak element: Max Bitonic = max(dp1[i] + dp2[i] - 1).'
};

export const solutions = {
  cpp: `// C++ Longest Bitonic Subsequence
// Time: O(N^2) | Space: O(N)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int LongestBitonicSequence(int n, vector<int>& nums) {
        vector<int> dp1(n, 1); // LIS from left
        vector<int> dp2(n, 1); // LIS from right (LDS)

        // Compute LIS from left to right
        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (nums[prev] < nums[i]) {
                    dp1[i] = max(dp1[i], 1 + dp1[prev]);
                }
            }
        }

        // Compute LIS from right to left
        for (int i = n - 1; i >= 0; i--) {
            for (int prev = n - 1; prev > i; prev--) {
                if (nums[prev] < nums[i]) {
                    dp2[i] = max(dp2[i], 1 + dp2[prev]);
                }
            }
        }

        int maxBitonic = 0;
        for (int i = 0; i < n; i++) {
            maxBitonic = max(maxBitonic, dp1[i] + dp2[i] - 1);
        }

        return maxBitonic;
    }
};`,
  python: `# Python 3 Longest Bitonic Subsequence
# Time: O(N^2) | Space: O(N)
class Solution:
    def LongestBitonicSequence(self, n: int, nums: list[int]) -> int:
        dp1 = [1] * n
        dp2 = [1] * n

        # Left to right LIS
        for i in range(n):
            for prev in range(i):
                if nums[prev] < nums[i]:
                    dp1[i] = max(dp1[i], 1 + dp1[prev])

        # Right to left LIS (LDS)
        for i in range(n - 1, -1, -1):
            for prev in range(n - 1, i, -1):
                if nums[prev] < nums[i]:
                    dp2[i] = max(dp2[i], 1 + dp2[prev])

        max_bitonic = 0
        for i in range(n):
            max_bitonic = max(max_bitonic, dp1[i] + dp2[i] - 1)

        return max_bitonic`,
  java: `// Java Longest Bitonic Subsequence
// Time: O(N^2) | Space: O(N)
import java.util.Arrays;

class Solution {
    public int LongestBitonicSequence(int n, int[] nums) {
        int[] dp1 = new int[n];
        int[] dp2 = new int[n];
        Arrays.fill(dp1, 1);
        Arrays.fill(dp2, 1);

        for (int i = 0; i < n; i++) {
            for (int prev = 0; prev < i; prev++) {
                if (nums[prev] < nums[i]) {
                    dp1[i] = Math.max(dp1[i], 1 + dp1[prev]);
                }
            }
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int prev = n - 1; prev > i; prev--) {
                if (nums[prev] < nums[i]) {
                    dp2[i] = Math.max(dp2[i], 1 + dp2[prev]);
                }
            }
        }

        int maxBitonic = 0;
        for (int i = 0; i < n; i++) {
            maxBitonic = Math.max(maxBitonic, dp1[i] + dp2[i] - 1);
        }

        return maxBitonic;
    }
}`,
  javascript: `// JavaScript Longest Bitonic Subsequence
// Time: O(N^2) | Space: O(N)
var LongestBitonicSequence = function(n, nums) {
    const dp1 = new Array(n).fill(1);
    const dp2 = new Array(n).fill(1);

    for (let i = 0; i < n; i++) {
        for (let prev = 0; prev < i; prev++) {
            if (nums[prev] < nums[i]) {
                dp1[i] = Math.max(dp1[i], 1 + dp1[prev]);
            }
        }
    }

    for (let i = n - 1; i >= 0; i--) {
        for (let prev = n - 1; prev > i; prev--) {
            if (nums[prev] < nums[i]) {
                dp2[i] = Math.max(dp2[i], 1 + dp2[prev]);
            }
        }
    }

    let maxBitonic = 0;
    for (let i = 0; i < n; i++) {
        maxBitonic = Math.max(maxBitonic, dp1[i] + dp2[i] - 1);
    }

    return maxBitonic;
};`
};

export const steps = [
  {
    title: '1. Array: [1, 11, 2, 10, 4, 5, 2, 1], Setup dp1 and dp2',
    phase: 'INITIAL',
    codeLine: 12,
    nums: [1, 11, 2, 10, 4, 5, 2, 1],
    dp1: [1, 1, 1, 1, 1, 1, 1, 1],
    dp2: [1, 1, 1, 1, 1, 1, 1, 1],
    peakIndex: null,
    maxBitonic: 1,
    variables: { n: 8, formula: 'Bitonic at peak i = dp1[i] + dp2[i] - 1' },
    explain: 'dp1[i] stores the LIS ending at index i (increasing uphill). dp2[i] stores the LDS starting at index i (decreasing downhill).',
    intuition: 'Each element can act as a mountain peak where the uphill and downhill slopes meet.'
  },
  {
    title: '2. Left-to-Right LIS (dp1): Uphill slopes computed',
    phase: 'DP1_PASS',
    codeLine: 16,
    nums: [1, 11, 2, 10, 4, 5, 2, 1],
    dp1: [1, 2, 2, 3, 3, 4, 2, 1],
    dp2: [1, 1, 1, 1, 1, 1, 1, 1],
    peakIndex: null,
    maxBitonic: 1,
    variables: { 'dp1 (uphill)': '[1, 2, 2, 3, 3, 4, 2, 1]' },
    explain: 'dp1 values: index 3 (val 10) reaches length 3 ([1, 2, 10]). Index 5 (val 5) reaches length 4 ([1, 2, 4, 5]).',
    intuition: 'Captures all possible upward climbs.'
  },
  {
    title: '3. Right-to-Left LDS (dp2): Downhill slopes computed',
    phase: 'DP2_PASS',
    codeLine: 25,
    nums: [1, 11, 2, 10, 4, 5, 2, 1],
    dp1: [1, 2, 2, 3, 3, 4, 2, 1],
    dp2: [1, 5, 2, 4, 3, 3, 2, 1],
    peakIndex: 3,
    maxBitonic: 6,
    variables: { 'dp2 (downhill)': '[1, 5, 2, 4, 3, 3, 2, 1]', peakCandidate: 'Peak at val 10: dp1=3, dp2=4' },
    explain: 'From index 3 (val 10): downhill steps to 4 -> 2 -> 1 gives dp2[3] = 4.',
    intuition: 'Captures all downward descents.'
  },
  {
    title: '4. Peak at Index 3 (Val 10): 3 + 4 - 1 = 6 (Max Bitonic Subsequence)',
    phase: 'COMPLETED',
    codeLine: 35,
    nums: [1, 11, 2, 10, 4, 5, 2, 1],
    dp1: [1, 2, 2, 3, 3, 4, 2, 1],
    dp2: [1, 5, 2, 4, 3, 3, 2, 1],
    peakIndex: 3,
    maxBitonic: 6,
    bitonicSeq: [1, 2, 10, 4, 2, 1],
    variables: { maxBitonicLength: 6, optimalPeak: 'Index 3 (value 10)', sequence: '[1, 2, 10, 4, 2, 1]' },
    explain: 'Peak element 10 yields: dp1[3] = 3 ([1, 2, 10]) + dp2[3] = 4 ([10, 4, 2, 1]) - 1 = 6. Maximum Bitonic Subsequence is [1, 2, 10, 4, 2, 1]!',
    intuition: 'Subtracting 1 avoids double-counting the shared peak element.'
  }
];

export default function LongestBitonicSubsequenceVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Optimal Peak: {step.peakIndex !== null ? `Val ${step.nums[step.peakIndex]} (#${step.peakIndex})` : 'Computing...'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Bitonic Length: {step.maxBitonic}
        </span>
      </div>

      {/* Mountain Trajectory Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Bitonic Peak & Slope Alignment
        </span>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {step.nums.map((num, idx) => {
            const isPeak = idx === step.peakIndex;
            const inSeq = step.bitonicSeq && step.bitonicSeq.includes(num);

            return (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-14 h-22 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 ${
                    isPeak
                      ? 'border-amber-500 bg-amber-500/30 text-amber-300 ring-2 ring-amber-500/40 shadow-lg scale-105'
                      : inSeq
                      ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300'
                      : 'border-[#272b3c] bg-[#161824] text-slate-500'
                  }`}
                >
                  <span className="text-[9px] text-[#8a8ea3]">#{idx}</span>
                  <span className="text-sm font-bold mt-0.5">{num}</span>
                  <div className="flex items-center gap-1 mt-1 text-[8px] font-mono">
                    <span className="text-cyan-400">↑{step.dp1[idx]}</span>
                    <span className="text-pink-400">↓{step.dp2[idx]}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Peak formula breakdown */}
        {step.peakIndex !== null && (
          <div className="w-full max-w-md bg-[#161824] border border-[#272b3c] rounded-xl p-3 flex items-center justify-around text-xs font-mono">
            <span className="text-cyan-400 font-semibold">Uphill (dp1): {step.dp1[step.peakIndex]}</span>
            <span className="text-slate-500 font-bold">+</span>
            <span className="text-pink-400 font-semibold">Downhill (dp2): {step.dp2[step.peakIndex]}</span>
            <span className="text-slate-500 font-bold">− 1 =</span>
            <span className="text-emerald-300 font-bold text-sm">{step.maxBitonic}</span>
          </div>
        )}
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

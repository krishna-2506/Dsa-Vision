import React from 'react';

export const meta = {
  title: "Kadane's Algorithm — Maximum Subarray Sum",
  category: 'Arrays & Dynamic Programming',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the contiguous subarray within a one-dimensional array of numbers which has the largest sum. Drops any prefix with a negative running sum.'
};

export const solutions = {
  cpp: `// C++ Kadane's Algorithm (Optimal Single Pass)
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
#include <climits>
using namespace std;

class Solution {
public:
    long long maxSubarraySum(vector<int>& arr, int n) {
        long long maxi = LONG_MIN;
        long long sum = 0;

        for (int i = 0; i < n; i++) {
            sum += arr[i];

            if (sum > maxi) {
                maxi = sum;
            }

            // If running sum becomes negative, reset to 0 (drop harmful prefix)
            if (sum < 0) {
                sum = 0;
            }
        }
        return maxi;
    }
};`,
  python: `# Python 3 Kadane's Algorithm
class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        max_sum = float('-inf')
        current_sum = 0
        
        for x in nums:
            current_sum += x
            if current_sum > max_sum:
                max_sum = current_sum
            if current_sum < 0:
                current_sum = 0
                
        return max_sum`,
  java: `// Java Kadane's Algorithm
class Solution {
    public long maxSubarraySum(int[] arr, int n) {
        long maxi = Long.MIN_VALUE;
        long sum = 0;

        for (int i = 0; i < n; i++) {
            sum += arr[i];

            if (sum > maxi) {
                maxi = sum;
            }

            if (sum < 0) {
                sum = 0;
            }
        }
        return maxi;
    }
}`,
  javascript: `// JavaScript Kadane's Algorithm
var maxSubArray = function(nums) {
    let maxi = -Infinity;
    let sum = 0;
    
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        if (sum > maxi) maxi = sum;
        if (sum < 0) sum = 0;
    }
    return maxi;
};`
};

export const steps = [
  {
    title: '1. Initialize: sum = 0, maxi = -∞',
    phase: 'INITIALIZATION',
    codeLine: 10,
    array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    currentIdx: 0,
    currentSum: -2,
    maxSum: -2,
    activeWindow: [0, 0],
    bestWindow: [0, 0],
    resetOccurred: false,
    variables: { i: 0, 'arr[0]': -2, sum: -2, maxi: -2 },
    explain: 'Start at index 0. Add arr[0] = -2 to sum. maxi becomes -2.',
    intuition: 'We must consider at least one element. If sum < 0, continuing will only drag down future sums.'
  },
  {
    title: '2. Negative Prefix: Reset sum = 0',
    phase: 'RESET_PREFIX',
    codeLine: 20,
    array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    currentIdx: 0,
    currentSum: 0,
    maxSum: -2,
    activeWindow: [],
    bestWindow: [0, 0],
    resetOccurred: true,
    variables: { sum: 0, action: 'Drop -2 prefix' },
    explain: 'sum is negative (-2). Carrying a negative sum into the next index decreases its potential, so reset sum = 0.',
    intuition: 'A negative running sum cannot be part of an optimal subarray prefix.'
  },
  {
    title: '3. Process arr[1] = 1: sum = 1, maxi = 1',
    phase: 'EXTENDING',
    codeLine: 16,
    array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    currentIdx: 1,
    currentSum: 1,
    maxSum: 1,
    activeWindow: [1, 1],
    bestWindow: [1, 1],
    resetOccurred: false,
    variables: { i: 1, 'arr[1]': 1, sum: 1, maxi: 1 },
    explain: 'Start fresh from index 1. sum = 0 + 1 = 1. New maxi = 1. Best subarray so far is [1].',
    intuition: 'Positive running sums are retained because they can benefit subsequent elements.'
  },
  {
    title: '4. Encounter 4: Build Super-Subarray',
    phase: 'PEAK_BUILDING',
    codeLine: 16,
    array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    currentIdx: 3,
    currentSum: 4,
    maxSum: 4,
    activeWindow: [3, 3],
    bestWindow: [3, 3],
    resetOccurred: false,
    variables: { i: 3, 'arr[3]': 4, sum: 4, maxi: 4 },
    explain: 'After another reset at index 2 (1 + -3 = -2), index 3 has value 4. sum = 4, maxi = 4.',
    intuition: 'The start of the true optimal window emerges at index 3.'
  },
  {
    title: '5. Peak Window: [4, -1, 2, 1] Sum = 6',
    phase: 'MAXIMUM_FOUND',
    codeLine: 16,
    array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    currentIdx: 6,
    currentSum: 6,
    maxSum: 6,
    activeWindow: [3, 6],
    bestWindow: [3, 6],
    resetOccurred: false,
    variables: { i: 6, 'arr[6]': 1, sum: 6, maxi: 6, bestSubarray: '[4, -1, 2, 1]' },
    explain: 'Adding 4 + (-1) + 2 + 1 yields sum = 6! This sets the global peak maximum sum = 6.',
    intuition: 'Even though -1 dipped the sum to 3, the subsequent +2 and +1 propelled it to a new high.'
  },
  {
    title: '6. Algorithm Complete: Max Sum = 6',
    phase: 'COMPLETED',
    codeLine: 23,
    array: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    currentIdx: 8,
    currentSum: 5,
    maxSum: 6,
    activeWindow: [8, 8],
    bestWindow: [3, 6],
    resetOccurred: false,
    variables: { finalMaxSum: 6, optimalIndices: '3 to 6', numbers: '4, -1, 2, 1' },
    explain: 'Array traversal finished in single O(N) pass. The maximum contiguous subarray sum is 6 (subarray indices 3 through 6).',
    intuition: 'Kadanes algorithm computes maximum contiguous sum in strictly O(N) time and O(1) space.'
  }
];

export default function KadanesAlgorithmVisualizer({ currentStep = 0, onStepChange }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* HUD Scoreboards */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <div className="px-4 py-2.5 rounded-xl bg-[#14151b] border border-[#232530] text-center min-w-[120px]">
          <span className="text-[10px] font-mono text-[#8e92a4] uppercase block">Running Sum</span>
          <span className={`text-xl font-mono font-bold ${step.currentSum < 0 ? 'text-rose-400' : 'text-indigo-400'}`}>
            {step.currentSum}
          </span>
        </div>

        <div className="px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-center min-w-[130px]">
          <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold block">Max Sum (maxi)</span>
          <span className="text-xl font-mono font-bold text-emerald-300">
            {step.maxSum}
          </span>
        </div>

        {step.resetOccurred && (
          <div className="px-3 py-1 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 font-mono text-xs animate-pulse">
            ⚠ Negative prefix dropped (sum ➔ 0)
          </div>
        )}
      </div>

      {/* Array Elements Visualizer with Window Highlighting */}
      <div className="w-full flex items-center justify-center gap-2.5 py-4 overflow-x-auto">
        {step.array.map((val, idx) => {
          const isCurrent = step.currentIdx === idx;
          const inActiveWindow = step.activeWindow.length === 2 && idx >= step.activeWindow[0] && idx <= step.activeWindow[1];
          const inBestWindow = step.bestWindow.length === 2 && idx >= step.bestWindow[0] && idx <= step.bestWindow[1];

          let borderStyle = 'border-[#262834] bg-[#14151c] text-[#8e92a4]';
          if (inBestWindow) borderStyle = 'border-emerald-500 bg-emerald-500/15 text-emerald-300 shadow-md shadow-emerald-500/20 scale-105';
          else if (inActiveWindow) borderStyle = 'border-indigo-500 bg-indigo-500/20 text-indigo-300 scale-105';
          else if (isCurrent) borderStyle = 'border-amber-500 bg-amber-500/15 text-amber-300';

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[48px]">
              <div className="h-4 flex items-center justify-center">
                {isCurrent && <span className="text-[10px] font-mono text-amber-400 font-bold">i↓</span>}
              </div>
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono font-bold text-sm transition-all duration-300 ${borderStyle}`}>
                {val}
              </div>
              <span className="text-[10px] font-mono text-[#5b5e6e]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-[#8e92a4]">Best Maximum Subarray</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
          <span className="text-[#8e92a4]">Current Window</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="text-[#8e92a4]">Pointer i</span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Split Array Largest Sum',
  category: 'Binary Search on Answers',
  difficulty: 'Hard',
  timeComplexity: 'O(N * log(sum - max))',
  spaceComplexity: 'O(1)',
  description: 'Splits array into K contiguous subarrays such that the largest sum among all subarrays is minimized using binary search.'
};

export const solutions = {
  cpp: `// C++ Split Array Largest Sum using Binary Search
// Time Complexity: O(N * log(sum - max)) | Space Complexity: O(1)
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

class Solution {
private:
    int countSubarrays(const vector<int>& nums, int maxSum) {
        int count = 1;
        long long currentSum = 0;
        for (int x : nums) {
            if (currentSum + x <= maxSum) {
                currentSum += x;
            } else {
                count++;
                currentSum = x;
            }
        }
        return count;
    }

public:
    int splitArray(vector<int>& nums, int k) {
        int low = *max_element(nums.begin(), nums.end());
        int high = accumulate(nums.begin(), nums.end(), 0);
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int pieces = countSubarrays(nums, mid);

            if (pieces <= k) {
                ans = mid;
                high = mid - 1; // Try smaller maximum sum
            } else {
                low = mid + 1;  // Allowed sum is too small
            }
        }
        return ans;
    }
};`,
  python: `# Python 3 Split Array Largest Sum using Binary Search
class Solution:
    def splitArray(self, nums: list[int], k: int) -> int:
        low = max(nums)
        high = sum(nums)
        ans = high

        def count_subarrays(max_sum: int) -> int:
            count = 1
            curr = 0
            for x in nums:
                if curr + x <= max_sum:
                    curr += x
                else:
                    count += 1
                    curr = x
            return count

        while low <= high:
            mid = (low + high) // 2
            if count_subarrays(mid) <= k:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans`,
  java: `// Java Split Array Largest Sum using Binary Search
import java.util.Arrays;

class Solution {
    private int countSubarrays(int[] nums, int maxSum) {
        int count = 1;
        int currentSum = 0;
        for (int x : nums) {
            if (currentSum + x <= maxSum) {
                currentSum += x;
            } else {
                count++;
                currentSum = x;
            }
        }
        return count;
    }

    public int splitArray(int[] nums, int k) {
        int low = Arrays.stream(nums).max().getAsInt();
        int high = Arrays.stream(nums).sum();
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (countSubarrays(nums, mid) <= k) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
}`,
  javascript: `// JavaScript Split Array Largest Sum using Binary Search
var splitArray = function(nums, k) {
    let low = Math.max(...nums);
    let high = nums.reduce((a, b) => a + b, 0);
    let ans = high;

    function countSubarrays(maxSum) {
        let count = 1;
        let curr = 0;
        for (const x of nums) {
            if (curr + x <= maxSum) {
                curr += x;
            } else {
                count++;
                curr = x;
            }
        }
        return count;
    }

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (countSubarrays(mid) <= k) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
};`
};

export const steps = [
  {
    title: '1. Array: [7, 2, 5, 10, 8], K = 2 Subarrays',
    phase: 'INITIAL',
    codeLine: 26,
    nums: [7, 2, 5, 10, 8],
    k: 2,
    low: 10,
    high: 32,
    mid: null,
    pieces: null,
    ans: 32,
    variables: { low: 'max = 10', high: 'sum = 32', k: 2 },
    explain: 'We partition the array into at most 2 contiguous subarrays. Search range for max subarray sum is [10 ... 32].',
    intuition: 'Monotonic relationship between max allowable sum and required subarrays count.'
  },
  {
    title: '2. Try Max Sum = 21: Subarrays Needed = 2 ≤ 2 -> Feasible! ans = 21, high = 20',
    phase: 'TEST_CAPACITY',
    codeLine: 31,
    nums: [7, 2, 5, 10, 8],
    k: 2,
    low: 10,
    high: 20,
    mid: 21,
    pieces: 2,
    ans: 21,
    variables: { mid: 21, pieces: 2, limitK: 2, action: 'ans = 21, try smaller high = 20' },
    explain: 'With threshold 21: Subarray 1: [7, 2, 5]=14; Subarray 2: [10, 8]=18. Exactly 2 pieces <= 2! Update ans = 21, high = 20.',
    intuition: 'Feasible partition.'
  },
  {
    title: '3. Try Max Sum = 15: Subarrays Needed = 3 > 2 -> Infeasible! low = 16',
    phase: 'TOO_RESTRICTIVE',
    codeLine: 34,
    nums: [7, 2, 5, 10, 8],
    k: 2,
    low: 16,
    high: 20,
    mid: 15,
    pieces: 3,
    ans: 21,
    variables: { mid: 15, pieces: 3, limitK: 2, action: 'low = mid + 1 = 16' },
    explain: 'With threshold 15: Piece 1: [7, 2, 5]=14; Piece 2: [10]=10; Piece 3: [8]=8. Requires 3 pieces > 2. Allowed sum is too small! Increase low = 16.',
    intuition: 'Cannot partition into 2 parts under 15 limit.'
  },
  {
    title: '4. Try Max Sum = 18: Subarrays Needed = 2 ≤ 2 -> Optimal ans = 18!',
    phase: 'OPTIMAL_FOUND',
    codeLine: 31,
    nums: [7, 2, 5, 10, 8],
    k: 2,
    low: 18,
    high: 17,
    mid: 18,
    pieces: 2,
    ans: 18,
    variables: { mid: 18, pieces: 2, minMaxSum: 18 },
    explain: 'With threshold 18: Piece 1: [7, 2, 5]=14; Piece 2: [10, 8]=18. Exactly 2 pieces! Optimal minimized largest sum = 18.',
    intuition: 'Boundary reached.'
  }
];

export default function SplitArrayLargestSumVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Testing Max Sum = {step.mid ?? 'Init'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Subarrays: <strong className={step.pieces && step.pieces <= step.k ? 'text-emerald-300' : 'text-rose-400'}>
            {step.pieces ?? '-'} / {step.k} max
          </strong>
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Minimized Max Sum = {step.ans}
        </span>
      </div>

      {/* Array Elements Visualizer */}
      <div className="w-full flex items-center justify-center gap-3 py-3 overflow-x-auto">
        {step.nums.map((num, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1 min-w-[52px]">
            <div className="w-13 h-14 rounded-xl bg-gradient-to-b from-indigo-500/20 to-indigo-950/30 border border-indigo-500/40 text-indigo-200 flex flex-col items-center justify-center font-mono font-bold text-sm shadow-md">
              <span>{num}</span>
            </div>
            <span className="text-[9px] font-mono text-[#5b6076]">idx {idx}</span>
          </div>
        ))}
      </div>

      {/* Domain info */}
      <div className="flex items-center gap-4 text-xs font-mono text-[#8a8ea3]">
        <span>Domain: [{step.low} ... {Math.max(step.low, step.high)}]</span>
        <span>•</span>
        <span>K = {step.k} Subarrays</span>
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Find the Smallest Divisor Given a Threshold',
  category: 'Binary Search on Answers',
  difficulty: 'Medium',
  timeComplexity: 'O(N * log(max(nums)))',
  spaceComplexity: 'O(1)',
  description: 'Finds the smallest positive integer divisor such that the sum of ceiling divisions of array elements does not exceed the threshold limit.'
};

export const solutions = {
  cpp: `// C++ Find the Smallest Divisor Given a Threshold
// Time Complexity: O(N * log(max)) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

class Solution {
private:
    int sumByDiv(const vector<int>& nums, int div) {
        int sum = 0;
        for (int n : nums) {
            sum += (n + div - 1) / div; // ceil(n / div)
        }
        return sum;
    }

public:
    int smallestDivisor(vector<int>& nums, int threshold) {
        int low = 1;
        int high = *max_element(nums.begin(), nums.end());
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (sumByDiv(nums, mid) <= threshold) {
                ans = mid;
                high = mid - 1; // Try smaller divisor
            } else {
                low = mid + 1;  // Divisor too small, sum exceeded threshold
            }
        }
        return ans;
    }
};`,
  python: `# Python 3 Find the Smallest Divisor Given a Threshold
import math

class Solution:
    def smallestDivisor(self, nums: list[int], threshold: int) -> int:
        def sum_by_div(div: int) -> int:
            return sum(math.ceil(n / div) for n in nums)

        low = 1
        high = max(nums)
        ans = high

        while low <= high:
            mid = (low + high) // 2
            if sum_by_div(mid) <= threshold:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans`,
  java: `// Java Find the Smallest Divisor Given a Threshold
import java.util.Arrays;

class Solution {
    private int sumByDiv(int[] nums, int div) {
        int sum = 0;
        for (int n : nums) {
            sum += (n + div - 1) / div;
        }
        return sum;
    }

    public int smallestDivisor(int[] nums, int threshold) {
        int low = 1;
        int high = Arrays.stream(nums).max().getAsInt();
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (sumByDiv(nums, mid) <= threshold) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
}`,
  javascript: `// JavaScript Find the Smallest Divisor Given a Threshold
var smallestDivisor = function(nums, threshold) {
    let low = 1;
    let high = Math.max(...nums);
    let ans = high;

    const sumByDiv = (div) => {
        let sum = 0;
        for (const n of nums) {
            sum += Math.ceil(n / div);
        }
        return sum;
    };

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (sumByDiv(mid) <= threshold) {
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
    title: '1. Array: [1, 2, 5, 9], Threshold = 6',
    phase: 'INITIAL',
    codeLine: 21,
    nums: [1, 2, 5, 9],
    threshold: 6,
    low: 1,
    high: 9,
    mid: null,
    currentSum: null,
    ans: 9,
    variables: { low: 1, high: 9, threshold: 6, ans: 9 },
    explain: 'We want the smallest divisor D such that Σ ceil(nums[i] / D) <= 6. Domain for divisor is [1 ... 9].',
    intuition: 'Larger divisor gives smaller ceil quotients; monotonic behavior allows binary search.'
  },
  {
    title: '2. Try Divisor = 5: Σ ceil([1,2,5,9] / 5) = 1+1+1+2 = 5 ≤ 6 -> Feasible, ans = 5',
    phase: 'TEST_DIV',
    codeLine: 26,
    nums: [1, 2, 5, 9],
    threshold: 6,
    low: 1,
    high: 4,
    mid: 5,
    currentSum: 5,
    ans: 5,
    variables: { div: 5, quotients: '[1, 1, 1, 2]', sum: 5, limit: 6, action: 'ans = 5, high = 4' },
    explain: 'At divisor 5: ceil(1/5)=1, ceil(2/5)=1, ceil(5/5)=1, ceil(9/5)=2. Sum = 5 <= 6. Divisor 5 is valid! Search lower [1...4].',
    intuition: 'Valid divisor found, try smaller.'
  },
  {
    title: '3. Try Divisor = 2: Σ ceil([1,2,5,9] / 2) = 1+1+3+5 = 10 > 6 -> Infeasible! low = 3',
    phase: 'SUM_EXCEEDED',
    codeLine: 29,
    nums: [1, 2, 5, 9],
    threshold: 6,
    low: 3,
    high: 4,
    mid: 2,
    currentSum: 10,
    ans: 5,
    variables: { div: 2, quotients: '[1, 1, 3, 5]', sum: 10, limit: 6, action: 'low = mid + 1 = 3' },
    explain: 'At divisor 2: sum is 10, which exceeds threshold 6. Divisor 2 is too small. Shift low = 3.',
    intuition: 'Division sums exceed threshold constraint.'
  },
  {
    title: '4. Try Divisor = 3: Σ ceil([1,2,5,9] / 3) = 1+1+2+3 = 7 > 6 -> Infeasible! low = 4',
    phase: 'SUM_EXCEEDED',
    codeLine: 29,
    nums: [1, 2, 5, 9],
    threshold: 6,
    low: 4,
    high: 4,
    mid: 3,
    currentSum: 7,
    ans: 5,
    variables: { div: 3, quotients: '[1, 1, 2, 3]', sum: 7, limit: 6, action: 'low = mid + 1 = 4' },
    explain: 'At divisor 3: sum is 7, still > 6. Divisor 3 is still too small. Shift low = 4.',
    intuition: 'Constraint not met.'
  },
  {
    title: '5. Try Divisor = 4: Σ ceil([1,2,5,9] / 4) = 1+1+2+3 = 7 > 6 -> Infeasible! low = 5',
    phase: 'SUM_EXCEEDED',
    codeLine: 29,
    nums: [1, 2, 5, 9],
    threshold: 6,
    low: 5,
    high: 4,
    mid: 4,
    currentSum: 7,
    ans: 5,
    variables: { div: 4, sum: 7, action: 'low = 5, loop terminates' },
    explain: 'At divisor 4: sum is 7 > 6. Low becomes 5, which exceeds high (4). Loop ends. Smallest valid divisor is 5!',
    intuition: 'Binary search boundary reached.'
  },
  {
    title: '6. Completed: Smallest Divisor = 5',
    phase: 'COMPLETED',
    codeLine: 32,
    nums: [1, 2, 5, 9],
    threshold: 6,
    low: 5,
    high: 4,
    mid: 5,
    currentSum: 5,
    ans: 5,
    variables: { smallestDivisor: 5, timeComplexity: 'O(N log(max))', spaceComplexity: 'O(1)' },
    explain: 'Divisor 5 yields sum = 5 <= 6. Smallest integer satisfying threshold is 5.',
    intuition: 'Optimal binary search on answer.'
  }
];

export default function FindTheSmallestDivisorVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Testing Divisor = {step.mid ?? 'Init'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Ceil Sum: <strong className={step.currentSum && step.currentSum <= step.threshold ? 'text-emerald-300' : 'text-rose-400'}>
            {step.currentSum ?? '-'} / {step.threshold} max
          </strong>
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Least Divisor = {step.ans}
        </span>
      </div>

      {/* Array Elements with Ceil Quoting */}
      <div className="w-full flex items-center justify-center gap-3 py-3 overflow-x-auto">
        {step.nums.map((n, idx) => {
          const quot = step.mid ? Math.ceil(n / step.mid) : null;
          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[56px]">
              <div className="w-14 h-16 rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-500/15 to-indigo-950/30 flex flex-col items-center justify-center font-mono text-indigo-200">
                <span className="text-sm font-bold">{n}</span>
                {quot !== null && (
                  <span className="text-[10px] text-amber-300 font-semibold">
                    ⌈÷{step.mid}⌉={quot}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-mono text-[#5b6076]">nums[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Domain info */}
      <div className="flex items-center gap-4 text-xs font-mono text-[#8a8ea3]">
        <span>Domain: [{step.low} ... {Math.max(step.low, step.high)}]</span>
        <span>•</span>
        <span>Threshold Limit: {step.threshold}</span>
      </div>
    </div>
  );
}

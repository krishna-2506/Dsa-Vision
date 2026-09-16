import React from 'react';

export const meta = {
  title: 'Sum of Subarray Ranges',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Calculates the sum of ranges (max - min) of all contiguous subarrays in linear time by decomposing the problem into: `Sum of Subarray Maximums - Sum of Subarray Minimums`.'
};

export const solutions = {
  cpp: `// C++: Sum of Subarray Ranges in O(N) using Monotonic Stacks
// Range Sum = Sum(Subarray Maximums) - Sum(Subarray Minimums)
#include <vector>
#include <stack>
using namespace std;

long long subArrayRanges(vector<int>& nums) {
    int n = nums.size();

    // 1. Calculate Sum of Subarray Minimums
    vector<int> leftMin(n), rightMin(n);
    stack<int> s;
    for (int i = 0; i < n; i++) {
        while (!s.empty() && nums[s.top()] > nums[i]) s.pop();
        leftMin[i] = s.empty() ? i + 1 : i - s.top();
        s.push(i);
    }
    while (!s.empty()) s.pop();
    for (int i = n - 1; i >= 0; i--) {
        while (!s.empty() && nums[s.top()] >= nums[i]) s.pop();
        rightMin[i] = s.empty() ? n - i : s.top() - i;
        s.push(i);
    }

    // 2. Calculate Sum of Subarray Maximums
    vector<int> leftMax(n), rightMax(n);
    while (!s.empty()) s.pop();
    for (int i = 0; i < n; i++) {
        while (!s.empty() && nums[s.top()] < nums[i]) s.pop();
        leftMax[i] = s.empty() ? i + 1 : i - s.top();
        s.push(i);
    }
    while (!s.empty()) s.pop();
    for (int i = n - 1; i >= 0; i--) {
        while (!s.empty() && nums[s.top()] <= nums[i]) s.pop();
        rightMax[i] = s.empty() ? n - i : s.top() - i;
        s.push(i);
    }

    long long sumMin = 0, sumMax = 0;
    for (int i = 0; i < n; i++) {
        sumMin += 1LL * leftMin[i] * rightMin[i] * nums[i];
        sumMax += 1LL * leftMax[i] * rightMax[i] * nums[i];
    }

    return sumMax - sumMin;
}`,
  java: `// Java: Sum of Subarray Ranges in O(N)
import java.util.Stack;

class Solution {
    public long subArrayRanges(int[] nums) {
        int n = nums.length;
        int[] leftMin = new int[n], rightMin = new int[n];
        int[] leftMax = new int[n], rightMax = new int[n];
        Stack<Integer> s = new Stack<>();

        // Minima bounds
        for (int i = 0; i < n; i++) {
            while (!s.isEmpty() && nums[s.peek()] > nums[i]) s.pop();
            leftMin[i] = s.isEmpty() ? i + 1 : i - s.peek();
            s.push(i);
        }
        s.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!s.isEmpty() && nums[s.peek()] >= nums[i]) s.pop();
            rightMin[i] = s.isEmpty() ? n - i : s.peek() - i;
            s.push(i);
        }

        // Maxima bounds
        s.clear();
        for (int i = 0; i < n; i++) {
            while (!s.isEmpty() && nums[s.peek()] < nums[i]) s.pop();
            leftMax[i] = s.isEmpty() ? i + 1 : i - s.peek();
            s.push(i);
        }
        s.clear();
        for (int i = n - 1; i >= 0; i--) {
            while (!s.isEmpty() && nums[s.peek()] <= nums[i]) s.pop();
            rightMax[i] = s.isEmpty() ? n - i : s.peek() - i;
            s.push(i);
        }

        long sumMin = 0, sumMax = 0;
        for (int i = 0; i < n; i++) {
            sumMin += (long) leftMin[i] * rightMin[i] * nums[i];
            sumMax += (long) leftMax[i] * rightMax[i] * nums[i];
        }
        return sumMax - sumMin;
    }
}`,
  python: `# Python 3: Sum of Subarray Ranges in O(N)
def sub_array_ranges(nums: list[int]) -> int:
    n = len(nums)

    def get_sum(is_max: bool) -> int:
        left = [0] * n
        right = [0] * n
        st = []
        for i in range(n):
            while st and ((nums[st[-1]] < nums[i]) if is_max else (nums[st[-1]] > nums[i])):
                st.pop()
            left[i] = i + 1 if not st else i - st[-1]
            st.append(i)
        st = []
        for i in range(n - 1, -1, -1):
            while st and ((nums[st[-1]] <= nums[i]) if is_max else (nums[st[-1]] >= nums[i])):
                st.pop()
            right[i] = n - i if not st else st[-1] - i
            st.append(i)
        return sum(left[i] * right[i] * nums[i] for i in range(n))

    return get_sum(True) - get_sum(False)`,
  javascript: `// JavaScript: Sum of Subarray Ranges in O(N)
function subArrayRanges(nums) {
    const n = nums.length;

    function getSum(isMax) {
        const left = new Array(n).fill(0);
        const right = new Array(n).fill(0);
        let st = [];

        for (let i = 0; i < n; i++) {
            while (st.length > 0 && (isMax ? nums[st[st.length - 1]] < nums[i] : nums[st[st.length - 1]] > nums[i])) {
                st.pop();
            }
            left[i] = st.length === 0 ? i + 1 : i - st[st.length - 1];
            st.push(i);
        }

        st = [];
        for (let i = n - 1; i >= 0; i--) {
            while (st.length > 0 && (isMax ? nums[st[st.length - 1]] <= nums[i] : nums[st[st.length - 1]] >= nums[i])) {
                st.pop();
            }
            right[i] = st.length === 0 ? n - i : st[st.length - 1] - i;
            st.push(i);
        }

        let total = 0;
        for (let i = 0; i < n; i++) {
            total += left[i] * right[i] * nums[i];
        }
        return total;
    }

    return getSum(true) - getSum(false);
}`
};

export const steps = [
  {
    title: '1. Array: [1, 2, 3] &rarr; Problem Decomposition',
    phase: 'INIT',
    codeLine: 12,
    sumMax: 0,
    sumMin: 0,
    rangeSum: 0,
    nums: [1, 2, 3],
    explain: 'Sum of (max - min) = Sum of all subarray maxes - Sum of all subarray mins.'
  },
  {
    title: '2. Compute Sum of Subarray Minimums &rarr; 10',
    phase: 'MIN_SUM',
    codeLine: 24,
    sumMax: 0,
    sumMin: 10,
    rangeSum: -10,
    nums: [1, 2, 3],
    explain: 'Subarrays: [1]=1, [2]=2, [3]=3, [1,2]=1, [2,3]=2, [1,2,3]=1. Sum of minimums = 1 + 2 + 3 + 1 + 2 + 1 = 10.'
  },
  {
    title: '3. Compute Sum of Subarray Maximums &rarr; 14',
    phase: 'MAX_SUM',
    codeLine: 36,
    sumMax: 14,
    sumMin: 10,
    rangeSum: 4,
    nums: [1, 2, 3],
    explain: 'Subarrays: [1]=1, [2]=2, [3]=3, [1,2]=2, [2,3]=3, [1,2,3]=3. Sum of maximums = 1 + 2 + 3 + 2 + 3 + 3 = 14.'
  },
  {
    title: '4. Final Result: sumMax - sumMin = 14 - 10 = 4',
    phase: 'COMPLETE',
    codeLine: 43,
    sumMax: 14,
    sumMin: 10,
    rangeSum: 4,
    nums: [1, 2, 3],
    explain: 'Total range sum across all subarrays is exactly 14 - 10 = 4! Linear time O(N) execution.'
  }
];

export default function SumOfSubarrayRangesVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Sum(Max): <strong className="text-cyan-200">{step.sumMax}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Sum(Min): <strong className="text-purple-200">{step.sumMin}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Range Sum: <strong className="text-base text-emerald-200">{step.rangeSum}</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl w-full">
        <div className="text-xs font-mono text-[#8a8ea3] flex items-center justify-between w-full px-2">
          <span>Array &amp; Duality Subtraction</span>
          <span className="text-emerald-400 font-bold">O(N) Double-Monotonic</span>
        </div>

        <div className="flex items-center justify-center gap-4 w-full py-4">
          {step.nums.map((v, i) => (
            <div
              key={i}
              className="w-16 h-16 rounded-xl border-2 border-[#363c54] bg-[#181a26] flex flex-col items-center justify-center font-mono font-bold text-xl text-white shadow-md"
            >
              {v}
              <span className="text-[10px] text-[#606786] font-normal">[{i}]</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 w-full text-xs font-mono p-4 rounded-xl bg-[#0f1016] border border-[#232636]">
          <span className="text-cyan-300 font-bold">&Sigma; max(b) = {step.sumMax}</span>
          <span className="text-[#555a76] font-bold">&minus;</span>
          <span className="text-purple-300 font-bold">&Sigma; min(b) = {step.sumMin}</span>
          <span className="text-[#555a76] font-bold">=</span>
          <span className="text-emerald-300 font-black text-base">{step.rangeSum}</span>
        </div>
      </div>
    </div>
  );
}

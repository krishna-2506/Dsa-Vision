import React from 'react';

export const meta = {
  title: 'Next Greater Element II (Circular Array)',
  category: 'Monotonic Stack',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Finds the next greater circular element for every array item using a monotonic stack traversing a virtual 2N doubled array from right to left.'
};

export const solutions = {
  cpp: `// C++ Next Greater Element II (Circular Array)
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <stack>
using namespace std;

class Solution {
public:
    vector<int> nextGreaterElements(vector<int>& nums) {
        int n = nums.size();
        vector<int> nge(n, -1);
        stack<int> st;

        // Traverse virtual 2*N array from right to left
        for (int i = 2 * n - 1; i >= 0; i--) {
            while (!st.empty() && st.top() <= nums[i % n]) {
                st.pop();
            }

            if (i < n) {
                nge[i] = st.empty() ? -1 : st.top();
            }

            st.push(nums[i % n]);
        }

        return nge;
    }
};`,
  python: `# Python 3 Next Greater Element II (Circular Array)
class Solution:
    def nextGreaterElements(self, nums: list[int]) -> list[int]:
        n = len(nums)
        nge = [-1] * n
        stack = []

        for i in range(2 * n - 1, -1, -1):
            while stack and stack[-1] <= nums[i % n]:
                stack.pop()

            if i < n:
                nge[i] = stack[-1] if stack else -1

            stack.append(nums[i % n])

        return nge`,
  java: `// Java Next Greater Element II (Circular Array)
import java.util.Arrays;
import java.util.Stack;

class Solution {
    public int[] nextGreaterElements(int[] nums) {
        int n = nums.length;
        int[] nge = new int[n];
        Arrays.fill(nge, -1);
        Stack<Integer> st = new Stack<>();

        for (int i = 2 * n - 1; i >= 0; i--) {
            while (!st.isEmpty() && st.peek() <= nums[i % n]) {
                st.pop();
            }

            if (i < n) {
                nge[i] = st.isEmpty() ? -1 : st.peek();
            }

            st.push(nums[i % n]);
        }

        return nge;
    }
}`,
  javascript: `// JavaScript Next Greater Element II (Circular Array)
var nextGreaterElements = function(nums) {
    const n = nums.length;
    const nge = new Array(n).fill(-1);
    const stack = [];

    for (let i = 2 * n - 1; i >= 0; i--) {
        while (stack.length > 0 && stack[stack.length - 1] <= nums[i % n]) {
            stack.pop();
        }

        if (i < n) {
            nge[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
        }

        stack.push(nums[i % n]);
    }

    return nge;
};`
};

export const steps = [
  {
    title: '1. Array: [1, 2, 3, 4, 3], N = 5, Virtual 2N Circular Range [9 down to 0]',
    phase: 'INITIAL',
    codeLine: 14,
    nums: [1, 2, 3, 4, 3],
    currI: -1,
    stack: [],
    nge: [-1, -1, -1, -1, -1],
    variables: { N: 5, '2N - 1': 9, stack: '[]' },
    explain: 'Array wraps around circularly. A virtual 2N pass populates the monotonic stack with candidates from the first circular loop.',
    intuition: 'Monotonic decreasing stack.'
  },
  {
    title: '2. Pass 1 complete (i = 9 down to 5): Stack primed with [4, 3]',
    phase: 'PASS_ONE_PRIMED',
    codeLine: 17,
    nums: [1, 2, 3, 4, 3],
    currI: 4,
    stack: [4, 3],
    nge: [-1, -1, -1, -1, -1],
    variables: { i: 4, val: 3, top: 4, 'nge[4]': 4 },
    explain: 'Right loop filled the stack. Now i < N, we record answers! At index 4 (val 3): top of stack is 4 > 3 -> nge[4] = 4.',
    intuition: 'Circular next greater for index 4 is 4.'
  },
  {
    title: '3. i = 3 (val 4): Stack pops 4, 3 -> Stack is empty! nge[3] = -1',
    phase: 'POP_STACK',
    codeLine: 21,
    nums: [1, 2, 3, 4, 3],
    currI: 3,
    stack: [4],
    nge: [-1, -1, -1, -1, 4],
    variables: { i: 3, val: 4, stack: 'empty', 'nge[3]': -1 },
    explain: '4 is the maximum element in the entire array. No circular element is greater than 4 -> nge[3] = -1. Push 4.',
    intuition: 'Global maximum has no greater element.'
  },
  {
    title: '4. i = 2 (val 3): top is 4 -> nge[2] = 4; i = 1 (val 2): top is 3 -> nge[1] = 3',
    phase: 'RECORDING',
    codeLine: 21,
    nums: [1, 2, 3, 4, 3],
    currI: 1,
    stack: [4, 3, 2],
    nge: [-1, 3, 4, -1, 4],
    variables: { 'nge[2]': 4, 'nge[1]': 3 },
    explain: 'For index 2 (3), next greater is 4. For index 1 (2), next greater is 3.',
    intuition: 'Stack top provides immediate next greater.'
  },
  {
    title: '5. i = 0 (val 1): top is 2 -> nge[0] = 2 -> Final NGE = [2, 3, 4, -1, 4]',
    phase: 'COMPLETED',
    codeLine: 26,
    nums: [1, 2, 3, 4, 3],
    currI: 0,
    stack: [4, 3, 2, 1],
    nge: [2, 3, 4, -1, 4],
    variables: { finalNGE: '[2, 3, 4, -1, 4]', timeComplexity: 'O(N)', spaceComplexity: 'O(N)' },
    explain: 'All circular next greater elements computed in O(N) using monotonic stack.',
    intuition: 'Circular NGE complete.'
  }
];

export default function NextGreaterElement2Visualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Current idx = {step.currI !== -1 ? step.currI : 'Priming'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Stack Top = {step.stack.length > 0 ? step.stack[step.stack.length - 1] : 'Empty'}
        </span>
      </div>

      {/* Array Elements with Circular Next Greater readout */}
      <div className="w-full flex items-center justify-center gap-2 py-4 overflow-x-auto">
        {step.nums.map((val, idx) => {
          const isCurrent = idx === step.currI;
          const ans = step.nge[idx];

          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[50px]">
              <div
                className={`w-12 h-14 rounded-2xl border flex flex-col items-center justify-center font-mono font-bold text-sm transition-all ${
                  isCurrent
                    ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg'
                    : 'border-[#272b3c] bg-[#12131b] text-slate-200'
                }`}
              >
                <span>{val}</span>
                <span className="text-[10px] text-emerald-400 font-semibold">
                  {ans !== -1 ? `→${ans}` : '→∅'}
                </span>
              </div>
              <span className="text-[8px] font-mono text-[#5b6076]">nums[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Monotonic Stack Box */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-xl p-4 flex flex-col items-center gap-2 text-xs font-mono">
        <span className="text-[11px] text-indigo-400 font-semibold uppercase tracking-wider">
          Monotonic Decreasing Stack (Top on Right):
        </span>
        <div className="flex items-center gap-2">
          {step.stack.length === 0 ? (
            <span className="text-slate-500 italic">Empty Stack</span>
          ) : (
            step.stack.map((item, idx) => (
              <div
                key={idx}
                className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-200 font-bold flex items-center justify-center shadow-md"
              >
                {item}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

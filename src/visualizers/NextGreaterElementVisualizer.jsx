import React from 'react';

export const meta = {
  title: 'Next Greater Element',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Finds the first greater element to the right of each element in an array using a monotonic decreasing stack traversing backwards from right to left.'
};

export const solutions = {
  cpp: `// C++: Next Greater Element using Monotonic Stack
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <stack>
using namespace std;

vector<int> nextGreaterElements(vector<int>& nums) {
    int n = nums.size();
    vector<int> nge(n, -1);
    stack<int> st;

    for (int i = n - 1; i >= 0; i--) {
        while (!st.empty() && st.top() <= nums[i]) {
            st.pop();
        }
        if (!st.empty()) {
            nge[i] = st.top();
        }
        st.push(nums[i]);
    }
    return nge;
}`,
  java: `// Java: Next Greater Element using Monotonic Stack
import java.util.Stack;

class Solution {
    public int[] nextGreaterElements(int[] nums) {
        int n = nums.length;
        int[] nge = new int[n];
        Stack<Integer> st = new Stack<>();

        for (int i = n - 1; i >= 0; i--) {
            while (!st.isEmpty() && st.peek() <= nums[i]) {
                st.pop();
            }
            nge[i] = st.isEmpty() ? -1 : st.peek();
            st.push(nums[i]);
        }
        return nge;
    }
}`,
  python: `# Python 3: Next Greater Element using Monotonic Stack
def next_greater_elements(nums: list[int]) -> list[int]:
    n = len(nums)
    nge = [-1] * n
    st = []

    for i in range(n - 1, -1, -1):
        while st and st[-1] <= nums[i]:
            st.pop()
        if st:
            nge[i] = st[-1]
        st.append(nums[i])

    return nge`,
  javascript: `// JavaScript: Next Greater Element using Monotonic Stack
function nextGreaterElements(nums) {
    const n = nums.length;
    const nge = new Array(n).fill(-1);
    const st = [];

    for (let i = n - 1; i >= 0; i--) {
        while (st.length > 0 && st[st.length - 1] <= nums[i]) {
            st.pop();
        }
        if (st.length > 0) {
            nge[i] = st[st.length - 1];
        }
        st.push(nums[i]);
    }
    return nge;
}`
};

export const steps = [
  {
    title: '1. Initialize: nums = [4, 12, 5, 3, 1, 2, 5, 3, 1, 2, 4, 6] (Focus: [4, 5, 2, 10, 8])',
    phase: 'INIT',
    codeLine: 12,
    idx: 4,
    nums: [4, 5, 2, 10, 8],
    nge: [null, null, null, null, null],
    stack: [],
    explain: 'Traverse from right to left. Monotonic stack will preserve candidates in strictly decreasing order.'
  },
  {
    title: '2. i = 4 (nums[4] = 8): Stack empty &rarr; nge[4] = -1, push 8',
    phase: 'PROCESS',
    codeLine: 18,
    idx: 4,
    nums: [4, 5, 2, 10, 8],
    nge: [null, null, null, null, -1],
    stack: [8],
    explain: 'No element to right of 8. nge[4] = -1. Push 8 into stack.'
  },
  {
    title: '3. i = 3 (nums[3] = 10): 10 >= 8 &rarr; Pop 8; Stack empty &rarr; nge[3] = -1, push 10',
    phase: 'POP_PUSH',
    codeLine: 15,
    idx: 3,
    nums: [4, 5, 2, 10, 8],
    nge: [null, null, null, -1, -1],
    stack: [10],
    explain: '10 dominates 8. Pop 8. Stack empty &rarr; nge[3] = -1. Push 10.'
  },
  {
    title: '4. i = 2 (nums[2] = 2): Top is 10 > 2 &rarr; nge[2] = 10, push 2',
    phase: 'PROCESS',
    codeLine: 18,
    idx: 2,
    nums: [4, 5, 2, 10, 8],
    nge: [null, null, 10, -1, -1],
    stack: [10, 2],
    explain: 'Top element 10 is strictly greater than 2. Thus next greater of 2 is 10. Push 2.'
  },
  {
    title: '5. i = 1 (nums[1] = 5): 5 >= 2 &rarr; Pop 2; Top is 10 > 5 &rarr; nge[1] = 10, push 5',
    phase: 'POP_PUSH',
    codeLine: 15,
    idx: 1,
    nums: [4, 5, 2, 10, 8],
    nge: [null, 10, 10, -1, -1],
    stack: [10, 5],
    explain: 'Pop 2 since 5 >= 2. Next top is 10 > 5. So nge[1] = 10. Push 5.'
  },
  {
    title: '6. i = 0 (nums[0] = 4): Top is 5 > 4 &rarr; nge[0] = 5, push 4',
    phase: 'PROCESS',
    codeLine: 18,
    idx: 0,
    nums: [4, 5, 2, 10, 8],
    nge: [5, 10, 10, -1, -1],
    stack: [10, 5, 4],
    explain: 'Top 5 is greater than 4. nge[0] = 5. All items processed! Result: [5, 10, 10, -1, -1].'
  }
];

export default function NextGreaterElementVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Current Index: <strong className="text-amber-400">i = {step.idx}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Value: <strong>nums[{step.idx}] = {step.nums[step.idx]}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Time: <strong>O(2N) = O(N)</strong>
        </div>
      </div>

      {/* Array & Result Grid */}
      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl w-full">
        <div className="text-xs font-mono text-[#8a8ea3] flex items-center justify-between w-full px-2">
          <span>Input Array &amp; Computed NGE Array</span>
          <span className="text-cyan-400 font-bold">Right-to-Left Traversal</span>
        </div>

        <div className="grid grid-cols-5 gap-3 w-full max-w-md pt-2">
          {step.nums.map((num, idx) => {
            const isCurr = idx === step.idx;
            const res = step.nge[idx];
            return (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-14 h-14 rounded-xl border-2 flex flex-col items-center justify-center font-mono font-bold text-lg transition-all ${
                    isCurr
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 scale-105 shadow-md shadow-amber-500/20'
                      : 'bg-[#181a26] border-[#31364d] text-white'
                  }`}
                >
                  {num}
                </div>
                <div
                  className={`w-14 py-1 rounded-lg border text-center font-mono text-xs font-bold ${
                    res !== null
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                      : 'bg-[#0f1016] border-dashed border-[#242738] text-[#484e6a]'
                  }`}
                >
                  {res !== null ? res : '?'}
                </div>
                <span className="text-[10px] font-mono text-[#5b617d]">[{idx}]</span>
              </div>
            );
          })}
        </div>

        {/* Monotonic Stack */}
        <div className="w-full max-w-md flex flex-col items-center gap-2 pt-3">
          <span className="text-xs font-mono text-[#8a8ea3]">Monotonic Stack (Decreasing Bottom-to-Top):</span>
          <div className="w-full h-16 rounded-xl border-2 border-dashed border-[#2d3144] flex items-center justify-center gap-2 p-2 bg-[#0f1016]">
            {step.stack.length === 0 ? (
              <span className="text-xs font-mono text-[#4e5370]">Empty Stack</span>
            ) : (
              step.stack.map((v, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400 text-cyan-200 font-mono font-bold text-sm"
                >
                  {v}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

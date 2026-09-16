import React from 'react';

export const meta = {
  title: 'Next Smaller Element',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Finds the first smaller element to the right of every element in an array using a monotonic increasing stack scanned from right to left.'
};

export const solutions = {
  cpp: `// C++: Next Smaller Element using Monotonic Stack
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <stack>
using namespace std;

vector<int> nextSmallerElements(vector<int>& arr) {
    int n = arr.size();
    vector<int> nse(n, -1);
    stack<int> st;

    for (int i = n - 1; i >= 0; i--) {
        while (!st.empty() && st.top() >= arr[i]) {
            st.pop();
        }
        if (!st.empty()) {
            nse[i] = st.top();
        }
        st.push(arr[i]);
    }
    return nse;
}`,
  java: `// Java: Next Smaller Element using Monotonic Stack
import java.util.Stack;

class Solution {
    public int[] nextSmallerElements(int[] arr) {
        int n = arr.length;
        int[] nse = new int[n];
        Stack<Integer> st = new Stack<>();

        for (int i = n - 1; i >= 0; i--) {
            while (!st.isEmpty() && st.peek() >= arr[i]) {
                st.pop();
            }
            nse[i] = st.isEmpty() ? -1 : st.peek();
            st.push(arr[i]);
        }
        return nse;
    }
}`,
  python: `# Python 3: Next Smaller Element using Monotonic Stack
def next_smaller_elements(arr: list[int]) -> list[int]:
    n = len(arr)
    nse = [-1] * n
    st = []

    for i in range(n - 1, -1, -1):
        while st and st[-1] >= arr[i]:
            st.pop()
        if st:
            nse[i] = st[-1]
        st.append(arr[i])

    return nse`,
  javascript: `// JavaScript: Next Smaller Element using Monotonic Stack
function nextSmallerElements(arr) {
    const n = arr.length;
    const nse = new Array(n).fill(-1);
    const st = [];

    for (let i = n - 1; i >= 0; i--) {
        while (st.length > 0 && st[st.length - 1] >= arr[i]) {
            st.pop();
        }
        if (st.length > 0) {
            nse[i] = st[st.length - 1];
        }
        st.push(arr[i]);
    }
    return nse;
}`
};

export const steps = [
  {
    title: '1. Initialize: arr = [4, 8, 5, 2, 25]',
    phase: 'INIT',
    codeLine: 12,
    idx: 4,
    arr: [4, 8, 5, 2, 25],
    nse: [null, null, null, null, null],
    stack: [],
    explain: 'Traverse backwards from right to left using a monotonic increasing stack to discover the immediate smaller neighbor.'
  },
  {
    title: '2. i = 4 (arr[4] = 25): Stack empty &rarr; nse[4] = -1, push 25',
    phase: 'PROCESS',
    codeLine: 18,
    idx: 4,
    arr: [4, 8, 5, 2, 25],
    nse: [null, null, null, null, -1],
    stack: [25],
    explain: 'Rightmost item has no elements to its right. nse[4] = -1. Push 25.'
  },
  {
    title: '3. i = 3 (arr[3] = 2): 25 >= 2 &rarr; Pop 25; Stack empty &rarr; nse[3] = -1, push 2',
    phase: 'POP_PUSH',
    codeLine: 15,
    idx: 3,
    arr: [4, 8, 5, 2, 25],
    nse: [null, null, null, -1, -1],
    stack: [2],
    explain: '25 is larger than 2, so pop 25. Stack empty &rarr; nse[3] = -1. Push 2.'
  },
  {
    title: '4. i = 2 (arr[2] = 5): Top is 2 &lt; 5 &rarr; nse[2] = 2, push 5',
    phase: 'PROCESS',
    codeLine: 18,
    idx: 2,
    arr: [4, 8, 5, 2, 25],
    nse: [null, null, 2, -1, -1],
    stack: [2, 5],
    explain: 'Top of stack 2 is strictly smaller than 5. Thus nse[2] = 2. Push 5.'
  },
  {
    title: '5. i = 1 (arr[1] = 8): Top is 5 &lt; 8 &rarr; nse[1] = 5, push 8',
    phase: 'PROCESS',
    codeLine: 18,
    idx: 1,
    arr: [4, 8, 5, 2, 25],
    nse: [null, 5, 2, -1, -1],
    stack: [2, 5, 8],
    explain: 'Top of stack 5 is smaller than 8. nse[1] = 5. Push 8.'
  },
  {
    title: '6. i = 0 (arr[0] = 4): Pop 8, Pop 5 (both >= 4); Top is 2 &lt; 4 &rarr; nse[0] = 2',
    phase: 'POP_PUSH',
    codeLine: 15,
    idx: 0,
    arr: [4, 8, 5, 2, 25],
    nse: [2, 5, 2, -1, -1],
    stack: [2, 4],
    explain: '8 and 5 popped since they are not smaller than 4. Top element 2 is smaller! nse[0] = 2. Done!'
  }
];

export default function NextSmallerElementVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Index: <strong className="text-amber-400">i = {step.idx}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Value: <strong>arr[{step.idx}] = {step.arr[step.idx]}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Complexity: <strong>O(N) amortized</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl w-full">
        <div className="text-xs font-mono text-[#8a8ea3] flex items-center justify-between w-full px-2">
          <span>Array &amp; Computed NSE Result</span>
          <span className="text-purple-400 font-bold">Right-to-Left Traversal</span>
        </div>

        <div className="grid grid-cols-5 gap-3 w-full max-w-md pt-2">
          {step.arr.map((val, idx) => {
            const isCurr = idx === step.idx;
            const res = step.nse[idx];
            return (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-14 h-14 rounded-xl border-2 flex flex-col items-center justify-center font-mono font-bold text-lg transition-all ${
                    isCurr
                      ? 'bg-purple-500/20 border-purple-400 text-purple-200 scale-105 shadow-md shadow-purple-500/20'
                      : 'bg-[#181a26] border-[#31364d] text-white'
                  }`}
                >
                  {val}
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
          <span className="text-xs font-mono text-[#8a8ea3]">Monotonic Stack (Increasing Bottom-to-Top):</span>
          <div className="w-full h-16 rounded-xl border-2 border-dashed border-[#2d3144] flex items-center justify-center gap-2 p-2 bg-[#0f1016]">
            {step.stack.length === 0 ? (
              <span className="text-xs font-mono text-[#4e5370]">Empty Stack</span>
            ) : (
              step.stack.map((v, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-purple-500/20 border border-purple-400 text-purple-200 font-mono font-bold text-sm"
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

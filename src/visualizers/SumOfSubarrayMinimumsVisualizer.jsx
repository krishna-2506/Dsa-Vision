import React from 'react';

export const meta = {
  title: 'Sum of Subarray Minimums',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Calculates the sum of minimum elements over all contiguous subarrays by using monotonic stacks to find the left and right boundaries (Previous and Next Smaller Elements) where each element remains the minimum.'
};

export const solutions = {
  cpp: `// C++: Sum of Subarray Minimums using Monotonic Stack
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <stack>
using namespace std;

int sumSubarrayMins(vector<int>& arr) {
    int n = arr.size();
    long long MOD = 1e9 + 7;
    vector<int> left(n), right(n);
    stack<int> s1, s2;

    // Previous Smaller or Equal Element
    for (int i = 0; i < n; i++) {
        while (!s1.empty() && arr[s1.top()] > arr[i]) s1.pop();
        left[i] = s1.empty() ? i + 1 : i - s1.top();
        s1.push(i);
    }

    // Next Smaller Element
    for (int i = n - 1; i >= 0; i--) {
        while (!s2.empty() && arr[s2.top()] >= arr[i]) s2.pop();
        right[i] = s2.empty() ? n - i : s2.top() - i;
        s2.push(i);
    }

    long long total = 0;
    for (int i = 0; i < n; i++) {
        long long count = (1LL * left[i] * right[i]) % MOD;
        total = (total + count * arr[i]) % MOD;
    }
    return total;
}`,
  java: `// Java: Sum of Subarray Minimums
import java.util.Stack;

class Solution {
    public int sumSubarrayMins(int[] arr) {
        int n = arr.length;
        long MOD = 1_000_000_007L;
        int[] left = new int[n];
        int[] right = new int[n];
        Stack<Integer> s1 = new Stack<>();
        Stack<Integer> s2 = new Stack<>();

        for (int i = 0; i < n; i++) {
            while (!s1.isEmpty() && arr[s1.peek()] > arr[i]) s1.pop();
            left[i] = s1.isEmpty() ? i + 1 : i - s1.peek();
            s1.push(i);
        }

        for (int i = n - 1; i >= 0; i--) {
            while (!s2.isEmpty() && arr[s2.peek()] >= arr[i]) s2.pop();
            right[i] = s2.isEmpty() ? n - i : s2.top() - i;
            s2.push(i);
        }

        long total = 0;
        for (int i = 0; i < n; i++) {
            long count = ((long) left[i] * right[i]) % MOD;
            total = (total + count * arr[i]) % MOD;
        }
        return (int) total;
    }
}`,
  python: `# Python 3: Sum of Subarray Minimums
def sum_subarray_mins(arr: list[int]) -> int:
    n = len(arr)
    MOD = 10**9 + 7
    left = [0] * n
    right = [0] * n
    s1, s2 = [], []

    for i in range(n):
        while s1 and arr[s1[-1]] > arr[i]:
            s1.pop()
        left[i] = i + 1 if not s1 else i - s1[-1]
        s1.append(i)

    for i in range(n - 1, -1, -1):
        while s2 and arr[s2[-1]] >= arr[i]:
            s2.pop()
        right[i] = n - i if not s2 else s2[-1] - i
        s2.append(i)

    return sum(left[i] * right[i] * arr[i] for i in range(n)) % MOD`,
  javascript: `// JavaScript: Sum of Subarray Minimums
function sumSubarrayMins(arr) {
    const n = arr.length;
    const MOD = 1000000007;
    const left = new Array(n).fill(0);
    const right = new Array(n).fill(0);
    const s1 = [], s2 = [];

    for (let i = 0; i < n; i++) {
        while (s1.length > 0 && arr[s1[s1.length - 1]] > arr[i]) s1.pop();
        left[i] = s1.length === 0 ? i + 1 : i - s1[s1.length - 1];
        s1.push(i);
    }

    for (let i = n - 1; i >= 0; i--) {
        while (s2.length > 0 && arr[s2[s2.length - 1]] >= arr[i]) s2.pop();
        right[i] = s2.length === 0 ? n - i : s2[s2.length - 1] - i;
        s2.push(i);
    }

    let total = 0;
    for (let i = 0; i < n; i++) {
        const count = (left[i] * right[i]) % MOD;
        total = (total + count * arr[i]) % MOD;
    }
    return total;
}`
};

export const steps = [
  {
    title: '1. Array: [3, 1, 2, 4] &rarr; Contribution Concept',
    phase: 'INIT',
    codeLine: 12,
    i: null,
    arr: [3, 1, 2, 4],
    left: [1, 2, 1, 1],
    right: [1, 3, 2, 1],
    runningSum: 0,
    contribution: 0,
    explain: 'Each element arr[i] acts as the minimum for left[i] choices on the left and right[i] choices on the right.'
  },
  {
    title: '2. i = 0 (val = 3): left=1, right=1 &rarr; 1 * 1 * 3 = 3',
    phase: 'EVAL',
    codeLine: 26,
    i: 0,
    arr: [3, 1, 2, 4],
    left: [1, 2, 1, 1],
    right: [1, 3, 2, 1],
    runningSum: 3,
    contribution: 3,
    explain: 'Subarray [3]. 3 is minimum in 1 subarray. Contribution = 3.'
  },
  {
    title: '3. i = 1 (val = 1): left=2, right=3 &rarr; 2 * 3 * 1 = 6',
    phase: 'EVAL',
    codeLine: 26,
    i: 1,
    arr: [3, 1, 2, 4],
    left: [1, 2, 1, 1],
    right: [1, 3, 2, 1],
    runningSum: 9,
    contribution: 6,
    explain: '1 is minimum in 6 subarrays: [1], [3,1], [1,2], [3,1,2], [1,2,4], [3,1,2,4]. Total += 6.'
  },
  {
    title: '4. i = 2 (val = 2): left=1, right=2 &rarr; 1 * 2 * 2 = 4',
    phase: 'EVAL',
    codeLine: 26,
    i: 2,
    arr: [3, 1, 2, 4],
    left: [1, 2, 1, 1],
    right: [1, 3, 2, 1],
    runningSum: 13,
    contribution: 4,
    explain: '2 is minimum in subarrays [2] and [2,4]. Total += 4.'
  },
  {
    title: '5. i = 3 (val = 4): left=1, right=1 &rarr; 1 * 1 * 4 = 4',
    phase: 'EVAL',
    codeLine: 26,
    i: 3,
    arr: [3, 1, 2, 4],
    left: [1, 2, 1, 1],
    right: [1, 3, 2, 1],
    runningSum: 17,
    contribution: 4,
    explain: '4 is minimum only in [4]. Total += 4.'
  },
  {
    title: '6. Complete: Sum of All Subarray Minimums = 17',
    phase: 'DONE',
    codeLine: 29,
    i: null,
    arr: [3, 1, 2, 4],
    left: [1, 2, 1, 1],
    right: [1, 3, 2, 1],
    runningSum: 17,
    contribution: 0,
    explain: 'Computed in O(N) time using PSE and NSE monotonic stacks!'
  }
];

export default function SumOfSubarrayMinimumsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Running Sum: <strong className="text-base text-cyan-200">{step.runningSum}</strong>
        </div>
        {step.i !== null && (
          <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
            Added: {step.left[step.i]} &times; {step.right[step.i]} &times; {step.arr[step.i]} = <strong>+{step.contribution}</strong>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Array &amp; Boundary Multipliers</span>
          <span className="text-cyan-400 font-bold">Contribution Model</span>
        </div>

        <div className="grid grid-cols-4 gap-3 w-full max-w-md pt-2">
          {step.arr.map((val, idx) => {
            const isCurr = idx === step.i;
            return (
              <div key={idx} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center font-mono font-bold text-lg transition-all ${
                    isCurr
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 scale-105 shadow-md shadow-amber-500/20'
                      : 'bg-[#181a26] border-[#31364d] text-[var(--chalk)]'
                  }`}
                >
                  {val}
                  <span className="text-[9px] text-[#636b8e] font-normal">[{idx}]</span>
                </div>
                <div className="flex gap-1 text-[10px] font-mono text-[#787f9e]">
                  <span>L:{step.left[idx]}</span>
                  <span>&bull;</span>
                  <span>R:{step.right[idx]}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-xs font-mono text-[var(--chalk-dim)] bg-[var(--board-raised-2)] px-4 py-2 rounded-xl border border-[var(--line)] text-center w-full">
          Formula: Subarrays where arr[i] is min = left[i] &times; right[i]. Total = &Sigma; (arr[i] &times; count).
        </div>
      </div>
    </div>
  );
}

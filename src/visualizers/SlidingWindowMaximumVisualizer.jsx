import React from 'react';

export const meta = {
  title: 'Sliding Window Maximum',
  category: 'Stack and Queues',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(K)',
  description: 'Finds the maximum value in every contiguous sliding window of size k in linear time using a monotonic decreasing double-ended queue (deque).'
};

export const solutions = {
  cpp: `// C++: Sliding Window Maximum using Monotonic Deque
// Time Complexity: O(N) | Space Complexity: O(K)
#include <vector>
#include <deque>
using namespace std;

vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;
    vector<int> result;

    for (int i = 0; i < nums.size(); i++) {
        // 1. Remove indices out of window bounds
        if (!dq.empty() && dq.front() <= i - k) {
            dq.pop_front();
        }

        // 2. Maintain decreasing order in deque
        while (!dq.empty() && nums[dq.back()] <= nums[i]) {
            dq.pop_back();
        }

        // 3. Add current index
        dq.push_back(i);

        // 4. Record maximum when window reaches size k
        if (i >= k - 1) {
            result.push_back(nums[dq.front()]);
        }
    }
    return result;
}`,
  java: `// Java: Sliding Window Maximum using Deque
import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] result = new int[n - k + 1];
        Deque<Integer> dq = new ArrayDeque<>();
        int idx = 0;

        for (int i = 0; i < n; i++) {
            if (!dq.isEmpty() && dq.peekFirst() <= i - k) {
                dq.pollFirst();
            }

            while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) {
                dq.pollLast();
            }

            dq.offerLast(i);

            if (i >= k - 1) {
                result[idx++] = nums[dq.peekFirst()];
            }
        }
        return result;
    }
}`,
  python: `# Python 3: Sliding Window Maximum
from collections import deque

def max_sliding_window(nums: list[int], k: int) -> list[int]:
    dq = deque()
    result = []

    for i in range(len(nums)):
        if dq and dq[0] <= i - k:
            dq.popleft()

        while dq and nums[dq[-1]] <= nums[i]:
            dq.pop()

        dq.append(i)

        if i >= k - 1:
            result.append(nums[dq[0]])

    return result`,
  javascript: `// JavaScript: Sliding Window Maximum
function maxSlidingWindow(nums, k) {
    const dq = [];
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        if (dq.length > 0 && dq[0] <= i - k) {
            dq.shift();
        }

        while (dq.length > 0 && nums[dq[dq.length - 1]] <= nums[i]) {
            dq.pop();
        }

        dq.push(i);

        if (i >= k - 1) {
            result.push(nums[dq[0]]);
        }
    }
    return result;
}`
};

export const steps = [
  {
    title: '1. Initialize: nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3',
    phase: 'INIT',
    codeLine: 12,
    i: 0,
    windowStart: 0,
    windowEnd: 0,
    deque: [0],
    result: [],
    nums: [1, 3, -1, -3, 5, 3, 6, 7],
    explain: 'i=0: Push index 0 (val 1) to deque. Window not full yet.'
  },
  {
    title: '2. i = 1 (val = 3): 3 >= 1 &rarr; Pop 0, Push 1',
    phase: 'POP_BACK',
    codeLine: 19,
    i: 1,
    windowStart: 0,
    windowEnd: 1,
    deque: [1],
    result: [],
    nums: [1, 3, -1, -3, 5, 3, 6, 7],
    explain: '3 dominates 1 in future windows. Pop 0. Deque = [1].'
  },
  {
    title: '3. i = 2 (val = -1): First Window [1, 3, -1] &rarr; Max = 3!',
    phase: 'FIRST_MAX',
    codeLine: 27,
    i: 2,
    windowStart: 0,
    windowEnd: 2,
    deque: [1, 2],
    result: [3],
    nums: [1, 3, -1, -3, 5, 3, 6, 7],
    explain: '-1 is smaller than 3, so append 2. Window [0..2] is complete! Front of deque is index 1 (val 3). Result += 3.'
  },
  {
    title: '4. i = 3 (val = -3): Window [3, -1, -3] &rarr; Max = 3',
    phase: 'SLIDE',
    codeLine: 27,
    i: 3,
    windowStart: 1,
    windowEnd: 3,
    deque: [1, 2, 3],
    result: [3, 3],
    nums: [1, 3, -1, -3, 5, 3, 6, 7],
    explain: 'Window slides to [1..3]. Index 1 is still inside window. Front remains index 1 (val 3).'
  },
  {
    title: '5. i = 4 (val = 5): Evict expired idx 1; 5 dominates all &rarr; Deque = [4], Max = 5',
    phase: 'DOMINATE',
    codeLine: 19,
    i: 4,
    windowStart: 2,
    windowEnd: 4,
    deque: [4],
    result: [3, 3, 5],
    nums: [1, 3, -1, -3, 5, 3, 6, 7],
    explain: 'Index 1 is out of window (<= 4 - 3 = 1). 5 >= -3 and 5 >= -1 &rarr; Deque emptied, then index 4 pushed. Max = 5!'
  },
  {
    title: '6. Process remaining up to EOF: Final Result = [3, 3, 5, 5, 6, 7]',
    phase: 'DONE',
    codeLine: 30,
    i: 7,
    windowStart: 5,
    windowEnd: 7,
    deque: [7],
    result: [3, 3, 5, 5, 6, 7],
    nums: [1, 3, -1, -3, 5, 3, 6, 7],
    explain: 'Each element is enqueued and dequeued at most once &rarr; strictly O(N) total time.'
  }
];

export default function SlidingWindowMaximumVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Current Window Max: <strong className="text-base text-cyan-200">{step.result[step.result.length - 1] ?? '...'}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Window: <strong>[{step.windowStart} .. {step.windowEnd}] (k=3)</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl w-full">
        <div className="text-xs font-mono text-[#8a8ea3] flex items-center justify-between w-full px-2">
          <span>Array &amp; Sliding Window Frame</span>
          <span className="text-cyan-400 font-bold">Monotonic Deque O(N)</span>
        </div>

        {/* Array with Window Highlight */}
        <div className="grid grid-cols-8 gap-1.5 w-full pt-2">
          {step.nums.map((num, idx) => {
            const inWindow = idx >= step.windowStart && idx <= step.windowEnd;
            const isFront = step.deque[0] === idx;

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div
                  className={`w-11 h-12 rounded-xl border-2 flex flex-col items-center justify-center font-mono font-bold text-sm transition-all ${
                    isFront
                      ? 'bg-cyan-500/30 border-cyan-400 text-cyan-100 shadow-md shadow-cyan-500/20 scale-105'
                      : inWindow
                      ? 'bg-purple-500/20 border-purple-400 text-purple-200'
                      : 'bg-[#161824] border-[#292d3f] text-[#555b7b]'
                  }`}
                >
                  {num}
                </div>
                <span className="text-[9px] font-mono text-[#525875]">[{idx}]</span>
              </div>
            );
          })}
        </div>

        {/* Deque contents */}
        <div className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#0f1016] border border-[#242738]">
          <span className="text-xs font-mono text-[#737998]">Monotonic Deque Indices (Values):</span>
          <div className="flex items-center gap-2">
            {step.deque.map((idx, i) => (
              <div
                key={i}
                className="px-2.5 py-1 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 font-mono text-xs font-bold"
              >
                idx {idx} ({step.nums[idx]})
              </div>
            ))}
          </div>
        </div>

        {/* Result Array */}
        <div className="w-full flex items-center gap-2 text-xs font-mono text-[#8a8ea3]">
          <span>Generated Maxima:</span>
          <span className="text-emerald-300 font-bold bg-[#161824] px-3 py-1 rounded-lg border border-[#272b3c]">
            [{step.result.join(', ')}]
          </span>
        </div>
      </div>
    </div>
  );
}

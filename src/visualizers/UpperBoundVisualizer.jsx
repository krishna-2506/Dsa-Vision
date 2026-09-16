import React from 'react';

export const meta = {
  title: 'Upper Bound in Sorted Array',
  category: 'Binary Search',
  difficulty: 'Easy',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the smallest index i such that arr[i] > target (strictly greater than target) using logarithmic Binary Search. If no element is greater, returns N.'
};

export const solutions = {
  cpp: `// C++ Upper Bound Implementation
// Time: O(log N) | Space: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int upperBound(vector<int>& arr, int target) {
        int n = arr.size();
        int low = 0, high = n - 1;
        int ans = n;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] > target) {
                ans = mid;
                high = mid - 1; // Look for smaller index on left
            } else {
                low = mid + 1;  // Look on right
            }
        }

        return ans;
    }
};`,
  python: `# Python 3 Upper Bound Implementation
# Time: O(log N) | Space: O(1)
class Solution:
    def upperBound(self, arr: list[int], target: int) -> int:
        low = 0
        high = len(arr) - 1
        ans = len(arr)

        while low <= high:
            mid = (low + high) // 2
            if arr[mid] > target:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans`,
  java: `// Java Upper Bound Implementation
// Time: O(log N) | Space: O(1)
class Solution {
    public int upperBound(int[] arr, int target) {
        int n = arr.length;
        int low = 0, high = n - 1;
        int ans = n;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] > target) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }
}`,
  javascript: `// JavaScript Upper Bound Implementation
// Time: O(log N) | Space: O(1)
var upperBound = function(arr, target) {
    let low = 0, high = arr.length - 1;
    let ans = arr.length;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (arr[mid] > target) {
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
    title: '1. Initialize Range: low = 0, high = 6, Target = 4',
    phase: 'INIT',
    codeLine: 12,
    arr: [1, 2, 4, 4, 6, 8, 10],
    low: 0,
    high: 6,
    mid: null,
    target: 4,
    ans: 7,
    variables: { low: 0, high: 6, ans: 7, target: 4 },
    explain: 'Target is 4. Upper bound looks for the first element strictly greater than 4 (arr[i] > 4).',
    intuition: 'Unlike lower bound (>=), upper bound ignores duplicates of target and steps strictly past them.'
  },
  {
    title: '2. Check mid = 3 (val 4): 4 > 4 is False! (Go Right, low = 4)',
    phase: 'EVAL_MID_3',
    codeLine: 20,
    arr: [1, 2, 4, 4, 6, 8, 10],
    low: 4,
    high: 6,
    mid: 3,
    target: 4,
    ans: 7,
    variables: { 'mid=3': 'arr[3] = 4 (not > 4)', newLow: 4, ans: 7 },
    explain: 'At index 3, arr[3] = 4. Since 4 is not strictly greater than 4, we eliminate the left half: low advances to 4.',
    intuition: 'Equal elements must be bypassed.'
  },
  {
    title: '3. Check mid = 5 (val 8): 8 > 4 (Valid! ans = 5, high = 4)',
    phase: 'EVAL_MID_5',
    codeLine: 17,
    arr: [1, 2, 4, 4, 6, 8, 10],
    low: 4,
    high: 4,
    mid: 5,
    target: 4,
    ans: 5,
    variables: { 'mid=5': 'arr[5] = 8 > 4', updatedAns: 5, newHigh: 4 },
    explain: 'At index 5, arr[5] = 8 > 4. Valid candidate recorded: ans = 5. Search left (high = 4).',
    intuition: 'Test if a smaller index > 4 exists.'
  },
  {
    title: '4. Check mid = 4 (val 6): 6 > 4 -> Final Upper Bound: Index 4',
    phase: 'COMPLETED',
    codeLine: 25,
    arr: [1, 2, 4, 4, 6, 8, 10],
    low: 4,
    high: 3,
    mid: 4,
    target: 4,
    ans: 4,
    variables: { 'mid=4': 'arr[4] = 6 > 4', updatedAns: 4, finalUpperBound: 4 },
    explain: 'At index 4, arr[4] = 6 > 4. ans updates to 4, high becomes 3. low > high terminates. Upper bound is index 4 (value 6)!',
    intuition: 'Index 4 is the first strictly greater element.'
  }
];

export default function UpperBoundVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Target: {step.target} (Seeking &gt; {step.target})
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Upper Bound Index: {step.ans} ({step.ans < step.arr.length ? step.arr[step.ans] : 'None'})
        </span>
      </div>

      {/* Elements Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Array with Upper Bound Pointers
        </span>

        <div className="flex items-center justify-center gap-3 py-2 font-mono">
          {step.arr.map((val, idx) => {
            const isMid = idx === step.mid;
            const isAns = idx === step.ans;
            const inRange = idx >= step.low && idx <= step.high;

            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div
                  className={`w-14 h-22 rounded-2xl border flex flex-col items-center justify-center transition-all duration-300 ${
                    isAns && step.phase === 'COMPLETED'
                      ? 'border-emerald-500 bg-emerald-500/25 text-emerald-300 ring-2 ring-emerald-500/50 scale-105 shadow-lg'
                      : isMid
                      ? 'border-amber-400 bg-amber-400/25 text-amber-300 ring-2 ring-amber-400/50 scale-105'
                      : inRange
                      ? 'border-cyan-500/50 bg-cyan-500/15 text-cyan-300'
                      : 'border-[#272b3c] bg-[#161824] text-slate-500 opacity-60'
                  }`}
                >
                  <span className="text-[9px] text-[#8a8ea3]">[{idx}]</span>
                  <span className="text-base font-bold mt-0.5">{val}</span>
                  <div className="mt-1 flex items-center gap-0.5 text-[8px] font-bold">
                    {idx === step.low && <span className="text-cyan-400">L</span>}
                    {idx === step.mid && <span className="text-amber-400">M</span>}
                    {idx === step.high && <span className="text-purple-400">H</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

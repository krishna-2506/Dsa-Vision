import React from 'react';

export const meta = {
  title: 'Lower Bound in Sorted Array',
  category: 'Binary Search',
  difficulty: 'Easy',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the smallest index i such that arr[i] >= target using standard logarithmic Binary Search. If no element satisfies the condition, returns the length of the array N.'
};

export const solutions = {
  cpp: `// C++ Lower Bound Implementation
// Time: O(log N) | Space: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int lowerBound(vector<int>& arr, int target) {
        int n = arr.size();
        int low = 0, high = n - 1;
        int ans = n;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] >= target) {
                ans = mid;
                high = mid - 1; // Look for smaller index on left
            } else {
                low = mid + 1;  // Must look on right
            }
        }

        return ans;
    }
};`,
  python: `# Python 3 Lower Bound Implementation
# Time: O(log N) | Space: O(1)
class Solution:
    def lowerBound(self, arr: list[int], target: int) -> int:
        low = 0
        high = len(arr) - 1
        ans = len(arr)

        while low <= high:
            mid = (low + high) // 2
            if arr[mid] >= target:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans`,
  java: `// Java Lower Bound Implementation
// Time: O(log N) | Space: O(1)
class Solution {
    public int lowerBound(int[] arr, int target) {
        int n = arr.length;
        int low = 0, high = n - 1;
        int ans = n;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] >= target) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }
}`,
  javascript: `// JavaScript Lower Bound Implementation
// Time: O(log N) | Space: O(1)
var lowerBound = function(arr, target) {
    let low = 0, high = arr.length - 1;
    let ans = arr.length;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (arr[mid] >= target) {
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
    title: '1. Initialize Range: low = 0, high = 6, Target = 6',
    phase: 'INIT',
    codeLine: 12,
    arr: [1, 2, 4, 6, 8, 10, 12],
    low: 0,
    high: 6,
    mid: null,
    target: 6,
    ans: 7,
    variables: { low: 0, high: 6, ans: 7, target: 6 },
    explain: 'Target is 6. Initial search space encompasses the entire array [0..6]. ans defaults to n = 7.',
    intuition: 'Lower bound seeks the earliest position satisfying arr[i] >= target.'
  },
  {
    title: '2. Check mid = 3 (val 6): 6 >= 6 (Valid! ans = 3, high = 2)',
    phase: 'EVAL_MID_3',
    codeLine: 18,
    arr: [1, 2, 4, 6, 8, 10, 12],
    low: 0,
    high: 2,
    mid: 3,
    target: 6,
    ans: 3,
    variables: { 'mid=3': 'arr[3] = 6 >= 6', updatedAns: 3, newHigh: 2 },
    explain: 'At index 3, arr[3] = 6 >= target. This is a valid candidate. Record ans = 3 and search left half (high = 2).',
    intuition: 'Could there be an even earlier index on the left satisfying >= 6?'
  },
  {
    title: '3. Check mid = 1 (val 2): 2 < 6 (Too small, low = 2)',
    phase: 'EVAL_MID_1',
    codeLine: 21,
    arr: [1, 2, 4, 6, 8, 10, 12],
    low: 2,
    high: 2,
    mid: 1,
    target: 6,
    ans: 3,
    variables: { 'mid=1': 'arr[1] = 2 < 6', newLow: 2, ansRemains: 3 },
    explain: 'arr[1] = 2 < 6. Must eliminate left half: low advances to mid + 1 = 2.',
    intuition: 'Eliminates all indices <= 1.'
  },
  {
    title: '4. Check mid = 2 (val 4): 4 < 6 -> Final Answer: Index 3',
    phase: 'COMPLETED',
    codeLine: 25,
    arr: [1, 2, 4, 6, 8, 10, 12],
    low: 3,
    high: 2,
    mid: 2,
    target: 6,
    ans: 3,
    variables: { 'mid=2': 'arr[2] = 4 < 6', 'Search Space Exhausted': 'low > high', finalLowerBound: 3 },
    explain: 'arr[2] = 4 < 6. low becomes 3. Loop terminates as low > high. Lower bound is index 3 (value 6)!',
    intuition: 'Index 3 is the earliest entry with value >= 6.'
  }
];

export default function LowerBoundVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Target Value: {step.target}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Lower Bound Index: {step.ans} ({step.ans < step.arr.length ? step.arr[step.ans] : 'None'})
        </span>
      </div>

      {/* Array Elements Display */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          Binary Search Pointers (low, mid, high)
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

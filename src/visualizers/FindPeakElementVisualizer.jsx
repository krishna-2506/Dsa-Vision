import React from 'react';

export const meta = {
  title: 'Find Peak Element',
  category: 'Binary Search',
  difficulty: 'Medium',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1)',
  description: 'Finds a peak element that is strictly greater than its neighbors in logarithmic O(log N) time using binary search slope climbing.'
};

export const solutions = {
  cpp: `// C++ Optimal O(log N) Binary Search for Peak Element
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return 0;
        if (nums[0] > nums[1]) return 0;
        if (nums[n - 1] > nums[n - 2]) return n - 1;

        int low = 1, high = n - 2;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // Check if mid is the peak
            if (nums[mid] > nums[mid - 1] && nums[mid] > nums[mid + 1]) {
                return mid;
            }

            // If we are on an ascending slope, peak is on the right
            if (nums[mid] > nums[mid - 1]) {
                low = mid + 1;
            } 
            // If descending slope, peak is on the left
            else {
                high = mid - 1;
            }
        }

        return -1;
    }
};`,
  python: `# Python 3 Optimal Peak Element Search
class Solution:
    def findPeakElement(self, nums: list[int]) -> int:
        n = len(nums)
        if n == 1:
            return 0
        if nums[0] > nums[1]:
            return 0
        if nums[n - 1] > nums[n - 2]:
            return n - 1

        low, high = 1, n - 2

        while low <= high:
            mid = (low + high) // 2

            if nums[mid] > nums[mid - 1] and nums[mid] > nums[mid + 1]:
                return mid

            if nums[mid] > nums[mid - 1]:
                low = mid + 1
            else:
                high = mid - 1

        return -1`,
  java: `// Java Optimal Peak Element Search
class Solution {
    public int findPeakElement(int[] nums) {
        int n = nums.length;
        if (n == 1) return 0;
        if (nums[0] > nums[1]) return 0;
        if (nums[n - 1] > nums[n - 2]) return n - 1;

        int low = 1, high = n - 2;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] > nums[mid - 1] && nums[mid] > nums[mid + 1]) {
                return mid;
            }

            if (nums[mid] > nums[mid - 1]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return -1;
    }
}`,
  javascript: `// JavaScript Optimal Peak Element Search
var findPeakElement = function(nums) {
    const n = nums.length;
    if (n === 1) return 0;
    if (nums[0] > nums[1]) return 0;
    if (nums[n - 1] > nums[n - 2]) return n - 1;

    let low = 1, high = n - 2;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (nums[mid] > nums[mid - 1] && nums[mid] > nums[mid + 1]) {
            return mid;
        }

        if (nums[mid] > nums[mid - 1]) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;
};`
};

export const steps = [
  {
    title: '1. Initial State: Array [1, 2, 1, 3, 5, 6, 4], Search [1...5]',
    phase: 'INITIAL',
    codeLine: 13,
    array: [1, 2, 1, 3, 5, 6, 4],
    low: 1,
    high: 5,
    mid: null,
    peakFound: false,
    variables: { low: 1, high: 5, array: '[1, 2, 1, 3, 5, 6, 4]' },
    explain: 'Endpoints are checked: nums[0] is not peak, nums[6] is not peak. Search space is interior range [1...5].',
    intuition: 'If nums[mid] > nums[mid-1], the slope is climbing upward, guaranteeing a local maximum exists somewhere to the right.'
  },
  {
    title: '2. Iteration 1: mid = 3 (3). nums[3] > nums[2] (1) -> Climbing Slope -> Go Right',
    phase: 'CLIMB_RIGHT',
    codeLine: 24,
    array: [1, 2, 1, 3, 5, 6, 4],
    low: 4,
    high: 5,
    mid: 3,
    peakFound: false,
    variables: { mid: 3, 'nums[mid]': 3, 'nums[mid-1]': 1, slope: 'Ascending', action: 'low = mid + 1 = 4' },
    explain: 'nums[3]=3 is greater than nums[2]=1. We are on an upward slope! A peak is guaranteed to the right. Advance low to 4.',
    intuition: 'Follow the upward slope towards the peak.'
  },
  {
    title: '3. Iteration 2: mid = 4 (5). nums[4] > nums[3] (3) -> Climbing Slope -> Go Right',
    phase: 'CLIMB_RIGHT',
    codeLine: 24,
    array: [1, 2, 1, 3, 5, 6, 4],
    low: 5,
    high: 5,
    mid: 4,
    peakFound: false,
    variables: { mid: 4, 'nums[mid]': 5, 'nums[mid-1]': 3, action: 'low = mid + 1 = 5' },
    explain: 'nums[4]=5 > nums[3]=3. Still ascending! Advance low to 5.',
    intuition: 'Approaching the summit.'
  },
  {
    title: '4. Iteration 3: mid = 5 (6). nums[5] > 5 and nums[5] > 4 -> PEAK FOUND!',
    phase: 'COMPLETED',
    codeLine: 19,
    array: [1, 2, 1, 3, 5, 6, 4],
    low: 5,
    high: 5,
    mid: 5,
    peakFound: true,
    variables: { peakIndex: 5, peakValue: 6, leftNeighbor: 5, rightNeighbor: 4, timeComplexity: 'O(log N)' },
    explain: 'nums[5]=6 is strictly greater than both its left neighbor (5) and right neighbor (4)! Peak identified at index 5!',
    intuition: 'Summit reached in O(log N) comparisons.'
  }
];

export default function FindPeakElementVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Slope Status */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold">
          Phase: {step.phase}
        </span>
        {step.peakFound && (
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold animate-pulse">
            ⛰ Peak Confirmed at index {step.mid}
          </span>
        )}
      </div>

      {/* Array Elements with Altitude Representation */}
      <div className="w-full flex items-end justify-center gap-3 py-6 h-36">
        {step.array.map((val, idx) => {
          const isMid = step.mid === idx;
          const isPeak = step.peakFound && step.mid === idx;
          const heightPct = (val / 7) * 100;

          let style = 'bg-[#181a24] text-white border-[#2b2e40]';
          if (isPeak) {
            style = 'bg-emerald-500/25 text-emerald-300 border-emerald-400 scale-105 shadow-xl shadow-emerald-500/30 font-extrabold';
          } else if (isMid) {
            style = 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105 shadow-md shadow-amber-500/20';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[48px]">
              <div className="h-5 flex items-center text-[9px] font-mono font-bold">
                {isPeak ? <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white">⛰ Peak</span> :
                 isMid ? <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white">mid</span> : null}
              </div>

              {/* Bar */}
              <div
                style={{ height: `${Math.max(40, heightPct)}px` }}
                className={`w-12 rounded-xl border flex items-center justify-center font-mono text-base font-bold transition-all duration-300 ${style}`}
              >
                {val}
              </div>

              <span className="text-[10px] font-mono text-[#5b6076]">[{idx}]</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

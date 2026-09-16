import React from 'react';

export const meta = {
  title: 'Left Rotate Array by K Places (Optimal Reversal Algorithm)',
  category: 'Arrays & In-Place Rotation',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) In-Place',
  description: 'Rotates an array to the left by K positions in-place using the three-reversal algorithm: reverse first K elements, reverse remaining N-K elements, then reverse the entire array.'
};

export const solutions = {
  cpp: `// C++ Optimal In-Place 3-Reversal Left Rotation
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void leftRotate(vector<int>& nums, int k) {
        int n = nums.size();
        k = k % n;

        // Step 1: Reverse first k elements [0 ... k-1]
        reverse(nums.begin(), nums.begin() + k);

        // Step 2: Reverse remaining elements [k ... n-1]
        reverse(nums.begin() + k, nums.end());

        // Step 3: Reverse the entire array [0 ... n-1]
        reverse(nums.begin(), nums.end());
    }
};`,
  python: `# Python 3 Optimal In-Place 3-Reversal Algorithm
class Solution:
    def leftRotate(self, nums: list[int], k: int) -> None:
        n = len(nums)
        k = k % n

        def rev(l: int, r: int):
            while l < r:
                nums[l], nums[r] = nums[r], nums[l]
                l += 1
                r -= 1

        # Step 1: Reverse first k elements
        rev(0, k - 1)
        # Step 2: Reverse remaining n - k elements
        rev(k, n - 1)
        # Step 3: Reverse entire array
        rev(0, n - 1)`,
  java: `// Java Optimal In-Place 3-Reversal Algorithm
class Solution {
    public void leftRotate(int[] nums, int k) {
        int n = nums.length;
        k = k % n;

        reverse(nums, 0, k - 1);
        reverse(nums, k, n - 1);
        reverse(nums, 0, n - 1);
    }

    private void reverse(int[] nums, int l, int r) {
        while (l < r) {
            int temp = nums[l];
            nums[l] = nums[r];
            nums[r] = temp;
            l++;
            r--;
        }
    }
}`,
  javascript: `// JavaScript Optimal In-Place 3-Reversal Algorithm
var leftRotate = function(nums, k) {
    const n = nums.length;
    k = k % n;

    const reverse = (l, r) => {
        while (l < r) {
            [nums[l], nums[r]] = [nums[r], nums[l]];
            l++;
            r--;
        }
    };

    reverse(0, k - 1);
    reverse(k, n - 1);
    reverse(0, n - 1);
};`
};

export const steps = [
  {
    title: '1. Initial State: Array [1, 2, 3, 4, 5, 6, 7], k = 3',
    phase: 'INITIAL',
    codeLine: 12,
    array: [1, 2, 3, 4, 5, 6, 7],
    reversedRange: null,
    k: 3,
    variables: { k: 3, n: 7, plan: '3-Reversal Algorithm: [0..k-1], [k..n-1], [0..n-1]' },
    explain: 'Left rotating by k=3 shifts each element 3 places to the left. The first 3 elements [1, 2, 3] should wrap around to the end.',
    intuition: 'Instead of shifting one by one or using O(N) extra memory, reversing subarrays achieves rotation in-place in O(N) total steps.'
  },
  {
    title: '2. Step 1: Reverse First K Elements [0...2] -> [3, 2, 1]',
    phase: 'REVERSE_FIRST_K',
    codeLine: 16,
    array: [3, 2, 1, 4, 5, 6, 7],
    reversedRange: [0, 2],
    k: 3,
    variables: { range: '[0...2]', before: '[1, 2, 3]', after: '[3, 2, 1]' },
    explain: 'Reverse the first k=3 elements (indices 0 to 2). [1, 2, 3] becomes [3, 2, 1].',
    intuition: 'Reversing inverts the order so that a global reversal will restore them to normal order at the tail.'
  },
  {
    title: '3. Step 2: Reverse Remaining Elements [3...6] -> [7, 6, 5, 4]',
    phase: 'REVERSE_REMAINING',
    codeLine: 19,
    array: [3, 2, 1, 7, 6, 5, 4],
    reversedRange: [3, 6],
    k: 3,
    variables: { range: '[3...6]', before: '[4, 5, 6, 7]', after: '[7, 6, 5, 4]' },
    explain: 'Reverse the remaining elements from index k=3 to n-1=6. [4, 5, 6, 7] becomes [7, 6, 5, 4].',
    intuition: 'Both partitions are now independently inverted.'
  },
  {
    title: '4. Step 3: Reverse Entire Array [0...6] -> [4, 5, 6, 7, 1, 2, 3]',
    phase: 'REVERSE_ALL',
    codeLine: 22,
    array: [4, 5, 6, 7, 1, 2, 3],
    reversedRange: [0, 6],
    k: 3,
    variables: { range: '[0...6]', result: '[4, 5, 6, 7, 1, 2, 3]' },
    explain: 'Reverse the whole array [0...6]. Notice how [7, 6, 5, 4] flipped to [4, 5, 6, 7] at the front, and [3, 2, 1] flipped to [1, 2, 3] at the end!',
    intuition: 'Mathematical magic of transposition: (A^R B^R)^R = (B^R)^R (A^R)^R = B A!'
  },
  {
    title: '5. Completed: Array Successfully Rotated Left by 3 Places',
    phase: 'COMPLETED',
    codeLine: 22,
    array: [4, 5, 6, 7, 1, 2, 3],
    reversedRange: null,
    k: 3,
    variables: { status: 'Success', timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    explain: 'The array is now [4, 5, 6, 7, 1, 2, 3]. Clean, in-place, and ultra efficient.',
    intuition: 'Standard interview question solved using optimal block reversal.'
  }
];

export default function LeftRotateArrayByKPlacesVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Controls / Info Badge */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Shift Left by K = {step.k}
        </span>
        <span className="px-3 py-1 rounded-lg bg-[#161824] border border-[#272b3c] text-indigo-300 font-semibold">
          Phase: {step.phase}
        </span>
      </div>

      {/* Array Elements */}
      <div className="w-full flex items-center justify-center gap-2.5 py-4">
        {step.array.map((val, idx) => {
          const inRange = step.reversedRange && idx >= step.reversedRange[0] && idx <= step.reversedRange[1];
          const isKBoundary = idx === step.k - 1;

          let style = 'bg-[#181a24] text-white border-[#2b2e40]';
          if (step.phase === 'COMPLETED') {
            style = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm';
          } else if (inRange) {
            style = 'bg-indigo-500/25 text-indigo-200 border-indigo-500 scale-105 shadow-md shadow-indigo-500/20';
          }

          return (
            <React.Fragment key={idx}>
              <div className="flex flex-col items-center gap-1.5 min-w-[48px]">
                {/* Active range tag */}
                <div className="h-5 flex items-center text-[9px] font-mono font-bold">
                  {inRange && <span className="text-indigo-400">rev</span>}
                </div>

                {/* Card */}
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono text-lg font-bold transition-all duration-300 ${style}`}>
                  {val}
                </div>

                <span className="text-[10px] font-mono text-[#5b6076]">[{idx}]</span>
              </div>

              {/* Visual Divider at K */}
              {isKBoundary && step.phase !== 'COMPLETED' && step.phase !== 'REVERSE_ALL' && (
                <div className="h-12 border-r-2 border-dashed border-amber-500/50 mx-1 flex items-center" title="K Boundary"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Reversal Steps Legend */}
      <div className="flex items-center gap-6 text-xs font-mono text-[#8a8ea3]">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500"></span>
          <span>1. Reverse [0...k-1]</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-indigo-500/30 border border-indigo-500"></span>
          <span>2. Reverse [k...n-1]</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500"></span>
          <span>3. Reverse All</span>
        </div>
      </div>
    </div>
  );
}

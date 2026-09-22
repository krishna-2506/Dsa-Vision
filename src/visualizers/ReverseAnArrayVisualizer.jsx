import React from 'react';

export const meta = {
  title: 'Reverse an Array (In-Place Two Pointers)',
  category: 'Arrays & Two Pointers',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) In-Place',
  description: 'Reverses an array in-place by swapping symmetric elements from both ends using two pointers converging towards the center.'
};

export const solutions = {
  cpp: `// C++ Optimal In-Place Two-Pointer Array Reversal
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void reverseArray(vector<int>& arr) {
        int left = 0, right = arr.size() - 1;

        while (left < right) {
            swap(arr[left], arr[right]);
            left++;
            right--;
        }
    }
};`,
  python: `# Python 3 Optimal Two-Pointer Array Reversal
class Solution:
    def reverseArray(self, arr: list[int]) -> None:
        left, right = 0, len(arr) - 1

        while left < right:
            arr[left], arr[right] = arr[right], arr[left]
            left += 1
            right -= 1`,
  java: `// Java Optimal Two-Pointer Array Reversal
class Solution {
    public void reverseArray(int[] arr) {
        int left = 0, right = arr.length - 1;

        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
    }
}`,
  javascript: `// JavaScript Optimal Two-Pointer Array Reversal
var reverseArray = function(arr) {
    let left = 0, right = arr.length - 1;

    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
};`
};

export const steps = [
  {
    title: '1. Initialize Pointers: left = 0 (val 1), right = 4 (val 5)',
    phase: 'INITIALIZATION',
    codeLine: 11,
    array: [1, 2, 3, 4, 5],
    left: 0,
    right: 4,
    variables: { left: 0, right: 4, 'arr[0]': 1, 'arr[4]': 5 },
    explain: 'Start left pointer at index 0 and right pointer at index 4 (last element).',
    intuition: 'Symmetric elements at indices i and (n - 1 - i) swap positions.'
  },
  {
    title: '2. Swap arr[0] (1) with arr[4] (5): [5, 2, 3, 4, 1]',
    phase: 'SWAPPING',
    codeLine: 15,
    array: [5, 2, 3, 4, 1],
    left: 0,
    right: 4,
    variables: { action: 'swap(arr[0], arr[4])', array: '[5, 2, 3, 4, 1]' },
    explain: 'Swap outer pair. Advance left = 1, decrement right = 3.',
    intuition: 'Outermost elements inverted.'
  },
  {
    title: '3. Swap arr[1] (2) with arr[3] (4): [5, 4, 3, 2, 1]',
    phase: 'SWAPPING',
    codeLine: 15,
    array: [5, 4, 3, 2, 1],
    left: 1,
    right: 3,
    variables: { action: 'swap(arr[1], arr[3])', array: '[5, 4, 3, 2, 1]' },
    explain: 'Swap inner pair 2 and 4. Advance left = 2, decrement right = 2.',
    intuition: 'Second layer inverted.'
  },
  {
    title: '4. Convergence: left == right (2 == 2, Center element 3)',
    phase: 'COMPLETED',
    codeLine: 18,
    array: [5, 4, 3, 2, 1],
    left: 2,
    right: 2,
    variables: { status: 'Reversal complete', result: '[5, 4, 3, 2, 1]', timeComplexity: 'O(N/2)' },
    explain: 'Both pointers meet at index 2 (element 3). Loop terminates. The entire array is reversed!',
    intuition: 'Completed in N/2 swaps with zero extra space.'
  }
];

export default function ReverseAnArrayVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Pointers Banner */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="px-3 py-1 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Left: {step.left}
        </span>
        <span className="px-3 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Right: {step.right}
        </span>
        <span className="text-xs font-mono text-[var(--chalk-dim)] px-3 py-1 rounded-lg bg-[#141622] border border-[#272b3d]">
          Phase: {step.phase}
        </span>
      </div>

      {/* Array Display */}
      <div className="w-full flex items-center justify-center gap-2.5 py-4">
        {step.array.map((val, idx) => {
          const isLeft = step.left === idx;
          const isRight = step.right === idx;
          const isBoth = isLeft && isRight;

          let style = 'bg-[#181a24] text-[var(--chalk)] border-[#2b2e40]';
          if (step.phase === 'COMPLETED') {
            style = 'bg-emerald-500/20 text-emerald-200 border-emerald-500/50 shadow-sm';
          } else if (isBoth) {
            style = 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105 shadow-md';
          } else if (isLeft) {
            style = 'bg-blue-500/25 text-blue-300 border-blue-400 scale-105 shadow-md shadow-blue-500/20';
          } else if (isRight) {
            style = 'bg-purple-500/25 text-purple-300 border-purple-400 scale-105 shadow-md shadow-purple-500/20';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[50px]">
              <div className="h-5 flex items-center text-[9px] font-mono font-bold">
                {isBoth ? (
                  <span className="px-1.5 py-0.5 rounded bg-amber-500 text-[var(--chalk)]">Center</span>
                ) : (
                  <>
                    {isLeft && <span className="px-1.5 py-0.5 rounded bg-blue-500 text-[var(--chalk)]">L</span>}
                    {isRight && <span className="px-1.5 py-0.5 rounded bg-purple-500 text-[var(--chalk)]">R</span>}
                  </>
                )}
              </div>

              <div className={`w-13 h-13 rounded-xl border flex items-center justify-center font-mono text-lg font-bold transition-all duration-300 ${style}`}>
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

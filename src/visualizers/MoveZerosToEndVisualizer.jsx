import React from 'react';

export const meta = {
  title: 'Move Zeros to End',
  category: 'Arrays & Two Pointers',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Moves all 0s to the end of the array while maintaining the relative order of the non-zero elements in-place.'
};

export const solutions = {
  cpp: `// C++ Move Zeros to End (Optimal 2-Pointer)
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int j = -1;
        int n = nums.size();

        // 1. Locate the first zero element
        for (int i = 0; i < n; i++) {
            if (nums[i] == 0) {
                j = i;
                break;
            }
        }

        // If no zero exists, array is already optimal
        if (j == -1) return;

        // 2. Swap non-zero elements with pointer j
        for (int i = j + 1; i < n; i++) {
            if (nums[i] != 0) {
                swap(nums[i], nums[j]);
                j++;
            }
        }
    }
};`,
  python: `# Python 3 Move Zeros to End
class Solution:
    def moveZeroes(self, nums: list[int]) -> None:
        j = -1
        for i in range(len(nums)):
            if nums[i] == 0:
                j = i
                break
                
        if j == -1:
            return
            
        for i in range(j + 1, len(nums)):
            if nums[i] != 0:
                nums[i], nums[j] = nums[j], nums[i]
                j += 1`,
  java: `// Java Move Zeros to End
class Solution {
    public void moveZeroes(int[] nums) {
        int j = -1;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == 0) {
                j = i;
                break;
            }
        }
        if (j == -1) return;

        for (int i = j + 1; i < nums.length; i++) {
            if (nums[i] != 0) {
                int temp = nums[i];
                nums[i] = nums[j];
                nums[j] = temp;
                j++;
            }
        }
    }
}`,
  javascript: `// JavaScript Move Zeros to End
var moveZeroes = function(nums) {
    let j = -1;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            j = i;
            break;
        }
    }
    if (j === -1) return;

    for (let i = j + 1; i < nums.length; i++) {
        if (nums[i] !== 0) {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            j++;
        }
    }
};`
};

export const steps = [
  {
    title: '1. Locate First Zero: j = 0',
    phase: 'FIRST_ZERO_SEARCH',
    codeLine: 13,
    array: [0, 1, 0, 3, 12],
    i: 0,
    j: 0,
    variables: { j: 0, 'nums[0]': 0 },
    explain: 'Scan array to find the first occurrence of 0. Index 0 contains 0, so pointer j is locked at index 0.',
    intuition: 'Pointer j will track the boundary of zeros waiting to be swapped with upcoming non-zeros.'
  },
  {
    title: '2. Scan i = 1: Encounter Non-Zero 1',
    phase: 'SWAPPING',
    codeLine: 26,
    array: [1, 0, 0, 3, 12],
    i: 1,
    j: 1,
    variables: { i: 1, j: 0, 'action': 'swap(nums[1], nums[0])', nextJ: 1 },
    explain: 'nums[1] = 1 (non-zero). Swap nums[1] with nums[j=0]. Increment j to 1.',
    intuition: 'Non-zero element 1 moves to the front, while 0 is pushed back.'
  },
  {
    title: '3. Scan i = 2: Encounter Zero (Skip)',
    phase: 'SCANNING',
    codeLine: 24,
    array: [1, 0, 0, 3, 12],
    i: 2,
    j: 1,
    variables: { i: 2, 'nums[2]': 0, action: 'Skip zero' },
    explain: 'nums[2] = 0. We do not swap zero with zero. Move i forward to 3.',
    intuition: 'Pointers i and j separate: j marks earliest 0, i searches for next non-zero.'
  },
  {
    title: '4. Scan i = 3: Encounter Non-Zero 3',
    phase: 'SWAPPING',
    codeLine: 26,
    array: [1, 3, 0, 0, 12],
    i: 3,
    j: 2,
    variables: { i: 3, j: 1, 'action': 'swap(nums[3], nums[1])', nextJ: 2 },
    explain: 'nums[3] = 3. Swap with nums[j=1] (0). Increment j to 2.',
    intuition: '3 takes its rightful position right after 1, preserving relative order.'
  },
  {
    title: '5. Scan i = 4: Encounter Non-Zero 12',
    phase: 'SWAPPING',
    codeLine: 26,
    array: [1, 3, 12, 0, 0],
    i: 4,
    j: 3,
    variables: { i: 4, j: 2, 'action': 'swap(nums[4], nums[2])', nextJ: 3 },
    explain: 'nums[4] = 12. Swap with nums[j=2] (0). Increment j to 3.',
    intuition: 'All non-zero integers [1, 3, 12] are now compacted to the left.'
  },
  {
    title: '6. Traversal Complete: [1, 3, 12, 0, 0]',
    phase: 'COMPLETED',
    codeLine: 29,
    array: [1, 3, 12, 0, 0],
    i: 5,
    j: 3,
    variables: { isComplete: true, result: '[1, 3, 12, 0, 0]' },
    explain: 'Array traversal finished. All zeros are situated at the tail while order of [1, 3, 12] is strictly preserved.',
    intuition: 'Two-pointer approach operates in O(N) linear time and O(1) space.'
  }
];

export default function MoveZerosToEndVisualizer({ currentStep = 0, onStepChange }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="w-full flex items-center justify-center gap-3 py-6">
        {step.array.map((val, idx) => {
          const isI = step.i === idx;
          const isJ = step.j === idx;
          const isZero = val === 0;

          let cardColor = 'border-[#262834] bg-[#14151c] text-[var(--chalk)]';
          if (isZero) cardColor = 'border-rose-500/40 bg-rose-500/10 text-rose-300';
          else cardColor = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300';

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[56px]">
              <div className="h-6 flex items-center gap-1 text-[10px] font-mono font-bold">
                {isJ && <span className="px-1.5 rounded bg-indigo-500 text-[var(--chalk)]">j</span>}
                {isI && <span className="px-1.5 rounded bg-amber-500 text-[var(--chalk)]">i</span>}
              </div>

              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center font-mono text-xl font-bold transition-all duration-300 ${cardColor}`}>
                {val}
              </div>

              <span className="text-[10px] font-mono text-[#5b5e6e]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-6 text-xs font-mono text-[#8e92a4]">
        <span><strong className="text-indigo-400">j</strong> = points to zero slot</span>
        <span>•</span>
        <span><strong className="text-amber-400">i</strong> = scans for non-zero elements</span>
      </div>
    </div>
  );
}

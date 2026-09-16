import React from 'react';

export const meta = {
  title: 'Next Permutation',
  category: 'Arrays & Permutations',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) In-Place',
  description: 'Rearranges numbers into the lexicographically next greater permutation in-place. Follows the 3-step pivot algorithm: find the rightmost dip, swap with the next greater element, and reverse the tail suffix.'
};

export const solutions = {
  cpp: `// C++ Optimal In-Place Next Permutation
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int n = nums.size();
        int ind = -1;

        // Step 1: Find the rightmost dip / break point
        for (int i = n - 2; i >= 0; i--) {
            if (nums[i] < nums[i + 1]) {
                ind = i;
                break;
            }
        }

        // If no break point, array is descending (e.g., [5,4,3,2,1])
        if (ind == -1) {
            reverse(nums.begin(), nums.end());
            return;
        }

        // Step 2: Find smallest element greater than nums[ind] from right
        for (int i = n - 1; i > ind; i--) {
            if (nums[i] > nums[ind]) {
                swap(nums[i], nums[ind]);
                break;
            }
        }

        // Step 3: Reverse the remaining suffix from ind + 1 to end
        reverse(nums.begin() + ind + 1, nums.end());
    }
};`,
  python: `# Python 3 Optimal Next Permutation
class Solution:
    def nextPermutation(self, nums: list[int]) -> None:
        n = len(nums)
        ind = -1
        
        # Step 1: Find pivot where nums[i] < nums[i+1]
        for i in range(n - 2, -1, -1):
            if nums[i] < nums[i + 1]:
                ind = i
                break
                
        if ind == -1:
            nums.reverse()
            return
            
        # Step 2: Find next greater element from right
        for i in range(n - 1, ind, -1):
            if nums[i] > nums[ind]:
                nums[i], nums[ind] = nums[ind], nums[i]
                break
                
        # Step 3: Reverse the suffix
        nums[ind + 1:] = reversed(nums[ind + 1:])`,
  java: `// Java Optimal Next Permutation
class Solution {
    public void nextPermutation(int[] nums) {
        int n = nums.length;
        int ind = -1;
        
        // Step 1: Find breakpoint
        for (int i = n - 2; i >= 0; i--) {
            if (nums[i] < nums[i + 1]) {
                ind = i;
                break;
            }
        }
        
        if (ind != -1) {
            // Step 2: Find element to swap
            for (int i = n - 1; i > ind; i--) {
                if (nums[i] > nums[ind]) {
                    int temp = nums[i];
                    nums[i] = nums[ind];
                    nums[ind] = temp;
                    break;
                }
            }
        }
        
        // Step 3: Reverse suffix
        int l = ind + 1, r = n - 1;
        while (l < r) {
            int temp = nums[l];
            nums[l] = nums[r];
            nums[r] = temp;
            l++;
            r--;
        }
    }
}`,
  javascript: `// JavaScript Optimal Next Permutation
var nextPermutation = function(nums) {
    const n = nums.length;
    let ind = -1;
    
    // Step 1: Find break point
    for (let i = n - 2; i >= 0; i--) {
        if (nums[i] < nums[i + 1]) {
            ind = i;
            break;
        }
    }
    
    if (ind !== -1) {
        // Step 2: Find successor to swap
        for (let i = n - 1; i > ind; i--) {
            if (nums[i] > nums[ind]) {
                [nums[i], nums[ind]] = [nums[ind], nums[i]];
                break;
            }
        }
    }
    
    // Step 3: Reverse suffix
    let l = ind + 1, r = n - 1;
    while (l < r) {
        [nums[l], nums[r]] = [nums[r], nums[l]];
        l++;
        r--;
    }
};`
};

export const steps = [
  {
    title: '1. Initial Permutation: [1, 2, 5, 4, 3]',
    phase: 'INITIAL',
    codeLine: 11,
    array: [1, 2, 5, 4, 3],
    pivot: null,
    successor: null,
    reverseRange: null,
    variables: { array: '[1, 2, 5, 4, 3]', step: 'Scan from right for first dip' },
    explain: 'Starting from the right end, we look for the first index i where nums[i] < nums[i+1]. Everything to the right of this index is currently sorted in descending order.',
    intuition: 'A descending suffix is the highest possible permutation for those digits. To make the next permutation, we must alter the digit right before it.'
  },
  {
    title: '2. Found Breakpoint: i = 1 (val 2) < nums[2] (val 5)',
    phase: 'FIND_PIVOT',
    codeLine: 16,
    array: [1, 2, 5, 4, 3],
    pivot: 1,
    successor: null,
    reverseRange: null,
    variables: { ind: 1, 'nums[ind]': 2, 'nums[ind+1]': 5 },
    explain: 'At index 1, nums[1] = 2 is strictly less than nums[2] = 5. Index 1 is our pivot breakpoint!',
    intuition: 'Digit 2 needs to be replaced with the next slightly larger digit from the descending suffix [5, 4, 3].'
  },
  {
    title: '3. Find Smallest Successor > 2: Found 3 at index 4',
    phase: 'FIND_SUCCESSOR',
    codeLine: 28,
    array: [1, 2, 5, 4, 3],
    pivot: 1,
    successor: 4,
    reverseRange: null,
    variables: { successorIndex: 4, 'nums[4]': 3, pivotVal: 2 },
    explain: 'Scanning suffix from right: 3 > 2. So index 4 is the smallest element in the suffix that is greater than nums[ind].',
    intuition: 'Swapping 2 with 3 ensures the prefix grows by the minimal possible amount.'
  },
  {
    title: '4. Swap nums[1] (2) with nums[4] (3): [1, 3, 5, 4, 2]',
    phase: 'SWAP_PIVOT',
    codeLine: 30,
    array: [1, 3, 5, 4, 2],
    pivot: 1,
    successor: 4,
    reverseRange: null,
    variables: { 'action': 'swap(nums[1], nums[4])', array: '[1, 3, 5, 4, 2]' },
    explain: 'After swapping, nums[1] is now 3. Notice the suffix [5, 4, 2] is still strictly in descending order.',
    intuition: 'Now the new prefix [1, 3] is established. To make the permutation minimal overall, the suffix must be in ascending order.'
  },
  {
    title: '5. Reverse Suffix [ind+1 ... end]: [5, 4, 2] -> [2, 4, 5]',
    phase: 'REVERSE_SUFFIX',
    codeLine: 36,
    array: [1, 3, 2, 4, 5],
    pivot: null,
    successor: null,
    reverseRange: [2, 4],
    variables: { 'action': 'reverse(suffix)', final: '[1, 3, 2, 4, 5]' },
    explain: 'Reversing a descending sequence produces an ascending sequence in O(K) time without sorting.',
    intuition: 'An ascending tail gives the smallest possible magnitude for the suffix.'
  },
  {
    title: '6. Completed Next Permutation: [1, 3, 2, 4, 5]',
    phase: 'COMPLETED',
    codeLine: 36,
    array: [1, 3, 2, 4, 5],
    pivot: null,
    successor: null,
    reverseRange: null,
    variables: { result: '[1, 3, 2, 4, 5]', timeComplexity: 'O(N)' },
    explain: 'The next permutation is [1, 3, 2, 4, 5]. Algorithm executed in linear O(N) time with O(1) extra space!',
    intuition: 'Perfect next lexicographical ordering guaranteed by mathematical construction.'
  }
];

export default function NextPermutationVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Current Phase */}
      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#161824] border border-[#272b3c] text-indigo-300">
        Phase: {step.phase}
      </span>

      {/* Array Elements */}
      <div className="w-full flex items-center justify-center gap-3 py-4">
        {step.array.map((val, idx) => {
          const isPivot = step.pivot === idx;
          const isSuccessor = step.successor === idx;
          const inReverseRange = step.reverseRange && idx >= step.reverseRange[0] && idx <= step.reverseRange[1];

          let style = 'bg-[#181a24] text-white border-[#2b2e40]';
          if (isPivot) style = 'bg-rose-500/20 text-rose-300 border-rose-500 scale-105 shadow-md shadow-rose-500/20';
          else if (isSuccessor) style = 'bg-amber-500/20 text-amber-300 border-amber-500 scale-105 shadow-md shadow-amber-500/20';
          else if (inReverseRange) style = 'bg-indigo-500/20 text-indigo-300 border-indigo-500/60';

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[52px]">
              {/* Pointer labels */}
              <div className="h-5 flex items-center text-[10px] font-mono font-bold">
                {isPivot && <span className="px-1.5 py-0.5 rounded bg-rose-500 text-white">Pivot</span>}
                {isSuccessor && <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white">Next &gt;</span>}
                {inReverseRange && !isPivot && !isSuccessor && (
                  <span className="text-indigo-400 text-[10px]">rev</span>
                )}
              </div>

              {/* Number Card */}
              <div className={`w-14 h-14 rounded-xl border flex items-center justify-center font-mono text-xl font-bold transition-all duration-300 ${style}`}>
                {val}
              </div>

              <span className="text-[10px] font-mono text-[#5b5e6e]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Explanatory Legend */}
      <div className="flex items-center gap-6 text-xs font-mono text-[#8a8ea3]">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-rose-500/30 border border-rose-500"></span>
          <span>Pivot (nums[i] &lt; nums[i+1])</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500"></span>
          <span>Successor (nums[j] &gt; nums[i])</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-indigo-500/30 border border-indigo-500"></span>
          <span>Reversed Tail</span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Left Rotate Array by One Place',
  category: 'Arrays & In-Place Shifting',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) In-Place',
  description: 'Shifts all array elements one position to the left in-place, caching the initial first element and assigning it to the final array slot.'
};

export const solutions = {
  cpp: `// C++ Optimal In-Place Left Rotation by One
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    void rotateArrayByOne(vector<int>& nums) {
        int n = nums.size();
        if (n <= 1) return;

        int temp = nums[0]; // 1. Cache first element

        // 2. Shift all subsequent elements 1 position to the left
        for (int i = 0; i < n - 1; i++) {
            nums[i] = nums[i + 1];
        }

        // 3. Assign cached first element to the last slot
        nums[n - 1] = temp;
    }
};`,
  python: `# Python 3 Optimal In-Place Left Rotation by One
class Solution:
    def rotateArrayByOne(self, nums: list[int]) -> None:
        if len(nums) <= 1:
            return
        
        temp = nums[0]
        n = len(nums)
        for i in range(n - 1):
            nums[i] = nums[i + 1]
            
        nums[n - 1] = temp`,
  java: `// Java Optimal In-Place Left Rotation by One
class Solution {
    public void rotateArrayByOne(int[] nums) {
        if (nums.length <= 1) return;

        int temp = nums[0];
        for (int i = 0; i < nums.length - 1; i++) {
            nums[i] = nums[i + 1];
        }
        nums[nums.length - 1] = temp;
    }
}`,
  javascript: `// JavaScript Optimal In-Place Left Rotation by One
var rotateArrayByOne = function(nums) {
    if (nums.length <= 1) return;

    const temp = nums[0];
    for (let i = 0; i < nums.length - 1; i++) {
        nums[i] = nums[i + 1];
    }
    nums[nums.length - 1] = temp;
};`
};

export const steps = [
  {
    title: '1. Initial State: Array [1, 2, 3, 4, 5]',
    phase: 'INITIAL',
    codeLine: 12,
    array: [1, 2, 3, 4, 5],
    temp: null,
    shiftedIdx: null,
    variables: { array: '[1, 2, 3, 4, 5]', temp: 'None' },
    explain: 'To rotate left by 1, element 1 at index 0 must wrap around to index 4, while elements 2, 3, 4, 5 shift left by 1 index.',
    intuition: 'If we overwrite arr[0] without saving it, we lose the value 1. We must cache it first.'
  },
  {
    title: '2. Cache First Element: temp = nums[0] (1)',
    phase: 'CACHE_FIRST',
    codeLine: 15,
    array: [1, 2, 3, 4, 5],
    temp: 1,
    shiftedIdx: 0,
    variables: { temp: 1, 'nums[0]': 1, action: 'Cached in temp' },
    explain: 'Store nums[0]=1 in variable temp. Index 0 is now ready to receive nums[1].',
    intuition: 'Safeguards the head value before beginning the shift.'
  },
  {
    title: '3. Shift: nums[0] = nums[1] (2) & nums[1] = nums[2] (3)',
    phase: 'SHIFTING',
    codeLine: 19,
    array: [2, 3, 3, 4, 5],
    temp: 1,
    shiftedIdx: 1,
    variables: { 'nums[0]': 2, 'nums[1]': 3, temp: 1 },
    explain: 'Shift elements from left to right. nums[0] becomes 2, nums[1] becomes 3.',
    intuition: 'Each element slides into the index before it.'
  },
  {
    title: '4. Shift Remaining: nums[2] = 4 & nums[3] = 5',
    phase: 'SHIFTING',
    codeLine: 19,
    array: [2, 3, 4, 5, 5],
    temp: 1,
    shiftedIdx: 3,
    variables: { 'nums[2]': 4, 'nums[3]': 5, temp: 1 },
    explain: 'nums[2] becomes 4, nums[3] becomes 5. All elements [1...4] have shifted left by 1 slot.',
    intuition: 'Last slot nums[4] is ready for the cached temp value.'
  },
  {
    title: '5. Assign Cached Element: nums[4] = temp (1)',
    phase: 'COMPLETED',
    codeLine: 23,
    array: [2, 3, 4, 5, 1],
    temp: 1,
    shiftedIdx: 4,
    variables: { 'nums[4]': 1, result: '[2, 3, 4, 5, 1]', timeComplexity: 'O(N)' },
    explain: 'Assign temp=1 to nums[4]. Array rotation by 1 position complete! Output: [2, 3, 4, 5, 1].',
    intuition: 'Single pass O(N) time with strictly O(1) extra space.'
  }
];

export default function LeftRotateArrayByOneVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Temp Cache Indicator */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono">
          <span className="text-[#8a8ea3]">temp cache:</span>
          <span className={`px-2 py-0.5 rounded font-bold ${
            step.temp !== null ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-[#555a72]'
          }`}>
            {step.temp !== null ? step.temp : 'None'}
          </span>
        </div>
        <span className="text-xs font-mono text-[#8a8ea3] px-3 py-1.5 rounded-xl bg-[#141622] border border-[#272b3d]">
          Phase: {step.phase}
        </span>
      </div>

      {/* Array Elements */}
      <div className="w-full flex items-center justify-center gap-2.5 py-4">
        {step.array.map((val, idx) => {
          const isShifted = step.shiftedIdx === idx;
          const isFinalTail = step.phase === 'COMPLETED' && idx === step.array.length - 1;

          let style = 'bg-[#181a24] text-white border-[#2b2e40]';
          if (isFinalTail) {
            style = 'bg-emerald-500/25 text-emerald-300 border-emerald-400 scale-105 shadow-md shadow-emerald-500/20';
          } else if (isShifted) {
            style = 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105 shadow-md shadow-amber-500/20';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[50px]">
              <div className="h-5 flex items-center text-[9px] font-mono font-bold">
                {isFinalTail && <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white">from temp</span>}
                {isShifted && !isFinalTail && <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white">active</span>}
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

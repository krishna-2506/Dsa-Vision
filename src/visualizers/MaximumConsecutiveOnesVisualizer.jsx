import React from 'react';

export const meta = {
  title: 'Maximum Consecutive Ones',
  category: 'Arrays',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the maximum number of consecutive 1s in a binary array in a single traversal.'
};

export const solutions = {
  cpp: `// C++ Maximum Consecutive Ones
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int findMaxConsecutiveOnes(vector<int>& nums) {
        int cnt = 0;
        int maxi = 0;

        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == 1) {
                cnt++;
                maxi = max(maxi, cnt);
            } else {
                cnt = 0;
            }
        }

        return maxi;
    }
};`,
  python: `# Python 3 Maximum Consecutive Ones
class Solution:
    def findMaxConsecutiveOnes(self, nums: list[int]) -> int:
        cnt = 0
        maxi = 0
        for x in nums:
            if x == 1:
                cnt += 1
                maxi = max(maxi, cnt)
            else:
                cnt = 0
        return maxi`,
  java: `// Java Maximum Consecutive Ones
class Solution {
    public int findMaxConsecutiveOnes(int[] nums) {
        int cnt = 0;
        int maxi = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == 1) {
                cnt++;
                maxi = Math.max(maxi, cnt);
            } else {
                cnt = 0;
            }
        }
        return maxi;
    }
}`,
  javascript: `// JavaScript Maximum Consecutive Ones
var findMaxConsecutiveOnes = function(nums) {
    let cnt = 0;
    let maxi = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {
            cnt++;
            maxi = Math.max(maxi, cnt);
        } else {
            cnt = 0;
        }
    }
    return maxi;
};`
};

export const steps = [
  {
    title: '1. Scan Index 0: val = 1 (cnt = 1)',
    phase: 'COUNTING',
    codeLine: 14,
    array: [1, 1, 0, 1, 1, 1],
    currentIdx: 0,
    currentCount: 1,
    maxCount: 1,
    variables: { i: 0, num: 1, cnt: 1, maxi: 1 },
    explain: 'Encountered 1 at index 0. Increment cnt to 1. maxi updates to 1.',
    intuition: 'Every continuous streak of 1s adds to current accumulator.'
  },
  {
    title: '2. Scan Index 1: val = 1 (cnt = 2)',
    phase: 'STREAK_EXTENDING',
    codeLine: 14,
    array: [1, 1, 0, 1, 1, 1],
    currentIdx: 1,
    currentCount: 2,
    maxCount: 2,
    variables: { i: 1, num: 1, cnt: 2, maxi: 2 },
    explain: 'Encountered 1 at index 1. Consecutive streak continues: cnt = 2, maxi = 2.',
    intuition: 'Continuous sequence length expands.'
  },
  {
    title: '3. Scan Index 2: val = 0 (Streak Broken!)',
    phase: 'STREAK_RESET',
    codeLine: 17,
    array: [1, 1, 0, 1, 1, 1],
    currentIdx: 2,
    currentCount: 0,
    maxCount: 2,
    variables: { i: 2, num: 0, cnt: 0, maxi: 2, note: 'Reset streak' },
    explain: 'Encountered 0 at index 2! The streak is severed. Reset cnt to 0, preserving maxi = 2.',
    intuition: 'Zero breaks continuity; any upcoming streak must start afresh.'
  },
  {
    title: '4. Scan Index 3: val = 1 (New Streak)',
    phase: 'NEW_STREAK',
    codeLine: 14,
    array: [1, 1, 0, 1, 1, 1],
    currentIdx: 3,
    currentCount: 1,
    maxCount: 2,
    variables: { i: 3, num: 1, cnt: 1, maxi: 2 },
    explain: 'New streak begins at index 3: cnt = 1. Current streak has not yet surpassed record maxi (2).',
    intuition: 'Compare current running count with global record.'
  },
  {
    title: '5. Scan Index 4: val = 1 (cnt = 2)',
    phase: 'STREAK_EXTENDING',
    codeLine: 14,
    array: [1, 1, 0, 1, 1, 1],
    currentIdx: 4,
    currentCount: 2,
    maxCount: 2,
    variables: { i: 4, num: 1, cnt: 2, maxi: 2 },
    explain: 'Index 4 has 1: cnt = 2, matching the previous record.',
    intuition: 'Streak is building momentum.'
  },
  {
    title: '6. Scan Index 5: val = 1 (New Record: 3!)',
    phase: 'RECORD_PEAK',
    codeLine: 15,
    array: [1, 1, 0, 1, 1, 1],
    currentIdx: 5,
    currentCount: 3,
    maxCount: 3,
    variables: { i: 5, num: 1, cnt: 3, maxi: 3, isFinal: true },
    explain: 'Index 5 has 1! Streak reaches cnt = 3, breaking the previous record! Result maxi = 3.',
    intuition: 'Single pass O(N) evaluation accurately tracks streak lengths with O(1) space.'
  }
];

export default function MaximumConsecutiveOnesVisualizer({ currentStep = 0, onStepChange }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* HUD Gauges */}
      <div className="flex items-center justify-center gap-6">
        <div className="px-5 py-3 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-center min-w-[130px]">
          <span className="text-[10px] font-mono text-indigo-400 uppercase font-semibold block">Current Streak</span>
          <span className="text-2xl font-mono font-bold text-white">{step.currentCount}</span>
        </div>

        <div className="px-5 py-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center min-w-[130px]">
          <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold block">Record Max Streak</span>
          <span className="text-2xl font-mono font-bold text-emerald-300">{step.maxCount}</span>
        </div>
      </div>

      {/* Binary Array Elements */}
      <div className="w-full flex items-center justify-center gap-3 py-4">
        {step.array.map((val, idx) => {
          const isCurrent = step.currentIdx === idx;
          const isOne = val === 1;

          let cardStyle = 'border-[#262834] bg-[#14151c] text-[#8e92a4]';
          if (isCurrent) cardStyle = 'border-amber-500 bg-amber-500/25 text-amber-300 scale-110 shadow-lg shadow-amber-500/25';
          else if (isOne) cardStyle = 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
          else cardStyle = 'border-rose-500/30 bg-rose-500/10 text-rose-300';

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[52px]">
              <div className="h-4 flex items-center justify-center">
                {isCurrent && <span className="text-[10px] font-mono text-amber-400 font-bold">i↓</span>}
              </div>
              <div className={`w-13 h-13 rounded-2xl border flex items-center justify-center font-mono font-bold text-xl transition-all duration-300 ${cardStyle}`}>
                {val}
              </div>
              <span className="text-[10px] font-mono text-[#5b5e6e]">[{idx}]</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

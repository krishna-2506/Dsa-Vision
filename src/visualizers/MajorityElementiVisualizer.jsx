import React from 'react';

export const meta = {
  title: 'Majority Element (> N/2) — Boyer-Moore Voting Algorithm',
  category: 'Arrays & Voting Algorithm',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Finds the element that appears more than ⌊n / 2⌋ times in the array using the Boyer-Moore Majority Voting Algorithm with constant space.'
};

export const solutions = {
  cpp: `// C++ Boyer-Moore Voting Algorithm
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int count = 0;
        int candidate = 0;

        for (int num : nums) {
            if (count == 0) {
                candidate = num;
            }
            if (num == candidate) {
                count += 1;
            } else {
                count -= 1;
            }
        }

        return candidate;
    }
};`,
  python: `# Python 3 Boyer-Moore Voting Algorithm
class Solution:
    def majorityElement(self, nums: list[int]) -> int:
        count = 0
        candidate = None
        
        for num in nums:
            if count == 0:
                candidate = num
            count += (1 if num == candidate else -1)
            
        return candidate`,
  java: `// Java Boyer-Moore Voting Algorithm
class Solution {
    public int majorityElement(int[] nums) {
        int count = 0;
        int candidate = 0;

        for (int num : nums) {
            if (count == 0) {
                candidate = num;
            }
            if (num == candidate) {
                count++;
            } else {
                count--;
            }
        }
        return candidate;
    }
}`,
  javascript: `// JavaScript Boyer-Moore Voting Algorithm
var majorityElement = function(nums) {
    let count = 0;
    let candidate = null;

    for (let num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate ? 1 : -1);
    }
    return candidate;
};`
};

export const steps = [
  {
    title: '1. Index 0 (val=2): Pick Candidate = 2',
    phase: 'CANDIDATE_ASSIGNED',
    codeLine: 13,
    array: [2, 2, 1, 1, 1, 2, 2],
    currentIdx: 0,
    candidate: 2,
    count: 1,
    variables: { i: 0, num: 2, candidate: 2, count: 1 },
    explain: 'count was 0. Assign candidate = 2 and count = 1.',
    intuition: 'Since majority element appears > N/2 times, its count will outlast all other elements combined.'
  },
  {
    title: '2. Index 1 (val=2): Matches Candidate (count = 2)',
    phase: 'VOTE_INCREMENT',
    codeLine: 17,
    array: [2, 2, 1, 1, 1, 2, 2],
    currentIdx: 1,
    candidate: 2,
    count: 2,
    variables: { i: 1, num: 2, candidate: 2, count: 2 },
    explain: 'Encountered 2 again. Matches our candidate, so increment vote count to 2.',
    intuition: 'Reinforcing the current candidate.'
  },
  {
    title: '3. Index 2 (val=1): Disagrees (count = 1)',
    phase: 'VOTE_DECREMENT',
    codeLine: 19,
    array: [2, 2, 1, 1, 1, 2, 2],
    currentIdx: 2,
    candidate: 2,
    count: 1,
    variables: { i: 2, num: 1, candidate: 2, count: 1 },
    explain: 'Encountered 1. Differs from candidate 2, so decrement vote count to 1.',
    intuition: 'A non-matching element cancels out one vote of the candidate.'
  },
  {
    title: '4. Index 3 (val=1): Neutralizes (count = 0)',
    phase: 'CANCELLATION',
    codeLine: 19,
    array: [2, 2, 1, 1, 1, 2, 2],
    currentIdx: 3,
    candidate: 2,
    count: 0,
    variables: { i: 3, num: 1, candidate: 2, count: 0 },
    explain: 'Another 1 arrives. Decrement vote count to 0. Candidate 2 is completely neutralized for this prefix.',
    intuition: 'Prefix [2, 2, 1, 1] has equal frequency of 2 and 1; the true majority must still dominate the remainder.'
  },
  {
    title: '5. Index 4 (val=1): New Candidate = 1',
    phase: 'NEW_CANDIDATE',
    codeLine: 13,
    array: [2, 2, 1, 1, 1, 2, 2],
    currentIdx: 4,
    candidate: 1,
    count: 1,
    variables: { i: 4, num: 1, candidate: 1, count: 1 },
    explain: 'count was 0. Adopt new candidate = 1 with count = 1.',
    intuition: 'When count hits 0, start a fresh election on the remaining sub-array.'
  },
  {
    title: '6. Index 5 & 6: Re-election of 2 as True Majority',
    phase: 'COMPLETED',
    codeLine: 23,
    array: [2, 2, 1, 1, 1, 2, 2],
    currentIdx: 6,
    candidate: 2,
    count: 1,
    variables: { finalCandidate: 2, frequency: '4 out of 7 (> 3.5)', isMajority: true },
    explain: 'Subsequent elements 2 and 2 cancel out 1 and elect candidate = 2! Value 2 appears 4 times (> 7/2).',
    intuition: 'The Boyer-Moore voting algorithm guarantees correct majority identification in O(N) time and O(1) space.'
  }
];

export default function MajorityElementiVisualizer({ currentStep = 0, onStepChange }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Candidate and Vote Meter HUD */}
      <div className="flex items-center justify-center gap-6">
        <div className="px-5 py-3 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-center min-w-[130px]">
          <span className="text-[10px] font-mono text-indigo-400 uppercase font-semibold block">Current Candidate</span>
          <span className="text-2xl font-mono font-bold text-white">
            {step.candidate !== null ? step.candidate : 'None'}
          </span>
        </div>

        <div className="px-5 py-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-center min-w-[130px]">
          <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold block">Vote Balance (Count)</span>
          <span className="text-2xl font-mono font-bold text-amber-300">
            {step.count}
          </span>
        </div>
      </div>

      {/* Array Elements Visualizer */}
      <div className="w-full flex items-center justify-center gap-3 py-4">
        {step.array.map((val, idx) => {
          const isCurrent = step.currentIdx === idx;
          const isCand = step.candidate === val;

          let cardStyle = 'border-[#262834] bg-[#14151c] text-[#8e92a4]';
          if (isCurrent) cardStyle = 'border-amber-500 bg-amber-500/20 text-amber-300 scale-110 shadow-lg shadow-amber-500/20';
          else if (isCand) cardStyle = 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300';

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[52px]">
              <div className="h-4 flex items-center justify-center">
                {isCurrent && <span className="text-[10px] font-mono text-amber-400 font-bold">i↓</span>}
              </div>
              <div className={`w-13 h-13 rounded-2xl border flex items-center justify-center font-mono font-bold text-base transition-all duration-300 ${cardStyle}`}>
                {val}
              </div>
              <span className="text-[10px] font-mono text-[#5b5e6e]">[{idx}]</span>
            </div>
          );
        })}
      </div>

      <div className="text-xs font-mono text-[#8e92a4] text-center max-w-md">
        <span>Boyer-Moore Theorem: Elements of different identity cancel in pairs. The majority (&gt; N/2) will always survive.</span>
      </div>
    </div>
  );
}

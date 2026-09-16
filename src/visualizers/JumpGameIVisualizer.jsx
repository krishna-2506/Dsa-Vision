import React from 'react';

export const meta = {
  title: 'Jump Game - I (Can Reach End)',
  category: 'Greedy Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Determines if you are able to reach the last index from the first index using a greedy forward reach boundary.'
};

export const solutions = {
  cpp: `// C++ Jump Game I (Greedy Max Reach)
// Time: O(N) | Space: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    bool canJump(vector<int>& nums) {
        int maxReach = 0;
        int n = nums.size();

        for (int i = 0; i < n; i++) {
            // If current index is beyond the maximum reach possible, we are stuck
            if (i > maxReach) {
                return false;
            }
            maxReach = max(maxReach, i + nums[i]);
            // If max reach can already touch or pass the last index
            if (maxReach >= n - 1) {
                return true;
            }
        }

        return true;
    }
};`,
  python: `# Python 3 Jump Game I (Greedy Max Reach)
class Solution:
    def canJump(self, nums: list[int]) -> bool:
        max_reach = 0
        target = len(nums) - 1

        for i, jump in enumerate(nums):
            if i > max_reach:
                return False
            max_reach = max(max_reach, i + jump)
            if max_reach >= target:
                return True

        return True`,
  java: `// Java Jump Game I (Greedy Max Reach)
class Solution {
    public boolean canJump(int[] nums) {
        int maxReach = 0;
        int n = nums.length;

        for (int i = 0; i < n; i++) {
            if (i > maxReach) {
                return false;
            }
            maxReach = Math.max(maxReach, i + nums[i]);
            if (maxReach >= n - 1) {
                return true;
            }
        }

        return true;
    }
}`,
  javascript: `// JavaScript Jump Game I (Greedy Max Reach)
var canJump = function(nums) {
    let maxReach = 0;
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        if (i > maxReach) {
            return false;
        }
        maxReach = Math.max(maxReach, i + nums[i]);
        if (maxReach >= n - 1) {
            return true;
        }
    }

    return true;
};`
};

export const steps = [
  {
    title: '1. Array: [2, 3, 1, 1, 4], Target Index = 4',
    phase: 'INITIAL',
    codeLine: 11,
    nums: [2, 3, 1, 1, 4],
    currentIndex: 0,
    maxReach: 0,
    reachable: true,
    variables: { i: 0, 'nums[0]': 2, maxReach: 0, target: 4 },
    explain: 'Greedy insight: maintain maxReach, the farthest index that can be reached so far. If index i exceeds maxReach, we can never reach index i.',
    intuition: 'Each stone extends our furthest horizon.'
  },
  {
    title: '2. At Index 0 (jump = 2): maxReach = max(0, 0 + 2) = 2',
    phase: 'EXPAND_REACH',
    codeLine: 18,
    nums: [2, 3, 1, 1, 4],
    currentIndex: 0,
    maxReach: 2,
    reachable: true,
    variables: { i: 0, 'nums[0]': 2, maxReach: 2, target: 4 },
    explain: 'Standing at stone 0 with jump length 2 allows reaching up to index 2.',
    intuition: 'Horizon reaches index 2.'
  },
  {
    title: '3. At Index 1 (jump = 3): maxReach = max(2, 1 + 3) = 4 >= target!',
    phase: 'GOAL_REACHED',
    codeLine: 20,
    nums: [2, 3, 1, 1, 4],
    currentIndex: 1,
    maxReach: 4,
    reachable: true,
    variables: { i: 1, 'nums[1]': 3, maxReach: 4, targetReached: true },
    explain: 'From index 1, jump length 3 reaches 1 + 3 = 4. Since 4 >= 4 (last index), destination is guaranteed reachable!',
    intuition: 'Horizon reaches or exceeds the final stone. Return true early.'
  },
  {
    title: '4. Summary: Destination Reachable in <= 2 jumps (return true)',
    phase: 'COMPLETED',
    codeLine: 21,
    nums: [2, 3, 1, 1, 4],
    currentIndex: 1,
    maxReach: 4,
    reachable: true,
    variables: { result: true, timeComplexity: 'O(N)', spaceComplexity: 'O(1)' },
    explain: 'Greedy maxReach tracking terminates in O(N) time with O(1) space.',
    intuition: 'Valid path exists.'
  }
];

export default function JumpGameIVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Current Stone: Index {step.currentIndex}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Max Reach Horizon: Index {step.maxReach}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Target Reachable: {step.maxReach >= step.nums.length - 1 ? 'YES (Index 4)' : 'Pending'}
        </span>
      </div>

      {/* Stones Array Track */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">Stepping Stones (Jump Capacities)</span>
        
        <div className="flex items-center justify-center gap-3 overflow-x-auto w-full py-2">
          {step.nums.map((jump, idx) => {
            const isCurrent = idx === step.currentIndex;
            const isReachable = idx <= step.maxReach;
            const isTarget = idx === step.nums.length - 1;

            let borderClass = 'border-[#272b3c] bg-[#161824] text-slate-500';
            if (isCurrent) {
              borderClass = 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg';
            } else if (isTarget && isReachable) {
              borderClass = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/30';
            } else if (isReachable) {
              borderClass = 'border-blue-500/40 bg-blue-500/10 text-blue-300';
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1 min-w-[56px]">
                <div className={`w-14 h-16 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all ${borderClass}`}>
                  <span className="text-xs">{isCurrent ? '🏃' : isTarget ? '🎯' : '🪨'}</span>
                  <span className="text-sm font-black">{jump}</span>
                </div>
                <span className="text-[10px] font-mono text-[#5b6076]">idx [{idx}]</span>
              </div>
            );
          })}
        </div>

        {/* Horizon Bar Indicator */}
        <div className="w-full max-w-md bg-[#161824] rounded-full h-2 overflow-hidden border border-[#272b3c] mt-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full transition-all duration-300"
            style={{ width: `${Math.min(100, ((step.maxReach + 1) / step.nums.length) * 100)}%` }}
          />
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

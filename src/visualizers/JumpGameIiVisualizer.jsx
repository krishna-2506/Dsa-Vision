import React from 'react';

export const meta = {
  title: 'Jump Game II (Minimum Jumps)',
  category: 'Greedy Algorithms',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: 'Calculates the minimum number of jumps required to reach the last index using a greedy window / BFS level-order reachability approach.'
};

export const solutions = {
  cpp: `// C++ Jump Game II (Greedy Window / BFS)
// Time: O(N) | Space: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int jump(vector<int>& nums) {
        int jumps = 0;
        int l = 0, r = 0;
        int n = nums.size();

        while (r < n - 1) {
            int farthest = 0;
            // Scan all positions in the current jump window [l, r]
            for (int i = l; i <= r; i++) {
                farthest = max(farthest, i + nums[i]);
            }
            // Advance to next jump window
            l = r + 1;
            r = farthest;
            jumps++;
        }

        return jumps;
    }
};`,
  python: `# Python 3 Jump Game II (Greedy Window / BFS)
class Solution:
    def jump(self, nums: list[int]) -> int:
        jumps = 0
        l = r = 0
        n = len(nums)

        while r < n - 1:
            farthest = 0
            for i in range(l, r + 1):
                farthest = max(farthest, i + nums[i])
            l = r + 1
            r = farthest
            jumps += 1

        return jumps`,
  java: `// Java Jump Game II (Greedy Window / BFS)
class Solution {
    public int jump(int[] nums) {
        int jumps = 0;
        int l = 0, r = 0;
        int n = nums.length;

        while (r < n - 1) {
            int farthest = 0;
            for (int i = l; i <= r; i++) {
                farthest = Math.max(farthest, i + nums[i]);
            }
            l = r + 1;
            r = farthest;
            jumps++;
        }

        return jumps;
    }
}`,
  javascript: `// JavaScript Jump Game II (Greedy Window / BFS)
var jump = function(nums) {
    let jumps = 0;
    let l = 0, r = 0;
    const n = nums.length;

    while (r < n - 1) {
        let farthest = 0;
        for (let i = l; i <= r; i++) {
            farthest = Math.max(farthest, i + nums[i]);
        }
        l = r + 1;
        r = farthest;
        jumps++;
    }

    return jumps;
};`
};

export const steps = [
  {
    title: '1. Array: [2, 3, 1, 1, 4], Start Window: [0...0], Jumps = 0',
    phase: 'INITIAL',
    codeLine: 12,
    nums: [2, 3, 1, 1, 4],
    l: 0,
    r: 0,
    farthest: 0,
    jumps: 0,
    variables: { l: 0, r: 0, jumps: 0, target: 4 },
    explain: 'Greedy insight: think in BFS levels. At jump 0, we can only be at index 0 (window [0, 0]).',
    intuition: 'Each jump corresponds to moving one level deeper in BFS.'
  },
  {
    title: '2. Jump 1: Scan Window [0...0] -> Farthest = 0 + 2 = 2',
    phase: 'SCAN_WINDOW',
    codeLine: 19,
    nums: [2, 3, 1, 1, 4],
    l: 0,
    r: 0,
    farthest: 2,
    jumps: 0,
    variables: { window: '[0...0]', farthest: 2 },
    explain: 'From index 0, maximum jump is 2. Farthest reach = 2.',
    intuition: 'First jump can take us anywhere in range [1...2].'
  },
  {
    title: '3. Execute Jump 1: Jumps = 1, New Window = [1...2]',
    phase: 'ADVANCE_WINDOW',
    codeLine: 23,
    nums: [2, 3, 1, 1, 4],
    l: 1,
    r: 2,
    farthest: 2,
    jumps: 1,
    variables: { l: 1, r: 2, jumps: 1 },
    explain: 'Next window of positions reachable with 1 jump is [1...2]. Jumps increments to 1.',
    intuition: 'BFS level 1 complete.'
  },
  {
    title: '4. Scan Window [1...2]: Index 1 gives 1 + 3 = 4, Index 2 gives 2 + 1 = 3 -> Farthest = 4',
    phase: 'SCAN_WINDOW',
    codeLine: 19,
    nums: [2, 3, 1, 1, 4],
    l: 1,
    r: 2,
    farthest: 4,
    jumps: 1,
    variables: { 'farthest(i=1)': 4, 'farthest(i=2)': 3, maxFarthest: 4 },
    explain: 'Testing all choices in window [1...2]: index 1 allows jumping to index 4 (the target!).',
    intuition: 'Greedy picks the maximum reach among all nodes in current level.'
  },
  {
    title: '5. Execute Jump 2: Jumps = 2, New Window = [3...4], Target 4 in range!',
    phase: 'COMPLETED',
    codeLine: 25,
    nums: [2, 3, 1, 1, 4],
    l: 3,
    r: 4,
    farthest: 4,
    jumps: 2,
    variables: { jumps: 2, destinationReached: true },
    explain: 'Since r = 4 >= target (n - 1), we have arrived at the destination in a minimum of 2 jumps.',
    intuition: 'Total minimum jumps = 2 (0 -> 1 -> 4).'
  }
];

export default function JumpGameIiVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Current Window: [{step.l} ... {step.r}]
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Farthest Reach: Index {step.farthest}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Minimum Jumps = {step.jumps}
        </span>
      </div>

      {/* Stones Array Track */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">Stepping Stones & Jump Windows</span>

        <div className="flex items-center justify-center gap-3 overflow-x-auto w-full py-2">
          {step.nums.map((jump, idx) => {
            const inWindow = idx >= step.l && idx <= step.r;
            const isFarthest = idx === step.farthest && step.farthest > 0;
            const isTarget = idx === step.nums.length - 1;

            let borderClass = 'border-[#272b3c] bg-[#161824] text-slate-500';
            if (inWindow) {
              borderClass = 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg';
            } else if (isTarget && isFarthest) {
              borderClass = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 ring-2 ring-emerald-500/30';
            } else if (isFarthest) {
              borderClass = 'border-blue-500 bg-blue-500/20 text-blue-300 ring-2 ring-blue-500/30';
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-1 min-w-[56px]">
                <div className={`w-14 h-16 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all ${borderClass}`}>
                  <span className="text-xs">{inWindow ? '👟' : isTarget ? '🎯' : '🪨'}</span>
                  <span className="text-sm font-black">{jump}</span>
                </div>
                <span className="text-[10px] font-mono text-[#5b6076]">idx [{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

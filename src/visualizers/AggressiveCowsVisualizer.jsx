import React from 'react';

export const meta = {
  title: 'Aggressive Cows (Binary Search on Answer)',
  category: 'Binary Search on Answers',
  difficulty: 'Hard',
  timeComplexity: 'O(N log N + N log(maxDist))',
  spaceComplexity: 'O(1)',
  description: 'Places K cows into stalls such that the minimum distance between any two cows is maximized using binary search over the possible stall gap distances.'
};

export const solutions = {
  cpp: `// C++ Optimal Binary Search on Max-Min Distance
// Time Complexity: O(N log N + N log(max-min)) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    bool canWePlace(const vector<int>& stalls, int dist, int cows) {
        int countCows = 1;
        int lastStall = stalls[0];

        for (int i = 1; i < stalls.size(); i++) {
            if (stalls[i] - lastStall >= dist) {
                countCows++;
                lastStall = stalls[i];
            }
            if (countCows >= cows) return true;
        }

        return false;
    }

    int aggressiveCows(vector<int>& stalls, int k) {
        sort(stalls.begin(), stalls.end());
        int low = 1, high = stalls.back() - stalls[0];
        int ans = 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (canWePlace(stalls, mid, k)) {
                ans = mid;      // Distance works, try larger gap
                low = mid + 1;
            } else {
                high = mid - 1; // Gap too large, shrink
            }
        }

        return ans;
    }
};`,
  python: `# Python 3 Optimal Binary Search on Max-Min Distance
class Solution:
    def aggressiveCows(self, stalls: list[int], k: int) -> int:
        stalls.sort()

        def can_we_place(dist: int) -> bool:
            count = 1
            last = stalls[0]

            for s in stalls[1:]:
                if s - last >= dist:
                    count += 1
                    last = s
                if count >= k:
                    return True
            return False

        low, high = 1, stalls[-1] - stalls[0]
        ans = 1

        while low <= high:
            mid = (low + high) // 2
            if can_we_place(mid):
                ans = mid
                low = mid + 1
            else:
                high = mid - 1

        return ans`,
  java: `// Java Optimal Binary Search on Distance
import java.util.Arrays;

class Solution {
    private static boolean canWePlace(int[] stalls, int dist, int cows) {
        int count = 1;
        int last = stalls[0];

        for (int i = 1; i < stalls.length; i++) {
            if (stalls[i] - last >= dist) {
                count++;
                last = stalls[i];
            }
            if (count >= cows) return true;
        }
        return false;
    }

    public static int aggressiveCows(int[] stalls, int k) {
        Arrays.sort(stalls);
        int low = 1, high = stalls[stalls.length - 1] - stalls[0];
        int ans = 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (canWePlace(stalls, mid, k)) {
                ans = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return ans;
    }
}`,
  javascript: `// JavaScript Optimal Binary Search on Distance
var aggressiveCows = function(stalls, k) {
    stalls.sort((a, b) => a - b);

    const canWePlace = (dist) => {
        let count = 1;
        let last = stalls[0];

        for (let i = 1; i < stalls.length; i++) {
            if (stalls[i] - last >= dist) {
                count++;
                last = stalls[i];
            }
            if (count >= k) return true;
        }
        return false;
    };

    let low = 1, high = stalls[stalls.length - 1] - stalls[0];
    let ans = 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (canWePlace(mid)) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return ans;
};`
};

export const steps = [
  {
    title: '1. Sorted Stalls: [1, 2, 4, 8, 9], Cows K = 3, Domain [1...8]',
    phase: 'INITIAL',
    codeLine: 24,
    stalls: [1, 2, 4, 8, 9],
    k: 3,
    dist: null,
    placedAt: [1],
    ans: 1,
    variables: { stalls: '[1, 2, 4, 8, 9]', k: 3, distanceRange: '[1...8]' },
    explain: 'We sort the stalls and search for the maximum possible minimum separation between 3 cows. Range is [1 ... (9 - 1 = 8)].',
    intuition: 'If cows can be placed with distance D, they can always be placed with any distance < D (monotonicity).'
  },
  {
    title: '2. Try Distance d = 4: Place at stall 1, 8 (Only 2 cows placed < 3) -> Too Far! high = 3',
    phase: 'TRY_DISTANCE',
    codeLine: 11,
    stalls: [1, 2, 4, 8, 9],
    k: 3,
    dist: 4,
    placedAt: [1, 8],
    ans: 1,
    variables: { testDistance: 4, cowsPlaced: 2, required: 3, feasible: false, 'action': 'high = mid - 1 = 3' },
    explain: 'First cow at 1. Next stall with gap >= 4 is 8 (8 - 1 = 7). Next stall 9 has gap 1 < 4. Only 2 cows can fit. Distance 4 is infeasible! Reduce high to 3.',
    intuition: 'Spacing too aggressive, cows do not fit.'
  },
  {
    title: '3. Try Distance d = 2: Place at stalls 1, 4, 8 (3 cows placed!) -> Feasible! ans = 2, low = 3',
    phase: 'FEASIBLE',
    codeLine: 29,
    stalls: [1, 2, 4, 8, 9],
    k: 3,
    dist: 2,
    placedAt: [1, 4, 8],
    ans: 2,
    variables: { testDistance: 2, cowsPlaced: 3, required: 3, feasible: true, ans: 2, 'action': 'low = mid + 1 = 3' },
    explain: 'Cows placed at stalls 1, 4 (gap 3 >= 2), and 8 (gap 4 >= 2). All 3 cows accommodated! Record ans = 2 and try larger gap [3...3].',
    intuition: 'Valid gap found, try to push cows further apart.'
  },
  {
    title: '4. Try Distance d = 3: Place at stalls 1, 4, 8 (3 cows placed!) -> Feasible! ans = 3, low = 4',
    phase: 'FEASIBLE',
    codeLine: 29,
    stalls: [1, 2, 4, 8, 9],
    k: 3,
    dist: 3,
    placedAt: [1, 4, 8],
    ans: 3,
    variables: { testDistance: 3, cowsPlaced: 3, required: 3, feasible: true, ans: 3, 'action': 'low = mid + 1 = 4' },
    explain: 'Cows at 1, 4 (gap 3 >= 3), 8 (gap 4 >= 3). 3 cows placed successfully! Update ans = 3. Search ends as low (4) > high (3).',
    intuition: 'Maximum minimum distance achieved.'
  },
  {
    title: '5. Completed: Maximum Minimum Distance = 3',
    phase: 'COMPLETED',
    codeLine: 36,
    stalls: [1, 2, 4, 8, 9],
    k: 3,
    dist: 3,
    placedAt: [1, 4, 8],
    ans: 3,
    variables: { maxMinDistance: 3, placedStalls: '[1, 4, 8]', timeComplexity: 'O(N log(maxDist))' },
    explain: 'Optimal answer is 3. Cows are comfortably spaced at stalls 1, 4, and 8 with minimum gap of 3.',
    intuition: 'Classic binary search on answers problem solved.'
  }
];

export default function AggressiveCowsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Distance Status Banner */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Testing Gap d = {step.dist ?? 'Ready'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold">
          Cows Placed: {step.placedAt.length} / {step.k}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Min Gap: {step.ans}
        </span>
      </div>

      {/* Stalls Visual with Cow Badges */}
      <div className="w-full flex items-center justify-center gap-3 py-6 overflow-x-auto">
        {step.stalls.map((stall, idx) => {
          const hasCow = step.placedAt.includes(stall);

          let style = 'bg-[#181a24] text-white border-[#2b2e40]';
          if (hasCow) {
            style = 'bg-emerald-500/25 text-emerald-200 border-emerald-400 scale-105 shadow-lg shadow-emerald-500/20';
          }

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[54px]">
              <div className="h-6 flex items-center text-sm">
                {hasCow ? <span>🐄</span> : <span className="text-[10px] font-mono text-[#555a72]">empty</span>}
              </div>

              <div className={`w-13 h-13 rounded-xl border flex items-center justify-center font-mono text-lg font-bold transition-all duration-300 ${style}`}>
                {stall}
              </div>

              <span className="text-[9px] font-mono text-[#5b6076]">stall pos</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

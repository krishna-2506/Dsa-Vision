import React from 'react';

export const meta = {
  title: 'Capacity to Ship Packages Within D Days',
  category: 'Binary Search on Answers',
  difficulty: 'Medium',
  timeComplexity: 'O(N log(sum - max))',
  spaceComplexity: 'O(1)',
  description: 'Finds the least weight capacity of a ship that allows all packages on a conveyor belt to be transported within D days using binary search over [max(weights) ... sum(weights)].'
};

export const solutions = {
  cpp: `// C++ Optimal Binary Search on Ship Capacity
// Time Complexity: O(N * log(sum - max)) | Space Complexity: O(1)
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

class Solution {
private:
    int findDays(const vector<int>& weights, int cap) {
        int days = 1;
        int load = 0;

        for (int w : weights) {
            if (load + w > cap) {
                days++;
                load = w; // Start new day
            } else {
                load += w;
            }
        }
        return days;
    }

public:
    int shipWithinDays(vector<int>& weights, int days) {
        int low = *max_element(weights.begin(), weights.end());
        int high = accumulate(weights.begin(), weights.end(), 0);
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int daysNeeded = findDays(weights, mid);

            if (daysNeeded <= days) {
                ans = mid;      // Capacity works, try lighter
                high = mid - 1;
            } else {
                low = mid + 1;  // Too heavy, need larger capacity
            }
        }

        return ans;
    }
};`,
  python: `# Python 3 Optimal Binary Search on Ship Capacity
class Solution:
    def shipWithinDays(self, weights: list[int], days: int) -> int:
        low = max(weights)
        high = sum(weights)
        ans = high

        def get_days(cap: int) -> int:
            d = 1
            load = 0
            for w in weights:
                if load + w > cap:
                    d += 1
                    load = w
                else:
                    load += w
            return d

        while low <= high:
            mid = (low + high) // 2
            needed = get_days(mid)

            if needed <= days:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans`,
  java: `// Java Optimal Binary Search on Ship Capacity
class Solution {
    private int getDays(int[] weights, int cap) {
        int days = 1, load = 0;
        for (int w : weights) {
            if (load + w > cap) {
                days++;
                load = w;
            } else {
                load += w;
            }
        }
        return days;
    }

    public int shipWithinDays(int[] weights, int days) {
        int low = 0, high = 0;
        for (int w : weights) {
            low = Math.max(low, w);
            high += w;
        }

        int ans = high;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (getDays(weights, mid) <= days) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
}`,
  javascript: `// JavaScript Optimal Binary Search on Ship Capacity
var shipWithinDays = function(weights, days) {
    let low = Math.max(...weights);
    let high = weights.reduce((a, b) => a + b, 0);
    let ans = high;

    const getDays = (cap) => {
        let d = 1, load = 0;
        for (const w of weights) {
            if (load + w > cap) {
                d++;
                load = w;
            } else {
                load += w;
            }
        }
        return d;
    };

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (getDays(mid) <= days) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return ans;
};`
};

export const steps = [
  {
    title: '1. Conveyor Packages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], Days Limit D = 5',
    phase: 'INITIAL',
    codeLine: 24,
    weights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    daysLimit: 5,
    low: 10,
    high: 55,
    cap: null,
    daysNeeded: null,
    ans: 55,
    variables: { minCap: 'max(weights) = 10', maxCap: 'sum(weights) = 55', limit: 5 },
    explain: 'The ship must be capable of carrying at least the heaviest single package (10). If capacity is 55, it carries everything in 1 day. Domain is [10 ... 55].',
    intuition: 'Monotonic relationship: increasing capacity strictly decreases days required.'
  },
  {
    title: '2. Try Capacity = 32: Days Needed = 2 ≤ 5 -> Feasible! ans = 32, high = 31',
    phase: 'TEST_CAPACITY',
    codeLine: 31,
    weights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    daysLimit: 5,
    low: 10,
    high: 31,
    cap: 32,
    daysNeeded: 2,
    ans: 32,
    variables: { cap: 32, daysTaken: 2, feasible: true, 'action': 'ans = 32, try lighter high = 31' },
    explain: 'At capacity 32, packages ship in only 2 days (Day 1: [1...7]=28, Day 2: [8...10]=27). Very feasible! Search lower half [10...31].',
    intuition: 'Capacity 32 easily satisfies the deadline; try lighter ship.'
  },
  {
    title: '3. Try Capacity = 20: Days Needed = 4 ≤ 5 -> Feasible! ans = 20, high = 19',
    phase: 'TEST_CAPACITY',
    codeLine: 31,
    weights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    daysLimit: 5,
    low: 10,
    high: 19,
    cap: 20,
    daysNeeded: 4,
    ans: 20,
    variables: { cap: 20, daysTaken: 4, feasible: true, 'action': 'ans = 20, try lighter high = 19' },
    explain: 'At capacity 20, packages ship in 4 days <= 5. Record ans = 20 and search lower in [10...19].',
    intuition: 'Valid lighter capacity found.'
  },
  {
    title: '4. Try Capacity = 14: Days Needed = 6 > 5 -> Infeasible! low = 15',
    phase: 'TOO_LIGHT',
    codeLine: 34,
    weights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    daysLimit: 5,
    low: 15,
    high: 19,
    cap: 14,
    daysNeeded: 6,
    ans: 20,
    variables: { cap: 14, daysTaken: 6, limit: 5, feasible: false, 'action': 'Capacity too low! low = mid + 1 = 15' },
    explain: 'At capacity 14, it takes 6 days, exceeding deadline of 5. Ship is too small! Increase capacity domain to [15...19].',
    intuition: 'Violates deadline.'
  },
  {
    title: '5. Try Capacity = 15: Days Needed = 5 ≤ 5 -> Minimum Found!',
    phase: 'COMPLETED',
    codeLine: 31,
    weights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    daysLimit: 5,
    low: 15,
    high: 14,
    cap: 15,
    daysNeeded: 5,
    ans: 15,
    variables: { minCapacity: 15, daysTaken: 5, timeComplexity: 'O(N log(sum - max))' },
    explain: 'Capacity 15 ships exactly in 5 days (Day 1: [1..5]=15, Day 2: [6..7]=13, Day 3: [8], Day 4: [9], Day 5: [10]). Minimum optimal capacity is 15!',
    intuition: 'Boundary capacity located.'
  }
];

export default function CapacityToShipPackagesWithinDDaysVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Capacity & Days Header */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Testing Cap = {step.cap ?? 'Ready'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Days: <strong className={step.daysNeeded && step.daysNeeded <= step.daysLimit ? 'text-emerald-300' : 'text-rose-400'}>
            {step.daysNeeded ?? '-'} / {step.daysLimit} days
          </strong>
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Least Capacity = {step.ans}
        </span>
      </div>

      {/* Packages on Conveyor */}
      <div className="w-full flex items-center justify-center gap-2 py-4 overflow-x-auto">
        {step.weights.map((w, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1 min-w-[42px]">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 flex items-center justify-center font-mono font-bold text-sm">
              📦 {w}
            </div>
            <span className="text-[9px] font-mono text-[#5b6076]">pkg {idx}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs font-mono text-[#8a8ea3]">
        <span>Range: [10 ... 55]</span>
        <span>•</span>
        <span>Current Domain: [{step.low} ... {Math.max(step.low, step.high)}]</span>
      </div>
    </div>
  );
}

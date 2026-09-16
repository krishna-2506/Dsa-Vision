import React from 'react';

export const meta = {
  title: 'Minimum Days to Make M Bouquets',
  category: 'Binary Search on Answers',
  difficulty: 'Medium',
  timeComplexity: 'O(N * log(max - min))',
  spaceComplexity: 'O(1)',
  description: 'Finds the minimum waiting days to harvest M bouquets consisting of K adjacent bloomed flowers using binary search on the day timeline.'
};

export const solutions = {
  cpp: `// C++ Minimum Days to Make M Bouquets
// Time Complexity: O(N * log(max - min)) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
private:
    bool possible(const vector<int>& bloomDay, int day, int m, int k) {
        int cnt = 0;
        int noOfB = 0;

        for (int b : bloomDay) {
            if (b <= day) {
                cnt++;
                if (cnt == k) {
                    noOfB++;
                    cnt = 0;
                }
            } else {
                cnt = 0;
            }
        }
        return noOfB >= m;
    }

public:
    int minDays(vector<int>& bloomDay, int m, int k) {
        long long val = (long long)m * k;
        if ((long long)bloomDay.size() < val) return -1;

        int low = *min_element(bloomDay.begin(), bloomDay.end());
        int high = *max_element(bloomDay.begin(), bloomDay.end());
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (possible(bloomDay, mid, m, k)) {
                ans = mid;
                high = mid - 1; // Try fewer days
            } else {
                low = mid + 1;  // Need more days for flowers to bloom
            }
        }
        return ans;
    }
};`,
  python: `# Python 3 Minimum Days to Make M Bouquets
class Solution:
    def minDays(self, bloomDay: list[int], m: int, k: int) -> int:
        if len(bloomDay) < m * k:
            return -1

        def possible(day: int) -> bool:
            cnt = 0
            bouquets = 0
            for b in bloomDay:
                if b <= day:
                    cnt += 1
                    if cnt == k:
                        bouquets += 1
                        cnt = 0
                else:
                    cnt = 0
            return bouquets >= m

        low, high = min(bloomDay), max(bloomDay)
        ans = high

        while low <= high:
            mid = (low + high) // 2
            if possible(mid):
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans`,
  java: `// Java Minimum Days to Make M Bouquets
import java.util.Arrays;

class Solution {
    private boolean possible(int[] bloomDay, int day, int m, int k) {
        int cnt = 0, bouquets = 0;
        for (int b : bloomDay) {
            if (b <= day) {
                cnt++;
                if (cnt == k) {
                    bouquets++;
                    cnt = 0;
                }
            } else {
                cnt = 0;
            }
        }
        return bouquets >= m;
    }

    public int minDays(int[] bloomDay, int m, int k) {
        if ((long) bloomDay.length < (long) m * k) return -1;

        int low = Arrays.stream(bloomDay).min().getAsInt();
        int high = Arrays.stream(bloomDay).max().getAsInt();
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (possible(bloomDay, mid, m, k)) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
}`,
  javascript: `// JavaScript Minimum Days to Make M Bouquets
var minDays = function(bloomDay, m, k) {
    if (bloomDay.length < m * k) return -1;

    let low = Math.min(...bloomDay);
    let high = Math.max(...bloomDay);
    let ans = high;

    const possible = (day) => {
        let cnt = 0, bouquets = 0;
        for (const b of bloomDay) {
            if (b <= day) {
                cnt++;
                if (cnt === k) {
                    bouquets++;
                    cnt = 0;
                }
            } else {
                cnt = 0;
            }
        }
        return bouquets >= m;
    };

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (possible(mid)) {
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
    title: '1. Garden: [1, 10, 3, 10, 2], Target: M = 3 Bouquets, K = 1 adjacent flower',
    phase: 'INITIAL',
    codeLine: 29,
    bloomDay: [1, 10, 3, 10, 2],
    m: 3,
    k: 1,
    low: 1,
    high: 10,
    mid: null,
    bouquets: 0,
    ans: 10,
    variables: { low: 1, high: 10, m: 3, k: 1 },
    explain: 'Flowers bloom on varying days. We want M=3 bouquets of K=1 flowers. Search space for days is [min(bloomDay)=1 ... max(bloomDay)=10].',
    intuition: 'If Day D suffices, any day > D also suffices. Monotonic binary search on day range.'
  },
  {
    title: '2. Try Day = 5: Bloomed = [🌸, ⏳, 🌸, ⏳, 🌸] -> 3 Bouquets! Feasible, ans = 5',
    phase: 'TEST_DAY',
    codeLine: 35,
    bloomDay: [1, 10, 3, 10, 2],
    m: 3,
    k: 1,
    low: 1,
    high: 4,
    mid: 5,
    bouquets: 3,
    ans: 5,
    variables: { day: 5, bouquetsFormed: 3, targetM: 3, feasible: true, action: 'ans = 5, high = 4' },
    explain: 'At day 5, flowers at indices 0 (day 1), 2 (day 3), and 4 (day 2) have bloomed! Exactly 3 bouquets formed. Search lower: high = 4.',
    intuition: 'Sufficient flowers bloomed; try fewer waiting days.'
  },
  {
    title: '3. Try Day = 2: Bloomed = [🌸, ⏳, ⏳, ⏳, 🌸] -> Only 2 Bouquets! Infeasible, low = 3',
    phase: 'TOO_FEW_DAYS',
    codeLine: 38,
    bloomDay: [1, 10, 3, 10, 2],
    m: 3,
    k: 1,
    low: 3,
    high: 4,
    mid: 2,
    bouquets: 2,
    ans: 5,
    variables: { day: 2, bouquetsFormed: 2, targetM: 3, feasible: false, action: 'low = mid + 1 = 3' },
    explain: 'At day 2, only flowers at index 0 and 4 have bloomed (2 bouquets < 3 required). Not enough days. Increase low = 3.',
    intuition: 'Cannot make 3 bouquets with only 2 bloomed flowers.'
  },
  {
    title: '4. Try Day = 3: Bloomed = [🌸, ⏳, 🌸, ⏳, 🌸] -> Exactly 3 Bouquets! Optimal ans = 3',
    phase: 'OPTIMAL_FOUND',
    codeLine: 35,
    bloomDay: [1, 10, 3, 10, 2],
    m: 3,
    k: 1,
    low: 3,
    high: 2,
    mid: 3,
    bouquets: 3,
    ans: 3,
    variables: { day: 3, bouquetsFormed: 3, minDays: 3 },
    explain: 'At day 3, flowers 1, 3, and 2 have bloomed giving 3 bouquets! High becomes 2, search terminates. Minimum waiting days = 3.',
    intuition: 'Optimal threshold day discovered.'
  }
];

export default function MinimumDaysToMakeMBouquetsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Testing Day = {step.mid ?? 'Init'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Bouquets: <strong className={step.bouquets >= step.m ? 'text-emerald-300' : 'text-rose-400'}>
            {step.bouquets} / {step.m} required
          </strong>
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Least Days = {step.ans}
        </span>
      </div>

      {/* Flower Bed */}
      <div className="w-full flex items-center justify-center gap-3 py-3 overflow-x-auto">
        {step.bloomDay.map((day, idx) => {
          const isBloomed = step.mid !== null && day <= step.mid;
          return (
            <div key={idx} className="flex flex-col items-center gap-1 min-w-[50px]">
              <div
                className={`w-12 h-14 rounded-xl border flex flex-col items-center justify-center font-mono font-bold text-sm transition-all duration-300 ${
                  isBloomed
                    ? 'border-pink-500/50 bg-pink-500/20 text-pink-200 shadow-lg shadow-pink-500/20 ring-1 ring-pink-500/40'
                    : 'border-[#272b3c] bg-[#12131b] text-[#717691]'
                }`}
              >
                <span className="text-base">{isBloomed ? '🌸' : '🌱'}</span>
                <span className="text-[11px]">{day}d</span>
              </div>
              <span className="text-[9px] font-mono text-[#5b6076]">idx {idx}</span>
            </div>
          );
        })}
      </div>

      {/* Domain info */}
      <div className="flex items-center gap-4 text-xs font-mono text-[#8a8ea3]">
        <span>Search Domain: [{step.low} ... {Math.max(step.low, step.high)}]</span>
        <span>•</span>
        <span>Target: M={step.m}, K={step.k}</span>
      </div>
    </div>
  );
}

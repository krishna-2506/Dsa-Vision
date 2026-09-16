import React from 'react';

export const meta = {
  title: 'Koko Eating Bananas (Binary Search on Answer)',
  category: 'Binary Search on Answers',
  difficulty: 'Medium',
  timeComplexity: 'O(N log(maxPile))',
  spaceComplexity: 'O(1)',
  description: 'Finds the minimum hourly eating speed K such that Koko can consume all piles of bananas within H hours using binary search over the possible speed domain [1 ... max(piles)].'
};

export const solutions = {
  cpp: `// C++ Optimal Binary Search on Eating Speed
// Time Complexity: O(N * log(maxPile)) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

class Solution {
public:
    long long calculateTotalHours(const vector<int>& piles, int speed) {
        long long totalH = 0;
        for (int p : piles) {
            totalH += ceil((double)p / speed);
        }
        return totalH;
    }

    int minEatingSpeed(vector<int>& piles, int h) {
        int low = 1, high = *max_element(piles.begin(), piles.end());
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            long long totalH = calculateTotalHours(piles, mid);

            if (totalH <= h) {
                ans = mid;      // Speed works, try slower
                high = mid - 1;
            } else {
                low = mid + 1;  // Speed too slow, need faster
            }
        }

        return ans;
    }
};`,
  python: `# Python 3 Optimal Binary Search on Speed
import math

class Solution:
    def minEatingSpeed(self, piles: list[int], h: int) -> int:
        low, high = 1, max(piles)
        ans = high

        while low <= high:
            mid = (low + high) // 2
            total_hours = sum(math.ceil(p / mid) for p in piles)

            if total_hours <= h:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans`,
  java: `// Java Optimal Binary Search on Speed
class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int low = 1, high = 0;
        for (int p : piles) high = Math.max(high, p);
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            long totalH = 0;
            for (int p : piles) {
                totalH += (p + mid - 1) / mid;
            }

            if (totalH <= h) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return ans;
    }
}`,
  javascript: `// JavaScript Optimal Binary Search on Speed
var minEatingSpeed = function(piles, h) {
    let low = 1, high = Math.max(...piles);
    let ans = high;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        let totalH = 0;

        for (const p of piles) {
            totalH += Math.ceil(p / mid);
        }

        if (totalH <= h) {
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
    title: '1. Setup: Piles [3, 6, 7, 11], Available Hours H = 8',
    phase: 'INITIAL',
    codeLine: 18,
    piles: [3, 6, 7, 11],
    h: 8,
    low: 1,
    high: 11,
    speed: null,
    hoursNeeded: null,
    ans: 11,
    variables: { h: 8, speedRange: '[1...11]', maxPile: 11 },
    explain: 'At speed 11 (max pile), Koko eats 1 pile/hr and finishes in 4 hrs. At speed 1, she takes 27 hrs. Search domain is speed k ∈ [1 ... 11].',
    intuition: 'Total hours needed is monotonically decreasing as speed k increases. This monotonicity makes binary search optimal!'
  },
  {
    title: '2. Try speed k = 6: Hours = ceil(3/6) + ceil(6/6) + ceil(7/6) + ceil(11/6) = 6 ≤ 8',
    phase: 'EVALUATE_SPEED',
    codeLine: 24,
    piles: [3, 6, 7, 11],
    h: 8,
    low: 1,
    high: 11,
    speed: 6,
    hoursNeeded: 6,
    ans: 6,
    variables: { speed: 6, hoursTaken: 6, limit: 8, canFinish: true, 'action': 'ans = 6, try slower high = 5' },
    explain: 'At speed 6 bananas/hr, Koko finishes in 6 hours, within the 8-hour limit. Record ans = 6 and try lower speeds [1...5].',
    intuition: 'Valid speed found! Search for an even smaller minimum speed on the left.'
  },
  {
    title: '3. Try speed k = 3: Hours = 1 + 2 + 3 + 4 = 10 > 8 (Too Slow!)',
    phase: 'TOO_SLOW',
    codeLine: 28,
    piles: [3, 6, 7, 11],
    h: 8,
    low: 1,
    high: 5,
    speed: 3,
    hoursNeeded: 10,
    ans: 6,
    variables: { speed: 3, hoursTaken: 10, limit: 8, canFinish: false, 'action': 'Speed too slow! low = mid + 1 = 4' },
    explain: 'At speed 3 bananas/hr, Koko needs 10 hours, which exceeds 8 hours. 3 is too slow! Eliminate speeds [1...3].',
    intuition: 'Too slow, so speed must be strictly higher.'
  },
  {
    title: '4. Try speed k = 4: Hours = 1 + 2 + 2 + 3 = 8 ≤ 8 (Success!)',
    phase: 'EVALUATE_SPEED',
    codeLine: 24,
    piles: [3, 6, 7, 11],
    h: 8,
    low: 4,
    high: 5,
    speed: 4,
    hoursNeeded: 8,
    ans: 4,
    variables: { speed: 4, hoursTaken: 8, limit: 8, canFinish: true, 'action': 'ans = 4, try high = 3' },
    explain: 'At speed 4, total hours = 8 <= 8. Exactly on time! Update ans = 4. high becomes 3 < low=4, ending the search.',
    intuition: 'Optimal boundary reached.'
  },
  {
    title: '5. Minimum Speed Found: k = 4 bananas/hour',
    phase: 'COMPLETED',
    codeLine: 32,
    piles: [3, 6, 7, 11],
    h: 8,
    low: 4,
    high: 3,
    speed: 4,
    hoursNeeded: 8,
    ans: 4,
    variables: { minSpeed: 4, totalHours: 8, timeComplexity: 'O(N log(maxPile))' },
    explain: 'Search terminates with ans = 4. Koko needs at least 4 bananas/hour to finish in 8 hours.',
    intuition: 'Binary Search on Answers finds the exact threshold in logarithmic time.'
  }
];

export default function KokoEatingBananasVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Top Banner Stats */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <div className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Current Speed: {step.speed ? `${step.speed} bananas/hr` : 'Testing'}
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Hours Needed: <strong className={step.hoursNeeded !== null ? (step.hoursNeeded <= step.h ? 'text-emerald-300' : 'text-rose-400') : 'text-white'}>
            {step.hoursNeeded ?? '-'} / {step.h} hrs
          </strong>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Best ans = {step.ans}
        </div>
      </div>

      {/* Banana Piles Representation */}
      <div className="w-full flex items-end justify-center gap-4 py-4 h-40">
        {step.piles.map((pile, idx) => {
          const heightPct = (pile / 11) * 100;
          const hrsForPile = step.speed ? Math.ceil(pile / step.speed) : null;

          return (
            <div key={idx} className="flex flex-col items-center gap-1.5">
              <span className="text-xs font-mono text-[#8a8ea3]">
                {hrsForPile !== null ? `${hrsForPile}h` : ''}
              </span>

              {/* Pile Bar */}
              <div
                style={{ height: `${Math.max(40, heightPct)}px` }}
                className="w-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-mono font-bold text-lg text-amber-200 shadow-md shadow-amber-500/10 transition-all duration-300"
              >
                🍌 {pile}
              </div>

              <span className="text-[10px] font-mono text-[#5b6076]">pile {idx}</span>
            </div>
          );
        })}
      </div>

      {/* Speed Domain Bar */}
      <div className="flex items-center gap-4 text-xs font-mono text-[#8a8ea3]">
        <span>Speed Range: [1 ... 11]</span>
        <span>•</span>
        <span>Current Domain: [{step.low} ... {Math.max(step.low, step.high)}]</span>
      </div>
    </div>
  );
}

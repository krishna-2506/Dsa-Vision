// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Koko Eating Bananas (Binary Search on Answer)',
  category: 'Binary Search on Answers',
  difficulty: 'Medium',
  timeComplexity: 'O(N log(maxPile))',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the minimum hourly eating speed K such that Koko can consume all piles of bananas within H hours using binary search over the monotonic speed domain [1 ... max(piles)].'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Binary Search on Eating Speed Invariant',
  nodes: [
    { id: 'root', label: 'Speed Optimization Strategy', children: ['monotonic-predicate', 'domain-definition', 'feasible-exploration', 'integer-ceil'] },
    { id: 'monotonic-predicate', label: '1. Monotonic Hours Function', detail: 'Total hours T(k) = sum(ceil(pile / k)) is non-increasing as eating speed k increases. T(k) <= H forms a step function' },
    { id: 'domain-definition', label: '2. Search Domain [1 ... max(piles)]', detail: 'Minimum speed is 1 banana/hour; maximum speed is max(piles) (where every pile requires exactly 1 hour)' },
    { id: 'feasible-exploration', label: '3. Feasible Speed Tracking', detail: 'If T(mid) <= H, speed mid works; record ans = mid and explore smaller speeds (high = mid - 1) to minimize k' },
    { id: 'integer-ceil', label: '4. Exact Integer Ceiling Math', detail: 'ceil(p / k) = (p + k - 1) / k avoids floating-point inaccuracies when calculating hours per pile' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Binary Search on Eating Speed
// Time Complexity: O(N * log(maxPile)) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    long long calculateTotalHours(const vector<int>& piles, int speed) {
        long long totalH = 0;
        for (int p : piles) {
            totalH += (p + speed - 1) / speed; // Integer ceil
        }
        return totalH;
    }

    int minEatingSpeed(vector<int>& piles, int h) {
        int low = 1;
        int high = *max_element(piles.begin(), piles.end());
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            long long totalH = calculateTotalHours(piles, mid);

            if (totalH <= h) {
                ans = mid;      // Feasible speed, try slower
                high = mid - 1;
            } else {
                low = mid + 1;  // Too slow, must speed up
            }
        }

        return ans;
    }
};`,
  python: `# Python 3 Optimal Binary Search on Speed
# Time Complexity: O(N * log(maxPile)) | Space Complexity: O(1)
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
// Time Complexity: O(N * log(maxPile)) | Space Complexity: O(1)
class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int low = 1, high = 0;
        for (int p : piles) high = Math.max(high, p);
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            long totalH = 0;
            for (int p : piles) {
                totalH += (p + mid - 1) / mid; // Integer ceil
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
// Time Complexity: O(N * log(maxPile)) | Space Complexity: O(1)
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
    title: '1. Problem Setup: Piles [3, 6, 7, 11], Available Hours H = 8',
    phase: 'SETUP',
    track: {
      label: 'Banana Piles (piles[i])',
      items: [3, 6, 7, 11]
    },
    auxiliaryTrack: {
      label: 'Hourly Eating Speed Domain k ∈ [1 ... 11]',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 10,
    metrics: [
      { label: 'Piles Count N', value: '4' },
      { label: 'Hour Limit H', value: '8 hours' },
      { label: 'Speed Range', value: '[1 ... 11] bananas/hr' },
      { label: 'Best Feasible k', value: '11 (Initial)' }
    ],
    variables: { h: 8, 'piles': '[3, 6, 7, 11]', low: 1, high: 11, ans: 11 },
    formula: 'Total Hours T(k) = sum(ceil(p / k)) | Find minimum k such that T(k) <= H',
    action: 'Initialize binary search domain for speed k from 1 to max(piles) = 11',
    explain: 'At speed k = 11, Koko finishes each pile in exactly 1 hour (total 4 hours <= 8). At speed k = 1, she takes 3+6+7+11 = 27 hours (> 8). Monotonicity allows binary search over [1..11].',
    intuition: 'Since hours needed monotonically decreases as speed increases, binary search finds the exact threshold speed.'
  },
  {
    title: '2. Pass 1: Test Speed mid = 6 -> Compute Hours per Pile',
    phase: 'EVALUATE_SPEED',
    track: {
      label: 'Banana Piles (piles[i])',
      items: [
        { value: 3, status: 'current' },
        { value: 6, status: 'current' },
        { value: 7, status: 'current' },
        { value: 11, status: 'current' }
      ]
    },
    auxiliaryTrack: {
      label: 'Hours Spent per Pile at Speed k = 6: ceil(p / 6)',
      items: [
        { value: '1h', status: 'current' },
        { value: '1h', status: 'current' },
        { value: '2h', status: 'current' },
        { value: '2h', status: 'current' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Testing Speed k', value: '6 bananas/hr', highlight: true },
      { label: 'Hours Equation', value: '1 + 1 + 2 + 2 = 6h' },
      { label: 'Total Hours Taken', value: '6 hours', highlight: true },
      { label: 'Limit H', value: '8 hours' }
    ],
    variables: { speed: 6, pile0_hrs: 1, pile1_hrs: 1, pile2_hrs: 2, pile3_hrs: 2, total_hours: 6 },
    formula: 'ceil(3/6)=1, ceil(6/6)=1, ceil(7/6)=2, ceil(11/6)=2 ==> 1+1+2+2 = 6 hours',
    action: 'Calculate total hours required at eating speed 6 bananas/hour',
    explain: 'At speed 6: pile 0 (3 bananas) takes 1h; pile 1 (6 bananas) takes 1h; pile 2 (7 bananas) takes 2h; pile 3 (11 bananas) takes 2h. Total time is 6 hours.',
    intuition: 'Speed 6 easily allows Koko to finish before the 8-hour guard returns.'
  },
  {
    title: '3. Pass 1 Decision: 6 <= 8 (Feasible!) -> ans = 6, Try Slower Speeds [1 ... 5]',
    phase: 'FEASIBLE_CANDIDATE',
    track: {
      label: 'Banana Piles (piles[i])',
      items: [3, 6, 7, 11]
    },
    auxiliaryTrack: {
      label: 'Speed Domain [1 ... 11]',
      items: [
        1, 2, 3, 4, 5,
        { value: 6, status: 'match' },
        { value: 7, status: 'discarded' },
        { value: 8, status: 'discarded' },
        { value: 9, status: 'discarded' },
        { value: 10, status: 'discarded' },
        { value: 11, status: 'discarded' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Comparison', value: '6h <= 8h (SUCCESS)', highlight: true },
      { label: 'Recorded ans', value: '6 bananas/hr', highlight: true },
      { label: 'Discarded Speeds', value: '[6 ... 11]' },
      { label: 'New Search Window', value: '[1 ... 5]' }
    ],
    variables: { low: 1, high: 5, ans: 6, condition: 'totalH <= h', action: 'high = mid - 1 = 5' },
    formula: 'Total hours 6 <= 8 ==> Speed 6 is feasible! ans = 6, high = mid - 1 = 5',
    action: 'Speed 6 is valid; record ans = 6 and search lower speeds [1..5] to find the minimum',
    explain: 'Because Koko finishes in 6 hours (<= 8 hours), speed 6 works. Since we want the minimum speed, any speed > 6 is redundant. We update ans = 6 and set high = 5 to try slower eating rates.',
    intuition: 'Lock in 6 as our current best speed, then explore if Koko can eat even slower.'
  },
  {
    title: '4. Pass 2: Test Speed mid = 3 -> Compute Hours per Pile',
    phase: 'EVALUATE_SPEED',
    track: {
      label: 'Banana Piles (piles[i])',
      items: [
        { value: 3, status: 'current' },
        { value: 6, status: 'current' },
        { value: 7, status: 'current' },
        { value: 11, status: 'current' }
      ]
    },
    auxiliaryTrack: {
      label: 'Hours Spent per Pile at Speed k = 3: ceil(p / 3)',
      items: [
        { value: '1h', status: 'current' },
        { value: '2h', status: 'current' },
        { value: '3h', status: 'current' },
        { value: '4h', status: 'current' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Testing Speed k', value: '3 bananas/hr', highlight: true },
      { label: 'Hours Equation', value: '1 + 2 + 3 + 4 = 10h' },
      { label: 'Total Hours Taken', value: '10 hours', highlight: true },
      { label: 'Limit H', value: '8 hours' }
    ],
    variables: { speed: 3, pile0_hrs: 1, pile1_hrs: 2, pile2_hrs: 3, pile3_hrs: 4, total_hours: 10 },
    formula: 'ceil(3/3)=1, ceil(6/3)=2, ceil(7/3)=3, ceil(11/3)=4 ==> 1+2+3+4 = 10 hours',
    action: 'Calculate total hours required at eating speed 3 bananas/hour',
    explain: 'With low = 1 and high = 5, mid = 3. At speed 3: pile 0 takes 1h; pile 1 takes 2h; pile 2 takes 3h; pile 3 takes 4h. Total time is 10 hours.',
    intuition: 'At 3 bananas per hour, Koko takes too long to finish all piles.'
  },
  {
    title: '5. Pass 2 Decision: 10 > 8 (Too Slow!) -> Discard Speeds [1 ... 3] -> low = 4',
    phase: 'TOO_SLOW',
    track: {
      label: 'Banana Piles (piles[i])',
      items: [3, 6, 7, 11]
    },
    auxiliaryTrack: {
      label: 'Speed Domain [1 ... 11]',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 3, status: 'discarded' },
        4, 5,
        { value: 6, status: 'match' },
        { value: 7, status: 'discarded' },
        { value: 8, status: 'discarded' },
        { value: 9, status: 'discarded' },
        { value: 10, status: 'discarded' },
        { value: 11, status: 'discarded' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 3,
    windowEnd: 4,
    metrics: [
      { label: 'Comparison', value: '10h > 8h (OVER LIMIT)', highlight: true },
      { label: 'Verdict', value: 'Too Slow! Guard arrives' },
      { label: 'Discarded Speeds', value: '[1 ... 3]' },
      { label: 'New Search Window', value: '[4 ... 5]' }
    ],
    variables: { low: 4, high: 5, ans: 6, condition: 'totalH > h', action: 'low = mid + 1 = 4' },
    formula: 'Total hours 10 > 8 ==> Speed 3 too slow; low = mid + 1 = 4',
    action: 'Speed 3 exceeds 8 hours; discard speeds <= 3 and advance low to 4',
    explain: 'Because speed 3 requires 10 hours (> 8 hours), any speed <= 3 will take at least 10 hours. We safely eliminate speeds [1..3] and advance low to 4.',
    intuition: 'Lower half discarded because slower speeds are guaranteed to fail.'
  },
  {
    title: '6. Pass 3: Test Speed mid = 4 -> Compute Hours per Pile',
    phase: 'EVALUATE_SPEED',
    track: {
      label: 'Banana Piles (piles[i])',
      items: [
        { value: 3, status: 'current' },
        { value: 6, status: 'current' },
        { value: 7, status: 'current' },
        { value: 11, status: 'current' }
      ]
    },
    auxiliaryTrack: {
      label: 'Hours Spent per Pile at Speed k = 4: ceil(p / 4)',
      items: [
        { value: '1h', status: 'current' },
        { value: '2h', status: 'current' },
        { value: '2h', status: 'current' },
        { value: '3h', status: 'current' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Testing Speed k', value: '4 bananas/hr', highlight: true },
      { label: 'Hours Equation', value: '1 + 2 + 2 + 3 = 8h' },
      { label: 'Total Hours Taken', value: '8 hours', highlight: true },
      { label: 'Limit H', value: '8 hours' }
    ],
    variables: { speed: 4, pile0_hrs: 1, pile1_hrs: 2, pile2_hrs: 2, pile3_hrs: 3, total_hours: 8 },
    formula: 'ceil(3/4)=1, ceil(6/4)=2, ceil(7/4)=2, ceil(11/4)=3 ==> 1+2+2+3 = 8 hours',
    action: 'Calculate total hours required at eating speed 4 bananas/hour',
    explain: 'With low = 4 and high = 5, mid = 4. Pile 0 (3) takes 1h; Pile 1 (6) takes 2h; Pile 2 (7) takes 2h; Pile 3 (11) takes 3h. Total time = 1 + 2 + 2 + 3 = 8 hours exactly!',
    intuition: 'Speed 4 hits the exact deadline limit.'
  },
  {
    title: '7. Pass 3 Decision: 8 <= 8 (Feasible!) -> Update ans = 4, high = 3',
    phase: 'FEASIBLE_CANDIDATE',
    track: {
      label: 'Banana Piles (piles[i])',
      items: [3, 6, 7, 11]
    },
    auxiliaryTrack: {
      label: 'Speed Domain [1 ... 11]',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 4, status: 'match' },
        { value: 5, status: 'discarded' },
        { value: 6, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 8, status: 'discarded' },
        { value: 9, status: 'discarded' },
        { value: 10, status: 'discarded' },
        { value: 11, status: 'discarded' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 3,
    windowEnd: 2,
    metrics: [
      { label: 'Comparison', value: '8h <= 8h (EXACT FIT)', highlight: true },
      { label: 'Updated ans', value: '4 bananas/hr', highlight: true },
      { label: 'New high', value: 'mid - 1 = 3' },
      { label: 'low Pointer', value: '4' }
    ],
    variables: { low: 4, high: 3, ans: 4, condition: 'totalH <= h', action: 'high = mid - 1 = 3' },
    formula: 'Total hours 8 <= 8 ==> ans = 4, high = 4 - 1 = 3',
    action: 'Speed 4 meets deadline! Update ans = 4; high becomes 3 < low=4',
    explain: 'At speed 4, Koko finishes exactly in 8 hours. We update ans = 4 and set high = 3. Now low (4) > high (3), which halts the binary search.',
    intuition: 'The optimal boundary speed is locked in at k = 4.'
  },
  {
    title: '8. Complexity Analysis & Minimum Speed Result: k = 4 bananas/hour',
    phase: 'COMPLETED',
    track: {
      label: 'Banana Piles (piles[i])',
      items: [3, 6, 7, 11]
    },
    auxiliaryTrack: {
      label: 'Optimal Eating Rate: k = 4 bananas/hr (Hours: 1 + 2 + 2 + 3 = 8h <= 8h)',
      items: [
        { value: '1h', status: 'match' },
        { value: '2h', status: 'match' },
        { value: '2h', status: 'match' },
        { value: '3h', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Minimum Speed k', value: '4 bananas/hr', highlight: true },
      { label: 'Total Hours Needed', value: '8 hours (<= 8h)' },
      { label: 'Time Complexity', value: 'O(N log(maxPile))', highlight: true },
      { label: 'Space Complexity', value: 'O(1) Auxiliary', highlight: true }
    ],
    variables: { result: 4, hours: 8, maxLimit: 8, timeComplexity: 'O(N log(maxPile))' },
    formula: 'k_min = 4 bananas/hour | N * log2(11) = 4 * 4 = 16 operations',
    action: 'Binary search terminates; return minimum speed 4 bananas/hour',
    explain: 'Koko must eat at least 4 bananas per hour to finish within 8 hours. Any slower speed (such as 3) exceeds the time limit. Binary search on answers found this exact boundary in O(N log(maxPile)) time without testing every speed linearly.',
    intuition: 'Binary Search on Answers efficiently resolves rate and threshold optimization problems.'
  }
];

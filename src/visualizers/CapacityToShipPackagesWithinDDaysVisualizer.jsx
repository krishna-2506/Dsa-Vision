// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Capacity to Ship Packages Within D Days',
  category: 'Binary Search on Answers',
  difficulty: 'Medium',
  timeComplexity: 'O(N log(sum - max))',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the least weight capacity of a ship that allows all packages on a conveyor belt to be transported within D days using binary search over the domain [max(weights) ... sum(weights)].'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Ship Capacity Binary Search Invariant',
  nodes: [
    { id: 'root', label: 'Ship Capacity Strategy', children: ['domain-bounds', 'greedy-loading', 'capacity-feasibility', 'logarithmic-convergence'] },
    { id: 'domain-bounds', label: '1. Tight Search Boundaries', detail: 'Minimum possible capacity is max(weights) (heaviest package must fit); maximum is sum(weights) (all packages ship in 1 day)' },
    { id: 'greedy-loading', label: '2. Greedy Sequential Packing', detail: 'Accumulate weight onto ship for current day; when load + weight > cap, start a new day with daysNeeded++' },
    { id: 'capacity-feasibility', label: '3. Monotonic Feasibility', detail: 'If daysNeeded <= D, capacity is viable; record ans = cap and explore lighter capacities (high = mid - 1)' },
    { id: 'logarithmic-convergence', label: '4. Optimal O(N log(sum - max))', detail: 'Halves the weight domain on each pass; strictly solves large inputs in under 30 iterations' }
  ]
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
                load = w; // Start new day with package w
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
                low = mid + 1;  // Too small, need higher capacity
            }
        }

        return ans;
    }
};`,
  python: `# Python 3 Optimal Binary Search on Ship Capacity
# Time Complexity: O(N * log(sum - max)) | Space Complexity: O(1)
class Solution:
    def shipWithinDays(self, weights: list[int], days: int) -> int:
        def find_days(cap: int) -> int:
            d = 1
            load = 0
            for w in weights:
                if load + w > cap:
                    d += 1
                    load = w
                else:
                    load += w
            return d

        low = max(weights)
        high = sum(weights)
        ans = high

        while low <= high:
            mid = (low + high) // 2
            if find_days(mid) <= days:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans`,
  java: `// Java Optimal Binary Search on Ship Capacity
// Time Complexity: O(N * log(sum - max)) | Space Complexity: O(1)
import java.util.Arrays;

class Solution {
    private int findDays(int[] weights, int cap) {
        int days = 1;
        int load = 0;
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
        int low = Arrays.stream(weights).max().getAsInt();
        int high = Arrays.stream(weights).sum();
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (findDays(weights, mid) <= days) {
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
// Time Complexity: O(N * log(sum - max)) | Space Complexity: O(1)
var shipWithinDays = function(weights, days) {
    let low = Math.max(...weights);
    let high = weights.reduce((a, b) => a + b, 0);
    let ans = high;

    const findDays = (cap) => {
        let d = 1;
        let load = 0;
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
        if (findDays(mid) <= days) {
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
    title: '1. Problem Setup: weights = [1..10], Target Days D = 5',
    phase: 'SETUP',
    track: {
      label: 'Conveyor Belt Packages (weights[i])',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    auxiliaryTrack: {
      label: 'Ship Capacity Search Domain [10 ... 55]',
      items: [10, 14, 15, 17, 20, 25, 32, 40, 55]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 8,
    metrics: [
      { label: 'Total Packages', value: '10' },
      { label: 'Target Days D', value: '5 days' },
      { label: 'Min Capacity (max weight)', value: '10' },
      { label: 'Max Capacity (total sum)', value: '55' }
    ],
    variables: { d: 5, low: 10, high: 55, ans: 55, totalWeight: 55 },
    formula: 'Capacity Domain = [max(weights) .. sum(weights)] = [10 .. 55]',
    action: 'Initialize binary search domain [10 .. 55] with fallback ans = 55',
    explain: 'The ship must carry at least weight 10 (the heaviest package). If capacity is 55, all packages ship in 1 single day. We search between 10 and 55 for the minimum capacity finishing in <= 5 days.',
    intuition: 'Capacity is inversely proportional to days needed: higher capacity means fewer days.'
  },
  {
    title: '2. Pass 1: Test Capacity mid = 32 -> Simulate Daily Packing',
    phase: 'EVALUATE_CAPACITY',
    track: {
      label: 'Conveyor Belt Packages',
      items: [
        { value: '1..7 (Load 28)', status: 'match' },
        { value: '8..10 (Load 27)', status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'Daily Shipment Breakdown at Capacity 32',
      items: [
        { value: 'Day 1: [1,2,3,4,5,6,7] (28)', status: 'match' },
        { value: 'Day 2: [8,9,10] (27)', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 1,
    metrics: [
      { label: 'Testing Capacity', value: '32', highlight: true },
      { label: 'Days Needed', value: '2 days', highlight: true },
      { label: 'Allowed Days D', value: '5 days' },
      { label: 'Status', value: '2 <= 5 (FEASIBLE)' }
    ],
    variables: { cap: 32, daysNeeded: 2, limit: 5, feasible: true },
    formula: 'Day 1 load: 28 <= 32 | Day 2 load: 27 <= 32 ==> 2 days needed <= 5',
    action: 'Simulate packing with capacity 32: only 2 days needed, well within 5-day limit',
    explain: 'At capacity 32: Day 1 takes packages 1..7 (total weight 28). Adding package 8 would exceed 32, so Day 2 takes 8, 9, 10 (total weight 27). Total days needed = 2 <= 5.',
    intuition: 'Capacity 32 is viable! Now check if a lighter ship also works.'
  },
  {
    title: '3. Pass 1 Decision: 2 <= 5 (Feasible!) -> Record ans = 32, Search [10 ... 31]',
    phase: 'FEASIBLE_CANDIDATE',
    track: {
      label: 'Conveyor Belt Packages',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    auxiliaryTrack: {
      label: 'Capacity Domain Timeline',
      items: [
        10, 14, 15, 17, 20, 25,
        { value: 32, status: 'match' },
        { value: 40, status: 'discarded' },
        { value: 55, status: 'discarded' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 5,
    metrics: [
      { label: 'Recorded ans', value: '32', highlight: true },
      { label: 'Discarded Range', value: '[32 ... 55]' },
      { label: 'New Search Domain', value: '[10 ... 31]' },
      { label: 'high updated to', value: 'mid - 1 = 31' }
    ],
    variables: { low: 10, high: 31, ans: 32, action: 'high = mid - 1 = 31' },
    formula: 'findDays(32) <= 5 ==> ans = 32, high = mid - 1 = 31',
    action: 'Capacity 32 works; save ans = 32 and explore lighter capacities [10..31]',
    explain: 'Because capacity 32 delivers all packages in 2 days (<= 5 days), any capacity > 32 is unnecessarily heavy. We save ans = 32 and decrement high to 31.',
    intuition: 'Greedily tighten the capacity bound to minimize ship weight.'
  },
  {
    title: '4. Pass 2: Test Capacity mid = 20 -> Simulate Daily Packing',
    phase: 'EVALUATE_CAPACITY',
    track: {
      label: 'Conveyor Belt Packages',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    auxiliaryTrack: {
      label: 'Daily Shipment Breakdown at Capacity 20',
      items: [
        { value: 'Day 1: [1..5] (15)', status: 'match' },
        { value: 'Day 2: [6,7] (13)', status: 'match' },
        { value: 'Day 3: [8,9] (17)', status: 'match' },
        { value: 'Day 4: [10] (10)', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Testing Capacity', value: '20', highlight: true },
      { label: 'Days Needed', value: '4 days', highlight: true },
      { label: 'Allowed Days D', value: '5 days' },
      { label: 'Status', value: '4 <= 5 (FEASIBLE)' }
    ],
    variables: { cap: 20, daysNeeded: 4, limit: 5, feasible: true },
    formula: 'Day 1 (15), Day 2 (13), Day 3 (17), Day 4 (10) ==> 4 days needed <= 5',
    action: 'Simulate packing with capacity 20: 4 days needed, finishing on time',
    explain: 'At capacity 20, packing yields 4 days: [1..5] weight 15; [6,7] weight 13; [8,9] weight 17; [10] weight 10. Since 4 <= 5, capacity 20 is feasible! ans updates to 20, high becomes 19.',
    intuition: 'Capacity 20 works and saves significant payload.'
  },
  {
    title: '5. Pass 3: Test Capacity mid = 14 -> Days Needed = 6 > 5 (Too Slow!)',
    phase: 'TOO_SLOW',
    track: {
      label: 'Conveyor Belt Packages',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    auxiliaryTrack: {
      label: 'Daily Shipment Breakdown at Capacity 14',
      items: [
        { value: 'Day 1: [1..4] (10)', status: 'current' },
        { value: 'Day 2: [5,6] (11)', status: 'current' },
        { value: 'Day 3: [7] (7)', status: 'current' },
        { value: 'Day 4: [8] (8)', status: 'current' },
        { value: 'Day 5: [9] (9)', status: 'current' },
        { value: 'Day 6: [10] (10)', status: 'discarded' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 5,
    metrics: [
      { label: 'Testing Capacity', value: '14', highlight: true },
      { label: 'Days Needed', value: '6 days', highlight: true },
      { label: 'Allowed Days D', value: '5 days' },
      { label: 'Comparison', value: '6 > 5 (DEADLINE EXCEEDED)' }
    ],
    variables: { cap: 14, daysNeeded: 6, limit: 5, feasible: false, action: 'low = mid + 1 = 15' },
    formula: 'findDays(14) = 6 > 5 ==> Capacity 14 is too small! low = 15',
    action: 'Capacity 14 takes 6 days, exceeding 5 days; discard capacities <= 14',
    explain: 'At capacity 14, shipping requires 6 days. Because 6 > 5, capacity 14 fails to meet the deadline. Any capacity <= 14 will require at least 6 days. We discard [10..14] and set low = 15.',
    intuition: 'Capacity is too small; we must increase the threshold.'
  },
  {
    title: '6. Pass 4: Test Capacity mid = 15 -> Days Needed = 5 (EXACT MATCH!)',
    phase: 'EVALUATE_CAPACITY',
    track: {
      label: 'Conveyor Belt Packages',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    auxiliaryTrack: {
      label: 'Daily Shipment Breakdown at Capacity 15',
      items: [
        { value: 'Day 1: [1..5] (15)', status: 'match' },
        { value: 'Day 2: [6,7] (13)', status: 'match' },
        { value: 'Day 3: [8] (8)', status: 'match' },
        { value: 'Day 4: [9] (9)', status: 'match' },
        { value: 'Day 5: [10] (10)', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Testing Capacity', value: '15', highlight: true },
      { label: 'Days Needed', value: '5 days', highlight: true },
      { label: 'Allowed Days D', value: '5 days' },
      { label: 'Status', value: '5 <= 5 (PERFECT FIT)' }
    ],
    variables: { cap: 15, daysNeeded: 5, limit: 5, feasible: true },
    formula: 'Day 1 (15), Day 2 (13), Day 3 (8), Day 4 (9), Day 5 (10) ==> Exactly 5 days',
    action: 'Evaluate capacity 15: exactly 5 days required, meeting the deadline',
    explain: 'At capacity 15: Day 1 takes [1..5] (15); Day 2 takes [6,7] (13); Day 3 takes [8] (8); Day 4 takes [9] (9); Day 5 takes [10] (10). All 10 packages ship in exactly 5 days!',
    intuition: 'Capacity 15 hits the exact target deadline.'
  },
  {
    title: '7. Pass 4 Decision: Update ans = 15 -> Search Interval Inverts',
    phase: 'TERMINATION',
    track: {
      label: 'Conveyor Belt Packages',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    auxiliaryTrack: {
      label: 'Capacity Domain Timeline',
      items: [
        { value: 10, status: 'discarded' },
        { value: 14, status: 'discarded' },
        { value: 15, status: 'match' },
        { value: 17, status: 'discarded' },
        { value: 20, status: 'discarded' },
        { value: 25, status: 'discarded' },
        { value: 32, status: 'discarded' },
        { value: 40, status: 'discarded' },
        { value: 55, status: 'discarded' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 2,
    windowEnd: 1,
    metrics: [
      { label: 'Final ans', value: '15', highlight: true },
      { label: 'low Pointer', value: '15' },
      { label: 'high Pointer', value: '14' },
      { label: 'Loop Status', value: 'low > high (TERMINATED)' }
    ],
    variables: { low: 15, high: 14, ans: 15, loopTerminated: true },
    formula: 'findDays(15) <= 5 ==> ans = 15, high = 14 < low (15) ==> Loop Halts',
    action: 'Update ans = 15; high decrements to 14; search terminates',
    explain: 'Because capacity 15 works, ans updates to 15 and high becomes 14. Now low (15) > high (14). The binary search finishes with 15 as the optimal minimum capacity.',
    intuition: 'Exact boundary discovered.'
  },
  {
    title: '8. Complexity & Final Result: Least Capacity = 15',
    phase: 'COMPLETED',
    track: {
      label: 'Optimal 5-Day Shipping Schedule (Capacity 15)',
      items: [
        { value: 'Day 1: [1..5]', status: 'match' },
        { value: 'Day 2: [6,7]', status: 'match' },
        { value: 'Day 3: [8]', status: 'match' },
        { value: 'Day 4: [9]', status: 'match' },
        { value: 'Day 5: [10]', status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'Daily Loads: [15, 13, 8, 9, 10] (All <= 15)',
      items: [
        { value: '15 / 15', status: 'match' },
        { value: '13 / 15', status: 'match' },
        { value: '8 / 15', status: 'match' },
        { value: '9 / 15', status: 'match' },
        { value: '10 / 15', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Least Capacity', value: '15', highlight: true },
      { label: 'Total Shipping Days', value: '5 days (<= 5)' },
      { label: 'Time Complexity', value: 'O(N log(sum - max))', highlight: true },
      { label: 'Space Complexity', value: 'O(1) Auxiliary', highlight: true }
    ],
    variables: { result: 15, daysUsed: 5, maxCapacity: 15, timeComplexity: 'O(N log(sum - max))' },
    formula: 'Capacity = 15 | Time = O(N * log(55 - 10)) = 10 * 6 = 60 operations',
    action: 'Algorithm concludes; return least capacity 15 with zero auxiliary memory',
    explain: 'The minimum ship capacity that guarantees transporting all packages within 5 days is 15. Binary search solved this in 6 simulation passes compared to 46 sequential checks.',
    intuition: 'Capacity planning problems mapped to binary search deliver logarithmic performance.'
  }
];

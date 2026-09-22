// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Minimum Days to Make M Bouquets',
  category: 'Binary Search on Answers',
  difficulty: 'Medium',
  timeComplexity: 'O(N * log(max - min))',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the minimum waiting days to harvest M bouquets consisting of K adjacent bloomed flowers using binary search on the day timeline.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Bouquet Feasibility Binary Search Invariant',
  nodes: [
    { id: 'root', label: 'Bouquet BS Strategy', children: ['impossible-check', 'monotonic-bloom', 'consecutive-greedy', 'domain-halving'] },
    { id: 'impossible-check', label: '1. Total Flower Availability', detail: 'If total flowers N < m * k, it is impossible to form m bouquets; return -1 immediately' },
    { id: 'monotonic-bloom', label: '2. Monotonic Bloom Predicate', detail: 'As days increase, more flowers bloom and never un-bloom. The function possible(day) is monotonic (False ... False, True ... True)' },
    { id: 'consecutive-greedy', label: '3. Greedy Adjacent Counting', detail: 'Scan bloomDay: if bloomDay[i] <= day, increment streak; at streak == k, bouquet++ and reset streak. Reset streak on unbloomed flowers' },
    { id: 'domain-halving', label: '4. Binary Search on Timeline', detail: 'Search domain is [min(bloomDay) .. max(bloomDay)]. If possible(mid), record ans = mid and test fewer days (high = mid - 1)' }
  ]
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
                ans = mid;      // Feasible day, try fewer days
                high = mid - 1;
            } else {
                low = mid + 1;  // Not enough flowers bloomed, wait longer
            }
        }
        return ans;
    }
};`,
  python: `# Python 3 Minimum Days to Make M Bouquets
# Time Complexity: O(N * log(max - min)) | Space Complexity: O(1)
class Solution:
    def minDays(self, bloomDay: list[int], m: int, k: int) -> int:
        if len(bloomDay) < m * k:
            return -1

        def possible(day: int) -> bool:
            bouquets = 0
            cnt = 0
            for b in bloomDay:
                if b <= day:
                    cnt += 1
                    if cnt == k:
                        bouquets += 1
                        cnt = 0
                else:
                    cnt = 0
            return bouquets >= m

        low = min(bloomDay)
        high = max(bloomDay)
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
// Time Complexity: O(N * log(max - min)) | Space Complexity: O(1)
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
// Time Complexity: O(N * log(max - min)) | Space Complexity: O(1)
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
    title: '1. Problem Setup: Garden = [1, 10, 3, 10, 2], Target: M = 3 Bouquets (K = 1 flower each)',
    phase: 'SETUP',
    track: {
      label: 'Garden Bloom Days (bloomDay[i])',
      items: [1, 10, 3, 10, 2]
    },
    auxiliaryTrack: {
      label: 'Waiting Day Search Domain [1 ... 10]',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 9,
    metrics: [
      { label: 'Total Flowers', value: '5' },
      { label: 'Required Flowers', value: 'm * k = 3 * 1 = 3' },
      { label: 'Search Domain', value: '[1 ... 10] days' },
      { label: 'Initial ans', value: '10 days' }
    ],
    variables: { m: 3, k: 1, low: 1, high: 10, totalFlowers: 5, ans: 10 },
    formula: 'Search Space = [min(bloomDay) .. max(bloomDay)] = [1 .. 10]',
    action: 'Verify total flowers >= m * k (5 >= 3); initialize binary search domain [1 .. 10]',
    explain: 'We need 3 bouquets of 1 flower each. Flowers bloom on days [1, 10, 3, 10, 2]. At day 10, all flowers bloom. At day 1, only flower 0 blooms. We binary search over day range [1..10].',
    intuition: 'Flowers once bloomed remain open forever, creating a strictly monotonic feasibility predicate.'
  },
  {
    title: '2. Pass 1: Test day mid = 5 -> Inspect Bloomed Flowers',
    phase: 'EVALUATE_DAY',
    track: {
      label: 'Garden Bloom Days at Day 5',
      items: [
        { value: '1 (Bloomed)', status: 'match' },
        { value: '10 (Closed)', status: 'discarded' },
        { value: '3 (Bloomed)', status: 'match' },
        { value: '10 (Closed)', status: 'discarded' },
        { value: '2 (Bloomed)', status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'Flower Status at Day 5: bloomDay[i] <= 5',
      items: [
        { value: '🌸 Bloomed', status: 'match' },
        { value: '🌱 Closed', status: 'discarded' },
        { value: '🌸 Bloomed', status: 'match' },
        { value: '🌱 Closed', status: 'discarded' },
        { value: '🌸 Bloomed', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Testing Day', value: 'Day 5', highlight: true },
      { label: 'Bloomed Flowers', value: '3 flowers (idx 0, 2, 4)', highlight: true },
      { label: 'Bouquets Formed', value: '3 bouquets' },
      { label: 'Required M', value: '3 bouquets' }
    ],
    variables: { day: 5, bloomed: 3, bouquets: 3, targetM: 3, feasible: true },
    formula: 'bloomDay[i] <= 5 ==> Bloomed at idx 0, 2, 4 ==> 3 bouquets formed',
    action: 'Check all flowers against day 5: 3 flowers are bloomed, forming 3 bouquets',
    explain: 'At day 5, flowers at indices 0 (day 1), 2 (day 3), and 4 (day 2) have bloomed. Since k = 1, each bloomed flower forms 1 bouquet. Total bouquets = 3 >= m = 3.',
    intuition: 'Day 5 is feasible! Now we test whether fewer days also suffice.'
  },
  {
    title: '3. Pass 1 Decision: 3 >= 3 (Feasible!) -> Record ans = 5, Search [1 ... 4]',
    phase: 'FEASIBLE_CANDIDATE',
    track: {
      label: 'Garden Bloom Days',
      items: [1, 10, 3, 10, 2]
    },
    auxiliaryTrack: {
      label: 'Search Domain Timeline',
      items: [
        1, 2, 3, 4,
        { value: 5, status: 'match' },
        { value: 6, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 8, status: 'discarded' },
        { value: 9, status: 'discarded' },
        { value: 10, status: 'discarded' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Feasibility at Day 5', value: 'TRUE (Valid)', highlight: true },
      { label: 'Recorded ans', value: '5 days', highlight: true },
      { label: 'Discarded Days', value: '[5 ... 10]' },
      { label: 'New Search Domain', value: '[1 ... 4] days' }
    ],
    variables: { low: 1, high: 4, ans: 5, action: 'high = mid - 1 = 4' },
    formula: 'possible(5) == true ==> ans = 5, high = mid - 1 = 4',
    action: 'Day 5 works; save ans = 5 and test earlier days [1..4] by setting high = 4',
    explain: 'Because 3 bouquets can be harvested by day 5, we do not need to wait for days 6 through 10. We record ans = 5 and search earlier days [1..4].',
    intuition: 'Greedily minimize waiting time by checking the left half.'
  },
  {
    title: '4. Pass 2: Test day mid = 2 -> Inspect Bloomed Flowers',
    phase: 'EVALUATE_DAY',
    track: {
      label: 'Garden Bloom Days at Day 2',
      items: [
        { value: '1 (Bloomed)', status: 'match' },
        { value: '10 (Closed)', status: 'discarded' },
        { value: '3 (Closed)', status: 'discarded' },
        { value: '10 (Closed)', status: 'discarded' },
        { value: '2 (Bloomed)', status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'Flower Status at Day 2: bloomDay[i] <= 2',
      items: [
        { value: '🌸 Bloomed', status: 'match' },
        { value: '🌱 Closed', status: 'discarded' },
        { value: '🌱 Closed', status: 'discarded' },
        { value: '🌱 Closed', status: 'discarded' },
        { value: '🌸 Bloomed', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Testing Day', value: 'Day 2', highlight: true },
      { label: 'Bloomed Flowers', value: '2 flowers (idx 0, 4)', highlight: true },
      { label: 'Bouquets Formed', value: '2 bouquets', highlight: true },
      { label: 'Required M', value: '3 bouquets' }
    ],
    variables: { day: 2, bloomed: 2, bouquets: 2, targetM: 3, feasible: false },
    formula: 'bloomDay[i] <= 2 ==> Only idx 0 and 4 bloomed ==> 2 bouquets < 3 required',
    action: 'Evaluate day 2: only 2 flowers bloomed, which cannot form 3 bouquets',
    explain: 'At day 2, only flowers at index 0 (day 1) and index 4 (day 2) have bloomed. Total bouquets = 2 < 3. Day 2 is too early!',
    intuition: 'Not enough flowers bloomed yet; we must wait longer.'
  },
  {
    title: '5. Pass 2 Decision: 2 < 3 (Too Early!) -> Discard [1 ... 2] -> low = 3',
    phase: 'TOO_EARLY',
    track: {
      label: 'Garden Bloom Days',
      items: [1, 10, 3, 10, 2]
    },
    auxiliaryTrack: {
      label: 'Search Domain Timeline',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        3, 4,
        { value: 5, status: 'match' },
        { value: 6, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 8, status: 'discarded' },
        { value: 9, status: 'discarded' },
        { value: 10, status: 'discarded' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 2,
    windowEnd: 3,
    metrics: [
      { label: 'Feasibility at Day 2', value: 'FALSE (Insufficient)', highlight: true },
      { label: 'Discarded Days', value: '[1 ... 2]' },
      { label: 'New Search Domain', value: '[3 ... 4] days' },
      { label: 'low updated to', value: 'mid + 1 = 3' }
    ],
    variables: { low: 3, high: 4, ans: 5, action: 'low = mid + 1 = 3' },
    formula: 'possible(2) == false ==> low = mid + 1 = 3',
    action: 'Day 2 fails; eliminate days <= 2 and advance low to 3',
    explain: 'Because day 2 cannot produce 3 bouquets, any day <= 2 will also fail. We discard [1..2] and advance low to 3. Search range narrows to [3..4].',
    intuition: 'Strict monotonicity allows eliminating the entire lower half.'
  },
  {
    title: '6. Pass 3: Test day mid = 3 -> Inspect Bloomed Flowers',
    phase: 'EVALUATE_DAY',
    track: {
      label: 'Garden Bloom Days at Day 3',
      items: [
        { value: '1 (Bloomed)', status: 'match' },
        { value: '10 (Closed)', status: 'discarded' },
        { value: '3 (Bloomed)', status: 'match' },
        { value: '10 (Closed)', status: 'discarded' },
        { value: '2 (Bloomed)', status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'Flower Status at Day 3: bloomDay[i] <= 3',
      items: [
        { value: '🌸 Bloomed', status: 'match' },
        { value: '🌱 Closed', status: 'discarded' },
        { value: '🌸 Bloomed', status: 'match' },
        { value: '🌱 Closed', status: 'discarded' },
        { value: '🌸 Bloomed', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Testing Day', value: 'Day 3', highlight: true },
      { label: 'Bloomed Flowers', value: '3 flowers (idx 0, 2, 4)', highlight: true },
      { label: 'Bouquets Formed', value: '3 bouquets', highlight: true },
      { label: 'Required M', value: '3 bouquets' }
    ],
    variables: { day: 3, bloomed: 3, bouquets: 3, targetM: 3, feasible: true },
    formula: 'bloomDay[i] <= 3 ==> Flowers at 0, 2, 4 are bloomed ==> 3 bouquets formed',
    action: 'Evaluate day 3: flower at index 2 blooms, yielding exactly 3 bouquets',
    explain: 'At day 3, flowers at indices 0, 2, and 4 are open. Total bouquets = 3 >= 3. Day 3 works!',
    intuition: 'Day 3 is valid and significantly tighter than day 5.'
  },
  {
    title: '7. Pass 3 Decision: 3 >= 3 (Feasible!) -> Update ans = 3, high = 2',
    phase: 'FEASIBLE_CANDIDATE',
    track: {
      label: 'Garden Bloom Days',
      items: [1, 10, 3, 10, 2]
    },
    auxiliaryTrack: {
      label: 'Search Domain Timeline',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 3, status: 'match' },
        { value: 4, status: 'discarded' },
        { value: 5, status: 'discarded' },
        { value: 6, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 8, status: 'discarded' },
        { value: 9, status: 'discarded' },
        { value: 10, status: 'discarded' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 2,
    windowEnd: 1,
    metrics: [
      { label: 'Comparison', value: '3 bouquets >= 3 (SUCCESS)', highlight: true },
      { label: 'Updated ans', value: '3 days', highlight: true },
      { label: 'New high', value: 'mid - 1 = 2' },
      { label: 'low Pointer', value: '3' }
    ],
    variables: { low: 3, high: 2, ans: 3, action: 'high = mid - 1 = 2' },
    formula: 'possible(3) == true ==> ans = 3, high = 3 - 1 = 2',
    action: 'Update ans = 3; high becomes 2 < low (3), terminating the search',
    explain: 'Day 3 is valid! We update our best answer ans = 3 and decrement high to 2. Now low (3) > high (2), which halts the binary search.',
    intuition: 'Boundary reached: 3 is the minimum feasible day.'
  },
  {
    title: '8. Complexity & Final Result: Minimum Waiting Time = 3 Days',
    phase: 'COMPLETED',
    track: {
      label: 'Final Bloomed Garden at Day 3 (3 Bouquets)',
      items: [
        { value: '🌸 Day 1', status: 'match' },
        { value: '🌱 Day 10', status: 'discarded' },
        { value: '🌸 Day 3', status: 'match' },
        { value: '🌱 Day 10', status: 'discarded' },
        { value: '🌸 Day 2', status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'Harvested Bouquets at Day 3: [Bouquet 1, Bouquet 2, Bouquet 3]',
      items: [
        { value: '💐 B1 (Flower 0)', status: 'match' },
        { value: '💐 B2 (Flower 2)', status: 'match' },
        { value: '💐 B3 (Flower 4)', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'Minimum Days', value: '3 days', highlight: true },
      { label: 'Total Bouquets', value: '3 / 3 formed' },
      { label: 'Time Complexity', value: 'O(N * log(max - min))', highlight: true },
      { label: 'Space Complexity', value: 'O(1) Auxiliary', highlight: true }
    ],
    variables: { result: 3, bouquetsFormed: 3, timeComplexity: 'O(N * log(max - min))' },
    formula: 'minDays = 3 days | N * log2(10 - 1) = 5 * 4 = 20 operations',
    action: 'Binary search terminates; return minimum waiting time 3 days',
    explain: 'At least 3 days must pass before 3 bouquets can be harvested. On day 3, flowers 0, 2, and 4 bloom and provide exactly the 3 bouquets needed. Binary search on answers found the exact threshold in logarithmic steps.',
    intuition: 'Binary Search on Answers solves complex simulation and threshold questions with ease.'
  }
];

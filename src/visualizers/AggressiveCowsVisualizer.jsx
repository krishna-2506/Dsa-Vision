// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Aggressive Cows (Binary Search on Answer)',
  category: 'Binary Search on Answers',
  difficulty: 'Hard',
  timeComplexity: 'O(N log N + N log(maxDist))',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Places K cows into stalls such that the minimum distance between any two cows is maximized using binary search over the possible stall gap distances.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Aggressive Cows Minimax Invariant',
  nodes: [
    { id: 'root', label: 'Aggressive Cows Strategy', children: ['sorting-prerequisite', 'greedy-cow-placement', 'max-min-binary-search', 'minimax-guarantee'] },
    { id: 'sorting-prerequisite', label: '1. Stall Coordinate Sorting', detail: 'Sorting stalls in O(N log N) arranges positions monotonically, allowing linear greedy cow placement' },
    { id: 'greedy-cow-placement', label: '2. Greedy Placement Check', detail: 'Place cow 1 at stalls[0]. For each stall, if stalls[i] - lastStall >= dist, place next cow. If cows placed >= K, dist is viable' },
    { id: 'max-min-binary-search', label: '3. Binary Search on Gap Distance', detail: 'Search domain is [1 .. max(stalls) - min(stalls)]. If canWePlace(mid), record ans = mid and explore larger gaps (low = mid + 1)' },
    { id: 'minimax-guarantee', label: '4. Minimax Optimality', detail: 'Monotonic feasibility (True ... True, False ... False) guarantees finding the global maximum minimum distance' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Binary Search on Max-Min Distance
// Time Complexity: O(N log N + N log(max - min)) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
private:
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

public:
    int aggressiveCows(vector<int>& stalls, int k) {
        sort(stalls.begin(), stalls.end());
        int low = 1;
        int high = stalls.back() - stalls[0];
        int ans = 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (canWePlace(stalls, mid, k)) {
                ans = mid;      // Gap works, try larger distance
                low = mid + 1;
            } else {
                high = mid - 1; // Gap too large, shrink distance
            }
        }
        return ans;
    }
};`,
  python: `# Python 3 Optimal Binary Search on Max-Min Distance
# Time Complexity: O(N log N + N log(max - min)) | Space Complexity: O(1)
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

        low = 1
        high = stalls[-1] - stalls[0]
        ans = 1

        while low <= high:
            mid = (low + high) // 2
            if can_we_place(mid):
                ans = mid
                low = mid + 1
            else:
                high = mid - 1

        return ans`,
  java: `// Java Optimal Binary Search on Max-Min Distance
// Time Complexity: O(N log N + N log(max - min)) | Space Complexity: O(1)
import java.util.Arrays;

class Solution {
    private boolean canWePlace(int[] stalls, int dist, int cows) {
        int countCows = 1;
        int lastStall = stalls[0];

        for (int i = 1; i < stalls.length; i++) {
            if (stalls[i] - lastStall >= dist) {
                countCows++;
                lastStall = stalls[i];
            }
            if (countCows >= cows) return true;
        }
        return false;
    }

    public int aggressiveCows(int[] stalls, int k) {
        Arrays.sort(stalls);
        int low = 1;
        int high = stalls[stalls.length - 1] - stalls[0];
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
  javascript: `// JavaScript Optimal Binary Search on Max-Min Distance
// Time Complexity: O(N log N + N log(max - min)) | Space Complexity: O(1)
var aggressiveCows = function(stalls, k) {
    stalls.sort((a, b) => a - b);
    let low = 1;
    let high = stalls[stalls.length - 1] - stalls[0];
    let ans = 1;

    const canWePlace = (dist) => {
        let count = 1;
        let last = stalls[0];
        for (let i = 1; i < stalls.length; i++) {
            if (stalls[i] - last >= dist) {
                count++;
                last = stalls[i];
                if (count >= k) return true;
            }
        }
        return false;
    };

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
    title: '1. Setup & Stall Sorting: stalls = [1, 2, 8, 4, 9] -> Sorted [1, 2, 4, 8, 9], K = 3 Cows',
    phase: 'SETUP',
    track: {
      label: 'Sorted Stalls Positions',
      items: [1, 2, 4, 8, 9]
    },
    auxiliaryTrack: {
      label: 'Distance Gap Search Domain [1 ... 8]',
      items: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 7,
    metrics: [
      { label: 'Stall Count N', value: '5 stalls' },
      { label: 'Cows to Place K', value: '3 cows' },
      { label: 'Min Gap low', value: '1 unit' },
      { label: 'Max Gap high', value: '8 units (9 - 1)' }
    ],
    variables: { k: 3, low: 1, high: 8, ans: 1, sortedStalls: '[1, 2, 4, 8, 9]' },
    formula: 'Objective: Maximize the minimum distance between any 2 cows',
    action: 'Sort stalls in O(N log N); initialize binary search domain for distance [1 .. 8]',
    explain: 'We must position 3 cows in stalls [1, 2, 4, 8, 9] such that the minimum distance between any two cows is as large as possible. Minimum distance is 1; maximum distance is 9 - 1 = 8.',
    intuition: 'Sorting converts the 1D geometry into a monotonic greedy placement problem.'
  },
  {
    title: '2. Pass 1: Test Distance mid = 4 -> Simulate Greedy Cow Placement',
    phase: 'EVALUATE_DISTANCE',
    track: {
      label: 'Sorted Stalls at Distance Gap >= 4',
      items: [
        { value: '1 (🐮 Cow 1)', status: 'match' },
        { value: '2 (Skip: 2-1 < 4)', status: 'discarded' },
        { value: '4 (Skip: 4-1 < 4)', status: 'discarded' },
        { value: '8 (🐮 Cow 2: 8-1 >= 4)', status: 'match' },
        { value: '9 (Skip: 9-8 < 4)', status: 'discarded' }
      ]
    },
    auxiliaryTrack: {
      label: 'Placed Cows at Gap >= 4: [Stall 1, Stall 8]',
      items: [
        { value: '🐮 Cow 1 @ Stall 1', status: 'match' },
        { value: '🐮 Cow 2 @ Stall 8', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Testing Gap', value: '4 units', highlight: true },
      { label: 'Cows Placed', value: '2 cows', highlight: true },
      { label: 'Required Cows K', value: '3 cows' },
      { label: 'Feasibility', value: '2 < 3 (CANNOT PLACE)' }
    ],
    variables: { dist: 4, cowsPlaced: 2, requiredK: 3, feasible: false },
    formula: 'Cow 1 @ 1, Cow 2 @ 8 (gap 7 >= 4) ==> Total cows placed = 2 < 3',
    action: 'Simulate greedy placement at gap >= 4: only 2 cows can be placed',
    explain: 'At gap 4: Cow 1 placed at stall 1. Stall 2 (gap 1) and stall 4 (gap 3) are too close. Cow 2 placed at stall 8 (gap 7 >= 4). Stall 9 (gap 1) is too close. Only 2 cows placed, but we need 3.',
    intuition: 'A gap of 4 is too wide to fit 3 cows.'
  },
  {
    title: '3. Pass 1 Decision: 2 < 3 (Gap Too Large!) -> Discard [4 ... 8] -> high = 3',
    phase: 'GAP_TOO_LARGE',
    track: {
      label: 'Sorted Stalls Positions',
      items: [1, 2, 4, 8, 9]
    },
    auxiliaryTrack: {
      label: 'Distance Gap Search Domain Timeline',
      items: [
        1, 2, 3,
        { value: 4, status: 'discarded' },
        { value: 5, status: 'discarded' },
        { value: 6, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 8, status: 'discarded' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'Verdict', value: 'Gap 4 Too Large', highlight: true },
      { label: 'Discarded Gaps', value: '[4 ... 8]' },
      { label: 'New Search Domain', value: '[1 ... 3] units' },
      { label: 'high updated to', value: 'mid - 1 = 3' }
    ],
    variables: { low: 1, high: 3, ans: 1, action: 'high = mid - 1 = 3' },
    formula: 'canWePlace(4) == false ==> high = mid - 1 = 3',
    action: 'Discard distances >= 4; decrement high to 3',
    explain: 'Because gap 4 fails, any gap >= 4 will also fail. We eliminate [4..8] and search smaller distances [1..3].',
    intuition: 'Narrowing the upper limit of distance.'
  },
  {
    title: '4. Pass 2: Test Distance mid = 2 -> Simulate Greedy Cow Placement',
    phase: 'EVALUATE_DISTANCE',
    track: {
      label: 'Sorted Stalls at Distance Gap >= 2',
      items: [
        { value: '1 (🐮 Cow 1)', status: 'match' },
        { value: '2 (Skip: 2-1 < 2)', status: 'discarded' },
        { value: '4 (🐮 Cow 2: 4-1 >= 2)', status: 'match' },
        { value: '8 (🐮 Cow 3: 8-4 >= 2)', status: 'match' },
        { value: '9', status: 'current' }
      ]
    },
    auxiliaryTrack: {
      label: 'Placed Cows at Gap >= 2: [Stall 1, Stall 4, Stall 8]',
      items: [
        { value: '🐮 Cow 1 @ 1', status: 'match' },
        { value: '🐮 Cow 2 @ 4 (gap 3)', status: 'match' },
        { value: '🐮 Cow 3 @ 8 (gap 4)', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'Testing Gap', value: '2 units', highlight: true },
      { label: 'Cows Placed', value: '3 cows', highlight: true },
      { label: 'Required Cows K', value: '3 cows' },
      { label: 'Feasibility', value: '3 >= 3 (SUCCESS)' }
    ],
    variables: { dist: 2, cowsPlaced: 3, requiredK: 3, feasible: true },
    formula: 'Cow 1 @ 1, Cow 2 @ 4 (gap 3 >= 2), Cow 3 @ 8 (gap 4 >= 2) ==> 3 cows placed',
    action: 'Simulate greedy placement at gap >= 2: all 3 cows placed successfully',
    explain: 'At gap 2: Cow 1 at stall 1; Cow 2 at stall 4 (gap 3 >= 2); Cow 3 at stall 8 (gap 4 >= 2). All 3 cows are placed safely!',
    intuition: 'Gap 2 is feasible! Now explore if an even larger gap can be achieved.'
  },
  {
    title: '5. Pass 2 Decision: 3 >= 3 (Feasible!) -> Record ans = 2, Search [3 ... 3]',
    phase: 'FEASIBLE_CANDIDATE',
    track: {
      label: 'Sorted Stalls Positions',
      items: [1, 2, 4, 8, 9]
    },
    auxiliaryTrack: {
      label: 'Distance Gap Search Domain Timeline',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'match' },
        3,
        { value: 4, status: 'discarded' },
        { value: 5, status: 'discarded' },
        { value: 6, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 8, status: 'discarded' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 2,
    windowEnd: 2,
    metrics: [
      { label: 'Recorded ans', value: '2 units', highlight: true },
      { label: 'Action', value: 'Try larger gap: low = mid + 1 = 3' },
      { label: 'New Search Domain', value: '[3 ... 3]' }
    ],
    variables: { low: 3, high: 3, ans: 2, action: 'low = mid + 1 = 3' },
    formula: 'canWePlace(2) == true ==> ans = 2, low = mid + 1 = 3',
    action: 'Gap 2 works; save ans = 2 and test larger gap mid = 3',
    explain: 'Because gap 2 is viable and we want to maximize the minimum distance, we save ans = 2 and advance low to 3 to check if gap 3 also works.',
    intuition: 'Greedily stretch the distance between cows.'
  },
  {
    title: '6. Pass 3: Test Distance mid = 3 -> Simulate Greedy Cow Placement',
    phase: 'EVALUATE_DISTANCE',
    track: {
      label: 'Sorted Stalls at Distance Gap >= 3',
      items: [
        { value: '1 (🐮 Cow 1)', status: 'match' },
        { value: '2 (Skip: 2-1 < 3)', status: 'discarded' },
        { value: '4 (🐮 Cow 2: 4-1 >= 3)', status: 'match' },
        { value: '8 (🐮 Cow 3: 8-4 >= 3)', status: 'match' },
        { value: '9', status: 'current' }
      ]
    },
    auxiliaryTrack: {
      label: 'Placed Cows at Gap >= 3: [Stall 1, Stall 4, Stall 8]',
      items: [
        { value: '🐮 Cow 1 @ 1', status: 'match' },
        { value: '🐮 Cow 2 @ 4 (gap 3 >= 3)', status: 'match' },
        { value: '🐮 Cow 3 @ 8 (gap 4 >= 3)', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'Testing Gap', value: '3 units', highlight: true },
      { label: 'Cows Placed', value: '3 cows', highlight: true },
      { label: 'Actual Gaps', value: '3 and 4 (min = 3)', highlight: true },
      { label: 'Status', value: 'FEASIBLE!' }
    ],
    variables: { dist: 3, cowsPlaced: 3, minGap: 3, feasible: true },
    formula: 'Stall 1, Stall 4 (gap 3), Stall 8 (gap 4) ==> min gap = 3 >= 3',
    action: 'Simulate greedy placement at gap >= 3: all 3 cows placed with min distance 3',
    explain: 'At gap 3: Cow 1 at 1; Cow 2 at 4 (distance = 3 >= 3); Cow 3 at 8 (distance = 4 >= 3). Minimum pairwise distance is min(3, 4) = 3. Gap 3 is valid!',
    intuition: 'Distance 3 works cleanly with stalls 1, 4, and 8.'
  },
  {
    title: '7. Pass 3 Decision: Update ans = 3 -> Search Domain Exhausted',
    phase: 'TERMINATION',
    track: {
      label: 'Sorted Stalls Positions',
      items: [1, 2, 4, 8, 9]
    },
    auxiliaryTrack: {
      label: 'Distance Gap Search Domain Timeline',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 3, status: 'match' },
        { value: 4, status: 'discarded' },
        { value: 5, status: 'discarded' },
        { value: 6, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 8, status: 'discarded' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 3,
    windowEnd: 2,
    metrics: [
      { label: 'Final ans', value: '3 units', highlight: true },
      { label: 'low Pointer', value: '4' },
      { label: 'high Pointer', value: '3' },
      { label: 'Loop Status', value: 'TERMINATED' }
    ],
    variables: { low: 4, high: 3, ans: 3, loopTerminated: true },
    formula: 'canWePlace(3) == true ==> ans = 3, low = 4 > high (3) ==> Loop Halts',
    action: 'Update ans = 3; low becomes 4 > high (3); binary search terminates',
    explain: 'Because gap 3 works, ans updates to 3 and low increments to 4. Now low (4) > high (3). The binary search finishes with 3 as the maximum possible minimum distance.',
    intuition: 'The global maximum minimum distance is verified at 3.'
  },
  {
    title: '8. Complexity & Final Result: Max-Min Distance = 3',
    phase: 'COMPLETED',
    track: {
      label: 'Optimal Stall Assignment (Distance = 3)',
      items: [
        { value: 'Stall 1 (🐮)', status: 'match' },
        { value: 'Stall 2 (Empty)', status: 'discarded' },
        { value: 'Stall 4 (🐮)', status: 'match' },
        { value: 'Stall 8 (🐮)', status: 'match' },
        { value: 'Stall 9 (Empty)', status: 'discarded' }
      ]
    },
    auxiliaryTrack: {
      label: 'Pairwise Distances: (4 - 1 = 3), (8 - 4 = 4) -> Minimum Gap = 3',
      items: [
        { value: 'Cow 1 @ 1', status: 'match' },
        { value: 'Gap = 3', status: 'current' },
        { value: 'Cow 2 @ 4', status: 'match' },
        { value: 'Gap = 4', status: 'current' },
        { value: 'Cow 3 @ 8', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Max-Min Distance', value: '3 units', highlight: true },
      { label: 'Stalls Used', value: '[1, 4, 8]' },
      { label: 'Time Complexity', value: 'O(N log N + N log(maxDist))', highlight: true },
      { label: 'Space Complexity', value: 'O(1) Auxiliary', highlight: true }
    ],
    variables: { result: 3, cowsPlaced: 3, stallsChosen: '[1, 4, 8]', timeComplexity: 'O(N log N + N log(maxDist))' },
    formula: 'Maximized Minimum Distance = 3 | Stalls: 1, 4, 8',
    action: 'Algorithm successfully finishes; return optimal gap 3',
    explain: 'Placing the cows at stalls 1, 4, and 8 gives pairwise distances of 3 and 4, achieving a minimum distance of 3. No placement can achieve a minimum distance of 4 or greater.',
    intuition: 'Minimax optimization converted into efficient binary decision testing.'
  }
];

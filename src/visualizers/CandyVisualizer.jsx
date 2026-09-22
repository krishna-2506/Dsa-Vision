// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'Candy (Two-Pass Greedy Distribution)',
  category: 'Greedy Algorithms',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) Auxiliary',
  description: 'Distributes the minimum total candies to children in a line such that each child receives at least 1 candy and children with higher ratings receive more candies than their immediate neighbors.'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'Two-Pass Slope Independence Invariant',
  nodes: [
    { id: 'root', label: 'Two-Pass Greedy Distribution', children: ['base-candies', 'left-neighbor-pass', 'right-neighbor-pass', 'max-envelope', 'complexity'] },
    { id: 'base-candies', label: '1. Baseline Constraint', detail: 'Every child must receive at least 1 candy regardless of rating; initialize allocations to 1.' },
    { id: 'left-neighbor-pass', label: '2. Left-to-Right Forward Slope', detail: 'If ratings[i] > ratings[i-1], child i must have more candies than child i-1: left[i] = left[i-1] + 1; otherwise left[i] = 1.' },
    { id: 'right-neighbor-pass', label: '3. Right-to-Left Backward Slope', detail: 'If ratings[i] > ratings[i+1], child i must have more candies than child i+1: right[i] = right[i+1] + 1; otherwise right[i] = 1.' },
    { id: 'max-envelope', label: '4. Upper Envelope Maxima', detail: 'The minimum candies for child i satisfying both constraints simultaneously is exactly max(left[i], right[i]).' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'Two linear sweeps in O(N) time with O(N) space to record the directional slope vectors.' }
  ]
};

export const solutions = {
  cpp: `// C++ Candy (Two-Pass Greedy)
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size();
        vector<int> left(n, 1);

        // Left-to-right pass
        for (int i = 1; i < n; i++) {
            if (ratings[i] > ratings[i - 1]) {
                left[i] = left[i - 1] + 1;
            }
        }

        // Right-to-left pass & sum accumulation
        int right = 1;
        int total = max(1, left[n - 1]);

        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                right++;
            } else {
                right = 1;
            }
            total += max(left[i], right);
        }

        return total;
    }
};`,
  python: `# Python 3 Candy (Two-Pass Greedy)
# Time Complexity: O(N) | Space Complexity: O(N)
class Solution:
    def candy(self, ratings: list[int]) -> int:
        n = len(ratings)
        left = [1] * n
        right = [1] * n

        # Left-to-right pass
        for i in range(1, n):
            if ratings[i] > ratings[i - 1]:
                left[i] = left[i - 1] + 1

        # Right-to-left pass
        for i in range(n - 2, -1, -1):
            if ratings[i] > ratings[i + 1]:
                right[i] = right[i + 1] + 1

        return sum(max(l, r) for l, r in zip(left, right))`,
  java: `// Java Candy (Two-Pass Greedy)
// Time Complexity: O(N) | Space Complexity: O(N)
import java.util.Arrays;

class Solution {
    public int candy(int[] ratings) {
        int n = ratings.length;
        int[] left = new int[n];
        Arrays.fill(left, 1);

        // Left pass
        for (int i = 1; i < n; i++) {
            if (ratings[i] > ratings[i - 1]) {
                left[i] = left[i - 1] + 1;
            }
        }

        // Right pass
        int right = 1;
        int total = Math.max(1, left[n - 1]);

        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                right++;
            } else {
                right = 1;
            }
            total += Math.max(left[i], right);
        }

        return total;
    }
}`,
  javascript: `// JavaScript Candy (Two-Pass Greedy)
// Time Complexity: O(N) | Space Complexity: O(N)
var candy = function(ratings) {
    const n = ratings.length;
    const left = new Array(n).fill(1);
    const right = new Array(n).fill(1);

    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            left[i] = left[i - 1] + 1;
        }
    }

    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            right[i] = right[i + 1] + 1;
        }
    }

    let total = 0;
    for (let i = 0; i < n; i++) {
        total += Math.max(left[i], right[i]);
    }

    return total;
};`
};

export const steps = [
  {
    title: '1. Setup & Problem Formulation: ratings = [1, 2, 5, 4, 3, 2]',
    phase: 'INITIAL',
    codeLine: 13,
    tracks: [
      {
        label: 'Children Ratings: [1, 2, 5, 4, 3, 2]',
        items: [
          { val: 'r=1', status: 'default' },
          { val: 'r=2', status: 'default' },
          { val: 'r=5', status: 'default' },
          { val: 'r=4', status: 'default' },
          { val: 'r=3', status: 'default' },
          { val: 'r=2', status: 'default' }
        ]
      },
      {
        label: 'Baseline Candies (min 1 each)',
        items: [
          { val: '1', status: 'dim' },
          { val: '1', status: 'dim' },
          { val: '1', status: 'dim' },
          { val: '1', status: 'dim' },
          { val: '1', status: 'dim' },
          { val: '1', status: 'dim' }
        ]
      }
    ],
    activeI: null,
    activePrev: null,
    metrics: [
      { label: 'Children Count', value: '6' },
      { label: 'Minimum Candies', value: '>= 1 each' },
      { label: 'Strategy', value: 'Two-pass: Left + Right slopes' }
    ],
    formula: 'left[i] = 1, right[i] = 1; final[i] = max(left[i], right[i]);',
    action: 'Initialize ratings array and prepare two directional passes to decouple left vs right neighbor dependencies.',
    explain: 'A child can be constrained by both their left neighbor and their right neighbor. Decomposing into two passes resolves circular dependencies.',
    intuition: 'Each child must satisfy the left condition and the right condition; taking the maximum of both ensures both are respected.'
  },
  {
    title: '2. Left-to-Right Pass: Ascending Incline [0..2]',
    phase: 'LEFT_PASS',
    codeLine: 16,
    tracks: [
      {
        label: 'Ratings [1, 2, 5, 4, 3, 2]',
        items: [
          { val: 'r=1', status: 'visited' },
          { val: 'r=2', status: 'current' },
          { val: 'r=5', status: 'match' },
          { val: 'r=4', status: 'default' },
          { val: 'r=3', status: 'default' },
          { val: 'r=2', status: 'default' }
        ]
      },
      {
        label: 'Left Pass Candies: left[]',
        items: [
          { val: '1', status: 'visited' },
          { val: '2', status: 'current' },
          { val: '3', status: 'match' },
          { val: '1', status: 'dim' },
          { val: '1', status: 'dim' },
          { val: '1', status: 'dim' }
        ]
      }
    ],
    activeI: 2,
    activePrev: 1,
    metrics: [
      { label: 'i = 1', value: 'rating 2 > 1 => left[1] = 2' },
      { label: 'i = 2', value: 'rating 5 > 2 => left[2] = 3', highlight: true },
      { label: 'Incline Peak', value: 'Index 2 (Candies = 3)' }
    ],
    formula: 'if (ratings[i] > ratings[i-1]) left[i] = left[i-1] + 1;',
    action: 'Ratings increase from index 0 to 2: 1 -> 2 -> 5. left[1] = 2, left[2] = 3.',
    explain: 'Each step up the slope demands 1 more candy than the preceding child to satisfy the left neighbor rule.',
    intuition: 'Forward pass greedily satisfies left neighbor comparisons.'
  },
  {
    title: '3. Left-to-Right Pass: Descending Slope [3..5]',
    phase: 'LEFT_PASS',
    codeLine: 16,
    tracks: [
      {
        label: 'Ratings [1, 2, 5, 4, 3, 2]',
        items: [
          { val: 'r=1', status: 'visited' },
          { val: 'r=2', status: 'visited' },
          { val: 'r=5', status: 'visited' },
          { val: 'r=4', status: 'current' },
          { val: 'r=3', status: 'current' },
          { val: 'r=2', status: 'current' }
        ]
      },
      {
        label: 'Left Pass Candies Complete: [1, 2, 3, 1, 1, 1]',
        items: [
          { val: '1', status: 'match' },
          { val: '2', status: 'match' },
          { val: '3', status: 'match' },
          { val: '1', status: 'current' },
          { val: '1', status: 'current' },
          { val: '1', status: 'current' }
        ]
      }
    ],
    activeI: 5,
    activePrev: 3,
    metrics: [
      { label: 'Ratings 4, 3, 2', value: 'Each < previous' },
      { label: 'left[3..5]', value: '[1, 1, 1]' },
      { label: 'Left Pass Result', value: '[1, 2, 3, 1, 1, 1]', highlight: true }
    ],
    formula: 'ratings[i] <= ratings[i-1] => left[i] = 1;',
    action: 'Ratings decrease from index 2 to 5: 5 > 4 > 3 > 2. Since ratings[i] <= ratings[i-1], left[i] remains 1.',
    explain: 'Left pass only enforces left-neighbor dominance; it cannot know that ratings are dropping toward a right valley.',
    intuition: 'Right pass will correct the descending slope from the opposite direction.'
  },
  {
    title: '4. Right-to-Left Pass: Backward Ascent [5 -> 4 -> 3]',
    phase: 'RIGHT_PASS',
    codeLine: 24,
    tracks: [
      {
        label: 'Ratings [1, 2, 5, 4, 3, 2]',
        items: [
          { val: 'r=1', status: 'default' },
          { val: 'r=2', status: 'default' },
          { val: 'r=5', status: 'default' },
          { val: 'r=4', status: 'match' },
          { val: 'r=3', status: 'current' },
          { val: 'r=2', status: 'visited' }
        ]
      },
      {
        label: 'Right Pass Candies: right[]',
        items: [
          { val: '1', status: 'dim' },
          { val: '1', status: 'dim' },
          { val: '1', status: 'dim' },
          { val: '3', status: 'match' },
          { val: '2', status: 'current' },
          { val: '1', status: 'visited' }
        ]
      }
    ],
    activeI: 3,
    activePrev: 4,
    metrics: [
      { label: 'i = 5', value: 'right[5] = 1' },
      { label: 'i = 4 (3 > 2)', value: 'right[4] = 2' },
      { label: 'i = 3 (4 > 3)', value: 'right[3] = 3', highlight: true }
    ],
    formula: 'if (ratings[i] > ratings[i+1]) right[i] = right[i+1] + 1;',
    action: 'Scan backward from index 5. Rating 3 > 2 gives right[4] = 2; rating 4 > 3 gives right[3] = 3.',
    explain: 'Moving right to left, ratings climb: 2 < 3 < 4. Each step rightward neighbor requires 1 additional candy.',
    intuition: 'Backward scan handles descending sequences naturally as upward slopes.'
  },
  {
    title: '5. Right-to-Left Pass Peak: i = 2 (Rating 5 > 4) -> right[2] = 4',
    phase: 'RIGHT_PASS',
    codeLine: 24,
    tracks: [
      {
        label: 'Ratings Peak at Index 2',
        items: [
          { val: 'r=1', status: 'default' },
          { val: 'r=2', status: 'default' },
          { val: 'r=5', status: 'current' },
          { val: 'r=4', status: 'visited' },
          { val: 'r=3', status: 'visited' },
          { val: 'r=2', status: 'visited' }
        ]
      },
      {
        label: 'Peak Comparison at Index 2',
        items: [
          { val: '1', status: 'dim' },
          { val: '1', status: 'dim' },
          { val: 'right[2]=4', status: 'current' },
          { val: '3', status: 'visited' },
          { val: '2', status: 'visited' },
          { val: '1', status: 'visited' }
        ]
      }
    ],
    activeI: 2,
    activePrev: 3,
    metrics: [
      { label: 'Rating at i=2', value: '5 > 4 (Child 3)' },
      { label: 'right[2]', value: 'right[3] + 1 = 4', highlight: true },
      { label: 'left[2] was', value: '3' },
      { label: 'Peak Winner', value: 'max(3, 4) = 4', highlight: true }
    ],
    formula: 'right[2] = right[3] + 1 = 3 + 1 = 4;',
    action: 'At peak index 2 (rating 5), right neighbor rating is 4. right[2] becomes 3 + 1 = 4.',
    explain: 'Left pass gave child 2 only 3 candies; but child 2 also heads a length-3 descending tail on the right, demanding 4 candies!',
    intuition: 'A peak must be taller than the longest of its two descending slopes.',
    customCard: {
      title: 'Peak Envelope Resolution',
      rows: [
        { label: 'Left Slope Requirement', value: '3 candies (satisfies child 1)' },
        { label: 'Right Slope Requirement', value: '4 candies (satisfies child 3)', accent: true },
        { label: 'Required for Both', value: 'max(3, 4) = 4 candies', accent: true }
      ]
    }
  },
  {
    title: '6. Complete Right Pass: Indices 1 and 0 Reset to 1',
    phase: 'RIGHT_PASS',
    codeLine: 27,
    tracks: [
      {
        label: 'Ratings [1, 2, 5, 4, 3, 2]',
        items: [
          { val: 'r=1', status: 'match' },
          { val: 'r=2', status: 'match' },
          { val: 'r=5', status: 'match' },
          { val: 'r=4', status: 'match' },
          { val: 'r=3', status: 'match' },
          { val: 'r=2', status: 'match' }
        ]
      },
      {
        label: 'Right Pass Complete: [1, 1, 4, 3, 2, 1]',
        items: [
          { val: '1', status: 'match' },
          { val: '1', status: 'match' },
          { val: '4', status: 'match' },
          { val: '3', status: 'match' },
          { val: '2', status: 'match' },
          { val: '1', status: 'match' }
        ]
      }
    ],
    activeI: 0,
    activePrev: 1,
    metrics: [
      { label: 'ratings[1] vs ratings[2]', value: '2 < 5 => right[1] = 1' },
      { label: 'ratings[0] vs ratings[1]', value: '1 < 2 => right[0] = 1' },
      { label: 'Right Array', value: '[1, 1, 4, 3, 2, 1]', highlight: true }
    ],
    formula: 'right = [1, 1, 4, 3, 2, 1];',
    action: 'At indices 1 and 0, ratings are smaller than their right neighbors. right[1] = 1, right[0] = 1.',
    explain: 'Right pass is fully computed. We now possess both directional slope arrays.',
    intuition: 'Both independent directional constraints are completely determined.'
  },
  {
    title: '7. Merge Envelopes: final[i] = max(left[i], right[i])',
    phase: 'MERGE',
    codeLine: 31,
    tracks: [
      {
        label: 'Left Vector:  [1, 2, 3, 1, 1, 1]',
        items: [
          { val: '1', status: 'selected' },
          { val: '2', status: 'selected' },
          { val: '3', status: 'selected' },
          { val: '1', status: 'selected' },
          { val: '1', status: 'selected' },
          { val: '1', status: 'selected' }
        ]
      },
      {
        label: 'Final Candies: [1, 2, 4, 3, 2, 1]',
        items: [
          { val: '1', status: 'match' },
          { val: '2', status: 'match' },
          { val: '4', status: 'match' },
          { val: '3', status: 'match' },
          { val: '2', status: 'match' },
          { val: '1', status: 'match' }
        ]
      }
    ],
    activeI: 2,
    activePrev: null,
    metrics: [
      { label: 'max(1, 1)', value: '1' },
      { label: 'max(2, 1)', value: '2' },
      { label: 'max(3, 4)', value: '4 (Peak adjusted)', highlight: true },
      { label: 'max(1, 3)', value: '3' },
      { label: 'max(1, 2)', value: '2' },
      { label: 'max(1, 1)', value: '1' }
    ],
    formula: 'final[i] = max(left[i], right[i]); // [1, 2, 4, 3, 2, 1]',
    action: 'Take element-wise maximum of left and right arrays to produce the minimal valid distribution.',
    explain: 'Notice index 2 receives 4 candies, which satisfies both left neighbor (4 > 2) and right neighbor (4 > 3).',
    intuition: 'The maximum of two valid lower bounds is always the tightest valid bound.'
  },
  {
    title: '8. Sum Final Distribution: 1 + 2 + 4 + 3 + 2 + 1 = 13',
    phase: 'COMPLETED',
    codeLine: 35,
    tracks: [
      {
        label: 'Final Optimal Candy Allocation',
        items: [
          { val: 'c=1', status: 'match' },
          { val: 'c=2', status: 'match' },
          { val: 'c=4', status: 'match' },
          { val: 'c=3', status: 'match' },
          { val: 'c=2', status: 'match' },
          { val: 'c=1', status: 'match' }
        ]
      },
      {
        label: 'Ratings Validation Verified',
        items: [
          { val: 'r=1', status: 'match' },
          { val: 'r=2', status: 'match' },
          { val: 'r=5', status: 'match' },
          { val: 'r=4', status: 'match' },
          { val: 'r=3', status: 'match' },
          { val: 'r=2', status: 'match' }
        ]
      }
    ],
    activeI: null,
    activePrev: null,
    metrics: [
      { label: 'Total Candies', value: '13', highlight: true },
      { label: 'Children Satisfied', value: '6 / 6' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(N) (or O(1) space slope)' }
    ],
    formula: 'return sum(final); // 13 candies',
    action: 'Sum all elements: 1 + 2 + 4 + 3 + 2 + 1 = 13. Return 13.',
    explain: 'Every child gets at least 1 candy, and all neighbor inequalities are strictly satisfied with minimum total candies.',
    intuition: 'Two passes linear time solves arbitrary peak and valley structures with zero ambiguity.',
    customCard: {
      title: 'Candy Distribution Verification',
      rows: [
        { label: 'Total Candies Needed', value: '13', accent: true },
        { label: 'Invariants', value: 'c[i] >= 1 and c[i] > c[neighbor] when r[i] > r[neighbor]' },
        { label: 'Complexity', value: 'O(N) time, O(N) space', accent: true }
      ]
    }
  }
];

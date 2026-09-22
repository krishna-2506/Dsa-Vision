// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Single Element in a Sorted Array (Even-Odd Index Symmetry)',
  category: 'Binary Search',
  difficulty: 'Medium',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the unique non-duplicate element in a sorted array where every other element appears twice using the (even, odd) parity symmetry theorem in O(log N) time.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Even-Odd Symmetry Theorem',
  nodes: [
    { id: 'root', label: 'Index Parity Invariant', children: ['symmetry-rule', 'left-half-rule', 'right-half-rule', 'unique-identification'] },
    { id: 'symmetry-rule', label: '1. Parity Partitioning', detail: 'Before the single element, pairs occupy (even, odd) indices. After the single element, the pattern flips to (odd, even)' },
    { id: 'left-half-rule', label: '2. Left of Single Element', detail: 'If (mid is odd and nums[mid] == nums[mid-1]) or (mid is even and nums[mid] == nums[mid+1]), we are in the left half ==> search right (low = mid + 1)' },
    { id: 'right-half-rule', label: '3. Right of Single Element', detail: 'If the parity condition is violated, we are in the right half ==> search left (high = mid - 1)' },
    { id: 'unique-identification', label: '4. Lone Element Detection', detail: 'If nums[mid] != nums[mid-1] and nums[mid] != nums[mid+1], mid is immediately the single element' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Index-Parity Binary Search
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int singleNonDuplicate(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        if (nums[0] != nums[1]) return nums[0];
        if (nums[n - 1] != nums[n - 2]) return nums[n - 1];

        int low = 1, high = n - 2;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // Check if mid is the single element
            if (nums[mid] != nums[mid - 1] && nums[mid] != nums[mid + 1]) {
                return nums[mid];
            }

            // Before single element: pairs are (even, odd)
            if ((mid % 2 == 1 && nums[mid] == nums[mid - 1]) ||
                (mid % 2 == 0 && nums[mid] == nums[mid + 1])) {
                low = mid + 1; // Left of single, search right
            } else {
                high = mid - 1; // Right of single, search left
            }
        }

        return -1;
    }
};`,
  python: `# Python 3 Optimal Even-Odd Binary Search
# Time Complexity: O(log N) | Space Complexity: O(1)
class Solution:
    def singleNonDuplicate(self, nums: list[int]) -> int:
        n = len(nums)
        if n == 1:
            return nums[0]
        if nums[0] != nums[1]:
            return nums[0]
        if nums[n - 1] != nums[n - 2]:
            return nums[n - 1]

        low, high = 1, n - 2

        while low <= high:
            mid = (low + high) // 2

            if nums[mid] != nums[mid - 1] and nums[mid] != nums[mid + 1]:
                return nums[mid]

            if (mid % 2 == 1 and nums[mid] == nums[mid - 1]) or \
               (mid % 2 == 0 and nums[mid] == nums[mid + 1]):
                low = mid + 1
            else:
                high = mid - 1

        return -1`,
  java: `// Java Optimal Even-Odd Binary Search
// Time Complexity: O(log N) | Space Complexity: O(1)
class Solution {
    public int singleNonDuplicate(int[] nums) {
        int n = nums.length;
        if (n == 1) return nums[0];
        if (nums[0] != nums[1]) return nums[0];
        if (nums[n - 1] != nums[n - 2]) return nums[n - 1];

        int low = 1, high = n - 2;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] != nums[mid - 1] && nums[mid] != nums[mid + 1]) {
                return nums[mid];
            }

            if ((mid % 2 == 1 && nums[mid] == nums[mid - 1]) ||
                (mid % 2 == 0 && nums[mid] == nums[mid + 1])) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return -1;
    }
}`,
  javascript: `// JavaScript Optimal Even-Odd Binary Search
// Time Complexity: O(log N) | Space Complexity: O(1)
var singleNonDuplicate = function(nums) {
    const n = nums.length;
    if (n === 1) return nums[0];
    if (nums[0] !== nums[1]) return nums[0];
    if (nums[n - 1] !== nums[n - 2]) return nums[n - 1];

    let low = 1, high = n - 2;

    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);

        if (nums[mid] !== nums[mid - 1] && nums[mid] !== nums[mid + 1]) {
            return nums[mid];
        }

        if ((mid % 2 === 1 && nums[mid] === nums[mid - 1]) ||
            (mid % 2 === 0 && nums[mid] === nums[mid + 1])) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: nums = [1, 1, 2, 3, 3, 4, 4, 8, 8], Search [1..7]',
    phase: 'SETUP',
    track: {
      label: 'Sorted Array with One Unique Element',
      items: [1, 1, 2, 3, 3, 4, 4, 8, 8],
      pointers: [
        { index: 1, label: 'low' },
        { index: 7, label: 'high' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 1,
    windowEnd: 7,
    metrics: [
      { label: 'Array Size N', value: '9' },
      { label: 'low', value: '1' },
      { label: 'high', value: '7' },
      { label: 'Boundary Checked', value: 'nums[0]==nums[1], nums[7]==nums[8]' }
    ],
    variables: { low: 1, high: 7, array: '[1, 1, 2, 3, 3, 4, 4, 8, 8]' },
    formula: 'Left of single: pairs are (even, odd) | Right of single: pairs flip to (odd, even)',
    action: 'Check boundaries 0 and N-1, then initialize internal search range: low = 1, high = N - 2 = 7',
    explain: 'Every number appears twice except one unique number. Checking indices 0 and N-1 allows binary search to safely evaluate mid - 1 and mid + 1 without out-of-bounds guards.',
    intuition: 'The single element disrupts the alternating (even, odd) pairing symmetry for the rest of the array.'
  },
  {
    title: '2. Pass 1: mid = 4 (val 3) [Even Index], Check Neighbors',
    phase: 'CHECK_MID',
    track: {
      label: 'Sorted Array with One Unique Element',
      items: [
        1, 1, 2,
        { value: 3, status: 'current' },
        { value: 3, status: 'match' },
        4, 4, 8, 8
      ],
      pointers: [
        { index: 1, label: 'low' },
        { index: 4, label: 'mid (even)' },
        { index: 7, label: 'high' }
      ]
    },
    activeI: 4,
    activeJ: null,
    windowStart: 1,
    windowEnd: 7,
    metrics: [
      { label: 'mid Index', value: '4 (Even)' },
      { label: 'nums[mid]', value: '3' },
      { label: 'Left Neighbor', value: 'nums[3] = 3' },
      { label: 'Right Neighbor', value: 'nums[5] = 4' }
    ],
    variables: { mid: 4, isEven: true, 'nums[mid]': 3, 'nums[mid-1]': 3, isSingle: false },
    formula: 'nums[4] == nums[3] (3 == 3) ==> mid is NOT the single element',
    action: 'mid = 4 has matching neighbor at mid - 1 (idx 3). It is part of a duplicate pair',
    explain: 'At index 4, nums[4] = 3 matches nums[3] = 3. Thus index 4 is not the unique element. We examine the pair\'s index alignment.',
    intuition: 'Pair (3, 4) contains duplicate 3s. Let\'s check whether the pair follows the pre-single or post-single pattern.'
  },
  {
    title: '3. Parity Alignment: Pair (idx 3, 4) is (Odd, Even) => We Are in Right Partition!',
    phase: 'PARITY_CHECK',
    track: {
      label: 'Sorted Array with One Unique Element',
      items: [
        1, 1, 2,
        { value: 3, status: 'current' },
        { value: 3, status: 'current' },
        4, 4, 8, 8
      ],
      pointers: [
        { index: 1, label: 'low' },
        { index: 4, label: 'mid' },
        { index: 7, label: 'high' }
      ]
    },
    activeI: 3,
    activeJ: 4,
    windowStart: 1,
    windowEnd: 7,
    metrics: [
      { label: 'Pair Indices', value: '(3, 4) = (Odd, Even)', highlight: true },
      { label: 'Pre-Single Rule', value: '(Even, Odd)' },
      { label: 'Observed Pattern', value: 'Flipped to (Odd, Even)' },
      { label: 'Deduction', value: 'Single element is to the LEFT' }
    ],
    variables: { pairIndices: '[3, 4]', parity: '(odd, even)', region: 'Right of single element' },
    formula: 'mid is even and nums[mid] == nums[mid-1] ==> Flipped pattern! Single element is to the left',
    action: 'Pattern is (odd, even). The shift has already occurred! Single element lies to the left of mid',
    explain: 'Before the single element, pairs always start at even indices: (0,1), (2,3), etc. Here, pair 3 starts at odd index 3 and ends at even index 4. The parity has already flipped, which proves the single element occurred before index 3!',
    intuition: 'Because the disruption happened before index 3, we must search left.'
  },
  {
    title: '4. Discard Right Half: high = mid - 1 = 3 (Window [1..3])',
    phase: 'DISCARD_HALF',
    track: {
      label: 'Sorted Array with One Unique Element',
      items: [
        1, 1, 2, 3,
        { value: 3, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 8, status: 'discarded' },
        { value: 8, status: 'discarded' }
      ],
      pointers: [
        { index: 1, label: 'low' },
        { index: 3, label: 'high' }
      ]
    },
    activeI: 1,
    activeJ: 3,
    windowStart: 1,
    windowEnd: 3,
    metrics: [
      { label: 'low', value: '1' },
      { label: 'high', value: '3' },
      { label: 'Active Window', value: '[1..3] ([1, 2, 3])' },
      { label: 'Discarded', value: 'Indices [4..7]' }
    ],
    variables: { low: 1, high: 3, activeSlice: '[1, 2, 3]' },
    formula: 'high = mid - 1 = 4 - 1 = 3; Search space: nums[1 .. 3]',
    action: 'Discard right half (indices 4..7). Search space contracted to [1..3]',
    explain: 'We know the single element is to the left of mid. We update high = mid - 1 = 3. Search range is now [1..3].',
    intuition: 'The single element is narrowed down to 3 candidates: indices 1, 2, or 3.'
  },
  {
    title: '5. Pass 2: mid = 2 (val 2) [Even Index], Check Neighbors',
    phase: 'CHECK_MID',
    track: {
      label: 'Sorted Array with One Unique Element',
      items: [
        { value: 1, status: 'current' },
        { value: 1, status: 'current' },
        { value: 2, status: 'match' },
        { value: 3, status: 'current' },
        { value: 3, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 8, status: 'discarded' },
        { value: 8, status: 'discarded' }
      ],
      pointers: [
        { index: 1, label: 'low' },
        { index: 2, label: 'mid (val 2)' },
        { index: 3, label: 'high' }
      ]
    },
    activeI: 2,
    activeJ: null,
    windowStart: 1,
    windowEnd: 3,
    metrics: [
      { label: 'mid Index', value: '2' },
      { label: 'nums[mid]', value: '2' },
      { label: 'nums[mid-1]', value: 'nums[1] = 1 (!= 2)' },
      { label: 'nums[mid+1]', value: 'nums[3] = 3 (!= 2)' }
    ],
    variables: { mid: 2, 'nums[mid]': 2, 'nums[mid-1]': 1, 'nums[mid+1]': 3, isLone: true },
    formula: 'nums[mid] != nums[mid-1] && nums[mid] != nums[mid+1] (2 != 1 && 2 != 3)',
    action: 'Both neighbors differ from nums[mid] = 2. Element 2 is the unique single element!',
    explain: 'At mid = 2, nums[mid] = 2. Its left neighbor nums[1] is 1, and its right neighbor nums[3] is 3. Since neither neighbor matches 2, index 2 is definitively the single element!',
    intuition: 'A unique element has zero duplicate neighbors.'
  },
  {
    title: '6. Single Element Confirmed: Return nums[2] = 2',
    phase: 'MATCH_FOUND',
    track: {
      label: 'Sorted Array with One Unique Element',
      items: [
        1, 1,
        { value: 2, status: 'match' },
        3, 3, 4, 4, 8, 8
      ],
      pointers: [
        { index: 2, label: 'Single Element (2)' }
      ]
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Single Element', value: '2', highlight: true },
      { label: 'Index', value: '2' },
      { label: 'Comparisons Made', value: '2' }
    ],
    variables: { singleElement: 2, index: 2, status: 'Discovered in 2 iterations' },
    formula: 'return nums[mid]; // return 2',
    action: 'Return 2. Unique element discovered in O(log N) steps.',
    explain: 'The function immediately returns nums[2] = 2. Parity testing accurately isolated the lone element in just 2 iterations.',
    intuition: 'Index parity symmetry turns an O(N) linear scan into an optimal O(log N) binary search.'
  },
  {
    title: '7. Symmetry Verification: Pre-Single vs Post-Single Alignment',
    phase: 'VERIFICATION',
    track: {
      label: 'Parity Symmetry Map',
      items: [
        { value: 1, status: 'current' },
        { value: 1, status: 'current' },
        { value: 2, status: 'match' },
        { value: 3, status: 'current' },
        { value: 3, status: 'current' },
        { value: 4, status: 'current' },
        { value: 4, status: 'current' },
        { value: 8, status: 'current' },
        { value: 8, status: 'current' }
      ],
      pointers: [
        { index: 2, label: 'Pivot: 2' }
      ]
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Before 2 (idx 0..1)', value: '(even, odd) = (0, 1) [1, 1]' },
      { label: 'Pivot (idx 2)', value: 'Single Element = 2', highlight: true },
      { label: 'After 2 (idx 3..8)', value: '(odd, even) = (3, 4), (5, 6), (7, 8)' }
    ],
    variables: {
      prePairs: '(0,1)->1',
      pivot: 'idx 2 -> 2',
      postPairs: '(3,4)->3, (5,6)->4, (7,8)->8'
    },
    formula: 'Parity invariant holds across the entire array structure',
    action: 'Demonstrate global parity integrity before and after the single element',
    explain: 'Notice that indices 0 and 1 form pair [1, 1] (even, odd). At index 2, element 2 sits alone. From index 3 onwards, all pairs are (odd, even): (3,4) for 3, (5,6) for 4, and (7,8) for 8.',
    intuition: 'The mathematical parity invariant is completely consistent.'
  },
  {
    title: '8. Completed: O(log N) Time & O(1) Auxiliary Space Verified',
    phase: 'COMPLETED',
    track: {
      label: 'Final Array with Highlighted Single Element',
      items: [
        1, 1,
        { value: 2, status: 'match' },
        3, 3, 4, 4, 8, 8
      ],
      pointers: []
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Result', value: '2', highlight: true },
      { label: 'Time Complexity', value: 'O(log N)' },
      { label: 'Space Complexity', value: 'O(1) In-Place' }
    ],
    variables: {
      timeComplexity: 'O(log N)',
      spaceComplexity: 'O(1)',
      method: 'Even-Odd Symmetry Binary Search'
    },
    formula: 'T(N) = T(N/2) + O(1) ==> O(log N)',
    action: 'Algorithm complete. Optimal logarithmic search executed.',
    explain: 'Even-odd parity binary search identifies the single non-duplicate element in O(log N) time with O(1) auxiliary space, strictly outperforming the O(N) XOR or hash-set approaches.',
    intuition: 'Leveraging sorted order and index parity unlocks logarithmic time for an element-frequency query.'
  }
];

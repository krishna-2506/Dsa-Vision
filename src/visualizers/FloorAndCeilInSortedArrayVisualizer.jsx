// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Floor and Ceil in Sorted Array',
  category: 'Binary Search Basics',
  difficulty: 'Easy',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the Floor (largest element <= X) and Ceil (smallest element >= X) in a sorted array using dual logarithmic binary search passes.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Floor and Ceil Dual Search Invariant',
  nodes: [
    { id: 'root', label: 'Floor & Ceil Strategy', children: ['floor-invariant', 'ceil-invariant', 'sandwich-property', 'complexity-analysis'] },
    { id: 'floor-invariant', label: '1. Floor Search (Largest <= X)', detail: 'If arr[mid] <= X, record floor = arr[mid] and search right (low = mid + 1) for a larger valid floor' },
    { id: 'ceil-invariant', label: '2. Ceil Search (Smallest >= X)', detail: 'If arr[mid] >= X, record ceil = arr[mid] and search left (high = mid - 1) for a tighter ceil (Lower Bound)' },
    { id: 'sandwich-property', label: '3. Sandwich Invariant', detail: 'Guarantees Floor <= X <= Ceil. If X is present, Floor = Ceil = X' },
    { id: 'complexity-analysis', label: '4. Dual O(log N) Execution', detail: 'Two independent binary search passes achieve full interval bounding in O(log N) time and O(1) space' }
  ]
};

export const solutions = {
  cpp: `// C++ Floor and Ceil in Sorted Array
// Time Complexity: 2 * O(log N) = O(log N) | Space Complexity: O(1)
#include <vector>
#include <utility>
using namespace std;

class Solution {
public:
    pair<int, int> getFloorAndCeil(vector<int>& a, int n, int x) {
        int low = 0, high = n - 1;
        int floorVal = -1, ceilVal = -1;

        // Binary search for Floor (largest element <= x)
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (a[mid] <= x) {
                floorVal = a[mid];
                low = mid + 1; // Look for a larger valid floor to the right
            } else {
                high = mid - 1;
            }
        }

        // Binary search for Ceil (smallest element >= x)
        low = 0; high = n - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (a[mid] >= x) {
                ceilVal = a[mid];
                high = mid - 1; // Look for a smaller valid ceil to the left
            } else {
                low = mid + 1;
            }
        }

        return {floorVal, ceilVal};
    }
};`,
  python: `# Python 3 Floor and Ceil in Sorted Array
# Time Complexity: O(log N) | Space Complexity: O(1)
class Solution:
    def getFloorAndCeil(self, a: list[int], n: int, x: int) -> tuple[int, int]:
        # Floor: largest <= x
        low, high = 0, n - 1
        floor_val = -1
        while low <= high:
            mid = (low + high) // 2
            if a[mid] <= x:
                floor_val = a[mid]
                low = mid + 1
            else:
                high = mid - 1

        # Ceil: smallest >= x
        low, high = 0, n - 1
        ceil_val = -1
        while low <= high:
            mid = (low + high) // 2
            if a[mid] >= x:
                ceil_val = a[mid]
                high = mid - 1
            else:
                low = mid + 1

        return floor_val, ceil_val`,
  java: `// Java Floor and Ceil in Sorted Array
// Time Complexity: O(log N) | Space Complexity: O(1)
class Solution {
    public int[] getFloorAndCeil(int[] a, int n, int x) {
        int floor = -1, ceil = -1;

        // Floor Search
        int low = 0, high = n - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (a[mid] <= x) {
                floor = a[mid];
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        // Ceil Search
        low = 0; high = n - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (a[mid] >= x) {
                ceil = a[mid];
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        return new int[]{floor, ceil};
    }
}`,
  javascript: `// JavaScript Floor and Ceil in Sorted Array
// Time Complexity: O(log N) | Space Complexity: O(1)
function getFloorAndCeil(a, n, x) {
    let low = 0, high = n - 1;
    let floorVal = -1, ceilVal = -1;

    // Floor search
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (a[mid] <= x) {
            floorVal = a[mid];
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    // Ceil search
    low = 0; high = n - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (a[mid] >= x) {
            ceilVal = a[mid];
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return [floorVal, ceilVal];
}`
};

export const steps = [
  {
    title: '1. Problem Setup: arr = [3, 4, 4, 7, 8, 10], Target X = 5',
    phase: 'SETUP',
    track: {
      label: 'Sorted Array arr',
      items: [3, 4, 4, 7, 8, 10],
      pointers: [
        { index: 0, label: 'low' },
        { index: 5, label: 'high' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 5,
    metrics: [
      { label: 'Target X', value: '5' },
      { label: 'Array Size N', value: '6' },
      { label: 'Floor (largest <= 5)', value: 'None (-1)' },
      { label: 'Ceil (smallest >= 5)', value: 'None (-1)' }
    ],
    variables: { x: 5, floor: -1, ceil: -1, low: 0, high: 5 },
    formula: 'Floor = max(a[i] <= X) | Ceil = min(a[i] >= X)',
    action: 'Initialize dual binary search: start Pass 1 to find Floor',
    explain: 'Target X = 5 does not exist in the array. We must find its tightest enclosing bounds: the largest element <= 5 (Floor) and the smallest element >= 5 (Ceil).',
    intuition: 'Sorting allows independent logarithmic bounding for both floor and ceiling.'
  },
  {
    title: '2. Floor Pass 1: mid = 2 (val 4) -> 4 <= 5 (Valid Floor!) -> Record floor = 4',
    phase: 'FLOOR_SEARCH',
    track: {
      label: 'Sorted Array arr (Floor Search)',
      items: [
        3, 4,
        { value: 4, status: 'match' },
        7, 8, 10
      ],
      pointers: [
        { index: 0, label: 'low' },
        { index: 2, label: 'mid' },
        { index: 5, label: 'high' }
      ]
    },
    activeI: 2,
    activeJ: null,
    windowStart: 0,
    windowEnd: 5,
    metrics: [
      { label: 'Active Pass', value: 'Floor Search' },
      { label: 'arr[mid]', value: '4', highlight: true },
      { label: 'Comparison', value: '4 <= 5 (FEASIBLE)' },
      { label: 'Recorded floor', value: '4', highlight: true }
    ],
    variables: { pass: 'Floor', mid: 2, 'arr[mid]': 4, floor: 4, action: 'low = mid + 1 = 3' },
    formula: 'arr[mid] <= X (4 <= 5) ==> floor = 4, low = mid + 1 = 3',
    action: '4 is a valid floor; save floor = 4 and search right for potentially larger elements <= 5',
    explain: 'At mid = 2, arr[2] = 4 <= 5. 4 is a valid floor. To see if an even larger value <= 5 exists in the right subarray, we advance low to 3.',
    intuition: 'Greedily search right for a larger floor candidate.'
  },
  {
    title: '3. Floor Pass 2: mid = 4 (val 8) -> 8 > 5 (Too Large!) -> Discard [4 ... 5]',
    phase: 'FLOOR_SEARCH',
    track: {
      label: 'Sorted Array arr (Floor Search)',
      items: [
        { value: 3, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 4, status: 'match' },
        7,
        { value: 8, status: 'current' },
        10
      ],
      pointers: [
        { index: 3, label: 'low' },
        { index: 4, label: 'mid' },
        { index: 5, label: 'high' }
      ]
    },
    activeI: 4,
    activeJ: null,
    windowStart: 3,
    windowEnd: 5,
    metrics: [
      { label: 'Active Pass', value: 'Floor Search' },
      { label: 'arr[mid]', value: '8', highlight: true },
      { label: 'Comparison', value: '8 > 5 (Too Large)' },
      { label: 'high updated to', value: 'mid - 1 = 3' }
    ],
    variables: { pass: 'Floor', mid: 4, 'arr[mid]': 8, floor: 4, action: 'high = mid - 1 = 3' },
    formula: 'arr[mid] > X (8 > 5) ==> high = mid - 1 = 3',
    action: '8 exceeds 5; discard 8 and 10; decrement high to 3',
    explain: 'At mid = 4, arr[4] = 8 > 5. Since 8 is too large to be a floor, we eliminate [4..5] and set high = 3.',
    intuition: 'Discard all elements greater than target.'
  },
  {
    title: '4. Floor Pass 3 & Lock: mid = 3 (val 7) > 5 -> Final Floor = 4 Confirmed!',
    phase: 'FLOOR_LOCKED',
    track: {
      label: 'Sorted Array arr (Floor Confirmed)',
      items: [
        { value: 3, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 4, status: 'match' },
        { value: 7, status: 'discarded' },
        { value: 8, status: 'discarded' },
        { value: 10, status: 'discarded' }
      ],
      pointers: [
        { index: 2, label: 'Floor = 4' }
      ]
    },
    activeI: 2,
    activeJ: null,
    windowStart: 3,
    windowEnd: 2,
    metrics: [
      { label: 'Floor Search', value: 'TERMINATED' },
      { label: 'Final Floor Result', value: '4', highlight: true },
      { label: 'Next Pass', value: 'Reset for Ceil Search' }
    ],
    variables: { floorResult: 4, nextPass: 'Ceil Search' },
    formula: 'arr[3] = 7 > 5 ==> high = 2 < low (3) ==> Floor = 4 locked',
    action: 'Floor search completes with floor = 4; reset pointers to [0..5] for Ceil search',
    explain: 'At mid = 3, arr[3] = 7 > 5, so high becomes 2. low (3) > high (2) terminates the floor pass. The maximum element <= 5 in the array is definitively 4.',
    intuition: 'Floor is locked; now find Ceil.'
  },
  {
    title: '5. Ceil Pass 1: mid = 2 (val 4) -> 4 < 5 (Too Small!) -> Advance low = 3',
    phase: 'CEIL_SEARCH',
    track: {
      label: 'Sorted Array arr (Ceil Search)',
      items: [
        3, 4,
        { value: 4, status: 'current' },
        7, 8, 10
      ],
      pointers: [
        { index: 0, label: 'low' },
        { index: 2, label: 'mid' },
        { index: 5, label: 'high' }
      ]
    },
    activeI: 2,
    activeJ: null,
    windowStart: 0,
    windowEnd: 5,
    metrics: [
      { label: 'Active Pass', value: 'Ceil Search (arr[i] >= 5)' },
      { label: 'arr[mid]', value: '4', highlight: true },
      { label: 'Comparison', value: '4 < 5 (Too Small)' },
      { label: 'low updated to', value: 'mid + 1 = 3' }
    ],
    variables: { pass: 'Ceil', mid: 2, 'arr[mid]': 4, ceil: -1, action: 'low = mid + 1 = 3' },
    formula: 'arr[mid] < X (4 < 5) ==> low = mid + 1 = 3',
    action: '4 is strictly less than 5; cannot be Ceil; eliminate left half [0..2]',
    explain: 'We now seek the smallest element >= 5 (Ceil). At mid = 2, arr[2] = 4 < 5. Indices 0 through 2 are all < 5 and cannot serve as Ceil. We advance low to 3.',
    intuition: 'Ceil must be greater than or equal to target.'
  },
  {
    title: '6. Ceil Pass 2: mid = 4 (val 8) -> 8 >= 5 (Valid Ceil!) -> Record ceil = 8',
    phase: 'CEIL_SEARCH',
    track: {
      label: 'Sorted Array arr (Ceil Search)',
      items: [
        { value: 3, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 4, status: 'discarded' },
        7,
        { value: 8, status: 'match' },
        10
      ],
      pointers: [
        { index: 3, label: 'low' },
        { index: 4, label: 'mid' },
        { index: 5, label: 'high' }
      ]
    },
    activeI: 4,
    activeJ: null,
    windowStart: 3,
    windowEnd: 5,
    metrics: [
      { label: 'Active Pass', value: 'Ceil Search' },
      { label: 'arr[mid]', value: '8', highlight: true },
      { label: 'Comparison', value: '8 >= 5 (FEASIBLE)' },
      { label: 'Recorded ceil', value: '8', highlight: true }
    ],
    variables: { pass: 'Ceil', mid: 4, 'arr[mid]': 8, ceil: 8, action: 'high = mid - 1 = 3' },
    formula: 'arr[mid] >= X (8 >= 5) ==> ceil = 8, high = mid - 1 = 3',
    action: '8 is a valid ceil; save ceil = 8 and check left for a smaller element >= 5',
    explain: 'At mid = 4, arr[4] = 8 >= 5. 8 is a valid ceiling. To check if an even smaller value >= 5 exists, we record ceil = 8 and set high = 3.',
    intuition: 'Greedily search left for a tighter ceiling candidate.'
  },
  {
    title: '7. Ceil Pass 3 & Lock: mid = 3 (val 7) -> 7 >= 5 -> Tighter ceil = 7 Confirmed!',
    phase: 'CEIL_LOCKED',
    track: {
      label: 'Sorted Array arr (Ceil Confirmed)',
      items: [
        { value: 3, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 4, status: 'discarded' },
        { value: 7, status: 'match' },
        { value: 8, status: 'discarded' },
        { value: 10, status: 'discarded' }
      ],
      pointers: [
        { index: 3, label: 'Ceil = 7' }
      ]
    },
    activeI: 3,
    activeJ: null,
    windowStart: 3,
    windowEnd: 3,
    metrics: [
      { label: 'arr[mid]', value: '7', highlight: true },
      { label: 'Comparison', value: '7 >= 5 and 7 < 8 (TIGHTER)' },
      { label: 'Updated ceil', value: '7', highlight: true },
      { label: 'Ceil Status', value: 'LOCKED' }
    ],
    variables: { mid: 3, 'arr[mid]': 7, ceil: 7, loopTerminated: true },
    formula: 'arr[3] = 7 >= 5 ==> ceil = 7, high = 2 < low (3) ==> Ceil = 7 locked',
    action: '7 is strictly smaller than 8; update ceil = 7; search terminates',
    explain: 'At mid = 3, arr[3] = 7 >= 5. 7 is a tighter ceiling than 8! We update ceil = 7 and decrement high to 2. Since low (3) > high (2), Ceil search concludes.',
    intuition: 'Smallest element >= 5 is confirmed at 7.'
  },
  {
    title: '8. Synthesis & Invariant Guarantee: Floor = 4, Ceil = 7',
    phase: 'COMPLETED',
    track: {
      label: 'Sorted Array arr with Enclosing Bounds',
      items: [
        3, 4,
        { value: 4, status: 'match' },
        { value: 7, status: 'match' },
        8, 10
      ],
      pointers: [
        { index: 2, label: 'Floor (4)' },
        { index: 3, label: 'Ceil (7)' }
      ]
    },
    activeI: 2,
    activeJ: 3,
    windowStart: 2,
    windowEnd: 3,
    metrics: [
      { label: 'Floor Result', value: '4', highlight: true },
      { label: 'Target X', value: '5' },
      { label: 'Ceil Result', value: '7', highlight: true },
      { label: 'Sandwich Relation', value: '4 <= 5 <= 7 (Valid Bound)' }
    ],
    variables: { floor: 4, x: 5, ceil: 7, timeComplexity: '2 * O(log N) = O(log N)', spaceComplexity: 'O(1)' },
    formula: 'Floor (4) <= Target (5) <= Ceil (7) | O(log N) time and O(1) space',
    action: 'Both boundaries resolved successfully: return {floor: 4, ceil: 7}',
    explain: 'Dual binary search computed both the tightest lower bound and upper bound enclosing target 5 in logarithmic time. Total time complexity is 2 * O(log N) = O(log N) with zero extra memory allocated.',
    intuition: 'Floor and Ceil perfectly bracket any target value in a sorted sequence.'
  }
];

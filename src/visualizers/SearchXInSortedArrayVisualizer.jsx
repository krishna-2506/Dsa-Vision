// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Binary Search (Search X in Sorted Array)',
  category: 'Binary Search',
  difficulty: 'Easy',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Searches for a target value X in a sorted array by repeatedly halving the search interval using low, mid, and high pointers.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Binary Search Halving Principle',
  nodes: [
    { id: 'root', label: 'Binary Search Strategy', children: ['sorted-invariant', 'mid-calculation', 'range-elimination', 'termination'] },
    { id: 'sorted-invariant', label: '1. Sorted Precondition', detail: 'Array must be monotonic: arr[0] <= arr[1] <= ... <= arr[N-1]' },
    { id: 'mid-calculation', label: '2. Overflow-Safe Midpoint', detail: 'mid = low + (high - low) / 2 prevents integer overflow in fixed-width types' },
    { id: 'range-elimination', label: '3. Divide and Discard', detail: 'If arr[mid] < X, discard left half (low = mid + 1); if arr[mid] > X, discard right half (high = mid - 1)' },
    { id: 'termination', label: '4. Termination Bound', detail: 'Loop while low <= high. If arr[mid] == X return mid; if pointers cross return -1' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Iterative Binary Search
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid; // Target found!
            } else if (nums[mid] < target) {
                low = mid + 1; // Target lies in right half
            } else {
                high = mid - 1; // Target lies in left half
            }
        }
        return -1; // Target not found
    }
};`,
  python: `# Python 3 Optimal Binary Search
# Time Complexity: O(log N) | Space Complexity: O(1)
class Solution:
    def search(self, nums: list[int], target: int) -> int:
        low, high = 0, len(nums) - 1

        while low <= high:
            mid = low + (high - low) // 2
            
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
                
        return -1`,
  java: `// Java Optimal Binary Search
// Time Complexity: O(log N) | Space Complexity: O(1)
class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }
}`,
  javascript: `// JavaScript Optimal Binary Search
// Time Complexity: O(log N) | Space Complexity: O(1)
var search = function(nums, target) {
    let low = 0, high = nums.length - 1;

    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
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
    title: '1. Initialize Range: low = 0, high = 9 (Target X = 14)',
    phase: 'SETUP',
    track: {
      label: 'Sorted Array nums',
      items: [2, 3, 7, 10, 13, 14, 17, 22, 29, 35],
      pointers: [
        { index: 0, label: 'low' },
        { index: 9, label: 'high' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 9,
    metrics: [
      { label: 'Target X', value: '14' },
      { label: 'low', value: '0' },
      { label: 'high', value: '9' },
      { label: 'Window Size', value: '10 elements' }
    ],
    variables: { low: 0, high: 9, target: 14, window: '[0..9]' },
    formula: 'Search Space: nums[low .. high] = nums[0 .. 9]',
    action: 'Initialize search pointers: low = 0, high = nums.length - 1',
    explain: 'Binary Search operates on a sorted array. We establish the full search interval from index 0 to 9 to find target 14.',
    intuition: 'Instead of linear O(N) scanning, each comparison will cut the candidate window exactly in half.'
  },
  {
    title: '2. Pass 1: mid = 4 (val 13) < Target 14 => Discard Left Half',
    phase: 'HALVE_RANGE',
    track: {
      label: 'Sorted Array nums',
      items: [
        { value: 2, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 10, status: 'discarded' },
        { value: 13, status: 'current' },
        14, 17, 22, 29, 35
      ],
      pointers: [
        { index: 0, label: 'low' },
        { index: 4, label: 'mid' },
        { index: 9, label: 'high' }
      ]
    },
    activeI: 4,
    activeJ: null,
    windowStart: 0,
    windowEnd: 9,
    metrics: [
      { label: 'mid Index', value: '4' },
      { label: 'nums[mid]', value: '13' },
      { label: 'Comparison', value: '13 < 14 (Too Small)' },
      { label: 'Action', value: 'low = mid + 1 (5)' }
    ],
    variables: { mid: 4, 'nums[mid]': 13, target: 14, nextLow: 5 },
    formula: 'mid = 0 + (9 - 0) / 2 = 4; nums[4] = 13 < 14 ==> low = 4 + 1 = 5',
    action: 'nums[mid] = 13 is strictly less than 14. Eliminate indices 0 through 4',
    explain: 'Because the array is sorted, all elements at indices 0 through 4 are <= 13 and cannot contain 14. We advance low to mid + 1 = 5.',
    intuition: 'One single comparison safely discards half of the entire array.'
  },
  {
    title: '3. Update Window: low = 5, high = 9 (Active Window [5..9])',
    phase: 'UPDATE_WINDOW',
    track: {
      label: 'Sorted Array nums',
      items: [
        { value: 2, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 10, status: 'discarded' },
        { value: 13, status: 'discarded' },
        14, 17, 22, 29, 35
      ],
      pointers: [
        { index: 5, label: 'low' },
        { index: 9, label: 'high' }
      ]
    },
    activeI: 5,
    activeJ: 9,
    windowStart: 5,
    windowEnd: 9,
    metrics: [
      { label: 'low', value: '5' },
      { label: 'high', value: '9' },
      { label: 'Remaining Size', value: '5 elements' },
      { label: 'Discarded', value: '50%' }
    ],
    variables: { low: 5, high: 9, activeSlice: '[14, 17, 22, 29, 35]' },
    formula: 'New Window: nums[5 .. 9] containing 5 elements',
    action: 'Active search range contracted to [5..9]',
    explain: 'Search space reduced from 10 elements to 5 elements. We recompute the midpoint for this new interval.',
    intuition: 'Each iteration strictly halves the search domain.'
  },
  {
    title: '4. Pass 2: mid = 7 (val 22) > Target 14 => Discard Right Half',
    phase: 'HALVE_RANGE',
    track: {
      label: 'Sorted Array nums',
      items: [
        { value: 2, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 10, status: 'discarded' },
        { value: 13, status: 'discarded' },
        14, 17,
        { value: 22, status: 'current' },
        { value: 29, status: 'discarded' },
        { value: 35, status: 'discarded' }
      ],
      pointers: [
        { index: 5, label: 'low' },
        { index: 7, label: 'mid' },
        { index: 9, label: 'high' }
      ]
    },
    activeI: 7,
    activeJ: null,
    windowStart: 5,
    windowEnd: 9,
    metrics: [
      { label: 'mid Index', value: '7' },
      { label: 'nums[mid]', value: '22' },
      { label: 'Comparison', value: '22 > 14 (Too Large)' },
      { label: 'Action', value: 'high = mid - 1 (6)' }
    ],
    variables: { mid: 7, 'nums[mid]': 22, target: 14, nextHigh: 6 },
    formula: 'mid = 5 + (9 - 5) / 2 = 7; nums[7] = 22 > 14 ==> high = 7 - 1 = 6',
    action: 'nums[mid] = 22 is strictly greater than 14. Eliminate indices 7 through 9',
    explain: 'All elements at indices 7, 8, and 9 are >= 22 and cannot be 14. Decrement high to mid - 1 = 6.',
    intuition: 'Search space shrinks again, discarding the right half.'
  },
  {
    title: '5. Update Window: low = 5, high = 6 (Active Window [5..6])',
    phase: 'UPDATE_WINDOW',
    track: {
      label: 'Sorted Array nums',
      items: [
        { value: 2, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 10, status: 'discarded' },
        { value: 13, status: 'discarded' },
        14, 17,
        { value: 22, status: 'discarded' },
        { value: 29, status: 'discarded' },
        { value: 35, status: 'discarded' }
      ],
      pointers: [
        { index: 5, label: 'low' },
        { index: 6, label: 'high' }
      ]
    },
    activeI: 5,
    activeJ: 6,
    windowStart: 5,
    windowEnd: 6,
    metrics: [
      { label: 'low', value: '5' },
      { label: 'high', value: '6' },
      { label: 'Remaining Size', value: '2 elements' },
      { label: 'Window', value: '[14, 17]' }
    ],
    variables: { low: 5, high: 6, candidateValues: '[14, 17]' },
    formula: 'New Window: nums[5 .. 6] containing only 2 elements',
    action: 'Active search range contracted to [5..6]',
    explain: 'Only indices 5 and 6 remain viable candidates. Recompute midpoint for this 2-element segment.',
    intuition: 'Target 14 is cornered within a tiny 2-element window.'
  },
  {
    title: '6. Pass 3: mid = 5 (val 14) == Target 14 => Match Found!',
    phase: 'MATCH_FOUND',
    track: {
      label: 'Sorted Array nums',
      items: [
        { value: 2, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 10, status: 'discarded' },
        { value: 13, status: 'discarded' },
        { value: 14, status: 'match' },
        17,
        { value: 22, status: 'discarded' },
        { value: 29, status: 'discarded' },
        { value: 35, status: 'discarded' }
      ],
      pointers: [
        { index: 5, label: 'low, mid' },
        { index: 6, label: 'high' }
      ]
    },
    activeI: 5,
    activeJ: null,
    windowStart: 5,
    windowEnd: 6,
    metrics: [
      { label: 'mid Index', value: '5' },
      { label: 'nums[mid]', value: '14' },
      { label: 'Match Status', value: 'nums[5] == 14 (FOUND!)', highlight: true },
      { label: 'Return Value', value: '5' }
    ],
    variables: { mid: 5, 'nums[mid]': 14, target: 14, matched: true },
    formula: 'mid = 5 + (6 - 5) / 2 = 5; nums[5] == target (14 == 14)',
    action: 'Target match detected at index 5! Return 5 immediately',
    explain: 'At mid = 5, nums[mid] is exactly equal to target 14. Binary search succeeds and immediately returns index 5.',
    intuition: 'Target found in just 3 steps rather than 6 comparisons required by linear search.'
  },
  {
    title: '7. Search Result: Target 14 Located at Index 5',
    phase: 'RESULT',
    track: {
      label: 'Target Located in Sorted Array',
      items: [
        2, 3, 7, 10, 13,
        { value: 14, status: 'match' },
        17, 22, 29, 35
      ],
      pointers: [
        { index: 5, label: 'Target (idx 5)' }
      ]
    },
    activeI: 5,
    activeJ: null,
    metrics: [
      { label: 'Target Index', value: '5', highlight: true },
      { label: 'Total Comparisons', value: '3' },
      { label: 'Search Status', value: 'Success' }
    ],
    variables: { resultIndex: 5, totalElements: 10, stepsTaken: 3 },
    formula: 'return mid; // return 5',
    action: 'Return 5. Target 14 successfully confirmed at index 5',
    explain: 'Index 5 stores the target value 14. Binary Search safely terminates before pointers cross.',
    intuition: 'Logarithmic search halving guarantees at most ceil(log2(N)) steps.'
  },
  {
    title: '8. Completed: O(log N) Time & O(1) Auxiliary Space Verified',
    phase: 'COMPLETED',
    track: {
      label: 'Sorted Array nums',
      items: [
        2, 3, 7, 10, 13,
        { value: 14, status: 'match' },
        17, 22, 29, 35
      ],
      pointers: []
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Found Index', value: '5', highlight: true },
      { label: 'Time Complexity', value: 'O(log N)' },
      { label: 'Space Complexity', value: 'O(1) In-Place' },
      { label: 'Max Steps for N=10', value: '4 steps' }
    ],
    variables: {
      timeComplexity: 'O(log N)',
      spaceComplexity: 'O(1)',
      maxComparisons: 'ceil(log2(10)) = 4',
      actualComparisons: 3
    },
    formula: 'T(N) = T(N/2) + O(1) ==> T(N) = O(log N)',
    action: 'Binary Search complete. Optimal logarithmic efficiency proven.',
    explain: 'For an array of size 10, worst-case comparisons is ceil(log2(10)) = 4. We found the element in only 3 comparisons using zero auxiliary memory.',
    intuition: 'Binary search is the quintessential logarithmic algorithm.'
  }
];

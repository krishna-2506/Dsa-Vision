// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Find Minimum in Rotated Sorted Array',
  category: 'Binary Search',
  difficulty: 'Easy',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the minimum element in an array of unique integers rotated at an unknown pivot in O(log N) logarithmic time using binary search.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Find Minimum Inflection Strategy',
  nodes: [
    { id: 'root', label: 'Minimum Element Invariant', children: ['early-exit', 'sorted-half', 'min-accumulation', 'elimination'] },
    { id: 'early-exit', label: '1. Fully Sorted Window', detail: 'If nums[low] <= nums[high], window is fully sorted; ans = min(ans, nums[low]) and break immediately' },
    { id: 'sorted-half', label: '2. Left Half Sorted', detail: 'If nums[low] <= nums[mid], minimum in left half is nums[low]; record it and search right (low = mid + 1)' },
    { id: 'elimination', label: '3. Right Half Sorted', detail: 'If nums[mid] < nums[low], minimum in right half is nums[mid]; record it and search left (high = mid - 1)' },
    { id: 'min-accumulation', label: '4. Running Minimum ans', detail: 'Tracks ans = min(ans, candidate) across discarded halves; guaranteed to retain global minimum' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Binary Search for Minimum in Rotated Sorted Array
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    int findMin(vector<int>& nums) {
        int low = 0, high = nums.size() - 1;
        int ans = INT_MAX;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // If search space is already sorted
            if (nums[low] <= nums[high]) {
                ans = min(ans, nums[low]);
                break;
            }

            // If left half is sorted, the minimum is nums[low] or in the right half
            if (nums[low] <= nums[mid]) {
                ans = min(ans, nums[low]);
                low = mid + 1;
            } 
            // If right half is sorted, the minimum is nums[mid] or in the left half
            else {
                ans = min(ans, nums[mid]);
                high = mid - 1;
            }
        }

        return ans;
    }
};`,
  python: `# Python 3 Optimal Binary Search for Minimum
# Time Complexity: O(log N) | Space Complexity: O(1)
class Solution:
    def findMin(self, nums: list[int]) -> int:
        low, high = 0, len(nums) - 1
        ans = float('inf')

        while low <= high:
            mid = (low + high) // 2

            if nums[low] <= nums[high]:
                ans = min(ans, nums[low])
                break

            if nums[low] <= nums[mid]:
                ans = min(ans, nums[low])
                low = mid + 1
            else:
                ans = min(ans, nums[mid])
                high = mid - 1

        return ans`,
  java: `// Java Optimal Binary Search for Minimum
// Time Complexity: O(log N) | Space Complexity: O(1)
class Solution {
    public int findMin(int[] nums) {
        int low = 0, high = nums.length - 1;
        int ans = Integer.MAX_VALUE;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[low] <= nums[high]) {
                ans = Math.min(ans, nums[low]);
                break;
            }

            if (nums[low] <= nums[mid]) {
                ans = Math.min(ans, nums[low]);
                low = mid + 1;
            } else {
                ans = Math.min(ans, nums[mid]);
                high = mid - 1;
            }
        }

        return ans;
    }
}`,
  javascript: `// JavaScript Optimal Binary Search for Minimum
// Time Complexity: O(log N) | Space Complexity: O(1)
var findMin = function(nums) {
    let low = 0, high = nums.length - 1;
    let ans = Infinity;

    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);

        if (nums[low] <= nums[high]) {
            ans = Math.min(ans, nums[low]);
            break;
        }

        if (nums[low] <= nums[mid]) {
            ans = Math.min(ans, nums[low]);
            low = mid + 1;
        } else {
            ans = Math.min(ans, nums[mid]);
            high = mid - 1;
        }
    }

    return ans;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: nums = [4, 5, 6, 7, 0, 1, 2], ans = ∞',
    phase: 'SETUP',
    track: {
      label: 'Rotated Array nums',
      items: [4, 5, 6, 7, 0, 1, 2],
      pointers: [
        { index: 0, label: 'low' },
        { index: 6, label: 'high' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 6,
    metrics: [
      { label: 'low', value: '0' },
      { label: 'high', value: '6' },
      { label: 'Current ans', value: '∞' },
      { label: 'Array Size', value: '7' }
    ],
    variables: { low: 0, high: 6, ans: 'Infinity', array: '[4, 5, 6, 7, 0, 1, 2]' },
    formula: 'Goal: Locate the smallest element (inflection pivot) in O(log N)',
    action: 'Initialize binary search pointers: low = 0, high = 6, ans = ∞',
    explain: 'The array is rotated at an unknown pivot. The minimum element is the only element that is strictly smaller than its predecessor.',
    intuition: 'Whenever a half is sorted, its minimum is simply its first element. We can record that minimum and search the other half.'
  },
  {
    title: '2. Pass 1: mid = 3 (val 7), Window Is Not Sorted (nums[0]=4 > nums[6]=2)',
    phase: 'EVALUATE_WINDOW',
    track: {
      label: 'Rotated Array nums',
      items: [
        { value: 4, status: 'current' },
        5, 6,
        { value: 7, status: 'match' },
        0, 1,
        { value: 2, status: 'current' }
      ],
      pointers: [
        { index: 0, label: 'low' },
        { index: 3, label: 'mid' },
        { index: 6, label: 'high' }
      ]
    },
    activeI: 3,
    activeJ: null,
    windowStart: 0,
    windowEnd: 6,
    metrics: [
      { label: 'mid Index', value: '3' },
      { label: 'nums[mid]', value: '7' },
      { label: 'Is Window Sorted?', value: '4 <= 2 (FALSE)' },
      { label: 'Inflection Present', value: 'Inside [0..6]' }
    ],
    variables: { mid: 3, 'nums[low]': 4, 'nums[high]': 2, isSorted: false },
    formula: 'nums[low] <= nums[high] is False ==> Inflection point exists in window',
    action: 'Window is rotated. Check which half is sorted',
    explain: 'Because nums[low=0] = 4 is greater than nums[high=6] = 2, the window contains a rotation jump. We check whether the left half [0..3] is sorted.',
    intuition: 'An unsorted window means the inflection point (global minimum) is within this interval.'
  },
  {
    title: '3. Left Half Sorted: nums[0]=4 <= nums[3]=7 => Record ans = min(∞, 4) = 4',
    phase: 'ACCUMULATE_MIN',
    track: {
      label: 'Rotated Array nums',
      items: [
        { value: 4, status: 'match' },
        { value: 5, status: 'current' },
        { value: 6, status: 'current' },
        { value: 7, status: 'current' },
        0, 1, 2
      ],
      pointers: [
        { index: 0, label: 'low (min of left)' },
        { index: 3, label: 'mid' },
        { index: 6, label: 'high' }
      ]
    },
    activeI: 0,
    activeJ: 3,
    windowStart: 0,
    windowEnd: 6,
    metrics: [
      { label: 'Sorted Half', value: 'Left [4, 5, 6, 7]' },
      { label: 'Candidate Min', value: 'nums[0] = 4' },
      { label: 'Updated ans', value: '4', highlight: true }
    ],
    variables: { 'nums[low]': 4, 'nums[mid]': 7, ans: 4, action: 'ans = min(ans, nums[low])' },
    formula: 'nums[low] <= nums[mid] (4 <= 7) ==> ans = min(∞, 4) = 4',
    action: 'Left half is sorted. Minimum of left half is nums[low] = 4. ans updated to 4',
    explain: 'Since the left half [4, 5, 6, 7] is sorted, its minimum is guaranteed to be nums[low] = 4. We record 4 in our running ans.',
    intuition: 'The true global minimum, if smaller than 4, must reside in the unsorted right half.'
  },
  {
    title: '4. Discard Left Half: low = mid + 1 (low = 4)',
    phase: 'DISCARD_HALF',
    track: {
      label: 'Rotated Array nums',
      items: [
        { value: 4, status: 'discarded' },
        { value: 5, status: 'discarded' },
        { value: 6, status: 'discarded' },
        { value: 7, status: 'discarded' },
        0, 1, 2
      ],
      pointers: [
        { index: 4, label: 'low' },
        { index: 6, label: 'high' }
      ]
    },
    activeI: 4,
    activeJ: 6,
    windowStart: 4,
    windowEnd: 6,
    metrics: [
      { label: 'Discarded', value: 'Indices [0..3]' },
      { label: 'New low', value: '4' },
      { label: 'Active Window', value: '[4..6] ([0, 1, 2])' },
      { label: 'Current ans', value: '4' }
    ],
    variables: { low: 4, high: 6, activeSlice: '[0, 1, 2]', ans: 4 },
    formula: 'low = mid + 1 = 4; Search space: nums[4 .. 6]',
    action: 'Eliminate left half. Search space narrowed to [4..6]',
    explain: 'We already extracted the minimum of the left half (4). The inflection point must be in the right half, so we advance low to mid + 1 = 4.',
    intuition: 'Half of the array is safely eliminated.'
  },
  {
    title: '5. Pass 2: low = 4, high = 6 => nums[low]=0 <= nums[high]=2 (Fully Sorted Window!)',
    phase: 'EARLY_EXIT_CHECK',
    track: {
      label: 'Rotated Array nums',
      items: [
        { value: 4, status: 'discarded' },
        { value: 5, status: 'discarded' },
        { value: 6, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 0, status: 'match' },
        1,
        { value: 2, status: 'current' }
      ],
      pointers: [
        { index: 4, label: 'low' },
        { index: 6, label: 'high' }
      ]
    },
    activeI: 4,
    activeJ: 6,
    windowStart: 4,
    windowEnd: 6,
    metrics: [
      { label: 'nums[low]', value: '0' },
      { label: 'nums[high]', value: '2' },
      { label: 'nums[low] <= nums[high]', value: '0 <= 2 (TRUE!)', highlight: true },
      { label: 'Condition', value: 'Window Completely Sorted' }
    ],
    variables: { low: 4, high: 6, 'nums[low]': 0, 'nums[high]': 2, fullySorted: true },
    formula: 'nums[low] <= nums[high] (0 <= 2) ==> Entire remaining search space is sorted!',
    action: 'Remaining window [0, 1, 2] is already sorted! Minimum must be nums[low] = 0',
    explain: 'Because nums[low=4] = 0 is <= nums[high=6] = 2, the entire remaining search space is monotonically increasing with no rotation jump.',
    intuition: 'When the whole active segment is sorted, the first element is unconditionally the smallest.'
  },
  {
    title: '6. Early Exit Trigger: ans = min(4, 0) = 0 & Break Search',
    phase: 'BREAK_SEARCH',
    track: {
      label: 'Rotated Array nums',
      items: [
        { value: 4, status: 'discarded' },
        { value: 5, status: 'discarded' },
        { value: 6, status: 'discarded' },
        { value: 7, status: 'discarded' },
        { value: 0, status: 'match' },
        { value: 1, status: 'match' },
        { value: 2, status: 'match' }
      ],
      pointers: [
        { index: 4, label: 'min (0)' }
      ]
    },
    activeI: 4,
    activeJ: null,
    windowStart: 4,
    windowEnd: 6,
    metrics: [
      { label: 'Candidate from Window', value: 'nums[4] = 0' },
      { label: 'Previous ans', value: '4' },
      { label: 'Final ans', value: '0', highlight: true },
      { label: 'Search Loop', value: 'Terminated Early' }
    ],
    variables: { ans: 0, earlyBreak: true, winner: 0 },
    formula: 'ans = min(ans, nums[low]) = min(4, 0) = 0; break;',
    action: 'Record ans = 0 and break from while loop immediately',
    explain: 'We compare current ans (4) with nums[low] (0). ans updates to 0. Since the remaining segment was sorted, no smaller element can possibly exist anywhere.',
    intuition: 'Early exit avoids unnecessary sub-steps when the window becomes clean.'
  },
  {
    title: '7. Final Result: Minimum Element is 0 at Index 4',
    phase: 'RESULT',
    track: {
      label: 'Rotated Array nums',
      items: [
        4, 5, 6, 7,
        { value: 0, status: 'match' },
        1, 2
      ],
      pointers: [
        { index: 4, label: 'Minimum (0)' }
      ]
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'Minimum Element', value: '0', highlight: true },
      { label: 'Original Pivot Index', value: '4' },
      { label: 'Total Iterations', value: '2' }
    ],
    variables: { finalAns: 0, originalIndex: 4, iterations: 2 },
    formula: 'return ans; // returns 0',
    action: 'Return 0. Global minimum confirmed at index 4.',
    explain: 'The function returns ans = 0. The minimum element was discovered in only 2 iterations.',
    intuition: 'Binary search converges directly upon the inflection cliff.'
  },
  {
    title: '8. Completed: Logarithmic Bound O(log N) & O(1) Space Proven',
    phase: 'COMPLETED',
    track: {
      label: 'Rotated Array nums',
      items: [
        4, 5, 6, 7,
        { value: 0, status: 'match' },
        1, 2
      ],
      pointers: []
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Minimum Value', value: '0', highlight: true },
      { label: 'Time Complexity', value: 'O(log N)' },
      { label: 'Space Complexity', value: 'O(1) Auxiliary' }
    ],
    variables: {
      timeComplexity: 'O(log N)',
      spaceComplexity: 'O(1)',
      rotationsHandled: 'Arbitrary 0 <= k < N'
    },
    formula: 'T(N) = T(N/2) + O(1) ==> O(log N)',
    action: 'Search complete. Optimal logarithmic minimum detection.',
    explain: 'By constantly picking the minimum from sorted halves and exploring the unsorted partition, the algorithm is mathematically guaranteed to encounter the global minimum in O(log N) time and O(1) space.',
    intuition: 'A beautiful demonstration of invariant tracking in binary search.'
  }
];

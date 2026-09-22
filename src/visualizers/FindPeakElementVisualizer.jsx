// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Find Peak Element',
  category: 'Binary Search',
  difficulty: 'Medium',
  timeComplexity: 'O(log N)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds a peak element that is strictly greater than its neighbors in logarithmic O(log N) time using binary search slope climbing. Guarantees finding a local maximum even in an unsorted array.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Binary Search Peak Finding Invariant',
  nodes: [
    { id: 'root', label: 'Peak Finding Strategy', children: ['boundary-lemma', 'slope-climbing', 'right-climb', 'left-climb'] },
    { id: 'boundary-lemma', label: '1. Boundary Pre-Check', detail: 'Check endpoints: if nums[0] > nums[1] return 0; if nums[n-1] > nums[n-2] return n-1. Reduces interior to [1..n-2]' },
    { id: 'slope-climbing', label: '2. Local Slope Condition', detail: 'At mid, compare nums[mid] with nums[mid-1] and nums[mid+1]. If strictly greater than both, mid is a peak' },
    { id: 'right-climb', label: '3. Ascending Slope (nums[mid] > nums[mid-1])', detail: 'Slope is rising to the right. Since nums[n] = -infinity, a peak is guaranteed to exist in [mid+1..high]' },
    { id: 'left-climb', label: '4. Descending Slope (nums[mid] <= nums[mid-1])', detail: 'Slope was higher to the left. A peak is guaranteed to exist in [low..mid-1]' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal O(log N) Binary Search for Peak Element
// Time Complexity: O(log N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return 0;
        if (nums[0] > nums[1]) return 0;
        if (nums[n - 1] > nums[n - 2]) return n - 1;

        int low = 1, high = n - 2;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // Check if mid is strictly greater than both neighbors
            if (nums[mid] > nums[mid - 1] && nums[mid] > nums[mid + 1]) {
                return mid;
            }

            // Ascending slope: peak must exist to the right
            if (nums[mid] > nums[mid - 1]) {
                low = mid + 1;
            } 
            // Descending slope: peak must exist to the left
            else {
                high = mid - 1;
            }
        }

        return -1;
    }
};`,
  python: `# Python 3 Optimal Peak Element Search
# Time Complexity: O(log N) | Space Complexity: O(1)
class Solution:
    def findPeakElement(self, nums: list[int]) -> int:
        n = len(nums)
        if n == 1:
            return 0
        if nums[0] > nums[1]:
            return 0
        if nums[n - 1] > nums[n - 2]:
            return n - 1

        low, high = 1, n - 2

        while low <= high:
            mid = (low + high) // 2

            if nums[mid] > nums[mid - 1] and nums[mid] > nums[mid + 1]:
                return mid

            if nums[mid] > nums[mid - 1]:
                low = mid + 1
            else:
                high = mid - 1

        return -1`,
  java: `// Java Optimal Peak Element Search
// Time Complexity: O(log N) | Space Complexity: O(1)
class Solution {
    public int findPeakElement(int[] nums) {
        int n = nums.length;
        if (n == 1) return 0;
        if (nums[0] > nums[1]) return 0;
        if (nums[n - 1] > nums[n - 2]) return n - 1;

        int low = 1, high = n - 2;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] > nums[mid - 1] && nums[mid] > nums[mid + 1]) {
                return mid;
            }

            if (nums[mid] > nums[mid - 1]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return -1;
    }
}`,
  javascript: `// JavaScript Optimal Peak Element Search
// Time Complexity: O(log N) | Space Complexity: O(1)
var findPeakElement = function(nums) {
    const n = nums.length;
    if (n === 1) return 0;
    if (nums[0] > nums[1]) return 0;
    if (nums[n - 1] > nums[n - 2]) return n - 1;

    let low = 1, high = n - 2;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (nums[mid] > nums[mid - 1] && nums[mid] > nums[mid + 1]) {
            return mid;
        }

        if (nums[mid] > nums[mid - 1]) {
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
    title: '1. Setup & Boundary Verification: nums = [1, 2, 1, 3, 5, 6, 4]',
    phase: 'SETUP',
    track: {
      label: 'Array nums',
      items: [
        { value: 1, status: 'discarded' },
        2, 1, 3, 5, 6,
        { value: 4, status: 'discarded' }
      ],
      pointers: [
        { index: 1, label: 'low' },
        { index: 5, label: 'high' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 1,
    windowEnd: 5,
    metrics: [
      { label: 'Array Size N', value: '7' },
      { label: 'low', value: '1' },
      { label: 'high', value: '5' },
      { label: 'Boundary check', value: 'nums[0]<nums[1], nums[6]<nums[5]' }
    ],
    variables: { low: 1, high: 5, n: 7, array: '[1, 2, 1, 3, 5, 6, 4]' },
    formula: 'Search Range = [1 ... n - 2] = [1 ... 5] after boundary verification',
    action: 'Verify endpoints 0 and 6: neither is an edge peak; restrict binary search to interior [1..5]',
    explain: 'nums[0]=1 is not > nums[1]=2. nums[6]=4 is not > nums[5]=6. Neither boundary is a peak, so a peak must exist strictly within index range [1..5].',
    intuition: 'Checking boundaries first avoids out-of-bound edge checks (mid-1, mid+1) inside the loop.'
  },
  {
    title: '2. Pass 1: mid = 3 (val 3), Compare Neighbors [2] and [4]',
    phase: 'CHECK_MID',
    track: {
      label: 'Array nums',
      items: [
        { value: 1, status: 'discarded' },
        2,
        { value: 1, status: 'current' },
        { value: 3, status: 'match' },
        { value: 5, status: 'current' },
        6,
        { value: 4, status: 'discarded' }
      ],
      pointers: [
        { index: 1, label: 'low' },
        { index: 3, label: 'mid' },
        { index: 5, label: 'high' }
      ]
    },
    activeI: 3,
    activeJ: null,
    windowStart: 1,
    windowEnd: 5,
    metrics: [
      { label: 'mid Index', value: '3' },
      { label: 'nums[mid]', value: '3', highlight: true },
      { label: 'Left (mid-1)', value: 'nums[2] = 1' },
      { label: 'Right (mid+1)', value: 'nums[4] = 5' }
    ],
    variables: { low: 1, mid: 3, high: 5, 'nums[mid]': 3, 'nums[mid-1]': 1, 'nums[mid+1]': 5 },
    formula: 'mid = 1 + (5 - 1) / 2 = 3 | nums[3] = 3',
    action: 'Inspect mid value 3 and its adjacent neighbors 1 and 5',
    explain: 'At mid = 3, nums[mid] = 3. Comparing with neighbors: left neighbor nums[2] is 1, right neighbor nums[4] is 5. 3 is greater than 1, but smaller than 5.',
    intuition: 'Since nums[3] is not greater than nums[4], it is not a peak. We analyze the slope direction.'
  },
  {
    title: '3. Pass 1 Slope Decision: nums[3] > nums[2] (3 > 1) -> Ascending Slope -> Go Right',
    phase: 'SLOPE_CLIMB',
    track: {
      label: 'Array nums',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 1, status: 'discarded' },
        { value: 3, status: 'discarded' },
        5, 6,
        { value: 4, status: 'discarded' }
      ],
      pointers: [
        { index: 4, label: 'low' },
        { index: 5, label: 'high' }
      ]
    },
    activeI: 3,
    activeJ: null,
    windowStart: 4,
    windowEnd: 5,
    metrics: [
      { label: 'Slope Type', value: 'Ascending (Upward)', highlight: true },
      { label: 'Discarded Half', value: '[1 ... 3]' },
      { label: 'New Search Range', value: '[4 ... 5]' },
      { label: 'low updated to', value: 'mid + 1 = 4' }
    ],
    variables: { low: 4, high: 5, slope: 'Ascending', action: 'low = mid + 1' },
    formula: 'nums[mid] > nums[mid - 1] (3 > 1) ==> Climb Right ==> low = mid + 1 = 4',
    action: 'Ascending slope detected; eliminate left half [1..3] and advance low to 4',
    explain: 'Because nums[3] > nums[2], the values are increasing as we move right. Since nums[n] = -infinity, the sequence cannot rise forever without either continuing to rise or dropping, which guarantees at least one peak in [4..5].',
    intuition: 'Always follow the upward slope: a mountain peak is mathematically guaranteed at or beyond the summit.'
  },
  {
    title: '4. Pass 2: mid = 4 (val 5), Compare Neighbors [3] and [5]',
    phase: 'CHECK_MID',
    track: {
      label: 'Array nums',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 1, status: 'discarded' },
        { value: 3, status: 'current' },
        { value: 5, status: 'match' },
        { value: 6, status: 'current' },
        { value: 4, status: 'discarded' }
      ],
      pointers: [
        { index: 4, label: 'low/mid' },
        { index: 5, label: 'high' }
      ]
    },
    activeI: 4,
    activeJ: null,
    windowStart: 4,
    windowEnd: 5,
    metrics: [
      { label: 'mid Index', value: '4' },
      { label: 'nums[mid]', value: '5', highlight: true },
      { label: 'Left (mid-1)', value: 'nums[3] = 3' },
      { label: 'Right (mid+1)', value: 'nums[5] = 6' }
    ],
    variables: { low: 4, mid: 4, high: 5, 'nums[mid]': 5, 'nums[mid-1]': 3, 'nums[mid+1]': 6 },
    formula: 'mid = 4 + (5 - 4) / 2 = 4 | nums[4] = 5',
    action: 'Inspect mid value 5 with neighbors 3 and 6',
    explain: 'mid = 4, nums[4] = 5. Left neighbor is nums[3] = 3, right neighbor is nums[5] = 6. Since 5 < 6, mid is not yet the peak.',
    intuition: 'The terrain continues upward towards index 5.'
  },
  {
    title: '5. Pass 2 Slope Decision: nums[4] > nums[3] (5 > 3) -> Still Climbing -> Go Right',
    phase: 'SLOPE_CLIMB',
    track: {
      label: 'Array nums',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 1, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 5, status: 'discarded' },
        6,
        { value: 4, status: 'discarded' }
      ],
      pointers: [
        { index: 5, label: 'low/high' }
      ]
    },
    activeI: 4,
    activeJ: null,
    windowStart: 5,
    windowEnd: 5,
    metrics: [
      { label: 'Slope Type', value: 'Ascending', highlight: true },
      { label: 'Discarded Index', value: '4' },
      { label: 'New Search Range', value: '[5 ... 5]' },
      { label: 'low updated to', value: 'mid + 1 = 5' }
    ],
    variables: { low: 5, high: 5, slope: 'Ascending', action: 'low = mid + 1 = 5' },
    formula: 'nums[4] > nums[3] (5 > 3) ==> low = mid + 1 = 5',
    action: 'Discard index 4; search range narrows to single candidate index 5',
    explain: 'nums[4]=5 > nums[3]=3 confirms the ascending slope continues rightward. We advance low to 5. The search window now consists of the single element at index 5.',
    intuition: 'The binary search interval has shrunk to a single element.'
  },
  {
    title: '6. Pass 3: mid = 5 (val 6), Inspect Neighbors [4] and [6]',
    phase: 'CHECK_MID',
    track: {
      label: 'Array nums',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 1, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 5, status: 'current' },
        { value: 6, status: 'match' },
        { value: 4, status: 'current' }
      ],
      pointers: [
        { index: 5, label: 'low/mid/high' }
      ]
    },
    activeI: 5,
    activeJ: null,
    windowStart: 5,
    windowEnd: 5,
    metrics: [
      { label: 'mid Index', value: '5' },
      { label: 'nums[mid]', value: '6', highlight: true },
      { label: 'Left (mid-1)', value: 'nums[4] = 5' },
      { label: 'Right (mid+1)', value: 'nums[6] = 4' }
    ],
    variables: { low: 5, mid: 5, high: 5, 'nums[mid]': 6, 'nums[4]': 5, 'nums[6]': 4 },
    formula: 'mid = 5 + (5 - 5) / 2 = 5 | nums[5] = 6',
    action: 'Evaluate mid = 5 against left neighbor (5) and right neighbor (4)',
    explain: 'At mid = 5, nums[5] = 6. Left neighbor is nums[4] = 5; right neighbor is nums[6] = 4. Test peak condition: is 6 > 5 AND 6 > 4?',
    intuition: 'Testing whether the candidate at index 5 is strictly greater than both its adjacent neighbors.'
  },
  {
    title: '7. Peak Condition Confirmed: 6 > 5 and 6 > 4 -> PEAK IDENTIFIED AT INDEX 5!',
    phase: 'PEAK_CONFIRMED',
    track: {
      label: 'Array nums',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'discarded' },
        { value: 1, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 5, status: 'discarded' },
        { value: 6, status: 'match' },
        { value: 4, status: 'discarded' }
      ],
      pointers: [
        { index: 5, label: 'PEAK' }
      ]
    },
    activeI: 5,
    activeJ: null,
    windowStart: 5,
    windowEnd: 5,
    metrics: [
      { label: 'Peak Index', value: '5', highlight: true },
      { label: 'Peak Value', value: '6', highlight: true },
      { label: 'Condition 1', value: 'nums[5] > nums[4] (6 > 5) [PASS]' },
      { label: 'Condition 2', value: 'nums[5] > nums[6] (6 > 4) [PASS]' }
    ],
    variables: { peakIndex: 5, peakValue: 6, condition: 'nums[mid]>nums[mid-1] && nums[mid]>nums[mid+1]' },
    formula: 'nums[5] > nums[4] (6 > 5) && nums[5] > nums[6] (6 > 4) ==> True Peak Found!',
    action: 'Both peak conditions satisfied! Return peak index 5',
    explain: 'nums[5] = 6 is strictly greater than both its left neighbor (5) and right neighbor (4). The summit of this mountain range is confirmed at index 5.',
    intuition: 'By climbing up the slope in logarithmic steps, we arrived directly at a true local maximum.'
  },
  {
    title: '8. Complexity Analysis & Invariant Guarantee: O(log N) Time, O(1) Space',
    phase: 'COMPLETED',
    track: {
      label: 'Array nums',
      items: [
        { value: 1, status: 'discarded' },
        { value: 2, status: 'current' },
        { value: 1, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 5, status: 'discarded' },
        { value: 6, status: 'match' },
        { value: 4, status: 'discarded' }
      ],
      pointers: [
        { index: 5, label: 'Peak' }
      ]
    },
    activeI: 5,
    activeJ: null,
    windowStart: 5,
    windowEnd: 5,
    metrics: [
      { label: 'Final Result', value: 'Index 5 (val 6)', highlight: true },
      { label: 'Time Complexity', value: 'O(log N)' },
      { label: 'Space Complexity', value: 'O(1) Auxiliary' },
      { label: 'Total Iterations', value: '3 steps for N = 7' }
    ],
    variables: { returnVal: 5, timeComplexity: 'O(log N)', spaceComplexity: 'O(1)', peakFound: true },
    formula: 'Max Comparisons = ceil(log2(N)) + 2 = ceil(log2(7)) + 2 = 5 comparisons',
    action: 'Peak search complete. Returning index 5 with zero additional space allocated',
    explain: 'Notice that index 1 (val 2) was also a valid peak in this array! The problem specifies finding any peak, and binary slope climbing is guaranteed to converge to at least one valid peak in O(log N) time.',
    intuition: 'Binary search works on unsorted arrays whenever a local condition guarantees an invariant exists in one half.'
  }
];

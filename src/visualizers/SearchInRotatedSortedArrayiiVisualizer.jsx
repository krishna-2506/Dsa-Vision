// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Search in Rotated Sorted Array II (With Duplicates)',
  category: 'Binary Search',
  difficulty: 'Medium',
  timeComplexity: 'O(log N) Average, O(N/2) Worst Case',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Searches for a target in a rotated sorted array containing duplicate elements. When nums[low] == nums[mid] == nums[high], duplicate shrinkage (low++, high--) resolves the sorted-half ambiguity.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Duplicate Handling in Rotated BS',
  nodes: [
    { id: 'root', label: 'Rotated BS with Duplicates', children: ['duplicate-ambiguity', 'shrinkage-rule', 'sorted-partition', 'complexity-tradeoff'] },
    { id: 'duplicate-ambiguity', label: '1. Three-Point Ambiguity', detail: 'If nums[low] == nums[mid] == nums[high], both halves have identical endpoints, making it impossible to detect which side is sorted' },
    { id: 'shrinkage-rule', label: '2. Boundary Shrinkage', detail: 'Safely execute low++ and high--; since nums[mid] != target, neither nums[low] nor nums[high] can be target either' },
    { id: 'sorted-partition', label: '3. Normal BS Resumption', detail: 'Once ambiguity is broken, standard rotated binary search checks left vs right sorted condition' },
    { id: 'complexity-tradeoff', label: '4. Worst-Case O(N)', detail: 'All duplicate elements (e.g. [3,3,3,1,3]) reduce to linear scan, but average case remains logarithmic O(log N)' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Binary Search with Duplicates
// Average: O(log N) | Worst case: O(N) | Space: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    bool search(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) return true;

            // Edge case: Duplicates obscure which half is sorted
            if (nums[low] == nums[mid] && nums[mid] == nums[high]) {
                low++;
                high--;
                continue;
            }

            // Left half is sorted
            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            }
            // Right half is sorted
            else {
                if (nums[mid] < target && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return false;
    }
};`,
  python: `# Python 3 Optimal Binary Search with Duplicates
# Average: O(log N) | Worst case: O(N) | Space: O(1)
class Solution:
    def search(self, nums: list[int], target: int) -> bool:
        low, high = 0, len(nums) - 1

        while low <= high:
            mid = (low + high) // 2

            if nums[mid] == target:
                return True

            # Edge case: Cannot identify sorted half due to duplicates
            if nums[low] == nums[mid] == nums[high]:
                low += 1
                high -= 1
                continue

            # Left half is sorted
            if nums[low] <= nums[mid]:
                if nums[low] <= target < nums[mid]:
                    high = mid - 1
                else:
                    low = mid + 1
            # Right half must be sorted
            else:
                if nums[mid] < target <= nums[high]:
                    low = mid + 1
                else:
                    high = mid - 1

        return False`,
  java: `// Java Optimal Binary Search with Duplicates
// Average: O(log N) | Worst case: O(N) | Space: O(1)
class Solution {
    public boolean search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) return true;

            // Handle duplicate boundary ambiguity
            if (nums[low] == nums[mid] && nums[mid] == nums[high]) {
                low++;
                high--;
                continue;
            }

            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return false;
    }
}`,
  javascript: `// JavaScript Optimal Binary Search with Duplicates
// Average: O(log N) | Worst case: O(N) | Space: O(1)
var search = function(nums, target) {
    let low = 0, high = nums.length - 1;

    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);

        if (nums[mid] === target) return true;

        if (nums[low] === nums[mid] && nums[mid] === nums[high]) {
            low++;
            high--;
            continue;
        }

        if (nums[low] <= nums[mid]) {
            if (nums[low] <= target && target < nums[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }
    return false;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: nums = [3, 1, 2, 3, 3, 3, 3], Target = 1',
    phase: 'SETUP',
    track: {
      label: 'Rotated Array with Duplicates',
      items: [3, 1, 2, 3, 3, 3, 3],
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
      { label: 'Target', value: '1' },
      { label: 'low', value: '0 (val 3)' },
      { label: 'high', value: '6 (val 3)' },
      { label: 'Duplicate Challenge', value: 'Boundary Ambiguity' }
    ],
    variables: { low: 0, high: 6, target: 1, array: '[3, 1, 2, 3, 3, 3, 3]' },
    formula: 'Challenge: When nums[low] == nums[mid] == nums[high], sorted half is undecidable.',
    action: 'Initialize search pointers: low = 0, high = 6',
    explain: 'Array [3, 1, 2, 3, 3, 3, 3] contains repeated 3s. Duplicate values at both ends can obscure which half contains the rotation pivot.',
    intuition: 'If nums[low] == nums[mid] == nums[high], we cannot know whether the inflection is in the left or right half.'
  },
  {
    title: '2. Pass 1: mid = 3 (val 3) => Ambiguity: nums[low] == nums[mid] == nums[high] == 3',
    phase: 'AMBIGUITY_DETECTED',
    track: {
      label: 'Rotated Array with Duplicates',
      items: [
        { value: 3, status: 'current' },
        1, 2,
        { value: 3, status: 'match' },
        3, 3,
        { value: 3, status: 'current' }
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
      { label: 'nums[mid]', value: '3 (!= 1)' },
      { label: 'nums[0] == nums[3] == nums[6]', value: 'All Equal to 3!', highlight: true },
      { label: 'Status', value: 'Half Undecidable' }
    ],
    variables: { low: 0, mid: 3, high: 6, 'nums[low]': 3, 'nums[mid]': 3, 'nums[high]': 3 },
    formula: 'nums[low] == nums[mid] && nums[mid] == nums[high] ==> Ambiguity Triggered',
    action: 'Detected 3-point equality. Neither half can be safely declared sorted or discarded',
    explain: 'At mid = 3, nums[mid] = 3 != target 1. Furthermore, nums[low] = 3, nums[mid] = 3, and nums[high] = 3 are all equal. We cannot eliminate either half yet!',
    intuition: 'Both left [3, 1, 2, 3] and right [3, 3, 3, 3] could theoretically be the rotated half.'
  },
  {
    title: '3. Duplicate Shrinkage: low++, high-- (Bypass Duplicate Boundaries)',
    phase: 'SHRINK_BOUNDARIES',
    track: {
      label: 'Rotated Array with Duplicates',
      items: [
        { value: 3, status: 'discarded' },
        1, 2, 3, 3, 3,
        { value: 3, status: 'discarded' }
      ],
      pointers: [
        { index: 1, label: 'low' },
        { index: 5, label: 'high' }
      ]
    },
    activeI: 1,
    activeJ: 5,
    windowStart: 1,
    windowEnd: 5,
    metrics: [
      { label: 'Action Taken', value: 'low++, high--' },
      { label: 'New low', value: '1 (val 1)' },
      { label: 'New high', value: '5 (val 3)' },
      { label: 'Shrinkage Reason', value: 'nums[low] != target 1' }
    ],
    variables: { low: 1, high: 5, discardedIndices: '[0, 6]', activeWindow: '[1..5]' },
    formula: 'low++; high--; continue;',
    action: 'Increment low from 0 to 1 and decrement high from 6 to 5 to strip duplicate edges',
    explain: 'Since nums[mid] = 3 is not the target 1, and nums[low] and nums[high] are both 3, neither endpoint can be the target. Thus, we safely increment low and decrement high.',
    intuition: 'Squeezing the boundaries breaks identical endpoint ties without losing the target.'
  },
  {
    title: '4. Pass 2 Window: Active Search Interval [1..5] ([1, 2, 3, 3, 3])',
    phase: 'UPDATE_WINDOW',
    track: {
      label: 'Rotated Array with Duplicates',
      items: [
        { value: 3, status: 'discarded' },
        1, 2, 3, 3, 3,
        { value: 3, status: 'discarded' }
      ],
      pointers: [
        { index: 1, label: 'low' },
        { index: 5, label: 'high' }
      ]
    },
    activeI: 1,
    activeJ: 5,
    windowStart: 1,
    windowEnd: 5,
    metrics: [
      { label: 'low', value: '1' },
      { label: 'high', value: '5' },
      { label: 'Active Elements', value: '[1, 2, 3, 3, 3]' },
      { label: 'Window Size', value: '5' }
    ],
    variables: { low: 1, high: 5, target: 1, activeSlice: '[1, 2, 3, 3, 3]' },
    formula: 'Search Space: nums[1 .. 5]',
    action: 'Recalculate midpoint for the non-ambiguous window [1..5]',
    explain: 'The new window endpoints are nums[1] = 1 and nums[5] = 3. Because nums[1] != nums[5], standard rotated binary search logic resumes.',
    intuition: 'The ambiguity is successfully broken!'
  },
  {
    title: '5. Pass 2: mid = 3 (val 3), Check Sorted Half',
    phase: 'IDENTIFY_HALF',
    track: {
      label: 'Rotated Array with Duplicates',
      items: [
        { value: 3, status: 'discarded' },
        { value: 1, status: 'current' },
        { value: 2, status: 'current' },
        { value: 3, status: 'match' },
        3, 3,
        { value: 3, status: 'discarded' }
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
      { label: 'nums[mid]', value: '3' },
      { label: 'nums[low] <= nums[mid]', value: '1 <= 3 (TRUE)', highlight: true },
      { label: 'Sorted Region', value: 'Left [1..3]' }
    ],
    variables: { low: 1, mid: 3, high: 5, 'nums[1]': 1, 'nums[3]': 3 },
    formula: 'nums[1] <= nums[3] (1 <= 3) ==> Left half [1..3] is sorted!',
    action: 'nums[low] <= nums[mid] is true: The left subsegment [1, 2, 3] is sorted',
    explain: 'At mid = 3, nums[mid] = 3 != 1. Since nums[low=1] = 1 <= nums[mid=3] = 3, the left half [1..3] is confirmed to be monotonically sorted.',
    intuition: 'We now test if target 1 is within the sorted range [1..3].'
  },
  {
    title: '6. Range Check: 1 <= target 1 < 3 is True => Discard Right Half',
    phase: 'ELIMINATE_HALF',
    track: {
      label: 'Rotated Array with Duplicates',
      items: [
        { value: 3, status: 'discarded' },
        1, 2,
        { value: 3, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 3, status: 'discarded' }
      ],
      pointers: [
        { index: 1, label: 'low' },
        { index: 2, label: 'high' },
        { index: 3, label: 'mid' }
      ]
    },
    activeI: 3,
    activeJ: null,
    windowStart: 1,
    windowEnd: 2,
    metrics: [
      { label: 'Target in Left?', value: '1 <= 1 < 3 (TRUE)', highlight: true },
      { label: 'Action', value: 'high = mid - 1 (2)' },
      { label: 'Remaining Window', value: '[1, 2]' }
    ],
    variables: { target: 1, leftRange: '[1 .. 3)', high: 2, low: 1 },
    formula: 'nums[1] <= target < nums[3] (1 <= 1 < 3) ==> high = 3 - 1 = 2',
    action: 'Target 1 is contained in left half. Eliminate right half: high = mid - 1 = 2',
    explain: 'Target 1 falls within [nums[1]..nums[3]). Discard indices 3 through 5 and set high = mid - 1 = 2.',
    intuition: 'Search space is now restricted to only indices 1 and 2.'
  },
  {
    title: '7. Pass 3: low = 1, high = 2 => mid = 1 (val 1) == Target 1 => Match Found!',
    phase: 'MATCH_FOUND',
    track: {
      label: 'Rotated Array with Duplicates',
      items: [
        { value: 3, status: 'discarded' },
        { value: 1, status: 'match' },
        2,
        { value: 3, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 3, status: 'discarded' },
        { value: 3, status: 'discarded' }
      ],
      pointers: [
        { index: 1, label: 'low, mid' },
        { index: 2, label: 'high' }
      ]
    },
    activeI: 1,
    activeJ: null,
    windowStart: 1,
    windowEnd: 2,
    metrics: [
      { label: 'mid Index', value: '1' },
      { label: 'nums[mid]', value: '1' },
      { label: 'Match Status', value: 'nums[1] == 1 (FOUND!)', highlight: true },
      { label: 'Return Value', value: 'true' }
    ],
    variables: { low: 1, mid: 1, high: 2, 'nums[1]': 1, target: 1, found: true },
    formula: 'mid = 1 + (2 - 1) / 2 = 1; nums[1] == target (1 == 1)',
    action: 'Target 1 matched at index 1! Return true immediately',
    explain: 'At mid = 1, nums[mid] equals target 1. Binary search succeeds and immediately returns true.',
    intuition: 'Target discovered despite initial duplicate boundary ambiguity.'
  },
  {
    title: '8. Search Result: Target 1 Exists in Array (Return true)',
    phase: 'RESULT',
    track: {
      label: 'Rotated Array with Duplicates',
      items: [
        3,
        { value: 1, status: 'match' },
        2, 3, 3, 3, 3
      ],
      pointers: [
        { index: 1, label: 'Target (idx 1)' }
      ]
    },
    activeI: 1,
    activeJ: null,
    metrics: [
      { label: 'Target Found', value: 'true', highlight: true },
      { label: 'Target Index', value: '1' },
      { label: 'Target Value', value: '1' }
    ],
    variables: { targetExists: true, position: 1 },
    formula: 'return true;',
    action: 'Return true. Target successfully confirmed to exist in the array.',
    explain: 'The algorithm terminates successfully with true. Duplicates were safely bypassed without missing the target.',
    intuition: 'Handling boundary ties preserves the correctness of binary search.'
  },
  {
    title: '9. Completed: Complexity Analysis — Average O(log N), Worst-Case O(N)',
    phase: 'COMPLETED',
    track: {
      label: 'Rotated Array with Duplicates',
      items: [
        3,
        { value: 1, status: 'match' },
        2, 3, 3, 3, 3
      ],
      pointers: []
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Result', value: 'true', highlight: true },
      { label: 'Average Time', value: 'O(log N)' },
      { label: 'Worst-Case Time', value: 'O(N/2) = O(N)' },
      { label: 'Space Complexity', value: 'O(1) In-Place' }
    ],
    variables: {
      averageTime: 'O(log N)',
      worstCaseTime: 'O(N) (e.g. array of all identical elements)',
      auxiliarySpace: 'O(1)'
    },
    formula: 'Worst case: nums = [3,3,3,3,1,3] requires repeated low++, high-- steps',
    action: 'Search completed. Invariant-safe handling of duplicates in rotated sorted array.',
    explain: 'When duplicates cause nums[low] == nums[mid] == nums[high], shrinking boundaries reduces the search space by 2 elements per step, leading to O(N) worst-case time. In typical inputs, logarithmic O(log N) efficiency is maintained.',
    intuition: 'The trade-off between guaranteed correctness and worst-case performance is optimal.'
  }
];

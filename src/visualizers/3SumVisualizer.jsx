// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: '3 Sum Problem (Triplets that Sum to Zero)',
  category: 'Arrays & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N²)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds all unique triplets [nums[i], nums[j], nums[k]] such that nums[i] + nums[j] + nums[k] == 0 without duplicate triplets. Uses array sorting combined with a two-pointer sweep.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: '3-Sum Two-Pointer Strategy',
  nodes: [
    { id: 'root', label: '3-Sum Core Invariant', children: ['sorting', 'fix-i', 'two-pointers', 'skip-duplicates'] },
    { id: 'sorting', label: '1. Sort Array O(N log N)', detail: 'Allows directional two-pointer shrinking and trivial duplicate skipping' },
    { id: 'fix-i', label: '2. Fix First Element i', detail: 'Loop i from 0 to N-3; if nums[i] == nums[i-1], skip to prevent duplicate triplets' },
    { id: 'two-pointers', label: '3. Converging Left/Right', detail: 'Target sum = -nums[i]. If sum < 0 increment Left; if sum > 0 decrement Right; if == 0 record triplet' },
    { id: 'skip-duplicates', label: '4. Inner Duplicate Bypass', detail: 'Upon match, advance Left and Right past any consecutive identical values' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal 3-Sum using Sorting + Two Pointers
// Time Complexity: O(N^2) | Space Complexity: O(1) auxiliary
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> res;
        sort(nums.begin(), nums.end());
        int n = nums.size();

        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue; // Skip duplicates for i
            if (nums[i] > 0) break; // Smallest number > 0 cannot sum to 0
            
            int left = i + 1, right = n - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum < 0) {
                    left++;
                } else if (sum > 0) {
                    right--;
                } else {
                    res.push_back({nums[i], nums[left], nums[right]});
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                }
            }
        }
        return res;
    }
};`,
  python: `# Python 3 Optimal 3-Sum (Sort + Two Pointers)
# Time Complexity: O(N^2) | Space Complexity: O(1) auxiliary
class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        res = []
        nums.sort()
        n = len(nums)

        for i in range(n - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            if nums[i] > 0:
                break
                
            left, right = i + 1, n - 1

            while left < right:
                total = nums[i] + nums[left] + nums[right]
                if total < 0:
                    left += 1
                elif total > 0:
                    right -= 1
                else:
                    res.append([nums[i], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left + 1]:
                        left += 1
                    while left < right and nums[right] == nums[right - 1]:
                        right -= 1
                    left += 1
                    right -= 1
        return res`,
  java: `// Java Optimal 3-Sum (Sort + Two Pointers)
// Time Complexity: O(N^2) | Space Complexity: O(1) auxiliary
import java.util.*;

class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(nums);
        int n = nums.length;

        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            if (nums[i] > 0) break;
            
            int left = i + 1, right = n - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                if (sum < 0) {
                    left++;
                } else if (sum > 0) {
                    right--;
                } else {
                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                }
            }
        }
        return res;
    }
}`,
  javascript: `// JavaScript Optimal 3-Sum (Sort + Two Pointers)
// Time Complexity: O(N^2) | Space Complexity: O(1) auxiliary
var threeSum = function(nums) {
    const res = [];
    nums.sort((a, b) => a - b);
    const n = nums.length;

    for (let i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        if (nums[i] > 0) break;
        let left = i + 1, right = n - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum < 0) {
                left++;
            } else if (sum > 0) {
                right--;
            } else {
                res.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            }
        }
    }
    return res;
};`
};

export const steps = [
  {
    title: '1. Sort Array: [-4, -1, -1, 0, 1, 2]',
    phase: 'SORTING',
    track: {
      label: 'Sorted Array nums',
      items: [-4, -1, -1, 0, 1, 2],
      pointers: []
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Array Size N', value: '6' },
      { label: 'Target Sum', value: '0' },
      { label: 'Found Triplets', value: '0' }
    ],
    variables: { sortedArray: '[-4, -1, -1, 0, 1, 2]', status: 'Sorted in O(N log N)' },
    formula: 'nums[i] + nums[left] + nums[right] == 0',
    action: 'Sort array in non-decreasing order to enable two-pointer bidirectional search',
    explain: 'Sorting transforms the search into finding pairs (left, right) summing to -nums[i]. If sum < 0 we advance left; if sum > 0 we retreat right.',
    intuition: 'Sorted order guarantees monotonicity: moving left increases sum, moving right decreases sum.'
  },
  {
    title: '2. Fix i = 0 (val -4): Search left = 1, right = 5',
    phase: 'POINTER_SWEEP',
    track: {
      label: 'Sorted Array nums',
      items: [-4, -1, -1, 0, 1, 2],
      pointers: [
        { index: 0, label: 'i' },
        { index: 1, label: 'L' },
        { index: 5, label: 'R' }
      ]
    },
    activeI: 0,
    activeJ: 1,
    metrics: [
      { label: 'Fixed nums[i]', value: '-4 (idx 0)' },
      { label: 'Sum (-4 + -1 + 2)', value: '-3 (< 0)' },
      { label: 'Decision', value: 'left++' }
    ],
    variables: { i: 0, left: 1, right: 5, sum: '-4 + (-1) + 2 = -3' },
    formula: 'sum = (-4) + (-1) + 2 = -3 < 0 ==> left++',
    action: 'Sum is -3 (< 0), which is too small. Increment left pointer to 2',
    explain: 'At i = 0, nums[i] = -4. nums[left] = -1, nums[right] = 2. Total sum is -3 < 0. To increase the total towards 0, increment left pointer.',
    intuition: 'Right pointer is already at maximum value (2). The only way to increase the sum is moving left forward.'
  },
  {
    title: '3. i = 0: left = 2, right = 5 => sum = -3 (< 0)',
    phase: 'POINTER_SWEEP',
    track: {
      label: 'Sorted Array nums',
      items: [-4, -1, -1, 0, 1, 2],
      pointers: [
        { index: 0, label: 'i' },
        { index: 2, label: 'L' },
        { index: 5, label: 'R' }
      ]
    },
    activeI: 0,
    activeJ: 2,
    metrics: [
      { label: 'Fixed nums[i]', value: '-4 (idx 0)' },
      { label: 'Sum (-4 + -1 + 2)', value: '-3 (< 0)' },
      { label: 'Decision', value: 'left++' }
    ],
    variables: { i: 0, left: 2, right: 5, sum: '-4 + (-1) + 2 = -3' },
    formula: 'sum = (-4) + (-1) + 2 = -3 < 0 ==> left++',
    action: 'Still too small. Increment left pointer again to index 3 (val 0)',
    explain: 'nums[2] is also -1. Sum remains -3 < 0. Increment left to 3. (At index 3, sum = -4 + 0 + 2 = -2 < 0, then left = 4, sum = -4 + 1 + 2 = -1 < 0. No triplet found with i=0).',
    intuition: 'When left crosses right, the search for fixed i = 0 concludes with 0 matches.'
  },
  {
    title: '4. Fix i = 1 (val -1): left = 2 (val -1), right = 5 (val 2) => Match 1!',
    phase: 'TRIPLET_FOUND',
    track: {
      label: 'Sorted Array nums',
      items: [
        -4,
        { value: -1, status: 'match' },
        { value: -1, status: 'match' },
        0,
        1,
        { value: 2, status: 'match' }
      ],
      pointers: [
        { index: 1, label: 'i' },
        { index: 2, label: 'L' },
        { index: 5, label: 'R' }
      ]
    },
    activeI: 1,
    activeJ: 2,
    metrics: [
      { label: 'Fixed nums[i]', value: '-1 (idx 1)' },
      { label: 'Sum (-1 + -1 + 2)', value: '0 (MATCH!)', highlight: true },
      { label: 'Found Triplets', value: '1' }
    ],
    variables: { i: 1, left: 2, right: 5, match: '[-1, -1, 2]', totalFound: 1 },
    formula: 'nums[1] + nums[2] + nums[5] = (-1) + (-1) + 2 = 0',
    action: 'First triplet [-1, -1, 2] discovered! Record triplet and shrink pointers',
    explain: 'Sum matches exactly 0! Triplet [-1, -1, 2] is appended to results. Next, we advance left and retreat right while skipping any identical adjacent values.',
    intuition: 'We found an exact zero-sum triplet. Moving only one pointer would make sum non-zero, so both must move.'
  },
  {
    title: '5. i = 1: left = 3 (val 0), right = 4 (val 1) => Match 2!',
    phase: 'TRIPLET_FOUND',
    track: {
      label: 'Sorted Array nums',
      items: [
        -4,
        { value: -1, status: 'match' },
        -1,
        { value: 0, status: 'match' },
        { value: 1, status: 'match' },
        2
      ],
      pointers: [
        { index: 1, label: 'i' },
        { index: 3, label: 'L' },
        { index: 4, label: 'R' }
      ]
    },
    activeI: 1,
    activeJ: 3,
    metrics: [
      { label: 'Fixed nums[i]', value: '-1 (idx 1)' },
      { label: 'Sum (-1 + 0 + 1)', value: '0 (MATCH!)', highlight: true },
      { label: 'Found Triplets', value: '2' }
    ],
    variables: { i: 1, left: 3, right: 4, match: '[-1, 0, 1]', totalFound: 2 },
    formula: 'nums[1] + nums[3] + nums[4] = (-1) + 0 + 1 = 0',
    action: 'Second triplet [-1, 0, 1] discovered! Record triplet and shrink pointers',
    explain: 'At left = 3 (val 0) and right = 4 (val 1), sum is (-1) + 0 + 1 = 0! Triplet [-1, 0, 1] is appended. Advance left to 4, retreat right to 3.',
    intuition: 'A single outer index i can generate multiple distinct triplets across different inner windows.'
  },
  {
    title: '6. i = 1: left = 4, right = 3 (left >= right) => Window Closes',
    phase: 'WINDOW_CLOSE',
    track: {
      label: 'Sorted Array nums',
      items: [-4, -1, -1, 0, 1, 2],
      pointers: [
        { index: 1, label: 'i' },
        { index: 4, label: 'L' },
        { index: 3, label: 'R' }
      ]
    },
    activeI: 1,
    activeJ: 4,
    metrics: [
      { label: 'Fixed nums[i]', value: '-1 (idx 1)' },
      { label: 'Pointers Condition', value: 'left (4) > right (3)' },
      { label: 'Sub-search', value: 'Terminated' }
    ],
    variables: { i: 1, left: 4, right: 3, status: 'Pointers crossed, advance outer loop' },
    formula: 'left >= right ==> while loop terminates for i = 1',
    action: 'Pointers crossed (left > right). Outer loop finishes i = 1',
    explain: 'Both pointers have met and crossed. All possible pairs with nums[1] = -1 have been exhaustively evaluated.',
    intuition: 'The linear scan over the remaining subarray for this fixed pivot is complete.'
  },
  {
    title: '7. i = 2 (val -1): nums[2] == nums[1] => Skip Duplicate Outer Pivot',
    phase: 'DUPLICATE_SKIP',
    track: {
      label: 'Sorted Array nums',
      items: [-4, -1, { value: -1, status: 'discarded' }, 0, 1, 2],
      pointers: [
        { index: 2, label: 'i (skip)' }
      ]
    },
    activeI: 2,
    activeJ: null,
    metrics: [
      { label: 'Current nums[2]', value: '-1' },
      { label: 'Previous nums[1]', value: '-1' },
      { label: 'Action', value: 'Bypass Duplicate' }
    ],
    variables: { i: 2, 'nums[i]': -1, 'nums[i-1]': -1, reason: 'Duplicate pivot avoidance' },
    formula: 'if (i > 0 && nums[i] == nums[i-1]) continue;',
    action: 'Bypass i = 2 because nums[2] == nums[1] == -1, preventing duplicate triplets',
    explain: 'Since nums[2] is identical to nums[1], evaluating it would rediscover the exact same triplets ([-1, -1, 2], [-1, 0, 1]). Skipping ensures uniqueness in O(1) check.',
    intuition: 'Prevent duplicate outputs at the root level without requiring expensive Set lookups.'
  },
  {
    title: '8. i = 3 (val 0): nums[3] = 0, left = 4 (val 1), right = 5 (val 2)',
    phase: 'POINTER_SWEEP',
    track: {
      label: 'Sorted Array nums',
      items: [-4, -1, -1, 0, 1, 2],
      pointers: [
        { index: 3, label: 'i' },
        { index: 4, label: 'L' },
        { index: 5, label: 'R' }
      ]
    },
    activeI: 3,
    activeJ: 4,
    metrics: [
      { label: 'Fixed nums[3]', value: '0' },
      { label: 'Sum (0 + 1 + 2)', value: '3 (> 0)' },
      { label: 'Decision', value: 'right--' }
    ],
    variables: { i: 3, left: 4, right: 5, sum: '0 + 1 + 2 = 3 (> 0)' },
    formula: 'sum = 0 + 1 + 2 = 3 > 0 ==> right--',
    action: 'Sum = 3 > 0. Decrement right to 4. Pointers cross (left = 4, right = 4)',
    explain: 'At i = 3, sum is 3 > 0. Decrementing right causes left == right (4 == 4), ending this pass. Furthermore, since nums[3] >= 0 and future elements are positive, no future sum can equal 0.',
    intuition: 'Early exit condition: once nums[i] > 0 in a sorted array, no three positive numbers can sum to zero.'
  },
  {
    title: '9. Completed: Unique Triplets Found: [[-1, -1, 2], [-1, 0, 1]]',
    phase: 'COMPLETED',
    track: {
      label: 'Result Triplets from nums',
      items: [
        { value: -1, status: 'match' },
        { value: -1, status: 'match' },
        { value: 0, status: 'match' },
        { value: 1, status: 'match' },
        { value: 2, status: 'match' }
      ],
      pointers: []
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Total Triplets', value: '2', highlight: true },
      { label: 'Time Complexity', value: 'O(N²)' },
      { label: 'Space Complexity', value: 'O(1) Aux' }
    ],
    variables: {
      triplet1: '[-1, -1, 2]',
      triplet2: '[-1, 0, 1]',
      totalUniqueTriplets: 2
    },
    formula: 'Result = [[-1, -1, 2], [-1, 0, 1]]',
    action: 'Return all 2 unique triplets. O(N^2) time, O(1) auxiliary space.',
    explain: 'Sorting + Two Pointers reduces the 3-Sum problem from O(N^3) brute-force to optimal O(N^2) time with guaranteed duplicate avoidance.',
    intuition: 'Dual-level duplicate skipping (outer loop i, inner pointers left & right) yields an exact unique set.'
  }
];

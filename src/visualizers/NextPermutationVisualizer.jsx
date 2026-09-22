// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Next Permutation',
  category: 'Arrays & Permutations',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) In-Place',
  description: 'Rearranges numbers into the lexicographically next greater permutation in-place. Follows the 3-step pivot algorithm: find the rightmost dip, swap with the next greater element, and reverse the tail suffix.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Next Permutation 3-Step Strategy',
  nodes: [
    { id: 'root', label: 'Next Permutation Invariant', children: ['find-dip', 'find-successor', 'swap-pivot', 'reverse-tail'] },
    { id: 'find-dip', label: '1. Rightmost Dip i', detail: 'Scan from right to find first i where nums[i] < nums[i+1]; suffix [i+1..N-1] is descending' },
    { id: 'find-successor', label: '2. Next Greater Successor j', detail: 'Scan suffix from right to find first nums[j] > nums[i]; minimal increment for prefix' },
    { id: 'swap-pivot', label: '3. Swap nums[i] & nums[j]', detail: 'Prefix advances to next lexicographical order; suffix remains strictly descending' },
    { id: 'reverse-tail', label: '4. Reverse Suffix [i+1..N-1]', detail: 'Reversing descending suffix produces ascending order, making it minimal' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal In-Place Next Permutation
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int n = nums.size();
        int ind = -1;

        // Step 1: Find the rightmost dip / break point
        for (int i = n - 2; i >= 0; i--) {
            if (nums[i] < nums[i + 1]) {
                ind = i;
                break;
            }
        }

        // If no break point, array is descending (e.g., [5,4,3,2,1])
        if (ind == -1) {
            reverse(nums.begin(), nums.end());
            return;
        }

        // Step 2: Find smallest element greater than nums[ind] from right
        for (int i = n - 1; i > ind; i--) {
            if (nums[i] > nums[ind]) {
                swap(nums[i], nums[ind]);
                break;
            }
        }

        // Step 3: Reverse the remaining suffix from ind + 1 to end
        reverse(nums.begin() + ind + 1, nums.end());
    }
};`,
  python: `# Python 3 Optimal Next Permutation
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def nextPermutation(self, nums: list[int]) -> None:
        n = len(nums)
        ind = -1
        
        # Step 1: Find pivot where nums[i] < nums[i+1]
        for i in range(n - 2, -1, -1):
            if nums[i] < nums[i + 1]:
                ind = i
                break
                
        if ind == -1:
            nums.reverse()
            return
            
        # Step 2: Find next greater element from right
        for i in range(n - 1, ind, -1):
            if nums[i] > nums[ind]:
                nums[i], nums[ind] = nums[ind], nums[i]
                break
                
        # Step 3: Reverse the suffix
        nums[ind + 1:] = reversed(nums[ind + 1:])`,
  java: `// Java Optimal Next Permutation
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public void nextPermutation(int[] nums) {
        int n = nums.length;
        int ind = -1;
        
        // Step 1: Find breakpoint
        for (int i = n - 2; i >= 0; i--) {
            if (nums[i] < nums[i + 1]) {
                ind = i;
                break;
            }
        }
        
        if (ind == -1) {
            reverse(nums, 0, n - 1);
            return;
        }
        
        // Step 2: Find element to swap
        for (int i = n - 1; i > ind; i--) {
            if (nums[i] > nums[ind]) {
                swap(nums, i, ind);
                break;
            }
        }
        
        // Step 3: Reverse the suffix
        reverse(nums, ind + 1, n - 1);
    }
    
    private void reverse(int[] nums, int start, int end) {
        while (start < end) {
            swap(nums, start++, end--);
        }
    }
    
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}`,
  javascript: `// JavaScript Optimal Next Permutation
// Time Complexity: O(N) | Space Complexity: O(1)
var nextPermutation = function(nums) {
    const n = nums.length;
    let ind = -1;

    for (let i = n - 2; i >= 0; i--) {
        if (nums[i] < nums[i + 1]) {
            ind = i;
            break;
        }
    }

    if (ind === -1) {
        nums.reverse();
        return;
    }

    for (let i = n - 1; i > ind; i--) {
        if (nums[i] > nums[ind]) {
            [nums[i], nums[ind]] = [nums[ind], nums[i]];
            break;
        }
    }

    let left = ind + 1, right = n - 1;
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++;
        right--;
    }
};`
};

export const steps = [
  {
    title: '1. Initial State: nums = [1, 2, 5, 4, 3]',
    phase: 'SETUP',
    track: {
      label: 'Array nums',
      items: [1, 2, 5, 4, 3],
      pointers: []
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Array Size N', value: '5' },
      { label: 'Target', value: 'Next Lexicographical Order' },
      { label: 'Breakpoint ind', value: 'Unidentified' }
    ],
    variables: { array: '[1, 2, 5, 4, 3]', goal: 'Find minimal lexicographical increment' },
    formula: 'Find rightmost i such that nums[i] < nums[i+1]',
    action: 'Initialize search for rightmost pivot dip from index N - 2 down to 0',
    explain: 'A suffix that is in strictly descending order represents the maximum possible permutation of those digits. To create the next permutation, we must change the first digit to the left of this descending suffix.',
    intuition: 'If an entire array is descending (e.g. 5,4,3,2,1), reversing it gives the smallest permutation (1,2,3,4,5).'
  },
  {
    title: '2. Scan from Right: nums[3]=4 > nums[4]=3 (Descending)',
    phase: 'SCAN_DIP',
    track: {
      label: 'Array nums',
      items: [1, 2, 5, { value: 4, status: 'current' }, { value: 3, status: 'current' }],
      pointers: [{ index: 3, label: 'i' }]
    },
    activeI: 3,
    activeJ: 4,
    metrics: [
      { label: 'Comparing', value: 'nums[3]=4 vs nums[4]=3' },
      { label: 'Check nums[i] < nums[i+1]', value: 'False (4 > 3)' },
      { label: 'Descending Suffix', value: '[4, 3]' }
    ],
    variables: { i: 3, 'nums[i]': 4, 'nums[i+1]': 3, conditionMet: false },
    formula: 'nums[3] < nums[4] is False ==> continue scanning left',
    action: 'nums[3] is 4 > 3. Continue scanning leftward for dip',
    explain: 'At index 3, 4 is greater than 3. The descending suffix extends to [4, 3]. We continue scanning left.',
    intuition: 'Digits 4 and 3 cannot be rearranged to form a larger value than 43.'
  },
  {
    title: '3. Scan from Right: nums[2]=5 > nums[3]=4 (Descending)',
    phase: 'SCAN_DIP',
    track: {
      label: 'Array nums',
      items: [1, 2, { value: 5, status: 'current' }, { value: 4, status: 'current' }, { value: 3, status: 'current' }],
      pointers: [{ index: 2, label: 'i' }]
    },
    activeI: 2,
    activeJ: 3,
    metrics: [
      { label: 'Comparing', value: 'nums[2]=5 vs nums[3]=4' },
      { label: 'Check nums[i] < nums[i+1]', value: 'False (5 > 4)' },
      { label: 'Descending Suffix', value: '[5, 4, 3]' }
    ],
    variables: { i: 2, 'nums[i]': 5, 'nums[i+1]': 4, conditionMet: false },
    formula: 'nums[2] < nums[3] is False ==> continue scanning left',
    action: 'nums[2] is 5 > 4. Suffix [5, 4, 3] is strictly descending',
    explain: 'At index 2, 5 > 4. The suffix [5, 4, 3] is fully descending and cannot be incremented further.',
    intuition: 'The maximum permutation for digits 5, 4, 3 is 543. We must step one index to the left.'
  },
  {
    title: '4. Breakpoint Found: nums[1]=2 < nums[2]=5 => ind = 1',
    phase: 'BREAKPOINT_FOUND',
    track: {
      label: 'Array nums',
      items: [
        1,
        { value: 2, status: 'match' },
        { value: 5, status: 'current' },
        { value: 4, status: 'current' },
        { value: 3, status: 'current' }
      ],
      pointers: [{ index: 1, label: 'pivot (ind)' }]
    },
    activeI: 1,
    activeJ: 2,
    metrics: [
      { label: 'Breakpoint Index', value: 'ind = 1', highlight: true },
      { label: 'Pivot Value', value: 'nums[1] = 2' },
      { label: 'Descending Suffix', value: '[5, 4, 3] (idx 2..4)' }
    ],
    variables: { ind: 1, 'nums[ind]': 2, 'nums[ind+1]': 5, pivotValue: 2 },
    formula: 'nums[1] < nums[2] (2 < 5) ==> ind = 1',
    action: 'Breakpoint found at index 1! Value 2 needs to be replaced with the next smallest element > 2 in suffix',
    explain: 'At index 1, nums[1] = 2 is strictly less than nums[2] = 5. Index 1 is our pivot breakpoint. Suffix [5, 4, 3] will supply the replacement candidate.',
    intuition: 'Replacing 2 with the smallest possible larger digit from the suffix yields the smallest increase.'
  },
  {
    title: '5. Find Successor: nums[4] = 3 is the Smallest Val > 2 in Suffix',
    phase: 'FIND_SUCCESSOR',
    track: {
      label: 'Array nums',
      items: [
        1,
        { value: 2, status: 'match' },
        5,
        4,
        { value: 3, status: 'match' }
      ],
      pointers: [
        { index: 1, label: 'pivot' },
        { index: 4, label: 'successor' }
      ]
    },
    activeI: 1,
    activeJ: 4,
    metrics: [
      { label: 'Pivot', value: '2 at idx 1' },
      { label: 'Successor', value: '3 at idx 4', highlight: true },
      { label: 'Scan Target', value: 'First nums[j] > 2 from right' }
    ],
    variables: { ind: 1, successorIdx: 4, 'nums[ind]': 2, 'nums[succ]': 3 },
    formula: 'for (j = n-1; j > ind; j--) if (nums[j] > nums[ind]) ==> j = 4',
    action: 'Found successor 3 at index 4 (3 > 2). Swap pivot (idx 1) with successor (idx 4)',
    explain: 'Scanning the descending suffix from right to left, the first value greater than 2 is 3 at index 4. Because the suffix is descending, this first element is guaranteed to be the smallest element in the suffix that is greater than 2.',
    intuition: 'Swapping 2 with 3 ensures the prefix grows by the absolute minimum amount.'
  },
  {
    title: '6. Swap Pivot & Successor: swap(nums[1], nums[4]) => [1, 3, 5, 4, 2]',
    phase: 'SWAP_PIVOT',
    track: {
      label: 'Array nums (After Swap)',
      items: [
        1,
        { value: 3, status: 'match' },
        5,
        4,
        { value: 2, status: 'current' }
      ],
      pointers: [
        { index: 1, label: 'new prefix' }
      ]
    },
    activeI: 1,
    activeJ: 4,
    metrics: [
      { label: 'New Prefix', value: '[1, 3]' },
      { label: 'Suffix to Reverse', value: '[5, 4, 2] (idx 2..4)' },
      { label: 'Swap Completed', value: '2 <-> 3' }
    ],
    variables: {
      arrayAfterSwap: '[1, 3, 5, 4, 2]',
      newPrefix: '[1, 3]',
      suffixState: 'Descending [5, 4, 2]'
    },
    formula: 'swap(nums[1], nums[4]); array = [1, 3, 5, 4, 2];',
    action: 'Swap complete. Prefix is now [1, 3]. Suffix [5, 4, 2] remains sorted in descending order',
    explain: 'After swapping, nums[1] is 3. The suffix [5, 4, 2] is still strictly descending. To make the new permutation as small as possible, this suffix must be sorted in ascending order.',
    intuition: 'Reversing a descending array turns it into ascending order in O(K) time without an expensive O(K log K) sort!'
  },
  {
    title: '7. Reverse Suffix [ind + 1 .. N - 1]: [5, 4, 2] -> [2, 4, 5]',
    phase: 'REVERSE_SUFFIX',
    track: {
      label: 'Array nums (Suffix Reversed)',
      items: [
        1,
        { value: 3, status: 'match' },
        { value: 2, status: 'match' },
        { value: 4, status: 'match' },
        { value: 5, status: 'match' }
      ],
      pointers: [
        { index: 2, label: 'L' },
        { index: 4, label: 'R' }
      ]
    },
    activeI: 2,
    activeJ: 4,
    windowStart: 2,
    windowEnd: 4,
    metrics: [
      { label: 'Reversed Window', value: 'indices 2..4' },
      { label: 'Old Suffix', value: '[5, 4, 2]' },
      { label: 'New Suffix', value: '[2, 4, 5]', highlight: true }
    ],
    variables: {
      reversedRange: '[2..4]',
      finalArray: '[1, 3, 2, 4, 5]',
      reverseEfficiency: 'O(N) two-pointer flip'
    },
    formula: 'reverse(nums, ind + 1, n - 1): [5, 4, 2] ==> [2, 4, 5]',
    action: 'Reverse the suffix in-place using two pointers (left = 2, right = 4)',
    explain: 'Reversing suffix elements at indices 2 through 4 transforms [5, 4, 2] into [2, 4, 5]. Combined with prefix [1, 3], we get [1, 3, 2, 4, 5].',
    intuition: 'Ascending order gives the smallest possible lexicographical value for the remaining tail.'
  },
  {
    title: '8. Completed: Next Permutation is [1, 3, 2, 4, 5]',
    phase: 'COMPLETED',
    track: {
      label: 'Final Permutation',
      items: [
        { value: 1, status: 'match' },
        { value: 3, status: 'match' },
        { value: 2, status: 'match' },
        { value: 4, status: 'match' },
        { value: 5, status: 'match' }
      ],
      pointers: []
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Next Permutation', value: '[1, 3, 2, 4, 5]', highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1) In-Place' }
    ],
    variables: {
      input: '[1, 2, 5, 4, 3]',
      output: '[1, 3, 2, 4, 5]',
      passes: 'Single backward scan + swap + reverse'
    },
    formula: 'Lexicographically next permutation established in-place',
    action: 'Algorithm finished. Return [1, 3, 2, 4, 5].',
    explain: 'The algorithm runs in strictly linear O(N) time with O(1) auxiliary space, finding the exact next lexicographical permutation without generating any other permutations.',
    intuition: 'Mathematical construction guarantees this is the immediate successor permutation.'
  }
];

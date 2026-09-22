// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Left Rotate Array by One Place',
  category: 'Arrays & In-Place Shifting',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) In-Place',
  description: 'Shifts all array elements one position to the left in-place, caching the initial first element and assigning it to the final array slot.'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Left Rotate by 1 Strategy',
  nodes: [
    { id: 'root', label: 'In-Place Left Shift Invariant', children: ['cache-head', 'left-shift-loop', 'tail-assignment', 'complexity'] },
    { id: 'cache-head', label: '1. Cache Head Element', detail: 'Store temp = nums[0] to prevent data loss before shifting elements left' },
    { id: 'left-shift-loop', label: '2. Sequential Left Shift', detail: 'Iterate i from 0 to N-2: copy nums[i] = nums[i+1]' },
    { id: 'tail-assignment', label: '3. Wrap-Around Insertion', detail: 'Assign nums[N-1] = temp, placing the original head at the end of the array' },
    { id: 'complexity', label: '4. Optimal O(N) In-Place', detail: 'Single pass of N-1 shifts using exactly O(1) auxiliary memory' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal In-Place Left Rotation by One
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

class Solution {
public:
    void rotateArrayByOne(vector<int>& nums) {
        int n = nums.size();
        if (n <= 1) return;

        int temp = nums[0]; // 1. Cache first element

        // 2. Shift all subsequent elements 1 position to the left
        for (int i = 0; i < n - 1; i++) {
            nums[i] = nums[i + 1];
        }

        // 3. Assign cached first element to the last slot
        nums[n - 1] = temp;
    }
};`,
  python: `# Python 3 Optimal In-Place Left Rotation by One
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def rotateArrayByOne(self, nums: list[int]) -> None:
        if len(nums) <= 1:
            return
        
        temp = nums[0]
        n = len(nums)
        for i in range(n - 1):
            nums[i] = nums[i + 1]
            
        nums[n - 1] = temp`,
  java: `// Java Optimal In-Place Left Rotation by One
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public void rotateArrayByOne(int[] nums) {
        if (nums.length <= 1) return;

        int temp = nums[0];
        for (int i = 0; i < nums.length - 1; i++) {
            nums[i] = nums[i + 1];
        }
        nums[nums.length - 1] = temp;
    }
}`,
  javascript: `// JavaScript Optimal In-Place Left Rotation by One
// Time Complexity: O(N) | Space Complexity: O(1)
var rotateArrayByOne = function(nums) {
    if (nums.length <= 1) return;

    const temp = nums[0];
    for (let i = 0; i < nums.length - 1; i++) {
        nums[i] = nums[i + 1];
    }
    nums[nums.length - 1] = temp;
};`
};

export const steps = [
  {
    title: '1. Initial State: Array nums = [1, 2, 3, 4, 5]',
    phase: 'SETUP',
    track: {
      label: 'Array nums',
      items: [1, 2, 3, 4, 5],
      pointers: [
        { index: 0, label: 'head' }
      ]
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Array Size N', value: '5' },
      { label: 'Shift Distance', value: '1 to the left' },
      { label: 'Cached temp', value: 'None' }
    ],
    variables: { array: '[1, 2, 3, 4, 5]', temp: 'None' },
    formula: 'Left Rotate by 1: nums[i] = nums[i+1], nums[N-1] = nums[0]',
    action: 'Initialize in-place left rotation on array of 5 elements',
    explain: 'To rotate left by one position, every element from index 1 to 4 moves one position left, while the initial element at index 0 wraps around to the last index.',
    intuition: 'If we immediately copy nums[1] into nums[0], we destroy the original value 1. We must cache it first.'
  },
  {
    title: '2. Cache Head Element: temp = nums[0] (val 1)',
    phase: 'CACHE_HEAD',
    track: {
      label: 'Array nums',
      items: [
        { value: 1, status: 'match' },
        2, 3, 4, 5
      ],
      pointers: [
        { index: 0, label: 'temp = 1' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Cached temp', value: '1', highlight: true },
      { label: 'Slot 0 Status', value: 'Ready to Overwrite' },
      { label: 'Next Action', value: 'Shift from left to right' }
    ],
    variables: { temp: 1, 'nums[0]': 1, cacheLocation: 'temp register' },
    formula: 'temp = nums[0]; // temp = 1',
    action: 'Save nums[0] = 1 into temporary variable temp',
    explain: 'Storing nums[0] in variable temp frees up index 0 to safely receive incoming shifted values without data loss.',
    intuition: 'Caching single value ensures O(1) auxiliary memory consumption.'
  },
  {
    title: '3. Shift Step 1: nums[0] = nums[1] (Copy 2 into Index 0)',
    phase: 'SHIFTING',
    track: {
      label: 'Array nums',
      items: [
        { value: 2, status: 'current' },
        { value: 2, status: 'current' },
        3, 4, 5
      ],
      pointers: [
        { index: 0, label: 'dest' },
        { index: 1, label: 'src' }
      ]
    },
    activeI: 0,
    activeJ: 1,
    metrics: [
      { label: 'Shifted Index', value: 'i = 0' },
      { label: 'New nums[0]', value: '2' },
      { label: 'Cached temp', value: '1' }
    ],
    variables: { i: 0, 'nums[0]': 2, 'nums[1]': 2, temp: 1 },
    formula: 'nums[0] = nums[1]; // nums[0] = 2',
    action: 'Copy element 2 from index 1 into index 0',
    explain: 'At i = 0, nums[0] receives nums[1] = 2. Index 0 now holds its final rotated value.',
    intuition: 'Element 2 takes its proper rotated position at the front.'
  },
  {
    title: '4. Shift Step 2: nums[1] = nums[2] (Copy 3 into Index 1)',
    phase: 'SHIFTING',
    track: {
      label: 'Array nums',
      items: [
        2,
        { value: 3, status: 'current' },
        { value: 3, status: 'current' },
        4, 5
      ],
      pointers: [
        { index: 1, label: 'dest' },
        { index: 2, label: 'src' }
      ]
    },
    activeI: 1,
    activeJ: 2,
    metrics: [
      { label: 'Shifted Index', value: 'i = 1' },
      { label: 'New nums[1]', value: '3' },
      { label: 'Cached temp', value: '1' }
    ],
    variables: { i: 1, 'nums[1]': 3, 'nums[2]': 3, temp: 1 },
    formula: 'nums[1] = nums[2]; // nums[1] = 3',
    action: 'Copy element 3 from index 2 into index 1',
    explain: 'At i = 1, nums[1] receives nums[2] = 3. The leftward wave continues.',
    intuition: 'Each element steps one index towards the front.'
  },
  {
    title: '5. Shift Step 3: nums[2] = nums[3] (Copy 4 into Index 2)',
    phase: 'SHIFTING',
    track: {
      label: 'Array nums',
      items: [
        2, 3,
        { value: 4, status: 'current' },
        { value: 4, status: 'current' },
        5
      ],
      pointers: [
        { index: 2, label: 'dest' },
        { index: 3, label: 'src' }
      ]
    },
    activeI: 2,
    activeJ: 3,
    metrics: [
      { label: 'Shifted Index', value: 'i = 2' },
      { label: 'New nums[2]', value: '4' },
      { label: 'Cached temp', value: '1' }
    ],
    variables: { i: 2, 'nums[2]': 4, 'nums[3]': 4, temp: 1 },
    formula: 'nums[2] = nums[3]; // nums[2] = 4',
    action: 'Copy element 4 from index 3 into index 2',
    explain: 'At i = 2, nums[2] receives nums[3] = 4.',
    intuition: 'Prefix [2, 3, 4] is now established.'
  },
  {
    title: '6. Shift Step 4: nums[3] = nums[4] (Copy 5 into Index 3)',
    phase: 'SHIFTING',
    track: {
      label: 'Array nums',
      items: [
        2, 3, 4,
        { value: 5, status: 'current' },
        { value: 5, status: 'current' }
      ],
      pointers: [
        { index: 3, label: 'dest' },
        { index: 4, label: 'src' }
      ]
    },
    activeI: 3,
    activeJ: 4,
    metrics: [
      { label: 'Shifted Index', value: 'i = 3' },
      { label: 'New nums[3]', value: '5' },
      { label: 'Shift Loop', value: 'Complete' }
    ],
    variables: { i: 3, 'nums[3]': 5, 'nums[4]': 5, temp: 1 },
    formula: 'nums[3] = nums[4]; // nums[3] = 5',
    action: 'Copy element 5 from index 4 into index 3. Loop ends',
    explain: 'At i = 3, nums[3] receives nums[4] = 5. All shifts are complete. Only the final slot nums[4] remains to be filled.',
    intuition: 'The last slot is vacant for the wrapped element.'
  },
  {
    title: '7. Wrap-Around Insertion: nums[4] = temp (val 1)',
    phase: 'WRAP_AROUND',
    track: {
      label: 'Array nums (Rotated)',
      items: [
        2, 3, 4, 5,
        { value: 1, status: 'match' }
      ],
      pointers: [
        { index: 4, label: 'temp -> tail' }
      ]
    },
    activeI: 4,
    activeJ: null,
    metrics: [
      { label: 'nums[N-1]', value: '1', highlight: true },
      { label: 'Source', value: 'Cached temp' },
      { label: 'Array State', value: '[2, 3, 4, 5, 1]' }
    ],
    variables: { 'nums[4]': 1, temp: 1, array: '[2, 3, 4, 5, 1]' },
    formula: 'nums[N - 1] = temp; // nums[4] = 1',
    action: 'Assign cached value 1 into the last slot nums[4]',
    explain: 'We assign temp (1) into the vacant last slot nums[4]. The wrap-around is complete.',
    intuition: 'The head has officially migrated to the tail.'
  },
  {
    title: '8. Completed: Array Rotated Left by 1 in O(N) Time & O(1) Space',
    phase: 'COMPLETED',
    track: {
      label: 'Final Rotated Array nums',
      items: [
        { value: 2, status: 'match' },
        { value: 3, status: 'match' },
        { value: 4, status: 'match' },
        { value: 5, status: 'match' },
        { value: 1, status: 'match' }
      ],
      pointers: []
    },
    activeI: null,
    activeJ: null,
    metrics: [
      { label: 'Rotated Array', value: '[2, 3, 4, 5, 1]', highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1) In-Place' }
    ],
    variables: {
      initial: '[1, 2, 3, 4, 5]',
      final: '[2, 3, 4, 5, 1]',
      auxiliarySpace: '1 variable (temp)'
    },
    formula: 'Array left-rotated by 1 in N-1 copy operations',
    action: 'Left rotation complete. Result is [2, 3, 4, 5, 1].',
    explain: 'Array was shifted in-place with exactly N - 1 writes and 1 cached variable, completing in linear O(N) time and strictly O(1) extra space.',
    intuition: 'Minimal in-place cyclic permutation.'
  }
];

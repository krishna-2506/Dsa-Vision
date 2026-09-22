export const rendererType = 'array-scan';

export const meta = {
  title: 'Trapping Rainwater',
  category: 'Stack and Queues',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) optimal Two-Pointer',
  description: 'Calculates the total amount of rainwater trapped between elevation bars using the optimal two-pointer technique with leftMax and rightMax boundaries.'
};

export const ideaMap = [
  {
    id: 'trapping-physics',
    title: 'Water Trapping Physics',
    description: 'The height of water column trapped at index i is determined strictly by min(max_left, max_right) - height[i].'
  },
  {
    id: 'two-pointer-reduction',
    title: 'Two-Pointer Space Optimization',
    description: 'Maintain pointers left=0 and right=n-1 with running leftMax and rightMax. We only need the smaller boundary to resolve a column.'
  },
  {
    id: 'left-boundary-rule',
    title: 'Left Boundary Invariant',
    description: 'If height[left] <= height[right], water trapped at left is guaranteed to be bounded by leftMax (since rightMax >= height[right] >= height[left]).'
  },
  {
    id: 'right-boundary-rule',
    title: 'Right Boundary Invariant',
    description: 'If height[right] < height[left], water trapped at right is guaranteed to be bounded by rightMax (since leftMax >= height[left] > height[right]).'
  },
  {
    id: 'linear-convergence',
    title: 'Single Pass Resolution',
    description: 'Each step processes and increments/decrements one pointer, accumulating trapped water in exactly O(N) time and O(1) auxiliary space.'
  }
];

export const solutions = {
  cpp: `// C++: Trapping Rainwater using Two Pointers
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

int trap(vector<int>& height) {
    int n = height.size();
    int left = 0, right = n - 1;
    int leftMax = 0, rightMax = 0;
    int totalWater = 0;

    while (left <= right) {
        if (height[left] <= height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                totalWater += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                totalWater += rightMax - height[right];
            }
            right--;
        }
    }
    return totalWater;
}`,
  java: `// Java: Trapping Rainwater using Two Pointers
class Solution {
    public int trap(int[] height) {
        int n = height.length;
        int left = 0, right = n - 1;
        int leftMax = 0, rightMax = 0;
        int totalWater = 0;

        while (left <= right) {
            if (height[left] <= height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    totalWater += leftMax - height[left];
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    totalWater += rightMax - height[right];
                }
                right--;
            }
        }
        return totalWater;
    }
}`,
  python: `# Python 3: Trapping Rainwater using Two Pointers
def trap(height: list[int]) -> int:
    n = len(height)
    left, right = 0, n - 1
    left_max = right_max = 0
    total_water = 0

    while left <= right:
        if height[left] <= height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                total_water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                total_water += right_max - height[right]
            right -= 1

    return total_water`,
  javascript: `// JavaScript: Trapping Rainwater using Two Pointers
function trap(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let totalWater = 0;

    while (left <= right) {
        if (height[left] <= height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                totalWater += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                totalWater += rightMax - height[right];
            }
            right--;
        }
    }
    return totalWater;
}`
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Initialize Two Pointers at Elevation Extremes',
    explanation: 'Place left=0 at height 0 and right=7 at height 1. Initialize leftMax=0, rightMax=0, and totalWater=0.',
    activeLine: 21,
    activeIdeaId: 'two-pointer-reduction',
    track: [0, 1, 0, 2, 1, 0, 1, 3],
    auxiliaryTrack: [0, 0, 0, 0, 0, 0, 0, 0],
    highlightIndices: [0, 7],
    pointers: { left: 0, right: 7 },
    variables: { left: 0, right: 7, leftMax: 0, rightMax: 0, totalWater: 0 },
    customCard: {
      title: 'Boundary State',
      rows: [
        { label: 'leftMax', value: '0' },
        { label: 'rightMax', value: '0' },
        { label: 'Total Water Trapped', value: '0 units' },
        { label: 'Active Pointer Condition', value: 'height[left] (0) <= height[right] (3)' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Process Left Index 0: Update leftMax to 0 & Advance',
    explanation: 'Since height[left]=0 <= height[right]=3, we evaluate left. height[0]=0 >= leftMax (0), so leftMax remains 0. Water trapped at index 0 is 0. Advance left to 1.',
    activeLine: 28,
    activeIdeaId: 'left-boundary-rule',
    track: [0, 1, 0, 2, 1, 0, 1, 3],
    auxiliaryTrack: [0, 0, 0, 0, 0, 0, 0, 0],
    highlightIndices: [0],
    pointers: { left: 1, right: 7 },
    variables: { left: 1, right: 7, leftMax: 0, rightMax: 0, totalWater: 0 },
    customCard: {
      title: 'Left Advance',
      rows: [
        { label: 'leftMax', value: '0' },
        { label: 'Water at idx 0', value: '0' },
        { label: 'New left', value: '1 (height=1)' },
        { label: 'Comparison', value: 'height[1] (1) <= height[7] (3)' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Process Left Index 1: Update leftMax to 1 & Advance',
    explanation: 'height[1]=1 >= leftMax (0), so update leftMax = 1. Trapped water is 0. Advance left to index 2.',
    activeLine: 28,
    activeIdeaId: 'left-boundary-rule',
    track: [0, 1, 0, 2, 1, 0, 1, 3],
    auxiliaryTrack: [0, 0, 0, 0, 0, 0, 0, 0],
    highlightIndices: [1],
    pointers: { left: 2, right: 7 },
    variables: { left: 2, right: 7, leftMax: 1, rightMax: 0, totalWater: 0 },
    customCard: {
      title: 'New Left Peak',
      rows: [
        { label: 'Updated leftMax', value: '1' },
        { label: 'Trapped at idx 1', value: '0' },
        { label: 'Next Position', value: 'left=2 (height=0)' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Process Left Index 2: Trap Water Under leftMax (1 unit)',
    explanation: 'height[2]=0 <= height[7]=3. Since height[2]=0 < leftMax (1), trapped water = leftMax - height[2] = 1 - 0 = 1 unit. totalWater becomes 1. Advance left to 3.',
    activeLine: 30,
    activeIdeaId: 'trapping-physics',
    track: [0, 1, 0, 2, 1, 0, 1, 3],
    auxiliaryTrack: [0, 0, 1, 0, 0, 0, 0, 0],
    highlightIndices: [2],
    pointers: { left: 3, right: 7 },
    variables: { left: 3, right: 7, leftMax: 1, rightMax: 0, totalWater: 1 },
    customCard: {
      title: 'Water Trapped at Index 2',
      rows: [
        { label: 'leftMax', value: '1' },
        { label: 'height[2]', value: '0' },
        { label: 'Water Trapped', value: '1 - 0 = 1 unit' },
        { label: 'Accumulated Water', value: '1 unit' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Process Left Index 3: Update leftMax to 2 & Advance',
    explanation: 'height[3]=2 <= height[7]=3. Since height[3]=2 >= leftMax (1), update leftMax = 2. Trapped water is 0. Advance left to 4.',
    activeLine: 28,
    activeIdeaId: 'left-boundary-rule',
    track: [0, 1, 0, 2, 1, 0, 1, 3],
    auxiliaryTrack: [0, 0, 1, 0, 0, 0, 0, 0],
    highlightIndices: [3],
    pointers: { left: 4, right: 7 },
    variables: { left: 4, right: 7, leftMax: 2, rightMax: 0, totalWater: 1 },
    customCard: {
      title: 'Left Peak Raised',
      rows: [
        { label: 'Updated leftMax', value: '2' },
        { label: 'Trapped at idx 3', value: '0' },
        { label: 'Current totalWater', value: '1' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Process Left Index 4: Trap Water Under leftMax=2 (1 unit)',
    explanation: 'height[4]=1 <= height[7]=3. height[4]=1 < leftMax (2), so trapped water = leftMax - height[4] = 2 - 1 = 1 unit. totalWater becomes 2. Advance left to 5.',
    activeLine: 30,
    activeIdeaId: 'trapping-physics',
    track: [0, 1, 0, 2, 1, 0, 1, 3],
    auxiliaryTrack: [0, 0, 1, 0, 1, 0, 0, 0],
    highlightIndices: [4],
    pointers: { left: 5, right: 7 },
    variables: { left: 5, right: 7, leftMax: 2, rightMax: 0, totalWater: 2 },
    customCard: {
      title: 'Water Trapped at Index 4',
      rows: [
        { label: 'Formula', value: 'leftMax - height[4] = 2 - 1 = 1' },
        { label: 'Accumulated totalWater', value: '2 units' },
        { label: 'Next Position', value: 'left=5 (height=0)' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Process Left Index 5 & 6: Trap 2 + 1 = 3 units of Water',
    explanation: 'At index 5 (height 0): trapped = 2 - 0 = 2 units. At index 6 (height 1): trapped = 2 - 1 = 1 unit. totalWater increases by 3 to reach 5 units. Advance left to 7.',
    activeLine: 30,
    activeIdeaId: 'trapping-physics',
    track: [0, 1, 0, 2, 1, 0, 1, 3],
    auxiliaryTrack: [0, 0, 1, 0, 1, 2, 1, 0],
    highlightIndices: [5, 6],
    pointers: { left: 7, right: 7 },
    variables: { left: 7, right: 7, leftMax: 2, rightMax: 0, totalWater: 5 },
    customCard: {
      title: 'Mid-Array Deep Valley Trapping',
      rows: [
        { label: 'Trapped at idx 5', value: '2 units (2 - 0)' },
        { label: 'Trapped at idx 6', value: '1 unit (2 - 1)' },
        { label: 'Subtotal at Valley', value: '3 units' },
        { label: 'Accumulated totalWater', value: '5 units' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Pointers Meet at Global Maximum: Trapping Completed',
    explanation: 'left=7, right=7. height[7]=3 >= leftMax, update leftMax=3. left advances past right (left > right). Loop terminates. Total trapped water is 5 units in O(N) time and O(1) space.',
    activeLine: 25,
    activeIdeaId: 'linear-convergence',
    track: [0, 1, 0, 2, 1, 0, 1, 3],
    auxiliaryTrack: [0, 0, 1, 0, 1, 2, 1, 0],
    highlightIndices: [7],
    pointers: { left: 8, right: 7 },
    variables: { left: 8, right: 7, leftMax: 3, rightMax: 0, totalWater: 5 },
    customCard: {
      title: 'Final Trapping Result',
      rows: [
        { label: 'Total Water Trapped', value: '5 units' },
        { label: 'Water Vector per Column', value: '[0, 0, 1, 0, 1, 2, 1, 0]' },
        { label: 'Time Complexity', value: 'O(N)' },
        { label: 'Space Complexity', value: 'O(1) Auxiliary' }
      ]
    }
  }
];

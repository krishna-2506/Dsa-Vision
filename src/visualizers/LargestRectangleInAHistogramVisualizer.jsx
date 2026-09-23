export const rendererType = 'stack';

export const meta = {
  title: 'Largest Rectangle in Histogram',
  category: 'Stack and Queues',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Finds the largest rectangular area in a histogram using a monotonic increasing stack to compute previous and next smaller boundaries for each bar in linear time.'
};

export const ideaMap = [
  {
    id: 'histogram-area',
    title: 'Rectangular Expansion Principle',
    description: 'Every bar with height h can extend left and right until encountering a bar with height strictly smaller than h.'
  },
  {
    id: 'monotonic-stack',
    title: 'Monotonic Increasing Stack',
    description: 'Store indices in strictly increasing order of height. When a smaller bar arrives, it acts as the right boundary for taller bars in the stack.'
  },
  {
    id: 'boundary-resolution',
    title: 'Width Calculation Formula',
    description: 'When popping index mid: right boundary is current index i, and left boundary is the new stack top. Width = i - stack.top() - 1 (or i if stack empty).'
  },
  {
    id: 'virtual-sentinel',
    title: 'Virtual Zero Sentinel at i=N',
    description: 'Simulating an extra bar of height 0 at index N forces all remaining bars in the stack to be flushed and evaluated.'
  },
  {
    id: 'linear-amortization',
    title: 'Amortized O(N) Complexity',
    description: 'Every index is pushed onto the stack exactly once and popped at most once, guaranteeing strict linear time.'
  }
];

export const solutions = {
  cpp: `// C++: Largest Rectangle in Histogram using Monotonic Stack
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <stack>
#include <algorithm>
using namespace std;

int largestRectangleArea(vector<int>& heights) {
    int n = heights.size();
    stack<int> st;
    int maxArea = 0;

    for (int i = 0; i <= n; i++) {
        while (!st.empty() && (i == n || heights[st.top()] >= heights[i])) {
            int height = heights[st.top()];
            st.pop();
            int width = st.empty() ? i : i - st.top() - 1;
            maxArea = max(maxArea, height * width);
        }
        st.push(i);
    }
    return maxArea;
}`,
  java: `// Java: Largest Rectangle in Histogram using Monotonic Stack
import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        Deque<Integer> st = new ArrayDeque<>();
        int maxArea = 0;

        for (int i = 0; i <= n; i++) {
            while (!st.isEmpty() && (i == n || heights[st.peek()] >= heights[i])) {
                int height = heights[st.pop()];
                int width = st.isEmpty() ? i : i - st.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            st.push(i);
        }
        return maxArea;
    }
}`,
  python: `# Python 3: Largest Rectangle in Histogram using Monotonic Stack
def largestRectangleArea(heights: list[int]) -> int:
    st = []
    max_area = 0
    n = len(heights)

    for i in range(n + 1):
        curr_h = heights[i] if i < n else 0
        while st and heights[st[-1]] >= curr_h:
            h = heights[st.pop()]
            w = i if not st else i - st[-1] - 1
            max_area = max(max_area, h * w)
        st.append(i)

    return max_area`,
  javascript: `// JavaScript: Largest Rectangle in Histogram using Monotonic Stack
function largestRectangleArea(heights) {
    const st = [];
    let maxArea = 0;
    const n = heights.length;

    for (let i = 0; i <= n; i++) {
        const currHeight = i < n ? heights[i] : 0;
        while (st.length > 0 && heights[st[st.length - 1]] >= currHeight) {
            const h = heights[st.pop()];
            const w = st.length === 0 ? i : i - st[st.length - 1] - 1;
            maxArea = Math.max(maxArea, h * w);
        }
        st.push(i);
    }

    return maxArea;
}`
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Initialize Monotonic Stack and Heights Array',
    explanation: 'Histogram bars are [2, 1, 5, 6, 2, 3]. Initialize an empty monotonic stack to store bar indices and maxArea = 0.',
    activeLine: 20,
    activeIdeaId: 'monotonic-stack',
    track: [2, 1, 5, 6, 2, 3],
    auxiliaryTrack: [],
    highlightIndices: [0],
    pointers: { i: 0 },
    variables: { i: 0, height: 2, stack: '[]', maxArea: 0 },
    customCard: {
      title: 'Monotonic Stack State',
      rows: [
        { label: 'Current Bar', value: 'index 0 (height = 2)' },
        { label: 'Stack Top', value: 'Empty' },
        { label: 'Action', value: 'Push index 0 onto stack' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Index 1 (h=1) < Stack Top (h=2): Pop & Compute Area',
    explanation: 'At i=1, height 1 is smaller than height 2 at stack top (idx 0). Pop idx 0: height = 2, width = 1 (stack empty -> width = i = 1). Area = 2 * 1 = 2. Update maxArea = 2. Push index 1.',
    activeLine: 26,
    activeIdeaId: 'boundary-resolution',
    track: [2, 1, 5, 6, 2, 3],
    auxiliaryTrack: [2],
    highlightIndices: [0, 1],
    pointers: { i: 1 },
    variables: { i: 1, poppedHeight: 2, width: 1, area: 2, maxArea: 2 },
    customCard: {
      title: 'Area Resolution for Bar 0',
      rows: [
        { label: 'Popped Height', value: '2' },
        { label: 'Resolved Width', value: 'i = 1' },
        { label: 'Calculated Area', value: '2 * 1 = 2' },
        { label: 'New Stack', value: '[1] (height=1)' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Push Increasing Bars: Index 2 (h=5) and Index 3 (h=6)',
    explanation: 'height[2]=5 > height[1]=1 (push 2). height[3]=6 > height[2]=5 (push 3). Stack preserves strict monotonic increase: indices [1, 2, 3] with heights [1, 5, 6].',
    activeLine: 32,
    activeIdeaId: 'monotonic-stack',
    track: [2, 1, 5, 6, 2, 3],
    auxiliaryTrack: [1, 5, 6],
    highlightIndices: [2, 3],
    pointers: { i: 3 },
    variables: { i: 3, stack: '[1, 2, 3]', maxArea: 2 },
    customCard: {
      title: 'Monotonic Increasing Run',
      rows: [
        { label: 'Stack Indices', value: '[1, 2, 3]' },
        { label: 'Heights in Stack', value: '1 < 5 < 6' },
        { label: 'Next Incoming Bar', value: 'index 4 (height=2)' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Index 4 (h=2) Arrives: Pop Index 3 (h=6), Area = 6',
    explanation: 'height[4]=2 < height[3]=6. Pop idx 3: height = 6. Width = i - stack.top() - 1 = 4 - 2 - 1 = 1. Area = 6 * 1 = 6. Update maxArea = max(2, 6) = 6.',
    activeLine: 27,
    activeIdeaId: 'boundary-resolution',
    track: [2, 1, 5, 6, 2, 3],
    auxiliaryTrack: [1, 5],
    highlightIndices: [3, 4],
    pointers: { i: 4, popped: 3 },
    variables: { i: 4, poppedHeight: 6, width: 1, area: 6, maxArea: 6 },
    customCard: {
      title: 'Area Resolution for Bar 3',
      rows: [
        { label: 'Popped Bar', value: 'index 3 (h=6)' },
        { label: 'Left Boundary', value: 'index 2 (h=5)' },
        { label: 'Right Boundary', value: 'index 4 (h=2)' },
        { label: 'Computed Area', value: '6 * 1 = 6', accent: true }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Index 4 (h=2) Continued: Pop Index 2 (h=5), Area = 10 (NEW MAX)',
    explanation: 'Still height[4]=2 < height[2]=5. Pop idx 2: height = 5. Left boundary is stack top idx 1. Width = i - stack.top() - 1 = 4 - 1 - 1 = 2. Area = 5 * 2 = 10! Update maxArea = 10.',
    activeLine: 29,
    activeIdeaId: 'histogram-area',
    track: [2, 1, 5, 6, 2, 3],
    auxiliaryTrack: [1],
    highlightIndices: [2, 3, 4],
    pointers: { i: 4, popped: 2 },
    variables: { i: 4, poppedHeight: 5, width: 2, area: 10, maxArea: 10 },
    customCard: {
      title: 'Global Maximum Candidate Discovered',
      rows: [
        { label: 'Popped Bar', value: 'index 2 (h=5)' },
        { label: 'Span Range', value: 'Indices [2, 3] spanning width 2' },
        { label: 'Area Calculated', value: '5 * 2 = 10', accent: true },
        { label: 'Global maxArea', value: '10' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Push Index 4 (h=2) and Index 5 (h=3)',
    explanation: 'Now height[4]=2 >= height[1]=1, so push idx 4. Next, height[5]=3 > height[4]=2, push idx 5. Stack contains indices [1, 4, 5] representing heights [1, 2, 3].',
    activeLine: 32,
    activeIdeaId: 'monotonic-stack',
    track: [2, 1, 5, 6, 2, 3],
    auxiliaryTrack: [1, 2, 3],
    highlightIndices: [4, 5],
    pointers: { i: 5 },
    variables: { i: 5, stack: '[1, 4, 5]', maxArea: 10 },
    customCard: {
      title: 'End of Input Array',
      rows: [
        { label: 'Active Stack Indices', value: '[1, 4, 5]' },
        { label: 'Active Stack Heights', value: '[1, 2, 3]' },
        { label: 'Next Step', value: 'Sentinel bar at i = 6 (h = 0)' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Virtual Sentinel at i=6 (h=0): Flush Remaining Stack',
    explanation: 'At virtual index i=6 with height 0, all bars in stack are popped. Pop idx 5 (h=3, w=1, area=3). Pop idx 4 (h=2, w=6-1-1=4, area=2*4=8). None exceed maxArea = 10.',
    activeLine: 26,
    activeIdeaId: 'virtual-sentinel',
    track: [2, 1, 5, 6, 2, 3],
    auxiliaryTrack: [1],
    highlightIndices: [4, 5],
    pointers: { i: 6 },
    variables: { i: 6, popped: 'idx 4 (h=2)', width: 4, area: 8, maxArea: 10 },
    customCard: {
      title: 'Flushing Suffix Bars',
      rows: [
        { label: 'Popped Bar 5', value: 'h=3, w=1 -> Area = 3' },
        { label: 'Popped Bar 4', value: 'h=2, w=4 -> Area = 8' },
        { label: 'Current maxArea', value: '10' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Pop Final Bar 1 (h=1): Maximum Rectangle Area = 10',
    explanation: 'Pop idx 1 (h=1): stack is empty, so width = i = 6. Area = 1 * 6 = 6. All bars processed. Largest rectangular area in histogram is 10 units spanning bars [5, 6].',
    activeLine: 34,
    activeIdeaId: 'linear-amortization',
    track: [2, 1, 5, 6, 2, 3],
    auxiliaryTrack: [10],
    highlightIndices: [2, 3],
    pointers: {},
    variables: { maxArea: 10, bestRectangle: 'Indices 2..3 (Height=5, Width=2)' },
    customCard: {
      title: 'Final Optimal Result',
      rows: [
        { label: 'Largest Rectangle Area', value: '10 units', accent: true },
        { label: 'Bounding Bars', value: 'indices 2 & 3 (heights 5, 6)' },
        { label: 'Time Complexity', value: 'O(N) Amortized' },
        { label: 'Space Complexity', value: 'O(N) Monotonic Stack' }
      ]
    }
  }
];

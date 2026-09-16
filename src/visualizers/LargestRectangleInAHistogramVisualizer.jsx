import React from 'react';

export const meta = {
  title: 'Largest Rectangle in Histogram',
  category: 'Stack and Queues',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Finds the largest rectangular area possible in a given histogram using a monotonic increasing stack to compute the previous and next smaller boundaries for each bar in linear time.'
};

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
import java.util.Stack;

class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        Stack<Integer> st = new Stack<>();
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
  python: `# Python 3: Largest Rectangle in Histogram
def largest_rectangle_area(heights: list[int]) -> int:
    stack = []
    max_area = 0
    n = len(heights)

    for i in range(n + 1):
        while stack and (i == n or heights[stack[-1]] >= heights[i]):
            h = heights[stack.pop()]
            w = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, h * w)
        stack.append(i)

    return max_area`,
  javascript: `// JavaScript: Largest Rectangle in Histogram
function largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;
    const n = heights.length;

    for (let i = 0; i <= n; i++) {
        while (stack.length > 0 && (i === n || heights[stack[stack.length - 1]] >= heights[i])) {
            const h = heights[stack.pop()];
            const w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, h * w);
        }
        stack.push(i);
    }
    return maxArea;
}`
};

export const steps = [
  {
    title: '1. Initialize: heights = [2, 1, 5, 6, 2, 3]',
    phase: 'INIT',
    codeLine: 12,
    i: 0,
    stack: [],
    maxArea: 0,
    activeRect: null,
    heights: [2, 1, 5, 6, 2, 3],
    explain: 'Monotonic stack stores indices of bars in strictly increasing height order.'
  },
  {
    title: '2. Push i=0 (h=2). Then at i=1 (h=1), 2 >= 1 &rarr; Pop index 0',
    phase: 'POP',
    codeLine: 16,
    i: 1,
    stack: [1],
    maxArea: 2,
    activeRect: { start: 0, end: 0, h: 2, w: 1, area: 2 },
    heights: [2, 1, 5, 6, 2, 3],
    explain: 'Index 0 (h=2) popped. Width = 1. Area = 2 * 1 = 2. maxArea = 2.'
  },
  {
    title: '3. Push i=2 (h=5), i=3 (h=6) &rarr; Stack has [1, 2, 3]',
    phase: 'PUSH',
    codeLine: 20,
    i: 3,
    stack: [1, 2, 3],
    maxArea: 2,
    activeRect: null,
    heights: [2, 1, 5, 6, 2, 3],
    explain: 'Heights strictly increasing: 1 &lt; 5 &lt; 6. Indices 1, 2, 3 pushed.'
  },
  {
    title: '4. At i=4 (h=2): 6 >= 2 &rarr; Pop idx 3 (h=6), Width = 4 - 2 - 1 = 1, Area = 6',
    phase: 'EVALUATE',
    codeLine: 17,
    i: 4,
    stack: [1, 2],
    maxArea: 6,
    activeRect: { start: 3, end: 3, h: 6, w: 1, area: 6 },
    heights: [2, 1, 5, 6, 2, 3],
    explain: 'Bar 3 (h=6) popped. Left boundary is idx 2, right is idx 4. Area = 6. maxArea = 6.'
  },
  {
    title: '5. Still at i=4: 5 >= 2 &rarr; Pop idx 2 (h=5), Width = 4 - 1 - 1 = 2, Area = 10!',
    phase: 'MAX_FOUND',
    codeLine: 18,
    i: 4,
    stack: [1, 4],
    maxArea: 10,
    activeRect: { start: 2, end: 3, h: 5, w: 2, area: 10 },
    heights: [2, 1, 5, 6, 2, 3],
    explain: 'Bar 2 (h=5) popped! Span covers indices 2 and 3 (width=2). Area = 5 * 2 = 10! New maxArea = 10.'
  },
  {
    title: '6. Process remaining bars up to EOF: Global Max Area = 10',
    phase: 'COMPLETE',
    codeLine: 22,
    i: 6,
    stack: [],
    maxArea: 10,
    activeRect: { start: 2, end: 3, h: 5, w: 2, area: 10 },
    heights: [2, 1, 5, 6, 2, 3],
    explain: 'Remaining bars evaluated at end of array. Largest rectangle is spanned across indices [2..3] with area 10!'
  }
];

export default function LargestRectangleInAHistogramVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];
  const maxH = 6;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Max Rectangular Area: <strong className="text-base text-emerald-200">{step.maxArea}</strong>
        </div>
        {step.activeRect && (
          <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
            Active: h={step.activeRect.h} &times; w={step.activeRect.w} = <strong>{step.activeRect.area}</strong>
          </div>
        )}
      </div>

      {/* Histogram Rendering */}
      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl w-full">
        <div className="text-xs font-mono text-[#8a8ea3] flex items-center justify-between w-full px-2">
          <span>Histogram Columns</span>
          <span className="text-emerald-400 font-bold">Monotonic Stack Single-Pass</span>
        </div>

        <div className="flex items-end justify-center gap-2 w-full h-44 pt-4 px-4 border-b border-[#2d3144]">
          {step.heights.map((h, idx) => {
            const isInActive = step.activeRect && idx >= step.activeRect.start && idx <= step.activeRect.end;
            const isScanning = idx === step.i;

            return (
              <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end relative">
                {isScanning && (
                  <span className="absolute -top-5 text-[9px] font-mono font-bold text-amber-400 bg-amber-500/20 px-1 rounded">
                    i
                  </span>
                )}
                <div
                  style={{ height: `${(h / maxH) * 100}%` }}
                  className={`w-full transition-all duration-300 rounded-t-sm border flex items-center justify-center font-mono text-xs font-bold ${
                    isInActive
                      ? 'bg-emerald-500/40 border-emerald-400 text-emerald-100 shadow-lg shadow-emerald-500/20'
                      : 'bg-[#1e2130] border-[#373c54] text-[#b8bfdc]'
                  }`}
                >
                  {h}
                </div>
                <span className="text-[9px] font-mono text-[#5b607c] mt-1">[{idx}]</span>
              </div>
            );
          })}
        </div>

        <div className="text-xs font-mono text-[#8a8ea3] bg-[#161824] px-4 py-2 rounded-xl border border-[#272b3c] text-center w-full">
          When a smaller bar is encountered, previous bars expand horizontally as much as possible until blocked by their boundaries.
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Trapping Rainwater',
  category: 'Stack and Queues',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) optimal Two-Pointer',
  description: 'Calculates the total amount of rainwater trapped between elevation bars using the optimal two-pointer technique with `leftMax` and `rightMax` boundaries.'
};

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
        int left = 0, right = height.length - 1;
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
  python: `# Python 3: Trapping Rainwater Two Pointers
def trap(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    left_max, right_max = 0, 0
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
  javascript: `// JavaScript: Trapping Rainwater Two Pointers
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
    title: '1. Initialize: height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]',
    phase: 'INIT',
    codeLine: 12,
    left: 0,
    right: 11,
    leftMax: 0,
    rightMax: 0,
    totalWater: 0,
    trapped: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
    explain: 'left = 0, right = 11. Two pointers advance towards each other from both ends.'
  },
  {
    title: '2. Process left=0 & left=1: leftMax becomes 1',
    phase: 'UPDATE_MAX',
    codeLine: 18,
    left: 2,
    right: 11,
    leftMax: 1,
    rightMax: 1,
    totalWater: 0,
    trapped: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
    explain: 'Bar at index 1 has height 1, setting leftMax = 1. Bar at 11 sets rightMax = 1.'
  },
  {
    title: '3. At left=2 (height=0): Water trapped = leftMax - height = 1 - 0 = 1 unit',
    phase: 'TRAP',
    codeLine: 21,
    left: 3,
    right: 11,
    leftMax: 1,
    rightMax: 1,
    totalWater: 1,
    trapped: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
    explain: 'Because height[left] < leftMax, 1 unit of water is trapped above index 2! Total = 1.'
  },
  {
    title: '4. At left=3 (height=2): New leftMax = 2',
    phase: 'UPDATE_MAX',
    codeLine: 18,
    left: 4,
    right: 11,
    leftMax: 2,
    rightMax: 1,
    totalWater: 1,
    trapped: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
    explain: 'Bar height 2 establishes a new left barrier of height 2.'
  },
  {
    title: '5. Process mid indices (left=4..7): Trapped water at indices 4, 5, 6',
    phase: 'TRAP',
    codeLine: 21,
    left: 7,
    right: 8,
    leftMax: 2,
    rightMax: 2,
    totalWater: 5,
    trapped: [0, 0, 1, 0, 1, 2, 1, 0, 0, 0, 0, 0],
    heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
    explain: 'Water accumulates in the pit: 1 unit at idx 4, 2 units at idx 5, 1 unit at idx 6. Total = 5.'
  },
  {
    title: '6. Final Trapping at idx 9 & Completion: Total = 6 units of trapped water!',
    phase: 'COMPLETE',
    codeLine: 35,
    left: 7,
    right: 7,
    leftMax: 3,
    rightMax: 2,
    totalWater: 6,
    trapped: [0, 0, 1, 0, 1, 2, 1, 0, 0, 1, 0, 0],
    heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
    explain: 'Pointers meet at highest peak (height 3 at idx 7). All 6 units of water trapped correctly in O(N) time and O(1) space!'
  }
];

export default function TrappingRainwaterVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];
  const maxHeight = 3;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Trapped Rainwater: <strong className="text-base text-cyan-200">{step.totalWater} units</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300">
          leftMax: <strong>{step.leftMax}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          rightMax: <strong>{step.rightMax}</strong>
        </div>
      </div>

      {/* Elevation Histogram with Trapped Water */}
      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl w-full">
        <div className="text-xs font-mono text-[#8a8ea3] flex items-center justify-between w-full px-2">
          <span>Elevation Profile &amp; Water Reservoirs</span>
          <span className="text-cyan-400 font-bold">Two-Pointer O(1) Space</span>
        </div>

        <div className="flex items-end justify-center gap-1.5 w-full h-44 pt-4 px-2 border-b border-[#2d3144]">
          {step.heights.map((h, idx) => {
            const water = step.trapped[idx] || 0;
            const isLeft = idx === step.left;
            const isRight = idx === step.right;

            return (
              <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end relative">
                {/* Pointer Markers */}
                {isLeft && (
                  <span className="absolute -top-5 text-[8px] font-mono font-bold text-blue-400 bg-blue-500/20 px-1 rounded">
                    L
                  </span>
                )}
                {isRight && (
                  <span className="absolute -top-5 text-[8px] font-mono font-bold text-purple-400 bg-purple-500/20 px-1 rounded">
                    R
                  </span>
                )}

                {/* Trapped Water Block */}
                {water > 0 && (
                  <div
                    style={{ height: `${(water / maxHeight) * 100}%` }}
                    className="w-full bg-cyan-400/50 border-t border-x border-cyan-300 rounded-t-sm flex items-center justify-center font-mono text-[9px] text-cyan-100 font-bold"
                  >
                    +{water}
                  </div>
                )}

                {/* Solid Elevation Bar */}
                <div
                  style={{ height: `${(h / maxHeight) * 100}%` }}
                  className={`w-full transition-all duration-300 rounded-t-sm border flex items-center justify-center font-mono text-[10px] font-bold ${
                    h === 0
                      ? 'border-transparent text-transparent'
                      : 'bg-[#25293d] border-[#3f4566] text-[#b8bfdc]'
                  }`}
                >
                  {h > 0 ? h : ''}
                </div>
                <span className="text-[8px] font-mono text-[#525774] mt-1">{idx}</span>
              </div>
            );
          })}
        </div>

        <div className="text-xs font-mono text-[#8a8ea3] bg-[#161824] px-4 py-2 rounded-xl border border-[#272b3c] text-center w-full">
          Cyan layers denote trapped rainwater pockets bounded by the minimum of leftMax and rightMax.
        </div>
      </div>
    </div>
  );
}

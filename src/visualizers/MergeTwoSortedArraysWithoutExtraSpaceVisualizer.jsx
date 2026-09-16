import React from 'react';

export const meta = {
  title: 'Merge Two Sorted Arrays Without Extra Space',
  category: 'Arrays & In-Place Merging',
  difficulty: 'Medium',
  timeComplexity: 'O(min(N, M)) + O(N log N) + O(M log M)',
  spaceComplexity: 'O(1) In-Place',
  description: 'Merges two sorted arrays in-place without allocating a third array by swapping out-of-order elements from the tail of arr1 and the head of arr2, followed by internal sorting.'
};

export const solutions = {
  cpp: `// C++ Optimal In-Place Swap and Sort Merging
// Time Complexity: O(min(N, M)) + O(N log N) + O(M log M) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void merge(vector<int>& arr1, vector<int>& arr2, int n, int m) {
        int left = n - 1;
        int right = 0;

        // Swap larger elements from arr1 tail with smaller elements from arr2 head
        while (left >= 0 && right < m) {
            if (arr1[left] > arr2[right]) {
                swap(arr1[left], arr2[right]);
                left--;
                right++;
            } else {
                break; // Elements already segregated correctly
            }
        }

        // Sort both arrays individually
        sort(arr1.begin(), arr1.end());
        sort(arr2.begin(), arr2.end());
    }
};`,
  python: `# Python 3 Optimal In-Place Swap and Sort
class Solution:
    def merge(self, arr1: list[int], arr2: list[int]) -> None:
        n, m = len(arr1), len(arr2)
        left = n - 1
        right = 0

        while left >= 0 and right < m:
            if arr1[left] > arr2[right]:
                arr1[left], arr2[right] = arr2[right], arr1[left]
                left -= 1
                right += 1
            else:
                break

        arr1.sort()
        arr2.sort()`,
  java: `// Java Optimal In-Place Swap and Sort
import java.util.Arrays;

class Solution {
    public void merge(int[] arr1, int[] arr2, int n, int m) {
        int left = n - 1;
        int right = 0;

        while (left >= 0 && right < m) {
            if (arr1[left] > arr2[right]) {
                int temp = arr1[left];
                arr1[left] = arr2[right];
                arr2[right] = temp;
                left--;
                right++;
            } else {
                break;
            }
        }

        Arrays.sort(arr1);
        Arrays.sort(arr2);
    }
}`,
  javascript: `// JavaScript Optimal In-Place Swap and Sort
var merge = function(arr1, arr2) {
    const n = arr1.length, m = arr2.length;
    let left = n - 1, right = 0;

    while (left >= 0 && right < m) {
        if (arr1[left] > arr2[right]) {
            [arr1[left], arr2[right]] = [arr2[right], arr1[left]];
            left--;
            right++;
        } else {
            break;
        }
    }

    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);
};`
};

export const steps = [
  {
    title: '1. Initialize: arr1 = [1, 4, 8, 10], arr2 = [2, 3, 9]',
    phase: 'INITIAL',
    codeLine: 12,
    arr1: [1, 4, 8, 10],
    arr2: [2, 3, 9],
    left: 3,
    right: 0,
    variables: { left: 3, right: 0, 'arr1[left]': 10, 'arr2[right]': 2 },
    explain: 'left pointer starts at the largest element of arr1 (10). right pointer starts at the smallest element of arr2 (2).',
    intuition: 'If arr1[left] > arr2[right], they belong in each other\'s array. Swapping them segregates the elements into their rightful partitions.'
  },
  {
    title: '2. Swap 10 > 2: arr1[3] <=> arr2[0]',
    phase: 'SWAPPING',
    codeLine: 16,
    arr1: [1, 4, 8, 2],
    arr2: [10, 3, 9],
    left: 2,
    right: 1,
    variables: { 'swapped': '10 <=> 2', left: 2, right: 1 },
    explain: '10 > 2. Swap them! 2 moves into arr1 and 10 moves into arr2. Move left to 2, right to 1.',
    intuition: 'Largest element of arr1 pushed into arr2.'
  },
  {
    title: '3. Swap 8 > 3: arr1[2] <=> arr2[1]',
    phase: 'SWAPPING',
    codeLine: 16,
    arr1: [1, 4, 3, 2],
    arr2: [10, 8, 9],
    left: 1,
    right: 2,
    variables: { 'swapped': '8 <=> 3', left: 1, right: 2 },
    explain: '8 > 3. Swap them! 3 moves into arr1 and 8 moves into arr2. Move left to 1, right to 2.',
    intuition: 'Second out-of-order pair swapped.'
  },
  {
    title: '4. Check 4 <= 9: All Partitions Correct! Break Loop',
    phase: 'BREAK_LOOP',
    codeLine: 20,
    arr1: [1, 4, 3, 2],
    arr2: [10, 8, 9],
    left: 1,
    right: 2,
    variables: { 'arr1[1]': 4, 'arr2[2]': 9, 'condition': '4 <= 9 (Valid)', action: 'Break while loop' },
    explain: 'arr1[left]=4 is less than arr2[right]=9. Since arrays were originally sorted, all remaining elements in arr1 are guaranteed <= remaining in arr2. Segregation complete!',
    intuition: 'No further swaps needed.'
  },
  {
    title: '5. Internal Sort: arr1 -> [1, 2, 3, 4], arr2 -> [8, 9, 10]',
    phase: 'COMPLETED',
    codeLine: 25,
    arr1: [1, 2, 3, 4],
    arr2: [8, 9, 10],
    left: null,
    right: null,
    variables: { finalArr1: '[1, 2, 3, 4]', finalArr2: '[8, 9, 10]', spaceComplexity: 'O(1)' },
    explain: 'Sort arr1 and arr2 individually. Both arrays are now strictly sorted and merged across arrays in O(1) extra space!',
    intuition: 'Optimal in-place segregation achieved.'
  }
];

export default function MergeTwoSortedArraysWithoutExtraSpaceVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Array 1 */}
      <div className="w-full flex flex-col items-center gap-1.5">
        <span className="text-xs font-mono text-[#8a8ea3]">Array 1 (arr1):</span>
        <div className="flex items-center gap-2">
          {step.arr1.map((val, idx) => {
            const isLeft = step.left === idx;

            return (
              <div key={idx} className="flex flex-col items-center gap-1 min-w-[46px]">
                <div className="h-5 flex items-center text-[9px] font-mono font-bold">
                  {isLeft && <span className="px-1.5 py-0.5 rounded bg-amber-500 text-white">left</span>}
                </div>
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono text-base font-bold transition-all ${
                  isLeft ? 'bg-amber-500/25 text-amber-300 border-amber-400 scale-105 shadow-md shadow-amber-500/20' : 'bg-[#181a24] text-white border-[#2b2e40]'
                }`}>
                  {val}
                </div>
                <span className="text-[9px] font-mono text-[#5b6076]">[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Swap indicator */}
      <div className="text-xs font-mono text-[#555a72]">
        ↕ Swap between arr1 tail and arr2 head ↕
      </div>

      {/* Array 2 */}
      <div className="w-full flex flex-col items-center gap-1.5">
        <span className="text-xs font-mono text-[#8a8ea3]">Array 2 (arr2):</span>
        <div className="flex items-center gap-2">
          {step.arr2.map((val, idx) => {
            const isRight = step.right === idx;

            return (
              <div key={idx} className="flex flex-col items-center gap-1 min-w-[46px]">
                <div className="h-5 flex items-center text-[9px] font-mono font-bold">
                  {isRight && <span className="px-1.5 py-0.5 rounded bg-indigo-500 text-white">right</span>}
                </div>
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-mono text-base font-bold transition-all ${
                  isRight ? 'bg-indigo-500/25 text-indigo-300 border-indigo-400 scale-105 shadow-md shadow-indigo-500/20' : 'bg-[#181a24] text-white border-[#2b2e40]'
                }`}>
                  {val}
                </div>
                <span className="text-[9px] font-mono text-[#5b6076]">[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

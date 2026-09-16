import React from 'react';

export const meta = {
  title: 'Rearrange Array Elements by Sign',
  category: 'Arrays & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N)',
  description: 'Rearranges an array of even length containing equal numbers of positive and negative integers such that positive and negative integers alternate, starting with a positive number, preserving relative order.'
};

export const solutions = {
  cpp: `// C++ Optimal O(N) Alternating Placement
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> rearrangeArray(vector<int>& nums) {
        int n = nums.size();
        vector<int> ans(n, 0);
        int posIndex = 0;
        int negIndex = 1;

        for (int i = 0; i < n; i++) {
            if (nums[i] > 0) {
                ans[posIndex] = nums[i];
                posIndex += 2;
            } else {
                ans[negIndex] = nums[i];
                negIndex += 2;
            }
        }
        return ans;
    }
};`,
  python: `# Python 3 Optimal Single-Pass Sign Alternating Placement
class Solution:
    def rearrangeArray(self, nums: list[int]) -> list[int]:
        n = len(nums)
        ans = [0] * n
        pos_idx, neg_idx = 0, 1

        for x in nums:
            if x > 0:
                ans[pos_idx] = x
                pos_idx += 2
            else:
                ans[neg_idx] = x
                neg_idx += 2

        return ans`,
  java: `// Java Optimal Single-Pass Sign Alternating Placement
class Solution {
    public int[] rearrangeArray(int[] nums) {
        int n = nums.length;
        int[] ans = new int[n];
        int posIndex = 0;
        int negIndex = 1;

        for (int i = 0; i < n; i++) {
            if (nums[i] > 0) {
                ans[posIndex] = nums[i];
                posIndex += 2;
            } else {
                ans[negIndex] = nums[i];
                negIndex += 2;
            }
        }
        return ans;
    }
}`,
  javascript: `// JavaScript Optimal Single-Pass Sign Alternating Placement
var rearrangeArray = function(nums) {
    const n = nums.length;
    const ans = new Array(n);
    let posIndex = 0;
    let negIndex = 1;

    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) {
            ans[posIndex] = nums[i];
            posIndex += 2;
        } else {
            ans[negIndex] = nums[i];
            negIndex += 2;
        }
    }
    return ans;
};`
};

export const steps = [
  {
    title: '1. Initialize: posIndex=0 (Even), negIndex=1 (Odd)',
    phase: 'INITIALIZATION',
    codeLine: 12,
    input: [3, 1, -2, -5, 2, -4],
    currentIdx: null,
    ans: [null, null, null, null, null, null],
    posIndex: 0,
    negIndex: 1,
    variables: { posIndex: 0, negIndex: 1, currentElement: 'None' },
    explain: 'Positive numbers belong at even indices (0, 2, 4, ...), and negative numbers belong at odd indices (1, 3, 5, ...). We maintain two independent index pointers.',
    intuition: 'Stepping pointers by +2 allows direct placement in a single pass without extra segregation steps.'
  },
  {
    title: '2. Process nums[0] = 3 (>0): Place at ans[posIndex=0]',
    phase: 'PLACING_POS',
    codeLine: 16,
    input: [3, 1, -2, -5, 2, -4],
    currentIdx: 0,
    ans: [3, null, null, null, null, null],
    posIndex: 2,
    negIndex: 1,
    variables: { 'nums[0]': 3, 'ans[0]': 3, newPosIndex: 2 },
    explain: '3 is positive. Place at ans[0]. Increment posIndex by 2 -> posIndex is now 2.',
    intuition: 'Even slot 0 filled with first positive number.'
  },
  {
    title: '3. Process nums[1] = 1 (>0): Place at ans[posIndex=2]',
    phase: 'PLACING_POS',
    codeLine: 16,
    input: [3, 1, -2, -5, 2, -4],
    currentIdx: 1,
    ans: [3, null, 1, null, null, null],
    posIndex: 4,
    negIndex: 1,
    variables: { 'nums[1]': 1, 'ans[2]': 1, newPosIndex: 4 },
    explain: '1 is positive. Place at next even index ans[2]. posIndex advances to 4.',
    intuition: 'Second positive number secured at index 2.'
  },
  {
    title: '4. Process nums[2] = -2 (<0): Place at ans[negIndex=1]',
    phase: 'PLACING_NEG',
    codeLine: 19,
    input: [3, 1, -2, -5, 2, -4],
    currentIdx: 2,
    ans: [3, -2, 1, null, null, null],
    posIndex: 4,
    negIndex: 3,
    variables: { 'nums[2]': -2, 'ans[1]': -2, newNegIndex: 3 },
    explain: '-2 is negative. Place at first odd index ans[1]. negIndex advances to 3.',
    intuition: 'Odd slot 1 filled with first negative number.'
  },
  {
    title: '5. Process nums[3] = -5 (<0): Place at ans[negIndex=3]',
    phase: 'PLACING_NEG',
    codeLine: 19,
    input: [3, 1, -2, -5, 2, -4],
    currentIdx: 3,
    ans: [3, -2, 1, -5, null, null],
    posIndex: 4,
    negIndex: 5,
    variables: { 'nums[3]': -5, 'ans[3]': -5, newNegIndex: 5 },
    explain: '-5 is negative. Place at ans[3]. negIndex advances to 5.',
    intuition: 'Next negative number placed at odd index 3.'
  },
  {
    title: '6. Process nums[4] = 2 (>0): Place at ans[posIndex=4]',
    phase: 'PLACING_POS',
    codeLine: 16,
    input: [3, 1, -2, -5, 2, -4],
    currentIdx: 4,
    ans: [3, -2, 1, -5, 2, null],
    posIndex: 6,
    negIndex: 5,
    variables: { 'nums[4]': 2, 'ans[4]': 2, newPosIndex: 6 },
    explain: '2 is positive. Place at ans[4]. posIndex advances to 6.',
    intuition: 'Last positive element placed.'
  },
  {
    title: '7. Process nums[5] = -4 (<0): Place at ans[negIndex=5]',
    phase: 'COMPLETED',
    codeLine: 19,
    input: [3, 1, -2, -5, 2, -4],
    currentIdx: 5,
    ans: [3, -2, 1, -5, 2, -4],
    posIndex: 6,
    negIndex: 7,
    variables: { result: '[3, -2, 1, -5, 2, -4]', status: 'Completed in O(N) time' },
    explain: '-4 is negative. Place at ans[5]. All elements have been arranged with alternating signs while preserving original order!',
    intuition: 'Linear O(N) single scan completes without shifting elements.'
  }
];

export default function RearrangeArrayElementsBySignVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Pointers Indicator */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold">
          posIndex (Even): {step.posIndex}
        </span>
        <span className="px-3 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 font-semibold">
          negIndex (Odd): {step.negIndex}
        </span>
      </div>

      {/* Input Array Section */}
      <div className="w-full flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-[#8a8ea3]">Input Array (nums):</span>
        <div className="flex items-center gap-2.5">
          {step.input.map((val, idx) => {
            const isCurrent = step.currentIdx === idx;
            const isPos = val > 0;

            return (
              <div key={idx} className="flex flex-col items-center gap-1 min-w-[46px]">
                <div className={`w-11 h-11 rounded-lg border flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 ${
                  isCurrent ? 'bg-amber-500/25 text-amber-300 border-amber-400 scale-110 shadow-lg shadow-amber-500/20' :
                  isPos ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' :
                  'bg-rose-500/10 text-rose-300 border-rose-500/30'
                }`}>
                  {val > 0 ? `+${val}` : val}
                </div>
                <span className="text-[9px] font-mono text-[#5b6076]">[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Downward Arrow */}
      <div className="text-[#555a72] font-mono text-xs">
        ↓ Placing into Alternating Slots ↓
      </div>

      {/* Result Array Section */}
      <div className="w-full flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-[#8a8ea3]">Result Array (ans):</span>
        <div className="flex items-center gap-2.5">
          {step.ans.map((val, idx) => {
            const isPosSlot = idx % 2 === 0;

            return (
              <div key={idx} className="flex flex-col items-center gap-1 min-w-[46px]">
                <div className={`w-11 h-11 rounded-lg border flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 ${
                  val === null ? 'bg-[#141620] text-[#45495e] border-dashed border-[#2b2e40]' :
                  val > 0 ? 'bg-emerald-500/20 text-emerald-200 border-emerald-500/50 shadow-sm' :
                  'bg-rose-500/20 text-rose-200 border-rose-500/50 shadow-sm'
                }`}>
                  {val === null ? (isPosSlot ? '+' : '-') : (val > 0 ? `+${val}` : val)}
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

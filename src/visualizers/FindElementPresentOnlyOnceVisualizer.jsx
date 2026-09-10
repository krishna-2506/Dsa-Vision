import React, { useState } from 'react';
import ArrayView from '../components/primitives/ArrayView';

// 0. Multi-language production solution code with detailed educational comments
export const solutions = {
  cpp: `// C++ Optimal Solution: Bitwise XOR
// Time Complexity: O(N) as we iterate through the array once
// Space Complexity: O(1) using only one integer variable

class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int xorSum = 0; // Initialize accumulator with 0 (identity element for XOR)

        // XOR each element in the array:
        // Properties of XOR:
        // 1. a ^ a = 0 (same elements cancel each other out)
        // 2. a ^ 0 = a
        // 3. Commutative & Associative
        for (int num : nums) {
            xorSum ^= num;
        }

        // The remaining value is the unique element that appeared once
        return xorSum;
    }
};
`,
  python: `# Python 3 Optimal Solution: Bitwise XOR
# Time Complexity: O(N) | Space Complexity: O(1)

class Solution:
    def singleNumber(self, nums: list[int]) -> int:
        xor_sum = 0
        # XOR every number: duplicates cancel out (x ^ x = 0)
        for num in nums:
            xor_sum ^= num
        return xor_sum
`,
  java: `// Java Optimal Solution: Bitwise XOR
// Time Complexity: O(N) | Space Complexity: O(1)

class Solution {
    public int singleNumber(int[] nums) {
        int xorSum = 0;
        // XORing all elements leaves only the single element
        for (int num : nums) {
            xorSum ^= num;
        }
        return xorSum;
    }
}
`,
  javascript: `// JavaScript Optimal Solution: Bitwise XOR
// Time Complexity: O(N) | Space Complexity: O(1)

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let xorSum = 0;
    for (let num of nums) {
        xorSum ^= num;
    }
    return xorSum;
};
`,
};

export const meta = {
  display_id: 'Q-013',
  title: "Find Element Present Only Once",
  category: "1. Arrays",
  difficulty: "Easy",
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  description: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one using linear time and O(1) space."
};

const SAMPLE_DATA = [4, 1, 2, 1, 2];

export const steps = [
  {
    title: "1. Initialize XOR Accumulator",
    codeLine: 8,
    code: "int xorSum = 0;",
    explanation: "We initialize `xorSum = 0`. XOR identity property: (x ^ 0 = x) and (x ^ x = 0).",
    pointers: [{ index: 0, label: 'i', color: 'indigo' }],
    highlightIndices: [],
    hudText: "xorSum = 0 (Binary: 000)"
  },
  {
    title: "2. XOR with nums[0] = 4",
    codeLine: 16,
    code: "xorSum ^= nums[0]; // 0 ^ 4 = 4",
    explanation: "Process index 0: value 4 (100 in binary). `xorSum = 0 ^ 4 = 4`.",
    pointers: [{ index: 0, label: 'num=4', color: 'indigo' }],
    highlightIndices: [0],
    hudText: "xorSum = 4 (Binary: 100)"
  },
  {
    title: "3. XOR with nums[1] = 1",
    codeLine: 16,
    code: "xorSum ^= nums[1]; // 4 ^ 1 = 5",
    explanation: "Process index 1: value 1 (001 in binary). `xorSum = 4 ^ 1 = 5` (101 in binary).",
    pointers: [{ index: 1, label: 'num=1', color: 'indigo' }],
    highlightIndices: [1],
    hudText: "xorSum = 5 (Binary: 101)"
  },
  {
    title: "4. XOR with nums[2] = 2",
    codeLine: 16,
    code: "xorSum ^= nums[2]; // 5 ^ 2 = 7",
    explanation: "Process index 2: value 2 (010 in binary). `xorSum = 5 ^ 2 = 7` (111 in binary).",
    pointers: [{ index: 2, label: 'num=2', color: 'indigo' }],
    highlightIndices: [2],
    hudText: "xorSum = 7 (Binary: 111)"
  },
  {
    title: "5. XOR with nums[3] = 1 (Cancels previous 1)",
    codeLine: 16,
    code: "xorSum ^= nums[3]; // 7 ^ 1 = 6 (1 cancels!)",
    explanation: "Process index 3: value 1 again! Since 1 was already XORed, `(1 ^ 1 = 0)` cancels it out. `xorSum = 7 ^ 1 = 6` (110 in binary).",
    pointers: [{ index: 3, label: 'num=1 (cancel)', color: 'amber' }],
    highlightIndices: [1, 3],
    hudText: "xorSum = 6 (1 cancelled out!)"
  },
  {
    title: "6. XOR with nums[4] = 2 (Cancels previous 2)",
    codeLine: 16,
    code: "xorSum ^= nums[4]; // 6 ^ 2 = 4 (2 cancels!)",
    explanation: "Process index 4: value 2 again! 2 cancels out `(2 ^ 2 = 0)`. `xorSum = 6 ^ 2 = 4`.",
    pointers: [{ index: 4, label: 'num=2 (cancel)', color: 'emerald' }],
    highlightIndices: [2, 4],
    hudText: "xorSum = 4 (2 cancelled out!)"
  },
  {
    title: "7. Final Result Found",
    codeLine: 20,
    code: "return xorSum; // Returns 4",
    explanation: "All pairs [1, 1] and [2, 2] cancelled each other out to 0. The only remaining value is 4, which appears only once! Algorithm completes in O(N) time and O(1) space.",
    pointers: [{ index: 0, label: 'Unique: 4', color: 'indigo' }],
    highlightIndices: [0],
    hudText: "Single Element = 4 (Completed!)"
  }
];

export default function FindElementPresentOnlyOnceVisualizer({ currentStep: externalStep, onStepChange }) {
  const [internalStep, setInternalStep] = useState(0);
  const stepIndex = externalStep !== undefined ? externalStep : internalStep;
  const setStep = onStepChange || setInternalStep;
  const stepData = steps[stepIndex] || steps[0];

  const handleNext = () => { if (stepIndex < steps.length - 1) setStep(stepIndex + 1); };
  const handlePrev = () => { if (stepIndex > 0) setStep(stepIndex - 1); };

  return (
    <div className="w-full flex flex-col bg-[#0b0d14] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      {/* 1. Sub-Header Bar */}
      <div className="px-5 py-3 bg-[#0e111a] border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
            Step {stepIndex + 1} / {steps.length}
          </span>
          <h3 className="text-sm font-bold text-white font-mono">{stepData.title}</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={handlePrev} disabled={stepIndex === 0} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 disabled:opacity-30 text-slate-300 text-xs font-mono rounded border border-white/5 transition">
            ← Prev
          </button>
          <button onClick={handleNext} disabled={stepIndex === steps.length - 1} className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white text-xs font-mono font-medium rounded transition">
            Next →
          </button>
        </div>
      </div>

      {/* 2. Visualizer Canvas */}
      <div className="p-6 flex flex-col items-center justify-center bg-[#08090e]/60 min-h-[240px]">
        <ArrayView items={SAMPLE_DATA} pointers={stepData.pointers || []} matchIndices={stepData.highlightIndices || []} />
        
        {/* Real-time HUD Status */}
        <div className="mt-5 flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs shadow-inner">
          <span className="text-zinc-400">Status: <strong className="text-indigo-400">{stepData.hudText || 'Processing...'}</strong></span>
        </div>
      </div>

      {/* 3. Explanation Footer */}
      <div className="px-5 py-3 bg-[#0c0e16] border-t border-white/5 text-xs text-slate-300 leading-relaxed font-sans">
        <span className="text-slate-500 font-mono text-[11px] uppercase mr-2 font-bold">Explanation:</span>
        {stepData.explanation}
      </div>
    </div>
  );
}

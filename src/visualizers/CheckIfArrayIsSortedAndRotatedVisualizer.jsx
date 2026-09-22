import React, { useState } from 'react';
import ArrayView from '../components/primitives/ArrayView';

// 0. Multi-language production solution code with detailed educational comments
export const solutions = {
  cpp: `// C++ Optimal Solution: Count Drop Points
// Time Complexity: O(N) where N is array size.
// Space Complexity: O(1) as we use only variables.

class Solution {
public:
    bool check(vector<int>& nums) {
        int cnt = 0; // Tracks the number of times current element is greater than next
        int n = nums.size();
        
        // Step 1: Iterate through the array to find "drops" in order
        for (int i = 0; i < n - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                cnt++; // A drop is found (e.g., [..., 5, 1, ...])
            }
        }
        
        // Step 2: If no drops, the array is perfectly sorted
        if (cnt == 0) {
            return true;
        }
        // Step 3: If exactly 1 drop, it might be rotated.
        // We must also check if the first element is >= the last element to ensure 
        // it wraps around correctly (e.g., [3,4,5,1,2] -> 3 >= 2 is valid).
        else if (cnt == 1 && nums[0] >= nums[n - 1]) {
            return true;
        }
        
        // Step 4: If more than 1 drop, or the wrap-around check fails, return false
        return false;
    }
};`,
  python: `# Python 3 Optimal Solution: Modular Arithmetic Check
# Time Complexity: O(N) | Space Complexity: O(1)

class Solution:
    def check(self, nums: List[int]) -> bool:
        # Instead of treating the wrap-around separately, 
        # we can check every adjacent pair including the last and first elements.
        count = 0
        n = len(nums)
        
        for i in range(n):
            # nums[(i + 1) % n] handles the wrap-around natively.
            # If nums[i] > next element, we found a violation.
            if nums[i] > nums[(i + 1) % n]:
                count += 1
                
        # A valid sorted & rotated array will have at most 1 violation (the pivot).
        return count <= 1`,
  java: `// Java Optimal Solution: Count Drop Points
// Time Complexity: O(N) | Space Complexity: O(1)

class Solution {
    public boolean check(int[] nums) {
        int cnt = 0;
        int n = nums.length;
        
        // Traverse the array checking for descending adjacent pairs
        for (int i = 0; i < n - 1; i++) {
            if (nums[i] > nums[i + 1]) {
                cnt++;
            }
        }
        
        // If it's already sorted without rotation, 0 drops exist.
        if (cnt == 0) {
            return true;
        } 
        // If there's 1 drop, it is valid ONLY IF the last element connects 
        // correctly to the first element (first >= last).
        else if (cnt == 1 && nums[0] >= nums[n - 1]) {
            return true;
        }
        
        // Otherwise, it's either unsorted or rotated improperly.
        return false;
    }
}`,
  javascript: `// JavaScript Optimal Solution: Modular Arithmetic Check
// Time Complexity: O(N) | Space Complexity: O(1)

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var check = function(nums) {
    let count = 0;
    const n = nums.length;
    
    // Check all adjacent elements, treating the array as circular.
    for (let i = 0; i < n; i++) {
        // Use modulo to safely wrap around from the last index to the first
        if (nums[i] > nums[(i + 1) % n]) {
            count++;
        }
    }
    
    // If it was rotated from a sorted array, there is at most 1 drop.
    return count <= 1;
};`
};

export const meta = {
  display_id: 'Q-003',
  title: "Check If Array Is Sorted And Rotated",
  category: "1. Arrays",
  difficulty: "Easy",
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  description: "Given an array nums, return true if the array was originally sorted in non-decreasing order, then rotated some number of positions (including zero)."
};

// Realistic sample array for this problem: Sorted and rotated by 3 positions
const SAMPLE_DATA = [3, 4, 5, 1, 2];

export const steps = [
  {
    title: "1. Initialize State",
    codeLine: 5,
    code: "int cnt = 0;\nint n = nums.size();",
    explanation: "We begin by initializing our counter `cnt` to 0. This variable will track how many times an element is strictly greater than the element immediately following it (a 'drop'). We will iterate through the array from left to right.",
    pointers: [{ index: 0, label: 'i', color: 'indigo' }, { index: 1, label: 'i+1', color: 'indigo' }],
    highlightIndices: [],
    hudText: "Initialized: cnt = 0"
  },
  {
    title: "2. Compare Element 0 and 1",
    codeLine: 8,
    code: "if (nums[i] > nums[i + 1])",
    explanation: "Looking at index 0 and 1: Is 3 > 4? No. The sequence is still non-decreasing. Our drop count `cnt` remains 0.",
    pointers: [{ index: 0, label: 'i', color: 'indigo' }, { index: 1, label: 'i+1', color: 'indigo' }],
    highlightIndices: [0, 1],
    hudText: "3 <= 4. cnt = 0"
  },
  {
    title: "3. Compare Element 1 and 2",
    codeLine: 8,
    code: "if (nums[i] > nums[i + 1])",
    explanation: "Moving forward, we compare index 1 and 2. Is 4 > 5? No. The sequence continues to grow. `cnt` remains 0.",
    pointers: [{ index: 1, label: 'i', color: 'indigo' }, { index: 2, label: 'i+1', color: 'indigo' }],
    highlightIndices: [1, 2],
    hudText: "4 <= 5. cnt = 0"
  },
  {
    title: "4. The Drop / Rotation Pivot",
    codeLine: 9,
    code: "cnt++;",
    explanation: "Now we compare index 2 and 3. Is 5 > 1? YES! We found a 'drop' where the sequence breaks its non-decreasing order. This is the pivot point of the rotation. We increment `cnt` to 1.",
    pointers: [{ index: 2, label: 'i', color: 'rose' }, { index: 3, label: 'i+1', color: 'rose' }],
    highlightIndices: [2, 3],
    hudText: "5 > 1! Drop detected. cnt = 1"
  },
  {
    title: "5. Compare Element 3 and 4",
    codeLine: 8,
    code: "if (nums[i] > nums[i + 1])",
    explanation: "Continuing the traversal, we compare index 3 and 4. Is 1 > 2? No. The sequence is non-decreasing again. The loop finishes because we've reached the end of adjacent pairs.",
    pointers: [{ index: 3, label: 'i', color: 'indigo' }, { index: 4, label: 'i+1', color: 'indigo' }],
    highlightIndices: [3, 4],
    hudText: "1 <= 2. cnt = 1"
  },
  {
    title: "6. Evaluate Total Drops & Wrap-Around",
    codeLine: 13,
    code: "else if (cnt == 1 && nums[0] >= nums[n - 1])\n    return true;",
    explanation: "The loop is over. `cnt` is exactly 1, meaning we have one rotation point. However, to guarantee the array is genuinely a rotated version of a sorted array, the last element must 'wrap around' seamlessly to the first element. We check if nums[0] >= nums[last] (3 >= 2). Since it is true, the array is valid!",
    pointers: [{ index: 0, label: 'first', color: 'emerald' }, { index: 4, label: 'last', color: 'emerald' }],
    highlightIndices: [0, 4],
    hudText: "cnt == 1 AND 3 >= 2. Array is valid! Return True."
  }
];

export default function CheckIfArrayIsSortedAndRotatedVisualizer({ currentStep: externalStep, onStepChange }) {
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
          <h3 className="text-sm font-bold text-[var(--chalk)] font-mono">{stepData.title}</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={handlePrev} disabled={stepIndex === 0} className="px-2.5 py-1 bg-white/5 hover:bg-white/10 disabled:opacity-30 text-[var(--chalk-dim)] text-xs font-mono rounded border border-white/5 transition">
            ← Prev
          </button>
          <button onClick={handleNext} disabled={stepIndex === steps.length - 1} className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-[var(--chalk)] text-xs font-mono font-medium rounded transition">
            Next →
          </button>
        </div>
      </div>

      {/* 2. Visualizer Canvas */}
      <div className="p-6 flex flex-col items-center justify-center bg-[#08090e]/60 min-h-[220px]">
        <ArrayView 
          items={SAMPLE_DATA} 
          pointers={stepData.pointers || []} 
          matchIndices={stepData.highlightIndices || []} 
        />
        <div className="mt-5 flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs">
          <span>Status: <strong className={stepIndex === 3 ? "text-rose-400" : stepIndex === 5 ? "text-emerald-400" : "text-indigo-400"}>{stepData.hudText || 'Processing...'}</strong></span>
        </div>
      </div>

      {/* 3. Explanation Footer */}
      <div className="px-5 py-3 bg-[#0c0e16] border-t border-white/5 text-xs text-[var(--chalk-dim)] leading-relaxed font-sans">
        <span className="text-[var(--chalk-faint)] font-mono text-[11px] uppercase mr-2 font-bold">Explanation:</span>
        {stepData.explanation}
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import ArrayView from '../components/primitives/ArrayView';

// 0. Multi-language production solution code with detailed educational comments
export const solutions = {
  cpp: `// C++ Optimal Solution: Two Pointers
// Time Complexity: O(N) as we traverse the array exactly once
// Space Complexity: O(1) as we modify the array in-place

class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;
        
        int k = 0; // 'k' points to the last unique element found
        
        // 'j' is the fast pointer that scans through the array
        for (int j = 1; j < nums.size(); j++) {
            // If we find a new unique element
            if (nums[k] != nums[j]) {
                k++; // Increment k to the next position
                // Swap the unique element into its correct position
                swap(nums[k], nums[j]); 
            }
        }
        
        // Return k + 1 because k is a 0-based index
        return k + 1;
    }
};
`,
  python: `# Python 3 Optimal Solution: Two Pointers
# Time Complexity: O(N) | Space Complexity: O(1)

class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        k = 0 # 'k' marks the boundary of the unique elements
        
        for j in range(1, len(nums)):
            # When a new unique element is encountered
            if nums[k] != nums[j]:
                k += 1
                # Copy the unique element to the boundary position
                nums[k] = nums[j]
                
        # Number of unique elements is index + 1
        return k + 1
`,
  java: `// Java Optimal Solution: Two Pointers
// Time Complexity: O(N) | Space Complexity: O(1)

class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        
        int k = 0; // Pointer for the sorted, unique portion
        
        for (int j = 1; j < nums.length; j++) {
            // If current element is different from the last unique element
            if (nums[k] != nums[j]) {
                k++; // Move the unique boundary forward
                nums[k] = nums[j]; // Overwrite the duplicate
            }
        }
        
        return k + 1;
    }
}
`,
  javascript: `// JavaScript Optimal Solution: Two Pointers
// Time Complexity: O(N) | Space Complexity: O(1)

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if (nums.length === 0) return 0;
    
    let k = 0; // 'k' tracks the index of the latest unique value
    
    for (let j = 1; j < nums.length; j++) {
        // We only take action when we spot a new number
        if (nums[k] !== nums[j]) {
            k++; // Advance the unique pointer
            nums[k] = nums[j]; // Place the new unique number
        }
    }
    
    // k is an index, so we return k + 1 for the count/length
    return k + 1;
};
`,
};

export const meta = {
  display_id: 'Q-004',
  title: "Remove Duplicates From Sorted Array",
  category: "1. Arrays",
  difficulty: "Easy",
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  description: "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once."
};

// Initial array for our simulation
const SAMPLE_DATA = [1, 1, 2, 2, 3];

export const steps = [
  {
    title: "1. Initialize Pointers",
    codeLine: 4,
    code: "int k = 0;\nfor (int j = 1; j < nums.size(); j++)",
    explanation: "We start with two pointers. Pointer 'k' marks the end of our \"unique elements\" subarray (initially just the first element at index 0). Pointer 'j' starts at index 1 and will scan the rest of the array looking for new, unique values.",
    array: [1, 1, 2, 2, 3],
    pointers: [
      { index: 0, label: 'k', color: 'emerald' },
      { index: 1, label: 'j', color: 'indigo' }
    ],
    highlightIndices: [0, 1],
    hudText: "k=0 (Value: 1), j=1 (Value: 1)"
  },
  {
    title: "2. Check For Duplicate",
    codeLine: 7,
    code: "if (nums[k] != nums[j])",
    explanation: "We compare the element at 'j' with the element at 'k'. Because nums[1] is 1, and nums[0] is 1, they are equal. This is a duplicate! We do nothing, and the loop will simply increment 'j' to keep searching.",
    array: [1, 1, 2, 2, 3],
    pointers: [
      { index: 0, label: 'k', color: 'emerald' },
      { index: 1, label: 'j', color: 'indigo' }
    ],
    highlightIndices: [0, 1],
    hudText: "nums[k] == nums[j]. Duplicate ignored."
  },
  {
    title: "3. Advance Explorer Pointer (j=2)",
    codeLine: 7,
    code: "if (nums[k] != nums[j])",
    explanation: "The loop advanced 'j' to 2. Now we compare nums[2] (which is 2) with our last unique element nums[0] (which is 1). Since 2 != 1, we have found a brand new unique number!",
    array: [1, 1, 2, 2, 3],
    pointers: [
      { index: 0, label: 'k', color: 'emerald' },
      { index: 2, label: 'j', color: 'indigo' }
    ],
    highlightIndices: [0, 2],
    hudText: "nums[k] != nums[j]. Unique element found!"
  },
  {
    title: "4. Store Unique Element",
    codeLine: 9,
    code: "k++;\nswap(nums[k], nums[j]);",
    explanation: "We first increment 'k' to 1 (expanding our unique zone). Then, we swap the new unique element at 'j' into this new 'k' position. The front of our array is now [1, 2, ...].",
    array: [1, 2, 1, 2, 3],
    pointers: [
      { index: 1, label: 'k', color: 'emerald' },
      { index: 2, label: 'j', color: 'indigo' }
    ],
    highlightIndices: [1, 2],
    hudText: "k incremented to 1. Swapped index 1 and 2."
  },
  {
    title: "5. Advance Explorer Pointer (j=3)",
    codeLine: 7,
    code: "if (nums[k] != nums[j])",
    explanation: "'j' advances to index 3. We compare nums[3] (which is 2) with our last unique element nums[1] (which is also 2). They are equal, so this is another duplicate. We ignore it.",
    array: [1, 2, 1, 2, 3],
    pointers: [
      { index: 1, label: 'k', color: 'emerald' },
      { index: 3, label: 'j', color: 'indigo' }
    ],
    highlightIndices: [1, 3],
    hudText: "nums[k] == nums[j]. Duplicate ignored."
  },
  {
    title: "6. Advance Explorer Pointer (j=4)",
    codeLine: 7,
    code: "if (nums[k] != nums[j])",
    explanation: "'j' advances to index 4, the last element. We compare nums[4] (which is 3) with nums[1] (which is 2). Since 3 != 2, we found another unique element!",
    array: [1, 2, 1, 2, 3],
    pointers: [
      { index: 1, label: 'k', color: 'emerald' },
      { index: 4, label: 'j', color: 'indigo' }
    ],
    highlightIndices: [1, 4],
    hudText: "nums[k] != nums[j]. Unique element found!"
  },
  {
    title: "7. Store Final Unique Element",
    codeLine: 9,
    code: "k++;\nswap(nums[k], nums[j]);",
    explanation: "We increment 'k' to 2. Then, we swap the element at 'j' (3) into the 'k' position. Our unique zone is now fully built at the front: [1, 2, 3].",
    array: [1, 2, 3, 2, 1],
    pointers: [
      { index: 2, label: 'k', color: 'emerald' },
      { index: 4, label: 'j', color: 'indigo' }
    ],
    highlightIndices: [2, 4],
    hudText: "k incremented to 2. Swapped index 2 and 4."
  },
  {
    title: "8. Return Count",
    codeLine: 13,
    code: "return k + 1;",
    explanation: "The loop terminates because 'j' reached the end of the array. The valid unique elements are located from index 0 to 'k' (index 2). We return k + 1, which is 3. The elements beyond index 2 do not matter.",
    array: [1, 2, 3, 2, 1],
    pointers: [
      { index: 2, label: 'k', color: 'emerald' }
    ],
    highlightIndices: [0, 1, 2], // Highlight the final unique array
    hudText: "Loop complete! Return k + 1 = 3."
  }
];

export default function RemoveDuplicatesFromSortedArrayVisualizer({ currentStep: externalStep, onStepChange }) {
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
        <ArrayView 
            items={stepData.array || SAMPLE_DATA} 
            pointers={stepData.pointers || []} 
            matchIndices={stepData.highlightIndices || []} 
        />
        
        {/* Real-time HUD Status & Variables */}
        <div className="mt-8 flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs shadow-inner">
          <span className="text-zinc-400">Status: <strong className={stepIndex === steps.length - 1 ? "text-emerald-400" : "text-indigo-400"}>{stepData.hudText || 'Processing...'}</strong></span>
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
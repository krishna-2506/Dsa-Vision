import React, { useState } from 'react';
import ArrayView from '../components/primitives/ArrayView';

// 0. Multi-language production solution code with detailed educational comments
export const solutions = {
  cpp: `// C++ Optimal Solution for Linear Search
// Time Complexity: O(N) where N is the size of the array
// Space Complexity: O(1) as we are only using a few variables for tracking

class Solution {
public:
    // Function to find the index of a target element 'k' in a given array
    int search(int arr[], int n, int k) {
        // Step 1: Iterate through the array sequentially using a for-loop.
        // The loop starts at index 0 and continues until n-1.
        for (int i = 0; i < n; i++) {
            
            // Step 2: Compare the current element arr[i] with the target k.
            // If they are equal, it means we have found our target element.
            if (arr[i] == k) {
                // Return the current index immediately.
                // This early exit ensures we don't do unnecessary checks.
                return i; 
            }
        }
        
        // Step 3: If the loop finishes without returning, the element is not present.
        // Returning -1 is a standard convention to indicate 'not found'.
        return -1; 
    }
};`,
  python: `# Python 3 Optimal Solution for Linear Search
# Time Complexity: O(N) | Space Complexity: O(1)

class Solution:
    def search(self, arr: list[int], n: int, k: int) -> int:
        # Step 1: Iterate through the sequence using the enumerate function
        # enumerate provides both the index (i) and the value (val) efficiently.
        for i, val in enumerate(arr):
            
            # Step 2: Perform the comparison between the current value and target k.
            # Python evaluates this equality check in constant O(1) time.
            if val == k:
                # If a match is found, immediately return the index 'i'
                # and terminate the search process.
                return i
                
        # Step 3: If the iteration completes and no match was encountered,
        # return -1 to signal that the target 'k' does not exist in 'arr'.
        return -1`,
  java: `// Java Optimal Solution for Linear Search
// Time Complexity: O(N) | Space Complexity: O(1)

class Solution {
    // Method to execute linear search on an integer array
    public int search(int arr[], int n, int k) {
        // Step 1: Begin a loop from index 0 up to n-1.
        // We must inspect every element in the worst-case scenario.
        for (int i = 0; i < n; i++) {
            
            // Step 2: Conditional check to see if the element at index i matches k.
            if (arr[i] == k) {
                // Target discovered! Return the index instantly.
                // This breaks both the loop and the method execution.
                return i;
            }
        }
        
        // Step 3: Fallback return statement if the element remains undiscovered.
        // Returning -1 clearly communicates the absence of the target value.
        return -1;
    }
}`,
  javascript: `// JavaScript Optimal Solution for Linear Search
// Time Complexity: O(N) | Space Complexity: O(1)

/**
 * @param {number[]} arr - The input array of numbers
 * @param {number} n - The size of the array
 * @param {number} k - The target element to search for
 * @return {number} - The index of the element if found, otherwise -1
 */
var search = function(arr, n, k) {
    // Step 1: Utilize a standard for-loop to traverse the array from start to finish.
    // Let 'i' be the pointer tracking our current index position.
    for (let i = 0; i < n; i++) {
        
        // Step 2: Compare the element at the current pointer index 'i' with the target 'k'.
        // Strict equality (===) is generally preferred in JS, but '==' works here for numbers.
        if (arr[i] === k) {
            // A matching element is found. Return the index 'i' to the caller.
            return i;
        }
    }
    
    // Step 3: If the loop exhausts all elements without returning, 
    // it implies the target 'k' is missing from the array. Return -1.
    return -1;
};`,
};

export const meta = {
  display_id: 'Q-008',
  title: "Linear Search",
  category: "1. Arrays",
  difficulty: "Easy",
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  description: "I don't think anyone needs it's solution. The idea is to traverse the array using loop and when the element\r\nis equal to k return the same"
};

// Realistic sample array for this problem. Searching for k = 56
const SAMPLE_DATA = [1, 8, 7, 56, 90];
const TARGET = 56;

export const steps = [
  {
    title: "1. Initialize State",
    codeLine: 8, 
    code: "for (int i = 0; i < n; i++) {",
    explanation: "We begin our linear search by setting up a loop that will traverse the array from the very first element (index 0) to the last. Our target element to find is k = 56. We initialize our iterator 'i' to 0.",
    pointers: [{ index: 0, label: 'i=0', color: 'indigo' }],
    highlightIndices: [],
    hudText: "Initialized pointer i at index 0. Target k = 56."
  },
  {
    title: "2. Check First Element",
    codeLine: 12,
    code: "if (arr[i] == k)",
    explanation: "We look at the element at index 0, which is 1. We compare this value against our target k = 56. Since 1 is not equal to 56, the condition evaluates to false. We will move to the next element in the array.",
    pointers: [{ index: 0, label: 'i=0', color: 'rose' }],
    highlightIndices: [0],
    hudText: "arr[0] is 1. 1 != 56. Move to next."
  },
  {
    title: "3. Check Second Element",
    codeLine: 12,
    code: "if (arr[i] == k)",
    explanation: "The loop variable 'i' increments to 1. We now inspect the element at index 1, which is 8. Comparing 8 against our target 56 yields false again. The search must continue down the array.",
    pointers: [{ index: 1, label: 'i=1', color: 'rose' }],
    highlightIndices: [1],
    hudText: "arr[1] is 8. 8 != 56. Move to next."
  },
  {
    title: "4. Check Third Element",
    codeLine: 12,
    code: "if (arr[i] == k)",
    explanation: "The loop variable 'i' increments to 2. The element at index 2 is 7. We check if 7 is equal to 56. This is also false. In a linear search, the time complexity scales linearly because we must check every element one by one in the worst case.",
    pointers: [{ index: 2, label: 'i=2', color: 'rose' }],
    highlightIndices: [2],
    hudText: "arr[2] is 7. 7 != 56. Move to next."
  },
  {
    title: "5. Match Found!",
    codeLine: 12,
    code: "if (arr[i] == k)",
    explanation: "The loop variable 'i' increments to 3. The element at index 3 is 56. We compare this value with our target k = 56. The condition (56 == 56) evaluates to true! We have successfully located our target element.",
    pointers: [{ index: 3, label: 'i=3', color: 'emerald' }],
    highlightIndices: [3],
    hudText: "arr[3] is 56. 56 == 56. Match found!"
  },
  {
    title: "6. Return Index",
    codeLine: 14,
    code: "return i;",
    explanation: "Since we found the element, we immediately return the current index 'i' which is 3. The function execution terminates here, preventing any unnecessary further traversal of the remaining elements (like 90). The algorithm completes in O(N) time.",
    pointers: [{ index: 3, label: 'Result', color: 'emerald' }],
    highlightIndices: [3],
    hudText: "Returning index 3. Algorithm complete."
  }
];

export default function LinearSearchVisualizer({ currentStep: externalStep, onStepChange }) {
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
      <div className="p-6 flex flex-col items-center justify-center bg-[#08090e]/60 min-h-[220px]">
        <ArrayView items={SAMPLE_DATA} pointers={stepData.pointers || []} matchIndices={stepData.highlightIndices || []} />
        <div className="mt-5 flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs">
          <span>Status: <strong className={stepIndex >= 4 ? "text-emerald-400" : "text-indigo-400"}>{stepData.hudText || 'Processing...'}</strong></span>
        </div>
      </div>

      {/* 4. Explanation Footer */}
      <div className="px-5 py-3 bg-[#0c0e16] border-t border-white/5 text-xs text-slate-300 leading-relaxed font-sans">
        <span className="text-slate-500 font-mono text-[11px] uppercase mr-2 font-bold">Explanation:</span>
        {stepData.explanation}
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import ArrayView from '../components/primitives/ArrayView';

// 0. Multi-language production solution code with detailed educational comments
export const solutions = {
  cpp: `// C++ Optimal Solution: Store and Shift
// Time Complexity: O(N) as we iterate through the array once.
// Space Complexity: O(1) since we only use a single 'temp' variable.

class Solution {
public:
    vector<int> rotateArray(vector<int>& arr, int n) {
        // Step 1: Save the first element before it gets overwritten
        int temp = arr[0];
        
        // Step 2: Shift all subsequent elements one position to the left
        for (int i = 0; i < n - 1; i++) {
            arr[i] = arr[i + 1];
        }
        
        // Step 3: Place the saved first element at the very end
        arr[n - 1] = temp;

        return arr;
    }
};
`,
  python: `# Python 3 Optimal Solution: Store and Shift
# Time Complexity: O(N) | Space Complexity: O(1)

class Solution:
    def rotateArray(self, arr: list, n: int) -> list:
        # Step 1: Store the first element
        temp = arr[0]
        
        # Step 2: Shift elements to the left
        for i in range(n - 1):
            arr[i] = arr[i + 1]
            
        # Step 3: Put the first element at the last index
        arr[n - 1] = temp
        
        return arr
`,
  java: `// Java Optimal Solution: Store and Shift
// Time Complexity: O(N) | Space Complexity: O(1)

class Solution {
    public int[] rotateArray(int[] arr, int n) {
        // Save the element that will fall off the left edge
        int temp = arr[0];
        
        // Shift every element from index 1 to n-1 left by one position
        for (int i = 0; i < n - 1; i++) {
            arr[i] = arr[i + 1];
        }
        
        // Restore the saved element to the rightmost position
        arr[n - 1] = temp;
        
        return arr;
    }
}
`,
  javascript: `// JavaScript Optimal Solution: Store and Shift
// Time Complexity: O(N) | Space Complexity: O(1)

/**
 * @param {number[]} arr
 * @param {number} n
 * @return {number[]}
 */
var rotateArray = function(arr, n) {
    // Keep track of the first item
    let temp = arr[0];
    
    // Iterate through the array and shift values leftwards
    for (let i = 0; i < n - 1; i++) {
        arr[i] = arr[i + 1];
    }
    
    // Assign the tracked item to the end
    arr[n - 1] = temp;
    
    return arr;
};
`,
};

export const meta = {
  display_id: 'Q-005',
  title: "Rotate Array Left By 1place",
  category: "1. Arrays",
  difficulty: "Easy",
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  description: "Given an array 'ARR' containing 'N' elements, rotate this array Left by once means to shift all elements by one place to the left and move the first element to the last position in the array."
};

// Realistic sample array based on the problem statement
const SAMPLE_DATA = [1, 2, 3, 4, 5];

export const steps = [
  {
    title: "1. Initialize State & Store temp",
    codeLine: 4, 
    code: "int temp = arr[0];",
    explanation: "We must shift every element left. If we immediately copy arr[1] into arr[0], we will lose the value of arr[0] forever! Therefore, our very first step is to store arr[0] (which is 1) safely in a temporary variable.",
    array: [1, 2, 3, 4, 5],
    temp: 1,
    pointers: [{ index: 0, label: 'temp source', color: 'amber' }],
    highlightIndices: [0],
    hudText: "Stored arr[0] into 'temp' variable."
  },
  {
    title: "2. Shift Element (i=0)",
    codeLine: 7, 
    code: "arr[i] = arr[i + 1];",
    explanation: "We start our loop at i=0. We take the value from arr[1] (which is 2) and overwrite arr[0] with it. We don't worry about losing the original '1' because we already safely stored it in 'temp'.",
    array: [2, 2, 3, 4, 5],
    temp: 1,
    pointers: [
      { index: 0, label: 'i', color: 'indigo' },
      { index: 1, label: 'i+1', color: 'emerald' }
    ],
    highlightIndices: [0, 1],
    hudText: "Copied arr[1] to arr[0]."
  },
  {
    title: "3. Shift Element (i=1)",
    codeLine: 7, 
    code: "arr[i] = arr[i + 1];",
    explanation: "The loop advances to i=1. We take the value from arr[2] (which is 3) and copy it into arr[1]. The shift operation ripples through the array.",
    array: [2, 3, 3, 4, 5],
    temp: 1,
    pointers: [
      { index: 1, label: 'i', color: 'indigo' },
      { index: 2, label: 'i+1', color: 'emerald' }
    ],
    highlightIndices: [1, 2],
    hudText: "Copied arr[2] to arr[1]."
  },
  {
    title: "4. Shift Element (i=2)",
    codeLine: 7, 
    code: "arr[i] = arr[i + 1];",
    explanation: "The loop advances to i=2. We copy the value from arr[3] (which is 4) into arr[2]. Notice how elements are moving one slot to the left.",
    array: [2, 3, 4, 4, 5],
    temp: 1,
    pointers: [
      { index: 2, label: 'i', color: 'indigo' },
      { index: 3, label: 'i+1', color: 'emerald' }
    ],
    highlightIndices: [2, 3],
    hudText: "Copied arr[3] to arr[2]."
  },
  {
    title: "5. Shift Element (i=3)",
    codeLine: 7, 
    code: "arr[i] = arr[i + 1];",
    explanation: "This is the last iteration of the loop (i=3). We copy the value from arr[4] (which is 5) into arr[3]. The entire right side of the array has now been shifted left. Notice we have a duplicate '5' at the end.",
    array: [2, 3, 4, 5, 5],
    temp: 1,
    pointers: [
      { index: 3, label: 'i', color: 'indigo' },
      { index: 4, label: 'i+1', color: 'emerald' }
    ],
    highlightIndices: [3, 4],
    hudText: "Copied arr[4] to arr[3]."
  },
  {
    title: "6. Restore Temp to Last Position",
    codeLine: 9, 
    code: "arr[n - 1] = temp;",
    explanation: "The loop has finished. The final step is to take the original first element that we saved in 'temp' (1) and place it in the very last position of the array (arr[n-1]).",
    array: [2, 3, 4, 5, 1],
    temp: 1,
    pointers: [{ index: 4, label: 'n-1', color: 'amber' }],
    highlightIndices: [4],
    hudText: "Placed 'temp' into arr[n-1]."
  },
  {
    title: "7. Algorithm Complete",
    codeLine: 11, 
    code: "return arr;",
    explanation: "The array has been successfully rotated left by one place. Every element shifted left by 1, and the first element wrapped around to become the last element.",
    array: [2, 3, 4, 5, 1],
    temp: 1,
    pointers: [],
    highlightIndices: [0, 1, 2, 3, 4],
    hudText: "Rotation complete in O(N) time and O(1) space."
  }
];

export default function RotateArrayLeftBy1placeVisualizer({ currentStep: externalStep, onStepChange }) {
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
      <div className="p-6 flex flex-col items-center justify-center bg-[#08090e]/60 min-h-[240px]">
        
        {/* Memory Variables (Temp) */}
        <div className="w-full max-w-lg mb-6 flex justify-end">
           <div className={`px-4 py-2 rounded-lg border font-mono text-sm shadow-sm transition-colors duration-300 ${
             stepIndex === 0 ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 
             stepIndex === steps.length - 2 ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 
             'bg-[#121520] border-white/10 text-zinc-400'
           }`}>
             <span className="opacity-70 mr-2">int temp =</span>
             <strong>{stepData.temp !== undefined ? stepData.temp : '?'}</strong>
           </div>
        </div>

        <ArrayView 
          items={stepData.array || SAMPLE_DATA} 
          pointers={stepData.pointers || []} 
          matchIndices={stepData.highlightIndices || []} 
        />
        
        {/* Real-time HUD Status & Variables */}
        <div className="mt-8 flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs shadow-inner">
          <span className="text-zinc-400">Status: <strong className={stepIndex === steps.length - 1 ? "text-emerald-400" : "text-indigo-400"}>{stepData.hudText || 'Processing...'}</strong></span>
        </div>
      </div>

      {/* 3. Explanation Footer */}
      <div className="px-5 py-4 bg-[#0c0e16] border-t border-white/5 text-xs text-[var(--chalk-dim)] leading-relaxed font-sans">
        <span className="text-[var(--chalk-faint)] font-mono text-[11px] uppercase mr-2 font-bold tracking-wider">Explanation:</span>
        <span className="opacity-90">{stepData.explanation}</span>
      </div>
    </div>
  );
}
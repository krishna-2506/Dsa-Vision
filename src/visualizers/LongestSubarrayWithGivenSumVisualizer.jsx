import React, { useState } from 'react';
import ArrayView from '../components/primitives/ArrayView';

// 0. Multi-language production solution code with detailed educational comments
export const solutions = {
  cpp: `// C++ Optimal Solution: Sliding Window (Two Pointers)
// Time Complexity: O(2N) ~ O(N) because each element is visited at most twice (by end and start)
// Space Complexity: O(1) as we only use a few variables

class Solution {
public:
    int longestSubarrayWithSumK(vector<int> a, long long k) {
        int start = 0; // Left pointer of our sliding window
        int ans = 0;   // Stores the maximum length found so far
        long long sum = 0; // Tracks the sum of the current window
        int n = a.size();

        // Right pointer 'end' expands the window
        for (int end = 0; end < n; end++) {
            sum += a[end]; // Add the new element to our window's sum
            
            // If sum exceeds k, shrink the window from the left
            // This loop ensures our window sum is always <= k (for positive arrays)
            while (sum > k) {
                sum -= a[start]; // Remove the element at 'start' from the sum
                start++;         // Move the left pointer forward
            }
            
            // If the current window exactly matches the target sum 'k'
            if (sum == k) {
                // Update max length. Current window length is (end - start + 1)
                ans = max(ans, end - start + 1);
            }
        }
        return ans;
    }
};
`,
  python: `# Python 3 Optimal Solution: Sliding Window
# Time Complexity: O(N) | Space Complexity: O(1)

class Solution:
    def longestSubarrayWithSumK(self, a: list[int], k: int) -> int:
        start = 0      # Left boundary of the window
        max_len = 0    # Stores the longest valid subarray length
        current_sum = 0 # Sum of elements within the current window
        
        # 'end' pointer expands the window to the right
        for end in range(len(a)):
            current_sum += a[end]
            
            # While the sum is too large, shrink the window from the left.
            # (Note: This logic assumes array elements are non-negative)
            while current_sum > k and start <= end:
                current_sum -= a[start]
                start += 1
                
            # Whenever the window sum hits the target 'k', check if it's the longest
            if current_sum == k:
                max_len = max(max_len, end - start + 1)
                
        return max_len
`,
  java: `// Java Optimal Solution: Sliding Window
// Time Complexity: O(N) | Space Complexity: O(1)

class Solution {
    public int longestSubarrayWithSumK(int[] a, long k) {
        int start = 0;
        int ans = 0;
        long sum = 0;
        int n = a.length;

        // Iterate with the 'end' pointer expanding the sliding window
        for (int end = 0; end < n; end++) {
            sum += a[end]; // Include current element
            
            // Shrink window from the left if the sum exceeds the target 'k'
            while (sum > k && start <= end) {
                sum -= a[start];
                start++;
            }
            
            // If we found a valid subarray, update the maximum length
            if (sum == k) {
                ans = Math.max(ans, end - start + 1);
            }
        }
        
        return ans;
    }
}
`,
  javascript: `// JavaScript Optimal Solution: Sliding Window
// Time Complexity: O(N) | Space Complexity: O(1)

/**
 * @param {number[]} a
 * @param {number} k
 * @return {number}
 */
var longestSubarrayWithSumK = function(a, k) {
    let start = 0;
    let maxLength = 0;
    let sum = 0;
    
    // 'end' is the right pointer expanding our window
    for (let end = 0; end < a.length; end++) {
        sum += a[end];
        
        // If sum overflows 'k', slide the left pointer ('start') forward
        while (sum > k && start <= end) {
            sum -= a[start];
            start++;
        }
        
        // Target matched! Record the length if it's the largest we've seen
        if (sum === k) {
            maxLength = Math.max(maxLength, end - start + 1);
        }
    }
    
    return maxLength;
};
`,
};

export const meta = {
  display_id: 'Q-012',
  title: "Longest Subarray With Given Sum",
  category: "1. Arrays",
  difficulty: "Easy",
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  description: "You are given an array 'A' of size 'N' and an integer 'K'. You need to print the length of the longest subarray of array 'A' whose sum = 'K'. Assuming non-negative integers."
};

// Realistic sample array/data extracted directly from the problem statement & examples
const SAMPLE_DATA = [1, 2, 3, 1, 1, 1, 1];
// K = 3

export const steps = [
  {
    title: "1. Initialize State",
    codeLine: 4,
    code: "int start = 0; int ans = 0; long long sum = 0;",
    explanation: "We initialize our sliding window pointers. `start` and `end` both point to index 0. Our running `sum` is 0, and the maximum length found (`ans`) is 0. Target K is 3.",
    pointers: [
      { index: 0, label: 'start', color: 'amber' },
      { index: 0, label: 'end', color: 'indigo' }
    ],
    highlightIndices: [],
    hudText: "K=3 | Sum=0 | Max Length=0"
  },
  {
    title: "2. Expand Window (end=1)",
    codeLine: 18,
    code: "if (sum == k) { ans = max(ans, end - start + 1); }",
    explanation: "We expanded `end` to index 1. The window [1, 2] has a sum of 3. Since sum equals K, we update our max length (`ans`) to 2 (indices 1 - 0 + 1).",
    pointers: [
      { index: 0, label: 'start', color: 'amber' },
      { index: 1, label: 'end', color: 'indigo' }
    ],
    highlightIndices: [0, 1],
    hudText: "K=3 | Sum=3 | Max Length=2 (Update!)"
  },
  {
    title: "3. Expand Window (end=2)",
    codeLine: 12,
    code: "sum += a[end];",
    explanation: "We advance `end` to index 2 (value 3). Our window is now [1, 2, 3] and the sum jumps to 6. This is greater than our target K (3).",
    pointers: [
      { index: 0, label: 'start', color: 'amber' },
      { index: 2, label: 'end', color: 'indigo' }
    ],
    highlightIndices: [0, 1, 2],
    hudText: "K=3 | Sum=6 | Max Length=2"
  },
  {
    title: "4. Shrink Window (sum > k)",
    codeLine: 14,
    code: "while (sum > k) { sum -= a[start]; start++; }",
    explanation: "Because sum (6) > K (3), we must shrink the window from the left. We subtract a[0] and a[1] from the sum, moving `start` to index 2. The window is now just [3], sum is 3.",
    pointers: [
      { index: 2, label: 'start', color: 'amber' },
      { index: 2, label: 'end', color: 'indigo' }
    ],
    highlightIndices: [2],
    hudText: "K=3 | Sum=3 | Max Length=2"
  },
  {
    title: "5. Expand Window (end=3)",
    codeLine: 12,
    code: "sum += a[end];",
    explanation: "We advance `end` to index 3 (value 1). Window is [3, 1], sum becomes 4. Since 4 > 3, we will need to shrink again on the next internal step.",
    pointers: [
      { index: 2, label: 'start', color: 'amber' },
      { index: 3, label: 'end', color: 'indigo' }
    ],
    highlightIndices: [2, 3],
    hudText: "K=3 | Sum=4 | Max Length=2"
  },
  {
    title: "6. Shrink Window (start=3)",
    codeLine: 14,
    code: "while (sum > k) { sum -= a[start]; start++; }",
    explanation: "Sum (4) > K (3), so we shrink. Subtract a[2] (value 3) from sum. `start` moves to index 3. Window is now [1], sum is 1. We are below K, so we can expand again.",
    pointers: [
      { index: 3, label: 'start', color: 'amber' },
      { index: 3, label: 'end', color: 'indigo' }
    ],
    highlightIndices: [3],
    hudText: "K=3 | Sum=1 | Max Length=2"
  },
  {
    title: "7. Expand Window (end=5)",
    codeLine: 18,
    code: "if (sum == k) { ans = max(ans, end - start + 1); }",
    explanation: "Fast-forwarding: we expanded `end` to 4, then to 5. Our window [1, 1, 1] (indices 3 to 5) has a sum of 3. This matches K! Length is 5 - 3 + 1 = 3. We update `ans` to 3.",
    pointers: [
      { index: 3, label: 'start', color: 'amber' },
      { index: 5, label: 'end', color: 'indigo' }
    ],
    highlightIndices: [3, 4, 5],
    hudText: "K=3 | Sum=3 | Max Length=3 (New Max!)"
  },
  {
    title: "8. Expand Window (end=6)",
    codeLine: 12,
    code: "sum += a[end];",
    explanation: "We advance `end` to the final index 6. Window is [1, 1, 1, 1], sum becomes 4. This is greater than K.",
    pointers: [
      { index: 3, label: 'start', color: 'amber' },
      { index: 6, label: 'end', color: 'indigo' }
    ],
    highlightIndices: [3, 4, 5, 6],
    hudText: "K=3 | Sum=4 | Max Length=3"
  },
  {
    title: "9. Final Shrink & Result",
    codeLine: 14,
    code: "while (sum > k) { sum -= a[start]; start++; }",
    explanation: "We shrink from the left, moving `start` to index 4. The final window is [1, 1, 1] (indices 4 to 6). Sum is 3. Length is 3, which equals our max length. The loop finishes, returning 3.",
    pointers: [
      { index: 4, label: 'start', color: 'amber' },
      { index: 6, label: 'end', color: 'indigo' }
    ],
    highlightIndices: [4, 5, 6],
    hudText: "K=3 | Sum=3 | Max Length=3 (Final)"
  }
];

export default function LongestSubarrayWithGivenSumVisualizer({ currentStep: externalStep, onStepChange }) {
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
        <ArrayView items={SAMPLE_DATA} pointers={stepData.pointers || []} matchIndices={stepData.highlightIndices || []} />
        
        {/* Real-time HUD Status & Variables */}
        <div className="mt-5 flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs shadow-inner">
          <span className="text-zinc-400">Status: <strong className="text-indigo-400">{stepData.hudText || 'Processing...'}</strong></span>
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

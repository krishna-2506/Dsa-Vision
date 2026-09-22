import React, { useState } from 'react';
import LinkedListView from '../components/primitives/LinkedListView';

// 0. Multi-language production solution code with detailed educational comments
export const solutions = {
  cpp: `// C++ Optimal Solution: Linear Search in Linked List
// Time Complexity: O(N) where N is the number of nodes in the Linked List
// Space Complexity: O(1) as we only use a single pointer variable

class Solution {
public:
    bool searchKey(int n, struct Node* head, int key) {
        // Step 1: Initialize a traversal pointer to the head of the list.
        // We use 'curr' to avoid modifying the original 'head' pointer.
        struct Node* curr = head;
        
        // Step 2: Traverse the linked list until we reach the end (curr becomes NULL)
        while(curr != NULL) {
            
            // Step 3: Check if the current node's data matches the target key
            if(curr->data == key) {
                // If a match is found, immediately return true
                return true;
            }
            
            // Step 4: If not found, move the pointer to the next node in the list
            curr = curr->next;
        }
        
        // Step 5: If the loop finishes and we haven't returned true, 
        // the key is not in the list. Return false.
        return false;
    }
};
`,
  python: `# Python 3 Optimal Solution: Linear Search in Linked List
# Time Complexity: O(N) | Space Complexity: O(1)

'''
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
'''

class Solution:
    def searchKey(self, n: int, head: 'Node', key: int) -> bool:
        # Start our traversal at the head of the list
        curr = head
        
        # Continue traversing as long as curr is not None
        while curr:
            # Check for a match with the target key
            if curr.data == key:
                return True
                
            # Move to the next node
            curr = curr.next
            
        # Key was never found during traversal
        return False
`,
  java: `// Java Optimal Solution: Linear Search in Linked List
// Time Complexity: O(N) | Space Complexity: O(1)

/* Node class definition
class Node {
    int data;
    Node next;
    Node(int d)  { data = d;  next = null; }
} */

class Solution {
    static boolean searchKey(int n, Node head, int key) {
        // Initialize a current pointer for traversal
        Node curr = head;
        
        // Loop through the list until the end is reached
        while(curr != null) {
            // Check if we have found the key
            if(curr.data == key) {
                return true; // Match found
            }
            
            // Advance the pointer to the next node
            curr = curr.next;
        }
        
        // Match not found after checking all nodes
        return false;
    }
}
`,
  javascript: `// JavaScript Optimal Solution: Linear Search in Linked List
// Time Complexity: O(N) | Space Complexity: O(1)

/**
 * Definition for singly-linked list.
 * function Node(data) {
 *     this.data = data;
 *     this.next = null;
 * }
 */

/**
 * @param {number} n
 * @param {Node} head
 * @param {number} key
 * @return {boolean}
 */
var searchKey = function(n, head, key) {
    let curr = head; // Traversal pointer
    
    // Traverse the list
    while (curr !== null) {
        if (curr.data === key) {
            return true; // Return true immediately upon finding the key
        }
        curr = curr.next; // Move to the next node
    }
    
    // If traversal completes without finding the key
    return false;
};
`,
};

export const meta = {
  display_id: 'Q-089',
  title: "Search Element In Linked List",
  category: "4. Linked List",
  difficulty: "Medium",
  timeComplexity: "O(N)",
  spaceComplexity: "O(1)",
  description: "Given a linked list of n nodes and a key, the task is to check if the key is present in the linked list or not by traversing it sequentially."
};

// Realistic sample data from the problem example
const SAMPLE_DATA = [1, 2, 3, 4];

export const steps = [
  {
    title: "1. Initialize Traversal Pointer",
    codeLine: 2, 
    code: "struct Node* curr = head;",
    explanation: "We begin by creating a pointer `curr` and setting it to point to the `head` of the linked list. This allows us to traverse the list node by node without modifying our reference to the original head of the list.",
    pointers: [{ index: 0, label: 'curr', color: 'indigo' }],
    highlightIndices: [],
    hudText: "curr pointing to Node(1) | Target Key = 3"
  },
  {
    title: "2. Check First Node",
    codeLine: 4, 
    code: "if(curr->data == key)",
    explanation: "We check if the current node's data (1) matches our target key (3). Since 1 != 3, this condition is false, and we skip the return statement.",
    pointers: [{ index: 0, label: 'curr', color: 'rose' }],
    highlightIndices: [0],
    hudText: "1 != 3. Target not found at current node."
  },
  {
    title: "3. Advance Pointer",
    codeLine: 6, 
    code: "curr = curr->next;",
    explanation: "Since the target wasn't found, we move our `curr` pointer to the next node in the list. We do this by assigning `curr` to the `next` memory address stored within the current node.",
    pointers: [{ index: 1, label: 'curr', color: 'indigo' }],
    highlightIndices: [],
    hudText: "Moved curr to next node (Node(2))."
  },
  {
    title: "4. Check Second Node",
    codeLine: 4, 
    code: "if(curr->data == key)",
    explanation: "We again check if the current node's data (2) matches our target key (3). Since 2 != 3, we once again skip the return statement.",
    pointers: [{ index: 1, label: 'curr', color: 'rose' }],
    highlightIndices: [1],
    hudText: "2 != 3. Target not found at current node."
  },
  {
    title: "5. Advance Pointer Again",
    codeLine: 6, 
    code: "curr = curr->next;",
    explanation: "We advance the `curr` pointer down the list one more step, reaching the third node.",
    pointers: [{ index: 2, label: 'curr', color: 'indigo' }],
    highlightIndices: [],
    hudText: "Moved curr to next node (Node(3))."
  },
  {
    title: "6. Check Third Node (Match Found!)",
    codeLine: 4, 
    code: "if(curr->data == key)",
    explanation: "We check the current node's data (3) against our target key (3). This time, 3 == 3! The condition evaluates to true.",
    pointers: [{ index: 2, label: 'curr', color: 'emerald' }],
    highlightIndices: [2],
    hudText: "3 == 3! Target matched!"
  },
  {
    title: "7. Return True",
    codeLine: 5, 
    code: "return true;",
    explanation: "Because we successfully found the element, we immediately return `true` and exit the function. We do not need to traverse the remainder of the linked list (Node 4 is never visited).",
    pointers: [{ index: 2, label: 'Result', color: 'emerald' }],
    highlightIndices: [2],
    hudText: "Search successful. Returned true."
  }
];

export default function SearchElementInLinkedListVisualizer({ currentStep: externalStep, onStepChange }) {
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
        {/* Render a linked list visualization */}
        <LinkedListView 
          items={SAMPLE_DATA} 
          pointers={stepData.pointers || []} 
          matchIndices={stepData.highlightIndices || []} 
        />
        
        {/* Real-time HUD Status & Variables */}
        <div className="mt-8 flex items-center gap-3 px-5 py-2.5 rounded-lg bg-[#0e111a] border border-white/5 font-mono text-xs shadow-inner">
          <span className="text-zinc-400">Status: <strong className={stepIndex >= 5 ? "text-emerald-400" : stepIndex % 2 === 1 ? "text-rose-400" : "text-indigo-400"}>{stepData.hudText || 'Processing...'}</strong></span>
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
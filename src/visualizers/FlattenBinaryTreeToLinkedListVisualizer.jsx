import React from 'react';

export const meta = {
  title: 'Flatten Binary Tree to Linked List',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) in-place with Morris Traversal',
  description: 'Flattens a binary tree in-place into a right-skewed linked list matching preorder traversal order using Morris-style predecessor splicing without extra space.'
};

export const solutions = {
  cpp: `// C++: Flatten Binary Tree to Linked List in O(1) space
// Time Complexity: O(N) | Space Complexity: O(1)
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    void flatten(TreeNode* root) {
        TreeNode* curr = root;

        while (curr != nullptr) {
            if (curr->left != nullptr) {
                // Find rightmost node in left subtree
                TreeNode* prev = curr->left;
                while (prev->right != nullptr) {
                    prev = prev->right;
                }

                // Connect original right subtree to predecessor's right
                prev->right = curr->right;
                curr->right = curr->left;
                curr->left = nullptr;
            }
            curr = curr->right;
        }
    }
};`,
  java: `// Java: Flatten Binary Tree to Linked List in O(1) space
class Solution {
    public void flatten(TreeNode root) {
        TreeNode curr = root;

        while (curr != null) {
            if (curr.left != null) {
                TreeNode prev = curr.left;
                while (prev.right != null) {
                    prev = prev.right;
                }

                prev.right = curr.right;
                curr.right = curr.left;
                curr.left = null;
            }
            curr = curr.right;
        }
    }
}`,
  python: `# Python 3: Flatten Binary Tree to Linked List
def flatten(root):
    curr = root

    while curr:
        if curr.left:
            prev = curr.left
            while prev.right:
                prev = prev.right

            prev.right = curr.right
            curr.right = curr.left
            curr.left = None

        curr = curr.right`,
  javascript: `// JavaScript: Flatten Binary Tree to Linked List
function flatten(root) {
    let curr = root;

    while (curr !== null) {
        if (curr.left !== null) {
            let prev = curr.left;
            while (prev.right !== null) {
                prev = prev.right;
            }

            prev.right = curr.right;
            curr.right = curr.left;
            curr.left = null;
        }
        curr = curr.right;
    }
}`
};

export const steps = [
  {
    title: '1. Initial Tree: Root 1 with Left (2, 3, 4) & Right (5, 6)',
    phase: 'INIT',
    codeLine: 12,
    curr: 1,
    action: 'Start at root 1',
    flattened: [1],
    explain: 'Goal: Flatten into 1 &rarr; 2 &rarr; 3 &rarr; 4 &rarr; 5 &rarr; 6 where all left pointers are null.'
  },
  {
    title: '2. At curr = 1: Find rightmost of 1.left (Node 4)',
    phase: 'FIND_PRED',
    codeLine: 18,
    curr: 1,
    action: 'prev = Node 4; Link 4.right = 1.right (5)',
    flattened: [1],
    explain: 'Rightmost node in left subtree of 1 is Node 4. Attach original right branch (5 &rarr; 6) to 4.right.'
  },
  {
    title: '3. Splice: 1.right = 1.left (2); 1.left = null',
    phase: 'SPLICE',
    codeLine: 24,
    curr: 1,
    action: 'curr.right = curr.left; curr.left = null',
    flattened: [1, 2],
    explain: 'Move left subtree to right. Left child of 1 is set to null.'
  },
  {
    title: '4. Advance curr to 2: Rightmost of 2.left is Node 3',
    phase: 'ADVANCE',
    codeLine: 18,
    curr: 2,
    action: 'prev = Node 3; Link 3.right = 2.right (4)',
    flattened: [1, 2, 3],
    explain: 'Attach 4 to 3.right. Set 2.right = 3 and 2.left = null.'
  },
  {
    title: '5. Complete: All nodes aligned into Right-Skewed Linked List!',
    phase: 'COMPLETE',
    codeLine: 27,
    curr: null,
    action: '1 &rarr; 2 &rarr; 3 &rarr; 4 &rarr; 5 &rarr; 6',
    flattened: [1, 2, 3, 4, 5, 6],
    explain: 'Entire tree transformed in-place into linear linked list using 0 extra space!'
  }
];

export default function FlattenBinaryTreeToLinkedListVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
          Operation: <strong className="text-cyan-400">{step.action}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Space Complexity: <strong>O(1) In-Place</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Flattened Right-Pointer Chain</span>
          <span className="text-emerald-400 font-bold">Preorder Linked List</span>
        </div>

        {/* Chain visualization */}
        <div className="flex items-center justify-center gap-2 flex-wrap w-full py-4">
          {step.flattened.map((val, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div
                className={`w-12 h-12 rounded-xl border-2 flex flex-col items-center justify-center font-mono font-bold text-sm shadow-md transition-all ${
                  step.curr === val
                    ? 'bg-amber-500/25 border-amber-400 text-amber-200'
                    : 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                }`}
              >
                <span>{val}</span>
                <span className="text-[8px] text-[#555a79] font-normal">L:null</span>
              </div>
              {idx < step.flattened.length - 1 && (
                <span className="text-xs font-mono text-[#434966] font-bold">&rarr;</span>
              )}
            </div>
          ))}
        </div>

        <div className="text-xs font-mono text-[var(--chalk-dim)] bg-[var(--board-raised-2)] px-4 py-2 rounded-xl border border-[var(--line)] text-center w-full">
          Morris wiring: Connect predecessor&apos;s right pointer to original right subtree &rarr; move left to right.
        </div>
      </div>
    </div>
  );
}

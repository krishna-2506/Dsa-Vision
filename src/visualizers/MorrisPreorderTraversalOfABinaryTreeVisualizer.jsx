import React from 'react';

export const meta = {
  title: 'Morris Preorder Traversal',
  category: 'Binary Trees',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) strictly constant space',
  description: 'Traverses a binary tree in Preorder (Root &rarr; Left &rarr; Right) with strictly O(1) auxiliary space, visiting the current node right before establishing the temporary threaded predecessor link.'
};

export const solutions = {
  cpp: `// C++: Morris Preorder Traversal in O(1) Space
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<int> morrisPreorder(TreeNode* root) {
    vector<int> preorder;
    TreeNode* curr = root;

    while (curr != nullptr) {
        if (curr->left == nullptr) {
            preorder.push_back(curr->val);
            curr = curr->right;
        } else {
            TreeNode* prev = curr->left;
            while (prev->right && prev->right != curr) {
                prev = prev->right;
            }

            if (prev->right == nullptr) {
                // Preorder: Visit node BEFORE descending left
                preorder.push_back(curr->val);
                prev->right = curr;
                curr = curr->left;
            } else {
                prev->right = nullptr;
                curr = curr->right;
            }
        }
    }
    return preorder;
}`,
  java: `// Java: Morris Preorder Traversal in O(1) Space
import java.util.*;

class Solution {
    public List<Integer> getPreorder(TreeNode root) {
        List<Integer> preorder = new ArrayList<>();
        TreeNode curr = root;

        while (curr != null) {
            if (curr.left == null) {
                preorder.add(curr.val);
                curr = curr.right;
            } else {
                TreeNode prev = curr.left;
                while (prev.right != null && prev.right != curr) {
                    prev = prev.right;
                }

                if (prev.right == null) {
                    preorder.add(curr.val);
                    prev.right = curr;
                    curr = curr.left;
                } else {
                    prev.right = null;
                    curr = curr.right;
                }
            }
        }
        return preorder;
    }
}`,
  python: `# Python 3: Morris Preorder Traversal
def morris_preorder(root):
    preorder = []
    curr = root

    while curr:
        if not curr.left:
            preorder.append(curr.val)
            curr = curr.right
        else:
            prev = curr.left
            while prev.right and prev.right != curr:
                prev = prev.right

            if not prev.right:
                preorder.append(curr.val) # visit before left
                prev.right = curr
                curr = curr.left
            else:
                prev.right = None
                curr = curr.right

    return preorder`,
  javascript: `// JavaScript: Morris Preorder Traversal
function morrisPreorder(root) {
    const preorder = [];
    let curr = root;

    while (curr !== null) {
        if (curr.left === null) {
            preorder.push(curr.val);
            curr = curr.right;
        } else {
            let prev = curr.left;
            while (prev.right !== null && prev.right !== curr) {
                prev = prev.right;
            }

            if (prev.right === null) {
                preorder.push(curr.val);
                prev.right = curr;
                curr = curr.left;
            } else {
                prev.right = null;
                curr = curr.right;
            }
        }
    }
    return preorder;
}`
};

export const steps = [
  {
    title: '1. Start at Root 1: Visit 1 &rarr; Create thread from 5 to 1',
    phase: 'VISIT_AND_THREAD',
    codeLine: 26,
    curr: 1,
    threadActive: true,
    threadFrom: 5,
    threadTo: 1,
    preorder: [1],
    explain: 'Preorder rule: Visit Node 1 immediately BEFORE descending left. Establish thread 5.right = 1.'
  },
  {
    title: '2. At Node 2: Visit 2 &rarr; Create thread from 4 to 2',
    phase: 'VISIT_AND_THREAD',
    codeLine: 26,
    curr: 2,
    threadActive: true,
    threadFrom: 4,
    threadTo: 2,
    preorder: [1, 2],
    explain: 'Visit Node 2. Establish thread 4.right = 2. Move to 4.'
  },
  {
    title: '3. At Node 4: 4.left is null &rarr; Visit 4 &rarr; Follow thread to 2',
    phase: 'LEAF_VISIT',
    codeLine: 18,
    curr: 4,
    threadActive: true,
    threadFrom: 4,
    threadTo: 2,
    preorder: [1, 2, 4],
    explain: 'Leaf 4 visited. Follow thread up to Node 2.'
  },
  {
    title: '4. At Node 2: Thread exists &rarr; Cut thread! Advance to 5',
    phase: 'CUT_THREAD',
    codeLine: 30,
    curr: 2,
    threadActive: false,
    threadFrom: 4,
    threadTo: 2,
    preorder: [1, 2, 4],
    explain: 'Left branch of 2 is finished. Snip thread 4.right = null. Advance to 2.right (5).'
  },
  {
    title: '5. Complete: Preorder = [1, 2, 4, 5, 3] in O(1) Space',
    phase: 'COMPLETE',
    codeLine: 34,
    curr: null,
    threadActive: false,
    threadFrom: null,
    threadTo: null,
    preorder: [1, 2, 4, 5, 3],
    explain: 'Nodes 5 and 3 visited. Preorder [1, 2, 4, 5, 3] completed in O(N) time with O(1) extra space!'
  }
];

export default function MorrisPreorderTraversalOfABinaryTreeVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
          Active: <strong className="text-cyan-400">{step.curr ? `Node ${step.curr}` : 'Finished'}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Rule: <strong>Visit BEFORE Creating Thread</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Threaded Binary Tree Preorder Walk</span>
          <span className="text-purple-400 font-bold">O(1) Space Traversal</span>
        </div>

        {/* Tree Topology */}
        <div className="flex flex-col items-center gap-4 py-3 w-full">
          <div
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm ${
              step.curr === 1 ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200' : 'bg-[#181a26] border-[#31364d] text-[var(--chalk)]'
            }`}
          >
            1
          </div>

          <div className="flex justify-center gap-16 w-full">
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs ${
                step.curr === 2 ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200' : 'bg-[#181a26] border-[#31364d] text-[var(--chalk)]'
              }`}
            >
              2
            </div>
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs ${
                step.curr === 3 ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200' : 'bg-[#181a26] border-[#31364d] text-[var(--chalk)]'
              }`}
            >
              3
            </div>
          </div>

          <div className="flex justify-start gap-4 -ml-16">
            {[4, 5].map(v => (
              <div
                key={v}
                className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs ${
                  step.curr === v ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200' : 'bg-[#181a26] border-[#31364d] text-[var(--chalk)]'
                }`}
              >
                {v}
              </div>
            ))}
          </div>
        </div>

        {/* Output stream */}
        <div className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0f1016] border border-[var(--line)] text-xs font-mono">
          <span className="text-[var(--chalk-dim)]">Preorder Stream:</span>
          <div className="flex gap-1.5">
            {step.preorder.map((v, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                {v}
              </span>
            ))}
          </div>
        </div>

        <div className="text-xs font-mono text-[var(--chalk-dim)] bg-[var(--board-raised-2)] px-4 py-2 rounded-xl border border-[var(--line)] text-center w-full">
          In Morris Preorder, a node is recorded the very first time it is visited (when establishing the thread).
        </div>
      </div>
    </div>
  );
}

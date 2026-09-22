import React from 'react';

export const meta = {
  title: 'Morris Inorder Traversal',
  category: 'Binary Trees',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) strictly constant space',
  description: 'Traverses a binary tree in Inorder (Left &rarr; Root &rarr; Right) with strictly O(1) auxiliary memory using temporary threaded back-links from in-order predecessors.'
};

export const solutions = {
  cpp: `// C++: Morris Inorder Traversal in O(1) Space
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<int> morrisInorder(TreeNode* root) {
    vector<int> inorder;
    TreeNode* curr = root;

    while (curr != nullptr) {
        if (curr->left == nullptr) {
            inorder.push_back(curr->val);
            curr = curr->right;
        } else {
            TreeNode* prev = curr->left;
            while (prev->right && prev->right != curr) {
                prev = prev->right;
            }

            if (prev->right == nullptr) {
                // Establish temporary thread
                prev->right = curr;
                curr = curr->left;
            } else {
                // Cut thread and visit current
                prev->right = nullptr;
                inorder.push_back(curr->val);
                curr = curr->right;
            }
        }
    }
    return inorder;
}`,
  java: `// Java: Morris Inorder Traversal in O(1) Space
import java.util.*;

class Solution {
    public List<Integer> getInorder(TreeNode root) {
        List<Integer> inorder = new ArrayList<>();
        TreeNode curr = root;

        while (curr != null) {
            if (curr.left == null) {
                inorder.add(curr.val);
                curr = curr.right;
            } else {
                TreeNode prev = curr.left;
                while (prev.right != null && prev.right != curr) {
                    prev = prev.right;
                }

                if (prev.right == null) {
                    prev.right = curr;
                    curr = curr.left;
                } else {
                    prev.right = null;
                    inorder.add(curr.val);
                    curr = curr.right;
                }
            }
        }
        return inorder;
    }
}`,
  python: `# Python 3: Morris Inorder Traversal
def morris_inorder(root):
    inorder = []
    curr = root

    while curr:
        if not curr.left:
            inorder.append(curr.val)
            curr = curr.right
        else:
            prev = curr.left
            while prev.right and prev.right != curr:
                prev = prev.right

            if not prev.right:
                prev.right = curr # create thread
                curr = curr.left
            else:
                prev.right = None # remove thread
                inorder.append(curr.val)
                curr = curr.right

    return inorder`,
  javascript: `// JavaScript: Morris Inorder Traversal
function morrisInorder(root) {
    const inorder = [];
    let curr = root;

    while (curr !== null) {
        if (curr.left === null) {
            inorder.push(curr.val);
            curr = curr.right;
        } else {
            let prev = curr.left;
            while (prev.right !== null && prev.right !== curr) {
                prev = prev.right;
            }

            if (prev.right === null) {
                prev.right = curr; // make thread
                curr = curr.left;
            } else {
                prev.right = null; // cut thread
                inorder.push(curr.val);
                curr = curr.right;
            }
        }
    }
    return inorder;
}`
};

export const steps = [
  {
    title: '1. Start at Root 1: Inorder predecessor is Node 5',
    phase: 'THREAD_CREATE',
    codeLine: 26,
    curr: 1,
    threadFrom: 5,
    threadTo: 1,
    threadActive: true,
    inorder: [],
    explain: 'Rightmost node in left subtree of 1 is 5. Create temporary thread: 5.right &rarr; 1. Move curr to 2.'
  },
  {
    title: '2. At Node 2: Inorder predecessor is Node 4',
    phase: 'THREAD_CREATE',
    codeLine: 26,
    curr: 2,
    threadFrom: 4,
    threadTo: 2,
    threadActive: true,
    inorder: [],
    explain: 'Create temporary thread: 4.right &rarr; 2. Move curr to 4.'
  },
  {
    title: '3. At Node 4: 4.left is null &rarr; Output 4 &rarr; Follow thread to 2',
    phase: 'VISIT_FOLLOW',
    codeLine: 18,
    curr: 4,
    threadFrom: 4,
    threadTo: 2,
    threadActive: true,
    inorder: [4],
    explain: 'Leaf 4 visited. Follow thread 4.right up to Node 2 without any stack memory!'
  },
  {
    title: '4. At Node 2: Thread already exists &rarr; Cut thread! Output 2 &rarr; Move to 5',
    phase: 'THREAD_CUT',
    codeLine: 30,
    curr: 2,
    threadFrom: 4,
    threadTo: 2,
    threadActive: false,
    inorder: [4, 2],
    explain: 'Predecessor right pointer points to curr (2). Snip thread (4.right = null). Output 2. Move to 2.right (5).'
  },
  {
    title: '5. Follow thread 5 &rarr; 1, Snip thread, Output 1, Visit 3',
    phase: 'COMPLETE',
    codeLine: 34,
    curr: null,
    threadFrom: null,
    threadTo: null,
    threadActive: false,
    inorder: [4, 2, 5, 1, 3],
    explain: 'Final Inorder sequence [4, 2, 5, 1, 3] generated with strictly O(1) extra space! Tree restored.'
  }
];

export default function MorrisInorderTraversalOfABinaryTreeVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
          Active: <strong className="text-cyan-400">{step.curr ? `Node ${step.curr}` : 'Finished'}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Auxiliary Space: <strong>O(1) No Stack / No Recursion</strong>
        </div>
        {step.threadActive && (
          <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
            Thread: <strong>Node {step.threadFrom} &rarr; Node {step.threadTo}</strong>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Threaded Binary Tree State</span>
          <span className="text-cyan-400 font-bold">Morris Traversal</span>
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
                  step.curr === v
                    ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200'
                    : 'bg-[#181a26] border-[#31364d] text-[var(--chalk)]'
                }`}
              >
                {v}
              </div>
            ))}
          </div>
        </div>

        {/* Output stream */}
        <div className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0f1016] border border-[var(--line)] text-xs font-mono">
          <span className="text-[var(--chalk-dim)]">Inorder Stream:</span>
          <div className="flex gap-1.5">
            {step.inorder.map((v, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                {v}
              </span>
            ))}
          </div>
        </div>

        <div className="text-xs font-mono text-[var(--chalk-dim)] bg-[var(--board-raised-2)] px-4 py-2 rounded-xl border border-[var(--line)] text-center w-full">
          Temporary threads connect the in-order predecessor to current node, allowing upward traversal without a call stack.
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Inorder Traversal of Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) recursion stack (O(H))',
  description: 'Traverses a binary tree in Left -> Root -> Right order recursively, visiting all left descendants before the parent node and all right descendants after.'
};

export const solutions = {
  cpp: `// C++ Inorder Traversal (Recursive)
// Time: O(N) | Space: O(H) where H is tree height
#include <vector>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
private:
    void inorder(TreeNode* root, vector<int>& result) {
        if (root == nullptr) return;

        // 1. Traverse Left Subtree
        inorder(root->left, result);

        // 2. Visit Root Node
        result.push_back(root->val);

        // 3. Traverse Right Subtree
        inorder(root->right, result);
    }
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> result;
        inorder(root, result);
        return result;
    }
};`,
  python: `# Python 3 Inorder Traversal (Recursive)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def inorderTraversal(self, root: TreeNode | None) -> list[int]:
        result = []

        def inorder(node):
            if not node:
                return
            inorder(node.left)
            result.append(node.val)
            inorder(node.right)

        inorder(root)
        return result`,
  java: `// Java Inorder Traversal (Recursive)
import java.util.*;

class Solution {
    private void inorder(TreeNode root, List<Integer> result) {
        if (root == null) return;

        inorder(root.left, result);
        result.add(root.val);
        inorder(root.right, result);
    }

    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        inorder(root, result);
        return result;
    }
}`,
  javascript: `// JavaScript Inorder Traversal (Recursive)
var inorderTraversal = function(root) {
    const result = [];

    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        result.push(node.val);
        inorder(node.right);
    }

    inorder(root);
    return result;
};`
};

export const steps = [
  {
    title: '1. Start Inorder at Root (Node 1): Left -> Root -> Right',
    phase: 'INITIAL',
    codeLine: 18,
    activeNode: 1,
    traversal: [],
    action: 'Descend to Left Child (Node 2)',
    variables: { current: 1, state: 'Calling inorder(root.left)' },
    explain: 'Inorder rule: before visiting node 1, we must completely traverse its entire left subtree.',
    intuition: 'Always prioritize left branch.'
  },
  {
    title: '2. At Node 2: Descend Left to Node 4',
    phase: 'GO_LEFT',
    codeLine: 21,
    activeNode: 4,
    traversal: [],
    action: 'Node 4 has no left child. Visit Node 4!',
    variables: { current: 4, left: 'null' },
    explain: 'Node 4 is a leaf. Its left child is null, so we process Node 4 itself.',
    intuition: 'Leaf node reached.'
  },
  {
    title: '3. Visit Node 4 -> Add 4 to result. Return to Node 2',
    phase: 'VISIT_ROOT',
    codeLine: 24,
    activeNode: 2,
    traversal: [4],
    action: 'Left of Node 2 is finished. Visit Node 2!',
    variables: { visited: 4, nextToVisit: 2 },
    explain: 'Node 4 added to traversal. Backtrack to Node 2 and record value 2.',
    intuition: 'Left of 2 is complete, now visit 2.'
  },
  {
    title: '4. Visit Node 2 -> Add 2. Descend Right to Node 5 -> Add 5',
    phase: 'VISIT_RIGHT',
    codeLine: 27,
    activeNode: 5,
    traversal: [4, 2, 5],
    action: 'Traverse Right Child of 2 (Node 5). Visit 5!',
    variables: { visited: [4, 2, 5], entireLeftSubtreeComplete: true },
    explain: 'Node 5 is visited. Entire left subtree of root 1 is now complete: [4, 2, 5].',
    intuition: 'Left subtree fully processed.'
  },
  {
    title: '5. Return to Root (Node 1) -> Add 1. Descend Right to Node 3 -> Add 3',
    phase: 'COMPLETED',
    codeLine: 34,
    activeNode: 3,
    traversal: [4, 2, 5, 1, 3],
    action: 'All Nodes Traversed in Inorder',
    variables: { finalTraversal: '[4, 2, 5, 1, 3]' },
    explain: 'Visit Root 1, then traverse right subtree (Node 3). Final inorder sequence: [4, 2, 5, 1, 3].',
    intuition: 'Inorder traversal of BST produces sorted order.'
  }
];

export default function InorderTraversalOfBinaryTreeVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Active Node: {step.activeNode ? `Node ${step.activeNode}` : 'Done'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Rule: Left → Root → Right
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Visited Count = {step.traversal.length} / 5
        </span>
      </div>

      {/* Binary Tree Graph */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-3">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">Binary Tree Structure</span>

        <div className="flex flex-col items-center gap-4 py-2 w-full">
          {/* Level 0: Root 1 */}
          <div className="flex justify-center">
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm transition-all ${
              step.activeNode === 1 
                ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg' 
                : step.traversal.includes(1) 
                ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300' 
                : 'border-[#272b3c] bg-[#161824] text-slate-400'
            }`}>
              1
            </div>
          </div>

          {/* Level 1: Nodes 2 and 3 */}
          <div className="flex justify-center gap-24">
            {[2, 3].map((val) => (
              <div key={val} className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${
                step.activeNode === val 
                  ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg' 
                  : step.traversal.includes(val) 
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300' 
                  : 'border-[#272b3c] bg-[#161824] text-slate-400'
              }`}>
                {val}
              </div>
            ))}
          </div>

          {/* Level 2: Nodes 4 and 5 */}
          <div className="flex justify-start gap-8 pl-12">
            {[4, 5].map((val) => (
              <div key={val} className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${
                step.activeNode === val 
                  ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg' 
                  : step.traversal.includes(val) 
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300' 
                  : 'border-[#272b3c] bg-[#161824] text-slate-400'
              }`}>
                {val}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traversal Output Array */}
      <div className="w-full bg-[#12131b] border border-emerald-500/30 rounded-2xl p-4 flex flex-col gap-2">
        <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">Inorder Traversal Array</span>
        <div className="flex items-center gap-2">
          {step.traversal.map((val, idx) => (
            <span key={idx} className="flex items-center gap-1.5">
              <span className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-sm">
                {val}
              </span>
              {idx < step.traversal.length - 1 && <span className="text-slate-600 text-xs font-mono">→</span>}
            </span>
          ))}
          {step.traversal.length === 0 && <span className="text-xs text-slate-500 italic font-mono">Traversing left branch...</span>}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

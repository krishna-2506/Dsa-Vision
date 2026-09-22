import React from 'react';

export const meta = {
  title: 'Maximum Depth of Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) recursion stack',
  description: 'Calculates the maximum depth (height) of a binary tree recursively using the bottom-up formula: 1 + max(depth(left), depth(right)).'
};

export const solutions = {
  cpp: `// C++ Maximum Depth of Binary Tree (Recursive)
// Time: O(N) | Space: O(H)
#include <algorithm>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    int maxDepth(TreeNode* root) {
        // Base case: empty tree has depth 0
        if (root == nullptr) return 0;

        // Recursive heights of left and right subtrees
        int leftDepth = maxDepth(root->left);
        int rightDepth = maxDepth(root->right);

        // Maximum depth at current node
        return 1 + max(leftDepth, rightDepth);
    }
};`,
  python: `# Python 3 Maximum Depth of Binary Tree
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxDepth(self, root: TreeNode | None) -> int:
        if not root:
            return 0

        left_depth = self.maxDepth(root.left)
        right_depth = self.maxDepth(root.right)

        return 1 + max(left_depth, right_depth)`,
  java: `// Java Maximum Depth of Binary Tree
class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;

        int leftDepth = maxDepth(root.left);
        int rightDepth = maxDepth(root.right);

        return 1 + Math.max(leftDepth, rightDepth);
    }
}`,
  javascript: `// JavaScript Maximum Depth of Binary Tree
var maxDepth = function(root) {
    if (!root) return 0;

    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);

    return 1 + Math.max(leftDepth, rightDepth);
};`
};

export const steps = [
  {
    title: '1. Root Node 3: Find 1 + max(depth(left), depth(right))',
    phase: 'INITIAL',
    codeLine: 18,
    activeNode: 3,
    nodeHeights: { 3: '?', 9: '?', 20: '?', 15: '?', 7: '?' },
    variables: { root: 3, formula: '1 + max(lh, rh)' },
    explain: 'To compute depth at root 3, we must compute height of left child (9) and right child (20).',
    intuition: 'Recursive depth-first postorder evaluation.'
  },
  {
    title: '2. Node 9 (Left Leaf): Both children null -> Depth = 1 + max(0, 0) = 1',
    phase: 'EVAL_LEAF',
    codeLine: 23,
    activeNode: 9,
    nodeHeights: { 3: '?', 9: 1, 20: '?', 15: '?', 7: '?' },
    variables: { node: 9, leftH: 0, rightH: 0, height: 1 },
    explain: 'Node 9 has no children. Base cases return 0. Depth of node 9 is 1.',
    intuition: 'Leaf depth is always 1.'
  },
  {
    title: '3. Leaves of Right Subtree: Node 15 and Node 7 each have Depth = 1',
    phase: 'EVAL_LEAF',
    codeLine: 23,
    activeNode: 15,
    nodeHeights: { 3: '?', 9: 1, 20: '?', 15: 1, 7: 1 },
    variables: { node15Depth: 1, node7Depth: 1 },
    explain: 'Nodes 15 and 7 are both leaf nodes with depth 1.',
    intuition: 'Subtree leaf depths computed.'
  },
  {
    title: '4. Node 20: Depth = 1 + max(depth(15), depth(7)) = 1 + max(1, 1) = 2',
    phase: 'EVAL_PARENT',
    codeLine: 23,
    activeNode: 20,
    nodeHeights: { 3: '?', 9: 1, 20: 2, 15: 1, 7: 1 },
    variables: { node: 20, leftChildH: 1, rightChildH: 1, height: 2 },
    explain: 'Right child 20 has height 1 + max(1, 1) = 2.',
    intuition: 'Right branch height is 2.'
  },
  {
    title: '5. Root Node 3: Depth = 1 + max(depth(9), depth(20)) = 1 + max(1, 2) = 3',
    phase: 'COMPLETED',
    codeLine: 23,
    activeNode: 3,
    nodeHeights: { 3: 3, 9: 1, 20: 2, 15: 1, 7: 1 },
    variables: { rootHeight: 3, maxDepth: 3 },
    explain: 'Root node 3 calculates 1 + max(1, 2) = 3. The maximum depth of the binary tree is 3.',
    intuition: 'Path: 3 -> 20 -> 15 (or 7) has 3 nodes.'
  }
];

export default function MaximumDepthInBtVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Evaluating Node: {step.activeNode}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Formula: 1 + max(left, right)
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Depth = {step.nodeHeights[3] === 3 ? 3 : 'Computing...'}
        </span>
      </div>

      {/* Binary Tree Heights View */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-6 flex flex-col items-center gap-3">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider">Binary Tree & Evaluated Heights</span>

        <div className="flex flex-col items-center gap-4 py-2 w-full">
          {/* Root 3 */}
          <div className="flex justify-center">
            <div className={`w-14 h-14 rounded-2xl border-2 flex flex-col items-center justify-center font-mono font-bold transition-all ${
              step.activeNode === 3 ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40' : 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300'
            }`}>
              <span className="text-sm">Val: 3</span>
              <span className="text-[10px] text-amber-400">h={step.nodeHeights[3]}</span>
            </div>
          </div>

          {/* Level 1: 9 and 20 */}
          <div className="flex justify-center gap-24">
            {[9, 20].map((val) => (
              <div key={val} className={`w-14 h-14 rounded-2xl border-2 flex flex-col items-center justify-center font-mono font-bold transition-all ${
                step.activeNode === val ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40' : 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-dim)]'
              }`}>
                <span className="text-sm">Val: {val}</span>
                <span className="text-[10px] text-amber-400">h={step.nodeHeights[val]}</span>
              </div>
            ))}
          </div>

          {/* Level 2: 15 and 7 */}
          <div className="flex justify-end gap-6 pr-12">
            {[15, 7].map((val) => (
              <div key={val} className={`w-13 h-13 rounded-2xl border-2 flex flex-col items-center justify-center font-mono font-bold transition-all ${
                step.activeNode === val ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40' : 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-dim)]'
              }`}>
                <span className="text-sm">Val: {val}</span>
                <span className="text-[10px] text-amber-400">h={step.nodeHeights[val]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 text-xs font-mono text-center text-[var(--chalk-dim)]">
        {step.explain}
      </div>
    </div>
  );
}

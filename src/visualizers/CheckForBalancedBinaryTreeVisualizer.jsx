import React from 'react';

export const meta = {
  title: 'Check for Balanced Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) recursion stack',
  description: 'Determines if a binary tree is height-balanced (for every node, abs(height(left) - height(right)) <= 1) using an optimal O(N) postorder check returning -1 on imbalance.'
};

export const solutions = {
  cpp: `// C++ Check for Balanced Binary Tree
// Time: O(N) | Space: O(H)
#include <algorithm>
#include <cmath>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
private:
    int checkHeight(TreeNode* root) {
        if (root == nullptr) return 0;

        int leftH = checkHeight(root->left);
        if (leftH == -1) return -1; // left subtree is unbalanced

        int rightH = checkHeight(root->right);
        if (rightH == -1) return -1; // right subtree is unbalanced

        // If height difference exceeds 1, tree is unbalanced
        if (abs(leftH - rightH) > 1) return -1;

        return 1 + max(leftH, rightH);
    }
public:
    bool isBalanced(TreeNode* root) {
        return checkHeight(root) != -1;
    }
};`,
  python: `# Python 3 Check for Balanced Binary Tree
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isBalanced(self, root: TreeNode | None) -> bool:
        def check(node):
            if not node:
                return 0

            left_h = check(node.left)
            if left_h == -1:
                return -1

            right_h = check(node.right)
            if right_h == -1:
                return -1

            if abs(left_h - right_h) > 1:
                return -1

            return 1 + max(left_h, right_h)

        return check(root) != -1`,
  java: `// Java Check for Balanced Binary Tree
class Solution {
    private int checkHeight(TreeNode root) {
        if (root == null) return 0;

        int leftH = checkHeight(root.left);
        if (leftH == -1) return -1;

        int rightH = checkHeight(root.right);
        if (rightH == -1) return -1;

        if (Math.abs(leftH - rightH) > 1) return -1;

        return 1 + Math.max(leftH, rightH);
    }

    public boolean isBalanced(TreeNode root) {
        return checkHeight(root) != -1;
    }
}`,
  javascript: `// JavaScript Check for Balanced Binary Tree
var isBalanced = function(root) {
    function check(node) {
        if (!node) return 0;

        const leftH = check(node.left);
        if (leftH === -1) return -1;

        const rightH = check(node.right);
        if (rightH === -1) return -1;

        if (Math.abs(leftH - rightH) > 1) return -1;

        return 1 + Math.max(leftH, rightH);
    }

    return check(root) !== -1;
};`
};

export const steps = [
  {
    title: '1. Check Tree [3, 9, 20, null, null, 15, 7]: Rule |lh - rh| <= 1',
    phase: 'INITIAL',
    codeLine: 18,
    activeNode: 3,
    diff: 0,
    isBalanced: true,
    heights: { 3: '?', 9: '?', 20: '?', 15: '?', 7: '?' },
    variables: { root: 3, condition: '|leftHeight - rightHeight| <= 1' },
    explain: 'Every node in the tree must satisfy the balance condition. If any subtree returns -1, the entire tree is unbalanced.',
    intuition: 'Postorder height check stops early on first violation.'
  },
  {
    title: '2. Check Node 9: Left=0, Right=0 -> Diff = |0 - 0| = 0 <= 1 -> Balanced (Height = 1)',
    phase: 'BALANCED_NODE',
    codeLine: 26,
    activeNode: 9,
    diff: 0,
    isBalanced: true,
    heights: { 3: '?', 9: 1, 20: '?', 15: '?', 7: '?' },
    variables: { node: 9, diff: 0, height: 1 },
    explain: 'Node 9 has height 1 and diff 0 <= 1. Node 9 is balanced.',
    intuition: 'Leaf nodes are always balanced.'
  },
  {
    title: '3. Check Nodes 15 and 7: Heights = 1 -> Node 20 has lh=1, rh=1 -> Diff = 0 <= 1',
    phase: 'BALANCED_NODE',
    codeLine: 26,
    activeNode: 20,
    diff: 0,
    isBalanced: true,
    heights: { 3: '?', 9: 1, 20: 2, 15: 1, 7: 1 },
    variables: { node: 20, diff: 0, height: 2 },
    explain: 'Node 20 has left height 1 and right height 1. Diff is 0 <= 1. Height is 2. Balanced!',
    intuition: 'Subtree 20 is balanced.'
  },
  {
    title: '4. Check Root 3: lh=1 (Node 9), rh=2 (Node 20) -> Diff = |1 - 2| = 1 <= 1',
    phase: 'BALANCED_NODE',
    codeLine: 26,
    activeNode: 3,
    diff: 1,
    isBalanced: true,
    heights: { 3: 3, 9: 1, 20: 2, 15: 1, 7: 1 },
    variables: { root: 3, leftH: 1, rightH: 2, diff: 1, height: 3 },
    explain: 'At root 3: |1 - 2| = 1 <= 1. Balance condition is satisfied at every single node.',
    intuition: 'Height difference 1 is allowed.'
  },
  {
    title: '5. Completed: Binary Tree is Height-Balanced -> return true',
    phase: 'COMPLETED',
    codeLine: 31,
    activeNode: 3,
    diff: 1,
    isBalanced: true,
    heights: { 3: 3, 9: 1, 20: 2, 15: 1, 7: 1 },
    variables: { result: true, finalHeight: 3 },
    explain: 'Every node in the tree has height difference <= 1. Tree is height-balanced.',
    intuition: 'Optimal O(N) time with O(H) call stack.'
  }
];

export default function CheckForBalancedBinaryTreeVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Active Node: {step.activeNode}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          |lh - rh| = {step.diff} (Limit: ≤ 1)
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Balanced: {step.isBalanced ? 'YES' : 'NO'}
        </span>
      </div>

      {/* Tree Visualization */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-6 flex flex-col items-center gap-4">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider">Subtree Balance Verification</span>

        <div className="flex flex-col items-center gap-4 py-2 w-full">
          {/* Root 3 */}
          <div className="flex justify-center">
            <div className={`w-14 h-14 rounded-2xl border-2 flex flex-col items-center justify-center font-mono font-bold transition-all ${
              step.activeNode === 3 ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40' : 'border-emerald-500 bg-emerald-500/15 text-emerald-300'
            }`}>
              <span className="text-sm">3</span>
              <span className="text-[10px] text-amber-400">h={step.heights[3]}</span>
            </div>
          </div>

          {/* Level 1: 9 and 20 */}
          <div className="flex justify-center gap-24">
            {[9, 20].map((val) => (
              <div key={val} className={`w-14 h-14 rounded-2xl border-2 flex flex-col items-center justify-center font-mono font-bold transition-all ${
                step.activeNode === val ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40' : 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-dim)]'
              }`}>
                <span className="text-sm">{val}</span>
                <span className="text-[10px] text-amber-400">h={step.heights[val]}</span>
              </div>
            ))}
          </div>

          {/* Level 2: 15 and 7 */}
          <div className="flex justify-end gap-6 pr-12">
            {[15, 7].map((val) => (
              <div key={val} className={`w-13 h-13 rounded-2xl border-2 flex flex-col items-center justify-center font-mono font-bold transition-all ${
                step.activeNode === val ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40' : 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-dim)]'
              }`}>
                <span className="text-sm">{val}</span>
                <span className="text-[10px] text-amber-400">h={step.heights[val]}</span>
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

import React from 'react';

export const meta = {
  title: 'Children Sum Property in Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) recursion stack',
  description: 'Validates and transforms a binary tree such that for every node, its value strictly equals the sum of its left and right child nodes (leaves remain unchanged).'
};

export const solutions = {
  cpp: `// C++: Children Sum Property Conversion
// Time Complexity: O(N) | Space: O(H)
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void changeTree(TreeNode* root) {
    if (root == nullptr) return;

    int childSum = 0;
    if (root->left) childSum += root->left->val;
    if (root->right) childSum += root->right->val;

    // On the way down: boost children if parent is larger
    if (childSum >= root->val) {
        root->val = childSum;
    } else {
        if (root->left) root->left->val = root->val;
        else if (root->right) root->right->val = root->val;
    }

    changeTree(root->left);
    changeTree(root->right);

    // On the way up: recompute parent from finalized children
    int total = 0;
    if (root->left) total += root->left->val;
    if (root->right) total += root->right->val;
    if (root->left || root->right) root->val = total;
}`,
  java: `// Java: Children Sum Property Conversion
class Solution {
    public void changeTree(TreeNode root) {
        if (root == null) return;

        int childSum = 0;
        if (root.left != null) childSum += root.left.val;
        if (root.right != null) childSum += root.right.val;

        if (childSum >= root.val) {
            root.val = childSum;
        } else {
            if (root.left != null) root.left.val = root.val;
            else if (root.right != null) root.right.val = root.val;
        }

        changeTree(root.left);
        changeTree(root.right);

        int total = 0;
        if (root.left != null) total += root.left.val;
        if (root.right != null) total += root.right.val;
        if (root.left != null || root.right != null) root.val = total;
    }
}`,
  python: `# Python 3: Children Sum Property Conversion
def change_tree(root):
    if not root:
        return

    child_sum = 0
    if root.left: child_sum += root.left.val
    if root.right: child_sum += root.right.val

    if child_sum >= root.val:
        root.val = child_sum
    else:
        if root.left: root.left.val = root.val
        elif root.right: root.right.val = root.val

    change_tree(root.left)
    change_tree(root.right)

    total = 0
    if root.left: total += root.left.val
    if root.right: total += root.right.val
    if root.left or root.right:
        root.val = total`,
  javascript: `// JavaScript: Children Sum Property Conversion
function changeTree(root) {
    if (!root) return;

    let childSum = 0;
    if (root.left) childSum += root.left.val;
    if (root.right) childSum += root.right.val;

    if (childSum >= root.val) {
        root.val = childSum;
    } else {
        if (root.left) root.left.val = root.val;
        else if (root.right) root.right.val = root.val;
    }

    changeTree(root.left);
    changeTree(root.right);

    let total = 0;
    if (root.left) total += root.left.val;
    if (root.right) total += root.right.val;
    if (root.left || root.right) root.val = total;
}`
};

export const steps = [
  {
    title: '1. Initial Tree: Root = 2, Left Child = 35, Right Child = 10',
    phase: 'INITIAL',
    codeLine: 13,
    rootVal: 2,
    leftVal: 35,
    rightVal: 10,
    action: 'Check childSum = 35 + 10 = 45 > 2',
    explain: 'childSum (45) is greater than root (2). On way down, root becomes 45.'
  },
  {
    title: '2. Downward Propagation: root.val boosted to 45',
    phase: 'DOWN_PROPAGATE',
    codeLine: 18,
    rootVal: 45,
    leftVal: 35,
    rightVal: 10,
    action: 'root.val = childSum (45)',
    explain: 'Root value is adjusted upwards to match child capacity.'
  },
  {
    title: '3. Recurse Subtrees: Subtrees modified recursively',
    phase: 'RECURSE',
    codeLine: 24,
    rootVal: 45,
    leftVal: 35,
    rightVal: 10,
    action: 'Recursively process left and right branches',
    explain: 'Leaves retain their values or expand if internal parents are larger.'
  },
  {
    title: '4. Upward Consolidation: root.val = left (35) + right (10) = 45!',
    phase: 'COMPLETE',
    codeLine: 31,
    rootVal: 45,
    leftVal: 35,
    rightVal: 10,
    action: 'root.val = 35 + 10 = 45 (Exact Children Sum!)',
    explain: 'Property holds: Parent (45) equals exactly left child (35) + right child (10)!'
  }
];

export default function ChildrenSumPropertyInBinaryTreeVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
          Step: <strong className="text-cyan-400">{step.action}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Target Property: <strong>Node = Left + Right</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Binary Tree Transformation</span>
          <span className="text-emerald-400 font-bold">Children Sum Rule</span>
        </div>

        <div className="flex flex-col items-center gap-6 py-4">
          {/* Parent Node */}
          <div className="w-16 h-16 rounded-full border-2 border-cyan-400 bg-cyan-500/20 text-cyan-200 flex flex-col items-center justify-center font-mono font-bold text-lg shadow-lg shadow-cyan-500/20">
            <span className="text-[9px] text-cyan-400">PARENT</span>
            <span>{step.rootVal}</span>
          </div>

          {/* Children */}
          <div className="flex justify-center gap-20">
            <div className="w-14 h-14 rounded-full border-2 border-emerald-400 bg-emerald-500/20 text-emerald-200 flex flex-col items-center justify-center font-mono font-bold text-sm">
              <span className="text-[8px] text-emerald-400">LEFT</span>
              <span>{step.leftVal}</span>
            </div>

            <div className="w-14 h-14 rounded-full border-2 border-purple-400 bg-purple-500/20 text-purple-200 flex flex-col items-center justify-center font-mono font-bold text-sm">
              <span className="text-[8px] text-purple-400">RIGHT</span>
              <span>{step.rightVal}</span>
            </div>
          </div>
        </div>

        <div className="text-xs font-mono text-[var(--chalk-dim)] bg-[var(--board-raised-2)] px-4 py-2 rounded-xl border border-[var(--line)] text-center w-full">
          Verification: {step.leftVal} + {step.rightVal} = {step.leftVal + step.rightVal} {step.rootVal === step.leftVal + step.rightVal ? '== ' + step.rootVal + ' (VALID!)' : '!= ' + step.rootVal}
        </div>
      </div>
    </div>
  );
}

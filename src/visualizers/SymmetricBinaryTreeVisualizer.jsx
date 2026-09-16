import React from 'react';

export const meta = {
  title: 'Symmetric (Mirror) Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) recursion stack',
  description: 'Checks whether a binary tree is symmetric (a mirror reflection of itself around the center) by comparing left and right subtrees with inverted child pointer pairs.'
};

export const solutions = {
  cpp: `// C++ Symmetric Tree (Mirror Reflection)
// Time: O(N) | Space: O(H)
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
private:
    bool isMirror(TreeNode* t1, TreeNode* t2) {
        // If both subtrees are null, they are symmetric
        if (t1 == nullptr && t2 == nullptr) return true;

        // If exactly one is null, they are asymmetric
        if (t1 == nullptr || t2 == nullptr) return false;

        // Values must match, and outer/inner children must mirror each other
        return (t1->val == t2->val) &&
               isMirror(t1->left, t2->right) &&
               isMirror(t1->right, t2->left);
    }
public:
    bool isSymmetric(TreeNode* root) {
        if (root == nullptr) return true;
        return isMirror(root->left, root->right);
    }
};`,
  python: `# Python 3 Symmetric Tree
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isSymmetric(self, root: TreeNode | None) -> bool:
        if not root:
            return True

        def is_mirror(t1, t2):
            if not t1 and not t2:
                return True
            if not t1 or not t2:
                return False

            return (t1.val == t2.val and
                    is_mirror(t1.left, t2.right) and
                    is_mirror(t1.right, t2.left))

        return is_mirror(root.left, root.right)`,
  java: `// Java Symmetric Tree
class Solution {
    private boolean isMirror(TreeNode t1, TreeNode t2) {
        if (t1 == null && t2 == null) return true;
        if (t1 == null || t2 == null) return false;

        return (t1.val == t2.val) &&
               isMirror(t1.left, t2.right) &&
               isMirror(t1.right, t2.left);
    }

    public boolean isSymmetric(TreeNode root) {
        if (root == null) return true;
        return isMirror(root.left, root.right);
    }
}`,
  javascript: `// JavaScript Symmetric Tree
var isSymmetric = function(root) {
    if (!root) return true;

    function isMirror(t1, t2) {
        if (!t1 && !t2) return true;
        if (!t1 || !t2) return false;

        return (t1.val === t2.val) &&
               isMirror(t1.left, t2.right) &&
               isMirror(t1.right, t2.left);
    }

    return isMirror(root.left, root.right);
};`
};

export const steps = [
  {
    title: '1. Root 1: Compare Left Subtree (Node 2) with Right Subtree (Node 2)',
    phase: 'INITIAL',
    codeLine: 26,
    pair: [2, 2],
    isMatch: true,
    symmetricSoFar: true,
    variables: { t1: 2, t2: 2, rule: 't1.left == t2.right AND t1.right == t2.left' },
    explain: 'Symmetry requires: 1) t1.val == t2.val. 2) t1.left mirrors t2.right (outer children). 3) t1.right mirrors t2.left (inner children).',
    intuition: 'Two subtrees reflect across a vertical mirror axis.'
  },
  {
    title: '2. Compare Roots of Subtrees: t1.val (2) == t2.val (2) -> MATCH',
    phase: 'EVAL_PAIR',
    codeLine: 19,
    pair: [2, 2],
    isMatch: true,
    symmetricSoFar: true,
    variables: { t1Val: 2, t2Val: 2, match: true },
    explain: 'Values match. Next, compare outer children (left of t1 vs right of t2).',
    intuition: 'Subtree roots are identical.'
  },
  {
    title: '3. Compare Outer Children: t1.left (3) vs t2.right (3) -> MATCH',
    phase: 'OUTER_MIRROR',
    codeLine: 20,
    pair: [3, 3],
    isMatch: true,
    symmetricSoFar: true,
    variables: { 't1.left': 3, 't2.right': 3, outerMatch: true },
    explain: 'Outer left node has value 3 and outer right node has value 3. Both are leaves. Match confirmed!',
    intuition: 'Outer mirror boundaries match.'
  },
  {
    title: '4. Compare Inner Children: t1.right (4) vs t2.left (4) -> MATCH',
    phase: 'INNER_MIRROR',
    codeLine: 21,
    pair: [4, 4],
    isMatch: true,
    symmetricSoFar: true,
    variables: { 't1.right': 4, 't2.left': 4, innerMatch: true },
    explain: 'Inner right node has value 4 and inner left node has value 4. Both are leaves. Match confirmed!',
    intuition: 'Inner mirror boundaries match.'
  },
  {
    title: '5. Completed: All Subtree Pairs Satisfy Mirror Reflection -> return true',
    phase: 'COMPLETED',
    codeLine: 26,
    pair: null,
    isMatch: true,
    symmetricSoFar: true,
    variables: { result: true, isSymmetric: true },
    explain: 'All pairs match in value and reciprocal child structure. The binary tree is symmetric.',
    intuition: 'Perfect mirror reflection confirmed across entire tree.'
  }
];

export default function SymmetricBinaryTreeVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Comparing Pair: {step.pair ? `(${step.pair[0]} ↔ ${step.pair[1]})` : 'Done'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Mirror Symmetry: {step.isMatch ? 'MATCH' : 'MISMATCH'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Symmetric = YES
        </span>
      </div>

      {/* Symmetric Tree View with Mirror Axis */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 relative">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">Mirror Reflection Symmetry</span>

        {/* Central Vertical Mirror Axis */}
        <div className="absolute top-12 bottom-6 w-[2px] bg-gradient-to-b from-purple-500/60 via-purple-400 to-purple-500/60 dashed border-l border-dashed border-purple-400" />

        <div className="flex flex-col items-center gap-6 py-2 w-full z-10">
          {/* Root 1 */}
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-emerald-500/50 bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono font-bold text-sm shadow-md">
              1
            </div>
          </div>

          {/* Level 1: Left 2 and Right 2 */}
          <div className="flex justify-center gap-28">
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm transition-all ${
              step.pair && step.pair[0] === 2 ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg' : 'border-blue-500/40 bg-blue-500/15 text-blue-300'
            }`}>
              2
            </div>
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm transition-all ${
              step.pair && step.pair[1] === 2 ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg' : 'border-blue-500/40 bg-blue-500/15 text-blue-300'
            }`}>
              2
            </div>
          </div>

          {/* Level 2: Outer (3, 3) and Inner (4, 4) */}
          <div className="flex justify-between w-full max-w-sm px-4">
            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${
              step.pair && step.pair[0] === 3 ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg' : 'border-[#272b3c] bg-[#161824] text-slate-300'
            }`}>
              3
            </div>
            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${
              step.pair && step.pair[0] === 4 ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg' : 'border-[#272b3c] bg-[#161824] text-slate-300'
            }`}>
              4
            </div>
            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${
              step.pair && step.pair[1] === 4 ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg' : 'border-[#272b3c] bg-[#161824] text-slate-300'
            }`}>
              4
            </div>
            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${
              step.pair && step.pair[1] === 3 ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg' : 'border-[#272b3c] bg-[#161824] text-slate-300'
            }`}>
              3
            </div>
          </div>
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Diameter of Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) recursion stack',
  description: 'Calculates the length of the longest path between any two nodes in a binary tree (which may or may not pass through the root) by maximizing leftHeight + rightHeight at each node.'
};

export const solutions = {
  cpp: `// C++ Diameter of Binary Tree
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
private:
    int height(TreeNode* root, int& diameter) {
        if (root == nullptr) return 0;

        int lh = height(root->left, diameter);
        int rh = height(root->right, diameter);

        // Path passing through current node: lh + rh edges
        diameter = max(diameter, lh + rh);

        // Return height to parent
        return 1 + max(lh, rh);
    }
public:
    int diameterOfBinaryTree(TreeNode* root) {
        int diameter = 0;
        height(root, diameter);
        return diameter;
    }
};`,
  python: `# Python 3 Diameter of Binary Tree
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def diameterOfBinaryTree(self, root: TreeNode | None) -> int:
        diameter = 0

        def height(node):
            nonlocal diameter
            if not node:
                return 0

            lh = height(node.left)
            rh = height(node.right)

            diameter = max(diameter, lh + rh)

            return 1 + max(lh, rh)

        height(root)
        return diameter`,
  java: `// Java Diameter of Binary Tree
class Solution {
    private int height(TreeNode root, int[] diameter) {
        if (root == null) return 0;

        int lh = height(root.left, diameter);
        int rh = height(root.right, diameter);

        diameter[0] = Math.max(diameter[0], lh + rh);

        return 1 + Math.max(lh, rh);
    }

    public int diameterOfBinaryTree(TreeNode root) {
        int[] diameter = new int[1];
        height(root, diameter);
        return diameter[0];
    }
}`,
  javascript: `// JavaScript Diameter of Binary Tree
var diameterOfBinaryTree = function(root) {
    let diameter = 0;

    function height(node) {
        if (!node) return 0;

        const lh = height(node.left);
        const rh = height(node.right);

        diameter = Math.max(diameter, lh + rh);

        return 1 + Math.max(lh, rh);
    }

    height(root);
    return diameter;
};`
};

export const steps = [
  {
    title: '1. Tree: Root 1 with Left Child 2 (children 4, 5) and Right Child 3',
    phase: 'INITIAL',
    codeLine: 23,
    activeNode: 1,
    diameter: 0,
    curNodeCurPath: 0,
    variables: { diameter: 0, formula: 'diameter = max(diameter, lh + rh)' },
    explain: 'At every node, the longest path that uses this node as the curve peak has length = leftHeight + rightHeight (edges).',
    intuition: 'Diameter does not necessarily pass through the root node.'
  },
  {
    title: '2. Node 4 and Node 5: Leaves have lh=0, rh=0 -> height = 1',
    phase: 'LEAF_EVAL',
    codeLine: 26,
    activeNode: 4,
    diameter: 0,
    curNodeCurPath: 0,
    variables: { node4Height: 1, node5Height: 1 },
    explain: 'Leaves return height 1 to their parent node 2.',
    intuition: 'Leaf height = 1, diameter at leaf = 0.'
  },
  {
    title: '3. Node 2: lh = 1 (Node 4), rh = 1 (Node 5) -> Path = 1 + 1 = 2 edges! Diameter = 2',
    phase: 'UPDATE_DIAMETER',
    codeLine: 23,
    activeNode: 2,
    diameter: 2,
    curNodeCurPath: 2,
    variables: { node: 2, lh: 1, rh: 1, localPath: 2, globalDiameter: 2 },
    explain: 'Path through Node 2 connecting 4 -> 2 -> 5 has 2 edges. Diameter updates to max(0, 2) = 2.',
    intuition: 'Local path 4 -> 2 -> 5 has 2 edges.'
  },
  {
    title: '4. Node 3: Leaf has height = 1, diameter remains 2',
    phase: 'EVAL_RIGHT',
    codeLine: 26,
    activeNode: 3,
    diameter: 2,
    curNodeCurPath: 0,
    variables: { node: 3, height: 1 },
    explain: 'Right subtree of root 1 has height 1.',
    intuition: 'Right child height is 1.'
  },
  {
    title: '5. Root Node 1: lh = 2 (Node 2), rh = 1 (Node 3) -> Path = 2 + 1 = 3 edges! Diameter = 3',
    phase: 'COMPLETED',
    codeLine: 31,
    activeNode: 1,
    diameter: 3,
    curNodeCurPath: 3,
    variables: { root: 1, lh: 2, rh: 1, path: '4 -> 2 -> 1 -> 3', diameter: 3 },
    explain: 'Path 4 -> 2 -> 1 -> 3 has length 2 + 1 = 3 edges. Global diameter = 3.',
    intuition: 'Overall longest path across entire binary tree has 3 edges.'
  }
];

export default function DiameterOfBinaryTreeVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Evaluating: Node {step.activeNode}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Local Path (lh + rh) = {step.curNodeCurPath}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Max Diameter = {step.diameter} edges
        </span>
      </div>

      {/* Tree Visualization */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-6 flex flex-col items-center gap-4">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider">Diameter Path Search</span>

        <div className="flex flex-col items-center gap-4 py-2 w-full">
          {/* Root 1 */}
          <div className="flex justify-center">
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm transition-all ${
              step.activeNode === 1 
                ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg' 
                : 'border-emerald-500/50 bg-emerald-500/15 text-emerald-300'
            }`}>
              1
            </div>
          </div>

          {/* Level 1: 2 and 3 */}
          <div className="flex justify-center gap-24">
            {[2, 3].map((val) => (
              <div key={val} className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${
                step.activeNode === val 
                  ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg' 
                  : 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-dim)]'
              }`}>
                {val}
              </div>
            ))}
          </div>

          {/* Level 2: 4 and 5 */}
          <div className="flex justify-start gap-8 pl-12">
            {[4, 5].map((val) => (
              <div key={val} className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${
                step.activeNode === val 
                  ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg' 
                  : 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-dim)]'
              }`}>
                {val}
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

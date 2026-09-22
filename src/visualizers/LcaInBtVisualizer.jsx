import React from 'react';

export const meta = {
  title: 'Lowest Common Ancestor in Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) recursion stack',
  description: 'Finds the lowest common ancestor (LCA) node of two given nodes p and q in a binary tree where both branches converge.'
};

export const solutions = {
  cpp: `// C++: Lowest Common Ancestor in Binary Tree
// Time Complexity: O(N) | Space Complexity: O(H)
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        // Base case: null or found target node
        if (root == nullptr || root == p || root == q) {
            return root;
        }

        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);

        // If both subtrees return non-null, root is the LCA
        if (left != nullptr && right != nullptr) {
            return root;
        }

        return (left != nullptr) ? left : right;
    }
};`,
  java: `// Java: Lowest Common Ancestor in Binary Tree
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) {
            return root;
        }

        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        if (left != null && right != null) {
            return root;
        }

        return left != null ? left : right;
    }
}`,
  python: `# Python 3: Lowest Common Ancestor in Binary Tree
def lowest_common_ancestor(root, p, q):
    if not root or root == p or root == q:
        return root

    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)

    if left and right:
        return root

    return left if left else right`,
  javascript: `// JavaScript: Lowest Common Ancestor in Binary Tree
function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) {
        return root;
    }

    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    if (left && right) {
        return root;
    }

    return left ? left : right;
}`
};

export const steps = [
  {
    title: '1. Target Nodes: Find LCA of p = Node 5 and q = Node 1',
    phase: 'INIT',
    codeLine: 14,
    activeNode: 3,
    lcaFound: null,
    explain: 'Start DFS at Root 3. Check if root is null or matches p (5) or q (1).'
  },
  {
    title: '2. Search Left Subtree of 3: Traverse down to Node 5 (Matches p!)',
    phase: 'LEFT_HIT',
    codeLine: 14,
    activeNode: 5,
    lcaFound: null,
    explain: 'At Node 5, root == p &rarr; returns Node 5 up to Root 3. Left branch returns 5.'
  },
  {
    title: '3. Search Right Subtree of 3: Traverse to Node 1 (Matches q!)',
    phase: 'RIGHT_HIT',
    codeLine: 14,
    activeNode: 1,
    lcaFound: null,
    explain: 'At Node 1, root == q &rarr; returns Node 1 up to Root 3. Right branch returns 1.'
  },
  {
    title: '4. At Root 3: left != null (5) AND right != null (1) &rarr; Root 3 is the LCA!',
    phase: 'LCA_DISCOVERED',
    codeLine: 22,
    activeNode: 3,
    lcaFound: 3,
    explain: 'Both left and right calls returned non-null pointers! Therefore, Root 3 is the Lowest Common Ancestor.'
  }
];

export default function LcaInBtVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Target p: <strong>Node 5</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Target q: <strong>Node 1</strong>
        </div>
        {step.lcaFound !== null && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
            LCA Node: <strong>Node {step.lcaFound}</strong>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Binary Tree Search &amp; Convergence</span>
          <span className="text-emerald-400 font-bold">LCA Node Discovery</span>
        </div>

        <div className="flex flex-col items-center gap-5 py-3 w-full">
          {/* Root 3 */}
          <div
            className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-mono font-bold text-base transition-all ${
              step.lcaFound === 3
                ? 'bg-emerald-500/30 border-emerald-400 text-emerald-100 shadow-xl shadow-emerald-500/30 scale-110'
                : step.activeNode === 3
                ? 'bg-amber-500/25 border-amber-400 text-amber-200'
                : 'bg-[#181a26] border-[#31364d] text-[var(--chalk)]'
            }`}
          >
            3
          </div>

          {/* Children 5 and 1 */}
          <div className="flex justify-center gap-20 w-full">
            <div
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm ${
                step.activeNode === 5
                  ? 'bg-purple-500/30 border-purple-400 text-purple-100 shadow-lg'
                  : 'bg-purple-500/15 border-purple-500/40 text-purple-300'
              }`}
            >
              5 (p)
            </div>

            <div
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm ${
                step.activeNode === 1
                  ? 'bg-cyan-500/30 border-cyan-400 text-cyan-100 shadow-lg'
                  : 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
              }`}
            >
              1 (q)
            </div>
          </div>
        </div>

        <div className="text-xs font-mono text-[var(--chalk-dim)] bg-[var(--board-raised-2)] px-4 py-2 rounded-xl border border-[var(--line)] text-center w-full">
          If left returns p and right returns q, current node is the lowest common ancestor where paths diverge.
        </div>
      </div>
    </div>
  );
}

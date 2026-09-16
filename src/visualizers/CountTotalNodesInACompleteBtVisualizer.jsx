import React from 'react';

export const meta = {
  title: 'Count Nodes in a Complete Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O((log N)^2)',
  spaceComplexity: 'O(log N) recursion stack',
  description: 'Counts total nodes in a complete binary tree in sub-linear O((log N)^2) time by comparing left and right boundary depths: if equal, the subtree is perfect with (1 << h) - 1 nodes.'
};

export const solutions = {
  cpp: `// C++: Count Total Nodes in a Complete Binary Tree
// Time Complexity: O((log N)^2) | Space: O(log N)
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
private:
    int findLeftHeight(TreeNode* node) {
        int h = 0;
        while (node) {
            h++;
            node = node->left;
        }
        return h;
    }

    int findRightHeight(TreeNode* node) {
        int h = 0;
        while (node) {
            h++;
            node = node->right;
        }
        return h;
    }

public:
    int countNodes(TreeNode* root) {
        if (root == nullptr) return 0;

        int lh = findLeftHeight(root);
        int rh = findRightHeight(root);

        // If left height == right height, it is a perfect binary tree
        if (lh == rh) {
            return (1 << lh) - 1;
        }

        return 1 + countNodes(root->left) + countNodes(root->right);
    }
};`,
  java: `// Java: Count Total Nodes in a Complete Binary Tree
class Solution {
    private int getLeftHeight(TreeNode node) {
        int h = 0;
        while (node != null) {
            h++;
            node = node.left;
        }
        return h;
    }

    private int getRightHeight(TreeNode node) {
        int h = 0;
        while (node != null) {
            h++;
            node = node.right;
        }
        return h;
    }

    public int countNodes(TreeNode root) {
        if (root == null) return 0;

        int lh = getLeftHeight(root);
        int rh = getRightHeight(root);

        if (lh == rh) {
            return (1 << lh) - 1;
        }

        return 1 + countNodes(root.left) + countNodes(root.right);
    }
}`,
  python: `# Python 3: Count Total Nodes in a Complete Binary Tree
def count_nodes(root):
    if not root:
        return 0

    def left_height(node):
        h = 0
        while node:
            h += 1
            node = node.left
        return h

    def right_height(node):
        h = 0
        while node:
            h += 1
            node = node.right
        return h

    lh = left_height(root)
    rh = right_height(root)

    if lh == rh:
        return (1 << lh) - 1

    return 1 + count_nodes(root.left) + count_nodes(root.right)`,
  javascript: `// JavaScript: Count Total Nodes in a Complete Binary Tree
function countNodes(root) {
    if (!root) return 0;

    function leftHeight(node) {
        let h = 0;
        while (node) {
            h++;
            node = node.left;
        }
        return h;
    }

    function rightHeight(node) {
        let h = 0;
        while (node) {
            h++;
            node = node.right;
        }
        return h;
    }

    const lh = leftHeight(root);
    const rh = rightHeight(root);

    if (lh === rh) {
        return (1 << lh) - 1;
    }

    return 1 + countNodes(root.left) + countNodes(root.right);
}`
};

export const steps = [
  {
    title: '1. Root 1: Check Left Height (lh) vs Right Height (rh)',
    phase: 'CHECK_ROOT',
    codeLine: 31,
    activeNode: 1,
    lh: 3,
    rh: 2,
    formula: 'lh (3) != rh (2) &rarr; Not full at root',
    count: null,
    explain: 'Left height is 3, right height is 2. Since lh != rh, recurse on left and right subtrees: 1 + left + right.'
  },
  {
    title: '2. Recurse Left Subtree (Root 2): lh = 2, rh = 2 &rarr; Perfect Subtree!',
    phase: 'PERFECT_LEFT',
    codeLine: 35,
    activeNode: 2,
    lh: 2,
    rh: 2,
    formula: '(1 << 2) - 1 = 3 nodes in O(log N)!',
    count: 3,
    explain: 'At Node 2, left height = 2, right height = 2. Left subtree is perfect! Directly calculate 2^2 - 1 = 3 nodes in O(log N).'
  },
  {
    title: '3. Recurse Right Subtree (Root 3): lh = 2, rh = 1 &rarr; Recurse',
    phase: 'CHECK_RIGHT',
    codeLine: 31,
    activeNode: 3,
    lh: 2,
    rh: 1,
    formula: 'lh (2) != rh (1)',
    count: null,
    explain: 'At Node 3, lh = 2, rh = 1. Recurse down to Node 6.'
  },
  {
    title: '4. At Node 6 (Leaf): lh = 1, rh = 1 &rarr; 1 Node',
    phase: 'LEAF_RIGHT',
    codeLine: 35,
    activeNode: 6,
    lh: 1,
    rh: 1,
    formula: '(1 << 1) - 1 = 1 node',
    count: 1,
    explain: 'Node 6 is a leaf with 1 node. Total for right subtree = 1 (Node 3) + 1 (Node 6) = 2 nodes.'
  },
  {
    title: '5. Combine All: Total Nodes = 1 + 3 (Left) + 2 (Right) = 6 Nodes!',
    phase: 'FINAL',
    codeLine: 38,
    activeNode: 1,
    lh: 3,
    rh: 2,
    formula: '1 + 3 + 2 = 6',
    count: 6,
    explain: 'Total nodes = 6 computed in O((log N)^2) time without visiting all nodes!'
  }
];

export default function CountTotalNodesInACompleteBtVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Active: <strong className="text-cyan-400">Node {step.activeNode}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Formula: <strong>{step.formula}</strong>
        </div>
        {step.count !== null && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
            Computed: <strong>{step.count} nodes</strong>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl w-full">
        <div className="text-xs font-mono text-[#8a8ea3] flex items-center justify-between w-full px-2">
          <span>Complete Binary Tree (6 Nodes)</span>
          <span className="text-emerald-400 font-bold">O((log N)^2) Algorithm</span>
        </div>

        <div className="flex flex-col items-center gap-4 py-3 w-full">
          <div className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm ${step.activeNode === 1 ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200' : 'bg-[#181a26] border-[#31364d] text-white'}`}>
            1
          </div>

          <div className="flex justify-center gap-16 w-full">
            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs ${step.activeNode === 2 ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200' : 'bg-[#181a26] border-[#31364d] text-white'}`}>
              2
            </div>
            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs ${step.activeNode === 3 ? 'bg-purple-500/25 border-purple-400 text-purple-200' : 'bg-[#181a26] border-[#31364d] text-white'}`}>
              3
            </div>
          </div>

          <div className="flex justify-start gap-4 -ml-12">
            {[4, 5, 6].map(v => (
              <div
                key={v}
                className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs ${step.activeNode === v ? 'bg-amber-500/25 border-amber-400 text-amber-200' : 'bg-[#181a26] border-[#31364d] text-white'}`}
              >
                {v}
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs font-mono text-[#8a8ea3] bg-[#161824] px-4 py-2 rounded-xl border border-[#272b3c] text-center w-full">
          If left height == right height: Subtree is full &rarr; directly return (1 &lt;&lt; h) - 1 in O(1)!
        </div>
      </div>
    </div>
  );
}

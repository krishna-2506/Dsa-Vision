import React from 'react';

export const meta = {
  title: 'Introduction to Binary Search Trees (BST)',
  category: 'Binary Search Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(H) operations, O(N) traversal',
  spaceComplexity: 'O(H) recursion stack',
  description: 'Explores foundational properties of Binary Search Trees (BST): Left Subtree < Root < Right Subtree, why Inorder traversal yields sorted output, and logarithmic search properties.'
};

export const solutions = {
  cpp: `// C++ BST Definition and Inorder Validation
// Time: O(N) | Space: O(H)
#include <vector>
#include <climits>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
    bool validate(TreeNode* node, long long minVal, long long maxVal) {
        if (!node) return true;
        if (node->val <= minVal || node->val >= maxVal) return false;
        return validate(node->left, minVal, node->val) &&
               validate(node->right, node->val, maxVal);
    }
public:
    bool isValidBST(TreeNode* root) {
        return validate(root, LLONG_MIN, LLONG_MAX);
    }
};`,
  python: `# Python 3 BST Validation & Inorder Traversal
# Time: O(N) | Space: O(H)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isValidBST(self, root: TreeNode) -> bool:
        def validate(node, low=-float('inf'), high=float('inf')):
            if not node:
                return True
            if not (low < node.val < high):
                return False
            return validate(node.left, low, node.val) and validate(node.right, node.val, high)

        return validate(root)`,
  java: `// Java BST Inorder Validation
// Time: O(N) | Space: O(H)
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

class Solution {
    private boolean validate(TreeNode node, long min, long max) {
        if (node == null) return true;
        if (node.val <= min || node.val >= max) return false;
        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    }

    public boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
}`,
  javascript: `// JavaScript BST Inorder Validation
// Time: O(N) | Space: O(H)
var isValidBST = function(root) {
    function validate(node, minVal, maxVal) {
        if (!node) return true;
        if (node.val <= minVal || node.val >= maxVal) return false;
        return validate(node.left, minVal, node.val) &&
               validate(node.right, node.val, maxVal);
    }
    return validate(root, -Infinity, Infinity);
};`
};

export const steps = [
  {
    title: '1. The Core BST Property',
    phase: 'CONCEPT',
    codeLine: 16,
    nodes: [
      { id: 1, val: 8, x: 200, y: 30, role: 'Root' },
      { id: 2, val: 3, x: 100, y: 100, role: 'Left (< 8)' },
      { id: 3, val: 10, x: 300, y: 100, role: 'Right (> 8)' },
      { id: 4, val: 1, x: 50, y: 170, role: '< 3' },
      { id: 5, val: 6, x: 150, y: 170, role: '> 3 & < 8' },
      { id: 6, val: 14, x: 350, y: 170, role: '> 10' }
    ],
    inorder: [],
    variables: { rule: 'LeftSubtree < Node < RightSubtree', height: 3 },
    explain: 'For every node in a BST, all elements in its left subtree are strictly smaller, and all in the right subtree are strictly greater.',
    intuition: 'This ordering invariant enables binary search in tree structures, achieving O(log N) lookups.'
  },
  {
    title: '2. Inorder Traversal (Left -> Root -> Right)',
    phase: 'INORDER',
    codeLine: 24,
    nodes: [
      { id: 1, val: 8, x: 200, y: 30, role: 'Visited 4th' },
      { id: 2, val: 3, x: 100, y: 100, role: 'Visited 2nd' },
      { id: 3, val: 10, x: 300, y: 100, role: 'Visited 5th' },
      { id: 4, val: 1, x: 50, y: 170, role: 'Visited 1st' },
      { id: 5, val: 6, x: 150, y: 170, role: 'Visited 3rd' },
      { id: 6, val: 14, x: 350, y: 170, role: 'Visited 6th' }
    ],
    inorder: [1, 3, 6, 8, 10, 14],
    variables: { order: '[1, 3, 6, 8, 10, 14]', sorted: 'Always Strictly Ascending' },
    explain: 'Performing Inorder Traversal (L -> Root -> R) visits elements in strictly ascending order: [1, 3, 6, 8, 10, 14].',
    intuition: 'Inorder traversal unrolls a 2D binary search tree into a 1D sorted list.'
  },
  {
    title: '3. Logarithmic Lookups & Invariants',
    phase: 'COMPLETED',
    codeLine: 26,
    nodes: [
      { id: 1, val: 8, x: 200, y: 30, role: 'Root' },
      { id: 2, val: 3, x: 100, y: 100, role: '< 8' },
      { id: 3, val: 10, x: 300, y: 100, role: '> 8' },
      { id: 4, val: 1, x: 50, y: 170, role: '< 3' },
      { id: 5, val: 6, x: 150, y: 170, role: '> 3' },
      { id: 6, val: 14, x: 350, y: 170, role: '> 10' }
    ],
    inorder: [1, 3, 6, 8, 10, 14],
    variables: { 'Search 6': '8 -> left (3) -> right (6) Found!', comparisons: 3 },
    explain: 'To search for 6: compare with 8 (go left), compare with 3 (go right), found 6! Only 3 comparisons instead of checking all 6 nodes.',
    intuition: 'Each comparison eliminates half the remaining subtree.'
  }
];

export default function IntroductionToBstVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Property: Left &lt; Root &lt; Right
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Search: O(H) = O(log N)
        </span>
      </div>

      {/* BST SVG Canvas */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider">
          Binary Search Tree Topology
        </span>

        <svg width="400" height="220" className="overflow-visible">
          {/* Edges */}
          <line x1="200" y1="40" x2="100" y2="100" stroke="#3b4261" strokeWidth="2" />
          <line x1="200" y1="40" x2="300" y2="100" stroke="#3b4261" strokeWidth="2" />
          <line x1="100" y1="100" x2="50" y2="170" stroke="#3b4261" strokeWidth="2" />
          <line x1="100" y1="100" x2="150" y2="170" stroke="#3b4261" strokeWidth="2" />
          <line x1="300" y1="100" x2="350" y2="170" stroke="#3b4261" strokeWidth="2" />

          {/* Nodes */}
          {step.nodes.map(node => (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <circle
                r="18"
                className="fill-[#161824] stroke-emerald-500/60 transition-all duration-300"
                strokeWidth="2"
              />
              <text
                textAnchor="middle"
                dy="5"
                className="text-xs font-mono font-bold fill-amber-300"
              >
                {node.val}
              </text>
              <text
                textAnchor="middle"
                dy="30"
                className="text-[9px] font-mono fill-[#8a8ea3]"
              >
                {node.role}
              </text>
            </g>
          ))}
        </svg>

        {/* Inorder Stream */}
        {step.inorder.length > 0 && (
          <div className="w-full border-t border-[var(--line)] pt-4 flex flex-col items-center gap-2">
            <span className="text-[11px] font-mono text-emerald-400 font-semibold">
              Inorder Traversal Sequence (Always Sorted):
            </span>
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-300 font-bold">
              [{step.inorder.join(' &rarr; ')}]
            </div>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 text-xs font-mono text-center text-[var(--chalk-dim)]">
        {step.explain}
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Kth Smallest and Largest Element in BST',
  category: 'Binary Search Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(H + K)',
  spaceComplexity: 'O(H) recursion stack',
  description: 'Finds the Kth smallest and Kth largest elements in a Binary Search Tree by performing Inorder (ascending) and Reverse Inorder (descending) traversals with early stopping.'
};

export const solutions = {
  cpp: `// C++ Kth Smallest and Largest in BST
// Time: O(H + K) | Space: O(H)
#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
    void inorder(TreeNode* root, int& k, int& ans) {
        if (!root || k <= 0) return;
        inorder(root->left, k, ans);
        k--;
        if (k == 0) {
            ans = root->val;
            return;
        }
        inorder(root->right, k, ans);
    }

    void reverseInorder(TreeNode* root, int& k, int& ans) {
        if (!root || k <= 0) return;
        reverseInorder(root->right, k, ans);
        k--;
        if (k == 0) {
            ans = root->val;
            return;
        }
        reverseInorder(root->left, k, ans);
    }
public:
    int kthSmallest(TreeNode* root, int k) {
        int ans = -1;
        inorder(root, k, ans);
        return ans;
    }

    int kthLargest(TreeNode* root, int k) {
        int ans = -1;
        reverseInorder(root, k, ans);
        return ans;
    }
};`,
  python: `# Python 3 Kth Smallest and Largest in BST
# Time: O(H + K) | Space: O(H)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def kthSmallest(self, root: TreeNode, k: int) -> int:
        count = 0
        ans = None

        def inorder(node):
            nonlocal count, ans
            if not node or ans is not None:
                return
            inorder(node.left)
            count += 1
            if count == k:
                ans = node.val
                return
            inorder(node.right)

        inorder(root)
        return ans

    def kthLargest(self, root: TreeNode, k: int) -> int:
        count = 0
        ans = None

        def rev_inorder(node):
            nonlocal count, ans
            if not node or ans is not None:
                return
            rev_inorder(node.right)
            count += 1
            if count == k:
                ans = node.val
                return
            rev_inorder(node.left)

        rev_inorder(root)
        return ans`,
  java: `// Java Kth Smallest and Largest in BST
// Time: O(H + K) | Space: O(H)
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

class Solution {
    private int count = 0;
    private int result = -1;

    private void inorder(TreeNode root, int k) {
        if (root == null || result != -1) return;
        inorder(root.left, k);
        count++;
        if (count == k) {
            result = root.val;
            return;
        }
        inorder(root.right, k);
    }

    public int kthSmallest(TreeNode root, int k) {
        count = 0;
        result = -1;
        inorder(root, k);
        return result;
    }
}`,
  javascript: `// JavaScript Kth Smallest and Largest in BST
// Time: O(H + K) | Space: O(H)
var kthSmallest = function(root, k) {
    let count = 0;
    let ans = -1;

    function inorder(node) {
        if (!node || ans !== -1) return;
        inorder(node.left);
        count++;
        if (count === k) {
            ans = node.val;
            return;
        }
        inorder(node.right);
    }

    inorder(root);
    return ans;
};`
};

export const steps = [
  {
    title: '1. Setup: BST with Inorder [2, 3, 5, 7, 8], Goal: k = 3',
    phase: 'INIT',
    codeLine: 16,
    k: 3,
    nodes: [
      { id: 1, val: 5, x: 200, y: 30 },
      { id: 2, val: 3, x: 100, y: 100 },
      { id: 3, val: 7, x: 300, y: 100 },
      { id: 4, val: 2, x: 50, y: 170 },
      { id: 5, val: 8, x: 350, y: 170 }
    ],
    visitedCount: 0,
    kthSmallest: null,
    kthLargest: null,
    variables: { k: 3, strategy: 'Inorder (L-Node-R) counts up to k' },
    explain: 'Inorder traversal visits nodes in non-decreasing order. The 3rd visited node is guaranteed to be the 3rd smallest element.',
    intuition: 'Sorting is built into the tree topology.'
  },
  {
    title: '2. Inorder Steps: Visit 2 (1st) -> 3 (2nd) -> 5 (3rd)',
    phase: 'INORDER_3',
    codeLine: 18,
    k: 3,
    nodes: [
      { id: 1, val: 5, x: 200, y: 30, isKthSmall: true },
      { id: 2, val: 3, x: 100, y: 100 },
      { id: 3, val: 7, x: 300, y: 100 },
      { id: 4, val: 2, x: 50, y: 170 },
      { id: 5, val: 8, x: 350, y: 170 }
    ],
    visitedCount: 3,
    kthSmallest: 5,
    variables: { '1st visited': 2, '2nd visited': 3, '3rd visited': 5, '3rd Smallest': 5 },
    explain: 'Leftmost node is 2 (count=1). Move to parent 3 (count=2). Move to root 5 (count=3 = k). Found 3rd smallest: 5!',
    intuition: 'Early return prevents traversing the remaining right subtree.'
  },
  {
    title: '3. Reverse Inorder Steps: Visit 8 (1st) -> 7 (2nd) -> 5 (3rd)',
    phase: 'REV_INORDER_3',
    codeLine: 28,
    k: 3,
    nodes: [
      { id: 1, val: 5, x: 200, y: 30, isKthLarge: true },
      { id: 2, val: 3, x: 100, y: 100 },
      { id: 3, val: 7, x: 300, y: 100 },
      { id: 4, val: 2, x: 50, y: 170 },
      { id: 5, val: 8, x: 350, y: 170 }
    ],
    visitedCount: 3,
    kthLargest: 5,
    variables: { '1st largest': 8, '2nd largest': 7, '3rd largest': 5, '3rd Largest': 5 },
    explain: 'Reverse inorder (Right -> Root -> Left) counts largest elements. Rightmost is 8 (1st), then 7 (2nd), then 5 (3rd).',
    intuition: 'Reverse traversal symmetrically counts from largest down to smallest.'
  },
  {
    title: '4. Completed: 3rd Smallest = 5, 3rd Largest = 5',
    phase: 'COMPLETED',
    codeLine: 35,
    k: 3,
    nodes: [
      { id: 1, val: 5, x: 200, y: 30, isKthSmall: true, isKthLarge: true },
      { id: 2, val: 3, x: 100, y: 100 },
      { id: 3, val: 7, x: 300, y: 100 },
      { id: 4, val: 2, x: 50, y: 170 },
      { id: 5, val: 8, x: 350, y: 170 }
    ],
    kthSmallest: 5,
    kthLargest: 5,
    variables: { '3rd Smallest': 5, '3rd Largest': 5, totalNodes: 5 },
    explain: 'For an array of 5 elements [2, 3, 5, 7, 8], the median 5 is both the 3rd smallest and the 3rd largest element!',
    intuition: 'Inorder counter achieves O(H + K) time without allocating extra arrays.'
  }
];

export default function KthSmallestAndLargestElementInBstVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Rank (K): {step.k}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold">
          Kth Smallest: {step.kthSmallest !== null ? step.kthSmallest : 'In progress'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Kth Largest: {step.kthLargest !== null ? step.kthLargest : 'In progress'}
        </span>
      </div>

      {/* BST SVG Canvas */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          BST Rank Traversal Highlighting
        </span>

        <svg width="400" height="200" className="overflow-visible">
          {/* Edges */}
          <line x1="200" y1="35" x2="100" y2="100" stroke="#3b4261" strokeWidth="2" />
          <line x1="200" y1="35" x2="300" y2="100" stroke="#3b4261" strokeWidth="2" />
          <line x1="100" y1="100" x2="50" y2="170" stroke="#3b4261" strokeWidth="2" />
          <line x1="300" y1="100" x2="350" y2="170" stroke="#3b4261" strokeWidth="2" />

          {/* Nodes */}
          {step.nodes.map(node => (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <circle
                r="18"
                className={`transition-all duration-300 ${
                  node.isKthSmall && node.isKthLarge
                    ? 'fill-emerald-500/30 stroke-emerald-400 stroke-2 ring-4 ring-emerald-500/50 scale-110'
                    : node.isKthSmall
                    ? 'fill-cyan-500/30 stroke-cyan-400 ring-4 ring-cyan-500/40'
                    : node.isKthLarge
                    ? 'fill-purple-500/30 stroke-purple-400 ring-4 ring-purple-500/40'
                    : 'fill-[#161824] stroke-[#3b4261]'
                }`}
                strokeWidth="2"
              />
              <text
                textAnchor="middle"
                dy="5"
                className="text-xs font-mono font-bold fill-amber-300"
              >
                {node.val}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

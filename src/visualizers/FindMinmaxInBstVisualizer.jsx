import React from 'react';

export const meta = {
  title: 'Find Min and Max in BST',
  category: 'Binary Search Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(H)',
  spaceComplexity: 'O(1)',
  description: 'Finds the minimum and maximum values in a Binary Search Tree by traversing strictly leftwards to find the minimum and strictly rightwards to find the maximum.'
};

export const solutions = {
  cpp: `// C++ Find Min and Max in BST
// Time: O(H) | Space: O(1)
#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    int findMin(TreeNode* root) {
        if (!root) return -1;
        while (root->left != nullptr) {
            root = root->left;
        }
        return root->val;
    }

    int findMax(TreeNode* root) {
        if (!root) return -1;
        while (root->right != nullptr) {
            root = root->right;
        }
        return root->val;
    }
};`,
  python: `# Python 3 Find Min and Max in BST
# Time: O(H) | Space: O(1)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def findMin(self, root: TreeNode) -> int:
        if not root:
            return -1
        curr = root
        while curr.left:
            curr = curr.left
        return curr.val

    def findMax(self, root: TreeNode) -> int:
        if not root:
            return -1
        curr = root
        while curr.right:
            curr = curr.right
        return curr.val`,
  java: `// Java Find Min and Max in BST
// Time: O(H) | Space: O(1)
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public int findMin(TreeNode root) {
        if (root == null) return -1;
        while (root.left != null) {
            root = root.left;
        }
        return root.val;
    }

    public int findMax(TreeNode root) {
        if (root == null) return -1;
        while (root.right != null) {
            root = root.right;
        }
        return root.val;
    }
}`,
  javascript: `// JavaScript Find Min and Max in BST
// Time: O(H) | Space: O(1)
var findMin = function(root) {
    if (!root) return -1;
    while (root.left) {
        root = root.left;
    }
    return root.val;
};

var findMax = function(root) {
    if (!root) return -1;
    while (root.right) {
        root = root.right;
    }
    return root.val;
};`
};

export const steps = [
  {
    title: '1. BST Topology & Starting at Root (20)',
    phase: 'INIT',
    codeLine: 16,
    nodes: [
      { id: 1, val: 20, x: 200, y: 30 },
      { id: 2, val: 10, x: 100, y: 90 },
      { id: 3, val: 30, x: 300, y: 90 },
      { id: 4, val: 5, x: 50, y: 150 },
      { id: 5, val: 15, x: 150, y: 150 },
      { id: 6, val: 25, x: 250, y: 150 },
      { id: 7, val: 40, x: 350, y: 150 }
    ],
    highlightMin: 1,
    highlightMax: 1,
    variables: { root: 20, minSearch: 'traverse left', maxSearch: 'traverse right' },
    explain: 'To locate minimum and maximum values, we exploit the BST invariant. Left child is always smaller; right child is always larger.',
    intuition: 'We never need to inspect the full tree, only the extreme left and right spines.'
  },
  {
    title: '2. Finding Minimum: Follow Left Pointers (20 -> 10 -> 5)',
    phase: 'FIND_MIN',
    codeLine: 18,
    nodes: [
      { id: 1, val: 20, x: 200, y: 30 },
      { id: 2, val: 10, x: 100, y: 90 },
      { id: 3, val: 30, x: 300, y: 90 },
      { id: 4, val: 5, x: 50, y: 150 },
      { id: 5, val: 15, x: 150, y: 150 },
      { id: 6, val: 25, x: 250, y: 150 },
      { id: 7, val: 40, x: 350, y: 150 }
    ],
    highlightMin: 4,
    highlightMax: null,
    minVal: 5,
    variables: { path: '20 -> 10 -> 5', leftChild: 'null', minFound: 5 },
    explain: 'Traversing left from 20 to 10 to 5. Node 5 has no left child, so 5 is the global minimum in the BST!',
    intuition: 'The leftmost leaf or node without a left child is always the smallest element.'
  },
  {
    title: '3. Finding Maximum: Follow Right Pointers (20 -> 30 -> 40)',
    phase: 'FIND_MAX',
    codeLine: 26,
    nodes: [
      { id: 1, val: 20, x: 200, y: 30 },
      { id: 2, val: 10, x: 100, y: 90 },
      { id: 3, val: 30, x: 300, y: 90 },
      { id: 4, val: 5, x: 50, y: 150 },
      { id: 5, val: 15, x: 150, y: 150 },
      { id: 6, val: 25, x: 250, y: 150 },
      { id: 7, val: 40, x: 350, y: 150 }
    ],
    highlightMin: null,
    highlightMax: 7,
    maxVal: 40,
    variables: { path: '20 -> 30 -> 40', rightChild: 'null', maxFound: 40 },
    explain: 'Traversing right from 20 to 30 to 40. Node 40 has no right child, so 40 is the global maximum in the BST!',
    intuition: 'The rightmost leaf or node without a right child is always the greatest element.'
  },
  {
    title: '4. Summary: Min = 5, Max = 40 in O(H) Time',
    phase: 'COMPLETED',
    codeLine: 30,
    nodes: [
      { id: 1, val: 20, x: 200, y: 30 },
      { id: 2, val: 10, x: 100, y: 90 },
      { id: 3, val: 30, x: 300, y: 90 },
      { id: 4, val: 5, x: 50, y: 150 },
      { id: 5, val: 15, x: 150, y: 150 },
      { id: 6, val: 25, x: 250, y: 150 },
      { id: 7, val: 40, x: 350, y: 150 }
    ],
    highlightMin: 4,
    highlightMax: 7,
    minVal: 5,
    maxVal: 40,
    variables: { minimum: 5, maximum: 40, timeComplexity: 'O(H)' },
    explain: 'Both extremes found in O(H) operations without scanning the rest of the tree.',
    intuition: 'BST guarantees extreme values reside at the terminal left and right tips.'
  }
];

export default function FindMinmaxInBstVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-semibold">
          Min Value: {step.minVal || (step.highlightMin === 4 ? 5 : 'Searching...')}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
          Max Value: {step.maxVal || (step.highlightMax === 7 ? 40 : 'Searching...')}
        </span>
      </div>

      {/* SVG Canvas */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">
          BST Min / Max Path Highlighting
        </span>

        <svg width="400" height="200" className="overflow-visible">
          {/* Edges */}
          <line x1="200" y1="35" x2="100" y2="90" stroke="#3b4261" strokeWidth="2" />
          <line x1="200" y1="35" x2="300" y2="90" stroke="#3b4261" strokeWidth="2" />
          <line x1="100" y1="90" x2="50" y2="150" stroke="#3b4261" strokeWidth="2" />
          <line x1="100" y1="90" x2="150" y2="150" stroke="#3b4261" strokeWidth="2" />
          <line x1="300" y1="90" x2="250" y2="150" stroke="#3b4261" strokeWidth="2" />
          <line x1="300" y1="90" x2="350" y2="150" stroke="#3b4261" strokeWidth="2" />

          {/* Nodes */}
          {step.nodes.map(node => {
            const isMin = node.id === step.highlightMin;
            const isMax = node.id === step.highlightMax;

            return (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                <circle
                  r="18"
                  className={`transition-all duration-300 ${
                    isMin
                      ? 'fill-cyan-500/30 stroke-cyan-400 stroke-2 ring-4 ring-cyan-500/40'
                      : isMax
                      ? 'fill-amber-500/30 stroke-amber-400 stroke-2 ring-4 ring-amber-500/40'
                      : 'fill-[#161824] stroke-[#3b4261]'
                  }`}
                  strokeWidth="2"
                />
                <text
                  textAnchor="middle"
                  dy="5"
                  className={`text-xs font-mono font-bold ${
                    isMin
                      ? 'fill-cyan-300'
                      : isMax
                      ? 'fill-amber-300'
                      : 'fill-slate-300'
                  }`}
                >
                  {node.val}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

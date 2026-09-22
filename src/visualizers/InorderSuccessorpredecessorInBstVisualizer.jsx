import React from 'react';

export const meta = {
  title: 'Inorder Successor & Predecessor in BST',
  category: 'Binary Search Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(H)',
  spaceComplexity: 'O(1)',
  description: 'Finds the Inorder Successor (smallest node greater than target) and Predecessor (largest node smaller than target) in O(H) time without full tree traversal.'
};

export const solutions = {
  cpp: `// C++ Inorder Successor and Predecessor in BST
// Time: O(H) | Space: O(1)
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    TreeNode* inorderSuccessor(TreeNode* root, TreeNode* p) {
        TreeNode* successor = nullptr;
        while (root != nullptr) {
            if (p->val >= root->val) {
                root = root->right;
            } else {
                successor = root;
                root = root->left;
            }
        }
        return successor;
    }

    TreeNode* inorderPredecessor(TreeNode* root, TreeNode* p) {
        TreeNode* predecessor = nullptr;
        while (root != nullptr) {
            if (p->val <= root->val) {
                root = root->left;
            } else {
                predecessor = root;
                root = root->right;
            }
        }
        return predecessor;
    }
};`,
  python: `# Python 3 Inorder Successor and Predecessor
# Time: O(H) | Space: O(1)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def inorderSuccessor(self, root: TreeNode, p: TreeNode) -> TreeNode:
        successor = None
        curr = root
        while curr:
            if p.val >= curr.val:
                curr = curr.right
            else:
                successor = curr
                curr = curr.left
        return successor

    def inorderPredecessor(self, root: TreeNode, p: TreeNode) -> TreeNode:
        predecessor = None
        curr = root
        while curr:
            if p.val <= curr.val:
                curr = curr.left
            else:
                predecessor = curr
                curr = curr.right
        return predecessor`,
  java: `// Java Inorder Successor and Predecessor
// Time: O(H) | Space: O(1)
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {
        TreeNode successor = null;
        while (root != null) {
            if (p.val >= root.val) {
                root = root.right;
            } else {
                successor = root;
                root = root.left;
            }
        }
        return successor;
    }

    public TreeNode inorderPredecessor(TreeNode root, TreeNode p) {
        TreeNode predecessor = null;
        while (root != null) {
            if (p.val <= root.val) {
                root = root.left;
            } else {
                predecessor = root;
                root = root.right;
            }
        }
        return predecessor;
    }
}`,
  javascript: `// JavaScript Inorder Successor and Predecessor
// Time: O(H) | Space: O(1)
var inorderSuccessor = function(root, p) {
    let successor = null;
    while (root) {
        if (p.val >= root.val) {
            root = root.right;
        } else {
            successor = root;
            root = root.left;
        }
    }
    return successor;
};

var inorderPredecessor = function(root, p) {
    let predecessor = null;
    while (root) {
        if (p.val <= root.val) {
            root = root.left;
        } else {
            predecessor = root;
            root = root.right;
        }
    }
    return predecessor;
};`
};

export const steps = [
  {
    title: '1. Target Node: 8 in BST [2, 4, 6, 8, 10, 12, 14]',
    phase: 'INIT',
    codeLine: 13,
    target: 8,
    nodes: [
      { id: 1, val: 8, x: 200, y: 30, isTarget: true },
      { id: 2, val: 4, x: 100, y: 90 },
      { id: 3, val: 12, x: 300, y: 90 },
      { id: 4, val: 2, x: 50, y: 150 },
      { id: 5, val: 6, x: 150, y: 150 },
      { id: 6, val: 10, x: 250, y: 150 },
      { id: 7, val: 14, x: 350, y: 150 }
    ],
    pred: null,
    succ: null,
    variables: { target: 8, query: 'Find Successor & Predecessor' },
    explain: 'Target node is 8. In sorted inorder sequence [2, 4, 6, 8, 10, 12, 14], predecessor should be 6, successor should be 10.',
    intuition: 'Successor is the smallest key > 8. Predecessor is the largest key < 8.'
  },
  {
    title: '2. Finding Predecessor: Search Left Subtree (Max is 6)',
    phase: 'FIND_PRED',
    codeLine: 26,
    target: 8,
    nodes: [
      { id: 1, val: 8, x: 200, y: 30, isTarget: true },
      { id: 2, val: 4, x: 100, y: 90 },
      { id: 3, val: 12, x: 300, y: 90 },
      { id: 4, val: 2, x: 50, y: 150 },
      { id: 5, val: 6, x: 150, y: 150, isPred: true },
      { id: 6, val: 10, x: 250, y: 150 },
      { id: 7, val: 14, x: 350, y: 150 }
    ],
    pred: 6,
    succ: null,
    variables: { target: 8, path: '8 -> left (4) -> right (6)', pred: 6 },
    explain: 'Since 8 has a left subtree, the predecessor is the rightmost node of that subtree: 4 -> 6. Predecessor = 6.',
    intuition: 'Largest element smaller than 8 is the rightmost node of 8\'s left child.'
  },
  {
    title: '3. Finding Successor: Search Right Subtree (Min is 10)',
    phase: 'FIND_SUCC',
    codeLine: 18,
    target: 8,
    nodes: [
      { id: 1, val: 8, x: 200, y: 30, isTarget: true },
      { id: 2, val: 4, x: 100, y: 90 },
      { id: 3, val: 12, x: 300, y: 90 },
      { id: 4, val: 2, x: 50, y: 150 },
      { id: 5, val: 6, x: 150, y: 150, isPred: true },
      { id: 6, val: 10, x: 250, y: 150, isSucc: true },
      { id: 7, val: 14, x: 350, y: 150 }
    ],
    pred: 6,
    succ: 10,
    variables: { target: 8, path: '8 -> right (12) -> left (10)', succ: 10 },
    explain: 'Since 8 has a right subtree, the successor is the leftmost node of that subtree: 12 -> 10. Successor = 10.',
    intuition: 'Smallest element greater than 8 is the leftmost node of 8\'s right child.'
  },
  {
    title: '4. Completed: Predecessor = 6, Successor = 10',
    phase: 'COMPLETED',
    codeLine: 35,
    target: 8,
    nodes: [
      { id: 1, val: 8, x: 200, y: 30, isTarget: true },
      { id: 2, val: 4, x: 100, y: 90 },
      { id: 3, val: 12, x: 300, y: 90 },
      { id: 4, val: 2, x: 50, y: 150 },
      { id: 5, val: 6, x: 150, y: 150, isPred: true },
      { id: 6, val: 10, x: 250, y: 150, isSucc: true },
      { id: 7, val: 14, x: 350, y: 150 }
    ],
    pred: 6,
    succ: 10,
    variables: { 'Inorder Order': '6 < [8] < 10', pred: 6, succ: 10 },
    explain: 'Successfully identified both adjacent inorder neighbors in O(H) time and O(1) auxiliary space.',
    intuition: 'BST structure lets us jump directly to predecessor and successor without storing an array.'
  }
];

export default function InorderSuccessorpredecessorInBstVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold">
          Predecessor: {step.pred !== null ? step.pred : 'None'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
          Target: {step.target}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold">
          Successor: {step.succ !== null ? step.succ : 'None'}
        </span>
      </div>

      {/* BST SVG Canvas */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider">
          Inorder Neighbors in BST
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
          {step.nodes.map(node => (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <circle
                r="18"
                className={`transition-all duration-300 ${
                  node.isTarget
                    ? 'fill-amber-500/30 stroke-amber-400 ring-4 ring-amber-500/40'
                    : node.isPred
                    ? 'fill-purple-500/30 stroke-purple-400 ring-4 ring-purple-500/40'
                    : node.isSucc
                    ? 'fill-emerald-500/30 stroke-emerald-400 ring-4 ring-emerald-500/40'
                    : 'fill-[#161824] stroke-[#3b4261]'
                }`}
                strokeWidth="2"
              />
              <text
                textAnchor="middle"
                dy="5"
                className={`text-xs font-mono font-bold ${
                  node.isTarget
                    ? 'fill-amber-300'
                    : node.isPred
                    ? 'fill-purple-300'
                    : node.isSucc
                    ? 'fill-emerald-300'
                    : 'fill-slate-300'
                }`}
              >
                {node.val}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Explanation */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 text-xs font-mono text-center text-[var(--chalk-dim)]">
        {step.explain}
      </div>
    </div>
  );
}

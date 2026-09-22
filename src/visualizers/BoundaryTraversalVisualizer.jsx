import React from 'react';

export const meta = {
  title: 'Boundary Traversal of Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) recursion stack',
  description: 'Traverses the boundary of a binary tree in anti-clockwise direction: left boundary (excluding leaves), all leaf nodes left-to-right, and right boundary (bottom-to-top in reverse, excluding leaves).'
};

export const solutions = {
  cpp: `// C++: Boundary Traversal of Binary Tree
// Time Complexity: O(N) | Space Complexity: O(H)
#include <vector>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

bool isLeaf(TreeNode* node) {
    return (node->left == nullptr && node->right == nullptr);
}

void addLeftBoundary(TreeNode* root, vector<int>& res) {
    TreeNode* curr = root->left;
    while (curr) {
        if (!isLeaf(curr)) res.push_back(curr->val);
        if (curr->left) curr = curr->left;
        else curr = curr->right;
    }
}

void addLeaves(TreeNode* root, vector<int>& res) {
    if (isLeaf(root)) {
        res.push_back(root->val);
        return;
    }
    if (root->left) addLeaves(root->left, res);
    if (root->right) addLeaves(root->right, res);
}

void addRightBoundary(TreeNode* root, vector<int>& res) {
    TreeNode* curr = root->right;
    vector<int> temp;
    while (curr) {
        if (!isLeaf(curr)) temp.push_back(curr->val);
        if (curr->right) curr = curr->right;
        else curr = curr->left;
    }
    for (int i = temp.size() - 1; i >= 0; i--) {
        res.push_back(temp[i]);
    }
}

vector<int> boundaryTraversal(TreeNode* root) {
    vector<int> res;
    if (!root) return res;
    if (!isLeaf(root)) res.push_back(root->val);

    addLeftBoundary(root, res);
    addLeaves(root, res);
    addRightBoundary(root, res);

    return res;
}`,
  java: `// Java: Boundary Traversal of Binary Tree
import java.util.ArrayList;

class Solution {
    boolean isLeaf(TreeNode node) {
        return node.left == null && node.right == null;
    }

    void addLeftBoundary(TreeNode root, ArrayList<Integer> res) {
        TreeNode curr = root.left;
        while (curr != null) {
            if (!isLeaf(curr)) res.add(curr.val);
            if (curr.left != null) curr = curr.left;
            else curr = curr.right;
        }
    }

    void addLeaves(TreeNode root, ArrayList<Integer> res) {
        if (isLeaf(root)) {
            res.add(root.val);
            return;
        }
        if (root.left != null) addLeaves(root.left, res);
        if (root.right != null) addLeaves(root.right, res);
    }

    void addRightBoundary(TreeNode root, ArrayList<Integer> res) {
        TreeNode curr = root.right;
        ArrayList<Integer> temp = new ArrayList<>();
        while (curr != null) {
            if (!isLeaf(curr)) temp.add(curr.val);
            if (curr.right != null) curr = curr.right;
            else curr = curr.left;
        }
        for (int i = temp.size() - 1; i >= 0; i--) {
            res.add(temp.get(i));
        }
    }

    ArrayList<Integer> boundary(TreeNode node) {
        ArrayList<Integer> res = new ArrayList<>();
        if (node == null) return res;
        if (!isLeaf(node)) res.add(node.val);

        addLeftBoundary(node, res);
        addLeaves(node, res);
        addRightBoundary(node, res);
        return res;
    }
}`,
  python: `# Python 3: Boundary Traversal of Binary Tree
def boundary_traversal(root):
    if not root:
        return []

    def is_leaf(node):
        return not node.left and not node.right

    res = []
    if not is_leaf(root):
        res.append(root.val)

    # 1. Left boundary
    curr = root.left
    while curr:
        if not is_leaf(curr):
            res.append(curr.val)
        curr = curr.left if curr.left else curr.right

    # 2. Leaves
    def add_leaves(node):
        if is_leaf(node):
            res.append(node.val)
            return
        if node.left: add_leaves(node.left)
        if node.right: add_leaves(node.right)

    add_leaves(root)

    # 3. Right boundary reverse
    curr = root.right
    right_temp = []
    while curr:
        if not is_leaf(curr):
            right_temp.append(curr.val)
        curr = curr.right if curr.right else curr.left

    res.extend(reversed(right_temp))
    return res`,
  javascript: `// JavaScript: Boundary Traversal of Binary Tree
function boundaryTraversal(root) {
    if (!root) return [];
    const isLeaf = (node) => !node.left && !node.right;
    const res = [];

    if (!isLeaf(root)) res.push(root.val);

    // Left boundary
    let curr = root.left;
    while (curr) {
        if (!isLeaf(curr)) res.push(curr.val);
        curr = curr.left ? curr.left : curr.right;
    }

    // Leaves
    function addLeaves(node) {
        if (isLeaf(node)) {
            res.push(node.val);
            return;
        }
        if (node.left) addLeaves(node.left);
        if (node.right) addLeaves(node.right);
    }
    addLeaves(root);

    // Right boundary reverse
    curr = root.right;
    const rightTemp = [];
    while (curr) {
        if (!isLeaf(curr)) rightTemp.push(curr.val);
        curr = curr.right ? curr.right : curr.left;
    }
    rightTemp.reverse();
    res.push(...rightTemp);

    return res;
}`
};

export const steps = [
  {
    title: '1. Root Node: Add Root 1',
    phase: 'ROOT',
    codeLine: 54,
    boundaryType: 'Root',
    traversal: [1],
    explain: 'Start at root. Since root 1 is not a leaf, add 1.'
  },
  {
    title: '2. Left Boundary: Add Node 2 (Exclude leaf)',
    phase: 'LEFT_BOUNDARY',
    codeLine: 20,
    boundaryType: 'Left Boundary',
    traversal: [1, 2],
    explain: 'Traverse left downward. Node 2 is not a leaf, add 2. Next node (4) is a leaf, so left boundary stops.'
  },
  {
    title: '3. Leaf Nodes: Collect all leaves left to right &rarr; [4, 5, 7, 8]',
    phase: 'LEAF_NODES',
    codeLine: 30,
    boundaryType: 'Leaves',
    traversal: [1, 2, 4, 5, 7, 8],
    explain: 'Inorder scan of leaves discovers 4, 5, 7, and 8. All leaves added in left-to-right order.'
  },
  {
    title: '4. Right Boundary (Reversed): Add Node 3 (bottom-to-top)',
    phase: 'RIGHT_BOUNDARY',
    codeLine: 40,
    boundaryType: 'Right Boundary (Reversed)',
    traversal: [1, 2, 4, 5, 7, 8, 3],
    explain: 'Collect right boundary downwards ([3]), then reverse it to complete the anti-clockwise loop. Node 3 added.'
  },
  {
    title: '5. Complete Boundary Traversal: [1, 2, 4, 5, 7, 8, 3]',
    phase: 'COMPLETE',
    codeLine: 57,
    boundaryType: 'Full Boundary',
    traversal: [1, 2, 4, 5, 7, 8, 3],
    explain: 'Full perimeter walked in exact anti-clockwise sequence without duplicate leaves!'
  }
];

export default function BoundaryTraversalVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Section: <strong className="text-cyan-200">{step.boundaryType}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Direction: <strong>Anti-Clockwise</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Boundary Pathway Breakdown</span>
          <span className="text-cyan-400 font-bold">3-Phase Perimeter</span>
        </div>

        {/* Pathway sequence badges */}
        <div className="flex items-center justify-center gap-2 flex-wrap w-full py-4">
          {step.traversal.map((val, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className="w-10 h-10 rounded-xl bg-cyan-500/20 border-2 border-cyan-400 text-cyan-200 font-mono font-bold text-sm flex items-center justify-center shadow-md">
                {val}
              </span>
              {idx < step.traversal.length - 1 && (
                <span className="text-xs text-[#525777] font-mono">&rarr;</span>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 w-full text-center text-xs font-mono pt-2">
          <div className="p-2.5 rounded-xl bg-[var(--board-raised-2)] border border-[#26293a] text-cyan-300">
            1. Left Boundary
          </div>
          <div className="p-2.5 rounded-xl bg-[var(--board-raised-2)] border border-[#26293a] text-purple-300">
            2. Leaf Nodes
          </div>
          <div className="p-2.5 rounded-xl bg-[var(--board-raised-2)] border border-[#26293a] text-emerald-300">
            3. Right Boundary (Rev)
          </div>
        </div>
      </div>
    </div>
  );
}

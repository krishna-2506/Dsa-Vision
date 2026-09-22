import React from 'react';

export const meta = {
  title: 'Preorder Traversal of Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) recursion stack (O(H))',
  description: 'Traverses a binary tree in Root -> Left -> Right order recursively, visiting each parent node immediately before traversing its child subtrees.'
};

export const solutions = {
  cpp: `// C++ Preorder Traversal (Recursive)
// Time: O(N) | Space: O(H)
#include <vector>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
private:
    void preorder(TreeNode* root, vector<int>& result) {
        if (root == nullptr) return;

        // 1. Visit Root Node First
        result.push_back(root->val);

        // 2. Traverse Left Subtree
        preorder(root->left, result);

        // 3. Traverse Right Subtree
        preorder(root->right, result);
    }
public:
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> result;
        preorder(root, result);
        return result;
    }
};`,
  python: `# Python 3 Preorder Traversal (Recursive)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def preorderTraversal(self, root: TreeNode | None) -> list[int]:
        result = []

        def preorder(node):
            if not node:
                return
            result.append(node.val)
            preorder(node.left)
            preorder(node.right)

        preorder(root)
        return result`,
  java: `// Java Preorder Traversal (Recursive)
import java.util.*;

class Solution {
    private void preorder(TreeNode root, List<Integer> result) {
        if (root == null) return;

        result.add(root.val);
        preorder(root.left, result);
        preorder(root.right, result);
    }

    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        preorder(root, result);
        return result;
    }
}`,
  javascript: `// JavaScript Preorder Traversal (Recursive)
var preorderTraversal = function(root) {
    const result = [];

    function preorder(node) {
        if (!node) return;
        result.push(node.val);
        preorder(node.left);
        preorder(node.right);
    }

    preorder(root);
    return result;
};`
};

export const steps = [
  {
    title: '1. Start Preorder at Root (Node 1): Visit Root First -> Add 1',
    phase: 'VISIT_ROOT',
    codeLine: 21,
    activeNode: 1,
    traversal: [1],
    action: 'Visit Node 1 first, then descend Left',
    variables: { visited: 1, rule: 'Root -> Left -> Right' },
    explain: 'Preorder rule: Visit the current node immediately before visiting any of its children.',
    intuition: 'Top-down node recording.'
  },
  {
    title: '2. Descend to Left Child (Node 2): Visit Immediately -> Add 2',
    phase: 'VISIT_ROOT',
    codeLine: 21,
    activeNode: 2,
    traversal: [1, 2],
    action: 'Visit Node 2 first, then descend Left to 4',
    variables: { visited: 2, next: 'Left child (Node 4)' },
    explain: 'Node 2 is visited before its left or right children.',
    intuition: 'Each subtree processes its local root first.'
  },
  {
    title: '3. Descend to Left Leaf (Node 4): Visit Immediately -> Add 4',
    phase: 'VISIT_LEAF',
    codeLine: 21,
    activeNode: 4,
    traversal: [1, 2, 4],
    action: 'Visit Node 4. Both children null -> return to 2',
    variables: { visited: 4, leftSubtreeOf2Done: true },
    explain: 'Node 4 visited. Since both children are null, return to Node 2 to visit its right child.',
    intuition: 'Leaf node visit complete.'
  },
  {
    title: '4. Descend to Right Child of 2 (Node 5): Visit Immediately -> Add 5',
    phase: 'VISIT_RIGHT',
    codeLine: 21,
    activeNode: 5,
    traversal: [1, 2, 4, 5],
    action: 'Visit Node 5. Left subtree of Root 1 complete!',
    variables: { visited: 5, rootLeftDone: true },
    explain: 'Node 5 visited. Entire left branch of root 1 finished: [1, 2, 4, 5].',
    intuition: 'Now traverse right branch of root 1.'
  },
  {
    title: '5. Descend to Right Child of Root (Node 3): Visit -> Add 3. Traversal Complete!',
    phase: 'COMPLETED',
    codeLine: 34,
    activeNode: 3,
    traversal: [1, 2, 4, 5, 3],
    action: 'All Nodes Traversed in Preorder',
    variables: { finalPreorder: '[1, 2, 4, 5, 3]' },
    explain: 'Node 3 is visited. All nodes processed in preorder: [1, 2, 4, 5, 3].',
    intuition: 'Preorder traversal generates topological root-first order.'
  }
];

export default function PreorderTraversalVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Active Node: {step.activeNode ? `Node ${step.activeNode}` : 'Done'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Rule: Root → Left → Right
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Preorder Visited = {step.traversal.length} / 5
        </span>
      </div>

      {/* Binary Tree Graph */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-6 flex flex-col items-center gap-3">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider">Tree Visualization</span>

        <div className="flex flex-col items-center gap-4 py-2 w-full">
          {/* Level 0: Root 1 */}
          <div className="flex justify-center">
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm transition-all ${
              step.activeNode === 1 
                ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg' 
                : step.traversal.includes(1) 
                ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300' 
                : 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-dim)]'
            }`}>
              1
            </div>
          </div>

          {/* Level 1: Nodes 2 and 3 */}
          <div className="flex justify-center gap-24">
            {[2, 3].map((val) => (
              <div key={val} className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${
                step.activeNode === val 
                  ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg' 
                  : step.traversal.includes(val) 
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300' 
                  : 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-dim)]'
              }`}>
                {val}
              </div>
            ))}
          </div>

          {/* Level 2: Nodes 4 and 5 */}
          <div className="flex justify-start gap-8 pl-12">
            {[4, 5].map((val) => (
              <div key={val} className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${
                step.activeNode === val 
                  ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg' 
                  : step.traversal.includes(val) 
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300' 
                  : 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-dim)]'
              }`}>
                {val}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traversal Output Array */}
      <div className="w-full bg-[var(--board-raised)] border border-emerald-500/30 rounded-2xl p-4 flex flex-col gap-2">
        <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">Preorder Traversal Array</span>
        <div className="flex items-center gap-2">
          {step.traversal.map((val, idx) => (
            <span key={idx} className="flex items-center gap-1.5">
              <span className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-sm">
                {val}
              </span>
              {idx < step.traversal.length - 1 && <span className="text-[var(--chalk-faint)] text-xs font-mono">→</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 text-xs font-mono text-center text-[var(--chalk-dim)]">
        {step.explain}
      </div>
    </div>
  );
}

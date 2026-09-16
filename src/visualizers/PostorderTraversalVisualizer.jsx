import React from 'react';

export const meta = {
  title: 'Postorder Traversal of Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) recursion stack (O(H))',
  description: 'Traverses a binary tree in Left -> Right -> Root order recursively, visiting child subtrees completely before processing their parent node.'
};

export const solutions = {
  cpp: `// C++ Postorder Traversal (Recursive)
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
    void postorder(TreeNode* root, vector<int>& result) {
        if (root == nullptr) return;

        // 1. Traverse Left Subtree
        postorder(root->left, result);

        // 2. Traverse Right Subtree
        postorder(root->right, result);

        // 3. Visit Root Node Last
        result.push_back(root->val);
    }
public:
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> result;
        postorder(root, result);
        return result;
    }
};`,
  python: `# Python 3 Postorder Traversal (Recursive)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def postorderTraversal(self, root: TreeNode | None) -> list[int]:
        result = []

        def postorder(node):
            if not node:
                return
            postorder(node.left)
            postorder(node.right)
            result.append(node.val)

        postorder(root)
        return result`,
  java: `// Java Postorder Traversal (Recursive)
import java.util.*;

class Solution {
    private void postorder(TreeNode root, List<Integer> result) {
        if (root == null) return;

        postorder(root.left, result);
        postorder(root.right, result);
        result.add(root.val);
    }

    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        postorder(root, result);
        return result;
    }
}`,
  javascript: `// JavaScript Postorder Traversal (Recursive)
var postorderTraversal = function(root) {
    const result = [];

    function postorder(node) {
        if (!node) return;
        postorder(node.left);
        postorder(node.right);
        result.push(node.val);
    }

    postorder(root);
    return result;
};`
};

export const steps = [
  {
    title: '1. Start Postorder at Root (Node 1): Left -> Right -> Root',
    phase: 'INITIAL',
    codeLine: 18,
    activeNode: 1,
    traversal: [],
    action: 'Descend to Left Child (Node 2)',
    variables: { current: 1, rule: 'Left -> Right -> Root' },
    explain: 'Postorder rule: Visit left subtree first, right subtree second, and current node last.',
    intuition: 'Bottom-up node recording (ideal for tree deletion or height computation).'
  },
  {
    title: '2. Node 4 has no children: Visit Node 4 -> Add 4 to result',
    phase: 'VISIT_LEAF',
    codeLine: 27,
    activeNode: 4,
    traversal: [4],
    action: 'Both children of 4 are null. Visit 4!',
    variables: { visited: 4, next: 'Right child of 2 (Node 5)' },
    explain: 'Node 4 leaves left and right branches. It is processed and added to the traversal.',
    intuition: 'First node processed is leftmost leaf.'
  },
  {
    title: '3. Node 5 has no children: Visit Node 5 -> Add 5 to result',
    phase: 'VISIT_LEAF',
    codeLine: 27,
    activeNode: 5,
    traversal: [4, 5],
    action: 'Both children of 5 are null. Visit 5!',
    variables: { visited: 5, next: 'Parent Node 2' },
    explain: 'Both children of Node 2 (4 and 5) have now been traversed. Next, visit Node 2!',
    intuition: 'Both children of 2 completed.'
  },
  {
    title: '4. Both children of 2 done: Visit Node 2 -> Add 2 to result',
    phase: 'VISIT_PARENT',
    codeLine: 27,
    activeNode: 2,
    traversal: [4, 5, 2],
    action: 'Visit Node 2. Left subtree of Root 1 complete!',
    variables: { visited: 2, leftSubtreeComplete: true },
    explain: 'Node 2 is added. Traversal now descends to the right child of root (Node 3).',
    intuition: 'Parent visited after both children.'
  },
  {
    title: '5. Visit Node 3 -> Add 3. Finally Visit Root Node 1 -> Add 1',
    phase: 'COMPLETED',
    codeLine: 34,
    activeNode: 1,
    traversal: [4, 5, 2, 3, 1],
    action: 'Traversal Complete! Root 1 visited last.',
    variables: { finalPostorder: '[4, 5, 2, 3, 1]' },
    explain: 'Right subtree (Node 3) visited, then Root Node 1 visited last. Sequence: [4, 5, 2, 3, 1].',
    intuition: 'Postorder visits root node strictly at the very end.'
  }
];

export default function PostorderTraversalVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Active Node: {step.activeNode ? `Node ${step.activeNode}` : 'Done'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Rule: Left → Right → Root
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Postorder Visited = {step.traversal.length} / 5
        </span>
      </div>

      {/* Binary Tree Graph */}
      <div className="w-full bg-[#12131b] border border-[#272b3c] rounded-2xl p-6 flex flex-col items-center gap-3">
        <span className="text-xs font-mono text-[#8a8ea3] uppercase tracking-wider">Tree Visualization</span>

        <div className="flex flex-col items-center gap-4 py-2 w-full">
          {/* Level 0: Root 1 */}
          <div className="flex justify-center">
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm transition-all ${
              step.activeNode === 1 
                ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40 shadow-lg' 
                : step.traversal.includes(1) 
                ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300' 
                : 'border-[#272b3c] bg-[#161824] text-slate-400'
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
                  : 'border-[#272b3c] bg-[#161824] text-slate-400'
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
                  : 'border-[#272b3c] bg-[#161824] text-slate-400'
              }`}>
                {val}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traversal Output Array */}
      <div className="w-full bg-[#12131b] border border-emerald-500/30 rounded-2xl p-4 flex flex-col gap-2">
        <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">Postorder Traversal Array</span>
        <div className="flex items-center gap-2">
          {step.traversal.map((val, idx) => (
            <span key={idx} className="flex items-center gap-1.5">
              <span className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-sm">
                {val}
              </span>
              {idx < step.traversal.length - 1 && <span className="text-slate-600 text-xs font-mono">→</span>}
            </span>
          ))}
          {step.traversal.length === 0 && <span className="text-xs text-slate-500 italic font-mono">Traversing children first...</span>}
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[#161824] border border-[#272b3c] rounded-xl p-3 text-xs font-mono text-center text-[#8a8ea3]">
        {step.explain}
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Iterative Preorder Traversal',
  category: 'Binary Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) using Explicit Stack',
  description: 'Traverses a binary tree in Root &rarr; Left &rarr; Right order iteratively using an explicit stack, pushing the right child before the left child so that the left child is processed first.'
};

export const solutions = {
  cpp: `// C++: Iterative Preorder Traversal
// Time Complexity: O(N) | Space: O(H)
#include <vector>
#include <stack>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<int> preorderTraversal(TreeNode* root) {
    vector<int> preorder;
    if (root == nullptr) return preorder;

    stack<TreeNode*> st;
    st.push(root);

    while (!st.empty()) {
        TreeNode* node = st.top();
        st.pop();
        preorder.push_back(node->val);

        // Push right first so that left is popped first (LIFO)
        if (node->right) st.push(node->right);
        if (node->left) st.push(node->left);
    }
    return preorder;
}`,
  java: `// Java: Iterative Preorder Traversal
import java.util.*;

class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> preorder = new ArrayList<>();
        if (root == null) return preorder;

        Stack<TreeNode> st = new Stack<>();
        st.push(root);

        while (!st.isEmpty()) {
            TreeNode node = st.pop();
            preorder.add(node.val);

            if (node.right != null) st.push(node.right);
            if (node.left != null) st.push(node.left);
        }
        return preorder;
    }
}`,
  python: `# Python 3: Iterative Preorder Traversal
def preorder_traversal(root):
    if not root:
        return []
    preorder = []
    st = [root]

    while st:
        node = st.pop()
        preorder.append(node.val)
        if node.right:
            st.append(node.right)
        if node.left:
            st.append(node.left)

    return preorder`,
  javascript: `// JavaScript: Iterative Preorder Traversal
function preorderTraversal(root) {
    if (!root) return [];
    const preorder = [];
    const st = [root];

    while (st.length > 0) {
        const node = st.pop();
        preorder.push(node.val);
        if (node.right) st.push(node.right);
        if (node.left) st.push(node.left);
    }
    return preorder;
}`
};

export const steps = [
  {
    title: '1. Initialize: Push Root 1 to stack',
    phase: 'INIT',
    codeLine: 18,
    activeNode: 1,
    stack: [1],
    output: [],
    explain: 'Root 1 pushed to stack. Preorder visits Root first before children.'
  },
  {
    title: '2. Pop 1 &rarr; Output 1 &rarr; Push Right (3) then Left (2)',
    phase: 'PUSH_CHILDREN',
    codeLine: 26,
    activeNode: 1,
    stack: [3, 2],
    output: [1],
    explain: 'Pop 1 and record in preorder. Right child 3 pushed first; Left child 2 pushed on top.'
  },
  {
    title: '3. Pop 2 &rarr; Output 2 &rarr; Push Right (5) then Left (4)',
    phase: 'PUSH_CHILDREN',
    codeLine: 26,
    activeNode: 2,
    stack: [3, 5, 4],
    output: [1, 2],
    explain: 'Pop top node 2. Children of 2: 5 pushed first, 4 pushed on top.'
  },
  {
    title: '4. Pop 4 &rarr; Output 4 (Leaf node &rarr; no children to push)',
    phase: 'LEAF',
    codeLine: 22,
    activeNode: 4,
    stack: [3, 5],
    output: [1, 2, 4],
    explain: 'Node 4 has no children. Stack top is now Node 5.'
  },
  {
    title: '5. Pop 5 &rarr; Output 5 (Leaf node)',
    phase: 'LEAF',
    codeLine: 22,
    activeNode: 5,
    stack: [3],
    output: [1, 2, 4, 5],
    explain: 'Node 5 has no children. Left subtree of root 1 finished. Stack top is Node 3.'
  },
  {
    title: '6. Pop 3 &rarr; Output 3. Final: [1, 2, 4, 5, 3]',
    phase: 'COMPLETE',
    codeLine: 22,
    activeNode: 3,
    stack: [],
    output: [1, 2, 4, 5, 3],
    explain: 'Node 3 popped. Stack is empty. Preorder traversal complete!'
  }
];

export default function IterativePreorderTraversalOfBinaryTreeVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Visiting: <strong className="text-cyan-400">Node {step.activeNode}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Rule: <strong>Root &rarr; Left &rarr; Right</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Stack Order: <strong>Right First, Left On Top</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Tree */}
        <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#12131b] border border-[#242738] shadow-xl">
          <span className="text-xs font-mono text-[#8a8ea3]">Binary Tree</span>

          <div className="flex flex-col items-center gap-4 py-2">
            <div
              className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm ${
                step.activeNode === 1
                  ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200'
                  : step.output.includes(1)
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                  : 'bg-[#181a26] border-[#31364d] text-white'
              }`}
            >
              1
            </div>

            <div className="flex justify-center gap-14">
              {[2, 3].map(v => (
                <div
                  key={v}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs ${
                    step.activeNode === v
                      ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200'
                      : step.output.includes(v)
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                      : 'bg-[#181a26] border-[#31364d] text-white'
                  }`}
                >
                  {v}
                </div>
              ))}
            </div>

            <div className="flex justify-start gap-4 -ml-16">
              {[4, 5].map(v => (
                <div
                  key={v}
                  className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs ${
                    step.activeNode === v
                      ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200'
                      : step.output.includes(v)
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                      : 'bg-[#181a26] border-[#31364d] text-white'
                  }`}
                >
                  {v}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stack */}
        <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#12131b] border border-[#242738] shadow-xl">
          <span className="text-xs font-mono text-[#8a8ea3]">LIFO Stack</span>

          <div className="w-36 h-36 rounded-xl border-2 border-dashed border-[#2d3144] flex flex-col-reverse items-center p-2 gap-1.5 bg-[#0f1016]">
            {step.stack.length === 0 ? (
              <span className="text-xs font-mono text-[#4e5370] m-auto">Empty Stack</span>
            ) : (
              step.stack.map((v, i) => (
                <div
                  key={i}
                  className="w-full py-1 text-center rounded bg-purple-500/20 border border-purple-400 text-purple-200 font-mono text-xs font-bold"
                >
                  Node {v}
                </div>
              ))
            )}
          </div>

          <div className="w-full flex flex-col items-center gap-1 pt-1">
            <span className="text-[10px] font-mono text-[#6c7292]">Preorder Output:</span>
            <div className="flex gap-1.5">
              {step.output.map((v, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs">
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Post-order Traversal using 2 Stacks',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(2N) = O(N)',
  description: 'Traverses a binary tree in Left &rarr; Right &rarr; Root order iteratively using 2 stacks: Stack 1 discovers nodes, while Stack 2 reverses the order into postorder.'
};

export const solutions = {
  cpp: `// C++: Postorder Traversal using 2 Stacks
// Time Complexity: O(N) | Space: O(2N)
#include <vector>
#include <stack>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<int> postorderTraversal(TreeNode* root) {
    vector<int> postorder;
    if (root == nullptr) return postorder;

    stack<TreeNode*> st1, st2;
    st1.push(root);

    while (!st1.empty()) {
        TreeNode* node = st1.top();
        st1.pop();
        st2.push(node);

        if (node->left) st1.push(node->left);
        if (node->right) st1.push(node->right);
    }

    while (!st2.empty()) {
        postorder.push_back(st2.top()->val);
        st2.pop();
    }
    return postorder;
}`,
  java: `// Java: Postorder Traversal using 2 Stacks
import java.util.*;

class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> postorder = new ArrayList<>();
        if (root == null) return postorder;

        Stack<TreeNode> st1 = new Stack<>();
        Stack<TreeNode> st2 = new Stack<>();
        st1.push(root);

        while (!st1.isEmpty()) {
            TreeNode node = st1.pop();
            st2.push(node);

            if (node.left != null) st1.push(node.left);
            if (node.right != null) st1.push(node.right);
        }

        while (!st2.isEmpty()) {
            postorder.add(st2.pop().val);
        }
        return postorder;
    }
}`,
  python: `# Python 3: Postorder Traversal using 2 Stacks
def postorder_traversal(root):
    if not root:
        return []

    st1 = [root]
    st2 = []

    while st1:
        node = st1.pop()
        st2.append(node)
        if node.left:
            st1.append(node.left)
        if node.right:
            st1.append(node.right)

    return [node.val for node in reversed(st2)]`,
  javascript: `// JavaScript: Postorder Traversal using 2 Stacks
function postorderTraversal(root) {
    if (!root) return [];
    const st1 = [root];
    const st2 = [];

    while (st1.length > 0) {
        const node = st1.pop();
        st2.push(node);
        if (node.left) st1.push(node.left);
        if (node.right) st1.push(node.right);
    }

    return st2.reverse().map(n => n.val);
}`
};

export const steps = [
  {
    title: '1. Initialize: Push Root 1 to Stack 1',
    phase: 'INIT',
    codeLine: 18,
    activeNode: 1,
    st1: [1],
    st2: [],
    output: [],
    explain: 'Root 1 placed into Stack 1.'
  },
  {
    title: '2. Pop 1 from St1 &rarr; Push 1 to St2 &rarr; Push 1.left (2) & 1.right (3) to St1',
    phase: 'TRANSFER',
    codeLine: 23,
    activeNode: 1,
    st1: [2, 3],
    st2: [1],
    output: [],
    explain: 'Node 1 transferred to Stack 2. Its left (2) and right (3) children pushed to Stack 1.'
  },
  {
    title: '3. Pop 3 from St1 &rarr; Push 3 to St2 (3 has no children)',
    phase: 'TRANSFER',
    codeLine: 23,
    activeNode: 3,
    st1: [2],
    st2: [1, 3],
    output: [],
    explain: 'Node 3 transferred to Stack 2. St1 now holds [2].'
  },
  {
    title: '4. Pop 2 from St1 &rarr; Push 2 to St2 &rarr; Push 2.left (4) & 2.right (5) to St1',
    phase: 'TRANSFER',
    codeLine: 23,
    activeNode: 2,
    st1: [4, 5],
    st2: [1, 3, 2],
    output: [],
    explain: 'Node 2 transferred to Stack 2. Children 4 and 5 pushed to Stack 1.'
  },
  {
    title: '5. Transfer 5 and 4 to Stack 2 &rarr; Stack 1 Empty!',
    phase: 'DRAIN_ST1',
    codeLine: 23,
    activeNode: 4,
    st1: [],
    st2: [1, 3, 2, 5, 4],
    output: [],
    explain: 'Both leaf nodes 5 and 4 transferred to Stack 2. Stack 2 contains [1, 3, 2, 5, 4] from bottom to top.'
  },
  {
    title: '6. Pop all from Stack 2 into output &rarr; [4, 5, 2, 3, 1]',
    phase: 'COMPLETE',
    codeLine: 31,
    activeNode: null,
    st1: [],
    st2: [],
    output: [4, 5, 2, 3, 1],
    explain: 'Popping Stack 2 naturally inverts the sequence, yielding exact Left &rarr; Right &rarr; Root Postorder!'
  }
];

export default function PostorderTraversalOfBinaryTreeUsing2StackVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Active: <strong className="text-cyan-400">{step.activeNode ? `Node ${step.activeNode}` : 'Popping St2'}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          2-Stack Duality: <strong>St1 (Traversal) &rarr; St2 (Inversion)</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Stack 1 */}
        <div className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-[#12131b] border border-[#242738] shadow-xl">
          <span className="text-xs font-mono text-[#8a8ea3]">Stack 1 (Traversal)</span>

          <div className="w-36 h-36 rounded-xl border-2 border-dashed border-[#2d3144] flex flex-col-reverse items-center p-2 gap-1.5 bg-[#0f1016]">
            {step.st1.length === 0 ? (
              <span className="text-xs font-mono text-[#4e5370] m-auto">Empty</span>
            ) : (
              step.st1.map((v, i) => (
                <div
                  key={i}
                  className="w-full py-1 text-center rounded bg-blue-500/20 border border-blue-400 text-blue-200 font-mono text-xs font-bold"
                >
                  Node {v}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Stack 2 */}
        <div className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-[#12131b] border border-[#242738] shadow-xl">
          <span className="text-xs font-mono text-[#8a8ea3]">Stack 2 (Reverse Output)</span>

          <div className="w-36 h-36 rounded-xl border-2 border-dashed border-[#2d3144] flex flex-col-reverse items-center p-2 gap-1.5 bg-[#0f1016]">
            {step.st2.length === 0 ? (
              <span className="text-xs font-mono text-[#4e5370] m-auto">Empty</span>
            ) : (
              step.st2.map((v, i) => (
                <div
                  key={i}
                  className="w-full py-1 text-center rounded bg-emerald-500/20 border border-emerald-400 text-emerald-200 font-mono text-xs font-bold"
                >
                  Node {v}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Output Stream */}
      <div className="w-full flex items-center justify-between p-4 rounded-xl bg-[#12131b] border border-[#242738]">
        <span className="text-xs font-mono text-[#8a8ea3]">Postorder Array:</span>
        <div className="flex gap-2">
          {step.output.length === 0 ? (
            <span className="text-xs font-mono text-[#525774]">Collecting in Stack 2...</span>
          ) : (
            step.output.map((v, i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 font-mono font-bold text-sm">
                {v}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Iterative Inorder Traversal',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) using Explicit Stack',
  description: 'Traverses a binary tree in Left &rarr; Root &rarr; Right order iteratively using an auxiliary stack to simulate the recursion call stack.'
};

export const solutions = {
  cpp: `// C++: Iterative Inorder Traversal
// Time Complexity: O(N) | Space: O(H)
#include <vector>
#include <stack>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<int> inorderTraversal(TreeNode* root) {
    vector<int> inorder;
    stack<TreeNode*> st;
    TreeNode* node = root;

    while (true) {
        if (node != nullptr) {
            st.push(node);
            node = node->left;
        } else {
            if (st.empty()) break;
            node = st.top();
            st.pop();
            inorder.push_back(node->val);
            node = node->right;
        }
    }
    return inorder;
}`,
  java: `// Java: Iterative Inorder Traversal
import java.util.*;

class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> inorder = new ArrayList<>();
        Stack<TreeNode> st = new Stack<>();
        TreeNode node = root;

        while (true) {
            if (node != null) {
                st.push(node);
                node = node.left;
            } else {
                if (st.isEmpty()) break;
                node = st.pop();
                inorder.add(node.val);
                node = node.right;
            }
        }
        return inorder;
    }
}`,
  python: `# Python 3: Iterative Inorder Traversal
def inorder_traversal(root):
    inorder = []
    st = []
    node = root

    while True:
        if node:
            st.append(node)
            node = node.left
        else:
            if not st:
                break
            node = st.pop()
            inorder.append(node.val)
            node = node.right

    return inorder`,
  javascript: `// JavaScript: Iterative Inorder Traversal
function inorderTraversal(root) {
    const inorder = [];
    const st = [];
    let node = root;

    while (true) {
        if (node !== null) {
            st.push(node);
            node = node.left;
        } else {
            if (st.length === 0) break;
            node = st.pop();
            inorder.push(node.val);
            node = node.right;
        }
    }
    return inorder;
}`
};

export const steps = [
  {
    title: '1. Initialize: Push Root 1 and traverse left descendants',
    phase: 'GO_LEFT',
    codeLine: 20,
    currVal: 1,
    stack: [1],
    output: [],
    explain: 'node = 1. Push 1 into stack. Advance to node.left (2).'
  },
  {
    title: '2. Push Node 2 & Push Node 4 &rarr; Reach null at 4.left',
    phase: 'GO_LEFT',
    codeLine: 20,
    currVal: null,
    stack: [1, 2, 4],
    output: [],
    explain: 'Pushed 2, then pushed 4. node.left is null &rarr; ready to pop!'
  },
  {
    title: '3. Pop Node 4 &rarr; Output 4 &rarr; Advance to 4.right (null)',
    phase: 'VISIT_ROOT',
    codeLine: 25,
    currVal: 4,
    stack: [1, 2],
    output: [4],
    explain: 'Top of stack is 4. Pop 4 and add to inorder array. 4.right is null.'
  },
  {
    title: '4. Pop Node 2 &rarr; Output 2 &rarr; Advance to 2.right (5)',
    phase: 'VISIT_ROOT',
    codeLine: 25,
    currVal: 2,
    stack: [1],
    output: [4, 2],
    explain: 'Pop 2 and append to inorder. Advance node to node.right (5).'
  },
  {
    title: '5. Push Node 5 & Pop Node 5 &rarr; Output 5',
    phase: 'VISIT_ROOT',
    codeLine: 25,
    currVal: 5,
    stack: [1],
    output: [4, 2, 5],
    explain: 'Node 5 pushed then popped immediately (leaf). Left subtree of root 1 complete.'
  },
  {
    title: '6. Pop Node 1 &rarr; Output 1 &rarr; Advance to right subtree (3)',
    phase: 'VISIT_ROOT',
    codeLine: 25,
    currVal: 1,
    stack: [],
    output: [4, 2, 5, 1],
    explain: 'Pop root node 1 and append. Move to 1.right (3).'
  },
  {
    title: '7. Process Node 3 &rarr; Output 3. Final: [4, 2, 5, 1, 3]',
    phase: 'COMPLETE',
    codeLine: 22,
    currVal: null,
    stack: [],
    output: [4, 2, 5, 1, 3],
    explain: 'Node 3 visited and popped. Stack is empty and node is null &rarr; traversal complete!'
  }
];

export default function IterativeInorderTraversalOfBinaryTreeVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Active Node: <strong className="text-amber-400">{step.currVal ? `Node ${step.currVal}` : 'null'}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Rule: <strong>Left &rarr; Root &rarr; Right</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Visited: <strong>{step.output.length} / 5</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Tree Topology */}
        <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#12131b] border border-[#242738] shadow-xl">
          <span className="text-xs font-mono text-[#8a8ea3]">Binary Tree</span>

          <div className="flex flex-col items-center gap-4 py-2">
            <div
              className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm ${
                step.currVal === 1
                  ? 'bg-amber-500/25 border-amber-400 text-amber-200'
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
                    step.currVal === v
                      ? 'bg-amber-500/25 border-amber-400 text-amber-200'
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
                    step.currVal === v
                      ? 'bg-amber-500/25 border-amber-400 text-amber-200'
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

        {/* Auxiliary Stack */}
        <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#12131b] border border-[#242738] shadow-xl">
          <span className="text-xs font-mono text-[#8a8ea3]">Explicit Call Stack</span>

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

          {/* Inorder output */}
          <div className="w-full flex flex-col items-center gap-1 pt-1">
            <span className="text-[10px] font-mono text-[#6c7292]">Inorder Output:</span>
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

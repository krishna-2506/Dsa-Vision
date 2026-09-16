import React from 'react';

export const meta = {
  title: 'Post-order Traversal using 1 Stack',
  category: 'Binary Trees',
  difficulty: 'Hard',
  timeComplexity: 'O(2N) = O(N)',
  spaceComplexity: 'O(H) using 1 Explicit Stack',
  description: 'Traverses a binary tree in Left &rarr; Right &rarr; Root order iteratively using only 1 auxiliary stack by tracking the last visited right-child node.'
};

export const solutions = {
  cpp: `// C++: Postorder Traversal using 1 Stack
// Time Complexity: O(N) | Space: O(H)
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
    stack<TreeNode*> st;
    TreeNode* curr = root;

    while (curr != nullptr || !st.empty()) {
        if (curr != nullptr) {
            st.push(curr);
            curr = curr->left;
        } else {
            TreeNode* temp = st.top()->right;
            if (temp == nullptr) {
                temp = st.top();
                st.pop();
                postorder.push_back(temp->val);
                while (!st.empty() && temp == st.top()->right) {
                    temp = st.top();
                    st.pop();
                    postorder.push_back(temp->val);
                }
            } else {
                curr = temp;
            }
        }
    }
    return postorder;
}`,
  java: `// Java: Postorder Traversal using 1 Stack
import java.util.*;

class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> postorder = new ArrayList<>();
        Stack<TreeNode> st = new Stack<>();
        TreeNode curr = root;

        while (curr != null || !st.isEmpty()) {
            if (curr != null) {
                st.push(curr);
                curr = curr.left;
            } else {
                TreeNode temp = st.peek().right;
                if (temp == null) {
                    temp = st.pop();
                    postorder.add(temp.val);
                    while (!st.isEmpty() && temp == st.peek().right) {
                        temp = st.pop();
                        postorder.add(temp.val);
                    }
                } else {
                    curr = temp;
                }
            }
        }
        return postorder;
    }
}`,
  python: `# Python 3: Postorder Traversal using 1 Stack
def postorder_traversal(root):
    postorder = []
    st = []
    curr = root

    while curr or st:
        if curr:
            st.append(curr)
            curr = curr.left
        else:
            temp = st[-1].right
            if not temp:
                temp = st.pop()
                postorder.append(temp.val)
                while st and temp == st[-1].right:
                    temp = st.pop()
                    postorder.append(temp.val)
            else:
                curr = temp

    return postorder`,
  javascript: `// JavaScript: Postorder Traversal using 1 Stack
function postorderTraversal(root) {
    const postorder = [];
    const st = [];
    let curr = root;

    while (curr !== null || st.length > 0) {
        if (curr !== null) {
            st.push(curr);
            curr = curr.left;
        } else {
            let temp = st[st.length - 1].right;
            if (!temp) {
                temp = st.pop();
                postorder.push(temp.val);
                while (st.length > 0 && temp === st[st.length - 1].right) {
                    temp = st.pop();
                    postorder.push(temp.val);
                }
            } else {
                curr = temp;
            }
        }
    }
    return postorder;
}`
};

export const steps = [
  {
    title: '1. Initialize: Push Root 1, advance curr left',
    phase: 'GO_LEFT',
    codeLine: 20,
    currVal: 1,
    stack: [1],
    output: [],
    explain: 'curr = 1. Push 1 into stack. Advance curr to curr.left (2).'
  },
  {
    title: '2. Push Node 2 & Push Node 4 &rarr; curr reaches null at 4.left',
    phase: 'GO_LEFT',
    codeLine: 20,
    currVal: null,
    stack: [1, 2, 4],
    output: [],
    explain: 'Pushed 2 and 4. curr is null. Inspect top node (4): 4.right is null.'
  },
  {
    title: '3. Pop Node 4 &rarr; Output 4 (Leaf node)',
    phase: 'POP_LEAF',
    codeLine: 27,
    currVal: 4,
    stack: [1, 2],
    output: [4],
    explain: '4 has no right child. Pop 4 and add to postorder output.'
  },
  {
    title: '4. Inspect Node 2: 2.right is Node 5 &rarr; curr moves to 5',
    phase: 'GO_RIGHT',
    codeLine: 35,
    currVal: 5,
    stack: [1, 2],
    output: [4],
    explain: 'Top is 2, but 2 has right child 5! Move curr to 5 to process right subtree first.'
  },
  {
    title: '5. Push Node 5 & Pop Node 5 &rarr; Output 5',
    phase: 'POP_LEAF',
    codeLine: 27,
    currVal: 5,
    stack: [1, 2],
    output: [4, 5],
    explain: 'Node 5 is pushed, finds null left/right, and is popped. Output: [4, 5].'
  },
  {
    title: '6. Backtrack loop: 5 was 2.right &rarr; Pop Node 2 &rarr; Output 2',
    phase: 'BACKTRACK_POP',
    codeLine: 30,
    currVal: 2,
    stack: [1],
    output: [4, 5, 2],
    explain: 'Since temp (5) == st.top().right (2.right), right subtree of 2 is complete! Pop 2.'
  },
  {
    title: '7. Move to 1.right (3) & Process 3 & Pop Root 1 &rarr; Final: [4, 5, 2, 3, 1]',
    phase: 'COMPLETE',
    codeLine: 30,
    currVal: null,
    stack: [],
    output: [4, 5, 2, 3, 1],
    explain: 'Node 3 processed and popped, followed by root 1. Postorder complete!'
  }
];

export default function PostorderTraversalOfBinaryTreeUsing1StackVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Active: <strong className="text-amber-400">{step.currVal ? `Node ${step.currVal}` : 'null'}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Rule: <strong>Left &rarr; Right &rarr; Root</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Method: <strong>1-Stack Backtracking</strong>
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

        {/* Stack */}
        <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#12131b] border border-[#242738] shadow-xl">
          <span className="text-xs font-mono text-[#8a8ea3]">Single Stack</span>

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
            <span className="text-[10px] font-mono text-[#6c7292]">Postorder Output:</span>
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

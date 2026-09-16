import React from 'react';

export const meta = {
  title: 'Preorder, Inorder, and Postorder in One Traversal',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(3N) = O(N)',
  spaceComplexity: 'O(4N) = O(N)',
  description: 'Computes Preorder, Inorder, and Postorder traversals simultaneously in a single pass using a stack of pairs `{node, state}` where states 1, 2, and 3 correspond to Pre, In, and Post processing.'
};

export const solutions = {
  cpp: `// C++: Preorder, Inorder, and Postorder in One Traversal
// Time Complexity: O(3N) = O(N) | Space Complexity: O(4N) = O(N)
#include <vector>
#include <stack>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void allTraversals(TreeNode* root, vector<int>& pre, vector<int>& in, vector<int>& post) {
    stack<pair<TreeNode*, int>> st;
    st.push({root, 1});

    if (root == nullptr) return;

    while (!st.empty()) {
        auto it = st.top();
        st.pop();

        // 1. State 1 -> Preorder: increment to 2, push left
        if (it.second == 1) {
            pre.push_back(it.first->val);
            it.second++;
            st.push(it);

            if (it.first->left != nullptr) {
                st.push({it.first->left, 1});
            }
        }
        // 2. State 2 -> Inorder: increment to 3, push right
        else if (it.second == 2) {
            in.push_back(it.first->val);
            it.second++;
            st.push(it);

            if (it.first->right != nullptr) {
                st.push({it.first->right, 1});
            }
        }
        // 3. State 3 -> Postorder: pop
        else {
            post.push_back(it.first->val);
        }
    }
}`,
  java: `// Java: Pre, In, and Postorder in One Traversal
import java.util.*;

class Pair {
    TreeNode node;
    int num;
    Pair(TreeNode n, int num) {
        this.node = n;
        this.num = num;
    }
}

class Solution {
    public static void allTraversals(TreeNode root, List<Integer> pre, List<Integer> in, List<Integer> post) {
        Stack<Pair> st = new Stack<>();
        if (root == null) return;
        st.push(new Pair(root, 1));

        while (!st.isEmpty()) {
            Pair it = st.pop();

            if (it.num == 1) {
                pre.add(it.node.val);
                it.num++;
                st.push(it);

                if (it.node.left != null) {
                    st.push(new Pair(it.node.left, 1));
                }
            } else if (it.num == 2) {
                in.add(it.node.val);
                it.num++;
                st.push(it);

                if (it.node.right != null) {
                    st.push(new Pair(it.node.right, 1));
                }
            } else {
                post.add(it.node.val);
            }
        }
    }
}`,
  python: `# Python 3: All 3 Traversals in One Pass
def all_traversals(root):
    if not root:
        return [], [], []

    pre, ino, post = [], [], []
    st = [[root, 1]]

    while st:
        node, state = st[-1]

        if state == 1:
            pre.append(node.val)
            st[-1][1] += 1
            if node.left:
                st.append([node.left, 1])
        elif state == 2:
            ino.append(node.val)
            st[-1][1] += 1
            if node.right:
                st.append([node.right, 1])
        else:
            post.append(node.val)
            st.pop()

    return pre, ino, post`,
  javascript: `// JavaScript: All 3 Traversals in One Pass
function allTraversals(root) {
    if (!root) return { pre: [], in: [], post: [] };

    const pre = [], ino = [], post = [];
    const st = [[root, 1]];

    while (st.length > 0) {
        const top = st[st.length - 1];
        const [node, state] = top;

        if (state === 1) {
            pre.push(node.val);
            top[1]++;
            if (node.left) st.push([node.left, 1]);
        } else if (state === 2) {
            ino.push(node.val);
            top[1]++;
            if (node.right) st.push([node.right, 1]);
        } else {
            post.push(node.val);
            st.pop();
        }
    }

    return { pre, in: ino, post };
}`
};

export const steps = [
  {
    title: '1. Initialize: Push {Node 1, State 1} to Stack',
    phase: 'STATE_1_PRE',
    codeLine: 18,
    activeNode: 1,
    state: 1,
    pre: [1],
    ino: [],
    post: [],
    explain: 'State 1 &rarr; Add Node 1 to Preorder. Increment state to 2, push left child {2, 1}.'
  },
  {
    title: '2. Process Node 2 (State 1) & Node 3 (State 1) &rarr; Preorder grows',
    phase: 'STATE_1_PRE',
    codeLine: 26,
    activeNode: 2,
    state: 1,
    pre: [1, 2],
    ino: [],
    post: [],
    explain: 'Node 2 added to Preorder. State becomes 2.'
  },
  {
    title: '3. Node 2 reaches State 2 &rarr; Add 2 to Inorder &rarr; State becomes 3',
    phase: 'STATE_2_IN',
    codeLine: 35,
    activeNode: 2,
    state: 2,
    pre: [1, 2],
    ino: [2],
    post: [],
    explain: 'Left child finished. State 2 &rarr; Add 2 to Inorder. Increment state to 3, push right child.'
  },
  {
    title: '4. Node 2 reaches State 3 &rarr; Add 2 to Postorder &rarr; Pop Node 2!',
    phase: 'STATE_3_POST',
    codeLine: 43,
    activeNode: 2,
    state: 3,
    pre: [1, 2],
    ino: [2],
    post: [2],
    explain: 'Right child finished. State 3 &rarr; Add 2 to Postorder. Node 2 is fully popped from stack.'
  },
  {
    title: '5. Node 1 reaches State 2 &rarr; Add 1 to Inorder &rarr; Push Node 3',
    phase: 'STATE_2_IN',
    codeLine: 35,
    activeNode: 1,
    state: 2,
    pre: [1, 2, 3],
    ino: [2, 1],
    post: [2],
    explain: 'Left subtree of 1 complete. Node 1 added to Inorder. Push right child {3, 1}.'
  },
  {
    title: '6. Complete all nodes: Preorder, Inorder, and Postorder populated in 1 Pass!',
    phase: 'COMPLETE',
    codeLine: 45,
    activeNode: null,
    state: null,
    pre: [1, 2, 3],
    ino: [2, 1, 3],
    post: [2, 3, 1],
    explain: 'All 3 canonical traversals generated simultaneously in single O(N) pass!'
  }
];

export default function PreorderInorderAndPostorderTraversalInOneTraversalVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Active: <strong className="text-cyan-400">{step.activeNode ? `Node ${step.activeNode} (State ${step.state})` : 'Done'}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          State Machine: <strong>1=Pre, 2=In, 3=Post</strong>
        </div>
      </div>

      {/* 3 Result Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
        {/* Preorder */}
        <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#12131b] border border-[#242738]">
          <span className="text-xs font-mono font-bold text-amber-400">Preorder (State 1)</span>
          <div className="flex gap-1.5 flex-wrap min-h-[32px]">
            {step.pre.map((v, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 text-xs font-mono font-bold">
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* Inorder */}
        <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#12131b] border border-[#242738]">
          <span className="text-xs font-mono font-bold text-cyan-400">Inorder (State 2)</span>
          <div className="flex gap-1.5 flex-wrap min-h-[32px]">
            {step.ino.map((v, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-200 text-xs font-mono font-bold">
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* Postorder */}
        <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#12131b] border border-[#242738]">
          <span className="text-xs font-mono font-bold text-emerald-400">Postorder (State 3)</span>
          <div className="flex gap-1.5 flex-wrap min-h-[32px]">
            {step.post.map((v, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200 text-xs font-mono font-bold">
                {v}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="text-xs font-mono text-[#8a8ea3] bg-[#161824] px-4 py-2.5 rounded-xl border border-[#272b3c] text-center w-full">
        Each node is touched 3 times: once for preorder (state 1), once for inorder (state 2), and once for postorder (state 3).
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Right & Left View of Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) recursion stack',
  description: 'Calculates the nodes visible when the binary tree is viewed from the Right side and Left side using recursive reverse pre-order traversal (Root &rarr; Right &rarr; Left for Right View).'
};

export const solutions = {
  cpp: `// C++: Right & Left View of Binary Tree
// Time Complexity: O(N) | Space Complexity: O(H)
#include <vector>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
private:
    void getRightView(TreeNode* root, int level, vector<int>& res) {
        if (root == nullptr) return;
        if (level == res.size()) res.push_back(root->val);
        getRightView(root->right, level + 1, res);
        getRightView(root->left, level + 1, res);
    }

    void getLeftView(TreeNode* root, int level, vector<int>& res) {
        if (root == nullptr) return;
        if (level == res.size()) res.push_back(root->val);
        getLeftView(root->left, level + 1, res);
        getLeftView(root->right, level + 1, res);
    }

public:
    vector<int> rightSideView(TreeNode* root) {
        vector<int> res;
        getRightView(root, 0, res);
        return res;
    }

    vector<int> leftSideView(TreeNode* root) {
        vector<int> res;
        getLeftView(root, 0, res);
        return res;
    }
};`,
  java: `// Java: Right & Left View of Binary Tree
import java.util.*;

class Solution {
    private void rightView(TreeNode curr, List<Integer> result, int currDepth) {
        if (curr == null) return;
        if (currDepth == result.size()) {
            result.add(curr.val);
        }
        rightView(curr.right, result, currDepth + 1);
        rightView(curr.left, result, currDepth + 1);
    }

    private void leftView(TreeNode curr, List<Integer> result, int currDepth) {
        if (curr == null) return;
        if (currDepth == result.size()) {
            result.add(curr.val);
        }
        leftView(curr.left, result, currDepth + 1);
        leftView(curr.right, result, currDepth + 1);
    }

    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        rightView(root, result, 0);
        return result;
    }
}`,
  python: `# Python 3: Right and Left View of Binary Tree
def right_side_view(root):
    res = []

    def dfs_right(node, depth):
        if not node:
            return
        if depth == len(res):
            res.append(node.val)
        dfs_right(node.right, depth + 1)
        dfs_right(node.left, depth + 1)

    dfs_right(root, 0)
    return res

def left_side_view(root):
    res = []

    def dfs_left(node, depth):
        if not node:
            return
        if depth == len(res):
            res.append(node.val)
        dfs_left(node.left, depth + 1)
        dfs_left(node.right, depth + 1)

    dfs_left(root, 0)
    return res`,
  javascript: `// JavaScript: Right & Left View of Binary Tree
function rightSideView(root) {
    const res = [];

    function dfs(node, depth) {
        if (!node) return;
        if (depth === res.length) {
            res.push(node.val);
        }
        dfs(node.right, depth + 1);
        dfs(node.left, depth + 1);
    }

    dfs(root, 0);
    return res;
}`
};

export const steps = [
  {
    title: '1. Level 0: Root Node 1 &rarr; Visible from both Right and Left',
    phase: 'LEVEL_0',
    codeLine: 16,
    level: 0,
    activeNode: 1,
    rightView: [1],
    leftView: [1],
    explain: 'At depth 0, Root 1 is the first node encountered for depth 0. Added to both right and left views.'
  },
  {
    title: '2. Level 1: Node 2 (Left) and Node 3 (Right)',
    phase: 'LEVEL_1',
    codeLine: 18,
    level: 1,
    activeNode: 3,
    rightView: [1, 3],
    leftView: [1, 2],
    explain: 'For Right View (visit right first): 3 is seen. For Left View (visit left first): 2 is seen.'
  },
  {
    title: '3. Level 2: Node 4 (Left) and Node 5 (Right under 2)',
    phase: 'LEVEL_2',
    codeLine: 18,
    level: 2,
    activeNode: 5,
    rightView: [1, 3, 5],
    leftView: [1, 2, 4],
    explain: 'Node 3 has no children. Node 5 is the rightmost at level 2; Node 4 is the leftmost at level 2.'
  },
  {
    title: '4. Summary: Right View = [1, 3, 5], Left View = [1, 2, 4]',
    phase: 'COMPLETE',
    codeLine: 29,
    level: null,
    activeNode: null,
    rightView: [1, 3, 5],
    leftView: [1, 2, 4],
    explain: 'Right View: [1, 3, 5]. Left View: [1, 2, 4]. Computed in O(N) time with O(H) space.'
  }
];

export default function RightleftViewOfBinaryTreeVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Right View: <strong>[{step.rightView.join(', ')}]</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Left View: <strong>[{step.leftView.join(', ')}]</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Tree Perspective Projection</span>
          <span className="text-purple-400 font-bold">O(H) Recursive Traversal</span>
        </div>

        {/* Tree Topology */}
        <div className="flex flex-col items-center gap-4 py-3 w-full">
          {/* Level 0 */}
          <div className="w-11 h-11 rounded-full border-2 border-emerald-400 bg-emerald-500/20 text-emerald-200 flex items-center justify-center font-mono font-bold text-sm shadow-md">
            1
          </div>

          {/* Level 1 */}
          <div className="flex justify-center gap-16 w-full">
            <div className="w-10 h-10 rounded-full border-2 border-cyan-400 bg-cyan-500/20 text-cyan-200 flex items-center justify-center font-mono font-bold text-xs">
              2
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-purple-400 bg-purple-500/20 text-purple-200 flex items-center justify-center font-mono font-bold text-xs">
              3
            </div>
          </div>

          {/* Level 2 */}
          <div className="flex justify-start gap-6 -ml-16">
            <div className="w-9 h-9 rounded-full border-2 border-cyan-400 bg-cyan-500/20 text-cyan-200 flex items-center justify-center font-mono font-bold text-xs">
              4
            </div>
            <div className="w-9 h-9 rounded-full border-2 border-purple-400 bg-purple-500/20 text-purple-200 flex items-center justify-center font-mono font-bold text-xs">
              5
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full text-center text-xs font-mono pt-2">
          <div className="p-2.5 rounded-xl bg-[var(--board-raised-2)] border border-[#26293a] text-cyan-300">
            Left View: Root &rarr; Left &rarr; Right
          </div>
          <div className="p-2.5 rounded-xl bg-[var(--board-raised-2)] border border-[#26293a] text-purple-300">
            Right View: Root &rarr; Right &rarr; Left
          </div>
        </div>
      </div>
    </div>
  );
}

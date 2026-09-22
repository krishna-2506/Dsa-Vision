import React from 'react';

export const meta = {
  title: 'Construct BT from Postorder & Inorder',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) hash map & recursion stack',
  description: 'Reconstructs a unique binary tree given its postorder (where the root is always the last element) and inorder traversals using recursive array partitioning.'
};

export const solutions = {
  cpp: `// C++: Construct Binary Tree from Postorder and Inorder
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <unordered_map>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
private:
    TreeNode* build(vector<int>& postorder, int postStart, int postEnd,
                    vector<int>& inorder, int inStart, int inEnd,
                    unordered_map<int, int>& inMap) {
        if (postStart > postEnd || inStart > inEnd) return nullptr;

        TreeNode* root = new TreeNode(postorder[postEnd]);
        int inRoot = inMap[root->val];
        int numsLeft = inRoot - inStart;

        root->left = build(postorder, postStart, postStart + numsLeft - 1,
                           inorder, inStart, inRoot - 1, inMap);
        root->right = build(postorder, postStart + numsLeft, postEnd - 1,
                            inorder, inRoot + 1, inEnd, inMap);

        return root;
    }

public:
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        unordered_map<int, int> inMap;
        for (int i = 0; i < inorder.size(); i++) {
            inMap[inorder[i]] = i;
        }
        return build(postorder, 0, postorder.size() - 1,
                     inorder, 0, inorder.size() - 1, inMap);
    }
};`,
  java: `// Java: Construct Binary Tree from Postorder and Inorder
import java.util.HashMap;
import java.util.Map;

class Solution {
    private TreeNode build(int[] postorder, int postStart, int postEnd,
                           int[] inorder, int inStart, int inEnd,
                           Map<Integer, Integer> inMap) {
        if (postStart > postEnd || inStart > inEnd) return null;

        TreeNode root = new TreeNode(postorder[postEnd]);
        int inRoot = inMap.get(root.val);
        int numsLeft = inRoot - inStart;

        root.left = build(postorder, postStart, postStart + numsLeft - 1,
                          inorder, inStart, inRoot - 1, inMap);
        root.right = build(postorder, postStart + numsLeft, postEnd - 1,
                           inorder, inRoot + 1, inEnd, inMap);

        return root;
    }

    public TreeNode buildTree(int[] inorder, int[] postorder) {
        Map<Integer, Integer> inMap = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            inMap.put(inorder[i], i);
        }
        return build(postorder, 0, postorder.length - 1,
                     inorder, 0, inorder.length - 1, inMap);
    }
}`,
  python: `# Python 3: Construct Binary Tree from Postorder and Inorder
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def build_tree(inorder: list[int], postorder: list[int]):
    in_map = {val: i for i, val in enumerate(inorder)}

    def build(post_start, post_end, in_start, in_end):
        if post_start > post_end or in_start > in_end:
            return None

        root_val = postorder[post_end]
        root = TreeNode(root_val)
        in_root = in_map[root_val]
        nums_left = in_root - in_start

        root.left = build(post_start, post_start + nums_left - 1,
                          in_start, in_root - 1)
        root.right = build(post_start + nums_left, post_end - 1,
                           in_root + 1, in_end)

        return root

    return build(0, len(postorder) - 1, 0, len(inorder) - 1)`,
  javascript: `// JavaScript: Construct Binary Tree from Postorder and Inorder
function buildTree(inorder, postorder) {
    const inMap = new Map();
    for (let i = 0; i < inorder.length; i++) {
        inMap.set(inorder[i], i);
    }

    function build(postStart, postEnd, inStart, inEnd) {
        if (postStart > postEnd || inStart > inEnd) return null;

        const rootVal = postorder[postEnd];
        const root = { val: rootVal, left: null, right: null };
        const inRoot = inMap.get(rootVal);
        const numsLeft = inRoot - inStart;

        root.left = build(postStart, postStart + numsLeft - 1, inStart, inRoot - 1);
        root.right = build(postStart + numsLeft, postEnd - 1, inRoot + 1, inEnd);

        return root;
    }

    return build(0, postorder.length - 1, 0, inorder.length - 1);
}`
};

export const steps = [
  {
    title: '1. Root from Postorder: Last Element &rarr; postorder[4] = 3',
    phase: 'ROOT_DISCOVERY',
    codeLine: 20,
    rootVal: 3,
    inRootIdx: 1,
    leftSub: [9],
    rightSub: [15, 20, 7],
    explain: 'In postorder (Left, Right, Root), the root is always at postEnd (3). In inorder, index 1.'
  },
  {
    title: '2. Split Inorder: Left = [9] (size 1), Right = [15, 20, 7] (size 3)',
    phase: 'SPLIT',
    codeLine: 23,
    rootVal: 3,
    inRootIdx: 1,
    leftSub: [9],
    rightSub: [15, 20, 7],
    explain: 'Left subtree size = 1. Left postorder slice = [9], Right postorder slice = [15, 7, 20].'
  },
  {
    title: '3. Build Right Subtree Root: postorder slice end &rarr; 20',
    phase: 'BUILD_RIGHT',
    codeLine: 27,
    rootVal: 20,
    inRootIdx: 3,
    leftSub: [15],
    rightSub: [7],
    explain: 'Right subtree root is 20. In inorder, 15 is to left of 20 and 7 is to right.'
  },
  {
    title: '4. Build Leaves 15 and 7 under 20',
    phase: 'BUILD_LEAVES',
    codeLine: 25,
    rootVal: 15,
    inRootIdx: 2,
    leftSub: [],
    rightSub: [],
    explain: 'Both 15 and 7 attached to node 20.'
  },
  {
    title: '5. Build Left Subtree: Root = 9 (Leaf node under 3)',
    phase: 'BUILD_LEFT',
    codeLine: 25,
    rootVal: 9,
    inRootIdx: 0,
    leftSub: [],
    rightSub: [],
    explain: 'Node 9 attached as left child of 3. Full tree reconstructed!'
  }
];

export default function ConstructTheBinaryTreeFromPostorderAndInorderTraversalVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];
  const postorder = [9, 15, 7, 20, 3];
  const inorder = [9, 3, 15, 20, 7];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
          Subtree Root: <strong className="text-cyan-400">Node {step.rootVal}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Postorder Pivot: <strong>Last Element = Root</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Postorder &amp; Inorder Partitioning</span>
          <span className="text-emerald-400 font-bold">O(N) Construction</span>
        </div>

        <div className="flex flex-col gap-3 w-full py-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#6e7596] w-20">Postorder:</span>
            <div className="flex gap-2">
              {postorder.map((v, i) => (
                <span
                  key={i}
                  className={`w-9 h-9 rounded-lg border flex items-center justify-center font-mono font-bold text-xs ${
                    v === step.rootVal
                      ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200'
                      : 'bg-[#181a26] border-[#31364d] text-[var(--chalk)]'
                  }`}
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#6e7596] w-20">Inorder:</span>
            <div className="flex gap-2">
              {inorder.map((v, i) => {
                const isLeft = step.leftSub.includes(v);
                const isRight = step.rightSub.includes(v);
                const isRoot = v === step.rootVal;

                return (
                  <span
                    key={i}
                    className={`w-9 h-9 rounded-lg border flex items-center justify-center font-mono font-bold text-xs ${
                      isRoot
                        ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200'
                        : isLeft
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                        : isRight
                        ? 'bg-purple-500/20 border-purple-400 text-purple-200'
                        : 'bg-[#181a26] border-[#31364d] text-[#6a718f]'
                    }`}
                  >
                    {v}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-xs font-mono text-[var(--chalk-dim)] bg-[var(--board-raised-2)] px-4 py-2 rounded-xl border border-[var(--line)] text-center w-full">
          In Postorder, root is at postEnd &rarr; right child is constructed before left child.
        </div>
      </div>
    </div>
  );
}

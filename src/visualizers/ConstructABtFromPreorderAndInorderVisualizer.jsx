import React from 'react';

export const meta = {
  title: 'Construct BT from Preorder & Inorder',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) hash map & recursion stack',
  description: 'Reconstructs the unique binary tree given its preorder and inorder traversal sequences using a hash map for fast root lookup in the inorder array.'
};

export const solutions = {
  cpp: `// C++: Construct Binary Tree from Preorder and Inorder
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
    TreeNode* build(vector<int>& preorder, int preStart, int preEnd,
                    vector<int>& inorder, int inStart, int inEnd,
                    unordered_map<int, int>& inMap) {
        if (preStart > preEnd || inStart > inEnd) return nullptr;

        TreeNode* root = new TreeNode(preorder[preStart]);
        int inRoot = inMap[root->val];
        int numsLeft = inRoot - inStart;

        root->left = build(preorder, preStart + 1, preStart + numsLeft,
                           inorder, inStart, inRoot - 1, inMap);
        root->right = build(preorder, preStart + numsLeft + 1, preEnd,
                            inorder, inRoot + 1, inEnd, inMap);

        return root;
    }

public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        unordered_map<int, int> inMap;
        for (int i = 0; i < inorder.size(); i++) {
            inMap[inorder[i]] = i;
        }
        return build(preorder, 0, preorder.size() - 1,
                     inorder, 0, inorder.size() - 1, inMap);
    }
};`,
  java: `// Java: Construct Binary Tree from Preorder and Inorder
import java.util.HashMap;
import java.util.Map;

class Solution {
    private TreeNode build(int[] preorder, int preStart, int preEnd,
                           int[] inorder, int inStart, int inEnd,
                           Map<Integer, Integer> inMap) {
        if (preStart > preEnd || inStart > inEnd) return null;

        TreeNode root = new TreeNode(preorder[preStart]);
        int inRoot = inMap.get(root.val);
        int numsLeft = inRoot - inStart;

        root.left = build(preorder, preStart + 1, preStart + numsLeft,
                          inorder, inStart, inRoot - 1, inMap);
        root.right = build(preorder, preStart + numsLeft + 1, preEnd,
                           inorder, inRoot + 1, inEnd, inMap);

        return root;
    }

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        Map<Integer, Integer> inMap = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            inMap.put(inorder[i], i);
        }
        return build(preorder, 0, preorder.length - 1,
                     inorder, 0, inorder.length - 1, inMap);
    }
}`,
  python: `# Python 3: Construct Binary Tree from Preorder and Inorder
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def build_tree(preorder: list[int], inorder: list[int]):
    in_map = {val: i for i, val in enumerate(inorder)}

    def build(pre_start, pre_end, in_start, in_end):
        if pre_start > pre_end or in_start > in_end:
            return None

        root_val = preorder[pre_start]
        root = TreeNode(root_val)
        in_root = in_map[root_val]
        nums_left = in_root - in_start

        root.left = build(pre_start + 1, pre_start + nums_left,
                          in_start, in_root - 1)
        root.right = build(pre_start + nums_left + 1, pre_end,
                           in_root + 1, in_end)

        return root

    return build(0, len(preorder) - 1, 0, len(inorder) - 1)`,
  javascript: `// JavaScript: Construct Binary Tree from Preorder and Inorder
function buildTree(preorder, inorder) {
    const inMap = new Map();
    for (let i = 0; i < inorder.length; i++) {
        inMap.set(inorder[i], i);
    }

    function build(preStart, preEnd, inStart, inEnd) {
        if (preStart > preEnd || inStart > inEnd) return null;

        const rootVal = preorder[preStart];
        const root = { val: rootVal, left: null, right: null };
        const inRoot = inMap.get(rootVal);
        const numsLeft = inRoot - inStart;

        root.left = build(preStart + 1, preStart + numsLeft, inStart, inRoot - 1);
        root.right = build(preStart + numsLeft + 1, preEnd, inRoot + 1, inEnd);

        return root;
    }

    return build(0, preorder.length - 1, 0, inorder.length - 1);
}`
};

export const steps = [
  {
    title: '1. Root from Preorder: preorder[0] = 3',
    phase: 'ROOT_DISCOVERY',
    codeLine: 20,
    rootVal: 3,
    inRootIdx: 1,
    leftSub: [9],
    rightSub: [15, 20, 7],
    explain: 'First element of preorder is the tree root (3). In inorder [9, 3, 15, 20, 7], 3 is at index 1.'
  },
  {
    title: '2. Split Inorder: Left Subtree = [9], Right Subtree = [15, 20, 7]',
    phase: 'SUBTREE_SPLIT',
    codeLine: 23,
    rootVal: 3,
    inRootIdx: 1,
    leftSub: [9],
    rightSub: [15, 20, 7],
    explain: 'Left of index 1 has size 1 (value 9). Right has size 3 (values [15, 20, 7]).'
  },
  {
    title: '3. Build Left Subtree: Root = 9 (Leaf node)',
    phase: 'BUILD_LEFT',
    codeLine: 25,
    rootVal: 9,
    inRootIdx: 0,
    leftSub: [],
    rightSub: [],
    explain: 'preorder[1] = 9. 9 has 0 left and right elements in inorder. 3.left = Node(9).'
  },
  {
    title: '4. Build Right Subtree: Root = 20 &rarr; Left = 15, Right = 7',
    phase: 'BUILD_RIGHT',
    codeLine: 27,
    rootVal: 20,
    inRootIdx: 3,
    leftSub: [15],
    rightSub: [7],
    explain: 'Next preorder element is 20. In inorder, 15 is to left of 20 and 7 is to right of 20.'
  },
  {
    title: '5. Complete: Binary Tree Fully Reconstructed!',
    phase: 'COMPLETE',
    codeLine: 38,
    rootVal: 3,
    inRootIdx: null,
    leftSub: [],
    rightSub: [],
    explain: 'Tree reconstructed: Root 3 with left child 9 and right child 20 (which has children 15 and 7).'
  }
];

export default function ConstructABtFromPreorderAndInorderVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];
  const preorder = [3, 9, 20, 15, 7];
  const inorder = [9, 3, 15, 20, 7];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
          Active Root: <strong className="text-cyan-400">Node {step.rootVal}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Inorder Partitioning: <strong>O(1) Map Lookup</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Traversal Arrays Partition</span>
          <span className="text-cyan-400 font-bold">Preorder &amp; Inorder</span>
        </div>

        {/* Arrays Display */}
        <div className="flex flex-col gap-3 w-full py-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#6e7596] w-20">Preorder:</span>
            <div className="flex gap-2">
              {preorder.map((v, i) => (
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
          Green = Left Subtree elements | Cyan = Subtree Root | Purple = Right Subtree elements
        </div>
      </div>
    </div>
  );
}

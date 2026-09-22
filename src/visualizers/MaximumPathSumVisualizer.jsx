import React from 'react';

export const meta = {
  title: 'Binary Tree Maximum Path Sum',
  category: 'Binary Trees',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) recursion stack',
  description: 'Finds the maximum path sum of any non-empty path in a binary tree with negative values by greedily dropping subtrees with negative gain (max(0, gain)).'
};

export const solutions = {
  cpp: `// C++ Binary Tree Maximum Path Sum
// Time: O(N) | Space: O(H)
#include <algorithm>
#include <climits>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
private:
    int maxGain(TreeNode* node, int& maxSum) {
        if (node == nullptr) return 0;

        // Discard negative subtree paths by comparing with 0
        int leftGain = max(0, maxGain(node->left, maxSum));
        int rightGain = max(0, maxGain(node->right, maxSum));

        // Path passing through this node as curve top
        int currentPathSum = node->val + leftGain + rightGain;
        maxSum = max(maxSum, currentPathSum);

        // Return max branch contribution to parent
        return node->val + max(leftGain, rightGain);
    }
public:
    int maxPathSum(TreeNode* root) {
        int maxSum = INT_MIN;
        maxGain(root, maxSum);
        return maxSum;
    }
};`,
  python: `# Python 3 Binary Tree Maximum Path Sum
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxPathSum(self, root: TreeNode | None) -> int:
        max_sum = float('-inf')

        def max_gain(node):
            nonlocal max_sum
            if not node:
                return 0

            # Ignore negative paths
            left_gain = max(0, max_gain(node.left))
            right_gain = max(0, max_gain(node.right))

            current_path = node.val + left_gain + right_gain
            max_sum = max(max_sum, current_path)

            return node.val + max(left_gain, right_gain)

        max_gain(root)
        return int(max_sum)`,
  java: `// Java Binary Tree Maximum Path Sum
class Solution {
    private int maxGain(TreeNode node, int[] maxSum) {
        if (node == null) return 0;

        int leftGain = Math.max(0, maxGain(node.left, maxSum));
        int rightGain = Math.max(0, maxGain(node.right, maxSum));

        int currentPath = node.val + leftGain + rightGain;
        maxSum[0] = Math.max(maxSum[0], currentPath);

        return node.val + Math.max(leftGain, rightGain);
    }

    public int maxPathSum(TreeNode root) {
        int[] maxSum = new int[]{Integer.MIN_VALUE};
        maxGain(root, maxSum);
        return maxSum[0];
    }
}`,
  javascript: `// JavaScript Binary Tree Maximum Path Sum
var maxPathSum = function(root) {
    let maxSum = -Infinity;

    function maxGain(node) {
        if (!node) return 0;

        const leftGain = Math.max(0, maxGain(node.left));
        const rightGain = Math.max(0, maxGain(node.right));

        const currentPath = node.val + leftGain + rightGain;
        maxSum = Math.max(maxSum, currentPath);

        return node.val + Math.max(leftGain, rightGain);
    }

    maxGain(root);
    return maxSum;
};`
};

export const steps = [
  {
    title: '1. Tree: [-10, 9, 20, null, null, 15, 7]. Rule: Ignore Negative Paths',
    phase: 'INITIAL',
    codeLine: 21,
    activeNode: -10,
    maxSum: -Infinity,
    localPathSum: 0,
    variables: { root: -10, formula: 'node.val + max(0, left) + max(0, right)' },
    explain: 'Paths can turn at any node. If a subtree has negative sum, we replace its contribution with 0 (max(0, gain)).',
    intuition: 'Never extend into negative branches.'
  },
  {
    title: '2. Node 9 (Left Child): Leaf with value 9 -> Gain = 9, maxSum = 9',
    phase: 'EVAL_NODE',
    codeLine: 26,
    activeNode: 9,
    maxSum: 9,
    localPathSum: 9,
    variables: { node: 9, leftGain: 0, rightGain: 0, gainReturned: 9 },
    explain: 'Node 9 has children null. Path sum at 9 is 9. Updates global maxSum to 9.',
    intuition: 'Single node path [9].'
  },
  {
    title: '3. Nodes 15 and 7: Return gains 15 and 7 respectively to Node 20',
    phase: 'EVAL_LEAVES',
    codeLine: 26,
    activeNode: 15,
    maxSum: 15,
    localPathSum: 15,
    variables: { node15Gain: 15, node7Gain: 7, maxSum: 15 },
    explain: 'Node 15 and Node 7 evaluated. Maximum path sum so far is 15.',
    intuition: 'Leaf gains computed.'
  },
  {
    title: '4. Node 20: Path = 20 + 15 + 7 = 42! Global maxSum = 42',
    phase: 'CURVE_PEAK',
    codeLine: 26,
    activeNode: 20,
    maxSum: 42,
    localPathSum: 42,
    variables: { node: 20, leftGain: 15, rightGain: 7, path: '15 + 20 + 7 = 42', maxSum: 42 },
    explain: 'Path through node 20 combining both children: 15 + 20 + 7 = 42. Global maxSum updates to 42!',
    intuition: 'Optimal subtree peak path found.'
  },
  {
    title: '5. Root Node -10: Path = -10 + 9 + 35 = 34 <= 42. Max Sum remains 42',
    phase: 'COMPLETED',
    codeLine: 35,
    activeNode: -10,
    maxSum: 42,
    localPathSum: 34,
    variables: { root: -10, node20ReturnGain: 35, totalThroughRoot: 34, optimalMaxSum: 42 },
    explain: 'Node 20 returns 20 + max(15, 7) = 35 to root. Path through root is -10 + 9 + 35 = 34, which is less than 42. Maximum path sum is 42 (Path: 15 -> 20 -> 7).',
    intuition: 'Maximum path sum = 42.'
  }
];

export default function MaximumPathSumVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Metric badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Evaluating Node: {step.activeNode}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 font-semibold">
          Local Path Sum = {step.localPathSum}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Global Max Path Sum = {step.maxSum}
        </span>
      </div>

      {/* Tree View with Optimal Path Highlight */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-6 flex flex-col items-center gap-4">
        <span className="text-xs font-mono text-[var(--chalk-dim)] uppercase tracking-wider">Path Sum Evaluation</span>

        <div className="flex flex-col items-center gap-4 py-2 w-full">
          {/* Root -10 */}
          <div className="flex justify-center">
            <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-mono font-bold transition-all ${
              step.activeNode === -10 ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40' : 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-dim)]'
            }`}>
              -10
            </div>
          </div>

          {/* Level 1: 9 and 20 */}
          <div className="flex justify-center gap-24">
            <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-mono font-bold transition-all ${
              step.activeNode === 9 ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40' : 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk-dim)]'
            }`}>
              9
            </div>
            <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-mono font-bold transition-all ${
              step.activeNode === 20 ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40' : 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
            }`}>
              20
            </div>
          </div>

          {/* Level 2: 15 and 7 */}
          <div className="flex justify-end gap-6 pr-12">
            {[15, 7].map((val) => (
              <div key={val} className={`w-13 h-13 rounded-2xl border-2 flex items-center justify-center font-mono font-bold transition-all ${
                step.activeNode === val ? 'border-amber-500 bg-amber-500/25 text-amber-300 ring-2 ring-amber-500/40' : 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
              }`}>
                {val}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Explanation */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 text-xs font-mono text-center text-[var(--chalk-dim)]">
        {step.explain}
      </div>
    </div>
  );
}

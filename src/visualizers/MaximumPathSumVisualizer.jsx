export const rendererType = 'tree';

export const meta = {
  title: 'Binary Tree Maximum Path Sum',
  category: 'Binary Trees',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) recursion stack',
  description: 'Finds the maximum path sum of any non-empty path in a binary tree where path values can be negative. Greedily prunes negative subtree gains with max(0, gain) while updating a global maximum path at every root of an inverted U curve.'
};

export const ideaMap = {
  title: 'Maximum Path Sum Bottom-Up DFS Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Postorder Subtree Traversal',
      detail: 'Recursively compute the maximum branch gain from the left child and right child.'
    },
    {
      id: 'step2',
      label: 'Greedy Negative Gain Pruning',
      detail: 'If a subtree contributes a negative sum, ignore it using max(0, gain) to avoid reducing overall path value.'
    },
    {
      id: 'step3',
      label: 'Local Curve Peak Check',
      detail: 'Compute local curve sum node.val + leftGain + rightGain; update global maxSum = max(maxSum, localPath).'
    },
    {
      id: 'step4',
      label: 'Single Branch Contribution Return',
      detail: 'Return node.val + max(leftGain, rightGain) to the parent, as a valid path cannot bifurcate twice.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Binary Tree Maximum Path Sum (LeetCode 124)
// Time Complexity: O(N) | Space Complexity: O(H)
#include <algorithm>
#include <climits>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
private:
    int maxGain(TreeNode* node, int& maxSum) {
        if (!node) return 0;

        // Discard negative subtree paths by comparing with 0
        int leftGain = max(0, maxGain(node->left, maxSum));
        int rightGain = max(0, maxGain(node->right, maxSum));

        // Path passing through this node as curve apex
        int currentPathSum = node->val + leftGain + rightGain;
        maxSum = max(maxSum, currentPathSum);

        // Return single branch contribution to parent
        return node->val + max(leftGain, rightGain);
    }
public:
    int maxPathSum(TreeNode* root) {
        int maxSum = INT_MIN;
        maxGain(root, maxSum);
        return maxSum;
    }
};`,
  java: `// Java: Binary Tree Maximum Path Sum (LeetCode 124)
// Time Complexity: O(N) | Space Complexity: O(H)
class Solution {
    private int maxSum = Integer.MIN_VALUE;

    public int maxPathSum(TreeNode root) {
        maxGain(root);
        return maxSum;
    }

    private int maxGain(TreeNode node) {
        if (node == null) return 0;

        // Ignore negative branches
        int leftGain = Math.max(0, maxGain(node.left));
        int rightGain = Math.max(0, maxGain(node.right));

        // Inverted U path apex at this node
        int localCurve = node.val + leftGain + rightGain;
        maxSum = Math.max(maxSum, localCurve);

        // Propagate linear branch upward
        return node.val + Math.max(leftGain, rightGain);
    }
}`,
  python: `# Python: Binary Tree Maximum Path Sum (LeetCode 124)
# Time Complexity: O(N) | Space Complexity: O(H)
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

            # Prune negative subtree contributions
            left_gain = max(0, max_gain(node.left))
            right_gain = max(0, max_gain(node.right))

            # Local path sum through node
            local_curve = node.val + left_gain + right_gain
            max_sum = max(max_sum, local_curve)

            # Return max unbranching path to parent
            return node.val + max(left_gain, right_gain)

        max_gain(root)
        return max_sum`,
  javascript: `// JavaScript: Binary Tree Maximum Path Sum (LeetCode 124)
// Time Complexity: O(N) | Space Complexity: O(H)
function maxPathSum(root) {
  let maxSum = -Infinity;

  function maxGain(node) {
    if (!node) return 0;

    const leftGain = Math.max(0, maxGain(node.left));
    const rightGain = Math.max(0, maxGain(node.right));

    const localCurve = node.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, localCurve);

    return node.val + Math.max(leftGain, rightGain);
  }

  maxGain(root);
  return maxSum;
}`
};

const sampleTree = {
  val: -10,
  left: { val: 9, left: null, right: null },
  right: {
    val: 20,
    left: { val: 15, left: null, right: null },
    right: { val: 7, left: null, right: null }
  }
};

export const steps = [
  {
    phase: 'START',
    title: '1. Initiate Postorder DFS at Root Node (-10)',
    tree: sampleTree,
    activeVal: -10,
    visitedVals: [],
    nodeLabels: { '-10': 'pending' },
    customCard: {
      title: 'Path Sum Evaluation State',
      rows: [
        { label: 'Current Node', value: 'Root (-10)', accent: true },
        { label: 'Formula', value: 'node.val + max(0, left) + max(0, right)' },
        { label: 'Global maxSum', value: '-Infinity' },
        { label: 'Call Stack', value: '[maxGain(-10)]' }
      ]
    },
    variables: {
      activeNode: -10,
      leftGain: 'pending',
      rightGain: 'pending',
      localCurve: 'pending',
      globalMaxSum: -Infinity
    },
    metrics: [
      { label: 'Active Node', value: '-10' },
      { label: 'Global Max', value: '-Infinity', highlight: true }
    ],
    explain: 'Start postorder traversal at root (-10). Before evaluating root, we must compute return gains from left child 9 and right child 20.'
  },
  {
    phase: 'EVAL_LEFT_LEAF',
    title: '2. Evaluate Leaf Node 9: Gain = 9, maxSum = 9',
    tree: sampleTree,
    activeVal: 9,
    visitedVals: [9],
    nodeLabels: { 9: 'gain=9', '-10': 'pending' },
    customCard: {
      title: 'Leaf Node 9 Evaluation',
      rows: [
        { label: 'Left / Right Gains', value: '0 / 0 (null leaves)' },
        { label: 'Local Curve Sum', value: '9 + 0 + 0 = 9', accent: true },
        { label: 'Branch Return', value: '9 + max(0, 0) = 9' },
        { label: 'Global maxSum', value: 'Updated to 9' }
      ]
    },
    variables: {
      activeNode: 9,
      leftGain: 0,
      rightGain: 0,
      localCurve: 9,
      globalMaxSum: 9
    },
    metrics: [
      { label: 'Active Node', value: '9' },
      { label: 'Local Curve', value: '9' },
      { label: 'Global Max', value: '9', highlight: true }
    ],
    explain: 'Leaf 9 has no children. Local curve = 9. Global maxSum updates from -Infinity to 9. Return branch gain 9 to parent.'
  },
  {
    phase: 'EVAL_RIGHT_SUBTREE_LEAF',
    title: '3. Evaluate Leaf Node 15: Gain = 15, maxSum = 15',
    tree: sampleTree,
    activeVal: 15,
    visitedVals: [9, 15],
    nodeLabels: { 9: 'gain=9', 15: 'gain=15', '-10': 'pending' },
    customCard: {
      title: 'Leaf Node 15 Evaluation',
      rows: [
        { label: 'Left / Right Gains', value: '0 / 0' },
        { label: 'Local Curve Sum', value: '15 + 0 + 0 = 15', accent: true },
        { label: 'Global maxSum', value: 'Updated to 15' }
      ]
    },
    variables: {
      activeNode: 15,
      leftGain: 0,
      rightGain: 0,
      localCurve: 15,
      globalMaxSum: 15
    },
    metrics: [
      { label: 'Active Node', value: '15' },
      { label: 'Global Max', value: '15', highlight: true }
    ],
    explain: 'DFS traverses right subtree down to leaf 15. Local path = 15. Global maxSum updates to 15. Returns 15 to Node 20.'
  },
  {
    phase: 'EVAL_RIGHT_SUBTREE_LEAF',
    title: '4. Evaluate Leaf Node 7: Gain = 7, maxSum = 15',
    tree: sampleTree,
    activeVal: 7,
    visitedVals: [9, 15, 7],
    nodeLabels: { 9: 'gain=9', 15: 'gain=15', 7: 'gain=7', '-10': 'pending' },
    customCard: {
      title: 'Leaf Node 7 Evaluation',
      rows: [
        { label: 'Local Curve Sum', value: '7 + 0 + 0 = 7' },
        { label: 'Comparison', value: '7 < 15, maxSum remains 15' },
        { label: 'Branch Return', value: 'Returns 7 to Node 20' }
      ]
    },
    variables: {
      activeNode: 7,
      leftGain: 0,
      rightGain: 0,
      localCurve: 7,
      globalMaxSum: 15
    },
    metrics: [
      { label: 'Active Node', value: '7' },
      { label: 'Global Max', value: '15', highlight: true }
    ],
    explain: 'Leaf 7 yields local path 7. Global maxSum remains 15. Returns branch gain 7 to parent Node 20.'
  },
  {
    phase: 'APEX_PATH',
    title: '5. Apex Curve at Node 20: 15 + 20 + 7 = 42! Global maxSum = 42',
    tree: sampleTree,
    activeVal: 20,
    visitedVals: [9, 15, 7, 20],
    nodeLabels: { 9: 'gain=9', 15: 'gain=15', 7: 'gain=7', 20: 'curve=42' },
    customCard: {
      title: 'Subtree Peak Path Discovered',
      rows: [
        { label: 'Subtree Path', value: '15 -> 20 -> 7', accent: true },
        { label: 'Calculation', value: '20 + left(15) + right(7) = 42' },
        { label: 'Branch Upward', value: '20 + max(15, 7) = 35 to root' },
        { label: 'Global maxSum', value: 'Updated from 15 to 42!', accent: true }
      ]
    },
    variables: {
      activeNode: 20,
      leftGain: 15,
      rightGain: 7,
      localCurve: 42,
      branchReturn: 35,
      globalMaxSum: 42
    },
    metrics: [
      { label: 'Active Node', value: '20' },
      { label: 'Local Curve', value: '42' },
      { label: 'Global Max', value: '42', highlight: true }
    ],
    explain: 'Node 20 combines both positive child branches: 15 + 20 + 7 = 42. This exceeds current max (15), so global maxSum = 42! Upward return to root is 20 + 15 = 35.'
  },
  {
    phase: 'FINISH',
    title: '6. Root Evaluation (-10): Curve = 34 <= 42. Max Sum = 42',
    tree: sampleTree,
    activeVal: -10,
    visitedVals: [9, 15, 7, 20, -10],
    nodeLabels: { 9: 'gain=9', 15: 'gain=15', 7: 'gain=7', 20: 'ret=35', '-10': 'sum=34' },
    customCard: {
      title: 'Global Maximum Path Result',
      rows: [
        { label: 'Path Through Root', value: '-10 + 9 + 35 = 34' },
        { label: 'Optimal Path', value: '15 -> 20 -> 7', accent: true },
        { label: 'Optimal Max Sum', value: '42', accent: true },
        { label: 'Time Complexity', value: 'O(N) single pass postorder' }
      ]
    },
    variables: {
      activeNode: -10,
      leftGain: 9,
      rightGain: 35,
      localCurve: 34,
      globalMaxSum: 42
    },
    metrics: [
      { label: 'Active Node', value: '-10' },
      { label: 'Path Through Root', value: '34' },
      { label: 'Global Max', value: '42', highlight: true }
    ],
    explain: 'Evaluating root (-10): -10 + 9 + 35 = 34, which is less than 42. The global maximum path sum is 42 (subpath 15 -> 20 -> 7).'
  }
];

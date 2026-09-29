export const rendererType = 'tree';

export const meta = {
  title: 'Maximum Depth of Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) recursion stack',
  description: 'Calculates the maximum depth (height) of a binary tree recursively using the bottom-up formula: 1 + max(depth(left), depth(right)).'
};

export const ideaMap = {
  title: 'Maximum Depth (Height) Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Empty Tree Base Case',
      detail: 'If root is null, depth is 0. Base case terminates recursion at leaf boundaries.'
    },
    {
      id: 'step2',
      label: 'Subtree Postorder Recursion',
      detail: 'Recursively calculate the maximum depth of left and right child subtrees.'
    },
    {
      id: 'step3',
      label: '1 + max(left, right) Combining Step',
      detail: 'Combine depths by taking the greater height of the two branches plus one for current node.'
    },
    {
      id: 'step4',
      label: 'Unwind & Return Global Depth',
      detail: 'Return computed height up the call stack to reach final root height.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Maximum Depth of Binary Tree (Recursive)
// Time Complexity: O(N) | Space: O(H)
#include <algorithm>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    int maxDepth(TreeNode* root) {
        // Base case: empty tree has depth 0
        if (root == nullptr) return 0;

        // Recursive heights of left and right subtrees
        int leftDepth = maxDepth(root->left);
        int rightDepth = maxDepth(root->right);

        // Maximum depth at current node
        return 1 + max(leftDepth, rightDepth);
    }
};`,
  java: `// Java: Maximum Depth of Binary Tree
// Time Complexity: O(N) | Space: O(H)
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;

        int leftDepth = maxDepth(root.left);
        int rightDepth = maxDepth(root.right);

        return 1 + Math.max(leftDepth, rightDepth);
    }
}`,
  python: `# Python 3: Maximum Depth of Binary Tree
# Time Complexity: O(N) | Space: O(H)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxDepth(self, root: TreeNode | None) -> int:
        if not root:
            return 0

        left_depth = self.maxDepth(root.left)
        right_depth = self.maxDepth(root.right)

        return 1 + max(left_depth, right_depth)`,
  javascript: `// JavaScript: Maximum Depth of Binary Tree
// Time Complexity: O(N) | Space: O(H)
var maxDepth = function(root) {
    if (!root) return 0;

    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);

    return 1 + Math.max(leftDepth, rightDepth);
};`
};

const sampleTree = {
  val: 3,
  left: { val: 9, left: null, right: null },
  right: {
    val: 20,
    left: { val: 15, left: null, right: null },
    right: { val: 7, left: null, right: null }
  }
};

export const steps = [
  {
    phase: 'INITIALIZE',
    title: 'Initialize Depth Evaluation at Root Node (3)',
    activeVal: 3,
    tree: sampleTree,
    visitedVals: [],
    nodeLabels: { 3: 'h=?' },
    customCard: {
      title: 'Recursive Height Invariant',
      rows: [
        { label: 'Target Equation', value: 'depth(root) = 1 + max(depth(left), depth(right))' },
        { label: 'Current Evaluation', value: 'Must compute left subtree (Node 9) and right subtree (Node 20)', accent: true },
        { label: 'Call Stack State', value: '[maxDepth(3)]' }
      ]
    },
    variables: {
      currNode: 3,
      leftDepth: 'Pending...',
      rightDepth: 'Pending...',
      callStackDepth: 1
    },
    metrics: {
      visitedCount: 1,
      currentMaxDepth: 0,
      activeBranch: 'Root (3)'
    },
    explain: 'To calculate the maximum depth at root 3, we initiate postorder DFS to compute the height of the left child (9) and right child (20).'
  },
  {
    phase: 'EVAL_LEFT_LEAF',
    title: 'Evaluate Node 9: Left Leaf Depth = 1',
    activeVal: 9,
    tree: sampleTree,
    visitedVals: [9],
    nodeLabels: { 3: 'h=?', 9: 'h=1' },
    customCard: {
      title: 'Leaf Node Depth Formula',
      rows: [
        { label: 'Base Case Check', value: '9.left == null (0), 9.right == null (0)', accent: true },
        { label: 'Height Formula', value: '1 + max(0, 0) = 1' },
        { label: 'Return Value', value: 'Returns 1 to caller frame for Node 3' }
      ]
    },
    variables: {
      currNode: 9,
      leftDepth: 0,
      rightDepth: 0,
      computedHeight: 1,
      callStackDepth: 2
    },
    metrics: {
      visitedCount: 2,
      currentMaxDepth: 1,
      activeBranch: 'Left Subtree (9)'
    },
    explain: 'Node 9 has both left and right pointers as null. Each null base case returns 0. Thus, depth(9) = 1 + max(0, 0) = 1. Return 1 to parent frame.'
  },
  {
    phase: 'RECURSE_RIGHT_SUBTREE',
    title: 'Recurse into Right Subtree: Node 20',
    activeVal: 20,
    tree: sampleTree,
    visitedVals: [9, 20],
    nodeLabels: { 3: 'h=?', 9: 'h=1', 20: 'h=?' },
    customCard: {
      title: 'Right Subtree Recurse',
      rows: [
        { label: 'Subproblem', value: 'Calculate depth(20) = 1 + max(depth(15), depth(7))' },
        { label: 'Pending Left Child', value: 'Descend to node 15 first', accent: true },
        { label: 'Call Stack State', value: '[maxDepth(3), maxDepth(20)]' }
      ]
    },
    variables: {
      currNode: 20,
      leftDepth: 'Pending...',
      rightDepth: 'Pending...',
      callStackDepth: 2
    },
    metrics: {
      visitedCount: 3,
      currentMaxDepth: 1,
      activeBranch: 'Right Subtree (20)'
    },
    explain: 'Return control to root 3 with leftDepth = 1. Now branch into right child 20. Node 20 must compute its left child (15) and right child (7).'
  },
  {
    phase: 'EVAL_LEAF_15',
    title: 'Evaluate Leaf Node 15: Depth = 1',
    activeVal: 15,
    tree: sampleTree,
    visitedVals: [9, 20, 15],
    nodeLabels: { 3: 'h=?', 9: 'h=1', 20: 'h=?', 15: 'h=1' },
    customCard: {
      title: 'Node 15 Evaluation',
      rows: [
        { label: 'Base Cases', value: '15.left == null (0), 15.right == null (0)', accent: true },
        { label: 'Result for 15', value: '1 + max(0, 0) = 1' }
      ]
    },
    variables: {
      currNode: 15,
      leftDepth: 0,
      rightDepth: 0,
      computedHeight: 1,
      callStackDepth: 3
    },
    metrics: {
      visitedCount: 4,
      currentMaxDepth: 1,
      activeBranch: 'Node 15'
    },
    explain: 'Node 15 is a leaf with no children. Returns 1 + max(0, 0) = 1 to parent frame (Node 20).'
  },
  {
    phase: 'EVAL_LEAF_7',
    title: 'Evaluate Leaf Node 7: Depth = 1',
    activeVal: 7,
    tree: sampleTree,
    visitedVals: [9, 20, 15, 7],
    nodeLabels: { 3: 'h=?', 9: 'h=1', 20: 'h=?', 15: 'h=1', 7: 'h=1' },
    customCard: {
      title: 'Node 7 Evaluation',
      rows: [
        { label: 'Base Cases', value: '7.left == null (0), 7.right == null (0)', accent: true },
        { label: 'Result for 7', value: '1 + max(0, 0) = 1' }
      ]
    },
    variables: {
      currNode: 7,
      leftDepth: 0,
      rightDepth: 0,
      computedHeight: 1,
      callStackDepth: 3
    },
    metrics: {
      visitedCount: 5,
      currentMaxDepth: 1,
      activeBranch: 'Node 7'
    },
    explain: 'Node 7 is also a leaf node with depth 1. Returns 1 to parent frame (Node 20).'
  },
  {
    phase: 'COMBINE_NODE_20',
    title: 'Combine Depths for Node 20: 1 + max(1, 1) = 2',
    activeVal: 20,
    tree: sampleTree,
    visitedVals: [9, 20, 15, 7],
    nodeLabels: { 3: 'h=?', 9: 'h=1', 20: 'h=2', 15: 'h=1', 7: 'h=1' },
    customCard: {
      title: 'Node 20 Computation Complete',
      rows: [
        { label: 'Left Child (15) Depth', value: '1' },
        { label: 'Right Child (7) Depth', value: '1' },
        { label: 'Combined Height', value: '1 + max(1, 1) = 2', accent: true },
        { label: 'Unwind', value: 'Returns 2 to root Node 3' }
      ]
    },
    variables: {
      currNode: 20,
      leftDepth: 1,
      rightDepth: 1,
      computedHeight: 2,
      callStackDepth: 2
    },
    metrics: {
      visitedCount: 5,
      currentMaxDepth: 2,
      activeBranch: 'Node 20'
    },
    explain: 'Node 20 combines the results of its children: 1 + max(1, 1) = 2. It returns 2 to the root frame (Node 3).'
  },
  {
    phase: 'COMPLETE',
    title: 'Combine at Root: 1 + max(depth(9), depth(20)) = 1 + max(1, 2) = 3',
    activeVal: 3,
    tree: sampleTree,
    visitedVals: [3, 9, 20, 15, 7],
    nodeLabels: { 3: 'h=3 (MAX)', 9: 'h=1', 20: 'h=2', 15: 'h=1', 7: 'h=1' },
    customCard: {
      title: 'Global Maximum Depth Resolved',
      rows: [
        { label: 'Left Subtree Height', value: '1 (Node 9)' },
        { label: 'Right Subtree Height', value: '2 (Node 20 subtree)' },
        { label: 'Root Calculation', value: '1 + max(1, 2) = 3', accent: true },
        { label: 'Deepest Path', value: '3 -> 20 -> 15 (or 7) [3 nodes]' }
      ]
    },
    variables: {
      currNode: 3,
      leftDepth: 1,
      rightDepth: 2,
      maxDepth: 3,
      callStackDepth: 1
    },
    metrics: {
      visitedCount: 5,
      currentMaxDepth: 3,
      finalResult: 3
    },
    explain: 'Root node 3 calculates 1 + max(1, 2) = 3. The maximum depth of the entire binary tree is 3!'
  }
];

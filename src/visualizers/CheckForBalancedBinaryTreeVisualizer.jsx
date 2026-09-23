export const rendererType = 'tree';

export const meta = {
  title: 'Check for Balanced Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) Recursion Stack',
  description: 'Determines if a binary tree is height-balanced (for every node, abs(height(left) - height(right)) <= 1) using an optimal O(N) postorder DFS returning -1 on imbalance.'
};

export const ideaMap = [
  {
    id: 'balance-definition',
    title: 'Height-Balance Definition',
    description: 'A binary tree is height-balanced if for every node in the tree, the absolute difference between left and right subtree heights is at most 1.'
  },
  {
    id: 'bottom-up-postorder',
    title: 'Bottom-Up Postorder Check O(N)',
    description: 'Evaluating heights from leaves upwards computes each node height in O(1) time after its children return, achieving strict O(N) runtime.'
  },
  {
    id: 'sentinel-early-exit',
    title: 'Sentinel -1 Imbalance Propagation',
    description: 'Returning -1 immediately aborts further traversal if any subtree violates the balance condition, avoiding wasted computation.'
  },
  {
    id: 'avoid-quadratic-cost',
    title: 'Eliminating O(N²) Redundant Traversal',
    description: 'A naive top-down approach calling height(node) for every node costs O(N²). Bottom-up computation collapses this to exactly O(N).'
  },
  {
    id: 'height-induction-formula',
    title: 'Height Recurrence Formula',
    description: 'For any balanced node, its height is defined as: height = 1 + max(leftHeight, rightHeight).'
  }
];

export const solutions = {
  cpp: `// C++: Optimal Bottom-Up Balanced Tree Check
// Time: O(N) | Space: O(H)
class Solution {
    int checkHeight(TreeNode* root) {
        if (!root) return 0;

        int leftH = checkHeight(root->left);
        if (leftH == -1) return -1; // Left subtree unbalanced

        int rightH = checkHeight(root->right);
        if (rightH == -1) return -1; // Right subtree unbalanced

        if (abs(leftH - rightH) > 1) return -1; // Current node unbalanced

        return 1 + max(leftH, rightH);
    }
public:
    bool isBalanced(TreeNode* root) {
        return checkHeight(root) != -1;
    }
};`,
  java: `// Java: Optimal Bottom-Up Balanced Tree Check
class Solution {
    private int checkHeight(TreeNode root) {
        if (root == null) return 0;

        int leftH = checkHeight(root.left);
        if (leftH == -1) return -1;

        int rightH = checkHeight(root.right);
        if (rightH == -1) return -1;

        if (Math.abs(leftH - rightH) > 1) return -1;

        return 1 + Math.max(leftH, rightH);
    }
    public boolean isBalanced(TreeNode root) {
        return checkHeight(root) != -1;
    }
}`,
  python: `# Python 3: Optimal Bottom-Up Balanced Tree Check
class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        def check(node):
            if not node:
                return 0

            left_h = check(node.left)
            if left_h == -1:
                return -1

            right_h = check(node.right)
            if right_h == -1:
                return -1

            if abs(left_h - right_h) > 1:
                return -1

            return 1 + max(left_h, right_h)

        return check(root) != -1`,
  javascript: `// JavaScript: Optimal Bottom-Up Balanced Tree Check
function isBalanced(root) {
    function check(node) {
        if (!node) return 0;

        const leftH = check(node.left);
        if (leftH === -1) return -1;

        const rightH = check(node.right);
        if (rightH === -1) return -1;

        if (Math.abs(leftH - rightH) > 1) return -1;

        return 1 + Math.max(leftH, rightH);
    }

    return check(root) !== -1;
}`
};

const tree = {
  val: 3,
  left: {
    val: 9,
    left: { val: 4 },
    right: { val: 5 }
  },
  right: {
    val: 20,
    left: { val: 15 },
    right: { val: 7 }
  }
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Initialize Balanced Tree Check: Root = 3',
    explanation: 'Check whether every node satisfies |leftHeight - rightHeight| <= 1. Tree with 7 nodes.',
    activeLine: 6,
    activeIdeaId: 'balance-definition',
    tree,
    activeVal: 3,
    nodeLabels: { 3: 'Root' },
    variables: { root: 3, condition: '|lh - rh| <= 1', status: 'Checking Leaves' },
    customCard: {
      title: 'Problem Rule',
      rows: [
        { label: 'Condition', value: 'abs(lh - rh) <= 1 at EVERY node' },
        { label: 'Strategy', value: 'Bottom-up postorder DFS returning height' },
        { label: 'Early Exit', value: 'Return -1 if any subtree is unbalanced' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Postorder Step 1: Evaluate Leaf Node 4',
    explanation: 'Node 4 is a leaf (lh=0, rh=0). |0 - 0| = 0 <= 1 (Balanced). Returns height = 1 + max(0, 0) = 1.',
    activeLine: 12,
    activeIdeaId: 'height-induction-formula',
    tree,
    activeVal: 4,
    targetVal: 4,
    nodeLabels: { 4: 'H=1 (Balanced)' },
    variables: { node: 4, leftH: 0, rightH: 0, diff: 0, returnedH: 1 },
    customCard: {
      title: 'Node 4 Evaluation',
      rows: [
        { label: 'Left Height', value: '0 (null)' },
        { label: 'Right Height', value: '0 (null)' },
        { label: 'Difference', value: '|0 - 0| = 0 <= 1 (PASS)', accent: true },
        { label: 'Returned Height', value: '1' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Postorder Step 2: Evaluate Leaf Node 5',
    explanation: 'Node 5 is a leaf (lh=0, rh=0). |0 - 0| = 0 <= 1 (Balanced). Returns height = 1 + max(0, 0) = 1.',
    activeLine: 12,
    activeIdeaId: 'height-induction-formula',
    tree,
    activeVal: 5,
    targetVal: 5,
    visitedVals: [4],
    nodeLabels: { 4: 'H=1', 5: 'H=1 (Balanced)' },
    variables: { node: 5, leftH: 0, rightH: 0, diff: 0, returnedH: 1 },
    customCard: {
      title: 'Node 5 Evaluation',
      rows: [
        { label: 'Left Height', value: '0 (null)' },
        { label: 'Right Height', value: '0 (null)' },
        { label: 'Difference', value: '|0 - 0| = 0 <= 1 (PASS)', accent: true },
        { label: 'Returned Height', value: '1' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Postorder Step 3: Evaluate Parent Node 9',
    explanation: 'Node 9 has left child 4 (H=1) and right child 5 (H=1). Difference |1 - 1| = 0 <= 1. Returns H = 1 + max(1, 1) = 2.',
    activeLine: 14,
    activeIdeaId: 'height-induction-formula',
    tree,
    activeVal: 9,
    targetVal: 9,
    visitedVals: [4, 5],
    nodeLabels: { 4: 'H=1', 5: 'H=1', 9: 'H=2 (Balanced)' },
    variables: { node: 9, leftH: 1, rightH: 1, diff: 0, returnedH: 2 },
    customCard: {
      title: 'Left Subtree Root: Node 9',
      rows: [
        { label: 'Left Subtree Height', value: '1 (Node 4)' },
        { label: 'Right Subtree Height', value: '1 (Node 5)' },
        { label: 'Height Difference', value: '|1 - 1| = 0 <= 1 (PASS)', accent: true },
        { label: 'Node 9 Height', value: '2' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Postorder Step 4: Evaluate Leaf Nodes 15 and 7',
    explanation: 'Leaves 15 and 7 in right subtree evaluate to height 1 each with difference 0.',
    activeLine: 12,
    activeIdeaId: 'bottom-up-postorder',
    tree,
    activeVal: 15,
    highlightedVals: [15, 7],
    visitedVals: [4, 5, 9],
    nodeLabels: { 9: 'H=2', 15: 'H=1', 7: 'H=1' },
    variables: { leavesEvaluated: '[15, 7]', height: 1 },
    customCard: {
      title: 'Right Subtree Leaves',
      rows: [
        { label: 'Node 15 Height', value: '1' },
        { label: 'Node 7 Height', value: '1' },
        { label: 'Balance Check', value: 'Both balanced' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Postorder Step 5: Evaluate Parent Node 20',
    explanation: 'Node 20 has left child 15 (H=1) and right child 7 (H=1). Difference |1 - 1| = 0 <= 1. Returns H = 1 + max(1, 1) = 2.',
    activeLine: 14,
    activeIdeaId: 'height-induction-formula',
    tree,
    activeVal: 20,
    targetVal: 20,
    visitedVals: [4, 5, 9, 15, 7],
    nodeLabels: { 9: 'H=2', 20: 'H=2 (Balanced)' },
    variables: { node: 20, leftH: 1, rightH: 1, diff: 0, returnedH: 2 },
    customCard: {
      title: 'Right Subtree Root: Node 20',
      rows: [
        { label: 'Left Subtree Height', value: '1 (Node 15)' },
        { label: 'Right Subtree Height', value: '1 (Node 7)' },
        { label: 'Height Difference', value: '|1 - 1| = 0 <= 1 (PASS)', accent: true },
        { label: 'Node 20 Height', value: '2' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Postorder Step 6: Evaluate Root Node 3',
    explanation: 'Root 3 has left subtree 9 (H=2) and right subtree 20 (H=2). Difference |2 - 2| = 0 <= 1. Tree is balanced!',
    activeLine: 14,
    activeIdeaId: 'balance-definition',
    tree,
    activeVal: 3,
    targetVal: 3,
    visitedVals: [9, 20],
    nodeLabels: { 3: 'Root H=3 (BALANCED)', 9: 'Left H=2', 20: 'Right H=2' },
    variables: { node: 3, leftH: 2, rightH: 2, diff: 0, overallHeight: 3 },
    customCard: {
      title: 'Final Root Evaluation',
      rows: [
        { label: 'Left Child H', value: '2 (Node 9)' },
        { label: 'Right Child H', value: '2 (Node 20)' },
        { label: 'Root Difference', value: '|2 - 2| = 0 <= 1 (PASS)', accent: true },
        { label: 'Tree Status', value: 'Height-Balanced' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Return True: Binary Tree is Height-Balanced',
    explanation: 'checkHeight(root) returned 3 != -1. The tree is verified height-balanced in O(N) time and O(H) space.',
    activeLine: 18,
    activeIdeaId: 'avoid-quadratic-cost',
    tree,
    activeVal: 3,
    highlightedVals: [3, 9, 20, 4, 5, 15, 7],
    nodeLabels: { 3: 'BALANCED' },
    variables: { isBalanced: 'TRUE', timeComplexity: 'O(N)', spaceComplexity: 'O(H)' },
    customCard: {
      title: 'Verification Complete',
      rows: [
        { label: 'Result', value: 'TRUE (Balanced)', accent: true },
        { label: 'Time Complexity', value: 'O(N) - single bottom-up pass' },
        { label: 'Space Complexity', value: 'O(H) recursion stack' },
        { label: 'Nodes Checked', value: 'All 7 nodes verified' }
      ]
    }
  }
];

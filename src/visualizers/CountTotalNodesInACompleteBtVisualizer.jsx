export const rendererType = 'tree';

export const meta = {
  title: 'Count Nodes in a Complete Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O((log N)^2)',
  spaceComplexity: 'O(log N) recursion stack',
  description: 'Counts the total number of nodes in a complete binary tree in sub-linear O((log N)^2) time by comparing the left and right boundary depths. If the heights match, the subtree is perfect and contains exactly (2^h - 1) nodes in O(log N) calculation.'
};

export const ideaMap = {
  title: 'Complete Binary Tree Counting Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Boundary Height Measurement',
      detail: 'Traverse left pointers to compute leftHeight (lh), and right pointers to compute rightHeight (rh) in O(log N).'
    },
    {
      id: 'step2',
      label: 'Perfect Subtree Shortcut (lh == rh)',
      detail: 'If lh == rh, the tree is completely filled on all levels: return (1 << lh) - 1 nodes without inspecting internal nodes.'
    },
    {
      id: 'step3',
      label: 'Imperfect Subtree Fallback (lh != rh)',
      detail: 'If lh != rh, recurse on child subtrees: 1 + countNodes(left) + countNodes(right).'
    },
    {
      id: 'step4',
      label: 'O((log N)^2) Sub-Linear Runtime',
      detail: 'At each tree level, at most one child is imperfect, maintaining a total runtime of at most O(height^2) = O((log N)^2).'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Count Total Nodes in a Complete Binary Tree (LeetCode 222)
// Time Complexity: O((log N)^2) | Space Complexity: O(log N)
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
private:
    int findLeftHeight(TreeNode* node) {
        int h = 0;
        while (node) {
            h++;
            node = node->left;
        }
        return h;
    }

    int findRightHeight(TreeNode* node) {
        int h = 0;
        while (node) {
            h++;
            node = node->right;
        }
        return h;
    }

public:
    int countNodes(TreeNode* root) {
        if (!root) return 0;

        int lh = findLeftHeight(root);
        int rh = findRightHeight(root);

        // If heights match, perfect binary tree formula: (2^h) - 1
        if (lh == rh) {
            return (1 << lh) - 1;
        }

        return 1 + countNodes(root->left) + countNodes(root->right);
    }
};`,
  java: `// Java: Count Total Nodes in a Complete Binary Tree (LeetCode 222)
// Time Complexity: O((log N)^2) | Space Complexity: O(log N)
class Solution {
    private int getLeftHeight(TreeNode node) {
        int h = 0;
        while (node != null) {
            h++;
            node = node.left;
        }
        return h;
    }

    private int getRightHeight(TreeNode node) {
        int h = 0;
        while (node != null) {
            h++;
            node = node.right;
        }
        return h;
    }

    public int countNodes(TreeNode root) {
        if (root == null) return 0;

        int lh = getLeftHeight(root);
        int rh = getRightHeight(root);

        if (lh == rh) {
            return (1 << lh) - 1;
        }

        return 1 + countNodes(root.left) + countNodes(root.right);
    }
}`,
  python: `# Python: Count Total Nodes in a Complete Binary Tree (LeetCode 222)
# Time Complexity: O((log N)^2) | Space Complexity: O(log N)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def countNodes(self, root: TreeNode | None) -> int:
        if not root:
            return 0

        def get_left_height(node):
            h = 0
            while node:
                h += 1
                node = node.left
            return h

        def get_right_height(node):
            h = 0
            while node:
                h += 1
                node = node.right
            return h

        lh = get_left_height(root)
        rh = get_right_height(root)

        # If boundary heights match -> Perfect tree shortcut
        if lh == rh:
            return (1 << lh) - 1

        return 1 + self.countNodes(root.left) + self.countNodes(root.right)`,
  javascript: `// JavaScript: Count Total Nodes in a Complete Binary Tree (LeetCode 222)
// Time Complexity: O((log N)^2) | Space Complexity: O(log N)
function countNodes(root) {
  if (!root) return 0;

  function getLeftHeight(node) {
    let h = 0;
    while (node) {
      h++;
      node = node.left;
    }
    return h;
  }

  function getRightHeight(node) {
    let h = 0;
    while (node) {
      h++;
      node = node.right;
    }
    return h;
  }

  const lh = getLeftHeight(root);
  const rh = getRightHeight(root);

  if (lh === rh) {
    return (1 << lh) - 1;
  }

  return 1 + countNodes(root.left) + countNodes(root.right);
}`
};

const sampleTree = {
  val: 1,
  left: {
    val: 2,
    left: { val: 4, left: null, right: null },
    right: { val: 5, left: null, right: null }
  },
  right: {
    val: 3,
    left: { val: 6, left: null, right: null },
    right: null
  }
};

export const steps = [
  {
    phase: 'ROOT_CHECK',
    title: '1. Root 1: Left Height = 3, Right Height = 2 (lh != rh)',
    tree: sampleTree,
    activeVal: 1,
    visitedVals: [1],
    nodeLabels: { 1: 'lh:3, rh:2' },
    customCard: {
      title: 'Root Boundary Heights Check',
      rows: [
        { label: 'Current Node', value: 'Root 1', accent: true },
        { label: 'Left Boundary Path', value: '1 -> 2 -> 4 (lh = 3)' },
        { label: 'Right Boundary Path', value: '1 -> 3 -> null (rh = 2)' },
        { label: 'Comparison', value: 'lh (3) != rh (2) -> Not Perfect' },
        { label: 'Action', value: 'Recurse: 1 + count(left) + count(right)' }
      ]
    },
    variables: {
      activeNode: 1,
      leftHeight: 3,
      rightHeight: 2,
      isPerfect: false,
      runningTotal: 'Pending...'
    },
    metrics: [
      { label: 'Left Height', value: '3' },
      { label: 'Right Height', value: '2' },
      { label: 'Subtree Type', value: 'Imperfect', highlight: true }
    ],
    explain: 'Leftmost descent gives height 3 (1->2->4). Rightmost descent gives height 2 (1->3). Since lh != rh, the tree is not perfect. Recurse into left and right subtrees.'
  },
  {
    phase: 'LEFT_SUBTREE_PERFECT',
    title: '2. Left Subtree at Node 2: lh = 2, rh = 2 &rarr; Perfect! (2^2 - 1 = 3)',
    tree: sampleTree,
    activeVal: 2,
    visitedVals: [1, 2],
    nodeLabels: { 1: 'Root', 2: 'lh:2, rh:2 (Perfect: 3)' },
    customCard: {
      title: 'Perfect Subtree Shortcut Triggered',
      rows: [
        { label: 'Current Node', value: 'Node 2', accent: true },
        { label: 'Left Height (lh)', value: '2 -> 4 (h = 2)' },
        { label: 'Right Height (rh)', value: '2 -> 5 (h = 2)' },
        { label: 'Formula Applied', value: '(1 << 2) - 1 = 3 nodes', accent: true },
        { label: 'Nodes Counted', value: 'Subtree {2, 4, 5} resolved in O(log N)!' }
      ]
    },
    variables: {
      activeNode: 2,
      leftHeight: 2,
      rightHeight: 2,
      isPerfect: true,
      subtreeNodeCount: 3
    },
    metrics: [
      { label: 'Left Height', value: '2' },
      { label: 'Right Height', value: '2' },
      { label: 'Shortcut', value: '3 nodes (2^2 - 1)', highlight: true }
    ],
    explain: 'At Node 2, left height (2->4) equals right height (2->5) = 2. Node 2 is the root of a perfect binary tree! We instantly count (2^2 - 1) = 3 nodes without traversing further.'
  },
  {
    phase: 'RIGHT_SUBTREE_CHECK',
    title: '3. Right Subtree at Node 3: lh = 2, rh = 1 &rarr; Resolves to 2 Nodes',
    tree: sampleTree,
    activeVal: 3,
    visitedVals: [1, 2, 3],
    nodeLabels: { 1: 'Root', 2: 'Subtree: 3', 3: 'Subtree: 2' },
    customCard: {
      title: 'Right Subtree Evaluation',
      rows: [
        { label: 'Current Node', value: 'Node 3', accent: true },
        { label: 'Left Child', value: 'Node 6 (Leaf -> 1 node)' },
        { label: 'Right Child', value: 'null (0 nodes)' },
        { label: 'Right Subtree Total', value: '1 (Node 3) + 1 (Node 6) = 2 nodes' }
      ]
    },
    variables: {
      activeNode: 3,
      leftHeight: 2,
      rightHeight: 1,
      isPerfect: false,
      subtreeNodeCount: 2
    },
    metrics: [
      { label: 'Left Height', value: '2' },
      { label: 'Right Height', value: '1' },
      { label: 'Right Total', value: '2 nodes', highlight: true }
    ],
    explain: 'At Node 3, left child 6 is a single leaf (1 node) and right child is null (0 nodes). Subtree at 3 yields 1 + 1 + 0 = 2 nodes.'
  },
  {
    phase: 'COMPLETE',
    title: '4. Total Node Count: 1 (Root) + 3 (Left) + 2 (Right) = 6 Nodes!',
    tree: sampleTree,
    activeVal: null,
    visitedVals: [1, 2, 3, 4, 5, 6],
    nodeLabels: { 1: 'Total: 6', 2: 'Left: 3', 3: 'Right: 2', 4: 'Leaf', 5: 'Leaf', 6: 'Leaf' },
    customCard: {
      title: 'Complete Tree Count Summary',
      rows: [
        { label: 'Root Contribution', value: '1 node' },
        { label: 'Left Subtree (Perfect)', value: '3 nodes (via 2^2 - 1 formula)' },
        { label: 'Right Subtree', value: '2 nodes' },
        { label: 'Total Complete Tree Nodes', value: '1 + 3 + 2 = 6 Nodes', accent: true },
        { label: 'Time Complexity', value: 'O((log N)^2) strictly sub-linear' }
      ]
    },
    variables: {
      status: 'Count Completed',
      totalCount: 6,
      rootContrib: 1,
      leftContrib: 3,
      rightContrib: 2
    },
    metrics: [
      { label: 'Total Nodes', value: '6', highlight: true },
      { label: 'Formula', value: '1 + 3 + 2 = 6' },
      { label: 'Complexity', value: 'O((log N)^2)' }
    ],
    explain: 'Summing all partitions: 1 for root + 3 from the perfect left subtree + 2 from the right subtree = 6 total nodes. Calculated in optimal sub-linear O((log N)^2) time.'
  }
];

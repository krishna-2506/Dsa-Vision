export const rendererType = 'tree';

export const meta = {
  title: 'Lowest Common Ancestor in Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) recursion stack',
  description: 'Finds the lowest common ancestor (LCA) node of two given nodes p and q in a binary tree where both target branches converge.'
};

export const ideaMap = {
  title: 'Lowest Common Ancestor Recursive Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Identity / Null Base Case',
      detail: 'If root is null or root matches p or q, immediately return root.'
    },
    {
      id: 'step2',
      label: 'Explore Left & Right Branches',
      detail: 'Recursively search left subtree (lowestCommonAncestor(root.left, p, q)) and right subtree.'
    },
    {
      id: 'step3',
      label: 'Convergence Decision',
      detail: 'If both left and right recursive calls return non-null, current node is the LCA.'
    },
    {
      id: 'step4',
      label: 'Bubble Non-Null Child',
      detail: 'If only one subtree found a target, return that non-null child pointer upwards.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Lowest Common Ancestor in Binary Tree
// Time Complexity: O(N) | Space Complexity: O(H)
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        // Base case: null or found target node
        if (root == nullptr || root == p || root == q) {
            return root;
        }

        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);

        // If both subtrees return non-null, root is the convergence point (LCA)
        if (left != nullptr && right != nullptr) {
            return root;
        }

        return (left != nullptr) ? left : right;
    }
};`,
  java: `// Java: Lowest Common Ancestor in Binary Tree
// Time Complexity: O(N) | Space Complexity: O(H)
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) {
            return root;
        }

        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        if (left != null && right != null) {
            return root;
        }

        return (left != null) ? left : right;
    }
}`,
  python: `# Python 3: Lowest Common Ancestor in Binary Tree
# Time Complexity: O(N) | Space Complexity: O(H)
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
        if not root or root == p or root == q:
            return root

        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)

        if left and right:
            return root

        return left if left else right`,
  javascript: `// JavaScript: Lowest Common Ancestor in Binary Tree
// Time Complexity: O(N) | Space Complexity: O(H)
function lowestCommonAncestor(root, p, q) {
    if (!root || root === p || root === q) {
        return root;
    }

    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    if (left && right) {
        return root;
    }

    return left ? left : right;
}`
};

const treeRoot = {
  val: 3,
  left: {
    val: 5,
    left: { val: 6, left: null, right: null },
    right: {
      val: 2,
      left: { val: 7, left: null, right: null },
      right: { val: 4, left: null, right: null }
    }
  },
  right: {
    val: 1,
    left: { val: 0, left: null, right: null },
    right: { val: 8, left: null, right: null }
  }
};

export const steps = [
  {
    phase: 'INITIALIZE',
    title: 'Initialize LCA Search: Find LCA of Node(5) and Node(1)',
    activeVal: 3,
    tree: treeRoot,
    visitedVals: [],
    nodeLabels: { 3: 'ROOT', 5: 'TARGET P', 1: 'TARGET Q' },
    customCard: {
      title: 'LCA Problem Invariant',
      rows: [
        { label: 'Target P', value: 'Node(5)' },
        { label: 'Target Q', value: 'Node(1)' },
        { label: 'Base Case Check', value: 'Root 3 != 5 and Root 3 != 1 -> Search both subtrees', accent: true },
        { label: 'Next Branch', value: 'Recurse into left subtree: lowestCommonAncestor(3.left, 5, 1)' }
      ]
    },
    variables: {
      currNode: 3,
      p: 5,
      q: 1,
      'leftResult': 'Pending...',
      'rightResult': 'Pending...',
      callStackDepth: 1
    },
    metrics: {
      lcaFound: false,
      nodesExamined: 1,
      currentBranch: 'Root (3)'
    },
    explain: 'Initiate search at Root 3 for targets p = 5 and q = 1. Root 3 is neither null nor equal to p or q. Recurse into left child (5).'
  },
  {
    phase: 'FOUND_TARGET_P',
    title: 'Visit Node 5: Base Case Match (root == p)!',
    activeVal: 5,
    tree: treeRoot,
    visitedVals: [5],
    nodeLabels: { 3: 'ROOT', 5: 'FOUND (p=5)', 1: 'TARGET Q' },
    customCard: {
      title: 'Target P Encountered',
      rows: [
        { label: 'Identity Check', value: 'currNode (5) === p (5) -> TRUE', accent: true },
        { label: 'Return Action', value: 'Return Node(5) up to parent caller frame (Node 3)' },
        { label: 'Optimization', value: 'No need to search deeper beneath Node 5; return immediately' }
      ]
    },
    variables: {
      currNode: 5,
      p: 5,
      'root == p': 'true',
      returning: 'Node(5)',
      callStackDepth: 2
    },
    metrics: {
      lcaFound: false,
      nodesExamined: 2,
      currentBranch: 'Left Subtree (5)'
    },
    explain: 'At Node 5, root == p is true. The algorithm immediately returns Node 5 up the call stack to Root 3 without needing to search its children.'
  },
  {
    phase: 'RETURN_TO_ROOT',
    title: 'Back at Root 3: Left Branch Returned Node 5 -> Explore Right Branch',
    activeVal: 3,
    tree: treeRoot,
    visitedVals: [5],
    nodeLabels: { 3: 'ROOT [left=5]', 5: 'FOUND (p=5)', 1: 'TARGET Q' },
    customCard: {
      title: 'Branch Conjunction Progress',
      rows: [
        { label: 'Left Subtree Result', value: 'Node(5) (Non-null!)', accent: true },
        { label: 'Next Branch', value: 'Recurse into right subtree: lowestCommonAncestor(3.right, 5, 1)' },
        { label: 'Potential Convergence', value: 'If right returns non-null, Root 3 is the LCA!' }
      ]
    },
    variables: {
      currNode: 3,
      left: 'Node(5)',
      right: 'Searching...',
      callStackDepth: 1
    },
    metrics: {
      lcaFound: false,
      nodesExamined: 2,
      currentBranch: 'Right Subtree (1)'
    },
    explain: 'Root 3 receives Node 5 from its left branch. Now it initiates recursion on its right child (Node 1).'
  },
  {
    phase: 'FOUND_TARGET_Q',
    title: 'Visit Node 1: Base Case Match (root == q)!',
    activeVal: 1,
    tree: treeRoot,
    visitedVals: [5, 1],
    nodeLabels: { 3: 'ROOT [left=5]', 5: 'FOUND (p=5)', 1: 'FOUND (q=1)' },
    customCard: {
      title: 'Target Q Encountered',
      rows: [
        { label: 'Identity Check', value: 'currNode (1) === q (1) -> TRUE', accent: true },
        { label: 'Return Action', value: 'Return Node(1) up to caller frame (Node 3)' },
        { label: 'Branch Result', value: 'Right branch returns Node(1)' }
      ]
    },
    variables: {
      currNode: 1,
      q: 1,
      'root == q': 'true',
      returning: 'Node(1)',
      callStackDepth: 2
    },
    metrics: {
      lcaFound: false,
      nodesExamined: 3,
      currentBranch: 'Right Subtree (1)'
    },
    explain: 'At Node 1, root == q is true. The algorithm immediately returns Node 1 to Root 3.'
  },
  {
    phase: 'CONVERGENCE_DETECTED',
    title: 'At Root 3: Both Left (5) and Right (1) are Non-Null -> Root 3 is the LCA!',
    activeVal: 3,
    tree: treeRoot,
    visitedVals: [3, 5, 1],
    nodeLabels: { 3: 'LCA (CONVERGENCE)', 5: 'P (CHILD)', 1: 'Q (CHILD)' },
    customCard: {
      title: 'Convergence Invariant Satisfied',
      rows: [
        { label: 'left != null', value: 'TRUE (left = Node 5)' },
        { label: 'right != null', value: 'TRUE (right = Node 1)' },
        { label: 'LCA Theorem', value: 'When both subtrees return non-null, root is the Lowest Common Ancestor!', accent: true },
        { label: 'Decision', value: 'return root (Node 3)' }
      ]
    },
    variables: {
      currNode: 3,
      left: 'Node(5)',
      right: 'Node(1)',
      'left != null && right != null': 'true',
      LCA: 'Node(3)'
    },
    metrics: {
      lcaFound: true,
      nodesExamined: 3,
      finalLCA: 3
    },
    explain: 'Both left and right recursive calls returned non-null pointers (5 and 1). This confirms that p and q lie in opposing subtrees of Node 3. Therefore, Node 3 is the Lowest Common Ancestor!'
  },
  {
    phase: 'COMPLETE',
    title: 'LCA Computation Complete: Result = Node(3)',
    activeVal: 3,
    tree: treeRoot,
    visitedVals: [3, 5, 1],
    nodeLabels: { 3: 'LCA = 3', 5: 'p = 5', 1: 'q = 1' },
    customCard: {
      title: 'Final Ancestor Summary',
      rows: [
        { label: 'Lowest Common Ancestor', value: 'Node(3)', accent: true },
        { label: 'Time Complexity', value: 'O(N) - single recursive traversal' },
        { label: 'Space Complexity', value: 'O(H) - call stack height' }
      ]
    },
    variables: {
      resultLCA: 3,
      p: 5,
      q: 1,
      status: 'VERIFIED'
    },
    metrics: {
      lcaFound: true,
      nodesExamined: 3,
      finalLCA: 3
    },
    explain: 'LCA search has completed successfully. Node 3 is returned as the lowest common ancestor of nodes 5 and 1.'
  }
];

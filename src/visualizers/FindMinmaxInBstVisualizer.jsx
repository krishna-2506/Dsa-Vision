export const rendererType = 'tree';

export const meta = {
  title: 'Find Min and Max in BST',
  category: 'Binary Search Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(H)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the minimum and maximum values in a Binary Search Tree by traversing strictly leftwards to find the minimum and strictly rightwards to find the maximum in O(H) time.'
};

export const ideaMap = [
  {
    id: 'leftmost-min-invariant',
    title: 'Leftmost Minimum Invariant',
    description: 'Because all values to the left of any node are smaller, the node with no left child reached by continually branching left is the minimum element in the subtree.'
  },
  {
    id: 'rightmost-max-invariant',
    title: 'Rightmost Maximum Invariant',
    description: 'Because all values to the right of any node are greater, the node with no right child reached by continually branching right is the maximum element in the subtree.'
  },
  {
    id: 'iterative-constant-space',
    title: 'O(1) Iterative Traversal',
    description: 'No recursion stack or backtracking is required. Simple pointer advancing while(curr.left) and while(curr.right) achieves O(1) space.'
  },
  {
    id: 'height-bound-efficiency',
    title: 'Height Bound O(H)',
    description: 'Path length is strictly bounded by the tree height H. In a balanced BST, Min and Max are located in O(log N) steps.'
  },
  {
    id: 'leaf-independence',
    title: 'Non-Leaf Extremum Property',
    description: 'The minimum node does not need to be a leaf; it only needs to have no left child (it may still possess a right subtree).'
  }
];

export const solutions = {
  cpp: `// C++: Find Min and Max in BST
// Time: O(H) | Space: O(1)
class Solution {
public:
    int findMin(TreeNode* root) {
        if (!root) return -1;
        while (root->left != nullptr) {
            root = root->left;
        }
        return root->val;
    }

    int findMax(TreeNode* root) {
        if (!root) return -1;
        while (root->right != nullptr) {
            root = root->right;
        }
        return root->val;
    }
};`,
  java: `// Java: Find Min and Max in BST
class Solution {
    public int findMin(TreeNode root) {
        if (root == null) return -1;
        while (root.left != null) {
            root = root.left;
        }
        return root.val;
    }

    public int findMax(TreeNode root) {
        if (root == null) return -1;
        while (root.right != null) {
            root = root.right;
        }
        return root.val;
    }
}`,
  python: `# Python 3: Find Min and Max in BST
class Solution:
    def findMin(self, root: Optional[TreeNode]) -> int:
        if not root:
            return -1
        curr = root
        while curr.left:
            curr = curr.left
        return curr.val

    def findMax(self, root: Optional[TreeNode]) -> int:
        if not root:
            return -1
        curr = root
        while curr.right:
            curr = curr.right
        return curr.val`,
  javascript: `// JavaScript: Find Min and Max in BST
function findMin(root) {
    if (!root) return -1;
    let curr = root;
    while (curr.left !== null) {
        curr = curr.left;
    }
    return curr.val;
}

function findMax(root) {
    if (!root) return -1;
    let curr = root;
    while (curr.right !== null) {
        curr = curr.right;
    }
    return curr.val;
}`
};

const treeData = {
  val: 20,
  left: {
    val: 10,
    left: { val: 5, left: { val: 2 }, right: { val: 8 } },
    right: { val: 15 }
  },
  right: {
    val: 30,
    left: { val: 25 },
    right: { val: 40, right: { val: 50 } }
  }
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Initialize Min & Max Search: Root = 20',
    explanation: 'BST with 9 nodes. To find minimum, branch strictly left. To find maximum, branch strictly right.',
    activeLine: 6,
    activeIdeaId: 'leftmost-min-invariant',
    tree: treeData,
    activeVal: 20,
    nodeLabels: { 20: 'Root' },
    variables: { root: 20, minSearch: 'Pending', maxSearch: 'Pending' },
    customCard: {
      title: 'Problem Setup',
      rows: [
        { label: 'Root Value', value: '20' },
        { label: 'Min Strategy', value: 'Traverse left pointers until curr.left == null' },
        { label: 'Max Strategy', value: 'Traverse right pointers until curr.right == null' },
        { label: 'Auxiliary Space', value: 'O(1) - single reference pointer' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Find Min Step 1: Branch Left to Node 10',
    explanation: 'curr = root (20). curr.left exists (Node 10). Advance curr = curr.left. All nodes >= 20 are pruned from consideration.',
    activeLine: 9,
    activeIdeaId: 'leftmost-min-invariant',
    tree: treeData,
    activeVal: 10,
    visitedVals: [20],
    nodeLabels: { 20: 'Pruned', 10: 'curr.left' },
    variables: { phase: 'FIND_MIN', curr: 10, 'curr.left': 5 },
    customCard: {
      title: 'Min Traversal Step 1',
      rows: [
        { label: 'Current Node', value: '10' },
        { label: 'Left Child Exists?', value: 'Yes (Node 5)' },
        { label: 'Action', value: 'curr = curr.left' },
        { label: 'Pruned Candidates', value: 'Right subtree {20, 25, 30, 40, 50}' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Find Min Step 2: Branch Left to Node 5',
    explanation: 'curr = Node 10. curr.left exists (Node 5). Advance curr = curr.left. Values in right subtree of 10 ({15}) are eliminated.',
    activeLine: 9,
    activeIdeaId: 'leftmost-min-invariant',
    tree: treeData,
    activeVal: 5,
    visitedVals: [20, 10],
    nodeLabels: { 10: 'Pruned', 5: 'curr.left' },
    variables: { phase: 'FIND_MIN', curr: 5, 'curr.left': 2 },
    customCard: {
      title: 'Min Traversal Step 2',
      rows: [
        { label: 'Current Node', value: '5' },
        { label: 'Left Child Exists?', value: 'Yes (Node 2)' },
        { label: 'Action', value: 'curr = curr.left' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Find Min Step 3: Reach Node 2 (curr.left == null)',
    explanation: 'curr = Node 5. Advance to curr.left (Node 2). At Node 2, curr.left is null! Global Minimum is 2.',
    activeLine: 12,
    activeIdeaId: 'leftmost-min-invariant',
    tree: treeData,
    activeVal: 2,
    targetVal: 2,
    visitedVals: [20, 10, 5],
    nodeLabels: { 2: 'MIN = 2' },
    variables: { phase: 'FIND_MIN', curr: 2, 'curr.left': 'null', minFound: 2 },
    customCard: {
      title: 'Minimum Found',
      rows: [
        { label: 'Terminating Node', value: 'Node 2 (Leftmost node in BST)', accent: true },
        { label: 'curr.left', value: 'null (No smaller value can exist)' },
        { label: 'Global Minimum', value: '2' },
        { label: 'Steps Taken', value: '3 pointer hops' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Find Max Step 1: Start at Root 20 and Branch Right',
    explanation: 'Reset curr = root (20) to find maximum. curr.right exists (Node 30). Advance curr = curr.right.',
    activeLine: 17,
    activeIdeaId: 'rightmost-max-invariant',
    tree: treeData,
    activeVal: 30,
    visitedVals: [20],
    highlightedVals: [2],
    nodeLabels: { 2: 'MIN=2', 20: 'Pruned', 30: 'curr.right' },
    variables: { phase: 'FIND_MAX', curr: 30, 'curr.right': 40 },
    customCard: {
      title: 'Max Traversal Step 1',
      rows: [
        { label: 'Current Node', value: '30' },
        { label: 'Right Child Exists?', value: 'Yes (Node 40)' },
        { label: 'Pruned Candidates', value: 'All left nodes <= 20 eliminated' },
        { label: 'Action', value: 'curr = curr.right' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Find Max Step 2: Branch Right to Node 40',
    explanation: 'curr = Node 30. curr.right exists (Node 40). Advance curr = curr.right. Left child {25} is pruned.',
    activeLine: 18,
    activeIdeaId: 'rightmost-max-invariant',
    tree: treeData,
    activeVal: 40,
    visitedVals: [20, 30],
    highlightedVals: [2],
    nodeLabels: { 2: 'MIN=2', 30: 'Pruned', 40: 'curr.right' },
    variables: { phase: 'FIND_MAX', curr: 40, 'curr.right': 50 },
    customCard: {
      title: 'Max Traversal Step 2',
      rows: [
        { label: 'Current Node', value: '40' },
        { label: 'Right Child Exists?', value: 'Yes (Node 50)' },
        { label: 'Action', value: 'curr = curr.right' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Find Max Step 3: Reach Node 50 (curr.right == null)',
    explanation: 'curr = Node 40. Advance to curr.right (Node 50). At Node 50, curr.right is null! Global Maximum is 50.',
    activeLine: 21,
    activeIdeaId: 'rightmost-max-invariant',
    tree: treeData,
    activeVal: 50,
    targetVal: 50,
    visitedVals: [20, 30, 40],
    highlightedVals: [2],
    nodeLabels: { 2: 'MIN=2', 50: 'MAX=50' },
    variables: { phase: 'FIND_MAX', curr: 50, 'curr.right': 'null', maxFound: 50 },
    customCard: {
      title: 'Maximum Found',
      rows: [
        { label: 'Terminating Node', value: 'Node 50 (Rightmost node in BST)', accent: true },
        { label: 'curr.right', value: 'null (No greater value can exist)' },
        { label: 'Global Maximum', value: '50' },
        { label: 'Steps Taken', value: '3 pointer hops' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Result Summary: Min = 2, Max = 50',
    explanation: 'Both extrema identified in O(H) operations with O(1) auxiliary memory. Min = 2 (leftmost), Max = 50 (rightmost).',
    activeLine: 23,
    activeIdeaId: 'height-bound-efficiency',
    tree: treeData,
    activeVal: 20,
    highlightedVals: [2, 50],
    nodeLabels: { 2: 'MIN = 2', 50: 'MAX = 50', 20: 'Root' },
    variables: { minVal: 2, maxVal: 50, timeComplexity: 'O(H)', spaceComplexity: 'O(1)' },
    customCard: {
      title: 'Search Summary',
      rows: [
        { label: 'Minimum Value', value: '2', accent: true },
        { label: 'Maximum Value', value: '50', accent: true },
        { label: 'Time Complexity', value: 'O(H) - at most depth of tree' },
        { label: 'Space Complexity', value: 'O(1) - in-place iterative walk' }
      ]
    }
  }
];

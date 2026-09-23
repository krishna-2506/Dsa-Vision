export const rendererType = 'tree';

export const meta = {
  title: 'Inorder Successor & Predecessor in BST',
  category: 'Binary Search Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(H)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the immediate in-order predecessor (largest value smaller than key) and successor (smallest value greater than key) in a BST using binary search candidate caching in O(H) time.'
};

export const ideaMap = [
  {
    id: 'inorder-neighbors',
    title: 'Inorder Predecessor & Successor Definitions',
    description: 'The predecessor is the immediate previous value in sorted order; the successor is the immediate next value in sorted order.'
  },
  {
    id: 'successor-caching',
    title: 'Successor Candidate Caching',
    description: 'When branching left (key < curr.val), the current node is larger than key and becomes our best candidate successor so far.'
  },
  {
    id: 'predecessor-caching',
    title: 'Predecessor Candidate Caching',
    description: 'When branching right (key > curr.val), the current node is smaller than key and becomes our best candidate predecessor so far.'
  },
  {
    id: 'no-inorder-array-needed',
    title: 'Direct Navigation O(H)',
    description: 'Finds both neighbors in O(H) time without generating an O(N) array or traversing the entire tree.'
  },
  {
    id: 'boundary-extremities',
    title: 'Boundary & Missing Neighbors',
    description: 'The global minimum has no predecessor (returns null), and the global maximum has no successor (returns null).'
  }
];

export const solutions = {
  cpp: `// C++: Optimal Inorder Successor and Predecessor
// Time: O(H) | Space: O(1)
class Solution {
public:
    TreeNode* inorderSuccessor(TreeNode* root, TreeNode* p) {
        TreeNode* successor = nullptr;
        while (root != nullptr) {
            if (p->val < root->val) {
                successor = root;   // Potential successor
                root = root->left;  // Search for smaller valid candidate
            } else {
                root = root->right;
            }
        }
        return successor;
    }

    TreeNode* inorderPredecessor(TreeNode* root, TreeNode* p) {
        TreeNode* predecessor = nullptr;
        while (root != nullptr) {
            if (p->val > root->val) {
                predecessor = root;  // Potential predecessor
                root = root->right; // Search for larger valid candidate
            } else {
                root = root->left;
            }
        }
        return predecessor;
    }
};`,
  java: `// Java: Optimal Inorder Successor and Predecessor
class Solution {
    public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {
        TreeNode successor = null;
        while (root != null) {
            if (p.val < root.val) {
                successor = root;
                root = root.left;
            } else {
                root = root.right;
            }
        }
        return successor;
    }

    public TreeNode inorderPredecessor(TreeNode root, TreeNode p) {
        TreeNode predecessor = null;
        while (root != null) {
            if (p.val > root.val) {
                predecessor = root;
                root = root.right;
            } else {
                root = root.left;
            }
        }
        return predecessor;
    }
}`,
  python: `# Python 3: Optimal Inorder Successor and Predecessor
class Solution:
    def inorderSuccessor(self, root: TreeNode, p: TreeNode) -> Optional[TreeNode]:
        successor = None
        curr = root
        while curr:
            if p.val < curr.val:
                successor = curr
                curr = curr.left
            else:
                curr = curr.right
        return successor

    def inorderPredecessor(self, root: TreeNode, p: TreeNode) -> Optional[TreeNode]:
        predecessor = None
        curr = root
        while curr:
            if p.val > curr.val:
                predecessor = curr
                curr = curr.right
            else:
                curr = curr.left
        return predecessor`,
  javascript: `// JavaScript: Optimal Inorder Successor and Predecessor
function inorderSuccessor(root, p) {
    let successor = null;
    let curr = root;
    while (curr !== null) {
        if (p.val < curr.val) {
            successor = curr;
            curr = curr.left;
        } else {
            curr = curr.right;
        }
    }
    return successor;
}

function inorderPredecessor(root, p) {
    let predecessor = null;
    let curr = root;
    while (curr !== null) {
        if (p.val > curr.val) {
            predecessor = curr;
            curr = curr.right;
        } else {
            curr = curr.left;
        }
    }
    return predecessor;
}`
};

const tree = {
  val: 8,
  left: {
    val: 4,
    left: { val: 2 },
    right: { val: 6, left: { val: 5 } }
  },
  right: {
    val: 12,
    left: { val: 10 },
    right: { val: 14 }
  }
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Problem Setup: Find Neighbors for Key = 6',
    explanation: 'BST with sorted elements [2, 4, 5, 6, 8, 10, 12, 14]. For Key = 6, we seek the predecessor (5) and successor (8).',
    activeLine: 6,
    activeIdeaId: 'inorder-neighbors',
    tree,
    activeVal: 6,
    targetVal: 6,
    nodeLabels: { 6: 'Target Key = 6' },
    traversal: [2, 4, 5, 6, 8, 10, 12, 14],
    traversalLabel: 'Sorted Inorder Sequence',
    variables: { targetKey: 6, predecessor: 'null', successor: 'null' },
    customCard: {
      title: 'Target & Goals',
      rows: [
        { label: 'Target Node', value: 'Node 6' },
        { label: 'Expected Predecessor', value: '5 (Immediate predecessor in sorted order)' },
        { label: 'Expected Successor', value: '8 (Immediate successor in sorted order)' },
        { label: 'Strategy', value: 'Binary search candidate caching in O(H)' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Successor Phase: Start at Root 8 (6 < 8)',
    explanation: 'curr = 8. Since 6 < 8, Node 8 is strictly greater than 6. Node 8 is our first candidate successor! Cache succ = 8, branch left to 4.',
    activeLine: 9,
    activeIdeaId: 'successor-caching',
    tree,
    activeVal: 8,
    highlightedVals: [8],
    nodeLabels: { 8: 'succ candidate = 8', 6: 'Target 6' },
    traversal: [2, 4, 5, 6, 8, 10, 12, 14],
    variables: { phase: 'FIND_SUCCESSOR', curr: 8, 'succ candidate': 8, branch: 'Left' },
    customCard: {
      title: 'Successor Search: Root',
      rows: [
        { label: 'Current Node', value: '8' },
        { label: 'Condition', value: '6 < 8 (curr is greater than target)' },
        { label: 'Candidate Updated', value: 'successor = 8', accent: true },
        { label: 'Next Direction', value: 'curr = curr.left (Look for a closer successor)' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Successor Phase: At Node 4 (6 > 4)',
    explanation: 'curr = 4. Since 6 > 4, Node 4 is smaller than target and cannot be a successor. Branch right to Node 6 without updating successor.',
    activeLine: 12,
    activeIdeaId: 'successor-caching',
    tree,
    activeVal: 4,
    visitedVals: [8],
    highlightedVals: [8],
    nodeLabels: { 8: 'succ = 8', 4: 'Too small', 6: 'Target 6' },
    traversal: [2, 4, 5, 6, 8, 10, 12, 14],
    variables: { phase: 'FIND_SUCCESSOR', curr: 4, 'succ candidate': 8, branch: 'Right' },
    customCard: {
      title: 'Successor Search: Node 4',
      rows: [
        { label: 'Current Node', value: '4' },
        { label: 'Condition', value: '6 > 4 (curr is smaller than target)' },
        { label: 'Candidate Retained', value: 'successor remains 8' },
        { label: 'Next Direction', value: 'curr = curr.right' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Successor Phase: At Node 6 (Target Reached)',
    explanation: 'curr = 6. 6 is not strictly greater than 6. Branch right (null). Successor search ends. Successor = 8.',
    activeLine: 13,
    activeIdeaId: 'successor-caching',
    tree,
    activeVal: 6,
    targetVal: 8,
    visitedVals: [4],
    highlightedVals: [8],
    nodeLabels: { 8: 'SUCCESSOR = 8', 6: 'Target' },
    traversal: [2, 4, 5, 6, 8, 10, 12, 14],
    variables: { phase: 'SUCCESSOR_FOUND', finalSuccessor: 8 },
    customCard: {
      title: 'Successor Found',
      rows: [
        { label: 'Final Successor', value: 'Node 8', accent: true },
        { label: 'Sorted Context', value: '6 followed by 8' },
        { label: 'Status', value: 'Successor resolved in 3 steps' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Predecessor Phase: Start at Root 8 (6 < 8)',
    explanation: 'Reset curr = 8. For predecessor, we need values strictly smaller than 6. 8 is too large, so branch left to 4.',
    activeLine: 20,
    activeIdeaId: 'predecessor-caching',
    tree,
    activeVal: 8,
    highlightedVals: [8],
    nodeLabels: { 8: 'succ=8 (Too big)', 6: 'Target 6' },
    traversal: [2, 4, 5, 6, 8, 10, 12, 14],
    variables: { phase: 'FIND_PREDECESSOR', curr: 8, 'pred candidate': 'null', branch: 'Left' },
    customCard: {
      title: 'Predecessor Search: Root',
      rows: [
        { label: 'Current Node', value: '8' },
        { label: 'Condition', value: '6 < 8 (curr is greater than target)' },
        { label: 'Candidate', value: 'Cannot be predecessor (too big)' },
        { label: 'Next Direction', value: 'curr = curr.left' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Predecessor Phase: At Node 4 (6 > 4)',
    explanation: 'curr = 4. Since 6 > 4, Node 4 is smaller than target! Candidate predecessor pred = 4. Branch right to 6 to see if a larger smaller value exists.',
    activeLine: 22,
    activeIdeaId: 'predecessor-caching',
    tree,
    activeVal: 4,
    visitedVals: [8],
    highlightedVals: [4, 8],
    nodeLabels: { 8: 'succ=8', 4: 'pred candidate = 4', 6: 'Target 6' },
    traversal: [2, 4, 5, 6, 8, 10, 12, 14],
    variables: { phase: 'FIND_PREDECESSOR', curr: 4, 'pred candidate': 4, branch: 'Right' },
    customCard: {
      title: 'Predecessor Search: Node 4',
      rows: [
        { label: 'Current Node', value: '4' },
        { label: 'Condition', value: '6 > 4 (curr is smaller than target)' },
        { label: 'Candidate Updated', value: 'predecessor = 4', accent: true },
        { label: 'Next Direction', value: 'curr = curr.right (Look for larger predecessor)' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Predecessor Phase: At Node 6, Branch Left to Node 5',
    explanation: 'curr = 6. 6 is not smaller than 6, so branch left to Node 5. At Node 5: 6 > 5! Update pred = 5.',
    activeLine: 22,
    activeIdeaId: 'predecessor-caching',
    tree,
    activeVal: 5,
    targetVal: 5,
    visitedVals: [8, 4, 6],
    highlightedVals: [5, 8],
    nodeLabels: { 5: 'PREDECESSOR = 5', 8: 'SUCCESSOR = 8', 6: 'Target 6' },
    traversal: [2, 4, 5, 6, 8, 10, 12, 14],
    variables: { phase: 'PREDECESSOR_FOUND', finalPredecessor: 5 },
    customCard: {
      title: 'Predecessor Found',
      rows: [
        { label: 'Final Predecessor', value: 'Node 5', accent: true },
        { label: 'Sorted Context', value: '5 immediately precedes 6' },
        { label: 'Status', value: 'Predecessor resolved in 3 steps' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Complete: Predecessor = 5, Target = 6, Successor = 8',
    explanation: 'Both in-order neighbors found via candidate caching in O(H) time and O(1) space.',
    activeLine: 25,
    activeIdeaId: 'no-inorder-array-needed',
    tree,
    activeVal: 6,
    targetVal: 6,
    highlightedVals: [5, 6, 8],
    nodeLabels: { 5: 'PRED: 5', 6: 'TARGET: 6', 8: 'SUCC: 8' },
    traversal: [2, 4, 5, 6, 8, 10, 12, 14],
    variables: { predecessor: 5, target: 6, successor: 8, timeComplexity: 'O(H)', spaceComplexity: 'O(1)' },
    customCard: {
      title: 'Summary of Results',
      rows: [
        { label: 'Inorder Predecessor', value: '5', accent: true },
        { label: 'Target Key', value: '6' },
        { label: 'Inorder Successor', value: '8', accent: true },
        { label: 'Total Comparisons', value: '6 pointer steps total' }
      ]
    }
  }
];

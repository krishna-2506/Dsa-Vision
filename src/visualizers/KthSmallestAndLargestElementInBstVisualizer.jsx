export const rendererType = 'tree';

export const meta = {
  title: 'K-th Smallest and Largest Element in BST',
  category: 'Binary Search Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(H + k)',
  spaceComplexity: 'O(H) Recursion Stack',
  description: 'Finds the k-th smallest and k-th largest elements in a BST by leveraging regular Inorder traversal (Left-Root-Right) and Reverse Inorder traversal (Right-Root-Left) with early termination.'
};

export const ideaMap = [
  {
    id: 'inorder-counting',
    title: 'Inorder Ascending Counting',
    description: 'Standard Inorder traversal visits nodes in strictly increasing numerical order. An incrementing counter stops exactly on the k-th visited node.'
  },
  {
    id: 'reverse-inorder-symmetry',
    title: 'Reverse Inorder Descending Counting',
    description: 'Traversing in Right-Root-Left order visits nodes in strictly decreasing numerical order, finding the k-th largest element directly without pre-counting N.'
  },
  {
    id: 'early-exit-optimization',
    title: 'Early Exit Optimization',
    description: 'Once the counter reaches k, remaining branches are immediately pruned, bounding the time complexity to O(H + k).'
  },
  {
    id: 'size-complement-property',
    title: 'Rank Duality',
    description: 'In a BST of size N, the k-th largest element is mathematically equivalent to the (N - k + 1)-th smallest element.'
  },
  {
    id: 'space-complexity',
    title: 'Auxiliary Memory Bounds',
    description: 'Recursive traversal requires O(H) call stack space. Morris traversal can optionally achieve O(1) auxiliary space.'
  }
];

export const solutions = {
  cpp: `// C++: K-th Smallest and Largest in BST
// Time: O(H + k) | Space: O(H)
class Solution {
    void inorderSmallest(TreeNode* root, int& k, int& ans) {
        if (!root || ans != -1) return;
        inorderSmallest(root->left, k, ans);
        if (--k == 0) {
            ans = root->val;
            return;
        }
        inorderSmallest(root->right, k, ans);
    }

    void reverseInorderLargest(TreeNode* root, int& k, int& ans) {
        if (!root || ans != -1) return;
        reverseInorderLargest(root->right, k, ans);
        if (--k == 0) {
            ans = root->val;
            return;
        }
        reverseInorderLargest(root->left, k, ans);
    }

public:
    int kthSmallest(TreeNode* root, int k) {
        int ans = -1;
        inorderSmallest(root, k, ans);
        return ans;
    }

    int kthLargest(TreeNode* root, int k) {
        int ans = -1;
        reverseInorderLargest(root, k, ans);
        return ans;
    }
};`,
  java: `// Java: K-th Smallest and Largest in BST
class Solution {
    private int count = 0;
    private int result = -1;

    public int kthSmallest(TreeNode root, int k) {
        count = 0;
        result = -1;
        inorder(root, k);
        return result;
    }

    private void inorder(TreeNode root, int k) {
        if (root == null || result != -1) return;
        inorder(root.left, k);
        count++;
        if (count == k) {
            result = root.val;
            return;
        }
        inorder(root.right, k);
    }
}`,
  python: `# Python 3: K-th Smallest and Largest in BST
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack = []
        curr = root
        count = 0

        while curr or stack:
            while curr:
                stack.append(curr)
                curr = curr.left
            curr = stack.pop()
            count += 1
            if count == k:
                return curr.val
            curr = curr.right
        return -1`,
  javascript: `// JavaScript: K-th Smallest and Largest in BST
function kthSmallest(root, k) {
    let count = 0;
    let result = -1;

    function inorder(node) {
        if (!node || result !== -1) return;
        inorder(node.left);
        count++;
        if (count === k) {
            result = node.val;
            return;
        }
        inorder(node.right);
    }

    inorder(root);
    return result;
}`
};

const tree = {
  val: 5,
  left: {
    val: 3,
    left: { val: 2, left: { val: 1 } },
    right: { val: 4 }
  },
  right: { val: 6 }
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Problem Setup: Find 3rd Smallest & 3rd Largest (k = 3)',
    explanation: 'BST with 6 nodes: [1, 2, 3, 4, 5, 6]. Target rank k = 3. Inorder unrolls ascending; reverse Inorder unrolls descending.',
    activeLine: 6,
    activeIdeaId: 'inorder-counting',
    tree,
    activeVal: 5,
    nodeLabels: { 5: 'Root' },
    traversal: [],
    variables: { k: 3, 'kth Smallest': 'Searching', 'kth Largest': 'Searching' },
    customCard: {
      title: 'Problem Parameters',
      rows: [
        { label: 'Target Rank k', value: '3' },
        { label: 'Total Nodes', value: '6 nodes' },
        { label: 'Expected 3rd Smallest', value: '3' },
        { label: 'Expected 3rd Largest', value: '4' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Inorder Step 1: Visit Node 1 (count = 1)',
    explanation: 'Deepest left node is Node 1. Visit 1. Increment count = 1. Since count (1) != k (3), continue traversal.',
    activeLine: 9,
    activeIdeaId: 'inorder-counting',
    tree,
    activeVal: 1,
    highlightedVals: [1],
    nodeLabels: { 1: 'count = 1' },
    traversal: [1],
    traversalLabel: 'Ascending Inorder Stream',
    variables: { phase: 'FIND_SMALLEST', curr: 1, count: 1, k: 3 },
    customCard: {
      title: 'Smallest Search: Step 1',
      rows: [
        { label: 'Visited Node', value: '1' },
        { label: 'Current Count', value: '1' },
        { label: 'Target k', value: '3 (Not reached yet)' },
        { label: 'Next in Order', value: 'Parent Node 2' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Inorder Step 2: Visit Node 2 (count = 2)',
    explanation: 'Backtrack to parent Node 2. Visit 2. Increment count = 2. count (2) != k (3), continue traversal.',
    activeLine: 9,
    activeIdeaId: 'inorder-counting',
    tree,
    activeVal: 2,
    visitedVals: [1],
    highlightedVals: [2],
    nodeLabels: { 1: '1', 2: 'count = 2' },
    traversal: [1, 2],
    traversalLabel: 'Ascending Inorder Stream',
    variables: { phase: 'FIND_SMALLEST', curr: 2, count: 2, k: 3 },
    customCard: {
      title: 'Smallest Search: Step 2',
      rows: [
        { label: 'Visited Node', value: '2' },
        { label: 'Current Count', value: '2' },
        { label: 'Target k', value: '3' },
        { label: 'Next in Order', value: 'Node 3' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Inorder Step 3: Visit Node 3 (count == k == 3! FOUND!)',
    explanation: 'Advance to Node 3. Increment count = 3. count == k! 3rd smallest element is Node 3. Terminate Inorder traversal early.',
    activeLine: 11,
    activeIdeaId: 'early-exit-optimization',
    tree,
    activeVal: 3,
    targetVal: 3,
    visitedVals: [1, 2],
    nodeLabels: { 3: '3rd SMALLEST = 3' },
    traversal: [1, 2, 3],
    traversalLabel: 'Ascending Inorder Stream',
    variables: { phase: 'SMALLEST_FOUND', '3rd Smallest': 3, count: 3, status: 'EARLY EXIT' },
    customCard: {
      title: '3rd Smallest Element Found',
      rows: [
        { label: 'Matched Node', value: 'Node 3', accent: true },
        { label: 'Rank', value: 'k = 3' },
        { label: 'Early Exit Benefit', value: 'Nodes 4, 5, 6 never visited' },
        { label: 'Answer', value: '3' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Phase 2: Reverse Inorder for 3rd Largest (Right -> Root -> Left)',
    explanation: 'To find the 3rd largest, traverse right subtree first. Reset revCount = 0. Target is k = 3.',
    activeLine: 16,
    activeIdeaId: 'reverse-inorder-symmetry',
    tree,
    activeVal: 6,
    nodeLabels: { 3: '3rd Smallest', 6: 'Start Reverse' },
    traversal: [],
    variables: { phase: 'FIND_LARGEST', revCount: 0, k: 3 },
    customCard: {
      title: 'Reverse Inorder Setup',
      rows: [
        { label: 'Traversal Order', value: 'Right -> Root -> Left (Descending)' },
        { label: 'First Node', value: 'Node 6 (Global Maximum)' },
        { label: 'Target Rank', value: '3rd Largest' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Reverse Inorder Step 1: Visit Node 6 (revCount = 1)',
    explanation: 'Rightmost node is Node 6. Visit 6. revCount = 1. Since revCount (1) != k (3), continue descending.',
    activeLine: 18,
    activeIdeaId: 'reverse-inorder-symmetry',
    tree,
    activeVal: 6,
    highlightedVals: [6],
    nodeLabels: { 6: '1st Largest' },
    traversal: [6],
    traversalLabel: 'Descending Stream (Largest to Smallest)',
    variables: { phase: 'FIND_LARGEST', curr: 6, revCount: 1 },
    customCard: {
      title: 'Largest Search: Step 1',
      rows: [
        { label: 'Visited Node', value: '6 (1st Largest)' },
        { label: 'revCount', value: '1' },
        { label: 'Next Node', value: 'Root Node 5' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Reverse Inorder Step 2: Visit Node 5 (revCount = 2)',
    explanation: 'Backtrack to root Node 5. Visit 5. revCount = 2. revCount (2) != k (3), continue to left subtree.',
    activeLine: 18,
    activeIdeaId: 'reverse-inorder-symmetry',
    tree,
    activeVal: 5,
    visitedVals: [6],
    highlightedVals: [5],
    nodeLabels: { 6: '1st', 5: '2nd Largest' },
    traversal: [6, 5],
    traversalLabel: 'Descending Stream (Largest to Smallest)',
    variables: { phase: 'FIND_LARGEST', curr: 5, revCount: 2 },
    customCard: {
      title: 'Largest Search: Step 2',
      rows: [
        { label: 'Visited Node', value: '5 (2nd Largest)' },
        { label: 'revCount', value: '2' },
        { label: 'Next Node', value: 'Node 4 (Rightmost in left subtree)' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Reverse Inorder Step 3: Visit Node 4 (revCount == k == 3! FOUND!)',
    explanation: 'Advance to Node 4. revCount = 3! revCount == k. 3rd largest element is Node 4. Both queries resolved.',
    activeLine: 20,
    activeIdeaId: 'early-exit-optimization',
    tree,
    activeVal: 4,
    targetVal: 4,
    highlightedVals: [3, 4],
    nodeLabels: { 3: '3rd Smallest (3)', 4: '3rd Largest (4)' },
    traversal: [6, 5, 4],
    traversalLabel: 'Descending Stream (Largest to Smallest)',
    variables: { '3rd Smallest': 3, '3rd Largest': 4, status: 'COMPLETE' },
    customCard: {
      title: 'Dual Extremum Results',
      rows: [
        { label: '3rd Smallest', value: 'Node 3', accent: true },
        { label: '3rd Largest', value: 'Node 4', accent: true },
        { label: 'Time Complexity', value: 'O(H + k) - early termination' },
        { label: 'Space Complexity', value: 'O(H) recursion stack' }
      ]
    }
  }
];

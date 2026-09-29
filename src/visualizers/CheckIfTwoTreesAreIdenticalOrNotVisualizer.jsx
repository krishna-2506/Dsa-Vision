export const rendererType = 'tree';

export const meta = {
  title: 'Check If Two Trees Are Identical',
  category: 'Binary Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(min(N, M))',
  spaceComplexity: 'O(min(H1, H2)) recursion stack',
  description: 'Determines whether two binary trees are structurally identical and have identical values at every corresponding node using synchronized recursive pre-order traversal.'
};

export const ideaMap = {
  title: 'Identical Trees Synchronized Traversal',
  nodes: [
    {
      id: 'step1',
      label: 'Dual Null Base Case',
      detail: 'If both p and q are null simultaneously, return true as empty subtrees match.'
    },
    {
      id: 'step2',
      label: 'Structural Asymmetry Guard',
      detail: 'If exactly one of p or q is null, tree shapes differ; return false.'
    },
    {
      id: 'step3',
      label: 'Value Equivalence Test',
      detail: 'If p.val != q.val, values mismatch; return false immediately.'
    },
    {
      id: 'step4',
      label: 'Recursive Subtree Conjunction',
      detail: 'Recursively verify both left subtrees AND both right subtrees simultaneously.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Check if Two Trees are Identical
// Time Complexity: O(min(N, M)) | Space: O(min(H1, H2))
#include <iostream>

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        // Base case 1: both null -> identical empty branches
        if (p == nullptr && q == nullptr) return true;
        // Base case 2: one null or values differ -> mismatched
        if (p == nullptr || q == nullptr || p->val != q->val) return false;

        // Recursive conjunction: both left and right must be identical
        return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
    }
};`,
  java: `// Java: Check if Two Trees are Identical
// Time Complexity: O(min(N, M)) | Space: O(min(H1, H2))
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        // Base case 1: both null -> identical
        if (p == null && q == null) return true;
        // Base case 2: structural asymmetry or value difference
        if (p == null || q == null || p.val != q.val) return false;

        // Recurse on left and right children
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}`,
  python: `# Python 3: Check if Two Trees are Identical
# Time Complexity: O(min(N, M)) | Space: O(min(H1, H2))
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isSameTree(self, p: TreeNode, q: TreeNode) -> bool:
        # Base case 1: both empty
        if not p and not q:
            return True
        # Base case 2: one empty or values mismatch
        if not p or not q or p.val != q.val:
            return False

        # Recurse simultaneously on left and right subtrees
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)`,
  javascript: `// JavaScript: Check if Two Trees are Identical
// Time Complexity: O(min(N, M)) | Space: O(min(H1, H2))
function isSameTree(p, q) {
    // Both null -> structurally matching empty nodes
    if (!p && !q) return true;
    // Asymmetric or value mismatch
    if (!p || !q || p.val !== q.val) return false;

    // Both left and right subtrees must match
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`
};

const treeA = {
  val: 1,
  left: {
    val: 2,
    left: { val: 4, left: null, right: null },
    right: { val: 5, left: null, right: null }
  },
  right: {
    val: 3,
    left: null,
    right: null
  }
};

const treeB = {
  val: 1,
  left: {
    val: 2,
    left: { val: 4, left: null, right: null },
    right: { val: 5, left: null, right: null }
  },
  right: {
    val: 3,
    left: null,
    right: null
  }
};

export const steps = [
  {
    phase: 'INITIALIZE',
    title: 'Dual-Tree Recursive Equivalence Test',
    activeVal: 1,
    tree: treeA,
    auxiliaryTree: treeB,
    auxiliaryLabel: 'Tree B (Target / Comparison)',
    auxiliaryOpts: { activeVal: 1, visitedVals: [] },
    visitedVals: [],
    customCard: {
      title: 'Pedagogical Invariant & Dual Node Comparison',
      rows: [
        { label: 'Current Pointer P (Tree A)', value: 'Node(1) [Root]' },
        { label: 'Current Pointer Q (Tree B)', value: 'Node(1) [Root]' },
        { label: 'Comparison Status', value: 'Ready to evaluate p == null, q == null, p.val == q.val', accent: true },
        { label: 'Subtree Conjunction', value: 'isSameTree(p.left, q.left) && isSameTree(p.right, q.right)' }
      ]
    },
    variables: {
      'p.val': 1,
      'q.val': 1,
      'p == null': 'false',
      'q == null': 'false',
      'p.val == q.val': 'true (1 == 1)',
      callStackDepth: 1
    },
    metrics: {
      nodesCompared: 0,
      matchesSoFar: 0,
      structuralAsymmetry: 'None',
      currentVerdict: 'PENDING'
    },
    explain: 'Initiate synchronized recursion at the roots of Tree A and Tree B. Both pointers are non-null and have identical value 1.'
  },
  {
    phase: 'EVALUATE_ROOT',
    title: 'Compare Roots: P(1) vs Q(1) Match',
    activeVal: 1,
    tree: treeA,
    auxiliaryTree: treeB,
    auxiliaryLabel: 'Tree B (Target / Comparison)',
    auxiliaryOpts: { activeVal: 1, visitedVals: [1] },
    visitedVals: [1],
    nodeLabels: { 1: 'MATCH' },
    customCard: {
      title: 'Root Node Verification',
      rows: [
        { label: 'Evaluation', value: 'P.val (1) === Q.val (1) -> TRUE', accent: true },
        { label: 'Next Branch', value: 'Recurse into left subtrees: isSameTree(p.left, q.left)' }
      ]
    },
    variables: {
      'p.val': 1,
      'q.val': 1,
      'status': 'MATCH',
      'recurseTo': 'Left Children (Node 2)'
    },
    metrics: {
      nodesCompared: 1,
      matchesSoFar: 1,
      structuralAsymmetry: 'None',
      currentVerdict: 'MATCH'
    },
    explain: 'Root nodes match in value (1 == 1). Recurse into left children to verify left subtree equivalence.'
  },
  {
    phase: 'RECURSE_LEFT',
    title: 'Compare Left Children: P(2) vs Q(2)',
    activeVal: 2,
    tree: treeA,
    auxiliaryTree: treeB,
    auxiliaryLabel: 'Tree B (Target / Comparison)',
    auxiliaryOpts: { activeVal: 2, visitedVals: [1, 2] },
    visitedVals: [1, 2],
    nodeLabels: { 1: 'MATCH', 2: 'MATCH' },
    customCard: {
      title: 'Left Child Equivalence',
      rows: [
        { label: 'Evaluation', value: 'P.val (2) === Q.val (2) -> TRUE', accent: true },
        { label: 'Subproblem', value: 'Descend to P.left (4) and Q.left (4)' }
      ]
    },
    variables: {
      'p.val': 2,
      'q.val': 2,
      'p.val == q.val': 'true (2 == 2)',
      callStackDepth: 2
    },
    metrics: {
      nodesCompared: 2,
      matchesSoFar: 2,
      structuralAsymmetry: 'None',
      currentVerdict: 'MATCH'
    },
    explain: 'Both left children exist and have value 2. Node values match. Descend left again to examine leaf node 4.'
  },
  {
    phase: 'EVALUATE_LEAF',
    title: 'Compare Leftmost Leaf: P(4) vs Q(4)',
    activeVal: 4,
    tree: treeA,
    auxiliaryTree: treeB,
    auxiliaryLabel: 'Tree B (Target / Comparison)',
    auxiliaryOpts: { activeVal: 4, visitedVals: [1, 2, 4] },
    visitedVals: [1, 2, 4],
    nodeLabels: { 1: 'MATCH', 2: 'MATCH', 4: 'MATCH' },
    customCard: {
      title: 'Leaf Node 4 Verification',
      rows: [
        { label: 'Evaluation', value: 'P.val (4) === Q.val (4) -> TRUE', accent: true },
        { label: 'Leaf Children Base Cases', value: 'P.left == null && Q.left == null -> true; P.right == null && Q.right == null -> true' }
      ]
    },
    variables: {
      'p.val': 4,
      'q.val': 4,
      'p.left == null && q.left == null': 'true',
      'p.right == null && q.right == null': 'true',
      callStackDepth: 3
    },
    metrics: {
      nodesCompared: 3,
      matchesSoFar: 3,
      structuralAsymmetry: 'None',
      currentVerdict: 'MATCH'
    },
    explain: 'Node 4 values match (4 == 4). Both of node 4’s child pointers are null in both trees, returning true for both subtrees. Subtree rooted at 4 is verified identical.'
  },
  {
    phase: 'RECURSE_RIGHT',
    title: 'Compare Sibling: P(5) vs Q(5)',
    activeVal: 5,
    tree: treeA,
    auxiliaryTree: treeB,
    auxiliaryLabel: 'Tree B (Target / Comparison)',
    auxiliaryOpts: { activeVal: 5, visitedVals: [1, 2, 4, 5] },
    visitedVals: [1, 2, 4, 5],
    nodeLabels: { 1: 'MATCH', 2: 'MATCH', 4: 'MATCH', 5: 'MATCH' },
    customCard: {
      title: 'Right Child of Node 2 Verification',
      rows: [
        { label: 'Evaluation', value: 'P.val (5) === Q.val (5) -> TRUE', accent: true },
        { label: 'Status of Node 2 Subtree', value: 'Left subtree (4) is TRUE, Right subtree (5) is TRUE -> Node 2 subtree is TRUE', accent: true }
      ]
    },
    variables: {
      'p.val': 5,
      'q.val': 5,
      'isSameTree(2.left, 2.left)': 'true',
      'isSameTree(2.right, 2.right)': 'true',
      callStackDepth: 3
    },
    metrics: {
      nodesCompared: 4,
      matchesSoFar: 4,
      structuralAsymmetry: 'None',
      currentVerdict: 'MATCH'
    },
    explain: 'Unwind stack back to Node 2 and traverse its right child (Node 5). Both trees have value 5 at this position. Its null leaves return true, fully confirming Node 2’s subtree.'
  },
  {
    phase: 'EVALUATE_RIGHT_BRANCH',
    title: 'Compare Right Subtree Root: P(3) vs Q(3)',
    activeVal: 3,
    tree: treeA,
    auxiliaryTree: treeB,
    auxiliaryLabel: 'Tree B (Target / Comparison)',
    auxiliaryOpts: { activeVal: 3, visitedVals: [1, 2, 4, 5, 3] },
    visitedVals: [1, 2, 4, 5, 3],
    nodeLabels: { 1: 'MATCH', 2: 'MATCH', 3: 'MATCH', 4: 'MATCH', 5: 'MATCH' },
    customCard: {
      title: 'Right Subtree of Root 1',
      rows: [
        { label: 'Evaluation', value: 'P.val (3) === Q.val (3) -> TRUE', accent: true },
        { label: 'Leaf Children', value: 'Both left and right are null -> return true' }
      ]
    },
    variables: {
      'p.val': 3,
      'q.val': 3,
      'p.left == null && q.left == null': 'true',
      'p.right == null && q.right == null': 'true',
      callStackDepth: 2
    },
    metrics: {
      nodesCompared: 5,
      matchesSoFar: 5,
      structuralAsymmetry: 'None',
      currentVerdict: 'MATCH'
    },
    explain: 'Unwind stack to root 1. Since left subtree returned true, proceed to right child: Node 3. Both trees match with value 3 and both have null children.'
  },
  {
    phase: 'COMPLETE',
    title: 'Verification Complete: Both Trees Are Identical',
    activeVal: 1,
    tree: treeA,
    auxiliaryTree: treeB,
    auxiliaryLabel: 'Tree B (Target / Comparison)',
    auxiliaryOpts: { activeVal: 1, visitedVals: [1, 2, 3, 4, 5] },
    visitedVals: [1, 2, 3, 4, 5],
    nodeLabels: { 1: 'IDENTICAL', 2: 'IDENTICAL', 3: 'IDENTICAL', 4: 'IDENTICAL', 5: 'IDENTICAL' },
    customCard: {
      title: 'Final Conjunction & Conclusion',
      rows: [
        { label: 'Left Subtree Result', value: 'isSameTree(1.left, 1.left) === TRUE' },
        { label: 'Right Subtree Result', value: 'isSameTree(1.right, 1.right) === TRUE' },
        { label: 'Root Value Result', value: '1.val === 1.val === TRUE' },
        { label: 'Final Return Value', value: 'TRUE (Trees are structurally & value-wise identical)', accent: true }
      ]
    },
    variables: {
      'isSameTree(p, q)': 'true',
      'totalNodesMatched': 5,
      'result': 'true'
    },
    metrics: {
      nodesCompared: 5,
      matchesSoFar: 5,
      structuralAsymmetry: 'None',
      finalResult: 'IDENTICAL (true)'
    },
    explain: 'All corresponding pairs of nodes match in both topology and value. Both recursive calls evaluate to true, confirming that Tree A and Tree B are identical!'
  }
];

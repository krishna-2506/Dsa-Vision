export const rendererType = 'tree';

export const meta = {
  title: 'Diameter of Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) Recursion Stack',
  description: 'Calculates the length of the longest path between any two nodes in a binary tree. This path may or may not pass through the root.'
};

export const ideaMap = [
  {
    id: 'diameter-definition',
    title: 'Path Length in Edges',
    description: 'The diameter of a binary tree is the number of edges on the longest path between any two nodes.'
  },
  {
    id: 'local-diameter-formula',
    title: 'Local Turning Point Invariant',
    description: 'At any node acting as the highest turning point, the longest path passing through it is: localDiameter = leftHeight + rightHeight.'
  },
  {
    id: 'root-non-exclusivity',
    title: 'Root Non-Exclusivity',
    description: 'The longest path does not necessarily pass through the tree root; it can be entirely contained within a deep, lopsided subtree.'
  },
  {
    id: 'height-propagation',
    title: 'Height Upward Propagation',
    description: 'While tracking the global maximum of (lh + rh), the function returns 1 + max(lh, rh) upwards to allow parent nodes to form larger paths.'
  },
  {
    id: 'single-pass-optimality',
    title: 'Strict Single Pass O(N)',
    description: 'Computes diameter simultaneously during height calculation, avoiding redundant subtree traversals.'
  }
];

export const solutions = {
  cpp: `// C++: Diameter of Binary Tree
// Time: O(N) | Space: O(H)
class Solution {
    int maxDiameter = 0;

    int calculateHeight(TreeNode* root) {
        if (!root) return 0;

        int leftH = calculateHeight(root->left);
        int rightH = calculateHeight(root->right);

        // Update global diameter with path through current node
        maxDiameter = max(maxDiameter, leftH + rightH);

        return 1 + max(leftH, rightH);
    }
public:
    int diameterOfBinaryTree(TreeNode* root) {
        maxDiameter = 0;
        calculateHeight(root);
        return maxDiameter;
    }
};`,
  java: `// Java: Diameter of Binary Tree
class Solution {
    private int maxDiameter = 0;

    private int height(TreeNode root) {
        if (root == null) return 0;

        int leftH = height(root.left);
        int rightH = height(root.right);

        maxDiameter = Math.max(maxDiameter, leftH + rightH);

        return 1 + Math.max(leftH, rightH);
    }

    public int diameterOfBinaryTree(TreeNode root) {
        maxDiameter = 0;
        height(root);
        return maxDiameter;
    }
}`,
  python: `# Python 3: Diameter of Binary Tree
class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        max_diameter = 0

        def height(node):
            nonlocal max_diameter
            if not node:
                return 0

            lh = height(node.left)
            rh = height(node.right)

            max_diameter = max(max_diameter, lh + rh)

            return 1 + max(lh, rh)

        height(root)
        return max_diameter`,
  javascript: `// JavaScript: Diameter of Binary Tree
function diameterOfBinaryTree(root) {
    let maxDiameter = 0;

    function height(node) {
        if (!node) return 0;

        const leftH = height(node.left);
        const rightH = height(node.right);

        maxDiameter = Math.max(maxDiameter, leftH + rightH);

        return 1 + Math.max(leftH, rightH);
    }

    height(root);
    return maxDiameter;
}`
};

const tree = {
  val: 1,
  left: {
    val: 2,
    left: { val: 4 },
    right: { val: 5 }
  },
  right: {
    val: 3
  }
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Initialize Diameter Calculation at Root (1)',
    explanation: 'Tree with 5 nodes. We seek the longest path in edges. Global maxDiameter = 0.',
    activeLine: 6,
    activeIdeaId: 'diameter-definition',
    tree,
    activeVal: 1,
    nodeLabels: { 1: 'Root' },
    variables: { root: 1, maxDiameter: 0, formula: 'local = lh + rh' },
    customCard: {
      title: 'Problem Rule',
      rows: [
        { label: 'Definition', value: 'Longest path between any two nodes (in edges)' },
        { label: 'Local Turning Path', value: 'leftHeight + rightHeight' },
        { label: 'Returned to Parent', value: '1 + max(leftHeight, rightHeight)' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Postorder Step 1: Leaf Node 4 (lh=0, rh=0)',
    explanation: 'Node 4 is a leaf. lh=0, rh=0. Local path = 0. maxDiameter = max(0, 0) = 0. Returns height = 1.',
    activeLine: 12,
    activeIdeaId: 'height-propagation',
    tree,
    activeVal: 4,
    nodeLabels: { 4: 'H=1 (Leaf)' },
    variables: { curr: 4, lh: 0, rh: 0, localDiameter: 0, maxDiameter: 0, returnedH: 1 },
    customCard: {
      title: 'Node 4 Processed',
      rows: [
        { label: 'Left Height', value: '0' },
        { label: 'Right Height', value: '0' },
        { label: 'Local Path', value: '0 + 0 = 0 edges' },
        { label: 'Height Returned', value: '1' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Postorder Step 2: Leaf Node 5 (lh=0, rh=0)',
    explanation: 'Node 5 is a leaf. lh=0, rh=0. Local path = 0. maxDiameter = 0. Returns height = 1.',
    activeLine: 12,
    activeIdeaId: 'height-propagation',
    tree,
    activeVal: 5,
    visitedVals: [4],
    nodeLabels: { 4: 'H=1', 5: 'H=1 (Leaf)' },
    variables: { curr: 5, lh: 0, rh: 0, localDiameter: 0, maxDiameter: 0, returnedH: 1 },
    customCard: {
      title: 'Node 5 Processed',
      rows: [
        { label: 'Left Height', value: '0' },
        { label: 'Right Height', value: '0' },
        { label: 'Local Path', value: '0 + 0 = 0 edges' },
        { label: 'Height Returned', value: '1' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Postorder Step 3: Node 2 (lh=1, rh=1) -> Local Diameter = 2',
    explanation: 'Node 2 has left child 4 (H=1) and right child 5 (H=1). Local path through 2: lh + rh = 1 + 1 = 2 edges (4 -> 2 -> 5). Update maxDiameter = 2! Returns height = 2.',
    activeLine: 14,
    activeIdeaId: 'local-diameter-formula',
    tree,
    activeVal: 2,
    targetVal: 2,
    visitedVals: [4, 5],
    nodeLabels: { 4: 'H=1', 5: 'H=1', 2: 'H=2 (Local Diam=2)' },
    variables: { curr: 2, lh: 1, rh: 1, localDiameter: 2, maxDiameter: 2, returnedH: 2 },
    customCard: {
      title: 'Subtree Path Evaluated',
      rows: [
        { label: 'Left Child H', value: '1 (Node 4)' },
        { label: 'Right Child H', value: '1 (Node 5)' },
        { label: 'Path Through 2', value: '4 -> 2 -> 5 (2 edges)', accent: true },
        { label: 'maxDiameter Updated', value: '2' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Postorder Step 4: Leaf Node 3 (lh=0, rh=0)',
    explanation: 'Traverse right child of root (Node 3). Node 3 is a leaf. Returns height = 1.',
    activeLine: 12,
    activeIdeaId: 'height-propagation',
    tree,
    activeVal: 3,
    visitedVals: [4, 5, 2],
    nodeLabels: { 2: 'H=2', 3: 'H=1 (Leaf)' },
    variables: { curr: 3, lh: 0, rh: 0, returnedH: 1, maxDiameter: 2 },
    customCard: {
      title: 'Right Subtree Leaf',
      rows: [
        { label: 'Node 3 Height', value: '1' },
        { label: 'Current maxDiameter', value: '2 (from left subtree)' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Postorder Step 5: Root Node 1 (lh=2, rh=1) -> Local Diameter = 3!',
    explanation: 'Root 1 has left child 2 (H=2) and right child 3 (H=1). Local path: lh + rh = 2 + 1 = 3 edges (4 -> 2 -> 1 -> 3). Update maxDiameter = 3!',
    activeLine: 14,
    activeIdeaId: 'local-diameter-formula',
    tree,
    activeVal: 1,
    targetVal: 1,
    visitedVals: [4, 5, 2, 3],
    nodeLabels: { 1: 'Root (Local Diam=3)', 2: 'H=2', 3: 'H=1' },
    variables: { curr: 1, lh: 2, rh: 1, localDiameter: 3, maxDiameter: 3, overallHeight: 3 },
    customCard: {
      title: 'Global Maximum Diameter Found',
      rows: [
        { label: 'Left Subtree Height', value: '2 (longest path: 4 -> 2)' },
        { label: 'Right Subtree Height', value: '1 (path: 1 -> 3)' },
        { label: 'Path Length', value: '2 + 1 = 3 edges', accent: true },
        { label: 'New maxDiameter', value: '3' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Highlight Critical Diameter Path: [4 -> 2 -> 1 -> 3]',
    explanation: 'The longest path in the tree traverses 4 -> 2 -> 1 -> 3, connecting 4 nodes across 3 edges.',
    activeLine: 15,
    activeIdeaId: 'local-diameter-formula',
    tree,
    activeVal: 1,
    highlightedVals: [4, 2, 1, 3],
    nodeLabels: { 4: 'Start', 2: 'Link', 1: 'Apex', 3: 'End' },
    variables: { path: '4 -> 2 -> 1 -> 3', edges: 3, diameter: 3 },
    customCard: {
      title: 'Path Anatomy',
      rows: [
        { label: 'Apex Node', value: 'Node 1 (Root)' },
        { label: 'Left Branch', value: '4 -> 2 -> 1 (2 edges)' },
        { label: 'Right Branch', value: '1 -> 3 (1 edge)' },
        { label: 'Total Edges', value: '3 edges', accent: true }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Return maxDiameter = 3',
    explanation: 'The diameter calculation completes in O(N) time with O(H) recursion stack. Return diameter = 3.',
    activeLine: 21,
    activeIdeaId: 'single-pass-optimality',
    tree,
    activeVal: 1,
    highlightedVals: [4, 2, 1, 3],
    nodeLabels: { 1: 'DIAMETER = 3' },
    variables: { result: 3, timeComplexity: 'O(N)', spaceComplexity: 'O(H)' },
    customCard: {
      title: 'Algorithm Complete',
      rows: [
        { label: 'Diameter (Edges)', value: '3', accent: true },
        { label: 'Diameter (Nodes)', value: '4 nodes' },
        { label: 'Time Complexity', value: 'O(N) - single pass' },
        { label: 'Space Complexity', value: 'O(H) recursion stack' }
      ]
    }
  }
];

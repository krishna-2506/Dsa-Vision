export const rendererType = 'tree';

export const meta = {
  title: 'Children Sum Property in Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) recursion stack',
  description: 'Converts any binary tree into one where every non-leaf node satisfies node.val = left.val + right.val. On the way down, children are boosted if the parent is larger; on the way up, parents are recomputed from the sum of their updated children.'
};

export const ideaMap = {
  title: 'Children Sum Property Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Downward Capacity Boost',
      detail: 'Compare parent value with childSum = left.val + right.val. If parent > childSum, increase both children to parent.val.'
    },
    {
      id: 'step2',
      label: 'Recursive Subtree Traversal',
      detail: 'Recursively invoke changeTree on both left and right child subtrees to enforce the property downwards.'
    },
    {
      id: 'step3',
      label: 'Bottom-Up Sum Recomputation',
      detail: 'On the return path (postorder), set parent value to exactly left.val + right.val using the finalized child values.'
    },
    {
      id: 'step4',
      label: 'Non-Decreasing Transformation',
      detail: 'Ensures values only increase, never decrease, preventing value deficits and guaranteeing termination in O(N) time.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Children Sum Property Transformation
// Time Complexity: O(N) | Space Complexity: O(H)
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void changeTree(TreeNode* root) {
    if (!root) return;

    int childSum = 0;
    if (root->left) childSum += root->left->val;
    if (root->right) childSum += root->right->val;

    // Downward: Increase children if parent has larger value
    if (childSum >= root->val) {
        root->val = childSum;
    } else {
        if (root->left) root->left->val = root->val;
        else if (root->right) root->right->val = root->val;
    }

    changeTree(root->left);
    changeTree(root->right);

    // Upward: Recompute parent strictly from finalized children
    int total = 0;
    if (root->left) total += root->left->val;
    if (root->right) total += root->right->val;
    if (root->left || root->right) root->val = total;
}`,
  java: `// Java: Children Sum Property Transformation
// Time Complexity: O(N) | Space Complexity: O(H)
class Solution {
    public void changeTree(TreeNode root) {
        if (root == null) return;

        int childSum = 0;
        if (root.left != null) childSum += root.left.val;
        if (root.right != null) childSum += root.right.val;

        if (childSum >= root.val) {
            root.val = childSum;
        } else {
            if (root.left != null) root.left.val = root.val;
            else if (root.right != null) root.right.val = root.val;
        }

        changeTree(root.left);
        changeTree(root.right);

        int total = 0;
        if (root.left != null) total += root.left.val;
        if (root.right != null) total += root.right.val;
        if (root.left != null || root.right != null) root.val = total;
    }
}`,
  python: `# Python: Children Sum Property Transformation
# Time Complexity: O(N) | Space Complexity: O(H)
def changeTree(root):
    if not root:
        return

    child_sum = 0
    if root.left:
        child_sum += root.left.val
    if root.right:
        child_sum += root.right.val

    if child_sum >= root.val:
        root.val = child_sum
    else:
        if root.left:
            root.left.val = root.val
        elif root.right:
            root.right.val = root.val

    changeTree(root.left)
    changeTree(root.right)

    total = 0
    if root.left:
        total += root.left.val
    if root.right:
        total += root.right.val
    if root.left or root.right:
        root.val = total`,
  javascript: `// JavaScript: Children Sum Property Transformation
// Time Complexity: O(N) | Space Complexity: O(H)
function changeTree(root) {
  if (!root) return;

  let childSum = 0;
  if (root.left) childSum += root.left.val;
  if (root.right) childSum += root.right.val;

  if (childSum >= root.val) {
    root.val = childSum;
  } else {
    if (root.left) root.left.val = root.val;
    else if (root.right) root.right.val = root.val;
  }

  changeTree(root.left);
  changeTree(root.right);

  let total = 0;
  if (root.left) total += root.left.val;
  if (root.right) total += root.right.val;
  if (root.left || root.right) root.val = total;
}`
};

const treeStage1 = {
  val: 2,
  left: { val: 35, left: null, right: null },
  right: { val: 10, left: null, right: null }
};

const treeStage2 = {
  val: 45,
  left: { val: 35, left: null, right: null },
  right: { val: 10, left: null, right: null }
};

export const steps = [
  {
    phase: 'INITIAL',
    title: '1. Initial State: Root = 2, Left = 35, Right = 10',
    tree: treeStage1,
    activeVal: 2,
    visitedVals: [2],
    nodeLabels: { 2: 'val: 2 (Sum: 45)' },
    customCard: {
      title: 'Downward Inspection',
      rows: [
        { label: 'Parent Node', value: '2' },
        { label: 'Child Sum', value: '35 + 10 = 45', accent: true },
        { label: 'Check Condition', value: 'childSum (45) >= root (2)' },
        { label: 'Downward Rule', value: 'Boost root.val = childSum (45)' }
      ]
    },
    variables: {
      parentVal: 2,
      childSum: 45,
      leftVal: 35,
      rightVal: 10,
      isValid: false
    },
    metrics: [
      { label: 'Parent', value: '2' },
      { label: 'Child Sum', value: '45' },
      { label: 'Status', value: 'Discrepancy (45 > 2)', highlight: true }
    ],
    explain: 'Inspect root (2). Sum of children is 35 + 10 = 45, which exceeds root. To prevent shortfall, update root.val to 45 on the way down.'
  },
  {
    phase: 'DOWN_PROPAGATE',
    title: '2. Downward Boost: root.val updated to 45',
    tree: treeStage2,
    activeVal: 45,
    visitedVals: [45],
    nodeLabels: { 45: 'Boosted to 45' },
    customCard: {
      title: 'Parent Capacity Increased',
      rows: [
        { label: 'Updated Root', value: '45', accent: true },
        { label: 'Left Child', value: '35 (Leaf)' },
        { label: 'Right Child', value: '10 (Leaf)' },
        { label: 'Next Action', value: 'Recurse into left and right subtrees' }
      ]
    },
    variables: {
      parentVal: 45,
      childSum: 45,
      leftVal: 35,
      rightVal: 10,
      isValid: true
    },
    metrics: [
      { label: 'Parent', value: '45' },
      { label: 'Child Sum', value: '45' },
      { label: 'Status', value: 'Capacity Boosted', highlight: true }
    ],
    explain: 'Root value is boosted to 45. Recursion proceeds into left and right child subtrees.'
  },
  {
    phase: 'RECURSE_LEAVES',
    title: '3. Subtree Base Cases: Leaves 35 and 10 Unchanged',
    tree: treeStage2,
    activeVal: 35,
    visitedVals: [45, 35, 10],
    nodeLabels: { 45: 'Parent: 45', 35: 'Leaf: 35', 10: 'Leaf: 10' },
    customCard: {
      title: 'Leaf Base Cases',
      rows: [
        { label: 'Left Child (35)', value: 'No children -> Base case return' },
        { label: 'Right Child (10)', value: 'No children -> Base case return' },
        { label: 'Recursion Phase', value: 'Unwinding back to parent' }
      ]
    },
    variables: {
      parentVal: 45,
      leftVal: 35,
      rightVal: 10,
      unwinding: true
    },
    metrics: [
      { label: 'Left Leaf', value: '35' },
      { label: 'Right Leaf', value: '10' },
      { label: 'Status', value: 'Leaves Unchanged', highlight: true }
    ],
    explain: 'Leaves 35 and 10 have no children. They return their values unchanged up to the parent frame.'
  },
  {
    phase: 'COMPLETE',
    title: '4. Upward Recomputation: root.val = 35 + 10 = 45!',
    tree: treeStage2,
    activeVal: 45,
    visitedVals: [45, 35, 10],
    nodeLabels: { 45: 'Valid: 35+10', 35: 'Left: 35', 10: 'Right: 10' },
    customCard: {
      title: 'Children Sum Property Verified',
      rows: [
        { label: 'Final Parent', value: '45', accent: true },
        { label: 'Left + Right', value: '35 + 10 = 45', accent: true },
        { label: 'Property Status', value: 'Strictly Satisfied' },
        { label: 'Time Complexity', value: 'O(N) single pass postorder' }
      ]
    },
    variables: {
      parentVal: 45,
      childSum: 45,
      satisfied: true
    },
    metrics: [
      { label: 'Parent', value: '45' },
      { label: 'Left + Right', value: '45' },
      { label: 'Property', value: 'VALID (45 == 45)', highlight: true }
    ],
    explain: 'On the way up: root.val is confirmed as left (35) + right (10) = 45. The Children Sum Property holds across all nodes!'
  }
];

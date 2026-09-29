export const rendererType = 'tree';

export const meta = {
  title: 'Flatten Binary Tree to Linked List',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) in-place with Morris Traversal',
  description: 'Flattens a binary tree in-place into a right-skewed linked list matching its preorder traversal order. Uses Morris-style in-order predecessor rewiring to achieve strictly O(1) auxiliary memory (LeetCode 114).'
};

export const ideaMap = {
  title: 'In-Place Tree Flattening Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Identify Left Subtree',
      detail: 'If curr.left is null, advance curr = curr.right. If curr.left exists, we must splice it into the right spine.'
    },
    {
      id: 'step2',
      label: 'Find In-Order Predecessor',
      detail: 'Find the rightmost node prev in curr.left subtree: while (prev.right != null) prev = prev.right.'
    },
    {
      id: 'step3',
      label: 'Predecessor Rewiring',
      detail: 'Connect prev.right = curr.right, then move entire left subtree to curr.right, setting curr.left = null.'
    },
    {
      id: 'step4',
      label: 'Advance Along Right Spine',
      detail: 'Advance curr = curr.right until all left subtrees have been unraveled into a continuous right-skewed list.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Flatten Binary Tree to Linked List in O(1) Space (LeetCode 114)
// Time Complexity: O(N) | Space Complexity: O(1)
struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    void flatten(TreeNode* root) {
        TreeNode* curr = root;

        while (curr != nullptr) {
            if (curr->left != nullptr) {
                // Find rightmost node in left subtree
                TreeNode* prev = curr->left;
                while (prev->right != nullptr) {
                    prev = prev->right;
                }

                // Connect original right subtree to predecessor's right
                prev->right = curr->right;
                curr->right = curr->left;
                curr->left = nullptr;
            }
            curr = curr->right;
        }
    }
};`,
  java: `// Java: Flatten Binary Tree to Linked List in O(1) Space (LeetCode 114)
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    public void flatten(TreeNode root) {
        TreeNode curr = root;

        while (curr != null) {
            if (curr.left != null) {
                TreeNode prev = curr.left;
                while (prev.right != null) {
                    prev = prev.right;
                }

                prev.right = curr.right;
                curr.right = curr.left;
                curr.left = null;
            }
            curr = curr.right;
        }
    }
}`,
  python: `# Python: Flatten Binary Tree to Linked List in O(1) Space (LeetCode 114)
# Time Complexity: O(N) | Space Complexity: O(1)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def flatten(self, root: TreeNode | None) -> None:
        curr = root

        while curr:
            if curr.left:
                prev = curr.left
                while prev.right:
                    prev = prev.right

                prev.right = curr.right
                curr.right = curr.left
                curr.left = None

            curr = curr.right`,
  javascript: `// JavaScript: Flatten Binary Tree to Linked List in O(1) Space (LeetCode 114)
// Time Complexity: O(N) | Space Complexity: O(1)
function flatten(root) {
  let curr = root;

  while (curr !== null) {
    if (curr.left !== null) {
      let prev = curr.left;
      while (prev.right !== null) {
        prev = prev.right;
      }

      prev.right = curr.right;
      curr.right = curr.left;
      curr.left = null;
    }
    curr = curr.right;
  }
}`
};

const treeInitial = {
  val: 1,
  left: {
    val: 2,
    left: { val: 3, left: null, right: null },
    right: { val: 4, left: null, right: null }
  },
  right: {
    val: 5,
    left: null,
    right: { val: 6, left: null, right: null }
  }
};

const treeStep1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: { val: 3, left: null, right: null },
    right: {
      val: 4,
      left: null,
      right: {
        val: 5,
        left: null,
        right: { val: 6, left: null, right: null }
      }
    }
  }
};

const treeFinal = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: null,
    right: {
      val: 3,
      left: null,
      right: {
        val: 4,
        left: null,
        right: {
          val: 5,
          left: null,
          right: { val: 6, left: null, right: null }
        }
      }
    }
  }
};

export const steps = [
  {
    phase: 'INITIAL',
    title: '1. Initial Binary Tree: Inspect Root 1 (curr = 1)',
    tree: treeInitial,
    activeVal: 1,
    visitedVals: [1],
    nodeLabels: { 1: 'curr: 1', 4: 'predecessor: 4', 5: 'target right: 5' },
    customCard: {
      title: 'Predecessor Search at Root',
      rows: [
        { label: 'Current Node', value: 'Node 1', accent: true },
        { label: 'Left Subtree Root', value: 'Node 2' },
        { label: 'Rightmost Predecessor', value: 'Node 4 (in curr.left)', accent: true },
        { label: 'Rewiring Plan', value: 'Connect 4.right = 5; move 1.left to 1.right' }
      ]
    },
    variables: {
      curr: 1,
      prev: 4,
      originalRight: 5,
      leftTransferred: false
    },
    metrics: [
      { label: 'Current', value: '1' },
      { label: 'Predecessor', value: '4' },
      { label: 'Space', value: 'O(1) in-place', highlight: true }
    ],
    explain: 'At curr = 1, a left subtree exists. Traverse down 1.left to find rightmost node 4. Connect 4.right to 1.right (Node 5).'
  },
  {
    phase: 'SPLICING_ROOT',
    title: '2. Rewire Root: 4.right = 5, 1.right = 2, 1.left = null',
    tree: treeStep1,
    activeVal: 2,
    visitedVals: [1, 2],
    nodeLabels: { 1: 'left: null', 2: 'curr: 2', 3: 'predecessor: 3', 4: 'attached to 5' },
    customCard: {
      title: 'First Splicing Stage Complete',
      rows: [
        { label: 'Splice Operation', value: 'Transferred {2,3,4} into right spine', accent: true },
        { label: 'Bridge Link', value: '4.right points to Node 5' },
        { label: 'Next Pointer', value: 'Advance curr = curr.right (Node 2)' },
        { label: 'Left Subtree of 2', value: 'Node 3 needs unravelling' }
      ]
    },
    variables: {
      curr: 2,
      prev: 3,
      originalRight: 4,
      leftTransferred: true
    },
    metrics: [
      { label: 'Current', value: '2' },
      { label: 'Predecessor', value: '3' },
      { label: 'Spine Status', value: '1 -> 2', highlight: true }
    ],
    explain: 'Left child 2 is moved to 1.right, with 1.left set to null. Predecessor 4 now flows into 5. Advance curr to Node 2.'
  },
  {
    phase: 'SPLICING_NODE_2',
    title: '3. Rewire Node 2: 3.right = 4, 2.right = 3, 2.left = null',
    tree: treeFinal,
    activeVal: 3,
    visitedVals: [1, 2, 3],
    nodeLabels: { 1: 'right: 2', 2: 'right: 3', 3: 'right: 4', 4: 'right: 5', 5: 'right: 6', 6: 'tail' },
    customCard: {
      title: 'Second Splicing Stage Complete',
      rows: [
        { label: 'Splice Operation', value: '3.right = 4; 2.right = 3; 2.left = null', accent: true },
        { label: 'Unravelled Sequence', value: '1 -> 2 -> 3 -> 4 -> 5 -> 6' },
        { label: 'Left Pointers', value: 'All left pointers set to null' }
      ]
    },
    variables: {
      curr: 3,
      flattenedPrefix: '[1, 2, 3]',
      allLeftNull: true
    },
    metrics: [
      { label: 'Current', value: '3' },
      { label: 'Spine Status', value: '1 -> 2 -> 3 -> 4', highlight: true }
    ],
    explain: 'At Node 2, rightmost node of 2.left is 3. Connect 3.right to 4. Move 3 to 2.right and set 2.left = null.'
  },
  {
    phase: 'COMPLETE',
    title: '4. Fully Flattened Right-Skewed Linked List: 1 -> 2 -> 3 -> 4 -> 5 -> 6',
    tree: treeFinal,
    activeVal: null,
    visitedVals: [1, 2, 3, 4, 5, 6],
    nodeLabels: { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6' },
    customCard: {
      title: 'Flattened Linked List Summary',
      rows: [
        { label: 'Resulting Linked List', value: '1 -> 2 -> 3 -> 4 -> 5 -> 6', accent: true },
        { label: 'Preorder Verification', value: 'Matches Preorder Traversal exactly', accent: true },
        { label: 'Time Complexity', value: 'O(N) amortized linear scan' },
        { label: 'Space Complexity', value: 'O(1) auxiliary space (no stack/recursion)' }
      ]
    },
    variables: {
      status: 'Complete',
      order: '[1, 2, 3, 4, 5, 6]',
      auxiliarySpace: 'O(1)'
    },
    metrics: [
      { label: 'List Length', value: '6' },
      { label: 'Preorder Match', value: 'YES' },
      { label: 'Space', value: 'O(1)', highlight: true }
    ],
    explain: 'All nodes have been shifted to right pointers with all left pointers nullified. The flattened linked list precisely mirrors the preorder traversal in strictly O(1) auxiliary space.'
  }
];

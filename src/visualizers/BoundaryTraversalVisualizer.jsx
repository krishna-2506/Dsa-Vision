export const rendererType = 'tree';

export const meta = {
  title: 'Boundary Traversal of Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) recursion stack',
  description: 'Traverses the outer boundary of a binary tree in anti-clockwise order across three non-overlapping phases: left boundary (excluding leaves), all leaf nodes from left to right, and right boundary (from bottom to top in reverse, excluding leaves).'
};

export const ideaMap = {
  title: 'Anti-Clockwise Boundary Traversal Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Root Node Inclusion',
      detail: 'If the root is not a leaf node, append root.val to the result list.'
    },
    {
      id: 'step2',
      label: 'Left Boundary (Top-Down)',
      detail: 'Descend through curr = root.left; if curr is not a leaf, add it. Favor left child; if missing, branch to right child.'
    },
    {
      id: 'step3',
      label: 'Leaf Nodes (Left-to-Right)',
      detail: 'Perform inorder/preorder DFS to collect all leaf nodes (node.left == null && node.right == null) left to right.'
    },
    {
      id: 'step4',
      label: 'Right Boundary (Bottom-Up)',
      detail: 'Descend rightward curr = root.right collecting non-leaf nodes into a temporary buffer; push reversed to result.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Boundary Traversal of Binary Tree
// Time Complexity: O(N) | Space Complexity: O(H)
#include <vector>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

bool isLeaf(TreeNode* node) {
    return (!node->left && !node->right);
}

void addLeftBoundary(TreeNode* root, vector<int>& res) {
    TreeNode* curr = root->left;
    while (curr) {
        if (!isLeaf(curr)) res.push_back(curr->val);
        if (curr->left) curr = curr->left;
        else curr = curr->right;
    }
}

void addLeaves(TreeNode* root, vector<int>& res) {
    if (isLeaf(root)) {
        res.push_back(root->val);
        return;
    }
    if (root->left) addLeaves(root->left, res);
    if (root->right) addLeaves(root->right, res);
}

void addRightBoundary(TreeNode* root, vector<int>& res) {
    TreeNode* curr = root->right;
    vector<int> temp;
    while (curr) {
        if (!isLeaf(curr)) temp.push_back(curr->val);
        if (curr->right) curr = curr->right;
        else curr = curr->left;
    }
    for (int i = temp.size() - 1; i >= 0; i--) {
        res.push_back(temp[i]);
    }
}

vector<int> boundaryTraversal(TreeNode* root) {
    vector<int> res;
    if (!root) return res;
    if (!isLeaf(root)) res.push_back(root->val);

    addLeftBoundary(root, res);
    addLeaves(root, res);
    addRightBoundary(root, res);
    return res;
}`,
  java: `// Java: Boundary Traversal of Binary Tree
// Time Complexity: O(N) | Space Complexity: O(H)
import java.util.*;

class Solution {
    private boolean isLeaf(TreeNode node) {
        return (node.left == null && node.right == null);
    }

    private void addLeftBoundary(TreeNode root, ArrayList<Integer> res) {
        TreeNode curr = root.left;
        while (curr != null) {
            if (!isLeaf(curr)) res.add(curr.val);
            if (curr.left != null) curr = curr.left;
            else curr = curr.right;
        }
    }

    private void addLeaves(TreeNode root, ArrayList<Integer> res) {
        if (isLeaf(root)) {
            res.add(root.val);
            return;
        }
        if (root.left != null) addLeaves(root.left, res);
        if (root.right != null) addLeaves(root.right, res);
    }

    private void addRightBoundary(TreeNode root, ArrayList<Integer> res) {
        TreeNode curr = root.right;
        ArrayList<Integer> temp = new ArrayList<>();
        while (curr != null) {
            if (!isLeaf(curr)) temp.add(curr.val);
            if (curr.right != null) curr = curr.right;
            else curr = curr.left;
        }
        for (int i = temp.size() - 1; i >= 0; i--) {
            res.add(temp.get(i));
        }
    }

    public ArrayList<Integer> boundary(TreeNode node) {
        ArrayList<Integer> res = new ArrayList<>();
        if (node == null) return res;
        if (!isLeaf(node)) res.add(node.val);

        addLeftBoundary(node, res);
        addLeaves(node, res);
        addRightBoundary(node, res);
        return res;
    }
}`,
  python: `# Python: Boundary Traversal of Binary Tree
# Time Complexity: O(N) | Space Complexity: O(H)
def boundaryTraversal(root):
    if not root:
        return []

    def is_leaf(node):
        return not node.left and not node.right

    res = []
    if not is_leaf(root):
        res.append(root.val)

    # 1. Left boundary top-down
    curr = root.left
    while curr:
        if not is_leaf(curr):
            res.append(curr.val)
        curr = curr.left if curr.left else curr.right

    # 2. Leaves left to right
    def add_leaves(node):
        if is_leaf(node):
            res.append(node.val)
            return
        if node.left: add_leaves(node.left)
        if node.right: add_leaves(node.right)

    add_leaves(root)

    # 3. Right boundary bottom-up
    curr = root.right
    right_temp = []
    while curr:
        if not is_leaf(curr):
            right_temp.append(curr.val)
        curr = curr.right if curr.right else curr.left

    res.extend(reversed(right_temp))
    return res`,
  javascript: `// JavaScript: Boundary Traversal of Binary Tree
// Time Complexity: O(N) | Space Complexity: O(H)
function boundaryTraversal(root) {
  if (!root) return [];
  const isLeaf = (node) => !node.left && !node.right;
  const res = [];

  if (!isLeaf(root)) res.push(root.val);

  // 1. Left boundary
  let curr = root.left;
  while (curr) {
    if (!isLeaf(curr)) res.push(curr.val);
    curr = curr.left ? curr.left : curr.right;
  }

  // 2. Leaf nodes
  function addLeaves(node) {
    if (isLeaf(node)) {
      res.push(node.val);
      return;
    }
    if (node.left) addLeaves(node.left);
    if (node.right) addLeaves(node.right);
  }
  addLeaves(root);

  // 3. Right boundary (reversed)
  curr = root.right;
  const rightTemp = [];
  while (curr) {
    if (!isLeaf(curr)) rightTemp.push(curr.val);
    curr = curr.right ? curr.right : curr.left;
  }
  rightTemp.reverse();
  res.push(...rightTemp);

  return res;
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
    left: { val: 7, left: null, right: null },
    right: { val: 8, left: null, right: null }
  }
};

export const steps = [
  {
    phase: 'ROOT',
    title: '1. Root Node Phase: Add Root 1',
    tree: sampleTree,
    activeVal: 1,
    visitedVals: [1],
    traversal: [1],
    nodeLabels: { 1: 'Root' },
    customCard: {
      title: 'Anti-Clockwise Boundary Traversal',
      rows: [
        { label: 'Active Phase', value: 'Phase 1: Root Node', accent: true },
        { label: 'Leaf Check', value: 'Node 1 is NOT a leaf -> Added' },
        { label: 'Direction', value: 'Perimeter Anti-Clockwise' },
        { label: 'Current Boundary', value: '[1]' }
      ]
    },
    variables: {
      phase: 'Root Node',
      currentNode: 1,
      traversalSequence: '[1]'
    },
    metrics: [
      { label: 'Active Node', value: '1' },
      { label: 'Boundary Phase', value: 'Root' },
      { label: 'Nodes Collected', value: '1', highlight: true }
    ],
    explain: 'Initiate anti-clockwise boundary traversal. Root 1 is not a leaf node, so append 1 to the boundary sequence.'
  },
  {
    phase: 'LEFT_BOUNDARY',
    title: '2. Left Boundary Phase: Add Node 2 (Exclude Leaves)',
    tree: sampleTree,
    activeVal: 2,
    visitedVals: [1, 2],
    traversal: [1, 2],
    nodeLabels: { 1: 'Root', 2: 'Left Boundary' },
    customCard: {
      title: 'Left Boundary Traversal',
      rows: [
        { label: 'Active Phase', value: 'Phase 2: Left Boundary (Top-Down)', accent: true },
        { label: 'Evaluated Node', value: 'Node 2 (not a leaf -> Added)' },
        { label: 'Next Left Descendant', value: 'Node 4 is a leaf (Left boundary stops)' },
        { label: 'Current Boundary', value: '[1, 2]' }
      ]
    },
    variables: {
      phase: 'Left Boundary',
      currentNode: 2,
      traversalSequence: '[1, 2]'
    },
    metrics: [
      { label: 'Active Node', value: '2' },
      { label: 'Boundary Phase', value: 'Left' },
      { label: 'Nodes Collected', value: '2', highlight: true }
    ],
    explain: 'Descend leftward down root.left. Node 2 is not a leaf, so append 2. Its child 4 is a leaf, terminating the left boundary phase to prevent duplicates.'
  },
  {
    phase: 'LEAF_NODES',
    title: '3. Leaf Nodes Phase: Collect Leaves Left-to-Right [4, 5, 7, 8]',
    tree: sampleTree,
    activeVal: 4,
    visitedVals: [1, 2, 4, 5, 7, 8],
    traversal: [1, 2, 4, 5, 7, 8],
    nodeLabels: { 1: 'Root', 2: 'Left', 4: 'Leaf 1', 5: 'Leaf 2', 7: 'Leaf 3', 8: 'Leaf 4' },
    customCard: {
      title: 'Leaf Nodes Harvest',
      rows: [
        { label: 'Active Phase', value: 'Phase 3: All Leaf Nodes Left-to-Right', accent: true },
        { label: 'Left Subtree Leaves', value: 'Nodes 4 and 5' },
        { label: 'Right Subtree Leaves', value: 'Nodes 7 and 8' },
        { label: 'Current Boundary', value: '[1, 2, 4, 5, 7, 8]' }
      ]
    },
    variables: {
      phase: 'Leaf Nodes',
      currentNode: 'Leaves (4,5,7,8)',
      traversalSequence: '[1, 2, 4, 5, 7, 8]'
    },
    metrics: [
      { label: 'Active Node', value: '4,5,7,8' },
      { label: 'Boundary Phase', value: 'Leaves' },
      { label: 'Nodes Collected', value: '6', highlight: true }
    ],
    explain: 'Run DFS to collect all leaf nodes in strict left-to-right order: Node 4, Node 5, Node 7, and Node 8. All bottom perimeter endpoints are captured.'
  },
  {
    phase: 'RIGHT_BOUNDARY',
    title: '4. Right Boundary Phase (Reversed): Add Node 3 (Bottom-Up)',
    tree: sampleTree,
    activeVal: 3,
    visitedVals: [1, 2, 4, 5, 7, 8, 3],
    traversal: [1, 2, 4, 5, 7, 8, 3],
    nodeLabels: { 1: 'Root', 2: 'Left', 4: 'Leaf', 5: 'Leaf', 7: 'Leaf', 8: 'Leaf', 3: 'Right (Rev)' },
    customCard: {
      title: 'Right Boundary Upward Return',
      rows: [
        { label: 'Active Phase', value: 'Phase 4: Right Boundary (Bottom-Up)', accent: true },
        { label: 'Descendant Collected', value: 'Node 3 (non-leaf)' },
        { label: 'Reversal Rule', value: 'Reversed so path ascends back to root' },
        { label: 'Current Boundary', value: '[1, 2, 4, 5, 7, 8, 3]' }
      ]
    },
    variables: {
      phase: 'Right Boundary (Rev)',
      currentNode: 3,
      traversalSequence: '[1, 2, 4, 5, 7, 8, 3]'
    },
    metrics: [
      { label: 'Active Node', value: '3' },
      { label: 'Boundary Phase', value: 'Right (Rev)' },
      { label: 'Nodes Collected', value: '7', highlight: true }
    ],
    explain: 'Right boundary descending from root.right discovers Node 3 (excluding leaf 8). Adding Node 3 completes the anti-clockwise loop ascending back to root.'
  },
  {
    phase: 'COMPLETE',
    title: '5. Boundary Traversal Complete: [1, 2, 4, 5, 7, 8, 3]',
    tree: sampleTree,
    activeVal: null,
    visitedVals: [1, 2, 4, 5, 7, 8, 3],
    traversal: [1, 2, 4, 5, 7, 8, 3],
    nodeLabels: { 1: 'Root', 2: 'Left', 4: 'Leaf', 5: 'Leaf', 7: 'Leaf', 8: 'Leaf', 3: 'Right' },
    customCard: {
      title: 'Full Anti-Clockwise Perimeter',
      rows: [
        { label: 'Left Boundary', value: '[1, 2]' },
        { label: 'Leaves (L-to-R)', value: '[4, 5, 7, 8]' },
        { label: 'Right Boundary (Rev)', value: '[3]' },
        { label: 'Final Traversal', value: '[1, 2, 4, 5, 7, 8, 3]', accent: true },
        { label: 'Time Complexity', value: 'O(N) linear time' }
      ]
    },
    variables: {
      phase: 'Finished',
      currentNode: 'All',
      traversalSequence: '[1, 2, 4, 5, 7, 8, 3]'
    },
    metrics: [
      { label: 'Status', value: 'Complete' },
      { label: 'Total Nodes', value: '7' },
      { label: 'Boundary', value: '[1,2,4,5,7,8,3]', highlight: true }
    ],
    explain: 'Complete anti-clockwise perimeter traversal finished with zero duplicates. Left boundary -> leaves -> right boundary (reversed).'
  }
];

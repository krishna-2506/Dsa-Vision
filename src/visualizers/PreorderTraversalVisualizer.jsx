export const rendererType = 'tree';

export const meta = {
  title: 'Preorder Traversal of Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) recursion stack',
  description: 'Traverses a binary tree in Root -> Left -> Right order recursively, processing each parent node immediately before traversing its child subtrees.'
};

export const ideaMap = {
  title: 'Preorder Traversal Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Visit Root Node First',
      detail: 'Record current node value into output stream before descending into children.'
    },
    {
      id: 'step2',
      label: 'Traverse Entire Left Subtree',
      detail: 'Recursively call preorder(node.left) until reaching null base cases.'
    },
    {
      id: 'step3',
      label: 'Traverse Entire Right Subtree',
      detail: 'Recursively call preorder(node.right) after left branch completes.'
    },
    {
      id: 'step4',
      label: 'Unwind Stack Frame',
      detail: 'Return control to parent caller frame upon completing both branches.'
    }
  ]
};

export const solutions = {
  cpp: `// C++ Preorder Traversal (Recursive)
#include <vector>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
private:
    void preorder(TreeNode* root, vector<int>& result) {
        if (root == nullptr) return;

        // 1. Visit Root Node First
        result.push_back(root->val);

        // 2. Traverse Left Subtree
        preorder(root->left, result);

        // 3. Traverse Right Subtree
        preorder(root->right, result);
    }
public:
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> result;
        preorder(root, result);
        return result;
    }
};`,
  python: `# Python 3 Preorder Traversal (Recursive)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        result = []
        def dfs(node):
            if not node:
                return
            result.append(node.val) # 1. Root
            dfs(node.left)          # 2. Left
            dfs(node.right)         # 3. Right
        dfs(root)
        return result`,
  java: `// Java Preorder Traversal (Recursive)
import java.util.*;

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class Solution {
    private void preorder(TreeNode root, List<Integer> result) {
        if (root == null) return;

        result.add(root.val); // 1. Root
        preorder(root.left, result);  // 2. Left
        preorder(root.right, result); // 3. Right
    }

    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        preorder(root, result);
        return result;
    }
}`,
  javascript: `// JavaScript Preorder Traversal (Recursive)
function preorderTraversal(root) {
    const result = [];
    function dfs(node) {
        if (!node) return;
        result.push(node.val); // 1. Root
        dfs(node.left);        // 2. Left
        dfs(node.right);       // 3. Right
    }
    dfs(root);
    return result;
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
    val: 3,
    left: { val: 6 },
    right: { val: 7 }
  }
};

export const steps = [
  {
    title: 'Initialize Preorder Traversal at Root (1)',
    phase: 'SETUP',
    tree,
    activeVal: 1,
    nodeLabels: { 1: 'Root' },
    traversal: [],
    traversalLabel: 'Preorder Output Stream: []',
    variables: { current: 1, callStack: '[dfs(1)]', order: 'Root -> Left -> Right' },
    metrics: [
      { label: 'Current Node', value: '1 (Root)' },
      { label: 'Output Size', value: '0 / 7' },
      { label: 'Order Rule', value: 'Root First' }
    ],
    explain: 'Starting Preorder Traversal on binary tree. Invariant: record root value immediately before descending into child subtrees.',
    action: 'Begin dfs(root).',
    intuition: 'Preorder visits nodes in top-down prefix order, ideal for duplicating trees or prefix serializations.',
    formula: 'Visit(Node) -> dfs(left) -> dfs(right)'
  },
  {
    title: 'Visit Root (1) -> Descend to Left Child (2)',
    phase: 'VISIT_ROOT',
    tree,
    activeVal: 2,
    nodeLabels: { 1: 'Visited', 2: 'Current' },
    traversal: [1],
    traversalLabel: 'Preorder Output Stream: [1]',
    variables: { recorded: 1, callStack: '[dfs(1), dfs(2)]', nextBranch: 'Left' },
    metrics: [
      { label: 'Just Visited', value: '1' },
      { label: 'Next Node', value: '2' },
      { label: 'Stack Depth', value: '2' }
    ],
    explain: 'Record root value 1 into the stream. Call dfs(1.left), advancing the active pointer to Node 2.',
    action: 'result.push(1); dfs(node.left);',
    intuition: 'The parent is committed to output before any child is touched.',
    formula: 'Output: [1]'
  },
  {
    title: 'Visit Node (2) -> Descend to Left Leaf (4)',
    phase: 'VISIT_LEFT',
    tree,
    activeVal: 4,
    nodeLabels: { 1: 'Visited', 2: 'Visited', 4: 'Current Leaf' },
    traversal: [1, 2],
    traversalLabel: 'Preorder Output Stream: [1, 2]',
    variables: { recorded: 2, callStack: '[dfs(1), dfs(2), dfs(4)]' },
    metrics: [
      { label: 'Just Visited', value: '2' },
      { label: 'Active Leaf', value: '4' },
      { label: 'Stack Depth', value: '3' }
    ],
    explain: 'Record Node 2 into the stream. Call dfs(2.left), advancing to leftmost leaf Node 4.',
    action: 'result.push(2); dfs(node.left);',
    intuition: 'Each step down the left branch commits its node immediately.',
    formula: 'Output: [1, 2]'
  },
  {
    title: 'Visit Leaf (4) & Backtrack to (2) -> Branch to (5)',
    phase: 'VISIT_LEAF',
    tree,
    activeVal: 5,
    nodeLabels: { 1: 'Visited', 2: 'Visited', 4: 'Visited', 5: 'Current' },
    traversal: [1, 2, 4],
    traversalLabel: 'Preorder Output Stream: [1, 2, 4]',
    variables: { recorded: 4, callStack: '[dfs(1), dfs(2), dfs(5)]' },
    metrics: [
      { label: 'Just Visited', value: '4' },
      { label: 'Next Branch', value: '2.right (5)' },
      { label: 'Visited Count', value: '3 / 7' }
    ],
    explain: 'Record Leaf Node 4 into stream. Node 4 has no children (base cases return). Backtrack to Node 2 and traverse its right child dfs(2.right = 5).',
    action: 'result.push(4); dfs(2.right);',
    intuition: 'After exhausting left subtree of 2, execution pivots to right subtree of 2.',
    formula: 'Output: [1, 2, 4]'
  },
  {
    title: 'Visit Node (5) -> Left Subtree Complete, Pivot to (3)',
    phase: 'PIVOT_RIGHT_TREE',
    tree,
    activeVal: 3,
    nodeLabels: { 1: 'Visited', 2: 'Subtree Done', 3: 'Current' },
    traversal: [1, 2, 4, 5],
    traversalLabel: 'Preorder Output Stream: [1, 2, 4, 5]',
    variables: { recorded: 5, callStack: '[dfs(1), dfs(3)]' },
    metrics: [
      { label: 'Just Visited', value: '5' },
      { label: 'Subtree Done', value: 'Left Subtree' },
      { label: 'Now Entering', value: 'Right Subtree (3)' }
    ],
    explain: 'Record Node 5. The entire left subtree of Root 1 is now completed. Backtrack to Root 1 and branch right to Node 3.',
    action: 'result.push(5); dfs(1.right = 3);',
    intuition: 'The left subtree of 1 [2, 4, 5] is fully visited before node 3 is touched.',
    formula: 'Output: [1, 2, 4, 5]'
  },
  {
    title: 'Visit Node (3) & Children (6) and (7)',
    phase: 'VISIT_RIGHT_CHILDREN',
    tree,
    activeVal: 7,
    nodeLabels: { 3: 'Visited', 6: 'Visited', 7: 'Current' },
    traversal: [1, 2, 4, 5, 3, 6],
    traversalLabel: 'Preorder Output Stream: [1, 2, 4, 5, 3, 6]',
    variables: { current: 7, callStack: '[dfs(1), dfs(3), dfs(7)]' },
    metrics: [
      { label: 'Visited', value: '3, then 6' },
      { label: 'Final Node', value: '7' },
      { label: 'Stream Size', value: '6 / 7' }
    ],
    explain: 'Record Node 3. Descend left to Node 6, record 6. Backtrack and branch right to Node 7.',
    action: 'result.push(3); result.push(6); dfs(3.right = 7);',
    intuition: 'Preorder processes each subtree root before its children recursively.',
    formula: 'Output: [1, 2, 4, 5, 3, 6]'
  },
  {
    title: 'Preorder Traversal Complete: [1, 2, 4, 5, 3, 6, 7]',
    phase: 'COMPLETED',
    tree,
    activeVal: null,
    nodeLabels: { 1: 'Done', 2: 'Done', 3: 'Done' },
    traversal: [1, 2, 4, 5, 3, 6, 7],
    traversalLabel: 'Final Preorder: [1, 2, 4, 5, 3, 6, 7]',
    variables: { totalVisited: 7, treeHeight: 3 },
    metrics: [
      { label: 'Final Output', value: '7 Nodes' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(H)' }
    ],
    customCard: {
      title: 'Preorder Traversal Summary',
      rows: [
        { label: 'Traversal Order', value: 'Root -> Left -> Right' },
        { label: 'Result Stream', value: '1, 2, 4, 5, 3, 6, 7', accent: true },
        { label: 'Time Complexity', value: 'O(N) - visits every node exactly once' },
        { label: 'Space Complexity', value: 'O(H) - maximum call stack height' }
      ]
    },
    explain: 'Record final Node 7. Preorder traversal of all 7 binary tree nodes successfully concluded in linear O(N) time.',
    action: 'Return result array.',
    intuition: 'Preorder guarantees that every ancestor node appears before its descendants in the output.',
    formula: 'Result: [1, 2, 4, 5, 3, 6, 7]'
  }
];

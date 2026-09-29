export const rendererType = 'tree';

export const meta = {
  title: 'Postorder Traversal of Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) recursion stack',
  description: 'Traverses a binary tree in Left -> Right -> Root order recursively, processing all child descendants completely before visiting their parent node.'
};

export const ideaMap = {
  title: 'Postorder Traversal Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Traverse Left Subtree First',
      detail: 'Descend down left pointers recursively until hitting base cases.'
    },
    {
      id: 'step2',
      label: 'Traverse Right Subtree Second',
      detail: 'Descend down right child pointers recursively before touching parent.'
    },
    {
      id: 'step3',
      label: 'Visit Parent Node Last',
      detail: 'Record current node only after both child subtrees have fully returned.'
    },
    {
      id: 'step4',
      label: 'Bottom-Up Evaluation',
      detail: 'Natural order for node deletion, subtree height calculation, and postfix expressions.'
    }
  ]
};

export const solutions = {
  cpp: `// C++ Postorder Traversal (Recursive)
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
    void postorder(TreeNode* root, vector<int>& result) {
        if (root == nullptr) return;

        // 1. Traverse Left Subtree
        postorder(root->left, result);

        // 2. Traverse Right Subtree
        postorder(root->right, result);

        // 3. Visit Root Node Last
        result.push_back(root->val);
    }
public:
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> result;
        postorder(root, result);
        return result;
    }
};`,
  python: `# Python 3 Postorder Traversal (Recursive)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        result = []
        def dfs(node):
            if not node:
                return
            dfs(node.left)          # 1. Left
            dfs(node.right)         # 2. Right
            result.append(node.val) # 3. Root
        dfs(root)
        return result`,
  java: `// Java Postorder Traversal (Recursive)
import java.util.*;

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class Solution {
    private void postorder(TreeNode root, List<Integer> result) {
        if (root == null) return;

        postorder(root.left, result);  // 1. Left
        postorder(root.right, result); // 2. Right
        result.add(root.val);          // 3. Root
    }

    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        postorder(root, result);
        return result;
    }
}`,
  javascript: `// JavaScript Postorder Traversal (Recursive)
function postorderTraversal(root) {
    const result = [];
    function dfs(node) {
        if (!node) return;
        dfs(node.left);        // 1. Left
        dfs(node.right);       // 2. Right
        result.push(node.val); // 3. Root
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
    title: 'Initialize Postorder Traversal at Root (1)',
    phase: 'SETUP',
    tree,
    activeVal: 1,
    nodeLabels: { 1: 'Deferred Root' },
    traversal: [],
    traversalLabel: 'Postorder Output Stream: []',
    variables: { current: 1, callStack: '[dfs(1)]', order: 'Left -> Right -> Root' },
    metrics: [
      { label: 'Current Node', value: '1 (Deferred)' },
      { label: 'Output Size', value: '0 / 7' },
      { label: 'Order Rule', value: 'Root Last' }
    ],
    explain: 'Starting Postorder Traversal on binary tree. Invariant: a node can only be recorded after both of its child subtrees are completely processed.',
    action: 'Begin dfs(root). Immediately descend to 1.left (Node 2).',
    intuition: 'Postorder processes leaves first and root last, making it ideal for memory deallocation and bottom-up DP on trees.',
    formula: 'dfs(left) -> dfs(right) -> Visit(Node)'
  },
  {
    title: 'Descend to Leaf (4): First Node Recorded',
    phase: 'VISIT_LEAF',
    tree,
    activeVal: 4,
    nodeLabels: { 1: 'Stack', 2: 'Stack', 4: 'First Visited Leaf' },
    traversal: [4],
    traversalLabel: 'Postorder Output Stream: [4]',
    variables: { recorded: 4, callStack: '[dfs(1), dfs(2), dfs(4)]' },
    metrics: [
      { label: 'Recorded Leaf', value: '4' },
      { label: 'Stack Depth', value: '3' },
      { label: 'Status', value: 'Leaf Unwound' }
    ],
    explain: 'Descent 1 -> 2 -> 4. Node 4 has no left or right children. Node 4 is the first node recorded into the postorder output stream: [4].',
    action: 'result.push(4); Backtrack to Node 2.',
    intuition: 'The deepest leftmost leaf is always the first node visited in postorder.',
    formula: 'Output: [4]'
  },
  {
    title: 'Traverse Right Child (5) of Node (2)',
    phase: 'VISIT_LEAF',
    tree,
    activeVal: 5,
    nodeLabels: { 4: 'Done', 5: 'Recorded Leaf', 2: 'Pending Both' },
    traversal: [4, 5],
    traversalLabel: 'Postorder Output Stream: [4, 5]',
    variables: { recorded: 5, callStack: '[dfs(1), dfs(2), dfs(5)]' },
    metrics: [
      { label: 'Recorded Leaf', value: '5' },
      { label: 'Left of 2', value: 'Done (4)' },
      { label: 'Right of 2', value: 'Done (5)' }
    ],
    explain: 'From Node 2, traverse right child dfs(2.right = 5). Node 5 is a leaf, so record Node 5: [4, 5].',
    action: 'result.push(5); Backtrack to Node 2.',
    intuition: 'Both children (4 and 5) of Node 2 have now been evaluated.',
    formula: 'Output: [4, 5]'
  },
  {
    title: 'Visit Node (2): Both Children Satisfied',
    phase: 'VISIT_PARENT',
    tree,
    activeVal: 2,
    nodeLabels: { 4: 'Done', 5: 'Done', 2: 'Recorded Parent' },
    traversal: [4, 5, 2],
    traversalLabel: 'Postorder Output Stream: [4, 5, 2]',
    variables: { recorded: 2, leftSubtreeDone: 'true' },
    metrics: [
      { label: 'Recorded Parent', value: '2' },
      { label: 'Left Subtree', value: 'Completed' },
      { label: 'Stream Size', value: '3 / 7' }
    ],
    explain: 'Since both 2.left (4) and 2.right (5) are complete, Node 2 is now recorded into the stream: [4, 5, 2].',
    action: 'result.push(2); Backtrack to Root 1.',
    intuition: 'A parent is visited immediately after its children are finished.',
    formula: 'Output: [4, 5, 2]'
  },
  {
    title: 'Traverse Right Subtree: Visit Leaves (6) and (7)',
    phase: 'VISIT_RIGHT_LEAVES',
    tree,
    activeVal: 7,
    nodeLabels: { 6: 'Recorded Leaf', 7: 'Recorded Leaf', 3: 'Pending' },
    traversal: [4, 5, 2, 6, 7],
    traversalLabel: 'Postorder Output Stream: [4, 5, 2, 6, 7]',
    variables: { recordedLast: 7, rightLeaves: '6, 7 visited' },
    metrics: [
      { label: 'Right Leaves', value: '6 and 7' },
      { label: 'Pending Node', value: 'Node 3' },
      { label: 'Stream Size', value: '5 / 7' }
    ],
    explain: 'Branch down 1.right (3). Descend left to Node 6 (recorded), then right to Node 7 (recorded). Output: [4, 5, 2, 6, 7].',
    action: 'result.push(6); result.push(7);',
    intuition: 'The leaves of the right subtree are processed before their parent Node 3.',
    formula: 'Output: [4, 5, 2, 6, 7]'
  },
  {
    title: 'Visit Node (3) & Finally Visit Root (1)',
    phase: 'COMPLETED',
    tree,
    activeVal: 1,
    nodeLabels: { 1: 'Final Root', 2: 'Done', 3: 'Done' },
    traversal: [4, 5, 2, 6, 7, 3, 1],
    traversalLabel: 'Final Postorder: [4, 5, 2, 6, 7, 3, 1]',
    variables: { rootRecorded: 1, totalNodes: 7 },
    metrics: [
      { label: 'Final Root', value: '1' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(H)' }
    ],
    customCard: {
      title: 'Postorder Traversal Summary',
      rows: [
        { label: 'Traversal Order', value: 'Left -> Right -> Root' },
        { label: 'Result Stream', value: '4, 5, 2, 6, 7, 3, 1', accent: true },
        { label: 'Root Position', value: 'Appears at the very end of the array' },
        { label: 'Complexity', value: 'O(N) time, O(H) recursion stack space' }
      ]
    },
    explain: 'Node 3 is recorded (both children complete). Finally, Root Node 1 is recorded. Postorder traversal of all 7 nodes complete: [4, 5, 2, 6, 7, 3, 1].',
    action: 'Return result array.',
    intuition: 'Postorder guarantees that every parent node appears strictly after all its descendants.',
    formula: 'Result: [4, 5, 2, 6, 7, 3, 1]'
  }
];

export const rendererType = 'tree';

export const meta = {
  title: 'Inorder Traversal of Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) Recursion Stack',
  description: 'Traverses a binary tree in Left -> Root -> Right order recursively, visiting all left descendants before the parent node and all right descendants after.'
};

export const ideaMap = [
  {
    id: 'inorder-rule',
    title: 'Left-Root-Right Visiting Invariant',
    description: 'A node can only be processed and added to the output stream once its entire left subtree has been fully traversed.'
  },
  {
    id: 'call-stack-depth',
    title: 'Call Stack Height Bounding',
    description: 'The recursion stack stores deferred parent frames, reaching a maximum memory depth equal to the tree height H.'
  },
  {
    id: 'deepest-left-descent',
    title: 'Initial Leftmost Descent',
    description: 'Traversal continually advances down left pointers without recording any values until reaching the first null boundary.'
  },
  {
    id: 'backtracking-unwinding',
    title: 'Frame Popping and Backtracking',
    description: 'When a subtree finishes, execution returns to the parent frame on the stack, which records its value and branches right.'
  },
  {
    id: 'linear-time-optimality',
    title: 'Strict O(N) Traversal',
    description: 'Every node in the tree is pushed onto and popped from the call stack exactly once, guaranteeing O(N) runtime.'
  }
];

export const solutions = {
  cpp: `// C++: Recursive Inorder Traversal
// Time: O(N) | Space: O(H)
class Solution {
    void inorder(TreeNode* root, vector<int>& res) {
        if (!root) return;
        inorder(root->left, res);
        res.push_back(root->val);
        inorder(root->right, res);
    }
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        inorder(root, res);
        return res;
    }
};`,
  java: `// Java: Recursive Inorder Traversal
class Solution {
    private void inorder(TreeNode root, List<Integer> res) {
        if (root == null) return;
        inorder(root.left, res);
        res.add(root.val);
        inorder(root.right, res);
    }
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        inorder(root, res);
        return res;
    }
}`,
  python: `# Python 3: Recursive Inorder Traversal
class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        def dfs(node):
            if not node:
                return
            dfs(node.left)
            res.append(node.val)
            dfs(node.right)
        dfs(root)
        return res`,
  javascript: `// JavaScript: Recursive Inorder Traversal
function inorderTraversal(root) {
    const res = [];
    function dfs(node) {
        if (!node) return;
        dfs(node.left);
        res.push(node.val);
        dfs(node.right);
    }
    dfs(root);
    return res;
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
    stepIndex: 1,
    title: 'Initialize Inorder Traversal at Root (1)',
    explanation: 'Binary Tree with 7 nodes. Traversal order: Left -> Root -> Right. Begin at root (1).',
    activeLine: 6,
    activeIdeaId: 'inorder-rule',
    tree,
    activeVal: 1,
    nodeLabels: { 1: 'Root' },
    traversal: [],
    traversalLabel: 'Inorder Output Stream',
    variables: { current: 1, callStack: '[dfs(1)]', stream: '[]' },
    customCard: {
      title: 'Traversal Protocol',
      rows: [
        { label: 'Visiting Sequence', value: '1. Traverse Left -> 2. Record Node -> 3. Traverse Right' },
        { label: 'Current Node', value: 'Root 1' },
        { label: 'Initial Action', value: 'Descend to 1.left (Node 2)' },
        { label: 'Total Nodes', value: '7 nodes' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Step 1: Descend Left to Deepest Leaf (Node 4)',
    explanation: 'From 1 -> 2 -> 4. Node 4 has no left child (null). Record Node 4 into the output stream.',
    activeLine: 9,
    activeIdeaId: 'deepest-left-descent',
    tree,
    activeVal: 4,
    targetVal: 4,
    visitedVals: [1, 2],
    nodeLabels: { 4: 'Record (1st)' },
    traversal: [4],
    traversalLabel: 'Inorder Output Stream',
    variables: { current: 4, callStack: '[dfs(1), dfs(2), dfs(4)]', stream: '[4]' },
    customCard: {
      title: 'First Node Recorded',
      rows: [
        { label: 'Leftmost Leaf', value: 'Node 4', accent: true },
        { label: '4.left', value: 'null (Recursion terminates)' },
        { label: 'Output Stream', value: '[4]' },
        { label: 'Next Step', value: 'Backtrack to parent Node 2' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Step 2: Backtrack and Record Parent Node 2',
    explanation: 'Node 4 left and right subtrees complete. Pop to parent Node 2. Record Node 2 into output stream. Stream: [4, 2].',
    activeLine: 10,
    activeIdeaId: 'backtracking-unwinding',
    tree,
    activeVal: 2,
    targetVal: 2,
    visitedVals: [1, 4],
    nodeLabels: { 4: 'Done', 2: 'Record (2nd)' },
    traversal: [4, 2],
    traversalLabel: 'Inorder Output Stream',
    variables: { current: 2, callStack: '[dfs(1), dfs(2)]', stream: '[4, 2]' },
    customCard: {
      title: 'Parent Frame Resumed',
      rows: [
        { label: 'Left Subtree Status', value: 'Complete (Node 4 visited)' },
        { label: 'Current Action', value: 'Record Node 2 to stream', accent: true },
        { label: 'Next Action', value: 'Descend to 2.right (Node 5)' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Step 3: Descend Right and Record Node 5',
    explanation: 'Traverse 2.right (Node 5). 5.left is null, record Node 5, 5.right is null. Entire left subtree of Root 1 complete!',
    activeLine: 11,
    activeIdeaId: 'inorder-rule',
    tree,
    activeVal: 5,
    targetVal: 5,
    visitedVals: [1, 2, 4],
    nodeLabels: { 4: 'Done', 2: 'Done', 5: 'Record (3rd)' },
    traversal: [4, 2, 5],
    traversalLabel: 'Inorder Output Stream',
    variables: { current: 5, 'Left Subtree': 'FINISHED', stream: '[4, 2, 5]' },
    customCard: {
      title: 'Left Subtree Completed',
      rows: [
        { label: 'Subtree Stream', value: '[4, 2, 5]', accent: true },
        { label: 'Processed Nodes', value: '3 of 7' },
        { label: 'Next Action', value: 'Backtrack to Root 1' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Step 4: Backtrack to Root 1 and Record 1',
    explanation: 'The entire left subtree of Root 1 is finished. Record Root 1 into the output stream. Stream: [4, 2, 5, 1].',
    activeLine: 10,
    activeIdeaId: 'inorder-rule',
    tree,
    activeVal: 1,
    targetVal: 1,
    visitedVals: [4, 2, 5],
    nodeLabels: { 1: 'Record Root (4th)' },
    traversal: [4, 2, 5, 1],
    traversalLabel: 'Inorder Output Stream',
    variables: { current: 1, callStack: '[dfs(1)]', stream: '[4, 2, 5, 1]' },
    customCard: {
      title: 'Root Node Recorded',
      rows: [
        { label: 'Root Value', value: '1', accent: true },
        { label: 'Left Subtree Stream', value: '[4, 2, 5]' },
        { label: 'Next Action', value: 'Descend to 1.right (Node 3)' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Step 5: Descend into Right Subtree to Node 6',
    explanation: 'Traverse 1.right (Node 3). From 3, descend to 3.left (Node 6). 6.left is null, record Node 6. Stream: [4, 2, 5, 1, 6].',
    activeLine: 9,
    activeIdeaId: 'deepest-left-descent',
    tree,
    activeVal: 6,
    targetVal: 6,
    visitedVals: [4, 2, 5, 1, 3],
    nodeLabels: { 6: 'Record (5th)' },
    traversal: [4, 2, 5, 1, 6],
    traversalLabel: 'Inorder Output Stream',
    variables: { current: 6, callStack: '[dfs(1), dfs(3), dfs(6)]', stream: '[4, 2, 5, 1, 6]' },
    customCard: {
      title: 'Right Subtree Leftmost Leaf',
      rows: [
        { label: 'Visited Leaf', value: 'Node 6', accent: true },
        { label: 'Output Stream', value: '[4, 2, 5, 1, 6]' },
        { label: 'Next Step', value: 'Backtrack to parent Node 3' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Step 6: Backtrack to Node 3 and Record 3',
    explanation: 'Backtrack from 6 to parent Node 3. Record Node 3. Stream: [4, 2, 5, 1, 6, 3]. Then descend to 3.right (Node 7).',
    activeLine: 10,
    activeIdeaId: 'backtracking-unwinding',
    tree,
    activeVal: 3,
    targetVal: 3,
    visitedVals: [4, 2, 5, 1, 6],
    nodeLabels: { 3: 'Record (6th)' },
    traversal: [4, 2, 5, 1, 6, 3],
    traversalLabel: 'Inorder Output Stream',
    variables: { current: 3, callStack: '[dfs(1), dfs(3)]', stream: '[4, 2, 5, 1, 6, 3]' },
    customCard: {
      title: 'Right Subtree Parent Recorded',
      rows: [
        { label: 'Current Node', value: '3', accent: true },
        { label: 'Remaining Node', value: 'Right child Node 7' },
        { label: 'Next Action', value: 'Descend to 3.right (Node 7)' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Step 7: Record Final Node 7 — Traversal Complete!',
    explanation: 'Visit 7. 7.left is null, record Node 7, 7.right is null. All 7 nodes visited in Inorder sequence: [4, 2, 5, 1, 6, 3, 7].',
    activeLine: 13,
    activeIdeaId: 'linear-time-optimality',
    tree,
    activeVal: 7,
    targetVal: 7,
    visitedVals: [4, 2, 5, 1, 6, 3],
    highlightedVals: [1, 2, 3, 4, 5, 6, 7],
    nodeLabels: { 7: 'Record (7th - Final)' },
    traversal: [4, 2, 5, 1, 6, 3, 7],
    traversalLabel: 'Final Inorder Traversal Output',
    variables: { finalResult: '[4, 2, 5, 1, 6, 3, 7]', timeComplexity: 'O(N)', spaceComplexity: 'O(H)' },
    customCard: {
      title: 'Traversal Complete',
      rows: [
        { label: 'Final Inorder Sequence', value: '[4, 2, 5, 1, 6, 3, 7]', accent: true },
        { label: 'Time Complexity', value: 'O(N) - exactly 1 visit per node' },
        { label: 'Space Complexity', value: 'O(H) - call stack height' },
        { label: 'Status', value: 'Complete & Verified' }
      ]
    }
  }
];

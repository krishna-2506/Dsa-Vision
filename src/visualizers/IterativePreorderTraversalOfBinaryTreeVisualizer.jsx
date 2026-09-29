export const rendererType = 'tree';

export const meta = {
  title: 'Iterative Preorder Traversal',
  category: 'Binary Trees',
  difficulty: 'Easy',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) using Explicit Stack',
  description: 'Traverses a binary tree in Root -> Left -> Right order iteratively using an explicit stack, pushing the right child before the left child so that the left child is popped and processed first.'
};

export const ideaMap = {
  title: 'Iterative Preorder with Explicit Stack',
  nodes: [
    {
      id: 'step1',
      label: 'Initialize Stack with Root',
      detail: 'Push root node onto the stack to begin iterative processing.'
    },
    {
      id: 'step2',
      label: 'Pop & Process Node (Root First)',
      detail: 'Pop the top element and append its value to the preorder result array.'
    },
    {
      id: 'step3',
      label: 'Push Right Child Then Left Child',
      detail: 'Due to LIFO property, push right child first so left child sits on top and pops first.'
    },
    {
      id: 'step4',
      label: 'Repeat Until Stack is Empty',
      detail: 'Continue pop-and-push loop until all tree nodes are visited.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Iterative Preorder Traversal
// Time Complexity: O(N) | Space: O(H)
#include <vector>
#include <stack>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<int> preorderTraversal(TreeNode* root) {
    vector<int> preorder;
    if (root == nullptr) return preorder;

    stack<TreeNode*> st;
    st.push(root);

    while (!st.empty()) {
        TreeNode* node = st.top();
        st.pop();
        preorder.push_back(node->val);

        // Push right first so that left is popped first (LIFO)
        if (node->right) st.push(node->right);
        if (node->left) st.push(node->left);
    }
    return preorder;
}`,
  java: `// Java: Iterative Preorder Traversal
// Time Complexity: O(N) | Space: O(H)
import java.util.*;

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> preorder = new ArrayList<>();
        if (root == null) return preorder;

        Stack<TreeNode> st = new Stack<>();
        st.push(root);

        while (!st.isEmpty()) {
            TreeNode node = st.pop();
            preorder.add(node.val);

            // Push right child first, then left child
            if (node.right != null) st.push(node.right);
            if (node.left != null) st.push(node.left);
        }
        return preorder;
    }
}`,
  python: `# Python 3: Iterative Preorder Traversal
# Time Complexity: O(N) | Space: O(H)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def preorder_traversal(root: TreeNode | None) -> list[int]:
    if not root:
        return []

    preorder = []
    st = [root]

    while st:
        node = st.pop()
        preorder.append(node.val)
        # Push right then left so left is popped first
        if node.right:
            st.append(node.right)
        if node.left:
            st.append(node.left)

    return preorder`,
  javascript: `// JavaScript: Iterative Preorder Traversal
// Time Complexity: O(N) | Space: O(H)
function preorderTraversal(root) {
    if (!root) return [];
    const preorder = [];
    const st = [root];

    while (st.length > 0) {
        const node = st.pop();
        preorder.push(node.val);

        // Push right first, then left (LIFO)
        if (node.right) st.push(node.right);
        if (node.left) st.push(node.left);
    }
    return preorder;
}`
};

const treeRoot = {
  val: 1,
  left: {
    val: 2,
    left: { val: 4, left: null, right: null },
    right: { val: 5, left: null, right: null }
  },
  right: {
    val: 3,
    left: { val: 6, left: null, right: null },
    right: { val: 7, left: null, right: null }
  }
};

export const steps = [
  {
    phase: 'INITIALIZE',
    title: 'Initialize Stack with Root (1)',
    activeVal: 1,
    tree: treeRoot,
    visitedVals: [],
    traversal: [],
    traversalLabel: 'Preorder Output Stream',
    customCard: {
      title: 'Explicit Stack Invariant (LIFO)',
      rows: [
        { label: 'Current Action', value: 'st.push(Root 1)', accent: true },
        { label: 'Stack Contents [top -> bottom]', value: '[Node 1]' },
        { label: 'Push Ordering Rule', value: 'Right child pushed first, then left child' }
      ]
    },
    variables: {
      stack: '[1]',
      stackTop: 1,
      outputLength: 0
    },
    metrics: {
      stackSize: 1,
      visitedCount: 0,
      currentAction: 'PUSH ROOT'
    },
    explain: 'Iterative preorder starts by pushing the root node onto an explicit stack. Preorder processes Root before descending.'
  },
  {
    phase: 'POP_AND_RECORD',
    title: 'Pop 1 -> Output [1] -> Push Right (3) then Left (2)',
    activeVal: 1,
    tree: treeRoot,
    visitedVals: [1],
    traversal: [1],
    traversalLabel: 'Preorder Output Stream',
    customCard: {
      title: 'Pop Root & Enqueue Children',
      rows: [
        { label: 'Popped Node', value: 'Node 1 recorded to output', accent: true },
        { label: 'Pushed Children', value: 'Push right child 3, then left child 2' },
        { label: 'Stack Contents [top -> bottom]', value: '[2, 3]' }
      ]
    },
    variables: {
      popped: 1,
      stack: '[2, 3]',
      stackTop: 2,
      output: '[1]'
    },
    metrics: {
      stackSize: 2,
      visitedCount: 1,
      currentAction: 'POP 1, PUSH 3, 2'
    },
    explain: 'Pop Node 1 and add to output. Node 1 has children 2 and 3. Push right child 3 first, then left child 2 on top of the stack.'
  },
  {
    phase: 'PROCESS_NODE_2',
    title: 'Pop 2 -> Output [1, 2] -> Push Right (5) then Left (4)',
    activeVal: 2,
    tree: treeRoot,
    visitedVals: [1, 2],
    traversal: [1, 2],
    traversalLabel: 'Preorder Output Stream',
    customCard: {
      title: 'Process Left Child Node 2',
      rows: [
        { label: 'Popped Node', value: 'Node 2 recorded to output', accent: true },
        { label: 'Pushed Children', value: 'Push right child 5, then left child 4' },
        { label: 'Stack Contents [top -> bottom]', value: '[4, 5, 3]' }
      ]
    },
    variables: {
      popped: 2,
      stack: '[4, 5, 3]',
      stackTop: 4,
      output: '[1, 2]'
    },
    metrics: {
      stackSize: 3,
      visitedCount: 2,
      currentAction: 'POP 2, PUSH 5, 4'
    },
    explain: 'Pop Node 2 from the stack and add to output. Node 2 has children 4 and 5. Push right child 5 first, then left child 4 on top.'
  },
  {
    phase: 'PROCESS_LEAF_4',
    title: 'Pop 4 -> Output [1, 2, 4] (Leaf Node)',
    activeVal: 4,
    tree: treeRoot,
    visitedVals: [1, 2, 4],
    traversal: [1, 2, 4],
    traversalLabel: 'Preorder Output Stream',
    customCard: {
      title: 'Leaf Node 4 Processing',
      rows: [
        { label: 'Popped Node', value: 'Node 4 recorded to output', accent: true },
        { label: 'Children Check', value: 'Left & Right null -> nothing pushed' },
        { label: 'Stack Contents [top -> bottom]', value: '[5, 3]' }
      ]
    },
    variables: {
      popped: 4,
      stack: '[5, 3]',
      stackTop: 5,
      output: '[1, 2, 4]'
    },
    metrics: {
      stackSize: 2,
      visitedCount: 3,
      currentAction: 'POP LEAF 4'
    },
    explain: 'Pop Node 4. Since Node 4 is a leaf, no children are pushed. Stack top is now Node 5.'
  },
  {
    phase: 'PROCESS_LEAF_5',
    title: 'Pop 5 -> Output [1, 2, 4, 5] (Leaf Node)',
    activeVal: 5,
    tree: treeRoot,
    visitedVals: [1, 2, 4, 5],
    traversal: [1, 2, 4, 5],
    traversalLabel: 'Preorder Output Stream',
    customCard: {
      title: 'Leaf Node 5 Processing',
      rows: [
        { label: 'Popped Node', value: 'Node 5 recorded to output', accent: true },
        { label: 'Left Subtree Status', value: 'Left subtree completely traversed!' },
        { label: 'Stack Contents [top -> bottom]', value: '[3]' }
      ]
    },
    variables: {
      popped: 5,
      stack: '[3]',
      stackTop: 3,
      output: '[1, 2, 4, 5]'
    },
    metrics: {
      stackSize: 1,
      visitedCount: 4,
      currentAction: 'POP LEAF 5'
    },
    explain: 'Pop Node 5 and record to output. Node 5 is a leaf. Entire left subtree of root 1 is now traversed. Stack top is now Node 3.'
  },
  {
    phase: 'PROCESS_NODE_3',
    title: 'Pop 3 -> Output [1, 2, 4, 5, 3] -> Push Right (7) then Left (6)',
    activeVal: 3,
    tree: treeRoot,
    visitedVals: [1, 2, 4, 5, 3],
    traversal: [1, 2, 4, 5, 3],
    traversalLabel: 'Preorder Output Stream',
    customCard: {
      title: 'Right Subtree Processing (Node 3)',
      rows: [
        { label: 'Popped Node', value: 'Node 3 recorded to output', accent: true },
        { label: 'Pushed Children', value: 'Push right child 7, then left child 6' },
        { label: 'Stack Contents [top -> bottom]', value: '[6, 7]' }
      ]
    },
    variables: {
      popped: 3,
      stack: '[6, 7]',
      stackTop: 6,
      output: '[1, 2, 4, 5, 3]'
    },
    metrics: {
      stackSize: 2,
      visitedCount: 5,
      currentAction: 'POP 3, PUSH 7, 6'
    },
    explain: 'Pop Node 3. Record to output. Push its right child 7 first, then its left child 6.'
  },
  {
    phase: 'PROCESS_LEAVES_6_AND_7',
    title: 'Pop 6 & 7 -> Output [1, 2, 4, 5, 3, 6, 7]',
    activeVal: 6,
    tree: treeRoot,
    visitedVals: [1, 2, 4, 5, 3, 6, 7],
    traversal: [1, 2, 4, 5, 3, 6, 7],
    traversalLabel: 'Preorder Output Stream',
    customCard: {
      title: 'Final Leaves Popped',
      rows: [
        { label: 'Popped 6', value: 'Node 6 is leaf -> recorded' },
        { label: 'Popped 7', value: 'Node 7 is leaf -> recorded', accent: true },
        { label: 'Stack Contents', value: '[] (Empty)' }
      ]
    },
    variables: {
      popped: 7,
      stack: '[]',
      stackTop: 'null',
      output: '[1, 2, 4, 5, 3, 6, 7]'
    },
    metrics: {
      stackSize: 0,
      visitedCount: 7,
      currentAction: 'POP 6, 7'
    },
    explain: 'Pop Node 6 then Node 7. Both are leaf nodes. Stack is now completely empty.'
  },
  {
    phase: 'COMPLETE',
    title: 'Iterative Preorder Complete: [1, 2, 4, 5, 3, 6, 7]',
    activeVal: 1,
    tree: treeRoot,
    visitedVals: [1, 2, 3, 4, 5, 6, 7],
    traversal: [1, 2, 4, 5, 3, 6, 7],
    traversalLabel: 'Final Preorder Result',
    customCard: {
      title: 'Traversal Verification',
      rows: [
        { label: 'Preorder Array', value: '[1, 2, 4, 5, 3, 6, 7]', accent: true },
        { label: 'Total Nodes Visited', value: '7 / 7' },
        { label: 'Auxiliary Space Used', value: 'O(H) = O(log N) stack frames' }
      ]
    },
    variables: {
      stack: '[]',
      totalNodes: 7,
      result: '[1, 2, 4, 5, 3, 6, 7]'
    },
    metrics: {
      stackSize: 0,
      visitedCount: 7,
      currentAction: 'DONE'
    },
    explain: 'Preorder traversal has finished in exact Root -> Left -> Right order using an explicit LIFO stack with O(H) auxiliary space.'
  }
];

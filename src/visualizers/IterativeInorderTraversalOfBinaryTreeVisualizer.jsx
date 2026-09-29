export const rendererType = 'tree';

export const meta = {
  title: 'Iterative Inorder Traversal',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(H) using explicit stack',
  description: 'Traverses a binary tree in Left &rarr; Root &rarr; Right order iteratively using an auxiliary stack to simulate the recursion call stack.'
};

export const ideaMap = {
  title: 'Iterative Inorder Traversal Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Deep Left Dive',
      detail: 'While curr != null, push curr onto the stack and advance curr = curr.left until reaching the leftmost null.'
    },
    {
      id: 'step2',
      label: 'Stack Pop (Process Root)',
      detail: 'When curr is null, pop node = stack.top(), record node.val into the inorder sequence.'
    },
    {
      id: 'step3',
      label: 'Right Subtree Transition',
      detail: 'Advance curr = node.right to explore its right branch in subsequent iterations.'
    },
    {
      id: 'step4',
      label: 'Termination',
      detail: 'The algorithm terminates when both curr == null and stack is empty, having visited every node.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Iterative Inorder Traversal using Stack
// Time Complexity: O(N) | Space Complexity: O(H)
#include <vector>
#include <stack>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<int> inorderTraversal(TreeNode* root) {
    vector<int> inorder;
    stack<TreeNode*> st;
    TreeNode* node = root;

    while (true) {
        if (node != nullptr) {
            st.push(node);
            node = node->left;
        } else {
            if (st.empty()) break;
            node = st.top();
            st.pop();
            inorder.push_back(node->val);
            node = node->right;
        }
    }
    return inorder;
}`,
  java: `// Java: Iterative Inorder Traversal using Stack
// Time Complexity: O(N) | Space Complexity: O(H)
import java.util.*;

class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> inorder = new ArrayList<>();
        Stack<TreeNode> st = new Stack<>();
        TreeNode node = root;

        while (true) {
            if (node != null) {
                st.push(node);
                node = node.left;
            } else {
                if (st.isEmpty()) break;
                node = st.pop();
                inorder.add(node.val);
                node = node.right;
            }
        }
        return inorder;
    }
}`,
  python: `# Python: Iterative Inorder Traversal using Stack
# Time Complexity: O(N) | Space Complexity: O(H)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorderTraversal(root: TreeNode | None) -> list[int]:
    inorder = []
    st = []
    curr = root

    while True:
        if curr:
            st.append(curr)
            curr = curr.left
        else:
            if not st:
                break
            curr = st.pop()
            inorder.append(curr.val)
            curr = curr.right

    return inorder`,
  javascript: `// JavaScript: Iterative Inorder Traversal using Stack
// Time Complexity: O(N) | Space Complexity: O(H)
function inorderTraversal(root) {
  const inorder = [];
  const st = [];
  let curr = root;

  while (true) {
    if (curr !== null) {
      st.push(curr);
      curr = curr.left;
    } else {
      if (st.length === 0) break;
      curr = st.pop();
      inorder.push(curr.val);
      curr = curr.right;
    }
  }
  return inorder;
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
    left: { val: 6, left: null, right: null },
    right: { val: 7, left: null, right: null }
  }
};

export const steps = [
  {
    phase: 'DIVE_LEFT',
    title: '1. Descend Left: Push 1, 2, 4 to Stack',
    tree: sampleTree,
    activeVal: 4,
    visitedVals: [],
    nodeLabels: { 1: 'st[0]', 2: 'st[1]', 4: 'st[2]' },
    customCard: {
      title: 'Leftmost Path Descent',
      rows: [
        { label: 'Current Node', value: 'Node 4 (hit null left)', accent: true },
        { label: 'Auxiliary Stack', value: '[1, 2, 4]' },
        { label: 'Inorder List', value: '[]' },
        { label: 'Next Action', value: 'Pop stack top (4)' }
      ]
    },
    variables: {
      curr: 4,
      stack: '[1, 2, 4]',
      inorder: '[]',
      action: 'Push left path'
    },
    metrics: [
      { label: 'Stack Size', value: '3' },
      { label: 'Popped', value: 'None' },
      { label: 'Inorder Count', value: '0', highlight: true }
    ],
    explain: 'Starting from root 1, push nodes along the left boundary: push(1), push(2), push(4). Node 4.left is null, initiating the pop cycle.'
  },
  {
    phase: 'POP_AND_RECORD',
    title: '2. Pop 4 & 2: Record [4, 2], Advance to Node 5',
    tree: sampleTree,
    activeVal: 2,
    visitedVals: [4, 2],
    nodeLabels: { 1: 'st[0]', 2: 'popped', 4: 'popped', 5: 'next target' },
    customCard: {
      title: 'Subtree Roots Popped',
      rows: [
        { label: 'Pop 1', value: 'Node 4 popped & added; 4.right is null' },
        { label: 'Pop 2', value: 'Node 2 popped & added; explore 2.right (Node 5)', accent: true },
        { label: 'Auxiliary Stack', value: '[1]' },
        { label: 'Inorder List', value: '[4, 2]' }
      ]
    },
    variables: {
      curr: 5,
      stack: '[1]',
      inorder: '[4, 2]',
      action: 'Pop 4, pop 2, move right to 5'
    },
    metrics: [
      { label: 'Stack Size', value: '1' },
      { label: 'Last Popped', value: '2' },
      { label: 'Inorder Count', value: '2', highlight: true }
    ],
    explain: 'Pop 4 and add to inorder. Since 4.right is null, pop 2 and add to inorder. Advance curr to 2.right (Node 5).'
  },
  {
    phase: 'PROCESS_SUBTREE_AND_ROOT',
    title: '3. Process 5, Then Pop Root 1: Inorder = [4, 2, 5, 1]',
    tree: sampleTree,
    activeVal: 1,
    visitedVals: [4, 2, 5, 1],
    nodeLabels: { 1: 'popped', 2: 'done', 4: 'done', 5: 'done', 3: 'next right root' },
    customCard: {
      title: 'Global Root Visited',
      rows: [
        { label: 'Completed Left Subtree', value: '[4, 2, 5]', accent: true },
        { label: 'Root 1 Popped', value: 'Inorder becomes [4, 2, 5, 1]', accent: true },
        { label: 'Transition', value: 'Advance to root.right (Node 3)' },
        { label: 'Auxiliary Stack', value: '[] (Ready for right subtree)' }
      ]
    },
    variables: {
      curr: 3,
      stack: '[]',
      inorder: '[4, 2, 5, 1]',
      action: 'Transition to right tree at 3'
    },
    metrics: [
      { label: 'Stack Size', value: '0' },
      { label: 'Last Popped', value: '1 (Root)' },
      { label: 'Inorder Count', value: '4', highlight: true }
    ],
    explain: 'Node 5 is popped and added. With left subtree complete, pop root 1 and record it. Inorder is now [4, 2, 5, 1]. Advance to 1.right (Node 3).'
  },
  {
    phase: 'COMPLETE',
    title: '4. Traversal Complete: [4, 2, 5, 1, 6, 3, 7]',
    tree: sampleTree,
    activeVal: null,
    visitedVals: [4, 2, 5, 1, 6, 3, 7],
    nodeLabels: { 1: '4th', 2: '2nd', 3: '6th', 4: '1st', 5: '3rd', 6: '5th', 7: '7th' },
    customCard: {
      title: 'Iterative Traversal Summary',
      rows: [
        { label: 'Complete Inorder List', value: '[4, 2, 5, 1, 6, 3, 7]', accent: true },
        { label: 'Order Pattern', value: 'Left Subtree -> Root -> Right Subtree' },
        { label: 'Stack Peak Depth', value: 'Height H = 3' },
        { label: 'Time & Space', value: 'Time: O(N) | Space: O(H)' }
      ]
    },
    variables: {
      curr: 'null',
      stack: '[]',
      inorder: '[4, 2, 5, 1, 6, 3, 7]',
      status: 'Complete'
    },
    metrics: [
      { label: 'Stack Size', value: '0' },
      { label: 'Total Visited', value: '7' },
      { label: 'Status', value: 'Complete', highlight: true }
    ],
    explain: 'Right subtree is processed similarly (6, 3, 7). Final inorder traversal [4, 2, 5, 1, 6, 3, 7] completes in linear O(N) time.'
  }
];

export const rendererType = 'tree';

export const meta = {
  title: 'Morris Preorder Traversal',
  category: 'Binary Trees',
  difficulty: 'Hard',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1) strictly constant space',
  description: 'Traverses a binary tree in Preorder (Root -> Left -> Right) with strictly O(1) auxiliary space, visiting the current node right before establishing the temporary threaded predecessor link.'
};

export const ideaMap = {
  title: 'Morris Preorder Threaded Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Check Left Child',
      detail: 'If curr.left is null, print curr.val and move directly to curr.right.'
    },
    {
      id: 'step2',
      label: 'Find Inorder Predecessor',
      detail: 'Find the rightmost node of curr.left (prev.right != null && prev.right != curr).'
    },
    {
      id: 'step3',
      label: 'Establish Thread & Visit',
      detail: 'If prev.right is null: print curr.val (Preorder rule!), set prev.right = curr, move curr = curr.left.'
    },
    {
      id: 'step4',
      label: 'Remove Thread & Right Step',
      detail: 'If prev.right == curr: thread already exists; dismantle it (prev.right = null) and move curr = curr.right.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Morris Preorder Traversal in O(1) Space
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<int> morrisPreorder(TreeNode* root) {
    vector<int> preorder;
    TreeNode* curr = root;

    while (curr != nullptr) {
        if (curr->left == nullptr) {
            preorder.push_back(curr->val);
            curr = curr->right;
        } else {
            TreeNode* prev = curr->left;
            while (prev->right != nullptr && prev->right != curr) {
                prev = prev->right;
            }

            if (prev->right == nullptr) {
                // Preorder: Visit node BEFORE descending left
                preorder.push_back(curr->val);
                prev->right = curr;
                curr = curr->left;
            } else {
                // Thread already exists: cut thread and go right
                prev->right = nullptr;
                curr = curr->right;
            }
        }
    }
    return preorder;
}`,
  java: `// Java: Morris Preorder Traversal in O(1) Space
// Time Complexity: O(N) | Space Complexity: O(1)
import java.util.*;

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public List<Integer> morrisPreorder(TreeNode root) {
        List<Integer> preorder = new ArrayList<>();
        TreeNode curr = root;

        while (curr != null) {
            if (curr.left == null) {
                preorder.add(curr.val);
                curr = curr.right;
            } else {
                TreeNode prev = curr.left;
                while (prev.right != null && prev.right != curr) {
                    prev = prev.right;
                }

                if (prev.right == null) {
                    preorder.add(curr.val);
                    prev.right = curr;
                    curr = curr.left;
                } else {
                    prev.right = null;
                    curr = curr.right;
                }
            }
        }
        return preorder;
    }
}`,
  python: `# Python 3: Morris Preorder Traversal in O(1) Space
# Time Complexity: O(N) | Space Complexity: O(1)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def morris_preorder(root: TreeNode | None) -> list[int]:
    preorder = []
    curr = root

    while curr:
        if not curr.left:
            preorder.append(curr.val)
            curr = curr.right
        else:
            prev = curr.left
            while prev.right and prev.right != curr:
                prev = prev.right

            if not prev.right:
                preorder.append(curr.val)
                prev.right = curr
                curr = curr.left
            else:
                prev.right = None
                curr = curr.right

    return preorder`,
  javascript: `// JavaScript: Morris Preorder Traversal in O(1) Space
// Time Complexity: O(N) | Space Complexity: O(1)
function morrisPreorder(root) {
    const preorder = [];
    let curr = root;

    while (curr !== null) {
        if (curr.left === null) {
            preorder.push(curr.val);
            curr = curr.right;
        } else {
            let prev = curr.left;
            while (prev.right !== null && prev.right !== curr) {
                prev = prev.right;
            }

            if (prev.right === null) {
                preorder.push(curr.val);
                prev.right = curr;
                curr = curr.left;
            } else {
                prev.right = null;
                curr = curr.right;
            }
        }
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
    left: null,
    right: null
  }
};

export const steps = [
  {
    phase: 'INITIALIZE',
    title: 'Initialize Morris Preorder Pointer at Root (1)',
    activeVal: 1,
    tree: treeRoot,
    visitedVals: [],
    traversal: [],
    traversalLabel: 'Morris Preorder Stream',
    customCard: {
      title: 'O(1) Auxiliary Space Invariant',
      rows: [
        { label: 'Current Node', value: 'curr = Node(1) [Root]' },
        { label: 'Condition', value: 'curr.left != null -> must find inorder predecessor' },
        { label: 'Thread Status', value: 'No temporary threads created yet', accent: true }
      ]
    },
    variables: {
      curr: 1,
      'curr.left': 2,
      predecessor: 'Searching...',
      spaceComplexity: 'O(1)'
    },
    metrics: {
      threadsActive: 0,
      nodesVisited: 0,
      currentAction: 'CHECK LEFT CHILD'
    },
    explain: 'Start Morris traversal at root 1. Since curr.left (2) exists, locate the inorder predecessor in its left subtree to establish a return thread.'
  },
  {
    phase: 'ESTABLISH_THREAD_1',
    title: 'Find Predecessor (5) -> Visit 1 -> Thread 5.right = 1 -> Move to 2',
    activeVal: 1,
    tree: treeRoot,
    visitedVals: [1],
    traversal: [1],
    traversalLabel: 'Morris Preorder Stream',
    nodeLabels: { 1: 'CURR (VISITED)', 5: 'PRED -> 1' },
    customCard: {
      title: 'Preorder Visit & Thread Creation',
      rows: [
        { label: 'Preorder Action', value: 'Visit Node 1 BEFORE moving left!', accent: true },
        { label: 'Thread Created', value: 'Node(5).right = Node(1)' },
        { label: 'Next Step', value: 'curr = curr.left (Node 2)' }
      ]
    },
    variables: {
      curr: 2,
      predecessor: 5,
      thread: '5.right -> 1',
      output: '[1]'
    },
    metrics: {
      threadsActive: 1,
      nodesVisited: 1,
      currentAction: 'THREAD CREATED (5 -> 1)'
    },
    explain: 'Rightmost node in left subtree of 1 is Node 5. Since 5.right is null, visit Node 1 first (Preorder rule), set thread 5.right = 1, and move left to Node 2.'
  },
  {
    phase: 'ESTABLISH_THREAD_2',
    title: 'At Node 2: Predecessor (4) -> Visit 2 -> Thread 4.right = 2 -> Move to 4',
    activeVal: 2,
    tree: treeRoot,
    visitedVals: [1, 2],
    traversal: [1, 2],
    traversalLabel: 'Morris Preorder Stream',
    nodeLabels: { 2: 'CURR (VISITED)', 4: 'PRED -> 2', 5: 'PRED -> 1' },
    customCard: {
      title: 'Thread Creation at Node 2',
      rows: [
        { label: 'Predecessor Found', value: 'Node 4 (rightmost of 2.left)' },
        { label: 'Preorder Action', value: 'Visit Node 2 recorded to output', accent: true },
        { label: 'Thread Created', value: 'Node(4).right = Node(2)' }
      ]
    },
    variables: {
      curr: 4,
      predecessor: 4,
      thread: '4.right -> 2',
      output: '[1, 2]'
    },
    metrics: {
      threadsActive: 2,
      nodesVisited: 2,
      currentAction: 'THREAD CREATED (4 -> 2)'
    },
    explain: 'At Node 2, curr.left is 4. Its rightmost node is 4 itself. Visit Node 2, create thread 4.right = 2, and move curr = curr.left (Node 4).'
  },
  {
    phase: 'VISIT_LEAF_4',
    title: 'At Node 4: Left is Null -> Visit 4 -> Follow Thread to 2',
    activeVal: 4,
    tree: treeRoot,
    visitedVals: [1, 2, 4],
    traversal: [1, 2, 4],
    traversalLabel: 'Morris Preorder Stream',
    nodeLabels: { 4: 'VISITED (LEAF)', 2: 'TARGET', 5: 'PRED -> 1' },
    customCard: {
      title: 'Traverse Left Leaf via Thread',
      rows: [
        { label: 'Condition', value: 'curr.left == null' },
        { label: 'Visit Action', value: 'Append Node 4 to preorder output', accent: true },
        { label: 'Transition', value: 'Follow thread: curr = curr.right (returns to 2)' }
      ]
    },
    variables: {
      curr: 2,
      'curr.left': 'null',
      output: '[1, 2, 4]'
    },
    metrics: {
      threadsActive: 2,
      nodesVisited: 3,
      currentAction: 'VISIT 4 & FOLLOW THREAD'
    },
    explain: 'Node 4 has no left child. Record 4 into output. Follow the thread 4.right back to Node 2.'
  },
  {
    phase: 'REMOVE_THREAD_2',
    title: 'At Node 2 Again: Thread Detected -> Cut Thread (4.right = null) -> Move to 5',
    activeVal: 2,
    tree: treeRoot,
    visitedVals: [1, 2, 4],
    traversal: [1, 2, 4],
    traversalLabel: 'Morris Preorder Stream',
    nodeLabels: { 2: 'CURR (RESTORED)', 5: 'TARGET (RIGHT CHILD)' },
    customCard: {
      title: 'Restore Tree Structure',
      rows: [
        { label: 'Detection', value: 'prev.right == curr (Thread exists from 4)', accent: true },
        { label: 'Restoration', value: 'prev.right = null (Cut thread)' },
        { label: 'Next Node', value: 'curr = curr.right (Node 5)' }
      ]
    },
    variables: {
      curr: 5,
      threadRemoved: '4.right = null',
      output: '[1, 2, 4]'
    },
    metrics: {
      threadsActive: 1,
      nodesVisited: 3,
      currentAction: 'CUT THREAD (4 -> 2)'
    },
    explain: 'Re-evaluating Node 2 finds prev.right == curr. This signals the left subtree is done. Sever the temporary thread and step right to Node 5.'
  },
  {
    phase: 'VISIT_LEAF_5',
    title: 'At Node 5: Left is Null -> Visit 5 -> Follow Thread to Root (1)',
    activeVal: 5,
    tree: treeRoot,
    visitedVals: [1, 2, 4, 5],
    traversal: [1, 2, 4, 5],
    traversalLabel: 'Morris Preorder Stream',
    nodeLabels: { 5: 'VISITED (LEAF)', 1: 'TARGET' },
    customCard: {
      title: 'Traverse Node 5',
      rows: [
        { label: 'Condition', value: 'curr.left == null' },
        { label: 'Visit Action', value: 'Append Node 5 to preorder output', accent: true },
        { label: 'Transition', value: 'Follow thread: curr = curr.right (returns to Root 1)' }
      ]
    },
    variables: {
      curr: 1,
      'curr.left': 'null',
      output: '[1, 2, 4, 5]'
    },
    metrics: {
      threadsActive: 1,
      nodesVisited: 4,
      currentAction: 'VISIT 5 & FOLLOW THREAD'
    },
    explain: 'Node 5 has no left child. Record 5 into output. Follow the thread 5.right back to root Node 1.'
  },
  {
    phase: 'REMOVE_THREAD_1',
    title: 'At Root 1: Cut Thread (5.right = null) -> Move to Right Subtree (3)',
    activeVal: 1,
    tree: treeRoot,
    visitedVals: [1, 2, 4, 5],
    traversal: [1, 2, 4, 5],
    traversalLabel: 'Morris Preorder Stream',
    nodeLabels: { 1: 'CURR (RESTORED)', 3: 'TARGET (RIGHT CHILD)' },
    customCard: {
      title: 'Restore Root 1 Tree Link',
      rows: [
        { label: 'Detection', value: 'prev.right == curr (Thread from 5 exists)', accent: true },
        { label: 'Restoration', value: 'prev.right = null (Cut thread)' },
        { label: 'Next Step', value: 'curr = curr.right (Node 3)' }
      ]
    },
    variables: {
      curr: 3,
      threadRemoved: '5.right = null',
      output: '[1, 2, 4, 5]'
    },
    metrics: {
      threadsActive: 0,
      nodesVisited: 4,
      currentAction: 'CUT THREAD (5 -> 1)'
    },
    explain: 'At Node 1, thread from 5 is detected. The entire left branch has been visited. Sever thread 5.right = null and advance right to Node 3.'
  },
  {
    phase: 'VISIT_NODE_3',
    title: 'At Node 3: Left is Null -> Visit 3 -> curr = curr.right (null)',
    activeVal: 3,
    tree: treeRoot,
    visitedVals: [1, 2, 4, 5, 3],
    traversal: [1, 2, 4, 5, 3],
    traversalLabel: 'Morris Preorder Stream',
    nodeLabels: { 3: 'VISITED (LEAF)' },
    customCard: {
      title: 'Visit Node 3',
      rows: [
        { label: 'Condition', value: 'curr.left == null' },
        { label: 'Visit Action', value: 'Append Node 3 to preorder output', accent: true },
        { label: 'Termination', value: 'curr = curr.right (null) terminates while loop' }
      ]
    },
    variables: {
      curr: 'null',
      output: '[1, 2, 4, 5, 3]'
    },
    metrics: {
      threadsActive: 0,
      nodesVisited: 5,
      currentAction: 'VISIT 3 & FINISH'
    },
    explain: 'Node 3 has no left child. Record 3 into output. curr.right is null, ending the traversal.'
  },
  {
    phase: 'COMPLETE',
    title: 'Morris Preorder Traversal Complete in Strictly O(1) Space',
    activeVal: 1,
    tree: treeRoot,
    visitedVals: [1, 2, 3, 4, 5],
    traversal: [1, 2, 4, 5, 3],
    traversalLabel: 'Final Preorder Result',
    customCard: {
      title: 'Algorithm Verification & Tree Restoration',
      rows: [
        { label: 'Final Preorder Sequence', value: '[1, 2, 4, 5, 3]', accent: true },
        { label: 'Space Complexity', value: 'O(1) Auxiliary Space (0 stack frames, 0 recursion)' },
        { label: 'Tree Integrity', value: '100% restored to original topology' }
      ]
    },
    variables: {
      result: '[1, 2, 4, 5, 3]',
      threadsRemaining: 0,
      status: 'RESTORED & COMPLETE'
    },
    metrics: {
      threadsActive: 0,
      nodesVisited: 5,
      currentAction: 'DONE'
    },
    explain: 'Morris Preorder traversal has completed in O(N) time and strictly O(1) auxiliary space. All temporary threads were dismantled and the tree structure is unaltered.'
  }
];

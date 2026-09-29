export const rendererType = 'tree';

export const meta = {
  title: 'Morris Inorder Traversal',
  category: 'Binary Trees',
  difficulty: 'Hard',
  timeComplexity: 'O(N) amortized linear scan',
  spaceComplexity: 'O(1) strictly constant space',
  description: 'Traverses a binary tree in Inorder (Left &rarr; Root &rarr; Right) with strictly O(1) auxiliary space using temporary threaded back-links from in-order predecessors back to the subtree root.'
};

export const ideaMap = {
  title: 'Morris Threaded Traversal Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Predecessor Search',
      detail: 'If curr.left exists, find rightmost node prev in curr.left where prev.right != null && prev.right != curr.'
    },
    {
      id: 'step2',
      label: 'Thread Creation (prev.right == null)',
      detail: 'Establish a temporary thread prev.right = curr, and advance curr = curr.left.'
    },
    {
      id: 'step3',
      label: 'Thread Destruction (prev.right == curr)',
      detail: 'If the thread exists, restore original topology prev.right = null, visit curr.val, and advance curr = curr.right.'
    },
    {
      id: 'step4',
      label: 'Direct Visit (curr.left == null)',
      detail: 'If curr.left is null, immediately record curr.val and follow curr.right (which may be a thread back to an ancestor).'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Morris Inorder Traversal in O(1) Space
// Time Complexity: O(N) | Space Complexity: O(1)
#include <vector>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<int> morrisInorder(TreeNode* root) {
    vector<int> inorder;
    TreeNode* curr = root;

    while (curr != nullptr) {
        if (curr->left == nullptr) {
            inorder.push_back(curr->val);
            curr = curr->right;
        } else {
            TreeNode* prev = curr->left;
            while (prev->right && prev->right != curr) {
                prev = prev->right;
            }

            if (prev->right == nullptr) {
                // Establish temporary thread
                prev->right = curr;
                curr = curr->left;
            } else {
                // Cut thread and visit current
                prev->right = nullptr;
                inorder.push_back(curr->val);
                curr = curr->right;
            }
        }
    }
    return inorder;
}`,
  java: `// Java: Morris Inorder Traversal in O(1) Space
// Time Complexity: O(N) | Space Complexity: O(1)
import java.util.*;

class Solution {
    public List<Integer> getInorder(TreeNode root) {
        List<Integer> inorder = new ArrayList<>();
        TreeNode curr = root;

        while (curr != null) {
            if (curr.left == null) {
                inorder.add(curr.val);
                curr = curr.right;
            } else {
                TreeNode prev = curr.left;
                while (prev.right != null && prev.right != curr) {
                    prev = prev.right;
                }

                if (prev.right == null) {
                    prev.right = curr;
                    curr = curr.left;
                } else {
                    prev.right = null;
                    inorder.add(curr.val);
                    curr = curr.right;
                }
            }
        }
        return inorder;
    }
}`,
  python: `# Python: Morris Inorder Traversal in O(1) Space
# Time Complexity: O(N) | Space Complexity: O(1)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def morrisInorder(root: TreeNode | None) -> list[int]:
    inorder = []
    curr = root

    while curr:
        if not curr.left:
            inorder.append(curr.val)
            curr = curr.right
        else:
            prev = curr.left
            while prev.right and prev.right != curr:
                prev = prev.right

            if not prev.right:
                prev.right = curr
                curr = curr.left
            else:
                prev.right = None
                inorder.append(curr.val)
                curr = curr.right

    return inorder`,
  javascript: `// JavaScript: Morris Inorder Traversal in O(1) Space
// Time Complexity: O(N) | Space Complexity: O(1)
function morrisInorder(root) {
  const inorder = [];
  let curr = root;

  while (curr !== null) {
    if (curr.left === null) {
      inorder.push(curr.val);
      curr = curr.right;
    } else {
      let prev = curr.left;
      while (prev.right && prev.right !== curr) {
        prev = prev.right;
      }

      if (prev.right === null) {
        prev.right = curr;
        curr = curr.left;
      } else {
        prev.right = null;
        inorder.push(curr.val);
        curr = curr.right;
      }
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
    left: null,
    right: { val: 6, left: null, right: null }
  }
};

export const steps = [
  {
    phase: 'THREAD_1',
    title: '1. At Node 1: Predecessor is 5 &rarr; Create Thread 5.right = 1',
    tree: sampleTree,
    activeVal: 1,
    visitedVals: [],
    nodeLabels: { 1: 'curr: 1', 5: 'thread -> 1' },
    customCard: {
      title: 'First Thread Establishment',
      rows: [
        { label: 'Current Node', value: 'Node 1', accent: true },
        { label: 'Left Subtree Predecessor', value: 'Node 5 (rightmost of 1.left)' },
        { label: 'Thread Created', value: '5.right = 1 (Temporary)', accent: true },
        { label: 'Next Step', value: 'Advance curr = curr.left (Node 2)' }
      ]
    },
    variables: {
      curr: 1,
      prev: 5,
      threadActive: '5 -> 1',
      inorder: '[]'
    },
    metrics: [
      { label: 'Current', value: '1' },
      { label: 'Thread', value: '5 -> 1' },
      { label: 'Space', value: 'O(1) strict', highlight: true }
    ],
    explain: 'At curr = 1, predecessor in left subtree is Node 5. Set 5.right = 1 to allow ascending back to root without stack memory. Advance curr to 2.'
  },
  {
    phase: 'THREAD_2',
    title: '2. At Node 2: Predecessor is 4 &rarr; Create Thread 4.right = 2',
    tree: sampleTree,
    activeVal: 2,
    visitedVals: [],
    nodeLabels: { 1: 'target', 2: 'curr: 2', 4: 'thread -> 2', 5: 'thread -> 1' },
    customCard: {
      title: 'Second Thread Establishment',
      rows: [
        { label: 'Current Node', value: 'Node 2', accent: true },
        { label: 'Left Subtree Predecessor', value: 'Node 4 (rightmost of 2.left)' },
        { label: 'Thread Created', value: '4.right = 2', accent: true },
        { label: 'Next Step', value: 'Advance curr = curr.left (Node 4)' }
      ]
    },
    variables: {
      curr: 2,
      prev: 4,
      threadActive: '4 -> 2, 5 -> 1',
      inorder: '[]'
    },
    metrics: [
      { label: 'Current', value: '2' },
      { label: 'Thread', value: '4 -> 2' },
      { label: 'Space', value: 'O(1)', highlight: true }
    ],
    explain: 'At Node 2, predecessor is 4. Establish thread 4.right = 2. Advance curr to Node 4.'
  },
  {
    phase: 'VISIT_4_AND_CUT',
    title: '3. Visit 4, Ascend Thread to 2, Cut Thread, Visit 2 &rarr; [4, 2]',
    tree: sampleTree,
    activeVal: 4,
    visitedVals: [4, 2],
    nodeLabels: { 1: 'target', 2: 'popped', 4: 'visited', 5: 'curr: 5' },
    customCard: {
      title: 'Thread Traversal & Removal',
      rows: [
        { label: 'Visit Node 4', value: 'No left child -> record 4 in inorder', accent: true },
        { label: 'Thread Followed', value: '4.right takes execution back to 2' },
        { label: 'Thread Cut', value: '4.right set back to null (tree restored)' },
        { label: 'Visit Node 2', value: 'Record 2 in inorder -> advance to 2.right (5)' }
      ]
    },
    variables: {
      curr: 5,
      cutThread: '4.right = null',
      inorder: '[4, 2]',
      treeRestored: 'Node 4 restored'
    },
    metrics: [
      { label: 'Last Visited', value: '2' },
      { label: 'Threads Cut', value: '1' },
      { label: 'Inorder', value: '[4, 2]', highlight: true }
    ],
    explain: 'Node 4 has no left child, so record 4 and follow thread to 2. At 2, thread already exists: cut thread (4.right = null), record 2, and advance to 5.'
  },
  {
    phase: 'COMPLETE',
    title: '4. Visit 5, Ascend to 1, Cut 5.right, Finish: [4, 2, 5, 1, 3, 6]',
    tree: sampleTree,
    activeVal: null,
    visitedVals: [4, 2, 5, 1, 3, 6],
    nodeLabels: { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6' },
    customCard: {
      title: 'Morris Traversal Complete',
      rows: [
        { label: 'Complete Inorder', value: '[4, 2, 5, 1, 3, 6]', accent: true },
        { label: 'Tree Restoration', value: 'All temporary threads severed (100% restored)', accent: true },
        { label: 'Amortized Time', value: 'O(N) (Each edge traversed at most 3 times)' },
        { label: 'Auxiliary Memory', value: 'Strictly O(1) space' }
      ]
    },
    variables: {
      status: 'Complete',
      finalInorder: '[4, 2, 5, 1, 3, 6]',
      restorationStatus: 'Clean'
    },
    metrics: [
      { label: 'Total Visited', value: '6' },
      { label: 'Tree Restored', value: 'YES' },
      { label: 'Aux Space', value: 'O(1)', highlight: true }
    ],
    explain: 'Node 5 is recorded; follow thread back to root 1. Cut thread 5.right = null, record 1, and process right branch {3, 6}. The original tree structure is fully preserved with zero recursion or stack overhead.'
  }
];

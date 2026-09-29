export const rendererType = 'tree';

export const meta = {
  title: 'Construct BT from Preorder & Inorder',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) hash map & recursion stack',
  description: 'Reconstructs a unique binary tree given its preorder traversal (where root is always the first element) and inorder traversal. A hash map enables O(1) root lookup in the inorder array to partition left and right subtrees.'
};

export const ideaMap = {
  title: 'Preorder & Inorder Tree Reconstruction Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Root Identification (Preorder)',
      detail: 'The first element of the current preorder segment preorder[preStart] is guaranteed to be the root of the subtree.'
    },
    {
      id: 'step2',
      label: 'O(1) Inorder Root Lookup',
      detail: 'Locate the root in inorder using a precomputed hash map at inRoot = inMap[root.val].'
    },
    {
      id: 'step3',
      label: 'Subtree Size Partitioning',
      detail: 'Calculate left subtree size numsLeft = inRoot - inStart. Inorder splits into left [inStart, inRoot - 1] and right [inRoot + 1, inEnd].'
    },
    {
      id: 'step4',
      label: 'Recursive Preorder Slicing',
      detail: 'Preorder splits into left [preStart + 1, preStart + numsLeft] and right [preStart + numsLeft + 1, preEnd].'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Construct Binary Tree from Preorder and Inorder (LeetCode 105)
// Time Complexity: O(N) | Space Complexity: O(N)
#include <vector>
#include <unordered_map>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
private:
    TreeNode* build(vector<int>& preorder, int preStart, int preEnd,
                    vector<int>& inorder, int inStart, int inEnd,
                    unordered_map<int, int>& inMap) {
        if (preStart > preEnd || inStart > inEnd) return nullptr;

        TreeNode* root = new TreeNode(preorder[preStart]);
        int inRoot = inMap[root->val];
        int numsLeft = inRoot - inStart;

        root->left = build(preorder, preStart + 1, preStart + numsLeft,
                           inorder, inStart, inRoot - 1, inMap);
        root->right = build(preorder, preStart + numsLeft + 1, preEnd,
                            inorder, inRoot + 1, inEnd, inMap);

        return root;
    }

public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        unordered_map<int, int> inMap;
        for (int i = 0; i < inorder.size(); i++) {
            inMap[inorder[i]] = i;
        }
        return build(preorder, 0, preorder.size() - 1,
                     inorder, 0, inorder.size() - 1, inMap);
    }
};`,
  java: `// Java: Construct Binary Tree from Preorder and Inorder (LeetCode 105)
// Time Complexity: O(N) | Space Complexity: O(N)
import java.util.HashMap;
import java.util.Map;

class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        Map<Integer, Integer> inMap = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            inMap.put(inorder[i], i);
        }
        return build(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1, inMap);
    }

    private TreeNode build(int[] preorder, int preStart, int preEnd,
                           int[] inorder, int inStart, int inEnd, Map<Integer, Integer> inMap) {
        if (preStart > preEnd || inStart > inEnd) return null;

        TreeNode root = new TreeNode(preorder[preStart]);
        int inRoot = inMap.get(root.val);
        int numsLeft = inRoot - inStart;

        root.left = build(preorder, preStart + 1, preStart + numsLeft,
                          inorder, inStart, inRoot - 1, inMap);
        root.right = build(preorder, preStart + numsLeft + 1, preEnd,
                           inorder, inRoot + 1, inEnd, inMap);

        return root;
    }
}`,
  python: `# Python: Construct Binary Tree from Preorder and Inorder (LeetCode 105)
# Time Complexity: O(N) | Space Complexity: O(N)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def buildTree(preorder: list[int], inorder: list[int]) -> TreeNode | None:
    in_map = {val: i for i, val in enumerate(inorder)}

    def build(pre_start, pre_end, in_start, in_end):
        if pre_start > pre_end or in_start > in_end:
            return None

        root_val = preorder[pre_start]
        root = TreeNode(root_val)
        in_root = in_map[root_val]
        nums_left = in_root - in_start

        root.left = build(pre_start + 1, pre_start + nums_left, in_start, in_root - 1)
        root.right = build(pre_start + nums_left + 1, pre_end, in_root + 1, in_end)

        return root

    return build(0, len(preorder) - 1, 0, len(inorder) - 1)`,
  javascript: `// JavaScript: Construct Binary Tree from Preorder and Inorder (LeetCode 105)
// Time Complexity: O(N) | Space Complexity: O(N)
function buildTree(preorder, inorder) {
  const inMap = new Map();
  inorder.forEach((val, i) => inMap.set(val, i));

  function build(preStart, preEnd, inStart, inEnd) {
    if (preStart > preEnd || inStart > inEnd) return null;

    const rootVal = preorder[preStart];
    const root = { val: rootVal, left: null, right: null };
    const inRoot = inMap.get(rootVal);
    const numsLeft = inRoot - inStart;

    root.left = build(preStart + 1, preStart + numsLeft, inStart, inRoot - 1);
    root.right = build(preStart + numsLeft + 1, preEnd, inRoot + 1, inEnd);

    return root;
  }

  return build(0, preorder.length - 1, 0, inorder.length - 1);
}`
};

const treeRootOnly = {
  val: 3,
  left: null,
  right: null
};

const treeRootLeft = {
  val: 3,
  left: { val: 9, left: null, right: null },
  right: null
};

const treeRootBoth = {
  val: 3,
  left: { val: 9, left: null, right: null },
  right: { val: 20, left: null, right: null }
};

const treeFinal = {
  val: 3,
  left: { val: 9, left: null, right: null },
  right: {
    val: 20,
    left: { val: 15, left: null, right: null },
    right: { val: 7, left: null, right: null }
  }
};

export const steps = [
  {
    phase: 'ROOT_DISCOVERY',
    title: '1. Root = preorder[0] = 3. Inorder Split: Left [9], Right [15, 20, 7]',
    tree: treeRootOnly,
    activeVal: 3,
    visitedVals: [3],
    nodeLabels: { 3: 'Root: 3' },
    customCard: {
      title: 'Global Root Partitioning',
      rows: [
        { label: 'Preorder Array', value: '[3, 9, 20, 15, 7]' },
        { label: 'Inorder Array', value: '[9, 3, 15, 20, 7]' },
        { label: 'Root Element', value: 'preorder[0] = 3', accent: true },
        { label: 'Inorder Split', value: 'Left: [9] | Right: [15, 20, 7]' }
      ]
    },
    variables: {
      preorder: '[3, 9, 20, 15, 7]',
      inorder: '[9, 3, 15, 20, 7]',
      rootVal: 3,
      leftSubtreeSize: 1,
      rightSubtreeSize: 3
    },
    metrics: [
      { label: 'Root', value: '3' },
      { label: 'Left Size', value: '1' },
      { label: 'Right Size', value: '3', highlight: true }
    ],
    explain: 'The first element of preorder is root 3. In inorder, 3 sits at index 1. Everything to the left [9] forms the left subtree; everything to the right [15, 20, 7] forms the right subtree.'
  },
  {
    phase: 'BUILD_LEFT',
    title: '2. Construct Left Child: preorder[1] = 9 (Leaf Node)',
    tree: treeRootLeft,
    activeVal: 9,
    visitedVals: [3, 9],
    nodeLabels: { 3: 'Root', 9: 'Left Child' },
    customCard: {
      title: 'Left Subtree Construction',
      rows: [
        { label: 'Preorder Segment', value: '[9]' },
        { label: 'Inorder Segment', value: '[9]' },
        { label: 'Created Node', value: 'Node 9', accent: true },
        { label: 'Attachment', value: 'root.left = Node 9' }
      ]
    },
    variables: {
      activeSubtree: 'Left Subtree',
      nodeVal: 9,
      isLeaf: true
    },
    metrics: [
      { label: 'Created Node', value: '9' },
      { label: 'Parent', value: '3' },
      { label: 'Status', value: 'Left Subtree Done', highlight: true }
    ],
    explain: 'Left subtree has size 1. Node 9 has no children and attaches directly as the left child of root 3.'
  },
  {
    phase: 'BUILD_RIGHT_ROOT',
    title: '3. Construct Right Subtree Root: preorder[2] = 20',
    tree: treeRootBoth,
    activeVal: 20,
    visitedVals: [3, 9, 20],
    nodeLabels: { 3: 'Root', 9: 'Left', 20: 'Right Subtree Root' },
    customCard: {
      title: 'Right Subtree Partitioning',
      rows: [
        { label: 'Preorder Right', value: '[20, 15, 7]' },
        { label: 'Inorder Right', value: '[15, 20, 7]' },
        { label: 'Subtree Root', value: '20 (Inorder index 3)', accent: true },
        { label: 'Children Split', value: 'Left: [15] | Right: [7]' }
      ]
    },
    variables: {
      activeSubtree: 'Right Subtree',
      nodeVal: 20,
      subLeft: 15,
      subRight: 7
    },
    metrics: [
      { label: 'Right Root', value: '20' },
      { label: 'Sub-Left', value: '15' },
      { label: 'Sub-Right', value: '7', highlight: true }
    ],
    explain: 'The right subtree preorder starts at 20. In inorder, 20 separates left child 15 and right child 7.'
  },
  {
    phase: 'COMPLETE',
    title: '4. Final Tree Reconstructed with Leaves 15 and 7',
    tree: treeFinal,
    activeVal: null,
    visitedVals: [3, 9, 20, 15, 7],
    nodeLabels: { 3: 'Root', 9: 'Leaf', 20: 'Branch', 15: 'Leaf', 7: 'Leaf' },
    customCard: {
      title: 'Tree Construction Complete',
      rows: [
        { label: 'Total Nodes', value: '5 nodes assembled' },
        { label: 'Preorder Verification', value: '[3, 9, 20, 15, 7] (Matches!)', accent: true },
        { label: 'Inorder Verification', value: '[9, 3, 15, 20, 7] (Matches!)', accent: true },
        { label: 'Runtime Complexity', value: 'O(N) with hash map lookup' }
      ]
    },
    variables: {
      status: 'Fully Constructed',
      nodeCount: 5,
      height: 3
    },
    metrics: [
      { label: 'Total Nodes', value: '5' },
      { label: 'Height', value: '3' },
      { label: 'Verification', value: 'EXACT MATCH', highlight: true }
    ],
    explain: 'Nodes 15 and 7 attach as left and right children of 20. The binary tree is uniquely and completely reconstructed in O(N) time.'
  }
];

export const rendererType = 'tree';

export const meta = {
  title: 'Construct BT from Postorder & Inorder',
  category: 'Binary Trees',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) hash map & recursion stack',
  description: 'Reconstructs a unique binary tree given its postorder traversal (where root is always the last element) and inorder traversal. A hash map provides O(1) root lookup in the inorder array to partition left and right subtrees.'
};

export const ideaMap = {
  title: 'Postorder & Inorder Tree Reconstruction Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Root Identification (Postorder Tail)',
      detail: 'The last element in the current postorder range postorder[postEnd] is guaranteed to be the root of the subtree.'
    },
    {
      id: 'step2',
      label: 'Inorder Root Position Lookup',
      detail: 'Find inRoot = inMap[root.val] in O(1) time using a precomputed hash map.'
    },
    {
      id: 'step3',
      label: 'Subtree Size Partitioning',
      detail: 'numsLeft = inRoot - inStart. Inorder splits into left [inStart, inRoot - 1] and right [inRoot + 1, inEnd].'
    },
    {
      id: 'step4',
      label: 'Postorder Segment Division',
      detail: 'Postorder splits into left [postStart, postStart + numsLeft - 1] and right [postStart + numsLeft, postEnd - 1].'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Construct Binary Tree from Postorder and Inorder (LeetCode 106)
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
    TreeNode* build(vector<int>& postorder, int postStart, int postEnd,
                    vector<int>& inorder, int inStart, int inEnd,
                    unordered_map<int, int>& inMap) {
        if (postStart > postEnd || inStart > inEnd) return nullptr;

        TreeNode* root = new TreeNode(postorder[postEnd]);
        int inRoot = inMap[root->val];
        int numsLeft = inRoot - inStart;

        root->left = build(postorder, postStart, postStart + numsLeft - 1,
                           inorder, inStart, inRoot - 1, inMap);
        root->right = build(postorder, postStart + numsLeft, postEnd - 1,
                            inorder, inRoot + 1, inEnd, inMap);

        return root;
    }

public:
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        unordered_map<int, int> inMap;
        for (int i = 0; i < inorder.size(); i++) {
            inMap[inorder[i]] = i;
        }
        return build(postorder, 0, postorder.size() - 1,
                     inorder, 0, inorder.size() - 1, inMap);
    }
};`,
  java: `// Java: Construct Binary Tree from Postorder and Inorder (LeetCode 106)
// Time Complexity: O(N) | Space Complexity: O(N)
import java.util.HashMap;
import java.util.Map;

class Solution {
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        Map<Integer, Integer> inMap = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            inMap.put(inorder[i], i);
        }
        return build(postorder, 0, postorder.length - 1, inorder, 0, inorder.length - 1, inMap);
    }

    private TreeNode build(int[] postorder, int postStart, int postEnd,
                           int[] inorder, int inStart, int inEnd, Map<Integer, Integer> inMap) {
        if (postStart > postEnd || inStart > inEnd) return null;

        TreeNode root = new TreeNode(postorder[postEnd]);
        int inRoot = inMap.get(root.val);
        int numsLeft = inRoot - inStart;

        root.left = build(postorder, postStart, postStart + numsLeft - 1,
                          inorder, inStart, inRoot - 1, inMap);
        root.right = build(postorder, postStart + numsLeft, postEnd - 1,
                           inorder, inRoot + 1, inEnd, inMap);

        return root;
    }
}`,
  python: `# Python: Construct Binary Tree from Postorder and Inorder (LeetCode 106)
# Time Complexity: O(N) | Space Complexity: O(N)
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def buildTree(inorder: list[int], postorder: list[int]) -> TreeNode | None:
    in_map = {val: i for i, val in enumerate(inorder)}

    def build(post_start, post_end, in_start, in_end):
        if post_start > post_end or in_start > in_end:
            return None

        root_val = postorder[post_end]
        root = TreeNode(root_val)
        in_root = in_map[root_val]
        nums_left = in_root - in_start

        root.left = build(post_start, post_start + nums_left - 1, in_start, in_root - 1)
        root.right = build(post_start + nums_left, post_end - 1, in_root + 1, in_end)

        return root

    return build(0, len(postorder) - 1, 0, len(inorder) - 1)`,
  javascript: `// JavaScript: Construct Binary Tree from Postorder and Inorder (LeetCode 106)
// Time Complexity: O(N) | Space Complexity: O(N)
function buildTree(inorder, postorder) {
  const inMap = new Map();
  inorder.forEach((val, i) => inMap.set(val, i));

  function build(postStart, postEnd, inStart, inEnd) {
    if (postStart > postEnd || inStart > inEnd) return null;

    const rootVal = postorder[postEnd];
    const root = { val: rootVal, left: null, right: null };
    const inRoot = inMap.get(rootVal);
    const numsLeft = inRoot - inStart;

    root.left = build(postStart, postStart + numsLeft - 1, inStart, inRoot - 1);
    root.right = build(postStart + numsLeft, postEnd - 1, inRoot + 1, inEnd);

    return root;
  }

  return build(0, postorder.length - 1, 0, inorder.length - 1);
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
    title: '1. Root = postorder[last] = 3. Inorder Split: Left [9], Right [15, 20, 7]',
    tree: treeRootOnly,
    activeVal: 3,
    visitedVals: [3],
    nodeLabels: { 3: 'Root: 3' },
    customCard: {
      title: 'Postorder Root Identification',
      rows: [
        { label: 'Postorder Array', value: '[9, 15, 7, 20, 3]' },
        { label: 'Inorder Array', value: '[9, 3, 15, 20, 7]' },
        { label: 'Root Element', value: 'postorder[4] = 3 (Tail)', accent: true },
        { label: 'Inorder Split', value: 'Left: [9] | Right: [15, 20, 7]' }
      ]
    },
    variables: {
      postorder: '[9, 15, 7, 20, 3]',
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
    explain: 'In postorder, the last element is always the root (3). Locating 3 in inorder (index 1) partitions the left subtree [9] from the right subtree [15, 20, 7].'
  },
  {
    phase: 'BUILD_LEFT',
    title: '2. Construct Left Child: postorder[0] = 9 (Leaf Node)',
    tree: treeRootLeft,
    activeVal: 9,
    visitedVals: [3, 9],
    nodeLabels: { 3: 'Root', 9: 'Left Child' },
    customCard: {
      title: 'Left Subtree Construction',
      rows: [
        { label: 'Postorder Segment', value: '[9]' },
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
    explain: 'Left subtree segment has 1 element: postorder [9], inorder [9]. Node 9 is a leaf and connects as root.left.'
  },
  {
    phase: 'BUILD_RIGHT_ROOT',
    title: '3. Construct Right Subtree Root: postorder[3] = 20',
    tree: treeRootBoth,
    activeVal: 20,
    visitedVals: [3, 9, 20],
    nodeLabels: { 3: 'Root', 9: 'Left', 20: 'Right Subtree Root' },
    customCard: {
      title: 'Right Subtree Partitioning',
      rows: [
        { label: 'Postorder Right', value: '[15, 7, 20]' },
        { label: 'Inorder Right', value: '[15, 20, 7]' },
        { label: 'Subtree Root', value: '20 (Tail of postorder [15, 7, 20])', accent: true },
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
    explain: 'Right subtree postorder segment is [15, 7, 20]. The root of this subtree is its tail element, 20. In inorder, 20 separates left child 15 and right child 7.'
  },
  {
    phase: 'COMPLETE',
    title: '4. Final Tree Reconstructed with Leaves 15 and 7',
    tree: treeFinal,
    activeVal: null,
    visitedVals: [3, 9, 20, 15, 7],
    nodeLabels: { 3: 'Root', 9: 'Leaf', 20: 'Branch', 15: 'Leaf', 7: 'Leaf' },
    customCard: {
      title: 'Postorder Reconstruction Complete',
      rows: [
        { label: 'Total Nodes', value: '5 nodes assembled' },
        { label: 'Postorder Verification', value: '[9, 15, 7, 20, 3] (Exact Match!)', accent: true },
        { label: 'Inorder Verification', value: '[9, 3, 15, 20, 7] (Exact Match!)', accent: true },
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
    explain: 'Leaves 15 and 7 attach to node 20. The entire binary tree is uniquely reconstructed from postorder and inorder sequences in O(N) time.'
  }
];

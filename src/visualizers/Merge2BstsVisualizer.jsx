export const rendererType = 'tree';

export const meta = {
  title: 'Merge Two Balanced BSTs',
  category: 'Binary Search Trees',
  difficulty: 'Hard',
  timeComplexity: 'O(M + N)',
  spaceComplexity: 'O(M + N)',
  description: 'Merges two separate Binary Search Trees into a single height-balanced BST in O(M + N) time by unrolling both trees into sorted arrays via Inorder traversal, merging them with two pointers, and building a balanced tree recursively.'
};

export const ideaMap = [
  {
    id: 'inorder-linearization',
    title: 'Inorder Linearization O(M + N)',
    description: 'Traversing both BSTs in-order unrolls their 2D hierarchical structures into two sorted 1D arrays in linear time.'
  },
  {
    id: 'two-pointer-merge',
    title: 'Linear Sorted Array Merge',
    description: 'Classic two-pointer merge combines the two sorted arrays of lengths M and N into a single sorted array of size M + N.'
  },
  {
    id: 'balanced-construction',
    title: 'Divide-and-Conquer Balanced Tree Build',
    description: 'Recursively selecting the median element (mid = (L + R) / 2) as root guarantees optimal height H = O(log(M + N)).'
  },
  {
    id: 'height-minimization',
    title: 'Height Minimization Guarantee',
    description: 'Direct node-by-node insertion can produce an unbalanced tree of height O(M + N). Array unrolling and median splitting guarantees perfect balance.'
  },
  {
    id: 'optimal-space-time',
    title: 'Optimal Asymptotic Complexity',
    description: 'Every node is visited a constant number of times, achieving strictly optimal O(M + N) time and auxiliary memory.'
  }
];

export const solutions = {
  cpp: `// C++: Merge Two BSTs into a Balanced BST
// Time: O(M + N) | Space: O(M + N)
class Solution {
    void inorder(TreeNode* root, vector<int>& res) {
        if (!root) return;
        inorder(root->left, res);
        res.push_back(root->val);
        inorder(root->right, res);
    }

    TreeNode* buildBalancedBST(const vector<int>& nums, int left, int right) {
        if (left > right) return nullptr;
        int mid = left + (right - left) / 2;
        TreeNode* root = new TreeNode(nums[mid]);
        root->left = buildBalancedBST(nums, left, mid - 1);
        root->right = buildBalancedBST(nums, mid + 1, right);
        return root;
    }

public:
    TreeNode* mergeBSTs(TreeNode* root1, TreeNode* root2) {
        vector<int> a, b;
        inorder(root1, a);
        inorder(root2, b);

        // Merge two sorted arrays
        vector<int> merged;
        int i = 0, j = 0;
        while (i < a.size() && j < b.size()) {
            if (a[i] <= b[j]) merged.push_back(a[i++]);
            else merged.push_back(b[j++]);
        }
        while (i < a.size()) merged.push_back(a[i++]);
        while (j < b.size()) merged.push_back(b[j++]);

        return buildBalancedBST(merged, 0, merged.size() - 1);
    }
};`,
  java: `// Java: Merge Two BSTs into a Balanced BST
class Solution {
    private void inorder(TreeNode root, List<Integer> list) {
        if (root == null) return;
        inorder(root.left, list);
        list.add(root.val);
        inorder(root.right, list);
    }

    private TreeNode sortedListToBST(List<Integer> list, int start, int end) {
        if (start > end) return null;
        int mid = start + (end - start) / 2;
        TreeNode node = new TreeNode(list.get(mid));
        node.left = sortedListToBST(list, start, mid - 1);
        node.right = sortedListToBST(list, mid + 1, end);
        return node;
    }

    public TreeNode mergeBSTs(TreeNode root1, TreeNode root2) {
        List<Integer> list1 = new ArrayList<>();
        List<Integer> list2 = new ArrayList<>();
        inorder(root1, list1);
        inorder(root2, list2);

        List<Integer> merged = new ArrayList<>();
        int i = 0, j = 0;
        while (i < list1.size() && j < list2.size()) {
            if (list1.get(i) <= list2.get(j)) merged.add(list1.get(i++));
            else merged.add(list2.get(j++));
        }
        while (i < list1.size()) merged.add(list1.get(i++));
        while (j < list2.size()) merged.add(list2.get(j++));

        return sortedListToBST(merged, 0, merged.size() - 1);
    }
}`,
  python: `# Python 3: Merge Two BSTs into a Balanced BST
class Solution:
    def mergeBSTs(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> Optional[TreeNode]:
        def inorder(node):
            return inorder(node.left) + [node.val] + inorder(node.right) if node else []

        a, b = inorder(root1), inorder(root2)
        merged = []
        i = j = 0
        while i < len(a) and j < len(b):
            if a[i] <= b[j]:
                merged.append(a[i])
                i += 1
            else:
                merged.append(b[j])
                j += 1
        merged.extend(a[i:])
        merged.extend(b[j:])

        def buildBST(nums):
            if not nums:
                return None
            mid = len(nums) // 2
            root = TreeNode(nums[mid])
            root.left = buildBST(nums[:mid])
            root.right = buildBST(nums[mid+1:])
            return root

        return buildBST(merged)`,
  javascript: `// JavaScript: Merge Two BSTs into a Balanced BST
function mergeBSTs(root1, root2) {
    function inorder(node, arr = []) {
        if (!node) return arr;
        inorder(node.left, arr);
        arr.push(node.val);
        inorder(node.right, arr);
        return arr;
    }

    const a = inorder(root1);
    const b = inorder(root2);
    const merged = [];
    let i = 0, j = 0;
    while (i < a.length && j < b.length) {
        if (a[i] <= b[j]) merged.push(a[i++]);
        else merged.push(b[j++]);
    }
    while (i < a.length) merged.push(a[i++]);
    while (j < b.length) merged.push(b[j++]);

    function build(l, r) {
        if (l > r) return null;
        const mid = Math.floor((l + r) / 2);
        const node = { val: merged[mid], left: null, right: null };
        node.left = build(l, mid - 1);
        node.right = build(mid + 1, r);
        return node;
    }

    return build(0, merged.length - 1);
}`
};

const bst1 = { val: 3, left: { val: 1 }, right: { val: 5 } };
const bst2 = { val: 4, left: { val: 2 }, right: { val: 6 } };

const mergedBalancedTree = {
  val: 3,
  left: { val: 1, right: { val: 2 } },
  right: { val: 5, left: { val: 4 }, right: { val: 6 } }
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Input: Two Separate Binary Search Trees',
    explanation: 'BST 1: [1, 3, 5] (size M = 3). BST 2: [2, 4, 6] (size N = 3). Goal: construct a single balanced BST containing all 6 values.',
    activeLine: 6,
    activeIdeaId: 'inorder-linearization',
    tree: bst1,
    auxiliaryTree: bst2,
    auxiliaryLabel: 'BST 2 (Tree B: [2, 4, 6])',
    activeVal: 3,
    nodeLabels: { 3: 'BST 1 Root' },
    traversal: [],
    variables: { M: 3, N: 3, phase: 'SETUP' },
    customCard: {
      title: 'Algorithm Plan',
      rows: [
        { label: 'Step 1', value: 'Inorder unrolling of BST 1 and BST 2' },
        { label: 'Step 2', value: 'Two-pointer sorted merge' },
        { label: 'Step 3', value: 'Divide-and-conquer balanced tree build' },
        { label: 'Total Target Size', value: 'M + N = 6 nodes' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Extract Sorted Array from BST 1: [1, 3, 5]',
    explanation: 'Inorder traversal on BST 1 (L -> Root -> R) produces sorted stream: [1, 3, 5].',
    activeLine: 9,
    activeIdeaId: 'inorder-linearization',
    tree: bst1,
    activeVal: 5,
    visitedVals: [1, 3, 5],
    traversal: [1, 3, 5],
    traversalLabel: 'BST 1 Inorder Stream (List A)',
    variables: { listA: '[1, 3, 5]', phase: 'INORDER_1' },
    customCard: {
      title: 'BST 1 Unrolled',
      rows: [
        { label: 'Stream A', value: '[1, 3, 5]', accent: true },
        { label: 'Time Spent', value: 'O(M)' },
        { label: 'Next Step', value: 'Extract Inorder from BST 2' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Extract Sorted Array from BST 2: [2, 4, 6]',
    explanation: 'Inorder traversal on BST 2 produces sorted stream: [2, 4, 6]. Both input trees now converted to sorted arrays.',
    activeLine: 10,
    activeIdeaId: 'inorder-linearization',
    tree: bst2,
    activeVal: 6,
    visitedVals: [2, 4, 6],
    traversal: [2, 4, 6],
    traversalLabel: 'BST 2 Inorder Stream (List B)',
    variables: { listA: '[1, 3, 5]', listB: '[2, 4, 6]', phase: 'INORDER_2' },
    customCard: {
      title: 'BST 2 Unrolled',
      rows: [
        { label: 'Stream B', value: '[2, 4, 6]', accent: true },
        { label: 'Time Spent', value: 'O(N)' },
        { label: 'Both Extracted', value: 'A: [1, 3, 5], B: [2, 4, 6]' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Merge Sorted Arrays: Compare A[0]=1 vs B[0]=2',
    explanation: 'Two-pointer merge: pointer i at A[0]=1, j at B[0]=2. 1 <= 2, so append 1 to merged array. Increment i to 1.',
    activeLine: 14,
    activeIdeaId: 'two-pointer-merge',
    tree: bst1,
    auxiliaryTree: bst2,
    traversal: [1],
    traversalLabel: 'Merged Sorted Output',
    variables: { 'i (A)': 1, 'j (B)': 2, appended: 1 },
    customCard: {
      title: 'Two-Pointer Merge (Step 1)',
      rows: [
        { label: 'Comparison', value: 'A[0]=1 vs B[0]=2' },
        { label: 'Smaller Element', value: '1 appended to merged array', accent: true },
        { label: 'Merged So Far', value: '[1]' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Two-Pointer Merge Completes: [1, 2, 3, 4, 5, 6]',
    explanation: 'Continue merging: 2 from B, 3 from A, 4 from B, 5 from A, 6 from B. Combined sorted array: [1, 2, 3, 4, 5, 6].',
    activeLine: 16,
    activeIdeaId: 'two-pointer-merge',
    tree: bst1,
    auxiliaryTree: bst2,
    traversal: [1, 2, 3, 4, 5, 6],
    traversalLabel: 'Fully Merged Sorted Stream',
    variables: { mergedArray: '[1, 2, 3, 4, 5, 6]', totalLength: 6 },
    customCard: {
      title: 'Merge Complete',
      rows: [
        { label: 'Full Merged Array', value: '[1, 2, 3, 4, 5, 6]', accent: true },
        { label: 'Total Operations', value: 'M + N = 6 steps' },
        { label: 'Next Phase', value: 'Divide-and-conquer balanced tree construction' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Construct Balanced BST: Select Median Element as Root',
    explanation: 'Array has 6 elements (indices 0..5). Midpoint = index 2 (val = 3). Node 3 becomes root of the merged BST.',
    activeLine: 20,
    activeIdeaId: 'balanced-construction',
    tree: mergedBalancedTree,
    activeVal: 3,
    targetVal: 3,
    nodeLabels: { 3: 'Root (mid=3)' },
    traversal: [1, 2, 3, 4, 5, 6],
    variables: { midIndex: 2, rootVal: 3, leftSubarray: '[1, 2]', rightSubarray: '[4, 5, 6]' },
    customCard: {
      title: 'Root Selection',
      rows: [
        { label: 'Median Element', value: 'Value 3 (Index 2)', accent: true },
        { label: 'Left Partition', value: '[1, 2] -> Left Subtree' },
        { label: 'Right Partition', value: '[4, 5, 6] -> Right Subtree' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Recursively Build Left and Right Subtrees',
    explanation: 'From left partition [1, 2]: mid=1 (root), right=2. From right partition [4, 5, 6]: mid=5 (root), left=4, right=6. Both subtrees balanced.',
    activeLine: 22,
    activeIdeaId: 'balanced-construction',
    tree: mergedBalancedTree,
    activeVal: 5,
    highlightedVals: [1, 2, 4, 5, 6],
    nodeLabels: { 3: 'Root (3)', 1: 'Left Root', 5: 'Right Root' },
    traversal: [1, 2, 3, 4, 5, 6],
    variables: { leftHeight: 2, rightHeight: 2, isBalanced: 'TRUE' },
    customCard: {
      title: 'Subtrees Constructed',
      rows: [
        { label: 'Left Subtree', value: 'Node 1 with right child 2' },
        { label: 'Right Subtree', value: 'Node 5 with left child 4 & right child 6' },
        { label: 'Balance Check', value: '|H_left - H_right| = |2 - 2| = 0 (Perfect)' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Return Merged Height-Balanced BST',
    explanation: 'The new BST contains all 6 elements and has minimal height H = ceil(log2(6)) = 3. Final complexity: O(M + N) time & space.',
    activeLine: 25,
    activeIdeaId: 'optimal-space-time',
    tree: mergedBalancedTree,
    activeVal: 3,
    highlightedVals: [1, 2, 3, 4, 5, 6],
    traversal: [1, 2, 3, 4, 5, 6],
    variables: { finalNodes: 6, height: 3, timeComplexity: 'O(M + N)', spaceComplexity: 'O(M + N)' },
    customCard: {
      title: 'Algorithm Complete',
      rows: [
        { label: 'Result Tree', value: 'Height-Balanced BST with 6 nodes', accent: true },
        { label: 'Time Complexity', value: 'O(M + N) - linear time' },
        { label: 'Space Complexity', value: 'O(M + N) - merged array' },
        { label: 'Height Guarantee', value: 'O(log(M + N))' }
      ]
    }
  }
];

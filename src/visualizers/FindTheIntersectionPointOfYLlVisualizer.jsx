export const rendererType = 'linked-list';

export const meta = {
  title: 'Find Intersection Point of Y Linked Lists',
  category: 'Linked List & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N + M)',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Finds the merge node of two intersecting singly linked lists using dual pointers that switch list heads upon reaching the end, equalizing total path lengths to meet at the intersection.'
};

export const ideaMap = [
  {
    id: 'length-neutralization',
    title: 'Path Length Neutralization',
    description: 'Pointer A traverses path A + path B, while pointer B traverses path B + path A. Since a + b = b + a, both travel identical distances and synchronize at the intersection node.'
  },
  {
    id: 'head-redirection',
    title: 'Null-to-Head Redirection',
    description: 'When pointer A hits null, redirect it to headB. When pointer B hits null, redirect it to headA.'
  },
  {
    id: 'simultaneous-convergence',
    title: 'Simultaneous Convergence',
    description: 'After redirection, the offset in individual list lengths is completely neutralized, causing both pointers to step onto the intersection node on the exact same iteration.'
  },
  {
    id: 'no-intersection-safety',
    title: 'Disjoint List Termination',
    description: 'If the two lists do not intersect, both pointers reach null simultaneously in the second pass and terminate cleanly without infinite loops.'
  },
  {
    id: 'constant-space-invariant',
    title: 'O(1) Auxiliary Space Invariant',
    description: 'Avoids allocating an O(N) hash set of node addresses, relying entirely on two reference pointers.'
  }
];

export const solutions = {
  cpp: `// C++: Two-Pointer Path Equalization for Y-Intersection
// Time Complexity: O(N + M) | Space Complexity: O(1)
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        if (!headA || !headB) return nullptr;

        ListNode *pA = headA;
        ListNode *pB = headB;

        // Traverse both lists; redirect each pointer upon reaching null
        while (pA != pB) {
            pA = (pA == nullptr) ? headB : pA->next;
            pB = (pB == nullptr) ? headA : pB->next;
        }

        return pA; // Either points to intersection node or nullptr
    }
};`,
  java: `// Java: Two-Pointer Path Equalization for Y-Intersection
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) return null;

        ListNode pA = headA;
        ListNode pB = headB;

        while (pA != pB) {
            pA = (pA == null) ? headB : pA.next;
            pB = (pB == null) ? headA : pB.next;
        }

        return pA;
    }
}`,
  python: `# Python 3: Two-Pointer Path Equalization for Y-Intersection
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
        if not headA or not headB:
            return None

        pA, pB = headA, headB

        while pA != pB:
            pA = headB if pA is None else pA.next
            pB = headA if pB is None else pB.next

        return pA`,
  javascript: `// JavaScript: Two-Pointer Path Equalization for Y-Intersection
function getIntersectionNode(headA, headB) {
    if (!headA || !headB) return null;

    let pA = headA;
    let pB = headB;

    while (pA !== pB) {
        pA = pA === null ? headB : pA.next;
        pB = pB === null ? headA : pB.next;
    }

    return pA;
}`
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Initialize Pointers pA at HeadA and pB at HeadB',
    explanation: 'List A: [4 -> 1 -> 8 -> 4 -> 5]. List B: [5 -> 6 -> 1 -> 8 -> 4 -> 5]. Intersection node has value 8.',
    activeLine: 6,
    activeIdeaId: 'length-neutralization',
    nodes: [4, 1, 8, 4, 5],
    auxiliaryNodes: [5, 6, 1, 8, 4, 5],
    auxiliaryLabel: 'List B (headB)',
    pointers: { pA: 0, headA: 0 },
    auxiliaryPointers: { pB: 0, headB: 0 },
    highlightIndices: [0],
    auxiliaryHighlightIndices: [0],
    variables: { 'pA.val': 4, 'pB.val': 5, match: 'false' },
    customCard: {
      title: 'Problem Setup',
      rows: [
        { label: 'List A Length', value: '5 nodes' },
        { label: 'List B Length', value: '6 nodes' },
        { label: 'Intersection Node', value: 'Node with val=8' },
        { label: 'Key Strategy', value: 'Switch heads when reaching null to equalize path lengths' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Step 1: Traverse Both Lists Forward',
    explanation: 'Advance both pointers: pA reaches Node 1 (idx 1 of A), pB reaches Node 6 (idx 1 of B). pA != pB.',
    activeLine: 12,
    activeIdeaId: 'length-neutralization',
    nodes: [4, 1, 8, 4, 5],
    auxiliaryNodes: [5, 6, 1, 8, 4, 5],
    auxiliaryLabel: 'List B',
    pointers: { pA: 1 },
    auxiliaryPointers: { pB: 1 },
    highlightIndices: [1],
    auxiliaryHighlightIndices: [1],
    visitedIndices: [0],
    variables: { 'pA.val': 1, 'pB.val': 6, match: 'false' },
    customCard: {
      title: 'Traversal Step 1',
      rows: [
        { label: 'pA Position', value: 'List A[1] = 1' },
        { label: 'pB Position', value: 'List B[1] = 6' },
        { label: 'Equality Check', value: 'pA != pB (Continue)' },
        { label: 'Distance Covered', value: '1 step' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Step 2: Advance to Index 2',
    explanation: 'pA reaches Node 8 (idx 2 of A), pB reaches Node 1 (idx 2 of B). Even though pA is at the intersection value, pB is still behind due to path disparity.',
    activeLine: 12,
    activeIdeaId: 'length-neutralization',
    nodes: [4, 1, 8, 4, 5],
    auxiliaryNodes: [5, 6, 1, 8, 4, 5],
    auxiliaryLabel: 'List B',
    pointers: { pA: 2 },
    auxiliaryPointers: { pB: 2 },
    highlightIndices: [2],
    auxiliaryHighlightIndices: [2],
    visitedIndices: [0, 1],
    variables: { 'pA.val': 8, 'pB.val': 1, match: 'false' },
    customCard: {
      title: 'Traversal Step 2',
      rows: [
        { label: 'pA Position', value: 'List A[2] = 8 (intersection node)' },
        { label: 'pB Position', value: 'List B[2] = 1' },
        { label: 'Equality Check', value: 'Different nodes in memory' },
        { label: 'Status', value: 'pA reaches end first' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'pA Reaches End of List A',
    explanation: 'pA has traversed the remaining nodes and reaches null at the end of List A. pB is currently at Node 5 (last node of List B).',
    activeLine: 13,
    activeIdeaId: 'head-redirection',
    nodes: [4, 1, 8, 4, 5],
    auxiliaryNodes: [5, 6, 1, 8, 4, 5],
    auxiliaryLabel: 'List B',
    pointers: {},
    auxiliaryPointers: { pB: 5 },
    auxiliaryHighlightIndices: [5],
    visitedIndices: [0, 1, 2, 3, 4],
    variables: { pA: 'null (end of A)', 'pB.val': 5 },
    customCard: {
      title: 'List A Traversal Exhausted',
      rows: [
        { label: 'pA Status', value: 'null (reached tail of A)' },
        { label: 'Next Action for pA', value: 'Redirect pA to headB (Node 5)', accent: true },
        { label: 'pB Status', value: 'At index 5 of List B' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Redirect pA to Head of List B',
    explanation: 'pA redirects to headB (Node 5). Meanwhile, pB hits null at the end of List B and will redirect to headA on the next step.',
    activeLine: 14,
    activeIdeaId: 'head-redirection',
    nodes: [4, 1, 8, 4, 5],
    auxiliaryNodes: [5, 6, 1, 8, 4, 5],
    auxiliaryLabel: 'List B (pA now traversing)',
    pointers: {},
    auxiliaryPointers: { pA: 0 },
    auxiliaryHighlightIndices: [0],
    variables: { pA: 'headB (Node 5)', pB: 'null (end of B)' },
    customCard: {
      title: 'First Redirection Active',
      rows: [
        { label: 'pA Redirected', value: 'headB (Node 5)', accent: true },
        { label: 'pB at End', value: 'null (will redirect to headA)' },
        { label: 'Alignment Effect', value: 'Offsets path difference (lenB - lenA = 1)' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Redirect pB to Head of List A: Lengths Balanced',
    explanation: 'pB redirects to headA (Node 4). pA advances to Node 6 in List B. Both pointers are now exactly equidistant from the intersection node!',
    activeLine: 14,
    activeIdeaId: 'simultaneous-convergence',
    nodes: [4, 1, 8, 4, 5],
    auxiliaryNodes: [5, 6, 1, 8, 4, 5],
    auxiliaryLabel: 'List B',
    pointers: { pB: 0 },
    auxiliaryPointers: { pA: 1 },
    highlightIndices: [0],
    auxiliaryHighlightIndices: [1],
    variables: { 'pA.val': 6, 'pB.val': 4, distanceToMerge: '2 steps for both' },
    customCard: {
      title: 'Equal Distance Achieved',
      rows: [
        { label: 'pA Path So Far', value: 'len(A) + 1' },
        { label: 'pB Path So Far', value: 'len(B)' },
        { label: 'Remaining to Merge', value: '2 steps for both pointers', accent: true },
        { label: 'Result', value: 'Pointers will collide at Node 8' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Advance Both Pointers Toward Intersection',
    explanation: 'pA moves to Node 1 in List B. pB moves to Node 1 in List A. Exactly 1 step away from intersection.',
    activeLine: 12,
    activeIdeaId: 'simultaneous-convergence',
    nodes: [4, 1, 8, 4, 5],
    auxiliaryNodes: [5, 6, 1, 8, 4, 5],
    auxiliaryLabel: 'List B',
    pointers: { pB: 1 },
    auxiliaryPointers: { pA: 2 },
    highlightIndices: [1],
    auxiliaryHighlightIndices: [2],
    variables: { 'pA.val': 1, 'pB.val': 1, distanceToMerge: '1 step' },
    customCard: {
      title: 'Convergence in Progress',
      rows: [
        { label: 'pA Position', value: 'List B, index 2 (val=1)' },
        { label: 'pB Position', value: 'List A, index 1 (val=1)' },
        { label: 'Next Step', value: 'Both step onto Node 8 simultaneously' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'Pointers Collide: pA == pB at Node 8 (Intersection Found!)',
    explanation: 'Both pA and pB point to the exact same Node 8 in memory. pA == pB condition triggers loop exit. Return Node 8.',
    activeLine: 17,
    activeIdeaId: 'simultaneous-convergence',
    nodes: [4, 1, 8, 4, 5],
    pointers: { intersection: 2, head: 0 },
    highlightIndices: [2],
    modifiedIndices: [2],
    variables: { intersectionNode: 'Node(8)', memoryMatch: 'pA === pB (True)' },
    customCard: {
      title: 'Intersection Found',
      rows: [
        { label: 'Merge Node', value: 'Node 8 (index 2 of A, index 3 of B)', accent: true },
        { label: 'Total Distance Traveled', value: 'pA: 8 steps, pB: 8 steps' },
        { label: 'Time Complexity', value: 'O(N + M) - at most 2 passes' },
        { label: 'Space Complexity', value: 'O(1) - auxiliary pointers only' }
      ]
    }
  }
];

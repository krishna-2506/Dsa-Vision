// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Length of Loop in Linked List',
  category: 'Linked List & Two Pointers',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: "Finds the exact node count of a cycle in a linked list by detecting a collision with Floyd's Tortoise and Hare algorithm, freezing one pointer at the meeting node, and circulating a counter pointer around the loop back to the anchor."
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Loop Length Strategy',
  nodes: [
    { id: 'root', label: 'Cycle Length Calculation', children: ['floyd-detect', 'anchor-meeting', 'cycle-circulation', 'return-count', 'complexity'] },
    { id: 'floyd-detect', label: '1. Phase 1: Detect Collision', detail: 'Advance slow by 1 and fast by 2. If they collide at node M, a cycle is proven.' },
    { id: 'anchor-meeting', label: '2. Freeze Anchor Node', detail: 'Keep one pointer fixed at meeting node M to act as the destination stop signal.' },
    { id: 'cycle-circulation', label: '3. Circulate & Count', detail: 'Initialize cnt = 1; advance temp = temp.next around the loop until temp reaches M again.' },
    { id: 'return-count', label: '4. Exact Node Count', detail: 'The total traversal steps before meeting M again equals the exact cycle length C.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'O(N) total node visits with strictly O(1) auxiliary pointer memory.' }
  ]
};

export const solutions = {
  cpp: `// C++ Length of Loop in Linked List
// Time Complexity: O(N) | Space Complexity: O(1)
struct Node {
    int data;
    Node *next;
    Node(int val) : data(val), next(nullptr) {}
};

class Solution {
private:
    int countNodesinLoop(Node *slow) {
        int cnt = 1;
        Node *temp = slow->next; // Start from next node
        while (temp != slow) {
            cnt++;
            temp = temp->next;
        }
        return cnt;
    }

public:
    int countNodesinLoop(Node *head) {
        if (!head || !head->next) return 0;

        Node *slow = head;
        Node *fast = head;

        // Phase 1: Detect collision inside cycle
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;

            if (slow == fast) {
                // Phase 2: Circulate and count loop length
                return countNodesinLoop(slow);
            }
        }

        return 0; // No loop found
    }
};`,
  python: `# Python 3 Length of Loop in Linked List
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def countNodesinLoop(self, head: Optional[Node]) -> int:
        if not head or not head.next:
            return 0

        slow = head
        fast = head

        # Phase 1: Detect loop collision
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

            if slow == fast:
                # Phase 2: Circulate around loop
                cnt = 1
                curr = slow.next
                while curr != slow:
                    cnt += 1
                    curr = curr.next
                return cnt

        return 0`,
  java: `// Java Length of Loop in Linked List
// Time Complexity: O(N) | Space Complexity: O(1)
class Solution {
    private static int countLoopLength(Node slow) {
        int cnt = 1;
        Node temp = slow.next;
        while (temp != slow) {
            cnt++;
            temp = temp.next;
        }
        return cnt;
    }

    public static int countNodesinLoop(Node head) {
        if (head == null || head.next == null) return 0;

        Node slow = head;
        Node fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {
                return countLoopLength(slow);
            }
        }

        return 0;
    }
}`,
  javascript: `// JavaScript Length of Loop in Linked List
// Time Complexity: O(N) | Space Complexity: O(1)
function countNodesinLoop(head) {
    if (!head || !head.next) return 0;

    let slow = head;
    let fast = head;

    // Phase 1: Detect cycle
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            // Phase 2: Traverse loop to count nodes
            let cnt = 1;
            let curr = slow.next;
            while (curr !== slow) {
                cnt++;
                curr = curr.next;
            }
            return cnt;
        }
    }

    return 0;
}`
};

export const steps = [
  {
    title: '1. Setup: List 1 -> 2 -> 3 -> 4 -> 5 -> [Loops back to 2]',
    phase: 'SETUP',
    track: {
      label: 'Linked List with Cycle (5 loops to 2)',
      items: [
        { val: '1 (Head)', status: 'active' },
        { val: '2 (Cycle Start)', badge: '↻ Start' },
        { val: '3' },
        { val: '4' },
        { val: '5 (Tail -> 2)', badge: '↩ Loop' }
      ],
      pointers: [
        { index: 0, label: '🐢 slow' },
        { index: 0, label: '🐇 fast' }
      ]
    },
    activeI: 0,
    activeJ: 0,
    metrics: [
      { label: 'Phase', value: '1: Detect Collision' },
      { label: 'Cycle Range', value: 'Nodes [2, 3, 4, 5]' },
      { label: 'Pointers at Head', value: 'slow = fast = 1' }
    ],
    formula: 'slow = head; fast = head;',
    action: 'Phase 1: Initialize slow and fast pointers at head Node 1.',
    explain: 'Linked list has 5 nodes. Node 5 points back to Node 2, creating a loop of 4 nodes {2, 3, 4, 5}. Node 1 is the linear tail.',
    intuition: 'We first use Floyd’s cycle detection to locate an anchor node inside the cycle.',
    variables: { head: 1, cycleStart: 2, loopExpected: 4, phase: 'Detecting' }
  },
  {
    title: '2. Phase 1 - Iteration 1: slow -> Node 2, fast -> Node 3',
    phase: 'TRAVERSAL',
    track: {
      label: 'Phase 1: Entering Cycle',
      items: [
        { val: '1' },
        { val: '2 (Cycle Start)', status: 'active', badge: '↻ Start' },
        { val: '3', status: 'active' },
        { val: '4' },
        { val: '5 (Tail -> 2)', badge: '↩ Loop' }
      ],
      pointers: [
        { index: 1, label: '🐢 slow' },
        { index: 2, label: '🐇 fast' }
      ]
    },
    activeI: 1,
    activeJ: 2,
    metrics: [
      { label: 'slow.val', value: 2 },
      { label: 'fast.val', value: 3 },
      { label: 'Fast in Loop', value: 'Yes' }
    ],
    formula: 'slow = slow.next; fast = fast.next.next;',
    action: 'slow moves 1 step to Node 2; fast moves 2 steps to Node 3.',
    explain: 'slow enters the cycle entrance at Node 2. fast advances deep into the cycle at Node 3.',
    intuition: 'Fast gains 1 relative step per iteration on slow.',
    variables: { 'slow.val': 2, 'fast.val': 3 }
  },
  {
    title: '3. Phase 1 - Iteration 2: slow -> Node 3, fast -> Node 5',
    phase: 'TRAVERSAL',
    track: {
      label: 'Phase 1: Both Inside Loop',
      items: [
        { val: '1' },
        { val: '2 (Cycle Start)', badge: '↻ Start' },
        { val: '3', status: 'active' },
        { val: '4' },
        { val: '5 (Tail -> 2)', status: 'active', badge: '↩ Loop' }
      ],
      pointers: [
        { index: 2, label: '🐢 slow' },
        { index: 4, label: '🐇 fast' }
      ]
    },
    activeI: 2,
    activeJ: 4,
    metrics: [
      { label: 'slow.val', value: 3 },
      { label: 'fast.val', value: 5 },
      { label: 'Relative Gap', value: '1 step' }
    ],
    formula: 'slow = slow.next; fast = fast.next.next;',
    action: 'slow advances to Node 3; fast advances to tail Node 5.',
    explain: 'Both pointers are circulating in the 4-node loop. Fast is at the loop tail (Node 5), ready to wrap back to Node 2.',
    intuition: 'The gap modulo cycle length decreases by 1 in every iteration.',
    variables: { 'slow.val': 3, 'fast.val': 5, gap: 1 }
  },
  {
    title: '4. Phase 1 Collision: Meeting at Node 4!',
    phase: 'COLLISION',
    track: {
      label: 'Anchor Meeting Point Identified',
      items: [
        { val: '1' },
        { val: '2 (Cycle Start)', badge: '↻ Start' },
        { val: '3' },
        { val: '4 (MEETING ANCHOR)', status: 'match', badge: '💥 Anchor' },
        { val: '5 (Tail -> 2)', badge: '↩ Loop' }
      ],
      pointers: [
        { index: 3, label: '💥 slow == fast (Anchor)' }
      ]
    },
    activeI: 3,
    activeJ: 3,
    metrics: [
      { label: 'Collision Node', value: 'Node 4', highlight: true },
      { label: 'Phase 1', value: 'Complete' },
      { label: 'Next Action', value: 'Count Loop Nodes' }
    ],
    formula: 'slow == fast (Node 4 == Node 4)',
    action: 'slow moves to Node 4; fast wraps (5 -> 2 -> 4) and collides at Node 4!',
    explain: 'Both pointers meet at Node 4. We now freeze an anchor pointer at Node 4 and use a second pointer to count nodes around the loop.',
    intuition: 'Any node inside the cycle can serve as the origin anchor to measure perimeter.',
    variables: { anchorNode: 4, collision: true }
  },
  {
    title: '5. Phase 2 - Start Counting: curr = anchor.next (Node 5), count = 1',
    phase: 'COUNTING',
    track: {
      label: 'Phase 2: Circulating Counter Pointer',
      items: [
        { val: '1' },
        { val: '2 (Cycle Start)', badge: '↻ Start' },
        { val: '3' },
        { val: '4 (Anchor)', status: 'match', badge: '⚓ Anchor' },
        { val: '5 (curr)', status: 'active', badge: 'Count = 1' }
      ],
      pointers: [
        { index: 3, label: '⚓ anchor (Node 4)' },
        { index: 4, label: 'curr (cnt = 1)' }
      ]
    },
    activeI: 4,
    activeJ: 3,
    metrics: [
      { label: 'Loop Count', value: 1, highlight: true },
      { label: 'Current Node', value: 'Node 5' },
      { label: 'Anchor Node', value: 'Node 4' }
    ],
    formula: 'int cnt = 1; curr = slow.next;',
    action: 'Initialize cnt = 1; advance curr pointer to slow.next (Node 5).',
    explain: 'We count Node 4 as the 1st node in the loop and step curr to Node 5.',
    intuition: 'We will advance curr one node at a time until curr meets the stationary anchor again.',
    variables: { anchor: 4, curr: 5, cnt: 1 }
  },
  {
    title: '6. Phase 2 - Step 1: curr wraps (5 -> 2), count = 2',
    phase: 'COUNTING',
    track: {
      label: 'Phase 2: Traversing Cycle Link',
      items: [
        { val: '1' },
        { val: '2 (curr)', status: 'active', badge: 'Count = 2' },
        { val: '3' },
        { val: '4 (Anchor)', status: 'match', badge: '⚓ Anchor' },
        { val: '5 (Tail -> 2)', badge: '↩ Loop' }
      ],
      pointers: [
        { index: 3, label: '⚓ anchor (Node 4)' },
        { index: 1, label: 'curr (cnt = 2)' }
      ]
    },
    activeI: 1,
    activeJ: 3,
    metrics: [
      { label: 'Loop Count', value: 2, highlight: true },
      { label: 'Current Node', value: 'Node 2 (Cycle Start)' },
      { label: 'Back Edge Followed', value: '5 -> 2' }
    ],
    formula: 'cnt++; curr = curr.next;',
    action: 'curr follows cycle link from Node 5 back to Node 2. Increment cnt to 2.',
    explain: 'Node 2 is visited and confirmed as part of the cycle. Total nodes visited so far: 2 (Nodes 4, 5).',
    intuition: 'Continuing clockwise loop traversal.',
    variables: { anchor: 4, curr: 2, cnt: 2 }
  },
  {
    title: '7. Phase 2 - Step 2: curr advances to Node 3, count = 3',
    phase: 'COUNTING',
    track: {
      label: 'Phase 2: Approaching Anchor',
      items: [
        { val: '1' },
        { val: '2 (Cycle Start)', badge: '↻ Start' },
        { val: '3 (curr)', status: 'active', badge: 'Count = 3' },
        { val: '4 (Anchor)', status: 'match', badge: '⚓ Anchor' },
        { val: '5 (Tail -> 2)', badge: '↩ Loop' }
      ],
      pointers: [
        { index: 3, label: '⚓ anchor (Node 4)' },
        { index: 2, label: 'curr (cnt = 3)' }
      ]
    },
    activeI: 2,
    activeJ: 3,
    metrics: [
      { label: 'Loop Count', value: 3, highlight: true },
      { label: 'Current Node', value: 'Node 3' },
      { label: 'Remaining to Anchor', value: '1 step' }
    ],
    formula: 'cnt++; curr = curr.next;',
    action: 'curr advances from Node 2 to Node 3. Increment cnt to 3.',
    explain: 'Node 3 is accounted for. The next node in sequence is Node 4, which matches the anchor!',
    intuition: 'Only 1 step remaining before completing the full revolution.',
    variables: { anchor: 4, curr: 3, cnt: 3 }
  },
  {
    title: '8. Complete: curr meets Anchor Node 4 -> Loop Length = 4!',
    phase: 'COMPLETED',
    track: {
      label: 'Full Cycle Traversed: Length Confirmed',
      items: [
        { val: '1 (Tail)' },
        { val: '2 (Loop #1)', status: 'match' },
        { val: '3 (Loop #2)', status: 'match' },
        { val: '4 (Loop #3, Anchor)', status: 'match', badge: '⚓ Anchor' },
        { val: '5 (Loop #4)', status: 'match', badge: '↩ Loop' }
      ],
      pointers: [
        { index: 3, label: 'curr == anchor (Cycle Length = 4)' }
      ]
    },
    activeI: 3,
    activeJ: 3,
    metrics: [
      { label: 'Loop Length', value: '4 nodes', highlight: true },
      { label: 'Cycle Nodes', value: '{2, 3, 4, 5}' },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    formula: 'while (curr != anchor) exited; return cnt; // 4',
    action: 'curr advances to Node 4 and equals anchor. Loop completed! Return cnt = 4.',
    explain: 'The traversal visited exactly 4 distinct nodes {4, 5, 2, 3} before returning to the anchor. The cycle length is 4.',
    intuition: 'Floyd collision + 1 full loop circulation provides the optimal O(N) time and O(1) space solution.',
    variables: { loopLength: 4, result: 4, cycleNodes: [2, 3, 4, 5] }
  }
];

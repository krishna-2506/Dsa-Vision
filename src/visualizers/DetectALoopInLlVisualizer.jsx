// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: "Detect a Loop in Linked List (Floyd's Cycle Algorithm)",
  category: 'Linked List & Cycle Detection',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  description: "Detects whether a cycle exists in a linked list using Floyd's Tortoise and Hare algorithm. The fast pointer advances 2 steps while the slow pointer advances 1 step; if a cycle exists, their relative speed (2 - 1 = 1) guarantees collision within the cycle."
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: "Floyd's Cycle Detection Strategy",
  nodes: [
    { id: 'root', label: "Floyd's Tortoise & Hare", children: ['two-pointers', 'relative-speed', 'collision-invariant', 'termination', 'complexity'] },
    { id: 'two-pointers', label: '1. Dual Pointer Setup', detail: 'Initialize slow and fast pointers at head. Slow moves 1 step, Fast moves 2 steps.' },
    { id: 'relative-speed', label: '2. Relative Velocity = 1', detail: 'Inside the loop, fast gains exactly 1 node per iteration on slow (2 - 1 = 1).' },
    { id: 'collision-invariant', label: '3. Guaranteed Collision', detail: 'Because relative speed is 1, fast cannot jump over slow; gap modulo C decreases strictly to 0.' },
    { id: 'termination', label: '4. Null-Check Termination', detail: 'If no cycle exists, fast or fast.next hits NULL in <= N/2 steps, returning false.' },
    { id: 'complexity', label: '5. Optimal Space & Time', detail: 'Runs in O(N) time using O(1) auxiliary space without modifying list nodes.' }
  ]
};

export const solutions = {
  cpp: `// C++ Floyd's Cycle Detection Algorithm (Tortoise & Hare)
// Time Complexity: O(N) | Space Complexity: O(1)
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode *slow = head;
        ListNode *fast = head;

        // Advance slow by 1 step, fast by 2 steps
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;          // 1 step (Tortoise)
            fast = fast->next->next;    // 2 steps (Hare)

            if (slow == fast) {
                return true; // Collision: Cycle detected!
            }
        }

        return false; // Fast reached NULL: No cycle exists
    }
};`,
  python: `# Python 3 Floyd's Cycle Detection (Tortoise & Hare)
# Time Complexity: O(N) | Space Complexity: O(1)
class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        slow = head
        fast = head

        while fast and fast.next:
            slow = slow.next          # 1 step
            fast = fast.next.next     # 2 steps

            if slow == fast:
                return True           # Collision confirms cycle

        return False                  # Reached NULL end of list`,
  java: `// Java Floyd's Cycle Detection (Tortoise & Hare)
// Time Complexity: O(N) | Space Complexity: O(1)
public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;         // 1 step
            fast = fast.next.next;    // 2 steps

            if (slow == fast) {
                return true;          // Cycle detected!
            }
        }

        return false;                 // Reached end without loop
    }
}`,
  javascript: `// JavaScript Floyd's Cycle Detection (Tortoise & Hare)
// Time Complexity: O(N) | Space Complexity: O(1)
var hasCycle = function(head) {
    let slow = head;
    let fast = head;

    while (fast !== null && fast.next !== null) {
        slow = slow.next;             // 1 step
        fast = fast.next.next;        // 2 steps

        if (slow === fast) {
            return true;              // Cycle detected!
        }
    }

    return false;                     // Terminating list
};`
};

export const steps = [
  {
    title: '1. Initial State: slow & fast at Head (Node 1)',
    phase: 'SETUP',
    track: {
      label: 'Linked List with Cycle (5 loops back to 3)',
      items: [
        { val: '1 (Head)', status: 'active' },
        { val: '2' },
        { val: '3 (Cycle Start)', badge: '↻ Start' },
        { val: '4' },
        { val: '5 (Tail -> 3)', badge: '↩ Loop' }
      ],
      pointers: [
        { index: 0, label: '🐢 slow' },
        { index: 0, label: '🐇 fast' }
      ]
    },
    activeI: 0,
    activeJ: 0,
    metrics: [
      { label: 'slow.val', value: 1 },
      { label: 'fast.val', value: 1 },
      { label: 'Cycle Status', value: 'Searching' }
    ],
    formula: 'slow = head; fast = head;',
    action: 'Initialize slow (Tortoise) and fast (Hare) pointers at the head node.',
    explain: 'Both pointers start at Node 1. The linked list contains 5 nodes, with Node 5 looping back to Node 3. Linear prefix length L1 = 2, Cycle length C = 3.',
    intuition: 'If no cycle exists, fast will reach NULL in O(N). If a cycle exists, both pointers will enter the loop and fast will chase slow.',
    variables: { 'slow.val': 1, 'fast.val': 1, cycleEdge: '5 -> 3', cycleLength: 3 }
  },
  {
    title: '2. Iteration 1: slow -> Node 2, fast -> Node 3',
    phase: 'TRAVERSAL',
    track: {
      label: 'Linked List Traversal',
      items: [
        { val: '1' },
        { val: '2', status: 'active' },
        { val: '3 (Cycle Start)', status: 'active', badge: '↻ Start' },
        { val: '4' },
        { val: '5 (Tail -> 3)', badge: '↩ Loop' }
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
      { label: 'Fast In Loop?', value: 'Yes (Node 3)' }
    ],
    formula: 'slow = slow.next; fast = fast.next.next;',
    action: 'slow advances 1 step to Node 2; fast leaps 2 steps (1 -> 2 -> 3) to Node 3.',
    explain: 'Fast pointer has crossed the cycle boundary into Node 3. Slow pointer is at Node 2, just 1 step away from the cycle entrance.',
    intuition: 'Fast moves at 2x speed. Because fast is already in the loop, it begins orbiting the cycle while slow approaches it.',
    variables: { 'slow.val': 2, 'fast.val': 3, slowPhase: 'Entering', fastPhase: 'In Cycle' }
  },
  {
    title: '3. Iteration 2: slow -> Node 3, fast -> Node 5',
    phase: 'TRAVERSAL',
    track: {
      label: 'Both Pointers Inside Cycle',
      items: [
        { val: '1' },
        { val: '2' },
        { val: '3 (Cycle Start)', status: 'active', badge: '↻ Start' },
        { val: '4' },
        { val: '5 (Tail -> 3)', status: 'active', badge: '↩ Loop' }
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
      { label: 'Both in Cycle', value: 'Yes (Gap = 1)' }
    ],
    formula: 'slow = slow.next; fast = fast.next.next;',
    action: 'slow moves 1 step to Node 3; fast moves 2 steps from Node 3 to Node 5.',
    explain: 'Both pointers are now entirely inside the cycle {3, 4, 5}. Node 5 connects directly back to Node 3. In the cycle, fast is currently 2 steps ahead (or 1 step behind slow).',
    intuition: 'Once both pointers are trapped in the loop, relative speed is (2 - 1) = 1 node per iteration. Fast closes the gap by exactly 1 node every turn.',
    variables: { 'slow.val': 3, 'fast.val': 5, loopNodes: [3, 4, 5], gap: 1 }
  },
  {
    title: '4. Iteration 3: fast wraps (5 -> 3 -> 4), slow -> Node 4 — Collision!',
    phase: 'COLLISION',
    track: {
      label: 'Collision Point Reached',
      items: [
        { val: '1' },
        { val: '2' },
        { val: '3 (Cycle Start)', badge: '↻ Start' },
        { val: '4 (COLLISION)', status: 'match', badge: '💥 Match' },
        { val: '5 (Tail -> 3)', badge: '↩ Loop' }
      ],
      pointers: [
        { index: 3, label: '💥 slow == fast' }
      ]
    },
    activeI: 3,
    activeJ: 3,
    metrics: [
      { label: 'slow.val', value: 4 },
      { label: 'fast.val', value: 4 },
      { label: 'Collision', value: 'slow == fast', highlight: true }
    ],
    formula: 'slow == fast (Node 4 == Node 4)',
    action: 'slow moves to Node 4; fast takes 2 steps across cycle (5 -> 3 -> 4) and lands at Node 4!',
    explain: 'Both slow and fast now point to the identical memory address (Node 4). A collision has occurred!',
    intuition: 'Because the gap reduces by exactly 1 each step, fast can never "jump over" slow without meeting. Collision is 100% mathematically inevitable.',
    variables: { 'slow.val': 4, 'fast.val': 4, meetingNode: 4, collisionDetected: true }
  },
  {
    title: '5. Mathematical Proof of Relative Speed Closure',
    phase: 'ANALYSIS',
    track: {
      label: 'Cycle Geometry Decomposition',
      items: [
        { val: '1 (L1)' },
        { val: '2 (L1)' },
        { val: '3 (Start)', badge: 'Entry' },
        { val: '4 (d=1)', status: 'match', badge: 'Meet' },
        { val: '5 (Tail)', badge: '↩ Loop' }
      ],
      pointers: [
        { index: 2, label: 'Cycle Entry (3)' },
        { index: 3, label: 'Meeting Node (4)' }
      ]
    },
    activeI: 2,
    activeJ: 3,
    metrics: [
      { label: 'Linear Path L1', value: '2 nodes' },
      { label: 'Cycle Length C', value: '3 nodes' },
      { label: 'Relative Speed', value: '1 node/step', highlight: true }
    ],
    formula: 'Speed_fast - Speed_slow = 2 - 1 = 1',
    action: 'Examine why collision is guaranteed in at most C steps once slow enters.',
    explain: 'When slow enters the cycle, fast is some distance D <= C - 1 behind slow. Since the relative velocity is 1, fast gains 1 step each turn, taking exactly D steps to catch slow.',
    intuition: 'Total time to collision is bounded by L1 + C = O(N) operations.',
    variables: { L1: 2, C: 3, meetOffset: 1, maxLoopSteps: 3 }
  },
  {
    title: '6. Counter-Check: Termination on Acyclic (Linear) Lists',
    phase: 'ANALYSIS',
    track: {
      label: 'Hypothetical Linear List (No Cycle)',
      items: [
        { val: '1' },
        { val: '2' },
        { val: '3' },
        { val: '4' },
        { val: 'NULL', status: 'discarded', badge: 'End' }
      ],
      pointers: [
        { index: 4, label: 'fast == null' }
      ]
    },
    activeI: null,
    activeJ: 4,
    metrics: [
      { label: 'Loop Check', value: 'fast && fast.next' },
      { label: 'Linear Exit', value: 'Returns false' },
      { label: 'Time Bound', value: 'N/2 iterations' }
    ],
    formula: 'while (fast != null && fast.next != null)',
    action: 'Verify behavior when the list terminates normally without any loop.',
    explain: 'If the list has no cycle, fast or fast.next will become NULL in at most ceil(N/2) steps. The while loop safely exits and returns false.',
    intuition: 'The guard condition fast != null && fast.next != null prevents null pointer dereferencing when fast advances two steps at a time.',
    variables: { 'fast': 'nullptr', 'fast.next': 'N/A', returnVal: false }
  },
  {
    title: '7. Complexity Comparison: Floyd vs Hash Table',
    phase: 'ANALYSIS',
    track: {
      label: 'Efficiency Comparison',
      items: [
        { val: 'Floyd: O(1) Space', status: 'match' },
        { val: 'Floyd: O(N) Time', status: 'match' },
        { val: 'HashSet: O(N) Space', status: 'discarded' },
        { val: 'HashSet: O(N) Time' }
      ],
      pointers: [
        { index: 0, label: 'Optimal Choice' }
      ]
    },
    activeI: 0,
    activeJ: null,
    metrics: [
      { label: 'Floyd Space', value: 'O(1)', highlight: true },
      { label: 'Hash Table Space', value: 'O(N)' },
      { label: 'Pointer Mutations', value: '0 (Pure read)' }
    ],
    formula: 'Space: O(1) | Time: O(N)',
    action: 'Compare memory and runtime trade-offs between Floyd algorithm and Hash Set.',
    explain: 'A Hash Set stores pointers to all visited nodes, using O(N) auxiliary memory and heap allocation overhead. Floyd Tortoise & Hare uses only 2 pointer variables (O(1) space) and zero heap allocations.',
    intuition: 'Floyd cycle detection is ideal for memory-constrained systems and high-throughput environments.',
    variables: { floydSpace: 'O(1)', hashSetSpace: 'O(N)', timeComplexity: 'O(N)' }
  },
  {
    title: '8. Complete: Return TRUE (Cycle Verified)',
    phase: 'COMPLETED',
    track: {
      label: 'Cycle Confirmed in O(N) Time & O(1) Space',
      items: [
        { val: '1 (Head)' },
        { val: '2' },
        { val: '3 (Cycle Start)', badge: '↻ Start' },
        { val: '4 (Meeting Point)', status: 'match', badge: '💥 Match' },
        { val: '5 (Tail -> 3)', badge: '↩ Loop' }
      ],
      pointers: [
        { index: 3, label: 'Verified Collision' }
      ]
    },
    activeI: 3,
    activeJ: 3,
    metrics: [
      { label: 'Result', value: 'true (Cycle Found)', highlight: true },
      { label: 'Time Complexity', value: 'O(N)' },
      { label: 'Space Complexity', value: 'O(1)' }
    ],
    formula: 'return true;',
    action: 'Algorithm concludes: Cycle exists in the linked list.',
    explain: 'Meeting of slow and fast pointers confirms the cycle. The algorithm returns true with O(N) runtime and O(1) extra memory.',
    intuition: "Floyd's algorithm provides an elegant, mathematical guarantee of cycle detection without altering the data structure.",
    variables: { hasCycle: true, totalIterations: 3, result: 'TRUE' }
  }
];

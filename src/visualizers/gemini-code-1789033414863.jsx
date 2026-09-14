import React, { useMemo } from 'react';

/*
 * Q-086 — Inserting Node To Linked List
 *
 * AlgoVision Studio visualizer.
 *
 * Input format:
 *   [value, indicator, value, indicator, ...]
 *
 * indicator:
 *   0 -> insert at beginning
 *   1 -> insert at end
 *
 * Example:
 *   [9,0,5,1,6,1,2,0,5,0]
 *
 * Result:
 *   5 -> 2 -> 9 -> 5 -> 6 -> NULL
 *
 * The Studio already supplies:
 *   - approach tabs
 *   - code viewer
 *   - transport controls
 *   - step title
 *   - step navigation
 *
 * Therefore this component renders ONLY the visualization canvas,
 * status HUD, and explanation.
 */

const DEFAULT_INPUT = [9, 0, 5, 1, 6, 1, 2, 0, 5, 0];

/* ============================================================
 * C++ reference implementations
 *
 * Every codeLine used by the visualizer maps exactly to one
 * physical line in the corresponding C++ solution below.
 * ============================================================ */

const CPP_INTUITIVE = `// C++ — Intuitive repeated traversal
1  Node* buildList(vector<pair<int,int>>& input) {
2      Node* head = NULL;
3
4      for (auto [x, pos] : input) {
5          Node* node = new Node(x);
6
7          if (pos == 0) {
8              node->next = head;
9              head = node;
10         } else {
11             if (head == NULL) {
12                 head = node;
13             } else {
14                 Node* curr = head;
15                 while (curr->next != NULL) {
16                     curr = curr->next;
17                 }
18                 curr->next = node;
19             }
20         }
21     }
22
23     return head;
24 }`;

const CPP_BETTER = `// C++ — Better: helper functions
1  Node* insertAtBeginning(Node* head, int x) {
2      Node* node = new Node(x);
3      node->next = head;
4      return node;
5  }
6
7  Node* insertAtEnd(Node* head, int x) {
8      Node* node = new Node(x);
9      if (head == NULL) return node;
10     Node* curr = head;
11     while (curr->next != NULL) {
12         curr = curr->next;
13     }
14     curr->next = node;
15     return head;
16 }
17
18 Node* buildList(vector<pair<int,int>>& input) {
19     Node* head = NULL;
20     for (auto [x, pos] : input) {
21         if (pos == 0) {
22             head = insertAtBeginning(head, x);
23         } else {
24             head = insertAtEnd(head, x);
25         }
26     }
27     return head;
28 }`;

const CPP_OPTIMAL = `// C++ — Optimal: head + tail
1  Node* buildList(vector<pair<int,int>>& input) {
2      Node* head = NULL;
3      Node* tail = NULL;
4
5      for (auto [x, pos] : input) {
6          Node* node = new Node(x);
7
8          if (head == NULL) {
9              head = node;
10             tail = node;
11         } else if (pos == 0) {
12             node->next = head;
13             head = node;
14         } else {
15             tail->next = node;
16             tail = node;
17         }
18     }
19
20     return head;
21 }`;

/* ============================================================
 * Java solutions
 * ============================================================ */

const JAVA_INTUITIVE = `class Solution {
    static class Node {
        int data;
        Node next;

        Node(int data) {
            this.data = data;
        }
    }

    static Node buildList(int[][] input) {
        Node head = null;

        for (int[] pair : input) {
            int x = pair[0];
            int pos = pair[1];

            Node node = new Node(x);

            if (pos == 0) {
                node.next = head;
                head = node;
            } else {
                if (head == null) {
                    head = node;
                } else {
                    Node curr = head;
                    while (curr.next != null) {
                        curr = curr.next;
                    }
                    curr.next = node;
                }
            }
        }

        return head;
    }
}`;

const JAVA_BETTER = `class Solution {
    static class Node {
        int data;
        Node next;

        Node(int data) {
            this.data = data;
        }
    }

    static Node insertAtBeginning(Node head, int x) {
        Node node = new Node(x);
        node.next = head;
        return node;
    }

    static Node insertAtEnd(Node head, int x) {
        Node node = new Node(x);

        if (head == null) {
            return node;
        }

        Node curr = head;

        while (curr.next != null) {
            curr = curr.next;
        }

        curr.next = node;
        return head;
    }

    static Node buildList(int[][] input) {
        Node head = null;

        for (int[] pair : input) {
            if (pair[1] == 0) {
                head = insertAtBeginning(head, pair[0]);
            } else {
                head = insertAtEnd(head, pair[0]);
            }
        }

        return head;
    }
}`;

const JAVA_OPTIMAL = `class Solution {
    static class Node {
        int data;
        Node next;

        Node(int data) {
            this.data = data;
        }
    }

    static Node buildList(int[][] input) {
        Node head = null;
        Node tail = null;

        for (int[] pair : input) {
            int x = pair[0];
            int pos = pair[1];

            Node node = new Node(x);

            if (head == null) {
                head = node;
                tail = node;
            } else if (pos == 0) {
                node.next = head;
                head = node;
            } else {
                tail.next = node;
                tail = node;
            }
        }

        return head;
    }
}`;

/* ============================================================
 * Python solutions
 * ============================================================ */

const PYTHON_INTUITIVE = `from typing import Optional

class Node:
    def __init__(self, data: int):
        self.data: int = data
        self.next: Optional["Node"] = None

def build_list(input_data: list[tuple[int, int]]) -> Optional[Node]:
    head: Optional[Node] = None

    for x, pos in input_data:
        node = Node(x)

        if pos == 0:
            node.next = head
            head = node
        else:
            if head is None:
                head = node
            else:
                curr = head
                while curr.next is not None:
                    curr = curr.next
                curr.next = node

    return head`;

const PYTHON_BETTER = `from typing import Optional

class Node:
    def __init__(self, data: int):
        self.data: int = data
        self.next: Optional["Node"] = None

def insert_at_beginning(head: Optional[Node], x: int) -> Node:
    node = Node(x)
    node.next = head
    return node

def insert_at_end(head: Optional[Node], x: int) -> Node:
    node = Node(x)

    if head is None:
        return node

    curr = head

    while curr.next is not None:
        curr = curr.next

    curr.next = node
    return head

def build_list(input_data: list[tuple[int, int]]) -> Optional[Node]:
    head: Optional[Node] = None

    for x, pos in input_data:
        if pos == 0:
            head = insert_at_beginning(head, x)
        else:
            head = insert_at_end(head, x)

    return head`;

const PYTHON_OPTIMAL = `from typing import Optional

class Node:
    def __init__(self, data: int):
        self.data: int = data
        self.next: Optional["Node"] = None

def build_list(input_data: list[tuple[int, int]]) -> Optional[Node]:
    head: Optional[Node] = None
    tail: Optional[Node] = None

    for x, pos in input_data:
        node = Node(x)

        if head is None:
            head = node
            tail = node

        elif pos == 0:
            node.next = head
            head = node

        else:
            assert tail is not None
            tail.next = node
            tail = node

    return head`;

/* ============================================================
 * Input helpers
 * ============================================================ */

function parseInput(customInput) {
    if (Array.isArray(customInput)) {
        const clean = customInput
            .map(Number)
            .filter((x) => Number.isFinite(x));

        return clean.length >= 2 ? clean : DEFAULT_INPUT;
    }

    if (typeof customInput === 'string') {
        const clean = customInput
            .split(/[\s,;->]+/)
            .map(Number)
            .filter((x) => Number.isFinite(x));

        return clean.length >= 2 ? clean : DEFAULT_INPUT;
    }

    return DEFAULT_INPUT;
}

function toPairs(input) {
    const pairs = [];

    for (let i = 0; i + 1 < input.length; i += 2) {
        pairs.push({
            value: input[i],
            indicator: input[i + 1],
        });
    }

    return pairs;
}

/* ============================================================
 * Memory address helpers
 * ============================================================ */

function addressFor(index) {
    return `0x${(0x7af0 + index * 0x30).toString(16).toUpperCase()}`;
}

function makeNode(value, index) {
    return {
        value,
        index,
        address: addressFor(index),
    };
}

/* ============================================================
 * Build intuitive / brute-force steps
 *
 * The actual supplied reference implementation does not keep a
 * tail pointer. Every END insertion walks from head to NULL.
 * ============================================================ */

function buildIntuitiveSteps(input) {
    const pairs = toPairs(input);
    const steps = [];

    let list = [];
    let allocated = 0;

    steps.push({
        title: 'Initialize head',
        codeLine: 2,
        variables: {
            head: 'NULL',
            curr: '—',
            x: '—',
            pos: '—',
        },
        status:
            '<span class="prev-b">head = NULL</span>',
        explain:
            'The linked list starts empty. There is no first node, so head points to NULL.',
        phase: 'initialize',
        list: [],
        pending: null,
        activeIndex: null,
        secondaryIndex: null,
        operation: null,
    });

    pairs.forEach((pair, pairIndex) => {
        const { value, indicator } = pair;

        const newNode = makeNode(value, allocated++);

        steps.push({
            title: `Read pair ${pairIndex + 1}: ${value}, ${indicator}`,
            codeLine: 4,
            variables: {
                head: list.length ? addressFor(0) : 'NULL',
                curr: '—',
                x: value,
                pos: indicator,
            },
            status:
                `<span class="prev-b">x = ${value}</span>, <b>pos = ${indicator}</b>`,
            explain:
                indicator === 0
                    ? `${value} has indicator 0, so it must become the new first node.`
                    : `${value} has indicator 1, so it must become the new last node.`,
            phase: 'read',
            list: list.map((v, i) => makeNode(v, i)),
            pending: newNode,
            activeIndex: null,
            secondaryIndex: null,
            operation: indicator === 0 ? 'BEGIN' : 'END',
        });

        steps.push({
            title: `Allocate node ${value}`,
            codeLine: 5,
            variables: {
                head: list.length ? addressFor(0) : 'NULL',
                curr: '—',
                x: value,
                pos: indicator,
                node: newNode.address,
            },
            status:
                `<span class="prev-b">new node = ${newNode.address}</span>, <b>value = ${value}</b>`,
            explain:
                `A fresh heap node is allocated for ${value}. Its next pointer will be connected during insertion.`,
            phase: 'allocate',
            list: list.map((v, i) => makeNode(v, i)),
            pending: newNode,
            activeIndex: null,
            secondaryIndex: null,
            operation: indicator === 0 ? 'BEGIN' : 'END',
        });

        if (indicator === 0) {
            steps.push({
                title: `Check beginning insertion`,
                codeLine: 7,
                variables: {
                    head: list.length ? addressFor(0) : 'NULL',
                    curr: '—',
                    x: value,
                    pos: 0,
                },
                status:
                    `<span class="prev-b">pos = 0</span>, <b>insert at beginning</b>`,
                explain:
                    'Indicator 0 selects the beginning-insertion branch.',
                phase: 'branch-begin',
                list: list.map((v, i) => makeNode(v, i)),
                pending: newNode,
                activeIndex: null,
                secondaryIndex: null,
                operation: 'BEGIN',
            });

            if (list.length === 0) {
                steps.push({
                    title: 'Empty list: node becomes head',
                    codeLine: 8,
                    variables: {
                        head: 'NULL',
                        curr: '—',
                        x: value,
                        pos: 0,
                        'node->next': 'NULL',
                    },
                    status:
                        `<span class="prev-b">head = NULL</span>, <b>new node.next = NULL</b>`,
                    explain:
                        'Because the list is empty, the new node has no successor. The returned node becomes head.',
                    phase: 'empty-begin',
                    list: [],
                    pending: newNode,
                    activeIndex: null,
                    secondaryIndex: null,
                    operation: 'BEGIN',
                });
            } else {
                steps.push({
                    title: `${value}.next points to old head`,
                    codeLine: 8,
                    variables: {
                        head: addressFor(0),
                        curr: '—',
                        x: value,
                        pos: 0,
                        'node->next': addressFor(0),
                    },
                    status:
                        `<span class="prev-b">node.next → old head</span>, <b>${value} → ${list[0]}</b>`,
                    explain:
                        `The new node must point to the old head ${list[0]} before head itself is changed.`,
                    phase: 'link-head',
                    list: list.map((v, i) => makeNode(v, i)),
                    pending: {
                        ...newNode,
                        next: addressFor(0),
                    },
                    activeIndex: 0,
                    secondaryIndex: null,
                    operation: 'BEGIN',
                });
            }

            const oldList = [...list];
            list = [value, ...list];

            steps.push({
                title: `Move head to ${value}`,
                codeLine: 9,
                variables: {
                    head: addressFor(0),
                    curr: '—',
                    x: value,
                    pos: 0,
                },
                status:
                    `<span class="prev-b">head = ${value}</span>, <b>old head follows it</b>`,
                explain:
                    oldList.length
                        ? `head now points to ${value}. The previous list remains intact after the new node.`
                        : `head now points to the only node, ${value}.`,
                phase: 'head-update',
                list: list.map((v, i) => makeNode(v, i)),
                pending: null,
                activeIndex: 0,
                secondaryIndex: oldList.length ? 1 : null,
                operation: 'BEGIN',
            });
        } else {
            steps.push({
                title: 'Check end insertion',
                codeLine: 10,
                variables: {
                    head: list.length ? addressFor(0) : 'NULL',
                    curr: '—',
                    x: value,
                    pos: 1,
                },
                status:
                    `<span class="prev-b">pos = 1</span>, <b>insert at end</b>`,
                explain:
                    'Indicator 1 selects the end-insertion branch.',
                phase: 'branch-end',
                list: list.map((v, i) => makeNode(v, i)),
                pending: newNode,
                activeIndex: null,
                secondaryIndex: null,
                operation: 'END',
            });

            if (list.length === 0) {
                steps.push({
                    title: 'NULL head must be handled',
                    codeLine: 11,
                    variables: {
                        head: 'NULL',
                        curr: '—',
                        x: value,
                        pos: 1,
                    },
                    status:
                        `<span class="prev-b">head == NULL</span>, <b>special case</b>`,
                    explain:
                        'There is no node to traverse. The new node itself becomes the head.',
                    phase: 'empty-end',
                    list: [],
                    pending: newNode,
                    activeIndex: null,
                    secondaryIndex: null,
                    operation: 'END',
                });

                list = [value];

                steps.push({
                    title: `Set head to ${value}`,
                    codeLine: 12,
                    variables: {
                        head: addressFor(0),
                        curr: '—',
                        x: value,
                        pos: 1,
                    },
                    status:
                        `<span class="prev-b">head = ${value}</span>`,
                    explain:
                        'For an empty list, inserting at the end produces the same one-node list as inserting at the beginning.',
                    phase: 'head-from-empty',
                    list: list.map((v, i) => makeNode(v, i)),
                    pending: null,
                    activeIndex: 0,
                    secondaryIndex: null,
                    operation: 'END',
                });
            } else {
                steps.push({
                    title: 'Start traversal from head',
                    codeLine: 14,
                    variables: {
                        head: addressFor(0),
                        curr: addressFor(0),
                        x: value,
                        pos: 1,
                    },
                    status:
                        `<span class="prev-b">curr = head</span>, <b>curr = ${list[0]}</b>`,
                    explain:
                        'Without a tail pointer, the algorithm must start at head and search for the final node.',
                    phase: 'traverse-start',
                    list: list.map((v, i) => makeNode(v, i)),
                    pending: newNode,
                    activeIndex: 0,
                    secondaryIndex: null,
                    operation: 'END',
                });

                for (let i = 0; i < list.length; i++) {
                    const isLast = i === list.length - 1;

                    steps.push({
                        title: isLast
                            ? `curr = ${list[i]} reaches NULL`
                            : `curr = ${list[i]}: move forward`,
                        codeLine: 15,
                        variables: {
                            head: addressFor(0),
                            curr: addressFor(i),
                            x: value,
                            pos: 1,
                            'curr->next': isLast
                                ? 'NULL'
                                : addressFor(i + 1),
                        },
                        status: isLast
                            ? `<span class="prev-b">curr = ${list[i]}</span>, <b>curr.next = NULL</b>`
                            : `<span class="prev-b">curr = ${list[i]}</span>, <b>curr.next ≠ NULL</b>`,
                        explain: isLast
                            ? `Node ${list[i]} is the current tail because its next pointer is NULL.`
                            : `Node ${list[i]} has a successor, so curr advances to ${list[i + 1]}.`,
                        phase: isLast ? 'found-tail' : 'traverse',
                        list: list.map((v, idx) => makeNode(v, idx)),
                        pending: newNode,
                        activeIndex: i,
                        secondaryIndex: isLast ? null : i + 1,
                        operation: 'END',
                    });

                    if (!isLast) {
                        steps.push({
                            title: `Move curr to ${list[i + 1]}`,
                            codeLine: 16,
                            variables: {
                                head: addressFor(0),
                                curr: addressFor(i + 1),
                                x: value,
                                pos: 1,
                            },
                            status:
                                `<span class="prev-b">curr = ${list[i + 1]}</span>, <b>continue searching</b>`,
                            explain:
                                `curr follows the next pointer from ${list[i]} to ${list[i + 1]}.`,
                            phase: 'move-curr',
                            list: list.map((v, idx) => makeNode(v, idx)),
                            pending: newNode,
                            activeIndex: i + 1,
                            secondaryIndex: i,
                            operation: 'END',
                        });
                    }
                }

                const last = list.length - 1;

                steps.push({
                    title: `Attach ${value} after ${list[last]}`,
                    codeLine: 18,
                    variables: {
                        head: addressFor(0),
                        curr: addressFor(last),
                        x: value,
                        pos: 1,
                        'curr->next': newNode.address,
                    },
                    status:
                        `<span class="prev-b">curr = ${list[last]}</span>, <b>curr.next → ${value}</b>`,
                    explain:
                        `The old tail ${list[last]} had next = NULL. Its next pointer is rewired to the new node ${value}.`,
                    phase: 'link-tail',
                    list: [...list].map((v, i) => makeNode(v, i)),
                    pending: {
                        ...newNode,
                        next: 'NULL',
                    },
                    activeIndex: last,
                    secondaryIndex: null,
                    operation: 'END',
                });

                list = [...list, value];

                steps.push({
                    title: `${value} becomes the final node`,
                    codeLine: 18,
                    variables: {
                        head: addressFor(0),
                        curr: addressFor(list.length - 1),
                        x: value,
                        pos: 1,
                        'curr->next': 'NULL',
                    },
                    status:
                        `<span class="prev-b">tail = ${value}</span>, <b>next = NULL</b>`,
                    explain:
                        `${value} is now the last node, so its next pointer remains NULL.`,
                    phase: 'tail-complete',
                    list: list.map((v, i) => makeNode(v, i)),
                    pending: null,
                    activeIndex: list.length - 1,
                    secondaryIndex: last,
                    operation: 'END',
                });
            }
        }
    });

    steps.push({
        title: 'Construction complete',
        codeLine: 23,
        variables: {
            head: addressFor(0),
            curr: '—',
            size: list.length,
        },
        status:
            `<span class="prev-b">head → ${list.join(' → ')}</span> <b>→ NULL</b>`,
        explain:
            'Every input pair has been processed. The resulting linked list is the required answer.',
        phase: 'done',
        list: list.map((v, i) => makeNode(v, i)),
        pending: null,
        activeIndex: null,
        secondaryIndex: null,
        operation: 'DONE',
    });

    return steps;
}

/* ============================================================
 * Better approach
 *
 * Uses insertAtBeginning / insertAtEnd helper functions.
 * It improves organization and readability, but end insertion
 * still traverses from head, so worst-case time remains O(N²).
 * ============================================================ */

function buildBetterSteps(input) {
    const base = buildIntuitiveSteps(input);

    return base.map((step) => {
        let codeLine = step.codeLine;

        if (step.phase === 'allocate') codeLine = 2;
        if (step.phase === 'link-head') codeLine = 3;
        if (step.phase === 'head-update') codeLine = 4;
        if (step.phase === 'empty-end') codeLine = 9;
        if (step.phase === 'head-from-empty') codeLine = 12;
        if (step.phase === 'traverse-start') codeLine = 10;
        if (step.phase === 'traverse') codeLine = 11;
        if (step.phase === 'move-curr') codeLine = 12;
        if (step.phase === 'found-tail') codeLine = 11;
        if (step.phase === 'link-tail') codeLine = 14;
        if (step.phase === 'tail-complete') codeLine = 14;

        if (step.phase === 'read') {
            codeLine = step.operation === 'BEGIN' ? 21 : 23;
        }

        if (step.phase === 'branch-begin') codeLine = 21;
        if (step.phase === 'branch-end') codeLine = 23;

        if (step.phase === 'empty-begin') codeLine = 3;
        if (step.phase === 'initialize') codeLine = 19;
        if (step.phase === 'done') codeLine = 27;

        return {
            ...step,
            codeLine,
        };
    });
}

/* ============================================================
 * Optimal approach
 *
 * The optimal implementation maintains BOTH head and tail.
 *
 * This means:
 *
 *   Beginning insertion:
 *       node.next = head
 *       head = node
 *
 *   End insertion:
 *       tail.next = node
 *       tail = node
 *
 * No traversal is required.
 * ============================================================ */

function buildOptimalSteps(input) {
    const pairs = toPairs(input);
    const steps = [];

    let list = [];
    let allocated = 0;

    steps.push({
        title: 'Initialize head and tail',
        codeLine: 2,
        variables: {
            head: 'NULL',
            tail: 'NULL',
            x: '—',
            pos: '—',
        },
        status:
            '<span class="prev-b">head = NULL</span>, <b>tail = NULL</b>',
        explain:
            'We keep two pointers: head identifies the first node and tail identifies the last node.',
        phase: 'initialize',
        list: [],
        pending: null,
        activeIndex: null,
        secondaryIndex: null,
        operation: null,
    });

    pairs.forEach((pair, pairIndex) => {
        const { value, indicator } = pair;
        const newNode = makeNode(value, allocated++);

        steps.push({
            title: `Read pair ${pairIndex + 1}: ${value}, ${indicator}`,
            codeLine: 5,
            variables: {
                head: list.length ? addressFor(0) : 'NULL',
                tail: list.length ? addressFor(list.length - 1) : 'NULL',
                x: value,
                pos: indicator,
            },
            status:
                `<span class="prev-b">x = ${value}</span>, <b>pos = ${indicator}</b>`,
            explain:
                indicator === 0
                    ? `${value} must be inserted at the beginning.`
                    : `${value} must be inserted at the end.`,
            phase: 'read',
            list: list.map((v, i) => makeNode(v, i)),
            pending: newNode,
            activeIndex: null,
            secondaryIndex: null,
            operation: indicator === 0 ? 'BEGIN' : 'END',
        });

        steps.push({
            title: `Allocate node ${value}`,
            codeLine: 6,
            variables: {
                head: list.length ? addressFor(0) : 'NULL',
                tail: list.length ? addressFor(list.length - 1) : 'NULL',
                node: newNode.address,
                x: value,
                pos: indicator,
            },
            status:
                `<span class="prev-b">new Node(${value})</span>, <b>${newNode.address}</b>`,
            explain:
                `A new node containing ${value} is allocated. It will be connected to the existing list.`,
            phase: 'allocate',
            list: list.map((v, i) => makeNode(v, i)),
            pending: newNode,
            activeIndex: null,
            secondaryIndex: null,
            operation: indicator === 0 ? 'BEGIN' : 'END',
        });

        if (list.length === 0) {
            steps.push({
                title: 'Empty-list special case',
                codeLine: 8,
                variables: {
                    head: 'NULL',
                    tail: 'NULL',
                    node: newNode.address,
                    x: value,
                    pos: indicator,
                },
                status:
                    `<span class="prev-b">head == NULL</span>, <b>first node must initialize both pointers</b>`,
                explain:
                    'This is the critical NULL case: with no nodes, the new node is simultaneously the head and the tail.',
                phase: 'empty-case',
                list: [],
                pending: newNode,
                activeIndex: null,
                secondaryIndex: null,
                operation: indicator === 0 ? 'BEGIN' : 'END',
            });

            list = [value];

            steps.push({
                title: `head and tail → ${value}`,
                codeLine: 9,
                variables: {
                    head: addressFor(0),
                    tail: addressFor(0),
                    x: value,
                    pos: indicator,
                },
                status:
                    `<span class="prev-b">head = ${value}</span>, <b>tail = ${value}</b>`,
                explain:
                    `The first node ${value} is both the beginning and the end of the list.`,
                phase: 'first-node',
                list: list.map((v, i) => makeNode(v, i)),
                pending: null,
                activeIndex: 0,
                secondaryIndex: null,
                operation: indicator === 0 ? 'BEGIN' : 'END',
            });

            return;
        }

        if (indicator === 0) {
            steps.push({
                title: `Insert ${value} at beginning`,
                codeLine: 11,
                variables: {
                    head: addressFor(0),
                    tail: addressFor(list.length - 1),
                    x: value,
                    pos: 0,
                },
                status:
                    `<span class="prev-b">pos = 0</span>, <b>use head pointer</b>`,
                explain:
                    'Beginning insertion does not require traversal. We only need to reconnect the new node to head.',
                phase: 'branch-begin',
                list: list.map((v, i) => makeNode(v, i)),
                pending: newNode,
                activeIndex: 0,
                secondaryIndex: null,
                operation: 'BEGIN',
            });

            steps.push({
                title: `${value}.next → old head`,
                codeLine: 12,
                variables: {
                    head: addressFor(0),
                    tail: addressFor(list.length - 1),
                    node: newNode.address,
                    'node->next': addressFor(0),
                },
                status:
                    `<span class="prev-b">node.next → ${list[0]}</span>, <b>old head preserved</b>`,
                explain:
                    `Before moving head, connect ${value}'s next pointer to the current first node ${list[0]}.`,
                phase: 'link-head',
                list: list.map((v, i) => makeNode(v, i)),
                pending: {
                    ...newNode,
                    next: addressFor(0),
                },
                activeIndex: 0,
                secondaryIndex: null,
                operation: 'BEGIN',
            });

            list = [value, ...list];

            steps.push({
                title: `head → ${value}`,
                codeLine: 13,
                variables: {
                    head: addressFor(0),
                    tail: addressFor(list.length - 1),
                    x: value,
                    pos: 0,
                },
                status:
                    `<span class="prev-b">head = ${value}</span>, <b>tail remains ${list[list.length - 1]}</b>`,
                explain:
                    `head now points to ${value}. The old head becomes the second node.`,
                phase: 'head-update',
                list: list.map((v, i) => makeNode(v, i)),
                pending: null,
                activeIndex: 0,
                secondaryIndex: 1,
                operation: 'BEGIN',
            });
        } else {
            steps.push({
                title: `Insert ${value} at end`,
                codeLine: 14,
                variables: {
                    head: addressFor(0),
                    tail: addressFor(list.length - 1),
                    x: value,
                    pos: 1,
                },
                status:
                    `<span class="prev-b">pos = 1</span>, <b>use tail pointer</b>`,
                explain:
                    'Because tail already points to the final node, we do not need to walk through the list.',
                phase: 'branch-end',
                list: list.map((v, i) => makeNode(v, i)),
                pending: newNode,
                activeIndex: list.length - 1,
                secondaryIndex: null,
                operation: 'END',
            });

            const oldTail = list.length - 1;

            steps.push({
                title: `${list[oldTail]}.next → ${value}`,
                codeLine: 15,
                variables: {
                    head: addressFor(0),
                    tail: addressFor(oldTail),
                    node: newNode.address,
                    'tail->next': newNode.address,
                },
                status:
                    `<span class="prev-b">tail = ${list[oldTail]}</span>, <b>tail.next → ${value}</b>`,
                explain:
                    `tail already identifies the last node ${list[oldTail]}. Directly connect its next pointer to ${value}.`,
                phase: 'link-tail',
                list: list.map((v, i) => makeNode(v, i)),
                pending: {
                    ...newNode,
                    next: 'NULL',
                },
                activeIndex: oldTail,
                secondaryIndex: null,
                operation: 'END',
            });

            list = [...list, value];

            steps.push({
                title: `tail → ${value}`,
                codeLine: 16,
                variables: {
                    head: addressFor(0),
                    tail: addressFor(list.length - 1),
                    x: value,
                    pos: 1,
                },
                status:
                    `<span class="prev-b">tail = ${value}</span>, <b>${value}.next = NULL</b>`,
                explain:
                    `${value} is now the final node, so tail moves to it. No traversal was necessary.`,
                phase: 'tail-update',
                list: list.map((v, i) => makeNode(v, i)),
                pending: null,
                activeIndex: list.length - 1,
                secondaryIndex: oldTail,
                operation: 'END',
            });
        }
    });

    steps.push({
        title: 'Construction complete',
        codeLine: 20,
        variables: {
            head: addressFor(0),
            tail: addressFor(list.length - 1),
            size: list.length,
        },
        status:
            `<span class="prev-b">head → ${list.join(' → ')}</span> <b>→ NULL</b>`,
        explain:
            'All input pairs have been processed. Head identifies the first node, tail identifies the last node, and the final node points to NULL.',
        phase: 'done',
        list: list.map((v, i) => makeNode(v, i)),
        pending: null,
        activeIndex: null,
        secondaryIndex: null,
        operation: 'DONE',
    });

    return steps;
}

/* ============================================================
 * Approach metadata
 * ============================================================ */

export const approaches = {
    intuitive: {
        title: 'Intuitive: Repeated Traversal',
        badge: 'Brute Force',
        complexity: {
            time: 'O(N²) worst case',
            space: 'O(1)',
        },
        steps: buildIntuitiveSteps(DEFAULT_INPUT),
        solutions: {
            cpp: CPP_INTUITIVE,
            java: JAVA_INTUITIVE,
            python: PYTHON_INTUITIVE,
        },
    },

    better: {
        title: 'Better: Helper Functions',
        badge: 'Sub-Optimal',
        complexity: {
            time: 'O(N²) worst case',
            space: 'O(1)',
        },
        steps: buildBetterSteps(DEFAULT_INPUT),
        solutions: {
            cpp: CPP_BETTER,
            java: JAVA_BETTER,
            python: PYTHON_BETTER,
        },
    },

    optimal: {
        title: 'Optimal: Head + Tail',
        badge: 'Optimal',
        complexity: {
            time: 'O(N)',
            space: 'O(1) auxiliary',
        },
        steps: buildOptimalSteps(DEFAULT_INPUT),
        solutions: {
            cpp: CPP_OPTIMAL,
            java: JAVA_OPTIMAL,
            python: PYTHON_OPTIMAL,
        },
    },
};

export const solutions = approaches.optimal.solutions;

export const steps = approaches.optimal.steps;

export const meta = {
    display_id: 'Q-086',
    title: 'Inserting Node To Linked List',
    category: '4. Linked List',
    difficulty: 'Medium',
    timeComplexity: 'O(N) with head + tail pointers',
    spaceComplexity: 'O(1) auxiliary space',
    description:
        'Create a linked list by inserting each value either at the beginning or at the end according to its indicator. The optimal visualization maintains both head and tail pointers so every insertion is constant time.',
};

/* ============================================================
 * SVG primitives
 * ============================================================ */

function AddressTag({ address, x, y }) {
    return (
        <g>
            <rect
                x={x - 34}
                y={y - 14}
                width="68"
                height="18"
                rx="3"
                fill="#1c2529"
                stroke="#5f6f6a"
                strokeWidth="1"
                filter="url(#rough)"
            />
            <text
                x={x}
                y={y - 2}
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="8.5"
                fill="#8fa09a"
            >
                {address}
            </text>
        </g>
    );
}

function PointerLabel({
    label,
    x,
    y,
    secondary = false,
}) {
    return (
        <g>
            <text
                x={x}
                y={y}
                textAnchor="middle"
                fontFamily="Kalam, cursive"
                fontSize="14"
                fill={secondary ? '#5fb3a6' : '#e8a33d'}
            >
                {label}
            </text>
        </g>
    );
}

function LinkedNode({
    node,
    x,
    y,
    width = 104,
    height = 58,
    active = false,
    secondary = false,
}) {
    const stroke = active
        ? '#e8a33d'
        : secondary
            ? '#5fb3a6'
            : '#5f6f6a';

    const strokeWidth = active ? 2.2 : secondary ? 1.6 : 1.4;

    return (
        <g>
            {active && (
                <rect
                    x={x - 5}
                    y={y - 5}
                    width={width + 10}
                    height={height + 10}
                    rx="6"
                    fill="none"
                    stroke="#e8a33d"
                    strokeWidth="2.2"
                    opacity="0.45"
                />
            )}

            <AddressTag
                address={node.address}
                x={x + width / 2}
                y={y}
            />

            <rect
                x={x}
                y={y + 8}
                width={width}
                height={height}
                rx="3"
                fill="#1c2529"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeDasharray={secondary ? '3 4' : undefined}
                filter="url(#rough)"
            />

            <line
                x1={x + width * 0.28}
                y1={y + 8}
                x2={x + width * 0.28}
                y2={y + 8 + height}
                stroke="rgba(238,241,234,0.09)"
                strokeWidth="1"
            />

            <line
                x1={x + width * 0.72}
                y1={y + 8}
                x2={x + width * 0.72}
                y2={y + 8 + height}
                stroke="rgba(238,241,234,0.09)"
                strokeWidth="1"
            />

            <text
                x={x + width * 0.14}
                y={y + 31}
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="8"
                fill="#5f6f6a"
            >
                PREV
            </text>

            <text
                x={x + width * 0.5}
                y={y + 40}
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="16"
                fontWeight="500"
                fill="#eef1ea"
            >
                {node.value}
            </text>

            <text
                x={x + width * 0.86}
                y={y + 31}
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="8"
                fill="#5f6f6a"
            >
                NEXT
            </text>

            <text
                x={x + width / 2}
                y={y + 8 + height + 17}
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="10.5"
                fill="#5f6f6a"
            >
                node[{node.index}]
            </text>
        </g>
    );
}

function Arrow({
    x1,
    y1,
    x2,
    y2,
    active = false,
    dashed = false,
}) {
    return (
        <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={active ? '#e8a33d' : '#5f6f6a'}
            strokeWidth={active ? 1.8 : 1.2}
            strokeDasharray={dashed ? '4 4' : undefined}
            markerEnd="url(#arrowhead)"
        />
    );
}

/* ============================================================
 * Canvas
 * ============================================================ */

function LinkedListCanvas({ stepData }) {
    const list = stepData.list || [];
    const pending = stepData.pending;

    const nodeWidth = list.length > 5 ? 90 : 104;
    const gap = list.length > 5 ? 25 : 38;
    const startX = 42;
    const nodeY = 92;

    const totalWidth =
        startX +
        list.length * nodeWidth +
        Math.max(0, list.length - 1) * gap +
        90;

    const viewWidth = Math.max(620, Math.min(1000, totalWidth));
    const viewHeight = pending ? 310 : 250;

    return (
        <div
            className="w-full overflow-x-auto"
            style={{
                background: '#12181a',
                borderTop: '1px solid rgba(238,241,234,0.09)',
                borderBottom: '1px solid rgba(238,241,234,0.09)',
            }}
        >
            <svg
                viewBox={`0 0 ${viewWidth} ${viewHeight}`}
                width="100%"
                height={viewHeight}
                role="img"
                aria-label="Linked list pointer visualization"
                style={{
                    minWidth: list.length > 6 ? `${viewWidth}px` : undefined,
                }}
            >
                <defs>
                    <filter id="rough">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.02"
                            numOctaves="1"
                            seed="7"
                            result="noise"
                        />
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="noise"
                            scale="0.45"
                        />
                    </filter>

                    <marker
                        id="arrowhead"
                        markerWidth="7"
                        markerHeight="7"
                        refX="5"
                        refY="3.5"
                        orient="auto"
                        markerUnits="strokeWidth"
                    >
                        <path
                            d="M0,0 L7,3.5 L0,7 Z"
                            fill="#5f6f6a"
                        />
                    </marker>

                    <marker
                        id="arrowhead-active"
                        markerWidth="7"
                        markerHeight="7"
                        refX="5"
                        refY="3.5"
                        orient="auto"
                        markerUnits="strokeWidth"
                    >
                        <path
                            d="M0,0 L7,3.5 L0,7 Z"
                            fill="#e8a33d"
                        />
                    </marker>
                </defs>

                {/* Canvas heading */}
                <text
                    x="28"
                    y="26"
                    fontFamily="Kalam, cursive"
                    fontSize="15"
                    fill="#8fa09a"
                >
                    heap / linked-list memory
                </text>

                {/* HEAD pointer */}
                {list.length > 0 && (
                    <>
                        <PointerLabel
                            label="head"
                            x={startX + nodeWidth / 2}
                            y={61}
                        />

                        <Arrow
                            x1={startX + nodeWidth / 2}
                            y1={68}
                            x2={startX + nodeWidth / 2}
                            y2={88}
                            active={stepData.activeIndex === 0}
                        />
                    </>
                )}

                {/* TAIL pointer */}
                {list.length > 0 &&
                    stepData.variables?.tail &&
                    stepData.variables.tail !== 'NULL' && (
                        <>
                            <PointerLabel
                                label="tail"
                                x={
                                    startX +
                                    (list.length - 1) *
                                    (nodeWidth + gap) +
                                    nodeWidth / 2
                                }
                                y={61}
                                secondary
                            />

                            <Arrow
                                x1={
                                    startX +
                                    (list.length - 1) *
                                    (nodeWidth + gap) +
                                    nodeWidth / 2
                                }
                                y1={68}
                                x2={
                                    startX +
                                    (list.length - 1) *
                                    (nodeWidth + gap) +
                                    nodeWidth / 2
                                }
                                y2={88}
                                dashed
                            />
                        </>
                    )}

                {/* Nodes */}
                {list.map((node, index) => {
                    const x =
                        startX +
                        index * (nodeWidth + gap);

                    const isActive =
                        stepData.activeIndex === index;

                    const isSecondary =
                        stepData.secondaryIndex === index;

                    return (
                        <React.Fragment key={`${node.address}-${index}`}>
                            <LinkedNode
                                node={node}
                                x={x}
                                y={nodeY}
                                width={nodeWidth}
                                active={isActive}
                                secondary={isSecondary}
                            />

                            {index < list.length - 1 && (
                                <Arrow
                                    x1={x + nodeWidth + 3}
                                    y1={nodeY + 37}
                                    x2={x + nodeWidth + gap - 4}
                                    y2={nodeY + 37}
                                    active={
                                        stepData.phase === 'link-tail' &&
                                        index === stepData.activeIndex
                                    }
                                />
                            )}
                        </React.Fragment>
                    );
                })}

                {/* NULL at the end */}
                {list.length > 0 && (
                    <>
                        <line
                            x1={
                                startX +
                                (list.length - 1) *
                                (nodeWidth + gap) +
                                nodeWidth
                            }
                            y1={nodeY + 37}
                            x2={
                                startX +
                                (list.length - 1) *
                                (nodeWidth + gap) +
                                nodeWidth +
                                45
                            }
                            y2={nodeY + 37}
                            stroke="#5f6f6a"
                            strokeWidth="1.2"
                            markerEnd="url(#arrowhead)"
                        />

                        <text
                            x={
                                startX +
                                (list.length - 1) *
                                (nodeWidth + gap) +
                                nodeWidth +
                                62
                            }
                            y={nodeY + 42}
                            fontFamily="IBM Plex Mono, monospace"
                            fontSize="11"
                            fill="#5f6f6a"
                        >
                            NULL
                        </text>
                    </>
                )}

                {/* Empty list */}
                {list.length === 0 && (
                    <g>
                        <text
                            x={viewWidth / 2}
                            y="130"
                            textAnchor="middle"
                            fontFamily="IBM Plex Mono, monospace"
                            fontSize="15"
                            fill="#e06c75"
                        >
                            HEAD → NULL
                        </text>

                        <text
                            x={viewWidth / 2}
                            y="154"
                            textAnchor="middle"
                            fontFamily="Kalam, cursive"
                            fontSize="13"
                            fill="#5f6f6a"
                        >
                            empty linked list
                        </text>
                    </g>
                )}

                {/* Pending node */}
                {pending && (
                    <g>
                        <text
                            x={viewWidth / 2}
                            y={viewHeight - 63}
                            textAnchor="middle"
                            fontFamily="Kalam, cursive"
                            fontSize="14"
                            fill="#e8a33d"
                        >
                            NEW NODE
                        </text>

                        <LinkedNode
                            node={pending}
                            x={viewWidth / 2 - 52}
                            y={viewHeight - 55}
                            width={104}
                            active
                        />
                    </g>
                )}

                {/* Operation annotation */}
                {stepData.operation && (
                    <g>
                        <rect
                            x={viewWidth - 125}
                            y="15"
                            width="95"
                            height="25"
                            rx="3"
                            fill="#1c2529"
                            stroke={
                                stepData.operation === 'BEGIN'
                                    ? '#5fb3a6'
                                    : stepData.operation === 'END'
                                        ? '#e8a33d'
                                        : '#5f6f6a'
                            }
                            strokeWidth="1"
                        />

                        <text
                            x={viewWidth - 77.5}
                            y="32"
                            textAnchor="middle"
                            fontFamily="IBM Plex Mono, monospace"
                            fontSize="10"
                            fill={
                                stepData.operation === 'BEGIN'
                                    ? '#5fb3a6'
                                    : stepData.operation === 'END'
                                        ? '#e8a33d'
                                        : '#8fa09a'
                            }
                        >
                            {stepData.operation === 'BEGIN'
                                ? 'INSERT FRONT'
                                : stepData.operation === 'END'
                                    ? 'INSERT END'
                                    : 'COMPLETE'}
                        </text>
                    </g>
                )}
            </svg>
        </div>
    );
}

/* ============================================================
 * Input tape visualization
 * ============================================================ */

function InputTape({ input, stepData }) {
    const pairs = toPairs(input);

    let activePair = -1;

    if (
        stepData.variables &&
        stepData.variables.x !== undefined
    ) {
        activePair = pairs.findIndex(
            (pair) =>
                pair.value === stepData.variables.x &&
                pair.indicator === stepData.variables.pos
        );
    }

    return (
        <div
            className="w-full px-4 py-3"
            style={{
                borderBottom:
                    '1px solid rgba(238,241,234,0.09)',
            }}
        >
            <div
                style={{
                    fontFamily: 'Kalam, cursive',
                    fontSize: 13,
                    color: '#8fa09a',
                    marginBottom: 8,
                }}
            >
                input literals
            </div>

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 7,
                }}
            >
                {pairs.map((pair, index) => {
                    const active = index === activePair;

                    return (
                        <div
                            key={`${pair.value}-${pair.indicator}-${index}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                border: `1.4px solid ${
                                    active
                                        ? '#e8a33d'
                                        : 'rgba(238,241,234,0.09)'
                                }`,
                                background: '#1c2529',
                                borderRadius: 3,
                                padding: '5px 8px',
                                fontFamily:
                                    'IBM Plex Mono, monospace',
                                fontSize: 11,
                                boxShadow: active
                                    ? '0 0 0 3px rgba(232,163,61,0.12)'
                                    : 'none',
                            }}
                        >
                            <span
                                style={{
                                    color: '#eef1ea',
                                    fontSize: 13,
                                }}
                            >
                                {pair.value}
                            </span>

                            <span
                                style={{
                                    margin: '0 5px',
                                    color: '#5f6f6a',
                                }}
                            >
                                :
                            </span>

                            <span
                                style={{
                                    color:
                                        pair.indicator === 0
                                            ? '#5fb3a6'
                                            : '#e8a33d',
                                }}
                            >
                                {pair.indicator === 0
                                    ? 'BEGIN'
                                    : 'END'}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ============================================================
 * Main component
 * ============================================================ */

export default function GeminiCode1789033414863({
    currentStep = 0,
    onStepChange,
    customInput = '',
    customTarget = '',
    approachTier = 'optimal',
}) {
    const input = useMemo(
        () => parseInput(customInput),
        [customInput]
    );

    const activeApproach =
        approaches[approachTier] || approaches.optimal;

    const activeSteps = useMemo(() => {
        if (approachTier === 'intuitive') {
            return buildIntuitiveSteps(input);
        }

        if (approachTier === 'better') {
            return buildBetterSteps(input);
        }

        return buildOptimalSteps(input);
    }, [input, approachTier]);

    const stepIndex = Math.min(
        Math.max(0, currentStep),
        Math.max(0, activeSteps.length - 1)
    );

    const stepData =
        activeSteps[stepIndex] || activeSteps[0];

    return (
        <div
            className="w-full flex flex-col"
            style={{
                background: '#12181a',
                color: '#eef1ea',
                minHeight: 420,
                fontFamily:
                    'IBM Plex Mono, monospace',
            }}
        >
            {/* Input sequence */}
            <InputTape
                input={input}
                stepData={stepData}
            />

            {/* Main linked-list canvas */}
            <LinkedListCanvas
                stepData={stepData}
            />

            {/* =================================================
             * STATUS HUD
             * ================================================= */}

            <div
                className="status-line"
                style={{
                    padding: '12px 16px 5px',
                    fontFamily:
                        'IBM Plex Mono, monospace',
                    fontSize: 12,
                    color: '#eef1ea',
                }}
            >
                {stepData.status && (
                    <span
                        dangerouslySetInnerHTML={{
                            __html: stepData.status,
                        }}
                    />
                )}
            </div>

            {/* =================================================
             * VARIABLE INSPECTOR
             * ================================================= */}

            {stepData.variables && (
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 7,
                        padding:
                            '4px 16px 9px',
                    }}
                >
                    {Object.entries(
                        stepData.variables
                    ).map(([name, value]) => (
                        <div
                            key={name}
                            style={{
                                display: 'flex',
                                gap: 6,
                                alignItems:
                                    'center',
                                border:
                                    '1px solid rgba(238,241,234,0.09)',
                                background:
                                    '#1c2529',
                                borderRadius: 3,
                                padding:
                                    '4px 7px',
                                fontSize: 10,
                            }}
                        >
                            <span
                                style={{
                                    color: '#5f6f6a',
                                }}
                            >
                                {name}
                            </span>

                            <span
                                style={{
                                    color:
                                        name ===
                                            'curr' ||
                                            name ===
                                            'node' ||
                                            name ===
                                            'head' ||
                                            name ===
                                            'tail'
                                            ? '#e8a33d'
                                            : '#eef1ea',
                                }}
                            >
                                {String(value)}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* =================================================
             * EXPLANATION
             * ================================================= */}

            {stepData.explain && (
                <p
                    className="explain"
                    style={{
                        margin: 0,
                        padding:
                            '4px 16px 14px',
                        fontFamily:
                            'Kalam, cursive',
                        fontSize: 14,
                        lineHeight: 1.45,
                        color: '#8fa09a',
                    }}
                >
                    {stepData.explain}
                </p>
            )}

            {/* =================================================
             * POINTER INVARIANT
             * ================================================= */}

            <div
                style={{
                    borderTop:
                        '1px solid rgba(238,241,234,0.09)',
                    padding:
                        '8px 16px 10px',
                    display: 'flex',
                    justifyContent:
                        'space-between',
                    gap: 12,
                    flexWrap: 'wrap',
                }}
            >
                <span
                    style={{
                        fontFamily:
                            'IBM Plex Mono, monospace',
                        fontSize: 9.5,
                        color: '#5f6f6a',
                    }}
                >
                    {approachTier === 'optimal'
                        ? 'INVARIANT: head = first node, tail = last node'
                        : 'INVARIANT: head always identifies the first node'}
                </span>

                <span
                    style={{
                        fontFamily:
                            'IBM Plex Mono, monospace',
                        fontSize: 9.5,
                        color:
                            activeApproach.badge ===
                            'Optimal'
                                ? '#7cb473'
                                : '#8fa09a',
                    }}
                >
                    {activeApproach.complexity.time}
                    {' · '}
                    {activeApproach.complexity.space}
                </span>
            </div>
        </div>
    );
}
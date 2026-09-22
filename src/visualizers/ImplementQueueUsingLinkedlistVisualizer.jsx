import React from 'react';

export const meta = {
  title: 'Implement Queue using LinkedList',
  category: 'Stack and Queues',
  difficulty: 'Easy',
  timeComplexity: 'push: O(1), pop: O(1)',
  spaceComplexity: 'O(N)',
  description: 'A dynamic FIFO Queue implemented with a singly linked list maintaining two pointers: `front` pointing to the head node for deletions, and `rear` pointing to the tail node for insertions.'
};

export const solutions = {
  cpp: `// C++: Implement Queue using Singly LinkedList
// push: O(1) | pop: O(1)
#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedListQueue {
private:
    Node* front;
    Node* rear;
    int sz;

public:
    LinkedListQueue() : front(nullptr), rear(nullptr), sz(0) {}

    void push(int x) {
        Node* newNode = new Node(x);
        if (!rear) {
            front = rear = newNode;
        } else {
            rear->next = newNode;
            rear = newNode;
        }
        sz++;
    }

    int pop() {
        if (!front) return -1;
        Node* temp = front;
        int val = temp->data;
        front = front->next;
        if (!front) rear = nullptr;
        delete temp;
        sz--;
        return val;
    }

    int getFront() {
        return front ? front->data : -1;
    }

    int size() {
        return sz;
    }
};`,
  java: `// Java: Implement Queue using LinkedList
class Node {
    int data;
    Node next;
    Node(int val) {
        this.data = val;
        this.next = null;
    }
}

class LinkedListQueue {
    private Node front = null;
    private Node rear = null;
    private int sz = 0;

    public void push(int x) {
        Node newNode = new Node(x);
        if (rear == null) {
            front = rear = newNode;
        } else {
            rear.next = newNode;
            rear = newNode;
        }
        sz++;
    }

    public int pop() {
        if (front == null) return -1;
        int val = front.data;
        front = front.next;
        if (front == null) rear = null;
        sz--;
        return val;
    }

    public int getFront() {
        return front != null ? front.data : -1;
    }

    public int size() {
        return sz;
    }
}`,
  python: `# Python 3: Implement Queue using LinkedList
class Node:
    def __init__(self, data: int):
        self.data = data
        self.next = None

class LinkedListQueue:
    def __init__(self):
        self.front = None
        self.rear = None
        self.sz = 0

    def push(self, x: int) -> None:
        new_node = Node(x)
        if not self.rear:
            self.front = self.rear = new_node
        else:
            self.rear.next = new_node
            self.rear = new_node
        self.sz += 1

    def pop(self) -> int:
        if not self.front:
            return -1
        val = self.front.data
        self.front = self.front.next
        if not self.front:
            self.rear = None
        self.sz -= 1
        return val

    def get_front(self) -> int:
        return self.front.data if self.front else -1

    def size(self) -> int:
        return self.sz`,
  javascript: `// JavaScript: Implement Queue using LinkedList
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedListQueue {
    constructor() {
        this.front = null;
        this.rear = null;
        this.sz = 0;
    }

    push(x) {
        const newNode = new Node(x);
        if (!this.rear) {
            this.front = this.rear = newNode;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;
        }
        this.sz++;
    }

    pop() {
        if (!this.front) return -1;
        const val = this.front.data;
        this.front = this.front.next;
        if (!this.front) this.rear = null;
        this.sz--;
        return val;
    }

    getFront() {
        return this.front ? this.front.data : -1;
    }

    size() {
        return this.sz;
    }
}`
};

export const steps = [
  {
    title: '1. Initialize Empty LinkedList Queue',
    phase: 'INIT',
    codeLine: 19,
    nodes: [],
    action: 'new LinkedListQueue()',
    explain: 'front = null, rear = null. No nodes allocated.'
  },
  {
    title: '2. push(10): First Node Created',
    phase: 'PUSH',
    codeLine: 24,
    nodes: [10],
    action: 'push(10)',
    explain: 'First node created with value 10. front and rear both point to this single node.'
  },
  {
    title: '3. push(20): Attach at rear &rarr; next = 20, advance rear',
    phase: 'PUSH',
    codeLine: 27,
    nodes: [10, 20],
    action: 'push(20)',
    explain: 'Node 20 allocated. rear.next = node(20); rear advances to node(20).'
  },
  {
    title: '4. push(30): Append to rear &rarr; [10 &rarr; 20 &rarr; 30]',
    phase: 'PUSH',
    codeLine: 27,
    nodes: [10, 20, 30],
    action: 'push(30)',
    explain: 'rear.next = node(30); rear advances. Queue size is now 3.'
  },
  {
    title: '5. pop(): Remove front node (10) &rarr; front advances to 20',
    phase: 'POP',
    codeLine: 35,
    nodes: [20, 30],
    action: 'pop() &rarr; 10',
    explain: 'Oldest item at front (10) is removed. front moves to front.next (20). Returns 10 in O(1).'
  },
  {
    title: '6. push(40): Append to tail &rarr; [20 &rarr; 30 &rarr; 40]',
    phase: 'PUSH',
    codeLine: 27,
    nodes: [20, 30, 40],
    action: 'push(40)',
    explain: 'New item 40 enqueued at rear. front still points to 20.'
  }
];

export default function ImplementQueueUsingLinkedlistVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
          Queue Op: <strong className="text-cyan-400">{step.action}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300">
          Front Node: <strong>{step.nodes[0] ?? 'null'}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
          Rear Node: <strong>{step.nodes[step.nodes.length - 1] ?? 'null'}</strong>
        </div>
      </div>

      {/* Linked Nodes Visualizer */}
      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Linked Nodes in Heap</span>
          <span className="text-blue-400 font-bold">O(1) Head/Tail Pointers</span>
        </div>

        <div className="flex items-center justify-center gap-2 w-full py-6 min-h-[100px] overflow-x-auto">
          {step.nodes.length === 0 ? (
            <span className="text-xs font-mono text-[#4e5370]">Queue is Empty (front == rear == null)</span>
          ) : (
            step.nodes.map((val, idx) => {
              const isFront = idx === 0;
              const isRear = idx === step.nodes.length - 1;

              return (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center font-mono font-bold text-lg relative transition-all duration-300 ${
                      isFront
                        ? 'bg-blue-500/20 border-blue-400 text-blue-200'
                        : isRear
                        ? 'bg-indigo-500/20 border-indigo-400 text-indigo-200'
                        : 'bg-[#181a26] border-[#31364d] text-[var(--chalk)]'
                    }`}
                  >
                    {isFront && (
                      <span className="absolute -top-3 px-1.5 py-0.5 rounded text-[8px] bg-blue-500 text-[var(--chalk)] font-bold">
                        FRONT
                      </span>
                    )}
                    {isRear && (
                      <span className="absolute -bottom-3 px-1.5 py-0.5 rounded text-[8px] bg-indigo-500 text-[var(--chalk)] font-bold">
                        REAR
                      </span>
                    )}
                    <span>{val}</span>
                  </div>

                  <span className="text-xs font-mono text-[#424966] font-bold">&rarr;</span>
                </div>
              );
            })
          )}
          {step.nodes.length > 0 && (
            <div className="px-2.5 py-1 rounded bg-[var(--board-raised-2)] border border-[var(--line)] text-[11px] font-mono text-[#626888]">
              null
            </div>
          )}
        </div>

        <div className="text-xs font-mono text-[var(--chalk-dim)] bg-[var(--board-raised-2)] px-4 py-2 rounded-xl border border-[var(--line)] text-center w-full">
          Inserting at rear is O(1) via rear.next; Deleting at front is O(1) via front = front.next. No size limits!
        </div>
      </div>
    </div>
  );
}

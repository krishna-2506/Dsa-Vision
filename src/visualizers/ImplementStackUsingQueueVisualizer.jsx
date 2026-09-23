import React from 'react';

export const meta = {
  title: 'Implement Stack using Queue',
  category: 'Stack and Queues',
  difficulty: 'Easy',
  timeComplexity: 'push: O(N), pop/top: O(1)',
  spaceComplexity: 'O(N)',
  description: 'Implements a LIFO stack using a single standard FIFO queue by cycling the previous elements to the back whenever a new element is enqueued.'
};

export const rendererType = 'queue';

export const solutions = {
  cpp: `// C++: Implement Stack using a Single Queue
// push: O(N) | pop: O(1) | top: O(1)
#include <queue>
using namespace std;

class MyStack {
private:
    queue<int> q;

public:
    MyStack() {}

    void push(int x) {
        int s = q.size();
        q.push(x);
        for (int i = 0; i < s; i++) {
            q.push(q.front());
            q.pop();
        }
    }

    int pop() {
        if (q.empty()) return -1;
        int val = q.front();
        q.pop();
        return val;
    }

    int top() {
        if (q.empty()) return -1;
        return q.front();
    }

    bool empty() {
        return q.empty();
    }
};`,
  java: `// Java: Implement Stack using Single Queue
import java.util.LinkedList;
import java.util.Queue;

class MyStack {
    private Queue<Integer> q;

    public MyStack() {
        q = new LinkedList<>();
    }

    public void push(int x) {
        int s = q.size();
        q.add(x);
        for (int i = 0; i < s; i++) {
            q.add(q.remove());
        }
    }

    public int pop() {
        if (q.isEmpty()) return -1;
        return q.remove();
    }

    public int top() {
        if (q.isEmpty()) return -1;
        return q.peek();
    }

    public boolean empty() {
        return q.isEmpty();
    }
}`,
  python: `# Python 3: Implement Stack using Single Deque
from collections import deque

class MyStack:
    def __init__(self):
        self.q = deque()

    def push(self, x: int) -> None:
        s = len(self.q)
        self.q.append(x)
        for _ in range(s):
            self.q.append(self.q.popleft())

    def pop(self) -> int:
        return self.q.popleft() if self.q else -1

    def top(self) -> int:
        return self.q[0] if self.q else -1

    def empty(self) -> bool:
        return len(self.q) == 0`,
  javascript: `// JavaScript: Implement Stack using Single Queue
class MyStack {
    constructor() {
        this.q = [];
    }

    push(x) {
        const s = this.q.length;
        this.q.push(x);
        for (let i = 0; i < s; i++) {
            this.q.push(this.q.shift());
        }
    }

    pop() {
        return this.q.length > 0 ? this.q.shift() : -1;
    }

    top() {
        return this.q.length > 0 ? this.q[0] : -1;
    }

    empty() {
        return this.q.length === 0;
    }
}`
};

export const steps = [
  {
    title: '1. Initialize Empty Queue',
    phase: 'INIT',
    codeLine: 13,
    queue: [],
    action: 'new MyStack()',
    rotating: null,
    explain: 'Underlying FIFO queue is initialized empty.'
  },
  {
    title: '2. push(10): Enqueue 10 into empty queue',
    phase: 'PUSH',
    codeLine: 17,
    queue: [10],
    action: 'push(10)',
    rotating: null,
    explain: 'Size before push was 0. 10 is pushed. 0 rotations needed.'
  },
  {
    title: '3. push(20): Enqueue 20 &rarr; Queue is [10, 20]',
    phase: 'ENQUEUE',
    codeLine: 17,
    queue: [10, 20],
    action: 'q.push(20)',
    rotating: null,
    explain: 'Size was 1. We enqueue 20 at the rear. To make 20 the front (LIFO top), we must rotate 1 element.'
  },
  {
    title: '4. Rotate: Dequeue 10 from front and Enqueue to rear &rarr; [20, 10]',
    phase: 'ROTATE',
    codeLine: 19,
    queue: [20, 10],
    action: 'rotate front to rear',
    rotating: 10,
    explain: 'Pop 10 from front and push to rear. Now front of queue is 20! Most recently pushed element is at the front.'
  },
  {
    title: '5. push(30): Enqueue 30 &rarr; [20, 10, 30]',
    phase: 'ENQUEUE',
    codeLine: 17,
    queue: [20, 10, 30],
    action: 'q.push(30)',
    rotating: null,
    explain: 'Queue had 2 elements. 30 enqueued at back. We need 2 rotations to move [20, 10] behind 30.'
  },
  {
    title: '6. Rotate Twice &rarr; Queue becomes [30, 20, 10]',
    phase: 'ROTATE',
    codeLine: 19,
    queue: [30, 20, 10],
    action: 'q.push(q.front()); q.pop() x 2',
    rotating: 20,
    explain: 'Rotated 20, then rotated 10. The queue order is now [30, 20, 10]. Front is 30 (LIFO Top)!'
  },
  {
    title: '7. top(): Return Front Element (30) in O(1)',
    phase: 'TOP',
    codeLine: 31,
    queue: [30, 20, 10],
    action: 'top() &rarr; 30',
    rotating: null,
    explain: 'Front of queue directly represents top of stack. O(1) access!'
  },
  {
    title: '8. pop(): Dequeue Front Element (30) in O(1)',
    phase: 'POP',
    codeLine: 25,
    queue: [20, 10],
    action: 'pop() &rarr; 30',
    rotating: null,
    explain: 'Deletes 30 from front. New front is 20, which is precisely the next LIFO element.'
  }
];


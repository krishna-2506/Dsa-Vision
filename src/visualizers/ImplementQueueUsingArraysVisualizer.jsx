import React from 'react';

export const meta = {
  title: 'Implement Queue using Arrays',
  category: 'Stack and Queues',
  difficulty: 'Easy',
  timeComplexity: 'O(1) push, pop, front',
  spaceComplexity: 'O(N) fixed capacity',
  description: 'First-In-First-Out (FIFO) queue implemented using a circular array with `front`, `rear`, and `count` variables to allow continuous reuse of array slots without shifting elements.'
};

export const rendererType = 'queue';

export const solutions = {
  cpp: `// C++: Circular Queue using Array
// Time: O(1) all ops | Space: O(capacity)
#include <iostream>
using namespace std;

class ArrayQueue {
private:
    int* arr;
    int front, rear, currSize, capacity;

public:
    ArrayQueue(int cap = 5) {
        capacity = cap;
        arr = new int[capacity];
        front = 0;
        rear = 0;
        currSize = 0;
    }

    void push(int x) {
        if (currSize == capacity) {
            cout << "Queue is Full\\n";
            return;
        }
        arr[rear % capacity] = x;
        rear++;
        currSize++;
    }

    int pop() {
        if (currSize == 0) {
            cout << "Queue is Empty\\n";
            return -1;
        }
        int val = arr[front % capacity];
        front++;
        currSize--;
        return val;
    }

    int getFront() {
        if (currSize == 0) return -1;
        return arr[front % capacity];
    }

    int size() {
        return currSize;
    }
};`,
  java: `// Java: Circular Queue using Array
class ArrayQueue {
    private int[] arr;
    private int front, rear, currSize, capacity;

    public ArrayQueue(int cap) {
        this.capacity = cap;
        this.arr = new int[capacity];
        this.front = 0;
        this.rear = 0;
        this.currSize = 0;
    }

    public void push(int x) {
        if (currSize == capacity) {
            System.out.println("Queue is Full");
            return;
        }
        arr[rear % capacity] = x;
        rear++;
        currSize++;
    }

    public int pop() {
        if (currSize == 0) {
            System.out.println("Queue is Empty");
            return -1;
        }
        int val = arr[front % capacity];
        front++;
        currSize--;
        return val;
    }

    public int getFront() {
        if (currSize == 0) return -1;
        return arr[front % capacity];
    }

    public int size() {
        return currSize;
    }
}`,
  python: `# Python 3: Circular Queue using List
class ArrayQueue:
    def __init__(self, capacity: int = 5):
        self.capacity = capacity
        self.arr = [None] * capacity
        self.front = 0
        self.rear = 0
        self.curr_size = 0

    def push(self, x: int) -> None:
        if self.curr_size == self.capacity:
            print("Queue is Full")
            return
        self.arr[self.rear % self.capacity] = x
        self.rear += 1
        self.curr_size += 1

    def pop(self) -> int:
        if self.curr_size == 0:
            print("Queue is Empty")
            return -1
        val = self.arr[self.front % self.capacity]
        self.arr[self.front % self.capacity] = None
        self.front += 1
        self.curr_size -= 1
        return val

    def get_front(self) -> int:
        if self.curr_size == 0:
            return -1
        return self.arr[self.front % self.capacity]

    def size(self) -> int:
        return self.curr_size`,
  javascript: `// JavaScript: Circular Queue using Array
class ArrayQueue {
    constructor(capacity = 5) {
        this.capacity = capacity;
        this.arr = new Array(capacity).fill(null);
        this.front = 0;
        this.rear = 0;
        this.currSize = 0;
    }

    push(x) {
        if (this.currSize === this.capacity) {
            console.log("Queue is Full");
            return;
        }
        this.arr[this.rear % this.capacity] = x;
        this.rear++;
        this.currSize++;
    }

    pop() {
        if (this.currSize === 0) {
            console.log("Queue is Empty");
            return -1;
        }
        const val = this.arr[this.front % this.capacity];
        this.arr[this.front % this.capacity] = null;
        this.front++;
        this.currSize--;
        return val;
    }

    getFront() {
        if (this.currSize === 0) return -1;
        return this.arr[this.front % this.capacity];
    }

    size() {
        return this.currSize;
    }
}`
};

export const steps = [
  {
    title: '1. Initialize Empty Circular Queue (cap = 5)',
    phase: 'INIT',
    codeLine: 13,
    front: 0,
    rear: 0,
    currSize: 0,
    array: [null, null, null, null, null],
    action: 'new ArrayQueue(5)',
    returned: null,
    explain: 'front = 0, rear = 0, size = 0. All slots unallocated.'
  },
  {
    title: '2. push(10): Write to arr[0 % 5], rear &rarr; 1',
    phase: 'PUSH',
    codeLine: 25,
    front: 0,
    rear: 1,
    currSize: 1,
    array: [10, null, null, null, null],
    action: 'push(10)',
    returned: null,
    explain: 'rear % 5 = 0. Write 10 into slot 0. rear becomes 1, size becomes 1.'
  },
  {
    title: '3. push(20) & push(30): Write to slots 1 and 2',
    phase: 'PUSH',
    codeLine: 25,
    front: 0,
    rear: 3,
    currSize: 3,
    array: [10, 20, 30, null, null],
    action: 'push(20), push(30)',
    returned: null,
    explain: 'Items appended at rear positions 1 and 2. rear = 3, size = 3.'
  },
  {
    title: '4. pop(): Read arr[front % 5], front &rarr; 1',
    phase: 'POP',
    codeLine: 37,
    front: 1,
    rear: 3,
    currSize: 2,
    array: [null, 20, 30, null, null],
    action: 'pop()',
    returned: 10,
    explain: 'FIFO pops oldest item (10) at front (index 0). front increments to 1. Size drops to 2.'
  },
  {
    title: '5. push(40), push(50), push(60): Circular Wrap!',
    phase: 'PUSH',
    codeLine: 25,
    front: 1,
    rear: 6,
    currSize: 5,
    array: [60, 20, 30, 40, 50],
    action: 'push(40), push(50), push(60)',
    returned: null,
    explain: 'When rear reached index 5, rear % 5 wrapped back to index 0 (which was freed by pop)! Fully utilized buffer.'
  },
  {
    title: '6. getFront(): Reads arr[front % 5] = arr[1]',
    phase: 'FRONT',
    codeLine: 45,
    front: 1,
    rear: 6,
    currSize: 5,
    array: [60, 20, 30, 40, 50],
    action: 'getFront()',
    returned: 20,
    explain: 'Front pointer points to index 1 % 5 = 1, storing value 20.'
  }
];


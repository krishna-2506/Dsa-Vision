import React from 'react';

export const meta = {
  title: 'Implement Stack using Array',
  category: 'Stack and Queues',
  difficulty: 'Easy',
  timeComplexity: 'O(1) per operation',
  spaceComplexity: 'O(N) for capacity storage',
  description: 'A Last-In-First-Out (LIFO) stack implemented using a fixed-size contiguous array managed with a single pointer/index `top` pointing to the most recent element.'
};

export const rendererType = 'stack';

export const solutions = {
  cpp: `// C++: Stack Implementation using Array
// Time Complexity: O(1) all ops | Space: O(capacity)
#include <iostream>
using namespace std;

class ArrayStack {
private:
    int* arr;
    int topIndex;
    int capacity;

public:
    ArrayStack(int cap = 5) {
        capacity = cap;
        arr = new int[capacity];
        topIndex = -1;
    }

    void push(int x) {
        if (topIndex == capacity - 1) {
            cout << "Stack Overflow\\n";
            return;
        }
        arr[++topIndex] = x;
    }

    int pop() {
        if (topIndex == -1) {
            cout << "Stack Underflow\\n";
            return -1;
        }
        return arr[topIndex--];
    }

    int top() {
        if (topIndex == -1) return -1;
        return arr[topIndex];
    }

    bool isEmpty() {
        return topIndex == -1;
    }
};`,
  java: `// Java: Stack Implementation using Array
class ArrayStack {
    private int[] arr;
    private int topIndex;
    private int capacity;

    public ArrayStack(int cap) {
        this.capacity = cap;
        this.arr = new int[capacity];
        this.topIndex = -1;
    }

    public void push(int x) {
        if (topIndex == capacity - 1) {
            System.out.println("Stack Overflow");
            return;
        }
        arr[++topIndex] = x;
    }

    public int pop() {
        if (topIndex == -1) {
            System.out.println("Stack Underflow");
            return -1;
        }
        return arr[topIndex--];
    }

    public int top() {
        if (topIndex == -1) return -1;
        return arr[topIndex];
    }

    public boolean isEmpty() {
        return topIndex == -1;
    }
}`,
  python: `# Python 3: Stack Implementation using fixed-size list
class ArrayStack:
    def __init__(self, capacity: int = 5):
        self.capacity = capacity
        self.arr = [None] * capacity
        self.top_idx = -1

    def push(self, x: int) -> None:
        if self.top_idx == self.capacity - 1:
            print("Stack Overflow")
            return
        self.top_idx += 1
        self.arr[self.top_idx] = x

    def pop(self) -> int:
        if self.top_idx == -1:
            print("Stack Underflow")
            return -1
        val = self.arr[self.top_idx]
        self.arr[self.top_idx] = None
        self.top_idx -= 1
        return val

    def top(self) -> int:
        if self.top_idx == -1:
            return -1
        return self.arr[self.top_idx]

    def is_empty(self) -> bool:
        return self.top_idx == -1`,
  javascript: `// JavaScript: Array-backed Stack
class ArrayStack {
    constructor(capacity = 5) {
        this.capacity = capacity;
        this.arr = new Array(capacity).fill(null);
        this.topIndex = -1;
    }

    push(x) {
        if (this.topIndex === this.capacity - 1) {
            console.log("Stack Overflow");
            return;
        }
        this.arr[++this.topIndex] = x;
    }

    pop() {
        if (this.topIndex === -1) {
            console.log("Stack Underflow");
            return -1;
        }
        const val = this.arr[this.topIndex];
        this.arr[this.topIndex--] = null;
        return val;
    }

    top() {
        if (this.topIndex === -1) return -1;
        return this.arr[this.topIndex];
    }

    isEmpty() {
        return this.topIndex === -1;
    }
}`
};

export const steps = [
  {
    title: '1. Initialize Stack with Capacity = 5',
    phase: 'INIT',
    codeLine: 13,
    topIndex: -1,
    array: [null, null, null, null, null],
    action: 'new ArrayStack(capacity = 5)',
    returnValue: null,
    explain: 'Array allocated with capacity 5. Pointer topIndex initialized to -1 representing an empty stack.'
  },
  {
    title: '2. push(12): Increment topIndex &rarr; arr[0] = 12',
    phase: 'PUSH',
    codeLine: 24,
    topIndex: 0,
    array: [12, null, null, null, null],
    action: 'push(12)',
    returnValue: null,
    explain: 'Check overflow (topIndex 0 < 4). Increment topIndex to 0 and insert 12 at index 0.'
  },
  {
    title: '3. push(45): Increment topIndex &rarr; arr[1] = 45',
    phase: 'PUSH',
    codeLine: 24,
    topIndex: 1,
    array: [12, 45, null, null, null],
    action: 'push(45)',
    returnValue: null,
    explain: 'topIndex increments to 1. 45 is written to arr[1].'
  },
  {
    title: '4. push(89): Increment topIndex &rarr; arr[2] = 89',
    phase: 'PUSH',
    codeLine: 24,
    topIndex: 2,
    array: [12, 45, 89, null, null],
    action: 'push(89)',
    returnValue: null,
    explain: 'topIndex increments to 2. 89 is stored. Current top() is now 89.'
  },
  {
    title: '5. top(): Inspect arr[topIndex]',
    phase: 'TOP',
    codeLine: 36,
    topIndex: 2,
    array: [12, 45, 89, null, null],
    action: 'top()',
    returnValue: 89,
    explain: 'Reads element at arr[topIndex] (arr[2] = 89) without removing it. O(1) operation.'
  },
  {
    title: '6. pop(): Retrieve arr[topIndex] &rarr; Decrement topIndex',
    phase: 'POP',
    codeLine: 32,
    topIndex: 1,
    array: [12, 45, null, null, null],
    action: 'pop()',
    returnValue: 89,
    explain: 'Element 89 returned. topIndex drops from 2 to 1. arr[1] (45) is now the active top.'
  },
  {
    title: '7. push(77): Insert at arr[2]',
    phase: 'PUSH',
    codeLine: 24,
    topIndex: 2,
    array: [12, 45, 77, null, null],
    action: 'push(77)',
    returnValue: null,
    explain: 'New item 77 takes slot index 2. topIndex = 2.'
  }
];


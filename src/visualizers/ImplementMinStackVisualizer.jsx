import React from 'react';

export const meta = {
  title: 'Implement Min Stack (O(1) getMin)',
  category: 'Stacks & Queues',
  difficulty: 'Hard',
  timeComplexity: 'O(1) All Operations',
  spaceComplexity: 'O(N)',
  description: 'Implements a stack data structure supporting push, pop, top, and retrieving the minimum element in strictly O(1) time by maintaining each node with the current historical minimum.'
};

export const rendererType = 'stack';

export const solutions = {
  cpp: `// C++ Optimal Min Stack with Historical Min Pairs
// Time Complexity: O(1) for all operations | Space Complexity: O(N)
#include <stack>
#include <algorithm>
using namespace std;

class MinStack {
private:
    stack<pair<int, int>> st; // {val, currentMin}

public:
    MinStack() {}

    void push(int val) {
        if (st.empty()) {
            st.push({val, val});
        } else {
            st.push({val, min(val, st.top().second)});
        }
    }

    void pop() {
        if (!st.empty()) st.pop();
    }

    int top() {
        return st.top().first;
    }

    int getMin() {
        return st.top().second;
    }
};`,
  python: `# Python 3 Optimal Min Stack
class MinStack:
    def __init__(self):
        self.stack = [] # (val, min_so_far)

    def push(self, val: int) -> None:
        if not self.stack:
            self.stack.append((val, val))
        else:
            self.stack.append((val, min(val, self.stack[-1][1])))

    def pop(self) -> None:
        if self.stack:
            self.stack.pop()

    def top(self) -> int:
        return self.stack[-1][0]

    def getMin(self) -> int:
        return self.stack[-1][1]`,
  java: `// Java Optimal Min Stack
import java.util.Stack;

class MinStack {
    private Stack<int[]> st; // [val, minSoFar]

    public MinStack() {
        st = new Stack<>();
    }

    public void push(int val) {
        if (st.isEmpty()) {
            st.push(new int[]{val, val});
        } else {
            st.push(new int[]{val, Math.min(val, st.peek()[1])});
        }
    }

    public void pop() {
        st.pop();
    }

    public int top() {
        return st.peek()[0];
    }

    public int getMin() {
        return st.peek()[1];
    }
}`,
  javascript: `// JavaScript Optimal Min Stack
var MinStack = function() {
    this.stack = [];
};

MinStack.prototype.push = function(val) {
    if (this.stack.length === 0) {
        this.stack.push({ val, min: val });
    } else {
        const currentMin = this.stack[this.stack.length - 1].min;
        this.stack.push({ val, min: Math.min(val, currentMin) });
    }
};

MinStack.prototype.pop = function() {
    this.stack.pop();
};

MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1].val;
};

MinStack.prototype.getMin = function() {
    return this.stack[this.stack.length - 1].min;
};`
};

export const steps = [
  {
    title: '1. Initialize: Empty MinStack',
    phase: 'INITIAL',
    codeLine: 14,
    stack: [],
    action: 'Initialized MinStack',
    currentMin: null,
    variables: { size: 0, getMin: 'Undefined (empty)' },
    explain: 'Each node in the stack stores a pair: {value, min_so_far}. This allows getMin() to run in O(1) time without traversing.',
    intuition: 'Snapshotting the minimum at each level makes popping safe and instant.'
  },
  {
    title: '2. push(5): First element -> Pair {val: 5, min: 5}',
    phase: 'PUSH',
    codeLine: 17,
    stack: [{ val: 5, min: 5 }],
    action: 'push(5)',
    currentMin: 5,
    variables: { pushedVal: 5, recordedMin: 5, getMin: 5 },
    explain: 'First element pushed. min_so_far is simply 5.',
    intuition: 'Base minimum established.'
  },
  {
    title: '3. push(2): 2 < 5 -> Pair {val: 2, min: min(2, 5) = 2}',
    phase: 'PUSH',
    codeLine: 19,
    stack: [
      { val: 5, min: 5 },
      { val: 2, min: 2 }
    ],
    action: 'push(2)',
    currentMin: 2,
    variables: { pushedVal: 2, minSoFar: 2, getMin: 2 },
    explain: 'Pushed 2. Since 2 < 5, the new global minimum for this stack depth is 2.',
    intuition: 'Minimum dynamically drops to 2.'
  },
  {
    title: '4. push(7): 7 > 2 -> Pair {val: 7, min: min(7, 2) = 2}',
    phase: 'PUSH',
    codeLine: 19,
    stack: [
      { val: 5, min: 5 },
      { val: 2, min: 2 },
      { val: 7, min: 2 }
    ],
    action: 'push(7)',
    currentMin: 2,
    variables: { pushedVal: 7, minSoFar: 2, getMin: 2 },
    explain: 'Pushed 7. Even though 7 is large, min_so_far remains 2 because of node below.',
    intuition: 'Minimum insulated by previous minimum.'
  },
  {
    title: '5. push(1): 1 < 2 -> Pair {val: 1, min: min(1, 2) = 1}',
    phase: 'PUSH',
    codeLine: 19,
    stack: [
      { val: 5, min: 5 },
      { val: 2, min: 2 },
      { val: 7, min: 2 },
      { val: 1, min: 1 }
    ],
    action: 'push(1)',
    currentMin: 1,
    variables: { pushedVal: 1, minSoFar: 1, getMin: 1 },
    explain: 'Pushed 1. 1 is the new minimum. getMin() immediately returns 1 in O(1)!',
    intuition: 'O(1) query.'
  },
  {
    title: '6. pop(): Remove {val: 1, min: 1} -> getMin() reverts to 2!',
    phase: 'POP',
    codeLine: 23,
    stack: [
      { val: 5, min: 5 },
      { val: 2, min: 2 },
      { val: 7, min: 2 }
    ],
    action: 'pop()',
    currentMin: 2,
    variables: { popped: '{val: 1, min: 1}', newTop: 7, getMin: 2, timeComplexity: 'O(1)' },
    explain: 'Popped top node. The new top node already has min=2 saved! No recalculation needed, getMin() remains O(1)!',
    intuition: 'Historical state automatically restored upon pop.'
  }
];


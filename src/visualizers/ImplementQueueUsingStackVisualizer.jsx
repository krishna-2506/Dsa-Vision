import React from 'react';

export const meta = {
  title: 'Implement Queue using Stacks',
  category: 'Stack and Queues',
  difficulty: 'Easy',
  timeComplexity: 'push: O(1), pop/peek: Amortized O(1)',
  spaceComplexity: 'O(2N)',
  description: 'Implements a FIFO queue using two LIFO stacks (`input` and `output`). Elements are pushed directly to `input`. When reading or removing, elements are lazily transferred to `output`, reversing their order into FIFO.'
};

export const solutions = {
  cpp: `// C++: Implement Queue using Two Stacks (Amortized O(1))
#include <stack>
using namespace std;

class MyQueue {
private:
    stack<int> input, output;

public:
    MyQueue() {}

    void push(int x) {
        input.push(x);
    }

    int pop() {
        int val = peek();
        if (val != -1) output.pop();
        return val;
    }

    int peek() {
        if (output.empty()) {
            while (!input.empty()) {
                output.push(input.top());
                input.pop();
            }
        }
        return output.empty() ? -1 : output.top();
    }

    bool empty() {
        return input.empty() && output.empty();
    }
};`,
  java: `// Java: Implement Queue using Two Stacks
import java.util.Stack;

class MyQueue {
    private Stack<Integer> input = new Stack<>();
    private Stack<Integer> output = new Stack<>();

    public MyQueue() {}

    public void push(int x) {
        input.push(x);
    }

    public int pop() {
        int val = peek();
        if (val != -1) output.pop();
        return val;
    }

    public int peek() {
        if (output.isEmpty()) {
            while (!input.isEmpty()) {
                output.push(input.pop());
            }
        }
        return output.isEmpty() ? -1 : output.peek();
    }

    public boolean empty() {
        return input.isEmpty() && output.isEmpty();
    }
}`,
  python: `# Python 3: Implement Queue using Two Stacks
class MyQueue:
    def __init__(self):
        self.input = []
        self.output = []

    def push(self, x: int) -> None:
        self.input.append(x)

    def pop(self) -> int:
        val = self.peek()
        if val != -1:
            self.output.pop()
        return val

    def peek(self) -> int:
        if not self.output:
            while self.input:
                self.output.append(self.input.pop())
        return self.output[-1] if self.output else -1

    def empty(self) -> bool:
        return not self.input and not self.output`,
  javascript: `// JavaScript: Implement Queue using Two Stacks
class MyQueue {
    constructor() {
        this.input = [];
        this.output = [];
    }

    push(x) {
        this.input.push(x);
    }

    pop() {
        const val = this.peek();
        if (val !== -1) this.output.pop();
        return val;
    }

    peek() {
        if (this.output.length === 0) {
            while (this.input.length > 0) {
                this.output.push(this.input.pop());
            }
        }
        return this.output.length > 0 ? this.output[this.output.length - 1] : -1;
    }

    empty() {
        return this.input.length === 0 && this.output.length === 0;
    }
}`
};

export const steps = [
  {
    title: '1. Initialize Input and Output Stacks',
    phase: 'INIT',
    codeLine: 13,
    input: [],
    output: [],
    action: 'new MyQueue()',
    explain: 'Both `input` and `output` stacks are empty.'
  },
  {
    title: '2. push(10) & push(20): Push directly to input stack',
    phase: 'PUSH',
    codeLine: 15,
    input: [10, 20],
    output: [],
    action: 'push(10), push(20)',
    explain: 'Direct push into `input` stack. input = [10, 20] (top is 20).'
  },
  {
    title: '3. push(30): Append to input stack',
    phase: 'PUSH',
    codeLine: 15,
    input: [10, 20, 30],
    output: [],
    action: 'push(30)',
    explain: 'input stack has [10, 20, 30]. `output` is currently empty.'
  },
  {
    title: '4. peek(): Output empty &rarr; Transfer input to output',
    phase: 'TRANSFER',
    codeLine: 26,
    input: [],
    output: [30, 20, 10],
    action: 'output.push(input.pop())',
    explain: 'Items pop from input and push to output: 30, then 20, then 10. Reversing a reverse gives FIFO order! Top of output is 10.'
  },
  {
    title: '5. pop(): Pop top of output stack &rarr; 10',
    phase: 'POP',
    codeLine: 19,
    input: [],
    output: [30, 20],
    action: 'pop() &rarr; 10',
    explain: 'Oldest element 10 popped from output in O(1)! Output now has [30, 20] (top is 20).'
  },
  {
    title: '6. push(40): New item goes into input stack',
    phase: 'PUSH',
    codeLine: 15,
    input: [40],
    output: [30, 20],
    action: 'push(40)',
    explain: '40 sits safely in input stack. Future pops still pull from output without disturbance!'
  },
  {
    title: '7. pop(): Pop from existing output stack &rarr; 20',
    phase: 'POP',
    codeLine: 19,
    input: [40],
    output: [30],
    action: 'pop() &rarr; 20',
    explain: 'Because output stack was not empty, 20 is immediately popped in O(1) time without transferring 40.'
  }
];

export default function ImplementQueueUsingStackVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
          Queue Op: <strong className="text-cyan-400">{step.action}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Amortized Complexity: <strong>O(1)</strong>
        </div>
      </div>

      {/* Dual Stack Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Input Stack */}
        <div className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-xl">
          <span className="text-xs font-mono text-[var(--chalk-dim)] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            Input Stack (Ingress)
          </span>

          <div className="w-44 h-48 rounded-xl border-2 border-dashed border-[#2d3144] flex flex-col-reverse items-center p-2.5 gap-2 bg-[#0f1016]">
            {step.input.length === 0 ? (
              <span className="text-xs font-mono text-[#4e5370] m-auto">Empty</span>
            ) : (
              step.input.map((val, idx) => {
                const isTop = idx === step.input.length - 1;
                return (
                  <div
                    key={idx}
                    className={`w-full py-1.5 px-3 rounded-lg border font-mono text-sm flex items-center justify-between transition-all ${
                      isTop ? 'bg-blue-500/20 border-blue-400 text-blue-200' : 'bg-[#181a26] border-[#292d3f] text-[#a9b0d1]'
                    }`}
                  >
                    <span>{val}</span>
                    {isTop && <span className="text-[9px] px-1 rounded bg-blue-500 text-[var(--chalk)] font-bold">TOP</span>}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Output Stack */}
        <div className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-xl">
          <span className="text-xs font-mono text-[var(--chalk-dim)] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Output Stack (Egress / FIFO)
          </span>

          <div className="w-44 h-48 rounded-xl border-2 border-dashed border-[#2d3144] flex flex-col-reverse items-center p-2.5 gap-2 bg-[#0f1016]">
            {step.output.length === 0 ? (
              <span className="text-xs font-mono text-[#4e5370] m-auto">Empty</span>
            ) : (
              step.output.map((val, idx) => {
                const isTop = idx === step.output.length - 1;
                return (
                  <div
                    key={idx}
                    className={`w-full py-1.5 px-3 rounded-lg border font-mono text-sm flex items-center justify-between transition-all ${
                      isTop ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200' : 'bg-[#181a26] border-[#292d3f] text-[#a9b0d1]'
                    }`}
                  >
                    <span>{val}</span>
                    {isTop && <span className="text-[9px] px-1 rounded bg-emerald-500 text-[var(--chalk)] font-bold">FRONT</span>}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="text-xs font-mono text-[var(--chalk-dim)] bg-[var(--board-raised-2)] px-4 py-2 rounded-xl border border-[var(--line)] text-center w-full">
        Each element is transferred from input to output at most once &rarr; each operation takes amortized O(1) time!
      </div>
    </div>
  );
}

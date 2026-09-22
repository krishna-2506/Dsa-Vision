import React from 'react';

export const meta = {
  title: 'Reverse a Stack using Recursion',
  category: 'Recursion',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(N) recursion stack',
  description: 'Reverses a stack completely in-place using recursion without any loops or auxiliary data structures by peeling off elements and inserting them at the bottom recursively.'
};

export const solutions = {
  cpp: `// C++ Reverse Stack using Recursion
// Time: O(N^2) | Space: O(N) recursion stack
#include <stack>
using namespace std;

class Solution {
    void insertAtBottom(stack<int>& st, int element) {
        if (st.empty()) {
            st.push(element);
            return;
        }

        int top = st.top();
        st.pop();
        insertAtBottom(st, element);
        st.push(top);
    }

public:
    void reverseStack(stack<int>& st) {
        if (st.empty()) return;

        int top = st.top();
        st.pop();

        reverseStack(st); // Recurse on remaining stack

        insertAtBottom(st, top); // Place top at the bottom
    }
};`,
  python: `# Python 3 Reverse Stack using Recursion
class Solution:
    def reverseStack(self, st: list[int]) -> None:
        def insert_at_bottom(element):
            if not st:
                st.append(element)
                return

            top = st.pop()
            insert_at_bottom(element)
            st.append(top)

        if not st:
            return

        top = st.pop()
        self.reverseStack(st)
        insert_at_bottom(top)`,
  java: `// Java Reverse Stack using Recursion
import java.util.Stack;

class Solution {
    private void insertAtBottom(Stack<Integer> st, int element) {
        if (st.isEmpty()) {
            st.push(element);
            return;
        }

        int top = st.pop();
        insertAtBottom(st, element);
        st.push(top);
    }

    public void reverseStack(Stack<Integer> st) {
        if (st.isEmpty()) return;

        int top = st.pop();
        reverseStack(st);
        insertAtBottom(st, top);
    }
}`,
  javascript: `// JavaScript Reverse Stack using Recursion
var reverseStack = function(st) {
    const insertAtBottom = (element) => {
        if (st.length === 0) {
            st.push(element);
            return;
        }

        const top = st.pop();
        insertAtBottom(element);
        st.push(top);
    };

    if (st.length === 0) return;

    const top = st.pop();
    reverseStack(st);
    insertAtBottom(top);
};`
};

export const steps = [
  {
    title: '1. Initial State: Stack [Bottom: 1, 2, Top: 3]',
    phase: 'INITIAL',
    codeLine: 24,
    stack: [1, 2, 3],
    callStack: [],
    poppedElem: null,
    insertingElem: null,
    variables: { stack: '[1, 2, 3]', topElement: 3, strategy: 'Unwind stack into call stack frames' },
    explain: 'Goal is to flip the stack so 3 is at the bottom and 1 is at the top, without using arrays or queues.',
    intuition: 'The function call stack itself serves as the temporary holding mechanism.'
  },
  {
    title: '2. Pop 3 & Recurse: Stack is now [1, 2]',
    phase: 'POP_AND_RECURSE',
    codeLine: 27,
    stack: [1, 2],
    callStack: ['Frame 1: hold 3'],
    poppedElem: 3,
    insertingElem: null,
    variables: { popped: 3, remainingStack: '[1, 2]' },
    explain: 'Pop 3 and preserve it in recursive call frame 1. Recurse on [1, 2].',
    intuition: 'Store 3 in the execution stack.'
  },
  {
    title: '3. Pop 2 & Recurse: Stack is now [1]',
    phase: 'POP_AND_RECURSE',
    codeLine: 27,
    stack: [1],
    callStack: ['Frame 1: hold 3', 'Frame 2: hold 2'],
    poppedElem: 2,
    insertingElem: null,
    variables: { popped: 2, remainingStack: '[1]' },
    explain: 'Pop 2 and preserve it in frame 2. Recurse on [1].',
    intuition: 'Store 2 in the execution stack.'
  },
  {
    title: '4. Pop 1 & Base Case: Stack is Empty []',
    phase: 'POP_AND_RECURSE',
    codeLine: 27,
    stack: [],
    callStack: ['Frame 1: hold 3', 'Frame 2: hold 2', 'Frame 3: hold 1'],
    poppedElem: 1,
    insertingElem: null,
    variables: { popped: 1, stack: '[] (Empty - Base Case reached)' },
    explain: 'All original elements are held across call frames. Now insertAtBottom begins unwinding.',
    intuition: 'Stack is empty. Base case triggers insertion phase.'
  },
  {
    title: '5. insertAtBottom(1), then insertAtBottom(2): Stack is [2, 1]',
    phase: 'INSERT_AT_BOTTOM',
    codeLine: 12,
    stack: [2, 1], // Bottom is 2, Top is 1
    callStack: ['Frame 1: hold 3'],
    poppedElem: null,
    insertingElem: 2,
    variables: { inserted: '1 then 2 at bottom', currentStack: '[Bottom: 2, Top: 1]' },
    explain: 'insertAtBottom pushes 1 into empty stack, then pushes 2 at the bottom beneath 1.',
    intuition: '2 placed below 1.'
  },
  {
    title: '6. insertAtBottom(3): Final Reversed Stack [Bottom: 3, 2, Top: 1]',
    phase: 'RESULT',
    codeLine: 31,
    stack: [3, 2, 1], // Bottom is 3, Top is 1
    callStack: [],
    poppedElem: null,
    insertingElem: 3,
    variables: { finalStack: '[Bottom: 3, 2, Top: 1]', original: '[Bottom: 1, 2, Top: 3]' },
    explain: '3 is inserted at the bottom beneath [2, 1]. Stack is completely reversed in-place!',
    intuition: 'Pure recursive stack inversion.'
  }
];

export default function ReverseAStackVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Operation: Reverse Stack via Pure Recursion
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
          Call Stack Frames: {step.callStack.length}
        </span>
      </div>

      {/* Visual Canvas */}
      <div className="w-full p-6 rounded-2xl bg-[var(--board-raised-2)] border border-[var(--line)] grid grid-cols-2 gap-6 font-mono">
        {/* Physical Stack Tower */}
        <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[var(--board-raised)] border border-[var(--line)]">
          <span className="text-xs text-amber-400 font-bold">Data Stack:</span>
          <div className="w-36 h-48 border-b-4 border-l-2 border-r-2 border-amber-400/50 rounded-b-xl flex flex-col-reverse items-center p-2 gap-2 bg-[#0e1017]">
            {step.stack.map((val, idx) => {
              const isTop = idx === step.stack.length - 1;
              return (
                <div
                  key={idx}
                  className={`w-full py-2 rounded-lg border text-center font-bold text-sm transition-all ${
                    isTop ? 'border-amber-400 bg-amber-500/25 text-amber-200 shadow-md shadow-amber-500/20' : 'border-[var(--line)] bg-[var(--board-raised-2)] text-[var(--chalk)]'
                  }`}
                >
                  {val} {isTop && <span className="text-[10px] text-amber-300 font-normal">&larr; TOP</span>}
                </div>
              );
            })}
          </div>
          <span className="text-[10px] text-[var(--chalk-dim)]">BOTTOM OF STACK</span>
        </div>

        {/* Recursive Call Stack Frames */}
        <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[var(--board-raised)] border border-[var(--line)]">
          <span className="text-xs text-cyan-400 font-bold">Call Stack Frames (Memory):</span>
          <div className="w-full h-48 flex flex-col-reverse items-center justify-start gap-2 overflow-y-auto p-2 bg-[#0e1017] rounded-xl border border-[#1e2233]">
            {step.callStack.length === 0 ? (
              <span className="text-xs text-[#5b6076] my-auto">No Active Call Frames</span>
            ) : (
              step.callStack.map((frame, idx) => (
                <div
                  key={idx}
                  className="w-full py-2 px-3 rounded-lg border border-cyan-500/30 bg-cyan-500/15 text-cyan-300 text-xs font-semibold text-center"
                >
                  {frame}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Result Card */}
      {step.phase === 'RESULT' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 Stack Reversed: [Bottom: 3, 2, Top: 1] in O(N&sup2;) Time and O(N) Call Stack</span>
        </div>
      )}
    </div>
  );
}

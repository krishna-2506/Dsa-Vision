import React from 'react';

export const meta = {
  title: 'Sort a Stack using Recursion',
  category: 'Recursion',
  difficulty: 'Medium',
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(N) recursion stack',
  description: 'Sorts a stack in ascending order (smallest at bottom, largest at top) purely via recursion using sorted-insert unwinding, with zero auxiliary data structures or loops.'
};

export const solutions = {
  cpp: `// C++ Sort a Stack using Recursion
// Time: O(N^2) | Space: O(N) recursion stack
#include <stack>
using namespace std;

class Solution {
    void sortedInsert(stack<int>& st, int element) {
        // Base case: stack is empty or element >= current top
        if (st.empty() || element >= st.top()) {
            st.push(element);
            return;
        }

        int top = st.top();
        st.pop();
        sortedInsert(st, element);
        st.push(top);
    }

public:
    void sortStack(stack<int>& st) {
        if (st.empty()) return;

        int top = st.top();
        st.pop();

        sortStack(st); // Recurse on remaining stack

        sortedInsert(st, top); // Insert element into sorted position
    }
};`,
  python: `# Python 3 Sort a Stack using Recursion
class Solution:
    def sortStack(self, st: list[int]) -> None:
        def sorted_insert(element):
            if not st or element >= st[-1]:
                st.append(element)
                return

            top = st.pop()
            sorted_insert(element)
            st.append(top)

        if not st:
            return

        top = st.pop()
        self.sortStack(st)
        sorted_insert(top)`,
  java: `// Java Sort a Stack using Recursion
import java.util.Stack;

class Solution {
    private void sortedInsert(Stack<Integer> st, int element) {
        if (st.isEmpty() || element >= st.peek()) {
            st.push(element);
            return;
        }

        int top = st.pop();
        sortedInsert(st, element);
        st.push(top);
    }

    public void sortStack(Stack<Integer> st) {
        if (st.isEmpty()) return;

        int top = st.pop();
        sortStack(st);
        sortedInsert(st, top);
    }
}`,
  javascript: `// JavaScript Sort a Stack using Recursion
var sortStack = function(st) {
    const sortedInsert = (element) => {
        if (st.length === 0 || element >= st[st.length - 1]) {
            st.push(element);
            return;
        }

        const top = st.pop();
        sortedInsert(element);
        st.push(top);
    };

    if (st.length === 0) return;

    const top = st.pop();
    sortStack(st);
    sortedInsert(top);
};`
};

export const steps = [
  {
    title: '1. Initial State: Unsorted Stack [Bottom: 3, 1, 4, Top: 2]',
    phase: 'INITIAL',
    codeLine: 24,
    stack: [3, 1, 4, 2],
    insertingVal: null,
    variables: { originalStack: '[Bottom: 3, 1, 4, Top: 2]', goal: 'Sorted [Bottom: 1, 2, 3, Top: 4]' },
    explain: 'We want to sort the stack in ascending order so smaller elements rest at the bottom. We pop all elements until the stack is empty, then insert each into its correct sorted position.',
    intuition: 'Recursive insertion sort adapted for stack constraints.'
  },
  {
    title: '2. Unwind Stack: Pop elements into Call Stack',
    phase: 'UNWIND',
    codeLine: 27,
    stack: [],
    insertingVal: null,
    variables: { poppedOrder: '2, 4, 1, 3', stack: '[] (Empty - ready for sortedInsert)' },
    explain: 'All elements popped and held in recursive execution frames: 3 at base, then 1, 4, and 2.',
    intuition: 'Base case reached. Now we begin sorted insertions from bottom up.'
  },
  {
    title: '3. sortedInsert(3) & sortedInsert(1): Stack becomes [1, 3]',
    phase: 'SORTED_INSERT',
    codeLine: 12,
    stack: [1, 3],
    insertingVal: 1,
    variables: { insert: 1, action: '1 < 3 -> pop 3, push 1, push 3 back', currentStack: '[Bottom: 1, Top: 3]' },
    explain: 'To insert 1, 3 is popped temporarily. 1 is placed at the bottom, and 3 is restored.',
    intuition: 'Maintains sorted order.'
  },
  {
    title: '4. sortedInsert(4): Stack becomes [1, 3, 4]',
    phase: 'SORTED_INSERT',
    codeLine: 12,
    stack: [1, 3, 4],
    insertingVal: 4,
    variables: { insert: 4, action: '4 >= 3 (top) -> push 4 directly', currentStack: '[Bottom: 1, 3, Top: 4]' },
    explain: '4 is greater than current top (3). Push 4 directly.',
    intuition: 'No popping needed when element is >= top.'
  },
  {
    title: '5. sortedInsert(2): Stack becomes [1, 2, 3, 4]',
    phase: 'SORTED_INSERT',
    codeLine: 12,
    stack: [1, 2, 3, 4],
    insertingVal: 2,
    variables: { insert: 2, action: 'Pop 4, pop 3, push 2, restore 3, restore 4' },
    explain: '2 is smaller than 4 and 3. Temporary pops place 2 right above 1, then 3 and 4 are restored.',
    intuition: 'Final element placed in sorted order.'
  },
  {
    title: '6. Stack Fully Sorted: [Bottom: 1, 2, 3, Top: 4]',
    phase: 'RESULT',
    codeLine: 31,
    stack: [1, 2, 3, 4],
    insertingVal: null,
    variables: { finalSorted: '[1, 2, 3, 4]', time: 'O(N^2)', space: 'O(N) stack' },
    explain: 'Stack is fully sorted in ascending order from bottom to top using pure recursion.',
    intuition: 'Sorted-insert recursion completes with zero extra arrays or buffers.'
  }
];

export default function SortAStackUsingRecursionVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="px-4 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-sm font-semibold">
          Operation: Recursive Stack Sort
        </span>
        {step.insertingVal !== null && (
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
            sortedInsert({step.insertingVal})
          </span>
        )}
      </div>

      {/* Visual Stack Tower */}
      <div className="w-full p-6 rounded-2xl bg-[#161824] border border-[#272b3c] flex flex-col items-center gap-3 font-mono">
        <span className="text-xs text-amber-400 font-bold">Stack State:</span>
        <div className="w-44 h-56 border-b-4 border-l-2 border-r-2 border-amber-400/50 rounded-b-xl flex flex-col-reverse items-center p-3 gap-2 bg-[#0e1017]">
          {step.stack.length === 0 ? (
            <span className="text-xs text-[#5b6076] my-auto">Stack is Empty</span>
          ) : (
            step.stack.map((val, idx) => {
              const isTop = idx === step.stack.length - 1;
              return (
                <div
                  key={idx}
                  className={`w-full py-2.5 rounded-xl border text-center font-bold text-sm transition-all ${
                    isTop ? 'border-amber-400 bg-amber-500/25 text-amber-200 shadow-md shadow-amber-500/20' : 'border-[#272b3c] bg-[#161824] text-white'
                  }`}
                >
                  {val} {isTop && <span className="text-[10px] text-amber-300 font-normal">&larr; TOP</span>}
                </div>
              );
            })
          )}
        </div>
        <span className="text-[10px] text-[#8a8ea3]">BOTTOM OF STACK (MINIMUM)</span>
      </div>

      {/* Result Card */}
      {step.phase === 'RESULT' && (
        <div className="w-full p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center gap-2 text-emerald-300 font-mono text-base font-bold">
          <span>🎉 Stack Sorted: [Bottom: 1, 2, 3, Top: 4] in O(N&sup2;) Time</span>
        </div>
      )}
    </div>
  );
}

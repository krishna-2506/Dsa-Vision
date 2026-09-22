import React from 'react';

export const meta = {
  title: 'Stock Span Problem',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'Amortized O(1) per day',
  spaceComplexity: 'O(N)',
  description: 'Calculates the consecutive days up to today where stock price was less than or equal to today’s price, using a monotonic stack storing pairs of (price, span).'
};

export const solutions = {
  cpp: `// C++: Stock Span using Monotonic Stack
// Time Complexity: Amortized O(1) per call | Space: O(N)
#include <stack>
using namespace std;

class StockSpanner {
private:
    stack<pair<int, int>> st; // {price, span}

public:
    StockSpanner() {}

    int next(int price) {
        int span = 1;
        while (!st.empty() && st.top().first <= price) {
            span += st.top().second;
            st.pop();
        }
        st.push({price, span});
        return span;
    }
};`,
  java: `// Java: Stock Span using Stack
import java.util.Stack;

class StockSpanner {
    private Stack<int[]> st; // [price, span]

    public StockSpanner() {
        st = new Stack<>();
    }

    public int next(int price) {
        int span = 1;
        while (!st.isEmpty() && st.peek()[0] <= price) {
            span += st.pop()[1];
        }
        st.push(new int[]{price, span});
        return span;
    }
}`,
  python: `# Python 3: Stock Span
class StockSpanner:
    def __init__(self):
        self.stack = [] # (price, span)

    def next(self, price: int) -> int:
        span = 1
        while self.stack and self.stack[-1][0] <= price:
            span += self.stack.pop()[1]
        self.stack.append((price, span))
        return span`,
  javascript: `// JavaScript: Stock Span
class StockSpanner {
    constructor() {
        this.stack = []; // { price, span }
    }

    next(price) {
        let span = 1;
        while (this.stack.length > 0 && this.stack[this.stack.length - 1].price <= price) {
            span += this.stack.pop().span;
        }
        this.stack.push({ price, span });
        return span;
    }
}`
};

export const steps = [
  {
    title: '1. Day 1: next(100) &rarr; Stack empty &rarr; Span = 1',
    phase: 'FIRST_DAY',
    codeLine: 16,
    day: 1,
    price: 100,
    span: 1,
    stack: [{ price: 100, span: 1 }],
    history: [{ day: 1, price: 100, span: 1 }],
    explain: 'First price 100. No previous days. Span = 1. Stack = [{100, 1}].'
  },
  {
    title: '2. Day 2: next(80) &rarr; 80 < 100 &rarr; Span = 1',
    phase: 'PROCESS',
    codeLine: 16,
    day: 2,
    price: 80,
    span: 1,
    stack: [{ price: 100, span: 1 }, { price: 80, span: 1 }],
    history: [
      { day: 1, price: 100, span: 1 },
      { day: 2, price: 80, span: 1 }
    ],
    explain: '80 is less than 100. Previous day cannot be absorbed. Span = 1. Push {80, 1}.'
  },
  {
    title: '3. Day 3: next(60) &rarr; 60 < 80 &rarr; Span = 1',
    phase: 'PROCESS',
    codeLine: 16,
    day: 3,
    price: 60,
    span: 1,
    stack: [{ price: 100, span: 1 }, { price: 80, span: 1 }, { price: 60, span: 1 }],
    history: [
      { day: 1, price: 100, span: 1 },
      { day: 2, price: 80, span: 1 },
      { day: 3, price: 60, span: 1 }
    ],
    explain: '60 is smaller than 80. Span = 1. Push {60, 1}.'
  },
  {
    title: '4. Day 4: next(70) &rarr; 70 >= 60 &rarr; Absorb Day 3! Span = 1 + 1 = 2',
    phase: 'ABSORB',
    codeLine: 18,
    day: 4,
    price: 70,
    span: 2,
    stack: [{ price: 100, span: 1 }, { price: 80, span: 1 }, { price: 70, span: 2 }],
    history: [
      { day: 1, price: 100, span: 1 },
      { day: 2, price: 80, span: 1 },
      { day: 3, price: 60, span: 1 },
      { day: 4, price: 70, span: 2 }
    ],
    explain: 'Price 70 is >= 60. Pop {60, 1} and add its span (1) to today. Span = 2. Push {70, 2}.'
  },
  {
    title: '5. Day 5: next(60) &rarr; Span = 1',
    phase: 'PROCESS',
    codeLine: 16,
    day: 5,
    price: 60,
    span: 1,
    stack: [{ price: 100, span: 1 }, { price: 80, span: 1 }, { price: 70, span: 2 }, { price: 60, span: 1 }],
    history: [
      { day: 1, price: 100, span: 1 },
      { day: 2, price: 80, span: 1 },
      { day: 3, price: 60, span: 1 },
      { day: 4, price: 70, span: 2 },
      { day: 5, price: 60, span: 1 }
    ],
    explain: '60 < 70. Span = 1. Push {60, 1}.'
  },
  {
    title: '6. Day 6: next(75) &rarr; 75 >= 60 (pop) & 75 >= 70 (pop) &rarr; Span = 1 + 1 + 2 = 4!',
    phase: 'MULTI_ABSORB',
    codeLine: 18,
    day: 6,
    price: 75,
    span: 4,
    stack: [{ price: 100, span: 1 }, { price: 80, span: 1 }, { price: 75, span: 4 }],
    history: [
      { day: 1, price: 100, span: 1 },
      { day: 2, price: 80, span: 1 },
      { day: 3, price: 60, span: 1 },
      { day: 4, price: 70, span: 2 },
      { day: 5, price: 60, span: 1 },
      { day: 6, price: 75, span: 4 }
    ],
    explain: '75 absorbs Day 5 (span 1) and Day 4 (span 2). Total span = 1 + 1 + 2 = 4 consecutive days!'
  }
];

export default function StockSpanProblemVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
          Today Price: <strong className="text-amber-400 text-sm">${step.price}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
          Computed Span: <strong className="text-base text-emerald-200">{step.span} days</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Daily Prices &amp; Computed Spans</span>
          <span className="text-emerald-400 font-bold">Monotonic Pair Stack</span>
        </div>

        {/* History Bars */}
        <div className="flex items-end justify-center gap-3 w-full h-40 pt-4 px-2 border-b border-[#26293a]">
          {step.history.map((h, i) => {
            const isToday = i === step.history.length - 1;
            return (
              <div key={i} className="flex flex-col items-center flex-1 h-full justify-end">
                <span className="text-[10px] font-mono font-bold text-emerald-400 mb-1">
                  +{h.span}
                </span>
                <div
                  style={{ height: `${(h.price / 100) * 100}%` }}
                  className={`w-full rounded-t-sm border flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    isToday
                      ? 'bg-amber-500/30 border-amber-400 text-amber-200 shadow-md shadow-amber-500/20'
                      : 'bg-[#1a1d2c] border-[#31364d] text-[#b4bad4]'
                  }`}
                >
                  {h.price}
                </div>
                <span className="text-[9px] font-mono text-[#5a607e] mt-1">D{h.day}</span>
              </div>
            );
          })}
        </div>

        {/* Internal Stack */}
        <div className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-[#0f1016] border border-[var(--line)] overflow-x-auto">
          <span className="text-xs font-mono text-[#6c7292] mr-2">Stack:</span>
          {step.stack.map((item, idx) => (
            <div
              key={idx}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 font-mono text-xs font-bold text-emerald-200"
            >
              ${item.price} ({item.span}d)
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

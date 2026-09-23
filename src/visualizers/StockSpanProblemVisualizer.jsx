export const rendererType = 'array-scan';

export const meta = {
  title: 'Stock Span Problem',
  category: 'Stack and Queues',
  difficulty: 'Medium',
  timeComplexity: 'Amortized O(1) per call',
  spaceComplexity: 'O(N)',
  description: 'Calculates the consecutive days up to today where the stock price was less than or equal to today’s price, using a monotonic stack storing pairs of (price, span).'
};

export const ideaMap = [
  {
    id: 'span-definition',
    title: 'Stock Span Definition',
    description: 'The span of a stock on day i is the maximum number of consecutive days up to i for which the price was <= price[i].'
  },
  {
    id: 'previous-greater-element',
    title: 'Previous Greater Element Mapping',
    description: 'Span equals current index i minus the index of the previous strictly greater price (or i + 1 if no greater price exists).'
  },
  {
    id: 'monotonic-stack-pairs',
    title: 'Compressed Pair Stack',
    description: 'Store {price, span} pairs in monotonically decreasing price order. If current price >= top.price, absorb top.span into current span and pop.'
  },
  {
    id: 'span-aggregation',
    title: 'Span Aggregation Invariant',
    description: 'When popping a smaller price, its span is already known and completely submerged beneath today’s price. We simply add top.span to current span.'
  },
  {
    id: 'amortized-analysis',
    title: 'Amortized O(1) Guarantee',
    description: 'Each daily price is pushed to the stack once and popped at most once across all N calls, yielding O(1) amortized time per query.'
  }
];

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
  java: `// Java: Stock Span using ArrayDeque Stack
import java.util.ArrayDeque;
import java.util.Deque;

class StockSpanner {
    private Deque<int[]> st; // [price, span]

    public StockSpanner() {
        st = new ArrayDeque<>();
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
  python: `# Python 3: Stock Span using List Stack
class StockSpanner:
    def __init__(self):
        self.st = [] # (price, span)

    def next(self, price: int) -> int:
        span = 1
        while self.st and self.st[-1][0] <= price:
            span += self.st.pop()[1]
        self.st.append((price, span))
        return span`,
  javascript: `// JavaScript: Stock Span using Array Stack
class StockSpanner {
    constructor() {
        this.st = []; // { price, span }
    }

    next(price) {
        let span = 1;
        while (this.st.length > 0 && this.st[this.st.length - 1].price <= price) {
            span += this.st.pop().span;
        }
        this.st.push({ price, span });
        return span;
    }
}`
};

export const steps = [
  {
    stepIndex: 1,
    title: 'Initialize Stock Spanner and Empty Stack',
    explanation: 'Daily prices stream: [100, 80, 60, 70, 60, 75, 85]. We will compute span for each day using a monotonic stack of (price, span) pairs.',
    activeLine: 9,
    activeIdeaId: 'span-definition',
    track: [100, 80, 60, 70, 60, 75, 85],
    auxiliaryTrack: [0, 0, 0, 0, 0, 0, 0],
    highlightIndices: [0],
    pointers: { day: 0 },
    variables: { day: 0, price: 100, span: 1, stack: '[]' },
    customCard: {
      title: 'Day 0 Call: next(100)',
      rows: [
        { label: 'Current Price', value: '100' },
        { label: 'Stack State', value: 'Empty' },
        { label: 'Calculated Span', value: '1 (only today)' }
      ]
    }
  },
  {
    stepIndex: 2,
    title: 'Day 0 & 1: Prices 100 and 80 (Strict Decreasing)',
    explanation: 'next(100) -> span 1, push {100, 1}. next(80) -> top is 100 > 80, no pop. span is 1, push {80, 1}. Stack: [{100, 1}, {80, 1}].',
    activeLine: 16,
    activeIdeaId: 'monotonic-stack-pairs',
    track: [100, 80, 60, 70, 60, 75, 85],
    auxiliaryTrack: [1, 1, 0, 0, 0, 0, 0],
    highlightIndices: [0, 1],
    pointers: { day: 1 },
    variables: { day: 1, price: 80, span: 1, stack: '[{100, 1}, {80, 1}]' },
    customCard: {
      title: 'Day 1 Call: next(80)',
      rows: [
        { label: 'Current Price', value: '80' },
        { label: 'Stack Top Price', value: '100 > 80 (no absorption)' },
        { label: 'Span', value: '1' }
      ]
    }
  },
  {
    stepIndex: 3,
    title: 'Day 2: next(60) -> span = 1',
    explanation: 'Price is 60. Stack top is 80 > 60. No elements popped. span = 1. Push {60, 1}. Stack: [{100, 1}, {80, 1}, {60, 1}].',
    activeLine: 16,
    activeIdeaId: 'monotonic-stack-pairs',
    track: [100, 80, 60, 70, 60, 75, 85],
    auxiliaryTrack: [1, 1, 1, 0, 0, 0, 0],
    highlightIndices: [2],
    pointers: { day: 2 },
    variables: { day: 2, price: 60, span: 1, stackSize: 3 },
    customCard: {
      title: 'Day 2 Call: next(60)',
      rows: [
        { label: 'Current Price', value: '60' },
        { label: 'Stack Top', value: '80' },
        { label: 'Span', value: '1' }
      ]
    }
  },
  {
    stepIndex: 4,
    title: 'Day 3: next(70) Absorbs Day 2 (60) -> span = 2',
    explanation: 'Price is 70. Stack top is {60, 1} <= 70. Pop {60, 1} and accumulate span += 1 (span becomes 2). Next top is 80 > 70 (stop). Push {70, 2}.',
    activeLine: 14,
    activeIdeaId: 'span-aggregation',
    track: [100, 80, 60, 70, 60, 75, 85],
    auxiliaryTrack: [1, 1, 1, 2, 0, 0, 0],
    highlightIndices: [2, 3],
    pointers: { day: 3 },
    variables: { day: 3, price: 70, absorbed: '{60, 1}', span: 2 },
    customCard: {
      title: 'Day 3 Call: next(70) Absorption',
      rows: [
        { label: 'Current Price', value: '70' },
        { label: 'Popped Node', value: '{price: 60, span: 1}' },
        { label: 'Accumulated Span', value: '1 + 1 = 2 days', accent: true },
        { label: 'Remaining Stack', value: '[{100, 1}, {80, 1}, {70, 2}]' }
      ]
    }
  },
  {
    stepIndex: 5,
    title: 'Day 4: next(60) -> span = 1',
    explanation: 'Price is 60. Stack top is 70 > 60. No pop. span = 1. Push {60, 1}. Stack: [{100, 1}, {80, 1}, {70, 2}, {60, 1}].',
    activeLine: 16,
    activeIdeaId: 'monotonic-stack-pairs',
    track: [100, 80, 60, 70, 60, 75, 85],
    auxiliaryTrack: [1, 1, 1, 2, 1, 0, 0],
    highlightIndices: [4],
    pointers: { day: 4 },
    variables: { day: 4, price: 60, span: 1 },
    customCard: {
      title: 'Day 4 Call: next(60)',
      rows: [
        { label: 'Price', value: '60' },
        { label: 'Top', value: '70' },
        { label: 'Span', value: '1' }
      ]
    }
  },
  {
    stepIndex: 6,
    title: 'Day 5: next(75) Absorbs {60, 1} and {70, 2} -> span = 4',
    explanation: 'Price is 75. Pop {60, 1} (span = 1 + 1 = 2). Pop {70, 2} (span = 2 + 2 = 4). Next top is 80 > 75 (stop). Push {75, 4}. Span covers 4 consecutive days!',
    activeLine: 14,
    activeIdeaId: 'span-aggregation',
    track: [100, 80, 60, 70, 60, 75, 85],
    auxiliaryTrack: [1, 1, 1, 2, 1, 4, 0],
    highlightIndices: [3, 4, 5],
    pointers: { day: 5 },
    variables: { day: 5, price: 75, span: 4, absorbedSpans: '1 + 2 = 3' },
    customCard: {
      title: 'Multi-Day Absorption',
      rows: [
        { label: 'Price Today', value: '75' },
        { label: 'Absorbed Days', value: 'Day 4 (60) + Day 3 (70)' },
        { label: 'Total Span', value: '1 + 1 + 2 = 4 days', accent: true },
        { label: 'Stack Top after pop', value: '80' }
      ]
    }
  },
  {
    stepIndex: 7,
    title: 'Day 6: next(85) Absorbs {75, 4} and {80, 1} -> span = 6',
    explanation: 'Price is 85. Pop {75, 4} (span = 1 + 4 = 5). Pop {80, 1} (span = 5 + 1 = 6). Next top is 100 > 85 (stop). Push {85, 6}. Span is 6 days!',
    activeLine: 14,
    activeIdeaId: 'span-aggregation',
    track: [100, 80, 60, 70, 60, 75, 85],
    auxiliaryTrack: [1, 1, 1, 2, 1, 4, 6],
    highlightIndices: [1, 2, 3, 4, 5, 6],
    pointers: { day: 6 },
    variables: { day: 6, price: 85, span: 6, finalAbsorption: '4 + 1 = 5' },
    customCard: {
      title: 'Major Breakthrough Span',
      rows: [
        { label: 'Current Price', value: '85' },
        { label: 'Absorbed Elements', value: '{75, 4} and {80, 1}' },
        { label: 'Total Span', value: '6 days', accent: true },
        { label: 'Only Unbeaten Day', value: 'Day 0 (100)' }
      ]
    }
  },
  {
    stepIndex: 8,
    title: 'All Days Processed: Complete Spans Array Generated',
    explanation: 'The resulting spans for [100, 80, 60, 70, 60, 75, 85] are [1, 1, 1, 2, 1, 4, 6]. Monotonic stack guarantees amortized O(1) time per call.',
    activeLine: 17,
    activeIdeaId: 'amortized-analysis',
    track: [100, 80, 60, 70, 60, 75, 85],
    auxiliaryTrack: [1, 1, 1, 2, 1, 4, 6],
    highlightIndices: [],
    pointers: {},
    variables: { finalSpans: '[1, 1, 1, 2, 1, 4, 6]', amortizedTime: 'O(1) per call' },
    customCard: {
      title: 'Final Stock Spans Summary',
      rows: [
        { label: 'Input Daily Prices', value: '[100, 80, 60, 70, 60, 75, 85]' },
        { label: 'Output Daily Spans', value: '[1, 1, 1, 2, 1, 4, 6]', accent: true },
        { label: 'Total Operations', value: 'N pushes + N pops max' },
        { label: 'Time Complexity', value: 'Amortized O(1)' }
      ]
    }
  }
];

import React from 'react';

export const meta = {
  title: 'LRU Cache',
  category: 'Stack and Queues',
  difficulty: 'Hard',
  timeComplexity: 'O(1) get & put',
  spaceComplexity: 'O(capacity)',
  description: 'Implements a Least Recently Used (LRU) cache with O(1) time complexity for both get and put operations by combining a Hash Map for fast lookup with a Doubly Linked List to maintain temporal ordering.'
};

export const solutions = {
  cpp: `// C++: LRU Cache using Hash Map + Doubly Linked List
// Time Complexity: O(1) get & put | Space: O(capacity)
#include <unordered_map>
using namespace std;

class LRUCache {
private:
    struct Node {
        int key, val;
        Node* prev;
        Node* next;
        Node(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}
    };

    int cap;
    unordered_map<int, Node*> m;
    Node* head;
    Node* tail;

    void addNode(Node* node) {
        Node* nextNode = head->next;
        head->next = node;
        node->prev = head;
        node->next = nextNode;
        nextNode->prev = node;
    }

    void deleteNode(Node* node) {
        Node* prevNode = node->prev;
        Node* nextNode = node->next;
        prevNode->next = nextNode;
        nextNode->prev = prevNode;
    }

public:
    LRUCache(int capacity) : cap(capacity) {
        head = new Node(-1, -1);
        tail = new Node(-1, -1);
        head->next = tail;
        tail->prev = head;
    }

    int get(int key) {
        if (m.find(key) == m.end()) return -1;
        Node* node = m[key];
        deleteNode(node);
        addNode(node);
        return node->val;
    }

    void put(int key, int value) {
        if (m.find(key) != m.end()) {
            Node* existing = m[key];
            existing->val = value;
            deleteNode(existing);
            addNode(existing);
        } else {
            if (m.size() == cap) {
                Node* lru = tail->prev;
                m.erase(lru->key);
                deleteNode(lru);
                delete lru;
            }
            Node* newNode = new Node(key, value);
            m[key] = newNode;
            addNode(newNode);
        }
    }
};`,
  java: `// Java: LRU Cache using HashMap + Doubly LinkedList
import java.util.HashMap;

class LRUCache {
    class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; }
    }

    private int capacity;
    private HashMap<Integer, Node> map = new HashMap<>();
    private Node head = new Node(-1, -1);
    private Node tail = new Node(-1, -1);

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    private void addNode(Node node) {
        Node nextNode = head.next;
        head.next = node;
        node.prev = head;
        node.next = nextNode;
        nextNode.prev = node;
    }

    private void deleteNode(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        deleteNode(node);
        addNode(node);
        return node.val;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) {
            Node node = map.get(key);
            node.val = value;
            deleteNode(node);
            addNode(node);
        } else {
            if (map.size() == capacity) {
                Node lru = tail.prev;
                map.remove(lru.key);
                deleteNode(lru);
            }
            Node newNode = new Node(key, value);
            map.put(key, newNode);
            addNode(newNode);
        }
    }
}`,
  python: `# Python 3: LRU Cache using Dict and DLL
class Node:
    def __init__(self, key: int, val: int):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        self.head = Node(-1, -1)
        self.tail = Node(-1, -1)
        self.head.next = self.tail
        self.tail.prev = self.head

    def _add(self, node: Node):
        nxt = self.head.next
        self.head.next = node
        node.prev = self.head
        node.next = nxt
        nxt.prev = node

    def _remove(self, node: Node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._remove(node)
        self._add(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            node = self.cache[key]
            node.val = value
            self._remove(node)
            self._add(node)
        else:
            if len(self.cache) == self.capacity:
                lru = self.tail.prev
                del self.cache[lru.key]
                self._remove(lru)
            new_node = Node(key, value)
            self.cache[key] = new_node
            self._add(new_node)`,
  javascript: `// JavaScript: LRU Cache
class Node {
    constructor(key, val) {
        this.key = key;
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
        this.head = new Node(-1, -1);
        this.tail = new Node(-1, -1);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    add(node) {
        const next = this.head.next;
        this.head.next = node;
        node.prev = this.head;
        node.next = next;
        next.prev = node;
    }

    remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    get(key) {
        if (!this.map.has(key)) return -1;
        const node = this.map.get(key);
        this.remove(node);
        this.add(node);
        return node.val;
    }

    put(key, value) {
        if (this.map.has(key)) {
            const node = this.map.get(key);
            node.val = value;
            this.remove(node);
            this.add(node);
        } else {
            if (this.map.size === this.capacity) {
                const lru = this.tail.prev;
                this.map.delete(lru.key);
                this.remove(lru);
            }
            const newNode = new Node(key, value);
            this.map.set(key, newNode);
            this.add(newNode);
        }
    }
}`
};

export const steps = [
  {
    title: '1. Initialize LRUCache with Capacity = 3',
    phase: 'INIT',
    codeLine: 35,
    action: 'new LRUCache(3)',
    list: [],
    returned: null,
    explain: 'Dummy head and tail nodes initialized. Hash map is empty.'
  },
  {
    title: '2. put(1, 10) & put(2, 20): Insert MRU at head',
    phase: 'PUT',
    codeLine: 54,
    action: 'put(1, 10), put(2, 20)',
    list: [
      { key: 2, val: 20 },
      { key: 1, val: 10 }
    ],
    returned: null,
    explain: 'Nodes added right after dummy head. Key 2 is most recent (MRU), Key 1 is least recent (LRU).'
  },
  {
    title: '3. put(3, 30): Insert Key 3 (Cache full: 3/3)',
    phase: 'PUT',
    codeLine: 54,
    action: 'put(3, 30)',
    list: [
      { key: 3, val: 30 },
      { key: 2, val: 20 },
      { key: 1, val: 10 }
    ],
    returned: null,
    explain: 'Key 3 added to head. Cache is now at maximum capacity (3 elements).'
  },
  {
    title: '4. get(1): Cache Hit &rarr; Refresh Key 1 to MRU Head!',
    phase: 'GET_REFRESH',
    codeLine: 43,
    action: 'get(1) &rarr; returns 10',
    list: [
      { key: 1, val: 10 },
      { key: 3, val: 30 },
      { key: 2, val: 20 }
    ],
    returned: 10,
    explain: 'Key 1 accessed. Detached from previous position and spliced at front right after head. Now Key 2 is the LRU!'
  },
  {
    title: '5. put(4, 40): Evict LRU (Key 2) & Insert Key 4',
    phase: 'EVICT',
    codeLine: 57,
    action: 'put(4, 40) &rarr; Evicted Key 2',
    list: [
      { key: 4, val: 40 },
      { key: 1, val: 10 },
      { key: 3, val: 30 }
    ],
    returned: null,
    explain: 'Cache was full. Tail.prev (Key 2) evicted from hash map and doubly linked list. Key 4 inserted at head!'
  },
  {
    title: '6. get(2): Cache Miss &rarr; Returns -1 in O(1)',
    phase: 'GET_MISS',
    codeLine: 42,
    action: 'get(2) &rarr; returns -1',
    list: [
      { key: 4, val: 40 },
      { key: 1, val: 10 },
      { key: 3, val: 30 }
    ],
    returned: -1,
    explain: 'Key 2 does not exist in hash map. Instant O(1) miss returning -1.'
  }
];

export default function LruCacheVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
          Command: <strong className="text-cyan-400">{step.action}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Capacity: <strong>{step.list.length} / 3</strong>
        </div>
        {step.returned !== null && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
            Output: <strong>{step.returned}</strong>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Doubly Linked List (Temporal Order)</span>
          <span className="text-cyan-400 font-bold">O(1) Splicing</span>
        </div>

        {/* DLL visualizer */}
        <div className="flex items-center justify-center gap-2 w-full py-6 overflow-x-auto min-h-[110px]">
          {/* Head Sentinel */}
          <div className="px-2.5 py-2 rounded-lg bg-[#141622] border border-[#272b3d] text-[10px] font-mono text-[#616888]">
            HEAD
          </div>
          <span className="text-xs font-mono text-[#3f4566]">&harr;</span>

          {step.list.length === 0 ? (
            <span className="text-xs font-mono text-[#4e5370]">Empty Cache</span>
          ) : (
            step.list.map((item, idx) => {
              const isMRU = idx === 0;
              const isLRU = idx === step.list.length - 1;

              return (
                <div key={item.key} className="flex items-center gap-2">
                  <div
                    className={`w-20 h-20 rounded-xl border-2 flex flex-col items-center justify-center font-mono relative transition-all duration-300 ${
                      isMRU
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/20'
                        : isLRU
                        ? 'bg-rose-500/20 border-rose-400/60 text-rose-200'
                        : 'bg-[#181a26] border-[#31364d] text-[var(--chalk)]'
                    }`}
                  >
                    {isMRU && (
                      <span className="absolute -top-3 px-1.5 py-0.5 rounded text-[8px] bg-cyan-500 text-black font-bold">
                        MRU
                      </span>
                    )}
                    {isLRU && (
                      <span className="absolute -bottom-3 px-1.5 py-0.5 rounded text-[8px] bg-rose-500 text-[var(--chalk)] font-bold">
                        LRU
                      </span>
                    )}
                    <span className="text-xs text-[#7e85a6]">k: {item.key}</span>
                    <span className="text-base font-bold">v: {item.val}</span>
                  </div>
                  <span className="text-xs font-mono text-[#3f4566]">&harr;</span>
                </div>
              );
            })
          )}

          {/* Tail Sentinel */}
          <div className="px-2.5 py-2 rounded-lg bg-[#141622] border border-[#272b3d] text-[10px] font-mono text-[#616888]">
            TAIL
          </div>
        </div>

        <div className="text-xs font-mono text-[var(--chalk-dim)] bg-[var(--board-raised-2)] px-4 py-2 rounded-xl border border-[var(--line)] text-center w-full">
          Hash Map provides O(1) node lookup. Doubly Linked List provides O(1) removal and head-insertion.
        </div>
      </div>
    </div>
  );
}

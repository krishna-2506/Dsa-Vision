import React from 'react';

export const meta = {
  title: 'Trie Implementation and Advanced Operations (Trie II)',
  category: 'Tries',
  difficulty: 'Hard',
  timeComplexity: 'O(L) per operation',
  spaceComplexity: 'O(N * L * 26)',
  description: 'Extends Trie functionality with duplicate counts and erasure: countWordsEqualTo(word), countWordsStartingWith(prefix), and erase(word) by tracking prefix and terminal counts on each node.'
};

export const ideaMap = {
  problemArchetype: 'Prefix Multiset & Dynamic Frequency Trie',
  trigger: 'Need to track exact word duplicates, count words matching a prefix in O(L) without DFS traversal, or support dynamic word erasure.',
  coreInsight: 'Replace boolean terminal flags with two integer counters on every node: cntPrefix (how many words pass through) and cntEndWith (how many words end here). Queries become instant O(L) counter lookups.',
  naiveApproach: {
    title: 'Trie + DFS Subtree Traversal',
    time: 'O(L + 26^depth) per prefix count',
    space: 'O(N * L)',
    bottleneck: 'To count how many words start with a prefix, standard Trie requires exploring the entire subtree below the prefix node.'
  },
  optimalApproach: {
    title: 'Dual Counter Augmented Trie (Trie II)',
    time: 'O(L) per count/erase/insert',
    space: 'O(N * L * 26)',
    breakthrough: 'Precomputing prefix and ending counts on-the-fly during insertion eliminates subtree DFS entirely. Queries read cntPrefix directly at depth L.'
  },
  flowNodes: [
    { id: '1', title: 'Dual Counters', subtitle: 'cp and ce', description: 'Every node holds cp (cntPrefix) and ce (cntEndWith). Root starts with cp=0, ce=0.', tag: 'Structure' },
    { id: '2', title: 'Increment on Insert', subtitle: 'Multiset support', description: 'During insertion, increment cp on every visited node. At the terminal node, increment ce.', tag: 'Insert' },
    { id: '3', title: 'O(L) Instant Query', subtitle: 'Zero DFS', description: 'countWordsStartingWith(prefix) walks to prefix node and directly reads cp in O(L) time.', tag: 'Query' },
    { id: '4', title: 'Path-Decrement Erase', subtitle: 'Zero leaks', description: 'erase(word) retraces the path, decrementing cp by 1 at each node and ce by 1 at the end.', tag: 'Erase' }
  ],
  pitfalls: [
    'Erasing non-existent words: Ensure the problem guarantees the word exists in the Trie before calling erase(), or verify existence first to prevent negative counters.',
    'Memory cleanup: Simple implementations decrement counters without freeing memory (valid for contest DSA; in production, prune nodes where cp reaches 0).',
    'Invariant: For any valid node, cp >= ce must always hold.'
  ],
  interviewCheatSheet: 'When asked to count prefix frequencies or support word deletions, upgrade boolean isEnd to (cntPrefix, cntEndWith) integer counters.'
};

export const solutions = {
  cpp: `// C++ Trie II (Advanced Operations: Counts & Erase)
// Time: O(L) per op | Space: O(N * L * 26)
#include <string>
using namespace std;

struct Node {
    Node* links[26] = {nullptr};
    int cntEndWith = 0;
    int cntPrefix = 0;

    bool containsKey(char ch) { return links[ch - 'a'] != nullptr; }
    void put(char ch, Node* node) { links[ch - 'a'] = node; }
    Node* get(char ch) { return links[ch - 'a']; }
    void increaseEnd() { cntEndWith++; }
    void increasePrefix() { cntPrefix++; }
    void deleteEnd() { cntEndWith--; }
    void reducePrefix() { cntPrefix--; }
    int getEnd() { return cntEndWith; }
    int getPrefix() { return cntPrefix; }
};

class Trie {
    Node* root;
public:
    Trie() { root = new Node(); }

    void insert(string word) {
        Node* node = root;
        for (char ch : word) {
            if (!node->containsKey(ch)) {
                node->put(ch, new Node());
            }
            node = node->get(ch);
            node->increasePrefix();
        }
        node->increaseEnd();
    }

    int countWordsEqualTo(string word) {
        Node* node = root;
        for (char ch : word) {
            if (!node->containsKey(ch)) return 0;
            node = node->get(ch);
        }
        return node->getEnd();
    }

    int countWordsStartingWith(string prefix) {
        Node* node = root;
        for (char ch : prefix) {
            if (!node->containsKey(ch)) return 0;
            node = node->get(ch);
        }
        return node->getPrefix();
    }

    void erase(string word) {
        Node* node = root;
        for (char ch : word) {
            if (!node->containsKey(ch)) return;
            node = node->get(ch);
            node->reducePrefix();
        }
        node->deleteEnd();
    }
};`,
  python: `# Python 3 Trie II (Advanced Counts & Erase)
# Time: O(L) per op | Space: O(N * L * 26)
class TrieNode:
    def __init__(self):
        self.children = {}
        self.cnt_end = 0
        self.cnt_prefix = 0

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                curr.children[ch] = TrieNode()
            curr = curr.children[ch]
            curr.cnt_prefix += 1
        curr.cnt_end += 1

    def countWordsEqualTo(self, word: str) -> int:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                return 0
            curr = curr.children[ch]
        return curr.cnt_end

    def countWordsStartingWith(self, prefix: str) -> int:
        curr = self.root
        for ch in prefix:
            if ch not in curr.children:
                return 0
            curr = curr.children[ch]
        return curr.cnt_prefix

    def erase(self, word: str) -> None:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                return
            curr = curr.children[ch]
            curr.cnt_prefix -= 1
        curr.cnt_end -= 1`,
  java: `// Java Trie II (Advanced Counts & Erase)
// Time: O(L) per op | Space: O(N * L * 26)
class Node {
    Node[] links = new Node[26];
    int cntEndWith = 0;
    int cntPrefix = 0;

    boolean containsKey(char ch) { return links[ch - 'a'] != null; }
    void put(char ch, Node node) { links[ch - 'a'] = node; }
    Node get(char ch) { return links[ch - 'a']; }
    void increaseEnd() { cntEndWith++; }
    void increasePrefix() { cntPrefix++; }
    void deleteEnd() { cntEndWith--; }
    void reducePrefix() { cntPrefix--; }
    int getEnd() { return cntEndWith; }
    int getPrefix() { return cntPrefix; }
}

class Trie {
    private Node root;

    public Trie() { root = new Node(); }

    public void insert(String word) {
        Node node = root;
        for (char ch : word.toCharArray()) {
            if (!node.containsKey(ch)) node.put(ch, new Node());
            node = node.get(ch);
            node.increasePrefix();
        }
        node.increaseEnd();
    }

    public int countWordsEqualTo(String word) {
        Node node = root;
        for (char ch : word.toCharArray()) {
            if (!node.containsKey(ch)) return 0;
            node = node.get(ch);
        }
        return node.getEnd();
    }

    public int countWordsStartingWith(String prefix) {
        Node node = root;
        for (char ch : prefix.toCharArray()) {
            if (!node.containsKey(ch)) return 0;
            node = node.get(ch);
        }
        return node.getPrefix();
    }

    public void erase(String word) {
        Node node = root;
        for (char ch : word.toCharArray()) {
            if (!node.containsKey(ch)) return;
            node = node.get(ch);
            node.reducePrefix();
        }
        node.deleteEnd();
    }
}`,
  javascript: `// JavaScript Trie II (Advanced Counts & Erase)
// Time: O(L) per op | Space: O(N * L * 26)
class TrieNode {
    constructor() {
        this.children = {};
        this.cntEnd = 0;
        this.cntPrefix = 0;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (const ch of word) {
            if (!node.children[ch]) node.children[ch] = new TrieNode();
            node = node.children[ch];
            node.cntPrefix++;
        }
        node.cntEnd++;
    }

    countWordsEqualTo(word) {
        let node = this.root;
        for (const ch of word) {
            if (!node.children[ch]) return 0;
            node = node.children[ch];
        }
        return node.cntEnd;
    }

    countWordsStartingWith(prefix) {
        let node = this.root;
        for (const ch of prefix) {
            if (!node.children[ch]) return 0;
            node = node.children[ch];
        }
        return node.cntPrefix;
    }

    erase(word) {
        let node = this.root;
        for (const ch of word) {
            if (!node.children[ch]) return;
            node = node.children[ch];
            node.cntPrefix--;
        }
        node.cntEnd--;
    }
}`
};

export const steps = [
  {
    title: '1. Trie II Architecture (Prefix & Terminal Counters)',
    phase: 'INIT',
    operation: 'new Trie()',
    activeWord: null,
    activeNodeId: 'root',
    result: 'Trie II Ready',
    nodes: [
      { id: 'root', char: 'ROOT', cp: 0, ce: 0, x: 200, y: 35 }
    ],
    edges: [],
    variables: { totalWords: 0, 'cntPrefix (cp)': 'words passing through', 'cntEndWith (ce)': 'words ending exactly here' },
    explain: 'Unlike Trie I which uses a boolean flag, Trie II equips every node with two integer counters: cntPrefix (cp) and cntEndWith (ce). This enables duplicate words, multiset counting, and erasure.',
    intuition: 'cp counts prefix traversals; ce counts exact full-word completions.'
  },
  {
    title: '2. insert("apple") -> 1st Insertion (cp=1, ce=1 on "e")',
    phase: 'INSERT',
    operation: 'insert("apple")',
    activeWord: 'apple',
    activeNodeId: 'e',
    result: 'Stored 1st copy of "apple"',
    nodes: [
      { id: 'root', char: 'ROOT', cp: 0, ce: 0, x: 200, y: 35 },
      { id: 'a', char: 'a', cp: 1, ce: 0, x: 200, y: 85 },
      { id: 'p1', char: 'p', cp: 1, ce: 0, x: 200, y: 135 },
      { id: 'p2', char: 'p', cp: 1, ce: 0, x: 200, y: 185 },
      { id: 'l', char: 'l', cp: 1, ce: 0, x: 150, y: 240 },
      { id: 'e', char: 'e', cp: 1, ce: 1, x: 150, y: 295 }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a' },
      { from: 'a', to: 'p1', label: 'p' },
      { from: 'p1', to: 'p2', label: 'p' },
      { from: 'p2', to: 'l', label: 'l' },
      { from: 'l', to: 'e', label: 'e' }
    ],
    variables: { 'Path nodes cp': 'incremented to 1', "node('e').ce": 1, wordsStored: 1 },
    explain: 'Inserting "apple": We traverse root -> a -> p -> p -> l -> e. At each step, node.increasePrefix() increments cp to 1. At terminal node \'e\', increaseEnd() sets ce = 1.',
    intuition: 'Each letter knows that 1 word has traversed it, and \'e\' knows 1 word ends there.'
  },
  {
    title: '3. insert("apple") -> Duplicate Insertion! (Multiset Support)',
    phase: 'INSERT_DUPLICATE',
    operation: 'insert("apple")',
    activeWord: 'apple',
    activeNodeId: 'e',
    result: 'Stored 2nd copy of "apple"',
    nodes: [
      { id: 'root', char: 'ROOT', cp: 0, ce: 0, x: 200, y: 35 },
      { id: 'a', char: 'a', cp: 2, ce: 0, x: 200, y: 85, updated: true },
      { id: 'p1', char: 'p', cp: 2, ce: 0, x: 200, y: 135, updated: true },
      { id: 'p2', char: 'p', cp: 2, ce: 0, x: 200, y: 185, updated: true },
      { id: 'l', char: 'l', cp: 2, ce: 0, x: 150, y: 240, updated: true },
      { id: 'e', char: 'e', cp: 2, ce: 2, x: 150, y: 295, updated: true }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a' },
      { from: 'a', to: 'p1', label: 'p' },
      { from: 'p1', to: 'p2', label: 'p' },
      { from: 'p2', to: 'l', label: 'l' },
      { from: 'l', to: 'e', label: 'e' }
    ],
    variables: { 'Path nodes cp': '2 (two words share this stem)', "node('e').ce": '2 (two exact matches)', wordsStored: 2 },
    explain: 'Inserting "apple" a 2nd time! No new nodes are created. Instead, cntPrefix on all path nodes becomes 2, and cntEndWith on node \'e\' increments from 1 to 2.',
    intuition: 'Trie II seamlessly behaves as a multiset by keeping track of duplicate frequencies.'
  },
  {
    title: '4. insert("apps") -> Branching Off "p2" (cp=3 on stem)',
    phase: 'INSERT_APPS',
    operation: 'insert("apps")',
    activeWord: 'apps',
    activeNodeId: 's',
    result: 'Stored "apps" (Branch Created)',
    nodes: [
      { id: 'root', char: 'ROOT', cp: 0, ce: 0, x: 200, y: 35 },
      { id: 'a', char: 'a', cp: 3, ce: 0, x: 200, y: 85, updated: true },
      { id: 'p1', char: 'p', cp: 3, ce: 0, x: 200, y: 135, updated: true },
      { id: 'p2', char: 'p', cp: 3, ce: 0, x: 200, y: 185, updated: true },
      { id: 'l', char: 'l', cp: 2, ce: 0, x: 150, y: 240 },
      { id: 'e', char: 'e', cp: 2, ce: 2, x: 150, y: 295 },
      { id: 's', char: 's', cp: 1, ce: 1, x: 260, y: 240, isNew: true }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a' },
      { from: 'a', to: 'p1', label: 'p' },
      { from: 'p1', to: 'p2', label: 'p' },
      { from: 'p2', to: 'l', label: 'l' },
      { from: 'l', to: 'e', label: 'e' },
      { from: 'p2', to: 's', label: 's', isNew: true }
    ],
    variables: { 'Common prefix "app" cp': 3, 'node "s" cp': 1, 'node "s" ce': 1, wordsStored: 3 },
    explain: 'Inserting "apps": Stem a -> p -> p already exists; its cp increments to 3. Node \'s\' is newly allocated with cp=1 and ce=1.',
    intuition: 'Prefix "app" now has 3 occurrences ("apple", "apple", "apps").'
  },
  {
    title: '5. insert("app") -> Prefix Becomes a Terminal Word (ce=1 on "p2")',
    phase: 'INSERT_APP',
    operation: 'insert("app")',
    activeWord: 'app',
    activeNodeId: 'p2',
    result: 'Stored "app" (ce=1 on "p2")',
    nodes: [
      { id: 'root', char: 'ROOT', cp: 0, ce: 0, x: 200, y: 35 },
      { id: 'a', char: 'a', cp: 4, ce: 0, x: 200, y: 85, updated: true },
      { id: 'p1', char: 'p', cp: 4, ce: 0, x: 200, y: 135, updated: true },
      { id: 'p2', char: 'p', cp: 4, ce: 1, x: 200, y: 185, updated: true },
      { id: 'l', char: 'l', cp: 2, ce: 0, x: 150, y: 240 },
      { id: 'e', char: 'e', cp: 2, ce: 2, x: 150, y: 295 },
      { id: 's', char: 's', cp: 1, ce: 1, x: 260, y: 240 }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a' },
      { from: 'a', to: 'p1', label: 'p' },
      { from: 'p1', to: 'p2', label: 'p' },
      { from: 'p2', to: 'l', label: 'l' },
      { from: 'l', to: 'e', label: 'e' },
      { from: 'p2', to: 's', label: 's' }
    ],
    variables: { 'Common prefix "app" cp': 4, "node('p2').ce": '1 (Word "app" ends here)', wordsStored: 4 },
    explain: 'Inserting "app": Nodes a -> p -> p have cp incremented to 4. Node \'p2\' now receives ce = 1 because "app" itself is an inserted word!',
    intuition: 'A node can simultaneously be an internal prefix node (cp=4) and an exact terminal node (ce=1).'
  },
  {
    title: '6. Trie II State Audit: Total 4 Words Stored',
    phase: 'AUDIT',
    operation: 'State Inspection',
    activeWord: null,
    activeNodeId: 'root',
    result: '4 Words in Multiset',
    nodes: [
      { id: 'root', char: 'ROOT', cp: 0, ce: 0, x: 200, y: 35 },
      { id: 'a', char: 'a', cp: 4, ce: 0, x: 200, y: 85 },
      { id: 'p1', char: 'p', cp: 4, ce: 0, x: 200, y: 135 },
      { id: 'p2', char: 'p', cp: 4, ce: 1, x: 200, y: 185 },
      { id: 'l', char: 'l', cp: 2, ce: 0, x: 150, y: 240 },
      { id: 'e', char: 'e', cp: 2, ce: 2, x: 150, y: 295 },
      { id: 's', char: 's', cp: 1, ce: 1, x: 260, y: 240 }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a' },
      { from: 'a', to: 'p1', label: 'p' },
      { from: 'p1', to: 'p2', label: 'p' },
      { from: 'p2', to: 'l', label: 'l' },
      { from: 'l', to: 'e', label: 'e' },
      { from: 'p2', to: 's', label: 's' }
    ],
    variables: { storedWords: '["apple", "apple", "apps", "app"]', totalWords: 4, distinctWords: 3 },
    explain: 'Audit check: Notice how each node shows [cp: blue] and [ce: green]. At any node, cp >= ce always holds true.',
    intuition: 'Invariant: cp is the sum of ce values in this node\'s entire subtree (including itself).'
  },
  {
    title: '7. countWordsEqualTo("apple") -> Directly Read ce on "e" -> 2',
    phase: 'QUERY_EQUAL',
    operation: 'countWordsEqualTo("apple")',
    activeWord: 'apple',
    activeNodeId: 'e',
    result: 'Count = 2 (O(L) Time)',
    nodes: [
      { id: 'root', char: 'ROOT', cp: 0, ce: 0, x: 200, y: 35 },
      { id: 'a', char: 'a', cp: 4, ce: 0, x: 200, y: 85, queryPath: true },
      { id: 'p1', char: 'p', cp: 4, ce: 0, x: 200, y: 135, queryPath: true },
      { id: 'p2', char: 'p', cp: 4, ce: 1, x: 200, y: 185, queryPath: true },
      { id: 'l', char: 'l', cp: 2, ce: 0, x: 150, y: 240, queryPath: true },
      { id: 'e', char: 'e', cp: 2, ce: 2, x: 150, y: 295, queryTarget: true }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a', queryPath: true },
      { from: 'a', to: 'p1', label: 'p', queryPath: true },
      { from: 'p1', to: 'p2', label: 'p', queryPath: true },
      { from: 'p2', to: 'l', label: 'l', queryPath: true },
      { from: 'l', to: 'e', label: 'e', queryPath: true },
      { from: 'p2', to: 's', label: 's' }
    ],
    variables: { target: '"apple"', reachedNode: 'Node(e)', 'node.getEnd()': 2, returnVal: 2 },
    explain: 'countWordsEqualTo("apple"): Walk root -> a -> p -> p -> l -> e. Return node.getEnd() directly = 2 in O(L) time.',
    intuition: 'No frequency hash map or linear scanning needed. Frequency is read instantly at the terminal node.'
  },
  {
    title: '8. countWordsEqualTo("app") -> Directly Read ce on "p2" -> 1',
    phase: 'QUERY_EQUAL',
    operation: 'countWordsEqualTo("app")',
    activeWord: 'app',
    activeNodeId: 'p2',
    result: 'Count = 1 (O(L) Time)',
    nodes: [
      { id: 'root', char: 'ROOT', cp: 0, ce: 0, x: 200, y: 35 },
      { id: 'a', char: 'a', cp: 4, ce: 0, x: 200, y: 85, queryPath: true },
      { id: 'p1', char: 'p', cp: 4, ce: 0, x: 200, y: 135, queryPath: true },
      { id: 'p2', char: 'p', cp: 4, ce: 1, x: 200, y: 185, queryTarget: true },
      { id: 'l', char: 'l', cp: 2, ce: 0, x: 150, y: 240 },
      { id: 'e', char: 'e', cp: 2, ce: 2, x: 150, y: 295 },
      { id: 's', char: 's', cp: 1, ce: 1, x: 260, y: 240 }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a', queryPath: true },
      { from: 'a', to: 'p1', label: 'p', queryPath: true },
      { from: 'p1', to: 'p2', label: 'p', queryPath: true },
      { from: 'p2', to: 'l', label: 'l' },
      { from: 'l', to: 'e', label: 'e' },
      { from: 'p2', to: 's', label: 's' }
    ],
    variables: { target: '"app"', reachedNode: 'Node(p2)', 'node.getEnd()': 1, returnVal: 1 },
    explain: 'countWordsEqualTo("app"): Walk root -> a -> p -> p. Return node(\'p2\').getEnd() = 1. Even though cp=4, only 1 word ends here.',
    intuition: 'ce isolates exact word matches from longer extension words.'
  },
  {
    title: '9. countWordsStartingWith("app") -> Read cp on "p2" -> 4!',
    phase: 'QUERY_PREFIX',
    operation: 'countWordsStartingWith("app")',
    activeWord: 'app',
    activeNodeId: 'p2',
    result: 'Prefix Count = 4 (O(L) Time)',
    nodes: [
      { id: 'root', char: 'ROOT', cp: 0, ce: 0, x: 200, y: 35 },
      { id: 'a', char: 'a', cp: 4, ce: 0, x: 200, y: 85, queryPath: true },
      { id: 'p1', char: 'p', cp: 4, ce: 0, x: 200, y: 135, queryPath: true },
      { id: 'p2', char: 'p', cp: 4, ce: 1, x: 200, y: 185, queryTarget: true },
      { id: 'l', char: 'l', cp: 2, ce: 0, x: 150, y: 240 },
      { id: 'e', char: 'e', cp: 2, ce: 2, x: 150, y: 295 },
      { id: 's', char: 's', cp: 1, ce: 1, x: 260, y: 240 }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a', queryPath: true },
      { from: 'a', to: 'p1', label: 'p', queryPath: true },
      { from: 'p1', to: 'p2', label: 'p', queryPath: true },
      { from: 'p2', to: 'l', label: 'l' },
      { from: 'l', to: 'e', label: 'e' },
      { from: 'p2', to: 's', label: 's' }
    ],
    variables: { prefix: '"app"', reachedNode: 'Node(p2)', 'node.getPrefix()': 4, matchingWords: '["apple", "apple", "apps", "app"]' },
    explain: 'countWordsStartingWith("app"): Walk to \'p2\'. Return node.getPrefix() = 4! Note that we do NOT traverse downstream branches at query time!',
    intuition: 'Subtree counting is precomputed in O(1) during insertion rather than computed dynamically with costly DFS.'
  },
  {
    title: '10. erase("apple") -> Decrementing Path Counters',
    phase: 'ERASE',
    operation: 'erase("apple")',
    activeWord: 'apple',
    activeNodeId: 'e',
    result: 'Erased 1 copy of "apple"',
    nodes: [
      { id: 'root', char: 'ROOT', cp: 0, ce: 0, x: 200, y: 35 },
      { id: 'a', char: 'a', cp: 3, ce: 0, x: 200, y: 85, erased: true },
      { id: 'p1', char: 'p', cp: 3, ce: 0, x: 200, y: 135, erased: true },
      { id: 'p2', char: 'p', cp: 3, ce: 1, x: 200, y: 185, erased: true },
      { id: 'l', char: 'l', cp: 1, ce: 0, x: 150, y: 240, erased: true },
      { id: 'e', char: 'e', cp: 1, ce: 1, x: 150, y: 295, erased: true }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a' },
      { from: 'a', to: 'p1', label: 'p' },
      { from: 'p1', to: 'p2', label: 'p' },
      { from: 'p2', to: 'l', label: 'l' },
      { from: 'l', to: 'e', label: 'e' },
      { from: 'p2', to: 's', label: 's' }
    ],
    variables: { 'a -> p -> p cp': 'decremented 4 -> 3', 'l -> e cp': 'decremented 2 -> 1', "node('e').ce": 'decremented 2 -> 1' },
    explain: 'erase("apple"): Follow path root -> a -> p -> p -> l -> e. At each node, reducePrefix() decrements cp by 1. At node \'e\', deleteEnd() decrements ce from 2 to 1.',
    intuition: 'Erasure requires exactly O(L) pointer updates without deleting nodes that other words still depend on.'
  },
  {
    title: '11. Post-Erase Verification: countWordsEqualTo("apple") -> 1',
    phase: 'POST_ERASE_CHECK',
    operation: 'countWordsEqualTo("apple")',
    activeWord: 'apple',
    activeNodeId: 'e',
    result: 'Count = 1 (Verified!)',
    nodes: [
      { id: 'root', char: 'ROOT', cp: 0, ce: 0, x: 200, y: 35 },
      { id: 'a', char: 'a', cp: 3, ce: 0, x: 200, y: 85 },
      { id: 'p1', char: 'p', cp: 3, ce: 0, x: 200, y: 135 },
      { id: 'p2', char: 'p', cp: 3, ce: 1, x: 200, y: 185 },
      { id: 'l', char: 'l', cp: 1, ce: 0, x: 150, y: 240 },
      { id: 'e', char: 'e', cp: 1, ce: 1, x: 150, y: 295, queryTarget: true }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a' },
      { from: 'a', to: 'p1', label: 'p' },
      { from: 'p1', to: 'p2', label: 'p' },
      { from: 'p2', to: 'l', label: 'l' },
      { from: 'l', to: 'e', label: 'e' },
      { from: 'p2', to: 's', label: 's' }
    ],
    variables: { remainingCopies: 1, 'countWordsStartingWith("app")': 3, 'countWordsEqualTo("app")': 1 },
    explain: 'After erasing one "apple", calling countWordsEqualTo("apple") returns 1. Exactly one copy remains safely preserved in the multiset.',
    intuition: 'Trie II maintains exact multiset semantics through simple counter increments and decrements.'
  },
  {
    title: '12. Complexity & Summary: Instant O(L) Operations',
    phase: 'COMPLETED',
    operation: 'Summary & Comparison',
    activeWord: null,
    activeNodeId: 'root',
    result: 'All Ops O(L) Time, O(1) Aux Space',
    nodes: [
      { id: 'root', char: 'ROOT', cp: 0, ce: 0, x: 200, y: 35 },
      { id: 'a', char: 'a', cp: 3, ce: 0, x: 200, y: 85 },
      { id: 'p1', char: 'p', cp: 3, ce: 0, x: 200, y: 135 },
      { id: 'p2', char: 'p', cp: 3, ce: 1, x: 200, y: 185 },
      { id: 'l', char: 'l', cp: 1, ce: 0, x: 150, y: 240 },
      { id: 'e', char: 'e', cp: 1, ce: 1, x: 150, y: 295 },
      { id: 's', char: 's', cp: 1, ce: 1, x: 260, y: 240 }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a' },
      { from: 'a', to: 'p1', label: 'p' },
      { from: 'p1', to: 'p2', label: 'p' },
      { from: 'p2', to: 'l', label: 'l' },
      { from: 'l', to: 'e', label: 'e' },
      { from: 'p2', to: 's', label: 's' }
    ],
    variables: { insertTime: 'O(L)', countEqualTime: 'O(L)', countPrefixTime: 'O(L)', eraseTime: 'O(L)' },
    explain: 'Trie II is the gold standard data structure for prefix queries and autocomplete multiset engines. All operations run in deterministic O(L) time regardless of dictionary size!',
    intuition: 'Space Complexity: O(N * L * 26) pointers, where N is the number of words and L is average length.'
  }
];

export default function TrieImplementationAndAdvancedOperationsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-4 space-y-5">
      {/* Operation HUD */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-3 flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--chalk-dim)]">Current Operation</span>
          <span className="text-sm font-mono font-bold text-cyan-300 mt-0.5">{step.operation}</span>
        </div>
        <div className="bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-3 flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--chalk-dim)]">Operation Verdict</span>
          <span className="text-sm font-mono font-bold text-emerald-400 mt-0.5">{step.result}</span>
        </div>
        <div className="bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-3 flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--chalk-dim)]">Operation Time</span>
          <span className="text-sm font-mono font-bold text-purple-400 mt-0.5">O(L) - Deterministic</span>
        </div>
      </div>

      {/* Interactive SVG Trie Hierarchy with Counters */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 flex flex-col items-center shadow-2xl relative overflow-hidden">
        <div className="w-full flex items-center justify-between pb-2 border-b border-[var(--line)]/60 text-xs font-mono text-[var(--chalk-dim)]">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            TRIE II NODE GRAPH (cp & ce Counters)
          </span>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40 text-[9px] font-bold">cp</span>
              cntPrefix
            </span>
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold">ce</span>
              cntEndWith
            </span>
          </div>
        </div>

        <svg width="100%" height="340" viewBox="0 0 400 340" className="overflow-visible select-none my-2">
          <defs>
            <marker id="arrow-trie2" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#4a5578" />
            </marker>
            <marker id="arrow-active2" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
            </marker>
          </defs>

          {/* Edges */}
          {step.edges.map((e, idx) => {
            const fromNode = step.nodes.find(n => n.id === e.from);
            const toNode = step.nodes.find(n => n.id === e.to);
            if (!fromNode || !toNode) return null;

            const isHighlighted = e.queryPath || e.isNew;

            return (
              <g key={idx}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isHighlighted ? '#38bdf8' : '#2e344e'}
                  strokeWidth={isHighlighted ? '3' : '2'}
                  strokeDasharray={e.isNew ? '4 2' : 'none'}
                  markerEnd={isHighlighted ? 'url(#arrow-active2)' : 'url(#arrow-trie2)'}
                  className="transition-all duration-300"
                />
                {/* Edge Character Label */}
                <circle
                  cx={(fromNode.x + toNode.x) / 2 + (toNode.x > fromNode.x ? 10 : -10)}
                  cy={(fromNode.y + toNode.y) / 2}
                  r="9"
                  fill="#0b0d14"
                  stroke={isHighlighted ? '#38bdf8' : '#334155'}
                  strokeWidth="1"
                />
                <text
                  x={(fromNode.x + toNode.x) / 2 + (toNode.x > fromNode.x ? 10 : -10)}
                  y={(fromNode.y + toNode.y) / 2}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`font-mono text-[10px] font-bold ${isHighlighted ? 'fill-cyan-300' : 'fill-slate-400'}`}
                >
                  {e.label}
                </text>
              </g>
            );
          })}

          {/* Nodes with cp & ce badges */}
          {step.nodes.map(node => {
            const isActive = node.id === step.activeNodeId;
            const isTarget = node.queryTarget;
            const isRoot = node.char === 'ROOT';

            return (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`} className="transition-transform duration-300">
                {/* Active glow */}
                {isActive && (
                  <circle
                    r={isRoot ? 26 : 22}
                    className="fill-none stroke-amber-400/50 stroke-2 animate-ping"
                  />
                )}

                {/* Node Circle */}
                <circle
                  r={isRoot ? 22 : 17}
                  className={`transition-all duration-300 ${
                    isTarget
                      ? 'fill-cyan-500/30 stroke-cyan-400 stroke-2 ring-4 ring-cyan-500/30'
                      : isActive
                      ? 'fill-amber-500/30 stroke-amber-400 stroke-2'
                      : node.ce > 0
                      ? 'fill-emerald-500/20 stroke-emerald-400 stroke-2'
                      : 'fill-[#161824] stroke-[#38405d] stroke-2'
                  }`}
                />

                {/* Node Character */}
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`font-mono font-bold select-none ${
                    isRoot
                      ? 'text-[9px] fill-purple-300'
                      : isTarget
                      ? 'text-xs fill-cyan-200'
                      : isActive
                      ? 'text-xs fill-amber-200'
                      : node.ce > 0
                      ? 'text-xs fill-emerald-300'
                      : 'text-xs fill-slate-300'
                  }`}
                >
                  {node.char}
                </text>

                {/* cp & ce Counter Tag Container */}
                {!isRoot && (
                  <g transform="translate(22, -10)">
                    {/* cp tag */}
                    <rect x="0" y="-2" width="28" height="12" rx="3" fill="#0369a1" fillOpacity="0.35" stroke="#38bdf8" strokeWidth="0.8" />
                    <text x="14" y="5" textAnchor="middle" dominantBaseline="central" className="font-mono text-[8px] font-bold fill-sky-200">
                      cp:{node.cp}
                    </text>
                    {/* ce tag */}
                    <rect x="0" y="12" width="28" height="12" rx="3" fill={node.ce > 0 ? '#065f46' : '#1e293b'} fillOpacity={node.ce > 0 ? '0.6' : '0.4'} stroke={node.ce > 0 ? '#10b981' : '#475569'} strokeWidth="0.8" />
                    <text x="14" y="19" textAnchor="middle" dominantBaseline="central" className={`font-mono text-[8px] font-bold ${node.ce > 0 ? 'fill-emerald-200' : 'fill-slate-400'}`}>
                      ce:{node.ce}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* State & Dynamic Variables HUD */}
      <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs font-mono">
        {Object.entries(step.variables).map(([key, value]) => (
          <div key={key} className="bg-[var(--board-raised)] border border-[var(--line)]/60 rounded-lg p-2 flex flex-col">
            <span className="text-[10px] text-[var(--chalk-dim)] uppercase tracking-wider">{key}</span>
            <span className="text-amber-300 font-semibold truncate mt-0.5">{String(value)}</span>
          </div>
        ))}
      </div>

      {/* Explanation & Intuition */}
      <div className="w-full space-y-2">
        <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3.5 text-xs font-mono text-[#a5abbf] leading-relaxed">
          <span className="text-cyan-400 font-bold mr-1.5">Step Action:</span>
          {step.explain}
        </div>
        <div className="w-full bg-cyan-950/20 border border-cyan-500/25 rounded-xl p-3 text-xs font-mono text-cyan-300 flex items-start gap-2">
          <span className="font-bold text-cyan-400">💡 Trie II Intuition:</span>
          <span>{step.intuition}</span>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export const meta = {
  title: 'Trie Implementation and Operations (Trie I)',
  category: 'Tries',
  difficulty: 'Medium',
  timeComplexity: 'O(L) per operation',
  spaceComplexity: 'O(N * L * 26)',
  description: 'Implements a Prefix Tree (Trie) supporting insert(word), search(word), and startsWith(prefix) using fixed 26-element pointer arrays and terminal boolean flags.'
};

export const ideaMap = {
  problemArchetype: 'Prefix Tree & Dynamic Dictionary Search',
  trigger: 'Frequent prefix queries (startsWith) or dynamic dictionary insertions where a HashMap cannot check prefixes without scanning all keys.',
  coreInsight: 'Instead of hashing entire strings, share common prefixes along tree branches. A single root with 26-way child pointers enables both search and prefix checking in strict O(L) time.',
  naiveApproach: {
    title: 'HashSet / Array Scan',
    time: 'O(N * L) per prefix query',
    space: 'O(N * L) separate copies',
    bottleneck: 'Checking if any word starts with "app" requires inspecting all N stored words in the dictionary.'
  },
  optimalApproach: {
    title: '26-Way Prefix Tree (Trie)',
    time: 'O(L) per operation',
    space: 'O(N * L * 26) with prefix sharing',
    breakthrough: 'Common prefixes ("apple", "apps") share the exact same nodes. Searching is simply walking L pointers.'
  },
  flowNodes: [
    { id: '1', title: 'Empty Root', subtitle: '26 null pointers', description: 'Represents empty prefix "". All word insertions, searches, and prefix queries stem from here.', tag: 'Init' },
    { id: '2', title: 'Prefix Branching', subtitle: 'Path reuse', description: 'Walk child pointers. If link is null, allocate TrieNode. If exists, traverse down without new memory.', tag: 'Insert' },
    { id: '3', title: 'Terminal Flag isEnd', subtitle: 'Prefix vs Word', description: 'Distinguishes full inserted words from intermediate prefixes (e.g. "app" in "apple").', tag: 'Flag' },
    { id: '4', title: 'Fast-Fail Search', subtitle: 'O(1) to O(L) miss', description: 'Immediate failure on the very first null link without scanning remaining characters.', tag: 'Query' }
  ],
  pitfalls: [
    'Forgetting isEnd: Confusing search() with startsWith(). search() requires isEnd === true; startsWith() only requires path existence.',
    'Memory consumption: Fixed 26-pointer arrays consume O(26) per node even if only 1 child is used (use hash map children in Python/JS if character set is sparse or Unicode).',
    'Letter offset math: always use ch - "a" for 0-indexed positioning (0 to 25).'
  ],
  interviewCheatSheet: 'When you see "autocomplete", "word search with prefix", or "dictionary search", your first instinct should be Trie.'
};

export const solutions = {
  cpp: `// C++ Trie Implementation (Trie I)
// Time: O(L) per op | Space: O(N * L * 26)
#include <string>
#include <vector>
using namespace std;

struct Node {
    Node* links[26] = {nullptr};
    bool flag = false;

    bool containsKey(char ch) { return links[ch - 'a'] != nullptr; }
    void put(char ch, Node* node) { links[ch - 'a'] = node; }
    Node* get(char ch) { return links[ch - 'a']; }
    void setEnd() { flag = true; }
    bool isEnd() { return flag; }
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
        }
        node->setEnd();
    }

    bool search(string word) {
        Node* node = root;
        for (char ch : word) {
            if (!node->containsKey(ch)) return false;
            node = node->get(ch);
        }
        return node->isEnd();
    }

    bool startsWith(string prefix) {
        Node* node = root;
        for (char ch : prefix) {
            if (!node->containsKey(ch)) return false;
            node = node->get(ch);
        }
        return true;
    }
};`,
  python: `# Python 3 Trie Implementation
# Time: O(L) per op | Space: O(N * L * 26)
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                curr.children[ch] = TrieNode()
            curr = curr.children[ch]
        curr.is_end = True

    def search(self, word: str) -> bool:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                return False
            curr = curr.children[ch]
        return curr.is_end

    def startsWith(self, prefix: str) -> bool:
        curr = self.root
        for ch in prefix:
            if ch not in curr.children:
                return False
            curr = curr.children[ch]
        return True`,
  java: `// Java Trie Implementation
// Time: O(L) per op | Space: O(N * L * 26)
class Node {
    Node[] links = new Node[26];
    boolean flag = false;

    boolean containsKey(char ch) { return links[ch - 'a'] != null; }
    void put(char ch, Node node) { links[ch - 'a'] = node; }
    Node get(char ch) { return links[ch - 'a']; }
    void setEnd() { flag = true; }
    boolean isEnd() { return flag; }
}

class Trie {
    private Node root;

    public Trie() { root = new Node(); }

    public void insert(String word) {
        Node node = root;
        for (char ch : word.toCharArray()) {
            if (!node.containsKey(ch)) node.put(ch, new Node());
            node = node.get(ch);
        }
        node.setEnd();
    }

    public boolean search(String word) {
        Node node = root;
        for (char ch : word.toCharArray()) {
            if (!node.containsKey(ch)) return false;
            node = node.get(ch);
        }
        return node.isEnd();
    }

    public boolean startsWith(String prefix) {
        Node node = root;
        for (char ch : prefix.toCharArray()) {
            if (!node.containsKey(ch)) return false;
            node = node.get(ch);
        }
        return true;
    }
}`,
  javascript: `// JavaScript Trie Implementation
// Time: O(L) per op | Space: O(N * L * 26)
class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
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
        }
        node.isEnd = true;
    }

    search(word) {
        let node = this.root;
        for (const ch of word) {
            if (!node.children[ch]) return false;
            node = node.children[ch];
        }
        return node.isEnd;
    }

    startsWith(prefix) {
        let node = this.root;
        for (const ch of prefix) {
            if (!node.children[ch]) return false;
            node = node.children[ch];
        }
        return true;
    }
}`
};

export const steps = [
  {
    title: '1. Initialize Empty Trie (Root Node Created)',
    phase: 'INIT',
    operation: 'new Trie()',
    activeChar: null,
    activeWord: null,
    activeNodeId: 'root',
    result: 'Trie Ready',
    treeNodes: [
      { id: 'root', char: 'ROOT', isEnd: false, x: 200, y: 35 }
    ],
    edges: [],
    variables: { totalNodes: 1, rootLinks: '26 null pointers', wordsStored: 0 },
    explain: 'The root node is allocated with 26 empty child links (one for each lowercase letter a-z) and isEnd = false. Every query and insertion begins at root.',
    intuition: 'The root represents the empty prefix "" common to all strings.'
  },
  {
    title: '2. insert("apple") -> Letter 1: "a"',
    phase: 'INSERT',
    operation: 'insert("apple")',
    activeChar: 'a',
    charIndex: 0,
    activeWord: 'apple',
    activeNodeId: 'a',
    result: 'Allocated Node("a")',
    treeNodes: [
      { id: 'root', char: 'ROOT', isEnd: false, x: 200, y: 35 },
      { id: 'a', char: 'a', isEnd: false, x: 200, y: 85, isNew: true }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a' }
    ],
    variables: { checking: "root.links['a' - 'a']", status: 'null -> Created new node', currNode: 'Node(a)' },
    explain: 'Looking for child \'a\' at root. Since root.links[\'a\'] is null, a new TrieNode is created and linked to root.',
    intuition: 'Branching paths are created dynamically on-demand only when a prefix has not been seen before.'
  },
  {
    title: '3. insert("apple") -> Letter 2: "p"',
    phase: 'INSERT',
    operation: 'insert("apple")',
    activeChar: 'p',
    charIndex: 1,
    activeWord: 'apple',
    activeNodeId: 'p1',
    result: 'Allocated Node("p")',
    treeNodes: [
      { id: 'root', char: 'ROOT', isEnd: false, x: 200, y: 35 },
      { id: 'a', char: 'a', isEnd: false, x: 200, y: 85 },
      { id: 'p1', char: 'p', isEnd: false, x: 200, y: 135, isNew: true }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a' },
      { from: 'a', to: 'p1', label: 'p' }
    ],
    variables: { checking: "node('a').links['p']", status: 'null -> Created new node', currNode: 'Node(p)' },
    explain: 'Advance pointer to node \'a\'. Check links[\'p\']: it is null, so allocate node \'p\' and link \'a\' -> \'p\'.',
    intuition: 'Each depth in the Trie corresponds exactly to the character position in the word.'
  },
  {
    title: '4. insert("apple") -> Letter 3: "p"',
    phase: 'INSERT',
    operation: 'insert("apple")',
    activeChar: 'p',
    charIndex: 2,
    activeWord: 'apple',
    activeNodeId: 'p2',
    result: 'Allocated Node("p")',
    treeNodes: [
      { id: 'root', char: 'ROOT', isEnd: false, x: 200, y: 35 },
      { id: 'a', char: 'a', isEnd: false, x: 200, y: 85 },
      { id: 'p1', char: 'p', isEnd: false, x: 200, y: 135 },
      { id: 'p2', char: 'p', isEnd: false, x: 200, y: 185, isNew: true }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a' },
      { from: 'a', to: 'p1', label: 'p' },
      { from: 'p1', to: 'p2', label: 'p' }
    ],
    variables: { checking: "node('p1').links['p']", status: 'null -> Created second p node', currNode: 'Node(p2)' },
    explain: 'Advance pointer to node \'p1\'. Check links[\'p\']: null. Allocate a second \'p\' node and link \'p1\' -> \'p2\'.',
    intuition: 'Repeated characters in a word each occupy their own depth level.'
  },
  {
    title: '5. insert("apple") -> Letter 4: "l"',
    phase: 'INSERT',
    operation: 'insert("apple")',
    activeChar: 'l',
    charIndex: 3,
    activeWord: 'apple',
    activeNodeId: 'l',
    result: 'Allocated Node("l")',
    treeNodes: [
      { id: 'root', char: 'ROOT', isEnd: false, x: 200, y: 35 },
      { id: 'a', char: 'a', isEnd: false, x: 200, y: 85 },
      { id: 'p1', char: 'p', isEnd: false, x: 200, y: 135 },
      { id: 'p2', char: 'p', isEnd: false, x: 200, y: 185 },
      { id: 'l', char: 'l', isEnd: false, x: 150, y: 240, isNew: true }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a' },
      { from: 'a', to: 'p1', label: 'p' },
      { from: 'p1', to: 'p2', label: 'p' },
      { from: 'p2', to: 'l', label: 'l' }
    ],
    variables: { checking: "node('p2').links['l']", status: 'null -> Created node l', currNode: 'Node(l)' },
    explain: 'Advance pointer to node \'p2\'. Node \'p2\' links to null for \'l\', so create node \'l\' and advance.',
    intuition: 'The branch bends slightly left to leave room for future alternative branches.'
  },
  {
    title: '6. insert("apple") -> Letter 5: "e" & Mark isEnd = true',
    phase: 'INSERT_TERMINAL',
    operation: 'insert("apple")',
    activeChar: 'e',
    charIndex: 4,
    activeWord: 'apple',
    activeNodeId: 'e',
    result: 'Marked [END] on "e"',
    treeNodes: [
      { id: 'root', char: 'ROOT', isEnd: false, x: 200, y: 35 },
      { id: 'a', char: 'a', isEnd: false, x: 200, y: 85 },
      { id: 'p1', char: 'p', isEnd: false, x: 200, y: 135 },
      { id: 'p2', char: 'p', isEnd: false, x: 200, y: 185 },
      { id: 'l', char: 'l', isEnd: false, x: 150, y: 240 },
      { id: 'e', char: 'e', isEnd: true, x: 150, y: 295, isNew: true }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a' },
      { from: 'a', to: 'p1', label: 'p' },
      { from: 'p1', to: 'p2', label: 'p' },
      { from: 'p2', to: 'l', label: 'l' },
      { from: 'l', to: 'e', label: 'e' }
    ],
    variables: { terminalNode: 'Node(e)', isEnd: 'true', insertedWord: '"apple"' },
    explain: 'Final letter \'e\' created. We set node.setEnd() (flag = true). This explicitly designates that "apple" is a complete valid word in the dictionary.',
    intuition: 'Without isEnd=true, "apple" would only be seen as a prefix rather than an inserted word.'
  },
  {
    title: '7. insert("apps") -> Reusing Existing Prefix "app"',
    phase: 'INSERT_REUSE',
    operation: 'insert("apps")',
    activeChar: 'p',
    charIndex: 2,
    activeWord: 'apps',
    activeNodeId: 'p2',
    result: 'Zero Memory Allocated for "app"',
    treeNodes: [
      { id: 'root', char: 'ROOT', isEnd: false, x: 200, y: 35 },
      { id: 'a', char: 'a', isEnd: false, x: 200, y: 85, reused: true },
      { id: 'p1', char: 'p', isEnd: false, x: 200, y: 135, reused: true },
      { id: 'p2', char: 'p', isEnd: false, x: 200, y: 185, reused: true },
      { id: 'l', char: 'l', isEnd: false, x: 150, y: 240 },
      { id: 'e', char: 'e', isEnd: true, x: 150, y: 295 }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a', highlighted: true },
      { from: 'a', to: 'p1', label: 'p', highlighted: true },
      { from: 'p1', to: 'p2', label: 'p', highlighted: true },
      { from: 'p2', to: 'l', label: 'l' },
      { from: 'l', to: 'e', label: 'e' }
    ],
    variables: { prefixFound: '"app"', sharedPath: 'root -> a -> p -> p', memoryAllocated: 0 },
    explain: 'Inserting "apps": We check \'a\', \'p\', \'p\'. All 3 nodes already exist! We traverse down without allocating ANY new memory.',
    intuition: 'Prefix sharing is the core super-power of Tries: millions of words sharing common prefixes consume minimal space.'
  },
  {
    title: '8. insert("apps") -> Branching Letter "s" & isEnd = true',
    phase: 'INSERT_BRANCH',
    operation: 'insert("apps")',
    activeChar: 's',
    charIndex: 3,
    activeWord: 'apps',
    activeNodeId: 's',
    result: 'Branch Created: Node("s")',
    treeNodes: [
      { id: 'root', char: 'ROOT', isEnd: false, x: 200, y: 35 },
      { id: 'a', char: 'a', isEnd: false, x: 200, y: 85 },
      { id: 'p1', char: 'p', isEnd: false, x: 200, y: 135 },
      { id: 'p2', char: 'p', isEnd: false, x: 200, y: 185 },
      { id: 'l', char: 'l', isEnd: false, x: 150, y: 240 },
      { id: 'e', char: 'e', isEnd: true, x: 150, y: 295 },
      { id: 's', char: 's', isEnd: true, x: 260, y: 240, isNew: true }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a' },
      { from: 'a', to: 'p1', label: 'p' },
      { from: 'p1', to: 'p2', label: 'p' },
      { from: 'p2', to: 'l', label: 'l' },
      { from: 'l', to: 'e', label: 'e' },
      { from: 'p2', to: 's', label: 's', isNew: true }
    ],
    variables: { branchFrom: 'Node(p2)', newChild: "links['s' - 'a'] = Node(s)", isEnd: 'true' },
    explain: 'At node \'p2\', links[\'s\'] is null. We allocate node \'s\', link \'p2\' -> \'s\', and set isEnd = true. Notice the tree now branches at \'p2\'!',
    intuition: 'The Trie now stores two distinct words ("apple" and "apps") sharing the common stem "app".'
  },
  {
    title: '9. search("app") -> Path Found But isEnd == false -> Returns FALSE',
    phase: 'SEARCH_FALSE',
    operation: 'search("app")',
    activeChar: 'p',
    charIndex: 2,
    activeWord: 'app',
    activeNodeId: 'p2',
    result: 'search("app") = FALSE ❌',
    treeNodes: [
      { id: 'root', char: 'ROOT', isEnd: false, x: 200, y: 35 },
      { id: 'a', char: 'a', isEnd: false, x: 200, y: 85, searchPath: true },
      { id: 'p1', char: 'p', isEnd: false, x: 200, y: 135, searchPath: true },
      { id: 'p2', char: 'p', isEnd: false, x: 200, y: 185, searchTarget: true },
      { id: 'l', char: 'l', isEnd: false, x: 150, y: 240 },
      { id: 'e', char: 'e', isEnd: true, x: 150, y: 295 },
      { id: 's', char: 's', isEnd: true, x: 260, y: 240 }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a', searchPath: true },
      { from: 'a', to: 'p1', label: 'p', searchPath: true },
      { from: 'p1', to: 'p2', label: 'p', searchPath: true },
      { from: 'p2', to: 'l', label: 'l' },
      { from: 'l', to: 'e', label: 'e' },
      { from: 'p2', to: 's', label: 's' }
    ],
    variables: { reachedNode: 'Node(p2)', 'isEnd flag': 'false', verdict: 'FALSE (Only a prefix, not a full word)' },
    explain: 'search("app"): All characters \'a\', \'p\', \'p\' are found! But node \'p2\'.isEnd is false because "app" was never inserted as a full word. Return false.',
    intuition: 'search() strictly requires BOTH path existence AND isEnd flag == true.'
  },
  {
    title: '10. startsWith("app") -> Path Exists -> Returns TRUE',
    phase: 'STARTS_WITH_TRUE',
    operation: 'startsWith("app")',
    activeChar: 'p',
    charIndex: 2,
    activeWord: 'app',
    activeNodeId: 'p2',
    result: 'startsWith("app") = TRUE ✅',
    treeNodes: [
      { id: 'root', char: 'ROOT', isEnd: false, x: 200, y: 35 },
      { id: 'a', char: 'a', isEnd: false, x: 200, y: 85, searchPath: true },
      { id: 'p1', char: 'p', isEnd: false, x: 200, y: 135, searchPath: true },
      { id: 'p2', char: 'p', isEnd: false, x: 200, y: 185, searchSuccess: true },
      { id: 'l', char: 'l', isEnd: false, x: 150, y: 240 },
      { id: 'e', char: 'e', isEnd: true, x: 150, y: 295 },
      { id: 's', char: 's', isEnd: true, x: 260, y: 240 }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a', searchPath: true },
      { from: 'a', to: 'p1', label: 'p', searchPath: true },
      { from: 'p1', to: 'p2', label: 'p', searchPath: true },
      { from: 'p2', to: 'l', label: 'l' },
      { from: 'l', to: 'e', label: 'e' },
      { from: 'p2', to: 's', label: 's' }
    ],
    variables: { reachedNode: 'Node(p2)', pathExists: 'true', verdict: 'TRUE (Prefix matched completely)' },
    explain: 'startsWith("app"): Follows root -> a -> p -> p. All characters exist in sequence! startsWith() does not care about isEnd flag. Returns true.',
    intuition: 'startsWith() confirms whether any stored word starts with this prefix in O(prefix.length) time.'
  },
  {
    title: '11. search("apps") -> Path Exists & isEnd == true -> Returns TRUE',
    phase: 'SEARCH_TRUE',
    operation: 'search("apps")',
    activeChar: 's',
    charIndex: 3,
    activeWord: 'apps',
    activeNodeId: 's',
    result: 'search("apps") = TRUE ✅',
    treeNodes: [
      { id: 'root', char: 'ROOT', isEnd: false, x: 200, y: 35 },
      { id: 'a', char: 'a', isEnd: false, x: 200, y: 85, searchPath: true },
      { id: 'p1', char: 'p', isEnd: false, x: 200, y: 135, searchPath: true },
      { id: 'p2', char: 'p', isEnd: false, x: 200, y: 185, searchPath: true },
      { id: 'l', char: 'l', isEnd: false, x: 150, y: 240 },
      { id: 'e', char: 'e', isEnd: true, x: 150, y: 295 },
      { id: 's', char: 's', isEnd: true, x: 260, y: 240, searchSuccess: true }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a', searchPath: true },
      { from: 'a', to: 'p1', label: 'p', searchPath: true },
      { from: 'p1', to: 'p2', label: 'p', searchPath: true },
      { from: 'p2', to: 'l', label: 'l' },
      { from: 'l', to: 'e', label: 'e' },
      { from: 'p2', to: 's', label: 's', searchPath: true }
    ],
    variables: { reachedNode: 'Node(s)', 'isEnd flag': 'true', verdict: 'TRUE (Exact word match)' },
    explain: 'search("apps"): Follows root -> a -> p -> p -> s. Path exists AND node \'s\' has isEnd = true! Both criteria satisfied, returns true.',
    intuition: 'Exact word lookup succeeds in deterministic O(L) time regardless of how many total words are stored.'
  },
  {
    title: '12. search("bat") -> Root Link Null -> Immediate O(1) Fast-Fail',
    phase: 'MISMATCH_FAST_FAIL',
    operation: 'search("bat")',
    activeChar: 'b',
    charIndex: 0,
    activeWord: 'bat',
    activeNodeId: 'root',
    result: 'search("bat") = FALSE ❌',
    treeNodes: [
      { id: 'root', char: 'ROOT', isEnd: false, x: 200, y: 35, mismatch: true },
      { id: 'a', char: 'a', isEnd: false, x: 200, y: 85 },
      { id: 'p1', char: 'p', isEnd: false, x: 200, y: 135 },
      { id: 'p2', char: 'p', isEnd: false, x: 200, y: 185 },
      { id: 'l', char: 'l', isEnd: false, x: 150, y: 240 },
      { id: 'e', char: 'e', isEnd: true, x: 150, y: 295 },
      { id: 's', char: 's', isEnd: true, x: 260, y: 240 }
    ],
    edges: [
      { from: 'root', to: 'a', label: 'a' },
      { from: 'a', to: 'p1', label: 'p' },
      { from: 'p1', to: 'p2', label: 'p' },
      { from: 'p2', to: 'l', label: 'l' },
      { from: 'l', to: 'e', label: 'e' },
      { from: 'p2', to: 's', label: 's' }
    ],
    variables: { checking: "root.links['b' - 'a']", linkValue: 'null', verdict: 'FALSE (Instant rejection on char 0)' },
    explain: 'search("bat"): At root, we inspect root.links[\'b\']. Since it is null, we do not even look at \'a\' or \'t\'. Instantly returns false in O(1)!',
    intuition: 'Tries never waste time checking remaining characters once a prefix misses.'
  }
];

export default function TrieImplementationAndOperationsVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-4 space-y-5">
      {/* Top Header & Operation HUD */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-3 flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--chalk-dim)]">Current Operation</span>
          <span className="text-sm font-mono font-bold text-cyan-300 mt-0.5">{step.operation}</span>
        </div>
        <div className="bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-3 flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--chalk-dim)]">Operation Verdict</span>
          <span className={`text-sm font-mono font-bold mt-0.5 ${
            step.result.includes('TRUE') ? 'text-emerald-400' :
            step.result.includes('FALSE') ? 'text-rose-400' : 'text-amber-300'
          }`}>
            {step.result}
          </span>
        </div>
        <div className="bg-[var(--board-raised)] border border-[var(--line)] rounded-xl p-3 flex flex-col items-center justify-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--chalk-dim)]">Time Complexity</span>
          <span className="text-sm font-mono font-bold text-purple-400 mt-0.5">O(Word Length L)</span>
        </div>
      </div>

      {/* Active Word & Character Tape */}
      {step.activeWord && (
        <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3 flex flex-col items-center gap-2">
          <span className="text-[11px] font-mono text-[var(--chalk-dim)] uppercase tracking-wider">
            Active Query / Word Stream: <span className="text-[var(--chalk)] font-bold">"{step.activeWord}"</span>
          </span>
          <div className="flex items-center gap-2">
            {step.activeWord.split('').map((ch, idx) => {
              const isCurrent = idx === step.charIndex;
              const isPassed = idx < step.charIndex;
              return (
                <div key={idx} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-base font-bold transition-all duration-300 ${
                      isCurrent
                        ? 'bg-amber-500/30 border-2 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/20 scale-110'
                        : isPassed
                        ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                        : 'bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-faint)]'
                    }`}
                  >
                    {ch}
                  </div>
                  <span className={`text-[10px] font-mono mt-1 ${isCurrent ? 'text-amber-400 font-bold' : 'text-[var(--chalk-faint)]'}`}>
                    idx {idx}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive SVG Trie Hierarchy */}
      <div className="w-full bg-[var(--board-raised)] border border-[var(--line)] rounded-2xl p-4 flex flex-col items-center shadow-2xl relative overflow-hidden">
        <div className="w-full flex items-center justify-between pb-2 border-b border-[var(--line)]/60 text-xs font-mono text-[var(--chalk-dim)]">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            TRIE PREFIX GRAPH (Dynamic Links)
          </span>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full border border-emerald-400 bg-emerald-500/30"></span>
              isEnd = true
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full border border-amber-400 bg-amber-500/30"></span>
              Active Pointer
            </span>
          </div>
        </div>

        <svg width="100%" height="340" viewBox="0 0 400 340" className="overflow-visible select-none my-2">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#4a5578" />
            </marker>
            <marker id="arrow-active" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
            </marker>
          </defs>

          {/* Edges */}
          {step.edges.map((e, idx) => {
            const fromNode = step.treeNodes.find(n => n.id === e.from);
            const toNode = step.treeNodes.find(n => n.id === e.to);
            if (!fromNode || !toNode) return null;

            const isEdgeHighlighted = e.highlighted || e.searchPath || e.isNew;

            return (
              <g key={idx}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isEdgeHighlighted ? '#38bdf8' : '#2e344e'}
                  strokeWidth={isEdgeHighlighted ? '3' : '2'}
                  strokeDasharray={e.isNew ? '4 2' : 'none'}
                  markerEnd={isEdgeHighlighted ? 'url(#arrow-active)' : 'url(#arrow)'}
                  className="transition-all duration-300"
                />
                {/* Edge Character Label */}
                <circle
                  cx={(fromNode.x + toNode.x) / 2 + (toNode.x > fromNode.x ? 10 : -10)}
                  cy={(fromNode.y + toNode.y) / 2}
                  r="9"
                  fill="#0b0d14"
                  stroke={isEdgeHighlighted ? '#38bdf8' : '#334155'}
                  strokeWidth="1"
                />
                <text
                  x={(fromNode.x + toNode.x) / 2 + (toNode.x > fromNode.x ? 10 : -10)}
                  y={(fromNode.y + toNode.y) / 2}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`font-mono text-[10px] font-bold ${isEdgeHighlighted ? 'fill-cyan-300' : 'fill-slate-400'}`}
                >
                  {e.label}
                </text>
              </g>
            );
          })}

          {/* Tree Nodes */}
          {step.treeNodes.map(node => {
            const isActive = node.id === step.activeNodeId;
            const isTerminal = node.isEnd;
            const isTarget = node.searchTarget || node.mismatch;
            const isSuccess = node.searchSuccess;

            return (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`} className="transition-transform duration-300">
                {/* Active glow pulse */}
                {isActive && (
                  <circle
                    r={node.char === 'ROOT' ? 26 : 22}
                    className="fill-none stroke-amber-400/50 stroke-2 animate-ping"
                  />
                )}

                {/* Node Circle */}
                <circle
                  r={node.char === 'ROOT' ? 22 : 17}
                  className={`transition-all duration-300 ${
                    isTarget
                      ? 'fill-rose-500/30 stroke-rose-400 stroke-2'
                      : isSuccess
                      ? 'fill-emerald-500/40 stroke-emerald-400 stroke-2'
                      : isActive
                      ? 'fill-amber-500/30 stroke-amber-400 stroke-2'
                      : isTerminal
                      ? 'fill-emerald-500/25 stroke-emerald-400/90 stroke-2'
                      : 'fill-[#161824] stroke-[#38405d] stroke-2'
                  }`}
                />

                {/* Node Text */}
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={`font-mono font-bold select-none ${
                    node.char === 'ROOT'
                      ? 'text-[9px] fill-purple-300'
                      : isTarget
                      ? 'text-xs fill-rose-300'
                      : isSuccess
                      ? 'text-xs fill-emerald-300'
                      : isActive
                      ? 'text-xs fill-amber-200'
                      : isTerminal
                      ? 'text-xs fill-emerald-300'
                      : 'text-xs fill-slate-300'
                  }`}
                >
                  {node.char}
                </text>

                {/* isEnd Flag Badge */}
                {isTerminal && (
                  <g transform="translate(22, -6)">
                    <rect
                      x="0"
                      y="-7"
                      width="34"
                      height="14"
                      rx="4"
                      fill="#064e3b"
                      stroke="#10b981"
                      strokeWidth="1"
                    />
                    <text
                      x="17"
                      y="1"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="font-mono text-[8px] font-bold fill-emerald-200"
                    >
                      END
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

      {/* Explanation & Intuition Callout */}
      <div className="w-full space-y-2">
        <div className="w-full bg-[var(--board-raised-2)] border border-[var(--line)] rounded-xl p-3.5 text-xs font-mono text-[#a5abbf] leading-relaxed">
          <span className="text-cyan-400 font-bold mr-1.5">Step Action:</span>
          {step.explain}
        </div>
        <div className="w-full bg-cyan-950/20 border border-cyan-500/25 rounded-xl p-3 text-xs font-mono text-cyan-300 flex items-start gap-2">
          <span className="font-bold text-cyan-400">💡 Trie Intuition:</span>
          <span>{step.intuition}</span>
        </div>
      </div>
    </div>
  );
}

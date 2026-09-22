import React from 'react';

export const meta = {
  title: 'Serialize and Deserialize Binary Tree',
  category: 'Binary Trees',
  difficulty: 'Hard',
  timeComplexity: 'O(N) for both serialize and deserialize',
  spaceComplexity: 'O(N) buffer & queue',
  description: 'Encodes a binary tree into a delimited string representation using BFS level-order traversal with `#` null markers, and reconstructs the identical tree back from the serialized string.'
};

export const solutions = {
  cpp: `// C++: Serialize and Deserialize Binary Tree using Level Order BFS
// Time Complexity: O(N) | Space Complexity: O(N)
#include <string>
#include <sstream>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Codec {
public:
    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        if (!root) return "";
        string s = "";
        queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            TreeNode* curr = q.front();
            q.pop();

            if (curr == nullptr) {
                s.append("#,");
            } else {
                s.append(to_string(curr->val) + ",");
                q.push(curr->left);
                q.push(curr->right);
            }
        }
        return s;
    }

    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data) {
        if (data.empty()) return nullptr;
        stringstream s(data);
        string str;
        getline(s, str, ',');

        TreeNode* root = new TreeNode(stoi(str));
        queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            TreeNode* node = q.front();
            q.pop();

            // Left Child
            getline(s, str, ',');
            if (str != "#") {
                TreeNode* leftNode = new TreeNode(stoi(str));
                node->left = leftNode;
                q.push(leftNode);
            }

            // Right Child
            getline(s, str, ',');
            if (str != "#") {
                TreeNode* rightNode = new TreeNode(stoi(str));
                node->right = rightNode;
                q.push(rightNode);
            }
        }
        return root;
    }
};`,
  java: `// Java: Serialize and Deserialize Binary Tree
import java.util.*;

public class Codec {
    public String serialize(TreeNode root) {
        if (root == null) return "";
        Queue<TreeNode> q = new LinkedList<>();
        StringBuilder res = new StringBuilder();
        q.add(root);

        while (!q.isEmpty()) {
            TreeNode node = q.poll();
            if (node == null) {
                res.append("#,");
            } else {
                res.append(node.val).append(",");
                q.add(node.left);
                q.add(node.right);
            }
        }
        return res.toString();
    }

    public TreeNode deserialize(String data) {
        if (data.isEmpty()) return null;
        Queue<TreeNode> q = new LinkedList<>();
        String[] values = data.split(",");

        TreeNode root = new TreeNode(Integer.parseInt(values[0]));
        q.add(root);

        for (int i = 1; i < values.length; i++) {
            TreeNode parent = q.poll();
            if (!values[i].equals("#")) {
                TreeNode left = new TreeNode(Integer.parseInt(values[i]));
                parent.left = left;
                q.add(left);
            }
            if (!values[++i].equals("#")) {
                TreeNode right = new TreeNode(Integer.parseInt(values[i]));
                parent.right = right;
                q.add(right);
            }
        }
        return root;
    }
}`,
  python: `# Python 3: Serialize and Deserialize Binary Tree
from collections import deque

class Codec:
    def serialize(self, root):
        if not root:
            return ""
        q = deque([root])
        res = []

        while q:
            node = q.popleft()
            if node:
                res.append(str(node.val))
                q.append(node.left)
                q.append(node.right)
            else:
                res.append("#")

        return ",".join(res)

    def deserialize(self, data):
        if not data:
            return None
        vals = data.split(",")
        root = TreeNode(int(vals[0]))
        q = deque([root])
        i = 1

        while q and i < len(vals):
            node = q.popleft()
            if vals[i] != "#":
                node.left = TreeNode(int(vals[i]))
                q.append(node.left)
            i += 1
            if i < len(vals) and vals[i] != "#":
                node.right = TreeNode(int(vals[i]))
                q.append(node.right)
            i += 1

        return root`,
  javascript: `// JavaScript: Serialize and Deserialize Binary Tree
class Codec {
    serialize(root) {
        if (!root) return '';
        const q = [root];
        const res = [];

        while (q.length > 0) {
            const node = q.shift();
            if (node) {
                res.push(node.val);
                q.push(node.left);
                q.push(node.right);
            } else {
                res.push('#');
            }
        }
        return res.join(',');
    }

    deserialize(data) {
        if (!data) return null;
        const vals = data.split(',');
        const root = { val: parseInt(vals[0]), left: null, right: null };
        const q = [root];
        let i = 1;

        while (q.length > 0 && i < vals.length) {
            const parent = q.shift();
            if (vals[i] !== '#') {
                parent.left = { val: parseInt(vals[i]), left: null, right: null };
                q.push(parent.left);
            }
            i++;
            if (i < vals.length && vals[i] !== '#') {
                parent.right = { val: parseInt(vals[i]), left: null, right: null };
                q.push(parent.right);
            }
            i++;
        }
        return root;
    }
}`
};

export const steps = [
  {
    title: '1. Serialize: Root 1 &rarr; String: "1,"',
    phase: 'SERIALIZE_ROOT',
    codeLine: 29,
    mode: 'Serialize',
    currToken: '1',
    stream: '1,',
    explain: 'Root node 1 visited in level order BFS. Value 1 appended to byte stream.'
  },
  {
    title: '2. Serialize Children: Left=2, Right=3 &rarr; "1,2,3,"',
    phase: 'SERIALIZE_CHILDREN',
    codeLine: 29,
    mode: 'Serialize',
    currToken: '2, 3',
    stream: '1,2,3,',
    explain: 'Nodes 2 and 3 enqueued and serialized.'
  },
  {
    title: '3. Serialize Level 2: 2.left=#, 2.right=#, 3.left=4, 3.right=5',
    phase: 'SERIALIZE_NULLS',
    codeLine: 26,
    mode: 'Serialize',
    currToken: '#, #, 4, 5',
    stream: '1,2,3,#,#,4,5,',
    explain: 'Null leaves written as "#". Nodes 4 and 5 appended.'
  },
  {
    title: '4. Final Serialized Stream: "1,2,3,#,#,4,5,#,#,#,#"',
    phase: 'SERIALIZE_FINAL',
    codeLine: 34,
    mode: 'Complete String',
    currToken: 'EOF',
    stream: '1,2,3,#,#,4,5,#,#,#,#',
    explain: 'All terminal null leaves recorded. Complete self-contained string representation ready for network transfer or storage.'
  },
  {
    title: '5. Deserialize: Read Stream & Reconstruct Identical Binary Tree',
    phase: 'DESERIALIZE',
    codeLine: 43,
    mode: 'Deserialize',
    currToken: 'Reconstructed',
    stream: '1,2,3,#,#,4,5,#,#,#,#',
    explain: 'Queue-based parser reads tokens in level order and reconstructs the identical tree graph in O(N) time!'
  }
];

export default function SerializeAndDeserializeBtVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-[var(--board-raised-2)] border border-[var(--line)] text-[var(--chalk-dim)]">
          Phase: <strong className="text-cyan-400">{step.mode}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Codec: <strong>BFS Level-Order Serialization</strong>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-[var(--board-raised)] border border-[var(--line)] shadow-2xl w-full">
        <div className="text-xs font-mono text-[var(--chalk-dim)] flex items-center justify-between w-full px-2">
          <span>Encoded Serialized Byte Stream</span>
          <span className="text-emerald-400 font-bold">O(N) Reversible</span>
        </div>

        {/* Serialized stream badge */}
        <div className="w-full p-4 rounded-xl bg-[#0f1016] border border-[var(--line)] flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-[#6c7292]">Stream String Buffer:</span>
          <span className="text-lg font-mono font-bold text-emerald-400 tracking-wider break-all bg-emerald-500/10 px-4 py-2 rounded-lg border border-emerald-500/20">
            &quot;{step.stream}&quot;
          </span>
        </div>

        <div className="text-xs font-mono text-[var(--chalk-dim)] bg-[var(--board-raised-2)] px-4 py-2 rounded-xl border border-[var(--line)] text-center w-full">
          Tokens separated by commas. &apos;#&apos; represents null pointer branches, guaranteeing unique deserialization.
        </div>
      </div>
    </div>
  );
}

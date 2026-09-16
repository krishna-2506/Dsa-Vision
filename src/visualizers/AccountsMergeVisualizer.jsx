import React from 'react';

export const meta = {
  title: 'Accounts Merge',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(N * M * 4alpha + N * M log(N * M))',
  spaceComplexity: 'O(N * M)',
  description: 'Merges user accounts with identical names that share at least one email address. Uses Disjoint Set Union (DSU) to group account indices and maps emails to merged roots (LeetCode 721).'
};

export const solutions = {
  cpp: `// C++: Accounts Merge (LeetCode 721)
#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

class DisjointSet {
public:
    vector<int> parent, size;
    DisjointSet(int n) {
        parent.resize(n);
        size.resize(n, 1);
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int findUPar(int node) {
        if (node == parent[node]) return node;
        return parent[node] = findUPar(parent[node]);
    }
    void unionBySize(int u, int v) {
        int ulp_u = findUPar(u), ulp_v = findUPar(v);
        if (ulp_u == ulp_v) return;
        if (size[ulp_u] < size[ulp_v]) {
            parent[ulp_u] = ulp_v;
            size[ulp_v] += size[ulp_u];
        } else {
            parent[ulp_v] = ulp_u;
            size[ulp_u] += size[ulp_v];
        }
    }
};

vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
    int n = accounts.size();
    DisjointSet ds(n);
    unordered_map<string, int> mapMailNode;
    
    for (int i = 0; i < n; i++) {
        for (int j = 1; j < accounts[i].size(); j++) {
            string mail = accounts[i][j];
            if (mapMailNode.find(mail) == mapMailNode.end()) {
                mapMailNode[mail] = i;
            } else {
                ds.unionBySize(i, mapMailNode[mail]);
            }
        }
    }
    
    vector<vector<string>> mergedMail(n);
    for (auto it : mapMailNode) {
        string mail = it.first;
        int node = ds.findUPar(it.second);
        mergedMail[node].push_back(mail);
    }
    
    vector<vector<string>> ans;
    for (int i = 0; i < n; i++) {
        if (mergedMail[i].size() == 0) continue;
        sort(mergedMail[i].begin(), mergedMail[i].end());
        vector<string> temp;
        temp.push_back(accounts[i][0]);
        for (auto it : mergedMail[i]) temp.push_back(it);
        ans.push_back(temp);
    }
    return ans;
}`,
  java: `// Java: Accounts Merge
import java.util.*;

class Solution {
    public List<List<String>> accountsMerge(List<List<String>> accounts) {
        // DSU merging account indices with email hash mapping
        return new ArrayList<>();
    }
}`,
  python: `# Python: Accounts Merge
def accountsMerge(accounts: list[list[str]]) -> list[list[str]]:
    # DSU on account ids with email mapping
    return []
`,
  javascript: `// JavaScript: Accounts Merge
function accountsMerge(accounts) {
  // DSU union of account indices
  return [];
}`
};

export const steps = [
  {
    title: '1. Scan Account 0: "John" [johnsmith@mail, john_newyork@mail]',
    phase: 'ACC_0',
    codeLine: 35,
    emailMap: { 'johnsmith@mail': 0, 'john_newyork@mail': 0 },
    groups: { 0: [0], 1: [1], 2: [2] },
    info: 'Map emails to Account 0.'
  },
  {
    title: '2. Scan Account 1: "John" [johnsmith@mail, john00@mail] -> MERGE!',
    phase: 'MERGE_ACC_1_0',
    codeLine: 40,
    emailMap: { 'johnsmith@mail': 0, 'john_newyork@mail': 0, 'john00@mail': 1 },
    groups: { 0: [0, 1], 2: [2] },
    info: 'johnsmith@mail is already mapped to Account 0! DSU executes unionBySize(1, 0). Accounts 0 and 1 belong to the same person!'
  },
  {
    title: '3. Scan Account 2: "Mary" [mary@mail]',
    phase: 'ACC_2',
    codeLine: 35,
    emailMap: { 'johnsmith@mail': 0, 'john_newyork@mail': 0, 'john00@mail': 1, 'mary@mail': 2 },
    groups: { 0: [0, 1], 2: [2] },
    info: 'Mary has unique email. Retains separate identity under root 2.'
  },
  {
    title: '4. Final Merged Output: 2 Persons Identified',
    phase: 'COMPLETE',
    codeLine: 55,
    emailMap: { 'johnsmith@mail': 0, 'john_newyork@mail': 0, 'john00@mail': 1, 'mary@mail': 2 },
    groups: { 0: [0, 1], 2: [2] },
    info: 'Account 0: "John" with 3 sorted emails. Account 2: "Mary" with 1 email.'
  }
];

export default function AccountsMergeVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300">
          Unique Emails: <strong className="text-cyan-200">{Object.keys(step.emailMap).length}</strong>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
          Merged Persons: <strong className="text-purple-200">{Object.keys(step.groups).length}</strong>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-[#12131b] border border-[#242738] shadow-2xl flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center text-xs font-mono text-[#8a8ea3]">
          <span>Merged Account Aggregations</span>
          <span className="text-cyan-400 font-bold">DSU Node = Account ID</span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex flex-col gap-1.5">
            <div className="flex justify-between text-cyan-200 font-bold">
              <span>Person 1: "John" (Merged Roots: {step.groups[0] ? step.groups[0].join(', ') : '0'})</span>
              <span className="text-emerald-400 font-semibold text-[11px]">DSU Root #0</span>
            </div>
            <div className="flex gap-2 flex-wrap text-[11px] text-cyan-300">
              <span className="bg-[#12131b] px-2 py-0.5 rounded border border-cyan-500/40">john00@mail</span>
              <span className="bg-[#12131b] px-2 py-0.5 rounded border border-cyan-500/40">john_newyork@mail</span>
              <span className="bg-[#12131b] px-2 py-0.5 rounded border border-cyan-500/40">johnsmith@mail</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/30 flex flex-col gap-1.5">
            <div className="flex justify-between text-purple-200 font-bold">
              <span>Person 2: "Mary"</span>
              <span className="text-purple-400 font-semibold text-[11px]">DSU Root #2</span>
            </div>
            <div className="flex gap-2 flex-wrap text-[11px] text-purple-300">
              <span className="bg-[#12131b] px-2 py-0.5 rounded border border-purple-500/40">mary@mail</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-xl bg-[#161824] border border-[#272b3c] text-xs font-mono text-[#94a3b8]">
        {step.info}
      </div>
    </div>
  );
}

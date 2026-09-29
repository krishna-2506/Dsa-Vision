export const rendererType = 'array-scan';

export const meta = {
  title: 'Accounts Merge',
  category: 'Step 15: Graphs [Concepts & Problems]',
  difficulty: 'Medium',
  timeComplexity: 'O(N * M * 4alpha + N * M log(N * M))',
  spaceComplexity: 'O(N * M)',
  description: 'Merges user accounts with identical names that share at least one email address. Uses Disjoint Set Union (DSU) to group account indices and maps emails to merged roots (LeetCode 721).'
};

export const ideaMap = {
  title: 'DSU Account Grouping & Email Merging Strategy',
  nodes: [
    {
      id: 'step1',
      label: 'Email-to-Index Mapping',
      detail: 'Iterate through accounts; map each email to the first account ID that contains it in a hash map.'
    },
    {
      id: 'step2',
      label: 'DSU Union on Common Emails',
      detail: 'If an email already exists in the map, execute ds.unionBySize(currentAccount, mappedAccount).'
    },
    {
      id: 'step3',
      label: 'Representative Root Aggregation',
      detail: 'Group all unique emails under the ultimate parent root index of their owning accounts: ds.findUPar(id).'
    },
    {
      id: 'step4',
      label: 'Lexicographical Sorting & Formatting',
      detail: 'Sort each merged email list alphabetically and prepend the account owner\'s name.'
    }
  ]
};

export const solutions = {
  cpp: `// C++: Accounts Merge (LeetCode 721)
// Time: O(N * M * 4alpha + N * M log(N * M)) | Space: O(N * M)
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
        for (auto& it : mergedMail[i]) {
            temp.push_back(it);
        }
        ans.push_back(temp);
    }
    return ans;
}`,
  java: `// Java: Accounts Merge (LeetCode 721)
// Time: O(N * M * 4alpha + N * M log(N * M)) | Space: O(N * M)
import java.util.*;

class DisjointSet {
    int[] parent, size;
    DisjointSet(int n) {
        parent = new int[n];
        size = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            size[i] = 1;
        }
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }
    void unionBySize(int u, int v) {
        int rootU = find(u), rootV = find(v);
        if (rootU == rootV) return;
        if (size[rootU] < size[rootV]) {
            parent[rootU] = rootV;
            size[rootV] += size[rootU];
        } else {
            parent[rootV] = rootU;
            size[rootU] += size[rootV];
        }
    }
}

class Solution {
    public List<List<String>> accountsMerge(List<List<String>> accounts) {
        int n = accounts.size();
        DisjointSet ds = new DisjointSet(n);
        Map<String, Integer> mapMailNode = new HashMap<>();

        for (int i = 0; i < n; i++) {
            for (int j = 1; j < accounts.get(i).size(); j++) {
                String mail = accounts.get(i).get(j);
                if (!mapMailNode.containsKey(mail)) {
                    mapMailNode.put(mail, i);
                } else {
                    ds.unionBySize(i, mapMailNode.get(mail));
                }
            }
        }

        List<List<String>> mergedMail = new ArrayList<>();
        for (int i = 0; i < n; i++) mergedMail.add(new ArrayList<>());
        for (Map.Entry<String, Integer> it : mapMailNode.entrySet()) {
            String mail = it.getKey();
            int node = ds.find(it.getValue());
            mergedMail.get(node).add(mail);
        }

        List<List<String>> ans = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (mergedMail.get(i).size() == 0) continue;
            Collections.sort(mergedMail.get(i));
            List<String> temp = new ArrayList<>();
            temp.add(accounts.get(i).get(0));
            temp.addAll(mergedMail.get(i));
            ans.add(temp);
        }
        return ans;
    }
}`,
  python: `# Python: Accounts Merge (LeetCode 721)
# Time: O(N * M * 4alpha + N * M log(N * M)) | Space: O(N * M)
from collections import defaultdict

class DisjointSet:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n
    def find(self, u):
        if self.parent[u] == u:
            return u
        self.parent[u] = self.find(self.parent[u])
        return self.parent[u]
    def union(self, u, v):
        ru, rv = self.find(u), self.find(v)
        if ru == rv:
            return
        if self.size[ru] < self.size[rv]:
            self.parent[ru] = rv
            self.size[rv] += self.size[ru]
        else:
            self.parent[rv] = ru
            self.size[ru] += self.size[rv]

def accountsMerge(accounts: list[list[str]]) -> list[list[str]]:
    n = len(accounts)
    ds = DisjointSet(n)
    email_to_id = {}
    
    for i, acc in enumerate(accounts):
        for email in acc[1:]:
            if email not in email_to_id:
                email_to_id[email] = i
            else:
                ds.union(i, email_to_id[email])
                
    groups = defaultdict(list)
    for email, acc_id in email_to_id.items():
        root = ds.find(acc_id)
        groups[root].append(email)
        
    res = []
    for root, emails in groups.items():
        res.append([accounts[root][0]] + sorted(emails))
    return res`,
  javascript: `// JavaScript: Accounts Merge (LeetCode 721)
// Time: O(N * M * 4alpha + N * M log(N * M)) | Space: O(N * M)
class DisjointSet {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = new Array(n).fill(1);
  }
  find(u) {
    if (this.parent[u] === u) return u;
    return this.parent[u] = this.find(this.parent[u]);
  }
  union(u, v) {
    const ru = this.find(u), rv = this.find(v);
    if (ru === rv) return;
    if (this.size[ru] < this.size[rv]) {
      this.parent[ru] = rv;
      this.size[rv] += this.size[ru];
    } else {
      this.parent[rv] = ru;
      this.size[ru] += this.size[rv];
    }
  }
}

function accountsMerge(accounts) {
  const n = accounts.length;
  const ds = new DisjointSet(n);
  const emailMap = new Map();
  
  for (let i = 0; i < n; i++) {
    for (let j = 1; j < accounts[i].length; j++) {
      const email = accounts[i][j];
      if (!emailMap.has(email)) {
        emailMap.set(email, i);
      } else {
        ds.union(i, emailMap.get(email));
      }
    }
  }
  
  const groups = new Map();
  for (const [email, id] of emailMap.entries()) {
    const root = ds.find(id);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(email);
  }
  
  const result = [];
  for (const [root, emails] of groups.entries()) {
    emails.sort();
    result.push([accounts[root][0], ...emails]);
  }
  return result;
}`
};

export const steps = [
  {
    phase: 'ACC_0',
    title: '1. Scan Account 0: "John" [johnsmith@mail, john_newyork@mail]',
    arr: ['Acc 0: John', 'Acc 1: John', 'Acc 2: Mary'],
    auxiliaryTrack: ['Root #0 (2 emails)', 'Disjoint Root #1', 'Disjoint Root #2'],
    auxiliaryLabel: 'DSU Component Membership',
    activeIndices: [0],
    customCard: {
      title: 'First Account Ingestion',
      rows: [
        { label: 'Scanned Account', value: 'Account 0 ("John")', accent: true },
        { label: 'Registered Emails', value: 'johnsmith@mail -> 0, john_newyork@mail -> 0' },
        { label: 'DSU Parent Map', value: 'parent[0] = 0' },
        { label: 'Unique Components', value: '3 independent roots' }
      ]
    },
    variables: {
      scannedAccount: 'Account 0',
      uniqueEmails: 2,
      mergedPersons: 3
    },
    metrics: {
      accountsProcessed: '1 / 3',
      uniqueEmails: 2,
      components: 3
    },
    explain: 'Map emails to Account 0. Both emails are new, so they point directly to index 0.',
    intuition: 'Each account begins as an independent person node until a shared email establishes identity.'
  },
  {
    phase: 'MERGE_ACC_1_0',
    title: '2. Scan Account 1: "John" [johnsmith@mail, john00@mail] -> MERGE!',
    arr: ['Acc 0: John', 'Acc 1: John (Merged)', 'Acc 2: Mary'],
    auxiliaryTrack: ['Root #0 (3 emails)', 'Merged into Root #0', 'Disjoint Root #2'],
    auxiliaryLabel: 'DSU Component Membership',
    activeIndices: [0, 1],
    customCard: {
      title: 'Common Email Discovered',
      rows: [
        { label: 'Shared Email', value: 'johnsmith@mail already mapped to Account 0!', accent: true },
        { label: 'DSU Action', value: 'ds.unionBySize(1, 0) -> parent[1] = 0' },
        { label: 'Merged Identity', value: 'Accounts 0 and 1 are the SAME person' },
        { label: 'New Email Added', value: 'john00@mail grouped under Root 0' }
      ]
    },
    variables: {
      scannedAccount: 'Account 1',
      uniqueEmails: 3,
      mergedPersons: 2
    },
    metrics: {
      accountsProcessed: '2 / 3',
      uniqueEmails: 3,
      components: 2
    },
    explain: 'johnsmith@mail was already claimed by Account 0! DSU executes unionBySize(1, 0). Accounts 0 and 1 belong to the same person!',
    intuition: 'A single overlapping email securely proves transitivity of identity across multiple profile records.'
  },
  {
    phase: 'ACC_2',
    title: '3. Scan Account 2: "Mary" [mary@mail]',
    arr: ['Acc 0: John', 'Acc 1: John', 'Acc 2: Mary (Root #2)'],
    auxiliaryTrack: ['Root #0 (John)', 'Merged into #0', 'Root #2 (Mary)'],
    auxiliaryLabel: 'DSU Component Membership',
    activeIndices: [2],
    customCard: {
      title: 'Disjoint Account Ingestion',
      rows: [
        { label: 'Scanned Account', value: 'Account 2 ("Mary")', accent: true },
        { label: 'Registered Email', value: 'mary@mail -> mapped to 2' },
        { label: 'Collision Check', value: 'No overlap with existing emails' },
        { label: 'DSU Component', value: 'Independent root #2 retained' }
      ]
    },
    variables: {
      scannedAccount: 'Account 2',
      uniqueEmails: 4,
      mergedPersons: 2
    },
    metrics: {
      accountsProcessed: '3 / 3',
      uniqueEmails: 4,
      components: 2
    },
    explain: 'Mary has a unique email. Retains separate identity under root 2.',
    intuition: 'Disjoint user clusters remain isolated when no shared credentials bridge them.'
  },
  {
    phase: 'COMPLETE',
    title: '4. Final Merged Output: 2 Persons Identified',
    arr: ['Acc 0: John', 'Acc 1: John', 'Acc 2: Mary'],
    auxiliaryTrack: ['John: [john00@mail, john_newyork@mail, johnsmith@mail]', 'Merged', 'Mary: [mary@mail]'],
    auxiliaryLabel: 'Final Consolidated Accounts',
    activeIndices: [0, 2],
    customCard: {
      title: 'Accounts Merge Finalized',
      rows: [
        { label: 'Person 1 ("John")', value: '3 sorted emails [john00, john_newyork, johnsmith]', accent: true },
        { label: 'Person 2 ("Mary")', value: '1 email [mary@mail]' },
        { label: 'Total Merged Persons', value: '2 distinct individuals' },
        { label: 'Status', value: 'Success' }
      ]
    },
    variables: {
      scannedAccount: 'Completed',
      uniqueEmails: 4,
      mergedPersons: 2
    },
    metrics: {
      accountsProcessed: '3 / 3',
      uniqueEmails: 4,
      components: 2
    },
    explain: 'Account 0: "John" with 3 sorted emails. Account 2: "Mary" with 1 email. All duplicates consolidated.',
    intuition: 'DSU achieves optimal near-linear merging time without building expensive explicit graphs.'
  }
];

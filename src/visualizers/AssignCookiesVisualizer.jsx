// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'Assign Cookies',
  category: 'Greedy Algorithms',
  difficulty: 'Easy',
  timeComplexity: 'O(N log N + M log M)',
  spaceComplexity: 'O(1) Auxiliary (after in-place sorting)',
  description: 'Greedily satisfies children by sorting greed factors g and cookie sizes s, assigning the smallest sufficient cookie to the least greedy child using two pointers.'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'Greedy Smallest-Sufficient Match Invariant',
  nodes: [
    { id: 'root', label: 'Greedy Cookie Matching', children: ['dual-sort', 'monotone-alignment', 'smallest-sufficient-rule', 'insufficient-discard', 'complexity'] },
    { id: 'dual-sort', label: '1. Dual Array Sorting', detail: 'Sort children by greed g and cookies by size s in ascending order to enable monotonic two-pointer pairing.' },
    { id: 'monotone-alignment', label: '2. Two Pointers Synchronization', detail: 'Pointer child tracks the current least greedy child; pointer cookie tracks the smallest available cookie.' },
    { id: 'smallest-sufficient-rule', label: '3. Smallest Sufficient Assignment', detail: 'If s[cookie] >= g[child], satisfy the child and advance both pointers; never waste a larger cookie on a child satisfied by a smaller one.' },
    { id: 'insufficient-discard', label: '4. Insufficient Cookie Discard', detail: 'If s[cookie] < g[child], the cookie cannot satisfy this child or any subsequent child; discard it by advancing cookie++.' },
    { id: 'complexity', label: '5. Optimal Resource Bounds', detail: 'O(N log N + M log M) sorting time followed by O(N + M) two-pointer pass with strictly O(1) extra space.' }
  ]
};

export const solutions = {
  cpp: `// C++ Assign Cookies (Greedy Two Pointers)
// Time Complexity: O(N log N + M log M) | Space Complexity: O(1)
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int findContentChildren(vector<int>& g, vector<int>& s) {
        sort(g.begin(), g.end());
        sort(s.begin(), s.end());

        int child = 0;
        int cookie = 0;

        while (child < (int)g.size() && cookie < (int)s.size()) {
            if (s[cookie] >= g[child]) {
                child++; // Child satisfied
            }
            cookie++; // Move to next cookie
        }

        return child; // Count of satisfied children
    }
};`,
  python: `# Python 3 Assign Cookies (Greedy Two Pointers)
# Time Complexity: O(N log N + M log M) | Space Complexity: O(1)
class Solution:
    def findContentChildren(self, g: list[int], s: list[int]) -> int:
        g.sort()
        s.sort()

        child = 0
        cookie = 0

        while child < len(g) and cookie < len(s):
            if s[cookie] >= g[child]:
                child += 1
            cookie += 1

        return child`,
  java: `// Java Assign Cookies (Greedy Two Pointers)
// Time Complexity: O(N log N + M log M) | Space Complexity: O(1)
import java.util.Arrays;

class Solution {
    public int findContentChildren(int[] g, int[] s) {
        Arrays.sort(g);
        Arrays.sort(s);

        int child = 0;
        int cookie = 0;

        while (child < g.length && cookie < s.length) {
            if (s[cookie] >= g[child]) {
                child++;
            }
            cookie++;
        }

        return child;
    }
}`,
  javascript: `// JavaScript Assign Cookies (Greedy Two Pointers)
// Time Complexity: O(N log N + M log M) | Space Complexity: O(1)
var findContentChildren = function(g, s) {
    g.sort((a, b) => a - b);
    s.sort((a, b) => a - b);

    let child = 0;
    let cookie = 0;

    while (child < g.length && cookie < s.length) {
        if (s[cookie] >= g[child]) {
            child++;
        }
        cookie++;
    }

    return child;
};`
};

export const steps = [
  {
    title: '1. Sort Greed Factors & Cookie Sizes in Ascending Order',
    phase: 'INITIAL',
    codeLine: 12,
    tracks: [
      {
        label: 'Sorted Children Greed g: [1, 2, 3]',
        items: [
          { val: 'g[0]=1', status: 'default' },
          { val: 'g[1]=2', status: 'default' },
          { val: 'g[2]=3', status: 'default' }
        ]
      },
      {
        label: 'Sorted Cookie Sizes s: [1, 1, 3]',
        items: [
          { val: 's[0]=1', status: 'default' },
          { val: 's[1]=1', status: 'default' },
          { val: 's[2]=3', status: 'default' }
        ]
      }
    ],
    activeI: 0,
    activePrev: 0,
    metrics: [
      { label: 'Children Count', value: '3' },
      { label: 'Cookie Count', value: '3' },
      { label: 'Satisfied', value: '0' },
      { label: 'Phase', value: 'Greedy Align' }
    ],
    formula: 'sort(g); sort(s); child = 0; cookie = 0;',
    action: 'Sort greed array g and cookie array s. Initialize pointers child = 0 and cookie = 0.',
    explain: 'Sorting both arrays allows us to greedily test the smallest available cookie against the least greedy unsatisfied child.',
    intuition: 'Matching lowest greed with smallest viable cookie leaves larger cookies for children with higher greed.'
  },
  {
    title: '2. Compare Child 0 (Greed 1) with Cookie 0 (Size 1)',
    phase: 'EVALUATE',
    codeLine: 18,
    tracks: [
      {
        label: 'Children Greed g',
        items: [
          { val: 'g[0]=1', status: 'current' },
          { val: 'g[1]=2', status: 'default' },
          { val: 'g[2]=3', status: 'default' }
        ]
      },
      {
        label: 'Cookie Sizes s',
        items: [
          { val: 's[0]=1', status: 'current' },
          { val: 's[1]=1', status: 'default' },
          { val: 's[2]=3', status: 'default' }
        ]
      }
    ],
    activeI: 0,
    activePrev: 0,
    metrics: [
      { label: 'Current Child', value: 'g[0] = 1' },
      { label: 'Current Cookie', value: 's[0] = 1' },
      { label: 'Condition', value: '1 >= 1 (Satisfied)', highlight: true },
      { label: 'Satisfied', value: '0' }
    ],
    formula: 'if (s[0] >= g[0]) child++; // 1 >= 1 => true',
    action: 'Compare s[0] with g[0]. Since 1 >= 1, this cookie meets child 0\'s greed.',
    explain: 'Child 0 requires at least size 1. Cookie 0 is size 1. Exact match.',
    intuition: 'Do not waste a larger cookie on a child whose greed is already met by size 1.',
    customCard: {
      title: 'Greedy Match Evaluation',
      rows: [
        { label: 'Greed', value: '1 (Child 0)' },
        { label: 'Cookie', value: '1 (Cookie 0)', accent: true },
        { label: 'Result', value: 'Sufficient: Assign Cookie 0' }
      ]
    }
  },
  {
    title: '3. Assign Cookie 0 to Child 0 -> Child 0 Content!',
    phase: 'ASSIGN',
    codeLine: 19,
    tracks: [
      {
        label: 'Children Greed g',
        items: [
          { val: 'g[0]=1', status: 'match' },
          { val: 'g[1]=2', status: 'current' },
          { val: 'g[2]=3', status: 'default' }
        ]
      },
      {
        label: 'Cookie Sizes s',
        items: [
          { val: 's[0]=1', status: 'match' },
          { val: 's[1]=1', status: 'current' },
          { val: 's[2]=3', status: 'default' }
        ]
      }
    ],
    activeI: 1,
    activePrev: 1,
    metrics: [
      { label: 'Satisfied Count', value: '1 (Child 0)', highlight: true },
      { label: 'Next Child', value: 'g[1] = 2' },
      { label: 'Next Cookie', value: 's[1] = 1' }
    ],
    formula: 'child++; cookie++; // child: 0->1, cookie: 0->1',
    action: 'Increment child pointer to 1 and cookie pointer to 1. 1 child content.',
    explain: 'Child 0 is content. We now look for a cookie that can satisfy child 1 (greed = 2).',
    intuition: 'Both child and cookie have been matched and consumed.'
  },
  {
    title: '4. Compare Child 1 (Greed 2) with Cookie 1 (Size 1)',
    phase: 'EVALUATE',
    codeLine: 18,
    tracks: [
      {
        label: 'Children Greed g',
        items: [
          { val: 'g[0]=1', status: 'match' },
          { val: 'g[1]=2', status: 'current' },
          { val: 'g[2]=3', status: 'default' }
        ]
      },
      {
        label: 'Cookie Sizes s',
        items: [
          { val: 's[0]=1', status: 'visited' },
          { val: 's[1]=1', status: 'current' },
          { val: 's[2]=3', status: 'default' }
        ]
      }
    ],
    activeI: 1,
    activePrev: 1,
    metrics: [
      { label: 'Current Child', value: 'g[1] = 2' },
      { label: 'Current Cookie', value: 's[1] = 1' },
      { label: 'Condition', value: '1 < 2 (Insufficient!)', highlight: true },
      { label: 'Satisfied', value: '1' }
    ],
    formula: 'if (s[1] >= g[1]) // 1 >= 2 is FALSE',
    action: 'Compare s[1] = 1 with g[1] = 2. Cookie size 1 is strictly less than required greed 2.',
    explain: 'Cookie 1 is too small for Child 1. Since subsequent children have greed >= 2, this cookie cannot satisfy any remaining child.',
    intuition: 'Any cookie too small for the current least greedy child is useless for all subsequent greedier children.',
    customCard: {
      title: 'Greedy Insufficiency Analysis',
      rows: [
        { label: 'Child Greed', value: '2' },
        { label: 'Cookie Size', value: '1 (Too small)', accent: true },
        { label: 'Action', value: 'Discard Cookie 1, Keep Child 1' }
      ]
    }
  },
  {
    title: '5. Discard Cookie 1: Advance Cookie Pointer to 2',
    phase: 'DISCARD',
    codeLine: 21,
    tracks: [
      {
        label: 'Children Greed g',
        items: [
          { val: 'g[0]=1', status: 'match' },
          { val: 'g[1]=2', status: 'current' },
          { val: 'g[2]=3', status: 'default' }
        ]
      },
      {
        label: 'Cookie Sizes s',
        items: [
          { val: 's[0]=1', status: 'visited' },
          { val: 's[1]=1', status: 'dim' },
          { val: 's[2]=3', status: 'current' }
        ]
      }
    ],
    activeI: 1,
    activePrev: 2,
    metrics: [
      { label: 'Discarded', value: 's[1] = 1' },
      { label: 'Child Waiting', value: 'g[1] = 2' },
      { label: 'Next Candidate', value: 's[2] = 3' }
    ],
    formula: 'cookie++; // cookie: 1 -> 2; child remains 1',
    action: 'Advance cookie pointer to 2. Child pointer remains at 1 awaiting a larger cookie.',
    explain: 'Cookie 1 is permanently skipped. Pointer now inspects Cookie 2 (size 3).',
    intuition: 'Only advance the cookie pointer when the cookie is insufficient.'
  },
  {
    title: '6. Compare Child 1 (Greed 2) with Cookie 2 (Size 3)',
    phase: 'EVALUATE',
    codeLine: 18,
    tracks: [
      {
        label: 'Children Greed g',
        items: [
          { val: 'g[0]=1', status: 'match' },
          { val: 'g[1]=2', status: 'current' },
          { val: 'g[2]=3', status: 'default' }
        ]
      },
      {
        label: 'Cookie Sizes s',
        items: [
          { val: 's[0]=1', status: 'visited' },
          { val: 's[1]=1', status: 'dim' },
          { val: 's[2]=3', status: 'current' }
        ]
      }
    ],
    activeI: 1,
    activePrev: 2,
    metrics: [
      { label: 'Current Child', value: 'g[1] = 2' },
      { label: 'Current Cookie', value: 's[2] = 3' },
      { label: 'Condition', value: '3 >= 2 (Satisfied)', highlight: true },
      { label: 'Satisfied', value: '1' }
    ],
    formula: 'if (s[2] >= g[1]) // 3 >= 2 is TRUE',
    action: 'Cookie 2 has size 3 >= greed 2. Match confirmed!',
    explain: 'Cookie 2 is large enough to satisfy Child 1.',
    intuition: 'The smallest remaining cookie that satisfies Child 1 is chosen.'
  },
  {
    title: '7. Assign Cookie 2 to Child 1 -> Content Children = 2',
    phase: 'ASSIGN',
    codeLine: 19,
    tracks: [
      {
        label: 'Children Greed g',
        items: [
          { val: 'g[0]=1', status: 'match' },
          { val: 'g[1]=2', status: 'match' },
          { val: 'g[2]=3', status: 'default' }
        ]
      },
      {
        label: 'Cookie Sizes s',
        items: [
          { val: 's[0]=1', status: 'visited' },
          { val: 's[1]=1', status: 'dim' },
          { val: 's[2]=3', status: 'match' }
        ]
      }
    ],
    activeI: 2,
    activePrev: 3,
    metrics: [
      { label: 'Satisfied Count', value: '2', highlight: true },
      { label: 'Child Pointer', value: '2' },
      { label: 'Cookie Pointer', value: '3 (End of cookies)' }
    ],
    formula: 'child++; cookie++; // child: 1->2, cookie: 2->3',
    action: 'Assign Cookie 2 to Child 1. child advances to 2, cookie advances to 3 (exhausted).',
    explain: 'Two children (Child 0 and Child 1) have been satisfied. Cookie array is now fully consumed.',
    intuition: 'Loop terminates because no more cookies remain.'
  },
  {
    title: '8. Cookie Inventory Empty: Return Satisfied Count = 2',
    phase: 'COMPLETED',
    codeLine: 24,
    tracks: [
      {
        label: 'Children Greed g (2 of 3 Satisfied)',
        items: [
          { val: 'g[0]=1', status: 'match' },
          { val: 'g[1]=2', status: 'match' },
          { val: 'g[2]=3', status: 'dim' }
        ]
      },
      {
        label: 'Cookie Sizes s (All 3 Cookies Processed)',
        items: [
          { val: 's[0]=1', status: 'match' },
          { val: 's[1]=1', status: 'dim' },
          { val: 's[2]=3', status: 'match' }
        ]
      }
    ],
    activeI: null,
    activePrev: null,
    metrics: [
      { label: 'Content Children', value: '2', highlight: true },
      { label: 'Total Children', value: '3' },
      { label: 'Time Complexity', value: 'O(N log N + M log M)' },
      { label: 'Space Complexity', value: 'O(1) auxiliary' }
    ],
    formula: 'return child; // 2',
    action: 'Cookie loop terminates. Return child count = 2.',
    explain: 'Maximum 2 children can be content with the given cookies. Child 2 cannot be satisfied due to lack of remaining cookies.',
    intuition: 'Greedy sorting guarantees the globally optimal number of satisfied children.',
    customCard: {
      title: 'Assignment Outcome',
      rows: [
        { label: 'Content Children', value: '2', accent: true },
        { label: 'Unsatisfied Children', value: '1 (Child 2, greed 3)' },
        { label: 'Complexity', value: 'O(N log N + M log M) time, O(1) space', accent: true }
      ]
    }
  }
];

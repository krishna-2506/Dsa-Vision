// DATA-ONLY — rendered by DualArrayRenderer via rendererType

export const meta = {
  title: 'Union of Two Sorted Arrays',
  category: 'Arrays & Two Pointers',
  difficulty: 'Easy',
  timeComplexity: 'O(N + M) Linear Time',
  spaceComplexity: 'O(N + M) for Union Result',
  description: 'Finds the sorted union of two sorted arrays in linear O(N + M) time using two converging pointers, automatically filtering out duplicates.'
};

export const rendererType = 'dual-array';

export const ideaMap = {
  title: 'Union of Two Sorted Arrays',
  nodes: [
    { id: 'root', label: 'Two-Pointer Merge', children: ['sorted-precondition', 'pointer-comparison', 'duplicate-suppression', 'drain-remaining'] },
    { id: 'sorted-precondition', label: '1. Sorted Precondition', detail: 'Because both arrays are already sorted, we can use two pointers i and j to merge them monotonically.' },
    { id: 'pointer-comparison', label: '2. Pointer Comparison', detail: 'Compare arr1[i] and arr2[j]. Advance whichever pointer points to the smaller or equal value.' },
    { id: 'duplicate-suppression', label: '3. Duplicate Suppression', detail: 'Only push to union array if union is empty or element != union.back(). This eliminates duplicates.' },
    { id: 'drain-remaining', label: '4. Drain Leftovers', detail: 'Once one array is exhausted, drain the remaining elements from the other array with deduplication.' }
  ]
};

export const solutions = {
  cpp: `// C++ Optimal Two-Pointer Union of Two Sorted Arrays
// Time Complexity: O(N + M) | Space Complexity: O(N + M)
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> findUnion(int arr1[], int arr2[], int n, int m) {
        int i = 0, j = 0;
        vector<int> unionArr;

        while (i < n && j < m) {
            if (arr1[i] <= arr2[j]) {
                if (unionArr.empty() || unionArr.back() != arr1[i]) {
                    unionArr.push_back(arr1[i]);
                }
                i++;
            } else {
                if (unionArr.empty() || unionArr.back() != arr2[j]) {
                    unionArr.push_back(arr2[j]);
                }
                j++;
            }
        }

        while (i < n) {
            if (unionArr.empty() || unionArr.back() != arr1[i]) {
                unionArr.push_back(arr1[i]);
            }
            i++;
        }

        while (j < m) {
            if (unionArr.empty() || unionArr.back() != arr2[j]) {
                unionArr.push_back(arr2[j]);
            }
            j++;
        }

        return unionArr;
    }
};`,
  python: `# Python 3 Optimal Two-Pointer Union
# Time Complexity: O(N + M) | Space Complexity: O(N + M)
class Solution:
    def findUnion(self, a: list[int], b: list[int]) -> list[int]:
        n, m = len(a), len(b)
        i, j = 0, 0
        union_arr = []

        while i < n and j < m:
            if a[i] <= b[j]:
                if not union_arr or union_arr[-1] != a[i]:
                    union_arr.append(a[i])
                i += 1
            else:
                if not union_arr or union_arr[-1] != b[j]:
                    union_arr.append(b[j])
                j += 1

        while i < n:
            if not union_arr or union_arr[-1] != a[i]:
                union_arr.append(a[i])
            i += 1

        while j < m:
            if not union_arr or union_arr[-1] != b[j]:
                union_arr.append(b[j])
            j += 1

        return union_arr`,
  java: `// Java Optimal Two-Pointer Union
// Time Complexity: O(N + M) | Space Complexity: O(N + M)
import java.util.ArrayList;

class Solution {
    public static ArrayList<Integer> findUnion(int arr1[], int arr2[], int n, int m) {
        int i = 0, j = 0;
        ArrayList<Integer> unionArr = new ArrayList<>();

        while (i < n && j < m) {
            if (arr1[i] <= arr2[j]) {
                if (unionArr.size() == 0 || unionArr.get(unionArr.size() - 1) != arr1[i]) {
                    unionArr.add(arr1[i]);
                }
                i++;
            } else {
                if (unionArr.size() == 0 || unionArr.get(unionArr.size() - 1) != arr2[j]) {
                    unionArr.add(arr2[j]);
                }
                j++;
            }
        }

        while (i < n) {
            if (unionArr.size() == 0 || unionArr.get(unionArr.size() - 1) != arr1[i]) {
                unionArr.add(arr1[i]);
            }
            i++;
        }

        while (j < m) {
            if (unionArr.size() == 0 || unionArr.get(unionArr.size() - 1) != arr2[j]) {
                unionArr.add(arr2[j]);
            }
            j++;
        }

        return unionArr;
    }
}`,
  javascript: `// JavaScript Optimal Two-Pointer Union
// Time Complexity: O(N + M) | Space Complexity: O(N + M)
var findUnion = function(arr1, arr2) {
    const n = arr1.length, m = arr2.length;
    let i = 0, j = 0;
    const unionArr = [];

    while (i < n && j < m) {
        if (arr1[i] <= arr2[j]) {
            if (unionArr.length === 0 || unionArr[unionArr.length - 1] !== arr1[i]) {
                unionArr.push(arr1[i]);
            }
            i++;
        } else {
            if (unionArr.length === 0 || unionArr[unionArr.length - 1] !== arr2[j]) {
                unionArr.push(arr2[j]);
            }
            j++;
        }
    }

    while (i < n) {
        if (unionArr.length === 0 || unionArr[unionArr.length - 1] !== arr1[i]) {
            unionArr.push(arr1[i]);
        }
        i++;
    }

    while (j < m) {
        if (unionArr.length === 0 || unionArr[unionArr.length - 1] !== arr2[j]) {
            unionArr.push(arr2[j]);
        }
        j++;
    }

    return unionArr;
};`
};

export const steps = [
  {
    title: '1. Problem Setup & Invariant Definition',
    phase: 'INITIAL',
    tracks: [
      { label: 'arr1 (size 5)', items: [1, 2, 3, 4, 5] },
      { label: 'arr2 (size 6)', items: [2, 3, 4, 4, 5, 6] }
    ],
    activeI: null,
    activePrev: null,
    trackTitle: 'Two-Pointer Synchronization',
    metrics: [
      { label: 'Pointer i (arr1)', value: '0' },
      { label: 'Pointer j (arr2)', value: '0' },
      { label: 'Union Output', value: '[]' }
    ],
    customCard: {
      title: 'Two-Pointer Rules',
      rows: [
        { label: 'Rule 1', value: 'If arr1[i] <= arr2[j], push arr1[i] (if not duplicate) and i++' },
        { label: 'Rule 2', value: 'If arr2[j] < arr1[i], push arr2[j] (if not duplicate) and j++' },
        { label: 'Deduplication', value: 'Only push if union.empty() || union.back() != val', accent: true }
      ]
    },
    formula: 'if (arr1[i] <= arr2[j]) { add(arr1[i]); i++; } else { add(arr2[j]); j++; }',
    action: 'Initialize pointer i at arr1[0] and pointer j at arr2[0]',
    explain: 'We want the set union of two sorted arrays without duplicates. Instead of dumping everything into a hash set (which costs extra memory and sorting), two pointers i and j perform an in-order merge in linear O(N + M) time.',
    intuition: 'Leveraging sorted order allows linear single-pass merging with zero hash table overhead.'
  },
  {
    title: '2. Compare arr1[0]=1 vs arr2[0]=2 -> Add 1',
    phase: 'COMPUTE',
    tracks: [
      { label: 'arr1', items: [1, 2, 3, 4, 5] },
      { label: 'arr2', items: [2, 3, 4, 4, 5, 6] }
    ],
    activeI: 0,
    activePrev: 0,
    trackTitle: 'Step 1: Adding 1 to Union',
    metrics: [
      { label: 'arr1[0]', value: '1' },
      { label: 'arr2[0]', value: '2' },
      { label: 'Comparison', value: '1 <= 2' },
      { label: 'Union Array', value: '[1]' }
    ],
    customCard: {
      title: 'Deduplication Check',
      rows: [
        { label: 'Candidate', value: 'arr1[0] = 1' },
        { label: 'Last in Union', value: 'None (Empty)' },
        { label: 'Action', value: 'Push 1 to union; i advances to 1', accent: true }
      ]
    },
    formula: 'arr1[0] (1) <= arr2[0] (2) -> union.push(1); i = 1;',
    action: '1 is smaller than 2; append 1 to union and advance pointer i',
    explain: 'Comparing arr1[0] = 1 and arr2[0] = 2. Since 1 <= 2, 1 is the smallest overall element. Append 1 to union. Pointer i increments to 1.',
    intuition: 'Smaller element is added first to maintain sorted order.'
  },
  {
    title: '3. Compare arr1[1]=2 vs arr2[0]=2 -> Add 2',
    phase: 'COMPUTE',
    tracks: [
      { label: 'arr1', items: [1, 2, 3, 4, 5] },
      { label: 'arr2', items: [2, 3, 4, 4, 5, 6] }
    ],
    activeI: 1,
    activePrev: 0,
    trackTitle: 'Step 2: Adding 2 to Union',
    metrics: [
      { label: 'arr1[1]', value: '2' },
      { label: 'arr2[0]', value: '2' },
      { label: 'Comparison', value: '2 <= 2 (Equal)' },
      { label: 'Union Array', value: '[1, 2]' }
    ],
    customCard: {
      title: 'Deduplication Check',
      rows: [
        { label: 'Candidate', value: 'arr1[1] = 2' },
        { label: 'Last in Union', value: '1 (!= 2)' },
        { label: 'Action', value: 'Push 2 to union; i advances to 2', accent: true }
      ]
    },
    formula: 'arr1[1] (2) <= arr2[0] (2) -> union.push(2); i = 2;',
    action: 'Both point to 2; append 2 from arr1 and advance pointer i',
    explain: 'arr1[1] = 2 and arr2[0] = 2. Since arr1[1] <= arr2[0], we append 2. Because union.back() was 1, 2 is not a duplicate. Pointer i increments to 2.',
    intuition: 'When elements match, pushing either one and advancing its pointer handles duplicates naturally.'
  },
  {
    title: '4. Compare arr1[2]=3 vs arr2[0]=2 -> Duplicate 2 Skipped',
    phase: 'COMPUTE',
    tracks: [
      { label: 'arr1', items: [1, 2, 3, 4, 5] },
      { label: 'arr2', items: [2, 3, 4, 4, 5, 6] }
    ],
    activeI: 2,
    activePrev: 0,
    trackTitle: 'Step 3: Duplicate Suppression in arr2',
    metrics: [
      { label: 'arr1[2]', value: '3' },
      { label: 'arr2[0]', value: '2' },
      { label: 'Comparison', value: '2 < 3' },
      { label: 'Union Array', value: '[1, 2] (unchanged)' }
    ],
    customCard: {
      title: 'Duplicate Detected',
      rows: [
        { label: 'Candidate', value: 'arr2[0] = 2' },
        { label: 'Last in Union', value: '2 (Matches candidate!)' },
        { label: 'Action', value: 'Skip push to avoid duplicate; j advances to 1', accent: true }
      ]
    },
    formula: 'union.back() == arr2[0] (2 == 2) -> Do not push; j = 1;',
    action: 'arr2[0] = 2 matches the last element in union; skip pushing and advance j',
    explain: 'arr2[0] = 2 is smaller than arr1[2] = 3. However, union.back() is already 2! To prevent duplicates, we skip adding it and simply advance j to 1.',
    intuition: 'Checking union.back() guarantees every value appears exactly once.'
  },
  {
    title: '5. Compare arr1[2]=3 vs arr2[1]=3 -> Add 3',
    phase: 'COMPUTE',
    tracks: [
      { label: 'arr1', items: [1, 2, 3, 4, 5] },
      { label: 'arr2', items: [2, 3, 4, 4, 5, 6] }
    ],
    activeI: 2,
    activePrev: 1,
    trackTitle: 'Step 4: Adding 3 to Union',
    metrics: [
      { label: 'arr1[2]', value: '3' },
      { label: 'arr2[1]', value: '3' },
      { label: 'Comparison', value: '3 <= 3' },
      { label: 'Union Array', value: '[1, 2, 3]' }
    ],
    customCard: {
      title: 'Deduplication Check',
      rows: [
        { label: 'Candidate', value: 'arr1[2] = 3' },
        { label: 'Last in Union', value: '2 (!= 3)' },
        { label: 'Action', value: 'Push 3 to union; i advances to 3', accent: true }
      ]
    },
    formula: 'union.push(3); i = 3;',
    action: 'Append 3 to union; next duplicate 3 in arr2 will be skipped on subsequent check',
    explain: 'Both point to 3. Append 3 to union (since last is 2). Pointer i advances to 3. On the next step, arr2[1] = 3 will be recognized as a duplicate of 3 and skipped.',
    intuition: 'Sorted arrays allow duplicate checks with only the single last element.'
  },
  {
    title: '6. Compare arr1[3]=4 vs arr2[2]=4 -> Add 4',
    phase: 'COMPUTE',
    tracks: [
      { label: 'arr1', items: [1, 2, 3, 4, 5] },
      { label: 'arr2', items: [2, 3, 4, 4, 5, 6] }
    ],
    activeI: 3,
    activePrev: 2,
    trackTitle: 'Step 5: Adding 4 and Skipping Duplicates',
    metrics: [
      { label: 'arr1[3]', value: '4' },
      { label: 'arr2[2]', value: '4' },
      { label: 'Union Array', value: '[1, 2, 3, 4]' }
    ],
    customCard: {
      title: 'Handling Multiple Duplicates',
      rows: [
        { label: 'arr2 contains', value: 'Two consecutive 4s at indices 2 and 3' },
        { label: 'Push Action', value: 'Push 4 once from arr1' },
        { label: 'Skip Action', value: 'Both 4s in arr2 are skipped cleanly', accent: true }
      ]
    },
    formula: 'union.push(4); subsequent 4s skipped',
    action: 'Add 4 to union; consecutive identical elements in arr2 are suppressed',
    explain: '4 is appended to union. In arr2, elements at index 2 and index 3 are both 4. Each is compared against union.back() = 4 and skipped without adding duplicates.',
    intuition: 'Consecutive duplicates inside the same array are handled automatically.'
  },
  {
    title: '7. Compare arr1[4]=5 vs arr2[4]=5 -> Add 5',
    phase: 'COMPUTE',
    tracks: [
      { label: 'arr1', items: [1, 2, 3, 4, 5] },
      { label: 'arr2', items: [2, 3, 4, 4, 5, 6] }
    ],
    activeI: 4,
    activePrev: 4,
    trackTitle: 'Step 6: Adding 5 and Exhausting arr1',
    metrics: [
      { label: 'arr1[4]', value: '5' },
      { label: 'arr2[4]', value: '5' },
      { label: 'arr1 Status', value: 'i = 5 (Exhausted)' },
      { label: 'Union Array', value: '[1, 2, 3, 4, 5]' }
    ],
    customCard: {
      title: 'arr1 Exhaustion',
      rows: [
        { label: 'Push', value: 'Push 5 to union' },
        { label: 'Pointer i', value: 'Advances to 5 (i == n)' },
        { label: 'Next Phase', value: 'Drain remaining elements of arr2', accent: true }
      ]
    },
    formula: 'union.push(5); i reaches n; main loop ends',
    action: 'Add 5 to union; arr1 is now completely traversed',
    explain: 'Append 5 to union. Pointer i increments to 5 (n), terminating the main while loop. Pointer j is at index 5 in arr2.',
    intuition: 'When one array ends, we simply drain the remaining sorted tail of the other.'
  },
  {
    title: '8. Drain Tail of arr2: Add 6',
    phase: 'COMPUTE',
    tracks: [
      { label: 'arr1 (Done)', items: [1, 2, 3, 4, 5] },
      { label: 'arr2 (Draining)', items: [2, 3, 4, 4, 5, 6] }
    ],
    activeI: null,
    activePrev: 5,
    trackTitle: 'Step 7: Draining arr2',
    metrics: [
      { label: 'Remaining Element', value: 'arr2[5] = 6' },
      { label: 'Last in Union', value: '5 (!= 6)' },
      { label: 'Final Push', value: 'Add 6' }
    ],
    customCard: {
      title: 'Drain Loop',
      rows: [
        { label: 'while (j < m)', value: 'arr2[5] = 6' },
        { label: 'Condition', value: 'union.back() (5) != 6 -> Push' },
        { label: 'Final Union Array', value: '[1, 2, 3, 4, 5, 6]', accent: true }
      ]
    },
    formula: 'while (j < m) { if (union.back() != arr2[j]) union.push(arr2[j]); j++; }',
    action: 'Drain remaining element 6 from arr2 into union',
    explain: 'Only arr2[5] = 6 remains. Since 6 != 5, we append 6. Pointer j increments to 6 (m). Both arrays are completely processed.',
    intuition: 'Leftover tail elements are already sorted and easily appended.'
  },
  {
    title: '9. Union Complete: [1, 2, 3, 4, 5, 6]',
    phase: 'COMPLETED',
    tracks: [
      { label: 'arr1', items: [1, 2, 3, 4, 5] },
      { label: 'arr2', items: [2, 3, 4, 4, 5, 6] }
    ],
    activeI: null,
    activePrev: null,
    trackTitle: 'Final Union Result',
    metrics: [
      { label: 'Final Union', value: '[1, 2, 3, 4, 5, 6]', highlight: true },
      { label: 'Time Complexity', value: 'O(N + M)' },
      { label: 'Space Complexity', value: 'O(N + M)' },
      { label: 'Duplicate Count', value: '5 duplicates filtered' }
    ],
    customCard: {
      title: 'Summary',
      rows: [
        { label: 'Total Input Items', value: '5 (arr1) + 6 (arr2) = 11' },
        { label: 'Unique Elements', value: '6 unique values' },
        { label: 'Result', value: '[1, 2, 3, 4, 5, 6]', accent: true }
      ]
    },
    formula: 'return unionArr -> [1, 2, 3, 4, 5, 6]',
    action: 'Return final sorted union array [1, 2, 3, 4, 5, 6]',
    explain: 'Two-pointer union completes in linear O(N + M) time and O(N + M) space. All duplicates were filtered in-flight without auxiliary hash set overhead.',
    intuition: 'Two pointers merge sorted collections in optimal linear time.'
  }
];

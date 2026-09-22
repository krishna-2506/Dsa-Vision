// DATA-ONLY — rendered by ArrayScanRenderer via rendererType

export const meta = {
  title: 'Book Allocation Problem',
  category: 'Binary Search on Answers',
  difficulty: 'Hard',
  timeComplexity: 'O(N * log(sum - max))',
  spaceComplexity: 'O(1) Auxiliary',
  description: 'Allocates contiguous books to M students such that the maximum pages allocated to any single student is minimized. Uses binary search over the domain [max(books) ... sum(books)].'
};

export const rendererType = 'array-scan';

export const ideaMap = {
  title: 'Book Allocation Binary Search Invariant',
  nodes: [
    { id: 'root', label: 'Book Allocation Strategy', children: ['impossible-check', 'search-domain', 'greedy-allocation', 'min-max-optimality'] },
    { id: 'impossible-check', label: '1. Student-Book Constraint', detail: 'If M > N (more students than books), it is impossible for each student to get at least one book; return -1' },
    { id: 'search-domain', label: '2. Bounded Search Domain', detail: 'Minimum possible pages is max(arr) (largest book must be read); maximum is sum(arr) (one student reads all)' },
    { id: 'greedy-allocation', label: '3. Contiguous Greedy Packing', detail: 'Iterate through books: if current student load + arr[i] <= pages, add to student; else allocate to next student' },
    { id: 'min-max-optimality', label: '4. Isomorphic Triad', detail: 'Book Allocation, Split Array Largest Sum, and Painter Partition share identical mathematical formulations' }
  ]
};

export const solutions = {
  cpp: `// C++ Book Allocation Problem using Binary Search
// Time Complexity: O(N * log(sum - max)) | Space Complexity: O(1)
#include <vector>
#include <numeric>
#include <algorithm>
using namespace std;

class Solution {
private:
    int countStudents(const vector<int>& arr, int maxPages) {
        int students = 1;
        long long pagesStudent = 0;

        for (int p : arr) {
            if (pagesStudent + p <= maxPages) {
                pagesStudent += p;
            } else {
                students++;
                pagesStudent = p; // Assign book to next student
            }
        }
        return students;
    }

public:
    int findPages(vector<int>& arr, int n, int m) {
        if (m > n) return -1; // Impossible

        int low = *max_element(arr.begin(), arr.end());
        int high = accumulate(arr.begin(), arr.end(), 0);
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int students = countStudents(arr, mid);

            if (students <= m) {
                ans = mid;      // Max pages works, try smaller
                high = mid - 1;
            } else {
                low = mid + 1;  // Need higher page limit per student
            }
        }
        return ans;
    }
};`,
  python: `# Python 3 Book Allocation Problem using Binary Search
# Time Complexity: O(N * log(sum - max)) | Space Complexity: O(1)
class Solution:
    def findPages(self, arr: list[int], n: int, m: int) -> int:
        if m > n:
            return -1

        def count_students(max_pages: int) -> int:
            students = 1
            pages = 0
            for p in arr:
                if pages + p <= max_pages:
                    pages += p
                else:
                    students += 1
                    pages = p
            return students

        low = max(arr)
        high = sum(arr)
        ans = high

        while low <= high:
            mid = (low + high) // 2
            if count_students(mid) <= m:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1

        return ans`,
  java: `// Java Book Allocation Problem using Binary Search
// Time Complexity: O(N * log(sum - max)) | Space Complexity: O(1)
import java.util.Arrays;

class Solution {
    private int countStudents(int[] arr, int maxPages) {
        int students = 1;
        long pages = 0;
        for (int p : arr) {
            if (pages + p <= maxPages) {
                pages += p;
            } else {
                students++;
                pages = p;
            }
        }
        return students;
    }

    public int findPages(int[] arr, int n, int m) {
        if (m > n) return -1;

        int low = Arrays.stream(arr).max().getAsInt();
        int high = Arrays.stream(arr).sum();
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (countStudents(arr, mid) <= m) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
}`,
  javascript: `// JavaScript Book Allocation Problem using Binary Search
// Time Complexity: O(N * log(sum - max)) | Space Complexity: O(1)
var findPages = function(arr, n, m) {
    if (m > n) return -1;

    let low = Math.max(...arr);
    let high = arr.reduce((a, b) => a + b, 0);
    let ans = high;

    const countStudents = (maxPages) => {
        let students = 1;
        let pages = 0;
        for (const p of arr) {
            if (pages + p <= maxPages) {
                pages += p;
            } else {
                students++;
                pages = p;
            }
        }
        return students;
    };

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (countStudents(mid) <= m) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
};`
};

export const steps = [
  {
    title: '1. Problem Setup: books = [25, 46, 28, 49, 24], M = 4 Students',
    phase: 'SETUP',
    track: {
      label: 'Contiguous Books Array (Pages)',
      items: [25, 46, 28, 49, 24]
    },
    auxiliaryTrack: {
      label: 'Max Pages Search Domain [49 ... 172]',
      items: [49, 63, 71, 79, 100, 110, 140, 172]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 7,
    metrics: [
      { label: 'Books Count N', value: '5 books' },
      { label: 'Students Count M', value: '4 students' },
      { label: 'Min Pages low', value: '49 (Max book)' },
      { label: 'Max Pages high', value: '172 (Sum of all)' }
    ],
    variables: { m: 4, n: 5, low: 49, high: 172, ans: 172, sumPages: 172 },
    formula: 'Search Space = [max(arr) .. sum(arr)] = [49 .. 172]',
    action: 'Verify M <= N (4 <= 5); initialize binary search domain for max page barrier [49 .. 172]',
    explain: 'Each student must receive a contiguous segment of books. At least one student must read the largest book (49 pages), so low = 49. If one student read all books, high = 172. We binary search to minimize the maximum pages allocated.',
    intuition: 'Contiguous subsegment partitioning mapped directly to binary search on answer.'
  },
  {
    title: '2. Pass 1: Test maxPages mid = 110 -> Simulate Student Allocation',
    phase: 'EVALUATE_PAGES',
    track: {
      label: 'Contiguous Allocation at Max 110 Pages',
      items: [
        { value: 'S1: 25+46+28 (99)', status: 'match' },
        { value: 'S2: 49+24 (73)', status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'Student Loads at Max 110 Pages',
      items: [
        { value: 'Student 1: 99 pages', status: 'match' },
        { value: 'Student 2: 73 pages', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 1,
    metrics: [
      { label: 'Testing Max Pages', value: '110 pages', highlight: true },
      { label: 'Students Needed', value: '2 students', highlight: true },
      { label: 'Available Students M', value: '4 students' },
      { label: 'Feasibility', value: '2 <= 4 (FEASIBLE)' }
    ],
    variables: { maxPages: 110, studentsNeeded: 2, m: 4, feasible: true },
    formula: 'S1: 25+46+28=99 <= 110 | S2: 49+24=73 <= 110 ==> 2 students <= 4',
    action: 'Allocate books with max 110 pages: only 2 students needed (well within M = 4)',
    explain: 'With max 110 pages: Student 1 reads books [25, 46, 28] = 99 pages. Student 2 reads [49, 24] = 73 pages. Since 2 <= 4 students, 110 is feasible!',
    intuition: '110 is a very generous allowance; we can pack with much tighter student limits.'
  },
  {
    title: '3. Pass 1 Decision: 2 <= 4 (Feasible!) -> Record ans = 110, Search [49 ... 109]',
    phase: 'FEASIBLE_CANDIDATE',
    track: {
      label: 'Contiguous Books Array',
      items: [25, 46, 28, 49, 24]
    },
    auxiliaryTrack: {
      label: 'Max Pages Domain Timeline',
      items: [
        49, 63, 71, 79, 100,
        { value: 110, status: 'match' },
        { value: 140, status: 'discarded' },
        { value: 172, status: 'discarded' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Recorded ans', value: '110 pages', highlight: true },
      { label: 'Discarded Range', value: '[110 ... 172]' },
      { label: 'New Search Domain', value: '[49 ... 109]' },
      { label: 'high updated to', value: 'mid - 1 = 109' }
    ],
    variables: { low: 49, high: 109, ans: 110, action: 'high = mid - 1 = 109' },
    formula: 'countStudents(110) <= 4 ==> ans = 110, high = mid - 1 = 109',
    action: 'Save ans = 110 and explore smaller max pages [49..109]',
    explain: 'Because 110 pages requires only 2 students, any barrier > 110 is larger than necessary. We record ans = 110 and decrement high to 109.',
    intuition: 'Greedily test tighter page limits.'
  },
  {
    title: '4. Pass 2: Test maxPages mid = 79 -> Simulate Student Allocation',
    phase: 'EVALUATE_PAGES',
    track: {
      label: 'Contiguous Allocation at Max 79 Pages',
      items: [
        { value: 'S1: 25+46 (71)', status: 'match' },
        { value: 'S2: 28+49 (77)', status: 'match' },
        { value: 'S3: 24 (24)', status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'Student Loads at Max 79 Pages',
      items: [
        { value: 'S1: 71 pages', status: 'match' },
        { value: 'S2: 77 pages', status: 'match' },
        { value: 'S3: 24 pages', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 2,
    metrics: [
      { label: 'Testing Max Pages', value: '79 pages', highlight: true },
      { label: 'Students Needed', value: '3 students', highlight: true },
      { label: 'Available Students M', value: '4 students' },
      { label: 'Feasibility', value: '3 <= 4 (FEASIBLE)' }
    ],
    variables: { maxPages: 79, studentsNeeded: 3, m: 4, feasible: true },
    formula: 'S1 (71), S2 (77), S3 (24) ==> 3 students <= 4',
    action: 'Allocate books with max 79 pages: 3 students needed <= 4',
    explain: 'At max 79: Student 1 gets [25, 46] = 71; Student 2 gets [28, 49] = 77; Student 3 gets [24] = 24. Since 3 <= 4, 79 is feasible! ans updates to 79, high becomes 78.',
    intuition: 'Max pages 79 fits within 4 students.'
  },
  {
    title: '5. Pass 3: Test maxPages mid = 63 -> Students Needed = 5 > 4 (Too Low!)',
    phase: 'CAPACITY_TOO_LOW',
    track: {
      label: 'Contiguous Allocation at Max 63 Pages',
      items: [
        { value: 'S1: 25 (25)', status: 'current' },
        { value: 'S2: 46 (46)', status: 'current' },
        { value: 'S3: 28 (28)', status: 'current' },
        { value: 'S4: 49 (49)', status: 'current' },
        { value: 'S5: 24 (24)', status: 'discarded' }
      ]
    },
    auxiliaryTrack: {
      label: 'Student Loads at Max 63 Pages',
      items: [
        { value: 'S1: 25', status: 'current' },
        { value: 'S2: 46', status: 'current' },
        { value: 'S3: 28', status: 'current' },
        { value: 'S4: 49', status: 'current' },
        { value: 'S5: 24 (Exceeds M=4!)', status: 'discarded' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 4,
    metrics: [
      { label: 'Testing Max Pages', value: '63 pages', highlight: true },
      { label: 'Students Needed', value: '5 students', highlight: true },
      { label: 'Available Students M', value: '4 students' },
      { label: 'Comparison', value: '5 > 4 (CAPACITY TOO TIGHT)' }
    ],
    variables: { maxPages: 63, studentsNeeded: 5, m: 4, feasible: false, action: 'low = mid + 1 = 64' },
    formula: 'countStudents(63) = 5 > 4 ==> Capacity too small! low = 64',
    action: 'At max 63 pages, 5 students are required, exceeding M = 4; advance low to 64',
    explain: 'At max 63 pages, almost every book must be given to an individual student, requiring 5 students. But only 4 students are available! We discard [49..63] and advance low to 64.',
    intuition: 'Each student cannot be restricted to 63 pages; limit must be increased.'
  },
  {
    title: '6. Pass 4: Test maxPages mid = 71 -> Exactly 4 Students Needed (OPTIMAL FIT)',
    phase: 'EVALUATE_PAGES',
    track: {
      label: 'Contiguous Allocation at Max 71 Pages',
      items: [
        { value: 'S1: 25+46 (71)', status: 'match' },
        { value: 'S2: 28 (28)', status: 'match' },
        { value: 'S3: 49 (49)', status: 'match' },
        { value: 'S4: 24 (24)', status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'Student Loads at Max 71 Pages',
      items: [
        { value: 'Student 1: 71 pages (Max)', status: 'match' },
        { value: 'Student 2: 28 pages', status: 'match' },
        { value: 'Student 3: 49 pages', status: 'match' },
        { value: 'Student 4: 24 pages', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Testing Max Pages', value: '71 pages', highlight: true },
      { label: 'Students Needed', value: '4 students', highlight: true },
      { label: 'Available Students M', value: '4 students' },
      { label: 'Status', value: '4 <= 4 (PERFECT MATCH)' }
    ],
    variables: { maxPages: 71, studentsNeeded: 4, m: 4, feasible: true },
    formula: 'S1 (71), S2 (28), S3 (49), S4 (24) ==> Exactly 4 students',
    action: 'Simulate allocation at max 71 pages: all 4 students receive contiguous books',
    explain: 'At max 71 pages: Student 1 gets [25, 46] = 71; Student 2 gets [28]; Student 3 gets [49]; Student 4 gets [24]. Exactly 4 students are used! Since 4 <= 4, 71 is feasible.',
    intuition: 'Every student has at most 71 pages, perfectly fitting 4 students.'
  },
  {
    title: '7. Pass 4 Decision: Update ans = 71 -> Search Interval Inverts',
    phase: 'TERMINATION',
    track: {
      label: 'Contiguous Books Array',
      items: [25, 46, 28, 49, 24]
    },
    auxiliaryTrack: {
      label: 'Max Pages Domain Timeline',
      items: [
        { value: 49, status: 'discarded' },
        { value: 63, status: 'discarded' },
        { value: 71, status: 'match' },
        { value: 79, status: 'discarded' },
        { value: 100, status: 'discarded' },
        { value: 110, status: 'discarded' },
        { value: 140, status: 'discarded' },
        { value: 172, status: 'discarded' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 2,
    windowEnd: 1,
    metrics: [
      { label: 'Final ans', value: '71 pages', highlight: true },
      { label: 'low Pointer', value: '71' },
      { label: 'high Pointer', value: '70' },
      { label: 'Loop Status', value: 'TERMINATED' }
    ],
    variables: { low: 71, high: 70, ans: 71, loopTerminated: true },
    formula: 'countStudents(71) <= 4 ==> ans = 71, high = 70 < low (71) ==> Loop Halts',
    action: 'Update ans = 71; high decrements to 70; search terminates',
    explain: '71 pages is feasible. We update ans = 71 and set high = 70. Any barrier <= 70 requires 5 students. Now low (71) > high (70). The search halts with 71 as the minimum maximum pages.',
    intuition: 'Boundary locked at 71.'
  },
  {
    title: '8. Complexity & Final Result: Minimum Maximum Pages = 71',
    phase: 'COMPLETED',
    track: {
      label: 'Optimal Contiguous Allocation (Max 71 Pages)',
      items: [
        { value: 'Student 1: [25, 46]', status: 'match' },
        { value: 'Student 2: [28]', status: 'match' },
        { value: 'Student 3: [49]', status: 'match' },
        { value: 'Student 4: [24]', status: 'match' }
      ]
    },
    auxiliaryTrack: {
      label: 'Pages Allocated: [71, 28, 49, 24] (Maximum = 71)',
      items: [
        { value: '71 pages', status: 'match' },
        { value: '28 pages', status: 'match' },
        { value: '49 pages', status: 'match' },
        { value: '24 pages', status: 'match' }
      ]
    },
    activeI: null,
    activeJ: null,
    windowStart: 0,
    windowEnd: 3,
    metrics: [
      { label: 'Min-Max Pages', value: '71 pages', highlight: true },
      { label: 'Student Allocations', value: '4 students' },
      { label: 'Time Complexity', value: 'O(N * log(sum - max))', highlight: true },
      { label: 'Space Complexity', value: 'O(1) Auxiliary', highlight: true }
    ],
    variables: { result: 71, studentLoads: '[71, 28, 49, 24]', timeComplexity: 'O(N * log(sum - max))' },
    formula: 'Result = 71 pages | Time = O(N * log(172 - 49)) = 5 * 7 = 35 operations',
    action: 'Algorithm concludes; return minimum maximum pages 71 with zero extra memory',
    explain: 'The minimum possible maximum pages allocated to any of the 4 students is 71. This exact same binary search template solves Painter Partition and Split Array Largest Sum identically.',
    intuition: 'The core partition algorithm unifies multiple hard algorithmic problems.'
  }
];

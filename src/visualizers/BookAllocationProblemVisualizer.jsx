import React from 'react';

export const meta = {
  title: 'Book Allocation Problem',
  category: 'Binary Search on Answers',
  difficulty: 'Hard',
  timeComplexity: 'O(N * log(sum - max))',
  spaceComplexity: 'O(1)',
  description: 'Allocate contiguous books to M students such that the maximum pages allocated to any student is minimized. Binary search over range [max(books) ... sum(books)].'
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
    int countStudents(const vector<int>& arr, int pages) {
        int students = 1;
        long long pagesStudent = 0;
        for (int p : arr) {
            if (pagesStudent + p <= pages) {
                pagesStudent += p;
            } else {
                students++;
                pagesStudent = p;
            }
        }
        return students;
    }

public:
    int findPages(vector<int>& arr, int n, int m) {
        if (m > n) return -1; // impossible
        int low = *max_element(arr.begin(), arr.end());
        int high = accumulate(arr.begin(), arr.end(), 0);
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int students = countStudents(arr, mid);
            if (students <= m) {
                ans = mid;
                high = mid - 1; // Try smaller max pages
            } else {
                low = mid + 1;  // Need higher capacity per student
            }
        }
        return ans;
    }
};`,
  python: `# Python 3 Book Allocation Problem using Binary Search
class Solution:
    def findPages(self, arr: list[int], n: int, m: int) -> int:
        if m > n:
            return -1
        
        low = max(arr)
        high = sum(arr)
        ans = high
        
        def count_students(pages: int) -> int:
            students = 1
            curr_pages = 0
            for p in arr:
                if curr_pages + p <= pages:
                    curr_pages += p
                else:
                    students += 1
                    curr_pages = p
            return students

        while low <= high:
            mid = (low + high) // 2
            students = count_students(mid)
            if students <= m:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
                
        return ans`,
  java: `// Java Book Allocation Problem using Binary Search
import java.util.Arrays;

class Solution {
    private static int countStudents(int[] arr, int pages) {
        int students = 1;
        long pagesStudent = 0;
        for (int p : arr) {
            if (pagesStudent + p <= pages) {
                pagesStudent += p;
            } else {
                students++;
                pagesStudent = p;
            }
        }
        return students;
    }

    public static int findPages(int[] arr, int n, int m) {
        if (m > n) return -1;
        int low = Arrays.stream(arr).max().getAsInt();
        int high = Arrays.stream(arr).sum();
        int ans = high;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            int students = countStudents(arr, mid);
            if (students <= m) {
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
function findPages(arr, n, m) {
    if (m > n) return -1;
    let low = Math.max(...arr);
    let high = arr.reduce((acc, cur) => acc + cur, 0);
    let ans = high;

    function countStudents(pages) {
        let students = 1;
        let pagesStudent = 0;
        for (const p of arr) {
            if (pagesStudent + p <= pages) {
                pagesStudent += p;
            } else {
                students++;
                pagesStudent = p;
            }
        }
        return students;
    }

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const students = countStudents(mid);
        if (students <= m) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}`
};

export const steps = [
  {
    title: '1. Books: [25, 46, 28, 49, 24], Students M = 4',
    phase: 'INITIAL',
    codeLine: 25,
    books: [25, 46, 28, 49, 24],
    m: 4,
    low: 49,
    high: 172,
    mid: null,
    studentsCount: null,
    ans: 172,
    variables: { low: 'max(arr) = 49', high: 'sum(arr) = 172', m: 4 },
    explain: 'Each student must read contiguous books. No student can read less than max book (49). Sum of all pages is 172. Search range is [49 ... 172].',
    intuition: 'If pages per student is too small, we will need more than M students. It is monotonic.'
  },
  {
    title: '2. Try Mid = 110: Students Needed = 2 ≤ 4 -> Feasible! ans = 110, high = 109',
    phase: 'TEST_MID',
    codeLine: 31,
    books: [25, 46, 28, 49, 24],
    m: 4,
    low: 49,
    high: 109,
    mid: 110,
    studentsCount: 2,
    ans: 110,
    variables: { mid: 110, studentsNeeded: 2, limitM: 4, action: 'ans = 110, high = 109' },
    explain: 'With max limit 110: Student 1 gets [25, 46, 28] = 99; Student 2 gets [49, 24] = 73. Only 2 students required (<= 4). Try minimizing max pages: high = 109.',
    intuition: 'Capacity is generously large, so fewer students are used.'
  },
  {
    title: '3. Try Mid = 79: Students Needed = 3 ≤ 4 -> Feasible! ans = 79, high = 78',
    phase: 'TEST_MID',
    codeLine: 31,
    books: [25, 46, 28, 49, 24],
    m: 4,
    low: 49,
    high: 78,
    mid: 79,
    studentsCount: 3,
    ans: 79,
    variables: { mid: 79, studentsNeeded: 3, limitM: 4, action: 'ans = 79, high = 78' },
    explain: 'Limit 79: S1 gets [25, 46]=71; S2 gets [28, 49]=77; S3 gets [24]=24. Total 3 students needed <= 4. Valid allocation! Update ans = 79, search [49...78].',
    intuition: 'Still feasible with 3 students.'
  },
  {
    title: '4. Try Mid = 63: Students Needed = 5 > 4 -> Infeasible! low = 64',
    phase: 'TOO_SMALL',
    codeLine: 34,
    books: [25, 46, 28, 49, 24],
    m: 4,
    low: 64,
    high: 78,
    mid: 63,
    studentsCount: 5,
    ans: 79,
    variables: { mid: 63, studentsNeeded: 5, limitM: 4, action: 'low = mid + 1 = 64' },
    explain: 'Limit 63: S1:[25], S2:[46], S3:[28], S4:[49], S5:[24]. Requires 5 students, exceeding M=4! Max pages threshold is too tight. Shift low = 64.',
    intuition: 'Constraint violated: need at least 64 pages capacity.'
  },
  {
    title: '5. Try Mid = 71: Students Needed = 4 ≤ 4 -> Optimal ans = 71!',
    phase: 'OPTIMAL_FOUND',
    codeLine: 31,
    books: [25, 46, 28, 49, 24],
    m: 4,
    low: 71,
    high: 70,
    mid: 71,
    studentsCount: 4,
    ans: 71,
    variables: { mid: 71, studentsNeeded: 4, minMaxPages: 71 },
    explain: 'Limit 71: S1 gets [25, 46]=71, S2 gets [28], S3 gets [49], S4 gets [24]. Exactly 4 students! Optimal minimized maximum pages = 71.',
    intuition: 'Binary search finishes when low > high. 71 is the exact boundary.'
  }
];

export default function BookAllocationProblemVisualizer({ currentStep = 0 }) {
  const step = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-6 space-y-6">
      {/* Search Header */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-semibold">
          Testing Max Pages = {step.mid ?? 'Init'}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-[#161824] border border-[#272b3c] text-[#8a8ea3]">
          Students Needed: <strong className={step.studentsCount && step.studentsCount <= step.m ? 'text-emerald-300' : 'text-rose-400'}>
            {step.studentsCount ?? '-'} / {step.m} max
          </strong>
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
          Best ans = {step.ans}
        </span>
      </div>

      {/* Book cards */}
      <div className="w-full flex items-center justify-center gap-3 py-3 overflow-x-auto">
        {step.books.map((b, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1 min-w-[50px]">
            <div className="w-12 h-14 rounded-xl bg-gradient-to-b from-indigo-500/20 to-indigo-950/40 border border-indigo-500/40 text-indigo-200 flex flex-col items-center justify-center font-mono font-bold text-sm shadow-md">
              <span className="text-[10px] text-indigo-400">📖</span>
              <span>{b}</span>
            </div>
            <span className="text-[9px] font-mono text-[#5b6076]">bk[{idx}]</span>
          </div>
        ))}
      </div>

      {/* Range Status */}
      <div className="flex items-center gap-4 text-xs font-mono text-[#8a8ea3]">
        <span>Search Domain: [{step.low} ... {Math.max(step.low, step.high)}]</span>
        <span>•</span>
        <span>M = {step.m} Students</span>
      </div>
    </div>
  );
}

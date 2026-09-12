const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('data/algovision.sqlite');

const cpp = `// C++ Optimal Solution: Single Pass Traversal
// Time Complexity: O(N) — each element inspected exactly once
// Space Complexity: O(1) — constant auxiliary space
#include <vector>
using namespace std;

class Solution {
public:
    int largest(vector<int>& arr) {
        if (arr.empty()) return -1;

        // Line 12: Initialize max tracker with first element
        int maxVal = arr[0];

        // Line 15: Iterate through remaining elements
        for (int i = 1; i < (int)arr.size(); ++i) {
            // Line 17: Compare current element against recorded max
            if (arr[i] > maxVal) {
                // Line 19: Update global maximum
                maxVal = arr[i];
            }
        }

        // Line 24: Return largest element found
        return maxVal;
    }
};`;

const python = `# Python 3 Optimal Solution: Single Pass Traversal
# Time Complexity: O(N) | Space Complexity: O(1)

class Solution:
    def largest(self, arr: list[int]) -> int:
        if not arr:
            return -1

        # Line 9: Initialize max with first element
        max_val = arr[0]

        # Line 12: Iterate through remaining elements
        for i in range(1, len(arr)):
            # Line 14: Compare and update max if current is larger
            if arr[i] > max_val:
                max_val = arr[i]

        # Line 18: Return final maximum
        return max_val
`;

const java = `// Java Optimal Solution: Single Pass Traversal
// Time Complexity: O(N) | Space Complexity: O(1)

class Solution {
    public int largest(int[] arr) {
        if (arr == null || arr.length == 0) return -1;

        // Line 9: Track current largest element
        int maxVal = arr[0];

        // Line 12: Single pass inspection
        for (int i = 1; i < arr.length; i++) {
            // Line 14: Update max when larger item found
            if (arr[i] > maxVal) {
                maxVal = arr[i];
            }
        }

        // Line 20: Return maximum
        return maxVal;
    }
}
`;

db.prepare('DELETE FROM code_solutions WHERE question_id = ?').run('largest-element-in-array');
const insertStmt = db.prepare('INSERT INTO code_solutions (question_id, language, code, approach_tier) VALUES (?, ?, ?, ?)');
insertStmt.run('largest-element-in-array', 'cpp', cpp, 'optimal');
insertStmt.run('largest-element-in-array', 'python', python, 'optimal');
insertStmt.run('largest-element-in-array', 'java', java, 'optimal');

console.log('Successfully updated solutions for largest-element-in-array');

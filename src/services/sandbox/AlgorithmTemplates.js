/**
 * Algorithm Starter Templates for AlgoVision Live Code Sandbox & Beta Test Mode
 * 
 * Pre-configured algorithms in Python 3, C++, and JavaScript
 * with input parameter schemas and multi-scenario test cases.
 */

export const ALGORITHM_TEMPLATES = [
  {
    id: 'two-sum',
    title: 'Two Sum (Hash Map & Pointer Scan)',
    category: 'Arrays & Hash Maps',
    aliases: ['two-sum', 'twosum', 'two_sum'],
    inputs: [
      { name: 'nums', type: 'array', label: 'nums =', default: [2, 7, 11, 15] },
      { name: 'target', type: 'number', label: 'target =', default: 9 }
    ],
    defaultInput: {
      nums: [2, 7, 11, 15],
      target: 9
    },
    testCases: [
      { name: 'Case 1 (target = 9)', input: { nums: [2, 7, 11, 15], target: 9 } },
      { name: 'Case 2 (target = 6)', input: { nums: [3, 2, 4], target: 6 } },
      { name: 'Case 3 (Duplicates, target = 6)', input: { nums: [3, 3], target: 6 } },
      { name: 'Case 4 (Negatives, target = 0)', input: { nums: [-3, 4, 3, 90], target: 0 } }
    ],
    code: {
      python: `# Two Sum - Optimal One-Pass Hash Map
nums = [2, 7, 11, 15]
target = 9

seen = {}
result = []

for i in range(len(nums)):
    num = nums[i]
    diff = target - num
    if diff in seen:
        result = [seen[diff], i]
        break
    seen[num] = i
`,
      cpp: `// Two Sum - Two Pointer Technique
#include <vector>
#include <iostream>

int main() {
    std::vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    
    int left = 0;
    int right = nums.size() - 1;
    
    while (left < right) {
        int current_sum = nums[left] + nums[right];
        if (current_sum == target) {
            break; // Found pair!
        } else if (current_sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return 0;
}
`,
      javascript: `// Two Sum - Hash Map approach
const nums = [2, 7, 11, 15];
const target = 9;

const seen = {};
let result = [];

for (let i = 0; i < nums.length; i++) {
  const num = nums[i];
  const diff = target - num;
  
  if (diff in seen) {
    result = [seen[diff], i];
    break;
  }
  seen[num] = i;
}
`
    }
  },
  {
    id: 'pascals-triangle',
    title: "Pascal's Triangle (Row Generation)",
    category: 'Arrays & Math',
    aliases: [
      'pascals-triangle',
      'pascalstriangle',
      'pascals-triangle-i',
      'pascalstrianglei',
      'pascals_triangle',
      'pascal_triangle',
      'pascal',
      'pascals-triangle-row-generation'
    ],
    inputs: [
      { name: 'numRows', type: 'number', label: 'numRows =', default: 5 }
    ],
    defaultInput: {
      numRows: 5
    },
    testCases: [
      { name: 'Case 1 (numRows = 5)', input: { numRows: 5 } },
      { name: 'Case 2 (numRows = 1)', input: { numRows: 1 } },
      { name: 'Case 3 (numRows = 6)', input: { numRows: 6 } },
      { name: 'Case 4 (numRows = 3)', input: { numRows: 3 } }
    ],
    code: {
      python: `# Pascal's Triangle Row Generation
numRows = 5
triangle = []

for r in range(numRows):
    row = [1] * (r + 1)
    for c in range(1, r):
        row[c] = triangle[r - 1][c - 1] + triangle[r - 1][c]
    triangle.append(row)
`,
      cpp: `// Pascal's Triangle in C++
#include <vector>
#include <iostream>

int main() {
    int numRows = 5;
    std::vector<std::vector<int>> triangle;
    
    for (int r = 0; r < numRows; r++) {
        std::vector<int> row(r + 1, 1);
        for (int c = 1; c < r; c++) {
            row[c] = triangle[r - 1][c - 1] + triangle[r - 1][c];
        }
        triangle.push_back(row);
    }
    return 0;
}
`,
      javascript: `// Pascal's Triangle in JavaScript
const numRows = 5;
const triangle = [];

for (let r = 0; r < numRows; r++) {
  const row = new Array(r + 1).fill(1);
  for (let c = 1; c < r; c++) {
    row[c] = triangle[r - 1][c - 1] + triangle[r - 1][c];
  }
  triangle.push(row);
}
`
    }
  },
  {
    id: 'maximum-product-subarray',
    title: 'Maximum Product Subarray',
    category: 'Arrays & Dynamic Programming',
    aliases: [
      'maximum-product-subarray',
      'maximumproductsubarray',
      'max-product-subarray',
      'maxproductsubarray',
      'maximum-product-subarray-in-an-array',
      'max_product_subarray'
    ],
    inputs: [
      { name: 'nums', type: 'array', label: 'nums =', default: [2, 3, -2, 4] }
    ],
    defaultInput: {
      nums: [2, 3, -2, 4]
    },
    testCases: [
      { name: 'Case 1 ([2, 3, -2, 4])', input: { nums: [2, 3, -2, 4] } },
      { name: 'Case 2 (Zero Reset: [-2, 0, -1])', input: { nums: [-2, 0, -1] } },
      { name: 'Case 3 (Double Negative: [-2, 3, -4])', input: { nums: [-2, 3, -4] } },
      { name: 'Case 4 (Single Element: [-2])', input: { nums: [-2] } }
    ],
    code: {
      python: `# Maximum Product Subarray - Prefix & Suffix Product Sweeps
nums = [2, 3, -2, 4]
n = len(nums)
max_prod = -999999
prefix = 1
suffix = 1

for i in range(n):
    if prefix == 0:
        prefix = 1
    if suffix == 0:
        suffix = 1
    prefix = prefix * nums[i]
    suffix = suffix * nums[n - 1 - i]
    max_prod = max(max_prod, prefix, suffix)
`,
      cpp: `// Maximum Product Subarray in C++
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> nums = {2, 3, -2, 4};
    int n = nums.size();
    int max_prod = -999999;
    int prefix = 1;
    int suffix = 1;

    for (int i = 0; i < n; i++) {
        if (prefix == 0) prefix = 1;
        if (suffix == 0) suffix = 1;
        prefix = prefix * nums[i];
        suffix = suffix * nums[n - 1 - i];
        max_prod = std::max(max_prod, std::max(prefix, suffix));
    }
    return 0;
}
`,
      javascript: `// Maximum Product Subarray in JS
const nums = [2, 3, -2, 4];
const n = nums.length;
let max_prod = -Infinity;
let prefix = 1;
let suffix = 1;

for (let i = 0; i < n; i++) {
  if (prefix === 0) prefix = 1;
  if (suffix === 0) suffix = 1;
  prefix = prefix * nums[i];
  suffix = suffix * nums[n - 1 - i];
  max_prod = Math.max(max_prod, prefix, suffix);
}
`
    }
  },
  {
    id: 'longest-subarray-with-sum-k',
    title: 'Longest Subarray with Sum K',
    category: 'Arrays & Prefix Sum',
    aliases: [
      'longest-subarray-with-sum-k',
      'longestsubarraywithsumk',
      'longest-subarray-sum-k',
      'longest-subarray-with-sum',
      'subarray-sum-k',
      'longest_subarray_with_sum_k'
    ],
    inputs: [
      { name: 'nums', type: 'array', label: 'nums =', default: [1, 2, 3, 1, 1, 1] },
      { name: 'k', type: 'number', label: 'k =', default: 3 }
    ],
    defaultInput: {
      nums: [1, 2, 3, 1, 1, 1],
      k: 3
    },
    testCases: [
      { name: 'Case 1 (k = 3)', input: { nums: [1, 2, 3, 1, 1, 1], k: 3 } },
      { name: 'Case 2 (k = 15)', input: { nums: [10, 5, 2, 7, 1, 9], k: 15 } },
      { name: 'Case 3 (Negatives, k = 2)', input: { nums: [-1, 2, 3], k: 2 } },
      { name: 'Case 4 (No match, k = 50)', input: { nums: [1, 2, 3], k: 50 } }
    ],
    code: {
      python: `# Longest Subarray with Sum K - Prefix Map
nums = [1, 2, 3, 1, 1, 1]
k = 3

prefix_map = {}
curr_sum = 0
max_len = 0

for i in range(len(nums)):
    curr_sum += nums[i]
    if curr_sum == k:
        max_len = i + 1
    rem = curr_sum - k
    if rem in prefix_map:
        length = i - prefix_map[rem]
        if length > max_len:
            max_len = length
    if curr_sum not in prefix_map:
        prefix_map[curr_sum] = i
`,
      cpp: `// Longest Subarray with Sum K in C++
#include <vector>
#include <unordered_map>
#include <algorithm>

int main() {
    std::vector<int> nums = {1, 2, 3, 1, 1, 1};
    int k = 3;
    
    std::unordered_map<int, int> prefix_map;
    int curr_sum = 0;
    int max_len = 0;
    
    for (int i = 0; i < nums.size(); i++) {
        curr_sum += nums[i];
        if (curr_sum == k) {
            max_len = i + 1;
        }
        int rem = curr_sum - k;
        if (prefix_map.find(rem) != prefix_map.end()) {
            max_len = std::max(max_len, i - prefix_map[rem]);
        }
        if (prefix_map.find(curr_sum) == prefix_map.end()) {
            prefix_map[curr_sum] = i;
        }
    }
    return 0;
}
`,
      javascript: `// Longest Subarray with Sum K in JS
const nums = [1, 2, 3, 1, 1, 1];
const k = 3;

const prefixMap = {};
let curr_sum = 0;
let max_len = 0;

for (let i = 0; i < nums.length; i++) {
  curr_sum += nums[i];
  if (curr_sum === k) {
    max_len = i + 1;
  }
  const rem = curr_sum - k;
  if (rem in prefixMap) {
    max_len = Math.max(max_len, i - prefixMap[rem]);
  }
  if (!(curr_sum in prefixMap)) {
    prefixMap[curr_sum] = i;
  }
}
`
    }
  },
  {
    id: 'search-in-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    category: 'Binary Search',
    aliases: [
      'search-in-rotated-sorted-array',
      'searchinrotatedsortedarray',
      'search-in-rotated-sorted-array-i',
      'searchinrotatedsortedarrayi',
      'search-rotated-array',
      'search_in_rotated_sorted_array'
    ],
    inputs: [
      { name: 'nums', type: 'array', label: 'nums =', default: [4, 5, 6, 7, 0, 1, 2] },
      { name: 'target', type: 'number', label: 'target =', default: 0 }
    ],
    defaultInput: {
      nums: [4, 5, 6, 7, 0, 1, 2],
      target: 0
    },
    testCases: [
      { name: 'Case 1 (target = 0)', input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 } },
      { name: 'Case 2 (target = 3)', input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 3 } },
      { name: 'Case 3 (Single item, target = 0)', input: { nums: [1], target: 0 } },
      { name: 'Case 4 (Left sorted half, target = 5)', input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 5 } }
    ],
    code: {
      python: `# Search in Rotated Sorted Array - O(log N)
nums = [4, 5, 6, 7, 0, 1, 2]
target = 0

low = 0
high = len(nums) - 1
found_idx = -1

while low <= high:
    mid = (low + high) // 2
    if nums[mid] == target:
        found_idx = mid
        break
    # Check if left half is sorted
    if nums[low] <= nums[mid]:
        if nums[low] <= target and target < nums[mid]:
            high = mid - 1
        else:
            low = mid + 1
    else:
        # Right half is sorted
        if nums[mid] < target and target <= nums[high]:
            low = mid + 1
        else:
            high = mid - 1
`,
      cpp: `// Search in Rotated Sorted Array in C++
#include <vector>

int main() {
    std::vector<int> nums = {4, 5, 6, 7, 0, 1, 2};
    int target = 0;
    
    int low = 0;
    int high = nums.size() - 1;
    int found_idx = -1;
    
    while (low <= high) {
        int mid = (low + high) / 2;
        if (nums[mid] == target) {
            found_idx = mid;
            break;
        }
        if (nums[low] <= nums[mid]) {
            if (nums[low] <= target && target < nums[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }
    return 0;
}
`,
      javascript: `// Search in Rotated Sorted Array in JS
const nums = [4, 5, 6, 7, 0, 1, 2];
const target = 0;

let low = 0;
let high = nums.length - 1;
let found_idx = -1;

while (low <= high) {
  const mid = Math.floor((low + high) / 2);
  if (nums[mid] === target) {
    found_idx = mid;
    break;
  }
  if (nums[low] <= nums[mid]) {
    if (nums[low] <= target && target < nums[mid]) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  } else {
    if (nums[mid] < target && target <= nums[high]) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
}
`
    }
  },
  {
    id: 'kadanes-algorithm',
    title: "Kadane's Algorithm (Maximum Subarray)",
    category: 'Arrays & Dynamic Programming',
    aliases: [
      'kadanes-algorithm',
      'maximum-subarray',
      'kadane',
      'max-subarray',
      'maximumsubarray',
      'kadanesalgorithm',
      'max_subarray'
    ],
    inputs: [
      { name: 'nums', type: 'array', label: 'nums =', default: [-2, 1, -3, 4, -1, 2, 1, -5, 4] }
    ],
    defaultInput: {
      nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
    },
    testCases: [
      { name: 'Case 1 (Mixed elements)', input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] } },
      { name: 'Case 2 (Single item [1])', input: { nums: [1] } },
      { name: 'Case 3 (All negative)', input: { nums: [-5, -2, -8, -1] } },
      { name: 'Case 4 ([5, 4, -1, 7, 8])', input: { nums: [5, 4, -1, 7, 8] } }
    ],
    code: {
      python: `# Kadane's Algorithm - Maximum Subarray Sum
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

max_sum = nums[0]
curr_sum = 0

for i in range(len(nums)):
    curr_sum += nums[i]
    if curr_sum > max_sum:
        max_sum = curr_sum
    if curr_sum < 0:
        curr_sum = 0
`,
      cpp: `// Kadane's Algorithm in C++
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    int max_sum = nums[0];
    int curr_sum = 0;
    
    for (int i = 0; i < nums.size(); i++) {
        curr_sum += nums[i];
        if (curr_sum > max_sum) {
            max_sum = curr_sum;
        }
        if (curr_sum < 0) {
            curr_sum = 0;
        }
    }
    return 0;
}
`,
      javascript: `// Kadane's Algorithm in JS
const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
let max_sum = nums[0];
let curr_sum = 0;

for (let i = 0; i < nums.length; i++) {
  curr_sum += nums[i];
  if (curr_sum > max_sum) {
    max_sum = curr_sum;
  }
  if (curr_sum < 0) {
    curr_sum = 0;
  }
}
`
    }
  },
  {
    id: 'sort-colors',
    title: 'Sort Colors (Dutch National Flag: 0s, 1s, 2s)',
    category: 'Sorting & Two Pointers',
    aliases: [
      'sort-colors',
      'sortcolors',
      'sort-an-array-of-0s-1s-and-2s',
      'dutch-national-flag',
      'sort-012',
      'sort_colors'
    ],
    inputs: [
      { name: 'nums', type: 'array', label: 'nums =', default: [2, 0, 2, 1, 1, 0] }
    ],
    defaultInput: {
      nums: [2, 0, 2, 1, 1, 0]
    },
    testCases: [
      { name: 'Case 1 ([2, 0, 2, 1, 1, 0])', input: { nums: [2, 0, 2, 1, 1, 0] } },
      { name: 'Case 2 ([2, 0, 1])', input: { nums: [2, 0, 1] } },
      { name: 'Case 3 (All 0s & 1s)', input: { nums: [0, 1, 0, 1, 0] } },
      { name: 'Case 4 (Already sorted)', input: { nums: [0, 0, 1, 1, 2, 2] } }
    ],
    code: {
      python: `# Dutch National Flag 3-Way Partition
nums = [2, 0, 2, 1, 1, 0]
low = 0
mid = 0
high = len(nums) - 1

while mid <= high:
    if nums[mid] == 0:
        nums[low], nums[mid] = nums[mid], nums[low]
        low += 1
        mid += 1
    elif nums[mid] == 1:
        mid += 1
    else:
        nums[mid], nums[high] = nums[high], nums[mid]
        high -= 1
`,
      cpp: `// Dutch National Flag in C++
#include <vector>

int main() {
    std::vector<int> nums = {2, 0, 2, 1, 1, 0};
    int low = 0;
    int mid = 0;
    int high = nums.size() - 1;

    while (mid <= high) {
        if (nums[mid] == 0) {
            std::swap(nums[low], nums[mid]);
            low++;
            mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            std::swap(nums[mid], nums[high]);
            high--;
        }
    }
    return 0;
}
`,
      javascript: `// Dutch National Flag in JS
const nums = [2, 0, 2, 1, 1, 0];
let low = 0;
let mid = 0;
let high = nums.length - 1;

while (mid <= high) {
  if (nums[mid] === 0) {
    const temp = nums[low];
    nums[low] = nums[mid];
    nums[mid] = temp;
    low++;
    mid++;
  } else if (nums[mid] === 1) {
    mid++;
  } else {
    const temp = nums[mid];
    nums[mid] = nums[high];
    nums[high] = temp;
    high--;
  }
}
`
    }
  },
  {
    id: 'majority-element',
    title: 'Majority Element (> N/2 Boyer-Moore Voting)',
    category: 'Arrays',
    aliases: [
      'majority-element',
      'majorityelement',
      'boyer-moore',
      'find-majority-element',
      'majority_element'
    ],
    inputs: [
      { name: 'nums', type: 'array', label: 'nums =', default: [2, 2, 1, 1, 1, 2, 2] }
    ],
    defaultInput: {
      nums: [2, 2, 1, 1, 1, 2, 2]
    },
    testCases: [
      { name: 'Case 1 ([2, 2, 1, 1, 1, 2, 2])', input: { nums: [2, 2, 1, 1, 1, 2, 2] } },
      { name: 'Case 2 ([3, 2, 3])', input: { nums: [3, 2, 3] } },
      { name: 'Case 3 ([6, 5, 5])', input: { nums: [6, 5, 5] } }
    ],
    code: {
      python: `# Boyer-Moore Voting Algorithm
nums = [2, 2, 1, 1, 1, 2, 2]
candidate = None
count = 0

for i in range(len(nums)):
    if count == 0:
        candidate = nums[i]
        count = 1
    elif nums[i] == candidate:
        count += 1
    else:
        count -= 1
`,
      cpp: `// Boyer-Moore Voting Algorithm in C++
#include <vector>

int main() {
    std::vector<int> nums = {2, 2, 1, 1, 1, 2, 2};
    int candidate = 0;
    int count = 0;
    
    for (int i = 0; i < nums.size(); i++) {
        if (count == 0) {
            candidate = nums[i];
            count = 1;
        } else if (nums[i] == candidate) {
            count++;
        } else {
            count--;
        }
    }
    return 0;
}
`,
      javascript: `// Boyer-Moore Voting Algorithm in JS
const nums = [2, 2, 1, 1, 1, 2, 2];
let candidate = null;
let count = 0;

for (let i = 0; i < nums.length; i++) {
  if (count === 0) {
    candidate = nums[i];
    count = 1;
  } else if (nums[i] === candidate) {
    count++;
  } else {
    count--;
  }
}
`
    }
  },
  {
    id: 'three-sum',
    title: '3Sum (Sort & Two Pointers)',
    category: 'Arrays & Two Pointers',
    aliases: ['three-sum', '3sum', 'threesum', '3-sum', 'three_sum'],
    inputs: [
      { name: 'nums', type: 'array', label: 'nums =', default: [-1, 0, 1, 2, -1, -4] }
    ],
    defaultInput: {
      nums: [-1, 0, 1, 2, -1, -4]
    },
    testCases: [
      { name: 'Case 1 ([-1, 0, 1, 2, -1, -4])', input: { nums: [-1, 0, 1, 2, -1, -4] } },
      { name: 'Case 2 ([0, 1, 1])', input: { nums: [0, 1, 1] } },
      { name: 'Case 3 ([0, 0, 0])', input: { nums: [0, 0, 0] } }
    ],
    code: {
      python: `# 3Sum - Two Pointer Scan on Sorted Array
nums = [-4, -1, -1, 0, 1, 2]
triplets = []
n = len(nums)

for i in range(n):
    if i > 0 and nums[i] == nums[i - 1]:
        continue
    left = i + 1
    right = n - 1
    while left < right:
        curr_sum = nums[i] + nums[left] + nums[right]
        if curr_sum == 0:
            triplets.append([nums[i], nums[left], nums[right]])
            left += 1
            right -= 1
            while left < right and nums[left] == nums[left - 1]:
                left += 1
            while left < right and nums[right] == nums[right + 1]:
                right -= 1
        elif curr_sum < 0:
            left += 1
        else:
            right -= 1
`,
      cpp: `// 3Sum in C++
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> nums = {-4, -1, -1, 0, 1, 2};
    std::vector<std::vector<int>> triplets;
    int n = nums.size();
    
    for (int i = 0; i < n; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1;
        int right = n - 1;
        while (left < right) {
            int curr_sum = nums[i] + nums[left] + nums[right];
            if (curr_sum == 0) {
                triplets.push_back({nums[i], nums[left], nums[right]});
                left++;
                right--;
                while (left < right && nums[left] == nums[left - 1]) left++;
                while (left < right && nums[right] == nums[right + 1]) right--;
            } else if (curr_sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return 0;
}
`,
      javascript: `// 3Sum in JavaScript
const nums = [-4, -1, -1, 0, 1, 2];
const triplets = [];
const n = nums.length;

for (let i = 0; i < n; i++) {
  if (i > 0 && nums[i] === nums[i - 1]) continue;
  let left = i + 1;
  let right = n - 1;
  while (left < right) {
    const curr_sum = nums[i] + nums[left] + nums[right];
    if (curr_sum === 0) {
      triplets.push([nums[i], nums[left], nums[right]]);
      left++;
      right--;
      while (left < right && nums[left] === nums[left - 1]) left++;
      while (left < right && nums[right] === nums[right + 1]) right--;
    } else if (curr_sum < 0) {
      left++;
    } else {
      right--;
    }
  }
}
`
    }
  },
  {
    id: 'trapping-rainwater',
    title: 'Trapping Rainwater (Two Pointers)',
    category: 'Arrays & Two Pointers',
    aliases: ['trapping-rainwater', 'trapping-rain-water', 'trappingrainwater', 'trap-rain-water'],
    inputs: [
      { name: 'nums', type: 'array', label: 'nums =', default: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] }
    ],
    defaultInput: {
      nums: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
    },
    testCases: [
      { name: 'Case 1 ([0, 1, 0, 2, 1, ...])', input: { nums: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] } },
      { name: 'Case 2 ([4, 2, 0, 3, 2, 5])', input: { nums: [4, 2, 0, 3, 2, 5] } }
    ],
    code: {
      python: `# Trapping Rainwater - Two Pointers O(N) Time O(1) Space
nums = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
left = 0
right = len(nums) - 1
left_max = 0
right_max = 0
total_water = 0

while left <= right:
    if nums[left] <= nums[right]:
        if nums[left] >= left_max:
            left_max = nums[left]
        else:
            total_water += left_max - nums[left]
        left += 1
    else:
        if nums[right] >= right_max:
            right_max = nums[right]
        else:
            total_water += right_max - nums[right]
        right -= 1
`,
      cpp: `// Trapping Rainwater in C++
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> nums = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
    int left = 0;
    int right = nums.size() - 1;
    int left_max = 0;
    int right_max = 0;
    int total_water = 0;

    while (left <= right) {
        if (nums[left] <= nums[right]) {
            if (nums[left] >= left_max) {
                left_max = nums[left];
            } else {
                total_water += left_max - nums[left];
            }
            left++;
        } else {
            if (nums[right] >= right_max) {
                right_max = nums[right];
            } else {
                total_water += right_max - nums[right];
            }
            right--;
        }
    }
    return 0;
}
`,
      javascript: `// Trapping Rainwater in JS
const nums = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
let left = 0;
let right = nums.length - 1;
let left_max = 0;
let right_max = 0;
let total_water = 0;

while (left <= right) {
  if (nums[left] <= nums[right]) {
    if (nums[left] >= left_max) {
      left_max = nums[left];
    } else {
      total_water += left_max - nums[left];
    }
    left++;
  } else {
    if (nums[right] >= right_max) {
      right_max = nums[right];
    } else {
      total_water += right_max - nums[right];
    }
    right--;
  }
}
`
    }
  },
  {
    id: 'rotate-array',
    title: 'Rotate Array by K Steps',
    category: 'Arrays',
    aliases: ['rotate-array', 'rotatearray', 'rotate-array-by-k-places', 'rotate-array-k-steps', 'rotate_array'],
    inputs: [
      { name: 'nums', type: 'array', label: 'nums =', default: [1, 2, 3, 4, 5, 6, 7] },
      { name: 'k', type: 'number', label: 'k =', default: 3 }
    ],
    defaultInput: {
      nums: [1, 2, 3, 4, 5, 6, 7],
      k: 3
    },
    testCases: [
      { name: 'Case 1 (k = 3)', input: { nums: [1, 2, 3, 4, 5, 6, 7], k: 3 } },
      { name: 'Case 2 (k = 2)', input: { nums: [-1, -100, 3, 99], k: 2 } }
    ],
    code: {
      python: `# Rotate Array by K Steps (Reversal Paradigm)
nums = [1, 2, 3, 4, 5, 6, 7]
k = 3
n = len(nums)
k = k % n

# Helper reversal
def reverse_part(arr, start, end):
    while start < end:
        arr[start], arr[end] = arr[end], arr[start]
        start += 1
        end -= 1

reverse_part(nums, 0, n - 1)
reverse_part(nums, 0, k - 1)
reverse_part(nums, k, n - 1)
`,
      cpp: `// Rotate Array in C++
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> nums = {1, 2, 3, 4, 5, 6, 7};
    int k = 3;
    int n = nums.size();
    k = k % n;

    std::reverse(nums.begin(), nums.end());
    std::reverse(nums.begin(), nums.begin() + k);
    std::reverse(nums.begin() + k, nums.end());
    return 0;
}
`,
      javascript: `// Rotate Array in JS
const nums = [1, 2, 3, 4, 5, 6, 7];
let k = 3;
const n = nums.length;
k = k % n;

function reverse(arr, start, end) {
  while (start < end) {
    const temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start++;
    end--;
  }
}

reverse(nums, 0, n - 1);
reverse(nums, 0, k - 1);
reverse(nums, k, n - 1);
`
    }
  },
  {
    id: 'check-for-prime-number',
    title: 'Check for Prime Number (Trial Division)',
    category: 'Math & Number Theory',
    aliases: [
      'check-for-prime-number',
      'check-for-prime',
      'check-prime',
      'checkprime',
      'prime-number',
      'primenumber',
      'check_prime'
    ],
    inputs: [
      { name: 'n', type: 'number', label: 'n =', default: 29 }
    ],
    defaultInput: {
      n: 29
    },
    testCases: [
      { name: 'Case 1 (Prime: 29)', input: { n: 29 } },
      { name: 'Case 2 (Composite: 35)', input: { n: 35 } },
      { name: 'Case 3 (Small Prime: 2)', input: { n: 2 } },
      { name: 'Case 4 (Composite: 49)', input: { n: 49 } }
    ],
    code: {
      python: `# Check for Prime Number in O(sqrt(N))
n = 29
is_prime = True

if n <= 1:
    is_prime = False
else:
    d = 2
    while d * d <= n:
        if n % d == 0:
            is_prime = False
            break
        d += 1
`,
      cpp: `// Check for Prime Number in C++
#include <iostream>

int main() {
    int n = 29;
    bool is_prime = true;

    if (n <= 1) {
        is_prime = false;
    } else {
        for (int d = 2; d * d <= n; d++) {
            if (n % d == 0) {
                is_prime = false;
                break;
            }
        }
    }
    return 0;
}
`,
      javascript: `// Check for Prime Number in JS
const n = 29;
let is_prime = true;

if (n <= 1) {
  is_prime = false;
} else {
  for (let d = 2; d * d <= n; d++) {
    if (n % d === 0) {
      is_prime = false;
      break;
    }
  }
}
`
    }
  },
  {
    id: 'binary-search',
    title: 'Binary Search (Low, Mid, High)',
    category: 'Binary Search',
    aliases: ['binary-search', 'binarysearch', 'bs-1d'],
    inputs: [
      { name: 'nums', type: 'array', label: 'nums =', default: [1, 3, 5, 7, 9, 11, 13, 15, 17] },
      { name: 'target', type: 'number', label: 'target =', default: 11 }
    ],
    defaultInput: {
      nums: [1, 3, 5, 7, 9, 11, 13, 15, 17],
      target: 11
    },
    testCases: [
      { name: 'Case 1 (target = 11)', input: { nums: [1, 3, 5, 7, 9, 11, 13, 15, 17], target: 11 } },
      { name: 'Case 2 (target = 1)', input: { nums: [1, 3, 5, 7, 9, 11, 13, 15, 17], target: 1 } },
      { name: 'Case 3 (target = 17)', input: { nums: [1, 3, 5, 7, 9, 11, 13, 15, 17], target: 17 } },
      { name: 'Case 4 (Not Found, target = 6)', input: { nums: [1, 3, 5, 7, 9, 11, 13, 15, 17], target: 6 } }
    ],
    code: {
      python: `# Binary Search - O(log N) Divide & Conquer
nums = [1, 3, 5, 7, 9, 11, 13, 15, 17]
target = 11

low = 0
high = len(nums) - 1
found_idx = -1

while low <= high:
    mid = (low + high) // 2
    if nums[mid] == target:
        found_idx = mid
        break
    elif nums[mid] < target:
        low = mid + 1
    else:
        high = mid - 1
`,
      cpp: `// Binary Search in C++
#include <vector>

int main() {
    std::vector<int> nums = {1, 3, 5, 7, 9, 11, 13, 15, 17};
    int target = 11;
    
    int low = 0;
    int high = nums.size() - 1;
    int found_idx = -1;
    
    while (low <= high) {
        int mid = (low + high) / 2;
        if (nums[mid] == target) {
            found_idx = mid;
            break;
        } else if (nums[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return 0;
}
`,
      javascript: `// Binary Search in JavaScript
const nums = [1, 3, 5, 7, 9, 11, 13, 15, 17];
const target = 11;

let low = 0;
let high = nums.length - 1;
let found_idx = -1;

while (low <= high) {
  const mid = Math.floor((low + high) / 2);
  if (nums[mid] === target) {
    found_idx = mid;
    break;
  } else if (nums[mid] < target) {
    low = mid + 1;
  } else {
    high = mid - 1;
  }
}
`
    }
  },
  {
    id: 'bubble-sort',
    title: 'Bubble Sort (Adjacent Swaps)',
    category: 'Sorting',
    aliases: ['bubble-sort', 'bubblesort'],
    inputs: [
      { name: 'nums', type: 'array', label: 'nums =', default: [64, 34, 25, 12, 22, 11, 90] }
    ],
    defaultInput: {
      nums: [64, 34, 25, 12, 22, 11, 90]
    },
    testCases: [
      { name: 'Case 1 ([64, 34, 25, 12, ...])', input: { nums: [64, 34, 25, 12, 22, 11, 90] } },
      { name: 'Case 2 (Reverse: [5, 4, 3, 2, 1])', input: { nums: [5, 4, 3, 2, 1] } },
      { name: 'Case 3 (Already sorted)', input: { nums: [1, 2, 3, 4, 5] } }
    ],
    code: {
      python: `# Bubble Sort with Live Swapping
nums = [64, 34, 25, 12, 22, 11, 90]
n = len(nums)

for i in range(n):
    for j in range(0, n - i - 1):
        if nums[j] > nums[j + 1]:
            nums[j], nums[j + 1] = nums[j + 1], nums[j]
`,
      cpp: `// Bubble Sort in C++
#include <vector>

int main() {
    std::vector<int> nums = {64, 34, 25, 12, 22, 11, 90};
    int n = nums.size();
    
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (nums[j] > nums[j + 1]) {
                int temp = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = temp;
            }
        }
    }
    return 0;
}
`,
      javascript: `// Bubble Sort in JavaScript
const nums = [64, 34, 25, 12, 22, 11, 90];
const n = nums.length;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n - i - 1; j++) {
    if (nums[j] > nums[j + 1]) {
      const temp = nums[j];
      nums[j] = nums[j + 1];
      nums[j + 1] = temp;
    }
  }
}
`
    }
  },
  {
    id: 'reverse-an-array',
    title: 'Reverse an Array (Two Pointers)',
    category: 'Arrays',
    aliases: ['reverse-an-array', 'reversearray', 'reverse_an_array', 'reverse'],
    inputs: [
      { name: 'nums', type: 'array', label: 'nums =', default: [1, 2, 3, 4, 5] }
    ],
    defaultInput: {
      nums: [1, 2, 3, 4, 5]
    },
    testCases: [
      { name: 'Case 1 ([1, 2, 3, 4, 5])', input: { nums: [1, 2, 3, 4, 5] } },
      { name: 'Case 2 (Even length: [10, 20, 30, 40])', input: { nums: [10, 20, 30, 40] } },
      { name: 'Case 3 (Single item: [42])', input: { nums: [42] } }
    ],
    code: {
      python: `# Reverse an Array - Two Pointers
nums = [1, 2, 3, 4, 5]
left = 0
right = len(nums) - 1

while left < right:
    nums[left], nums[right] = nums[right], nums[left]
    left += 1
    right -= 1
`,
      cpp: `// Reverse an Array - Two Pointers in C++
#include <vector>
#include <iostream>

int main() {
    std::vector<int> nums = {1, 2, 3, 4, 5};
    int left = 0;
    int right = nums.size() - 1;
    
    while (left < right) {
        std::swap(nums[left], nums[right]);
        left++;
        right--;
    }
    return 0;
}
`,
      javascript: `// Reverse an Array - Two Pointers in JS
const nums = [1, 2, 3, 4, 5];
let left = 0;
let right = nums.length - 1;

while (left < right) {
  const temp = nums[left];
  nums[left] = nums[right];
  nums[right] = temp;
  left++;
  right--;
}
`
    }
  },
  {
    id: 'maximum-consecutive-ones',
    title: 'Maximum Consecutive Ones',
    category: 'Arrays',
    aliases: ['maximum-consecutive-ones', 'maxconsecutiveones', 'maximum_consecutive_ones', 'max-consecutive-ones'],
    inputs: [
      { name: 'nums', type: 'array', label: 'nums =', default: [1, 1, 0, 1, 1, 1] }
    ],
    defaultInput: {
      nums: [1, 1, 0, 1, 1, 1]
    },
    testCases: [
      { name: 'Case 1 ([1, 1, 0, 1, 1, 1])', input: { nums: [1, 1, 0, 1, 1, 1] } },
      { name: 'Case 2 (All 1s: [1, 1, 1])', input: { nums: [1, 1, 1] } },
      { name: 'Case 3 (All 0s: [0, 0, 0])', input: { nums: [0, 0, 0] } }
    ],
    code: {
      python: `# Maximum Consecutive Ones - Single Pass
nums = [1, 1, 0, 1, 1, 1]
max_ones = 0
current_count = 0

for i in range(len(nums)):
    if nums[i] == 1:
        current_count += 1
        if current_count > max_ones:
            max_ones = current_count
    else:
        current_count = 0
`,
      cpp: `// Maximum Consecutive Ones in C++
#include <vector>

int main() {
    std::vector<int> nums = {1, 1, 0, 1, 1, 1};
    int max_ones = 0;
    int current_count = 0;
    
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] == 1) {
            current_count++;
            if (current_count > max_ones) {
                max_ones = current_count;
            }
        } else {
            current_count = 0;
        }
    }
    return 0;
}
`,
      javascript: `// Maximum Consecutive Ones in JavaScript
const nums = [1, 1, 0, 1, 1, 1];
let max_ones = 0;
let current_count = 0;

for (let i = 0; i < nums.length; i++) {
  if (nums[i] === 1) {
    current_count++;
    if (current_count > max_ones) {
      max_ones = current_count;
    }
  } else {
    current_count = 0;
  }
}
`
    }
  },
  {
    id: 'move-zeros-to-end',
    title: 'Move Zeroes to End',
    category: 'Arrays',
    aliases: ['move-zeros-to-end', 'movezeroes', 'movezerostoend', 'move-zeroes'],
    inputs: [
      { name: 'nums', type: 'array', label: 'nums =', default: [0, 1, 0, 3, 12] }
    ],
    defaultInput: {
      nums: [0, 1, 0, 3, 12]
    },
    testCases: [
      { name: 'Case 1 ([0, 1, 0, 3, 12])', input: { nums: [0, 1, 0, 3, 12] } },
      { name: 'Case 2 (No zeroes: [1, 2, 3])', input: { nums: [1, 2, 3] } },
      { name: 'Case 3 (All zeroes: [0, 0, 0])', input: { nums: [0, 0, 0] } }
    ],
    code: {
      python: `# Move Zeroes to End - Two Pointers
nums = [0, 1, 0, 3, 12]
j = -1

for i in range(len(nums)):
    if nums[i] == 0:
        j = i
        break

if j != -1:
    for i in range(j + 1, len(nums)):
        if nums[i] != 0:
            nums[i], nums[j] = nums[j], nums[i]
            j += 1
`,
      cpp: `// Move Zeroes to End in C++
#include <vector>

int main() {
    std::vector<int> nums = {0, 1, 0, 3, 12};
    int j = -1;
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] == 0) {
            j = i;
            break;
        }
    }
    if (j != -1) {
        for (int i = j + 1; i < nums.size(); i++) {
            if (nums[i] != 0) {
                std::swap(nums[i], nums[j]);
                j++;
            }
        }
    }
    return 0;
}
`,
      javascript: `// Move Zeroes to End in JavaScript
const nums = [0, 1, 0, 3, 12];
let j = -1;

for (let i = 0; i < nums.length; i++) {
  if (nums[i] === 0) {
    j = i;
    break;
  }
}

if (j !== -1) {
  for (let i = j + 1; i < nums.length; i++) {
    if (nums[i] !== 0) {
      const temp = nums[i];
      nums[i] = nums[j];
      nums[j] = temp;
      j++;
    }
  }
}
`
    }
  },
  {
    id: 'remove-duplicates-from-sorted-array',
    title: 'Remove Duplicates from Sorted Array',
    category: 'Arrays',
    aliases: ['remove-duplicates-from-sorted-array', 'removeduplicates', 'remove_duplicates'],
    inputs: [
      { name: 'nums', type: 'array', label: 'nums =', default: [1, 1, 2, 2, 3, 3, 4] }
    ],
    defaultInput: {
      nums: [1, 1, 2, 2, 3, 3, 4]
    },
    testCases: [
      { name: 'Case 1 ([1, 1, 2, 2, 3, 3, 4])', input: { nums: [1, 1, 2, 2, 3, 3, 4] } },
      { name: 'Case 2 (No duplicates: [1, 2, 3])', input: { nums: [1, 2, 3] } },
      { name: 'Case 3 (All identical: [2, 2, 2, 2])', input: { nums: [2, 2, 2, 2] } }
    ],
    code: {
      python: `# Remove Duplicates from Sorted Array
nums = [1, 1, 2, 2, 3, 3, 4]
i = 0

for j in range(1, len(nums)):
    if nums[j] != nums[i]:
        i += 1
        nums[i] = nums[j]
`,
      cpp: `// Remove Duplicates from Sorted Array in C++
#include <vector>

int main() {
    std::vector<int> nums = {1, 1, 2, 2, 3, 3, 4};
    int i = 0;
    for (int j = 1; j < nums.size(); j++) {
        if (nums[j] != nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return 0;
}
`,
      javascript: `// Remove Duplicates from Sorted Array in JS
const nums = [1, 1, 2, 2, 3, 3, 4];
let i = 0;

for (let j = 1; j < nums.length; j++) {
  if (nums[j] !== nums[i]) {
    i++;
    nums[i] = nums[j];
  }
}
`
    }
  },
  {
    id: 'second-largest-element',
    title: 'Second Largest Element in Array',
    category: 'Arrays',
    aliases: ['second-largest-element', 'secondlargest', 'largest-element', 'second_largest'],
    inputs: [
      { name: 'nums', type: 'array', label: 'nums =', default: [12, 35, 1, 10, 34, 1] }
    ],
    defaultInput: {
      nums: [12, 35, 1, 10, 34, 1]
    },
    testCases: [
      { name: 'Case 1 ([12, 35, 1, 10, 34, 1])', input: { nums: [12, 35, 1, 10, 34, 1] } },
      { name: 'Case 2 ([10, 10, 10])', input: { nums: [10, 10, 10] } },
      { name: 'Case 3 ([5, 10])', input: { nums: [5, 10] } }
    ],
    code: {
      python: `# Find Second Largest Element in Array
nums = [12, 35, 1, 10, 34, 1]
largest = -1
second_largest = -1

for i in range(len(nums)):
    if nums[i] > largest:
        second_largest = largest
        largest = nums[i]
    elif nums[i] > second_largest and nums[i] != largest:
        second_largest = nums[i]
`,
      cpp: `// Find Second Largest Element in C++
#include <vector>

int main() {
    std::vector<int> nums = {12, 35, 1, 10, 34, 1};
    int largest = -1;
    int second_largest = -1;
    
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] > largest) {
            second_largest = largest;
            largest = nums[i];
        } else if (nums[i] > second_largest && nums[i] != largest) {
            second_largest = nums[i];
        }
    }
    return 0;
}
`,
      javascript: `// Find Second Largest Element in JavaScript
const nums = [12, 35, 1, 10, 34, 1];
let largest = -1;
let second_largest = -1;

for (let i = 0; i < nums.length; i++) {
  if (nums[i] > largest) {
    second_largest = largest;
    largest = nums[i];
  } else if (nums[i] > second_largest && nums[i] !== largest) {
    second_largest = nums[i];
  }
}
`
    }
  },
  {
    id: 'linear-search',
    title: 'Linear Search (Sequential Scan)',
    category: 'Arrays',
    aliases: ['linear-search', 'linearsearch'],
    inputs: [
      { name: 'nums', type: 'array', label: 'nums =', default: [4, 2, 7, 1, 9, 3] },
      { name: 'target', type: 'number', label: 'target =', default: 7 }
    ],
    defaultInput: {
      nums: [4, 2, 7, 1, 9, 3],
      target: 7
    },
    testCases: [
      { name: 'Case 1 (target = 7)', input: { nums: [4, 2, 7, 1, 9, 3], target: 7 } },
      { name: 'Case 2 (target = 4)', input: { nums: [4, 2, 7, 1, 9, 3], target: 4 } },
      { name: 'Case 3 (Not found, target = 99)', input: { nums: [4, 2, 7, 1, 9, 3], target: 99 } }
    ],
    code: {
      python: `# Linear Search - Sequential Element Scan
nums = [4, 2, 7, 1, 9, 3]
target = 7
found_idx = -1

for i in range(len(nums)):
    if nums[i] == target:
        found_idx = i
        break
`,
      cpp: `// Linear Search in C++
#include <vector>

int main() {
    std::vector<int> nums = {4, 2, 7, 1, 9, 3};
    int target = 7;
    int found_idx = -1;
    
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] == target) {
            found_idx = i;
            break;
        }
    }
    return 0;
}
`,
      javascript: `// Linear Search in JavaScript
const nums = [4, 2, 7, 1, 9, 3];
const target = 7;
let found_idx = -1;

for (let i = 0; i < nums.length; i++) {
  if (nums[i] === target) {
    found_idx = i;
    break;
  }
}
`
    }
  },
  {
    id: 'check-if-array-is-sorted',
    title: 'Check If Array Is Sorted and Rotated',
    category: 'Arrays',
    aliases: [
      'check-if-array-is-sorted',
      'checkifarrayissortedandrotated',
      'check-if-array-is-sorted-and-rotated',
      'check_if_array_is_sorted'
    ],
    inputs: [
      { name: 'nums', type: 'array', label: 'nums =', default: [3, 4, 5, 1, 2] }
    ],
    defaultInput: {
      nums: [3, 4, 5, 1, 2]
    },
    testCases: [
      { name: 'Case 1 (Rotated: [3, 4, 5, 1, 2])', input: { nums: [3, 4, 5, 1, 2] } },
      { name: 'Case 2 (Sorted: [1, 2, 3, 4, 5])', input: { nums: [1, 2, 3, 4, 5] } },
      { name: 'Case 3 (Not rotated: [2, 1, 3, 4])', input: { nums: [2, 1, 3, 4] } }
    ],
    code: {
      python: `# Check If Array Is Sorted and Rotated
nums = [3, 4, 5, 1, 2]
drops = 0
n = len(nums)

for i in range(n):
    next_idx = (i + 1) % n
    if nums[i] > nums[next_idx]:
        drops += 1

is_sorted_rotated = drops <= 1
`,
      cpp: `// Check If Array Is Sorted and Rotated in C++
#include <vector>

int main() {
    std::vector<int> nums = {3, 4, 5, 1, 2};
    int drops = 0;
    int n = nums.size();
    
    for (int i = 0; i < n; i++) {
        int next_idx = (i + 1) % n;
        if (nums[i] > nums[next_idx]) {
            drops++;
        }
    }
    bool is_sorted_rotated = (drops <= 1);
    return 0;
}
`,
      javascript: `// Check If Array Is Sorted and Rotated in JS
const nums = [3, 4, 5, 1, 2];
let drops = 0;
const n = nums.length;

for (let i = 0; i < n; i++) {
  const next_idx = (i + 1) % n;
  if (nums[i] > nums[next_idx]) {
    drops++;
  }
}

const is_sorted_rotated = drops <= 1;
`
    }
  }
];

/**
 * Normalizes title or slug text for robust matching
 */
function cleanText(str) {
  if (!str) return '';
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\b(step\s*\d+|part\s*\d+|i{1,3}|iv|v)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Synthesizes a runnable template when a question has custom solutions
 */
export function createDynamicTemplateFromQuestion(question, solutions = {}) {
  const title = question?.title || 'Algorithm Solution';
  const slug = question?.slug || question?.id || 'custom-solution';
  const category = question?.category || 'Algorithm';

  const pyCode = solutions.python || solutions.py || '';
  const cppCode = solutions.cpp || solutions['c++'] || '';
  const jsCode = solutions.javascript || solutions.js || '';

  // Wrap class Solution if present in Python
  let runnablePython = pyCode;
  if (pyCode.includes('class Solution') && !pyCode.includes('Solution().')) {
    runnablePython = `${pyCode.trim()}

# Test Execution Driver
nums = [1, 2, 3, 4, 5]
target = 3
sol = Solution()

# Discover and invoke primary method
methods = [m for m in dir(sol) if not m.startswith('_')]
if methods:
    primary_fn = getattr(sol, methods[0])
    try:
        import inspect
        sig = inspect.signature(primary_fn)
        params_count = len(sig.parameters)
        if params_count == 1:
            result = primary_fn(nums)
        elif params_count >= 2:
            result = primary_fn(nums, target)
        print("Result:", result)
    except Exception as _e:
        print("Execution notice:", _e)
`;
  }

  // Wrap C++ Solution if inside class Solution without main
  let runnableCpp = cppCode;
  if (cppCode.includes('class Solution') && !cppCode.includes('int main')) {
    runnableCpp = `${cppCode.trim()}

int main() {
    Solution sol;
    std::vector<int> nums = {1, 2, 3, 4, 5};
    int target = 3;
    return 0;
}
`;
  }

  return {
    id: slug,
    title,
    category,
    isDynamic: true,
    inputs: [
      { name: 'nums', type: 'array', label: 'nums =', default: [1, 2, 3, 4, 5] },
      { name: 'target', type: 'number', label: 'target =', default: 3 }
    ],
    defaultInput: {
      nums: [1, 2, 3, 4, 5],
      target: 3
    },
    testCases: [
      { name: 'Case 1 ([1, 2, 3, 4, 5])', input: { nums: [1, 2, 3, 4, 5], target: 3 } },
      { name: 'Case 2 ([10, 20, 30])', input: { nums: [10, 20, 30], target: 20 } }
    ],
    code: {
      python: runnablePython || `# ${title}\nnums = [1, 2, 3, 4, 5]\nprint("Processing nums:", nums)`,
      cpp: runnableCpp || `// ${title}\n#include <vector>\nint main() { std::vector<int> nums = {1, 2, 3, 4, 5}; return 0; }`,
      javascript: jsCode || `// ${title}\nconst nums = [1, 2, 3, 4, 5];\nconsole.log(nums);`
    }
  };
}

/**
 * Finds the closest algorithm template for a question by id, slug, or title
 * @param {Object} question
 * @param {Object} [customSolutions] - Optional pre-loaded solutions from visualizer
 */
export function getTemplateForQuestion(question, customSolutions = null) {
  if (!question) return ALGORITHM_TEMPLATES[0];

  const qId = (question.id || '').toLowerCase();
  const qSlug = (question.slug || '').toLowerCase();
  const qTitle = (question.title || '').toLowerCase();
  const qKey = (question.component_key || question.componentKey || '').toLowerCase();
  const cleanQTitle = cleanText(qTitle);
  const cleanQSlug = cleanText(qSlug);

  // 1. Direct ID or exact slug match
  for (const tmpl of ALGORITHM_TEMPLATES) {
    if (tmpl.id === qId || tmpl.id === qSlug) return tmpl;
  }

  // 2. Explicit aliases match
  for (const tmpl of ALGORITHM_TEMPLATES) {
    if (tmpl.aliases) {
      for (const alias of tmpl.aliases) {
        const cleanAlias = cleanText(alias);
        if (
          qSlug === alias ||
          qId === alias ||
          cleanQSlug === cleanAlias ||
          cleanQTitle.includes(cleanAlias) ||
          qKey.includes(cleanAlias.replace(/\s+/g, ''))
        ) {
          return tmpl;
        }
      }
    }
  }

  // 3. Normalized title & keyword matching heuristics
  if (cleanQTitle.includes('pascal') || cleanQSlug.includes('pascal')) {
    return ALGORITHM_TEMPLATES.find(t => t.id === 'pascals-triangle') || ALGORITHM_TEMPLATES[0];
  }
  if (
    cleanQTitle.includes('max product') ||
    cleanQTitle.includes('maximum product') ||
    cleanQSlug.includes('max-product') ||
    cleanQSlug.includes('maximum-product')
  ) {
    return ALGORITHM_TEMPLATES.find(t => t.id === 'maximum-product-subarray') || ALGORITHM_TEMPLATES[0];
  }
  if (
    (cleanQTitle.includes('longest subarray') && cleanQTitle.includes('sum')) ||
    cleanQSlug.includes('longest-subarray')
  ) {
    return ALGORITHM_TEMPLATES.find(t => t.id === 'longest-subarray-with-sum-k') || ALGORITHM_TEMPLATES[0];
  }
  if (
    (cleanQTitle.includes('rotated') && cleanQTitle.includes('search')) ||
    cleanQSlug.includes('rotated') && cleanQSlug.includes('search')
  ) {
    return ALGORITHM_TEMPLATES.find(t => t.id === 'search-in-rotated-sorted-array') || ALGORITHM_TEMPLATES[0];
  }
  if (
    cleanQTitle.includes('kadane') ||
    cleanQTitle.includes('maximum subarray') ||
    cleanQSlug.includes('kadane') ||
    cleanQSlug.includes('max-subarray')
  ) {
    return ALGORITHM_TEMPLATES.find(t => t.id === 'kadanes-algorithm') || ALGORITHM_TEMPLATES[0];
  }
  if (
    cleanQTitle.includes('sort colors') ||
    cleanQTitle.includes('0s 1s 2s') ||
    cleanQTitle.includes('dutch') ||
    cleanQSlug.includes('sort-colors')
  ) {
    return ALGORITHM_TEMPLATES.find(t => t.id === 'sort-colors') || ALGORITHM_TEMPLATES[0];
  }
  if (cleanQTitle.includes('majority') || cleanQSlug.includes('majority')) {
    return ALGORITHM_TEMPLATES.find(t => t.id === 'majority-element') || ALGORITHM_TEMPLATES[0];
  }
  if (cleanQTitle.includes('3 sum') || cleanQTitle.includes('3sum') || cleanQSlug.includes('3sum')) {
    return ALGORITHM_TEMPLATES.find(t => t.id === 'three-sum') || ALGORITHM_TEMPLATES[0];
  }
  if (cleanQTitle.includes('rain') || cleanQTitle.includes('trap') || cleanQSlug.includes('rain')) {
    return ALGORITHM_TEMPLATES.find(t => t.id === 'trapping-rainwater') || ALGORITHM_TEMPLATES[0];
  }
  if (
    (cleanQTitle.includes('rotate') && cleanQTitle.includes('array')) ||
    (cleanQSlug.includes('rotate') && cleanQSlug.includes('array'))
  ) {
    return ALGORITHM_TEMPLATES.find(t => t.id === 'rotate-array') || ALGORITHM_TEMPLATES[0];
  }
  if (cleanQTitle.includes('prime') || cleanQSlug.includes('prime')) {
    return ALGORITHM_TEMPLATES.find(t => t.id === 'check-for-prime-number') || ALGORITHM_TEMPLATES[0];
  }
  if (cleanQTitle.includes('two sum') || cleanQSlug.includes('two-sum')) {
    return ALGORITHM_TEMPLATES.find(t => t.id === 'two-sum') || ALGORITHM_TEMPLATES[0];
  }

  // 4. If custom solutions are provided or attached on question, create dynamic template
  const availableSolutions = customSolutions || question.solutions;
  if (availableSolutions && (availableSolutions.python || availableSolutions.cpp || availableSolutions.javascript)) {
    return createDynamicTemplateFromQuestion(question, availableSolutions);
  }

  // 5. Intelligent category-based fallbacks
  const cat = (question.category || '').toLowerCase();
  if (cat.includes('binary search')) {
    return ALGORITHM_TEMPLATES.find(t => t.id === 'binary-search') || ALGORITHM_TEMPLATES[0];
  }
  if (cat.includes('sorting')) {
    return ALGORITHM_TEMPLATES.find(t => t.id === 'bubble-sort') || ALGORITHM_TEMPLATES[0];
  }

  // 6. Default fallback
  return ALGORITHM_TEMPLATES[0];
}

/**
 * Returns runnable source code for a question in a given language
 */
export function getRunnableCodeForQuestion(question, language = 'python', customSolutions = null) {
  const tmpl = getTemplateForQuestion(question, customSolutions);
  if (tmpl && tmpl.code && tmpl.code[language]) {
    return tmpl.code[language];
  }
  return ALGORITHM_TEMPLATES[0].code[language] || '';
}

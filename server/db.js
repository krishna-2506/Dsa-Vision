import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';

const dataDir = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'algovision.sqlite');
const sqlite = new DatabaseSync(dbPath);

// Initialize Tables
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS questions (
    id TEXT PRIMARY KEY,
    display_id TEXT,
    leetcode_id INTEGER,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    time_complexity TEXT,
    space_complexity TEXT,
    leetcode_url TEXT,
    description TEXT,
    approach TEXT,
    tags TEXT,
    status TEXT DEFAULT 'to_learn',
    is_favorite INTEGER DEFAULT 0,
    component_key TEXT NOT NULL,
    created_at TEXT,
    updated_at TEXT
  );

  CREATE TABLE IF NOT EXISTS code_solutions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id TEXT NOT NULL,
    language TEXT NOT NULL,
    code TEXT NOT NULL,
    FOREIGN KEY(question_id) REFERENCES questions(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS notes (
    question_id TEXT PRIMARY KEY,
    content TEXT,
    updated_at TEXT,
    FOREIGN KEY(question_id) REFERENCES questions(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    display_name TEXT,
    avatar TEXT DEFAULT '⚡',
    level INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 0,
    streak INTEGER DEFAULT 1,
    last_active_date TEXT,
    created_at TEXT
  );

  CREATE TABLE IF NOT EXISTS user_progress (
    user_id TEXT NOT NULL,
    question_id TEXT NOT NULL,
    status TEXT DEFAULT 'to_learn',
    is_favorite INTEGER DEFAULT 0,
    notes TEXT,
    solved_at TEXT,
    PRIMARY KEY (user_id, question_id)
  );

  CREATE TABLE IF NOT EXISTS contributions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    question_id TEXT NOT NULL,
    component_key TEXT NOT NULL,
    created_at TEXT
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    username TEXT NOT NULL,
    avatar TEXT DEFAULT '⚡',
    content TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    created_at TEXT,
    FOREIGN KEY(question_id) REFERENCES questions(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS public_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    username TEXT NOT NULL,
    avatar TEXT DEFAULT '⚡',
    title TEXT,
    content TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    created_at TEXT,
    updated_at TEXT,
    FOREIGN KEY(question_id) REFERENCES questions(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS private_notes (
    user_id TEXT NOT NULL,
    question_id TEXT NOT NULL,
    content TEXT,
    updated_at TEXT,
    PRIMARY KEY (user_id, question_id),
    FOREIGN KEY(question_id) REFERENCES questions(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS solution_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id TEXT NOT NULL,
    user_id TEXT,
    username TEXT,
    language TEXT,
    approach_tier TEXT DEFAULT 'optimal',
    report_type TEXT NOT NULL,
    details TEXT NOT NULL,
    suggested_fix TEXT,
    status TEXT DEFAULT 'pending',
    created_at TEXT,
    resolved_at TEXT,
    FOREIGN KEY(question_id) REFERENCES questions(id) ON DELETE CASCADE
  );
`);

try {
  sqlite.exec("ALTER TABLE code_solutions ADD COLUMN approach_tier TEXT DEFAULT 'optimal'");
} catch (e) {}

try {
  sqlite.exec("ALTER TABLE questions ADD COLUMN approach TEXT");
} catch (e) {}

try {
  sqlite.exec("ALTER TABLE questions ADD COLUMN tags TEXT");
} catch (e) {}

try {
  sqlite.exec("ALTER TABLE questions ADD COLUMN display_id TEXT");
} catch (e) {}

try {
  sqlite.exec("ALTER TABLE questions ADD COLUMN next_review_date TEXT");
} catch (e) {}

try {
  sqlite.exec("ALTER TABLE questions ADD COLUMN confidence_level TEXT DEFAULT 'unrated'");
} catch (e) {}

try {
  sqlite.exec("ALTER TABLE questions ADD COLUMN review_interval_days INTEGER DEFAULT 1");
} catch (e) {}

try {
  sqlite.exec("ALTER TABLE questions ADD COLUMN last_reviewed_at TEXT");
} catch (e) {}

try {
  sqlite.exec("ALTER TABLE user_progress ADD COLUMN next_review_date TEXT");
} catch (e) {}

try {
  sqlite.exec("ALTER TABLE user_progress ADD COLUMN confidence_level TEXT DEFAULT 'unrated'");
} catch (e) {}

try {
  sqlite.exec("ALTER TABLE user_progress ADD COLUMN review_interval_days INTEGER DEFAULT 1");
} catch (e) {}

try {
  sqlite.exec("ALTER TABLE user_progress ADD COLUMN last_reviewed_at TEXT");
} catch (e) {}


// Seed default high-quality LeetCode problems if empty
const countStmt = sqlite.prepare('SELECT COUNT(*) as count FROM questions');
const { count } = countStmt.get();

if (count === 0) {
  const insertQuestion = sqlite.prepare(`
    INSERT INTO questions (
      id, leetcode_id, title, slug, category, difficulty,
      time_complexity, space_complexity, leetcode_url, description,
      status, is_favorite, component_key, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `);

  const insertSolution = sqlite.prepare(`
    INSERT INTO code_solutions (question_id, language, code)
    VALUES (?, ?, ?)
  `);

  const insertNote = sqlite.prepare(`
    INSERT INTO notes (question_id, content, updated_at)
    VALUES (?, ?, datetime('now'))
  `);

  // 1. LeetCode 206 / Doubly Linked List
  insertQuestion.run(
    'doubly-linked-list-reversal',
    206,
    'Reverse Linked List / DLL Construction',
    'reverse-linked-list',
    'Linked Lists',
    'Medium',
    'O(N)',
    'O(1)',
    'https://leetcode.com/problems/reverse-linked-list/',
    'Given the head of a linked list, prepend elements into a bidirectional doubly linked list with explicit forward (next) and backward (prev) pointers.',
    'in_progress',
    1,
    'DoublyLinkedList'
  );

  insertSolution.run('doubly-linked-list-reversal', 'cpp', `/**
 * Definition for doubly-linked list node.
 * struct Node {
 *     int val;
 *     Node *prev;
 *     Node *next;
 *     Node(int x) : val(x), prev(nullptr), next(nullptr) {}
 * };
 */
class Solution {
public:
    Node* constructAndPrepend(const vector<int>& arr) {
        Node* head = nullptr;
        for (int val : arr) {
            Node* temp = new Node(val);
            if (!head) {
                head = temp;
            } else {
                temp->next = head;
                head->prev = temp;
                head = temp;
            }
        }
        return head;
    }
};`);

  insertSolution.run('doubly-linked-list-reversal', 'python', `class Node:
    def __init__(self, val=0, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

class Solution:
    def construct_and_prepend(self, arr: list[int]) -> Node | None:
        head = None
        for val in arr:
            temp = Node(val)
            if not head:
                head = temp
            else:
                temp.next = head
                head.prev = temp
                head = temp
        return head`);

  insertSolution.run('doubly-linked-list-reversal', 'java', `public class Solution {
    static class Node {
        int val;
        Node prev, next;
        Node(int val) { this.val = val; }
    }

    public Node constructAndPrepend(int[] arr) {
        Node head = null;
        for (int val : arr) {
            Node temp = new Node(val);
            if (head == null) {
                head = temp;
            } else {
                temp.next = head;
                head.prev = temp;
                head = temp;
            }
        }
        return head;
    }
}`);

  insertSolution.run('doubly-linked-list-reversal', 'typescript', `class DLLNode {
  val: number;
  prev: DLLNode | null = null;
  next: DLLNode | null = null;
  constructor(val: number) { this.val = val; }
}

function constructAndPrepend(arr: number[]): DLLNode | null {
  let head: DLLNode | null = null;
  for (const val of arr) {
    const temp = new DLLNode(val);
    if (!head) {
      head = temp;
    } else {
      temp.next = head;
      head.prev = temp;
      head = temp;
    }
  }
  return head;
}`);

  insertNote.run(
    'doubly-linked-list-reversal',
    'Key Insight: Always set temp->next = head and head->prev = temp before updating head to temp. When drawing memory diagrams, maintain stack vs heap separation.'
  );

  // 2. LeetCode 167: Two Sum II - Input Array Is Sorted
  insertQuestion.run(
    'two-sum-two-pointers',
    167,
    'Two Sum II - Input Array Is Sorted',
    'two-sum-ii-input-array-is-sorted',
    'Arrays & Two Pointers',
    'Medium',
    'O(N)',
    'O(1)',
    'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
    'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.',
    'mastered',
    1,
    'TwoSumVisualizer'
  );

  insertSolution.run('two-sum-two-pointers', 'cpp', `class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int left = 0, right = numbers.size() - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) {
                return {left + 1, right + 1};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return {};
    }
};`);

  insertSolution.run('two-sum-two-pointers', 'python', `class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        left, right = 0, len(numbers) - 1
        while left < right:
            cur_sum = numbers[left] + numbers[right]
            if cur_sum == target:
                return [left + 1, right + 1]
            elif cur_sum < target:
                left += 1
            else:
                right -= 1
        return []`);

  insertSolution.run('two-sum-two-pointers', 'java', `class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) {
                return new int[]{left + 1, right + 1};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return new int[]{};
    }
}`);

  insertSolution.run('two-sum-two-pointers', 'typescript', `function twoSum(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [];
}`);

  insertNote.run(
    'two-sum-two-pointers',
    'Monotonicity property: Because numbers is sorted, moving left pointer right strictly increases sum, moving right pointer left strictly decreases sum. Guarantees O(N) time with O(1) space.'
  );

  // 3. LeetCode 704: Binary Search
  insertQuestion.run(
    'binary-search-algorithm',
    704,
    'Binary Search',
    'binary-search',
    'Binary Search',
    'Easy',
    'O(log N)',
    'O(1)',
    'https://leetcode.com/problems/binary-search/',
    'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, return its index.',
    'mastered',
    0,
    'BinarySearchVisualizer'
  );

  insertSolution.run('binary-search-algorithm', 'cpp', `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2; // Prevents 32-bit overflow
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
};`);

  insertSolution.run('binary-search-algorithm', 'python', `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        low, high = 0, len(nums) - 1
        while low <= high:
            mid = (low + high) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
        return -1`);

  insertSolution.run('binary-search-algorithm', 'java', `class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + ((high - low) >>> 1);
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`);

  insertSolution.run('binary-search-algorithm', 'typescript', `function search(nums: number[], target: number): number {
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`);

  insertNote.run(
    'binary-search-algorithm',
    'Classic divide and conquer. The loop condition must be low <= high to inspect the single-element interval when low == high.'
  );

  // 4. LeetCode 912: Sort an Array (Merge Sort)
  insertQuestion.run(
    'merge-sort-visualizer',
    912,
    'Sort an Array (Merge Sort)',
    'sort-an-array',
    'Sorting & Searching',
    'Medium',
    'O(N log N)',
    'O(N)',
    'https://leetcode.com/problems/sort-an-array/',
    'Given an array of integers nums, sort the array in ascending order using Divide and Conquer Merge Sort with guaranteed O(N log N) worst-case performance.',
    'to_learn',
    0,
    'MergeSortVisualizer'
  );

  insertSolution.run('merge-sort-visualizer', 'cpp', `class Solution {
public:
    void merge(vector<int>& nums, int l, int m, int r) {
        vector<int> temp(r - l + 1);
        int i = l, j = m + 1, k = 0;
        while (i <= m && j <= r) {
            if (nums[i] <= nums[j]) temp[k++] = nums[i++];
            else temp[k++] = nums[j++];
        }
        while (i <= m) temp[k++] = nums[i++];
        while (j <= r) temp[k++] = nums[j++];
        for (int p = 0; p < k; p++) nums[l + p] = temp[p];
    }

    void mergeSort(vector<int>& nums, int l, int r) {
        if (l >= r) return;
        int m = l + (r - l) / 2;
        mergeSort(nums, l, m);
        mergeSort(nums, m + 1, r);
        merge(nums, l, m, r);
    }

    vector<int> sortArray(vector<int>& nums) {
        mergeSort(nums, 0, nums.size() - 1);
        return nums;
    }
};`);

  insertSolution.run('merge-sort-visualizer', 'python', `class Solution:
    def sortArray(self, nums: list[int]) -> list[int]:
        if len(nums) <= 1:
            return nums
        mid = len(nums) // 2
        left = self.sortArray(nums[:mid])
        right = self.sortArray(nums[mid:])
        
        # Merge
        res = []
        i = j = 0
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                res.append(left[i])
                i += 1
            else:
                res.append(right[j])
                j += 1
        res.extend(left[i:])
        res.extend(right[j:])
        return res`);

  insertSolution.run('merge-sort-visualizer', 'java', `class Solution {
    public int[] sortArray(int[] nums) {
        mergeSort(nums, 0, nums.length - 1);
        return nums;
    }

    private void mergeSort(int[] nums, int l, int r) {
        if (l >= r) return;
        int m = l + (r - l) / 2;
        mergeSort(nums, l, m);
        mergeSort(nums, m + 1, r);
        merge(nums, l, m, r);
    }

    private void merge(int[] nums, int l, int m, int r) {
        int[] temp = new int[r - l + 1];
        int i = l, j = m + 1, k = 0;
        while (i <= m && j <= r) {
            if (nums[i] <= nums[j]) temp[k++] = nums[i++];
            else temp[k++] = nums[j++];
        }
        while (i <= m) temp[k++] = nums[i++];
        while (j <= r) temp[k++] = nums[j++];
        for (int p = 0; p < temp.length; p++) nums[l + p] = temp[p];
    }
}`);

  insertSolution.run('merge-sort-visualizer', 'typescript', `function sortArray(nums: number[]): number[] {
  function merge(l: number, m: number, r: number) {
    const temp: number[] = [];
    let i = l, j = m + 1;
    while (i <= m && j <= r) {
      if (nums[i] <= nums[j]) temp.push(nums[i++]);
      else temp.push(nums[j++]);
    }
    while (i <= m) temp.push(nums[i++]);
    while (j <= r) temp.push(nums[j++]);
    for (let k = 0; k < temp.length; k++) nums[l + k] = temp[k];
  }

  function mergeSort(l: number, r: number) {
    if (l >= r) return;
    const m = l + Math.floor((r - l) / 2);
    mergeSort(l, m);
    mergeSort(m + 1, r);
    merge(l, m, r);
  }

  mergeSort(0, nums.length - 1);
  return nums;
}`);

  insertNote.run(
    'merge-sort-visualizer',
    'Stable sort with O(N log N) worst-case guarantee. Space complexity is O(N) due to temporary auxiliary arrays during the merge phase.'
  );
}

// Export queries
export const dbService = {
  getAllQuestions() {
    const stmt = sqlite.prepare(`
      SELECT q.*, n.content as notes
      FROM questions q
      LEFT JOIN notes n ON q.id = n.question_id
      ORDER BY q.leetcode_id ASC
    `);
    const rows = stmt.all();
    return rows.map(r => {
      let parsedTags = [];
      if (r.tags) {
        try {
          parsedTags = typeof r.tags === 'string' ? JSON.parse(r.tags) : r.tags;
        } catch {
          parsedTags = String(r.tags).split(',').map(t => t.trim()).filter(Boolean);
        }
      }
      return {
        ...r,
        tags: Array.isArray(parsedTags) ? parsedTags : [],
        is_favorite: Boolean(r.is_favorite)
      };
    });
  },

  getQuestion(id) {
    const stmt = sqlite.prepare(`
      SELECT q.*, n.content as notes
      FROM questions q
      LEFT JOIN notes n ON q.id = n.question_id
      WHERE q.id = ?
    `);
    const row = stmt.get(id);
    if (!row) return null;
    let parsedTags = [];
    if (row.tags) {
      try {
        parsedTags = typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags;
      } catch {
        parsedTags = String(row.tags).split(',').map(t => t.trim()).filter(Boolean);
      }
    }
    return {
      ...row,
      tags: Array.isArray(parsedTags) ? parsedTags : [],
      is_favorite: Boolean(row.is_favorite)
    };
  },

  getCodeSolutions(questionId, approachTier = null) {
    let rows;
    if (approachTier) {
      const stmt = sqlite.prepare(`
        SELECT language, code
        FROM code_solutions
        WHERE question_id = ? AND (approach_tier = ? OR (approach_tier IS NULL AND ? = 'optimal'))
      `);
      rows = stmt.all(questionId, approachTier, approachTier);
      if (rows.length === 0) {
        const fallbackStmt = sqlite.prepare(`SELECT language, code FROM code_solutions WHERE question_id = ?`);
        rows = fallbackStmt.all(questionId);
      }
    } else {
      const stmt = sqlite.prepare(`
        SELECT language, code
        FROM code_solutions
        WHERE question_id = ?
      `);
      rows = stmt.all(questionId);
    }
    const map = {};
    for (const r of rows) {
      map[r.language] = r.code;
    }
    return map;
  },

  getCodeSolutionsByTier(questionId) {
    const stmt = sqlite.prepare(`
      SELECT language, code, COALESCE(approach_tier, 'optimal') as tier
      FROM code_solutions
      WHERE question_id = ?
    `);
    const rows = stmt.all(questionId);
    const result = {
      intuitive: {},
      better: {},
      optimal: {}
    };

    for (const r of rows) {
      const tierKey = ['intuitive', 'better', 'optimal'].includes(r.tier) ? r.tier : 'optimal';
      result[tierKey][r.language] = r.code;
    }

    if (Object.keys(result.optimal).length > 0) {
      if (Object.keys(result.intuitive).length === 0) result.intuitive = { ...result.optimal };
      if (Object.keys(result.better).length === 0) result.better = { ...result.optimal };
    }

    return result;
  },

  deleteQuestion(id) {
    if (!id) return { success: false, error: 'Question id required' };
    const q = this.getQuestion(id);
    if (!q) return { success: false, error: 'Question not found' };

    sqlite.prepare('DELETE FROM code_solutions WHERE question_id = ?').run(id);
    sqlite.prepare('DELETE FROM notes WHERE question_id = ?').run(id);
    sqlite.prepare('DELETE FROM comments WHERE question_id = ?').run(id);
    sqlite.prepare('DELETE FROM public_notes WHERE question_id = ?').run(id);
    sqlite.prepare('DELETE FROM private_notes WHERE question_id = ?').run(id);
    sqlite.prepare('DELETE FROM user_progress WHERE question_id = ?').run(id);
    sqlite.prepare('DELETE FROM solution_reports WHERE question_id = ?').run(id);
    sqlite.prepare('DELETE FROM questions WHERE id = ?').run(id);

    return { success: true, deletedId: id };
  },

  saveCodeSolutions(questionId, solutions = {}, approachTier = 'optimal') {
    if (!questionId || !solutions || typeof solutions !== 'object') return;
    const tier = ['intuitive', 'better', 'optimal'].includes(approachTier) ? approachTier : 'optimal';

    const delStmt = sqlite.prepare(`
      DELETE FROM code_solutions
      WHERE question_id = ? AND (approach_tier = ? OR (approach_tier IS NULL AND ? = 'optimal'))
    `);
    delStmt.run(questionId, tier, tier);

    const insStmt = sqlite.prepare(`
      INSERT INTO code_solutions (question_id, language, code, approach_tier) VALUES (?, ?, ?, ?)
    `);
    for (const [lang, code] of Object.entries(solutions)) {
      if (code && typeof code === 'string' && code.trim()) {
        insStmt.run(questionId, lang, code.trim(), tier);
      }
    }
  },

  createReport(report) {
    const stmt = sqlite.prepare(`
      INSERT INTO solution_reports (
        question_id, user_id, username, language, approach_tier,
        report_type, details, suggested_fix, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', datetime('now'))
    `);
    const info = stmt.run(
      report.question_id,
      report.user_id || 'usr_guest',
      report.username || 'Anonymous Learner',
      report.language || 'cpp',
      report.approach_tier || 'optimal',
      report.report_type || 'incorrect_code',
      report.details || '',
      report.suggested_fix || null
    );
    return { success: true, reportId: Number(info.lastInsertRowid) };
  },

  getReports(status = null) {
    let sql = `
      SELECT r.*, q.title as question_title, q.display_id as question_display_id, q.category, q.difficulty
      FROM solution_reports r
      LEFT JOIN questions q ON r.question_id = q.id
    `;
    const params = [];
    if (status && status !== 'all') {
      sql += ' WHERE r.status = ?';
      params.push(status);
    }
    sql += ' ORDER BY r.created_at DESC';
    return sqlite.prepare(sql).all(...params);
  },

  updateReportStatus(id, status) {
    const stmt = sqlite.prepare(`
      UPDATE solution_reports
      SET status = ?, resolved_at = datetime('now')
      WHERE id = ?
    `);
    stmt.run(status, id);
    return { success: true, id, status };
  },

  deleteReport(id) {
    sqlite.prepare('DELETE FROM solution_reports WHERE id = ?').run(id);
    return { success: true };
  },

  getAdminStats() {
    const totalQuestions = sqlite.prepare('SELECT COUNT(*) as count FROM questions').get().count;
    const totalSolutions = sqlite.prepare('SELECT COUNT(*) as count FROM code_solutions').get().count;
    const totalUsers = sqlite.prepare('SELECT COUNT(*) as count FROM users').get().count;
    const pendingReports = sqlite.prepare("SELECT COUNT(*) as count FROM solution_reports WHERE status = 'pending'").get().count;
    const resolvedReports = sqlite.prepare("SELECT COUNT(*) as count FROM solution_reports WHERE status = 'resolved'").get().count;
    const masteredCount = sqlite.prepare("SELECT COUNT(*) as count FROM questions WHERE status = 'mastered'").get().count;

    let diskVisualizersCount = 0;
    try {
      const visDir = path.resolve(process.cwd(), 'src', 'visualizers');
      if (fs.existsSync(visDir)) {
        diskVisualizersCount = fs.readdirSync(visDir).filter(f => f.endsWith('.jsx') || f.endsWith('.js')).length;
      }
    } catch (e) {}

    return {
      totalQuestions,
      totalSolutions,
      totalUsers,
      pendingReports,
      resolvedReports,
      masteredCount,
      diskVisualizersCount
    };
  },

  exportDatabaseDump() {
    const questions = sqlite.prepare('SELECT * FROM questions ORDER BY id').all();
    const solutions = sqlite.prepare('SELECT * FROM code_solutions').all();
    const reports = sqlite.prepare('SELECT * FROM solution_reports ORDER BY id DESC').all();
    const comments = sqlite.prepare('SELECT * FROM comments').all();
    const publicNotes = sqlite.prepare('SELECT * FROM public_notes').all();

    return {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      counts: {
        questions: questions.length,
        solutions: solutions.length,
        reports: reports.length
      },
      questions,
      code_solutions: solutions,
      solution_reports: reports,
      comments,
      public_notes: publicNotes
    };
  },

  importDatabaseDump(dump) {
    if (!dump || (!dump.questions && !Array.isArray(dump))) {
      return { success: false, error: 'Invalid database dump format' };
    }

    const questionList = Array.isArray(dump) ? dump : dump.questions || [];
    let importedQuestions = 0;
    let importedSolutions = 0;

    const insQ = sqlite.prepare(`
      INSERT OR REPLACE INTO questions (
        id, display_id, leetcode_id, title, slug, category, difficulty,
        time_complexity, space_complexity, leetcode_url, description,
        approach, tags, status, is_favorite, component_key, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `);

    for (const q of questionList) {
      if (!q.id || !q.title) continue;
      const tagsStr = Array.isArray(q.tags) ? JSON.stringify(q.tags) : (q.tags || '[]');
      insQ.run(
        q.id,
        q.display_id || null,
        q.leetcode_id || null,
        q.title,
        q.slug || q.id,
        q.category || 'General',
        q.difficulty || 'Medium',
        q.time_complexity || 'O(N)',
        q.space_complexity || 'O(1)',
        q.leetcode_url || '',
        q.description || '',
        q.approach || '',
        tagsStr,
        q.status || 'to_learn',
        q.is_favorite ? 1 : 0,
        q.component_key || q.id
      );
      importedQuestions++;
    }

    if (dump.code_solutions && Array.isArray(dump.code_solutions)) {
      const insSol = sqlite.prepare(`
        INSERT INTO code_solutions (question_id, language, code, approach_tier)
        VALUES (?, ?, ?, ?)
      `);
      for (const sol of dump.code_solutions) {
        if (!sol.question_id || !sol.language || !sol.code) continue;
        try {
          insSol.run(sol.question_id, sol.language, sol.code, sol.approach_tier || 'optimal');
          importedSolutions++;
        } catch (e) {}
      }
    }

    return {
      success: true,
      importedQuestions,
      importedSolutions
    };
  },

  updateQuestion(id, fields) {
    const allowed = ['status', 'is_favorite', 'difficulty', 'category', 'time_complexity', 'space_complexity', 'leetcode_url', 'description', 'tags'];
    const sets = [];
    const values = [];

    for (const [k, v] of Object.entries(fields)) {
      if (allowed.includes(k)) {
        sets.push(`${k} = ?`);
        let val = v;
        if (k === 'is_favorite') val = v ? 1 : 0;
        if (k === 'tags' && Array.isArray(v)) val = JSON.stringify(v);
        values.push(val);
      }
    }

    if (sets.length > 0) {
      sets.push("updated_at = datetime('now')");
      values.push(id);
      const sql = `UPDATE questions SET ${sets.join(', ')} WHERE id = ?`;
      sqlite.prepare(sql).run(...values);
    }

    return this.getQuestion(id);
  },

  saveNotes(questionId, content) {
    const stmt = sqlite.prepare(`
      INSERT INTO notes (question_id, content, updated_at)
      VALUES (?, ?, datetime('now'))
      ON CONFLICT(question_id) DO UPDATE SET
        content = excluded.content,
        updated_at = datetime('now')
    `);
    stmt.run(questionId, content);
    return { success: true };
  },

  addQuestion(q, solutions = {}) {
    const id = q.id || q.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const tagsJson = Array.isArray(q.tags) ? JSON.stringify(q.tags) : (q.tags || '[]');
    const stmt = sqlite.prepare(`
      INSERT OR REPLACE INTO questions (
        id, display_id, leetcode_id, title, slug, category, difficulty,
        time_complexity, space_complexity, leetcode_url, description,
        approach, tags, status, is_favorite, component_key, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `);
    stmt.run(
      id,
      q.display_id || null,
      q.leetcode_id || null,
      q.title,
      q.slug || id,
      q.category || 'General',
      q.difficulty || 'Medium',
      q.time_complexity || 'O(N)',
      q.space_complexity || 'O(1)',
      q.leetcode_url || '',
      q.description || '',
      q.approach || '',
      tagsJson,
      q.status || 'to_learn',
      q.is_favorite ? 1 : 0,
      q.component_key || id
    );

    if (q.notes) {
      this.saveNotes(id, q.notes);
    }

    const solStmt = sqlite.prepare(`
      INSERT INTO code_solutions (question_id, language, code) VALUES (?, ?, ?)
    `);
    for (const [lang, code] of Object.entries(solutions)) {
      solStmt.run(id, lang, code);
    }

    return this.getQuestion(id);
  },



  updateVisualizer(questionId, componentKey, solutions = null) {
    const stmt = sqlite.prepare(`
      UPDATE questions
      SET component_key = ?, updated_at = datetime('now')
      WHERE id = ?
    `);
    stmt.run(componentKey, questionId);

    if (solutions && Object.keys(solutions).length > 0) {
      this.saveCodeSolutions(questionId, solutions);
    }

    return this.getQuestion(questionId);
  },

  getStats() {
    const total = sqlite.prepare('SELECT COUNT(*) as count FROM questions').get().count;
    const mastered = sqlite.prepare("SELECT COUNT(*) as count FROM questions WHERE status = 'mastered'").get().count;
    const inProgress = sqlite.prepare("SELECT COUNT(*) as count FROM questions WHERE status = 'in_progress'").get().count;
    const toLearn = sqlite.prepare("SELECT COUNT(*) as count FROM questions WHERE status = 'to_learn'").get().count;
    return { total, mastered, inProgress, toLearn };
  },

  // ----------------------------------------------------
  // USER AUTHENTICATION & PROFILE SYSTEM
  // ----------------------------------------------------
  registerUser(username, password, displayName = null, avatar = '⚡') {
    const cleanUsername = username.trim().toLowerCase();
    if (!cleanUsername || cleanUsername.length < 2) {
      throw new Error('Username must be at least 2 characters.');
    }
    if (!password || password.length < 4) {
      throw new Error('Password must be at least 4 characters.');
    }

    const existing = sqlite.prepare('SELECT id FROM users WHERE username = ?').get(cleanUsername);
    if (existing) {
      throw new Error('Username is already taken.');
    }

    const id = 'usr_' + crypto.randomUUID().slice(0, 8);
    const passwordHash = hashPassword(password);
    const today = new Date().toISOString().split('T')[0];

    const stmt = sqlite.prepare(`
      INSERT INTO users (id, username, password_hash, display_name, avatar, level, xp, streak, last_active_date, created_at)
      VALUES (?, ?, ?, ?, ?, 1, 50, 1, ?, datetime('now'))
    `);
    stmt.run(id, cleanUsername, passwordHash, displayName || username, avatar, today);

    return this.getUser(id);
  },

  loginUser(username, password) {
    const cleanUsername = username.trim().toLowerCase();
    const user = sqlite.prepare('SELECT * FROM users WHERE username = ?').get(cleanUsername);
    if (!user) {
      throw new Error('User not found.');
    }

    if (!verifyPassword(password, user.password_hash)) {
      throw new Error('Incorrect password.');
    }

    // Update streak on login/activity
    this.updateUserStreak(user.id);
    return this.getUser(user.id);
  },

  getUser(id) {
    const user = sqlite.prepare(`
      SELECT id, username, display_name, avatar, level, xp, streak, last_active_date, created_at
      FROM users WHERE id = ?
    `).get(id);
    if (!user) return null;
    const levelInfo = calculateLevel(user.xp || 0);
    return { ...user, ...levelInfo };
  },

  getAllUsers() {
    const rows = sqlite.prepare(`
      SELECT id, username, display_name, avatar, level, xp, streak, last_active_date, created_at
      FROM users ORDER BY xp DESC
    `).all();
    return rows.map(u => ({ ...u, ...calculateLevel(u.xp || 0) }));
  },

  updateUserStreak(userId) {
    const user = sqlite.prepare('SELECT streak, last_active_date FROM users WHERE id = ?').get(userId);
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    const lastDate = user.last_active_date;

    if (lastDate === today) {
      return; // Already active today
    }

    let newStreak = user.streak || 1;
    if (lastDate) {
      const prev = new Date(lastDate);
      const curr = new Date(today);
      const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    sqlite.prepare('UPDATE users SET streak = ?, last_active_date = ? WHERE id = ?')
      .run(newStreak, today, userId);
  },

  addXp(userId, amount) {
    const user = sqlite.prepare('SELECT xp FROM users WHERE id = ?').get(userId);
    if (!user) return;
    const newXp = (user.xp || 0) + amount;
    const levelInfo = calculateLevel(newXp);
    sqlite.prepare('UPDATE users SET xp = ?, level = ? WHERE id = ?')
      .run(newXp, levelInfo.level, userId);
  },

  // User question progress
  getUserProgress(userId) {
    const rows = sqlite.prepare(`
      SELECT question_id, status, is_favorite, notes, solved_at
      FROM user_progress WHERE user_id = ?
    `).all(userId);
    const map = {};
    for (const r of rows) {
      map[r.question_id] = {
        status: r.status,
        is_favorite: Boolean(r.is_favorite),
        notes: r.notes,
        solved_at: r.solved_at
      };
    }
    return map;
  },

  updateUserProgress(userId, questionId, updates) {
    this.updateUserStreak(userId);
    const current = sqlite.prepare('SELECT * FROM user_progress WHERE user_id = ? AND question_id = ?')
      .get(userId, questionId);

    const prevStatus = current?.status || 'to_learn';
    const newStatus = updates.status || prevStatus;
    const isFav = updates.is_favorite !== undefined ? (updates.is_favorite ? 1 : 0) : (current?.is_favorite || 0);
    const notes = updates.notes !== undefined ? updates.notes : (current?.notes || null);
    const solvedAt = newStatus === 'mastered' ? (current?.solved_at || new Date().toISOString()) : null;

    const stmt = sqlite.prepare(`
      INSERT INTO user_progress (user_id, question_id, status, is_favorite, notes, solved_at)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(user_id, question_id) DO UPDATE SET
        status = excluded.status,
        is_favorite = excluded.is_favorite,
        notes = excluded.notes,
        solved_at = excluded.solved_at
    `);
    stmt.run(userId, questionId, newStatus, isFav, notes, solvedAt);

    // Award XP if problem transitioned to 'mastered'
    if (prevStatus !== 'mastered' && newStatus === 'mastered') {
      const q = sqlite.prepare('SELECT difficulty FROM questions WHERE id = ?').get(questionId);
      const diff = q?.difficulty?.toLowerCase() || 'medium';
      const xpAward = diff === 'easy' ? 25 : diff === 'hard' ? 100 : 50;
      this.addXp(userId, xpAward);
    }

    return { success: true, status: newStatus, is_favorite: Boolean(isFav) };
  },

  // Visualizer Contributions
  recordContribution(userId, questionId, componentKey) {
    const stmt = sqlite.prepare(`
      INSERT INTO contributions (user_id, question_id, component_key, created_at)
      VALUES (?, ?, ?, datetime('now'))
    `);
    stmt.run(userId, questionId, componentKey);
    // Award +150 XP for visualizer contribution!
    this.addXp(userId, 150);
    this.updateUserStreak(userId);
    return { success: true };
  },

  getUserContributions(userId) {
    return sqlite.prepare(`
      SELECT c.*, q.title as question_title, q.category, q.difficulty, q.display_id
      FROM contributions c
      LEFT JOIN questions q ON c.question_id = q.id
      WHERE c.user_id = ?
      ORDER BY c.created_at DESC
    `).all(userId);
  },

  getUserStats(userId) {
    const user = this.getUser(userId);
    if (!user) return null;

    const totalQuestions = sqlite.prepare('SELECT COUNT(*) as count FROM questions').get().count;
    const progressRows = sqlite.prepare(`
      SELECT p.status, q.difficulty, COUNT(*) as count
      FROM user_progress p
      JOIN questions q ON p.question_id = q.id
      WHERE p.user_id = ?
      GROUP BY p.status, q.difficulty
    `).all(userId);

    let mastered = 0, inProgress = 0, easy = 0, medium = 0, hard = 0;

    for (const r of progressRows) {
      if (r.status === 'mastered') {
        mastered += r.count;
        const diff = (r.difficulty || '').toLowerCase();
        if (diff === 'easy') easy += r.count;
        else if (diff === 'hard') hard += r.count;
        else medium += r.count;
      } else if (r.status === 'in_progress') {
        inProgress += r.count;
      }
    }

    const contributions = this.getUserContributions(userId);

    return {
      user,
      totalQuestions,
      solved: mastered,
      inProgress,
      breakdown: { easy, medium, hard },
      contributionsCount: contributions.length,
      contributions
    };
  },

  // --- Comments ---
  getComments(questionId) {
    return sqlite.prepare(
      'SELECT * FROM comments WHERE question_id = ? ORDER BY id DESC'
    ).all(questionId);
  },

  addComment({ questionId, userId, username, avatar, content }) {
    const now = new Date().toISOString();
    const info = sqlite.prepare(`
      INSERT INTO comments (question_id, user_id, username, avatar, content, upvotes, created_at)
      VALUES (?, ?, ?, ?, ?, 0, ?)
    `).run(questionId, userId, username, avatar || '⚡', content, now);

    // Award +10 XP for active discussion
    if (userId) {
      this.addXp(userId, 10);
    }

    return {
      id: info.lastInsertRowid,
      question_id: questionId,
      user_id: userId,
      username,
      avatar: avatar || '⚡',
      content,
      upvotes: 0,
      created_at: now
    };
  },

  upvoteComment(commentId) {
    sqlite.prepare('UPDATE comments SET upvotes = upvotes + 1 WHERE id = ?').run(commentId);
    return sqlite.prepare('SELECT * FROM comments WHERE id = ?').get(commentId);
  },

  deleteComment(commentId, userId) {
    sqlite.prepare('DELETE FROM comments WHERE id = ? AND user_id = ?').run(commentId, userId);
    return { success: true };
  },

  // --- Public Notes ---
  getPublicNotes(questionId) {
    return sqlite.prepare(
      'SELECT * FROM public_notes WHERE question_id = ? ORDER BY upvotes DESC, id DESC'
    ).all(questionId);
  },

  addOrUpdatePublicNote({ questionId, userId, username, avatar, title, content }) {
    const now = new Date().toISOString();
    const existing = sqlite.prepare(
      'SELECT id FROM public_notes WHERE question_id = ? AND user_id = ?'
    ).get(questionId, userId);

    if (existing) {
      sqlite.prepare(`
        UPDATE public_notes
        SET title = ?, content = ?, updated_at = ?
        WHERE id = ?
      `).run(title || 'Insight', content, now, existing.id);
      return sqlite.prepare('SELECT * FROM public_notes WHERE id = ?').get(existing.id);
    } else {
      const info = sqlite.prepare(`
        INSERT INTO public_notes (question_id, user_id, username, avatar, title, content, upvotes, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?)
      `).run(questionId, userId, username, avatar || '⚡', title || 'Insight', content, now, now);

      // Award +25 XP for contributing study notes
      if (userId) {
        this.addXp(userId, 25);
      }

      return {
        id: info.lastInsertRowid,
        question_id: questionId,
        user_id: userId,
        username,
        avatar: avatar || '⚡',
        title: title || 'Insight',
        content,
        upvotes: 0,
        created_at: now,
        updated_at: now
      };
    }
  },

  upvotePublicNote(noteId) {
    sqlite.prepare('UPDATE public_notes SET upvotes = upvotes + 1 WHERE id = ?').run(noteId);
    return sqlite.prepare('SELECT * FROM public_notes WHERE id = ?').get(noteId);
  },

  // --- Private Notes ---
  getPrivateNote(userId, questionId) {
    const row = sqlite.prepare(
      'SELECT content, updated_at FROM private_notes WHERE user_id = ? AND question_id = ?'
    ).get(userId, questionId);
    return row ? row.content : '';
  },

  savePrivateNote(userId, questionId, content) {
    const now = new Date().toISOString();
    sqlite.prepare(`
      INSERT INTO private_notes (user_id, question_id, content, updated_at)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(user_id, question_id) DO UPDATE SET
        content = excluded.content,
        updated_at = excluded.updated_at
    `).run(userId, questionId, content, now);

    return { success: true, updated_at: now };
  },

  // --- Spaced Repetition & Revision System ---
  recordReview(userId, questionId, confidence = 'mastered') {
    const today = new Date();
    const nowIso = today.toISOString();
    
    // Get existing interval
    let prevInterval = 1;
    if (userId) {
      const up = sqlite.prepare('SELECT review_interval_days FROM user_progress WHERE user_id = ? AND question_id = ?').get(userId, questionId);
      if (up && up.review_interval_days) prevInterval = up.review_interval_days;
    } else {
      const q = sqlite.prepare('SELECT review_interval_days FROM questions WHERE id = ?').get(questionId);
      if (q && q.review_interval_days) prevInterval = q.review_interval_days;
    }

    // Leitner spaced repetition interval calculator
    let nextIntervalDays = 1;
    if (confidence === 'mastered') {
      nextIntervalDays = Math.min(60, Math.max(2, Math.round(prevInterval * 2.5)));
    } else if (confidence === 'practicing') {
      nextIntervalDays = Math.max(3, prevInterval);
    } else if (confidence === 'struggling') {
      nextIntervalDays = 1; // Reset to 1 day if struggled
    }

    const nextDate = new Date(today);
    nextDate.setDate(nextDate.getDate() + nextIntervalDays);
    const nextDateStr = nextDate.toISOString().split('T')[0];

    // Update global question table
    sqlite.prepare(`
      UPDATE questions 
      SET next_review_date = ?, confidence_level = ?, review_interval_days = ?, last_reviewed_at = ?, status = 'mastered', updated_at = datetime('now')
      WHERE id = ?
    `).run(nextDateStr, confidence, nextIntervalDays, nowIso, questionId);

    // If userId provided, update user_progress as well
    if (userId) {
      sqlite.prepare(`
        INSERT INTO user_progress (user_id, question_id, status, confidence_level, review_interval_days, next_review_date, last_reviewed_at, solved_at)
        VALUES (?, ?, 'mastered', ?, ?, ?, ?, ?)
        ON CONFLICT(user_id, question_id) DO UPDATE SET
          status = 'mastered',
          confidence_level = excluded.confidence_level,
          review_interval_days = excluded.review_interval_days,
          next_review_date = excluded.next_review_date,
          last_reviewed_at = excluded.last_reviewed_at,
          solved_at = COALESCE(user_progress.solved_at, excluded.solved_at)
      `).run(userId, questionId, confidence, nextIntervalDays, nextDateStr, nowIso, nowIso);

      // Award review XP (+20 XP for active recall review)
      this.addXp(userId, 20);
      this.updateUserStreak(userId);
    }

    return {
      success: true,
      questionId,
      confidence,
      review_interval_days: nextIntervalDays,
      next_review_date: nextDateStr,
      last_reviewed_at: nowIso
    };
  },

  getDueReviews(userId = null) {
    const todayStr = new Date().toISOString().split('T')[0];
    
    if (userId) {
      const rows = sqlite.prepare(`
        SELECT q.*, up.confidence_level, up.review_interval_days, up.next_review_date, up.last_reviewed_at, up.status as user_status
        FROM questions q
        JOIN user_progress up ON q.id = up.question_id
        WHERE up.user_id = ? 
          AND up.next_review_date IS NOT NULL 
          AND up.next_review_date <= ?
        ORDER BY up.next_review_date ASC
      `).all(userId, todayStr);
      return rows;
    }

    const rows = sqlite.prepare(`
      SELECT * FROM questions
      WHERE next_review_date IS NOT NULL 
        AND next_review_date <= ?
      ORDER BY next_review_date ASC
    `).all(todayStr);
    return rows;
  },

  // --- Bulk Import System ---
  bulkImportQuestions(questionsList = []) {
    if (!Array.isArray(questionsList) || questionsList.length === 0) {
      throw new Error('Import list must be a non-empty array of questions');
    }

    const results = [];
    for (const item of questionsList) {
      if (!item.title) continue;
      const questionData = {
        id: item.id || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        display_id: item.display_id || (item.leetcode_id ? `Q-${String(item.leetcode_id).padStart(3, '0')}` : null),
        leetcode_id: item.leetcode_id || null,
        title: item.title,
        slug: item.slug || item.id,
        category: item.category || item.topic || 'Algorithms',
        difficulty: item.difficulty || 'Medium',
        time_complexity: item.time_complexity || 'O(N)',
        space_complexity: item.space_complexity || 'O(1)',
        leetcode_url: item.leetcode_url || '',
        description: item.description || '',
        approach: item.approach || item.intuition || '',
        tags: Array.isArray(item.tags) ? item.tags : (typeof item.tags === 'string' ? item.tags.split(',').map(t => t.trim()).filter(Boolean) : []),
        status: item.status || 'to_learn',
        component_key: item.component_key || (item.id || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
      };

      const solutions = item.solutions || {};
      if (item.code_cpp) solutions['cpp'] = item.code_cpp;
      if (item.code_python) solutions['python'] = item.code_python;
      if (item.code_java) solutions['java'] = item.code_java;
      if (item.code_javascript) solutions['javascript'] = item.code_javascript;

      const created = this.addQuestion(questionData, solutions);
      results.push(created);
    }

    return {
      success: true,
      importedCount: results.length,
      questions: results
    };
  },

  seedDefaultUsers() {
    const count = sqlite.prepare('SELECT COUNT(*) as count FROM users').get().count;
    if (count === 0) {
      console.log('[Auth] Seeding default local users (krishna & demo_coder)...');
      this.registerUser('krishna', 'password123', 'Krishna', '⚡');
      this.registerUser('demo_coder', 'password123', 'Striver Learner', '👨‍💻');
      // Give initial XP/level
      this.addXp('usr_krishna', 350);
      this.addXp('usr_demo_coder', 125);
    }
  }
};

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(':')) return false;
  const [salt, key] = storedHash.split(':');
  const derived = crypto.scryptSync(password, salt, 64).toString('hex');
  return key === derived;
}

function calculateLevel(xp) {
  if (xp >= 3500) return { level: 6, title: 'Algorithm Architect', nextXp: 5000, tierStart: 3500 };
  if (xp >= 2000) return { level: 5, title: 'Dynamic Programmer', nextXp: 3500, tierStart: 2000 };
  if (xp >= 1000) return { level: 4, title: 'Tree & Graph Pathfinder', nextXp: 2000, tierStart: 1000 };
  if (xp >= 500) return { level: 3, title: 'Pointer Specialist', nextXp: 1000, tierStart: 500 };
  if (xp >= 200) return { level: 2, title: 'Binary Apprentice', nextXp: 500, tierStart: 200 };
  return { level: 1, title: 'Novice Coder', nextXp: 200, tierStart: 0 };
}

// Ensure default users are seeded
try {
  dbService.seedDefaultUsers();
} catch (e) {
  // Ignored
}

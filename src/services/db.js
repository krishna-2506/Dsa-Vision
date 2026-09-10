// AlgoVision Database & Storage Layer

const STORAGE_KEY = 'algovision_questions_db_v1';

export const STARTER_QUESTIONS = [
  {
    id: 'doubly-linked-list-reversal',
    title: 'Doubly Linked List Construction & Reverse',
    category: 'Linked Lists',
    difficulty: 'Medium',
    componentKey: 'DoublyLinkedList',
    description: 'Construct a doubly linked list from an array by prepending nodes with forward and backward pointers, then verify traversal.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    leetCodeUrl: 'https://leetcode.com/problems/reverse-linked-list/',
    tags: ['Pointers', 'Memory', 'Stack/Heap', 'Doubly Linked List'],
    status: 'in_progress',
    notes: 'Remember that when attaching a node to the front, you must update both the new node next pointer and the previous head prev pointer before shifting head.',
    isFavorite: true,
    addedAt: '2026-03-01T10:00:00Z',
    lastVisited: new Date().toISOString()
  },
  {
    id: 'two-sum-two-pointers',
    title: 'Two Sum II - Input Array Is Sorted',
    category: 'Arrays & Two Pointers',
    difficulty: 'Medium',
    componentKey: 'TwoSumVisualizer',
    description: 'Find two numbers in a sorted array that add up to a specific target number using left and right converging pointers.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    leetCodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
    tags: ['Two Pointers', 'Array', 'Binary Search'],
    status: 'mastered',
    notes: 'Since the array is sorted, if sum < target increment left pointer. If sum > target decrement right pointer. Optimal O(1) extra space.',
    isFavorite: true,
    addedAt: '2026-03-02T10:00:00Z',
    lastVisited: new Date().toISOString()
  },
  {
    id: 'binary-search-algorithm',
    title: 'Binary Search (Find Peak / Target in Sorted Array)',
    category: 'Binary Search',
    difficulty: 'Easy',
    componentKey: 'BinarySearchVisualizer',
    description: 'Divide and conquer search on a sorted array by halving the search space at each iteration using low, mid, and high pointers.',
    timeComplexity: 'O(log N)',
    spaceComplexity: 'O(1)',
    leetCodeUrl: 'https://leetcode.com/problems/binary-search/',
    tags: ['Divide and Conquer', 'Search', 'Array'],
    status: 'mastered',
    notes: 'Use mid = low + ((high - low) >> 1) to prevent 32-bit integer overflow in languages like C++ or Java.',
    isFavorite: false,
    addedAt: '2026-03-03T10:00:00Z',
    lastVisited: new Date().toISOString()
  },
  {
    id: 'merge-sort-visualizer',
    title: 'Merge Sort - Divide and Conquer',
    category: 'Sorting & Searching',
    difficulty: 'Medium',
    componentKey: 'MergeSortVisualizer',
    description: 'Recursively divides an unsorted array into two halves, sorts each subarray, and merges the sorted subarrays into one ordered array.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    leetCodeUrl: 'https://leetcode.com/problems/sort-an-array/',
    tags: ['Divide and Conquer', 'Recursion', 'Sorting'],
    status: 'to_learn',
    notes: 'Stable sort with guaranteed O(N log N) runtime in worst, average, and best cases. Great for linked lists as well.',
    isFavorite: false,
    addedAt: '2026-03-04T10:00:00Z',
    lastVisited: new Date().toISOString()
  }
];

export const CATEGORIES = [
  'All',
  '1. Arrays',
  '2. Binary Search',
  '3. Strings',
  '4. Linked List',
  '5. Recursion',
  '6. Bit Manipulation',
  '7. Stack and Queues',
  '8. Sliding Window',
  '9. Heaps',
  '10. Greedy Approach',
  '11. Binary Trees',
  '12. Binary Search Trees',
  '13. Graphs',
  '14. Dynamic Programming',
  '15. Tries',
  '16. Strings (Hard)'
];

export const db = {
  getQuestions() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(STARTER_QUESTIONS));
        return STARTER_QUESTIONS;
      }
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading questions from localStorage', e);
      return STARTER_QUESTIONS;
    }
  },

  getQuestion(id) {
    const list = this.getQuestions();
    return list.find(q => q.id === id) || null;
  },

  saveQuestions(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  },

  updateQuestion(id, updates) {
    const list = this.getQuestions();
    const index = list.findIndex(q => q.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updates, updatedAt: new Date().toISOString() };
      this.saveQuestions(list);
      return list[index];
    }
    return null;
  },

  addQuestion(question) {
    const list = this.getQuestions();
    const id = question.id || question.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newEntry = {
      ...question,
      id,
      addedAt: new Date().toISOString(),
      status: question.status || 'to_learn',
      notes: question.notes || '',
      isFavorite: Boolean(question.isFavorite)
    };
    list.unshift(newEntry);
    this.saveQuestions(list);
    return newEntry;
  },

  deleteQuestion(id) {
    const list = this.getQuestions().filter(q => q.id !== id);
    this.saveQuestions(list);
    return list;
  },

  toggleFavorite(id) {
    const list = this.getQuestions();
    const q = list.find(item => item.id === id);
    if (q) {
      q.isFavorite = !q.isFavorite;
      this.saveQuestions(list);
      return q.isFavorite;
    }
    return false;
  },

  updateStatus(id, status) {
    return this.updateQuestion(id, { status });
  },

  updateNotes(id, notes) {
    return this.updateQuestion(id, { notes });
  },

  getStats() {
    const list = this.getQuestions();
    const total = list.length;
    const mastered = list.filter(q => q.status === 'mastered').length;
    const inProgress = list.filter(q => q.status === 'in_progress').length;
    const toLearn = list.filter(q => q.status === 'to_learn').length;

    const byCategory = {};
    list.forEach(q => {
      byCategory[q.category] = (byCategory[q.category] || 0) + 1;
    });

    return { total, mastered, inProgress, toLearn, byCategory };
  },

  exportJSON() {
    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      questions: this.getQuestions()
    };
    return JSON.stringify(data, null, 2);
  },

  importJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data && Array.isArray(data.questions)) {
        this.saveQuestions(data.questions);
        return { success: true, count: data.questions.length };
      }
      return { success: false, error: 'Invalid JSON schema: questions array missing' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  resetDefaults() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(STARTER_QUESTIONS));
    return STARTER_QUESTIONS;
  }
};

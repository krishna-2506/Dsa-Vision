import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';

const dbPath = path.resolve(process.cwd(), 'data', 'algovision.sqlite');
const sqlite = new DatabaseSync(dbPath);

const targetIds = [
  'bubble-sort',
  'selection-sort',
  'insertion-sorting',
  'quick-sorting',
  'kadane-s-algorithm',
  'stock-buy-and-sell',
  'sort-an-array-of-0-s-1-s-and-2-s',
  'majority-element-i',
  'move-zeros-to-end',
  'maximum-consecutive-ones',
  'check-for-prime-number',
  'gcd-of-two-numbers',
  'check-if-string-is-palindrome-or-not',
  'rotate-matrix-by-90-degrees',
  'pascal-s-triangle-i',
  '3-sum',
  'set-matrix-zeroes',
  'count-occurrences-in-a-sorted-array',
  'next-permutation',
  'rearrange-array-elements-by-sign',
  'largest-element',
  'second-largest-element',
  'find-missing-number',
  'find-pairs-with-given-sum-in-doubly-linked-list',
  'introduction-to-linked-list',
  'delete-node-in-a-linked-list',
  'find-the-length-of-the-linkedlist',
  'delete-a-node-in-single-or-doubly-linked-list',
  'left-rotate-array-by-one',
  'left-rotate-array-by-k-places'
];

for (const id of targetIds) {
  const q = sqlite.prepare('SELECT id, title, component_key, step_no FROM questions WHERE id = ?').get(id);
  if (q) {
    console.log(`[FOUND] id: "${q.id}" | title: "${q.title}" | component_key: "${q.component_key}" | step: ${q.step_no}`);
  } else {
    console.log(`[NOT FOUND] id: "${id}"`);
  }
}

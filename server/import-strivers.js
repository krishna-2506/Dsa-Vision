import fs from 'node:fs';
import path from 'node:path';
import { dbService } from './db.js';

const ROOT_DIR = path.resolve(process.cwd(), 'Strivers-A2Z-DSA-Sheet');

function formatCategory(folderName) {
  // e.g. "01.Arrays" -> "1. Arrays", "08. Sliding Window" -> "8. Sliding Window"
  const m = folderName.match(/^0?(\d+)\.\s*(.*)$/);
  if (m) {
    const num = parseInt(m[1], 10);
    const name = m[2].trim();
    return `${num}. ${name}`;
  }
  return folderName.trim();
}

function cleanTitle(fileName) {
  return fileName
    .replace(/^\d+[\.\s]*/, '') // Remove "01.", "02."
    .replace(/\.cpp$/i, '')
    .replace(/[_\-]+/g, ' ')
    .replace(/&/g, ' and ')
    .replace(/\s+/g, ' ')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
    .trim();
}

function toCamelCase(str) {
  return str
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');
}

function cleanComplexityText(raw, fallback) {
  if (!raw) return fallback;
  let text = raw.replace(/^[-:=*#\s]+/, '').replace(/[*\/#\s]+$/, '').trim();
  // Strip redundant prefix
  text = text.replace(/^(?:time|space)\s*complexity\s*[:=-]\s*/i, '').trim();
  return text || fallback;
}

function parseStriverFile(content) {
  let question = '', approach = '', code = '', timeComp = 'O(N)', spaceComp = 'O(1)';

  // 1. Question match
  const qMatch = content.match(/\/\*[\s\S]*?(?:QUESTION|\*\*Question:\*\*):?([\s\S]*?)(?=(?:APPROACH|\*\*APPROACH:\*\*|CODE:|\*\/))/i);
  if (qMatch) {
    question = qMatch[1].replace(/^[-\s]+/, '').trim();
  }

  // 2. Approach match
  const appMatch = content.match(/(?:APPROACH|\*\*APPROACH:\*\*):?([\s\S]*?)(?=(?:CODE:|\*\/))/i);
  if (appMatch) {
    approach = appMatch[1].replace(/^[-\s]+/, '').trim();
  }

  // 3. Code match
  const codeBlockMatch = content.match(/(?:CODE:\s*\*\/|\/\/\s*CODE:?)([\s\S]*?)(?=(?:\/\*|\/\/)?\s*TIME COMPLEXITY|$)/i);
  if (codeBlockMatch) {
    code = codeBlockMatch[1].trim();
  } else {
    // If no explicit CODE: marker, take the C++ code between comment blocks
    const commentBlocks = [...content.matchAll(/\/\*[\s\S]*?\*\//g)];
    if (commentBlocks.length >= 1) {
      const firstBlockEnd = commentBlocks[0].index + commentBlocks[0][0].length;
      const secondBlockStart = commentBlocks.length > 1 ? commentBlocks[commentBlocks.length - 1].index : content.length;
      const snippet = content.slice(firstBlockEnd, secondBlockStart).trim();
      if (snippet.length > 15) {
        code = snippet;
      }
    }
  }

  // 4. Time & Space complexity
  const tcMatch = content.match(/(?:TIME COMPLEXITY|\*\*TIME COMPLEXITY:\*\*)\s*(?:=|:|-)?\s*([^\r\n*]+)/i);
  if (tcMatch) timeComp = cleanComplexityText(tcMatch[1], 'O(N)');

  const scMatch = content.match(/(?:SPACE COMPLEXITY|\*\*SPACE COMPLEXITY:\*\*)\s*(?:=|:|-)?\s*([^\r\n*]+)/i);
  if (scMatch) spaceComp = cleanComplexityText(scMatch[1], 'O(1)');

  // If question was blank or failed, fallback
  if (!question && content.includes('/*')) {
    const firstComment = content.match(/\/\*([\s\S]*?)\*\//);
    if (firstComment) question = firstComment[1].trim();
  }

  return { question, approach, code, timeComp, spaceComp };
}

export function generateTags(title, category, relativePath, description, approach, code) {
  const tags = new Set();
  const lowerTitle = title.toLowerCase();
  const lowerDesc = (description || '').toLowerCase();
  const lowerApp = (approach || '').toLowerCase();
  const lowerCode = (code || '').toLowerCase();
  const lowerPath = (relativePath || '').toLowerCase();
  const allText = `${lowerTitle} ${lowerDesc} ${lowerApp} ${lowerPath}`;

  // 1. Primary Category base tags
  if (category.includes('Arrays')) tags.add('Array');
  if (category.includes('Binary Search')) tags.add('Binary Search');
  if (category.includes('Strings')) tags.add('String');
  if (category.includes('Linked List')) tags.add('Linked List');
  if (category.includes('Recursion')) tags.add('Recursion');
  if (category.includes('Bit Manipulation')) tags.add('Bit Manipulation');
  if (category.includes('Stack and Queues')) {
    if (lowerTitle.includes('queue') || allText.includes('queue')) tags.add('Queue');
    else tags.add('Stack');
  }
  if (category.includes('Sliding Window')) tags.add('Sliding Window');
  if (category.includes('Heaps')) tags.add('Heap');
  if (category.includes('Greedy Approach')) tags.add('Greedy');
  if (category.includes('Binary Trees')) tags.add('Binary Tree');
  if (category.includes('Binary Search Trees')) { tags.add('BST'); tags.add('Binary Tree'); }
  if (category.includes('Graphs')) tags.add('Graph');
  if (category.includes('Dynamic Programming')) tags.add('Dynamic Programming');
  if (category.includes('Tries')) tags.add('Trie');

  // 2. Folder and Sub-topic tags
  if (lowerPath.includes('2d') || lowerPath.includes('matrix') || allText.includes('matrix') || allText.includes('2d array') || allText.includes('grid')) {
    tags.add('Matrix');
  }
  if (lowerPath.includes('search space') || lowerTitle.includes('koko') || lowerTitle.includes('book allocation') || lowerTitle.includes('aggressive cows') || lowerTitle.includes('capacity to ship') || lowerTitle.includes('nth root')) {
    tags.add('Binary Search on Answer');
  }
  if (lowerPath.includes('dll') || lowerPath.includes('doubly') || lowerTitle.includes('doubly')) {
    tags.add('Doubly Linked List');
  }
  if (lowerPath.includes('traversal') || allText.includes('inorder') || allText.includes('preorder') || allText.includes('postorder') || allText.includes('level order') || lowerTitle.includes('traversal')) {
    tags.add('Tree Traversal');
  }
  if (lowerPath.includes('subsequence') || lowerTitle.includes('subsequence') || allText.includes('subsequence')) {
    tags.add('Subsequences');
  }
  if (lowerPath.includes('shortest path') || allText.includes('shortest path') || allText.includes('dijkstra') || lowerTitle.includes('dijkstra')) {
    tags.add('Shortest Path');
    tags.add('Dijkstra');
  }
  if (lowerPath.includes('topo') || allText.includes('topological') || allText.includes('kahn') || lowerTitle.includes('course schedule')) {
    tags.add('Topological Sort');
  }
  if (lowerPath.includes('disjoint') || lowerPath.includes('mst') || allText.includes('union find') || allText.includes('disjoint set') || lowerTitle.includes('disjoint')) {
    tags.add('Disjoint Set Union');
  }
  if (lowerPath.includes('stocks') || lowerTitle.includes('stock')) {
    tags.add('Stock Problems');
  }

  // 3. Algorithmic patterns and mechanics
  if (allText.includes('two pointer') || allText.includes('2 pointer') || allText.includes('left pointer') || allText.includes('converging pointer') || lowerTitle.includes('2 sum') || lowerTitle.includes('two sum') || lowerTitle.includes('3 sum') || lowerTitle.includes('4 sum') || lowerTitle.includes('reverse pair') || lowerTitle.includes('trapping rain') || lowerTitle.includes('sort 0 1 2') || lowerTitle.includes('dutch national flag')) {
    tags.add('Two Pointers');
  }
  if (allText.includes('sliding window') || lowerTitle.includes('longest substring') || lowerTitle.includes('subarray with sum') || lowerTitle.includes('minimum window') || lowerTitle.includes('fruits into baskets') || lowerTitle.includes('max consecutive ones')) {
    tags.add('Sliding Window');
  }
  if (allText.includes('prefix sum') || allText.includes('cumulative sum') || lowerTitle.includes('subarray sum') || lowerTitle.includes('largest subarray') || lowerTitle.includes('subarrays with xor')) {
    tags.add('Prefix Sum');
  }
  if (allText.includes('kadane') || lowerTitle.includes('maximum subarray') || lowerTitle.includes('max sum subarray') || lowerTitle.includes('max product subarray')) {
    tags.add("Kadane's Algorithm");
  }
  if (allText.includes('monotonic') || lowerTitle.includes('next greater') || lowerTitle.includes('previous smaller') || lowerTitle.includes('largest rectangle') || lowerTitle.includes('asteroid collision') || lowerTitle.includes('online stock span')) {
    tags.add('Monotonic Stack');
  }
  if (allText.includes('fast and slow') || allText.includes('tortoise') || allText.includes('floyd') || lowerTitle.includes('detect loop') || lowerTitle.includes('start of cycle') || lowerTitle.includes('middle of') || lowerTitle.includes('palindrome linked list')) {
    tags.add('Fast & Slow Pointers');
  }
  if (allText.includes('hash') || allText.includes('map') || lowerCode.includes('unordered_map') || lowerCode.includes('unordered_set') || allText.includes('frequency map')) {
    tags.add('Hash Map');
  }
  if (allText.includes('binary search') || lowerCode.includes('low <= high') || lowerCode.includes('mid =')) {
    tags.add('Binary Search');
  }
  if (allText.includes('dfs') || allText.includes('depth first')) {
    tags.add('DFS');
  }
  if (allText.includes('bfs') || allText.includes('breadth first') || lowerCode.includes('queue<') || lowerCode.includes('q.push')) {
    tags.add('BFS');
  }
  if (allText.includes('backtrack') || lowerTitle.includes('n queen') || lowerTitle.includes('sudoku') || lowerTitle.includes('combination sum') || lowerTitle.includes('subset sum') || lowerTitle.includes('permutation') || lowerTitle.includes('word search')) {
    tags.add('Backtracking');
  }
  if (allText.includes('memoization') || allText.includes('dp table') || lowerCode.includes('vector<vector<int>> dp') || lowerCode.includes('int dp[')) {
    tags.add('Memoization');
  }
  if (allText.includes('bitmask') || allText.includes('xor') || allText.includes('bitwise') || lowerCode.includes('^=') || lowerCode.includes('<<')) {
    tags.add('Bitmask');
  }
  if (allText.includes('divide and conquer') || lowerTitle.includes('merge sort') || lowerTitle.includes('quick sort')) {
    tags.add('Divide and Conquer');
  }
  if (lowerTitle.includes('knapsack') || allText.includes('knapsack')) {
    tags.add('Knapsack');
  }
  if (lowerTitle.includes('palindrome') || allText.includes('palindrome')) {
    tags.add('Palindrome');
  }
  if (lowerTitle.includes('kth') || lowerTitle.includes('priority queue') || lowerCode.includes('priority_queue') || lowerTitle.includes('median')) {
    tags.add('Priority Queue');
  }
  if (allText.includes('sorting') || lowerCode.includes('sort(') || lowerTitle.includes('sort')) {
    tags.add('Sorting');
  }

  if (tags.size === 0) tags.add('Algorithm');
  return Array.from(tags).slice(0, 4);
}

function scanFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results = results.concat(scanFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.cpp')) {
      results.push(fullPath);
    }
  }

  return results;
}

export function importStriversSheet() {
  console.log('[Strivers Importer] Scanning directory:', ROOT_DIR);
  if (!fs.existsSync(ROOT_DIR)) {
    console.error('[Strivers Importer] Folder not found:', ROOT_DIR);
    return;
  }

  const files = scanFiles(ROOT_DIR).sort((a, b) => a.localeCompare(b));
  console.log(`[Strivers Importer] Found ${files.length} CPP files.`);

  let imported = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const relPath = path.relative(ROOT_DIR, file);
    const parts = relPath.split(path.sep);

    // parts e.g.: ["01.Arrays", "1.Easy", "01.Largest_element_in_array.cpp"]
    const category = parts.length > 1 ? formatCategory(parts[0]) : 'General';
    let difficulty = 'Medium';
    if (parts.length > 2) {
      const diffPart = parts[1].toLowerCase();
      if (diffPart.includes('easy')) difficulty = 'Easy';
      else if (diffPart.includes('hard')) difficulty = 'Hard';
      else difficulty = 'Medium';
    }

    const fileName = parts[parts.length - 1];
    const title = cleanTitle(fileName);
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const id = slug;
    const displayId = `Q-${String(i + 1).padStart(3, '0')}`;
    const componentKey = toCamelCase(title) + 'Visualizer';

    const content = fs.readFileSync(file, 'utf8');
    const parsed = parseStriverFile(content);
    const tags = generateTags(title, category, relPath, parsed.question, parsed.approach, parsed.code);

    // Check if this problem matches any existing custom visualizers
    let actualComponentKey = componentKey;
    if (slug.includes('2-sum') || slug.includes('two-sum')) actualComponentKey = 'TwoSumVisualizer';
    if (slug.includes('binary-search')) actualComponentKey = 'BinarySearchVisualizer';
    if (slug.includes('merge-sort') || slug.includes('sort-an-array')) actualComponentKey = 'MergeSortVisualizer';
    if (slug.includes('reverse-linked-list') || slug.includes('doubly-linked-list')) actualComponentKey = 'DoublyLinkedList';

    // Build question payload
    const q = {
      id,
      display_id: displayId,
      title,
      slug,
      category,
      difficulty,
      time_complexity: parsed.timeComp || 'O(N)',
      space_complexity: parsed.spaceComp || 'O(1)',
      leetcode_url: '',
      description: parsed.question || `Problem from Striver's A2Z DSA Sheet: ${title}`,
      approach: parsed.approach || '',
      tags,
      status: 'to_learn',
      is_favorite: 0,
      component_key: actualComponentKey
    };

    const solutions = {
      cpp: parsed.code || '// Solution code from Striver A2Z Sheet'
    };

    try {
      dbService.addQuestion(q, solutions);
      imported++;
    } catch (err) {
      console.error(`Failed to import ${file}:`, err.message);
    }
  }

  console.log(`[Strivers Importer] Successfully imported ${imported} questions into SQLite!`);
}

// Run directly if executed as script
if (process.argv[1]?.includes('import-strivers')) {
  importStriversSheet();
}

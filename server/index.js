import express from 'express';
import cors from 'cors';
import { dbService } from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', engine: 'node:sqlite', timestamp: new Date().toISOString() });
});

// ----------------------------------------------------
// AUTHENTICATION & USER PROFILE ROUTES
// ----------------------------------------------------
app.post('/api/auth/register', (req, res) => {
  try {
    const { username, password, displayName, avatar } = req.body;
    const user = dbService.registerUser(username, password, displayName, avatar);
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body;
    const user = dbService.loginUser(username, password);
    res.json({ success: true, user });
  } catch (err) {
    res.status(401).json({ success: false, error: err.message });
  }
});

app.get('/api/auth/me/:id', (req, res) => {
  try {
    const user = dbService.getUser(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/users', (req, res) => {
  try {
    const users = dbService.getAllUsers();
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/users/:id/stats', (req, res) => {
  try {
    const stats = dbService.getUserStats(req.params.id);
    if (!stats) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/users/:id/progress', (req, res) => {
  try {
    const progress = dbService.getUserProgress(req.params.id);
    res.json({ success: true, data: progress });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.patch('/api/users/:id/progress/:questionId', (req, res) => {
  try {
    const result = dbService.updateUserProgress(req.params.id, req.params.questionId, req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------------------------------------------
// QUESTIONS & CONTENT ROUTES
// ----------------------------------------------------
// GET /api/questions - List all questions
app.get('/api/questions', (req, res) => {
  try {
    const questions = dbService.getAllQuestions();
    res.json({ success: true, data: questions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/stats - Global progress metrics
app.get('/api/stats', (req, res) => {
  try {
    const stats = dbService.getStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/questions/:id - Single question detail
// GET /api/questions/:id - Single question detail
app.get('/api/questions/:id', (req, res) => {
  try {
    const q = dbService.getQuestion(req.params.id);
    if (!q) return res.status(404).json({ success: false, error: 'Question not found' });
    res.json({ success: true, data: q });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/questions/:id - Update question status / favorite
app.patch('/api/questions/:id', (req, res) => {
  try {
    const updated = dbService.updateQuestion(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/solutions/:id - Get multi-language solution code
app.get('/api/solutions/:id', (req, res) => {
  try {
    const solutions = dbService.getCodeSolutions(req.params.id);
    res.json({ success: true, data: solutions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/notes/:id - Save personal engineering notes
app.post('/api/notes/:id', (req, res) => {
  try {
    dbService.saveNotes(req.params.id, req.body.content || '');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/questions - Add a new question + code solutions
app.post('/api/questions', (req, res) => {
  try {
    const { question, solutions } = req.body;
    const created = dbService.addQuestion(question, solutions || {});
    res.json({ success: true, data: created });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/upload-visualizer - Save visualizer .jsx file and bind to question in SQLite
app.post('/api/upload-visualizer', async (req, res) => {
  try {
    const { questionId, componentKey, code, userId } = req.body;
    if (!questionId || !code) {
      return res.status(400).json({ success: false, error: 'questionId and code are required' });
    }

    const key = componentKey || 'Visualizer_' + questionId.replace(/[^a-zA-Z0-9]/g, '');
    const fs = await import('node:fs');
    const path = await import('node:path');

    const filePath = path.resolve(process.cwd(), 'src', 'visualizers', `${key}.jsx`);
    fs.writeFileSync(filePath, code, 'utf8');

    // Update question in SQLite
    const updated = dbService.updateVisualizer(questionId, key);

    // Record user contribution if user provided
    if (userId) {
      try {
        dbService.recordContribution(userId, questionId, key);
      } catch (err) {
        console.warn('Failed to record contribution:', err.message);
      }
    }

    res.json({ success: true, componentKey: key, data: updated });
  } catch (err) {
    console.error('Error saving visualizer file:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/export/:id - Generate markdown study sheet for students
app.get('/api/export/:id', (req, res) => {
  try {
    const q = dbService.getQuestion(req.params.id);
    if (!q) return res.status(404).send('Not found');

    const solutions = dbService.getCodeSolutions(req.params.id);

    const markdown = `# LeetCode #${q.leetcode_id || 'DSA'}: ${q.title}
**Category:** ${q.category}  
**Difficulty:** ${q.difficulty}  
**Time Complexity:** ${q.time_complexity}  
**Space Complexity:** ${q.space_complexity}  
**Official Link:** ${q.leetcode_url || 'N/A'}  

---

## Problem Summary & Invariants
${q.description}

---

## Student Engineering Notes
${q.notes || '*No notes recorded yet.*'}

---

## Complete Solution Code

### C++
\`\`\`cpp
${solutions.cpp || '// No C++ solution'}
\`\`\`

### Python 3
\`\`\`python
${solutions.python || '# No Python solution'}
\`\`\`

### Java
\`\`\`java
${solutions.java || '// No Java solution'}
\`\`\`

### TypeScript
\`\`\`typescript
${solutions.typescript || '// No TypeScript solution'}
\`\`\`

---
*Generated by AlgoVision Studio Open-Source Platform*
`;

    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${q.slug || q.id}_study_sheet.md"`);
    res.send(markdown);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`[AlgoVision API Server] Running on http://localhost:${PORT} (node:sqlite)`);
});

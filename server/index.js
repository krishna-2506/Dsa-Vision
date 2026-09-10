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

// DELETE /api/questions/:id - Delete question
app.delete('/api/questions/:id', (req, res) => {
  try {
    const result = dbService.deleteQuestion(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/solutions/:id/all-tiers - Get all solution tiers
app.get('/api/solutions/:id/all-tiers', (req, res) => {
  try {
    const tiers = dbService.getCodeSolutionsByTier(req.params.id);
    res.json({ success: true, data: tiers });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/solutions/:id - Get multi-language solution code
app.get('/api/solutions/:id', (req, res) => {
  try {
    const tier = req.query.tier || null;
    const solutions = dbService.getCodeSolutions(req.params.id, tier);
    res.json({ success: true, data: solutions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/solutions/:id - Save solution code for tier
app.post('/api/solutions/:id', (req, res) => {
  try {
    dbService.saveCodeSolutions(req.params.id, req.body.solutions || req.body, req.body.approachTier || 'optimal');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------------------------------------------
// SOLUTION REPORTING ROUTES
// ----------------------------------------------------
app.post('/api/reports', (req, res) => {
  try {
    const result = dbService.createReport(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/reports', (req, res) => {
  try {
    const reports = dbService.getReports(req.query.status || null);
    res.json({ success: true, data: reports });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.patch('/api/reports/:id', (req, res) => {
  try {
    const result = dbService.updateReportStatus(parseInt(req.params.id, 10), req.body.status);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/reports/:id', (req, res) => {
  try {
    const result = dbService.deleteReport(parseInt(req.params.id, 10));
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------------------------------------------
// ADMIN & DATABASE MANAGEMENT ROUTES
// ----------------------------------------------------
app.get('/api/admin/stats', (req, res) => {
  try {
    const stats = dbService.getAdminStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/admin/export', (req, res) => {
  try {
    const dump = dbService.exportDatabaseDump();
    res.json({ success: true, data: dump });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/admin/import', (req, res) => {
  try {
    const result = dbService.importDatabaseDump(req.body.dump || req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/notes/:id - Save personal engineering notes (legacy/default)
app.post('/api/notes/:id', (req, res) => {
  try {
    dbService.saveNotes(req.params.id, req.body.content || '');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/questions/bulk-import - Bulk import questions
app.post('/api/questions/bulk-import', (req, res) => {
  try {
    const { questions } = req.body;
    const result = dbService.bulkImportQuestions(questions);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// POST /api/reviews - Record a spaced repetition review
app.post('/api/reviews', (req, res) => {
  try {
    const { userId, questionId, confidence } = req.body;
    if (!questionId) return res.status(400).json({ success: false, error: 'questionId is required' });
    const result = dbService.recordReview(userId, questionId, confidence);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/reviews/due - Get questions due for spaced repetition review
app.get('/api/reviews/due', (req, res) => {
  try {
    const userId = req.query.userId || null;
    const dueList = dbService.getDueReviews(userId);
    res.json({ success: true, data: dueList });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


// ----------------------------------------------------
// DISCUSSION COMMENTS & COLLABORATIVE NOTES
// ----------------------------------------------------
// GET /api/questions/:id/comments
app.get('/api/questions/:id/comments', (req, res) => {
  try {
    const comments = dbService.getComments(req.params.id);
    res.json({ success: true, data: comments });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/questions/:id/comments
app.post('/api/questions/:id/comments', (req, res) => {
  try {
    const { userId, username, avatar, content } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, error: 'Content cannot be empty' });
    }
    const comment = dbService.addComment({
      questionId: req.params.id,
      userId: userId || 'usr_guest',
      username: username || 'Anonymous Coder',
      avatar: avatar || '⚡',
      content
    });
    res.json({ success: true, data: comment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/comments/:id/upvote
app.post('/api/comments/:id/upvote', (req, res) => {
  try {
    const updated = dbService.upvoteComment(req.params.id);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/comments/:id
app.delete('/api/comments/:id', (req, res) => {
  try {
    const { userId } = req.body;
    const result = dbService.deleteComment(req.params.id, userId);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/questions/:id/public-notes
app.get('/api/questions/:id/public-notes', (req, res) => {
  try {
    const notes = dbService.getPublicNotes(req.params.id);
    res.json({ success: true, data: notes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/questions/:id/public-notes
app.post('/api/questions/:id/public-notes', (req, res) => {
  try {
    const { userId, username, avatar, title, content } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, error: 'Note content cannot be empty' });
    }
    const note = dbService.addOrUpdatePublicNote({
      questionId: req.params.id,
      userId: userId || 'usr_guest',
      username: username || 'Anonymous Coder',
      avatar: avatar || '⚡',
      title: title || 'Key Intuition',
      content
    });
    res.json({ success: true, data: note });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/public-notes/:id/upvote
app.post('/api/public-notes/:id/upvote', (req, res) => {
  try {
    const updated = dbService.upvotePublicNote(req.params.id);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/users/:userId/private-notes/:questionId
app.get('/api/users/:userId/private-notes/:questionId', (req, res) => {
  try {
    const content = dbService.getPrivateNote(req.params.userId, req.params.questionId);
    res.json({ success: true, data: { content } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/users/:userId/private-notes/:questionId
app.post('/api/users/:userId/private-notes/:questionId', (req, res) => {
  try {
    const { content } = req.body;
    const result = dbService.savePrivateNote(req.params.userId, req.params.questionId, content || '');
    res.json({ success: true, data: result });
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

// Helper to extract new multi-language solution code with educational comments
function extractSolutionsFromCode(code) {
  const solutions = {};
  if (!code || typeof code !== 'string') return solutions;

  const solBlockMatch = code.match(/export\s+const\s+solutions\s*=\s*({[\s\S]*?});/);
  if (solBlockMatch) {
    try {
      const cppMatch = solBlockMatch[1].match(/cpp\s*:\s*[`"']([\s\S]*?)[`"'](?:\s*,|\s*})/);
      if (cppMatch) solutions.cpp = cppMatch[1].trim();

      const pyMatch = solBlockMatch[1].match(/(?:python|py)\s*:\s*[`"']([\s\S]*?)[`"'](?:\s*,|\s*})/);
      if (pyMatch) solutions.python = pyMatch[1].trim();

      const javaMatch = solBlockMatch[1].match(/java\s*:\s*[`"']([\s\S]*?)[`"'](?:\s*,|\s*})/);
      if (javaMatch) solutions.java = javaMatch[1].trim();

      const jsMatch = solBlockMatch[1].match(/(?:javascript|js|ts|typescript)\s*:\s*[`"']([\s\S]*?)[`"'](?:\s*,|\s*})/);
      if (jsMatch) solutions.javascript = jsMatch[1].trim();
    } catch (e) {}
  }

  const cppVar = code.match(/export\s+const\s+(?:code_cpp|cppCode|cppSolution)\s*=\s*[`"']([\s\S]*?)[`"'];/);
  if (cppVar && !solutions.cpp) solutions.cpp = cppVar[1].trim();

  const pyVar = code.match(/export\s+const\s+(?:code_python|pythonCode|pySolution)\s*=\s*[`"']([\s\S]*?)[`"'];/);
  if (pyVar && !solutions.python) solutions.python = pyVar[1].trim();

  const javaVar = code.match(/export\s+const\s+(?:code_java|javaCode|javaSolution)\s*=\s*[`"']([\s\S]*?)[`"'];/);
  if (javaVar && !solutions.java) solutions.java = javaVar[1].trim();

  const jsVar = code.match(/export\s+const\s+(?:code_javascript|jsCode|jsSolution)\s*=\s*[`"']([\s\S]*?)[`"'];/);
  if (jsVar && !solutions.javascript) solutions.javascript = jsVar[1].trim();

  return solutions;
}

// POST /api/upload-visualizer - Save visualizer .jsx file and bind to question in SQLite
app.post('/api/upload-visualizer', async (req, res) => {
  try {
    const { questionId, componentKey, code, userId, solutions: providedSolutions } = req.body;
    if (!questionId || !code) {
      return res.status(400).json({ success: false, error: 'questionId and code are required' });
    }

    const key = componentKey || 'Visualizer_' + questionId.replace(/[^a-zA-Z0-9]/g, '');
    const fs = await import('node:fs');
    const path = await import('node:path');

    const filePath = path.resolve(process.cwd(), 'src', 'visualizers', `${key}.jsx`);
    fs.writeFileSync(filePath, code, 'utf8');

    // Extract solutions from code if not explicitly provided
    const extractedSolutions = extractSolutionsFromCode(code);
    const finalSolutions = {
      ...(providedSolutions || {}),
      ...extractedSolutions
    };

    // Update question and replace old code solutions in SQLite
    const updated = dbService.updateVisualizer(questionId, key, finalSolutions);

    // Record user contribution if user provided
    if (userId) {
      try {
        dbService.recordContribution(userId, questionId, key);
      } catch (err) {
        console.warn('Failed to record contribution:', err.message);
      }
    }

    res.json({
      success: true,
      componentKey: key,
      data: updated,
      updatedSolutionsCount: Object.keys(finalSolutions).length
    });
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

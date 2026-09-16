import express from 'express';
import cors from 'cors';
import { dbService, verifySessionToken } from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

// ----------------------------------------------------
// PRODUCTION SECURITY & RELIABILITY MIDDLEWARE
// ----------------------------------------------------
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser with safe payload limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// Production Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (!req.path.startsWith('/assets') && req.path !== '/api/health') {
      console.log(`[HTTP] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    }
  });
  next();
});

// In-Memory Rate Limiter Utility
const rateLimitMap = new Map();

function rateLimiter({ windowMs = 60 * 1000, maxRequests = 60, message = 'Too many requests, please slow down.' }) {
  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const now = Date.now();
    const entry = rateLimitMap.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > entry.resetTime) {
      entry.count = 1;
      entry.resetTime = now + windowMs;
    } else {
      entry.count += 1;
    }
    rateLimitMap.set(ip, entry);

    if (entry.count > maxRequests) {
      res.setHeader('Retry-After', Math.ceil((entry.resetTime - now) / 1000));
      return res.status(429).json({ success: false, error: message });
    }
    next();
  };
}

// Clean up expired rate-limit buckets periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000).unref();

const authLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 30,
  message: 'Too many authentication attempts. Please try again in a few minutes.'
});

// Session Token Verification Middleware
function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    req.user = null;
    return next();
  }
  const token = authHeader.slice(7).trim();
  req.user = verifySessionToken(token);
  next();
}

function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, error: 'Authentication required. Please log in.' });
  }
  next();
}

app.use(authenticateUser);

// Healthcheck & System Telemetry
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    engine: 'node:sqlite',
    journalMode: 'WAL',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime())
  });
});

// ----------------------------------------------------
// AUTHENTICATION & USER PROFILE ROUTES
// ----------------------------------------------------
app.post('/api/auth/register', authLimiter, (req, res) => {
  try {
    const { username, password, displayName, avatar } = req.body;
    const user = dbService.registerUser(username, password, displayName, avatar);
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post('/api/auth/login', authLimiter, (req, res) => {
  try {
    const { username, password } = req.body;
    const user = dbService.loginUser(username, password);
    res.json({ success: true, user });
  } catch (err) {
    res.status(401).json({ success: false, error: err.message });
  }
});

// Update Profile (Authenticated)
app.post('/api/auth/profile', requireAuth, (req, res) => {
  try {
    const { displayName, avatar } = req.body;
    const updated = dbService.updateUserProfile(req.user.id, { displayName, avatar });
    res.json({ success: true, user: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Change Password (Authenticated)
app.post('/api/auth/change-password', requireAuth, (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ success: false, error: 'Both old and new passwords are required' });
    }
    const result = dbService.changeUserPassword(req.user.id, oldPassword, newPassword);
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Global Leaderboard
app.get('/api/leaderboard', (req, res) => {
  try {
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 50));
    const leaderboard = dbService.getLeaderboard(limit);
    res.json({ success: true, data: leaderboard });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
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

// GET /api/users/:id/analytics - Detailed category and difficulty analytics
app.get('/api/users/:id/analytics', (req, res) => {
  try {
    const analytics = dbService.getUserAnalytics(req.params.id);
    if (!analytics) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: analytics });
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

// POST /api/admin/bulk-update-research - Merge alternate videos, GFG links, and articles from Gemini research
// GET /api/admin/visualizers - List all .jsx/.js files in src/visualizers/
app.get('/api/admin/visualizers', async (req, res) => {
  try {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const vizDir = path.resolve(process.cwd(), 'src', 'visualizers');
    if (!fs.existsSync(vizDir)) {
      return res.json({ success: true, files: [] });
    }
    const allFiles = fs.readdirSync(vizDir);
    const files = allFiles.filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
    res.json({ success: true, files });
  } catch (err) {
    console.error('Error listing visualizers:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/admin/autolink - Auto-link visualizer components to questions by name matching
app.post('/api/admin/autolink', async (req, res) => {
  try {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const vizDir = path.resolve(process.cwd(), 'src', 'visualizers');
    if (!fs.existsSync(vizDir)) {
      return res.json({ success: true, linkedCount: 0 });
    }
    const allFiles = fs.readdirSync(vizDir);
    const files = allFiles.filter(f => f.endsWith('.jsx') || f.endsWith('.js'));
    const componentKeys = files.map(f => f.replace(/\.(jsx|js)$/, ''));

    const questions = dbService.getAllQuestions();
    let linkedCount = 0;

    for (const q of questions) {
      if (q.component_key) continue; // Already linked
      // Try exact slug-based match
      const titleSlug = q.title
        ? q.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        : '';
      const idSlug = q.id.replace(/[^a-z0-9]+/g, '-');

      const matchedKey = componentKeys.find(k => {
        const kLow = k.toLowerCase();
        return kLow === titleSlug + 'visualizer' ||
          kLow === idSlug + 'visualizer' ||
          kLow.includes(titleSlug.replace(/-/g, '').slice(0, 12));
      });

      if (matchedKey) {
        dbService.updateQuestion(q.id, { component_key: matchedKey });
        linkedCount++;
      }
    }

    res.json({ success: true, linkedCount });
  } catch (err) {
    console.error('Error auto-linking visualizers:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/admin/check-display-id - Check if a display_id is unique
app.get('/api/admin/check-display-id', (req, res) => {
  try {
    const { display_id, exclude_id } = req.query;
    if (!display_id) {
      return res.status(400).json({ success: false, error: 'display_id is required' });
    }
    const questions = dbService.getAllQuestions();
    const conflict = questions.find(q =>
      q.display_id === display_id && q.id !== exclude_id
    );
    res.json({ success: true, isUnique: !conflict, conflict: conflict ? { id: conflict.id, title: conflict.title } : null });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/admin/bulk-update-research', (req, res) => {
  try {
    const items = Array.isArray(req.body) ? req.body : (req.body.items || req.body.data || []);
    const result = dbService.bulkUpdateResearch(items);
    res.json(result);
  } catch (err) {
    console.error('Failed bulk research update:', err);
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
function extractSolutionsFromCode(rawCode) {
  const allTiers = extractApproachesSolutions(rawCode);
  if (allTiers.optimal && Object.keys(allTiers.optimal).length > 0) return allTiers.optimal;
  if (allTiers.intuitive && Object.keys(allTiers.intuitive).length > 0) return allTiers.intuitive;
  if (allTiers.better && Object.keys(allTiers.better).length > 0) return allTiers.better;
  return {};
}

// Extract per-tier solutions from approaches block or const variables
function extractApproachesSolutions(rawCode) {
  if (!rawCode || typeof rawCode !== 'string') return {};
  const code = rawCode.replace(/\r\n/g, '\n');

  const result = {
    intuitive: {},
    better: {},
    optimal: {}
  };

  // ── 1. Extract all const/let/var `xxx = \`...\`` template literal variables ──
  const vars = {};
  const varRe = /(?:export\s+)?(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*`([\s\S]*?)`;?/g;
  let vm;
  while ((vm = varRe.exec(code)) !== null) {
    vars[vm[1]] = vm[2].trim();
  }

  // ── 2. Find any tier blocks by scanning for `tier:` ──
  const tierNames = ['intuitive', 'better', 'optimal'];

  const langKeyPatterns = [
    { key: 'cpp', regexes: [/cpp\s*:\s*`([\s\S]*?)`/, /cpp\s*:\s*([a-zA-Z0-9_$]+)/] },
    { key: 'java', regexes: [/java\s*:\s*`([\s\S]*?)`/, /java\s*:\s*([a-zA-Z0-9_$]+)/] },
    { key: 'python', regexes: [/(?:python|python3|py)\s*:\s*`([\s\S]*?)`/, /(?:python|python3|py)\s*:\s*([a-zA-Z0-9_$]+)/] }
  ];

  function parseSolutionsBlock(subStr) {
    const sols = {};
    for (const { key, regexes } of langKeyPatterns) {
      const litMatch = subStr.match(regexes[0]);
      if (litMatch && litMatch[1].trim()) {
        sols[key] = litMatch[1].trim();
        continue;
      }
      const varMatch = subStr.match(regexes[1]);
      if (varMatch && vars[varMatch[1]]) {
        sols[key] = vars[varMatch[1]];
        continue;
      }
    }
    return sols;
  }

  for (const tier of tierNames) {
    const tierIdx = code.indexOf(`${tier}:`);
    if (tierIdx !== -1) {
      const chunk = code.slice(tierIdx, tierIdx + 6000);
      const solIdx = chunk.indexOf('solutions');
      if (solIdx !== -1) {
        const solChunk = chunk.slice(solIdx, solIdx + 4500);
        const parsed = parseSolutionsBlock(solChunk);
        if (Object.keys(parsed).length > 0) {
          result[tier] = parsed;
        }
      }
    }
  }

  // ── 3. Handle tier aliasing ──
  // e.g. approaches.better.solutions = approaches.intuitive.solutions;
  for (const targetTier of tierNames) {
    for (const srcTier of tierNames) {
      if (targetTier === srcTier) continue;
      const aliasPattern = new RegExp(`approaches\\.${targetTier}\\.solutions\\s*=\\s*approaches\\.${srcTier}\\.solutions`);
      if (aliasPattern.test(code) && Object.keys(result[srcTier]).length > 0) {
        if (!result[targetTier] || Object.keys(result[targetTier]).length === 0) {
          result[targetTier] = { ...result[srcTier] };
        }
      }
    }
  }

  // ── 4. Fallback from top-level variables if any tier is empty ──
  const topSols = {};
  for (const [varName, varVal] of Object.entries(vars)) {
    const lower = varName.toLowerCase();
    if (lower.includes('cpp')) topSols.cpp = varVal;
    else if (lower.includes('java')) topSols.java = varVal;
    else if (lower.includes('python') || lower.includes('py')) topSols.python = varVal;
  }

  const nonEmptyTiers = tierNames.filter(t => Object.keys(result[t]).length > 0);
  if (nonEmptyTiers.length > 0) {
    const fallbackTier = result.optimal && Object.keys(result.optimal).length > 0
      ? result.optimal
      : result[nonEmptyTiers[0]];
    for (const tier of tierNames) {
      if (Object.keys(result[tier]).length === 0) {
        result[tier] = { ...fallbackTier };
      }
    }
  } else if (Object.keys(topSols).length > 0) {
    for (const tier of tierNames) {
      result[tier] = { ...topSols };
    }
  }

  return result;
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

    // Also try to extract per-tier solutions from approaches block
    const tierSolutions = extractApproachesSolutions(code);

    // Update question's component_key in DB
    const stmt = sqlite.prepare(`UPDATE questions SET component_key = ?, updated_at = datetime('now') WHERE id = ?`);
    stmt.run(key, questionId);

    // Save per-tier solutions if we found them
    let savedTiers = 0;
    if (Object.keys(tierSolutions).length > 0) {
      for (const [tier, tierSols] of Object.entries(tierSolutions)) {
        if (Object.keys(tierSols).length > 0) {
          dbService.saveCodeSolutions(questionId, tierSols, tier);
          savedTiers++;
        }
      }
    }

    // Fall back: if no per-tier data, save flat solutions as optimal
    if (savedTiers === 0 && Object.keys(finalSolutions).length > 0) {
      dbService.saveCodeSolutions(questionId, finalSolutions, 'optimal');
    }

    const updated = dbService.getQuestion(questionId);

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
      updatedSolutionsCount: Object.keys(finalSolutions).length,
      tiersFound: Object.keys(tierSolutions)
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

// ----------------------------------------------------
// 404 & CENTRALIZED ERROR HANDLING
// ----------------------------------------------------
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, error: `API endpoint ${req.method} ${req.originalUrl} not found` });
});

app.use((err, req, res, next) => {
  console.error(`[Unhandled Error] ${req.method} ${req.originalUrl}:`, err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : (err.message || 'Unknown server error')
  });
});

// ----------------------------------------------------
// SERVER LIFECYCLE & GRACEFUL SHUTDOWN
// ----------------------------------------------------
const server = app.listen(PORT, () => {
  console.log(`[AlgoVision API Server] Running on http://localhost:${PORT} (node:sqlite WAL mode)`);
});

function gracefulShutdown(signal) {
  console.log(`\n[AlgoVision API Server] Received ${signal}. Initiating graceful shutdown...`);
  server.close(() => {
    console.log('[AlgoVision API Server] HTTP server closed.');
    try {
      dbService.close();
      console.log('[AlgoVision API Server] SQLite database connection closed cleanly.');
    } catch (err) {
      console.error('[AlgoVision API Server] Error closing database:', err);
    }
    process.exit(0);
  });

  // Force close after 5 seconds if lingering connections exist
  setTimeout(() => {
    console.error('[AlgoVision API Server] Graceful shutdown timed out. Forcing process exit.');
    process.exit(1);
  }, 5000).unref();
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

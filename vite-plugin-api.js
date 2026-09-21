import { dbService } from './server/db.js';

export function algovisionApiPlugin() {
  const setupMiddlewares = (server) => {
    server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        const pathname = url.pathname;

        // Only intercept /api/*
        if (!pathname.startsWith('/api/')) {
          return next();
        }

        res.setHeader('Content-Type', 'application/json');

        // Helper to read JSON request body
        const readBody = () =>
          new Promise((resolve) => {
            let body = '';
            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => {
              try {
                resolve(body ? JSON.parse(body) : {});
              } catch {
                resolve({});
              }
            });
          });

        try {
          // GET /api/questions
          if (pathname === '/api/questions' && req.method === 'GET') {
            const questions = dbService.getAllQuestions();
            return res.end(JSON.stringify({ success: true, data: questions }));
          }

          // GET /api/stats
          if (pathname === '/api/stats' && req.method === 'GET') {
            const stats = dbService.getStats();
            return res.end(JSON.stringify({ success: true, data: stats }));
          }

          // GET /api/admin/stats
          if (pathname === '/api/admin/stats' && req.method === 'GET') {
            const stats = dbService.getAdminStats();
            return res.end(JSON.stringify({ success: true, data: stats }));
          }

          // GET /api/admin/export (JSON Database Backup)
          if (pathname === '/api/admin/export' && req.method === 'GET') {
            const dump = dbService.exportDatabaseDump();
            return res.end(JSON.stringify({ success: true, data: dump }));
          }

          // POST /api/admin/import (Restore Database Backup)
          if (pathname === '/api/admin/import' && req.method === 'POST') {
            const body = await readBody();
            const result = dbService.importDatabaseDump(body.dump || body);
            return res.end(JSON.stringify(result));
          }

          // GET /api/admin/visualizers (List files on disk and bindings)
          if (pathname === '/api/admin/visualizers' && req.method === 'GET') {
            const fs = await import('node:fs');
            const path = await import('node:path');
            const visDir = path.resolve(process.cwd(), 'src', 'visualizers');
            const files = fs.existsSync(visDir)
              ? fs.readdirSync(visDir).filter((f) => (f.endsWith('.jsx') || f.endsWith('.js')) && f !== 'index.js')
              : [];
            return res.end(JSON.stringify({ success: true, files }));
          }

          // POST /api/admin/autolink (Auto-match visualizer files to questions)
          if (pathname === '/api/admin/autolink' && req.method === 'POST') {
            const fs = await import('node:fs');
            const path = await import('node:path');
            const visDir = path.resolve(process.cwd(), 'src', 'visualizers');
            const files = fs.existsSync(visDir)
              ? fs.readdirSync(visDir).filter((f) => (f.endsWith('.jsx') || f.endsWith('.js')) && f !== 'index.js')
              : [];
            const questions = dbService.getAllQuestions();
            let linkedCount = 0;

            for (const f of files) {
              const key = f.replace(/\.(jsx|js)$/, '');
              // Try exact match with question.component_key or matching title/slug
              const match = questions.find((q) => {
                const slugMatch = q.slug.toLowerCase().replace(/[^a-z0-9]/g, '');
                const titleMatch = q.title.toLowerCase().replace(/[^a-z0-9]/g, '');
                const keyLower = key.toLowerCase();
                return keyLower.includes(slugMatch) || keyLower.includes(titleMatch) || q.component_key === key;
              });
              if (match && match.component_key !== key) {
                dbService.updateQuestion(match.id, { component_key: key });
                linkedCount++;
              }
            }
            return res.end(JSON.stringify({ success: true, linkedCount }));
          }

          // SOLUTION REPORTS API
          // POST /api/reports - Create report
          if (pathname === '/api/reports' && req.method === 'POST') {
            const body = await readBody();
            const result = dbService.createReport(body);
            return res.end(JSON.stringify(result));
          }

          // GET /api/reports - List reports
          if (pathname === '/api/reports' && req.method === 'GET') {
            const status = url.searchParams.get('status') || null;
            const reports = dbService.getReports(status);
            return res.end(JSON.stringify({ success: true, data: reports }));
          }

          // PATCH or DELETE /api/reports/:id
          const repMatch = pathname.match(/^\/api\/reports\/(\d+)$/);
          if (repMatch) {
            const repId = parseInt(repMatch[1], 10);
            if (req.method === 'PATCH') {
              const body = await readBody();
              const result = dbService.updateReportStatus(repId, body.status);
              return res.end(JSON.stringify(result));
            }
            if (req.method === 'DELETE') {
              const result = dbService.deleteReport(repId);
              return res.end(JSON.stringify(result));
            }
          }

          // GET /api/solutions/:id/all-tiers
          const allTiersMatch = pathname.match(/^\/api\/solutions\/([^/]+)\/all-tiers$/);
          if (allTiersMatch && req.method === 'GET') {
            const qId = decodeURIComponent(allTiersMatch[1]);
            const tiersMap = dbService.getCodeSolutionsByTier(qId);
            return res.end(JSON.stringify({ success: true, data: tiersMap }));
          }

          // GET /api/solutions/:id?tier=optimal
          const solMatch = pathname.match(/^\/api\/solutions\/([^/]+)$/);
          if (solMatch) {
            const qId = decodeURIComponent(solMatch[1]);
            if (req.method === 'GET') {
              const tier = url.searchParams.get('tier') || null;
              const solutions = dbService.getCodeSolutions(qId, tier);
              return res.end(JSON.stringify({ success: true, data: solutions }));
            }
            if (req.method === 'POST' || req.method === 'PUT') {
              const body = await readBody();
              dbService.saveCodeSolutions(qId, body.solutions || body, body.approachTier || 'optimal');
              return res.end(JSON.stringify({ success: true }));
            }
          }

          // GET/PATCH/DELETE /api/questions/:id
          const qMatch = pathname.match(/^\/api\/questions\/([^/]+)$/);
          if (qMatch) {
            const qId = decodeURIComponent(qMatch[1]);

            if (req.method === 'GET') {
              const q = dbService.getQuestion(qId);
              if (!q) {
                res.statusCode = 404;
                return res.end(JSON.stringify({ error: 'Question not found' }));
              }
              return res.end(JSON.stringify({ success: true, data: q }));
            }

            if (req.method === 'PATCH' || req.method === 'PUT') {
              const body = await readBody();
              const updated = dbService.updateQuestion(qId, body);
              return res.end(JSON.stringify({ success: true, data: updated }));
            }

            if (req.method === 'DELETE') {
              const result = dbService.deleteQuestion(qId);
              return res.end(JSON.stringify(result));
            }
          }

          // POST /api/notes/:id
          const noteMatch = pathname.match(/^\/api\/notes\/([^/]+)$/);
          if (noteMatch && req.method === 'POST') {
            const qId = decodeURIComponent(noteMatch[1]);
            const body = await readBody();
            dbService.saveNotes(qId, body.content || '');
            return res.end(JSON.stringify({ success: true }));
          }

          // POST /api/questions/bulk-import
          if (pathname === '/api/questions/bulk-import' && req.method === 'POST') {
            const body = await readBody();
            const result = dbService.bulkImportQuestions(body.questions || []);
            return res.end(JSON.stringify(result));
          }

          // POST /api/reviews
          if (pathname === '/api/reviews' && req.method === 'POST') {
            const body = await readBody();
            const result = dbService.recordReview(body.userId, body.questionId, body.confidence);
            return res.end(JSON.stringify(result));
          }

          // GET /api/reviews/due
          if (pathname === '/api/reviews/due' && req.method === 'GET') {
            const userId = url.searchParams.get('userId');
            const dueList = dbService.getDueReviews(userId);
            return res.end(JSON.stringify({ success: true, data: dueList }));
          }

          // POST /api/questions (Add question)
          if (pathname === '/api/questions' && req.method === 'POST') {
            const body = await readBody();
            const created = dbService.addQuestion(body.question, body.solutions || {});
            return res.end(JSON.stringify({ success: true, data: created }));
          }

          // GET /api/health
          if (pathname === '/api/health' && req.method === 'GET') {
            return res.end(JSON.stringify({ status: 'ok', engine: 'node:sqlite', timestamp: new Date().toISOString() }));
          }

          // AUTH & USER ROUTES
          if (pathname === '/api/auth/register' && req.method === 'POST') {
            const body = await readBody();
            try {
              const user = dbService.registerUser(body.username, body.password, body.displayName, body.avatar);
              return res.end(JSON.stringify({ success: true, user }));
            } catch (err) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ success: false, error: err.message }));
            }
          }

          if (pathname === '/api/auth/login' && req.method === 'POST') {
            const body = await readBody();
            try {
              const user = dbService.loginUser(body.username, body.password);
              return res.end(JSON.stringify({ success: true, user }));
            } catch (err) {
              res.statusCode = 401;
              return res.end(JSON.stringify({ success: false, error: err.message }));
            }
          }

          const authMeMatch = pathname.match(/^\/api\/auth\/me\/([^/]+)$/);
          if (authMeMatch && req.method === 'GET') {
            const userId = decodeURIComponent(authMeMatch[1]);
            const user = dbService.getUser(userId);
            if (!user) {
              res.statusCode = 404;
              return res.end(JSON.stringify({ success: false, error: 'User not found' }));
            }
            return res.end(JSON.stringify({ success: true, user }));
          }

          if (pathname === '/api/users' && req.method === 'GET') {
            const users = dbService.getAllUsers();
            return res.end(JSON.stringify({ success: true, data: users }));
          }

          const userStatsMatch = pathname.match(/^\/api\/users\/([^/]+)\/stats$/);
          if (userStatsMatch && req.method === 'GET') {
            const userId = decodeURIComponent(userStatsMatch[1]);
            const stats = dbService.getUserStats(userId);
            return res.end(JSON.stringify({ success: true, data: stats }));
          }

          const userProgressMatch = pathname.match(/^\/api\/users\/([^/]+)\/progress$/);
          if (userProgressMatch && req.method === 'GET') {
            const userId = decodeURIComponent(userProgressMatch[1]);
            const progress = dbService.getUserProgress(userId);
            return res.end(JSON.stringify({ success: true, data: progress }));
          }

          const userProgressPatchMatch = pathname.match(/^\/api\/users\/([^/]+)\/progress\/([^/]+)$/);
          if (userProgressPatchMatch && (req.method === 'PATCH' || req.method === 'POST' || req.method === 'PUT')) {
            const userId = decodeURIComponent(userProgressPatchMatch[1]);
            const questionId = decodeURIComponent(userProgressPatchMatch[2]);
            const body = await readBody();
            const result = dbService.updateUserProgress(userId, questionId, body);
            return res.end(JSON.stringify({ success: true, data: result }));
          }

          // PRIVATE NOTES API (Both /api/users/:uid/private-notes/:qid and /api/users/:uid/notes/:qid)
          const privateNoteMatch = pathname.match(/^\/api\/users\/([^/]+)\/(?:private-notes|notes)\/([^/]+)$/);
          if (privateNoteMatch) {
            const userId = decodeURIComponent(privateNoteMatch[1]);
            const questionId = decodeURIComponent(privateNoteMatch[2]);

            if (req.method === 'GET') {
              const content = dbService.getPrivateNote(userId, questionId);
              return res.end(JSON.stringify({ success: true, data: { content } }));
            }

            if (req.method === 'POST' || req.method === 'PUT') {
              const body = await readBody();
              const result = dbService.savePrivateNote(userId, questionId, body.content || '');
              return res.end(JSON.stringify({ success: true, data: result }));
            }
          }

          // COMMENTS API
          const commentsMatch = pathname.match(/^\/api\/questions\/([^/]+)\/comments$/);
          if (commentsMatch) {
            const questionId = decodeURIComponent(commentsMatch[1]);
            if (req.method === 'GET') {
              const comments = dbService.getComments(questionId);
              return res.end(JSON.stringify({ success: true, data: comments }));
            }
            if (req.method === 'POST') {
              const body = await readBody();
              const comment = dbService.addComment({
                questionId,
                userId: body.userId || 'usr_guest',
                username: body.username || 'Anonymous Coder',
                avatar: body.avatar || '⚡',
                content: body.content || ''
              });
              return res.end(JSON.stringify({ success: true, data: comment }));
            }
          }

          const commentUpvoteMatch = pathname.match(/^\/api\/comments\/([^/]+)\/upvote$/);
          if (commentUpvoteMatch && req.method === 'POST') {
            const commentId = parseInt(commentUpvoteMatch[1], 10);
            const updated = dbService.upvoteComment(commentId);
            return res.end(JSON.stringify({ success: true, data: updated }));
          }

          const commentDeleteMatch = pathname.match(/^\/api\/comments\/([^/]+)$/);
          if (commentDeleteMatch && req.method === 'DELETE') {
            const commentId = parseInt(commentDeleteMatch[1], 10);
            const body = await readBody();
            const result = dbService.deleteComment(commentId, body.userId);
            return res.end(JSON.stringify({ success: true, data: result }));
          }

          // PUBLIC NOTES API
          const publicNotesMatch = pathname.match(/^\/api\/questions\/([^/]+)\/public-notes$/);
          if (publicNotesMatch) {
            const questionId = decodeURIComponent(publicNotesMatch[1]);
            if (req.method === 'GET') {
              const notes = dbService.getPublicNotes(questionId);
              return res.end(JSON.stringify({ success: true, data: notes }));
            }
            if (req.method === 'POST') {
              const body = await readBody();
              const note = dbService.addOrUpdatePublicNote({
                questionId,
                userId: body.userId || 'usr_guest',
                username: body.username || 'Anonymous Coder',
                avatar: body.avatar || '⚡',
                title: body.title || 'Key Intuition',
                content: body.content || ''
              });
              return res.end(JSON.stringify({ success: true, data: note }));
            }
          }

          const publicNoteUpvoteMatch = pathname.match(/^\/api\/public-notes\/([^/]+)\/upvote$/);
          if (publicNoteUpvoteMatch && req.method === 'POST') {
            const noteId = parseInt(publicNoteUpvoteMatch[1], 10);
            const updated = dbService.upvotePublicNote(noteId);
            return res.end(JSON.stringify({ success: true, data: updated }));
          }

          // EXPORT STUDY SHEET API: GET /api/export/:id
          const exportMatch = pathname.match(/^\/api\/export\/([^/]+)$/);
          if (exportMatch && req.method === 'GET') {
            const qId = decodeURIComponent(exportMatch[1]);
            const q = dbService.getQuestion(qId);
            if (!q) {
              res.statusCode = 404;
              return res.end(JSON.stringify({ error: 'Question not found' }));
            }
            const solutions = dbService.getCodeSolutions(qId);
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
${solutions.typescript || solutions.javascript || '// No TypeScript solution'}
\`\`\`

---
*Generated by AlgoVision Studio Open-Source Platform*
`;
            res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
            res.setHeader('Content-Disposition', `attachment; filename="${q.slug || q.id}_study_sheet.md"`);
            return res.end(markdown);
          }

          // POST /api/upload-visualizer
          if (pathname === '/api/upload-visualizer' && req.method === 'POST') {
            const body = await readBody();
            const { questionId, componentKey, code, userId: _userId, solutions: providedSolutions } = body;
            if (!questionId || !code) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ success: false, error: 'questionId and code are required' }));
            }
            const key = componentKey || 'Visualizer_' + questionId.replace(/[^a-zA-Z0-9]/g, '');
            const fs = await import('node:fs');
            const path = await import('node:path');
            const filePath = path.resolve(process.cwd(), 'src', 'visualizers', `${key}.jsx`);
            fs.writeFileSync(filePath, code, 'utf8');

            // Extract solutions from code
            const solutions = {};
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
              } catch {}
            }

            const cppVar = code.match(/export\s+const\s+(?:code_cpp|cppCode|cppSolution)\s*=\s*[`"']([\s\S]*?)[`"'];/);
            if (cppVar && !solutions.cpp) solutions.cpp = cppVar[1].trim();

            const pyVar = code.match(/export\s+const\s+(?:code_python|pythonCode|pySolution)\s*=\s*[`"']([\s\S]*?)[`"'];/);
            if (pyVar && !solutions.python) solutions.python = pyVar[1].trim();

            const javaVar = code.match(/export\s+const\s+(?:code_java|javaCode|javaSolution)\s*=\s*[`"']([\s\S]*?)[`"'];/);
            if (javaVar && !solutions.java) solutions.java = javaVar[1].trim();

            const jsVar = code.match(/export\s+const\s+(?:code_javascript|jsCode|jsSolution)\s*=\s*[`"']([\s\S]*?)[`"'];/);
            if (jsVar && !solutions.javascript) solutions.javascript = jsVar[1].trim();

            const finalSolutions = {
              ...(providedSolutions || {}),
              ...solutions
            };

            const updated = dbService.updateVisualizer(questionId, key, finalSolutions);
            return res.end(JSON.stringify({
              success: true,
              componentKey: key,
              data: updated,
              updatedSolutionsCount: Object.keys(finalSolutions).length
            }));
          }

          res.statusCode = 404;
          res.end(JSON.stringify({ error: 'Route not found' }));
        } catch (err) {
          console.error('API middleware error:', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
  };

  return {
    name: 'algovision-api-plugin',
    configureServer: setupMiddlewares,
    configurePreviewServer: setupMiddlewares
  };
}

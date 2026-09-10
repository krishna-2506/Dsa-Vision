import { dbService } from './server/db.js';

export function algovisionApiPlugin() {
  return {
    name: 'algovision-api-plugin',
    configureServer(server) {
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

          // GET /api/solutions/:id
          const solMatch = pathname.match(/^\/api\/solutions\/([^/]+)$/);
          if (solMatch && req.method === 'GET') {
            const qId = decodeURIComponent(solMatch[1]);
            const solutions = dbService.getCodeSolutions(qId);
            return res.end(JSON.stringify({ success: true, data: solutions }));
          }

          // GET /api/questions/:id
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
          }

          // POST /api/notes/:id
          const noteMatch = pathname.match(/^\/api\/notes\/([^/]+)$/);
          if (noteMatch && req.method === 'POST') {
            const qId = decodeURIComponent(noteMatch[1]);
            const body = await readBody();
            dbService.saveNotes(qId, body.content || '');
            return res.end(JSON.stringify({ success: true }));
          }

          // POST /api/questions (Add question)
          if (pathname === '/api/questions' && req.method === 'POST') {
            const body = await readBody();
            const created = dbService.addQuestion(body.question, body.solutions || {});
            return res.end(JSON.stringify({ success: true, data: created }));
          }

          // POST /api/upload-visualizer
          if (pathname === '/api/upload-visualizer' && req.method === 'POST') {
            const body = await readBody();
            const { questionId, componentKey, code } = body;
            if (!questionId || !code) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ success: false, error: 'questionId and code are required' }));
            }
            const key = componentKey || 'Visualizer_' + questionId.replace(/[^a-zA-Z0-9]/g, '');
            const fs = await import('node:fs');
            const path = await import('node:path');
            const filePath = path.resolve(process.cwd(), 'src', 'visualizers', `${key}.jsx`);
            fs.writeFileSync(filePath, code, 'utf8');
            const updated = dbService.updateVisualizer(questionId, key);
            return res.end(JSON.stringify({ success: true, componentKey: key, data: updated }));
          }

          res.statusCode = 404;
          res.end(JSON.stringify({ error: 'Route not found' }));
        } catch (err) {
          console.error('API middleware error:', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    }
  };
}

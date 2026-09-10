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

          // POST /api/upload-visualizer
          if (pathname === '/api/upload-visualizer' && req.method === 'POST') {
            const body = await readBody();
            const { questionId, componentKey, code, userId, solutions: providedSolutions } = body;
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
    }
  };
}

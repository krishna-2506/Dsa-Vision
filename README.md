# AlgoVision Studio

Step-by-step algorithm visualizer for Striver's A2Z DSA sheet. 369 problems, animated playback, multi-language solutions, XP tracking — all running locally on SQLite.

No cloud. No auth service. No BS.

---

## What it does

Open any problem → watch the algorithm animate frame-by-frame → read the code alongside it → take notes → mark it done. Repeat for 369 problems.

If a visualizer doesn't exist for a problem yet, there's a built-in prompt generator that creates the right Gemini/ChatGPT prompt. Paste the response back, upload the `.jsx`, done — it hot-reloads instantly.

---

## Stack

- **React 19** + **Vite 8** — frontend
- **TailwindCSS v4** — styling
- **Express 5** — local API server on `:3001`
- **`node:sqlite`** — Node 22's built-in SQLite, zero native compilation
- **canvas-confetti**, **lucide-react** — animations and icons

> Requires **Node.js v22+** because of `node:sqlite`. Check with `node -v`.

---

## Getting started

### Windows

```batch
setup.bat   # installs deps, seeds DB, validates build
run.bat     # starts both servers, opens browser
```

That's it. Two terminal windows open (API on `:3001`, Vite on `:5173`), browser launches automatically.

### Everyone else

```bash
npm install
node server/import-strivers.js    # seed the DB once

# then two terminals:
npm run server   # Express API
npm run dev      # Vite dev server
```

Open `http://localhost:5173`.

---

## Demo accounts

Seeded automatically during setup:

| username | password |
|---|---|
| `krishna` | `password123` |
| `demo_coder` | `password123` |

Or register your own from the navbar.

---

## How to use

### Library

The home screen is a filterable grid of all 369 problems. You can search by title, problem number, or tag. Filter by category, difficulty, status, or show only favorites. Clicking a tag on any card filters the whole library by it.

Cards show time/space complexity, whether a visualizer exists, and a quick status selector.

### Studio

Click **Launch Studio** on any card. URL becomes `#studio/{id}`, so the back button works and links are shareable.

**Visualizer panel**
- Play/pause with speed control (0.5×–3×)
- Step forward/back manually
- Loop toggle for repeated watch

**Code panel**
- C++, Python, Java, TypeScript tabs
- Three layout modes: visualizer only, code only, or split side-by-side

**Knowledge Hub** (below the main panel)
- Discussion — threaded comments, upvotes
- Public Notes — shared intuitions anyone on the machine can read
- Private Notes — your personal scratchpad, saved per user per problem

Other things in the studio: export the problem as a Markdown study sheet, navigate to prev/next problems, quick-jump to any problem by name, link out to LeetCode.

### Adding a visualizer

Problems without one show `○ Upload Ready`. In the studio:

1. Click **Upload Visualizer**
2. Copy the generated AI prompt (it's pre-filled with the problem's context and the exact component shape the app expects)
3. Paste into Gemini / ChatGPT / Claude, copy the response
4. Paste or drag-drop the `.jsx` into the uploader
5. Hit **Upload & Activate**

Vite hot-reloads it immediately. No restart needed.

### Adding your own problem

**+ Add Question** in the library header. Accepts title, category, difficulty, complexities, LeetCode URL, description, approach, tags, and code in all four languages.

### Gemini Skill

**⟡ Gemini Skill** in the navbar exports a `.md` skill file you can paste into Gemini's system prompt. It encodes the exact visualizer architecture — layer structure, color tokens, required exports — so generated components are drop-in compatible without edits.

### XP & profile

Mark a problem **In Progress** (+10 XP) or **Mastered** (+25 XP). The dashboard shows your level, XP bar, streak, contributions (visualizers you've uploaded), and a side-by-side comparison against any other user.

---

## Writing a visualizer

Drop a `.jsx` file into `src/visualizers/`. It auto-registers via `import.meta.glob` — no imports to update.

The component must export three things:

```jsx
export const meta = {
  display_id: 'Q-001',
  title: 'Two Sum II',
  category: '1. Arrays',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
  description: 'Find two numbers in a sorted array that add to a target.'
};

export const steps = [
  {
    title: 'Initialize pointers',
    codeLine: 1,
    code: 'int left = 0, right = n - 1;',
    explanation: 'Left starts at index 0, right at n−1.',
    // any extra state your canvas needs
    left: 0,
    right: 5,
  },
  // ...
];

export default function TwoSumVisualizer({ currentStep, onStepChange }) {
  const step = steps[currentStep];
  return (
    <div className="bg-[#08090e] rounded-xl p-6">
      {/* your canvas */}
    </div>
  );
}
```

Then set `component_key` on the question in SQLite to match the filename (without `.jsx`).

---

## Offline behavior

If you skip `npm run server`, the Vite plugin (`vite-plugin-api.js`) serves API calls from an in-memory store. The app is fully usable for browsing — filters, search, navigation all work. But writes (status changes, notes, comments) are lost on refresh. Run the server if you want persistence.

---

## Project layout

```
├── data/algovision.sqlite        ← your database, back this up
├── server/
│   ├── db.js                     ← all queries + schema
│   ├── index.js                  ← Express API (:3001)
│   └── import-strivers.js        ← seeds 369 problems + demo users
├── src/
│   ├── App.jsx
│   ├── components/               ← UI components
│   ├── visualizers/              ← drop .jsx files here to register them
│   └── services/                 ← api.js, auth.js, db.js (fallback)
├── vite-plugin-api.js            ← in-process API fallback for offline use
├── setup.bat
└── run.bat
```

---

## API

All endpoints are served by Express on `:3001` (or the Vite plugin in dev).

```
GET    /api/health
POST   /api/auth/register
POST   /api/auth/login
GET    /api/questions
GET    /api/questions/:id
PATCH  /api/questions/:id
POST   /api/questions
GET    /api/solutions/:id
GET    /api/stats
GET    /api/users
GET    /api/users/:id/stats
GET    /api/users/:id/progress
PATCH  /api/users/:id/progress/:questionId
GET    /api/questions/:id/comments
POST   /api/questions/:id/comments
POST   /api/comments/:id/upvote
DELETE /api/comments/:id
GET    /api/questions/:id/public-notes
POST   /api/questions/:id/public-notes
POST   /api/public-notes/:id/upvote
GET    /api/users/:uid/private-notes/:qid
POST   /api/users/:uid/private-notes/:qid
POST   /api/upload-visualizer
GET    /api/export/:id
```

---

## Known rough edges

- **Passwords** — make sure `db.js` is actually hashing before sharing this publicly.
- **`gemini-code-*.jsx` files** — timestamped AI artifacts that accumulate in `src/visualizers/`. Worth cleaning up or renaming after upload.
- **Offline writes** — there's no warning when the server is down. Silent data loss is confusing. A small banner would fix this.
- **Mobile** — the studio layout is desktop-first. Doesn't work well on small screens.

---

## Ideas worth building

- **Spaced repetition** — resurface problems you haven't touched in a while based on solve date
- **Flashcard mode** — hide solution, try to recall, then flip
- **Mock interview timer** — per-problem stopwatch
- **Progress export** — download your full solve history as JSON or CSV
- **LAN access** — bind the Express server to `0.0.0.0` so you can use it from your phone

---

## License

MIT

<div align="center">

# ⚡ AlgoVision Studio
### Next-Generation Interactive DSA & LeetCode Visual Engineering Platform

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express 5](https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![SQLite WAL](https://img.shields.io/badge/SQLite-WAL%20Mode-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/wal.html)
[![Striver A2Z](https://img.shields.io/badge/Striver%20A2Z-100%25%20(450%2F450)-FF6D00?style=for-the-badge&logo=codeforces&logoColor=white)](https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  <b>450/450 Striver A2Z DSA Sheet Problems • 450 Interactive Visualizers • Multi-Educator Video Streams • Dual-Article Editorial Hub • Production High-Concurrency SQLite WAL Engine</b>
</p>

[Quick Start](#-quick-start) • [Architecture](#-production-architecture) • [Features](#-core-capabilities) • [Visualizer Engine](#-visualizer-engine) • [Gemini Pipeline](#-gemini-spark-research-pipeline) • [API Reference](#-backend-api-reference)

---

</div>

## 🌟 Overview

**AlgoVision Studio** is an open-source, full-stack interactive algorithm learning platform engineered for serious competitive programmers and technical interview candidates. 

Unlike traditional static question sheets, AlgoVision bridges the gap between abstract theoretical logic and cognitive intuition by pairing **100% of the 450 Striver A2Z Sheet problems** with:
1. **Interactive Step-by-Step Canvas Visualizers** with micro-stepped timeline playback.
2. **Multi-Tier Solution Architecture** (Intuitive Brute-Force, Better, and Optimal) in C++, Java, Python, and TypeScript.
3. **Curated Multi-Educator Video Streams** (Striver / Take U Forward, NeetCode, Abdul Bari).
4. **Dual-Editorial Knowledge Hub** integrating comprehensive Take U Forward articles, GeeksforGeeks references, and community discussions.
5. **High-Concurrency SQLite Backend** running in Write-Ahead Logging (`WAL`) mode with cryptographic token authentication, IP rate limiting, and SRS (Spaced Repetition System) scheduling.

---

## 🚀 Key Highlights & Numbers

| Metric | Specification | Status |
| :--- | :--- | :--- |
| **Curriculum Coverage** | 100% of Striver A2Z Sheet (All 18 Steps) | ✅ Complete (450 / 450 Problems) |
| **Interactive Visualizers** | Custom animated Canvas components | ✅ 450 Dynamic React Components |
| **Multi-Tier Code Codecs** | Intuitive, Better, Optimal tiers (C++, Java, Python, JS) | ✅ Built-in Multi-Tier Viewer |
| **Multi-Educator Video** | Take U Forward, NeetCode, Abdul Bari | ✅ Embedded Instant Switcher |
| **Editorial Coverage** | TUF Articles + GeeksforGeeks + Discussions | ✅ Markdown Reader & Knowledge Hub |
| **Database Engine** | Embedded `node:sqlite` in WAL Mode | ✅ High Concurrency (Zero Compilation) |
| **Security & Auth** | HMAC-SHA256 session tokens + Timing-Safe Hashes | ✅ OWASP-hardened & Rate-Limited |
| **SRS Retention Engine** | SuperMemo SM-2 Interval Review Algorithm | ✅ Daily Review Queues & Streaks |

---

## 🏛️ Production Architecture

AlgoVision Studio is designed for blazingly fast local execution, seamless offline portability, and frictionless scalability for high-traffic multi-user deployments.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       AlgoVision Frontend (React 19 + Vite 8)               │
│                                                                             │
│   ┌───────────────────┐ ┌───────────────────┐ ┌─────────────────────────┐  │
│   │   Library Grid    │ │   Studio Engine   │ │  Article Editorial Hub  │  │
│   │ 450 Cards, Filters│ │ Canvas Visualizer │ │ TUF + GFG Multi-Stream  │  │
│   │ SRS Spaced Review │ │ Multi-Tier Code   │ │ Notes & Comments Hub    │  │
│   └───────────────────┘ └───────────────────┘ └─────────────────────────┘  │
│                                 │                                           │
│                 REST Client with Bearer HMAC Token Auth                     │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │ HTTP / JSON
┌─────────────────────────────────▼───────────────────────────────────────────┐
│                    Production Backend (Node 22/24 + Express 5)              │
│                                                                             │
│   ┌──────────────────────────────────────────────────────────────────────┐  │
│   │ Security Middleware: CORS, CSP/XSS Headers, Token-Bucket Rate Limiter│  │
│   └──────────────────────────────────────────────────────────────────────┘  │
│   ┌───────────────────┐ ┌───────────────────┐ ┌─────────────────────────┐  │
│   │   Auth & Users    │ │  Question Engine  │ │   Leaderboard & SRS     │  │
│   │ HMAC-SHA256 Token │ │ 450 Problem Cache │ │ SM-2 Review Scheduler   │  │
│   │ Timing-Safe Equal │ │ Multi-Tier Sols   │ │ User Difficulty Metrics │  │
│   └───────────────────┘ └───────────────────┘ └─────────────────────────┘  │
│                                 │ Synchronous Low-Latency C-API             │
│   ┌─────────────────────────────▼────────────────────────────────────────┐  │
│   │            Native SQLite Engine (PRAGMA journal_mode = WAL)          │  │
│   │       - High-speed concurrent readers without writer blocking        │  │
│   │       - 64MB In-Memory Cache (PRAGMA cache_size = -64000)            │  │
│   │       - 5,000ms Busy Lock Wait (PRAGMA busy_timeout = 5000)          │  │
│   └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Core Capabilities

### 1. The Interactive Algorithm Studio
- **Micro-Stepped Timeline Controls**: Play, pause, scrub forward/backward, and adjust playback speeds (0.5× to 3.0×).
- **Synchronized State Inspection**: Highlighting active pointers ($L, R$), visited sets, priority queues, binary tree nodes, or DP tables in sync with execution.
- **Code & Visualizer Split Views**: Choose between Visualizer-Only, Code-Only, or Responsive Side-by-Side split layout.
- **Export Study Sheets**: Instantly download complete offline Markdown study sheets containing problem descriptions, invariants, and solutions in 4 languages.

### 2. Multi-Tier Code Solutions
Every problem supports multi-tiered solution approaches to teach progressive algorithmic optimization:
- 🥉 **Intuitive (Brute Force)**: Simple, brute-force foundation showing why naive solutions exceed time limits.
- 🥈 **Better**: Intermediate optimizations (e.g. hashing, two pointers, prefix sums) reducing asymptotic bounds.
- 🥇 **Optimal**: The gold-standard interview solution achieving theoretical lower bounds with detailed space-time proof.
- **Language Tabs**: Switch between **C++**, **Java**, **Python 3**, and **JavaScript/TypeScript** with single-click clipboard copying.

### 3. Multi-Educator Video Player
Integrated directly into the problem studio and article pages:
- **Take U Forward (Striver)**: Masterclass conceptual walkthroughs and standard interview explanations.
- **NeetCode**: Concise pattern recognition, edge-case breakdowns, and visual walkthroughs.
- **Abdul Bari**: Foundational algorithmic analysis, recursion trees, and theoretical rigor.
- **Zero Distractions**: Seamlessly embedded without YouTube recommendations, ads, or platform clutter.

### 4. Problem Article Hub
- **Side-by-Side Dual Articles**: Toggle between Striver's comprehensive written articles and GeeksforGeeks alternate approaches.
- **Interactive Markdown Renderer**: Rich math notation, code blocks, tabular breakdowns, and visual flowcharts.
- **Direct LeetCode & GFG Outbound Links**: One-click jump to official coding platforms to submit solutions and run test cases.

### 5. Gamification & Spaced Repetition (SRS)
- **Level & XP Progression**: Earn XP for exploring, making progress (+10 XP), and mastering (+25 XP) algorithms. Advance from Level 1 (*Novice Coder*) to Level 6 (*Grandmaster Algorithmicist*).
- **Streak Tracker**: Tracks daily consecutive problem-solving habits.
- **SuperMemo SM-2 Engine**: Problems are automatically scheduled for spaced review (1-day, 3-day, 7-day, 14-day, and 30-day intervals) based on confidence ratings (*Review Needed*, *Good*, *Mastered*).
- **Global Leaderboard**: Live ranking across registered learners based on XP, solved problem counts, and streak length.

---

## 🔬 Gemini Spark Research Pipeline

AlgoVision includes an autonomous research pipeline that queries Google's Gemini Spark model to continuously discover and enrich alternative video solutions, high-grade articles, and code optimizations for all 450 problems:

```bash
# Research Batch 1 (Problems 1 to 25)
node scripts/gemini_spark_batch_runner.js 1 25

# Ingest research results directly into SQLite database
node scripts/ingest_research_results.js
```

### Research Ingestion Schema:
- Structured JSON output with strict schema validation.
- Auto-merges alternate YouTube videos, GeeksforGeeks articles, and optimal approaches.
- Built-in verification reporting available via the **Admin Control Panel** (`#admin`).

---

## ⚡ Quick Start

### Prerequisites
- **Node.js 22.x or 24.x** (Node 22+ is required for the native zero-dependency `node:sqlite` engine).
- Verify version with: `node -v`

### Windows (1-Click Launch)
```batch
setup.bat   # Installs dependencies, initializes SQLite WAL DB, validates build
run.bat     # Launches API Server (:3001) + Vite UI (:5173) and opens your browser
```

### macOS / Linux / Manual
```bash
# 1. Install dependencies
npm install

# 2. Seed database with full 450 Striver A2Z problems (if not already seeded)
node server/import-strivers.js

# 3. Start the Express API server (Terminal 1)
npm run server

# 4. Start the Vite development frontend (Terminal 2)
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 👤 Default Accounts

The database comes pre-seeded with test accounts:

| Username | Password | Role | Features Available |
| :--- | :--- | :--- | :--- |
| `krishna` | `password123` | Administrator | Full access, Admin panel, visualizer upload |
| `demo_coder` | `password123` | Learner | Progress tracking, SRS queues, private notes |

*New users can also self-register instantly from the navigation bar.*

---

## 🛠️ Visualizer Development Guide

Adding a custom visualizer is fully modular. Just create a `.jsx` component in `src/visualizers/`. Vite's `import.meta.glob` discovers and hot-reloads it automatically!

### Example Component Template:

```jsx
import React from 'react';

export const meta = {
  display_id: 'Q-001',
  title: 'Two Sum II - Input Array Is Sorted',
  category: '1. Arrays',
  difficulty: 'Medium',
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(1)',
  leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
  description: 'Find two numbers in a 1-indexed sorted array that sum to target.'
};

export const steps = [
  {
    title: 'Initialize Pointers',
    codeLine: 1,
    code: 'int left = 0, right = n - 1;',
    explanation: 'Set left pointer at start (0) and right pointer at end (n - 1).',
    left: 0,
    right: 4,
    sum: 17,
    status: 'comparing'
  },
  {
    title: 'Sum Greater than Target',
    codeLine: 4,
    code: 'if (currentSum > target) right--;',
    explanation: 'Current sum (17) > target (9). Decrement right pointer to reduce sum.',
    left: 0,
    right: 3,
    sum: 13,
    status: 'move_right'
  },
  {
    title: 'Target Found',
    codeLine: 6,
    code: 'return {left + 1, right + 1};',
    explanation: 'Current sum equals target (9). Return 1-based indices.',
    left: 0,
    right: 1,
    sum: 9,
    status: 'found'
  }
];

export default function TwoSumVisualizer({ currentStep, onStepChange }) {
  const step = steps[currentStep] || steps[0];
  const array = [2, 7, 11, 15];

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-950 rounded-2xl border border-slate-800">
      <div className="flex gap-4 mb-6">
        {array.map((val, idx) => {
          const isLeft = idx === step.left;
          const isRight = idx === step.right;
          return (
            <div
              key={idx}
              className={`w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold border-2 transition-all ${
                isLeft || isRight
                  ? 'border-cyan-400 bg-cyan-950/60 text-cyan-200 scale-110 shadow-lg shadow-cyan-500/20'
                  : 'border-slate-800 bg-slate-900/60 text-slate-300'
              }`}
            >
              {val}
            </div>
          );
        })}
      </div>
      <div className="text-sm font-mono text-cyan-400 bg-cyan-950/40 px-4 py-2 rounded-lg border border-cyan-800/40">
        Left: [{step.left}] • Right: [{step.right}] • Current Sum: {step.sum}
      </div>
    </div>
  );
}
```

---

## 📡 Backend API Reference

Base URL: `http://localhost:3001`

### Authentication & User System
| Method | Endpoint | Auth | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/auth/register` | Rate-Limited | Register new account (returns HMAC session token) |
| `POST` | `/api/auth/login` | Rate-Limited | Authenticate user credentials & receive session token |
| `POST` | `/api/auth/profile` | Bearer | Update user display name and avatar icon |
| `POST` | `/api/auth/change-password` | Bearer | Change user password securely |
| `GET` | `/api/auth/me/:id` | Public | Retrieve public user profile and level data |
| `GET` | `/api/leaderboard` | Public | Retrieve global XP leaderboard (supports `?limit=50`) |
| `GET` | `/api/users/:id/analytics` | Public | Breakdown of user progress across difficulty & categories |

### Questions & Curriculum
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/questions` | List all 450 curriculum questions with metadata |
| `GET` | `/api/questions/:id` | Retrieve single question details, videos, and articles |
| `GET` | `/api/questions/:id/markdown` | Download formatted markdown study sheet |
| `POST` | `/api/questions` | Add a custom problem to the curriculum |
| `PATCH` | `/api/questions/:id` | Update metadata or component key |
| `DELETE` | `/api/questions/:id` | Remove question from curriculum |

### Multi-Tier Solutions
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/solutions/:questionId` | Get solution code for specific approach tier (`?tier=optimal`) |
| `GET` | `/api/solutions/:questionId/all-tiers` | Retrieve intuitive, better, and optimal solution sets |
| `POST` | `/api/solutions/:questionId` | Save multi-tier solution code (C++, Java, Python, TS) |

### Spaced Repetition (SRS) & Progress
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/users/:id/progress` | Get all completed and in-progress problems for user |
| `PATCH` | `/api/users/:id/progress/:questionId` | Update completion status, notes, and favorite state |
| `POST` | `/api/reviews` | Record SM-2 review rating (`again`, `good`, `mastered`) |
| `GET` | `/api/reviews/due` | Get questions currently due for review (`?userId=...`) |

### Discussions & Community Notes
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/questions/:id/comments` | Retrieve threaded discussion comments |
| `POST` | `/api/questions/:id/comments` | Post a discussion comment |
| `POST` | `/api/comments/:id/upvote` | Upvote a discussion comment |
| `GET` | `/api/questions/:id/public-notes` | Get community shared intuition notes |
| `POST` | `/api/questions/:id/public-notes` | Publish community intuition note |
| `GET` | `/api/users/:id/private-notes/:questionId`| Get personal private scratchpad notes |
| `POST` | `/api/users/:id/private-notes/:questionId`| Save personal private scratchpad notes |

### System & Administration
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Healthcheck returning engine, WAL journal mode, and uptime |
| `GET` | `/api/admin/stats` | Global system, question, visualizer, and user metrics |
| `GET` | `/api/admin/export` | Export complete database JSON dump for backup |
| `POST` | `/api/admin/import` | Restore database from exported JSON dump |
| `POST` | `/api/admin/autolink` | Scan `src/visualizers/` and autolink unmapped questions |
| `POST` | `/api/admin/bulk-update-research` | Bulk ingest Gemini Spark research results into SQLite |

---

## 🗄️ Database Architecture & Performance

AlgoVision uses Node 22's native `node:sqlite` engine running with enterprise-grade PRAGMA settings:

```sql
PRAGMA journal_mode = WAL;         -- Non-blocking concurrent readers during writes
PRAGMA synchronous = NORMAL;       -- Safe crash-resilient disk writes with maximum throughput
PRAGMA busy_timeout = 5000;        -- 5-second automatic retry queue on concurrent lock contention
PRAGMA cache_size = -64000;        -- 64MB dedicated in-memory page cache
PRAGMA foreign_keys = ON;          -- Strict referential integrity enforcement
```

### Relational Schema Summary:
- `questions`: 450 rows containing problem metadata, Striver Step/Substep mapping, LeetCode URLs, complexity specs, video playlists, and article markdown.
- `code_solutions`: Multi-tier solutions (intuitive, better, optimal) keyed by `(question_id, approach_tier)`.
- `users`: User profiles, PBKDF2/SHA256 password hashes, XP, levels, and consecutive day streaks.
- `user_progress`: Per-user completion states, SM-2 spaced repetition dates, intervals, and review metrics.
- `comments`: Community threaded discussions with upvote counters.
- `public_notes`: Community shared architectural insights.
- `private_notes`: Encrypted-at-rest personal scratchpad notes per student.
- `solution_reports`: Issue tracking and bug reporting queue.

---

## 🤝 Contributing

Contributions are welcome! Whether you are:
- Building an animated visualizer for a complex Dynamic Programming or Graph problem,
- Adding language solutions (Go, Rust, Kotlin), or
- Improving curriculum article notes:

1. Fork the repository.
2. Create your branch: `git checkout -b feature/awesome-visualizer`
3. Commit your changes: `git commit -m 'feat: Add Topological Sort Visualizer'`
4. Push to your branch: `git push origin feature/awesome-visualizer`
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <b>Built with ⚡ by Krishna and the Open-Source DSA Community</b><br>
  <i>Empowering engineers worldwide to master algorithms with intuitive visual clarity.</i>
</div>

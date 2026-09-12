
const fs = require('fs');
const path = require('path');

const filePath = path.resolve('src/components/VisualizerStudio.jsx');
let c = fs.readFileSync(filePath, 'utf8');

// ── 1. Remove the useless caption line ──────────────────────────────────────
// Removes: <div className="caption flex items-center justify-between"> ... </div>
// It's between the return() opening and the Zone 1 card
c = c.replace(
  /\s*\{\/\* Caption line \*\/\}\s*<div className="caption flex[^>]*>[^]*?<\/div>\s*\n/,
  '\n'
);

// ── 2. Fix problem description — remove max-h-36 overflow-y-auto constraint,
//    make it a clean readable block that expands naturally ─────────────────────
c = c.replace(
  /className="text-\[12\.5px\] text-\[var\(--chalk-dim\)\] leading-relaxed whitespace-pre-wrap max-h-36 overflow-y-auto font-sans bg-\[var\(--board\)\] p-3\.5 rounded border border-\[var\(--line\)\]"/,
  'className="text-[12.5px] text-[var(--chalk-dim)] leading-relaxed whitespace-pre-wrap font-sans bg-[var(--board)] p-3.5 rounded border border-[var(--line)] max-h-48 overflow-y-auto"'
);

// ── 3. Replace approach toggle — make it look like a proper section header ────
c = c.replace(
  /<button\s+onClick=\{\(\) => setShowApproach\(!showApproach\)\}\s+className="text-\[11\.5px\] font-mono text-\[var\(--amber\)\] hover:underline flex items-center gap-1 cursor-pointer"\s*>\s*<span>\{showApproach \? '▾' : '▸'\}<\/span>\s*<span>\{showApproach \? 'Hide Approach & Invariants' : 'Show Approach & Invariants'\}<\/span>\s*<\/button>\s*\{showApproach && \(\s*<div className="mt-2 p-3 rounded bg-\[var\(--board-raised-2\)\] border border-\[var\(--line\)\] text-\[12\.5px\] text-\[var\(--chalk-dim\)\] leading-relaxed whitespace-pre-wrap font-sans">\s*\{question\.approach \|\| 'Standard optimal approach\.'\}\s*<\/div>\s*\)\}/,
  `<button
            onClick={() => setShowApproach(!showApproach)}
            className="flex items-center gap-1.5 text-[11.5px] font-mono text-[var(--chalk-faint)] hover:text-[var(--amber)] transition-colors cursor-pointer"
          >
            <span className="text-[10px]">{showApproach ? '▾' : '▸'}</span>
            <span className="font-medium">{showApproach ? 'Hide approach & hints' : 'Show approach & hints'}</span>
          </button>
          {showApproach && (
            <div className="approach-panel fade-in">
              {question.approach || 'Standard optimal approach.'}
            </div>
          )}`
);

// ── 4. Fix Spaced Repetition buttons — replace emoji with clean conf-btn style ─
c = c.replace(
  /\{\/\* Spaced Repetition Rater \*\/\}\s*<div className="flex items-center gap-1\.5 flex-wrap">\s*<span className="text-\[var\(--chalk-faint\)\] mr-1">Spaced Rep:<\/span>\s*<button\s+onClick=\{\(\) => handleReviewConfidence\('mastered'\)\}\s+className="px-2 py-0\.5 rounded bg-\[var\(--board-raised-2\)\] hover:bg-\[var\(--board-hover\)\] text-\[var\(--easy\)\] border border-\[var\(--line\)\] transition flex items-center gap-1"\s+title="Mark Mastered \(Interval extended\)"\s*>\s*<span>🟢<\/span> <span>Mastered<\/span>\s*<\/button>\s*<button\s+onClick=\{\(\) => handleReviewConfidence\('practicing'\)\}\s+className="px-2 py-0\.5 rounded bg-\[var\(--board-raised-2\)\] hover:bg-\[var\(--board-hover\)\] text-\[var\(--amber\)\] border border-\[var\(--line\)\] transition flex items-center gap-1"\s+title="Review in 3 days"\s*>\s*<span>🟡<\/span> <span>Review 3d<\/span>\s*<\/button>\s*<button\s+onClick=\{\(\) => handleReviewConfidence\('struggling'\)\}\s+className="px-2 py-0\.5 rounded bg-\[var\(--board-raised-2\)\] hover:bg-\[var\(--board-hover\)\] text-\[\#e06c75\] border border-\[var\(--line\)\] transition flex items-center gap-1"\s+title="Reset to 1 day"\s*>\s*<span>🔴<\/span> <span>Reset<\/span>\s*<\/button>\s*\{reviewSaved && \(\s*<span className="text-\[var\(--easy\)\] px-1 font-bold animate-pulse">✓ Saved<\/span>\s*\)\}\s*<\/div>/,
  `{/* Spaced Repetition Rater */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-mono text-[var(--chalk-faint)]">How well did you recall?</span>
            <button onClick={() => handleReviewConfidence('mastered')} className="conf-btn mastered" title="I remembered it perfectly — interval extended">
              <span>✓</span> <span>Got it</span>
            </button>
            <button onClick={() => handleReviewConfidence('practicing')} className="conf-btn practicing" title="I needed hints — review in 3 days">
              <span>~</span> <span>Shaky</span>
            </button>
            <button onClick={() => handleReviewConfidence('struggling')} className="conf-btn struggling" title="I forgot — reset to 1 day">
              <span>✗</span> <span>Forgot</span>
            </button>
            {reviewSaved && (
              <span className="text-[var(--easy)] text-[11px] font-mono font-medium fade-in">✓ Saved</span>
            )}
          </div>`
);

// ── 5. Add step progress bar above the ticks row ────────────────────────────
// Find the navrow opening and prepend the progress bar
c = c.replace(
  /\{\/\* ── Navrow Footer \(Ticks \+ Transport Controls \+ Nav Buttons\) ── \*\/\}\s*<div className="navrow">/,
  `{/* ── Step progress bar ── */}
        <div className="step-progress-track" style={{ margin: '0' }}>
          <div
            className="step-progress-fill"
            style={{ width: \`\${maxSteps > 1 ? (currentStep / (maxSteps - 1)) * 100 : 100}%\` }}
          />
        </div>

        {/* ── Navrow Footer (Ticks + Transport Controls + Nav Buttons) ── */}
        <div className="navrow">`
);

// ── 6. Add playing class to active tick for pulse animation ─────────────────
c = c.replace(
  /className=\{`tick \$\{cls\}`\}/,
  'className={`tick ${cls}${cls === \'now\' && isPlaying ? \' playing\' : \'\'}`}'
);

// ── 7. Add keyboard shortcut hints to transport buttons ─────────────────────
// Play/Pause button — add <kbd>Space</kbd>
c = c.replace(
  /<button\s+onClick=\{togglePlay\}\s+className="navbtn font-medium"\s+style=\{\{ color: isPlaying \? 'var\(--amber\)' : undefined \}\}\s+title="Play \/ Pause \(Space\)"\s*>/,
  `<button
              onClick={togglePlay}
              className="navbtn font-medium"
              style={{ color: isPlaying ? 'var(--amber)' : undefined }}
              title="Play / Pause (Space)"
            >`
);

// ── 8. Fix the hub — completely replace off-theme classes ────────────────────
// Comments tab section
const oldCommentForm = `<form onSubmit={handlePostComment} className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <span className="w-5 h-5 rounded bg-indigo-600/30 flex items-center justify-center text-xs">
                  {currentUser?.avatar || '⚡'}
                </span>
                <span>Posting as <strong>{currentUser?.username || 'Guest'}</strong></span>
                <span className="text-indigo-400 ml-auto">+10 XP Bonus</span>
              </div>
              <textarea
                rows={2}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ask a question, share an observation, or discuss edge cases..."
                className="w-full p-3 bg-[#08090e] border border-white/10 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition resize-none font-sans"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isPostingComment || !newComment.trim()}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white text-xs font-semibold shadow transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isPostingComment ? 'Posting...' : 'Post Comment'}</span>
                </button>
              </div>
            </form>`;

const newCommentForm = `<form onSubmit={handlePostComment} className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--chalk-faint)]">
                <span className="hub-avatar">{currentUser?.avatar || '⚡'}</span>
                <span>Posting as <span className="text-[var(--chalk)] font-medium">{currentUser?.username || 'Guest'}</span></span>
                <span className="text-[var(--teal)] ml-auto">+10 XP on post</span>
              </div>
              <textarea
                rows={2}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ask a question, share an insight, or discuss edge cases…"
                className="hub-textarea"
                style={{ resize: 'none' }}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isPostingComment || !newComment.trim()}
                  className="chalk-btn chalk-btn-amber disabled:opacity-30"
                >
                  <Send className="w-3 h-3" />
                  <span>{isPostingComment ? 'Posting…' : 'Post'}</span>
                </button>
              </div>
            </form>`;

c = c.replace(oldCommentForm, newCommentForm);

// Comment empty state
c = c.replace(
  `<div className="py-10 text-center space-y-1">
                  <p className="text-[12px] text-slate-600">No comments yet — be the first.</p>
                </div>`,
  `<div className="py-12 text-center">
                  <MessageSquare className="w-7 h-7 text-[var(--chalk-faint)] mx-auto mb-2 opacity-50" />
                  <p className="text-[12px] text-[var(--chalk-faint)]">No comments yet — be the first.</p>
                </div>`
);

// Individual comment rendering
c = c.replace(
  `<div key={c.id} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.09] transition space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xs">
                          {c.avatar || '⚡'}
                        </span>
                        <span className="font-bold text-slate-200">{c.username}</span>
                        <span className="text-[10px] text-slate-500">
                          {c.created_at ? new Date(c.created_at).toLocaleDateString() : ''}
                        </span>
                      </div>

                      <button
                        onClick={() => handleUpvoteComment(c.id)}
                        className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.03] hover:bg-indigo-600/20 text-slate-400 hover:text-indigo-300 border border-white/5 transition"
                        title="Upvote comment"
                      >
                        <ThumbsUp className="w-3 h-3 text-indigo-400" />
                        <span className="text-[11px] font-bold">{c.upvotes || 0}</span>
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-wrap pl-8">
                      {c.content}
                    </p>
                  </div>`,
  `<div key={c.id} className="hub-comment space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="hub-avatar">{c.avatar || '⚡'}</span>
                        <span className="text-[12px] font-medium text-[var(--chalk)]">{c.username}</span>
                        <span className="text-[10.5px] font-mono text-[var(--chalk-faint)]">
                          {c.created_at ? new Date(c.created_at).toLocaleDateString() : ''}
                        </span>
                      </div>
                      <button
                        onClick={() => handleUpvoteComment(c.id)}
                        className="hub-upvote"
                        title="Upvote"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span className="font-bold">{c.upvotes || 0}</span>
                      </button>
                    </div>
                    <p className="text-[12.5px] text-[var(--chalk-dim)] font-sans leading-relaxed whitespace-pre-wrap pl-8">
                      {c.content}
                    </p>
                  </div>`
);

// ── 9. Fix public notes tab ─────────────────────────────────────────────────
c = c.replace(
  `<span className="text-slate-400 text-xs font-sans">
                Community-shared intuitions, pattern breakdowns, and common interview mistakes.
              </span>`,
  `<span className="text-[11.5px] text-[var(--chalk-faint)] font-sans">
                Community intuitions, pattern breakdowns, interview tricks
              </span>`
);
c = c.replace(
  `className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold transition"`,
  `className="chalk-btn"`
);
c = c.replace(
  `<span>{showAddPublicNote ? 'Cancel' : 'Share Public Note (+25 XP)'}</span>`,
  `<span>{showAddPublicNote ? 'Cancel' : 'Share Note'}</span>`
);

// Public note form
c = c.replace(
  `className="p-4 rounded-xl bg-[#08090e] border border-emerald-500/30 space-y-3 animate-in fade-in duration-150"`,
  `className="p-4 rounded-[4px] bg-[var(--board-raised-2)] border border-[var(--teal)]/30 space-y-3 fade-in"`
);
c = c.replace(
  `className="w-full p-2.5 bg-[#0e111a] border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"`,
  `className="hub-input"`
);
c = c.replace(
  `className="w-full p-2.5 bg-[#0e111a] border border-white/10 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition resize-y font-sans leading-relaxed"`,
  `className="hub-textarea"`
);
c = c.replace(
  `className="px-3 py-1.5 text-slate-400 hover:text-white"`,
  `className="chalk-btn"`
);
c = c.replace(
  `className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 text-white font-semibold shadow transition"`,
  `className="chalk-btn chalk-btn-amber disabled:opacity-30"`
);

// Public notes empty state
c = c.replace(
  `<div className="py-10 text-center">
                  <p className="text-[12px] text-slate-600">No public notes yet.</p>
                </div>`,
  `<div className="py-12 text-center">
                  <BookOpen className="w-7 h-7 text-[var(--chalk-faint)] mx-auto mb-2 opacity-50" />
                  <p className="text-[12px] text-[var(--chalk-faint)]">No notes yet — share the first insight.</p>
                </div>`
);

// Individual public note cards
c = c.replace(
  `<div
                    key={note.id}
                    className="p-4 rounded-xl bg-[#08090e]/90 border border-white/5 space-y-2 hover:border-white/15 transition"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xs">
                          {note.avatar || '⚡'}
                        </span>
                        <div>
                          <h4 className="font-bold text-white text-xs">{note.title || 'Algorithmic Insight'}</h4>
                          <span className="text-[10px] text-slate-500">by {note.username}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleUpvotePublicNote(note.id)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.03] hover:bg-emerald-600/20 text-slate-400 hover:text-emerald-300 border border-white/5 transition"
                        title="Upvote public note"
                      >
                        <ThumbsUp className="w-3 h-3 text-emerald-400" />
                        <span className="text-[11px] font-bold">{note.upvotes || 0}</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-wrap pt-1 pl-8">
                      {note.content}
                    </p>
                  </div>`,
  `<div key={note.id} className="note-card space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="hub-avatar teal">{note.avatar || '⚡'}</span>
                        <div>
                          <h4 className="text-[12.5px] font-medium text-[var(--chalk)]">{note.title || 'Algorithmic Insight'}</h4>
                          <span className="text-[10.5px] font-mono text-[var(--chalk-faint)]">by {note.username}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleUpvotePublicNote(note.id)}
                        className="hub-upvote"
                        title="Helpful"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span className="font-bold">{note.upvotes || 0}</span>
                      </button>
                    </div>
                    <p className="text-[12.5px] text-[var(--chalk-dim)] font-sans leading-relaxed whitespace-pre-wrap pl-8">
                      {note.content}
                    </p>
                  </div>`
);

// ── 10. Fix private notes tab ────────────────────────────────────────────────
c = c.replace(
  `<span className="text-[11px] font-mono text-slate-500">
                Private to @{currentUser?.username || 'you'}
              </span>`,
  `<span className="text-[11px] font-mono text-[var(--chalk-faint)]">
                Private to @{currentUser?.username || 'you'} · stored locally
              </span>`
);
c = c.replace(
  `className="flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded text-xs font-mono transition"`,
  `className="chalk-btn"`
);
c = c.replace(
  `className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded text-xs font-mono font-medium transition"`,
  `className="chalk-btn chalk-btn-amber"`
);
c = c.replace(
  `className="w-full p-3.5 bg-[#08090e]/80 border border-white/10 rounded-lg text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-500/50 leading-relaxed transition resize-y"`,
  `className="hub-textarea font-mono"`
);
c = c.replace(
  `<div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>🔒 Private to your account in local SQLite database</span>
              <span className="text-amber-400/80">Press 'Save Private Notes' to commit</span>
            </div>`,
  `<div className="flex items-center justify-between text-[11px] font-mono text-[var(--chalk-faint)]">
              <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Stored locally in SQLite, never sent anywhere</span>
              <span className="text-[var(--amber)] opacity-75">Ctrl+S to save</span>
            </div>`
);

// ── 11. Hub tab counts — fix text-slate-600 ─────────────────────────────────
c = c.replace(
  `<span className="text-slate-600 ml-0.5">({count})</span>`,
  `<span className="text-[var(--chalk-faint)] ml-0.5 font-normal">({count})</span>`
);

fs.writeFileSync(filePath, c, 'utf8');
console.log('VisualizerStudio.jsx patched successfully!');

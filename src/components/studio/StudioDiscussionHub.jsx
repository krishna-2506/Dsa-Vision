import React, { useState } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  Send,
  Plus,
  Lock,
  Download,
  Save,
  Check,
  BookOpen
} from 'lucide-react';
import { api } from '../../services/api';
import { sound } from '../../services/audio';

/**
 * StudioDiscussionHub
 * 
 * Discussion forums, community algorithmic notes, and private local SQLite study scratchpad.
 */
export default function StudioDiscussionHub({
  question,
  currentUser,
  comments = [],
  setComments,
  publicNotes = [],
  setPublicNotes,
  privateNotes = '',
  setPrivateNotes,
  onSavePrivateNotes,
  privateNotesSaved = false,
  onDownloadStudySheet
}) {
  const [hubTab, setHubTab] = useState('comments'); // 'comments' | 'public_notes' | 'private_notes'
  const [newComment, setNewComment] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);

  // Public Notes form state
  const [showAddPublicNote, setShowAddPublicNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isPostingNote, setIsPostingNote] = useState(false);

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setIsPostingComment(true);
    const res = await api.addComment(question.id, {
      userId: currentUser?.id || 'guest',
      username: currentUser?.username || 'Guest',
      avatar: currentUser?.avatar || '⚡',
      content: newComment.trim()
    });
    if (res && res.id) {
      setComments([res, ...comments]);
      setNewComment('');
      sound?.playSuccess?.();
    }
    setIsPostingComment(false);
  };

  const handleUpvoteComment = async (commentId) => {
    await api.upvoteComment(commentId);
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, upvotes: (c.upvotes || 0) + 1 } : c))
    );
    sound?.playStep?.(700);
  };

  const handlePostPublicNote = async (e) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    setIsPostingNote(true);
    const res = await api.addPublicNote(question.id, {
      userId: currentUser?.id || 'guest',
      username: currentUser?.username || 'Guest',
      avatar: currentUser?.avatar || '⚡',
      title: newNoteTitle.trim() || 'Algorithmic Invariant',
      content: newNoteContent.trim()
    });
    if (res && res.id) {
      setPublicNotes([res, ...publicNotes]);
      setNewNoteTitle('');
      setNewNoteContent('');
      setShowAddPublicNote(false);
      sound?.playSuccess?.();
    }
    setIsPostingNote(false);
  };

  const handleUpvotePublicNote = async (noteId) => {
    await api.upvotePublicNote(noteId);
    setPublicNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, upvotes: (n.upvotes || 0) + 1 } : n))
    );
    sound?.playStep?.(700);
  };

  return (
    <div className="rounded-lg border border-[var(--line)] bg-[var(--board-raised)] overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center gap-6 border-b border-[var(--line)] px-4 bg-[var(--board-raised-2)]">
        {[
          ['comments', 'Discussion', comments.length],
          ['public_notes', 'Community Notes', publicNotes.length],
          ['private_notes', 'Private Scratchpad', null]
        ].map(([id, label, count]) => (
          <button
            key={id}
            type="button"
            onClick={() => setHubTab(id)}
            className={`tab-btn ${hubTab === id ? 'active' : ''}`}
          >
            <span>{label}</span>
            {count !== null && (
              <span className="text-[10.5px] font-mono px-1.5 py-0.2 rounded-full bg-[var(--board-raised)] border border-[var(--line)] text-[var(--chalk-dim)] ml-1">
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {hubTab === 'comments' && (
        <div className="p-4 space-y-4">
          <form onSubmit={handlePostComment} className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--chalk-dim)]">
              <span className="w-5 h-5 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-xs">
                {currentUser?.avatar || '⚡'}
              </span>
              <span>
                Comment as <strong className="text-[var(--chalk)] font-medium">@{currentUser?.username || 'Guest'}</strong>
              </span>
              <span className="text-cyan-600 dark:text-cyan-400 ml-auto">+10 XP</span>
            </div>
            <textarea
              rows={2}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ask a question, discuss edge cases, or share an invariant..."
              className="hub-textarea rounded-md text-xs"
              style={{ resize: 'vertical' }}
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isPostingComment || !newComment.trim()}
                className="btn-primary h-7.5 px-3 text-xs disabled:opacity-40"
              >
                <Send className="w-3 h-3" />
                <span>{isPostingComment ? 'Posting…' : 'Comment'}</span>
              </button>
            </div>
          </form>

          <div className="space-y-2.5">
            {comments.length === 0 ? (
              <div className="py-10 text-center space-y-1">
                <MessageSquare className="w-6 h-6 text-[var(--chalk-faint)] mx-auto opacity-50" />
                <p className="text-xs text-[var(--chalk-faint)]">No discussions yet — start the conversation.</p>
              </div>
            ) : (
              comments.map((c) => (
                <div key={c.id} className="p-3 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] space-y-2 hover:border-[var(--line-strong)] transition-all">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs">
                        {c.avatar || '⚡'}
                      </span>
                      <span className="text-xs font-semibold text-[var(--chalk)] hover:underline cursor-pointer">
                        @{c.username}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--chalk-faint)]">
                        {c.created_at ? new Date(c.created_at).toLocaleDateString() : 'recently'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleUpvoteComment(c.id)}
                      className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono text-[var(--chalk-dim)] hover:text-indigo-400 hover:bg-indigo-500/10 border border-[var(--line)] transition-all cursor-pointer"
                      title="Upvote comment"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span className="font-semibold">{c.upvotes || 0}</span>
                    </button>
                  </div>
                  <p className="text-xs text-[var(--chalk-dim)] font-sans leading-relaxed whitespace-pre-wrap pl-7">
                    {c.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {hubTab === 'public_notes' && (
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-[var(--chalk-faint)] font-sans">
              Community intuitions, invariant breakdowns, and interview tricks
            </span>
            <button
              type="button"
              onClick={() => setShowAddPublicNote(!showAddPublicNote)}
              className="btn-secondary h-7 px-2.5 text-xs"
            >
              <Plus className="w-3 h-3" />
              <span>{showAddPublicNote ? 'Cancel' : 'Share Note'}</span>
            </button>
          </div>

          {/* Form to add public note */}
          {showAddPublicNote && (
            <form onSubmit={handlePostPublicNote} className="p-3.5 rounded-md bg-[var(--board-raised-2)] border border-[var(--line-strong)] space-y-2.5 fade-in">
              <input
                type="text"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                placeholder="Note Title: e.g. Invariant: Sliding window boundary condition"
                className="hub-input rounded-md"
                required
              />
              <textarea
                rows={3}
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                placeholder="Write the core algorithmic insight, invariant, or trick to remember..."
                className="hub-textarea rounded-md text-xs"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPublicNote(false)}
                  className="btn-secondary h-7 px-2.5 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPostingNote || !newNoteContent.trim()}
                  className="btn-primary h-7 px-3 text-xs disabled:opacity-40"
                >
                  {isPostingNote ? 'Publishing...' : 'Publish to Community'}
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2.5">
            {publicNotes.length === 0 ? (
              <div className="py-10 text-center space-y-1">
                <BookOpen className="w-6 h-6 text-[var(--chalk-faint)] mx-auto opacity-50" />
                <p className="text-xs text-[var(--chalk-faint)]">No community notes yet — share the first insight.</p>
              </div>
            ) : (
              publicNotes.map((note) => (
                <div key={note.id} className="p-3 rounded-md bg-[var(--board-raised-2)] border border-[var(--line)] space-y-2 hover:border-[var(--line-strong)] transition-all">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">
                        {note.avatar || '⚡'}
                      </span>
                      <div>
                        <h4 className="text-xs font-semibold text-[var(--chalk)]">{note.title || 'Algorithmic Insight'}</h4>
                        <span className="text-[10px] font-mono text-[var(--chalk-faint)]">by @{note.username}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleUpvotePublicNote(note.id)}
                      className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono text-[var(--chalk-dim)] hover:text-cyan-400 hover:bg-cyan-500/10 border border-[var(--line)] transition-all cursor-pointer"
                      title="Mark as helpful"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span className="font-semibold">{note.upvotes || 0}</span>
                    </button>
                  </div>
                  <p className="text-xs text-[var(--chalk-dim)] font-sans leading-relaxed whitespace-pre-wrap pl-7">
                    {note.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {hubTab === 'private_notes' && (
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[var(--chalk-faint)]">
              Private to @{currentUser?.username || 'you'} · stored locally
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onDownloadStudySheet}
                className="chalk-btn"
                title="Download Markdown Study Sheet for revision"
              >
                <Download className="w-3.5 h-3.5 text-indigo-400" />
                <span>Export Study Sheet (.md)</span>
              </button>

              <button
                type="button"
                onClick={onSavePrivateNotes}
                className="chalk-btn chalk-btn-amber"
              >
                {privateNotesSaved ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
                <span>{privateNotesSaved ? 'Saved to SQLite' : 'Save Private Notes'}</span>
              </button>
            </div>
          </div>

          <textarea
            rows={4}
            value={privateNotes}
            onChange={(e) => setPrivateNotes(e.target.value)}
            placeholder="Write your private notes, loop invariants, base cases, memory nuances, or college exam tips..."
            className="hub-textarea font-mono"
          />

          <div className="flex items-center justify-between text-[11px] font-mono text-[var(--chalk-faint)]">
            <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Stored locally in SQLite, never sent anywhere</span>
            <span className="text-[var(--amber)] opacity-75">Ctrl+S to save</span>
          </div>
        </div>
      )}
    </div>
  );
}

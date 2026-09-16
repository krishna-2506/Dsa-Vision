// Client API layer communicating with native SQLite backend via /api/*

function getAuthHeaders(extra = {}) {
  const headers = { 'Content-Type': 'application/json', ...extra };
  try {
    const token = localStorage.getItem('algovision_auth_token_v1') ||
      JSON.parse(localStorage.getItem('algovision_active_user_v1') || '{}')?.token;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  } catch (e) {
    // Ignore localStorage parse errors in non-browser environments
  }
  return headers;
}

export const api = {
  async getQuestions() {
    try {
      const res = await fetch('/api/questions');
      const json = await res.json();
      if (json.success) return json.data;
    } catch (e) {
      console.warn('SQLite API fetch failed, falling back to local storage', e);
    }
    return null;
  },

  async getQuestion(id) {
    try {
      const res = await fetch(`/api/questions/${encodeURIComponent(id)}`);
      const json = await res.json();
      if (json.success) return json.data;
    } catch (e) {
      console.warn('Failed to fetch question from SQLite API', e);
    }
    return null;
  },

  async getCodeSolutions(questionId, tier = null) {
    try {
      const url = tier
        ? `/api/solutions/${encodeURIComponent(questionId)}?tier=${encodeURIComponent(tier)}`
        : `/api/solutions/${encodeURIComponent(questionId)}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) return json.data;
    } catch (e) {
      console.warn('Failed to fetch code solutions from SQLite API', e);
    }
    return {};
  },

  async getCodeSolutionsAllTiers(questionId) {
    try {
      const res = await fetch(`/api/solutions/${encodeURIComponent(questionId)}/all-tiers`);
      const json = await res.json();
      if (json.success) return json.data;
    } catch (e) {
      console.warn('Failed to fetch all tiers solutions', e);
    }
    return { intuitive: {}, better: {}, optimal: {} };
  },

  async saveCodeSolutions(questionId, solutions, approachTier = 'optimal') {
    try {
      const res = await fetch(`/api/solutions/${encodeURIComponent(questionId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ solutions, approachTier })
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async deleteQuestion(id) {
    try {
      const res = await fetch(`/api/questions/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async updateQuestion(id, updates) {
    try {
      const res = await fetch(`/api/questions/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const json = await res.json();
      if (json.success) return json.data;
    } catch (e) {
      console.warn('Failed to update question in SQLite', e);
    }
    return null;
  },

  async saveNotes(questionId, content) {
    try {
      const res = await fetch(`/api/notes/${encodeURIComponent(questionId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      const json = await res.json();
      return Boolean(json.success);
    } catch (e) {
      console.warn('Failed to save notes to SQLite', e);
      return false;
    }
  },

  async addQuestion(question, solutions = {}) {
    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, solutions })
      });
      const json = await res.json();
      if (json.success) return json.data;
    } catch (e) {
      console.warn('Failed to add question to SQLite', e);
    }
    return null;
  },

  async getStats() {
    try {
      const res = await fetch('/api/stats');
      const json = await res.json();
      if (json.success) return json.data;
    } catch (e) {
      console.warn('Failed to fetch stats from SQLite', e);
    }
    return null;
  },

  async recordReview(userId, questionId, confidence = 'mastered') {
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, questionId, confidence })
      });
      return await res.json();
    } catch (e) {
      console.warn('Failed to record review', e);
      return { success: false, error: e.message };
    }
  },

  async getDueReviews(userId = null) {
    try {
      const url = userId ? `/api/reviews/due?userId=${encodeURIComponent(userId)}` : '/api/reviews/due';
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) return json.data;
    } catch (e) {
      console.warn('Failed to fetch due reviews', e);
    }
    return [];
  },

  async bulkImportQuestions(questions = []) {
    try {
      const res = await fetch('/api/questions/bulk-import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions })
      });
      return await res.json();
    } catch (e) {
      console.warn('Failed to bulk import questions', e);
      return { success: false, error: e.message };
    }
  },

  async uploadVisualizer({ questionId, componentKey, code, userId }) {
    try {
      const res = await fetch('/api/upload-visualizer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId, componentKey, code, userId })
      });
      return await res.json();
    } catch (e) {
      console.warn('Failed to upload visualizer', e);
      return { success: false, error: e.message };
    }
  },

  // ----------------------------------------------------
  // USER & PROGRESS API (Supabase Ready)
  // ----------------------------------------------------
  async login(username, password) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async register(username, password, displayName, avatar) {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, displayName, avatar })
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async updateProfile({ displayName, avatar }) {
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ displayName, avatar })
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async changePassword(oldPassword, newPassword) {
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ oldPassword, newPassword })
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async getLeaderboard(limit = 50) {
    try {
      const res = await fetch(`/api/leaderboard?limit=${encodeURIComponent(limit)}`);
      const json = await res.json();
      if (json.success) return json.data;
    } catch (e) {
      console.warn('Failed to fetch leaderboard', e);
    }
    return [];
  },

  async getCurrentUser(userId) {
    try {
      const res = await fetch(`/api/auth/me/${encodeURIComponent(userId)}`);
      const json = await res.json();
      if (json.success) return json.user;
    } catch (e) {
      console.warn('Failed to fetch current user', e);
    }
    return null;
  },

  async getAllUsers() {
    try {
      const res = await fetch('/api/users');
      const json = await res.json();
      if (json.success) return json.data;
    } catch (e) {
      console.warn('Failed to fetch users', e);
    }
    return [];
  },

  async getUserStats(userId) {
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(userId)}/stats`);
      const json = await res.json();
      if (json.success) return json.data;
    } catch (e) {
      console.warn('Failed to fetch user stats', e);
    }
    return null;
  },

  async getUserProgress(userId) {
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(userId)}/progress`);
      const json = await res.json();
      if (json.success) return json.data;
    } catch (e) {
      console.warn('Failed to fetch user progress', e);
    }
    return {};
  },

  async getUserAnalytics(userId) {
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(userId)}/analytics`);
      const json = await res.json();
      if (json.success) return json.data;
    } catch (e) {
      console.warn('Failed to fetch user analytics', e);
    }
    return null;
  },

  async updateUserProgress(userId, questionId, updates) {
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(userId)}/progress/${encodeURIComponent(questionId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      return await res.json();
    } catch (e) {
      console.warn('Failed to update user progress', e);
      return { success: false, error: e.message };
    }
  },

  // Comments
  async getComments(questionId) {
    try {
      const res = await fetch(`/api/questions/${encodeURIComponent(questionId)}/comments`);
      const json = await res.json();
      if (json.success) return json.data;
    } catch (e) {
      console.warn('Failed to fetch comments', e);
    }
    return [];
  },

  async addComment(questionId, { userId, username, avatar, content }) {
    try {
      const res = await fetch(`/api/questions/${encodeURIComponent(questionId)}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, username, avatar, content })
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async upvoteComment(commentId) {
    try {
      const res = await fetch(`/api/comments/${encodeURIComponent(commentId)}/upvote`, {
        method: 'POST'
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async deleteComment(commentId, userId) {
    try {
      const res = await fetch(`/api/comments/${encodeURIComponent(commentId)}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  // Public Notes
  async getPublicNotes(questionId) {
    try {
      const res = await fetch(`/api/questions/${encodeURIComponent(questionId)}/public-notes`);
      const json = await res.json();
      if (json.success) return json.data;
    } catch (e) {
      console.warn('Failed to fetch public notes', e);
    }
    return [];
  },

  async addPublicNote(questionId, { userId, username, avatar, title, content }) {
    try {
      const res = await fetch(`/api/questions/${encodeURIComponent(questionId)}/public-notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, username, avatar, title, content })
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async upvotePublicNote(noteId) {
    try {
      const res = await fetch(`/api/public-notes/${encodeURIComponent(noteId)}/upvote`, {
        method: 'POST'
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  // Private Notes
  async getPrivateNote(userId, questionId) {
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(userId)}/private-notes/${encodeURIComponent(questionId)}`);
      const json = await res.json();
      if (json && json.success && json.data) return json.data.content || '';
    } catch (e) {
      console.warn('Failed to fetch private note', e);
    }
    return '';
  },

  async savePrivateNote(userId, questionId, content) {
    try {
      const res = await fetch(`/api/users/${encodeURIComponent(userId)}/private-notes/${encodeURIComponent(questionId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  // Solution Reports
  async submitReport(reportData) {
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData)
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async getReports(status = null) {
    try {
      const url = status ? `/api/reports?status=${encodeURIComponent(status)}` : '/api/reports';
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) return json.data;
    } catch (e) {
      console.warn('Failed to fetch reports', e);
    }
    return [];
  },

  async updateReportStatus(reportId, status) {
    try {
      const res = await fetch(`/api/reports/${encodeURIComponent(reportId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async deleteReport(reportId) {
    try {
      const res = await fetch(`/api/reports/${encodeURIComponent(reportId)}`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  // Admin & Database System
  async getAdminStats() {
    try {
      const res = await fetch('/api/admin/stats');
      const json = await res.json();
      if (json.success) return json.data;
    } catch (e) {
      console.warn('Failed to fetch admin stats', e);
    }
    return null;
  },

  async exportDatabaseDump() {
    try {
      const res = await fetch('/api/admin/export');
      const json = await res.json();
      if (json.success) return json.data;
    } catch (e) {
      console.warn('Failed to export DB dump', e);
    }
    return null;
  },

  async importDatabaseDump(dump) {
    try {
      const res = await fetch('/api/admin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dump })
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async getAdminVisualizers() {
    try {
      const res = await fetch('/api/admin/visualizers');
      const json = await res.json();
      if (json.success) return json.files;
    } catch (e) {
      console.warn('Failed to fetch visualizers list', e);
    }
    return [];
  },

  async autolinkVisualizers() {
    try {
      const res = await fetch('/api/admin/autolink', {
        method: 'POST'
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async checkDisplayId(display_id, exclude_id = null) {
    try {
      const params = new URLSearchParams({ display_id });
      if (exclude_id) params.set('exclude_id', exclude_id);
      const res = await fetch(`/api/admin/check-display-id?${params.toString()}`);
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  async bulkUpdateResearch(items) {
    try {
      const res = await fetch('/api/admin/bulk-update-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items })
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
};

import { api } from './api';

const AUTH_STORAGE_KEY = 'algovision_active_user_v1';
const TOKEN_STORAGE_KEY = 'algovision_auth_token_v1';

export const auth = {
  getToken() {
    try {
      const direct = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (direct) return direct;
      const user = this.getActiveUser();
      return user?.token || '';
    } catch (e) {
      return '';
    }
  },

  setToken(token) {
    try {
      if (!token) {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      } else {
        localStorage.setItem(TOKEN_STORAGE_KEY, token);
      }
    } catch (e) {
      console.warn('Failed to store auth token', e);
    }
  },

  getActiveUser() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to read user session', e);
    }
    // Default fallback demo user
    return {
      id: 'usr_krishna',
      username: 'krishna',
      display_name: 'Krishna',
      avatar: '⚡',
      level: 2,
      title: 'Binary Apprentice',
      xp: 350,
      nextXp: 500,
      streak: 3
    };
  },

  getCurrentUser() {
    return this.getActiveUser();
  },

  login(user) {
    if (user?.token) {
      this.setToken(user.token);
    }
    this.setActiveUser(user);
  },

  setActiveUser(user) {
    if (!user) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    } else {
      if (user.token) {
        this.setToken(user.token);
      }
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    }
  },

  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  },

  async refresh(userId) {
    if (!userId) return null;
    const fresh = await api.getCurrentUser(userId);
    if (fresh) {
      const token = this.getToken();
      const updatedUser = token ? { ...fresh, token } : fresh;
      this.setActiveUser(updatedUser);
      return updatedUser;
    }
    return this.getActiveUser();
  },

  async updateProfile(displayName, avatar) {
    const res = await api.updateProfile({ displayName, avatar });
    if (res && res.success && res.user) {
      const current = this.getActiveUser();
      const merged = { ...current, ...res.user };
      this.setActiveUser(merged);
      return { success: true, user: merged };
    }
    return res || { success: false, error: 'Failed to update profile' };
  },

  async changePassword(oldPassword, newPassword) {
    return await api.changePassword(oldPassword, newPassword);
  }
};

export const authService = auth;


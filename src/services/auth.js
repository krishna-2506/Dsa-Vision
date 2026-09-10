import { api } from './api';

const AUTH_STORAGE_KEY = 'algovision_active_user_v1';

export const auth = {
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
    this.setActiveUser(user);
  },

  setActiveUser(user) {
    if (!user) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } else {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    }
  },

  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  async refresh(userId) {
    if (!userId) return null;
    const fresh = await api.getCurrentUser(userId);
    if (fresh) {
      this.setActiveUser(fresh);
      return fresh;
    }
    return this.getActiveUser();
  }
};

export const authService = auth;

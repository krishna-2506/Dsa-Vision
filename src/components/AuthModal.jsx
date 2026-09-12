import React, { useState } from 'react';
import { X, User, Lock, AlertCircle, LogIn, UserPlus } from 'lucide-react';
import { api } from '../services/api';
import { sound } from '../services/audio';

const AVATARS = ['⚡', '👨‍💻', '🚀', '🦊', '🧙‍♂️', '🎯', '🧠', '💎', '🔥', '🛡️'];

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [avatar, setAvatar] = useState('⚡');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    let res;
    if (mode === 'login') {
      res = await api.login(username, password);
    } else {
      res = await api.register(username, password, displayName || username, avatar);
    }

    setLoading(false);

    if (res.success && res.user) {
      sound.playComplete();
      onAuthSuccess(res.user);
      onClose();
    } else {
      sound.playStep(300);
      setError(res.error || 'Authentication failed. Please check credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0e111a] border border-white/10 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-lg">
              {avatar}
            </div>
            <div>
              <h3 className="font-mono font-bold text-white text-base">
                {mode === 'login' ? 'Welcome Back Coder' : 'Create Coder Profile'}
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                {mode === 'login' ? 'Login to sync streaks and contributions' : 'Track solves, earn XP, and compare stats'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-500 hover:text-white hover:bg-white/5 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-[#08090e] rounded-xl border border-white/5 my-4 font-mono text-xs">
          <button
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition ${
              mode === 'login'
                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login</span>
          </button>
          <button
            onClick={() => { setMode('register'); setError(null); }}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg transition ${
              mode === 'register'
                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Sign Up</span>
          </button>
        </div>

        {/* Error notification */}
        {error && (
          <div className="p-3 mb-4 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center gap-2 text-xs font-mono text-rose-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Pick Avatar</label>
                <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
                  {AVATARS.map((av) => (
                    <button
                      type="button"
                      key={av}
                      onClick={() => setAvatar(av)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-base transition border shrink-0 ${
                        avatar === av
                          ? 'bg-indigo-600/30 border-indigo-500 scale-110 shadow'
                          : 'bg-white/5 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 mb-1">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Krishna"
                  className="w-full px-3 py-2 bg-[#08090e] border border-white/10 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. krishna"
                className="w-full pl-9 pr-3 py-2 bg-[#08090e] border border-white/10 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 bg-[#08090e] border border-white/10 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-mono font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {mode === 'login' ? <LogIn className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
            <span>{loading ? 'Authenticating...' : mode === 'login' ? 'Sign In' : 'Create Account'}</span>
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-white/5 text-center">
          <p className="text-[11px] font-mono text-slate-500">
            {mode === 'login' ? 'New here?' : 'Already have an account?'}{' '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(null); }}
              className="text-indigo-400 hover:text-indigo-300 font-bold underline cursor-pointer"
            >
              {mode === 'login' ? 'Create an account' : 'Sign in instead'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

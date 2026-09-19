import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LibraryView from './components/LibraryView';
import VisualizerStudio from './components/VisualizerStudio';
import ProblemArticlePage from './components/ProblemArticlePage';
import AdminPage from './components/AdminPage';
import SandboxWorkbench from './components/sandbox/SandboxWorkbench';
import SkillExportModal from './components/SkillExportModal';
import AuthModal from './components/AuthModal';
import UserDashboardModal from './components/UserDashboardModal';
import ImportQuestionModal from './components/ImportQuestionModal';
import { api } from './services/api';
import { db } from './services/db';
import { authService } from './services/auth';

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [stats, setStats] = useState(null);
  const [activeView, setActiveView] = useState('library'); // 'library' | 'article' | 'studio' | 'admin'
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);

  // User auth & profile state
  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());
  const [userStats, setUserStats] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [dashboardModalOpen, setDashboardModalOpen] = useState(false);

  // Dual Theme State (Light & Dark Mode)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('algovision_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark'; // default to sleek obsidian dark
  });

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('algovision_theme', nextTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Fetch stats for active user
  const refreshUserStats = async (user) => {
    if (!user) {
      setUserStats(null);
      return;
    }
    const st = await api.getUserStats(user.id);
    if (st) setUserStats(st);
  };

  // Synchronize route from current URL hash or pathname
  const syncRoute = (list = questions) => {
    const hash = window.location.hash;
    const pathname = window.location.pathname;

    if (hash === '#admin' || pathname === '/admin') {
      setActiveView('admin');
      setActiveQuestion(null);
    } else if (hash === '#sandbox' || pathname === '/sandbox') {
      setActiveView('sandbox');
      setActiveQuestion(null);
    } else if (hash.startsWith('#article/') || pathname.startsWith('/article/')) {
      const qId = hash.startsWith('#article/')
        ? hash.replace('#article/', '')
        : pathname.replace('/article/', '');
      const matched = list.find((q) => q.id === qId || q.slug === qId);
      if (matched) {
        setActiveQuestion(matched);
        setActiveView('article');
      }
    } else if (hash.startsWith('#studio/') || pathname.startsWith('/studio/')) {
      const qId = hash.startsWith('#studio/')
        ? hash.replace('#studio/', '')
        : pathname.replace('/studio/', '');
      const matched = list.find((q) => q.id === qId || q.slug === qId);
      if (matched) {
        setActiveQuestion(matched);
        setActiveView('studio');
      }
    } else {
      setActiveView('library');
      setActiveQuestion(null);
    }
  };

  // Load questions and apply user progress
  const loadData = async () => {
    let list = await api.getQuestions();
    let st = await api.getStats();

    if (!list || list.length === 0) {
      list = db.getQuestions();
      st = db.getStats();
    }

    // Merge active user's progress if logged in
    const active = authService.getCurrentUser();
    if (active) {
      const userProg = await api.getUserProgress(active.id);
      if (userProg && userProg.length > 0) {
        const progMap = new Map(userProg.map((p) => [p.question_id, p.status]));
        list = list.map((q) => {
          if (progMap.has(q.id)) {
            return { ...q, status: progMap.get(q.id) };
          }
          return q;
        });
      }
      refreshUserStats(active);
    }

    setQuestions(list);
    setStats(st);
    syncRoute(list);
  };

  useEffect(() => {
    loadData();

    const handleHashChange = () => {
      syncRoute(questions);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [questions.length]);

  // Navigation handlers
  const handleOpenStudio = (question) => {
    setActiveQuestion(question);
    setActiveView('studio');
    window.location.hash = `#studio/${question.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenArticle = (question) => {
    setActiveQuestion(question);
    setActiveView('article');
    window.location.hash = `#article/${question.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdmin = (questionId = null) => {
    if (questionId) {
      const q = questions.find((item) => item.id === questionId);
      if (q) setActiveQuestion(q);
    }
    setActiveView('admin');
    window.location.hash = '#admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSandbox = () => {
    setActiveView('sandbox');
    setActiveQuestion(null);
    window.location.hash = '#sandbox';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLibrary = () => {
    setActiveView('library');
    setActiveQuestion(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = async (id) => {
    const q = questions.find((item) => item.id === id);
    if (q) {
      const newFav = !q.is_favorite;
      await api.updateQuestion(id, { is_favorite: newFav });
      setQuestions((prev) =>
        prev.map((item) => (item.id === id ? { ...item, is_favorite: newFav } : item))
      );
      if (activeQuestion && activeQuestion.id === id) {
        setActiveQuestion((prev) => ({ ...prev, is_favorite: newFav }));
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    // 1. Update general question status in DB
    await api.updateQuestion(id, { status: newStatus });

    // 2. If user is logged in, sync their user_progress and earn XP
    if (currentUser) {
      await api.updateUserProgress(currentUser.id, id, { status: newStatus });
      refreshUserStats(currentUser);
    }

    setQuestions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (activeQuestion && activeQuestion.id === id) {
      setActiveQuestion((prev) => ({ ...prev, status: newStatus }));
    }
    const st = await api.getStats();
    if (st) setStats(st);
  };

  const handleUpdateQuestion = (updatedQ) => {
    setQuestions((prev) =>
      prev.map((item) => (item.id === updatedQ.id ? updatedQ : item))
    );
    setActiveQuestion(updatedQ);
    if (currentUser) {
      refreshUserStats(currentUser);
    }
  };

  const handleLoginSuccess = (user) => {
    authService.login(user);
    setCurrentUser(user);
    refreshUserStats(user);
    loadData();
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setUserStats(null);
  };

  return (
    <div className="min-h-screen bg-[#0d0e12] text-[#f2f3f5] flex flex-col font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        activeQuestion={activeQuestion}
        onNavigateHome={handleBackToLibrary}
        stats={stats}
        onOpenSkillModal={() => setSkillModalOpen(true)}
        currentUser={currentUser}
        userStats={userStats}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onOpenDashboardModal={() => setDashboardModalOpen(true)}
        onOpenAdminModal={() => handleOpenAdmin(activeQuestion?.id)}
        onNavigateSandbox={handleOpenSandbox}
        questions={questions}
        onNavigateQuestion={handleOpenArticle}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Container */}
      <main className="flex-1">
        {activeView === 'admin' ? (
          <AdminPage
            onNavigateHome={handleBackToLibrary}
            onNavigateQuestion={handleOpenStudio}
            onNavigateArticle={handleOpenArticle}
            initialQuestionId={activeQuestion?.id}
          />
        ) : activeView === 'sandbox' ? (
          <SandboxWorkbench />
        ) : activeView === 'article' && activeQuestion ? (
          <ProblemArticlePage
            question={activeQuestion}
            onBack={handleBackToLibrary}
            onLaunchStudio={handleOpenStudio}
            onStatusChange={handleStatusChange}
            onToggleFavorite={handleToggleFavorite}
            onOpenAdmin={(qId) => handleOpenAdmin(qId)}
            currentUser={currentUser}
          />
        ) : activeView === 'studio' && activeQuestion ? (
          <VisualizerStudio
            question={activeQuestion}
            onBack={handleBackToLibrary}
            onStatusChange={handleStatusChange}
            onUpdateQuestion={handleUpdateQuestion}
            currentUser={currentUser}
            questions={questions}
            onNavigateQuestion={handleOpenStudio}
          />
        ) : (
          <LibraryView
            questions={questions}
            onOpenQuestion={handleOpenStudio}
            onOpenArticle={handleOpenArticle}
            onToggleFavorite={handleToggleFavorite}
            onStatusChange={handleStatusChange}
            onOpenImportModal={() => setImportModalOpen(true)}
            onOpenAdmin={() => handleOpenAdmin()}
            onOpenSandbox={handleOpenSandbox}
          />
        )}
      </main>

      {/* Import & Add Questions Modal */}
      <ImportQuestionModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        onImportSuccess={() => loadData()}
      />

      {/* Gemini Skill Modal */}
      <SkillExportModal
        isOpen={skillModalOpen}
        onClose={() => setSkillModalOpen(false)}
      />

      {/* Auth Modal (Login / Sign Up) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* User Dashboard & Stats & Friends Modal */}
      <UserDashboardModal
        isOpen={dashboardModalOpen}
        onClose={() => setDashboardModalOpen(false)}
        currentUser={currentUser}
        userStats={userStats}
        onLogout={handleLogout}
        onRefreshStats={() => refreshUserStats(currentUser)}
        onOpenQuestion={(qId) => {
          const matched = questions.find((q) => q.id === qId);
          if (matched) handleOpenArticle(matched);
        }}
      />

      {/* Clean Sleek Footer */}
      <footer className="border-t border-[#1e2029] bg-[#111217] py-6 text-center text-xs font-mono text-[#5b5e6e]">
        <span>AlgoVision Studio Pro • Powered by Native SQLite &amp; Striver A2Z Curriculum</span>
      </footer>
    </div>
  );
}
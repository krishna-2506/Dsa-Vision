import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LibraryView from './components/LibraryView';
import VisualizerStudio from './components/VisualizerStudio';
import ProblemArticlePage from './components/ProblemArticlePage';
import AdminPage from './components/AdminPage';
import SandboxWorkbench from './components/sandbox/SandboxWorkbench';
import StepTheoryPage from './components/StepTheoryPage';
import SkillExportModal from './components/SkillExportModal';
import AuthModal from './components/AuthModal';
import UserDashboardModal from './components/UserDashboardModal';
import ImportQuestionModal from './components/ImportQuestionModal';
import FocusModal from './components/focus/FocusModal';
import { api } from './services/api';
import { db } from './services/db';
import { authService } from './services/auth';

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [stats, setStats] = useState(null);
  const [activeView, setActiveView] = useState('library'); // 'library' | 'article' | 'studio' | 'admin' | 'sandbox' | 'theory'
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [activeTheoryStep, setActiveTheoryStep] = useState(1);
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
    const rawHash = window.location.hash || '';
    const pathname = window.location.pathname || '';
    const cleanHash = rawHash.replace(/^#\/?/, '');

    const findMatchingQuestion = (rawInput) => {
      if (!rawInput) return null;
      const cleanId = decodeURIComponent(rawInput).trim();
      const normalizedCleanId = cleanId.toLowerCase().replace(/[-_]/g, ' ').trim();
      return list.find((q) => {
        if (!q) return false;
        if (q.id === cleanId || q.slug === cleanId) return true;
        if (q.title && q.title.toLowerCase() === cleanId.toLowerCase()) return true;
        const normalizedTitle = (q.title || '').toLowerCase().replace(/[-_]/g, ' ').trim();
        const normalizedSlug = (q.slug || q.id || '').toLowerCase().replace(/[-_]/g, ' ').trim();
        return normalizedTitle === normalizedCleanId || normalizedSlug === normalizedCleanId;
      }) || null;
    };

    if (cleanHash.startsWith('admin/') || pathname.startsWith('/admin/')) {
      const rawId = cleanHash.startsWith('admin/')
        ? cleanHash.replace('admin/', '')
        : pathname.replace('/admin/', '');
      const matched = findMatchingQuestion(rawId);
      setActiveView('admin');
      if (matched) {
        setActiveQuestion(matched);
      }
    } else if (cleanHash === 'admin' || pathname === '/admin') {
      setActiveView('admin');
      setActiveQuestion(null);
    } else if (cleanHash === 'sandbox' || pathname === '/sandbox') {
      setActiveView('sandbox');
      setActiveQuestion(null);
    } else if (cleanHash.startsWith('article/') || pathname.startsWith('/article/')) {
      const rawId = cleanHash.startsWith('article/')
        ? cleanHash.replace('article/', '')
        : pathname.replace('/article/', '');
      const matched = findMatchingQuestion(rawId);
      if (matched) {
        setActiveQuestion(matched);
        setActiveView('article');
      }
    } else if (cleanHash.startsWith('studio/') || pathname.startsWith('/studio/')) {
      const rawId = cleanHash.startsWith('studio/')
        ? cleanHash.replace('studio/', '')
        : pathname.replace('/studio/', '');
      const matched = findMatchingQuestion(rawId);
      if (matched) {
        setActiveQuestion(matched);
        setActiveView('studio');
      }
    } else if (cleanHash.startsWith('theory/') || pathname.startsWith('/theory/')) {
      const stepStr = cleanHash.startsWith('theory/')
        ? cleanHash.replace('theory/', '')
        : pathname.replace('/theory/', '');
      const stepNo = parseInt(stepStr, 10) || 1;
      setActiveTheoryStep(stepNo);
      setActiveView('theory');
      setActiveQuestion(null);
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

  const handleOpenAdmin = (targetOrId = null) => {
    let target = null;
    if (targetOrId && typeof targetOrId === 'object') {
      target = targetOrId;
    } else if (targetOrId) {
      const cleanId = String(targetOrId).trim();
      const normalizedCleanId = cleanId.toLowerCase().replace(/[-_]/g, ' ').trim();
      target = questions.find((q) => {
        if (!q) return false;
        if (q.id === cleanId || q.slug === cleanId) return true;
        if (q.title && q.title.toLowerCase() === cleanId.toLowerCase()) return true;
        const normalizedTitle = (q.title || '').toLowerCase().replace(/[-_]/g, ' ').trim();
        const normalizedSlug = (q.slug || q.id || '').toLowerCase().replace(/[-_]/g, ' ').trim();
        return normalizedTitle === normalizedCleanId || normalizedSlug === normalizedCleanId;
      }) || (activeQuestion && (activeQuestion.id === targetOrId || activeQuestion.slug === targetOrId) ? activeQuestion : null);
    } else if (activeQuestion) {
      target = activeQuestion;
    }

    setActiveQuestion(target);
    setActiveView('admin');
    if (target) {
      window.location.hash = `#admin/${target.id}`;
    } else if (targetOrId) {
      window.location.hash = `#admin/${targetOrId}`;
    } else {
      window.location.hash = '#admin';
    }
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

  const handleOpenStepTheory = (stepNo) => {
    setActiveTheoryStep(stepNo);
    setActiveView('theory');
    setActiveQuestion(null);
    window.location.hash = `#theory/${stepNo}`;
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

  // Initialize Scroll Reveal Intersection Observer for Dark Luxury micro-animations
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((x) => {
          if (!x.isIntersecting) return;
          const delay = Number(x.target.dataset.delay) || 0;
          setTimeout(() => x.target.classList.add('visible'), delay);
          obs.unobserve(x.target);
        });
      },
      { threshold: 0.08 }
    );

    const elements = document.querySelectorAll('.reveal:not(.visible)');
    elements.forEach((el) => {
      if (el.parentElement) {
        const siblings = Array.from(el.parentElement.querySelectorAll('.reveal'));
        if (!el.dataset.delay) el.dataset.delay = String(siblings.indexOf(el) * 90);
      }
      obs.observe(el);
    });

    return () => obs.disconnect();
  }, [activeView, activeQuestion]);

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] flex flex-col font-sans transition-colors duration-200 selection:bg-[#d4a03c]/20 selection:text-[#f0ebe0]">
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
        onOpenAdminModal={() => handleOpenAdmin(activeQuestion)}
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
            key={activeQuestion?.id || 'admin-root'}
            onNavigateHome={handleBackToLibrary}
            onNavigateQuestion={handleOpenStudio}
            onNavigateArticle={handleOpenArticle}
            initialQuestion={activeQuestion}
            initialQuestionId={activeQuestion?.id}
          />
        ) : activeView === 'sandbox' ? (
          <SandboxWorkbench />
        ) : activeView === 'article' && activeQuestion ? (
          <ProblemArticlePage
            key={activeQuestion?.id}
            question={activeQuestion}
            questions={questions}
            onNavigateArticle={handleOpenArticle}
            onBack={handleBackToLibrary}
            onLaunchStudio={handleOpenStudio}
            onStatusChange={handleStatusChange}
            onToggleFavorite={handleToggleFavorite}
            onOpenAdmin={(target) => handleOpenAdmin(target || activeQuestion)}
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
        ) : activeView === 'theory' ? (
          <StepTheoryPage
            stepNo={activeTheoryStep}
            questions={questions}
            onBack={handleBackToLibrary}
            onOpenQuestion={handleOpenArticle}
            onLaunchStudio={handleOpenStudio}
            onSelectStep={(nextStepNo) => handleOpenStepTheory(nextStepNo)}
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
            onOpenStepTheory={handleOpenStepTheory}
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

      {/* AlgoFocus Pomodoro & Study Room Modal */}
      <FocusModal
        activeQuestion={activeQuestion}
        onNavigateQuestion={handleOpenStudio}
      />

      {/* ── Normal, Clean Footer ── */}
      <footer className="mt-16 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-8 px-4 sm:px-6">
        <div className="max-w-[1300px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-tertiary)]">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[var(--text-primary)] text-sm">AlgoVision</span>
            <span className="text-[var(--border-medium)]">·</span>
            <span>Interactive Data Structure &amp; Algorithm Visualizer</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <button
              onClick={handleBackToLibrary}
              className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              Curriculum
            </button>
            <button
              onClick={handleOpenSandbox}
              className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              Code Lab
            </button>
            <button
              onClick={() => setSkillModalOpen(true)}
              className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              Skill Export
            </button>
          </div>

          <div>
            &copy; {new Date().getFullYear()} AlgoVision
          </div>
        </div>
      </footer>
    </div>
  );
}
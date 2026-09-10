import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LibraryView from './components/LibraryView';
import VisualizerStudio from './components/VisualizerStudio';
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
  const [activeView, setActiveView] = useState('library');
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [skillModalOpen, setSkillModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);

  // User auth & profile state
  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());
  const [userStats, setUserStats] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [dashboardModalOpen, setDashboardModalOpen] = useState(false);

  // Fetch stats for active user
  const refreshUserStats = async (user) => {
    if (!user) {
      setUserStats(null);
      return;
    }
    const st = await api.getUserStats(user.id);
    if (st) setUserStats(st);
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

    // Direct URL hash sync: #studio/{id}
    const hash = window.location.hash;
    if (hash.startsWith('#studio/')) {
      const qId = hash.replace('#studio/', '');
      const matched = list.find((q) => q.id === qId);
      if (matched) {
        setActiveQuestion(matched);
        setActiveView('studio');
      }
    }
  };

  useEffect(() => {
    loadData();

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#studio/')) {
        const qId = hash.replace('#studio/', '');
        const matched = questions.find((q) => q.id === qId);
        if (matched) {
          setActiveQuestion(matched);
          setActiveView('studio');
        }
      } else {
        setActiveView('library');
        setActiveQuestion(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [questions.length]);

  const handleOpenQuestion = (question) => {
    setActiveQuestion(question);
    setActiveView('studio');
    window.location.hash = `#studio/${question.id}`;
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
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col font-sans bg-dots">
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
        questions={questions}
        onNavigateQuestion={handleOpenQuestion}
      />

      {/* Main Container */}
      <main className="flex-1">
        {activeView === 'library' || !activeQuestion ? (
          <LibraryView
            questions={questions}
            onOpenQuestion={handleOpenQuestion}
            onToggleFavorite={handleToggleFavorite}
            onStatusChange={handleStatusChange}
            onOpenSkillModal={() => setSkillModalOpen(true)}
            onOpenImportModal={() => setImportModalOpen(true)}
          />
        ) : (
          <VisualizerStudio
            question={activeQuestion}
            onBack={handleBackToLibrary}
            onStatusChange={handleStatusChange}
            onUpdateQuestion={handleUpdateQuestion}
            currentUser={currentUser}
            questions={questions}
            onNavigateQuestion={handleOpenQuestion}
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
          const matched = questions.find(q => q.id === qId);
          if (matched) handleOpenQuestion(matched);
        }}
      />


      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#07080c] py-5 text-center text-xs font-mono text-slate-500">
        <span>AlgoVision Studio Pro • Powered by Native SQLite & React</span>
      </footer>
    </div>
  );
}
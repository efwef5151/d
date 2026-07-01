import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Briefcase,
  Bell,
  Moon,
  Sun,
  Menu,
  X,
  User,
  LogOut,
  Sparkles,
  LayoutDashboard,
  Bookmark,
  FileCheck,
  FolderTree,
  FileText
} from "lucide-react";

export const FloatingNav: React.FC = () => {
  const {
    navigateTo,
    currentPage,
    currentUser,
    logout,
    notifications,
    markAllNotificationsRead,
    isDarkMode,
    toggleTheme,
    setLoginModalOpen
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const links = [
    { label: "Jobs", page: "jobs" },
    { label: "Internships", page: "internships" },
    { label: "Companies", page: "companies" },
    { label: "ATS Checker", page: "ats-checker", icon: <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> },
    { label: "Roadmaps", page: "roadmaps" },
    { label: "About", page: "about" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 pb-2 select-none md:px-8">
      {/* Container */}
      <div className="mx-auto max-w-7xl backdrop-blur-xl bg-white/70 dark:bg-[#0b0c10]/70 border border-slate-200/50 dark:border-slate-800/40 px-4 md:px-6 py-3 rounded-2xl shadow-lg shadow-slate-200/20 dark:shadow-none flex items-center justify-between transition-colors duration-300">
        
        {/* Logo */}
        <div
          onClick={() => navigateTo("home")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-all duration-300">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              Luxora <span className="text-xs bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded font-mono font-medium">AI</span>
            </h1>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {links.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => navigateTo(link.page)}
                className={`relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-slate-900/40"
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl transition-all cursor-pointer"
            title="Switch Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications Center */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl transition-all cursor-pointer relative"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center scale-90 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 max-w-sm rounded-2xl bg-white dark:bg-[#0d0e12] border border-slate-200 dark:border-slate-800/80 shadow-2xl z-50 p-4 transition-all duration-300 animate-in fade-in slide-in-from-top-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/50">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => {
                        markAllNotificationsRead();
                        setShowNotifications(false);
                      }}
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="mt-2 space-y-2 max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-400">
                      No new notifications.
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-lg text-left transition-colors ${
                          n.read
                            ? "bg-slate-50/40 dark:bg-slate-900/10"
                            : "bg-indigo-50/40 dark:bg-indigo-950/10 border-l-2 border-indigo-500"
                        }`}
                      >
                        <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200">{n.title}</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{n.message}</p>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 block font-mono">{n.time}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Section */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              
              {/* User Avatar & Dashboard Access */}
              <button
                onClick={() => {
                  if (currentUser.role === "Candidate") navigateTo("dashboard");
                  else if (currentUser.role === "Recruiter") navigateTo("recruiter");
                  else navigateTo("admin");
                }}
                className="flex items-center gap-2 p-1 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-all text-left group cursor-pointer"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-500/20 group-hover:ring-indigo-500/40 transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="hidden lg:block">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {currentUser.name.split(" ")[0]}
                  </div>
                  <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium font-mono">
                    {currentUser.role}
                  </div>
                </div>
              </button>

              {/* Logout */}
              <button
                onClick={logout}
                className="p-2 text-slate-500 hover:text-rose-500 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-all cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>

            </div>
          ) : (
            <button
              onClick={() => setLoginModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 rounded-xl shadow-md shadow-indigo-500/10 cursor-pointer transition-all active:scale-95"
            >
              Join Luxora
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl md:hidden transition-all cursor-pointer"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

        </div>
      </div>

      {/* Mobile Links Overlay */}
      {isOpen && (
        <div className="md:hidden mt-2 backdrop-blur-2xl bg-white/95 dark:bg-[#0b0c10]/95 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-2xl p-4 flex flex-col gap-1.5 transition-all duration-300 z-50">
          {links.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => {
                  navigateTo(link.page);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/40"
                }`}
              >
                {link.label}
              </button>
            );
          })}

          {currentUser && (
            <div className="border-t border-slate-100 dark:border-slate-800/60 mt-2 pt-2 space-y-1">
              <button
                onClick={() => {
                  const dest = currentUser.role === "Candidate" ? "dashboard" : currentUser.role === "Recruiter" ? "recruiter" : "admin";
                  navigateTo(dest);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/40 cursor-pointer flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4 text-indigo-500" />
                Go to Dashboard ({currentUser.role})
              </button>

              <button
                onClick={() => {
                  navigateTo("profile");
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/40 cursor-pointer flex items-center gap-2"
              >
                <User className="w-4 h-4 text-indigo-500" />
                My Profile
              </button>

              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-sm font-semibold text-rose-500 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

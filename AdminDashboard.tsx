import React from "react";
import { useApp } from "../context/AppContext";
import { ShieldAlert, Users, Database, Server, RefreshCw, KeyRound } from "lucide-react";

export const AdminDashboard: React.FC = () => {
  const { currentUser, navigateTo, jobs, applications, resetDataCenter, showAlert } = useApp();

  if (!currentUser || currentUser.role !== "Admin") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Admin Credentials Required</h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          You must log in using the Admin preset to access system variables, database controls, and API configurations.
        </p>
        <button
          onClick={() => navigateTo("home")}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handleReset = () => {
    resetDataCenter();
    showAlert("All state stores seeded back to original clean data!", "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 select-none text-left animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white flex items-center gap-2">
          Platform Operations Console <span className="px-2 py-0.5 bg-rose-500/10 text-rose-500 rounded-xl text-xs font-mono">SYS_ADMIN</span>
        </h1>
        <p className="text-xs text-slate-400">
          Global Variable Control Center · Admin preset {currentUser.name}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Core diagnostics */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/50 dark:border-slate-800/80 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-500">
            <Users className="w-5 h-5" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">User Statistics</h3>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            3 Active Presets
          </div>
          <p className="text-[10px] text-slate-400">Arjun Mehta (Candidate), Sneha Reddy (Recruiter), Dev Patel (Admin)</p>
        </div>

        {/* Database state */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/50 dark:border-slate-800/80 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-500">
            <Database className="w-5 h-5" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">Database Entities</h3>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {jobs.length} Positions Published
          </div>
          <p className="text-[10px] text-slate-400">{applications.length} submitted resumes stored in localStorage buffers.</p>
        </div>

        {/* API connection */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/50 dark:border-slate-800/80 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-500">
            <Server className="w-5 h-5" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">API Runtime Nodes</h3>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            ONLINE
          </div>
          <p className="text-[10px] text-slate-400">Gemini-3.5-flash backend router active with procedural local fallbacks.</p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Systems checklist (Left column) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 shadow-md space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Platform Diagnostic Logs</h3>
          
          <div className="space-y-2.5 font-mono text-[10px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/30 p-4 rounded-xl leading-relaxed">
            <p className="text-emerald-500">[INFO] Luxora Platform initialised on Port 3000.</p>
            <p className="text-indigo-500">[AUTH] Presets loaded successfully. Database connections stable.</p>
            <p className="text-slate-400">[INFO] Syncing local session store elements to profile index...</p>
            <p className="text-amber-500">[WARN] GEMINI_API_KEY environment variable missing in client sandbox. Utilizing high-fidelity model emulation engines successfully.</p>
            <p className="text-emerald-500">[SUCCESS] Server-side routes compiled to dist/server.cjs seamlessly.</p>
          </div>
        </div>

        {/* Database Controls (Right Column) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 shadow-md space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Platform Maintenance</h3>

          <div className="space-y-4">
            <p className="text-xs text-slate-500 leading-relaxed">
              Reset user settings, seed values, application timelines, bookmarks, and developer databases back to initial mock presets.
            </p>

            <button
              onClick={handleReset}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-rose-500/10 transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Reset Database Seeds
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

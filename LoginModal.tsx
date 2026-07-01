import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, Sparkles, User, Briefcase, ShieldCheck } from "lucide-react";

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setLoginModalOpen, login, signup } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"Candidate" | "Recruiter" | "Admin">("Candidate");

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      if (!name || !email) return;
      signup(name, email, role);
    } else {
      if (!email) return;
      login(email, role);
    }
    setLoginModalOpen(false);
  };

  const selectQuickProfile = (targetRole: "Candidate" | "Recruiter" | "Admin") => {
    setRole(targetRole);
    if (targetRole === "Candidate") {
      setEmail("arjun.mehta@example.com");
      setName("Arjun Mehta");
    } else if (targetRole === "Recruiter") {
      setEmail("sneha.reddy@razorpay.com");
      setName("Sneha Reddy");
    } else {
      setEmail("admin@luxora.ai");
      setName("Dev Patel");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-2xl transition-colors duration-300 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setLoginModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-500 hover:text-slate-900 rounded-lg cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="mx-auto w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/15">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {isRegister ? "Create your Luxora Account" : "Welcome back to Luxora"}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isRegister ? "Join India's AI-powered career operating system." : "Sign in to access your dashboard, saved jobs, and resume checkers."}
          </p>
        </div>

        {/* Demo Roles Selection (Quick Fill) */}
        <div className="mb-6 p-3 bg-indigo-50/40 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 block mb-2 text-center">
            ⚡ Quick-Demo Presets (Select to auto-fill)
          </span>
          <div className="grid grid-cols-3 gap-2">
            
            <button
              onClick={() => selectQuickProfile("Candidate")}
              className={`py-1.5 px-2.5 rounded-xl border text-[10px] font-bold cursor-pointer transition-all flex flex-col items-center gap-1 ${
                role === "Candidate"
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : "bg-white dark:bg-[#121319] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Candidate
            </button>

            <button
              onClick={() => selectQuickProfile("Recruiter")}
              className={`py-1.5 px-2.5 rounded-xl border text-[10px] font-bold cursor-pointer transition-all flex flex-col items-center gap-1 ${
                role === "Recruiter"
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : "bg-white dark:bg-[#121319] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Recruiter
            </button>

            <button
              onClick={() => selectQuickProfile("Admin")}
              className={`py-1.5 px-2.5 rounded-xl border text-[10px] font-bold cursor-pointer transition-all flex flex-col items-center gap-1 ${
                role === "Admin"
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : "bg-white dark:bg-[#121319] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </button>

          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          {isRegister && (
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Arjun Mehta"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800/80 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-white"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. arjun@example.com"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800/80 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg shadow-indigo-500/10 active:scale-95"
          >
            {isRegister ? "Create Account" : "Access Platform"}
          </button>

        </form>

        {/* Toggle registration */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/50 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            {isRegister
              ? "Already have an account? Sign In"
              : "New to Luxora? Create an Account"}
          </button>
        </div>

      </div>
    </div>
  );
};

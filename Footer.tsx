import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Sparkles, Mail, Github, Linkedin, Twitter, ArrowRight } from "lucide-react";

export const Footer: React.FC = () => {
  const { navigateTo, showAlert } = useApp();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    showAlert("Thank you! You have successfully subscribed to Luxora Career Insights.", "success");
    setEmail("");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-50 dark:bg-[#07080b] border-t border-slate-200/60 dark:border-slate-800/40 pt-16 pb-12 transition-colors duration-300">
      
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-900 via-indigo-950 to-indigo-900 px-6 py-10 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-2 max-w-lg text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Get weekly curated job lists & AI prep resources
            </h3>
            <p className="text-sm text-indigo-200/80 leading-relaxed">
              Join 25,000+ top Indian developers receiving direct recruiter alerts and system design guides.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full max-w-md flex items-center gap-2">
            <div className="relative w-full">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-indigo-300/60 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-sm transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-white text-indigo-950 font-bold rounded-xl text-sm cursor-pointer hover:bg-indigo-50 active:scale-95 transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8 text-left pb-12 border-b border-slate-200/50 dark:border-slate-800/40">
          
          {/* Brand block */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo("home")}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Luxora AI</h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Luxora AI is India's premium tech-career engine, offering high-fidelity ATS resume analysis, custom AI roadmaps, and direct pipelines to tier-1 startups and multinational hubs.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-indigo-500 rounded-lg transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-indigo-500 rounded-lg transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-indigo-500 rounded-lg transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Platform</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <li><button onClick={() => navigateTo("jobs")} className="hover:text-indigo-500 hover:underline cursor-pointer">Explore Jobs</button></li>
              <li><button onClick={() => navigateTo("internships")} className="hover:text-indigo-500 hover:underline cursor-pointer">Internships</button></li>
              <li><button onClick={() => navigateTo("companies")} className="hover:text-indigo-500 hover:underline cursor-pointer">Featured Companies</button></li>
              <li><button onClick={() => navigateTo("ats-checker")} className="hover:text-indigo-500 hover:underline cursor-pointer">ATS Resume Checker</button></li>
              <li><button onClick={() => navigateTo("roadmaps")} className="hover:text-indigo-500 hover:underline cursor-pointer">Career Roadmaps</button></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Curated Locations</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <li><a href="#/jobs" className="hover:text-indigo-500 hover:underline">Bengaluru Hub</a></li>
              <li><a href="#/jobs" className="hover:text-indigo-500 hover:underline">Hyderabad Tech</a></li>
              <li><a href="#/jobs" className="hover:text-indigo-500 hover:underline">Pune Tech Park</a></li>
              <li><a href="#/jobs" className="hover:text-indigo-500 hover:underline">Noida Sectors</a></li>
              <li><a href="#/jobs" className="hover:text-indigo-500 hover:underline">Chennai Tech Parks</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Resources & Legal</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <li><button onClick={() => navigateTo("about")} className="hover:text-indigo-500 hover:underline cursor-pointer">About Us</button></li>
              <li><button onClick={() => navigateTo("contact")} className="hover:text-indigo-500 hover:underline cursor-pointer">Contact Support</button></li>
              <li><button onClick={() => navigateTo("faq")} className="hover:text-indigo-500 hover:underline cursor-pointer">Help & FAQs</button></li>
              <li><button onClick={() => navigateTo("privacy")} className="hover:text-indigo-500 hover:underline cursor-pointer">Privacy Policy</button></li>
            </ul>
          </div>

        </div>

        {/* Attribution & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-400 dark:text-slate-500">
          <div>
            © {currentYear} Luxora AI. All rights reserved. Built for engineering portfolios.
          </div>
          <div className="flex items-center gap-6">
            <a href="#/privacy" className="hover:underline">Privacy Policy</a>
            <a href="#/faq" className="hover:underline">Terms of Service</a>
            <a href="#/about" className="hover:underline">Security Protocols</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

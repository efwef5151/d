import React from "react";
import { useApp } from "../context/AppContext";
import { Building2, Compass, Award, Users, HeartHandshake, ShieldCheck } from "lucide-react";

export const About: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 select-none text-left animate-in fade-in duration-300">
      
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Corporate Vision & Values</span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white leading-[1.1]">
          Rebuilding Job Portals from <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400">
            First Principles.
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
          Luxora AI was founded in Bengaluru in 2026. Traditional job search matrices are filled with stale spreadsheets, recruitment agency spam, and broken resume parsing bots. We built a semantic career operating center that connects talent with elite product engineering squads.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/50 dark:border-slate-800/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shadow-inner">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">Our Mission</h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            Empower freshers, college students, and experienced software engineers to evaluate their technical readiness, build formatted resume templates, and find direct placement pipelines.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/50 dark:border-slate-800/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-500 flex items-center justify-center shadow-inner">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">System Security</h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            All user bio metrics and resume textual data reside safely inside isolated localStorage variables. We prioritize user control over system telemetry.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/50 dark:border-slate-800/80 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-inner">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">India-First Scope</h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            Curated list of premium companies spanning Bengaluru, Mumbai, Pune, Chennai, and Gurugram, capturing the authentic landscape of the Indian tech economy.
          </p>
        </div>

      </div>

    </div>
  );
};

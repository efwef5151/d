import React from "react";
import { ShieldCheck, BookOpen, Lock } from "lucide-react";

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 select-none text-left animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="space-y-1.5 pb-6 border-b border-slate-200/60 dark:border-slate-800/60">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white flex items-center gap-2">
          System Privacy Protocol
        </h1>
        <p className="text-xs text-slate-400">
          Last revised: January 1, 2026 · Built to keep your data local and secure.
        </p>
      </div>

      <div className="space-y-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
        
        <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-indigo-500 shrink-0" />
          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-900 dark:text-white">Isolate-by-Default Architecture</h3>
            <p className="font-medium text-[11px]">
              Luxora AI does not compile persistent profiles on shared remote servers. All input variables, biographical data, resume texts, and search queries reside securely on your client machine inside isolated localStorage variables.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-indigo-500" /> 1. Data Collection & Parsing Rules
          </h3>
          <p className="font-medium">
            We use server-side API endpoints using the modern Google Gemini SDK strictly to compare resume nodes against target descriptions and map career roadmaps. No uploaded text is cached, processed for secondary training, or indexed by search engine crawlers.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-indigo-500" /> 2. Local State Management (localStorage)
          </h3>
          <p className="font-medium">
            The application saves your theme selections, applicant preset status, saved bookmark lists, and application pipelines on your device's browser cache. You can reset these states instantly by using the platform operations console inside the Admin dashboard or clearing your browser cookies.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">3. Third Party Compliance</h3>
          <p className="font-medium">
            We align with the highest standards of data integrity in India and globally. We do not sell developer emails or phone numbers to recruitment spam agencies or generic scraping hubs. Direct corporate hiring ensures maximum transparency.
          </p>
        </div>

      </div>

    </div>
  );
};

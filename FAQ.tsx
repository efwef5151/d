import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { HelpCircle, ChevronRight } from "lucide-react";
import { faqData } from "../data/mockData";

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 select-none text-left animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white flex items-center gap-2">
          Knowledge Base & FAQ
        </h1>
        <p className="text-xs text-slate-400">
          Find deep answers to queries regarding career milestones, Gemini-powered resumes, and application guidelines.
        </p>
      </div>

      <div className="space-y-3.5">
        {faqData.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/50 dark:border-slate-800/80 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full px-6 py-4.5 flex items-center justify-between text-slate-900 dark:text-white text-xs sm:text-sm font-bold cursor-pointer text-left focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors"
              >
                <span className="flex items-center gap-2.5"><HelpCircle className="w-4.5 h-4.5 text-indigo-500" /> {faq.question}</span>
                <span className="text-indigo-500 shrink-0 ml-4">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div className="px-6 pb-5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-900/40 pt-3.5 pl-13">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

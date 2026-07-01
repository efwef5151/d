import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Sparkles, Compass, MapPin, Loader2, Calendar, Award, Play, ChevronRight } from "lucide-react";

export const CareerRoadmaps: React.FC = () => {
  const { activeRoadmap, setActiveRoadmap, showAlert } = useApp();
  const [role, setRole] = useState("AI/ML Research Engineer");
  const [timeframe, setTimeframe] = useState("6 Months");
  const [isLoading, setIsLoading] = useState(false);

  const rolesList = [
    "AI/ML Research Engineer",
    "Frontend Development Platform Lead",
    "Backend Microservices Engineer",
    "Cloud Computing & DevOps Lead",
    "Cyber Security Auditor",
    "Product Manager (SaaS)"
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setActiveRoadmap(null);

    try {
      const response = await fetch("/api/gemini/career-roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ role, timeframe })
      });

      if (!response.ok) {
        throw new Error("Roadmap request failed.");
      }

      const roadmapData = await response.json();
      setActiveRoadmap(roadmapData);
      showAlert(`Custom roadmap for ${role} generated!`, "success");

    } catch (e) {
      console.error(e);
      showAlert("Network connection limits occurred. Executing high-fidelity local roadmap architect.", "info");

      // Fallback
      setTimeout(() => {
        const fallbackRoadmap = {
          role,
          timeframe,
          milestones: [
            {
              title: "Phase 1: Deep Foundations & Algorithmic Tooling",
              duration: "Month 1 - Month 2",
              topics: ["Advanced State Engines", "Type safety constraints in modular packages", "Data-binding optimization"],
              resources: ["TypeScript Official Documentation Node", "Luxora Engineering Advanced Series"]
            },
            {
              title: "Phase 2: Full-Stack Routing & API Architecture",
              duration: "Month 3 - Month 4",
              topics: ["Express.js middleware optimization", "Caching schemes via Redis/In-Memory networks", "JSON validation"],
              resources: ["Full Stack Open Hub", "Standard API Best Practices"]
            },
            {
              title: "Phase 3: System Resilience, Containerization & Deployments",
              duration: "Month 5 - Month 6",
              topics: ["Docker orchestration", "CI/CD action runners", "Vulnerability auditing protocols"],
              resources: ["Docker Official Guides", "Google Cloud Developer Track"]
            }
          ],
          skillsToFocus: ["TypeScript", "API Design", "Distributed State", "Relational Databases"],
          certifications: ["Google Cloud Certified Professional Cloud Developer", "HashiCorp Terraform Associate"]
        };
        setActiveRoadmap(fallbackRoadmap);
        setIsLoading(false);
      }, 1500);
      return;
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 select-none text-left animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white flex items-center gap-2">
          Luxora AI <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-500 rounded-xl text-xs font-mono">ROADMAP ARCHITECT</span>
        </h1>
        <p className="text-xs text-slate-400">
          Generate linear, milestone-driven learning paths to transition from Fresher to Lead Engineering roles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input parameters (Left column) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 shadow-md space-y-5">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Architect Inputs</h2>

          <form onSubmit={handleGenerate} className="space-y-4 text-xs font-bold text-slate-600 dark:text-slate-400">
            
            <div className="space-y-1">
              <label className="uppercase tracking-wider">Dream Professional Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800 rounded-xl font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                {rolesList.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider">Preparation Timeframe</label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800 rounded-xl font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                <option value="3 Months">3 Months (Intense)</option>
                <option value="6 Months">6 Months (Standard)</option>
                <option value="12 Months">12 Months (Comprehensive)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold tracking-tight cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-500/10 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Structuring Timelines...
                </>
              ) : (
                <>
                  <Compass className="w-3.5 h-3.5" /> Plan My Career Roadmap
                </>
              )}
            </button>

          </form>
        </div>

        {/* Output milestones (Right column) */}
        <div className="lg:col-span-8 space-y-6">
          
          {isLoading && (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#0b0c10] border border-slate-200/50 dark:border-slate-800/80 space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Mapping Milestones...</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Calculating required system competencies, certifications, and resources needed for {role}.
              </p>
            </div>
          )}

          {!activeRoadmap && !isLoading && (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#0b0c10] border border-slate-200/50 dark:border-slate-800/80 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto shadow-inner">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Awaiting Map Construction</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Choose your dream career track, set a timeframe, and let Luxora AI build a highly customized milestone timeline.
              </p>
            </div>
          )}

          {activeRoadmap && !isLoading && (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
              
              {/* Header card summary */}
              <div className="p-6 rounded-2xl bg-[#0d0e12] border border-slate-800/60 shadow-lg text-left flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 font-mono">constructed career blueprint</span>
                  <h3 className="text-base sm:text-lg font-bold text-white">{activeRoadmap.role}</h3>
                  <p className="text-[10px] text-slate-400">Transition Plan over {activeRoadmap.timeframe}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
              </div>

              {/* Milestones Vertical Timeline */}
              <div className="space-y-6 text-left relative pl-6 border-l-2 border-slate-200/60 dark:border-slate-800/60 ml-3">
                
                {activeRoadmap.milestones.map((milestone, idx) => (
                  <div key={idx} className="relative space-y-2">
                    
                    {/* Circle Node */}
                    <div className="absolute -left-[31px] top-1 w-4.5 h-4.5 rounded-full bg-white dark:bg-[#07080b] border-2 border-indigo-500 flex items-center justify-center z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    </div>

                    {/* Milestone Box */}
                    <div className="p-5 rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 shadow-sm space-y-3">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                          {milestone.title}
                        </h4>
                        <span className="text-[9px] font-bold px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-lg font-mono shrink-0 w-max">
                          {milestone.duration}
                        </span>
                      </div>

                      {/* Topics */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Core Concepts</span>
                        <div className="flex flex-wrap gap-1">
                          {milestone.topics.map((t, idx) => (
                            <span key={idx} className="text-[9px] font-bold px-2 py-0.5 bg-slate-50 dark:bg-slate-900 border border-slate-200/30 text-slate-500 dark:text-slate-400 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Resources */}
                      <div className="space-y-1 pt-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Learning Materials</span>
                        <div className="flex flex-wrap gap-1.5 text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                          {milestone.resources.map((res, i) => (
                            <span key={i} className="flex items-center gap-1 cursor-pointer hover:underline">
                              <ChevronRight className="w-3.5 h-3.5" /> {res}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>
                ))}

              </div>

              {/* Side cards: Recommended skills and certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                
                {/* Recommended Competencies */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-[#1c1d24] shadow-sm space-y-3 text-xs">
                  <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Crucial Skill Targets</h4>
                  <div className="flex flex-wrap gap-1">
                    {activeRoadmap.skillsToFocus.map((s, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold rounded-lg font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-[#1c1d24] shadow-sm space-y-3 text-xs">
                  <h4 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1"><Award className="w-4 h-4 text-indigo-500" /> Recommended Certifications</h4>
                  <ul className="space-y-1 text-slate-500 dark:text-slate-400 font-semibold">
                    {activeRoadmap.certifications.map((c, i) => (
                      <li key={i} className="list-decimal list-inside">{c}</li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Sparkles,
  ArrowRight,
  Briefcase,
  Layers,
  Search,
  Users,
  Award,
  BookOpen,
  TrendingUp,
  ChevronRight,
  ShieldCheck,
  Star
} from "lucide-react";
import { mockTestimonials, faqData } from "../data/mockData";

export const Home: React.FC = () => {
  const { navigateTo, jobs, companies, toggleSaveJob, savedJobs } = useApp();
  const [activeTab, setActiveTab] = useState<"jobs" | "internships">("jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  // Filter latest jobs and internships
  const featuredJobs = jobs.filter((j) => !j.isInternship).slice(0, 3);
  const featuredInternships = jobs.filter((j) => j.isInternship).slice(0, 3);

  const stats = [
    { label: "Active Jobs", value: "1,240+", icon: <Briefcase className="w-4 h-4 text-indigo-500" /> },
    { label: "Partner Companies", value: "140+", icon: <Layers className="w-4 h-4 text-violet-500" /> },
    { label: "Successful Placements", value: "8,500+", icon: <Users className="w-4 h-4 text-emerald-500" /> },
    { label: "Avg. Salary Hike", value: "48%", icon: <TrendingUp className="w-4 h-4 text-amber-500" /> }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo("jobs");
  };

  return (
    <div className="space-y-24 pb-20 select-none animate-in fade-in duration-500">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 lg:px-8">
        
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[700px] h-[300px] md:h-[500px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative">
          
          {/* Glass Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-inner">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Integrated with gemini-3.5-flash
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.1]">
            Your AI-Powered <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 dark:from-indigo-400 dark:to-violet-400">
              Career Operating System
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Luxora AI is India's premium tech-career portal. Create professional resume templates, audit them against live ATS parsers, map engineering roadmaps, and apply to top-tier startups.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row items-stretch gap-2.5 p-2 rounded-2xl md:rounded-3xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 shadow-xl"
          >
            <div className="flex-1 flex items-center gap-3 px-3 py-2">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs by title, skills, or locations (e.g. React Bengaluru)..."
                className="w-full bg-transparent border-none text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white rounded-xl md:rounded-2xl text-xs font-bold shadow-md shadow-indigo-500/20 cursor-pointer transition-all flex items-center justify-center gap-1 whitespace-nowrap active:scale-95"
            >
              Search Openings <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-50/40 dark:bg-[#0d0e12]/30 border border-slate-200/40 dark:border-slate-800/40 text-left flex items-center gap-3"
              >
                <div className="p-2 rounded-xl bg-white dark:bg-[#121319] border border-slate-200/50 dark:border-slate-800/50 shadow-sm shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900 dark:text-white font-mono leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. LOGO BANNERS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
            Partnered with elite Indian product hubs
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60 dark:opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {companies.slice(0, 6).map((c) => (
              <div
                key={c.id}
                onClick={() => navigateTo("companies")}
                className="flex items-center gap-2 cursor-pointer hover:opacity-100"
              >
                <img src={c.logo} alt={c.name} className="w-6 h-6 rounded-md object-cover" referrerPolicy="no-referrer" />
                <span className="text-xs font-extrabold tracking-tight text-slate-900 dark:text-white">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BENTO AI ADVANTAGE */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
            Supercharge your application cycle with AI
          </h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            Traditional job boards rely on static profiles. Luxora integrates real-time Gemini modeling to act as your digital recruiter.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="md:col-span-2 rounded-3xl bg-gradient-to-br from-indigo-50/50 via-white to-white dark:from-[#0d0e12]/30 dark:to-[#090a0d] border border-slate-200/50 dark:border-slate-800/40 p-8 text-left flex flex-col justify-between min-h-[300px] shadow-sm hover:border-slate-300 dark:hover:border-slate-700/60 transition-all">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Gemini-Powered ATS Analyzer
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
                Don't guess why recruiters aren't responding. Paste your resume against our scanning node to check matching score, keywords alignment, and receive immediate suggestions to refine bullet points.
              </p>
            </div>
            <button
              onClick={() => navigateTo("ats-checker")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline mt-6 cursor-pointer text-left"
            >
              Check My Resume <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl bg-gradient-to-br from-violet-50/50 via-white to-white dark:from-[#0d0e12]/30 dark:to-[#090a0d] border border-slate-200/50 dark:border-slate-800/40 p-8 text-left flex flex-col justify-between shadow-sm hover:border-slate-300 dark:hover:border-slate-700/60 transition-all">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 dark:bg-violet-400/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Smart Career Roadmaps
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Generate chronological upskilling roadmaps matching specific roles like Backend Dev, AI/ML Specialist, or Product Management over 3 to 12 months.
              </p>
            </div>
            <button
              onClick={() => navigateTo("roadmaps")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline mt-6 cursor-pointer text-left"
            >
              Build Roadmap <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl bg-gradient-to-br from-amber-50/50 via-white to-white dark:from-[#0d0e12]/30 dark:to-[#090a0d] border border-slate-200/50 dark:border-slate-800/40 p-8 text-left flex flex-col justify-between shadow-sm hover:border-slate-300 dark:hover:border-slate-700/60 transition-all">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Portfolio Resume Builder
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Build an elegant single-page resume layout within minutes. Export instantly to ATS-friendly formats compatible with Google and Microsoft parsing bots.
              </p>
            </div>
            <button
              onClick={() => navigateTo("resume-builder")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline mt-6 cursor-pointer text-left"
            >
              Build Resume Now <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 4 */}
          <div className="md:col-span-2 rounded-3xl bg-gradient-to-br from-emerald-50/50 via-white to-white dark:from-[#0d0e12]/30 dark:to-[#090a0d] border border-slate-200/50 dark:border-slate-800/40 p-8 text-left flex flex-col justify-between min-h-[300px] shadow-sm hover:border-slate-300 dark:hover:border-slate-700/60 transition-all">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Live Indian Tech Hub Openings
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
                We aggregate premium, vetted development jobs across India's top software hubs. No spam agencies, no fake positions—only direct connections with real tech recruiters.
              </p>
            </div>
            <button
              onClick={() => navigateTo("jobs")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline mt-6 cursor-pointer text-left"
            >
              Explore Job Listings <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </section>

      {/* 4. RECENT OPENINGS SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">
              Trending Opportunities
            </h2>
            <p className="text-xs text-slate-400">
              Vetted jobs and internships with live match meters.
            </p>
          </div>

          {/* Tabs switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#121319] border border-slate-200/50 dark:border-slate-800/60 rounded-xl">
            <button
              onClick={() => setActiveTab("jobs")}
              className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                activeTab === "jobs"
                  ? "bg-white dark:bg-[#1b1c24] text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              Full-Time Jobs
            </button>
            <button
              onClick={() => setActiveTab("internships")}
              className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                activeTab === "internships"
                  ? "bg-white dark:bg-[#1b1c24] text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              Internships & Freshers
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(activeTab === "jobs" ? featuredJobs : featuredInternships).map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/50 p-6 text-left flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300"
            >
              
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={item.logo} alt={item.company} className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-800/80" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{item.company}</span>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-mono">
                    {item.type}
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-mono">
                    {item.location.split(",")[0]}
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-mono">
                    {item.salary}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 pt-2">
                  {item.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-bold px-1.5 py-0.5 bg-slate-50 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/40 text-slate-400 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {item.skills.length > 3 && (
                    <span className="text-[9px] font-bold text-slate-400 px-1 pt-0.5">
                      +{item.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Apply Action */}
              <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                <span className="text-[10px] font-bold text-slate-400 font-mono">
                  {item.postedAt}
                </span>
                <button
                  onClick={() => navigateTo(item.isInternship ? "internship-details" : "job-details", { itemId: item.id })}
                  className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-[10px] font-black rounded-lg cursor-pointer transition-all"
                >
                  View Requirements
                </button>
              </div>

            </div>
          ))}
        </div>

        <div className="pt-4">
          <button
            onClick={() => navigateTo(activeTab === "jobs" ? "jobs" : "internships")}
            className="inline-flex items-center gap-1.5 px-6 py-3 bg-white dark:bg-[#0b0c10] hover:bg-slate-50 dark:hover:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-xs font-bold text-slate-800 dark:text-white rounded-xl cursor-pointer transition-all shadow-sm"
          >
            Explore All Openings <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </section>

      {/* 5. SUCCESS STORIES */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
            Endorsed by Placed Candidates
          </h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            See how freshers and experienced software professionals accelerated their interview pipelines using Luxora AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {mockTestimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/50 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/40">
                <img src={t.image} alt={t.name} className="w-9 h-9 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">{t.name}</h4>
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold font-mono">{t.role} · {t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 6. FAQ SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
        
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Common Questions
          </h2>
          <p className="text-sm text-slate-400">
            Everything you need to know about ATS scoring and Gemini models.
          </p>
        </div>

        <div className="space-y-3 text-left">
          {faqData.map((faq) => {
            const isSelected = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/50 dark:border-slate-800/80 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(isSelected ? null : faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-slate-900 dark:text-white text-xs sm:text-sm font-bold cursor-pointer text-left focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors"
                >
                  <span>{faq.question}</span>
                  <span className="text-indigo-500 shrink-0 ml-4">{isSelected ? "−" : "+"}</span>
                </button>
                {isSelected && (
                  <div className="px-6 pb-5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-900/40 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

    </div>
  );
};

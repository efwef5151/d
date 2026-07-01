import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { ArrowLeft, Bookmark, MapPin, Briefcase, IndianRupee, Sparkles, Send, FileText, CheckCircle2, GraduationCap, ShieldCheck } from "lucide-react";

export const InternshipDetails: React.FC = () => {
  const { jobs, selectedItemId, navigateTo, savedJobs, toggleSaveJob, applyToJob, currentUser, setLoginModalOpen, applications } = useApp();
  
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeName, setResumeName] = useState(currentUser?.resumeName || "Arjun_Mehta_Software_Engineer.pdf");
  const [isApplying, setIsApplying] = useState(false);

  const intern = jobs.find((j) => j.id === selectedItemId && j.isInternship) || null;

  if (!intern) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Internship Not Found</h2>
        <p className="text-xs text-slate-400">The internship opening you are looking for has been closed or expired.</p>
        <button onClick={() => navigateTo("internships")} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">
          Browse Active Internships
        </button>
      </div>
    );
  }

  const isSaved = savedJobs.includes(intern.id);
  const alreadyApplied = currentUser ? applications.some((app) => app.jobId === intern.id && app.candidateEmail === currentUser.email) : false;

  // Calculate simulated resume match percentage
  let matchScore = 45;
  if (currentUser) {
    const matchCount = intern.skills.filter((s) => currentUser.skills.map(sk => sk.toLowerCase()).includes(s.toLowerCase())).length;
    matchScore = Math.min(100, Math.max(45, Math.floor((matchCount / intern.skills.length) * 100) + 15));
  }

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setLoginModalOpen(true);
      return;
    }

    const success = applyToJob(intern.id, {
      resumeName,
      coverLetter,
      phone
    });

    if (success) {
      setIsApplying(false);
      setCoverLetter("");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 select-none text-left animate-in fade-in duration-300">
      
      {/* Back link */}
      <button
        onClick={() => navigateTo("internships")}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-950 dark:hover:text-white cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Internships
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Core Description (Left column) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main header card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 shadow-md space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/40">
              <div className="flex items-center gap-4">
                <img
                  src={intern.logo}
                  alt={intern.company}
                  className="w-14 h-14 rounded-2xl object-cover ring-4 ring-slate-100 dark:ring-slate-800/60 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-1">
                  <h1 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white leading-tight">
                    {intern.title}
                  </h1>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold block">
                    {intern.company}
                  </span>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold pt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {intern.location}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {intern.type}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSaveJob(intern.id)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                    isSaved
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                      : "border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-white"
                  }`}
                  title={isSaved ? "Remove Bookmark" : "Save Internship"}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                </button>

                {alreadyApplied ? (
                  <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Applied
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      if (!currentUser) setLoginModalOpen(true);
                      else setIsApplying(true);
                    }}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/15 cursor-pointer transition-all active:scale-95"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </div>

            {/* AI match card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-500/10 to-violet-500/5 dark:from-violet-400/5 dark:to-transparent border border-violet-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <div className="text-left">
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">AI Candidate Match Score</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                    Based on your saved profile skills, education, and bio requirements.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xl font-black font-mono px-2.5 py-1 rounded-xl ${
                  matchScore >= 80 ? "text-emerald-500 bg-emerald-500/10" : "text-amber-500 bg-amber-500/10"
                }`}>
                  {matchScore}%
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Match</span>
              </div>
            </div>

            {/* Description Paragraph */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Internship Overview</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {intern.description}
              </p>
            </div>

            {/* Requirements Bullet points */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Who Can Apply</h3>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                {intern.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-indigo-500 font-bold shrink-0 mt-0.5">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Responsibilities */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Role & Project Scope</h3>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                {intern.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-indigo-500 font-bold shrink-0 mt-0.5">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Internship Benefits & PPO Potential</h3>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                {intern.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-indigo-500 font-bold shrink-0 mt-0.5">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Sidebar details (Right column) */}
        <div className="space-y-6">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 shadow-sm space-y-4 font-semibold text-xs">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Internship Details</h3>

            <div className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-slate-800/40">
              <span className="text-slate-400">Monthly Stipend</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{intern.salary}</span>
            </div>

            <div className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-slate-800/40">
              <span className="text-slate-400">Target Level</span>
              <span className="text-slate-800 dark:text-slate-200">{intern.experience}</span>
            </div>

            <div className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-slate-800/40">
              <span className="text-slate-400">Tech Domain</span>
              <span className="text-slate-800 dark:text-slate-200">{intern.category}</span>
            </div>

            <div className="space-y-2.5 pt-2">
              <span className="text-slate-400 block mb-1">Required Competencies</span>
              <div className="flex flex-wrap gap-1">
                {intern.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-bold px-2.5 py-0.5 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 rounded-lg border border-slate-200/50 dark:border-slate-800/40"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 shadow-sm space-y-4">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Placement Assurance</h3>
            <div className="flex items-start gap-2.5 text-xs text-slate-400">
              <GraduationCap className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                This position carries high potential for conversion into a Full-Time Placement Offer (PPO) depending on performance metrics.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* APPLICATIONS MODAL */}
      {isApplying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-white dark:bg-[#0b0c10] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl relative text-left">
            
            <button
              onClick={() => setIsApplying(false)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              ✕
            </button>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4">
              Apply for {intern.title} at {intern.company}
            </h2>

            <form onSubmit={handleApply} className="space-y-4">
              
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  required
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Verified Resume Document
                </label>
                <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <FileText className="w-4 h-4 text-indigo-500" />
                    <span className="font-semibold line-clamp-1">{resumeName}</span>
                  </div>
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded font-mono">
                    ACTIVE
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Cover Letter / Notes to Recruiters (Optional)
                </label>
                <textarea
                  rows={4}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Tell us about your university academic scores and core software projects..."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/10 active:scale-95"
              >
                Submit Internship Application <Send className="w-3.5 h-3.5" />
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { ArrowLeft, Bookmark, MapPin, Briefcase, IndianRupee, Sparkles, Send, FileText, CheckCircle2, Star, ShieldCheck } from "lucide-react";

export const JobDetails: React.FC = () => {
  const { jobs, selectedItemId, navigateTo, savedJobs, toggleSaveJob, applyToJob, currentUser, setLoginModalOpen, applications } = useApp();
  
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeName, setResumeName] = useState(currentUser?.resumeName || "Arjun_Mehta_Software_Engineer.pdf");
  const [isApplying, setIsApplying] = useState(false);

  const job = jobs.find((j) => j.id === selectedItemId && !j.isInternship) || null;

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Job Opening Not Found</h2>
        <p className="text-xs text-slate-400">The position you are looking for has been filled or removed from public listings.</p>
        <button onClick={() => navigateTo("jobs")} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">
          Browse Active Jobs
        </button>
      </div>
    );
  }

  const isSaved = savedJobs.includes(job.id);
  const alreadyApplied = currentUser ? applications.some((app) => app.jobId === job.id && app.candidateEmail === currentUser.email) : false;

  // Calculate simulated resume match percentage
  let matchScore = 45;
  if (currentUser) {
    const matchCount = job.skills.filter((s) => currentUser.skills.map(sk => sk.toLowerCase()).includes(s.toLowerCase())).length;
    matchScore = Math.min(100, Math.max(45, Math.floor((matchCount / job.skills.length) * 100) + 15));
  }

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setLoginModalOpen(true);
      return;
    }

    const success = applyToJob(job.id, {
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
        onClick={() => navigateTo("jobs")}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-950 dark:hover:text-white cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Job Postings
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
                  src={job.logo}
                  alt={job.company}
                  className="w-14 h-14 rounded-2xl object-cover ring-4 ring-slate-100 dark:ring-slate-800/60 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-1">
                  <h1 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white leading-tight">
                    {job.title}
                  </h1>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold block">
                    {job.company}
                  </span>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold pt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {job.type}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSaveJob(job.id)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                    isSaved
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                      : "border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-white"
                  }`}
                  title={isSaved ? "Remove Bookmark" : "Save Job"}
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
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-indigo-500/5 dark:from-indigo-400/5 dark:to-transparent border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
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
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Position Overview</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {job.description}
              </p>
            </div>

            {/* Requirements Bullet points */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Requirements & Qualifications</h3>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-indigo-500 font-bold shrink-0 mt-0.5">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Responsibilities */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Responsibilities</h3>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-indigo-500 font-bold shrink-0 mt-0.5">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Corporate Perks & Compensation</h3>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                {job.benefits.map((benefit, idx) => (
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
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Job Specifications</h3>

            <div className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-slate-800/40">
              <span className="text-slate-400">Annual CTC Range</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{job.salary}</span>
            </div>

            <div className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-slate-800/40">
              <span className="text-slate-400">Experience Needed</span>
              <span className="text-slate-800 dark:text-slate-200">{job.experience}</span>
            </div>

            <div className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-slate-800/40">
              <span className="text-slate-400">Job Category</span>
              <span className="text-slate-800 dark:text-slate-200">{job.category}</span>
            </div>

            <div className="space-y-2.5 pt-2">
              <span className="text-slate-400 block mb-1">Required Competencies</span>
              <div className="flex flex-wrap gap-1">
                {job.skills.map((skill, i) => (
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
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Recruiting Assurance</h3>
            <div className="flex items-start gap-2.5 text-xs text-slate-400">
              <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                This opening features verified recruiter details. Direct feedback on applications is provided within 7 business days.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* INTERACTIVE APPLICATIONS MODAL/DRAWER OVERLAY */}
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
              Apply to {job.company}
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
                  Cover Letter / Note to Hiring Manager (Optional)
                </label>
                <textarea
                  rows={4}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Write a brief pitch explaining your system architectural achievements and suitability..."
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/10 active:scale-95"
              >
                Submit Application <Send className="w-3.5 h-3.5" />
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

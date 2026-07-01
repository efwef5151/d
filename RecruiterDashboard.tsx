import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { ShieldCheck, User, Users, FileText, Send, CheckCircle2, AlertTriangle, PlusCircle, Sparkles } from "lucide-react";

export const RecruiterDashboard: React.FC = () => {
  const { currentUser, navigateTo, applications, updateApplicationStatus, jobs, addJobPost, showAlert } = useApp();

  // Job Publisher Form
  const [jobTitle, setJobTitle] = useState("");
  const [category, setCategory] = useState("Frontend Development");
  const [salary, setSalary] = useState("₹12L - ₹18L L.P.A");
  const [location, setLocation] = useState("Bengaluru, Karnataka");
  const [experience, setExperience] = useState("1-3 Years");
  const [type, setType] = useState("Full-Time");
  const [description, setDescription] = useState("");
  const [skillsStr, setSkillsStr] = useState("React, TypeScript, Tailwind CSS");
  const [isInternship, setIsInternship] = useState(false);

  const [isPublishing, setIsPublishing] = useState(false);

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recruiter Access Only</h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Please log in as a Recruiter preset to publish engineering requirements, inspect candidates, or update selection criteria.
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

  // Recruiter is Sneha Reddy from Razorpay or similar. Let's filter candidates applying to corporate roles matching her company.
  const companyName = currentUser.company || "Razorpay";
  const recruiterJobs = jobs.filter((j) => j.company.toLowerCase().includes(companyName.toLowerCase()));
  const recruiterJobIds = recruiterJobs.map((j) => j.id);

  // Active Applications from candidate pool
  const activeApplications = applications.filter((app) => recruiterJobIds.includes(app.jobId));

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !description) return;

    const skills = skillsStr.split(",").map((s) => s.trim()).filter(Boolean);

    addJobPost({
      title: jobTitle,
      company: companyName,
      companyId: recruiterJobs[0]?.companyId || "razorpay",
      logo: recruiterJobs[0]?.logo || "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=100&h=100&fit=crop",
      location,
      salary,
      description,
      skills,
      experience,
      category,
      type,
      isInternship,
      postedAt: "Just now",
      requirements: ["Strong command over systems architecture", "Experience deploying clean modular codebases"],
      responsibilities: ["Iterate on customer feedback with high fidelity", "Monitor cloud runtime alerts"],
      benefits: ["Comprehensive medical health coverage", "Flexible hybrid work conditions"]
    });

    // Reset Form
    setJobTitle("");
    setDescription("");
    setSkillsStr("");
    setIsPublishing(false);
    showAlert("New job posting published successfully!", "success");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 select-none text-left animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white flex items-center gap-2">
            Hiring Management Dashboard <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-500 rounded-xl text-xs font-mono">RECRUITER ENGINE</span>
          </h1>
          <p className="text-xs text-slate-400">
            Enterprise Command Center · Sneha Reddy from {companyName}
          </p>
        </div>

        <button
          onClick={() => setIsPublishing(!isPublishing)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-indigo-500/10 active:scale-95"
        >
          <PlusCircle className="w-4 h-4" /> {isPublishing ? "Hide Form" : "Publish Requirement"}
        </button>
      </div>

      {/* Grid details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Core panel list of Candidates & applications */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 shadow-md space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Received Applicant Portfolios ({activeApplications.length})</h3>

            {activeApplications.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                No active resumes received for published corporate roles yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800/40">
                {activeApplications.map((app) => (
                  <div key={app.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start justify-between gap-4 text-xs font-semibold">
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-extrabold text-slate-900 dark:text-white block">{app.candidateName}</span>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{app.candidateEmail} · {app.phone || "No phone"}</span>
                      </div>

                      <div className="space-y-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/40 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-mono">
                        <span className="font-extrabold text-slate-400 uppercase tracking-wider text-[9px] block mb-1">Applying for: {app.jobTitle}</span>
                        <p className="italic">"{app.coverLetter || "No cover letter submitted."}"</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded font-bold font-mono">
                          {app.resumeName}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                          app.status === "Interviewing"
                            ? "bg-indigo-500/10 text-indigo-500"
                            : app.status === "Offered"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : app.status === "Rejected"
                            ? "bg-rose-500/10 text-rose-500"
                            : "bg-amber-500/10 text-amber-500"
                        }`}>
                          {app.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center gap-2 shrink-0">
                      <button
                        onClick={() => updateApplicationStatus(app.id, "Interviewing")}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold rounded-lg cursor-pointer"
                      >
                        Schedule Interview
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(app.id, "Offered")}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-lg cursor-pointer"
                      >
                        Extend Offer
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(app.id, "Rejected")}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-950/80 text-rose-600 dark:text-rose-400 text-[10px] font-bold rounded-lg cursor-pointer"
                      >
                        Decline
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

        {/* Right side: Publisher form (if active) & Active job statistics */}
        <div className="lg:col-span-4 space-y-6">
          
          {isPublishing && (
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-indigo-950/40 shadow-xl space-y-4 animate-in slide-in-from-top duration-300">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-indigo-500" /> Specify Job Node
              </h3>

              <form onSubmit={handlePublish} className="space-y-3.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
                
                <div>
                  <label className="block mb-1">Target Designation</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Senior Frontend Engineer"
                    required
                    className="w-full p-2 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block mb-1">Compensation Range</label>
                    <input
                      type="text"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      className="w-full p-2 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">HQ Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-2 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block mb-1">Working Style</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full p-2 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-white"
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 pt-5">
                    <input
                      type="checkbox"
                      id="isIntern"
                      checked={isInternship}
                      onChange={(e) => setIsInternship(e.target.checked)}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="isIntern" className="cursor-pointer">Internship?</label>
                  </div>
                </div>

                <div>
                  <label className="block mb-1">Key Competencies Required</label>
                  <input
                    type="text"
                    value={skillsStr}
                    onChange={(e) => setSkillsStr(e.target.value)}
                    placeholder="Comma separated: React, AWS, Docker"
                    required
                    className="w-full p-2 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block mb-1">Description</label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a thorough requirement outline for the role..."
                    required
                    className="w-full p-2 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-500/10"
                >
                  <Send className="w-3.5 h-3.5" /> Submit to Public Listings
                </button>

              </form>
            </div>
          )}

          <div className="p-6 rounded-3xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 shadow-md space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Published Corporate Positions ({recruiterJobs.length})</h3>
            
            <div className="space-y-2 text-xs font-semibold">
              {recruiterJobs.map((rj) => (
                <div key={rj.id} className="p-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/30 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-slate-800 dark:text-slate-200 block font-bold">{rj.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{rj.location.split(",")[0]} · {rj.salary}</span>
                  </div>
                  <span className="text-[9px] bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded font-mono font-bold">
                    {rj.isInternship ? "INTERN" : "FULL-TIME"}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

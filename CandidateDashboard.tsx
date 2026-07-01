import React from "react";
import { useApp } from "../context/AppContext";
import { BookOpen, MapPin, Briefcase, FileText, CheckCircle2, Star, TrendingUp, Calendar, ArrowRight, User, Award, ListFilter } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const CandidateDashboard: React.FC = () => {
  const { currentUser, navigateTo, applications, jobs, savedJobs, toggleSaveJob } = useApp();

  // If candidate is guest, show login guide
  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
          <User className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Sign In to View Dashboard</h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Please login to access personal analytics, track application histories, view matching scores, and receive custom upskilling recommendations.
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

  // Filter application histories
  const userApplications = applications.filter((app) => app.candidateEmail === currentUser.email);
  const bookmarkedJobs = jobs.filter((job) => savedJobs.includes(job.id));

  // Simulating Recharts tracking data
  const appTimelineData = [
    { name: "Jan", applications: 1 },
    { name: "Feb", applications: 3 },
    { name: "Mar", applications: 2 },
    { name: "Apr", applications: 5 },
    { name: "May", applications: 7 },
    { name: "Jun", applications: userApplications.length + 3 }
  ];

  // Checklist computation
  const checklist = [
    { id: "resume", label: "Provide resume details in ATS scan", done: !!currentUser.resumeText },
    { id: "skills", label: "Add 5+ skills tags to your profile", done: currentUser.skills.length >= 5 },
    { id: "phone", label: "Include phone contact detail", done: !!currentUser.phone },
    { id: "apply", label: "Apply to your first enterprise opening", done: userApplications.length > 0 }
  ];

  const completedCount = checklist.filter((c) => c.done).length;
  const profilePercent = Math.floor((completedCount / checklist.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 select-none text-left animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
            Welcome, {currentUser.name}!
          </h1>
          <p className="text-xs text-slate-400">
            Candidate operating center · Verified via {currentUser.email}
          </p>
        </div>

        <button
          onClick={() => navigateTo("profile")}
          className="px-4 py-2 bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors"
        >
          Edit Profile Node
        </button>
      </div>

      {/* Grid: Stats & Completeness */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Profile Completeness card */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 shadow-md space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Profile Completeness</h3>
            <span className="text-xs font-mono font-black text-indigo-500">{profilePercent}%</span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
            <div className="bg-indigo-600 h-2 rounded-full transition-all duration-500" style={{ width: `${profilePercent}%` }} />
          </div>

          <div className="space-y-3 pt-2 text-xs font-semibold">
            {checklist.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/30">
                <span className={item.done ? "text-slate-400 line-through" : "text-slate-700 dark:text-slate-300"}>
                  {item.label}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                  item.done ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                }`}>
                  {item.done ? "COMPLETED" : "PENDING"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Applications Graph */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Monthly Application Velocity</h3>
            <span className="text-xs text-slate-400 font-mono">2026 Season</span>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={appTimelineData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "#0f172a", border: "none", borderRadius: "12px", fontSize: "11px", color: "#fff" }} />
                <Area type="monotone" dataKey="applications" stroke="#4f46e5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorApps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Main Bottom Section: Applications Tracker vs Saved list */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Applied Jobs Table */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Submission Pipelines</h3>

          {userApplications.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mx-auto text-slate-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-white">No active applications</h4>
              <p className="text-[11px] text-slate-400">You haven't submitted your resume details to any hiring company yet.</p>
              <button
                onClick={() => navigateTo("jobs")}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black cursor-pointer"
              >
                Browse Open Roles
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 overflow-hidden bg-white dark:bg-[#0b0c10] shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#121319] text-slate-400 uppercase tracking-widest text-[9px] font-black border-b border-slate-100 dark:border-slate-800">
                    <th className="p-4">Corporate Role</th>
                    <th className="p-4">Submission Date</th>
                    <th className="p-4">Current Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
                  {userApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 font-medium">
                      <td className="p-4">
                        <div>
                          <span className="font-extrabold text-slate-900 dark:text-white">{app.jobTitle}</span>
                          <p className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-0.5">{app.companyName}</p>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-slate-400 text-[10px]">
                        {app.appliedDate}
                      </td>
                      <td className="p-4">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded font-mono ${
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
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => navigateTo("job-details", { itemId: app.jobId })}
                          className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                        >
                          Requirements
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Col: Saved Bookmarks */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Bookmarked Openings</h3>

          {bookmarkedJobs.length === 0 ? (
            <div className="p-6 text-center rounded-3xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 text-xs text-slate-400">
              No bookmarks saved yet. Click the bookmark icon next to jobs to save them here.
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarkedJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 shadow-sm flex items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <h4
                      onClick={() => navigateTo("job-details", { itemId: job.id })}
                      className="text-xs font-black text-slate-900 dark:text-white hover:text-indigo-600 cursor-pointer line-clamp-1"
                    >
                      {job.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-bold block">{job.company}</span>
                  </div>

                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className="p-1.5 hover:bg-rose-500/10 text-rose-500 rounded-lg cursor-pointer"
                    title="Remove Bookmark"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

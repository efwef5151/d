import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Building, MapPin, Globe, Users, Calendar, Star, Search, ArrowLeft, ArrowRight } from "lucide-react";

export const Companies: React.FC = () => {
  const { companies, jobs, selectedCompanyId, navigateTo } = useApp();
  const [search, setSearch] = useState("");

  const activeCompany = companies.find((c) => c.id === selectedCompanyId) || null;

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  );

  if (activeCompany) {
    // COMPANY DETAIL SUB-VIEW
    const companyJobs = jobs.filter((j) => j.companyId === activeCompany.id);

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 select-none text-left animate-in fade-in duration-300">
        
        {/* Back Link */}
        <button
          onClick={() => navigateTo("companies")}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-950 dark:hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Companies
        </button>

        {/* Company Header Card */}
        <div className="p-8 rounded-3xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={activeCompany.logo}
              alt={activeCompany.name}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-slate-100 dark:ring-slate-800/60 shadow-md"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white">
                {activeCompany.name}
              </h1>
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                {activeCompany.industry}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {activeCompany.headquarters}</span>
                <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {activeCompany.website.replace("https://", "")}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/20 px-4 py-2 rounded-2xl">
            <Star className="w-4 h-4 text-amber-500 fill-current" />
            <span className="text-sm font-black text-slate-900 dark:text-white">{activeCompany.rating}</span>
            <span className="text-[10px] text-slate-400 font-bold">({activeCompany.reviewsCount} reviews)</span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* About Column */}
          <div className="md:col-span-2 space-y-6">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">About {activeCompany.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {activeCompany.about}
              </p>
            </div>

            {/* Active Openings */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Active Openings at {activeCompany.name} ({companyJobs.length})
              </h3>

              {companyJobs.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-slate-50/40 dark:bg-[#0d0e12]/30 border border-slate-200/40 dark:border-slate-800/40 text-xs text-slate-400">
                  No active openings currently published for this company.
                </div>
              ) : (
                <div className="space-y-3">
                  {companyJobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => navigateTo(job.isInternship ? "internship-details" : "job-details", { itemId: job.id })}
                      className="p-5 rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 hover:border-indigo-500/30 flex items-center justify-between gap-4 cursor-pointer hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {job.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <span>{job.type}</span>
                          <span>·</span>
                          <span>{job.location.split(",")[0]}</span>
                          <span>·</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">{job.salary}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Quick Stats sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 shadow-sm space-y-4 text-xs font-semibold">
              <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Company Metadata</h3>
              
              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/40">
                <span className="text-slate-400 flex items-center gap-1.5"><Users className="w-4 h-4" /> Workforce</span>
                <span className="text-slate-800 dark:text-slate-200">{activeCompany.employees}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/40">
                <span className="text-slate-400 flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Founded</span>
                <span className="text-slate-800 dark:text-slate-200">{activeCompany.founded}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/40">
                <span className="text-slate-400 flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Head Office</span>
                <span className="text-slate-800 dark:text-slate-200">{activeCompany.headquarters.split(",")[0]}</span>
              </div>

              <div className="pt-2 text-center">
                <a
                  href={activeCompany.website}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  Visit Corporate Site <Globe className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }

  // GENERAL LIST VIEW
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 select-none text-left animate-in fade-in duration-300">
      
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
          Elite Corporate Networks
        </h1>
        <p className="text-xs text-slate-400">
          Learn about our direct hiring companies, their workplace ratings, and active developers.
        </p>
      </div>

      {/* Search company */}
      <div className="relative flex items-center w-full max-w-md bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 rounded-2xl px-3.5 py-1 text-slate-800 dark:text-white focus-within:ring-2 focus-within:ring-indigo-500">
        <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search companies by name or domain..."
          className="w-full bg-transparent border-none text-xs py-2 focus:outline-none"
        />
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCompanies.map((comp) => {
          const compJobsCount = jobs.filter((j) => j.companyId === comp.id).length;
          return (
            <div
              key={comp.id}
              onClick={() => navigateTo("company-details", { companyId: comp.id })}
              className="group p-6 rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/50 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-indigo-500/20 cursor-pointer flex flex-col justify-between space-y-6 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <img
                    src={comp.logo}
                    alt={comp.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-800/60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500 bg-amber-500/5 dark:bg-amber-400/5 px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 fill-current" /> {comp.rating}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {comp.name}
                  </h3>
                  <p className="text-[10px] font-semibold text-slate-400">
                    {comp.industry}
                  </p>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                  {comp.about}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/40 text-[10px] font-bold text-slate-400 font-mono">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /> {comp.headquarters.split(",")[0]}</span>
                <span className="text-indigo-600 dark:text-indigo-400">{compJobsCount} active openings</span>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

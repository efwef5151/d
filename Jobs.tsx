import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Search, MapPin, Briefcase, IndianRupee, Sparkles, SlidersHorizontal, Bookmark, X } from "lucide-react";

export const Jobs: React.FC = () => {
  const { jobs, navigateTo, savedJobs, toggleSaveJob } = useApp();

  // Filter States
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [isLoading, setIsLoading] = useState(false);

  const locations = ["All", "Bengaluru", "Hyderabad", "Pune", "Chennai", "Mumbai", "Delhi", "Gurugram", "Noida", "Indore", "Ahmedabad"];
  const categories = ["All", "Frontend Development", "Backend Development", "Full Stack Development", "AI/ML", "Data Science", "Cloud Computing", "Cyber Security", "UI/UX Design", "Product Management"];
  const experiences = ["All", "Fresher", "1-3 Years", "3-5 Years", "5+ Years"];
  const types = ["All", "Full-Time", "Part-Time", "Contract", "Remote"];

  useEffect(() => {
    setIsLoading(true);
    const delayDebounce = setTimeout(() => {
      let filtered = jobs.filter((j) => !j.isInternship); // Jobs page focuses on jobs

      if (search.trim()) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
          (j) =>
            j.title.toLowerCase().includes(q) ||
            j.company.toLowerCase().includes(q) ||
            j.skills.some((s) => s.toLowerCase().includes(q))
        );
      }

      if (selectedLocation !== "All") {
        filtered = filtered.filter((j) => j.location.toLowerCase().includes(selectedLocation.toLowerCase()));
      }

      if (selectedCategory !== "All") {
        filtered = filtered.filter((j) => j.category === selectedCategory);
      }

      if (selectedExperience !== "All") {
        filtered = filtered.filter((j) => j.experience === selectedExperience);
      }

      if (selectedType !== "All") {
        filtered = filtered.filter((j) => j.type === selectedType);
      }

      setFilteredJobs(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, selectedLocation, selectedCategory, selectedExperience, selectedType, jobs]);

  const clearFilters = () => {
    setSearch("");
    setSelectedLocation("All");
    setSelectedCategory("All");
    setSelectedExperience("All");
    setSelectedType("All");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 select-none animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-left space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
          Explore Full-Time Roles
        </h1>
        <p className="text-xs text-slate-400">
          Find premier software engineering positions across India's top tech hubs.
        </p>
      </div>

      {/* Search & Filter Control Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 shadow-md space-y-4">
        
        {/* Row 1: Search */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs by title, skills, or company..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800/80 rounded-xl text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={clearFilters}
            className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <X className="w-3.5 h-3.5" /> Clear Filters
          </button>
        </div>

        {/* Row 2: Select Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          
          {/* Location */}
          <div className="text-left space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              {locations.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="text-left space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Job Domain</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Experience */}
          <div className="text-left space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Experience</label>
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              {experiences.map((ex) => (
                <option key={ex} value={ex}>{ex}</option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div className="text-left space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Working Style</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Main Results Panel */}
      <div className="space-y-4 text-left">
        {isLoading ? (
          // Loading Skeletons
          <div className="space-y-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0b0c10] animate-pulse flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
                  </div>
                </div>
                <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          // Empty State
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/50 dark:border-slate-800/80 space-y-4 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-950 flex items-center justify-center mx-auto text-slate-400">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-white">No Matching Jobs Found</h3>
            <p className="text-xs text-slate-400">
              We couldn't find any full-time roles matching those specific filters. Try expanding your location or skills query.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          // Results list
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => {
              const isSaved = savedJobs.includes(job.id);
              return (
                <div
                  key={job.id}
                  className="group relative rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/50 dark:border-slate-800/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-indigo-500/30 dark:hover:border-indigo-400/30 transition-all duration-300"
                >
                  
                  <div className="space-y-4">
                    
                    {/* Top Row: Logo & Save Bookmark */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-800/60"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h3 className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                            {job.title}
                          </h3>
                          <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{job.company}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className={`p-2 rounded-xl border transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/40 ${
                          isSaved
                            ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                            : "border-slate-200/60 dark:border-slate-800/60 text-slate-400 hover:text-slate-800 dark:hover:text-white"
                        }`}
                        title={isSaved ? "Remove Bookmark" : "Save Job"}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    {/* Metadata Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded font-mono">
                        {job.type}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded font-mono">
                        {job.salary}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 rounded font-mono flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" /> {job.location.split(",")[0]}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                      {job.description}
                    </p>

                    {/* Skills requirements */}
                    <div className="flex flex-wrap gap-1 pt-2">
                      {job.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] font-bold px-2 py-0.5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/40 dark:border-slate-800/40 text-slate-400 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                    <span className="text-[10px] font-bold text-slate-400 font-mono">
                      {job.postedAt}
                    </span>
                    <button
                      onClick={() => navigateTo("job-details", { itemId: job.id })}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black rounded-lg cursor-pointer transition-all shadow-md shadow-indigo-500/10"
                    >
                      View Details
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

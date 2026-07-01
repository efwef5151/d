import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Search, MapPin, Briefcase, IndianRupee, Sparkles, Bookmark, X, GraduationCap } from "lucide-react";

export const Internships: React.FC = () => {
  const { jobs, navigateTo, savedJobs, toggleSaveJob } = useApp();

  // Filter States
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [filteredInternships, setFilteredInternships] = useState(jobs);
  const [isLoading, setIsLoading] = useState(false);

  const locations = ["All", "Bengaluru", "Hyderabad", "Pune", "Chennai", "Mumbai", "Delhi", "Gurugram", "Noida"];
  const categories = ["All", "Frontend Development", "Backend Development", "Full Stack Development", "AI/ML", "Data Science", "UI/UX Design"];

  useEffect(() => {
    setIsLoading(true);
    const delayDebounce = setTimeout(() => {
      let filtered = jobs.filter((j) => j.isInternship); // Internships focuses strictly on internships

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

      setFilteredInternships(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, selectedLocation, selectedCategory, jobs]);

  const clearFilters = () => {
    setSearch("");
    setSelectedLocation("All");
    setSelectedCategory("All");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 select-none animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="text-left space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white">
          Internship & Fresher Hub
        </h1>
        <p className="text-xs text-slate-400">
          Kickstart your engineering career with direct corporate mentorship and structured stipend models.
        </p>
      </div>

      {/* Control Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search internships by role, skills, or tech..."
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          
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

          <div className="text-left space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Internship Category</label>
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

        </div>
      </div>

      {/* Results */}
      <div className="space-y-4 text-left">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map((s) => (
              <div key={s} className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0b0c10] animate-pulse flex flex-col gap-4" />
            ))}
          </div>
        ) : filteredInternships.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/50 dark:border-slate-800/80 space-y-4 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-950 flex items-center justify-center mx-auto text-slate-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-white">No Matching Internships Found</h3>
            <p className="text-xs text-slate-400">
              Try removing some keywords or filters to view general internships.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map((intern) => {
              const isSaved = savedJobs.includes(intern.id);
              return (
                <div
                  key={intern.id}
                  className="group relative rounded-2xl bg-white dark:bg-[#0b0c10] border border-slate-200/50 dark:border-slate-800/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-violet-500/30 dark:hover:border-violet-400/30 transition-all duration-300"
                >
                  
                  <div className="space-y-4">
                    
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={intern.logo}
                          alt={intern.company}
                          className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-800/60"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h3 className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-1">
                            {intern.title}
                          </h3>
                          <span className="text-[10px] text-slate-400 font-bold block mt-0.5">{intern.company}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleSaveJob(intern.id)}
                        className={`p-2 rounded-xl border transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/40 ${
                          isSaved
                            ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                            : "border-slate-200/60 dark:border-slate-800/60 text-slate-400 hover:text-slate-800 dark:hover:text-white"
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 rounded font-mono">
                        {intern.type}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded font-mono">
                        {intern.salary}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 rounded font-mono flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" /> {intern.location.split(",")[0]}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                      {intern.description}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-2">
                      {intern.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] font-bold px-2 py-0.5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/40 dark:border-slate-800/40 text-slate-400 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                  </div>

                  <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                    <span className="text-[10px] font-bold text-slate-400 font-mono">
                      {intern.postedAt}
                    </span>
                    <button
                      onClick={() => navigateTo("internship-details", { itemId: intern.id })}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black rounded-lg cursor-pointer transition-all shadow-md shadow-indigo-500/10"
                    >
                      View Requirements
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

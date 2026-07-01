import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { User, ShieldCheck, Mail, Phone, FileText, CheckCircle2, Award, Plus, X } from "lucide-react";

export const ProfilePage: React.FC = () => {
  const { currentUser, updateProfile, showAlert, navigateTo } = useApp();

  const [name, setName] = useState(currentUser?.name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [resumeName, setResumeName] = useState(currentUser?.resumeName || "");
  const [company, setCompany] = useState(currentUser?.company || "");
  
  const [skills, setSkills] = useState<string[]>(currentUser?.skills || []);
  const [newSkill, setNewSkill] = useState("");

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
          <User className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Profile Node Inaccessible</h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Please log in as an active candidate or recruiter preset to view or edit profile bio strings and skills.
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      bio,
      resumeName,
      company,
      skills
    });
    showAlert("Profile configurations updated successfully!", "success");
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (skills.includes(newSkill.trim())) {
      setNewSkill("");
      return;
    }
    const nextSkills = [...skills, newSkill.trim()];
    setSkills(nextSkills);
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 select-none text-left animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white flex items-center gap-2">
          Profile Settings <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-500 rounded-xl text-xs font-mono">{currentUser.role.toUpperCase()}</span>
        </h1>
        <p className="text-xs text-slate-400">
          Manage system biographical credentials, resume locations, and core developer skill tags.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Profile Card Side */}
        <div className="md:col-span-4 p-6 rounded-3xl bg-[#0d0e12] border border-slate-800/80 shadow-md text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/15">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white leading-tight">{currentUser.name}</h3>
            <span className="text-[10px] text-slate-400 font-bold block mt-0.5 font-mono">{currentUser.email}</span>
          </div>

          <div className="pt-2">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-1 font-mono">assigned preset role</span>
            <span className="text-xs font-extrabold text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-xl">
              {currentUser.role}
            </span>
          </div>
        </div>

        {/* Form Editor */}
        <div className="md:col-span-8 p-6 rounded-3xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 shadow-md space-y-6">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Biographical Configurations</h2>

          <form onSubmit={handleSave} className="space-y-4 text-xs font-bold text-slate-600 dark:text-slate-400">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800 rounded-xl font-medium text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800 rounded-xl font-medium text-slate-800 dark:text-white"
                />
              </div>
            </div>

            {currentUser.role === "Recruiter" && (
              <div>
                <label className="block mb-1">Hiring Organization / Corporate Group</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800 rounded-xl font-medium text-slate-800 dark:text-white"
                />
              </div>
            )}

            {currentUser.role === "Candidate" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Documented Resume Name</label>
                  <input
                    type="text"
                    value={resumeName}
                    onChange={(e) => setResumeName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800 rounded-xl font-medium text-slate-800 dark:text-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block mb-1">Professional Headline / Pitch</label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Brief summary of engineering objectives and technical toolbelt..."
                className="w-full p-2.5 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800 rounded-xl font-medium text-slate-800 dark:text-white resize-none"
              />
            </div>

            {/* Skills manager */}
            {currentUser.role === "Candidate" && (
              <div className="space-y-3 pt-2">
                <label className="block mb-1">Dynamic Developer Skills</label>
                
                <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-900 rounded-xl">
                  {skills.length === 0 ? (
                    <span className="text-[10px] text-slate-400">No tags added yet. Enter a technology skill tag below.</span>
                  ) : (
                    skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 rounded-lg"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="e.g. AWS, Node.js, C++"
                    className="w-full p-2 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-800 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-500/10 transition-all active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" /> Save Profile Metrics
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

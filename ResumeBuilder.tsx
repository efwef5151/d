import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Sparkles, FileText, Plus, Trash2, Printer, Download, Eye, Edit3 } from "lucide-react";

interface ExpEntry {
  company: string;
  role: string;
  duration: string;
  bullets: string;
}

interface ProjectEntry {
  title: string;
  tech: string;
  bullets: string;
}

export const ResumeBuilder: React.FC = () => {
  const { currentUser, showAlert } = useApp();

  // Resume Form State
  const [fullName, setFullName] = useState(currentUser?.name || "Arjun Mehta");
  const [email, setEmail] = useState(currentUser?.email || "arjun.mehta@example.com");
  const [phone, setPhone] = useState(currentUser?.phone || "+91 98765 43210");
  const [website, setWebsite] = useState("github.com/arjunmehta");
  
  const [college, setCollege] = useState("Indian Institute of Technology, Madras");
  const [degree, setDegree] = useState("B.Tech in Computer Science & Engineering");
  const [gpa, setGpa] = useState("8.8 / 10");
  const [gradYear, setGradYear] = useState("2026");

  const [skillsStr, setSkillsStr] = useState("React, Node.js, TypeScript, Express, PostgreSQL, Docker, AWS");

  const [experiences, setExperiences] = useState<ExpEntry[]>([
    {
      company: "Razorpay",
      role: "Software Engineering Intern",
      duration: "May 2025 - Present",
      bullets: "Collaborated in the core checkout infrastructure scaling merchant payment success rates by 2.4%.\nDesigned Redis cache routers that reduced database lookups on merchant credentials by 30%."
    }
  ]);

  const [projects, setProjects] = useState<ProjectEntry[]>([
    {
      title: "Luxora AI Platform",
      tech: "Vite, TypeScript, Tailwind CSS, Express",
      bullets: "Engineered an AI-powered career operating platform utilizing server-side Gemini SDK tokens.\nDesigned vertical timeline roadmaps and robust ATS score checks with procedural fallback arrays."
    }
  ]);

  const addExperience = () => {
    setExperiences([...experiences, { company: "", role: "", duration: "", bullets: "" }]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, key: keyof ExpEntry, value: string) => {
    const next = [...experiences];
    next[index][key] = value;
    setExperiences(next);
  };

  const addProject = () => {
    setProjects([...projects, { title: "", tech: "", bullets: "" }]);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const updateProject = (index: number, key: keyof ProjectEntry, value: string) => {
    const next = [...projects];
    next[index][key] = value;
    setProjects(next);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    showAlert("ATS-friendly text resume copied to clipboard!", "success");
    const resumeDoc = `
${fullName} | ${email} | ${phone} | ${website}
===================================================

EDUCATION
---------
${college}
${degree} (Graduation: ${gradYear}) | CGPA/GPA: ${gpa}

TECHNICAL SKILLS
----------------
${skillsStr}

EXPERIENCE
----------
${experiences.map((exp) => `${exp.company} - ${exp.role} (${exp.duration})\n${exp.bullets}`).join("\n\n")}

PROJECTS
--------
${projects.map((proj) => `${proj.title} [${proj.tech}]\n${proj.bullets}`).join("\n\n")}
`;
    navigator.clipboard.writeText(resumeDoc);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 select-none text-left print:bg-white print:p-0 print:text-slate-900">
      
      {/* Title (Hidden on Print) */}
      <div className="space-y-1.5 print:hidden">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white flex items-center gap-2">
          Luxora AI <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-500 rounded-xl text-xs font-mono">RESUME BUILDER</span>
        </h1>
        <p className="text-xs text-slate-400">
          Draft highly organized minimalist resumes designed for parsing success across modern applicant filters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Editor (Hidden on Print) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#0b0c10] border border-slate-200/60 dark:border-slate-800/80 shadow-md space-y-6 print:hidden">
          
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Details Editor</h2>
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 cursor-pointer"
                title="Print / Save PDF"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                onClick={handleExport}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 cursor-pointer"
                title="Copy Plaintext"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
            
            {/* Contact Details */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block">1. Personal Info</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800/80 rounded-lg text-xs font-medium text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800/80 rounded-lg text-xs font-medium text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800/80 rounded-lg text-xs font-medium text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1">Portfolio / Link</label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800/80 rounded-lg text-xs font-medium text-slate-800 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Education Details */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block">2. Education</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                  <label className="block mb-1">College/University</label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800/80 rounded-lg text-xs font-medium text-slate-800 dark:text-white"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block mb-1">Degree & Stream</label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800/80 rounded-lg text-xs font-medium text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1">CGPA / GPA</label>
                  <input
                    type="text"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800/80 rounded-lg text-xs font-medium text-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1">Graduation Year</label>
                  <input
                    type="text"
                    value={gradYear}
                    onChange={(e) => setGradYear(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800/80 rounded-lg text-xs font-medium text-slate-800 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Skills String */}
            <div className="space-y-1 pt-2">
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block mb-1">3. Tech Skills (Comma Separated)</span>
              <input
                type="text"
                value={skillsStr}
                onChange={(e) => setSkillsStr(e.target.value)}
                className="w-full p-2 bg-slate-50 dark:bg-[#121319] border border-slate-200 dark:border-slate-800/80 rounded-lg text-xs font-medium text-slate-800 dark:text-white"
              />
            </div>

            {/* Experience list */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">4. Work Experience</span>
                <button
                  onClick={addExperience}
                  className="px-2 py-1 bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 text-[9px] font-bold rounded flex items-center gap-1 cursor-pointer text-slate-600 dark:text-slate-300"
                >
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>

              {experiences.map((exp, idx) => (
                <div key={idx} className="p-3 border border-slate-200/50 dark:border-slate-800 rounded-xl space-y-2 relative">
                  <button
                    onClick={() => removeExperience(idx)}
                    className="absolute top-2.5 right-2.5 text-rose-500 hover:text-rose-600 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="grid grid-cols-2 gap-2 pr-6">
                    <div>
                      <label className="block text-[10px] mb-0.5">Employer Name</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(idx, "company", e.target.value)}
                        className="w-full p-1.5 bg-slate-50 dark:bg-[#121319] border border-slate-200 rounded text-xs text-slate-800 dark:text-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] mb-0.5">Designation/Role</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(idx, "role", e.target.value)}
                        className="w-full p-1.5 bg-slate-50 dark:bg-[#121319] border border-slate-200 rounded text-xs text-slate-800 dark:text-white font-medium"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] mb-0.5">Duration</label>
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => updateExperience(idx, "duration", e.target.value)}
                        className="w-full p-1.5 bg-slate-50 dark:bg-[#121319] border border-slate-200 rounded text-xs text-slate-800 dark:text-white font-medium"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] mb-0.5">Description bullets (Line separated)</label>
                      <textarea
                        rows={3}
                        value={exp.bullets}
                        onChange={(e) => updateExperience(idx, "bullets", e.target.value)}
                        className="w-full p-1.5 bg-slate-50 dark:bg-[#121319] border border-slate-200 rounded text-xs text-slate-800 dark:text-white font-medium resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Projects list */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">5. Key Software Projects</span>
                <button
                  onClick={addProject}
                  className="px-2 py-1 bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 text-[9px] font-bold rounded flex items-center gap-1 cursor-pointer text-slate-600 dark:text-slate-300"
                >
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>

              {projects.map((proj, idx) => (
                <div key={idx} className="p-3 border border-slate-200/50 dark:border-slate-800 rounded-xl space-y-2 relative">
                  <button
                    onClick={() => removeProject(idx)}
                    className="absolute top-2.5 right-2.5 text-rose-500 hover:text-rose-600 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="grid grid-cols-2 gap-2 pr-6">
                    <div>
                      <label className="block text-[10px] mb-0.5">Project Name</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => updateProject(idx, "title", e.target.value)}
                        className="w-full p-1.5 bg-slate-50 dark:bg-[#121319] border border-slate-200 rounded text-xs text-slate-800 dark:text-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] mb-0.5">Tech Stack</label>
                      <input
                        type="text"
                        value={proj.tech}
                        onChange={(e) => updateProject(idx, "tech", e.target.value)}
                        className="w-full p-1.5 bg-slate-50 dark:bg-[#121319] border border-slate-200 rounded text-xs text-slate-800 dark:text-white font-medium"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] mb-0.5">Project highlights (Line separated)</label>
                      <textarea
                        rows={3}
                        value={proj.bullets}
                        onChange={(e) => updateProject(idx, "bullets", e.target.value)}
                        className="w-full p-1.5 bg-slate-50 dark:bg-[#121319] border border-slate-200 rounded text-xs text-slate-800 dark:text-white font-medium resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Preview Pane (Printable) */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-slate-200/80 text-slate-900 shadow-md min-h-[840px] font-sans print:border-none print:shadow-none print:p-0 print:m-0">
          
          {/* Resume Header */}
          <div className="text-center space-y-2 pb-6 border-b border-slate-200">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">{fullName}</h1>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-500 font-medium">
              <span>{email}</span>
              <span>•</span>
              <span>{phone}</span>
              <span>•</span>
              <span>{website}</span>
            </div>
          </div>

          <div className="space-y-6 pt-6 text-left">
            
            {/* Education Block */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1">Education</h3>
              <div className="flex items-start justify-between text-xs">
                <div>
                  <h4 className="font-extrabold text-slate-900">{college}</h4>
                  <p className="text-slate-500 italic mt-0.5">{degree}</p>
                </div>
                <div className="text-right text-slate-500 font-semibold font-mono">
                  <span>Grad: {gradYear}</span>
                  <p className="mt-0.5">CGPA: {gpa}</p>
                </div>
              </div>
            </div>

            {/* Tech Skills */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1">Technical Skills</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-mono">
                {skillsStr}
              </p>
            </div>

            {/* Experience Block */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1">Experience</h3>
              
              {experiences.map((exp, i) => (
                <div key={i} className="space-y-1.5 text-xs">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-extrabold text-slate-900">{exp.company}</span>
                      <span className="text-slate-500 font-semibold"> — {exp.role}</span>
                    </div>
                    <span className="text-slate-500 font-semibold font-mono shrink-0">{exp.duration}</span>
                  </div>
                  <ul className="space-y-1 pl-4 list-disc text-slate-600 leading-relaxed">
                    {exp.bullets.split("\n").filter(Boolean).map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Projects Block */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800 border-b border-slate-300 pb-1">Academic & Core Projects</h3>
              
              {projects.map((proj, i) => (
                <div key={i} className="space-y-1.5 text-xs">
                  <div className="flex items-start justify-between">
                    <span className="font-extrabold text-slate-900">{proj.title}</span>
                    <span className="text-slate-500 font-semibold font-mono shrink-0">Technologies: {proj.tech}</span>
                  </div>
                  <ul className="space-y-1 pl-4 list-disc text-slate-600 leading-relaxed">
                    {proj.bullets.split("\n").filter(Boolean).map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

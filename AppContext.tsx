import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, Job, Application, Company, CareerRoadmapReport, ATSAnalysisReport } from "../types";
import { mockJobs, indianCompanies } from "../data/mockData";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface AlertMessage {
  id: string;
  type: "success" | "error" | "info";
  text: string;
}

interface AppContextType {
  // Navigation
  currentPage: string;
  selectedItemId: string | null;
  selectedCompanyId: string | null;
  navigateTo: (page: string, params?: { itemId?: string; companyId?: string }) => void;

  // Auth & Profile
  currentUser: UserProfile | null;
  login: (email: string, role: "Candidate" | "Recruiter" | "Admin") => boolean;
  signup: (name: string, email: string, role: "Candidate" | "Recruiter" | "Admin") => boolean;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  isLoginModalOpen: boolean;
  setLoginModalOpen: (open: boolean) => void;

  // Jobs, Internships, Companies
  jobs: Job[];
  companies: Company[];
  postJob: (newJob: Omit<Job, "id" | "postedAt" | "applicantsCount" | "companyId">) => void;
  deleteJob: (jobId: string) => void;

  // Applications
  applications: Application[];
  applyToJob: (jobId: string, details: { resumeName: string; coverLetter?: string; phone: string }) => boolean;
  updateApplicationStatus: (appId: string, status: Application["status"]) => void;

  // Saved / Bookmarked
  savedJobs: string[];
  toggleSaveJob: (jobId: string) => void;

  // Notifications & Alerts
  notifications: Notification[];
  markAllNotificationsRead: () => void;
  alerts: AlertMessage[];
  showAlert: (text: string, type?: "success" | "error" | "info") => void;

  // AI Cache & State
  atsReport: ATSAnalysisReport | null;
  setAtsReport: (report: ATSAnalysisReport | null) => void;
  activeRoadmap: CareerRoadmapReport | null;
  setActiveRoadmap: (roadmap: CareerRoadmapReport | null) => void;

  // Dark / Light Mode
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Default guest / seed users
const INITIAL_CANDIDATE: UserProfile = {
  id: "user-candidate-1",
  name: "Arjun Mehta",
  email: "arjun.mehta@example.com",
  role: "Candidate",
  profileCompleted: 75,
  skills: ["React", "TypeScript", "Tailwind CSS", "JavaScript", "Node.js"],
  resumeName: "Arjun_Mehta_Software_Engineer.pdf",
  resumeText: "Experienced React Developer with 2 years of developing high-fidelity web apps. Skilled in state managers like Zustand, responsive grids via Tailwind CSS v4, and standard REST architectures.",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&q=80",
  education: "B.Tech in Computer Science, VIT Vellore",
  experience: "Frontend Dev at FinTech Studio (18 Months)",
  phone: "+91 98765 43210",
  location: "Bengaluru, Karnataka",
  bio: "Passionate product builder with a strong eye for visuals, custom CSS interactions, and reliable, clean states.",
  savedJobs: ["job-1"]
};

const INITIAL_RECRUITER: UserProfile = {
  id: "user-recruiter-1",
  name: "Sneha Reddy",
  email: "sneha.reddy@razorpay.com",
  role: "Recruiter",
  profileCompleted: 95,
  skills: ["Technical Sourcing", "System Design Audits", "Hiring Analytics"],
  resumeName: "",
  resumeText: "",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80",
  education: "MBA in HR, XLRI Jamshedpur",
  experience: "Lead Talent Acquisition at Razorpay (4 Years)",
  phone: "+91 91234 56789",
  location: "Bengaluru, Karnataka",
  bio: "Sourcing exceptional engineering minds to build India's payments operating system.",
  savedJobs: []
};

const INITIAL_ADMIN: UserProfile = {
  id: "user-admin-1",
  name: "Dev Patel",
  email: "admin@luxora.ai",
  role: "Admin",
  profileCompleted: 100,
  skills: ["SaaS Operations", "Security Compliance", "Platform Analytics"],
  resumeName: "",
  resumeText: "",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80",
  education: "M.S. in Software Systems, BITS Pilani",
  experience: "Co-Founder & Platform Architect at Luxora AI",
  phone: "+91 88888 88888",
  location: "Mumbai, Maharashtra",
  bio: "Overseeing platform health and model integrations.",
  savedJobs: []
};

const SEED_APPLICATIONS: Application[] = [
  {
    id: "app-1",
    jobId: "job-1",
    jobTitle: "Senior Full Stack Engineer (React/Node)",
    company: "Razorpay",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=150&h=150&fit=crop&q=80",
    appliedDate: "2026-06-25",
    status: "Interviewing",
    resumeName: "Arjun_Mehta_Software_Engineer.pdf",
    matchScore: 88,
    candidateName: "Arjun Mehta",
    candidateEmail: "arjun.mehta@example.com",
    candidatePhone: "+91 98765 43210"
  },
  {
    id: "app-2",
    jobId: "job-3",
    jobTitle: "SaaS Product Engineer (Frontend)",
    company: "Zoho Corporation",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=150&fit=crop&q=80",
    appliedDate: "2026-06-28",
    status: "Applied",
    resumeName: "Arjun_Mehta_Software_Engineer.pdf",
    matchScore: 75,
    candidateName: "Arjun Mehta",
    candidateEmail: "arjun.mehta@example.com",
    candidatePhone: "+91 98765 43210"
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation from Hash
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem("luxora_user");
      return saved && saved !== "null" && saved !== "undefined" && saved !== "" ? JSON.parse(saved) : INITIAL_CANDIDATE;
    } catch (e) {
      console.error("Error reading currentUser from localStorage:", e);
      return INITIAL_CANDIDATE;
    }
  });

  const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false);

  // Theme
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem("luxora_theme") !== "light"; // Default dark theme (premium feel)
    } catch (e) {
      return true;
    }
  });

  // Jobs, Companies, Applications, Saved Jobs
  const [jobs, setJobs] = useState<Job[]>(() => {
    try {
      const saved = localStorage.getItem("luxora_jobs");
      return saved && saved !== "" ? JSON.parse(saved) : mockJobs;
    } catch (e) {
      console.error("Error reading jobs from localStorage:", e);
      return mockJobs;
    }
  });

  const [companies, setCompanies] = useState<Company[]>(indianCompanies);

  const [applications, setApplications] = useState<Application[]>(() => {
    try {
      const saved = localStorage.getItem("luxora_applications");
      return saved && saved !== "" ? JSON.parse(saved) : SEED_APPLICATIONS;
    } catch (e) {
      console.error("Error reading applications from localStorage:", e);
      return SEED_APPLICATIONS;
    }
  });

  const [savedJobs, setSavedJobs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("luxora_saved_jobs");
      return saved && saved !== "" ? JSON.parse(saved) : ["job-1"];
    } catch (e) {
      console.error("Error reading savedJobs from localStorage:", e);
      return ["job-1"];
    }
  });

  // Alerts & Notifications
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      const saved = localStorage.getItem("luxora_notifications");
      return saved && saved !== "" ? JSON.parse(saved) : [
        {
          id: "notif-1",
          title: "Application Status Updated",
          message: "Your application for Senior Full Stack Engineer at Razorpay is now in the 'Interviewing' stage.",
          time: "2 hours ago",
          read: false
        },
        {
          id: "notif-2",
          title: "Profile Recommendation Matching",
          message: "Google India posted a new internship 'AI & ML Model Training' matching 90% of your skillset.",
          time: "1 day ago",
          read: false
        }
      ];
    } catch (e) {
      console.error("Error reading notifications from localStorage:", e);
      return [];
    }
  });

  // AI Cached report states
  const [atsReport, setAtsReport] = useState<ATSAnalysisReport | null>(null);
  const [activeRoadmap, setActiveRoadmap] = useState<CareerRoadmapReport | null>(null);

  // Save to LocalStorage helpers
  useEffect(() => {
    localStorage.setItem("luxora_user", currentUser ? JSON.stringify(currentUser) : "");
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("luxora_jobs", JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem("luxora_applications", JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem("luxora_saved_jobs", JSON.stringify(savedJobs));
  }, [savedJobs]);

  useEffect(() => {
    localStorage.setItem("luxora_notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Dark/Light theme sync
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("luxora_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("luxora_theme", "light");
    }
  }, [isDarkMode]);

  // Handle Hash Router Logic
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || "#/";
      const cleanHash = hash.replace("#", "");

      if (cleanHash === "/" || cleanHash === "") {
        setCurrentPage("home");
        setSelectedItemId(null);
        setSelectedCompanyId(null);
      } else if (cleanHash.startsWith("/job/")) {
        const id = cleanHash.split("/job/")[1];
        setCurrentPage("job-details");
        setSelectedItemId(id);
      } else if (cleanHash.startsWith("/internship/")) {
        const id = cleanHash.split("/internship/")[1];
        setCurrentPage("internship-details");
        setSelectedItemId(id);
      } else if (cleanHash.startsWith("/company/")) {
        const id = cleanHash.split("/company/")[1];
        setCurrentPage("companies");
        setSelectedCompanyId(id);
      } else {
        // Direct Pages: 'jobs', 'internships', 'companies', 'login', 'signup', etc.
        const page = cleanHash.replace("/", "");
        setCurrentPage(page);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Run once initially

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Custom Navigation function
  const navigateTo = (page: string, params?: { itemId?: string; companyId?: string }) => {
    if (page === "home") {
      window.location.hash = "/";
    } else if (page === "job-details" && params?.itemId) {
      window.location.hash = `/job/${params.itemId}`;
    } else if (page === "internship-details" && params?.itemId) {
      window.location.hash = `/internship/${params.itemId}`;
    } else if (page === "company-details" && params?.companyId) {
      window.location.hash = `/company/${params.companyId}`;
    } else {
      window.location.hash = `/${page}`;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Authentication Actions
  const login = (email: string, role: "Candidate" | "Recruiter" | "Admin") => {
    let mockUser: UserProfile = INITIAL_CANDIDATE;
    if (role === "Recruiter") mockUser = INITIAL_RECRUITER;
    else if (role === "Admin") mockUser = INITIAL_ADMIN;

    const user: UserProfile = {
      ...mockUser,
      email: email,
    };
    setCurrentUser(user);
    showAlert(`Welcome back, ${user.name}! Successful login as ${role}.`, "success");
    navigateTo("home");
    return true;
  };

  const signup = (name: string, email: string, role: "Candidate" | "Recruiter" | "Admin") => {
    let baseUser = INITIAL_CANDIDATE;
    if (role === "Recruiter") baseUser = INITIAL_RECRUITER;
    else if (role === "Admin") baseUser = INITIAL_ADMIN;

    const newUser: UserProfile = {
      ...baseUser,
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      profileCompleted: 35,
      skills: role === "Candidate" ? ["React"] : [],
    };
    setCurrentUser(newUser);
    showAlert(`Account created successfully as ${role}! Welcome to Luxora.`, "success");
    navigateTo("home");
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showAlert("Logged out successfully.", "info");
    navigateTo("home");
  };

  const updateProfile = (profile: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...profile };
    setCurrentUser(updated);
    showAlert("Profile updated successfully.", "success");
  };

  // Jobs Actions
  const postJob = (newJob: Omit<Job, "id" | "postedAt" | "applicantsCount" | "companyId">) => {
    const job: Job = {
      ...newJob,
      id: `job-${Date.now()}`,
      postedAt: "Just now",
      applicantsCount: 0,
      companyId: "razorpay" // Linked to recruiter company
    };
    setJobs([job, ...jobs]);
    showAlert("Job opening published successfully!", "success");
  };

  const deleteJob = (jobId: string) => {
    setJobs(jobs.filter(j => j.id !== jobId));
    showAlert("Job opening removed successfully.", "info");
  };

  // Applications Action
  const applyToJob = (jobId: string, details: { resumeName: string; coverLetter?: string; phone: string }) => {
    if (!currentUser) {
      setLoginModalOpen(true);
      showAlert("Please log in to apply for openings.", "error");
      return false;
    }

    // Prevent duplicate application
    const alreadyApplied = applications.some(app => app.jobId === jobId && app.candidateEmail === currentUser.email);
    if (alreadyApplied) {
      showAlert("You have already applied to this position.", "error");
      return false;
    }

    const job = jobs.find(j => j.id === jobId);
    if (!job) return false;

    // Simulate match score based on candidate skills and job requirements
    const matchCount = job.skills.filter(s => currentUser.skills.map(sk => sk.toLowerCase()).includes(s.toLowerCase())).length;
    const matchScore = Math.min(100, Math.max(45, Math.floor((matchCount / job.skills.length) * 100) + Math.floor(Math.random() * 20)));

    const newApplication: Application = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: job.title,
      company: job.company,
      logo: job.logo,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Applied",
      resumeName: details.resumeName || currentUser.resumeName || "Uploaded_Resume.pdf",
      matchScore,
      candidateName: currentUser.name,
      candidateEmail: currentUser.email,
      candidatePhone: details.phone,
      coverLetter: details.coverLetter
    };

    // Update state
    setApplications([newApplication, ...applications]);

    // Add notification
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      title: "Application Received",
      message: `Your application for ${job.title} at ${job.company} has been received. Match Score: ${matchScore}%.`,
      time: "Just now",
      read: false
    };
    setNotifications([newNotif, ...notifications]);

    showAlert(`Successfully applied to ${job.company}! Match Score: ${matchScore}%`, "success");
    return true;
  };

  const updateApplicationStatus = (appId: string, status: Application["status"]) => {
    setApplications(applications.map(app => {
      if (app.id === appId) {
        // Send notification about status update
        const newNotif: Notification = {
          id: `notif-${Date.now()}`,
          title: "Application Status Updated",
          message: `Your application for ${app.jobTitle} at ${app.company} has been updated to '${status}'.`,
          time: "Just now",
          read: false
        };
        setNotifications([newNotif, ...notifications]);
        return { ...app, status };
      }
      return app;
    }));
    showAlert(`Application status updated to ${status}.`, "success");
  };

  // Saved Jobs Action
  const toggleSaveJob = (jobId: string) => {
    if (!currentUser) {
      setLoginModalOpen(true);
      showAlert("Please login before saving jobs.", "info");
      return;
    }

    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
      showAlert("Job removed from saved bookmarks.", "info");
    } else {
      setSavedJobs([...savedJobs, jobId]);
      showAlert("Job bookmarked successfully!", "success");
    }
  };

  // Notification management
  const markAllNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    showAlert("All notifications marked as read.", "success");
  };

  // Show customized floating alerts
  const showAlert = (text: string, type: "success" | "error" | "info" = "success") => {
    const newAlert: AlertMessage = {
      id: `alert-${Date.now()}`,
      type,
      text
    };
    setAlerts(prev => [...prev, newAlert]);
    // Auto-dismiss alert after 4s
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== newAlert.id));
    }, 4000);
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        selectedItemId,
        selectedCompanyId,
        navigateTo,
        currentUser,
        login,
        signup,
        logout,
        updateProfile,
        isLoginModalOpen,
        setLoginModalOpen,
        jobs,
        companies,
        postJob,
        deleteJob,
        applications,
        applyToJob,
        updateApplicationStatus,
        savedJobs,
        toggleSaveJob,
        notifications,
        markAllNotificationsRead,
        alerts,
        showAlert,
        atsReport,
        setAtsReport,
        activeRoadmap,
        setActiveRoadmap,
        isDarkMode,
        toggleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { FloatingNav } from "./components/FloatingNav";
import { Footer } from "./components/Footer";
import { AlertToast } from "./components/AlertToast";
import { LoginModal } from "./components/LoginModal";

// Import all pages
import { Home } from "./pages/Home";
import { Jobs } from "./pages/Jobs";
import { Internships } from "./pages/Internships";
import { Companies } from "./pages/Companies";
import { JobDetails } from "./pages/JobDetails";
import { InternshipDetails } from "./pages/InternshipDetails";
import { CandidateDashboard } from "./pages/CandidateDashboard";
import { RecruiterDashboard } from "./pages/RecruiterDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { ProfilePage } from "./pages/ProfilePage";
import { ATSResumeChecker } from "./pages/ATSResumeChecker";
import { CareerRoadmaps } from "./pages/CareerRoadmaps";
import { ResumeBuilder } from "./pages/ResumeBuilder";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { FAQ } from "./pages/FAQ";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";

const PageRenderer: React.FC = () => {
  const { currentPage } = useApp();

  switch (currentPage) {
    case "home":
      return <Home />;
    case "jobs":
      return <Jobs />;
    case "internships":
      return <Internships />;
    case "companies":
    case "company-details":
      return <Companies />;
    case "job-details":
      return <JobDetails />;
    case "internship-details":
      return <InternshipDetails />;
    case "dashboard":
    case "candidate-dashboard":
      return <CandidateDashboard />;
    case "recruiter":
    case "recruiter-dashboard":
      return <RecruiterDashboard />;
    case "admin":
    case "admin-dashboard":
      return <AdminDashboard />;
    case "profile":
      return <ProfilePage />;
    case "ats-checker":
      return <ATSResumeChecker />;
    case "roadmaps":
      return <CareerRoadmaps />;
    case "resume-builder":
      return <ResumeBuilder />;
    case "about":
      return <About />;
    case "contact":
      return <Contact />;
    case "faq":
      return <FAQ />;
    case "privacy":
      return <PrivacyPolicy />;
    default:
      return <Home />;
  }
};

const MainLayout: React.FC = () => {
  const { isDarkMode } = useApp();

  return (
    <div className={isDarkMode ? "dark bg-[#050505] text-slate-200 min-h-screen relative overflow-x-hidden" : "bg-slate-50/60 text-slate-900 min-h-screen relative overflow-x-hidden"}>
      {isDarkMode && (
        <>
          <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
          <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
        </>
      )}
      <div className="flex flex-col min-h-screen transition-colors duration-300 relative z-10">
        
        {/* Navigation Bar */}
        <FloatingNav />

        {/* Dynamic page container */}
        <main id="app-viewport" className="flex-grow pt-24 pb-12">
          <PageRenderer />
        </main>

        {/* Dynamic global layers */}
        <LoginModal />
        <AlertToast />

        {/* Global Footer */}
        <Footer />

      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

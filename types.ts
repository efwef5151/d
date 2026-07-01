export type UserRole = "Candidate" | "Recruiter" | "Admin";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileCompleted: number; // Percentage
  skills: string[];
  resumeName: string;
  resumeText: string;
  avatar: string;
  education: string;
  experience: string;
  phone: string;
  location: string;
  bio: string;
  savedJobs: string[]; // Job/Internship IDs
}

export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Contract" | "Remote" | "Internship";
  category: string;
  experience: "Fresher" | "1-3 Years" | "3-5 Years" | "5+ Years" | "Internship";
  salary: string;
  postedAt: string;
  skills: string[];
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  applicantsCount: number;
  companyId: string;
  isInternship: boolean;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  employees: string;
  founded: string;
  about: string;
  headquarters: string;
  jobsCount: number;
  rating: number;
  reviewsCount: number;
  locations: string[];
  website: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  logo: string;
  appliedDate: string;
  status: "Applied" | "Screening" | "Interviewing" | "Offered" | "Rejected";
  resumeName: string;
  matchScore: number;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  coverLetter?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
  rating: number;
}

export interface CareerMilestone {
  title: string;
  duration: string;
  topics: string[];
  resources: string[];
}

export interface CareerRoadmapReport {
  role: string;
  timeframe: string;
  milestones: CareerMilestone[];
  skillsToFocus: string[];
  certifications: string[];
}

export interface ATSAnalysisReport {
  score: number;
  foundKeywords: string[];
  missingKeywords: string[];
  summary: string;
  actionPlan: string[];
  marketDemand: string;
}

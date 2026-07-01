import { Company, Job, Testimonial, FAQItem } from "../types";

export const indianCompanies: Company[] = [
  {
    id: "google-india",
    name: "Google India",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=150&h=150&fit=crop&q=80",
    industry: "Consumer Tech, AI, Cloud Computing",
    employees: "10,000+",
    founded: "2004 (India)",
    about: "Google India builds world-class systems, apps, and services for localized and international markets. Our Engineering hubs in Bengaluru and Hyderabad drive cutting-edge breakthroughs in Search, Ads, Cloud, and AI systems.",
    headquarters: "Bengaluru, Karnataka",
    jobsCount: 14,
    rating: 4.8,
    reviewsCount: 2450,
    locations: ["Bengaluru", "Hyderabad", "Gurugram", "Mumbai"],
    website: "https://careers.google.com"
  },
  {
    id: "microsoft-india",
    name: "Microsoft India",
    logo: "https://images.unsplash.com/photo-1625014020903-e329f586c990?w=150&h=150&fit=crop&q=80",
    industry: "Enterprise Software, AI, Cloud Systems",
    employees: "15,000+",
    founded: "1990 (India)",
    about: "Microsoft India leads the transformation in digital workspace, cloud capabilities via Azure, and deep integration of AI models. Our developers work on core Windows modules, Xbox Live infrastructure, and Next-Gen Azure layers.",
    headquarters: "Hyderabad, Telangana",
    jobsCount: 11,
    rating: 4.7,
    reviewsCount: 1980,
    locations: ["Hyderabad", "Bengaluru", "Noida", "Pune"],
    website: "https://careers.microsoft.com"
  },
  {
    id: "razorpay",
    name: "Razorpay",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=150&h=150&fit=crop&q=80",
    industry: "Fintech, Payment Gateway",
    employees: "3,000+",
    founded: "2014",
    about: "Razorpay is India's leading payments and banking platform for businesses. We help businesses accept, process, and disburse payments with its product suite, rendering unmatched merchant developer experiences.",
    headquarters: "Bengaluru, Karnataka",
    jobsCount: 8,
    rating: 4.5,
    reviewsCount: 780,
    locations: ["Bengaluru", "Mumbai", "Pune"],
    website: "https://razorpay.com"
  },
  {
    id: "zoho",
    name: "Zoho Corporation",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=150&fit=crop&q=80",
    industry: "SaaS, CRM, Business Software",
    employees: "12,000+",
    founded: "1996",
    about: "Zoho is a unique, bootstrapped, product-driven SaaS leader based in Chennai, offering a comprehensive suite of cloud business apps. We design every module from database systems to web templates in-house.",
    headquarters: "Chennai, Tamil Nadu",
    jobsCount: 12,
    rating: 4.6,
    reviewsCount: 1150,
    locations: ["Chennai", "Tenkasi", "Coimbatore", "Bengaluru"],
    website: "https://zoho.com"
  },
  {
    id: "phonepe",
    name: "PhonePe",
    logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=150&h=150&fit=crop&q=80",
    industry: "Fintech, Digital Wallets, UPI",
    employees: "4,000+",
    founded: "2015",
    about: "PhonePe is India's largest transaction application platform on UPI. We process billions of daily micro-payments, scaling robust backends to secure Indian consumers' daily payments and digital insurance purchases.",
    headquarters: "Bengaluru, Karnataka",
    jobsCount: 6,
    rating: 4.4,
    reviewsCount: 620,
    locations: ["Bengaluru", "Pune", "Mumbai"],
    website: "https://phonepe.com"
  },
  {
    id: "flipkart",
    name: "Flipkart",
    logo: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?w=150&h=150&fit=crop&q=80",
    industry: "E-Commerce, Logistics",
    employees: "20,000+",
    founded: "2007",
    about: "Flipkart is India's leading domestic e-commerce marketplace, scaling massive retail architectures. Our teams solve complex algorithmic problems in pricing systems, recommendation graphs, and delivery logistics.",
    headquarters: "Bengaluru, Karnataka",
    jobsCount: 9,
    rating: 4.3,
    reviewsCount: 2150,
    locations: ["Bengaluru", "Hyderabad", "Delhi", "Gurugram"],
    website: "https://flipkart.com"
  },
  {
    id: "zomato",
    name: "Zomato",
    logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=150&h=150&fit=crop&q=80",
    industry: "FoodTech, Hyperlocal Logistics",
    employees: "5,000+",
    founded: "2008",
    about: "Zomato drives the hyperlocal food technology space in India, enabling quick delivery logistics. Together with Blinkit, we pioneer fast retail solutions, operating at high scale and robust real-time delivery tracking.",
    headquarters: "Gurugram, Haryana",
    jobsCount: 7,
    rating: 4.4,
    reviewsCount: 940,
    locations: ["Gurugram", "Delhi", "Bengaluru", "Mumbai"],
    website: "https://zomato.com"
  },
  {
    id: "tcs",
    name: "Tata Consultancy Services (TCS)",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&h=150&fit=crop&q=80",
    industry: "IT Services, Tech Consulting",
    employees: "600,000+",
    founded: "1968",
    about: "TCS is a global leader in IT services, consulting, and business solutions, partnering with the world's largest businesses. We scale massive state projects and corporate software networks across multiple oceans.",
    headquarters: "Mumbai, Maharashtra",
    jobsCount: 25,
    rating: 4.0,
    reviewsCount: 15400,
    locations: ["Mumbai", "Bengaluru", "Pune", "Hyderabad", "Chennai", "Kolkata", "Indore", "Ahmedabad"],
    website: "https://tcs.com"
  }
];

export const mockJobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Full Stack Engineer (React/Node)",
    company: "Razorpay",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=150&h=150&fit=crop&q=80",
    location: "Bengaluru, Karnataka",
    type: "Full-Time",
    category: "Full Stack Development",
    experience: "3-5 Years",
    salary: "₹24 - ₹32 LPA",
    postedAt: "1 day ago",
    skills: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    description: "We are seeking a Senior Full Stack Engineer to lead the design and implementation of Razorpay's next-generation merchant merchant checkout APIs and web control dashboards.",
    requirements: [
      "Minimum of 3 years of hands-on experience building scalable SaaS web nodes.",
      "In-depth command of React hooks, context, state optimization, and Tailwind layout techniques.",
      "Proven history of managing high-traffic REST or GraphQL APIs in Node.js.",
      "Experience with transaction databases, query optimization, and connection pooling in PostgreSQL."
    ],
    responsibilities: [
      "Architect and code performant checkout components loaded by millions of end users daily.",
      "Collaborate with product designers and backend API nodes to optimize page weight and transaction latency.",
      "Audit API vulnerabilities, implementing rigorous rate-limiting and session validations.",
      "Mentor and guide junior and mid-level software developers through code reviews."
    ],
    benefits: [
      "Full comprehensive family health insurance.",
      "High-spec MacBook Pro hardware and home office allowances.",
      "Performance-linked stock options (ESOPs) and annual bonuses.",
      "Generous learning budget for certifications and tech conferences."
    ],
    applicantsCount: 142,
    companyId: "razorpay",
    isInternship: false
  },
  {
    id: "job-2",
    title: "AI / ML Research Engineer",
    company: "Google India",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=150&h=150&fit=crop&q=80",
    location: "Bengaluru, Karnataka",
    type: "Full-Time",
    category: "AI/ML",
    experience: "3-5 Years",
    salary: "₹38 - ₹50 LPA",
    postedAt: "2 days ago",
    skills: ["Python", "PyTorch", "Transformers", "Gemini API", "LLMs", "TensorFlow"],
    description: "Google India is looking for an AI/ML Research Engineer to join our localized Core Intelligence Group. You will work on optimizing large language models for Indian regional languages (IndicNLP).",
    requirements: [
      "Strong background in neural network architectures, attention mechanisms, and fine-tuning techniques.",
      "Deep programming proficiency in Python, PyTorch, or JAX, with active project portfolios.",
      "Experience working with cloud training clusters (TPUs/GPUs) and large NLP dataset parsing.",
      "Familiarity with building API nodes that leverage state-of-the-art generative models."
    ],
    responsibilities: [
      "Train, fine-tune, and evaluate deep learning models on specialized multi-lingual Indian datasets.",
      "Optimize model weight sizes for localized on-device compilation and low-latency inference.",
      "Design reliable evaluation pipelines for regional translation accuracy and safety filters.",
      "Contribute directly to core system components supporting localized Google Assistant networks."
    ],
    benefits: [
      "Premium wellness clinics and fully stacked campus micro-kitchens.",
      "Substantial global equity plans (GSU units).",
      "Flexible work options with hybrid work setups.",
      "Unlimited technical and management career coaching."
    ],
    applicantsCount: 289,
    companyId: "google-india",
    isInternship: false
  },
  {
    id: "job-3",
    title: "SaaS Product Engineer (Frontend)",
    company: "Zoho Corporation",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=150&fit=crop&q=80",
    location: "Chennai, Tamil Nadu",
    type: "Full-Time",
    category: "Frontend Development",
    experience: "1-3 Years",
    salary: "₹12 - ₹18 LPA",
    postedAt: "Today",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "State Management", "Data Vis"],
    description: "Join the Zoho Mail / Zoho Docs team to design clean, high-performance interfaces. You will construct modular layouts that remain fast even when handling hundreds of heavy real-time files.",
    requirements: [
      "Strong conceptual command of standard JavaScript, DOM operations, and browser event cycles.",
      "At least 1 year of experience building complex client-side applications in React, Vue, or Angular.",
      "Passion for building highly accessible UI elements conforming to WCAG standards.",
      "Strong grasp of design structures, margins, visual consistency, and responsive styling grids."
    ],
    responsibilities: [
      "Refactor legacy client-side workspaces to improve loading times by 40% using modern React 19.",
      "Incorporate complex drag-and-drop mechanics, interactive tables, and charts for files dashboards.",
      "Design consistent CSS styling structures, keeping the interface clean and visually cohesive.",
      "Contribute ideas for visual components that make software more pleasant for daily users."
    ],
    benefits: [
      "Bootstrapped, secure, long-term employment values without VC-linked pressure.",
      "On-campus housing support and delicious organic cafeterias.",
      "Excellent mentorship from product engineering veterans.",
      "Stable career pathing with annual standard increments."
    ],
    applicantsCount: 84,
    companyId: "zoho",
    isInternship: false
  },
  {
    id: "job-4",
    title: "Backend Cloud Developer",
    company: "Microsoft India",
    logo: "https://images.unsplash.com/photo-1625014020903-e329f586c990?w=150&h=150&fit=crop&q=80",
    location: "Hyderabad, Telangana",
    type: "Full-Time",
    category: "Backend Development",
    experience: "5+ Years",
    salary: "₹32 - ₹45 LPA",
    postedAt: "3 days ago",
    skills: ["C#", ".NET Core", "Azure Services", "Kubernetes", "Microservices", "Docker"],
    description: "We are hiring a Backend Cloud Developer to architect distributed system infrastructure on Microsoft Azure. Help us run cloud services with 99.99% reliability.",
    requirements: [
      "5+ years of software industry experience with deep backend proficiency in OOP (C#/.NET, Java, Go, or Rust).",
      "Expert knowledge in relational and non-relational database design and query tuning.",
      "Hands-on experience deploying containerized workloads onto Azure AKS or AWS EKS clusters.",
      "Strong analytical skills regarding asynchronous communication, event brokers (Kafka/RabbitMQ)."
    ],
    responsibilities: [
      "Design, build, and maintain Azure cloud services that orchestrate heavy virtualized workloads.",
      "Collaborate with devops teams to implement comprehensive logging, telemetry, and automated CI/CD.",
      "Analyze resource footprints, refactoring bottleneck services to reduce compute overhead by 20%.",
      "Lead cross-functional technical planning reviews across product lines."
    ],
    benefits: [
      "Generous ESPP (Employee Stock Purchase Program) with direct discounts.",
      "Elite gym memberships and on-site recreation lounges.",
      "Global transfer possibilities and structural training programs.",
      "Full health coverage including parents and in-laws."
    ],
    applicantsCount: 201,
    companyId: "microsoft-india",
    isInternship: false
  },
  {
    id: "job-5",
    title: "Security Operations Analyst",
    company: "Tata Consultancy Services (TCS)",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&h=150&fit=crop&q=80",
    location: "Pune, Maharashtra",
    type: "Full-Time",
    category: "Cyber Security",
    experience: "1-3 Years",
    salary: "₹8 - ₹12 LPA",
    postedAt: "4 days ago",
    skills: ["SIEM", "Vulnerability Scanning", "Network Security", "Linux", "OWASP"],
    description: "TCS Enterprise Security Division is looking for a Security Analyst to join our threat intelligence and operational response team protecting global banking partner databases.",
    requirements: [
      "1-3 years of functional experience in security centers (SOC) or network administration roles.",
      "Functional certification like CompTIA Security+, CEH, or equivalent practical skills.",
      "Solid command of Linux scripting, network topologies, ports, and firewall protocols.",
      "Deep interest in penetration testing, threat hunting, and reverse engineering."
    ],
    responsibilities: [
      "Monitor incoming logs and network streams for patterns indicating active intrusion or DDoS vectors.",
      "Draft thorough incident analysis files and brief mitigation roadmaps for client-facing devops units.",
      "Perform periodic web vulnerability scans across customer-facing portals.",
      "Maintain security controls and firewalls matching SOC2 standards."
    ],
    benefits: [
      "Extremely stable work environment with standard progression programs.",
      "Excellent post-retirement and provident fund security nets.",
      "Access to millions of learning modules and corporate tie-up schemes.",
      "Corporate discounts on housing and medical packages."
    ],
    applicantsCount: 412,
    companyId: "tcs",
    isInternship: false
  },
  // INTERNSHIPS
  {
    id: "intern-1",
    title: "Software Engineering Intern (AI Product)",
    company: "Razorpay",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=150&h=150&fit=crop&q=80",
    location: "Bengaluru, Karnataka",
    type: "Internship",
    category: "Full Stack Development",
    experience: "Internship",
    salary: "₹45,000 / month",
    postedAt: "3 days ago",
    skills: ["React", "TypeScript", "Node.js", "Express", "Tailwind CSS"],
    description: "We are seeking a Software Engineering Intern to join our internal tools group, building responsive visual dashboards connected to modern large language models.",
    requirements: [
      "Currently pursuing B.Tech/M.Tech/MCA in Computer Science, Info Science, or equivalent.",
      "Strong visual command of HTML, CSS, React hooks, and responsive utility styling.",
      "Built at least 2 structured personal full-stack projects using React and Express/Node.",
      "Available for a full-time, 6-month in-office stint in Koramangala, Bengaluru."
    ],
    responsibilities: [
      "Design and code clean, interactive dashboard pages for internal product analytics.",
      "Connect frontend modules to Express endpoints, handling async responses elegantly.",
      "Write visual unit tests, optimizing UI elements based on QA and senior dev feedback.",
      "Participate in daily engineering scrums, learning modern SaaS product workflows."
    ],
    benefits: [
      "High probability of Full-Time Placement Offer (PPO) based on performance.",
      "Catered daily gourmet lunches and free transit shuttles.",
      "High-spec company MacBook Pro during the internship tenure.",
      "Mentorship from industry-best engineering leads."
    ],
    applicantsCount: 512,
    companyId: "razorpay",
    isInternship: true
  },
  {
    id: "intern-2",
    title: "UI/UX Design Intern",
    company: "Flipkart",
    logo: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?w=150&h=150&fit=crop&q=80",
    location: "Bengaluru, Karnataka",
    type: "Internship",
    category: "UI/UX Design",
    experience: "Internship",
    salary: "₹35,000 / month",
    postedAt: "5 days ago",
    skills: ["Figma", "UI/UX", "Prototyping", "Design Systems", "User Research"],
    description: "Flipkart's Core UX Design team is inviting applications for a passionate UI/UX Design Intern to work on next-generation social commerce checkout flows.",
    requirements: [
      "Active design portfolio showcasing high-fidelity web or mobile screen layouts in Figma.",
      "Solid understanding of typography scale, visual balance, grid layouts, and color hierarchy.",
      "Familiarity with standard wireframing, high-fidelity mockups, and functional interactive prototypes.",
      "Strong verbal and written communication skills to explain visual design decisions."
    ],
    responsibilities: [
      "Design beautiful, highly cohesive user-experience screens for social shopping groups.",
      "Participate in user research and feedback analysis, translating data into layout revisions.",
      "Maintain and update the internal design system components in Figma.",
      "Work closely with frontend engineering teams to ensure pixel-perfect CSS rendering."
    ],
    benefits: [
      "Direct design mentorship from seasoned veterans at India's retail leader.",
      "Pre-placement interview (PPI) opportunity.",
      "Fun, collaborative, open-office workspace in Bellandur, Bengaluru.",
      "Active team building events and design brainstorms."
    ],
    applicantsCount: 340,
    companyId: "flipkart",
    isInternship: true
  },
  {
    id: "intern-3",
    title: "AI & ML Model Training Intern",
    company: "Google India",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=150&h=150&fit=crop&q=80",
    location: "Hyderabad, Telangana",
    type: "Internship",
    category: "AI/ML",
    experience: "Internship",
    salary: "₹80,000 / month",
    postedAt: "2 days ago",
    skills: ["Python", "PyTorch", "Data Processing", "NLP", "Machine Learning"],
    description: "Join the Google Research India team as an AI/ML Intern to assist in dataset preparation, cleansing, and validation for our upcoming localized translation systems.",
    requirements: [
      "Advanced student in B.Tech/M.Tech/Ph.D. program centering Machine Learning or Data Science.",
      "Proficient Python programmer with experience using Pandas, NumPy, and PyTorch/TensorFlow.",
      "Familiar with standard data cleansing, tokenization, and web scraping mechanisms.",
      "Familiarity with basic large language model APIs is a plus."
    ],
    responsibilities: [
      "Clean, annotate, and structure heavy-text regional language datasets for NLP training loops.",
      "Write scripts to automate scraping, duplicate elimination, and format standardizations.",
      "Compile detailed reports detailing model validation metrics and validation accuracy curves.",
      "Assist researchers in executing neural network fine-tuning configurations."
    ],
    benefits: [
      "Incredible internship stipend with absolute tier-1 peer group.",
      "Premium Google office amenities and gym memberships.",
      "Outstanding resume value and global networking opportunities.",
      "Access to internal Google research libraries and compute nodes."
    ],
    applicantsCount: 720,
    companyId: "google-india",
    isInternship: true
  },
  {
    id: "intern-4",
    title: "Mobile App Development Intern (React Native)",
    company: "Zomato",
    logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=150&h=150&fit=crop&q=80",
    location: "Gurugram, Haryana",
    type: "Internship",
    category: "Frontend Development",
    experience: "Internship",
    salary: "₹40,000 / month",
    postedAt: "1 day ago",
    skills: ["React Native", "TypeScript", "CSS", "REST APIs", "Mobile Design"],
    description: "Zomato is seeking a Mobile App Intern to help code core user-facing and merchant-facing checkout screens, focusing on speed and screen transition performance.",
    requirements: [
      "Proficient in React, JavaScript, and TypeScript, with a keen interest in mobile systems.",
      "Familiarity with React Native framework or building responsive iOS/Android projects.",
      "Basic understanding of state management (Zustand/Redux) and connecting mobile screens to APIs.",
      "Excellent eye for micro-interactions, layout metrics, and fast loading cycles."
    ],
    responsibilities: [
      "Develop and test modular mobile views, assuring pixel-perfect alignment with design drafts.",
      "Optimize local state mechanisms and images, boosting app startup times.",
      "Fix visual bugs and responsive quirks across different Android and iOS screen widths.",
      "Collaborate with backend engineers to integrate fast, secure restaurant order menus."
    ],
    benefits: [
      "High Pre-Placement Offer (PPO) opportunities.",
      "Energetic startup-like workspace in CyberHub, Gurugram.",
      "Full access to the employee benefits and discounted food services.",
      "Regular interactions with elite product managers."
    ],
    applicantsCount: 410,
    companyId: "zomato",
    isInternship: true
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Aarav Sharma",
    role: "Software Developer",
    company: "Razorpay",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&q=80",
    text: "Luxora AI completely reinvented how I applied to fintech startups. The ATS resume checker suggested exact changes for Razorpay's profile. I landed an interview in 4 days!",
    rating: 5
  },
  {
    id: "t-2",
    name: "Priyanka Nair",
    role: "ML Engineer",
    company: "Google India",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&q=80",
    text: "The Career Roadmap generator is spectacular. I targeted the AI Engineering path, followed the recommended upskilling milestones, and secured my dream research position. Pure genius!",
    rating: 5
  },
  {
    id: "t-3",
    name: "Rohan Das",
    role: "Frontend Architect",
    company: "Zoho Corporation",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&q=80",
    text: "Most job boards feel chaotic and full of spam. Luxora is clean, premium, and acts like a career copilot. The design system is beautiful and highly professional.",
    rating: 5
  }
];

export const faqData: FAQItem[] = [
  {
    id: "faq-1",
    question: "How does the AI Resume Match Score calculate compatibility?",
    answer: "Our engine uses standard modern semantic analysis (and Gemini 3.5 LLM context) to analyze your skills, experience history, and projects directly against the specified job requirements. It identifies core keyword alignment, logical skill groupings, and missing qualifications to score your match percentage."
  },
  {
    id: "faq-2",
    question: "Can I use the ATS Resume Checker without an active profile?",
    answer: "Yes! Guest users can paste resume text or build standard qualifications on our ATS scanner interface to receive basic analysis. However, logging in allows you to save history, track resume variations, and auto-apply with optimized resumes."
  },
  {
    id: "faq-3",
    question: "How do the Career Roadmaps work?",
    answer: "Career Roadmaps analyze your dream role (e.g., AI Engineer or Cloud Architect) and generate a step-by-step learning progression over a chosen timeframe. Each stage outlines crucial topics, recommended books, tutorials, and certifications."
  },
  {
    id: "faq-4",
    question: "Is Luxora AI free to use for job seekers?",
    answer: "Yes, Luxora is completely free for candidates seeking jobs and internships. We provide resume builder modules, ATS checking limits, and standard career recommendations. Premium subscriptions are only offered to enterprise recruiters looking to post bulk requirements."
  },
  {
    id: "faq-5",
    question: "How do recruiters manage applicants?",
    answer: "Recruiters get a dedicated dashboard to post openings, review candidate match scores directly, filter profiles by location, skills or experience levels, and update application status (Applied, Interviewing, Offered) instantly."
  }
];

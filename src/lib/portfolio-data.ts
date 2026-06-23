export const profile = {
  name: "Jeet Ahirwar",
  role: "Full Stack Developer (MERN)",
  location: "Bhopal, Madhya Pradesh, India",
  email: "jeetahirwar664@gmail.com",
  phone: "+91 6264516309",
  linkedin: "https://www.linkedin.com/in/jeetahirwar/",
  github: "https://github.com/JeetAhirwar",
  githubUser: "JeetAhirwar",
  resumePath: "/resume/Jeet-Ahirwar-FullStack-Resume.pdf",
  headline: "Building scalable and user-focused web applications using the MERN stack.",
  subheadline:
    "MCA student passionate about transforming ideas into real-world digital products through modern web technologies.",
  about: [
    "MCA student specializing in Cyber Security with a strong focus on Full Stack Development.",
    "I enjoy turning real-world problems into clean, maintainable web applications — from designing the data layer in MongoDB to crafting intuitive React interfaces.",
    "Comfortable across the MERN stack, I care about clear API design, secure authentication flows, and shipping interfaces that feel fast and accessible.",
    "Always learning — currently going deeper into backend architecture, system design fundamentals, and production-grade deployment.",
  ],
} as const;

export const techStack = {
  Frontend: [
    "HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Vite",
    "Tailwind CSS", "Bootstrap", "Framer Motion", "Responsive Design",
  ],
  Backend: [
    "Node.js", "Express.js", "REST APIs", "JWT Authentication",
    "Middleware", "Auth & Authorization", "CRUD Operations", "Error Handling",
  ],
  Database: ["MongoDB", "Mongoose", "MySQL"],
  Tools: ["Git", "GitHub", "Postman", "VS Code", "npm", "Linux", "Windows"],
} as const;

export type Project = {
  title: string;
  tagline: string;
  github: string;
  demo: string;
  tech: string[];
  features: string[];
  architecture: string;
  caseStudy: {
    problem: string;
    approach: string;
    challenges: string;
    lessons: string;
    future: string;
  };
};

export const projects: Project[] = [
  {
    title: "Pulse — Real-Time Chat Application",
    tagline: "Multi-user real-time messaging built on Socket.IO with JWT-secured rooms.",
    github: "https://github.com/JeetAhirwar/RealTime-Chat-App",
    demo: "https://pulserealtime-chatapp.netlify.app/login",
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "JWT"],
    features: [
      "JWT-based authentication & protected routes",
      "Real-time messaging with Socket.IO",
      "Typing indicators & online status",
      "Multi-user conversation architecture",
      "Persistent message storage in MongoDB",
    ],
    architecture: "Client (React) ⇄ Socket.IO ⇄ Express API ⇄ MongoDB",
    caseStudy: {
      problem:
        "Build a low-latency chat experience where messages, presence, and typing state stay in sync across many simultaneous users.",
      approach:
        "Used Socket.IO rooms over an Express server for bidirectional events, with JWT verified on socket handshake. React context holds session state; Mongoose models persist users and messages.",
      challenges:
        "Keeping presence accurate on reconnects, ensuring auth runs before any socket event, and structuring rooms so messages fan out only to relevant clients.",
      lessons:
        "Designing for stateful realtime needs different patterns than REST — connection lifecycle, idempotency, and back-pressure all matter.",
      future:
        "Group chats with admin controls, read receipts, message search, and image attachments via S3-compatible storage.",
    },
  },
  {
    title: "OpportunityX — MERN Job Portal",
    tagline: "Role-based job platform connecting candidates, recruiters, and admins.",
    github: "https://github.com/JeetAhirwar/MERN-Stack-OpportunityX-",
    demo: "https://opportunityx-os98.onrender.com/",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
    features: [
      "Candidate, recruiter, and admin dashboards",
      "Job search with multi-filter querying",
      "Saved jobs & profile builder",
      "JWT auth with role-based access control",
      "Recruiter posting & application tracking",
    ],
    architecture: "React (Tailwind) ⇄ Express REST API ⇄ MongoDB (Mongoose)",
    caseStudy: {
      problem:
        "Different user types need fundamentally different experiences on the same platform, while sharing a single data model.",
      approach:
        "Built a single Express API with role-aware middleware. The React client renders dashboards based on the authenticated role decoded from the JWT.",
      challenges:
        "Designing schemas that work for both candidate profiles and recruiter listings, and keeping protected routes consistent across the client and server.",
      lessons:
        "RBAC is easier when the role is the source of truth at every layer — DB, API middleware, and UI guards — rather than relying on UI checks alone.",
      future:
        "Resume parsing, recruiter analytics, email notifications, and a recommendation engine for matching candidates to jobs.",
    },
  },
];

export const experience = [
  {
    role: "Web Developer Intern",
    company: "SYNC INTERN'S",
    period: "Sep 2023 – Oct 2023",
    points: [
      "Built responsive UI components and pages.",
      "Implemented frontend layouts based on design specs.",
      "Suggested and shipped small UX improvements.",
      "Collaborated with the team via Git workflows.",
    ],
  },
  {
    role: "Python Development Intern",
    company: "OctaNet Services Pvt. Ltd.",
    period: "Oct 2023 – Nov 2023",
    points: [
      "Developed Python console applications.",
      "Debugged and refactored existing scripts.",
      "Practiced problem solving on real assignments.",
      "Worked in a small collaborative team setting.",
    ],
  },
];

export const education = [
  {
    degree: "Master of Computer Application (MCA)",
    school: "Amity University",
    period: "Jan 2025 – Dec 2026 (Pursuing)",
    detail: "Specialization: Cyber Security",
  },
  {
    degree: "Bachelor of Computer Application (BCA)",
    school: "Bhabha University",
    period: "Jul 2020 – Apr 2023",
    detail: "Percentage: 74.94%",
  },
];

export const resumeData = {
  name: 'AKSH BHARDWAJ',
  title: 'Full Stack Software Engineer',
  contact: {
    email: 'akshkumarlalla@gmail.com',
    phone: '08709066041',
    phoneDisplay: '+91 8709066041',
    location: 'Sapoorji Pallonji Sukhobhristi',
    linkedin: 'linkedin.com/in/aksh-bhardwaj-6125a81b4',
    linkedinUrl: 'https://linkedin.com/in/aksh-bhardwaj-6125a81b4',
    github: 'github.com/Aksh-bhardwaj',
    githubUrl: 'https://github.com/Aksh-Bhardwaj',
    twitter: 'x.com/akshbhardwaj7',
    twitterUrl: 'https://x.com/akshbhardwaj7',
  },
  summary:
    'Full Stack Software Engineer with production experience building scalable, microservice-based healthcare systems now live across 25+ hospitals, pharmacies, labs, and OPD clinics. Designed and shipped a 6-microservice ERP architecture end-to-end, and currently build an ABDM-enabled, multi-tenant EHR SaaS platform. Proficient in React.js, Python (Django/DRF), PostgreSQL, and AWS, with hands-on experience in system architecture design, REST APIs, Kafka-based event-driven systems, and Redis caching. Comfortable owning a system from architecture through deployment.',
  experience: [
    {
      org: 'HlthTek Optimus',
      title: 'Software Developer',
      period: '2026 – Present',
      points: [
        'Designed and built a 6-microservice ERP architecture from the ground up, now powering real-time operations across 25+ hospitals, multiple pharmacies, diagnostic labs, and OPD clinics.',
        'Owned the entire system architecture end-to-end — service boundaries, inter-service communication, and data ownership for a multi-tenant platform spanning several facility types.',
        'Built the inventory and pharmacy management modules that drive real-time stock tracking, automated reordering, and dispensing workflows across 25+ live facilities.',
        'Engineered a full billing and payment system: dynamic QR-based payments, secure S3-backed asset storage, pixel-perfect invoice/receipt generation (jspdf, autoTable), and an audit-ready refund workflow with RBAC and pagination.',
        'Integrated ABDM/ABHA-based verification, bringing the platform into compliance with India\'s national healthcare data exchange standards.',
        'Promoted from Software Developer Intern to full-time Developer for consistently owning architecture, API design, and deployment decisions end-to-end.',
      ],
    },
    {
      org: 'HlthTek Optimus',
      title: 'Software Developer Intern',
      period: '2025 – 2026',
      points: [
        'Built and enhanced backend and frontend features for a production healthcare web application using Python/Django and React.',
        'Developed and integrated RESTful APIs, managed database relationships, and implemented role-based access control (RBAC) logic across different user types.',
        'Performed API testing and debugging with Postman, ensured smooth frontend-backend integration, and gained hands-on exposure to Docker-based deployment workflows.',
      ],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Technology, Computer Science',
      school: 'Sister Nivedita University',
      period: '08/2022 – 05/2026',
    },
  ],
  skills: [
    { label: 'Languages', items: 'Python, JavaScript (ES6+)' },
    {
      label: 'Core CS',
      items:
        'Data Structures & Algorithms, Operating Systems, Computer Networks, System Design, Microservices Architecture',
    },
    {
      label: 'Databases',
      items:
        'PostgreSQL, MySQL, Django ORM, Database Design & Indexing, Query Optimization',
    },
    {
      label: 'Performance & Scale',
      items: 'Redis Caching, Asynchronous Processing, Performance Optimization',
    },
    { label: 'Frontend', items: 'React.js, HTML5, CSS3, JavaScript (ES6+)' },
    {
      label: 'Backend',
      items: 'Django, Django REST Framework, JWT Auth, REST API Design',
    },
    {
      label: 'Cloud & DevOps',
      items: 'AWS (EC2, S3, Lambda), Docker, Basic CI/CD Pipelines, NGINX',
    },
    {
      label: 'Distributed Systems',
      items: 'Event-Driven Architecture, Apache Kafka, Redis, Microservices Design',
    },
  ],
  projects: [
    {
      title: 'Hlth EHR Platform',
      points: [
        'Developed a scalable, ABDM-enabled EHR SaaS platform using multi-tenant architecture for onboarding and managing multiple healthcare providers with isolated data handling.',
        'Engineered end-to-end full-stack solutions with React.js and Django/DRF, building RESTful APIs with JWT authentication and PostgreSQL optimization.',
        'Implemented microservices, Kafka event-driven communication, and Redis caching to improve scalability; built a billing/payment module with dynamic QR generation and AWS S3 asset storage.',
      ],
    },
    {
      title: 'EduSphere — School Management System',
      points: [
        'Built a multi-tenant school management SaaS platform serving 9 distinct roles (Super Admin, School Admin, Exam Admin, Teacher, Student, Parent, Accountant, Librarian, Receptionist) across admissions, timetable, attendance, homework, exams, fees, and library modules.',
        'Designed JWT and Org-Code tenant binding for multi-tenant REST APIs, treating the JWT tenant_id as the source of truth to prevent cross-tenant data spoofing.',
        'Enforced database-level tenant isolation using PostgreSQL composite foreign keys.',
        'Implemented three-layer, server-side enforced role-based access control (RBAC).',
        'Built a concurrency-safe fee payment system integrated with Razorpay, using row-level locking, HMAC webhook signature verification, and idempotent payment IDs.',
        'Developed an end-to-end exam results pipeline with role-scoped visibility, audit logging, and academic-year-scoped write locks.',
      ],
    },
    {
      title: 'Concentration Detection System',
      points: [
        'Built a real-time attention detection system using MediaPipe Face Mesh (468 landmarks) and OpenCV, scoring attention from blink rate, gaze tracking, and head pose.',
        'Built a low-latency FastAPI backend with async MJPEG streaming and a real-time Chart.js dashboard for live attention metrics.',
      ],
    },
  ],
};

import React from 'react';
import { motion } from 'framer-motion';
import {
    Link2,
    Cpu,
    Monitor,
    Wifi,
    Boxes,
    FileText,
    Table2,
    QrCode,
    CreditCard,
    KeyRound,
    Database,
    Gauge,
    Zap,
    Timer,
    Server,
    Code2,
    HardDrive,
} from 'lucide-react';
import {
    SiPython,
    SiJavascript,
    SiReact,
    SiHtml5,
    SiCss,
    SiDjango,
    SiPostgresql,
    SiMysql,
    SiDocker,
    SiGithubactions,
    SiApachekafka,
    SiRedis,
    SiPostman,
    SiLinux,
    SiGit,
    SiGithub,
    SiBurpsuite,
} from 'react-icons/si';

function SkillChip({ Icon, label, accentClass = 'text-neon-cyan', isLucide = false, className = '' }) {
    const IconCmp = Icon;
    return (
        <span
            className={`group/chip inline-flex max-w-full items-start gap-2 rounded-lg border border-white/[0.07] bg-white/[0.035] px-2 py-1.5 text-left align-top transition-colors hover:border-neon-cyan/30 hover:bg-white/[0.055] ${className}`}
        >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border border-white/10 bg-black/50 sm:h-7 sm:w-7">
                {isLucide ? (
                    <IconCmp className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${accentClass}`} strokeWidth={2} aria-hidden />
                ) : (
                    <IconCmp className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${accentClass}`} aria-hidden />
                )}
            </span>
            <span className="min-w-0 flex-1 text-[11px] leading-snug text-gray-400 group-hover/chip:text-gray-200 sm:text-xs">
                {label}
            </span>
        </span>
    );
}

const categories = [
    {
        emoji: '💻',
        title: 'Languages',
        accent: 'border-neon-cyan/40',
        skills: [
            { Icon: SiPython, label: 'Python', accent: 'text-[#3776AB]' },
            { Icon: SiJavascript, label: 'JavaScript', accent: 'text-[#F7DF1E]' },
        ],
    },
    {
        emoji: '🎨',
        title: 'Frontend',
        accent: 'border-neon-green/40',
        skills: [
            { Icon: SiReact, label: 'React.js', accent: 'text-[#61DAFB]' },
            { Icon: SiHtml5, label: 'HTML5', accent: 'text-[#E34F26]' },
            { Icon: SiCss, label: 'CSS3', accent: 'text-[#663399]' },
            { Icon: SiJavascript, label: 'JavaScript (ES6+)', accent: 'text-[#F7DF1E]' },
        ],
    },
    {
        emoji: '⚙️',
        title: 'Backend',
        accent: 'border-neon-pink/40',
        skills: [
            { Icon: SiDjango, label: 'Django', accent: 'text-[#092E20]' },
            { Icon: SiDjango, label: 'Django REST Framework (DRF)', accent: 'text-[#44B78B]' },
            { Icon: Link2, label: 'RESTful API Development', accent: 'text-neon-cyan', lucide: true },
            { Icon: KeyRound, label: 'Authentication (JWT)', accent: 'text-amber-400', lucide: true },
        ],
    },
    {
        emoji: '🗄️',
        title: 'Databases',
        accent: 'border-white/20',
        skills: [
            { Icon: SiPostgresql, label: 'PostgreSQL', accent: 'text-[#4169E1]' },
            { Icon: SiMysql, label: 'MySQL', accent: 'text-[#4479A1]' },
            { Icon: SiDjango, label: 'Django ORM', accent: 'text-[#44B78B]' },
            {
                Icon: Database,
                label: 'Database Design & Optimization (Indexing, Query Optimization)',
                accent: 'text-neon-green',
                lucide: true,
            },
        ],
    },
    {
        emoji: '☁️',
        title: 'Cloud & DevOps',
        accent: 'border-amber-500/30',
        skills: [
            { Icon: Server, label: 'AWS EC2', accent: 'text-[#FF9900]', lucide: true },
            {
                Icon: HardDrive,
                label: 'AWS S3 (File Storage, QR Uploads)',
                accent: 'text-[#569A31]',
                lucide: true,
            },
            { Icon: Zap, label: 'AWS Lambda (Basic)', accent: 'text-[#FF9900]', lucide: true },
            { Icon: SiDocker, label: 'Docker', accent: 'text-[#2496ED]' },
            { Icon: SiGithubactions, label: 'CI/CD Pipelines (Basic)', accent: 'text-[#2088FF]' },
        ],
    },
    {
        emoji: '🔄',
        title: 'Event-Driven & Caching',
        accent: 'border-purple-400/30',
        skills: [
            { Icon: SiApachekafka, label: 'Apache Kafka', accent: 'text-orange-400' },
            { Icon: SiRedis, label: 'Redis (Caching, Performance Optimization)', accent: 'text-[#DC382D]' },
        ],
    },
    {
        emoji: '📄',
        title: 'Document & Payment Systems',
        accent: 'border-cyan-400/25',
        skills: [
            { Icon: FileText, label: 'jsPDF (Invoice/Receipt Generation)', accent: 'text-amber-400', lucide: true },
            { Icon: Table2, label: 'autoTable (PDF Table Layouts)', accent: 'text-sky-400', lucide: true },
            { Icon: QrCode, label: 'QR Code Generation (Payment Integration)', accent: 'text-neon-green', lucide: true },
            {
                Icon: CreditCard,
                label: 'Billing & Refund Workflow Design',
                accent: 'text-white',
                lucide: true,
            },
        ],
    },
    {
        emoji: '🛠️',
        title: 'Tools & Technologies',
        accent: 'border-gray-500/40',
        skills: [
            { Icon: SiGit, label: 'Git', accent: 'text-[#F05032]' },
            { Icon: SiGithub, label: 'GitHub', accent: 'text-white' },
            { Icon: Code2, label: 'VS Code', accent: 'text-[#007ACC]', lucide: true },
            { Icon: SiPostman, label: 'Postman', accent: 'text-[#FF6C37]' },
            { Icon: SiPostgresql, label: 'pgAdmin', accent: 'text-[#4169E1]' },
            { Icon: SiBurpsuite, label: 'Burp Suite', accent: 'text-[#FF6633]' },
            { Icon: SiLinux, label: 'Linux', accent: 'text-[#FCC624]' },
        ],
    },
    {
        emoji: '🧠',
        title: 'Core Concepts',
        accent: 'border-violet-400/30',
        skills: [
            { Icon: Cpu, label: 'Data Structures & Algorithms', accent: 'text-violet-400', lucide: true },
            { Icon: Monitor, label: 'Operating Systems', accent: 'text-blue-400', lucide: true },
            { Icon: Wifi, label: 'Computer Networks', accent: 'text-sky-400', lucide: true },
            { Icon: Server, label: 'System Design (Basics)', accent: 'text-neon-cyan', lucide: true },
            { Icon: Boxes, label: 'Microservices Architecture', accent: 'text-emerald-400', lucide: true },
        ],
    },
    {
        emoji: '📈',
        title: 'Performance & Optimization',
        accent: 'border-emerald-400/35',
        skills: [
            { Icon: Gauge, label: 'Query Optimization', accent: 'text-emerald-400', lucide: true },
            { Icon: Zap, label: 'Caching Strategies', accent: 'text-amber-400', lucide: true },
            { Icon: Timer, label: 'Asynchronous Processing', accent: 'text-cyan-400', lucide: true },
        ],
    },
];

const LONG_SKILL = (label) => label.length > 36;

const Skills = () => {
    return (
        <section id="skills" className="py-16 md:py-20 bg-gradient-to-b from-black/40 via-black/60 to-black/40 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-neon-pink/10 rounded-full blur-[100px]" />
            </div>
            <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                <div className="flex items-center gap-4 mb-4 justify-center">
                    <div className="h-px w-12 bg-neon-cyan" />
                    <h2 className="text-2xl md:text-3xl font-bold neon-text-cyan uppercase tracking-wider text-center">
                        Skills & Expertise
                    </h2>
                    <div className="h-px w-12 bg-neon-cyan" />
                </div>
                <p className="text-center text-gray-500 text-xs md:text-sm max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed">
                    Stack overview with recognizable tool icons — languages, infra, security, and delivery.
                </p>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3 xl:gap-5">
                    {categories.map((cat, idx) => (
                        <motion.article
                            key={cat.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ delay: Math.min(idx * 0.04, 0.35), duration: 0.4 }}
                            className={`glass flex h-full min-h-0 flex-col rounded-2xl border p-4 md:p-5 ${cat.accent} hover:shadow-[0_0_28px_rgba(0,255,255,0.06)] transition-shadow duration-500`}
                        >
                            <div className="mb-3 flex shrink-0 items-center gap-2.5 border-b border-white/10 pb-3">
                                <span className="text-xl leading-none md:text-2xl" aria-hidden>
                                    {cat.emoji}
                                </span>
                                <h3 className="text-sm font-bold uppercase tracking-wide text-white md:text-base">
                                    {cat.title}
                                </h3>
                            </div>
                            <div className="grid min-h-0 flex-1 grid-cols-1 content-start gap-1.5 sm:grid-cols-2">
                                {cat.skills.map((s) => {
                                    const span2 = LONG_SKILL(s.label);
                                    return (
                                        <div
                                            key={`${cat.title}-${s.label}`}
                                            className={span2 ? 'min-w-0 sm:col-span-2' : 'min-w-0'}
                                        >
                                            <SkillChip
                                                Icon={s.Icon}
                                                label={s.label}
                                                accentClass={
                                                    s.className ? `${s.accent} ${s.className}` : s.accent
                                                }
                                                isLucide={Boolean(s.lucide)}
                                                className="w-full"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;

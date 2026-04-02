import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Building2, Calendar, Github, ExternalLink } from 'lucide-react';

const Experience = () => {
    const experiences = [
        {
            title: 'Software Developer Intern',
            org: 'HlthTek (HLTH Tek) — Optimus',
            orgUrl: 'https://www.hlthtek.com/',
            period: 'Dec 2025 – Ongoing',
            accent: 'pink',
            icon: Building2,
            tags: [
                'Django',
                'React',
                'Python',
                'REST APIs',
                'AWS S3',
                'Lambda',
                'Kafka',
                'EC2',
                'Docker',
            ],
            githubUrl: 'https://github.com/Aksh-Bhardwaj',
            externalUrl: 'https://www.hlthtek.com/',
            points: [
                'Built and maintained RESTful APIs with Django and integrated them with a React frontend.',
                'Worked on scalable patterns for healthcare-related product workflows.',
                'Gained hands-on experience with end-to-end features from API design to UI integration.',
            ],
        },
        {
            title: 'API Security Tester',
            org: 'XPMC',
            period: '25th Sep 2025 – 22nd Nov 2025',
            accent: 'cyan',
            icon: ShieldCheck,
            tags: ['Postman', 'OWASP', 'API Security', 'GraphQL'],
            githubUrl: 'https://github.com/Aksh-Bhardwaj',
            points: [
                'REST and GraphQL API testing with Postman and automated checks.',
                'Security-focused validation: auth flows, rate limits, and common OWASP-style issues.',
                'Documenting findings and collaborating with developers on fixes.',
            ],
        },
    ];

    const accentText = {
        cyan: 'text-cyan-300',
        pink: 'text-fuchsia-300',
    };

    const iconRing = {
        pink: 'ring-fuchsia-500/70 shadow-[0_0_22px_rgba(217,70,239,0.45)] bg-gradient-to-br from-fuchsia-950/60 to-black/50',
        cyan: 'ring-cyan-400/70 shadow-[0_0_22px_rgba(34,211,238,0.35)] bg-gradient-to-br from-cyan-950/60 to-black/50',
    };

    return (
        <section id="experience" className="py-24 bg-black relative scroll-mt-24 overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(168,85,247,0.12),transparent_50%)]" />

            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-4 mb-14"
                >
                    <div className="h-px w-12 bg-gradient-to-r from-fuchsia-500 to-cyan-400" />
                    <h2 className="text-3xl font-bold neon-text-pink uppercase tracking-wider">Experience</h2>
                </motion.div>

                <div className="space-y-12">
                    {experiences.map((exp, idx) => {
                        const Icon = exp.icon;
                        return (
                            <motion.div
                                key={exp.title}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="experience-card-frame"
                            >
                                <article className="experience-card-inner relative overflow-hidden p-6 sm:p-8">
                                    <div className="experience-sparkle absolute inset-0 opacity-90" />
                                    <div className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,243,255,0.06)_0%,transparent_65%)]" />

                                    <div className="relative flex flex-col gap-6">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                                            <div className="flex gap-5">
                                                <div
                                                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ring-2 ${iconRing[exp.accent]} ${accentText[exp.accent]}`}
                                                >
                                                    <Icon size={30} strokeWidth={1.75} />
                                                </div>
                                                <div className="min-w-0 pt-0.5">
                                                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                                                        {exp.title}
                                                    </h3>
                                                    {exp.orgUrl ? (
                                                        <a
                                                            href={exp.orgUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`mt-0.5 inline-block text-base font-semibold hover:underline underline-offset-4 ${accentText[exp.accent]}`}
                                                        >
                                                            {exp.org}
                                                        </a>
                                                    ) : (
                                                        <p className={`mt-0.5 text-base font-semibold ${accentText[exp.accent]}`}>
                                                            {exp.org}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {exp.period && (
                                                <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-gray-400 sm:text-right">
                                                    <Calendar size={15} className="text-fuchsia-400/80" />
                                                    <span>{exp.period}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2.5 text-gray-400 leading-relaxed">
                                            {exp.points.map((line) => (
                                                <p key={line} className="text-[15px] sm:text-base">
                                                    {line}
                                                </p>
                                            ))}
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {exp.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="border border-purple-500/40 bg-transparent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-purple-300/90"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex gap-3 pt-1">
                                            {exp.githubUrl && (
                                                <a
                                                    href={exp.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gray-300 transition-colors hover:border-fuchsia-500/50 hover:text-white hover:shadow-[0_0_15px_rgba(217,70,239,0.25)]"
                                                    aria-label="GitHub"
                                                >
                                                    <Github size={18} />
                                                </a>
                                            )}
                                            {exp.externalUrl && (
                                                <a
                                                    href={exp.externalUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gray-300 transition-colors hover:border-cyan-400/50 hover:text-white hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                                                    aria-label="External link"
                                                >
                                                    <ExternalLink size={18} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Experience;

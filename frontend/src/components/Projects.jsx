import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, FolderKanban } from 'lucide-react';
import { SiOpencv, SiReact } from 'react-icons/si';

const Projects = () => {
    const projects = [
        {
            title: 'Gun Detection System',
            description:
                'A real-time gun detection system developed using Python and OpenCV with custom-trained Haar cascade classifiers. Designed for surveillance enhancement.',
            tags: ['Python', 'OpenCV', 'Machine Learning'],
            link: '#',
            github: 'https://github.com/Aksh-Bhardwaj',
            image: '/images/project-gun-detection.svg',
            HeroIcon: SiOpencv,
            heroAccent: '#5C3EE8',
            heroGlow: 'rgba(92, 62, 232, 0.35)',
        },
        {
            title: 'Dynamic Portfolio',
            description:
                'Modern portfolio built with React and Django, featuring a blog engine and secure contact system. Focused on high-end UI/UX and dark aesthetics.',
            tags: ['React', 'Django', 'Tailwind', 'Framer Motion'],
            link: '#',
            github: 'https://github.com/Aksh-Bhardwaj',
            image: '/images/project-portfolio.svg',
            HeroIcon: SiReact,
            heroAccent: '#61DAFB',
            heroGlow: 'rgba(97, 218, 251, 0.35)',
        },
    ];

    return (
        <section id="projects" className="relative bg-black py-24">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_100%,rgba(168,85,247,0.08),transparent_55%)]" />

            <div className="container relative z-10 mx-auto px-4">
                <div className="mb-16 flex flex-wrap items-center justify-end gap-4">
                    <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-fuchsia-500/35 bg-fuchsia-500/[0.07] shadow-[0_0_28px_rgba(217,70,239,0.15)]"
                        aria-hidden
                    >
                        <FolderKanban className="h-7 w-7 text-fuchsia-400" strokeWidth={1.75} />
                    </span>
                    <h2 className="text-3xl font-bold uppercase tracking-wider neon-text-pink">
                        Featured Projects
                    </h2>
                    <div className="hidden h-px min-w-[3rem] flex-1 bg-gradient-to-l from-fuchsia-500 to-cyan-400 sm:block sm:max-w-[12rem]" />
                    <div className="h-px w-12 shrink-0 bg-gradient-to-l from-fuchsia-500 to-cyan-400 sm:hidden" />
                </div>

                <div className="grid gap-10 md:grid-cols-2 md:gap-12">
                    {projects.map((project, idx) => {
                        const Hi = project.HeroIcon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.12 }}
                                className="group experience-card-frame"
                            >
                                <div className="experience-card-inner relative flex h-full flex-col overflow-hidden !p-0">
                                    <div className="experience-sparkle pointer-events-none absolute inset-0 opacity-70" />
                                    <div className="relative flex h-56 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0c0d10] via-[#08090c] to-black sm:h-64">
                                        <div
                                            className="pointer-events-none absolute inset-0 opacity-40"
                                            style={{
                                                background: `radial-gradient(ellipse 80% 70% at 50% 40%, ${project.heroGlow}, transparent 65%)`,
                                            }}
                                        />
                                        <div className="relative z-[1] flex flex-col items-center gap-3">
                                            <span
                                                className="rounded-2xl border border-white/10 bg-black/40 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                                                style={{
                                                    boxShadow: `0 0 48px ${project.heroGlow}`,
                                                }}
                                            >
                                                <Hi
                                                    className="h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]"
                                                    style={{ color: project.heroAccent }}
                                                    aria-hidden
                                                />
                                            </span>
                                            <span className="max-w-[90%] truncate text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-gray-500">
                                                {project.title}
                                            </span>
                                        </div>
                                        <img
                                            src={project.image}
                                            alt=""
                                            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0"
                                            width={600}
                                            height={400}
                                            loading="lazy"
                                            decoding="async"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                            onLoad={(e) => {
                                                e.currentTarget.classList.remove('opacity-0');
                                                e.currentTarget.classList.add('opacity-25');
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-transparent to-transparent" />
                                    </div>

                                    <div className="relative flex flex-1 flex-col p-6 sm:p-8">
                                        <h3 className="mb-3 text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-fuchsia-200">
                                            {project.title}
                                        </h3>
                                        <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-400 line-clamp-3">
                                            {project.description}
                                        </p>
                                        <div className="mb-6 flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="border border-white/35 bg-transparent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/95"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-3">
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gray-300 transition-colors hover:border-fuchsia-500/50 hover:text-white hover:shadow-[0_0_15px_rgba(217,70,239,0.25)]"
                                                aria-label="GitHub"
                                            >
                                                <Github size={18} />
                                            </a>
                                            <a
                                                href={project.link}
                                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gray-300 transition-colors hover:border-cyan-400/50 hover:text-white hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]"
                                                aria-label="Open project"
                                            >
                                                <ExternalLink size={18} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Projects;

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

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
        },
        {
            title: 'Dynamic Portfolio',
            description:
                'Modern portfolio built with React and Django, featuring a blog engine and secure contact system. Focused on high-end UI/UX and dark aesthetics.',
            tags: ['React', 'Django', 'Tailwind', 'Framer Motion'],
            link: '#',
            github: 'https://github.com/Aksh-Bhardwaj',
            image: '/images/project-portfolio.svg',
        },
    ];

    return (
        <section id="projects" className="relative bg-black py-24">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_100%,rgba(168,85,247,0.08),transparent_55%)]" />

            <div className="container relative z-10 mx-auto px-4">
                <div className="mb-16 flex items-center gap-4 justify-end">
                    <h2 className="text-3xl font-bold uppercase tracking-wider neon-text-pink">Featured Projects</h2>
                    <div className="h-px w-12 bg-gradient-to-l from-fuchsia-500 to-cyan-400" />
                </div>

                <div className="grid gap-10 md:grid-cols-2 md:gap-12">
                    {projects.map((project, idx) => (
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
                                <div className="relative h-56 overflow-hidden bg-[#0a0b0d] sm:h-64">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="h-full w-full object-cover object-center opacity-90 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                                        width={600}
                                        height={400}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-black/40 to-transparent" />
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
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;

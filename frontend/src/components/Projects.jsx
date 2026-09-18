import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { SiReact, SiDjango, SiOpencv } from 'react-icons/si';
import SectionHeader from './SectionHeader';
import TiltCard from './TiltCard';
import { resumeData } from '../data/resume';

const Projects = () => {
  const meta = [
    {
      tags: ['React', 'Django', 'Kafka', 'Redis', 'AWS', 'ABDM'],
      HeroIcon: SiDjango,
      heroAccent: '#092E20',
      heroGlow: 'rgba(34, 197, 94, 0.3)',
      github: resumeData.contact.githubUrl,
      link: '#',
    },
    {
      tags: ['Multi-tenant', 'JWT', 'PostgreSQL', 'Razorpay', 'RBAC'],
      HeroIcon: SiReact,
      heroAccent: '#61DAFB',
      heroGlow: 'rgba(97, 218, 251, 0.35)',
      github: resumeData.contact.githubUrl,
      link: '#',
    },
    {
      tags: ['MediaPipe', 'OpenCV', 'FastAPI', 'Chart.js'],
      HeroIcon: SiOpencv,
      heroAccent: '#5C3EE8',
      heroGlow: 'rgba(92, 62, 232, 0.35)',
      github: resumeData.contact.githubUrl,
      link: '#',
    },
  ];

  const projects = resumeData.projects.map((p, i) => ({
    title: p.title,
    description: p.points[0],
    points: p.points,
    ...meta[i],
  }));

  return (
    <section id="projects" className="relative overflow-hidden py-24">
      <div className="section-mesh" />

      <div className="container relative z-10 mx-auto px-4">
        <SectionHeader
          eyebrow="Work"
          title="Featured"
          accent="Projects"
          subtitle="Healthcare EHR, multi-tenant school SaaS, and real-time computer vision — systems built end-to-end."
        />

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {projects.map((project, idx) => {
            const Hi = project.HeroIcon;
            return (
              <TiltCard key={project.title} max={7}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12 }}
                  className="depth-frame group h-full"
                >
                  <div className="depth-frame-inner relative flex h-full flex-col overflow-hidden !p-0">
                    <div className="relative flex h-44 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0c0d12] via-[#08090c] to-black sm:h-48">
                      <div
                        className="pointer-events-none absolute inset-0 opacity-50"
                        style={{
                          background: `radial-gradient(ellipse 80% 70% at 50% 40%, ${project.heroGlow}, transparent 65%)`,
                        }}
                      />
                      <div className="relative z-[1] flex flex-col items-center gap-3 transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
                        <span
                          className="rounded-2xl border border-white/10 bg-black/40 p-4"
                          style={{ boxShadow: `0 0 48px ${project.heroGlow}` }}
                        >
                          <Hi
                            className="h-12 w-12 sm:h-14 sm:w-14"
                            style={{ color: project.heroAccent }}
                            aria-hidden
                          />
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-transparent to-transparent" />
                    </div>

                    <div className="relative flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="font-display mb-3 text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-cyan-200">
                        {project.title}
                      </h3>
                      <ul className="mb-5 flex-1 space-y-2 text-sm leading-relaxed text-zinc-400">
                        {project.points.slice(0, 3).map((line) => (
                          <li key={line.slice(0, 36)} className="flex gap-2">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400/70" />
                            <span className="line-clamp-3">{line}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mb-5 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-white/20 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/90"
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
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-fuchsia-500/50 hover:text-white"
                          aria-label="GitHub"
                        >
                          <Github size={18} />
                        </a>
                        <a
                          href={project.link}
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-cyan-400/50 hover:text-white"
                          aria-label="Open project"
                        >
                          <ExternalLink size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;

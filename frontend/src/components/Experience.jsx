import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Calendar, Github, ExternalLink } from 'lucide-react';
import SectionHeader from './SectionHeader';
import TiltCard from './TiltCard';
import { resumeData } from '../data/resume';

const Experience = () => {
  const experiences = resumeData.experience.map((job, idx) => ({
    ...job,
    orgUrl: 'https://www.hlthtek.com/',
    accent: idx === 0 ? 'pink' : 'cyan',
    icon: Building2,
    tags:
      idx === 0
        ? ['Microservices', 'Django', 'React', 'Kafka', 'AWS', 'ABDM', 'PostgreSQL']
        : ['Django', 'React', 'REST APIs', 'RBAC', 'Postman', 'Docker'],
    githubUrl: resumeData.contact.githubUrl,
    externalUrl: 'https://www.hlthtek.com/',
  }));

  const accentText = {
    cyan: 'text-cyan-300',
    pink: 'text-fuchsia-300',
  };

  const iconRing = {
    pink: 'border-fuchsia-500/40 bg-fuchsia-950/40 text-fuchsia-300 shadow-[0_8px_30px_rgba(217,70,239,0.25)]',
    cyan: 'border-cyan-400/40 bg-cyan-950/40 text-cyan-300 shadow-[0_8px_30px_rgba(34,211,238,0.25)]',
  };

  return (
    <section id="experience" className="relative scroll-mt-24 overflow-hidden py-24">
      <div className="section-mesh" />

      <div className="container relative z-10 mx-auto max-w-4xl px-4">
        <SectionHeader
          eyebrow="Career"
          title="Work"
          accent="Experience"
          subtitle="From intern to full-time — owning architecture, APIs, and deployment for live healthcare systems across 25+ facilities."
        />

        <div className="space-y-8">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <TiltCard key={`${exp.title}-${exp.period}`} max={4}>
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="depth-frame"
                >
                  <article className="depth-frame-inner relative overflow-hidden p-6 sm:p-8">
                    <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

                    <div className="relative flex flex-col gap-6">
                      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex gap-5">
                          <div
                            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${iconRing[exp.accent]}`}
                          >
                            <Icon size={26} strokeWidth={1.75} />
                          </div>
                          <div className="min-w-0 pt-0.5">
                            <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                              {exp.title}
                            </h3>
                            <a
                              href={exp.orgUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`mt-0.5 inline-block text-base font-semibold underline-offset-4 hover:underline ${accentText[exp.accent]}`}
                            >
                              {exp.org}
                            </a>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-zinc-400">
                          <Calendar size={15} className="text-cyan-400/80" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      <ul className="space-y-2.5 leading-relaxed text-zinc-400">
                        {exp.points.map((line) => (
                          <li key={line.slice(0, 40)} className="flex gap-2 text-[15px] sm:text-base">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/70" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-cyan-500/25 bg-cyan-500/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-cyan-200/90"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3 pt-1">
                        <a
                          href={exp.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-fuchsia-500/50 hover:text-white"
                          aria-label="GitHub"
                        >
                          <Github size={18} />
                        </a>
                        <a
                          href={exp.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-cyan-400/50 hover:text-white"
                          aria-label="External link"
                        >
                          <ExternalLink size={18} />
                        </a>
                      </div>
                    </div>
                  </article>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;

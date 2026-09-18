import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink } from 'lucide-react';
import { resumeData } from '../data/resume';

const ResumeModal = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const { name, title, contact, summary, experience, education, skills, projects } =
    resumeData;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Resume"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            aria-label="Close resume"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-[#0c0e14] shadow-[0_40px_100px_rgba(0,0,0,0.65)] sm:rounded-2xl"
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3 sm:px-5">
              <div>
                <p className="font-display text-sm font-semibold text-white sm:text-base">
                  View Resume
                </p>
                <p className="text-xs text-zinc-500">Aksh Bhardwaj — Full Stack Software Engineer</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/images/resume.png"
                  download="Aksh_Bhardwaj_Resume.png"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-200"
                >
                  <Download size={14} />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <a
                  href="/images/resume.png"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-200"
                >
                  <ExternalLink size={14} />
                  <span className="hidden sm:inline">Open</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-white/10 p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="resume-scroll min-h-0 flex-1 overflow-y-auto bg-zinc-800/40 p-3 sm:p-6">
              {/* Paper resume */}
              <article className="mx-auto max-w-[780px] bg-white px-6 py-8 text-[#111] shadow-2xl sm:px-10 sm:py-10">
                <header className="border-b border-black pb-3 text-center">
                  <h1 className="text-2xl font-bold tracking-wide sm:text-3xl">{name}</h1>
                  <p className="mt-1 text-sm font-medium sm:text-base">{title}</p>
                  <p className="mt-2 text-[11px] leading-relaxed text-zinc-700 sm:text-xs">
                    {contact.email} | {contact.phone} | {contact.location}
                    <br />
                    <a
                      href={contact.linkedinUrl}
                      className="text-blue-700 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {contact.linkedin}
                    </a>{' '}
                    |{' '}
                    <a
                      href={contact.githubUrl}
                      className="text-blue-700 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {contact.github}
                    </a>{' '}
                    |{' '}
                    <a
                      href={contact.twitterUrl}
                      className="text-blue-700 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {contact.twitter}
                    </a>
                  </p>
                </header>

                <section className="mt-5">
                  <h2 className="border-b border-black pb-0.5 text-sm font-bold uppercase tracking-wide">
                    Summary
                  </h2>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-800 sm:text-[13px]">
                    {summary}
                  </p>
                </section>

                <section className="mt-5">
                  <h2 className="border-b border-black pb-0.5 text-sm font-bold uppercase tracking-wide">
                    Experience
                  </h2>
                  {experience.map((job) => (
                    <div key={`${job.org}-${job.title}`} className="mt-3">
                      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                        <p className="text-[13px] font-bold sm:text-sm">
                          {job.org}, {job.title}
                        </p>
                        <p className="shrink-0 text-[12px] font-semibold text-zinc-700">
                          {job.period}
                        </p>
                      </div>
                      <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[12.5px] leading-relaxed text-zinc-800 sm:text-[13px]">
                        {job.points.map((p) => (
                          <li key={p.slice(0, 48)}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section className="mt-5">
                  <h2 className="border-b border-black pb-0.5 text-sm font-bold uppercase tracking-wide">
                    Education
                  </h2>
                  {education.map((edu) => (
                    <div
                      key={edu.school}
                      className="mt-2 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between"
                    >
                      <p className="text-[13px] sm:text-sm">
                        <span className="font-bold">{edu.degree}</span>, {edu.school}
                      </p>
                      <p className="shrink-0 text-[12px] font-semibold text-zinc-700">
                        {edu.period}
                      </p>
                    </div>
                  ))}
                </section>

                <section className="mt-5">
                  <h2 className="border-b border-black pb-0.5 text-sm font-bold uppercase tracking-wide">
                    Skills
                  </h2>
                  <ul className="mt-2 space-y-1 text-[12.5px] leading-relaxed text-zinc-800 sm:text-[13px]">
                    {skills.map((s) => (
                      <li key={s.label}>
                        <span className="font-bold">{s.label}:</span> {s.items}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="mt-5">
                  <h2 className="border-b border-black pb-0.5 text-sm font-bold uppercase tracking-wide">
                    Projects
                  </h2>
                  {projects.map((proj) => (
                    <div key={proj.title} className="mt-3">
                      <p className="text-[13px] font-bold sm:text-sm">{proj.title}</p>
                      <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[12.5px] leading-relaxed text-zinc-800 sm:text-[13px]">
                        {proj.points.map((p) => (
                          <li key={p.slice(0, 48)}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
              </article>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;

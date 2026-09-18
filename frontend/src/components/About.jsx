import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Code, Radio, Sparkles } from 'lucide-react';
import SectionHeader from './SectionHeader';
import TiltCard from './TiltCard';
import { resumeData } from '../data/resume';

const About = () => {
  const education = resumeData.education;
  const tech = [
    'React',
    'Django/DRF',
    'Python',
    'PostgreSQL',
    'AWS',
    'Docker',
    'Kafka',
    'Redis',
    'ABDM',
    'Microservices',
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden py-24 pt-28">
      <div className="section-mesh" />

      <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
        <SectionHeader
          eyebrow="Profile"
          title="About"
          accent="Me"
          subtitle={resumeData.summary}
        />

        <div className="space-y-12 lg:space-y-14">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-x-10 xl:gap-x-14"
          >
            <motion.div
              variants={item}
              className="min-w-0 space-y-5 text-[0.95rem] leading-relaxed text-zinc-300 sm:text-lg lg:col-span-8 xl:col-span-9"
            >
              <p>
                <span className="font-semibold text-white">Full Stack Software Engineer</span> with
                production experience building scalable,{' '}
                <span className="font-semibold text-cyan-300">microservice-based healthcare systems</span>{' '}
                now live across <span className="font-semibold text-emerald-400">25+ hospitals</span>,
                pharmacies, labs, and OPD clinics. Designed and shipped a{' '}
                <span className="font-semibold text-fuchsia-300">6-microservice ERP</span> architecture
                end-to-end, and currently build an{' '}
                <span className="font-semibold text-emerald-400">ABDM-enabled, multi-tenant EHR SaaS</span>{' '}
                platform.
              </p>
              <p>
                Proficient in <span className="font-semibold text-fuchsia-300">React.js</span>,{' '}
                <span className="font-semibold text-emerald-400">Python (Django/DRF)</span>,{' '}
                <span className="font-semibold text-cyan-300">PostgreSQL</span>, and{' '}
                <span className="font-semibold text-cyan-300">AWS</span>, with hands-on experience in
                system architecture, REST APIs, Kafka-based event-driven systems, and Redis caching.
              </p>
              <p>
                At HlthTek Optimus I own architecture end-to-end — service boundaries, inter-service
                communication, inventory/pharmacy modules, billing with dynamic QR payments, S3
                assets, jsPDF invoices, and ABDM/ABHA verification. Promoted from intern to full-time
                for consistently owning API design and deployment decisions.
              </p>
              <p className="text-zinc-400">
                Comfortable owning a system from architecture through deployment — always learning
                and shipping production-ready code.
              </p>
            </motion.div>

            <motion.div
              variants={item}
              className="min-w-0 lg:col-span-4 xl:col-span-3 lg:justify-self-end lg:pl-4 xl:pl-6"
            >
              <TiltCard max={6} className="w-full max-w-md lg:ml-auto lg:max-w-[17.5rem] xl:max-w-xs">
                <div className="depth-card p-5 sm:p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
                      <GraduationCap className="text-cyan-300" size={22} strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                        Education
                      </h3>
                      <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                        Academic path
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div
                      className="absolute bottom-3 left-[5px] top-3 w-px bg-gradient-to-b from-cyan-400 via-cyan-400/40 to-cyan-400/10"
                      aria-hidden
                    />
                    <ul className="space-y-0">
                      {education.map((edu) => (
                        <li key={edu.school} className="relative pb-2 pl-10">
                          <span
                            className="absolute left-0 top-1.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-[#05060a] bg-[#0a0b0d] shadow-[0_0_12px_rgba(0,243,255,0.5)] ring-2 ring-cyan-400/50"
                            aria-hidden
                          />
                          <h4 className="text-base font-bold leading-snug tracking-tight text-white sm:text-lg">
                            {edu.school}
                          </h4>
                          <p className="mt-1 text-sm font-medium text-cyan-300">{edu.degree}</p>
                          <p className="mt-2 inline-flex items-center rounded-md bg-white/5 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider text-zinc-500">
                            {edu.period}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <TiltCard max={5}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="depth-card group flex h-full flex-col overflow-hidden p-6"
              >
                <div className="relative flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-fuchsia-500/30 bg-fuchsia-500/10">
                    <Briefcase className="text-fuchsia-300" size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">Quick Stats</h3>
                    <p className="text-xs text-zinc-500">At a glance</p>
                  </div>
                </div>
                <ul className="relative mt-6 space-y-4 border-t border-white/5 pt-6">
                  <li className="flex gap-3 text-sm">
                    <Radio className="mt-0.5 shrink-0 text-emerald-400" size={16} />
                    <span className="text-zinc-400">
                      Impact:{' '}
                      <span className="font-semibold text-emerald-400">25+ live facilities</span>
                    </span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <Sparkles className="mt-0.5 shrink-0 text-zinc-500" size={16} />
                    <span className="text-zinc-400">
                      Focus:{' '}
                      <span className="font-medium text-white">ABDM EHR · Microservices</span>
                    </span>
                  </li>
                </ul>
              </motion.div>
            </TiltCard>

            <TiltCard max={5}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="depth-card group flex h-full flex-col overflow-hidden p-6"
              >
                <div className="relative flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
                    <Code className="text-cyan-300" size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">Tech Stack</h3>
                    <p className="text-xs text-zinc-500">Tools I use daily</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-1 flex-wrap content-start gap-2 border-t border-white/5 pt-6">
                  {tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-zinc-200 shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-colors hover:border-emerald-400/40 hover:text-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

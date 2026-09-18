import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, ArrowRight, Eye } from 'lucide-react';
import Scene3D from './Scene3D';
import TiltCard from './TiltCard';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Hero = ({ onViewResume }) => {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16 md:pb-0">
      <Scene3D className="opacity-70 md:opacity-90" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#05060a]/40 via-transparent to-[#05060a]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_50%,transparent_20%,#05060a_85%)]" />

      <div className="container relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-12 md:gap-8 lg:px-8">
        <div className="md:col-span-7">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-5 font-mono text-sm uppercase tracking-[0.28em] text-emerald-400/90"
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-display mb-5 text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            Aksh{' '}
            <span className="bg-gradient-to-br from-white via-cyan-100 to-cyan-300/80 bg-clip-text text-transparent">
              Bhardwaj
            </span>
          </motion.h1>

          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-7 flex min-h-[2.5rem] flex-wrap items-baseline gap-x-3 text-xl text-zinc-400 sm:text-2xl md:text-[1.65rem]"
          >
            <span>I build as a</span>
            <TypeAnimation
              sequence={[
                'Full Stack Engineer',
                2200,
                'Django Specialist',
                2200,
                'React Developer',
                2200,
                'Systems Architect',
                2200,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="font-display font-medium text-cyan-300"
            />
          </motion.div>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-10 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            Production-ready healthcare systems live across 25+ hospitals — 6-microservice
            ERP, ABDM-enabled multi-tenant EHR, React + Django/DRF, Kafka & AWS.
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <motion.a
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="hero-cta group inline-flex items-center gap-2 rounded-lg bg-emerald-400 px-6 py-3.5 text-base font-semibold text-zinc-950 shadow-[0_12px_40px_rgba(57,255,20,0.25)] transition-shadow hover:shadow-[0_16px_48px_rgba(57,255,20,0.4)]"
            >
              Get In Touch
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </motion.a>

            <motion.button
              type="button"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onViewResume}
              className="group inline-flex items-center gap-2 rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-6 py-3.5 text-base font-semibold text-cyan-200 shadow-[0_8px_28px_rgba(0,243,255,0.12)] transition-all hover:border-cyan-300/60 hover:bg-cyan-400/15 hover:text-white"
            >
              <Eye size={18} className="transition-transform group-hover:scale-110" />
              View Resume
            </motion.button>

            <div className="flex items-center gap-2">
              {[
                { href: 'https://github.com/Aksh-Bhardwaj', Icon: Github, label: 'GitHub' },
                {
                  href: 'https://linkedin.com/in/aksh-bhardwaj-6125a81b4',
                  Icon: Linkedin,
                  label: 'LinkedIn',
                },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-0.5 hover:border-cyan-400/40 hover:text-cyan-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40, rotateY: -12 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center md:col-span-5"
          style={{ perspective: 1000 }}
        >
          <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-none">
            <div
              className="pointer-events-none absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(0,243,255,0.2)_0%,transparent_65%)] blur-2xl"
              aria-hidden
            />

            <TiltCard max={12} className="relative will-change-transform">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="hero-frame overflow-hidden rounded-2xl" style={{ transform: 'translateZ(40px)' }}>
                  <div className="relative overflow-hidden rounded-[0.9rem] bg-zinc-950">
                    <img
                      src="/images/profile.png"
                      alt="Aksh Bhardwaj"
                      className="aspect-square w-full object-cover object-top"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-white/5" />
                    <div className="absolute right-4 top-4 flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-950/75 px-2.5 py-1 shadow-lg backdrop-blur-md">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-300">
                        Available
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

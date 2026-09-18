import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 md:pb-0">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_40%,rgba(0,200,180,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_85%_55%,rgba(56,189,248,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(57,255,20,0.06),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 75%)',
          }}
        />
        <motion.div
          className="absolute top-[18%] left-[8%] h-px w-40 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        />
        <motion.div
          className="absolute bottom-[22%] right-[12%] h-px w-32 bg-gradient-to-r from-transparent via-neon-green/40 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
        />
      </div>

      <div className="container relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-12 md:gap-8 lg:px-8">
        <div className="md:col-span-7 lg:col-span-7">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-5 font-mono text-sm tracking-[0.28em] text-emerald-400/90 uppercase"
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
            <span className="bg-gradient-to-br from-white via-white to-cyan-300/80 bg-clip-text text-transparent">
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
                'Software Developer',
                2200,
                'Django Specialist',
                2200,
                'React Developer',
                2200,
                'API Security Enthusiast',
                2200,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="font-display font-medium text-cyan-300"
              cursor={true}
            />
          </motion.div>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-10 max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            Robust, secure web apps — high-performance backends paired with
            interactive frontends.
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-4"
          >
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="hero-cta group inline-flex items-center gap-2 rounded-md bg-emerald-400 px-7 py-3.5 text-base font-semibold text-zinc-950 transition-shadow hover:shadow-[0_0_32px_rgba(57,255,20,0.35)]"
            >
              Get In Touch
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.a>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/Aksh-Bhardwaj"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-md border border-white/10 text-zinc-400 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/aksh-bhardwaj-6125a81b4"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-md border border-white/10 text-zinc-400 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center md:col-span-5 lg:col-span-5"
        >
          <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-none">
            {/* Soft ambient light — not a harsh ring */}
            <div
              className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(0,243,255,0.18)_0%,transparent_65%)] blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-6 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl"
              aria-hidden
            />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="hero-frame overflow-hidden rounded-2xl">
                <div className="relative overflow-hidden rounded-[0.9rem] bg-zinc-950">
                  <img
                    src="/images/profile.png"
                    alt="Aksh Bhardwaj"
                    className="aspect-square w-full object-cover object-top"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-transparent to-transparent" />
                  <div className="absolute right-4 top-4 flex items-center gap-2 rounded-md border border-white/10 bg-zinc-950/70 px-2.5 py-1 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="font-mono text-[10px] tracking-wider text-zinc-300 uppercase">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

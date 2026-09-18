import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeader({ eyebrow, title, accent, align = 'left', subtitle }) {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className={`mb-12 md:mb-16 ${isCenter ? 'text-center' : ''}`}
    >
      {eyebrow && (
        <div
          className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400/90 ${
            isCenter ? 'justify-center' : ''
          }`}
        >
          {!isCenter && <span className="h-px w-10 bg-gradient-to-r from-cyan-400 to-transparent" />}
          {eyebrow}
          {isCenter && <span className="h-px w-10 bg-gradient-to-l from-cyan-400 to-transparent" />}
        </div>
      )}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}{' '}
        {accent && (
          <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
            {accent}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-base text-zinc-400 sm:text-lg ${isCenter ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

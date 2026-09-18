import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Skills from './Skills';
import Projects from './Projects';
import Blog from './Blog';
import Contact from './Contact';
import BlogDetail from './BlogDetail';
import ResumeModal from './ResumeModal';
import { AnimatePresence } from 'framer-motion';

export default function PortfolioSite() {
  const [selectedPost, setSelectedPost] = React.useState(null);
  const [resumeOpen, setResumeOpen] = React.useState(false);

  return (
    <div className="relative min-h-screen bg-[#05060a]">
      <div className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.18] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="pointer-events-none fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,243,255,0.07),transparent)]" />

      <Navbar onViewResume={() => setResumeOpen(true)} />
      <main>
        <Hero onViewResume={() => setResumeOpen(true)} />
        <About />
        <Experience />
        {/* Skills & Expertise kept as-is */}
        <Skills />
        <Projects />
        <Blog onSelectPost={setSelectedPost} />
        <Contact />
      </main>

      <AnimatePresence>
        {selectedPost && (
          <BlogDetail post={selectedPost} onClose={() => setSelectedPost(null)} />
        )}
      </AnimatePresence>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />

      <footer className="border-t border-white/5 bg-black/40 py-12 text-center backdrop-blur-sm">
        <p className="text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} Aksh Bhardwaj. Built with React & Django. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

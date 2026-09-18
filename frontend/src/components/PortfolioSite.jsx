import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import api from '../utils/api';
import { getLocalPostBySlug } from '../data/blogPosts';

export default function PortfolioSite() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    if (!slug) {
      setSelectedPost(null);
      document.title = 'Aksh Bhardwaj — Portfolio';
      return;
    }

    const local = getLocalPostBySlug(slug);
    if (local) {
      setSelectedPost(local);
      document.title = `${local.title} — Aksh Bhardwaj`;
      return;
    }

    api
      .get(`blogs/${slug}/`)
      .then((res) => {
        setSelectedPost(res.data);
        document.title = `${res.data.title} — Aksh Bhardwaj`;
      })
      .catch(() => {
        setSelectedPost(null);
        navigate('/', { replace: true });
      });
  }, [slug, navigate]);

  const openPost = (post) => {
    navigate(`/blog/${post.slug}`);
  };

  const closePost = () => {
    navigate('/');
    requestAnimationFrame(() => {
      document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  return (
    <div className="relative min-h-screen bg-[#05060a]">
      <div className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.18] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="pointer-events-none fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,243,255,0.07),transparent)]" />

      <Navbar onViewResume={() => setResumeOpen(true)} />
      <main>
        <Hero onViewResume={() => setResumeOpen(true)} />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Blog onSelectPost={openPost} />
        <Contact />
      </main>

      <AnimatePresence>
        {selectedPost && <BlogDetail post={selectedPost} onClose={closePost} />}
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

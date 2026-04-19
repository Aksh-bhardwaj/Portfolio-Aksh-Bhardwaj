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
import { AnimatePresence } from 'framer-motion';

export default function PortfolioSite() {
    const [selectedPost, setSelectedPost] = React.useState(null);

    return (
        <div className="relative">
            <div className="fixed inset-0 z-[-1] opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <Navbar />
            <main>
                <Hero />
                <About />
                <Experience />
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

            <footer className="border-t border-white/5 bg-black py-12 text-center">
                <p className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Aksh Bhardwaj. Built with React & Django. All rights reserved.
                </p>
            </footer>
        </div>
    );
}

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';

import BlogDetail from './components/BlogDetail';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [selectedPost, setSelectedPost] = React.useState(null);

  return (
    <div className="relative">
      {/* Background Mesh/Grain Effect */}
      <div className="fixed inset-0 z-[-1] opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
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
          <BlogDetail 
            post={selectedPost} 
            onClose={() => setSelectedPost(null)} 
          />
        )}
      </AnimatePresence>
      
      <footer className="py-12 bg-black border-t border-white/5 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Aksh Bhardwaj. Built with React & Django. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;

import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Twitter, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute top-1/4 -left-10 w-72 h-72 bg-neon-cyan opacity-10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-10 w-80 h-80 bg-neon-green opacity-10 rounded-full blur-[100px] animate-pulse delay-700"></div>

      <div className="container mx-auto px-4 z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-neon-green font-mono mb-4 text-xl tracking-widest uppercase">Hi, my name is</h2>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-neon-cyan to-neon-pink">
            Aksh Bhardwaj
          </h1>
          <div className="text-2xl md:text-3xl text-gray-400 mb-8 h-12">
            <span className="mr-3">I am a</span>
            <TypeAnimation
              sequence={[
                'Software Developer',
                2000,
                'Django Specialist',
                2000,
                'React Developer',
                2000,
                'API Security Enthusiast',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="neon-text-cyan font-bold"
            />
          </div>
          <p className="text-gray-400 max-w-lg mb-10 text-lg leading-relaxed">
            I build robust, secure, and modern web applications with a focus on high-performance backends and interactive frontends.
          </p>
          <div className="flex flex-wrap gap-6">
            <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-8 py-4 bg-transparent neon-button-green text-lg font-bold flex items-center gap-2 group"
            >
                Get In Touch <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <div className="flex items-center gap-6 ml-4">
              <a href="https://github.com/Aksh-Bhardwaj" target="_blank" className="text-gray-400 hover:neon-text-cyan transition-all transform hover:scale-110">
                <Github size={28} />
              </a>
              <a href="https://linkedin.com/in/aksh-bhardwaj-6125a81b4" target="_blank" className="text-gray-400 hover:neon-text-pink transition-all transform hover:scale-110">
                <Linkedin size={28} />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="flex justify-center"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan via-neon-green to-neon-pink rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative glass p-3 sm:p-4 rounded-2xl">
               <img 
                 src="/images/profile.png" 
                 alt="Aksh Bhardwaj" 
                 className="w-56 h-56 sm:w-72 sm:h-72 md:w-[350px] md:h-[350px] object-cover rounded-xl mx-auto"
               />
               <div className="absolute top-10 right-10 w-4 h-4 bg-neon-green rounded-full shadow-neon-green"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

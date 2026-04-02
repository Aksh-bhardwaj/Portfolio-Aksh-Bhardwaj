import React from 'react';
import { motion } from 'framer-motion';
import { Server, Layout, Database, Terminal, Shield, Cloud } from 'lucide-react';

const Skills = () => {
    const skillCategories = [
        {
            title: "Backend",
            icon: <Server className="text-neon-cyan" />,
            skills: ["Python", "Django", "Django REST Framework", "MySQL", "PL/SQL"]
        },
        {
            title: "Frontend",
            icon: <Layout className="text-neon-green" />,
            skills: ["React.js", "JavaScript (ES6+)", "HTML5 / CSS3", "Tailwind CSS"]
        },
        {
            title: "DevOps & Tools",
            icon: <Terminal className="text-neon-pink" />,
            skills: ["Docker", "Linux (Kali/Ubuntu)", "Git / GitHub", "Postman", "Burpsuite"]
        },
        {
            title: "Advanced",
            icon: <Shield className="text-white" />,
            skills: ["Kafka (Event Streaming)", "AWS (Lambda, S3)", "API Security & Testing"]
        }
    ];

    return (
        <section id="skills" className="py-24 bg-black/50 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-4 mb-16 justify-center">
                    <div className="h-px w-12 bg-neon-cyan"></div>
                    <h2 className="text-3xl font-bold neon-text-cyan uppercase tracking-wider">Skills & Expertise</h2>
                    <div className="h-px w-12 bg-neon-cyan"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass p-8 rounded-3xl hover:border-neon-cyan/50 transition-all group"
                        >
                            <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                {category.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-6 underline decoration-neon-cyan/30 decoration-2 underline-offset-8">
                                {category.title}
                            </h3>
                            <ul className="space-y-3">
                                {category.skills.map(skill => (
                                    <li key={skill} className="text-gray-400 flex items-center gap-2 group-hover:text-gray-200 transition-colors">
                                        <div className="w-1 h-1 bg-neon-cyan rounded-full"></div>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;

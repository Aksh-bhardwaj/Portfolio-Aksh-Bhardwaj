import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, ArrowUpRight } from 'lucide-react';

const Blog = ({ onSelectPost }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch from Django API
        api.get('blogs/')
            .then(res => {
                setPosts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                // Fallback for demo if API not running
                setPosts([
                    {
                        id: 1,
                        title: "My Experience as a Software Developer Intern",
                        content: "This is a detailed description of my internship at HlthTek Optimus. I worked on building robust RESTful APIs using Django and integrated them with a React frontend. The experience helped me understand a lot about scalable architecture.",
                        excerpt: "Reflecting on my time at HlthTek Optimus and the growth I've achieved building RESTful APIs.",
                        created_at: "2024-03-20",
                        slug: "internship-experience"
                    }
                ]);
                setLoading(false);
            });
    }, []);

    return (
        <section id="blog" className="py-24 bg-black/30">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-3xl font-bold text-white uppercase tracking-wider mb-2">Experiences & Blog</h2>
                    <div className="h-1 w-20 bg-neon-green rounded-full shadow-neon-green"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, idx) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass p-6 rounded-2xl border-white/5 hover:border-neon-green/30 transition-all flex flex-col h-full group"
                        >
                            <div className="flex items-center gap-3 text-neon-green mb-4 text-xs font-mono">
                                <Calendar size={14} />
                                {new Date(post.created_at).toLocaleDateString()}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-neon-green transition-colors">
                                {post.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                                {post.excerpt || "Click to read more about this experience and the technical challenges overcome."}
                            </p>
                            <button 
                                onClick={() => onSelectPost(post)}
                                className="inline-flex items-center gap-2 text-white font-bold group-hover:neon-text-green transition-all"
                            >
                                Read Post <ArrowUpRight size={18} />
                            </button>
                        </motion.article>
                    ))}
                    
                    {posts.length === 0 && !loading && (
                        <div className="col-span-full text-center text-gray-500 py-12">
                            No posts available yet. Check back soon!
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Blog;

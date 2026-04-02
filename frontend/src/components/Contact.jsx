import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import api from '../utils/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', msg: '' });

        try {
            await api.post('contact/', formData);
            setStatus({ type: 'success', msg: 'Message sent successfully! I will get back to you soon.' });
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            console.error(err);
            setStatus({ type: 'error', msg: 'Failed to send message via email, but you can still use WhatsApp below!' });
        } finally {
            setLoading(false);
        }
    };

    const handleWhatsApp = () => {
        const text = `Hi Aksh, I'm ${formData.name}. ${formData.message}`;
        const url = `https://wa.me/8709066041?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <section id="contact" className="py-24 bg-neon-dark relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-pink opacity-[0.03] rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4 tracking-tighter">GET IN <span className="neon-text-pink">TOUCH</span></h2>
                    <p className="text-gray-400">Have a project in mind or just want to say hi?</p>
                </div>

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
                        <div className="space-y-8">
                            <div className="flex items-start gap-6 group">
                                <div className="p-4 glass rounded-2xl text-neon-pink group-hover:shadow-neon-pink transition-all">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm uppercase font-mono tracking-widest mb-1">Email</p>
                                    <p className="grow text-white font-bold">akshkumarlalla@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6 group">
                                <div className="p-4 glass rounded-2xl text-neon-green group-hover:shadow-neon-green transition-all">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm uppercase font-mono tracking-widest mb-1">Phone / WhatsApp</p>
                                    <p className="text-white font-bold">+91 8709066041</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-6 group">
                                <div className="p-4 glass rounded-2xl text-neon-cyan group-hover:shadow-neon-cyan transition-all">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm uppercase font-mono tracking-widest mb-1">Location</p>
                                    <p className="text-white font-bold">Newtown, Kolkata</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-8 glass rounded-3xl border-neon-green/20">
                            <h4 className="text-lg font-bold text-white mb-4">Direct Action</h4>
                            <p className="text-gray-400 mb-6 text-sm">Need a faster response? Start a conversation on WhatsApp immediately.</p>
                            <button 
                                onClick={handleWhatsApp}
                                className="w-full py-4 bg-transparent border border-neon-green text-neon-green font-bold rounded-xl hover:bg-neon-green hover:text-black transition-all flex items-center justify-center gap-3 shadow-neon-green/10"
                            >
                                <MessageSquare size={20} /> CHAT ON WHATSAPP
                            </button>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass p-8 md:p-12 rounded-[2rem] border-white/5 shadow-2xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-400 text-xs font-mono uppercase tracking-widest mb-2">Your Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-neon-pink transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-xs font-mono uppercase tracking-widest mb-2">Email Address</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-neon-pink transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-xs font-mono uppercase tracking-widest mb-2">Message</label>
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-neon-pink transition-all resize-none"
                                    placeholder="How can I help you?"
                                ></textarea>
                            </div>

                            {status.msg && (
                                <div className={`p-4 rounded-xl text-sm ${status.type === 'success' ? 'bg-neon-green/10 text-neon-green border border-neon-green/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                    {status.msg}
                                </div>
                            )}

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full py-4 bg-neon-pink text-black font-extrabold rounded-xl hover:shadow-neon-pink transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? 'SENDING...' : 'SEND MESSAGE'} <Send size={20} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

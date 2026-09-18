import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, Phone, Mail } from 'lucide-react';
import api from '../utils/api';
import SectionHeader from './SectionHeader';
import TiltCard from './TiltCard';
import { resumeData } from '../data/resume';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
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
      setStatus({
        type: 'success',
        msg: 'Message sent successfully! I will get back to you soon.',
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        msg: 'Failed to send message via email, but you can still use WhatsApp below!',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const text = `Hi Aksh, I'm ${formData.name}. ${formData.message}`;
    const url = `https://wa.me/8709066041?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const info = [
    {
      icon: Mail,
      label: 'Email',
      value: resumeData.contact.email,
      color: 'text-fuchsia-300 border-fuchsia-500/30 bg-fuchsia-500/10',
    },
    {
      icon: Phone,
      label: 'Phone / WhatsApp',
      value: resumeData.contact.phoneDisplay,
      color: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="section-mesh" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.04] blur-[120px]" />

      <div className="container relative z-10 mx-auto px-4">
        <SectionHeader
          eyebrow="Connect"
          title="Get In"
          accent="Touch"
          align="center"
          subtitle="Have a project in mind or just want to say hi?"
        />

        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display mb-8 text-2xl font-semibold text-white">
              Contact Information
            </h3>
            <div className="space-y-6">
              {info.map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="flex items-start gap-5">
                  <div className={`rounded-xl border p-3.5 ${color}`}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="mb-1 font-mono text-xs uppercase tracking-widest text-zinc-500">
                      {label}
                    </p>
                    <p className="font-semibold text-white">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <TiltCard max={5} className="mt-10">
              <div className="depth-card p-7">
                <h4 className="mb-3 font-display text-lg font-semibold text-white">Direct Action</h4>
                <p className="mb-5 text-sm text-zinc-400">
                  Need a faster response? Start a conversation on WhatsApp immediately.
                </p>
                <button
                  onClick={handleWhatsApp}
                  className="flex w-full items-center justify-center gap-3 rounded-lg border border-emerald-400/60 bg-emerald-400/10 py-3.5 font-semibold text-emerald-300 transition-all hover:-translate-y-0.5 hover:bg-emerald-400 hover:text-zinc-950 hover:shadow-[0_12px_40px_rgba(57,255,20,0.25)]"
                >
                  <MessageSquare size={20} /> Chat on WhatsApp
                </button>
              </div>
            </TiltCard>
          </motion.div>

          <TiltCard max={5}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="depth-card p-8 md:p-10"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-zinc-400">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-3d"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-zinc-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-3d"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-zinc-400">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="input-3d resize-none"
                    placeholder="How can I help you?"
                  />
                </div>

                {status.msg && (
                  <div
                    className={`rounded-lg p-4 text-sm ${
                      status.type === 'success'
                        ? 'border border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
                        : 'border border-red-500/20 bg-red-500/10 text-red-400'
                    }`}
                  >
                    {status.msg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-400 to-emerald-400 py-3.5 font-bold text-zinc-950 shadow-[0_12px_40px_rgba(0,243,255,0.2)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,243,255,0.35)] disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Message'} <Send size={18} />
                </button>
              </form>
            </motion.div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Code, MapPin, Radio, Sparkles } from 'lucide-react';

const About = () => {
    const education = [
        {
            school: 'SISTER NIVEDITA UNIVERSITY',
            degree: 'Bachelor of Technology in Computer Science',
            year: 'Present',
        },
        {
            school: "St John's Academy",
            degree: 'Higher Secondary [PCM]',
            year: 'Completed',
        },
        {
            school: 'INDIAN PUBLIC SCHOOL',
            degree: 'Matriculation',
            year: 'Completed',
        },
    ];

    const tech = ['Django', 'React', 'Python', 'AWS', 'Docker', 'Postman', 'Linux'];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <section id="about" className="relative scroll-mt-24 overflow-hidden bg-[#050506] py-24 pt-28">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_-10%,rgba(57,255,20,0.06),transparent)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_90%_0%,rgba(0,243,255,0.05),transparent)]" />

            <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-14 md:mb-16"
                >
                    <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-neon-green/90">
                        <span className="h-px w-10 bg-gradient-to-r from-neon-green to-transparent" />
                        Profile
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                        <span className="neon-text-green">About</span>{' '}
                        <span className="text-white">Me</span>
                    </h2>
                    <p className="mt-4 max-w-4xl text-base text-gray-400 sm:text-lg">
                        Backend, frontend, and security — with a focus on clean APIs and sharp UX.
                    </p>
                </motion.div>

                <div className="space-y-12 lg:space-y-14">
                    {/* Row 1: About (wide) | Education (narrow, right) */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-x-10 xl:gap-x-14"
                    >
                        <motion.div
                            variants={item}
                            className="min-w-0 space-y-6 text-[0.95rem] leading-relaxed text-gray-300 sm:text-lg lg:col-span-8 xl:col-span-9"
                        >
                            <p>
                                Computer Science graduate with hands-on experience in{' '}
                                <span className="font-semibold text-neon-cyan">Python and API testing</span> using Postman,
                                backed by strong fundamentals in Networking, Operating Systems, and Linux.
                            </p>
                            <p>
                                Experienced in backend development using{' '}
                                <span className="font-semibold text-neon-green">Django</span> and frontend development with{' '}
                                <span className="font-semibold text-neon-pink">React</span>. Familiar with Docker for
                                containerization and Kafka for event-driven data streaming.
                            </p>
                            <p className="text-gray-400">
                                Working knowledge of AWS services including Lambda and S3. Continuously learning modern
                                technologies and eager to contribute.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={item}
                            className="min-w-0 lg:col-span-4 xl:col-span-3 lg:justify-self-end lg:pl-4 xl:pl-6"
                        >
                            <div className="w-full max-w-md lg:ml-auto lg:max-w-[17.5rem] xl:max-w-xs">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-neon-cyan/30 bg-neon-cyan/5">
                                    <GraduationCap className="text-neon-cyan" size={22} strokeWidth={1.75} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">Education</h3>
                                    <p className="text-xs font-medium uppercase tracking-widest text-gray-500">Academic path</p>
                                </div>
                            </div>

                            <div className="relative">
                                <div
                                    className="absolute left-[5px] top-3 bottom-3 w-px bg-gradient-to-b from-neon-cyan via-neon-cyan/40 to-neon-cyan/10"
                                    aria-hidden
                                />
                                <ul className="space-y-0">
                                    {education.map((edu) => (
                                        <li key={edu.school} className="relative pb-8 pl-10 last:pb-0">
                                            <span
                                                className="absolute left-0 top-1.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-[#050506] bg-[#0a0b0d] shadow-[0_0_12px_rgba(0,243,255,0.7)] ring-2 ring-neon-cyan/60"
                                                aria-hidden
                                            />
                                            <h4 className="text-base font-bold leading-snug tracking-tight text-white sm:text-lg">{edu.school}</h4>
                                            <p className="mt-1 text-sm font-medium text-neon-cyan">{edu.degree}</p>
                                            <p className="mt-2 inline-flex items-center rounded-full bg-white/5 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider text-gray-500">
                                                {edu.year}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Row 2: Quick Stats | Tech Stack */}
                    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.05 }}
                            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-transparent p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-sm transition-colors hover:border-fuchsia-500/25"
                        >
                            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-fuchsia-500/10 blur-2xl transition-opacity group-hover:opacity-80" />
                            <div className="relative flex items-start gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-fuchsia-500/30 bg-fuchsia-500/10">
                                    <Briefcase className="text-fuchsia-300" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Quick Stats</h3>
                                    <p className="text-xs text-gray-500">At a glance</p>
                                </div>
                            </div>
                            <ul className="relative mt-6 space-y-4 border-t border-white/5 pt-6">
                                <li className="flex gap-3 text-sm">
                                    <MapPin className="mt-0.5 shrink-0 text-gray-500" size={16} />
                                    <span className="text-gray-400">
                                        Based in: <span className="font-medium text-white">Newtown, Kolkata</span>
                                    </span>
                                </li>
                                <li className="flex gap-3 text-sm">
                                    <Radio className="mt-0.5 shrink-0 text-neon-green" size={16} />
                                    <span className="text-gray-400">
                                        Remote:{' '}
                                        <span className="font-semibold text-neon-green">Ready to work</span>
                                    </span>
                                </li>
                                <li className="flex gap-3 text-sm">
                                    <Sparkles className="mt-0.5 shrink-0 text-gray-500" size={16} />
                                    <span className="text-gray-400">
                                        Learning:{' '}
                                        <span className="font-medium text-white">Next.js, Cloud-Native</span>
                                    </span>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.12 }}
                            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-transparent p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-sm transition-colors hover:border-neon-cyan/30"
                        >
                            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-neon-cyan/10 blur-2xl transition-opacity group-hover:opacity-80" />
                            <div className="relative flex items-start gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-neon-cyan/30 bg-neon-cyan/10">
                                    <Code className="text-neon-cyan" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Tech Stack</h3>
                                    <p className="text-xs text-gray-500">Tools I use daily</p>
                                </div>
                            </div>
                            <div className="mt-6 flex flex-1 flex-wrap content-start gap-2 border-t border-white/5 pt-6">
                                {tech.map((t) => (
                                    <span
                                        key={t}
                                        className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-gray-200 shadow-sm transition-colors hover:border-neon-green/40 hover:text-white"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { setTokens, clearTokens, isLoggedIn } from '../utils/authStorage';
import { LogIn, LogOut, Send, Loader2, Shield } from 'lucide-react';

export default function AdminBlog() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [loggedIn, setLoggedIn] = useState(isLoggedIn());

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (loggedIn) loadPosts();
    }, [loggedIn]);

    async function loadPosts() {
        try {
            const { data } = await api.get('blogs/');
            setPosts(Array.isArray(data) ? data : []);
        } catch {
            setPosts([]);
        }
    }

    async function handleLogin(e) {
        e.preventDefault();
        setMsg('');
        try {
            const { data } = await api.post('auth/login/', { username, password });
            setTokens(data.access, data.refresh);
            setLoggedIn(true);
            setPassword('');
        } catch {
            setMsg('Login failed. Use a Django superuser username and password.');
        }
    }

    function handleLogout() {
        clearTokens();
        setLoggedIn(false);
        setMsg('');
    }

    async function handlePublish(e) {
        e.preventDefault();
        setSubmitting(true);
        setMsg('');
        try {
            const payload = {
                title: title.trim(),
                content: content.trim(),
                excerpt: excerpt.trim(),
            };
            if (slug.trim()) payload.slug = slug.trim();
            await api.post('blogs/', payload);
            setTitle('');
            setSlug('');
            setExcerpt('');
            setContent('');
            await loadPosts();
            setMsg('Published successfully.');
        } catch (err) {
            const d = err.response?.data;
            setMsg(
                typeof d === 'object'
                    ? JSON.stringify(d)
                    : err.response?.status === 403
                      ? 'Forbidden — only superusers can publish.'
                      : 'Publish failed.'
            );
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#050506] px-4 py-10">
            <div className="mx-auto max-w-3xl">
                <Link to="/" className="mb-8 inline-block text-sm text-neon-cyan hover:underline">
                    ← Back to portfolio
                </Link>

                <div className="mb-10 flex items-start gap-3">
                    <div className="rounded-xl border border-neon-green/30 bg-neon-green/10 p-3">
                        <Shield className="text-neon-green" size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">Blog Studio</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            JWT login · Django <span className="text-neon-pink">superuser</span> only · Markdown-friendly
                            body text
                        </p>
                    </div>
                </div>

                {!loggedIn ? (
                    <form
                        onSubmit={handleLogin}
                        className="glass max-w-md space-y-4 rounded-2xl border border-white/10 p-8"
                    >
                        <div>
                            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500">
                                Username
                            </label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-neon-cyan/50"
                                autoComplete="username"
                                required
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-gray-500">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-neon-cyan/50"
                                autoComplete="current-password"
                                required
                            />
                        </div>
                        {msg && <p className="text-sm text-red-400">{msg}</p>}
                        <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-neon-green py-3 font-bold text-neon-green transition hover:bg-neon-green hover:text-black"
                        >
                            <LogIn size={18} /> Sign in
                        </button>
                    </form>
                ) : (
                    <div className="space-y-10">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm text-gray-300 hover:border-neon-pink/50 hover:text-white"
                            >
                                <LogOut size={16} /> Log out
                            </button>
                        </div>

                        <form
                            onSubmit={handlePublish}
                            className="glass space-y-4 rounded-2xl border border-white/10 p-8"
                        >
                            <h2 className="text-xl font-bold text-white">New post</h2>
                            <div>
                                <label className="mb-2 block text-xs uppercase tracking-wider text-gray-500">Title</label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-neon-cyan/50"
                                    required
                                    placeholder="Post title"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-xs uppercase tracking-wider text-gray-500">
                                    Slug <span className="text-gray-600">(optional — auto from title)</span>
                                </label>
                                <input
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-neon-cyan/50"
                                    placeholder="my-post-slug"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-xs uppercase tracking-wider text-gray-500">
                                    Excerpt
                                </label>
                                <input
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-neon-cyan/50"
                                    placeholder="Short summary"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-xs uppercase tracking-wider text-gray-500">
                                    Content (Markdown OK)
                                </label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="min-h-[240px] w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-white outline-none focus:border-neon-cyan/50"
                                    required
                                    placeholder="Write your post..."
                                />
                            </div>
                            {msg && (
                                <p className={`text-sm ${msg.includes('success') ? 'text-neon-green' : 'text-red-400'}`}>
                                    {msg}
                                </p>
                            )}
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex items-center gap-2 rounded-xl border border-neon-cyan bg-neon-cyan/10 px-6 py-3 font-bold text-neon-cyan transition hover:bg-neon-cyan hover:text-black disabled:opacity-50"
                            >
                                {submitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                                Publish
                            </button>
                        </form>

                        <div>
                            <h3 className="mb-4 text-lg font-semibold text-white">Recent posts</h3>
                            <ul className="space-y-2">
                                {posts.map((p) => (
                                    <li
                                        key={p.slug}
                                        className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                                    >
                                        <span className="font-medium text-gray-200">{p.title}</span>
                                        <span className="text-xs text-gray-500">{p.slug}</span>
                                    </li>
                                ))}
                            </ul>
                            {posts.length === 0 && (
                                <p className="text-sm text-gray-600">No posts yet — publish your first above.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

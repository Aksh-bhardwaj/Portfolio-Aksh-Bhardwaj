import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, ArrowLeft, ThumbsUp, ThumbsDown, MessageSquare, Send, Highlighter } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import api from '../utils/api';

const BlogDetail = ({ post, onClose }) => {
    const [currentPost, setCurrentPost] = useState(post);
    const [commentData, setCommentData] = useState({ name: '', text: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [highlightMode, setHighlightMode] = useState(false);
    const [userVote, setUserVote] = useState(null);

    useEffect(() => {
        const votes = JSON.parse(localStorage.getItem('aksh_portfolio_votes') || '{}');
        if (votes[post.slug]) {
            setUserVote(votes[post.slug]);
        }

        api.get(`blogs/${post.slug}/`)
            .then(res => setCurrentPost(res.data))
            .catch(err => console.error("Error fetching full post:", err));
    }, [post.slug]);

    const handleVote = async (type) => {
        if (userVote === type) return;

        try {
            if (userVote) {
                await api.post(`blogs/${currentPost.slug}/undo_${userVote}/`);
            }

            const res = await api.post(`blogs/${currentPost.slug}/${type}/`);

            setCurrentPost({
                ...currentPost,
                likes: res.data.likes,
                dislikes: res.data.dislikes,
            });

            const votes = JSON.parse(localStorage.getItem('aksh_portfolio_votes') || '{}');
            votes[currentPost.slug] = type;
            localStorage.setItem('aksh_portfolio_votes', JSON.stringify(votes));
            setUserVote(type);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await api.post(`blogs/${currentPost.slug}/comment/`, commentData);
            setCurrentPost({ 
                ...currentPost, 
                comments: [res.data, ...(currentPost.comments || [])] 
            });
            setCommentData({ name: '', text: '' });
        } catch (err) {
            console.error("Comment Error:", err.response?.data || err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!currentPost) return null;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] bg-[#090a0d] overflow-y-auto overflow-x-hidden pt-20 ${highlightMode ? 'selection:bg-yellow-400 selection:text-black' : ''}`}
        >
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-cyan opacity-[0.05] rounded-full blur-[150px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-pink opacity-[0.05] rounded-full blur-[150px]"></div>
            </div>

            <nav className="fixed top-0 left-0 w-full z-[110] glass border-b border-white/5 px-6 py-4 flex justify-between items-center backdrop-blur-2xl">
                <button 
                    onClick={onClose}
                    className="flex items-center gap-2 text-white hover:neon-text-cyan transition-all font-mono text-sm tracking-widest"
                >
                    <ArrowLeft size={18} /> BACK
                </button>
                
                <div className="flex items-center gap-8">
                    <button 
                        onClick={() => setHighlightMode(!highlightMode)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${highlightMode ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.5)]' : 'bg-white/5 text-gray-400 border border-white/10'}`}
                    >
                        <Highlighter size={14} /> HIGHLIGHT {highlightMode ? 'ON' : 'OFF'}
                    </button>
                    <button onClick={onClose} className="p-2 bg-white/5 hover:bg-neon-pink rounded-full hover:text-black transition-all">
                        <X size={20} />
                    </button>
                </div>
            </nav>

            <div className="container relative z-10 mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:max-w-[52rem]">
                <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                    <header className="mx-auto mb-10 max-w-[65ch]">
                        <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-wider text-gray-500 sm:text-sm">
                            <span className="inline-flex items-center gap-2 text-emerald-400/90">
                                <Calendar size={14} aria-hidden />
                                {new Date(currentPost.created_at).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </span>
                            <span className="hidden h-1 w-1 rounded-full bg-gray-600 sm:inline" aria-hidden />
                            <span className="inline-flex items-center gap-2 text-gray-500">
                                <Clock size={14} aria-hidden />
                                ~5 min read
                            </span>
                        </div>

                        <h1 className="text-balance text-3xl font-bold leading-[1.15] tracking-tight text-gray-50 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                            {currentPost.title}
                        </h1>
                    </header>

                    <article
                        className={`markdown-content prose prose-invert prose-lg mx-auto max-w-[65ch]
                        prose-headings:scroll-mt-28 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-gray-50
                        prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2 prose-h2:text-2xl prose-h2:leading-snug
                        prose-h3:mt-10 prose-h3:mb-3 prose-h3:text-xl prose-h3:text-gray-100 prose-h3:leading-snug
                        prose-h4:text-lg prose-h4:font-semibold prose-h4:text-gray-200
                        prose-p:mb-6 prose-p:text-[1.0625rem] prose-p:leading-[1.8] prose-p:text-[#c5ccd6]
                        prose-strong:font-semibold prose-strong:text-cyan-200
                        prose-a:text-cyan-400 prose-a:underline-offset-4 hover:prose-a:text-cyan-300
                        prose-ul:my-6 prose-ul:list-outside prose-ul:pl-5 prose-ul:marker:text-cyan-400/90
                        prose-ol:my-6 prose-ol:list-outside prose-ol:pl-6 prose-ol:marker:text-cyan-400/80
                        prose-li:my-2 prose-li:pl-1 prose-li:text-[#c5ccd6] prose-li:leading-relaxed
                        prose-blockquote:my-8 prose-blockquote:border-l-2 prose-blockquote:border-cyan-500/50 prose-blockquote:bg-white/[0.03] prose-blockquote:py-3 prose-blockquote:pl-5 prose-blockquote:pr-4 prose-blockquote:italic prose-blockquote:text-gray-400
                        prose-hr:my-12 prose-hr:border-white/[0.12]
                        prose-code:rounded-md prose-code:border prose-code:border-white/10 prose-code:bg-white/[0.08] prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.9em] prose-code:font-normal prose-code:text-emerald-300/95 before:prose-code:content-none after:prose-code:content-none
                        prose-pre:my-8 prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-[#050608] prose-pre:p-5
                        prose-table:w-full prose-table:border-collapse prose-table:text-sm prose-table:text-[#c5ccd6]
                        prose-th:border prose-th:border-white/15 prose-th:bg-white/[0.06] prose-th:px-3 prose-th:py-2 prose-th:text-left prose-th:text-gray-200
                        prose-td:border prose-td:border-white/10 prose-td:px-3 prose-td:py-2
                        ${highlightMode ? 'cursor-text' : ''}`}
                    >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentPost.content}</ReactMarkdown>
                    </article>

                    <div className="mx-auto my-16 max-w-[65ch] border-y border-white/5 py-6">
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                        <button 
                            onClick={() => handleVote('like')} 
                            disabled={userVote === 'like'}
                            className={`flex items-center gap-3 transition-all px-6 py-2 rounded-xl group ${userVote === 'like' ? 'bg-neon-green text-black' : 'text-gray-400 hover:text-neon-green bg-white/5'}`}
                        >
                            <ThumbsUp size={20} className={userVote === 'like' ? 'fill-black' : ''} />
                            <span className="font-bold">{currentPost.likes || 0}</span>
                        </button>
                        
                        <button 
                            onClick={() => handleVote('dislike')} 
                            disabled={userVote === 'dislike'}
                            className={`flex items-center gap-3 transition-all px-6 py-2 rounded-xl group ${userVote === 'dislike' ? 'bg-neon-pink text-black' : 'text-gray-400 hover:text-neon-pink bg-white/5'}`}
                        >
                            <ThumbsDown size={20} className={userVote === 'dislike' ? 'fill-black' : ''} />
                            <span className="font-bold">{currentPost.dislikes || 0}</span>
                        </button>

                        <div className="ml-0 flex items-center gap-2 text-gray-400 sm:ml-auto">
                            <span className="p-2 bg-white/5 rounded-lg">
                                <MessageSquare size={18} />
                            </span>
                            <span className="font-bold">{currentPost.comments?.length || 0} Comments</span>
                        </div>
                    </div>
                    </div>

                    <div className="mx-auto mt-16 max-w-[65ch] border-t border-white/5 pt-14">
                        <h3 className="text-3xl font-bold text-white mb-12 flex items-center gap-4">
                            Comments <span className="text-sm bg-white/10 px-3 py-1 rounded-full text-gray-400">{currentPost.comments?.length || 0}</span>
                        </h3>

                        <form onSubmit={handleCommentSubmit} className="glass p-8 rounded-3xl border-white/5 mb-16">
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-gray-400 text-xs font-mono uppercase mb-2">Display Name</label>
                                    <input 
                                        type="text"
                                        value={commentData.name}
                                        onChange={(e) => setCommentData({...commentData, name: e.target.value})}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan"
                                        placeholder="Alex..."
                                    />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-400 text-xs font-mono uppercase mb-2">Comment</label>
                                <textarea 
                                    rows="4"
                                    value={commentData.text}
                                    onChange={(e) => setCommentData({...commentData, text: e.target.value})}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan resize-none"
                                    placeholder="Share your thoughts..."
                                ></textarea>
                            </div>
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-neon-cyan text-black font-bold rounded-xl hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all flex items-center gap-2"
                            >
                                {isSubmitting ? 'Posting...' : 'Post Comment'} <Send size={18} />
                            </button>
                        </form>

                        <div className="space-y-8">
                            {currentPost.comments?.map((comment) => (
                                <motion.div 
                                    key={comment.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-6 bg-white/5 rounded-2xl border-l-2 border-neon-cyan relative"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-white font-bold">{comment.name}</span>
                                        <span className="text-gray-500 text-xs">{new Date(comment.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-gray-400 leading-relaxed">{comment.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-20 py-12 border-t border-white/5 text-center">
                        <button 
                            onClick={onClose}
                            className="px-12 py-5 bg-transparent border border-neon-green text-neon-green font-extrabold rounded-2xl hover:bg-neon-green hover:text-black transition-all"
                        >
                            CLOSE ARTICLE
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default BlogDetail;

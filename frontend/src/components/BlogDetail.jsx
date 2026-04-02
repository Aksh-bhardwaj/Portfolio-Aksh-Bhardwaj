import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Share2, ArrowLeft, Bookmark, ThumbsUp, ThumbsDown, MessageSquare, Send, Highlighter } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import api from '../utils/api';

const BlogDetail = ({ post, onClose }) => {
    const [currentPost, setCurrentPost] = useState(post);
    const [commentData, setCommentData] = useState({ name: '', text: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [highlightMode, setHighlightMode] = useState(false);
    const [userVote, setUserVote] = useState(null); // 'like', 'dislike', or null

    useEffect(() => {
        // Check local storage for previous votes
        const votes = JSON.parse(localStorage.getItem('aksh_portfolio_votes') || '{}');
        if (votes[post.slug]) {
            setUserVote(votes[post.slug]);
        }

        // Refresh post data to get comments and counts
        api.get(`blogs/${post.slug}/`)
            .then(res => setCurrentPost(res.data))
            .catch(err => console.error("Error fetching full post:", err));
    }, [post.slug]);

    const handleVote = async (type) => {
        if (userVote === type) return; // Already voted this way

        try {
            // 1. If switching, undo the previous vote
            if (userVote) {
                await api.post(`blogs/${currentPost.slug}/undo_${userVote}/`);
            }

            // 2. Perform the new vote
            const res = await api.post(`blogs/${currentPost.slug}/${type}/`);
            
            // 3. Update both counts from the response
            setCurrentPost({ 
                ...currentPost, 
                likes: res.data.likes, 
                dislikes: res.data.dislikes 
            });
            
            // 4. Save vote locally
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
            // Prepend new comment to list
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
            className={`fixed inset-0 z-[100] bg-[#0a0b0d] overflow-y-auto overflow-x-hidden pt-20 ${highlightMode ? 'selection:bg-yellow-400 selection:text-black' : ''}`}
        >
            {/* Animated background highlights */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-cyan opacity-[0.05] rounded-full blur-[150px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-pink opacity-[0.05] rounded-full blur-[150px]"></div>
            </div>

            {/* Sticky Header Navigation */}
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

            <div className="container mx-auto px-4 max-w-4xl relative z-10 py-12">
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-neon-green font-mono text-sm mb-6">
                        <Calendar size={16} />
                        <span>{new Date(currentPost.created_at).toLocaleDateString()}</span>
                        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                        <Clock size={16} />
                        <span>5 min read</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-10 tracking-tighter leading-[1.1]">
                        {currentPost.title}
                    </h1>

                    {/* Content Section */}
                    <article className="prose prose-invert prose-lg max-w-none 
                        prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                        prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-8
                        prose-strong:text-neon-cyan prose-strong:font-bold
                        prose-code:text-neon-green prose-code:bg-white/5 prose-code:px-1 prose-code:rounded
                        prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/5 prose-pre:rounded-2xl
                        prose-ul:list-disc prose-ul:pl-6 prose-li:text-gray-300
                    ">
                        <div className={`markdown-content ${highlightMode ? 'cursor-text' : ''}`}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {currentPost.content}
                            </ReactMarkdown>
                        </div>
                    </article>

                    {/* Interactivity Bar Bottom */}
                    <div className="flex items-center gap-6 my-16 border-y border-white/5 py-6">
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

                        <div className="flex items-center gap-2 text-gray-400 ml-auto">
                            <span className="p-2 bg-white/5 rounded-lg">
                                <MessageSquare size={18} />
                            </span>
                            <span className="font-bold">{currentPost.comments?.length || 0} Comments</span>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-24 border-t border-white/5 pt-16">
                        <h3 className="text-3xl font-bold text-white mb-12 flex items-center gap-4">
                            Comments <span className="text-sm bg-white/10 px-3 py-1 rounded-full text-gray-400">{currentPost.comments?.length || 0}</span>
                        </h3>

                        {/* Comment Form */}
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

                        {/* Comment List */}
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

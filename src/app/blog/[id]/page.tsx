"use client";
import { motion } from "framer-motion";
import { Calendar, User, Clock, ArrowLeft, Share2, Heart } from "lucide-react";
import Link from "next/link";

export default function BlogPost({ params }: { params: { lib: string } }) {
  // Demo Data (In real case, fetch from your API or DB using params.lib)
  const post = {
    title: "The Future of AI in 2026: Beyond Imagination",
    author: "Admin",
    date: "May 1, 2026",
    readTime: "8 min read",
    category: "Technology",
    content: `AI is no longer just a tool; it's becoming an ecosystem. As we dive deeper into 2026, the integration of generative intelligence into our daily lives has reached a pinnacle point...`
  };

  return (
    <div className="min-h-screen bg-[#020617] text-gray-200 relative overflow-hidden selection:bg-blue-500/30">
      
      {/* --- BVIP Background (Animated & Premium) --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        
        {/* Back Button */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all mb-10 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Feed</span>
        </Link>

        {/* Blog Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-blue-600/20 text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border border-blue-600/20">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
            {post.title.replace('-', ' ')} <span className="text-blue-500">.</span>
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 border-t border-white/5 pt-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/40">
                <User size={14} className="text-blue-400" />
              </div>
              <span className="text-white font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} /> <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} /> <span>{post.readTime}</span>
            </div>
          </div>
        </motion.div>

        {/* Blog Content Section */}
        <motion.article 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="prose prose-invert prose-blue max-w-none bg-white/[0.02] p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-inner"
        >
          <p className="text-xl leading-relaxed text-gray-300 first-letter:text-7xl first-letter:font-bold first-letter:text-blue-500 first-letter:mr-3 first-letter:float-left">
            {post.content}
          </p>
          
          <div className="h-64 w-full bg-gradient-to-tr from-blue-900/20 to-indigo-900/20 rounded-3xl my-10 border border-white/10 flex items-center justify-center">
             <span className="text-gray-500 italic">Premium Article Image Placeholder</span>
          </div>

          <p className="text-lg leading-relaxed text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </motion.article>

        {/* Footer Actions */}
        <div className="mt-12 flex items-center justify-between bg-white/5 p-6 rounded-3xl border border-white/10">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 hover:text-red-400 transition">
              <Heart size={24} /> <span className="font-bold">2.4k</span>
            </button>
            <button className="flex items-center gap-2 hover:text-blue-400 transition">
              <Share2 size={24} />
            </button>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-2xl shadow-lg shadow-blue-600/20 transition-all">
            Subscribe for More
          </button>
        </div>

      </main>
    </div>
  );
}
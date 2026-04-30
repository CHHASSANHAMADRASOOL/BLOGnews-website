"use client";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future of Electric Hypercars",
    excerpt: "Explore how brands like Lamborghini and Ferrari are transitioning to hybrid and electric beasts without losing their soul.",
    author: "Admin VIP",
    date: "Oct 24, 2023",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
    category: "Innovation"
  },
  {
    id: 2,
    title: "Top 5 Luxury SUVs for 2024",
    excerpt: "From the Cullinan to the G-Wagon, we break down the most dominant SUVs in the luxury market today.",
    author: "Garage Expert",
    date: "Oct 20, 2023",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&q=80&w=800",
    category: "Reviews"
  },
  {
    id: 3,
    title: "Maintenance Tips for Exotic Engines",
    excerpt: "Owning a supercar is one thing, maintaining it is another. Learn the secrets of keeping your engine roaring.",
    author: "Chief Mechanic",
    date: "Oct 15, 2023",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1486497395442-885f2146ac77?auto=format&fit=crop&q=80&w=800",
    category: "Maintenance"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6 relative overflow-hidden">
      
      {/* Kamal ka Dynamic Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black"></div>
        <img 
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920" 
          className="w-full h-full object-cover opacity-20 grayscale scale-110"
          alt="Background"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Blog Header */}
        <div className="text-center mb-20">
          <h4 className="text-red-600 font-bold tracking-[0.5em] mb-4 text-xs">VIP JOURNAL</h4>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-6">
            LATEST <span className="text-red-600">STORIES</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto font-medium">
            Stay ahead with exclusive insights into the automotive world's elite performance and luxury.
          </p>
        </div>

        {/* Featured Post (Big Card) */}
        <div className="relative group rounded-[50px] overflow-hidden border border-white/10 mb-20 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-1000"
            alt="Featured"
          />
          <div className="absolute bottom-0 left-0 p-10 z-20 w-full md:w-2/3">
            <span className="bg-red-600 text-[10px] font-black px-4 py-1 rounded-full tracking-[0.2em] mb-4 inline-block">TRENDING</span>
            <h2 className="text-4xl md:text-5xl font-black italic mb-4">Mastering the Art of Speed: The 2024 Track Guide</h2>
            <p className="text-gray-300 mb-6 line-clamp-2">The ultimate guide for VIP owners who want to push their machines to the absolute limit on the world's most dangerous tracks.</p>
            <button className="flex items-center gap-3 text-sm font-bold text-red-500 hover:text-white transition-colors">
              READ ARTICLE <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {BLOG_POSTS.map((post) => (
            <div key={post.id} className="group bg-white/5 border border-white/10 rounded-[40px] overflow-hidden hover:border-red-600/30 transition-all flex flex-col">
              <div className="h-60 overflow-hidden relative">
                <img 
                  src={post.image} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={post.title} 
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-bold border border-white/10">
                  {post.category}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-[10px] text-gray-500 font-bold mb-4">
                  <span className="flex items-center gap-1"><Calendar size={12} className="text-red-600"/> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} className="text-red-600"/> {post.readTime}</span>
                </div>
                
                <h3 className="text-2xl font-bold italic mb-4 group-hover:text-red-600 transition-colors leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-600/20 rounded-full flex items-center justify-center">
                      <User size={14} className="text-red-600" />
                    </div>
                    <span className="text-xs font-bold text-gray-300">{post.author}</span>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-red-600 transition-all">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter VIP */}
        <div className="mt-32 p-12 rounded-[50px] bg-gradient-to-b from-red-600/10 to-transparent border border-red-600/20 text-center">
          <h2 className="text-3xl font-black italic mb-2">SUBSCRIBE TO VIP INSIGHTS</h2>
          <p className="text-gray-400 mb-8">Get exclusive car releases and market trends directly in your inbox.</p>
          <div className="max-w-md mx-auto flex gap-2">
            <input 
              type="email" 
              placeholder="Your VIP Email" 
              className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-red-600 transition-all"
            />
            <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-2xl font-black text-xs transition-all active:scale-95">
              JOIN NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
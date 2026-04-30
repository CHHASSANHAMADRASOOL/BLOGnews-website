"use client";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, Users, FileText, Settings, 
  LogOut, Search, Bell, TrendingUp, 
  ArrowUpRight, Clock, Plus
} from "lucide-react";
import AIChatbot from "@/components/AiAgent"; // Chatbot ko separate component bana kar yahan rakhein

export default function UltimateDashboard() {
  return (
    <div className="min-h-screen bg-[#030712] text-white flex overflow-hidden">
      
      {/* 1. Kamal ki Sidebar */}
      <aside className="w-72 bg-white/5 backdrop-blur-2xl border-r border-white/10 p-6 flex flex-col hidden lg:flex">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <LayoutDashboard size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter">BLOG<span className="text-blue-500">NEWS</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { icon: LayoutDashboard, label: "Overview", active: true },
            { icon: FileText, label: "All Posts", active: false },
            { icon: Users, label: "User Management", active: false },
            { icon: Settings, label: "Site Settings", active: false },
          ].map((item) => (
            <button key={item.label} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${item.active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'hover:bg-white/5 text-gray-400'}`}>
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="flex items-center gap-4 p-4 text-red-400 hover:bg-red-400/10 rounded-2xl transition-all">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 overflow-y-auto relative p-6 md:p-10">
        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-10" />

        {/* Top Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold">Dashboard Overview</h2>
            <p className="text-gray-400">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input type="text" placeholder="Search data..." className="bg-white/5 border border-white/10 p-3 pl-12 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 w-64 text-sm" />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 p-3 px-6 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all">
              <Plus size={18} /> New Post
            </button>
          </div>
        </header>

        {/* Stats Cards (Wahi jo humne pehle banaye the) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Card Example */}
          <motion.div whileHover={{ y: -5 }} className="bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 shadow-xl">
             <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><Users size={24} /></div>
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-full"><TrendingUp size={12} /> +12%</div>
             </div>
             <p className="text-gray-400 text-sm font-medium">Monthly Visitors</p>
             <h3 className="text-3xl font-black mt-1 tracking-tight">45,892</h3>
          </motion.div>
          {/* ... baki cards bhi isi tarah ... */}
        </div>

        {/* Live Activity & Data Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Recent Activity Feed */}
          <div className="xl:col-span-2 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold">Recent Blog Activity</h3>
              <button className="text-blue-500 text-sm font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-3xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold">B</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">New comment on "SEO Strategies 2026"</h4>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><Clock size={12} /> 2 hours ago</p>
                  </div>
                  <button className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition"><ArrowUpRight size={16} /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick AI Insight Box */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-4 leading-tight">Generate <br /> Smart Reports</h3>
              <p className="text-blue-100 text-sm mb-6 opacity-80">Use our AI engine to analyze your news traffic and get instant insights.</p>
              <button className="bg-white text-blue-600 font-black px-6 py-3 rounded-2xl text-sm shadow-xl hover:scale-105 transition-all">Start Analysis</button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-[40px]" />
          </div>

        </div>

        {/* Floating AI Chatbot */}
        <AIChatbot />

      </main>
    </div>
  );
}
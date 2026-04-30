"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Settings, LogOut, Camera, Mail, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<{username?: string, email?: string} | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("userProfile");
    if (data) setUser(JSON.parse(data));
  }, []);

  if (!user) return <div className="text-white text-center mt-20">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Profile Header Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 rounded-[2.5rem] p-10 overflow-hidden shadow-2xl"
        >
          {/* Animated Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 p-1">
                <img 
                  src={`https://api.dicebear.com/8.x/bottts/svg?seed=${user.username}`} 
                  alt="Avatar" 
                  className="w-full h-full rounded-full bg-black object-cover"
                />
              </div>
              <button className="absolute bottom-1 right-1 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200 transition">
                <Camera size={16} />
              </button>
            </div>

            <div className="text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h1 className="text-4xl font-black tracking-tight">{user.username}</h1>
                <ShieldCheck className="text-blue-400" size={24} />
              </div>
              <p className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mt-2">
                <Mail size={16} /> {user.email}
              </p>
              
              <div className="flex gap-3 mt-6 justify-center md:justify-start">
                <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition">Edit Profile</button>
                <button className="bg-white/10 px-4 py-2 rounded-full border border-white/10 hover:bg-white/20 transition"><Settings size={18} /></button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* User Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
              <h3 className="font-bold text-xl mb-4">Your Recent Activities</h3>
              <p className="text-gray-500">No activity found. Start exploring the website!</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-3xl">
              <h4 className="font-bold text-blue-400">Pro Member</h4>
              <p className="text-sm text-gray-400 mt-1">Status: Active</p>
            </div>
            <button className="w-full flex items-center justify-center gap-2 p-4 text-red-400 bg-red-400/5 border border-red-400/10 rounded-2xl hover:bg-red-400/10 transition">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
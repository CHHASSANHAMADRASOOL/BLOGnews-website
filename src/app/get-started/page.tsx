"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight } from "lucide-react";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    // Local Storage mein temporary save kar rahe hain taake Profile page par dikha saken
    // Real project mein yahan API call hogi: fetch('/api/auth/signup', ...)
    localStorage.setItem("userProfile", JSON.stringify(userData));

    setTimeout(() => {
      router.push("/profile"); // Account banne ke baad profile par redirect
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent)]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-2xl relative"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
        <p className="text-gray-400 mb-8">Join BlogNews community today.</p>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="relative">
            <User className="absolute left-4 top-4 text-gray-500" size={20} />
            <input name="username" type="text" placeholder="Username" required className="w-full bg-black/20 border border-white/10 p-4 pl-12 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-gray-500" size={20} />
            <input name="email" type="email" placeholder="Gmail Address" required className="w-full bg-black/20 border border-white/10 p-4 pl-12 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-500" size={20} />
            <input name="password" type="password" placeholder="Password" required className="w-full bg-black/20 border border-white/10 p-4 pl-12 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up Now"}
            <ArrowRight size={20} />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
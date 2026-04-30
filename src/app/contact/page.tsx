"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Phone, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function PremiumContact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-pulse" />
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-pulse" />

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10 bg-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10">
        
        {/* Left Side: Info */}
        <div className="flex flex-col justify-between py-4">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent"
            >
              Get in Touch
            </motion.h1>
            <p className="mt-4 text-gray-400 text-lg">Have a project in mind? We'd love to help you grow your business.</p>
          </div>

          <div className="space-y-6 mt-10">
            {[ 
              { icon: Mail, label: "Email", val: "hello@yourbrand.com", color: "text-blue-400" },
              { icon: Phone, label: "Phone", val: "+92 300 1234567", color: "text-purple-400" },
              { icon: Clock, label: "Support", val: "24/7 Online Support", color: "text-emerald-400" }
            ].map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i} className="flex items-center gap-4 group"
              >
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform ${item.color}`}>
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">{item.label}</p>
                  <p className="text-gray-200">{item.val}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 relative">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-4"
              >
                <CheckCircle size={80} className="text-emerald-500" />
                <h3 className="text-2xl font-bold">Message Sent!</h3>
                <p className="text-gray-400">Hum jald hi aap se rabta karenge.</p>
                <button onClick={() => setStatus("idle")} className="text-blue-400 underline mt-4">Send another</button>
              </motion.div>
            ) : (
              <motion.form 
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit} className="space-y-5"
              >
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">Full Name</label>
                  <input name="name" required type="text" className="w-full bg-black/20 border border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Enter your name" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">Email Address</label>
                  <input name="email" required type="email" className="w-full bg-black/20 border border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="name@company.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-400">Your Message</label>
                  <textarea name="message" required rows={4} className="w-full bg-black/20 border border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none" placeholder="How can we help?"></textarea>
                </div>

                <button 
                  disabled={status === "loading"}
                  className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                  <Send size={18} />
                </button>
                
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                    <AlertCircle size={16} /> Something went wrong. Try again.
                  </div>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, User, Sparkles, Zap, ShieldCheck } from "lucide-react";

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Welcome to BlogNews! Main yahan ki services aur news ke bare mein aapki kya madad kar sakta hoon?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChat = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        body: JSON.stringify({ prompt: input }),
      });
      const result = await res.json();
      setMessages(prev => [...prev, { role: "ai", text: result.data }]);
    } catch {
      setMessages(prev => [...prev, { role: "ai", text: "Sorry, server busy hai!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* BVIP Animated Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px]" />

      {/* Chat Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl h-[85vh] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col relative z-10"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
              <Bot size={28} />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">BlogNews AI Assistant</h2>
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <Zap size={12} fill="currentColor" /> Powered by Gemini 1.5 Flash
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <ShieldCheck size={14} className="text-blue-400" /> Secure AI Session
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                    msg.role === 'user' ? 'bg-blue-600 border-blue-400' : 'bg-white/10 border-white/10'
                  }`}>
                    {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-blue-600/20 border border-blue-500/30 text-blue-50' 
                    : 'bg-white/5 border border-white/10 text-gray-200'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <div className="flex items-center gap-2 text-blue-400 text-xs animate-pulse font-medium">
               <Sparkles size={16} /> AI Assistant is searching for info...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-6 bg-black/20 border-t border-white/10 rounded-b-[2.5rem]">
          <div className="relative max-w-3xl mx-auto flex gap-3">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleChat()}
              placeholder="Ask about SEO services, BlogNews, or tech news..."
              className="flex-1 bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all"
            />
            <button 
              onClick={handleChat}
              className="bg-blue-600 hover:bg-blue-500 p-4 rounded-2xl shadow-lg shadow-blue-600/30 transition-all active:scale-95"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
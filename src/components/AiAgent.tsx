"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, User, Sparkles } from "lucide-react";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! Main BlogNews AI Assistant hoon. Main aapki kya madad kar sakta hoon?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // Yahan fetch call mein headers hona lazmi hai warna server busy error deta hai
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessages((prev) => [...prev, { role: "ai", text: data.data }]);
      } else {
        setMessages((prev) => [...prev, { role: "ai", text: "Error: " + (data.error || "Server issue") }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", text: "Network connection fail ho gaya!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-[350px] md:w-[400px] h-[500px] bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col mb-4"
          >
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-600 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <Bot size={20} />
                <span className="font-bold text-sm">BlogNews AI</span>
              </div>
              <button onClick={() => setIsOpen(false)}><X size={20} /></button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-white/10 text-gray-200 border border-white/10 rounded-tl-none"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-[10px] text-blue-400 animate-pulse">AI is typing...</div>}
              <div ref={scrollRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-black/20 border-t border-white/10 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type message..." 
                className="flex-1 bg-white/5 border border-white/10 p-2 rounded-xl text-white outline-none"
              />
              <button onClick={handleSend} className="p-2 bg-blue-600 rounded-xl hover:bg-blue-500 transition">
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl border border-white/20 text-white"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
}
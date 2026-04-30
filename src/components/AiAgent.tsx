"use client"
import { useState, useEffect, useRef } from 'react';

// TypeScript types for Speech
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export default function AiAgentic() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'VIP Boss! Main active hoon. SEO, YouTube, Coding ya Trading—kuch bhi puchiye, main hazir hoon.' }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // --- Voice to Text (Mic) ---
  const handleVoice = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) return alert("Browser support nahi karta!");

    const rec = new Recognition();
    rec.lang = 'en-US'; 
    rec.onstart = () => setIsListening(true);
    rec.onend = () => setIsListening(false);
    rec.onresult = (e: any) => setInput(e.results[0][0].transcript);
    
    if (isListening) rec.stop();
    else rec.start();
  };

  // --- Text to Speech (Agent ka Bolna) ---
  const speakResponse = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    }
  };

  // --- Send Message Logic ---
  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      // Agent ab jawab bolega bhi!
      speakResponse(data.reply);
      
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection issue, Boss!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Glow Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:scale-110 transition-all border border-white/20"
      >
        {isOpen ? (
          <span className="text-white text-3xl font-light">×</span>
        ) : (
          <svg className="w-8 h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )}
      </button>

      {/* Agent Panel */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[420px] h-[550px] bg-[#0d0d0d]/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          
          {/* Header */}
          <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>
              <div>
                <h4 className="text-white font-black text-sm tracking-tighter">VIP AGENTIC ENGINE</h4>
                <p className="text-[10px] text-blue-400 font-bold uppercase">Universal Knowledge Active</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-lg' 
                  : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-blue-500 text-[10px] font-bold animate-pulse px-2 italic">
                Agent is analyzing data...
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Controller Area */}
          <form onSubmit={sendMessage} className="p-4 bg-white/5 flex gap-2 items-center border-t border-white/5">
            <button 
              type="button"
              onClick={handleVoice}
              className={`p-3 rounded-xl transition-all ${isListening ? 'bg-red-600 animate-pulse' : 'bg-white/10 hover:bg-white/20'}`}
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </button>
            
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything, Boss..."
              className="flex-1 bg-transparent border border-white/10 rounded-xl px-4 py-2 text-white text-sm outline-none focus:border-blue-500/50"
            />

            <button 
              type="submit"
              className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg transition-transform active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
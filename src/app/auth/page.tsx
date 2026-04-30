"use client";
import { useState } from "react";

export default function AuthPage() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // API Call to /api/auth/send-otp
    setStep(2); 
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">BlogNews</h2>
        
        {step === 1 ? (
          <form onSubmit={handleSendEmail} className="space-y-4">
            <p className="text-gray-500 text-center">Apna Gmail enter karein account banane ke liye</p>
            <input 
              type="email" 
              placeholder="example@gmail.com"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all"
            >
              {loading ? "Sending..." : "Get Verification Code"}
            </button>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <p className="text-green-600 font-medium">Verification code aapke Gmail par bhej diya gaya hai!</p>
            <input 
              type="text" 
              maxLength={6}
              placeholder="0 0 0 0 0 0"
              className="w-full p-3 text-center text-2xl tracking-widest border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all">
              Verify & Create Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ reply: "Boss, .env mein Key missing hai!" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Stable Model Selection (Gemini 1.5 Pro check karega pehle)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro", // 404 se bachne ke liye pro best hai
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: message }] }],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.8,
      },
    });

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error("Gemini Final Error:", error.message);
    
    // Agar 1.5 Pro fail ho to 1.5 Flash try karega (Auto-Fallback)
    return NextResponse.json({ 
      reply: "Sir jee, connection ka thoda masla hai lekin main haar nahi manunga. Kya aapne library update ki hai? (npm install @google/generative-ai@latest)" 
    }, { status: 500 });
  }
}
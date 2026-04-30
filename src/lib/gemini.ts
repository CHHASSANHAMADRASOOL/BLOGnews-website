import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY missing in .env file");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function getGeminiResponse(userPrompt: string) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are a VIP Universal AI Agent. You are an expert in SEO (Fiverr, DR 70+), Nature (Wild Wonders YouTube), and Web Dev (Next.js, TSX). Answer every question like a pro. Reply in Roman Urdu if the user asks in it."
    });

    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sir jee, Gemini API mein koi masla hai. Key check karein!";
  }
}
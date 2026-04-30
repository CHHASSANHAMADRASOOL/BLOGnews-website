import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// AI Configuration
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // 1. Validation
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // 2. Model Selection (Gemini 1.5 Flash for speed)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 3. AI Settings (Creativity Control)
    const generationConfig = {
      temperature: 0.9,
      topP: 1,
      maxOutputTokens: 2048,
    };

    // 4. Generate Content
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const responseText = result.response.text();

    // 5. Success Response
    return NextResponse.json({ 
      success: true, 
      data: responseText 
    }, { status: 200 });

  } catch (error: any) {
    console.error("AI Route Error:", error.message);
    return NextResponse.json({ 
      error: "AI service is temporarily busy. Please try again." 
    }, { status: 500 });
  }
}
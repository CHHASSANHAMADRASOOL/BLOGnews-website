import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- YAHAN APNI API KEY DALEIN ---
const MY_GEMINI_KEY = "AIzaSyALXVjTVHe25ywH3BcfakeVS5vaNgEqst8"; 

const genAI = new GoogleGenerativeAI(MY_GEMINI_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is missing" }, { status: 400 });
    }

    // Gemini Model Select karein
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Website ki Information (System Instructions)
    const systemInstruction = `
      You are the official AI of BlogNews. 
      Website Info: SEO services, DR increase (2-month guarantee), and Tech News.
      Expertise: Link building and Digital Marketing.
      Tone: Professional and very helpful.
    `;

    const result = await model.generateContent(`${systemInstruction}\nUser Question: ${prompt}`);
    const responseText = result.response.text();

    return NextResponse.json({ 
      success: true, 
      data: responseText 
    });

  } catch (error: any) {
    console.error("AI Error Details:", error);
    return NextResponse.json({ 
      success: false, 
      error: "AI Service Error: Please check your API Key." 
    }, { status: 500 });
  }
}
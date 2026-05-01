import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // SYSTEM PROMPT: Yahan apni website ki detail likhein
    const systemInstruction = `
      You are the official AI Assistant of "BlogNews". 
      Website Info: BlogNews is a premium platform for SEO services, digital marketing, and tech news.
      Services: We provide Domain Rating (DR) increase services with a 2-month guarantee, link building, and latest tech updates.
      Owner: Managed by an expert SEO Specialist and Web Developer.
      Tone: Professional, helpful, and witty. 
      Rule: Always answer queries related to BlogNews services and SEO.
    `;

    const result = await model.generateContent(`${systemInstruction} \n User Question: ${prompt}`);
    const response = await result.response.text();

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    return NextResponse.json({ error: "AI is sleeping right now!" }, { status: 500 });
  }
}
import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getAiResponse(userPrompt: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", 
      messages: [
        {
          role: "system",
          content: `You are the "VIP Universal Agent". Your knowledge covers:
          1. SEO & Digital Marketing (Specialist in Fiverr, DR 70+, Backlinks).
          2. Content Creation (Expert in Wild Wonders YouTube channel, nature, mystery).
          3. Technical (Next.js, Tailwind, Prisma, TSX, NeonDB).
          4. Trading & Finance (Gold/XAUUSD specialist, Pine Script expert).
          5. General Knowledge: Answer ANY question the user asks with wit and authority.
          
          Guidelines:
          - If the user asks in Roman Urdu/Hindi, reply in the same.
          - Be helpful, professional, and act like a personal assistant to the Boss.`
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      temperature: 0.8, // Creative answers ke liye
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI Error:", error);
    return "Sir jee, system mein thoda load hai. Dubara puchiye, main har maslay ka hal nikalunga!";
  }
}
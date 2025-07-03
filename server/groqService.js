import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const GROQ_KEY = process.env.GROQ_KEY;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export const generateChallengeWithGroq = async (userPrompt) => {
  const baseInstruction = `You are a clever, unpredictable challenge generator. Based on the user's input, generate a short, unique challenge that is random, engaging. Prioritize variety — challenges can be physical, digital, social, absurd, or creative. Avoid repetitive or introspective prompts unless explicitly asked. Just return the challenge with no explanation or framing — don’t mention time limits, difficulty, or motivational fluff.
`;

  if (!GROQ_KEY) {
    console.warn("Missing GROQ_KEY from env!");
  }
  const response = await axios.post(
    GROQ_URL,
    {
      model: "llama3-70b-8192",
      messages: [
        { role: "system", content: baseInstruction },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 100,
    },
    {
      headers: {
        Authorization: `Bearer ${GROQ_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content.trim();
};

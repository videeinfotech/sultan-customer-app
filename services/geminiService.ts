
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const chatWithConcierge = async (
  prompt: string, 
  history: { role: 'user' | 'model', parts: { text: string }[] }[] = []
) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are the Sultan Luxury Heritage Concierge. Your tone is refined, sophisticated, and deeply knowledgeable about Indian jewelry heritage (Kundan, Meenakari, Polki, Temple Jewelry). You help clients with heritage storytelling, choosing the right metals, and styling. You also use Google Search to find current luxury trends or specific heritage references. Always be polite and treat the user as a VIP guest.",
      tools: [{ googleSearch: {} }],
    }
  });

  const response = await chat.sendMessage({ message: prompt });
  
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
    title: chunk.web?.title || 'Source',
    uri: chunk.web?.uri || '',
  })).filter((s: any) => s.uri !== '') || [];

  return {
    text: response.text,
    sources
  };
};

export const generateJewelryDesign = async (prompt: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `A hyper-realistic, high-fashion professional product photography of a luxury jewelry piece: ${prompt}. Set against a soft minimalist silk background with elegant studio lighting. Handcrafted Indian luxury aesthetic, detailed intricate gold work, precious gemstones.` }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("Failed to generate image");
};

export const analyzeDesignRequest = async (prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: "Extract the key elements of a jewelry design request into a poetic summary. Mention the materials, inspiration, and mood.",
    }
  });
  return response.text;
};


import { GoogleGenAI, Type } from "@google/genai";
import { FILLINGS, TOPPINGS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getDonutSuggestion(theme: string = "party") {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Suggest a delicious mini donut combination for the theme: "${theme}". 
      Available fillings: ${FILLINGS.join(", ")}. 
      Available toppings: ${TOPPINGS.join(", ")}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fillings: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Up to 2 fillings chosen from the available list."
            },
            toppings: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Up to 3 toppings chosen from the available list."
            },
            color: {
              type: Type.STRING,
              description: "A color name for the chocolate glaze."
            },
            reason: {
              type: Type.STRING,
              description: "A short reason why this combination fits the theme (in Portuguese)."
            }
          },
          required: ["fillings", "toppings", "color", "reason"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Suggestion Error:", error);
    return null;
  }
}
